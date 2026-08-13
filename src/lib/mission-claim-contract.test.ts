import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getCompanionEvolutionTransition, getRankUpTransition } from "@/hooks/use-progress";

const migration = [
  "20260813131513_claimable_daily_weekly_mission_rewards.sql",
  "20260813132956_fix_mission_claim_variable_ambiguity.sql",
  "20260813133207_protect_claimed_mission_xp_from_stale_sync.sql",
]
  .map((file) =>
    readFileSync(new URL(`../../supabase/migrations/${file}`, import.meta.url), "utf8"),
  )
  .join("\n");
const localDateMigration = readFileSync(
  new URL(
    "../../supabase/migrations/20260813134035_enforce_local_date_on_mission_claims.sql",
    import.meta.url,
  ),
  "utf8",
);
const celebration = readFileSync(
  new URL("../components/progression/MissionRewardCelebration.tsx", import.meta.url),
  "utf8",
);

function sqlFunctionBody(name: string) {
  const matches = [
    ...migration.matchAll(
      new RegExp(
        `create or replace function public\\.${name}[\\s\\S]*?as \\$\\$([\\s\\S]*?)\\$\\$;`,
        "gi",
      ),
    ),
  ];
  expect(matches.length, `${name} SQL function should exist`).toBeGreaterThan(0);
  return matches.at(-1)?.[1] ?? "";
}

describe("authoritative mission claim contract", () => {
  it("deduplicates learning events by user and event key", () => {
    expect(migration).toMatch(/primary key \(user_id, event_key\)/i);
    expect(sqlFunctionBody("record_mission_activity")).toMatch(
      /on conflict \(user_id, event_key\) do nothing/i,
    );
  });

  it("deduplicates every objective and bonus claim", () => {
    expect(migration).toMatch(/primary key \(user_id, period_type, period_key, mission_id\)/i);
    expect(sqlFunctionBody("claim_mission_reward")).toMatch(
      /on conflict \(user_id, period_type, period_key, mission_id\) do nothing/i,
    );
  });

  it("keeps mission-state reads free of XP awards", () => {
    const body = sqlFunctionBody("get_mission_state");
    expect(body).not.toMatch(/insert into public\.mission_reward_claims/i);
    expect(body).not.toMatch(/update public\.user_progress set xp/i);
  });

  it("awards daily objectives and bonuses only in the claim RPC", () => {
    const body = sqlFunctionBody("claim_mission_reward");
    expect(body).toMatch(/v_reward_xp := 100/);
    expect(body).toMatch(/v_reward_xp := 500/);
    expect(body).toMatch(/metric_value < required_value/);
    expect(body).toMatch(/Claim all daily objectives first/);
  });

  it("awards weekly objectives and bonuses only in the claim RPC", () => {
    const body = sqlFunctionBody("claim_mission_reward");
    expect(body).toMatch(/v_reward_xp := 250/);
    expect(body).toMatch(/v_reward_xp := 1500/);
    expect(body).toMatch(/Claim all weekly objectives first/);
  });

  it("returns the server XP before and after a successful claim", () => {
    const body = sqlFunctionBody("claim_mission_reward");
    expect(body).toMatch(/'previous_xp', previous_xp/);
    expect(body).toMatch(/'total_xp', authoritative_xp/);
    expect(body).toMatch(/returning xp into authoritative_xp/);
  });

  it("does not mutate streak during a mission claim", () => {
    expect(sqlFunctionBody("claim_mission_reward")).not.toMatch(/streak\s*=/i);
  });

  it("prevents stale client sync from reducing claimed Lifetime XP", () => {
    expect(sqlFunctionBody("keep_user_progress_xp_monotonic")).toMatch(
      /new\.xp := greatest\(old\.xp, new\.xp\)/i,
    );
    expect(migration).toMatch(/create trigger keep_user_progress_xp_monotonic/i);
  });

  it("restricts privileged RPC execution to authenticated users", () => {
    expect(migration).toMatch(/current_user_id uuid := \(select auth\.uid\(\)\)/i);
    expect(migration).toMatch(
      /revoke all on function public\.claim_mission_reward[\s\S]*from public, anon/i,
    );
    expect(migration).toMatch(
      /grant execute on function public\.claim_mission_reward[\s\S]*to authenticated/i,
    );
  });

  it("closes old rewards at the student's local date boundary", () => {
    expect(localDateMigration).toMatch(/p_timezone_offset_minutes integer/i);
    expect(localDateMigration).toMatch(/expected_local_date := \(now\(\) - make_interval/i);
    expect(localDateMigration).toMatch(/This mission reward is no longer claimable/i);
    expect(localDateMigration).toMatch(
      /revoke all on function public\.claim_mission_reward\(text, text, date\) from public, anon, authenticated/i,
    );
  });

  it("detects a rank threshold crossed by a claim", () => {
    const transition = getRankUpTransition(3990, 4090);
    expect(transition?.fromRank.name).toBe("Moon Explorer");
    expect(transition?.toRank.name).toBe("Planet Voyager");
  });

  it("detects a Companion threshold crossed by a claim", () => {
    expect(getCompanionEvolutionTransition(4150, 4250)).toEqual({
      fromStage: "sprout",
      toStage: "cadet",
    });
  });

  it("supports a combined rank and Companion event", () => {
    expect(getRankUpTransition(3950, 4250)).not.toBeNull();
    expect(getCompanionEvolutionTransition(3950, 4250)).not.toBeNull();
    expect(celebration).toContain("Incredible Progress!");
  });

  it("uses an accessible mobile-safe, reduced-motion celebration", () => {
    expect(celebration).toMatch(/useReducedMotion/);
    expect(celebration).toMatch(/w-\[calc\(100vw-2rem\)\]/);
    expect(celebration).toMatch(/disabled=\{claiming\}/);
    expect(celebration).toMatch(/onEscapeKeyDown/);
  });
});

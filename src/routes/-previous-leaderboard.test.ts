import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  new URL(
    "../../supabase/migrations/20261002120000_previous_month_leaderboard.sql",
    import.meta.url,
  ),
  "utf8",
);
const currentLeaderboard = readFileSync(
  new URL("../../supabase/migrations/20260920104500_leaderboard_school_name.sql", import.meta.url),
  "utf8",
);
const routeSource = readFileSync(new URL("./leaderboard.tsx", import.meta.url), "utf8");
const hallSource = readFileSync(
  new URL("../components/leaderboard/PreviousMonthHall.tsx", import.meta.url),
  "utf8",
);

describe("previous-month leaderboard query", () => {
  it("uses the Asia/Kuala_Lumpur month before the current Malaysia month", () => {
    expect(migration).toContain("now() at time zone 'Asia/Kuala_Lumpur'");
    expect(migration).toContain("date_trunc('month'");
    expect(migration).toContain("interval '1 month'");
    expect(migration).toContain("at time zone 'Asia/Kuala_Lumpur'");
    expect(migration).toContain("to_char(period_start_local, 'YYYY-MM')");
  });

  it("keeps the live leaderboard tie-break and eligibility rules", () => {
    expect(migration).toContain("order by monthly_xp desc, first_earned_at asc, user_id asc");
    expect(migration).toContain("and qh.xp_earned > 0");
    expect(migration).toContain("where p.role = 'student'");
    expect(migration).toContain("and p.status = 'active'");
    expect(migration).toContain("left join public.schools sc on sc.id = p.school_id");
  });

  it("does not archive rows, so a repeat read cannot duplicate history", () => {
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
    expect(migration).not.toMatch(/\bcreate\s+table\b/i);
    expect(migration).toContain("stable");
  });

  it("omits current streak and current lifetime XP", () => {
    expect(migration).not.toContain("up.streak");
    expect(migration).not.toContain("user_progress");
    expect(migration).toContain("xp_through_month_end");
  });

  it("returns an empty student list when the previous month has no XP rows", () => {
    const sql = migration.replace(/--.*$/gm, "");
    expect(migration).toContain("'[]'::jsonb");
    expect(sql).toContain("qh.created_at >= period_start");
    expect(sql).toContain("and qh.created_at < period_end");
    expect(sql).toContain("page_size integer default 10");
    expect(sql).not.toMatch(/\bdelete\s+from\b/i);
    expect(sql).not.toMatch(/September|October|November|December|2026-09|2026-10/);
  });

  it("leaves the current get_leaderboard function unchanged", () => {
    expect(currentLeaderboard).toContain("where qh.created_at >= date_trunc('month', now())");
    expect(currentLeaderboard).not.toContain("get_previous_leaderboard");
  });
});

describe("Last Month's Hall of Fame UI", () => {
  it("renders below the live Top 10 and does not replace the podium", () => {
    expect(routeSource).toContain("<PreviousMonthHall");
    expect(routeSource).toContain("Monthly ranking · Top 10");
    expect(routeSource).toContain('const heights = ["h-24", "h-32", "h-20"];');
    const topTen = routeSource.indexOf("Monthly ranking · Top 10");
    const hall = routeSource.indexOf("<PreviousMonthHall");
    expect(topTen).toBeGreaterThan(-1);
    expect(hall).toBeGreaterThan(topTen);
  });

  it("shows an empty state instead of invented winners", () => {
    expect(hallSource).toContain("No previous monthly leaderboard yet.");
    expect(hallSource).toContain(
      "This month's champions will enter the Hall of Fame next month.",
    );
  });

  it("expands the historical Top 10 in place", () => {
    expect(hallSource).toContain("View ");
    expect(hallSource).toContain(" Top 10");
    expect(hallSource).toContain("Hide ");
    expect(hallSource).toContain("aria-expanded={expanded}");
    expect(hallSource).not.toContain('to="/');
  });
});

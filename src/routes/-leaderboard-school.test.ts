import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migrationUrl = new URL(
  "../../supabase/migrations/20260920104500_leaderboard_school_name.sql",
  import.meta.url,
);
const previousMigrationUrl = new URL(
  "../../supabase/migrations/20260714022016_activate_monthly_leaderboard.sql",
  import.meta.url,
);

const migration = readFileSync(migrationUrl, "utf8");
const previousMigration = readFileSync(previousMigrationUrl, "utf8");
const routeSource = readFileSync(new URL("./leaderboard.tsx", import.meta.url), "utf8");
const serverSource = readFileSync(new URL("./-leaderboard.server.ts", import.meta.url), "utf8");

/** The RPC body between the `as $$` marker and its terminator. */
function functionBody(sql: string): string {
  const start = sql.indexOf("as $$");
  const end = sql.lastIndexOf("$$;");
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return sql.slice(start, end);
}

describe("get_leaderboard school join — ranking is unchanged", () => {
  it("keeps the exact ranking window clause from the previous migration", () => {
    const rankingClause =
      "order by monthly_xp desc, first_earned_at asc, user_id asc";
    expect(previousMigration).toContain(rankingClause);
    expect(migration).toContain(rankingClause);
  });

  it("keeps the eligibility filters byte-for-byte", () => {
    for (const clause of [
      "where qh.created_at >= date_trunc('month', now())",
      "and qh.created_at < now()",
      "and qh.xp_earned > 0",
      "where p.role = 'student'",
      "and p.status = 'active'",
    ]) {
      expect(previousMigration).toContain(clause);
      expect(migration).toContain(clause);
    }
  });

  it("adds schools only as a LEFT JOIN so no student can be dropped", () => {
    expect(migration).toContain("left join public.schools sc on sc.id = p.school_id");
    expect(migration).not.toMatch(/\n\s*(inner )?join public\.schools/);
  });

  it("never lets the school influence ordering or filtering", () => {
    const body = functionBody(migration);
    const schoolReferences = [...body.matchAll(/^.*\bsc\.|^.*\bschool_name\b.*$/gim)].map((m) =>
      m[0].trim(),
    );
    for (const line of schoolReferences) {
      expect(line).not.toMatch(/\border by\b/i);
      expect(line).not.toMatch(/\bgroup by\b/i);
      // The only WHERE-ish usage allowed is none at all.
      expect(line).not.toMatch(/^\s*(where|and|or)\b/i);
    }
  });

  it("does not read the dead legacy profiles.school column", () => {
    expect(migration).not.toMatch(/\bp\.school\b(?!_id)/);
  });

  it("does not introduce a denormalized profiles.school_name column", () => {
    expect(migration).not.toMatch(/alter table\s+public\.profiles/i);
    expect(migration).not.toMatch(/add column[^\n]*school_name/i);
  });

  it("leaves XP, accuracy, quiz count and streak expressions untouched", () => {
    for (const clause of [
      "sum(qh.xp_earned)::integer as monthly_xp",
      "count(*)::integer as monthly_quiz_count",
      "sum(qh.correct)::integer as monthly_correct",
      "sum(qh.total)::integer as monthly_total",
      "up.streak,",
    ]) {
      expect(previousMigration).toContain(clause);
      expect(migration).toContain(clause);
    }
  });

  it("keeps the monthly period and the signed-in-only guard", () => {
    expect(migration).toContain("date_trunc('month', now())");
    expect(migration).toContain("raise exception 'Sign in required'");
    expect(migration).toContain("revoke all on function public.get_leaderboard(integer, integer) from anon");
  });

  it("returns the canonical school name, not an abbreviated one", () => {
    expect(migration).toContain("sc.school_name,");
    expect(migration).toContain("'school_name', school_name,");
  });
});

describe("leaderboard UI school line", () => {
  it("types school_name as nullable display metadata", () => {
    expect(serverSource).toContain("school_name: string | null;");
  });

  it("formats the canonical name for display only", () => {
    expect(routeSource).toContain('import { formatSchoolName } from "@/lib/school-display";');
    expect(routeSource).toContain("school: formatSchoolName(s.school_name),");
  });

  it("omits the school line entirely when there is no school", () => {
    expect(routeSource).toContain("{student.school && (");
    expect(routeSource).not.toContain("School not set");
  });

  it("renders the school on both desktop and mobile", () => {
    // One block in RankTableRow (desktop) and one in RankMobileCard (mobile).
    const occurrences = routeSource.match(/\{student\.school && \(/g) ?? [];
    expect(occurrences).toHaveLength(2);
  });

  it("reuses the existing lucide icon set rather than adding a dependency", () => {
    expect(routeSource).toMatch(/import \{[^}]*\bSchool\b[^}]*\} from "lucide-react";/);
  });

  it("keeps truncation so long names cannot break the row layout", () => {
    expect(routeSource).toContain('<span className="truncate">{student.school}</span>');
  });
});

describe("Top 3 podium — school and column grouping", () => {
  it("shows the school on the podium using the already-mapped, already-formatted value", () => {
    expect(routeSource).toContain("{s.school && (");
    expect(routeSource).toContain('<span className="truncate">{s.school}</span>');
  });

  it("omits the podium school line when there is none, without a placeholder", () => {
    // Same contract as the table/mobile rows: no fabricated fallback text.
    const podiumSection = routeSource.slice(
      routeSource.indexOf("Cosmic Champion + floating top 3"),
      routeSource.indexOf("Positions 4"),
    );
    expect(podiumSection).not.toContain("School not set");
  });

  it("keeps the avatar/details section and the podium section inside one column wrapper", () => {
    const podiumSection = routeSource.slice(
      routeSource.indexOf("Cosmic Champion + floating top 3"),
      routeSource.indexOf("Positions 4"),
    );
    // Exactly one outer per-student column, containing both an avatar/details
    // sub-section and a podium sub-section as siblings within it.
    expect(podiumSection).toContain('className="flex min-w-0 flex-col items-center"');
    expect(podiumSection).toContain("Avatar/details section");
    expect(podiumSection).toContain("Podium section");
  });

  it("keeps the three-column podium grid with bottom alignment", () => {
    const podiumSection = routeSource.slice(
      routeSource.indexOf("Cosmic Champion + floating top 3"),
      routeSource.indexOf("Positions 4"),
    );
    expect(podiumSection).toContain("grid grid-cols-3 items-end");
  });

  it("keeps the #2, #1 (champion), #3 slot order", () => {
    expect(routeSource).toContain("{[1, 0, 2].map((slot) => {");
  });

  it("does not touch ranking, XP, or podium heights while adding the school line", () => {
    const podiumSection = routeSource.slice(
      routeSource.indexOf("Cosmic Champion + floating top 3"),
      routeSource.indexOf("Positions 4"),
    );
    expect(podiumSection).toContain('const heights = ["h-24", "h-32", "h-20"];');
    expect(podiumSection).toContain("s.monthlyXp.toLocaleString()");
  });
});

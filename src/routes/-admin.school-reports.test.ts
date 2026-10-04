import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeSource = readFileSync(new URL("./admin.school-reports.tsx", import.meta.url), "utf8");
const serverSource = readFileSync(new URL("./-school-reports.server.ts", import.meta.url), "utf8");
const shellSource = readFileSync(
  new URL("../components/admin/AdminShell.tsx", import.meta.url),
  "utf8",
);
const reportMigration = readFileSync(
  new URL("../../supabase/migrations/20261003151450_admin_school_reports.sql", import.meta.url),
  "utf8",
);
const leaderboardMigration = readFileSync(
  new URL("../../supabase/migrations/20260920104500_leaderboard_school_name.sql", import.meta.url),
  "utf8",
);

describe("Admin School Reports database contract", () => {
  it("is aggregate-only and protected by an explicit admin check", () => {
    expect(reportMigration).toContain("security invoker");
    expect(reportMigration).toContain("if not public.is_admin()");
    expect(reportMigration).toContain(
      "revoke all on function public.get_admin_school_report(uuid, integer, text, text) from public",
    );
    expect(reportMigration).toContain(
      "revoke all on function public.get_admin_school_report(uuid, integer, text, text) from anon",
    );
    expect(reportMigration).toContain(
      "grant execute on function public.get_admin_school_report(uuid, integer, text, text) to authenticated",
    );
    expect(reportMigration).not.toMatch(/'full_name'|'email'|'user_id'\s*,/);
  });

  it("scopes students by verified school, age and form", () => {
    expect(reportMigration).toContain("join selected_schools s on s.id = p.school_id");
    expect(reportMigration).toContain("p_age is null or p.age = p_age");
    expect(reportMigration).toContain("p_form is null or p.form = p_form");
    expect(reportMigration).toContain("where s.active");
    expect(reportMigration).toContain("p_school_id is null or s.id = p_school_id");
  });

  it("uses authenticated learning events and refuses to fabricate retention", () => {
    expect(reportMigration).toContain("from public.mission_activity_events");
    expect(reportMigration).toContain("from public.quiz_history");
    expect(reportMigration).toContain("'available', false");
    expect(reportMigration).toContain("complete append-only learning-activity history");
  });

  it("preserves the official monthly leaderboard ordering and eligibility", () => {
    const clauses = [
      "order by ma.monthly_xp desc, ma.first_earned_at asc, p.id asc",
      "where p.role = 'student' and p.status = 'active'",
      "qh.created_at >= date_trunc('month', now())",
      "qh.xp_earned > 0",
    ];
    for (const clause of clauses) expect(reportMigration).toContain(clause);
    expect(leaderboardMigration).toContain(
      "order by monthly_xp desc, first_earned_at asc, user_id asc",
    );
  });

  it("uses Malaysia-local report dates and intersects active students for the top-100 rate", () => {
    expect(reportMigration).toContain("now() at time zone 'Asia/Kuala_Lumpur'");
    expect(reportMigration).toContain("where is_active and official_rank <= 100");
    expect(reportMigration).toContain("nullif(count(*) filter (where is_active), 0)");
  });

  it("adds no report table and mutates no school, profile, XP or leaderboard records", () => {
    expect(reportMigration).not.toMatch(/create table/i);
    expect(reportMigration).not.toMatch(
      /insert into public\.(schools|profiles|user_progress|quiz_history)/i,
    );
    expect(reportMigration).not.toMatch(
      /update public\.(schools|profiles|user_progress|quiz_history)/i,
    );
    expect(reportMigration).not.toMatch(
      /delete from public\.(schools|profiles|user_progress|quiz_history)/i,
    );
    expect(reportMigration).not.toContain("create or replace function public.get_leaderboard");
  });
});

describe("Admin School Reports UI contract", () => {
  it("is reachable only under the existing admin shell", () => {
    expect(routeSource).toContain('createFileRoute("/admin/school-reports")');
    expect(shellSource).toContain('label: "School Reports", to: "/admin/school-reports"');
  });

  it("uses a clicked verified directory result only in specific-school mode", () => {
    expect(routeSource).toContain("searchSchools(normalized, controller.signal)");
    expect(routeSource).toContain("onClick={() => onChange(result)}");
    expect(routeSource).toContain('mode === "specific_school" && !school');
    expect(routeSource).toContain('useState<SchoolReportMode>("all_schools")');
    expect(serverSource).toContain("p_school_id: filters.schoolId");
  });

  it("offers only the requested age, form and date filters", () => {
    expect(routeSource).toContain("const AGES = [13, 14, 15, 16, 17]");
    expect(routeSource).toContain(
      'const FORMS = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"]',
    );
    expect(routeSource).toContain("SCHOOL_REPORT_DATE_OPTIONS");
  });

  it("shows aggregate metrics and the explicit retention unavailable state", () => {
    expect(routeSource).toMatch(/No student identities are\s+shown\./);
    expect(routeSource).toContain("Active students");
    expect(routeSource).toContain("Leaderboard presence");
    expect(routeSource).toContain("Not available yet");
  });

  it("supports all-school comparison, sorting and specific-school drill-down", () => {
    expect(routeSource).toContain('title="School comparison"');
    expect(routeSource).toContain('useState<SortKey>("registered_students")');
    expect(routeSource).toContain("onDrillDown(row)");
    expect(routeSource).toContain('setMode("specific_school")');
    expect(reportMigration).toContain("minimum_active_rate_cohort constant integer := 10");
    expect(reportMigration).toContain("'school_type_breakdown'");
    expect(reportMigration).toContain("'state_breakdown'");
    expect(reportMigration).toContain("'school_comparison'");
  });
});

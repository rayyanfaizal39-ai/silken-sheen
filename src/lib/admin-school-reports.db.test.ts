import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import type { AdminSchoolReport } from "./admin-school-reports";

const migration = readFileSync(
  new URL("../../supabase/migrations/20261003151450_admin_school_reports.sql", import.meta.url),
  "utf8",
);

const corrective = readFileSync(
  new URL(
    "../../supabase/migrations/20261004140000_allow_all_schools_admin_report.sql",
    import.meta.url,
  ),
  "utf8",
);

const ADMIN_ID = "00000000-0000-4000-8000-000000000001";
const SCHOOL_ID = "00000000-0000-4000-8000-000000000002";
const SECOND_SCHOOL_ID = "00000000-0000-4000-8000-000000000006";
const STUDENT_ONE = "00000000-0000-4000-8000-000000000003";
const STUDENT_TWO = "00000000-0000-4000-8000-000000000004";
const OTHER_STUDENT = "00000000-0000-4000-8000-000000000005";
const UNKNOWN_SCHOOL_ID = "00000000-0000-4000-8000-0000000000ff";

describe("get_admin_school_report", () => {
  const db = new PGlite();

  beforeAll(async () => {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create schema auth;
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('test.uid', true), '')::uuid $$;
      create function public.is_admin() returns boolean language plpgsql stable as $$ begin return exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); end $$;

      create table public.schools (
        id uuid primary key,
        school_name text not null,
        school_type text,
        state text not null,
        district text,
        active boolean not null default true
      );
      create table public.profiles (
        id uuid primary key,
        role text not null,
        status text not null,
        school_id uuid,
        age integer,
        form text
      );
      create table public.user_progress (
        user_id uuid primary key,
        xp integer not null default 0,
        streak integer not null default 0
      );
      create table public.quiz_history (
        user_id uuid not null,
        subject_id text not null,
        chapter_key text not null,
        xp_earned integer not null default 0,
        created_at timestamptz not null default now()
      );
      create table public.mission_activity_events (
        user_id uuid not null,
        event_key text not null,
        activity_type text not null,
        local_date_key date not null,
        metadata jsonb not null default '{}'::jsonb
      );
      alter table public.mission_activity_events enable row level security;

      insert into public.schools values
        ('${SCHOOL_ID}', 'MRSM TEST', 'MRSM', 'JOHOR', 'PONTIAN', true),
        ('${SECOND_SCHOOL_ID}', 'SMK TEST', 'SMK', 'SELANGOR', 'KLANG', true);
      insert into public.profiles values
        ('${ADMIN_ID}', 'admin', 'active', null, null, null),
        ('${STUDENT_ONE}', 'student', 'active', '${SCHOOL_ID}', 13, 'Form 1'),
        ('${STUDENT_TWO}', 'student', 'active', '${SCHOOL_ID}', 14, 'Form 2'),
        ('${OTHER_STUDENT}', 'student', 'active', '${SECOND_SCHOOL_ID}', 13, 'Form 1');
      insert into public.user_progress values
        ('${STUDENT_ONE}', 900, 4),
        ('${STUDENT_TWO}', 500, 0),
        ('${OTHER_STUDENT}', 1200, 8);
      insert into public.quiz_history values
        ('${OTHER_STUDENT}', 'science', 'Chapter 1', 200, now() - interval '2 hours'),
        ('${STUDENT_ONE}', 'science', 'Chapter 2', 100, now() - interval '1 hour'),
        ('${STUDENT_TWO}', 'math', 'Chapter 3', 50, now() - interval '30 minutes');
      insert into public.mission_activity_events values
        ('${STUDENT_ONE}', 'lesson:today:science:2', 'lesson', current_date, '{"subjectId":"science"}'),
        ('${STUDENT_ONE}', 'flashcard:today:1', 'flashcard', current_date, '{"rating":2}'),
        ('${STUDENT_TWO}', 'flashcard:today:2', 'flashcard', current_date, '{"rating":1}');
    `);
    await db.exec(migration);
    await db.exec(corrective);
    await db.exec(`select set_config('test.uid', '${ADMIN_ID}', false)`);
  });

  afterAll(async () => {
    await db.close();
  });

  it("returns aggregate metrics without identity rows", async () => {
    const result = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report($1, null, null, 'this_month') as report",
      [SCHOOL_ID],
    );
    const report = result.rows[0]?.report;

    expect(report.school).toMatchObject({ name: "MRSM TEST", type: "MRSM", state: "JOHOR" });
    expect(report.summary.total_students).toBe(2);
    expect(report.engagement).toMatchObject({
      active_students: 2,
      quizzes_completed: 2,
      notes_studied: 1,
      flashcards_reviewed: 2,
      flashcards_rated_good: 1,
      active_streaks: 1,
    });
    expect(report.leaderboard).toMatchObject({
      top_10: 2,
      top_50: 2,
      top_100: 2,
      highest_rank: 2,
      total_xp: 1400,
    });
    expect(report.learning_activity.most_popular_subject).toEqual({ label: "math", value: 1 });
    expect(report.retention.available).toBe(false);
    expect(JSON.stringify(report)).not.toContain(STUDENT_ONE);
    expect(JSON.stringify(report)).not.toContain(STUDENT_TWO);
  });

  it("applies age and form filters to every aggregate cohort", async () => {
    const result = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report($1, 13, 'Form 1', 'this_week') as report",
      [SCHOOL_ID],
    );
    const report = result.rows[0]?.report;
    expect(report.summary.total_students).toBe(1);
    expect(report.engagement.active_students).toBe(1);
    expect(report.engagement.quizzes_completed).toBe(1);
    expect(report.leaderboard.total_xp).toBe(900);
    expect(report.leaderboard.highest_rank).toBe(2);
  });

  it("returns all-school breakdowns, comparisons and official leaderboard presence", async () => {
    const result = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report(null, null, null, 'last_30_days') as report",
    );
    const report = result.rows[0]?.report;
    expect(report.mode).toBe("all_schools");
    expect(report.summary).toMatchObject({ total_schools: 2, total_students: 3 });
    expect(report.engagement).toMatchObject({ active_students: 3, quizzes_completed: 3 });
    expect(report.leaderboard).toMatchObject({ top_10: 3, top_100: 3, schools_in_top_100: 2 });
    if (report.mode !== "all_schools") throw new Error("Expected all-schools report");
    expect(report.school_type_breakdown.map((row) => row.label)).toEqual(["MRSM", "SMK"]);
    expect(report.state_breakdown.map((row) => row.label)).toEqual(["JOHOR", "SELANGOR"]);
    expect(report.school_comparison[0]).toMatchObject({
      name: "MRSM TEST",
      registered_students: 2,
    });
    expect(report.insights.minimum_active_rate_cohort).toBe(10);
    expect(report.insights.highest_active_rate).toBeNull();
    expect(JSON.stringify(report)).not.toContain(STUDENT_ONE);
    expect(JSON.stringify(report)).not.toContain(OTHER_STUDENT);
  });

  it("recalculates every all-school metric for the age and form cohort", async () => {
    const result = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report(null, 14, 'Form 2', 'last_30_days') as report",
    );
    const report = result.rows[0]?.report;
    expect(report.summary).toMatchObject({ total_schools: 1, total_students: 1 });
    expect(report.engagement).toMatchObject({ active_students: 1, quizzes_completed: 1 });
    expect(report.leaderboard).toMatchObject({ top_100: 1, schools_in_top_100: 1 });
    if (report.mode !== "all_schools") throw new Error("Expected all-schools report");
    expect(report.school_comparison).toHaveLength(1);
    expect(report.school_comparison[0]).toMatchObject({
      name: "MRSM TEST",
      registered_students: 1,
    });
  });

  it("rejects a normal student and anon for the all-schools report", async () => {
    const call = "select public.get_admin_school_report(null, null, null, 'this_week')";
    await db.exec(`select set_config('test.uid', '${STUDENT_ONE}', false)`);
    await expect(db.query(call)).rejects.toMatchObject({ code: "42501" });
    await db.exec(`select set_config('test.uid', '', false)`);
    await expect(db.query(call)).rejects.toMatchObject({ code: "42501" });
    await db.exec(`select set_config('test.uid', '${ADMIN_ID}', false)`);
  });

  it("never turns an unknown school id into the all-schools report", async () => {
    await expect(
      db.query("select public.get_admin_school_report($1, null, null, 'this_week')", [
        UNKNOWN_SCHOOL_ID,
      ]),
    ).rejects.toMatchObject({ code: "22023" });
  });

  it("counts only schools with matching students as represented", async () => {
    await db.exec(
      `insert into public.schools values ('00000000-0000-4000-8000-000000000007', 'EMPTY SCHOOL', 'SK', 'PERAK', 'IPOH', true)`,
    );
    const result = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report(null, null, null, 'last_30_days') as report",
    );
    const report = result.rows[0]?.report;
    expect(report.summary.total_schools).toBe(2);
    if (report.mode !== "all_schools") throw new Error("Expected all-schools report");
    expect(report.school_comparison).toHaveLength(2);
  });

  it("keeps execute privileges to authenticated only", async () => {
    const result = await db.query<{ anon: boolean; authenticated: boolean; public_: boolean }>(
      `select
         has_function_privilege('anon', 'public.get_admin_school_report(uuid, integer, text, text)', 'execute') as anon,
         has_function_privilege('authenticated', 'public.get_admin_school_report(uuid, integer, text, text)', 'execute') as authenticated,
         exists (
           select 1 from pg_proc p, aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
           where p.proname = 'get_admin_school_report' and a.grantee = 0
         ) as public_`,
    );
    expect(result.rows[0]).toEqual({ anon: false, authenticated: true, public_: false });
  });

  it("counts learners without a school separately and never as a school", async () => {
    await db.exec(`
      insert into public.profiles values
        ('00000000-0000-4000-8000-0000000000c1', 'student', 'active', null, 14, 'Form 2'),
        ('00000000-0000-4000-8000-0000000000c2', 'student', 'active', null, 13, 'Form 1');
    `);
    const all = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report(null, null, null, 'last_30_days') as report",
    );
    const report = all.rows[0]?.report;
    if (report.mode !== "all_schools") throw new Error("Expected all-schools report");
    expect(report.school_coverage).toEqual({
      registered_learners: report.summary.total_students + 2,
      school_provided: report.summary.total_students,
      school_not_provided: 2,
    });
    expect(report.school_comparison.every((row) => row.id !== null)).toBe(true);
    expect(JSON.stringify(report)).not.toContain("00000000-0000-4000-8000-0000000000c1");

    const cohort = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report(null, 14, 'Form 2', 'last_30_days') as report",
    );
    const cohortReport = cohort.rows[0]?.report;
    if (cohortReport.mode !== "all_schools") throw new Error("Expected all-schools report");
    expect(cohortReport.school_coverage.school_not_provided).toBe(1);

    const specific = await db.query<{ report: AdminSchoolReport }>(
      "select public.get_admin_school_report($1, null, null, 'last_30_days') as report",
      [SCHOOL_ID],
    );
    expect(specific.rows[0]?.report.mode).toBe("specific_school");
    expect(specific.rows[0]?.report).not.toHaveProperty("school_coverage", expect.anything());
  });
});

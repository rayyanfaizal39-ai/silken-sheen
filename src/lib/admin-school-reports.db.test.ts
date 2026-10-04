import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import type { AdminSchoolReport } from "./admin-school-reports";

const migration = readFileSync(
  new URL("../../supabase/migrations/20261003151450_admin_school_reports.sql", import.meta.url),
  "utf8",
);

const ADMIN_ID = "00000000-0000-4000-8000-000000000001";
const SCHOOL_ID = "00000000-0000-4000-8000-000000000002";
const SECOND_SCHOOL_ID = "00000000-0000-4000-8000-000000000006";
const STUDENT_ONE = "00000000-0000-4000-8000-000000000003";
const STUDENT_TWO = "00000000-0000-4000-8000-000000000004";
const OTHER_STUDENT = "00000000-0000-4000-8000-000000000005";

describe("get_admin_school_report", () => {
  const db = new PGlite();

  beforeAll(async () => {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create schema auth;
      create function auth.uid() returns uuid language sql stable as $$ select '${ADMIN_ID}'::uuid $$;
      create function public.is_admin() returns boolean language sql stable as $$ select true $$;

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
});

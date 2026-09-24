// Test-only harness: runs the real quiz XP migrations inside PGlite (WASM
// Postgres) behind a minimal Supabase shim — anon/authenticated roles,
// auth.uid()/auth.jwt() read from request.jwt.claims, and the user_progress
// table as defined in supabase/schema.sql (it predates tracked migrations).
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

const MIGRATIONS = [
  "20260703080703_quiz_history.sql",
  "20260705024551_quiz_history_xp_earned.sql",
  "20260813133207_protect_claimed_mission_xp_from_stale_sync.sql",
  "20260814014705_quiz_bonus_xp_attempt_safety.sql",
  "20260923125557_quiz_xp_one_time_awards.sql",
  "20260923143030_rebalance_quiz_and_mission_xp.sql",
  "20260924120000_harden_complete_quiz_subject_xp.sql",
  "20260924150000_original_quiz_xp_economy.sql",
  "20260924154253_seed_quiz_catalog.sql",
];

const SUPABASE_SHIM = `
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  create table auth.users (id uuid primary key);
  create function auth.jwt() returns jsonb language sql stable as $$
    select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
  $$;
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(auth.jwt() ->> 'sub', '')::uuid
  $$;
  grant usage on schema auth to anon, authenticated;
  grant usage on schema public to anon, authenticated;
  grant execute on all functions in schema auth to anon, authenticated;
  -- Supabase grants table access to the API roles by default; RLS and the
  -- migrations' own revokes decide what is actually reachable.
  alter default privileges in schema public grant all on tables to anon, authenticated;

  create table public.user_progress (
    user_id       uuid references auth.users(id) on delete cascade primary key,
    xp            integer      not null default 0,
    streak        integer      not null default 0,
    last_active   date,
    quizzes_taken integer      not null default 0,
    badges        text[]       not null default '{}',
    favorites     text[]       not null default '{}',
    subject_xp    jsonb        not null default '{}',
    chapter_activity jsonb     not null default '{}',
    missions      jsonb,
    card_mastery  jsonb        not null default '{}',
    last_visited  jsonb,
    avatar_preferences jsonb,
    language_preference text   default 'bm',
    created_at    timestamptz  not null default now(),
    updated_at    timestamptz  not null default now()
  );
  create function public.handle_updated_at() returns trigger language plpgsql as $$
  begin new.updated_at = now(); return new; end; $$;
  create trigger on_user_progress_updated before update on public.user_progress
    for each row execute function public.handle_updated_at();
  alter table public.user_progress enable row level security;
  create policy "Users can read own progress" on public.user_progress
    for select using (auth.uid() = user_id);
  create policy "Users can insert own progress" on public.user_progress
    for insert with check (auth.uid() = user_id);
  create policy "Users can update own progress" on public.user_progress
    for update using (auth.uid() = user_id);
  grant select, insert, update on public.user_progress to authenticated;
`;

export type CompleteQuizArgs = {
  completionId: string;
  quizKey: string;
  subjectId: string;
  chapterKey: string;
  correct: number;
  total: number;
};

export type CatalogQuizArgs = {
  completionId: string;
  quizKey: string;
  correctEasy: number | null;
  correctMedium: number | null;
  correctHard: number | null;
  timerMode: string | null;
};

export type Caller = { role: "anon" | "authenticated"; claims: Record<string, unknown> };

export const registered = (userId: string): Caller => ({
  role: "authenticated",
  claims: { sub: userId, role: "authenticated", is_anonymous: false },
});

export type QuizXpMigration = (typeof MIGRATIONS)[number];

/** `before` stops ahead of that migration, to prove what it changed. */
export async function createQuizXpDb(options: { before?: QuizXpMigration } = {}) {
  const db = new PGlite();
  await db.exec(SUPABASE_SHIM);
  const stop = options.before ? MIGRATIONS.indexOf(options.before) : MIGRATIONS.length;
  const migrations = MIGRATIONS.slice(0, stop);
  for (const file of migrations) {
    const sql = readFileSync(
      new URL(`../../../../supabase/migrations/${file}`, import.meta.url),
      "utf8",
    );
    await db.exec(sql);
  }

  /** Runs `sql` in one transaction as an API caller, like a PostgREST request. */
  async function asCaller<T>(caller: Caller, sql: string, params: unknown[] = []) {
    return db.transaction(async (tx) => {
      await tx.query("select set_config('request.jwt.claims', $1, true)", [
        JSON.stringify(caller.claims),
      ]);
      await tx.exec(`set local role ${caller.role}`);
      return tx.query<T>(sql, params);
    });
  }

  async function completeQuiz(caller: Caller, args: CompleteQuizArgs) {
    const result = await asCaller<{ result: Record<string, unknown> }>(
      caller,
      "select public.complete_quiz($1, $2, $3, $4, $5, $6) as result",
      [args.completionId, args.quizKey, args.subjectId, args.chapterKey, args.correct, args.total],
    );
    return result.rows[0].result;
  }

  async function completeCatalogQuiz(caller: Caller, args: CatalogQuizArgs) {
    const result = await asCaller<{ result: Record<string, unknown> }>(
      caller,
      "select public.complete_catalog_quiz($1, $2, $3, $4, $5, $6) as result",
      [
        args.completionId,
        args.quizKey,
        args.correctEasy,
        args.correctMedium,
        args.correctHard,
        args.timerMode,
      ],
    );
    return result.rows[0].result;
  }

  async function addUser(userId: string, progress?: { xp?: number; subjectXp?: unknown }) {
    await db.query("insert into auth.users (id) values ($1)", [userId]);
    if (progress) {
      await db.query(
        "insert into public.user_progress (user_id, xp, subject_xp) values ($1, $2, $3::jsonb)",
        [userId, progress.xp ?? 0, JSON.stringify(progress.subjectXp ?? {})],
      );
    }
  }

  async function progressOf(userId: string) {
    const { rows } = await db.query<{
      xp: number;
      subject_xp: Record<string, unknown>;
      quizzes_taken: number;
    }>("select xp, subject_xp, quizzes_taken from public.user_progress where user_id = $1", [
      userId,
    ]);
    return rows[0] ?? null;
  }

  async function historyOf(userId: string) {
    const { rows } = await db.query<{
      subject_id: string;
      quiz_key: string;
      xp_earned: number;
      xp_awarded: boolean;
      score_pct: string;
    }>(
      `select subject_id, quiz_key, xp_earned, xp_awarded, score_pct
       from public.quiz_history where user_id = $1 order by created_at`,
      [userId],
    );
    return rows;
  }

  /** Mirrors get_leaderboard(): monthly XP is the month's quiz_history.xp_earned. */
  async function monthlyLeaderboardXp(userId: string) {
    const { rows } = await db.query<{ monthly_xp: number }>(
      `select coalesce(sum(xp_earned), 0)::integer as monthly_xp
       from public.quiz_history
       where user_id = $1 and created_at >= date_trunc('month', now())`,
      [userId],
    );
    return rows[0].monthly_xp;
  }

  return {
    db,
    asCaller,
    completeQuiz,
    completeCatalogQuiz,
    addUser,
    progressOf,
    historyOf,
    monthlyLeaderboardXp,
  };
}

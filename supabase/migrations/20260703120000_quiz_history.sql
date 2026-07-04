-- ═══════════════════════════════════════════════════════════════
-- AcadeMY — Learning History
-- Adds public.quiz_history: one row per completed quiz attempt.
--
-- This is the table getStudentAnalytics() (src/lib/analytics.ts) needs to
-- make subject scores, weak topics, recommended revision, and this-week
-- counters real for Supabase-sourced reads, instead of falling back to
-- mock data. See the TODO(supabase) comments in that file.
-- ═══════════════════════════════════════════════════════════════

-- ─── quiz_history ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_history (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id  TEXT        NOT NULL,
  chapter_key TEXT        NOT NULL,
  score_pct   NUMERIC     NOT NULL,
  correct     INTEGER     NOT NULL,
  total       INTEGER     NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ────────────────────────────────────────────────────
-- (user_id, created_at) — "this week" / windowed queries, most-recent-first feeds
CREATE INDEX IF NOT EXISTS quiz_history_user_id_created_at_idx
  ON public.quiz_history (user_id, created_at DESC);

-- (user_id, subject_id) — subject average scores, best/weakest subject
CREATE INDEX IF NOT EXISTS quiz_history_user_id_subject_id_idx
  ON public.quiz_history (user_id, subject_id);

-- (user_id, chapter_key) — weak topics / per-chapter aggregation
CREATE INDEX IF NOT EXISTS quiz_history_user_id_chapter_key_idx
  ON public.quiz_history (user_id, chapter_key);

-- ─── Row Level Security ───────────────────────────────────────
ALTER TABLE public.quiz_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own quiz_history"   ON public.quiz_history;
DROP POLICY IF EXISTS "Users can insert own quiz_history" ON public.quiz_history;
DROP POLICY IF EXISTS "Users can update own quiz_history" ON public.quiz_history;

-- 1. Users can read their own quiz_history.
CREATE POLICY "Users can read own quiz_history"
  ON public.quiz_history FOR SELECT
  USING (auth.uid() = user_id);

-- 2. Users can insert their own quiz_history.
CREATE POLICY "Users can insert own quiz_history"
  ON public.quiz_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. No UPDATE policy — a quiz_history row is an immutable record of a
--    completed attempt, so it should never need editing after the fact. If
--    a real use case for correction ever comes up, add a scoped UPDATE
--    policy here (e.g. `USING (auth.uid() = user_id)`); until then, no
--    policy means RLS denies all client-side UPDATEs by default.

-- 4. No DELETE policy either, for the same reason — RLS denies all
--    client-side DELETEs by default when no DELETE policy exists. Deleting
--    from quiz_history from the client would corrupt the parent/student
--    learning-history record.

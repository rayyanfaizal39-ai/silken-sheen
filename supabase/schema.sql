-- ═══════════════════════════════════════════════════════════════
-- AcadeMY Database Schema
-- Run this in Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── User Progress ────────────────────────────────────────────
-- Stores all gamification + learning progress, synced from client
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  xp            INTEGER      NOT NULL DEFAULT 0,
  streak        INTEGER      NOT NULL DEFAULT 0,
  last_active   DATE,
  quizzes_taken INTEGER      NOT NULL DEFAULT 0,
  badges        TEXT[]       NOT NULL DEFAULT '{}',
  favorites     TEXT[]       NOT NULL DEFAULT '{}',
  subject_xp    JSONB        NOT NULL DEFAULT '{}',
  chapter_activity JSONB     NOT NULL DEFAULT '{}',
  missions      JSONB,
  card_mastery  JSONB        NOT NULL DEFAULT '{}',
  last_visited  JSONB,
  language_preference TEXT   DEFAULT 'bm',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every write
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_user_progress_updated ON public.user_progress;
CREATE TRIGGER on_user_progress_updated
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── Row Level Security ───────────────────────────────────────
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own progress"   ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

CREATE POLICY "Users can read own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ─── Auto-create profile row on sign-up ──────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

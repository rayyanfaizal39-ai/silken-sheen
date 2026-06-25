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

-- ─── Profiles ─────────────────────────────────────────────────
-- Role + plan live here, separately from user_progress, because admin access
-- control (role) and billing state (plan) shouldn't be mixed into the same
-- row students freely read/write their own gamification data into.
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name  TEXT,
  email      TEXT,
  role       TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  plan       TEXT NOT NULL DEFAULT 'free'    CHECK (plan IN ('free', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- SECURITY DEFINER + STABLE so RLS policies can call this without recursing
-- back into profiles' own RLS (a policy on `profiles` that queries `profiles`
-- directly would deadlock the planner / always see zero rows).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile"   ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles"  ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile"  ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile"  ON public.profiles;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS WITH CHECK can't compare against the row's prior value, so a self
-- update (UPDATE ... WHERE id = auth.uid()) could otherwise smuggle in a
-- changed `role`/`plan` alongside an innocuous column like full_name. This
-- trigger pins both columns back to their existing value whenever the
-- caller isn't an admin, regardless of what the UPDATE statement sent —
-- role changes must go through an admin, plan changes only through
-- confirm_stub_payment() (which runs as SECURITY DEFINER, not through this
-- trigger's own role check, since it's a superuser-context function call).
CREATE OR REPLACE FUNCTION public.prevent_role_plan_self_escalation()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- confirm_stub_payment() sets this transaction-local flag right before its
  -- own `UPDATE profiles SET plan = 'paid'`, since that call is itself a
  -- non-admin user "self"-updating their plan — without the flag, this
  -- trigger would immediately stomp that change back to the old plan.
  IF NOT public.is_admin() AND current_setting('app.bypass_role_plan_guard', true) IS DISTINCT FROM 'true' THEN
    NEW.role := OLD.role;
    NEW.plan := OLD.plan;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profiles_prevent_self_escalation ON public.profiles;
CREATE TRIGGER on_profiles_prevent_self_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_plan_self_escalation();

-- ─── Auto-create profile + progress rows on sign-up ──────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Payments ─────────────────────────────────────────────────
-- STUB IMPLEMENTATION: no real payment gateway is wired up yet (see
-- src/routes/-upgrade.server.ts). `method` will read 'stub' until a real
-- gateway (ToyyibPay/Billplz/Stripe/etc.) is integrated — at that point, swap
-- the confirm_stub_payment() call for a real webhook handler that verifies
-- the gateway's signature before marking a payment 'paid'.
CREATE TABLE IF NOT EXISTS public.payments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  amount     NUMERIC(10, 2) NOT NULL,
  currency   TEXT NOT NULL DEFAULT 'MYR',
  plan       TEXT NOT NULL CHECK (plan IN ('monthly', 'annual')),
  method     TEXT,
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'failed', 'refunded'))
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own payments"   ON public.payments;
DROP POLICY IF EXISTS "Admins can read all payments"  ON public.payments;
DROP POLICY IF EXISTS "Users can create own payments" ON public.payments;

CREATE POLICY "Users can read own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all payments"
  ON public.payments FOR SELECT
  USING (public.is_admin());

-- Only 'pending' rows may be self-inserted (a real gateway integration would
-- create the pending row before redirecting to checkout). There is
-- intentionally NO update policy here — flipping a payment to 'paid' only
-- happens through confirm_stub_payment() below, never via a direct UPDATE,
-- so a user can't grant themselves a paid plan by editing the row.
CREATE POLICY "Users can create own payments"
  ON public.payments FOR INSERT
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Confirms a pending stub payment and upgrades the user's plan, atomically.
-- SECURITY DEFINER so it can update both `payments` and `profiles` despite
-- neither table having a direct UPDATE-to-paid policy for users themselves.
-- Re-checks ownership + pending status server-side so this can't be called
-- for someone else's payment or replayed on an already-settled one.
CREATE OR REPLACE FUNCTION public.confirm_stub_payment(payment_id UUID)
RETURNS public.payments LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  updated_payment public.payments;
BEGIN
  UPDATE public.payments
  SET status = 'paid', method = 'stub'
  WHERE id = payment_id AND user_id = auth.uid() AND status = 'pending'
  RETURNING * INTO updated_payment;

  IF updated_payment IS NULL THEN
    RAISE EXCEPTION 'Payment not found, not pending, or not owned by caller';
  END IF;

  PERFORM set_config('app.bypass_role_plan_guard', 'true', true);
  UPDATE public.profiles SET plan = 'paid' WHERE id = auth.uid();

  RETURN updated_payment;
END;
$$;

-- ─── Admin Analytics ──────────────────────────────────────────
-- security_invoker means this view enforces the *caller's* RLS on the
-- underlying tables (not the view owner's) — so a non-admin querying it
-- directly still only ever sees their own row, same as querying profiles
-- would. Admin-only access is enforced by profiles' own RLS, not by this view.
CREATE OR REPLACE VIEW public.admin_users_overview
WITH (security_invoker = true) AS
SELECT
  p.id,
  p.full_name,
  p.email,
  p.role,
  p.plan,
  p.created_at,
  up.last_active AS last_login_at,
  COALESCE(up.quizzes_taken, 0) AS total_quizzes
FROM public.profiles p
LEFT JOIN public.user_progress up ON up.user_id = p.id;

-- Aggregate dashboard stats, computed from user_progress (no quiz_attempts
-- table exists — quiz history isn't tracked per-attempt, only as running
-- totals/JSONB on user_progress, so avg_quiz_score is always 0 and
-- subject_distribution is an XP-based engagement proxy, not literal attempt
-- counts). SECURITY DEFINER to aggregate across all users; explicitly checks
-- is_admin() first since DEFINER functions bypass RLS by design.
CREATE OR REPLACE FUNCTION public.admin_dashboard_stats()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  result JSONB;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'total_students', (SELECT COUNT(*) FROM public.profiles WHERE role = 'student'),
    'total_teachers', (SELECT COUNT(*) FROM public.profiles WHERE role = 'teacher'),
    'total_admins', (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin'),
    'total_paid', (SELECT COUNT(*) FROM public.profiles WHERE plan = 'paid'),
    'total_free', (SELECT COUNT(*) FROM public.profiles WHERE plan = 'free'),
    'total_quiz_attempts', (SELECT COALESCE(SUM(quizzes_taken), 0) FROM public.user_progress),
    'avg_quiz_score', 0,
    'most_popular_subject', (
      SELECT subject
      FROM (
        SELECT kv.key AS subject, SUM(kv.value::NUMERIC) AS total_xp
        FROM public.user_progress up, jsonb_each_text(up.subject_xp) kv
        GROUP BY kv.key
        ORDER BY total_xp DESC
        LIMIT 1
      ) top
    ),
    'most_attempted_chapter', (
      SELECT chapter
      FROM (
        SELECT kv.key AS chapter, COUNT(*) AS n
        FROM public.user_progress up, jsonb_each(up.chapter_activity) kv
        WHERE (kv.value->>'quiz')::BOOLEAN IS TRUE
        GROUP BY kv.key
        ORDER BY n DESC
        LIMIT 1
      ) top
    ),
    'revenue_total', (SELECT COALESCE(SUM(amount), 0) FROM public.payments WHERE status = 'paid'),
    'subject_distribution', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('label', subject, 'value', total_xp)), '[]'::JSONB)
      FROM (
        SELECT kv.key AS subject, SUM(kv.value::NUMERIC) AS total_xp
        FROM public.user_progress up, jsonb_each_text(up.subject_xp) kv
        GROUP BY kv.key
        ORDER BY total_xp DESC
      ) dist
    ),
    'signups_by_day', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('day', day, 'value', n) ORDER BY day), '[]'::JSONB)
      FROM (
        SELECT created_at::DATE AS day, COUNT(*) AS n
        FROM public.profiles
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY day
      ) signups
    )
  ) INTO result;

  RETURN result;
END;
$$;

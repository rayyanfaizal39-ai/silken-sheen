-- Part A (SECURITY FIX, pre-existing issue found while building the Admin
-- Users module, not introduced by this task):
-- public.admin_users_overview was owned by `postgres` with relrowsecurity
-- disabled (a plain view bypasses RLS on its underlying tables by default)
-- AND had SELECT/INSERT/UPDATE/DELETE grants for `anon`. Net effect: every
-- user's full_name, email, role, plan, last_active and quiz count was
-- readable with just the public anon key, no login required.
-- Fix: rebuild the view WITH (security_invoker = true) so it runs as the
-- querying user and is subject to profiles/user_progress/quiz_history RLS
-- exactly like every other admin-only read in this codebase (is_admin()).
-- Then drop the unnecessary write grants (a reporting view has no business
-- accepting INSERT/UPDATE/DELETE).

-- Part B (schema additions needed for the Users module UI):
-- profiles is missing username/school/form/status — additive only, no
-- renames, no new tables.

alter table public.profiles
  add column if not exists username text,
  add column if not exists school text,
  add column if not exists form text,
  add column if not exists status text not null default 'active'
    check (status in ('active', 'suspended'));

-- Admin-read policies matching the is_admin() pattern already used on
-- profiles/payments — needed so the Users table can show XP/streak/quiz
-- average for users other than the admin themself.
drop policy if exists "Admins can read all user_progress" on public.user_progress;
create policy "Admins can read all user_progress"
  on public.user_progress for select
  using (is_admin());

drop policy if exists "Admins can read all quiz_history" on public.quiz_history;
create policy "Admins can read all quiz_history"
  on public.quiz_history for select
  using (is_admin());

-- Rebuild the view: same first 8 columns (unchanged, for existing
-- consumers), new columns appended after.
create or replace view public.admin_users_overview
with (security_invoker = true) as
select
  p.id,
  p.full_name,
  p.email,
  p.role,
  p.plan,
  p.created_at,
  up.last_active as last_login_at,
  coalesce(up.quizzes_taken, 0) as total_quizzes,
  p.username,
  p.school,
  p.form,
  p.status,
  coalesce(up.xp, 0) as xp,
  coalesce(up.streak, 0) as streak,
  coalesce(up.badges, '{}') as badges,
  qh.avg_score_pct,
  coalesce(qh.quiz_count, 0) as quiz_count
from public.profiles p
left join public.user_progress up on up.user_id = p.id
left join lateral (
  select avg(score_pct) as avg_score_pct, count(*) as quiz_count
  from public.quiz_history
  where user_id = p.id
) qh on true;

revoke insert, update, delete, truncate on public.admin_users_overview from anon, authenticated;

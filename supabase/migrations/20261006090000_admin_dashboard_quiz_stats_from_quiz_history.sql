-- Admin dashboard quiz analytics: read the real per-attempt table.
--
-- admin_dashboard_stats() previously derived quiz numbers from user_progress:
--   * total_quiz_attempts = SUM(user_progress.quizzes_taken)
--   * avg_quiz_score      = hardcoded 0   (why the dashboard showed 0%)
--   * subject_distribution / most_popular_subject = SUM of user_progress.subject_xp
--     (XP, not attempts — why science showed 55875)
--   * most_attempted_chapter = user_progress.chapter_activity keys
--
-- quiz_history holds one row per completed attempt (retakes included: every
-- completion inserts a row, and user_progress.quizzes_taken also increments on
-- every completion, so counting rows keeps the existing "retakes count"
-- definition). Quiz XP / retake logic is untouched.
--
-- Score: score_pct is NOT NULL on every row, but if a row ever lacks it we fall
-- back to correct/total*100. Rows where neither is calculable are excluded from
-- the average (never coerced to 0). A genuine 0% is kept.

create or replace function public.admin_dashboard_stats()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'Admin access required';
  end if;

  with attempts as (
    select
      subject_id,
      chapter_key,
      coalesce(
        score_pct,
        case when total > 0 then (correct::numeric / total) * 100 end
      ) as pct
    from public.quiz_history
  ),
  subject_counts as (
    select subject_id as label, count(*) as n
    from attempts
    group by subject_id
  ),
  chapter_counts as (
    select subject_id, chapter_key, count(*) as n
    from attempts
    group by subject_id, chapter_key
  )
  select jsonb_build_object(
    'total_users', (select count(*) from public.profiles),
    'total_students', (select count(*) from public.profiles where role = 'student'),
    'total_teachers', (select count(*) from public.profiles where role = 'teacher'),
    'total_admins', (select count(*) from public.profiles where role = 'admin'),
    'total_paid', (select count(*) from public.profiles where plan = 'paid'),
    'total_free', (select count(*) from public.profiles where plan = 'free'),
    'total_quiz_attempts', (select count(*) from attempts),
    'avg_quiz_score', (select round(avg(pct), 1) from attempts),
    'most_popular_subject', (
      select label from subject_counts order by n desc, label asc limit 1
    ),
    'most_attempted_chapter', (
      select subject_id || ':' || chapter_key
      from chapter_counts order by n desc, subject_id asc, chapter_key asc limit 1
    ),
    'revenue_total', (select coalesce(sum(amount), 0) from public.payments where status = 'paid'),
    'subject_distribution', (
      select coalesce(
        jsonb_agg(jsonb_build_object('label', label, 'value', n) order by n desc, label asc),
        '[]'::jsonb
      )
      from subject_counts
    ),
    'signups_by_day', (
      select coalesce(jsonb_agg(jsonb_build_object('day', day, 'value', n) order by day), '[]'::jsonb)
      from (
        select created_at::date as day, count(*) as n
        from public.profiles
        where created_at >= now() - interval '30 days'
        group by day
      ) signups
    )
  ) into result;

  return result;
end;
$$;

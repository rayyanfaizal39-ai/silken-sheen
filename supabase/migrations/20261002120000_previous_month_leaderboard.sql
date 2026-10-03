-- Previous Malaysia-month Hall of Fame.
--
-- The live leaderboard is not stored and nothing monthly is deleted. Monthly
-- XP, quiz count, accuracy, and tie-break order are recomputed from immutable
-- quiz_history rows. This function reads the previous Asia/Kuala_Lumpur
-- calendar month with the same eligibility and ordering as get_leaderboard.
-- It does not insert a snapshot, so running it again cannot duplicate history.
--
-- The window is always derived from now() in Asia/Kuala_Lumpur:
-- period_end is the start of the current Malaysia month, and period_start is
-- the start of the month before it. October reads September, November reads
-- October, and January reads December of the previous year. No month name or
-- year is hard-coded, so later months work without another deployment.
-- A previous month with no XP-bearing quiz_history rows returns students: []
-- and does not raise.
--
-- Names and schools are the student's current public profile, using the same
-- abbreviated display name as the live board. They are not a frozen snapshot.
-- Streak is omitted: the stored streak is the current streak, not the
-- streak at the end of the historical month.
-- xp_through_month_end reconstructs Cosmic Rank from timestamped quiz XP and
-- mission rewards awarded before that month ended. It is not the student's
-- current lifetime XP.

create or replace function public.get_previous_leaderboard(
  page_size integer default 10,
  page_offset integer default 0
)
returns jsonb
language plpgsql
security definer
stable
set search_path = pg_catalog, public
as $$
declare
  caller_id uuid := auth.uid();
  period_end_local timestamp;
  period_start_local timestamp;
  period_start timestamptz;
  period_end timestamptz;
  month_key text;
  result jsonb;
begin
  if caller_id is null then
    raise exception 'Sign in required' using errcode = '42501';
  end if;

  if page_size < 1 or page_size > 50 or page_offset < 0 then
    raise exception 'Invalid leaderboard page' using errcode = '22023';
  end if;

  period_end_local := date_trunc('month', now() at time zone 'Asia/Kuala_Lumpur');
  period_start_local := period_end_local - interval '1 month';
  period_start := period_start_local at time zone 'Asia/Kuala_Lumpur';
  period_end := period_end_local at time zone 'Asia/Kuala_Lumpur';
  month_key := to_char(period_start_local, 'YYYY-MM');

  with monthly_activity as (
    select
      qh.user_id,
      sum(qh.xp_earned)::integer as monthly_xp,
      count(*)::integer as monthly_quiz_count,
      sum(qh.correct)::integer as monthly_correct,
      sum(qh.total)::integer as monthly_total,
      min(qh.created_at) as first_earned_at
    from public.quiz_history qh
    where qh.created_at >= period_start
      and qh.created_at < period_end
      and qh.xp_earned > 0
    group by qh.user_id
  ),
  safe_students as (
    select
      p.id as user_id,
      case
        when nullif(btrim(p.full_name), '') is null
          then coalesce(nullif(btrim(p.username), ''), 'Student')
        when array_length(regexp_split_to_array(btrim(p.full_name), '\s+'), 1) = 1
          then btrim(p.full_name)
        else
          (regexp_split_to_array(btrim(p.full_name), '\s+'))[1] || ' ' ||
          left((regexp_split_to_array(btrim(p.full_name), '\s+'))[
            array_length(regexp_split_to_array(btrim(p.full_name), '\s+'), 1)
          ], 1) || '.'
      end as display_name,
      sc.school_name,
      ma.monthly_xp,
      ma.monthly_quiz_count,
      ma.monthly_correct,
      ma.monthly_total,
      ma.first_earned_at,
      (
        coalesce((
          select sum(past.xp_earned)::integer
          from public.quiz_history past
          where past.user_id = p.id
            and past.created_at < period_end
            and past.xp_earned > 0
        ), 0)
        +
        coalesce((
          select sum(claims.reward_xp)::integer
          from public.mission_reward_claims claims
          where claims.user_id = p.id
            and claims.awarded_at < period_end
        ), 0)
      )::integer as xp_through_month_end
    from monthly_activity ma
    join public.profiles p on p.id = ma.user_id
    left join public.schools sc on sc.id = p.school_id
    where p.role = 'student'
      and p.status = 'active'
  ),
  ranked as (
    select
      row_number() over (
        order by monthly_xp desc, first_earned_at asc, user_id asc
      )::integer as position,
      user_id,
      display_name,
      school_name,
      monthly_xp,
      monthly_quiz_count,
      monthly_correct,
      monthly_total,
      xp_through_month_end
    from safe_students
  ),
  shaped as (
    select
      position,
      user_id,
      jsonb_build_object(
        'position', position,
        'display_name', display_name,
        'school_name', school_name,
        'monthly_xp', monthly_xp,
        'monthly_quiz_count', monthly_quiz_count,
        'monthly_correct', monthly_correct,
        'monthly_total', monthly_total,
        'xp_through_month_end', xp_through_month_end,
        'is_current_user', user_id = caller_id
      ) as row_data
    from ranked
  )
  select jsonb_build_object(
    'month_key', month_key,
    'period_start', period_start,
    'period_end', period_end,
    'generated_at', now(),
    'students', coalesce((
      select jsonb_agg(row_data order by position)
      from shaped
      where position > page_offset
        and position <= page_offset + page_size
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_previous_leaderboard(integer, integer) from public;
revoke all on function public.get_previous_leaderboard(integer, integer) from anon;
grant execute on function public.get_previous_leaderboard(integer, integer) to authenticated;

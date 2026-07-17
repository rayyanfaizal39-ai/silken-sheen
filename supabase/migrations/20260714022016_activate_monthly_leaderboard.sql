-- Privacy-scoped monthly leaderboard.
--
-- quiz_history is the only existing immutable, timestamped XP history. It
-- records the real per-question XP earned for completed quizzes. Lifetime XP
-- in user_progress is deliberately used only for the student's rank title;
-- it is never substituted for monthly XP.
--
-- The function returns only leaderboard-safe fields. In particular it does
-- not expose profile UUIDs, email addresses, full names, or raw table rows.
-- Remove the old zero-argument implementation before adding pagination.
drop function if exists public.get_leaderboard();

create or replace function public.get_leaderboard(
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
  result jsonb;
begin
  if caller_id is null then
    raise exception 'Sign in required' using errcode = '42501';
  end if;

  if page_size < 1 or page_size > 50 or page_offset < 0 then
    raise exception 'Invalid leaderboard page' using errcode = '22023';
  end if;

  with monthly_activity as (
    select
      qh.user_id,
      sum(qh.xp_earned)::integer as monthly_xp,
      count(*)::integer as monthly_quiz_count,
      sum(qh.correct)::integer as monthly_correct,
      sum(qh.total)::integer as monthly_total,
      min(qh.created_at) as first_earned_at
    from public.quiz_history qh
    where qh.created_at >= date_trunc('month', now())
      and qh.created_at < now()
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
      coalesce(up.xp, 0)::integer as lifetime_xp,
      up.streak,
      ma.monthly_xp,
      ma.monthly_quiz_count,
      ma.monthly_correct,
      ma.monthly_total,
      ma.first_earned_at
    from monthly_activity ma
    join public.profiles p on p.id = ma.user_id
    left join public.user_progress up on up.user_id = p.id
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
      lifetime_xp,
      streak,
      monthly_xp,
      monthly_quiz_count,
      monthly_correct,
      monthly_total,
      first_earned_at
    from safe_students
  ),
  shaped as (
    select
      position,
      user_id,
      jsonb_build_object(
        'position', position,
        'display_name', display_name,
        'lifetime_xp', lifetime_xp,
        'streak', streak,
        'monthly_xp', monthly_xp,
        'monthly_quiz_count', monthly_quiz_count,
        'monthly_correct', monthly_correct,
        'monthly_total', monthly_total,
        'is_current_user', user_id = caller_id
      ) as row_data
    from ranked
  )
  select jsonb_build_object(
    'month', to_char(now(), 'FMMonth YYYY'),
    'period_start', date_trunc('month', now()),
    'generated_at', now(),
    'students', coalesce((
      select jsonb_agg(row_data order by position)
      from shaped
      where position > page_offset
        and position <= page_offset + page_size
    ), '[]'::jsonb),
    'current_position', (
      select row_data
      from shaped
      where user_id = caller_id
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_leaderboard(integer, integer) from public;
revoke all on function public.get_leaderboard(integer, integer) from anon;
grant execute on function public.get_leaderboard(integer, integer) to authenticated;

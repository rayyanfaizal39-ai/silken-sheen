-- Adds the student's school to the monthly leaderboard as display metadata.
--
-- PHASE 1 NOTE — this deliberately does NOT add a denormalized
-- profiles.school_name column. The normalized directory already exists and is
-- already populated: public.schools (2,400+ verified KPM/MOE rows) joined via
-- profiles.school_id, written by the onboarding flow and the Edit Profile
-- dialog and FK-constrained by profiles_school_id_fkey. Adding a text column
-- would create a second, immediately-diverging source of truth for the same
-- fact. The legacy public.profiles.school text column is unused (0 rows
-- populated) and is intentionally NOT read here.
--
-- The school is display-only. It is added to the SELECT list and the JSON
-- payload only — never to a WHERE clause, a JOIN that can drop rows, or an
-- ORDER BY. Ranking, XP, accuracy, quiz count, streak, eligibility, the
-- monthly period, subscriptions and guest behaviour are all byte-for-byte
-- unchanged from 20260714022016_activate_monthly_leaderboard.sql.
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
      -- Canonical verified name, exactly as stored. The UI abbreviates it for
      -- display (src/lib/school-display.ts); the RPC keeps the full value so
      -- the canonical name is never lost. NULL when the student has not set a
      -- school — the UI then omits the school line rather than inventing one.
      sc.school_name,
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
    -- LEFT JOIN: a student with no school_id, or a school_id pointing at an
    -- inactive/removed row, still ranks exactly as before with school_name NULL.
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
        'school_name', school_name,
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

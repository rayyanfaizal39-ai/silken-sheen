
-- Forward-only. Do not apply until the owner approves the release checklist.
-- Replaces leaderboard functions only. Does not update XP, subscriptions, or profiles.
-- Source: production get_leaderboard and get_previous_leaderboard definitions, read-only 2026-11-24.
-- Junior keeps quiz-v1, quiz-v2 and NULL-key legacy records; exclude Senior/Primary competitive XP only.
-- Junior and Senior current-month periods now use Malaysia timezone consistently.
-- Previous-month xp_through_month_end stays all-world lifetime XP, intentionally.
begin;
CREATE OR REPLACE FUNCTION public.get_leaderboard(page_size integer DEFAULT 10, page_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'pg_catalog', 'public'
AS $function$
declare
  caller_id uuid := auth.uid();
  period_start timestamptz;
  result jsonb;
begin
  -- The shared leaderboard is a student-only API. The parent dashboard
  -- has its own reporting paths and must not reuse competitive leaderboards.
  if caller_id is null or coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) then
    raise exception 'Registered Junior student required' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.profiles caller
    where caller.id = caller_id and caller.role = 'student'
      and caller.status = 'active'
  ) then
    raise exception 'Registered Junior student required' using errcode = '42501';
  end if;

  if page_size < 1 or page_size > 50 or page_offset < 0 then
    raise exception 'Invalid leaderboard page' using errcode = '22023';
  end if;

  -- Align the current month with the previous-month Hall and Senior League:
  -- midnight on day 1 in Malaysia, independently of database session timezone.
  period_start := date_trunc('month', now() at time zone 'Asia/Kuala_Lumpur')
    at time zone 'Asia/Kuala_Lumpur';

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
      and qh.created_at < now()
      and qh.xp_earned > 0
      and (qh.quiz_key is null or (qh.quiz_key not like 'senior:%' and qh.quiz_key not like 'primary:%'))
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
    'month', to_char(now() at time zone 'Asia/Kuala_Lumpur', 'FMMonth YYYY'),
    'period_start', period_start,
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
$function$;

CREATE OR REPLACE FUNCTION public.get_previous_leaderboard(page_size integer DEFAULT 10, page_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'pg_catalog', 'public'
AS $function$
declare
  caller_id uuid := auth.uid();
  period_end_local timestamp;
  period_start_local timestamp;
  period_start timestamptz;
  period_end timestamptz;
  month_key text;
  result jsonb;
begin
  -- The shared leaderboard is a student-only API. The parent dashboard
  -- has its own reporting paths and must not reuse competitive leaderboards.
  if caller_id is null or coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) then
    raise exception 'Registered Junior student required' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.profiles caller
    where caller.id = caller_id and caller.role = 'student'
      and caller.status = 'active'
  ) then
    raise exception 'Registered Junior student required' using errcode = '42501';
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
      and (qh.quiz_key is null or (qh.quiz_key not like 'senior:%' and qh.quiz_key not like 'primary:%'))
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
$function$;

-- Senior: verified award rows only, monthly/weekly Malaysia time; one combined Forms 4-5 league.
create or replace function public.get_senior_leaderboard(
  requested_period text default 'monthly',
  page_size integer default 50,
  page_offset integer default 0
) returns jsonb language plpgsql stable security definer
set search_path = pg_catalog, public
as $senior_board$
declare
  caller_id uuid := auth.uid();
  period_start_local timestamp;
  period_start timestamptz;
  result jsonb;
begin
  if caller_id is null or coalesce((auth.jwt() ->> 'is_anonymous')::boolean,false) then
    raise exception 'Registered Senior student required' using errcode='42501';
  end if;
  if not exists (
    select 1 from public.profiles p where p.id=caller_id and p.role='student'
      and p.status='active' and p.form in ('Form 4','Form 5')
  ) then
    raise exception 'Registered Senior student required' using errcode='42501';
  end if;
  if requested_period is null or requested_period not in ('monthly','weekly') then
    raise exception 'Invalid leaderboard period' using errcode='22023';
  end if;
  if page_size is null or page_size<1 or page_size>50 or page_offset is null or page_offset<0 then
    raise exception 'Invalid leaderboard page' using errcode='22023';
  end if;

  if requested_period='weekly' then
    period_start_local:=date_trunc('week',now() at time zone 'Asia/Kuala_Lumpur');
  else
    period_start_local:=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur');
  end if;
  period_start:=period_start_local at time zone 'Asia/Kuala_Lumpur';

  with senior_activity as (
    select qh.user_id,sum(qh.xp_earned)::integer as period_xp,
      min(qh.created_at) as first_earned_at,max(qh.created_at) as last_activity_at
    from public.quiz_history qh
    join public.quiz_xp_awards aw on aw.user_id=qh.user_id
      and aw.quiz_key=qh.quiz_key and aw.completion_id=qh.completion_id
      and aw.xp_earned=qh.xp_earned
    where qh.created_at>=period_start and qh.created_at<now()
      and qh.xp_earned>0 and qh.quiz_key like 'senior:%'
    group by qh.user_id
  ), eligible as (
    select p.id as user_id,
      case
        when nullif(btrim(p.full_name),'') is null
          then coalesce(nullif(btrim(p.username),''),'Student')
        when array_length(regexp_split_to_array(btrim(p.full_name), '\s+'),1)=1
          then btrim(p.full_name)
        else (regexp_split_to_array(btrim(p.full_name), '\s+'))[1] || ' ' ||
          left((regexp_split_to_array(btrim(p.full_name), '\s+'))[
            array_length(regexp_split_to_array(btrim(p.full_name), '\s+'),1)
          ],1) || '.'
      end as display_name,
      sa.period_xp,sa.first_earned_at,sa.last_activity_at
    from senior_activity sa join public.profiles p on p.id=sa.user_id
    where p.role='student' and p.status='active'
  ), ranked as (
    select row_number() over (
      order by period_xp desc,first_earned_at asc,user_id asc
    )::integer as position,
    lag(period_xp) over (
      order by period_xp desc,first_earned_at asc,user_id asc
    ) as preceding_xp,
    user_id,display_name,period_xp,last_activity_at
    from eligible
  ), shaped as (
    select position,user_id,jsonb_build_object(
      'rank',position,'display_name',display_name,
      'xp',period_xp,'last_activity_at',last_activity_at,
      'xp_to_next_rank',case when position>1
        then greatest(0,preceding_xp-period_xp) else null end,
      'is_current_user',user_id=caller_id
    ) as row_data
    from ranked
  )
  select jsonb_build_object(
    'league','senior','source_app','senior','period',requested_period,
    'period_start',period_start,'generated_at',now(),
    'students',coalesce((
      select jsonb_agg(row_data order by position) from shaped
      where position>page_offset and position<=page_offset+page_size
    ),'[]'::jsonb),
    'current_position',(select row_data from shaped where user_id=caller_id)
  ) into result;
  return result;
end;
$senior_board$;

revoke all on function public.get_leaderboard(integer,integer) from public,anon;
revoke all on function public.get_previous_leaderboard(integer,integer) from public,anon;
revoke all on function public.get_senior_leaderboard(text,integer,integer) from public,anon;
grant execute on function public.get_leaderboard(integer,integer) to authenticated;
grant execute on function public.get_previous_leaderboard(integer,integer) to authenticated;
grant execute on function public.get_senior_leaderboard(text,integer,integer) to authenticated;
commit;

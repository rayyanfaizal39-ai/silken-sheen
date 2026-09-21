with sept as (select date_trunc('month', now()) as s)
select
  coalesce(nullif(btrim(p.full_name),''), p.username, 'Student') as student,
  p.plan as profile_plan,
  coalesce(sub.plan,'(none)') as subscription_plan,
  coalesce(mae.quiz_events, 0) as sept_quiz_attempts_tracked,
  coalesce(qh.rows_written, 0) as sept_quiz_history_rows,
  coalesce(qh.sept_xp, 0) as sept_xp,
  case
    when coalesce(qh.sept_xp,0) > 0 and p.role='student' and p.status='active' then 'YES'
    when coalesce(mae.quiz_events,0) > 0 then 'NO - activity exists but no XP row'
    else 'NO - no September quiz activity'
  end as leaderboard_eligible
from public.profiles p
left join (
  select user_id, count(*) as quiz_events
  from public.mission_activity_events, sept
  where activity_type='quiz' and local_date_key >= sept.s::date
  group by user_id
) mae on mae.user_id = p.id
left join (
  select user_id, count(*) as rows_written, sum(coalesce(xp_earned,0)) as sept_xp
  from public.quiz_history, sept
  where created_at >= sept.s
  group by user_id
) qh on qh.user_id = p.id
left join lateral (
  select plan from public.subscriptions s
  where s.user_id = p.id and s.status='active' limit 1
) sub on true
where p.role='student'
  and (coalesce(mae.quiz_events,0) > 0 or coalesce(qh.rows_written,0) > 0)
order by sept_xp desc, sept_quiz_attempts_tracked desc;

-- Galaxy Hall of Fame leaderboard read path.
--
-- profiles/user_progress/quiz_history RLS only allow a user to read their
-- OWN row (plus admins reading everything) — correct for privacy, but a
-- leaderboard inherently needs every student's name/school/XP/streak
-- visible to every other student. Rather than loosen row-level RLS (which
-- would also expose those tables to arbitrary per-row reads elsewhere),
-- this follows the same SECURITY DEFINER pattern already used by
-- admin_dashboard_stats(): one function, explicitly scoped to only the
-- fields a leaderboard needs (no email, no payments), gated on the caller
-- being signed in.
create or replace function public.get_leaderboard()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if auth.uid() is null then
    raise exception 'Sign in required';
  end if;

  select coalesce(jsonb_agg(row_data order by
    (row_data->>'monthly_xp')::int desc,
    (row_data->>'monthly_quiz_count')::int desc,
    (row_data->>'lifetime_xp')::int desc,
    row_data->>'id' asc
  ), '[]'::jsonb)
  into result
  from (
    select jsonb_build_object(
      'id', p.id,
      'full_name', p.full_name,
      'school', p.school,
      'lifetime_xp', coalesce(up.xp, 0),
      'streak', up.streak,               -- NULL when no user_progress row — real "no data", never fabricated
      'monthly_xp', coalesce(qh.monthly_xp, 0),
      'monthly_quiz_count', coalesce(qh.monthly_quiz_count, 0),
      'monthly_correct', coalesce(qh.monthly_correct, 0),
      'monthly_total', coalesce(qh.monthly_total, 0),
      'created_at', p.created_at
    ) as row_data
    from public.profiles p
    left join public.user_progress up on up.user_id = p.id
    left join (
      select
        user_id,
        sum(xp_earned) filter (where xp_earned is not null) as monthly_xp,
        count(*) as monthly_quiz_count,
        sum(correct) as monthly_correct,
        sum(total) as monthly_total
      from public.quiz_history
      where created_at >= date_trunc('month', now())
      group by user_id
    ) qh on qh.user_id = p.id
    where p.role = 'student'
  ) rows;

  return jsonb_build_object(
    'month', to_char(now(), 'FMMonth YYYY'),
    'students', result
  );
end;
$$;

revoke execute on function public.get_leaderboard() from public;
grant execute on function public.get_leaderboard() to authenticated;

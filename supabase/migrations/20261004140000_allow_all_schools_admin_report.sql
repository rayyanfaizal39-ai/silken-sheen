-- Corrective migration: make a NULL school id mean "All Schools".
-- 20261003151450_admin_school_reports.sql is already applied in production and
-- must not be edited as a deployment mechanism. Production's deployed
-- get_admin_school_report rejects NULL ("School is required", 22023); this
-- re-creates the function with the current all-schools-capable definition.
-- Also adds aggregate school_coverage (all-schools mode only): learners with a
-- school, learners whose school is not provided (school_id IS NULL), and the sum.
-- Only the function and its grants change: no tables, policies or data.
--   p_school_id NULL      -> all-schools report (schools with matching students)
--   p_school_id not null  -> specific-school report; an unknown or inactive
--                            school still raises 'Active school not found'
-- Security is unchanged: security invoker, sign-in + is_admin() checks,
-- execute revoked from public/anon, granted to authenticated only.

begin;

drop function if exists public.get_admin_school_report(uuid, integer, text, text);
create or replace function public.get_admin_school_report(
  p_school_id uuid default null,
  p_age integer default null,
  p_form text default null,
  p_date_range text default 'this_month'
)
returns jsonb
language plpgsql
stable
security invoker
set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  report_today date := (now() at time zone 'Asia/Kuala_Lumpur')::date;
  period_start date;
  period_end date := report_today + 1;
  minimum_active_rate_cohort constant integer := 10;
  result jsonb;
begin
  if caller_id is null then
    raise exception 'Sign in required' using errcode = '42501';
  end if;
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if p_age is not null and p_age not between 13 and 17 then
    raise exception 'Age must be between 13 and 17' using errcode = '22023';
  end if;
  if p_form is not null and p_form not in ('Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5') then
    raise exception 'Invalid form' using errcode = '22023';
  end if;

  period_start := case p_date_range
    when 'this_week' then report_today - (extract(isodow from report_today)::integer - 1)
    when 'this_month' then date_trunc('month', report_today)::date
    when 'last_30_days' then report_today - 29
    else null
  end;
  if period_start is null then
    raise exception 'Invalid date range' using errcode = '22023';
  end if;

  with selected_schools as (
    select s.id, s.school_name, s.school_type, s.state, s.district
    from public.schools s
    where s.active
      and (p_school_id is null or s.id = p_school_id)
  ),
  filtered_students as (
    select
      p.id,
      p.age,
      p.form,
      s.id as school_id,
      s.school_name,
      coalesce(nullif(btrim(s.school_type), ''), 'UNSPECIFIED') as school_type,
      s.state,
      s.district
    from public.profiles p
    join selected_schools s on s.id = p.school_id
    where p.role = 'student'
      and (p_age is null or p.age = p_age)
      and (p_form is null or p.form = p_form)
  ),
  period_mission_events as (
    select e.user_id, e.activity_type, e.local_date_key, e.metadata
    from public.mission_activity_events e
    join filtered_students f on f.id = e.user_id
    where e.local_date_key >= period_start
      and e.local_date_key < period_end
  ),
  period_quizzes as (
    select q.user_id, q.subject_id, q.chapter_key, q.created_at
    from public.quiz_history q
    join filtered_students f on f.id = q.user_id
    where q.created_at >= period_start::timestamp at time zone 'Asia/Kuala_Lumpur'
      and q.created_at < period_end::timestamp at time zone 'Asia/Kuala_Lumpur'
  ),
  learning_days as (
    select e.user_id, e.local_date_key as activity_date
    from period_mission_events e
    union
    select q.user_id, (q.created_at at time zone 'Asia/Kuala_Lumpur')::date as activity_date
    from period_quizzes q
  ),
  active_day_counts as (
    select user_id, count(*)::integer as active_days
    from learning_days
    group by user_id
  ),
  latest_activity as (
    select activity.user_id, max(activity.activity_date) as last_activity_date
    from (
      select e.user_id, e.local_date_key as activity_date
      from public.mission_activity_events e
      join filtered_students f on f.id = e.user_id
      union all
      select q.user_id, (q.created_at at time zone 'Asia/Kuala_Lumpur')::date
      from public.quiz_history q
      join filtered_students f on f.id = q.user_id
    ) activity
    group by activity.user_id
  ),
  quiz_by_student as (
    select user_id, count(*)::integer as quiz_count
    from period_quizzes
    group by user_id
  ),
  event_by_student as (
    select
      user_id,
      count(*) filter (where activity_type = 'lesson')::integer as notes_studied,
      count(*) filter (where activity_type = 'flashcard')::integer as flashcard_reviews,
      count(*) filter (
        where activity_type = 'flashcard'
          and coalesce(metadata->>'rating', '') ~ '^[0-9]+$'
          and (metadata->>'rating')::integer >= 2
      )::integer as flashcards_rated_good
    from period_mission_events
    group by user_id
  ),
  monthly_activity as (
    select
      qh.user_id,
      sum(qh.xp_earned)::integer as monthly_xp,
      min(qh.created_at) as first_earned_at
    from public.quiz_history qh
    where qh.created_at >= date_trunc('month', now())
      and qh.created_at < now()
      and qh.xp_earned > 0
    group by qh.user_id
  ),
  official_ranked as (
    select
      row_number() over (
        order by ma.monthly_xp desc, ma.first_earned_at asc, p.id asc
      )::integer as position,
      p.id as user_id
    from monthly_activity ma
    join public.profiles p on p.id = ma.user_id
    where p.role = 'student' and p.status = 'active'
  ),
  student_metrics as (
    select
      f.*,
      coalesce(ad.active_days, 0)::integer as active_days,
      (coalesce(ad.active_days, 0) > 0) as is_active,
      coalesce(q.quiz_count, 0)::integer as quiz_count,
      coalesce(e.notes_studied, 0)::integer as notes_studied,
      coalesce(e.flashcard_reviews, 0)::integer as flashcard_reviews,
      coalesce(e.flashcards_rated_good, 0)::integer as flashcards_rated_good,
      coalesce(up.streak, 0)::integer as streak,
      coalesce(up.xp, 0)::bigint as total_xp,
      r.position as official_rank,
      la.last_activity_date
    from filtered_students f
    left join active_day_counts ad on ad.user_id = f.id
    left join quiz_by_student q on q.user_id = f.id
    left join event_by_student e on e.user_id = f.id
    left join public.user_progress up on up.user_id = f.id
    left join official_ranked r on r.user_id = f.id
    left join latest_activity la on la.user_id = f.id
  ),
  school_rollup as (
    select
      school_id as id,
      school_name as name,
      school_type as type,
      state,
      district,
      count(*)::integer as registered_students,
      count(*) filter (where is_active)::integer as active_students,
      coalesce(round(count(*) filter (where is_active)::numeric * 100 / nullif(count(*), 0), 1), 0) as active_rate,
      sum(active_days)::integer as active_study_days,
      coalesce(round(sum(active_days)::numeric / nullif(count(*) filter (where is_active), 0), 1), 0) as average_active_days,
      sum(quiz_count)::integer as quiz_count,
      sum(notes_studied)::integer as notes_studied,
      sum(flashcard_reviews)::integer as flashcard_reviews,
      sum(flashcards_rated_good)::integer as flashcards_rated_good,
      count(*) filter (where official_rank <= 100)::integer as students_in_top_100,
      min(official_rank) as highest_official_rank,
      sum(total_xp)::bigint as total_xp
    from student_metrics
    group by school_id, school_name, school_type, state, district
  ),
  school_type_rollup as (
    select
      type as label,
      count(*)::integer as schools_represented,
      sum(registered_students)::integer as students,
      sum(active_students)::integer as active_students,
      coalesce(round(sum(active_students)::numeric * 100 / nullif(sum(registered_students), 0), 1), 0) as active_rate,
      coalesce(round(sum(active_study_days)::numeric / nullif(sum(active_students), 0), 1), 0) as average_active_days,
      sum(quiz_count)::integer as quizzes_completed,
      sum(flashcard_reviews)::integer as flashcard_reviews,
      sum(students_in_top_100)::integer as students_in_top_100
    from school_rollup
    group by type
  ),
  state_rollup as (
    select
      state as label,
      count(*)::integer as schools_represented,
      sum(registered_students)::integer as students,
      sum(active_students)::integer as active_students,
      coalesce(round(sum(active_students)::numeric * 100 / nullif(sum(registered_students), 0), 1), 0) as active_rate
    from school_rollup
    group by state
  ),
  -- Learners with no school (school_id IS NULL) are never counted as a school and
  -- never enter the school-based sections; they surface only as an aggregate count.
  school_not_provided as (
    select count(*)::integer as learners
    from public.profiles p
    where p_school_id is null
      and p.role = 'student'
      and p.school_id is null
      and (p_age is null or p.age = p_age)
      and (p_form is null or p.form = p_form)
  ),
  subject_popularity as (
    select q.subject_id as label, count(*)::integer as value
    from period_quizzes q
    group by q.subject_id
    order by value desc, label asc
    limit 1
  ),
  chapter_popularity as (
    select q.chapter_key as label, count(*)::integer as value
    from period_quizzes q
    group by q.chapter_key
    order by value desc, label asc
    limit 1
  ),
  top_100_school as (
    select school_id, school_name, count(*)::integer as value
    from student_metrics
    where official_rank <= 100
    group by school_id, school_name
    order by value desc, school_name asc
    limit 1
  ),
  top_100_type as (
    select school_type as label, count(*)::integer as value
    from student_metrics
    where official_rank <= 100
    group by school_type
    order by value desc, school_type asc
    limit 1
  )
  select jsonb_build_object(
    'mode', case when p_school_id is null then 'all_schools' else 'specific_school' end,
    'school', case when p_school_id is null then null else (
      select jsonb_build_object(
        'id', s.id,
        'name', s.school_name,
        'type', s.school_type,
        'state', s.state,
        'district', s.district
      )
      from selected_schools s
    ) end,
    'period', jsonb_build_object(
      'key', p_date_range,
      'start', period_start,
      'end', period_end - 1
    ),
    'summary', jsonb_build_object(
      'total_schools', (select count(*)::integer from school_rollup),
      'total_students', (select count(*)::integer from student_metrics),
      'age_distribution', coalesce((
        select jsonb_agg(jsonb_build_object('label', age::text, 'value', value) order by age)
        from (
          select age, count(*)::integer as value
          from filtered_students
          where age is not null
          group by age
        ) ages
      ), '[]'::jsonb),
      'form_distribution', coalesce((
        select jsonb_agg(jsonb_build_object('label', form, 'value', value) order by form)
        from (
          select form, count(*)::integer as value
          from filtered_students
          where form is not null
          group by form
        ) forms
      ), '[]'::jsonb),
      'school_type_distribution', coalesce((
        select jsonb_agg(jsonb_build_object('label', label, 'value', students) order by students desc, label)
        from school_type_rollup
      ), '[]'::jsonb),
      'state_distribution', coalesce((
        select jsonb_agg(jsonb_build_object('label', label, 'value', students) order by students desc, label)
        from state_rollup
      ), '[]'::jsonb)
    ),
    'engagement', jsonb_build_object(
      'active_students', (select count(*)::integer from student_metrics where is_active),
      'active_rate', coalesce((
        select round(count(*) filter (where is_active)::numeric * 100 / nullif(count(*), 0), 1)
        from student_metrics
      ), 0),
      'average_active_days', coalesce((
        select round(sum(active_days)::numeric / nullif(count(*) filter (where is_active), 0), 1)
        from student_metrics
      ), 0),
      'quizzes_completed', (select coalesce(sum(quiz_count), 0)::integer from student_metrics),
      'notes_studied', (select coalesce(sum(notes_studied), 0)::integer from student_metrics),
      'flashcards_reviewed', (select coalesce(sum(flashcard_reviews), 0)::integer from student_metrics),
      'flashcards_rated_good', (select coalesce(sum(flashcards_rated_good), 0)::integer from student_metrics),
      'active_streaks', (select count(*)::integer from student_metrics where streak > 0),
      'inactive_7_plus_days', (
        select count(*)::integer
        from student_metrics
        where last_activity_date is null or last_activity_date <= report_today - 7
      )
    ),
    'leaderboard', jsonb_build_object(
      'period_label', to_char(now(), 'FMMonth YYYY'),
      'top_10', (select count(*)::integer from student_metrics where official_rank <= 10),
      'top_50', (select count(*)::integer from student_metrics where official_rank <= 50),
      'top_100', (select count(*)::integer from student_metrics where official_rank <= 100),
      'schools_in_top_100', (select count(distinct school_id)::integer from student_metrics where official_rank <= 100),
      'school_with_most_top_100', (select jsonb_build_object('school_id', school_id, 'school_name', school_name, 'value', value) from top_100_school),
      'school_type_with_most_top_100', (select to_jsonb(t) from top_100_type t),
      'highest_rank', (select min(official_rank) from student_metrics),
      'total_xp', (select coalesce(sum(total_xp), 0)::bigint from student_metrics),
      'active_in_top_100_pct', coalesce((
        select round(
          count(*) filter (where is_active and official_rank <= 100)::numeric * 100
          / nullif(count(*) filter (where is_active), 0),
          1
        )
        from student_metrics
      ), 0)
    ),
    'learning_activity', jsonb_build_object(
      'most_popular_subject', (select to_jsonb(s) from subject_popularity s),
      'most_popular_chapter', (select to_jsonb(c) from chapter_popularity c)
    ),
    'school_type_breakdown', case when p_school_id is null then coalesce((
      select jsonb_agg(to_jsonb(t) order by students desc, label)
      from school_type_rollup t
    ), '[]'::jsonb) else '[]'::jsonb end,
    'state_breakdown', case when p_school_id is null then coalesce((
      select jsonb_agg(to_jsonb(s) order by students desc, label)
      from state_rollup s
    ), '[]'::jsonb) else '[]'::jsonb end,
    'school_comparison', case when p_school_id is null then coalesce((
      select jsonb_agg(to_jsonb(s) - 'active_study_days' order by registered_students desc, name)
      from school_rollup s
    ), '[]'::jsonb) else '[]'::jsonb end,
    'insights', case when p_school_id is null then jsonb_build_object(
      'minimum_active_rate_cohort', minimum_active_rate_cohort,
      'most_registered_students', (
        select jsonb_build_object('school_id', id, 'school_name', name, 'value', registered_students)
        from school_rollup order by registered_students desc, name limit 1
      ),
      'highest_active_rate', (
        select jsonb_build_object('school_id', id, 'school_name', name, 'value', active_rate)
        from school_rollup
        where registered_students >= minimum_active_rate_cohort
        order by active_rate desc, registered_students desc, name
        limit 1
      ),
      'most_top_100_students', (
        select jsonb_build_object('school_id', id, 'school_name', name, 'value', students_in_top_100)
        from school_rollup
        where students_in_top_100 > 0
        order by students_in_top_100 desc, name
        limit 1
      ),
      'most_quizzes_completed', (
        select jsonb_build_object('school_id', id, 'school_name', name, 'value', quiz_count)
        from school_rollup
        where quiz_count > 0
        order by quiz_count desc, name
        limit 1
      ),
      'most_flashcard_reviews', (
        select jsonb_build_object('school_id', id, 'school_name', name, 'value', flashcard_reviews)
        from school_rollup
        where flashcard_reviews > 0
        order by flashcard_reviews desc, name
        limit 1
      )
    ) else null end,
    'school_coverage', case when p_school_id is null then jsonb_build_object(
      'registered_learners', (select count(*)::integer from student_metrics) + (select learners from school_not_provided),
      'school_provided', (select count(*)::integer from student_metrics),
      'school_not_provided', (select learners from school_not_provided)
    ) else null end,
    'retention', jsonb_build_object(
      'available', false,
      'day_1', null,
      'day_7', null,
      'day_14', null,
      'day_30', null,
      'reason', 'A complete append-only learning-activity history and documented activation cohort boundary are required.'
    )
  ) into result;

  if p_school_id is not null and result->'school' = 'null'::jsonb then
    raise exception 'Active school not found' using errcode = '22023';
  end if;

  return result;
end;
$$;

revoke all on function public.get_admin_school_report(uuid, integer, text, text) from public;
revoke all on function public.get_admin_school_report(uuid, integer, text, text) from anon;
grant execute on function public.get_admin_school_report(uuid, integer, text, text) to authenticated;

commit;

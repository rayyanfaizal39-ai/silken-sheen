-- REVIEW ONLY. Do not apply to production before the isolated staging gates pass.
-- Aligns database entitlement checks with src/config/features.ts and lets an already
-- submitted journey finish after subscription expiry. It does not enable generation.
begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table private.academy_plans (
  plan text primary key check (plan ~ '^[a-z][a-z0-9_]*$')
);

create table private.academy_plan_features (
  plan text not null references private.academy_plans(plan) on delete cascade,
  feature text not null check (feature ~ '^[a-z][a-z0-9_]*$'),
  primary key (plan, feature)
);

create table private.academy_stored_plan_aliases (
  stored_plan text primary key check (stored_plan ~ '^[a-z][a-z0-9_]*$'),
  plan text not null references private.academy_plans(plan) on delete restrict
);

revoke all on private.academy_plans, private.academy_plan_features,
  private.academy_stored_plan_aliases from public, anon, authenticated;

-- This JSON is the SQL seed and is compared byte-for-meaning with PLAN_FEATURES in CI.
with matrix(value) as (values ($academy_plan_features$
{
  "basic": [],
  "explorer": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics"],
  "captain": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "parent_dashboard", "parent_reports", "parent_progress_monitoring", "parent_subject_performance", "parent_weak_topic_alerts", "parent_recommendations", "parent_analytics"],
  "teacher": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "teacher_dashboard", "ai_quiz_generation"],
  "school": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "teacher_dashboard", "ai_quiz_generation", "school_dashboard", "admin_upload_center"],
  "enterprise": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "parent_dashboard", "parent_reports", "parent_progress_monitoring", "parent_subject_performance", "parent_weak_topic_alerts", "parent_recommendations", "parent_analytics", "admin_upload_center", "ai_quiz_generation", "teacher_dashboard", "school_dashboard", "marketplace"]
}
$academy_plan_features$::jsonb))
insert into private.academy_plans(plan)
select key from matrix cross join lateral jsonb_each(matrix.value);

with matrix(value) as (values ($academy_plan_features$
{
  "basic": [],
  "explorer": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics"],
  "captain": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "parent_dashboard", "parent_reports", "parent_progress_monitoring", "parent_subject_performance", "parent_weak_topic_alerts", "parent_recommendations", "parent_analytics"],
  "teacher": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "teacher_dashboard", "ai_quiz_generation"],
  "school": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "teacher_dashboard", "ai_quiz_generation", "school_dashboard", "admin_upload_center"],
  "enterprise": ["student_learning", "quiz_history", "progress_sync", "xp_companion_progress", "cosmic_companion", "ace_ai_support", "ai_tracker", "personalized_recommendations", "weak_topic_detection", "learning_analytics", "parent_dashboard", "parent_reports", "parent_progress_monitoring", "parent_subject_performance", "parent_weak_topic_alerts", "parent_recommendations", "parent_analytics", "admin_upload_center", "ai_quiz_generation", "teacher_dashboard", "school_dashboard", "marketplace"]
}
$academy_plan_features$::jsonb))
insert into private.academy_plan_features(plan, feature)
select plans.key, features.value
from matrix
cross join lateral jsonb_each(matrix.value) plans(key, value)
cross join lateral jsonb_array_elements_text(plans.value) features(value);

-- The alias map is compared with STORED_PLAN_ALIASES in the same parity test.
with aliases(value) as (values ($academy_plan_aliases$
{
  "basic": "basic",
  "explorer": "explorer",
  "captain": "captain",
  "teacher": "teacher",
  "school": "school",
  "enterprise": "enterprise",
  "free": "basic",
  "paid": "explorer",
  "pro": "explorer",
  "premium": "captain"
}
$academy_plan_aliases$::jsonb))
insert into private.academy_stored_plan_aliases(stored_plan, plan)
select entries.key, entries.value #>> '{}'
from aliases cross join lateral jsonb_each(aliases.value) entries(key, value);

create function private.academy_subscription_has_feature(account_id uuid, requested_feature text)
returns boolean language sql stable set search_path = '' as $$
  select exists (
    select 1
    from public.subscriptions s
    join private.academy_stored_plan_aliases a on a.stored_plan = s.plan
    join private.academy_plan_features f
      on f.plan = a.plan and f.feature = requested_feature
    where s.user_id = account_id
      and s.status = 'active'
      and s.current_period_end > now()
  );
$$;
revoke all on function private.academy_subscription_has_feature(uuid, text)
  from public, anon, authenticated;

create or replace function public.nova_subscription_active(owner_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.academy_subscription_has_feature(owner_id, 'cosmic_companion');
$$;
revoke all on function public.nova_subscription_active(uuid) from public, anon, authenticated;

-- Entitlement is checked atomically when nova_submit_companions creates the permanent card.
-- After that point the paid worker may finish the already accepted journey even if billing
-- expires. Active-student validation, prompt/DNA validation, switches, attempt limits and both
-- spending caps still apply.
create or replace function public.nova_prepare_batch() returns uuid
language plpgsql security definer set search_path = '' as $$
declare s public.nova_generation_settings; r record; bid uuid; ep text; mdl text; spent bigint; spent_today bigint;
  month date; today date;
begin
  select * into strict s from public.nova_generation_settings where singleton for update;
  if not s.enabled or not s.batch_enabled then return null; end if;
  if (select count(*) from public.nova_generation_batches where status<>'completed')>=s.max_batches then return null; end if;
  month=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur')::date;
  today=(now() at time zone 'Asia/Kuala_Lumpur')::date;
  select coalesce(sum(reserved_microusd),0) into spent from public.nova_batch_requests where budget_month=month;
  select coalesce(sum(reserved_microusd),0) into spent_today from public.nova_batch_requests
    where (created_at at time zone 'Asia/Kuala_Lumpur')::date=today;
  for r in select p.*,j.stage,j.card_id from public.nova_generation_candidates p
    join public.nova_generation_jobs j on j.id=p.job_id join public.nova_cards c on c.id=j.card_id
    where p.status='pending' and p.attempts<2 and p.retry_after<=now()
      and j.stage=1
      and exists(select 1 from public.profiles profile
        where profile.id=c.owner_id and profile.role='student' and profile.status='active')
      and public.nova_job_generation_allowed(j, s)
    order by p.retry_after,p.id limit s.max_batch_requests for update of p skip locked loop
    if spent+s.reserve_microusd>s.monthly_cap_microusd or spent_today+s.reserve_microusd>s.daily_cap_microusd then exit; end if;
    if bid is null then
      ep=case when r.stage=1 then '/v1/images/generations' else '/v1/images/edits' end;
      mdl=case when r.stage=1 then s.origin_model else s.edit_model end;
      insert into public.nova_generation_batches(model,endpoint,quality) values(mdl,ep,s.quality) returning id into bid;
    end if;
    if (r.stage=1)<>(ep='/v1/images/generations') then continue; end if;
    insert into public.nova_batch_requests(batch_id,candidate_id,custom_id,attempt,reserved_microusd,budget_month)
      values(bid,r.id,'nova_'||replace(gen_random_uuid()::text,'-',''),r.attempts+1,s.reserve_microusd,month);
    update public.nova_generation_candidates set status='assigned',attempts=attempts+1,error_code=null where id=r.id;
    update public.nova_generation_jobs set status='running',error_code=null,updated_at=now() where id=r.job_id;
    spent=spent+s.reserve_microusd;
    spent_today=spent_today+s.reserve_microusd;
  end loop;
  if bid is not null then insert into public.nova_generation_audit(action,subject_id) values('batch_reserved',bid); end if;
  return bid;
end;
$$;

create or replace function public.nova_begin_submission(batch uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
declare s public.nova_generation_settings;
begin
  select * into s from public.nova_generation_settings where singleton;
  if not (s.enabled and s.batch_enabled)
    or exists(select 1 from public.nova_batch_requests r
      join public.nova_generation_candidates p on p.id=r.candidate_id
      join public.nova_generation_jobs j on j.id=p.job_id
      join public.nova_cards c on c.id=j.card_id
      where r.batch_id=batch and (j.stage<>1
        or not exists(select 1 from public.profiles profile
          where profile.id=c.owner_id and profile.role='student' and profile.status='active')
        or not public.nova_job_generation_allowed(j, s)))
      then return false; end if;
  update public.nova_generation_batches set status='submitting',updated_at=now() where id=batch and status='prepared';
  return found;
end;
$$;

revoke all on function public.nova_prepare_batch(), public.nova_begin_submission(uuid)
  from public, anon, authenticated;
grant execute on function public.nova_prepare_batch(), public.nova_begin_submission(uuid)
  to service_role;

commit;

-- Forward-only. Do not apply until the owner approves the release checklist.
-- Does not update user_progress, subscriptions, payments, or existing profiles.
-- Prerequisite: senior_form_entitlements grade/payment binding from the Senior access PR.
-- Purpose: Verified Senior quiz answers -> one-time Junior-compatible XP & quiz_history.
-- IMPORTANT: catalog entries for Senior are inactive, preventing the older
-- complete_catalog_quiz() RPC from being used to fabricate Senior result counts.
-- Review SECURITY DEFINER ownership, grants, paid entitlement and rollback first.

begin;

-- Existing catalog constraint limits forms to 1-3 and kinds to Junior categories.
alter table public.quiz_catalog drop constraint if exists quiz_catalog_form_check;
alter table public.quiz_catalog add constraint quiz_catalog_form_check
  check (form between 1 and 5);
alter table public.quiz_catalog drop constraint if exists quiz_catalog_kind_check;
alter table public.quiz_catalog add constraint quiz_catalog_kind_check
  check (kind = any(array['standard','math-objective','english','bm-world','senior']::text[]));

-- Protect confirmed Senior forms from self-service switching that could
-- create extra XP-earning opportunities in the combined Senior league.
create or replace function public.prevent_senior_form_hopping()
returns trigger language plpgsql security invoker set search_path = ''
as $guard$
begin
  if new.form is distinct from old.form
     and old.form in ('Form 4','Form 5')
     and current_user not in ('postgres','service_role')
     and not coalesce(public.is_admin(),false) then
    raise exception 'Senior form is locked. Contact support for corrections.'
      using errcode='42501';
  end if;
  return new;
end;
$guard$;

drop trigger if exists protect_senior_profile_form on public.profiles;
create trigger protect_senior_profile_form
before update of form on public.profiles
for each row execute function public.prevent_senior_form_hopping();

-- Contains private scoring reference only; no direct Data API grants or RLS policies.
create table if not exists public.senior_quiz_answer_keys (
  quiz_key text not null references public.quiz_catalog(quiz_key) on delete cascade,
  question_id text not null,
  correct_answer text not null check (correct_answer in ('A','B','C','D')),
  difficulty_tier text not null check (difficulty_tier in ('easy','medium','hard')),
  primary key (quiz_key, question_id)
);
alter table public.senior_quiz_answer_keys enable row level security;
revoke all on table public.senior_quiz_answer_keys from public, anon, authenticated;

create or replace function public.complete_senior_quiz(
  requested_completion_id uuid,
  requested_quiz_key text,
  requested_answers jsonb
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $fn$
declare
  caller_id uuid := auth.uid();
  quiz public.quiz_catalog;
  verified_count integer;
  verified_present integer;
  submitted_count integer;
  registered_grade text;
  permitted boolean := false;
  correct_easy integer;
  correct_medium integer;
  correct_hard integer;
  reward record;
  inserted_request uuid;
  prior_request public.quiz_completion_requests;
  inserted_award integer;
  actual_award integer := 0;
  lifetime integer;
  subject_total integer;
  resulting_quizzes_taken integer;
begin
  if caller_id is null or coalesce((auth.jwt() ->> 'is_anonymous')::boolean,false) then
    raise exception 'Registered student required' using errcode='42501';
  end if;
  if requested_completion_id is null or requested_answers is null
    or jsonb_typeof(requested_answers) <> 'object' then
    raise exception 'Invalid quiz completion' using errcode='22023';
  end if;

  -- Every value must be the JSON string A, B, C, or D. Reject letters outside
  -- that set, nulls, numbers, booleans, arrays, and nested objects.
  if exists (
    select 1
    from jsonb_each(requested_answers) as submitted(question_id, answer)
    where jsonb_typeof(submitted.answer) is distinct from 'string'
       or submitted.answer #>> '{}' not in ('A', 'B', 'C', 'D')
  ) then
    raise exception 'Invalid quiz answer' using errcode='22023';
  end if;

  select * into quiz from public.quiz_catalog
    where quiz_key = requested_quiz_key and kind = 'senior'
      and form in (4,5) and is_active = false;
  if quiz.quiz_key is null then
    raise exception 'Unregistered Senior quiz' using errcode='22023';
  end if;

  select p.form into registered_grade
  from public.profiles p where p.id=caller_id
    and coalesce(lower(p.role), 'student') not in ('parent','guardian');
  if registered_grade is null or
    registered_grade not in ('Form ' || quiz.form::text) then
    raise exception 'Registered grade does not match quiz' using errcode='42501';
  end if;

  -- Chapter 1 is the only free access. Never trust a claim in the payload.
  if quiz.chapter_key <> 'chapter-01' then
    select exists (
      select 1 from public.senior_form_entitlements e
      join public.subscriptions s on s.id=e.subscription_id and s.user_id=e.user_id
      join public.payment_transactions t on t.id=e.payment_id
        and t.subscription_id=s.id and t.user_id=e.user_id
      where e.user_id=caller_id and e.form_level=quiz.form
        and s.status='active' and s.plan in ('pro','premium')
        and s.current_period_end > now() and t.payment_status='successful'
    ) into permitted;
    if not permitted then
      raise exception 'Paid grade entitlement required' using errcode='42501';
    end if;
  end if;

  select count(*)::integer into submitted_count
  from jsonb_each(requested_answers);
  if submitted_count <> quiz.total_questions then
    raise exception 'Quiz answers incomplete' using errcode='22023';
  end if;

  select count(*)::integer,
    count(*) filter (where requested_answers ? question_id)::integer,
    count(*) filter (where difficulty_tier='easy' and requested_answers->>question_id = correct_answer)::integer,
    count(*) filter (where difficulty_tier='medium' and requested_answers->>question_id = correct_answer)::integer,
    count(*) filter (where difficulty_tier='hard' and requested_answers->>question_id = correct_answer)::integer
  into verified_count, verified_present, correct_easy, correct_medium, correct_hard
  from public.senior_quiz_answer_keys
  where quiz_key=quiz.quiz_key;

  if verified_count <> quiz.total_questions or verified_present <> verified_count then
    raise exception 'Quiz answer bank does not match submission' using errcode='22023';
  end if;

  -- Database calculates the score, not the browser. No timer bonus.
  select * into reward from public.original_quiz_xp(
    'objective', quiz.total_questions, correct_easy,correct_medium,correct_hard,'none'
  );

  -- Serialize this student's awards across Junior and Senior.
  perform pg_advisory_xact_lock(hashtextextended('quiz-award:' || caller_id::text,0));

  insert into public.quiz_completion_requests (
    id,user_id,quiz_key,subject_id,chapter_key,correct,total,score_pct,
    completion_xp,score_bonus_xp,api_version,formula,
    correct_easy,correct_medium,correct_hard,timer_mode,
    base_xp,correct_bonus_xp,timer_bonus_xp,pass_bonus_xp
  ) values (
    requested_completion_id,caller_id,quiz.quiz_key,quiz.subject_id,quiz.chapter_key,
    reward.correct_total,quiz.total_questions,reward.score_pct,
    0,0,3,'objective',correct_easy,correct_medium,correct_hard,'none',
    reward.base_xp,reward.correct_bonus_xp,0,reward.pass_bonus_xp
  ) on conflict (id) do nothing returning id into inserted_request;

  if inserted_request is null then
    select * into prior_request from public.quiz_completion_requests
    where id=requested_completion_id;
    if prior_request.id is null or prior_request.user_id<>caller_id
      or prior_request.quiz_key<>quiz.quiz_key
      or prior_request.correct<>reward.correct_total
      or prior_request.api_version<>3 then
      raise exception 'Completion id already used for different submission' using errcode='22023';
    end if;
    select xp, public.safe_subject_xp(subject_xp -> quiz.subject_id), quizzes_taken
      into lifetime,subject_total,resulting_quizzes_taken
    from public.user_progress where user_id=caller_id;
    return jsonb_build_object('accepted',false,'awarded',false,'xpEarned',0,
      'correct',reward.correct_total,'total',quiz.total_questions,
      'scorePct',reward.score_pct,'lifetimeXp',lifetime,'subjectXp',subject_total,
      'quizzesTaken',resulting_quizzes_taken);
  end if;

  -- Unique(user_id,quiz_key): retakes record activity but do not farm XP.
  insert into public.quiz_xp_awards (user_id,quiz_key,completion_id,xp_earned)
  values (caller_id,quiz.quiz_key,requested_completion_id,reward.total_xp)
  on conflict (user_id,quiz_key) do nothing returning xp_earned into inserted_award;
  actual_award := coalesce(inserted_award,0);

  insert into public.user_progress (user_id,xp,quizzes_taken,subject_xp,last_active)
  values (caller_id, actual_award,1,
    case when actual_award>0 then jsonb_build_object(quiz.subject_id,actual_award)
      else '{}'::jsonb end, current_date)
  on conflict (user_id) do update set
    xp = public.user_progress.xp + actual_award,
    subject_xp = case when actual_award>0 then
      jsonb_set(case when jsonb_typeof(public.user_progress.subject_xp)='object'
        then public.user_progress.subject_xp else '{}'::jsonb end,
      array[quiz.subject_id],
      to_jsonb(public.safe_subject_xp(public.user_progress.subject_xp -> quiz.subject_id)+actual_award),true)
      else public.user_progress.subject_xp end,
    quizzes_taken=public.user_progress.quizzes_taken+1,
    last_active=current_date
  returning xp,public.safe_subject_xp(subject_xp -> quiz.subject_id),quizzes_taken
  into lifetime,subject_total,resulting_quizzes_taken;

  update public.quiz_completion_requests
    set xp_earned=actual_award,xp_awarded=(actual_award>0)
  where id=requested_completion_id;

  insert into public.quiz_history (
    user_id,subject_id,chapter_key,score_pct,correct,total,xp_earned,
    completion_id,quiz_key,xp_awarded,timer_mode,
    base_xp,speed_bonus_xp,streak_bonus_xp,pass_bonus_xp
  ) values (
    caller_id,quiz.subject_id,quiz.chapter_key,reward.score_pct,
    reward.correct_total,quiz.total_questions,actual_award,
    requested_completion_id,quiz.quiz_key,(actual_award>0),'none',
    reward.base_xp,0,reward.correct_bonus_xp,reward.pass_bonus_xp
  ) on conflict (completion_id) where completion_id is not null do nothing;

  return jsonb_build_object('accepted',true,'awarded',(actual_award>0),
    'xpEarned',actual_award,'correct',reward.correct_total,'total',quiz.total_questions,
    'scorePct',reward.score_pct,'lifetimeXp',lifetime,'subjectXp',subject_total,
    'quizzesTaken',resulting_quizzes_taken);
end;
$fn$;

-- SECURITY DEFINER is necessary because XP award tables intentionally deny
-- direct writes. This function always uses auth.uid, checks the owner's grade
-- and entitlement, and recalculates score using its protected answer registry.
revoke all on function public.complete_senior_quiz(uuid,text,jsonb) from public,anon;
grant execute on function public.complete_senior_quiz(uuid,text,jsonb) to authenticated;

commit;

-- AFTER deploying this reviewed DDL, generate quiz entries from current Senior
-- content with: node scripts/generate-senior-quiz-catalog.mjs > /tmp/senior-seed.sql
-- Review the generated seed & apply separately (do NOT run automatically).
-- Keep is_active=false for ALL senior quiz_catalog entries. This is mandatory:
-- complete_catalog_quiz must never award Senior XP from self-declared counts.

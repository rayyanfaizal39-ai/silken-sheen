-- Original AcadeMY quiz XP economy on the server-authoritative award path.
--
-- Restores the pre-2026-09-23 amounts (verified from git b4a40f32..b5cd2136^)
-- while keeping the one-time award ledger, completion-id idempotency and the
-- blocked browser writes from 20260923125557 / 20260924120000.
--
--   standard   per correct answer: Easy 10 / Medium 20 / Hard 30 (any other
--              difficulty 10) + 5 correct-answer bonus + timer bonus
--              (none 0, 60 s 5, 30 s 10, 15 s 15); +25 when score >= 80%.
--   objective  English and Maths objective: the same without timer XP.
--   bm_world   BM World: score band 45/35/20/10 (>=90/>=80/>=60/else)
--              + 5 speed and + 5 correct-answer bonus per correct; +25 pass.
--
-- XP is only awarded for a quiz in public.quiz_catalog, which is generated
-- from app content (next migration, scripts/generate-quiz-catalog.ts).
-- Awards stay one per registered user and canonical quiz.
-- No existing XP, history or user rows are changed.

-- ─── Formula ─────────────────────────────────────────────────────────────────

-- Highest XP a catalog quiz can award (all correct, 15 s timer when allowed).
create or replace function public.quiz_catalog_max_xp(
  formula text,
  easy_count integer,
  medium_count integer,
  hard_count integer,
  total_questions integer
)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case formula
    when 'bm_world' then 45 + total_questions * 10 + 25
    when 'standard' then easy_count * 30 + medium_count * 40 + hard_count * 50 + 25
    else easy_count * 15 + medium_count * 25 + hard_count * 35 + 25
  end;
$$;

-- The historical breakdown for one result. Inputs must already be validated
-- against the catalog; timer_mode is one of none/60/30/15.
create or replace function public.original_quiz_xp(
  formula text,
  total_questions integer,
  correct_easy integer,
  correct_medium integer,
  correct_hard integer,
  timer_mode text,
  out correct_total integer,
  out score_pct integer,
  out base_xp integer,
  out correct_bonus_xp integer,
  out timer_bonus_xp integer,
  out pass_bonus_xp integer,
  out total_xp integer
)
language plpgsql
immutable
set search_path = ''
as $$
begin
  correct_total := correct_easy + correct_medium + correct_hard;
  score_pct := round((correct_total::numeric / total_questions) * 100);
  pass_bonus_xp := case when score_pct >= 80 then 25 else 0 end;
  correct_bonus_xp := correct_total * 5;

  if formula = 'bm_world' then
    base_xp := case
      when score_pct >= 90 then 45
      when score_pct >= 80 then 35
      when score_pct >= 60 then 20
      else 10
    end;
    timer_bonus_xp := correct_total * 5;
  else
    base_xp := correct_easy * 10 + correct_medium * 20 + correct_hard * 30;
    timer_bonus_xp := case
      when formula <> 'standard' then 0
      else correct_total * case timer_mode
        when '60' then 5
        when '30' then 10
        when '15' then 15
        else 0
      end
    end;
  end if;

  total_xp := base_xp + correct_bonus_xp + timer_bonus_xp + pass_bonus_xp;
end;
$$;

revoke all on function public.quiz_catalog_max_xp(text, integer, integer, integer, integer)
  from public, anon, authenticated;
revoke all on function public.original_quiz_xp(text, integer, integer, integer, integer, text)
  from public, anon, authenticated;

-- ─── Catalog ─────────────────────────────────────────────────────────────────

create table if not exists public.quiz_catalog (
  quiz_key text primary key check (length(quiz_key) between 1 and 240),
  kind text not null check (kind in ('standard', 'math-objective', 'english', 'bm-world')),
  formula text not null check (formula in ('standard', 'objective', 'bm_world')),
  subject_id text not null check (length(subject_id) between 1 and 80),
  form smallint not null check (form between 1 and 3),
  chapter_key text not null check (length(chapter_key) between 1 and 160),
  lang text not null check (length(lang) between 1 and 8),
  total_questions integer not null check (total_questions between 1 and 500),
  easy_count integer not null check (easy_count >= 0),
  medium_count integer not null check (medium_count >= 0),
  hard_count integer not null check (hard_count >= 0),
  timer_bonus_allowed boolean not null,
  max_xp integer not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  check (easy_count + medium_count + hard_count = total_questions),
  check (timer_bonus_allowed = (formula = 'standard')),
  check (
    max_xp = public.quiz_catalog_max_xp(formula, easy_count, medium_count, hard_count, total_questions)
  )
);

-- Maps each key the 2026-09-23 client sends (quiz-v1:..., no language) to the
-- catalog quizzes it can mean, so that client keeps working during the switch.
create table if not exists public.quiz_catalog_legacy_keys (
  legacy_key text not null check (length(legacy_key) between 1 and 240),
  quiz_key text not null references public.quiz_catalog(quiz_key) on delete cascade,
  primary key (legacy_key, quiz_key)
);

create index if not exists quiz_catalog_legacy_keys_quiz_key_idx
  on public.quiz_catalog_legacy_keys (quiz_key);

alter table public.quiz_catalog enable row level security;
alter table public.quiz_catalog_legacy_keys enable row level security;
-- Server-only: read by the completion functions, written by migrations.
revoke all on table public.quiz_catalog from anon, authenticated;
revoke all on table public.quiz_catalog_legacy_keys from anon, authenticated;

-- ─── Ledger constraints ──────────────────────────────────────────────────────
-- The 20-50 XP checks from 20260923125557 cannot hold the original economy.
-- Replace them with non-negative checks plus a catalog-derived ceiling.

alter table public.quiz_completion_requests
  drop constraint if exists quiz_completion_requests_completion_xp_check,
  drop constraint if exists quiz_completion_requests_xp_earned_check;
alter table public.quiz_xp_awards
  drop constraint if exists quiz_xp_awards_xp_earned_check;

do $$
begin
  -- Abort instead of silently keeping a 50 XP cap under an unexpected name.
  if exists (
    select 1
    from pg_constraint
    where contype = 'c'
      and conrelid in ('public.quiz_completion_requests'::regclass, 'public.quiz_xp_awards'::regclass)
      and pg_get_constraintdef(oid) ~ '\m50\M'
  ) then
    raise exception 'A 50 XP check constraint is still present on the quiz award ledger';
  end if;
end;
$$;

alter table public.quiz_completion_requests
  add constraint quiz_completion_requests_completion_xp_check check (completion_xp in (0, 20)),
  add constraint quiz_completion_requests_xp_earned_check check (xp_earned >= 0);
alter table public.quiz_xp_awards
  add constraint quiz_xp_awards_xp_earned_check check (xp_earned >= 0);

-- Breakdown of catalog completions (null on the 2026-09-23 client's rows).
alter table public.quiz_completion_requests add column if not exists api_version smallint not null default 1;
alter table public.quiz_completion_requests add column if not exists formula text;
alter table public.quiz_completion_requests add column if not exists correct_easy integer;
alter table public.quiz_completion_requests add column if not exists correct_medium integer;
alter table public.quiz_completion_requests add column if not exists correct_hard integer;
alter table public.quiz_completion_requests add column if not exists timer_mode text;
alter table public.quiz_completion_requests add column if not exists base_xp integer;
alter table public.quiz_completion_requests add column if not exists correct_bonus_xp integer;
alter table public.quiz_completion_requests add column if not exists timer_bonus_xp integer;
alter table public.quiz_completion_requests add column if not exists pass_bonus_xp integer;

-- No award for an uncatalogued quiz, and never above the quiz's own ceiling:
-- catalog keys by their max_xp, 2026-09-23 client keys by that client's 50.
create or replace function public.enforce_quiz_award_ceiling()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  ceiling integer;
begin
  select max_xp into ceiling
  from public.quiz_catalog
  where quiz_key = new.quiz_key;

  if ceiling is null and exists (
    select 1 from public.quiz_catalog_legacy_keys where legacy_key = new.quiz_key
  ) then
    ceiling := 50;
  end if;

  if ceiling is null then
    raise exception 'Unknown quiz' using errcode = '22023';
  end if;
  if new.xp_earned > ceiling then
    raise exception 'Quiz award exceeds the catalog maximum' using errcode = '23514';
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_quiz_award_ceiling() from public, anon, authenticated;

drop trigger if exists enforce_quiz_award_ceiling on public.quiz_xp_awards;
create trigger enforce_quiz_award_ceiling
  before insert or update on public.quiz_xp_awards
  for each row execute function public.enforce_quiz_award_ceiling();

-- ─── Catalog completion (current client) ─────────────────────────────────────

create or replace function public.complete_catalog_quiz(
  requested_completion_id uuid,
  requested_quiz_key text,
  requested_correct_easy integer,
  requested_correct_medium integer,
  requested_correct_hard integer,
  requested_timer_mode text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  normalized_quiz_key text := btrim(coalesce(requested_quiz_key, ''));
  normalized_timer_mode text := btrim(coalesce(requested_timer_mode, ''));
  quiz public.quiz_catalog;
  reward record;
  prior_legacy_xp integer;
  award_amount integer;
  award_inserted integer;
  awarded_reward integer := 0;
  request_inserted uuid;
  existing_request public.quiz_completion_requests;
  resulting_lifetime_xp integer;
  resulting_subject_xp integer;
  resulting_quizzes_taken integer;
begin
  if caller_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) then
    raise exception 'Registered account required' using errcode = '42501';
  end if;

  if requested_completion_id is null then
    raise exception 'Completion id is required' using errcode = '22023';
  end if;
  if normalized_timer_mode not in ('none', '60', '30', '15') then
    raise exception 'Invalid timer mode' using errcode = '22023';
  end if;

  select * into quiz
  from public.quiz_catalog
  where quiz_key = normalized_quiz_key and is_active;
  if quiz.quiz_key is null then
    raise exception 'Unknown quiz' using errcode = '22023';
  end if;

  if requested_correct_easy is null or requested_correct_easy < 0
    or requested_correct_easy > quiz.easy_count
    or requested_correct_medium is null or requested_correct_medium < 0
    or requested_correct_medium > quiz.medium_count
    or requested_correct_hard is null or requested_correct_hard < 0
    or requested_correct_hard > quiz.hard_count then
    raise exception 'Invalid quiz result' using errcode = '22023';
  end if;

  select * into reward from public.original_quiz_xp(
    quiz.formula, quiz.total_questions, requested_correct_easy,
    requested_correct_medium, requested_correct_hard, normalized_timer_mode
  );

  -- One award decision at a time per student, across both completion paths.
  perform pg_advisory_xact_lock(hashtextextended('quiz-award:' || caller_id::text, 0));

  -- The request row is the idempotency lock for this completion id.
  insert into public.quiz_completion_requests (
    id, user_id, quiz_key, subject_id, chapter_key, correct, total, score_pct,
    completion_xp, score_bonus_xp, api_version, formula, correct_easy,
    correct_medium, correct_hard, timer_mode, base_xp, correct_bonus_xp,
    timer_bonus_xp, pass_bonus_xp
  ) values (
    requested_completion_id, caller_id, quiz.quiz_key, quiz.subject_id,
    quiz.chapter_key, reward.correct_total, quiz.total_questions, reward.score_pct,
    0, 0, 2, quiz.formula, requested_correct_easy, requested_correct_medium,
    requested_correct_hard, normalized_timer_mode, reward.base_xp,
    reward.correct_bonus_xp, reward.timer_bonus_xp, reward.pass_bonus_xp
  )
  on conflict (id) do nothing
  returning id into request_inserted;

  if request_inserted is null then
    select * into existing_request
    from public.quiz_completion_requests
    where id = requested_completion_id;

    if existing_request.id is null or existing_request.user_id <> caller_id then
      raise exception 'Completion id is already in use' using errcode = '23505';
    end if;
    if existing_request.api_version <> 2
      or existing_request.quiz_key <> quiz.quiz_key
      or existing_request.correct_easy <> requested_correct_easy
      or existing_request.correct_medium <> requested_correct_medium
      or existing_request.correct_hard <> requested_correct_hard
      or existing_request.timer_mode <> normalized_timer_mode then
      raise exception 'Completion id payload does not match' using errcode = '22023';
    end if;

    select up.xp, public.safe_subject_xp(up.subject_xp -> quiz.subject_id), up.quizzes_taken
    into resulting_lifetime_xp, resulting_subject_xp, resulting_quizzes_taken
    from public.user_progress up
    where up.user_id = caller_id;

    return jsonb_build_object(
      'accepted', false,
      'eligible', true,
      'awarded', existing_request.xp_awarded,
      'baseXp', existing_request.base_xp,
      'correctBonusXp', existing_request.correct_bonus_xp,
      'timerBonusXp', existing_request.timer_bonus_xp,
      'passBonusXp', existing_request.pass_bonus_xp,
      'potentialXp', existing_request.base_xp + existing_request.correct_bonus_xp
        + existing_request.timer_bonus_xp + existing_request.pass_bonus_xp,
      'xpEarned', existing_request.xp_earned,
      'scorePct', existing_request.score_pct,
      'correct', existing_request.correct,
      'total', existing_request.total,
      'lifetimeXp', resulting_lifetime_xp,
      'subjectXp', resulting_subject_xp,
      'quizzesTaken', resulting_quizzes_taken
    );
  end if;

  -- XP already paid for this quiz by the 2026-09-23 client counts toward it.
  select coalesce(max(a.xp_earned), 0) into prior_legacy_xp
  from public.quiz_xp_awards a
  join public.quiz_catalog_legacy_keys l on l.legacy_key = a.quiz_key
  where a.user_id = caller_id and l.quiz_key = quiz.quiz_key;
  award_amount := greatest(reward.total_xp - prior_legacy_xp, 0);

  -- One award per student and quiz: a later completion inserts nothing.
  insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
  values (caller_id, quiz.quiz_key, requested_completion_id, award_amount)
  on conflict (user_id, quiz_key) do nothing
  returning xp_earned into award_inserted;
  awarded_reward := coalesce(award_inserted, 0);

  insert into public.user_progress (
    user_id, xp, quizzes_taken, subject_xp, last_active
  ) values (
    caller_id,
    awarded_reward,
    1,
    case
      when awarded_reward > 0 then jsonb_build_object(quiz.subject_id, awarded_reward)
      else '{}'::jsonb
    end,
    current_date
  )
  on conflict (user_id) do update set
    xp = public.user_progress.xp + awarded_reward,
    subject_xp = case
      when awarded_reward > 0 then jsonb_set(
        case
          when jsonb_typeof(public.user_progress.subject_xp) = 'object'
            then public.user_progress.subject_xp
          else '{}'::jsonb
        end,
        array[quiz.subject_id],
        to_jsonb(
          public.safe_subject_xp(public.user_progress.subject_xp -> quiz.subject_id)
          + awarded_reward
        ),
        true
      )
      else public.user_progress.subject_xp
    end,
    quizzes_taken = public.user_progress.quizzes_taken + 1,
    last_active = current_date
  returning
    xp,
    public.safe_subject_xp(subject_xp -> quiz.subject_id),
    quizzes_taken
  into resulting_lifetime_xp, resulting_subject_xp, resulting_quizzes_taken;

  update public.quiz_completion_requests set
    xp_earned = awarded_reward,
    xp_awarded = awarded_reward > 0
  where id = requested_completion_id;

  insert into public.quiz_history (
    user_id, subject_id, chapter_key, score_pct, correct, total, xp_earned,
    completion_id, quiz_key, xp_awarded, timer_mode,
    base_xp, speed_bonus_xp, streak_bonus_xp, pass_bonus_xp
  ) values (
    caller_id, quiz.subject_id, quiz.chapter_key, reward.score_pct,
    reward.correct_total, quiz.total_questions, awarded_reward,
    requested_completion_id, quiz.quiz_key, awarded_reward > 0,
    case quiz.formula
      when 'standard' then normalized_timer_mode
      when 'bm_world' then '60'
      else 'none'
    end,
    reward.base_xp, reward.timer_bonus_xp, reward.correct_bonus_xp, reward.pass_bonus_xp
  )
  on conflict (completion_id) where completion_id is not null do nothing;

  return jsonb_build_object(
    'accepted', true,
    'eligible', true,
    'awarded', awarded_reward > 0,
    'baseXp', reward.base_xp,
    'correctBonusXp', reward.correct_bonus_xp,
    'timerBonusXp', reward.timer_bonus_xp,
    'passBonusXp', reward.pass_bonus_xp,
    'potentialXp', reward.total_xp,
    'xpEarned', awarded_reward,
    'scorePct', reward.score_pct,
    'correct', reward.correct_total,
    'total', quiz.total_questions,
    'lifetimeXp', resulting_lifetime_xp,
    'subjectXp', resulting_subject_xp,
    'quizzesTaken', resulting_quizzes_taken
  );
end;
$$;

revoke all on function public.complete_catalog_quiz(uuid, text, integer, integer, integer, text)
  from public, anon;
grant execute on function public.complete_catalog_quiz(uuid, text, integer, integer, integer, text)
  to authenticated;

-- ─── 2026-09-23 client path (temporary) ──────────────────────────────────────
-- Same behaviour as 20260924120000 for the live client, but only for keys that
-- map to a real catalog quiz of that subject and size, and never on top of an
-- award the student already received through complete_catalog_quiz().
-- Retire once check:migrations and the new client are live everywhere.

create or replace function public.complete_quiz(
  requested_completion_id uuid,
  requested_quiz_key text,
  requested_subject_id text,
  requested_chapter_key text,
  requested_correct integer,
  requested_total integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  normalized_quiz_key text := btrim(coalesce(requested_quiz_key, ''));
  normalized_subject_id text := btrim(coalesce(requested_subject_id, ''));
  normalized_chapter_key text := btrim(coalesce(requested_chapter_key, ''));
  score_percent integer;
  completion_reward constant integer := 20;
  score_reward integer;
  potential_reward integer;
  awarded_reward integer := 0;
  award_inserted integer;
  request_inserted uuid;
  existing_request public.quiz_completion_requests;
  resulting_lifetime_xp integer;
  resulting_subject_xp integer;
  resulting_quizzes_taken integer;
begin
  if caller_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) then
    raise exception 'Registered account required' using errcode = '42501';
  end if;

  if requested_completion_id is null then
    raise exception 'Completion id is required' using errcode = '22023';
  end if;
  if normalized_quiz_key = '' or length(normalized_quiz_key) > 240 then
    raise exception 'Invalid quiz key' using errcode = '22023';
  end if;
  if normalized_subject_id = '' or length(normalized_subject_id) > 80 then
    raise exception 'Invalid subject id' using errcode = '22023';
  end if;
  if normalized_chapter_key = '' or length(normalized_chapter_key) > 160 then
    raise exception 'Invalid chapter key' using errcode = '22023';
  end if;
  if requested_total is null or requested_total < 1 or requested_total > 500 then
    raise exception 'Invalid quiz total' using errcode = '22023';
  end if;
  if requested_correct is null or requested_correct < 0 or requested_correct > requested_total then
    raise exception 'Invalid quiz score' using errcode = '22023';
  end if;

  if not exists (
    select 1
    from public.quiz_catalog_legacy_keys l
    join public.quiz_catalog c on c.quiz_key = l.quiz_key and c.is_active
    where l.legacy_key = normalized_quiz_key
      and c.subject_id = normalized_subject_id
      and c.total_questions = requested_total
  ) then
    raise exception 'Unknown quiz' using errcode = '22023';
  end if;

  score_percent := round((requested_correct::numeric / requested_total) * 100);
  score_reward := case
    when score_percent = 100 then 30
    when score_percent >= 90 then 20
    when score_percent >= 80 then 10
    when score_percent >= 60 then 5
    else 0
  end;
  potential_reward := completion_reward + score_reward;

  perform pg_advisory_xact_lock(hashtextextended('quiz-award:' || caller_id::text, 0));

  insert into public.quiz_completion_requests (
    id, user_id, quiz_key, subject_id, chapter_key, correct, total,
    score_pct, completion_xp, score_bonus_xp
  ) values (
    requested_completion_id, caller_id, normalized_quiz_key,
    normalized_subject_id, normalized_chapter_key, requested_correct,
    requested_total, score_percent, completion_reward, score_reward
  )
  on conflict (id) do nothing
  returning id into request_inserted;

  if request_inserted is null then
    select * into existing_request
    from public.quiz_completion_requests
    where id = requested_completion_id;

    if existing_request.id is null or existing_request.user_id <> caller_id then
      raise exception 'Completion id is already in use' using errcode = '23505';
    end if;
    if existing_request.api_version <> 1
      or existing_request.quiz_key <> normalized_quiz_key
      or existing_request.subject_id <> normalized_subject_id
      or existing_request.chapter_key <> normalized_chapter_key
      or existing_request.correct <> requested_correct
      or existing_request.total <> requested_total then
      raise exception 'Completion id payload does not match' using errcode = '22023';
    end if;

    select xp, public.safe_subject_xp(subject_xp -> normalized_subject_id), quizzes_taken
    into resulting_lifetime_xp, resulting_subject_xp, resulting_quizzes_taken
    from public.user_progress
    where user_id = caller_id;

    return jsonb_build_object(
      'accepted', false,
      'eligible', true,
      'awarded', existing_request.xp_awarded,
      'completionXp', existing_request.completion_xp,
      'scoreBonusXp', existing_request.score_bonus_xp,
      'potentialXp', existing_request.completion_xp + existing_request.score_bonus_xp,
      'xpEarned', existing_request.xp_earned,
      'scorePct', existing_request.score_pct,
      'lifetimeXp', resulting_lifetime_xp,
      'subjectXp', resulting_subject_xp,
      'quizzesTaken', resulting_quizzes_taken
    );
  end if;

  -- No second award when the new client already rewarded this quiz.
  if not exists (
    select 1
    from public.quiz_xp_awards a
    join public.quiz_catalog_legacy_keys l on l.quiz_key = a.quiz_key
    where a.user_id = caller_id and l.legacy_key = normalized_quiz_key
  ) then
    insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
    values (caller_id, normalized_quiz_key, requested_completion_id, potential_reward)
    on conflict (user_id, quiz_key) do nothing
    returning xp_earned into award_inserted;
  end if;

  if award_inserted is not null then
    awarded_reward := award_inserted;
  end if;

  insert into public.user_progress (
    user_id, xp, quizzes_taken, subject_xp, last_active
  ) values (
    caller_id,
    awarded_reward,
    1,
    case
      when awarded_reward > 0 then jsonb_build_object(normalized_subject_id, awarded_reward)
      else '{}'::jsonb
    end,
    current_date
  )
  on conflict (user_id) do update set
    xp = public.user_progress.xp + awarded_reward,
    subject_xp = case
      when awarded_reward > 0 then jsonb_set(
        case
          when jsonb_typeof(public.user_progress.subject_xp) = 'object'
            then public.user_progress.subject_xp
          else '{}'::jsonb
        end,
        array[normalized_subject_id],
        to_jsonb(
          public.safe_subject_xp(public.user_progress.subject_xp -> normalized_subject_id)
          + awarded_reward
        ),
        true
      )
      else public.user_progress.subject_xp
    end,
    quizzes_taken = public.user_progress.quizzes_taken + 1,
    last_active = current_date
  returning
    xp,
    public.safe_subject_xp(subject_xp -> normalized_subject_id),
    quizzes_taken
  into resulting_lifetime_xp, resulting_subject_xp, resulting_quizzes_taken;

  update public.quiz_completion_requests set
    xp_earned = awarded_reward,
    xp_awarded = awarded_reward > 0
  where id = requested_completion_id;

  insert into public.quiz_history (
    user_id, subject_id, chapter_key, score_pct, correct, total, xp_earned,
    completion_id, quiz_key, completion_xp, score_bonus_xp, xp_awarded,
    base_xp, speed_bonus_xp, streak_bonus_xp, pass_bonus_xp
  ) values (
    caller_id, normalized_subject_id, normalized_chapter_key, score_percent,
    requested_correct, requested_total, awarded_reward, requested_completion_id,
    normalized_quiz_key, completion_reward, score_reward, awarded_reward > 0,
    completion_reward, 0, 0, score_reward
  )
  on conflict (completion_id) where completion_id is not null do nothing;

  return jsonb_build_object(
    'accepted', true,
    'eligible', true,
    'awarded', awarded_reward > 0,
    'completionXp', completion_reward,
    'scoreBonusXp', score_reward,
    'potentialXp', potential_reward,
    'xpEarned', awarded_reward,
    'scorePct', score_percent,
    'lifetimeXp', resulting_lifetime_xp,
    'subjectXp', resulting_subject_xp,
    'quizzesTaken', resulting_quizzes_taken
  );
end;
$$;

revoke all on function public.complete_quiz(uuid, text, text, text, integer, integer) from public;
revoke all on function public.complete_quiz(uuid, text, text, text, integer, integer) from anon;
grant execute on function public.complete_quiz(uuid, text, text, text, integer, integer) to authenticated;

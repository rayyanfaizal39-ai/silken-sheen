-- One consistent, server-owned quiz XP award for every subject.
--
-- A completion is idempotent by completion_id. A leaderboard award is unique
-- by (user_id, quiz_key), so a retake is still recorded but earns 0 XP.
-- The browser never supplies an XP amount and cannot insert leaderboard rows.

create table if not exists public.quiz_completion_requests (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_key text not null,
  subject_id text not null,
  chapter_key text not null,
  correct integer not null check (correct >= 0),
  total integer not null check (total > 0),
  score_pct integer not null check (score_pct between 0 and 100),
  completion_xp integer not null default 20 check (completion_xp = 20),
  score_bonus_xp integer not null check (score_bonus_xp in (0, 5, 10, 20, 30)),
  xp_earned integer not null default 0 check (xp_earned between 0 and 50),
  xp_awarded boolean not null default false,
  created_at timestamptz not null default now(),
  unique (id, user_id)
);

create index if not exists quiz_completion_requests_user_created_idx
  on public.quiz_completion_requests (user_id, created_at desc);

create table if not exists public.quiz_xp_awards (
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_key text not null,
  completion_id uuid not null unique references public.quiz_completion_requests(id) on delete restrict,
  xp_earned integer not null check (xp_earned between 20 and 50),
  awarded_at timestamptz not null default now(),
  primary key (user_id, quiz_key)
);

alter table public.quiz_completion_requests enable row level security;
alter table public.quiz_xp_awards enable row level security;

-- These ledgers are written only by complete_quiz(). Keeping all Data API
-- table privileges revoked prevents a browser from manufacturing an award.
revoke all on table public.quiz_completion_requests from anon, authenticated;
revoke all on table public.quiz_xp_awards from anon, authenticated;

alter table public.quiz_history add column if not exists completion_id uuid;
alter table public.quiz_history add column if not exists quiz_key text;
alter table public.quiz_history add column if not exists completion_xp integer;
alter table public.quiz_history add column if not exists score_bonus_xp integer;
alter table public.quiz_history add column if not exists xp_awarded boolean not null default false;

create unique index if not exists quiz_history_completion_id_unique
  on public.quiz_history (completion_id)
  where completion_id is not null;

create index if not exists quiz_history_user_quiz_key_idx
  on public.quiz_history (user_id, quiz_key, created_at desc)
  where quiz_key is not null;

-- Retire the old client-write and per-question bonus paths. The SELECT grant
-- remains for the student's own history and is still protected by RLS.
drop policy if exists "Users can insert own quiz_history" on public.quiz_history;
revoke insert, update, delete on table public.quiz_history from anon, authenticated;
grant select on table public.quiz_history to authenticated;

revoke execute on function public.start_quiz_attempt(text, text, text) from public, anon, authenticated;
revoke execute on function public.record_quiz_attempt_answer(uuid, text, integer, text, boolean) from public, anon, authenticated;
revoke execute on function public.complete_quiz_attempt(uuid) from public, anon, authenticated;

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

  -- Supabase anonymous users use the authenticated Postgres role, so the role
  -- grant alone is not sufficient to distinguish a guest from an account.
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

  score_percent := round((requested_correct::numeric / requested_total) * 100);
  score_reward := case
    when score_percent = 100 then 30
    when score_percent >= 90 then 20
    when score_percent >= 80 then 10
    when score_percent >= 60 then 5
    else 0
  end;
  potential_reward := completion_reward + score_reward;

  -- The request row is the idempotency lock. A concurrent duplicate waits for
  -- the first transaction, then returns that transaction's completed result.
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
    if existing_request.quiz_key <> normalized_quiz_key
      or existing_request.subject_id <> normalized_subject_id
      or existing_request.chapter_key <> normalized_chapter_key
      or existing_request.correct <> requested_correct
      or existing_request.total <> requested_total then
      raise exception 'Completion id payload does not match' using errcode = '22023';
    end if;

    select xp, coalesce((subject_xp ->> normalized_subject_id)::integer, 0), quizzes_taken
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

  insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
  values (caller_id, normalized_quiz_key, requested_completion_id, potential_reward)
  on conflict (user_id, quiz_key) do nothing
  returning xp_earned into award_inserted;

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
        coalesce(public.user_progress.subject_xp, '{}'::jsonb),
        array[normalized_subject_id],
        to_jsonb(
          coalesce((public.user_progress.subject_xp ->> normalized_subject_id)::integer, 0)
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
    coalesce((subject_xp ->> normalized_subject_id)::integer, 0),
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

-- Harden the one-time quiz XP award against historical user_progress data.
--
-- user_progress.subject_xp is client-writable JSON with no shape constraint,
-- so a legacy entry such as "12.5", "abc", true or a huge number made the
-- previous `(subject_xp ->> id)::integer` casts raise and roll back the whole
-- quiz completion. The award formula (20 completion + 0/5/10/20/30 score
-- bonus, max 50), the completion-id idempotency and the one-award-per-quiz
-- ledger are unchanged from 20260923125557_quiz_xp_one_time_awards.

-- Reads one subject XP entry as a safe non-negative integer:
-- missing/null -> 0, JSON integer -> itself, numeric string -> integer,
-- fractional -> floor, malformed, negative or out of int range -> 0.
create or replace function public.safe_subject_xp(raw jsonb)
returns integer
language plpgsql
immutable
set search_path = ''
as $$
declare
  raw_text text;
  parsed numeric;
begin
  if raw is null then
    return 0;
  end if;

  case jsonb_typeof(raw)
    when 'number' then raw_text := raw #>> '{}';
    when 'string' then raw_text := btrim(raw #>> '{}');
    else return 0;
  end case;

  -- The pattern and length bound guarantee the numeric cast below cannot fail.
  if length(raw_text) > 64
    or raw_text !~ '^-?[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]{1,3})?$' then
    return 0;
  end if;

  parsed := raw_text::numeric;
  if parsed < 0 or parsed > 2147483647 then
    return 0;
  end if;
  return floor(parsed)::integer;
end;
$$;

revoke all on function public.safe_subject_xp(jsonb) from public, anon;
-- Pure and side-effect free; authenticated needs it because the user_progress
-- trigger below runs as the updating role.
grant execute on function public.safe_subject_xp(jsonb) to authenticated;

-- Per-subject monotonic merge: keeps every subject key from either side and,
-- for a key on both sides, the incoming value unless it would lower the
-- subject's XP. A stale local-first sync therefore cannot erase subject XP
-- that complete_quiz() already committed, and untouched entries (including
-- legacy ones) are stored exactly as they were.
create or replace function public.merge_subject_xp_monotonic(old_xp jsonb, new_xp jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  with sides as (
    select
      case when jsonb_typeof(old_xp) = 'object' then old_xp else '{}'::jsonb end as o,
      case when jsonb_typeof(new_xp) = 'object' then new_xp else '{}'::jsonb end as n
  )
  select coalesce(
    jsonb_object_agg(
      subject_key,
      case
        when not (n ? subject_key) then o -> subject_key
        when not (o ? subject_key) then n -> subject_key
        when public.safe_subject_xp(n -> subject_key) >= public.safe_subject_xp(o -> subject_key)
          then n -> subject_key
        else o -> subject_key
      end
    ),
    '{}'::jsonb
  )
  from sides,
    lateral (
      select jsonb_object_keys(o)
      union
      select jsonb_object_keys(n)
    ) as subject_keys(subject_key);
$$;

revoke all on function public.merge_subject_xp_monotonic(jsonb, jsonb) from public, anon;
grant execute on function public.merge_subject_xp_monotonic(jsonb, jsonb) to authenticated;

-- Extends the existing trigger (20260813133207): lifetime XP was already
-- protected from a stale sync; subject XP now gets the same protection.
create or replace function public.keep_user_progress_xp_monotonic()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.xp := greatest(old.xp, new.xp);
  if new.subject_xp is distinct from old.subject_xp then
    new.subject_xp := public.merge_subject_xp_monotonic(old.subject_xp, new.subject_xp);
  end if;
  return new;
end;
$$;

revoke all on function public.keep_user_progress_xp_monotonic() from public, anon, authenticated;

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

  insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
  values (caller_id, normalized_quiz_key, requested_completion_id, potential_reward)
  on conflict (user_id, quiz_key) do nothing
  returning xp_earned into award_inserted;

  if award_inserted is not null then
    awarded_reward := award_inserted;
  end if;

  -- Creates the progress row from schema defaults when it is missing.
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

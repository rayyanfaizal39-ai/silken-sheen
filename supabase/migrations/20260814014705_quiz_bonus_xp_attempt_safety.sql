-- Server-owned Quiz Bonus XP ledger. Timer/streak bonus values are never
-- accepted from the browser; they are derived here from the locked attempt.
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  chapter_key text not null,
  timer_mode text not null check (timer_mode in ('none', '60', '30', '15')),
  current_correct_streak integer not null default 0 check (current_correct_streak >= 0),
  best_correct_streak integer not null default 0 check (best_correct_streak >= 0),
  base_xp integer not null default 0 check (base_xp >= 0),
  speed_bonus_xp integer not null default 0 check (speed_bonus_xp >= 0),
  streak_bonus_xp integer not null default 0 check (streak_bonus_xp >= 0),
  status text not null default 'active' check (status in ('active', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.quiz_attempt_answers (
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_key text not null,
  answer_sequence integer not null check (answer_sequence >= 0),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  is_correct boolean not null,
  base_xp integer not null check (base_xp >= 0),
  speed_bonus_xp integer not null check (speed_bonus_xp >= 0),
  streak_bonus_xp integer not null check (streak_bonus_xp >= 0),
  total_question_xp integer not null check (total_question_xp >= 0),
  created_at timestamptz not null default now(),
  primary key (attempt_id, question_key),
  unique (attempt_id, answer_sequence)
);

create index if not exists quiz_attempts_user_created_idx
  on public.quiz_attempts (user_id, created_at desc);

alter table public.quiz_history
  add column if not exists attempt_id uuid references public.quiz_attempts(id) on delete set null;
alter table public.quiz_history add column if not exists timer_mode text;
alter table public.quiz_history add column if not exists base_xp integer;
alter table public.quiz_history add column if not exists speed_bonus_xp integer;
alter table public.quiz_history add column if not exists streak_bonus_xp integer;
alter table public.quiz_history add column if not exists pass_bonus_xp integer;
alter table public.quiz_history add column if not exists best_correct_streak integer;
create unique index if not exists quiz_history_attempt_id_unique
  on public.quiz_history (attempt_id) where attempt_id is not null;

alter table public.quiz_attempts enable row level security;
alter table public.quiz_attempt_answers enable row level security;

create policy "Users can read own quiz attempts"
  on public.quiz_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read own quiz attempt answers"
  on public.quiz_attempt_answers for select to authenticated
  using (exists (
    select 1 from public.quiz_attempts qa
    where qa.id = attempt_id and qa.user_id = (select auth.uid())
  ));

revoke all on table public.quiz_attempts from anon, authenticated;
revoke all on table public.quiz_attempt_answers from anon, authenticated;
grant select on table public.quiz_attempts to authenticated;
grant select on table public.quiz_attempt_answers to authenticated;

create or replace function public.start_quiz_attempt(
  requested_subject_id text,
  requested_chapter_key text,
  requested_timer_mode text
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  normalized_timer text;
  new_attempt_id uuid;
begin
  if caller_id is null then raise exception 'Authentication required'; end if;
  normalized_timer := case requested_timer_mode
    when '60' then '60' when '30' then '30' when '15' then '15' else 'none'
  end;
  insert into public.quiz_attempts (user_id, subject_id, chapter_key, timer_mode)
  values (caller_id, requested_subject_id, requested_chapter_key, normalized_timer)
  returning id into new_attempt_id;
  return new_attempt_id;
end;
$$;

create or replace function public.record_quiz_attempt_answer(
  requested_attempt_id uuid,
  requested_question_key text,
  requested_answer_sequence integer,
  requested_difficulty text,
  requested_is_correct boolean
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  attempt public.quiz_attempts;
  existing_answer public.quiz_attempt_answers;
  normalized_difficulty text := lower(coalesce(requested_difficulty, ''));
  calculated_base integer := 0;
  calculated_speed integer := 0;
  calculated_streak integer := 0;
  calculated_total integer := 0;
  next_streak integer := 0;
begin
  select * into attempt from public.quiz_attempts
  where id = requested_attempt_id for update;
  if attempt.id is null or attempt.user_id <> auth.uid() or attempt.status <> 'active' then
    raise exception 'Quiz attempt not found, closed, or not owned by caller';
  end if;
  if normalized_difficulty not in ('easy', 'medium', 'hard') then
    raise exception 'Invalid quiz difficulty';
  end if;

  if exists (select 1 from public.quiz_attempt_answers where attempt_id = attempt.id and question_key = requested_question_key) then
    select * into existing_answer
    from public.quiz_attempt_answers
    where attempt_id = requested_attempt_id and question_key = requested_question_key;
    return jsonb_build_object(
      'accepted', false,
      'baseXp', existing_answer.base_xp,
      'timerBonusXp', existing_answer.speed_bonus_xp,
      'streakBonusXp', existing_answer.streak_bonus_xp,
      'totalQuestionXp', existing_answer.total_question_xp,
      'quizCorrectStreak', attempt.current_correct_streak,
      'bestCorrectStreak', attempt.best_correct_streak
    );
  end if;

  if requested_is_correct then
    calculated_base := case normalized_difficulty when 'hard' then 30 when 'medium' then 20 else 10 end;
    calculated_speed := case attempt.timer_mode when '60' then 5 when '30' then 10 when '15' then 15 else 0 end;
    calculated_streak := 5;
    next_streak := attempt.current_correct_streak + 1;
    calculated_total := calculated_base + calculated_speed + calculated_streak;
  end if;

  insert into public.quiz_attempt_answers (
    attempt_id, question_key, answer_sequence, difficulty, is_correct,
    base_xp, speed_bonus_xp, streak_bonus_xp, total_question_xp
  ) values (
    attempt.id, requested_question_key, requested_answer_sequence, normalized_difficulty,
    requested_is_correct, calculated_base, calculated_speed, calculated_streak, calculated_total
  );

  update public.quiz_attempts set
    current_correct_streak = next_streak,
    best_correct_streak = greatest(best_correct_streak, next_streak),
    base_xp = base_xp + calculated_base,
    speed_bonus_xp = speed_bonus_xp + calculated_speed,
    streak_bonus_xp = streak_bonus_xp + calculated_streak
  where id = attempt.id
  returning * into attempt;

  return jsonb_build_object(
    'accepted', true,
    'baseXp', calculated_base,
    'timerBonusXp', calculated_speed,
    'streakBonusXp', calculated_streak,
    'totalQuestionXp', calculated_total,
    'quizCorrectStreak', attempt.current_correct_streak,
    'bestCorrectStreak', attempt.best_correct_streak
  );
end;
$$;

create or replace function public.complete_quiz_attempt(requested_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  attempt public.quiz_attempts;
  answer_count integer;
  correct_count integer;
  score_percent integer;
  pass_bonus integer;
  question_xp integer;
  total_xp integer;
  resulting_lifetime_xp integer;
begin
  select * into attempt from public.quiz_attempts
  where id = requested_attempt_id for update;
  if attempt.id is null or attempt.user_id <> auth.uid() then
    raise exception 'Quiz attempt not found or not owned by caller';
  end if;

  select count(*)::integer, count(*) filter (where is_correct)::integer
  into answer_count, correct_count
  from public.quiz_attempt_answers where attempt_id = attempt.id;
  if answer_count = 0 then raise exception 'Cannot complete an empty quiz attempt'; end if;

  score_percent := round((correct_count::numeric / answer_count) * 100);
  pass_bonus := case when score_percent >= 80 then 25 else 0 end;
  question_xp := attempt.base_xp + attempt.speed_bonus_xp + attempt.streak_bonus_xp;
  total_xp := question_xp + pass_bonus;

  if attempt.status = 'active' then
    update public.quiz_attempts set status = 'completed', completed_at = now()
    where id = attempt.id;

    update public.user_progress set
      xp = xp + total_xp,
      subject_xp = jsonb_set(
        coalesce(subject_xp, '{}'::jsonb),
        array[attempt.subject_id],
        to_jsonb(coalesce((subject_xp ->> attempt.subject_id)::integer, 0) + total_xp),
        true
      ),
      quizzes_taken = quizzes_taken + 1,
      last_active = current_date
    where user_id = attempt.user_id
    returning xp into resulting_lifetime_xp;

    insert into public.quiz_history (
      user_id, subject_id, chapter_key, score_pct, correct, total, xp_earned, attempt_id
    ) values (
      attempt.user_id, attempt.subject_id, attempt.chapter_key, score_percent,
      correct_count, answer_count, total_xp, attempt.id
    ) on conflict (attempt_id) where attempt_id is not null do nothing;
  else
    select xp into resulting_lifetime_xp from public.user_progress where user_id = attempt.user_id;
  end if;

  return jsonb_build_object(
    'accepted', attempt.status = 'active',
    'baseXp', attempt.base_xp,
    'timerBonusXp', attempt.speed_bonus_xp,
    'streakBonusXp', attempt.streak_bonus_xp,
    'passBonusXp', pass_bonus,
    'totalXp', total_xp,
    'correct', correct_count,
    'total', answer_count,
    'bestCorrectStreak', attempt.best_correct_streak,
    'lifetimeXp', resulting_lifetime_xp
  );
end;
$$;

revoke execute on function public.start_quiz_attempt(text, text, text) from public, anon;
revoke execute on function public.record_quiz_attempt_answer(uuid, text, integer, text, boolean) from public, anon;
revoke execute on function public.complete_quiz_attempt(uuid) from public, anon;
grant execute on function public.start_quiz_attempt(text, text, text) to authenticated;
grant execute on function public.record_quiz_attempt_answer(uuid, text, integer, text, boolean) to authenticated;
grant execute on function public.complete_quiz_attempt(uuid) to authenticated;

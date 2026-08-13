-- Claimable AcadeMY missions. Reading state never awards XP; every reward is
-- granted by one authenticated, idempotent transaction.

create table if not exists public.mission_activity_events (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_key text not null check (char_length(event_key) between 1 and 240),
  activity_type text not null check (activity_type in ('lesson', 'quiz', 'flashcard')),
  local_date_key date not null,
  week_key date not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, event_key)
);

alter table public.mission_activity_events
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists mission_activity_events_daily_idx
  on public.mission_activity_events (user_id, local_date_key, activity_type);
create index if not exists mission_activity_events_weekly_idx
  on public.mission_activity_events (user_id, week_key, activity_type);

create table if not exists public.mission_reward_claims (
  user_id uuid not null references auth.users(id) on delete cascade,
  period_type text not null,
  period_key date not null,
  mission_id text not null default '__bonus__',
  reward_xp integer not null,
  awarded_at timestamptz not null default now(),
  primary key (user_id, period_type, period_key, mission_id)
);

alter table public.mission_reward_claims
  add column if not exists mission_id text default '__bonus__';
update public.mission_reward_claims set mission_id = '__bonus__' where mission_id is null;
alter table public.mission_reward_claims alter column mission_id set not null;

do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select conname
    from pg_constraint
    where conrelid = 'public.mission_reward_claims'::regclass
      and contype in ('p', 'c')
  loop
    execute format('alter table public.mission_reward_claims drop constraint %I', constraint_name);
  end loop;
end;
$$;

-- Legacy daily/weekly rows were full-set rewards and remain permanently claimed.
update public.mission_reward_claims
set period_type = case period_type
  when 'daily' then 'daily_bonus'
  when 'weekly' then 'weekly_bonus'
  else period_type
end;

alter table public.mission_reward_claims
  add constraint mission_reward_claims_pkey
    primary key (user_id, period_type, period_key, mission_id),
  add constraint mission_reward_claims_period_type_check
    check (period_type in ('daily_objective', 'daily_bonus', 'weekly_objective', 'weekly_bonus')),
  add constraint mission_reward_claims_reward_xp_check
    check (reward_xp in (100, 250, 500, 1500));

create index if not exists mission_reward_claims_period_idx
  on public.mission_reward_claims (user_id, period_type, period_key);

alter table public.mission_activity_events enable row level security;
alter table public.mission_reward_claims enable row level security;

drop policy if exists "Users can read own mission activity" on public.mission_activity_events;
create policy "Users can read own mission activity"
  on public.mission_activity_events for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own mission rewards" on public.mission_reward_claims;
create policy "Users can read own mission rewards"
  on public.mission_reward_claims for select to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.mission_activity_events from anon;
revoke insert, update, delete on table public.mission_activity_events from authenticated;
grant select on table public.mission_activity_events to authenticated;
revoke all on table public.mission_reward_claims from anon;
revoke insert, update, delete on table public.mission_reward_claims from authenticated;
grant select on table public.mission_reward_claims to authenticated;

create or replace function public.mission_seed(
  p_user_id uuid,
  p_period_key date,
  p_salt text
)
returns bigint
language sql
immutable
set search_path = ''
as $$
  select coalesce(sum(ascii(substr(seed.value, chars.idx, 1)) * chars.idx), 0)::bigint
  from (
    select p_user_id::text || ':' || p_period_key::text || ':2:' || p_salt as value
  ) seed,
  lateral generate_series(1, char_length(seed.value)) as chars(idx);
$$;

create or replace function public.raw_daily_mission_ids(p_user_id uuid, p_date_key date)
returns text[]
language plpgsql
immutable
set search_path = ''
as $$
declare
  selected text[];
  result text[];
  order_variant integer;
begin
  selected := array[
    (array['lesson_1', 'lesson_2'])[(public.mission_seed(p_user_id, p_date_key, 'daily-0') % 2) + 1],
    (array['quiz_1', 'quiz_answers_5', 'quiz_correct_3'])[(public.mission_seed(p_user_id, p_date_key, 'daily-1') % 3) + 1],
    (array['flashcard_5', 'flashcard_8', 'flashcard_good_3'])[(public.mission_seed(p_user_id, p_date_key, 'daily-2') % 3) + 1]
  ];
  order_variant := public.mission_seed(p_user_id, p_date_key, 'daily-order') % 6;
  result := case order_variant
    when 0 then array[selected[1], selected[2], selected[3]]
    when 1 then array[selected[1], selected[3], selected[2]]
    when 2 then array[selected[2], selected[1], selected[3]]
    when 3 then array[selected[2], selected[3], selected[1]]
    when 4 then array[selected[3], selected[1], selected[2]]
    else array[selected[3], selected[2], selected[1]]
  end;
  return result;
end;
$$;

create or replace function public.daily_mission_ids(p_user_id uuid, p_date_key date)
returns text[]
language plpgsql
immutable
set search_path = ''
as $$
declare
  selected text[] := public.raw_daily_mission_ids(p_user_id, p_date_key);
  yesterday text[] := public.raw_daily_mission_ids(p_user_id, p_date_key - 1);
  flash_position integer;
begin
  if (select array_agg(value order by value) from unnest(selected) value) =
     (select array_agg(value order by value) from unnest(yesterday) value) then
    select idx into flash_position
    from generate_subscripts(selected, 1) idx
    where selected[idx] like 'flashcard%'
    limit 1;
    selected[flash_position] := case selected[flash_position]
      when 'flashcard_5' then 'flashcard_8'
      when 'flashcard_8' then 'flashcard_good_3'
      else 'flashcard_5'
    end;
  end if;
  return selected;
end;
$$;

create or replace function public.weekly_mission_ids(p_user_id uuid, p_week_key date)
returns text[]
language plpgsql
immutable
set search_path = ''
as $$
declare
  selected text[];
  order_variant integer;
begin
  selected := array[
    (array['weekly_lessons_5', 'weekly_lessons_7'])[(public.mission_seed(p_user_id, p_week_key, 'weekly-0') % 2) + 1],
    (array['weekly_quizzes_5', 'weekly_correct_20'])[(public.mission_seed(p_user_id, p_week_key, 'weekly-1') % 2) + 1],
    (array['weekly_flashcards_30', 'weekly_flashcards_good_20'])[(public.mission_seed(p_user_id, p_week_key, 'weekly-2') % 2) + 1]
  ];
  order_variant := public.mission_seed(p_user_id, p_week_key, 'weekly-order') % 6;
  return case order_variant
    when 0 then array[selected[1], selected[2], selected[3]]
    when 1 then array[selected[1], selected[3], selected[2]]
    when 2 then array[selected[2], selected[1], selected[3]]
    when 3 then array[selected[2], selected[3], selected[1]]
    when 4 then array[selected[3], selected[1], selected[2]]
    else array[selected[3], selected[2], selected[1]]
  end;
end;
$$;

create or replace function public.mission_target(p_mission_id text)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case p_mission_id
    when 'lesson_1' then 1 when 'lesson_2' then 2
    when 'quiz_1' then 1 when 'quiz_answers_5' then 5 when 'quiz_correct_3' then 3
    when 'flashcard_5' then 5 when 'flashcard_8' then 8 when 'flashcard_good_3' then 3
    when 'weekly_lessons_5' then 5 when 'weekly_lessons_7' then 7
    when 'weekly_quizzes_5' then 5 when 'weekly_correct_20' then 20
    when 'weekly_flashcards_30' then 30 when 'weekly_flashcards_good_20' then 20
    else null
  end;
$$;

create or replace function public.mission_metric(p_mission_id text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case p_mission_id
    when 'lesson_1' then 'lesson' when 'lesson_2' then 'lesson'
    when 'quiz_1' then 'quiz' when 'quiz_answers_5' then 'quizAnswers'
    when 'quiz_correct_3' then 'quizCorrect'
    when 'flashcard_5' then 'flashcard' when 'flashcard_8' then 'flashcard'
    when 'flashcard_good_3' then 'flashcardGood'
    when 'weekly_lessons_5' then 'lesson' when 'weekly_lessons_7' then 'lesson'
    when 'weekly_quizzes_5' then 'quiz' when 'weekly_correct_20' then 'quizCorrect'
    when 'weekly_flashcards_30' then 'flashcard'
    when 'weekly_flashcards_good_20' then 'flashcardGood'
    else null
  end;
$$;

create or replace function public.get_mission_state(p_local_date_key date)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  current_week_key date;
  daily_ids text[];
  weekly_ids text[];
  daily_counters jsonb;
  weekly_counters jsonb;
  daily_claims text[];
  weekly_claims text[];
  daily_bonus_claimed boolean;
  weekly_bonus_claimed boolean;
  authoritative_xp integer;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_local_date_key is null or abs(p_local_date_key - current_date) > 1 then
    raise exception 'Invalid local mission date';
  end if;

  current_week_key := p_local_date_key - (extract(isodow from p_local_date_key)::integer - 1);
  daily_ids := public.daily_mission_ids(current_user_id, p_local_date_key);
  weekly_ids := public.weekly_mission_ids(current_user_id, current_week_key);

  select jsonb_build_object(
    'lesson', count(*) filter (where activity_type = 'lesson'),
    'quiz', count(*) filter (where activity_type = 'quiz'),
    'flashcard', count(*) filter (where activity_type = 'flashcard'),
    'quizAnswers', coalesce(sum(least(200, greatest(0, coalesce((metadata->>'total')::integer, 0)))) filter (where activity_type = 'quiz'), 0),
    'quizCorrect', coalesce(sum(least(200, greatest(0, coalesce((metadata->>'correct')::integer, 0)))) filter (where activity_type = 'quiz'), 0),
    'flashcardGood', count(*) filter (where activity_type = 'flashcard' and coalesce((metadata->>'rating')::integer, 0) >= 2)
  ) into daily_counters
  from public.mission_activity_events
  where user_id = current_user_id and local_date_key = p_local_date_key;

  select jsonb_build_object(
    'lesson', count(*) filter (where activity_type = 'lesson'),
    'quiz', count(*) filter (where activity_type = 'quiz'),
    'flashcard', count(*) filter (where activity_type = 'flashcard'),
    'quizAnswers', coalesce(sum(least(200, greatest(0, coalesce((metadata->>'total')::integer, 0)))) filter (where activity_type = 'quiz'), 0),
    'quizCorrect', coalesce(sum(least(200, greatest(0, coalesce((metadata->>'correct')::integer, 0)))) filter (where activity_type = 'quiz'), 0),
    'flashcardGood', count(*) filter (where activity_type = 'flashcard' and coalesce((metadata->>'rating')::integer, 0) >= 2)
  ) into weekly_counters
  from public.mission_activity_events
  where user_id = current_user_id and week_key = current_week_key;

  select coalesce(array_agg(mission_id), '{}'::text[]) into daily_claims
  from public.mission_reward_claims
  where user_id = current_user_id and period_type = 'daily_objective' and period_key = p_local_date_key;
  select coalesce(array_agg(mission_id), '{}'::text[]) into weekly_claims
  from public.mission_reward_claims
  where user_id = current_user_id and period_type = 'weekly_objective' and period_key = current_week_key;
  select exists(select 1 from public.mission_reward_claims where user_id = current_user_id and period_type = 'daily_bonus' and period_key = p_local_date_key) into daily_bonus_claimed;
  select exists(select 1 from public.mission_reward_claims where user_id = current_user_id and period_type = 'weekly_bonus' and period_key = current_week_key) into weekly_bonus_claimed;
  select xp into authoritative_xp from public.user_progress where user_id = current_user_id;

  return jsonb_build_object(
    'date_key', p_local_date_key::text,
    'week_key', current_week_key::text,
    'daily_mission_ids', to_jsonb(daily_ids),
    'weekly_mission_ids', to_jsonb(weekly_ids),
    'counters', jsonb_build_object('daily', daily_counters, 'weekly', weekly_counters),
    'claimed_daily_mission_ids', to_jsonb(daily_claims),
    'claimed_weekly_mission_ids', to_jsonb(weekly_claims),
    'daily_bonus_claimed', daily_bonus_claimed,
    'weekly_bonus_claimed', weekly_bonus_claimed,
    'awarded_xp', 0,
    'previous_xp', authoritative_xp,
    'total_xp', authoritative_xp,
    'claimed_reward', null
  );
end;
$$;

drop function if exists public.record_mission_activity(text, text, date);
create or replace function public.record_mission_activity(
  p_activity_type text,
  p_event_key text,
  p_local_date_key date,
  p_metadata jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  current_week_key date;
  safe_metadata jsonb := '{}'::jsonb;
  safe_total integer;
  safe_correct integer;
  safe_rating integer;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_activity_type not in ('lesson', 'quiz', 'flashcard') then raise exception 'Invalid mission activity'; end if;
  if p_event_key is null or char_length(p_event_key) not between 1 and 240 then raise exception 'Invalid mission event key'; end if;
  if p_local_date_key is null or abs(p_local_date_key - current_date) > 1 then raise exception 'Invalid local mission date'; end if;

  if p_activity_type = 'quiz' then
    safe_total := least(200, greatest(0, coalesce((p_metadata->>'total')::integer, 0)));
    safe_correct := least(safe_total, greatest(0, coalesce((p_metadata->>'correct')::integer, 0)));
    safe_metadata := jsonb_build_object('total', safe_total, 'correct', safe_correct);
  elsif p_activity_type = 'flashcard' then
    safe_rating := least(3, greatest(0, coalesce((p_metadata->>'rating')::integer, 0)));
    safe_metadata := jsonb_build_object('rating', safe_rating);
  elsif p_metadata ? 'subjectId' then
    safe_metadata := jsonb_build_object('subjectId', left(p_metadata->>'subjectId', 80));
  end if;

  current_week_key := p_local_date_key - (extract(isodow from p_local_date_key)::integer - 1);
  insert into public.mission_activity_events (
    user_id, event_key, activity_type, local_date_key, week_key, metadata
  ) values (
    current_user_id, p_event_key, p_activity_type, p_local_date_key, current_week_key, safe_metadata
  ) on conflict (user_id, event_key) do nothing;

  return public.get_mission_state(p_local_date_key);
end;
$$;

create or replace function public.claim_mission_reward(
  p_claim_kind text,
  p_mission_id text,
  p_local_date_key date
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  current_week_key date;
  state jsonb;
  selected_ids text[];
  counters jsonb;
  period_key date;
  claim_id text;
  reward_xp integer;
  metric_name text;
  metric_value integer;
  required_value integer;
  inserted_reward integer;
  previous_xp integer;
  authoritative_xp integer;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_claim_kind not in ('daily_objective', 'daily_bonus', 'weekly_objective', 'weekly_bonus') then raise exception 'Invalid mission claim'; end if;
  if p_local_date_key is null or abs(p_local_date_key - current_date) > 1 then raise exception 'Invalid local mission date'; end if;

  current_week_key := p_local_date_key - (extract(isodow from p_local_date_key)::integer - 1);
  state := public.get_mission_state(p_local_date_key);
  insert into public.user_progress (user_id, xp) values (current_user_id, 0)
    on conflict (user_id) do nothing;
  select xp into previous_xp from public.user_progress where user_id = current_user_id for update;

  if p_claim_kind = 'daily_objective' then
    selected_ids := public.daily_mission_ids(current_user_id, p_local_date_key);
    if p_mission_id is null or not (p_mission_id = any(selected_ids)) then raise exception 'Mission is not in today''s set'; end if;
    counters := state->'counters'->'daily';
    period_key := p_local_date_key;
    claim_id := p_mission_id;
    reward_xp := 100;
  elsif p_claim_kind = 'weekly_objective' then
    selected_ids := public.weekly_mission_ids(current_user_id, current_week_key);
    if p_mission_id is null or not (p_mission_id = any(selected_ids)) then raise exception 'Mission is not in this week''s set'; end if;
    counters := state->'counters'->'weekly';
    period_key := current_week_key;
    claim_id := p_mission_id;
    reward_xp := 250;
  elsif p_claim_kind = 'daily_bonus' then
    selected_ids := public.daily_mission_ids(current_user_id, p_local_date_key);
    if not (select bool_and(state->'claimed_daily_mission_ids' ? mission_id) from unnest(selected_ids) mission_id) then raise exception 'Claim all daily objectives first'; end if;
    period_key := p_local_date_key;
    claim_id := '__bonus__';
    reward_xp := 500;
  else
    selected_ids := public.weekly_mission_ids(current_user_id, current_week_key);
    if not (select bool_and(state->'claimed_weekly_mission_ids' ? mission_id) from unnest(selected_ids) mission_id) then raise exception 'Claim all weekly objectives first'; end if;
    period_key := current_week_key;
    claim_id := '__bonus__';
    reward_xp := 1500;
  end if;

  if p_claim_kind in ('daily_objective', 'weekly_objective') then
    metric_name := public.mission_metric(p_mission_id);
    required_value := public.mission_target(p_mission_id);
    metric_value := coalesce((counters->>metric_name)::integer, 0);
    if metric_name is null or required_value is null or metric_value < required_value then
      raise exception 'Mission objective is not complete';
    end if;
  end if;

  insert into public.mission_reward_claims (user_id, period_type, period_key, mission_id, reward_xp)
  values (current_user_id, p_claim_kind, period_key, claim_id, reward_xp)
  on conflict (user_id, period_type, period_key, mission_id) do nothing
  returning reward_xp into inserted_reward;

  if inserted_reward is not null then
    update public.user_progress set xp = xp + inserted_reward where user_id = current_user_id returning xp into authoritative_xp;
  else
    authoritative_xp := previous_xp;
  end if;

  state := public.get_mission_state(p_local_date_key);
  return state || jsonb_build_object(
    'awarded_xp', coalesce(inserted_reward, 0),
    'previous_xp', previous_xp,
    'total_xp', authoritative_xp,
    'claimed_reward', case when inserted_reward is null then null else jsonb_build_object(
      'kind', p_claim_kind,
      'mission_id', case when claim_id = '__bonus__' then null else claim_id end,
      'reward_xp', inserted_reward
    ) end
  );
end;
$$;

revoke all on function public.mission_seed(uuid, date, text) from public, anon, authenticated;
revoke all on function public.raw_daily_mission_ids(uuid, date) from public, anon, authenticated;
revoke all on function public.daily_mission_ids(uuid, date) from public, anon, authenticated;
revoke all on function public.weekly_mission_ids(uuid, date) from public, anon, authenticated;
revoke all on function public.mission_target(text) from public, anon, authenticated;
revoke all on function public.mission_metric(text) from public, anon, authenticated;
revoke all on function public.get_mission_state(date) from public, anon;
revoke all on function public.record_mission_activity(text, text, date, jsonb) from public, anon;
revoke all on function public.claim_mission_reward(text, text, date) from public, anon;
grant execute on function public.get_mission_state(date) to authenticated;
grant execute on function public.record_mission_activity(text, text, date, jsonb) to authenticated;
grant execute on function public.claim_mission_reward(text, text, date) to authenticated;

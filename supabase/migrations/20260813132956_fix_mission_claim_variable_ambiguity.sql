-- Prefix local values so ON CONFLICT column references are unambiguous.
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
  v_period_key date;
  claim_id text;
  v_reward_xp integer;
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
    v_period_key := p_local_date_key;
    claim_id := p_mission_id;
    v_reward_xp := 100;
  elsif p_claim_kind = 'weekly_objective' then
    selected_ids := public.weekly_mission_ids(current_user_id, current_week_key);
    if p_mission_id is null or not (p_mission_id = any(selected_ids)) then raise exception 'Mission is not in this week''s set'; end if;
    counters := state->'counters'->'weekly';
    v_period_key := current_week_key;
    claim_id := p_mission_id;
    v_reward_xp := 250;
  elsif p_claim_kind = 'daily_bonus' then
    selected_ids := public.daily_mission_ids(current_user_id, p_local_date_key);
    if not (select bool_and(state->'claimed_daily_mission_ids' ? selected_mission_id) from unnest(selected_ids) selected_mission_id) then raise exception 'Claim all daily objectives first'; end if;
    v_period_key := p_local_date_key;
    claim_id := '__bonus__';
    v_reward_xp := 500;
  else
    selected_ids := public.weekly_mission_ids(current_user_id, current_week_key);
    if not (select bool_and(state->'claimed_weekly_mission_ids' ? selected_mission_id) from unnest(selected_ids) selected_mission_id) then raise exception 'Claim all weekly objectives first'; end if;
    v_period_key := current_week_key;
    claim_id := '__bonus__';
    v_reward_xp := 1500;
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
  values (current_user_id, p_claim_kind, v_period_key, claim_id, v_reward_xp)
  on conflict (user_id, period_type, period_key, mission_id) do nothing
  returning mission_reward_claims.reward_xp into inserted_reward;

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

revoke all on function public.claim_mission_reward(text, text, date) from public, anon;
grant execute on function public.claim_mission_reward(text, text, date) to authenticated;

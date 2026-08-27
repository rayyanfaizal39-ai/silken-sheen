-- Claims close at the student's local day boundary. Activity-event retries may
-- still use the adjacent-date tolerance in record_mission_activity.
create or replace function public.claim_mission_reward(
  p_claim_kind text,
  p_mission_id text,
  p_local_date_key date,
  p_timezone_offset_minutes integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  expected_local_date date;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_timezone_offset_minutes is null or p_timezone_offset_minutes not between -840 and 840 then
    raise exception 'Invalid timezone offset';
  end if;

  -- JavaScript getTimezoneOffset() is UTC minus local time.
  expected_local_date := (now() - make_interval(mins => p_timezone_offset_minutes))::date;
  if p_local_date_key is distinct from expected_local_date then
    raise exception 'This mission reward is no longer claimable';
  end if;

  return public.claim_mission_reward(p_claim_kind, p_mission_id, p_local_date_key);
end;
$$;

revoke all on function public.claim_mission_reward(text, text, date) from public, anon, authenticated;
revoke all on function public.claim_mission_reward(text, text, date, integer) from public, anon;
grant execute on function public.claim_mission_reward(text, text, date, integer) to authenticated;

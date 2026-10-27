-- Atomic five-per-hour claim for a manual parent report.
-- Count and insert share one transaction lock, so two parallel requests
-- cannot both observe four recent attempts and both send.

begin;

create or replace function public.claim_parent_report_send(
  p_user_id uuid,
  p_recipient_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count integer;
begin
  if p_user_id is null or p_recipient_hash is null or length(p_recipient_hash) < 32 then
    raise exception 'invalid parent report claim';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':parent_report', 0));

  select count(*)::integer into recent_count
  from public.email_delivery_attempts
  where user_id = p_user_id
    and flow = 'parent_report'
    and created_at >= now() - interval '1 hour';

  if recent_count >= 5 then
    return false;
  end if;

  insert into public.email_delivery_attempts (user_id, flow, recipient_hash)
  values (p_user_id, 'parent_report', p_recipient_hash);

  return true;
end;
$$;

revoke all on function public.claim_parent_report_send(uuid, text) from public, anon, authenticated;
grant execute on function public.claim_parent_report_send(uuid, text) to service_role;

comment on function public.claim_parent_report_send(uuid, text) is
  'Service-role claim for a manual parent report. Returns false when that student already has five attempts in the last hour.';

commit;

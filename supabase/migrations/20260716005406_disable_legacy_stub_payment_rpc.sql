-- Retire the legacy pre-gateway stub confirmation path. The production billing
-- flow uses service-only payment_transactions RPCs and verified callbacks.

revoke execute on function public.confirm_stub_payment(uuid) from public, anon, authenticated;
grant execute on function public.confirm_stub_payment(uuid) to service_role;

-- Pin name resolution for the retained legacy function as defense in depth.
alter function public.confirm_stub_payment(uuid) set search_path = '';

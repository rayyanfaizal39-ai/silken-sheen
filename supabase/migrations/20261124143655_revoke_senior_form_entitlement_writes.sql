-- Forward-only. Do not apply until reviewed.
-- Anonymous callers lose every direct table privilege. Authenticated students
-- keep SELECT, and the existing RLS policy still limits that read to their own
-- row. sync_senior_form_entitlement() remains security definer and keeps its
-- authenticated execute grant.

revoke all on table public.senior_form_entitlements from public, anon, authenticated;

grant select on table public.senior_form_entitlements to authenticated;

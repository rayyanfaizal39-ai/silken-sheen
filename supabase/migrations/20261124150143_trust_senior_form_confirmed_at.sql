-- Forward-only. Do not apply until reviewed.
-- Replaces the confirmation trigger function only. It does not update
-- profiles and does not change any stored senior_form_confirmed_at value.
-- A student can make the first confirmation, but the database clock supplies
-- the timestamp. An existing timestamp stays put unless the caller is an
-- admin, service_role, postgres, or supabase_admin.

create or replace function public.clamp_senior_form_confirmed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  privileged boolean;
begin
  privileged :=
    public.is_admin()
    or coalesce(auth.role(), '') = 'service_role'
    or current_user in ('postgres', 'supabase_admin', 'service_role');

  if privileged then
    return new;
  end if;

  if old.senior_form_confirmed_at is null then
    if new.senior_form_confirmed_at is not null then
      new.senior_form_confirmed_at := now();
    end if;
    return new;
  end if;

  new.senior_form_confirmed_at := old.senior_form_confirmed_at;
  return new;
end;
$$;

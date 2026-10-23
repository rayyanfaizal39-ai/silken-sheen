-- Recorded parent-email consent. Existing parent_report_email values stay
-- valid and are not used until the student saves again with this copy.
-- No check constraint pairs the address with consent, so current rows load.

begin;

alter table public.profiles
  add column if not exists parent_email_consent_at timestamptz,
  add column if not exists parent_email_consent_version text;

comment on column public.profiles.parent_email_consent_at is
  'When the student agreed that AcadeMY may email parent_report_email. Null means consent was not recorded or was withdrawn.';

comment on column public.profiles.parent_email_consent_version is
  'Consent copy version the student accepted. A parent address is used only when this matches the current copy.';

comment on column public.profiles.parent_report_email is
  'Optional parent or guardian address. Monthly progress reports and subscription-end payment reminders use it only when parent_email_consent_at and parent_email_consent_version are current. Otherwise those emails go to the student account email.';

-- The consent clock is the database. A column default of now() would stamp
-- every profile insert, including students who never saved a parent email.
-- This trigger sets parent_email_consent_at to now() only when a parent
-- address and consent version are stored, ignores any client timestamp, and
-- keeps the existing timestamp when an unrelated profile field changes.
create or replace function public.set_parent_email_consent_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.parent_report_email is null then
    new.parent_email_consent_at := null;
    new.parent_email_consent_version := null;
  elsif new.parent_email_consent_version is null then
    new.parent_email_consent_at := null;
  elsif tg_op = 'INSERT' then
    new.parent_email_consent_at := now();
  elsif new.parent_report_email is distinct from old.parent_report_email
    or new.parent_email_consent_version is distinct from old.parent_email_consent_version
    or old.parent_email_consent_at is null
  then
    new.parent_email_consent_at := now();
  else
    new.parent_email_consent_at := old.parent_email_consent_at;
  end if;
  return new;
end;
$$;

revoke all on function public.set_parent_email_consent_at() from public, anon, authenticated;

drop trigger if exists profiles_set_parent_email_consent_at on public.profiles;
create trigger profiles_set_parent_email_consent_at
  before insert or update on public.profiles
  for each row execute function public.set_parent_email_consent_at();

commit;

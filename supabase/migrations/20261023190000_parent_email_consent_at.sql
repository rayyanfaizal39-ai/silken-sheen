-- Recorded parent-email consent. Existing parent_report_email values stay
-- stored and are not used until the student saves again with the checkbox.
-- No check constraint pairs the address with consent, so current rows load.
-- Unapplied. Do not run this from the app.

begin;

alter table public.profiles
  add column if not exists parent_email_consent_at timestamptz;

comment on column public.profiles.parent_email_consent_at is
  'When the student recorded that the parent agreed to monthly progress emails at parent_report_email. Null means consent is not recorded. The database clock sets this value.';

comment on column public.profiles.parent_report_email is
  'Optional parent or guardian address for the monthly progress report. A valid address receives that report only when parent_email_consent_at is set. Otherwise the report goes to the student account email. Changing this address clears parent_email_consent_at unless the same update records new consent. Payment reminders always go to the student account email.';

-- The consent clock is the database. A column default of now() would stamp
-- every profile insert, including students who never saved a parent email.
-- This trigger sets parent_email_consent_at to now() only when a parent
-- address and a new consent acknowledgement are stored, ignores any client
-- timestamp, keeps the existing timestamp when an unrelated profile field
-- changes, and clears consent when the address changes without that
-- acknowledgement.
create or replace function public.set_parent_email_consent_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.parent_report_email is null then
    new.parent_email_consent_at := null;
  elsif tg_op = 'UPDATE'
    and new.parent_report_email is distinct from old.parent_report_email
    and new.parent_email_consent_at is not distinct from old.parent_email_consent_at
  then
    new.parent_email_consent_at := null;
  elsif new.parent_email_consent_at is null then
    new.parent_email_consent_at := null;
  elsif tg_op = 'INSERT'
    or old.parent_email_consent_at is null
    or new.parent_email_consent_at is distinct from old.parent_email_consent_at
  then
    new.parent_email_consent_at := pg_catalog.now();
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

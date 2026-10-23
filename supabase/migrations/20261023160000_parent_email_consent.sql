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

commit;

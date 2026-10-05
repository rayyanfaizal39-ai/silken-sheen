-- Student-owned weekly parent report.
-- The optional destination lives on the student profile. There is no parent
-- account and no parent-student link. A blank address means the report is
-- sent to the student's authenticated AcadeMY email.

alter table public.profiles
  add column if not exists parent_report_email text;

alter table public.profiles
  drop constraint if exists profiles_parent_report_email_format;

alter table public.profiles
  add constraint profiles_parent_report_email_format
  check (
    parent_report_email is null
    or (
      char_length(parent_report_email) between 3 and 254
      and parent_report_email = lower(btrim(parent_report_email))
      and parent_report_email ~ '^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
    )
  );

comment on column public.profiles.parent_report_email is
  'Optional weekly parent-report destination chosen by the student. Null sends the report to the student account email.';

create table if not exists public.weekly_report_deliveries (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  week_start date not null,
  recipient_email text not null,
  status text not null check (status in ('sending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint weekly_report_deliveries_student_week_key unique (student_id, week_start)
);

create index if not exists weekly_report_deliveries_week_idx
  on public.weekly_report_deliveries (week_start, status);

drop trigger if exists weekly_report_deliveries_updated_at on public.weekly_report_deliveries;
create trigger weekly_report_deliveries_updated_at
  before update on public.weekly_report_deliveries
  for each row execute function public.handle_updated_at();

alter table public.weekly_report_deliveries enable row level security;

drop policy if exists "Admins can read weekly report deliveries" on public.weekly_report_deliveries;
create policy "Admins can read weekly report deliveries"
  on public.weekly_report_deliveries for select
  to authenticated
  using (public.is_admin());

revoke all on table public.weekly_report_deliveries from anon, authenticated;
grant select on table public.weekly_report_deliveries to authenticated;
grant all on table public.weekly_report_deliveries to service_role;

comment on table public.weekly_report_deliveries is
  'One delivery attempt per student per Monday-start week. Stores the chosen recipient and outcome, not the report body.';

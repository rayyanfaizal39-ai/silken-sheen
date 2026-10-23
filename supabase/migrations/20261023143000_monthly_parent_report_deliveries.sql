-- Monthly parent-report delivery log.
--
-- Applying this migration creates the log table only. The pg_cron job at
-- the bottom stays commented until a dry run has been reviewed.
-- Parent progress email is monthly. Do not schedule send-weekly-parent-report.

begin;

create table if not exists public.monthly_report_deliveries (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  month_start date not null,
  recipient_email text not null,
  status text not null check (status in ('sending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint monthly_report_deliveries_student_month_key unique (student_id, month_start)
);

create index if not exists monthly_report_deliveries_month_idx
  on public.monthly_report_deliveries (month_start, status);

drop trigger if exists monthly_report_deliveries_updated_at on public.monthly_report_deliveries;
create trigger monthly_report_deliveries_updated_at
  before update on public.monthly_report_deliveries
  for each row execute function public.handle_updated_at();

alter table public.monthly_report_deliveries enable row level security;

drop policy if exists "Admins can read monthly report deliveries" on public.monthly_report_deliveries;
create policy "Admins can read monthly report deliveries"
  on public.monthly_report_deliveries for select
  to authenticated
  using ((select public.is_admin()));

revoke all on table public.monthly_report_deliveries from anon, authenticated;
grant select on table public.monthly_report_deliveries to authenticated;
grant all on table public.monthly_report_deliveries to service_role;

comment on table public.monthly_report_deliveries is
  'One automatic parent report per student per calendar month. month_start is the first day of the reported month in Asia/Kuala_Lumpur. Stores the recipient and outcome, not the email body.';

commit;

-- Schedules stay off. After a reviewed dry run, enable pg_cron and pg_net,
-- store the Vault secrets, then run the cron.schedule statement in the SQL
-- editor. Do not commit the real key.
--
-- Vault names (shared with the payment-reminder comments):
--   academy_functions_base_url = https://aojrbxoqbgyxmfljqpqj.supabase.co
--   monthly_parent_report_cron_key = the MONTHLY_PARENT_REPORT_CRON_KEY secret
--
-- The 1st at 08:00 Asia/Kuala_Lumpur is 00:00 UTC. pg_cron runs in UTC.
-- The report covers the previous calendar month in Asia/Kuala_Lumpur,
-- [1st 00:00, next 1st 00:00). Body stays {"action":"send_previous_month"}
-- with no dryRun. The live call returns immediately and finishes in the
-- background; unique (student_id, month_start) makes a retry safe if pg_net
-- times out.
-- select cron.schedule(
--   'academy-monthly-parent-report',
--   '0 0 1 * *',
--   $$
--   select net.http_post(
--     url := (select decrypted_secret from vault.decrypted_secrets where name = 'academy_functions_base_url')
--       || '/functions/v1/send-monthly-parent-report',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'x-monthly-report-key', (select decrypted_secret from vault.decrypted_secrets where name = 'monthly_parent_report_cron_key')
--     ),
--     body := '{"action":"send_previous_month"}'::jsonb,
--     timeout_milliseconds := 5000
--   ) as request_id;
--   $$
-- );
--
-- Weekly automatic sending is retired. If that job was created earlier:
-- select cron.unschedule('academy-weekly-parent-report');
--
-- To turn the monthly job off later:
-- select cron.unschedule('academy-monthly-parent-report');

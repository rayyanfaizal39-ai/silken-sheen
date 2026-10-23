-- Payment reminder delivery log, plus a disabled schedule for these reminders.
-- The monthly parent-report schedule lives with monthly_report_deliveries.
-- Do not schedule send-weekly-parent-report.
--
-- Applying this migration creates the log table only. The pg_cron jobs at
-- the bottom stay commented until a dry run has been reviewed.

begin;

create table if not exists public.payment_reminder_deliveries (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  period_end timestamptz not null,
  reminder_type text not null check (reminder_type in ('7_days', '1_day', 'due_day')),
  recipient_email text not null,
  status text not null check (status in ('sending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payment_reminder_deliveries_subscription_period_type_key
    unique (subscription_id, period_end, reminder_type)
);

create index if not exists payment_reminder_deliveries_period_idx
  on public.payment_reminder_deliveries (period_end, reminder_type, status);

create index if not exists subscriptions_active_period_end_idx
  on public.subscriptions (current_period_end)
  where status = 'active' and current_period_end is not null;

create index if not exists subscriptions_expired_period_end_idx
  on public.subscriptions (current_period_end)
  where status = 'expired' and current_period_end is not null;

drop trigger if exists payment_reminder_deliveries_updated_at on public.payment_reminder_deliveries;
create trigger payment_reminder_deliveries_updated_at
  before update on public.payment_reminder_deliveries
  for each row execute function public.handle_updated_at();

alter table public.payment_reminder_deliveries enable row level security;

drop policy if exists "Admins can read payment reminder deliveries" on public.payment_reminder_deliveries;
create policy "Admins can read payment reminder deliveries"
  on public.payment_reminder_deliveries for select
  to authenticated
  using ((select public.is_admin()));

revoke all on table public.payment_reminder_deliveries from anon, authenticated;
grant select on table public.payment_reminder_deliveries to authenticated;
grant all on table public.payment_reminder_deliveries to service_role;

comment on table public.payment_reminder_deliveries is
  'One reminder per subscription, period end, and type (7 days, 1 day, or due day). Stores the recipient and outcome, not the email body.';

commit;

-- Schedules stay off. After a reviewed dry run, enable pg_cron and pg_net
-- in Database → Extensions (or run the create extension statements), store
-- the function URL and cron keys in Vault, then run the cron.schedule
-- statements in the SQL editor. Do not commit the real keys.
--
-- Vault names:
--   academy_functions_base_url = https://aojrbxoqbgyxmfljqpqj.supabase.co
--   payment_reminder_cron_key = the PAYMENT_REMINDER_CRON_KEY secret
--   monthly_parent_report_cron_key = the MONTHLY_PARENT_REPORT_CRON_KEY secret
--     (scheduled in 20261023143000_monthly_parent_report_deliveries.sql)
--
-- create extension if not exists pg_cron;
-- create extension if not exists pg_net with schema extensions;
--
-- select vault.create_secret('https://aojrbxoqbgyxmfljqpqj.supabase.co', 'academy_functions_base_url');
-- select vault.create_secret('REPLACE_WITH_PAYMENT_REMINDER_CRON_KEY', 'payment_reminder_cron_key');
-- select vault.create_secret('REPLACE_WITH_MONTHLY_PARENT_REPORT_CRON_KEY', 'monthly_parent_report_cron_key');
--
-- Daily 09:00 Asia/Kuala_Lumpur is 01:00 UTC.
-- select cron.schedule(
--   'academy-payment-reminders',
--   '0 1 * * *',
--   $$
--   select net.http_post(
--     url := (select decrypted_secret from vault.decrypted_secrets where name = 'academy_functions_base_url')
--       || '/functions/v1/send-payment-reminder',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'x-payment-reminder-key', (select decrypted_secret from vault.decrypted_secrets where name = 'payment_reminder_cron_key')
--     ),
--     body := '{"action":"send_due"}'::jsonb,
--     timeout_milliseconds := 5000
--   ) as request_id;
--   $$
-- );
--
-- Weekly automatic sending is retired. If that job was created earlier:
-- select cron.unschedule('academy-weekly-parent-report');
--
-- To turn the reminder job off later:
-- select cron.unschedule('academy-payment-reminders');

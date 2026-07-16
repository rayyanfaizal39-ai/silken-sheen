-- Production billing primitives for AcadeMY.
-- All financial writes are service-role only. Authenticated users receive
-- read-only access to their own rows through RLS.

begin;

create sequence if not exists public.academy_invoice_number_seq;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null check (plan in ('basic', 'pro', 'premium')),
  billing_interval text check (billing_interval in ('monthly', 'annual')),
  status text not null check (status in ('active', 'pending', 'expired', 'cancelled')),
  amount numeric(10,2) not null default 0 check (amount >= 0),
  currency text not null default 'MYR' check (char_length(currency) = 3),
  started_at timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  provider text not null check (provider in ('mock', 'toyyibpay')),
  provider_transaction_id text,
  provider_bill_code text,
  idempotency_key text not null unique,
  plan text not null check (plan in ('pro', 'premium')),
  billing_interval text not null check (billing_interval in ('monthly', 'annual')),
  amount numeric(10,2) not null check (amount > 0),
  currency text not null default 'MYR' check (char_length(currency) = 3),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'successful', 'failed', 'cancelled', 'refunded')),
  payment_method text,
  raw_callback_data jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists payment_transactions_provider_tx_unique
  on public.payment_transactions(provider, provider_transaction_id)
  where provider_transaction_id is not null;
create unique index if not exists payment_transactions_provider_bill_unique
  on public.payment_transactions(provider, provider_bill_code)
  where provider_bill_code is not null;
create index if not exists payment_transactions_user_created_idx
  on public.payment_transactions(user_id, created_at desc);
create index if not exists payment_transactions_subscription_idx
  on public.payment_transactions(subscription_id);
create index if not exists payment_transactions_status_idx
  on public.payment_transactions(payment_status, created_at desc);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid not null references public.subscriptions(id) on delete restrict,
  payment_transaction_id uuid not null unique references public.payment_transactions(id) on delete restrict,
  invoice_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  student_name text,
  plan text not null check (plan in ('pro', 'premium')),
  billing_interval text not null check (billing_interval in ('monthly', 'annual')),
  description text not null,
  period_start timestamptz not null,
  period_end timestamptz not null,
  subtotal numeric(10,2) not null check (subtotal >= 0),
  tax numeric(10,2) not null default 0 check (tax >= 0),
  total numeric(10,2) not null check (total >= 0),
  currency text not null default 'MYR' check (char_length(currency) = 3),
  payment_status text not null check (payment_status in ('successful', 'refunded')),
  payment_reference text not null,
  invoice_date timestamptz not null default now(),
  pdf_storage_path text,
  emailed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invoices_user_date_idx on public.invoices(user_id, invoice_date desc);
create index if not exists invoices_subscription_idx on public.invoices(subscription_id);

drop trigger if exists on_subscriptions_updated on public.subscriptions;
create trigger on_subscriptions_updated
  before update on public.subscriptions
  for each row execute function public.handle_updated_at();

alter table public.subscriptions enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.invoices enable row level security;

create policy "Users can read own subscriptions" on public.subscriptions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Admins can read all subscriptions" on public.subscriptions
  for select to authenticated using ((select public.is_admin()));
create policy "Users can read own payment transactions" on public.payment_transactions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Admins can read all payment transactions" on public.payment_transactions
  for select to authenticated using ((select public.is_admin()));
create policy "Users can read own invoices" on public.invoices
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Admins can read all invoices" on public.invoices
  for select to authenticated using ((select public.is_admin()));

revoke all on public.subscriptions, public.payment_transactions, public.invoices from anon, authenticated;
grant select on public.subscriptions, public.payment_transactions, public.invoices to authenticated;
grant all on public.subscriptions, public.payment_transactions, public.invoices to service_role;
grant usage, select on sequence public.academy_invoice_number_seq to service_role;

-- Performs the success transition, subscription upsert, and invoice insert in
-- one transaction. The row lock plus unique payment/invoice constraints make
-- repeated or concurrent callbacks idempotent.
create or replace function public.process_verified_payment(
  p_payment_id uuid,
  p_provider_transaction_id text,
  p_verified_amount numeric,
  p_verified_currency text,
  p_payment_method text,
  p_raw_callback_data jsonb,
  p_customer_name text,
  p_customer_email text,
  p_student_name text default null
)
returns table(invoice_id uuid, invoice_number text, already_processed boolean)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_payment public.payment_transactions%rowtype;
  v_subscription public.subscriptions%rowtype;
  v_invoice public.invoices%rowtype;
  v_period_start timestamptz := now();
  v_period_end timestamptz;
  v_invoice_number text;
begin
  select * into v_payment
  from public.payment_transactions
  where id = p_payment_id
  for update;

  if not found then raise exception 'payment_not_found'; end if;

  if v_payment.payment_status = 'successful' then
    select * into v_invoice from public.invoices where payment_transaction_id = v_payment.id;
    return query select v_invoice.id, v_invoice.invoice_number, true;
    return;
  end if;

  if v_payment.payment_status <> 'pending' then raise exception 'payment_not_pending'; end if;
  if round(v_payment.amount, 2) <> round(p_verified_amount, 2)
    or upper(v_payment.currency) <> upper(p_verified_currency) then
    raise exception 'payment_amount_mismatch';
  end if;

  v_period_end := case v_payment.billing_interval
    when 'annual' then v_period_start + interval '1 year'
    else v_period_start + interval '1 month'
  end;

  insert into public.subscriptions (
    user_id, plan, billing_interval, status, amount, currency, started_at,
    current_period_start, current_period_end, cancelled_at
  ) values (
    v_payment.user_id, v_payment.plan, v_payment.billing_interval, 'active',
    v_payment.amount, v_payment.currency, v_period_start, v_period_start, v_period_end, null
  )
  on conflict (user_id) do update set
    plan = excluded.plan,
    billing_interval = excluded.billing_interval,
    status = 'active',
    amount = excluded.amount,
    currency = excluded.currency,
    started_at = coalesce(public.subscriptions.started_at, excluded.started_at),
    current_period_start = excluded.current_period_start,
    current_period_end = excluded.current_period_end,
    cancelled_at = null,
    updated_at = now()
  returning * into v_subscription;

  update public.payment_transactions set
    subscription_id = v_subscription.id,
    provider_transaction_id = p_provider_transaction_id,
    payment_status = 'successful',
    payment_method = p_payment_method,
    raw_callback_data = p_raw_callback_data,
    paid_at = now()
  where id = v_payment.id;

  v_invoice_number := 'ACAD-' || to_char(now() at time zone 'Asia/Kuala_Lumpur', 'YYYYMMDD')
    || '-' || lpad(nextval('public.academy_invoice_number_seq')::text, 6, '0');

  insert into public.invoices (
    user_id, subscription_id, payment_transaction_id, invoice_number,
    customer_name, customer_email, student_name, plan, billing_interval,
    description, period_start, period_end, subtotal, tax, total, currency,
    payment_status, payment_reference
  ) values (
    v_payment.user_id, v_subscription.id, v_payment.id, v_invoice_number,
    p_customer_name, p_customer_email, nullif(p_student_name, ''),
    v_payment.plan, v_payment.billing_interval,
    initcap(v_payment.plan) || ' ' || v_payment.billing_interval || ' subscription',
    v_period_start, v_period_end, v_payment.amount, 0, v_payment.amount,
    v_payment.currency, 'successful', p_provider_transaction_id
  ) returning * into v_invoice;

  perform set_config('app.bypass_role_plan_guard', 'true', true);
  update public.profiles set plan = 'paid' where id = v_payment.user_id;

  return query select v_invoice.id, v_invoice.invoice_number, false;
end;
$$;

revoke all on function public.process_verified_payment(uuid,text,numeric,text,text,jsonb,text,text,text) from public, anon, authenticated;
grant execute on function public.process_verified_payment(uuid,text,numeric,text,text,jsonb,text,text,text) to service_role;

create or replace function public.cancel_subscription_for_user(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  update public.subscriptions
  set status = 'cancelled', cancelled_at = now(), updated_at = now()
  where user_id = p_user_id and status in ('active', 'pending');

  if not found then raise exception 'active_subscription_not_found'; end if;

  perform set_config('app.bypass_role_plan_guard', 'true', true);
  update public.profiles set plan = 'free' where id = p_user_id;
end;
$$;

revoke all on function public.cancel_subscription_for_user(uuid) from public, anon, authenticated;
grant execute on function public.cancel_subscription_for_user(uuid) to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('invoices', 'invoices', false, 5242880, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 5242880,
  allowed_mime_types = array['application/pdf'];

create policy "Users can read own invoice PDFs" on storage.objects
  for select to authenticated
  using (bucket_id = 'invoices' and (storage.foldername(name))[1] = (select auth.uid())::text);

comment on table public.payment_transactions is 'Immutable payment audit trail; writes are restricted to the service role.';
comment on table public.invoices is 'Paid invoices generated only after server-side payment verification.';

commit;

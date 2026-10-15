-- Snapshot of the live objects in project aojrbxoqbgyxmfljqpqj that the partner
-- commission migration builds on (captured 2026-10-16 via pg_get_functiondef and
-- information_schema). The partner tables were applied from the Academy-partners
-- repository, not this repo's migration chain, so tests rebuild them here.
-- Test-only scaffolding: auth schema, roles and the tables the functions touch.

create role anon nologin;
create role authenticated nologin;
create role service_role nologin;
create schema auth;
create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('test.uid', true), '')::uuid $$;

create table public.profiles (
  id uuid primary key references auth.users(id),
  full_name text, email text,
  role text not null default 'student',
  plan text not null default 'free'
);

create sequence public.academy_invoice_number_seq;

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id),
  plan text not null check (plan in ('basic', 'pro', 'premium')),
  billing_interval text check (billing_interval in ('monthly', 'annual')),
  status text not null check (status in ('active', 'pending', 'expired', 'cancelled')),
  amount numeric(10,2) not null default 0, currency text not null default 'MYR',
  started_at timestamptz, current_period_start timestamptz, current_period_end timestamptz,
  cancelled_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  subscription_id uuid references public.subscriptions(id),
  provider text not null check (provider in ('mock', 'toyyibpay')),
  provider_transaction_id text, provider_bill_code text,
  idempotency_key text not null unique default gen_random_uuid()::text,
  plan text not null check (plan in ('pro', 'premium')),
  billing_interval text not null default 'monthly' check (billing_interval in ('monthly', 'annual')),
  amount numeric(10,2) not null check (amount > 0),
  currency text not null default 'MYR' check (char_length(currency) = 3),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'successful', 'failed', 'cancelled', 'refunded')),
  payment_method text, raw_callback_data jsonb, paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, subscription_id uuid not null,
  payment_transaction_id uuid not null unique references public.payment_transactions(id),
  invoice_number text not null unique, customer_name text not null, customer_email text not null,
  student_name text, plan text not null, billing_interval text not null, description text not null,
  period_start timestamptz not null, period_end timestamptz not null,
  subtotal numeric(10,2) not null, tax numeric(10,2) not null default 0, total numeric(10,2) not null,
  currency text not null default 'MYR', payment_status text not null, payment_reference text not null
);

-- Partner Circle tables with their live constraints.
create table public.partner_admins (user_id uuid primary key references auth.users(id), role text not null default 'admin');
create table public.partner_profiles (
  user_id uuid primary key references auth.users(id),
  partner_code text not null unique, display_name text not null default '',
  partner_type text not null default 'Community', introduction text not null default '',
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended', 'closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table public.partner_referrals (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid not null references public.partner_profiles(user_id),
  customer_reference text, plan text check (plan in ('pro', 'premium')),
  status text not null default 'visited' check (status in ('visited', 'signed_up', 'paid', 'active', 'cancelled')),
  channel text not null default 'direct', first_at timestamptz not null default now(), converted_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);
create table public.partner_commissions (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid not null references public.partner_profiles(user_id),
  referral_id uuid not null references public.partner_referrals(id),
  payment_reference text not null unique,
  payment_number smallint not null,
  gross_amount numeric(12,2) not null check (gross_amount >= 0),
  commission_rate numeric(5,4) not null default 0.3000 check (commission_rate between 0 and 1),
  commission_amount numeric(12,2) not null check (commission_amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'approved', 'available', 'paid', 'reversed')),
  review_available_at timestamptz, paid_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz,
  manual_batch_id uuid,
  constraint partner_commissions_payment_number_check check (payment_number between 1 and 6)
);
create table public.partner_sandbox_checkout_links (
  payment_id uuid primary key references public.payment_transactions(id),
  customer_user_id uuid not null references auth.users(id),
  partner_user_id uuid references public.partner_profiles(user_id),
  created_at timestamptz not null default now()
);
create table public.partner_sandbox_customers (
  customer_reference text primary key,
  partner_user_id uuid not null references public.partner_profiles(user_id),
  payment_count integer not null default 0
);
create table public.partner_sandbox_bills (
  id text primary key, external_reference uuid not null unique,
  partner_user_id uuid not null, customer_reference text not null, plan text not null,
  gross_cents bigint not null, commission_cents bigint, status text not null default 'pending',
  payout_id uuid, created_by uuid not null, created_at timestamptz not null default now(), paid_at timestamptz
);

CREATE OR REPLACE FUNCTION public.is_partner_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.partner_admins
    where user_id = auth.uid() and role = 'admin'
  );
$function$;

CREATE OR REPLACE FUNCTION public.partner_attach_sandbox_checkout(p_payment_id uuid, p_user_id uuid, p_partner_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare p public.payment_transactions; link public.partner_sandbox_checkout_links; partner uuid;
begin
  select * into p from payment_transactions where id=p_payment_id for update;
  if not found or p.user_id is distinct from p_user_id or p.provider <> 'toyyibpay' then raise exception 'Checkout ownership mismatch'; end if;
  select * into link from partner_sandbox_checkout_links where payment_id=p.id;
  if found then return jsonb_build_object('attached',link.partner_user_id is not null); end if;
  -- Never add attribution retroactively to an already-issued bill or payment.
  if p.provider_bill_code is not null or p.payment_status <> 'pending' then return jsonb_build_object('attached',false); end if;
  select partner_user_id into partner from partner_sandbox_customers where customer_reference=p.user_id::text;
  if partner is null and p_partner_code is not null then
    select user_id into partner from partner_profiles where partner_code=upper(trim(p_partner_code)) and status='active' and deleted_at is null;
  end if;
  if partner = p.user_id or not exists(select 1 from partner_profiles where user_id=partner and status='active' and deleted_at is null) then partner := null; end if;
  insert into partner_sandbox_checkout_links(payment_id,customer_user_id,partner_user_id) values(p.id,p.user_id,partner);
  return jsonb_build_object('attached',partner is not null);
end; $function$;

CREATE OR REPLACE FUNCTION public.partner_credit_sandbox_upgrade(p_payment_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare p public.payment_transactions; link public.partner_sandbox_checkout_links; bill public.partner_sandbox_bills; partner uuid;
begin
  select * into p from payment_transactions where id=p_payment_id for update;
  if not found then raise exception 'Unknown payment'; end if;
  if p.provider <> 'toyyibpay' or p.payment_status <> 'successful' or p.provider_transaction_id is null or p.provider_bill_code is null
     or p.paid_at is null or p.currency <> 'MYR' or p.billing_interval <> 'monthly' or p.plan not in ('pro','premium')
     or (p.raw_callback_data->>'sandbox') is distinct from 'true'
     or p.amount <> (case when p.plan='pro' then 29 else 59 end)
  then raise exception 'Verified monthly sandbox payment required'; end if;
  select * into link from partner_sandbox_checkout_links where payment_id=p.id for update;
  if not found or link.partner_user_id is null then return jsonb_build_object('credited',false); end if;
  if link.customer_user_id <> p.user_id then raise exception 'Attribution ownership mismatch'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p.user_id::text,1));
  -- First verified payment fixes attribution for recurring payments, even if
  -- another partner link is visited later. Failed checkouts do not claim users.
  select partner_user_id into partner from partner_sandbox_customers where customer_reference=p.user_id::text;
  partner := coalesce(partner,link.partner_user_id);
  if partner=p.user_id or not exists(select 1 from partner_profiles where user_id=partner and status='active' and deleted_at is null) then return jsonb_build_object('credited',false); end if;
  insert into partner_sandbox_bills(id,external_reference,partner_user_id,customer_reference,plan,gross_cents,created_by,created_at)
    values(p.provider_bill_code,p.id,partner,p.user_id::text,p.plan,(p.amount*100)::bigint,p.user_id,p.created_at)
    on conflict(id) do nothing;
  select * into bill from partner_sandbox_bills where id=p.provider_bill_code;
  if bill.external_reference<>p.id or bill.partner_user_id<>partner or bill.customer_reference<>p.user_id::text or bill.gross_cents<>p.amount*100 then raise exception 'Sandbox bill conflict'; end if;
  perform partner_sandbox_settle_bill(p.provider_bill_code,(p.amount*100)::bigint);
  return jsonb_build_object('credited',true,'bill_id',p.provider_bill_code);
end; $function$;

-- Live payment verification function (unchanged by the migration).
CREATE OR REPLACE FUNCTION public.process_verified_payment(p_payment_id uuid, p_provider_transaction_id text, p_verified_amount numeric, p_verified_currency text, p_payment_method text, p_raw_callback_data jsonb, p_customer_name text, p_customer_email text, p_student_name text DEFAULT NULL::text)
 RETURNS TABLE(invoice_id uuid, invoice_number text, already_processed boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

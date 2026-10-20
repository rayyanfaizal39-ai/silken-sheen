-- Partner referral attribution and recurring 30% commissions.
--
-- Reuses the existing Partner Circle tables (partner_profiles, partner_referrals,
-- partner_commissions, partner_sandbox_checkout_links) and the existing payment
-- pipeline (payment_transactions + process_verified_payment). No new payment
-- system and no new tables.
--
--   1. Signup/login:  the student calls partner_claim_referral(code). The first
--      eligible partner is locked as the student's only referral row.
--   2. Checkout:      inserting a ToyyibPay payment_transactions row links it to
--      the locked referral (partner_sandbox_checkout_links) before any bill
--      exists. Attribution is never added to a payment after insert.
--   3. Verification:  when process_verified_payment marks the payment
--      'successful', a pending 30% commission is recorded with the existing
--      30-day review window (review_available_at). One commission per payment.
--   4. Reversal:      refunded/failed/cancelled after success reverses unpaid
--      commissions. Subscription cancellation marks the referral cancelled.
--
-- The six-payment limit is removed: every verified renewal earns commission.
-- Forward-only. Existing payment records are not modified and nothing is
-- backfilled. Commission failure never blocks a student's payment.

begin;

-- ── Lifetime renewals: drop the 1..6 payment_number limit ───────────────────
alter table public.partner_commissions
  drop constraint if exists partner_commissions_payment_number_check;
alter table public.partner_commissions
  alter column payment_number type integer;
alter table public.partner_commissions
  drop constraint if exists partner_commissions_payment_number_positive;
alter table public.partner_commissions
  add constraint partner_commissions_payment_number_positive check (payment_number > 0);

-- ── One referral per student: never reassigned to another partner ──────────
create unique index if not exists partner_referrals_one_per_customer
  on public.partner_referrals (customer_reference)
  where deleted_at is null and customer_reference is not null;

-- ── Shared referral claim (used by the student RPC and the service bridge) ──
create or replace function public.partner_claim_referral_for(
  p_customer_id uuid,
  p_partner_code text,
  p_channel text default 'referral_link'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  code text := upper(trim(coalesce(p_partner_code, '')));
  partner uuid;
  existing public.partner_referrals;
begin
  if p_customer_id is null then raise exception 'Customer required'; end if;

  perform pg_advisory_xact_lock(hashtextextended('partner_referral:' || p_customer_id::text, 0));

  select * into existing from partner_referrals
    where customer_reference = p_customer_id::text and deleted_at is null;
  if found then
    return jsonb_build_object('claimed', false, 'reason', 'already_attributed');
  end if;

  if code !~ '^[A-Z0-9][A-Z0-9_-]{2,39}$' then
    return jsonb_build_object('claimed', false, 'reason', 'invalid_code');
  end if;

  select user_id into partner from partner_profiles
    where partner_code = code and status = 'active' and deleted_at is null;
  if partner is null then
    return jsonb_build_object('claimed', false, 'reason', 'invalid_code');
  end if;
  if partner = p_customer_id then
    return jsonb_build_object('claimed', false, 'reason', 'self_referral');
  end if;
  if not exists (select 1 from profiles where id = p_customer_id and role = 'student') then
    return jsonb_build_object('claimed', false, 'reason', 'not_student');
  end if;
  -- Existing paying customers cannot be attached to a partner afterwards.
  if exists (
    select 1 from payment_transactions
    where user_id = p_customer_id and payment_status in ('successful', 'refunded')
  ) then
    return jsonb_build_object('claimed', false, 'reason', 'existing_customer');
  end if;

  insert into partner_referrals (partner_user_id, customer_reference, status, channel, first_at)
  values (partner, p_customer_id::text, 'signed_up', left(coalesce(p_channel, 'referral_link'), 40), now());

  return jsonb_build_object('claimed', true);
end;
$$;

-- Student-facing: a student can only ever claim for themselves.
create or replace function public.partner_claim_referral(p_partner_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  return public.partner_claim_referral_for(auth.uid(), p_partner_code, 'referral_link');
end;
$$;

-- ── Link each new ToyyibPay payment to the locked referral at insert ────────
create or replace function public.partner_link_payment_on_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  partner uuid;
begin
  if new.provider <> 'toyyibpay' or new.payment_status <> 'pending' or new.provider_bill_code is not null then
    return new;
  end if;
  select r.partner_user_id into partner
    from partner_referrals r
    join partner_profiles pp on pp.user_id = r.partner_user_id
    where r.customer_reference = new.user_id::text
      and r.deleted_at is null
      and pp.status = 'active' and pp.deleted_at is null
      and r.partner_user_id <> new.user_id;
  if partner is not null then
    insert into partner_sandbox_checkout_links (payment_id, customer_user_id, partner_user_id)
    values (new.id, new.user_id, partner)
    on conflict (payment_id) do nothing;
  end if;
  return new;
exception when others then
  -- Attribution must never block a student's checkout.
  raise warning 'partner_link_payment_on_insert failed for %: %', new.id, sqlerrm;
  return new;
end;
$$;

drop trigger if exists partner_link_payment_on_insert on public.payment_transactions;
create trigger partner_link_payment_on_insert
  after insert on public.payment_transactions
  for each row execute function public.partner_link_payment_on_insert();

-- ── Credit 30% after independent verification (idempotent) ──────────────────
create or replace function public.partner_credit_verified_payment(p_payment_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  p public.payment_transactions;
  link public.partner_sandbox_checkout_links;
  ref public.partner_referrals;
  next_number integer;
  inserted uuid;
begin
  select * into p from payment_transactions where id = p_payment_id;
  if not found then raise exception 'Unknown payment'; end if;

  -- Only payments verified by process_verified_payment via the ToyyibPay
  -- callback (provider transaction id, bill code and paid_at all present).
  if p.provider <> 'toyyibpay' or p.payment_status <> 'successful'
     or p.provider_transaction_id is null or p.provider_bill_code is null or p.paid_at is null
     or upper(p.currency) <> 'MYR' or p.amount <= 0 or p.plan not in ('pro', 'premium') then
    return jsonb_build_object('credited', false, 'reason', 'not_verified');
  end if;

  select * into link from partner_sandbox_checkout_links where payment_id = p.id;
  if not found or link.partner_user_id is null then
    return jsonb_build_object('credited', false, 'reason', 'no_attribution');
  end if;
  if link.customer_user_id <> p.user_id or link.partner_user_id = p.user_id then
    return jsonb_build_object('credited', false, 'reason', 'attribution_mismatch');
  end if;

  select * into ref from partner_referrals
    where customer_reference = p.user_id::text and deleted_at is null
    for update;
  if not found or ref.partner_user_id <> link.partner_user_id then
    return jsonb_build_object('credited', false, 'reason', 'attribution_mismatch');
  end if;
  if not exists (
    select 1 from partner_profiles
    where user_id = ref.partner_user_id and status = 'active' and deleted_at is null
  ) then
    return jsonb_build_object('credited', false, 'reason', 'partner_inactive');
  end if;

  if exists (select 1 from partner_commissions where payment_reference = p.id::text) then
    return jsonb_build_object('credited', false, 'reason', 'already_credited');
  end if;

  select count(*) + 1 into next_number from partner_commissions
    where referral_id = ref.id and deleted_at is null;

  insert into partner_commissions (
    partner_user_id, referral_id, payment_reference, payment_number,
    gross_amount, commission_rate, commission_amount, status, review_available_at
  ) values (
    ref.partner_user_id, ref.id, p.id::text, next_number,
    p.amount, 0.30, round(p.amount * 0.30, 2), 'pending', p.paid_at + interval '30 days'
  )
  on conflict (payment_reference) do nothing
  returning id into inserted;

  if inserted is null then
    return jsonb_build_object('credited', false, 'reason', 'already_credited');
  end if;

  update partner_referrals
    set status = 'active', plan = p.plan,
        converted_at = coalesce(converted_at, p.paid_at), updated_at = now()
    where id = ref.id;

  return jsonb_build_object('credited', true, 'commission_id', inserted, 'payment_number', next_number);
end;
$$;

-- ── Payment status transitions: credit on success, reverse on refund ───────
create or replace function public.partner_on_payment_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.payment_status = 'successful' and old.payment_status is distinct from 'successful' then
    begin
      perform public.partner_credit_verified_payment(new.id);
    exception when others then
      -- Never fail a verified payment because of partner bookkeeping.
      -- partner_credit_verified_payment(payment_id) can be replayed safely.
      raise warning 'partner commission credit failed for %: %', new.id, sqlerrm;
    end;
  elsif old.payment_status = 'successful'
        and new.payment_status in ('refunded', 'failed', 'cancelled') then
    -- Unpaid commissions are reversed. A commission already paid out is left
    -- as paid for an administrator to reconcile manually. A reversed item in
    -- an open manual batch makes approve/record_paid refuse that batch.
    update partner_commissions
      set status = 'reversed', updated_at = now()
      where payment_reference = new.id::text
        and status in ('pending', 'approved', 'available');
  end if;
  return new;
end;
$$;

drop trigger if exists partner_on_payment_status_change on public.payment_transactions;
create trigger partner_on_payment_status_change
  after update of payment_status on public.payment_transactions
  for each row execute function public.partner_on_payment_status_change();

-- ── Subscription cancellation: referral is no longer an active member ──────
create or replace function public.partner_on_subscription_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status in ('cancelled', 'expired') and old.status is distinct from new.status then
    update partner_referrals
      set status = 'cancelled', updated_at = now()
      where customer_reference = new.user_id::text and deleted_at is null and status = 'active';
  end if;
  return new;
end;
$$;

drop trigger if exists partner_on_subscription_status_change on public.subscriptions;
create trigger partner_on_subscription_status_change
  after update of status on public.subscriptions
  for each row execute function public.partner_on_subscription_status_change();

-- ── Existing sandbox bridge RPCs now route into the real ledger ─────────────
-- create-toyyibpay-bill / toyyibpay-callback still reference these behind
-- PARTNER_UPGRADE_TRACKING_ENABLED. Keep the signatures, use the new rules,
-- and stop writing the separate partner_sandbox_bills ledger.
create or replace function public.partner_attach_sandbox_checkout(p_payment_id uuid, p_user_id uuid, p_partner_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  p public.payment_transactions;
  link public.partner_sandbox_checkout_links;
  partner uuid;
begin
  select * into p from payment_transactions where id = p_payment_id for update;
  if not found or p.user_id is distinct from p_user_id or p.provider <> 'toyyibpay' then
    raise exception 'Checkout ownership mismatch';
  end if;
  select * into link from partner_sandbox_checkout_links where payment_id = p.id;
  if found then return jsonb_build_object('attached', link.partner_user_id is not null); end if;
  if p.provider_bill_code is not null or p.payment_status <> 'pending' then
    return jsonb_build_object('attached', false);
  end if;
  if p_partner_code is not null then
    perform public.partner_claim_referral_for(p.user_id, p_partner_code, 'checkout_code');
  end if;
  select r.partner_user_id into partner
    from partner_referrals r
    join partner_profiles pp on pp.user_id = r.partner_user_id
    where r.customer_reference = p.user_id::text and r.deleted_at is null
      and pp.status = 'active' and pp.deleted_at is null and r.partner_user_id <> p.user_id;
  if partner is null then return jsonb_build_object('attached', false); end if;
  insert into partner_sandbox_checkout_links (payment_id, customer_user_id, partner_user_id)
    values (p.id, p.user_id, partner) on conflict (payment_id) do nothing;
  return jsonb_build_object('attached', true);
end;
$$;

create or replace function public.partner_credit_sandbox_upgrade(p_payment_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  return public.partner_credit_verified_payment(p_payment_id);
end;
$$;

-- ── Privileges: browser roles may only claim for themselves ─────────────────
revoke all on function public.partner_claim_referral_for(uuid, text, text) from public, anon, authenticated;
revoke all on function public.partner_credit_verified_payment(uuid) from public, anon, authenticated;
revoke all on function public.partner_link_payment_on_insert() from public, anon, authenticated;
revoke all on function public.partner_on_payment_status_change() from public, anon, authenticated;
revoke all on function public.partner_on_subscription_status_change() from public, anon, authenticated;
revoke all on function public.partner_attach_sandbox_checkout(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.partner_credit_sandbox_upgrade(uuid) from public, anon, authenticated;
revoke all on function public.partner_claim_referral(text) from public, anon;

grant execute on function public.partner_claim_referral(text) to authenticated;
grant execute on function public.partner_claim_referral_for(uuid, text, text) to service_role;
grant execute on function public.partner_credit_verified_payment(uuid) to service_role;
grant execute on function public.partner_attach_sandbox_checkout(uuid, uuid, text) to service_role;
grant execute on function public.partner_credit_sandbox_upgrade(uuid) to service_role;

notify pgrst, 'reload schema';
commit;

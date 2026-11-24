-- Forward-only. Do not apply until reviewed.
-- A renewal or upgrade through process_verified_payment copies that payment's
-- plan onto the one subscription row. Older payment rows keep the plan they
-- were created with. This function therefore accepts only the latest successful
-- payment whose plan equals the current active pro or premium subscription.
-- It does not require every historical payment to use the current plan.

create or replace function public.sync_senior_form_entitlement()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  profile_form text;
  confirmed timestamptz;
  target smallint;
  paid_payment uuid;
  paid_subscription uuid;
begin
  if uid is null then
    return;
  end if;

  select p.form, p.senior_form_confirmed_at
    into profile_form, confirmed
  from public.profiles p
  where p.id = uid;

  target := case profile_form
    when 'Form 4' then 4
    when 'Form 5' then 5
    else null
  end;

  if target is null or confirmed is null then
    return;
  end if;

  select pt.id, pt.subscription_id
    into paid_payment, paid_subscription
  from public.payment_transactions pt
  join public.subscriptions s on s.id = pt.subscription_id
  where pt.user_id = uid
    and pt.payment_status = 'successful'
    and pt.subscription_id is not null
    and pt.plan in ('pro', 'premium')
    and pt.plan = s.plan
    and coalesce(pt.paid_at, pt.created_at) >= confirmed
    and s.user_id = uid
    and s.status = 'active'
    and s.plan in ('pro', 'premium')
    and s.current_period_end > now()
  order by coalesce(pt.paid_at, pt.created_at) desc
  limit 1;

  if paid_subscription is null or paid_payment is null then
    return;
  end if;

  if exists (
    select 1
    from public.senior_form_entitlements e
    where e.subscription_id = paid_subscription
      and e.user_id = uid
      and e.form_level <> target
  ) then
    return;
  end if;

  insert into public.senior_form_entitlements as e (
    user_id,
    form_level,
    subscription_id,
    payment_id
  )
  values (uid, target, paid_subscription, paid_payment)
  on conflict (user_id) do update
    set form_level = excluded.form_level,
        subscription_id = excluded.subscription_id,
        payment_id = excluded.payment_id,
        bound_at = now()
    where e.payment_id is distinct from excluded.payment_id
      and not exists (
        select 1
        from public.senior_form_entitlements other
        where other.subscription_id = excluded.subscription_id
          and other.user_id <> excluded.user_id
      );
end;
$$;

revoke all on function public.sync_senior_form_entitlement() from public;
revoke all on function public.sync_senior_form_entitlement() from anon;
grant execute on function public.sync_senior_form_entitlement() to authenticated;

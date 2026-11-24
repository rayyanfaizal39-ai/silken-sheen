-- Senior form enrolment on the existing profile, plus a form-scoped
-- entitlement row. Students can update their own form and school.
-- They cannot insert an entitlement; sync_senior_form_entitlement binds
-- one successful payment, made after this year's confirmation, to that form.

alter table public.profiles
  add column if not exists senior_form_confirmed_at timestamptz;

comment on column public.profiles.senior_form_confirmed_at is
  'When the student last confirmed Form 4 or Form 5 and their school for Senior.';

create or replace function public.clamp_senior_form_confirmed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.senior_form_confirmed_at is not distinct from old.senior_form_confirmed_at then
    return new;
  end if;

  if new.senior_form_confirmed_at is null then
    new.senior_form_confirmed_at := old.senior_form_confirmed_at;
  elsif new.senior_form_confirmed_at > now() + interval '5 minutes' then
    new.senior_form_confirmed_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_clamp_senior_form_confirmed_at on public.profiles;
create trigger profiles_clamp_senior_form_confirmed_at
  before update on public.profiles
  for each row
  execute function public.clamp_senior_form_confirmed_at();

create table if not exists public.senior_form_entitlements (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  form_level smallint not null check (form_level in (4, 5)),
  subscription_id uuid not null unique references public.subscriptions (id) on delete cascade,
  payment_id uuid not null unique references public.payment_transactions (id) on delete cascade,
  bound_at timestamptz not null default now()
);

alter table public.senior_form_entitlements enable row level security;

drop policy if exists "Students read own Senior form entitlement"
  on public.senior_form_entitlements;
create policy "Students read own Senior form entitlement"
  on public.senior_form_entitlements
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

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
    and coalesce(pt.paid_at, pt.created_at) >= confirmed
    and s.user_id = uid
    and s.status = 'active'
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

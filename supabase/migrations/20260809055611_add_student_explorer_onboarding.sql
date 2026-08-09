-- Student Explorer Profile foundation.
-- Reuse public.profiles.full_name, profiles.form, and the existing profile
-- ownership model instead of introducing a second student/profile table.

begin;

alter table public.profiles
  add column if not exists age smallint,
  add column if not exists school_id uuid,
  add column if not exists onboarding_completed boolean not null default true;

-- Existing users are deliberately grandfathered in. Only profiles created
-- after this migration should enter first-login onboarding.
alter table public.profiles
  alter column onboarding_completed set default false;

alter table public.profiles
  drop constraint if exists profiles_age_range,
  add constraint profiles_age_range
    check (age is null or age between 10 and 18);

comment on column public.profiles.full_name is
  'Student display name. Reused by Explorer Profile to avoid duplicate name fields.';
comment on column public.profiles.form is
  'KSSM form level. Explorer Profile accepts Form 1, Form 2, or Form 3.';
comment on column public.profiles.school_id is
  'Reserved for the verified Malaysian schools table; nullable until that catalog is introduced.';
comment on column public.profiles.onboarding_completed is
  'False for newly created student profiles; legacy profiles were grandfathered as complete.';

-- Validate only when a profile is first marked complete. Legacy users are
-- already complete and can continue receiving billing/admin updates without
-- being blocked by newly required student fields.
create or replace function public.validate_explorer_profile_completion()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  completing boolean;
begin
  if tg_op = 'INSERT' then
    completing := new.onboarding_completed;
  else
    completing := new.onboarding_completed and not old.onboarding_completed;
  end if;

  if completing then
    new.full_name := btrim(coalesce(new.full_name, ''));
    if nullif(new.full_name, '') is null then
      raise exception 'Display name is required' using errcode = '23514';
    end if;
    if char_length(new.full_name) > 80 then
      raise exception 'Display name must be 80 characters or fewer'
        using errcode = '22023';
    end if;
    if new.age is null then
      raise exception 'Age is required' using errcode = '23514';
    end if;
    if new.form is null or new.form not in ('Form 1', 'Form 2', 'Form 3') then
      raise exception 'Form level must be Form 1, Form 2, or Form 3'
        using errcode = '23514';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.validate_explorer_profile_completion() from public;

drop trigger if exists on_profiles_validate_explorer_completion on public.profiles;
create trigger on_profiles_validate_explorer_completion
  before insert or update of full_name, age, form, onboarding_completed
  on public.profiles
  for each row execute function public.validate_explorer_profile_completion();

-- Tighten the existing private profile policies while retaining the admin
-- paths already used by the project. UPDATE has both SELECT and WITH CHECK.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (
    (select auth.uid()) = id
    and role = 'student'
    and plan = 'free'
    and status = 'active'
  );

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
  on public.profiles for select
  to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

revoke all on table public.profiles from anon;
grant select, insert, update on table public.profiles to authenticated;

-- Keep signup provisioning in one trigger. The column default now marks new
-- profiles incomplete; user_progress continues to own XP/streak/companion.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

commit;

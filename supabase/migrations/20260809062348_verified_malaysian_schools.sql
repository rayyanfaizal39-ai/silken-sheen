-- Verified Malaysian school directory foundation.
-- No school rows are seeded here: the repository does not currently contain
-- a trustworthy KPM/MOE dataset. This migration creates the import-ready
-- schema, indexed search API, and profile integrity rules only.

begin;

create schema if not exists extensions;
create extension if not exists pg_trgm with schema extensions;

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  school_code text,
  school_name text not null,
  school_type text,
  state text not null,
  district text,
  postcode text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint schools_school_code_unique unique (school_code),
  constraint schools_name_not_blank
    check (btrim(school_name) <> '' and char_length(school_name) <= 200),
  constraint schools_code_not_blank
    check (
      school_code is null
      or (
        btrim(school_code) <> ''
        and char_length(school_code) <= 40
        and school_code = upper(btrim(school_code))
      )
    ),
  constraint schools_type_length
    check (school_type is null or char_length(school_type) <= 100),
  constraint schools_state_not_blank
    check (btrim(state) <> '' and char_length(state) <= 100),
  constraint schools_district_length
    check (district is null or char_length(district) <= 120),
  constraint schools_postcode_format
    check (postcode is null or postcode ~ '^[0-9]{5}$')
);

comment on table public.schools is
  'Verified Malaysian schools imported from an approved KPM/MOE source.';
comment on column public.schools.school_code is
  'Official source identifier where supplied; unique case-insensitively.';
comment on column public.schools.active is
  'Inactive schools remain referenced historically but are excluded from selection.';

-- Trigram indexes keep literal partial-name/code search scalable without
-- downloading the directory. They mirror the active-only search predicate.
create index if not exists schools_active_name_trgm_idx
  on public.schools using gin (lower(school_name) extensions.gin_trgm_ops)
  where active;

create index if not exists schools_active_code_trgm_idx
  on public.schools using gin (lower(school_code) extensions.gin_trgm_ops)
  where active and school_code is not null;

create index if not exists schools_active_state_district_idx
  on public.schools (state, district)
  where active;

create index if not exists profiles_school_id_idx
  on public.profiles (school_id)
  where school_id is not null;

-- NOT VALID prevents deployment from failing if a school_id was written
-- between the foundation and directory migrations. PostgreSQL still enforces
-- this FK for every new/changed value; existing anomalies can be audited and
-- the constraint validated later without deleting profile data.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_school_id_fkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_school_id_fkey
      foreign key (school_id)
      references public.schools(id)
      on delete restrict
      not valid;
  end if;
end
$$;

create or replace function public.set_schools_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function public.set_schools_updated_at() from public;

drop trigger if exists on_schools_set_updated_at on public.schools;
create trigger on_schools_set_updated_at
  before update on public.schools
  for each row execute function public.set_schools_updated_at();

alter table public.schools enable row level security;

drop policy if exists "Authenticated users can search active schools" on public.schools;
create policy "Authenticated users can search active schools"
  on public.schools for select
  to authenticated
  using (active);

revoke all on table public.schools from anon, authenticated;
grant select on table public.schools to authenticated;

-- A capped, literal substring search. Wildcard characters are removed from
-- the input so callers cannot turn it into an unbounded pattern search.
create or replace function public.search_schools(
  search_query text,
  max_results integer default 12
)
returns table (
  id uuid,
  school_code text,
  school_name text,
  school_type text,
  state text,
  district text,
  postcode text
)
language sql
stable
security invoker
set search_path = ''
as $$
  with normalized as (
    select regexp_replace(
      lower(btrim(coalesce(search_query, ''))),
      '[%_]+',
      ' ',
      'g'
    ) as term
  )
  select
    s.id,
    s.school_code,
    s.school_name,
    s.school_type,
    s.state,
    s.district,
    s.postcode
  from public.schools s
  cross join normalized q
  where s.active
    and char_length(q.term) >= 3
    and (
      lower(s.school_name) like '%' || q.term || '%'
      or lower(coalesce(s.school_code, '')) like '%' || q.term || '%'
    )
  order by
    case
      when lower(s.school_name) = q.term then 0
      when lower(s.school_name) like q.term || '%' then 1
      when lower(s.school_name) like '% ' || q.term || '%' then 2
      else 3
    end,
    s.school_name,
    s.state,
    s.district nulls last
  limit least(greatest(coalesce(max_results, 12), 1), 20);
$$;

revoke all on function public.search_schools(text, integer) from public, anon;
grant execute on function public.search_schools(text, integer) to authenticated;

-- Extend the existing transition-only validator. Legacy completed profiles
-- remain exempt: they are checked only if they select/change a school, and
-- their historical NULL school_id can remain until an intentional migration.
create or replace function public.validate_explorer_profile_completion()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  completing boolean;
  school_changed boolean;
begin
  if tg_op = 'INSERT' then
    completing := new.onboarding_completed;
    school_changed := new.school_id is not null;
  else
    completing := new.onboarding_completed and not old.onboarding_completed;
    school_changed := new.school_id is distinct from old.school_id;
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
    if new.school_id is null then
      raise exception 'A verified school is required' using errcode = '23514';
    end if;
  end if;

  if school_changed and new.school_id is not null and not exists (
    select 1
    from public.schools s
    where s.id = new.school_id
      and s.active
  ) then
    raise exception 'Choose an active verified school' using errcode = '23503';
  end if;

  if tg_op = 'UPDATE'
    and old.school_id is not null
    and new.school_id is null
    and new.onboarding_completed
  then
    raise exception 'A completed Explorer Profile must retain a verified school'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

revoke all on function public.validate_explorer_profile_completion() from public;

drop trigger if exists on_profiles_validate_explorer_completion on public.profiles;
create trigger on_profiles_validate_explorer_completion
  before insert or update of full_name, age, form, school_id, onboarding_completed
  on public.profiles
  for each row execute function public.validate_explorer_profile_completion();

commit;

create table if not exists public.student_ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint student_ratings_user_id_key unique (user_id),
  constraint student_ratings_rating_check check (rating between 1 and 5)
);

-- Repair a table created by an earlier draft of this migration.
alter table public.student_ratings
  alter column rating type integer using rating::integer,
  alter column rating set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'student_ratings_user_id_key'
      and conrelid = 'public.student_ratings'::regclass
  ) then
    alter table public.student_ratings
      add constraint student_ratings_user_id_key unique (user_id);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'student_ratings_rating_check'
      and conrelid = 'public.student_ratings'::regclass
  ) then
    alter table public.student_ratings
      add constraint student_ratings_rating_check check (rating between 1 and 5);
  end if;
end;
$$;

create or replace function public.set_student_ratings_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function public.set_student_ratings_updated_at() from public, anon, authenticated;

drop trigger if exists set_student_ratings_updated_at on public.student_ratings;
create trigger set_student_ratings_updated_at
  before update on public.student_ratings
  for each row execute function public.set_student_ratings_updated_at();

alter table public.student_ratings enable row level security;

drop policy if exists "Students can read their own rating" on public.student_ratings;
drop policy if exists "Students can insert their own rating" on public.student_ratings;
drop policy if exists "Students can update their own rating" on public.student_ratings;
drop policy if exists "Users can read their own rating" on public.student_ratings;
drop policy if exists "Users can insert their own rating" on public.student_ratings;
drop policy if exists "Users can update their own rating" on public.student_ratings;

create policy "Users can read their own rating"
  on public.student_ratings for select to authenticated
  using (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true'
  );

create policy "Users can insert their own rating"
  on public.student_ratings for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true'
  );

create policy "Users can update their own rating"
  on public.student_ratings for update to authenticated
  using (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true'
  )
  with check (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true'
  );

revoke all on table public.student_ratings from public, anon, authenticated;
grant select, insert, update on table public.student_ratings to authenticated;

-- DROP is required when repairing an earlier function whose RETURNS TABLE
-- columns used different names.
drop function if exists public.get_student_rating_summary();

create function public.get_student_rating_summary()
returns table (
  average_rating numeric,
  total_ratings bigint,
  five_star_count bigint,
  four_star_count bigint,
  three_star_count bigint,
  two_star_count bigint,
  one_star_count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(round(avg(rating)::numeric, 1), 0::numeric) as average_rating,
    count(*)::bigint as total_ratings,
    count(*) filter (where rating = 5)::bigint as five_star_count,
    count(*) filter (where rating = 4)::bigint as four_star_count,
    count(*) filter (where rating = 3)::bigint as three_star_count,
    count(*) filter (where rating = 2)::bigint as two_star_count,
    count(*) filter (where rating = 1)::bigint as one_star_count
  from public.student_ratings;
$$;

revoke all on function public.get_student_rating_summary() from public, anon, authenticated;
grant execute on function public.get_student_rating_summary() to anon, authenticated;

notify pgrst, 'reload schema';

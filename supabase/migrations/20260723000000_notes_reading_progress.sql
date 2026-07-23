create table if not exists public.notes_reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  form text not null check (form in ('Form 1', 'Form 2', 'Form 3')),
  chapter text not null,
  variant text not null default 'default',
  progress_percent smallint not null default 0 check (progress_percent between 0 and 100),
  completed boolean not null default false,
  last_read_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, subject, form, chapter, variant)
);

create index if not exists notes_reading_progress_scope_idx
  on public.notes_reading_progress (user_id, subject, form, variant);

create or replace function public.keep_notes_progress_monotonic()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.progress_percent := greatest(old.progress_percent, new.progress_percent);
  new.completed := old.completed or new.completed or new.progress_percent >= 100;
  new.last_read_at := greatest(old.last_read_at, new.last_read_at);
  return new;
end;
$$;

drop trigger if exists keep_notes_progress_monotonic on public.notes_reading_progress;
create trigger keep_notes_progress_monotonic
  before update on public.notes_reading_progress
  for each row execute function public.keep_notes_progress_monotonic();

drop trigger if exists set_notes_reading_progress_updated_at on public.notes_reading_progress;
create trigger set_notes_reading_progress_updated_at
  before update on public.notes_reading_progress
  for each row execute function public.handle_updated_at();

alter table public.notes_reading_progress enable row level security;

drop policy if exists "Users can read their notes progress" on public.notes_reading_progress;
drop policy if exists "Users can insert their notes progress" on public.notes_reading_progress;
drop policy if exists "Users can update their notes progress" on public.notes_reading_progress;

create policy "Users can read their notes progress"
  on public.notes_reading_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their notes progress"
  on public.notes_reading_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their notes progress"
  on public.notes_reading_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on table public.notes_reading_progress from anon;
grant select, insert, update on table public.notes_reading_progress to authenticated;

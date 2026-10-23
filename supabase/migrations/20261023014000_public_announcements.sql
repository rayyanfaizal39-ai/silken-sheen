-- Student bulletin for the home Mission Control panel.
--
-- The site owner writes rows with the service role (or another connection that
-- bypasses RLS). The app has no admin UI for this table. anon and authenticated
-- may only read rows that are currently live. There are no client insert,
-- update, or delete policies.
--
-- Idempotent: safe to run more than once.

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  type text not null default 'news',
  pinned boolean not null default false,
  published boolean not null default true,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  link_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint announcements_type_check check (type in ('news', 'reminder', 'urgent', 'event'))
);

comment on table public.announcements is
  'Live student bulletin on the home Mission Control panel. Clients can read published rows inside their time window. Writes are service-role only.';

-- Shared updated_at helper. Other migrations assume this already exists in
-- production; create it only when a fresh database does not have it yet.
do $$
begin
  if to_regprocedure('public.handle_updated_at()') is null then
    create function public.handle_updated_at()
    returns trigger
    language plpgsql
    set search_path = ''
    as $fn$
    begin
      new.updated_at = now();
      return new;
    end;
    $fn$;
  end if;
end $$;

drop trigger if exists set_announcements_updated_at on public.announcements;
create trigger set_announcements_updated_at
  before update on public.announcements
  for each row execute function public.handle_updated_at();

alter table public.announcements enable row level security;

-- Full old/new rows so Realtime can drop a post when it is removed.
alter table public.announcements replica identity full;

revoke all on table public.announcements from public, anon, authenticated;
grant select on table public.announcements to anon, authenticated;
grant select, insert, update, delete on table public.announcements to service_role;

drop policy if exists "Live announcements are publicly readable" on public.announcements;
create policy "Live announcements are publicly readable"
  on public.announcements
  for select
  to anon, authenticated
  using (
    published = true
    and starts_at <= now()
    and (expires_at is null or expires_at > now())
  );

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'announcements'
     ) then
    alter publication supabase_realtime add table public.announcements;
  end if;
end $$;

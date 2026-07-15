alter table public.profiles
  add column if not exists username text,
  add column if not exists avatar_url text,
  add column if not exists school text,
  add column if not exists form_level text check (form_level in ('Form 1', 'Form 2', 'Form 3'));

create unique index if not exists profiles_username_unique
  on public.profiles (lower(username)) where username is not null;

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb check (jsonb_typeof(preferences) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;
grant select, insert, update on table public.user_settings to authenticated;

create policy "Users can read own settings" on public.user_settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can create own settings" on public.user_settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own settings" on public.user_settings
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop trigger if exists on_user_settings_updated on public.user_settings;
create trigger on_user_settings_updated before update on public.user_settings
  for each row execute function public.handle_updated_at();

comment on column public.user_settings.preferences is
  'Validated AcadeMY per-user UI, learning, audio, AI, companion and notification preferences.';

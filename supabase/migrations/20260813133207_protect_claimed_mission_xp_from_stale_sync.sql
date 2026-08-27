-- A delayed local-first sync must not erase XP already committed by a claim.
create or replace function public.keep_user_progress_xp_monotonic()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.xp := greatest(old.xp, new.xp);
  return new;
end;
$$;

drop trigger if exists keep_user_progress_xp_monotonic on public.user_progress;
create trigger keep_user_progress_xp_monotonic
  before update on public.user_progress
  for each row execute function public.keep_user_progress_xp_monotonic();

revoke all on function public.keep_user_progress_xp_monotonic() from public, anon, authenticated;

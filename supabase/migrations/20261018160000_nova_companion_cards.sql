-- REVIEW REQUIRED. Additive only: does not read or update AcadeMY progress, XP or legacy companions.
begin;

create function public.nova_subscription_active(owner_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.subscriptions s
    where s.user_id = owner_id and s.status = 'active'
      and s.plan in ('pro','premium') and s.current_period_end > now());
$$;
revoke all on function public.nova_subscription_active(uuid) from public, anon, authenticated;

create function public.nova_require_active_student() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare u uuid := auth.uid();
begin
  if u is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, false) then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.profiles p
    where p.id = u and p.role = 'student' and p.status = 'active'
  ) then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  return u;
end;
$$;
revoke all on function public.nova_require_active_student() from public, anon, authenticated;

create sequence public.nova_serial_seq start 1000000 maxvalue 999999999999;
revoke all on sequence public.nova_serial_seq from public, anon, authenticated;
create table public.nova_cards (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users(id) on delete cascade,
  public_id uuid not null unique default gen_random_uuid(),
  serial text not null unique default lpad(nextval('public.nova_serial_seq')::text, 12, '0') check (serial ~ '^[0-9]{12}$'),
  username text not null check (username ~ '^[A-Za-z0-9_]{2,24}$'),
  answers integer[] not null check (coalesce(array_length(answers, 1), 0) = 12 and array_ndims(answers) = 1 and array_lower(answers, 1) = 1 and 0 <= all(answers) and 2 >= all(answers) and array_position(answers, null) is null),
  variant text not null check (variant in ('a', 'b')),
  rarity text not null default 'Rare' check (rarity in ('Common', 'Rare', 'Epic', 'Legendary')),
  sharing boolean not null default false,
  created_at timestamptz not null default now()
);
create function public.nova_card_owner_eligible() returns trigger
language plpgsql set search_path = '' as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = new.owner_id and p.role = 'student' and p.status = 'active'
  ) then
    raise exception 'Cards can only belong to active student profiles' using errcode = '23514';
  end if;
  return new;
end;
$$;
create trigger nova_card_owner_must_be_active_student
  before insert or update of owner_id on public.nova_cards
  for each row execute function public.nova_card_owner_eligible();
alter table public.nova_cards enable row level security;
revoke all on public.nova_cards from public, anon, authenticated;
grant select on public.nova_cards to authenticated;
create policy nova_owner_read on public.nova_cards for select to authenticated using (
  owner_id = (select auth.uid()) and exists(
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='student' and p.status='active'
  )
);
-- Direct writes are deliberately revoked: RPCs never accept owner, IDs or rarity.

create function public.nova_traits(a integer[]) returns jsonb
language sql immutable set search_path = '' as $$
  select jsonb_build_object(
    'personality', (array['Explorer','Nurturer','Strategist'])[a[1]+1],
    'creature', (array['Phoenix','Magical Fox','Phoenix'])[a[2]+1],
    'element', (array['Fire','Water','Starlight'])[a[3]+1],
    'appearance', (array['Soft and fluffy','Sleek and swift','Small and sturdy'])[a[4]+1],
    'colours', (array['Obsidian Black / Violet','Sapphire Blue / Gold','Pearl / Rose'])[a[5]+1],
    'ability', (array['Light the way','Healing currents','Stellar shield'])[a[6]+1],
    'habitat', (array['Floating islands','Moonlit lagoon','Crystal forest'])[a[7]+1],
    'behaviour', (array['Curious and playful','Gentle and patient','Quiet and watchful'])[a[8]+1],
    'eyes', (array['Cosmic Galaxy Eyes','Golden Starlight Eyes','Ocean Crystal Eyes'])[a[9]+1],
    'marking', (array['A glowing forehead star','Golden ear tips','A crescent marking'])[a[10]+1],
    'approach', (array['Try a new path','Bring friends together','Pause and make a plan'])[a[11]+1],
    'bond', (array['Explore together','Grow together','Protect each other'])[a[12]+1]);
$$;
revoke all on function public.nova_traits(integer[]) from public, anon, authenticated;

-- Future generation pipeline: service-only jobs and exactly two candidate slots.
-- No paid generator is invoked by this migration or the demo.
create table public.nova_generation_jobs (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.nova_cards(id) on delete cascade,
  stage integer not null check (stage between 1 and 5),
  status text not null default 'queued' check (status in ('queued','running','ready','failed')),
  prompt_version text not null,
  identity_snapshot jsonb not null,
  provider_metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (card_id, stage),
  unique (id, card_id, stage)
);
create table public.nova_artwork (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.nova_cards(id) on delete cascade,
  job_id uuid not null,
  stage integer not null check (stage between 1 and 5),
  candidate text not null check (candidate in ('a','b') and (stage = 1 or candidate = 'a')),
  storage_path text not null unique,
  released boolean not null default false,
  selected boolean not null default false,
  created_at timestamptz not null default now(),
  unique (card_id, stage, candidate),
  foreign key (job_id, card_id, stage)
    references public.nova_generation_jobs(id, card_id, stage) on delete cascade
);
create unique index nova_one_selected_stage on public.nova_artwork(card_id, stage) where selected;
alter table public.nova_generation_jobs enable row level security;
alter table public.nova_artwork enable row level security;
revoke all on public.nova_generation_jobs, public.nova_artwork from public, anon, authenticated;
grant all on public.nova_cards, public.nova_artwork, public.nova_generation_jobs to service_role;
grant usage, select on public.nova_serial_seq to service_role;

-- Phase 1 exposes only the permanent Origin artwork. Evolution designs remain
-- available in the application but have no database or XP integration yet.
create function public.nova_visible_stage(c public.nova_cards) returns integer
language sql immutable set search_path = '' as $$
  select 1;
$$;
revoke all on function public.nova_visible_stage(public.nova_cards) from public, anon, authenticated;

create function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,'serial',c.serial,'username',c.username,
    'traits',public.nova_traits(c.answers),'variant',c.variant,'rarity',c.rarity,
    'stage',public.nova_visible_stage(c),'sharing',c.sharing,
    'artworkPath',(select a.storage_path from public.nova_artwork a
      where a.card_id=c.id and a.stage=public.nova_visible_stage(c)
      and a.released and a.selected));
$$;
revoke all on function public.nova_card_payload(public.nova_cards) from public, anon, authenticated;

create function public.get_public_nova_card(requested_public_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c
  where c.public_id = requested_public_id and c.sharing and exists(
    select 1 from public.profiles p
    where p.id=c.owner_id and p.role='student' and p.status='active'
  );
$$;
create function public.get_my_nova_card() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  select * into c from public.nova_cards where owner_id=u;
  if not found then return null; end if;
  return public.nova_card_payload(c);
end;
$$;

create function public.set_nova_sharing(enabled boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  if enabled is null then raise exception 'Sharing preference is required'; end if;
  update public.nova_cards set sharing = enabled where owner_id = u returning * into c;
  if not found then raise exception 'Create your companion first'; end if;
  return public.nova_card_payload(c);
end;
$$;

-- Older previews exposed creation and sequential-serial lookup RPCs. Neither is
-- part of the permanent Studio API: creation now follows draft -> submit -> select,
-- and public links use the opaque public UUID only.
drop function if exists public.create_nova_card(text,integer[],text);
drop function if exists public.get_public_nova_card_by_serial(text);
revoke all on function public.nova_card_owner_eligible(), public.get_public_nova_card(uuid),
  public.get_my_nova_card(), public.set_nova_sharing(boolean) from public, anon, authenticated;
grant execute on function public.get_public_nova_card(uuid) to anon, authenticated;
grant execute on function public.get_my_nova_card(), public.set_nova_sharing(boolean) to authenticated;

-- Phase 1 deliberately has no evolution or XP integration. Keep this narrow
-- compatibility RPC fail-closed so older clients cannot enqueue stage artwork.
create function public.request_nova_evolution(target_stage integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student();
begin
  raise exception 'Card evolution is not available in Phase 1' using errcode = '0A000';
end;
$$;
revoke all on function public.request_nova_evolution(integer) from public, anon, authenticated;
grant execute on function public.request_nova_evolution(integer) to authenticated;

-- Private future AI assets. No learner upload/write policies.
insert into storage.buckets (id, name, public) values ('nova-artwork', 'nova-artwork', false);
create function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.nova_artwork a join public.nova_cards c on c.id = a.card_id
    where a.storage_path = path and a.released and a.selected
      and a.stage = public.nova_visible_stage(c)
      and exists(select 1 from public.profiles p
        where p.id=c.owner_id and p.role='student' and p.status='active')
      and (c.sharing or c.owner_id = auth.uid()));
$$;
revoke all on function public.can_read_nova_artwork(text) from public;
grant execute on function public.can_read_nova_artwork(text) to anon, authenticated;
create policy nova_current_art_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'nova-artwork' and public.can_read_nova_artwork(name));

commit;

-- REVIEW REQUIRED. Additive only: does not update progress or legacy companions.
-- Existing persisted XP is grandfathered once; future XP comes from protected ledgers.
begin;

create table public.nova_xp_baselines (
  user_id uuid primary key references auth.users(id) on delete cascade,
  legacy_xp bigint not null check (legacy_xp >= 0),
  ledger_checkpoint bigint not null,
  captured_at timestamptz not null default now()
);
alter table public.nova_xp_baselines enable row level security;
revoke all on public.nova_xp_baselines from public, anon, authenticated;

-- A stable statement snapshot avoids counting pre-migration awards twice.
insert into public.nova_xp_baselines (user_id, legacy_xp, ledger_checkpoint)
select up.user_id, greatest(0, up.xp),
  coalesce((select sum(q.xp_earned) from public.quiz_xp_awards q where q.user_id = up.user_id), 0)
  + coalesce((select sum(m.reward_xp) from public.mission_reward_claims m where m.user_id = up.user_id), 0)
from public.user_progress up;

create function public.nova_verified_xp(owner_id uuid) returns bigint
language sql stable security definer set search_path = '' as $$
  select greatest(coalesce(b.legacy_xp, 0), coalesce(b.legacy_xp - b.ledger_checkpoint, 0)
    + coalesce((select sum(xp_earned) from public.quiz_xp_awards where user_id = owner_id), 0)
    + coalesce((select sum(reward_xp) from public.mission_reward_claims where user_id = owner_id), 0))
  from (select 1) seed left join public.nova_xp_baselines b on b.user_id = owner_id;
$$;
revoke all on function public.nova_verified_xp(uuid) from public, anon, authenticated;

create function public.nova_subscription_active(owner_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.subscriptions s
    where s.user_id = owner_id and s.status = 'active'
      and s.plan in ('pro','premium') and s.current_period_end > now());
$$;
revoke all on function public.nova_subscription_active(uuid) from public, anon, authenticated;

create function public.nova_stage(xp bigint) returns integer
language sql immutable set search_path = '' as $$
  select count(*)::integer from unnest(array[0,1600,9000,32000,80000]) threshold
    where threshold <= greatest(0, xp);
$$;
revoke all on function public.nova_stage(bigint) from public, anon, authenticated;

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
  snapshot_xp bigint not null default 0 check (snapshot_xp >= 0),
  snapshot_stage integer not null default 1 check (snapshot_stage between 1 and 5),
  created_at timestamptz not null default now()
);
alter table public.nova_cards enable row level security;
revoke all on public.nova_cards from public, anon, authenticated;
grant select on public.nova_cards to authenticated;
create policy nova_owner_read on public.nova_cards for select to authenticated using (owner_id = (select auth.uid()));
-- Direct writes are deliberately revoked: RPCs never accept owner, XP, IDs or rarity.

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
  unique (card_id, stage)
);
create table public.nova_artwork (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.nova_cards(id) on delete cascade,
  job_id uuid references public.nova_generation_jobs(id),
  stage integer not null check (stage between 1 and 5),
  candidate text not null check (candidate in ('a','b') and (stage = 1 or candidate = 'a')),
  storage_path text not null unique,
  released boolean not null default false,
  selected boolean not null default false,
  created_at timestamptz not null default now(),
  unique (card_id, stage, candidate)
);
create unique index nova_one_selected_stage on public.nova_artwork(card_id, stage) where selected;
alter table public.nova_generation_jobs enable row level security;
alter table public.nova_artwork enable row level security;
revoke all on public.nova_generation_jobs, public.nova_artwork from public, anon, authenticated;
grant all on public.nova_cards, public.nova_artwork, public.nova_generation_jobs, public.nova_xp_baselines to service_role;
grant usage, select on public.nova_serial_seq to service_role;

-- Only approved, released forms are shown. An inactive card uses its paid snapshot.
create function public.nova_visible_stage(c public.nova_cards) returns integer
language sql stable security definer set search_path = '' as $$
  select case when public.nova_subscription_active(c.owner_id) then
    coalesce((select max(a.stage) from public.nova_artwork a
      where a.card_id=c.id and a.selected and a.released
        and a.stage <= public.nova_stage(public.nova_verified_xp(c.owner_id))),1)
  else c.snapshot_stage end;
$$;
revoke all on function public.nova_visible_stage(public.nova_cards) from public, anon, authenticated;

create function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,'serial',c.serial,'username',c.username,
    'traits',public.nova_traits(c.answers),'variant',c.variant,'rarity',c.rarity,
    'xp',case when public.nova_subscription_active(c.owner_id) then
      public.nova_verified_xp(c.owner_id) else c.snapshot_xp end,
    'stage',public.nova_visible_stage(c),'sharing',c.sharing,
    'artworkPath',(select a.storage_path from public.nova_artwork a
      where a.card_id=c.id and a.stage=public.nova_visible_stage(c)
      and a.released and a.selected));
$$;
revoke all on function public.nova_card_payload(public.nova_cards) from public, anon, authenticated;

create function public.get_public_nova_card(requested_public_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c where c.public_id = requested_public_id and c.sharing;
$$;
create function public.get_public_nova_card_by_serial(requested_serial text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c where c.serial = requested_serial and c.sharing;
$$;
create function public.get_my_nova_card() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards;
begin
  if auth.uid() is null then return null; end if;
  select * into c from public.nova_cards where owner_id=auth.uid();
  if not found then return null; end if;
  if public.nova_subscription_active(c.owner_id) then
    update public.nova_cards
      set snapshot_xp=greatest(snapshot_xp,public.nova_verified_xp(c.owner_id)),
          snapshot_stage=greatest(snapshot_stage,public.nova_visible_stage(c))
      where id=c.id returning * into c;
  end if;
  return public.nova_card_payload(c);
end;
$$;

create function public.create_nova_card(display_username text, questionnaire integer[], selected_variant text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards;
begin
  if auth.uid() is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, true) then
    raise exception 'A registered student account is required' using errcode = '42501';
  end if;
  if not public.nova_subscription_active(auth.uid()) then
    raise exception 'An active Pro or Premium subscription is required' using errcode = '42501';
  end if;
  insert into public.nova_cards (owner_id, username, answers, variant, snapshot_xp)
    values (auth.uid(), display_username, questionnaire, selected_variant,
      public.nova_verified_xp(auth.uid()))
    on conflict (owner_id) do nothing;
  select * into strict c from public.nova_cards where owner_id = auth.uid();
  return public.nova_card_payload(c);
end;
$$;

create function public.set_nova_sharing(enabled boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards;
begin
  if auth.uid() is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, true) then
    raise exception 'A registered student account is required' using errcode = '42501';
  end if;
  if enabled is null then raise exception 'Sharing preference is required'; end if;
  update public.nova_cards set sharing = enabled where owner_id = auth.uid() returning * into c;
  if not found then raise exception 'Create your companion first'; end if;
  return public.nova_card_payload(c);
end;
$$;

revoke all on function public.get_public_nova_card(uuid), public.get_public_nova_card_by_serial(text), public.get_my_nova_card(), public.create_nova_card(text,integer[],text), public.set_nova_sharing(boolean) from public, anon, authenticated;
grant execute on function public.get_public_nova_card(uuid), public.get_public_nova_card_by_serial(text) to anon, authenticated;
grant execute on function public.get_my_nova_card(), public.create_nova_card(text,integer[],text), public.set_nova_sharing(boolean) to authenticated;

-- Queue only; no paid AI worker is configured. Prevent skipping generations.
create function public.request_nova_evolution(target_stage integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards;
  previous_stage integer;
  job public.nova_generation_jobs;
begin
  if auth.uid() is null or coalesce((auth.jwt()->>'is_anonymous')::boolean,true) then
    raise exception 'Sign in to evolve Nova' using errcode = '42501';
  end if;
  if not public.nova_subscription_active(auth.uid()) then
    raise exception 'An active Pro or Premium subscription is required' using errcode = '42501';
  end if;
  if target_stage is null or target_stage < 2 or target_stage > 5 then
    raise exception 'Invalid evolution stage';
  end if;
  select * into c from public.nova_cards where owner_id=auth.uid() for update;
  if not found then raise exception 'Create your companion first'; end if;
  if public.nova_stage(public.nova_verified_xp(c.owner_id)) < target_stage then
    raise exception 'Not enough verified XP';
  end if;
  select max(stage) into previous_stage from public.nova_artwork
    where card_id=c.id and released and selected and stage = target_stage-1;
  if previous_stage is distinct from target_stage-1 then
    raise exception 'Previous approved evolution artwork is required';
  end if;
  insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot)
    values(c.id,target_stage,'nova-five-stage-v1',
      jsonb_build_object('traits',public.nova_traits(c.answers),
        'originalVariant',c.variant,'previousStage',previous_stage))
    on conflict(card_id,stage) do nothing;
  select * into strict job from public.nova_generation_jobs
    where card_id=c.id and stage=target_stage;
  return jsonb_build_object('stage',job.stage,'status',job.status);
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
      and (c.sharing or c.owner_id = auth.uid()));
$$;
revoke all on function public.can_read_nova_artwork(text) from public;
grant execute on function public.can_read_nova_artwork(text) to anon, authenticated;
create policy nova_current_art_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'nova-artwork' and public.can_read_nova_artwork(name));

commit;

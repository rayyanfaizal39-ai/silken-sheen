-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261024140000_nova_craft_portrait_read.sql.
--
-- An active admin may summon and keep one companion on their own account,
-- the same way a student does. Entitlement still comes from cosmic_companion
-- for a student. An active admin may pass that check without a subscription.
-- The staff queue lists that card with staffTest true, in the same order.
-- Owner checks stay on auth.uid(), so an admin cannot read or pick another
-- person's portraits. Paid image generation still accepts students only.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

-- Who may own one companion card: an active student, or an active admin
-- testing the same journey. Teachers and suspended accounts stay out.
create function public.nova_profile_can_own_card(account uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = account and p.status = 'active' and p.role in ('student', 'admin')
  );
$$;
revoke all on function public.nova_profile_can_own_card(uuid) from public, anon, authenticated;

-- Students still need the cosmic_companion feature. An active admin may
-- start the same journey without a subscription row.
create or replace function public.nova_subscription_active(owner_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.academy_subscription_has_feature(owner_id, 'cosmic_companion')
    or exists (
      select 1 from public.profiles p
      where p.id = owner_id and p.role = 'admin' and p.status = 'active'
    );
$$;
revoke all on function public.nova_subscription_active(uuid) from public, anon, authenticated;

-- Callers are still the signed-in account. The name stays, because every
-- owner RPC already uses it. An admin passes. Anyone else still fails
-- with the same error.
create or replace function public.nova_require_active_student() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare u uuid := auth.uid();
begin
  if u is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, false) then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  if not public.nova_profile_can_own_card(u) then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  return u;
end;
$$;

create or replace function public.nova_card_owner_eligible() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = new.owner_id and p.status = 'active' and p.role in ('student', 'admin')
  ) then
    raise exception 'Cards can only belong to an active student or staff profile' using errcode = '23514';
  end if;
  return new;
end;
$$;

drop policy if exists nova_owner_read on public.nova_cards;
create policy nova_owner_read on public.nova_cards for select to authenticated using (
  owner_id = (select auth.uid()) and exists(
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.status = 'active' and p.role in ('student', 'admin')
  )
);

-- Same one-card submit as 20261024130000. The owner may be an active admin.
-- The preference companion still enters the queue. Image generation stays off.
create or replace function public.nova_submit_companions(
  student uuid, questionnaire integer[], match jsonb, dna jsonb
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards; d public.nova_studio_drafts; j uuid;
begin
  if student is null then raise exception 'A student is required' using errcode = '22004'; end if;
  perform 1 from auth.users where id = student for update;
  if not found then raise exception 'An active student account is required' using errcode = '42501'; end if;
  if not public.nova_profile_can_own_card(student) then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  select * into c from public.nova_cards where owner_id = student for update;
  if c.id is not null then
    return jsonb_build_object('status', 'existing', 'cardId', c.id);
  end if;
  if not public.nova_subscription_active(student) then
    raise exception 'An active Pro or Premium subscription is required' using errcode = '42501';
  end if;
  select * into d from public.nova_studio_drafts where owner_id = student for update;
  if d.owner_id is null or cardinality(d.answers) is distinct from 12 or d.username = '' then
    raise exception 'Complete all twelve questions and choose a nickname';
  end if;
  if questionnaire is distinct from d.answers then
    raise exception 'Your answers changed on another device. Refresh to continue.' using errcode = '40001';
  end if;
  perform public.nova_validate_match(match, d.answers);
  if jsonb_typeof(dna) is distinct from 'array' or jsonb_array_length(dna) <> 2
    or dna->0->>'slot' is distinct from 'a' or dna->1->>'slot' is distinct from 'b' then
    raise exception 'Invalid Visual DNA' using errcode = '22023';
  end if;
  insert into public.nova_cards(
    owner_id, username, answers, variant, journey_entitled, craft_slot, craft_queued_at
  ) values (student, d.username, d.answers, 'a', true, 'a', now()) returning * into c;
  insert into public.nova_card_candidates(card_id, slot, spec)
    select c.id, x->>'slot', x from jsonb_array_elements(match->'candidates') x;
  insert into public.nova_card_dna(card_id, slot, dna)
    select c.id, x->>'slot', x from jsonb_array_elements(dna) x;
  insert into public.nova_generation_jobs(card_id, stage, prompt_version, identity_snapshot, reveal_after)
    values (c.id, 1, 'cc-art-v1', c.identity_spec, now() + interval '24 hours') returning id into j;
  insert into public.nova_generation_candidates(job_id, candidate) values (j, 'a'), (j, 'b');
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (student, 'companions_matched', c.id, jsonb_build_object(
      'matcherVersion', match->>'matcherVersion', 'catalogueVersion', match->>'catalogueVersion',
      'dnaVersion', dna->0->>'dnaVersion',
      'candidates', jsonb_build_array(match->'candidates'->0->>'candidateId', match->'candidates'->1->>'candidateId'),
      'feature', 'cosmic_companion',
      'craftSlot', 'a'));
  return jsonb_build_object(
    'status', 'created', 'cardId', c.id, 'journeyEntitled', true, 'craftSlot', 'a'
  );
end;
$$;

-- Same portrait rule as 20261024140000. The owner profile may be a student
-- or an admin. A caller who is not the owner still sees only a shared,
-- already chosen portrait.
create or replace function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.nova_artwork a join public.nova_cards c on c.id=a.card_id
    where a.storage_path=path and exists(select 1 from public.profiles p
      where p.id=c.owner_id and p.role in ('student', 'admin') and p.status='active') and (
      (a.stage=1 and a.selected and a.released and (c.sharing or c.owner_id=auth.uid()))
      or (c.owner_id=auth.uid() and a.stage=1 and public.nova_origin_reveal_ready(c)
        and (a.review_status is null or a.review_status='approved')
        and not exists(select 1 from public.nova_artwork chosen where chosen.card_id=c.id and chosen.stage=1 and chosen.selected))))
  or exists(
    select 1 from public.nova_craft_art_options o
    join public.nova_cards c on c.id = o.card_id
    where o.storage_path = path
      and exists(select 1 from public.profiles p
        where p.id = c.owner_id and p.role in ('student', 'admin') and p.status = 'active')
      and (
        (c.owner_id = auth.uid() and (c.craft_art_choice is null or c.craft_art_choice = o.option_no))
        or (c.sharing and c.craft_art_choice = o.option_no)
      ));
$$;

create or replace function public.get_public_nova_card(requested_public_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c
  where c.public_id = requested_public_id and c.sharing and exists(
    select 1 from public.profiles p
    where p.id=c.owner_id and p.role in ('student', 'admin') and p.status='active'
  ) and (
    not exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
    or c.craft_slot is not null
    or exists(select 1 from public.nova_artwork a where a.card_id=c.id and a.stage=1 and a.selected)
  );
$$;

-- Oldest entry first, including an admin's own card. staffTest marks that row.
-- journey_entitled stays required. Position is still the place in the whole queue.
create or replace function public.nova_admin_craft_queue(max_items integer default 100) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  return coalesce((select jsonb_agg(item order by queue_position) from (
    select queue_position, jsonb_build_object(
      'position', queue_position,
      'queuedAt', craft_queued_at,
      'publicId', public_id,
      'serial', serial,
      'displayName', username,
      'form', form,
      'companionName', name,
      'species', species,
      'element', element,
      'traits', traits,
      'personality', personality,
      'status', status,
      'staffTest', staff_test,
      'choice', craft_art_choice,
      'optionPaths', option_paths
    ) as item
    from (
      select c.craft_queued_at, c.public_id, c.serial, c.username, c.craft_art_choice,
        coalesce(to_jsonb(p)->>'form', '') as form,
        (p.role = 'admin') as staff_test,
        k.name, k.species, k.element, k.personality,
        coalesce(k.spec->'traits', '[]'::jsonb) as traits,
        case
          when c.craft_art_choice is not null then 'chosen'
          when (select count(*) from public.nova_craft_art_options o where o.card_id = c.id) = 2
            then 'options_ready'
          else 'waiting_for_art' end as status,
        coalesce((
          select jsonb_agg(jsonb_build_object('option', o.option_no, 'path', o.storage_path)
            order by o.option_no)
          from public.nova_craft_art_options o where o.card_id = c.id
        ), '[]'::jsonb) as option_paths,
        row_number() over (
          order by c.craft_queued_at nulls last, c.created_at, c.id
        ) as queue_position
      from public.nova_cards c
      join public.profiles p on p.id = c.owner_id
        and p.role in ('student', 'admin') and p.status = 'active'
      join public.nova_card_candidates k on k.card_id = c.id and k.slot = c.craft_slot
      where c.craft_slot is not null
        and c.journey_entitled
    ) ranked
    order by queue_position
    limit greatest(1, least(coalesce(max_items, 100), 500))
  ) q), '[]'::jsonb);
end;
$$;

-- Same artist file. staffTest is the only new field. Email and account id stay out.
create or replace function public.nova_admin_craft_brief(requested_public_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare c public.nova_cards; p public.profiles; k public.nova_card_candidates; d public.nova_card_dna;
begin
  perform public.nova_require_admin();
  select * into c from public.nova_cards where public_id = requested_public_id;
  if c.id is null or c.craft_slot is null or not c.journey_entitled then
    raise exception 'This student is not in the craft queue' using errcode = '42501';
  end if;
  select * into p from public.profiles
    where id = c.owner_id and role in ('student', 'admin') and status = 'active';
  if p.id is null then raise exception 'This student is not in the craft queue' using errcode = '42501'; end if;
  select * into k from public.nova_card_candidates where card_id = c.id and slot = c.craft_slot;
  if k.card_id is null then raise exception 'This student is not in the craft queue' using errcode = '42501'; end if;
  select * into d from public.nova_card_dna where card_id = c.id and slot = c.craft_slot;
  return jsonb_build_object(
    'cardId', c.id,
    'publicId', c.public_id,
    'nickname', c.username,
    'form', coalesce(to_jsonb(p)->>'form', ''),
    'rarity', c.rarity,
    'submittedAt', c.craft_queued_at,
    'staffTest', p.role = 'admin',
    'answers', to_jsonb(c.answers),
    'traits', c.identity_spec->'traits',
    'companion', jsonb_build_object(
      'name', k.name,
      'species', k.species,
      'element', k.element,
      'personality', k.personality,
      'visual', jsonb_build_object(
        'canonical', k.spec->'visual'->'canonical',
        'personalisation', k.spec->'visual'->'personalisation'
      )
    ),
    'dna', jsonb_build_object(
      'genes', d.dna->'genes',
      'palette', d.dna->'palette',
      'identityLock', d.dna->'identityLock'
    ),
    'output', jsonb_build_object(
      'format', 'PNG',
      'aspect', '2:3 portrait',
      'minSize', '1024x1536',
      'background', 'plain',
      'framing', 'centred',
      'text', 'none'
    )
  );
end;
$$;

commit;

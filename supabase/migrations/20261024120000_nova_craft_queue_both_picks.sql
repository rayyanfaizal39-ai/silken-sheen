-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261023170000_nova_companion_journey_gate.sql.
--
-- nova_record_craft_choice (the pick before reveal) set craft_slot.
-- select_nova_origin (the pick after reveal) did not, so those students never
-- reached nova_admin_craft_queue. Both picks now set craft_slot the first time
-- a companion is confirmed, and craft_queued_at records that moment.
-- The queue still requires journey_entitled.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

alter table public.nova_cards
  add column craft_queued_at timestamptz;

-- A reveal pick already stored selected=true on the stage-1 artwork and left
-- craft_slot null. Put that companion into the queue.
update public.nova_cards c
set craft_slot = picked.candidate
from (
  select distinct on (a.card_id) a.card_id, a.candidate
  from public.nova_artwork a
  where a.stage = 1 and a.selected
  order by a.card_id, a.created_at desc
) picked
where c.id = picked.card_id and c.craft_slot is null;

-- When they entered the queue: the audit row for the pick, else the selected
-- artwork, else the card. Only rows that already have a companion.
update public.nova_cards c
set craft_queued_at = coalesce(
  (select min(a.created_at) from public.nova_generation_audit a
    where a.subject_id = c.id and a.action in ('craft_choice_recorded', 'origin_selected')),
  (select min(art.created_at) from public.nova_artwork art
    where art.card_id = c.id and art.stage = 1 and art.selected),
  c.created_at
)
where c.craft_slot is not null and c.craft_queued_at is null;

-- Pick before the portraits exist. The first confirmation starts the wait.
create or replace function public.nova_record_craft_choice(chosen_slot text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  if chosen_slot not in ('a', 'b') then raise exception 'Choose one of the two companions'; end if;
  select * into c from public.nova_cards where owner_id = u for update;
  if c.id is null then raise exception 'Summon your companions before choosing one'; end if;
  if exists(select 1 from public.nova_artwork a where a.card_id = c.id and a.stage = 1 and a.selected) then
    raise exception 'Your permanent Nova is already selected';
  end if;
  if not exists(select 1 from public.nova_card_candidates k where k.card_id = c.id and k.slot = chosen_slot) then
    raise exception 'Choose one of the two companions';
  end if;
  if c.craft_slot is not null and c.craft_slot is distinct from chosen_slot then
    raise exception 'Your companion choice is already saved';
  end if;
  update public.nova_cards
    set craft_slot = chosen_slot,
        craft_queued_at = coalesce(craft_queued_at, now())
    where id = c.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (u, 'craft_choice_recorded', c.id, jsonb_build_object('slot', chosen_slot, 'serial', c.serial));
  return jsonb_build_object('cardId', c.id, 'serial', c.serial, 'publicId', c.public_id, 'slot', chosen_slot);
end;
$$;

-- Pick after both portraits are revealed. The chosen artwork slot is the
-- companion staff draw. A repeat of the same pick fills craft_slot if the
-- older function left it empty, and does not restart the wait.
create or replace function public.select_nova_origin(chosen_candidate text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_active_student(); c public.nova_cards; chosen text;
begin
  select * into strict c from public.nova_cards where owner_id=u for update;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
  if chosen is not null then
    if chosen<>chosen_candidate then raise exception 'Your permanent Nova is already selected'; end if;
    if c.craft_slot is distinct from chosen or c.craft_queued_at is null then
      update public.nova_cards
        set craft_slot = chosen,
            craft_queued_at = coalesce(craft_queued_at, now())
        where id = c.id;
    end if;
    return public.get_my_nova_studio();
  end if;
  if not public.nova_origin_reveal_ready(c) then raise exception 'Your two Nova artworks are not ready to choose'; end if;
  if not exists(select 1 from public.nova_artwork
    where card_id=c.id and stage=1 and candidate=chosen_candidate
      and (review_status is null or review_status='approved')) then
    raise exception 'Choose one of the two Origin artworks'; end if;
  update public.nova_cards
    set variant=chosen_candidate,
        craft_slot=chosen_candidate,
        craft_queued_at=coalesce(craft_queued_at, now())
    where id=c.id;
  update public.nova_artwork set selected=true,released=true
    where card_id=c.id and stage=1 and candidate=chosen_candidate
      and (review_status is null or review_status='approved');
  insert into public.nova_generation_audit(actor_id,action,subject_id,detail)
    values(u,'origin_selected',c.id,jsonb_build_object('candidate',chosen_candidate));
  return public.get_my_nova_studio();
end;
$$;

-- Oldest entry first. Position is the place in the whole queue, not a tab.
-- journey_entitled stays required: a card without the paid grant is omitted.
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
      'choice', craft_art_choice,
      'optionPaths', option_paths
    ) as item
    from (
      select c.craft_queued_at, c.public_id, c.serial, c.username, c.craft_art_choice,
        coalesce(to_jsonb(p)->>'form', '') as form,
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
      join public.profiles p on p.id = c.owner_id and p.role = 'student' and p.status = 'active'
      join public.nova_card_candidates k on k.card_id = c.id and k.slot = c.craft_slot
      where c.craft_slot is not null
        and c.journey_entitled
    ) ranked
    order by queue_position
    limit greatest(1, least(coalesce(max_items, 100), 500))
  ) q), '[]'::jsonb);
end;
$$;

-- One artist file. The caller's admin role is checked inside the function.
-- The student's account id and email are not selected.
create function public.nova_admin_craft_brief(requested_public_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare c public.nova_cards; p public.profiles; k public.nova_card_candidates; d public.nova_card_dna;
begin
  perform public.nova_require_admin();
  select * into c from public.nova_cards where public_id = requested_public_id;
  if c.id is null or c.craft_slot is null or not c.journey_entitled then
    raise exception 'This student is not in the craft queue' using errcode = '42501';
  end if;
  select * into p from public.profiles
    where id = c.owner_id and role = 'student' and status = 'active';
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

revoke all on function public.nova_admin_craft_brief(uuid) from public, anon;
grant execute on function public.nova_admin_craft_brief(uuid) to authenticated;

commit;

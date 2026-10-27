-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261023150000_nova_public_card.sql.
--
-- Staff prepare exactly two portraits for the companion the student already
-- confirmed. The student picks one. That pick is the card artwork. Staff can
-- clear the pick so the student may choose again.
--
-- nova_card_candidates does not fit this. Those rows are the permanent
-- companion identities (slot a and slot b): immutable, no image columns, and
-- already used for the companion the student confirmed. Image files live here
-- instead, keyed by the card.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

create table public.nova_craft_art_options (
  card_id uuid not null references public.nova_cards(id) on delete cascade,
  option_no smallint not null check (option_no in (1, 2)),
  storage_path text not null unique,
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  primary key (card_id, option_no),
  unique (card_id, sha256)
);

alter table public.nova_craft_art_options enable row level security;
revoke all on public.nova_craft_art_options from public, anon, authenticated;
grant all on public.nova_craft_art_options to service_role;

alter table public.nova_cards
  add column craft_art_choice smallint check (craft_art_choice in (1, 2));

-- The earlier single-file upload is not the staff path once this migration is
-- applied. Both portraits are attached together.
create or replace function public.nova_admin_craft_artwork_path(card uuid, digest text) returns text
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  raise exception 'Upload both portraits with nova_admin_attach_craft_options';
end;
$$;

create or replace function public.nova_admin_attach_craft_artwork(card uuid, digest text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  raise exception 'Upload both portraits with nova_admin_attach_craft_options';
end;
$$;

create or replace function public.nova_admin_publish_craft_artwork(artwork uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  raise exception 'The student chooses one of the two portraits';
end;
$$;

-- Artist brief for one confirmed companion. No contact fields.
create or replace function public.nova_admin_craft_queue(max_items integer default 100) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  return coalesce((select jsonb_agg(item order by created_at) from (
    select c.created_at, jsonb_build_object(
      'publicId', c.public_id,
      'serial', c.serial,
      'displayName', c.username,
      'form', coalesce(to_jsonb(p)->>'form', ''),
      'companionName', k.name,
      'species', k.species,
      'element', k.element,
      'traits', coalesce(k.spec->'traits', '[]'::jsonb),
      'personality', k.personality,
      'status', case
        when c.craft_art_choice is not null then 'chosen'
        when (select count(*) from public.nova_craft_art_options o where o.card_id = c.id) = 2
          then 'options_ready'
        else 'waiting_for_art' end,
      'choice', c.craft_art_choice,
      'optionPaths', coalesce((
        select jsonb_agg(jsonb_build_object('option', o.option_no, 'path', o.storage_path)
          order by o.option_no)
        from public.nova_craft_art_options o where o.card_id = c.id
      ), '[]'::jsonb)
    ) as item
    from public.nova_cards c
    join public.profiles p on p.id = c.owner_id and p.role = 'student' and p.status = 'active'
    join public.nova_card_candidates k on k.card_id = c.id and k.slot = c.craft_slot
    where c.craft_slot is not null
    order by c.created_at
    limit greatest(1, least(coalesce(max_items, 100), 500))
  ) q), '[]'::jsonb);
end;
$$;

create function public.nova_admin_craft_option_paths(
  requested_public_id uuid, digest_one text, digest_two text
) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare c public.nova_cards; j uuid;
begin
  perform public.nova_require_admin();
  if digest_one is null or digest_one !~ '^[a-f0-9]{64}$'
    or digest_two is null or digest_two !~ '^[a-f0-9]{64}$' then
    raise exception 'A SHA-256 digest is required';
  end if;
  if digest_one = digest_two then
    raise exception 'The two portraits must be different';
  end if;
  select * into c from public.nova_cards where public_id = requested_public_id;
  if c.id is null or c.craft_slot is null then
    raise exception 'This student has not confirmed a companion';
  end if;
  if c.craft_art_choice is not null then
    raise exception 'Reset the student choice before replacing the portraits';
  end if;
  select id into j from public.nova_generation_jobs where card_id = c.id and stage = 1;
  if j is null then raise exception 'This card has no Origin job'; end if;
  return jsonb_build_object(
    'publicId', c.public_id,
    'option1', c.id::text || '/' || j::text || '/craft/1/' || digest_one || '.png',
    'option2', c.id::text || '/' || j::text || '/craft/2/' || digest_two || '.png'
  );
end;
$$;

-- Stores both portraits or neither. Keyed by the card public id.
create function public.nova_admin_attach_craft_options(
  requested_public_id uuid, digest_one text, digest_two text
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); c public.nova_cards; paths jsonb;
  path_one text; path_two text;
begin
  if digest_one = digest_two then
    raise exception 'The two portraits must be different';
  end if;
  select * into c from public.nova_cards where public_id = requested_public_id for update;
  if c.id is null or c.craft_slot is null then
    raise exception 'This student has not confirmed a companion';
  end if;
  if c.craft_art_choice is not null then
    raise exception 'Reset the student choice before replacing the portraits';
  end if;
  paths := public.nova_admin_craft_option_paths(requested_public_id, digest_one, digest_two);
  path_one := paths->>'option1';
  path_two := paths->>'option2';
  delete from public.nova_craft_art_options where card_id = c.id;
  insert into public.nova_craft_art_options(card_id, option_no, storage_path, sha256)
    values (c.id, 1, path_one, digest_one), (c.id, 2, path_two, digest_two);
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'craft_options_attached', c.id, jsonb_build_object(
      'publicId', c.public_id, 'serial', c.serial));
  return jsonb_build_object('publicId', c.public_id, 'serial', c.serial, 'status', 'options_ready');
end;
$$;

create function public.nova_choose_craft_art(chosen_option integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  if chosen_option not in (1, 2) then raise exception 'Choose one of the two portraits'; end if;
  select * into c from public.nova_cards where owner_id = u for update;
  if c.id is null or c.craft_slot is null then
    raise exception 'Your companion is being crafted';
  end if;
  if c.craft_art_choice is not null then
    raise exception 'Your art choice is already saved';
  end if;
  if (select count(*) from public.nova_craft_art_options o where o.card_id = c.id) <> 2
    or not exists(select 1 from public.nova_craft_art_options o
      where o.card_id = c.id and o.option_no = chosen_option) then
    raise exception 'Your companion is being crafted';
  end if;
  update public.nova_cards set craft_art_choice = chosen_option where id = c.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (u, 'craft_art_chosen', c.id, jsonb_build_object(
      'option', chosen_option, 'serial', c.serial, 'publicId', c.public_id));
  return public.get_my_nova_card();
end;
$$;

create function public.nova_admin_reset_craft_art(requested_public_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); c public.nova_cards;
begin
  select * into c from public.nova_cards where public_id = requested_public_id for update;
  if c.id is null then raise exception 'This student has not confirmed a companion'; end if;
  if c.craft_art_choice is null then
    raise exception 'This student has not chosen a portrait';
  end if;
  update public.nova_cards set craft_art_choice = null where id = c.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'craft_art_reset', c.id, jsonb_build_object(
      'serial', c.serial, 'publicId', c.public_id));
  return jsonb_build_object('publicId', c.public_id, 'serial', c.serial, 'status', 'options_ready');
end;
$$;

-- The chosen portrait is the card artwork. Until then the card is still being crafted.
-- Both option paths stay off this payload so a public page cannot list them.
create or replace function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,'serial',c.serial,'username',c.username,
    'traits',case when exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
      then null else public.nova_traits(c.answers) end,
    'variant',c.variant,'rarity',c.rarity,
    'stage',public.nova_visible_stage(c),'sharing',c.sharing,
    'artworkPath', coalesce(
      (select o.storage_path from public.nova_craft_art_options o
        where o.card_id = c.id and o.option_no = c.craft_art_choice),
      (select a.storage_path from public.nova_artwork a
        where a.card_id=c.id and a.stage=public.nova_visible_stage(c)
        and a.released and a.selected)),
    'crafting', c.craft_slot is not null and c.craft_art_choice is null
      and not exists(select 1 from public.nova_artwork a
        where a.card_id=c.id and a.stage=1 and a.selected and a.released
          and a.review_status='approved'),
    'companion',(select jsonb_build_object('archetypeId',k.archetype_id,'name',k.name,
        'species',k.species,'element',k.element,'personality',k.personality,
        'tagline',k.spec->'tagline','description',k.spec->'description',
        'traits',k.spec->'traits','abilities',k.spec->'abilities')
      from public.nova_card_candidates k
      where k.card_id=c.id and k.slot = coalesce(
        (select a.candidate from public.nova_artwork a
          where a.card_id=c.id and a.stage=1 and a.selected limit 1),
        c.craft_slot)));
$$;

-- The owner can see the two portraits. A public caller cannot.
create or replace function public.get_my_nova_card() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  select * into c from public.nova_cards where owner_id = u;
  if not found then return null; end if;
  return public.nova_card_payload(c) || jsonb_build_object(
    'artOptions', case when c.craft_art_choice is null then coalesce((
      select jsonb_agg(jsonb_build_object('option', o.option_no, 'path', o.storage_path)
        order by o.option_no)
      from public.nova_craft_art_options o where o.card_id = c.id
    ), '[]'::jsonb) else '[]'::jsonb end);
end;
$$;

revoke all on function public.nova_admin_craft_option_paths(uuid, text, text),
  public.nova_admin_attach_craft_options(uuid, text, text),
  public.nova_choose_craft_art(integer),
  public.nova_admin_reset_craft_art(uuid)
  from public, anon, authenticated;
grant execute on function public.nova_admin_craft_option_paths(uuid, text, text),
  public.nova_admin_attach_craft_options(uuid, text, text),
  public.nova_admin_reset_craft_art(uuid)
  to authenticated;
grant execute on function public.nova_choose_craft_art(integer) to authenticated;

commit;

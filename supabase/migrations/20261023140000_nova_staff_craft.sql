-- REVIEW ONLY. Do not apply to production or any remote project.
-- Staff craft queue for Cosmic Companion portraits.
--
-- Students are not sent to an image generator. A paid plan that includes the
-- cosmic_companion feature (Premium, RM59, includes it) already has to be active
-- when nova_submit_companions creates the one permanent card. After the student
-- confirms a companion, staff export this queue, make the portrait offline, upload
-- it, and approve it onto that same card. The serial and public id never change.
--
-- NOVA_AI_ENABLED, NOVA_AI_BATCH_ENABLED, nova_generation_settings and the batch
-- worker are untouched. This file removes nothing.
begin;

alter table public.nova_cards
  add column craft_slot text check (craft_slot in ('a', 'b'));

-- The student confirms which of the two matched companions to keep. Artwork is not
-- required. The card row, serial and public id already exist and stay as they are.
create function public.nova_record_craft_choice(chosen_slot text) returns jsonb
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
  update public.nova_cards set craft_slot = chosen_slot where id = c.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (u, 'craft_choice_recorded', c.id, jsonb_build_object('slot', chosen_slot, 'serial', c.serial));
  return jsonb_build_object('cardId', c.id, 'serial', c.serial, 'publicId', c.public_id, 'slot', chosen_slot);
end;
$$;

-- Everything staff need to draw the portrait offline. Student fields come from the
-- profile row when those columns exist. Admin check is inside the function.
create function public.nova_admin_craft_queue(max_items integer default 100) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  return coalesce((select jsonb_agg(item order by created_at) from (
    select c.created_at, jsonb_build_object(
      'cardId', c.id,
      'publicId', c.public_id,
      'serial', c.serial,
      'username', c.username,
      'studentName', coalesce(to_jsonb(p)->>'full_name', c.username),
      'form', to_jsonb(p)->>'form',
      'email', to_jsonb(p)->>'email',
      'answers', to_jsonb(c.answers),
      'slot', c.craft_slot,
      'companionName', k.name,
      'species', k.species,
      'element', k.element,
      'personality', k.personality,
      'status', case
        when exists(select 1 from public.nova_artwork a
          where a.card_id = c.id and a.stage = 1 and a.candidate = c.craft_slot
            and a.selected and a.released and a.review_status = 'approved') then 'approved'
        when exists(select 1 from public.nova_artwork a
          where a.card_id = c.id and a.stage = 1 and a.candidate = c.craft_slot
            and a.review_status = 'pending') then 'pending_review'
        else 'awaiting_art' end,
      'artworkId', (select a.id from public.nova_artwork a
        where a.card_id = c.id and a.stage = 1 and a.candidate = c.craft_slot
          and a.review_status = 'pending'
        order by a.created_at desc limit 1),
      'storagePath', (select a.storage_path from public.nova_artwork a
        where a.card_id = c.id and a.stage = 1 and a.candidate = c.craft_slot
          and a.review_status is distinct from 'rejected'
        order by a.created_at desc limit 1)
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

-- Where the staff file must be stored. Does not write the portrait.
create function public.nova_admin_craft_artwork_path(card uuid, digest text) returns text
language plpgsql stable security definer set search_path = '' as $$
declare c public.nova_cards; j uuid;
begin
  perform public.nova_require_admin();
  if digest is null or digest !~ '^[a-f0-9]{64}$' then raise exception 'A SHA-256 digest is required'; end if;
  select * into c from public.nova_cards where id = card;
  if c.id is null or c.craft_slot is null then raise exception 'This student has not confirmed a companion'; end if;
  select id into j from public.nova_generation_jobs where card_id = c.id and stage = 1;
  if j is null then raise exception 'This card has no Origin job'; end if;
  return c.id::text || '/' || j::text || '/' || c.craft_slot || '/' || digest || '.png';
end;
$$;

-- Attach a staff-made file that was already uploaded to nova-artwork at the path above.
-- A newer upload replaces a still-pending file. The serial is not touched.
create function public.nova_admin_attach_craft_artwork(card uuid, digest text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); c public.nova_cards; j uuid; path text; art uuid;
begin
  if digest is null or digest !~ '^[a-f0-9]{64}$' then raise exception 'A SHA-256 digest is required'; end if;
  select * into c from public.nova_cards where id = card for update;
  if c.id is null or c.craft_slot is null then raise exception 'This student has not confirmed a companion'; end if;
  select id into j from public.nova_generation_jobs where card_id = c.id and stage = 1;
  if j is null then raise exception 'This card has no Origin job'; end if;
  path := c.id::text || '/' || j::text || '/' || c.craft_slot || '/' || digest || '.png';
  update public.nova_artwork set review_status = 'rejected', reviewed_by = reviewer, reviewed_at = now(),
    review_note = 'Replaced by a newer staff upload'
    where card_id = c.id and stage = 1 and candidate = c.craft_slot and review_status = 'pending';
  insert into public.nova_artwork(card_id, job_id, stage, candidate, storage_path, sha256, validation_version, review_status)
    values (c.id, j, 1, c.craft_slot, path, digest, 'staff-png-v1', 'pending')
    returning id into art;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'craft_artwork_attached', art, jsonb_build_object('card', c.id, 'serial', c.serial, 'slot', c.craft_slot));
  return jsonb_build_object('artworkId', art, 'storagePath', path, 'serial', c.serial, 'status', 'pending_review');
end;
$$;

-- Approve the pending staff portrait onto the existing card. Serial stays the same.
create function public.nova_admin_publish_craft_artwork(artwork uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); a public.nova_artwork; serial text;
begin
  select * into a from public.nova_artwork where id = artwork for update;
  if a.id is null or a.review_status is distinct from 'pending' or a.validation_version is distinct from 'staff-png-v1' then
    raise exception 'Only a pending staff portrait can be approved';
  end if;
  if not exists(select 1 from public.nova_cards c where c.id = a.card_id and c.craft_slot = a.candidate) then
    raise exception 'This portrait does not match the companion the student confirmed';
  end if;
  if exists(select 1 from public.nova_artwork o
    where o.card_id = a.card_id and o.stage = 1 and o.selected and o.id <> a.id
      and o.validation_version is distinct from 'staff-png-v1') then
    raise exception 'This card already has a permanent portrait';
  end if;
  -- A newer staff portrait can take the place of an earlier staff portrait on the same card.
  perform set_config('nova.staff_craft_replace', 'on', true);
  update public.nova_artwork set selected = false, released = false, review_status = 'rejected',
    reviewed_by = reviewer, reviewed_at = now(), review_note = 'Replaced by a newer staff portrait'
    where card_id = a.card_id and stage = 1 and candidate = a.candidate and id <> a.id
      and selected and validation_version = 'staff-png-v1';
  update public.nova_artwork set review_status = 'approved', reviewed_by = reviewer, reviewed_at = now()
    where id = a.id;
  update public.nova_cards set variant = a.candidate where id = a.card_id returning nova_cards.serial into serial;
  update public.nova_artwork set selected = true, released = true where id = a.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'craft_artwork_approved', a.id, jsonb_build_object('card', a.card_id, 'serial', serial, 'slot', a.candidate));
  return jsonb_build_object('artworkId', a.id, 'serial', serial, 'status', 'approved');
end;
$$;

-- The owner's card can show the confirmed companion before a portrait exists.
-- Approved staff art uses the same selected + released slot the card already reads.
create or replace function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,'serial',c.serial,'username',c.username,
    'traits',case when exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
      then null else public.nova_traits(c.answers) end,
    'variant',c.variant,'rarity',c.rarity,
    'stage',public.nova_visible_stage(c),'sharing',c.sharing,
    'artworkPath',(select a.storage_path from public.nova_artwork a
      where a.card_id=c.id and a.stage=public.nova_visible_stage(c)
      and a.released and a.selected),
    'crafting', c.craft_slot is not null and not exists(select 1 from public.nova_artwork a
      where a.card_id=c.id and a.stage=1 and a.selected and a.released and a.review_status='approved'),
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

-- A pending staff portrait may sit beside the portrait already on the card.
-- Generated portraits keep a single live file per slot.
drop index public.nova_artwork_live_slot;
create unique index nova_artwork_live_slot on public.nova_artwork(card_id, stage, candidate)
  where review_status is distinct from 'rejected'
    and not (review_status = 'pending' and validation_version = 'staff-png-v1');
create unique index nova_artwork_one_staff_preview on public.nova_artwork(card_id, stage, candidate)
  where review_status = 'pending' and validation_version = 'staff-png-v1';

-- Staff may retire their own earlier portrait when publishing a replacement.
-- Every other artwork change stays permanent.
create or replace function public.nova_artwork_immutable() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP='DELETE' then
    if exists(select 1 from public.nova_cards where id=old.card_id) then raise exception 'Approved artwork is immutable'; end if;
    return old;
  end if;
  if current_setting('nova.staff_craft_replace', true) = 'on'
     and old.validation_version = 'staff-png-v1'
     and old.review_status = 'approved'
     and old.selected
     and new.review_status = 'rejected'
     and not new.selected
     and not new.released
     and new.reviewed_by is not null
     and new.reviewed_at is not null
     and new.storage_path = old.storage_path
     and new.card_id = old.card_id
     and new.stage = old.stage
     and new.candidate = old.candidate
     and new.sha256 is not distinct from old.sha256
     and new.validation_version is not distinct from old.validation_version
     and new.quality_checks is not distinct from old.quality_checks
     and new.phash is not distinct from old.phash then
    return new;
  end if;
  if new.storage_path<>old.storage_path or new.card_id<>old.card_id
    or new.stage<>old.stage or new.candidate<>old.candidate
    or new.sha256 is distinct from old.sha256 or (old.selected and not new.selected)
    or (old.released and not new.released)
    or new.quality_checks is distinct from old.quality_checks or new.phash is distinct from old.phash
    or new.validation_version is distinct from old.validation_version then
    raise exception 'Approved artwork is immutable';
  end if;
  if new.review_status is distinct from old.review_status then
    if old.review_status is distinct from 'pending' or new.review_status not in ('approved', 'rejected')
      or new.reviewed_by is null or new.reviewed_at is null then
      raise exception 'Artwork review decisions are final';
    end if;
  elsif new.reviewed_by is distinct from old.reviewed_by or new.reviewed_at is distinct from old.reviewed_at
    or new.review_note is distinct from old.review_note then
    raise exception 'Artwork review decisions are final';
  end if;
  if not old.selected and new.selected then
    if new.stage=1 and new.candidate is distinct from (select c.variant from public.nova_cards c where c.id=new.card_id) then
      raise exception 'Selected artwork must match the permanent card variant';
    end if;
    if exists(select 1 from public.nova_card_candidates k where k.card_id=new.card_id)
      and new.review_status is distinct from 'approved' then
      raise exception 'Only approved artwork can be chosen';
    end if;
  end if;
  return new;
end;
$$;

-- A confirmed companion is the student's choice even before a portrait exists.
-- `ready` is unchanged: it still means both approved portraits and the reveal wait.
create or replace function public.get_my_nova_studio() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_active_student(); c public.nova_cards; d public.nova_studio_drafts;
  j public.nova_generation_jobs; chosen text; ready boolean=false; matched boolean=false;
begin
  select * into d from public.nova_studio_drafts where owner_id=u;
  select * into c from public.nova_cards where owner_id=u;
  select * into j from public.nova_generation_jobs where card_id=c.id and stage=1;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
  if chosen is null and c.id is not null then chosen := c.craft_slot; end if;
  if c.id is not null then
    ready=public.nova_origin_reveal_ready(c);
    matched=exists(select 1 from public.nova_card_candidates where card_id=c.id);
  end if;
  return jsonb_build_object('active',public.nova_subscription_active(u),
    'enabled',(select enabled and batch_enabled from public.nova_generation_settings where singleton),
    'draft',jsonb_build_object('answers',coalesce(d.answers,'{}'),'username',coalesce(d.username,''),'revision',coalesce(d.revision,0)),
    'publicId',c.public_id,'identity',c.identity_spec,'selected',chosen,
    'origin',case when j.id is null then null else jsonb_build_object('status',j.status,
      'revealAfter',j.reveal_after,'ready',ready,'errorCode',j.error_code,
      'completed',(select count(*) from public.nova_generation_candidates where job_id=j.id and status='ready'),
      'approved',(select count(distinct a.candidate) from public.nova_artwork a where a.job_id=j.id and a.review_status='approved'),
      'inReview',(select count(distinct a.candidate) from public.nova_artwork a where a.job_id=j.id and a.review_status='pending')) end,
    'candidates',case when ready and chosen is null then (select jsonb_agg(jsonb_build_object(
      'candidate',a.candidate,'path',a.storage_path) order by a.candidate)
      from public.nova_artwork a where a.job_id=j.id
        and (a.review_status is null or a.review_status='approved')) else '[]'::jsonb end,
    'kind',case when c.id is null then null when matched then 'cosmic-companion' else 'legacy' end,
    'companions',case when matched and ready and chosen is null then (select jsonb_agg(k.spec order by k.slot)
      from public.nova_card_candidates k where k.card_id=c.id) else '[]'::jsonb end,
    'companion',case when matched and chosen is not null then (select public.nova_chosen_companion_view(k.spec)
      from public.nova_card_candidates k where k.card_id=c.id and k.slot=chosen) else null end);
end;
$$;

revoke all on function public.nova_record_craft_choice(text),
  public.nova_admin_craft_queue(integer), public.nova_admin_craft_artwork_path(uuid, text),
  public.nova_admin_attach_craft_artwork(uuid, text), public.nova_admin_publish_craft_artwork(uuid)
  from public, anon, authenticated;
grant execute on function public.nova_record_craft_choice(text) to authenticated;
grant execute on function public.nova_admin_craft_queue(integer),
  public.nova_admin_craft_artwork_path(uuid, text),
  public.nova_admin_attach_craft_artwork(uuid, text),
  public.nova_admin_publish_craft_artwork(uuid)
  to authenticated;

commit;

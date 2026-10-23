-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261023160000_nova_craft_art_options.sql.
--
-- The Cosmic Companion generator can be started once, and only while the
-- existing cosmic_companion entitlement is active. Completing that journey
-- records the grant on the card. The staff artwork queue requires that grant
-- plus the finished journey. A card row by itself is not enough.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

alter table public.nova_cards
  add column journey_entitled boolean not null default false;

-- Rows that already exist were inserted by nova_submit_companions, which
-- refused the insert unless nova_subscription_active passed. Keep those
-- students in the artwork queue. New rows stay false unless that same
-- check passes again inside the function below.
update public.nova_cards set journey_entitled = true;

-- Starting the 12-question journey. A finished card cannot be started again.
-- Viewing or finishing an already accepted journey does not call this.
create function public.nova_begin_companion_journey() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student();
begin
  if exists(select 1 from public.nova_cards where owner_id = u) then
    raise exception 'Your companion journey is already complete' using errcode = '42501';
  end if;
  if not public.nova_subscription_active(u) then
    raise exception 'An eligible learning plan is required to begin your companion journey' using errcode = '42501';
  end if;
  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.nova_begin_companion_journey() from public, anon;
grant execute on function public.nova_begin_companion_journey() to authenticated;

-- Saving answers is the start of the generator. A completed card stays locked.
-- An inactive cosmic_companion entitlement cannot open a new draft.
create or replace function public.save_nova_studio_draft(
  questionnaire integer[], display_username text, expected_revision integer
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid = public.nova_require_active_student(); d public.nova_studio_drafts;
begin
  if exists(select 1 from public.nova_cards where owner_id = u) then
    raise exception 'Identity is already saved';
  end if;
  if not public.nova_subscription_active(u) then
    raise exception 'An eligible learning plan is required to begin your companion journey' using errcode = '42501';
  end if;
  insert into public.nova_studio_drafts(owner_id) values (u) on conflict do nothing;
  select * into strict d from public.nova_studio_drafts where owner_id = u for update;
  if expected_revision is distinct from d.revision then
    raise exception 'Your answers changed on another device. Refresh to continue.';
  end if;
  update public.nova_studio_drafts set answers = questionnaire, username = display_username,
    revision = revision + 1, updated_at = now() where owner_id = u returning * into d;
  return jsonb_build_object('answers', d.answers, 'username', d.username, 'revision', d.revision);
end;
$$;

-- Same one-card rule as before. The new row is marked journey_entitled only
-- because nova_subscription_active passed in this transaction.
create or replace function public.nova_submit_companions(
  student uuid, questionnaire integer[], match jsonb, dna jsonb
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards; d public.nova_studio_drafts; j uuid;
begin
  if student is null then raise exception 'A student is required' using errcode = '22004'; end if;
  perform 1 from auth.users where id = student for update;
  if not found then raise exception 'An active student account is required' using errcode = '42501'; end if;
  if not exists(select 1 from public.profiles p
    where p.id = student and p.role = 'student' and p.status = 'active') then
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
  insert into public.nova_cards(owner_id, username, answers, variant, journey_entitled)
    values (student, d.username, d.answers, 'a', true) returning * into c;
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
      'feature', 'cosmic_companion'));
  return jsonb_build_object('status', 'created', 'cardId', c.id, 'journeyEntitled', true);
end;
$$;

-- Staff see a student only after a paid journey was finished and a companion
-- was confirmed. journey_entitled is the payment grant from that completion.
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
      and c.journey_entitled
    order by c.created_at
    limit greatest(1, least(coalesce(max_items, 100), 500))
  ) q), '[]'::jsonb);
end;
$$;

commit;

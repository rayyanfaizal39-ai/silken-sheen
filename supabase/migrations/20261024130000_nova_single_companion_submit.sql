-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261024120100_nova_artwork_bucket_limits.sql.
--
-- Each student receives one companion: the preference match (slot a).
-- Submitting the twelve answers puts that companion in the staff queue
-- immediately. A card that already has craft_slot is left as it is.
-- Candidate b may still be stored. The student does not choose between them,
-- and stage-1 reveal portraits are not required.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

-- Finished journeys that never confirmed a slot take the preference companion.
-- Queue time is the original submit. Cards already queued keep their slot and time.
update public.nova_cards c
set craft_slot = 'a',
    craft_queued_at = coalesce(c.craft_queued_at, c.created_at)
where c.craft_slot is null
  and c.journey_entitled
  and exists (
    select 1 from public.nova_card_candidates k
    where k.card_id = c.id and k.slot = 'a'
  );

-- Same one-card and entitlement checks. The new row enters the craft queue
-- as the preference companion. A repeat submit returns the existing card
-- and does not move its place in the queue.
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

commit;

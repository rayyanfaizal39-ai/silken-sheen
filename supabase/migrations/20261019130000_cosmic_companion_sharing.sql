-- REVIEW ONLY. Do not apply to production without approval. Apply AFTER 20261019120000.
-- Cosmic Companion Phase 3: sharing, QR and export for matched cards.
--
-- * A matched card never shares its answer-derived traits (they map the student's 12 answers
--   and, for Companion B, would even name a different creature). It shares only the public
--   summary of the companion the student chose.
-- * A matched card has nothing to show publicly until a companion is chosen.
-- * After the choice, the student's own view of their companion no longer names the other
--   candidate.
-- * Legacy cards are unchanged: same payload, same public visibility.
begin;

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
    'companion',(select jsonb_build_object('archetypeId',k.archetype_id,'name',k.name,
        'species',k.species,'element',k.element,'personality',k.personality,
        'tagline',k.spec->'tagline','description',k.spec->'description',
        'traits',k.spec->'traits','abilities',k.spec->'abilities')
      from public.nova_card_candidates k join public.nova_artwork a
        on a.card_id=k.card_id and a.stage=1 and a.selected and a.candidate=k.slot
      where k.card_id=c.id));
$$;

create or replace function public.get_public_nova_card(requested_public_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c
  where c.public_id = requested_public_id and c.sharing and exists(
    select 1 from public.profiles p
    where p.id=c.owner_id and p.role='student' and p.status='active'
  ) and (
    not exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
    or exists(select 1 from public.nova_artwork a where a.card_id=c.id and a.stage=1 and a.selected)
  );
$$;

-- After the permanent choice the student sees only their companion. The kindred companion's
-- explanation compares it with the other candidate by name ("a different kind of companion
-- from …"), which only makes sense at the reveal, so that reason is left out of the chosen
-- companion delivered here. The stored specification itself is unchanged.
create function public.nova_chosen_companion_view(spec jsonb) returns jsonb
language sql immutable set search_path = '' as $$
  select spec || jsonb_build_object('match', (spec->'match') || jsonb_build_object('reasons',
    coalesce((select jsonb_agg(r order by i) from jsonb_array_elements(spec->'match'->'reasons')
      with ordinality as x(r, i) where r->>'basis' is distinct from 'difference'), '[]'::jsonb)));
$$;

create or replace function public.get_my_nova_studio() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_active_student(); c public.nova_cards; d public.nova_studio_drafts;
  j public.nova_generation_jobs; chosen text; ready boolean=false; matched boolean=false;
begin
  select * into d from public.nova_studio_drafts where owner_id=u;
  select * into c from public.nova_cards where owner_id=u;
  select * into j from public.nova_generation_jobs where card_id=c.id and stage=1;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
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
      'completed',(select count(*) from public.nova_generation_candidates where job_id=j.id and status='ready')) end,
    'candidates',case when ready and chosen is null then (select jsonb_agg(jsonb_build_object(
      'candidate',a.candidate,'path',a.storage_path) order by a.candidate)
      from public.nova_artwork a where a.job_id=j.id) else '[]'::jsonb end,
    'kind',case when c.id is null then null when matched then 'cosmic-companion' else 'legacy' end,
    'companions',case when matched and ready and chosen is null then (select jsonb_agg(k.spec order by k.slot)
      from public.nova_card_candidates k where k.card_id=c.id) else '[]'::jsonb end,
    'companion',case when matched and chosen is not null then (select public.nova_chosen_companion_view(k.spec)
      from public.nova_card_candidates k where k.card_id=c.id and k.slot=chosen) else null end);
end;
$$;

revoke all on function public.nova_card_payload(public.nova_cards),
  public.get_public_nova_card(uuid), public.get_my_nova_studio(),
  public.nova_chosen_companion_view(jsonb) from public, anon, authenticated;
grant execute on function public.get_public_nova_card(uuid) to anon, authenticated;
grant execute on function public.get_my_nova_studio() to authenticated;

commit;

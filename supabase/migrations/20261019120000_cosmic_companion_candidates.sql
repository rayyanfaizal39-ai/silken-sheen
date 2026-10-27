-- REVIEW ONLY. Do not apply to production without approval. Apply AFTER 20261018160200.
-- Cosmic Companion Phase 2A: two independent, immutable companion candidates per card.
--
-- * Matching runs only in the trusted app server (cc-matcher-v1, shared TypeScript). SQL never
--   re-implements scoring: it validates structure, versions and the answer binding.
-- * Students can never write candidates: the table has no learner grants and the only writer
--   is a service-role function.
-- * Submission no longer depends on AI generation. Reveal still needs 24 hours AND two ready
--   artworks; companion cards are skipped by the artwork worker until Phase 4 prompts exist.
-- * Existing cards, jobs and artwork are not modified. Cards without candidates stay "legacy".
-- * A validly submitted journey can finish (reveal and choose) after a subscription lapses.
-- * Legacy cards missing a job can be repaired only through an explicit, audited service call.
-- * Roll out in order: this migration, then the app server, then the submission flag.
--   See docs/cosmic-companion-phase2a.md ("Rollout").
begin;

-- Answer binding, identical to the matcher's inputFingerprint:
-- sha256(canonical JSON {"answers":[...],"catalogueVersion":"...","matcherVersion":"..."}).
create function public.nova_match_input_fingerprint(a integer[], matcher text, catalogue text)
returns text language sql immutable set search_path = '' as $$
  select encode(sha256(convert_to(
    '{"answers":[' || array_to_string(a, ',') || '],"catalogueVersion":' || to_json(catalogue)::text
      || ',"matcherVersion":' || to_json(matcher)::text || '}', 'UTF8')), 'hex');
$$;

create table public.nova_card_candidates (
  card_id uuid not null references public.nova_cards(id) on delete cascade,
  slot text not null check (slot in ('a', 'b')),
  spec jsonb not null check (jsonb_typeof(spec) = 'object' and length(spec::text) <= 32768),
  candidate_id text generated always as (spec->>'candidateId') stored,
  archetype_id text generated always as (spec->>'archetypeId') stored,
  name text generated always as (spec->>'name') stored,
  species text generated always as (spec->>'species') stored,
  element text generated always as (spec->>'element') stored,
  personality text generated always as (spec->>'personality') stored,
  matcher_version text generated always as (spec->>'matcherVersion') stored,
  catalogue_version text generated always as (spec->>'catalogueVersion') stored,
  fingerprint text generated always as (spec->>'fingerprint') stored,
  input_fingerprint text generated always as (spec->>'inputFingerprint') stored,
  created_at timestamptz not null default now(),
  primary key (card_id, slot),
  -- Candidate IDs are content IDs: students with identical answers share them, so they are
  -- unique per card, not globally.
  unique (card_id, candidate_id),
  check (spec->>'schema' = 'cosmic-companion-candidate/1'),
  check (spec->>'slot' = slot),
  check (spec->>'kind' = case slot when 'a' then 'preference' else 'kindred' end),
  check (matcher_version = 'cc-matcher-v1' and catalogue_version = 'cc-catalogue-v1'),
  check (fingerprint ~ '^[0-9a-f]{64}$' and input_fingerprint ~ '^[0-9a-f]{64}$'),
  check (candidate_id = 'cc1-' || slot || '-' || left(fingerprint, 20)),
  check (archetype_id ~ '^[a-z][a-z0-9-]{1,39}$' and name ~ '^[A-Za-z][A-Za-z -]{0,23}$'),
  check (species in ('Phoenix', 'Magical Fox', 'Dragon', 'Lion', 'Unicorn')),
  check (element in ('Fire', 'Water', 'Starlight', 'Wind')),
  check (personality in ('Explorer', 'Nurturer', 'Strategist', 'Guardian')),
  check (jsonb_typeof(spec->'match') = 'object' and jsonb_typeof(spec->'visual') = 'object')
);

-- Every companion card holds exactly two distinct candidates from one match. Deferred so the
-- submission function can insert both before the check runs at commit.
create function public.nova_check_candidate_pair() returns trigger
language plpgsql set search_path = '' as $$
declare a public.nova_card_candidates; b public.nova_card_candidates; n integer;
begin
  select count(*) into n from public.nova_card_candidates where card_id = new.card_id;
  select * into a from public.nova_card_candidates where card_id = new.card_id and slot = 'a';
  select * into b from public.nova_card_candidates where card_id = new.card_id and slot = 'b';
  if n <> 2 or a.archetype_id = b.archetype_id or a.species = b.species or a.element = b.element
    or a.input_fingerprint <> b.input_fingerprint or a.matcher_version <> b.matcher_version
    or a.catalogue_version <> b.catalogue_version then
    raise exception 'A companion card needs two distinct candidates from one match' using errcode = '23514';
  end if;
  return null;
end;
$$;
create constraint trigger nova_candidate_pair after insert on public.nova_card_candidates
  deferrable initially deferred for each row execute function public.nova_check_candidate_pair();

-- Candidates are permanent. They disappear only with their card (account deletion).
create function public.nova_candidates_immutable() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP = 'DELETE' then
    if exists(select 1 from public.nova_cards where id = old.card_id) then
      raise exception 'Companion candidates are permanent';
    end if;
    return old;
  end if;
  raise exception 'Companion candidates are permanent';
end;
$$;
create trigger nova_candidates_preserved before update or delete on public.nova_card_candidates
  for each row execute function public.nova_candidates_immutable();

alter table public.nova_card_candidates enable row level security;
revoke all on public.nova_card_candidates from public, anon, authenticated;
grant all on public.nova_card_candidates to service_role;

-- Structure, version and answer-binding checks for a match produced by the trusted server.
create function public.nova_validate_match(match jsonb, answers integer[]) returns void
language plpgsql immutable set search_path = '' as $$
declare expected text;
begin
  if jsonb_typeof(match) is distinct from 'object'
    or match->>'matcherVersion' is distinct from 'cc-matcher-v1'
    or match->>'catalogueVersion' is distinct from 'cc-catalogue-v1'
    or jsonb_typeof(match->'candidates') is distinct from 'array'
    or jsonb_array_length(match->'candidates') <> 2
    or match->'candidates'->0->>'slot' is distinct from 'a'
    or match->'candidates'->1->>'slot' is distinct from 'b' then
    raise exception 'Invalid companion match' using errcode = '22023';
  end if;
  expected = public.nova_match_input_fingerprint(answers, 'cc-matcher-v1', 'cc-catalogue-v1');
  if match->>'inputFingerprint' is distinct from expected
    or match->'candidates'->0->>'inputFingerprint' is distinct from expected
    or match->'candidates'->1->>'inputFingerprint' is distinct from expected then
    raise exception 'Companion match does not belong to these answers' using errcode = '22023';
  end if;
end;
$$;

-- The only way candidates are created. Service role only: the app server calls it after
-- verifying the signed-in student and running the shared matcher on the SAVED draft answers.
-- Atomic (one transaction) and idempotent: an existing card is returned, never re-matched.
create function public.nova_submit_companions(student uuid, questionnaire integer[], match jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards; d public.nova_studio_drafts; j uuid;
begin
  if student is null then raise exception 'A student is required' using errcode = '22004'; end if;
  -- Serialize every submission for this account across devices and server instances.
  perform 1 from auth.users where id = student for update;
  if not found then raise exception 'An active student account is required' using errcode = '42501'; end if;
  if not exists(select 1 from public.profiles p
    where p.id = student and p.role = 'student' and p.status = 'active') then
    raise exception 'An active student account is required' using errcode = '42501';
  end if;
  select * into c from public.nova_cards where owner_id = student for update;
  if c.id is not null then
    -- Already submitted (companion or legacy card): return it untouched, never re-match.
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
  insert into public.nova_cards(owner_id, username, answers, variant)
    values (student, d.username, d.answers, 'a') returning * into c;
  insert into public.nova_card_candidates(card_id, slot, spec)
    select c.id, x->>'slot', x from jsonb_array_elements(match->'candidates') x;
  -- Server-authoritative reveal: 24 hours after this successful submission. Artwork is a
  -- separate, optional process; the job only records timing and readiness.
  insert into public.nova_generation_jobs(card_id, stage, prompt_version, identity_snapshot, reveal_after)
    values (c.id, 1, 'cosmic-companion-art-pending', c.identity_spec, now() + interval '24 hours')
    returning id into j;
  insert into public.nova_generation_candidates(job_id, candidate) values (j, 'a'), (j, 'b');
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (student, 'companions_matched', c.id, jsonb_build_object(
      'matcherVersion', match->>'matcherVersion', 'catalogueVersion', match->>'catalogueVersion',
      'candidates', jsonb_build_array(match->'candidates'->0->>'candidateId', match->'candidates'->1->>'candidateId')));
  return jsonb_build_object('status', 'created', 'cardId', c.id);
end;
$$;

-- The learner submission RPC would create a card with no candidates. Fail closed.
create or replace function public.submit_nova_origin() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid = public.nova_require_active_student();
begin
  raise exception 'Submit through the Cosmic Companion server' using errcode = '0A000';
end;
$$;

-- Studio state. Candidate identities stay hidden until the reveal; after the permanent choice
-- only the chosen companion is returned, with or without an active subscription.
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
    'companion',case when matched and chosen is not null then (select k.spec
      from public.nova_card_candidates k where k.card_id=c.id and k.slot=chosen) else null end);
end;
$$;

-- Sharing, QR and export payload: unchanged fields plus a public summary of the chosen
-- companion. Match explanations quote the student's answers and are never shared.
create or replace function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,'serial',c.serial,'username',c.username,
    'traits',public.nova_traits(c.answers),'variant',c.variant,'rarity',c.rarity,
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

-- Companion cards need per-candidate prompts (Phase 4). Until then the worker must never send
-- them through the single-identity prompt, which would draw one identity twice.
create or replace function public.nova_prepare_batch() returns uuid
language plpgsql security definer set search_path = '' as $$
declare s public.nova_generation_settings; r record; bid uuid; ep text; mdl text; spent bigint; month date;
begin
  select * into strict s from public.nova_generation_settings where singleton for update;
  if not s.enabled or not s.batch_enabled then return null; end if;
  if (select count(*) from public.nova_generation_batches where status<>'completed')>=s.max_batches then return null; end if;
  month=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur')::date;
  select coalesce(sum(reserved_microusd),0) into spent from public.nova_batch_requests where budget_month=month;
  for r in select p.*,j.stage,j.card_id from public.nova_generation_candidates p
    join public.nova_generation_jobs j on j.id=p.job_id join public.nova_cards c on c.id=j.card_id
    where p.status='pending' and p.attempts<2 and p.retry_after<=now()
      and j.stage=1 and public.nova_subscription_active(c.owner_id)
      and not exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
    order by p.retry_after,p.id limit s.max_batch_requests for update of p skip locked loop
    if spent+s.reserve_microusd>s.monthly_cap_microusd then exit; end if;
    if bid is null then
      ep=case when r.stage=1 then '/v1/images/generations' else '/v1/images/edits' end;
      mdl=case when r.stage=1 then s.origin_model else s.edit_model end;
      insert into public.nova_generation_batches(model,endpoint,quality) values(mdl,ep,s.quality) returning id into bid;
    end if;
    if (r.stage=1)<>(ep='/v1/images/generations') then continue; end if;
    insert into public.nova_batch_requests(batch_id,candidate_id,custom_id,attempt,reserved_microusd,budget_month)
      values(bid,r.id,'nova_'||replace(gen_random_uuid()::text,'-',''),r.attempts+1,s.reserve_microusd,month);
    update public.nova_generation_candidates set status='assigned',attempts=attempts+1,error_code=null where id=r.id;
    update public.nova_generation_jobs set status='running',error_code=null,updated_at=now() where id=r.job_id;
    spent=spent+s.reserve_microusd;
  end loop;
  if bid is not null then insert into public.nova_generation_audit(action,subject_id) values('batch_reserved',bid); end if;
  return bid;
end;
$$;

create or replace function public.nova_begin_submission(batch uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.nova_generation_settings where singleton and enabled and batch_enabled)
    or exists(select 1 from public.nova_batch_requests r
      join public.nova_generation_candidates p on p.id=r.candidate_id
      join public.nova_generation_jobs j on j.id=p.job_id
      join public.nova_cards c on c.id=j.card_id
      where r.batch_id=batch and (j.stage<>1 or not public.nova_subscription_active(c.owner_id)
        or exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)))
      then return false; end if;
  update public.nova_generation_batches set status='submitting',updated_at=now() where id=batch and status='prepared';
  return found;
end;
$$;

-- A validly submitted journey can always finish: the reveal and the permanent choice no
-- longer require an active subscription (submission still does). Applies to legacy cards too.
-- Readiness itself is unchanged: 24 hours (or the legacy reveal time) and two validated artworks.
create or replace function public.nova_origin_reveal_ready(c public.nova_cards) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.nova_generation_jobs j where j.card_id=c.id and j.stage=1
      and j.status='ready' and now()>=j.reveal_after
      and (select count(distinct a.sha256) from public.nova_artwork a
        where a.job_id=j.id and a.validation_version='png-v1')=2);
$$;

-- Explicit, audited repair for a legacy card that has no Origin job (only possible from early
-- previews). It queues the card's OWN permanent identity; it never re-matches, never touches
-- companion cards and never deletes anything. Service role only; idempotent.
create function public.nova_admin_repair_legacy_job(card_uuid uuid, reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare c public.nova_cards; j uuid;
begin
  if reason is null or length(trim(reason)) < 12 then
    raise exception 'An audit reason is required';
  end if;
  select * into c from public.nova_cards where id = card_uuid for update;
  if c.id is null then raise exception 'Card not found'; end if;
  if exists(select 1 from public.nova_card_candidates where card_id = c.id) then
    raise exception 'Companion cards are never repaired as legacy cards';
  end if;
  if exists(select 1 from public.nova_artwork where card_id = c.id and stage = 1 and selected) then
    raise exception 'This card already has a permanent artwork';
  end if;
  select id into j from public.nova_generation_jobs where card_id = c.id and stage = 1;
  if j is not null then return j; end if;
  insert into public.nova_generation_jobs(card_id, stage, prompt_version, identity_snapshot, reveal_after)
    values (c.id, 1, 'nova-art-v1', c.identity_spec, now() + interval '24 hours') returning id into j;
  insert into public.nova_generation_candidates(job_id, candidate) values (j, 'a'), (j, 'b');
  insert into public.nova_generation_audit(action, subject_id, detail)
    values ('legacy_job_repaired', c.id, jsonb_build_object('job', j, 'reason', reason));
  return j;
end;
$$;

-- New functions are internal unless granted below. Re-assert grants on replaced functions.
revoke all on function public.nova_match_input_fingerprint(integer[],text,text),
  public.nova_check_candidate_pair(), public.nova_candidates_immutable(),
  public.nova_validate_match(jsonb,integer[]), public.nova_submit_companions(uuid,integer[],jsonb)
  from public, anon, authenticated;
grant execute on function public.nova_submit_companions(uuid,integer[],jsonb) to service_role;
revoke all on function public.nova_admin_repair_legacy_job(uuid,text),
  public.nova_origin_reveal_ready(public.nova_cards) from public, anon, authenticated;
grant execute on function public.nova_admin_repair_legacy_job(uuid,text) to service_role;
revoke all on function public.submit_nova_origin(), public.get_my_nova_studio(),
  public.nova_card_payload(public.nova_cards), public.nova_prepare_batch(),
  public.nova_begin_submission(uuid) from public, anon, authenticated;
grant execute on function public.submit_nova_origin(), public.get_my_nova_studio() to authenticated;
grant execute on function public.nova_prepare_batch(), public.nova_begin_submission(uuid) to service_role;

commit;

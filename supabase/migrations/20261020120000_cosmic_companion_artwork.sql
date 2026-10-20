-- REVIEW ONLY. Do not apply to production without approval. Apply AFTER 20261019130000.
-- Cosmic Companion Phase 4C: unique AI artwork for both candidates, with human review.
--
-- * Visual DNA: one immutable record per candidate, stored atomically with the match at
--   submission by the trusted server (cc-dna-v1, HMAC-chosen genes; never computed in SQL).
-- * Artwork review: companion artwork enters `pending`; only an active admin can approve or
--   reject it, once. The reveal needs 24 hours AND both candidates' artwork approved. Pending
--   or rejected images are never readable by students.
-- * Generation stays OFF: a separate `companion_enabled` switch (default false), a daily cap
--   (default 0) and the existing monthly cap (default 0). Batch and reservation limits become
--   configurable, but their defaults are unchanged.
-- * Legacy cards keep their prompt, validation and reveal rules.
begin;

-- ── Visual DNA ───────────────────────────────────────────────────────────────────────────
create table public.nova_card_dna (
  card_id uuid not null,
  slot text not null check (slot in ('a', 'b')),
  dna jsonb not null check (jsonb_typeof(dna) = 'object' and length(dna::text) <= 16384),
  dna_version text generated always as (dna->>'dnaVersion') stored,
  fingerprint text generated always as (dna->>'fingerprint') stored,
  variation_id text generated always as (dna->>'variationId') stored,
  candidate_id text generated always as (dna->>'candidateId') stored,
  created_at timestamptz not null default now(),
  primary key (card_id, slot),
  foreign key (card_id, slot) references public.nova_card_candidates(card_id, slot) on delete cascade,
  check (dna->>'schema' = 'cosmic-companion-dna/1' and dna_version = 'cc-dna-v1'
    and dna->>'genePoolVersion' = 'cc-genes-v1' and dna->>'styleVersion' = 'cc-style-v1'),
  check (dna->>'slot' = slot),
  check (fingerprint ~ '^[0-9a-f]{64}$' and variation_id ~ '^[0-9a-f]{24}$')
);

-- The DNA must describe exactly the stored candidate it belongs to.
create function public.nova_check_dna_candidate() returns trigger
language plpgsql set search_path = '' as $$
declare k public.nova_card_candidates;
begin
  select * into k from public.nova_card_candidates where card_id = new.card_id and slot = new.slot;
  if k.card_id is null
    or new.dna->>'candidateId' is distinct from k.candidate_id
    or new.dna->>'candidateFingerprint' is distinct from k.fingerprint
    or new.dna->>'archetypeId' is distinct from k.archetype_id
    or new.dna->>'species' is distinct from k.species
    or new.dna->>'element' is distinct from k.element
    or new.dna->>'personality' is distinct from k.personality then
    raise exception 'Visual DNA does not match its candidate' using errcode = '23514';
  end if;
  return new;
end;
$$;
create trigger nova_dna_matches_candidate before insert on public.nova_card_dna
  for each row execute function public.nova_check_dna_candidate();

-- Both candidates always carry DNA, with different variations.
create function public.nova_check_dna_pair() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (select count(*) from public.nova_card_dna where card_id = new.card_id) <> 2
    or (select count(distinct variation_id) from public.nova_card_dna where card_id = new.card_id) <> 2 then
    raise exception 'A companion card needs Visual DNA for both candidates' using errcode = '23514';
  end if;
  return null;
end;
$$;
create constraint trigger nova_dna_pair after insert on public.nova_card_dna
  deferrable initially deferred for each row execute function public.nova_check_dna_pair();

create function public.nova_dna_immutable() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP = 'DELETE' then
    if exists(select 1 from public.nova_cards where id = old.card_id) then
      raise exception 'Visual DNA is permanent';
    end if;
    return old;
  end if;
  raise exception 'Visual DNA is permanent';
end;
$$;
create trigger nova_dna_preserved before update or delete on public.nova_card_dna
  for each row execute function public.nova_dna_immutable();

alter table public.nova_card_dna enable row level security;
revoke all on public.nova_card_dna from public, anon, authenticated;
grant all on public.nova_card_dna to service_role;

-- ── Submission: match + DNA in one transaction ───────────────────────────────────────────
drop function public.nova_submit_companions(uuid, integer[], jsonb);
create function public.nova_submit_companions(student uuid, questionnaire integer[], match jsonb, dna jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
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
  insert into public.nova_cards(owner_id, username, answers, variant)
    values (student, d.username, d.answers, 'a') returning * into c;
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
      'candidates', jsonb_build_array(match->'candidates'->0->>'candidateId', match->'candidates'->1->>'candidateId')));
  return jsonb_build_object('status', 'created', 'cardId', c.id);
end;
$$;

-- ── Artwork review ───────────────────────────────────────────────────────────────────────
alter table public.nova_artwork add column review_status text
  check (review_status in ('pending', 'approved', 'rejected'));
alter table public.nova_artwork add column reviewed_by uuid;
alter table public.nova_artwork add column reviewed_at timestamptz;
alter table public.nova_artwork add column review_note text check (length(review_note) <= 500);
alter table public.nova_artwork add column quality_checks jsonb;
alter table public.nova_artwork add column phash text check (phash ~ '^[0-9a-f]{16}$');
-- A rejected image stays on record; its replacement may then occupy the slot.
alter table public.nova_artwork drop constraint nova_artwork_card_id_stage_candidate_key;
create unique index nova_artwork_live_slot on public.nova_artwork(card_id, stage, candidate)
  where review_status is distinct from 'rejected';

alter table public.nova_generation_candidates drop constraint nova_generation_candidates_status_check;
alter table public.nova_generation_candidates add constraint nova_generation_candidates_status_check
  check (status in ('pending', 'assigned', 'ready', 'failed', 'review', 'rejected'));

create or replace function public.nova_artwork_immutable() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP='DELETE' then
    if exists(select 1 from public.nova_cards where id=old.card_id) then raise exception 'Approved artwork is immutable'; end if;
    return old;
  end if;
  if new.storage_path<>old.storage_path or new.card_id<>old.card_id
    or new.stage<>old.stage or new.candidate<>old.candidate
    or new.sha256 is distinct from old.sha256 or (old.selected and not new.selected)
    or (old.released and not new.released)
    or new.quality_checks is distinct from old.quality_checks or new.phash is distinct from old.phash
    or new.validation_version is distinct from old.validation_version then
    raise exception 'Approved artwork is immutable';
  end if;
  -- One review decision only: pending -> approved | rejected, recorded with its reviewer.
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
    -- Companion artwork can only become permanent once a reviewer has approved it.
    if exists(select 1 from public.nova_card_candidates k where k.card_id=new.card_id)
      and new.review_status is distinct from 'approved' then
      raise exception 'Only approved artwork can be chosen';
    end if;
  end if;
  return new;
end;
$$;

-- Results from the worker. Companion jobs must pass the RGBA check and enter human review.
drop function public.nova_finish_request(uuid, uuid, text, text, jsonb, bigint, text, boolean);
create function public.nova_finish_request(request uuid, token uuid, digest text default null,
  provider_request text default null, provider_usage jsonb default null, cost_microusd bigint default null,
  failure text default null, retryable boolean default false,
  validation text default 'png-v1', checks jsonb default null, phash text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare r public.nova_batch_requests; p public.nova_generation_candidates; j public.nova_generation_jobs;
  b public.nova_generation_batches; companion boolean;
begin
  select * into strict r from public.nova_batch_requests where id=request for update;
  select * into strict b from public.nova_generation_batches where id=r.batch_id;
  if b.status<>'collecting' or b.lease_token is distinct from token or b.lease_until<now() then raise exception 'Collection lease expired'; end if;
  if r.result is not null then return; end if;
  select * into strict p from public.nova_generation_candidates where id=r.candidate_id for update;
  select * into strict j from public.nova_generation_jobs where id=p.job_id for update;
  if j.stage<>1 then raise exception 'Card evolution is not available in Phase 1'; end if;
  companion := j.prompt_version = 'cc-art-v1';
  if failure is null then
    if digest is null or digest !~ '^[a-f0-9]{64}$' then raise exception 'Validated PNG digest required'; end if;
    if companion and (validation is distinct from 'png-rgba-v1' or phash is null) then
      raise exception 'Companion artwork requires the RGBA validation';
    end if;
    if exists(select 1 from public.nova_artwork where job_id=j.id and sha256=digest) then
      failure='duplicate_image'; retryable=false;
    else
      insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version,
          review_status,quality_checks,phash)
        values(j.card_id,j.id,j.stage,p.candidate,j.card_id||'/'||j.id||'/'||p.candidate||'/'||digest||'.png',digest,
          case when companion then 'png-rgba-v1' else 'png-v1' end,
          case when companion then 'pending' else null end,
          case when companion then checks else null end,
          case when companion then phash else null end);
    end if;
  end if;
  update public.nova_batch_requests set result=case when failure is null then 'ready' else 'failed' end,
    provider_request_id=provider_request,usage=provider_usage,estimated_cost_microusd=cost_microusd,error_code=failure where id=r.id;
  update public.nova_generation_candidates set status=case when failure is null then 'ready'
    when retryable and attempts<2 then 'pending' else 'failed' end,
    retry_after=now()+interval '15 minutes',error_code=failure where id=p.id;
  update public.nova_generation_jobs set status=case
    when exists(select 1 from public.nova_generation_candidates where job_id=j.id and status in ('failed','review','rejected')) then 'failed'
    when not exists(select 1 from public.nova_generation_candidates where job_id=j.id and status<>'ready') then 'ready'
    else 'running' end,error_code=failure,updated_at=now() where id=j.id;
  if cost_microusd>r.reserved_microusd then
    update public.nova_generation_settings set enabled=false;
  end if;
  insert into public.nova_generation_audit(action,subject_id,detail) values('candidate_result',p.id,
    jsonb_build_object('result',coalesce(failure,'ready'),'request',provider_request,'estimatedCostMicrousd',cost_microusd));
  perform public.nova_release_evolutions();
end;
$$;

-- ── Reveal, Studio state, access and selection ───────────────────────────────────────────
create or replace function public.nova_origin_reveal_ready(c public.nova_cards) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.nova_generation_jobs j where j.card_id=c.id and j.stage=1
      and j.status='ready' and now()>=j.reveal_after
      and case when exists(select 1 from public.nova_card_candidates k where k.card_id=c.id) then
        (select count(distinct a.candidate) from public.nova_artwork a where a.job_id=j.id
          and a.review_status='approved' and a.validation_version='png-rgba-v1')=2
        and (select count(distinct a.sha256) from public.nova_artwork a where a.job_id=j.id
          and a.review_status='approved')=2
      else
        (select count(distinct a.sha256) from public.nova_artwork a where a.job_id=j.id
          and a.validation_version='png-v1' and a.review_status is distinct from 'rejected')=2
      end);
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

create or replace function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.nova_artwork a join public.nova_cards c on c.id=a.card_id
    where a.storage_path=path and exists(select 1 from public.profiles p
      where p.id=c.owner_id and p.role='student' and p.status='active') and (
      (a.stage=1 and a.selected and a.released and (c.sharing or c.owner_id=auth.uid()))
      or (c.owner_id=auth.uid() and a.stage=1 and public.nova_origin_reveal_ready(c)
        and (a.review_status is null or a.review_status='approved')
        and not exists(select 1 from public.nova_artwork chosen where chosen.card_id=c.id and chosen.stage=1 and chosen.selected))));
$$;

create or replace function public.select_nova_origin(chosen_candidate text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_active_student(); c public.nova_cards; chosen text;
begin
  select * into strict c from public.nova_cards where owner_id=u for update;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
  if chosen is not null then
    if chosen<>chosen_candidate then raise exception 'Your permanent Nova is already selected'; end if;
    return public.get_my_nova_studio();
  end if;
  if not public.nova_origin_reveal_ready(c) then raise exception 'Your two Nova artworks are not ready to choose'; end if;
  if not exists(select 1 from public.nova_artwork
    where card_id=c.id and stage=1 and candidate=chosen_candidate
      and (review_status is null or review_status='approved')) then
    raise exception 'Choose one of the two Origin artworks'; end if;
  update public.nova_cards set variant=chosen_candidate where id=c.id;
  update public.nova_artwork set selected=true,released=true
    where card_id=c.id and stage=1 and candidate=chosen_candidate
      and (review_status is null or review_status='approved');
  insert into public.nova_generation_audit(actor_id,action,subject_id,detail)
    values(u,'origin_selected',c.id,jsonb_build_object('candidate',chosen_candidate));
  return public.get_my_nova_studio();
end;
$$;

-- ── Spending controls and worker eligibility ─────────────────────────────────────────────
alter table public.nova_generation_settings add column companion_enabled boolean not null default false;
alter table public.nova_generation_settings add column daily_cap_microusd bigint not null default 0
  check (daily_cap_microusd >= 0);
-- Configurable, not activated: defaults stay 2 batches x 2 requests and $5 per attempt.
alter table public.nova_generation_settings drop constraint nova_generation_settings_max_batches_check;
alter table public.nova_generation_settings add constraint nova_generation_settings_max_batches_check
  check (max_batches between 1 and 20);
alter table public.nova_generation_settings drop constraint nova_generation_settings_max_batch_requests_check;
alter table public.nova_generation_settings add constraint nova_generation_settings_max_batch_requests_check
  check (max_batch_requests between 1 and 500);
alter table public.nova_generation_settings drop constraint nova_generation_settings_reserve_microusd_check;
alter table public.nova_generation_settings add constraint nova_generation_settings_reserve_microusd_check
  check (reserve_microusd >= 10000);

-- A card's Origin job may be sent to the provider. Legacy jobs: as before. Companion jobs: only
-- with the companion switch on, the cc-art-v1 prompt and Visual DNA for both candidates.
create function public.nova_job_generation_allowed(j public.nova_generation_jobs, s public.nova_generation_settings)
returns boolean language sql stable security definer set search_path = '' as $$
  select case when exists(select 1 from public.nova_card_candidates k where k.card_id=j.card_id)
    then s.companion_enabled and j.prompt_version='cc-art-v1'
      and (select count(*) from public.nova_card_dna d where d.card_id=j.card_id)=2
    else j.prompt_version='nova-art-v1' end;
$$;

create or replace function public.nova_prepare_batch() returns uuid
language plpgsql security definer set search_path = '' as $$
declare s public.nova_generation_settings; r record; bid uuid; ep text; mdl text; spent bigint; spent_today bigint;
  month date; today date;
begin
  select * into strict s from public.nova_generation_settings where singleton for update;
  if not s.enabled or not s.batch_enabled then return null; end if;
  if (select count(*) from public.nova_generation_batches where status<>'completed')>=s.max_batches then return null; end if;
  month=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur')::date;
  today=(now() at time zone 'Asia/Kuala_Lumpur')::date;
  select coalesce(sum(reserved_microusd),0) into spent from public.nova_batch_requests where budget_month=month;
  select coalesce(sum(reserved_microusd),0) into spent_today from public.nova_batch_requests
    where (created_at at time zone 'Asia/Kuala_Lumpur')::date=today;
  for r in select p.*,j.stage,j.card_id from public.nova_generation_candidates p
    join public.nova_generation_jobs j on j.id=p.job_id join public.nova_cards c on c.id=j.card_id
    where p.status='pending' and p.attempts<2 and p.retry_after<=now()
      and j.stage=1 and public.nova_subscription_active(c.owner_id)
      and public.nova_job_generation_allowed(j, s)
    order by p.retry_after,p.id limit s.max_batch_requests for update of p skip locked loop
    -- Both caps must allow the reservation; a $0 cap (the default) allows nothing.
    if spent+s.reserve_microusd>s.monthly_cap_microusd or spent_today+s.reserve_microusd>s.daily_cap_microusd then exit; end if;
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
    spent_today=spent_today+s.reserve_microusd;
  end loop;
  if bid is not null then insert into public.nova_generation_audit(action,subject_id) values('batch_reserved',bid); end if;
  return bid;
end;
$$;

create or replace function public.nova_begin_submission(batch uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
declare s public.nova_generation_settings;
begin
  select * into s from public.nova_generation_settings where singleton;
  if not (s.enabled and s.batch_enabled)
    or exists(select 1 from public.nova_batch_requests r
      join public.nova_generation_candidates p on p.id=r.candidate_id
      join public.nova_generation_jobs j on j.id=p.job_id
      join public.nova_cards c on c.id=j.card_id
      where r.batch_id=batch and (j.stage<>1 or not public.nova_subscription_active(c.owner_id)
        or not public.nova_job_generation_allowed(j, s)))
      then return false; end if;
  update public.nova_generation_batches set status='submitting',updated_at=now() where id=batch and status='prepared';
  return found;
end;
$$;

-- ── Human review (active admins only) ────────────────────────────────────────────────────
create function public.nova_require_admin() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare u uuid := auth.uid();
begin
  if u is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, false) or not exists(
    select 1 from public.profiles p where p.id = u and p.role = 'admin' and p.status = 'active') then
    raise exception 'An active administrator account is required' using errcode = '42501';
  end if;
  return u;
end;
$$;

create function public.nova_phash_distance(x text, y text) returns integer
language sql immutable set search_path = '' as $$
  select case when x ~ '^[0-9a-f]{16}$' and y ~ '^[0-9a-f]{16}$'
    then length(replace(((('x' || x)::bit(64)) # (('x' || y)::bit(64)))::text, '0', '')) end;
$$;

-- Pending companion artwork with everything a reviewer needs. No student name or account.
create function public.nova_admin_review_queue(max_items integer default 50) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.nova_require_admin();
  return coalesce((select jsonb_agg(item order by created_at) from (
    select a.created_at, jsonb_build_object(
      'artworkId', a.id, 'cardId', a.card_id, 'slot', a.candidate, 'storagePath', a.storage_path,
      'sha256', a.sha256, 'phash', a.phash, 'checks', a.quality_checks, 'validation', a.validation_version,
      'createdAt', a.created_at,
      'candidate', (select k.spec from public.nova_card_candidates k where k.card_id=a.card_id and k.slot=a.candidate),
      'dna', (select d.dna from public.nova_card_dna d where d.card_id=a.card_id and d.slot=a.candidate),
      'sibling', (select jsonb_build_object('status', o.review_status, 'distance', public.nova_phash_distance(a.phash, o.phash))
        from public.nova_artwork o where o.job_id=a.job_id and o.candidate<>a.candidate
          and o.review_status is distinct from 'rejected' order by o.created_at desc limit 1)
    ) as item
    from public.nova_artwork a
    where a.review_status='pending' and exists(select 1 from public.nova_card_candidates k where k.card_id=a.card_id)
    order by a.created_at limit greatest(1, least(max_items, 200))) q), '[]'::jsonb);
end;
$$;

create function public.nova_admin_review_artwork(artwork uuid, decision text, note text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); a public.nova_artwork;
begin
  if decision not in ('approve', 'reject') then raise exception 'Decision must be approve or reject'; end if;
  if decision = 'reject' and (note is null or length(trim(note)) < 8) then
    raise exception 'A rejection needs a note of at least 8 characters';
  end if;
  select * into a from public.nova_artwork where id = artwork for update;
  if a.id is null or a.review_status is distinct from 'pending' then
    raise exception 'Only pending artwork can be reviewed';
  end if;
  update public.nova_artwork set review_status = case decision when 'approve' then 'approved' else 'rejected' end,
    reviewed_by = reviewer, reviewed_at = now(), review_note = note where id = a.id;
  if decision = 'reject' then
    update public.nova_generation_candidates set status='rejected', error_code='artwork_rejected'
      where job_id=a.job_id and candidate=a.candidate;
    update public.nova_generation_jobs set status='failed', error_code='artwork_rejected', updated_at=now()
      where id=a.job_id;
  end if;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'artwork_' || decision || (case decision when 'approve' then 'd' else 'ed' end), a.id,
      jsonb_build_object('card', a.card_id, 'slot', a.candidate, 'note', note));
  return jsonb_build_object('artworkId', a.id, 'status', case decision when 'approve' then 'approved' else 'rejected' end);
end;
$$;

-- One controlled, audited retry for a rejected or failed candidate, within the attempt limit.
create function public.nova_admin_retry_companion(card uuid, slot text, reason text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare reviewer uuid := public.nova_require_admin(); p public.nova_generation_candidates;
begin
  if reason is null or length(trim(reason)) < 12 then raise exception 'An audit reason is required'; end if;
  select gc.* into p from public.nova_generation_candidates gc
    join public.nova_generation_jobs j on j.id = gc.job_id
    where j.card_id = card and j.stage = 1 and gc.candidate = slot for update of gc;
  if p.id is null or p.status not in ('rejected', 'failed') or p.attempts >= 2 then
    raise exception 'Retry limit reached or this candidate is not retryable';
  end if;
  update public.nova_generation_candidates set status='pending', retry_after=now(), error_code=null where id=p.id;
  update public.nova_generation_jobs set status='queued', error_code=null, updated_at=now() where id=p.job_id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (reviewer, 'companion_retry', p.id, jsonb_build_object('reason', reason));
  return jsonb_build_object('candidate', p.id, 'status', 'pending');
end;
$$;

-- ── Grants ───────────────────────────────────────────────────────────────────────────────
revoke all on function public.nova_check_dna_candidate(), public.nova_check_dna_pair(),
  public.nova_dna_immutable(), public.nova_submit_companions(uuid, integer[], jsonb, jsonb),
  public.nova_finish_request(uuid, uuid, text, text, jsonb, bigint, text, boolean, text, jsonb, text),
  public.nova_origin_reveal_ready(public.nova_cards), public.get_my_nova_studio(),
  public.can_read_nova_artwork(text), public.select_nova_origin(text),
  public.nova_job_generation_allowed(public.nova_generation_jobs, public.nova_generation_settings),
  public.nova_prepare_batch(), public.nova_begin_submission(uuid), public.nova_require_admin(),
  public.nova_phash_distance(text, text), public.nova_admin_review_queue(integer),
  public.nova_admin_review_artwork(uuid, text, text), public.nova_admin_retry_companion(uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.nova_submit_companions(uuid, integer[], jsonb, jsonb),
  public.nova_finish_request(uuid, uuid, text, text, jsonb, bigint, text, boolean, text, jsonb, text),
  public.nova_prepare_batch(), public.nova_begin_submission(uuid) to service_role;
grant execute on function public.get_my_nova_studio(), public.select_nova_origin(text) to authenticated;
grant execute on function public.can_read_nova_artwork(text) to anon, authenticated;
-- Admin functions check the caller's admin role themselves.
grant execute on function public.nova_admin_review_queue(integer),
  public.nova_admin_review_artwork(uuid, text, text), public.nova_admin_retry_companion(uuid, text, text)
  to authenticated;

commit;

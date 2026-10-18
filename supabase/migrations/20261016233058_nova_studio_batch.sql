-- Review only. Apply AFTER 20261015090000; deliberately installs disabled.
begin;

alter table public.nova_cards add column identity_spec jsonb;
create function public.nova_identity(a integer[]) returns jsonb
language sql immutable set search_path = '' as $$
  select jsonb_build_object('version','nova-identity-v1','answers',a,
    'traits',public.nova_traits(a),'artDirection','nova-master-art-direction-v1');
$$;
update public.nova_cards set identity_spec=public.nova_identity(answers);
alter table public.nova_cards alter column identity_spec set not null;
create function public.nova_keep_identity() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP='INSERT' then new.identity_spec=public.nova_identity(new.answers);
  elsif new.answers is distinct from old.answers or new.identity_spec is distinct from old.identity_spec
    or new.owner_id<>old.owner_id or new.public_id<>old.public_id or new.serial<>old.serial then
    raise exception 'Nova identity is permanent';
  end if;
  return new;
end;
$$;
create trigger nova_identity_immutable before insert or update on public.nova_cards
  for each row execute function public.nova_keep_identity();

create table public.nova_studio_drafts (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  answers integer[] not null default '{}',
  username text not null default '',
  revision integer not null default 0,
  updated_at timestamptz not null default now(),
  check (cardinality(answers) between 0 and 12 and 0<=all(answers) and 2>=all(answers)
    and array_position(answers,null) is null and (cardinality(answers)=0 or
      (array_ndims(answers)=1 and array_lower(answers,1)=1))),
  check (username='' or username ~ '^[A-Za-z0-9_]{2,24}$')
);
create table public.nova_generation_settings (
  singleton boolean primary key default true check(singleton),
  enabled boolean not null default false,
  batch_enabled boolean not null default false,
  monthly_cap_microusd bigint not null default 0 check(monthly_cap_microusd>=0),
  -- Conservative reservation per attempt, never refunded in the same month.
  -- Supports ONLY the bounded medium 1024x1536 configuration below.
  reserve_microusd bigint not null default 5000000 check(reserve_microusd>=5000000),
  origin_model text not null default 'gpt-image-2.5-flare-2026-09-08'
    check(origin_model in ('gpt-image-2.5-flare','gpt-image-2.5-flare-2026-09-08')),
  edit_model text not null default 'gpt-image-2.5-sunburst-2026-09-08'
    check(edit_model in ('gpt-image-2.5-sunburst','gpt-image-2.5-sunburst-2026-09-08')),
  quality text not null default 'medium' check(quality in ('low','medium')),
  max_batches integer not null default 2 check(max_batches between 1 and 4),
  max_batch_requests integer not null default 2 check(max_batch_requests between 1 and 2)
);
insert into public.nova_generation_settings(singleton) values(true);
alter table public.nova_generation_jobs add column reveal_after timestamptz;
alter table public.nova_generation_jobs add column error_code text;
alter table public.nova_generation_jobs add column updated_at timestamptz not null default now();

create table public.nova_generation_candidates (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.nova_generation_jobs(id) on delete cascade,
  candidate text not null check(candidate in ('a','b')),
  status text not null default 'pending' check(status in ('pending','assigned','ready','failed','review')),
  attempts integer not null default 0 check(attempts between 0 and 2),
  retry_after timestamptz not null default now(),
  error_code text,
  unique(job_id,candidate)
);
create index nova_candidates_pending on public.nova_generation_candidates(retry_after)
  where status='pending';
create table public.nova_generation_batches (
  id uuid primary key default gen_random_uuid(),
  model text not null,
  endpoint text not null check(endpoint in ('/v1/images/generations','/v1/images/edits')),
  quality text not null,
  status text not null default 'prepared'
    check(status in ('prepared','submitting','submitted','collecting','completed','review')),
  provider_batch_id text unique,
  input_file_id text,
  output_file_id text,
  error_file_id text,
  lease_until timestamptz,
  lease_token uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index nova_batches_active on public.nova_generation_batches(status) where status<>'completed';
create table public.nova_batch_requests (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.nova_generation_batches(id),
  candidate_id uuid not null references public.nova_generation_candidates(id) on delete cascade,
  custom_id text not null unique,
  attempt integer not null,
  reserved_microusd bigint not null,
  budget_month date not null,
  provider_request_id text,
  usage jsonb,
  estimated_cost_microusd bigint,
  result text check(result in ('ready','failed','review')),
  error_code text,
  created_at timestamptz not null default now(),
  unique(candidate_id,attempt)
);
create index nova_requests_month on public.nova_batch_requests(budget_month);
create index nova_requests_batch on public.nova_batch_requests(batch_id);
create table public.nova_generation_audit (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  subject_id uuid,
  detail jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index nova_audit_recent on public.nova_generation_audit(created_at desc);
alter table public.nova_artwork add column sha256 text;
alter table public.nova_artwork add column validation_version text;
create index nova_artwork_job on public.nova_artwork(job_id);
create unique index nova_distinct_candidate_bytes on public.nova_artwork(job_id,sha256)
  where sha256 is not null;
create function public.nova_artwork_immutable() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP='DELETE' then
    if exists(select 1 from public.nova_cards where id=old.card_id) then raise exception 'Approved artwork is immutable'; end if;
    return old;
  end if;
  if new.storage_path<>old.storage_path or new.card_id<>old.card_id
    or new.stage<>old.stage or new.candidate<>old.candidate
    or new.sha256 is distinct from old.sha256 or (old.selected and not new.selected)
    or (old.released and not new.released) then raise exception 'Approved artwork is immutable'; end if;
  return new;
end;
$$;
create trigger nova_artwork_preserved before update or delete on public.nova_artwork
  for each row execute function public.nova_artwork_immutable();

-- All new tables are service-only. Learners use narrowly scoped owner RPCs.
do $$ declare t text; begin
  foreach t in array array['nova_studio_drafts','nova_generation_settings','nova_generation_candidates',
    'nova_generation_batches','nova_batch_requests','nova_generation_audit'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from public,anon,authenticated',t);
    execute format('grant all on public.%I to service_role',t);
  end loop;
end $$;
grant usage,select on sequence public.nova_generation_audit_id_seq to service_role;

create function public.nova_require_student() returns uuid
language plpgsql stable security definer set search_path = '' as $$
begin
  if auth.uid() is null or coalesce((auth.jwt()->>'is_anonymous')::boolean,true) then
    raise exception 'A registered account is required' using errcode='42501'; end if;
  return auth.uid();
end;
$$;
create function public.save_nova_studio_draft(questionnaire integer[], display_username text, expected_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_student(); d public.nova_studio_drafts;
begin
  insert into public.nova_studio_drafts(owner_id) values(u) on conflict do nothing;
  select * into strict d from public.nova_studio_drafts where owner_id=u for update;
  if exists(select 1 from public.nova_cards where owner_id=u) then raise exception 'Identity is already saved'; end if;
  if expected_revision is distinct from d.revision then raise exception 'Your answers changed on another device. Refresh to continue.'; end if;
  update public.nova_studio_drafts set answers=questionnaire,username=display_username,
    revision=revision+1,updated_at=now() where owner_id=u returning * into d;
  return jsonb_build_object('answers',d.answers,'username',d.username,'revision',d.revision);
end;
$$;

create function public.nova_origin_reveal_ready(c public.nova_cards) returns boolean
language sql stable security definer set search_path = '' as $$
  select public.nova_subscription_active(c.owner_id) and exists(
    select 1 from public.nova_generation_jobs j where j.card_id=c.id and j.stage=1
      and j.status='ready' and now()>=j.reveal_after
      and (select count(distinct a.sha256) from public.nova_artwork a
        where a.job_id=j.id and a.validation_version='png-v1')=2);
$$;

create function public.get_my_nova_studio() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_student(); c public.nova_cards; d public.nova_studio_drafts;
  j public.nova_generation_jobs; chosen text; ready boolean=false;
begin
  select * into d from public.nova_studio_drafts where owner_id=u;
  select * into c from public.nova_cards where owner_id=u;
  select * into j from public.nova_generation_jobs where card_id=c.id and stage=1;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
  if c.id is not null then ready=public.nova_origin_reveal_ready(c); end if;
  return jsonb_build_object('active',public.nova_subscription_active(u),
    'enabled',(select enabled and batch_enabled from public.nova_generation_settings where singleton),
    'draft',jsonb_build_object('answers',coalesce(d.answers,'{}'),'username',coalesce(d.username,''),'revision',coalesce(d.revision,0)),
    'publicId',c.public_id,'identity',c.identity_spec,'selected',chosen,
    'xp',public.nova_verified_xp(u),'earnedStage',public.nova_stage(public.nova_verified_xp(u)),
    'origin',case when j.id is null then null else jsonb_build_object('status',j.status,
      'revealAfter',j.reveal_after,'ready',ready,'errorCode',j.error_code,
      'completed',(select count(*) from public.nova_generation_candidates where job_id=j.id and status='ready')) end,
    'candidates',case when ready and chosen is null then (select jsonb_agg(jsonb_build_object(
      'candidate',a.candidate,'path',a.storage_path) order by a.candidate)
      from public.nova_artwork a where a.job_id=j.id) else '[]'::jsonb end,
    'evolutions',coalesce((select jsonb_agg(jsonb_build_object('stage',stage,'status',status,'errorCode',error_code) order by stage)
      from public.nova_generation_jobs where card_id=c.id and stage>1),'[]'::jsonb));
end;
$$;

create function public.submit_nova_origin() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_student(); c public.nova_cards; d public.nova_studio_drafts; j uuid;
begin
  -- Serialize on the account even before a permanent card exists.
  perform 1 from auth.users where id=u for update;
  if not public.nova_subscription_active(u) then raise exception 'An active Pro or Premium subscription is required' using errcode='42501'; end if;
  select * into c from public.nova_cards where owner_id=u for update;
  if exists(select 1 from public.nova_generation_jobs where card_id=c.id and stage=1)
    or exists(select 1 from public.nova_artwork where card_id=c.id and stage=1 and selected) then
    return public.get_my_nova_studio(); end if;
  if not exists(select 1 from public.nova_generation_settings where singleton and enabled and batch_enabled) then
    raise exception 'Nova generation is not enabled yet. Your answers are saved.'; end if;
  if c.id is null then
    select * into d from public.nova_studio_drafts where owner_id=u for update;
    if cardinality(d.answers) is distinct from 12 or d.username='' then raise exception 'Complete all twelve questions and choose a nickname'; end if;
    insert into public.nova_cards(owner_id,username,answers,variant,snapshot_xp)
      values(u,d.username,d.answers,'a',public.nova_verified_xp(u)) returning * into c;
  end if;
  insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot,reveal_after)
    values(c.id,1,'nova-art-v1',c.identity_spec,
      ((now() at time zone 'Asia/Kuala_Lumpur')::date+1)::timestamp at time zone 'Asia/Kuala_Lumpur') returning id into j;
  insert into public.nova_generation_candidates(job_id,candidate) values(j,'a'),(j,'b');
  insert into public.nova_generation_audit(actor_id,action,subject_id) values(u,'origin_submitted',j);
  return public.get_my_nova_studio();
end;
$$;

create function public.select_nova_origin(chosen_candidate text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_student(); c public.nova_cards; chosen text;
begin
  select * into strict c from public.nova_cards where owner_id=u for update;
  select candidate into chosen from public.nova_artwork where card_id=c.id and stage=1 and selected;
  if chosen is not null then
    if chosen<>chosen_candidate then raise exception 'Your permanent Nova is already selected'; end if;
    return public.get_my_nova_studio();
  end if;
  if not public.nova_origin_reveal_ready(c) then raise exception 'Your two Nova artworks are not ready to choose'; end if;
  update public.nova_artwork set selected=true,released=true
    where card_id=c.id and stage=1 and candidate=chosen_candidate;
  if not found then raise exception 'Choose one of the two Origin artworks'; end if;
  insert into public.nova_generation_audit(actor_id,action,subject_id,detail)
    values(u,'origin_selected',c.id,jsonb_build_object('candidate',chosen_candidate));
  return public.get_my_nova_studio();
end;
$$;

create or replace function public.request_nova_evolution(target_stage integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid=public.nova_require_student(); c public.nova_cards; j uuid; previous_path text; origin_path text;
begin
  if not public.nova_subscription_active(u) then raise exception 'An active Pro or Premium subscription is required' using errcode='42501'; end if;
  if target_stage is null or target_stage not between 2 and 5 then raise exception 'Invalid evolution stage'; end if;
  select * into strict c from public.nova_cards where owner_id=u for update;
  if public.nova_stage(public.nova_verified_xp(u))<target_stage then raise exception 'Not enough verified XP'; end if;
  if exists(select 1 from public.nova_generation_jobs where card_id=c.id and stage=target_stage) then return public.get_my_nova_studio(); end if;
  if not exists(select 1 from public.nova_generation_settings where singleton and enabled and batch_enabled) then raise exception 'Generation is not enabled'; end if;
  select storage_path into previous_path from public.nova_artwork where card_id=c.id and stage=target_stage-1 and selected and released;
  select storage_path into origin_path from public.nova_artwork where card_id=c.id and stage=1 and selected and released;
  if previous_path is null or origin_path is null then raise exception 'Previous approved evolution artwork is required'; end if;
  insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot)
    values(c.id,target_stage,'nova-art-v1',c.identity_spec || jsonb_build_object('previousArtwork',previous_path,'originArtwork',origin_path)) returning id into j;
  insert into public.nova_generation_candidates(job_id,candidate) values(j,'a');
  insert into public.nova_generation_audit(actor_id,action,subject_id) values(u,'evolution_requested',j);
  return public.get_my_nova_studio();
end;
$$;

-- Atomic reservation serializes the global cap and concurrent batch limit.
create function public.nova_prepare_batch() returns uuid
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
      and public.nova_subscription_active(c.owner_id) and public.nova_stage(public.nova_verified_xp(c.owner_id))>=j.stage
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

-- Claim before the provider call. A crash after this point must reconcile, never resubmit.
create function public.nova_begin_submission(batch uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.nova_generation_settings where singleton and enabled and batch_enabled)
    or exists(select 1 from public.nova_batch_requests r
      join public.nova_generation_candidates p on p.id=r.candidate_id
      join public.nova_generation_jobs j on j.id=p.job_id
      join public.nova_cards c on c.id=j.card_id
      where r.batch_id=batch and (not public.nova_subscription_active(c.owner_id)
        or public.nova_stage(public.nova_verified_xp(c.owner_id))<j.stage)) then return false; end if;
  update public.nova_generation_batches set status='submitting',updated_at=now() where id=batch and status='prepared';
  return found;
end;
$$;
create function public.nova_attach_batch(batch uuid, provider_id text, input_id text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if provider_id !~ '^batch_[A-Za-z0-9_-]+$' then raise exception 'Invalid provider batch'; end if;
  update public.nova_generation_batches set provider_batch_id=provider_id,input_file_id=input_id,status='submitted',updated_at=now()
    where id=batch and status in ('submitting','review') and provider_batch_id is null;
  insert into public.nova_generation_audit(action,subject_id,detail) values('batch_reconciled',batch,jsonb_build_object('providerBatchId',provider_id));
end;
$$;
create function public.nova_claim_collection(batch uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare token uuid=gen_random_uuid();
begin
  update public.nova_generation_batches set status='collecting',lease_token=token,lease_until=now()+interval '10 minutes'
    where id=batch and (status='submitted' or (status='collecting' and lease_until<now()));
  if found then return token; end if; return null;
end;
$$;
create function public.nova_release_evolutions() returns void
language plpgsql security definer set search_path = '' as $$
begin
  -- A crashed submitter may have incurred a charge. Quarantine; never enqueue it again.
  update public.nova_generation_batches set status='review',updated_at=now()
    where status='submitting' and updated_at<now()-interval '15 minutes';
  update public.nova_generation_candidates p set status='review',error_code='submission_requires_reconciliation'
    from public.nova_batch_requests r,public.nova_generation_batches b
    where r.candidate_id=p.id and r.batch_id=b.id and b.status='review' and r.result is null and p.status='assigned';
  update public.nova_generation_jobs j set status='failed',error_code='submission_requires_reconciliation'
    where exists(select 1 from public.nova_generation_candidates p where p.job_id=j.id and p.status='review');
  update public.nova_artwork a set selected=true,released=true from public.nova_cards c,public.nova_generation_jobs j
    where a.card_id=c.id and a.job_id=j.id and j.status='ready' and a.stage>1 and not a.selected
      and public.nova_subscription_active(c.owner_id) and public.nova_stage(public.nova_verified_xp(c.owner_id))>=a.stage
      and exists(select 1 from public.nova_artwork p where p.card_id=c.id and p.stage=a.stage-1 and p.selected and p.released);
  update public.nova_cards c set snapshot_stage=greatest(c.snapshot_stage,public.nova_visible_stage(c)),
    snapshot_xp=greatest(c.snapshot_xp,public.nova_verified_xp(c.owner_id))
    where public.nova_subscription_active(c.owner_id) and exists(
      select 1 from public.nova_artwork a where a.card_id=c.id and a.selected and a.released);
end;
$$;

-- Only validated PNGs are accepted. The worker is trusted; clients have no EXECUTE.
create function public.nova_finish_request(request uuid, token uuid, digest text default null,
  provider_request text default null, provider_usage jsonb default null, cost_microusd bigint default null,
  failure text default null, retryable boolean default false) returns void
language plpgsql security definer set search_path = '' as $$
declare r public.nova_batch_requests; p public.nova_generation_candidates; j public.nova_generation_jobs; b public.nova_generation_batches;
begin
  select * into strict r from public.nova_batch_requests where id=request for update;
  select * into strict b from public.nova_generation_batches where id=r.batch_id;
  if b.status<>'collecting' or b.lease_token is distinct from token or b.lease_until<now() then raise exception 'Collection lease expired'; end if;
  if r.result is not null then return; end if;
  select * into strict p from public.nova_generation_candidates where id=r.candidate_id for update;
  select * into strict j from public.nova_generation_jobs where id=p.job_id for update;
  if failure is null then
    if digest is null or digest !~ '^[a-f0-9]{64}$' then raise exception 'Validated PNG digest required'; end if;
    if exists(select 1 from public.nova_artwork where job_id=j.id and sha256=digest) then
      failure='duplicate_image'; retryable=false;
    else
      insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version)
        values(j.card_id,j.id,j.stage,p.candidate,j.card_id||'/'||j.id||'/'||p.candidate||'/'||digest||'.png',digest,'png-v1');
    end if;
  end if;
  update public.nova_batch_requests set result=case when failure is null then 'ready' else 'failed' end,
    provider_request_id=provider_request,usage=provider_usage,estimated_cost_microusd=cost_microusd,error_code=failure where id=r.id;
  update public.nova_generation_candidates set status=case when failure is null then 'ready'
    when retryable and attempts<2 then 'pending' else 'failed' end,
    retry_after=now()+interval '15 minutes',error_code=failure where id=p.id;
  update public.nova_generation_jobs set status=case
    when exists(select 1 from public.nova_generation_candidates where job_id=j.id and status in ('failed','review')) then 'failed'
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

create function public.nova_admin_retry(candidate_uuid uuid, reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare j uuid;
begin
  if reason is null or length(trim(reason))<12 then raise exception 'An audit reason is required'; end if;
  -- Unknown submissions are never eligible: reconcile the provider batch instead.
  update public.nova_generation_candidates set status='pending',retry_after=now(),error_code=null
    where id=candidate_uuid and status='failed' and attempts<2 returning job_id into j;
  if not found then raise exception 'Retry limit reached or submission requires reconciliation'; end if;
  update public.nova_generation_jobs set status='queued',error_code=null where id=j;
  insert into public.nova_generation_audit(action,subject_id,detail) values('admin_retry',candidate_uuid,jsonb_build_object('reason',reason));
end;
$$;

create or replace function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.nova_artwork a join public.nova_cards c on c.id=a.card_id
    where a.storage_path=path and (
      (a.selected and a.released and ((c.sharing and a.stage=public.nova_visible_stage(c))
        or (c.owner_id=auth.uid() and a.stage<=case when public.nova_subscription_active(c.owner_id)
          then public.nova_stage(public.nova_verified_xp(c.owner_id)) else c.snapshot_stage end)))
      or (c.owner_id=auth.uid() and a.stage=1 and public.nova_origin_reveal_ready(c)
        and not exists(select 1 from public.nova_artwork chosen where chosen.card_id=c.id and chosen.stage=1 and chosen.selected))));
$$;

-- Default PostgreSQL EXECUTE grants must not expose internal worker/identity helpers.
revoke all on function public.nova_identity(integer[]),public.nova_keep_identity(),public.nova_artwork_immutable(),
  public.nova_require_student(),public.nova_origin_reveal_ready(public.nova_cards),
  public.save_nova_studio_draft(integer[],text,integer),public.get_my_nova_studio(),
  public.submit_nova_origin(),public.select_nova_origin(text),public.nova_prepare_batch(),
  public.nova_begin_submission(uuid),public.nova_attach_batch(uuid,text,text),
  public.nova_claim_collection(uuid),public.nova_release_evolutions(),
  public.nova_finish_request(uuid,uuid,text,text,jsonb,bigint,text,boolean),public.nova_admin_retry(uuid,text)
  from public,anon,authenticated;
grant execute on function public.save_nova_studio_draft(integer[],text,integer),public.get_my_nova_studio(),
  public.submit_nova_origin(),public.select_nova_origin(text) to authenticated;
grant execute on function public.nova_prepare_batch(),public.nova_begin_submission(uuid),
  public.nova_attach_batch(uuid,text,text),public.nova_claim_collection(uuid),public.nova_release_evolutions(),
  public.nova_finish_request(uuid,uuid,text,text,jsonb,bigint,text,boolean),public.nova_admin_retry(uuid,text) to service_role;
create function public.nova_review_batch(batch uuid, code text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  update public.nova_generation_batches set status='review',updated_at=now() where id=batch and status in ('submitting','collecting');
  update public.nova_generation_candidates p set status='review',error_code=code
    from public.nova_batch_requests r where r.batch_id=batch and r.candidate_id=p.id and r.result is null;
  update public.nova_generation_jobs j set status='failed',error_code=code,updated_at=now()
    where exists(select 1 from public.nova_generation_candidates p where p.job_id=j.id and p.status='review');
  insert into public.nova_generation_audit(action,subject_id,detail) values('batch_needs_review',batch,jsonb_build_object('code',code));
end;
$$;
create function public.nova_admin_resume_collection(batch uuid, reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if reason is null or length(trim(reason))<12 then raise exception 'An audit reason is required'; end if;
  update public.nova_generation_batches set status='submitted',lease_token=null,lease_until=null
    where id=batch and status='review' and provider_batch_id is not null;
  if not found then raise exception 'Reconcile a provider batch ID first'; end if;
  insert into public.nova_generation_audit(action,subject_id,detail) values('admin_resume_collection',batch,jsonb_build_object('reason',reason));
end;
$$;
revoke all on function public.nova_review_batch(uuid,text),public.nova_admin_resume_collection(uuid,text) from public,anon,authenticated;
grant execute on function public.nova_review_batch(uuid,text),public.nova_admin_resume_collection(uuid,text) to service_role;
commit;

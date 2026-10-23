-- REVIEW ONLY. Do not apply to any hosted database. Apply AFTER 20261020130000, and only
-- after a reviewer confirms there are no duplicate nova_card_dna.variation_id values.
-- Exercised only against an isolated PGlite database in serial.db.test.ts.
--
-- New serials are 12 characters: [stage letter][YY][9 cryptographic digits].
-- The letter follows the card's evolution stage (see public.nova_stage_loyalty, the same
-- five rows as STAGE_LOYALTY in src/features/nova-cards/serial.ts):
--   1 Origin C Common, 2 Awakened R Rare, 3 Ascended E Epic,
--   4 Mythic M Mythic, 5 Legendary L Legendary.
-- Exactly five stages. The letter is the only character that may change later.
-- The other 11 characters are permanent and unique, so an evolution cannot collide
-- and a scan of an older letter still resolves.
-- Existing twelve-digit serials are NOT rewritten.
-- nova_serial_seq is left in place and is no longer the column default.
--
-- This migration does NOT change nova_visible_stage (it still returns 1) and does NOT
-- read payment_transactions or subscriptions. min_successful_payments is a proposal:
-- stage = count of successful payments, capped at 5 (1 = C … 5+ = L). Nothing in
-- billing or card creation calls it. The owner confirmed these five thresholds
-- (1 payment = C … 5+ = L). They live only in this table, beside the letter map.
--
-- Birth year: profiles.age, else profiles.form (Form 1 = 13 … Form 5 = 17), else 00.
-- YY stays inside the serial nova_card_payload already returns. No new public field.
begin;

create table public.nova_stage_loyalty (
  stage integer primary key check (stage between 1 and 5),
  stage_name text not null,
  letter char(1) not null unique check (letter in ('C', 'R', 'E', 'M', 'L')),
  rarity text not null unique check (rarity in ('Common', 'Rare', 'Epic', 'Mythic', 'Legendary')),
  min_successful_payments integer not null unique check (min_successful_payments between 1 and 5)
);
insert into public.nova_stage_loyalty(stage, stage_name, letter, rarity, min_successful_payments) values
  (1, 'Origin', 'C', 'Common', 1),
  (2, 'Awakened', 'R', 'Rare', 2),
  (3, 'Ascended', 'E', 'Epic', 3),
  (4, 'Mythic', 'M', 'Mythic', 4),
  (5, 'Legendary', 'L', 'Legendary', 5);
comment on table public.nova_stage_loyalty is
  'Single Nova stage config: letter, rarity label, and the unpaid proposal for how many successful payments reach that stage. Card creation does not count payments. Do not add a sixth stage.';
alter table public.nova_stage_loyalty enable row level security;
revoke all on public.nova_stage_loyalty from public, anon, authenticated;
grant select on public.nova_stage_loyalty to service_role;

create function public.nova_stage_letter(target integer) returns text
language sql stable set search_path = '' as $$
  select letter from public.nova_stage_loyalty where stage = target;
$$;
create function public.nova_stage_rarity(target integer) returns text
language sql stable set search_path = '' as $$
  select rarity from public.nova_stage_loyalty where stage = target;
$$;

-- Proposal only. Not referenced by nova_visible_stage, nova_submit_companions, or billing.
create function public.nova_proposed_stage_for_payments(successful_payments integer) returns integer
language sql stable set search_path = '' as $$
  select max(stage) from public.nova_stage_loyalty
  where successful_payments >= min_successful_payments;
$$;

create function public.nova_random_digits(needed integer) returns text
language plpgsql volatile set search_path = '' as $$
declare
  digits text := '';
  hex text;
  i integer;
  n integer;
begin
  if needed is null or needed < 1 or needed > 32 then
    raise exception 'Invalid digit length' using errcode = '22023';
  end if;
  while length(digits) < needed loop
    hex := replace(gen_random_uuid()::text, '-', '');
    for i in 1..32 loop
      if i in (13, 17) then continue; end if;
      n := get_byte(decode('0' || substr(hex, i, 1), 'hex'), 0);
      if n < 10 then
        digits := digits || n::text;
        exit when length(digits) >= needed;
      end if;
    end loop;
  end loop;
  return digits;
end;
$$;

create function public.nova_birth_yy(student uuid) returns text
language plpgsql stable security definer set search_path = '' as $$
declare
  has_age boolean;
  has_form boolean;
  student_age integer;
  student_form text;
  typical integer;
  year integer;
  yy integer;
begin
  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'age'
  ) into has_age;
  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'form'
  ) into has_form;
  if has_age or has_form then
    execute format(
      'select %s, %s from public.profiles where id = $1',
      case when has_age then 'age' else 'null::integer' end,
      case when has_form then 'form' else 'null::text' end
    ) into student_age, student_form using student;
  end if;
  year := extract(year from (now() at time zone 'Asia/Kuala_Lumpur'))::integer;
  if student_age is not null then
    yy := mod(year - student_age, 100);
  else
    typical := case student_form
      when 'Form 1' then 13
      when 'Form 2' then 14
      when 'Form 3' then 15
      when 'Form 4' then 16
      when 'Form 5' then 17
      else null
    end;
    if typical is null then return '00'; end if;
    yy := mod(year - typical, 100);
  end if;
  if yy < 0 then yy := yy + 100; end if;
  return lpad(yy::text, 2, '0');
end;
$$;

revoke all on function
  public.nova_stage_letter(integer), public.nova_stage_rarity(integer),
  public.nova_proposed_stage_for_payments(integer),
  public.nova_random_digits(integer), public.nova_birth_yy(uuid)
  from public, anon, authenticated;

alter table public.nova_cards drop constraint nova_cards_rarity_check;
alter table public.nova_cards add constraint nova_cards_rarity_check
  check (rarity in ('Common', 'Rare', 'Epic', 'Mythic', 'Legendary'));

alter table public.nova_cards add column serial_body text
  check (serial_body is null or serial_body ~ '^[0-9]{11}$');
create unique index nova_cards_serial_body_key on public.nova_cards (serial_body);

alter table public.nova_cards alter column serial drop default;
alter table public.nova_cards drop constraint nova_cards_serial_check;
alter table public.nova_cards add constraint nova_cards_serial_check
  check (
    (serial ~ '^[0-9]{12}$' and serial_body is null)
    or (serial ~ '^[CREML][0-9]{11}$' and serial_body = substr(serial, 2))
  );
comment on column public.nova_cards.serial is
  'Twelve characters. Legacy rows stay ^[0-9]{12}$. New rows are [stage letter][YY][9 cryptographic digits]. The letter may follow the stage; serial_body does not change.';
comment on column public.nova_cards.serial_body is
  'Permanent 11-character identity (YY + 9 digits). Unique. Null on legacy twelve-digit serials. Scans match this, not the rarity letter.';

-- The permanent body cannot change. The leading letter and rarity may change only
-- to the letter/rarity of nova_visible_stage, which Phase 1 still fixes at 1.
create or replace function public.nova_keep_identity() returns trigger
language plpgsql set search_path = '' as $$
declare
  stage_letter text;
  stage_rarity text;
begin
  if TG_OP = 'INSERT' then
    new.identity_spec = public.nova_identity(new.answers);
    if new.serial_body is not null then
      stage_letter := public.nova_stage_letter(public.nova_visible_stage(new));
      stage_rarity := public.nova_stage_rarity(public.nova_visible_stage(new));
      if stage_letter is null or stage_rarity is null
        or new.serial is distinct from stage_letter || new.serial_body
        or new.rarity is distinct from stage_rarity then
        raise exception 'Nova serial letter must match the current stage';
      end if;
    end if;
    return new;
  end if;
  if new.answers is distinct from old.answers or new.identity_spec is distinct from old.identity_spec
    or new.owner_id <> old.owner_id or new.public_id <> old.public_id
    or new.serial_body is distinct from old.serial_body
    or (new.variant is distinct from old.variant and exists(
      select 1 from public.nova_artwork a
      where a.card_id = old.id and a.stage = 1 and a.selected
    )) then
    raise exception 'Nova identity is permanent';
  end if;
  if new.serial is distinct from old.serial or new.rarity is distinct from old.rarity then
    stage_letter := public.nova_stage_letter(public.nova_visible_stage(new));
    stage_rarity := public.nova_stage_rarity(public.nova_visible_stage(new));
    if old.serial_body is null
      or new.serial is distinct from stage_letter || old.serial_body
      or new.rarity is distinct from stage_rarity then
      raise exception 'Nova identity is permanent';
    end if;
  end if;
  return new;
end;
$$;

create or replace function public.nova_submit_companions(student uuid, questionnaire integer[], match jsonb, dna jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  c public.nova_cards;
  d public.nova_studio_drafts;
  j uuid;
  attempts integer := 0;
  inserted boolean := false;
  stage_now integer;
  rarity_name text;
  body text;
  serial_value text;
  constraint_name text;
  message text;
  existing_id uuid;
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
  -- Letter comes from the current visible stage (Phase 1: always 1 / Common).
  -- Payment counts are not read.
  stage_now := public.nova_visible_stage(null::public.nova_cards);
  rarity_name := public.nova_stage_rarity(stage_now);
  if rarity_name is null then raise exception 'Nova stage config is incomplete' using errcode = '23514'; end if;
  while not inserted loop
    attempts := attempts + 1;
    if attempts > 8 then
      raise exception 'Could not allocate a unique Nova serial' using errcode = '23505';
    end if;
    body := public.nova_birth_yy(student) || public.nova_random_digits(9);
    serial_value := public.nova_stage_letter(stage_now) || body;
    begin
      insert into public.nova_cards(owner_id, username, answers, variant, serial, serial_body, rarity)
        values (student, d.username, d.answers, 'a', serial_value, body, rarity_name)
        returning * into c;
      inserted := true;
    exception
      when unique_violation then
        get stacked diagnostics constraint_name = CONSTRAINT_NAME, message = MESSAGE_TEXT;
        if constraint_name = 'nova_cards_owner_id_key'
          or message like '%nova_cards_owner_id_key%'
          or message like '%Key (owner_id)=%' then
          select id into existing_id from public.nova_cards where owner_id = student;
          return jsonb_build_object('status', 'existing', 'cardId', existing_id);
        elsif constraint_name is distinct from 'nova_cards_serial_key'
          and constraint_name is distinct from 'nova_cards_serial_body_key'
          and message not like '%nova_cards_serial_key%'
          and message not like '%nova_cards_serial_body_key%'
          and message not like '%Key (serial)%'
          and message not like '%Key (serial_body)%' then
          raise;
        end if;
    end;
  end loop;
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

-- Shown serial and rarity follow the visible stage. The stored body is not rewritten.
-- No birth year, age, or form field is added.
create or replace function public.nova_card_payload(c public.nova_cards) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('publicId',c.public_id,
    'serial', case when c.serial_body is null then c.serial
      else public.nova_stage_letter(public.nova_visible_stage(c)) || c.serial_body end,
    'username',c.username,
    'traits',case when exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
      then null else public.nova_traits(c.answers) end,
    'variant',c.variant,
    'rarity', case when c.serial_body is null then c.rarity
      else public.nova_stage_rarity(public.nova_visible_stage(c)) end,
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

-- Same privacy gate as get_public_nova_card. Matches the permanent 11-character body
-- so a barcode printed at an earlier letter still opens the shared card. Private and
-- missing cards both return null. Legacy twelve-digit serials match in full.
create function public.get_public_nova_card_by_scan(scanned text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  c public.nova_cards;
  body text;
begin
  if scanned is null then return null; end if;
  body := case
    when scanned ~ '^[CREML][0-9]{11}$' then substr(scanned, 2)
    when scanned ~ '^[0-9]{11}$' then scanned
    else null
  end;
  select * into c from public.nova_cards
  where (body is not null and serial_body = body)
     or (scanned ~ '^[0-9]{12}$' and serial = scanned)
  limit 1;
  if c.id is null or not c.sharing then return null; end if;
  if not exists(select 1 from public.profiles p
    where p.id = c.owner_id and p.role = 'student' and p.status = 'active') then
    return null;
  end if;
  if exists(select 1 from public.nova_card_candidates k where k.card_id = c.id)
    and not exists(select 1 from public.nova_artwork a
      where a.card_id = c.id and a.stage = 1 and a.selected) then
    return null;
  end if;
  return public.nova_card_payload(c);
end;
$$;

revoke all on function public.get_public_nova_card_by_scan(text) from public;
grant execute on function public.get_public_nova_card_by_scan(text) to anon, authenticated;

create unique index nova_card_dna_variation_id_key on public.nova_card_dna (variation_id);

commit;

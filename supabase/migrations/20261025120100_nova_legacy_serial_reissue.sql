-- Review only. ONE-TIME audited reissue of every verified production legacy numeric serial.
-- Inventory checked 2026-10-25 on aojrbxoqbgyxmfljqpqj: exactly three ^[0-9]{12}$ cards.
-- Preserves owner, public_id/URL, companion identity, artwork, rarity, answers, sharing.
-- Temporarily installs a public_id allowlist gate, reissues, then REMOVES the gate forever.
-- Aborts if unexpected legacy serials remain (will not tighten CHECK over orphans).
-- Do not apply to production until explicitly approved.
begin;

-- Narrow, transaction-local gate used only inside this migration.
create or replace function public.nova_keep_identity() returns trigger
language plpgsql
set search_path = ''
as $$
declare
  reissue text := coalesce(nullif(current_setting('app.nova_serial_reissue', true), ''), '');
  allowlisted boolean;
  collectible_ok boolean;
begin
  if TG_OP = 'INSERT' then
    new.serial := private.nova_generate_collectible_serial(new.rarity);
    new.identity_spec := public.nova_identity(new.answers);
    return new;
  end if;

  allowlisted := old.public_id in (
    'f2c18bdb-9de8-44fd-89b7-61b56bb52964'::uuid,
    'edc7c758-27a0-4f3f-8718-40597a9dca95'::uuid,
    '1daf226f-9cb8-4f98-b217-aab494b476c9'::uuid
  );

  collectible_ok :=
    reissue = 'legacy-numeric-batch-v1'
    and allowlisted
    and old.serial ~ '^[0-9]{12}$'
    and new.serial ~ private.nova_collectible_serial_pattern()
    and left(new.serial, 1) = private.nova_rarity_serial_prefix(old.rarity)
    and left(new.serial, 1) = private.nova_rarity_serial_prefix(new.rarity)
    and new.rarity is not distinct from old.rarity
    and new.owner_id is not distinct from old.owner_id
    and new.public_id is not distinct from old.public_id
    and new.answers is not distinct from old.answers
    and new.identity_spec is not distinct from old.identity_spec
    and new.variant is not distinct from old.variant
    and new.username is not distinct from old.username
    and new.sharing is not distinct from old.sharing;

  if new.answers is distinct from old.answers
    or new.identity_spec is distinct from old.identity_spec
    or new.owner_id <> old.owner_id
    or new.public_id <> old.public_id
    or (new.serial is distinct from old.serial and not collectible_ok)
    or (
      new.variant is distinct from old.variant
      and exists (
        select 1 from public.nova_artwork a
        where a.card_id = old.id and a.stage = 1 and a.selected
      )
    )
  then
    raise exception 'Nova identity is permanent';
  end if;
  return new;
end;
$$;

revoke all on function public.nova_keep_identity() from public, anon, authenticated;

do $$
declare
  expected_legacy constant integer := 3;
  legacy_count integer;
  unexpected integer;
  rec record;
  v_card_id uuid;
  v_old_serial text;
  v_new_serial text;
  v_sharing boolean;
  v_answers int[];
  v_identity jsonb;
  v_variant text;
  v_art_before bigint;
  v_art_after bigint;
begin
  select count(*)::int into legacy_count
  from public.nova_cards
  where serial ~ '^[0-9]{12}$';

  -- Idempotent: already reissued and no legacy left.
  if legacy_count = 0 then
    select count(*)::int into unexpected
    from public.nova_cards
    where serial !~ private.nova_collectible_serial_pattern();
    if unexpected <> 0 then
      raise exception
        'Legacy reissue abort: % card(s) have neither legacy nor collectible serial',
        unexpected;
    end if;
    raise notice 'No legacy numeric serials remain; skipping reissue batch';
    return;
  end if;

  if legacy_count <> expected_legacy then
    raise exception
      'Legacy reissue abort: expected exactly % numeric serial(s), found %. Recheck production inventory before retry.',
      expected_legacy, legacy_count;
  end if;

  -- Any numeric serial outside the audited allowlist blocks the batch.
  select count(*)::int into unexpected
  from public.nova_cards c
  where c.serial ~ '^[0-9]{12}$'
    and c.public_id not in (
      'f2c18bdb-9de8-44fd-89b7-61b56bb52964'::uuid,
      'edc7c758-27a0-4f3f-8718-40597a9dca95'::uuid,
      '1daf226f-9cb8-4f98-b217-aab494b476c9'::uuid
    );
  if unexpected <> 0 then
    raise exception
      'Legacy reissue abort: % numeric serial(s) are not on the audited allowlist',
      unexpected;
  end if;

  for rec in
    select *
    from (
      values
        (
          'f2c18bdb-9de8-44fd-89b7-61b56bb52964'::uuid,
          'ef6fca0a-d6aa-4a24-afb5-2be16d4b9ea3'::uuid,
          '000001000000'::text,
          'Ace'::text,
          'Rare'::text
        ),
        (
          'edc7c758-27a0-4f3f-8718-40597a9dca95'::uuid,
          'd92249a6-e7d0-4753-8abf-7f5f2d95e846'::uuid,
          '000001000001'::text,
          'scaryguy'::text,
          'Rare'::text
        ),
        (
          '1daf226f-9cb8-4f98-b217-aab494b476c9'::uuid,
          '12e9a449-f96a-4872-b417-983a68c707d1'::uuid,
          '000001000002'::text,
          'john'::text,
          'Rare'::text
        )
    ) as t(public_id, owner_id, serial, username, rarity)
  loop
    v_card_id := null;
    v_old_serial := null;
    v_new_serial := null;
    v_sharing := null;
    v_answers := null;
    v_identity := null;
    v_variant := null;
    v_art_before := null;
    v_art_after := null;

    select c.id, c.serial, c.sharing, c.answers, c.identity_spec, c.variant,
           (select count(*) from public.nova_artwork a where a.card_id = c.id and a.selected)
      into v_card_id, v_old_serial, v_sharing, v_answers, v_identity, v_variant, v_art_before
    from public.nova_cards c
    where c.public_id = rec.public_id
    for update;

    if v_card_id is null then
      raise exception 'Legacy reissue abort: allowlisted card % missing', rec.public_id;
    end if;

    if v_old_serial ~ private.nova_collectible_serial_pattern() then
      raise notice 'Allowlisted card % already collectible (%); skipping', rec.public_id, v_old_serial;
      continue;
    end if;

    if v_old_serial is distinct from rec.serial
      or not exists (
        select 1 from public.nova_cards c
        where c.id = v_card_id
          and c.owner_id = rec.owner_id
          and c.username = rec.username
          and c.rarity = rec.rarity
          and c.public_id = rec.public_id
      )
    then
      raise exception
        'Legacy reissue abort: card % inventory mismatch (serial %, expected %)',
        rec.public_id, v_old_serial, rec.serial;
    end if;

    perform set_config('app.nova_serial_reissue', 'legacy-numeric-batch-v1', true);
    v_new_serial := private.nova_generate_collectible_serial(rec.rarity);

    update public.nova_cards c
    set serial = v_new_serial
    where c.id = v_card_id
      and c.public_id = rec.public_id
      and c.owner_id = rec.owner_id
      and c.serial = v_old_serial
      and c.username = rec.username
      and c.rarity = rec.rarity
      and c.sharing is not distinct from v_sharing
      and c.answers is not distinct from v_answers
      and c.identity_spec is not distinct from v_identity
      and c.variant is not distinct from v_variant;

    if not found then
      raise exception 'Legacy reissue abort: update matched no row for %', rec.public_id;
    end if;

    select count(*) into v_art_after
    from public.nova_artwork a
    where a.card_id = v_card_id and a.selected;

    if exists (
      select 1 from public.nova_cards c
      where c.id = v_card_id
        and (
          c.owner_id is distinct from rec.owner_id
          or c.public_id is distinct from rec.public_id
          or c.username is distinct from rec.username
          or c.rarity is distinct from rec.rarity
          or c.sharing is distinct from v_sharing
          or c.answers is distinct from v_answers
          or c.identity_spec is distinct from v_identity
          or c.variant is distinct from v_variant
          or c.serial is distinct from v_new_serial
        )
    ) or v_art_after is distinct from v_art_before then
      raise exception 'Legacy reissue abort: protected fields changed for %', rec.public_id;
    end if;

    insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (
      null,
      'legacy_numeric_serial_reissue',
      v_card_id,
      jsonb_build_object(
        'publicId', rec.public_id,
        'oldSerial', v_old_serial,
        'newSerial', v_new_serial,
        'gate', 'legacy-numeric-batch-v1',
        'preserved', jsonb_build_object(
          'ownerId', rec.owner_id,
          'publicId', rec.public_id,
          'username', rec.username,
          'rarity', rec.rarity,
          'sharing', v_sharing,
          'variant', v_variant,
          'selectedArtworkCount', v_art_before
        )
      )
    );

    raise notice 'Reissued % % → %', rec.public_id, v_old_serial, v_new_serial;
  end loop;

  select count(*)::int into legacy_count
  from public.nova_cards
  where serial ~ '^[0-9]{12}$';
  if legacy_count <> 0 then
    raise exception
      'Legacy reissue abort: % numeric serial(s) remain after batch; CHECK not tightened',
      legacy_count;
  end if;
end;
$$;

-- Permanent identity trigger: no serial-change exception remains after this migration.
create or replace function public.nova_keep_identity() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if TG_OP = 'INSERT' then
    new.serial := private.nova_generate_collectible_serial(new.rarity);
    new.identity_spec := public.nova_identity(new.answers);
    return new;
  end if;

  if new.answers is distinct from old.answers
    or new.identity_spec is distinct from old.identity_spec
    or new.owner_id <> old.owner_id
    or new.public_id <> old.public_id
    or new.serial is distinct from old.serial
    or (
      new.variant is distinct from old.variant
      and exists (
        select 1 from public.nova_artwork a
        where a.card_id = old.id and a.stage = 1 and a.selected
      )
    )
  then
    raise exception 'Nova identity is permanent';
  end if;
  return new;
end;
$$;

revoke all on function public.nova_keep_identity() from public, anon, authenticated;

-- Safe only after the batch verified zero legacy numeric serials remain.
alter table public.nova_cards drop constraint if exists nova_cards_serial_format_check;
alter table public.nova_cards add constraint nova_cards_serial_format_check
  check (serial ~ '^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$');

commit;

-- Review only. ONE-TIME Ace pilot serial reissue (production public_id below).
-- Preserves owner, public_id/URL, companion identity, artwork, rarity, sharing.
-- Uses the gated path in nova_keep_identity (app.nova_serial_reissue = ace-pilot-v1).
-- Idempotent: skips when the Ace card is absent (e.g. staging) or already reissued.
-- Do not apply to production until explicitly approved.
begin;

do $$
declare
  ace_public constant uuid := 'f2c18bdb-9de8-44fd-89b7-61b56bb52964';
  card_id uuid;
  card_owner uuid;
  card_username text;
  card_rarity text;
  card_public uuid;
  old_serial text;
  new_serial text;
  n integer;
begin
  select count(*)::int into n
  from public.nova_cards
  where public_id = ace_public;

  if n = 0 then
    raise notice 'Ace pilot card % not present; skipping serial reissue', ace_public;
    return;
  end if;

  if n <> 1 then
    raise exception 'Ace pilot reissue expected exactly one row for %', ace_public;
  end if;

  select c.id, c.owner_id, c.username, c.rarity, c.public_id, c.serial
    into card_id, card_owner, card_username, card_rarity, card_public, old_serial
  from public.nova_cards c
  where c.public_id = ace_public
  for update;

  if old_serial ~ private.nova_collectible_serial_pattern() then
    raise notice 'Ace pilot % already holds collectible serial %; skipping', ace_public, old_serial;
    return;
  end if;

  if old_serial !~ '^[0-9]{12}$' then
    raise exception 'Ace pilot % has unexpected serial %', ace_public, old_serial;
  end if;

  if card_username is distinct from 'Ace' then
    raise exception 'Ace pilot reissue refused: username is %', card_username;
  end if;

  if card_rarity is distinct from 'Rare' then
    raise exception 'Ace pilot reissue refused: rarity is %', card_rarity;
  end if;

  -- Transaction-local gate for nova_keep_identity; never session-wide.
  perform set_config('app.nova_serial_reissue', 'ace-pilot-v1', true);

  new_serial := private.nova_generate_collectible_serial(card_rarity);

  update public.nova_cards
  set serial = new_serial
  where id = card_id
    and public_id = ace_public
    and owner_id = card_owner
    and serial = old_serial
    and username = 'Ace'
    and rarity = 'Rare';

  if not found then
    raise exception 'Ace pilot reissue update matched no row';
  end if;

  -- Confirm identity fields other than serial are unchanged.
  if exists (
    select 1 from public.nova_cards c
    where c.id = card_id
      and (
        c.owner_id is distinct from card_owner
        or c.public_id is distinct from card_public
        or c.username is distinct from 'Ace'
        or c.rarity is distinct from 'Rare'
        or c.serial is distinct from new_serial
      )
  ) then
    raise exception 'Ace pilot reissue altered protected identity fields';
  end if;

  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
  values (
    null,
    'ace_pilot_serial_reissue',
    card_id,
    jsonb_build_object(
      'publicId', card_public,
      'oldSerial', old_serial,
      'newSerial', new_serial,
      'gate', 'ace-pilot-v1',
      'preserved', jsonb_build_object(
        'ownerId', card_owner,
        'publicId', card_public,
        'username', 'Ace',
        'rarity', 'Rare'
      )
    )
  );

  raise notice 'Ace pilot % reissued % → %', ace_public, old_serial, new_serial;
end;
$$;

-- After the one-time reissue path, only collectible serials remain valid.
alter table public.nova_cards drop constraint if exists nova_cards_serial_format_check;
alter table public.nova_cards add constraint nova_cards_serial_format_check
  check (serial ~ '^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$');

commit;

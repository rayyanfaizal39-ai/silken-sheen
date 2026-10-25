-- Review only. Cosmic Companion Stage 1 final serial format.
-- Replaces sequential numeric defaults with R-XXXXXXXX collectible serials on INSERT.
-- Does NOT reissue existing rows; keeps dual-format CHECK for legacy ^[0-9]{12}$.
-- See 20261025120100 for the audited one-time reissue of all verified legacy cards.
-- Do not apply to production until explicitly approved.
begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- Human-readable body alphabet: no O/0 or I/1.
create or replace function private.nova_serial_body_alphabet()
returns text
language sql
immutable
set search_path = ''
as $$
  select '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'::text;
$$;

create or replace function private.nova_rarity_serial_prefix(card_rarity text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case card_rarity
    when 'Common' then 'C'
    when 'Rare' then 'R'
    when 'Epic' then 'E'
    when 'Legendary' then 'L'
    else null
  end;
$$;

create or replace function private.nova_collectible_serial_pattern()
returns text
language sql
immutable
set search_path = ''
as $$
  select '^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$'::text;
$$;

-- Cryptographically secure random body + rarity prefix. Collision retries under unique(serial).
create or replace function private.nova_generate_collectible_serial(card_rarity text)
returns text
language plpgsql
set search_path = ''
as $$
declare
  alphabet constant text := private.nova_serial_body_alphabet();
  prefix text := private.nova_rarity_serial_prefix(card_rarity);
  body text;
  candidate text;
  raw bytea;
  i integer;
  attempt integer;
begin
  if prefix is null then
    raise exception 'Unknown Nova rarity' using errcode = '23514';
  end if;

  for attempt in 1..32 loop
    body := '';
    -- 8 cryptographically random bytes from a UUID v4 (available without pgcrypto).
    raw := decode(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16), 'hex');
    for i in 0..7 loop
      -- Alphabet length 32 divides 256 evenly; no modulo bias.
      body := body || substr(alphabet, (get_byte(raw, i) % 32) + 1, 1);
    end loop;
    candidate := prefix || '-' || body;
    if not exists (
      select 1 from public.nova_cards c where c.serial = candidate
    ) then
      return candidate;
    end if;
  end loop;

  raise exception 'Could not allocate a unique Nova collectible serial'
    using errcode = '23505';
end;
$$;

revoke all on function private.nova_serial_body_alphabet() from public, anon, authenticated;
revoke all on function private.nova_rarity_serial_prefix(text) from public, anon, authenticated;
revoke all on function private.nova_collectible_serial_pattern() from public, anon, authenticated;
revoke all on function private.nova_generate_collectible_serial(text) from public, anon, authenticated;

-- Stop issuing sequential serials. Existing sequence is left unused (not dropped).
alter table public.nova_cards alter column serial drop default;

-- Allow legacy 12-digit rows until the audited reissue migration tightens the check.
-- Serial remains immutable here — no reissue exception in this function.
alter table public.nova_cards drop constraint if exists nova_cards_serial_check;
alter table public.nova_cards drop constraint if exists nova_cards_serial_format_check;
alter table public.nova_cards add constraint nova_cards_serial_format_check
  check (
    serial ~ '^[0-9]{12}$'
    or serial ~ '^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$'
  );

-- Assign collectible serials on insert. Serial updates are never allowed from this trigger.
create or replace function public.nova_keep_identity() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if TG_OP = 'INSERT' then
    -- Always overwrite; clients and RPCs must never choose the serial.
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

commit;

-- REVIEW ONLY. Do not apply to production without approval.
-- Apply AFTER 20261023140000_nova_staff_craft.sql.
--
-- A shared card can open once the student has confirmed a companion, including
-- while the portrait is still being crafted. The artwork path stays empty until
-- a portrait is selected, released and approved. The lookup key remains
-- public_id. The serial is not a URL key.

begin;

create or replace function public.get_public_nova_card(requested_public_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select public.nova_card_payload(c) from public.nova_cards c
  where c.public_id = requested_public_id and c.sharing and exists(
    select 1 from public.profiles p
    where p.id=c.owner_id and p.role='student' and p.status='active'
  ) and (
    not exists(select 1 from public.nova_card_candidates k where k.card_id=c.id)
    or c.craft_slot is not null
    or exists(select 1 from public.nova_artwork a where a.card_id=c.id and a.stage=1 and a.selected)
  );
$$;

revoke all on function public.get_public_nova_card(uuid) from public;
grant execute on function public.get_public_nova_card(uuid) to anon, authenticated;

commit;

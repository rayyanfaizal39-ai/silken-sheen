-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261024130000_nova_single_companion_submit.sql.
--
-- Staff portraits live in nova_craft_art_options, not nova_artwork. The storage
-- read rule only knew about stage-1 reveal files, so createSignedUrl failed for
-- the two portraits and the companion page treated that error as "not entitled".
--
-- The owner can read both portraits until they pick, then only the chosen one.
-- A shared card exposes only the chosen portrait. The other portrait stays private.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

create or replace function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.nova_artwork a join public.nova_cards c on c.id=a.card_id
    where a.storage_path=path and exists(select 1 from public.profiles p
      where p.id=c.owner_id and p.role='student' and p.status='active') and (
      (a.stage=1 and a.selected and a.released and (c.sharing or c.owner_id=auth.uid()))
      or (c.owner_id=auth.uid() and a.stage=1 and public.nova_origin_reveal_ready(c)
        and (a.review_status is null or a.review_status='approved')
        and not exists(select 1 from public.nova_artwork chosen where chosen.card_id=c.id and chosen.stage=1 and chosen.selected))))
  or exists(
    select 1 from public.nova_craft_art_options o
    join public.nova_cards c on c.id = o.card_id
    where o.storage_path = path
      and exists(select 1 from public.profiles p
        where p.id = c.owner_id and p.role = 'student' and p.status = 'active')
      and (
        (c.owner_id = auth.uid() and (c.craft_art_choice is null or c.craft_art_choice = o.option_no))
        or (c.sharing and c.craft_art_choice = o.option_no)
      ));
$$;

commit;

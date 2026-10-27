-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261024150000_nova_admin_own_journey.sql.
--
-- One-companion craft portraits: schedule gate.
-- Students may see and choose the two staff-uploaded portraits only after
-- nova_generation_jobs.reveal_after has arrived AND both options exist.
-- Missing or null reveal_after fails closed.
--
-- Does NOT change nova_origin_reveal_ready (legacy two-companion artwork).
-- Permanently chosen craft portraits and shared chosen portraits stay readable.
-- Staff admin queue paths are unchanged.
--
-- NOVA_AI_ENABLED and NOVA_AI_BATCH_ENABLED stay off. This file removes nothing.
begin;

-- Craft workflow only: scheduled time + both attached portraits.
-- Never invents a schedule. Never uses nova_origin_reveal_ready.
create or replace function public.nova_craft_portraits_reveal_ready(c public.nova_cards)
returns boolean
language sql stable security definer set search_path = '' as $$
  select c.craft_slot is not null
    and exists (
      select 1 from public.nova_generation_jobs j
      where j.card_id = c.id
        and j.stage = 1
        and j.reveal_after is not null
        and now() >= j.reveal_after
    )
    and (select count(*) from public.nova_craft_art_options o where o.card_id = c.id) = 2;
$$;

revoke all on function public.nova_craft_portraits_reveal_ready(public.nova_cards)
  from public, anon, authenticated;
grant execute on function public.nova_craft_portraits_reveal_ready(public.nova_cards)
  to authenticated, service_role;

-- Owner may read unchosen craft options only when the craft reveal is open.
-- Chosen craft portrait (and shared chosen) stay readable. Legacy artwork
-- path still uses nova_origin_reveal_ready only.
create or replace function public.can_read_nova_artwork(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.nova_artwork a join public.nova_cards c on c.id=a.card_id
    where a.storage_path=path and exists(select 1 from public.profiles p
      where p.id=c.owner_id and p.role in ('student', 'admin') and p.status='active') and (
      (a.stage=1 and a.selected and a.released and (c.sharing or c.owner_id=auth.uid()))
      or (c.owner_id=auth.uid() and a.stage=1 and public.nova_origin_reveal_ready(c)
        and (a.review_status is null or a.review_status='approved')
        and not exists(select 1 from public.nova_artwork chosen where chosen.card_id=c.id and chosen.stage=1 and chosen.selected))))
  or exists(
    select 1 from public.nova_craft_art_options o
    join public.nova_cards c on c.id = o.card_id
    where o.storage_path = path
      and exists(select 1 from public.profiles p
        where p.id = c.owner_id and p.role in ('student', 'admin') and p.status = 'active')
      and (
        (c.owner_id = auth.uid() and c.craft_art_choice = o.option_no)
        or (c.sharing and c.craft_art_choice = o.option_no)
        or (
          c.owner_id = auth.uid()
          and c.craft_art_choice is null
          and public.nova_craft_portraits_reveal_ready(c)
        )
      ));
$$;

-- Paths only when the craft reveal is authorized. craftOptionsReady tells the
-- UI that staff finished both portraits without leaking storage paths.
create or replace function public.get_my_nova_card() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  u uuid := public.nova_require_active_student();
  c public.nova_cards;
  options_ready boolean;
  reveal_open boolean;
begin
  select * into c from public.nova_cards where owner_id = u;
  if not found then return null; end if;
  options_ready := (
    select count(*) from public.nova_craft_art_options o where o.card_id = c.id
  ) = 2;
  reveal_open := public.nova_craft_portraits_reveal_ready(c);
  return public.nova_card_payload(c) || jsonb_build_object(
    'craftOptionsReady', options_ready and c.craft_art_choice is null,
    'artOptions', case
      when c.craft_art_choice is null and reveal_open then coalesce((
        select jsonb_agg(jsonb_build_object('option', o.option_no, 'path', o.storage_path)
          order by o.option_no)
        from public.nova_craft_art_options o where o.card_id = c.id
      ), '[]'::jsonb)
      else '[]'::jsonb
    end
  );
end;
$$;

create or replace function public.nova_choose_craft_art(chosen_option integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u uuid := public.nova_require_active_student(); c public.nova_cards;
begin
  if chosen_option not in (1, 2) then raise exception 'Choose one of the two portraits'; end if;
  select * into c from public.nova_cards where owner_id = u for update;
  if c.id is null or c.craft_slot is null then
    raise exception 'Your companion is being crafted';
  end if;
  if c.craft_art_choice is not null then
    raise exception 'Your art choice is already saved';
  end if;
  if not public.nova_craft_portraits_reveal_ready(c) then
    raise exception 'Your portraits are not ready to choose yet';
  end if;
  if (select count(*) from public.nova_craft_art_options o where o.card_id = c.id) <> 2
    or not exists(select 1 from public.nova_craft_art_options o
      where o.card_id = c.id and o.option_no = chosen_option) then
    raise exception 'Your companion is being crafted';
  end if;
  update public.nova_cards set craft_art_choice = chosen_option where id = c.id;
  insert into public.nova_generation_audit(actor_id, action, subject_id, detail)
    values (u, 'craft_art_chosen', c.id, jsonb_build_object(
      'option', chosen_option, 'serial', c.serial, 'publicId', c.public_id));
  return public.get_my_nova_card();
end;
$$;

commit;

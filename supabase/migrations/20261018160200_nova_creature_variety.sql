-- REVIEW ONLY: additive choice expansion; do not apply to production without approval.
-- Existing answer codes, saved identities, ownership and generation settings stay intact.
begin;

create function public.nova_valid_answers(a integer[], complete boolean) returns boolean
language sql immutable set search_path = '' as $$
  select case
    when a is null then false
    when cardinality(a)=0 then not complete
    when array_ndims(a)<>1 or array_lower(a,1)<>1 then false
    when cardinality(a)>12 or (complete and cardinality(a)<>12) then false
    else not exists (
      select 1 from unnest(a) with ordinality as choice(value,position)
      where value is null or value<0 or value>case when position=2 then 5 else 3 end
    ) end;
$$;
revoke all on function public.nova_valid_answers(integer[],boolean) from public,anon,authenticated;
grant execute on function public.nova_valid_answers(integer[],boolean) to service_role;

alter table public.nova_cards drop constraint nova_cards_answers_check;
alter table public.nova_cards add constraint nova_cards_answers_check
  check (public.nova_valid_answers(answers,true));
alter table public.nova_studio_drafts drop constraint nova_studio_drafts_answers_check;
alter table public.nova_studio_drafts add constraint nova_studio_drafts_answers_check
  check (public.nova_valid_answers(answers,false));

-- Creature code 2 remains Phoenix forever. New visible choices use 3,4,5.
create or replace function public.nova_traits(a integer[]) returns jsonb
language sql immutable set search_path = '' as $$
  select jsonb_build_object(
    'personality', (array['Explorer','Nurturer','Strategist','Guardian'])[a[1]+1],
    'creature', (array['Phoenix','Magical Fox','Phoenix','Dragon','Lion','Unicorn'])[a[2]+1],
    'element', (array['Fire','Water','Starlight','Wind'])[a[3]+1],
    'appearance', (array['Soft and fluffy','Sleek and swift','Small and sturdy','Graceful and majestic'])[a[4]+1],
    'colours', (array['Obsidian Black / Violet','Sapphire Blue / Gold','Pearl / Rose','Emerald Green / Silver'])[a[5]+1],
    'ability', (array['Light the way','Healing currents','Stellar shield','Winds of courage'])[a[6]+1],
    'habitat', (array['Floating islands','Moonlit lagoon','Crystal forest','Ancient sky gardens'])[a[7]+1],
    'behaviour', (array['Curious and playful','Gentle and patient','Quiet and watchful','Bold and welcoming'])[a[8]+1],
    'eyes', (array['Cosmic Galaxy Eyes','Golden Starlight Eyes','Ocean Crystal Eyes','Emerald Aurora Eyes'])[a[9]+1],
    'marking', (array['A glowing forehead star','Golden ear tips','A crescent marking','A shimmering spiral'])[a[10]+1],
    'approach', (array['Try a new path','Bring friends together','Pause and make a plan','Trust your instincts'])[a[11]+1],
    'bond', (array['Explore together','Grow together','Protect each other','Inspire each other'])[a[12]+1]);
$$;
revoke all on function public.nova_traits(integer[]) from public, anon, authenticated;


commit;

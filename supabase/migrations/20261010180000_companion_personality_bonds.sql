-- Cosmetic companion preferences only: no quiz rewards or XP are modified.
create table public.companion_bonds (
  user_id uuid primary key references auth.users(id) on delete cascade,
  bond jsonb not null,
  constraint companion_bond_shape check (
    jsonb_typeof(bond) = 'object'
    and bond ?& array['version', 'personality', 'answers', 'name', 'completedAt']
    and bond -> 'version' = '1'::jsonb
    and jsonb_typeof(bond -> 'personality') = 'string'
    and bond ->> 'personality' in ('curious', 'steady', 'brave', 'playful')
    and jsonb_typeof(bond -> 'answers') = 'array'
    and jsonb_array_length(bond -> 'answers') = 5
    and (bond -> 'answers') <@ '["curious", "steady", "brave", "playful"]'::jsonb
    and jsonb_typeof(bond -> 'name') = 'string'
    and char_length(btrim(bond ->> 'name')) between 1 and 24
    and jsonb_typeof(bond -> 'completedAt') = 'string'
    and octet_length(bond::text) <= 2048
  )
);

alter table public.companion_bonds enable row level security;
revoke all on public.companion_bonds from public, anon, authenticated;
grant select, insert, update on public.companion_bonds to authenticated;

create policy "Students read their own Nova bond"
  on public.companion_bonds for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Students create their own Nova bond"
  on public.companion_bonds for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Students update their own Nova bond"
  on public.companion_bonds for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

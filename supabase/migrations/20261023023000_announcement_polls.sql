-- Polls attached to a Mission Control announcement.
--
-- The announcement (type 'poll') is the question students see. Options and the
-- close time live in their own tables. A signed-in student may cast one vote
-- and may change it until closes_at. A null closes_at stays open while the
-- announcement is live. After close, the vote is frozen.
--
-- Individual votes are private. announcement_poll_ballots() returns counts
-- per option and, for the caller only, which option they chose.
--
-- Idempotent: safe to run more than once. Does not edit earlier migrations.

alter table public.announcements drop constraint if exists announcements_type_check;
alter table public.announcements
  add constraint announcements_type_check
  check (type in ('news', 'reminder', 'urgent', 'event', 'poll'));

create table if not exists public.announcement_polls (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null unique references public.announcements (id) on delete cascade,
  closes_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.announcement_poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.announcement_polls (id) on delete cascade,
  label text not null,
  sort_order integer not null default 0,
  constraint announcement_poll_options_label_check check (char_length(btrim(label)) between 1 and 80),
  constraint announcement_poll_options_sort_check check (sort_order >= 0),
  constraint announcement_poll_options_label_unique unique (poll_id, label)
);

create table if not exists public.announcement_poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.announcement_polls (id) on delete cascade,
  option_id uuid not null references public.announcement_poll_options (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint announcement_poll_votes_one_per_student unique (poll_id, user_id)
);

create index if not exists announcement_poll_options_order_idx
  on public.announcement_poll_options (poll_id, sort_order);

create index if not exists announcement_poll_votes_option_idx
  on public.announcement_poll_votes (option_id);

comment on table public.announcement_polls is
  'One poll per announcement. Students may change a vote until closes_at.';
comment on table public.announcement_poll_options is
  'Choices for an announcement poll. Service role writes these.';
comment on table public.announcement_poll_votes is
  'One row per signed-in student per poll. Students cannot read anyone else''s row.';

create or replace function public.announcement_poll_vote_allowed(p_poll_id uuid, p_option_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and role = 'student'
    )
    and exists (
      select 1
      from public.announcement_poll_options o
      where o.id = p_option_id
        and o.poll_id = p_poll_id
    )
    and exists (
      select 1
      from public.announcement_polls p
      join public.announcements a on a.id = p.announcement_id
      where p.id = p_poll_id
        and (p.closes_at is null or p.closes_at > now())
        and a.published = true
        and a.starts_at <= now()
        and (a.expires_at is null or a.expires_at > now())
    );
$$;

create or replace function public.protect_announcement_poll_vote()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.user_id is distinct from old.user_id or new.poll_id is distinct from old.poll_id then
    raise exception 'A poll vote cannot change student or poll';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists protect_announcement_poll_vote on public.announcement_poll_votes;
create trigger protect_announcement_poll_vote
  before update on public.announcement_poll_votes
  for each row execute function public.protect_announcement_poll_vote();

create or replace function public.announcement_poll_ballots()
returns table (
  announcement_id uuid,
  poll_id uuid,
  option_id uuid,
  label text,
  sort_order integer,
  votes bigint,
  closes_at timestamptz,
  my_option_id uuid
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    p.announcement_id,
    p.id,
    o.id,
    o.label,
    o.sort_order,
    count(v.id)::bigint,
    p.closes_at,
    mine.option_id
  from public.announcement_polls p
  join public.announcements a on a.id = p.announcement_id
  join public.announcement_poll_options o on o.poll_id = p.id
  left join public.announcement_poll_votes v on v.option_id = o.id
  left join lateral (
    select v2.option_id
    from public.announcement_poll_votes v2
    where v2.poll_id = p.id
      and v2.user_id = (select auth.uid())
  ) mine on true
  where a.published = true
    and a.starts_at <= now()
    and (a.expires_at is null or a.expires_at > now())
  group by p.announcement_id, p.id, o.id, o.label, o.sort_order, p.closes_at, mine.option_id
  order by p.announcement_id, o.sort_order, o.id;
$$;

comment on function public.announcement_poll_ballots() is
  'Counts per option for live announcement polls, plus the caller''s own choice. Does not return other students'' votes.';

alter table public.announcement_polls enable row level security;
alter table public.announcement_poll_options enable row level security;
alter table public.announcement_poll_votes enable row level security;

revoke all on table public.announcement_polls from public, anon, authenticated;
revoke all on table public.announcement_poll_options from public, anon, authenticated;
revoke all on table public.announcement_poll_votes from public, anon, authenticated;

grant select on table public.announcement_polls to anon, authenticated;
grant select on table public.announcement_poll_options to anon, authenticated;
grant select, insert, update on table public.announcement_poll_votes to authenticated;

grant select, insert, update, delete on table public.announcement_polls to service_role;
grant select, insert, update, delete on table public.announcement_poll_options to service_role;
grant select, insert, update, delete on table public.announcement_poll_votes to service_role;

drop policy if exists "Live polls are publicly readable" on public.announcement_polls;
create policy "Live polls are publicly readable"
  on public.announcement_polls
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.announcements a
      where a.id = announcement_id
        and a.published = true
        and a.starts_at <= now()
        and (a.expires_at is null or a.expires_at > now())
    )
  );

drop policy if exists "Live poll options are publicly readable" on public.announcement_poll_options;
create policy "Live poll options are publicly readable"
  on public.announcement_poll_options
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.announcement_polls p
      where p.id = poll_id
    )
  );

drop policy if exists "Students can read their own poll vote" on public.announcement_poll_votes;
create policy "Students can read their own poll vote"
  on public.announcement_poll_votes
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Students can vote on an open poll" on public.announcement_poll_votes;
create policy "Students can vote on an open poll"
  on public.announcement_poll_votes
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and public.announcement_poll_vote_allowed(poll_id, option_id)
  );

drop policy if exists "Students can change an open poll vote" on public.announcement_poll_votes;
create policy "Students can change an open poll vote"
  on public.announcement_poll_votes
  for update
  to authenticated
  using (
    user_id = (select auth.uid())
    and public.announcement_poll_vote_allowed(poll_id, option_id)
  )
  with check (
    user_id = (select auth.uid())
    and public.announcement_poll_vote_allowed(poll_id, option_id)
  );

revoke all on function public.announcement_poll_vote_allowed(uuid, uuid) from public, anon;
grant execute on function public.announcement_poll_vote_allowed(uuid, uuid) to authenticated;

revoke all on function public.protect_announcement_poll_vote() from public, anon;
grant execute on function public.protect_announcement_poll_vote() to authenticated, service_role;

revoke all on function public.announcement_poll_ballots() from public;
grant execute on function public.announcement_poll_ballots() to anon, authenticated, service_role;

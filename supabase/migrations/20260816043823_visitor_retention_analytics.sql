-- Privacy-conscious first-party visitor analytics.
-- Anonymous browsers can append events, but only administrators can read them.

create table public.visitor_events (
  id bigint generated always as identity primary key,
  visitor_id uuid not null,
  session_id uuid not null,
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  path text not null,
  referrer_host text,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint visitor_events_event_name_check
    check (event_name ~ '^[a-z][a-z0-9_]{0,63}$'),
  constraint visitor_events_path_check
    check (left(path, 1) = '/' and length(path) <= 512),
  constraint visitor_events_referrer_host_check
    check (referrer_host is null or length(referrer_host) <= 253),
  constraint visitor_events_properties_object_check
    check (jsonb_typeof(properties) = 'object'),
  constraint visitor_events_properties_size_check
    check (octet_length(properties::text) <= 4096)
);

comment on table public.visitor_events is
  'First-party page and funnel events for both anonymous and signed-in visitors. No email, name, raw IP address, or full referrer URL is stored.';

create index visitor_events_created_at_idx
  on public.visitor_events (created_at desc);

create index visitor_events_visitor_created_idx
  on public.visitor_events (visitor_id, created_at desc);

create index visitor_events_event_created_idx
  on public.visitor_events (event_name, created_at desc);

create index visitor_events_user_created_idx
  on public.visitor_events (user_id, created_at desc)
  where user_id is not null;

alter table public.visitor_events enable row level security;

revoke all on table public.visitor_events from public, anon, authenticated;
grant insert on table public.visitor_events to anon, authenticated;
grant select on table public.visitor_events to authenticated;
grant usage, select on sequence public.visitor_events_id_seq to anon, authenticated;

create policy "Anonymous visitors can append anonymous analytics"
  on public.visitor_events
  for insert
  to anon
  with check (user_id is null and (select auth.uid()) is null);

create policy "Signed-in visitors can append their own analytics"
  on public.visitor_events
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Administrators can read visitor analytics"
  on public.visitor_events
  for select
  to authenticated
  using ((select public.is_admin()));

-- RLS remains in force because this function is SECURITY INVOKER. Non-admin
-- callers receive an empty aggregate, while administrators can inspect all rows.
create or replace function public.get_visitor_analytics(p_days integer default 30)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with
  params as (
    select
      greatest(1, least(coalesce(p_days, 30), 365))::integer as days,
      current_date as today
  ),
  window_events as (
    select e.*
    from public.visitor_events e
    cross join params p
    where e.created_at >= p.today - (p.days - 1) * interval '1 day'
      and e.created_at < p.today + interval '1 day'
  ),
  visitor_days as (
    select distinct visitor_id, created_at::date as active_day
    from window_events
  ),
  first_seen as (
    select visitor_id, min(created_at::date) as first_day
    from public.visitor_events
    group by visitor_id
  ),
  retention as (
    select
      offset_days,
      count(*) filter (where eligible) as eligible_visitors,
      count(*) filter (where eligible and retained) as retained_visitors
    from (
      select
        offsets.offset_days,
        fs.visitor_id,
        fs.first_day <= p.today - offsets.offset_days as eligible,
        exists (
          select 1
          from public.visitor_events returned
          where returned.visitor_id = fs.visitor_id
            and returned.created_at >= fs.first_day + offsets.offset_days
            and returned.created_at < fs.first_day + offsets.offset_days + 1
        ) as retained
      from first_seen fs
      cross join params p
      cross join (values (1), (7), (30)) as offsets(offset_days)
      where fs.first_day >= p.today - (p.days - 1)
    ) cohorts
    group by offset_days
  ),
  daily as (
    select
      series.day::date as day,
      count(distinct we.visitor_id) as visitors,
      count(distinct we.session_id) as sessions,
      count(*) filter (where we.event_name = 'page_view') as page_views,
      count(distinct we.visitor_id) filter (
        where we.event_name = 'explore_clicked' or we.path = '/explore-academy'
      ) as explore_visitors
    from params p
    cross join lateral generate_series(
      p.today - (p.days - 1),
      p.today,
      interval '1 day'
    ) as series(day)
    left join window_events we on we.created_at::date = series.day::date
    group by series.day
    order by series.day
  ),
  top_paths as (
    select path, count(*) as views, count(distinct visitor_id) as visitors
    from window_events
    where event_name = 'page_view'
    group by path
    order by views desc, path
    limit 10
  )
  select jsonb_build_object(
    'days', (select days from params),
    'unique_visitors', (select count(distinct visitor_id) from window_events),
    'sessions', (select count(distinct session_id) from window_events),
    'page_views', (select count(*) from window_events where event_name = 'page_view'),
    'returning_visitors', (
      select count(*) from (
        select visitor_id from visitor_days group by visitor_id having count(*) > 1
      ) returning_visitor_rows
    ),
    'explore_visitors', (
      select count(distinct visitor_id) from window_events
      where event_name = 'explore_clicked' or path = '/explore-academy'
    ),
    'login_visitors', (
      select count(distinct visitor_id) from window_events where path = '/login'
    ),
    'authenticated_visitors', (
      select count(distinct visitor_id) from window_events where user_id is not null
    ),
    'retention', coalesce((
      select jsonb_object_agg(
        'day_' || offset_days,
        jsonb_build_object(
          'eligible', eligible_visitors,
          'retained', retained_visitors,
          'rate', case
            when eligible_visitors = 0 then null
            else round(retained_visitors::numeric * 100 / eligible_visitors, 1)
          end
        )
      ) from retention
    ), '{}'::jsonb),
    'daily', coalesce((
      select jsonb_agg(jsonb_build_object(
        'day', day,
        'visitors', visitors,
        'sessions', sessions,
        'page_views', page_views,
        'explore_visitors', explore_visitors
      ) order by day) from daily
    ), '[]'::jsonb),
    'top_paths', coalesce((
      select jsonb_agg(jsonb_build_object(
        'path', path,
        'views', views,
        'visitors', visitors
      ) order by views desc, path) from top_paths
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.get_visitor_analytics(integer) from public, anon;
grant execute on function public.get_visitor_analytics(integer) to authenticated;

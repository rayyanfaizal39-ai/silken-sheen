-- Service-role-only delivery-attempt ledger used to prevent authenticated
-- email endpoints from becoming bulk-mail relays. It contains only a one-way
-- recipient hash, never the address.
create table if not exists public.email_delivery_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  flow text not null check (flow in ('parent_report')),
  recipient_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists email_delivery_attempts_user_flow_created_idx
  on public.email_delivery_attempts (user_id, flow, created_at desc);

alter table public.email_delivery_attempts enable row level security;
revoke all on table public.email_delivery_attempts from public, anon, authenticated;
grant all on table public.email_delivery_attempts to service_role;
grant usage, select on sequence public.email_delivery_attempts_id_seq to service_role;

comment on table public.email_delivery_attempts is
  'Server-only rate-limit ledger for user-triggered transactional email.';

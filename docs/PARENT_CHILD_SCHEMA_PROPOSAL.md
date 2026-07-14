# Parent–child relationship proposal

Status: proposal only. This has not been applied to Supabase.

The current schema has student profiles and progress, but no trusted way to
link a parent account to a child account. Until that relationship exists, the
Parent Dashboard must not query another user's `profiles`, `user_progress`, or
`quiz_history` rows.

## Minimum relationship

```sql
create table public.parent_student_links (
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'revoked')),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  primary key (parent_id, student_id),
  check (parent_id <> student_id)
);
```

Before production use, add RLS so parents can read only their own link rows,
students can see links addressed to them, and analytics access is allowed only
when an `active` link exists. Link acceptance should be performed by the child
or a server-side invite flow; a parent must never be able to activate a link
unilaterally. The existing own-row policies on `profiles`, `user_progress`, and
`quiz_history` would also need narrowly scoped parent-read policies based on
this table.

The account model also needs a parent role (or an equivalent trusted account
type) and a real six-tier subscription value. Today `profiles.role` has no
`parent` option and `profiles.plan` stores only `free` or `paid`.

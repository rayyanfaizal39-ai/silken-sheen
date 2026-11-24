-- Forward-only. Do not apply until reviewed.
-- Removes the session setting app.allow_registered_grade_change.
-- Any signed-in user can set a custom session value, so it cannot authorize
-- a grade change. Existing rows are not updated. Admins, service_role,
-- postgres, and supabase_admin can still correct a grade.

create or replace function public.protect_registered_grade()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  junior text[] := array['Form 1', 'Form 2', 'Form 3'];
  senior text[] := array['Form 4', 'Form 5'];
  allowed text[] := array['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'];
  privileged boolean;
begin
  privileged :=
    public.is_admin()
    or coalesce(auth.role(), '') = 'service_role'
    or current_user in ('postgres', 'supabase_admin', 'service_role');
  if privileged then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.form is null or new.form = any (allowed) then
      return new;
    end if;
    new.form := null;
    return new;
  end if;
  if new.form is not distinct from old.form then
    return new;
  end if;
  if new.form is null and old.form = any (senior) then
    new.form := old.form;
    return new;
  end if;
  if old.form is null and (new.form is null or new.form = any (allowed)) then
    return new;
  end if;
  if old.form = any (junior) and new.form = any (junior) then
    return new;
  end if;
  new.form := old.form;
  return new;
end;
$$;

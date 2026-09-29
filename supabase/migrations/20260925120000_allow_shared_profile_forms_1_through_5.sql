-- Widen shared profile completion so Form 4 and Form 5 can be stored on the
-- existing profiles row. Junior still offers only Form 1–3 in the app.
-- Existing rows are not rewritten. The completion trigger is left in place
-- and still validates form only on the first completion transition.

begin;

comment on column public.profiles.form is
  'KSSM form level. Shared profiles accept Form 1 through Form 5.';

create or replace function public.validate_explorer_profile_completion()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  completing boolean;
  school_changed boolean;
begin
  if tg_op = 'INSERT' then
    completing := new.onboarding_completed;
    school_changed := new.school_id is not null;
  else
    completing := new.onboarding_completed and not old.onboarding_completed;
    school_changed := new.school_id is distinct from old.school_id;
  end if;

  if completing then
    new.full_name := btrim(coalesce(new.full_name, ''));
    if nullif(new.full_name, '') is null then
      raise exception 'Display name is required' using errcode = '23514';
    end if;
    if char_length(new.full_name) > 80 then
      raise exception 'Display name must be 80 characters or fewer'
        using errcode = '22023';
    end if;
    if new.age is null then
      raise exception 'Age is required' using errcode = '23514';
    end if;
    if new.form is null or new.form not in ('Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5') then
      raise exception 'Form level must be Form 1, Form 2, Form 3, Form 4, or Form 5'
        using errcode = '23514';
    end if;
    if new.school_id is null then
      raise exception 'A verified school is required' using errcode = '23514';
    end if;
  end if;

  if school_changed and new.school_id is not null and not exists (
    select 1
    from public.schools s
    where s.id = new.school_id
      and s.active
  ) then
    raise exception 'Choose an active verified school' using errcode = '23503';
  end if;

  if tg_op = 'UPDATE'
    and old.school_id is not null
    and new.school_id is null
    and new.onboarding_completed
  then
    raise exception 'A completed Explorer Profile must retain a verified school'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

revoke all on function public.validate_explorer_profile_completion() from public;

commit;

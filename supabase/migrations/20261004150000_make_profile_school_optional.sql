-- School is optional. profiles.school_id is already nullable; the only database
-- rule that forced a school was the Explorer Profile completion trigger. This
-- removes just the two "school required" rules. NULL means "not provided" and is
-- never converted to Home School or any placeholder school record.
-- Unchanged: display name, age and form validation on completion, and the
-- requirement that a non-null school_id references an active verified school.

begin;

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
  end if;

  if school_changed and new.school_id is not null and not exists (
    select 1
    from public.schools s
    where s.id = new.school_id
      and s.active
  ) then
    raise exception 'Choose an active verified school' using errcode = '23503';
  end if;

  return new;
end;
$$;

revoke all on function public.validate_explorer_profile_completion() from public;

comment on column public.profiles.school_id is
  'Optional verified school. NULL means not provided; never a placeholder or Home School fallback.';

commit;

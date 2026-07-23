alter table public.notes_reading_progress
  add column if not exists section_progress jsonb not null default '{}'::jsonb;

create or replace function public.merge_notes_section_progress(
  previous jsonb,
  incoming jsonb
)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select coalesce(
    jsonb_object_agg(
      keys.section_id,
      greatest(
        coalesce((previous ->> keys.section_id)::numeric, 0),
        coalesce((incoming ->> keys.section_id)::numeric, 0)
      )
    ),
    '{}'::jsonb
  )
  from (
    select jsonb_object_keys(coalesce(previous, '{}'::jsonb)) as section_id
    union
    select jsonb_object_keys(coalesce(incoming, '{}'::jsonb)) as section_id
  ) keys;
$$;

create or replace function public.keep_notes_progress_monotonic()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.section_progress := public.merge_notes_section_progress(
    old.section_progress,
    new.section_progress
  );
  if old.section_progress = '{}'::jsonb and new.section_progress <> '{}'::jsonb then
    new.completed := new.progress_percent >= 100;
  else
    new.progress_percent := greatest(old.progress_percent, new.progress_percent);
    new.completed := old.completed or new.completed or new.progress_percent >= 100;
  end if;
  new.last_read_at := greatest(old.last_read_at, new.last_read_at);
  return new;
end;
$$;

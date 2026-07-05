-- Admin-only staging area for raw source material (PDF/image/DOCX/TXT) that
-- will later feed the Notes/Quiz/Flashcard/Mindmap generation pipeline.

create table if not exists public.content_library (
  id uuid primary key default gen_random_uuid(),

  -- file identity (Supabase Storage, bucket "content-library")
  file_path text not null,              -- storage object path
  file_name text not null,              -- original filename
  file_type text not null,              -- mime type
  file_size bigint not null default 0,  -- bytes

  -- metadata form
  title text not null,
  subject text,
  form text,
  chapter text,
  topic text,
  language text,
  source_type text,
  tags text[] not null default '{}',

  -- pipeline state
  status text not null default 'uploaded'
    check (status in (
      'uploaded', 'processing', 'text_extracted',
      'ready_for_generation', 'generated', 'published', 'failed'
    )),
  extracted_text text,   -- filled in once a future OCR/parse step runs
  error_message text,    -- set when status = 'failed'

  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_library_status_idx on public.content_library(status);
create index if not exists content_library_subject_form_idx on public.content_library(subject, form);

alter table public.content_library enable row level security;

-- Admin-only table end to end — this is a back-office staging area, never
-- read by students, so every operation reuses the existing is_admin() helper
-- (same one already protecting profiles/payments admin reads).
create policy "Admins can read content_library"
  on public.content_library for select
  using (is_admin());

create policy "Admins can insert content_library"
  on public.content_library for insert
  with check (is_admin());

create policy "Admins can update content_library"
  on public.content_library for update
  using (is_admin())
  with check (is_admin());

create policy "Admins can delete content_library"
  on public.content_library for delete
  using (is_admin());

-- Keep updated_at current on every row change.
create or replace function public.set_content_library_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_library_set_updated_at on public.content_library;
create trigger content_library_set_updated_at
  before update on public.content_library
  for each row execute function public.set_content_library_updated_at();

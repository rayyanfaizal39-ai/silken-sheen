-- Content-library records are shared curriculum/admin assets, not student-owned
-- data. Preserve the record if its uploader account is deleted and clear only
-- the optional attribution that currently blocks auth.users deletion.
alter table public.content_library
  drop constraint if exists content_library_uploaded_by_fkey;

alter table public.content_library
  add constraint content_library_uploaded_by_fkey
  foreign key (uploaded_by)
  references auth.users(id)
  on delete set null;

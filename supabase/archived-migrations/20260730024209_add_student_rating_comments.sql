alter table public.student_ratings
  add column comment text,
  add column comment_status text not null default 'none';

alter table public.student_ratings
  add constraint student_ratings_comment_length_check
    check (comment is null or char_length(comment) <= 300),
  add constraint student_ratings_comment_status_check
    check (comment_status in ('none', 'pending', 'approved', 'rejected'));

notify pgrst, 'reload schema';

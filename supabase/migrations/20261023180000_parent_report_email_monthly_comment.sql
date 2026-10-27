-- The parent address is the monthly progress report destination.
-- Payment reminders stay on the student account email.

comment on column public.profiles.parent_report_email is
  'Optional parent or guardian address for the monthly progress report. A valid address receives that report. Null or an invalid value sends it to the student account email. Payment reminders always go to the student account email.';

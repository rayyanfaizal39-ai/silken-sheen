-- Allow trusted auth app_metadata to recognize admins as well as the
-- persisted profiles.role field. This preserves RLS while covering users who
-- were provisioned as admins in auth metadata but whose profile row is not yet
-- synced.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND (
        role = 'admin'
        OR coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
      )
  );
$$;

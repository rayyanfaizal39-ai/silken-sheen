-- Make admin detection rely on the persisted profiles.role value only.
-- This keeps frontend guard and database RLS on the same source of truth,
-- while avoiding recursion through profiles RLS and guarding against
-- whitespace/casing issues in legacy rows.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND lower(btrim(coalesce(p.role, ''))) = 'admin'
  );
$$;

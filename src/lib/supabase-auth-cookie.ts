export const SUPABASE_AUTH_COOKIE_NAME = "academy-auth-v1";

export const SUPABASE_AUTH_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: false,
  maxAge: 400 * 24 * 60 * 60,
};

const EXISTING_ACCOUNT_CODES = new Set(["email_exists", "user_already_exists"]);

type AuthErrorLike = {
  code?: unknown;
  message?: unknown;
};

/**
 * Supabase may return either an Auth error or an obfuscated success when an
 * email is already registered. Keep the legacy message fallback for older
 * GoTrue responses, but prefer the stable error code when it is available.
 */
export function isExistingAccountSignUpError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const { code, message } = error as AuthErrorLike;
  if (typeof code === "string" && EXISTING_ACCOUNT_CODES.has(code)) return true;

  return typeof message === "string" && message.trim().toLowerCase() === "user already registered";
}

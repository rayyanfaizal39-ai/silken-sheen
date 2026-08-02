export const RECOVERY_SESSION_COOKIE = "academy-recovery-v1";

/** Allows local application paths, never schemes, protocol-relative URLs, or backslashes. */
export function isInternalPath(value: string | null): value is string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return false;
  }
  try {
    const parsed = new URL(value, "https://academy.invalid");
    return parsed.origin === "https://academy.invalid";
  } catch {
    return false;
  }
}

export function passwordStrengthError(password: string): string | null {
  if (password.length < 10) return "Use at least 10 characters.";
  if (!/[a-z]/.test(password)) return "Add at least one lowercase letter.";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter.";
  if (!/\d/.test(password)) return "Add at least one number.";
  return null;
}

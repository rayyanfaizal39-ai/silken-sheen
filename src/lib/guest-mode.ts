// Guest mode lets a signed-out visitor into the student experience
// (routes gated by STUDENT_PROTECTED_ROUTES in onboarding-routing.ts)
// without a Supabase session. Progress for guests already lives entirely in
// localStorage (see use-progress.ts) — this flag only widens the route
// guard, it does not grant any authenticated or paid capability.
const GUEST_MODE_STORAGE_KEY = "academy_guest_mode";

export function enableGuestMode(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GUEST_MODE_STORAGE_KEY, "1");
  } catch {
    // Storage unavailable (private browsing, disabled storage) — guest mode
    // just won't survive a refresh in that case.
  }
}

/** Called once a real Supabase session is established, so a stale guest flag never blocks a signed-in user's sync. */
export function clearGuestMode(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(GUEST_MODE_STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
}

export function isGuestMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(GUEST_MODE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Single source of truth for whether learning/progress data may be written
 * to Supabase: only a real authenticated user id, and never while the guest
 * flag is set. Every progress-writing function must check this before it
 * touches the database.
 */
export function canPersistProgress(userId: string | null | undefined): boolean {
  return Boolean(userId) && !isGuestMode();
}

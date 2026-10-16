// Client-side carrier for a partner ?ref= code between the landing page and
// the first signed-in request. The database decides eligibility and locks the
// first eligible partner (partner_claim_referral); this only remembers the code
// through navigation and the Google OAuth round trip (same www origin).

export const PARTNER_ATTRIBUTION_KEY = "academy:partner-attribution";
export const PARTNER_ATTRIBUTION_TTL = 60 * 24 * 60 * 60 * 1000;
type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function normalizePartnerCode(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const code = value.trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9_-]{2,39}$/.test(code) ? code : undefined;
}

/** The stored, unexpired code, or undefined (clearing expired/malformed data). */
export function storedPartnerCode(storage: StorageLike, now = Date.now()) {
  try {
    const raw = storage.getItem(PARTNER_ATTRIBUTION_KEY);
    if (!raw) return undefined;
    const saved = JSON.parse(raw);
    const code = normalizePartnerCode(saved?.code);
    if (
      !code ||
      typeof saved.expiresAt !== "number" ||
      saved.expiresAt <= now ||
      saved.expiresAt > now + PARTNER_ATTRIBUTION_TTL
    ) {
      storage.removeItem(PARTNER_ATTRIBUTION_KEY);
      return undefined;
    }
    return code;
  } catch {
    try {
      storage.removeItem(PARTNER_ATTRIBUTION_KEY);
    } catch {
      /* Browsers may block storage. */
    }
    return undefined;
  }
}

/**
 * Remember ?ref= from the current URL. First touch wins: a different code
 * never replaces an unexpired one, so the original referring partner is kept.
 */
export function capturePartnerReference(href: string, storage: StorageLike, now = Date.now()) {
  const code = normalizePartnerCode(
    new URL(href, "https://www.myacademy.my").searchParams.get("ref"),
  );
  if (!code) return undefined;
  const existing = storedPartnerCode(storage, now);
  if (existing) return existing;
  try {
    storage.setItem(
      PARTNER_ATTRIBUTION_KEY,
      JSON.stringify({ code, expiresAt: now + PARTNER_ATTRIBUTION_TTL }),
    );
  } catch {
    /* Browsers may block storage. */
  }
  return code;
}

/** Code to submit for a signed-in student: stored first-touch, else the URL. */
export function checkoutPartnerCode(href: string, storage: StorageLike, now = Date.now()) {
  return (
    capturePartnerReference(href, storage, now) ??
    storedPartnerCode(storage, now)
  );
}

export function clearPartnerReference(storage: StorageLike) {
  try {
    storage.removeItem(PARTNER_ATTRIBUTION_KEY);
  } catch {
    /* Browsers may block storage. */
  }
}

/** Server answers after which the stored code has served its purpose. */
export function isFinalClaimResult(result: unknown) {
  if (!result || typeof result !== "object") return false;
  const { claimed, reason } = result as { claimed?: unknown; reason?: unknown };
  return (
    claimed === true ||
    ["already_attributed", "invalid_code", "self_referral", "not_student", "existing_customer"].includes(
      String(reason),
    )
  );
}

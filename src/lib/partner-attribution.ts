// Private client-side carrier for a partner ?ref= code. It is never shown to
// the learner and never claims anything: the server claims it at checkout for
// the authenticated purchaser (partner_claim_referral), so whichever account
// happened to be signed in when the link was opened is never attributed.

export const PARTNER_ATTRIBUTION_KEY = "academy:partner-attribution";
export const PARTNER_ATTRIBUTION_TTL = 60 * 24 * 60 * 60 * 1000;
export type PartnerIntent = { code: string; expiresAt: number };
type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function normalizePartnerCode(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const code = value.trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9_-]{2,39}$/.test(code) ? code : undefined;
}

/** The stored, unexpired code, or undefined (clearing expired/malformed data). */
export function storedPartnerIntent(
  storage: StorageLike,
  now = Date.now(),
): PartnerIntent | undefined {
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
    return { code, expiresAt: saved.expiresAt };
  } catch {
    try {
      storage.removeItem(PARTNER_ATTRIBUTION_KEY);
    } catch {
      /* Browsers may block storage. */
    }
    return undefined;
  }
}

export function storedPartnerCode(storage: StorageLike, now = Date.now()) {
  return storedPartnerIntent(storage, now)?.code;
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

/** Code to submit for the purchaser: stored first-touch, else the URL. */
export function checkoutPartnerCode(href: string, storage: StorageLike, now = Date.now()) {
  return capturePartnerReference(href, storage, now) ?? storedPartnerCode(storage, now);
}

export function clearPartnerReference(storage: StorageLike) {
  try {
    storage.removeItem(PARTNER_ATTRIBUTION_KEY);
  } catch {
    /* Browsers may block storage. */
  }
}

/** Same-origin path without ?ref=, or undefined when there is nothing to hide. */
export function withoutPartnerReference(href: string) {
  const url = new URL(href, "https://www.myacademy.my");
  if (!url.searchParams.has("ref")) return undefined;
  url.searchParams.delete("ref");
  return `${url.pathname}${url.search}${url.hash}`;
}

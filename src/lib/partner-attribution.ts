// Client-side carrier for a partner ?ref= code between the landing page and
// the first signed-in request. The database decides eligibility and locks the
// first eligible partner (partner_claim_referral); this only remembers the code
// through navigation and the Google OAuth round trip (same www origin).

export const PARTNER_ATTRIBUTION_KEY = "academy:partner-attribution";
export const PARTNER_ATTRIBUTION_TTL = 60 * 24 * 60 * 60 * 1000;
export const PARTNER_CHOICE_KEY = "academy:partner-account-choice";
export const PARTNER_REVIEW_EVENT = "academy:review-partner-account";
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

/** Code to submit for a signed-in student: stored first-touch, else the URL. */
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

/** Consent is account-bound and tab-local. The original intent is never consumed. */
export function rememberPartnerChoice(
  intent: PartnerIntent,
  choices: StorageLike,
  userId: string,
  partnerCode: string,
) {
  choices.setItem(PARTNER_CHOICE_KEY, JSON.stringify({ ...intent, userId, partnerCode }));
}

export function clearPartnerChoice(choices: StorageLike) {
  choices.removeItem(PARTNER_CHOICE_KEY);
}

export function confirmedPartnerCode(
  intents: StorageLike,
  choices: StorageLike,
  userId: string,
  now = Date.now(),
) {
  const intent = storedPartnerIntent(intents, now);
  if (!intent) return undefined;
  try {
    const choice = JSON.parse(choices.getItem(PARTNER_CHOICE_KEY) || "null");
    return choice?.userId === userId &&
      choice.code === intent.code &&
      choice.expiresAt === intent.expiresAt
      ? normalizePartnerCode(choice.partnerCode)
      : undefined;
  } catch {
    return undefined;
  }
}

/** Keep a referral in the safe, same-origin OAuth/onboarding return destination. */
export function partnerReturnTo(href: string, code: string) {
  const destination = new URL(href, "https://www.myacademy.my");
  destination.searchParams.set("ref", code);
  return `${destination.pathname}${destination.search}${destination.hash}`;
}

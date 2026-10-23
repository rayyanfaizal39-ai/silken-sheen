/**
 * Nova serials: one rarity letter + 11 permanent characters (YY + 9 cryptographic digits).
 *
 * The letter is a loyalty signal for the card's evolution stage. It is the only
 * character that changes when the stage changes. The 11-character body stays
 * unique for the life of the card, so a scan of an older letter still resolves.
 *
 * What actually drives stage today (this module does not change it):
 * - Saved cards: public.nova_visible_stage always returns 1, and
 *   request_nova_evolution fails closed
 *   (supabase/migrations/20261018160000_nova_companion_cards.sql).
 *   nova_cards has no XP column. Phase 1 is documented in docs/nova-companion-cards.md.
 * - Fictional previews only: evolution() in model.ts maps XP thresholds on STAGES
 *   (Origin 0, Awakened 1600, Ascended 9000, Mythic 32000, Legendary 80000).
 * - Learning rank is a separate XP ladder in src/data/rankAssets.ts (getRank).
 *   It is not read by Nova cards.
 * - Billing does not move a stage. subscriptions and payment_transactions gate
 *   access and record money; they are not inputs to nova_visible_stage or evolution().
 *
 * STAGE_LOYALTY is the single config for the letter and for the unpaid proposal
 * "stage = count of successful payment_transactions, capped at 5".
 * proposedStageFromSuccessfulPayments is not called from billing or from evolution.
 * Exact thresholds are the owner's defaults below and can be edited here
 * (and in the matching nova_stage_loyalty seed) without inventing a sixth stage.
 *
 * Birth year (internal only): profiles have no date of birth. The two digits after
 * the letter are an internal code, Asia/Kuala_Lumpur:
 *   1. profiles.age → calendar year − age (can be one year off; month is not stored)
 *   2. else profiles.form, usual KSSM starting age (Form 1 = 13 … Form 5 = 17)
 *   3. else "00"
 * Show the raw serial. Do not label or explain these digits in the UI, the public
 * card page, the PNG export, API responses, or docs a student can read.
 */
export const STAGE_LOYALTY = [
  { stage: 1, name: "Origin", letter: "C", rarity: "Common", minSuccessfulPayments: 1 },
  { stage: 2, name: "Awakened", letter: "R", rarity: "Rare", minSuccessfulPayments: 2 },
  { stage: 3, name: "Ascended", letter: "E", rarity: "Epic", minSuccessfulPayments: 3 },
  { stage: 4, name: "Mythic", letter: "M", rarity: "Mythic", minSuccessfulPayments: 4 },
  { stage: 5, name: "Legendary", letter: "L", rarity: "Legendary", minSuccessfulPayments: 5 },
] as const;

export type StageLoyalty = (typeof STAGE_LOYALTY)[number];
export type NovaRarity = StageLoyalty["rarity"];
export type StageLetter = StageLoyalty["letter"];

/** Usual age at the start of a KSSM form. Used only when age is missing. */
export const FORM_TYPICAL_AGE: Record<string, number> = {
  "Form 1": 13,
  "Form 2": 14,
  "Form 3": 15,
  "Form 4": 16,
  "Form 5": 17,
};

export const BIRTH_YEAR_TIME_ZONE = "Asia/Kuala_Lumpur";

/** Legacy sequential serials, or letter + permanent 11-digit body. */
export const SERIAL_PATTERN = /^(?:[0-9]{12}|[CREML][0-9]{11})$/;
export const validSerial = (serial: string) => SERIAL_PATTERN.test(serial);

export type BirthYearProfile = { age?: number | null; form?: string | null };
export type SerialWriteError = {
  code?: string;
  message?: string;
  details?: string | null;
  constraint?: string;
};

const MAX_UINT32 = 0x1_0000_0000;

export function loyaltyForStage(stage: number): StageLoyalty {
  const row = STAGE_LOYALTY.find((entry) => entry.stage === stage);
  if (!row) throw new Error("Nova has exactly five stages");
  return row;
}

/**
 * Proposal only. Count of successful paid payments → stage, capped at 5.
 * 0 payments is below the first threshold and returns null. Not used to
 * create cards or to change nova_visible_stage.
 */
export function proposedStageFromSuccessfulPayments(count: number): number | null {
  if (!Number.isInteger(count) || count < 0) throw new Error("Payment count must be a whole number");
  let stage: number | null = null;
  for (const row of STAGE_LOYALTY) {
    if (count >= row.minSuccessfulPayments) stage = row.stage;
  }
  return stage;
}

/** Unbiased integer in [0, bound). Platform CSPRNG, not Math.random. */
export function cryptoRandomBelow(bound: number): number {
  if (!Number.isInteger(bound) || bound <= 0) throw new Error("Invalid random bound");
  if (bound === 1) return 0;
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.getRandomValues) throw new Error("Cryptographic random source is unavailable");
  const limit = Math.floor(MAX_UINT32 / bound) * bound;
  const sample = new Uint32Array(1);
  let value: number;
  do {
    cryptoObj.getRandomValues(sample);
    value = sample[0];
  } while (value >= limit);
  return value % bound;
}

export function calendarYear(now = new Date(), timeZone = BIRTH_YEAR_TIME_ZONE): number {
  const year = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric" }).format(now);
  const parsed = Number(year);
  if (!Number.isInteger(parsed)) throw new Error("Could not read the calendar year");
  return parsed;
}

function twoDigits(year: number) {
  return String(((year % 100) + 100) % 100).padStart(2, "0");
}

/** "00" means age and form were both missing — not year 1900 or 2000. */
export function birthYearDigits(
  profile: BirthYearProfile,
  now = new Date(),
  timeZone = BIRTH_YEAR_TIME_ZONE,
): string {
  const year = calendarYear(now, timeZone);
  if (typeof profile.age === "number" && Number.isInteger(profile.age)) {
    return twoDigits(year - profile.age);
  }
  const typical = profile.form ? FORM_TYPICAL_AGE[profile.form] : undefined;
  if (typical != null) return twoDigits(year - typical);
  return "00";
}

/** Nine decimal digits, uniform, from the cryptographic source. */
export function randomDigits(
  length = 9,
  randomBelow: (bound: number) => number = cryptoRandomBelow,
): string {
  if (!Number.isInteger(length) || length < 1 || length > 32) throw new Error("Invalid digit length");
  let digits = "";
  while (digits.length < length) digits += randomBelow(10).toString();
  return digits;
}

/** Permanent 11 characters of a new-format serial, or null for a legacy 12-digit serial. */
export function serialBody(serial: string): string | null {
  if (/^[CREML][0-9]{11}$/.test(serial)) return serial.slice(1);
  if (/^[0-9]{11}$/.test(serial)) return serial;
  return null;
}

export function formatNovaSerial(stage: number, birthYy: string, digits: string): string {
  if (!/^[0-9]{2}$/.test(birthYy) || !/^[0-9]{9}$/.test(digits)) {
    throw new Error("Nova serial parts must be a two-digit year and nine digits");
  }
  const serial = `${loyaltyForStage(stage).letter}${birthYy}${digits}`;
  if (!validSerial(serial)) throw new Error("Nova serial is not valid");
  return serial;
}

/**
 * Letter and rarity label for the stage currently being shown. The 11-digit
 * body is unchanged. Legacy serials are returned as stored.
 */
export function presentedIdentity(
  serial: string,
  stage: number,
  rarity: string,
): { serial: string; rarity: string } {
  const body = /^[CREML][0-9]{11}$/.test(serial) ? serial.slice(1) : null;
  if (!body) return { serial, rarity };
  const row = loyaltyForStage(stage);
  return { serial: `${row.letter}${body}`, rarity: row.rarity };
}

/** A scan matches when the permanent body matches, whatever rarity letter was printed. */
export function serialsMatch(scanned: string, cardSerial: string): boolean {
  if (scanned === cardSerial) return true;
  const scannedBody = serialBody(scanned);
  const cardBody = serialBody(cardSerial);
  return scannedBody != null && cardBody != null && scannedBody === cardBody;
}

export function isNovaOwnerConflict(error: SerialWriteError): boolean {
  const text = `${error.constraint ?? ""} ${error.message ?? ""} ${error.details ?? ""}`;
  return error.code === "23505" && /nova_cards_owner_id_key|Key \(owner_id\)=/.test(text);
}

export function isNovaSerialConflict(error: SerialWriteError): boolean {
  const text = `${error.constraint ?? ""} ${error.message ?? ""} ${error.details ?? ""}`;
  return (
    error.code === "23505" &&
    /nova_cards_serial_key|nova_cards_serial_body_key|Key \(serial\)=|Key \(serial_body\)=/.test(text)
  );
}

/**
 * Allocates one serial at the given stage and retries only when the permanent
 * body loses a uniqueness race. An owner_id conflict is `{ status: "existing" }`.
 * `stage` is the caller's current stage (Phase 1 passes 1). It is not a payment count.
 */
export async function allocateNovaSerial<T>(
  write: (serial: string, rarity: NovaRarity) => Promise<T>,
  options: {
    profile: BirthYearProfile;
    stage: number;
    randomBelow?: (bound: number) => number;
    maxAttempts?: number;
    now?: Date;
  },
): Promise<{ status: "created"; value: T } | { status: "existing" }> {
  const randomBelow = options.randomBelow ?? cryptoRandomBelow;
  const maxAttempts = options.maxAttempts ?? 8;
  const rarity = loyaltyForStage(options.stage).rarity;
  const year = birthYearDigits(options.profile, options.now);
  let last: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const serial = formatNovaSerial(options.stage, year, randomDigits(9, randomBelow));
    try {
      return { status: "created", value: await write(serial, rarity) };
    } catch (error) {
      const parsed = (error ?? {}) as SerialWriteError;
      if (isNovaOwnerConflict(parsed)) return { status: "existing" };
      if (!isNovaSerialConflict(parsed)) throw error;
      last = error;
    }
  }
  throw last instanceof Error ? last : new Error("Could not allocate a unique Nova serial");
}

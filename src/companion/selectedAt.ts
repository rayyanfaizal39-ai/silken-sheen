/**
 * Pure helpers for the companion "selectedAt" timestamp used to compute the
 * "Days Together" stat. Extracted so both the progress hook and tests can
 * exercise the normalization rules without any storage/network side effects.
 */

/** 2021-01-01T00:00:00.000Z — anything at/near the Unix epoch or before this is treated as bad data. */
const EARLIEST_PLAUSIBLE_MS = new Date("2021-01-01T00:00:00.000Z").getTime();

/** Allow a small clock-skew grace window so "now" itself is never rejected as "future". */
const FUTURE_GRACE_MS = 5 * 60 * 1000;

function isPlausibleTimestamp(ms: number, nowMs: number): boolean {
  if (!Number.isFinite(ms)) return false;
  if (ms < EARLIEST_PLAUSIBLE_MS) return false; // epoch / 1970 / implausibly old
  if (ms > nowMs + FUTURE_GRACE_MS) return false; // future dates
  return true;
}

/**
 * Returns a valid ISO timestamp for a companion's "selectedAt" field.
 * - Missing / empty / unparsable values are replaced with `now`.
 * - Unix-epoch-ish values (<= ~2020) are replaced with `now`.
 * - Implausibly old values (before 2021) are replaced with `now`.
 * - Future values are replaced with `now`.
 * - Legitimate existing dates are returned unchanged.
 */
export function normalizeSelectedAt(value: unknown, now: Date = new Date()): string {
  const nowMs = now.getTime();
  if (typeof value === "string" && value.trim().length > 0) {
    const parsedMs = new Date(value).getTime();
    if (isPlausibleTimestamp(parsedMs, nowMs)) {
      return new Date(parsedMs).toISOString();
    }
  }
  return now.toISOString();
}

/**
 * Whole days together since `iso`, always >= 1 and never negative or absurd —
 * callers should normalize `iso` with {@link normalizeSelectedAt} first.
 */
export function daysTogether(iso: string, now: Date = new Date()): number {
  const nowMs = now.getTime();
  const selectedMs = new Date(iso).getTime();
  if (!isPlausibleTimestamp(selectedMs, nowMs)) return 1;
  const days = Math.floor((nowMs - selectedMs) / (1000 * 60 * 60 * 24));
  return Math.max(1, days + 1);
}

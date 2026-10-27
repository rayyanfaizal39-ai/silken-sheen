/** Countdown helpers for the waiting sanctuary's reveal time. */
export type RevealCountdown =
  | { kind: "unknown" }
  | { kind: "counting"; days: number; hours: number; minutes: number; seconds: number }
  | { kind: "open" };

/** Time left until `revealAfter`; "open" once it has passed. Never guesses a missing date. */
export function revealCountdown(
  revealAfter: string | null | undefined,
  now: number,
): RevealCountdown {
  const at = revealAfter ? Date.parse(revealAfter) : Number.NaN;
  if (!Number.isFinite(at)) return { kind: "unknown" };
  const left = Math.floor((at - now) / 1000);
  if (left <= 0) return { kind: "open" };
  return {
    kind: "counting",
    days: Math.floor(left / 86400),
    hours: Math.floor((left % 86400) / 3600),
    minutes: Math.floor((left % 3600) / 60),
    seconds: left % 60,
  };
}

/** Reveal eligibility is decided in Malaysia time, so the date is always shown in it. */
export function malaysiaRevealTime(revealAfter: string) {
  return new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(revealAfter));
}

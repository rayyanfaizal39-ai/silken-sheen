/** Calendar month used by the AcadeMY monthly leaderboard. */
export const LEADERBOARD_TIME_ZONE = "Asia/Kuala_Lumpur";

const MONTH_KEY = /^(\d{4})-(\d{2})$/;

/**
 * `YYYY-MM` for an instant in Asia/Kuala_Lumpur.
 * Month boundaries follow Malaysia local time, including the year rollover.
 */
export function leaderboardMonthKey(instant: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(instant);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  if (!year || !month) {
    throw new Error("Unable to resolve the leaderboard month");
  }
  return `${year}-${month}`;
}

/** The Malaysia calendar month immediately before `instant`. */
export function previousLeaderboardMonthKey(instant: Date): string {
  const [yearText, monthText] = leaderboardMonthKey(instant).split("-");
  let year = Number(yearText);
  let month = Number(monthText) - 1;
  if (month < 1) {
    month = 12;
    year -= 1;
  }
  return `${year}-${String(month).padStart(2, "0")}`;
}

/** English display label for a `YYYY-MM` key. The key itself is never a month name. */
export function formatLeaderboardMonth(monthKey: string): { name: string; label: string } {
  const match = MONTH_KEY.exec(monthKey);
  if (!match) throw new Error("Invalid leaderboard month");
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) throw new Error("Invalid leaderboard month");
  const date = new Date(Date.UTC(year, month - 1, 1, 12));
  return {
    name: new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(date),
    label: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date),
  };
}

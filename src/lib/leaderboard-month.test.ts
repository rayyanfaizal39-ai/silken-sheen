import { describe, expect, it } from "vitest";
import {
  formatLeaderboardMonth,
  leaderboardMonthKey,
  previousLeaderboardMonthKey,
} from "./leaderboard-month";

describe("Malaysia leaderboard months", () => {
  it("maps October 2026 to the previous September", () => {
    const instant = new Date("2026-10-15T04:00:00.000Z");
    expect(leaderboardMonthKey(instant)).toBe("2026-10");
    expect(previousLeaderboardMonthKey(instant)).toBe("2026-09");
  });

  it("maps November 2026 to the previous October", () => {
    const instant = new Date("2026-11-15T04:00:00.000Z");
    expect(leaderboardMonthKey(instant)).toBe("2026-11");
    expect(previousLeaderboardMonthKey(instant)).toBe("2026-10");
  });

  it("maps December 2026 to the previous November", () => {
    const instant = new Date("2026-12-15T04:00:00.000Z");
    expect(leaderboardMonthKey(instant)).toBe("2026-12");
    expect(previousLeaderboardMonthKey(instant)).toBe("2026-11");
  });

  it("rolls January 2027 back to December 2026", () => {
    const instant = new Date("2027-01-15T04:00:00.000Z");
    expect(leaderboardMonthKey(instant)).toBe("2027-01");
    expect(previousLeaderboardMonthKey(instant)).toBe("2026-12");
  });

  it("changes month at Malaysia midnight, not UTC midnight", () => {
    const beforeMidnight = new Date("2026-09-30T15:59:59.000Z");
    const atMidnight = new Date("2026-09-30T16:00:00.000Z");
    expect(leaderboardMonthKey(beforeMidnight)).toBe("2026-09");
    expect(previousLeaderboardMonthKey(beforeMidnight)).toBe("2026-08");
    expect(leaderboardMonthKey(atMidnight)).toBe("2026-10");
    expect(previousLeaderboardMonthKey(atMidnight)).toBe("2026-09");
  });

  it("rolls the year at Malaysia midnight on 1 January", () => {
    const before = new Date("2026-12-31T15:59:59.000Z");
    const atNewYear = new Date("2026-12-31T16:00:00.000Z");
    expect(leaderboardMonthKey(before)).toBe("2026-12");
    expect(previousLeaderboardMonthKey(before)).toBe("2026-11");
    expect(leaderboardMonthKey(atNewYear)).toBe("2027-01");
    expect(previousLeaderboardMonthKey(atNewYear)).toBe("2026-12");
  });

  it("formats a month key without treating the key as a display name", () => {
    expect(formatLeaderboardMonth("2026-09")).toEqual({
      name: "September",
      label: "September 2026",
    });
    expect(formatLeaderboardMonth("2026-12")).toEqual({
      name: "December",
      label: "December 2026",
    });
  });
});

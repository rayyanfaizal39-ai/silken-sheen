import { describe, expect, it } from "vitest";
import { createXpProgressionEvent } from "./progression-events";

describe("progression event creation", () => {
  it("creates a small XP event while the calculated rank is unchanged", () => {
    expect(createXpProgressionEvent(4100, 4115, 123)).toEqual({
      type: "xp-gain",
      id: "xp:4100:4115",
      previousXp: 4100,
      currentXp: 4115,
      xpGained: 15,
      timestamp: 123,
    });
  });

  it("creates one rank event from the canonical rank source of truth", () => {
    expect(createXpProgressionEvent(7900, 8025, 456)).toEqual({
      type: "rank-up",
      id: "rank:7900:8025:planet-voyager:star-captain",
      fromRank: "planet-voyager",
      toRank: "star-captain",
      previousXp: 7900,
      currentXp: 8025,
      xpGained: 125,
      timestamp: 456,
    });
  });

  it("does not create events for refresh-like or decreasing snapshots", () => {
    expect(createXpProgressionEvent(8000, 8000)).toBeNull();
    expect(createXpProgressionEvent(8000, 7900)).toBeNull();
  });
});

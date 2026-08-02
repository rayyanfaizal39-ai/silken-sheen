import { describe, expect, it } from "vitest";
import {
  DAILY_MISSION_POOL,
  MISSION_POOL_VERSION,
  WEEKLY_MISSION_POOL,
  createLocalMissionState,
  getMissionWeekKey,
  missionSeed,
  selectDailyMissionIds,
  selectWeeklyMissionId,
} from "@/lib/mission-system";

const USER_ID = "1d0b0ee7-3db4-4f0e-a238-13d6dc3cba73";

describe("mission selection", () => {
  it("is deterministic for a user and local date", () => {
    const first = selectDailyMissionIds(USER_ID, "2026-08-02");
    expect(selectDailyMissionIds(USER_ID, "2026-08-02")).toEqual(first);
    expect(first).toHaveLength(3);
    expect(new Set(first).size).toBe(3);
  });

  it("selects one mission from every activity category", () => {
    const activities = selectDailyMissionIds(USER_ID, "2026-08-02")
      .map((id) => DAILY_MISSION_POOL[id].activity)
      .sort();
    expect(activities).toEqual(["flashcard", "lesson", "quiz"]);
  });

  it("rotates future daily sets where the pool permits", () => {
    const sets = new Set(
      Array.from({ length: 7 }, (_, offset) =>
        selectDailyMissionIds(USER_ID, `2026-08-${String(offset + 2).padStart(2, "0")}`).join(","),
      ),
    );
    expect(sets.size).toBeGreaterThan(1);
  });

  it("uses a stable Monday key for the whole mission week", () => {
    expect(getMissionWeekKey(new Date(2026, 7, 3, 12))).toBe("2026-08-03");
    expect(getMissionWeekKey(new Date(2026, 7, 9, 23, 59))).toBe("2026-08-03");
    expect(getMissionWeekKey(new Date(2026, 7, 10, 0, 0))).toBe("2026-08-10");
  });

  it("selects a valid weekly bundle deterministically", () => {
    const id = selectWeeklyMissionId(USER_ID, "2026-08-03");
    expect(WEEKLY_MISSION_POOL[id]).toBeDefined();
    expect(selectWeeklyMissionId(USER_ID, "2026-08-03")).toBe(id);
  });

  it("builds an SSR-safe local fallback without random values", () => {
    const now = new Date(2026, 7, 2, 12);
    const state = createLocalMissionState(USER_ID, now, { lesson: 1, quiz: 2, flashcard: 4 });
    expect(state.dateKey).toBe("2026-08-02");
    expect(state.counters.daily).toEqual({ lesson: 1, quiz: 2, flashcard: 4 });
    expect(missionSeed(USER_ID, state.dateKey, "lesson")).toBeGreaterThan(MISSION_POOL_VERSION);
  });
});

import { describe, expect, it } from "vitest";
import {
  DAILY_COMPLETION_REWARD_XP,
  DAILY_MISSION_POOL,
  DAILY_OBJECTIVE_REWARD_XP,
  MISSION_POOL_VERSION,
  WEEKLY_COMPLETION_REWARD_XP,
  WEEKLY_MISSION_POOL,
  WEEKLY_OBJECTIVE_REWARD_XP,
  createLocalMissionState,
  emptyMissionCounters,
  getMissionProgress,
  getMissionWeekKey,
  isMissionComplete,
  missionSeed,
  selectDailyMissionIds,
  selectWeeklyMissionId,
  selectWeeklyMissionIds,
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

  it("does not repeat yesterday's exact three-mission set", () => {
    const first = selectDailyMissionIds(USER_ID, "2026-08-02").slice().sort();
    const next = selectDailyMissionIds(USER_ID, "2026-08-03").slice().sort();
    expect(next).not.toEqual(first);
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

  it("selects exactly three varied weekly objectives", () => {
    const ids = selectWeeklyMissionIds(USER_ID, "2026-08-03");
    expect(ids).toHaveLength(3);
    expect(new Set(ids).size).toBe(3);
    expect(ids.map((id) => WEEKLY_MISSION_POOL[id].activity).sort()).toEqual([
      "flashcard",
      "lesson",
      "quiz",
    ]);
  });

  it("builds an SSR-safe local fallback without random values", () => {
    const now = new Date(2026, 7, 2, 12);
    const state = createLocalMissionState(USER_ID, now, { lesson: 1, quiz: 2, flashcard: 4 });
    expect(state.dateKey).toBe("2026-08-02");
    expect(state.counters.daily).toMatchObject({ lesson: 1, quiz: 2, flashcard: 4 });
    expect(state.claimedDailyMissionIds).toEqual([]);
    expect(state.dailyBonusClaimed).toBe(false);
    expect(state.awardedXp).toBe(0);
    expect(missionSeed(USER_ID, state.dateKey, "lesson")).toBeGreaterThan(MISSION_POOL_VERSION);
  });

  it("uses the requested shared reward economy", () => {
    expect(DAILY_OBJECTIVE_REWARD_XP).toBe(100);
    expect(DAILY_COMPLETION_REWARD_XP).toBe(500);
    expect(WEEKLY_OBJECTIVE_REWARD_XP).toBe(250);
    expect(WEEKLY_COMPLETION_REWARD_XP).toBe(1500);
  });

  it("calculates quiz-answer and correct-answer progress from real counters", () => {
    const counters = emptyMissionCounters({ quizAnswers: 7, quizCorrect: 4 });
    expect(getMissionProgress(DAILY_MISSION_POOL.quiz_answers_5, counters)).toBe(5);
    expect(isMissionComplete(DAILY_MISSION_POOL.quiz_correct_3, counters)).toBe(true);
  });

  it("does not complete a mission below its objective", () => {
    const counters = emptyMissionCounters({ flashcardGood: 2 });
    expect(isMissionComplete(DAILY_MISSION_POOL.flashcard_good_3, counters)).toBe(false);
  });
});

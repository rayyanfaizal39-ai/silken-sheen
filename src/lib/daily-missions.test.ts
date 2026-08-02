import { describe, expect, it } from "vitest";
import type { Progress } from "@/hooks/use-progress";
import { resolveTodaysMissions } from "@/lib/daily-missions";

const NOW = new Date(2026, 7, 2, 12, 0, 0);

function progress(overrides: Partial<Progress> = {}): Progress {
  return {
    xp: 0,
    streak: 0,
    lastActive: "",
    quizzesTaken: 0,
    badges: [],
    favorites: [],
    subjectXp: {},
    chapterActivity: {},
    tokens: 0,
    avatar: { helmet: "", suit: "", visor: "", pet: "", owned: [] },
    quizHistory: [],
    ...overrides,
  };
}

describe("today's mission resolver", () => {
  it("shows zero missions when no reliable activity exists", () => {
    expect(resolveTodaysMissions(progress(), NOW).completedCount).toBe(0);
  });

  it("counts a notes activity from the current local day", () => {
    const state = resolveTodaysMissions(
      progress({
        lastVisited: {
          subjectId: "science",
          chapterKey: "Chapter 1",
          type: "notes",
          label: "Chapter 1",
          timestamp: new Date(2026, 7, 2, 9).getTime(),
        },
      }),
      NOW,
    );
    expect(state.completedCount).toBe(1);
    expect(state.firstIncomplete?.id).toBe("quiz");
  });

  it("counts completed quizzes from the existing daily progress", () => {
    const state = resolveTodaysMissions(
      progress({
        missions: {
          dailyDate: "2026-08-02",
          readChapters: 1,
          quizzesDone: 1,
          flashcardsDone: 0,
        },
      }),
      NOW,
    );
    expect(state.completedCount).toBe(2);
    expect(state.firstIncomplete?.id).toBe("flashcards");
  });

  it("keeps three flashcard reviews in progress", () => {
    const state = resolveTodaysMissions(
      progress({
        missions: {
          dailyDate: "2026-08-02",
          readChapters: 0,
          quizzesDone: 0,
          flashcardsDone: 0,
          flashcardReviews: 3,
        },
      }),
      NOW,
    );
    expect(state.missions[2]).toMatchObject({ completed: false, current: 3, target: 5 });
  });

  it("completes all missions after five flashcard reviews", () => {
    const state = resolveTodaysMissions(
      progress({
        missions: {
          dailyDate: "2026-08-02",
          readChapters: 1,
          quizzesDone: 1,
          flashcardsDone: 1,
          flashcardReviews: 5,
        },
      }),
      NOW,
    );
    expect(state.completedCount).toBe(3);
    expect(state.firstIncomplete).toBeNull();
  });

  it("resets stale daily counters without mutating stored progress", () => {
    const stale = progress({
      missions: {
        dailyDate: "2026-08-01",
        readChapters: 3,
        quizzesDone: 2,
        flashcardsDone: 1,
        flashcardReviews: 9,
      },
    });
    expect(resolveTodaysMissions(stale, NOW).completedCount).toBe(0);
    expect(stale.missions?.flashcardReviews).toBe(9);
  });
});

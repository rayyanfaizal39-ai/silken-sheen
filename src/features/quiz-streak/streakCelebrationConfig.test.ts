import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  applyStreakAnswer,
  getParticleCount,
  getStreakTier,
  STREAK_TIER_DURATION,
  type StreakAnswerState,
} from "./streakCelebrationConfig";
import {
  COMBO_ENTRANCE_MS,
  COMBO_EXIT_MS,
  COMBO_HOLD_MS,
  COMBO_TOTAL_MS,
  getQuizComboConfig,
} from "./quizComboConfig";

function emptyState(): StreakAnswerState {
  return { streak: 0, handledQuestionIds: new Set<string>() };
}

describe("quiz streak session", () => {
  it("increments a correct answer exactly once", () => {
    const first = applyStreakAnswer(emptyState(), { questionId: "q1", correct: true });
    const duplicate = applyStreakAnswer(first.state, { questionId: "q1", correct: true });
    expect(first.state.streak).toBe(1);
    expect(first.accepted).toBe(true);
    expect(duplicate.state.streak).toBe(1);
    expect(duplicate.accepted).toBe(false);
  });

  it("resets immediately after a wrong answer", () => {
    const first = applyStreakAnswer(emptyState(), { questionId: "q1", correct: true });
    const wrong = applyStreakAnswer(first.state, { questionId: "q2", correct: false });
    expect(wrong.state.streak).toBe(0);
    expect(wrong.celebration).toBeNull();
  });

  it("starts a new or restarted quiz from an empty session", () => {
    const active = applyStreakAnswer(emptyState(), { questionId: "q1", correct: true });
    expect(active.state.streak).toBe(1);
    expect(emptyState().streak).toBe(0);
    expect(emptyState().handledQuestionIds.size).toBe(0);
  });

  it.each([
    [1, "correct"],
    [2, "spark"],
    [3, "energy"],
    [5, "rocket"],
    [7, "galaxy"],
    [10, "milestone"],
    [15, "legendary"],
  ] as const)("maps streak %i to the %s tier", (streak, tier) => {
    expect(getStreakTier(streak)).toBe(tier);
  });

  it("uses the lighter galaxy tier between premium and legendary milestones", () => {
    expect(getStreakTier(11)).toBe("galaxy");
    expect(getStreakTier(14)).toBe("galaxy");
    expect(getStreakTier(16)).toBe("galaxy");
    expect(getStreakTier(20)).toBe("legendary");
  });

  it("creates immediate celebration feedback on the first correct answer", () => {
    const result = applyStreakAnswer(emptyState(), { questionId: "q1", correct: true });
    expect(result.celebration?.tier).toBe("correct");
    expect(result.celebration?.streak).toBe(1);
  });

  it("only requests an XP animation when real XP was awarded", () => {
    const withoutXp = applyStreakAnswer(emptyState(), { questionId: "q1", correct: true });
    const withXp = applyStreakAnswer(emptyState(), {
      questionId: "q1",
      correct: true,
      xpAwarded: 20,
    });
    expect(withoutXp.celebration?.xpAwarded).toBe(0);
    expect(withXp.celebration?.xpAwarded).toBe(20);
  });

  it("disables particles for reduced motion and caps mobile density", () => {
    expect(getParticleCount("legendary", false, true)).toBe(0);
    expect(getParticleCount("legendary", false, false)).toBeLessThanOrEqual(30);
    expect(getParticleCount("legendary", true, false)).toBeLessThan(
      getParticleCount("legendary", false, false),
    );
  });

  it("keeps every major overlay short enough to clean up promptly", () => {
    expect(Math.max(...Object.values(STREAK_TIER_DURATION))).toBeLessThanOrEqual(1200);
  });

  it("keeps the overlay non-blocking, reduced-motion aware, and mobile bounded", () => {
    const source = readFileSync(new URL("./QuizStreakCelebration.tsx", import.meta.url), "utf8");
    expect(source).toContain("pointer-events-none fixed inset-0");
    expect(source).toContain("useReducedMotion");
    expect(source).toContain("max-w-[calc(100vw-1.5rem)]");
  });

  it("starts the readable combo announcement at two without capping the count", () => {
    expect(getQuizComboConfig(1)).toBeNull();
    expect(getQuizComboConfig(2)?.label).toBe("2× COMBO");
    expect(getQuizComboConfig(3)?.label).toBe("3× COMBO");
    expect(getQuizComboConfig(47)?.label).toBe("47× COMBO");
  });

  it("holds the combo longer than its entrance and exits near two seconds overall", () => {
    expect(COMBO_HOLD_MS).toBeGreaterThan(COMBO_ENTRANCE_MS);
    expect(COMBO_HOLD_MS).toBeGreaterThanOrEqual(1300);
    expect(COMBO_EXIT_MS).toBeLessThan(COMBO_HOLD_MS);
    expect(COMBO_TOTAL_MS).toBeGreaterThanOrEqual(1900);
    expect(COMBO_TOTAL_MS).toBeLessThanOrEqual(2400);
  });

  it("adds progressive emphasis and milestone labels", () => {
    expect(getQuizComboConfig(3)?.level).toBeLessThan(getQuizComboConfig(5)?.level ?? 0);
    expect(getQuizComboConfig(5)?.secondaryLabel).toBe("AMAZING STREAK!");
    expect(getQuizComboConfig(10)?.secondaryLabel).toBe("COSMIC STREAK!");
    expect(getQuizComboConfig(15)?.secondaryLabel).toBe("LEGENDARY!");
  });

  it("keeps the primary combo inside the quiz surface and non-blocking", () => {
    const source = readFileSync(new URL("./QuizComboAnnouncement.tsx", import.meta.url), "utf8");
    expect(source).toContain("[data-quiz-combo-surface]");
    expect(source).toContain("pointer-events-none fixed");
    expect(source).toContain("whitespace-nowrap");
    expect(source).toContain("reducedMotion");
  });
});

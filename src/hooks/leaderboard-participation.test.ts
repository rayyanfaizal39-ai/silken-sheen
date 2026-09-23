import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitQuizCompletion } from "./use-progress";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";

const db = vi.hoisted(() => ({
  getUser: vi.fn(),
  rpc: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: { auth: { getUser: db.getUser }, rpc: db.rpc },
}));

const result = {
  completionId: "11111111-1111-4111-8111-111111111111",
  quizKey: "quiz-v1:science:form-2:chapter-1:difficulty-all",
  subjectId: "science",
  chapterKey: "Chapter 1",
  correct: 3,
  total: 3,
};

describe("monthly leaderboard participation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("window", {
      localStorage: { getItem: () => null },
      dispatchEvent: vi.fn(),
    });
    db.rpc.mockResolvedValue({
      data: {
        accepted: true,
        eligible: true,
        awarded: true,
        completionXp: 20,
        scoreBonusXp: 30,
        potentialXp: 50,
        xpEarned: 50,
        scorePct: 100,
        lifetimeXp: 150,
        subjectXp: 100,
        quizzesTaken: 4,
      },
      error: null,
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each(["free", "pro", "premium"])(
    "uses the same server award for %s students",
    async (plan) => {
      db.getUser.mockResolvedValue({ data: { user: { id: "student", plan } } });
      await expect(submitQuizCompletion(result)).resolves.toMatchObject({
        xpEarned: 50,
        awarded: true,
      });
      expect(db.rpc).toHaveBeenCalledExactlyOnceWith("complete_quiz", {
        requested_completion_id: result.completionId,
        requested_quiz_key: result.quizKey,
        requested_subject_id: result.subjectId,
        requested_chapter_key: result.chapterKey,
        requested_correct: result.correct,
        requested_total: result.total,
      });
    },
  );

  it("does not persist logged-out progress", async () => {
    db.getUser.mockResolvedValue({ data: { user: null } });
    await expect(submitQuizCompletion(result)).resolves.toMatchObject({
      eligible: false,
      xpEarned: 0,
    });
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("does not persist Supabase anonymous users", async () => {
    db.getUser.mockResolvedValue({ data: { user: { id: "guest", is_anonymous: true } } });
    await expect(submitQuizCompletion(result)).resolves.toMatchObject({
      eligible: false,
      xpEarned: 0,
    });
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("does not persist guest progress even with a stale session", async () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => "1" } });
    db.getUser.mockResolvedValue({ data: { user: { id: "student" } } });
    await expect(submitQuizCompletion(result)).resolves.toMatchObject({
      eligible: false,
      xpEarned: 0,
    });
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("keeps premium analytics entitlements protected", () => {
    for (const feature of [
      "quiz_history",
      "parent_dashboard",
      "parent_analytics",
      "parent_reports",
    ] as const) {
      expect(hasFeature(resolveStoredPlan("free"), feature)).toBe(false);
    }
    expect(hasFeature(resolveStoredPlan("pro"), "parent_dashboard")).toBe(false);
    expect(hasFeature(resolveStoredPlan("premium"), "parent_dashboard")).toBe(true);
  });
});

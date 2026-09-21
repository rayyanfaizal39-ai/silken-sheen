import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { insertQuizHistoryRow } from "./use-progress";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";

const db = vi.hoisted(() => ({
  getUser: vi.fn(),
  from: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: { auth: { getUser: db.getUser }, from: db.from },
}));

const result = {
  subjectId: "science", chapterKey: "1", scorePct: 100,
  correct: 3, total: 3, xpEarned: 60,
};

describe("monthly leaderboard participation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("window", {
      localStorage: { getItem: () => null },
      dispatchEvent: vi.fn(),
    });
    db.insert.mockResolvedValue({ error: null });
    db.from.mockImplementation((table: string) => {
      if (table !== "quiz_history") throw new Error("Unexpected plan lookup");
      return { insert: db.insert };
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it.each(["free", "pro", "premium"])("records unchanged XP for %s students", async (plan) => {
    db.getUser.mockResolvedValue({ data: { user: { id: "student", plan } } });
    await insertQuizHistoryRow(result);
    expect(db.from).toHaveBeenCalledExactlyOnceWith("quiz_history");
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: "student", xp_earned: 60, correct: 3, total: 3,
    }));
  });

  it("does not persist logged-out progress", async () => {
    db.getUser.mockResolvedValue({ data: { user: null } });
    await insertQuizHistoryRow(result);
    expect(db.from).not.toHaveBeenCalled();
  });

  it("does not persist guest progress even with a stale session", async () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => "1" } });
    db.getUser.mockResolvedValue({ data: { user: { id: "student" } } });
    await insertQuizHistoryRow(result);
    expect(db.from).not.toHaveBeenCalled();
  });

  it("keeps premium analytics entitlements protected", () => {
    for (const feature of ["quiz_history", "parent_dashboard", "parent_analytics", "parent_reports"] as const) {
      expect(hasFeature(resolveStoredPlan("free"), feature)).toBe(false);
    }
    expect(hasFeature(resolveStoredPlan("pro"), "parent_dashboard")).toBe(false);
    expect(hasFeature(resolveStoredPlan("premium"), "parent_dashboard")).toBe(true);
  });
});

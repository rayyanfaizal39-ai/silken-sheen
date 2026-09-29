import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthApiError, AuthSessionMissingError } from "@supabase/supabase-js";
import { completeQuizWithMission, submitQuizCompletion } from "./use-progress";
import {
  buildCanonicalQuizKey,
  type QuizCompletionSubmission,
} from "@/features/quiz/xp/quizXp";
import { QuizCompletionError } from "@/features/quiz/xp/quizCompletionError";

const db = vi.hoisted(() => ({
  getUser: vi.fn(),
  rpc: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: { auth: { getUser: db.getUser }, rpc: db.rpc },
}));

// English Form 1 Set A: 17 Easy + 13 Medium; 25/30 answered correctly.
const englishQuiz: QuizCompletionSubmission = {
  completionId: "22222222-2222-4222-8222-222222222222",
  quizKey: buildCanonicalQuizKey({ kind: "english", form: "Form 1", setId: "objective-a" }),
  formula: "objective",
  subjectId: "english",
  chapterKey: "Objective A",
  total: 30,
  correct: { easy: 15, medium: 10, hard: 0 },
  timerMode: "none",
};

const awarded = {
  accepted: true,
  eligible: true,
  awarded: true,
  baseXp: 350,
  correctBonusXp: 125,
  timerBonusXp: 0,
  passBonusXp: 25,
  potentialXp: 500,
  xpEarned: 500,
  scorePct: 83,
  lifetimeXp: 600,
  subjectXp: 500,
  quizzesTaken: 5,
};

// The exact response production returned while the migration was missing.
const missingFunction = {
  code: "PGRST202",
  message:
    "Could not find the function public.complete_quiz(requested_chapter_key, requested_completion_id, requested_correct, requested_quiz_key, requested_subject_id, requested_total) in the schema cache",
  details: "Searched for the function public.complete_quiz ...",
  hint: "Perhaps you meant to call the function public.complete_quiz_attempt",
};

function stubBrowser({ guestFlag = false, online = true } = {}) {
  vi.stubGlobal("window", {
    localStorage: { getItem: () => (guestFlag ? "1" : null) },
    dispatchEvent: vi.fn(),
  });
  vi.stubGlobal("navigator", { onLine: online });
}

async function failureOf(promise: Promise<unknown>) {
  const error = await promise.then(
    () => null,
    (e: unknown) => e,
  );
  expect(error).toBeInstanceOf(QuizCompletionError);
  return error as QuizCompletionError;
}

describe("submitQuizCompletion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stubBrowser();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    db.getUser.mockResolvedValue({ data: { user: { id: "student-1" } }, error: null });
    db.rpc.mockResolvedValue({ data: awarded, error: null, status: 200 });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends an English quiz through the same catalog award as other subjects", async () => {
    await expect(submitQuizCompletion(englishQuiz)).resolves.toMatchObject({
      awarded: true,
      xpEarned: 500,
      lifetimeXp: 600,
    });
    expect(db.rpc).toHaveBeenCalledExactlyOnceWith("complete_catalog_quiz", {
      requested_completion_id: englishQuiz.completionId,
      requested_quiz_key: "quiz-v2:english:english:form-1:paper-1:en:objective-a",
      requested_correct_easy: 15,
      requested_correct_medium: 10,
      requested_correct_hard: 0,
      requested_timer_mode: "none",
    });
  });

  it("sends a standard quiz's timer choice with the same payload shape", async () => {
    await submitQuizCompletion({
      ...englishQuiz,
      quizKey: "quiz-v2:standard:science:form-1:chapter-7:bm:set-default:difficulty-all",
      formula: "standard",
      subjectId: "science",
      correct: { easy: 15, medium: 10, hard: 5 },
      timerMode: "15",
    });
    expect(db.rpc).toHaveBeenCalledWith(
      "complete_catalog_quiz",
      expect.objectContaining({ requested_correct_hard: 5, requested_timer_mode: "15" }),
    );
  });

  it("never sends an XP amount, subject or chapter as authoritative data", async () => {
    await submitQuizCompletion(englishQuiz);
    const payload = db.rpc.mock.calls[0][1] as Record<string, unknown>;
    expect(Object.keys(payload).some((key) => /xp|subject|chapter|total/i.test(key))).toBe(false);
  });

  it("reports an already-rewarded retake as a normal 0 XP result", async () => {
    db.rpc.mockResolvedValue({
      data: { ...awarded, awarded: false, xpEarned: 0 },
      error: null,
      status: 200,
    });
    await expect(submitQuizCompletion(englishQuiz)).resolves.toMatchObject({
      eligible: true,
      awarded: false,
      xpEarned: 0,
    });
  });

  it("surfaces the missing-function error as a server failure, not a connection problem", async () => {
    db.rpc.mockResolvedValue({ data: null, error: missingFunction, status: 404 });

    const failure = await failureOf(submitQuizCompletion(englishQuiz));

    expect(failure).toMatchObject({ kind: "server", code: "PGRST202" });
    expect(console.error).toHaveBeenCalledWith(
      "[quiz-xp] complete_quiz failed",
      expect.objectContaining({
        code: "PGRST202",
        hint: missingFunction.hint,
        details: missingFunction.details,
        quizKey: englishQuiz.quizKey,
        subjectId: "english",
        chapterKey: "Objective A",
        completionId: englishQuiz.completionId,
      }),
    );
  });

  it("keeps user and attempt ids out of production logs", async () => {
    vi.stubEnv("DEV", false);
    db.rpc.mockResolvedValue({ data: null, error: missingFunction, status: 404 });

    await failureOf(submitQuizCompletion(englishQuiz));

    expect(console.error).not.toHaveBeenCalled();
    const [, logged] = vi.mocked(console.warn).mock.calls[0];
    expect(logged).toMatchObject({ code: "PGRST202", quizKey: englishQuiz.quizKey });
    expect(JSON.stringify(logged)).not.toMatch(/student-1|22222222/);
  });

  it("classifies a request that never reached the server as offline", async () => {
    db.rpc.mockResolvedValue({
      data: null,
      error: { code: "", message: "TypeError: Failed to fetch", details: "", hint: "" },
      status: 0,
    });
    await expect(failureOf(submitQuizCompletion(englishQuiz))).resolves.toMatchObject({
      kind: "offline",
    });
  });

  it("classifies any failure while the browser is offline as offline", async () => {
    stubBrowser({ online: false });
    db.rpc.mockResolvedValue({ data: null, error: missingFunction, status: 404 });
    await expect(failureOf(submitQuizCompletion(englishQuiz))).resolves.toMatchObject({
      kind: "offline",
    });
  });

  it.each([
    [{ code: "PGRST301", message: "JWT expired" }, 401],
    [{ code: "42501", message: "Authentication required" }, 403],
  ])("classifies %o as an expired session", async (error, status) => {
    db.rpc.mockResolvedValue({ data: null, error, status });
    await expect(failureOf(submitQuizCompletion(englishQuiz))).resolves.toMatchObject({
      kind: "session_expired",
    });
  });

  it("asks a registered student to sign in again when the stored session is rejected", async () => {
    db.getUser.mockResolvedValue({
      data: { user: null },
      error: new AuthApiError("Session not found", 403, "session_not_found"),
    });
    await expect(failureOf(submitQuizCompletion(englishQuiz))).resolves.toMatchObject({
      kind: "session_expired",
    });
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("treats a visitor with no session as a guest, not an error", async () => {
    db.getUser.mockResolvedValue({ data: { user: null }, error: new AuthSessionMissingError() });
    await expect(submitQuizCompletion(englishQuiz)).resolves.toMatchObject({
      eligible: false,
      xpEarned: 0,
      reason: "guest",
    });
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("does not even check the session while guest mode is on", async () => {
    stubBrowser({ guestFlag: true });
    await expect(submitQuizCompletion(englishQuiz)).resolves.toMatchObject({ reason: "guest" });
    expect(db.getUser).not.toHaveBeenCalled();
    expect(db.rpc).not.toHaveBeenCalled();
  });

  it("maps the server's guest rejection to a guest result", async () => {
    db.rpc.mockResolvedValue({
      data: null,
      error: { code: "42501", message: "Registered account required" },
      status: 403,
    });
    await expect(submitQuizCompletion(englishQuiz)).resolves.toMatchObject({
      eligible: false,
      xpEarned: 0,
      reason: "guest",
    });
  });
});

describe("completeQuizWithMission", () => {
  const completedAt = new Date(2026, 8, 24, 15, 30);

  beforeEach(() => {
    vi.clearAllMocks();
    stubBrowser();
    vi.spyOn(console, "error").mockImplementation(() => {});
    db.getUser.mockResolvedValue({ data: { user: { id: "student-1" } }, error: null });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("counts a successful registered completion toward the daily quiz mission", async () => {
    db.rpc.mockResolvedValue({ data: awarded, error: null, status: 200 });
    const trackMission = vi.fn();

    await completeQuizWithMission(englishQuiz, completedAt, trackMission);

    expect(trackMission).toHaveBeenCalledExactlyOnceWith(
      "quiz",
      `quiz:${englishQuiz.completionId}`,
      "2026-09-24",
      { correct: 25, total: 30, subjectId: "english" },
    );
  });

  it("still counts a 0 XP retake toward the mission", async () => {
    db.rpc.mockResolvedValue({
      data: { ...awarded, awarded: false, xpEarned: 0 },
      error: null,
      status: 200,
    });
    const trackMission = vi.fn();
    await completeQuizWithMission(englishQuiz, completedAt, trackMission);
    expect(trackMission).toHaveBeenCalledOnce();
  });

  it("does not count guest completions", async () => {
    db.getUser.mockResolvedValue({ data: { user: null }, error: new AuthSessionMissingError() });
    const trackMission = vi.fn();
    await completeQuizWithMission(englishQuiz, completedAt, trackMission);
    expect(trackMission).not.toHaveBeenCalled();
  });

  it("does not count a completion the server failed to save", async () => {
    db.rpc.mockResolvedValue({ data: null, error: missingFunction, status: 404 });
    const trackMission = vi.fn();
    await expect(completeQuizWithMission(englishQuiz, completedAt, trackMission)).rejects.toThrow(
      QuizCompletionError,
    );
    expect(trackMission).not.toHaveBeenCalled();
  });
});

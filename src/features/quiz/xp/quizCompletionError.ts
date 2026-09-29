import type { QuizCompletionSubmission } from "./quizXp";

// Classifies a failed quiz XP save so the result screen can tell a student
// what actually happened instead of blaming every failure on the connection.
// Guests and already-rewarded retakes are not failures: complete_quiz()
// returns a normal non-earning result for those.

export type QuizSaveFailureKind = "offline" | "session_expired" | "server";

/** Result-screen state for a failed save; `retry` resubmits the same completion id. */
export type QuizSaveFailure = { kind: QuizSaveFailureKind; retry: () => void };

/** The PostgrestError / AuthError fields we rely on. */
export type SupabaseErrorLike = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
  status?: number | null;
  name?: string | null;
};

export class QuizCompletionError extends Error {
  readonly kind: QuizSaveFailureKind;
  readonly code: string;
  readonly details: string;
  readonly hint: string;

  constructor(kind: QuizSaveFailureKind, cause: SupabaseErrorLike) {
    super(cause.message || "Quiz completion failed");
    this.name = "QuizCompletionError";
    this.kind = kind;
    this.code = cause.code ?? "";
    this.details = cause.details ?? "";
    this.hint = cause.hint ?? "";
  }
}

// PostgREST JWT failures: expired, invalid, or claims rejected.
const SESSION_ERROR_CODES = new Set(["PGRST301", "PGRST302", "PGRST303"]);

export function isBrowserOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

/** Raised by complete_quiz() for a Supabase anonymous (guest) JWT. */
export function isRegisteredAccountRequired(error: SupabaseErrorLike): boolean {
  return error.code === "42501" && /registered account required/i.test(error.message ?? "");
}

/**
 * `status` is the HTTP status of the PostgREST response; supabase-js reports
 * a request that never reached the server as status 0 with an empty code.
 */
export function classifyQuizSaveFailure(
  error: SupabaseErrorLike,
  context: { status?: number | null; offline?: boolean } = {},
): QuizSaveFailureKind {
  const status = context.status ?? error.status ?? null;
  if (context.offline) return "offline";
  if (status === 0 && !error.code) return "offline";
  if (error.name === "AuthRetryableFetchError") return "offline";
  if (status === 401 || SESSION_ERROR_CODES.has(error.code ?? "")) return "session_expired";
  if (error.code === "42501" && /authentication required/i.test(error.message ?? "")) {
    return "session_expired";
  }
  return "server";
}

export function quizSaveFailureKindOf(error: unknown): QuizSaveFailureKind {
  return error instanceof QuizCompletionError ? error.kind : "server";
}

export function quizSaveFailureMessage(kind: QuizSaveFailureKind, bm = false): string {
  switch (kind) {
    case "offline":
      return bm
        ? "Anda di luar talian, jadi XP belum disimpan. Cuba lagi apabila sambungan pulih."
        : "You're offline, so your XP wasn't saved. Try again when you're back online.";
    case "session_expired":
      return bm
        ? "Sesi anda telah tamat. Sila log masuk semula untuk menyimpan XP."
        : "Your session has expired. Please sign in again to save your XP.";
    default:
      return bm
        ? "Kami tidak dapat menyimpan XP anda. Sila cuba lagi."
        : "We couldn't save your XP. Please try again.";
  }
}

export type QuizCompletionLogContext = Pick<
  QuizCompletionSubmission,
  "completionId" | "quizKey" | "subjectId" | "chapterKey" | "total" | "correct" | "timerMode"
>;

/**
 * Keeps the real Supabase error visible for diagnosis. Production logs carry
 * only the error and quiz identity; ids that point at a person or attempt
 * are logged in development only.
 */
export function logQuizSaveFailure(
  failure: QuizCompletionError,
  context: QuizCompletionLogContext,
  userId?: string,
): void {
  const summary = {
    kind: failure.kind,
    code: failure.code,
    message: failure.message,
    quizKey: context.quizKey,
    subjectId: context.subjectId,
  };
  if (import.meta.env.DEV) {
    console.error("[quiz-xp] complete_quiz failed", {
      ...summary,
      details: failure.details,
      hint: failure.hint,
      chapterKey: context.chapterKey,
      completionId: context.completionId,
      correct: context.correct,
      total: context.total,
      timerMode: context.timerMode,
      registeredUser: Boolean(userId),
      userId,
    });
    return;
  }
  console.warn("[quiz-xp] complete_quiz failed", summary);
}

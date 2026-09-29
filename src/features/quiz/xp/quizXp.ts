// Original AcadeMY quiz XP economy (verified from git: b4a40f32 .. b5cd2136^),
// awarded once per canonical quiz by the server (complete_catalog_quiz).
// These helpers mirror the server formula for display, guests and tests; the
// server recalculates everything from its own quiz catalog.

/** Historical per-question values from quizBonusXp.ts / use-progress.ts. */
export const QUIZ_BASE_XP = { easy: 10, medium: 20, hard: 30 } as const;
export const QUIZ_CORRECT_ANSWER_BONUS_XP = 5;
export const QUIZ_TIMER_BONUS_XP = { none: 0, "60": 5, "30": 10, "15": 15 } as const;
export const QUIZ_PASS_PCT = 80;
export const QUIZ_PASS_BONUS_XP = 25;

export type QuizDifficultyTier = keyof typeof QUIZ_BASE_XP;
export type QuizTimerMode = keyof typeof QUIZ_TIMER_BONUS_XP;
/**
 * standard: difficulty XP + correct bonus + timer bonus + pass bonus.
 * objective: English / Maths objective — the same without timer XP.
 * bm_world: BM World score band + fixed 60 s speed bonus + correct bonus + pass bonus.
 */
export type QuizXpFormula = "standard" | "objective" | "bm_world";

export type CorrectByDifficulty = { easy: number; medium: number; hard: number };

export const EMPTY_CORRECT_BY_DIFFICULTY: CorrectByDifficulty = { easy: 0, medium: 0, hard: 0 };

/**
 * The historical classifier (getBaseQuestionXp): a plain lower-case match, so
 * anything other than "hard"/"medium" — including a missing value — is Easy.
 */
export function historicalDifficultyTier(difficulty: unknown): QuizDifficultyTier {
  const normalized = typeof difficulty === "string" ? difficulty.toLowerCase() : "";
  return normalized === "hard" ? "hard" : normalized === "medium" ? "medium" : "easy";
}

export function addCorrectAnswer(
  counts: CorrectByDifficulty,
  difficulty: unknown,
): CorrectByDifficulty {
  const tier = historicalDifficultyTier(difficulty);
  return { ...counts, [tier]: counts[tier] + 1 };
}

export function timerModeFromPref(
  pref: { mode: "timer" | "none"; seconds: number } | null | undefined,
): QuizTimerMode {
  if (pref?.mode !== "timer") return "none";
  return pref.seconds === 15 ? "15" : pref.seconds === 30 ? "30" : pref.seconds === 60 ? "60" : "none";
}

export type QuizXpBreakdown = {
  baseXp: number;
  correctBonusXp: number;
  timerBonusXp: number;
  passBonusXp: number;
  totalXp: number;
  correct: number;
  total: number;
  scorePct: number;
};

/** BM World score band (BMWorldPage.tsx before b5cd2136). */
export function bmWorldBandXp(scorePct: number): number {
  return scorePct >= 90 ? 45 : scorePct >= 80 ? 35 : scorePct >= 60 ? 20 : 10;
}

export function calculateOriginalQuizXp(input: {
  formula: QuizXpFormula;
  total: number;
  correct: CorrectByDifficulty;
  timerMode: QuizTimerMode;
}): QuizXpBreakdown {
  const total = Math.max(1, Math.round(input.total));
  const correct = Math.min(total, input.correct.easy + input.correct.medium + input.correct.hard);
  const scorePct = Math.round((correct / total) * 100);
  const passBonusXp = scorePct >= QUIZ_PASS_PCT ? QUIZ_PASS_BONUS_XP : 0;
  const correctBonusXp = correct * QUIZ_CORRECT_ANSWER_BONUS_XP;

  const baseXp =
    input.formula === "bm_world"
      ? bmWorldBandXp(scorePct)
      : input.correct.easy * QUIZ_BASE_XP.easy +
        input.correct.medium * QUIZ_BASE_XP.medium +
        input.correct.hard * QUIZ_BASE_XP.hard;
  const timerBonusXp =
    input.formula === "standard"
      ? correct * QUIZ_TIMER_BONUS_XP[input.timerMode]
      : input.formula === "bm_world"
        ? correct * QUIZ_TIMER_BONUS_XP["60"]
        : 0;

  return {
    baseXp,
    correctBonusXp,
    timerBonusXp,
    passBonusXp,
    totalXp: baseXp + correctBonusXp + timerBonusXp + passBonusXp,
    correct,
    total,
    scorePct,
  };
}

export type QuizCompletionResult = {
  accepted: boolean;
  eligible: boolean;
  awarded: boolean;
  baseXp: number;
  correctBonusXp: number;
  timerBonusXp: number;
  passBonusXp: number;
  potentialXp: number;
  xpEarned: number;
  scorePct: number;
  lifetimeXp: number | null;
  subjectXp: number | null;
  quizzesTaken: number | null;
  reason?: "guest" | "unavailable";
};

export type QuizCompletionSubmission = {
  completionId: string;
  quizKey: string;
  formula: QuizXpFormula;
  subjectId: string;
  chapterKey: string;
  total: number;
  correct: CorrectByDifficulty;
  timerMode: QuizTimerMode;
};

export function createNonEarningQuizResult(
  submission: Pick<QuizCompletionSubmission, "formula" | "total" | "correct" | "timerMode">,
  reason: "guest" | "unavailable",
): QuizCompletionResult {
  const breakdown = calculateOriginalQuizXp(submission);
  return {
    accepted: true,
    eligible: false,
    awarded: false,
    baseXp: breakdown.baseXp,
    correctBonusXp: breakdown.correctBonusXp,
    timerBonusXp: breakdown.timerBonusXp,
    passBonusXp: breakdown.passBonusXp,
    potentialXp: breakdown.totalXp,
    xpEarned: 0,
    scorePct: breakdown.scorePct,
    lifetimeXp: null,
    subjectXp: null,
    quizzesTaken: null,
    reason,
  };
}

// ─── Canonical quiz identity ─────────────────────────────────────────────────

export type CanonicalQuizIdentity =
  | {
      kind: "standard";
      subjectId: string;
      form: string;
      chapterKey: string;
      lang: string;
      /** Science Form 3 set (A/B); null when the chapter has no sets. */
      set: string | null;
      /** Difficulty filter; "All" for subjects that ignore the filter. */
      difficulty: string;
    }
  | { kind: "math-objective"; form: string; chapterKey: string; lang: string; objectiveId: string }
  | { kind: "english"; form: string; setId: string }
  | { kind: "bm-world"; form: string; setId: string };

function keySegment(value: string): string {
  return (
    String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "none"
  );
}

/**
 * The one quiz identity used by the client, the catalog generator and the
 * server catalog (`quiz_catalog.quiz_key`). Unlike the v1 key it includes the
 * language, so BM and DLP banks are separate quizzes.
 */
export function buildCanonicalQuizKey(identity: CanonicalQuizIdentity): string {
  const parts: string[] = (() => {
    switch (identity.kind) {
      case "standard":
        return [
          identity.subjectId,
          identity.form,
          identity.chapterKey,
          identity.lang,
          identity.set ? `set-${identity.set}` : "set-default",
          `difficulty-${identity.difficulty}`,
        ];
      case "math-objective":
        return ["math", identity.form, identity.chapterKey, identity.lang, identity.objectiveId];
      case "english":
        return ["english", identity.form, "paper-1", "en", identity.setId];
      case "bm-world":
        return ["bm", identity.form, "kertas-1-objektif", "bm", identity.setId];
    }
  })();
  return ["quiz-v2", identity.kind, ...parts].map(keySegment).join(":");
}

export function formulaForQuizKind(kind: CanonicalQuizIdentity["kind"]): QuizXpFormula {
  return kind === "standard" ? "standard" : kind === "bm-world" ? "bm_world" : "objective";
}

function normalizeLegacyQuizKeyPart(value: string): string {
  return encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, "-"));
}

/**
 * The v1 key sent by the client deployed on 2026-09-23 (no language). Used
 * only to catalog the legacy `complete_quiz` path while that client is live.
 */
export function buildQuizKey(input: {
  subjectId: string;
  form: string;
  chapterKey: string;
  variant: string;
}): string {
  return ["quiz-v1", input.subjectId, input.form, input.chapterKey, input.variant]
    .map(normalizeLegacyQuizKeyPart)
    .join(":");
}

export function createQuizCompletionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

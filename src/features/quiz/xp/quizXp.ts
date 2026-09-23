export const QUIZ_COMPLETION_XP = 20;
export const QUIZ_MAX_XP = 50;

export type QuizXpBreakdown = {
  completionXp: number;
  scoreBonusXp: number;
  totalXp: number;
  scorePct: number;
};

export type QuizCompletionResult = {
  accepted: boolean;
  eligible: boolean;
  awarded: boolean;
  completionXp: number;
  scoreBonusXp: number;
  potentialXp: number;
  xpEarned: number;
  scorePct: number;
  lifetimeXp: number | null;
  subjectXp: number | null;
  quizzesTaken: number | null;
  reason?: "guest" | "unavailable";
};

export function calculateQuizXpFromScore(scorePct: number): QuizXpBreakdown {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(Number(scorePct) || 0)));
  const scoreBonusXp =
    normalizedScore === 100
      ? 30
      : normalizedScore >= 90
        ? 20
        : normalizedScore >= 80
          ? 10
          : normalizedScore >= 60
            ? 5
            : 0;

  return {
    completionXp: QUIZ_COMPLETION_XP,
    scoreBonusXp,
    totalXp: Math.min(QUIZ_MAX_XP, QUIZ_COMPLETION_XP + scoreBonusXp),
    scorePct: normalizedScore,
  };
}

export function calculateQuizXp(correct: number, total: number): QuizXpBreakdown {
  const safeTotal = Math.max(1, Math.round(Number(total) || 1));
  const safeCorrect = Math.max(0, Math.min(safeTotal, Math.round(Number(correct) || 0)));
  return calculateQuizXpFromScore((safeCorrect / safeTotal) * 100);
}

function normalizeQuizKeyPart(value: string): string {
  return encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, "-"));
}

export function buildQuizKey(input: {
  subjectId: string;
  form: string;
  chapterKey: string;
  variant: string;
}): string {
  return ["quiz-v1", input.subjectId, input.form, input.chapterKey, input.variant]
    .map(normalizeQuizKeyPart)
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

export function createNonEarningQuizResult(
  correct: number,
  total: number,
  reason: "guest" | "unavailable",
): QuizCompletionResult {
  const breakdown = calculateQuizXp(correct, total);
  return {
    accepted: true,
    eligible: false,
    awarded: false,
    completionXp: breakdown.completionXp,
    scoreBonusXp: breakdown.scoreBonusXp,
    potentialXp: breakdown.totalXp,
    xpEarned: 0,
    scorePct: breakdown.scorePct,
    lifetimeXp: null,
    subjectXp: null,
    quizzesTaken: null,
    reason,
  };
}

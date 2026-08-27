export const QUIZ_TIMER_BONUS_XP = {
  none: 0,
  60: 5,
  30: 10,
  15: 15,
} as const;

export type QuizTimerMode = keyof typeof QUIZ_TIMER_BONUS_XP;

export const QUIZ_CORRECT_STREAK_BONUS_XP = 5;

export type QuizXpBreakdown = {
  baseXp: number;
  timerBonusXp: number;
  streakBonusXp: number;
  totalQuestionXp: number;
};

export function normalizeQuizTimerMode(value: unknown): QuizTimerMode {
  if (value === "none" || value === 60 || value === 30 || value === 15) return value;
  if (value === "60" || value === "30" || value === "15") return Number(value) as QuizTimerMode;
  return "none";
}

export function getBaseQuestionXp(difficulty: unknown): number {
  const normalized = typeof difficulty === "string" ? difficulty.toLowerCase() : "";
  return normalized === "hard" ? 30 : normalized === "medium" ? 20 : 10;
}

export function calculateQuizQuestionXp(input: {
  correct: boolean;
  timerMode: unknown;
  difficulty: unknown;
}): QuizXpBreakdown {
  if (!input.correct) {
    return { baseXp: 0, timerBonusXp: 0, streakBonusXp: 0, totalQuestionXp: 0 };
  }

  const baseXp = getBaseQuestionXp(input.difficulty);
  const timerBonusXp = QUIZ_TIMER_BONUS_XP[normalizeQuizTimerMode(input.timerMode)];
  const streakBonusXp = QUIZ_CORRECT_STREAK_BONUS_XP;
  return {
    baseXp,
    timerBonusXp,
    streakBonusXp,
    totalQuestionXp: baseXp + timerBonusXp + streakBonusXp,
  };
}

export function timerPrefToMode(pref: { mode: "timer" | "none"; seconds: number } | null) {
  return normalizeQuizTimerMode(pref?.mode === "timer" ? pref.seconds : "none");
}

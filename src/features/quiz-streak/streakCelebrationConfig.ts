export type StreakTier =
  | "correct"
  | "spark"
  | "energy"
  | "rocket"
  | "galaxy"
  | "milestone"
  | "legendary";

export type CelebrationOrigin = { x: number; y: number };

export type StreakCelebration = {
  id: number;
  streak: number;
  tier: StreakTier;
  xpAwarded: number;
  origin?: CelebrationOrigin;
};

export type StreakAnswerState = {
  streak: number;
  handledQuestionIds: ReadonlySet<string>;
};

export type StreakAnswerResult = {
  state: StreakAnswerState;
  accepted: boolean;
  celebration: Omit<StreakCelebration, "id"> | null;
};

export const LEGENDARY_MILESTONES = new Set([15, 20, 25, 30]);

export const STREAK_TIER_DURATION: Record<StreakTier, number> = {
  correct: 520,
  spark: 600,
  energy: 780,
  rocket: 940,
  galaxy: 1040,
  milestone: 1160,
  legendary: 1200,
};

export function getCelebrationDuration(streak: number, tier: StreakTier) {
  return streak >= 2 ? 2100 : STREAK_TIER_DURATION[tier];
}

export function getStreakTier(streak: number): StreakTier {
  if (LEGENDARY_MILESTONES.has(streak)) return "legendary";
  if (streak === 10) return "milestone";
  if (streak >= 7) return "galaxy";
  if (streak >= 5) return "rocket";
  if (streak >= 3) return "energy";
  if (streak >= 2) return "spark";
  return "correct";
}

export function getStreakMessage(streak: number, variant = 0): string {
  const tier = getStreakTier(streak);
  const messages: Record<StreakTier, string[]> = {
    correct: ["Correct!", "Well Done!", "Great Answer!"],
    spark: ["Nice!", "Great Start!", "Keep Going!"],
    energy: ["Awesome!", "Three in a Row!", "You're Flying!"],
    rocket: ["Amazing Streak!", "Cosmic Combo!", "Brilliant!"],
    galaxy: ["Unstoppable!", "Galaxy Brain!", "Star Student!"],
    milestone: ["10 COMBO!", "10 GALAXY COMBO!"],
    legendary: ["LEGENDARY!", "COSMIC GENIUS!", "GALAXY MASTER!", "UNSTOPPABLE!"],
  };
  const choices = messages[tier];
  return choices[Math.abs(variant) % choices.length];
}

export function getParticleCount(tier: StreakTier, mobile = false, reducedMotion = false) {
  if (reducedMotion) return 0;
  const counts: Record<StreakTier, number> = {
    correct: 5,
    spark: 7,
    energy: 13,
    rocket: 20,
    galaxy: 24,
    milestone: 28,
    legendary: 30,
  };
  const count = counts[tier];
  return mobile ? Math.max(4, Math.round(count * 0.7)) : count;
}

export function applyStreakAnswer(
  previous: StreakAnswerState,
  input: {
    questionId: string;
    correct: boolean;
    xpAwarded?: number;
    origin?: CelebrationOrigin;
  },
): StreakAnswerResult {
  if (previous.handledQuestionIds.has(input.questionId)) {
    return { state: previous, accepted: false, celebration: null };
  }

  const handledQuestionIds = new Set(previous.handledQuestionIds);
  handledQuestionIds.add(input.questionId);

  if (!input.correct) {
    return {
      state: { streak: 0, handledQuestionIds },
      accepted: true,
      celebration: null,
    };
  }

  const streak = previous.streak + 1;
  return {
    state: { streak, handledQuestionIds },
    accepted: true,
    celebration: {
      streak,
      tier: getStreakTier(streak),
      xpAwarded: Math.max(0, input.xpAwarded ?? 0),
      origin: input.origin,
    },
  };
}

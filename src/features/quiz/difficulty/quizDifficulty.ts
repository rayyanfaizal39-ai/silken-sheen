export type QuizDifficulty = "easy" | "medium" | "hard";

export type DifficultyIssue = {
  index: number;
  questionId: string;
  value: unknown;
};

const DIFFICULTY_ALIASES: Record<string, QuizDifficulty> = {
  easy: "easy",
  mudah: "easy",
  foundation: "easy",
  beginner: "easy",
  medium: "medium",
  sederhana: "medium",
  intermediate: "medium",
  hard: "hard",
  sukar: "hard",
  advanced: "hard",
  challenge: "hard",
};

export function normalizeQuizDifficulty(value: unknown): QuizDifficulty | null {
  if (typeof value !== "string") return null;
  return DIFFICULTY_ALIASES[value.trim().toLowerCase()] ?? null;
}

export function shuffleWithRandom<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function orderQuestionsByDifficulty<T extends { difficulty?: unknown; id?: string }>(
  questions: readonly T[],
  random: () => number = Math.random,
): { questions: T[]; issues: DifficultyIssue[] } {
  const tiers: Record<QuizDifficulty, T[]> = {
    easy: [],
    medium: [],
    hard: [],
  };
  const unresolved: T[] = [];
  const issues: DifficultyIssue[] = [];

  questions.forEach((question, index) => {
    const difficulty = normalizeQuizDifficulty(question.difficulty);
    if (difficulty) {
      tiers[difficulty].push(question);
      return;
    }

    issues.push({
      index,
      questionId: question.id ?? `question-${index + 1}`,
      value: question.difficulty,
    });
    unresolved.push(question);
  });

  return {
    questions: [
      ...shuffleWithRandom(tiers.easy, random),
      ...shuffleWithRandom(tiers.medium, random),
      // Invalid values are kept intact in a documented safe slot. The audit
      // treats them as critical, so production content should never reach it.
      ...shuffleWithRandom(unresolved, random),
      ...shuffleWithRandom(tiers.hard, random),
    ],
    issues,
  };
}

export function shuffleQuestionOptions<
  T extends { options: readonly string[]; answerIndex: number },
>(question: T, random: () => number = Math.random): T {
  const indexedOptions = question.options.map((option, originalIndex) => ({
    option,
    originalIndex,
  }));
  const shuffledOptions = shuffleWithRandom(indexedOptions, random);
  return {
    ...question,
    options: shuffledOptions.map(({ option }) => option),
    answerIndex: shuffledOptions.findIndex(
      ({ originalIndex }) => originalIndex === question.answerIndex,
    ),
  };
}

export type QuizAttemptSnapshot = {
  quizKey: string;
  attemptId: string;
  questionIds: string[];
};

export function createAttemptSnapshot<T extends { id?: string }>(
  quizKey: string,
  attemptId: string,
  questions: readonly T[],
): QuizAttemptSnapshot | null {
  const questionIds = questions.map((question) => question.id).filter(Boolean) as string[];
  if (questionIds.length !== questions.length || new Set(questionIds).size !== questionIds.length) {
    return null;
  }
  return { quizKey, attemptId, questionIds };
}

export function restoreAttemptOrder<T extends { id?: string }>(
  snapshot: QuizAttemptSnapshot,
  requestedQuizKey: string,
  questions: readonly T[],
): T[] | null {
  if (snapshot.quizKey !== requestedQuizKey) return null;
  const byId = new Map(questions.map((question) => [question.id, question]));
  const restored = snapshot.questionIds.map((id) => byId.get(id));
  if (restored.some((question) => !question) || restored.length !== questions.length) return null;
  return restored as T[];
}

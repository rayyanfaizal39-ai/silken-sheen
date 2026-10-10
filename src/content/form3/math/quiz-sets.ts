import type { QuizQuestion } from "@/data/content";

export const FORM3_MATH_QUIZ_SETS = ["A", "B"] as const;
export type Form3MathQuizSet = (typeof FORM3_MATH_QUIZ_SETS)[number];

// Keep ten varied Hard questions per chapter. The complete source banks remain
// available for content audits and future revision sets; only these 50 questions
// enter the student registry. BM and DLP use the same original question numbers.
const HARD_QUESTIONS: Record<number, readonly number[]> = {
  1: [41, 42, 43, 44, 45, 47, 51, 52, 57, 58],
  2: [41, 43, 44, 45, 47, 51, 53, 54, 55, 56],
  3: [41, 43, 44, 46, 47, 48, 49, 51, 54, 55],
  4: [41, 42, 43, 44, 45, 46, 48, 49, 52, 54],
  5: [43, 44, 45, 46, 47, 48, 49, 51, 52, 55],
  6: [41, 42, 45, 47, 48, 49, 50, 52, 54, 55],
  7: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  8: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  9: [41, 42, 43, 44, 45, 46, 47, 49, 50, 53],
};

/** Stable membership, independent of question or option shuffling. */
export function buildForm3MathQuizSets(
  chapter: number,
  source: readonly QuizQuestion[],
): QuizQuestion[] {
  const hard = HARD_QUESTIONS[chapter];
  if (!hard) throw new Error(`Unknown Form 3 Mathematics chapter: ${chapter}`);
  const membership = new Map<number, Form3MathQuizSet>();
  // Alternate nearby source questions to distribute subtopics across both sets.
  for (let number = 1; number <= 40; number++)
    membership.set(number, number % 2 ? "A" : "B");
  hard.forEach((number, i) => membership.set(number, i % 2 ? "B" : "A"));
  const questions = source.flatMap((question) => {
    const number = Number(/-q(\d+)$/.exec(question.id)?.[1]);
    const set = membership.get(number);
    return set ? [{ ...question, set }] : [];
  });
  for (const set of FORM3_MATH_QUIZ_SETS) {
    const pool = questions.filter((q) => q.set === set);
    const counts = ["Easy", "Medium", "Hard"].map(
      (d) => pool.filter((q) => q.difficulty === d).length,
    );
    if (
      pool.length !== 25 ||
      counts.join(",") !== "10,10,5" ||
      new Set(pool.map((q) => q.id)).size !== 25
    ) {
      throw new Error(
        `Chapter ${chapter} Set ${set} must contain 25 unique questions (10 Easy, 10 Medium, 5 Hard)`,
      );
    }
  }
  return questions;
}

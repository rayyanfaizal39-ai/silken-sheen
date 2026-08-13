import type { Difficulty, QuizQuestion } from "@/data/content";

export type LocalisedText = string | readonly [bm: string, dlp: string];

export interface PairedQuizSeed {
  readonly question: readonly [bm: string, dlp: string];
  readonly correct: LocalisedText;
  readonly distractors: readonly [LocalisedText, LocalisedText, LocalisedText];
  readonly explanation: readonly [bm: string, dlp: string];
}

const answerPositions = [
  0, 1, 2, 3, 1, 2, 3, 0, 2, 3, 0, 1, 3, 0, 1, 2, 0, 2, 1, 3, 2, 1, 3, 0, 1, 3, 0, 2, 3, 1,
] as const;

function localise(value: LocalisedText, language: "bm" | "dlp"): string {
  return typeof value === "string" ? value : value[language === "bm" ? 0 : 1];
}

function difficultyFor(index: number): Difficulty {
  if (index < 30) return "Easy";
  if (index < 75) return "Medium";
  return "Hard";
}

export function buildPairedQuizBank(
  chapter: 3 | 4 | 5,
  language: "bm" | "dlp",
  seeds: readonly PairedQuizSeed[],
): QuizQuestion[] {
  if (seeds.length !== 90) {
    throw new Error(`Math Form 2 Chapter ${chapter} ${language} requires exactly 90 questions.`);
  }

  return seeds.map((seed, index) => {
    const objectiveIndex = index % 30;
    const answerIndex = answerPositions[objectiveIndex];
    const correct = localise(seed.correct, language);
    const wrong = seed.distractors.map((option) => localise(option, language));
    const options = [...wrong] as string[];
    options.splice(answerIndex, 0, correct);
    const objective = index < 30 ? "f" : index < 60 ? "p" : "c";

    return {
      id: `${language}-f2-c${chapter}-${objective}${String(objectiveIndex + 1).padStart(2, "0")}`,
      subjectId: "math",
      form: "Form 2",
      difficulty: difficultyFor(index),
      chapter: `Chapter ${chapter}`,
      lang: language,
      question: seed.question[language === "bm" ? 0 : 1],
      options,
      answerIndex,
      explanation: seed.explanation[language === "bm" ? 0 : 1],
    };
  });
}

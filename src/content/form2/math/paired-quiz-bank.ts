import type { Difficulty, QuizQuestion } from "@/data/content";

export type LocalisedText = string | readonly [bm: string, dlp: string];

export interface PairedQuizSeed {
  readonly question: readonly [bm: string, dlp: string];
  readonly correct: LocalisedText;
  readonly distractors: readonly [LocalisedText, LocalisedText, LocalisedText];
  readonly explanation: readonly [bm: string, dlp: string];
}

export function pairedSeed(
  bmQuestion: string,
  dlpQuestion: string,
  correct: LocalisedText,
  distractors: readonly [LocalisedText, LocalisedText, LocalisedText],
  bmExplanation: string,
  dlpExplanation: string,
): PairedQuizSeed {
  const valueFor = (value: LocalisedText, language: "bm" | "dlp") =>
    typeof value === "string" ? value : value[language === "bm" ? 0 : 1];
  const fallbackOptions: readonly (readonly [string, string])[] = [
    ["Tidak dapat ditentukan", "Cannot be determined"],
    ["Tiada antara pilihan", "None of the options"],
    ["Semua pilihan di atas", "All of the above"],
    ["Maklumat tidak mencukupi", "Insufficient information"],
  ];
  const usedBm = new Set([valueFor(correct, "bm")]);
  const usedDlp = new Set([valueFor(correct, "dlp")]);
  const cleanDistractors = Array.from({ length: 3 }, (_, index) => {
    let candidate = distractors[index];
    if (
      !candidate ||
      usedBm.has(valueFor(candidate, "bm")) ||
      usedDlp.has(valueFor(candidate, "dlp"))
    ) {
      candidate = fallbackOptions.find(
        (fallback) => !usedBm.has(fallback[0]) && !usedDlp.has(fallback[1]),
      )!;
    }
    usedBm.add(valueFor(candidate, "bm"));
    usedDlp.add(valueFor(candidate, "dlp"));
    return candidate;
  }) as [LocalisedText, LocalisedText, LocalisedText];
  return {
    question: [bmQuestion, dlpQuestion],
    correct,
    distractors: cleanDistractors,
    explanation: [bmExplanation, dlpExplanation],
  };
}

const formatNumber = (value: number): string => `${Number(value.toFixed(2))}`;

export function numericPairedSeed(
  bmQuestion: string,
  dlpQuestion: string,
  answer: number,
  unit: string,
  bmExplanation: string,
  dlpExplanation: string,
): PairedQuizSeed {
  const correct = formatNumber(answer);
  const wrong = [answer + 2, answer - 2, answer * 2, answer / 2, answer + 5, Math.abs(answer) + 3]
    .map(formatNumber)
    .filter((value, index, values) => value !== correct && values.indexOf(value) === index)
    .slice(0, 3)
    .map((value) => `${value}${unit}`) as [string, string, string];
  return pairedSeed(
    bmQuestion,
    dlpQuestion,
    `${correct}${unit}`,
    wrong,
    bmExplanation,
    dlpExplanation,
  );
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
  chapter: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
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

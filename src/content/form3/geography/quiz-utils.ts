import type { QuizQuestion } from "@/data/types";

function normalize(value: string) {
  return value
    .toLocaleLowerCase("ms")
    .replace(/[.,;:!?()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function geoF3Question(
  chapter: number,
  number: number,
  question: string,
  correct: string,
  distractors: [string, string, string],
  explanation = correct,
): QuizQuestion {
  const difficulty = number <= 10 ? "Easy" : number <= 20 ? "Medium" : "Hard";
  const baseOptions = [correct, ...distractors];

  const normalized = baseOptions.map(normalize);
  if (new Set(normalized).size !== 4) {
    throw new Error(
      `Duplicate or equivalent options in Geography Form 3 Chapter ${chapter} Question ${number}`,
    );
  }

  const rotation = (number - 1) % 4;
  const options = [
    ...baseOptions.slice(rotation),
    ...baseOptions.slice(0, rotation),
  ];

  return {
    id: `geo-f3-c${chapter}-q${number}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: `Chapter ${chapter}`,
    lang: "bm",
    difficulty,
    question,
    options,
    answerIndex: options.indexOf(correct),
    explanation,
  };
}

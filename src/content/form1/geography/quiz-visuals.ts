import type { QuizQuestion } from "@/data/types";

/**
 * Carefully selected diagrammatic Geography Form 1 stimuli.
 * The source bank remains the sole source of question/answer truth.
 * No diagrams are attached to a changed stem automatically.
 * Each SVG is a static, self-contained illustration with no dependencies.
 */
export const GEOGRAPHY_F1_QUIZ_IMAGES: Readonly<Record<string, string>> = {
  "geo-f1-c1-q26": "/geography/form1/quiz-visuals/geo-f1-c1-q26.svg",
  "geo-f1-c2-q23": "/geography/form1/quiz-visuals/geo-f1-c2-q23.svg",
  "geo-f1-c3-q30": "/geography/form1/quiz-visuals/geo-f1-c3-q30.svg",
  "geo-f1-c5-q8": "/geography/form1/quiz-visuals/geo-f1-c5-q8.svg",
  "geo-f1-c7-q24": "/geography/form1/quiz-visuals/geo-f1-c7-q24.svg",
  "geo-f1-c9-q24": "/geography/form1/quiz-visuals/geo-f1-c9-q24.svg",
  "geo-f1-c12-q18": "/geography/form1/quiz-visuals/geo-f1-c12-q18.svg",
  "geo-f1-c13-q9": "/geography/form1/quiz-visuals/geo-f1-c13-q9.svg",
};

export function attachGeographyF1QuizVisuals<T extends QuizQuestion>(
  questions: readonly T[],
): T[] {
  return questions.map((question) => {
    const image = GEOGRAPHY_F1_QUIZ_IMAGES[question.id];
    return image ? { ...question, image } : question;
  });
}

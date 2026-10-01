import type { QuizQuestion } from "../types";

type SourceQuestion = {
  id: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: string;
  explanation: string;
};

type SourceQuiz = {
  chapter: number;
  set: string;
  total_questions: number;
  questions: SourceQuestion[];
};

const answerLetters = ["A", "B", "C", "D"] as const;

export function resolveSejarahF3Quiz(source: SourceQuiz): QuizQuestion[] {
  const set = source.set === "Set A" ? "A" : source.set === "Set B" ? "B" : null;
  if (!set || source.total_questions !== source.questions.length) {
    throw new Error(`Invalid Sejarah Form 3 quiz source: chapter ${source.chapter} ${source.set}`);
  }

  return source.questions.map((item) => {
    const answerIndex = answerLetters.findIndex((letter) => letter === item.answer);
    if (answerIndex < 0) throw new Error(`Invalid answer for question ${item.id}`);
    return {
      id: `sej-f3-c${source.chapter}-${set.toLowerCase()}-q${item.id}`,
      subjectId: "sejarah",
      form: "Form 3",
      chapter: `Chapter ${source.chapter}`,
      set,
      // The approved JSON has no question difficulty; retain the existing
      // Sejarah runtime tier and its corresponding catalog/XP behavior.
      difficulty: "Medium",
      question: item.question,
      options: answerLetters.map((letter) => item.options[letter]),
      answerIndex,
      explanation: item.explanation,
    };
  });
}

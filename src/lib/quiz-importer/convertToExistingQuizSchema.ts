import type { QuizQuestion } from "@/data/types";
import type { ImportedQuizQuestion, QuizDestination, QuizExportPackage } from "./types";

const SUBJECT_PREFIX: Record<string, string> = {
  bm: "bm",
  english: "eng",
  math: "math",
  science: "sci",
  sejarah: "sej",
  geography: "geo",
};

function formNumber(form: QuizDestination["form"]) {
  return form.match(/\d+/)?.[0] ?? "1";
}

function chapterNumber(chapterKey: string) {
  return chapterKey.match(/\d+/)?.[0] ?? "1";
}

function setSuffix(quizSet: QuizDestination["quizSet"]) {
  return quizSet === "chapter" ? "chapter" : quizSet;
}

export function getQuizDestinationPath(destination: QuizDestination) {
  const form = formNumber(destination.form);
  const chapter = chapterNumber(destination.chapterKey);
  if (destination.subjectId === "science" || destination.subjectId === "math") {
    return `src/content/form${form}/${destination.subjectId}/chapter-${chapter}/quizzes-${destination.language}.ts`;
  }
  if (destination.subjectId === "geography" && form === "3") {
    return `src/content/form3/geography/chapter-${chapter}/quizzes.ts`;
  }
  if (destination.subjectId === "sejarah" && form !== "1") {
    return `src/data/sejarah-f${form}-c${chapter}-quizzes.ts`;
  }
  if (destination.subjectId === "bm") {
    return `src/data/bm-f${form}-objektif-quizzes.ts`;
  }
  if (destination.subjectId === "english") {
    return form === "1"
      ? "src/content/form1/english/quizzes/paper-1-sets.ts"
      : `src/data/english-f${form}-quiz-sets.ts`;
  }
  return "src/data/quizzes.ts";
}

export function getQuizExportName(destination: QuizDestination) {
  const subject = SUBJECT_PREFIX[destination.subjectId] ?? destination.subjectId;
  const form = formNumber(destination.form);
  const chapter = chapterNumber(destination.chapterKey);
  const language = destination.language.toUpperCase();
  const set =
    destination.quizSet === "chapter" ? "" : destination.quizSet.replace("-", "").toUpperCase();
  return `${subject}F${form}C${chapter}${set}ImportedQuizzes${language}`.replace(
    /[^A-Za-z0-9_$]/g,
    "",
  );
}

export function convertToExistingQuizSchema(
  questions: ImportedQuizQuestion[],
  destination: QuizDestination,
  existingQuestionCount = 0,
): QuizQuestion[] {
  const form = formNumber(destination.form);
  const chapter = chapterNumber(destination.chapterKey);
  const prefix = SUBJECT_PREFIX[destination.subjectId] ?? destination.subjectId;
  return questions.map((question, index) => {
    const answerIndex = question.options.findIndex(
      (option) => option.id === question.correctOptionId,
    );
    return {
      id: `${prefix}-f${form}-c${chapter}-${destination.language}-${setSuffix(destination.quizSet)}-q${existingQuestionCount + index + 1}`,
      subjectId: destination.subjectId,
      form: destination.form,
      chapter: destination.chapterKey,
      lang: destination.language,
      difficulty: destination.difficulty,
      question: question.question.trim(),
      options: question.options.map((option) => option.text.trim()),
      answerIndex,
      ...(question.explanation.trim() ? { explanation: question.explanation.trim() } : {}),
    };
  });
}

export function createQuizExportPackage(
  questions: ImportedQuizQuestion[],
  destination: QuizDestination,
  existingQuestionCount = 0,
): QuizExportPackage {
  const converted = convertToExistingQuizSchema(questions, destination, existingQuestionCount);
  const exportName = getQuizExportName(destination);
  const destinationPath = getQuizDestinationPath(destination);
  const source = [
    'import type { QuizQuestion } from "@/data/types";',
    "",
    `export const ${exportName}: QuizQuestion[] = ${JSON.stringify(converted, null, 2)};`,
    "",
  ].join("\n");
  return {
    questions: converted,
    source,
    destinationPath,
    downloadFileName: `quiz-import-${destination.subjectId}-f${formNumber(destination.form)}-c${chapterNumber(destination.chapterKey)}-${destination.language}-${destination.quizSet}.ts`,
    exportName,
  };
}

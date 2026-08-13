import type { QuizQuestion } from "../src/data/content";
import {
  mathF2C6QuizzesBM,
  mathF2C6FoundationQuizzesBM,
  mathF2C6PracticeQuizzesBM,
  mathF2C6ChallengeQuizzesBM,
} from "../src/content/form2/math/chapter-6/quizzes-bm";
import {
  mathF2C6QuizzesDLP,
  mathF2C6FoundationQuizzesDLP,
  mathF2C6PracticeQuizzesDLP,
  mathF2C6ChallengeQuizzesDLP,
} from "../src/content/form2/math/chapter-6/quizzes-dlp";
import {
  mathF2C7QuizzesBM,
  mathF2C7FoundationQuizzesBM,
  mathF2C7PracticeQuizzesBM,
  mathF2C7ChallengeQuizzesBM,
} from "../src/content/form2/math/chapter-7/quizzes-bm";
import {
  mathF2C7QuizzesDLP,
  mathF2C7FoundationQuizzesDLP,
  mathF2C7PracticeQuizzesDLP,
  mathF2C7ChallengeQuizzesDLP,
} from "../src/content/form2/math/chapter-7/quizzes-dlp";
import {
  mathF2C8QuizzesBM,
  mathF2C8FoundationQuizzesBM,
  mathF2C8PracticeQuizzesBM,
  mathF2C8ChallengeQuizzesBM,
} from "../src/content/form2/math/chapter-8/quizzes-bm";
import {
  mathF2C8QuizzesDLP,
  mathF2C8FoundationQuizzesDLP,
  mathF2C8PracticeQuizzesDLP,
  mathF2C8ChallengeQuizzesDLP,
} from "../src/content/form2/math/chapter-8/quizzes-dlp";

type Language = "bm" | "dlp";
type Chapter = 6 | 7 | 8;
type Entry = {
  chapter: Chapter;
  language: Language;
  all: QuizQuestion[];
  objectives: QuizQuestion[][];
};

const entries: Entry[] = [
  {
    chapter: 6,
    language: "bm",
    all: mathF2C6QuizzesBM,
    objectives: [
      mathF2C6FoundationQuizzesBM,
      mathF2C6PracticeQuizzesBM,
      mathF2C6ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 6,
    language: "dlp",
    all: mathF2C6QuizzesDLP,
    objectives: [
      mathF2C6FoundationQuizzesDLP,
      mathF2C6PracticeQuizzesDLP,
      mathF2C6ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 7,
    language: "bm",
    all: mathF2C7QuizzesBM,
    objectives: [
      mathF2C7FoundationQuizzesBM,
      mathF2C7PracticeQuizzesBM,
      mathF2C7ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 7,
    language: "dlp",
    all: mathF2C7QuizzesDLP,
    objectives: [
      mathF2C7FoundationQuizzesDLP,
      mathF2C7PracticeQuizzesDLP,
      mathF2C7ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 8,
    language: "bm",
    all: mathF2C8QuizzesBM,
    objectives: [
      mathF2C8FoundationQuizzesBM,
      mathF2C8PracticeQuizzesBM,
      mathF2C8ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 8,
    language: "dlp",
    all: mathF2C8QuizzesDLP,
    objectives: [
      mathF2C8FoundationQuizzesDLP,
      mathF2C8PracticeQuizzesDLP,
      mathF2C8ChallengeQuizzesDLP,
    ],
  },
];

const errors: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};
const normalise = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

for (const entry of entries) {
  const label = `Chapter ${entry.chapter} ${entry.language.toUpperCase()}`;
  check(entry.all.length === 90, `${label}: expected 90 questions, found ${entry.all.length}`);
  check(
    entry.objectives.every((bank) => bank.length === 30),
    `${label}: objectives must contain 30/30/30 questions`,
  );
  check(
    entry.objectives
      .flat()
      .map(({ id }) => id)
      .join("|") === entry.all.map(({ id }) => id).join("|"),
    `${label}: objective slices do not reconstruct the full bank`,
  );
  const ids = new Set<string>();
  const questions = new Set<string>();
  entry.all.forEach((question, index) => {
    const where = `${label} #${index + 1}`;
    check(Boolean(question.id), `${where}: missing id`);
    check(!ids.has(question.id), `${where}: duplicate id ${question.id}`);
    ids.add(question.id);
    check(
      question.subjectId === "math" && question.form === "Form 2",
      `${where}: incorrect subject/form metadata`,
    );
    check(
      question.chapter === `Chapter ${entry.chapter}` && question.lang === entry.language,
      `${where}: incorrect chapter/language metadata`,
    );
    check(
      question.options.length === 4 && new Set(question.options).size === 4,
      `${where}: options must be four unique values`,
    );
    check(question.answerIndex >= 0 && question.answerIndex < 4, `${where}: invalid answerIndex`);
    check(
      Boolean(question.question.trim()) && Boolean(question.explanation?.trim()),
      `${where}: blank question or explanation`,
    );
    const key = normalise(question.question);
    check(!questions.has(key), `${where}: duplicate question text`);
    questions.add(key);
    check(
      index < 30
        ? question.difficulty === "Easy"
        : index < 60
          ? question.difficulty === "Medium"
          : ["Medium", "Hard"].includes(question.difficulty),
      `${where}: incorrect objective difficulty`,
    );
  });
}

for (const chapter of [6, 7, 8] as const) {
  const bm = entries.find((entry) => entry.chapter === chapter && entry.language === "bm")!;
  const dlp = entries.find((entry) => entry.chapter === chapter && entry.language === "dlp")!;
  check(
    bm.all.every((question, index) => question.answerIndex === dlp.all[index].answerIndex),
    `Chapter ${chapter}: BM/DLP answer positions are not aligned`,
  );
}

if (errors.length) {
  console.error(
    `Batch B validation failed with ${errors.length} error(s):\n${errors.map((error) => `- ${error}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    "Batch B validation passed: 540 questions across Chapters 6–8, BM/DLP, with 30/30/30 objective banks.",
  );
}

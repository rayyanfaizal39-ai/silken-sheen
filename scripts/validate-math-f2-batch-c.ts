import type { QuizQuestion } from "../src/data/content";
import * as c9bm from "../src/content/form2/math/chapter-9/quizzes-bm";
import * as c9dlp from "../src/content/form2/math/chapter-9/quizzes-dlp";
import * as c10bm from "../src/content/form2/math/chapter-10/quizzes-bm";
import * as c10dlp from "../src/content/form2/math/chapter-10/quizzes-dlp";
import * as c11bm from "../src/content/form2/math/chapter-11/quizzes-bm";
import * as c11dlp from "../src/content/form2/math/chapter-11/quizzes-dlp";
import * as c12bm from "../src/content/form2/math/chapter-12/quizzes-bm";
import * as c12dlp from "../src/content/form2/math/chapter-12/quizzes-dlp";
import * as c13bm from "../src/content/form2/math/chapter-13/quizzes-bm";
import * as c13dlp from "../src/content/form2/math/chapter-13/quizzes-dlp";

type Chapter = 9 | 10 | 11 | 12 | 13;
type Language = "bm" | "dlp";
type Entry = {
  chapter: Chapter;
  language: Language;
  all: QuizQuestion[];
  objectives: QuizQuestion[][];
};
const entries: Entry[] = [
  {
    chapter: 9,
    language: "bm",
    all: c9bm.mathF2C9QuizzesBM,
    objectives: [
      c9bm.mathF2C9FoundationQuizzesBM,
      c9bm.mathF2C9PracticeQuizzesBM,
      c9bm.mathF2C9ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 9,
    language: "dlp",
    all: c9dlp.mathF2C9QuizzesDLP,
    objectives: [
      c9dlp.mathF2C9FoundationQuizzesDLP,
      c9dlp.mathF2C9PracticeQuizzesDLP,
      c9dlp.mathF2C9ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 10,
    language: "bm",
    all: c10bm.mathF2C10QuizzesBM,
    objectives: [
      c10bm.mathF2C10FoundationQuizzesBM,
      c10bm.mathF2C10PracticeQuizzesBM,
      c10bm.mathF2C10ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 10,
    language: "dlp",
    all: c10dlp.mathF2C10QuizzesDLP,
    objectives: [
      c10dlp.mathF2C10FoundationQuizzesDLP,
      c10dlp.mathF2C10PracticeQuizzesDLP,
      c10dlp.mathF2C10ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 11,
    language: "bm",
    all: c11bm.mathF2C11QuizzesBM,
    objectives: [
      c11bm.mathF2C11FoundationQuizzesBM,
      c11bm.mathF2C11PracticeQuizzesBM,
      c11bm.mathF2C11ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 11,
    language: "dlp",
    all: c11dlp.mathF2C11QuizzesDLP,
    objectives: [
      c11dlp.mathF2C11FoundationQuizzesDLP,
      c11dlp.mathF2C11PracticeQuizzesDLP,
      c11dlp.mathF2C11ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 12,
    language: "bm",
    all: c12bm.mathF2C12QuizzesBM,
    objectives: [
      c12bm.mathF2C12FoundationQuizzesBM,
      c12bm.mathF2C12PracticeQuizzesBM,
      c12bm.mathF2C12ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 12,
    language: "dlp",
    all: c12dlp.mathF2C12QuizzesDLP,
    objectives: [
      c12dlp.mathF2C12FoundationQuizzesDLP,
      c12dlp.mathF2C12PracticeQuizzesDLP,
      c12dlp.mathF2C12ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 13,
    language: "bm",
    all: c13bm.mathF2C13QuizzesBM,
    objectives: [
      c13bm.mathF2C13FoundationQuizzesBM,
      c13bm.mathF2C13PracticeQuizzesBM,
      c13bm.mathF2C13ChallengeQuizzesBM,
    ],
  },
  {
    chapter: 13,
    language: "dlp",
    all: c13dlp.mathF2C13QuizzesDLP,
    objectives: [
      c13dlp.mathF2C13FoundationQuizzesDLP,
      c13dlp.mathF2C13PracticeQuizzesDLP,
      c13dlp.mathF2C13ChallengeQuizzesDLP,
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
  check(entry.all.length === 90, `${label}: expected 90, found ${entry.all.length}`);
  check(
    entry.objectives.every((bank) => bank.length === 30),
    `${label}: objectives must be 30/30/30`,
  );
  check(
    entry.objectives
      .flat()
      .map((q) => q.id)
      .join("|") === entry.all.map((q) => q.id).join("|"),
    `${label}: objective slices do not reconstruct full bank`,
  );
  const ids = new Set<string>();
  const texts = new Set<string>();
  entry.all.forEach((question, index) => {
    const where = `${label} #${index + 1}`;
    check(Boolean(question.id), `${where}: missing id`);
    check(!ids.has(question.id), `${where}: duplicate id`);
    ids.add(question.id);
    check(
      question.subjectId === "math" &&
        question.form === "Form 2" &&
        question.chapter === `Chapter ${entry.chapter}` &&
        question.lang === entry.language,
      `${where}: incorrect metadata`,
    );
    check(
      question.options.length === 4 && new Set(question.options).size === 4,
      `${where}: options must be four unique values`,
    );
    check(
      Number.isInteger(question.answerIndex) &&
        question.answerIndex >= 0 &&
        question.answerIndex < 4,
      `${where}: invalid answer index`,
    );
    check(
      Boolean(question.question.trim()) && Boolean(question.explanation?.trim()),
      `${where}: blank question or explanation`,
    );
    const key = normalise(question.question);
    check(!texts.has(key), `${where}: duplicate question text`);
    texts.add(key);
    check(
      index < 30
        ? question.difficulty === "Easy"
        : index < 60
          ? question.difficulty === "Medium"
          : ["Medium", "Hard"].includes(question.difficulty),
      `${where}: incorrect difficulty`,
    );
  });
}
for (const chapter of [9, 10, 11, 12, 13] as const) {
  const bm = entries.find((e) => e.chapter === chapter && e.language === "bm")!;
  const dlp = entries.find((e) => e.chapter === chapter && e.language === "dlp")!;
  check(
    bm.all.every((q, i) => q.answerIndex === dlp.all[i].answerIndex),
    `Chapter ${chapter}: BM/DLP pairing mismatch`,
  );
}
if (errors.length) {
  console.error(
    `Batch C validation failed with ${errors.length} error(s):\n${errors.map((error) => `- ${error}`).join("\n")}`,
  );
  process.exitCode = 1;
} else
  console.log(
    "Batch C validation passed: 900 questions across Chapters 9–13, BM/DLP, with 30/30/30 objective banks.",
  );

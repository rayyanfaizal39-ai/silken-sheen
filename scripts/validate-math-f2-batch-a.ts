import { readFileSync } from "node:fs";
import {
  mathF2C3ChallengeQuizzesBM,
  mathF2C3FoundationQuizzesBM,
  mathF2C3PracticeQuizzesBM,
  mathF2C3QuizzesBM,
} from "../src/content/form2/math/chapter-3/quizzes-bm";
import {
  mathF2C3ChallengeQuizzesDLP,
  mathF2C3FoundationQuizzesDLP,
  mathF2C3PracticeQuizzesDLP,
  mathF2C3QuizzesDLP,
} from "../src/content/form2/math/chapter-3/quizzes-dlp";
import {
  mathF2C4ChallengeQuizzesBM,
  mathF2C4FoundationQuizzesBM,
  mathF2C4PracticeQuizzesBM,
  mathF2C4QuizzesBM,
} from "../src/content/form2/math/chapter-4/quizzes-bm";
import {
  mathF2C4ChallengeQuizzesDLP,
  mathF2C4FoundationQuizzesDLP,
  mathF2C4PracticeQuizzesDLP,
  mathF2C4QuizzesDLP,
} from "../src/content/form2/math/chapter-4/quizzes-dlp";
import {
  mathF2C5ChallengeQuizzesBM,
  mathF2C5FoundationQuizzesBM,
  mathF2C5PracticeQuizzesBM,
  mathF2C5QuizzesBM,
} from "../src/content/form2/math/chapter-5/quizzes-bm";
import {
  mathF2C5ChallengeQuizzesDLP,
  mathF2C5FoundationQuizzesDLP,
  mathF2C5PracticeQuizzesDLP,
  mathF2C5QuizzesDLP,
} from "../src/content/form2/math/chapter-5/quizzes-dlp";
import type { QuizQuestion } from "../src/data/content";

type Language = "bm" | "dlp";
type Objective = "foundation" | "practice" | "challenge";

interface Bank {
  chapter: 3 | 4 | 5;
  language: Language;
  questions: QuizQuestion[];
}

const banks: Bank[] = [
  { chapter: 3, language: "bm", questions: mathF2C3QuizzesBM },
  { chapter: 3, language: "dlp", questions: mathF2C3QuizzesDLP },
  { chapter: 4, language: "bm", questions: mathF2C4QuizzesBM },
  { chapter: 4, language: "dlp", questions: mathF2C4QuizzesDLP },
  { chapter: 5, language: "bm", questions: mathF2C5QuizzesBM },
  { chapter: 5, language: "dlp", questions: mathF2C5QuizzesDLP },
];

const objectiveBanks = [
  { chapter: 3, language: "bm", objective: "foundation", questions: mathF2C3FoundationQuizzesBM },
  { chapter: 3, language: "bm", objective: "practice", questions: mathF2C3PracticeQuizzesBM },
  { chapter: 3, language: "bm", objective: "challenge", questions: mathF2C3ChallengeQuizzesBM },
  { chapter: 3, language: "dlp", objective: "foundation", questions: mathF2C3FoundationQuizzesDLP },
  { chapter: 3, language: "dlp", objective: "practice", questions: mathF2C3PracticeQuizzesDLP },
  { chapter: 3, language: "dlp", objective: "challenge", questions: mathF2C3ChallengeQuizzesDLP },
  { chapter: 4, language: "bm", objective: "foundation", questions: mathF2C4FoundationQuizzesBM },
  { chapter: 4, language: "bm", objective: "practice", questions: mathF2C4PracticeQuizzesBM },
  { chapter: 4, language: "bm", objective: "challenge", questions: mathF2C4ChallengeQuizzesBM },
  { chapter: 4, language: "dlp", objective: "foundation", questions: mathF2C4FoundationQuizzesDLP },
  { chapter: 4, language: "dlp", objective: "practice", questions: mathF2C4PracticeQuizzesDLP },
  { chapter: 4, language: "dlp", objective: "challenge", questions: mathF2C4ChallengeQuizzesDLP },
  { chapter: 5, language: "bm", objective: "foundation", questions: mathF2C5FoundationQuizzesBM },
  { chapter: 5, language: "bm", objective: "practice", questions: mathF2C5PracticeQuizzesBM },
  { chapter: 5, language: "bm", objective: "challenge", questions: mathF2C5ChallengeQuizzesBM },
  { chapter: 5, language: "dlp", objective: "foundation", questions: mathF2C5FoundationQuizzesDLP },
  { chapter: 5, language: "dlp", objective: "practice", questions: mathF2C5PracticeQuizzesDLP },
  { chapter: 5, language: "dlp", objective: "challenge", questions: mathF2C5ChallengeQuizzesDLP },
] as const;

const errors: string[] = [];
const warnings: string[] = [];

function fail(condition: unknown, message: string): asserts condition {
  if (!condition) errors.push(message);
}

function objectiveOf(index: number): Objective {
  if (index < 30) return "foundation";
  if (index < 60) return "practice";
  return "challenge";
}

function normalise(text: string, replaceNumbers = false): string {
  const withMathWords = text
    .replace(/=/g, " equals ")
    .replace(/\+/g, " plus ")
    .replace(/[−-]/g, " minus ")
    .replace(/[÷/]/g, " dividedby ")
    .replace(/[×*]/g, " times ");
  const withoutNumbers = replaceNumbers
    ? withMathWords.replace(/\d+(?:\.\d+)?/g, " # ")
    : withMathWords;
  return withoutNumbers
    .toLocaleLowerCase("en")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}#]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function jaccard(left: string, right: string): number {
  const a = new Set(left.split(" "));
  const b = new Set(right.split(" "));
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}

function answerDistribution(questions: QuizQuestion[]): string {
  const counts = [0, 0, 0, 0];
  questions.forEach(({ answerIndex }) => counts[answerIndex]++);
  return counts.join("/");
}

for (const bank of banks) {
  const label = `Chapter ${bank.chapter} ${bank.language.toUpperCase()}`;
  fail(
    bank.questions.length === 90,
    `${label}: expected 90 questions, found ${bank.questions.length}`,
  );

  const ids = new Set<string>();
  const exactQuestions = new Map<string, string>();
  const templatedQuestions = new Map<string, string>();
  const optionSets = new Map<string, { where: string; question: string }>();

  bank.questions.forEach((question, index) => {
    const where = `${label} ${objectiveOf(index)} #${(index % 30) + 1}`;
    fail(Boolean(question.id.trim()), `${where}: missing id`);
    fail(!ids.has(question.id), `${where}: duplicate id ${question.id}`);
    ids.add(question.id);
    fail(question.subjectId === "math", `${where}: subjectId must be math`);
    fail(question.form === "Form 2", `${where}: form must be Form 2`);
    fail(question.chapter === `Chapter ${bank.chapter}`, `${where}: incorrect chapter metadata`);
    fail(question.lang === bank.language, `${where}: incorrect language metadata`);
    fail(Boolean(question.question.trim()), `${where}: empty question`);
    fail(question.options.length === 4, `${where}: expected exactly four options`);
    fail(new Set(question.options).size === 4, `${where}: options are not unique`);
    fail(
      Number.isInteger(question.answerIndex) &&
        question.answerIndex >= 0 &&
        question.answerIndex < 4,
      `${where}: invalid answerIndex`,
    );
    fail(Boolean(question.explanation?.trim()), `${where}: missing explanation`);

    if (index < 30) fail(question.difficulty === "Easy", `${where}: Foundation must be Easy`);
    if (index >= 30 && index < 60)
      fail(question.difficulty === "Medium", `${where}: Practice must be Medium`);
    if (index >= 60)
      fail(
        ["Medium", "Hard"].includes(question.difficulty),
        `${where}: Challenge must be Medium–Hard`,
      );

    const exact = normalise(question.question);
    const priorExact = exactQuestions.get(exact);
    fail(!priorExact, `${where}: exact duplicate of ${priorExact}`);
    exactQuestions.set(exact, where);

    const templated = normalise(question.question, true);
    const priorTemplate = templatedQuestions.get(templated);
    fail(!priorTemplate, `${where}: number-only near-duplicate of ${priorTemplate}`);
    templatedQuestions.set(templated, where);

    const optionKey = question.options
      .map((option) => normalise(option))
      .sort()
      .join("|");
    const priorOptions = optionSets.get(optionKey);
    if (priorOptions && jaccard(normalise(question.question), priorOptions.question) >= 0.5) {
      warnings.push(`${where}: suspicious option set also used by ${priorOptions.where}`);
    } else if (!priorOptions) {
      optionSets.set(optionKey, { where, question: normalise(question.question) });
    }

    const studentFacing = [question.question, ...question.options, question.explanation ?? ""].join(
      " ",
    );
    if (bank.language === "bm") {
      const leaked = studentFacing.match(
        /\b(find|calculate|which of the following|factorise|circumference)\b/i,
      );
      fail(!leaked, `${where}: possible English leakage “${leaked?.[0]}”`);
    } else {
      const leaked = studentFacing.match(
        /\b(hitung|tentukan|faktorkan|pilih|jejari|lilitan|bulatan|perentas)\b/i,
      );
      fail(!leaked, `${where}: possible BM leakage “${leaked?.[0]}”`);
    }
  });

  for (let left = 0; left < bank.questions.length; left++) {
    const a = normalise(bank.questions[left].question, true);
    if (a.split(" ").length < 7) continue;
    for (let right = left + 1; right < bank.questions.length; right++) {
      const b = normalise(bank.questions[right].question, true);
      if (b.split(" ").length < 7 || a === b) continue;
      const similarity = jaccard(a, b);
      if (similarity >= 0.9) {
        warnings.push(
          `${label}: possible near-duplicate q${left + 1}/q${right + 1} (${similarity.toFixed(2)})`,
        );
      }
    }
  }

  for (let start = 0; start < 90; start += 30) {
    const distribution = answerDistribution(bank.questions.slice(start, start + 30));
    const counts = distribution.split("/").map(Number);
    fail(
      counts.every((count) => count >= 7 && count <= 8),
      `${label} ${objectiveOf(start)}: unbalanced A/B/C/D distribution ${distribution}`,
    );
  }
}

const everyQuestion = banks.flatMap(({ questions }) => questions);
fail(everyQuestion.length === 540, `Batch total must be 540, found ${everyQuestion.length}`);
fail(new Set(everyQuestion.map(({ id }) => id)).size === 540, "Duplicate IDs exist across Batch A");

for (const bank of objectiveBanks) {
  const label = `Chapter ${bank.chapter} ${bank.language.toUpperCase()} ${bank.objective}`;
  fail(
    bank.questions.length === 30,
    `${label}: expected 30 questions, found ${bank.questions.length}`,
  );
  fail(
    bank.questions.every(
      ({ chapter, lang }) => chapter === `Chapter ${bank.chapter}` && lang === bank.language,
    ),
    `${label}: contains a question from another chapter or language`,
  );
  if (bank.objective === "foundation") {
    fail(
      bank.questions.every(({ difficulty }) => difficulty === "Easy"),
      `${label}: contains a non-Easy question`,
    );
  } else if (bank.objective === "practice") {
    fail(
      bank.questions.every(({ difficulty }) => difficulty === "Medium"),
      `${label}: contains a non-Medium question`,
    );
  } else {
    fail(
      bank.questions.every(({ difficulty }) => ["Medium", "Hard"].includes(difficulty)),
      `${label}: contains a question outside Medium–Hard`,
    );
  }
}

for (const bank of banks) {
  const grouped = objectiveBanks.filter(
    (candidate) => candidate.chapter === bank.chapter && candidate.language === bank.language,
  );
  const groupedIds = grouped.flatMap(({ questions }) => questions.map(({ id }) => id));
  const completeIds = bank.questions.map(({ id }) => id);
  fail(
    new Set(groupedIds).size === 90,
    `Chapter ${bank.chapter} ${bank.language.toUpperCase()}: a question appears in more than one Objective`,
  );
  fail(
    groupedIds.length === completeIds.length && groupedIds.every((id) => completeIds.includes(id)),
    `Chapter ${bank.chapter} ${bank.language.toUpperCase()}: grouping lost or introduced a question`,
  );
}

const representativePaths = [
  [3, "bm", "foundation"],
  [4, "bm", "practice"],
  [5, "bm", "challenge"],
  [3, "dlp", "challenge"],
  [4, "dlp", "foundation"],
  [5, "dlp", "practice"],
] as const;

for (const [chapter, language, objective] of representativePaths) {
  const selected = objectiveBanks.find(
    (bank) =>
      bank.chapter === chapter && bank.language === language && bank.objective === objective,
  );
  fail(
    selected?.questions.length === 30,
    `Representative path ${language}/Chapter ${chapter}/${objective} did not resolve to exactly 30 questions`,
  );
}

const routeSource = readFileSync(new URL("../src/routes/quizzes.tsx", import.meta.url), "utf8");
for (const chapter of [3, 4, 5]) {
  for (const language of ["BM", "DLP"]) {
    for (const [objectiveId, objectiveName] of [
      ["objective-1", "Foundation"],
      ["objective-2", "Practice"],
      ["objective-3", "Challenge"],
    ] as const) {
      fail(
        routeSource.includes(
          `${language.toLowerCase()}: mathF2C${chapter}${objectiveName}Quizzes${language}`,
        ),
        `Route is missing Chapter ${chapter} ${language} ${objectiveId} mapping`,
      );
    }
  }
  fail(
    routeSource.includes(`isForm2Chapter${chapter}DlpObjective`) &&
      routeSource.includes(`isForm2Chapter${chapter}BmObjective`),
    `Route Objective-mode gate is missing Form 2 Chapter ${chapter}`,
  );
}
fail(
  routeSource.includes("setMathShuffledQuestions(buildShuffledMathPool(mathObjectiveQuestions))"),
  "Objective shuffle does not start from the selected Objective bank",
);

for (const chapter of [3, 4, 5] as const) {
  const bm = banks.find((bank) => bank.chapter === chapter && bank.language === "bm")!.questions;
  const dlp = banks.find((bank) => bank.chapter === chapter && bank.language === "dlp")!.questions;
  bm.forEach((question, index) => {
    const counterpart = dlp[index];
    fail(
      question !== counterpart,
      `Chapter ${chapter} pair ${index + 1}: BM and DLP share an object reference`,
    );
    fail(
      question.options !== counterpart.options,
      `Chapter ${chapter} pair ${index + 1}: BM and DLP share an options reference`,
    );
    fail(
      question.answerIndex === counterpart.answerIndex,
      `Chapter ${chapter} pair ${index + 1}: answer positions differ`,
    );
  });
}

if (warnings.length) {
  console.warn(`Review warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error(`Validation failed (${errors.length} errors):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("Math Form 2 Batch A validation passed.");
  console.log(
    "Counts: Chapter 3, 4 and 5 BM/DLP = 30 Foundation + 30 Practice + 30 Challenge each.",
  );
  console.log(
    `Total: ${everyQuestion.length} questions. Duplicate/schema/language/isolation checks passed.`,
  );
}

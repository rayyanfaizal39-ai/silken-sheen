import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(
  repositoryRoot,
  "outputs",
  "science-form3-master-quizzes",
  "sains-t3-kssm-quizzes-master-updated.csv",
);
const supplementalSourcePath = path.join(
  repositoryRoot,
  "outputs",
  "science-form3-ch7-10-quizzes",
  "science-f3-ch7-10-normalized.json",
);
const outputPath = path.join(
  repositoryRoot,
  "src",
  "content",
  "form3",
  "science",
  "master-quizzes.generated.ts",
);

const requiredColumns = [
  "chapter_number",
  "set_letter",
  "question_number",
  "question_malay",
  "question_english",
  "option_a_malay",
  "option_a_english",
  "option_b_malay",
  "option_b_english",
  "option_c_malay",
  "option_c_english",
  "option_d_malay",
  "option_d_english",
  "correct_answer",
  "explanation",
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        cell += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }

  const headers = rows.shift()?.map((header) => header.replace(/^\uFEFF/, "")) ?? [];
  return rows
    .filter((values) => values.some((value) => value !== ""))
    .map((values) =>
      Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
    );
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function difficultyFor(questionNumber) {
  if (questionNumber <= 8) return "Easy";
  if (questionNumber <= 19) return "Medium";
  return "Hard";
}

function runtimeQuestion(row, language) {
  const chapter = Number(row.chapter_number);
  const questionNumber = Number(row.question_number);
  const suffix = language === "bm" ? "malay" : "english";
  return {
    id: `sci-f3-c${chapter}-set-${row.set_letter.toLowerCase()}-${language}-q${questionNumber}`,
    subjectId: "science",
    form: "Form 3",
    chapter: `Chapter ${chapter}`,
    lang: language,
    set: row.set_letter,
    difficulty: difficultyFor(questionNumber),
    question: row[`question_${suffix}`],
    options: ["a", "b", "c", "d"].map((letter) => row[`option_${letter}_${suffix}`]),
    answerIndex: row.correct_answer.charCodeAt(0) - 65,
    explanation: row.explanation,
  };
}

assert(fs.existsSync(sourcePath), `Science Form 3 master CSV not found: ${sourcePath}`);
assert(
  fs.existsSync(supplementalSourcePath),
  `Science Form 3 Chapter 7-10 source not found: ${supplementalSourcePath}`,
);
const allRows = [
  ...parseCsv(fs.readFileSync(sourcePath, "utf8")).filter((row) => {
    const chapter = Number(row.chapter_number);
    return chapter >= 1 && chapter <= 5;
  }),
  ...JSON.parse(fs.readFileSync(supplementalSourcePath, "utf8")),
];
const headers = Object.keys(allRows[0] ?? {});
for (const column of requiredColumns) {
  assert(headers.includes(column), `Missing required master CSV column: ${column}`);
}

const generatedChapters = [1, 2, 3, 4, 5, 7, 8, 9, 10];
const rows = allRows.filter((row) => generatedChapters.includes(Number(row.chapter_number)));
assert(rows.length === 450, `Expected 450 Chapter 1-5 and 7-10 rows, found ${rows.length}`);

const seenIds = new Set();
const seenQuestions = { bm: new Set(), dlp: new Set() };
const banks = {};

for (const chapter of generatedChapters) {
  banks[chapter] = { bm: [], dlp: [] };
  for (const set of ["A", "B"]) {
    const group = rows
      .filter((row) => Number(row.chapter_number) === chapter && row.set_letter === set)
      .sort((left, right) => Number(left.question_number) - Number(right.question_number));
    assert(
      group.length === 25,
      `Chapter ${chapter} Set ${set}: expected 25 rows, found ${group.length}`,
    );

    group.forEach((row, index) => {
      assert(
        Number(row.question_number) === index + 1,
        `Chapter ${chapter} Set ${set}: invalid question order`,
      );
      for (const column of requiredColumns) {
        assert(
          String(row[column] ?? "").trim() !== "",
          `Chapter ${chapter} Set ${set} Q${index + 1}: blank ${column}`,
        );
      }
      assert(
        /^[ABCD]$/.test(row.correct_answer),
        `Chapter ${chapter} Set ${set} Q${index + 1}: invalid answer`,
      );

      for (const language of ["bm", "dlp"]) {
        const question = runtimeQuestion(row, language);
        assert(!seenIds.has(question.id), `Duplicate generated ID: ${question.id}`);
        assert(
          !seenQuestions[language].has(question.question),
          `Duplicate ${language.toUpperCase()} question: ${question.question}`,
        );
        seenIds.add(question.id);
        seenQuestions[language].add(question.question);
        banks[chapter][language].push(question);
      }
    });
  }
}

const banner = [
  "// This file is generated. Do not edit it by hand.",
  "// Sources: outputs/science-form3-master-quizzes/sains-t3-kssm-quizzes-master-updated.csv",
  "//          outputs/science-form3-ch7-10-quizzes/science-f3-ch7-10-normalized.json",
  "// Regenerate with: node scripts/generate-science-f3-runtime-quizzes.mjs",
  "/* eslint-disable prettier/prettier */",
  "",
  'import type { QuizQuestion } from "@/data/content";',
  "",
  'export type ScienceF3MasterQuizLanguage = "bm" | "dlp";',
  'export type ScienceF3MasterQuizSet = "A" | "B";',
  "",
  "const scienceF3MasterQuizBanks: Partial<",
  "  Record<number, Record<ScienceF3MasterQuizLanguage, QuizQuestion[]>>",
  `> = ${JSON.stringify(banks, null, 2)};`,
  "",
  "export function getScienceF3MasterQuizzes(",
  "  chapter: number,",
  "  language: ScienceF3MasterQuizLanguage,",
  "): QuizQuestion[] {",
  "  return scienceF3MasterQuizBanks[chapter]?.[language] ?? [];",
  "}",
  "",
].join("\n");

fs.writeFileSync(outputPath, banner, "utf8");
console.log(
  `Generated ${rows.length * 2} localized runtime questions from ${rows.length} master CSV rows.`,
);
console.log(`Wrote ${path.relative(repositoryRoot, outputPath)}.`);

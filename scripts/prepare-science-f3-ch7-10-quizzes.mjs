import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertPlainStudentText, toPlainStudentText } from "./plain-student-text.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const downloadsDirectory = "C:\\Users\\pcgam\\Downloads";
const outputDirectory = path.join(repositoryRoot, "outputs", "science-form3-ch7-10-quizzes");
const outputPath = path.join(outputDirectory, "science-f3-ch7-10-normalized.json");
const cachePath = path.join(outputDirectory, "science-f3-ch7-10-compact-cache.json");

const sourceFiles = [
  "bab-7-sains-t3-quizzes-set-a.json",
  "bab-7-sains-t3-quizzes-set-b.json",
  "bab-8-sains-t3-quizzes-set-a.json",
  "bab-8-sains-t3-quizzes-set-b.json",
  "bab-9-sains-t3-quizzes-set-a.json",
  "bab-9-sains-t3-quizzes-set-b.json",
  "bab-10-sains-t3-quizzes-set-a.json",
  "bab-10-sains-t3-quizzes-set-b.json",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function clean(value) {
  return String(value ?? "")
    .replace(/\uFEFF/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\*\*/g, "")
    .replace(/\s*\[(?:\d+)(?:\s*,\s*\d+)*\]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function splitBilingual(value) {
  const source = clean(value);
  const slash = source.match(/^([\s\S]*?)\s*\/\s*\*([^*]+)\*\s*$/);
  if (slash) return { bm: clean(slash[1]), en: clean(slash[2]) };
  const newline = source.match(/^([\s\S]*?)\n\s*\*([\s\S]+?)\*\s*$/);
  if (newline) return { bm: clean(newline[1]), en: clean(newline[2]) };
  const parenthetical = source.match(/^([\s\S]*?)\s+\(([A-Z][\s\S]{12,})\)\s*$/);
  if (
    parenthetical &&
    /\b(the|and|of|to|is|are|in|with|while|from|for)\b/i.test(parenthetical[2])
  ) {
    return { bm: clean(parenthetical[1]), en: clean(parenthetical[2]) };
  }
  return { bm: source, en: "" };
}

function repairKnownBlanks(row) {
  if (row.chapter_number === 8 && row.set_letter === "A" && row.question_number === 4) {
    row.option_c_malay = "Polonium dan radium";
  }
  if (row.chapter_number === 8 && row.set_letter === "A" && row.question_number === 11) {
    row.option_c_malay = "$5\\text{ g}$";
  }
  return row;
}

function loadSources() {
  return sourceFiles.flatMap((file) => {
    const sourcePath = path.join(downloadsDirectory, file);
    assert(fs.existsSync(sourcePath), `Missing source attachment: ${sourcePath}`);
    const rows = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
    assert(Array.isArray(rows) && rows.length === 25, `${file}: expected exactly 25 questions`);
    return rows.map((row) =>
      repairKnownBlanks({
        ...row,
        chapter_number: Number(row.chapter_number),
        question_number: Number(row.question_number),
      }),
    );
  });
}

function translationFormat(count) {
  return {
    type: "object",
    properties: {
      translations: {
        type: "array",
        minItems: count,
        maxItems: count,
        items: { type: "string" },
      },
    },
    required: ["translations"],
  };
}

function solutionFormat(count) {
  return {
    type: "object",
    properties: {
      solutions: {
        type: "array",
        minItems: count,
        maxItems: count,
        items: {
          type: "object",
          properties: {
            question_number: { type: "integer" },
            correct_answer: { type: "string", enum: ["A", "B", "C", "D"] },
            explanation_malay: { type: "string" },
            explanation_english: { type: "string" },
          },
          required: [
            "question_number",
            "correct_answer",
            "explanation_malay",
            "explanation_english",
          ],
        },
      },
    },
    required: ["solutions"],
  };
}

async function ollama(model, prompt, format, numPredict) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          format,
          options: { temperature: 0, num_ctx: 16384, num_predict: numPredict },
        }),
      });
      if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
      return JSON.parse((await response.json()).response);
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`Ollama request failed: ${lastError}`);
}

const sourceRows = loadSources();
fs.mkdirSync(outputDirectory, { recursive: true });
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};

const prepared = sourceRows.map((row) => {
  const questionPair = splitBilingual(row.question_malay);
  const options = ["a", "b", "c", "d"].map((letter) =>
    splitBilingual(row[`option_${letter}_malay`]),
  );
  return {
    ...row,
    question_malay: questionPair.bm,
    question_english: clean(row.question_english) || questionPair.en,
    options_malay: options.map((option) => option.bm),
    options_english: options.map(
      (option, index) => clean(row[`option_${"abcd"[index]}_english`]) || option.en,
    ),
  };
});

const translationTargets = [];
for (const row of prepared) {
  if (!row.question_english) {
    translationTargets.push({ row, field: "question_english", source: row.question_malay });
  }
  row.options_english.forEach((value, index) => {
    if (!value) translationTargets.push({ row, field: index, source: row.options_malay[index] });
  });
}

for (let offset = 0; offset < translationTargets.length; offset += 30) {
  const targets = translationTargets.slice(offset, offset + 30);
  const key = `translations-${offset + 1}`;
  if (!cache[key]) {
    const prompt = [
      "Translate each string into natural Malaysian KSSM/DLP English.",
      "Preserve scientific meaning, formulas, LaTeX, symbols, values, units, and proper nouns. Return translations only in the same order.",
      JSON.stringify(targets.map((target) => target.source)),
    ].join("\n");
    cache[key] = (
      await ollama("qwen2.5:1.5b", prompt, translationFormat(targets.length), 4096)
    ).translations;
    assert(cache[key].length === targets.length, `${key}: translation count mismatch`);
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf8");
  }
  targets.forEach((target, index) => {
    const translated = clean(cache[key][index]);
    assert(translated, `${key}: blank translation ${index + 1}`);
    if (target.field === "question_english") target.row.question_english = translated;
    else target.row.options_english[target.field] = translated;
  });
  console.log(
    `Translated ${Math.min(offset + 30, translationTargets.length)}/${translationTargets.length} missing DLP fields`,
  );
}

const completedRows = [];
for (let chapter = 7; chapter <= 10; chapter += 1) {
  for (const set of ["A", "B"]) {
    const group = prepared
      .filter((row) => row.chapter_number === chapter && row.set_letter === set)
      .sort((left, right) => left.question_number - right.question_number);
    assert(group.length === 25, `Chapter ${chapter} Set ${set}: expected 25 questions`);

    for (let offset = 0; offset < group.length; offset += 5) {
      const chunk = group.slice(offset, offset + 5);
      const key = `solutions-c${chapter}-${set}-${offset + 1}`;
      if (!cache[key]) {
        const payload = chunk.map((row) => ({
          question_number: row.question_number,
          question: row.question_malay,
          A: row.options_malay[0],
          B: row.options_malay[1],
          C: row.options_malay[2],
          D: row.options_malay[3],
        }));
        const prompt = [
          "You are the final answer-key expert for Malaysian KSSM Form 3 Science.",
          `Solve these Chapter ${chapter} Set ${set} multiple-choice questions independently.`,
          "Recalculate numerical items. Select exactly one unambiguous answer A-D. If wording is imperfect, use the scientifically intended KSSM interpretation.",
          "For each item give a concise, useful explanation in natural Bahasa Melayu and DLP English (maximum 35 words per language). Keep question_number unchanged and return the same order.",
          JSON.stringify(payload),
        ].join("\n");
        cache[key] = (
          await ollama("qwen2.5:7b", prompt, solutionFormat(chunk.length), 1800)
        ).solutions;
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf8");
      }

      cache[key].forEach((solution, index) => {
        const row = chunk[index];
        const label = `Chapter ${chapter} Set ${set} Q${row.question_number}`;
        assert(
          solution.question_number === row.question_number,
          `${label}: changed question number`,
        );
        assert(/^[ABCD]$/.test(solution.correct_answer), `${label}: invalid answer`);
        assert(clean(solution.explanation_malay), `${label}: blank BM explanation`);
        assert(clean(solution.explanation_english), `${label}: blank DLP explanation`);
        assert(row.question_malay && row.question_english, `${label}: blank question`);
        assert(
          row.options_malay.every(Boolean) && row.options_english.every(Boolean),
          `${label}: blank option`,
        );
        const completedRow = {
          chapter_number: chapter,
          set_letter: set,
          chapter_title: row.chapter_title,
          question_number: row.question_number,
          question_malay: toPlainStudentText(row.question_malay),
          question_english: toPlainStudentText(row.question_english),
          option_a_malay: toPlainStudentText(row.options_malay[0]),
          option_a_english: toPlainStudentText(row.options_english[0]),
          option_b_malay: toPlainStudentText(row.options_malay[1]),
          option_b_english: toPlainStudentText(row.options_english[1]),
          option_c_malay: toPlainStudentText(row.options_malay[2]),
          option_c_english: toPlainStudentText(row.options_english[2]),
          option_d_malay: toPlainStudentText(row.options_malay[3]),
          option_d_english: toPlainStudentText(row.options_english[3]),
          correct_answer: solution.correct_answer,
          explanation: toPlainStudentText(
            `${clean(solution.explanation_malay)} ${clean(solution.explanation_english)}`,
          ),
        };
        for (const [field, value] of Object.entries(completedRow)) {
          if (typeof value === "string") assertPlainStudentText(value, `${label} ${field}`);
        }
        completedRows.push(completedRow);
      });
      console.log(`Solved Chapter ${chapter} Set ${set} questions ${offset + 1}-${offset + 5}`);
    }
  }
}

assert(completedRows.length === 200, `Expected 200 rows, found ${completedRows.length}`);
assert(
  new Set(completedRows.map((row) => row.question_malay)).size === 200,
  "Duplicate BM questions detected",
);
assert(
  new Set(completedRows.map((row) => row.question_english)).size === 200,
  "Duplicate DLP questions detected",
);
fs.writeFileSync(outputPath, JSON.stringify(completedRows, null, 2), "utf8");
console.log(
  `Wrote ${completedRows.length} completed bilingual quiz rows to ${path.relative(repositoryRoot, outputPath)}.`,
);

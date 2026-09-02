import fs from "node:fs";
import path from "node:path";

const MASTER = "C:\\Users\\pcgam\\Downloads\\sains-t3-kssm-quizzes-master.csv";
const OUTPUT_DIR = path.resolve("outputs/science-form3-master-quizzes");
const NEW_ROWS = path.join(OUTPUT_DIR, "new-rows.json");
const OUTPUT = path.join(OUTPUT_DIR, "sains-t3-kssm-quizzes-master-updated.csv");
const REPORT = path.join(OUTPUT_DIR, "validation-report.json");

const HEADERS = [
  "chapter_number", "set_letter", "chapter_title", "question_number",
  "question_malay", "question_english", "option_a_malay", "option_a_english",
  "option_b_malay", "option_b_english", "option_c_malay", "option_c_english",
  "option_d_malay", "option_d_english", "correct_answer", "explanation",
];

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ""; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  const headers = rows.shift().map((x) => x.replace(/^\uFEFF/, ""));
  return { headers, rows: rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""]))) };
}

function csvCell(value) {
  const s = String(value ?? "");
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function serializeRow(row) {
  return HEADERS.map((h) => csvCell(row[h])).join(",");
}

function normQuestion(value) {
  return String(value ?? "").toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function countBlank(rows, field) {
  return rows.filter((r) => !String(r[field] ?? "").trim()).length;
}

const originalText = fs.readFileSync(MASTER, "utf8");
const original = parseCsv(originalText);
const added = JSON.parse(fs.readFileSync(NEW_ROWS, "utf8"));

if (JSON.stringify(original.headers) !== JSON.stringify(HEADERS)) throw new Error("Master column names/order do not match the audited schema");
if (original.rows.length !== 75) throw new Error(`Expected 75 original rows, got ${original.rows.length}`);
if (added.length !== 250) throw new Error(`Expected 250 new rows, got ${added.length}`);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const preservedPrefix = originalText.replace(/[\r\n]+$/, "");
const outputText = `${preservedPrefix}\r\n${added.map(serializeRow).join("\r\n")}\r\n`;
fs.writeFileSync(OUTPUT, outputText, "utf8");

const final = parseCsv(fs.readFileSync(OUTPUT, "utf8"));
const finalNew = final.rows.slice(original.rows.length);
const counts = {};
for (let chapter = 1; chapter <= 5; chapter++) {
  counts[chapter] = {};
  for (const set of ["A", "B"]) counts[chapter][set] = finalNew.filter((r) => Number(r.chapter_number) === chapter && r.set_letter === set).length;
}

const required = [
  "question_malay", "question_english",
  "option_a_malay", "option_a_english", "option_b_malay", "option_b_english",
  "option_c_malay", "option_c_english", "option_d_malay", "option_d_english",
  "correct_answer", "explanation",
];
const missing = Object.fromEntries(required.map((h) => [h, countBlank(finalNew, h)]));
const invalidAnswers = finalNew.filter((r) => !/^[ABCD]$/.test(r.correct_answer)).length;
const incorrectChapter = finalNew.filter((r) => !/^[1-5]$/.test(String(r.chapter_number))).length;
const incorrectSet = finalNew.filter((r) => !/^[AB]$/.test(r.set_letter)).length;
const incorrectQuestionNumber = finalNew.filter((r) => !Number.isInteger(Number(r.question_number)) || Number(r.question_number) < 1 || Number(r.question_number) > 25).length;

const seenBm = new Map(), seenEn = new Map(), duplicateQuestions = [];
for (const row of final.rows) {
  for (const [lang, field, seen] of [["BM", "question_malay", seenBm], ["DLP", "question_english", seenEn]]) {
    const key = normQuestion(row[field]);
    if (!key) continue;
    const label = `Chapter ${row.chapter_number} Set ${row.set_letter} Q${row.question_number}`;
    if (seen.has(key)) duplicateQuestions.push({ language: lang, first: seen.get(key), duplicate: label });
    else seen.set(key, label);
  }
}

const originalRowsPreserved = outputText.startsWith(preservedPrefix + "\r\n") && JSON.stringify(final.rows.slice(0, 75)) === JSON.stringify(original.rows);
const exactCounts = Object.values(counts).every((sets) => sets.A === 25 && sets.B === 25);
const report = {
  original_rows: original.rows.length,
  new_rows_added: finalNew.length,
  final_rows: final.rows.length,
  column_order_unchanged: JSON.stringify(final.headers) === JSON.stringify(HEADERS),
  original_rows_preserved: originalRowsPreserved,
  chapter_set_counts: counts,
  new_rows_validation: {
    missing_questions: missing.question_malay + missing.question_english,
    missing_option_a: missing.option_a_malay + missing.option_a_english,
    missing_option_b: missing.option_b_malay + missing.option_b_english,
    missing_option_c: missing.option_c_malay + missing.option_c_english,
    missing_option_d: missing.option_d_malay + missing.option_d_english,
    missing_correct_answer: missing.correct_answer,
    invalid_correct_answer: invalidAnswers,
    missing_explanations: missing.explanation,
    duplicate_ids: "N/A — master schema has no ID column",
    duplicate_questions: duplicateQuestions.length,
    duplicate_question_details: duplicateQuestions,
    incorrect_chapter_assignment: incorrectChapter,
    incorrect_set_assignment: incorrectSet,
    incorrect_question_number: incorrectQuestionNumber,
    missing_bm_fields: missing.question_malay + missing.option_a_malay + missing.option_b_malay + missing.option_c_malay + missing.option_d_malay,
    missing_english_dlp_fields: missing.question_english + missing.option_a_english + missing.option_b_english + missing.option_c_english + missing.option_d_english,
  },
  preserved_legacy_blanks: {
    missing_english_options: ["option_a_english", "option_b_english", "option_c_english", "option_d_english"].reduce((sum, h) => sum + countBlank(original.rows, h), 0),
    missing_correct_answer: countBlank(original.rows, "correct_answer"),
    missing_explanation: countBlank(original.rows, "explanation"),
  },
};

const numericFailures = Object.entries(report.new_rows_validation).filter(([key, value]) => typeof value === "number" && value !== 0);
report.validation = report.original_rows === 75 && report.new_rows_added === 250 && report.final_rows === 325 && report.column_order_unchanged && report.original_rows_preserved && exactCounts && numericFailures.length === 0 ? "PASS" : "FAIL";
fs.writeFileSync(REPORT, JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report, null, 2));
if (report.validation !== "PASS") process.exitCode = 1;

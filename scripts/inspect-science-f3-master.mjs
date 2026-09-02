import fs from "node:fs";

const csv = fs.readFileSync("outputs/science-form3-master-quizzes/sains-t3-kssm-quizzes-master-updated.csv", "utf8");
const rows = JSON.parse(fs.readFileSync("outputs/science-form3-master-quizzes/new-rows.json", "utf8"));
const fields = [
  "question_malay", "question_english", "option_a_malay", "option_a_english",
  "option_b_malay", "option_b_english", "option_c_malay", "option_c_english",
  "option_d_malay", "option_d_english",
];
const unmatchedDollar = [];
for (const row of rows) for (const field of fields) {
  const count = (row[field].match(/\$/g) ?? []).length;
  if (count % 2 !== 0) unmatchedDollar.push(`C${row.chapter_number}${row.set_letter}Q${row.question_number} ${field}`);
}
const mojibake = ["â†", "Â°C", "Î”", "Ð", "Ñ"].reduce((sum, pattern) => sum + csv.split(pattern).length - 1, 0);
const markdownAsterisks = rows.filter((row) => fields.some((field) => /\*/.test(row[field]))).length;
console.log(JSON.stringify({
  final_bytes: Buffer.byteLength(csv),
  unmatched_dollar_fields: unmatchedDollar,
  mojibake_sequences: mojibake,
  markdown_asterisk_rows: markdownAsterisks,
  first_new_row: rows[0],
  last_new_row: rows.at(-1),
}, null, 2));
if (unmatchedDollar.length || mojibake || markdownAsterisks) process.exitCode = 1;

import fs from "node:fs";
import path from "node:path";

const rows = JSON.parse(fs.readFileSync(path.resolve("outputs/science-form3-master-quizzes/new-rows.json"), "utf8"));
const report = [];

async function audit(group) {
  const compact = group.map((q) => ({
    q: q.question_number,
    question: q.question_english,
    A: q.option_a_english,
    B: q.option_b_english,
    C: q.option_c_english,
    D: q.option_d_english,
    supplied_answer: q.correct_answer,
  }));
  const prompt = [
    "You are validating a Malaysian KSSM Form 3 Science chapter quiz answer key.",
    "Check each item scientifically. Report ONLY items where the supplied answer is clearly wrong or where more than one option is reasonably correct.",
    "Do not report style, grammar, or translation issues. If all supplied answers are scientifically valid and uniquely correct, return an empty issues array.",
    "For each issue return q, supplied_answer, suggested_answer (A-D or AMBIGUOUS), and a concise reason.",
    JSON.stringify(compact),
  ].join("\n");
  const response = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5:1.5b", prompt, stream: false,
      format: {
        type: "object",
        properties: {
          issues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                q: { type: "integer" }, supplied_answer: { type: "string" },
                suggested_answer: { type: "string" }, reason: { type: "string" },
              },
              required: ["q", "supplied_answer", "suggested_answer", "reason"],
            },
          },
        },
        required: ["issues"],
      },
      options: { temperature: 0, num_predict: 2048 },
    }),
  });
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
  return JSON.parse((await response.json()).response).issues;
}

for (let chapter = 1; chapter <= 5; chapter++) {
  for (const set of ["A", "B"]) {
    const group = rows.filter((r) => r.chapter_number === chapter && r.set_letter === set);
    const issues = await audit(group);
    report.push({ chapter, set, issues });
    console.log(`Audited Chapter ${chapter} Set ${set}: ${issues.length} flagged`);
  }
}

fs.writeFileSync(path.resolve("outputs/science-form3-master-quizzes/science-answer-audit.json"), JSON.stringify(report, null, 2));

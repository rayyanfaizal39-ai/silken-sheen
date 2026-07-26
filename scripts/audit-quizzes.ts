import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { auditQuizRegistry } from "../src/lib/quiz-audit";

const result = auditQuizRegistry();
const verbose = process.argv.includes("--verbose");

console.log("AcadeMY quiz identity audit");

const sejarahF1 = result.entries.filter(
  (item) => item.identity.subject === "sejarah" && item.identity.form === 1,
);
console.log("\nSejarah Form 1 route verification:");
for (const item of sejarahF1) {
  console.log(
    [
      `subject=${item.identity.subject}`,
      `form=${item.identity.form}`,
      `chapter=${item.identity.chapter}`,
      `language=${item.identity.language}`,
      `set=${item.identity.set}`,
      `canonicalKey=${item.canonicalKey}`,
      `source=${item.source}`,
      `questions=${item.questions.length}`,
      `firstIds=${item.questions
        .slice(0, 3)
        .map((question) => question.id)
        .join(",")}`,
    ].join(" | "),
  );
}

if (verbose) {
  console.log("\nAll registered quiz routes:");
  for (const item of result.entries) {
    console.log(
      `${item.canonicalKey} | source=${item.source} | count=${item.questions.length} | route=${item.route}`,
    );
  }
}

const routeSource = readFileSync(resolve("src/routes/quizzes.tsx"), "utf8");
let mathMappingsAudited = 0;
const mathBankMatch = routeSource.match(
  /const MATH_QUIZ_BANKS:[\s\S]*?=\s*\{([\s\S]*?)\n\};\n\ninterface ShuffledQuestion/,
);
if (!mathBankMatch) {
  result.criticalIssues.push({
    severity: "critical",
    code: "unreachable-route",
    canonicalKey: "math:form-1",
    source: "src/routes/quizzes.tsx",
    detail: "Could not locate the route-level Mathematics Form 1 quiz bank.",
  });
} else {
  const bank = mathBankMatch[1];
  for (let chapter = 1; chapter <= 13; chapter += 1) {
    const chapterBlock = bank.match(
      new RegExp(`"Chapter ${chapter}":\\s*\\{([\\s\\S]*?)(?=\\n  "Chapter ${chapter + 1}"|$)`),
    )?.[1];
    if (!chapterBlock) {
      result.criticalIssues.push({
        severity: "critical",
        code: "unreachable-route",
        canonicalKey: `math:form-1:chapter-${chapter}`,
        source: "src/routes/quizzes.tsx",
        detail: "Missing Mathematics Form 1 chapter mapping.",
      });
      continue;
    }
    for (let objective = 1; objective <= 3; objective += 1) {
      for (const language of ["bm", "dlp"] as const) {
        const expectedPrefix = chapter === 1 ? "MATH_OBJECTIVE" : `MATH_C${chapter}_OBJECTIVE`;
        const expected = `${expectedPrefix}_${objective}_`;
        const mapping = chapterBlock.match(
          new RegExp(`"objective-${objective}":[\\s\\S]*?${language}:\\s*([A-Z0-9_]+)`),
        )?.[1];
        if (!mapping?.startsWith(expected) || (language === "dlp") !== mapping.endsWith("_DLP")) {
          result.criticalIssues.push({
            severity: "critical",
            code: "metadata-mismatch",
            canonicalKey: `math:form-1:chapter-${chapter}:${language}:set-objective-${objective}`,
            source: "src/routes/quizzes.tsx",
            detail: `Expected ${expected}...${language === "dlp" ? "_DLP" : ""}, resolved ${mapping ?? "nothing"}.`,
          });
        } else {
          mathMappingsAudited += 1;
          const declaration = routeSource.match(
            new RegExp(`const ${mapping}(?:[^=]*)=([\\s\\S]*?)(?=\\nconst |\\ninterface )`),
          )?.[1];
          const declaredTiers = new Set(
            Array.from(declaration?.matchAll(/["'](Easy|Medium|Hard)["']/g) ?? []).map((match) =>
              match[1].toLowerCase(),
            ),
          );
          for (const tier of ["easy", "medium", "hard"] as const) {
            if (declaredTiers.has(tier)) continue;
            result.issues.push({
              severity: "warning",
              code: "missing-difficulty-tier",
              canonicalKey: `math:form-1:chapter-${chapter}:${language}:set-objective-${objective}`,
              source: `src/routes/quizzes.tsx#${mapping}`,
              detail: `Quiz has no ${tier} questions; no content was invented or reclassified.`,
            });
          }
          if (verbose) {
            console.log(
              `math:form-1:chapter-${chapter}:${language}:set-objective-${objective} | source=src/routes/quizzes.tsx#${mapping}`,
            );
          }
        }
      }
    }
  }
}

console.log(`Mathematics Form 1 route-bank mappings audited: ${mathMappingsAudited}/78`);
console.log(`Registered quiz sources: ${result.entries.length}`);
console.log(`Critical issues: ${result.criticalIssues.length}`);
console.log(`Warnings: ${result.issues.length - result.criticalIssues.length}`);

if (result.issues.length > 0 || result.criticalIssues.length > 0) {
  const allIssues = [
    ...result.issues,
    ...result.criticalIssues.filter((issue) => !result.issues.includes(issue)),
  ];
  const displayedIssues = verbose
    ? allIssues
    : allIssues.filter((issue) => issue.severity === "critical");
  if (displayedIssues.length > 0) console.log("\nIssues:");
  for (const issue of displayedIssues) {
    console.log(
      `[${issue.severity.toUpperCase()}] ${issue.code} | ${issue.canonicalKey} | source=${issue.source} | ${issue.detail}`,
    );
  }
  const hiddenWarnings = allIssues.length - displayedIssues.length;
  if (hiddenWarnings > 0) {
    console.log(`\n${hiddenWarnings} non-critical difficulty coverage warnings hidden.`);
    console.log("Run `npm run audit:quizzes -- --verbose` to inspect every affected quiz.");
  }
}

if (result.criticalIssues.length > 0) {
  process.exitCode = 1;
} else {
  console.log("\nQuiz audit passed: no critical identity or routing errors.");
}

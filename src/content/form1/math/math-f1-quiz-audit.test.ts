// Mathematics Form 1 objective quizzes — whole-subject audit guarantees.
//
// The live banks are resolved exactly as the quiz page and the server quiz
// catalog resolve them (resolveMathObjectiveQuestions), so these tests guard
// what students actually receive: 13 chapters × 3 objectives × BM/DLP.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C1_QUIZ_VISUALS } from "@/content/form1/math/chapter-1/quiz-visuals";
import type { Difficulty } from "@/data/content";
import {
  axisScale,
  dotPlotCounts,
  type LocalizedText,
  type MathQuestionVisual,
} from "@/features/quiz/visuals/mathQuestionVisual";
import { createQuizXpDb, registered } from "@/features/quiz/xp/quizXpDbHarness";
import {
  buildQuizCatalog,
  maxXpFor,
  type QuizCatalogRow,
} from "@/features/quiz/catalog/buildQuizCatalog";
import {
  createAttemptSnapshot,
  orderQuestionsByDifficulty,
  restoreAttemptOrder,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";
import { mathF2C3FoundationQuizzesBM } from "@/content/form2/math/chapter-3/quizzes-bm";
import { mathF2C4PracticeQuizzesBM } from "@/content/form2/math/chapter-4/quizzes-bm";
import { mathF2C5ChallengeQuizzesBM } from "@/content/form2/math/chapter-5/quizzes-bm";
import { mathF2C5ChallengeQuizzesDLP } from "@/content/form2/math/chapter-5/quizzes-dlp";

const CHAPTERS = Array.from({ length: 13 }, (_, index) => index + 1);
const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

function bank(chapter: number, objective: Objective, lang: Lang, form = "Form 1") {
  return resolveMathObjectiveQuestions({
    form,
    chapter: `Chapter ${chapter}`,
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}

const allBanks = CHAPTERS.flatMap((chapter) =>
  OBJECTIVES.flatMap((objective) =>
    LANGS.map((lang) => ({ chapter, objective, lang, questions: bank(chapter, objective, lang) })),
  ),
);
const allQuestions = allBanks.flatMap(({ questions }) => questions);
const keyed = (question: { options: string[]; answerIndex: number }) =>
  question.options[question.answerIndex];
const find = (chapter: number, objective: Objective, lang: Lang, text: string) => {
  const match = bank(chapter, objective, lang).find((question) => question.question.includes(text));
  if (!match) throw new Error(`No C${chapter} ${objective} ${lang} question contains "${text}"`);
  return match;
};

// Intended Easy/Medium/Hard composition per chapter and objective. Objective 1
// is Foundation (all Easy), Objective 2 is Practice (Medium) and Objective 3
// is Challenge ("Medium to Hard"). These match the server quiz_catalog rows.
const COMPOSITION: Record<number, Record<Objective, [number, number, number]>> = Object.fromEntries(
  CHAPTERS.map((chapter) => [
    chapter,
    {
      "objective-1": [30, 0, 0],
      "objective-2": chapter === 1 ? [0, 27, 3] : [0, 30, 0],
      "objective-3":
        chapter === 1
          ? [0, 16, 14]
          : chapter === 3 || chapter === 4 || chapter === 5
            ? [0, 15, 15]
            : chapter === 6
              ? [0, 21, 9]
              : chapter === 7
                ? [0, 7, 23]
                : [0, 0, 30],
    },
  ]),
);

// ---------------------------------------------------------------------------
// Small, deliberately limited calculator used to re-solve deterministic items
// independently of the stored answer keys. It understands numbers, fractions,
// + − × ÷ /, brackets, powers (², ³, ⁴…), √ and ∛, single-letter variables and
// implicit multiplication (3x, 2(x + 1), 4m²n). Anything else is skipped.
// ---------------------------------------------------------------------------
const SUPERSCRIPT: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
};

type Env = Record<string, number>;

function evaluate(source: string, env: Env = {}): number | null {
  const text = source
    .replace(/[−–]/g, "-")
    .replace(/\[/g, "(")
    .replace(/\]/g, ")")
    .replace(/\s+/g, "");
  let index = 0;
  const peek = () => text[index];
  const fail = () => {
    throw new Error("parse");
  };

  const power = (base: number) => {
    let exponent = "";
    while (peek() && SUPERSCRIPT[peek()]) exponent += SUPERSCRIPT[text[index++]];
    return exponent ? base ** Number(exponent) : base;
  };

  const primary = (): number => {
    const char = peek();
    if (char === "(") {
      index += 1;
      const value = sum();
      if (peek() !== ")") fail();
      index += 1;
      return power(value);
    }
    if (char === "√" || char === "∛") {
      index += 1;
      const value = primary();
      return char === "√" ? Math.sqrt(value) : Math.cbrt(value);
    }
    if (char && /[0-9.]/.test(char)) {
      let digits = "";
      while (peek() && /[0-9.]/.test(peek())) digits += text[index++];
      return power(Number(digits));
    }
    if (char && /[a-z]/.test(char)) {
      index += 1;
      if (!(char in env)) fail();
      return power(env[char]);
    }
    return fail();
  };

  // Implicit multiplication binds tighter than × and ÷ (20m⁴n³ ÷ 5m²n).
  const term = (): number => {
    let value = primary();
    while (peek() && /[0-9a-z(√∛]/.test(peek())) value *= primary();
    return value;
  };

  const unary = (): number => {
    if (peek() === "-") {
      index += 1;
      return -unary();
    }
    if (peek() === "+") {
      index += 1;
      return unary();
    }
    return term();
  };

  const product = (): number => {
    let value = unary();
    while (peek() === "×" || peek() === "÷" || peek() === "/") {
      const op = text[index++];
      const right = unary();
      value = op === "×" ? value * right : value / right;
    }
    return value;
  };

  const sum = (): number => {
    let value = product();
    while (peek() === "+" || peek() === "-") {
      const op = text[index++];
      const right = product();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  };

  try {
    const value = sum();
    return index === text.length && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

const close = (a: number, b: number) =>
  Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

/** Value and unit of an option such as "-12", "7/9", "2.5 cm", "RM21.00", "25 m²". */
function optionMeasure(option: string): { value: number; unit: string } | null {
  const match = option
    .replace(/[−–]/g, "-")
    .replace(/RM/g, "")
    .replace(/(\d) (\d{3})\b/g, "$1$2")
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?([°%]|\s+[a-zA-Z]+[²³]?)?$/);
  if (!match) return null;
  return {
    value: match[2] ? Number(match[1]) / Number(match[2]) : Number(match[1]),
    unit: (match[3] ?? "").trim(),
  };
}

const optionValue = (option: string) => optionMeasure(option)?.value ?? null;

const VARIABLES = "abcdmnpqrstvwxyz";
const SAMPLE_VALUES = [1.7, 2.3, -1.4, 3.1, 0.6];

function sameExpression(left: string, right: string) {
  const letters = [...new Set(`${left}${right}`.match(/[a-z]/g) ?? [])];
  if (letters.some((letter) => !VARIABLES.includes(letter))) return null;
  for (const offset of [0, 1]) {
    const env = Object.fromEntries(
      letters.map((letter, i) => [letter, SAMPLE_VALUES[(i + offset) % 5]]),
    );
    const a = evaluate(left, env);
    const b = evaluate(right, env);
    if (a === null || b === null) return null;
    if (!close(a, b)) return false;
  }
  return true;
}

type Comparison = "=" | "<" | ">" | "≤" | "≥";
const holds = (a: number, op: Comparison, b: number) =>
  op === "="
    ? close(a, b)
    : op === "<"
      ? a < b - 1e-9
      : op === ">"
        ? a > b + 1e-9
        : op === "≤"
          ? a <= b + 1e-9
          : a >= b - 1e-9;

function splitRelation(statement: string): [string, Comparison, string] | null {
  const match = statement.match(/^(.+?)\s*(≤|≥|<|>|=)\s*(.+)$/);
  if (!match || /[≤≥<>=]/.test(match[3])) return null;
  return [match[1], match[2] as Comparison, match[3]];
}

// ---------------------------------------------------------------------------

describe("Mathematics Form 1 objective quizzes — structure", () => {
  it("resolves all 13 chapters × 3 objectives × BM and DLP as non-empty 30-question banks", () => {
    expect(allBanks).toHaveLength(78);
    for (const { chapter, objective, lang, questions } of allBanks) {
      expect(questions.length, `C${chapter} ${objective} ${lang}`).toBe(30);
    }
    expect(allQuestions).toHaveLength(2340);
  });

  it("keeps the intended Easy/Medium/Hard composition of every objective in both languages", () => {
    for (const { chapter, objective, lang, questions } of allBanks) {
      const counts = (["Easy", "Medium", "Hard"] as const).map(
        (difficulty) => questions.filter((question) => question.difficulty === difficulty).length,
      );
      expect(counts, `C${chapter} ${objective} ${lang}`).toEqual(COMPOSITION[chapter][objective]);
    }
  });

  it("labels every question as Form 1 Mathematics with the right chapter, language and objective", () => {
    for (const { chapter, objective, lang, questions } of allBanks) {
      for (const question of questions) {
        expect(question).toMatchObject({
          subjectId: "math",
          form: "Form 1",
          chapter: `Chapter ${chapter}`,
          lang,
          set: objective,
        });
      }
    }
  });

  it("keeps the existing ID convention and IDs unique across the whole subject", () => {
    const ids = allQuestions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { chapter, objective, lang, questions } of allBanks) {
      questions.forEach((question, index) =>
        expect(question.id).toBe(`math-f1-c${chapter}-${objective}-${lang}-q${index + 1}`),
      );
    }
  });

  it("has exactly four distinct options, a valid answer and an explanation for every question", () => {
    for (const question of allQuestions) {
      expect(question.options, question.id).toHaveLength(4);
      expect(
        new Set(question.options.map((option) => option.trim().toLowerCase())).size,
        question.id,
      ).toBe(4);
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThanOrEqual(3);
      expect(question.explanation?.trim(), question.id).toBeTruthy();
      expect(["Easy", "Medium", "Hard"], question.id).toContain(question.difficulty);
    }
  });

  it("never offers two mathematically equivalent numeric options (0.5 and 1/2, 10 and √100 = 10)", () => {
    for (const question of allQuestions) {
      const measures = question.options.map(optionMeasure).filter((measure) => measure !== null);
      for (let i = 0; i < measures.length; i += 1) {
        for (let j = i + 1; j < measures.length; j += 1) {
          const same =
            measures[i]!.unit === measures[j]!.unit &&
            close(measures[i]!.value, measures[j]!.value);
          expect(same, `${question.id}: ${question.options.join(" | ")}`).toBe(false);
        }
      }
      // "10 cm" next to "√100 = 10 cm" is the same answer twice.
      expect(question.options.join(" | "), question.id).not.toMatch(/√[\d,]+ = \d/);
    }
  });

  it("does not give the answer away by making it much longer than every distractor", () => {
    for (const question of allQuestions) {
      const isText = question.options.some((option) => option.replace(/[^A-Za-z]/g, "").length > 6);
      if (!isText) continue;
      const key = keyed(question).length;
      const longestDistractor = Math.max(
        ...question.options
          .filter((_, index) => index !== question.answerIndex)
          .map((option) => option.length),
      );
      const giveaway = key >= longestDistractor * 1.6 && key - longestDistractor >= 15;
      expect(giveaway, `${question.id}: ${keyed(question)}`).toBe(false);
    }
  });

  it("spreads the stored answer slots evenly across A-D in every bank", () => {
    for (const { chapter, objective, lang, questions } of allBanks) {
      const slots = [0, 1, 2, 3].map(
        (slot) => questions.filter((question) => question.answerIndex === slot).length,
      );
      for (const count of slots) {
        expect(
          count,
          `C${chapter} ${objective} ${lang}: ${slots.join("/")}`,
        ).toBeGreaterThanOrEqual(6);
        expect(count, `C${chapter} ${objective} ${lang}: ${slots.join("/")}`).toBeLessThanOrEqual(
          9,
        );
      }
    }
  });

  it("does not rely on option positions, other questions or unseen figures", () => {
    const forbidden =
      /semua di atas|all of the above|kedua-dua [a-d] dan|both [a-d] and|kedua-dua jawapan|both answers|soalan sebelumnya|previous (question|solution)|jadual di atas|table above|rajah di atas|diagram above|standard intersection diagram|rajah persilangan|refer to the|berdasarkan rajah|based on the (figure|diagram|graph)/i;
    for (const question of allQuestions) {
      expect(`${question.question} ${question.options.join(" ")}`, question.id).not.toMatch(
        forbidden,
      );
    }
  });

  it("uses × for multiplication without turning the variable x into ×, and no factorial-looking '25!'", () => {
    for (const question of allQuestions) {
      for (const text of [question.question, ...question.options, question.explanation ?? ""]) {
        expect(text, question.id).not.toMatch(/\d x \d|\) x \(|→ ×|× =|: ×|!=|\d!/);
      }
    }
  });

  it("stays within the Form 1 syllabus (no trigonometry, coordinates, quadratics, set operations or Form 2 polygon formulae)", () => {
    const aboveSyllabus =
      /\btan\b|\bsin\b|\bcos\b|A\(0,\s*0\)|x² [−-] \d+x [+−-] \d+ = 0|C\(\d,\s*\d\)|\d!|∪|∩|\(n − 2\) × 180|subset wajar|proper subset|n⁻¹|similar triangles|segi tiga serupa|kalkulator|calculator|MODE/;
    for (const question of allQuestions) {
      expect(
        `${question.question} ${question.options.join(" ")} ${question.explanation}`,
        question.id,
      ).not.toMatch(aboveSyllabus);
    }
  });
});

describe("Mathematics Form 1 objective quizzes — BM/DLP parity", () => {
  it("pairs every BM question with its DLP question: same difficulty, answer slot and numbers in the answer", () => {
    for (const chapter of CHAPTERS) {
      for (const objective of OBJECTIVES) {
        const bm = bank(chapter, objective, "bm");
        const dlp = bank(chapter, objective, "dlp");
        expect(bm.length).toBe(dlp.length);
        bm.forEach((bmQuestion, index) => {
          const dlpQuestion = dlp[index];
          const at = `C${chapter} ${objective} q${index + 1}`;
          expect(dlpQuestion.difficulty, at).toBe(bmQuestion.difficulty);
          expect(dlpQuestion.answerIndex, at).toBe(bmQuestion.answerIndex);
          const numbers = (text: string) => (text.match(/\d+(\.\d+)?/g) ?? []).join(",");
          const bmAnswer = numbers(keyed(bmQuestion));
          const dlpAnswer = numbers(keyed(dlpQuestion));
          expect(
            bmAnswer.includes(dlpAnswer) || dlpAnswer.includes(bmAnswer),
            `${at}: ${keyed(bmQuestion)} / ${keyed(dlpQuestion)}`,
          ).toBe(true);
        });
      }
    }
  });

  it("uses Malaysian KSSM terms rather than Indonesian ones in BM", () => {
    for (const { lang, questions } of allBanks) {
      if (lang !== "bm") continue;
      for (const question of questions) {
        expect(
          `${question.question} ${question.options.join(" ")} ${question.explanation}`,
          question.id,
        ).not.toMatch(/jajaran genjang/i);
      }
    }
  });
});

describe("Mathematics Form 1 objective quizzes — independent answer verification", () => {
  it("re-computes every pure arithmetic item (Hitung/Calculate/What is …) and matches the key", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(
        /^(?:Hitung|Calculate|Berapakah|What is)\s*:?\s*([^a-zA-Z?]+?)\s*\??$/,
      );
      if (!match || /[<>=]/.test(match[1])) continue;
      const expected = evaluate(match[1]);
      const answer = optionValue(keyed(question));
      if (expected === null || answer === null) continue;
      expect(
        close(expected, answer),
        `${question.id}: ${question.question} → ${keyed(question)} (computed ${expected})`,
      ).toBe(true);
      for (const [index, option] of question.options.entries()) {
        const value = optionValue(option);
        if (index !== question.answerIndex && value !== null) {
          expect(
            close(value, expected),
            `${question.id}: distractor ${option} is also correct`,
          ).toBe(false);
        }
      }
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(120);
  });

  it("re-computes every substitution item (Given x = …, find the value of …)", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const givenFirst = question.question.match(
        /^(?:Diberi|Given) (.+?), (?:cari nilai|find the value of) (.+?)\.$/,
      );
      const givenLast = question.question.match(
        /^(?:Cari nilai bagi|Find the value of) (.+?) (?:apabila|when) (.+?)\.$/,
      );
      const [assignments, expression] = givenFirst
        ? [givenFirst[1], givenFirst[2]]
        : givenLast
          ? [givenLast[2], givenLast[1]]
          : [null, null];
      if (!assignments || !expression) continue;
      const env: Env = {};
      for (const part of assignments.split(/,| dan | and /)) {
        const assignment = part.trim().match(/^([a-z]) = (−?-?\d+(?:\.\d+)?)$/);
        if (assignment) env[assignment[1]] = Number(assignment[2].replace("−", "-"));
      }
      const expected = evaluate(expression, env);
      const answer = optionValue(keyed(question).replace(/^[a-z] = /, ""));
      if (expected === null || answer === null || Object.keys(env).length === 0) continue;
      expect(
        close(expected, answer),
        `${question.id}: ${question.question} → ${keyed(question)}`,
      ).toBe(true);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(20);
  });

  it("checks every Simplify item by substitution: exactly the keyed option equals the expression", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(/^(?:Permudahkan|Simplify) (.+?)\.$/);
      if (!match || /=/.test(match[1])) continue;
      const results = question.options.map((option) => sameExpression(match[1], option));
      if (results.some((result) => result === null)) continue;
      expect(
        results.map((result, index) => (result ? index : -1)).filter((index) => index >= 0),
        `${question.id}: ${question.question}`,
      ).toEqual([question.answerIndex]);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(50);
  });

  it("solves every one-variable equation by substitution: only the keyed value satisfies it", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(
        /^(?:Selesaikan|Solve)(?: persamaan| the equation)? (.+?)(?: menggunakan .*| using .*)?\.$/,
      );
      if (!match) continue;
      const relation = splitRelation(match[1]);
      const letters = [...new Set(match[1].match(/[a-z]/g) ?? [])];
      if (!relation || relation[1] !== "=" || letters.length !== 1) continue;
      const satisfied = question.options.map((option) => {
        const value = option.match(/^[a-z] = (−?-?\d+(?:\.\d+)?)$/);
        if (!value) return null;
        const env = { [letters[0]]: Number(value[1].replace("−", "-")) };
        const left = evaluate(relation[0], env);
        const right = evaluate(relation[2], env);
        return left === null || right === null ? null : close(left, right);
      });
      if (satisfied.some((result) => result === null)) continue;
      expect(
        satisfied.map((ok, index) => (ok ? index : -1)).filter((index) => index >= 0),
        `${question.id}: ${question.question}`,
      ).toEqual([question.answerIndex]);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(15);
  });

  it("solves every linear inequality: the keyed solution set matches the inequality, distractors do not", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(/^(?:Selesaikan|Solve) (.+?)\.$/);
      if (!match) continue;
      const relation = splitRelation(match[1]);
      const letters = [...new Set(match[1].match(/[a-z]/g) ?? [])];
      if (!relation || relation[1] === "=" || letters.length !== 1) continue;
      const variable = letters[0];
      const parsedOptions = question.options.map((option) =>
        splitRelation(option.replace(/,.*$/, "")),
      );
      if (parsedOptions.some((option) => !option || option[0].trim() !== variable)) continue;
      const boundaries = parsedOptions.map((option) => evaluate(option![2]) ?? 0);
      const points = boundaries
        .flatMap((b) => [b - 1, b - 0.25, b, b + 0.25, b + 1])
        .concat([-50, 50]);
      const matchesStem = parsedOptions.map((option) =>
        points.every((t) => {
          const left = evaluate(relation[0], { [variable]: t });
          const right = evaluate(relation[2], { [variable]: t });
          return holds(left!, relation[1], right!) === holds(t, option![1], evaluate(option![2])!);
        }),
      );
      expect(
        matchesStem.map((ok, index) => (ok ? index : -1)).filter((index) => index >= 0),
        `${question.id}: ${question.question}`,
      ).toEqual([question.answerIndex]);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(15);
  });

  it("re-computes every HCF and LCM item", () => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(
        /(FSTB|GSTK|HCF|LCM) (?:bagi|of) ((?:\d+(?:, | dan | and ))+\d+)/,
      );
      if (!match) continue;
      const numbers = match[2].split(/, | dan | and /).map(Number);
      const hcf = numbers.reduce(gcd);
      const lcm = numbers.reduce((a, b) => (a * b) / gcd(a, b));
      const expected = match[1] === "FSTB" || match[1] === "HCF" ? hcf : lcm;
      const answer = optionValue(keyed(question));
      if (answer === null) continue;
      expect(answer, `${question.id}: ${question.question}`).toBe(expected);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(30);
  });

  it("classifies every triangle-type item by comparing c² with a² + b²", () => {
    let verified = 0;
    for (const question of allQuestions) {
      if (question.lang !== "dlp") continue;
      const sides = question.question.match(
        /sides of ([\d.√]+) cm, ([\d.√]+) cm and ([\d.√]+) cm\. What type/,
      );
      if (!sides) continue;
      const [a, b, c] = sides
        .slice(1)
        .map((side) => evaluate(side)!)
        .sort((x, y) => x - y);
      const type = close(c * c, a * a + b * b)
        ? "Right-angled"
        : c * c > a * a + b * b
          ? "Obtuse-angled"
          : "Acute-angled";
      expect(keyed(question), `${question.id}: ${question.question}`).toBe(type);
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(10);
  });

  it("re-computes every 'find the range' item from its data", () => {
    let verified = 0;
    for (const question of allQuestions) {
      const match = question.question.match(
        /(?:Data|data)[^:]*: ([\d., ]+)\. (?:Cari julat|Find the range)/,
      );
      if (!match) continue;
      const values = match[1].split(",").map(Number);
      const answer =
        optionValue(keyed(question)) ?? optionValue(keyed(question).match(/=\s*(\d+)/)?.[1] ?? "");
      expect(answer, `${question.id}: ${question.question}`).toBe(
        Math.max(...values) - Math.min(...values),
      );
      verified += 1;
    }
    expect(verified).toBeGreaterThanOrEqual(6);
  });
});

describe("Mathematics Form 1 objective quizzes — repaired content regressions", () => {
  it("Chapter 1: negative signs and the debt sign convention", () => {
    expect(keyed(find(1, "objective-2", "dlp", "Calculate: -18 - (-6)"))).toBe("-12");
    const debt = find(1, "objective-3", "dlp", "Rafi owes RM18.50");
    expect(debt.question).toContain("debt is represented by a negative value");
    expect(keyed(debt)).toBe("-12");
    expect(debt.options).not.toContain("-RM12");
    expect(find(1, "objective-2", "dlp", "not a rational number").explanation).toContain("b ≠ 0");
  });

  it("Chapter 2: HCF versus LCM chosen from context", () => {
    expect(keyed(find(2, "objective-3", "dlp", "ropes of lengths 42 cm and 56 cm"))).toBe("14 cm");
    expect(keyed(find(2, "objective-3", "dlp", "paper cups in packs of 18"))).toBe("36");
    expect(keyed(find(2, "objective-1", "dlp", "What does HCF stand for?"))).toBe(
      "Highest Common Factor",
    );
  });

  it("Chapter 3: Form 1 squares/roots/cubes content (not Form 2 algebraic formulae) with square vs root care", () => {
    expect(bank(3, "objective-1", "bm")[0].question).toBe("Apakah maksud kuasa dua?");
    expect(keyed(find(3, "objective-3", "dlp", "(−6)² = −36"))).toBe("36");
    expect(keyed(find(3, "objective-3", "dlp", "64 small cubes"))).toBe("4 cm");
    expect(find(3, "objective-3", "dlp", "64 small cubes").options).toContain("8 cm");
  });

  it("Chapter 4: rates carry compound units and inverse proportion is gone", () => {
    expect(keyed(find(4, "objective-1", "dlp", "60 km using 5 litres"))).toBe("12 km/litre");
    expect(keyed(find(4, "objective-2", "dlp", "Convert 54 km/h to m/min"))).toBe("900 m/min");
    const chapter4 = OBJECTIVES.flatMap((objective) => bank(4, objective, "dlp"))
      .map((q) => q.question)
      .join(" ");
    expect(chapter4).not.toMatch(/workers|marked|recapture|similar triangles|Profit %/);
  });

  it("Chapter 5: unlike terms are never combined", () => {
    const rule = find(5, "objective-3", "dlp", "Which of the following is TRUE?");
    expect(keyed(rule)).toBe("3x + 2x = 5x");
    for (const question of OBJECTIVES.flatMap((objective) => bank(5, objective, "dlp"))) {
      expect(keyed(question)).not.toBe("5x²");
      expect(keyed(question)).not.toMatch(/^3x \+ 2 = 5x$/);
    }
    expect(keyed(find(5, "objective-2", "dlp", "Given x = −2, find the value of 3x² − x"))).toBe(
      "14",
    );
  });

  it("Chapter 6: linear and simultaneous equations solved with consistent signs", () => {
    expect(keyed(find(6, "objective-2", "dlp", "Solve 3(x − 2) = 12."))).toBe("x = 6");
    expect(keyed(find(6, "objective-3", "dlp", "y = 2x and x + y = 9"))).toBe("x = 3, y = 6");
    expect(find(6, "objective-3", "dlp", "y = 2x + 1 and y = 2x − 3").explanation).not.toMatch(
      /gradient|intercept/,
    );
  });

  it("Chapter 7: dividing by a negative number reverses the inequality sign", () => {
    expect(keyed(find(7, "objective-2", "dlp", "Solve −2x > 8."))).toBe("x < −4");
    expect(keyed(find(7, "objective-2", "bm", "Selesaikan 4 − 3x ≤ 10."))).toBe("x ≥ −2");
    expect(keyed(find(7, "objective-3", "dlp", "Solve −2x + 3 > 1"))).toMatch(/^x < 1/);
  });

  it("Chapter 8: angle relationships give one consistent answer", () => {
    expect(keyed(find(8, "objective-2", "bm", "(x + 20)°, 50° dan (x − 10)°"))).toBe("x = 60");
    expect(keyed(find(8, "objective-2", "bm", "(6m − 30)°"))).toBe("m = 20");
    expect(keyed(find(8, "objective-3", "dlp", "(3y + 20)°"))).toBe("y = 24");
    expect(keyed(find(8, "objective-3", "dlp", "lighthouse to a boat is 35°"))).toBe("35°");
  });

  it("Chapter 9: triangle 180° and quadrilateral 360° angle sums, with the rhombus key fixed", () => {
    expect(keyed(find(9, "objective-2", "dlp", "sum of interior angles of a triangle"))).toBe(
      "180°",
    );
    expect(keyed(find(9, "objective-2", "dlp", "sum of interior angles of a quadrilateral"))).toBe(
      "360°",
    );
    expect(keyed(find(9, "objective-3", "dlp", "In rhombus ABCD, ∠ABC = 70°"))).toBe(
      "∠BAD = 110°, ∠BCD = 110°, ∠CDA = 70°",
    );
    expect(keyed(find(9, "objective-3", "bm", "AB selari dengan DC, ∠A = ∠D = 90°"))).toBe(
      "Trapezium",
    );
  });

  it("Chapter 10: perimeter answers use length units and area answers use square units", () => {
    for (const question of OBJECTIVES.flatMap((objective) => bank(10, objective, "dlp"))) {
      const asksPerimeter =
        /perimeter/i.test(question.question) && !/area/i.test(question.question);
      const asksArea =
        /\barea\b/i.test(question.question) &&
        /calculate|what is|find the area/i.test(question.question) &&
        !/perimeter|height|base|width|length|diagonal|side|tiles|x\./i.test(question.question);
      if (asksPerimeter && /\d (cm|m)\b/.test(keyed(question)))
        expect(keyed(question), question.id).not.toMatch(/²/);
      if (asksArea && /\d (cm|m)/.test(keyed(question)))
        expect(keyed(question), question.id).toMatch(/²/);
    }
    expect(keyed(find(10, "objective-3", "dlp", "surrounded by a path 2 m wide"))).toBe("88 m²");
    expect(keyed(find(10, "objective-3", "dlp", "perimeter of the L-shape"))).toBe("20 cm");
  });

  it("Chapter 11: ∈ versus ⊂, complements and distinct letters", () => {
    expect(keyed(find(11, "objective-2", "dlp", "Given A = {1, 3, 5}"))).toBe("{1, 5} ⊂ A");
    expect(keyed(find(11, "objective-2", "bm", "'MALAYSIA'"))).toBe("6");
    expect(keyed(find(11, "objective-2", "bm", "A = {nombor ganjil}. Cari n(A')"))).toBe("7");
  });

  it("Chapter 12: data counts, range and bar chart/histogram gaps", () => {
    expect(keyed(find(12, "objective-2", "dlp", "ages of the participants in a fun run"))).toBe(
      "9",
    );
    expect(
      keyed(find(12, "objective-1", "dlp", "difference between a bar chart and a histogram")),
    ).toBe("Bar charts have gaps between bars, histograms do not");
    expect(find(12, "objective-3", "dlp", "Class A marks").question).not.toMatch(/mean/i);
    expect(keyed(find(12, "objective-3", "dlp", "monthly spending of RM1 200"))).toBe("RM400");
  });

  it("Chapter 13: the hypotenuse is opposite the right angle and shorter sides use subtraction", () => {
    expect(keyed(find(13, "objective-3", "dlp", "PQ = 9 cm, QR = 40 cm and PR = 41 cm"))).toBe(
      "At Q",
    );
    expect(keyed(find(13, "objective-2", "dlp", "A 10 m ladder leans against a wall"))).toBe("6 m");
    expect(keyed(find(13, "objective-3", "dlp", "A 16 m tall tree breaks"))).toBe("8 m");
    expect(keyed(find(13, "objective-3", "bm", "5 cm, 7 cm dan 9 cm"))).toBe("Bersudut cakah");
  });
});

describe("Mathematics Form 1 objective quizzes — routing, catalog and runtime", () => {
  let catalog: QuizCatalogRow[];

  beforeAll(() => {
    catalog = buildQuizCatalog().quizzes.filter(
      (row) => row.kind === "math-objective" && row.form === 1,
    );
  }, 120_000);

  it("serves Form 1 content for Form 1 Chapters 3-5 and keeps Form 2 Chapters 3-5 on their own banks", () => {
    for (const chapter of [3, 4, 5]) {
      for (const objective of OBJECTIVES) {
        for (const lang of LANGS) {
          expect(
            bank(chapter, objective, lang).every((question) => question.id?.startsWith("math-f1-")),
          ).toBe(true);
        }
      }
    }
    expect(bank(3, "objective-1", "bm", "Form 2").map((question) => question.id)).toEqual(
      mathF2C3FoundationQuizzesBM.map((question) => question.id),
    );
    expect(bank(4, "objective-2", "bm", "Form 2").map((question) => question.id)).toEqual(
      mathF2C4PracticeQuizzesBM.map((question) => question.id),
    );
    expect(bank(5, "objective-3", "bm", "Form 2").map((question) => question.id)).toEqual(
      mathF2C5ChallengeQuizzesBM.map((question) => question.id),
    );
    expect(bank(5, "objective-3", "dlp", "Form 2").map((question) => question.id)).toEqual(
      mathF2C5ChallengeQuizzesDLP.map((question) => question.id),
    );
  });

  it("catalogs every Form 1 objective bank with the math-objective formula and matching counts", () => {
    expect(catalog).toHaveLength(78);
    for (const { chapter, objective, lang, questions } of allBanks) {
      const quizKey = buildCanonicalQuizKey({
        kind: "math-objective",
        form: "Form 1",
        chapterKey: `Chapter ${chapter}`,
        lang,
        objectiveId: objective,
      });
      const row = catalog.find((entry) => entry.quizKey === quizKey);
      const [easyCount, mediumCount, hardCount] = COMPOSITION[chapter][objective];
      expect(row, quizKey).toMatchObject({
        formula: "objective",
        subjectId: "math",
        totalQuestions: questions.length,
        easyCount,
        mediumCount,
        hardCount,
        timerBonusAllowed: false,
      });
      expect(row!.maxXp).toBe(maxXpFor("objective", row!));
    }
  });

  it("keeps attempt snapshots stable and restorable", () => {
    for (const { chapter, objective, lang, questions } of allBanks) {
      const again = bank(chapter, objective, lang);
      expect(again.map((question) => question.id)).toEqual(
        questions.map((question) => question.id),
      );
      const ordered = orderQuestionsByDifficulty(questions, () => 0.42).questions;
      const snapshot = createAttemptSnapshot("quiz-key", "attempt-1", ordered);
      expect(snapshot).not.toBeNull();
      expect(
        restoreAttemptOrder(snapshot!, "quiz-key", again)?.map((question) => question.id),
      ).toEqual(ordered.map((question) => question.id));
    }
  });

  it("keeps the correct answer when options are shuffled, and orders Easy before Medium before Hard", () => {
    let seed = 7;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (const question of allQuestions) {
      const shuffled = shuffleQuestionOptions(question, random);
      expect(keyed(shuffled)).toBe(keyed(question));
    }
    const rank = { Easy: 0, Medium: 1, Hard: 2 } as const;
    for (const { questions } of allBanks) {
      const ordered = orderQuestionsByDifficulty(questions, random).questions.map(
        (question) => rank[question.difficulty],
      );
      expect([...ordered].sort((a, b) => a - b)).toEqual(ordered);
    }
  });
});


describe("Mathematics Form 1 Chapter 1 visual questions", () => {
  const VISUAL_SLOTS = [
    ["objective-1", 5, "rightOfZero"],
    ["objective-1", 6, "compareNegativeIntegers"],
    ["objective-1", 20, "compareNegativeFractions"],
    ["objective-2", 5, "moveLeftEight"],
    ["objective-2", 6, "moveRightSix"],
    ["objective-3", 10, "distanceMinus7To4"],
  ] as const satisfies ReadonlyArray<
    readonly [Objective, number, keyof typeof MATH_F1_C1_QUIZ_VISUALS]
  >;

  const at = (objective: Objective, lang: Lang, number: number) =>
    bank(1, objective, lang)[number - 1];
  const chapter1 = OBJECTIVES.flatMap((objective) =>
    LANGS.flatMap((lang) => bank(1, objective, lang)),
  );

  it("uses number-line visuals only where Chapter 1 benefits from the representation", () => {
    const expected = VISUAL_SLOTS.flatMap(([objective, number]) =>
      LANGS.map((lang) => `math-f1-c1-${objective}-${lang}-q${number}`),
    );
    const actual = chapter1.filter((question) => question.visual).map((question) => question.id);
    expect(actual.sort()).toEqual(expected.sort());
    expect(actual).toHaveLength(12);

    for (const [objective, number, key] of VISUAL_SLOTS) {
      const bm = at(objective, "bm", number);
      const dlp = at(objective, "dlp", number);
      expect(bm.visual, bm.id).toBe(MATH_F1_C1_QUIZ_VISUALS[key]);
      expect(dlp.visual, dlp.id).toBe(MATH_F1_C1_QUIZ_VISUALS[key]);
      expect(bm.visual?.kind, bm.id).toBe("number-line");
      expect(dlp.visual, dlp.id).toBe(bm.visual);
    }
  });

  it("never mentions a number line without actually showing one", () => {
    for (const question of chapter1) {
      if (!/(garis nombor|number line)/i.test(question.question)) continue;
      expect(question.visual?.kind, question.id).toBe("number-line");
    }
  });

  it("stores valid number-line geometry without encoding a hidden answer", () => {
    for (const visual of Object.values(MATH_F1_C1_QUIZ_VISUALS) as Extract<
      MathQuestionVisual,
      { kind: "number-line" }
    >[]) {
      expect(visual.min).toBeLessThan(visual.max);
      const tickValues = visual.ticks.map((tick) => tick.value);
      expect(new Set(tickValues).size).toBe(tickValues.length);
      expect([...tickValues].sort((a, b) => a - b)).toEqual(tickValues);
      for (const value of tickValues) {
        expect(value).toBeGreaterThanOrEqual(visual.min);
        expect(value).toBeLessThanOrEqual(visual.max);
      }
      for (const point of visual.points ?? []) {
        expect(point.value).toBeGreaterThanOrEqual(visual.min);
        expect(point.value).toBeLessThanOrEqual(visual.max);
      }
      if (visual.movement) {
        const end =
          visual.movement.from +
          (visual.movement.direction === "right" ? 1 : -1) * visual.movement.steps;
        expect(visual.movement.steps).toBeGreaterThan(0);
        expect(visual.movement.from).toBeGreaterThanOrEqual(visual.min);
        expect(visual.movement.from).toBeLessThanOrEqual(visual.max);
        expect(end).toBeGreaterThanOrEqual(visual.min);
        expect(end).toBeLessThanOrEqual(visual.max);
        // The visual label gives the operation, not the destination answer.
        expect(visual.movement.label.bm).not.toMatch(/−?11|−?3$/);
        expect(visual.movement.label.dlp).not.toMatch(/-?11|-?3$/);
      }
      if (visual.span) {
        expect(visual.span.from).toBeGreaterThanOrEqual(visual.min);
        expect(visual.span.from).toBeLessThanOrEqual(visual.max);
        expect(visual.span.to).toBeGreaterThanOrEqual(visual.min);
        expect(visual.span.to).toBeLessThanOrEqual(visual.max);
        expect(visual.span.label.bm).toContain("?");
        expect(visual.span.label.dlp).toContain("?");
      }
    }
  });

  it("keeps the number-line visual through option shuffling", () => {
    for (const [objective, number] of VISUAL_SLOTS) {
      for (const lang of LANGS) {
        const original = at(objective, lang, number);
        const shuffled = shuffleQuestionOptions(original);
        expect(shuffled.visual, original.id).toBe(original.visual);
        expect(keyed(shuffled), original.id).toBe(keyed(original));
      }
    }
  });
});

// Chapter 12 (Data Handling) visual questions. Every question whose skill is
// reading a data representation now shows that representation (a table or a
// static SVG chart) instead of describing it in prose. Questions were
// rewritten in place: counts, IDs, difficulty and answer slots are unchanged,
// so the quiz catalog (and the server XP rows) stay exactly as released.
describe("Mathematics Form 1 Chapter 12 visual questions", () => {
  type Kind = MathQuestionVisual["kind"];
  // [objective, question number, representation, difficulty]
  const VISUAL_SLOTS: Array<[Objective, number, Kind, Difficulty]> = [
    ["objective-1", 2, "frequency-table", "Easy"],
    ["objective-1", 15, "frequency-table", "Easy"],
    ["objective-1", 16, "bar-chart", "Easy"],
    ["objective-1", 17, "pie-chart", "Easy"],
    ["objective-1", 18, "line-graph", "Easy"],
    ["objective-1", 19, "dot-plot", "Easy"],
    ["objective-1", 20, "histogram", "Easy"],
    ["objective-1", 21, "histogram", "Easy"],
    ["objective-1", 22, "stem-leaf", "Easy"],
    ["objective-1", 23, "frequency-polygon", "Easy"],
    ["objective-1", 26, "dot-plot", "Easy"],
    ["objective-1", 27, "bar-chart", "Easy"],
    ["objective-1", 28, "dot-plot", "Easy"],
    ...(
      [
        [1, "bar-chart"],
        [2, "bar-chart"],
        [3, "pie-chart"],
        [4, "pie-chart"],
        [5, "pie-chart"],
        [7, "line-graph"],
        [8, "frequency-table"],
        [9, "frequency-table"],
        [10, "stem-leaf"],
        [11, "stem-leaf"],
        [12, "frequency-table"],
        [13, "dot-plot"],
        [14, "dot-plot"],
        [15, "pie-chart"],
        [16, "line-graph"],
        [19, "histogram"],
        [21, "frequency-table"],
        [22, "stem-leaf"],
        [23, "pie-chart"],
        [24, "pie-chart"],
        [25, "line-graph"],
        [27, "stem-leaf"],
        [28, "frequency-table"],
        [29, "pie-chart"],
        [30, "dot-plot"],
      ] as const
    ).map(
      ([number, kind]) =>
        ["objective-2", number, kind, "Medium"] as [Objective, number, Kind, Difficulty],
    ),
    ...(
      [
        [1, "line-graph"],
        [2, "bar-chart"],
        [3, "histogram"],
        [4, "stem-leaf"],
        [7, "line-graph"],
        [8, "stem-leaf"],
        [9, "dot-plot"],
        [10, "pie-chart"],
        [11, "histogram"],
        [12, "line-graph"],
        [16, "dot-plot"],
        [17, "frequency-table"],
        [21, "frequency-polygon"],
        [22, "line-graph"],
        [27, "line-graph"],
        [28, "histogram"],
        [29, "pie-chart"],
      ] as const
    ).map(
      ([number, kind]) =>
        ["objective-3", number, kind, "Hard"] as [Objective, number, Kind, Difficulty],
    ),
  ];
  const at = (objective: Objective, lang: Lang, number: number) =>
    bank(12, objective, lang)[number - 1];
  const visualOf = <K extends Kind>(objective: Objective, number: number, kind: K) => {
    const visual = at(objective, "dlp", number).visual;
    if (visual?.kind !== kind) throw new Error(`C12 ${objective} q${number} is not a ${kind}`);
    return visual as MathQuestionVisual & { kind: K };
  };
  const value = (option: string) => Number(option.match(/\d+(\.\d+)?/)?.[0]);
  const visualQuestions = VISUAL_SLOTS.flatMap(([objective, number]) =>
    LANGS.map((lang) => at(objective, lang, number)),
  );
  const chapter12 = OBJECTIVES.flatMap((objective) =>
    LANGS.flatMap((lang) => bank(12, objective, lang)),
  );
  /** Values that stand apart at either end of the data (gap of 2 or more to the next value). */
  const isolated = (values: number[]) => {
    const distinct = [...new Set(values)].sort((a, b) => a - b);
    return distinct.filter(
      (entry, index) =>
        values.filter((other) => other === entry).length === 1 &&
        ((index === 0 && distinct[1] - entry >= 2) ||
          (index === distinct.length - 1 && entry - distinct[index - 1] >= 2)),
    );
  };

  it("shows a visual on exactly the planned Chapter 12 BM/DLP pairs", () => {
    const expected = VISUAL_SLOTS.flatMap(([objective, number]) =>
      LANGS.map((lang) => `math-f1-c12-${objective}-${lang}-q${number}`),
    );
    const withVisual = chapter12.filter((question) => question.visual).map((q) => q.id);
    expect(withVisual.sort()).toEqual(expected.sort());
    expect(withVisual).toHaveLength(110);
  });


  it("always renders a pie chart when a Chapter 12 question explicitly asks about a pie chart", () => {
    for (const question of chapter12) {
      if (!/(pie chart|carta pai)/i.test(question.question)) continue;
      expect(question.visual?.kind, question.id).toBe("pie-chart");
    }
  });

  it("never describes a chart, table or plot in prose without showing it", () => {
    const representation =
      /(bar chart|pie chart|line graph|histogram|dot plot|stem-and-leaf( plot)?|frequency table|frequency polygons?|carta palang|carta pai|graf garis|plot titik|plot batang-dan-daun|jadual kekerapan|poligon kekerapan)( menunjukkan| shows?|:)/i;
    for (const question of chapter12) {
      if (question.visual) continue;
      expect(question.question, question.id).not.toMatch(representation);
      expect(question.question, question.id).not.toMatch(/●|\d\s*\|\s*\d/);
    }
  });

  it("keeps every Chapter 12 pool at 30 with its original IDs, difficulty and answer slot", () => {
    for (const objective of OBJECTIVES) {
      for (const lang of LANGS) {
        const questions = bank(12, objective, lang);
        expect(questions).toHaveLength(30);
        expect(questions.map((question) => question.id)).not.toContain(
          `math-f1-c12-${objective}-${lang}-q31`,
        );
      }
    }
    for (const [objective, number, kind, difficulty] of VISUAL_SLOTS) {
      const bm = at(objective, "bm", number);
      const dlp = at(objective, "dlp", number);
      expect(bm.id).toBe(`math-f1-c12-${objective}-bm-q${number}`);
      expect(bm.visual?.kind, bm.id).toBe(kind);
      expect(bm.difficulty, bm.id).toBe(difficulty);
      expect(dlp.difficulty, dlp.id).toBe(difficulty);
      // BM and DLP read the very same data object: identical values by construction.
      expect(dlp.visual, dlp.id).toBe(bm.visual);
      expect(dlp.answerIndex, dlp.id).toBe(bm.answerIndex);
      expect(dlp.options.map(value), dlp.id).toEqual(bm.options.map(value));
    }
  });

  it("only uses representations taught in the Chapter 12 notes", () => {
    const notes = readFileSync("src/content/form1/math/chapter-12/notes-dlp.ts", "utf8");
    const taught: Partial<Record<Kind, RegExp>> = {
      "frequency-table": /frequency table/i,
      "bar-chart": /bar chart/i,
      histogram: /histogram/i,
      "line-graph": /line graph/i,
      "frequency-polygon": /frequency polygon/i,
      "pie-chart": /pie chart/i,
      "dot-plot": /dot plot/i,
      "stem-leaf": /stem-and-leaf/i,
    };
    for (const question of visualQuestions) {
      const pattern = taught[question.visual!.kind];
      expect(pattern, question.id).toBeDefined();
      if (pattern) expect(notes).toMatch(pattern);
    }
  });

  it("stores valid, honestly scaled data in every visual", () => {
    const localized = (text: unknown) =>
      typeof text === "string" ||
      (typeof text === "object" &&
        !!(text as LocalizedText).bm?.trim() &&
        !!(text as LocalizedText).dlp?.trim());
    for (const question of visualQuestions) {
      const visual = question.visual!;
      const id = question.id;
      expect(visual.title.bm.trim() && visual.title.dlp.trim(), id).toBeTruthy();
      switch (visual.kind) {
        case "frequency-table": {
          expect(new Set(visual.rows.map((row) => JSON.stringify(row.value))).size, id).toBe(
            visual.rows.length,
          );
          for (const row of visual.rows) {
            expect(Object.keys(row).sort(), id).toEqual(["frequency", "value"]);
            expect(localized(row.value), id).toBe(true);
            expect(Number.isInteger(row.frequency) && row.frequency >= 0, id).toBe(true);
          }
          break;
        }
        case "bar-chart":
        case "histogram": {
          const values =
            visual.kind === "bar-chart"
              ? visual.bars.map((bar) => bar.value)
              : visual.classes.map((entry) => entry.frequency);
          for (const n of values) expect(Number.isInteger(n) && n >= 0, id).toBe(true);
          // The value axis starts at 0 and reaches at least the tallest bar.
          const { step, top } = axisScale(Math.max(...values));
          expect(top, id).toBeGreaterThanOrEqual(Math.max(...values));
          expect(top / step, id).toBeLessThanOrEqual(6);
          if (visual.kind === "histogram") {
            // Classes are consecutive: 41–50 then 51–60, or 60–70 then 70–80.
            const bounds = visual.classes.map((entry) => entry.label.split("–").map(Number));
            for (let i = 1; i < bounds.length; i += 1) {
              expect([bounds[i - 1][1], bounds[i - 1][1] + 1], id).toContain(bounds[i][0]);
            }
          }
          break;
        }
        case "line-graph":
        case "frequency-polygon": {
          for (const series of visual.series) {
            expect(series.values, id).toHaveLength(visual.xLabels.length);
            for (const n of series.values) expect(Number.isFinite(n) && n >= 0, id).toBe(true);
          }
          expect(visual.series.length > 1, id).toBe(visual.series.every((series) => !!series.name));
          break;
        }
        case "pie-chart": {
          const total = visual.sectors.reduce((sum, sector) => sum + sector.angle, 0);
          expect(total, id).toBe(360);
          for (const sector of visual.sectors) {
            if (sector.text.endsWith("%")) {
              expect(parseFloat(sector.text) * 3.6, `${id} ${sector.text}`).toBeCloseTo(
                sector.angle,
              );
            } else if (sector.text.endsWith("°")) {
              expect(parseFloat(sector.text), id).toBe(sector.angle);
            } else if (/^\d+(?:\.\d+)?$/.test(sector.text)) {
              // A chart may print the *number of people* rather than an angle:
              // e.g. 16 of 40 students occupies 144° in the pie.
              const counts = visual.sectors.map((entry) => Number(entry.text));
              expect(question.question + " " + question.explanation, id).toContain(sector.text);
              if (counts.every((count) => Number.isFinite(count) && count >= 0)) {
                const n = counts.reduce((sum, count) => sum + count, 0);
                expect((Number(sector.text) / n) * 360, id).toBeCloseTo(sector.angle);
              }
            } else {
              // In diagrams with an unknown *angle*, x must be the unknown label.
              expect(sector.text, id).toBe("x");
              expect(question.explanation, id).toContain(`x = 360° − `);
              expect(question.explanation, id).toContain(`${sector.angle}°`);
            }
          }
          break;
        }
        case "dot-plot": {
          for (const n of visual.values) {
            expect(Number.isInteger(n) && n >= visual.min && n <= visual.max, id).toBe(true);
          }
          expect(
            Math.max(...dotPlotCounts(visual.values).map(([, count]) => count)),
            id,
          ).toBeLessThanOrEqual(8);
          break;
        }
        case "stem-leaf": {
          for (const n of visual.values) expect(n >= 10 && n <= 99, id).toBe(true);
          const [stem, leaf] = visual.key.dlp
            .match(/(\d+) \| (\d)/)!
            .slice(1)
            .map(Number);
          expect(visual.values, id).toContain(stem * 10 + leaf);
          expect(visual.key.bm, id).toContain(`${stem} | ${leaf}`);
          break;
        }
      }
    }
  });

  it("asks about the visual instead of repeating its data in the question", () => {
    for (const question of visualQuestions) {
      expect(question.question, question.id).toMatch(
        /^(?:Lihat )?(Jadual kekerapan|Plot titik|Carta palang|Carta pai|Graf garis|Histogram|Poligon kekerapan|Plot batang-dan-daun)(?: (menunjukkan|dibahagikan)|\.)|^(?:Look at )?[Tt]he (frequency table|dot plot|bar chart|pie chart|line graph|histogram|frequency polygons|stem-and-leaf plot)(?: (shows?|is divided)|\.)/,
      );
      expect(question.question, question.id).not.toMatch(/=\s*\d|\d+,\s*\d+,\s*\d+|●|\d\s*\|\s*\d/);
      expect(
        `${question.question} ${question.options.join(" ")} ${question.explanation}`,
        question.id,
      ).not.toMatch(/\bmean\b|\bmin\b|purata|median|probability|kebarangkalian/i);
    }
  });

  it("re-derives every visual answer from the chart data and rejects every distractor", () => {
    const expectOnly = (
      objective: Objective,
      number: number,
      correct: (option: string) => boolean,
    ) => {
      const question = at(objective, "dlp", number);
      question.options.forEach((option, index) =>
        expect(correct(option), `${question.id}: ${option}`).toBe(index === question.answerIndex),
      );
    };
    const expectKey = (objective: Objective, number: number, expected: string) =>
      expect(keyed(at(objective, "dlp", number)), `C12 ${objective} q${number}`).toBe(expected);
    const sum = (values: number[]) => values.reduce((total, n) => total + n, 0);
    const is = (n: number) => (option: string) => value(option) === n;

    // Objective 1
    const books = visualOf("objective-1", 2, "frequency-table");
    expectOnly("objective-1", 2, is(books.rows.find((row) => row.value === "3")!.frequency));
    const goals = dotPlotCounts(visualOf("objective-1", 26, "dot-plot").values);
    const most = Math.max(...goals.map(([, count]) => count));
    expect(goals.filter(([, count]) => count === most)).toHaveLength(1);
    expectOnly("objective-1", 26, is(goals.find(([, count]) => count === most)![0]));

    // Objective 2
    expectOnly(
      "objective-2",
      1,
      is(sum(visualOf("objective-2", 1, "bar-chart").bars.map((b) => b.value))),
    );
    const club = visualOf("objective-2", 2, "bar-chart").bars.map((bar) => bar.value);
    expectOnly("objective-2", 2, is(Math.max(...club) - Math.min(...club)));
    const sports = visualOf("objective-2", 3, "pie-chart").sectors[0];
    expect(sports.label).toEqual({ bm: "Sukan", dlp: "Sports" });
    expectOnly("objective-2", 3, is((sports.angle / 360) * 50));
    const sales = visualOf("objective-2", 7, "line-graph").series[0].values;
    expectOnly("objective-2", 7, is(sales.at(-1)! - sales[0]));
    const marks = visualOf("objective-2", 8, "frequency-table").rows;
    const marksTotal = sum(marks.map((row) => row.frequency));
    expectOnly("objective-2", 8, is(marksTotal));
    const modal = marks.reduce((best, row) => (row.frequency > best.frequency ? row : best));
    expectOnly("objective-2", 9, (option) => option === modal.value);
    const quizStems = visualOf("objective-2", 10, "stem-leaf").values;
    expectOnly("objective-2", 10, is(quizStems.filter((n) => n >= 30 && n <= 39).length));
    expectOnly("objective-2", 11, is(Math.max(...visualOf("objective-2", 11, "stem-leaf").values)));
    const quizDots = visualOf("objective-2", 13, "dot-plot").values;
    expectOnly("objective-2", 13, is(quizDots.filter((n) => n === 8).length));
    expect(isolated(visualOf("objective-2", 14, "dot-plot").values)).toEqual([4]);
    expectKey("objective-2", 14, "An outlier");
    const four = visualOf("objective-2", 15, "pie-chart").sectors;
    expectOnly(
      "objective-2",
      15,
      (option) => option === `${360 - sum(four.slice(0, 3).map((s) => s.angle))}°`,
    );
    const club2 = visualOf("objective-2", 16, "line-graph").series[0].values;
    expectOnly("objective-2", 16, is(Math.max(...club2) - Math.min(...club2)));
    const heightBar = visualOf("objective-2", 19, "histogram").classes.find(
      (c) => c.label === "150–155",
    )!;
    expectKey(
      "objective-2",
      19,
      `${heightBar.frequency} students have heights in the range 150 cm to 155 cm`,
    );
    const travel = visualOf("objective-2", 21, "frequency-table").rows;
    expectOnly(
      "objective-2",
      21,
      is(
        sum(
          travel
            .filter((row) => Number(String(row.value).split("–")[0]) > 30)
            .map((row) => row.frequency),
        ),
      ),
    );
    expectOnly("objective-2", 22, is(visualOf("objective-2", 22, "stem-leaf").values.length));
    const library = visualOf("objective-2", 25, "line-graph");
    const lowest = library.series[0].values.indexOf(Math.min(...library.series[0].values));
    expect(
      keyed(at("objective-2", "dlp", 25)).startsWith(
        (library.xLabels[lowest] as LocalizedText).dlp,
      ),
    ).toBe(true);
    expect(
      keyed(at("objective-2", "bm", 25)).startsWith((library.xLabels[lowest] as LocalizedText).bm),
    ).toBe(true);
    expectOnly(
      "objective-2",
      27,
      (option) => option === `${Math.min(...visualOf("objective-2", 27, "stem-leaf").values)} kg`,
    );
    expect(visualOf("objective-2", 28, "frequency-table")).toBe(
      visualOf("objective-2", 8, "frequency-table"),
    );
    expectOnly(
      "objective-2",
      28,
      (option) => option === `${(modal.frequency / marksTotal) * 100}%`,
    );
    const football = visualOf("objective-2", 29, "pie-chart").sectors[0];
    expectOnly("objective-2", 29, is((football.angle / 360) * 50));
    expect(isolated(visualOf("objective-2", 30, "dot-plot").values)).toEqual([12, 20]);
    expectKey("objective-2", 30, "Outliers");

    // Objective 3
    const museum = visualOf("objective-3", 1, "line-graph").series[0].values;
    const perYear = Math.round((museum.at(-1)! - museum[0]) / (museum.length - 1));
    expectOnly("objective-3", 1, is(museum.at(-1)! + perYear));
    const products = visualOf("objective-3", 2, "bar-chart").bars;
    const productTotal = sum(products.map((bar) => bar.value));
    const above = products.filter((bar) => bar.value > 0.3 * productTotal).map((bar) => bar.label);
    expect(above).toHaveLength(1);
    expectOnly("objective-3", 2, (option) => option === `Product ${above[0]}`);
    const fifty = visualOf("objective-3", 3, "histogram").classes;
    expect(sum(fifty.map((entry) => entry.frequency))).toBe(50);
    const fiftyModal = fifty.reduce((best, entry) =>
      entry.frequency > best.frequency ? entry : best,
    );
    expectKey("objective-3", 3, `Most students scored ${fiftyModal.label} marks`);
    const masses = [...visualOf("objective-3", 4, "stem-leaf").values].sort((a, b) => a - b);
    expect(isolated(masses)).toEqual([74]);
    expectOnly(
      "objective-3",
      4,
      (option) =>
        option === `Range = ${masses.at(-1)! - masses[0]} kg; ${masses.at(-1)} kg is an outlier`,
    );
    const temps = visualOf("objective-3", 7, "line-graph").series[0].values;
    const peak = temps.indexOf(Math.max(...temps));
    expect(peak).toBeGreaterThan(0);
    expect(peak).toBeLessThan(temps.length - 1);
    expect(keyed(at("objective-3", "dlp", 7))).toContain(`${temps.at(-1)! - 2}°C`);
    const puzzle = visualOf("objective-3", 8, "stem-leaf").values;
    expectOnly("objective-3", 8, is(Math.max(...puzzle) - Math.min(...puzzle)));
    const sleep = [...visualOf("objective-3", 9, "dot-plot").values].sort((a, b) => a - b);
    expect(isolated(sleep)).toEqual([sleep[0]]);
    expectOnly(
      "objective-3",
      9,
      (option) => option === `${sleep.at(-1)! - sleep[0]} hours; ${sleep.at(-1)! - sleep[1]} hours`,
    );
    const five = visualOf("objective-3", 10, "pie-chart").sectors;
    const x = 360 - sum(five.slice(0, 4).map((sector) => sector.angle));
    expectOnly("objective-3", 10, (option) => option === `x=${x}°, ${(x / 360) * 100}%`);
    const classes = visualOf("objective-3", 11, "histogram").classes;
    const [c1, c2] = ["60–70", "70–80"].map(
      (label) => classes.find((entry) => entry.label === label)!,
    );
    const mid = (label: string) => sum(label.split("–").map(Number)) / 2;
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const g = gcd(c1.frequency, c2.frequency);
    expectKey(
      "objective-3",
      11,
      `MP1=${mid(c1.label)}, MP2=${mid(c2.label)}, Ratio ${c1.frequency / g}:${c2.frequency / g}`,
    );
    const pass = visualOf("objective-3", 12, "line-graph").series[0].values;
    expect(pass.at(-1)!).toBeGreaterThan(pass[0]);
    expect(pass.filter((n, i) => i > 0 && n < pass[i - 1])).toHaveLength(1);
    expect(keyed(at("objective-3", "dlp", 12))).toMatch(/generally rising despite the 2020 dip/);
    expect(isolated(visualOf("objective-3", 16, "dot-plot").values)).toEqual([12]);
    expect(keyed(at("objective-3", "dlp", 16))).toContain("12 is an outlier");
    const finals = visualOf("objective-3", 17, "frequency-table").rows;
    const finalModal = finals.reduce((best, row) => (row.frequency > best.frequency ? row : best));
    expectKey(
      "objective-3",
      17,
      `MP=${mid(String(finalModal.value))}, n=${sum(finals.map((row) => row.frequency))}`,
    );
    const [classX, classY] = visualOf("objective-3", 21, "frequency-polygon").series.map(
      (s) => s.values,
    );
    expect(classX.indexOf(Math.max(...classX))).toBeLessThan(classY.indexOf(Math.max(...classY)));
    expectKey("objective-3", 21, "Class X tends to score lower; Class Y tends to score higher");
    const yearly = visualOf("objective-3", 22, "line-graph").series[0].values;
    const top = yearly.indexOf(Math.max(...yearly));
    expect(top).toBe(5); // June
    expect(yearly.slice(0, top + 1).every((n, i, all) => i === 0 || n > all[i - 1])).toBe(true);
    expect(yearly.slice(top).every((n, i, all) => i === 0 || n < all[i - 1])).toBe(true);
    expect(keyed(at("objective-3", "dlp", 22))).toMatch(
      /^A seasonal pattern: high in the first half/,
    );
    const cases = visualOf("objective-3", 27, "line-graph").series[0].values;
    expect(cases.every((n, i) => i === 0 || n < cases[i - 1])).toBe(true);
    expectKey("objective-3", 27, "Cases are falling steadily and are likely to keep falling");
    const tall = visualOf("objective-3", 28, "histogram").classes.map((entry) => entry.frequency);
    const tallest = tall.indexOf(Math.max(...tall));
    expect(tallest).toBe(Math.floor(tall.length / 2));
    expect(Math.max(tall[0], tall.at(-1)!)).toBeLessThan(tall[tallest] / 2);
    expectKey("objective-3", 28, "Most students are of medium height");
    const food = visualOf("objective-3", 29, "pie-chart").sectors[0];
    expect(food.label).toEqual({ bm: "Makanan", dlp: "Food" });
    expectOnly("objective-3", 29, (option) => option === `RM${(food.angle / 360) * 1200}`);
  });

  it("explains how to read each visual and its answer in both languages", () => {
    for (const question of visualQuestions) {
      const answerNumbers = keyed(question).match(/\d+/g) ?? [];
      for (const n of answerNumbers) expect(question.explanation, question.id).toContain(n);
      expect(question.explanation!.length, question.id).toBeGreaterThan(60);
    }
  });

  it("keeps the visual through difficulty ordering, option shuffling and a retry", () => {
    for (const objective of OBJECTIVES) {
      for (const lang of LANGS) {
        const questions = bank(12, objective, lang);
        const attempt = () =>
          orderQuestionsByDifficulty(questions, Math.random).questions.map((question) =>
            shuffleQuestionOptions(question),
          );
        for (const run of [attempt(), attempt()]) {
          for (const question of run) {
            const original = questions.find((entry) => entry.id === question.id)!;
            expect(question.visual, question.id).toBe(original.visual);
            expect(keyed(question)).toBe(keyed(original));
          }
        }
        // A JSON round trip (persisted state) keeps the data intact.
        const restored = JSON.parse(JSON.stringify(questions)) as typeof questions;
        restored.forEach((question, index) =>
          expect(question.visual).toEqual(questions[index].visual),
        );
      }
    }
  });

  it("leaves the Chapter 12 catalog rows exactly as released (no migration needed)", () => {
    const rows = buildQuizCatalog().quizzes.filter(
      (row) => row.kind === "math-objective" && row.quizKey.includes(":form-1:chapter-12:"),
    );
    expect(
      rows
        .map((row) => [
          row.quizKey.split(":").slice(-2).join(":"),
          row.totalQuestions,
          row.easyCount,
          row.mediumCount,
          row.hardCount,
          row.maxXp,
        ])
        .sort(),
    ).toEqual(
      [
        ["bm:objective-1", 30, 30, 0, 0, 475],
        ["bm:objective-2", 30, 0, 30, 0, 775],
        ["bm:objective-3", 30, 0, 0, 30, 1075],
        ["dlp:objective-1", 30, 30, 0, 0, 475],
        ["dlp:objective-2", 30, 0, 30, 0, 775],
        ["dlp:objective-3", 30, 0, 0, 30, 1075],
      ].sort(),
    );
  }, 120_000);
});

// The server checks submitted correct answers per difficulty against
// public.quiz_catalog, so the eight banks whose size changed in the audit need
// the targeted catalog migration. These run the real migrations in PGlite.
describe("Mathematics Form 1 catalog migration 20261009113516 (server XP)", () => {
  const MIGRATION = "20261009113516_sync_math_f1_quiz_catalog_metadata.sql";
  const migrationSql = readFileSync(
    new URL(`../../../../supabase/migrations/${MIGRATION}`, import.meta.url),
    "utf8",
  );
  const REPAIRED: Array<[number, Objective, Lang]> = [
    [7, "objective-2", "bm"],
    [9, "objective-2", "bm"],
    [10, "objective-2", "bm"],
    [9, "objective-3", "bm"],
    [10, "objective-3", "bm"],
    [13, "objective-3", "dlp"],
    [8, "objective-3", "dlp"],
    [12, "objective-3", "bm"],
  ];
  const keyOf = (chapter: number, objective: Objective, lang: Lang) =>
    buildCanonicalQuizKey({
      kind: "math-objective",
      form: "Form 1",
      chapterKey: `Chapter ${chapter}`,
      lang,
      objectiveId: objective,
    });
  const repairedKeys = REPAIRED.map((entry) => keyOf(...entry));
  const C7_BM_O2 = keyOf(7, "objective-2", "bm");
  const C9_BM_O3 = keyOf(9, "objective-3", "bm");
  const C12_BM_O3 = keyOf(12, "objective-3", "bm");

  type CatalogDbRow = {
    quiz_key: string;
    kind: string;
    formula: string;
    subject_id: string;
    form: number;
    chapter_key: string;
    lang: string;
    total_questions: number;
    easy_count: number;
    medium_count: number;
    hard_count: number;
    timer_bonus_allowed: boolean;
    max_xp: number;
    is_active: boolean;
  };
  const catalogSql = `select quiz_key, kind, formula, subject_id, form, chapter_key, lang,
      total_questions, easy_count, medium_count, hard_count, timer_bonus_allowed, max_xp, is_active
    from public.quiz_catalog order by quiz_key`;
  const legacySql = `select legacy_key, quiz_key from public.quiz_catalog_legacy_keys order by legacy_key, quiz_key`;

  let h: Awaited<ReturnType<typeof createQuizXpDb>>;
  let before: CatalogDbRow[];
  let legacyBefore: unknown[];
  let appRows: QuizCatalogRow[];
  let userCount = 0;
  const newUser = async () => {
    userCount += 1;
    const id = `0000000f-0000-4000-8000-${userCount.toString(16).padStart(12, "0")}`;
    await h.addUser(id);
    return id;
  };
  let completion = 0;
  const submit = (userId: string, quizKey: string, counts: [number, number, number]) => {
    completion += 1;
    return h.completeCatalogQuiz(registered(userId), {
      completionId: `0000000c-0000-4000-8000-${completion.toString(16).padStart(12, "0")}`,
      quizKey,
      correctEasy: counts[0],
      correctMedium: counts[1],
      correctHard: counts[2],
      timerMode: "none",
    });
  };

  beforeAll(async () => {
    appRows = buildQuizCatalog().quizzes.filter(
      (row) => row.kind === "math-objective" && row.form === 1,
    );
    h = await createQuizXpDb();
    before = (await h.db.query<CatalogDbRow>(catalogSql)).rows;
    legacyBefore = (await h.db.query(legacySql)).rows;
  }, 300_000);

  it("reproduces the pre-migration failure: a perfect 30/30 Medium score is rejected", async () => {
    const userId = await newUser();
    await expect(submit(userId, C7_BM_O2, [0, 30, 0])).rejects.toThrow(/Invalid quiz result/);
  });

  it("updates exactly the eight repaired rows and nothing else in the catalog or legacy keys", async () => {
    await h.db.exec(migrationSql);
    const after = (await h.db.query<CatalogDbRow>(catalogSql)).rows;
    expect(after.map((row) => row.quiz_key)).toEqual(before.map((row) => row.quiz_key));
    const changed = after
      .filter((row, index) => JSON.stringify(row) !== JSON.stringify(before[index]))
      .map((row) => row.quiz_key)
      .sort();
    expect(changed).toEqual([...repairedKeys].sort());
    expect((await h.db.query(legacySql)).rows).toEqual(legacyBefore);
  });

  it("leaves all 78 Form 1 Maths objective rows matching buildQuizCatalog()", async () => {
    const rows = (await h.db.query<CatalogDbRow>(catalogSql)).rows.filter((row) =>
      row.quiz_key.startsWith("quiz-v2:math-objective:math:form-1:"),
    );
    expect(rows).toHaveLength(78);
    expect(appRows).toHaveLength(78);
    for (const app of appRows) {
      const row = rows.find((entry) => entry.quiz_key === app.quizKey);
      expect(row, app.quizKey).toMatchObject({
        kind: "math-objective",
        formula: "objective",
        subject_id: "math",
        form: 1,
        chapter_key: app.chapterKey,
        lang: app.lang,
        total_questions: app.totalQuestions,
        easy_count: app.easyCount,
        medium_count: app.mediumCount,
        hard_count: app.hardCount,
        timer_bonus_allowed: false,
        max_xp: app.maxXp,
        is_active: true,
      });
    }
  });

  it("accepts perfect scores on the repaired banks and awards exactly the catalog ceiling", async () => {
    for (const [quizKey, counts, ceiling] of [
      [C7_BM_O2, [0, 30, 0], 775],
      [C9_BM_O3, [0, 0, 30], 1075],
      [C12_BM_O3, [0, 0, 30], 1075],
    ] as const) {
      const userId = await newUser();
      await expect(submit(userId, quizKey, [...counts])).resolves.toMatchObject({
        awarded: true,
        xpEarned: ceiling,
      });
    }
  });

  it("serves Chapter 12 BM Objective 3 as exactly 30 questions with no q31 left", async () => {
    const live = bank(12, "objective-3", "bm");
    expect(live).toHaveLength(30);
    expect(live.map((question) => question.id)).not.toContain("math-f1-c12-objective-3-bm-q31");
    const userId = await newUser();
    await expect(submit(userId, C12_BM_O3, [0, 0, 31])).rejects.toThrow(/Invalid quiz result/);
  });

  it("is safe to re-run and refuses to touch rows in an unexpected state", async () => {
    const snapshot = (await h.db.query<CatalogDbRow>(catalogSql)).rows;
    await h.db.exec(migrationSql);
    expect((await h.db.query<CatalogDbRow>(catalogSql)).rows).toEqual(snapshot);

    const guarded = await createQuizXpDb();
    await guarded.db.exec(
      `update public.quiz_catalog set total_questions = 27, medium_count = 27, max_xp = 700
       where quiz_key = '${C7_BM_O2}'`,
    );
    await expect(guarded.db.exec(migrationSql)).rejects.toThrow(
      /Expected eight active Form 1 Maths/,
    );
  }, 300_000);
});

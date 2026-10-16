import { describe, expect, it } from "vitest";
import { getChapter } from "@/content/registry";
import { splitFlashcardDeck, standardizeFlashcardDeck } from "@/lib/flashcard-availability";
import {
  getReviewModes,
  cardsForReviewMode,
  structuredBack,
  structuredFront,
  type StructuredFlashcard,
} from "@/features/flashcards/structuredFlashcard";
import {
  describeMathPatternVisual,
  isMathPatternVisual,
  pascalValue,
  validateMathPatternVisual,
} from "@/features/quiz/visuals/mathPatternVisual";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { MATH_F2_C1_FLASHCARD_BANK } from "./flashcard-bank";
import { MATH_F2_C1_SUBTOPIC_ORDER } from "./flashcard-subtopics";
import { mathF2C1FlashcardsBM } from "./flashcards-bm";
import { mathF2C1FlashcardsDLP } from "./flashcards-dlp";

const DECKS = { dlp: mathF2C1FlashcardsDLP, bm: mathF2C1FlashcardsBM } as const;
const LANGS = ["dlp", "bm"] as const;
const MODE_COUNTS = { concept: 4, practice: 11, challenge: 5 } as const;

const structured = (lang: "dlp" | "bm", index: number) =>
  DECKS[lang][index].structured as StructuredFlashcard;
const allText = (card: StructuredFlashcard) =>
  [card.prompt, ...(card.parts ?? []), ...card.answer.flat(), card.note ?? ""].join("\n");
const answerText = (card: StructuredFlashcard) =>
  [...card.answer.flat(), card.note ?? ""].join("\n");
const visualsOf = (card: StructuredFlashcard): MathQuestionVisual[] => [
  ...(card.visuals ?? []),
  ...(card.answerVisuals ?? []),
];

// Independent arithmetic for the answer checks below.
const ap = (first: number, step: number, position: number) => first + (position - 1) * step;
const gp = (first: number, ratio: number, position: number) => first * ratio ** (position - 1);
const fmt = (value: number) => (value < 0 ? `−${Math.abs(value)}` : String(value));
const clock = (start: string, minutes: number) => {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hour = Math.floor(total / 60) % 12 || 12;
  return `${hour}:${String(total % 60).padStart(2, "0")}`;
};
const triangular = (n: number) => (n * (n + 1)) / 2;
const fibonacci = (a: number, b: number, count: number) => {
  const terms = [a, b];
  while (terms.length < count) terms.push(terms.at(-1)! + terms.at(-2)!);
  return terms;
};

/** Values (as written) that each card's worked solution must contain, by card number. */
const EXPECTED_ANSWERS: Record<number, string[]> = {
  1: [fmt(2 * 4)],
  2: [fmt(triangular(5))],
  3: [fmt(pascalValue(5, 3))],
  4: [fmt(fibonacci(0, 1, 8)[7])],
  5: [fmt(ap(-8, 5, 5)), fmt(ap(-8, 5, 6))],
  6: [fmt(gp(96, 1 / 2, 5)), fmt(gp(96, 1 / 2, 6))],
  7: ["1.0", "0.5"],
  8: ["4, 14, 24, 34, 44"],
  9: [fmt(gp(5, 3, 5)), fmt(gp(5, 3, 6))],
  10: [[1, 2, 3, 4, 5, 6].map((p) => pascalValue(6, p)).join(", "), "32"],
  11: [`P = 4 + 6 = ${pascalValue(6, 3)}`, `Q = 10 + 10 = ${pascalValue(7, 4)}`],
  12: ["= 2", "= 3", "= 5", `= ${fibonacci(0, 1, 9)[8]}`],
  13: [fmt(fibonacci(1, 3, 6)[5]), fmt(fibonacci(1, 3, 7)[6])],
  14: [fmt(7 ** 2)],
  15: [fmt(ap(5, 4, 4)), "6"],
  16: [
    ...[5, 6, 7].map((n) => `= ${fibonacci(2, 3, n)[n - 1]}`),
    `${fibonacci(2, 3, 7).reduce((a, b) => a + b, 0)}`, // 86 seedlings in 7 beds
    `${100 - fibonacci(2, 3, 7).reduce((a, b) => a + b, 0)}`, // 14 left over
    `= ${fibonacci(2, 3, 6).reduce((a, b) => a + b, 0)}`, // 52
    `total ${[0, 1, 2, 3, 4, 5].map((k) => 2 + 5 * k).reduce((a, b) => a + b, 0)}|jumlah 87`,
    "= 35",
  ],
  17: [
    ...[4, 5, 6].map((n) => `= ${triangular(n)}`),
    `9 baris|9 rows`,
    `= ${50 - triangular(9)}`,
    "not possible|tidak mungkin",
  ],
  18: [`= ${pascalValue(6, 3)}`, `= ${pascalValue(7, 4)}`, `= ${triangular(7)}`, `${2 ** 7}`],
  19: ["1, 3, 5, 7, 9", "= 30", "= 23", "24"],
  20: [`${3 * 6 + 1}`, `= ${3 * 12 + 1}`, `= ${3 * 16 + 1}`, `= ${50 - (3 * 16 + 1)}`],
  21: ["A."],
  22: ["10"],
  23: ["−2"],
  24: ["0.0081"],
  25: [fmt(ap(7, 4, 3))],
  26: [fmt(ap(95, -12, 2)), fmt(ap(95, -12, 5)), fmt(ap(95, -12, 6))],
  27: [fmt(gp(2, 3, 1)), fmt(gp(2, 3, 2))],
  28: ["4"],
  29: ["7.2"],
  30: ["0.5"],
  31: ["42, 49, 56, 63, 70"],
  32: ["4"],
  33: ["27"],
  34: ["2½", "3"],
  35: [fmt(ap(3, 4, 6))],
  36: [clock("6:40", 50), clock("6:40", 75), clock("6:40", 100), "7:10", "7:05", "= 15"],
  37: [fmt(500 - 3 * 45), fmt(500 - 9 * 45), fmt(500 - 11 * 45), "Day 12|Hari 12"],
  38: [
    "36, 44, 52",
    "68, 72, 76",
    "Week 11|Minggu 11",
    fmt(ap(20, 8, 15)),
    fmt(ap(60, 4, 15)),
    "RM16",
  ],
  39: [
    ...[2, 3].map((k) => `RM${(4.5 - 0.4 * k).toFixed(2)}`),
    `RM${(4.5 - 0.4 * 6).toFixed(2)}`,
    "5:00",
    `RM${(4.5 - 0.4 * 8).toFixed(2)}`,
    `RM${(4.5 - 0.4 * 9).toFixed(2)}`,
  ],
  40: ["600, 1200, 2400", fmt(gp(150, 2, 7))],
  41: ["+4"],
  42: ["T₁ = 4", "T₄ = 16", "T₃ = 12"],
  43: ["A."],
  44: ["2, 8, 14"],
  45: ["6 + 4n"],
  46: ["40 − 7n"],
  47: ["3, 8, 13, 18", "48", "T₁₀"],
  48: [fmt(ap(9, 7, 5))],
  49: ["T₇"],
  50: [fmt(ap(12, 9, 10)), fmt(ap(12, 9, 10) - ap(12, 9, 4))],
  51: [fmt(42 - 5 * 5), fmt(ap(42 - 25, 5, 12))],
  52: ["6", fmt(20 - 2 * 6)],
  53: ["8", "10:00"],
  54: ["n = 16", "T₁₇"],
  55: ["11.75", fmt(3 + 4 * 11), fmt(3 + 4 * 12)],
  56: ["8, 11, 14, 17, 20", fmt(ap(8, 3, 12)), fmt(ap(8, 3, 20))],
  57: ["20 + 4n", `= ${20 + 4 * 14}`, "Row 4|Baris 4"],
  58: ["2 + 4n", `= ${2 + 4 * 9} m`, "15", `${2 + 4 * 14} m`],
  59: [clock("8:30", 6 * 20), "11", fmt(26 - 11)],
  60: [`= ${35 + 7 * 6} kg`, "35 + 6n", `${35 + 6 * 11} kg`, "Week 12|Minggu 12"],
};

describe("Form 2 Maths Chapter 1 flashcards", () => {
  it("has 60 DLP and 60 BM cards with the existing positional IDs", () => {
    for (const lang of LANGS) {
      expect(DECKS[lang]).toHaveLength(60);
      expect(DECKS[lang].map((card) => card.id)).toEqual(
        Array.from({ length: 60 }, (_, index) => `math-f2-c1-${lang}-f${index + 1}`),
      );
      expect(new Set(DECKS[lang].map((card) => card.id)).size).toBe(60);
      for (const card of DECKS[lang]) {
        expect(card).toMatchObject({
          subjectId: "math",
          form: "Form 2",
          chapter: "Chapter 1",
          lang,
        });
      }
    }
  });

  it("groups each subtopic as 4 concept, 11 practice and 5 challenge cards", () => {
    for (const lang of LANGS) {
      const sets = splitFlashcardDeck(standardizeFlashcardDeck(DECKS[lang]));
      expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
      sets.forEach((set, index) => {
        expect(new Set(set.map((card) => card.subtopic))).toEqual(
          new Set([MATH_F2_C1_SUBTOPIC_ORDER[index]]),
        );
        expect(getReviewModes(set)).toEqual(["concept", "practice", "challenge"]);
        for (const [mode, count] of Object.entries(MODE_COUNTS)) {
          expect(cardsForReviewMode(set, mode as keyof typeof MODE_COUNTS)).toHaveLength(count);
        }
        // Modes stay in teaching order inside each subtopic.
        expect(set.map((card) => card.reviewMode)).toEqual([
          ...Array(4).fill("concept"),
          ...Array(11).fill("practice"),
          ...Array(5).fill("challenge"),
        ]);
      });
    }
  });

  it("is served through the content registry for both languages", () => {
    for (const lang of LANGS) {
      const chapter = getChapter("math", "Chapter 1", lang, "Form 2");
      expect(chapter?.flashcards?.map((card) => card.id)).toEqual(
        DECKS[lang].map((card) => card.id),
      );
    }
  });

  it("gives each review mode its intended shape", () => {
    for (const lang of LANGS) {
      DECKS[lang].forEach((card) => {
        const s = card.structured!;
        expect(s.answer.length).toBe(Math.max(1, s.parts?.length ?? 0));
        expect(
          s.answer.every((group) => group.length > 0 && group.every((line) => line.trim())),
        ).toBe(true);
        if (card.reviewMode === "concept") {
          expect(s.parts ?? []).toHaveLength(0);
          expect(s.prompt.length).toBeLessThanOrEqual(150);
        }
        if (card.reviewMode === "practice") {
          expect(s.parts?.length).toBe(2);
        }
        if (card.reviewMode === "challenge" && lang === "dlp") {
          expect(
            s.parts!.some((part) =>
              /Explain|Justify|Show|correct|Check|whether|Which|which plan/i.test(part),
            ),
            `${card.id} needs a reasoning, decision or justification part`,
          ).toBe(true);
        }
        if (card.reviewMode === "challenge") {
          expect(s.parts?.length).toBe(3);
          expect(s.visuals?.length ?? 0, card.id).toBeGreaterThan(0);
        }
      });
    }
  });

  it("keeps plain-text front and back in step with the structured content", () => {
    for (const lang of LANGS) {
      for (const card of DECKS[lang]) {
        expect(card.front).toBe(structuredFront(card.structured!));
        expect(card.back).toBe(structuredBack(card.structured!));
        expect(card.front.trim()).not.toBe("");
      }
    }
  });

  it("has no duplicated questions", () => {
    for (const lang of LANGS) {
      const fronts = DECKS[lang].map((card) => card.front.replace(/\s+/g, " ").toLowerCase());
      expect(new Set(fronts).size).toBe(60);
    }
  });

  it("contains the independently computed answer of every card", () => {
    expect(Object.keys(EXPECTED_ANSWERS)).toHaveLength(60);
    for (const lang of LANGS) {
      DECKS[lang].forEach((_, index) => {
        const text = answerText(structured(lang, index));
        for (const expected of EXPECTED_ANSWERS[index + 1]) {
          const options = expected.split("|");
          expect(
            options.some((option) => text.includes(option)),
            `card ${index + 1} (${lang}) should contain ${expected}`,
          ).toBe(true);
        }
      });
    }
  });

  it("keeps DLP and BM mathematically equivalent", () => {
    const numbers = (text: string) => (text.match(/−?\d+(?:\.\d+)?|T[₀-₉]+|[½]/g) ?? []).sort();
    MATH_F2_C1_FLASHCARD_BANK.forEach((entry, index) => {
      const dlp = structured("dlp", index);
      const bm = structured("bm", index);
      // One shared visual object: both languages read identical diagram data.
      expect(dlp.visuals).toBe(bm.visuals);
      expect(dlp.answerVisuals).toBe(bm.answerVisuals);
      expect(dlp.parts?.length ?? 0).toBe(bm.parts?.length ?? 0);
      expect(dlp.answer.map((group) => group.length)).toEqual(
        bm.answer.map((group) => group.length),
      );
      expect(Boolean(dlp.note)).toBe(Boolean(bm.note));
      expect(numbers(allText(bm)), `card ${index + 1}`).toEqual(numbers(allText(dlp)));
      expect(DECKS.dlp[index].reviewMode).toBe(entry.mode);
      expect(DECKS.bm[index].reviewMode).toBe(entry.mode);
    });
  });

  it("uses proper mathematical typography", () => {
    for (const lang of LANGS) {
      DECKS[lang].forEach((card) => {
        const text = allText(card.structured!);
        expect(text, card.id).not.toMatch(/(^|[\s(=,:])-\d/m); // ASCII hyphen as a minus sign
        expect(text, card.id).not.toMatch(/\bT\d|\bTn\b|T_/); // term notation uses subscripts
        expect(text, card.id).not.toMatch(/\^|\*|\d\s?x\s?\d/); // no ^, * or x for multiply
        expect(text, card.id).not.toMatch(/<[a-z/]/i); // never HTML
      });
    }
  });

  it("states where n starts whenever an algebraic expression in n is used", () => {
    for (const lang of LANGS) {
      DECKS[lang].forEach((card) => {
        const s = card.structured!;
        if (!/\d\s?n\b|\bn\s?[+−]/.test(allText(s))) return;
        const question = [s.prompt, ...(s.parts ?? [])].join(" ");
        const visualText = (s.visuals ?? []).map((visual) => JSON.stringify(visual)).join(" ");
        expect(`${question} ${visualText}`, card.id).toMatch(/n = [01]/);
      });
    }
  });

  it("has valid, deterministic visuals that never announce a hidden value", () => {
    let count = 0;
    for (const entry of MATH_F2_C1_FLASHCARD_BANK) {
      for (const visual of [...(entry.visuals ?? []), ...(entry.answerVisuals ?? [])]) {
        count += 1;
        if (!isMathPatternVisual(visual)) {
          expect(visual.kind).toBe("number-line");
          continue;
        }
        expect(validateMathPatternVisual(visual), JSON.stringify(visual.title)).toEqual([]);
        for (const lang of LANGS) {
          const description = describeMathPatternVisual(visual, lang);
          expect(description.length).toBeGreaterThan(10);
          if (visual.kind === "pascal-triangle") {
            for (const cell of visual.hidden ?? []) {
              const row = Array.from({ length: cell.row }, (_, p) =>
                p + 1 === cell.position
                  ? (cell.label ?? "?")
                  : String(pascalValue(cell.row, p + 1)),
              ).join(", ");
              expect(description).toContain(row);
            }
          }
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(35);
  });

  it("matches every Challenge diagram to the numbers its question states", () => {
    const card = (n: number) => MATH_F2_C1_FLASHCARD_BANK[n - 1];
    const front = (n: number) => card(n).visuals ?? [];
    const prompt = (n: number) => card(n).dlp.prompt;
    const cells = (visual: MathQuestionVisual, row: number) =>
      visual.kind === "term-table"
        ? visual.rows[row].cells.map((cell) =>
            cell === null ? null : typeof cell === "string" ? cell : cell.dlp,
          )
        : [];

    // 1.1
    expect(front(16)[0]).toMatchObject({
      kind: "fibonacci-chain",
      terms: [2, 3, 5, 8, null, null, null],
    });
    expect(prompt(16)).toMatch(/Bed 1 has 2 seedlings and Bed 2 has 3/);
    expect(front(17)[0]).toMatchObject({
      kind: "dot-pattern",
      shape: "triangle",
      stages: [1, 2, 3, 4],
      missingStage: 4,
    });
    expect(cells(front(17)[1], 1)).toEqual(["1", "3", "6", null, null, null]);
    expect(front(18)[0]).toMatchObject({
      kind: "pascal-triangle",
      rows: 7,
      hidden: [
        { row: 6, position: 3, label: "P" },
        { row: 7, position: 4, label: "Q" },
      ],
    });
    expect(cells(front(19)[0], 1)).toEqual(["Left", "Right", "Left", "Right", "Left", "Right"]);
    expect(
      cells(front(19)[0], 0)
        .map(Number)
        .every((n, i) => (n % 2 === 1) === (i % 2 === 0)),
    ).toBe(true);
    expect(front(20)[0]).toMatchObject({
      kind: "matchstick-squares",
      material: "rod",
      stages: [1, 2, 3],
    });
    expect(prompt(20)).toMatch(
      /1 frame needs 4 rods, 2 frames need 7 rods and 3 frames need 10 rods/,
    );

    // 1.2
    expect(cells(front(36)[0], 1).slice(0, 2)).toEqual(["6:40 a.m.", "7:05 a.m."]);
    expect(prompt(36)).toMatch(/6:40 a.m. A bus leaves every 25 minutes/);
    expect(front(37)[0]).toMatchObject({
      terms: [500, 455, 410, null],
      steps: ["−45", "−45", "−45"],
    });
    expect(cells(front(38)[0], 1).slice(0, 2)).toEqual(["20", "28"]);
    expect(cells(front(38)[0], 2).slice(0, 2)).toEqual(["60", "64"]);
    expect(cells(front(39)[0], 1)).toEqual(["4.50", "4.10", null, null]);
    expect(prompt(39)).toMatch(/RM4.50 at 2:00 p.m. Every 30 minutes, the price drops by RM0.40/);
    expect(cells(front(40)[0], 1)).toEqual(["150", "300", null, null, null]);

    // 1.3
    expect(front(56)[0]).toMatchObject({
      kind: "object-stages",
      stages: [{ count: 8 }, { count: 11 }],
    });
    expect(cells(front(56)[1], 1)).toEqual(["8", null, null, null, null]);
    expect(cells(front(57)[0], 1)).toEqual(["0", "1", "2", "3", "4"]);
    expect(cells(front(57)[0], 2)).toEqual(["20", "24", null, null, null]);
    expect(front(58)[0]).toMatchObject({
      terms: [2, 6, 10, 14, null],
      steps: ["+4", "+4", "+4", "+4"],
    });
    expect(cells(front(59)[0], 1).slice(0, 2)).toEqual(["8:30 a.m.", "8:50 a.m."]);
    expect(cells(front(60)[0], 2)).toEqual(["35", "41", null, null]);

    // Tile pattern (Practice) keeps its stage counts.
    expect(front(15)[0]).toMatchObject({ stages: [{ count: 5 }, { count: 9 }, { count: 13 }] });
  });

  it("gives every Challenge card its own real-life setting", () => {
    const challenge = MATH_F2_C1_FLASHCARD_BANK.filter((entry) => entry.mode === "challenge");
    expect(challenge).toHaveLength(15);
    const settings = [
      /gardening club plants seedlings/,
      /canteen/,
      /Open Day/,
      /lockers/,
      /fence/,
      /school bus/,
      /rainwater tank/,
      /class trip/,
      /carnival/,
      /recycling-campaign video/,
      /assembly/,
      /stadium/,
      /plants trees/,
      /clinic/,
      /gotong-royong/,
    ];
    challenge.forEach((entry, index) => expect(entry.dlp.prompt).toMatch(settings[index]));
  });
});

describe("review modes stay opt-in", () => {
  it("does not organise decks whose cards carry no review mode", () => {
    expect(getReviewModes([])).toEqual([]);
    expect(getReviewModes([{}, { reviewMode: "concept" }])).toEqual([]);
    expect(getReviewModes([{ reviewMode: "practice" }, { reviewMode: "concept" }])).toEqual([
      "concept",
      "practice",
    ]);
  });
});

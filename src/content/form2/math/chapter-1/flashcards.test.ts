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
  16: [[1, 2, 3, 4, 5, 6, 7].map((p) => pascalValue(7, p)).join(", "), "1, 2, 4, 8", "64"],
  17: [fmt(fibonacci(2, 3, 5)[4]), fmt(fibonacci(2, 3, 6)[5]), "52", fmt(fibonacci(2, 3, 7)[6])],
  18: [fmt(triangular(4)), fmt(triangular(5)), fmt(triangular(6)), fmt(triangular(9)), "5"],
  19: ["4", "9", "16", "100"],
  20: [fmt(gp(3, 2, 6))],
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
  36: [clock("6:40", 50), clock("6:40", 75), clock("6:40", 100), "15", "6"],
  37: [fmt(500 - 3 * 45), fmt(500 - 9 * 45), fmt(500 - 11 * 45)],
  38: [
    "36, 44, 52",
    "68, 72, 76",
    "Week 11|Minggu 11",
    fmt(ap(20, 8, 15)),
    fmt(ap(60, 4, 15)),
    "RM16",
  ],
  39: [fmt(ap(31, -6, 8)), fmt(ap(31, -6, 7))],
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
  57: ["4 + 3n", fmt(3 * 15 + 1), "33"],
  58: [fmt(5 + 4 * 9), "9"],
  59: [clock("8:30", 6 * 20), "11", fmt(26 - 11)],
  60: [fmt(5 + 3 * 7), "5 + 3n", "Week 20|Minggu 20"],
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
        expect(isMathPatternVisual(visual), visual.kind).toBe(true);
        if (!isMathPatternVisual(visual)) continue;
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

  it("matches each visual to its question data", () => {
    // Spot-check that the diagrams show the numbers the questions state.
    const front = (n: number) => MATH_F2_C1_FLASHCARD_BANK[n - 1].visuals ?? [];
    expect(front(15)[0]).toMatchObject({ stages: [{ count: 5 }, { count: 9 }, { count: 13 }] });
    expect(front(36)[0]).toMatchObject({
      rows: [{}, { cells: [{ dlp: "6:40 a.m." }, { dlp: "7:05 a.m." }, null, null, null] }],
    });
    expect(front(56)[0]).toMatchObject({ stages: [{ count: 8 }, { count: 11 }] });
    expect(front(57)[0]).toMatchObject({ kind: "matchstick-squares", stages: [1, 2, 3] });
    expect(front(17)[0]).toMatchObject({ terms: [2, 3, 5, 8, null, null] });
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

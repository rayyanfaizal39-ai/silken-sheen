import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { MathIndexText } from "@/components/quiz/MathIndexText";
import { getChapterQuizQuestions } from "@/content/registry";
import { shuffleQuestionOptions } from "@/features/quiz/difficulty/quizDifficulty";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { placeValueCells } from "@/features/quiz/visuals/mathStandardFormVisual";
import { mathF3C2QuizzesBM } from "./quizzes-bm";
import { mathF3C2QuizzesDLP } from "./quizzes-dlp";
import { mathF3C2InteractiveContent } from "./interactive-content";
import { MATH_F3_C2_QUIZ_VISUALS } from "./quiz-visuals";

const banks = { bm: mathF3C2QuizzesBM, dlp: mathF3C2QuizzesDLP };
const langs = ["bm", "dlp"] as const;
const rounded = (number: number, figures: number) => {
  const scale = 10 ** (figures - 1 - Math.floor(Math.log10(number)));
  // Restore decimal half-way cases (e.g. 0.008025) lost to binary floating point.
  return Math.round((number + Number.EPSILON * number) * scale) / scale;
};
const numeric = (option: string) => {
  const match = /^(?:RM)?([+-]?\d+(?:\.\d+)?)(?:×10\^\(?(-?\d+)\)?)?/.exec(
    option.replace(/\s/g, ""),
  );
  if (!match) throw new Error(`Not a numerical option: ${option}`);
  return Number(match[1]) * 10 ** Number(match[2] ?? 0);
};
const isStandard = (option: string) => {
  const match = /^([+-]?\d+(?:\.\d+)?)×10\^\(?(-?\d+)\)?/.exec(
    option.replace(/\s/g, ""),
  );
  return !!match && Number(match[1]) >= 1 && Number(match[1]) < 10;
};
// Calculated independently from the givens, including every numerical question.
const expected: Record<number, number> = {
  2: 4,
  3: 5,
  4: 1,
  5: 4,
  6: rounded(63479, 2),
  7: rounded(2476, 2),
  9: 280,
  10: 2805.3,
  11: 4.17e5,
  12: 0.03025,
  13: 8.063e-5,
  17: rounded(0.008025, 3),
  18: 9.5,
  19: 6,
  20: 35,
  21: 2.73e3 + 5.92e3,
  22: 7.02e4 + 2.17e5,
  23: 9.45e6 - 3.24e5,
  24: 3e5 * 4.9e2,
  25: 5.9e5 / 2e2,
  26: 3.58e-3 + 9.24e-3,
  27: 2.3e-5 - 4.6e-6,
  28: 7.5e-3 * 5e-6,
  29: 3050 * 1e12,
  30: Math.round(38279 / 100) * 100,
  31: Math.round(38279 / 1000) * 1000,
  32: rounded(3200 + 54300, 3),
  33: rounded(54300 - 3200, 3),
  34: Math.sqrt(350 ** 2 - 210 ** 2),
  35: 0.5 * 280 * 210,
  36: 29400 * 45,
  37: 800 * 9.4e-3,
  38: 1.08e2 / 2.4e4,
  39: 9.6e-2 / 1.5e-5,
  40: rounded(305.72, 3),
  41: rounded(4 * 3.142 * (12742 / 2) ** 2, 4),
  42: 1.496e8 - 5.791e7,
  43: rounded(4.495e9 - 5.791e7, 4),
  44: Math.ceil(2000 / 32),
  45: rounded((305 * 183 * 56) / 1000, 4),
  46: Math.round(32e6 / 330803),
  47: rounded(6185 * 0.3 * 0.3, 3),
  48: Math.round(6185 * 1.75),
  49: 2.5e2 + 1.35e4,
  50: 5.74e-3 + 3.4e-6,
  51: rounded(1.75e2 - 4.2e-1, 3),
  52: rounded(3.7e-2 - 4.3e-5, 3),
  53: rounded(3200 ** 2 + 54300 ** 2, 3),
  54: rounded(3200 ** -2 + 54300 ** -3, 3),
  55: rounded(6950 * 29, 3),
  56: rounded(0.297 * 0.21 * 70, 3),
};
const standardQuestions = new Set([
  9,
  10,
  12,
  20,
  ...Array.from({ length: 19 }, (_, i) => 21 + i).filter(
    (n) => ![30, 31, 36].includes(n),
  ),
  41,
  42,
  43,
  45,
  47,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
]);

describe("Form 3 Chapter 2 standard form", () => {
  it.each(langs)(
    "preserves the %s bank and delivers visuals and feedback through the registry",
    (lang) => {
      const bank = getChapterQuizQuestions("math", "Form 3", "Chapter 2", lang);
      expect(bank).toEqual(banks[lang]);
      expect(bank).toHaveLength(57);
      expect(bank.filter((q) => q.visual)).toHaveLength(36);
      expect(bank.map((q) => q.id)).toEqual(
        Array.from({ length: 57 }, (_, i) => `math-f3-c2-${lang}-q${i + 1}`),
      );
      expect(
        ["Easy", "Medium", "Hard"].map(
          (d) => bank.filter((q) => q.difficulty === d).length,
        ),
      ).toEqual([20, 20, 17]);
      for (const q of bank) {
        expect([q.subjectId, q.form, q.chapter, q.lang]).toEqual([
          "math",
          "Form 3",
          "Chapter 2",
          lang,
        ]);
        expect(new Set(q.options).size).toBe(4);
        expect(q.mathNotation).toBe("indices");
        expect(q.explanation?.length).toBeGreaterThan(25);
      }
    },
  );

  it.each(langs)(
    "has exactly one valid numerical answer for each %s calculation",
    (lang) => {
      for (const [number, value] of Object.entries(expected)) {
        const q = banks[lang][Number(number) - 1];
        const matches = q.options.flatMap((option, index) => {
          const validFormat =
            !standardQuestions.has(Number(number)) || isStandard(option);
          const close =
            Math.abs(numeric(option) - value) <= Math.abs(value) * 1e-10;
          return validFormat && close ? [index] : [];
        });
        expect(matches, `${q.id}: ${q.question}`).toEqual([q.answerIndex]);
      }
      expect(banks[lang][50].answerIndex).toBe(1);
      expect(banks[lang][47].options[1]).toBe("RM10 823");
      expect(banks[lang][43].options.every((o) => !o.includes("("))).toBe(true);
      expect(
        banks[lang][53].options.every(
          (o) => !o.includes("dominated") && !o.includes("anggaran"),
        ),
      ).toBe(true);
    },
  );

  it("shares identical givens and preserves the corrected key through shuffling", () => {
    expect(Object.keys(MATH_F3_C2_QUIZ_VISUALS)).toHaveLength(36);
    banks.bm.forEach((bm, i) => {
      const dlp = banks.dlp[i];
      expect(bm.visual).toBe(dlp.visual);
      expect(bm.answerIndex).toBe(dlp.answerIndex);
      expect(bm.difficulty).toBe(dlp.difficulty);
      for (const q of [bm, dlp]) {
        const shuffled = shuffleQuestionOptions(q, () => 0.25);
        expect(shuffled.options[shuffled.answerIndex]).toBe(
          q.options[q.answerIndex],
        );
        expect(shuffled.visual).toBe(q.visual);
        expect(shuffled.explanation).toBe(q.explanation);
        expect(shuffled.mathNotation).toBe("indices");
      }
    });
  });

  it.each(langs)(
    "renders all %s visuals with accessible givens and proper powers",
    (lang) => {
      for (const q of banks[lang]) {
        const texts = [q.question, ...q.options, q.explanation!];
        for (const text of texts) {
          const html = renderToStaticMarkup(
            createElement(MathIndexText, { text, lang }),
          );
          expect(html).not.toContain("^");
          if (text.includes("^")) expect(html).toContain("<sup");
        }
        if (!q.visual) continue;
        const html = renderToStaticMarkup(
          createElement(MathQuestionVisual, { visual: q.visual, lang }),
        );
        expect(html).toContain(`data-math-visual="${q.visual.kind}"`);
        expect(html).toContain('role="img"');
        expect(html).toContain('aria-label="');
        expect(describeMathQuestionVisual(q.visual, lang)).toContain(
          q.visual.title[lang],
        );
        expect(html).not.toMatch(/NaN|Infinity|<script/);
      }
    },
  );

  it("places decimal digits correctly while preserving zeros uniformly", () => {
    expect(placeValueCells("60 007").map((c) => c.exponent)).toEqual([
      4, 3, 2, 1, 0,
    ]);
    expect(placeValueCells("0.005020")).toEqual([
      { digit: "0", exponent: 0 },
      { digit: ".", exponent: undefined },
      { digit: "0", exponent: -1 },
      { digit: "0", exponent: -2 },
      { digit: "5", exponent: -3 },
      { digit: "0", exponent: -4 },
      { digit: "2", exponent: -5 },
      { digit: "0", exponent: -6 },
    ]);
  });

  it.each(langs)(
    "keeps solutions out of the %s visual and accessibility text",
    (lang) => {
      for (const [number, forbidden] of [
        [34, "2.8"],
        [41, "5.101"],
        [42, "9.169"],
        [43, "4.437"],
        [44, "63"],
        [45, "3.126"],
        [47, "5.57"],
        [51, "174.58"],
        [56, "4.37"],
      ] as const) {
        const visual = banks[lang][number - 1].visual!;
        const html = renderToStaticMarkup(
          createElement(MathQuestionVisual, { visual, lang }),
        );
        expect(describeMathQuestionVisual(visual, lang)).not.toContain(
          forbidden,
        );
        // Geometry coordinates may incidentally contain these digits; visible text cannot.
        const visibleText = html.replace(/<[^>]+>/g, "");
        expect(visibleText).not.toContain(forbidden);
      }
    },
  );

  it("draws distance bars to one common scale, without inflating Mercury", () => {
    const visual = MATH_F3_C2_QUIZ_VISUALS[43]!;
    if (visual.kind !== "distance-comparison")
      throw new Error("Expected distance comparison");
    const html = renderToStaticMarkup(
      createElement(MathQuestionVisual, { visual, lang: "dlp" }),
    );
    const expectedWidth = (280 * 5.791e7) / 4.495e9;
    expect(html).toContain(`width="${expectedWidth}"`);
    expect(html).toContain('width="280"');
  });

  it.each(["bm", "en"] as const)(
    "corrects the %s lesson's rounding and zero-index examples",
    (lang) => {
      const content = mathF3C2InteractiveContent[lang];
      expect(content.subtopics[0].guided.question).not.toMatch(
        /How many|Berapa/,
      );
      expect(content.subtopics[0].guided.answer).toContain("8800");
      expect(content.subtopics[1].mistake.wrong).not.toContain("5.1 × 10⁰");
      expect(content.subtopics[1].mistake.right).toContain("5.1×10⁰ = 5.1");
      expect(content.challenge.answer).toContain("1.0×10²");
    },
  );
});

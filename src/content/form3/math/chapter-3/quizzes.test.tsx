import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { MathIndexText } from "@/components/quiz/MathIndexText";
import { getChapterQuizQuestions } from "@/content/registry";
import { shuffleQuestionOptions } from "@/features/quiz/difficulty/quizDifficulty";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { mathF3C3QuizzesBM } from "./quizzes-bm";
import { mathF3C3QuizzesDLP } from "./quizzes-dlp";
import { MATH_F3_C3_QUIZ_VISUALS } from "./quiz-visuals";
const banks = { bm: mathF3C3QuizzesBM, dlp: mathF3C3QuizzesDLP };
const langs = ["bm", "dlp"] as const;
const money = (n: number) => Math.round((n + Number.EPSILON * n) * 100) / 100;
const numeric = (s: string) =>
  Number(s.replace(/(?:RM|SGD|\s)/g, "").match(/^\d+(?:\.\d+)?/)?.[0]);
// Independent calculations from the givens, rather than a copied answer key.
const calculations: Record<number, number> = {
  5: 4000 * 0.02,
  14: 20 - 7,
  15: Math.max(800 * 0.05, 50),
  21: 5000 * 0.03 * 2,
  22: (10000 * 0.04 * 6) / 12,
  23: money(10000 * (1 + 0.05 / 12) ** 12),
  25: ((20500 - 20000) / 20000) * 100,
  26: (456000 / 600000) * 100,
  27: 20000 / 2,
  28: money(20000 / 10626),
  30: 10000 * (1 + 0.04 * 7),
  31: money(12800 / 84),
  32: (10000 * 0.06) / 12,
  33: (9900 * 0.06) / 12,
  34: 10000 + 50 - 150,
  35: 218.75 * 8 * 12,
  36: 21000 / (1 + 0.05 * 8),
  37: 320 * 5 * 12,
  38: 19200 - 16000,
  39: (3200 / (16000 * 5)) * 100,
  41: 1300000 - 486000 - 600000 * 0.1 - 450000 - 15000 - 15000 - 18000,
  42: 256000 + 200000,
  43: 6000 * 1 * 0.06,
  44: 6000 / 2,
  45: 6000 + 3000,
  46: money(5000 * (1 + 0.04 / 4) ** (4 * 3) - 5000),
  47: 15000 * 0.05 * 5,
  49: 0,
  50: (250 + 50) * 0.01,
  54: 600000 - 30000 - 475000 + 60000,
  55: Math.round((155000 / 300000) * 1000) / 10,
};

describe("Form 3 Chapter 3 consumer mathematics quizzes", () => {
  it.each(langs)(
    "registers the complete %s bank with self-contained questions",
    (lang) => {
      const bank = getChapterQuizQuestions("math", "Form 3", "Chapter 3", lang);
      expect(bank).toEqual(banks[lang]);
      expect(bank).toHaveLength(55);
      expect(bank.filter((q) => q.visual)).toHaveLength(36);
      expect(bank.map((q) => q.id)).toEqual(
        Array.from({ length: 55 }, (_, i) => `math-f3-c3-${lang}-q${i + 1}`),
      );
      expect(
        ["Easy", "Medium", "Hard"].map(
          (d) => bank.filter((q) => q.difficulty === d).length,
        ),
      ).toEqual([20, 20, 15]);
      for (const q of bank) {
        expect(q.question).not.toMatch(/previous question|soalan sebelumnya/i);
        expect(new Set(q.options).size).toBe(4);
        expect(q.explanation?.length).toBeGreaterThan(25);
        expect(q.mathNotation).toBe("indices");
        expect([q.subjectId, q.form, q.chapter, q.lang]).toEqual([
          "math",
          "Form 3",
          "Chapter 3",
          lang,
        ]);
      }
    },
  );
  it.each(langs)(
    "has exactly one correct answer for every %s numerical question",
    (lang) => {
      for (const [n, expected] of Object.entries(calculations)) {
        const q = banks[lang][Number(n) - 1];
        expect(
          q.options.flatMap((o, i) =>
            Math.abs(numeric(o) - expected) < 1e-8 ? [i] : [],
          ),
          q.id,
        ).toEqual([q.answerIndex]);
      }
      const q = banks[lang][47];
      const total = 15000 * (1 + 0.05 * 5);
      const monthly = total / 60;
      const matches = q.options.flatMap((o, i) => {
        const amounts = [...o.matchAll(/RM([\d .]+)/g)].map((m) =>
          Number(m[1].replace(/ /g, "")),
        );
        return amounts[0] === total && amounts[1] === monthly ? [i] : [];
      });
      expect(matches).toEqual([q.answerIndex]);
      expect(banks[lang][45].options[banks[lang][45].answerIndex]).toBe("RM634.13");
    },
  );
  it.each(langs)(
    "uses explicit assumptions and factual comparisons in %s",
    (lang) => {
      expect(banks[lang][14].question).toContain("800");
      expect(banks[lang][23].question).toContain("10 000");
      expect(banks[lang][28].question).not.toMatch(/wiser|bijak/i);
      expect(banks[lang][52].question).toContain("2");
      const compMonthly = 10000 * (1 + 0.05 / 12) ** 12;
      const compQuarterly = 10000 * (1 + 0.05 / 4) ** 4;
      expect(compMonthly).toBeGreaterThan(compQuarterly);
      expect(banks[lang][23].options[banks[lang][23].answerIndex]).toContain(
        "B",
      );
      expect(20000 / 10626).toBeLessThan(20000 / 10000);
      expect(banks[lang][28].options[0]).toBe("Puan Esther");
      expect(303 * 3.3).toBeGreaterThan(799);
      expect(banks[lang][50].options[0]).toBe(
        lang === "bm" ? "Syarikat V" : "Company V",
      );
      expect(banks[lang][39].options[0]).toBe("Bank A");
    },
  );
  it("shares bilingual visual givens and keeps metadata intact when shuffled", () => {
    expect(Object.keys(MATH_F3_C3_QUIZ_VISUALS)).toHaveLength(36);
    banks.bm.forEach((q, i) => {
      expect(q.visual).toBe(banks.dlp[i].visual);
      expect(q.difficulty).toBe(banks.dlp[i].difficulty);
      expect(q.answerIndex).toBe(banks.dlp[i].answerIndex);
      for (const item of [q, banks.dlp[i]]) {
        const shuffled = shuffleQuestionOptions(item, () => 0.25);
        expect(shuffled.options[shuffled.answerIndex]).toBe(
          item.options[item.answerIndex],
        );
        expect(shuffled.visual).toBe(item.visual);
        expect(shuffled.explanation).toBe(item.explanation);
      }
    });
  });
  it.each(langs)(
    "renders accessible %s diagrams and proper compound powers",
    (lang) => {
      for (const q of banks[lang]) {
        for (const text of [q.question, ...q.options, q.explanation!]) {
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
        expect(html).toContain('data-math-visual="finance-model"');
        expect(html).toContain('role="img"');
        expect(html).toContain('aria-label="');
        expect(html).not.toMatch(/NaN|Infinity|<script/);
        expect(describeMathQuestionVisual(q.visual, lang)).toContain(
          q.visual.title[lang],
        );
      }
    },
  );
  it.each(langs)(
    "does not reveal computed %s answers in diagrams or accessibility text",
    (lang) => {
      for (const [n, answer] of [
        [5, "RM80"],
        [15, "RM40"],
        [23, "10 511"],
        [31, "152.38"],
        [34, "9 900"],
        [41, "256 000"],
        [44, "3 000"],
        [46, "634.13"],
        [51, "999.90"],
        [54, "155 000"],
        [55, "51.7"],
      ] as const) {
        const visual = banks[lang][n - 1].visual!;
        expect(describeMathQuestionVisual(visual, lang)).not.toContain(answer);
        expect(
          renderToStaticMarkup(
            createElement(MathQuestionVisual, { visual, lang }),
          ),
        ).not.toContain(answer);
      }
    },
  );
});

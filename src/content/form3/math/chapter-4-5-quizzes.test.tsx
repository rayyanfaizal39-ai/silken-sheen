import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import {
  mathF3C4QuestionBankBM,
  mathF3C4QuizzesBM,
} from "./chapter-4/quizzes-bm";
import {
  mathF3C4QuestionBankDLP,
  mathF3C4QuizzesDLP,
} from "./chapter-4/quizzes-dlp";
import {
  mathF3C5QuestionBankBM,
  mathF3C5QuizzesBM,
} from "./chapter-5/quizzes-bm";
import {
  mathF3C5QuestionBankDLP,
  mathF3C5QuizzesDLP,
} from "./chapter-5/quizzes-dlp";
const sources = {
  4: { bm: mathF3C4QuestionBankBM, dlp: mathF3C4QuestionBankDLP },
  5: { bm: mathF3C5QuestionBankBM, dlp: mathF3C5QuestionBankDLP },
};
const runtime = {
  4: { bm: mathF3C4QuizzesBM, dlp: mathF3C4QuizzesDLP },
  5: { bm: mathF3C5QuizzesBM, dlp: mathF3C5QuizzesDLP },
};
const langs = ["bm", "dlp"] as const;
const rad = (d: number) => (d * Math.PI) / 180;
const rounded = (n: number, places: number) => Number(n.toFixed(places));
function numberFromOption(option: string) {
  const expression = option
    .replace(/\s/g, "")
    .replace(
      /(?:cm²|m²|m³|cm|km\/j|km\/h|km|m|jam|hours|khemah|tents|°|′|RM)$/,
      "",
    )
    .replace(/^RM/, "");
  const terms = expression.split(":");
  const term = (text: string): number => {
    const numeric = text
      .replace(/(\d)(√)/g, "$1*$2")
      .replace(/√(\d+)/g, "Math.sqrt($1)");
    if (!/^[\d.*/()+\-Mathsqrt]+$/.test(numeric))
      throw new Error(`Unsupported numeric option: ${text}`);
    return Function(`"use strict"; return (${numeric})`)() as number;
  };
  return terms.length === 2
    ? term(terms[0]) / term(terms[1])
    : term(expression);
}
const c4: Record<number, number> = {
  8: 2 / 4,
  9: 9 / 3,
  10: 2 * 10,
  11: (3 * 300000) / 100000,
  13: 1000 * 100,
  14: 2 / 4,
  16: 6 / (1 / 3),
  18: (5 * 400) / 100,
  21: 2 / 1,
  22: 0.5 / 1,
  23: Math.hypot(1.5, 2) / 5,
  24: 2 * 10,
  25: 24 / 4,
  26: 8 / 4,
  27: (2.5 * 400000) / 100000,
  28: 18 / 3,
  29: ((7 * 400) / 100) * ((5 * 400) / 100),
  30: (360 / 36) * (10 / 5),
  31: 2 * (350 / 50 + 520 / 50),
  32: ((3 * 2000) / 100) * ((6 * 2000) / 100),
  34: 4 * 50,
  35: (200 * 100000) / 2000000,
  37: ((2 * 400) / 100) * ((3 * 400) / 100),
  38: 8 * 12 * 3.75,
  39: 1 / 1.5,
  40: 1 / 0.5,
  41: 1 / Math.sqrt(112.5 / 4.5),
  42: 6 * 3,
  43: (5.4 * 150) / 1.5,
  45: rounded((22 / 7) * ((2 * 2000) / 100) ** 2, 1),
  46: ((7 * 1000) / 100) * ((12 * 1000) / 100),
  47: 1 / 500,
  48: (70 * 120) / 2 / (5 * 4),
  49: 100 * 7 * (1 - 0.25),
  50: 3 / 6,
  51: (3 * 5) / (6 * 10),
  55: (8 * 12) / (((2 * 400) / 100) * ((3 * 400) / 100)),
};
const c5: Record<number, number> = {
  6: Math.sin(rad(30)),
  7: Math.cos(rad(60)),
  8: Math.tan(rad(45)),
  9: Math.sin(rad(45)),
  10: Math.tan(rad(30)),
  11: Math.tan(rad(60)),
  12: 60,
  13: 43 + 30 / 60,
  17: Math.hypot(15, 8),
  18: 15 / Math.hypot(15, 8),
  19: 0.6 / 0.8,
  21: (20 * 3) / 5,
  22: Math.sqrt(20 ** 2 - 12 ** 2),
  23: Math.sqrt(20 ** 2 - 12 ** 2) / 20,
  24: 3 / 8 / (3 / Math.sqrt(55)),
  25: Math.sin(rad(45)) + Math.cos(rad(45)),
  26: 3 * Math.cos(rad(30)) - 2 * Math.sin(rad(60)),
  27: 2 * Math.tan(rad(45)) - 2 * Math.cos(rad(60)),
  28: 2 * Math.sin(rad(60)) * (4 * Math.cos(rad(30))) - 4 * Math.tan(rad(60)),
  30: rounded((Math.asin(0.8377) * 180) / Math.PI, 1),
  31: rounded((Math.acos(0.7021) * 180) / Math.PI, 1),
  32: rounded(2.5 / Math.sin(rad(50)), 2),
  33: Math.hypot(5, 8),
  34: 4 / Math.sqrt(89),
  35: rounded((Math.atan(4 / Math.sqrt(89)) * 180) / Math.PI, 2),
  36: rounded(1.4 / 2 / Math.sin(rad(38 / 2)), 2),
  37: rounded(145 * Math.cos(rad(55)), 1),
  38: rounded(200 * Math.tan(rad(41)), 1),
  39: 10 * Math.cos(rad(60)),
  40: rounded(Math.hypot(15, Math.sqrt(75)), 2),
  41: 7 / 12,
  42: Math.hypot(12, 7),
  43: 90,
  44: 2 * 6,
  45: 16 / 2,
  46: 16 - 16 / 4,
  47: 8 * Math.sin(rad(60)) - 3 * Math.tan(rad(60)),
  48: Math.tan(rad(30)) * 2 * Math.cos(rad(30)) + 6 * Math.sin(rad(30)),
  49:
    8 * Math.cos(rad(45)) * Math.sin(rad(60)) +
    8 * Math.sin(rad(45)) * Math.cos(rad(30)),
  50: 18 / (3 / 4),
  51: 21 / Math.sqrt(1 - (3 / 5) ** 2),
  52: Math.round((Math.asin(3 / 5) * 180) / Math.PI),
  53: rounded((Math.atan(3 / 4) * 180) / Math.PI, 2),
  54: 5 / Math.hypot(12, 5),
};
for (const chapter of [4, 5] as const)
  describe(`Form 3 Maths Chapter ${chapter}`, () => {
    it.each(langs)(
      "preserves IDs, complete explanations and two balanced %s sets",
      (lang) => {
        const bank = sources[chapter][lang],
          selected = runtime[chapter][lang];
        expect(bank).toHaveLength(55);
        expect(selected).toHaveLength(50);
        bank.forEach((q, i) => {
          expect(q.id).toBe(`math-f3-c${chapter}-${lang}-q${i + 1}`);
          expect(new Set(q.options).size).toBe(4);
          expect(q.explanation!.length).toBeGreaterThanOrEqual(10);
          expect(q.question + " " + q.options.join(" ")).not.toMatch(
            /previous question|from the above|soalan di atas|bergantung konfigurasi|depends on|anggaran berdasarkan|estimate based|perlu nilai|requires the/iu,
          );
          expect(q.options.join(" ")).not.toMatch(
            /≈|pengiraan|calculation|gunakan|\(√|\(2x|->/iu,
          );
          expect(q.answerIndex).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex).toBeLessThan(4);
        });
        for (const set of ["A", "B"]) {
          const qs = selected.filter((q) => q.set === set);
          expect(qs).toHaveLength(25);
          expect(
            ["Easy", "Medium", "Hard"].map(
              (d) => qs.filter((q) => q.difficulty === d).length,
            ),
          ).toEqual([10, 10, 5]);
        }
      },
    );
    it.each(langs)(
      "independently recomputes each numeric %s answer and checks distractors",
      (lang) => {
        for (const [number, expected] of Object.entries(
          chapter === 4 ? c4 : c5,
        )) {
          const q = sources[chapter][lang][Number(number) - 1];
          expect(
            numberFromOption(q.options[q.answerIndex]),
            `Q${number}: ${q.question}`,
          ).toBeCloseTo(expected, 8);
          expect(
            q.options.filter(
              (o) => Math.abs(numberFromOption(o) - expected) < 1e-8,
            ),
            `Q${number} must have exactly one numeric answer`,
          ).toHaveLength(1);
        }
        if (chapter === 4) {
          const q33 = sources[4][lang][32];
          expect(q33.options[q33.answerIndex]).toMatch(/^144/);
          const q36 = sources[4][lang][35];
          expect(q36.options[q36.answerIndex]).toMatch(/^2.5/);
          expect(sources[4][lang][43].options[0]).toContain("B");
          expect(6 / (0.5 * 0.5)).toBeLessThan(2.8 / (0.3 * 0.3));
          expect(12000 / 400).toBeGreaterThan(29.7);
          expect(12000 / 500).toBeLessThan(29.7);
          expect(7000 / 500).toBeLessThan(21);
        } else expect(sources[5][lang][28].options[0]).toBe("30° 12'");
      },
    );
    it("uses exactly the same geometry object and mathematical options in both languages", () => {
      sources[chapter].bm.forEach((q, i) => {
        expect(q.visual).toBe(sources[chapter].dlp[i].visual);
      });
      const bm = runtime[chapter].bm,
        dlp = runtime[chapter].dlp;
      expect(bm.map((q) => [q.id.split("-q")[1], q.set])).toEqual(
        dlp.map((q) => [q.id.split("-q")[1], q.set]),
      );
    });
    it.each(langs)(
      "renders accessible, finite %s diagrams with no missing assets",
      (lang) => {
        const qs = sources[chapter][lang].filter((q) => q.visual);
        expect(qs.length).toBeGreaterThanOrEqual(30);
        for (const q of qs) {
          const html = renderToStaticMarkup(
            createElement(MathQuestionVisual, { visual: q.visual!, lang }),
          );
          expect(html).toContain('data-math-visual="geometry-diagram"');
          expect(html).toContain('role="img"');
          expect(html).toContain("aria-label=");
          expect(html).not.toMatch(
            /NaN|Infinity|\[object Object\]|<img|<script/,
          );
          expect(describeMathQuestionVisual(q.visual!, lang)).toContain(
            lang === "bm" ? "tidak mengikut skala" : "not to scale",
          );
        }
      },
    );
  });
describe("Geometry regression checks", () => {
  it("keeps the equal-grid object and drawing similar in both dimensions", () => {
    const visual = mathF3C4QuestionBankBM[13].visual!;
    if (visual.kind !== "geometry-diagram")
      throw new Error("Grid diagram missing");
    const [drawing, object] = visual.panels.map((p) => p.grid!);
    expect(drawing.columns / object.columns).toBe(1 / 2);
    expect(drawing.rows / object.rows).toBe(1 / 2);
    expect(drawing.step).toBe(object.step);
  });
  it("hexagon angle is a right angle and PS joins opposite vertices", () => {
    const p = [1, 0],
      s = [-1, 0],
      t = [-0.5, -Math.sqrt(3) / 2];
    const dot = (p[0] - t[0]) * (s[0] - t[0]) + (p[1] - t[1]) * (s[1] - t[1]);
    expect(dot).toBeCloseTo(0, 12);
    expect(Math.hypot(p[0] - s[0], p[1] - s[1]) * 6).toBe(12);
  });
  it("does not print derived answers before the student answers", () => {
    for (const [chapter, number, answer] of [
      [4, 41, "0.2"],
      [4, 45, "5 028.6"],
      [5, 17, "17 cm"],
      [5, 33, "√89"],
      [5, 35, "22.98"],
      [5, 37, "83.2"],
      [5, 43, "90°"],
      [5, 44, "12 cm"],
      [5, 51, "26.25"],
    ] as const) {
      for (const lang of langs) {
        const visual = sources[chapter][lang][number - 1].visual!;
        expect(describeMathQuestionVisual(visual, lang)).not.toContain(answer);
        expect(
          renderToStaticMarkup(
            createElement(MathQuestionVisual, { visual, lang }),
          ),
        ).not.toContain(answer);
      }
    }
  });
});

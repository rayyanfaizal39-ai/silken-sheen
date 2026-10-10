import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathIndexText } from "@/components/quiz/MathIndexText";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { shuffleQuestionOptions } from "@/features/quiz/difficulty/quizDifficulty";
import { getChapterQuizQuestions } from "@/content/registry";
import { mathF3C1QuestionBankBM as mathF3C1QuizzesBM } from "./quizzes-bm";
import { mathF3C1QuestionBankDLP as mathF3C1QuizzesDLP } from "./quizzes-dlp";
import { MATH_F3_C1_QUIZ_VISUALS } from "./quiz-visuals";

const banks = { bm: mathF3C1QuizzesBM, dlp: mathF3C1QuizzesDLP };
const languages = ["bm", "dlp"] as const;
const renderText = (text: string, lang: "bm" | "dlp") =>
  renderToStaticMarkup(createElement(MathIndexText, { text, lang }));

describe("Form 3 Chapter 1 indices", () => {
  it.each(languages)("delivers enriched %s questions through the actual regular-quiz registry", (lang) => {
    const resolved = getChapterQuizQuestions("math", "Form 3", "Chapter 1", lang);
    expect(resolved).toHaveLength(50);
    expect(resolved.filter((q) => q.visual).length).toBeGreaterThan(15);
    for (const q of resolved) {
      expect(q.mathNotation).toBe("indices");
      expect(q.explanation).toBeTruthy();
    }
  });
  it.each(languages)(
    "preserves the %s question IDs, count, scope and difficulty mix",
    (lang) => {
      const bank = banks[lang];
      expect(bank).toHaveLength(58);
      expect(bank.map((q) => q.id)).toEqual(
        Array.from({ length: 58 }, (_, i) => `math-f3-c1-${lang}-q${i + 1}`),
      );
      expect(bank.filter((q) => q.difficulty === "Easy")).toHaveLength(20);
      expect(bank.filter((q) => q.difficulty === "Medium")).toHaveLength(20);
      expect(bank.filter((q) => q.difficulty === "Hard")).toHaveLength(18);
      for (const q of bank) {
        expect([q.subjectId, q.form, q.chapter, q.lang]).toEqual([
          "math",
          "Form 3",
          "Chapter 1",
          lang,
        ]);
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(q.explanation?.length).toBeGreaterThan(10);
        expect(q.mathNotation).toBe("indices");
      }
    },
  );

  it("shares the same givens between BM and DLP and keeps visuals through option shuffling", () => {
    expect(Object.keys(MATH_F3_C1_QUIZ_VISUALS)).toHaveLength(24);
    for (let i = 0; i < 58; i += 1) {
      const bm = banks.bm[i],
        dlp = banks.dlp[i];
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
    }
  });

  it.each(languages)(
    "repairs the four mathematically incorrect hard answers in %s",
    (lang) => {
      const bank = banks[lang];
      const correct = (number: number) =>
        bank[number - 1].options[bank[number - 1].answerIndex];
      expect(correct(42)).toBe("x = 4, y = 3");
      // Substitute every offered pair into BOTH original equations.
      const satisfies = bank[41].options.map((option) => {
        const x = Number(/x\s*=\s*(-?[\d.]+)/.exec(option)![1]);
        const y = Number(/y\s*=\s*(-?[\d.]+)/.exec(option)![1]);
        return 16 * 4 ** x === 16 ** y && 3 * 9 ** x === 27 ** y;
      });
      expect(satisfies.filter(Boolean)).toHaveLength(1);
      expect(satisfies[bank[41].answerIndex]).toBe(true);

      expect(correct(43)).toBe("c^(-1/3) d^3 e^(-2/3)");
      const [c, d, e] = [8, 2, 27];
      const cubeExpression =
        Math.cbrt(c ** 2 * d ** 3 * e) * c ** -1 * d ** 2 * e ** -1;
      expect(cubeExpression).toBeCloseTo(
        c ** (-1 / 3) * d ** 3 * e ** (-2 / 3),
      );

      expect(correct(44)).toBe("m^2 n^(1/2)");
      const [m, n] = [4, 9];
      const rootQuotient =
        (Math.sqrt(m * n) * Math.sqrt(m * n ** 3)) /
        (m ** -1 * Math.sqrt(n ** 3));
      expect(rootQuotient).toBeCloseTo(m ** 2 * Math.sqrt(n));
      expect(rootQuotient).not.toBeCloseTo(m * n);

      expect(correct(47)).toBe("20x^(7/2) y^(1/2) z^2");
      const [x, y, z] = [4, 9, 2];
      const radicalProduct =
        Math.sqrt(25 * x ** 3 * y * z ** 2) * 4 * x ** 2 * z;
      expect(radicalProduct).toBeCloseTo(
        20 * x ** (7 / 2) * y ** (1 / 2) * z ** 2,
      );
      expect(radicalProduct).not.toBeCloseTo(
        20 * x ** (7 / 2) * y ** (1 / 2) * z ** 3,
      );
    },
  );

  it("removes the duplicate-value negative-base distractor and the misleading proof/Pascal wording", () => {
    expect(banks.dlp[3].options).not.toContain("-2^3");
    expect(banks.dlp[51].question).not.toContain("proving a^0");
    expect(banks.bm[51].question).not.toContain("pembuktian a^0");
    for (const lang of languages) {
      expect(banks[lang][55].question).not.toMatch(/Pascal/i);
      expect(banks[lang][52].options[banks[lang][52].answerIndex]).toBe(
        "p = 4, q = 3, r = -3",
      );
    }
  });

  it.each(languages)(
    "renders every %s question, option and worked solution with real superscripts",
    (lang) => {
      for (const q of banks[lang]) {
        for (const text of [q.question, ...q.options, q.explanation!]) {
          const html = renderText(text, lang);
          expect(html, text).not.toContain("^");
          if (text.includes("^")) expect(html, text).toContain("<sup");
        }
      }
      expect(renderText("3^(x+2(x+5)-4)", lang)).toContain("x+2(x+5)-4</sup>");
      expect(renderText("a^(m/n)", lang)).toContain("m/n</sup>");
      expect(renderText("x + y", lang)).not.toContain("<sup");
      expect(renderText("<img onerror=alert(1)> 2^3", lang)).not.toContain(
        "<img",
      );
    },
  );
});

describe("Indices visuals", () => {
  it.each(languages)(
    "renders all 24 %s visuals with readable givens and no image requests",
    (lang) => {
      for (const [number, visual] of Object.entries(MATH_F3_C1_QUIZ_VISUALS)) {
        const html = renderToStaticMarkup(
          createElement(MathQuestionVisual, { visual: visual!, lang }),
        );
        expect(html, number).toContain(`data-math-visual="${visual!.kind}"`);
        expect(html).toContain('role="img"');
        expect(html).toContain('aria-label="');
        expect(html).not.toMatch(/<img|<canvas|<animate|animation|transition/);
        expect(describeMathQuestionVisual(visual!, lang)).not.toMatch(
          /undefined|NaN/,
        );
      }
    },
  );

  it("draws the exact given factors without cancelling or calculating them", () => {
    for (const q of banks.dlp) {
      const v = q.visual;
      if (v?.kind !== "factor-groups") continue;
      expect(
        v.rows.every((row) => row.groups.every((group) => group.length > 0)),
      ).toBe(true);
      if (v.rows[0].operation === "quotient")
        expect(v.rows[0].groups).toHaveLength(2);
    }
    const division = MATH_F3_C1_QUIZ_VISUALS[12]!;
    expect(division.kind).toBe("factor-groups");
    if (division.kind === "factor-groups") {
      expect(division.rows[0].groups.map((g) => g.length)).toEqual([5, 2]);
    }
    const comparison = MATH_F3_C1_QUIZ_VISUALS[38]!;
    if (comparison.kind === "factor-groups") {
      expect(
        comparison.rows.map((row) => row.groups.map((g) => g.length)),
      ).toEqual([
        [2, 2, 2],
        [3, 3],
      ]);
    }
  });

  it("keeps unknown indices and base/index names hidden until the answer explanation", () => {
    const notation = describeMathQuestionVisual(
      MATH_F3_C1_QUIZ_VISUALS[1]!,
      "dlp",
    );
    expect(notation).not.toMatch(/base|power of|index is/i);
    const missing = describeMathQuestionVisual(
      MATH_F3_C1_QUIZ_VISUALS[53]!,
      "dlp",
    );
    expect(missing).toContain("5^p");
    expect(missing).toContain("(1/5)^q");
    expect(missing).not.toContain("p = 4");
    expect(missing).not.toContain("q = 3");
    expect(missing).not.toContain("r = -3");
  });

  it("makes the area grid and cube match their original numbers without printing a solution", () => {
    const area = MATH_F3_C1_QUIZ_VISUALS[34]!;
    expect(area.kind).toBe("fraction-area");
    const html = renderToStaticMarkup(
      createElement(MathQuestionVisual, { visual: area, lang: "dlp" }),
    );
    expect(html.match(/<rect /g)).toHaveLength(16);
    expect(html.match(/fill="#a78bfa"/g)).toHaveLength(4);
    expect(html).not.toContain("1/4");
    const cube = MATH_F3_C1_QUIZ_VISUALS[15]!;
    if (cube.kind === "unit-cube")
      expect(cube.divisions ** 3).toBe(cube.volume);
    expect(describeMathQuestionVisual(cube, "dlp")).toContain(
      "Edge length is labelled x",
    );
  });
});

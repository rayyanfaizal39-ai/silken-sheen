import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C5_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED = [7, 10, 10] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

function bank(objective: Objective, lang: Lang, chapter = "Chapter 5") {
  return resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter,
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}

const keyOf = (visual: unknown) => Object.entries(V).find(([, value]) => value === visual)?.[0];

describe("Form 1 Mathematics Chapter 5 selective algebra visuals", () => {
  it("retains all 180 questions, valid options and exactly 7/10/10 visuals per language", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, setIndex) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        expect(questions.filter((q) => q.visual), objective).toHaveLength(EXPECTED[setIndex]);
        questions.forEach((q, index) => {
          expect(q.id).toBe(`math-f1-c5-${objective}-${lang}-q${index + 1}`);
          expect(q.options).toHaveLength(4);
          expect(q.answerIndex).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex).toBeLessThan(4);
          expect(q.explanation?.trim()).toBeTruthy();
          if (q.visual) expect(keyOf(q.visual), q.id).toBeDefined();
        });
      });
    }
  });

  it("maps precisely the same visuals to corresponding BM/DLP questions", () => {
    const selected = (lang: Lang) => OBJECTIVES.map((objective) =>
      bank(objective, lang).map((q) => keyOf(q.visual) ?? null),
    );
    expect(selected("bm")).toEqual(selected("dlp"));
    expect(new Set(selected("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(27);
    for (const lang of LANGS) {
      expect(bank("objective-1", lang, "Chapter 4").some((q) => keyOf(q.visual))).toBe(false);
    }
  });

  it("draws exactly the given unknown jars and loose sweets, not a solved expression", () => {
    for (const key of ["sweetsPlusSix", "sweetsMinusOne", "threeJars"] as const) {
      const visual = V[key];
      expect(visual.kind).toBe("algebra-jars");
      if (visual.kind !== "algebra-jars") continue;
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang: "dlp" }));
      expect((html.match(/<rect\s/g) ?? []).length).toBe(visual.jars * 2);
      expect((html.match(/<circle\s/g) ?? []).length).toBe(visual.loose?.count ?? 0);
      expect(html).toContain('role="img"');
      expect(html).toContain(">n</text>");
    }
  });

  it("keeps all signed algebra tile groups separate and does not combine coefficients", () => {
    for (const [key, visual] of Object.entries(V)) {
      if (visual.kind !== "algebra-tiles") continue;
      expect(visual.groups.length).toBeGreaterThanOrEqual(2);
      expect(visual.groups[0].operation).toBe("start");
      for (const group of visual.groups) {
        expect(Number.isInteger(group.count) && group.count > 0 && group.count <= 9, key).toBe(true);
      }
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang: "dlp" }));
      expect((html.match(/data-algebra-tile=/g) ?? []).length, key).toBe(
        visual.groups.reduce((total, group) => total + group.count, 0),
      );
      expect(describeMathQuestionVisual(visual, "dlp")).toContain(visual.title.dlp);
    }
    expect(describeMathQuestionVisual(V.threeXPlusTwoX, "dlp")).not.toContain("5 × x");
    expect(describeMathQuestionVisual(V.nineYMinusFourY, "dlp")).not.toContain("5 × y");
  });

  it("shows raw factors for indices and labels only the given rectangle/cube dimensions", () => {
    for (const [key, visual] of Object.entries(V)) {
      if (visual.kind !== "factor-groups") continue;
      expect(visual.rows).toHaveLength(1);
      expect(visual.rows[0].groups.length).toBeGreaterThanOrEqual(2);
      for (const group of visual.rows[0].groups) expect(group.length).toBeGreaterThan(0);
      expect(describeMathQuestionVisual(visual, "dlp")).toContain(visual.title.dlp);
    }
    expect(V.rectangleThreeXByTwoX.kind).toBe("geometry-diagram");
    expect(V.cubeSideA.kind).toBe("geometry-diagram");
    for (const visual of [V.rectangleThreeXByTwoX, V.cubeSideA]) {
      const description = describeMathQuestionVisual(visual, "dlp");
      expect(description).toContain("not evaluated");
      expect(description).not.toContain("6x²");
      expect(description).not.toContain("a³");
    }
  });

  it("renders every diagram as a static, accessible visual in both languages", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain('role="img"');
        expect(html).toContain(visual.title[lang]);
        expect(html).not.toMatch(/<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
        if (visual.kind === "geometry-diagram" || visual.kind === "algebra-jars") {
          expect(html).toContain("<svg");
        }
      }
    }
  });

  it("preserves representative original correct answers", () => {
    const check = (objective: Objective, starts: string, expected: string) => {
      const q = bank(objective, "dlp").find((entry) => entry.question.startsWith(starts));
      expect(q, starts).toBeDefined();
      expect(q!.options[q!.answerIndex]).toBe(expected);
    };
    check("objective-1", "What is the expression for 'three jars", "3n");
    check("objective-2", "Simplify 3x + 2x.", "5x");
    check("objective-2", "Simplify 9y − 4y.", "5y");
    check("objective-3", "Simplify a² × a³.", "a⁵");
    check("objective-3", "A rectangle has a length of 3x", "6x²");
    check("objective-3", "A cube-shaped box has sides of length a", "a³");
  });
});

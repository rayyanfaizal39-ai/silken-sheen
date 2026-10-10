import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C3_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED = [7, 7, 10] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

function bank(objective: Objective, lang: Lang) {
  return resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter: "Chapter 3",
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}
const nameOf = (value: unknown) => Object.entries(V).find(([, visual]) => visual === value)?.[0];

describe("Form 1 Mathematics Chapter 3 selective quiz diagrams", () => {
  it("preserves 30 questions per set and adds only 7/7/10 diagrams in both languages", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, index) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        expect(questions.filter((question) => question.visual), objective).toHaveLength(EXPECTED[index]);
        questions.forEach((question, n) => {
          expect(question.id).toBe(`math-f1-c3-${objective}-${lang}-q${n + 1}`);
          expect(question.options).toHaveLength(4);
          expect(question.answerIndex).toBeGreaterThanOrEqual(0);
          expect(question.answerIndex).toBeLessThan(4);
          if (question.visual) expect(nameOf(question.visual), question.id).toBeDefined();
        });
      });
    }
  });

  it("uses matching BM/DLP diagrams and does not affect the Chapter 2 banks", () => {
    const selected = (lang: Lang) => OBJECTIVES.map((objective) =>
      bank(objective, lang).map((question) => nameOf(question.visual) ?? null),
    );
    expect(selected("bm")).toEqual(selected("dlp"));
    expect(new Set(selected("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    for (const lang of LANGS) {
      const other = resolveMathObjectiveQuestions({
        form: "Form 1", chapter: "Chapter 2",
        mathObjectiveId: "objective-1", lang, scienceLang: lang,
      }).questions;
      expect(other.some((question) => nameOf(question.visual) !== undefined)).toBe(false);
    }
  });

  it("gives only supplied dimensions and leaves unknowns for the student to solve", () => {
    const unchangedGivens = [
      ["squareArea144", "144 cm²", "side 12 cm"],
      ["cubeVolume512", "512 cm³", "side 8 cm"],
      ["squareSide9", "9 cm", "area 81 cm²"],
      ["cubeSide6", "6 cm", "volume 216 cm³"],
      ["squareGarden169", "169 m²", "side 13 m"],
      ["cubeUnitBlocks64", "64 cm³", "side 4 cm"],
      ["equalAreaRectangleSquare", "18 cm", "side 12 cm"],
    ] as const;
    for (const [key, given, forbiddenAnswer] of unchangedGivens) {
      const visual = V[key];
      const description = describeMathQuestionVisual(visual, "dlp");
      expect(description, key).toContain(given);
      expect(description, key).not.toContain(forbiddenAnswer);
    }
    const comparison = V.equalAreaRectangleSquare;
    expect(comparison.kind).toBe("geometry-model");
    if (comparison.kind === "geometry-model") {
      expect(comparison.models.map((model) => model.shape)).toEqual(["rectangle", "square"]);
      expect(comparison.models[0].width).toBe("18 cm");
      expect(comparison.models[0].height).toBe("8 cm");
      expect(comparison.models[1].side).toBe("? cm");
    }
  });

  it("shows exact repetition counts and correct squares in the fractional area diagrams", () => {
    for (const value of Object.values(V)) {
      if (value.kind === "factor-groups") {
        expect(value.rows).toHaveLength(1);
        expect(value.rows[0].groups.every((group) => group.length === 1)).toBe(true);
        expect(value.rows[0].groups.length).toBeGreaterThanOrEqual(2);
      }
      if (value.kind === "fraction-area") {
        expect(value.shadedRows).toBe(value.shadedColumns);
        expect(value.shadedRows).toBeLessThan(value.divisions);
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual: value, lang: "dlp" }));
        expect([...html.matchAll(/<rect\s/g)]).toHaveLength(value.divisions ** 2);
      }
      if (value.kind === "geometry-model") {
        expect(value.models.length).toBeGreaterThanOrEqual(1);
        for (const model of value.models) {
          if (model.shape === "rectangle") {
            expect(model.width).toBeDefined();
            expect(model.height).toBeDefined();
          } else {
            expect(model.side).toBeDefined();
          }
        }
      }
    }
  });

  it("renders all diagrams as accessible and static visuals in BM and DLP", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain('role="img"');
        // Factor groups use accessible CSS item cards; not every visual is an SVG.
        expect(html).toMatch(/<(?:svg|div|table)\b/);
        expect(html).not.toMatch(/<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("retains representative answer keys without altering original questions or options", () => {
    const check = (objective: Objective, lang: Lang, starts: string, expected: string) => {
      const question = bank(objective, lang).find((item) => item.question.startsWith(starts));
      expect(question, starts).toBeDefined();
      expect(question!.options[question!.answerIndex]).toBe(expected);
    };
    check("objective-1", "dlp", "What is 4²?", "16");
    check("objective-2", "dlp", "The area of a square is 49 cm²", "7 cm");
    check("objective-2", "dlp", "The volume of a cube is 216 cm³", "6 cm");
    check("objective-3", "dlp", "The area of a square is 144 cm²", "12 cm");
    check("objective-3", "dlp", "64 small cubes with 1 cm edges", "4 cm");
    check("objective-3", "dlp", "Aiman wrote (−6)²", "36");
  });
});

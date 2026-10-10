import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C4_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED = [6, 10, 16] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

function bank(objective: Objective, lang: Lang) {
  return resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter: "Chapter 4",
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}

const keyOf = (visual: unknown) =>
  Object.entries(V).find(([, value]) => value === visual)?.[0];

describe("Form 1 Mathematics Chapter 4 selective visual questions", () => {
  it("preserves 30 questions in each BM and DLP bank, with 6/10/16 chosen diagrams", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, setIndex) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        expect(questions.filter((question) => question.visual), objective).toHaveLength(EXPECTED[setIndex]);
        questions.forEach((question, index) => {
          expect(question.id).toBe(`math-f1-c4-${objective}-${lang}-q${index + 1}`);
          expect(question.options).toHaveLength(4);
          expect(question.answerIndex).toBeGreaterThanOrEqual(0);
          expect(question.answerIndex).toBeLessThan(4);
          expect(question.explanation?.trim()).toBeTruthy();
          if (question.visual) expect(keyOf(question.visual), question.id).toBeDefined();
        });
      });
    }
  });

  it("uses precisely the same diagrams in corresponding BM and DLP question positions", () => {
    const selected = (lang: Lang) => OBJECTIVES.map((objective) =>
      bank(objective, lang).map((question) => keyOf(question.visual) ?? null),
    );
    expect(selected("bm")).toEqual(selected("dlp"));
    expect(new Set(selected("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(32);
  });

  it("uses positive whole equal-part counts and never pre-calculates an unknown share", () => {
    for (const [name, visual] of Object.entries(V)) {
      if (visual.kind !== "ratio-bars") continue;
      expect(visual.rows.length, name).toBeGreaterThanOrEqual(2);
      const parts = visual.rows.map((row) => row.parts);
      expect(parts.every((number) => Number.isInteger(number) && number > 0 && number <= 20)).toBe(true);
      const readable = describeMathQuestionVisual(visual, "dlp");
      for (const row of visual.rows) expect(readable).toContain(`${row.parts} equal parts`);
      expect(readable).toContain(visual.title.dlp);
    }
    // These are explicitly marked unknown, not the answers 15, 50, or 40.
    expect(describeMathQuestionVisual(V.a5b3a25, "dlp")).toContain("B = ?");
    expect(describeMathQuestionVisual(V.abc2_3_5Total100, "dlp")).not.toContain("50");
    expect(describeMathQuestionVisual(V.abc2_3_4Total90, "dlp")).not.toContain("40");
  });

  it("keeps unknown prices and measurements blank rather than displaying the solution", () => {
    const keys = [
      "carFuel60km5L", "flour3kgRm12", "car180km3h", "sugar4kg24Rm",
      "fiveBooks35Rm", "recipeFourToSix", "mapScale5000", "map5cm25km",
      "cakes8To14", "mapScale250000", "car8L96km",
    ] as const;
    for (const key of keys) {
      const visual = V[key];
      expect(visual.kind, key).toBe("value-pairs");
      if (visual.kind === "value-pairs") {
        expect(visual.rows).toHaveLength(2);
        expect(visual.rows[1].left === "?" || visual.rows[1].right === "?", key).toBe(true);
        for (const lang of LANGS) {
          expect(describeMathQuestionVisual(visual, lang)).toContain("?");
        }
      }
    }
    expect(V.carComparison.kind).toBe("value-pairs");
    expect(V.groceryPriceComparison.kind).toBe("value-pairs");
  });

  it("uses 10 cells to model percentages, not an answer count", () => {
    for (const [visual, expected, totalLabel] of [
      [V.boys60PctTotal40, 6, "40 students"],
      [V.pass70PctFail21, 7, "21 students"],
    ] as const) {
      expect(visual.kind).toBe("percentage-strip");
      if (visual.kind !== "percentage-strip") continue;
      expect(visual.shaded).toBe(expected);
      expect(describeMathQuestionVisual(visual, "dlp")).toContain(totalLabel);
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang: "dlp" }));
      expect(html.match(/aspect-\[2\/3\]/g)).toHaveLength(10);
      expect(html).not.toContain("<canvas");
    }
  });

  it("renders all visual types as accessible, static, bilingual displays", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain(visual.title[lang]);
        expect(html).not.toMatch(/<canvas|<animate|animation:|transition:/);
        if (visual.kind === "value-pairs") {
          expect(html).toContain("<table");
          expect(html).toContain("<th");
        } else {
          expect(html).toContain('role="img"');
        }
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("preserves representative answer keys from the original questions", () => {
    const check = (objective: Objective, prefix: string, answer: string) => {
      const question = bank(objective, "dlp").find((item) => item.question.startsWith(prefix));
      expect(question, prefix).toBeDefined();
      expect(question!.options[question!.answerIndex]).toBe(answer);
    };
    check("objective-1", "Class 1A has 12 boys", "4 : 5");
    check("objective-1", "3 kg of flour costs RM12", "RM4");
    check("objective-2", "A car travels 180 km in 3 hours", "60 km/h");
    check("objective-2", "A : B : C = 2 : 3 : 5", "50");
    check("objective-3", "If 60% of students are boys", "16");
    check("objective-3", "Car A: 240 km in 3 h", "Car A");
    check("objective-3", "A car uses 8 litres of petrol", "180 km");
  });
});

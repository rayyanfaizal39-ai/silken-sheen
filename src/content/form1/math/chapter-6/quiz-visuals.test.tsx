import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C6_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED_COUNTS = [7, 11, 13] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

const bank = (objective: Objective, lang: Lang, chapter = "Chapter 6") =>
  resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter,
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
const visualName = (visual: unknown) =>
  Object.entries(V).find(([, value]) => value === visual)?.[0];

describe("Form 1 Mathematics Chapter 6 — selective equation illustrations", () => {
  it("preserves all 180 question IDs, answers and the intended 7/11/13 visuals per language", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, index) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        expect(questions.filter((question) => question.visual), objective)
          .toHaveLength(EXPECTED_COUNTS[index]);
        questions.forEach((question, n) => {
          expect(question.id).toBe(`math-f1-c6-${objective}-${lang}-q${n + 1}`);
          expect(question.options).toHaveLength(4);
          expect(question.answerIndex).toBeGreaterThanOrEqual(0);
          expect(question.answerIndex).toBeLessThan(4);
          expect(question.explanation?.trim()).toBeTruthy();
          if (question.visual) expect(visualName(question.visual), question.id).toBeDefined();
        });
      });
    }
  });

  it("keeps BM and DLP visual placement strictly matched, with no Chapter 5 spillover", () => {
    const names = (lang: Lang) =>
      OBJECTIVES.map((objective) =>
        bank(objective, lang).map((question) => visualName(question.visual) ?? null),
      );
    expect(names("bm")).toEqual(names("dlp"));
    const usedKeys = new Set(names("bm").flat().filter(Boolean));
    expect(usedKeys).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(30);
    expect(names("bm").flat().filter(Boolean)).toHaveLength(31);
    for (const lang of LANGS) {
      const other = bank("objective-2", lang, "Chapter 5");
      expect(other.some((question) => visualName(question.visual) !== undefined)).toBe(false);
    }
  });

  it("never solves the unknown while displaying the original equations", () => {
    const original = V.systemTenTwo;
    expect(original.kind).toBe("equation-balance");
    if (original.kind === "equation-balance") {
      expect(original.rows).toEqual([
        { left: "x + y", right: "10", label: { bm: "Persamaan 1", dlp: "Equation 1" } },
        { left: "x − y", right: "2", label: { bm: "Persamaan 2", dlp: "Equation 2" } },
      ]);
    }
    const description = describeMathQuestionVisual(original, "dlp");
    expect(description).toContain("x + y = 10");
    expect(description).toContain("x − y = 2");
    expect(description).not.toContain("x = 6");
    expect(description).not.toContain("y = 4");
    for (const visual of Object.values(V)) {
      if (visual.kind === "equation-balance") {
        expect(visual.rows.length).toBeGreaterThanOrEqual(1);
        expect(visual.rows.length).toBeLessThanOrEqual(2);
        for (const row of visual.rows) {
          expect(row.left.trim()).toBeTruthy();
          expect(row.right.trim()).toBeTruthy();
        }
      }
    }
  });

  it("draws every supplied story item exactly once per given item, with no calculated prices", () => {
    for (const visual of Object.values(V)) {
      if (visual.kind !== "equation-story") continue;
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        const rendered = (html.match(/data-equation-item=/g) ?? []).length;
        const expected = visual.scenes.reduce(
          (sum, scene) => sum + scene.items.reduce((n, item) => n + item.count, 0), 0,
        );
        expect(rendered, visual.title.dlp).toBe(expected);
        expect(html).toContain('role="img"');
      }
    }
    const fruit = V.fruitPurchases;
    expect(fruit.kind).toBe("equation-story");
    if (fruit.kind === "equation-story") {
      expect(fruit.scenes.map((scene) => scene.items.map((item) => item.count)))
        .toEqual([[2, 1], [1, 1]]);
      expect(fruit.scenes.map((scene) => scene.result)).toEqual(["RM13", "RM8"]);
    }
    expect(describeMathQuestionVisual(V.fruitPurchases, "dlp")).not.toContain("RM5");
  });

  it("renders all visual types as readable, accessible, responsive and static", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain('role="img"');
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
        expect(html).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        if (visual.kind === "equation-balance" || visual.kind === "geometry-diagram") {
          expect(html).toContain("<svg");
        }
      }
    }
  });

  it("keeps representative original correct answers unchanged", () => {
    const check = (objective: Objective, text: string, answer: string) => {
      const q = bank(objective, "dlp").find((item) => item.question.startsWith(text));
      expect(q, text).toBeDefined();
      expect(q!.options[q!.answerIndex]).toBe(answer);
    };
    check("objective-1", "A pen costs RMx", "4x = 12");
    check("objective-1", "Solve x − 6 = 2", "x = 8");
    check("objective-2", "Solve the equation x + 7 = 11", "x = 4");
    check("objective-2", "Solve 3(x − 2) = 12", "x = 6");
    check("objective-3", "2 kg of apples and 1 kg of oranges", "RM5");
    check("objective-3", "A rectangular garden has a perimeter of 28", "2x + 2y = 28");
    check("objective-3", "Given 2x + 2y = 28 and x − y = 2", "x = 8, y = 6");
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C7_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED = [9, 8, 16] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];

const bank = (objective: Objective, lang: Lang, chapter = "Chapter 7") =>
  resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter,
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;

const keyOf = (visual: unknown) =>
  Object.entries(V).find(([, value]) => value === visual)?.[0];

describe("Form 1 Mathematics Chapter 7 selective inequality number-line diagrams", () => {
  it("retains 30 valid questions in each of six original banks, with exactly 9/8/16 diagrams", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, setIndex) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        expect(questions.filter((q) => q.visual)).toHaveLength(EXPECTED[setIndex]);
        questions.forEach((q, index) => {
          expect(q.id).toBe(`math-f1-c7-${objective}-${lang}-q${index + 1}`);
          expect(q.options).toHaveLength(4);
          expect(q.answerIndex).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex).toBeLessThan(4);
          expect(q.explanation?.trim()).toBeTruthy();
          if (q.visual) expect(keyOf(q.visual), q.id).toBeDefined();
        });
      });
    }
  });

  it("shares the same selected visuals between matching BM and DLP questions", () => {
    const selected = (lang: Lang) =>
      OBJECTIVES.map((objective) => bank(objective, lang).map((q) => keyOf(q.visual) ?? null));
    expect(selected("bm")).toEqual(selected("dlp"));
    expect(selected("bm").flat().filter(Boolean)).toHaveLength(33);
    expect(new Set(selected("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(32);
    for (const lang of LANGS) {
      const other = bank("objective-2", lang, "Chapter 6");
      expect(other.some((q) => keyOf(q.visual) !== undefined)).toBe(false);
    }
  });

  it("illustrates all four number-line candidates in the original A–D order without selecting one", () => {
    const cases = [
      {
        visual: V.optionsLessMinus2, objective: "objective-1", question: 25,
        expected: [
          "Open circle at −2, arrow pointing right",
          "Open circle at −2, arrow pointing left",
          "Closed circle at −2, arrow pointing left",
          "Closed circle at −2, arrow pointing right",
        ],
      },
      {
        visual: V.optionsGte1, objective: "objective-1", question: 26,
        expected: [
          "Open circle at 1, arrow pointing right",
          "Open circle at 1, arrow pointing left",
          "Closed circle at 1, arrow pointing left",
          "Closed circle at 1, arrow pointing right",
        ],
      },
      {
        visual: V.optionsAtNine, objective: "objective-2", question: 25,
        expected: [
          "Open circle at 9, arrow pointing right",
          "Closed circle at 9, arrow pointing right",
          "Open circle at 9, arrow pointing left",
          "Closed circle at 9, arrow pointing left",
        ],
      },
    ] as const;
    for (const { visual, objective, question, expected } of cases) {
      expect(visual.kind).toBe("inequality-options");
      expect(bank(objective, "dlp")[question - 1].options).toEqual(expected);
      if (visual.kind !== "inequality-options") continue;
      expect(visual.options).toHaveLength(4);
      const descriptions = visual.options.map((option) =>
        `${option.inclusive ? "Closed" : "Open"} circle at ${String(visual.boundary).replace("-", "−")}, arrow pointing ${option.direction}`,
      );
      expect(descriptions).toEqual(expected);
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect((html.match(/data-option-line=/g) ?? [])).toHaveLength(4);
        for (const option of ["A", "B", "C", "D"]) {
          expect(html).toContain(`data-option-line="${option}"`);
        }
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("leaves problem-formulation reference axes neutral, without a solution direction", () => {
    for (const visual of Object.values(V)) {
      if (visual.kind !== "inequality-reference-axis") continue;
      expect(visual.markers.length).toBeGreaterThan(0);
      expect(visual.step).toBeGreaterThan(0);
      for (const marker of visual.markers) {
        expect(marker).toBeGreaterThanOrEqual(visual.min);
        expect(marker).toBeLessThanOrEqual(visual.max);
      }
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang: "dlp" }));
      expect(html).not.toContain("<circle");
      expect(html).toContain("<svg");
      expect(describeMathQuestionVisual(visual, "dlp")).toContain("no arrows or endpoints");
    }
  });

  it("never pre-computes the overlap of simultaneously supplied inequalities", () => {
    const example = V.betweenGivenMinusOneThree;
    expect(example.kind).toBe("inequality-tracks");
    if (example.kind !== "inequality-tracks") return;
    expect(example.tracks).toEqual([
      { label: "x > −1", lower: -1 },
      { label: "x ≤ 3", upper: 3, includeUpper: true },
    ]);
    const desc = describeMathQuestionVisual(example, "dlp");
    expect(desc).toContain("x > −1");
    expect(desc).toContain("x ≤ 3");
    expect(desc).not.toContain("−1 < x ≤ 3");
    const html = renderToStaticMarkup(createElement(MathQuestionVisual, {
      visual: example, lang: "dlp",
    }));
    expect((html.match(/data-condition-track=/g) ?? [])).toHaveLength(2);
    expect(html).not.toContain("overlap-region");
    for (const visual of Object.values(V)) {
      if (visual.kind !== "inequality-tracks") continue;
      expect(visual.tracks.length).toBeGreaterThanOrEqual(1);
      for (const track of visual.tracks) {
        expect(track.lower !== undefined || track.upper !== undefined).toBe(true);
        if (track.lower !== undefined && track.upper !== undefined) {
          expect(track.lower).toBeLessThan(track.upper);
        }
      }
    }
  });

  it("renders all visuals as static accessible bilingual SVGs without animations", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain('role="img"');
        expect(html).toContain("<svg");
        expect(html).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("preserves representative original answer keys", () => {
    const check = (objective: Objective, qNo: number, answer: string) => {
      const q = bank(objective, "dlp")[qNo - 1];
      expect(q.options[q.answerIndex], q.id).toBe(answer);
    };
    check("objective-1", 25, "Open circle at −2, arrow pointing left");
    check("objective-1", 26, "Closed circle at 1, arrow pointing right");
    check("objective-2", 25, "Closed circle at 9, arrow pointing right");
    check("objective-3", 24, "2 and 4");
    check("objective-3", 30, "5");
  });
});

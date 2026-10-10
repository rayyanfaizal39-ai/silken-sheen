import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C9_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
type Lang = typeof LANGS[number];
type Objective = typeof OBJECTIVES[number];
const bank = (objective: Objective, lang: Lang) =>
  resolveMathObjectiveQuestions({
    form: "Form 1", chapter: "Chapter 9", mathObjectiveId: objective,
    lang, scienceLang: lang,
  }).questions;
const keyOf = (visual: unknown) => Object.entries(V).find(([, v]) => v === visual)?.[0];

describe("Form 1 Mathematics Chapter 9 — polygon quiz diagrams", () => {
  it("keeps 30 original questions per set with 30/29/29 visual placements per language", () => {
    for (const lang of LANGS) OBJECTIVES.forEach((objective, index) => {
      const qs = bank(objective, lang);
      expect(qs, objective + "/" + lang).toHaveLength(30);
      expect(qs.filter(q => q.visual)).toHaveLength([30, 29, 29][index]);
      qs.forEach((q, i) => {
        expect(q.id).toBe("math-f1-c9-" + objective + "-" + lang + "-q" + (i + 1));
        expect(q.options).toHaveLength(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(q.explanation?.trim()).toBeTruthy();
        if (q.visual) expect(keyOf(q.visual), q.id).toBeDefined();
      });
    });
  });

  it("uses exactly the same diagrams at the same BM/DLP question positions", () => {
    const names = (lang: Lang) =>
      OBJECTIVES.map(o => bank(o, lang).map(q => keyOf(q.visual) ?? null));
    expect(names("bm")).toEqual(names("dlp"));
    expect(names("bm").flat().filter(Boolean)).toHaveLength(88);
    expect(new Set(names("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(88);
  });

  it("does not reveal a polygon's requested diagonal count or symmetry axes", () => {
    for (const key of ["quadDiagonals", "pentagonDiagonals", "hexagonDiagonals",
      "triangleSymmetry", "squareSymmetry", "isoscelesSymmetry",
      "parallelogramSymmetry", "rhombusSymmetry", "kiteSymmetry",
      "rectangleSymmetry", "sixFoldShape"] as const) {
      const panel = V[key].panels[0];
      expect(panel.paths).toHaveLength(1);
      expect(panel.paths?.[0].closed).toBe(true);
      expect(panel.grid).toBeUndefined();
      expect(panel.labels.some(l => String(l.text).includes("axis"))).toBe(false);
    }
    // The polygon with 35 diagonals isn't drawn, because depicting its correct
    // number of sides would give away the hard calculation.
    expect(bank("objective-3", "dlp")[2].visual).toBeUndefined();
  });

  it("keeps the right angle at the correct vertex and makes the obtuse vertex obtuse", () => {
    const right = V.rightShape.panels[0].paths![0].points;
    const [a, b, c] = right;
    const dot = (b[0] - a[0]) * (c[0] - a[0]) +
      (b[1] - a[1]) * (c[1] - a[1]);
    expect(dot).toBe(0);
    const obtuse = V.obtuseTriangle.panels[0].paths![0].points;
    const [p, q, r] = obtuse;
    const obDot = (q[0] - p[0]) * (r[0] - p[0]) +
      (q[1] - p[1]) * (r[1] - p[1]);
    expect(obDot).toBeLessThan(0);
  });

  it("draws triangle extensions and rectangle diagonal without giving computed results", () => {
    for (const key of ["isoExtension115", "ext50_70", "exterior140_80",
      "extAtA", "exteriorB115", "extAlgebra110"] as const) {
      expect(V[key].panels[0].paths?.some(path => path.dashed)).toBe(true);
    }
    expect(V.rectangleAC.panels[0].paths).toHaveLength(2);
    const diagonal = V.rectangleAC.panels[0].paths![1].points;
    const vertices = V.rectangleAC.panels[0].paths![0].points;
    expect(diagonal).toEqual([vertices[0], vertices[2]]);
    expect(describeMathQuestionVisual(V.rectangleAC, "dlp")).toContain("35°");
    expect(describeMathQuestionVisual(V.rectangleAC, "dlp")).not.toContain("55°");
    expect(describeMathQuestionVisual(V.triangle55_75, "dlp")).not.toContain("50°");
    expect(describeMathQuestionVisual(V.isoApex50, "dlp")).not.toContain("65°");
  });

  it("renders responsive, accessible, static vector figures in both languages", () => {
    for (const visual of Object.values(V)) {
      expect(visual.kind).toBe("geometry-diagram");
      for (const panel of visual.panels) {
        expect(panel.paths?.length).toBeGreaterThanOrEqual(1);
        for (const path of panel.paths ?? [])
          for (const [x, y] of path.points) {
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(300);
            expect(y).toBeGreaterThanOrEqual(0);
            expect(y).toBeLessThanOrEqual(240);
          }
      }
      for (const lang of LANGS) {
        const markup = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(markup).toContain('role="img"');
        expect(markup).toContain('data-math-visual="geometry-diagram"');
        expect(markup).toContain("<svg");
        expect(markup).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("preserves representative answer keys across Foundation, Practice and Challenge", () => {
    const check = (objective: Objective, n: number, answer: string) => {
      const q = bank(objective, "dlp")[n - 1];
      expect(q.options[q.answerIndex], q.id).toBe(answer);
    };
    check("objective-1", 2, "3");
    check("objective-1", 19, "3");
    check("objective-2", 3, "50°");
    check("objective-2", 9, "65°");
    check("objective-2", 30, "55°");
    check("objective-3", 4, "50°");
    check("objective-3", 14, "Regular hexagon");
    check("objective-3", 27, "Trapezium");
  });
});

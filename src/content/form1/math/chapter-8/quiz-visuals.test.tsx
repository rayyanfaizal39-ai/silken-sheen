import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C8_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const EXPECTED = [5, 25, 23] as const;
type Objective = (typeof OBJECTIVES)[number];
type Lang = (typeof LANGS)[number];
const bank = (objective: Objective, lang: Lang, chapter = "Chapter 8") =>
  resolveMathObjectiveQuestions({
    form: "Form 1", chapter, mathObjectiveId: objective, lang, scienceLang: lang,
  }).questions;
const keyOf = (visual: unknown) => Object.entries(V).find(([, v]) => v === visual)?.[0];

describe("Mathematics Form 1 Chapter 8 — selective lines-and-angles visuals", () => {
  it("keeps all six question banks at 30 items and adds exactly 5/25/23 visuals per language", () => {
    for (const lang of LANGS) OBJECTIVES.forEach((objective, setIndex) => {
      const questions = bank(objective, lang);
      expect(questions, `${objective}/${lang}`).toHaveLength(30);
      expect(questions.filter((question) => Boolean(question.visual)))
        .toHaveLength(EXPECTED[setIndex]);
      questions.forEach((question, n) => {
        expect(question.id).toBe(`math-f1-c8-${objective}-${lang}-q${n + 1}`);
        expect(question.options).toHaveLength(4);
        expect(question.answerIndex).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex).toBeLessThan(4);
        expect(question.explanation?.trim()).toBeTruthy();
        if (question.visual) expect(keyOf(question.visual), question.id).toBeDefined();
      });
    });
  });

  it("reuses every visual in matching BM/DLP questions without other chapters bleeding in", () => {
    const names = (lang: Lang) => OBJECTIVES.map((objective) =>
      bank(objective, lang).map((question) => keyOf(question.visual) ?? null),
    );
    expect(names("bm")).toEqual(names("dlp"));
    expect(names("bm").flat().filter(Boolean)).toHaveLength(53);
    expect(new Set(names("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(53);
    for (const lang of LANGS) {
      expect(bank("objective-2", lang, "Chapter 7")
        .some((question) => keyOf(question.visual) !== undefined)).toBe(false);
    }
  });

  it("shows true 145°, 250° reflex and 55° angles using matching ray/arc geometry", () => {
    for (const [key, degree] of [
      ["angle145", 145], ["angle250", 250], ["angle55", 55],
    ] as const) {
      const visual = V[key];
      const panel = visual.panels[0];
      expect(panel.arcs).toHaveLength(1);
      expect(panel.arcs![0].start).toBe(0);
      expect(panel.arcs![0].end).toBe(degree);
      expect(panel.arcs![0].centre).toEqual([145, 124]);
      const [x, y] = panel.paths![1].points[1];
      expect(x).toBeCloseTo(145 + 110 * Math.cos(degree * Math.PI / 180), 6);
      expect(y).toBeCloseTo(124 + 110 * Math.sin(degree * Math.PI / 180), 6);
      expect(panel.labels.map((v) => v.text)).toContain(degree + "°");
    }
    expect(V.angle250.panels[0].arcs![0].end).toBeGreaterThan(180);
  });

  it("places labels in distinct sectors for straight, vertically opposite and parallel angles", () => {
    const hasAll = (key: keyof typeof V, labels: string[]) => {
      const panels = V[key].panels;
      const texts = panels.flatMap((p) => p.labels.map((label) =>
        typeof label.text === "string" ? label.text : label.text.dlp));
      for (const label of labels) expect(texts, key).toContain(label);
    };
    hasAll("straight75", ["75°", "x"]);
    hasAll("straight40_60", ["40°", "60°", "y"]);
    hasAll("fullTurn90_120_80", ["90°", "120°", "80°", "z"]);
    hasAll("opposite3a120", ["3a", "120°"]);
    hasAll("cointerior6x130", ["(6x − 10)°", "130°"]);
    hasAll("corresponding125", ["125°", "x"]);
    hasAll("crossingABCD", ["3x", "2x", "A", "B", "C", "D", "O"]);
    hasAll("parallelAcute72", ["72°", "?"]);
    hasAll("parallel85", ["85°", "?"]);
    // In the obtuse-from-acute questions, the unknown belongs to a separate
    // adjacent angle, not another corresponding acute angle.
    const acutePanels = [V.parallelAcute72.panels[0], V.parallel85.panels[0]];
    for (const panel of acutePanels) {
      expect(panel.labels[0].at[1]).toBe(panel.labels[1].at[1]);
      expect(panel.labels[0].at[0]).toBeLessThan(panel.labels[1].at[0]);
    }
  });

  it("draws elevation upwards and depression downwards relative to horizontal", () => {
    const up = V.elevation35.panels[0];
    const down = V.depression40.panels[0];
    const line = up.paths![1].points;
    expect(line[1][1]).toBeLessThan(line[0][1]);
    const descendingSightLine = down.paths![2].points;
    expect(descendingSightLine[1][1]).toBeGreaterThan(descendingSightLine[0][1]);
    const farAndNear = V.carCloser.panels[0].paths!;
    expect(farAndNear).toHaveLength(5);
    expect(farAndNear[2].points[1][0]).toBeGreaterThan(farAndNear[3].points[1][0]);
    expect(V.elevationCompare.panels[0].labels.map((label) => label.text))
      .toEqual(expect.arrayContaining(["25°", "40°", "A", "B", "C"]));
  });

  it("does not write solved values in panels for unknown angles", () => {
    const cases = [
      [V.straight75, "105°"], [V.fullTurn90_120_80, "70°"],
      [V.conjugate135, "225°"], [V.opposite3a120, "a = 40°"],
      [V.correspondingExpr, "x = 25"], [V.cointerior3x2x, "x = 30"],
      [V.pointFourExpressions, "a = 32"], [V.crossingABCD, "72°"],
    ] as const;
    for (const [visual, forbidden] of cases) {
      const description = describeMathQuestionVisual(visual, "dlp");
      expect(description).not.toContain(forbidden);
      expect(description).toContain(visual.title.dlp);
      expect(description).toContain("Diagram not to scale");
    }
  });

  it("renders all visuals as lightweight accessible static SVGs with consistent BM/DLP data", () => {
    for (const visual of Object.values(V)) {
      expect(visual.kind).toBe("geometry-diagram");
      expect(visual.panels.length).toBeGreaterThanOrEqual(1);
      for (const panel of visual.panels) {
        expect(panel.paths?.length).toBeGreaterThanOrEqual(2);
        for (const path of panel.paths ?? [])
          for (const [x, y] of path.points) {
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(300);
            expect(y).toBeGreaterThanOrEqual(0);
            expect(y).toBeLessThanOrEqual(240);
          }
      }
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain('data-math-visual="geometry-diagram"');
        expect(html).toContain('role="img"');
        expect(html).toContain("<svg");
        expect(html).toContain(visual.title[lang]);
        expect(html).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("retains representative original answer keys across all three difficulty sets", () => {
    const check = (objective: Objective, number: number, answer: string) => {
      const q = bank(objective, "dlp")[number - 1];
      expect(q.options[q.answerIndex], q.id).toBe(answer);
    };
    check("objective-1", 5, "Obtuse");
    check("objective-1", 6, "Reflex");
    check("objective-1", 18, "180°");
    check("objective-2", 1, "x = 105°");
    check("objective-2", 3, "z = 70°");
    check("objective-2", 14, "110°");
    check("objective-2", 16, "105°");
    check("objective-3", 1, "x = 25, angle = 65°");
    check("objective-3", 12, "125°");
    check("objective-3", 13, "108°");
    check("objective-3", 29, "72°");
  });
});

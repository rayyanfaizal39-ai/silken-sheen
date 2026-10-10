import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C10_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
type Lang = typeof LANGS[number];
type Objective = typeof OBJECTIVES[number];
const bank = (objective: Objective, lang: Lang) =>
  resolveMathObjectiveQuestions({
    form: "Form 1", chapter: "Chapter 10", mathObjectiveId: objective,
    lang, scienceLang: lang,
  }).questions;
const keyOf = (visual: unknown) => Object.entries(V).find(([, v]) => v === visual)?.[0];

describe("Form 1 Mathematics Chapter 10 — dimensional perimeter and area visuals", () => {
  it("preserves all six banks of 30 with 23/28/30 illustration placements", () => {
    for (const lang of LANGS) OBJECTIVES.forEach((objective, index) => {
      const questions = bank(objective, lang);
      expect(questions).toHaveLength(30);
      expect(questions.filter(q => q.visual)).toHaveLength([23, 28, 30][index]);
      questions.forEach((q, j) => {
        expect(q.id).toBe("math-f1-c10-" + objective + "-" + lang + "-q" + (j + 1));
        expect(q.options).toHaveLength(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(q.explanation?.trim()).toBeTruthy();
        if (q.visual) expect(keyOf(q.visual)).toBeDefined();
      });
    });
  });

  it("has matching BM and DLP question visuals without adding diagrams to Chapter 11", () => {
    const names = (lang: Lang) =>
      OBJECTIVES.map(o => bank(o, lang).map(q => keyOf(q.visual) ?? null));
    expect(names("bm")).toEqual(names("dlp"));
    expect(names("bm").flat().filter(Boolean)).toHaveLength(81);
    expect(new Set(names("bm").flat().filter(Boolean))).toEqual(new Set(Object.keys(V)));
    expect(Object.keys(V)).toHaveLength(81);
  });

  it("draws both perpendicular heights and slant lengths in their true roles", () => {
    const para = V.practiceParaTwelveEight.panels[0];
    const height = para.paths![1].points;
    expect(height[0][0]).toBe(height[1][0]);
    const labels = para.labels.map(label => label.text);
    expect(labels).toContain("12 cm");
    expect(labels).toContain("8 cm");
    expect(labels).toContain("10 cm");
    const right = V.challengeRightFiveTwelveThirteen.panels[0];
    const [a, b, c] = right.paths![0].points;
    const dot = (b[0] - a[0]) * (c[0] - a[0]) +
      (b[1] - a[1]) * (c[1] - a[1]);
    expect(dot).toBe(0);
    expect(right.labels.map(label => label.text)).toContain("13 cm");
  });

  it("depicts dimensioned joined composite shapes rather than separated pieces", () => {
    const room = V.challengeLTwoSections.panels[0];
    expect(room.paths?.[0].closed).toBe(true);
    expect(room.paths?.[0].points).toHaveLength(6);
    expect(room.labels.map(l => l.text)).toEqual(["10 m", "6 m", "4 m", "3 m"]);
    expect(describeMathQuestionVisual(V.challengeLTwoSections, "dlp")).not.toContain("72 m²");
    const roof = V.challengeHouseRoof.panels[0];
    expect(roof.paths?.length).toBe(3);
    expect(roof.labels.map(l => l.text)).toEqual(["8 cm", "5 cm", "3 cm"]);
    const smallCombo = V.challengeCompositeTrap.panels[0].labels.map(l => l.text);
    expect(smallCombo).toEqual(["8 cm", "6 cm", "4 cm", "3 cm"]);
    const bigCombo = V.challengeCompositeTrapRect.panels[0].labels.map(l => l.text);
    expect(bigCombo).toEqual(["12 cm", "4 cm", "6 cm", "5 cm"]);
    const pond = V.challengeLawnPond.panels[0];
    expect(pond.paths?.[1].closed).toBe(true);
    expect(pond.paths?.[1].points).toHaveLength(4);
  });

  it("shows true cutouts, internal/external paths, and a genuinely absent doorway segment", () => {
    const board = V.challengeBoardHole.panels[0].paths;
    expect(board).toHaveLength(2);
    expect(board![1].dashed).toBe(true);
    const inside = V.challengeInsidePath.panels[0].paths;
    const outside = V.challengeOutsidePath.panels[0].paths;
    expect(inside).toHaveLength(2);
    expect(outside).toHaveLength(2);
    expect(inside![1].closed).toBe(true);
    expect(outside![1].closed).toBe(true);
    const trim = V.challengeDoorTrim.panels[0].paths!;
    expect(trim).toHaveLength(2);
    expect(trim[0].points[1][0]).toBeLessThan(trim[1].points[0][0]);
    expect(trim[0].points[1][1]).toBe(trim[1].points[0][1]);
    expect(describeMathQuestionVisual(V.challengeDoorTrim, "dlp")).not.toContain("17 m");
  });

  it("draws the correct number of tile rows and columns without labels containing the answer", () => {
    for (const key of ["challengeTileSixFour", "challengeTilingCost"] as const) {
      const figure = V[key].panels[0];
      expect(figure.grid?.columns).toBe(12);
      expect(figure.grid?.rows).toBe(8);
      expect(figure.grid?.step).toBe(16);
      const description = describeMathQuestionVisual(V[key], "dlp");
      expect(description).not.toContain("96 tiles");
      expect(description).not.toContain("768");
    }
    expect(V.practiceTwoRects.panels).toHaveLength(2);
    expect(V.challengeSameAreaSquareRect.panels).toHaveLength(2);
  });

  it("renders every figure as accessible, static bilingual SVG with bounded coordinates", () => {
    for (const visual of Object.values(V)) {
      expect(visual.kind).toBe("geometry-diagram");
      for (const panel of visual.panels) {
        expect(panel.paths?.length).toBeGreaterThanOrEqual(1);
        for (const path of panel.paths ?? []) {
          for (const [x, y] of path.points) {
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(300);
            expect(y).toBeGreaterThanOrEqual(0);
            expect(y).toBeLessThanOrEqual(240);
          }
        }
      }
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain("data-math-visual=\"geometry-diagram\"");
        expect(html).toContain('role="img"');
        expect(html).toContain("<svg");
        expect(html).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
      }
    }
  });

  it("retains original answer keys for perimeter, area and composite examples", () => {
    const check = (objective: Objective, n: number, expected: string) => {
      const q = bank(objective, "dlp")[n - 1];
      expect(q.options[q.answerIndex], q.id).toBe(expected);
    };
    check("objective-1", 21, "20 cm");
    check("objective-1", 23, "12 cm");
    check("objective-2", 1, "28 cm");
    check("objective-2", 3, "96 cm²");
    check("objective-2", 26, "Equal areas; perimeter A > B");
    check("objective-3", 1, "72 m²");
    check("objective-3", 2, "52 cm²");
    check("objective-3", 3, "96 cm²");
    check("objective-3", 7, "66 cm²");
    check("objective-3", 22, "66 m²");
    check("objective-3", 26, "93 cm²");
    check("objective-3", 30, "17 m");
  });
});

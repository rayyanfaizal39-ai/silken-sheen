import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  describeMathPatternVisual,
  dotCount,
  matchstickCount,
  pascalRow,
  pascalValue,
  termLabel,
  validateMathPatternVisual,
  type MathPatternVisual as PatternData,
} from "@/features/quiz/visuals/mathPatternVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { MathQuestionVisual } from "./MathQuestionVisual";

const title = { dlp: "Title", bm: "Tajuk" };
const render = (visual: PatternData, lang: "bm" | "dlp" = "dlp") =>
  renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));

describe("pattern visual arithmetic", () => {
  it("computes Pascal's Triangle, dot counts and matchsticks", () => {
    expect(pascalRow(1)).toEqual([1]);
    expect(pascalRow(5)).toEqual([1, 4, 6, 4, 1]);
    expect(pascalRow(7)).toEqual([1, 6, 15, 20, 15, 6, 1]);
    expect(pascalValue(4, 0)).toBe(0);
    expect([1, 2, 3, 4, 5].map((n) => dotCount("triangle", n))).toEqual([1, 3, 6, 10, 15]);
    expect([1, 2, 3].map((n) => dotCount("square", n))).toEqual([1, 4, 9]);
    expect([1, 2, 3].map((n) => dotCount("pairs", n))).toEqual([2, 4, 6]);
    expect([1, 2, 3].map(matchstickCount)).toEqual([4, 7, 10]);
    expect(termLabel(12)).toBe("T₁₂");
  });

  it("rejects inconsistent or unreadable specifications", () => {
    expect(
      validateMathPatternVisual({ kind: "fibonacci-chain", title, terms: [1, 1, 3] }),
    ).not.toEqual([]);
    expect(
      validateMathPatternVisual({ kind: "fibonacci-chain", title, terms: [1, 1, null, 3] }),
    ).toEqual([]);
    expect(
      validateMathPatternVisual({
        kind: "pascal-triangle",
        title,
        rows: 4,
        hidden: [{ row: 3, position: 4 }],
      }),
    ).not.toEqual([]);
    expect(
      validateMathPatternVisual({ kind: "dot-pattern", title, shape: "square", stages: [6] }),
    ).not.toEqual([]);
    expect(
      validateMathPatternVisual({ kind: "sequence-steps", title, terms: [1, 2, 3], steps: ["+1"] }),
    ).not.toEqual([]);
    expect(
      validateMathPatternVisual({
        kind: "term-table",
        title,
        rows: [
          { label: "x", cells: ["1", "2"] },
          { label: "y", cells: ["3"] },
        ],
      }),
    ).not.toEqual([]);
  });
});

describe("MathPatternVisual rendering", () => {
  it("is reached through the shared MathQuestionVisual dispatcher for every kind", () => {
    const visuals: PatternData[] = [
      { kind: "dot-pattern", title, shape: "triangle", stages: [1, 2, 3] },
      { kind: "pascal-triangle", title, rows: 4 },
      { kind: "fibonacci-chain", title, terms: [0, 1, 1, null] },
      { kind: "sequence-steps", title, terms: [1, 2, null] },
      {
        kind: "term-table",
        title,
        rows: [
          { label: "n", cells: ["1", "2"] },
          { label: "T", cells: ["5", null] },
        ],
      },
      { kind: "object-stages", title, object: "chair", stages: [{ label: "Row 1", count: 3 }] },
      { kind: "matchstick-squares", title, stages: [1, 2] },
    ];
    for (const visual of visuals) {
      const html = render(visual);
      expect(html).toContain(`data-math-visual="${visual.kind}"`);
      expect(html).toContain("Title");
      expect(html).not.toMatch(/<script|on[a-z]+=/i);
      expect(describeMathQuestionVisual(visual, "dlp")).toBe(
        describeMathPatternVisual(visual, "dlp"),
      );
    }
  });

  it("labels hidden Pascal cells without printing or announcing their value", () => {
    const visual: PatternData = {
      kind: "pascal-triangle",
      title,
      rows: 7,
      hidden: [{ row: 7, position: 4, label: "Q" }],
    };
    const html = render(visual);
    expect(html).toContain(">Q<");
    expect(html).not.toContain(">20<");
    expect(describeMathPatternVisual(visual, "dlp")).toContain("Row 7: 1, 6, 15, Q, 15, 6, 1");
  });

  it("draws one glyph per dot, object and matchstick", () => {
    expect(
      render({ kind: "dot-pattern", title, shape: "triangle", stages: [4] }).match(/<circle/g),
    ).toHaveLength(10);
    const chairs = render({
      kind: "object-stages",
      title,
      object: "chair",
      stages: [{ label: "Row 1", count: 8 }],
    });
    // One row is one SVG (it never wraps); each chair is one shape inside it.
    expect(chairs.match(/<svg/g)).toHaveLength(1);
    expect(chairs.match(/<g transform="translate\(/g)).toHaveLength(8);
    const sticks = render({ kind: "matchstick-squares", title, stages: [3], showCounts: false });
    expect(sticks.match(/<line/g)).toHaveLength(10);
  });

  it("shows blanks as blanks, a missing stage as ?, and negatives with a minus sign", () => {
    const steps = render({
      kind: "sequence-steps",
      title,
      terms: [-8, -3, null],
      steps: ["+5", "+5"],
    });
    expect(steps).toContain("−8");
    expect(steps).toContain(">?<");
    expect(steps).toContain("+5");
    const dots = render({
      kind: "dot-pattern",
      title,
      shape: "triangle",
      stages: [1, 2, 3],
      missingStage: 3,
    });
    expect(dots.match(/<circle/g)).toHaveLength(1 + 3);
    expect(dots).toContain(">?<");
    expect(
      describeMathPatternVisual({ kind: "fibonacci-chain", title, terms: [2, 3, null] }, "bm"),
    ).toContain("2, 3, kosong");
  });

  it("keeps tables semantic with labelled blank cells", () => {
    const html = render(
      {
        kind: "term-table",
        title,
        rows: [
          { label: { dlp: "Bus", bm: "Bas" }, cells: ["1", "2"] },
          {
            label: { dlp: "Time", bm: "Masa" },
            cells: [{ dlp: "6:40 a.m.", bm: "6:40 pagi" }, null],
          },
        ],
      },
      "bm",
    );
    expect(html).toContain("<table");
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
    expect(html).toContain("6:40 pagi");
    expect(html).toContain('aria-label="kosong"');
    expect(html).not.toContain('role="img"');
  });
});

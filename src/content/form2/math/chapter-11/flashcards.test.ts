import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathGeometryVisual } from "@/components/quiz/MathGeometryVisual";
import type { MathGeometryVisual as GeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import { textFor } from "@/features/quiz/visuals/mathQuestionVisual";
import { labelBoxes } from "./diagram";
import { MATH_F2_C11_BANK } from "./flashcard-bank";
import { mathF2C11FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C11FlashcardsBM } from "./flashcards-bm";
import {
  coord,
  reflectInX,
  reflectInY,
  reflectInYEqualsX,
  rotate,
  signedArea,
  sideLengths,
  translate,
  type Pt,
} from "./transformations";

const visualOf = (i: number) => MATH_F2_C11_BANK[i].visuals?.[0] as GeometryVisual | undefined;
const panelOf = (i: number) => visualOf(i)!.panels[0];
/** Closed polygons drawn on a card, in drawing order (screen coordinates, y down). */
const polygons = (i: number) => panelOf(i).paths!.filter(p => p.closed).map(p => p.points as Pt[]);
const ratios = (values: number[]) => [...values].sort((a, b) => a - b).map((v, _, s) => v / s[0]);
const anglesOf = (pts: Pt[]) =>
  pts.map((p, i) => {
    const [a, b] = [pts[(i + pts.length - 1) % pts.length], pts[(i + 1) % pts.length]];
    const [u, v] = [[a[0] - p[0], a[1] - p[1]], [b[0] - p[0], b[1] - p[1]]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180) / Math.PI;
  });
const answerText = (i: number, lang: "dlp" | "bm") => MATH_F2_C11_BANK[i][lang].answer.flat().join(" ");

describe("Form 2 Maths Chapter 11 transformations", () => {
  it("preserves all 60 existing IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C11FlashcardsDLP], ["bm", mathF2C11FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c11-${lang}-f${i + 1}`));
    }
  });

  it("combines four subtopics in 12 concept, 32 practice and 16 challenge cards", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 32], ["challenge", 16]] as const) {
      const entries = MATH_F2_C11_BANK.filter(c => c.mode === mode);
      expect(entries).toHaveLength(count);
      expect(new Set(entries.map(e => e.subtopic))).toEqual(new Set(["11.1", "11.2", "11.3", "11.4"]));
    }
    // Each subtopic keeps its block of 15 cards: 3 concept, 8 practice, 4 challenge.
    ["11.1", "11.2", "11.3", "11.4"].forEach((sub, k) => {
      const block = MATH_F2_C11_BANK.slice(k * 15, k * 15 + 15);
      expect(block.every(e => e.subtopic === sub)).toBe(true);
      expect(block.map(e => e.mode)).toEqual([...Array(3).fill("concept"), ...Array(8).fill("practice"), ...Array(4).fill("challenge")]);
    });
  });

  it("keeps BM and DLP aligned: same diagram, same parts and answer structure", () => {
    mathF2C11FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C11FlashcardsBM[i];
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      expect(card.structured?.parts?.length).toBe(bm.structured?.parts?.length);
      expect(card.structured?.answer.length).toBe(bm.structured?.answer.length);
      // Every coordinate and number in the DLP task also appears in the BM task.
      const tokens = (s: string) => (s.match(/\(−?\d+, −?\d+\)|−?\d+(?:°| cm)?/g) ?? []).sort();
      const task = (c: typeof card) => [c.structured!.prompt, ...(c.structured!.parts ?? [])].join(" ");
      expect(tokens(task(bm))).toEqual(tokens(task(card)));
      expect(tokens(bm.structured!.answer.flat().join(" "))).toEqual(tokens(card.structured!.answer.flat().join(" ")));
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
      }
    });
  });

  it("asks 60 different questions, not one template with new numbers", () => {
    for (const lang of ["dlp", "bm"] as const) {
      const shapes = MATH_F2_C11_BANK.map(e =>
        [e[lang].prompt, ...(e[lang].parts ?? [])].join(" ").replace(/\(−?\d+, −?\d+\)|−?\d+(\.\d+)?/g, "#"),
      );
      expect(new Set(shapes).size).toBe(60);
    }
    // Challenge cards do not repeat one three-step script.
    const challengeParts = MATH_F2_C11_BANK.filter(e => e.mode === "challenge").map(e => e.dlp.parts!.join("|"));
    expect(new Set(challengeParts).size).toBe(16);
  });

  it("applies reflections, rotations and translations correctly", () => {
    expect(reflectInY(0)([2, 3])).toEqual([2, -3]);
    expect(reflectInX(0)([2, 3])).toEqual([-2, 3]);
    expect(reflectInX(1)([-3, 4])).toEqual([5, 4]);
    expect(reflectInY(1)([-2, 4])).toEqual([-2, -2]);
    expect(reflectInYEqualsX([4, 1])).toEqual([1, 4]);
    // Anticlockwise is the positive direction: (1, 0) turns up to (0, 1).
    expect(rotate(90, "acw")([1, 0])).toEqual([0, 1]);
    expect(rotate(90, "cw")([1, 0])).toEqual([0, -1]);
    expect(rotate(90, "acw")([3, 1])).toEqual([-1, 3]);
    expect(rotate(90, "cw", [1, 1])([4, 2])).toEqual([2, -2]);
    expect(rotate(180, "cw")([-2, 3])).toEqual(rotate(180, "acw")([-2, 3]));
    for (const p of [[2, -3], [4, 1], [-1, 5]] as Pt[]) {
      expect(rotate(270, "acw")(p)).toEqual(rotate(90, "cw")(p));
      expect(rotate(270, "cw")(p)).toEqual(rotate(90, "acw")(p));
    }
    expect(translate([5, -4])([-3, 2])).toEqual([2, -2]);
    expect(coord([-3, 0])).toBe("(−3, 0)");
  });

  it("prints worked answers that agree with independent calculations", () => {
    const expected: Array<[number, string[]]> = [
      [1, ["(2, −3)"]], [3, ["x = 4"]], [4, ["P′(−1, 1)", "Q′(−4, 1)", "R′(−4, 3)", "S′(−2, 3)"]],
      [5, ["(−2, −2)"]], [6, ["(5, 4)"]], [8, ["(1, 4)"]], [9, ["(−1, −1)"]],
      [11, ["(−5, 2)", "(−5, −2)", "180°"]], [12, ["x = −1", "(−5, −2)"]], [13, ["(2, 2)", "(6, 2)", "(6, 0)"]],
      [14, ["(1, 1)", "(4, 1)", "(1, −1)"]],
      [18, ["(−1, 3)"]], [19, ["(2, −3)"]], [20, ["(2, −2)"]], [21, ["90° clockwise"]], [22, ["(2, 3)"]],
      [23, ["(−3, 1)"]], [24, ["(−3, −2)"]], [25, ["(−1, −4)", "180°"]],
      [26, ["(−1, 4)", "(−4, −1)", "(1, −4)"]], [27, ["(2, 2)", "(2, 4)", "(0, 2)", "90° clockwise"]],
      [28, ["90° clockwise", "(4, −1)"]], [29, ["(4, 0)", "(−4, 0)", "90° anticlockwise"]],
      [33, ["(2, −2)"]], [34, ["(4, −2)"]], [35, ["P′(−2, −1)", "Q′(1, −1)", "R′(2, 1)", "S′(−1, 1)"]],
      [36, ["(−3, 1)"]], [37, ["(0, −6)"]], [38, ["(4, −2)", "(2, 0)"]], [39, ["(−1, 4)", "(−2, 3)"]],
      [41, ["(1, 0)", "(0, 4)", "(2, 5)"]], [42, ["= −3, k", "= 4.", "(−3, 6)", "(7, 0)"]],
      [43, ["(3, 0)", "(13, 2)", "(5, 4)"]], [44, ["(−1, 3)", "(−1, −3)", "(−1, 1)"]],
      [52, ["75°"]], [55, ["5 units"]], [57, ["100°", "3 cm"]], [58, ["(1, −4)", "x-axis"]], [59, ["12 cm"]],
    ];
    for (const [i, values] of expected) for (const value of values) expect(answerText(i, "dlp")).toContain(value);
  });

  it("draws diagrams that never show the answer", () => {
    MATH_F2_C11_BANK.forEach((entry, i) => {
      const visual = visualOf(i);
      if (!visual) return;
      for (const lang of ["dlp", "bm"] as const) {
        const labels = visual.panels[0].labels.map(l => textFor(l.text, lang));
        const question = [entry[lang].prompt, ...(entry[lang].parts ?? [])].join(" ");
        for (const hidden of entry.answerNeutral ?? []) expect(labels.some(l => l.includes(hidden))).toBe(false);
        // Any coordinate printed on a diagram is a given in the question.
        for (const label of labels) {
          const point = label.match(/\(−?\d+, −?\d+\)/);
          if (point) expect(question).toContain(point[0]);
        }
      }
    });
    // Mirror-line, vector and angle questions hide exactly what they ask for.
    expect(panelOf(3).labels.some(l => textFor(l.text, "dlp").startsWith("x ="))).toBe(false);
    expect(panelOf(34).labels.map(l => textFor(l.text, "dlp"))).not.toContain("(4, −2)");
    expect(panelOf(21).arcs).toBeUndefined();
    expect(panelOf(6).labels.map(l => textFor(l.text, "dlp"))).not.toContain("D′");
  });

  it("measures congruent and non-congruent shapes exactly as labelled", () => {
    const [p45, q45] = polygons(45);
    ratios(sideLengths(q45)).forEach((r, k) => expect(r).toBeCloseTo(ratios(sideLengths(p45))[k], 3));
    ratios(sideLengths(p45)).forEach((r, k) => expect(r).toBeCloseTo([1, 4 / 3, 5 / 3][k], 2));
    const [k48, l48] = polygons(48);
    ratios(sideLengths(k48)).forEach((r, k) => expect(r).toBeCloseTo([1, 7 / 5, 9 / 5][k], 2));
    ratios(sideLengths(l48)).forEach((r, k) => expect(r).toBeCloseTo([1, 7 / 5, 9 / 5][k], 2));
    const [abc51, xyz51] = polygons(51);
    ratios(sideLengths(abc51)).forEach((r, k) => expect(r).toBeCloseTo([1, 7 / 6, 8 / 6][k], 2));
    ratios(sideLengths(xyz51)).forEach((r, k) => expect(r).toBeCloseTo([1, 7 / 6, 8 / 6][k], 2));
    const [x59, y59] = polygons(59);
    ratios(sideLengths(x59)).forEach((r, k) => expect(r).toBeCloseTo([1, 4 / 3, 5 / 3][k], 2));
    ratios(sideLengths(y59)).forEach(r => expect(r).toBeCloseTo(1, 2));
    // Same side lengths, different angles: rectangle 90° vs parallelogram 60°.
    const [r49, s49] = polygons(49);
    expect(sideLengths(r49).map(Math.round)).toEqual(sideLengths(s49).map(Math.round));
    expect(anglesOf(r49).every(a => Math.abs(a - 90) < 0.5)).toBe(true);
    expect(Math.min(...anglesOf(s49))).toBeCloseTo(60, 0);
    // Equal areas, different sides.
    const [x47, y47] = polygons(47);
    const area = (pts: Pt[]) => Math.abs(signedArea(pts)) / 2;
    expect(area(x47)).toBeCloseTo(area(y47), 0);
    expect(ratios(sideLengths(x47))).not.toEqual(ratios(sideLengths(y47)));
    // Kites: 110°, 100°, 50°, 100° in both; triangles DEF/KLM: 40°, 65°, 75°.
    for (const kite of polygons(57)) expect(anglesOf(kite).map(Math.round).sort()).toEqual([100, 100, 110, 50].sort());
    for (const tri of polygons(52)) expect(anglesOf(tri).map(Math.round).sort((a, b) => a - b)).toEqual([40, 65, 75]);
  });

  it("shows reflections reversing orientation while rotations and translations keep it", () => {
    const sign = (pts: Pt[]) => Math.sign(signedArea(pts));
    const pair = (i: number) => polygons(i).slice(0, 2);
    for (const i of [2, 3, 12, 53]) { const [a, b] = pair(i); expect(sign(a)).toBe(-sign(b)); }
    for (const i of [17, 21, 22, 25, 31, 34, 56]) { const [a, b] = pair(i); expect(sign(a)).toBe(sign(b)); }
    // On card 54 only Q is congruent to E: same side lengths, turned.
    const [e54, p54, q54, r54] = polygons(54);
    ratios(sideLengths(q54)).forEach((r, k) => expect(r).toBeCloseTo(ratios(sideLengths(e54))[k], 2));
    expect(sideLengths(p54)[0] / sideLengths(e54)[0]).toBeCloseTo(2, 3);
    expect(sideLengths(r54).map(Math.round)).not.toEqual(sideLengths(e54).map(Math.round));
  });

  it("uses many distinct diagram designs, with coordinate grids only where needed", () => {
    const visuals = MATH_F2_C11_BANK.map(e => e.visuals?.[0] as GeometryVisual | undefined).filter(Boolean) as GeometryVisual[];
    // #30, #39 and #46 are answered in words or by calculation alone.
    expect(visuals.length).toBe(57);
    expect(new Set(visuals.map(v => JSON.stringify(v.panels[0]))).size).toBe(57);
    const axes = visuals.filter(v => v.panels[0].labels.some(l => l.text === "x" || l.text === "y"));
    expect(axes.length).toBeLessThanOrEqual(36);
    expect(visuals.filter(v => !v.panels[0].grid).length).toBeGreaterThanOrEqual(14);
    expect(visuals.filter(v => v.panels[0].arcs?.length).length).toBeGreaterThanOrEqual(4);
    expect(visuals.filter(v => v.panels[0].circles?.length).length).toBeGreaterThanOrEqual(2);
    // Every subtopic draws a mix of grid and non-grid figures.
    for (let k = 0; k < 4; k++) {
      const block = MATH_F2_C11_BANK.slice(k * 15, k * 15 + 15).flatMap(e => e.visuals ?? []) as GeometryVisual[];
      expect(block.some(v => v.panels[0].grid)).toBe(true);
      expect(block.some(v => !v.panels[0].labels.some(l => l.text === "x"))).toBe(true);
    }
  });

  it("keeps every diagram compact, inside its canvas and free of overlapping labels", () => {
    MATH_F2_C11_BANK.forEach((_, i) => {
      const visual = visualOf(i);
      if (!visual) return;
      expect(visual).toMatchObject({ layout: "compact", size: "natural" });
      const panel = visual.panels[0];
      const [w, h] = panel.viewBox!;
      expect(w).toBeLessThanOrEqual(232);
      expect(h).toBeLessThanOrEqual(210);
      expect(Math.max(w, h)).toBeGreaterThanOrEqual(100);
      for (const lang of ["dlp", "bm"] as const) {
        const boxes = labelBoxes(panel.labels.map(l => ({ ...l, text: textFor(l.text, lang) })));
        for (const b of boxes) {
          expect(b.x0).toBeGreaterThanOrEqual(-1);
          expect(b.x1).toBeLessThanOrEqual(w + 1);
          expect(b.y0).toBeGreaterThanOrEqual(-1);
          expect(b.y1).toBeLessThanOrEqual(h + 1);
        }
        boxes.forEach((a, j) => boxes.slice(j + 1).forEach(b => {
          const overlap = a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1;
          expect(overlap, `card ${i}: "${textFor(a.label.text, lang)}" overlaps "${textFor(b.label.text, lang)}"`).toBe(false);
        }));
      }
      // Grids use one step for x and y.
      if (panel.grid) expect(panel.grid.step).toBeGreaterThan(10);
    });
  });

  it("renders compact markup at its natural size", () => {
    const html = renderToStaticMarkup(createElement(MathGeometryVisual, { visual: visualOf(29)!, lang: "bm" }));
    expect(html).toContain('data-layout="compact"');
    expect(html).toMatch(/style="overflow:visible;width:\d+px"/);
    expect(html).not.toContain("tidak mengikut skala");
  });
});

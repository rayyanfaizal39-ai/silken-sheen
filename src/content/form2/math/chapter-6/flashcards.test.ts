import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathGeometryVisual } from "@/components/quiz/MathGeometryVisual";
import type { MathGeometryVisual as GeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import { textFor } from "@/features/quiz/visuals/mathQuestionVisual";
import { MATH_F2_C6_BANK } from "./flashcard-bank";
import { mathF2C6FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C6FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 6 structured 3D-shapes flashcards", () => {
  it("preserves 60 stable card IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C6FlashcardsDLP], ["bm", mathF2C6FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c6-${lang}-f${i + 1}`));
    }
  });
  it("covers each subtopic in Concept, Practice and Challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C6_BANK.filter(c => c.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(c => c.subtopic))).toEqual(new Set(["6.1", "6.2", "6.3"]));
    }
  });
  it("keeps DLP and BM aligned and every Challenge multipart", () => {
    mathF2C6FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C6FlashcardsBM[i];
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
      }
    });
  });
  it("draws compact diagrams only where they help, identical in BM and DLP", () => {
    const withVisual = mathF2C6FlashcardsDLP.flatMap((card, i) => (card.structured?.visuals?.length ? [i] : []));
    // #3 (name the cylinder), #13 (Euler check from given counts) and #40 (measures in words) stay text-only.
    expect(withVisual).toEqual(Array.from({ length: 60 }, (_, i) => i).filter(i => ![3, 13, 40].includes(i)));
    mathF2C6FlashcardsDLP.forEach((card, i) => {
      expect(mathF2C6FlashcardsBM[i].structured?.visuals).toEqual(card.structured?.visuals);
      const visual = card.structured?.visuals?.[0] as GeometryVisual | undefined;
      if (!visual) return;
      expect(visual).toMatchObject({ kind: "geometry-diagram", layout: "compact" });
      const [panel] = visual.panels;
      const [width, height] = panel.viewBox!;
      expect(width).toBe(180);
      expect(height).toBeLessThanOrEqual(150);
      const points = [...(panel.paths ?? []).flatMap(p => p.points), ...panel.labels.map(l => l.at)];
      for (const [x, y] of points) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(width);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(height);
      }
      // Drawings are centred horizontally on the canvas.
      const xs = (panel.paths ?? []).flatMap(p => p.points.map(q => q[0]));
      expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo(width / 2, 0);
    });
  });
  it("draws every cube net as six congruent squares that fold into a cube", () => {
    const cellsOf = (i: number) => {
      const squares = (mathF2C6FlashcardsDLP[i].structured!.visuals![0] as GeometryVisual).panels[0].paths!;
      const sides = squares.map(s => Math.abs(s.points[1][0] - s.points[0][0]));
      sides.forEach(side => expect(side).toBeCloseTo(sides[0], 1));
      squares.forEach(s => expect(Math.abs(s.points[2][1] - s.points[1][1])).toBeCloseTo(sides[0], 1));
      const [x0, y0] = [Math.min(...squares.map(s => s.points[0][0])), Math.min(...squares.map(s => s.points[0][1]))];
      return squares.map(s => [Math.round((s.points[0][0] - x0) / sides[0]), Math.round((s.points[0][1] - y0) / sides[0])] as [number, number]);
    };
    for (const i of [20, 25, 32, 35, 36, 37, 38, 39]) {
      const cells = cellsOf(i);
      expect(cells).toHaveLength(6);
      expect(foldsIntoCube(cells)).toBe(true);
    }
    // The gift-box challenges each show a different valid layout.
    expect(new Set([35, 36, 37, 38, 39].map(i => JSON.stringify(cellsOf(i)))).size).toBe(5);
    expect(cellsOf(23)).toHaveLength(6);
    expect(foldsIntoCube(cellsOf(23))).toBe(false);
    expect(cellsOf(30)).toHaveLength(5);
  });
  it("draws cuboids to their stated proportions with only the given measurements", () => {
    const cuboids: Array<[number, [number, number, number]]> = [
      [33, [2, 3, 5]], [52, [3, 4, 5]], [53, [2, 5, 7]], [54, [4, 6, 8]],
      [55, [2, 3, 4]], [56, [3, 4, 5]], [57, [4, 5, 6]], [58, [3, 5, 8]], [59, [5, 6, 9]],
    ];
    for (const [i, [l, w, h]] of cuboids) {
      for (const [lang, deck] of [["dlp", mathF2C6FlashcardsDLP], ["bm", mathF2C6FlashcardsBM]] as const) {
        const panel = (deck[i].structured!.visuals![0] as GeometryVisual).panels[0];
        // The front face is the first closed face: its width : height is l : h.
        const front = panel.paths!.find(p => p.closed)!.points;
        const xs = front.map(p => p[0]), ys = front.map(p => p[1]);
        expect((Math.max(...xs) - Math.min(...xs)) / (Math.max(...ys) - Math.min(...ys))).toBeCloseTo(l / h, 2);
        expect(panel.labels.map(lb => textFor(lb.text, lang))).toEqual([`${l} cm`, `${h} cm`, `${w} cm`]);
        const question = [deck[i].structured!.prompt, ...(deck[i].structured!.parts ?? [])].join(" ");
        for (const value of [l, w, h]) expect(question).toContain(`${value} cm`);
        // Three edges meet at the hidden back corner.
        expect(panel.paths!.filter(p => p.dashed)).toHaveLength(3);
      }
    }
    for (const i of [44, 45, 46, 47, 48, 49, 50, 51, 32, 35, 36, 37, 38, 39]) {
      const card = mathF2C6FlashcardsDLP[i];
      const labels = (card.structured!.visuals![0] as GeometryVisual).panels[0].labels.map(lb => textFor(lb.text, "dlp"));
      expect(labels).toHaveLength(1);
      expect(card.structured!.prompt).toContain(labels[0]);
    }
  });
  it("renders compact markup with a single scale note", () => {
    const visual = mathF2C6FlashcardsBM[56].structured!.visuals![0] as GeometryVisual;
    const html = renderToStaticMarkup(createElement(MathGeometryVisual, { visual, lang: "bm" }))
      .replace(/aria-label="[^"]*"/, "");
    expect(html).toContain('data-layout="compact"');
    expect(html.split("tidak mengikut skala")).toHaveLength(2);
    expect(html).toContain('stroke-dasharray="5 4"');
  });
});

/** Rolls a die across the net; a cube net puts a different face down on each square. */
function foldsIntoCube(cells: Array<[number, number]>) {
  type Die = { down: string; up: string; n: string; s: string; e: string; w: string };
  const roll = (d: Die, dc: number, dr: number): Die =>
    dc === 1 ? { ...d, down: d.e, e: d.up, up: d.w, w: d.down }
    : dc === -1 ? { ...d, down: d.w, w: d.up, up: d.e, e: d.down }
    : dr === 1 ? { ...d, down: d.s, s: d.up, up: d.n, n: d.down }
    : { ...d, down: d.n, n: d.up, up: d.s, s: d.down };
  const key = ([c, r]: [number, number]) => `${c},${r}`;
  const cellSet = new Set(cells.map(key));
  const state = new Map<string, Die>([[key(cells[0]), { down: "A", up: "B", n: "C", s: "D", e: "E", w: "F" }]]);
  const queue = [cells[0]];
  while (queue.length) {
    const [c, r] = queue.shift()!;
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const next: [number, number] = [c + dc, r + dr];
      if (!cellSet.has(key(next)) || state.has(key(next))) continue;
      state.set(key(next), roll(state.get(key([c, r]))!, dc, dr));
      queue.push(next);
    }
  }
  return state.size === cells.length && new Set([...state.values()].map(d => d.down)).size === cells.length && cells.length === 6;
}

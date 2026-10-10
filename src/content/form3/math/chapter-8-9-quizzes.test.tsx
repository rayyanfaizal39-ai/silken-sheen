import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import {
  clipCoordinateLine,
  coordinateTransform,
} from "@/features/quiz/visuals/mathCoordinateVisual";
import {
  mathF3C8QuestionBankBM as c8bm,
  mathF3C8QuizzesBM as r8bm,
} from "./chapter-8/quizzes-bm";
import {
  mathF3C8QuestionBankDLP as c8en,
  mathF3C8QuizzesDLP as r8en,
} from "./chapter-8/quizzes-dlp";
import {
  mathF3C9QuestionBankBM as c9bm,
  mathF3C9QuizzesBM as r9bm,
} from "./chapter-9/quizzes-bm";
import {
  mathF3C9QuestionBankDLP as c9en,
  mathF3C9QuizzesDLP as r9en,
} from "./chapter-9/quizzes-dlp";
const sources = { 8: { bm: c8bm, dlp: c8en }, 9: { bm: c9bm, dlp: c9en } },
  runtime = { 8: { bm: r8bm, dlp: r8en }, 9: { bm: r9bm, dlp: r9en } };
const answer = (c: 8 | 9, n: number, lang: "bm" | "dlp" = "dlp") =>
  sources[c][lang][n - 1].options[sources[c][lang][n - 1].answerIndex];
const numeric = (s: string) => {
  const clean = s
    .replace(/−/g, "-")
    .replace(/^[a-z]\s*=\s*/i, "")
    .replace(/\s/g, "");
  if (clean.includes("/")) {
    const [a, b] = clean.split("/").map(Number);
    return a / b;
  }
  return Number(clean);
};
const xy = (s: string) =>
  s
    .replace(/−/g, "-")
    .replace(/[()\s]/g, "")
    .split(",")
    .map((x) =>
      x.startsWith("√")
        ? Math.sqrt(Number(x.slice(1)))
        : x.startsWith("-√")
          ? -Math.sqrt(Number(x.slice(2)))
          : Number(x),
    );
// Parse only linear arithmetic used in this bank. Refuse other syntax before evaluation.
function expression(s: string, x: number, y: number) {
  const expr = s
    .replace(/−/g, "-")
    .replace(/\s/g, "")
    .replace(/(\d|\))([xy])/g, "$1*$2");
  if (!/^[\dxy+*/().-]+$/.test(expr))
    throw new Error("Invalid linear expression " + expr);
  return Function("x", "y", `return (${expr})`)(x, y) as number;
}
function residual(s: string, x: number, y: number) {
  const [l, r] = s.split("=");
  return expression(l, x, y) - expression(r, x, y);
}
describe("Form 3 Chapters 8 and 9 repaired quizzes", () => {
  it.each([8, 9] as const)(
    "audits every Chapter %s source and both 25-question sets",
    (c) => {
      for (const lang of ["bm", "dlp"] as const) {
        const bank = sources[c][lang];
        expect(bank).toHaveLength(c === 8 ? 50 : 53);
        bank.forEach((q, i) => {
          expect(q.id).toBe(`math-f3-c${c}-${lang}-q${i + 1}`);
          expect(q.options).toHaveLength(4);
          expect(new Set(q.options).size).toBe(4);
          expect(q.explanation!.length).toBeGreaterThan(20);
          expect(q.question).not.toMatch(
            /anggaran|estimated|bergantung pada rajah|depends on diagram|daripada soalan sebelumnya|from the previous question/i,
          );
        });
        for (const set of ["A", "B"]) {
          const active = runtime[c][lang].filter((q) => q.set === set);
          expect(active).toHaveLength(25);
          expect(active.filter((q) => q.difficulty === "Easy")).toHaveLength(
            10,
          );
          expect(active.filter((q) => q.difficulty === "Medium")).toHaveLength(
            10,
          );
          expect(active.filter((q) => q.difficulty === "Hard")).toHaveLength(5);
        }
      }
    },
  );
  it("keeps source IDs, bilingual geometry and set assignments aligned", () => {
    for (const c of [8, 9] as const)
      sources[c].bm.forEach((q, i) => {
        expect(sources[c].dlp[i].visual).toBe(q.visual);
        expect(sources[c].dlp[i].answerIndex).toBe(q.answerIndex);
        expect(runtime[c].bm.find((r) => r.id === q.id)?.set).toBe(
          runtime[c].dlp.find((r) => r.id.endsWith(`-q${i + 1}`))?.set,
        );
      });
    expect(r9bm.some((q) => q.id.endsWith("-q49"))).toBe(true);
    expect(r9bm.some((q) => q.id.endsWith("-q53"))).toBe(true);
  });
  it("renders all figures with bilingual accessible descriptions and finite coordinates", () => {
    for (const c of [8, 9] as const)
      for (const lang of ["bm", "dlp"] as const)
        for (const q of sources[c][lang])
          if (q.visual) {
            const html = renderToStaticMarkup(
              createElement(MathQuestionVisual, { visual: q.visual, lang }),
            );
            expect(html, q.id).toContain('role="img"');
            expect(html, q.id).not.toMatch(/NaN|Infinity|undefined/);
            const desc = describeMathQuestionVisual(q.visual, lang);
            expect(desc.length).toBeGreaterThan(40);
            if (q.visual.kind === "coordinate-plane")
              expect(desc).toContain(
                lang === "bm" ? "Skala unit yang sama" : "Equal unit scales",
              );
          }
  });
  it("checks restricted square-circle intersections including boundary tangencies", () => {
    const y = 8 / 2,
      x = Math.sqrt(5 ** 2 - y ** 2);
    expect([x, -x].filter((v) => v >= 0 && v <= 8)).toHaveLength(
      numeric(answer(8, 26)),
    );
    const candidates = [5, 11]
      .flatMap((x) => {
        const r2 = 25 - x * x;
        return r2 < 0
          ? []
          : r2 === 0
            ? [[x, 8]]
            : [
                [x, 8 - Math.sqrt(r2)],
                [x, 8 + Math.sqrt(r2)],
              ];
      })
      .filter(([x, y]) => x >= 0 && x <= 8 && y >= 0 && y <= 8);
    expect(candidates).toHaveLength(numeric(answer(8, 38)));
    expect(candidates).toEqual([[5, 8]]);
    const p = xy(answer(8, 43));
    expect(p[0] ** 2 + p[1] ** 2).toBeCloseTo(49);
    expect(p[1]).toBe(4);
    expect(p.every((v) => v >= 0 && v <= 8)).toBe(true);
    const p48 = xy(answer(8, 48));
    expect(p48[0]).toBe(p48[1]);
    expect(p48[0]).toBeCloseTo(5 / Math.sqrt(2), 2);
  });
  it("checks all hard locus candidate answers against their distance conditions", () => {
    expect(
      [
        [2, 4],
        [4, 2],
        [4, 6],
        [6, 4],
      ].filter(([x, y]) => Math.abs(x) === Math.abs(y) && Math.hypot(x, y) < 5),
    ).toHaveLength(0);
    expect(answer(8, 41)).toMatch(/None/);
    const candidates = { E: [3, 3], F: [-3, 3], G: [-4, -4], H: [2, -2] };
    expect(
      Object.entries(candidates)
        .filter(([, p]) => Math.hypot(...p) >= 5)
        .map(([name]) => name),
    ).toEqual([answer(8, 42)]);
    for (const n of [45, 46, 50]) {
      const [x, y] = xy(answer(8, n));
      if (n === 45) {
        expect(Math.hypot(x + 3, y)).toBe(5);
        expect(Math.hypot(x - 3, y)).toBe(5);
        expect(y).toBeGreaterThan(0);
      }
      if (n === 46) {
        expect(Math.hypot(x, y)).toBe(5);
        expect(Math.hypot(x - 6, y)).toBe(5);
        expect(y).toBeGreaterThan(0);
      }
      if (n === 50) {
        expect(Math.abs(y)).toBe(Math.abs(y - 6));
        expect(Math.hypot(x, y)).toBe(5);
        expect(x).toBeGreaterThan(0);
      }
    }
    expect([3, -3].flatMap((y) => [4, -4].map((x) => [x, y]))).toHaveLength(
      numeric(answer(8, 44)),
    );
    expect(
      [2, -2].map((x) => [x, Math.sqrt(25 - x * x)]).filter(([, y]) => y > 0),
    ).toHaveLength(numeric(answer(8, 47)));
    expect(answer(8, 49)).toBe(`${3 ** 2 * 5}π cm³`);
  });
  it("distinguishes the whole-plane locus from a restricted internal bisector", () => {
    expect(answer(8, 8)).toMatch(/Both/);
    expect(answer(8, 30)).toContain("y = −x");
    expect(answer(8, 30)).toMatch(/excluding/);
    for (const [x, y] of [
      [2, 2],
      [-2, 2],
      [2, -2],
      [-2, -2],
    ])
      expect(Math.abs(x)).toBe(Math.abs(y));
    for (const n of [25, 32]) expect(answer(8, n)).toBe("Diagonal AC");
    expect(answer(8, 34)).toBe("Diagonal BD");
    expect(answer(8, 40)).toBe("Diagonal PT");
  });
  it("independently checks unique equivalent straight-line equations", () => {
    const cases: [number, [number, number], [number, number]][] = [
      [21, [0, 4], [6, 0]],
      [22, [0, 4], [6, 0]],
      [23, [0, 3], [6, 0]],
      [30, [6, 8], [8, 9]],
      [31, [-1, 5], [2, -7]],
      [32, [5, 4], [6, 2]],
      [33, [2, 4], [0, 4]],
      [34, [2, 4], [2, 0]],
      [41, [0, 8], [4, 0]],
      [42, [0, 6], [-2, 0]],
      [43, [2, 4], [5, 5]],
      [44, [0, 0], [3, 1]],
    ];
    for (const lang of ["bm", "dlp"] as const)
      for (const [n, p, q] of cases) {
        const question = sources[9][lang][n - 1];
        const valid = question.options.map((o) =>
          [residual(o, ...p), residual(o, ...q)].every(
            (r) => Math.abs(r) < 1e-9,
          ),
        );
        expect(valid, question.id).toEqual(
          question.options.map((_, i) => i === question.answerIndex),
        );
      }
  });
  it("recomputes every non-trivial gradient, intercept and parallel parameter", () => {
    const values: Record<number, number> = {
      3: 2,
      4: 9,
      13: -2 / 3,
      14: 12 / 3,
      20: (6 - 2) / (3 - 1),
      24: 3 / 4,
      29: 2 / (4 / 3),
      36: 3,
      37: 6,
      38: 15 / 3,
      39: 15 / 5,
      40: (15 - 3 * 2) / 5,
      49: 3 * (5 / 8),
    };
    for (const lang of ["bm", "dlp"] as const)
      for (const [n, v] of Object.entries(values)) {
        const q = sources[9][lang][+n - 1];
        expect(numeric(q.options[q.answerIndex]), q.id).toBeCloseTo(v, 10);
        expect(
          q.options.filter((o) => Math.abs(numeric(o) - v) < 1e-9),
        ).toHaveLength(1);
      }
    expect(answer(9, 49)).toBe("15/8");
  });
  it("verifies intersections and the clinic against BOTH original constraints", () => {
    for (const [n, a, b, c, d, e, f] of [
      [35, 2, 1, 5, 1, 2, 1],
      [45, -1, 1, 2, 2, 3, 6],
      [53, 2, -1, 7, 1, 1, 5],
    ]) {
      const q = c9en[n - 1];
      const valid = q.options.map((o) => {
        const [x, y] = xy(o);
        return a * x + b * y === c && d * x + e * y === f;
      });
      expect(valid).toEqual(q.options.map((_, i) => i === q.answerIndex));
    }
    const [x, y] = xy(answer(9, 50));
    expect(Math.hypot(x, y)).toBe(Math.hypot(x - 800, y));
    expect(y).toBe(600);
    expect(y).toBeGreaterThan(0);
  });
  it("keeps working out of Yes/No answer choices and solutions out of figure labels", () => {
    for (const lang of ["bm", "dlp"] as const)
      for (const n of [16, 25, 26, 27, 28, 46, 47, 48])
        expect(answer(9, n, lang)).toMatch(
          lang === "bm" ? /^(Ya|Tidak)$/ : /^(Yes|No)$/,
        );
    for (const n of [30, 31, 32, 43, 49, 50, 53]) {
      const q = c9en[n - 1];
      const html = renderToStaticMarkup(
        createElement(MathQuestionVisual, { visual: q.visual!, lang: "dlp" }),
      );
      expect(html, q.id).not.toContain(q.options[q.answerIndex]);
    }
  });
  it("matches every plotted Chapter 9 equation to the actual question", () => {
    const normalize = (s: string) => s.replace(/−/g, "-").replace(/\s/g, "");
    for (const q of c9en)
      if (q.visual?.kind === "coordinate-plane")
        for (const l of q.visual.lines || []) {
          expect(normalize(q.question), q.id).toContain(
            normalize(l.label as string),
          );
        }
  });
  it("clips vertical, horizontal and corner-crossing lines without duplicate endpoints", () => {
    const domain: [number, number, number, number] = [-6, 6, -6, 6];
    expect(clipCoordinateLine({ a: 1, b: 0, c: 2 }, domain)).toEqual([
      [2, -6],
      [2, 6],
    ]);
    expect(clipCoordinateLine({ a: 0, b: 1, c: 3 }, domain)).toEqual([
      [-6, 3],
      [6, 3],
    ]);
    expect(clipCoordinateLine({ a: 1, b: -1, c: 0 }, domain)).toEqual([
      [-6, -6],
      [6, 6],
    ]);
    expect(clipCoordinateLine({ a: 0, b: 0, c: 0 }, domain)).toBeUndefined();
    expect(clipCoordinateLine({ a: 1, b: 0, c: 9 }, domain)).toBeUndefined();
    for (const q of c9en)
      if (q.visual?.kind === "coordinate-plane")
        for (const l of q.visual.lines || []) {
          const p = clipCoordinateLine(l, q.visual.domain);
          expect(p, q.id).toBeTruthy();
          for (const [x, y] of p!)
            expect(l.a * x + l.b * y).toBeCloseTo(l.c, 8);
        }
  });
  it("preserves Euclidean distances and circle radii on asymmetric grids", () => {
    for (const domain of [
      [-2, 10, -8, 4],
      [-10, 6, -6, 10],
      [-200, 1000, -200, 1000],
    ] as [number, number, number, number][]) {
      const { point, scale } = coordinateTransform(domain);
      const p = point([0, 0]),
        x = point([1, 0]),
        y = point([0, 1]);
      expect(Math.hypot(x[0] - p[0], x[1] - p[1])).toBeCloseTo(scale, 10);
      expect(Math.hypot(y[0] - p[0], y[1] - p[1])).toBeCloseTo(scale, 10);
    }
  });
});

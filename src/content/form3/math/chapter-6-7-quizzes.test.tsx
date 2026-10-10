import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import {
  mathF3C6QuestionBankBM as c6bm,
  mathF3C6QuizzesBM as r6bm,
} from "./chapter-6/quizzes-bm";
import {
  mathF3C6QuestionBankDLP as c6en,
  mathF3C6QuizzesDLP as r6en,
} from "./chapter-6/quizzes-dlp";
import {
  mathF3C7QuestionBankBM as c7bm,
  mathF3C7QuizzesBM as r7bm,
} from "./chapter-7/quizzes-bm";
import {
  mathF3C7QuestionBankDLP as c7en,
  mathF3C7QuizzesDLP as r7en,
} from "./chapter-7/quizzes-dlp";
import type {
  GeometryPoint,
  MathGeometryVisual,
} from "@/features/quiz/visuals/mathGeometryVisual";
const sources = { 6: { bm: c6bm, dlp: c6en }, 7: { bm: c7bm, dlp: c7en } },
  runtime = { 6: { bm: r6bm, dlp: r6en }, 7: { bm: r7bm, dlp: r7en } };
const rad = (x: number) => (x * Math.PI) / 180,
  round = (x: number, n = 2) => Number(x.toFixed(n));
const expected6: Record<number, number> = {
  11: 80 / 2,
  12: 35 * 2,
  13: 4,
  14: 3,
  15: 2,
  19: 45,
  20: 40,
  21: (180 - 104) / 8,
  22: (180 - 98) / 4,
  23: 180 / 6,
  24: 180 - (2 * 180) / 6,
  25: 180 - 90 - 42,
  26: 180 - 90 - 66,
  27: 14,
  28: round(14 * Math.tan(rad(24))),
  29: 60,
  30: 180 - 2 * 48,
  31: 84 / 2,
  32: 2 * 35,
  33: 180 - (180 - 30 - 20),
  34: (60 + 20) / 2,
  35: 180 - 55,
  36: 70 / 2,
  37: 180 - 2 * 30,
  38: round((Math.acos((4 - 3) / 7) * 180) / Math.PI),
  39: 1.2,
  40: round(Math.hypot(1.2, 0.25)),
  41: 50 / 2,
  42: 180 - 90 - 25,
  43: 180 - 90 - 35,
  44: Number((16 * Math.sin(rad(40))).toPrecision(3)),
  45: 158 / 2,
  46: 180 - ((180 - 72) / 2 + 36),
  47: 180 - 90 - (180 - 126),
  48: round(5 * Math.tan(rad(60))),
  50: 180 - 90 - 25,
  51: round(3 * Math.tan(rad(25))),
  52: 60,
  53: 54,
  55: 180 - (180 - 110) - 25,
};
const expected7: Record<number, number> = {
  16: 1,
  36: 5 - 2,
  37: 7 * 3,
  38: 2 * (7 + 4),
  42: 14 / 2,
  43: Math.sqrt((14 * Math.sqrt(2)) ** 2 - 14 ** 2),
  45: 6 * 4 * 5 - 2 * 4 * (5 - 2),
  46: Math.hypot(6 / 2, 4),
  48: 4 * 2 * (2.5 * 2) * (1.5 * 2),
};
function numeric(s: string) {
  const v = s.replace(/≈|\s|cm[²³]?|m|°/g, "");
  if (v.includes(":")) {
    const [a, b] = v.split(":").map(Number);
    return a / b;
  }
  return v.startsWith("√")
    ? Math.sqrt(Number(v.slice(1)))
    : v.includes("√")
      ? Number(v.split("√")[0]) * Math.sqrt(Number(v.split("√")[1]))
      : Number(v);
}
function visual(c: 6 | 7, n: number) {
  return sources[c].bm[n - 1].visual as MathGeometryVisual;
}
function angle(a: GeometryPoint, v: GeometryPoint, b: GeometryPoint) {
  const u = [a[0] - v[0], a[1] - v[1]],
    w = [b[0] - v[0], b[1] - v[1]];
  return (
    (Math.acos(
      Math.max(
        -1,
        Math.min(
          1,
          (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w)),
        ),
      ),
    ) *
      180) /
    Math.PI
  );
}
function circVertices(n: number) {
  const p = visual(6, n).panels[0];
  const points: Record<string, GeometryPoint> = { O: p.circles![0].centre };
  for (const l of p.labels) {
    if (
      typeof l.text === "string" &&
      /^[A-Z]$/.test(l.text) &&
      l.text !== "O"
    ) {
      // Named vertex labels are offset radially by 14px and vertically by 5px.
      const v: GeometryPoint = [
          l.at[0] - points.O[0],
          l.at[1] - 5 - points.O[1],
        ],
        k = p.circles![0].radius / (p.circles![0].radius + 14);
      points[l.text] = [points.O[0] + v[0] * k, points.O[1] + v[1] * k];
    }
  }
  return points;
}
describe("Form 3 Chapters 6 and 7 repaired quizzes", () => {
  it.each([6, 7] as const)(
    "audits every Chapter %s source question in BM and DLP",
    (c) => {
      for (const lang of ["bm", "dlp"] as const) {
        const bank = sources[c][lang];
        expect(bank).toHaveLength(c === 6 ? 55 : 50);
        bank.forEach((q, i) => {
          expect(q.id).toBe(`math-f3-c${c}-${lang}-q${i + 1}`);
          expect(q.explanation!.length).toBeGreaterThan(20);
          expect(q.options).toHaveLength(4);
          expect(new Set(q.options).size).toBe(4);
          expect(q.answerIndex).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex).toBeLessThan(4);
          expect(q.question + " " + q.options.join(" ")).not.toMatch(
            /approximately.*if|estimated|anggaran sudut|bergantung rajah|depends on diagram|from the above|daripada soalan sebelumnya|Example 7|Contoh 7/i,
          );
        });
        expect(runtime[c][lang]).toHaveLength(50);
        for (const set of ["A", "B"])
          expect(runtime[c][lang].filter((q) => q.set === set)).toHaveLength(
            25,
          );
      }
    },
  );
  it.each([6, 7] as const)(
    "independently recomputes numeric answers in Chapter %s",
    (c) => {
      for (const lang of ["bm", "dlp"] as const)
        for (const [n, value] of Object.entries(
          c === 6 ? expected6 : expected7,
        )) {
          const q = sources[c][lang][Number(n) - 1];
          expect(numeric(q.options[q.answerIndex]), q.id).toBeCloseTo(value, 8);
          expect(
            q.options.filter((o) => Math.abs(numeric(o) - value) < 1e-8),
            q.id,
          ).toHaveLength(1);
        }
    },
  );
  it("keeps bilingual visual objects, source IDs and set memberships aligned", () => {
    for (const c of [6, 7] as const)
      sources[c].bm.forEach((q, i) => {
        expect(sources[c].dlp[i].visual).toBe(q.visual);
        expect(sources[c].dlp[i].difficulty).toBe(q.difficulty);
        expect(runtime[c].bm.find((r) => r.id === q.id)?.set).toBe(
          runtime[c].dlp.find((r) => r.id.endsWith(`-q${i + 1}`))?.set,
        );
      });
  });
  it("renders every figure with bilingual accessible labels and finite geometry", () => {
    for (const c of [6, 7] as const)
      for (const lang of ["bm", "dlp"] as const)
        for (const q of sources[c][lang])
          if (q.visual) {
            const html = renderToStaticMarkup(
              createElement(MathQuestionVisual, { visual: q.visual, lang }),
            );
            expect(html, q.id).toContain('role="img"');
            expect(html, q.id).not.toMatch(/NaN|Infinity|undefined/);
            expect(describeMathQuestionVisual(q.visual, lang), q.id).toMatch(
              lang === "bm"
                ? /Rajah tidak mengikut skala/
                : /Diagram not to scale/,
            );
          }
  });
  it("draws cyclic numeric givens from geometrically consistent vertices", () => {
    const checks: [number, string, string, string, number][] = [
      [19, "Q", "P", "R", 45],
      [21, "L", "K", "N", 104],
      [22, "K", "N", "M", 98],
      [23, "P", "Q", "R", 120],
      [23, "P", "S", "R", 60],
      [32, "Q", "P", "R", 35],
      [32, "P", "S", "Q", 45],
      [33, "A", "D", "B", 30],
      [33, "A", "B", "D", 20],
      [35, "K", "N", "M", 55],
      [37, "P", "S", "Q", 30],
      [41, "Q", "O", "R", 50],
      [42, "P", "S", "Q", 25],
      [43, "P", "Q", "S", 35],
      [44, "P", "R", "Q", 40],
      [45, "B", "O", "D", 158],
      [46, "Q", "P", "S", 72],
      [46, "Q", "S", "R", 36],
      [47, "B", "C", "D", 126],
      [52, "K", "L", "M", 60],
    ];
    for (const [n, a, v, b, expected] of checks) {
      const p = circVertices(n);
      expect(angle(p[a], p[v], p[b]), `q${n} ${a}${v}${b}`).toBeCloseTo(
        expected,
        6,
      );
    }
  });
  it("draws true tangents perpendicular to their radii", () => {
    for (const n of [25, 26, 27, 28, 29, 30, 39, 40, 48, 49, 50, 51]) {
      const p = visual(6, n).panels[0],
        o = p.circles![0].centre,
        r = p.circles![0].radius;
      const tangents = p.paths!.filter(
        (l) =>
          l.points.length === 2 &&
          !l.points.some((pt) => Math.hypot(pt[0] - o[0], pt[1] - o[1]) < 1e-6),
      );
      expect(tangents.length, `q${n}`).toBeGreaterThan(0);
      for (const l of tangents) {
        const contact = l.points.find(
          (pt) => Math.abs(Math.hypot(pt[0] - o[0], pt[1] - o[1]) - r) < 1e-6,
        );
        if (!contact) continue;
        const end = l.points.find((pt) => pt !== contact)!;
        expect(
          (contact[0] - o[0]) * (end[0] - contact[0]) +
            (contact[1] - o[1]) * (end[1] - contact[1]),
          `q${n}`,
        ).toBeCloseTo(0, 6);
      }
    }
  });
  it("has no computed answers in numeric radius/length figures", () => {
    for (const [c, n, answer] of [
      [6, 28, "6.23"],
      [6, 38, "81.79"],
      [6, 44, "10.3"],
      [6, 48, "8.66"],
      [6, 51, "1.40"],
      [7, 36, "3 cm"],
      [7, 43, "h = 14"],
      [7, 45, "96"],
      [7, 46, "5 cm"],
      [7, 48, "120"],
    ] as const) {
      expect(JSON.stringify(visual(c, n)), `c${c}q${n}`).not.toContain(answer);
    }
  });
  it("distinguishes tilted-face angles from true angles using a consistent model", () => {
    // AB=AC=BC=4 in 3D; projecting by dropping z changes ABC from 60° to 45°.
    const A = [4, 0, 0],
      B = [0, 0, 0],
      C = [2, 2, Math.sqrt(8)],
      length = (a: number[], b: number[]) =>
        Math.hypot(...a.map((x, i) => x - b[i]));
    expect(length(A, B)).toBe(4);
    expect(length(A, C)).toBe(4);
    expect(length(B, C)).toBe(4);
    expect(angle([4, 0], [0, 0], [2, 2])).toBeCloseTo(45);
  });
  it("repairs the misleading normal statements in both languages", () => {
    for (const lang of ["bm", "dlp"] as const) {
      const bank = sources[7][lang];
      expect(bank[20].options[bank[20].answerIndex]).toBe("PT, QU, RV, SW");
      expect(bank[21].options[0]).toMatch(/XP ⟂ PQ.*XP ⟂ PR/);
      expect(bank[46].explanation).toMatch(
        lang === "bm" ? /garis yang sama/ : /same line/,
      );
    }
  });
  it("uses the same arc in the equal-angle illustration and verifies the final tangent problem", () => {
    const p = circVertices(1);
    expect(angle(p.A, p.B, p.C)).toBeCloseTo(angle(p.A, p.D, p.C), 8);
    const q = circVertices(55);
    expect(angle(q.A, q.B, q.C)).toBeCloseTo(110, 8);
    expect(angle(q.C, q.A, q.D)).toBeCloseTo(25, 8);
    expect(angle(q.A, q.C, q.D)).toBeCloseTo(85, 8);
  });
  it("keeps widths, depths and heights proportional across the three orthogonal views", () => {
    for (const n of [19, 34, 48]) {
      const [plan, front, side] = visual(7, n).panels.map(
        (p) => p.paths![0].points,
      );
      const width = (p: GeometryPoint[]) => p[1][0] - p[0][0],
        height = (p: GeometryPoint[]) => p[2][1] - p[1][1];
      expect(width(plan)).toBeCloseTo(width(front));
      expect(height(plan)).toBeCloseTo(width(side));
      expect(height(front)).toBeCloseTo(height(side));
      expect(width(plan) / height(plan)).toBeCloseTo(8 / 5);
      expect(width(front) / height(front)).toBeCloseTo(8 / 3);
    }
  });
  it("keeps label anchors within the SVG with space for text height", () => {
    for (const c of [6, 7] as const)
      for (const q of sources[c].bm)
        if (q.visual)
          for (const p of (q.visual as MathGeometryVisual).panels)
            for (const l of p.labels) {
              expect(
                l.at[1],
                q.id + " " + JSON.stringify(l.text),
              ).toBeLessThanOrEqual(233);
              expect(l.at[1], q.id).toBeGreaterThanOrEqual(18);
            }
  });
});

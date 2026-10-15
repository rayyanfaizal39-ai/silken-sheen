import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { QuizQuestion } from "@/data/content";
import type { MathQuestionVisual as Visual } from "@/features/quiz/visuals/mathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { buildPairedQuizBank, type PairedQuizSeed } from "./paired-quiz-bank";
import { drawnInteriorAngles } from "./visuals/polygon-visuals";
import { mathF2C3PairedSeeds as c3 } from "./chapter-3/quiz-bank";
import { mathF2C4PairedSeeds as c4 } from "./chapter-4/quiz-bank";
import { mathF2C5PairedSeeds as c5 } from "./chapter-5/quiz-bank";
import { mathF2C6PairedSeeds as c6 } from "./chapter-6/quiz-bank";
import { mathF2C7PairedSeeds as c7 } from "./chapter-7/quiz-bank";
import { mathF2C8PairedSeeds as c8 } from "./chapter-8/quiz-bank";
import { mathF2C9PairedSeeds as c9 } from "./chapter-9/quiz-bank";
import { mathF2C10PairedSeeds as c10 } from "./chapter-10/quiz-bank";
import { mathF2C11PairedSeeds as c11 } from "./chapter-11/quiz-bank";
import { mathF2C12PairedSeeds as c12 } from "./chapter-12/quiz-bank";
import { mathF2C13PairedSeeds as c13 } from "./chapter-13/quiz-bank";

const seeds = {
  3: c3,
  4: c4,
  5: c5,
  6: c6,
  7: c7,
  8: c8,
  9: c9,
  10: c10,
  11: c11,
  12: c12,
  13: c13,
} as const;
type Chapter = keyof typeof seeds;
const chapters = Object.keys(seeds).map(Number) as Chapter[];
const bank = (c: Chapter, lang: "bm" | "dlp" = "bm") =>
  buildPairedQuizBank(c, lang, seeds[c] as readonly PairedQuizSeed[]);
const all = (lang: "bm" | "dlp" = "bm") => chapters.flatMap((c) => bank(c, lang));
const byStem = (c: Chapter, start: string) => {
  const q = bank(c).find((item) => item.question.startsWith(start));
  if (!q) throw new Error(`No Chapter ${c} question starts with ${start}`);
  return q;
};
const answer = (q: QuizQuestion) => q.options[q.answerIndex];
const nums = (s: string) => (s.replace(/−/g, "-").match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);

describe("Math Form 2 final audit: bilingual options and distractor quality", () => {
  it("never shows a Bahasa Melayu option in a DLP question", () => {
    const bmOnly =
      /\b(Tidak|Tak|Ya|jam|dan|sahaja|Tiada|Sama|Bergantung|Betul|Salah|Kongruen|Positif|Negatif|Sifar)\b/;
    for (const q of all("dlp"))
      for (const option of q.options) expect(option, `${q.id}: ${option}`).not.toMatch(bmOnly);
  });

  it("never pads a question with the generic fallback options", () => {
    const fallbacks = [
      "Tiada antara pilihan",
      "None of the options",
      "Semua pilihan di atas",
      "All of the above",
      "Maklumat tidak mencukupi",
      "Insufficient information",
    ];
    for (const lang of ["bm", "dlp"] as const)
      for (const q of all(lang)) {
        for (const fallback of fallbacks) expect(q.options, q.id).not.toContain(fallback);
      }
  });

  // Numeric answers may repeat at most twice per block; two-way verdicts at most three times
  // (five yes/no items necessarily share one verdict at least three times).
  it("does not cluster one answer within any five-question block", () => {
    for (const c of chapters) {
      const questions = bank(c);
      for (let start = 0; start + 5 <= 90; start += 5) {
        const counts = new Map<string, number>();
        for (const q of questions.slice(start, start + 5))
          counts.set(answer(q), (counts.get(answer(q)) ?? 0) + 1);
        for (const [value, count] of counts) {
          expect(
            count,
            `Chapter ${c} questions ${start + 1}–${start + 5}: "${value}"`,
          ).toBeLessThan(/\d/.test(value) ? 3 : 4);
        }
      }
    }
  });

  it("prints no floating-point artefacts or hyphen-minus algebra", () => {
    for (const lang of ["bm", "dlp"] as const)
      for (const q of all(lang)) {
        const text = [q.question, q.explanation, ...q.options].join(" ");
        expect(text, q.id).not.toMatch(/\d\.\d{4,}/);
        expect(text, q.id).not.toMatch(/\b1x\b|[a-z²] [+−] 0(?![.\d])|\+ -|=-1x/);
      }
  });

  // Reason-style verdicts (collinearity, congruence) must not offer "right verdict, wrong reason".
  // Chapter 8's above/below and Chapter 7's which-coordinate options state distinct facts, so they are exempt.
  it("keeps reason-style verdict questions free of a second answer with the same verdict", () => {
    for (const q of [...bank(10), ...bank(11)]) {
      if (!/^(Adakah titik .* segaris|Segi empat tepat P|Segi tiga A\d)/.test(q.question)) continue;
      const verdict = (o: string) => o.split(";")[0];
      const correctVerdict = verdict(answer(q));
      const sameVerdict = q.options.filter(
        (o, i) => i !== q.answerIndex && verdict(o) === correctVerdict && o.includes(";"),
      );
      expect(sameVerdict, q.id).toEqual([]);
    }
  });
});

describe("Math Form 2 final audit: specific corrections stay corrected", () => {
  it("Chapter 3 no longer offers 24/3 (= 8) beside the answer 8", () => {
    expect(byStem(3, "Jika y = √(3x + 1) dan y = 5").options).not.toContain("24/3");
  });
  it("Chapter 5 states that O is the centre and uses Form 2 numbers", () => {
    const q = byStem(5, "O ialah pusat bulatan. Garis OP berserenjang");
    expect(q.explanation).not.toContain("Jejari serenjang");
    expect(answer(byStem(5, "Sektor 40° mempunyai luas 16π cm²"))).toBe("12 cm");
    expect(byStem(5, "Lilitan bulatan A melebihi").question).not.toMatch(/3 cm/);
  });
  it("Chapter 6 replaces five identical cone-to-cylinder items with distinct solids", () => {
    const questions = bank(6);
    expect(questions.filter((q) => q.question.includes("sebagai peratus"))).toHaveLength(0);
    expect(answer(byStem(6, "Sebuah kon padu"))).toBe("96π cm²");
    expect(answer(byStem(6, "Cari isi padu sebuah sfera"))).toBe("36π cm³");
    expect(answer(byStem(6, "Sebuah hemisfera padu"))).toBe("462 cm²");
    expect(answer(byStem(6, "Sebuah gabungan pepejal"))).toBe("102π cm³");
    expect(answer(byStem(6, "Sebuah bekas silinder tanpa penutup"))).toBe("594 cm²");
    for (const q of questions.filter((item) => item.question.startsWith("Kotak tertutup")))
      expect(answer(q)).toMatch(/^RM/);
  });
  it("Chapter 7 contains no Form 4 shoelace-method items", () => {
    for (const lang of ["bm", "dlp"] as const)
      for (const q of bank(7, lang)) {
        expect([q.question, q.explanation, ...q.options].join(" ")).not.toMatch(/kasut|shoelace/i);
      }
  });
  it("Chapter 9 has no zero-acceleration km/h items", () => {
    for (const q of bank(9).filter((item) => item.question.startsWith("Laju akhir kereta")))
      expect(nums(answer(q))[0]).toBeGreaterThan(0);
  });
  it("Chapter 13 two-children sample space uses L/P in BM and B/G in DLP", () => {
    const bm = byStem(13, "Nyatakan ruang sampel bagi jantina dua anak");
    const dlp = bank(13, "dlp").find((q) => q.id === bm.id.replace(/^bm-/, "dlp-"))!;
    expect(answer(bm)).toBe("{LL, LP, PL, PP}");
    expect(answer(dlp)).toBe("{BB, BG, GB, GG}");
  });
});

/** Every label, point name, tick and line label a visual prints. */
function printed(visual: Visual): string[] {
  switch (visual.kind) {
    case "geometry-diagram":
      return visual.panels.flatMap((p) =>
        p.labels.map((l) => (typeof l.text === "string" ? l.text : `${l.text.bm}|${l.text.dlp}`)),
      );
    case "coordinate-plane":
      return [
        ...(visual.points ?? []).map((p) => p.name),
        ...(visual.lines ?? []).map((l) =>
          String(typeof l.label === "object" ? l.label.bm : (l.label ?? "")),
        ),
      ];
    case "motion-graph":
      return [...visual.xTicks, ...visual.yTicks].map(String);
    default:
      return [];
  }
}

describe("Math Form 2 final audit: every visual is answer-neutral and renders", () => {
  const withVisuals = chapters.flatMap((c) =>
    bank(c)
      .filter((q) => q.visual)
      .map((q) => ({ c, q })),
  );

  it("covers 165 paired-bank question pairs with identical BM and DLP visuals", () => {
    expect(withVisuals).toHaveLength(165);
    for (const c of chapters) {
      const dlp = bank(c, "dlp");
      for (const [i, q] of bank(c).entries()) expect(dlp[i].visual).toEqual(q.visual);
    }
  });

  it("never prints the correct option's value on the diagram", () => {
    for (const { q } of withVisuals) {
      const correct = answer(q);
      // A given that happens to equal the answer (e.g. a stated 80° when x = 80°) is not a leak.
      const value = nums(correct);
      if (value.length > 0 && value.every((n) => nums(q.question).includes(n))) continue;
      const labels = printed(q.visual!);
      expect(labels, `${q.id} prints its answer ${correct}`).not.toContain(correct);
      if (q.visual!.kind === "motion-graph" && value.length === 1) {
        expect(labels.map(Number), `${q.id} tick equals answer ${correct}`).not.toContain(value[0]);
      }
    }
  });

  it("never plots a coordinate answer, and keeps every transformation inside one fixed ±10 window", () => {
    for (const { c, q } of withVisuals) {
      if (q.visual!.kind !== "coordinate-plane") continue;
      const value = nums(answer(q));
      // A point on the mirror line is its own image, so plotting the object necessarily shows it.
      const invariant = value.length === 2 && nums(q.question).join(",").includes(value.join(","));
      if (/^\(.*\)$/.test(answer(q)) && value.length === 2 && !invariant) {
        for (const p of q.visual!.points ?? [])
          expect(p.at, `${q.id} plots its answer`).not.toEqual(value);
      }
      if (c === 11) {
        expect(q.visual!.domain).toEqual([-10, 10, -10, 10]);
        if (value.length === 2) {
          expect(
            Math.abs(value[0]) <= 10 && Math.abs(value[1]) <= 10,
            `${q.id} image leaves the grid`,
          ).toBe(true);
        }
      }
    }
  });

  it("draws Chapter 4 polygons with their true angles (unknowns included)", () => {
    const expected: Record<string, number[]> = {
      "Tiga sudut sebuah segi empat": [80, 95, 105, 80],
      "Sudut sebuah pentagon ialah 100°": [100, 110, 120, 90, 120],
      "Sudut sebuah heksagon": [110, 125, 130, 115, 120, 120],
      "Sudut sebuah segi empat ialah x°": [75, 85, 95, 105],
      "Sudut sebuah pentagon ialah x°": [80, 90, 140, 110, 120],
      "Poligon ABCD": [100, 70, 100, 90],
      "ABCDE ialah pentagon": [130, 120, 110, 100, 80],
    };
    for (const [stem, angles] of Object.entries(expected)) {
      const visual = byStem(4, stem).visual;
      if (visual?.kind !== "geometry-diagram") throw new Error(stem);
      const drawn = drawnInteriorAngles(visual.panels[0].paths![0].points);
      drawn.forEach((angle, i) =>
        expect(Math.abs(angle - angles[i]), `${stem} corner ${i}`).toBeLessThan(0.5),
      );
    }
  });

  it("draws Chapter 5 chord figures to scale (radius : distance : half-chord)", () => {
    const cases: [string, number, number][] = [
      ["AB ialah perentas 16 cm", 10, 6],
      ["Jejari sebuah bulatan 13 cm", 13, 5],
      ["Perentas 30 cm terletak 8 cm", 17, 8],
      ["Jejari bulatan ialah 10 cm dan perentasnya 12 cm", 10, 8],
      ["AB ialah perentas 24 cm", 13, 5],
      ["Sebuah perentas 48 cm", 25, 7],
    ];
    for (const [stem, r, d] of cases) {
      const v = byStem(5, stem).visual;
      if (v?.kind !== "geometry-diagram") throw new Error(stem);
      const panel = v.panels[0];
      const R = panel.circles![0].radius;
      const [A, B] = panel.paths![0].points;
      const [O, Pf] = panel.paths![1].points;
      expect(Math.abs((Pf[1] - O[1]) / R - d / r), `${stem} distance`).toBeLessThan(0.01);
      expect(
        Math.abs((B[0] - A[0]) / 2 / R - Math.sqrt(r * r - d * d) / r),
        `${stem} half-chord`,
      ).toBeLessThan(0.01);
      expect(
        panel.labels.some((l) => String(l.text).includes("?")) || !stem.includes("Cari panjang"),
        stem,
      ).toBe(true);
    }
  });

  it("plots Chapter 10 graphs from the question's own numbers with axes from zero", () => {
    const graphs = withVisuals.filter(({ q }) => q.visual!.kind === "motion-graph");
    expect(graphs).toHaveLength(30);
    for (const { q } of graphs) {
      if (q.visual!.kind !== "motion-graph") continue;
      const v = q.visual!;
      const given = new Set(nums(q.question.replace(/^[^\d]*\d+[,:]? /, "")));
      for (const [time, value] of v.segments.flat()) {
        expect(time).toBeLessThan(v.xMax);
        expect(value).toBeLessThan(v.yMax);
        expect(time >= 0 && value >= 0).toBe(true);
      }
      for (const tick of v.yTicks)
        expect(given.has(tick), `${q.id} y-tick ${tick} not in the question`).toBe(true);
    }
  });

  it("renders every visual to static markup with an accessible description", () => {
    for (const { q } of withVisuals)
      for (const lang of ["bm", "dlp"] as const) {
        const html = renderToStaticMarkup(<MathQuestionVisual visual={q.visual!} lang={lang} />);
        expect(html, q.id).toContain(`data-math-visual="${q.visual!.kind}"`);
        expect(describeMathQuestionVisual(q.visual!, lang).length, q.id).toBeGreaterThan(20);
      }
  });
});

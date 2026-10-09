import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import * as registryModule from "@/content/registry";
import * as dataModule from "@/data/content";
import { MATH_F1_C12_QUIZ_VISUALS } from "@/content/form1/math/chapter-12/quiz-visuals";
import { MathObjectiveQuizScreen, resolveMathObjectiveQuestions } from "@/routes/quizzes";
import {
  dotPlotCounts,
  stemLeafRows,
  type MathQuestionVisual as MathQuestionVisualData,
} from "@/features/quiz/visuals/mathQuestionVisual";
import { MathQuestionVisual } from "./MathQuestionVisual";

// The quiz screen reads chapter labels through the lazily loaded registry;
// renderToStaticMarkup never runs effects, so resolve it synchronously.
vi.mock("@/hooks/use-content-registry", () => ({
  useContentRegistry: () => registryModule,
  useContentDataModule: () => dataModule,
}));

const V = MATH_F1_C12_QUIZ_VISUALS;
const render = (visual: Parameters<typeof MathQuestionVisual>[0]["visual"], lang: "bm" | "dlp") =>
  renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));

function bank(objective: "objective-1" | "objective-2" | "objective-3", lang: "bm" | "dlp") {
  return resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter: "Chapter 12",
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}

function renderScreen(
  question: ReturnType<typeof bank>[number],
  lang: "bm" | "dlp",
  answered: number | null = null,
) {
  return renderToStaticMarkup(
    createElement(MathObjectiveQuizScreen, {
      objective: {
        id: "objective-2",
        badge: "📗",
        title: "Objective 2 – Practice",
        purpose: [],
        tone: "",
      },
      subjectId: "math",
      chapterKey: "Chapter 12",
      scienceLang: lang,
      quizLang: lang,
      questions: [question],
      current: question,
      idx: 0,
      selected: answered,
      feedback:
        answered === null
          ? null
          : { kind: answered === question.answerIndex ? "correct" : "wrong", msg: "ok" },
      score: 0,
      onAnswer: () => undefined,
      onNext: () => undefined,
      onBack: () => undefined,
    }),
  );
}

describe("MathQuestionVisual", () => {
  const all = Object.values(V) as MathQuestionVisualData[];
  const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0;

  it("renders every Chapter 12 visual without images, canvas or animation", () => {
    for (const visual of all) {
      for (const lang of ["bm", "dlp"] as const) {
        const html = render(visual, lang);
        expect(html, visual.title.dlp).toContain(`data-math-visual="${visual.kind}"`);
        expect(html, visual.title.dlp).toContain(visual.title[lang].replace(/'/g, "&#x27;"));
        expect(html).not.toMatch(/<img|<canvas|<animate|transition|animation/);
      }
    }
  });

  it("renders frequency tables and stem-and-leaf plots as semantic tables with matching columns", () => {
    for (const visual of all) {
      if (visual.kind !== "frequency-table" && visual.kind !== "stem-leaf") continue;
      const html = render(visual, "dlp");
      expect(html).toContain("<caption");
      expect(count(html, /<th scope="col"/g)).toBe(2);
      const rows = html.split("<tbody>")[1].split("</tbody>")[0].split("<tr").slice(1);
      const expectedRows =
        visual.kind === "stem-leaf" ? stemLeafRows(visual.values).length : visual.rows.length;
      expect(rows).toHaveLength(expectedRows);
      for (const row of rows) {
        expect(count(row, /<th scope="row"/g) + count(row, /<td/g)).toBe(2);
      }
      if (visual.kind === "frequency-table") {
        for (const entry of visual.rows) expect(html).toContain(`>${entry.frequency}</td>`);
      }
    }
    expect(render(V.booksRead, "bm")).toContain(">Kekerapan<");
    const masses = render(V.studentMasses, "dlp");
    expect(masses).toContain(">Stem<");
    expect(masses).toContain("Key: 3 | 8 means 38 kg");
    // The empty stem 6 is shown, so the gap before the outlier 74 is visible.
    expect(masses).toMatch(/>6<\/th><td[^>]*><\/td>/);
    expect(render(V.studentMasses, "bm")).toContain("Kunci: 3 | 8 bermaksud 38 kg");
  });

  it("draws exactly one dot per observation in every dot plot, stacked by value", () => {
    for (const visual of all) {
      if (visual.kind !== "dot-plot") continue;
      const html = render(visual, "dlp");
      const circles = [...html.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => [
        Number(m[1]),
        Number(m[2]),
      ]);
      expect(circles).toHaveLength(visual.values.length);
      const columns = new Map<number, number>();
      for (const [x] of circles) columns.set(x, (columns.get(x) ?? 0) + 1);
      expect([...columns.values()]).toEqual(dotPlotCounts(visual.values).map(([, n]) => n));
      // Every tick from min to max is labelled.
      for (let tick = visual.min; tick <= visual.max; tick += 1) {
        expect(html).toContain(`>${tick}</text>`);
      }
    }
  });

  it("draws bars, histogram columns, line points and pie sectors from the data, with a 0-based axis", () => {
    for (const visual of all) {
      const html = render(visual, "dlp");
      switch (visual.kind) {
        case "bar-chart":
        case "histogram": {
          const values =
            visual.kind === "bar-chart"
              ? visual.bars.map((bar) => bar.value)
              : visual.classes.map((entry) => entry.frequency);
          expect(count(html, /<rect/g)).toBe(values.length);
          expect(html).toContain(">0</text>");
          for (const n of values) expect(html).toContain(`>${n}</text>`);
          const widths = [...html.matchAll(/<rect x="([\d.]+)" y="[\d.]+" width="([\d.]+)"/g)].map(
            (m) => [Number(m[1]), Number(m[2])],
          );
          for (let i = 1; i < widths.length; i += 1) {
            const gap = widths[i][0] - (widths[i - 1][0] + widths[i - 1][1]);
            // Histograms have no gaps; bar charts do.
            if (visual.kind === "histogram") expect(gap).toBeCloseTo(0);
            else expect(gap).toBeGreaterThan(5);
          }
          break;
        }
        case "line-graph":
        case "frequency-polygon": {
          const points = visual.series.reduce((sum, series) => sum + series.values.length, 0);
          expect(count(html, /<circle/g)).toBe(points);
          expect(count(html, /<polyline/g)).toBe(visual.series.length);
          expect(html).toContain(">0</text>");
          if (visual.showValues ?? true) {
            for (const n of visual.series[0].values) expect(html).toContain(`>${n}</text>`);
          }
          break;
        }
        case "pie-chart": {
          expect(count(html, /<path/g)).toBe(visual.sectors.length);
          for (const sector of visual.sectors) expect(html).toContain(`>${sector.text}</text>`);
          break;
        }
      }
    }
    const polygons = render(V.twoClassPolygons, "bm");
    expect(polygons).toContain("Kelas X");
    expect(polygons).toContain("Kelas Y");
  });

  it("describes each chart's data for screen readers without naming an answer", () => {
    const bars = render(V.roboticsClub, "bm");
    expect(bars).toContain('role="img"');
    expect(bars).toContain(
      'aria-label="Carta palang: Bilangan murid kelab robotik mengikut kelas. 1A: 8; 1B: 12; 1C: 6; 1D: 10; 1E: 4."',
    );
    expect(render(V.goalsScored, "dlp")).toContain(
      "Dot plot: Number of goals scored in each match. 0: 2 dots; 1: 4 dots; 2: 5 dots; 3: 3 dots; 4: 1 dot.",
    );
    expect(render(V.familySpending, "dlp")).toContain("Food: 120°; Rent: 90°");
    for (const visual of all) {
      if (visual.kind === "frequency-table" || visual.kind === "stem-leaf") continue;
      expect(render(visual, "dlp")).not.toMatch(/aria-label="[^"]*(the answer|jawapan)/i);
    }
  });
});

describe("MathObjectiveQuizScreen with question visuals", () => {
  const visualQuestion = bank("objective-2", "dlp")[1];
  const plainQuestion = bank("objective-2", "dlp")[3];

  it("shows the visual between the question and the answer options", () => {
    const html = renderScreen(visualQuestion, "dlp");
    const stem = html.indexOf("The bar chart shows the number of robotics club members");
    const visual = html.indexOf('data-math-visual="bar-chart"');
    const firstOption = html.indexOf("<button", visual);
    expect(stem).toBeGreaterThan(-1);
    expect(visual).toBeGreaterThan(stem);
    expect(firstOption).toBeGreaterThan(visual);
    expect(html.slice(visual).match(/<button[^>]*>/g)!.length).toBeGreaterThanOrEqual(4);
  });

  it("uses the BM labels on a BM attempt", () => {
    const html = renderScreen(bank("objective-2", "bm")[1], "bm");
    expect(html).toContain("Bilangan murid kelab robotik mengikut kelas");
    expect(html).not.toContain("Number of robotics club members by class");
  });

  it("keeps the visual on screen with the explanation and Next button after answering", () => {
    const html = renderScreen(visualQuestion, "dlp", visualQuestion.answerIndex);
    expect(html).toContain('data-math-visual="bar-chart"');
    expect(html).toContain("Difference = 12 − 4 = 8 students.");
    expect(html).toMatch(/<button type="button"[^>]*academy-action/);
  });

  it("renders a question without a visual exactly as before: no empty visual container", () => {
    expect(plainQuestion.visual).toBeUndefined();
    const html = renderScreen(plainQuestion, "dlp");
    expect(html).not.toContain("data-math-visual");
    expect(html).not.toContain("<figure");
    expect(html).not.toContain('role="img"');
    expect(html).not.toContain("<table");
    expect(html).toContain(plainQuestion.question);
    for (const option of plainQuestion.options) expect(html).toContain(option);
  });
});

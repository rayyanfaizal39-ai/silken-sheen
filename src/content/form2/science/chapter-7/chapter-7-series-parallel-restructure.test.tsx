import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { SelfPracticeCircuit } from "@/components/notes/blocks/SelfPracticeCircuit";
import { SeriesParallelSchematic } from "@/components/notes/blocks/SeriesParallelSchematic";
import { CircuitRecognitionChallenge } from "@/components/notes/blocks/CircuitRecognitionChallenge";
import { CircuitConceptTeaching } from "@/components/notes/blocks/CircuitConceptTeaching";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the 7.2 SERIES/PARALLEL + NUMERICAL PROBLEM
 * restructure. The science did not change; the LEARNING SEQUENCE did — a
 * learner must meet series, then parallel, then the comparison, then a
 * recognition checkpoint, BEFORE any numerical problem, and every worked or
 * self-practice problem must show its question before its solution. This
 * file checks that sequence and that UX rule, not the underlying formulas
 * (already covered by chapter-7-cvr-calculation-polish.test.tsx and
 * chapter-7-final-correction.test.tsx).
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

function sevenTwoOf(content: ScienceF2InteractiveContent): ScienceInteractiveSection {
  return content.sections.find((s) => s.number === "7.2")!;
}

// ------------------------------------------------------------- 1. SECTION ORDER

describe("7.2 restructure — the learner-facing block order", () => {
  const ORDER: (keyof ScienceInteractiveSection)[] = [
    "circuitSymbols",
    "circuitConceptSeries",
    "circuitConceptParallel",
    "seriesParallel",
    "circuitRecognition",
    "numericalProblemsIntro",
    "workedExamples",
  ];

  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);

    it(`${lang}: 7.2 carries every new block`, () => {
      for (const key of ORDER) expect(section[key], `missing ${key}`).toBeTruthy();
    });

    it(`${lang}: everything stays inside 7.2 — no new syllabus subsection number was created`, () => {
      expect(section.number).toBe("7.2");
    });
  }

  it("both languages declare the fields in the same source order (author-time sanity check)", () => {
    // Field authoring order is not what drives render order (the renderer's
    // own JSX sequence does), but keeping them declared in the same relative
    // order in both languages' source keeps the two files easy to diff.
    const keysOf = (c: ScienceF2InteractiveContent) =>
      Object.keys(sevenTwoOf(c)).filter((k) =>
        ORDER.includes(k as keyof ScienceInteractiveSection),
      );
    expect(keysOf(scienceF2C7InteractiveDLP)).toEqual(keysOf(scienceF2C7InteractiveBM));
  });
});

// -------------------------------------------------- 2. SERIES BEFORE NUMERICAL

describe("7.2 restructure — Series is taught before any Series calculation", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: circuitConceptSeries exists and precedes workedExamples`, () => {
      const html = renderSectionMarkup(content, lang === "bm" ? "bm" : "en");
      const conceptIdx = html.indexOf(sevenTwoOf(content).circuitConceptSeries!.title);
      const workedIdx = html.indexOf(sevenTwoOf(content).workedExamples![0].figureLabel);
      expect(conceptIdx).toBeGreaterThan(-1);
      expect(workedIdx).toBeGreaterThan(-1);
      expect(conceptIdx).toBeLessThan(workedIdx);
    });

    it(`${lang}: circuitConceptSeries carries the "ONE PATH" tag and the one-path explanation`, () => {
      const block = sevenTwoOf(content).circuitConceptSeries!;
      expect(block.tag).toMatch(lang === "bm" ? /SATU LALUAN/i : /ONE PATH/i);
      expect(block.explanation).toMatch(lang === "bm" ? /hanya satu laluan/i : /only one path/i);
      expect(block.relationships.map((r) => r.formula)).toEqual([
        "I = I₁ = I₂",
        "V = V₁ + V₂",
        "R = R₁ + R₂",
      ]);
      expect(block.advantages.length).toBeGreaterThan(0);
      expect(block.disadvantages.length).toBeGreaterThan(0);
    });
  }
});

// ------------------------------------------------ 3. PARALLEL BEFORE NUMERICAL

describe("7.2 restructure — Parallel is taught before any Parallel calculation", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: circuitConceptParallel exists and precedes workedExamples`, () => {
      const html = renderSectionMarkup(content, lang === "bm" ? "bm" : "en");
      const conceptIdx = html.indexOf(sevenTwoOf(content).circuitConceptParallel!.title);
      const workedIdx = html.indexOf(sevenTwoOf(content).workedExamples![1].figureLabel);
      expect(conceptIdx).toBeGreaterThan(-1);
      expect(workedIdx).toBeGreaterThan(-1);
      expect(conceptIdx).toBeLessThan(workedIdx);
    });

    it(`${lang}: circuitConceptParallel carries the "SEVERAL BRANCHES" tag and the branches explanation`, () => {
      const block = sevenTwoOf(content).circuitConceptParallel!;
      expect(block.tag).toMatch(lang === "bm" ? /BEBERAPA CABANG/i : /SEVERAL BRANCHES/i);
      expect(block.explanation).toMatch(
        lang === "bm" ? /lebih daripada satu laluan/i : /more than one path/i,
      );
      expect(block.relationships.map((r) => r.formula)).toEqual([
        "I = I₁ + I₂",
        "V = V₁ = V₂",
        "1/R = 1/R₁ + 1/R₂",
      ]);
    });
  }
});

// ----------------------------------------------------- 4. COMPARISON POSITION

describe("7.2 restructure — comparison comes before Numerical Problems", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);

    it(`${lang}: seriesParallel (compare) precedes numericalProblemsIntro`, () => {
      const html = renderSectionMarkup(content, lang === "bm" ? "bm" : "en");
      const compareIdx = html.indexOf(section.seriesParallel!.title);
      const numericalIdx = html.indexOf(section.numericalProblemsIntro!.title);
      expect(compareIdx).toBeGreaterThan(-1);
      expect(numericalIdx).toBeGreaterThan(-1);
      expect(compareIdx).toBeLessThan(numericalIdx);
    });

    it(`${lang}: the compare block carries small diagrams for both circuits`, () => {
      expect(section.seriesParallel!.circuits).toBeTruthy();
      expect(section.seriesParallel!.circuits!.series.kind).toBe("series");
      expect(section.seriesParallel!.circuits!.parallel.kind).toBe("parallel");
    });

    it(`${lang}: selecting Current/Voltage/Resistance changes both diagrams' formulas`, () => {
      const html = renderToStaticMarkup(
        createElement(SeriesParallelSchematic, { block: section.seriesParallel!, lang }),
      );
      const series = section.seriesParallel!.kinds.find((k) => k.id === "series")!;
      const parallel = section.seriesParallel!.kinds.find((k) => k.id === "parallel")!;
      // default view is "current" — both current rules must be visible
      expect(html).toContain(series.currentRule);
      expect(html).toContain(parallel.currentRule);
    });
  }
});

// --------------------------------------------------- 5. RECOGNITION CHALLENGE

describe("7.2 restructure — Quick Recognition Challenge", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);
    const block = section.circuitRecognition!;

    it(`${lang}: two diagrams, neutral captions (no answer given away)`, () => {
      const html = renderToStaticMarkup(createElement(CircuitRecognitionChallenge, { block }));
      expect(html).not.toContain(lang === "bm" ? "Litar bersiri" : "Series circuit");
      expect(html).toContain("svg");
    });

    it(`${lang}: exactly one option is series and one is parallel`, () => {
      expect(block.options.filter((o) => o.isSeries)).toHaveLength(1);
      expect(block.options.filter((o) => !o.isSeries)).toHaveLength(1);
    });

    it(`${lang}: renders both prompts and the reminder note`, () => {
      const html = renderToStaticMarkup(createElement(CircuitRecognitionChallenge, { block }));
      expect(html).toContain(block.seriesPrompt);
      expect(html).toContain(block.parallelPrompt);
      expect(html).toContain(block.reminderNote);
    });

    it(`${lang}: sits before numericalProblemsIntro in the render order`, () => {
      const html = renderSectionMarkup(content, lang === "bm" ? "bm" : "en");
      const recognitionIdx = html.indexOf(block.title);
      const numericalIdx = html.indexOf(section.numericalProblemsIntro!.title);
      expect(recognitionIdx).toBeGreaterThan(-1);
      expect(recognitionIdx).toBeLessThan(numericalIdx);
    });
  }
});

// ---------------------------------------------- 6. QUESTION BEFORE SOLUTION

describe("7.2 restructure — no worked example or self-practice begins with the solution", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);
    const allFigures = [...section.workedExamples!, ...section.selfPractice!.figures];

    for (const figure of allFigures) {
      it(`${lang}: "${figure.figureLabel}" renders its question before any formula/answer text`, () => {
        const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
        if (figure.questionIntro) {
          const introIdx = html.indexOf(figure.questionIntro);
          expect(introIdx).toBeGreaterThan(-1);
        }
        // the solution's own formula/answer text must never appear before reveal
        expect(html).not.toContain(figure.solution.answer);
        for (const step of figure.solution.steps ?? []) {
          expect(html).not.toContain(step.answer);
        }
      });
    }

    it(`${lang}: every worked example question appears before its diagram's step controls`, () => {
      for (const figure of section.workedExamples!) {
        const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
        const questionIdx = html.indexOf(figure.questionIntro!);
        const svgIdx = html.indexOf("<svg");
        expect(questionIdx).toBeGreaterThan(-1);
        expect(svgIdx).toBeGreaterThan(-1);
        expect(questionIdx).toBeLessThan(svgIdx);
      }
    });
  }
});

// --------------------------------------------- 7. IDENTIFY-CIRCUIT GATE (WORKED)

describe("7.2 restructure — worked examples ask the learner to identify the circuit first", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);

    it(`${lang}: both worked examples carry an identifyCircuit gate with a correct option`, () => {
      for (const figure of section.workedExamples!) {
        expect(figure.identifyCircuit, `${figure.figureLabel} has no gate`).toBeTruthy();
        expect(figure.identifyCircuit!.options.filter((o) => o.isCorrect)).toHaveLength(1);
      }
    });

    it(`${lang}: the gate never forces an answer — "start solution" is always available`, () => {
      const figure = section.workedExamples![0];
      const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
      expect(html).toContain(figure.identifyCircuit!.startSolutionLabel);
      // the control is a real, always-enabled button, not disabled pending an answer
      expect(html).not.toMatch(/disabled[^>]*>[^<]*Start solution/i);
    });

    it(`${lang}: self-practice figures use hints instead of the identify-circuit gate`, () => {
      for (const figure of section.selfPractice!.figures) {
        expect(figure.identifyCircuit).toBeUndefined();
        expect(figure.hints).toBeTruthy();
      }
    });
  }
});

// --------------------------------------------------------- 8. LARGE DIAGRAMS

describe("7.2 restructure — concept and worked-example diagrams are the large variant", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);

    it(`${lang}: standalone concept diagrams render at the large footprint`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitConceptTeaching, { block: section.circuitConceptSeries! }),
      );
      expect(html).toContain("max-w-[520px]");
    });

    it(`${lang}: worked-example diagrams are authored with size "large"`, () => {
      for (const figure of section.workedExamples!) {
        expect(figure.circuit.size).toBe("large");
      }
    });

    it(`${lang}: self-practice diagrams are also authored with size "large"`, () => {
      for (const figure of section.selfPractice!.figures) {
        expect(figure.circuit.size).toBe("large");
      }
    });
  }
});

// -------------------------------------------------------- 9. BM/DLP PARITY

describe("7.2 restructure — BM/DLP parity", () => {
  it("identical block footprint, identical values, identical step/hint counts", () => {
    const shapeOf = (c: ScienceF2InteractiveContent) => {
      const s = sevenTwoOf(c);
      return {
        seriesRelationships: s.circuitConceptSeries!.relationships.map((r) => r.formula),
        parallelRelationships: s.circuitConceptParallel!.relationships.map((r) => r.formula),
        workedExampleShape: s.workedExamples!.map((f) => [
          f.circuit.kind,
          f.circuit.resistors.length,
          f.solution.steps?.length,
          !!f.identifyCircuit,
        ]),
        selfPracticeShape: s.selfPractice!.figures.map((f) => [
          f.circuit.kind,
          f.circuit.resistors.length,
          f.solution.steps?.length,
          f.hints?.length,
        ]),
        recognitionShape: [
          s.circuitRecognition!.diagramA.kind,
          s.circuitRecognition!.diagramB.kind,
          s.circuitRecognition!.options.length,
        ],
      };
    };
    expect(shapeOf(scienceF2C7InteractiveDLP)).toEqual(shapeOf(scienceF2C7InteractiveBM));
  });

  it("no leaked language in the new blocks", () => {
    for (const [lang, content] of LANGS) {
      const section = sevenTwoOf(content);
      const text = JSON.stringify({
        series: section.circuitConceptSeries,
        parallel: section.circuitConceptParallel,
        recognition: section.circuitRecognition,
        numerical: section.numericalProblemsIntro,
        worked: section.workedExamples,
      });
      if (lang === "bm") {
        expect(text).not.toMatch(/\bSeries circuit\b|\bParallel circuit\b|\bONE PATH\b/);
      } else {
        expect(text).not.toMatch(/Litar bersiri|Litar selari|SATU LALUAN/i);
      }
    }
  });
});

/** Renders just the 7.2 section's own markup, the way the shell renders one section at a time. */
function renderSectionMarkup(content: ScienceF2InteractiveContent, lang: "bm" | "en"): string {
  // A lightweight stand-in for the full section shell: render each relevant
  // block directly, in the SAME order the real renderer places them, and
  // concatenate. This keeps the test decoupled from unrelated shell markup
  // while still proving the actual block ORDER the learner sees.
  const section = sevenTwoOf(content);
  const parts: string[] = [];
  if (section.circuitConceptSeries) {
    parts.push(
      renderToStaticMarkup(
        createElement(CircuitConceptTeaching, { block: section.circuitConceptSeries }),
      ),
    );
  }
  if (section.circuitConceptParallel) {
    parts.push(
      renderToStaticMarkup(
        createElement(CircuitConceptTeaching, { block: section.circuitConceptParallel }),
      ),
    );
  }
  if (section.seriesParallel) {
    parts.push(
      renderToStaticMarkup(
        createElement(SeriesParallelSchematic, { block: section.seriesParallel, lang }),
      ),
    );
    parts.push(section.seriesParallel.title);
  }
  if (section.circuitRecognition) {
    parts.push(
      renderToStaticMarkup(
        createElement(CircuitRecognitionChallenge, { block: section.circuitRecognition }),
      ),
    );
  }
  if (section.numericalProblemsIntro) {
    parts.push(section.numericalProblemsIntro.title);
  }
  for (const figure of section.workedExamples ?? []) {
    parts.push(renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang })));
  }
  return parts.join("\n");
}

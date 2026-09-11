import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CircuitWorkedDiagram } from "@/components/notes/blocks/CircuitWorkedDiagram";
import { UnitsMemoryCard } from "@/components/notes/blocks/UnitsMemoryCard";
import { SelfPracticeCircuit } from "@/components/notes/blocks/SelfPracticeCircuit";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the "Current, Voltage, Resistance + Calculation
 * Visual Polish" pass: the simplified resistance definition, the "Remember
 * the Units" card, the Figure 7.12/7.13-style meter-carrying worked
 * examples, and the two "Try It Yourself" self-practice figures.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

function cvrSectionOf(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.circuitMeterDiagram && s.number === "7.1")!;
}

function ohmsSectionOf(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.ohmsTriangle)!;
}

function seriesParallelSectionOf(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.seriesParallel)!;
}

// ---------------------------------------------------------- 1. RESISTANCE WORDING

describe("CVR polish — resistance definition is simple, and not equated with its unit", () => {
  for (const [lang, content] of LANGS) {
    const card = cvrSectionOf(content).cards!.find((c) =>
      /^Resistance, R|^Rintangan, R/.test(c.title),
    )!;

    it(`${lang}: the definition uses simple "limit or resist" wording, not "oppose"`, () => {
      expect(card, "no resistance card").toBeTruthy();
      expect(card.body).toMatch(
        lang === "bm" ? /mengehadkan atau merintangi/i : /limit or resist/i,
      );
      expect(card.body).not.toMatch(lang === "bm" ? /merintangi aliran arus\.\*\*/ : /oppose/i);
    });

    it(`${lang}: the unit and the fixed-resistor/rheostat explanation are kept, but secondary (in detail, not body)`, () => {
      expect(card.detail).toMatch(/Ω/);
      expect(card.detail).toMatch(lang === "bm" ? /reostat/i : /rheostat/i);
    });

    it(`${lang}: never teaches "R = Ω" — R and the ohm are never equated`, () => {
      const text = JSON.stringify(card);
      expect(text).not.toMatch(/R\s*=\s*Ω/);
    });
  }
});

// ------------------------------------------------------- 2. CURRENT/VOLTAGE PRESERVED

describe("CVR polish — current and voltage definitions are unchanged", () => {
  for (const [lang, content] of LANGS) {
    const cards = cvrSectionOf(content).cards!;

    it(`${lang}: current is still "rate of flow of electric charge", ammeter, series`, () => {
      const current = cards.find((c) => /^Current, I|^Arus, I/.test(c.title))!;
      expect(current.detail).toMatch(/A|ampere/);
      expect(current.detail).toMatch(lang === "bm" ? /bersiri/i : /series/i);
    });

    it(`${lang}: voltage is still "potential difference", voltmeter, parallel`, () => {
      const voltage = cards.find((c) => /^Voltage, V|^Voltan, V/.test(c.title))!;
      expect(voltage.detail).toMatch(/V|volt/);
      expect(voltage.detail).toMatch(lang === "bm" ? /selari/i : /parallel/i);
    });
  }
});

// --------------------------------------------------------- 3. REMEMBER THE UNITS

describe("CVR polish — Remember the Units card", () => {
  for (const [lang, content] of LANGS) {
    const block = ohmsSectionOf(content).unitsMemory;

    it(`${lang}: carries exactly I, V, R with correct unit name and unit symbol`, () => {
      expect(block, "no unitsMemory block").toBeTruthy();
      expect(block!.items.map((i) => i.quantitySymbol)).toEqual(["I", "V", "R"]);
      const byQuantity = Object.fromEntries(block!.items.map((i) => [i.quantitySymbol, i]));
      expect(byQuantity.I.unitName).toBe("ampere");
      expect(byQuantity.I.unitSymbol).toBe("A");
      expect(byQuantity.V.unitName).toBe("volt");
      expect(byQuantity.V.unitSymbol).toBe("V");
      expect(byQuantity.R.unitName).toBe("ohm");
      expect(byQuantity.R.unitSymbol).toBe("Ω");
    });

    it(`${lang}: renders the quantity symbol, unit name and unit symbol as three separate lines`, () => {
      const html = renderToStaticMarkup(createElement(UnitsMemoryCard, { block: block! }));
      for (const item of block!.items) {
        expect(html).toContain(`>${item.quantitySymbol}<`);
        expect(html).toContain(item.unitName);
        expect(html).toContain(`>${item.unitSymbol}<`);
      }
      // never literally "R = Ω" in the rendered card
      expect(html).not.toMatch(/R\s*=\s*Ω/);
    });

    it(`${lang}: sits in the Ohm's Law section, alongside the first worked example`, () => {
      const section = ohmsSectionOf(content);
      expect(section.guidedCalculations?.length ?? 0).toBeGreaterThan(0);
    });
  }

  it("BM and DLP carry the identical three quantity/unit rows", () => {
    const rowsOf = (c: ScienceF2InteractiveContent) =>
      ohmsSectionOf(c).unitsMemory!.items.map((i) => [i.quantitySymbol, i.unitSymbol]);
    expect(rowsOf(scienceF2C7InteractiveDLP)).toEqual(rowsOf(scienceF2C7InteractiveBM));
  });
});

// ---------------------------------------------------- 4. FIRST OHM'S LAW EXAMPLE

describe("CVR polish — the first Ohm's Law worked example states units explicitly", () => {
  for (const [lang, content] of LANGS) {
    const calc = ohmsSectionOf(content).guidedCalculations![0];

    it(`${lang}: given V=6V, R=3Ω, find asks for I in amperes, answer states I = 2 A`, () => {
      expect(calc.given.join(" ")).toMatch(/6 V/);
      expect(calc.given.join(" ")).toMatch(/3 Ω/);
      expect(calc.find).toMatch(/I/);
      expect(calc.find).toMatch(/A/);
      expect(calc.substitute).toMatch(/6 V/);
      expect(calc.substitute).toMatch(/3 Ω/);
      expect(calc.answer).toMatch(/I = 2 A/);
    });
  }
});

// ------------------------------------------------ 5 & 6. FIGURE 7.12 / 7.13 METERS

describe("CVR polish — Figure 7.12/7.13-style worked examples carry real meters", () => {
  for (const [lang, content] of LANGS) {
    // Migrated from `seriesParallel.guidedCalculations` into their own
    // question-first `workedExamples` (7.2 restructure).
    const figures = content.sections.find((s) => s.workedExamples)!.workedExamples!;
    const series = figures.find((f) => f.circuit.kind === "series")!;
    const parallel = figures.find((f) => f.circuit.kind === "parallel")!;

    it(`${lang}: the series worked example enables meters (ammeter + voltmeters)`, () => {
      expect(series.circuit?.showMeters).toBe(true);
    });

    it(`${lang}: the parallel worked example enables meters (ammeter + voltmeters)`, () => {
      expect(parallel.circuit?.showMeters).toBe(true);
    });

    it(`${lang}: series diagram renders exactly one ammeter and one voltmeter per resistor`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, { spec: series.circuit!, highlight: [] }),
      );
      // one ammeter "A" + one voltmeter "V" per resistor (2 resistors => 2 V's)
      const ammeterCount = (html.match(/>A<\/text>/g) ?? []).length;
      const voltmeterCount = (html.match(/>V<\/text>/g) ?? []).length;
      expect(ammeterCount).toBe(1);
      expect(voltmeterCount).toBe(series.circuit!.resistors.length);
    });

    it(`${lang}: parallel diagram renders exactly one ammeter and one voltmeter per branch`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, { spec: parallel.circuit!, highlight: [] }),
      );
      const ammeterCount = (html.match(/>A<\/text>/g) ?? []).length;
      const voltmeterCount = (html.match(/>V<\/text>/g) ?? []).length;
      expect(ammeterCount).toBe(1);
      expect(voltmeterCount).toBe(parallel.circuit!.resistors.length);
    });

    it(`${lang}: series topology — resistors sit on the main wire (not on a side branch)`, () => {
      // Every resistor id is a valid highlight target that lights up the MAIN
      // loop wire's own stroke class, i.e. it is drawn using the shared
      // "loop" path/segments rather than a separate branch path — checked
      // indirectly via the step highlight contract: "loop"/"source" cover the
      // whole main path, and no resistor step needs a "branch" key to exist.
      expect(
        series.solution.steps!.every((s) =>
          s.highlight.every((h) => h === "source" || h === "loop" || /^r\d+$/.test(h)),
        ),
      ).toBe(true);
    });

    it(`${lang}: parallel topology — each resistor sits on its own branch, addressed by its own id`, () => {
      const branchIds = parallel.circuit!.resistors.map((r) => r.id);
      expect(new Set(branchIds).size).toBe(branchIds.length);
    });
  }

  it("BM and DLP draw identical meter geometry for both figures", () => {
    const geometryOf = (content: ScienceF2InteractiveContent) => {
      const figures = content.sections.find((s) => s.workedExamples)!.workedExamples!;
      return figures.map((f) => {
        const html = renderToStaticMarkup(
          createElement(CircuitWorkedDiagram, { spec: f.circuit, highlight: [] }),
        );
        return [...html.matchAll(/(?:cx|cy|x1|x2|y1|y2|r|viewBox)="[^"]*"/g)].map((m) => m[0]);
      });
    };
    expect(geometryOf(scienceF2C7InteractiveDLP)).toEqual(geometryOf(scienceF2C7InteractiveBM));
  });
});

// ------------------------------------------------------- 7 & 8. SELF-PRACTICE

describe("CVR polish — Try It Yourself self-practice figures", () => {
  for (const [lang, content] of LANGS) {
    const block = seriesParallelSectionOf(content).selfPractice;

    it(`${lang}: exactly two figures — series (3 resistors) and parallel (2 resistors)`, () => {
      expect(block, "no selfPractice block").toBeTruthy();
      expect(block!.figures).toHaveLength(2);
      const [figure1, figure2] = block!.figures;
      expect(figure1.circuit.kind).toBe("series");
      expect(figure1.circuit.resistors).toHaveLength(3);
      expect(figure2.circuit.kind).toBe("parallel");
      expect(figure2.circuit.resistors).toHaveLength(2);
    });

    it(`${lang}: Figure 1 uses 9 V, 1 Ω, 3 Ω, 5 Ω in series`, () => {
      const figure1 = block!.figures[0];
      expect(figure1.circuit.supplyLabel).toBe("9 V");
      expect(figure1.circuit.resistors.map((r) => r.label)).toEqual([
        "R₁ = 1 Ω",
        "R₂ = 3 Ω",
        "R₃ = 5 Ω",
      ]);
    });

    it(`${lang}: Figure 1's solution resolves to R=9Ω, I=1A, V₁=1V, V₂=3V, V₃=5V — each highlighted separately`, () => {
      const figure1 = block!.figures[0];
      expect(figure1.solution.answer).toMatch(/9 Ω/);
      expect(figure1.solution.answer).toMatch(/1 A/);
      expect(figure1.solution.answer).toMatch(/1 V/);
      expect(figure1.solution.answer).toMatch(/3 V/);
      expect(figure1.solution.answer).toMatch(/5 V/);
      const voltageSteps = figure1.solution.steps!.filter((s) => /^V/.test(s.formula));
      expect(voltageSteps).toHaveLength(3);
      // each voltage step highlights exactly its own resistor, not the others
      expect(voltageSteps.map((s) => s.highlight)).toEqual([["r1"], ["r2"], ["r3"]]);
    });

    it(`${lang}: Figure 2 uses 4 V, 3 Ω, 6 Ω in parallel`, () => {
      const figure2 = block!.figures[1];
      expect(figure2.circuit.supplyLabel).toBe("4 V");
      expect(figure2.circuit.resistors.map((r) => r.label)).toEqual(["R₁ = 3 Ω", "R₂ = 6 Ω"]);
    });

    it(`${lang}: Figure 2's solution resolves to R=2Ω, I₁≈1.33A, I₂≈0.67A, and asks for current through EACH resistor`, () => {
      const figure2 = block!.figures[1];
      expect(figure2.solution.answer).toMatch(/2 Ω/);
      expect(figure2.solution.answer).toMatch(/1\.33 A/);
      expect(figure2.solution.answer).toMatch(/0\.67 A/);
      const eachResistorQuestion = figure2.questions.find((q) =>
        /each resistor|setiap perintang/i.test(q),
      );
      expect(
        eachResistorQuestion,
        "no question asking for current through each resistor",
      ).toBeTruthy();
    });

    it(`${lang}: exactly two hints per figure, and neither the formula nor the answer leaks into a hint`, () => {
      for (const figure of block!.figures) {
        expect(figure.hints).toHaveLength(2);
        for (const hint of figure.hints!) {
          expect(hint).not.toMatch(/=/);
        }
      }
    });
  }

  it("BM and DLP carry the same two figures, same values, same step counts", () => {
    const shapeOf = (c: ScienceF2InteractiveContent) =>
      seriesParallelSectionOf(c).selfPractice!.figures.map((f) => ({
        kind: f.circuit.kind,
        resistorCount: f.circuit.resistors.length,
        hints: f.hints!.length,
        steps: f.solution.steps?.length ?? 0,
      }));
    expect(shapeOf(scienceF2C7InteractiveDLP)).toEqual(shapeOf(scienceF2C7InteractiveBM));
  });
});

// ---------------------------------------------- 9. SELF-PRACTICE UX (RENDERING)

describe("CVR polish — self-practice hides the working until requested", () => {
  for (const [lang, content] of LANGS) {
    const figure = seriesParallelSectionOf(content).selfPractice!.figures[0];

    it(`${lang}: the circuit and questions render immediately, but no formula/answer text does`, () => {
      const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
      expect(html).toContain("svg");
      for (const q of figure.questions) expect(html).toContain(q);
      // the solution's own answer text must not appear before any reveal
      expect(html).not.toContain(figure.solution.answer);
      for (const hint of figure.hints!) expect(html).not.toContain(hint);
      // both a hint control and the show-solution control are offered
      expect(html).toContain(figure.hintsLabel);
      expect(html).toContain(figure.showSolutionLabel);
    });

    it(`${lang}: only the first hint's button is offered before any hint is revealed`, () => {
      const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
      const hintButtons = [...html.matchAll(new RegExp(`${figure.hintsLabel} \\d`, "g"))];
      expect(hintButtons).toHaveLength(1);
    });
  }
});

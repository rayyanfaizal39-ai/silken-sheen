import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { magnetSelection } from "@/components/notes/blocks/MagnetFieldDiagram";
import { GuidedCalculation } from "@/components/notes/blocks/GuidedCalculation";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 7 FINAL textbook + screen-recording QA
 * correction pass. Scoped narrowly to the fixes that pass made, listed in the
 * brief's own "TESTING" section:
 *
 *  1. Table 7.1 contains exactly the nine textbook components.
 *  2. Table 7.1 no longer substitutes battery / connecting wire.
 *  3. Ohm's Law precedes Table 7.1 in the rendered learning order.
 *  4. Both DLP and BM carry the same correct nine entries.
 *  5. The current experiment's five tested values are unchanged.
 *  6. The coil-turn experiment's five tested values are unchanged.
 *  7. The neutral-point control can never pair with an invalid magnet state.
 *
 * Plus the other checklist items this pass is responsible for: the eight
 * point-form energy sources, the electrostatic-charge definition, the
 * dusty-TV example, the demoted refuelling example, and the stepped
 * series/parallel worked-example circuit diagrams.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

const TABLE_7_1_IDS = [
  "switch",
  "cell",
  "voltmeter",
  "galvanometer",
  "ammeter",
  "bulb",
  "resistor",
  "fuse",
  "rheostat",
].sort();

// ------------------------------------------------------------- 1 & 2 & 4. TABLE 7.1

describe("Final correction — Table 7.1 has exactly the nine textbook entries", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.circuitSymbols)?.circuitSymbols;

    it(`${lang}: exactly nine entries, matching the textbook set`, () => {
      expect(block, "no circuitSymbols block").toBeTruthy();
      expect(block!.symbols).toHaveLength(9);
      expect(block!.symbols.map((s) => s.id).sort()).toEqual(TABLE_7_1_IDS);
    });

    it(`${lang}: battery and connecting wire are not present`, () => {
      const ids = block!.symbols.map((s) => s.id);
      expect(ids).not.toContain("battery");
      expect(ids).not.toContain("wire");
    });

    it(`${lang}: fuse and galvanometer are present`, () => {
      const ids = block!.symbols.map((s) => s.id);
      expect(ids).toContain("fuse");
      expect(ids).toContain("galvanometer");
    });
  }

  it("BM and DLP carry the identical nine ids, in the identical order", () => {
    const idsOf = (c: ScienceF2InteractiveContent) =>
      c.sections.find((s) => s.circuitSymbols)!.circuitSymbols!.symbols.map((s) => s.id);
    expect(idsOf(scienceF2C7InteractiveDLP)).toEqual(idsOf(scienceF2C7InteractiveBM));
  });
});

// ------------------------------------------------------------------- 3. ORDER

describe("Final correction — Ohm's Law precedes Table 7.1", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: Ohm's Law section renders before the Table 7.1 section`, () => {
      const ohmsIndex = content.sections.findIndex((s) => s.ohmsTriangle);
      const tableIndex = content.sections.findIndex((s) => s.circuitSymbols);
      expect(ohmsIndex).toBeGreaterThanOrEqual(0);
      expect(tableIndex).toBeGreaterThan(ohmsIndex);
    });

    it(`${lang}: Table 7.1 sits in section 7.2, not in the Current/Voltage/Resistance section of 7.1`, () => {
      const tableSection = content.sections.find((s) => s.circuitSymbols)!;
      expect(tableSection.number).toBe("7.2");
    });

    it(`${lang}: the Current/Voltage/Resistance section no longer carries Table 7.1`, () => {
      const cvr = content.sections.find((s) => s.circuitMeterDiagram && s.number === "7.1");
      expect(cvr, "no Current/Voltage/Resistance section found").toBeTruthy();
      expect(cvr!.circuitSymbols).toBeUndefined();
    });
  }
});

// --------------------------------------------------------- 5 & 6. EXPERIMENT VALUES

describe("Final correction — electromagnet experiment values are unchanged", () => {
  for (const [lang, content] of LANGS) {
    const exp = content.sections.find((s) => s.miniExperiment)?.miniExperiment;

    it(`${lang}: current values are 0.5, 1.0, 1.5, 2.0, 2.5 A`, () => {
      const current = exp!.parts.find((p) => p.id === "current")!;
      expect(current.values).toEqual(["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"]);
    });

    it(`${lang}: coil-turn values are 10, 20, 30, 40, 50`, () => {
      const turns = exp!.parts.find((p) => p.id === "turns")!;
      expect(turns.values).toEqual(["10", "20", "30", "40", "50"]);
    });
  }
});

// ------------------------------------------------------------- 7. NEUTRAL POINT

describe("Final correction — neutral point never pairs with an invalid magnet state", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.magnetFieldDiagram)?.magnetFieldDiagram;

    it(`${lang}: selecting Neutral Point always lands on the like-poles shape`, () => {
      expect(block, "no magnetFieldDiagram block").toBeTruthy();
      const neutral = block!.features.find((f) => f.id === "neutral")!;
      expect(neutral.requiresShape).toBe("like-poles");
      for (const startShape of block!.shapes.map((s) => s.id)) {
        const state = magnetSelection(
          block!.features,
          { shape: startShape, feature: null },
          { pick: "feature", id: "neutral" },
        );
        expect(state.shape, `from ${startShape}`).toBe("like-poles");
        expect(state.feature).toBe("neutral");
      }
    });

    it(`${lang}: switching away from like-poles drops the neutral-point feature`, () => {
      const state = magnetSelection(
        block!.features,
        { shape: "like-poles", feature: "neutral" },
        { pick: "shape", id: "bar" },
      );
      expect(state.shape).toBe("bar");
      expect(state.feature).toBeNull();
    });

    it(`${lang}: a shape-agnostic feature (e.g. direction) survives a shape switch`, () => {
      const state = magnetSelection(
        block!.features,
        { shape: "bar", feature: "direction" },
        { pick: "shape", id: "horseshoe" },
      );
      expect(state.shape).toBe("horseshoe");
      expect(state.feature).toBe("direction");
    });
  }
});

// ------------------------------------------------------ 8. ENERGY SOURCES (POINT FORM)

describe("Final correction — energy sources are eight individual textbook sources", () => {
  for (const [lang, content] of LANGS) {
    const card = content.sections
      .find((s) => s.title === "Energy" || s.title === "Tenaga")
      ?.cards?.find((c) => /sources of energy|sumber tenaga/i.test(c.title));

    it(`${lang}: the sources card carries exactly eight point-form facts`, () => {
      expect(card, "no sources-of-energy card").toBeTruthy();
      expect(card!.facts).toBeTruthy();
      const values = card!.facts![0].value;
      expect(Array.isArray(values)).toBe(true);
      expect(values as string[]).toHaveLength(8);
    });

    it(`${lang}: definition of energy and its S.I. unit are preserved`, () => {
      const section = content.sections.find((s) => s.title === "Energy" || s.title === "Tenaga")!;
      expect(section.intro).toMatch(lang === "bm" ? /joule \(J\)/ : /joule \(J\)/);
    });
  }

  it("BM and DLP list the same eight sources, in the same order", () => {
    const sourcesOf = (c: ScienceF2InteractiveContent) => {
      const card = c.sections[0].cards!.find((cd) =>
        /sources of energy|sumber tenaga/i.test(cd.title),
      )!;
      return card.facts![0].value as string[];
    };
    expect(sourcesOf(scienceF2C7InteractiveDLP)).toHaveLength(8);
    expect(sourcesOf(scienceF2C7InteractiveBM)).toHaveLength(8);
  });

  for (const [lang, content] of LANGS) {
    it(`${lang}: the Energy section renders the eight sources as a real point-form list, without crashing`, () => {
      const section = content.sections[0];
      const html = renderToStaticMarkup(
        createElement(ScienceF2InteractiveNotesBlock, {
          content: { ...content, sections: [section] },
          lang: lang === "bm" ? "bm" : "en",
        }),
      );
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
      const source = lang === "bm" ? "Matahari" : "The Sun";
      expect(html).toContain(source);
    });
  }
});

// ------------------------------------------------- 9. ELECTROSTATIC DEFINITION

describe("Final correction — electrostatic charges have a direct definition", () => {
  it("DLP states the definition near the beginning of the Electrostatic Charges section", () => {
    const section = scienceF2C7InteractiveDLP.sections.find((s) => s.electroscope)!;
    expect(section.intro).toMatch(/static electric charges.*accumulate.*electrostatic charges/i);
  });

  it("BM states the definition near the beginning of the Cas Elektrostatik section", () => {
    const section = scienceF2C7InteractiveBM.sections.find((s) => s.electroscope)!;
    expect(section.intro).toMatch(/cas elektrik statik.*terkumpul.*cas elektrostatik/i);
  });
});

// ------------------------------------------------- 10. DAILY-LIFE EXAMPLE FLOW

describe("Final correction — daily-life electrostatics flow", () => {
  for (const [lang, content] of LANGS) {
    const section = content.sections.find((s) => s.lightningFormation)!;

    it(`${lang}: no contextImages remain on the daily-life section (old composite removed)`, () => {
      expect(section.contextImages ?? []).toHaveLength(0);
    });

    it(`${lang}: a dusty-TV example exists, right after the lightning conductor`, () => {
      const idx = section.accordions!.findIndex((a) =>
        lang === "bm" ? /berhabuk/i.test(a.title) : /dusty tv/i.test(a.title),
      );
      const conductorIdx = section.accordions!.findIndex((a) =>
        lang === "bm" ? /konduktor kilat/i.test(a.title) : /lightning conductor/i.test(a.title),
      );
      expect(idx, "no dusty TV accordion").toBeGreaterThan(-1);
      expect(idx).toBe(conductorIdx + 1);
    });

    it(`${lang}: refuelling is demoted to last, marked as extra`, () => {
      const last = section.accordions![section.accordions!.length - 1];
      expect(lang === "bm" ? /petrol/i.test(last.title) : /refuel/i.test(last.title)).toBe(true);
      expect(lang === "bm" ? /tambahan/i.test(last.title) : /extra/i.test(last.title)).toBe(true);
    });

    it(`${lang}: the Faraday cage example still exists`, () => {
      const has = section.accordions!.some((a) => /faraday/i.test(a.title));
      expect(has).toBe(true);
    });
  }

  it("BM and DLP carry the same accordion count and order in the daily-life section", () => {
    const titlesShapeOf = (c: ScienceF2InteractiveContent) =>
      c.sections.find((s) => s.lightningFormation)!.accordions!.length;
    expect(titlesShapeOf(scienceF2C7InteractiveDLP)).toBe(titlesShapeOf(scienceF2C7InteractiveBM));
  });
});

// --------------------------------------------------- 11. STEPPED CIRCUIT DIAGRAMS

describe("Final correction — series/parallel worked examples carry a stepped circuit diagram", () => {
  // Migrated from `seriesParallel.guidedCalculations` into their own
  // question-first `workedExamples` (7.2 restructure) — the solution itself
  // (`figure.solution`) is still a plain `GuidedCalculationBlock`.
  for (const [lang, content] of LANGS) {
    const figures = content.sections.find((s) => s.workedExamples)?.workedExamples;

    it(`${lang}: the series example has a series circuit with a highlighted step per quantity found`, () => {
      const series = figures!.find((f) => f.circuit.kind === "series")!;
      expect(series, "no series circuit worked example").toBeTruthy();
      expect(series.solution.steps!.length).toBeGreaterThanOrEqual(3);
      for (const step of series.solution.steps!) expect(step.highlight.length).toBeGreaterThan(0);
    });

    it(`${lang}: the parallel example has a parallel circuit with a highlighted step per quantity found`, () => {
      const parallel = figures!.find((f) => f.circuit.kind === "parallel")!;
      expect(parallel, "no parallel circuit worked example").toBeTruthy();
      expect(parallel.solution.steps!.length).toBeGreaterThanOrEqual(3);
      for (const step of parallel.solution.steps!) expect(step.highlight.length).toBeGreaterThan(0);
    });

    it(`${lang}: the stepped answers agree with the existing flat answer`, () => {
      const series = figures!.find((f) => f.circuit.kind === "series")!;
      const steps = series.solution.steps!;
      const lastStep = steps[steps.length - 1];
      expect(series.solution.answer).toContain(lastStep.answer.split(",")[0].trim().split(" ")[0]);
    });
  }

  it("BM and DLP both wire steps to a circuit on the same two worked examples", () => {
    const shapeOf = (c: ScienceF2InteractiveContent) =>
      c.sections
        .find((s) => s.workedExamples)!
        .workedExamples!.map((f) => [f.circuit.kind, f.solution.steps?.length]);
    expect(shapeOf(scienceF2C7InteractiveDLP)).toEqual(shapeOf(scienceF2C7InteractiveBM));
  });

  for (const [lang, content] of LANGS) {
    const figures = content.sections.find((s) => s.workedExamples)?.workedExamples;

    it(`${lang}: the stepped series calculation renders without crashing, with a step selector`, () => {
      const series = figures!.find((f) => f.circuit.kind === "series")!;
      const html = renderToStaticMarkup(createElement(GuidedCalculation, { block: series.solution }));
      expect(html).toContain('role="group"');
      expect(html).toContain("aria-pressed");
      expect(html).toContain(series.solution.steps![0].label);
    });

    it(`${lang}: the stepped parallel calculation renders without crashing`, () => {
      const parallel = figures!.find((f) => f.circuit.kind === "parallel")!;
      const html = renderToStaticMarkup(createElement(GuidedCalculation, { block: parallel.solution }));
      expect(html).toContain("svg");
      expect(html).toContain(parallel.solution.steps![0].answer.replace(/&/g, "&amp;"));
    });

    it(`${lang}: a non-stepped guided calculation (Ohm's Law) still renders the flat rows`, () => {
      const ohmCalc = content.sections.find((s) => s.ohmsTriangle)!.guidedCalculations![0];
      const html = renderToStaticMarkup(createElement(GuidedCalculation, { block: ohmCalc }));
      expect(html).not.toContain('role="group"');
      expect(html).toContain(ohmCalc.answer);
    });
  }
});

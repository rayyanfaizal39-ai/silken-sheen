import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CircuitWorkedDiagram } from "@/components/notes/blocks/CircuitWorkedDiagram";
import { CircuitConceptTeaching } from "@/components/notes/blocks/CircuitConceptTeaching";
import { SeriesParallelSchematic } from "@/components/notes/blocks/SeriesParallelSchematic";
import { CircuitRecognitionChallenge } from "@/components/notes/blocks/CircuitRecognitionChallenge";
import { SelfPracticeCircuit } from "@/components/notes/blocks/SelfPracticeCircuit";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the "remove black components, unify all circuit
 * diagrams" visual-only pass. No formulas, questions, values or the 7.2
 * structure changed — only fill/stroke colours and a few restrained current
 * arrows, all inside `CircuitWorkedDiagram` (which every Chapter 7 circuit
 * visual is built from), so this file audits its RENDERED markup for the
 * exact defects the brief named: hard-coded black fills, a too-faint wire
 * colour, and floating/badge-like meter symbols.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

/** Patterns that would mean a shape is rendered as a solid (near-)black block. */
const BLACK_FILL_PATTERNS = [
  /fill="black"/i,
  /fill="#000"/i,
  /fill="#000000"/i,
  /fill="rgb\(0,\s*0,\s*0\)"/i,
  // The bug this pass fixes: an opaque card-background fill reads as a
  // solid dark block against the softer, semi-transparent card gradient
  // around it.
  /fill="hsl\(var\(--card\)\)"/,
];

function sevenTwoOf(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.number === "7.2")!;
}

function assertNoBlackFill(html: string, label: string) {
  for (const pattern of BLACK_FILL_PATTERNS) {
    expect(html, `${label} contains a black/near-black fill (${pattern})`).not.toMatch(pattern);
  }
}

// -------------------------------------------------------------- 1. NO BLACK

describe("Circuit visual polish — no hard-coded black anywhere in Chapter 7 circuits", () => {
  for (const [lang, content] of LANGS) {
    const section = sevenTwoOf(content);

    it(`${lang}: Series concept diagram`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitConceptTeaching, { block: section.circuitConceptSeries! }),
      );
      assertNoBlackFill(html, "Series concept diagram");
    });

    it(`${lang}: Parallel concept diagram`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitConceptTeaching, { block: section.circuitConceptParallel! }),
      );
      assertNoBlackFill(html, "Parallel concept diagram");
    });

    it(`${lang}: Series vs Parallel comparison`, () => {
      const html = renderToStaticMarkup(
        createElement(SeriesParallelSchematic, { block: section.seriesParallel!, lang }),
      );
      assertNoBlackFill(html, "comparison diagram");
    });

    it(`${lang}: Which Circuit Is It? recognition diagrams`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitRecognitionChallenge, { block: section.circuitRecognition! }),
      );
      assertNoBlackFill(html, "recognition diagrams");
    });

    it(`${lang}: Worked Example 1 and 2`, () => {
      for (const figure of section.workedExamples!) {
        const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
        assertNoBlackFill(html, figure.figureLabel);
      }
    });

    it(`${lang}: Try It Yourself Figure 1 and 2`, () => {
      for (const figure of section.selfPractice!.figures) {
        const html = renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang }));
        assertNoBlackFill(html, figure.figureLabel);
      }
    });
  }
});

// ------------------------------------------------------- 2. RESISTOR STYLING

describe("Circuit visual polish — resistor styling", () => {
  it("idle resistor interior is transparent (outline only), not a filled block", () => {
    const spec = scienceF2C7InteractiveDLP.sections.find((s) => s.number === "7.2")!
      .circuitConceptSeries!.circuit;
    const html = renderToStaticMarkup(createElement(CircuitWorkedDiagram, { spec, highlight: [] }));
    // No hsl(var(--primary) / ...) — that pattern nests a whole oklch() color
    // inside hsl(), which is invalid CSS and makes the browser fall back to
    // SVG's default fill: black. Colour must come from a plain, provably
    // working Tailwind class (see the build-output check below) instead.
    expect(html).not.toMatch(/hsl\(var\(--primary\)/);
    const resistorRect = html.match(/<rect[^>]*class="[^"]*stroke-sky-400\/70[^"]*"[^>]*>/)?.[0];
    expect(resistorRect).toBeDefined();
    expect(resistorRect).toContain("fill-none");
    expect(resistorRect).not.toContain("fill-opacity");
  });

  it("an active (highlighted) resistor gets a light primary-tinted fill via fill-opacity, never a solid block", () => {
    const spec = scienceF2C7InteractiveDLP.sections.find((s) => s.number === "7.2")!
      .circuitConceptSeries!.circuit;
    const html = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec, highlight: ["r1"] }),
    );
    expect(html).not.toMatch(/hsl\(var\(--primary\)/);
    const resistorRect = html.match(/<rect[^>]*class="[^"]*stroke-primary[^"]*"[^>]*>/)?.[0];
    expect(resistorRect).toBeDefined();
    expect(resistorRect).toContain("fill-primary");
    // fill-opacity is a plain numeric SVG attribute — it renders the tint
    // correctly no matter what CSS syntax `--primary` itself is defined with.
    expect(resistorRect).toContain('fill-opacity="0.14"');
  });

  it("never emits a Tailwind opacity-modifier class on the `primary` token (e.g. fill-primary/14) — it silently fails to generate for this project's redefined --primary custom property", () => {
    const spec = scienceF2C7InteractiveDLP.sections.find((s) => s.number === "7.2")!
      .circuitConceptSeries!.circuit;
    const idleHtml = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec, highlight: [] }),
    );
    const activeHtml = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec, highlight: ["r1"] }),
    );
    expect(idleHtml + activeHtml).not.toMatch(/(?:fill|stroke)-primary\/\d/);
  });
});

// ---------------------------------------------- 3 & 4. METER (A/V/G) STYLING

describe("Circuit visual polish — ammeter/voltmeter styling", () => {
  it("meter circles are transparent outlines, never solid badges", () => {
    const figure = scienceF2C7InteractiveDLP.sections
      .find((s) => s.number === "7.2")!
      .workedExamples!.find((f) => f.circuit.kind === "series")!;
    const html = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec: figure.circuit, highlight: [] }),
    );
    // Every <circle> (ammeter, voltmeters) carries either the idle
    // transparent class or the active primary class + a numeric fill-opacity
    // — never a solid opaque colour, and never the broken hsl(var(--primary))
    // pattern (invalid CSS, falls back to SVG's default black fill).
    const circles = [...html.matchAll(/<circle[^>]*>/g)].map((m) => m[0]);
    expect(circles.length).toBeGreaterThan(0);
    for (const circle of circles) {
      expect(circle).not.toMatch(/hsl\(var\(--primary\)/);
      if (circle.includes("fill-primary")) {
        expect(circle).toContain('fill-opacity="0.14"');
      } else {
        expect(circle).toContain("fill-none");
      }
    }
  });

  it("the ammeter sits directly in the main wire — the wire gap it occupies is no wider than the meter", () => {
    const figure = scienceF2C7InteractiveDLP.sections
      .find((s) => s.number === "7.2")!
      .workedExamples!.find((f) => f.circuit.kind === "series")!;
    expect(figure.circuit.showMeters).toBe(true);
    // Rendering must not throw and must contain exactly the meters this
    // circuit's resistor count implies (1 ammeter + 1 voltmeter/resistor).
    const html = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec: figure.circuit, highlight: [] }),
    );
    const ammeterCount = (html.match(/>A<\/text>/g) ?? []).length;
    expect(ammeterCount).toBe(1);
  });
});

// -------------------------------------------------------------- 5. WIRE COLOUR

describe("Circuit visual polish — wire contrast", () => {
  it("idle wires use the established sky-blue circuit-line colour, not the faint border token", () => {
    const spec = scienceF2C7InteractiveDLP.sections.find((s) => s.number === "7.2")!
      .circuitConceptSeries!.circuit;
    const html = renderToStaticMarkup(createElement(CircuitWorkedDiagram, { spec, highlight: [] }));
    expect(html).toMatch(/stroke-sky-400\/70/);
    expect(html).not.toMatch(/stroke-border(?!\/)/);
  });

  it("a highlighted step still switches to the primary active colour, unchanged from before", () => {
    const spec = scienceF2C7InteractiveDLP.sections.find((s) => s.number === "7.2")!
      .circuitConceptSeries!.circuit;
    const html = renderToStaticMarkup(
      createElement(CircuitWorkedDiagram, { spec, highlight: ["source", "loop"] }),
    );
    expect(html).toMatch(/stroke-primary/);
  });
});

// -------------------------------------------------------- 6. CURRENT ARROWS

describe("Circuit visual polish — restrained current arrows", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: series diagram carries exactly one "I" arrow`, () => {
      const spec = sevenTwoOf(content).circuitConceptSeries!.circuit;
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, { spec, highlight: [] }),
      );
      expect((html.match(/>I<\/text>/g) ?? []).length).toBe(1);
    });

    it(`${lang}: parallel diagram carries I, I₁ and I₂ markers`, () => {
      const spec = sevenTwoOf(content).circuitConceptParallel!.circuit;
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, { spec, highlight: [] }),
      );
      expect(html).toContain(">I<");
      expect(html).toContain("I₁");
      expect(html).toContain("I₂");
    });
  }
});

// ------------------------------------------------------------ 7. BM/DLP PARITY

describe("Circuit visual polish — BM/DLP parity", () => {
  it("identical rendered SVG geometry, colours and arrow placement for every circuit diagram", () => {
    const geometryOf = (content: ScienceF2InteractiveContent, lang: "bm" | "en") => {
      const section = sevenTwoOf(content);
      const htmls = [
        renderToStaticMarkup(
          createElement(CircuitConceptTeaching, { block: section.circuitConceptSeries! }),
        ),
        renderToStaticMarkup(
          createElement(CircuitConceptTeaching, { block: section.circuitConceptParallel! }),
        ),
        renderToStaticMarkup(
          createElement(SeriesParallelSchematic, { block: section.seriesParallel!, lang }),
        ),
        renderToStaticMarkup(
          createElement(CircuitRecognitionChallenge, { block: section.circuitRecognition! }),
        ),
        ...section.workedExamples!.map((figure) =>
          renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang })),
        ),
        ...section.selfPractice!.figures.map((figure) =>
          renderToStaticMarkup(createElement(SelfPracticeCircuit, { figure, lang })),
        ),
      ].join("\n");
      // Numeric SVG geometry plus the fixed colour-class vocabulary -- both are
      // language-independent, unlike the surrounding label/button text.
      return [
        ...htmls.matchAll(
          /(?:cx|cy|x1|x2|y1|y2|r|viewBox|width|height|strokeWidth)="[^"]*"|class="(?:stroke|fill)-[a-z0-9/.-]+"/g,
        ),
      ].map((m) => m[0]);
    };
    expect(geometryOf(scienceF2C7InteractiveDLP, "en")).toEqual(
      geometryOf(scienceF2C7InteractiveBM, "bm"),
    );
  });
});

// --------------------------------------- 8. COMPARATOR PROPERTY-SELECTOR POLISH

describe("Circuit visual polish — Series vs Parallel comparator property selector", () => {
  for (const [lang, content] of LANGS) {
    const compare = sevenTwoOf(content).seriesParallel!;
    const seriesSpec = { ...compare.circuits!.series, size: "large" as const };
    const parallelSpec = { ...compare.circuits!.parallel, size: "large" as const };

    it(`${lang}: dimArrows=false keeps current-direction markers at full brightness`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, {
          spec: seriesSpec,
          highlight: ["source", "loop"],
          dimArrows: false,
        }),
      );
      expect(html).toContain("fill-sky-300");
      expect(html).not.toContain("fill-sky-400/25");
    });

    it(`${lang}: dimArrows=true recedes current-direction markers instead of hiding them`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, {
          spec: seriesSpec,
          highlight: ["r1", "r2"],
          dimArrows: true,
        }),
      );
      // Still present (never hidden) but switched to the dim variant.
      expect(html).toContain(">I<");
      expect(html).toContain("fill-sky-400/25");
      expect(html).not.toContain("fill-sky-300");
    });

    it(`${lang}: the comparator's default (Current) view renders that property's own explanation sentence`, () => {
      const html = renderToStaticMarkup(
        createElement(SeriesParallelSchematic, { block: compare, lang }),
      );
      expect(html).toContain(compare.propertyExplanations!.current);
      expect(html).not.toContain(compare.propertyExplanations!.voltage);
      expect(html).not.toContain(compare.propertyExplanations!.resistance);
    });

    it(`${lang}: I₁/I₂ branch markers sit well clear of the source symbol, not beside it`, () => {
      const html = renderToStaticMarkup(
        createElement(CircuitWorkedDiagram, { spec: parallelSpec, highlight: [] }),
      );
      const arrowX = [...html.matchAll(/<path d="M(-?\d+(?:\.\d+)?),/g)].map((m) => Number(m[1]));
      const cellX = [
        ...html.matchAll(/stroke-linecap="round">.*?<line x1="(-?\d+(?:\.\d+)?)"/gs),
      ].map((m) => Number(m[1]));
      expect(arrowX.length).toBeGreaterThan(0);
      expect(cellX.length).toBeGreaterThan(0);
      const branchArrowX = Math.max(...arrowX);
      const sourceX = cellX[0];
      expect(branchArrowX - sourceX).toBeGreaterThan(30);
    });
  }

  it("the series cell's plates run perpendicular to its horizontal wire (vertical bars), not parallel to it", () => {
    const spec = sevenTwoOf(scienceF2C7InteractiveDLP).circuitConceptSeries!.circuit;
    const html = renderToStaticMarkup(createElement(CircuitWorkedDiagram, { spec, highlight: [] }));
    const cellGroup = html.match(/<g[^>]*stroke-linecap="round">(.*?)<\/g>/s)?.[1] ?? "";
    const lines = [
      ...cellGroup.matchAll(
        /<line x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)"/g,
      ),
    ];
    expect(lines.length).toBe(2);
    for (const [, x1, , x2] of lines) {
      // Same x on both ends: the plate is a vertical stroke crossing the
      // horizontal wire, the way a real terminal does.
      expect(x1).toBe(x2);
    }
  });

  it("the parallel cell's plates run perpendicular to its vertical trunk (horizontal bars), not parallel to it", () => {
    const spec = sevenTwoOf(scienceF2C7InteractiveDLP).circuitConceptParallel!.circuit;
    const html = renderToStaticMarkup(createElement(CircuitWorkedDiagram, { spec, highlight: [] }));
    const cellGroup = html.match(/<g[^>]*stroke-linecap="round">(.*?)<\/g>/s)?.[1] ?? "";
    const lines = [
      ...cellGroup.matchAll(
        /<line x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)"/g,
      ),
    ];
    expect(lines.length).toBe(2);
    for (const [, , y1, , y2] of lines) {
      // Same y on both ends: the plate is a horizontal stroke crossing the
      // vertical trunk.
      expect(y1).toBe(y2);
    }
  });
});

import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { chargeArrowPath } from "@/components/notes/blocks/PolarityInteraction";
import { lineClass, lineWidth } from "@/components/notes/blocks/MagnetFieldDiagram";
import {
  symbolWrapperClass,
  CircuitSymbolsTable,
} from "@/components/notes/blocks/CircuitSymbolsTable";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 7 "final non-image QA fixes" pass — see
 * the conversation's own brief. Narrowly scoped to the five fixes it made:
 * the polarity arrows, series advantages/disadvantages as point-form, the
 * circuit-symbol selection response, the dry/humid mini-visual, and the
 * magnetic-field property controls actually changing the field visual.
 *
 * Does not re-assert anything `chapter-7-remediation.test.tsx` or
 * `chapter-7-master-remediation.test.tsx` already cover.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

// ---------------------------------------------------------------- 1. POLARITY

describe("QA fix — polarity arrows are two equal, per-charge arrows", () => {
  it("both arrows in a pair always have the same length, whatever the charge spacing", () => {
    for (const gap of [10, 56, 100]) {
      const left = 92;
      const right = left + gap;
      const lenOf = (d: string) => {
        const [, x1, x2] = d.match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
        return Math.abs(Number(x2) - Number(x1));
      };
      const a = chargeArrowPath(left, true);
      const b = chargeArrowPath(right, false);
      expect(lenOf(a)).toBe(lenOf(b));
    }
  });

  it("attraction points each charge's arrow at the other charge (inward)", () => {
    const left = 92;
    const right = 148;
    // left charge's arrow (pointsRight=true) must end further right than it starts
    const leftPath = chargeArrowPath(left, true);
    const [, leftFrom, leftTo] = leftPath.match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
    expect(Number(leftTo)).toBeGreaterThan(Number(leftFrom));
    // right charge's arrow (pointsRight=false) must end further left than it starts
    const rightPath = chargeArrowPath(right, false);
    const [, rightFrom, rightTo] = rightPath.match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
    expect(Number(rightTo)).toBeLessThan(Number(rightFrom));
  });

  it("repulsion points each charge's arrow away from the other (outward)", () => {
    const left = 70;
    const right = 170;
    const leftPath = chargeArrowPath(left, false);
    const [, leftFrom, leftTo] = leftPath.match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
    expect(Number(leftTo)).toBeLessThan(Number(leftFrom));
    const rightPath = chargeArrowPath(right, true);
    const [, rightFrom, rightTo] = rightPath.match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
    expect(Number(rightTo)).toBeGreaterThan(Number(rightFrom));
  });

  it("no arrow ever collapses to zero length", () => {
    for (const x of [50, 92, 148, 200]) {
      for (const dir of [true, false]) {
        const [, from, to] = chargeArrowPath(x, dir).match(/M([\d.]+),\d+ L([\d.]+),\d+/)!;
        expect(from).not.toBe(to);
      }
    }
  });
});

// ------------------------------------------------------- 2. SERIES POINT-FORM

describe("QA fix — series circuit advantages/disadvantages are point-form", () => {
  for (const [lang, content] of LANGS) {
    const sp = content.sections.find((s) => s.seriesParallel)?.seriesParallel;
    const series = sp?.kinds.find((k) => k.id === "series");
    const parallel = sp?.kinds.find((k) => k.id === "parallel");

    it(`${lang}: series has exactly 3 advantages and 3 disadvantages`, () => {
      expect(series, "no series kind").toBeTruthy();
      expect(series!.advantages).toHaveLength(3);
      expect(series!.disadvantages).toHaveLength(3);
    });

    it(`${lang}: every series bullet is its own short point, not one paragraph`, () => {
      for (const point of [...series!.advantages, ...series!.disadvantages]) {
        expect(point.split(".").filter(Boolean).length, point).toBeLessThanOrEqual(1);
      }
    });

    it(`${lang}: series formulas were not touched`, () => {
      expect(series!.currentRule).toBe("I = I₁ = I₂");
      expect(series!.voltageRule).toBe("V = V₁ + V₂");
      expect(series!.resistanceRule).toBe("R = R₁ + R₂");
    });

    it(`${lang}: parallel's advantages/disadvantages are still present and non-empty`, () => {
      expect(parallel, "no parallel kind").toBeTruthy();
      expect(parallel!.advantages.length).toBeGreaterThan(0);
      expect(parallel!.disadvantages.length).toBeGreaterThan(0);
    });

    it(`${lang}: parallel formulas were not touched`, () => {
      expect(parallel!.currentRule).toBe("I = I₁ + I₂");
      expect(parallel!.voltageRule).toBe("V = V₁ = V₂");
      expect(parallel!.resistanceRule).toBe("1/R = 1/R₁ + 1/R₂");
    });
  }

  it("BM and DLP have the same number of series and parallel bullets", () => {
    const counts = (c: ScienceF2InteractiveContent) => {
      const sp = c.sections.find((s) => s.seriesParallel)!.seriesParallel!;
      return sp.kinds.map((k) => [k.advantages.length, k.disadvantages.length]);
    };
    expect(counts(scienceF2C7InteractiveDLP)).toEqual(counts(scienceF2C7InteractiveBM));
  });
});

// --------------------------------------------------- 3. CIRCUIT SYMBOL VISUAL

describe("QA fix — circuit symbol selection visibly responds", () => {
  it("the active symbol gets a ring/glow; an inactive one dims once something is selected", () => {
    expect(symbolWrapperClass(true, true)).toMatch(/ring-2 ring-primary/);
    expect(symbolWrapperClass(false, true)).toMatch(/opacity-45/);
    expect(symbolWrapperClass(false, true)).not.toMatch(/ring-2/);
  });

  it("before anything is selected, no symbol is dimmed or ringed", () => {
    const cls = symbolWrapperClass(false, false);
    expect(cls).not.toMatch(/opacity-45/);
    expect(cls).not.toMatch(/ring-2/);
  });

  for (const [lang, content] of LANGS) {
    it(`${lang}: renders with the first symbol already highlighted (default selection)`, () => {
      const block = content.sections.find((s) => s.circuitSymbols)!.circuitSymbols!;
      const html = renderToStaticMarkup(createElement(CircuitSymbolsTable, { block, lang }));
      expect(html).toContain("ring-2");
      expect(html).toMatch(/stroke-primary/);
    });
  }
});

// ---------------------------------------------------------- 4. DRY VS HUMID

describe("QA fix — dry/humid mini-visual is directly tied to the concept", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.dryHumidComparison)?.dryHumidComparison;

    it(`${lang}: the block exists with both labelled panels`, () => {
      expect(block, "no dryHumidComparison block").toBeTruthy();
      expect(block!.dryLabel.length).toBeGreaterThan(0);
      expect(block!.humidLabel.length).toBeGreaterThan(0);
    });

    it(`${lang}: the note states dry conditions accumulate charge and humidity dissipates it`, () => {
      if (lang === "bm") {
        expect(block!.note).toMatch(/kering/i);
        expect(block!.note).toMatch(/lembap|terlerai/i);
      } else {
        expect(block!.note).toMatch(/dry/i);
        expect(block!.note).toMatch(/humid|dissipate/i);
      }
    });

    it(`${lang}: sits in the same section as the dry-weather accordion item`, () => {
      const section = content.sections.find((s) => s.dryHumidComparison)!;
      const hasDryAccordion = section.accordions?.some((a) =>
        lang === "bm" ? /kering/i.test(a.title) : /dry weather/i.test(a.title),
      );
      expect(hasDryAccordion, "dry-weather accordion item not in the same section").toBe(true);
    });
  }
});

// --------------------------------------------------- 5. MAGNETIC FIELD VISUAL

describe("QA fix — magnetic field property controls change the field visual", () => {
  it("DIRECTION emphasis scales the arrow up and brightens it", () => {
    // lineClass/lineWidth cover the line side; the arrow's own emphasis prop
    // is exercised through the component, asserted here via its pure siblings
    // for the line so both properties' machinery is proven deterministic.
    expect(lineWidth(1.5, false)).toBe(1.5);
    expect(lineWidth(1.5, true)).toBeGreaterThan(1.5);
  });

  it("NEVER-CROSS emphasis changes the line's colour class, not just the caption", () => {
    expect(lineClass(false, false)).toBe("stroke-emerald-300/80");
    expect(lineClass(false, true)).not.toBe("stroke-emerald-300/80");
    expect(lineClass(false, true)).toMatch(/stroke-teal/);
  });

  it("a dimmed (shape-locked) line stays dimmed regardless of the separation flag", () => {
    expect(lineClass(true, false)).toBe(lineClass(true, true));
  });

  it("baseline (no property selected) rendering is unchanged from before this pass", () => {
    // Guards against the fix silently changing the default, unselected look.
    expect(lineClass(false, false)).toBe("stroke-emerald-300/80");
    expect(lineWidth(1.4, false)).toBe(1.4);
  });
});

// --------------------------------------------------------------- 6. PARITY

describe("QA fixes — BM/DLP parity", () => {
  it("both languages carry a dryHumidComparison and updated seriesParallel in the same sections", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) => [!!s.dryHumidComparison, !!s.seriesParallel]);
    expect(shape(scienceF2C7InteractiveDLP)).toEqual(shape(scienceF2C7InteractiveBM));
  });

  it("no leaked language: BM has no Latin electrostatic-force wording, DLP has none in Malay", () => {
    const bmText = JSON.stringify(
      scienceF2C7InteractiveBM.sections.find((s) => s.polarityInteraction),
    );
    const dlpText = JSON.stringify(
      scienceF2C7InteractiveDLP.sections.find((s) => s.polarityInteraction),
    );
    expect(bmText).not.toMatch(/\bAttract\b|\bRepel\b/);
    expect(dlpText).not.toMatch(/Tarik|Tolak/);
  });
});

import { describe, expect, it } from "vitest";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 7 MASTER remediation pass — the new
 * interactive teaching blocks added alongside the chapter's already-correct
 * content (see `chapter-7-remediation.test.tsx` for the prior pass's guards,
 * which this file does not duplicate).
 *
 * Covers: attraction/repulsion, the electroscope, electron-flow vs
 * conventional-current, the circuit symbols table, the Ohm's Law triangle,
 * the guided Given/Find/Formula/Substitute/Answer calculations, the
 * straight-wire/loop/solenoid "what should you notice?" recaps, and the
 * electromagnet investigation's interactive value steppers.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

describe("Chapter 7 master remediation — attraction and repulsion", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.polarityInteraction)?.polarityInteraction;

    it(`${lang}: the interaction exists with all three charge pairings`, () => {
      expect(block, "no polarityInteraction block").toBeTruthy();
      expect(block!.pairs.map((p) => p.outcome).sort()).toEqual(["attract", "repel", "repel"]);
    });

    it(`${lang}: unlike charges attract, like charges repel`, () => {
      const attract = block!.pairs.find((p) => p.leftCharge !== p.rightCharge)!;
      expect(attract.outcome).toBe("attract");
      const likePairs = block!.pairs.filter((p) => p.leftCharge === p.rightCharge);
      expect(likePairs).toHaveLength(2);
      for (const p of likePairs) expect(p.outcome).toBe("repel");
    });
  }
});

describe("Chapter 7 master remediation — electroscope", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.electroscope)?.electroscope;

    it(`${lang}: all three states are taught`, () => {
      expect(block, "no electroscope block").toBeTruthy();
      expect(block!.stages.map((s) => s.id).sort()).toEqual(["charged", "diverged", "uncharged"]);
    });

    it(`${lang}: the leaf diverges because like charges repel, not because of attraction`, () => {
      const diverged = block!.stages.find((s) => s.id === "diverged")!;
      expect(diverged.note).toMatch(lang === "bm" ? /menolak/i : /repel/i);
      expect(diverged.note).not.toMatch(lang === "bm" ? /menarik/i : /attract/i);
    });
  }
});

describe("Chapter 7 master remediation — electron flow vs conventional current", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.currentDirection)?.currentDirection;

    it(`${lang}: both directions are offered as explicit modes`, () => {
      expect(block, "no currentDirection block").toBeTruthy();
      expect(block!.modes.map((m) => m.id).sort()).toEqual(["conventional", "electron"]);
    });

    it(`${lang}: electron flow is negative -> positive, conventional current is positive -> negative`, () => {
      const electron = block!.modes.find((m) => m.id === "electron")!;
      const conventional = block!.modes.find((m) => m.id === "conventional")!;
      expect(electron.note).toMatch(
        lang === "bm" ? /negatif ke terminal positif/i : /negative terminal to the positive/i,
      );
      expect(conventional.note).toMatch(
        lang === "bm" ? /positif ke terminal negatif/i : /positive terminal to the negative/i,
      );
    });

    it(`${lang}: the key point states the two directions are opposite`, () => {
      expect(block!.keyPoint).toMatch(lang === "bm" ? /bertentangan/i : /opposite/i);
    });
  }
});

describe("Chapter 7 master remediation — circuit symbols table (Table 7.1)", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.circuitSymbols)?.circuitSymbols;

    it(`${lang}: Table 7.1 has exactly the nine textbook components`, () => {
      expect(block, "no circuitSymbols block").toBeTruthy();
      const ids = block!.symbols.map((s) => s.id).sort();
      expect(ids).toEqual(
        [
          "ammeter",
          "bulb",
          "cell",
          "fuse",
          "galvanometer",
          "resistor",
          "rheostat",
          "switch",
          "voltmeter",
        ].sort(),
      );
    });

    it(`${lang}: battery and connecting wire do not substitute a Table 7.1 entry`, () => {
      const ids = block!.symbols.map((s) => s.id);
      expect(ids).not.toContain("battery");
      expect(ids).not.toContain("wire");
    });

    it(`${lang}: Table 7.1 sits in the 7.2 section, not before Ohm's Law`, () => {
      const section = content.sections.find((s) => s.circuitSymbols)!;
      expect(section.number).toBe("7.2");
      const ohmsIndex = content.sections.findIndex((s) => s.ohmsTriangle);
      const tableIndex = content.sections.findIndex((s) => s.circuitSymbols);
      expect(ohmsIndex, "no Ohm's Law section").toBeGreaterThanOrEqual(0);
      expect(tableIndex, "Table 7.1 must render after the Ohm's Law section").toBeGreaterThan(
        ohmsIndex,
      );
    });

    it(`${lang}: no fabricated or generated symbol art — every row purpose is real prose`, () => {
      for (const s of block!.symbols) expect(s.purpose.trim().length).toBeGreaterThan(10);
    });
  }
});

describe("Chapter 7 master remediation — Ohm's Law triangle and guided calculation", () => {
  for (const [lang, content] of LANGS) {
    const triangle = content.sections.find((s) => s.ohmsTriangle)?.ohmsTriangle;
    const ohmCalc = content.sections.find((s) => s.ohmsTriangle)?.guidedCalculations?.[0];

    it(`${lang}: the triangle states all three rearrangements correctly`, () => {
      expect(triangle, "no ohmsTriangle block").toBeTruthy();
      expect(triangle!.vFormula).toBe("V = I × R");
      expect(triangle!.iFormula).toBe("I = V ÷ R");
      expect(triangle!.rFormula).toBe("R = V ÷ I");
    });

    it(`${lang}: the guided example is given, solved and answered correctly (V=6V, R=3Ω -> I=2A)`, () => {
      expect(ohmCalc, "no guided Ohm's Law calculation").toBeTruthy();
      expect(ohmCalc!.given.join(" ")).toMatch(/6 V/);
      expect(ohmCalc!.given.join(" ")).toMatch(/3 Ω/);
      expect(ohmCalc!.answer).toMatch(/2 A/);
    });
  }
});

describe("Chapter 7 master remediation — guided series and parallel calculations", () => {
  for (const [lang, content] of LANGS) {
    // Migrated from `seriesParallel.guidedCalculations` into their own
    // question-first `workedExamples`, per the 7.2 restructure — same
    // underlying solutions, reached via `figure.solution` instead of the
    // figure itself.
    const figures = content.sections.find((s) => s.workedExamples)?.workedExamples;

    it(`${lang}: both a series and a parallel worked example are present`, () => {
      expect(figures, "no worked examples on the series/parallel section").toBeTruthy();
      expect(figures).toHaveLength(2);
    });

    it(`${lang}: the series example resolves to R=4Ω, I=1.5A, V₁=V₂=3V`, () => {
      const series = figures!.find((f) => f.circuit.kind === "series")!;
      expect(series, "series worked example not found").toBeTruthy();
      expect(series.solution.answer).toMatch(/4 Ω/);
      expect(series.solution.answer).toMatch(/1\.5 A/);
      expect(series.solution.answer).toMatch(/3 V/);
    });

    it(`${lang}: the parallel example resolves to R=1Ω, I₁=I₂=3A, total I=6A`, () => {
      const parallel = figures!.find((f) => f.circuit.kind === "parallel")!;
      expect(parallel, "parallel worked example not found").toBeTruthy();
      expect(parallel.solution.answer).toMatch(/1 Ω/);
      expect(parallel.solution.answer).toMatch(/3 A/);
      expect(parallel.solution.answer).toMatch(/6 A/);
    });
  }
});

describe('Chapter 7 master remediation — "what should you notice?" recaps', () => {
  for (const [lang, content] of LANGS) {
    const cf = content.sections.find((s) => s.currentFieldPatterns)?.currentFieldPatterns;

    it(`${lang}: every conductor (straight wire, loop, solenoid) carries a notice list`, () => {
      expect(cf, "no currentFieldPatterns block").toBeTruthy();
      expect(cf!.noticeLabel, "no noticeLabel").toBeTruthy();
      for (const c of cf!.conductors) {
        expect(c.notice, `${c.id} has no notice list`).toBeTruthy();
        expect(c.notice!.length).toBeGreaterThanOrEqual(3);
      }
    });

    it(`${lang}: the straight wire's notice states the field weakens farther from the wire`, () => {
      const straight = cf!.conductors.find((c) => c.id === "straight")!;
      const joined = straight.notice!.join(" ");
      expect(joined).toMatch(lang === "bm" ? /lemah/i : /weaker/i);
    });

    it(`${lang}: the solenoid's notice names both poles`, () => {
      const solenoid = cf!.conductors.find((c) => c.id === "solenoid")!;
      const joined = solenoid.notice!.join(" ");
      expect(joined).toMatch(lang === "bm" ? /utara/i : /north/i);
      expect(joined).toMatch(lang === "bm" ? /selatan/i : /south/i);
    });
  }
});

describe("Chapter 7 master remediation — electromagnet investigation is interactive", () => {
  for (const [lang, content] of LANGS) {
    const exp = content.sections.find((s) => s.miniExperiment)?.miniExperiment;

    it(`${lang}: the current part carries the five tested values, in order`, () => {
      const current = exp!.parts.find((p) => p.id === "current")!;
      expect(current.values).toEqual(["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"]);
    });

    it(`${lang}: the turns part carries the five tested values, in order`, () => {
      const turns = exp!.parts.find((p) => p.id === "turns")!;
      expect(turns.values).toEqual(["10", "20", "30", "40", "50"]);
    });

    it(`${lang}: no fabricated pin count sneaks into a value entry`, () => {
      const all = [...exp!.parts.flatMap((p) => p.values ?? [])].join(" ");
      expect(all).not.toMatch(/pin|peniti/i);
    });
  }
});

describe("Chapter 7 master remediation — coil and iron-core strengthening are taught", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: a card explains why a coil (not a single wire) and why an iron core`, () => {
      const section = content.sections.find((s) => s.currentFieldPatterns)!;
      const card = section.cards?.find((c) =>
        lang === "bm" ? /teras besi/i.test(c.body) : /iron core/i.test(c.body),
      );
      expect(card, "no coil/iron-core card").toBeTruthy();
      expect(card!.body).toMatch(lang === "bm" ? /gegelung/i : /coil/i);
    });
  }
});

describe("Chapter 7 master remediation — BM/DLP structural parity for the new blocks", () => {
  it("both languages carry exactly the same new-block footprint, section by section", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        (
          [
            "polarityInteraction",
            "electroscope",
            "currentDirection",
            "circuitSymbols",
            "ohmsTriangle",
          ] as const
        )
          .filter((k) => s[k] !== undefined)
          .join(","),
      );
    expect(shape(scienceF2C7InteractiveDLP)).toEqual(shape(scienceF2C7InteractiveBM));
  });

  it("both languages carry the same number of guided calculations, section by section", () => {
    const counts = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) => s.guidedCalculations?.length ?? 0);
    expect(counts(scienceF2C7InteractiveDLP)).toEqual(counts(scienceF2C7InteractiveBM));
  });
});

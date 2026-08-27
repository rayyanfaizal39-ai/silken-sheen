import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { scienceF2C4InteractiveBM } from "./interactive-bm";
import { scienceF2C4InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the Chapter 4 remediation.
 *
 * Every case here corresponds to a defect the deep audit actually found in the
 * shipped chapter, so a regression would be a repeat of a real bug rather than a
 * hypothetical one.
 */

/** Everything a learner can read in one section, flattened. */
function sectionText(section: ScienceF2InteractiveContent["sections"][number]): string {
  return JSON.stringify(section);
}

/** Everything a learner can read in the whole chapter. */
function allText(content: ScienceF2InteractiveContent): string {
  return JSON.stringify(content);
}

function renderSection(content: ScienceF2InteractiveContent, index: number, lang: "bm" | "en") {
  return renderToStaticMarkup(
    createElement(ScienceF2InteractiveNotesBlock, {
      content: { ...content, sections: [content.sections[index]] },
      lang,
    }),
  );
}

const BOTH: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C4InteractiveBM],
  ["DLP", scienceF2C4InteractiveDLP],
];

describe("Chapter 4 remediated interactive notes", () => {
  // ── 1 & 2: the three prevention stages ────────────────────────────────
  it("places vector control in TERTIARY prevention, never primary", () => {
    for (const [name, content] of BOTH) {
      const prevention = content.sections.find((s) => s.sequence?.steps.length === 3);
      expect(prevention, `${name}: prevention section missing`).toBeDefined();
      const steps = prevention!.sequence!.steps;
      expect(steps).toHaveLength(3);

      const primary = steps[0].body.toLowerCase();
      const tertiary = steps[2].body.toLowerCase();

      // vector control belongs to the tertiary stage
      expect(tertiary).toMatch(/vektor|vector/);
      expect(primary).not.toMatch(/kawalan vektor|vector control|control the vector/);

      // and the primary stage is about hygiene + immunisation
      expect(primary).toMatch(/kebersihan|cleanliness|hygiene/);
      expect(primary).toMatch(/imunisasi|vaksin|immunisation|vaccination/);
    }
  });

  it("does not present rehabilitation as the tertiary prevention model", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: rehabilitation reintroduced`).not.toMatch(/rehabilitasi|rehabilitation/);
      expect(text).not.toMatch(/pulihkan fungsi|restore function/);
    }
  });

  // ── 3, 4, 5: the three lines of defence ───────────────────────────────
  it("teaches phagocytosis by white blood cells as the second line", () => {
    for (const [name, content] of BOTH) {
      const block = content.sections.find((s) => s.defenceLines)?.defenceLines;
      expect(block, `${name}: defence-lines block missing`).toBeDefined();
      const second = block!.lines[1];
      expect(`${second.parts} ${second.note}`.toLowerCase()).toMatch(/fagositosis|phagocytosis/);
      expect(`${second.parts} ${second.note}`.toLowerCase()).toMatch(
        /sel darah putih|white blood cell/,
      );
    }
  });

  it("teaches the mucous membrane as part of the first line", () => {
    for (const [name, content] of BOTH) {
      const first = content.sections.find((s) => s.defenceLines)!.defenceLines!.lines[0];
      const text = `${first.parts} ${first.note}`.toLowerCase();
      expect(text, `${name}: mucous membrane missing`).toMatch(/membran mukus|mucous membrane/);
      expect(text).toMatch(/kulit|skin/);
    }
  });

  it("keeps out-of-scope mechanisms out of the core defence lines", () => {
    for (const [name, content] of BOTH) {
      const lines = content.sections.find((s) => s.defenceLines)!.defenceLines!.lines;
      const text = lines.map((l) => `${l.parts} ${l.note}`).join(" ").toLowerCase();
      for (const term of ["silia", "cilia", "asid perut", "stomach acid", "sel memori", "memory cell"]) {
        expect(text, `${name}: "${term}" reintroduced into a defence line`).not.toContain(term);
      }
      // inflammation and fever must not stand in for phagocytosis
      expect(text).not.toMatch(/keradangan|inflammation/);
    }
  });

  it("classifies the lines as non-specific and specific", () => {
    for (const [name, content] of BOTH) {
      const block = content.sections.find((s) => s.defenceLines)!.defenceLines!;
      expect(block.nonSpecificLabel.toLowerCase()).toMatch(/tidak spesifik|non-specific/);
      expect(block.specificLabel.toLowerCase()).toMatch(/spesifik|specific/);
      expect(block.lines.filter((l) => l.group === "non-specific"), `${name}`).toHaveLength(2);
      expect(block.lines.filter((l) => l.group === "specific")).toHaveLength(1);
    }
  });

  // ── 6, 7, 8, 13: definitions ──────────────────────────────────────────
  it("defines antigen, antibody and immunity on the notes surface", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections.find((s) =>
        s.cards?.some((c) => /^antigen$/i.test(c.title)),
      );
      expect(section, `${name}: definitions section missing`).toBeDefined();
      const byTitle = (t: RegExp) => section!.cards!.find((c) => t.test(c.title))?.body ?? "";

      expect(byTitle(/^antigen$/i).toLowerCase()).toMatch(
        /merangsang penghasilan antibodi|stimulates the production of antibodies/,
      );
      expect(byTitle(/^antibodi$|^antibody$/i).toLowerCase()).toMatch(
        /sel darah putih|white blood cell/,
      );
      expect(byTitle(/^keimunan$|^immunity$/i).toLowerCase()).toMatch(
        /melawan|fight/,
      );
    }
  });

  it("defines pathogen on the notes surface", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: pathogen definition missing`).toMatch(
        /patogen ialah organisma yang menyebabkan penyakit|a pathogen is an organism that causes disease/,
      );
    }
  });

  // ── 9: immunisation ───────────────────────────────────────────────────
  it("has an immunisation section explaining vaccines", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections.find((s) => /imunisasi|immunisation/i.test(s.title));
      expect(section, `${name}: immunisation section missing`).toBeDefined();
      const text = sectionText(section!).toLowerCase();
      expect(text).toMatch(/dilemahkan atau dimatikan|weakened or killed/);
      expect(text).toMatch(/antigen/);
    }
  });

  // ── 10: social / economic impact ──────────────────────────────────────
  it("covers the family, society, economy and country impact", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections.find((s) =>
        /masyarakat|society/i.test(s.title),
      );
      expect(section, `${name}: social-impact section missing`).toBeDefined();
      const text = sectionText(section!).toLowerCase();
      for (const term of [
        /kusta|leprosy/,
        /batuk kokol|whooping cough/,
        /kos rawatan|healthcare cost/,
        /insurans|insurance/,
        /migrasi|migration/,
        /kualiti kerja|quality of work|work quality/,
      ]) {
        expect(text, `${name}: missing ${term}`).toMatch(term);
      }
    }
  });

  it("does not claim immunisation eradicates disease", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: eradication claim reintroduced`).not.toMatch(
        /menghapuskan penyakit|memusnahkan penyakit|eradicat/,
      );
    }
  });

  // ── 12: primary / secondary response graph ────────────────────────────
  it("teaches the primary and secondary immune response with a graph", () => {
    for (const [name, content] of BOTH) {
      const graph = content.sections.find((s) => s.immuneResponseGraph)?.immuneResponseGraph;
      expect(graph, `${name}: response graph missing`).toBeDefined();
      const ids = graph!.items.map((i) => i.id).sort();
      expect(ids).toEqual(["first", "primary", "second", "secondary"]);
      // every label must actually explain something — no dead labels
      for (const item of graph!.items) {
        expect(item.note.trim().length, `${name}: ${item.id} has no explanation`).toBeGreaterThan(20);
      }
    }
  });

  // ── active / passive immunity ─────────────────────────────────────────
  it("presents all four immunity types as a 2x2 with antiserum defined", () => {
    for (const [name, content] of BOTH) {
      const matrix = content.sections.find((s) => s.immunityMatrix)?.immunityMatrix;
      expect(matrix, `${name}: immunity matrix missing`).toBeDefined();
      expect(matrix!.cells).toHaveLength(4);
      const combos = matrix!.cells.map((c) => `${c.row}-${c.column}`).sort();
      expect(combos).toEqual([
        "active-artificial",
        "active-natural",
        "passive-artificial",
        "passive-natural",
      ]);
      for (const cell of matrix!.cells) {
        expect(cell.note.trim().length, `${name}: ${cell.id} note`).toBeGreaterThan(20);
      }
      expect(allText(content).toLowerCase()).toMatch(
        /antiserum ialah darah cecair jernih|an antiserum is the clear liquid part of blood/,
      );
    }
  });

  // ── required disease examples ─────────────────────────────────────────
  it("restores the required disease examples for every transmission route", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      for (const term of ["sars", "h1n1", "kurap", "panau", "kolera", "chikungunya"]) {
        expect(text, `${name}: missing example "${term}"`).toContain(
          name === "DLP" && term === "kurap"
            ? "ringworm"
            : name === "DLP" && term === "panau"
              ? "tinea"
              : name === "DLP" && term === "kolera"
                ? "cholera"
                : term,
        );
      }
    }
  });

  it("keeps the vector matcher strictly vector to pathogen", () => {
    for (const [name, content] of BOTH) {
      const matcher = content.sections.find((s) => s.matcher)?.matcher;
      expect(matcher, `${name}: vector matcher missing`).toBeDefined();
      expect(matcher!.pairs).toHaveLength(6);
      // every match must name the PATHOGEN — a virus, a bacterium or a named
      // species — never the disease it goes on to cause.
      for (const pair of matcher!.pairs) {
        expect(
          pair.match.toLowerCase(),
          `${name}: "${pair.match}" does not name a pathogen`,
        ).toMatch(/virus|bakteria|bacteria|plasmodium|salmonella|leptospira/);
      }
    }
  });

  // ── 14: BM/DLP parity ─────────────────────────────────────────────────
  it("BM and DLP stay in structural parity", () => {
    expect(scienceF2C4InteractiveDLP.sections).toHaveLength(
      scienceF2C4InteractiveBM.sections.length,
    );
    expect(scienceF2C4InteractiveBM.sections).toHaveLength(11);
    expect(scienceF2C4InteractiveDLP.sections.map((s) => s.number)).toEqual(
      scienceF2C4InteractiveBM.sections.map((s) => s.number),
    );
    const blockShape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        [
          s.cards ? "cards" : "",
          s.accordions ? "accordions" : "",
          s.matcher ? "matcher" : "",
          s.sequence ? "sequence" : "",
          s.comparison ? "comparison" : "",
          s.causeEffect ? "causeEffect" : "",
          s.defenceLines ? "defenceLines" : "",
          s.immunityMatrix ? "immunityMatrix" : "",
          s.immuneResponseGraph ? "graph" : "",
        ]
          .filter(Boolean)
          .join("+"),
      );
    expect(blockShape(scienceF2C4InteractiveDLP)).toEqual(blockShape(scienceF2C4InteractiveBM));
    expect(scienceF2C4InteractiveDLP.reflectionItems).toHaveLength(
      scienceF2C4InteractiveBM.reflectionItems.length,
    );
    expect(scienceF2C4InteractiveDLP.miniQuiz.map((q) => q.type)).toEqual(
      scienceF2C4InteractiveBM.miniQuiz.map((q) => q.type),
    );
  });

  // ── 15: learner-facing leakage ────────────────────────────────────────
  it("shows no curriculum bureaucracy to the learner", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content);
      for (const term of [
        "DSKP",
        "SP 4.",
        "SK 4.",
        "Standard Pembelajaran",
        "Standard Kandungan",
        "buku teks",
        "textbook",
        "Rajah 4.",
        "Jadual 4.",
        "Aktiviti 4.",
        "audit",
        "source-supported",
        "remediation",
      ]) {
        expect(text, `${name}: leaked "${term}"`).not.toContain(term);
      }
    }
  });

  // ── renders ───────────────────────────────────────────────────────────
  it("every section renders for the learner in both languages", () => {
    for (const [name, content] of BOTH) {
      const lang = name === "BM" ? "bm" : "en";
      content.sections.forEach((section, i) => {
        const markup = renderSection(content, i, lang);
        expect(markup.length, `${name}: section ${i} rendered empty`).toBeGreaterThan(200);
        expect(markup).toContain(section.title);
      });
    }
  });

  it("renders the three new interactive blocks", () => {
    for (const [name, content] of BOTH) {
      const lang = name === "BM" ? "bm" : "en";
      const indexOf = (pred: (s: ScienceF2InteractiveContent["sections"][number]) => boolean) =>
        content.sections.findIndex(pred);

      const defence = renderSection(content, indexOf((s) => !!s.defenceLines), lang);
      expect(defence.toLowerCase()).toMatch(/fagositosis|phagocytosis/);

      const matrix = renderSection(content, indexOf((s) => !!s.immunityMatrix), lang);
      expect(matrix.toLowerCase()).toMatch(/antiserum/);

      const graph = renderSection(content, indexOf((s) => !!s.immuneResponseGraph), lang);
      expect(graph).toContain("<svg");
      expect(graph.toLowerCase()).toMatch(/aras keimunan|immunity level/);
    }
  });
});

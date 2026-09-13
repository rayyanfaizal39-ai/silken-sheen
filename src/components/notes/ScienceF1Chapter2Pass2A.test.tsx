import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import {
  chapter2Organisms,
  chapter2SpecialisedCells,
  chapter2Organisation,
} from "@/content/form1/science/chapter-2/chapter2-canonical";
import { ScienceF1Chapter2VisualNotesBlock } from "./ScienceF1Chapter2VisualNotesBlock";

function render(lang: "bm" | "en", content = chapter2Content) {
  return renderToStaticMarkup(createElement(ScienceF1Chapter2VisualNotesBlock, { content, lang }));
}
function block(html: string, element: string, attribute: string, value: string) {
  const result = html.match(
    new RegExp(`<${element}[^>]*${attribute}="${value}"[\\s\\S]*?<\\/${element}>`),
  )?.[0];
  expect(result, `${attribute}=${value} in live renderer`).toBeTruthy();
  return result!;
}

describe("Science Form 1 Chapter 2 Pass 2A — live renderer", () => {
  for (const lang of ["bm", "en"] as const) {
    it(`${lang}: all seven organisms use canonical grouping, clues and notes with native tap-to-expand controls`, () => {
      const html = render(lang);
      expect(html.match(/data-organism-diagram=/g)).toHaveLength(7);
      for (const item of chapter2Organisms) {
        const group = block(html, "section", "data-organism-group", item.cellCount);
        const organism = block(group, "details", "data-organism", item.id);
        expect(organism).toContain("<summary");
        for (const text of [item.name[lang], item.note[lang], item.recognitionClue[lang]])
          expect(organism).toContain(text);
        expect(block(organism, "svg", "data-organism-diagram", item.id)).toContain('role="img"');
        const other = block(
          html,
          "section",
          "data-organism-group",
          item.cellCount === "unicellular" ? "multicellular" : "unicellular",
        );
        expect(other).not.toContain(`data-organism="${item.id}"`);
      }
      expect(html).toContain(lang === "en" ? "ONE CELL" : "SATU SEL");
      expect(html).toContain(lang === "en" ? "MANY CELLS" : "BANYAK SEL");
      expect(html).toContain(
        lang === "en"
          ? "Has both plant and animal characteristics"
          : "Mempunyai ciri-ciri tumbuhan dan haiwan",
      );
    });
    it(`${lang}: all ten specialised cell entries retain their adaptations and exact canonical descriptions`, () => {
      const html = render(lang);
      expect(html.match(/data-specialised-diagram=/g)).toHaveLength(10);
      for (const cell of chapter2SpecialisedCells) {
        const group = block(html, "section", "data-specialised-group", cell.group);
        const article = block(group, "article", "data-specialised-cell", cell.id);
        for (const text of [cell.name[lang], cell.adaptation[lang], cell.description[lang]])
          expect(article).toContain(text);
        expect(article.indexOf("</svg>")).toBeLessThan(article.indexOf(cell.adaptation[lang]));
        expect(article.indexOf(cell.adaptation[lang])).toBeLessThan(
          article.indexOf(cell.description[lang]),
        );
      }
    });
    it(`${lang}: preserves both canonical organisation sequences and definitions, in order`, () => {
      const html = render(lang);
      for (const group of ["animal", "plant"] as const) {
        const chain = block(html, "section", "data-organisation-chain", group);
        expect(
          [...chain.matchAll(/data-organisation-level="(\d+)"/g)].map((m) => Number(m[1])),
        ).toEqual([0, 1, 2, 3, 4]);
        expect(
          [...chain.matchAll(/data-organisation-name="true">([^<]*)<\/p>/g)].map((m) => m[1]),
        ).toEqual(chapter2Organisation[group].map((s) => s[lang]));
        for (const [index, level] of chapter2Content[lang].organisationHierarchy.entries()) {
          expect(chain).toContain(level.level);
          expect(chain).toContain(level.description);
          expect(chain).toContain(`data-organisation-diagram="${group}-${index}"`);
        }
      }
    });
  }
  it("uses recognisable organism morphology rather than a shared generic shape", () => {
    const html = render("en");
    for (const [id, marker] of [
      ["amoeba", "data-pseudopodia"],
      ["paramecium", "data-cilia"],
      ["chlamydomonas", "data-flagella"],
      ["euglena", "data-flagellum"],
      ["mucor", "data-hyphae"],
      ["hydra", "data-body-cells"],
    ])
      expect(block(html, "svg", "data-organism-diagram", id)).toContain(marker);
    expect(
      block(html, "svg", "data-organism-diagram", "spirogyra").match(/data-filament-cell=/g),
    ).toHaveLength(5);
    expect(block(html, "svg", "data-organism-diagram", "mucor")).toContain("data-sporangia");
  });
  it("shows RBC top/side concavity without a nucleus, root extension and paired guard cells around a stoma", () => {
    const html = render("en");
    const rbc = block(html, "svg", "data-specialised-diagram", "red-blood");
    expect(rbc).toContain('data-nucleus="absent"');
    expect(rbc).toContain("data-top-view");
    expect(rbc).toContain("data-side-view");
    expect(rbc).not.toContain('data-nucleus="true"');
    // Concave side profile; the central depression is not a nucleus or a hole.
    expect(rbc).toContain("C211 96 228 94 242 83");
    const root = block(html, "svg", "data-specialised-diagram", "root-hair");
    expect(root).toContain("data-long-root-extension");
    expect(root).toContain("Q139 107 238 92");
    const guard = block(html, "svg", "data-specialised-diagram", "guard");
    expect(guard).toContain("data-guard-pair");
    expect(guard).toContain('data-stoma="true" cx="140"');
    expect(guard).toContain("Stoma");
    const reproduction = block(html, "svg", "data-specialised-diagram", "reproductive");
    expect(reproduction).toContain("data-sperm");
    expect(reproduction).toContain("data-ovum");
  });
  it("shares all 27 diagram geometries between BM and DLP", () => {
    const geometry = (lang: "bm" | "en") =>
      [
        ...render(lang).matchAll(
          /<svg[^>]*data-(?:organism|specialised|organisation)-diagram=[\s\S]*?<\/svg>/g,
        ),
      ].map((m) => m[0].match(/<(?:path|rect|ellipse|circle|line|g)[^>]*>/g));
    expect(geometry("bm")).toHaveLength(27);
    expect(geometry("bm")).toEqual(geometry("en"));
  });
  it("reads names, notes, clues, descriptions and chains from supplied content, with no duplicate factual datasets", () => {
    const changed = structuredClone(chapter2Content);
    for (const lang of ["bm", "en"] as const) {
      for (const item of [
        ...changed[lang].unicellularMulticellular.unicellular,
        ...changed[lang].unicellularMulticellular.multicellular,
      ]) {
        item.name = `NAME-${item.id}`;
        item.note = `NOTE-${item.id}`;
        item.recognitionClue = `CLUE-${item.id}`;
      }
      for (const cell of [...changed[lang].animalCellTypes, ...changed[lang].plantCellTypes]) {
        cell.name = `CELL-${cell.id}`;
        cell.adaptation = `ADAPT-${cell.id}`;
        cell.description = `FUNCTION-${cell.id}`;
      }
      changed[lang].organisationExamples.animal[2] = "CANONICAL-ANIMAL-ORGAN";
      changed[lang].organisationExamples.plant[2] = "CANONICAL-PLANT-ORGAN";
      const html = render(lang, changed);
      for (const item of chapter2Organisms)
        for (const prefix of ["NAME", "NOTE", "CLUE"])
          expect(html).toContain(`${prefix}-${item.id}`);
      for (const cell of chapter2SpecialisedCells)
        for (const prefix of ["CELL", "ADAPT", "FUNCTION"])
          expect(html).toContain(`${prefix}-${cell.id}`);
      expect(html).toContain("CANONICAL-ANIMAL-ORGAN");
      expect(html).toContain("CANONICAL-PLANT-ORGAN");
    }
    const sources = ["Organism", "Specialised", "Organisation"]
      .map((name) =>
        readFileSync(new URL(`./blocks/Chapter2${name}Diagrams.tsx`, import.meta.url), "utf8"),
      )
      .join("\n");
    for (const item of chapter2Organisms)
      for (const lang of ["en", "bm"] as const) expect(sources).not.toContain(item.note[lang]);
    for (const item of chapter2SpecialisedCells)
      for (const lang of ["en", "bm"] as const)
        expect(sources).not.toContain(item.description[lang]);
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import {
  chapter6Content,
  chapter6Supplement,
} from "@/content/form1/science/chapter-6/chapter6-content";
import { ScienceF1Chapter6VisualNotesBlock } from "./ScienceF1Chapter6VisualNotesBlock";
import { AtomDiagram, Chapter6Atoms } from "./blocks/Chapter6Atoms";
import {
  PeriodicSchematic,
  Chapter6PeriodicTable,
  Chapter6MetalProperties,
} from "./blocks/Chapter6PeriodicTable";
import { Chapter6Experiments, ExperimentDiagram } from "./blocks/Chapter6Experiments";
const render = (lang: "en" | "bm") =>
  renderToStaticMarkup(
    createElement(ScienceF1Chapter6VisualNotesBlock, { content: chapter6Content, lang }),
  );
const escape = (s: string) => renderToStaticMarkup(createElement("span", null, s)).slice(6, -7);
const geometry = (html: string) =>
  [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(([s]) =>
    s
      .replace(/aria-label="[^"]*"/g, "")
      .replace(/<desc>[\s\S]*?<\/desc>/g, "")
      .replace(/ data-tsd-source="[^"]*"/g, ""),
  );
describe("Chapter 6 Pass 1", () => {
  for (const lang of ["en", "bm"] as const) {
    const source = chapter6Content[lang];
    const c = source.classification;
    it(`${lang}: has exactly three official sections and one official 6.1 heading`, () => {
      const html = render(lang);
      expect([...html.matchAll(/data-official-subtopic="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "6.1",
        "6.2",
        "6.3",
      ]);
      const headings = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((m) => m[1]);
      expect(headings).toEqual(source.structure.subtopics);
      expect(headings.filter((v) => v.startsWith("6.1"))).toHaveLength(1);
      const path = html.match(/<nav data-chapter-path[\s\S]*?<\/nav>/)![0];
      expect(path.match(/<a /g)).toHaveLength(3);
      expect(html).not.toMatch(
        /lucide-orbit|lucide-circle-dot|Elements build the material world|Unsur membina dunia bahan/,
      );
    });
    it(`${lang}: shows proton/neutron inside nucleus and electrons outside, with balanced counts`, () => {
      const html = renderToStaticMarkup(createElement(AtomDiagram, { source, selected: 0 }));
      expect(html).toContain("data-nucleus");
      const groups = ["proton", "neutron", "electron"].map((id, i) => {
        const start = html.indexOf(`data-subatomic="${id}"`);
        const end =
          i < 2 ? html.indexOf("data-subatomic=", start + 1) : html.indexOf("data-electron-motion");
        return html.slice(start, end);
      });
      groups.forEach((s, i) => {
        const circles = [...s.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="(12|14)"/g)];
        expect(circles).toHaveLength(3);
        for (const m of circles) {
          const distance = Math.hypot(Number(m[1]) - 150, Number(m[2]) - 150);
          if (i < 2) expect(distance).toBeLessThan(48);
          else expect(distance).toBeGreaterThan(90);
        }
      });
      expect(html).toContain("data-electron-motion");
    });
    it(`${lang}: renders source charges, neutrality, microscope analogy and model note`, () => {
      const html = renderToStaticMarkup(createElement(Chapter6Atoms, { source }));
      for (const v of [
        source.atomsAndMolecules.definition,
        source.atomsAndMolecules.neutralityNote,
        c.microscopeAnalogy,
        c.labels.model,
        c.labels.protons,
        c.labels.electrons,
      ])
        expect(html).toContain(escape(v));
      expect(source.atomsAndMolecules.subatomicParticles.map((p) => p.charge)).toEqual(
        lang === "en"
          ? ["Positive", "Neutral (no charge)", "Negative"]
          : ["Positif", "Neutral (tiada cas)", "Negatif"],
      );
      expect(html).toContain("data-neutral-atom");
    });
    it(`${lang}: uses one O atom versus two joined O atoms, and same/different atom models`, () => {
      const html = renderToStaticMarkup(createElement(Chapter6Atoms, { source }));
      const atom = html.match(/<svg data-oxygen="atom"[\s\S]*?<\/svg>/)![0];
      const molecule = html.match(/<svg data-oxygen="molecule"[\s\S]*?<\/svg>/)![0];
      expect(atom.match(/data-oxygen-atom=/g)).toHaveLength(1);
      expect(molecule.match(/data-oxygen-atom=/g)).toHaveLength(2);
      expect(html).toContain(escape(source.atomsAndMolecules.moleculeDefinition));
      expect(html).toContain(escape(source.elementsAndCompounds.elementDefinition));
      expect(html).toContain(escape(source.elementsAndCompounds.compoundDefinition));
      const compound = html.match(/<svg data-material-model="compound"[\s\S]*?<\/svg>/)![0];
      expect(compound.match(/>Na<\/text>/g)).toHaveLength(8);
      expect(compound.match(/>Cl<\/text>/g)).toHaveLength(8);
      expect(html).not.toMatch(/valence|electron configuration|oxidation|konfigurasi elektron/);
    });
    it(`${lang}: preserves the printed periodic shape, regions, hydrogen exception and 2016 context`, () => {
      const html = renderToStaticMarkup(createElement(Chapter6PeriodicTable, { source }));
      expect(c.regionRows).toHaveLength(7);
      expect(c.regionRows.every((r) => r.length === 18)).toBe(true);
      expect(c.regionRows[0]).toBe("N................I");
      for (const id of ["metal", "nonmetal", "semi", "inert"])
        expect(html).toContain(`data-region="${id}"`);
      expect(html.match(/data-detached-metals=/g)).toHaveLength(2);
      expect(html).toContain(escape(c.labels.context));
      expect(html).toContain(escape(source.periodicTable.totalDiscovered));
      expect(html).toContain(escape(source.metalsVsNonMetals.semiMetalNote));
      for (const r of c.regions) expect(html).toContain(escape(r.location));
      expect(html).not.toMatch(/Nihonium|Oganesson|2026|group trends|reactivity series/);
    });
    it(`${lang}: includes the audited history and all eight property comparisons`, () => {
      const html = render(lang);
      for (const h of c.history) {
        expect(html).toContain(escape(h.scientist));
        expect(html).toContain(escape(h.contribution));
      }
      expect(html).toContain("1869");
      expect(html).toContain("1886");
      expect(html).toContain("63");
      const table = html.match(/<table data-metal-comparison[\s\S]*?<\/table>/)![0];
      expect(table.match(/scope="row"/g)).toHaveLength(8);
      for (const row of source.metalsVsNonMetals.comparison)
        for (const v of Object.values(row)) expect(table).toContain(escape(v));
      expect(table).toContain(lang === "en" ? "except carbon" : "kecuali karbon");
    });
    it(`${lang}: retains only verified applications and appreciation`, () => {
      const html = renderToStaticMarkup(createElement(Chapter6MetalProperties, { source }));
      expect(c.applications).toHaveLength(8);
      for (const a of c.applications)
        for (const v of [a.element, a.properties, a.uses]) expect(html).toContain(escape(v));
      expect(html).not.toMatch(
        /microchips|mikrocip|aircraft|kapal terbang|sanitation|sanitasi|purple|ungu|galvanis|tergalvani|electrodes|elektrod/i,
      );
      for (const text of c.appreciation) expect(render(lang)).toContain(escape(text));
    });
    it(`${lang}: renders all six textbook experiment setups with exact materials and safety`, () => {
      const html = renderToStaticMarkup(createElement(Chapter6Experiments, { source }));
      expect([...html.matchAll(/data-property-test="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "lustre",
        "ductility",
        "malleability",
        "electricity",
        "heat",
        "melting",
      ]);
      for (const e of c.experiments) {
        expect(html).toContain(escape(e.materials));
        expect(html).toContain(escape(e.procedure));
        for (const sample of e.samples) expect(html).toContain(escape(sample.name));
      }
      for (const attr of [
        "data-sandpaper",
        "data-bent-wire",
        "data-hammer",
        "data-wooden-block",
        "data-circuit",
        "data-dry-cell",
        "data-ammeter",
        "data-crocodile-clips",
        "data-retort-stand",
        "data-candle",
        "data-wax",
        "data-thumbtack",
        "data-stopwatch",
        "data-crucible",
        "data-pipeclay-triangle",
        "data-tripod",
        "data-thermometer",
        "data-bunsen",
        "data-fume-chamber",
      ])
        expect(html).toContain(attr);
      expect(html).toContain(escape(c.experiments[5].safety!));
      expect(html).not.toMatch(/\d+\s*(?:seconds|saat|amperes|ampere)|232°C|115°C/);
    });
    it(`${lang}: sample diagrams show the graphite and electrical-carbon exceptions`, () => {
      const ductile = c.experiments[1];
      expect(
        renderToStaticMarkup(createElement(ExperimentDiagram, { experiment: ductile, sample: 1 })),
      ).toContain("data-broken-graphite");
      const electric = c.experiments[3];
      const paths = [0, 1, 2].map(
        (sample) =>
          renderToStaticMarkup(
            createElement(ExperimentDiagram, { experiment: electric, sample }),
          ).match(/<path data-needle[^>]*>/)![0],
      );
      expect(paths[0]).toBe(paths[1]);
      expect(paths[2]).not.toBe(paths[0]);
      const heat = c.experiments[4];
      expect(
        renderToStaticMarkup(createElement(ExperimentDiagram, { experiment: heat, sample: 1 })),
      ).toContain("translate(0 58)");
    });
  }
  it("shares every scientific SVG geometry between languages", () =>
    expect(geometry(render("en"))).toEqual(geometry(render("bm"))));
  it("shares all sample and selection geometries across BM/DLP", () => {
    for (let selected = 0; selected < 3; selected++)
      expect(
        geometry(
          renderToStaticMarkup(
            createElement(AtomDiagram, { source: chapter6Content.en, selected }),
          ),
        ),
      ).toEqual(
        geometry(
          renderToStaticMarkup(
            createElement(AtomDiagram, { source: chapter6Content.bm, selected }),
          ),
        ),
      );
    for (const selected of ["metal", "nonmetal", "semi", "inert"])
      expect(
        geometry(
          renderToStaticMarkup(
            createElement(PeriodicSchematic, { source: chapter6Content.en, selected }),
          ),
        ),
      ).toEqual(
        geometry(
          renderToStaticMarkup(
            createElement(PeriodicSchematic, { source: chapter6Content.bm, selected }),
          ),
        ),
      );
    chapter6Content.en.classification.experiments.forEach((e, i) =>
      e.samples.forEach((_, sample) =>
        expect(
          geometry(
            renderToStaticMarkup(createElement(ExperimentDiagram, { experiment: e, sample })),
          ),
        ).toEqual(
          geometry(
            renderToStaticMarkup(
              createElement(ExperimentDiagram, {
                experiment: chapter6Content.bm.classification.experiments[i],
                sample,
              }),
            ),
          ),
        ),
      ),
    );
  });
  it("preserves all deferred 6.2/6.3 data and supplement fields", () => {
    const keys = [
      "mixtures",
      "compounds",
      "physicalVsChemicalChange",
      "mixturesVsCompounds",
      "keyExamFacts",
      "keyTerms",
      "chapterSummary",
    ] as const;
    const hashes = {
      en: "9f27c814452d75a50ebe254340874fb40ddd87fc4941f88356108ab916e86593",
      bm: "c6007e48de3fe887d3fd3f4ea220412940ea57784e1a6ab37bbd36e05c48f486",
    };
    for (const lang of ["en", "bm"] as const) {
      const data = {
        ...Object.fromEntries(keys.map((k) => [k, chapter6Content[lang][k]])),
        electrolysis: chapter6Supplement[lang].electrolysis,
        activeRecall: chapter6Supplement[lang].activeRecall,
      };
      expect(createHash("sha256").update(JSON.stringify(data)).digest("hex")).toBe(hashes[lang]);
    }
  });
  it("uses canonical facts and removes duplicate Pass 1 supplement arrays", () => {
    const source = structuredClone(chapter6Content.en);
    source.atomsAndMolecules.definition = "SOURCE ATOMS";
    source.periodicTable.totalDiscovered = "SOURCE COUNT";
    source.metalsVsNonMetals.comparison[0].metal = "SOURCE PROPERTY";
    source.classification.applications[0].uses = "SOURCE APPLICATION";
    source.classification.experiments[0].procedure = "SOURCE EXPERIMENT";
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter6VisualNotesBlock, {
        content: { en: source, bm: chapter6Content.bm },
        lang: "en",
      }),
    );
    for (const text of [
      "SOURCE ATOMS",
      "SOURCE COUNT",
      "SOURCE PROPERTY",
      "SOURCE APPLICATION",
      "SOURCE EXPERIMENT",
    ])
      expect(html).toContain(text);
    expect(chapter6Supplement.en).not.toHaveProperty("periodicHistory");
    expect(chapter6Supplement.en).not.toHaveProperty("elementApplications");
    for (const file of ["Chapter6Atoms", "Chapter6PeriodicTable", "Chapter6Experiments"])
      expect(readFileSync(`src/components/notes/blocks/${file}.tsx`, "utf8")).not.toMatch(
        /subatomicParticles\s*[:=]\s*\[|applications\s*[:=]\s*\[|"Metals have|"Logam mempunyai/,
      );
  });
});

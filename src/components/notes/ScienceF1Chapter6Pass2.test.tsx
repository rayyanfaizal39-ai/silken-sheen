import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  chapter6Content,
  type SeparationMethodId,
} from "@/content/form1/science/chapter-6/chapter6-content";
import { ScienceF1Chapter6VisualNotesBlock } from "./ScienceF1Chapter6VisualNotesBlock";
import { Chapter6Mixtures } from "./blocks/Chapter6Mixtures";
import { MixtureApparatus } from "./blocks/Chapter6MixtureDiagrams";

const ids: SeparationMethodId[] = [
  "filtration",
  "distillation",
  "magnet",
  "sedimentation",
  "floatation",
  "chromatography",
  "sieving",
];
const render = (lang: "en" | "bm") =>
  renderToStaticMarkup(createElement(Chapter6Mixtures, { source: chapter6Content[lang].mixtures }));
const diagram = (id: SeparationMethodId, stage = 2, lang: "en" | "bm" = "en") =>
  renderToStaticMarkup(
    createElement(MixtureApparatus, {
      method: chapter6Content[lang].mixtures.separationMethods.find((m) => m.id === id)!,
      stage,
    }),
  );
const escaped = (s: string) => renderToStaticMarkup(createElement("span", null, s)).slice(6, -7);
const geometry = (s: string) => s.replace(/aria-label="[^"]*"/g, "");

describe("Chapter 6 Pass 2 source and live visuals", () => {
  for (const lang of ["en", "bm"] as const) {
    const source = chapter6Content[lang];
    const mixtures = source.mixtures;
    it(`${lang}: preserves the three official sections and only one 6.2`, () => {
      const html = renderToStaticMarkup(
        createElement(ScienceF1Chapter6VisualNotesBlock, { content: chapter6Content, lang }),
      );
      expect([...html.matchAll(/data-official-subtopic="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "6.1",
        "6.2",
        "6.3",
      ]);
      expect(html.match(/<h2[^>]*>/g)).toHaveLength(3);
      expect(html).toContain(escaped(source.structure.subtopics[1]));
    });
    it(`${lang}: preserves every locked Pass 1 canonical field`, () => {
      const deferred = [
        "compounds",
        "physicalVsChemicalChange",
        "mixturesVsCompounds",
        "keyExamFacts",
        "keyTerms",
        "chapterSummary",
      ];
      const locked = Object.fromEntries(
        Object.entries(source).filter(([k]) => k !== "mixtures" && !deferred.includes(k)),
      );
      const hashes = {
        en: "0990263c56186a01be1dc454621774b8dcc27dd5deb84b5b6c6e38ff555491e7",
        bm: "9c1fbf563c98c7309af562b65118d3f297b67836fc9e55d697f539298d41d87e",
      };
      expect(createHash("sha256").update(JSON.stringify(locked)).digest("hex")).toBe(hashes[lang]);
    });
    it(`${lang}: renders the definition, distinguishable components, physical separation and all daily examples`, () => {
      const html = render(lang);
      [mixtures.definition, mixtures.physicalSeparation, ...mixtures.examples].forEach((t) =>
        expect(html).toContain(escaped(t)),
      );
      expect(html.match(/data-component="a"/g)).toHaveLength(8);
      expect(html.match(/data-component="b"/g)).toHaveLength(8);
      expect(mixtures.definition).toBe(
        lang === "bm"
          ? "Campuran terdiri daripada dua atau lebih unsur atau sebatian yang bercampur secara fizikal."
          : "A mixture consists of two or more elements or compounds mixed physically.",
      );
    });
    it(`${lang}: renders seven actual apparatus views and overview links, with only six numbered activities`, () => {
      const html = render(lang);
      expect(mixtures.separationMethods.map((m) => m.id)).toEqual(ids);
      expect([...html.matchAll(/data-mixture-diagram="([^"]+)"/g)].map((m) => m[1])).toEqual(ids);
      expect([...html.matchAll(/data-activity="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "6.4",
        "6.5",
        "6.6",
        "6.7",
        "6.8",
        "6.9",
      ]);
      for (const id of ids) expect(html).toContain(`href="#mixture-${id}"`);
      expect(html).not.toContain("6.10");
      expect(mixtures.separationMethods[6].activity).toBeUndefined();
    });
    it(`${lang}: renders two source factors and a four-step decision strip`, () => {
      expect(mixtures.selectionFactors).toHaveLength(2);
      expect(mixtures.decision).toHaveLength(4);
      [...mixtures.selectionFactors, ...mixtures.decision].forEach((t) =>
        expect(render(lang)).toContain(escaped(t)),
      );
      expect(mixtures.decision.join(" ")).toMatch(
        lang === "bm" ? /keadaan jirim/ : /states of matter/,
      );
    });
    it(`${lang}: filtration retains source procedure, apparatus and residue/filtrate labels`, () => {
      const m = mixtures.separationMethods[0];
      expect(m.materials).toMatch(/50 ml/);
      expect(m.steps[0]).toMatch(/30 ml/);
      expect(m.steps[0]).toMatch(lang === "bm" ? /dua spatula/ : /two spatulas/);
      expect(m.steps[0]).toMatch(lang === "bm" ? /dua minit/ : /two minutes/);
      for (const id of [
        "paper",
        "funnel",
        "residue",
        "filtrate",
        "rod",
        "stand",
        "beaker",
        "spatula",
      ]) {
        expect(diagram("filtration", 2, lang)).toContain(`data-callout="${id}"`);
        expect(render(lang)).toContain(escaped(m.apparatus.find((a) => a.id === id)!.label));
      }
      expect(m.observation).toMatch(lang === "bm" ? /tidak larut/ : /Insoluble/);
    });
    it(`${lang}: distillation uses the verified apparatus and an experimentally determined temperature`, () => {
      const m = mixtures.separationMethods[1];
      for (const id of [
        "flask",
        "mixture",
        "chips",
        "thermometer",
        "burner",
        "gauze",
        "tripod",
        "condenser",
        "in",
        "out",
        "beaker",
        "stand",
      ])
        expect(diagram("distillation", 2, lang)).toContain(`data-callout="${id}"`);
      expect(m.example).toMatch(lang === "bm" ? /kelopak bunga ros/ : /rose petals/);
      expect(JSON.stringify(m)).not.toMatch(/\d+\s*°|78|100\s*°/);
      expect(m.observation).toMatch(lang === "bm" ? /Rekodkan suhu/ : /Record the temperature/);
    });
    it(`${lang}: the magnetic activity is iron/sulphur and preserves both magnetic and nonmagnetic examples`, () => {
      const m = mixtures.separationMethods[2];
      expect(m.materials).toMatch(
        lang === "bm" ? /serbuk besi dan serbuk sulfur/ : /iron and sulphur powder/,
      );
      expect(m.materials).toMatch(/Petri/);
      expect(m.notes.join(" ")).toMatch(
        lang === "bm" ? /Besi, nikel dan kobalt/ : /Iron, nickel and cobalt/,
      );
      expect(m.notes.join(" ")).toMatch(
        lang === "bm" ? /Emas, gangsa dan aluminium/ : /Gold, bronze and aluminium/,
      );
      expect(JSON.stringify(m)).not.toMatch(/sulfida|sulphide|heated|dipanaskan/);
    });
    it(`${lang}: sedimentation uses silty solution and two 100 ml beakers without an extra method`, () => {
      const m = mixtures.separationMethods[3];
      expect(m.materials).toMatch(
        lang === "bm"
          ? /Larutan berkelodak, dua bikar 100 ml/
          : /Silty solution, two 100 ml beakers/,
      );
      expect(m.steps[0]).toContain("50 ml");
      expect(m.steps[2]).toMatch(lang === "bm" ? /perlahan-lahan/ : /Slowly/);
      expect(render(lang)).not.toMatch(/decantation|dekantasi/i);
    });
    it(`${lang}: chromatography retains dimensions, water rule and observation time without fabricated results`, () => {
      const m = mixtures.separationMethods[5];
      expect(m.materials).toContain("250 ml");
      expect(m.apparatus.map((a) => a.label).join(" ")).toContain("5 cm × 12 cm");
      expect(m.apparatus.map((a) => a.label).join(" ")).toContain("1.5 cm");
      expect(m.steps[0]).toMatch(lang === "bm" ? /tidak terkena/ : /must not touch/);
      expect(m.steps[1]).toMatch(lang === "bm" ? /30 minit/ : /30 minutes/);
      const html = diagram("chromatography", 2, lang);
      expect(html).toContain('data-result="observation-required"');
      expect(html).not.toMatch(/data-final-band/);
      expect(render(lang)).toContain(escaped(mixtures.labels.exploration));
    });
    it(`${lang}: comparison and formative practice consume canonical examples and mappings`, () => {
      expect(mixtures.formativePractice.map((q) => q.method)).toEqual([
        "magnet",
        "distillation",
        "chromatography",
        "sedimentation",
        "floatation",
        "filtration",
      ]);
      const html = render(lang);
      mixtures.separationMethods.forEach((m) => expect(html).toContain(escaped(m.example)));
      mixtures.formativePractice.forEach((q) => expect(html).toContain(escaped(q.mixture)));
      expect(html).toContain(escaped(mixtures.reasoning.question));
      expect(html).toContain(escaped(mixtures.reasoning.answer));
      expect(mixtures.reasoning.answer).toMatch(lang === "bm" ? /beras|Beras/ : /Rice/);
      expect(html.match(/<select/g)).toHaveLength(6);
    });
  }
  it("changes magnetic positions for iron only", () => {
    const initial = diagram("magnet", 0);
    const final = diagram("magnet", 2);
    expect(initial).toContain('data-material="iron" data-attracted="false"');
    expect(final).toContain('data-material="iron" data-attracted="true"');
    const sulphur = (s: string) => s.match(/<g data-material="sulphur"[\s\S]*?<\/g>/)?.[0];
    expect(sulphur(initial)).toBe(sulphur(final));
    expect(final).toContain('data-flow="iron-only"');
  });
  it("shows sediment below clear liquid and pours only clear water", () => {
    expect(diagram("sedimentation", 1)).toContain('data-part="clear-upper-water" opacity="1"');
    expect(diagram("sedimentation", 1)).toContain('data-material="sediment"');
    expect(diagram("sedimentation", 2)).toContain('data-flow="clear-water-poured"');
    expect(diagram("sedimentation", 0)).not.toContain('data-flow="clear-water-poured"');
  });
  it("keeps oil above water and releases water through the lower tap", () => {
    const html = diagram("floatation");
    const oil = Number(html.match(/data-layer="oil"[^>]* y="(\d+)"/)?.[1]);
    const water = Number(html.match(/data-layer="water"[^>]* y="(\d+)"/)?.[1]);
    expect(oil).toBeLessThan(water);
    expect(html).toContain('data-flow="water-outlet" data-material="water"');
    expect(diagram("floatation", 1)).not.toContain('data-flow="water-outlet"');
    expect(chapter6Content.en.mixtures.separationMethods[4].usedFor).toContain(
      "soluble and insoluble",
    );
    expect(chapter6Content.bm.mixtures.separationMethods[4].usedFor).toContain(
      "tidak larut dan terapung",
    );
    expect(chapter6Content.en.mixtures.separationMethods[4].materials).toContain(
      "100 ml measuring cylinder",
    );
    expect(
      readFileSync("src/content/form1/science/chapter-6/pass2-source-audit.md", "utf8"),
    ).toMatch(/SOURCE CONFLICT.*BM describes insoluble material/);
  });
  it("keeps original dots and baseline above the water throughout chromatography", () => {
    for (const stage of [0, 1, 2]) {
      const html = diagram("chromatography", stage);
      const water = Number(html.match(/data-surface-y="(\d+)"/)?.[1]);
      const baseline = Number(html.match(/data-y="(\d+)"/)?.[1]);
      expect(baseline).toBeLessThan(water);
      if (stage < 2) expect(html.match(/cy="252"/g)).toHaveLength(3);
    }
    expect(diagram("chromatography", 1)).toContain('data-flow="solvent-rises"');
  });
  it("sieving retains impurities while flour passes through", () => {
    const html = diagram("sieving");
    expect(html).toContain('data-material="impurities" data-retained="true"');
    expect(html).toContain('data-material="flour" data-passes-through="true"');
    expect(diagram("sieving", 0)).toContain('data-passes-through="false"');
  });
  it("shares identical BM/DLP geometry in every method and process state", () => {
    ids.forEach((id) =>
      [0, 1, 2].forEach((stage) =>
        expect(geometry(diagram(id, stage, "en"))).toBe(geometry(diagram(id, stage, "bm"))),
      ),
    );
  });
  it("takes facts from passed canonical data, with no factual dataset in visual components", () => {
    const source = structuredClone(chapter6Content.en.mixtures);
    source.definition = "CANONICAL DEFINITION";
    source.separationMethods.forEach((m, i) => {
      m.usedFor = `CANONICAL PROPERTY ${i}`;
      m.materials = `CANONICAL MATERIALS ${i}`;
      m.steps[0] = `CANONICAL STEP ${i}`;
      m.apparatus[0].label = `CANONICAL LABEL ${i}`;
      m.observation = `CANONICAL OBSERVATION ${i}`;
      m.example = `CANONICAL EXAMPLE ${i}`;
    });
    const html = renderToStaticMarkup(createElement(Chapter6Mixtures, { source }));
    expect(html).toContain("CANONICAL DEFINITION");
    for (let i = 0; i < 7; i++)
      for (const name of ["PROPERTY", "MATERIALS", "STEP", "LABEL", "OBSERVATION", "EXAMPLE"])
        expect(html).toContain(`CANONICAL ${name} ${i}`);
    for (const name of ["Chapter6Mixtures", "Chapter6MixtureDiagrams"])
      expect(readFileSync(`src/components/notes/blocks/${name}.tsx`, "utf8")).not.toMatch(
        /separationMethods\s*[:=]\s*\[|formativePractice\s*[:=]\s*\[|"Iron powder"|"Serbuk besi"|"30 minutes"/,
      );
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  chapter6Content,
  chapter6Supplement,
} from "@/content/form1/science/chapter-6/chapter6-content";
import { ScienceF1Chapter6VisualNotesBlock } from "./ScienceF1Chapter6VisualNotesBlock";
import { Chapter6Compounds } from "./blocks/Chapter6Compounds";
import {
  CompoundActivityDiagram,
  CompoundMassDiagram,
  CompoundFormationDiagram,
  ElectrolysisDiagram,
  ChangeComparisonDiagram,
  EverydayCompoundObject,
} from "./blocks/Chapter6CompoundDiagrams";

const render = (lang: "en" | "bm") =>
  renderToStaticMarkup(createElement(Chapter6Compounds, { source: chapter6Content[lang] }));
const escape = (s: string) => renderToStaticMarkup(createElement("span", null, s)).slice(6, -7);
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const geometry = (s: string) => s.replace(/aria-label="[^"]*"/g, "");

describe("Chapter 6 Pass 3", () => {
  it("preserves the five locked scientific component files", () => {
    const files = {
      Chapter6Atoms: "3b5e27f50396e5e774bfd81bbb0687ee9e1cfff7c4341e876e3689a58f7b9204",
      Chapter6PeriodicTable: "f2ac025b831786cfd7df5f32116bed7af3532a95e5fac9e17d841ec9fb5d1d7c",
      Chapter6Experiments: "551fd8bcd4a1aadfe354003ae6e4d47f180aee5da26273108264f31438fdd5d2",
      Chapter6Mixtures: "f912d95b5358471c4185550e6eb0688da37f9040f44720daeefa634aa357035f",
      Chapter6MixtureDiagrams: "1dc5032f707f04850757fe38baf9d1483135f6fdff1bc33e832ef4d1391b20e2",
    };
    for (const [file, expected] of Object.entries(files))
      expect(
        hash(
          readFileSync(`src/components/notes/blocks/${file}.tsx`, "utf8").replace(/\r\n/g, "\n"),
        ),
      ).toBe(expected);
  });
  for (const lang of ["en", "bm"] as const) {
    const source = chapter6Content[lang],
      c = source.compounds;
    it(`${lang}: retains exactly three official sections`, () => {
      const html = renderToStaticMarkup(
        createElement(ScienceF1Chapter6VisualNotesBlock, { content: chapter6Content, lang }),
      );
      expect([...html.matchAll(/data-official-subtopic="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "6.1",
        "6.2",
        "6.3",
      ]);
      expect([...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((m) => m[1])).toEqual(
        source.structure.subtopics,
      );
    });
    it(`${lang}: retains both approved canonical passes`, () => {
      const editable = [
        "compounds",
        "physicalVsChemicalChange",
        "mixturesVsCompounds",
        "keyExamFacts",
        "keyTerms",
        "chapterSummary",
      ];
      const pass1 = Object.fromEntries(
        Object.entries(source).filter(([k]) => k !== "mixtures" && !editable.includes(k)),
      );
      expect(hash(JSON.stringify(pass1))).toBe(
        lang === "en"
          ? "0990263c56186a01be1dc454621774b8dcc27dd5deb84b5b6c6e38ff555491e7"
          : "9c1fbf563c98c7309af562b65118d3f297b67836fc9e55d697f539298d41d87e",
      );
      expect(hash(JSON.stringify(source.mixtures))).toBe(
        lang === "en"
          ? "158db5fa7772ffee5d30bec52c7510f737ab466c2ad0ad9433e7e2b3b983a4c1"
          : "ddaa47de044411da2d45e1dce258808eb30ad46c27b558302548073d4877c186",
      );
    });
    it(`${lang}: renders the source definition and six daily examples`, () => {
      const html = render(lang);
      expect(c.definition).toMatch(
        lang === "bm"
          ? /dua atau lebih unsur yang bercampur secara kimia/
          : /two or more elements that are mixed chemically/,
      );
      expect(c.examples).toEqual(
        lang === "bm"
          ? ["Garam", "Gula", "Kapur tulis", "Marmar", "Politena", "Air tulen"]
          : ["Salt", "Sugar", "Chalk", "Marble", "Polythene", "Water"],
      );
      [c.definition, c.rust, ...c.examples].forEach((t) => expect(html).toContain(escape(t)));
      c.everyday.forEach((e) =>
        [e.elements, e.compound, e.object].forEach((t) => expect(html).toContain(escape(t))),
      );
      expect(html.match(/data-everyday-compound=/g)).toHaveLength(3);
    });
    it(`${lang}: renders all five metal oxides and three alkali-metal word equations`, () => {
      expect(c.formations.slice(0, 5).map((f) => f.product)).toEqual(
        lang === "bm"
          ? ["magnesium oksida", "aluminium oksida", "zink oksida", "besi oksida", "kuprum oksida"]
          : ["magnesium oxide", "aluminium oxide", "zinc oxide", "iron oxide", "copper oxide"],
      );
      expect(c.alkaliFormations.map((f) => f.reactants)).toEqual(
        lang === "bm"
          ? ["litium + air", "natrium + air", "kalium + air"]
          : ["lithium + water", "sodium + water", "potassium + water"],
      );
      [...c.formations, ...c.alkaliFormations].forEach((f) =>
        [f.reactants, f.product].forEach((t) => expect(render(lang)).toContain(escape(t))),
      );
      c.alkaliFormations.forEach((f) =>
        expect(f.product).toMatch(
          lang === "bm" ? /hidroksida \+ gas hidrogen/ : /hydroxide \+ hydrogen gas/,
        ),
      );
      expect(render(lang)).not.toMatch(/NaOH|FeS\b|ionic|covalent|valency|ionik|kovalen|valensi/);
    });
    it(`${lang}: preserves Activity 6.11 apparatus, one spatula each and cooling before weighing`, () => {
      const activity = c.activity611;
      expect(activity.apparatus.map((a) => a.id)).toEqual([
        "lid",
        "crucible",
        "triangle",
        "tripod",
        "burner",
        "balance",
      ]);
      expect(activity.steps[0]).toMatch(
        lang === "bm"
          ? /satu spatula serbuk sulfur dan satu spatula serbuk besi/
          : /one spatula of sulphur powder and one spatula of iron powder/,
      );
      expect(activity.steps[2]).toMatch(lang === "bm" ? /bertukar warna/ : /colour changes/);
      expect(activity.steps[3]).toMatch(
        lang === "bm" ? /^Sejukkan.*Timbang/ : /^Let the product cool.*Weigh/,
      );
      expect(JSON.stringify(activity)).not.toMatch(/\d+\s*(?:°|kg|g\b|minutes|minit|seconds|saat)/);
      const svg = renderToStaticMarkup(
        createElement(CompoundActivityDiagram, { source: c, stage: 0 }),
      );
      for (const part of [
        "tripod",
        "pipeclay-triangle",
        "crucible-with-lid",
        "bunsen-burner",
        "weighing-balance",
      ])
        expect(svg).toContain(`data-apparatus="${part}"`);
      expect(svg).toContain('data-part="lid"');
      activity.apparatus.forEach((a) => expect(render(lang)).toContain(escape(a.label)));
    });
    it(`${lang}: contrasts distinct iron/sulphur with a new compound, without a product magnet test`, () => {
      const svg = renderToStaticMarkup(createElement(CompoundFormationDiagram, { source: c }));
      expect(svg).toContain('data-particle-model="iron-sulphur-mixture"');
      expect(svg).toContain('data-particle-model="iron-sulphide"');
      expect(svg.match(/data-material="iron"/g)).toHaveLength(6);
      expect(svg.match(/data-material="sulphur"/g)).toHaveLength(6);
      expect(svg.match(/data-new-substance/g)).toHaveLength(6);
      expect(c.formations[5].product).toBe(lang === "bm" ? "besi sulfida" : "iron sulphide");
      expect(svg).not.toContain("data-magnet");
    });
    it(`${lang}: renders equal mass without numerical readings`, () => {
      const svg = renderToStaticMarkup(createElement(CompoundMassDiagram, { source: c }));
      expect(svg).toContain('data-balanced-beam="true" d="M83 118H397"');
      expect(svg).toContain("data-equal-mass");
      expect(svg).toContain('data-mass-position="before"');
      expect(svg).toContain('data-mass-position="after"');
      expect(svg.match(/translate\((?:86|322) 0\)/g)).toHaveLength(2);
      expect(svg).not.toMatch(/<text/);
      expect(render(lang)).toContain(escape(c.massConservationNote));
      expect(render(lang)).toContain(escape(c.mineralNote));
    });
    it(`${lang}: uses the source electrolysis definition and correct polarity`, () => {
      expect(c.electrolysisDefinition).toBe(
        lang === "bm"
          ? "Elektrolisis ialah proses penguraian sesuatu sebatian kepada unsur-unsurnya apabila arus elektrik mengalir melaluinya."
          : "Electrolysis is a chemical decomposition of a compound to its elements by passing an electric current through the compound.",
      );
      const [anode, cathode] = c.electrolysis.products;
      expect(anode.id).toBe("anode");
      expect(anode.gas).toBe(lang === "bm" ? "Oksigen" : "Oxygen");
      expect(anode.electrode).toMatch(/positive|positif/i);
      expect(cathode.id).toBe("cathode");
      expect(cathode.gas).toBe(lang === "bm" ? "Hidrogen" : "Hydrogen");
      expect(cathode.electrode).toMatch(/negative|negatif/i);
      const html = render(lang);
      [
        c.separation,
        c.electrolysisDefinition,
        ...c.electrolysis.setup,
        ...c.electrolysis.products.flatMap((p) => [p.electrode, p.gas]),
      ].forEach((t) => expect(html).toContain(escape(t)));
      expect(html).not.toMatch(
        /2\s*:\s*1|splint|‘pop’|berbara|fractional distillation|penyulingan berperingkat|sawdust|habuk kayu/,
      );
    });
    it(`${lang}: renders all physical and chemical comparison facts and exact examples`, () => {
      const change = source.physicalVsChemicalChange,
        html = render(lang);
      change.comparison.forEach((row) =>
        [row.characteristic, row.physicalChange, row.chemicalChange].forEach((t) =>
          expect(html).toContain(escape(t)),
        ),
      );
      [...change.physicalExamples, ...change.chemicalExamples, ...change.common].forEach((t) =>
        expect(html).toContain(escape(t)),
      );
      expect(change.physicalExamples).toEqual(
        lang === "bm"
          ? ["Peleburan ais", "Pembekuan air", "Kondensasi", "Pendidihan air"]
          : ["Ice melting", "Water freezing", "Water boiling"],
      );
      expect(change.chemicalExamples).toEqual(
        lang === "bm"
          ? ["Pengaratan besi", "Fotosintesis", "Pereputan daun", "Respirasi sel"]
          : ["Rusting of iron", "Photosynthesis", "Decaying of leaf", "Cell respiration"],
      );
      expect(html).toContain('data-compound-diagram="physical-change"');
      expect(html).toContain('data-compound-diagram="chemical-change"');
      expect(html.match(/data-same-material="before"/g)).toHaveLength(6);
      expect(html.match(/data-same-material="after"/g)).toHaveLength(6);
    });
    it(`${lang}: includes the verified heat-change row and distinguishes its answer-key source`, () => {
      expect(source.mixturesVsCompounds).toHaveLength(6);
      const heat = source.mixturesVsCompounds[4];
      expect(heat.compound).toBe(lang === "bm" ? "Haba diserap" : "Heat changes during formation");
      const html = render(lang);
      source.mixturesVsCompounds.forEach((row) =>
        [row.characteristic, row.mixture, row.compound].forEach((t) =>
          expect(html).toContain(escape(t)),
        ),
      );
      expect(html.match(/data-source="table-6.2"/g)).toHaveLength(4);
      expect(html.match(/data-source="answer-key-6.3"/g)).toHaveLength(2);
    });
    it(`${lang}: keeps Activities 6.10 and 6.12 as multimedia tasks and only four formative recall concepts`, () => {
      const html = render(lang);
      expect(html.match(/data-presentation-task/g)).toHaveLength(2);
      for (const task of [c.activity610, c.activity612]) {
        expect(task.instructions.join(" ")).toMatch(/multimedia/);
        expect(html).toContain(escape(task.title));
        task.instructions.forEach((t) => expect(html).toContain(escape(t)));
      }
      expect(html).not.toContain('data-activity="6.12"');
      expect(c.activeRecall).toHaveLength(4);
      c.activeRecall.forEach((q) => {
        expect(html).toContain(escape(q.question));
        expect(html).toContain(escape(q.answer));
      });
    });
    it(`${lang}: corrects final facts, terms and summary to all seven approved methods`, () => {
      source.mixtures.separationMethods.forEach((m) => {
        expect(source.keyExamFacts.join(" ")).toContain(m.name);
        expect(source.keyTerms).toContain(m.name);
      });
      expect(source.chapterSummary).toMatch(lang === "bm" ? /tujuh/ : /seven/);
      expect(source.chapterSummary).not.toMatch(/six physical|enam kaedah/);
      expect(render(lang)).toContain(escape(source.chapterSummary));
      expect(chapter6Supplement[lang].electrolysis).toBe(c.electrolysis);
      expect(chapter6Supplement[lang].activeRecall).toBe(c.activeRecall);
      expect(c.electrolysis).not.toHaveProperty("volumeRatio");
      c.electrolysis.products.forEach((p) => expect(p).not.toHaveProperty("test"));
    });
  }
  it("shares all scientific geometry across languages and states", () => {
    const views = (lang: "en" | "bm") => {
      const source = chapter6Content[lang].compounds;
      return [
        ...[0, 1, 2, 3].map((stage) => createElement(CompoundActivityDiagram, { source, stage })),
        createElement(CompoundMassDiagram, { source }),
        createElement(CompoundFormationDiagram, { source }),
        ...[false, true].map((chemical) =>
          createElement(ChangeComparisonDiagram, { source, chemical }),
        ),
        ...(["anode", "cathode"] as const).map((selected) =>
          createElement(ElectrolysisDiagram, { source, selected }),
        ),
        ...source.everyday.map((e) =>
          createElement(EverydayCompoundObject, { id: e.id, label: e.object }),
        ),
      ].map((v) => geometry(renderToStaticMarkup(v)));
    };
    expect(views("en")).toEqual(views("bm"));
  });
  it("electrolysis has complete connected apparatus without quantified gas volumes", () => {
    const svg = renderToStaticMarkup(
      createElement(ElectrolysisDiagram, {
        source: chapter6Content.en.compounds,
        selected: "cathode",
      }),
    );
    for (const part of ["water-sulphuric-acid", "dry-cells", "ammeter"])
      expect(svg).toContain(`data-part="${part}"`);
    expect(svg).toContain('data-circuit="anode-positive"');
    expect(svg).toContain('data-circuit="cathode-negative"');
    expect(svg.match(/data-collection-tube=/g)).toHaveLength(2);
    expect(svg.match(/data-electrode-rod/g)).toHaveLength(2);
    expect(svg).not.toMatch(/data-gas-volume|data-gas-level/);
  });
  it("consumes canonical data and removes the live supplement dependency", () => {
    const source = structuredClone(chapter6Content.en);
    source.compounds.definition = "SOURCE DEFINITION";
    source.compounds.massConservationNote = "SOURCE MASS";
    source.compounds.activity611.steps[0] = "SOURCE STEP";
    source.compounds.electrolysis.products[0].gas = "SOURCE GAS";
    source.compounds.activeRecall[0].answer = "SOURCE ANSWER";
    source.physicalVsChemicalChange.comparison[0].physicalChange = "SOURCE CHANGE";
    source.mixturesVsCompounds[4].compound = "SOURCE HEAT";
    const html = renderToStaticMarkup(createElement(Chapter6Compounds, { source }));
    for (const text of [
      "SOURCE DEFINITION",
      "SOURCE MASS",
      "SOURCE STEP",
      "SOURCE GAS",
      "SOURCE ANSWER",
      "SOURCE CHANGE",
      "SOURCE HEAT",
    ])
      expect(html).toContain(text);
    expect(
      readFileSync("src/components/notes/ScienceF1Chapter6VisualNotesBlock.tsx", "utf8"),
    ).not.toContain("chapter6Supplement");
    for (const file of ["Chapter6Compounds", "Chapter6CompoundDiagrams"])
      expect(readFileSync(`src/components/notes/blocks/${file}.tsx`, "utf8")).not.toMatch(
        /"Iron powder"|"Hydrogen"|"Serbuk besi"|"Haba diserap"|formations\s*[:=]\s*\[/,
      );
    const audit = readFileSync("src/content/form1/science/chapter-6/pass3-source-audit.md", "utf8");
    expect(audit).toContain("answer key p. 281");
    expect(audit).toContain("Haba diserap");
    expect(audit).toContain("2:1");
  });
});

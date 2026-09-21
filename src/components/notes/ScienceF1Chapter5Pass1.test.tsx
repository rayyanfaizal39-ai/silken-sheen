import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { ScienceF1Chapter5VisualNotesBlock } from "./ScienceF1Chapter5VisualNotesBlock";
import { MatterEvidenceVisuals, MatterPropertiesVisuals } from "./blocks/Chapter5MatterInNature";

const render = (lang: "bm" | "en") =>
  renderToStaticMarkup(
    createElement(ScienceF1Chapter5VisualNotesBlock, { content: chapter5Content, lang }),
  );
const escaped = (value: string) =>
  renderToStaticMarkup(createElement("span", null, value)).slice(6, -7);
const geometry = (html: string) =>
  [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(([svg]) =>
    svg
      .replace(/<desc>[\s\S]*?<\/desc>/g, "")
      .replace(/aria-label="[^"]*"/g, "")
      .replace(/ data-tsd-source="[^"]*"/g, ""),
  );

describe("Chapter 5 Pass 1 live Notes", () => {
  for (const lang of ["en", "bm"] as const) {
    const source = chapter5Content[lang];
    it(`${lang}: presents exactly two official subtopics and two path links`, () => {
      const html = render(lang);
      expect(html.match(/data-official-subtopic=/g)).toHaveLength(2);
      const nav = html.match(/<nav[^>]*data-chapter-path[\s\S]*?<\/nav>/)![0];
      expect(nav.match(/<a /g)).toHaveLength(2);
      for (const title of source.structure.subtopics) expect(html).toContain(escaped(title));
      const headings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)].map((m) => m[1]);
      expect(headings.filter((t) => /^5\.[12] /.test(t))).toEqual(source.structure.subtopics);
      expect(html).not.toContain("Jirim dalam Alam Semula Jadi");
    });
    it(`${lang}: uses canonical matter and non-matter examples, definition and both evidence conclusions`, () => {
      const html = render(lang);
      expect(html).toContain(escaped(source.matterInNature.definition));
      for (const text of [
        ...source.matterInNature.matterExamples,
        ...source.matterInNature.nonMatterExamples,
      ])
        expect(html).toContain(escaped(text));
      for (const activity of source.matterInNature.evidenceActivities) {
        for (const text of Object.values(activity)) expect(html).toContain(escaped(text));
      }
      expect(html).toContain('data-diagram="sample-space"');
      expect(html).toContain('data-apparatus="lever-balance"');
      expect(html).toContain(escaped(source.matterInNature.labels.mass));
      expect(html).toContain(escaped(source.matterInNature.labels.space));
    });
    it(`${lang}: shows balanced inflated balloons, then air escaping and the rod tilting towards the inflated balloon`, () => {
      const html = render(lang);
      const before = html.match(/<svg data-diagram="balloon-before"[\s\S]*?<\/svg>/)![0];
      const after = html.match(/<svg data-diagram="balloon-after"[\s\S]*?<\/svg>/)![0];
      expect(before.match(/data-balloon="inflated"/g)).toHaveLength(2);
      expect(before).toContain('d="M70 75 H250"');
      expect(after.match(/data-balloon="inflated"/g)).toHaveLength(1);
      expect(after).toContain('d="M70 100 L250 50"');
      expect(after).toContain('data-air="escaping"');
      expect(after).toContain('cx="75" cy="171"');
      expect(after).not.toMatch(/\d+\s*(?:kg|grams|gram)\b/);
    });
    it(`${lang}: displays every physical and chemical example and four working classification links`, () => {
      const html = render(lang);
      for (const example of [
        ...source.matterInNature.physicalProperties,
        ...source.matterInNature.chemicalProperties,
      ]) {
        expect(html).toContain(escaped(example.label));
        expect(html).toContain(escaped(example.detail));
      }
      expect(html.match(/data-classification-tool=/g)).toHaveLength(4);
      for (const target of ["density", "melting", "boiling", "solubility"]) {
        expect(html).toContain(`href="#chapter5-${target}"`);
        expect(html).toContain(`id="chapter5-${target}"`);
      }
    });
    it(`${lang}: preserves all four density comparisons without inventing glycerol/water layers`, () => {
      const html = render(lang);
      expect(html.match(/data-density-comparison=/g)).toHaveLength(4);
      for (const row of source.matterInNature.densityClassification)
        for (const value of Object.values(row)) expect(html).toContain(escaped(value));
      const first = html.match(/<svg data-diagram="density-0"[\s\S]*?<\/svg>/)![0];
      expect(first).toContain('data-density-mode="comparison-only"');
      expect(first).not.toContain("liquid-layers");
      for (const mode of ["liquid-layers", "sink", "float"])
        expect(html).toContain(`data-density-mode="${mode}"`);
    });
    it(`${lang}: presents all temperature values in independent columns, with no process arrow`, () => {
      const table = render(lang).match(/<table[\s\S]*?<\/table>/)![0];
      expect(table.match(/scope="col"/g)).toHaveLength(3);
      for (const row of source.matterInNature.meltingBoilingPoints)
        for (const value of Object.values(row)) expect(table).toContain(escaped(value));
      expect(table).not.toContain("→");
    });
    it(`${lang}: distinguishes solute, solvent and solution using canonical labels and definition`, () => {
      const html = render(lang);
      for (const name of ["solute", "solvent", "solution"] as const) {
        expect(html).toContain(`data-diagram="${name}"`);
        expect(html).toContain(escaped(source.matterInNature.labels[name]));
      }
      expect(html).toContain(escaped(source.matterInNature.solubilityDefinition));
      expect(html).not.toMatch(/saturation|concentration of solution|ketepuan|kepekatan larutan/i);
    });
  }
  it("shares all SVG geometry across BM/DLP", () =>
    expect(geometry(render("bm"))).toEqual(geometry(render("en"))));
  it("renders supplied canonical facts instead of local copies", () => {
    const source = structuredClone(chapter5Content.en.matterInNature);
    source.definition = "CANONICAL DEFINITION";
    source.nonMatterExamples = ["CANONICAL NON-MATTER"];
    source.matterExamples = ["CANONICAL MATTER"];
    source.evidenceActivities.forEach((v, i) => (v.conclusion = `CANONICAL CONCLUSION ${i}`));
    source.densityClassification.forEach((v, i) => (v.substance = `CANONICAL DENSITY ${i}`));
    source.meltingBoilingPoints.forEach((v, i) => (v.meltingPoint = `CANONICAL TEMPERATURE ${i}`));
    source.solubilityDefinition = "CANONICAL SOLUBILITY";
    const html = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(MatterEvidenceVisuals, { source }),
        createElement(MatterPropertiesVisuals, { source }),
      ),
    );
    for (const value of [
      source.definition,
      ...source.nonMatterExamples,
      ...source.matterExamples,
      source.solubilityDefinition,
      ...source.evidenceActivities.map((v) => v.conclusion),
      ...source.densityClassification.map((v) => v.substance),
      ...source.meltingBoilingPoints.map((v) => v.meltingPoint),
    ])
      expect(html).toContain(value);
    const component = readFileSync(
      "src/components/notes/blocks/Chapter5MatterInNature.tsx",
      "utf8",
    );
    expect(component).toContain("import type { Chapter5Content }");
    expect(component).not.toMatch(/"(?:Glycerol|Mercury|Petrol|Sugar|Gliserol|Merkuri|Gula)"/);
  });
  it("leaves the complete canonical Pass 2 data untouched", () => {
    const hashes = {
      bm: "e71c2ae2e7a783077bec29da9290a18eddec4f741f02dcf14bd6a91c6e03aa08",
      en: "dc968c114702e7e73eba52a3cf3b565b6467b5ad84510085062ad9822fda60cb",
    };
    for (const lang of ["bm", "en"] as const)
      expect(
        createHash("sha256")
          .update(JSON.stringify(chapter5Content[lang].statesOfMatter))
          .digest("hex"),
      ).toBe(hashes[lang]);
  });
});

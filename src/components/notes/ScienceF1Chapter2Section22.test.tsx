import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import {
  chapter2PracticalAreas,
  localizeChapter2PracticalAreas,
} from "@/content/form1/science/chapter-2/chapter2-activities";
import { parseWordEquation } from "./blocks/EquationFlow";
import {
  ComplementaryCycle,
  PhotosynthesisInvestigationHub,
  PhotosynthesisProcessVisual,
  RespirationVisual,
} from "./blocks/Chapter2ProcessVisuals";
import { ScienceF1Chapter2VisualNotesBlock } from "./ScienceF1Chapter2VisualNotesBlock";

// Render every actual hub state. These are renderer tests, not browser-click claims.
const selection = vi.hoisted(() => ({ index: null as number | null }));
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => {
      const result = actual.useState(initial);
      return selection.index === null ? result : [selection.index, result[1]];
    },
  };
});
function hub(lang: "bm" | "en", index: number) {
  const area = localizeChapter2PracticalAreas(lang).find(
    (a) => a.id === "photosynthesis-investigation-hub",
  )!;
  selection.index = index;
  try {
    return renderToStaticMarkup(<PhotosynthesisInvestigationHub area={area} lang={lang} />);
  } finally {
    selection.index = null;
  }
}
function geometry(html: string) {
  return Array.from(
    html.matchAll(/<(?:svg|path|ellipse|circle|rect|g|line|text|marker)\b[^>]*>/g),
    (match) =>
      match[0].replace(
        /\s(?:id|aria-labelledby|marker-end|data-investigation-diagram|data-process)="[^"]*"/g,
        "",
      ),
  ).join("\n");
}
function escape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll("'", "&#x27;")
    .replaceAll('"', "&quot;");
}

describe("Science Form 1 Chapter 2 final Section 2.2 pass", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter2Content[lang];
    const area = localizeChapter2PracticalAreas(lang).find(
      (a) => a.id === "photosynthesis-investigation-hub",
    )!;
    it(`${lang}: live chapter renders distinct breathing and cell processes with the source definition and equation`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter2VisualNotesBlock content={chapter2Content} lang={lang} />,
      );
      for (const value of [
        'data-process="breathing"',
        'data-process="cell-respiration"',
        'data-lungs="true"',
        'data-mitochondrion="true"',
        'data-cell-zoom="true"',
        content.respiration.definition,
      ])
        expect(html).toContain(value);
      const equation = parseWordEquation(content.respiration.wordEquation);
      expect(html).toContain(`data-equation-reactants="true">${equation.reactants}`);
      expect(html).toContain(`data-equation-products="true">${equation.products}`);
      expect(html).toContain(
        lang === "bm" ? "Pernafasan ≠ respirasi sel" : "Breathing ≠ cell respiration",
      );
      expect(html).toContain(
        lang === "bm" ? "Pertukaran gas ≠ pembebasan tenaga" : "Gas exchange ≠ energy release",
      );
    });
    it(`${lang}: photosynthesis includes all six labelled flows and separate equation conditions`, () => {
      const html = renderToStaticMarkup(
        <PhotosynthesisProcessVisual content={content} lang={lang} />,
      );
      for (const label of content.photosynthesis.requirements) expect(html).toContain(label);
      const equation = parseWordEquation(content.photosynthesis.wordEquation);
      for (const value of equation.products.split(" + "))
        expect(html).toContain(`>${value}</text>`);
      expect(html).toContain('data-root-water="true"');
      expect(html).toContain('data-chloroplast="true"');
      expect(html).toContain(
        `data-equation-conditions="true" class="mb-1 text-amber-200">${equation.conditions}`,
      );
      expect(html).toContain(`data-equation-reactants="true">${equation.reactants}</span>`);
      expect(equation.reactants).not.toContain(equation.conditions);
    });
    it.each(area.investigations!.map((item, index) => [item.id, index] as const))(
      `${lang}: selecting %s renders source question, setup, variables, observation and inference`,
      (id, index) => {
        const html = hub(lang, index);
        const item = area.investigations![index];
        expect(html.match(/data-investigation-selector=/g)).toHaveLength(5);
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
        expect(html).toMatch(
          new RegExp(`aria-pressed="true"[^>]*data-investigation-selector="${id}"`),
        );
        expect(html).toContain(`data-selected-investigation="${id}"`);
        for (const text of [
          item.question,
          item.setup,
          item.variables,
          ...(item.visualSteps ?? []),
          ...(item.safety ? [item.safety] : []),
        ])
          expect(html).toContain(escape(text));
        const observation = html.match(
          /data-source-observation="true"[\s\S]*?<p[^>]*>(.*?)<\/p>/,
        )![1];
        const inference = html.match(/data-source-inference="true"[\s\S]*?<p[^>]*>(.*?)<\/p>/)![1];
        expect(`${observation} ${inference}`).toBe(escape(item.observeInfer));
        expect(html).not.toContain("undefined");
        if (id !== "starch") {
          expect(html).toContain(`data-investigation-diagram="${id}-0"`);
          expect(html).toContain(`data-investigation-diagram="${id}-1"`);
        }
      },
    );
    it(`${lang}: all seven starch stages depict an ethanol container inside the water bath without direct heating`, () => {
      const html = hub(lang, 0);
      expect(html.match(/data-starch-stage=/g)).toHaveLength(7);
      const bath = html.match(/<svg[^>]*data-starch-stage="3"[\s\S]*?<\/svg>/)![0];
      expect(bath).toContain('data-hot-water-bath="true"');
      expect(bath).toContain('data-container="ethanol"');
      expect(bath).toContain('data-nested-container="true"');
      expect(bath).toContain("M35 72 V202 H265 V72");
      expect(bath).toContain("M96 38 V173 Q150 198 204 173 V38");
      expect(html).toContain('data-white-tile="true"');
      expect(html).toContain('data-iodine="true"');
      expect(html).toContain(
        lang === "bm" ? "jangan panaskan secara terus" : "never heat it directly",
      );
      expect(html).not.toMatch(/data-(?:flame|burner|direct-ethanol-heating)=/);
      expect(html).not.toContain("blue-black");
    });
    it(`${lang}: requirement diagrams depict light/dark, variegation, sealed KOH jars and watered/unwatered plants`, () => {
      const light = hub(lang, 1);
      expect(light).toContain('data-light="true"');
      expect(light).toContain('data-dark-enclosure="true"');
      expect(light.match(/data-plant="true"/g)).toHaveLength(2);
      const chlorophyll = hub(lang, 2);
      expect(chlorophyll.match(/data-leaf="variegated"/g)).toHaveLength(2);
      expect(chlorophyll.match(/data-leaf-area="green"/g)).toHaveLength(2);
      expect(chlorophyll.match(/data-leaf-area="non-green"/g)).toHaveLength(2);
      expect(chlorophyll).toContain('fill="#244ca8"');
      expect(chlorophyll).toContain('fill="#b77935"');
      const co2 = hub(lang, 3);
      expect(co2.match(/data-sealed-bell-jar="true"/g)).toHaveLength(2);
      expect(co2.match(/data-light="true"/g)).toHaveLength(2);
      expect(co2.match(/data-koh="true"/g)).toHaveLength(1);
      expect(co2).toContain(lang === "bm" ? "pengawasan guru/makmal" : "teacher/lab supervision");
      const water = hub(lang, 4);
      expect(water).toContain('data-watering="watered"');
      expect(water).toContain('data-watering="unwatered"');
      expect(water.match(/data-light="true"/g)).toHaveLength(2);
    });
    it(`${lang}: the source comparison table and complementary material cycle remain in the live renderer`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter2VisualNotesBlock content={chapter2Content} lang={lang} />,
      );
      for (const row of content.comparisonTable)
        for (const text of Object.values(row)) expect(html).toContain(text);
      expect(html).toContain("<table ");
      expect(html).toContain('data-process="complementary-cycle"');
      expect(html).toContain(content.complementaryRelationship);
      const cycle = renderToStaticMarkup(<ComplementaryCycle content={content} lang={lang} />);
      expect(cycle).not.toMatch(lang === "bm" ? /Tenaga/ : /Energy/);
    });
  }
  it("BM and DLP share every diagram's SVG geometry and contain no opposite-language diagram labels", () => {
    for (const Component of [RespirationVisual, PhotosynthesisProcessVisual, ComplementaryCycle]) {
      const bm = renderToStaticMarkup(<Component content={chapter2Content.bm} lang="bm" />);
      const en = renderToStaticMarkup(<Component content={chapter2Content.en} lang="en" />);
      expect(geometry(bm)).toBe(geometry(en));
      expect(bm).not.toMatch(
        />(?:Water|Chlorophyll|Glucose|Oxygen|Mitochondria|Photosynthesis)<\/text>/,
      );
      expect(en).not.toMatch(/>(?:Air|Klorofil|Glukosa|Oksigen|Mitokondria|Fotosintesis)<\/text>/);
    }
    for (let index = 0; index < 5; index++)
      expect(geometry(hub("bm", index))).toBe(geometry(hub("en", index)));
  });
  it("the hub consumes a changed source entry rather than a duplicate experiment dataset", () => {
    const area = structuredClone(
      localizeChapter2PracticalAreas("en").find(
        (a) => a.id === "photosynthesis-investigation-hub",
      )!,
    );
    Object.assign(area.investigations![0], {
      question: "SOURCE QUESTION",
      setup: "SOURCE SETUP",
      variables: "SOURCE VARIABLES",
      observeInfer: "SOURCE OBSERVATION. SOURCE INFERENCE.",
      safety: "SOURCE SAFETY",
    });
    const html = renderToStaticMarkup(<PhotosynthesisInvestigationHub area={area} lang="en" />);
    for (const text of [
      "SOURCE QUESTION",
      "SOURCE SETUP",
      "SOURCE VARIABLES",
      "SOURCE OBSERVATION.",
      "SOURCE INFERENCE.",
      "SOURCE SAFETY",
    ])
      expect(html).toContain(text);
    expect(
      chapter2PracticalAreas.filter((a) => a.id === "photosynthesis-investigation-hub"),
    ).toHaveLength(1);
    const source = readFileSync(
      new URL("./blocks/Chapter2ProcessVisuals.tsx", import.meta.url),
      "utf8",
    );
    expect(source).not.toContain("investigations: [");
    expect(source).toContain("onClick={() => setIndex(i)}");
    expect(source).toContain("aria-controls={id}");
  });
});

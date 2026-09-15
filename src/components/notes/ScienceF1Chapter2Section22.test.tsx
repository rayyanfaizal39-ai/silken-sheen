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
        /\s(?:id|aria-label|aria-labelledby|aria-describedby|marker-end|data-investigation-diagram|data-process)="[^"]*"/g,
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
      expect(bath).not.toMatch(
        /data-(?:flame|burner|direct-ethanol-heating|active-water-heating|heat-source)=/,
      );
      expect(html).not.toContain("blue-black");
    });
    it(`${lang}: only Stage 1 actively heats water; Stage 4 only softens the leaf in hot water`, () => {
      const html = hub(lang, 0);
      const boil = html.match(/<svg[^>]*data-starch-stage="1"[\s\S]*?<\/svg>/)![0];
      const soften = html.match(/<svg[^>]*data-starch-stage="4"[\s\S]*?<\/svg>/)![0];
      for (const diagram of [boil, soften]) {
        expect(diagram).toContain('data-container="water"');
        expect(diagram).toContain('data-leaf="plain"');
        expect(diagram).toContain('data-hot-water="true"');
      }
      expect(boil).toContain('data-active-water-heating="true"');
      expect(boil).toContain('data-heat-source="electric-hotplate"');
      expect(boil).toContain('data-boiling-water="true"');
      expect(boil).toContain('<ellipse cx="150" cy="192"');
      expect(boil).toContain('<rect x="75" y="199"');
      expect(soften).not.toMatch(
        /data-(?:active-water-heating|heat-source|boiling-water|flame|burner)=/,
      );
      expect(html.match(/data-active-water-heating=/g)).toHaveLength(1);
    });
    it(`${lang}: Stage 6 adds iodine with a dropper; Stage 7 emphasizes the final dark-blue result without a dropper`, () => {
      const html = hub(lang, 0);
      const add = html.match(/<svg[^>]*data-starch-stage="6"[\s\S]*?<\/svg>/)![0];
      const observe = html.match(/<svg[^>]*data-starch-stage="7"[\s\S]*?<\/svg>/)![0];
      for (const diagram of [add, observe]) {
        expect(diagram).toContain('data-white-tile="true"');
        expect(diagram).toContain('data-leaf="plain"');
      }
      expect(add).toContain('data-iodine="true"');
      expect(add).toContain('data-iodine-dropper="true"');
      expect(add).toContain('d="M173 72 Q161 87 173 93 Q185 87 173 72"');
      expect(add).toContain(lang === "bm" ? ">Larutan iodin</text>" : ">Iodine solution</text>");
      expect(observe).toContain('data-final-leaf-result="dark-blue"');
      expect(observe).toContain('data-result-emphasis="true"');
      expect(observe).toContain('fill="#244ca8"');
      expect(observe).toContain("scale(.85)");
      expect(observe).toContain(lang === "bm" ? ">Biru tua</text>" : ">Dark blue</text>");
      expect(observe).not.toMatch(/data-iodine(?:-dropper)?=/);
      expect(observe).not.toContain(lang === "bm" ? "Larutan iodin" : "Iodine solution");
      expect(html.match(/data-iodine-dropper=/g)).toHaveLength(1);
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
    it(`${lang}: the cycle has compact desktop and mobile loops with dominant process nodes and source material labels`, () => {
      const html = renderToStaticMarkup(<ComplementaryCycle content={content} lang={lang} />);
      const desktop = html.match(/<svg[^>]*data-cycle-layout="desktop"[\s\S]*?<\/svg>/)![0];
      const mobile = html.match(/<svg[^>]*data-cycle-layout="mobile"[\s\S]*?<\/svg>/)![0];
      expect(desktop).toContain('viewBox="0 0 760 260"');
      expect(desktop).toContain("hidden w-full max-w-[52rem] md:block");
      expect(mobile).toContain('viewBox="0 0 340 330"');
      expect(mobile).toContain("block w-full max-w-[21rem] md:hidden");
      for (const diagram of [desktop, mobile]) {
        expect(diagram.match(/data-cycle-node=/g)).toHaveLength(2);
        expect(diagram).toContain('data-cycle-node="photosynthesis"');
        expect(diagram).toContain('data-cycle-node="respiration"');
        expect(diagram).toContain('data-cycle-symbol="leaf-sunlight"');
        expect(diagram).toContain('data-cycle-symbol="cell-mitochondrion"');
        expect(diagram).toContain('fill="#064e3b"');
        expect(diagram).toContain('fill="#164e63"');
        expect(diagram).toContain('font-size="18"');
        expect(diagram).toContain('font-size="14"');
        expect(diagram.match(/marker-end=/g)).toHaveLength(2);
        const outward = diagram.match(/data-cycle-flow="to-respiration"[\s\S]*?<\/text>/)![0];
        const returning = diagram.match(/data-cycle-flow="to-photosynthesis"[\s\S]*?<\/text>/)![0];
        expect(outward).toContain(
          lang === "bm" ? ">Glukosa + Oksigen</text>" : ">Glucose + Oxygen</text>",
        );
        expect(returning).toContain(
          lang === "bm" ? ">Karbon dioksida + Air</text>" : ">Carbon dioxide + Water</text>",
        );
        expect(diagram).not.toMatch(/>(?:Produces|Used in|Menghasilkan|Digunakan dalam)</);
      }
      expect(desktop).toContain('d="M260 120 C315 32 445 32 500 120"');
      expect(desktop).toContain('d="M500 170 C445 240 315 240 260 170"');
      expect(mobile).toContain('d="M190 260 V295 H32 Q18 295 18 281 V62 Q18 48 32 48 H60"');
    });
    it(`${lang}: accessible source explanation stays below the cycle without native title tooltips`, () => {
      const html = renderToStaticMarkup(<ComplementaryCycle content={content} lang={lang} />);
      expect(html).not.toMatch(/<title\b|\stitle=/);
      const caption = html.match(/<figcaption id="([^"]+)"[^>]*>([\s\S]*?)<\/figcaption>/)!;
      expect(caption[2]).toBe(escape(content.complementaryRelationship));
      expect(html.match(/role="img"/g)).toHaveLength(2);
      expect(html.match(/aria-label=/g)).toHaveLength(2);
      for (const svg of html.matchAll(/<svg[^>]*>/g))
        expect(svg[0]).toContain(`aria-describedby="${caption[1]}"`);
      expect(html.lastIndexOf("</svg>")).toBeLessThan(html.indexOf("<figcaption"));
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

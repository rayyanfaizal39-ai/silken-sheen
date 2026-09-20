import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ScienceF1Chapter4VisualNotesBlock } from "./ScienceF1Chapter4VisualNotesBlock";
import {
  Chapter4FlowerReproduction,
  FlowerGeometry,
  FlowerTypes,
  PollinationComparison,
  PlantFertilisation,
} from "./blocks/Chapter4FlowerReproduction";
import {
  Chapter4SeedReproduction,
  GerminationSequence,
  GerminationConditions,
  GerminationExperiment,
  SeedGeometry,
} from "./blocks/Chapter4SeedReproduction";
const esc = (s: string) => renderToStaticMarkup(<>{s}</>);
const geometry = (s: string) =>
  [...s.matchAll(/<(?:svg|g|path|circle|ellipse|rect|text|marker)\b[^>]*>/g)]
    .map((m) => m[0].replace(/ (?:id|aria-label|marker-end)="[^"]*"/g, ""))
    .join("\n");
describe("Chapter 4 Pass 4 live plant visuals", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter4Content[lang],
      source = content.plantReproduction;
    it(`${lang}: one official 4.7 section and one content heading, without invented numbering`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter4VisualNotesBlock content={chapter4Content} lang={lang} />,
      );
      expect(html.match(/data-curriculum-subtopic="4.7"/g)).toHaveLength(1);
      const body = html.replace(/<header[\s\S]*?<\/header>/, "");
      expect(body.match(/>4\.7<\/p>/g)).toHaveLength(1);
      expect(body).toContain(esc(content.officialSubtopics[6].title));
      expect(body).not.toMatch(/4\.7\.[0-9]/);
    });
    it(`${lang}: source flower groups and all eight labelled anatomical structures render`, () => {
      const html = renderToStaticMarkup(
        <Chapter4FlowerReproduction content={content} lang={lang} />,
      );
      source.flowerParts.forEach((p) => expect(html).toContain(esc(p.part)));
      for (let i = 0; i < 8; i++) expect(html).toContain(`data-flower-part="${i}"`);
      expect(html).toContain('data-flower-organ="stamen"');
      expect(html).toContain('data-flower-organ="pistil"');
      for (const p of source.flowerParts.slice(0, 2)) expect(html).toContain(p.function);
    });
    it(`${lang}: bisexual and unisexual flowers show both versus separate reproductive organs`, () => {
      const html = renderToStaticMarkup(<FlowerTypes source={source} lang={lang} />);
      expect(html).toContain(esc(source.flowerTypes.bisexual));
      expect(html).toContain(esc(source.flowerTypes.unisexual));
      source.flowerTypes.unisexualExamples.forEach((x) => expect(html).toContain(esc(x)));
      const male = renderToStaticMarkup(
          <svg>
            <FlowerGeometry sex="male" />
          </svg>,
        ),
        female = renderToStaticMarkup(
          <svg>
            <FlowerGeometry sex="female" />
          </svg>,
        );
      expect(male).toContain('data-flower-organ="stamen"');
      expect(male).not.toContain('data-flower-organ="pistil"');
      expect(female).not.toContain('data-flower-organ="stamen"');
      expect(female).toContain('data-flower-organ="pistil"');
    });
    it(`${lang}: pollination definition, anther-to-stigma route, both agents and all characteristics/examples remain canonical`, () => {
      const html = renderToStaticMarkup(
        <Chapter4FlowerReproduction content={content} lang={lang} />,
      );
      expect(html).toContain(esc(source.pollinationDefinition));
      expect(html).toContain('data-reproduction-diagram="anther-to-stigma"');
      source.pollinatingAgents.forEach((agent, i) => {
        expect(html).toContain(`data-reproduction-diagram="pollinating-agent-${i}"`);
        [agent.agent, agent.mechanism, ...agent.flowerCharacteristics, ...agent.examples].forEach(
          (x) => expect(html).toContain(esc(x)),
        );
      });
      expect(html).toContain('data-pollen-carrier="insect"');
      expect(html).toContain('data-furry-stigma="true"');
    });
    it(`${lang}: self uses one plant and same-flower/other-flower routes; cross uses two plants of the same species`, () => {
      const html = renderToStaticMarkup(<PollinationComparison source={source} lang={lang} />);
      const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0]);
      expect(svgs[0].match(/data-plant=/g)).toHaveLength(1);
      expect(svgs[0]).toContain("M44 70 Q23 31 67 52");
      expect(svgs[1].match(/data-plant=/g)).toHaveLength(2);
      expect(svgs[1]).toContain('data-same-species="true"');
      [
        source.pollinationTypes.self,
        source.pollinationTypes.cross,
        ...source.crossPollinationAdvantages,
      ].forEach((x) => expect(html).toContain(esc(x)));
    });
    it(`${lang}: four ordered source steps show pollen tube through style and gamete fusion in ovule`, () => {
      const html = renderToStaticMarkup(<PlantFertilisation source={source} lang={lang} />);
      let prior = -1;
      source.fertilisationSteps.forEach((step) => {
        const pos = html.indexOf(esc(step));
        expect(pos).toBeGreaterThan(prior);
        prior = pos;
      });
      expect(html).toContain('data-pollen-tube="stigma-style-ovary-ovule"');
      expect(html).toContain('data-fertilisation-site="ovule"');
      expect(html).toContain('data-reproduction-diagram="fusion-inside-ovule"');
      source.afterFertilisation.forEach((outcome) =>
        expect(html).toContain(esc(`${outcome.source} → ${outcome.outcome}`)),
      );
      expect(html).not.toMatch(/double fertilisation|endosperm nucleus|persenyawaan ganda/i);
    });
    it(`${lang}: all seed structures and source mono/dicot comparison render`, () => {
      const html = renderToStaticMarkup(<Chapter4SeedReproduction content={content} lang={lang} />);
      source.seedParts.forEach((p) => expect(html).toContain(esc(p.part)));
      for (let i = 0; i < 6; i++) expect(html).toContain(`data-seed-part="${i}"`);
      expect(html).toContain(esc(source.seedTypes.monocotyledonous));
      expect(html).toContain(esc(source.seedTypes.dicotyledonous));
      const mono = html.match(
        /<svg[^>]*data-reproduction-diagram="seed-type-monocotyledonous"[\s\S]*?<\/svg>/,
      )![0];
      const di = html.match(
        /<svg[^>]*data-reproduction-diagram="seed-type-dicotyledonous"[\s\S]*?<\/svg>/,
      )![0];
      expect(mono.match(/data-cotyledon=/g)).toHaveLength(1);
      expect(di.match(/data-cotyledon=/g)).toHaveLength(2);
    });
    it(`${lang}: germination cotyledons visibly differ relative to the same soil line`, () => {
      for (const type of ["epigeal", "hypogeal"] as const) {
        const html = renderToStaticMarkup(
          <GerminationSequence type={type} label={type} soil="soil" />,
        );
        const ys = [...html.matchAll(/data-cotyledon-y="(\d+)"/g)].map((m) => Number(m[1]));
        expect(html).toContain('data-soil-line="147"');
        expect(ys[0]).toBeGreaterThan(147);
        for (const y of ys.slice(1)) {
          if (type === "epigeal") expect(y).toBeLessThan(147);
          else expect(y).toBeGreaterThan(147);
        }
      }
      const html = renderToStaticMarkup(<Chapter4SeedReproduction content={content} lang={lang} />);
      Object.values(source.germinationTypes).forEach((x) => expect(html).toContain(esc(x)));
    });
    it(`${lang}: only water, air and suitable temperature are required; full light exam tip remains`, () => {
      const html = renderToStaticMarkup(<GerminationConditions source={source} lang={lang} />);
      source.germinationConditions.forEach((x) => expect(html).toContain(esc(x)));
      expect(html).toContain(esc(source.germinationExamTip));
      expect(html).toContain(
        lang === "en"
          ? "Not required to start germination"
          : "Tidak diperlukan untuk memulakan percambahan",
      );
      const svg = html.match(/<svg[\s\S]*?<\/svg>/)![0];
      expect(svg).not.toMatch(/light|cahaya/i);
    });
    it(`${lang}: Experiment 4.1 uses verified A–D apparatus and canonical reasons without unverified temperature range/results`, () => {
      const html = renderToStaticMarkup(<GerminationExperiment source={source} lang={lang} />);
      source.germinationExperiment.forEach((setup) => {
        expect(html).toContain(`data-experiment-setup="${setup.label}"`);
        [setup.medium, setup.temperature, setup.cover].forEach((text) =>
          expect(html).toContain(esc(text)),
        );
      });
      source.germinationConditionDetails.forEach((d) => {
        expect(html).toContain(esc(d.condition));
        expect(html).toContain(esc(d.reason));
      });
      expect(html).toContain('data-cotton="moist"');
      expect(html).toContain('data-cotton="dry"');
      expect(html).toContain('data-air-condition="cooled-boiled-water-oil-layer"');
      expect(html).toContain('data-refrigerator="true"');
      expect(html).not.toMatch(/25[–-]35|data-measured-result/);
      expect(html).toContain("A ↔ B");
      expect(html).toContain("A ↔ C");
      expect(html).toContain("A ↔ D");
    });
  }
  it("BM/DLP share all scientific geometry", () => {
    const html = (["bm", "en"] as const).map((lang) =>
      renderToStaticMarkup(
        <>
          <Chapter4FlowerReproduction content={chapter4Content[lang]} lang={lang} />
          <Chapter4SeedReproduction content={chapter4Content[lang]} lang={lang} />
        </>,
      ),
    );
    expect(geometry(html[0])).toBe(geometry(html[1]));
  });
  it("selection only highlights existing shared flower/seed geometry", () => {
    for (const count of [8, 6]) {
      const all = Array.from({ length: count }, (_, selected) =>
        renderToStaticMarkup(
          <svg>
            {count === 8 ? (
              <FlowerGeometry selected={selected} />
            ) : (
              <SeedGeometry selected={selected} />
            )}
          </svg>,
        ),
      );
      const structural = all.map((html) =>
        geometry(html).replace(/ data-highlighted="[^"]*"| opacity="[^"]*"/g, ""),
      );
      expect(new Set(structural).size).toBe(1);
    }
  });
  it("renderers consume supplied plant content, not duplicate fact arrays", () => {
    const content = structuredClone(chapter4Content.en),
      s = content.plantReproduction;
    s.pollinationDefinition = "SOURCE POLLINATION";
    s.flowerTypes.bisexual = "SOURCE BISEXUAL";
    s.flowerTypes.unisexual = "SOURCE UNISEXUAL";
    s.flowerTypes.unisexualExamples = ["SOURCE EXAMPLE"];
    s.pollinatingAgents.forEach((a, i) => {
      a.agent = `SOURCE AGENT ${i}`;
      a.mechanism = `SOURCE MECHANISM ${i}`;
      a.flowerCharacteristics = [`SOURCE CHARACTERISTIC ${i}`];
      a.examples = [`SOURCE AGENT EXAMPLE ${i}`];
    });
    s.crossPollinationAdvantages = ["SOURCE ADVANTAGE"];
    s.fertilisationSteps = ["SOURCE STEP 0", "SOURCE STEP 1", "SOURCE STEP 2", "SOURCE STEP 3"];
    s.afterFertilisation.forEach((o, i) => {
      o.source = `SOURCE BEFORE ${i}`;
      o.outcome = `SOURCE AFTER ${i}`;
    });
    s.seedTypes.monocotyledonous = "SOURCE MONO";
    s.seedTypes.dicotyledonous = "SOURCE DI";
    s.germinationTypes.epigeal = "SOURCE EPIGEAL";
    s.germinationTypes.hypogeal = "SOURCE HYPOGEAL";
    s.germinationConditions = ["SOURCE WATER", "SOURCE AIR", "SOURCE TEMPERATURE"];
    s.germinationConditionDetails.forEach((d, i) => {
      d.reason = `SOURCE REASON ${i}`;
    });
    s.germinationExperiment.forEach((d, i) => {
      d.medium = `SOURCE SETUP ${i}`;
    });
    s.germinationExamTip = "SOURCE TIP";
    const html = renderToStaticMarkup(
      <>
        <Chapter4FlowerReproduction content={content} lang="en" />
        <Chapter4SeedReproduction content={content} lang="en" />
      </>,
    );
    for (const text of [
      "POLLINATION",
      "BISEXUAL",
      "UNISEXUAL",
      "EXAMPLE",
      "ADVANTAGE",
      "MONO",
      "DI",
      "EPIGEAL",
      "HYPOGEAL",
      "WATER",
      "AIR",
      "TEMPERATURE",
      "TIP",
    ])
      expect(html).toContain(`SOURCE ${text}`);
    for (let i = 0; i < 2; i++)
      for (const text of [
        "AGENT",
        "MECHANISM",
        "CHARACTERISTIC",
        "AGENT EXAMPLE",
        "BEFORE",
        "AFTER",
      ])
        expect(html).toContain(`SOURCE ${text} ${i}`);
    for (let i = 0; i < 4; i++) {
      expect(html).toContain(`SOURCE STEP ${i}`);
      expect(html).toContain(`SOURCE SETUP ${i}`);
    }
    for (let i = 0; i < 3; i++) expect(html).toContain(`SOURCE REASON ${i}`);
    expect(html).not.toContain(esc(chapter4Content.en.plantReproduction.pollinationDefinition));
  });
});

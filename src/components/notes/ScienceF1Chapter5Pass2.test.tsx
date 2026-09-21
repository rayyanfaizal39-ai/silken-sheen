import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { ScienceF1Chapter5VisualNotesBlock } from "./ScienceF1Chapter5VisualNotesBlock";
import { Chapter5ParticleStates, ParticleModel } from "./blocks/Chapter5ParticleStates";
import { Chapter5Diffusion } from "./blocks/Chapter5Diffusion";

const render = (lang: "bm" | "en") =>
  renderToStaticMarkup(
    createElement(ScienceF1Chapter5VisualNotesBlock, { content: chapter5Content, lang }),
  );
const model = (index: number) =>
  renderToStaticMarkup(
    createElement(ParticleModel, {
      index,
      source: chapter5Content.en.statesOfMatter.stateProperties[index],
    }),
  );
const points = (svg: string) =>
  [...svg.matchAll(/<circle[^>]*data-particle[^>]*>/g)].map(([tag]) => [
    Number(tag.match(/cx="([^"]+)"/)![1]),
    Number(tag.match(/cy="([^"]+)"/)![1]),
  ]);
const nearest = (ps: number[][]) =>
  ps.reduce(
    (sum, p, i) =>
      sum +
      Math.min(...ps.filter((_, j) => j !== i).map((q) => Math.hypot(p[0] - q[0], p[1] - q[1]))),
    0,
  ) / ps.length;
const geometry = (html: string) =>
  [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(([s]) =>
    s
      .replace(/aria-label="[^"]*"/g, "")
      .replace(/<desc>[\s\S]*?<\/desc>/g, "")
      .replace(/ data-tsd-source="[^"]*"/g, ""),
  );
const escaped = (s: string) => renderToStaticMarkup(createElement("span", null, s)).slice(6, -7);

describe("Chapter 5 Pass 2 scientific visuals", () => {
  it("uses a regular close solid lattice with vibration, not translation", () => {
    const svg = model(0),
      ps = points(svg);
    const xs = new Set(ps.map((p) => p[0])),
      ys = new Set(ps.map((p) => p[1]));
    expect(ps.length).toBe(xs.size * ys.size);
    expect(nearest(ps)).toBeGreaterThanOrEqual(20);
    expect(nearest(ps)).toBeLessThanOrEqual(24);
    expect(svg).toContain('data-motion="vibration"');
    expect(svg.match(/data-vibration=/g)).toHaveLength(4);
    expect(svg).not.toContain("lucide");
    expect(svg).not.toContain("random-fast-movement");
  });
  it("keeps liquid particles close but irregular in the lower container, with movement", () => {
    const svg = model(1),
      ps = points(svg);
    expect(new Set(ps.map((p) => p[1])).size).toBeGreaterThan(6);
    expect(new Set(ps.map((p) => p[0])).size).toBeGreaterThan(7);
    expect(Math.min(...ps.map((p) => p[1]))).toBeGreaterThan(100);
    expect(nearest(ps)).toBeLessThan(30);
    expect(svg).toContain('data-motion="short-movement"');
  });
  it("spreads gas across the whole container with substantially greater gaps and multidirectional arrows", () => {
    const svg = model(2),
      ps = points(svg);
    expect(Math.max(...ps.map((p) => p[0])) - Math.min(...ps.map((p) => p[0]))).toBeGreaterThan(
      220,
    );
    expect(Math.max(...ps.map((p) => p[1])) - Math.min(...ps.map((p) => p[1]))).toBeGreaterThan(
      170,
    );
    expect(nearest(ps)).toBeGreaterThan(nearest(points(model(1))) * 2);
    expect(svg).toContain('data-motion="random-fast-movement"');
    const motion = svg.slice(svg.indexOf('data-motion="random-fast-movement"'));
    const vectors = [...motion.matchAll(/d="M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+)/g)].map((m) => [
      Number(m[3]) - Number(m[1]),
      Number(m[4]) - Number(m[2]),
    ]);
    expect(vectors.some(([x]) => x > 0)).toBe(true);
    expect(vectors.some(([x]) => x < 0)).toBe(true);
    expect(vectors.some(([, y]) => y > 0)).toBe(true);
    expect(vectors.some(([, y]) => y < 0)).toBe(true);
  });
  it("shares a particle symbol and container dimensions for every state", () => {
    const containers = [0, 1, 2].map((i) => model(i).match(/<rect[^>]*data-container[^>]*>/)![0]);
    expect(new Set(containers).size).toBe(1);
    for (const i of [0, 1, 2])
      for (const [tag] of model(i).matchAll(/<circle[^>]*data-particle[^>]*>/g))
        expect(tag).toContain('r="10"');
  });
  for (const lang of ["bm", "en"] as const) {
    const source = chapter5Content[lang].statesOfMatter;
    it(`${lang}: preserves the two official subtopics and renders all seven properties together`, () => {
      const html = render(lang);
      expect(html.match(/data-official-subtopic=/g)).toHaveLength(2);
      expect(html).not.toMatch(/>5\.2\.[12][ <]|>5\.3[ <]/);
      const table = html.match(/<table data-state-comparison[\s\S]*?<\/table>/)![0];
      expect(table.match(/scope="row"/g)).toHaveLength(7);
      for (const row of source.stateProperties)
        for (const v of Object.values(row)) expect(table).toContain(escaped(v));
      expect(html.match(/data-cause-behaviour=/g)).toHaveLength(3);
      expect(html).toContain("md:grid-cols-3");
    });
    it(`${lang}: uses the approved gas mass and removes the obsolete wording`, () => {
      const mass = lang === "en" ? "No fixed mass" : "Tiada jisim tetap";
      expect(source.stateProperties[2].mass).toBe(mass);
      expect(render(lang)).toContain(mass);
      expect(render(lang)).not.toMatch(/Fixed for a fixed amount|Tetap bagi kuantiti tetap/);
    });
    it(`${lang}: renders canonical kinetic theory, heating/cooling and the model qualification`, () => {
      const html = render(lang);
      expect(html).toContain(escaped(source.kineticTheory));
      for (const key of [
        "heating",
        "cooling",
        "lessEnergy",
        "moreEnergy",
        "slower",
        "faster",
        "modelNote",
      ] as const)
        expect(html).toContain(escaped(source.particlePresentation[key]));
      expect(html).toContain('data-kinetic-speed="slower"');
      expect(html).toContain('data-kinetic-speed="faster"');
    });
    it(`${lang}: renders source-backed apparatus, observations and rates for all three diffusion states`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5Diffusion, { source }));
      expect(html).toContain(escaped(source.diffusionDefinition));
      expect(html.match(/data-diffusion-state=/g)).toHaveLength(3);
      expect(html.match(/data-diffusion-apparatus="inverted-test-tube"/g)).toHaveLength(2);
      expect(html.match(/data-diffusion-apparatus="upright-test-tube"/g)).toHaveLength(2);
      expect(html.match(/data-stopper=/g)).toHaveLength(2);
      expect(html.match(/data-diffusion-apparatus="gas-jars"/g)).toHaveLength(2);
      expect(html.match(/data-lid=/g)).toHaveLength(1);
      for (const row of source.diffusionResults)
        for (const v of Object.values(row)) expect(html).toContain(escaped(v));
      expect(html).not.toMatch(/stirring|kacau/i);
    });
    it(`${lang}: uses the approved comparison-figure observations and removes the gas-jar lid after diffusion`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5Diffusion, { source }));
      expect(html).toContain(
        lang === "en"
          ? "Water turns blue after two hours."
          : "Air bertukar menjadi warna biru selepas dua jam.",
      );
      expect(html).toContain(
        lang === "en"
          ? "Bromine gas fills both gas jars after 15 minutes."
          : "Gas bromin memenuhi kedua-dua balang gas selepas 15 minit.",
      );
      const jars = [
        ...html.matchAll(/<svg data-diffusion-apparatus="gas-jars"[\s\S]*?<\/svg>/g),
      ].map((m) => m[0]);
      expect(jars[0]).toContain("data-lid");
      expect(jars[1]).not.toContain("data-lid");
      expect(jars[1].match(/fill="#b77936" fill-opacity=".55"/g)).toHaveLength(2);
      for (const jar of jars) expect(jar.match(/data-bromine-particle=/g)).toHaveLength(8);
    });
    it(`${lang}: compares diffusion rates independently rather than converting between states`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5Diffusion, { source }));
      expect(html).toContain(escaped(source.diffusionPresentation.relationship));
      expect([...html.matchAll(/data-rate-state="(\d)"/g)].map((m) => m[1])).toEqual([
        "2",
        "1",
        "0",
      ]);
      expect(html.match(/data-speed-cue=/g)).toHaveLength(3);
      expect(html).not.toMatch(/Solid → Liquid → Gas|Pepejal → Cecair → Gas/);
      const views = [...html.matchAll(/<svg data-concentration="[^"]+"[\s\S]*?<\/svg>/g)].map(
        (m) => m[0],
      );
      for (const svg of views) expect(svg.match(/data-diffusing-particle=/g)).toHaveLength(16);
    });
  }
  it("shares every scientific SVG geometry between languages", () =>
    expect(geometry(render("bm"))).toEqual(geometry(render("en"))));
  it("consumes supplied state and diffusion facts, without a second factual dataset", () => {
    const source = structuredClone(chapter5Content.en.statesOfMatter);
    source.kineticTheory = "CANONICAL THEORY";
    source.diffusionDefinition = "CANONICAL DIFFUSION";
    source.stateProperties.forEach((row, i) => (row.particleMovement = `SOURCE MOVEMENT ${i}`));
    source.diffusionResults.forEach((row, i) => {
      row.observation = `SOURCE OBSERVATION ${i}`;
      row.rate = `SOURCE RATE ${i}`;
    });
    const html = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(Chapter5ParticleStates, { source }),
        createElement(Chapter5Diffusion, { source }),
      ),
    );
    for (const text of [
      source.kineticTheory,
      source.diffusionDefinition,
      ...source.stateProperties.map((s) => s.particleMovement),
      ...source.diffusionResults.flatMap((r) => [r.observation, r.rate]),
    ])
      expect(html).toContain(text);
    for (const file of ["Chapter5ParticleStates", "Chapter5Diffusion"]) {
      const code = readFileSync(`src/components/notes/blocks/${file}.tsx`, "utf8");
      expect(code).not.toMatch(
        /stateProperties\s*[:=]\s*\[|diffusionResults\s*[:=]\s*\[|"Fixed mass"|"No fixed mass"|"Fastest"|"Paling cepat"/,
      );
    }
  });
  it("leaves all canonical Pass 3 content unchanged", () => {
    const hashes = {
      en: "d648fc8404a5aae57592a0b6f256a8989c9ddff81ca8397e15d8ad7849b01374",
      bm: "a386e1d533ca9b3af24d7020bea33f6f05bd34e1adf31e938cda65df649e1913",
    };
    for (const lang of ["bm", "en"] as const) {
      const {
        changesOfState,
        constantFacts,
        conservationExperiments,
        everydayExamples,
        activeRecall,
      } = chapter5Content[lang].statesOfMatter;
      expect(
        createHash("sha256")
          .update(
            JSON.stringify({
              changesOfState,
              constantFacts,
              conservationExperiments,
              everydayExamples,
              activeRecall,
            }),
          )
          .digest("hex"),
      ).toBe(hashes[lang]);
    }
  });
});

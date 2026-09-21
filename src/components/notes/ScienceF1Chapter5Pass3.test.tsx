import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { ScienceF1Chapter5VisualNotesBlock } from "./ScienceF1Chapter5VisualNotesBlock";
import {
  Chapter5StateChanges,
  Chapter5BoilingTemperature,
  ParticleTransition,
  LiquidGasVessel,
} from "./blocks/Chapter5StateChanges";
import { Chapter5Conservation, ConservationBalance } from "./blocks/Chapter5Conservation";
import { Chapter5Applications } from "./blocks/Chapter5Applications";
import { ParticleModel } from "./blocks/Chapter5ParticleStates";
const render = (lang: "en" | "bm") =>
  renderToStaticMarkup(
    createElement(ScienceF1Chapter5VisualNotesBlock, { content: chapter5Content, lang }),
  );
const escape = (s: string) => renderToStaticMarkup(createElement("span", null, s)).slice(6, -7);
const geometry = (html: string) =>
  [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(([s]) =>
    s
      .replace(/aria-label="[^"]*"/g, "")
      .replace(/<desc>[\s\S]*?<\/desc>/g, "")
      .replace(/ data-tsd-source="[^"]*"/g, ""),
  );

describe("Chapter 5 final pass", () => {
  for (const lang of ["en", "bm"] as const) {
    const source = chapter5Content[lang].statesOfMatter;
    it(`${lang}: retains exactly two official sections and the locked source corrections`, () => {
      const html = render(lang);
      expect(html.match(/data-official-subtopic=/g)).toHaveLength(2);
      expect(html).toContain(lang === "en" ? "No fixed mass" : "Tiada jisim tetap");
      expect(html).toContain(escape(source.diffusionResults[1].observation));
      expect(html).toContain(escape(source.diffusionResults[2].observation));
      for (const marker of ["activity-5-1", "balloon-balance", "state-comparison", "diffusion"])
        expect(html).toContain(marker);
    });
    it(`${lang}: renders every correctly directed and classified process in the master map`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5StateChanges, { source }));
      const expected = [
        [0, 1, "absorbed"],
        [1, 2, "absorbed"],
        [1, 2, "absorbed"],
        [2, 1, "released"],
        [1, 0, "released"],
        [0, 2, "absorbed"],
        [2, 0, "released"],
      ];
      source.changesOfState.forEach((c, i) => {
        expect([c.from, c.to, c.heat]).toEqual(expected[i]);
        expect(c.initialState).toBe(source.stateProperties[c.from].state);
        expect(c.finalState).toBe(source.stateProperties[c.to].state);
        const button = html.match(
          new RegExp(`<button[^>]*data-process="${c.id}"[\\s\\S]*?</button>`),
        )![0];
        expect(button).toContain(escape(c.name));
        expect(button).toContain(escape(c.thermalAction));
        expect(button).toContain(`data-from="${c.from}" data-to="${c.to}" data-heat="${c.heat}"`);
      });
      expect(source.changesOfState[5].name).toBe(source.changesOfState[6].name);
      expect(html).not.toMatch(/deposition|desublimation|pemendapan/i);
    });
    it(`${lang}: reuses the exact approved particle geometry for all seven directed transitions`, () => {
      for (const change of source.changesOfState) {
        const html = renderToStaticMarkup(createElement(ParticleTransition, { change, source }));
        for (const index of [change.from, change.to])
          expect(html).toContain(
            renderToStaticMarkup(
              createElement(ParticleModel, { index, source: source.stateProperties[index] }),
            ),
          );
      }
      expect(source.changesOfState.find((c) => c.id === "freezing")!.description.join(" ")).toMatch(
        lang === "en" ? /vibrate at fixed positions/ : /bergetar pada kedudukan yang tetap/,
      );
    });
    it(`${lang}: keeps boiling and slow evaporation distinct without the rejected supplementary claims`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5BoilingTemperature, { source }));
      const boiling = renderToStaticMarkup(
        createElement(LiquidGasVessel, { boiling: true, label: "test" }),
      );
      const evaporation = renderToStaticMarkup(
        createElement(LiquidGasVessel, { boiling: false, label: "test" }),
      );
      expect(boiling).toContain("data-boiling-bubbles");
      expect(boiling).toContain("data-heating-apparatus");
      expect(evaporation).toContain("data-gradual-vapour");
      expect(evaporation).not.toMatch(/data-boiling-bubbles|data-heating-apparatus/);
      expect(html).toContain(
        lang === "en"
          ? "Evaporation occurs at any temperature."
          : "Penyejatan berlaku pada sebarang suhu.",
      );
      expect(html).not.toMatch(
        /throughout|surface only|only.*surface|seluruh cecair|hanya.*permukaan/i,
      );
    });
    it(`${lang}: limits constant-temperature visuals to the three verified processes with identical thermometer levels`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5BoilingTemperature, { source }));
      expect([...html.matchAll(/data-constant-process="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "melting",
        "freezing",
        "boiling",
      ]);
      expect(html.match(/data-fixed-level=/g)).toHaveLength(6);
      expect(
        [...html.matchAll(/data-fixed-level="true" d="([^"]+)"/g)].every((m) =>
          m[1].endsWith("V42"),
        ),
      ).toBe(true);
      expect(html).not.toMatch(/\d+\s*°|\d+\s*&deg;/);
      expect(html).toContain(escape(source.constantFacts[0]));
      expect(html).toContain('data-boiling-activity="true"');
      expect(html).toContain("data-retort-thermometer");
      expect(html).toContain("data-wire-gauze");
      expect(html).toContain(escape(source.boilingActivity.procedure));
      expect(source.boilingActivity.procedure).toContain("10");
    });
    it(`${lang}: depicts the verified balance and sample for every before/after conservation setup`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5Conservation, { source }));
      expect(html.match(/data-conservation-balance="lever"/g)).toHaveLength(4);
      expect(html.match(/data-conservation-balance="triple-beam"/g)).toHaveLength(2);
      expect(html.match(/data-open-beaker=/g)).toHaveLength(4);
      expect(html).toContain("data-glass-rod");
      expect(html.match(/data-mass-equality=/g)).toHaveLength(3);
      expect(html).not.toMatch(
        /\d+\s*(?:kg|grams|gram)|fits through|muat melalui|only.*kinetic energy|hanya.*tenaga kinetik/,
      );
      for (const experiment of source.conservationExperiments) {
        const before = renderToStaticMarkup(
          createElement(ConservationBalance, { experiment, after: false }),
        );
        const after = renderToStaticMarkup(
          createElement(ConservationBalance, { experiment, after: true }),
        );
        expect(before.match(/<path data-balance-pointer[^>]*>/)![0]).toBe(
          after.match(/<path data-balance-pointer[^>]*>/)![0],
        );
        for (const value of [
          experiment.materials,
          experiment.procedure,
          experiment.observation,
          experiment.before,
          experiment.after,
        ])
          expect(html).toContain(escape(value));
        if (experiment.id === "salt") {
          expect(before.match(/<circle/g)).toHaveLength(13);
          expect(after.match(/<circle/g)).toHaveLength(13);
          expect(before).toContain("undissolved");
          expect(after).toContain("dissolved");
        }
        if (experiment.id === "ice") {
          expect(before).toContain("data-ice-cubes");
          expect(after).not.toContain("data-ice-cubes");
          expect(after).toContain("data-liquid-content");
        }
        if (experiment.id === "metal") {
          for (const s of [before, after]) {
            expect(s.match(/data-metal-ball=/g)).toHaveLength(1);
            expect(s.match(/data-metal-ring=/g)).toHaveLength(1);
          }
        }
      }
      expect(source.constantFacts[1]).toBe(
        lang === "en"
          ? "Mass remains unchanged during physical changes."
          : "Jisim kekal tidak berubah semasa perubahan fizikal.",
      );
    });
    it(`${lang}: retains verified applications and audited recall, without invented mechanisms`, () => {
      const html = renderToStaticMarkup(createElement(Chapter5Applications, { source }));
      expect([...html.matchAll(/data-application="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "ice-cream",
        "dry-ice",
        "mothballs",
        "dew",
        "clothes",
      ]);
      for (const e of source.everydayExamples) expect(html).toContain(escape(e.process));
      for (const q of source.activeRecall) {
        expect(html).toContain(escape(q.question));
        expect(html).toContain(escape(q.answer));
      }
      expect(html).toContain('data-activity="5.7"');
      expect(html).not.toMatch(/ethanol|etanol|wind|angin|humidity|kelembapan|kapur barus/i);
      expect(source.activeRecall).toHaveLength(3);
      if (lang === "bm") expect(html).toContain("Ubat gegat");
    });
  }
  it("shares all scientific SVG geometry across BM/DLP", () =>
    expect(geometry(render("en"))).toEqual(geometry(render("bm"))));
  it("preserves the source-specific condensation and evaporation language", () => {
    expect(chapter5Content.en.statesOfMatter.changesOfState[3].description.join(" ")).toContain(
      "At or below",
    );
    expect(chapter5Content.bm.statesOfMatter.changesOfState[3].description.join(" ")).toContain(
      "di bawah",
    );
    expect(chapter5Content.en.statesOfMatter.changesOfState[2].description.join(" ")).toContain(
      "surroundings",
    );
    expect(chapter5Content.bm.statesOfMatter.changesOfState[2].description.join(" ")).toContain(
      "apabila dipanaskan",
    );
  });
  it("consumes canonical facts rather than a parallel factual dataset", () => {
    const source = structuredClone(chapter5Content.en.statesOfMatter);
    source.changesOfState[0].description = ["CANONICAL MECHANISM"];
    source.constantFacts = ["CANONICAL TEMPERATURE", "CANONICAL MASS"];
    source.conservationExperiments.forEach((e) => {
      e.procedure = `CANONICAL SETUP ${e.id}`;
      e.observation = `CANONICAL OBSERVATION ${e.id}`;
    });
    source.everydayExamples.forEach((e) => (e.process = `CANONICAL APPLICATION ${e.id}`));
    source.activeRecall = [{ question: "CANONICAL QUESTION", answer: "CANONICAL ANSWER" }];
    const html = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(Chapter5StateChanges, { source }),
        createElement(Chapter5BoilingTemperature, { source }),
        createElement(Chapter5Conservation, { source }),
        createElement(Chapter5Applications, { source }),
      ),
    );
    for (const text of [
      ...source.changesOfState[0].description,
      ...source.constantFacts,
      ...source.conservationExperiments.flatMap((e) => [e.procedure, e.observation]),
      ...source.everydayExamples.map((e) => e.process),
      "CANONICAL QUESTION",
      "CANONICAL ANSWER",
    ])
      expect(html).toContain(text);
    for (const file of ["Chapter5StateChanges", "Chapter5Conservation", "Chapter5Applications"])
      expect(readFileSync(`src/components/notes/blocks/${file}.tsx`, "utf8")).not.toMatch(
        /changesOfState\s*[:=]\s*\[|conservationExperiments\s*[:=]\s*\[|everydayExamples\s*[:=]\s*\[|"Mass remains|"Jisim kekal/,
      );
  });
  it("keeps approved Pass 1 and Pass 2 component files byte-for-byte unchanged", () => {
    const hashes = {
      Chapter5MatterInNature: "d4e49a586aed670523b72548cbb7c341b13dba9c3cec880809048f6e072dece2",
      Chapter5ParticleStates: "78888866cd8cb796167f1cc7c1adea39f9b2a380f6581f44a49d9a51d10a555e",
      Chapter5Diffusion: "aade8b8fbff24ec861f86894fd65117865cb752b5c9a24a4c685d8e509cca12f",
    };
    for (const [file, hash] of Object.entries(hashes))
      expect(
        createHash("sha256")
          .update(readFileSync(`src/components/notes/blocks/${file}.tsx`))
          .digest("hex"),
      ).toBe(hash);
  });
});

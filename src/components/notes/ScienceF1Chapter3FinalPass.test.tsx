import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { ScienceF1Chapter3VisualNotesBlock } from "./ScienceF1Chapter3VisualNotesBlock";
import {
  Chapter3PlantHomeostasis,
  Chapter3Importance,
  StomaDiagram,
  BananaLeafDiagram,
} from "./blocks/Chapter3PlantHomeostasis";
import { PulseExperimentVisual, WaterRegulationVisual } from "./blocks/Chapter3HomeostasisVisuals";
const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("'", "&#x27;");
function geometry(html: string) {
  return [...html.matchAll(/<(?:svg|g|path|rect|ellipse|circle|text|marker)\b[^>]*>/g)]
    .map((m) => m[0].replace(/ (?:id|aria-label|marker-end)="[^"]*"/g, ""))
    .join("\n");
}
describe("Chapter 3 final canonical live coverage", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter3Content[lang];
    const render = () =>
      renderToStaticMarkup(
        <ScienceF1Chapter3VisualNotesBlock content={chapter3Content} lang={lang} />,
      );
    it(`${lang}: live Notes covers exactly 3.1.1–3.1.4 beneath sole official subtopic 3.1`, () => {
      const html = render();
      expect([...html.matchAll(/data-curriculum-subtopic="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "3.1",
      ]);
      expect([...html.matchAll(/data-learning-standard="([^"]+)"/g)].map((m) => m[1])).toEqual([
        "3.1.1",
        "3.1.2",
        "3.1.3",
        "3.1.4",
      ]);
      for (const standard of ["3.1.1", "3.1.2", "3.1.3", "3.1.4"])
        expect(html).toContain(`>${standard}</span>`);
      for (const title of [
        content.structure.humans,
        content.structure.animals,
        content.structure.plants,
        content.structure.importance,
      ])
        expect(html).toContain(title);
      for (const visibleContent of [
        content.definition.meaning,
        content.waterRegulation.systemsInvolved,
        content.temperatureRegulation.systemsInvolved,
        content.animalHomeostasis[0].adaptation,
        content.plantHomeostasis.transpirationDefinition,
        content.importanceHomeostasis.explanation,
      ])
        expect(html).toContain(escape(visibleContent));
      expect(html).toContain("bg-[#061923]");
      expect(html).not.toContain("#17120b");
    });
    it(`${lang}: six conceptual path cards have only one numbering span and no experiment cards`, () => {
      const header = render().match(/<header[\s\S]*?<\/header>/)![0];
      expect(header.match(/<p class="text-sm font-semibold text-white">/g)).toHaveLength(6);
      expect(header.match(/>3\.1<\/span>/g)).toHaveLength(1);
      expect(header).not.toMatch(/Experiment 3\.[12]|Eksperimen 3\.[12]|<span[^>]*><\/span>/);
    });
    it(`${lang}: source-specific etymology, activity duration and hormone wording are rendered`, () => {
      expect(content.definition.etymology).toContain(
        lang === "bm" ? "'homeo' bermaksud 'sama'" : "'homeo' meaning 'similar'",
      );
      expect(content.definition.etymology).toContain(
        lang === "bm" ? "'stasis' bermaksud 'tidak bergerak'" : "'stasis' meaning 'stable'",
      );
      const pulse = renderToStaticMarkup(<PulseExperimentVisual content={content} lang={lang} />);
      const duration = lang === "bm" ? 10 : 5;
      expect(content.pulseExperiment.activities.slice(1).map((a) => a.durationMinutes)).toEqual([
        duration,
        duration,
      ]);
      expect(
        pulse.match(new RegExp(`>${duration} ${lang === "bm" ? "minit" : "minutes"}</p>`, "g")),
      ).toHaveLength(2);
      expect(content.pulseExperiment.countDurationMinutes).toBe(1);
      expect(pulse).toContain(lang === "bm" ? "Kiraan nadi: 1 minit" : "Pulse count: 1 minute");
      const water = renderToStaticMarkup(<WaterRegulationVisual content={content} lang={lang} />);
      expect(water).toContain(escape(content.waterRegulation.increase.mechanism[0]));
      if (lang === "en")
        expect(content.waterRegulation.increase.mechanism[0]).toBe(
          "The brain will stimulate the secretion of a hormone so that the kidneys increase the production of urine.",
        );
      else expect(content.waterRegulation.increase.mechanism[0]).toContain("pengurangan rembesan");
    });
    it(`${lang}: plant diagram shows root hairs, water uptake, upward transport, leaf, stoma and escaping vapour`, () => {
      const html = renderToStaticMarkup(<Chapter3PlantHomeostasis content={content} lang={lang} />);
      for (const cue of [
        'data-soil="true"',
        'data-root-hairs="true"',
        'data-root-uptake="water-and-minerals"',
        'data-stem="transport"',
        'data-transpiration-pull="upward"',
        'data-leaf="true"',
        'data-leaf-cross-section="true"',
        'data-stoma-route="true"',
        'data-water-vapour="leaving-leaf"',
      ])
        expect(html).toContain(cue);
      expect(html).toContain('data-water-process="soil-root-stem-leaf-stoma-vapour"');
      expect(html).toContain(escape(content.plantHomeostasis.waterLossFact));
      expect(html).toContain("90%");
      for (const source of content.plantHomeostasis.transpirationFunctions)
        expect(html).toContain(escape(source));
      expect(html).not.toMatch(/xylem|xilem/i);
    });
    it(`${lang}: real guard cells use a shared outline with open/day and closed/too-hot states`, () => {
      const open = renderToStaticMarkup(<StomaDiagram open lang={lang} />);
      const closed = renderToStaticMarkup(<StomaDiagram open={false} lang={lang} />);
      for (const html of [open, closed]) expect(html.match(/data-guard-cell=/g)).toHaveLength(2);
      const outlines = (s: string) =>
        [...s.matchAll(/data-guard-cell="[^"]+" d="([^"]+)"/g)].map((m) =>
          m[1].split(" C").slice(0, 3).join(" C"),
        );
      expect(outlines(open)).toEqual(outlines(closed));
      expect(open).toContain('data-stoma-pore="open"');
      expect(open).toContain('rx="27"');
      expect(closed).toContain('data-stoma-pore="closed"');
      expect(closed).toContain('rx="2"');
      expect(open).toContain('data-stoma-vapour="escaping"');
      expect(open).toContain('data-stoma-gas-exchange="true"');
      expect(closed).not.toMatch(/data-stoma-vapour|data-stoma-gas-exchange/);
      expect(content.plantHomeostasis.stomaStates.map((s) => s.stomaState)).toEqual([
        "open",
        "closed",
      ]);
      const html = render();
      for (const state of content.plantHomeostasis.stomaStates) {
        expect(html).toContain(escape(state.condition));
        expect(html).toContain(escape(state.reason));
      }
    });
    it(`${lang}: banana leaf visibly rolls inward to reduce exposed area`, () => {
      const broad = renderToStaticMarkup(<BananaLeafDiagram rolled={false} lang={lang} />);
      const rolled = renderToStaticMarkup(<BananaLeafDiagram rolled lang={lang} />);
      expect(broad).toContain('data-exposed-leaf-area="broad"');
      expect(rolled).toContain('data-exposed-leaf-area="reduced"');
      expect(rolled).toContain('data-rolled-inward="true"');
      expect(broad).not.toContain("data-rolled-inward");
      expect(render()).toContain(escape(content.plantHomeostasis.bananaResponse));
    });
    it(`${lang}: dedicated importance section precedes Chapter Check and contains metabolism/enzyme links and two reflections`, () => {
      const html = render();
      const importance = renderToStaticMarkup(<Chapter3Importance content={content} />);
      for (const text of [
        ...content.importanceHomeostasis.process,
        ...content.importanceHomeostasis.enzymeProcess,
        ...content.importanceHomeostasis.reflection,
      ])
        expect(importance).toContain(escape(text));
      expect(html.indexOf('data-learning-standard="3.1.4"')).toBeLessThan(
        html.indexOf(lang === "bm" ? ">Semakan Bab<" : ">Chapter Check<"),
      );
      expect(html.slice(0, html.indexOf('data-learning-standard="3.1.4"'))).not.toMatch(
        /enzim|enzyme/i,
      );
      expect(importance).not.toMatch(/<input|<textarea|<table/);
    });
  }
  it("BM/DLP reuse diagram geometry while preserving language-specific source differences", () => {
    for (const Component of [
      Chapter3PlantHomeostasis,
      PulseExperimentVisual,
      WaterRegulationVisual,
    ]) {
      const bm = renderToStaticMarkup(<Component content={chapter3Content.bm} lang="bm" />);
      const en = renderToStaticMarkup(<Component content={chapter3Content.en} lang="en" />);
      expect(geometry(bm)).toBe(geometry(en));
    }
  });
  it("plant and importance content are consumed from canonical source data", () => {
    const source = structuredClone(chapter3Content);
    source.en.plantHomeostasis.bananaResponse = "SOURCE BANANA";
    source.en.importanceHomeostasis.enzymeExplanation = "SOURCE ENZYMES";
    const html = renderToStaticMarkup(
      <ScienceF1Chapter3VisualNotesBlock content={source} lang="en" />,
    );
    expect(html).toContain("SOURCE BANANA");
    expect(html).toContain("SOURCE ENZYMES");
  });
});

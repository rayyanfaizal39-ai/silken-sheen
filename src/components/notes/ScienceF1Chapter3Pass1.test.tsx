import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { scienceF1C3NotesBM } from "@/content/form1/science/chapter-3/notes-bm";
import { scienceF1C3NotesDLP } from "@/content/form1/science/chapter-3/notes-dlp";
import { ScienceF1Chapter3VisualNotesBlock } from "./ScienceF1Chapter3VisualNotesBlock";
import {
  HomeostaticControlVisual,
  WaterRegulationVisual,
  TemperatureRegulationVisual,
  SweatingExperimentVisual,
  PulseExperimentVisual,
  WristPulseDiagram,
} from "./blocks/Chapter3HomeostasisVisuals";

function escape(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;");
}
function geometry(html: string) {
  return Array.from(
    html.matchAll(/<(?:svg|g|path|rect|circle|ellipse|text|tspan|marker)\b[^>]*>/g),
    (match) => match[0].replace(/\s(?:id|aria-label|marker-end)="[^"]*"/g, ""),
  ).join("\n");
}

describe("Science Form 1 Chapter 3 Pass 1 live renderer", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter3Content[lang];
    const render = () =>
      renderToStaticMarkup(
        <ScienceF1Chapter3VisualNotesBlock content={chapter3Content} lang={lang} />,
      );
    it(`${lang}: only 3.1 is an official curriculum subtopic; experiment numbers are explicitly named`, () => {
      const html = render();
      expect(html).toContain(content.structure.chapter);
      expect(html).toContain(content.structure.subtopic);
      expect(html.match(/data-curriculum-subtopic=/g)).toHaveLength(1);
      expect(html.match(/<h2 /g)).toHaveLength(1);
      expect(html).toContain('data-curriculum-subtopic="3.1"');
      expect(html).not.toMatch(/>3\.[234]</);
      expect(html).not.toMatch(/data-curriculum-subtopic="3\.[234]"/);
      const visibleText = html.replace(/<[^>]*>/g, "");
      expect(visibleText).not.toContain("3.3");
      expect(visibleText).not.toContain("3.4");
      for (const title of [
        content.sweatExperiment.title,
        content.pulseExperiment.title,
        content.structure.water,
        content.structure.temperature,
      ])
        expect(html).toContain(title);
      const notes = lang === "bm" ? scienceF1C3NotesBM : scienceF1C3NotesDLP;
      expect(notes.sections[0].title).toBe(content.structure.subtopic);
      expect(notes.sections.slice(1).some((section) => /^3\.[234]\b/.test(section.title))).toBe(
        false,
      );
    });
    it(`${lang}: meaning, examples and frozen word-origin and importance content are preserved`, () => {
      const html = render();
      for (const text of Object.values(content.definition)) expect(html).toContain(escape(text));
      expect(content.definition.meaning).toMatch(/pH/);
      expect(content.definition.meaning).toContain(
        lang === "bm" ? "tekanan darah" : "blood pressure",
      );
      expect(content.definition.meaning).toContain(lang === "bm" ? "kandungan air" : "water");
    });
    it(`${lang}: both feedback pathways visibly return to a normal range with opposite corrective outcomes`, () => {
      const html = renderToStaticMarkup(<HomeostaticControlVisual content={content} lang={lang} />);
      const increase = html.match(
        /<svg[^>]*data-homeostasis-diagram="control-increase"[\s\S]*?<\/svg>/,
      )![0];
      const decrease = html.match(
        /<svg[^>]*data-homeostasis-diagram="control-decrease"[\s\S]*?<\/svg>/,
      )![0];
      expect(increase).toContain(lang === "bm" ? "Keadaan dalaman" : "Internal condition");
      expect(increase).toContain(lang === "bm" ? "meningkat" : "increases");
      expect(increase).toContain(lang === "bm" ? "Keadaan menurun" : "Condition decreases");
      expect(decrease).toContain(lang === "bm" ? "menurun" : "decreases");
      expect(decrease).toContain(lang === "bm" ? "Keadaan meningkat" : "Condition increases");
      for (const pathway of [increase, decrease]) {
        expect(pathway).toContain('data-normal-range="true"');
        expect(pathway.match(/marker-end=/g)).toHaveLength(5);
        expect(pathway).toContain('d="M65 290 H14 V67 H24"');
        expect(pathway).toContain('d="M97 228 V250 H190 V270"');
      }
      expect(html).toContain(escape(content.controlProcessConcept));
      expect(html).not.toMatch(/Receptor|Reseptor/);
    });
    it(`${lang}: water regulation connects brain, hormone-mediated correction, kidneys and high/more vs low/less urine and thirst`, () => {
      const html = renderToStaticMarkup(<WaterRegulationVisual content={content} lang={lang} />);
      for (const [direction, level, amount] of [
        ["increase", "high", "more"],
        ["decrease", "low", "less"],
      ] as const) {
        const diagram = html.match(
          new RegExp(`<svg[^>]*data-homeostasis-diagram="water-${direction}"[\\s\\S]*?<\\/svg>`),
        )![0];
        expect(diagram).toContain('data-brain="true"');
        expect(diagram).toContain('data-kidneys="true"');
        expect(diagram).toContain(`data-water-level="${level}"`);
        expect(diagram).toContain(`data-urine-production="${amount}"`);
        for (const text of [
          content.waterRegulation[direction].trigger,
          ...content.waterRegulation[direction].mechanism,
        ])
          expect(html).toContain(escape(text));
      }
      expect(html).toContain(lang === "bm" ? "dahaga" : "thirst");
      expect(html).toContain('data-sweat-urine-process="true"');
      expect(html).not.toMatch(/\bADH\b|antidiuretic/i);
      expect(html).not.toContain(
        lang === "bm" ? "lebih perembesan hormon" : "more secretion of a hormone",
      );
      expect(content.waterRegulation.increase.mechanism[0]).toContain(
        lang === "bm" ? "pengurangan rembesan" : "reduction in secretion",
      );
    });
    it(`${lang}: hot and cold skin diagrams distinguish hair, sweat, vessel calibre/location, trapped air and heat loss`, () => {
      const html = renderToStaticMarkup(
        <TemperatureRegulationVisual content={content} lang={lang} />,
      );
      const hot = html.match(/<svg[^>]*data-skin-condition="hot"[\s\S]*?<\/svg>/)![0];
      const cold = html.match(/<svg[^>]*data-skin-condition="cold"[\s\S]*?<\/svg>/)![0];
      for (const value of [
        'data-body-hair="leaning"',
        'data-sweat-gland="active"',
        'data-sweat-at-surface="true"',
        'data-blood-vessel="dilated-near-skin"',
        'data-heat-loss="increased"',
      ])
        expect(hot).toContain(value);
      for (const value of [
        'data-body-hair="erect"',
        'data-sweat-gland="reduced"',
        'data-trapped-air="true"',
        'data-blood-vessel="constricted-deeper"',
        'data-heat-loss="reduced"',
      ])
        expect(cold).toContain(value);
      expect(cold).not.toContain('data-sweat-at-surface="true"');
      expect(hot).not.toContain('data-trapped-air="true"');
      expect(html).toContain("37°C");
      for (const mechanism of [
        content.temperatureRegulation.hotCondition,
        content.temperatureRegulation.coldCondition,
      ])
        for (const text of [...mechanism.mechanism, mechanism.result])
          expect(html).toContain(escape(text));
      if (lang === "bm") {
        expect(hot).toContain("Bulu roma condong");
        expect(cold).toContain("Bulu roma menegak");
        expect(html).not.toMatch(/Rambut menegak rata|Rambut tegak berdiri/);
      }
    });
    it(`${lang}: Experiment 3.1 has source variables and ten-minute fan OFF/ON procedure with blank observations`, () => {
      const html = renderToStaticMarkup(<SweatingExperimentVisual content={content} lang={lang} />);
      const experiment = content.sweatExperiment;
      expect(render()).toContain('data-experiment="3.1"');
      for (const text of [
        experiment.title,
        experiment.problem,
        experiment.hypothesis,
        experiment.purpose,
        experiment.apparatus,
        experiment.conclusion,
        ...experiment.sequence,
        ...Object.values(experiment.variables),
        content.practicalNotice,
      ])
        expect(html).toContain(escape(text));
      expect(html).toContain('data-fan-condition="off"');
      expect(html).toContain('data-fan-condition="on"');
      expect(html.match(/data-fan-airflow=/g)).toHaveLength(1);
      expect(html.match(/data-stopwatch=/g)).toHaveLength(2);
      const table = html.match(/<table[\s\S]*?<\/table>/)![0];
      expect(table.match(/<input /g)).toHaveLength(2);
      expect(table).not.toMatch(/\bvalue=|\bplaceholder=/);
      expect(experiment.sequence[0]).toContain("10");
      expect(experiment.sequence[2]).toContain("10");
    });
    it(`${lang}: Experiment 3.2 has rest, ten-minute walk/jog, one-minute wrist measurement and blank measured results`, () => {
      const html = renderToStaticMarkup(<PulseExperimentVisual content={content} lang={lang} />);
      const experiment = content.pulseExperiment;
      expect(render()).toContain('data-experiment="3.2"');
      expect(experiment.activities.map((activity) => activity.id)).toEqual([
        "rest",
        "walking",
        "jogging",
      ]);
      expect(experiment.activities.map((activity) => activity.durationMinutes)).toEqual([
        undefined,
        10,
        10,
      ]);
      expect(experiment.countDurationMinutes).toBe(1);
      for (const activity of experiment.activities)
        expect(html).toContain(`data-activity="${activity.id}"`);
      for (const text of [
        experiment.title,
        experiment.problem,
        experiment.hypothesis,
        experiment.purpose,
        experiment.apparatus,
        experiment.conclusion,
        ...experiment.sequence,
        ...Object.values(experiment.variables),
      ])
        expect(html).toContain(escape(text));
      expect(html).toContain('data-two-fingers="true"');
      expect(html).toContain('data-pulse-point="true"');
      const table = html.match(/<table[^>]*data-pulse-results="true"[\s\S]*?<\/table>/)![0];
      expect(table.match(/type="number"/g)).toHaveLength(12);
      expect(table.match(/type="text"/g)).toHaveLength(4);
      expect(table).not.toMatch(/\bvalue=|\bplaceholder=/);
      expect(html).not.toMatch(/70[–-]80|90[–-]110|130[–-]160|\bbpm\b/);
    });
    it(`${lang}: deferred animal, plant and appreciation content is still rendered`, () => {
      const html = render();
      for (const animal of content.animalHomeostasis) expect(html).toContain(escape(animal.animal));
      for (const text of [
        content.animalHomeostasis[0].adaptation,
        content.plantHomeostasis.transpirationDefinition,
        content.plantHomeostasis.waterLossFact,
        ...content.plantHomeostasis.transpirationFunctions,
        ...content.keyExamFacts,
        content.chapterSummary,
      ])
        expect(html).toContain(escape(text));
    });
  }
  it("every new scientific diagram shares BM/DLP SVG geometry and avoids mixed-language labels", () => {
    for (const Component of [
      HomeostaticControlVisual,
      WaterRegulationVisual,
      TemperatureRegulationVisual,
      SweatingExperimentVisual,
      PulseExperimentVisual,
      WristPulseDiagram,
    ]) {
      const bm = renderToStaticMarkup(<Component content={chapter3Content.bm} lang="bm" />);
      const en = renderToStaticMarkup(<Component content={chapter3Content.en} lang="en" />);
      expect(geometry(bm)).toBe(geometry(en));
      const diagrams = (html: string) =>
        Array.from(html.matchAll(/<svg\b[\s\S]*?<\/svg>/g), (match) => match[0]).join("\n");
      expect(diagrams(bm)).not.toMatch(
        />Brain<|>Kidneys<|>Sweat gland<|>At rest<|>Walking<|>Jogging</,
      );
      expect(diagrams(en)).not.toMatch(
        />Otak<|>Ginjal<|>Kelenjar peluh<|>Keadaan rehat<|>Berjalan<|>Berjoging</,
      );
    }
  });
  it("the new renderer consumes changed source data for both practicals and corrective mechanisms", () => {
    const source = structuredClone(chapter3Content);
    source.en.sweatExperiment.problem = "SOURCE SWEAT QUESTION";
    source.en.pulseExperiment.sequence[1] = "SOURCE WRIST METHOD";
    source.en.waterRegulation.decrease.mechanism[0] = "SOURCE HORMONE MECHANISM";
    source.en.temperatureRegulation.coldCondition.mechanism[4] = "SOURCE METABOLISM";
    const html = renderToStaticMarkup(
      <ScienceF1Chapter3VisualNotesBlock content={source} lang="en" />,
    );
    for (const text of [
      "SOURCE SWEAT QUESTION",
      "SOURCE WRIST METHOD",
      "SOURCE HORMONE MECHANISM",
      "SOURCE METABOLISM",
    ])
      expect(html).toContain(text);
  });
  it("unsupported pulse ranges are removed from the Chapter 3 source dataset", () => {
    const source = readFileSync(
      new URL("../../content/form1/science/chapter-3/chapter3-content.ts", import.meta.url),
      "utf8",
    );
    expect(source).not.toMatch(/pulseRange|70[–-]80|90[–-]110|130[–-]160/);
  });
});

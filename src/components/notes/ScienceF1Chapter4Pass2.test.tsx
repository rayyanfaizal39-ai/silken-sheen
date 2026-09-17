import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ScienceF1Chapter4VisualNotesBlock } from "./ScienceF1Chapter4VisualNotesBlock";
import { Chapter4MenstrualCycle, UterinePhase } from "./blocks/Chapter4MenstrualCycle";
import {
  Chapter4PregnancyVisuals,
  PregnancyDiagram,
  FoetalTimeline,
} from "./blocks/Chapter4PregnancyVisuals";
const escape = (text: string) => renderToStaticMarkup(<>{text}</>);
const geometry = (html: string) =>
  [...html.matchAll(/<(?:svg|g|path|circle|ellipse|rect|text|marker)\b[^>]*>/g)]
    .map((m) => m[0].replace(/ (?:id|aria-label|marker-end)="[^"]*"/g, ""))
    .join("\n");
describe("Chapter 4 Pass 2 live render", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter4Content[lang];
    it(`${lang}: 4.3 and 4.4 retain separate official headings`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter4VisualNotesBlock content={chapter4Content} lang={lang} />,
      );
      for (const index of [2, 3]) {
        expect(html).toContain(
          `data-curriculum-subtopic="${content.officialSubtopics[index].number}"`,
        );
        expect(html).toContain(escape(content.officialSubtopics[index].title));
      }
    });
    it(`${lang}: 28 source-model days, all phase ranges, average qualification and day 14 within fertile phase`, () => {
      const html = renderToStaticMarkup(<Chapter4MenstrualCycle content={content} lang={lang} />);
      expect(html.match(/data-cycle-day=/g)).toHaveLength(28);
      expect(html).toContain(escape(content.menstrualCycle.averageLength));
      for (const phase of content.menstrualCycle.phases) {
        expect(html).toContain(phase.days);
        expect(html).toContain(phase.name);
      }
      expect(html).toContain('data-cycle-day="14" data-phase-index="2"');
      expect(html).toContain(lang === "en" ? "Textbook model" : "Model buku teks");
      expect(html).toContain(lang === "en" ? "Day 14" : "Hari ke-14");
      expect(html).toContain('data-reproduction-diagram="ovulation"');
      expect(html).toContain(content.humanReproductiveSystem.femaleParts[0].part);
      expect(html).toContain(content.humanReproductiveSystem.femaleParts[1].part);
    });
    it(`${lang}: source control, factors, hygiene and qualified irregular-menstruation text preserved`, () => {
      const html = renderToStaticMarkup(<Chapter4MenstrualCycle content={content} lang={lang} />);
      const s = content.menstrualCycle;
      for (const text of [
        s.definition,
        s.controlledBy,
        ...s.affectingFactors,
        ...s.hygieneImportance,
        ...s.irregularMenstruation.causes,
        ...s.irregularMenstruation.effects,
      ])
        expect(html).toContain(escape(text));
      expect(html).toContain(lang === "en" ? "Possible causes" : "Punca yang mungkin");
      expect(html).not.toMatch(/\b(FSH|LH|oestrogen|estrogen|progesterone|progesteron)\b/);
    });
    it(`${lang}: canonical fertilisation order, tube site and implantation embedded in uterine wall`, () => {
      const html = renderToStaticMarkup(<Chapter4PregnancyVisuals content={content} lang={lang} />);
      let previous = -1;
      for (const step of content.fertilisationAndPregnancy.process) {
        const position = html.indexOf(escape(step));
        expect(position).toBeGreaterThan(previous);
        previous = position;
      }
      expect(html).toContain('data-fertilisation-site="fallopian-tube"');
      expect(html).toContain('data-implantation-site="uterine-wall"');
      expect(html).toContain('data-embryo-embedded="uterine-lining"');
      expect(html).toContain('data-reproduction-diagram="female-anatomy-front"');
      expect(html).toContain('data-cell-division="zygote-to-embryo"');
      for (let i = 0; i < 5; i++)
        expect(html).toContain(`data-reproduction-diagram="division-${i}"`);
      expect(html).toContain(lang === "en" ? "2 cells" : "2 sel");
    });
    it(`${lang}: five distinct support structures and separate exchange sides render`, () => {
      const html = renderToStaticMarkup(<Chapter4PregnancyVisuals content={content} lang={lang} />);
      for (const key of [
        "placentaFunction",
        "umbilicalCordFunction",
        "amnionFunction",
        "amnioticFluidFunction",
        "uterineWallFunction",
      ])
        expect(html).toContain(`data-support="${key}"`);
      expect(html).toContain(escape(content.fertilisationAndPregnancy.placentaFunction));
      expect(html).toContain('data-placental-exchange="separate-maternal-foetal-sides"');
      expect(html).toContain(lang === "en" ? "Oxygen + nutrients" : "Oksigen + nutrien");
      expect(html).toContain(
        lang === "en" ? "Carbon dioxide + waste" : "Karbon dioksida + bahan buangan",
      );
    });
    it(`${lang}: all five canonical development stages and birth remain schematic`, () => {
      const html = renderToStaticMarkup(<FoetalTimeline content={content} lang={lang} />);
      content.fertilisationAndPregnancy.foetalDevelopment.forEach((stage, i) => {
        expect(html).toContain(stage.weeks);
        expect(html).toContain(escape(stage.description));
        expect(html).toContain(`data-development-shape="${i}"`);
      });
      expect(html).toContain(
        lang === "en" ? "Schematic / not to scale" : "Skematik / bukan mengikut skala",
      );
      expect(html).toContain('data-birth-process="schematic"');
      for (let i = 0; i < 5; i++) expect(html).toContain(`data-reproduction-diagram="birth-${i}"`);
    });
  }
  it("four states reuse the same uterus with visibly different lining, vessels, shedding and ovulation", () => {
    const states = Array.from({ length: 4 }, (_, phase) =>
      renderToStaticMarkup(<UterinePhase phase={phase} label="phase" />),
    );
    const outer = states.map((s) => s.match(/<g data-uterus-geometry[\s\S]*?<\/g>/)![0]);
    expect(new Set(outer).size).toBe(1);
    expect(new Set(states.map((s) => s.match(/<path data-lining-state[^>]*>/)![0])).size).toBe(4);
    expect(states[0]).toContain('data-discharge="blood-mucus-unfertilised-ovum"');
    for (const i of [1, 2, 3]) expect(states[i]).toContain('data-blood-vessels="true"');
    expect(states[2]).toContain('data-ovulation-route="ovary-to-fallopian-tube"');
    expect(states[0]).not.toContain("data-ovulation-route");
  });
  it("BM/DLP use identical geometry throughout Pass 2 and every selectable support state", () => {
    const renders = (["bm", "en"] as const).map((lang) =>
      renderToStaticMarkup(
        <>
          <Chapter4MenstrualCycle content={chapter4Content[lang]} lang={lang} />
          <Chapter4PregnancyVisuals content={chapter4Content[lang]} lang={lang} />
        </>,
      ),
    );
    expect(geometry(renders[0])).toBe(geometry(renders[1]));
    for (let selected = 0; selected < 5; selected++)
      expect(
        geometry(renderToStaticMarkup(<PregnancyDiagram selected={selected} lang="bm" />)),
      ).toBe(geometry(renderToStaticMarkup(<PregnancyDiagram selected={selected} lang="en" />)));
  });
  it("renderers consume supplied source data rather than an embedded factual copy", () => {
    const content = structuredClone(chapter4Content.en);
    content.menstrualCycle.definition = "SOURCE DEFINITION SENTINEL";
    content.menstrualCycle.phases[0].description = "SOURCE PHASE SENTINEL";
    content.fertilisationAndPregnancy.process = ["SOURCE PROCESS SENTINEL"];
    content.fertilisationAndPregnancy.foetalDevelopment[0].description =
      "SOURCE DEVELOPMENT SENTINEL";
    const html = renderToStaticMarkup(
      <>
        <Chapter4MenstrualCycle content={content} lang="en" />
        <Chapter4PregnancyVisuals content={content} lang="en" />
      </>,
    );
    for (const word of ["DEFINITION", "PHASE", "PROCESS", "DEVELOPMENT"])
      expect(html).toContain(`SOURCE ${word} SENTINEL`);
    expect(html).not.toContain(escape(chapter4Content.en.menstrualCycle.definition));
    expect(html).not.toContain(escape(chapter4Content.en.fertilisationAndPregnancy.process[0]));
  });
});

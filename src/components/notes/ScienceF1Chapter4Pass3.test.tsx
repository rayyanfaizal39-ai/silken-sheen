import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ScienceF1Chapter4VisualNotesBlock } from "./ScienceF1Chapter4VisualNotesBlock";
import { Chapter4DevelopmentFactors } from "./blocks/Chapter4DevelopmentFactors";
import {
  Chapter4Infertility,
  ContraceptionDiagram,
  ContraceptionSelector,
  InfertilityFactors,
  InfertilityTreatments,
} from "./blocks/Chapter4Infertility";
const escape = (text: string) => renderToStaticMarkup(<>{text}</>);
const geometry = (html: string) =>
  [...html.matchAll(/<(?:svg|g|path|rect|circle|ellipse|text|marker)\b[^>]*>/g)]
    .map((m) => m[0].replace(/ (?:id|aria-label|marker-end)="[^"]*"/g, ""))
    .join("\n");
describe("Chapter 4 Pass 3 live visuals", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter4Content[lang];
    it(`${lang}: 4.5 and 4.6 render as separate official sections`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter4VisualNotesBlock content={chapter4Content} lang={lang} />,
      );
      for (const index of [4, 5]) {
        const section = content.officialSubtopics[index];
        expect(html).toContain(`data-curriculum-subtopic="${section.number}"`);
        expect(html).toContain(escape(section.title));
      }
    });
    it(`${lang}: every nutrient, example and function surrounds the maternal support diagram`, () => {
      const html = renderToStaticMarkup(
        <Chapter4DevelopmentFactors content={content} lang={lang} />,
      );
      for (const item of content.foetalDevelopmentFactors.nutrientNeeds)
        for (const text of [item.nutrient, item.examples, item.fn])
          expect(html).toContain(escape(text));
      expect(html.match(/data-nutrient=/g)).toHaveLength(
        content.foetalDevelopmentFactors.nutrientNeeds.length,
      );
      expect(html.match(/data-nutrient-link=/g)).toHaveLength(
        content.foetalDevelopmentFactors.nutrientNeeds.length,
      );
      expect(html).toContain('data-reproduction-diagram="maternal-nutrition"');
    });
    it(`${lang}: harmful substances and effects retain exact source uncertainty without placental routes`, () => {
      const html = renderToStaticMarkup(
        <Chapter4DevelopmentFactors content={content} lang={lang} />,
      );
      for (const item of content.foetalDevelopmentFactors.harmfulSubstances) {
        expect(html).toContain(escape(item.substance));
        for (const effect of item.effects) expect(html).toContain(escape(effect));
      }
      expect(html.match(/data-exposure=/g)).toHaveLength(3);
      expect(html).toContain(
        lang === "en" ? "Foetal defects may occur" : "Kecacatan fetus mungkin berlaku",
      );
      expect(html).not.toMatch(/placenta|plasenta|will occur|pasti berlaku/i);
    });
    it(`${lang}: all canonical breastfeeding benefits have distinct cues`, () => {
      const html = renderToStaticMarkup(
        <Chapter4DevelopmentFactors content={content} lang={lang} />,
      );
      for (const benefit of content.foetalDevelopmentFactors.breastfeedingBenefits)
        expect(html).toContain(escape(benefit));
      expect(html.match(/data-benefit-cue=/g)).toHaveLength(4);
      expect(html).toContain('data-reproduction-diagram="breastfeeding-support"');
      expect(html).not.toMatch(/intelligence|allerg|obesity|kecerdasan|obesiti/i);
    });
    it(`${lang}: infertility definition and male/female factors remain in their original groups`, () => {
      const html = renderToStaticMarkup(<Chapter4Infertility content={content} lang={lang} />);
      expect(html).toContain(escape(content.infertility.definition));
      for (const sex of ["male", "female"] as const) {
        const output = renderToStaticMarkup(
          <InfertilityFactors content={content} lang={lang} sex={sex} />,
        );
        const factors = content.infertility[sex === "male" ? "maleFactors" : "femaleFactors"];
        const other = content.infertility[sex === "male" ? "femaleFactors" : "maleFactors"];
        expect(output).toContain(`data-infertility-factors="${sex}"`);
        factors.forEach((f) => expect(output).toContain(escape(f)));
        other
          .filter((f) => !factors.includes(f))
          .forEach((f) => expect(output).not.toContain(escape(f)));
      }
    });
    it(`${lang}: all treatment descriptions render and IVF progresses from outside-body dish to embryo to uterus`, () => {
      const html = renderToStaticMarkup(<InfertilityTreatments content={content} lang={lang} />);
      for (const treatment of content.infertility.treatments) {
        expect(html).toContain(escape(treatment.name));
        expect(html).toContain(escape(treatment.description));
      }
      const positions = ["outside-body", "embryo", "uterus"].map((stage) =>
        html.indexOf(`data-ivf-stage="${stage}"`),
      );
      expect(positions[0]).toBeGreaterThan(-1);
      expect(positions[1]).toBeGreaterThan(positions[0]);
      expect(positions[2]).toBeGreaterThan(positions[1]);
      expect(html).toContain(
        lang === "en"
          ? "Fertilisation outside the body — glass dish"
          : "Persenyawaan di luar badan — piring kaca",
      );
      expect(html).toContain('data-reproductive-organ="2" data-highlighted="true"');
      expect(html).not.toMatch(/\bICSI\b|surrogacy|donor|success rate|kadar kejayaan|ibu tumpang/i);
    });
    it(`${lang}: all six canonical methods belong to their exact duration and sex group`, () => {
      const html = renderToStaticMarkup(<ContraceptionSelector content={content} lang={lang} />);
      for (const classification of new Set(
        content.infertility.contraceptionMethods.map((m) => m.classification),
      )) {
        const cell = html.match(
          new RegExp(
            `<div data-classification="${classification}"[^>]*>[\\s\\S]*?<\\/div><\\/div>`,
          ),
        );
        expect(cell, classification).not.toBeNull();
        const names = [...cell![0].matchAll(/<button[^>]*>([^<]*)<\/button>/g)].map((m) => m[1]);
        expect(names).toEqual(
          content.infertility.contraceptionMethods
            .filter((m) => m.classification === classification)
            .map((m) => escape(m.name)),
        );
      }
      expect(html.match(/<button /g)).toHaveLength(content.infertility.contraceptionMethods.length);
      expect(html).toContain("IUCD");
    });
    it(`${lang}: permanent methods reuse approved anatomy with tied ducts and organs retained`, () => {
      const male = renderToStaticMarkup(
        <ContraceptionDiagram content={content} lang={lang} index={4} />,
      );
      const female = renderToStaticMarkup(
        <ContraceptionDiagram content={content} lang={lang} index={5} />,
      );
      expect(male).toContain('data-reproductive-organ="2" data-highlighted="true"');
      expect(male).toContain('data-reproductive-organ="5"');
      expect(female).toContain('data-reproductive-organ="0" data-highlighted="true"');
      expect(female).toContain('data-reproductive-organ="1"');
      expect(female).toContain('data-reproductive-organ="2"');
      expect(male.match(/data-cut-tied="true"/g)).toHaveLength(2);
      expect(female.match(/data-cut-tied="true"/g)).toHaveLength(2);
      expect(male).toContain(content.humanReproductiveSystem.maleParts[2].part);
      expect(female).toContain(content.humanReproductiveSystem.femaleParts[0].part);
    });
    it(`${lang}: pill/implant, condom barrier and IUCD use distinct source mechanisms`, () => {
      for (let i = 0; i < 4; i++) {
        const html = renderToStaticMarkup(
          <ContraceptionDiagram content={content} lang={lang} index={i} />,
        );
        if (i < 3)
          expect(html).toContain(escape(content.infertility.contraceptionMethods[i].description));
        if (i < 2) expect(html).toContain('data-ovum-retained="true"');
        if (i === 2) expect(html).toContain('data-barrier="condom"');
        if (i === 3) expect(html).toContain('data-iucd-location="uterus"');
        expect(html).not.toMatch(
          /\bFSH\b|\bLH\b|oestrogen|progesterone|sexually transmitted|jangkitan kelamin/i,
        );
      }
    });
    it(`${lang}: all health-screening source statements render`, () => {
      const html = renderToStaticMarkup(<Chapter4Infertility content={content} lang={lang} />);
      for (const fact of content.infertility.healthScreeningImportance)
        expect(html).toContain(escape(fact));
      expect(html).toContain('data-health-screening="canonical"');
    });
  }
  it("BM/DLP share geometry in all overview and contraception states", () => {
    const outputs = (["bm", "en"] as const).map((lang) =>
      renderToStaticMarkup(
        <>
          <Chapter4DevelopmentFactors content={chapter4Content[lang]} lang={lang} />
          <Chapter4Infertility content={chapter4Content[lang]} lang={lang} />
        </>,
      ),
    );
    expect(geometry(outputs[0])).toBe(geometry(outputs[1]));
    chapter4Content.en.infertility.contraceptionMethods.forEach((_, index) =>
      expect(
        geometry(
          renderToStaticMarkup(
            <ContraceptionDiagram content={chapter4Content.bm} lang="bm" index={index} />,
          ),
        ),
      ).toBe(
        geometry(
          renderToStaticMarkup(
            <ContraceptionDiagram content={chapter4Content.en} lang="en" index={index} />,
          ),
        ),
      ),
    );
  });
  it("all factual lists consume supplied content, including an additional canonical method", () => {
    const content = structuredClone(chapter4Content.en);
    const source = content.foetalDevelopmentFactors;
    source.nutrientNeeds.forEach((n, i) => {
      n.nutrient = `SOURCE NUTRIENT ${i}`;
      n.examples = `SOURCE EXAMPLE ${i}`;
      n.fn = `SOURCE FUNCTION ${i}`;
    });
    source.harmfulSubstances.forEach((s, i) => {
      s.substance = `SOURCE SUBSTANCE ${i}`;
      s.effects = [`SOURCE EFFECT ${i}`];
    });
    source.breastfeedingBenefits = ["SOURCE BENEFIT"];
    content.infertility.definition = "SOURCE DEFINITION";
    content.infertility.maleFactors = ["SOURCE MALE"];
    content.infertility.femaleFactors = ["SOURCE FEMALE"];
    content.infertility.treatments.forEach((t, i) => {
      t.name = `SOURCE TREATMENT ${i}`;
      t.description = `SOURCE TREATMENT FUNCTION ${i}`;
    });
    content.infertility.healthScreeningImportance = ["SOURCE SCREENING"];
    content.infertility.contraceptionMethods.push({
      name: "SOURCE EXTRA METHOD",
      classification: "Temporary - male",
      description: "SOURCE EXTRA DESCRIPTION",
    });
    const html = renderToStaticMarkup(
      <>
        <Chapter4DevelopmentFactors content={content} lang="en" />
        <Chapter4Infertility content={content} lang="en" />
      </>,
    );
    for (const item of source.nutrientNeeds)
      for (const value of Object.values(item)) expect(html).toContain(value);
    for (const item of source.harmfulSubstances) {
      expect(html).toContain(item.substance);
      expect(html).toContain(item.effects[0]);
    }
    for (const word of ["BENEFIT", "DEFINITION", "MALE", "FEMALE", "SCREENING", "EXTRA METHOD"])
      expect(html).toContain(`SOURCE ${word}`);
    for (const item of content.infertility.treatments) {
      expect(html).toContain(item.name);
      expect(html).toContain(item.description);
    }
    expect(html).not.toContain(escape(chapter4Content.en.infertility.definition));
    expect(html).not.toContain(
      escape(chapter4Content.en.foetalDevelopmentFactors.nutrientNeeds[0].fn),
    );
  });
});

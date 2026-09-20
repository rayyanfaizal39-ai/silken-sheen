import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { scienceF1C4NotesBM } from "@/content/form1/science/chapter-4/notes-bm";
import { scienceF1C4NotesDLP } from "@/content/form1/science/chapter-4/notes-dlp";
import { ScienceF1Chapter4VisualNotesBlock } from "./ScienceF1Chapter4VisualNotesBlock";
import { Chapter4ReproductionVisuals } from "./blocks/Chapter4ReproductionVisuals";
import {
  ReproductiveAnatomyDiagram,
  ReproductiveSystemPanel,
} from "./blocks/Chapter4ReproductiveAnatomy";
import { Chapter4Gametes, Chapter4Puberty } from "./blocks/Chapter4GametesPuberty";
const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("'", "&#x27;");
const geometry = (s: string) =>
  [...s.matchAll(/<(?:svg|g|path|rect|circle|ellipse|text|marker)\b[^>]*>/g)]
    .map((m) => m[0].replace(/ (?:id|aria-label|marker-end)="[^"]*"/g, ""))
    .join("\n");
describe("Science Form 1 Chapter 4 Pass 1 live visuals", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter4Content[lang];
    const render = () =>
      renderToStaticMarkup(
        <ScienceF1Chapter4VisualNotesBlock content={chapter4Content} lang={lang} />,
      );
    it(`${lang}: chapter navigation has exactly seven official textbook subtopics`, () => {
      const html = render();
      const header = html.match(/<header[\s\S]*?<\/header>/)![0];
      expect([...header.matchAll(/>(4\.[1-7])<\/span>/g)].map((m) => m[1])).toEqual([
        "4.1",
        "4.2",
        "4.3",
        "4.4",
        "4.5",
        "4.6",
        "4.7",
      ]);
      expect(header).not.toMatch(/4\.5[–-]4\.6/);
      for (const section of content.officialSubtopics)
        expect(header).toContain(escape(section.title));
      expect(header).toContain(content.chapterTitle);
      expect(html).toContain("bg-[#061923]");
      expect(
        (lang === "bm" ? scienceF1C4NotesBM : scienceF1C4NotesDLP).sections.map((s) => s.title),
      ).toEqual(content.officialSubtopics.map((s) => `${s.number} ${s.title}`));
    });
    it(`${lang}: sexual/asexual pathways show gamete fusion versus clones and retain canonical comparison`, () => {
      const html = render();
      expect(html).toContain('data-reproduction-diagram="sexual-flow"');
      expect(html).toContain('data-reproduction-diagram="asexual-flow"');
      expect(html).toContain('data-fertilisation="fusion"');
      expect(html).toContain('data-offspring="variation"');
      expect(html).toContain('data-offspring="clones"');
      for (const kind of ["sexual", "asexual"] as const) {
        const source = content.reproductionBasics[kind];
        for (const text of [source.involves, source.variation, ...source.occursIn])
          expect(html).toContain(escape(text));
      }
      expect(html).toContain(lang === "bm" ? "Tiada percantuman gamet" : "No gamete fusion");
    });
    it(`${lang}: all five asexual processes have visual sequences and original examples`, () => {
      const html = renderToStaticMarkup(
        <Chapter4ReproductionVisuals content={content} lang={lang} />,
      );
      content.asexualTypes.forEach((type, i) => {
        expect(html).toContain(`data-reproduction-diagram="asexual-${i}"`);
        for (const text of [type.name, type.description, ...type.examples])
          expect(html).toContain(escape(text));
      });
      for (const cue of [
        'data-dividing-cell="true"',
        'data-fragment="true"',
        'data-new-organism="true"',
        'data-sporangium="true"',
        'data-released-spores="true"',
        'data-parent-plant-part="tuber"',
      ])
        expect(html).toContain(cue);
    });
    it(`${lang}: fertilisation contrasts inside the female with external water and uses source examples`, () => {
      const html = renderToStaticMarkup(
        <Chapter4ReproductionVisuals content={content} lang={lang} />,
      );
      expect(html).toContain('data-female-body-boundary="true"');
      expect(html).toContain('data-water-environment="true"');
      for (const type of ["internal", "external"] as const)
        for (const text of content.reproductionBasics.fertilisationTypes[type])
          expect(html).toContain(escape(text));
    });
    it(`${lang}: canonical reproduction importance and extinction are visible`, () => {
      const html = render();
      expect(html).toContain('data-reproduction-importance="true"');
      expect(html).toContain('data-extinction="no-individuals"');
      for (const text of [
        ...content.reproductionImportance.benefits,
        ...content.reproductionImportance.failure,
      ])
        expect(html).toContain(escape(text));
    });
    it(`${lang}: male front/side and female front anatomy show every canonical organ`, () => {
      for (const sex of ["male", "female"] as const) {
        const parts =
          sex === "male"
            ? content.humanReproductiveSystem.maleParts
            : content.humanReproductiveSystem.femaleParts;
        const panel = renderToStaticMarkup(
          <ReproductiveSystemPanel content={content} lang={lang} sex={sex} />,
        );
        for (const part of parts) expect(panel).toContain(escape(part.part));
        for (const side of sex === "male" ? [false, true] : [false]) {
          const html = renderToStaticMarkup(
            <ReproductiveAnatomyDiagram content={content} lang={lang} sex={sex} side={side} />,
          );
          expect(
            [...html.matchAll(/data-reproductive-organ="(\d+)"/g)].map((m) => Number(m[1])).sort(),
          ).toEqual(parts.map((_, i) => i));
          if (sex === "male") expect(html).toContain('data-urinary-bladder="context"');
        }
      }
      const female = renderToStaticMarkup(
        <ReproductiveSystemPanel content={content} lang={lang} sex="female" />,
      );
      expect(female).toContain('data-fertilisation-vs-development="true"');
      expect(female).toContain(escape(content.humanReproductiveSystem.femaleParts[0].function));
      expect(female).toContain(escape(content.humanReproductiveSystem.femaleParts[2].function));
      expect(content.humanReproductiveSystem.femaleParts[0].function).toMatch(
        /fertilisation|persenyawaan/i,
      );
      expect(content.humanReproductiveSystem.femaleParts[2].function).toMatch(/embryo|embrio/i);
    });
    it(`${lang}: selected organ is highlighted while unrelated anatomy is dimmed`, () => {
      for (const sex of ["male", "female"] as const)
        for (let selected = 0; selected < (sex === "male" ? 7 : 5); selected++) {
          const html = renderToStaticMarkup(
            <ReproductiveAnatomyDiagram
              content={content}
              lang={lang}
              sex={sex}
              selected={selected}
            />,
          );
          expect(html).toContain(
            `data-reproductive-organ="${selected}" data-highlighted="true" opacity="1"`,
          );
          expect(html).toContain('data-highlighted="false" opacity="0.38"');
        }
    });
    it(`${lang}: sperm and ovum are genuine labelled cell diagrams with all original comparisons`, () => {
      const html = renderToStaticMarkup(<Chapter4Gametes content={content} lang={lang} />);
      const sperm = html.match(
        /<svg[^>]*data-reproduction-diagram="sperm-cell"[\s\S]*?<\/svg>/,
      )![0];
      const ovum = html.match(/<svg[^>]*data-reproduction-diagram="ovum-cell"[\s\S]*?<\/svg>/)![0];
      for (const part of ["head", "nucleus", "middle-piece", "tail"])
        expect(sperm).toContain(`data-cell-part="${part}"`);
      for (const part of ["nucleus", "cytoplasm", "cell-membrane", "jelly-layer"])
        expect(ovum).toContain(`data-cell-part="${part}"`);
      for (const row of content.humanReproductiveSystem.gameteComparison)
        for (const text of Object.values(row)) expect(html).toContain(escape(text));
      for (const text of content.gameteCommon) expect(html).toContain(escape(text));
      expect(html).toContain(lang === "bm" ? "tidak mengikut skala" : "not to scale");
      expect(html).toContain(escape(content.humanReproductiveSystem.maleParts[5].function));
      expect(html).toContain(escape(content.humanReproductiveSystem.femaleParts[1].function));
    });
    it(`${lang}: both puberty outlines show callouts, canonical changes and qualified ages`, () => {
      const html = renderToStaticMarkup(<Chapter4Puberty content={content} lang={lang} />);
      expect(html).toContain('data-human-outline="male"');
      expect(html).toContain('data-human-outline="female"');
      for (const text of [
        content.puberty.definition,
        content.puberty.maleAge,
        content.puberty.femaleAge,
        ...[...content.puberty.maleChanges, ...content.puberty.femaleChanges].flatMap(
          (g) => g.changes,
        ),
      ])
        expect(html).toContain(escape(text));
      expect(content.puberty.maleAge).toContain("14-17");
      expect(content.puberty.femaleAge).toContain("10-12");
      expect(content.puberty.maleAge).toMatch(/Approximately|Kira-kira/);
    });
  }
  it("BM/DLP share all Pass 1 SVG geometry", () => {
    for (const Component of [Chapter4ReproductionVisuals, Chapter4Gametes, Chapter4Puberty])
      expect(
        geometry(renderToStaticMarkup(<Component content={chapter4Content.bm} lang="bm" />)),
      ).toBe(geometry(renderToStaticMarkup(<Component content={chapter4Content.en} lang="en" />)));
    for (const sex of ["male", "female"] as const)
      for (const side of [false, true])
        for (const selected of [null, 0, 1])
          expect(
            geometry(
              renderToStaticMarkup(
                <ReproductiveAnatomyDiagram
                  content={chapter4Content.bm}
                  lang="bm"
                  sex={sex}
                  side={side}
                  selected={selected}
                />,
              ),
            ),
          ).toBe(
            geometry(
              renderToStaticMarkup(
                <ReproductiveAnatomyDiagram
                  content={chapter4Content.en}
                  lang="en"
                  sex={sex}
                  side={side}
                  selected={selected}
                />,
              ),
            ),
          );
  });
  it("canonical source updates flow through new reproduction, importance and gamete views", () => {
    const source = structuredClone(chapter4Content);
    source.en.asexualTypes[0].description = "SOURCE FISSION";
    source.en.reproductionImportance.benefits[0] = "SOURCE IMPORTANCE";
    source.en.gameteCommon[0] = "SOURCE GAMETES";
    const html = renderToStaticMarkup(
      <ScienceF1Chapter4VisualNotesBlock content={source} lang="en" />,
    );
    for (const text of ["SOURCE FISSION", "SOURCE IMPORTANCE", "SOURCE GAMETES"])
      expect(html).toContain(text);
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import type { ScienceF2InteractiveContent } from "./interactive-types";
import { scienceF2C2InteractiveBM } from "./chapter-2/interactive-bm";
import { scienceF2C2InteractiveDLP } from "./chapter-2/interactive-dlp";
import { scienceF2C3InteractiveBM } from "./chapter-3/interactive-bm";
import { scienceF2C3InteractiveDLP } from "./chapter-3/interactive-dlp";
import { scienceF2C4InteractiveBM } from "./chapter-4/interactive-bm";
import { scienceF2C4InteractiveDLP } from "./chapter-4/interactive-dlp";
import { scienceF2C5InteractiveBM } from "./chapter-5/interactive-bm";
import { scienceF2C5InteractiveDLP } from "./chapter-5/interactive-dlp";
import { scienceF2C6InteractiveBM } from "./chapter-6/interactive-bm";
import { scienceF2C6InteractiveDLP } from "./chapter-6/interactive-dlp";
import { scienceF2C7InteractiveBM } from "./chapter-7/interactive-bm";
import { scienceF2C7InteractiveDLP } from "./chapter-7/interactive-dlp";
import { scienceF2C8InteractiveBM } from "./chapter-8/interactive-bm";
import { scienceF2C8InteractiveDLP } from "./chapter-8/interactive-dlp";
import { scienceF2C9InteractiveBM } from "./chapter-9/interactive-bm";
import { scienceF2C9InteractiveDLP } from "./chapter-9/interactive-dlp";
import { scienceF2C10InteractiveBM } from "./chapter-10/interactive-bm";
import { scienceF2C10InteractiveDLP } from "./chapter-10/interactive-dlp";
import { scienceF2C11InteractiveBM } from "./chapter-11/interactive-bm";
import { scienceF2C11InteractiveDLP } from "./chapter-11/interactive-dlp";
import { scienceF2C12InteractiveBM } from "./chapter-12/interactive-bm";
import { scienceF2C12InteractiveDLP } from "./chapter-12/interactive-dlp";
import { scienceF2C13InteractiveBM } from "./chapter-13/interactive-bm";
import { scienceF2C13InteractiveDLP } from "./chapter-13/interactive-dlp";

/**
 * Guards for the global question-led concept-opener pass (Chapters 2-13).
 *
 * Chapter 1 is the untouched reference pattern ("What is Biodiversity?" /
 * "Apakah Biodiversiti?") and is not covered here — it uses its own
 * bespoke component, not the shared `conceptQuestion`/`rememberQuestion`
 * fields this pass introduced on `ScienceInteractiveSection`.
 */

const CHAPTERS: [number, ScienceF2InteractiveContent, ScienceF2InteractiveContent][] = [
  [2, scienceF2C2InteractiveBM, scienceF2C2InteractiveDLP],
  [3, scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP],
  [4, scienceF2C4InteractiveBM, scienceF2C4InteractiveDLP],
  [5, scienceF2C5InteractiveBM, scienceF2C5InteractiveDLP],
  [6, scienceF2C6InteractiveBM, scienceF2C6InteractiveDLP],
  [7, scienceF2C7InteractiveBM, scienceF2C7InteractiveDLP],
  [8, scienceF2C8InteractiveBM, scienceF2C8InteractiveDLP],
  [9, scienceF2C9InteractiveBM, scienceF2C9InteractiveDLP],
  [10, scienceF2C10InteractiveBM, scienceF2C10InteractiveDLP],
  [11, scienceF2C11InteractiveBM, scienceF2C11InteractiveDLP],
  [12, scienceF2C12InteractiveBM, scienceF2C12InteractiveDLP],
  [13, scienceF2C13InteractiveBM, scienceF2C13InteractiveDLP],
];

describe("Concept-opener pass — BM/DLP parity", () => {
  for (const [chapter, bm, dlp] of CHAPTERS) {
    it(`chapter ${chapter}: conceptQuestion exists in both languages, or neither, at every matching section`, () => {
      expect(bm.sections.length, `chapter ${chapter} section count`).toBe(dlp.sections.length);
      bm.sections.forEach((bmSection, i) => {
        const dlpSection = dlp.sections[i];
        const bmHas = Boolean(bmSection.conceptQuestion);
        const dlpHas = Boolean(dlpSection.conceptQuestion);
        expect(
          bmHas,
          `chapter ${chapter} section ${i} ("${bmSection.title}") conceptQuestion parity`,
        ).toBe(dlpHas);
        if (bmHas) {
          expect(
            bmSection.conceptQuestion!.trim().length,
            `chapter ${chapter} section ${i} BM`,
          ).toBeGreaterThan(0);
        }
        if (dlpHas) {
          expect(
            dlpSection.conceptQuestion!.trim().length,
            `chapter ${chapter} section ${i} DLP`,
          ).toBeGreaterThan(0);
        }
      });
    });

    it(`chapter ${chapter}: rememberQuestion exists in both languages, or neither, at every matching section`, () => {
      bm.sections.forEach((bmSection, i) => {
        const dlpSection = dlp.sections[i];
        const bmHas = Boolean(bmSection.rememberQuestion);
        const dlpHas = Boolean(dlpSection.rememberQuestion);
        expect(
          bmHas,
          `chapter ${chapter} section ${i} ("${bmSection.title}") rememberQuestion parity`,
        ).toBe(dlpHas);
        // a rememberQuestion answers a definition that must actually be there
        if (bmHas)
          expect(bmSection.remember, `chapter ${chapter} section ${i} BM remember`).toBeTruthy();
        if (dlpHas)
          expect(dlpSection.remember, `chapter ${chapter} section ${i} DLP remember`).toBeTruthy();
      });
    });

    it(`chapter ${chapter}: no conceptQuestion duplicates its own section title verbatim`, () => {
      for (const section of [...bm.sections, ...dlp.sections]) {
        if (section.conceptQuestion) {
          expect(
            section.conceptQuestion.toLowerCase(),
            `"${section.conceptQuestion}" vs title "${section.title}"`,
          ).not.toBe(section.title.toLowerCase());
        }
      }
    });
  }
});

describe("Concept-opener pass — renders as a heading directly above the definition", () => {
  function sectionMarkup(content: ScienceF2InteractiveContent, lang: "bm" | "en", index: number) {
    const section = content.sections[index];
    return renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...content, sections: [section] },
        lang,
      }),
    );
  }

  it("DLP: chapter 2's Ecosystem-organisation opener renders before its intro", () => {
    const index = scienceF2C2InteractiveDLP.sections.findIndex(
      (s) => s.title === "Interdependence and Ecological Terms",
    );
    expect(index).toBeGreaterThanOrEqual(0);
    const markup = sectionMarkup(scienceF2C2InteractiveDLP, "en", index);
    const headingAt = markup.indexOf("How is an Ecosystem Organised?");
    const introAt = markup.indexOf("Before studying interactions");
    expect(headingAt).toBeGreaterThan(-1);
    expect(introAt).toBeGreaterThan(-1);
    expect(headingAt).toBeLessThan(introAt);
  });

  it("BM: chapter 2's Ecosystem-organisation opener renders before its intro", () => {
    const index = scienceF2C2InteractiveBM.sections.findIndex(
      (s) => s.title === "Saling Bersandaran dan Istilah Ekologi",
    );
    expect(index).toBeGreaterThanOrEqual(0);
    const markup = sectionMarkup(scienceF2C2InteractiveBM, "bm", index);
    const headingAt = markup.indexOf("Bagaimanakah Ekosistem Disusun?");
    const introAt = markup.indexOf("Sebelum mengkaji interaksi");
    expect(headingAt).toBeGreaterThan(-1);
    expect(introAt).toBeGreaterThan(-1);
    expect(headingAt).toBeLessThan(introAt);
  });

  it("chapter 8 Types of Forces: 'What is Force?' then intro, then 'What are the Types of Force?', then the interactive — in that order, both languages", () => {
    for (const [lang, content] of [
      ["en", scienceF2C8InteractiveDLP],
      ["bm", scienceF2C8InteractiveBM],
    ] as const) {
      const index = content.sections.findIndex((s) => Array.isArray(s.flipCards));
      expect(index, lang).toBeGreaterThanOrEqual(0);
      const markup = sectionMarkup(content, lang, index);
      const whatIsForce = lang === "bm" ? "Apakah Daya?" : "What is Force?";
      const whatAreTypes =
        lang === "bm" ? "Apakah Jenis-jenis Daya?" : "What are the Types of Force?";
      const whatIsForceAt = markup.indexOf(whatIsForce);
      const whatAreTypesAt = markup.indexOf(whatAreTypes);
      const figureAt = markup.indexOf('data-ch8-figure="types"');
      expect(whatIsForceAt, `${lang} What is Force?`).toBeGreaterThan(-1);
      expect(whatAreTypesAt, `${lang} What are the Types of Force?`).toBeGreaterThan(-1);
      expect(figureAt, `${lang} six-panel figure`).toBeGreaterThan(-1);
      expect(whatIsForceAt, `${lang} order`).toBeLessThan(whatAreTypesAt);
      expect(whatAreTypesAt, `${lang} order`).toBeLessThan(figureAt);
    }
  });

  it("chapter 5's Solubility rememberQuestion renders directly above its remember callout, both languages", () => {
    for (const [lang, content] of [
      ["en", scienceF2C5InteractiveDLP],
      ["bm", scienceF2C5InteractiveBM],
    ] as const) {
      const index = content.sections.findIndex((s) => Boolean(s.rememberQuestion));
      expect(index, lang).toBeGreaterThanOrEqual(0);
      const section = content.sections[index];
      const markup = sectionMarkup(content, lang, index);
      const headingAt = markup.indexOf(section.rememberQuestion!);
      // Search on a plain-text fragment that doesn't straddle a **...** run —
      // markup renders that as its own <strong> tag, splitting the raw string.
      // Use the LAST match: this chapter's own "Solubility" card restates
      // nearly the same sentence earlier on the page (by design, pre-existing
      // content), and the remember callout is the one that actually renders
      // last, after every card.
      const plainFragment = section
        .remember!.split("**")
        .filter((part) => part.trim().length > 15)[0]
        .trim();
      const rememberAt = markup.lastIndexOf(plainFragment);
      expect(headingAt, lang).toBeGreaterThan(-1);
      expect(rememberAt, lang).toBeGreaterThan(-1);
      expect(headingAt, `${lang} order`).toBeLessThan(rememberAt);
    }
  });

  it("chapter 1 remains the untouched reference pattern (not modified by this pass)", () => {
    // Chapter 1 uses its own bespoke component and copy object, not the
    // shared conceptQuestion field — confirm the reference strings are
    // still exactly what this whole pass was modelled on.
    const source = readFileSync("src/components/notes/ScienceF2Chapter1NotesBlock.tsx", "utf-8");
    expect(source).toContain('whatIsBiodiversityHead: "What is Biodiversity?"');
    expect(source).toContain('whatIsBiodiversityHead: "Apakah Biodiversiti?"');
  });
});

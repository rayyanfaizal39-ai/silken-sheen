import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { laboratoryApparatus } from "@/content/form1/science/chapter-1/chapter1-canonical";
import { ScienceF1Chapter1VisualNotesBlock } from "./ScienceF1Chapter1VisualNotesBlock";

function renderChapter(lang: "bm" | "en") {
  return renderToStaticMarkup(
    createElement(ScienceF1Chapter1VisualNotesBlock, { content: chapter1Content, lang }),
  );
}

describe("ScienceF1Chapter1VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter1VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter1Content,
        lang: "bm",
      }),
    );
    expect(html).toContain("Pengenalan kepada Penyiasatan Saintifik");
    expect(html).toContain("Makmal sains anda");
    expect(html).toContain("Kuantiti fizik dan unitnya");
    expect(html).toContain("Pepejal di dalam air");
    expect(html).toContain("Kajian kes: eksperimen bandul");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderChapter("en");
    expect(html).toContain("Introduction to Scientific Investigation");
    expect(html).toContain("Your science laboratory");
    expect(html).toContain("Physical quantities and their units");
    expect(html).toContain("Solid in water");
    expect(html).toContain("Case study: the pendulum experiment");
  });

  it.each([
    ["bm", "bm"],
    ["DLP", "en"],
  ] as const)("renders all 14 canonical apparatus with %s labels", (_stream, lang) => {
    const html = renderChapter(lang);
    expect(html.match(/data-apparatus-option=/g)).toHaveLength(14);
    for (const item of laboratoryApparatus) {
      expect(html).toContain(`data-apparatus-option="${item.id}"`);
      expect(html).toContain(item.name[lang]);
    }
  });

  it("wires the tap/click gallery to one selected detail panel", () => {
    const html = renderChapter("en");
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-controls="selected-apparatus-detail"');
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('role="tabpanel"');
    expect(html).toContain('data-selected-apparatus="boiling-tube"');
    expect(html).toContain("How to recognise it");
  });

  it("includes the four important same-scale comparison groups and heating support context", () => {
    const html = renderChapter("en");
    for (const pair of [
      "test-tube:boiling-tube",
      "beaker:measuring-cylinder",
      "conical-flask:flat-bottom-flask",
      "burette:pipette",
    ]) {
      expect(html).toContain(`data-apparatus-comparison="${pair}"`);
    }
    expect(html).toContain("Don&#x27;t Mix Them Up");
    expect(html).toContain("data-heating-support-visual");
  });

  it("keeps names and functions in canonical data instead of duplicating them in the visual files", () => {
    const visualSource = [
      "src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx",
      "src/components/notes/blocks/LaboratoryApparatusVisual.tsx",
    ]
      .map((file) => readFileSync(resolve(process.cwd(), file), "utf8"))
      .join("\n");

    for (const item of laboratoryApparatus) {
      expect(visualSource).not.toContain(item.function.en);
      expect(visualSource).not.toContain(item.function.bm);
    }
  });
});

describe("Chapter 1 completion — live render fidelity", () => {
  const escape = (text: string) =>
    renderToStaticMarkup(createElement("span", null, text)).slice(6, -7);
  it.each(["bm", "en"] as const)(
    "%s exposes the canonical learning content in the live notes",
    (lang) => {
      const t = chapter1Content[lang];
      const html = renderChapter(lang);
      const required = [
        ...t.laboratory.rules,
        ...t.laboratory.safetyMeasures,
        ...t.laboratory.accidentSteps,
        ...t.scienceInLife.dailyConnections,
        t.scienceInLife.innovation.definition,
        ...t.scienceInLife.innovation.examples,
        t.quantitiesAndUnits.physicalQuantityDefinition,
        ...t.quantitiesAndUnits.prefixes.flatMap((p) => [
          p.prefix,
          p.symbol,
          p.standardForm,
          p.value,
        ]),
        t.measuringInstruments.innovation,
        ...t.measuringInstruments.errorTypes.flatMap((e) => [
          e.definition,
          ...e.examples,
          ...e.waysToOvercome,
        ]),
        t.density.operationalDefinition,
        ...t.density.everydayExamples,
        t.attitudesAndValues.purpose,
      ];
      expect(t.laboratory.rules).toHaveLength(10);
      for (const text of required) expect(html.includes(escape(text)), text).toBe(true);
      for (const item of laboratoryApparatus) {
        expect(html).toContain(`data-classified-apparatus="${item.id}"`);
      }
      const activities = Object.values(t.learningExperiences).flat();
      expect(activities).toHaveLength(8);
      for (const activity of activities) {
        expect(html).toContain(`data-learning-experience="${activity.id}"`);
        for (const text of [
          activity.title,
          activity.purpose,
          activity.practicalNotice!,
          ...activity.instructions,
        ])
          expect(html.includes(escape(text)), text).toBe(true);
      }
      for (const id of [
        "water-displacement",
        "pendulum-setup",
        "pendulum-graph",
        "parallax-meniscus",
      ]) {
        expect(html).toContain(`data-chapter1-diagram="${id}"`);
      }
      expect(html.match(/data-apparatus-option=/g)).toHaveLength(14);
      expect(html.match(/data-apparatus-comparison=/g)).toHaveLength(4);
      expect(html.match(/data-liquid-density=/g)).toHaveLength(4);
      expect(html).toContain('data-solid-state="float"');
    },
  );

  it.each(["bm", "en"] as const)(
    "%s preserves ten-oscillation data and one-oscillation conceptual wording",
    (lang) => {
      const html = renderChapter(lang);
      for (const pair of ["20,9.1", "30,11.4", "40,13.1", "50,14.3", "60,15.2"])
        expect(html).toContain(`data-pendulum-point="${pair}"`);
      expect(html).toContain(
        lang === "en"
          ? "Time taken for 10 complete oscillations (s)"
          : "Masa untuk 10 ayunan lengkap (s)",
      );
      expect(html).toContain(lang === "en" ? "Length of pendulum (cm)" : "Panjang bandul (cm)");
      expect(html).toContain(
        lang === "en" ? "time for one complete oscillation" : "masa untuk satu ayunan lengkap",
      );
      const procedure = chapter1Content[lang].learningExperiences.investigation[0].instructions[0];
      expect(procedure).toContain(lang === "en" ? "10 complete oscillations" : "10 ayunan lengkap");
    },
  );

  it("shares diagrams and practical depth across BM and DLP", () => {
    const markers = (html: string) =>
      html.match(
        /data-(?:chapter1-diagram|learning-experience|classified-apparatus|pendulum-point)="[^"]+"/g,
      );
    expect(markers(renderChapter("bm"))).toEqual(markers(renderChapter("en")));
  });
});

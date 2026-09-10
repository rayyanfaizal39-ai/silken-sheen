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
    expect(html).toContain("Penyiasatan saintifik bermula dengan rasa ingin tahu");
    expect(html).toContain("Makmal sains anda");
    expect(html).toContain("Kuantiti fizik dan unitnya");
    expect(html).toContain("Makmal ketumpatan maya");
    expect(html).toContain("Kajian kes: eksperimen bandul");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderChapter("en");
    expect(html).toContain("Scientific investigation begins with curiosity");
    expect(html).toContain("Your science laboratory");
    expect(html).toContain("Physical quantities and their units");
    expect(html).toContain("Virtual density laboratory");
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

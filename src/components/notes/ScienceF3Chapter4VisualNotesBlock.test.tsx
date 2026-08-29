import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter4VisualNotesBlock } from "./ScienceF3Chapter4VisualNotesBlock";
import { scienceF3C4InteractiveBM } from "@/content/form3/science/chapter-4/interactive-bm";
import { scienceF3C4InteractiveDLP } from "@/content/form3/science/chapter-4/interactive-dlp";

describe("ScienceF3Chapter4VisualNotesBlock", () => {
  it("renders the Malay minerals-to-extraction learning journey", () => {
    const html=renderToStaticMarkup(createElement(ScienceF3Chapter4VisualNotesBlock,{id:"science-notes-content",content:scienceF3C4InteractiveBM,lang:"bm"}));
    expect(html).toContain("Fahami bagaimana kereaktifan menentukan segalanya");
    expect(html).toContain("4.1 Kepelbagaian Mineral");
    expect(html).toContain("Buktikan batu kapur ialah sebatian");
    expect(html).toContain("Aktiviti 4.3");
    expect(html).toContain("Letakkan karbon");
    expect(html).toContain("Letakkan hidrogen");
    expect(html).toContain("Siri kereaktifan lengkap");
    expect(html).toContain("relau bagas");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html=renderToStaticMarkup(createElement(ScienceF3Chapter4VisualNotesBlock,{content:scienceF3C4InteractiveDLP,lang:"en"}));
    expect(html).toContain("Understand how reactivity determines everything");
    expect(html).toContain("4.1 Variety of Minerals");
    expect(html).toContain("Prove limestone is a compound");
    expect(html).toContain("Activity 4.3");
    expect(html).toContain("Place carbon");
    expect(html).toContain("Place hydrogen");
    expect(html).toContain("Complete reactivity series");
    expect(html).toContain("blast furnace");
  });
});

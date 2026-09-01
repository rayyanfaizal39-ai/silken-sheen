import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { ScienceF1Chapter7VisualNotesBlock } from "./ScienceF1Chapter7VisualNotesBlock";

describe("ScienceF1Chapter7VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter7VisualNotesBlock, {
        id: "science-notes-content",
        content: bab7Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Udara ialah sistem sokongan hidup yang tidak kelihatan");
    expect(html).toContain("Ukur oksigen melalui pembakaran");
    expect(html).toContain("Segi tiga api");
    expect(html).toContain("Indeks Pencemaran Udara");
    expect(html).toContain("Mengapakah natrium dan kalium");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter7VisualNotesBlock, {
        content: bab7Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Air is an invisible life-support system");
    expect(html).toContain("one-fifth rise in water");
    expect(html).toContain("Never use water on an oil fire");
    expect(html).toContain("Air Pollutant Index");
    expect(html).toContain("Why can cave explorers");
  });
});

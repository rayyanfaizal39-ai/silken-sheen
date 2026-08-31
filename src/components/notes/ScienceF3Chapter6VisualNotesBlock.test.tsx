import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter6VisualNotesBlock } from "./ScienceF3Chapter6VisualNotesBlock";
import { scienceF3C6InteractiveBM } from "@/content/form3/science/chapter-6/interactive-bm";
import { scienceF3C6InteractiveDLP } from "@/content/form3/science/chapter-6/interactive-dlp";

describe("ScienceF3Chapter6VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter6VisualNotesBlock, {
        id: "science-notes-content",
        content: scienceF3C6InteractiveBM,
        lang: "bm",
      }),
    );

    expect(html).toContain("Fahami perjalanan tenaga elektrik");
    expect(html).toContain("6.3 Penghantaran &amp; Pengagihan Tenaga Elektrik");
    expect(html).toContain("Arus aruhan bermula dengan gerakan");
    expect(html).toContain("Transformer: lihat lilitan dahulu");
    expect(html).toContain("Perjalanan elektrik ke rumah");
    expect(html).toContain("Fius melindungi dengan memutuskan litar");
    expect(html).toContain("Daripada kuasa kepada kos");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter6VisualNotesBlock, {
        content: scienceF3C6InteractiveDLP,
        lang: "en",
      }),
    );

    expect(html).toContain("Understand the journey of electrical energy");
    expect(html).toContain("6.3 Transmission &amp; Distribution of Electricity");
    expect(html).toContain("Induced current starts with motion");
    expect(html).toContain("Transformer: see the turns first");
    expect(html).toContain("Electricity&#x27;s journey to your home");
    expect(html).toContain("A fuse protects by opening the circuit");
    expect(html).toContain("From power to cost");
  });
});

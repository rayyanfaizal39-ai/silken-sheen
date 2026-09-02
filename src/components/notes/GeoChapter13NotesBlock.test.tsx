import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo13Content } from "@/content/form1/geography/chapter-13/geo13-content";
import { GeoChapter13NotesBlock } from "./GeoChapter13NotesBlock";

describe("GeoChapter13NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 13 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter13NotesBlock, {
        id: "geography-notes-content",
        content: geo13Content,
      }),
    );

    expect(html).toContain("Sisa domestik: daripada rumah kepada kesan seluruh bandar");
    expect(html).toContain("33,000");
    expect(html).toContain("Bahan organik");
    expect(html).toContain("Bahan bukan organik");
    expect(html).toContain("Lampin pakai buang");
    expect(html).toContain("Kumbahan");
    expect(html).toContain("Pencemaran Alam Sekitar");
    expect(html).toContain("Virus zika");
    expect(html).toContain("Banjir Kilat");
    expect(html).toContain("Waste to Energy");
    expect(html).toContain("85%");
    expect(html).toContain("Akta 672");
    expect(html).toContain("Akta 673");
    expect(html).toContain("Kempen Cintai Sungai Kita");
    expect(html).toContain("Pendidikan");
    expect(html).toContain('id="geography-notes-content"');
  });
});

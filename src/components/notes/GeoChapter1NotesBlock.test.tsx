import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo1Content } from "@/content/form1/geography/chapter-1/geo1-content";
import { GeoChapter1NotesBlock } from "./GeoChapter1NotesBlock";

describe("GeoChapter1NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 1 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter1NotesBlock, {
        id: "geography-notes-content",
        content: geo1Content,
      }),
    );

    expect(html).toContain("Arah: daripada matahari kepada bearing");
    expect(html).toContain("Lapan arah mata angin");
    expect(html).toContain("Matahari menjadi panduan semula jadi");
    expect(html).toContain("Cara menggunakan kompas dengan betul");
    expect(html).toContain("Bearing menukar arah kepada nombor");
    expect(html).toContain("180° + 120° = 300°");
    expect(html).toContain("Sistem Kedudukan Global (GPS)");
    expect(html).toContain("Ingatan aktif");
    expect(html).toContain('id="geography-notes-content"');
  });
});

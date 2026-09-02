import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo3Content } from "@/content/form1/geography/chapter-3/geo3-content";
import { GeoChapter3NotesBlock } from "./GeoChapter3NotesBlock";

describe("GeoChapter3NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 3 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter3NotesBlock, {
        id: "geography-notes-content",
        content: geo3Content,
      }),
    );

    expect(html).toContain("Peta lakar: membaca kawasan melalui simbol");
    expect(html).toContain("Lima ciri menjadikan peta lakar lengkap");
    expect(html).toContain("Empat jenis simbol mewakili bentuk yang berbeza");
    expect(html).toContain("Stesen trigonometri");
    expect(html).toContain("Singkatan menjimatkan ruang");
    expect(html).toContain("Pandang darat fizikal dan budaya");
    expect(html).toContain("Buat tinjauan di kawasan kajian");
    expect(html).toContain("Senarai semak peta lengkap");
    expect(html).toContain('id="geography-notes-content"');
  });
});

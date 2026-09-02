import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo12Content } from "@/content/form1/geography/chapter-12/geo12-content";
import { GeoChapter12NotesBlock } from "./GeoChapter12NotesBlock";

describe("GeoChapter12NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 12 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter12NotesBlock, {
        id: "geography-notes-content",
        content: geo12Content,
      }),
    );

    expect(html).toContain("Sumber air: banyak tidak semestinya sentiasa cukup");
    expect(html).toContain("2,500 mm hingga 3,000 mm");
    expect(html).toContain("Air permukaan");
    expect(html).toContain("97%");
    expect(html).toContain("Air bawah tanah");
    expect(html).toContain("5,000 bilion m³");
    expect(html).toContain("Intersepsi");
    expect(html).toContain("Infiltrasi");
    expect(html).toContain("Empangan Bukit Merah");
    expect(html).toContain("229 daripada 473 sungai");
    expect(html).toContain("Taun · kolera");
    expect(html).toContain("Akta Industri Perkhidmatan Air 2006");
    expect(html).toContain("Indah Water Konsortium");
    expect(html).toContain("Penyelidikan dan Pembangunan");
    expect(html).toContain("160,000 hektar di Padang Terap");
    expect(html).toContain('id="geography-notes-content"');
  });
});

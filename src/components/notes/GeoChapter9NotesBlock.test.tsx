import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo9Content } from "@/content/form1/geography/chapter-9/geo9-content";
import { GeoChapter9NotesBlock } from "./GeoChapter9NotesBlock";

describe("GeoChapter9NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 9 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter9NotesBlock, {
        id: "geography-notes-content",
        content: geo9Content,
      }),
    );

    expect(html).toContain("Petempatan di Malaysia: tempat manusia membina kehidupan");
    expect(html).toContain("Melebihi 10,000 orang");
    expect(html).toContain("Kurang daripada 10,000 orang");
    expect(html).toContain("Pelan Induk Pembangunan Luar Bandar (PIPLB)");
    expect(html).toContain("Bandar Tun Razak (Kuala Lumpur)");
    expect(html).toContain("Felda Sahabat (Sabah)");
    expect(html).toContain("Tebing Sungai Rajang (Sarawak)");
    expect(html).toContain("Bandar Satelit");
    expect(html).toContain("Putrajaya — Pusat Pentadbiran Kerajaan Persekutuan");
    expect(html).toContain("Labu Sayong");
    expect(html).toContain("JKKK");
    expect(html).not.toContain("Bandar Pertahanan");
    expect(html).toContain('id="geography-notes-content"');
    for (const pattern of ["berpusat", "berkelompok", "berjajar", "berselerak"]) {
      expect(html.split(`aria-label="Rajah pola petempatan ${pattern}"`).length - 1).toBe(1);
    }
  });
});

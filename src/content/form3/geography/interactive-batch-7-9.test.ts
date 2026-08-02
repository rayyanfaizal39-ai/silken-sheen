import { describe, expect, it } from "vitest";
import { geographyF3C7Interactive } from "./chapter-7/interactive";
import { geographyF3C8Interactive } from "./chapter-8/interactive";
import { geographyF3C9Interactive } from "./chapter-9/interactive";

const chapters = [geographyF3C7Interactive, geographyF3C8Interactive, geographyF3C9Interactive];

describe("Geografi Tingkatan 3 Bab 7-9 interactive notes", () => {
  it("provides a substantive explanation before every section interaction", () => {
    for (const chapter of chapters) {
      for (const section of chapter.sections) {
        expect(section.intro?.length, `${section.number} requires an explanation`).toBeGreaterThan(
          120,
        );
        expect(section.checks.length, `${section.number} requires Uji Diri`).toBeGreaterThan(0);
      }
    }
  });

  it("uses the requested chapter-specific interaction patterns", () => {
    expect(geographyF3C7Interactive.sections[0].zoneExplorer?.zones).toHaveLength(3);
    expect(geographyF3C7Interactive.sections[2].accordionToggle?.groups).toHaveLength(2);
    expect(geographyF3C7Interactive.sections[2].accordionToggle?.groups[0].items).toHaveLength(5);
    expect(geographyF3C7Interactive.sections[2].accordionToggle?.groups[1].items).toHaveLength(6);
    expect(geographyF3C7Interactive.sections[3].flipCards).toHaveLength(7);

    expect(geographyF3C8Interactive.sections[0].zoneExplorer?.zones).toHaveLength(4);
    expect(geographyF3C8Interactive.sections[1].flipCards).toHaveLength(4);

    expect(geographyF3C9Interactive.sections.map((section) => section.flipCards?.length)).toEqual([
      9, 4, 6, 6,
    ]);
  });

  it("does not introduce chapter imagery", () => {
    expect(JSON.stringify(chapters)).not.toContain("imagePath");
  });
});

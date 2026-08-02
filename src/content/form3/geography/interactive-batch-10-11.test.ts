import { describe, expect, it } from "vitest";
import { geographyF3C10Interactive } from "./chapter-10/interactive";
import { geographyF3C11Interactive } from "./chapter-11/interactive";

const chapters = [geographyF3C10Interactive, geographyF3C11Interactive];

describe("Geografi Tingkatan 3 Bab 10-11 interactive notes", () => {
  it("provides a substantive explanation before every section interaction", () => {
    for (const chapter of chapters) {
      expect(chapter.sections).toHaveLength(4);

      for (const section of chapter.sections) {
        expect(section.intro?.length, `${section.number} requires an explanation`).toBeGreaterThan(
          120,
        );
        expect(section.checks.length, `${section.number} requires Uji Diri`).toBeGreaterThan(0);
      }
    }
  });

  it("uses the requested Bab 10 interaction patterns", () => {
    expect(geographyF3C10Interactive.sections[1].flipCards).toHaveLength(4);
    expect(geographyF3C10Interactive.sections[2].zoneExplorer?.zones).toHaveLength(4);
    expect(geographyF3C10Interactive.sections[3].flipCardToggle?.groups).toHaveLength(2);
    expect(geographyF3C10Interactive.sections[3].flipCardToggle?.groups[0].items).toHaveLength(5);
    expect(geographyF3C10Interactive.sections[3].flipCardToggle?.groups[1].items).toHaveLength(5);
  });

  it("uses the requested Bab 11 interaction patterns", () => {
    expect(geographyF3C11Interactive.sections[0].flipCards).toHaveLength(3);
    expect(geographyF3C11Interactive.sections[1].flipCards).toHaveLength(5);
    expect(geographyF3C11Interactive.sections[3].zoneExplorer?.zones).toHaveLength(4);
  });

  it("does not introduce chapter imagery", () => {
    expect(JSON.stringify(chapters)).not.toContain("imagePath");
  });
});

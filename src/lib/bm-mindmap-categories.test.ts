import { describe, expect, it } from "vitest";
import {
  BAHASA_MELAYU_CATEGORY_DETAILS,
  getBahasaMelayuMindMapCategories,
} from "./bm-mindmap-categories";

describe("Bahasa Melayu mind-map categories", () => {
  it("adds Pemahaman only to Form 1 after the existing categories", () => {
    expect(getBahasaMelayuMindMapCategories("Form 1")).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
      "Pemahaman",
    ]);
  });

  it("shows Penulisan for Forms 2 and 3", () => {
    expect(getBahasaMelayuMindMapCategories("Form 2")).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
    ]);
    expect(getBahasaMelayuMindMapCategories("Form 3")).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
    ]);
  });

  it("provides the requested count-free READY identity for Pemahaman", () => {
    expect(BAHASA_MELAYU_CATEGORY_DETAILS.Pemahaman).toEqual({
      description:
        "Kemahiran memahami, menganalisis dan menjawab soalan berdasarkan petikan dengan tepat.",
      badge: "READY",
    });
    expect(JSON.stringify(BAHASA_MELAYU_CATEGORY_DETAILS.Pemahaman)).not.toMatch(/\d/);
  });
});

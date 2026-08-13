import { describe, expect, it } from "vitest";
import {
  BAHASA_MELAYU_CATEGORY_DETAILS,
  getBahasaMelayuMindMapCategories,
} from "./bm-mindmap-categories";

describe("Bahasa Melayu mind-map categories", () => {
  it.each(["Form 1", "Form 2", "Form 3"] as const)(
    "shows Pemahaman after the existing categories for %s",
    (form) => {
      expect(getBahasaMelayuMindMapCategories(form)).toEqual([
        "Tatabahasa",
        "Peribahasa",
        "Penulisan",
        "Pemahaman",
      ]);
    },
  );

  it("provides the requested count-free READY identity for Pemahaman", () => {
    expect(BAHASA_MELAYU_CATEGORY_DETAILS.Pemahaman).toEqual({
      description:
        "Kemahiran memahami, menganalisis dan menjawab soalan berdasarkan petikan dengan tepat.",
      badge: "READY",
    });
    expect(JSON.stringify(BAHASA_MELAYU_CATEGORY_DETAILS.Pemahaman)).not.toMatch(/\d/);
  });
});

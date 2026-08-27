import { describe, expect, it } from "vitest";
import {
  BAHASA_MELAYU_CATEGORY_DETAILS,
  getBahasaMelayuMindMapCategories,
} from "./bm-mindmap-categories";

describe("Bahasa Melayu mind-map categories", () => {
  it("adds KOMSAS only after the existing Form 1 categories", () => {
    expect(getBahasaMelayuMindMapCategories("Form 1")).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
      "Pemahaman",
      "KOMSAS",
    ]);
  });

  it.each(["Form 2", "Form 3"] as const)("keeps KOMSAS out of %s", (form) => {
    expect(getBahasaMelayuMindMapCategories(form)).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
      "Pemahaman",
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

  it("provides the requested count-free READY identity for KOMSAS", () => {
    expect(BAHASA_MELAYU_CATEGORY_DETAILS.KOMSAS).toEqual({
      description:
        "Memahami karya sastera melalui tema, persoalan, watak, nilai, pengajaran, gaya bahasa dan bukti daripada teks.",
      badge: "READY",
    });
    expect(JSON.stringify(BAHASA_MELAYU_CATEGORY_DETAILS.KOMSAS)).not.toMatch(/\d/);
  });
});

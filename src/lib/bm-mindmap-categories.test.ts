import { describe, expect, it } from "vitest";
import { getBahasaMelayuMindMapCategories } from "./bm-mindmap-categories";

describe("Bahasa Melayu mind-map categories", () => {
  it("shows Penulisan as the third Form 1 category", () => {
    expect(getBahasaMelayuMindMapCategories("Form 1")).toEqual([
      "Tatabahasa",
      "Peribahasa",
      "Penulisan",
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
});

import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { getBahasaMelayuMindMapCategories } from "@/lib/bm-mindmap-categories";
import { bahasaMelayuForm3StrategiMenjawabUasaMindMap } from "./strategi-menjawab-uasa-form3-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 3 Strategi Menjawab UASA mind map", () => {
  it("registers as the first Form 3 Penulisan topic", () => {
    const chapter = getChapter("bm", "Strategi Menjawab UASA", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-strategi-menjawab-uasa-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Strategi Menjawab UASA",
      title: "Strategi Menjawab UASA",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm3StrategiMenjawabUasaMindMap,
        title: "Strategi Menjawab UASA",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Strategi Menjawab UASA", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(["Strategi Menjawab UASA", "Analisis Kehendak Soalan", "Teknik Menjana Idea KBAT"]);
    expect(getBahasaMelayuMindMapCategories("Form 3")).toContain("Penulisan");
  });

  it("contains all twelve requested expandable sections", () => {
    expect(bahasaMelayuForm3StrategiMenjawabUasaMindMap).toMatchObject({
      id: "bm-f3-strategi-menjawab-uasa-root",
      label: "STRATEGI MENJAWAB UASA",
    });
    expect(
      bahasaMelayuForm3StrategiMenjawabUasaMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu UASA Penulisan?",
      "Format Penulisan UASA",
      "Memahami Arahan Soalan",
      "Pengurusan Masa",
      "Merancang Jawapan",
      "Strategi Menulis Pendahuluan",
      "Strategi Mengembangkan Isi",
      "Strategi Menulis Penutup",
      "Menyemak Jawapan Sebelum Menghantar",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field without quizzes or flashcards", () => {
    bahasaMelayuForm3StrategiMenjawabUasaMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Langkah-langkah");
      expect(labels).toContain("Contoh");
      expect(labels).toContain("Tip Peperiksaan");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("keeps every node unique and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm3StrategiMenjawabUasaMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3StrategiMenjawabUasaMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3StrategiMenjawabUasaMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3StrategiMenjawabUasaMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3StrategiMenjawabUasaMindMap, expanded),
    ).not.toThrow();
  });
});

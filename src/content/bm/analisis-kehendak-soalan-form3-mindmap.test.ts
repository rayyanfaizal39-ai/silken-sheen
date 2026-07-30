import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm3AnalisisKehendakSoalanMindMap } from "./analisis-kehendak-soalan-form3-mindmap";

const penulisanTopics = ["Strategi Menjawab UASA", "Analisis Kehendak Soalan"];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 3 Analisis Kehendak Soalan mind map", () => {
  it("registers as the second Form 3 Penulisan topic", () => {
    const chapter = getChapter("bm", "Analisis Kehendak Soalan", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-analisis-kehendak-soalan-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Analisis Kehendak Soalan",
      title: "Analisis Kehendak Soalan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm3AnalisisKehendakSoalanMindMap,
        title: "Analisis Kehendak Soalan",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Analisis Kehendak Soalan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(penulisanTopics);
  });

  it("contains all eleven requested expandable sections", () => {
    expect(bahasaMelayuForm3AnalisisKehendakSoalanMindMap).toMatchObject({
      id: "bm-f3-analisis-kehendak-soalan-root",
      label: "ANALISIS KEHENDAK SOALAN",
    });
    expect(
      bahasaMelayuForm3AnalisisKehendakSoalanMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Analisis Kehendak Soalan?",
      "Kepentingan Menganalisis Soalan",
      "Mengenal Pasti Kata Tugas",
      "Mengenal Pasti Kata Kunci",
      "Mengenal Pasti Tema",
      "Mengenal Pasti Format Penulisan",
      "Mentafsir Kehendak Soalan",
      "Merancang Jawapan Berdasarkan Soalan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides all required learning fields without quizzes or flashcards", () => {
    bahasaMelayuForm3AnalisisKehendakSoalanMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm3AnalisisKehendakSoalanMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3AnalisisKehendakSoalanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3AnalisisKehendakSoalanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3AnalisisKehendakSoalanMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3AnalisisKehendakSoalanMindMap, expanded),
    ).not.toThrow();
  });
});

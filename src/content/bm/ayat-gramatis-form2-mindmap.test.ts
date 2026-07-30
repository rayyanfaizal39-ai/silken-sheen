import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2AyatGramatisMindMap } from "./ayat-gramatis-form2-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 2 Ayat Gramatis mind map", () => {
  it("registers under Penulisan after Perbendaharaan Kata", () => {
    const chapter = getChapter("bm", "Ayat Gramatis", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-ayat-gramatis-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Ayat Gramatis",
      title: "Ayat Gramatis",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2AyatGramatisMindMap,
        title: "Ayat Gramatis",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Ayat Gramatis", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual([
      "Mengembangkan Isi Karangan",
      "Perbendaharaan Kata",
      "Ayat Gramatis",
      "Teknik Mengolah Idea",
      "Karangan Berpandukan Bahan",
      "Karangan Respons Terbuka",
    ]);
  });

  it("contains all ten requested expandable sections", () => {
    expect(bahasaMelayuForm2AyatGramatisMindMap).toMatchObject({
      id: "bm-f2-ayat-gramatis-root",
      label: "AYAT GRAMATIS",
    });
    expect(bahasaMelayuForm2AyatGramatisMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Ayat Gramatis?",
      "Kepentingan Ayat Gramatis",
      "Ciri-ciri Ayat Gramatis",
      "Ayat Mudah",
      "Ayat Majmuk",
      "Variasi Struktur Ayat",
      "Menggabungkan Ayat",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2AyatGramatisMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Langkah-langkah");
      expect(labels).toContain("Contoh");
      expect(labels).toContain("Tip Penulisan");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm2AyatGramatisMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm2AyatGramatisMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2AyatGramatisMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2AyatGramatisMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2AyatGramatisMindMap, expanded),
    ).not.toThrow();
  });
});

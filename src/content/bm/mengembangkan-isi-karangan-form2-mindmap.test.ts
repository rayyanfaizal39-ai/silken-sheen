import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { getBahasaMelayuMindMapCategories } from "@/lib/bm-mindmap-categories";
import { bahasaMelayuForm2MengembangkanIsiKaranganMindMap } from "./mengembangkan-isi-karangan-form2-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 2 Mengembangkan Isi Karangan mind map", () => {
  it("registers as the first Penulisan topic for Form 2", () => {
    const chapter = getChapter("bm", "Mengembangkan Isi Karangan", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-mengembangkan-isi-karangan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Mengembangkan Isi Karangan",
      title: "Mengembangkan Isi Karangan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2MengembangkanIsiKaranganMindMap,
        title: "Mengembangkan Isi Karangan",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Mengembangkan Isi Karangan", "mindMap")).toBe(true);
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
    expect(getBahasaMelayuMindMapCategories("Form 2")).toContain("Penulisan");
  });

  it("contains all ten requested expandable sections", () => {
    expect(bahasaMelayuForm2MengembangkanIsiKaranganMindMap).toMatchObject({
      id: "bm-f2-mengembangkan-isi-karangan-root",
      label: "MENGEMBANGKAN ISI KARANGAN",
    });
    expect(
      bahasaMelayuForm2MengembangkanIsiKaranganMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Pengembangan Isi?",
      "Kepentingan Mengembangkan Isi",
      "Teknik 5W1H",
      "Memberi Huraian",
      "Memberi Contoh",
      "Menjelaskan Kesan",
      "Memberi Cadangan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2MengembangkanIsiKaranganMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm2MengembangkanIsiKaranganMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2MengembangkanIsiKaranganMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2MengembangkanIsiKaranganMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2MengembangkanIsiKaranganMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2MengembangkanIsiKaranganMindMap, expanded),
    ).not.toThrow();
  });
});

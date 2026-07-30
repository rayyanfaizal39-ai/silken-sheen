import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1MembinaPerengganMindMap } from "./membina-perenggan-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Membina Perenggan mind map", () => {
  it("registers after Asas Penulisan under the third category", () => {
    const chapter = getChapter("bm", "Membina Perenggan", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-membina-perenggan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Membina Perenggan",
      title: "Membina Perenggan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1MembinaPerengganMindMap,
        title: "Membina Perenggan",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Membina Perenggan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 1")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual([
      "Asas Penulisan",
      "Membina Perenggan",
      "Pendahuluan",
      "Penutup",
      "Penanda Wacana",
      "Karangan Berpandukan Gambar",
      "Karangan Respons Terbuka",
    ]);
  });

  it("contains all nine requested expandable sections", () => {
    expect(bahasaMelayuForm1MembinaPerengganMindMap).toMatchObject({
      id: "bm-f1-membina-perenggan-root",
      label: "MEMBINA PERENGGAN",
    });
    expect(bahasaMelayuForm1MembinaPerengganMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Perenggan?",
      "Struktur Perenggan",
      "Ayat Topik",
      "Ayat Huraian",
      "Ayat Contoh",
      "Ayat Penegas",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides the required learning fields for every section", () => {
    bahasaMelayuForm1MembinaPerengganMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1MembinaPerengganMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm1MembinaPerengganMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1MembinaPerengganMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm1MembinaPerengganMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1MembinaPerengganMindMap, expanded),
    ).not.toThrow();
  });
});

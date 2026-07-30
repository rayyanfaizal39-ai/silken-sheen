import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1PenutupMindMap } from "./penutup-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Penutup mind map", () => {
  it("registers Penutup after Pendahuluan under Penulisan", () => {
    const chapter = getChapter("bm", "Penutup", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-penutup-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Penutup",
      title: "Penutup",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1PenutupMindMap,
        title: "Penutup",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Penutup", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 1")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(["Asas Penulisan", "Membina Perenggan", "Pendahuluan", "Penutup"]);
  });

  it("contains all eight requested expandable sections", () => {
    expect(bahasaMelayuForm1PenutupMindMap).toMatchObject({
      id: "bm-f1-penutup-root",
      label: "PENUTUP",
    });
    expect(bahasaMelayuForm1PenutupMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Penutup?",
      "Tujuan Penutup",
      "Ciri-ciri Penutup yang Baik",
      "Cara Menulis Penutup",
      "Jenis Penutup",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm1PenutupMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1PenutupMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm1PenutupMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1PenutupMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm1PenutupMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() => calculateMindMapLayout(bahasaMelayuForm1PenutupMindMap, expanded)).not.toThrow();
  });
});

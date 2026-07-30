import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1PendahuluanMindMap } from "./pendahuluan-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Pendahuluan mind map", () => {
  it("registers Pendahuluan under Penulisan for Form 1", () => {
    const chapter = getChapter("bm", "Pendahuluan", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-pendahuluan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Pendahuluan",
      title: "Pendahuluan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1PendahuluanMindMap,
        title: "Pendahuluan",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Pendahuluan", "mindMap")).toBe(true);
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
    expect(bahasaMelayuForm1PendahuluanMindMap).toMatchObject({
      id: "bm-f1-pendahuluan-root",
      label: "PENDAHULUAN",
    });
    expect(bahasaMelayuForm1PendahuluanMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Pendahuluan?",
      "Tujuan Pendahuluan",
      "Ciri-ciri Pendahuluan yang Baik",
      "Jenis Pendahuluan",
      "Cara Menulis Pendahuluan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm1PendahuluanMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1PendahuluanMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm1PendahuluanMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1PendahuluanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm1PendahuluanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1PendahuluanMindMap, expanded),
    ).not.toThrow();
  });
});

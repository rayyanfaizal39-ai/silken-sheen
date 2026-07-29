import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1AsasPenulisanMindMap } from "./asas-penulisan-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function findBranch(label: string) {
  return bahasaMelayuForm1AsasPenulisanMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 1 Asas Penulisan mind map", () => {
  it("registers Asas Penulisan under Penulisan for Form 1", () => {
    const chapter = getChapter("bm", "Asas Penulisan", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-asas-penulisan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Asas Penulisan",
      title: "Asas Penulisan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1AsasPenulisanMindMap,
        title: "Asas Penulisan",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Asas Penulisan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 1")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toContain("Asas Penulisan");

    expect([
      ...new Set(
        getRegisteredSubjectChapters("bm", undefined, "Form 1")
          .map((topic) => topic.categoryLabel)
          .filter((category): category is string => Boolean(category)),
      ),
    ]).toEqual(["Tatabahasa", "Peribahasa", "Penulisan"]);
  });

  it("contains every requested learning branch", () => {
    expect(bahasaMelayuForm1AsasPenulisanMindMap).toMatchObject({
      id: "bm-f1-asas-penulisan-root",
      label: "ASAS PENULISAN",
    });
    expect(bahasaMelayuForm1AsasPenulisanMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Penulisan?",
      "Tujuan Penulisan",
      "Ciri-ciri Penulisan yang Baik",
      "Langkah Sebelum Menulis",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("includes the source-backed writing and review techniques", () => {
    const beforeWriting = findBranch("Langkah Sebelum Menulis");
    const remembering = findBranch("Teknik Mengingat");

    expect(beforeWriting?.children?.map((item) => item.label)).toContain(
      "7. Rancang Isi dengan IMBAK",
    );
    expect(remembering?.children?.map((item) => item.label)).toEqual([
      "FAHAM → RANGKA → TULIS → SEMAK",
      "IMBAK",
      "I-B-S",
      "Fungsi Bahagian",
    ]);
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm1AsasPenulisanMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm1AsasPenulisanMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1AsasPenulisanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm1AsasPenulisanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1AsasPenulisanMindMap, expanded),
    ).not.toThrow();
  });
});

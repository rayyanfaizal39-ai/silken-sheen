import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm3KataHikmatMindMap } from "./kata-hikmat-form3-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function findBranch(label: string) {
  return bahasaMelayuForm3KataHikmatMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 3 Kata Hikmat mind map", () => {
  it("registers Kata Hikmat after Pepatah and Bidalan under Peribahasa", () => {
    const chapter = getChapter("bm", "Kata Hikmat", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-kata-hikmat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Kata Hikmat",
      title: "Kata Hikmat",
      categoryLabel: "Peribahasa",
      mindMap: {
        data: bahasaMelayuForm3KataHikmatMindMap,
        title: "Kata Hikmat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Kata Hikmat", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Peribahasa")
        .map((topic) => topic.key),
    ).toEqual(["Pepatah", "Bidalan", "Kata Hikmat"]);
  });

  it("contains every required expandable learning branch", () => {
    expect(bahasaMelayuForm3KataHikmatMindMap).toMatchObject({
      id: "bm-f3-kata-hikmat-root",
      label: "KATA HIKMAT",
    });
    expect(bahasaMelayuForm3KataHikmatMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Kata Hikmat?",
      "Ciri-ciri",
      "Cara Mengenal Pasti",
      "Senarai Kata Hikmat",
      "Perbandingan Kategori",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("includes the one explicitly sourced kata hikmat with all requested fields", () => {
    const list = findBranch("Senarai Kata Hikmat");

    expect(list?.children?.map((item) => item.label)).toEqual([
      "Ilmu itu penyuluh kehidupan",
    ]);
    expect(list?.children?.[0]?.children?.map((item) => item.label)).toEqual([
      "Maksud",
      "Huraian Ringkas",
      "Contoh Ayat",
      "Situasi Penggunaan",
      "Kesalahan Lazim",
      "Kata Hikmat Berkaitan",
    ]);
    list?.children?.[0]?.children?.forEach((detail) => {
      expect(detail.summary?.trim().length).toBeGreaterThan(0);
    });
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm3KataHikmatMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm3KataHikmatMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3KataHikmatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm3KataHikmatMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3KataHikmatMindMap, expanded),
    ).not.toThrow();
  });
});

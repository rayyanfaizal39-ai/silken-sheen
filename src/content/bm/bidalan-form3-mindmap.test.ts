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
import { bahasaMelayuForm3BidalanMindMap } from "./bidalan-form3-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function findBranch(label: string) {
  return bahasaMelayuForm3BidalanMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 3 Bidalan mind map", () => {
  it("registers Bidalan under the Form 3 Peribahasa category", () => {
    const chapter = getChapter("bm", "Bidalan", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-bidalan-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Bidalan",
      title: "Bidalan",
      categoryLabel: "Peribahasa",
      mindMap: {
        data: bahasaMelayuForm3BidalanMindMap,
        title: "Bidalan",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Bidalan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Peribahasa")
        .map((topic) => topic.key),
    ).toEqual(["Pepatah", "Bidalan", "Kata Hikmat"]);
  });

  it("contains the required concept, classification and UASA branches", () => {
    expect(bahasaMelayuForm3BidalanMindMap).toMatchObject({
      id: "bm-f3-bidalan-root",
      label: "BIDALAN",
    });
    expect(bahasaMelayuForm3BidalanMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Bidalan?",
      "Ciri-ciri",
      "Cara Mengenal Pasti",
      "Senarai Bidalan",
      "Batas Klasifikasi",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("includes all nine sourced bidalan with complete expandable learning fields", () => {
    const list = findBranch("Senarai Bidalan");

    expect(list?.children?.map((item) => item.label)).toEqual([
      "Alah bisa tegal biasa",
      "Bapa borek anak rintik",
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya",
      "Genggam bara api biar sampai jadi arang",
      "Belakang parang pun kalau diasah nescaya tajam",
      "Di mana ada kemahuan, di situ ada jalan",
      "Sediakan payung sebelum hujan",
      "Beringat sebelum kena",
      "Tak ada beban, batu digalas",
    ]);

    list?.children?.forEach((entry) => {
      expect(entry.children?.map((item) => item.label)).toEqual([
        "Maksud",
        "Huraian Ringkas",
        "Contoh Ayat",
        "Situasi Penggunaan",
        "Kesalahan Lazim",
        "Bidalan Berkaitan",
      ]);
      entry.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm3BidalanMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm3BidalanMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3BidalanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm3BidalanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3BidalanMindMap, expanded),
    ).not.toThrow();
  });
});

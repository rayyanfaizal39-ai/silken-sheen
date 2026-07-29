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
import { bahasaMelayuForm3PepatahMindMap } from "./pepatah-form3-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function findBranch(label: string) {
  return bahasaMelayuForm3PepatahMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 3 Pepatah mind map", () => {
  it("registers Pepatah under the Form 3 Peribahasa category", () => {
    const chapter = getChapter("bm", "Pepatah", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-pepatah-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Pepatah",
      title: "Pepatah",
      categoryLabel: "Peribahasa",
      mindMap: {
        data: bahasaMelayuForm3PepatahMindMap,
        title: "Pepatah",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Pepatah", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Peribahasa")
        .map((topic) => topic.key),
    ).toContain("Pepatah");
  });

  it("contains the required concept and exam-technique branches", () => {
    expect(bahasaMelayuForm3PepatahMindMap).toMatchObject({
      id: "bm-f3-pepatah-root",
      label: "PEPATAH",
    });
    expect(bahasaMelayuForm3PepatahMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Pepatah?",
      "Ciri-ciri",
      "Cara Mengenal Pasti",
      "Senarai Pepatah",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("includes all 12 sourced pepatah with complete expandable learning fields", () => {
    const list = findBranch("Senarai Pepatah");

    expect(list?.children?.map((item) => item.label)).toEqual([
      "Alah bisa tegal biasa",
      "Bapa borek anak rintik",
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya",
      "Genggam bara api biar sampai jadi arang",
      "Diam-diam ubi berisi",
      "Belakang parang pun kalau diasah nescaya tajam",
      "Di mana ada kemahuan, di situ ada jalan",
      "Bagaimana acuan, begitulah kuihnya",
      "Sediakan payung sebelum hujan",
      "Beringat sebelum kena",
      "Berat sama dipikul, ringan sama dijinjing",
      "Tak ada beban, batu digalas",
    ]);

    list?.children?.forEach((entry) => {
      const labels = entry.children?.map((item) => item.label);
      expect(labels).toEqual([
        "Maksud",
        "Huraian Ringkas",
        "Contoh Ayat",
        "Situasi Penggunaan",
        "Kesalahan Lazim",
        "Pepatah Berkaitan",
      ]);
      entry.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("has unique node IDs and remains compatible with progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm3PepatahMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm3PepatahMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3PepatahMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm3PepatahMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3PepatahMindMap, expanded),
    ).not.toThrow();
  });
});

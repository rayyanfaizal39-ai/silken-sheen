import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  MindMap,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuTingkatan1IsiTersuratMindMap } from "./mengenal-pasti-isi-tersurat-form1-mindmap";
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedBranches = [
  "Apa Itu?",
  "Ciri-ciri",
  "Kata Kunci",
  "Cari dalam Petikan",
  "Bukti Langsung",
  "Soalan “Siapa”",
  "Soalan “Apa”",
  "Soalan “Bila”",
  "Soalan “Di Mana”",
  "Soalan “Mengapa”",
  "Soalan “Bagaimana”",
  "Bina Jawapan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const branch = bahasaMelayuTingkatan1IsiTersuratMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!branch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(branch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Mengenal Pasti Isi Tersurat mind map", () => {
  it("remains the second of exactly seven registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(7);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Mengenal Pasti Isi Tersurat",
      "Mengenal Pasti Isi Tersirat",
      "Maksud Frasa dan Ungkapan",
      "Menjawab Soalan KBAT",
      "Membuat Rumusan Ringkas",
      "Teknik Menggunakan Bukti daripada Petikan",
    ]);

    const chapter = getChapter("bm", "Mengenal Pasti Isi Tersurat", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-mengenal-pasti-isi-tersurat-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Mengenal Pasti Isi Tersurat",
      title: "Mengenal Pasti Isi Tersurat",
      description:
        "Mencari maklumat yang dinyatakan secara langsung dalam petikan dan membina jawapan yang tepat berdasarkan bukti.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1IsiTersuratMindMap,
        title: "Mengenal Pasti Isi Tersurat",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Mengenal Pasti Isi Tersurat", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersurat",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Strategi Menjawab Soalan Pemahaman");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Mengenal Pasti Isi Tersirat");

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersurat",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Strategi Menjawab Soalan Pemahaman");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Mengenal Pasti Isi Tersirat");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1IsiTersuratMindMap).toMatchObject({
      id: "bm-f1-mengenal-pasti-isi-tersurat-root",
      label: "ISI TERSURAT",
      summary:
        "Isi tersurat ialah maklumat yang dinyatakan secara jelas dalam petikan dan boleh dikenal pasti melalui kata kunci serta bukti langsung.",
    });
    expect(
      bahasaMelayuTingkatan1IsiTersuratMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1IsiTersuratMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes explicit information, inference, evidence and careful paraphrasing", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1IsiTersuratMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Ciri-ciri")).toContain("Tidak Memerlukan Inferens");
    expect(branchText("Kata Kunci")).toContain("perkataan seerti");
    expect(branchText("Cari dalam Petikan")).toContain("satu ayat sebelum dan selepasnya");
    expect(branchText("Bukti Langsung")).toContain("Bukti mesti berasal daripada petikan");
    expect(branchText("Bina Jawapan")).toContain("tanpa mengubah maksud");
    expect(branchText("Bina Jawapan")).toContain("maklumat baharu");
    expect(branchText("Kesalahan Lazim")).toContain("seluruh perenggan");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it.each([
    ["Soalan “Siapa”", "orang atau kumpulan"],
    ["Soalan “Apa”", "aktiviti, objek, peristiwa"],
    ["Soalan “Bila”", "maklumat masa"],
    ["Soalan “Di Mana”", "lokasi atau tempat"],
    ["Soalan “Mengapa”", "sebab atau punca"],
    ["Soalan “Bagaimana”", "kaedah, proses, tindakan"],
  ])("explains %s accurately", (label, expectedFocus) => {
    expect(branchText(label)).toContain(expectedFocus);
    expect(branchText(label)).toContain("Jawapan");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1IsiTersuratMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1IsiTersuratMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1IsiTersuratMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1IsiTersuratMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan1IsiTersuratMindMap, expanded);
    expect(layout.positions.size).toBe(nodes.length);

    const positions = Array.from(layout.positions.entries());
    for (let firstIndex = 0; firstIndex < positions.length; firstIndex += 1) {
      const [firstId, first] = positions[firstIndex];
      for (let secondIndex = firstIndex + 1; secondIndex < positions.length; secondIndex += 1) {
        const [secondId, second] = positions[secondIndex];
        const overlaps =
          first.x < second.x + second.w &&
          first.x + first.w > second.x &&
          first.y - first.h / 2 < second.y + second.h / 2 &&
          first.y + first.h / 2 > second.y - second.h / 2;
        expect(overlaps, `${firstId} overlaps ${secondId}`).toBe(false);
      }
    }
  });

  it("renders a collapsed mobile learning path without horizontal overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1IsiTersuratMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("ISI TERSURAT");
    expect(markup).toContain("Soalan “Bagaimana”");
    expect(markup).not.toContain("menyapu lantai dan mengelap tingkap");
  });
});

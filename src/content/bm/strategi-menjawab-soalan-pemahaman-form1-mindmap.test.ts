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
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";
import { bahasaMelayuTingkatan1StrategiPemahamanMindMap } from "./strategi-menjawab-soalan-pemahaman-form1-mindmap";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedBranches = [
  "Apa Itu Pemahaman?",
  "Jenis Petikan",
  "Sebelum Membaca",
  "Cara Membaca Petikan",
  "Kehendak Soalan",
  "Kata Kunci",
  "Cari Jawapan",
  "Bina Jawapan",
  "Bukti Petikan",
  "Bahasa Sendiri",
  "Semak Jawapan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const branch = bahasaMelayuTingkatan1StrategiPemahamanMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!branch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(branch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Strategi Menjawab Soalan Pemahaman mind map", () => {
  it("remains the first of exactly two registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(2);
    expect(bahasaMelayuTingkatan1PemahamanRegistry[0]?.chapterKey).toBe(
      "Strategi Menjawab Soalan Pemahaman",
    );
    const chapter = getChapter("bm", "Strategi Menjawab Soalan Pemahaman", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-strategi-menjawab-soalan-pemahaman-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Strategi Menjawab Soalan Pemahaman",
      title: "Strategi Menjawab Soalan Pemahaman",
      description:
        "Langkah membaca petikan, mengenal pasti kehendak soalan dan membina jawapan yang tepat berdasarkan bukti.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1StrategiPemahamanMindMap,
        title: "Strategi Menjawab Soalan Pemahaman",
      },
    });
    expect(
      hasResourceContent("bm", "Form 1", "Strategi Menjawab Soalan Pemahaman", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    expect(pemahamanTopics.map((topic) => topic.key)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Mengenal Pasti Isi Tersurat",
    ]);
    expect(pemahamanTopics).toHaveLength(2);

    const pemahamanIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Strategi Menjawab Soalan Pemahaman",
    );
    expect(pemahamanTopics[pemahamanIndex - 1]).toBeUndefined();
    expect(pemahamanTopics[pemahamanIndex + 1]?.key).toBe("Mengenal Pasti Isi Tersurat");

    const activeIndex = formTopics.findIndex(
      (topic) => topic.key === "Strategi Menjawab Soalan Pemahaman",
    );
    expect(formTopics[activeIndex - 1]?.categoryLabel).not.toBe("Pemahaman");
    expect(formTopics[activeIndex + 1]?.key).toBe("Mengenal Pasti Isi Tersurat");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1StrategiPemahamanMindMap).toMatchObject({
      id: "bm-f1-strategi-menjawab-soalan-pemahaman-root",
      label: "STRATEGI PEMAHAMAN",
      summary:
        "Strategi menjawab soalan pemahaman membantu murid membaca petikan secara terarah, memahami kehendak soalan dan membina jawapan yang tepat, lengkap serta gramatis.",
    });
    expect(
      bahasaMelayuTingkatan1StrategiPemahamanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1StrategiPemahamanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the required comprehension distinctions without unsafe shortcuts", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1StrategiPemahamanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Jenis Petikan")).toContain("Petikan Bukan Sastera");
    expect(branchText("Jenis Petikan")).toContain("Petikan Sastera");
    expect(branchText("Kehendak Soalan")).toContain("Maklumat Tersurat");
    expect(branchText("Kehendak Soalan")).toContain("Maklumat Tersirat");
    expect(branchText("Kehendak Soalan")).toContain("Pendapat");
    expect(branchText("Kata Kunci")).toContain("sinonim");
    expect(branchText("Bukti Petikan")).toContain("bukan seluruh perenggan");
    expect(branchText("Bahasa Sendiri")).toContain("Jangan Ubah Fakta");
    expect(branchText("Kesalahan Lazim")).toContain("Amir bersenam untuk menjaga kesihatan");
    expect(branchText("Teknik Mengingat")).toContain("Rumus BACA");
    expect(branchText("Teknik Mengingat")).toContain("Rumus SEMAK");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1StrategiPemahamanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1StrategiPemahamanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1StrategiPemahamanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1StrategiPemahamanMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuTingkatan1StrategiPemahamanMindMap, expanded),
    ).not.toThrow();
  });

  it("renders a collapsed mobile learning path without overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1StrategiPemahamanMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("STRATEGI PEMAHAMAN");
    expect(markup).toContain("Bahasa Sendiri");
    expect(markup).not.toContain("Amalan membaca dapat membantu murid menambah ilmu");
  });
});

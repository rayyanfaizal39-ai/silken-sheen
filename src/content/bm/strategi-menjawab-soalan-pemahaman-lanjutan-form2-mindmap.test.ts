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
import { bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap } from "./strategi-menjawab-soalan-pemahaman-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Analisis Soalan",
  "Kenal Pasti Kata Kunci",
  "Analisis Petikan",
  "Hubungan Idea",
  "Gunakan Bukti",
  "Jawapan KBAT",
  "Pengurusan Masa",
  "Semakan Akhir",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Strategi Pemahaman Lanjutan mind map", () => {
  it("is the only registered Form 2 Pemahaman topic", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(1);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
    ]);

    const chapter = getChapter(
      "bm",
      "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
      undefined,
      "Form 2",
    );
    expect(chapter).toMatchObject({
      id: "bm-f2-strategi-menjawab-soalan-pemahaman-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
      title: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
      description:
        "Menguasai strategi menjawab petikan yang lebih mencabar melalui analisis, inferens dan penggunaan bukti.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap,
        title: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
      },
    });
    expect(
      hasResourceContent(
        "bm",
        "Form 2",
        "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
        "mindMap",
      ),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("has disabled previous and next category navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
    );
    expect(activeIndex).toBe(0);
    expect(topics[activeIndex - 1]).toBeUndefined();
    expect(topics[activeIndex + 1]).toBeUndefined();
  });

  it("uses the exact root and title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap).toMatchObject({
      id: "bm-f2-strategi-menjawab-soalan-pemahaman-lanjutan-root",
      label: "STRATEGI PEMAHAMAN T2",
      summary:
        "Pemahaman Tingkatan 2 memerlukan murid menganalisis petikan dengan lebih mendalam, menghubungkan idea serta memberikan jawapan yang disokong oleh bukti yang tepat.",
    });
    expect(
      bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap.children?.map(
        (branch) => branch.label,
      ),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches deeper inference and connections across multiple paragraphs", () => {
    expect(branchText("Analisis Petikan")).toContain("Contoh Pendidikan Dua Perenggan");
    expect(branchText("Analisis Petikan")).toContain("tujuan penulis");
    expect(branchText("Hubungan Idea")).toContain("Contoh Alam Sekitar Dua Perenggan");
    expect(branchText("Hubungan Idea")).toContain("Sintesis Rentas Perenggan");
    expect(branchText("Gunakan Bukti")).toContain("gabungkan petunjuk daripada dua perenggan");
  });

  it("uses the five required contexts with advanced examples", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(allText).toContain("Pendidikan");
    expect(allText).toContain("Alam Sekitar");
    expect(allText).toContain("Kesihatan");
    expect(allText).toContain("Teknologi");
    expect(allText).toContain("Komuniti");
  });

  it("builds reasoned KBAT answers from ideas, evidence and effects", () => {
    const text = branchText("Jawapan KBAT");
    expect(text).toContain("Idea–Alasan–Bukti–Kesan");
    expect(text).toContain("Pertimbangan Seimbang");
    expect(text).toContain("literasi digital");
    expect(text).toContain("program bimbingan digital antara generasi");
  });

  it("covers strategic review, errors, memory and UASA guidance", () => {
    expect(branchText("Semakan Akhir")).toContain("Hubungan Logik");
    expect(branchText("Kesalahan Lazim")).toContain("Inferens Tanpa Petunjuk");
    expect(branchText("Teknik Mengingat")).toContain("Rumus JEJAK");
    expect(branchText("Tip UASA")).toContain("Gunakan Dua Bacaan Bertujuan");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(
      bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap,
    );
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap, expanded),
    ).toHaveLength(nodes.length);

    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap,
      expanded,
    );
    const positions = Array.from(layout.positions.entries());
    expect(positions).toHaveLength(nodes.length);
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

  it("renders an accessible collapsed mobile path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("STRATEGI PEMAHAMAN T2");
    expect(markup).toContain("Hubungan Idea");
    expect(markup).not.toContain("Sintesis Rentas Perenggan");
  });
});

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
import { bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap } from "./menjawab-soalan-kbat-form1-mindmap";
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman",
  "Mengenal Pasti Isi Tersurat",
  "Mengenal Pasti Isi Tersirat",
  "Maksud Frasa dan Ungkapan",
  "Menjawab Soalan KBAT",
  "Membuat Rumusan Ringkas",
];

const expectedBranches = [
  "Apa Itu KBAT?",
  "Jenis Soalan",
  "Memberi Pendapat",
  "Memberi Alasan",
  "Memberi Cadangan",
  "Menghubung Kait",
  "Menyokong Jawapan",
  "Formula Jawapan",
  "Contoh KBAT",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selectedBranch = bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!selectedBranch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selectedBranch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Menjawab Soalan KBAT mind map", () => {
  it("remains the fifth of exactly six registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(6);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Menjawab Soalan KBAT", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-menjawab-soalan-kbat-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Menjawab Soalan KBAT",
      title: "Menjawab Soalan KBAT",
      description:
        "Belajar memberikan pendapat, alasan dan cadangan yang logik berdasarkan situasi dalam petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap,
        title: "Menjawab Soalan KBAT",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Menjawab Soalan KBAT", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex((topic) => topic.key === "Menjawab Soalan KBAT");
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Maksud Frasa dan Ungkapan");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Membuat Rumusan Ringkas");

    const formActiveIndex = formTopics.findIndex((topic) => topic.key === "Menjawab Soalan KBAT");
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Maksud Frasa dan Ungkapan");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Membuat Rumusan Ringkas");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap).toMatchObject({
      id: "bm-f1-menjawab-soalan-kbat-root",
      label: "SOALAN KBAT",
      summary:
        "Soalan KBAT memerlukan murid berfikir secara kritis, memberikan pendapat yang logik serta menyokong jawapan dengan alasan yang munasabah.",
    });
    expect(
      bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the required KBAT reasoning and question types", () => {
    expect(branchText("Apa Itu KBAT?")).toContain("membuat analisis");
    expect(branchText("Apa Itu KBAT?")).toContain("Membuat Kesimpulan");
    expect(branchText("Jenis Soalan")).toContain("Pada Pendapat Anda");
    expect(branchText("Jenis Soalan")).toContain("Apakah Tindakan yang Wajar");
    expect(branchText("Jenis Soalan")).toContain("Ramalkan");
    expect(branchText("Memberi Pendapat")).toContain("Logik");
    expect(branchText("Memberi Pendapat")).toContain("Berdasarkan Situasi");
  });

  it("supports opinions with reasons, examples and effects", () => {
    expect(branchText("Memberi Alasan")).toContain("Pendapat Perlu Sokongan");
    expect(branchText("Memberi Alasan")).toContain("Kerana");
    expect(branchText("Menyokong Jawapan")).toContain("“Saya setuju.”");
    expect(branchText("Menyokong Jawapan")).toContain("sebab, contoh atau kesan");
    expect(branchText("Formula Jawapan")).toContain("Pendapat + Alasan");
    expect(branchText("Formula Jawapan")).toContain("Pendapat + Alasan + Contoh");
    expect(branchText("Formula Jawapan")).toContain("Pendapat + Alasan + Kesan");
  });

  it("keeps suggestions practical and passage links evidence-based", () => {
    expect(branchText("Memberi Cadangan")).toContain("Cadangan Praktikal");
    expect(branchText("Memberi Cadangan")).toContain("Elakkan Cadangan Tidak Realistik");
    expect(branchText("Menghubung Kait")).toContain("Petikan");
    expect(branchText("Menghubung Kait")).toContain("Pengalaman");
    expect(branchText("Menghubung Kait")).toContain("tidak mengubah");
  });

  it.each(["Pendidikan", "Kebersihan", "Teknologi", "Alam Sekitar", "Persahabatan"])(
    "provides a complete %s KBAT example",
    (topic) => {
      const examplesBranch = bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap.children?.find(
        (node) => node.label === "Contoh KBAT",
      );
      const example = examplesBranch?.children?.find((node) => node.label === topic);
      expect(example?.children?.map((node) => node.label)).toEqual([
        "Soalan",
        "Jawapan Contoh",
        "Mengapa Jawapan Kuat?",
      ]);
    },
  );

  it("covers common errors and avoids unsafe scoring shortcuts", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Kesalahan Lazim")).toContain("Hanya Memberi Pendapat");
    expect(branchText("Kesalahan Lazim")).toContain("Alasan Tidak Logik");
    expect(branchText("Kesalahan Lazim")).toContain("Mengubah Fakta Petikan");
    expect(branchText("Kesalahan Lazim")).toContain("Bahasa Tidak Gramatis");
    expect(branchText("Teknik Mengingat")).toContain("Rumus PAK");
    expect(branchText("Teknik Mengingat")).toContain("K — Kesan atau Contoh");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap,
      expanded,
    );
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
        data: bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("SOALAN KBAT");
    expect(markup).toContain("Formula Jawapan");
    expect(markup).not.toContain("Murid boleh menyediakan jadual belajar");
  });
});

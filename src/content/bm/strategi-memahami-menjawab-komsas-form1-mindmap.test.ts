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
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";
import { bahasaMelayuTingkatan1StrategiKomsasMindMap } from "./strategi-memahami-menjawab-komsas-form1-mindmap";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Strategi Memahami dan Menjawab KOMSAS";
const expectedBranches = [
  "Apa Itu KOMSAS?",
  "Jenis Karya",
  "Tema",
  "Persoalan",
  "Watak & Perwatakan",
  "Latar",
  "Plot",
  "Nilai",
  "Pengajaran",
  "Gaya Bahasa",
  "Bukti Teks",
  "Bina Jawapan",
  "Bezakan Konsep",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1StrategiKomsasMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Strategi Memahami dan Menjawab KOMSAS mind map", () => {
  it("registers the strategy first in the interactive Form 1 KOMSAS registry", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry).toHaveLength(7);
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      title,
      "Asal Padi",
      "Oren",
      "Aku",
      "Kunci Bahasa",
      "Hadiah",
      "Kuih Bakul Limau Mandarin",
    ]);

    const chapter = getChapter("bm", title, undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-strategi-memahami-menjawab-komsas-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Pelajari cara menganalisis karya sastera, mencari bukti dan membina jawapan KOMSAS yang tepat serta gramatis.",
      categoryLabel: "KOMSAS",
      mindMap: {
        data: bahasaMelayuTingkatan1StrategiKomsasMindMap,
        title,
      },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps KOMSAS isolated to Form 1 with disabled previous and next navigation", () => {
    const form1Topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = form1Topics.findIndex((topic) => topic.key === title);
    expect(form1Topics).toHaveLength(7);
    expect(form1Topics[index - 1]).toBeUndefined();
    expect(form1Topics[index + 1]?.key).toBe("Asal Padi");
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1StrategiKomsasMindMap).toMatchObject({
      id: "bm-f1-strategi-memahami-menjawab-komsas-root",
      label: "STRATEGI KOMSAS",
      summary:
        "KOMSAS membantu murid memahami karya sastera melalui tema, persoalan, watak, perwatakan, latar, plot, nilai, pengajaran, gaya bahasa dan bukti daripada teks.",
    });
    expect(bahasaMelayuTingkatan1StrategiKomsasMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1StrategiKomsasMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the required foundational concepts and distinctions accurately", () => {
    expect(branchText("Apa Itu KOMSAS?")).toContain("KONSEP + PERISTIWA + BUKTI");
    expect(branchText("Jenis Karya")).toContain("Prosa Tradisional");
    expect(branchText("Tema")).toContain("keseluruhan karya");
    expect(branchText("Persoalan")).toContain("idea sampingan");
    expect(branchText("Watak & Perwatakan")).toContain("PERWATAKAN + BUKTI PERISTIWA");
    expect(branchText("Latar")).toContain("bukan lokasi fizikal");
    expect(branchText("Plot")).toContain("Panduan, Bukan Formula");
    expect(branchText("Nilai")).toContain("Jangan memilih nilai hanya kerana");
    expect(branchText("Pengajaran")).toContain("NILAI ialah sifat atau amalan");
    expect(branchText("Gaya Bahasa")).toContain("tanpa sokongan perkataan dalam teks");
    expect(branchText("Bukti Teks")).toContain("Jangan ceritakan semula keseluruhan karya");
  });

  it("provides flexible answer scaffolds and direct concept comparisons", () => {
    expect(branchText("Bina Jawapan")).toContain("Watak ______ seorang yang ______ kerana ______");
    expect(branchText("Bina Jawapan")).toContain("bukan format peperiksaan tetap");
    expect(branchText("Bezakan Konsep")).toContain("Tema vs Persoalan");
    expect(branchText("Bezakan Konsep")).toContain("Watak vs Perwatakan");
    expect(branchText("Bezakan Konsep")).toContain("Nilai vs Pengajaran");
    expect(branchText("Bezakan Konsep")).toContain("Latar Tempat vs Latar Masyarakat");
    expect(branchText("Bezakan Konsep")).toContain("Plot vs Peristiwa");
    expect(branchText("Kesalahan Lazim")).toContain("Gaya Bahasa Direka");
    expect(branchText("Kesalahan Lazim")).toContain("Fakta Diubah");
  });

  it("includes the complete clearly labelled generic practice example", () => {
    const uasa = branchText("Tip UASA");
    expect(uasa).toContain("K-B-B");
    expect(uasa).toContain("WATAK ≠ PERWATAKAN");
    expect(uasa).toContain("CONTOH LATIHAN — BUKAN TEKS RASMI");
    expect(uasa).toContain("Hana membantu ibunya menyediakan kuih");
    expect(uasa).toContain("Hana seorang yang bertanggungjawab");
    expect(uasa).toContain("Nilai tanggungjawab");
    expect(uasa).toContain("Kita hendaklah melaksanakan tanggungjawab");
    expect(uasa).toContain("Persoalan tanggungjawab seorang anak terhadap keluarga");
  });

  it("does not introduce curriculum work titles or unsupported scoring rules", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1StrategiKomsasMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toMatch(/pengarang|novel bertajuk|cerpen bertajuk|drama bertajuk/i);
    expect(allText).not.toMatch(/\b\d+\s+(?:markah|minit|ayat)\b/i);
    expect(allText).not.toContain("dijamin");
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1StrategiKomsasMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1StrategiKomsasMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1StrategiKomsasMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1StrategiKomsasMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan1StrategiKomsasMindMap,
        expanded,
      ).positions.values(),
    );
    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first];
        const b = positions[second];
        expect(
          a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y - a.h / 2 < b.y + b.h / 2 &&
            a.y + a.h / 2 > b.y - b.h / 2,
        ).toBe(false);
      }
    }
  });

  it("renders an accessible collapsed mobile path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1StrategiKomsasMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("STRATEGI KOMSAS");
    expect(markup).toContain("Watak &amp; Perwatakan");
    expect(markup).not.toContain("Individu yang terlibat dalam karya");
  });
});

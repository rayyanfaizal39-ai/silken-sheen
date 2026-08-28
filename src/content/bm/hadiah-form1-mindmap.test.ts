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
import { bahasaMelayuTingkatan1HadiahMindMap } from "./hadiah-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Hadiah";
const expectedTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  title,
  "Kuih Bakul Limau Mandarin",
  "Hadiah — Drama",
  "Kita Umpama Sehelai Daun",
  "Pantun Dua Kerat (Nasihat)",
  "Syair Pohon Buluh",
];
const expectedBranches = [
  "Sinopsis",
  "Tema",
  "Persoalan",
  "Watak & Perwatakan",
  "Plot",
  "Teknik Plot",
  "Latar Tempat",
  "Latar Masa",
  "Latar Masyarakat",
  "Gaya Bahasa",
  "Nilai",
  "Pengajaran",
  "Peristiwa Penting",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1HadiahMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Hadiah mind map", () => {
  it("registers Hadiah exactly once after Kunci Bahasa and resolves through getChapter", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-hadiah-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Cerpen yang mengetengahkan cabaran kehidupan, kasih sayang keluarga, ketabahan dan usaha menghadapi kesusahan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1HadiahMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Kunci Bahasa");
    expect(topics[index + 1]?.key).toBe("Kuih Bakul Limau Mandarin");
  });

  it("uses the prescribed identity and fifteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1HadiahMindMap).toMatchObject({
      id: "bm-f1-hadiah-root",
      label: "HADIAH",
      summary:
        "Cerpen yang menonjolkan kehidupan sebuah keluarga yang berhadapan dengan cabaran serta memperlihatkan nilai kasih sayang, ketabahan dan tanggungjawab.",
    });
    expect(bahasaMelayuTingkatan1HadiahMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1HadiahMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("covers the verified story, characters, plot and analysis", () => {
    expect(branchText("Sinopsis")).toContain("cerpen dalam antologi Kuingin Berterima Kasih");
    expect(branchText("Sinopsis")).toContain("tudung saji");
    expect(branchText("Sinopsis")).toContain("pertandingan kraftangan");
    expect(branchText("Tema")).toContain(
      "PENGHARGAAN TERHADAP GURU DAN KEGIGIHAN MENCAPAI KEJAYAAN",
    );
    expect(branchText("Watak & Perwatakan")).toContain("Azizah — Watak Utama");
    expect(branchText("Watak & Perwatakan")).toContain("Cikgu Zaleha");
    expect(branchText("Watak & Perwatakan")).toContain("Ibu Azizah");
    expect(branchText("Plot")).toContain("Permulaan");
    expect(branchText("Plot")).toContain("Peleraian");
    expect(branchText("Peristiwa Penting")).toContain("8 — Azizah Menjadi Juara");
    expect(branchText("Nilai")).toContain("Menghormati Guru");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Menghargai Jasa Guru");
  });

  it("withholds unsupported author, place, quotation, technique and language-device claims", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1HadiahMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toMatch(/pengarang\s*:/i);
    expect(branchText("Latar Tempat")).toContain("Lokasi Khusus Tidak Disahkan");
    expect(branchText("Teknik Plot")).toContain("Teknik Khusus Tidak Disahkan");
    expect(branchText("Gaya Bahasa")).toContain("Bukti Teks Tidak Tersedia");
    expect(allText).not.toContain("Petikan:");
    expect(allText).not.toMatch(
      /teknik (dialog|pemerian|imbas kembali|imbas muka|monolog|saspens)/i,
    );
    expect(allText).not.toMatch(/gaya bahasa (simile|metafora|personifikasi|repetisi)/i);
  });

  it("contains exam formulas, the memory map and common-error safeguards", () => {
    expect(branchText("Teknik Menjawab")).toContain("Tema: TEMA + BUKTI PERISTIWA");
    expect(branchText("Teknik Menjawab")).toContain("HADIAH — PETA INGATAN");
    expect(branchText("Teknik Menjawab")).toContain("PELERAIAN — AZIZAH MENJADI JUARA");
    expect(branchText("Kesalahan Lazim")).toContain("Mereka-reka Petikan");
    expect(branchText("Kesalahan Lazim")).toContain("Mereka-reka Peristiwa");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1HadiahMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1HadiahMindMap, new Set())).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1HadiahMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1HadiahMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1HadiahMindMap, expanded).positions.values(),
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

  it("renders an accessible collapsed mobile learning path without page overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1HadiahMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("HADIAH");
    expect(markup).toContain("Watak &amp; Perwatakan");
    expect(markup).not.toContain("tudung saji");
  });
});

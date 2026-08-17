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
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";
import { bahasaMelayuTingkatan3PelbagaiBahanMindMap } from "./analisis-petikan-pelbagai-bahan-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Apa Itu Pelbagai Bahan?",
  "Kenal Pasti Jenis Bahan",
  "Analisis Bahan 1",
  "Analisis Bahan 2",
  "Analisis Bahan 3",
  "Cari Tema Bersama",
  "Banding Maklumat",
  "Hubungkan Idea",
  "Cari Persamaan",
  "Cari Perbezaan",
  "Gabungkan Bukti",
  "Buat Inferens",
  "Bina Jawapan",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3PelbagaiBahanMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Analisis Petikan Pelbagai Bahan mind map", () => {
  it("registers third with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(5);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Analisis Isi Tersurat dan Tersirat",
      "Analisis Petikan Pelbagai Bahan",
      "Menilai Hujah dan Pendapat",
      "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
    ]);
    const chapter = getChapter("bm", "Analisis Petikan Pelbagai Bahan", undefined, "Form 3");
    expect(chapter).toMatchObject({
      id: "bm-f3-analisis-petikan-pelbagai-bahan-mindmap",
      subjectId: "bm",
      form: "Form 3",
      title: "Analisis Petikan Pelbagai Bahan",
      description:
        "Menganalisis dan menghubungkan maklumat daripada beberapa bahan seperti petikan, poster, infografik, dialog dan bahan visual untuk membina jawapan yang tepat.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3PelbagaiBahanMindMap,
        title: "Analisis Petikan Pelbagai Bahan",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3PelbagaiBahanMindMap).toMatchObject({
      id: "bm-f3-analisis-petikan-pelbagai-bahan-root",
      label: "PELBAGAI BAHAN",
      summary:
        "Soalan pelbagai bahan memerlukan murid mengenal pasti maklumat dalam setiap bahan, mencari hubungan antara bahan dan memilih bukti yang tepat mengikut kehendak soalan.",
    });
    expect(bahasaMelayuTingkatan3PelbagaiBahanMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan3PelbagaiBahanMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches accurate multi-source synthesis, comparison and inference", () => {
    expect(branchText("Apa Itu Pelbagai Bahan?")).toContain("Bilangan Bahan Tidak Tetap");
    expect(branchText("Kenal Pasti Jenis Bahan")).toContain("Format Bukan Pandangan");
    expect(branchText("Analisis Bahan 3")).toContain("Jika set hanya mempunyai dua bahan");
    expect(branchText("Cari Tema Bersama")).toContain("Tema Luas, Fokus Lebih Khusus");
    expect(branchText("Hubungkan Idea")).toContain("Bahan A + Bahan B = Idea Lebih Lengkap");
    expect(branchText("Cari Persamaan")).toContain("hanya apabila persamaan itu dibuktikan");
    expect(branchText("Cari Perbezaan")).toContain("Jangan Paksa Perbezaan");
    expect(branchText("Gabungkan Bukti")).toContain("Jangan paksa setiap bahan");
    expect(branchText("Buat Inferens")).toContain("Jangan Reka Fakta");
    expect(branchText("Tip UASA")).toContain("L-R-H-F-B-J");
  });

  it("includes the complete, clearly labelled fictional worked example", () => {
    const answerText = branchText("Bina Jawapan");
    expect(answerText).toContain("Contoh latihan — Amalan Gaya Hidup Sihat");
    expect(answerText).toContain("bukan soalan peperiksaan rasmi");
    expect(answerText).toContain("Soalan 1 — Sintesis");
    expect(answerText).toContain("Soalan 2 — Maklumat Tersurat Merentas Bahan");
    expect(answerText).toContain("Soalan 3 — KBAT Berdasarkan Tema");
    expect(answerText).toContain("bersenam secara berkala dan memilih makanan yang sihat");
  });

  it("derives final previous and disabled next navigation without touching T1 or T2", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex((topic) => topic.key === "Analisis Petikan Pelbagai Bahan");
    expect(topics[index - 1]?.key).toBe("Analisis Isi Tersurat dan Tersirat");
    expect(topics[index + 1]?.key).toBe("Menilai Hujah dan Pendapat");
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3PelbagaiBahanMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan3PelbagaiBahanMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3PelbagaiBahanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan3PelbagaiBahanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3PelbagaiBahanMindMap,
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
        data: bahasaMelayuTingkatan3PelbagaiBahanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PELBAGAI BAHAN");
    expect(markup).toContain("Apa Itu Pelbagai Bahan?");
    expect(markup).not.toContain("Pelbagai bahan bermaksud dua atau lebih sumber");
  });
});

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
import { bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap } from "./membuat-rumusan-ringkas-form1-mindmap";
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
  "Teknik Menggunakan Bukti daripada Petikan",
];

const expectedBranches = [
  "Apa Itu Rumusan?",
  "Isi Utama",
  "Isi Sokongan",
  "Bahasa Sendiri",
  "Susunan Rumusan",
  "Ayat Pembuka",
  "Ayat Penutup",
  "Contoh Rumusan",
  "Semak Rumusan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selectedBranch = bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!selectedBranch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selectedBranch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Membuat Rumusan Ringkas mind map", () => {
  it("remains the sixth of exactly seven registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(7);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Membuat Rumusan Ringkas", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-membuat-rumusan-ringkas-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Membuat Rumusan Ringkas",
      title: "Membuat Rumusan Ringkas",
      description:
        "Belajar mengenal pasti isi utama dan menghasilkan rumusan yang jelas, padat dan menggunakan bahasa sendiri.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap,
        title: "Membuat Rumusan Ringkas",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Membuat Rumusan Ringkas", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Membuat Rumusan Ringkas",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Menjawab Soalan KBAT");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Teknik Menggunakan Bukti daripada Petikan");

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Membuat Rumusan Ringkas",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Menjawab Soalan KBAT");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Teknik Menggunakan Bukti daripada Petikan");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap).toMatchObject({
      id: "bm-f1-membuat-rumusan-ringkas-root",
      label: "RUMUSAN RINGKAS",
      summary:
        "Rumusan ialah ringkasan yang menggabungkan isi penting daripada petikan menggunakan bahasa sendiri tanpa mengubah maksud asal.",
    });
    expect(
      bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches selection of main and supporting ideas", () => {
    expect(branchText("Apa Itu Rumusan?")).toContain("Bukan Sekadar Memendekkan Ayat");
    expect(branchText("Isi Utama")).toContain("idea paling penting");
    expect(branchText("Isi Utama")).toContain("Ayat Topik");
    expect(branchText("Isi Utama")).toContain("Pengulangan Idea");
    expect(branchText("Isi Sokongan")).toContain("Pilih yang Benar-benar Penting");
    expect(branchText("Isi Sokongan")).toContain("Abaikan Contoh yang Tidak Diperlukan");
  });

  it("uses original wording without changing source meaning", () => {
    expect(branchText("Bahasa Sendiri")).toContain("Jangan Salin Seluruh Ayat");
    expect(branchText("Bahasa Sendiri")).toContain("Tukar Susunan Ayat");
    expect(branchText("Bahasa Sendiri")).toContain("Gunakan Perkataan Lain");
    expect(branchText("Bahasa Sendiri")).toContain("Kekalkan Maksud Asal");
    expect(branchText("Bahasa Sendiri")).toContain("Seseorang dapat menambah ilmu");
  });

  it("organises the summary with suitable opening and closing sentences", () => {
    expect(branchText("Susunan Rumusan")).toContain("Pendahuluan");
    expect(branchText("Susunan Rumusan")).toContain("Isi Penting");
    expect(branchText("Susunan Rumusan")).toContain("Penutup");
    expect(branchText("Susunan Rumusan")).toContain("Aliran Logik");
    expect(branchText("Ayat Pembuka")).toContain("Petikan Membincangkan");
    expect(branchText("Ayat Pembuka")).toContain("Petikan Menerangkan");
    expect(branchText("Ayat Pembuka")).toContain("Petikan Menghuraikan");
    expect(branchText("Ayat Penutup")).toContain("Jangan Paksa Peribahasa");
  });

  it("provides a complete and explained summary example", () => {
    expect(branchText("Contoh Rumusan")).toContain("Petikan Asal");
    expect(branchText("Contoh Rumusan")).toContain("Isi Penting");
    expect(branchText("Contoh Rumusan")).toContain("Rumusan Akhir");
    expect(branchText("Contoh Rumusan")).toContain("Mengapa Berkesan?");
    expect(branchText("Contoh Rumusan")).toContain("Semua isi utama disampaikan");
    expect(branchText("Contoh Rumusan")).toContain(
      "Idea ditulis semula tanpa mengubah maksud asal",
    );
  });

  it("includes the checklist, common errors and RINGKAS mnemonic", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Semak Rumusan")).toContain("Semua Isi Penting");
    expect(branchText("Semak Rumusan")).toContain("Maksud Tidak Berubah");
    expect(branchText("Semak Rumusan")).toContain("Ayat Gramatis");
    expect(branchText("Kesalahan Lazim")).toContain("Salin Bulat-bulat");
    expect(branchText("Kesalahan Lazim")).toContain("Pendapat Sendiri");
    expect(branchText("Kesalahan Lazim")).toContain("Mengubah Fakta");
    expect(branchText("Teknik Mengingat")).toContain("Rumus RINGKAS");
    expect(branchText("Teknik Mengingat")).toContain("R — Read Petikan");
    expect(branchText("Teknik Mengingat")).toContain("S — Semak Jawapan");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap,
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
        data: bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("RUMUSAN RINGKAS");
    expect(markup).toContain("Contoh Rumusan");
    expect(markup).not.toContain("Membaca dapat menambah pengetahuan murid");
  });
});

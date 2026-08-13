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
import { bahasaMelayuTingkatan2RumusanMindMap } from "./membuat-rumusan-ringkas-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
  "Mengenal Pasti Isi Tersurat (Lanjutan)",
  "Mengenal Pasti Isi Tersirat (Lanjutan)",
  "Maksud Frasa dan Ungkapan (Lanjutan)",
  "Menjawab Soalan KBAT (Lanjutan)",
  "Membuat Rumusan Ringkas (Lanjutan)",
  "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
  "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
];

const expectedBranches = [
  "Apa Itu?",
  "Kenal Pasti Fokus",
  "Cari Isi Utama",
  "Bezakan Isi Sokongan",
  "Gabungkan Isi",
  "Susun Mengikut Logik",
  "Gunakan Bahasa Sendiri",
  "Kekalkan Maksud",
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
  const selected = bahasaMelayuTingkatan2RumusanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Membuat Rumusan Ringkas Lanjutan mind map", () => {
  it("remains the sixth topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Membuat Rumusan Ringkas (Lanjutan)", undefined, "Form 2");
    expect(chapter).toMatchObject({
      id: "bm-f2-membuat-rumusan-ringkas-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Membuat Rumusan Ringkas (Lanjutan)",
      title: "Membuat Rumusan Ringkas (Lanjutan)",
      description:
        "Mengenal pasti isi utama daripada petikan yang lebih panjang, menggabungkan maklumat berkaitan dan menghasilkan rumusan yang padat, tepat serta koheren.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2RumusanMindMap,
        title: "Membuat Rumusan Ringkas (Lanjutan)",
      },
    });
    expect(
      hasResourceContent("bm", "Form 2", "Membuat Rumusan Ringkas (Lanjutan)", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to KBAT Lanjutan and forward to Bukti Petikan Lanjutan", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Membuat Rumusan Ringkas (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Menjawab Soalan KBAT (Lanjutan)");
    expect(topics[activeIndex + 1]?.key).toBe(
      "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
    );
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2RumusanMindMap).toMatchObject({
      id: "bm-f2-membuat-rumusan-ringkas-lanjutan-root",
      label: "RUMUSAN LANJUTAN",
      summary:
        "Rumusan yang baik memilih isi penting, menggabungkan maklumat yang berkaitan dan menyampaikan maksud asal secara ringkas menggunakan bahasa yang jelas.",
    });
    expect(bahasaMelayuTingkatan2RumusanMindMap.children?.map((branch) => branch.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2RumusanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches focus and distinguishes main ideas from supporting detail", () => {
    const focus = branchText("Kenal Pasti Fokus");
    expect(focus).toContain("faedah, langkah, faktor, kesan, peranan atau cabaran");
    expect(focus).toContain("faedah bersenam");
    const main = branchText("Cari Isi Utama");
    expect(main).toContain("Membaca meningkatkan pengetahuan");
    expect(main).toContain("di perpustakaan atau di rumah");
    expect(branchText("Bezakan Isi Sokongan")).toContain("Tidak Semua Ayat Dipilih");
  });

  it("combines related points and orders ideas coherently", () => {
    const combined = branchText("Gabungkan Isi");
    expect(combined).toContain("meningkatkan pengetahuan dan memperluas kosa kata");
    expect(combined).toContain("Jangan Paksa");
    const ordered = branchText("Susun Mengikut Logik");
    expect(ordered).toContain("Sebab → Kesan");
    expect(ordered).toContain("Masalah → Penyelesaian");
    expect(ordered).toContain("terlalu banyak penanda wacana");
  });

  it("uses accurate own language while preserving meaning and nuance", () => {
    expect(branchText("Gunakan Bahasa Sendiri")).toContain(
      "Penglibatan dalam aktiviti kokurikulum",
    );
    expect(branchText("Gunakan Bahasa Sendiri")).toContain("tidak bermaksud semua perkataan asal");
    const meaning = branchText("Kekalkan Maksud");
    expect(meaning).toContain("Sesetengah murid");
    expect(meaning).toContain("Semua murid");
    expect(meaning).toContain("tahap kepastian yang berbeza");
  });

  it("offers flexible openings, a safe conclusion, and a complete worked example", () => {
    expect(branchText("Ayat Pembuka")).toContain("Jangan paksa satu ayat pembuka yang sama");
    expect(branchText("Ayat Penutup")).toContain("Jangan Tambah Isi Baharu");
    expect(branchText("Ayat Penutup")).toContain("Jangan Paksa Peribahasa");
    const example = branchText("Contoh Rumusan");
    expect(example).toContain("Petikan Ringkas");
    expect(example).toContain("Isi 1");
    expect(example).toContain("Isi 2");
    expect(example).toContain("Isi 3");
    expect(example).toContain("Maklumat Tidak Perlu");
    expect(example).toContain("Rumusan Akhir");
    expect(example).toContain("Mengapa Baik?");
  });

  it("checks coherence, rejects personal opinion, and avoids universal exam formulas", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2RumusanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Semak Rumusan")).toContain("jangan andaikan satu had yang universal");
    expect(branchText("Kesalahan Lazim")).toContain("Tambah Pendapat Sendiri");
    expect(branchText("Teknik Mengingat")).toContain("Rumus RUMUS");
    expect(branchText("Teknik Mengingat")).toContain("Rumus PILIH");
    expect(branchText("Tip UASA")).toContain("Tiada Formula Universal");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2RumusanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2RumusanMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2RumusanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2RumusanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan2RumusanMindMap, expanded);
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

  it("renders an accessible collapsed mobile path with wrapping and no child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan2RumusanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("break-words");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("RUMUSAN LANJUTAN");
    expect(markup).toContain("Contoh Rumusan");
    expect(markup).not.toContain("Amalan membaca membolehkan murid memperoleh");
  });
});

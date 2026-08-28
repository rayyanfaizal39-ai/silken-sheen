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
import { bahasaMelayuTingkatan1KunciBahasaMindMap } from "./kunci-bahasa-form1-mindmap";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Kunci Bahasa";
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Peranan Bahasa",
  "Nilai",
  "Pengajaran",
  "Nada",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1KunciBahasaMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Kunci Bahasa mind map", () => {
  it("registers Kunci Bahasa after Aku while preserving every verified KOMSAS topic", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Memahami dan Menjawab KOMSAS",
      "Asal Padi",
      "Oren",
      "Aku",
      title,
      "Hadiah",
      "Kuih Bakul Limau Mandarin",
      "Hadiah — Drama",
      "Kita Umpama Sehelai Daun",
      "Pantun Dua Kerat (Nasihat)",
      "Syair Pohon Buluh",
    ]);

    const chapter = getChapter("bm", title, undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-kunci-bahasa-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Sajak tentang kepentingan bahasa sebagai alat komunikasi, lambang maruah, penghubung manusia dan wahana yang berkembang bersama masyarakat.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1KunciBahasaMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Kunci Bahasa isolated to Form 1 with registry-driven navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([
      "Strategi Memahami dan Menjawab KOMSAS",
      "Asal Padi",
      "Oren",
      "Aku",
      title,
      "Hadiah",
      "Kuih Bakul Limau Mandarin",
      "Hadiah — Drama",
      "Kita Umpama Sehelai Daun",
      "Pantun Dua Kerat (Nasihat)",
      "Syair Pohon Buluh",
    ]);
    expect(topics[index - 1]?.key).toBe("Aku");
    expect(topics[index + 1]?.key).toBe("Hadiah");
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1KunciBahasaMindMap).toMatchObject({
      id: "bm-f1-kunci-bahasa-root",
      label: "KUNCI BAHASA",
      summary:
        "Sajak menonjolkan peranan bahasa dalam kehidupan manusia melalui kesantunan, perkembangan bahasa, hubungan sesama manusia, komunikasi dan keindahan ungkapan.",
    });
    expect(bahasaMelayuTingkatan1KunciBahasaMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1KunciBahasaMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("contains the verified author, genre, anthology and six conceptual rangkap ideas", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Abdul Hadi Yusof");
    expect(bentuk).toContain("puisi moden");
    expect(bentuk).toContain("Kuingin Berterima Kasih");
    expect(bentuk).toContain("Enam Rangkap");

    const maksudRangkap = branchText("Maksud Rangkap");
    expect(maksudRangkap).toContain("Rangkap 1 — Maruah Bahasa");
    expect(maksudRangkap).toContain("Rangkap 2 — Bahasa Berkembang");
    expect(maksudRangkap).toContain("Rangkap 3 — Bahasa dan Sejarah");
    expect(maksudRangkap).toContain("Rangkap 4 — Bahasa Menghubungkan Manusia");
    expect(maksudRangkap).toContain("Rangkap 5 — Bahasa sebagai Alat Komunikasi");
    expect(maksudRangkap).toContain("Rangkap 6 — Keindahan Bahasa");
    expect(maksudRangkap).toContain("BAHASA → KESANTUNAN → MARUAH");
    expect(maksudRangkap).toContain("BAHASA → KEINDAHAN → UNGKAPAN");
  });

  it("covers the approved analysis, memory map and answer techniques", () => {
    expect(branchText("Tema")).toContain("PERANAN DAN KEPENTINGAN BAHASA DALAM KEHIDUPAN");
    expect(branchText("Tema")).toContain("Jawapan Murid");
    expect(branchText("Persoalan")).toContain("IDEA / RANGKAP SOKONGAN");
    expect(branchText("Gaya Bahasa")).toContain("Imejan Abstrak");
    expect(branchText("Peranan Bahasa")).toContain("Warisan dan Sejarah");
    expect(branchText("Nilai")).toContain("Hormat-menghormati");
    expect(branchText("Pengajaran")).toContain(
      "Kita Hendaklah Menggunakan Bahasa untuk Mengeratkan Hubungan",
    );
    expect(branchText("Nada")).toContain("TEGAS");
    expect(branchText("Nada")).toContain("MENGHARGAI BAHASA");
    expect(branchText("Kata Kunci")).toContain("KUNCI BAHASA — 6 IDEA");
    expect(branchText("Kata Kunci")).toContain(
      "SANTUN + BERMARUAH + BERKEMBANG + MENGHUBUNGKAN + BERKOMUNIKASI + INDAH",
    );
    expect(branchText("Teknik Menjawab")).toContain("TEKNIK + BUKTI YANG DISAHKAN");
    expect(branchText("Kesalahan Lazim")).toContain("Petikan Direka");
  });

  it("keeps values and lessons distinct without invented quotations or unsupported form details", () => {
    const nilai = bahasaMelayuTingkatan1KunciBahasaMindMap.children?.find(
      (item) => item.label === "Nilai",
    );
    const pengajaran = bahasaMelayuTingkatan1KunciBahasaMindMap.children?.find(
      (item) => item.label === "Pengajaran",
    );
    expect(nilai?.children?.every((item) => !item.label.startsWith("Kita Hendaklah"))).toBe(true);
    expect(pengajaran?.children?.every((item) => item.label.startsWith("Kita Hendaklah"))).toBe(
      true,
    );

    const allText = collectNodes(bahasaMelayuTingkatan1KunciBahasaMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toMatch(/\brima\b|suku kata|\d+\s+baris|\bsimile\b|\bmetafora\b/i);
    expect(allText).not.toContain("Petikan:");
    expect(allText).toContain("Jangan sekali-kali mereka-reka baris daripada sajak");
  });

  it("supports expand and collapse with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1KunciBahasaMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1KunciBahasaMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1KunciBahasaMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1KunciBahasaMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1KunciBahasaMindMap, expanded).positions.values(),
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

  it("renders an accessible collapsed mobile path without horizontal page overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1KunciBahasaMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KUNCI BAHASA");
    expect(markup).toContain("Peranan Bahasa");
    expect(markup).not.toContain("Abdul Hadi Yusof");
  });
});

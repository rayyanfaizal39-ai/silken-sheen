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
import { bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap } from "./pantun-dua-kerat-nasihat-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pantun Dua Kerat (Nasihat)";
const expectedTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  "Hadiah",
  "Kuih Bakul Limau Mandarin",
  "Hadiah — Drama",
  "Kita Umpama Sehelai Daun",
  title,
  "Syair Pohon Buluh",
];
const expectedBranches = [
  "Apa Itu Pantun Dua Kerat?",
  "Maksud Pantun",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Pantun",
  "Gaya Bahasa",
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
  const selected = bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Pantun Dua Kerat (Nasihat) mind map", () => {
  it("registers the pantun exactly once after every existing KOMSAS topic", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-pantun-dua-kerat-nasihat-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Pantun yang menyampaikan nasihat tentang sikap, tutur kata, usaha, ilmu dan tingkah laku yang baik dalam kehidupan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap, title },
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
    expect(topics[index - 1]?.key).toBe("Kita Umpama Sehelai Daun");
    expect(topics[index + 1]?.key).toBe("Syair Pohon Buluh");
  });

  it("uses the prescribed identity and thirteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap).toMatchObject({
      id: "bm-f1-pantun-dua-kerat-nasihat-root",
      label: "PANTUN DUA KERAT",
      summary:
        "Pantun dua kerat menyampaikan nasihat secara ringkas dan berirama tentang kehidupan, sikap manusia dan kepentingan melakukan perkara yang baik.",
    });
    expect(
      bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the verified five-pantun sequence without the synthetic practice set", () => {
    const maksud = branchText("Maksud Pantun");
    expect(maksud).toContain("Pantun 1 — Sikap Tercermin melalui Perbuatan");
    expect(maksud).toContain("Pantun 2 — Sikap Leka dan Malas Merugikan");
    expect(maksud).toContain("Pantun 3 — Setiap Insan Mempunyai Kelebihan");
    expect(maksud).toContain("Pantun 4 — Usaha Membawa Hasil");
    expect(maksud).toContain("Pantun 5 — Kerjasama Memudahkan Pekerjaan");
    expect(maksud).not.toMatch(/peliharakan kaki|sedikit hujan|fikir dahulu sebelum bersuara/i);
  });

  it("covers the verified form, theme, issues, values and lessons", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("puisi tradisional");
    expect(bentuk).toContain("Kuingin Berterima Kasih");
    expect(bentuk).toContain("Lima Rangkap");
    expect(bentuk).toContain("Dua Baris Setiap Rangkap");
    expect(bentuk).toContain("Rima Akhir aa");
    expect(branchText("Tema")).toContain(
      "NASIHAT UNTUK MEMBENTUK SIKAP DAN TINGKAH LAKU YANG BAIK",
    );
    expect(branchText("Persoalan")).toContain("Pantun / Idea Sokongan");
    expect(branchText("Nilai")).toContain("Kerajinan");
    expect(branchText("Nilai")).toContain("Rasional");
    expect(branchText("Nilai")).toContain("Kerjasama");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Rajin Berusaha");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Bekerjasama");
  });

  it("uses only verified devices and keeps unsupported candidate ideas out", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Imej Alam",
      "Repetisi",
      "Bahasa Arab",
      "Asonansi",
      "Aliterasi",
      "Responsi",
      "Paradoks",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toMatch(/\bSimile\b|\bMetafora\b|\bPersonifikasi\b/i);

    const instructionalText = bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap.children
      ?.filter((item) => item.label !== "Kesalahan Lazim")
      .flatMap(collectNodes)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(instructionalText).not.toMatch(/menuntut ilmu|kepentingan ilmu|menjaga tutur kata/i);
  });

  it("provides concise revision scaffolds without reproducing the full pantun section", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kata Kunci")).toContain(
      "JAGA SIKAP → ELAK MALAS → NILAI KELEBIHAN → RAJIN BERUSAHA → BEKERJASAMA",
    );
    expect(branchText("Teknik Menjawab")).toContain("NASIHAT + PARAFRASA");
    expect(branchText("Kesalahan Lazim")).toContain("Menggunakan Tiga Pantun Latihan");
    expect(branchText("Nada")).toContain("NASIHAT — NADA UTAMA");
    expect(allText).not.toContain("Berapa jauh wujud dengan sifat, Sejauh lutut dengan pelipat");
    expect(allText).not.toContain("Buah sintang buah senikul, Satu memegang satu memikul");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap,
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
        data: bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PANTUN DUA KERAT");
    expect(markup).toContain("Ciri Pantun");
    expect(markup).not.toContain("Lima Rangkap");
  });
});

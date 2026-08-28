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
import { bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap } from "./kita-umpama-sehelai-daun-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Kita Umpama Sehelai Daun";
const expectedTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  "Hadiah",
  "Kuih Bakul Limau Mandarin",
  "Hadiah — Drama",
  title,
  "Pantun Dua Kerat (Nasihat)",
  "Syair Pohon Buluh",
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Simbol Daun",
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
  const selected = bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Kita Umpama Sehelai Daun mind map", () => {
  it("registers the new sajak exactly once after every existing KOMSAS topic", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-kita-umpama-sehelai-daun-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Sajak yang mengumpamakan kehidupan manusia seperti sehelai daun dan menyeru manusia supaya berbuat jasa, bersikap prihatin serta tidak sombong sepanjang kehidupan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap, title },
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
    expect(topics[index - 1]?.key).toBe("Hadiah — Drama");
    expect(topics[index + 1]?.key).toBe("Pantun Dua Kerat (Nasihat)");
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap).toMatchObject({
      id: "bm-f1-kita-umpama-sehelai-daun-root",
      label: "KITA UMPAMA\nSEHELAI DAUN",
      summary:
        "Sajak mengingatkan bahawa kehidupan manusia bersifat sementara. Oleh itu, manusia hendaklah berbuat jasa, membantu golongan yang memerlukan dan meninggalkan kebaikan yang terus bermanfaat.",
    });
    expect(
      bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("contains the verified author, genre, anthology and four-rangkap structure", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("SMahadzir");
    expect(bentuk).toContain("sajak atau puisi moden");
    expect(bentuk).toContain("Kuingin Berterima Kasih");
    expect(bentuk).toContain("Empat Rangkap");
    expect(bentuk).toContain("Lima baris dengan rima akhir ababc");
    expect(bentuk).toContain("Empat baris dengan rima akhir abcd");
    expect(bentuk).toContain("Lima baris dengan rima akhir abcbd");
    expect(bentuk).toContain("Tiga baris dengan rima akhir abb");

    const maksud = branchText("Maksud Rangkap");
    expect(maksud).toContain("Rangkap 1 — Hidup Hendaklah Bermanfaat");
    expect(maksud).toContain("Rangkap 2 — Jangan Kedekut Berbuat Jasa");
    expect(maksud).toContain("Rangkap 3 — Hidup Tidak Kekal");
    expect(maksud).toContain("Rangkap 4 — Tinggalkan Jasa");
  });

  it("covers the verified theme, leaf symbolism, values and lessons", () => {
    expect(branchText("Tema")).toContain("MANUSIA HENDAKLAH BERBUAT JASA DALAM KEHIDUPAN");
    expect(branchText("Persoalan")).toContain("Idea / Rangkap Sokongan");
    expect(branchText("Simbol Daun")).toContain("Daun Muda");
    expect(branchText("Simbol Daun")).toContain("Daun Menjadi Baja");
    expect(branchText("Simbol Daun")).toContain(
      "TUMBUH → MEMBERI TEDUH → MENJADI TUA → GUGUR → TERUS MEMBERI MANFAAT",
    );
    expect(branchText("Nilai")).toContain("Keprihatinan dan Simpati");
    expect(branchText("Nilai")).toContain("Keinsafan");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Berbuat Jasa");
    expect(branchText("Pengajaran")).toContain("Kita Tidak Sewajarnya Bersikap Sombong");
  });

  it("uses verified literary devices and distinguishes formal tone from message effects", () => {
    const gayaBahasa = branchText("Gaya Bahasa");
    for (const technique of [
      "Simile",
      "Personifikasi",
      "Repetisi",
      "Imej Alam",
      "Hiperbola",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gayaBahasa).toContain(technique);
    }
    expect(gayaBahasa).toContain("Gunakan hanya frasa pendek yang telah disahkan");
    expect(branchText("Nada")).toContain("ROMANTIS — NADA YANG DISAHKAN");
    expect(branchText("Nada")).toContain("Nasihat — Kesan Mesej");
    expect(branchText("Nada")).toContain("Seruan — Cara Penyampaian");
  });

  it("contains revision scaffolds without reproducing or inventing poem lines", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kata Kunci")).toContain("MANFAAT → BANTU → INSAF → BERJASA");
    expect(branchText("Kata Kunci")).toContain("HIDUP SEMENTARA + JASA BOLEH BERKEKALAN");
    expect(branchText("Teknik Menjawab")).toContain("IDEA + PARAFRASA");
    expect(branchText("Teknik Menjawab")).toContain("OBJEK + PERKARA YANG DILAMBANGKAN");
    expect(branchText("Kesalahan Lazim")).toContain("Tema = Alam Sekitar");
    expect(branchText("Kesalahan Lazim")).toContain("Petikan Direka");
    expect(allText).not.toContain(
      "Kita umpama sehelai daun, bertunas segar di hujung ranting, lalu melebar dan merimbun",
    );
    expect(allText).not.toContain("Hijau seketika, lalu gugur jua");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap,
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
        data: bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KITA UMPAMA");
    expect(markup).toContain("Simbol Daun");
    expect(markup).not.toContain("SMahadzir");
  });
});

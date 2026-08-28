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
import { bahasaMelayuTingkatan1SyairPohonBuluhMindMap } from "./syair-pohon-buluh-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Syair Pohon Buluh";
const expectedExistingTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  "Hadiah",
  "Kuih Bakul Limau Mandarin",
  "Hadiah — Drama",
  "Kita Umpama Sehelai Daun",
  "Pantun Dua Kerat (Nasihat)",
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Syair",
  "Gaya Bahasa",
  "Simbol Pohon Buluh",
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
  const selected = bahasaMelayuTingkatan1SyairPohonBuluhMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Syair Pohon Buluh mind map", () => {
  it("preserves every existing KOMSAS topic and registers the syair exactly once", () => {
    const keys = bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys.slice(0, -1)).toEqual(expectedExistingTopics);
    expect(keys.at(-1)).toBe(title);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-syair-pohon-buluh-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Syair yang menggunakan pohon buluh sebagai gambaran masyarakat yang hidup bersatu padu, bermuafakat, menjaga persaudaraan dan bertanggungjawab memelihara keamanan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1SyairPohonBuluhMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous navigation and ends the KOMSAS sequence", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([...expectedExistingTopics, title]);
    expect(topics[index - 1]?.key).toBe("Pantun Dua Kerat (Nasihat)");
    expect(topics[index + 1]).toBeUndefined();
  });

  it("uses the prescribed identity and thirteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1SyairPohonBuluhMindMap).toMatchObject({
      id: "bm-f1-syair-pohon-buluh-root",
      label: "SYAIR POHON BULUH",
    });
    expect(
      bahasaMelayuTingkatan1SyairPohonBuluhMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1SyairPohonBuluhMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the verified four-rangkap sequence and formal structure", () => {
    const maksud = branchText("Maksud Rangkap");
    expect(maksud).toContain("Rangkap 1");
    expect(maksud).toContain("Rangkap 2");
    expect(maksud).toContain("Rangkap 3");
    expect(maksud).toContain("Rangkap 4");
    expect(maksud).not.toContain("Rangkap 5");

    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Kuingin Berterima Kasih");
    expect(bentuk).toContain("Empat Rangkap");
    expect(bentuk).toContain("Empat Baris Serangkap");
    expect(bentuk).toContain("Empat hingga Enam Patah Kata");
    expect(bentuk).toContain("Sembilan hingga Dua Belas Suku Kata");
    expect(bentuk).toContain("Rima Akhir aaaa");
    expect(bentuk).toContain("Bentuk Terikat");
    expect(branchText("Ciri Syair")).toContain("Tiada Pembayang");
  });

  it("keeps the analysis source-supported and excludes conflicting legacy claims", () => {
    expect(branchText("Tema")).toContain("PERPADUAN DAN KEHARMONIAN DALAM KEHIDUPAN BERMASYARAKAT");
    expect(branchText("Persoalan")).toContain("Darjat dan Pangkat Bukan Pemisah");
    expect(branchText("Nilai")).toContain("Bersatu Padu");
    expect(branchText("Nilai")).toContain("Bertanggungjawab");
    expect(branchText("Nilai")).toContain("Patriotisme");
    expect(branchText("Pengajaran")).toContain("Kita Janganlah Membezakan Pangkat");

    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Simbolisme",
      "Anafora",
      "Simile",
      "Sinkope",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    const instructionalText = bahasaMelayuTingkatan1SyairPohonBuluhMindMap.children
      ?.filter((item) => item.label !== "Kesalahan Lazim")
      .flatMap(collectNodes)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(instructionalText).not.toMatch(
      /personifikasi|hiperbola|ketaatan kepada pemimpin|ditiup angin|rendah hati/i,
    );
  });

  it("uses concise paraphrases and does not reproduce the prescribed syair", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1SyairPohonBuluhMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kata Kunci")).toContain(
      "BULUH → RUMPUN → BERSATU → MUAFAKAT → ASAS KUAT → HARMONI",
    );
    expect(branchText("Teknik Menjawab")).toContain("IDEA UTAMA + PARAFRASA");
    expect(branchText("Nada")).toContain("NASIHAT — NADA UTAMA");
    expect(allText).not.toContain("Menara tinggi banyak bertingkat");
    expect(allText).not.toContain("Yang ada sedia panji-panji bendera");
    expect(allText).not.toContain("Selalu dipandang dilihat adanya");
    expect(allText).not.toContain("Ikatnya licin di luar di dalam");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1SyairPohonBuluhMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1SyairPohonBuluhMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1SyairPohonBuluhMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1SyairPohonBuluhMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan1SyairPohonBuluhMindMap,
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
        data: bahasaMelayuTingkatan1SyairPohonBuluhMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("SYAIR POHON BULUH");
    expect(markup).toContain("Ciri Syair");
    expect(markup).not.toContain("Empat Rangkap");
  });
});

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
import { bahasaMelayuTingkatan2SyairNasihatMindMap } from "./syair-nasihat-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Syair Nasihat (Penghujung Thamarat al-Muhimmah)";
const expectedTopics = [
  "Pantun Alam Remaja",
  "Pantun Kiasan",
  "Pantun Budi",
  "Pantun Nasihat",
  "Pantun Kasih Sayang",
  title,
  "Dalam Persekitaran Kata-kata",
  "Roti",
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Syair",
  "Gaya Bahasa",
  "Nasihat Kepimpinan",
  "Nilai",
  "Pengajaran",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2SyairNasihatMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Syair Nasihat mind map", () => {
  it("preserves the registry and registers the syair exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-syair-nasihat-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Syair berbentuk nasihat seorang bapa kepada anaknya tentang tanggungjawab sebagai pemimpin, keadilan, amanah, ilmu dan kebijaksanaan dalam menjalankan pemerintahan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2SyairNasihatMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Pantun Kasih Sayang");
    expect(topics[index + 1]?.key).toBe("Dalam Persekitaran Kata-kata");
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2SyairNasihatMindMap).toMatchObject({
      id: "bm-f2-syair-nasihat-root",
      label: "SYAIR NASIHAT",
    });
    expect(bahasaMelayuTingkatan2SyairNasihatMindMap.summary).toContain(
      "Penghujung Thamarat al-Muhimmah",
    );
    expect(bahasaMelayuTingkatan2SyairNasihatMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2SyairNasihatMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches exactly eighteen expandable rangkap with the verified form", () => {
    const maksud = bahasaMelayuTingkatan2SyairNasihatMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    const rangkap = maksud?.children?.filter((item) => /^Rangkap \d+$/.test(item.label)) ?? [];
    expect(rangkap.map((item) => item.label)).toEqual(
      Array.from({ length: 18 }, (_, index) => `Rangkap ${index + 1}`),
    );
    rangkap.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.map((child) => child.label)).toEqual([
        "Maksud Mudah",
        "Nasihat Utama",
        "Kata Kunci",
      ]);
    });

    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("18 Rangkap");
    expect(bentuk).toContain("Empat Baris Serangkap");
    expect(bentuk).toContain("72 baris");
    expect(bentuk).toContain("Tiga hingga Enam Patah Kata");
    expect(bentuk).toContain("Lapan hingga Empat Belas Suku Kata");
    expect(bentuk).toContain("Rima Akhir aaaa");
  });

  it("keeps syair distinct from pantun and attributes the work correctly", () => {
    const ciri = branchText("Ciri Syair");
    expect(ciri).toContain("Tiada Pembayang");
    expect(ciri).toContain("semua baris membawa maksud");
    expect(ciri).toContain("Pantun vs Syair");
    expect(ciri).toContain("Raja Ali Haji");
    expect(ciri).toContain("Abu Hassan Sham");
    expect(ciri).toContain("1993");
    expect(ciri).toContain("Baik Budi, Indah Bahasa");
  });

  it("covers the source-supported theme, leadership advice, values and lessons", () => {
    expect(branchText("Tema")).toContain("NASIHAT TENTANG TANGGUNGJAWAB SEORANG PEMIMPIN");
    expect(branchText("Persoalan")).toContain("Kepentingan Ilmu");
    expect(branchText("Persoalan")).toContain("Kepentingan Keadilan");
    expect(branchText("Persoalan")).toContain("Pemantauan Pegawai");
    expect(branchText("Nasihat Kepimpinan")).toContain(
      "KUASA + AMANAH + ILMU + ADIL = KEPIMPINAN BAIK",
    );
    expect(branchText("Nilai")).toContain("Keikhlasan");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Menuntut Ilmu");
    expect(branchText("Kesalahan Lazim")).toContain("ILMU → SIASAT → PERTIMBANGKAN → PUTUSKAN");
  });

  it("uses only verified short examples for literary devices", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Inversi",
      "Anafora",
      "Simile",
      "Sinkope",
      "Bahasa Klasik",
      "Bahasa Arab",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).toContain("nasihat kebajikan ayahanda beri");
    expect(gaya).toContain("seperti air di dalam gelas");
    expect(gaya).not.toContain("Metafora");
    expect(gaya).not.toContain("Personifikasi");

    const allText = collectNodes(bahasaMelayuTingkatan2SyairNasihatMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Tamatlah kitab dikarang orang");
    expect(allText).not.toContain("Hendak menghukumkan tiada tahu");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2SyairNasihatMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2SyairNasihatMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2SyairNasihatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2SyairNasihatMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2SyairNasihatMindMap,
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
        data: bahasaMelayuTingkatan2SyairNasihatMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("SYAIR NASIHAT");
    expect(markup).toContain("Ciri Syair");
    expect(markup).not.toContain("18 Rangkap");
  });
});

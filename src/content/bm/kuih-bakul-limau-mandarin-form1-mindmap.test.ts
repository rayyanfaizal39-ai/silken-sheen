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
import { bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap } from "./kuih-bakul-limau-mandarin-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Kuih Bakul Limau Mandarin";
const expectedTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  "Hadiah",
  title,
];
const expectedBranches = [
  "Sinopsis",
  "Tema",
  "Persoalan",
  "Watak",
  "Perwatakan",
  "Plot",
  "Teknik Plot",
  "Latar Tempat",
  "Latar Masa",
  "Latar Masyarakat",
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
  const selected = bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Kuih Bakul Limau Mandarin mind map", () => {
  it("registers the topic exactly once after the existing KOMSAS sequence", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-kuih-bakul-limau-mandarin-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Cerpen tentang konflik sebuah keluarga yang berpunca daripada kepercayaan khurafat dan sikap ego sebelum kasih sayang serta kebenaran menyatukan mereka semula menjelang Tahun Baharu Cina.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
  });

  it("uses registry-driven previous navigation and disables next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Hadiah");
    expect(topics[index + 1]).toBeUndefined();
  });

  it("uses the prescribed identity and fifteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap).toMatchObject({
      id: "bm-f1-kuih-bakul-limau-mandarin-root",
      label: "KUIH BAKUL\nLIMAU MANDARIN",
      summary:
        "Cerpen mengisahkan konflik antara Lim Pooi dengan anaknya, Lim Meng, akibat kepercayaan dan prasangka yang salah sehingga kebenaran akhirnya membawa kepada keinsafan dan penyatuan semula keluarga.",
    });
    expect(
      bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("keeps the work identity, roles, conflict and resolution accurate", () => {
    expect(branchText("Sinopsis")).toContain("Mohd. Helmi Ahmad");
    expect(branchText("Sinopsis")).toContain("Kuingin Berterima Kasih");
    expect(branchText("Watak")).toContain("Lim Pooi");
    expect(branchText("Watak")).toContain("Bapa kepada Lim Meng");
    expect(branchText("Watak")).toContain("Ibu kepada Lim Meng");
    expect(branchText("Watak")).toContain("Anak lelaki keluarga yang telah meninggal dunia");
    expect(branchText("Tema")).toContain("KASIH SAYANG KELUARGA YANG KEMBALI TERJALIN");
    expect(branchText("Persoalan")).toContain("Kepercayaan terhadap Perkara Khurafat");
    expect(branchText("Persoalan")).toContain("Keegoan Seorang Bapa");
    expect(branchText("Perwatakan")).toContain("Sim Pau — Berani");
    expect(branchText("Perwatakan")).toContain("Lim Pooi — Insaf");
    expect(branchText("Latar Masa")).toContain("Sehari Sebelum Tahun Baharu Cina");
    expect(branchText("Peristiwa Penting")).toContain("Keluarga Bersatu Semula");
  });

  it("presents superstition as Lim Pooi's belief and avoids fabricated claims", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(branchText("Sinopsis")).toContain("bukan fakta objektif");
    expect(branchText("Kesalahan Lazim")).toContain(
      "kepercayaan khurafat Lim Pooi, bukan fakta objektif",
    );
    expect(branchText("Persoalan")).toContain(
      "Lim Pooi percaya bahawa Lim Meng membawa malang kepada keluarganya",
    );
    expect(branchText("Peristiwa Penting")).toContain(
      "ini ialah kepercayaan Lim Pooi, bukan fakta",
    );
    expect(branchText("Teknik Plot")).toContain("diparafrasa tanpa mereka-reka dialog tepat");
    expect(allText).not.toContain("Petikan:");
    expect(allText).not.toContain("Lim Meng menyebabkan Lim Foong meninggal dunia");
  });

  it("provides evidence, exam formulas, memory map and common-error safeguards", () => {
    expect(branchText("Persoalan")).toContain("Bukti Peristiwa");
    expect(branchText("Perwatakan")).toContain("Bukti Peristiwa");
    expect(branchText("Nilai")).toContain("Bukti Peristiwa");
    expect(branchText("Pengajaran")).toContain("Bukti Peristiwa");
    expect(branchText("Teknik Menjawab")).toContain("WATAK + SIFAT + PERISTIWA");
    expect(branchText("Teknik Menjawab")).toContain("KUIH BAKUL LIMAU MANDARIN — PETA INGATAN");
    expect(branchText("Teknik Menjawab")).toContain(
      "KASIH SAYANG + KEBENARAN + KEINSAFAN + KEMAAFAN",
    );
    expect(branchText("Kesalahan Lazim")).toContain("Lim Foong dan Lim Meng Tertukar");
    expect(branchText("Kesalahan Lazim")).toContain("Tema = Tahun Baharu Cina");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap,
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
        data: bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KUIH BAKUL");
    expect(markup).toContain("Kesalahan Lazim");
    expect(markup).not.toContain("Mohd. Helmi Ahmad");
  });
});

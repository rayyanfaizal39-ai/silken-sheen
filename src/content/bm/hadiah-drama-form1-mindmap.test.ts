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
import { bahasaMelayuTingkatan1HadiahDramaMindMap } from "./hadiah-drama-form1-mindmap";
import { bahasaMelayuTingkatan1HadiahMindMap } from "./hadiah-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Hadiah";
const chapterKey = "Hadiah — Drama";
const expectedTopics = [
  "Strategi Memahami dan Menjawab KOMSAS",
  "Asal Padi",
  "Oren",
  "Aku",
  "Kunci Bahasa",
  "Hadiah",
  "Kuih Bakul Limau Mandarin",
  chapterKey,
  "Kita Umpama Sehelai Daun",
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
  "Nilai",
  "Pengajaran",
  "Peristiwa Penting",
  "Teknik Drama",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1HadiahDramaMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Hadiah drama mind map", () => {
  it("registers the drama as a distinct eighth KOMSAS topic while preserving the cerpen", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.title === title),
    ).toHaveLength(2);
    expect(
      bahasaMelayuTingkatan1KomsasRegistry.filter((topic) => topic.chapterKey === chapterKey),
    ).toHaveLength(1);

    expect(getChapter("bm", chapterKey, undefined, "Form 1")).toMatchObject({
      id: "bm-f1-hadiah-drama-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey,
      title,
      description:
        "Drama yang mengetengahkan kehidupan sebuah keluarga yang menghadapi kesusahan, kasih sayang antara ahli keluarga, ketabahan menghadapi cabaran dan bantuan yang membawa kegembiraan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1HadiahDramaMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", chapterKey, "mindMap")).toBe(true);
    expect(getChapter("bm", chapterKey, undefined, "Form 2")).toBeUndefined();

    const cerpen = getChapter("bm", "Hadiah", undefined, "Form 1");
    expect(cerpen).toMatchObject({
      id: "bm-f1-hadiah-mindmap",
      chapterKey: "Hadiah",
      mindMap: { data: bahasaMelayuTingkatan1HadiahMindMap },
    });
    expect(cerpen?.mindMap?.data).not.toBe(bahasaMelayuTingkatan1HadiahDramaMindMap);
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === chapterKey);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Kuih Bakul Limau Mandarin");
    expect(topics[index + 1]?.key).toBe("Kita Umpama Sehelai Daun");
  });

  it("uses the prescribed identity and fifteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1HadiahDramaMindMap).toMatchObject({
      id: "bm-f1-hadiah-drama-root",
      label: "HADIAH",
      summary:
        "Drama ini mengetengahkan kehidupan keluarga yang menghadapi cabaran dengan tabah serta memperlihatkan pentingnya kasih sayang, tanggungjawab, pendidikan dan keprihatinan terhadap golongan yang memerlukan.",
    });
    expect(bahasaMelayuTingkatan1HadiahDramaMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1HadiahDramaMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("covers the verified identity, family, conflict and resolution", () => {
    const synopsis = branchText("Sinopsis");
    expect(synopsis).toContain("drama karya Aripin Said");
    expect(synopsis).toContain("antologi Kuingin Berterima Kasih");
    expect(synopsis).toContain("Sekolah Menengah Seri Setia, Melaka");
    expect(synopsis).toContain("empat puluh ringgit");
    expect(synopsis).toContain("RM10,000");
    for (const character of [
      "Hayati / Yati",
      "Fauziah",
      "Pak Mail",
      "Encik Musa",
      "Sarjan Akhbar",
      "Datuk Penghulu",
      "Farid",
    ]) {
      expect(branchText("Watak & Perwatakan")).toContain(character);
    }
    expect(branchText("Tema")).toContain(
      "KETABAHAN MENGHADAPI KESUSAHAN HIDUP DAN PENGHARGAAN TERHADAP JASA PEJUANG NEGARA",
    );
    expect(branchText("Plot")).toContain("Peleraian");
    expect(branchText("Peristiwa Penting")).toContain("7. Hayati Kembali ke Asrama");
  });

  it("teaches supported plot and drama techniques without fabricated quotations or structure", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1HadiahDramaMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    for (const technique of ["Dialog", "Imbas Kembali", "Imbas Muka", "Pemerian"]) {
      expect(branchText("Teknik Plot")).toContain(technique);
    }
    expect(branchText("Teknik Drama")).toContain("Arahan Pentas");
    expect(branchText("Teknik Drama")).toContain("Aksi Watak");
    expect(branchText("Teknik Drama")).toContain("tanpa mereka-reka jumlah babak atau adegan");
    expect(branchText("Latar Masa")).toContain("tempoh yang tidak seragam");
    expect(allText).not.toContain("Petikan:");
  });

  it("keeps facts from the existing Hadiah cerpen out of the instructional branches", () => {
    const instructionalText = bahasaMelayuTingkatan1HadiahDramaMindMap.children
      ?.filter((item) => item.label !== "Kesalahan Lazim")
      .flatMap(collectNodes)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(instructionalText).not.toMatch(
      /Azizah|Cikgu Zaleha|tudung saji|Hari Guru|pertandingan kraftangan/i,
    );
    expect(branchText("Kesalahan Lazim")).toContain("Keliru Hadiah Cerpen dengan Hadiah Drama");
  });

  it("provides exam formulas, a memory map and evidence safeguards", () => {
    expect(branchText("Teknik Menjawab")).toContain("WATAK + SIFAT + PERISTIWA");
    expect(branchText("Teknik Menjawab")).toContain("HADIAH DRAMA — PETA INGATAN");
    expect(branchText("Kesalahan Lazim")).toContain("Dialog Direka");
    expect(branchText("Kesalahan Lazim")).toContain("Plot Direka");
    expect(branchText("Watak & Perwatakan")).toContain(
      "tidak memberikan peristiwa khusus yang mencukupi untuk menetapkan sifat Farid",
    );
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1HadiahDramaMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1HadiahDramaMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1HadiahDramaMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1HadiahDramaMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1HadiahDramaMindMap, expanded).positions.values(),
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
        data: bahasaMelayuTingkatan1HadiahDramaMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("HADIAH");
    expect(markup).toContain("Teknik Drama");
    expect(markup).not.toContain("Aripin Said");
  });
});

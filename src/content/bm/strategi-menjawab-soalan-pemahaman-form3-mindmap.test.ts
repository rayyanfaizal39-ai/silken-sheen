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
import { bahasaMelayuTingkatan3StrategiPemahamanMindMap } from "./strategi-menjawab-soalan-pemahaman-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Fahami Petikan",
  "Kenal Pasti Fokus",
  "Analisis Kata Tugas",
  "Bezakan Jenis Maklumat",
  "Jejak Bukti",
  "Hubungkan Maklumat",
  "Tafsir Maksud",
  "Analisis Sebab dan Kesan",
  "Buat Inferens",
  "Nilai dan Pengajaran",
  "Jawab KBAT",
  "Bina Jawapan",
  "Soalan Pelbagai Bahagian",
  "Semak Jawapan",
  "Strategi UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3StrategiPemahamanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Strategi Menjawab Soalan Pemahaman mind map", () => {
  it("remains the first of exactly five registered Form 3 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(5);
    expect(bahasaMelayuTingkatan3PemahamanRegistry[0]).toMatchObject({
      id: "bm-f3-strategi-menjawab-soalan-pemahaman-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Strategi Menjawab Soalan Pemahaman",
      title: "Strategi Menjawab Soalan Pemahaman",
      description:
        "Strategi menganalisis petikan, mengenal pasti kehendak soalan, memilih bukti dan membina jawapan yang tepat, matang serta berasaskan teks.",
      categoryLabel: "Pemahaman",
      mindMap: { data: bahasaMelayuTingkatan3StrategiPemahamanMindMap },
    });
    const chapter = getChapter("bm", "Strategi Menjawab Soalan Pemahaman", undefined, "Form 3");
    expect(chapter?.id).toBe("bm-f3-strategi-menjawab-soalan-pemahaman-mindmap");
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("has disabled previous navigation and links to the analysis topic next", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    expect(topics.map((topic) => topic.key)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Analisis Isi Tersurat dan Tersirat",
      "Analisis Petikan Pelbagai Bahan",
      "Menilai Hujah dan Pendapat",
      "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
    ]);
    expect(topics[0 - 1]).toBeUndefined();
    expect(topics[0 + 1]?.key).toBe("Analisis Isi Tersurat dan Tersirat");
  });

  it("keeps the Form 1 and Form 2 registries isolated", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(getChapter("bm", "Strategi Menjawab Soalan Pemahaman", undefined, "Form 1")?.form).toBe(
      "Form 1",
    );
    expect(
      getChapter("bm", "Strategi Menjawab Soalan Pemahaman (Lanjutan)", undefined, "Form 2")?.form,
    ).toBe("Form 2");
  });

  it("uses the exact root and title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan3StrategiPemahamanMindMap).toMatchObject({
      id: "bm-f3-strategi-menjawab-soalan-pemahaman-root",
      label: "STRATEGI PEMAHAMAN T3",
      summary:
        "Kuasai proses membaca, menganalisis dan membina jawapan dengan menghubungkan kehendak soalan, maklumat petikan, bukti serta penaakulan yang tepat.",
    });
    expect(
      bahasaMelayuTingkatan3StrategiPemahamanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3StrategiPemahamanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches mature textual analysis, synthesis and authorial purpose", () => {
    expect(branchText("Fahami Petikan")).toContain("Tujuan Penulis");
    expect(branchText("Analisis Kata Tugas")).toContain("Bandingkan");
    expect(branchText("Bezakan Jenis Maklumat")).toContain("Tersurat");
    expect(branchText("Hubungkan Maklumat")).toContain("Contoh Nadia");
    expect(branchText("Analisis Sebab dan Kesan")).toContain("Rantaian Sebab dan Kesan");
    expect(branchText("Buat Inferens")).toContain("Contoh Sarah");
  });

  it("covers multipart, review and the complete guided community-garden example", () => {
    expect(branchText("Soalan Pelbagai Bahagian")).toContain("Contoh Tiga Bahagian");
    expect(branchText("Semak Jawapan")).toContain("Kesalahan yang Perlu Dielakkan");
    const uasa = branchText("Strategi UASA");
    expect(uasa).toContain("BACA–FIKIR–BUKTI");
    expect(uasa).toContain("program kebun komuniti");
    expect(uasa).toContain("Soalan 1 — Tersurat");
    expect(uasa).toContain("Soalan 2 — Inferens + Bukti");
    expect(uasa).toContain("Soalan 3 — KBAT");
  });

  it("supports progressive expansion with unique, non-overlapping nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3StrategiPemahamanMindMap);
    expect(new Set(nodes.map((node) => node.id).values()).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3StrategiPemahamanMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3StrategiPemahamanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3StrategiPemahamanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3StrategiPemahamanMindMap,
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

  it("renders an accessible collapsed mobile learning path", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan3StrategiPemahamanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("STRATEGI PEMAHAMAN T3");
    expect(markup).toContain("Fahami Petikan");
    expect(markup).not.toContain("Bacaan Pertama");
  });
});

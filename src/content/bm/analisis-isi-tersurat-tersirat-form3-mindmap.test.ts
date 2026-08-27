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
import { bahasaMelayuTingkatan3TersuratTersiratMindMap } from "./analisis-isi-tersurat-tersirat-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Bezakan Kedua-duanya",
  "Cari Isi Tersurat",
  "Cari Petunjuk Tersirat",
  "Hubungkan Ayat",
  "Hubungkan Perenggan",
  "Sebab dan Kesan",
  "Sikap dan Niat",
  "Perasaan dan Reaksi",
  "Nilai dan Pengajaran",
  "Inferens Berlapis",
  "Sokong dengan Bukti",
  "Bina Jawapan",
  "Banding Jawapan",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3TersuratTersiratMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Analisis Isi Tersurat dan Tersirat mind map", () => {
  it("registers second with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Analisis Isi Tersurat dan Tersirat",
      "Analisis Petikan Pelbagai Bahan",
      "Menilai Hujah dan Pendapat",
      "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      "Teknik Membuat Rumusan dan Sintesis Maklumat",
      "Kesalahan Lazim dan Strategi Semakan Pemahaman",
    ]);
    const chapter = getChapter("bm", "Analisis Isi Tersurat dan Tersirat", undefined, "Form 3");
    expect(chapter).toMatchObject({
      id: "bm-f3-analisis-isi-tersurat-tersirat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      title: "Analisis Isi Tersurat dan Tersirat",
      description:
        "Menganalisis maklumat langsung dan tersirat, menghubungkan beberapa petunjuk serta membina kesimpulan yang disokong oleh bukti daripada petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3TersuratTersiratMindMap,
        title: "Analisis Isi Tersurat dan Tersirat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3TersuratTersiratMindMap).toMatchObject({
      id: "bm-f3-analisis-isi-tersurat-tersirat-root",
      label: "TERSURAT & TERSIRAT",
      summary:
        "Analisis yang baik membezakan maklumat yang dinyatakan secara langsung daripada maklumat yang perlu disimpulkan melalui petunjuk, hubungan idea dan bukti dalam petikan.",
    });
    expect(
      bahasaMelayuTingkatan3TersuratTersiratMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3TersuratTersiratMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("covers advanced evidence-based analysis without unsupported inference", () => {
    expect(branchText("Bezakan Kedua-duanya")).toContain("Bukan setiap soalan ‘mengapa’");
    expect(branchText("Hubungkan Ayat")).toContain("Ayat A + Ayat B = Kesimpulan");
    expect(branchText("Hubungkan Perenggan")).toContain("Perenggan 4");
    expect(branchText("Sebab dan Kesan")).toContain("Rantaian A → B → C");
    expect(branchText("Sikap dan Niat")).toContain("spekulasi");
    expect(branchText("Perasaan dan Reaksi")).toContain("Konteks");
    expect(branchText("Nilai dan Pengajaran")).toContain("Kita hendaklah");
    expect(branchText("Inferens Berlapis")).toContain("Inferens Segera");
    expect(branchText("Sokong dengan Bukti")).toContain("Bukti Lemah");
    expect(branchText("Banding Jawapan")).toContain("Mengapa Lebih Kuat?");
    expect(branchText("Tip UASA")).toContain("T-B-I");
  });

  it("derives previous and next navigation from the isolated Form 3 registry", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex((topic) => topic.key === "Analisis Isi Tersurat dan Tersirat");
    expect(topics[index - 1]?.key).toBe("Strategi Menjawab Soalan Pemahaman");
    expect(topics[index + 1]?.key).toBe("Analisis Petikan Pelbagai Bahan");
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3TersuratTersiratMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3TersuratTersiratMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3TersuratTersiratMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3TersuratTersiratMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3TersuratTersiratMindMap,
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

  it("renders an accessible collapsed mobile learning path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan3TersuratTersiratMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("TERSURAT &amp; TERSIRAT");
    expect(markup).toContain("Bezakan Kedua-duanya");
    expect(markup).not.toContain("Maklumat dinyatakan secara langsung");
  });
});

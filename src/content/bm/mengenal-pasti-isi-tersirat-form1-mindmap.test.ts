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
import { bahasaMelayuTingkatan1IsiTersiratMindMap } from "./mengenal-pasti-isi-tersirat-form1-mindmap";
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedBranches = [
  "Apa Itu?",
  "Tersurat vs Tersirat",
  "Cari Petunjuk",
  "Tindakan Watak",
  "Perasaan Watak",
  "Sebab dan Akibat",
  "Nilai",
  "Pengajaran",
  "Inferens",
  "Bina Jawapan",
  "Bukti Petikan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const branch = bahasaMelayuTingkatan1IsiTersiratMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!branch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(branch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Mengenal Pasti Isi Tersirat mind map", () => {
  it("remains the third of exactly four registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(4);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Mengenal Pasti Isi Tersurat",
      "Mengenal Pasti Isi Tersirat",
      "Maksud Frasa dan Ungkapan",
    ]);

    const chapter = getChapter("bm", "Mengenal Pasti Isi Tersirat", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-mengenal-pasti-isi-tersirat-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Mengenal Pasti Isi Tersirat",
      title: "Mengenal Pasti Isi Tersirat",
      description:
        "Membuat kesimpulan berdasarkan petunjuk dalam petikan walaupun jawapan tidak dinyatakan secara langsung.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1IsiTersiratMindMap,
        title: "Mengenal Pasti Isi Tersirat",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Mengenal Pasti Isi Tersirat", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersirat",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersurat");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Maksud Frasa dan Ungkapan");

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersirat",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersurat");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Maksud Frasa dan Ungkapan");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1IsiTersiratMindMap).toMatchObject({
      id: "bm-f1-mengenal-pasti-isi-tersirat-root",
      label: "ISI TERSIRAT",
      summary:
        "Isi tersirat ialah maklumat yang tidak dinyatakan secara langsung tetapi boleh difahami melalui petunjuk, tindakan, perasaan dan hubungan antara idea dalam petikan.",
    });
    expect(
      bahasaMelayuTingkatan1IsiTersiratMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1IsiTersiratMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes explicit information, inference, opinion and evidence", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1IsiTersiratMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Tersurat vs Tersirat")).toContain("Isi Tersurat");
    expect(branchText("Tersurat vs Tersirat")).toContain("Isi Tersirat");
    expect(branchText("Tersurat vs Tersirat")).toContain("Bukan semua soalan ‘mengapa’");
    expect(branchText("Apa Itu?")).toContain("Bukan Meneka");
    expect(branchText("Tersurat vs Tersirat")).toContain("Inferens vs Pendapat");
    expect(branchText("Inferens")).toContain("Beberapa jawapan mungkin boleh diterima");
    expect(branchText("Bukti Petikan")).toContain("bukannya imaginasi");
    expect(branchText("Kesalahan Lazim")).toContain("Pengetahuan sendiri");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports feelings, causes and effects with passage clues", () => {
    expect(branchText("Perasaan Watak")).toContain("ekspresi wajah, tindakan, dialog");
    expect(branchText("Perasaan Watak")).toContain("tersenyum lebar");
    expect(branchText("Sebab dan Akibat")).toContain("Jalan raya basah");
    expect(branchText("Sebab dan Akibat")).toContain("keputusan yang kurang baik");
    expect(branchText("Cari Petunjuk")).toContain("Hubungan Idea");
  });

  it("keeps values and lessons distinct", () => {
    expect(branchText("Nilai")).toContain("sifat positif");
    expect(branchText("Nilai")).toContain("Kejujuran");
    expect(branchText("Pengajaran")).toContain("perkara baik yang boleh dipelajari");
    expect(branchText("Pengajaran")).toContain("Kita hendaklah rajin berusaha");
    expect(branchText("Teknik Mengingat")).toContain("Nilai ialah satu sifat");
    expect(branchText("Teknik Mengingat")).toContain("pengajaran ialah ayat nasihat");
  });

  it("prevents unsupported additions and preserves passage facts", () => {
    expect(branchText("Inferens")).toContain("Jangan Terlalu Jauh");
    expect(branchText("Bukti Petikan")).toContain("Jangan Cipta Bukti");
    expect(branchText("Kesalahan Lazim")).toContain("Jangan ubah orang, tindakan atau peristiwa");
    expect(branchText("Bina Jawapan")).toContain("Inferens");
    expect(branchText("Bina Jawapan")).toContain("+ Bukti");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1IsiTersiratMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1IsiTersiratMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1IsiTersiratMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1IsiTersiratMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan1IsiTersiratMindMap, expanded);
    expect(layout.positions.size).toBe(nodes.length);

    const positions = Array.from(layout.positions.entries());
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

  it("renders a collapsed mobile learning path without horizontal overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1IsiTersiratMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("ISI TERSIRAT");
    expect(markup).toContain("Tersurat vs Tersirat");
    expect(markup).not.toContain("Jalan raya basah dan beberapa orang membawa payung");
  });
});

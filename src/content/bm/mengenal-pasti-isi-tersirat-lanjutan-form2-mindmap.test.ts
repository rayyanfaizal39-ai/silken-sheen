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
import { bahasaMelayuTingkatan2IsiTersiratMindMap } from "./mengenal-pasti-isi-tersirat-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
  "Mengenal Pasti Isi Tersurat (Lanjutan)",
  "Mengenal Pasti Isi Tersirat (Lanjutan)",
];

const expectedBranches = [
  "Apa Itu?",
  "Tersurat vs Tersirat",
  "Cari Petunjuk",
  "Hubungkan Idea",
  "Tindakan dan Sikap",
  "Perasaan dan Reaksi",
  "Sebab dan Kesan",
  "Inferens Merentas Perenggan",
  "Nilai dan Pengajaran",
  "Rumusan Inferens",
  "Sokong dengan Bukti",
  "Bina Jawapan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2IsiTersiratMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Mengenal Pasti Isi Tersirat Lanjutan mind map", () => {
  it("is the third and final topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(3);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Mengenal Pasti Isi Tersirat (Lanjutan)", undefined, "Form 2");
    expect(chapter).toMatchObject({
      id: "bm-f2-mengenal-pasti-isi-tersirat-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Mengenal Pasti Isi Tersirat (Lanjutan)",
      title: "Mengenal Pasti Isi Tersirat (Lanjutan)",
      description:
        "Membuat inferens yang lebih matang dengan menghubungkan petunjuk, tindakan, sebab, kesan dan maklumat daripada beberapa bahagian petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2IsiTersiratMindMap,
        title: "Mengenal Pasti Isi Tersirat (Lanjutan)",
      },
    });
    expect(
      hasResourceContent("bm", "Form 2", "Mengenal Pasti Isi Tersirat (Lanjutan)", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to Isi Tersurat Lanjutan and has no future topic", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersirat (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersurat (Lanjutan)");
    expect(topics[activeIndex + 1]).toBeUndefined();
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2IsiTersiratMindMap).toMatchObject({
      id: "bm-f2-mengenal-pasti-isi-tersirat-lanjutan-root",
      label: "ISI TERSIRAT LANJUTAN",
      summary:
        "Isi tersirat ialah maklumat yang tidak dinyatakan secara langsung tetapi dapat disimpulkan melalui petunjuk, hubungan idea dan bukti daripada petikan.",
    });
    expect(
      bahasaMelayuTingkatan2IsiTersiratMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2IsiTersiratMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes direct information from supported inference", () => {
    const text = branchText("Tersurat vs Tersirat");
    expect(text).toContain("Farah tetap hadir ke sekolah");
    expect(text).toContain("rajin dan bertanggungjawab");
    expect(text).toContain("menyokong kedua-dua sifat");
    expect(text).toContain("tidak semestinya meminta inferens");
  });

  it("builds mature inferences from multiple clues and context", () => {
    expect(branchText("Cari Petunjuk")).toContain("beberapa petunjuk");
    expect(branchText("Hubungkan Idea")).toContain("Petunjuk 1");
    expect(branchText("Hubungkan Idea")).toContain("+ Konteks");
    expect(branchText("Hubungkan Idea")).toContain("Usaha yang konsisten");
  });

  it("covers actions, flexible feelings and implied cause-effect without invented facts", () => {
    expect(branchText("Tindakan dan Sikap")).toContain("Memulangkan Dompet");
    expect(branchText("Perasaan dan Reaksi")).toContain("Bukan Satu Emosi Tetap");
    expect(branchText("Sebab dan Kesan")).toContain("ribut atau angin kuat");
    expect(branchText("Sebab dan Kesan")).toContain("Jangan mencipta tarikh");
  });

  it("connects evidence across paragraphs into a supported conclusion", () => {
    const text = branchText("Inferens Merentas Perenggan");
    expect(text).toContain("Perenggan 1");
    expect(text).toContain("Perenggan 3");
    expect(text).toContain("berdisiplin dan dipercayai");
    expect(text).toContain("Tafsir Bersama");
  });

  it("clearly separates values, lessons and inference summaries", () => {
    const values = branchText("Nilai dan Pengajaran");
    expect(values).toContain("Nilai menamakan sifat");
    expect(values).toContain("Kita hendaklah membantu jiran");
    expect(branchText("Rumusan Inferens")).toContain("kempen kitar semula");
    expect(branchText("Rumusan Inferens")).toContain("meningkatkan kesedaran murid");
  });

  it("requires factual evidence and provides answer structures", () => {
    expect(branchText("Sokong dengan Bukti")).toContain("Inferens + Bukti");
    expect(branchText("Sokong dengan Bukti")).toContain("berasal daripada petikan");
    expect(branchText("Bina Jawapan")).toContain("Inferens");
    expect(branchText("Bina Jawapan")).toContain("+ Alasan / Bukti");
    expect(branchText("Bina Jawapan")).toContain("Kita hendaklah…");
  });

  it("includes PETUNJUK and safe UASA guidance", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2IsiTersiratMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kesalahan Lazim")).toContain("Meneka Tanpa Bukti");
    expect(branchText("Teknik Mengingat")).toContain("Rumus PETUNJUK");
    expect(branchText("Teknik Mengingat")).toContain("U — Uji dengan bukti");
    expect(branchText("Tip UASA")).toContain("Ikut Arahan Semasa");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2IsiTersiratMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2IsiTersiratMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2IsiTersiratMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2IsiTersiratMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan2IsiTersiratMindMap, expanded);
    const positions = Array.from(layout.positions.entries());
    expect(positions).toHaveLength(nodes.length);
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

  it("renders an accessible collapsed mobile path without child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan2IsiTersiratMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("ISI TERSIRAT LANJUTAN");
    expect(markup).toContain("Inferens Merentas Perenggan");
    expect(markup).not.toContain("Perenggan 3");
  });
});

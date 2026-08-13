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
import { bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap } from "./maksud-frasa-ungkapan-form1-mindmap";
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedBranches = [
  "Apa Itu?",
  "Perkataan",
  "Frasa",
  "Ungkapan",
  "Konteks Ayat",
  "Kata Seerti",
  "Makna Literal",
  "Makna Kiasan",
  "Petunjuk Sekeliling",
  "Cara Menjawab",
  "Bina Ayat Ganti",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const branch = bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!branch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(branch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Maksud Frasa dan Ungkapan mind map", () => {
  it("remains the fourth of exactly eight registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Mengenal Pasti Isi Tersurat",
      "Mengenal Pasti Isi Tersirat",
      "Maksud Frasa dan Ungkapan",
      "Menjawab Soalan KBAT",
      "Membuat Rumusan Ringkas",
      "Teknik Menggunakan Bukti daripada Petikan",
      "Kesalahan Lazim dalam Pemahaman",
    ]);

    const chapter = getChapter("bm", "Maksud Frasa dan Ungkapan", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-maksud-frasa-ungkapan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Maksud Frasa dan Ungkapan",
      title: "Maksud Frasa dan Ungkapan",
      description:
        "Menentukan maksud perkataan, frasa dan ungkapan berdasarkan konteks ayat dan petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap,
        title: "Maksud Frasa dan Ungkapan",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Maksud Frasa dan Ungkapan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Maksud Frasa dan Ungkapan",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersirat");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Menjawab Soalan KBAT");

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Maksud Frasa dan Ungkapan",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersirat");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Menjawab Soalan KBAT");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap).toMatchObject({
      id: "bm-f1-maksud-frasa-ungkapan-root",
      label: "MAKSUD DALAM KONTEKS",
      summary:
        "Maksud perkataan, frasa dan ungkapan perlu ditentukan berdasarkan penggunaannya dalam ayat atau petikan, bukan berdasarkan hafalan semata-mata.",
    });
    expect(
      bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes words, phrases and expressions", () => {
    expect(branchText("Perkataan")).toContain("Satu perkataan");
    expect(branchText("Perkataan")).toContain("Semak Golongan Kata");
    expect(branchText("Frasa")).toContain("gabungan dua atau lebih perkataan");
    expect(branchText("Frasa")).toContain("Jawab Keseluruhan Frasa");
    expect(branchText("Ungkapan")).toContain("rangkaian kata");
    expect(branchText("Ungkapan")).toContain("kadangkala bersifat kiasan");
  });

  it("distinguishes literal and figurative meaning from context", () => {
    expect(branchText("Makna Literal")).toContain("makna langsung");
    expect(branchText("Makna Literal")).toContain("Ali menulis menggunakan tangan kanan");
    expect(branchText("Makna Kiasan")).toContain("makna tidak langsung");
    expect(branchText("Makna Kiasan")).toContain("orang kepercayaan utama");
    expect(branchText("Konteks Ayat")).toContain("maklumat sekeliling");
    expect(branchText("Konteks Ayat")).toContain("Baca Ayat Sebelum dan Selepas");
  });

  it("treats synonyms as contextual rather than fully interchangeable", () => {
    expect(branchText("Kata Seerti")).toContain("makna hampir sama");
    expect(branchText("Kata Seerti")).toContain("bergantung pada konteks");
    expect(branchText("Kata Seerti")).toContain("Tidak Semestinya Sama Sepenuhnya");
    expect(branchText("Kata Seerti")).toContain("Jika maksud berubah");
  });

  it("uses replacement sentences to preserve meaning and grammar", () => {
    expect(branchText("Bina Ayat Ganti")).toContain("Rina rajin membantu");
    expect(branchText("Bina Ayat Ganti")).toContain("memberikan kesedaran kepada masyarakat");
    expect(branchText("Bina Ayat Ganti")).toContain("Maksud ayat kekal");
    expect(branchText("Bina Ayat Ganti")).toContain("Ayat ganti mesti kekal gramatis");
    expect(branchText("Bina Ayat Ganti")).toContain("Kekalkan orang, tindakan, masa, tempat");
  });

  it("avoids inaccurate contextual-meaning shortcuts", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Apa Itu?")).toContain("Bukan Hafalan Sahaja");
    expect(branchText("Ungkapan")).toContain("Jangan Terjemah Perkataan Satu-satu");
    expect(branchText("Makna Literal")).toContain("Jangan anggap setiap frasa");
    expect(branchText("Kesalahan Lazim")).toContain("Salin Frasa Asal");
    expect(branchText("Cara Menjawab")).toContain("Jangan Huraikan Terlalu Panjang");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat)/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap,
      expanded,
    );
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
        data: bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("MAKSUD DALAM KONTEKS");
    expect(markup).toContain("Makna Kiasan");
    expect(markup).not.toContain("Farid menjadi tangan kanan pengurus syarikat itu");
  });
});

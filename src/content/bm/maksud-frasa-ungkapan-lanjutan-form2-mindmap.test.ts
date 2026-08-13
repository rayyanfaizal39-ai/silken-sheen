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
import { bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap } from "./maksud-frasa-ungkapan-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
  "Mengenal Pasti Isi Tersurat (Lanjutan)",
  "Mengenal Pasti Isi Tersirat (Lanjutan)",
  "Maksud Frasa dan Ungkapan (Lanjutan)",
];

const expectedBranches = [
  "Apa Itu?",
  "Makna Mengikut Konteks",
  "Frasa Kompleks",
  "Ungkapan Kiasan",
  "Sinonim Kontekstual",
  "Antonim sebagai Petunjuk",
  "Nada dan Sikap",
  "Petunjuk Sebelum dan Selepas",
  "Maksud Merentas Perenggan",
  "Uji Makna",
  "Bina Jawapan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Maksud Frasa dan Ungkapan Lanjutan mind map", () => {
  it("is the fourth and final topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(4);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Maksud Frasa dan Ungkapan (Lanjutan)", undefined, "Form 2");
    expect(chapter).toMatchObject({
      id: "bm-f2-maksud-frasa-ungkapan-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Maksud Frasa dan Ungkapan (Lanjutan)",
      title: "Maksud Frasa dan Ungkapan (Lanjutan)",
      description:
        "Menentukan makna perkataan, frasa dan ungkapan yang lebih kompleks melalui konteks, petunjuk bahasa dan hubungan idea dalam petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap,
        title: "Maksud Frasa dan Ungkapan (Lanjutan)",
      },
    });
    expect(
      hasResourceContent("bm", "Form 2", "Maksud Frasa dan Ungkapan (Lanjutan)", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to Isi Tersirat Lanjutan and has no future topic", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Maksud Frasa dan Ungkapan (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Mengenal Pasti Isi Tersirat (Lanjutan)");
    expect(topics[activeIndex + 1]).toBeUndefined();
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap).toMatchObject({
      id: "bm-f2-maksud-frasa-ungkapan-lanjutan-root",
      label: "MAKSUD DALAM KONTEKS LANJUTAN",
      summary:
        "Maksud sesuatu perkataan, frasa atau ungkapan perlu ditentukan melalui konteks ayat, hubungan idea, nada dan petunjuk di sekelilingnya.",
    });
    expect(
      bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches polysemy and makes context—not dictionary meaning—the deciding factor", () => {
    expect(branchText("Apa Itu?")).toContain("Kamus Bukan Penentu Tunggal");
    const context = branchText("Makna Mengikut Konteks");
    expect(context).toContain("Pisau itu sangat tajam");
    expect(context).toContain("Kritikannya sangat tajam");
    expect(context).toContain("makna berlainan");
  });

  it("interprets whole complex phrases without word-by-word translation", () => {
    const text = branchText("Frasa Kompleks");
    expect(text).toContain("memberikan peluang");
    expect(text).toContain("melaksanakan kewajipan");
    expect(text).toContain("mencapai persetujuan");
    expect(text).toContain("bukan diterjemahkan satu demi satu");
  });

  it("distinguishes figurative meaning from literal meaning", () => {
    const text = branchText("Ungkapan Kiasan");
    expect(text).toContain("Buah Fikiran");
    expect(text).toContain("Jalan Buntu");
    expect(text).toContain("Tulang Belakang");
    expect(text).toContain("Bukan Semua Frasa Kiasan");
  });

  it("uses contextual synonyms and antonym clues carefully", () => {
    expect(branchText("Sinonim Kontekstual")).toContain("Tidak Boleh Ditukar Sesuka Hati");
    expect(branchText("Sinonim Kontekstual")).toContain("mengatasi atau menyelesaikan");
    const antonyms = branchText("Antonim sebagai Petunjuk");
    expect(antonyms).toContain("Berbeza dengan adiknya yang pemalu");
    expect(antonyms).toContain("tetapi, sebaliknya, berbeza, walaupun dan namun");
  });

  it("uses tone and nearby context without over-interpreting", () => {
    expect(branchText("Nada dan Sikap")).toContain("negatif, mengejek atau menyindir");
    expect(branchText("Nada dan Sikap")).toContain("Jangan Tafsir Berlebihan");
    const nearby = branchText("Petunjuk Sebelum dan Selepas");
    expect(nearby).toContain("cakna terhadap kebersihan");
    expect(nearby).toContain("Prihatin atau mengambil berat");
  });

  it("supports cross-paragraph context and a replacement test", () => {
    const crossParagraph = branchText("Maksud Merentas Perenggan");
    expect(crossParagraph).toContain("Perenggan 1");
    expect(crossParagraph).toContain("Perenggan 2");
    expect(crossParagraph).toContain("pemangkin perubahan");
    const testMeaning = branchText("Uji Makna");
    expect(testMeaning).toContain("Program itu membuka ruang");
    expect(testMeaning).toContain("Program itu memberi peluang");
    expect(testMeaning).toContain("konteks keseluruhan petikan");
  });

  it("provides clear answers, KONTEKS and safe UASA guidance", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Bina Jawapan")).toContain("Maksud frasa ‘membuka ruang’");
    expect(branchText("Kesalahan Lazim")).toContain("Guna Maksud Kamus Sahaja");
    expect(branchText("Teknik Mengingat")).toContain("Rumus KONTEKS");
    expect(branchText("Teknik Mengingat")).toContain("S — Semak dengan ayat ganti");
    expect(branchText("Tip UASA")).toContain("Ikut Arahan Semasa");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap,
      expanded,
    );
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

  it("renders an accessible collapsed mobile path with wrapping and no child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("break-words");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("MAKSUD DALAM KONTEKS LANJUTAN");
    expect(markup).toContain("Petunjuk Sebelum dan Selepas");
    expect(markup).not.toContain("Prihatin atau mengambil berat");
  });
});

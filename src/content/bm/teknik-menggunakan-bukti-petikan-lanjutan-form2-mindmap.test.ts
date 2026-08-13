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
import { bahasaMelayuTingkatan2BuktiPetikanMindMap } from "./teknik-menggunakan-bukti-petikan-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
  "Mengenal Pasti Isi Tersurat (Lanjutan)",
  "Mengenal Pasti Isi Tersirat (Lanjutan)",
  "Maksud Frasa dan Ungkapan (Lanjutan)",
  "Menjawab Soalan KBAT (Lanjutan)",
  "Membuat Rumusan Ringkas (Lanjutan)",
  "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
  "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
];

const expectedBranches = [
  "Apa Itu Bukti?",
  "Mengapa Bukti Penting",
  "Cari Bukti Tepat",
  "Bukti Merentas Ayat",
  "Bukti Merentas Perenggan",
  "Bukti untuk Tersurat",
  "Bukti untuk Tersirat",
  "Bukti untuk KBAT",
  "Gabungkan Bukti",
  "Olah Bukti",
  "Bina Jawapan",
  "Nilai Kekuatan Bukti",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2BuktiPetikanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Teknik Menggunakan Bukti Petikan Lanjutan mind map", () => {
  it("remains the seventh topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter(
      "bm",
      "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
      undefined,
      "Form 2",
    );
    expect(chapter).toMatchObject({
      id: "bm-f2-teknik-menggunakan-bukti-petikan-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
      title: "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
      description:
        "Memilih, menghubungkan dan menggunakan bukti daripada beberapa bahagian petikan untuk menyokong jawapan dengan tepat dan meyakinkan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2BuktiPetikanMindMap,
        title: "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
      },
    });
    expect(
      hasResourceContent(
        "bm",
        "Form 2",
        "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
        "mindMap",
      ),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to Rumusan Lanjutan and forward to Kesalahan Pemahaman Lanjutan", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Membuat Rumusan Ringkas (Lanjutan)");
    expect(topics[activeIndex + 1]?.key).toBe("Kesalahan Lazim dalam Pemahaman (Lanjutan)");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2BuktiPetikanMindMap).toMatchObject({
      id: "bm-f2-teknik-menggunakan-bukti-petikan-lanjutan-root",
      label: "BUKTI PETIKAN LANJUTAN",
      summary:
        "Bukti daripada petikan digunakan untuk menyokong jawapan secara tepat. Pada Tingkatan 2, murid perlu memilih bukti paling relevan, menghubungkan beberapa petunjuk dan mengolahnya tanpa mengubah fakta asal.",
    });
    expect(
      bahasaMelayuTingkatan2BuktiPetikanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2BuktiPetikanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes an answer from its supporting evidence", () => {
    const importance = branchText("Mengapa Bukti Penting");
    expect(importance).toContain("Rina seorang yang prihatin");
    expect(importance).toContain("membantu jirannya yang sakit");
    expect(branchText("Bina Jawapan")).toContain("Jawapan dan Bukti Berbeza Peranan");
    expect(branchText("Apa Itu Bukti?")).toContain("Bukan Salin Perenggan");
  });

  it("covers evidence across sentences and paragraphs without unrelated combinations", () => {
    const sentences = branchText("Bukti Merentas Ayat");
    expect(sentences).toContain("Lebih 300 orang murid");
    expect(sentences).toContain("satu ayat menyatakan dakwaan");
    const paragraphs = branchText("Bukti Merentas Perenggan");
    expect(paragraphs).toContain("Perenggan 1");
    expect(paragraphs).toContain("Perenggan 3");
    expect(paragraphs).toContain("berdisiplin dan dipercayai");
    expect(paragraphs).toContain("Elakkan Gabungan Rawak");
  });

  it("differentiates direct, inferential and contextual KBAT support", () => {
    expect(branchText("Bukti untuk Tersurat")).toContain("Maklumat Dinyatakan Langsung");
    const inferred = branchText("Bukti untuk Tersirat");
    expect(inferred).toContain("Inferens + Bukti");
    expect(inferred).toContain("Farah seorang yang ringan tulang");
    const kbat = branchText("Bukti untuk KBAT");
    expect(kbat).toContain("Tidak Semestinya Petikan Langsung");
    expect(kbat).toContain("Bukti Tekstual");
    expect(kbat).toContain("Sokongan Kontekstual");
  });

  it("combines sufficient clues, paraphrases accurately, and evaluates evidence strength", () => {
    expect(branchText("Gabungkan Bukti")).toContain("Jangan senaraikan setiap petunjuk");
    const paraphrase = branchText("Olah Bukti");
    expect(paraphrase).toContain("Penduduk bekerjasama membersihkan");
    expect(paraphrase).toContain("Bukan Tukar Setiap Perkataan");
    const strength = branchText("Nilai Kekuatan Bukti");
    expect(strength).toContain("meningkat daripada 80 kepada 200 orang");
    expect(strength).toContain("diadakan pada hari Sabtu");
    expect(strength).toContain("Satu bukti kukuh lebih berguna");
  });

  it("includes common errors, Malay memory checks, and safe UASA advice", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2BuktiPetikanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kesalahan Lazim")).toContain("Bukti Tanpa Jawapan");
    expect(branchText("Kesalahan Lazim")).toContain("Anggap Semua KBAT Perlu Petikan Langsung");
    expect(branchText("Teknik Mengingat")).toContain("Rumus BUKTI");
    expect(branchText("Teknik Mengingat")).toContain("Semakan 3S");
    expect(branchText("Teknik Mengingat")).toContain("Sesuai");
    expect(branchText("Teknik Mengingat")).toContain("Tepat");
    expect(branchText("Teknik Mengingat")).toContain("Mencukupi");
    expect(branchText("Tip UASA")).toContain("setiap jawapan mesti mengandungi petikan langsung");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|bukti|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2BuktiPetikanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2BuktiPetikanMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2BuktiPetikanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2BuktiPetikanMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan2BuktiPetikanMindMap, expanded);
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
        data: bahasaMelayuTingkatan2BuktiPetikanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("break-words");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("BUKTI PETIKAN LANJUTAN");
    expect(markup).toContain("Bukti Merentas Perenggan");
    expect(markup).not.toContain("Jurulatih memilih Amir sebagai ketua pasukan");
  });
});

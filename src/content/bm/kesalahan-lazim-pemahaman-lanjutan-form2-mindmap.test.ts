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
import { bahasaMelayuTingkatan2KesalahanPemahamanMindMap } from "./kesalahan-lazim-pemahaman-lanjutan-form2-mindmap";
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
  "Salah Faham Soalan",
  "Salah Pilih Isi",
  "Tersurat vs Tersirat",
  "Inferens Tanpa Bukti",
  "Bukti Tidak Tepat",
  "Salin Berlebihan",
  "Jawapan Tidak Lengkap",
  "KBAT Tidak Logik",
  "Maksud Frasa Salah",
  "Rumusan Lemah",
  "Kesalahan Bahasa",
  "Fakta Berubah",
  "Cara Membetulkan",
  "Senarai Semak",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2KesalahanPemahamanMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Kesalahan Lazim Pemahaman Lanjutan mind map", () => {
  it("is the eighth and final topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    const chapter = getChapter(
      "bm",
      "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
      undefined,
      "Form 2",
    );
    expect(chapter).toMatchObject({
      id: "bm-f2-kesalahan-lazim-pemahaman-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
      title: "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
      description:
        "Mengenal pasti kesalahan teknik menjawab, penggunaan bukti, inferens dan bahasa yang sering menyebabkan jawapan pemahaman menjadi tidak tepat.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2KesalahanPemahamanMindMap,
        title: "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
      },
    });
    expect(
      hasResourceContent("bm", "Form 2", "Kesalahan Lazim dalam Pemahaman (Lanjutan)", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to Bukti Petikan Lanjutan and has no future topic", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Kesalahan Lazim dalam Pemahaman (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe(
      "Teknik Menggunakan Bukti daripada Petikan (Lanjutan)",
    );
    expect(topics[activeIndex + 1]).toBeUndefined();
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2KesalahanPemahamanMindMap).toMatchObject({
      id: "bm-f2-kesalahan-lazim-pemahaman-lanjutan-root",
      label: "KESALAHAN PEMAHAMAN T2",
      summary:
        "Kesalahan dalam pemahaman sering berlaku apabila murid tersalah mentafsir soalan, memilih bukti yang tidak tepat, membuat inferens tanpa sokongan atau membina jawapan yang tidak lengkap.",
    });
    expect(
      bahasaMelayuTingkatan2KesalahanPemahamanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2KesalahanPemahamanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("diagnoses question-focus and main-idea selection errors", () => {
    const question = branchText("Salah Faham Soalan");
    expect(question).toContain("Soalan meminta tindakan");
    expect(question).toContain("mengurangkan penggunaan plastik");
    const ideas = branchText("Salah Pilih Isi");
    expect(ideas).toContain("lokasi perpustakaan");
    expect(ideas).toContain("Fokus Soalan");
  });

  it("contrasts explicit action, supported inference, and strong evidence", () => {
    expect(branchText("Tersurat vs Tersirat")).toContain("rajin dan berdisiplin");
    expect(branchText("Inferens Tanpa Bukti")).toContain("Rina seorang yang prihatin");
    const evidence = branchText("Bukti Tidak Tepat");
    expect(evidence).toContain("Bukti Lemah");
    expect(evidence).toContain("meningkat daripada 100 kepada 250 orang");
  });

  it("corrects excessive copying, incomplete answers, and illogical KBAT", () => {
    expect(branchText("Salin Berlebihan")).toContain("Bagaimanakah perasaan Ali?");
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Murid perlu bersenam");
    const kbat = branchText("KBAT Tidak Logik");
    expect(kbat).toContain("sejuta ringgit");
    expect(kbat).toContain("program membaca yang menarik");
    expect(kbat).toContain("Pandangan Boleh Berbeza");
  });

  it("covers phrase, summary, language, and fact-changing errors", () => {
    expect(branchText("Maksud Frasa Salah")).toContain("Memberikan peluang");
    expect(branchText("Rumusan Lemah")).toContain("meningkatkan kemahiran berfikir");
    expect(branchText("Kesalahan Bahasa")).toContain(
      "Murid perlu bersenam untuk menjaga kesihatan",
    );
    const facts = branchText("Fakta Berubah");
    expect(facts).toContain("Sebahagian murid");
    expect(facts).toContain("Mungkin ≠ Pasti");
  });

  it("provides correction steps, BETUL, 3T, a final checklist, and safe UASA advice", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2KesalahanPemahamanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    const correction = branchText("Cara Membetulkan");
    expect(correction).toContain("Rumus BETUL");
    expect(correction).toContain("Semakan 3T");
    expect(correction).toContain("Tepat");
    expect(correction).toContain("Terkait");
    expect(correction).toContain("Terbukti");
    expect(branchText("Senarai Semak")).toContain("Saya sudah membaca semula jawapan");
    expect(branchText("Tip UASA")).toContain("formula yang menjamin skor");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2KesalahanPemahamanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2KesalahanPemahamanMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2KesalahanPemahamanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2KesalahanPemahamanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan2KesalahanPemahamanMindMap, expanded).positions,
    );
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
        data: bahasaMelayuTingkatan2KesalahanPemahamanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("break-words");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KESALAHAN PEMAHAMAN T2");
    expect(markup).toContain("Cara Membetulkan");
    expect(markup).not.toContain("Program itu berjaya kerana jumlah penyertaan meningkat");
  });
});

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
import { bahasaMelayuTingkatan2IsiTersuratMindMap } from "./mengenal-pasti-isi-tersurat-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
  "Mengenal Pasti Isi Tersurat (Lanjutan)",
  "Mengenal Pasti Isi Tersirat (Lanjutan)",
  "Maksud Frasa dan Ungkapan (Lanjutan)",
  "Menjawab Soalan KBAT (Lanjutan)",
];

const expectedBranches = [
  "Apa Itu?",
  "Bezakan Maklumat Penting",
  "Kata Kunci Soalan",
  "Cari Bukti Tepat",
  "Maklumat Merentas Ayat",
  "Maklumat Merentas Perenggan",
  "Sebab dan Kesan",
  "Perbandingan",
  "Maklumat daripada Bahan",
  "Bina Jawapan",
  "Olah Bahasa",
  "Semak Ketepatan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2IsiTersuratMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Mengenal Pasti Isi Tersurat Lanjutan mind map", () => {
  it("remains the second topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(5);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Mengenal Pasti Isi Tersurat (Lanjutan)", undefined, "Form 2");
    expect(chapter).toMatchObject({
      id: "bm-f2-mengenal-pasti-isi-tersurat-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Mengenal Pasti Isi Tersurat (Lanjutan)",
      title: "Mengenal Pasti Isi Tersurat (Lanjutan)",
      description:
        "Menganalisis maklumat yang dinyatakan secara langsung dalam petikan yang lebih panjang dan memilih bukti yang paling tepat mengikut kehendak soalan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2IsiTersuratMindMap,
        title: "Mengenal Pasti Isi Tersurat (Lanjutan)",
      },
    });
    expect(
      hasResourceContent("bm", "Form 2", "Mengenal Pasti Isi Tersurat (Lanjutan)", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to the strategy topic and forward to Isi Tersirat Lanjutan", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Mengenal Pasti Isi Tersurat (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Strategi Menjawab Soalan Pemahaman (Lanjutan)");
    expect(topics[activeIndex + 1]?.key).toBe("Mengenal Pasti Isi Tersirat (Lanjutan)");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2IsiTersuratMindMap).toMatchObject({
      id: "bm-f2-mengenal-pasti-isi-tersurat-lanjutan-root",
      label: "ISI TERSURAT LANJUTAN",
      summary:
        "Isi tersurat ialah maklumat yang dinyatakan secara jelas dalam petikan. Pada Tingkatan 2, murid perlu mengenal pasti maklumat yang tepat daripada petikan yang lebih panjang, menghubungkan beberapa ayat dan memilih bukti yang benar-benar menjawab soalan.",
    });
    expect(
      bahasaMelayuTingkatan2IsiTersuratMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2IsiTersuratMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches evidence across nearby sentences and separate paragraphs", () => {
    expect(branchText("Maklumat Merentas Ayat")).toContain("Seramai 200 orang penduduk");
    expect(branchText("Maklumat Merentas Ayat")).toContain("Semak Rujukan");
    expect(branchText("Maklumat Merentas Perenggan")).toContain("Perenggan 1");
    expect(branchText("Maklumat Merentas Perenggan")).toContain("Perenggan 3");
    expect(branchText("Maklumat Merentas Perenggan")).toContain("Kira makna");
  });

  it("matches synonyms and distinguishes relevant facts from examples", () => {
    expect(branchText("Kata Kunci Soalan")).toContain("faedah");
    expect(branchText("Kata Kunci Soalan")).toContain("manfaat");
    expect(branchText("Bezakan Maklumat Penting")).toContain("Idea Utama");
    expect(branchText("Bezakan Maklumat Penting")).toContain("Contoh Tambahan");
    expect(branchText("Bezakan Maklumat Penting")).toContain("Bukan Jawapan");
  });

  it("separates cause, effect, similarity and difference accurately", () => {
    expect(branchText("Sebab dan Kesan")).toContain("Sebab menerangkan mengapa");
    expect(branchText("Sebab dan Kesan")).toContain("Kesan Banjir");
    expect(branchText("Perbandingan")).toContain("persamaan atau perbezaan");
    expect(branchText("Perbandingan")).toContain("Jangan Tambah Penilaian");
  });

  it("handles explicit text and visual information without over-inferring", () => {
    const text = branchText("Maklumat daripada Bahan");
    expect(text).toContain("Bahan Teks");
    expect(text).toContain("Bahan Visual");
    expect(text).toContain("poster, infografik, ilustrasi, iklan atau carta");
    expect(text).toContain("Jangan Tafsir Berlebihan");
  });

  it("preserves facts during paraphrasing and prevents duplicated answers", () => {
    expect(branchText("Olah Bahasa")).toContain("Kekalkan Fakta");
    expect(branchText("Olah Bahasa")).toContain("Utamakan ketepatan");
    expect(branchText("Semak Ketepatan")).toContain("Semak Duplikasi");
    expect(branchText("Kesalahan Lazim")).toContain("Ulang Isi Sama");
    expect(branchText("Kesalahan Lazim")).toContain("Tambah Pendapat Sendiri");
  });

  it("includes TEPAT, BUKTI and safe UASA guidance", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2IsiTersuratMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Teknik Mengingat")).toContain("Rumus TEPAT");
    expect(branchText("Teknik Mengingat")).toContain("Empat? Dua? Semak bilangan isi");
    expect(branchText("Teknik Mengingat")).toContain("Rumus BUKTI");
    expect(branchText("Tip UASA")).toContain("Tiada Formula Markah Tetap");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2IsiTersuratMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2IsiTersuratMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2IsiTersuratMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2IsiTersuratMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan2IsiTersuratMindMap, expanded);
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
        data: bahasaMelayuTingkatan2IsiTersuratMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("ISI TERSURAT LANJUTAN");
    expect(markup).toContain("Maklumat Merentas Perenggan");
    expect(markup).not.toContain("Perenggan 3");
  });
});

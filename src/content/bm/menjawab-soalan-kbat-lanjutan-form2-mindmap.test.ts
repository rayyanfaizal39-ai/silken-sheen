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
import { bahasaMelayuTingkatan2KbatMindMap } from "./menjawab-soalan-kbat-lanjutan-form2-mindmap";
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
];

const expectedBranches = [
  "Apa Itu KBAT?",
  "Kenal Pasti Kehendak",
  "Jenis Soalan KBAT",
  "Hubungkan dengan Petikan",
  "Berikan Alasan",
  "Cadangkan Langkah",
  "Ramalkan Kesan",
  "Buat Penilaian",
  "Penyelesaian Masalah",
  "Bina Jawapan Matang",
  "Contoh KBAT",
  "Semak Logik",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2KbatMindMap.children?.find(
    (branch) => branch.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Menjawab Soalan KBAT Lanjutan mind map", () => {
  it("remains the fifth topic in the exact Form 2 Pemahaman registry", () => {
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(7);
    expect(bahasaMelayuTingkatan2PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Menjawab Soalan KBAT (Lanjutan)", undefined, "Form 2");
    expect(chapter).toMatchObject({
      id: "bm-f2-menjawab-soalan-kbat-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Menjawab Soalan KBAT (Lanjutan)",
      title: "Menjawab Soalan KBAT (Lanjutan)",
      description:
        "Mengembangkan jawapan KBAT secara logik dengan menghubungkan petikan, pengetahuan, alasan, kesan dan cadangan yang relevan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan2KbatMindMap,
        title: "Menjawab Soalan KBAT (Lanjutan)",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Menjawab Soalan KBAT (Lanjutan)", "mindMap")).toBe(
      true,
    );
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("links back to Maksud Frasa Lanjutan and forward to Rumusan Lanjutan", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const activeIndex = topics.findIndex(
      (topic) => topic.key === "Menjawab Soalan KBAT (Lanjutan)",
    );
    expect(topics[activeIndex - 1]?.key).toBe("Maksud Frasa dan Ungkapan (Lanjutan)");
    expect(topics[activeIndex + 1]?.key).toBe("Membuat Rumusan Ringkas (Lanjutan)");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan2KbatMindMap).toMatchObject({
      id: "bm-f2-menjawab-soalan-kbat-lanjutan-root",
      label: "KBAT LANJUTAN",
      summary:
        "Soalan KBAT memerlukan murid berfikir melangkaui maklumat langsung dalam petikan dengan memberikan idea yang munasabah, relevan dan disokong oleh alasan yang jelas.",
    });
    expect(bahasaMelayuTingkatan2KbatMindMap.children?.map((branch) => branch.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2KbatMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("differentiates command words and does not teach KBAT as guessing", () => {
    expect(branchText("Apa Itu KBAT?")).toContain("Bukan Teka");
    const commands = branchText("Kenal Pasti Kehendak");
    for (const command of [
      "Mengapakah?",
      "Bagaimanakah?",
      "Pada Pendapat Anda",
      "Apakah Kesan?",
      "Wajarkah?",
      "Ramalkan",
    ]) {
      expect(commands).toContain(command);
    }
    expect(commands).toContain("Jangan jawab setiap soalan KBAT dengan rumus yang sama");
  });

  it("connects ideas to the source and develops reasons, effects and practical solutions", () => {
    const source = branchText("Hubungkan dengan Petikan");
    expect(source).toContain("kempen mengurangkan penggunaan plastik");
    expect(source).toContain("Jawapan Tidak Berkaitan");
    expect(branchText("Berikan Alasan")).toContain("menjaga kebersihan kawasan");
    expect(branchText("Cadangkan Langkah")).toContain("Pihak + Tindakan + Cara + Kesan");
    expect(branchText("Cadangkan Langkah")).toContain("Elakkan Cadangan Tidak Realistik");
  });

  it("teaches evidence-based prediction, justified viewpoints and problem solving", () => {
    const prediction = branchText("Ramalkan Kesan");
    expect(prediction).toContain("risiko banjir kilat boleh meningkat");
    expect(prediction).toContain("tidak disokong oleh konteks");
    const evaluation = branchText("Buat Penilaian");
    expect(evaluation).toContain("Pandangan Lain Boleh Diterima");
    expect(evaluation).toContain("justifikasi yang logik");
    expect(branchText("Penyelesaian Masalah")).toContain(
      "Masalah → Punca → Tindakan → Hasil Dijangka",
    );
  });

  it("progresses to mature answers without encouraging unnecessary length", () => {
    const mature = branchText("Bina Jawapan Matang");
    expect(mature).toContain("Aras 1 — Idea Sahaja");
    expect(mature).toContain("Aras 2 — Idea + Alasan");
    expect(mature).toContain("Aras 3 — Idea + Alasan + Kesan atau Contoh");
    expect(mature).toContain("tidak perlu dipanjangkan");
  });

  it("covers all five requested Tingkatan 2 themes", () => {
    const examples = branchText("Contoh KBAT");
    for (const theme of ["Alam Sekitar", "Kesihatan", "Teknologi", "Masyarakat", "Pendidikan"]) {
      expect(examples).toContain(theme);
    }
    expect(examples).toContain("menyemak kesahihan maklumat");
    expect(examples).toContain("jadual belajar yang teratur");
  });

  it("includes logic checks, common errors, flexible memory aids and safe UASA guidance", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2KbatMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Semak Logik")).toContain("Kesan Tidak Logik");
    expect(branchText("Kesalahan Lazim")).toContain("Fakta Direka");
    expect(branchText("Teknik Mengingat")).toContain("Rumus I-A-K");
    expect(branchText("Teknik Mengingat")).toContain("Rumus P-T-K");
    expect(branchText("Teknik Mengingat")).toContain("Rumus P-A");
    expect(branchText("Tip UASA")).toContain("Tiada satu struktur");
    expect(allText.toLowerCase()).not.toContain("dijamin");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2KbatMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2KbatMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2KbatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2KbatMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const layout = calculateMindMapLayout(bahasaMelayuTingkatan2KbatMindMap, expanded);
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
        data: bahasaMelayuTingkatan2KbatMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("break-words");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KBAT LANJUTAN");
    expect(markup).toContain("Hubungkan dengan Petikan");
    expect(markup).not.toContain("kempen mengurangkan penggunaan plastik");
  });
});

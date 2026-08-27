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
import { bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap } from "./maksud-frasa-ungkapan-bahasa-kiasan-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman",
  "Analisis Isi Tersurat dan Tersirat",
  "Analisis Petikan Pelbagai Bahan",
  "Menilai Hujah dan Pendapat",
  "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
  "Menjawab Soalan KBAT dan Penyelesaian Masalah",
  "Teknik Membuat Rumusan dan Sintesis Maklumat",
  "Kesalahan Lazim dan Strategi Semakan Pemahaman",
];

const expectedBranches = [
  "Makna dalam Konteks",
  "Maksud Perkataan",
  "Maksud Frasa",
  "Maksud Ungkapan",
  "Literal vs Kiasan",
  "Simile",
  "Metafora",
  "Personifikasi",
  "Peribahasa dalam Petikan",
  "Petunjuk Konteks",
  "Nada dan Emosi",
  "Tujuan Penggunaan",
  "Teknik Mengganti",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Maksud Frasa, Ungkapan dan Bahasa Kiasan mind map", () => {
  it("registers fifth with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    const chapter = getChapter(
      "bm",
      "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      undefined,
      "Form 3",
    );
    expect(chapter).toMatchObject({
      id: "bm-f3-maksud-frasa-ungkapan-bahasa-kiasan-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      title: "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      description:
        "Mentafsir maksud perkataan, frasa, ungkapan dan bahasa kiasan berdasarkan konteks serta memahami kesannya terhadap mesej dan nada petikan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap,
        title: "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap).toMatchObject({
      id: "bm-f3-maksud-frasa-ungkapan-bahasa-kiasan-root",
      label: "TAFSIR MAKNA",
      summary:
        "Makna sesuatu perkataan atau ungkapan perlu ditentukan berdasarkan konteks. Murid perlu memahami bukan sahaja maksud literal, tetapi juga maksud tersirat, bahasa kiasan dan kesannya terhadap mesej petikan.",
    });
    expect(
      bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches contextual interpretation and figurative-language progression", () => {
    expect(branchText("Makna dalam Konteks")).toContain("Jangan terus memilih makna kamus pertama");
    expect(branchText("Maksud Perkataan")).toContain("meruncing");
    expect(branchText("Maksud Frasa")).toContain("satu unit");
    expect(branchText("Maksud Ungkapan")).toContain("Membanting Tulang");
    expect(branchText("Literal vs Kiasan")).toContain("KATA + KONTEKS = MAKNA SEBENAR");
    expect(branchText("Simile")).toContain("seperti, bagai, bak, umpama atau laksana");
    expect(branchText("Metafora")).toContain("tanpa kata bandingan");
    expect(branchText("Personifikasi")).toContain("tidak benar-benar menjadi manusia");
    expect(branchText("Peribahasa dalam Petikan")).toContain("PERIBAHASA → KONTEKS → MAKSUD");
    expect(branchText("Petunjuk Konteks")).toContain("Sebab dan Kesan");
    expect(branchText("Nada dan Emosi")).toContain("satu perkataan atau tanda seru sahaja");
    expect(branchText("Tujuan Penggunaan")).toContain("Maksud ≠ Kesan");
    expect(branchText("Teknik Mengganti")).toContain("GANTI → BACA → SEMAK");
    expect(branchText("Kesalahan Lazim")).toContain(
      "Jawapan terpanjang bukan semestinya paling tepat",
    );
  });

  it("includes the Malay mnemonic and complete meaning-versus-effect worked example", () => {
    const uasa = branchText("Tip UASA");
    expect(uasa).toContain("K-O-N-T-E-K-S");
    expect(uasa).toContain("O — Perhatikan Ayat Sekitar");
    expect(uasa).not.toContain("Observe");
    expect(uasa).toContain("FRASA ↓ KONTEKS ↓ MAKSUD ↓ GANTI ↓ SEMAK");
    expect(uasa).toContain("Contoh Latihan");
    expect(uasa).toContain("projek kebun sekolah");
    expect(uasa).toContain("Soalan 1 — Maksud ‘Membuahkan Hasil’");
    expect(uasa).toContain("Soalan 2 — Maksud ‘Membuka Mata’");
    expect(uasa).toContain("Soalan 3 — Maksud ‘Semakin Subur’");
    expect(uasa).toContain("Soalan 4 — Kesan Penggunaan Ungkapan");
    expect(uasa).toContain("Soalan 1 hingga 3 meminta MAKSUD");
  });

  it("derives previous and sixth-topic next navigation while keeping Form 1 and Form 2 isolated", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex(
      (topic) => topic.key === "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
    );
    expect(topics[index - 1]?.key).toBe("Menilai Hujah dan Pendapat");
    expect(topics[index + 1]?.key).toBe("Menjawab Soalan KBAT dan Penyelesaian Masalah");
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(getChapter("bm", expectedTopics[4], undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", expectedTopics[4], undefined, "Form 2")).toBeUndefined();
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap,
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

  it("renders an accessible collapsed mobile path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("TAFSIR MAKNA");
    expect(markup).toContain("Makna dalam Konteks");
    expect(markup).not.toContain("Perkataan yang sama boleh membawa makna");
  });
});

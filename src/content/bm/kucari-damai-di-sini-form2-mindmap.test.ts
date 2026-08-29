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
import { bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap } from "./kucari-damai-di-sini-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Kucari Damai di Sini";
const expectedTopics = [
  "Pantun Alam Remaja",
  "Pantun Kiasan",
  "Pantun Budi",
  "Pantun Nasihat",
  "Pantun Kasih Sayang",
  "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
  "Dalam Persekitaran Kata-kata",
  "Roti",
  title,
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Maksud “Damai”",
  "Patriotisme",
  "Nilai",
  "Pengajaran",
  "Nada",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Kucari Damai di Sini mind map", () => {
  it("preserves every existing KOMSAS topic and registers the sajak exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-kucari-damai-di-sini-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Sajak yang mengungkap pencarian kedamaian melalui kemerdekaan, persaudaraan, kasih sayang, jati diri dan semangat patriotik demi keharmonian negara serta generasi masa hadapan.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous navigation and ends the current sequence", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Roti");
    expect(topics[index + 1]).toBeUndefined();
  });

  it("uses the exact author and thirteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap).toMatchObject({
      id: "bm-f2-kucari-damai-di-sini-root",
      label: "KUCARI DAMAI\nDI SINI",
    });
    expect(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.summary).toContain(
      "Sajak • A. Hamid Jemain • KOMSAS Tingkatan 2",
    );
    expect(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.summary).not.toContain(
      "Shamsudin Othman",
    );
    expect(
      bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches all three verified rangkap without reproducing the poem", () => {
    const maksud = bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(
      maksud?.children
        ?.filter((item) => item.label.startsWith("Rangkap"))
        .map((item) => item.label),
    ).toEqual([
      "Rangkap 1 — Mencari Kedamaian di Tanah Air",
      "Rangkap 2 — Cinta dan Jati Diri",
      "Rangkap 3 — Keamanan untuk Masa Depan",
    ]);
    for (const stanza of maksud?.children?.filter((item) => item.label.startsWith("Rangkap")) ??
      []) {
      expect(stanza.summary).toBeUndefined();
      expect(stanza.children?.map((child) => child.label)).toEqual([
        "Apa yang Dicari / Diharapkan",
        "Maksud Tersirat",
        "Kata Kunci",
      ]);
    }
    const text = branchText("Maksud Rangkap");
    expect(text).toContain("sejarah persaudaraan, sangka baik dan nilai kemanusiaan");
    expect(text).toContain("cinta, jati diri dan kasih sayang");
    expect(text).toContain("warisan generasi akan datang");
    expect(text).toContain("identiti, prinsip, nilai diri");
  });

  it("records the verified identity, structure and rhyme exactly", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("A. Hamid Jemain");
    expect(bentuk).toContain("puisi moden atau sajak");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tiga Rangkap");
    expect(bentuk).toContain("Rangkap 1 mempunyai enam baris");
    expect(bentuk).toContain("Rangkap 2 lima baris");
    expect(bentuk).toContain("Rangkap 3 empat baris");
    expect(bentuk).toContain("Tiga hingga Lapan Patah Kata");
    expect(bentuk).toContain("Enam hingga Lapan Belas Suku Kata");
    expect(bentuk).toContain("Rangkap 1: abaccc");
    expect(bentuk).toContain("Rangkap 2: aabca");
    expect(bentuk).toContain("Rangkap 3: abbb");
    expect(bentuk).toContain("Sajak Bebas");
  });

  it("uses the source-approved theme, tone, values and lessons", () => {
    expect(branchText("Tema")).toContain("PENGHARGAAN TERHADAP KEDAMAIAN DAN KESEJAHTERAAN NEGARA");
    expect(branchText("Nada")).toContain("PATRIOTIK");
    const nilai = branchText("Nilai");
    for (const value of [
      "Kesyukuran",
      "Hormat-menghormati",
      "Patriotisme",
      "Keinsafan",
      "Tanggungjawab",
    ]) {
      expect(nilai).toContain(value);
    }
    const lessons = branchText("Pengajaran");
    expect(lessons).toContain("Berusaha Mendapatkan dan Mengekalkan Kedamaian");
    expect(lessons).toContain("Menghargai Kemerdekaan Negara");
    expect(lessons).toContain("Kedamaian Terus Berkekalan");
    expect(lessons).toContain("Menyelesaikan Krisis dengan Bijaksana");
    expect(lessons).toContain("Generasi Akan Datang");
  });

  it("uses only the publisher-confirmed literary-device set", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Paradoks",
      "Hiperbola",
      "Metafora",
      "Repetisi",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toContain("Inversi");
    expect(gaya).not.toContain("Perlambangan");
  });

  it("explains peace and patriotism beyond narrow surface definitions", () => {
    const damai = branchText("Maksud “Damai”");
    for (const idea of [
      "Aman",
      "Harmoni",
      "Persaudaraan",
      "Kasih Sayang",
      "Kemanusiaan",
      "Persefahaman",
    ]) {
      expect(damai).toContain(idea);
    }
    expect(damai).toContain("Analogi Moden: Sekolah Harmoni");
    expect(damai).toContain("situasi sekolah tidak berlaku dalam sajak");
    const patriotisme = branchText("Patriotisme");
    expect(patriotisme).toContain("bukan sekadar bendera, lagu atau upacara");
    expect(patriotisme).toContain("WARISKAN MASA DEPAN");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap,
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
        data: bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KUCARI DAMAI");
    expect(markup).toContain("A. Hamid Jemain");
    expect(markup).toContain("Maksud “Damai”");
    expect(markup).not.toContain("PATRIOTIK");
  });
});

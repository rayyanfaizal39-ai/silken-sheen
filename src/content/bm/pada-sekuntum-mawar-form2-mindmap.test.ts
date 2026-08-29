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
import { bahasaMelayuTingkatan2PadaSekuntumMawarMindMap } from "./pada-sekuntum-mawar-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pada Sekuntum Mawar";
const expectedTopics = [
  "Pantun Alam Remaja",
  "Pantun Kiasan",
  "Pantun Budi",
  "Pantun Nasihat",
  "Pantun Kasih Sayang",
  "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
  "Dalam Persekitaran Kata-kata",
  "Roti",
  "Kucari Damai di Sini",
  title,
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Simbol Mawar",
  "Maruah dan Harga Diri",
  "Perasaan Ibu",
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
  const selected = bahasaMelayuTingkatan2PadaSekuntumMawarMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pada Sekuntum Mawar mind map", () => {
  it("preserves every existing KOMSAS topic and registers the sajak exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pada-sekuntum-mawar-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Sajak yang menggunakan bunga mawar sebagai perlambangan seorang gadis untuk menyampaikan kepentingan menjaga maruah, harga diri dan keimanan serta menggambarkan kesedihan seorang ibu apabila masa depan anaknya terjejas.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PadaSekuntumMawarMindMap, title },
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
    expect(topics[index - 1]?.key).toBe("Kucari Damai di Sini");
    expect(topics[index + 1]).toBeUndefined();
  });

  it("uses the exact author and fourteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap).toMatchObject({
      id: "bm-f2-pada-sekuntum-mawar-root",
      label: "PADA\nSEKUNTUM\nMAWAR",
    });
    expect(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap.summary).toContain(
      "Sajak • Mahwa Mohamed • KOMSAS Tingkatan 2",
    );
    expect(
      bahasaMelayuTingkatan2PadaSekuntumMawarMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2PadaSekuntumMawarMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches exactly three verified rangkap with student-safe interpretation", () => {
    const maksud = bahasaMelayuTingkatan2PadaSekuntumMawarMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(
      maksud?.children
        ?.filter((item) => item.label.startsWith("Rangkap"))
        .map((item) => item.label),
    ).toEqual([
      "Rangkap 1 — Maruah Gadis dan Kesedihan Ibu",
      "Rangkap 2 — Harapan Ibu Seakan Musnah",
      "Rangkap 3 — Jaga Maruah dan Iman",
    ]);
    const text = branchText("Maksud Rangkap");
    expect(text).toContain("MAWAR = GADIS");
    expect(text).toContain("KELOPAK GUGUR = MARUAH TERCEMAR");
    expect(text).toContain("harapan terhadap masa depan anaknya seakan-akan musnah");
    expect(text).toContain("puncak iman");
    expect(text).toContain("mendapatkan bantuan, berubah dan membina semula masa depannya");
  });

  it("records the verified identity, structure and rhyme exactly", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Mahwa Mohamed");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tiga Rangkap");
    expect(bentuk).toContain("Rangkap 1 mempunyai tiga baris");
    expect(bentuk).toContain("Rangkap 2 enam baris");
    expect(bentuk).toContain("Rangkap 3 lima baris");
    expect(bentuk).toContain("Dua hingga Enam Patah Kata");
    expect(bentuk).toContain("Lima hingga Empat Belas Suku Kata");
    expect(bentuk).toContain("Rangkap 1: abb");
    expect(bentuk).toContain("Rangkap 2: abcdee");
    expect(bentuk).toContain("Rangkap 3: abcbd");
    expect(bentuk).toContain("Sajak Bebas");
  });

  it("uses the source-approved theme, tone, values and lessons", () => {
    expect(branchText("Tema")).toContain("KEPENTINGAN ANAK GADIS MENJAGA MARUAH DAN MARTABAT DIRI");
    expect(branchText("Nada")).toContain("MELANKOLIK");
    const nilai = branchText("Nilai");
    for (const value of [
      "Hemah Tinggi",
      "Kasih Sayang",
      "Berwaspada",
      "Kesedaran",
      "Rasional",
      "Keimanan",
    ]) {
      expect(nilai).toContain(value);
    }
    const lessons = branchText("Pengajaran");
    expect(lessons).toContain("Menjaga Maruah Diri");
    expect(lessons).toContain("Menjaga Hati Ibu");
    expect(lessons).toContain("Menjaga Diri");
    expect(lessons).toContain("Mengukuhkan Keimanan");
  });

  it("uses only verified literary devices with short evidence and effects", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of ["Metafora", "Imej Alam", "Simile", "Sinkope", "Asonansi"]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).toContain("lipatan usia");
    expect(gaya).toContain("pintu kehidupan");
    expect(gaya).toContain("seperti telah menutup");
    expect(gaya).not.toContain("Personifikasi");
    expect(gaya).not.toContain("Hiperbola");
  });

  it("explains symbolism, dignity and maternal emotion without harmful framing", () => {
    const simbol = branchText("Simbol Mawar");
    expect(simbol).toContain("MAWAR = GADIS");
    expect(simbol).toContain("KELOPAK GUGUR");
    expect(simbol).toContain("MAHKOTA / PUNCAK");
    expect(simbol).toContain("Nilai kemanusiaan seseorang tidak hilang secara kekal");
    const maruah = branchText("Maruah dan Harga Diri");
    expect(maruah).toContain("Bukan Menyalahkan Mangsa");
    expect(maruah).toContain("tanggungjawab terletak pada pihak yang melakukan");
    expect(maruah).toContain("PRINSIP + KESELAMATAN + MASA DEPAN");
    const ibu = branchText("Perasaan Ibu");
    expect(ibu).toContain("Bukan Kebencian");
    expect(ibu).toContain("kasih ibu harus hilang");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PadaSekuntumMawarMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2PadaSekuntumMawarMindMap,
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
        data: bahasaMelayuTingkatan2PadaSekuntumMawarMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PADA");
    expect(markup).toContain("Mahwa Mohamed");
    expect(markup).toContain("Simbol Mawar");
    expect(markup).not.toContain("MELANKOLIK");
  });
});

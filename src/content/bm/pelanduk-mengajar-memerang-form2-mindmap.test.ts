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
import { bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap } from "./pelanduk-mengajar-memerang-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pelanduk Mengajar Memerang";
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
  "Pada Sekuntum Mawar",
  title,
  "Banjir di Mata Emak",
];
const expectedBranches = [
  "Sinopsis",
  "Urutan Peristiwa",
  "Tema",
  "Persoalan",
  "Watak & Perwatakan",
  "Binaan Plot",
  "Teknik Plot",
  "Latar",
  "Konflik & Sebab-Akibat",
  "Pengadilan Nabi Sulaiman",
  "Nilai",
  "Pengajaran",
  "Bahasa Prosa Tradisional",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pelanduk Mengajar Memerang mind map", () => {
  it("preserves every existing KOMSAS topic and registers the prosa exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pelanduk-mengajar-memerang-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Kisah Syah Alam di Rimba, Sang Memerang dan pengadilan Nabi Allah Sulaiman yang mengajar bahawa penganiayaan, ketamakan dan tindakan tanpa pertimbangan boleh membawa akibat, manakala sesuatu perkara hendaklah disiasat dengan adil sebelum keputusan dibuat.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven navigation between Pada Sekuntum Mawar and Banjir di Mata Emak", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Pada Sekuntum Mawar");
    expect(topics[index + 1]?.key).toBe("Banjir di Mata Emak");
  });

  it("uses the exact identity and sixteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap).toMatchObject({
      id: "bm-f2-pelanduk-mengajar-memerang-root",
      label: "PELANDUK\nMENGAJAR\nMEMERANG",
    });
    expect(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap.summary).toContain(
      "Prosa Tradisional • KOMSAS Tingkatan 2",
    );
    expect(
      bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the verified storyline and final judgment without poetry structure", () => {
    const sinopsis = branchText("Sinopsis");
    expect(sinopsis).toContain("Syah Alam di Rimba, iaitu pelanduk");
    expect(sinopsis).toContain("tujuh anak memerang");
    expect(sinopsis).toContain("terpijak ketujuh-tujuh anak memerang");
    expect(sinopsis).toContain("Sang Memerang mengaku");
    expect(sinopsis).toContain("Syah Alam di Rimba tidak bersalah");
    const allText = collectNodes(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Rima Akhir");
    expect(allText).not.toContain("Pembayang");
    expect(allText).not.toContain("Maksud Rangkap");
  });

  it("records the exact witness chain and each verified role", () => {
    const watak = branchText("Watak & Perwatakan");
    expect(watak).toContain("SYAH ALAM → BUBUT → BIAWAK → LABI-LABI → UDANG → SEBARAU → MEMERANG");
    expect(watak).toContain("Sang Belatuk Utusan yang memanggil");
    expect(watak).toContain("Sang Bubut Menjelaskan bahawa bunyinya");
    expect(watak).toContain("Sang Biawak Menjelaskan bahawa dia membawa pedang");
    expect(watak).toContain("Sang Labi-labi Menjelaskan bahawa dia membawa perisai");
    expect(watak).toContain("Sang Udang Menjelaskan bahawa tindakannya");
    expect(watak).toContain("Sang Sebarau Mendedahkan bahawa rakyat dan keluarganya");
  });

  it("uses the accepted theme, plot, techniques and settings", () => {
    expect(branchText("Tema")).toContain("BALASAN TERHADAP GOLONGAN YANG MENGANIAYAI PIHAK LAIN");
    const plot = branchText("Binaan Plot");
    for (const stage of ["Permulaan", "Perkembangan", "Klimaks", "Peleraian"]) {
      expect(plot).toContain(stage);
    }
    const techniques = branchText("Teknik Plot");
    for (const technique of ["Dialog", "Monolog Dalaman", "Pemerian"]) {
      expect(techniques).toContain(technique);
    }
    const setting = branchText("Latar");
    for (const detail of [
      "Hutan Rimba",
      "Lubang / Sarang Sang Memerang",
      "Kota Istana / Singgahsana",
      "Lubuk",
      "Waktu Petang",
      "Waktu Malam",
    ]) {
      expect(setting).toContain(detail);
    }
  });

  it("explains fair investigation, cause and consequence, values and lessons", () => {
    const conflict = branchText("Konflik & Sebab-Akibat");
    expect(conflict).toContain("Sebab Serta-merta");
    expect(conflict).toContain("rantaian sebab");
    const justice = branchText("Pengadilan Nabi Sulaiman");
    expect(justice).toContain("ADUAN → SIASAT → BUKTI + SAKSI → KEPUTUSAN");
    expect(justice).toContain("Analogi Moden: Pertikaian Murid");
    const values = branchText("Nilai");
    for (const value of [
      "Kebijaksanaan",
      "Keadilan",
      "Kejujuran",
      "Keprihatinan",
      "Tanggungjawab",
      "Kepatuhan",
      "Keinsafan",
      "Keberanian",
    ]) {
      expect(values).toContain(value);
    }
    expect(branchText("Pengajaran")).toContain("Kita Jangan Menganiayai Pihak Lain");
  });

  it("includes only verified, high-value traditional-language help", () => {
    const language = branchText("Bahasa Prosa Tradisional");
    for (const term of [
      "Sebermula",
      "Hatta",
      "Ayapan",
      "Pacal",
      "Baginda",
      "Bertitah",
      "Patik",
      "Tuanku",
      "Singgahsana",
    ]) {
      expect(language).toContain(term);
    }
    expect(language).toContain("Maksud moden");
    expect(language).toContain("jangan menghafal petikan panjang");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(
      bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap,
    );
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap,
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
        data: bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PELANDUK");
    expect(markup).toContain("Prosa Tradisional");
    expect(markup).toContain("Pengadilan Nabi Sulaiman");
    expect(markup).not.toContain("Sang Belatuk");
  });
});

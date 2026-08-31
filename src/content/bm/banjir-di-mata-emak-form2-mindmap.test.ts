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
import { bahasaMelayuTingkatan2BanjirDiMataEmakMindMap } from "./banjir-di-mata-emak-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Banjir di Mata Emak";
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
  "Pelanduk Mengajar Memerang",
  title,
];
const expectedBranches = [
  "Sinopsis",
  "Urutan Peristiwa",
  "Tema",
  "Persoalan",
  "Watak & Perwatakan",
  "Hubungan Kekeluargaan",
  "Maksud Tajuk",
  "Binaan Plot",
  "Teknik Plot",
  "Latar",
  "Konflik",
  "Nilai",
  "Pengajaran",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2BanjirDiMataEmakMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Banjir di Mata Emak mind map", () => {
  it("preserves the registry and registers the cerpen exactly once after Pelanduk", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-banjir-di-mata-emak-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Cerpen yang mengetengahkan kasih sayang, keprihatinan dan tanggungjawab terhadap ibu bapa melalui pertemuan seorang pencerita dengan Mak Piah yang menghadapi banjir serta merindui perhatian anak-anaknya.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2BanjirDiMataEmakMindMap, title },
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
    expect(topics[index - 1]?.key).toBe("Pelanduk Mengajar Memerang");
    expect(topics[index + 1]).toBeUndefined();
  });

  it("uses the exact identity and sixteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap).toMatchObject({
      id: "bm-f2-banjir-di-mata-emak-root",
      label: "BANJIR\nDI MATA EMAK",
    });
    expect(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap.summary).toContain(
      "Cerpen • KOMSAS Tingkatan 2",
    );
    expect(
      bahasaMelayuTingkatan2BanjirDiMataEmakMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2BanjirDiMataEmakMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches the verified author, narrator, telephone incident and ending", () => {
    const synopsis = branchText("Sinopsis");
    for (const fact of [
      "Che Soo Ismail",
      "Ameera",
      "tersalah mendail nombor rumah Mak Piah",
      "menyangka pemanggil itu ialah Nana",
      "lauk dan nasi",
      "demam panas selama lima hari",
      "tergelincir dan kepalanya cedera",
      "Nana dan Nubhan menyesal",
    ]) {
      expect(synopsis).toContain(fact);
    }
    const characters = branchText("Watak & Perwatakan");
    expect(characters).toContain("Nama dan jantinanya tidak dinyatakan dengan jelas");
    expect(characters).toContain("Nana ialah anak perempuan bongsu");
    expect(characters).toContain("Nubhan ialah anak lelaki sulung");
  });

  it("uses the selected project theme and evidence-backed literary analysis", () => {
    expect(branchText("Tema")).toContain("KETABAHAN SEORANG IBU DALAM MENGHADAPI DUGAAN KEHIDUPAN");
    const plot = branchText("Binaan Plot");
    for (const stage of ["Permulaan", "Perkembangan", "Klimaks", "Peleraian"]) {
      expect(plot).toContain(stage);
    }
    const techniques = branchText("Teknik Plot");
    for (const technique of ["Dialog", "Pemerian", "Saspens"]) {
      expect(techniques).toContain(technique);
    }
    expect(techniques).not.toContain("Monolog Dalaman");
  });

  it("separates family relationships, title symbolism and conflicts accurately", () => {
    const family = branchText("Hubungan Kekeluargaan");
    expect(family).toContain("NUBHAN (anak sulung) + NANA (anak bongsu)");
    expect(family).toContain("‘Saya’ bukan anak Mak Piah dan bukan Nana");
    expect(family).toContain("MATERIAL + EMOSI + MASA + PERHATIAN");
    const titleMeaning = branchText("Maksud Tajuk");
    expect(titleMeaning).toContain("Banjir Fizikal");
    expect(titleMeaning).toContain("Banjir Emosi");
    expect(titleMeaning).toContain("BANJIR SEBENAR + LIMPAHAN PERASAAN / AIR MATA");
    const conflict = branchText("Konflik");
    expect(conflict).toContain("BENCANA LUARAN + MASALAH DALAMAN KELUARGA");
  });

  it("uses only verified settings, values and lessons and rejects a hospital scene", () => {
    const setting = branchText("Latar");
    for (const detail of [
      "Rumah ‘Saya’",
      "Rumah Mak Piah",
      "Tanah Perkuburan",
      "Empat Hari Empat Malam",
      "Waktu Zuhur",
      "Lima Hari",
      "Selepas Banjir",
    ]) {
      expect(setting).toContain(detail);
    }
    const values = branchText("Nilai");
    for (const value of [
      "Ketabahan",
      "Keprihatinan",
      "Kasih Sayang",
      "Baik Hati",
      "Tolong-menolong",
      "Ketaatan",
      "Keinsafan",
    ]) {
      expect(values).toContain(value);
    }
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Bertanggungjawab terhadap Ibu Bapa");
    expect(branchText("Kesalahan Lazim")).toContain("Tidak disokong. Tiada peristiwa hospital");
  });

  it("contains no poetry structure, invented dialogue or structural emoji", () => {
    const text = collectNodes(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    for (const forbidden of ["Rima Akhir", "Pembayang", "Maksud Rangkap", "Monolog Dalaman"]) {
      expect(text).not.toContain(forbidden);
    }
    expect(text).toContain("dialog asal tidak disalin panjang");
    expect(text).not.toMatch(/[🌧😢❤⏰☎👥🤝🏠]/u);
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2BanjirDiMataEmakMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2BanjirDiMataEmakMindMap,
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

  it("renders an accessible collapsed mobile learning path without overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan2BanjirDiMataEmakMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("BANJIR");
    expect(markup).toContain("Cerpen");
    expect(markup).toContain("Hubungan Kekeluargaan");
    expect(markup).not.toContain("Nubhan ialah anak lelaki sulung");
  });
});

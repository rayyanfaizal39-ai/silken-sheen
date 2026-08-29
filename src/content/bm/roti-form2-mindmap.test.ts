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
import { bahasaMelayuTingkatan2RotiMindMap } from "./roti-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Roti";
const expectedTopics = [
  "Pantun Alam Remaja",
  "Pantun Kiasan",
  "Pantun Budi",
  "Pantun Nasihat",
  "Pantun Kasih Sayang",
  "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
  "Dalam Persekitaran Kata-kata",
  title,
  "Kucari Damai di Sini",
  "Pada Sekuntum Mawar",
];
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Simbol Roti",
  "Kontras Kehidupan",
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
  const selected = bahasaMelayuTingkatan2RotiMindMap.children?.find((item) => item.label === label);
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Roti mind map", () => {
  it("preserves every existing KOMSAS topic and registers Roti exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-roti-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Sajak yang menghubungkan nikmat makanan dengan kesyukuran, keimanan dan tanggungjawab golongan berkecukupan terhadap golongan miskin yang masih lapar.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2RotiMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Dalam Persekitaran Kata-kata");
    expect(topics[index + 1]?.key).toBe("Kucari Damai di Sini");
  });

  it("uses the prescribed identity and thirteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2RotiMindMap).toMatchObject({
      id: "bm-f2-roti-root",
      label: "ROTI",
    });
    expect(bahasaMelayuTingkatan2RotiMindMap.summary).toContain(
      "Sajak • Ahmad Syahrul Wahid • KOMSAS Tingkatan 2",
    );
    expect(bahasaMelayuTingkatan2RotiMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2RotiMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches all five verified rangkap using the required learning sequence", () => {
    const maksud = bahasaMelayuTingkatan2RotiMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(maksud?.children?.slice(0, 5).map((item) => item.label)).toEqual([
      "Rangkap 1",
      "Rangkap 2",
      "Rangkap 3",
      "Rangkap 4",
      "Rangkap 5",
    ]);
    maksud?.children?.slice(0, 5).forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.map((child) => child.label)).toEqual([
        "Apa yang Berlaku",
        "Maksud Tersirat",
        "Kata Kunci",
      ]);
    });
    const meanings = branchText("Maksud Rangkap");
    expect(meanings).toContain("baunya yang harum membangkitkan selera");
    expect(meanings).toContain("roti yang dinanti siap dibakar");
    expect(meanings).toContain("perut kenyang dan orang itu bersendawa");
    expect(meanings).toContain("membantu orang yang memerlukan");
    expect(meanings).toContain("Kesyukuran, bantuan dan keimanan");
  });

  it("records the verified author, anthology, form, line counts and rhymes", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Ahmad Syahrul Wahid");
    expect(bentuk).toContain("puisi moden atau sajak");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Lima Rangkap");
    expect(bentuk).toContain("Rangkap 1 mempunyai empat baris");
    expect(bentuk).toContain("Rangkap 2, 3, 4 dan 5 masing-masing mempunyai lima baris");
    expect(bentuk).toContain("Dua hingga Enam Patah Kata");
    expect(bentuk).toContain("Lima hingga Empat Belas Suku Kata");
    expect(bentuk).toContain("Rangkap 1: abaa");
    expect(bentuk).toContain("Rangkap 2 hingga Rangkap 5: aaaaa");
    expect(bentuk).toContain("Sajak Bebas");
  });

  it("uses the source-approved theme, tone, values and lessons", () => {
    expect(branchText("Tema")).toContain(
      "ORANG BERIMAN TIDAK MELUPAKAN GOLONGAN MISKIN KETIKA KENYANG",
    );
    expect(branchText("Nada")).toContain("DIDAKTIK");
    const nilai = branchText("Nilai");
    for (const value of ["Kesabaran", "Baik Hati", "Kesyukuran", "Keimanan", "Kesederhanaan"]) {
      expect(nilai).toContain(value);
    }
    const lessons = branchText("Pengajaran");
    expect(lessons).toContain("Kita Hendaklah Bersabar");
    expect(lessons).toContain("Kita Hendaklah Memikirkan Orang Lain");
    expect(lessons).toContain("Kita Hendaklah Prihatin");
    expect(lessons).toContain("Kita Hendaklah Memupuk Keimanan");
    expect(lessons).toContain("Kita Hendaklah Bersyukur");
  });

  it("uses only verified literary devices and distinguishes interpretation from technique", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Hiperbola",
      "Metafora",
      "Personifikasi",
      "Simile",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toContain("Repetisi");
    expect(branchText("Simbol Roti")).toContain(
      "tafsiran berdasarkan keseluruhan sajak, bukan label gaya bahasa rasmi",
    );
  });

  it("keeps the verified contrast and omits unsupported settings or events", () => {
    const contrast = branchText("Kontras Kehidupan");
    expect(contrast).toContain("Golongan Kenyang / Berkemampuan");
    expect(contrast).toContain("Warga Miskin yang Lapar");
    expect(contrast).toContain("KENYANG + BERIMAN → INGAT ORANG LAPAR → BANTUAN");

    const allText = collectNodes(bahasaMelayuTingkatan2RotiMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(contrast).toContain(
      "tidak menamakan negara, peperangan, pelarian atau peristiwa sejarah tertentu",
    );
    expect(allText).not.toMatch(/Syria|Palestin|Ukraine|Afghanistan|mangsa perang di/i);
    expect(allText).not.toContain("Dari cerobong dapur");
    expect(allText).not.toContain("asap berjelaga berkepul");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2RotiMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2RotiMindMap, new Set())).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2RotiMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2RotiMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan2RotiMindMap, expanded).positions.values(),
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
        data: bahasaMelayuTingkatan2RotiMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("ROTI");
    expect(markup).toContain("Ahmad Syahrul Wahid");
    expect(markup).toContain("Simbol Roti");
    expect(markup).not.toContain("DIDAKTIK");
  });
});

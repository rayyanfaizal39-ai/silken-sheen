import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm3JenisAyatMindMap } from "./jenis-ayat-form3-mindmap";
import { bahasaMelayuForm3RagamAyatMindMap } from "./ragam-ayat-form3-mindmap";
import { bahasaMelayuForm3CakapAjukCakapPindahMindMap } from "./cakap-ajuk-cakap-pindah-form3-mindmap";

const form1Topics = [
  "Kata Nama",
  "Kata Ganti Nama",
  "Kata Kerja",
  "Kata Adjektif",
  "Kata Sendi Nama",
  "Kata Hubung",
  "Kata Bilangan",
  "Penjodoh Bilangan",
  "Imbuhan",
  "Penanda Wacana",
] as const;

const form2Topics = [
  "Frasa Nama",
  "Frasa Kerja",
  "Frasa Adjektif",
  "Ayat Aktif",
  "Ayat Pasif",
  "Ayat Tunggal",
  "Ayat Majmuk",
  "Imbuhan Lanjutan",
  "Kata Pemeri",
  "Kesalahan Tatabahasa Lazim",
] as const;

function tatabahasaTopics(form: "Form 1" | "Form 2" | "Form 3") {
  return getRegisteredSubjectChapters("bm", undefined, form).filter(
    (chapter) => chapter.categoryLabel === "Tatabahasa",
  );
}

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function flattenContent(node: MindNode) {
  return collectNodes(node)
    .flatMap((item) => [item.label, item.summary].filter(Boolean))
    .join("\n");
}

function findBranch(label: string) {
  return bahasaMelayuForm3CakapAjukCakapPindahMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 3 Cakap Ajuk dan Cakap Pindah mind map", () => {
  it("updates only the Form 3 registry with exactly three interactive topics", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 2").map((topic) => topic.key)).toEqual(form2Topics);

    const topics = tatabahasaTopics("Form 3");
    expect(topics.map((topic) => topic.key)).toEqual([
      "Jenis Ayat",
      "Ragam Ayat",
      "Cakap Ajuk dan Cakap Pindah",
    ]);
    expect(topics).toHaveLength(3);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    expect(topics[2]).toMatchObject({
      key: "Cakap Ajuk dan Cakap Pindah",
      label: "Cakap Ajuk dan Cakap Pindah",
      description:
        "Menukarkan percakapan langsung kepada bentuk laporan dan sebaliknya tanpa mengubah maksud asal.",
      categoryLabel: "Tatabahasa",
    });
  });

  it("registers a mind-map-only Form 3 resource", () => {
    const chapter = getChapter("bm", "Cakap Ajuk dan Cakap Pindah", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-cakap-ajuk-cakap-pindah-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Cakap Ajuk dan Cakap Pindah",
      title: "Cakap Ajuk dan Cakap Pindah",
      description:
        "Menukarkan percakapan langsung kepada bentuk laporan dan sebaliknya tanpa mengubah maksud asal.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm3CakapAjukCakapPindahMindMap,
        title: "Cakap Ajuk dan Cakap Pindah",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Cakap Ajuk dan Cakap Pindah", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Cakap Ajuk dan Cakap Pindah", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Cakap Ajuk dan Cakap Pindah", undefined, "Form 2")).toBeUndefined();
  });

  it("preserves Jenis Ayat and Ragam Ayat in the required navigation order", () => {
    expect(getChapter("bm", "Jenis Ayat", undefined, "Form 3")?.mindMap?.data).toBe(
      bahasaMelayuForm3JenisAyatMindMap,
    );
    expect(getChapter("bm", "Ragam Ayat", undefined, "Form 3")?.mindMap?.data).toBe(
      bahasaMelayuForm3RagamAyatMindMap,
    );
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.form === "Form 3" && chapter.categoryLabel === "Tatabahasa")
        .map((chapter) => chapter.id),
    ).toEqual([
      "bm-f3-jenis-ayat-mindmap",
      "bm-f3-ragam-ayat-mindmap",
      "bm-f3-cakap-ajuk-cakap-pindah-mindmap",
    ]);
  });

  it("uses the required identity and eleven title-only first-level branches", () => {
    expect(bahasaMelayuForm3CakapAjukCakapPindahMindMap).toMatchObject({
      id: "bm-f3-cakap-ajuk-cakap-pindah-root",
      label: "CAKAP AJUK & CAKAP PINDAH",
      summary:
        "Cakap ajuk mengekalkan percakapan asal penutur manakala cakap pindah melaporkan semula percakapan tersebut dalam bentuk ayat laporan tanpa mengubah maksud.",
    });
    expect(
      bahasaMelayuForm3CakapAjukCakapPindahMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Definisi",
      "Cakap Ajuk",
      "Cakap Pindah",
      "Peraturan Penukaran",
      "Kata Ganti Nama",
      "Kata Keterangan Masa dan Tempat",
      "Kata Kerja Pelaporan",
      "Mengekalkan Maksud",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm3CakapAjukCakapPindahMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes direct quotation from indirect reporting", () => {
    const definition = flattenContent(findBranch("Definisi")!);
    const direct = flattenContent(findBranch("Cakap Ajuk")!);
    const indirect = flattenContent(findBranch("Cakap Pindah")!);

    expect(definition).toContain("Mesej Sama, Struktur Berbeza");
    expect(direct).toContain("sebagaimana diucapkan oleh penutur");
    expect(direct).toContain("Menggunakan tanda petik");
    expect(direct).toContain('"Esok kami akan bertolak," kata Amir.');
    expect(direct).toContain('"Siapakah yang datang tadi?" tanya guru.');
    expect(direct).toContain('"Tolong tutup pintu itu," kata ibu.');
    expect(direct).toContain('"Wah, cantiknya bunga ini!" kata Siti.');
    expect(indirect).toContain("Percakapan dilaporkan semula tanpa tanda petik");
    expect(indirect).toContain("Amir berkata bahawa mereka akan bertolak pada keesokan harinya.");
    expect(indirect).toContain("Guru bertanya siapakah yang datang tadi.");
    expect(indirect).toContain("Ibu menyuruh anaknya menutup pintu itu.");
    expect(indirect).toContain("Siti menyatakan rasa kagumnya terhadap kecantikan bunga tersebut.");
  });

  it("uses sentence type and six ordered checks for transformation", () => {
    const content = flattenContent(findBranch("Peraturan Penukaran")!);

    expect(content).toContain("Langkah 1");
    expect(content).toContain("Kenal pasti penutur.");
    expect(content).toContain("Kenal pasti pendengar.");
    expect(content).toContain("penyata, tanya, perintah atau seruan");
    expect(content).toContain("sepadan dengan tujuan penutur");
    expect(content).toContain("jika konteks memerlukannya");
    expect(content).toContain("maksud asal dikekalkan");
  });

  it("changes pronouns according to the reporter rather than mechanically", () => {
    const content = flattenContent(findBranch("Kata Ganti Nama")!);

    expect(content).toContain('"Saya akan datang esok," kata Ali.');
    expect(content).toContain("Ali berkata bahawa dia akan datang pada keesokan harinya.");
    expect(content).toContain('"Kami sudah siap," kata murid-murid.');
    expect(content).toContain("Murid-murid mengatakan bahawa mereka sudah siap.");
    expect(content).toContain("bergantung pada siapa yang melaporkan percakapan");
    expect(content).toContain("Jangan menukar semua kata ganti nama secara mekanikal.");
  });

  it("changes time and place expressions only when context requires", () => {
    const content = flattenContent(findBranch("Kata Keterangan Masa dan Tempat")!);

    expect(content).toContain("hari ini");
    expect(content).toContain("hari tersebut");
    expect(content).toContain("esok");
    expect(content).toContain("keesokan harinya");
    expect(content).toContain("semalam");
    expect(content).toContain("hari sebelumnya");
    expect(content).toContain("di sini");
    expect(content).toContain("di situ");
    expect(content).toContain("hanya diubah apabila sudut masa, tempat atau pelapor berubah");
    expect(content).toContain("ungkapan asal boleh dikekalkan");
  });

  it("matches reporting verbs to statements, questions, commands and emotions", () => {
    const content = flattenContent(findBranch("Kata Kerja Pelaporan")!);

    expect(content).toContain("berkata • menjelaskan • memberitahu");
    expect(content).toContain("bertanya");
    expect(content).toContain("meminta • menyuruh");
    expect(content).toContain("merayu • menasihati • mengingatkan");
    expect(content).toContain("mengucapkan tahniah");
    expect(content).toContain("tidak semuanya boleh saling menggantikan");

    const indirect = flattenContent(findBranch("Cakap Pindah")!);
    expect(indirect).toContain("bukan setiap cakap pindah mesti menggunakannya");
  });

  it("preserves meaning and explains every required common-error correction", () => {
    const meaning = flattenContent(findBranch("Mengekalkan Maksud")!);
    const errors = flattenContent(findBranch("Kesalahan Lazim")!);

    expect(meaning).toContain("Maklumat • tujuan • emosi • urutan peristiwa • makna tatabahasa");
    expect(meaning).toContain(
      "Jangan menambah penjelasan, sebab atau pendapat yang tidak pernah diucapkan.",
    );
    expect(errors).toContain("Tanda petik dibuang dalam cakap pindah.");
    expect(errors).toContain("Kata mungkin tidak boleh ditukar menjadi pasti.");
    expect(errors).toContain("Mira berkata bahawa dia sudah siap.");
    expect(errors).toContain("hari ini boleh dikekalkan");
    expect(errors).toContain("Lina bertanya di manakah bukunya.");
    expect(errors).toContain("Sebab yang tidak disebut tidak boleh ditambah.");
    expect(errors).toContain("Sara berkata bahawa dia akan tiba di situ pada keesokan harinya.");
    expect(errors).toContain("Ibu bertanya sama ada anaknya sudah makan.");
  });

  it("uses a seven-step UASA check and concise memory rules", () => {
    const tips = flattenContent(findBranch("Tip UASA")!);
    const memory = flattenContent(findBranch("Ingat!")!);

    expect(tips).toContain("1. Penutur");
    expect(tips).toContain("2. Pendengar");
    expect(tips).toContain("3. Jenis Ayat");
    expect(tips).toContain("4. Kata Kerja Pelaporan");
    expect(tips).toContain("5. Kata Ganti Nama");
    expect(tips).toContain("6. Masa dan Tempat");
    expect(tips).toContain("7. Baca Semula");
    expect(tips).toContain("Jika maksud berubah, jawapan itu salah.");
    expect(memory).toContain("Petikan kata-kata asal.");
    expect(memory).toContain("Laporan tanpa petikan.");
    expect(memory).toContain("Jangan tambah maklumat");
    expect(memory).toContain("jangan buang maklumat");
    expect(memory).toContain("jangan ubah tujuan penutur");
  });

  it("keeps IDs unique and the shared expanded desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm3CakapAjukCakapPindahMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3CakapAjukCakapPindahMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3CakapAjukCakapPindahMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3CakapAjukCakapPindahMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuForm3CakapAjukCakapPindahMindMap,
        expanded,
      ).positions.entries(),
    );
    positions.forEach(([id, position], index) => {
      positions.slice(index + 1).forEach(([otherId, other]) => {
        const separated =
          position.x + position.w <= other.x ||
          other.x + other.w <= position.x ||
          position.y + position.h / 2 <= other.y - other.h / 2 ||
          other.y + other.h / 2 <= position.y - position.h / 2;
        expect(separated, `${id} overlaps ${otherId}`).toBe(true);
      });
    });
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm3CakapAjukCakapPindahMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});

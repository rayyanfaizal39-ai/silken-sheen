import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan1IsiTersiratMindMap } from "@/content/bm/mengenal-pasti-isi-tersirat-form1-mindmap";
import { bahasaMelayuTingkatan1IsiTersuratMindMap } from "@/content/bm/mengenal-pasti-isi-tersurat-form1-mindmap";
import { bahasaMelayuTingkatan1StrategiPemahamanMindMap } from "@/content/bm/strategi-menjawab-soalan-pemahaman-form1-mindmap";

export const bahasaMelayuTingkatan1PemahamanRegistry = [
  {
    id: "bm-f1-strategi-menjawab-soalan-pemahaman-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Strategi Menjawab Soalan Pemahaman",
    title: "Strategi Menjawab Soalan Pemahaman",
    description:
      "Langkah membaca petikan, mengenal pasti kehendak soalan dan membina jawapan yang tepat berdasarkan bukti.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan1StrategiPemahamanMindMap,
      title: "Strategi Menjawab Soalan Pemahaman",
    },
  },
  {
    id: "bm-f1-mengenal-pasti-isi-tersurat-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Mengenal Pasti Isi Tersurat",
    title: "Mengenal Pasti Isi Tersurat",
    description:
      "Mencari maklumat yang dinyatakan secara langsung dalam petikan dan membina jawapan yang tepat berdasarkan bukti.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan1IsiTersuratMindMap,
      title: "Mengenal Pasti Isi Tersurat",
    },
  },
  {
    id: "bm-f1-mengenal-pasti-isi-tersirat-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Mengenal Pasti Isi Tersirat",
    title: "Mengenal Pasti Isi Tersirat",
    description:
      "Membuat kesimpulan berdasarkan petunjuk dalam petikan walaupun jawapan tidak dinyatakan secara langsung.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan1IsiTersiratMindMap,
      title: "Mengenal Pasti Isi Tersirat",
    },
  },
] as const satisfies readonly ChapterContent[];

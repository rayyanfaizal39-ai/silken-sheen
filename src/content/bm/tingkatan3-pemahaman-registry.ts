import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan3TersuratTersiratMindMap } from "@/content/bm/analisis-isi-tersurat-tersirat-form3-mindmap";
import { bahasaMelayuTingkatan3StrategiPemahamanMindMap } from "@/content/bm/strategi-menjawab-soalan-pemahaman-form3-mindmap";

export const bahasaMelayuTingkatan3PemahamanRegistry = [
  {
    id: "bm-f3-strategi-menjawab-soalan-pemahaman-mindmap",
    subjectId: "bm",
    form: "Form 3",
    chapterKey: "Strategi Menjawab Soalan Pemahaman",
    title: "Strategi Menjawab Soalan Pemahaman",
    description:
      "Strategi menganalisis petikan, mengenal pasti kehendak soalan, memilih bukti dan membina jawapan yang tepat, matang serta berasaskan teks.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan3StrategiPemahamanMindMap,
      title: "Strategi Menjawab Soalan Pemahaman",
    },
  },
  {
    id: "bm-f3-analisis-isi-tersurat-tersirat-mindmap",
    subjectId: "bm",
    form: "Form 3",
    chapterKey: "Analisis Isi Tersurat dan Tersirat",
    title: "Analisis Isi Tersurat dan Tersirat",
    description:
      "Menganalisis maklumat langsung dan tersirat, menghubungkan beberapa petunjuk serta membina kesimpulan yang disokong oleh bukti daripada petikan.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan3TersuratTersiratMindMap,
      title: "Analisis Isi Tersurat dan Tersirat",
    },
  },
] as const satisfies readonly ChapterContent[];

import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan3TersuratTersiratMindMap } from "@/content/bm/analisis-isi-tersurat-tersirat-form3-mindmap";
import { bahasaMelayuTingkatan3PelbagaiBahanMindMap } from "@/content/bm/analisis-petikan-pelbagai-bahan-form3-mindmap";
import { bahasaMelayuTingkatan3MenilaiHujahMindMap } from "@/content/bm/menilai-hujah-pendapat-form3-mindmap";
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
  {
    id: "bm-f3-analisis-petikan-pelbagai-bahan-mindmap",
    subjectId: "bm",
    form: "Form 3",
    chapterKey: "Analisis Petikan Pelbagai Bahan",
    title: "Analisis Petikan Pelbagai Bahan",
    description:
      "Menganalisis dan menghubungkan maklumat daripada beberapa bahan seperti petikan, poster, infografik, dialog dan bahan visual untuk membina jawapan yang tepat.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan3PelbagaiBahanMindMap,
      title: "Analisis Petikan Pelbagai Bahan",
    },
  },
  {
    id: "bm-f3-menilai-hujah-pendapat-mindmap",
    subjectId: "bm",
    form: "Form 3",
    chapterKey: "Menilai Hujah dan Pendapat",
    title: "Menilai Hujah dan Pendapat",
    description:
      "Menilai kekuatan sesuatu pendapat dengan mengenal pasti dakwaan, alasan, bukti dan hubungan logik sebelum membuat pertimbangan yang munasabah.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan3MenilaiHujahMindMap,
      title: "Menilai Hujah dan Pendapat",
    },
  },
] as const satisfies readonly ChapterContent[];

import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan2IsiTersuratMindMap } from "@/content/bm/mengenal-pasti-isi-tersurat-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap } from "@/content/bm/strategi-menjawab-soalan-pemahaman-lanjutan-form2-mindmap";

export const bahasaMelayuTingkatan2PemahamanRegistry = [
  {
    id: "bm-f2-strategi-menjawab-soalan-pemahaman-lanjutan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
    title: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
    description:
      "Menguasai strategi menjawab petikan yang lebih mencabar melalui analisis, inferens dan penggunaan bukti.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap,
      title: "Strategi Menjawab Soalan Pemahaman (Lanjutan)",
    },
  },
  {
    id: "bm-f2-mengenal-pasti-isi-tersurat-lanjutan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Mengenal Pasti Isi Tersurat (Lanjutan)",
    title: "Mengenal Pasti Isi Tersurat (Lanjutan)",
    description:
      "Menganalisis maklumat yang dinyatakan secara langsung dalam petikan yang lebih panjang dan memilih bukti yang paling tepat mengikut kehendak soalan.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan2IsiTersuratMindMap,
      title: "Mengenal Pasti Isi Tersurat (Lanjutan)",
    },
  },
] as const satisfies readonly ChapterContent[];

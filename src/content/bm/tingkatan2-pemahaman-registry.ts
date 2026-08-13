import type { ChapterContent } from "@/content/types";
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
] as const satisfies readonly ChapterContent[];

import type { ChapterContent } from "@/content/types";
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
] as const satisfies readonly ChapterContent[];

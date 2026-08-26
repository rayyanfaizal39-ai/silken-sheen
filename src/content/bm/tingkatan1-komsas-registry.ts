import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan1AsalPadiMindMap } from "@/content/bm/asal-padi-form1-mindmap";
import { bahasaMelayuTingkatan1StrategiKomsasMindMap } from "@/content/bm/strategi-memahami-menjawab-komsas-form1-mindmap";

export const bahasaMelayuTingkatan1KomsasRegistry = [
  {
    id: "bm-f1-strategi-memahami-menjawab-komsas-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Strategi Memahami dan Menjawab KOMSAS",
    title: "Strategi Memahami dan Menjawab KOMSAS",
    description:
      "Pelajari cara menganalisis karya sastera, mencari bukti dan membina jawapan KOMSAS yang tepat serta gramatis.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1StrategiKomsasMindMap,
      title: "Strategi Memahami dan Menjawab KOMSAS",
    },
  },
  {
    id: "bm-f1-asal-padi-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Asal Padi",
    title: "Asal Padi",
    description:
      "Kisah Si Bongsu yang berusaha membawa padi dari kayangan ke bumi melalui keberanian, kebijaksanaan dan kegigihannya.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1AsalPadiMindMap,
      title: "Asal Padi",
    },
  },
] as const satisfies readonly ChapterContent[];

import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan1AkuMindMap } from "@/content/bm/aku-form1-mindmap";
import { bahasaMelayuTingkatan1AsalPadiMindMap } from "@/content/bm/asal-padi-form1-mindmap";
import { bahasaMelayuTingkatan1KunciBahasaMindMap } from "@/content/bm/kunci-bahasa-form1-mindmap";
import { bahasaMelayuTingkatan1HadiahMindMap } from "@/content/bm/hadiah-form1-mindmap";
import { bahasaMelayuTingkatan1OrenMindMap } from "@/content/bm/oren-form1-mindmap";
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
  {
    id: "bm-f1-oren-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Oren",
    title: "Oren",
    description:
      "Kisah kehilangan seekor kucing bernama Oren yang menyedarkan sebuah keluarga tentang kasih sayang, perhatian dan tanggungjawab terhadap haiwan peliharaan.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1OrenMindMap,
      title: "Oren",
    },
  },
  {
    id: "bm-f1-aku-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Aku",
    title: "Aku",
    description:
      "Sajak mengetengahkan semangat seseorang yang berani menghadapi cabaran dan terus berjuang untuk mencapai matlamat.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1AkuMindMap,
      title: "Aku",
    },
  },
  {
    id: "bm-f1-kunci-bahasa-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Kunci Bahasa",
    title: "Kunci Bahasa",
    description:
      "Sajak tentang kepentingan bahasa sebagai alat komunikasi, lambang maruah, penghubung manusia dan wahana yang berkembang bersama masyarakat.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1KunciBahasaMindMap,
      title: "Kunci Bahasa",
    },
  },
  {
    id: "bm-f1-hadiah-mindmap",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Hadiah",
    title: "Hadiah",
    description:
      "Cerpen yang mengetengahkan cabaran kehidupan, kasih sayang keluarga, ketabahan dan usaha menghadapi kesusahan.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan1HadiahMindMap,
      title: "Hadiah",
    },
  },
] as const satisfies readonly ChapterContent[];

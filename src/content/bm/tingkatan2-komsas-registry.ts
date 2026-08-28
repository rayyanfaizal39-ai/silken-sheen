import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan2PantunAlamRemajaMindMap } from "@/content/bm/pantun-alam-remaja-form2-mindmap";
import { bahasaMelayuTingkatan2PantunKiasanMindMap } from "@/content/bm/pantun-kiasan-form2-mindmap";

export const bahasaMelayuTingkatan2KomsasRegistry = [
  {
    id: "bm-f2-pantun-alam-remaja-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Pantun Alam Remaja",
    title: "Pantun Alam Remaja",
    description:
      "Pantun yang menggambarkan kehidupan remaja dan hubungan kekeluargaan, khususnya kasih sayang, perhatian dan kegembiraan dalam sesebuah keluarga.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2PantunAlamRemajaMindMap,
      title: "Pantun Alam Remaja",
    },
  },
  {
    id: "bm-f2-pantun-kiasan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Pantun Kiasan",
    title: "Pantun Kiasan",
    description:
      "Pantun yang menggunakan bahasa kiasan dan perlambangan untuk menyampaikan nasihat, teguran serta pandangan tentang sikap dan kehidupan manusia.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2PantunKiasanMindMap,
      title: "Pantun Kiasan",
    },
  },
] as const satisfies readonly ChapterContent[];

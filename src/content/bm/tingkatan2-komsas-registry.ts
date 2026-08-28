import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan2PantunAlamRemajaMindMap } from "@/content/bm/pantun-alam-remaja-form2-mindmap";

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
] as const satisfies readonly ChapterContent[];

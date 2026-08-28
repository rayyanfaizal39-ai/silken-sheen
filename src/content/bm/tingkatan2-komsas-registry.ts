import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan2PantunAlamRemajaMindMap } from "@/content/bm/pantun-alam-remaja-form2-mindmap";
import { bahasaMelayuTingkatan2PantunBudiMindMap } from "@/content/bm/pantun-budi-form2-mindmap";
import { bahasaMelayuTingkatan2PantunKiasanMindMap } from "@/content/bm/pantun-kiasan-form2-mindmap";
import { bahasaMelayuTingkatan2PantunKasihSayangMindMap } from "@/content/bm/pantun-kasih-sayang-form2-mindmap";
import { bahasaMelayuTingkatan2PantunNasihatMindMap } from "@/content/bm/pantun-nasihat-form2-mindmap";
import { bahasaMelayuTingkatan2SyairNasihatMindMap } from "@/content/bm/syair-nasihat-form2-mindmap";
import { bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap } from "@/content/bm/dalam-persekitaran-kata-kata-form2-mindmap";

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
  {
    id: "bm-f2-pantun-budi-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Pantun Budi",
    title: "Pantun Budi",
    description:
      "Pantun yang menekankan kepentingan budi bahasa, mengenang jasa, menjaga tutur kata dan memelihara kemuliaan diri serta bangsa.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2PantunBudiMindMap,
      title: "Pantun Budi",
    },
  },
  {
    id: "bm-f2-pantun-nasihat-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Pantun Nasihat",
    title: "Pantun Nasihat",
    description:
      "Pantun yang memberikan panduan hidup supaya manusia melakukan kebaikan, menjauhi perbuatan buruk, menjaga tutur kata, beradab dan pandai membawa diri.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2PantunNasihatMindMap,
      title: "Pantun Nasihat",
    },
  },
  {
    id: "bm-f2-pantun-kasih-sayang-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Pantun Kasih Sayang",
    title: "Pantun Kasih Sayang",
    description:
      "Pantun yang menggambarkan kasih, kekaguman, harapan, batas diri serta keyakinan terhadap jodoh dan pertemuan.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2PantunKasihSayangMindMap,
      title: "Pantun Kasih Sayang",
    },
  },
  {
    id: "bm-f2-syair-nasihat-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
    title: "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
    description:
      "Syair berbentuk nasihat seorang bapa kepada anaknya tentang tanggungjawab sebagai pemimpin, keadilan, amanah, ilmu dan kebijaksanaan dalam menjalankan pemerintahan.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2SyairNasihatMindMap,
      title: "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
    },
  },
  {
    id: "bm-f2-dalam-persekitaran-kata-kata-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Dalam Persekitaran Kata-kata",
    title: "Dalam Persekitaran Kata-kata",
    description:
      "Sajak yang mengangkat bahasa sebagai anugerah Tuhan yang membolehkan manusia berfikir, menyampaikan ilmu, memahami alam dan membina tamadun dari satu zaman ke zaman yang lain.",
    categoryLabel: "KOMSAS",
    mindMap: {
      data: bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap,
      title: "Dalam Persekitaran Kata-kata",
    },
  },
] as const satisfies readonly ChapterContent[];

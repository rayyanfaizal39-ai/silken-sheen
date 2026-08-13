import type { ChapterContent } from "@/content/types";
import { bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap } from "@/content/bm/maksud-frasa-ungkapan-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2IsiTersiratMindMap } from "@/content/bm/mengenal-pasti-isi-tersirat-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2IsiTersuratMindMap } from "@/content/bm/mengenal-pasti-isi-tersurat-lanjutan-form2-mindmap";
import { bahasaMelayuTingkatan2KbatMindMap } from "@/content/bm/menjawab-soalan-kbat-lanjutan-form2-mindmap";
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
  {
    id: "bm-f2-mengenal-pasti-isi-tersirat-lanjutan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Mengenal Pasti Isi Tersirat (Lanjutan)",
    title: "Mengenal Pasti Isi Tersirat (Lanjutan)",
    description:
      "Membuat inferens yang lebih matang dengan menghubungkan petunjuk, tindakan, sebab, kesan dan maklumat daripada beberapa bahagian petikan.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan2IsiTersiratMindMap,
      title: "Mengenal Pasti Isi Tersirat (Lanjutan)",
    },
  },
  {
    id: "bm-f2-maksud-frasa-ungkapan-lanjutan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Maksud Frasa dan Ungkapan (Lanjutan)",
    title: "Maksud Frasa dan Ungkapan (Lanjutan)",
    description:
      "Menentukan makna perkataan, frasa dan ungkapan yang lebih kompleks melalui konteks, petunjuk bahasa dan hubungan idea dalam petikan.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap,
      title: "Maksud Frasa dan Ungkapan (Lanjutan)",
    },
  },
  {
    id: "bm-f2-menjawab-soalan-kbat-lanjutan-mindmap",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Menjawab Soalan KBAT (Lanjutan)",
    title: "Menjawab Soalan KBAT (Lanjutan)",
    description:
      "Mengembangkan jawapan KBAT secara logik dengan menghubungkan petikan, pengetahuan, alasan, kesan dan cadangan yang relevan.",
    categoryLabel: "Pemahaman",
    mindMap: {
      data: bahasaMelayuTingkatan2KbatMindMap,
      title: "Menjawab Soalan KBAT (Lanjutan)",
    },
  },
] as const satisfies readonly ChapterContent[];

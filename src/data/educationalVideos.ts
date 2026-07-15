import type { VideoBlock } from "@/content/types";

export type EducationalVideo = VideoBlock;

/**
 * Educational videos keyed by the existing chapter registry IDs.
 * Chapters without a confirmed video are intentionally omitted.
 */
export const educationalVideos: Readonly<Record<string, EducationalVideo>> = {
  "sejarah-f1-c3": {
    title: "Sejarah Tingkatan 1 — Bab 3",
    youtubeId: "3Hx4FX1avMU",
    startSeconds: 5,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c4": {
    title: "Sejarah Tingkatan 1 — Bab 4",
    youtubeId: "fdU9wX5oGAI",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c5": {
    title: "Sejarah Tingkatan 1 — Bab 5",
    youtubeId: "UXeM03mYPO4",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c6": {
    title: "Sejarah Tingkatan 1 — Bab 6",
    youtubeId: "gSXFJYisA6w",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c7": {
    title: "Sejarah Tingkatan 1 — Bab 7",
    youtubeId: "aeLoGzzm85o",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c8": {
    title: "Sejarah Tingkatan 1 — Bab 8",
    youtubeId: "RIDZG6LTY5Y",
    startSeconds: 34,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c1": {
    title: "Geografi Tingkatan 1 — Bab 1",
    youtubeId: "JUuZvLnZZ9g",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c2": {
    title: "Geografi Tingkatan 1 — Bab 2",
    youtubeId: "QwwGQkkwsKY",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c3": {
    title: "Geografi Tingkatan 1 — Bab 3",
    youtubeId: "SBVyU11fFQo",
    startSeconds: 9,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c4": {
    title: "Geografi Tingkatan 1 — Bab 4",
    youtubeId: "NPba81pAdzM",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c5": {
    title: "Geografi Tingkatan 1 — Bab 5",
    youtubeId: "WB_CJ0QMWY4",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c6": {
    title: "Geografi Tingkatan 1 — Bab 6",
    youtubeId: "f9L47UDDmYs",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c7": {
    title: "Geografi Tingkatan 1 — Bab 7",
    youtubeId: "k5Grd-pA-Ds",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c8": {
    title: "Geografi Tingkatan 1 — Bab 8",
    youtubeId: "jBlE8KiuXMo",
    startSeconds: 28,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c9": {
    title: "Geografi Tingkatan 1 — Bab 9",
    youtubeId: "z-m91v62Sgk",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c10": {
    title: "Geografi Tingkatan 1 — Bab 10",
    youtubeId: "MBayGMiAkzk",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c11": {
    title: "Geografi Tingkatan 1 — Bab 11",
    youtubeId: "iCOizuEZ07U",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c12": {
    title: "Geografi Tingkatan 1 — Bab 12",
    youtubeId: "CYgIZNo3wSQ",
    startSeconds: 9,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f1-c13": {
    title: "Geografi Tingkatan 1 — Bab 13",
    youtubeId: "usfpVZ_FkyI",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
};

export function getEducationalVideo(chapterId: string): EducationalVideo | undefined {
  return educationalVideos[chapterId];
}

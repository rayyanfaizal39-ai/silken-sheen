import type { VideoBlock } from "@/content/types";

export type EducationalVideo = VideoBlock;

/**
 * Educational videos keyed by the existing chapter registry IDs.
 * Chapters without a confirmed video are intentionally omitted.
 */
export const educationalVideos: Readonly<Record<string, EducationalVideo>> = {
  "sejarah-f1-c1": {
    title: "Sejarah Tingkatan 1 — Bab 1",
    youtubeId: "dZuhYNHdQ7U",
    startSeconds: 10,
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "sejarah-f1-c2": {
    title: "Sejarah Tingkatan 1 — Bab 2",
    youtubeId: "cLgCMnVoJ5g",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
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
  "sejarah-f2-c1": {
    title: "Sejarah Tingkatan 2 — Bab 1",
    youtubeId: "p6BhanQF6OE",
    captionLang: "ms",
  },
  "sejarah-f2-c2": {
    title: "Sejarah Tingkatan 2 — Bab 2",
    youtubeId: "i1UtsCwEqJc",
    captionLang: "ms",
  },
  "sejarah-f2-c3": {
    title: "Sejarah Tingkatan 2 — Bab 3",
    youtubeId: "TRgsYd5wo5I",
    captionLang: "ms",
  },
  "sejarah-f2-c4": {
    title: "Sejarah Tingkatan 2 — Bab 4",
    youtubeId: "FFi8JiF2TJU",
    captionLang: "ms",
  },
  "sejarah-f2-c5": {
    title: "Sejarah Tingkatan 2 — Bab 5",
    youtubeId: "GAZCHn6vK8U",
    captionLang: "ms",
  },
  "sejarah-f2-c6": {
    title: "Sejarah Tingkatan 2 — Bab 6",
    youtubeId: "vw6oMLOujxk",
    captionLang: "ms",
  },
  "sejarah-f2-c7": {
    title: "Sejarah Tingkatan 2 — Bab 7",
    youtubeId: "Fz8_K8o7gq0",
    captionLang: "ms",
  },
  "sejarah-f2-c8": {
    title: "Sejarah Tingkatan 2 — Bab 8",
    youtubeId: "pkviFyb56X0",
    captionLang: "ms",
  },
  "sejarah-f2-c9": {
    title: "Sejarah Tingkatan 2 — Bab 9",
    youtubeId: "tpwz9PDtWe4",
    captionLang: "ms",
  },
  "sejarah-f2-c10": {
    title: "Sejarah Tingkatan 2 — Bab 10",
    youtubeId: "UOM59qDl348",
    captionLang: "ms",
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
  "geography-f2-c1": {
    title: "Geografi Tingkatan 2 — Bab 1",
    youtubeId: "cy4uQxDfxz0",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c2": {
    title: "Geografi Tingkatan 2 — Bab 2",
    youtubeId: "c6vh5LMDUUA",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c3": {
    title: "Geografi Tingkatan 2 — Bab 3",
    youtubeId: "YqPTyVp5NnM",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c4": {
    title: "Geografi Tingkatan 2 — Bab 4",
    youtubeId: "x9CtGfp2YsE",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c5": {
    title: "Geografi Tingkatan 2 — Bab 5",
    youtubeId: "iytX92LJH20",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c6": {
    title: "Geografi Tingkatan 2 — Bab 6",
    youtubeId: "is0AgnSbF-s",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c7": {
    title: "Geografi Tingkatan 2 — Bab 7",
    youtubeId: "ElgIWBwP9G8",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c8": {
    title: "Geografi Tingkatan 2 — Bab 8",
    youtubeId: "1zSGv0yNznE",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c9": {
    title: "Geografi Tingkatan 2 — Bab 9",
    youtubeId: "bN20o8LBlnQ",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "geography-f2-c10": {
    title: "Geografi Tingkatan 2 — Bab 10",
    youtubeId: "A5iMUl-8zIY",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c1": {
    title: "Sains Tingkatan 1 — Bab 1",
    youtubeId: "qWIof78Sbas",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c2": {
    title: "Sains Tingkatan 1 — Bab 2",
    youtubeId: "yQWGI7i4Jtc",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c3": {
    title: "Sains Tingkatan 1 — Bab 3",
    youtubeId: "BgoqhcILGeE",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c4": {
    title: "Sains Tingkatan 1 — Bab 4",
    youtubeId: "Ha2tIznbrYE",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c5": {
    title: "Sains Tingkatan 1 — Bab 5",
    youtubeId: "7dbejj6JFdc",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c6": {
    title: "Sains Tingkatan 1 — Bab 6",
    youtubeId: "4nbuIJSUXO4",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c7": {
    title: "Sains Tingkatan 1 — Bab 7",
    youtubeId: "bSCnibrJY80",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c8": {
    title: "Sains Tingkatan 1 — Bab 8",
    youtubeId: "caOC4OsDWQI",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c9": {
    title: "Sains Tingkatan 1 — Bab 9",
    youtubeId: "GLFJlQ71pJE",
    captionLang: "ms",
    hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
  },
  "science-f1-c1-dlp": {
    title: "Science Form 1 — Chapter 1",
    youtubeId: "TY49EVN-mJI",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c2-dlp": {
    title: "Science Form 1 — Chapter 2",
    youtubeId: "U1ncevXORm0",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c3-dlp": {
    title: "Science Form 1 — Chapter 3",
    youtubeId: "nROw9wVMw2Y",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c4-dlp": {
    title: "Science Form 1 — Chapter 4",
    youtubeId: "JrUIDZWCORU",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c5-dlp": {
    title: "Science Form 1 — Chapter 5",
    youtubeId: "yZpe3OYE1wk",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c6-dlp": {
    title: "Science Form 1 — Chapter 6",
    youtubeId: "rCeE5DBvFcQ",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c7-dlp": {
    title: "Science Form 1 — Chapter 7",
    youtubeId: "AA7mZ_pHB_k",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c8-dlp": {
    title: "Science Form 1 — Chapter 8",
    youtubeId: "eAG6NflS5R8",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
  "science-f1-c9-dlp": {
    title: "Science Form 1 — Chapter 9",
    youtubeId: "gruPxCff8G8",
    captionLang: "en",
    hint: "Turn on captions for better understanding! 💡",
  },
};

export function getEducationalVideo(chapterId: string, language?: string): EducationalVideo | undefined {
  return (language && educationalVideos[`${chapterId}-${language}`]) || educationalVideos[chapterId];
}

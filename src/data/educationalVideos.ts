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
};

export function getEducationalVideo(chapterId: string): EducationalVideo | undefined {
  return educationalVideos[chapterId];
}

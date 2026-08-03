import type { VideoBlock } from "@/content/types";

export const mathForm1Dlp = {
  1: "X1LtOK8PmYk",
  2: "5nBuC-erLlY",
  3: "RSQimjMKfAk",
  4: "DRu5D4lrs1Q",
  5: "RqzA1bXNZKg",
  6: "sFPvgc4h-Ls",
  7: "QE5eukHOWoI",
  8: "NjgUSu4iXYw",
  9: "13D2S3QEELM",
  10: "MhtPLqC8O4U",
  11: "CcbIt53yMIg",
  12: "HsLglWoZ-xA",
  13: "5SOx-cMdxms",
} as const satisfies Readonly<Record<number, string>>;

export const mathForm1DlpEducationalVideos: Readonly<Record<string, VideoBlock>> =
  Object.fromEntries(
    Object.entries(mathForm1Dlp).map(([chapterNumber, youtubeId]) => [
      `math-f1-c${chapterNumber}-dlp`,
      {
        title: `Mathematics Form 1 — Chapter ${chapterNumber}`,
        youtubeId,
        captionLang: "en",
      },
    ]),
  );

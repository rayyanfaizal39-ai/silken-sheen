import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter, getRegisteredSubjectChapters } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { educationalVideos, getEducationalVideo, mathForm2Dlp } from "./educationalVideos";

const expectedMathForm2Dlp = {
  1: "lQ_3lQGuePQ",
  2: "kGmznSeQ3qA",
  3: "E18l6XEeVmE",
  4: "U7iiLTHhYDk",
  5: "BJ62VJM8KYA",
  6: "t69joIfDF1U",
  7: "yZbCYccJyBo",
  8: "fCM-RvRyBrI",
  9: "kdM-7VeRYBM",
  10: "jvxnKH3dfpc",
  11: "JbxLV1DK_nY",
  12: "Ri5wlPTGZtc",
  13: "Ah26yRo-OBc",
} as const;

describe("Mathematics Form 2 DLP educational videos", () => {
  it("keeps the named DLP registry exact and complete", () => {
    expect(mathForm2Dlp).toEqual(expectedMathForm2Dlp);
    expect(Object.keys(mathForm2Dlp)).toHaveLength(13);
    expect(new Set(Object.values(mathForm2Dlp)).size).toBe(13);
  });

  it("attaches the correct English video to every existing DLP chapter", () => {
    expect(getRegisteredSubjectChapters("math", "dlp", "Form 2").map(({ key }) => key)).toEqual(
      Object.keys(mathForm2Dlp).map((chapterNumber) => `Chapter ${chapterNumber}`),
    );

    Object.entries(expectedMathForm2Dlp).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f2-c${chapterNumber}`, "dlp");
      const chapter = getChapter("math", `Chapter ${chapterNumber}`, "dlp", "Form 2");

      expect(educationalVideos[`math-f2-c${chapterNumber}-dlp`]).toBe(video);
      expect(video).toEqual({
        title: `Mathematics Form 2 — Chapter ${chapterNumber}`,
        youtubeId,
        captionLang: "en",
        hint: "Turn on captions for better understanding! 💡",
      });
      expect(chapter?.id).toBe(`math-f2-c${chapterNumber}-dlp`);
      expect(chapter?.video).toBe(video);
      expect(getChapterFeatures(chapter).video).toBe(true);
    });
  });

  it("does not add, replace, or fall back to a BM video", () => {
    Object.keys(expectedMathForm2Dlp).forEach((chapterNumber) => {
      const bmChapter = getChapter("math", `Chapter ${chapterNumber}`, "bm", "Form 2");
      const dlpVideo = getEducationalVideo(`math-f2-c${chapterNumber}`, "dlp");

      expect(bmChapter?.id).toBe(`math-f2-c${chapterNumber}-bm`);
      expect(bmChapter?.video).toBeUndefined();
      expect(getEducationalVideo(`math-f2-c${chapterNumber}`, "bm")).toBeUndefined();
      expect(dlpVideo?.youtubeId).toBe(expectedMathForm2Dlp[Number(chapterNumber) as keyof typeof expectedMathForm2Dlp]);
      expect(dlpVideo?.captionLang).toBe("en");
    });
  });

  it("renders every DLP video through the shared responsive privacy-enhanced player", () => {
    Object.entries(expectedMathForm2Dlp).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f2-c${chapterNumber}`, "dlp");
      expect(video).toBeDefined();

      const markup = renderToStaticMarkup(
        <BackgroundMusicProvider>
          <VideoBlock id="video" video={video!} />
        </BackgroundMusicProvider>,
      );

      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain("relative aspect-video");
      expect(markup).toContain("absolute inset-0 w-full h-full");
      expect(markup).toContain('loading="lazy"');
      expect(markup).not.toContain("autoplay=1");
      expect(markup).toContain('allowFullScreen=""');
    });
  });
});

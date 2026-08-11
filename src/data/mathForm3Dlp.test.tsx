import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter, getRegisteredSubjectChapters } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { educationalVideos, getEducationalVideo, mathForm3Dlp } from "./educationalVideos";

const expectedMathForm3Dlp = {
  1: "lKe6WUBHSHg",
  2: "JLL8qeumN28",
  3: "pREX70p1bZg",
  4: "h5J2jDFUXPo",
  5: "K1GL_2UebO4",
  6: "L6_bMzbDEhs",
  7: "lZRPe7q3CY0",
  8: "sFqLm_akr4M",
  9: "QrZpyiwzSPc",
} as const;

describe("Mathematics Form 3 DLP educational videos", () => {
  it("keeps the named DLP registry exact and complete", () => {
    expect(mathForm3Dlp).toEqual(expectedMathForm3Dlp);
    expect(Object.keys(mathForm3Dlp)).toHaveLength(9);
    expect(new Set(Object.values(mathForm3Dlp)).size).toBe(9);
  });

  it("attaches the correct English video to every existing DLP chapter", () => {
    expect(getRegisteredSubjectChapters("math", "dlp", "Form 3").map(({ key }) => key)).toEqual(
      Object.keys(mathForm3Dlp).map((chapterNumber) => `Chapter ${chapterNumber}`),
    );

    Object.entries(expectedMathForm3Dlp).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f3-c${chapterNumber}`, "dlp");
      const chapter = getChapter("math", `Chapter ${chapterNumber}`, "dlp", "Form 3");

      expect(educationalVideos[`math-f3-c${chapterNumber}-dlp`]).toBe(video);
      expect(video).toEqual({
        title: `Mathematics Form 3 — Chapter ${chapterNumber}`,
        youtubeId,
        captionLang: "en",
        hint: "Turn on captions for better understanding! 💡",
      });
      expect(chapter?.id).toBe(`math-f3-c${chapterNumber}-dlp`);
      expect(chapter?.video).toBe(video);
      expect(getChapterFeatures(chapter).video).toBe(true);
    });
  });

  it("requires the DLP track and never falls back to a BM video", () => {
    Object.entries(expectedMathForm3Dlp).forEach(([chapterNumber, youtubeId]) => {
      const bmChapter = getChapter("math", `Chapter ${chapterNumber}`, "bm", "Form 3");
      const dlpChapter = getChapter("math", `Chapter ${chapterNumber}`, "dlp", "Form 3");

      expect(bmChapter?.id).toBe(`math-f3-c${chapterNumber}-bm`);
      expect(bmChapter?.video).toBeUndefined();
      expect(getEducationalVideo(`math-f3-c${chapterNumber}`, "bm")).toBeUndefined();
      expect(dlpChapter?.id).toBe(`math-f3-c${chapterNumber}-dlp`);
      expect(dlpChapter?.video?.youtubeId).toBe(youtubeId);
      expect(dlpChapter?.video?.captionLang).toBe("en");
      expect(dlpChapter?.video).not.toBe(bmChapter?.video);
    });
  });

  it("renders every DLP video through the shared responsive privacy-enhanced player", () => {
    Object.entries(expectedMathForm3Dlp).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f3-c${chapterNumber}`, "dlp");
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

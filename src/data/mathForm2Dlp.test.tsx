import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter, getRegisteredSubjectChapters } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import {
  educationalVideos,
  getEducationalVideo,
  mathForm2,
  mathForm2Dlp,
} from "./educationalVideos";

const expectedMathForm2 = {
  1: "ve_Jqz3Wk44",
  2: "VZfVYjE3KXA",
  3: "zMoe-NjwX_8",
  4: "Q6MGiYMLNDE",
  5: "lDbBql4XABM",
  6: "xdJWeh5txgo",
  7: "B1jSwd3W-DU",
  8: "4VJsOR3O8qw",
  9: "N9vsb6Fc8E4",
  10: "M_9TB-aWerY",
  11: "9Sxvvgq6IzA",
  12: "XmLjHrat9Wg",
  13: "zvWp3fmOSgs",
} as const;

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

  it("keeps BM and DLP videos strictly separated by track", () => {
    Object.keys(expectedMathForm2Dlp).forEach((chapterNumber) => {
      const bmChapter = getChapter("math", `Chapter ${chapterNumber}`, "bm", "Form 2");
      const bmVideo = getEducationalVideo(`math-f2-c${chapterNumber}`, "bm");
      const dlpVideo = getEducationalVideo(`math-f2-c${chapterNumber}`, "dlp");

      expect(bmChapter?.id).toBe(`math-f2-c${chapterNumber}-bm`);
      expect(bmChapter?.video).toBe(bmVideo);
      expect(bmVideo?.youtubeId).toBe(
        expectedMathForm2[Number(chapterNumber) as keyof typeof expectedMathForm2],
      );
      expect(dlpVideo?.youtubeId).toBe(
        expectedMathForm2Dlp[Number(chapterNumber) as keyof typeof expectedMathForm2Dlp],
      );
      expect(dlpVideo?.captionLang).toBe("en");
      expect(bmVideo?.youtubeId).not.toBe(dlpVideo?.youtubeId);
      expect(getEducationalVideo(`math-f2-c${chapterNumber}`)).toBeUndefined();
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

describe("Matematik Tingkatan 2 BM educational videos", () => {
  it("keeps the named BM registry exact and complete", () => {
    expect(mathForm2).toEqual(expectedMathForm2);
    expect(Object.keys(mathForm2)).toHaveLength(13);
    expect(new Set(Object.values(mathForm2)).size).toBe(13);
  });

  it("attaches the correct Malay video to every existing BM chapter", () => {
    expect(getRegisteredSubjectChapters("math", "bm", "Form 2").map(({ key }) => key)).toEqual(
      Object.keys(mathForm2).map((chapterNumber) => `Chapter ${chapterNumber}`),
    );

    Object.entries(expectedMathForm2).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f2-c${chapterNumber}`, "bm");
      const chapter = getChapter("math", `Chapter ${chapterNumber}`, "bm", "Form 2");

      expect(educationalVideos[`math-f2-c${chapterNumber}-bm`]).toBe(video);
      expect(video).toEqual({
        title: `Matematik Tingkatan 2 â€” Bab ${chapterNumber}`,
        youtubeId,
        captionLang: "ms",
        hint: "Hidupkan sari kata untuk pemahaman lebih baik! ðŸ’¡",
      });
      expect(chapter?.id).toBe(`math-f2-c${chapterNumber}-bm`);
      expect(chapter?.video).toBe(video);
      expect(getChapterFeatures(chapter).video).toBe(true);
    });
  });

  it("renders every BM video through the shared responsive privacy-enhanced player", () => {
    Object.entries(expectedMathForm2).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f2-c${chapterNumber}`, "bm");
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

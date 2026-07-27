import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter } from "@/content/registry";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { educationalVideos, getEducationalVideo } from "./educationalVideos";

const geographyForm3 = [
  ["geography-f3-c1", "VG7WUYrkSB4"],
  ["geography-f3-c2", "WaSl1F3yWiA"],
  ["geography-f3-c3", "EAK7QXE1_Jk"],
  ["geography-f3-c4", "uGw-q2l6HSc"],
  ["geography-f3-c5", "Dz_KnRpBeS8"],
  ["geography-f3-c6", "8KEj28TDxXo"],
  ["geography-f3-c7", "GI1rOYAney4"],
  ["geography-f3-c8", "eBQGQv2qOB4"],
  ["geography-f3-c9", "3yJ_Ae5M8RQ"],
  ["geography-f3-c10", "ut2aIluQ5Nk"],
  ["geography-f3-c11", "Y9KFUpoFqq4"],
] as const;

const geographyForm1 = [
  "JUuZvLnZZ9g",
  "QwwGQkkwsKY",
  "SBVyU11fFQo",
  "NPba81pAdzM",
  "WB_CJ0QMWY4",
  "f9L47UDDmYs",
  "k5Grd-pA-Ds",
  "jBlE8KiuXMo",
  "z-m91v62Sgk",
  "MBayGMiAkzk",
  "iCOizuEZ07U",
  "CYgIZNo3wSQ",
  "usfpVZ_FkyI",
] as const;

const geographyForm2 = [
  "cy4uQxDfxz0",
  "c6vh5LMDUUA",
  "YqPTyVp5NnM",
  "x9CtGfp2YsE",
  "iytX92LJH20",
  "is0AgnSbF-s",
  "ElgIWBwP9G8",
  "1zSGv0yNznE",
  "bN20o8LBlnQ",
  "A5iMUl-8zIY",
] as const;

describe("Geografi Tingkatan 3 educational videos", () => {
  it("registers the exact YouTube ID for all eleven supplied chapters", () => {
    geographyForm3.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const video = getEducationalVideo(chapterId);

      expect(video).toEqual({
        title: `Geografi Tingkatan 3 — Bab ${chapterNumber}`,
        youtubeId,
        captionLang: "ms",
        hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
      });
      expect(video?.startSeconds).toBeUndefined();
    });

    expect(
      Object.keys(educationalVideos).filter((chapterId) => chapterId.startsWith("geography-f3-")),
    ).toEqual(geographyForm3.map(([chapterId]) => chapterId));
    expect(getEducationalVideo("geography-f3-c12")).toBeUndefined();
  });

  it("attaches each video to the existing Form 3 chapter route", () => {
    geographyForm3.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const chapter = getChapter("geography", `Chapter ${chapterNumber}`, undefined, "Form 3");

      expect(chapter?.id).toBe(chapterId);
      expect(chapter?.video).toBe(getEducationalVideo(chapterId));
      expect(chapter?.video?.youtubeId).toBe(youtubeId);
    });

    expect(getChapter("geography", "Chapter 12", undefined, "Form 3")?.video).toBeUndefined();
  });

  it("renders every mapping through the existing responsive youtube-nocookie player", () => {
    geographyForm3.forEach(([chapterId, youtubeId]) => {
      const video = getEducationalVideo(chapterId);
      expect(video).toBeDefined();

      const markup = renderToStaticMarkup(
        <BackgroundMusicProvider>
          <VideoBlock video={video!} />
        </BackgroundMusicProvider>,
      );

      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain("relative aspect-video");
      expect(markup).toContain("absolute inset-0 w-full h-full");
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("enablejsapi=1");
      expect(markup).not.toContain("autoplay=1");
    });
  });

  it("preserves every existing Geografi Form 1 and Form 2 video mapping", () => {
    expect(
      geographyForm1.map(
        (_, index) => getEducationalVideo(`geography-f1-c${index + 1}`)?.youtubeId,
      ),
    ).toEqual(geographyForm1);
    expect(
      geographyForm2.map(
        (_, index) => getEducationalVideo(`geography-f2-c${index + 1}`)?.youtubeId,
      ),
    ).toEqual(geographyForm2);
  });
});

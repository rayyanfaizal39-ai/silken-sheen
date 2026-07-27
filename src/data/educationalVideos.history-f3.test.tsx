import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter, getRegisteredSubjectChapters } from "@/content/registry";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { educationalVideos, getEducationalVideo } from "./educationalVideos";

const historyForm3 = [
  ["sejarah-f3-c1", "t1DrJ2PJ9tg"],
  ["sejarah-f3-c2", "u2quMaHwCgg"],
  ["sejarah-f3-c3", "fUDaUyr7Asg"],
  ["sejarah-f3-c4", "eRe4E-KBt7c"],
  ["sejarah-f3-c5", "nJnO5d9x3Zw"],
  ["sejarah-f3-c6", "al3-03vDA8A"],
  ["sejarah-f3-c7", "uvr8e7vyQPA"],
  ["sejarah-f3-c8", "CRnb1ZwIaa8"],
] as const;

const historyForm1 = [
  "dZuhYNHdQ7U",
  "cLgCMnVoJ5g",
  "3Hx4FX1avMU",
  "fdU9wX5oGAI",
  "UXeM03mYPO4",
  "gSXFJYisA6w",
  "aeLoGzzm85o",
  "RIDZG6LTY5Y",
] as const;

const historyForm2 = [
  "p6BhanQF6OE",
  "i1UtsCwEqJc",
  "TRgsYd5wo5I",
  "FFi8JiF2TJU",
  "GAZCHn6vK8U",
  "vw6oMLOujxk",
  "Fz8_K8o7gq0",
  "pkviFyb56X0",
  "tpwz9PDtWe4",
  "UOM59qDl348",
] as const;

describe("Sejarah Tingkatan 3 educational videos", () => {
  it("registers the exact YouTube ID once for each of the eight chapters", () => {
    historyForm3.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;

      expect(getEducationalVideo(chapterId)).toEqual({
        title: `Sejarah Tingkatan 3 — Bab ${chapterNumber}`,
        youtubeId,
        captionLang: "ms",
        hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
      });
    });

    expect(
      Object.keys(educationalVideos).filter((chapterId) => chapterId.startsWith("sejarah-f3-")),
    ).toEqual(historyForm3.map(([chapterId]) => chapterId));
    expect(getEducationalVideo("sejarah-f3-c9")).toBeUndefined();
  });

  it("attaches each video to the existing ordered Form 3 Notes chapter route", () => {
    expect(
      getRegisteredSubjectChapters("sejarah", undefined, "Form 3").map(({ key }) => key),
    ).toEqual(historyForm3.map((_, index) => `Chapter ${index + 1}`));

    historyForm3.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const chapter = getChapter("sejarah", `Chapter ${chapterNumber}`, undefined, "Form 3");

      expect(chapter?.id).toBe(chapterId);
      expect(chapter?.video).toBe(getEducationalVideo(chapterId));
      expect(chapter?.video?.youtubeId).toBe(youtubeId);
    });

    expect(getChapter("sejarah", "Chapter 9", undefined, "Form 3")).toBeUndefined();
  });

  it("renders all videos through the existing responsive youtube-nocookie player", () => {
    historyForm3.forEach(([chapterId, youtubeId]) => {
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
      expect(markup).toContain('allowFullScreen=""');
    });
  });

  it("preserves every existing Sejarah Form 1 and Form 2 mapping", () => {
    expect(
      historyForm1.map((_, index) => getEducationalVideo(`sejarah-f1-c${index + 1}`)?.youtubeId),
    ).toEqual(historyForm1);
    expect(
      historyForm2.map((_, index) => getEducationalVideo(`sejarah-f2-c${index + 1}`)?.youtubeId),
    ).toEqual(historyForm2);
  });

  it("does not alter another subject's registry or lookup", () => {
    expect(getEducationalVideo("geography-f3-c1")?.youtubeId).toBe("VG7WUYrkSB4");
    expect(getEducationalVideo("science-f1-c1")?.youtubeId).toBe("qWIof78Sbas");
  });
});

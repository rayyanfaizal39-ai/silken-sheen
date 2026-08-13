import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { chapters, getChapter } from "@/content/registry";
import { educationalVideos, getEducationalVideo } from "@/data/educationalVideos";
import { mathForm1Dlp } from "@/data/mathForm1Dlp";

vi.mock("@/hooks/use-background-music", () => ({
  useBackgroundMusic: () => ({
    pauseForMedia: vi.fn(),
    resumeAfterMedia: vi.fn(),
  }),
}));

const expectedMathForm1Dlp = {
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
} as const;

describe("Mathematics Form 1 DLP educational videos", () => {
  it("keeps the standalone mathForm1Dlp registry exact and complete", () => {
    expect(mathForm1Dlp).toEqual(expectedMathForm1Dlp);
    expect(Object.keys(mathForm1Dlp)).toHaveLength(13);
  });

  it("resolves every chapter through the existing language-aware lookup without mixing BM", () => {
    Object.entries(expectedMathForm1Dlp).forEach(([chapterNumber, youtubeId]) => {
      const chapterId = `math-f1-c${chapterNumber}`;
      const dlpVideo = getEducationalVideo(chapterId, "dlp");
      const bmVideo = getEducationalVideo(chapterId, "bm");

      expect(dlpVideo).toEqual(educationalVideos[`${chapterId}-dlp`]);
      expect(dlpVideo).toMatchObject({
        title: `Mathematics Form 1 — Chapter ${chapterNumber}`,
        youtubeId,
        captionLang: "en",
      });
      expect(bmVideo).toBe(educationalVideos[`${chapterId}-bm`] ?? educationalVideos[chapterId]);
      expect(bmVideo).not.toBe(dlpVideo);
    });
  });

  it("attaches the correct video only to each existing Form 1 DLP chapter row", () => {
    const form1MathRows = chapters.filter(
      (chapter) => chapter.subjectId === "math" && chapter.form === "Form 1",
    );
    const dlpRows = form1MathRows.filter((chapter) => chapter.lang === "dlp");
    const bmRows = form1MathRows.filter((chapter) => chapter.lang === "bm");

    expect(dlpRows).toHaveLength(13);
    expect(bmRows).toHaveLength(13);

    Object.entries(expectedMathForm1Dlp).forEach(([chapterNumber, youtubeId]) => {
      const chapter = getChapter("math", `Chapter ${chapterNumber}`, "dlp", "Form 1");

      expect(chapter?.id).toBe(`math-f1-c${chapterNumber}-dlp`);
      expect(chapter?.lang).toBe("dlp");
      expect(chapter?.video?.youtubeId).toBe(youtubeId);
      expect(chapter?.video?.title).toBe(`Mathematics Form 1 — Chapter ${chapterNumber}`);
      expect(chapter?.video?.captionLang).toBe("en");
    });

    expect(bmRows.every((chapter) => chapter.video?.captionLang === "ms")).toBe(true);
    expect(
      bmRows.every(
        (chapter) =>
          chapter.video !== undefined &&
          !Object.values(expectedMathForm1Dlp).includes(
            chapter.video
              .youtubeId as (typeof expectedMathForm1Dlp)[keyof typeof expectedMathForm1Dlp],
          ),
      ),
    ).toBe(true);
  });

  it("renders all 13 videos through the existing responsive youtube-nocookie player", () => {
    Object.entries(expectedMathForm1Dlp).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f1-c${chapterNumber}`, "dlp");
      expect(video).toBeDefined();

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));

      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("aspect-video");
      expect(markup).toContain("w-full h-full");
      expect(markup).not.toContain("autoplay=1");
      expect(markup).not.toContain("Matematik Tingkatan 1");
    });
  });
});

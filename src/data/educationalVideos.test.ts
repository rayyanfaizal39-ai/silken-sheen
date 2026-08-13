import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { VideoBlock } from "@/components/notes/VideoBlock";
import { chapters, getChapter } from "@/content/registry";
import { educationalVideos, getEducationalVideo, mathForm1 } from "./educationalVideos";

vi.mock("@/hooks/use-background-music", () => ({
  useBackgroundMusic: () => ({
    pauseForMedia: vi.fn(),
    resumeAfterMedia: vi.fn(),
  }),
}));

const sejarahForm1 = [
  ["sejarah-f1-c1", "dZuhYNHdQ7U", 10],
  ["sejarah-f1-c2", "cLgCMnVoJ5g", undefined],
  ["sejarah-f1-c3", "3Hx4FX1avMU", 5],
  ["sejarah-f1-c4", "fdU9wX5oGAI", undefined],
  ["sejarah-f1-c5", "UXeM03mYPO4", undefined],
  ["sejarah-f1-c6", "gSXFJYisA6w", undefined],
  ["sejarah-f1-c7", "aeLoGzzm85o", undefined],
  ["sejarah-f1-c8", "RIDZG6LTY5Y", 34],
] as const;

const sejarahForm2 = [
  ["sejarah-f2-c1", "p6BhanQF6OE"],
  ["sejarah-f2-c2", "i1UtsCwEqJc"],
  ["sejarah-f2-c3", "TRgsYd5wo5I"],
  ["sejarah-f2-c4", "FFi8JiF2TJU"],
  ["sejarah-f2-c5", "GAZCHn6vK8U"],
  ["sejarah-f2-c6", "vw6oMLOujxk"],
  ["sejarah-f2-c7", "Fz8_K8o7gq0"],
  ["sejarah-f2-c8", "pkviFyb56X0"],
  ["sejarah-f2-c9", "tpwz9PDtWe4"],
  ["sejarah-f2-c10", "UOM59qDl348"],
] as const;

const scienceForm1 = [
  ["science-f1-c1", "qWIof78Sbas"],
  ["science-f1-c2", "yQWGI7i4Jtc"],
  ["science-f1-c3", "BgoqhcILGeE"],
  ["science-f1-c4", "Ha2tIznbrYE"],
  ["science-f1-c5", "7dbejj6JFdc"],
  ["science-f1-c6", "4nbuIJSUXO4"],
  ["science-f1-c7", "bSCnibrJY80"],
  ["science-f1-c8", "caOC4OsDWQI"],
  ["science-f1-c9", "GLFJlQ71pJE"],
] as const;

const scienceForm2 = [
  ["science-f2-c1", "vkA6GCnPVCM"],
  ["science-f2-c2", "C8xkNNYVNbU"],
  ["science-f2-c3", "pKMdFhEMxzQ"],
  ["science-f2-c4", "haZu6hJZjIw"],
  ["science-f2-c5", "2HJQG6poyL4"],
  ["science-f2-c6", "X-xGqQb1LXY"],
  ["science-f2-c7", "kcPjkhMsEiY"],
  ["science-f2-c8", "-ItU2cwAY1c"],
  ["science-f2-c9", "4irkPVLK4R0"],
  ["science-f2-c10", "3tyBRTIHW30"],
  ["science-f2-c11", "a2QRfTVmkV0"],
  ["science-f2-c12", "pcq0Id4K-KI"],
  ["science-f2-c13", "F5yEfVJvGCo"],
] as const;

const scienceForm2Dlp = [
  "UOh_eWjTU9k",
  "Wqs-aexxWhU",
  "0cXzxviA2Q0",
  "AsuGTwauuYY",
  "kPp_SKNrZF0",
  "VUi1PGamgs8",
  "QpWwOeMOSao",
  "ifC7yGoLw-k",
  "Ea_1J2I97vY",
  "Z-bEUMWb2RM",
  "dcQSfCMAQqI",
  "zkbi-rOzwQk",
  "Ht_O3z-Kg_s",
] as const;

const expectedMathForm1 = {
  1: "6lWuKWNSgMk",
  2: "POEPWyIvNzg",
  3: "79eb3y4ExLk",
  4: "M6pyN2PTKwQ",
  5: "N_CQgE89uNA",
  6: "DpShYS-YkvU",
  7: "wPWywnuflNI",
  8: "TqUAI_4Wiw4",
  9: "weMfkPy4Ffc",
  10: "AOXply-AzqI",
  11: "5qJVdhIy1yk",
  12: "sVUzqhRzDHg",
  13: "k0MFu757pm0",
} as const;

describe("educational video registry", () => {
  it("keeps the Matematik Tingkatan 1 BM registry exact and complete", () => {
    expect(mathForm1).toEqual(expectedMathForm1);
    expect(Object.keys(mathForm1)).toHaveLength(13);
  });

  it("resolves all Matematik Tingkatan 1 videos by language without crossing BM and DLP", () => {
    Object.entries(expectedMathForm1).forEach(([chapterNumber, youtubeId]) => {
      const chapterId = `math-f1-c${chapterNumber}`;
      const bmVideo = getEducationalVideo(chapterId, "bm");
      const dlpVideo = getEducationalVideo(chapterId, "dlp");

      expect(bmVideo).toEqual(educationalVideos[`${chapterId}-bm`]);
      expect(bmVideo).toMatchObject({
        title: `Matematik Tingkatan 1 — Bab ${chapterNumber}`,
        youtubeId,
        captionLang: "ms",
      });
      expect(dlpVideo).toEqual(educationalVideos[`${chapterId}-dlp`]);
      expect(dlpVideo?.youtubeId).not.toBe(youtubeId);
      expect(bmVideo).not.toBe(dlpVideo);
    });
  });

  it("attaches each BM video only to its matching Matematik Tingkatan 1 BM chapter", () => {
    Object.entries(expectedMathForm1).forEach(([chapterNumber, youtubeId]) => {
      const bmChapter = getChapter("math", `Chapter ${chapterNumber}`, "bm", "Form 1");
      const dlpChapter = getChapter("math", `Chapter ${chapterNumber}`, "dlp", "Form 1");

      expect(bmChapter).toMatchObject({
        id: `math-f1-c${chapterNumber}-bm`,
        lang: "bm",
        video: {
          title: `Matematik Tingkatan 1 — Bab ${chapterNumber}`,
          youtubeId,
          captionLang: "ms",
        },
      });
      expect(dlpChapter?.id).toBe(`math-f1-c${chapterNumber}-dlp`);
      expect(dlpChapter?.video?.youtubeId).not.toBe(youtubeId);
    });
  });

  it("renders all Matematik Tingkatan 1 BM videos with the existing safe player behavior", () => {
    Object.entries(expectedMathForm1).forEach(([chapterNumber, youtubeId]) => {
      const video = getEducationalVideo(`math-f1-c${chapterNumber}`, "bm");
      expect(video).toBeDefined();

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("aspect-video");
      expect(markup).toContain("w-full h-full");
      expect(markup).toContain('allowFullScreen=""');
      expect(markup).not.toContain("autoplay=1");
    });
  });

  it("maps every Sejarah Tingkatan 1 chapter to its intended video", () => {
    sejarahForm1.forEach(([chapterId, youtubeId, startSeconds], index) => {
      const video = getEducationalVideo(chapterId);
      expect(video?.title).toBe(`Sejarah Tingkatan 1 — Bab ${index + 1}`);
      expect(video?.youtubeId).toBe(youtubeId);
      expect(video?.startSeconds).toBe(startSeconds);
    });
  });

  it("keeps unrelated subject mappings alongside all Sejarah entries", () => {
    expect(educationalVideos["geography-f1-c1"]?.youtubeId).toBe("JUuZvLnZZ9g");
    expect(sejarahForm1.every(([chapterId]) => chapterId in educationalVideos)).toBe(true);
  });

  it("renders one valid embed per Sejarah chapter with only the configured start times", () => {
    for (const [chapterId, youtubeId, startSeconds] of sejarahForm1) {
      const video = getEducationalVideo(chapterId);
      expect(video).toBeDefined();

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      if (startSeconds === undefined) {
        expect(markup).not.toContain("start=");
      } else {
        expect(markup).toContain(`start=${startSeconds}`);
      }
    }
  });

  it("maps and resolves every Sejarah Tingkatan 2 chapter through the existing lookup", () => {
    sejarahForm2.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const video = getEducationalVideo(chapterId);
      const chapter = getChapter("sejarah", `Chapter ${chapterNumber}`, undefined, "Form 2");

      expect(video?.title).toBe(`Sejarah Tingkatan 2 — Bab ${chapterNumber}`);
      expect(video?.youtubeId).toBe(youtubeId);
      expect(video?.startSeconds).toBeUndefined();
      expect(chapter?.id).toBe(chapterId);
      expect(chapter?.video?.youtubeId).toBe(youtubeId);

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("autoplay");
      expect(markup).not.toContain("autoplay=1");
    });
  });

  it("maps and renders exactly one intended video for every Sains Tingkatan 1 chapter", () => {
    scienceForm1.forEach(([chapterId, youtubeId], index) => {
      const video = getEducationalVideo(chapterId);
      expect(video?.title).toBe(`Sains Tingkatan 1 — Bab ${index + 1}`);
      expect(video?.youtubeId).toBe(youtubeId);
      expect(video?.startSeconds).toBeUndefined();

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
    });
  });

  it("selects DLP Science videos by language while preserving the BM defaults", () => {
    const dlpIds = [
      "TY49EVN-mJI",
      "U1ncevXORm0",
      "nROw9wVMw2Y",
      "JrUIDZWCORU",
      "yZpe3OYE1wk",
      "rCeE5DBvFcQ",
      "AA7mZ_pHB_k",
      "eAG6NflS5R8",
      "gruPxCff8G8",
    ];

    scienceForm1.forEach(([chapterId, bmYoutubeId], index) => {
      expect(getEducationalVideo(chapterId)?.youtubeId).toBe(bmYoutubeId);
      expect(getEducationalVideo(chapterId, "bm")?.youtubeId).toBe(bmYoutubeId);
      expect(getEducationalVideo(chapterId, "dlp")?.youtubeId).toBe(dlpIds[index]);
    });
  });

  it("attaches the selected chapter video to each Sains language variant", () => {
    scienceForm1.forEach(([, youtubeId], index) => {
      const chapterNumber = index + 1;
      const variants = chapters.filter(
        (chapter) =>
          chapter.subjectId === "science" &&
          chapter.form === "Form 1" &&
          chapter.chapterKey === `Chapter ${chapterNumber}`,
      );

      expect(variants).toHaveLength(2);
      expect(variants.map((chapter) => chapter.lang).sort()).toEqual(["bm", "dlp"]);
      expect(variants.find((chapter) => chapter.lang === "bm")?.video?.youtubeId).toBe(youtubeId);
      expect(variants.find((chapter) => chapter.lang === "dlp")?.video?.youtubeId).toBe(
        getEducationalVideo(`science-f1-c${chapterNumber}`, "dlp")?.youtubeId,
      );
    });
  });

  it("keeps Sains Form 2 BM videos unchanged and maps separate Science Form 2 DLP videos", () => {
    scienceForm2.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const bmVideo = getEducationalVideo(chapterId, "bm");
      const dlpVideo = getEducationalVideo(chapterId, "dlp");
      const variants = chapters.filter(
        (chapter) =>
          chapter.subjectId === "science" &&
          chapter.form === "Form 2" &&
          chapter.chapterKey === `Chapter ${chapterNumber}`,
      );

      expect(bmVideo?.title).toBe(`Sains Tingkatan 2 — Bab ${chapterNumber}`);
      expect(bmVideo?.youtubeId).toBe(youtubeId);
      expect(bmVideo?.captionLang).toBe("ms");
      expect(dlpVideo?.title).toBe(`Science Form 2 — Chapter ${chapterNumber}`);
      expect(dlpVideo?.youtubeId).toBe(scienceForm2Dlp[index]);
      expect(dlpVideo?.captionLang).toBe("en");
      expect(dlpVideo).not.toBe(bmVideo);
      expect(variants).toHaveLength(2);
      expect(variants.find((chapter) => chapter.lang === "bm")?.video?.youtubeId).toBe(youtubeId);
      expect(variants.find((chapter) => chapter.lang === "dlp")?.video?.youtubeId).toBe(
        scienceForm2Dlp[index],
      );

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: dlpVideo! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${scienceForm2Dlp[index]}?`);
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("autoplay");
    });
  });
});

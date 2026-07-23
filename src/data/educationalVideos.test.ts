import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { VideoBlock } from "@/components/notes/VideoBlock";
import { chapters, getChapter } from "@/content/registry";
import { educationalVideos, getEducationalVideo } from "./educationalVideos";

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

describe("educational video registry", () => {
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

  it("maps and renders one AI video for every Sains Tingkatan 2 chapter", () => {
    scienceForm2.forEach(([chapterId, youtubeId], index) => {
      const chapterNumber = index + 1;
      const video = getEducationalVideo(chapterId);
      const variants = chapters.filter(
        (chapter) =>
          chapter.subjectId === "science" &&
          chapter.form === "Form 2" &&
          chapter.chapterKey === `Chapter ${chapterNumber}`,
      );

      expect(video?.title).toBe(`Sains Tingkatan 2 — Bab ${chapterNumber}`);
      expect(video?.youtubeId).toBe(youtubeId);
      expect(video?.startSeconds).toBeUndefined();
      expect(variants).toHaveLength(2);
      expect(variants.every((chapter) => chapter.video?.youtubeId === youtubeId)).toBe(true);

      const markup = renderToStaticMarkup(createElement(VideoBlock, { video: video! }));
      expect(markup.match(/<iframe/g)).toHaveLength(1);
      expect(markup).toContain(`youtube-nocookie.com/embed/${youtubeId}?`);
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain("autoplay");
    });
  });
});

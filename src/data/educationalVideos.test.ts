import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { VideoBlock } from "@/components/notes/VideoBlock";
import { chapters } from "@/content/registry";
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

  it("attaches the same chapter video to both Sains language variants", () => {
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
      expect(variants.every((chapter) => chapter.video?.youtubeId === youtubeId)).toBe(true);
    });
  });
});

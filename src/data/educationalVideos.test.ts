import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { VideoBlock } from "@/components/notes/VideoBlock";
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
});

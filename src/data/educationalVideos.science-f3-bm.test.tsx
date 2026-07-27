import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VideoBlock } from "@/components/notes/VideoBlock";
import { getChapter, getRegisteredSubjectChapters } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { educationalVideos, getEducationalVideo } from "./educationalVideos";

const scienceForm3Bm = [
  ["science-f3-c1-bm", "huOA8Rh3Kic"],
  ["science-f3-c2-bm", "WS_B_yPZr-k"],
  ["science-f3-c3-bm", "ZS1XZObBPhw"],
  ["science-f3-c4-bm", "gje83wDW7qA"],
  ["science-f3-c5-bm", "4mG68H-BS4M"],
  ["science-f3-c6-bm", "IlcszWVOPl4"],
  ["science-f3-c7-bm", "DrpSAT4ii8c"],
  ["science-f3-c8-bm", "_L6E5sEY73w"],
  ["science-f3-c9-bm", "zZYro0tp_8w"],
  ["science-f3-c10-bm", "v8mB8zsAC8w"],
] as const;

describe("Sains Tingkatan 3 Bahasa Melayu educational videos", () => {
  it("registers each supplied YouTube ID exactly once in chapter order", () => {
    scienceForm3Bm.forEach(([chapterId, youtubeId], index) => {
      expect(getEducationalVideo(chapterId, "bm")).toEqual({
        title: `Sains Tingkatan 3 — Bab ${index + 1}`,
        youtubeId,
        captionLang: "ms",
        hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
      });
    });

    expect(
      Object.keys(educationalVideos).filter((chapterId) => chapterId.startsWith("science-f3-")),
    ).toEqual(scienceForm3Bm.map(([chapterId]) => chapterId));
    expect(new Set(scienceForm3Bm.map(([, youtubeId]) => youtubeId)).size).toBe(10);
  });

  it("attaches the correct video to every existing BM chapter route", () => {
    expect(getRegisteredSubjectChapters("science", "bm", "Form 3").map(({ key }) => key)).toEqual(
      scienceForm3Bm.map((_, index) => `Chapter ${index + 1}`),
    );

    scienceForm3Bm.forEach(([chapterId, youtubeId], index) => {
      const chapter = getChapter("science", `Chapter ${index + 1}`, "bm", "Form 3");

      expect(chapter?.id).toBe(chapterId);
      expect(chapter?.video).toBe(getEducationalVideo(chapterId, "bm"));
      expect(chapter?.video?.youtubeId).toBe(youtubeId);
      expect(getChapterFeatures(chapter).video).toBe(true);
    });
  });

  it("leaves all Form 3 DLP chapters and lookups unchanged", () => {
    expect(
      Object.keys(educationalVideos).filter(
        (chapterId) => chapterId.startsWith("science-f3-") && chapterId.endsWith("-dlp"),
      ),
    ).toEqual([]);

    scienceForm3Bm.forEach((_, index) => {
      const chapterNumber = index + 1;
      const chapter = getChapter("science", `Chapter ${chapterNumber}`, "dlp", "Form 3");

      expect(chapter?.id).toBe(`science-f3-c${chapterNumber}-dlp`);
      expect(chapter?.video).toBeUndefined();
      expect(getChapterFeatures(chapter).video).toBe(false);
      expect(getEducationalVideo(`science-f3-c${chapterNumber}-dlp`, "dlp")).toBeUndefined();
    });
  });

  it("renders every mapping through the existing responsive privacy-enhanced player", () => {
    scienceForm3Bm.forEach(([chapterId, youtubeId]) => {
      const video = getEducationalVideo(chapterId, "bm");
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
      expect(markup).toContain("enablejsapi=1");
      expect(markup).not.toContain("autoplay=1");
      expect(markup).toContain('allowFullScreen=""');
    });
  });

  it("preserves representative existing Science and other-subject mappings", () => {
    expect(getEducationalVideo("science-f1-c1")?.youtubeId).toBe("qWIof78Sbas");
    expect(getEducationalVideo("science-f1-c1", "dlp")?.youtubeId).toBe("TY49EVN-mJI");
    expect(getEducationalVideo("science-f2-c1")?.youtubeId).toBe("vkA6GCnPVCM");
    expect(getEducationalVideo("geography-f3-c1")?.youtubeId).toBe("VG7WUYrkSB4");
    expect(getEducationalVideo("sejarah-f3-c1")?.youtubeId).toBe("t1DrJ2PJ9tg");
  });
});

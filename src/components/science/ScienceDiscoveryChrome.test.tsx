import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ScienceDiscoveryChapterHeader } from "./ScienceDiscoveryChrome";

describe("ScienceDiscoveryChapterHeader compact hero", () => {
  it("preserves every DLP metric and uses real progress", () => {
    const title = "Introduction to Scientific Investigation";
    const markup = renderToStaticMarkup(
      <ScienceDiscoveryChapterHeader
        chapterKey="Chapter 1"
        title={title}
        lang="dlp"
        readingProgress={32}
        chapterProgress={48}
        isRead={false}
        embedded
      />,
    );

    expect(markup).toContain('data-layout="compact"');
    expect(markup).toContain(title);
    expect(markup).toContain("Research Progress");
    expect(markup).toContain("Concepts Mastered");
    expect(markup).toContain("Discoveries Unlocked");
    expect(markup).toContain("<strong>3</strong><span>Practical Prompts Available</span>");
    expect(markup).not.toContain("Experiments Completed");
    expect(markup).toContain("48%");
    expect(markup).toContain("32%");
    expect(markup.match(/science-progress-(?:stat|datum)/g)).toHaveLength(5);
  });

  it("preserves BM labels, long titles, and completed reading progress", () => {
    const title = "Pengenalan kepada Penyiasatan Saintifik dan Kaedah Pengukuran yang Tepat";
    const markup = renderToStaticMarkup(
      <ScienceDiscoveryChapterHeader
        chapterKey="Chapter 3"
        title={title}
        lang="bm"
        readingProgress={67}
        chapterProgress={84}
        isRead
        embedded
      />,
    );

    expect(markup).toContain(title);
    expect(markup).toContain("Kemajuan Penyelidikan");
    expect(markup).toContain("Konsep Dikuasai");
    expect(markup).toContain("Penemuan Dibuka");
    expect(markup).toContain("<strong>2</strong><span>Arahan Amali Tersedia</span>");
    expect(markup).not.toContain("Eksperimen Selesai");
    expect(markup).toContain("100%");
    expect(markup).toContain("67%");
  });
});

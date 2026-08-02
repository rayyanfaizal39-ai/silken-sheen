import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SubjectWorldArtwork } from "./SubjectWorldArtwork";

describe("SubjectWorldArtwork", () => {
  it("renders only the selected eager artwork with meaningful alt text", () => {
    const markup = renderToStaticMarkup(<SubjectWorldArtwork subject="geografi" />);

    expect(markup).toContain('src="/world/geography-world.webp"');
    expect(markup).toContain('alt="Geography learning world"');
    expect(markup).toContain('loading="eager"');
    expect(markup.match(/<img/g)).toHaveLength(1);
    expect(markup).not.toContain("science-world.webp");
    expect(markup).not.toContain("mathematics-world.webp");
  });

  it.each([undefined, "unknown-subject"])(
    "renders a decorative fallback without a broken image for %s",
    (subject) => {
      const markup = renderToStaticMarkup(<SubjectWorldArtwork subject={subject} />);

      expect(markup).toContain('data-fallback="true"');
      expect(markup).toContain('aria-hidden="true"');
      expect(markup).not.toContain("<img");
    },
  );
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SubjectWorldArt } from "./SubjectWorldArt";

describe("Bahasa Melayu subject-card artwork", () => {
  it("uses the modern language-and-literature composition on cards", () => {
    const markup = renderToStaticMarkup(
      createElement(SubjectWorldArt, {
        subjectId: "bm",
        color: "#F472B6",
        width: 196,
        height: 118,
        variant: "card",
      }),
    );

    expect(markup).toContain('data-subject-art="bm-language-literature"');
    expect(markup).toContain("#F472B6");
    expect(markup).toContain("A");
    expect(markup).toContain("C");
    expect(markup).toContain("“");
    expect(markup).not.toMatch(/[\u0600-\u06ff]/u);
    expect(markup).not.toMatch(/keris|kerajaan|mahkota|palace|crown|mosque/i);
  });

  it("does not replace the artwork for other subjects", () => {
    for (const subjectId of ["science", "math", "english", "geography", "sejarah"]) {
      const markup = renderToStaticMarkup(
        createElement(SubjectWorldArt, {
          subjectId,
          color: "#FFFFFF",
          variant: "card",
        }),
      );

      expect(markup).not.toContain('data-subject-art="bm-language-literature"');
    }
  });

  it("keeps the interior BM world banner on its existing renderer", () => {
    const markup = renderToStaticMarkup(
      createElement(SubjectWorldArt, {
        subjectId: "bm",
        color: "#F472B6",
      }),
    );

    expect(markup).not.toContain('data-subject-art="bm-language-literature"');
  });
});

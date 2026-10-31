import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LearningLevelSelector } from "./LearningLevelSelector";
import { DEFAULT_LEARNING_LEVEL, isLearningLevelAvailable } from "@/lib/learning-levels";

function radio(markup: string, level: string): string {
  const match = markup.match(new RegExp(`<input[^>]*value="${level}"[^>]*>`));
  if (!match) throw new Error(`No radio for ${level}`);
  return match[0];
}

describe("LearningLevelSelector", () => {
  const markup = renderToStaticMarkup(<LearningLevelSelector />);

  it("selects Junior by default", () => {
    expect(DEFAULT_LEARNING_LEVEL).toBe("junior");
    expect(radio(markup, "junior")).toContain('checked=""');
    expect(radio(markup, "junior")).not.toContain("disabled");
    expect(markup).toContain('data-level="junior" data-selected="true"');
    expect(markup.match(/>Selected</g)).toHaveLength(1);
  });

  it.each(["primary", "senior"])("renders %s as a disabled Coming Soon level", (level) => {
    expect(isLearningLevelAvailable(level as "primary" | "senior")).toBe(false);
    expect(radio(markup, level)).toContain('disabled=""');
    expect(radio(markup, level)).not.toContain("checked");
    expect(markup).toContain(`data-level="${level}" data-selected="false"`);
  });

  it("labels the group and each level's status for assistive tech", () => {
    expect(markup).toMatch(/role="radiogroup" aria-labelledby="[^"]+"/);
    expect(markup.match(/Coming Soon/g)).toHaveLength(2);
    expect(markup.match(/>Available</g)).toHaveLength(1);
  });

  it.each(["primary", "junior", "senior"])("fills the %s card with its WebP artwork", (level) => {
    expect(markup).toContain(`background-image:url(/images/login/level-${level}.webp)`);
  });

  it("never renders buttons or links, so it cannot start auth or navigate", () => {
    expect(markup).not.toMatch(/<button|<a /);
  });
});

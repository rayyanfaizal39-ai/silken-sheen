import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { LearningLevelSelector } from "./LearningLevelSelector";
import { isLearningLevelAvailable } from "@/lib/learning-levels";

describe("LearningLevelSelector", () => {
  const markup = renderToStaticMarkup(<LearningLevelSelector value="junior" onChange={vi.fn()} />);

  it("renders Junior as the selected available world", () => {
    expect(isLearningLevelAvailable("junior")).toBe(true);
    expect(markup).toContain('data-level="junior" data-selected="true"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup.match(/>Selected</g)).toHaveLength(1);
  });

  it.each(["primary", "senior"])("renders %s as unavailable", (level) => {
    expect(isLearningLevelAvailable(level as "primary" | "senior")).toBe(false);
    expect(markup).toContain(`data-level="${level}" data-selected="false"`);
  });

  it("disables both unsupported registration actions", () => {
    expect(markup.match(/disabled=""/g)).toHaveLength(2);
    expect(markup.match(/Registration coming soon/g)).toHaveLength(2);
  });

  it("uses one mobile column before the three-column desktop layout", () => {
    expect(markup).toContain("grid-cols-1");
    expect(markup).toContain("md:grid-cols-3");
    expect(markup).not.toContain("grid-cols-3 gap-2");
  });

  it.each(["primary", "junior", "senior"])("uses existing %s world artwork", (level) => {
    expect(markup).toContain(`/images/login/level-${level}.webp`);
  });
});

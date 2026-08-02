import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../CommandCenterHome.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("./homeSkeleton.css", import.meta.url), "utf8");

describe("today's mission homepage placement", () => {
  it("stacks the mission below Continue Learning before Mission Control", () => {
    expect(homeSource).toMatch(
      /home-skeleton__split--learning[\s\S]*home-skeleton__learning-column[\s\S]*HomeContinueLearning[\s\S]*TodaysMission[\s\S]*HomeMissionControl/,
    );
  });

  it("uses normal grid flow and a compact stable card height", () => {
    expect(styles).toMatch(/\.home-skeleton__learning-column\s*{[^}]*display:\s*grid/);
    expect(styles).toMatch(/\.todays-mission\s*{[^}]*min-height:\s*176px/);
    expect(styles).not.toMatch(
      /\.todays-mission\s*{[^}]*(?:position:\s*absolute|margin-top:\s*-|transform:\s*translateY)/,
    );
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { COSMIC_RANK_ICON_FRAME } from "./CosmicRankIcon";

function px(className: string, prefix: string) {
  const match = className.match(new RegExp(`${prefix}h-\\[(\\d+)px\\]`));
  return match ? Number(match[1]) : null;
}

describe("Cosmic Rank icon frames", () => {
  it("keeps the champion only modestly larger than the other podium badges", () => {
    const champion = px(COSMIC_RANK_ICON_FRAME.champion, "sm:");
    const podium = px(COSMIC_RANK_ICON_FRAME.podium, "sm:");
    expect(champion).toBe(92);
    expect(podium).toBe(78);
    expect(champion! / podium!).toBeGreaterThanOrEqual(1.15);
    expect(champion! / podium!).toBeLessThanOrEqual(1.18);

    const championMobile = px(COSMIC_RANK_ICON_FRAME.champion, "");
    const podiumMobile = px(COSMIC_RANK_ICON_FRAME.podium, "");
    expect(championMobile).toBe(74);
    expect(podiumMobile).toBe(64);
    expect(championMobile! / podiumMobile!).toBeGreaterThan(1);
    expect(championMobile! / podiumMobile!).toBeLessThan(champion! / podium!);
  });

  it("uses one larger Top 10 size per breakpoint and leaves the sidebar chip alone", () => {
    expect(px(COSMIC_RANK_ICON_FRAME.table, "")).toBe(40);
    expect(px(COSMIC_RANK_ICON_FRAME.table, "lg:")).toBe(44);
    expect(px(COSMIC_RANK_ICON_FRAME.compact, "")).toBe(36);
    expect(COSMIC_RANK_ICON_FRAME.sidebar).toBe("h-8 w-8");
  });

  it("does not let podium artwork share a size class with the decorative crown", () => {
    const leaderboard = readFileSync(new URL("../routes/leaderboard.tsx", import.meta.url), "utf8");
    expect(leaderboard).toContain("COSMIC_RANK_ICON_FRAME.champion");
    expect(leaderboard).toContain("COSMIC_RANK_ICON_FRAME.podium");
    expect(leaderboard).toContain('size="table"');
    expect(leaderboard).toContain('size="compact"');
    expect(leaderboard).toContain('<Crown className="h-3.5 w-3.5" />');
    expect(leaderboard).toContain('const heights = ["h-24", "h-32", "h-20"];');
  });
});

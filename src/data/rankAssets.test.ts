import { describe, expect, it } from "vitest";
import { RANKS, getRank } from "./rankAssets";

describe("Cosmic Journey rank boundaries", () => {
  it.each([
    [0, "Space Cadet"],
    [1499, "Space Cadet"],
    [1500, "Moon Explorer"],
    [3999, "Moon Explorer"],
    [4000, "Planet Voyager"],
    [7999, "Planet Voyager"],
    [8000, "Star Captain"],
    [14999, "Star Captain"],
    [15000, "Galaxy Guardian"],
    [29999, "Galaxy Guardian"],
    [30000, "Cosmic Legend"],
    [75000, "Cosmic Legend"],
  ])("%i XP resolves to %s", (xp, expectedRank) => {
    expect(getRank(xp).name).toBe(expectedRank);
  });

  it("keeps the exact six-rank progression order and image mapping", () => {
    expect(RANKS.map(({ name, minXp, image }) => ({ name, minXp, image }))).toEqual([
      { name: "Space Cadet", minXp: 0, image: "/ranks/space_cadet.png" },
      { name: "Moon Explorer", minXp: 1500, image: "/ranks/moon_explorer.png" },
      { name: "Planet Voyager", minXp: 4000, image: "/ranks/planet_voyager.png" },
      { name: "Star Captain", minXp: 8000, image: "/ranks/star_captain.png" },
      { name: "Galaxy Guardian", minXp: 15000, image: "/ranks/galaxy-guardian.png" },
      { name: "Cosmic Legend", minXp: 30000, image: "/ranks/cosmic-legend.png" },
    ]);
  });
});

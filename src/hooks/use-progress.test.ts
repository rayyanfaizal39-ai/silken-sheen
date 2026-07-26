import { describe, expect, it } from "vitest";

import {
  applyXpMilestoneBadges,
  COMPANION_STAGES,
  getCompanionEvolutionTransition,
  getCompanionLevelProgress,
  getCompanionStageForXp,
  getRankUpTransition,
} from "./use-progress";

describe("companion level progression", () => {
  it("uses a non-linear curve with increasingly larger level gaps", () => {
    expect(COMPANION_STAGES.map((stage) => stage.xpRequired)).toEqual([
      0, 400, 1600, 4200, 9000,
    ]);

    const gaps = COMPANION_STAGES.slice(1).map(
      (stage, index) => stage.xpRequired - COMPANION_STAGES[index].xpRequired,
    );
    expect(gaps).toEqual([400, 1200, 2600, 4800]);
    expect(gaps.every((gap, index) => index === 0 || gap > gaps[index - 1])).toBe(true);
  });

  it.each([
    [0, 1, 2, "egg", 400, 0],
    [399, 1, 2, "egg", 1, 99],
    [400, 2, 3, "blobling", 1200, 0],
    [1000, 2, 3, "blobling", 600, 50],
    [1599, 2, 3, "blobling", 1, 99],
    [1600, 3, 4, "sprout", 2600, 0],
    [4200, 4, 5, "cadet", 4800, 0],
    [8999, 4, 5, "cadet", 1, 99],
    [9000, 5, null, "guardian", 0, 100],
  ] as const)(
    "derives level progress correctly at %i XP",
    (xp, currentLevel, nextLevel, stage, remainingXp, progressPercentage) => {
      expect(getCompanionLevelProgress(xp)).toMatchObject({
        currentLevel,
        nextLevel,
        currentStage: { id: stage },
        remainingXp,
        progressPercentage,
      });
      expect(getCompanionStageForXp(xp)).toBe(stage);
    },
  );

  it("derives the new level without mutating existing cumulative XP", () => {
    const storedProgress = { xp: 6123, subjectXp: { science: 6123 } };
    const snapshot = structuredClone(storedProgress);

    expect(getCompanionLevelProgress(storedProgress.xp)).toMatchObject({
      currentLevel: 4,
      currentStage: { id: "cadet" },
      remainingXp: 2877,
    });
    expect(storedProgress).toEqual(snapshot);
  });
});

describe("progression celebrations and rewards", () => {
  it("signals companion evolution exactly when a new threshold is crossed", () => {
    expect(getCompanionEvolutionTransition(399, 400)).toEqual({
      fromStage: "egg",
      toStage: "blobling",
    });
    expect(getCompanionEvolutionTransition(1599, 1600)).toEqual({
      fromStage: "blobling",
      toStage: "sprout",
    });
    expect(getCompanionEvolutionTransition(8999, 9000)).toEqual({
      fromStage: "cadet",
      toStage: "guardian",
    });
    expect(getCompanionEvolutionTransition(398, 399)).toBeNull();
    expect(getCompanionEvolutionTransition(400, 399)).toBeNull();
  });

  it("preserves the existing rank-up animation trigger", () => {
    expect(getRankUpTransition(449, 450)).toMatchObject({
      fromRank: { id: "cadet" },
      toRank: { id: "planet-voyager" },
    });
    expect(getRankUpTransition(450, 449)).toBeNull();
  });

  it("preserves every existing XP milestone reward threshold", () => {
    expect(applyXpMilestoneBadges([], 99)).toEqual([]);
    expect(applyXpMilestoneBadges([], 500)).toEqual(["xp100", "scholar"]);
    expect(applyXpMilestoneBadges(["xp100"], 5000)).toEqual([
      "xp100",
      "scholar",
      "xp1000",
      "xp5000",
    ]);
  });
});

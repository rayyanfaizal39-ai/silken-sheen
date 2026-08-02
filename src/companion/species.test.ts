import { describe, expect, it } from "vitest";
import { getCompanionSpecies } from "./species";

describe("companion species artwork registry", () => {
  it("resolves a selected companion instead of always returning Nova", () => {
    const luna = getCompanionSpecies("luna");
    expect(luna.name).toBe("Luna");
    expect(luna.images.guardian).toBe("/companions/nova/luna/luna-guardian.png");
  });

  it("keeps an existing fallback for a missing stage image", () => {
    const comet = getCompanionSpecies("comet");
    expect(comet.name).toBe("Comet");
    expect(comet.images.cadet).toBeUndefined();
    expect(comet.fallbackEmoji.cadet).toBeTruthy();
  });
});

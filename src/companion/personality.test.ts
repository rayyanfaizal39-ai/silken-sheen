import { describe, expect, it } from "vitest";
import {
  createNovaBond,
  latestNovaBond,
  NOVA_PERSONALITY_IDS,
  parseNovaBond,
  resolveNovaPersonality,
} from "./personality";

describe("Nova personality preferences", () => {
  it("uses the most chosen preference for every possible five-answer combination", () => {
    for (let code = 0; code < 4 ** 5; code++) {
      const answers = Array.from(
        { length: 5 },
        (_, index) => NOVA_PERSONALITY_IDS[Math.floor(code / 4 ** index) % 4],
      );
      const counts = NOVA_PERSONALITY_IDS.map(
        (id) => answers.filter((a) => a === id).length,
      );
      const result = resolveNovaPersonality(answers);
      expect(counts[NOVA_PERSONALITY_IDS.indexOf(result)]).toBe(
        Math.max(...counts),
      );
      expect(resolveNovaPersonality(answers)).toBe(result);
    }
  });
  it("breaks a tie using the first preference among the tied leaders", () => {
    expect(
      resolveNovaPersonality([
        "steady",
        "curious",
        "brave",
        "curious",
        "steady",
      ]),
    ).toBe("steady");
    expect(
      resolveNovaPersonality([
        "playful",
        "curious",
        "steady",
        "curious",
        "steady",
      ]),
    ).toBe("curious");
  });
  it("requires five valid answers", () => {
    expect(() => resolveNovaPersonality(["curious"])).toThrow();
    expect(() =>
      resolveNovaPersonality([
        "curious",
        "curious",
        "curious",
        "curious",
        "unknown",
      ] as never),
    ).toThrow();
  });
  it("creates cosmetic preferences without XP or evolution fields", () => {
    const answers = ["steady", "steady", "brave", "steady", "playful"] as const;
    const bond = createNovaBond(
      [...answers],
      "  Luna Bean  ",
      new Date("2026-10-10T18:00:00Z"),
    );
    expect(bond).toEqual({
      version: 1,
      answers,
      personality: "steady",
      name: "Luna Bean",
      completedAt: "2026-10-10T18:00:00.000Z",
    });
    expect(createNovaBond([...answers], " ").name).toBe("Nova");
    expect(
      Array.from(createNovaBond([...answers], "🌟".repeat(30)).name),
    ).toHaveLength(24);
  });
  it("rejects corrupt or mismatched saved results", () => {
    const bond = createNovaBond(Array(5).fill("curious"), "Nova");
    expect(parseNovaBond(bond)).toEqual(bond);
    for (const invalid of [
      null,
      {},
      { ...bond, version: 2 },
      { ...bond, answers: [] },
      { ...bond, personality: "brave" },
      { ...bond, name: "" },
      { ...bond, completedAt: "yesterday" },
    ])
      expect(parseNovaBond(invalid)).toBeNull();
  });
  it("chooses the newest saved result and preserves either valid copy", () => {
    const old = createNovaBond(
      Array(5).fill("curious"),
      "Old",
      new Date("2026-10-10T10:00Z"),
    );
    const next = createNovaBond(
      Array(5).fill("steady"),
      "New",
      new Date("2026-10-10T11:00Z"),
    );
    expect(latestNovaBond(old, next)).toBe(next);
    expect(latestNovaBond(next, old)).toBe(next);
    expect(latestNovaBond(null, next)).toBe(next);
    expect(latestNovaBond(next, null)).toBe(next);
  });
});

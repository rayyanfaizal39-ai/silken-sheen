import { describe, expect, it } from "vitest";
import { craftPortraitsChoosable, craftRevealPhase } from "./craft-reveal";

const NOW = Date.parse("2026-10-26T08:00:00Z");
const FUTURE = new Date(NOW + (23 * 3600 + 42 * 60 + 15) * 1000).toISOString();
const PAST = new Date(NOW - 60_000).toISOString();

describe("craftRevealPhase", () => {
  it("hides the pick while the scheduled reveal is still counting", () => {
    const view = craftRevealPhase({
      hasPermanentArtwork: false,
      artOptionCount: 2,
      revealAfter: FUTURE,
      now: NOW,
    });
    expect(view.phase).toBe("scheduled");
    expect(view.countdown).toMatchObject({
      kind: "counting",
      hours: 23,
      minutes: 42,
      seconds: 15,
    });
    expect(craftPortraitsChoosable(view.phase)).toBe(false);
  });

  it("opens choose only after the real reveal time and both portraits exist", () => {
    const view = craftRevealPhase({
      hasPermanentArtwork: false,
      artOptionCount: 2,
      revealAfter: PAST,
      now: NOW,
    });
    expect(view.phase).toBe("choose");
    expect(craftPortraitsChoosable(view.phase)).toBe(true);
  });

  it("keeps portraits hidden when the window is open but staff options are incomplete", () => {
    expect(
      craftRevealPhase({
        hasPermanentArtwork: false,
        artOptionCount: 0,
        revealAfter: PAST,
        now: NOW,
      }).phase,
    ).toBe("approval");
  });

  it("never invents a countdown when revealAfter is missing", () => {
    const view = craftRevealPhase({
      hasPermanentArtwork: false,
      artOptionCount: 2,
      revealAfter: null,
      now: NOW,
    });
    expect(view.phase).toBe("unscheduled");
    expect(view.countdown).toEqual({ kind: "unknown" });
    expect(craftPortraitsChoosable(view.phase)).toBe(false);
  });

  it("treats craftOptionsReady as prepared without requiring leaked artOption paths", () => {
    const view = craftRevealPhase({
      hasPermanentArtwork: false,
      artOptionCount: 0,
      craftOptionsReady: true,
      revealAfter: FUTURE,
      now: NOW,
    });
    expect(view.phase).toBe("scheduled");
    expect(craftPortraitsChoosable(view.phase)).toBe(false);
  });

  it("drops the countdown once a permanent portrait exists", () => {
    expect(
      craftRevealPhase({
        hasPermanentArtwork: true,
        artOptionCount: 0,
        revealAfter: FUTURE,
        now: NOW,
      }).phase,
    ).toBe("selected");
  });
});

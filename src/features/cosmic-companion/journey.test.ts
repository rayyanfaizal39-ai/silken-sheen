import { describe, expect, it } from "vitest";
import { JOURNEY_CTA, PREVIEW_SCENE, journeyStage, parseJourneyPreview } from "./journey";

describe("Cosmic Companion journey routing", () => {
  it("labels the entrance from the existing saved status, most advanced state first", () => {
    const none = { selected: false, ready: false, pending: false };
    expect(journeyStage(none)).toBe("new");
    expect(journeyStage({ ...none, unfinished: false })).toBe("new");
    expect(journeyStage({ ...none, unfinished: true })).toBe("unfinished");
    expect(journeyStage({ ...none, pending: true })).toBe("waiting");
    // Submitted answers are no longer "unfinished", whatever the draft still holds.
    expect(journeyStage({ ...none, pending: true, unfinished: true })).toBe("waiting");
    expect(journeyStage({ ...none, pending: true, ready: true })).toBe("ready");
    // A permanent choice always wins, even if other flags are still set.
    expect(journeyStage({ selected: true, ready: true, pending: true })).toBe("selected");
    expect(JOURNEY_CTA.selected.label).toBe("Enter My Cosmic Portal");
    expect(JOURNEY_CTA.new.label).toBe("Discover My Companion");
  });

  it("accepts only known preview stages, so other values fall back to the real journey", () => {
    for (const stage of ["new", "unfinished", "waiting", "ready", "selected"])
      expect(parseJourneyPreview(stage)).toBe(stage);
    for (const junk of ["", "admin", "SELECTED", "selected;", 1, null, undefined, ["selected"]])
      expect(parseJourneyPreview(junk)).toBeUndefined();
  });

  it("maps each preview stage to an existing fictional Studio scene", () => {
    expect(PREVIEW_SCENE).toEqual({
      new: "welcome",
      unfinished: "resume",
      waiting: "waiting",
      ready: "reveal",
      selected: "selected",
    });
  });
});

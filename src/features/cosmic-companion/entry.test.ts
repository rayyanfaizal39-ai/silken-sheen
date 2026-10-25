import { describe, expect, it } from "vitest";
import { companionEntry, COMPANION_RETURN_PATH } from "./entry";

describe("Cosmic Companion entry", () => {
  it("sends a free student to the Upgrade page with a return path", () => {
    expect(companionEntry({ entitled: false, stage: "new" })).toEqual({
      kind: "upgrade",
      to: "/upgrade",
      search: { next: COMPANION_RETURN_PATH },
    });
    expect(companionEntry({ entitled: false, stage: "unfinished" }).kind).toBe("upgrade");
  });

  it("lets a premium student open the generator once", () => {
    expect(companionEntry({ entitled: true, stage: "new" })).toEqual({
      kind: "journey",
      to: "/companion/portal",
      search: {},
    });
    expect(companionEntry({ entitled: true, stage: "unfinished" }).kind).toBe("journey");
  });

  it("opens the existing card after the journey is used, instead of the generator", () => {
    expect(companionEntry({ entitled: true, stage: "selected" })).toEqual({
      kind: "card",
      to: "/nova",
    });
    expect(companionEntry({ entitled: false, stage: "selected" }).kind).toBe("card");
  });

  it("keeps an accepted journey on the portal while the student is still choosing", () => {
    expect(companionEntry({ entitled: true, stage: "waiting" }).kind).toBe("journey");
    expect(companionEntry({ entitled: false, stage: "ready" }).to).toBe("/companion/portal");
  });

  it("leaves an explicit fictional preview on the portal", () => {
    expect(companionEntry({ entitled: false, stage: "new", preview: "selected" })).toEqual({
      kind: "journey",
      to: "/companion/portal",
      search: { preview: "selected" },
    });
  });
});

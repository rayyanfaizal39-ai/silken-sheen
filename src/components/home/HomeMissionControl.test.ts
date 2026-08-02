import { describe, expect, it } from "vitest";
import { MISSION_CONTROL_ITEMS } from "./mission-control-data";

describe("Mission Control transmissions", () => {
  it("ships four data-driven transmission categories", () => {
    expect(MISSION_CONTROL_ITEMS).toHaveLength(4);
    expect(MISSION_CONTROL_ITEMS.map((item) => item.type)).toEqual([
      "new-mission",
      "event",
      "community",
      "update",
    ]);
    expect(new Set(MISSION_CONTROL_ITEMS.map((item) => item.id)).size).toBe(4);
  });

  it("uses the registered Science Form 3 Chapter 8 notes destination", () => {
    expect(MISSION_CONTROL_ITEMS[0]).toMatchObject({
      actionLabel: "Explore",
      actionUrl: "/notes",
      actionSearch: {
        subject: "science",
        form: 3,
        chapter: "Chapter 8",
      },
    });
  });

  it("keeps temporary community content isolated in the replaceable data model", () => {
    expect(MISSION_CONTROL_ITEMS.find((item) => item.type === "community")?.title).toBe(
      "1,248 students completed Mathematics today",
    );
  });
});

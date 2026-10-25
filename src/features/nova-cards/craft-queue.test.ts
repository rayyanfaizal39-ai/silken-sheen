import { describe, expect, it } from "vitest";
import {
  craftQueueToCsv,
  craftQueueToJson,
  craftWaitLabel,
  filterCraftQueue,
  nextCraftStudent,
  type CraftBrief,
} from "./craft-queue";

const brief: CraftBrief = {
  displayName: "Aisha",
  form: "Form 1",
  companionName: "Lumi",
  species: "Magical Fox",
  element: "Starlight",
  traits: ["curious", "gentle"],
  personality: "Explorer",
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
  position: 1,
  queuedAt: "2026-10-24T00:00:00.000Z",
  status: "waiting_for_art",
  choice: null,
  options: [],
};

describe("artist craft brief", () => {
  it("exports the portrait brief without contact fields", () => {
    const dirty = {
      ...brief,
      email: "form1.student@dev.local",
      phone: "+60000000000",
    } as CraftBrief;
    const csv = craftQueueToCsv([dirty]);
    const json = craftQueueToJson([dirty]);
    expect(csv.split("\n")[0]).toBe(
      "displayName,form,companionName,species,element,traits,personality,publicId",
    );
    expect(csv).toContain("Aisha");
    expect(csv).toContain("Form 1");
    expect(csv).toContain("Lumi");
    expect(csv).toContain("Magical Fox");
    expect(csv).toContain("Starlight");
    expect(csv).toContain("curious · gentle");
    expect(csv).toContain("Explorer");
    expect(csv).toContain(brief.publicId);
    const packed = `${csv}\n${json}`.toLowerCase();
    expect(packed).not.toContain("form1.student@dev.local");
    expect(packed).not.toContain("email");
    expect(packed).not.toContain("phone");
    expect(packed).not.toContain("+60000000000");
    expect(packed).not.toContain("birth year");
    expect(json).not.toContain(brief.serial);
  });

  it("numbers the queue from the oldest entry and marks the next portrait", () => {
    const older = { ...brief, publicId: "00000000-0000-4000-8000-00000000d201", position: 1 };
    const newer = {
      ...brief,
      publicId: "00000000-0000-4000-8000-00000000d202",
      position: 2,
      displayName: "Haziq",
    };
    const ready = {
      ...brief,
      publicId: "00000000-0000-4000-8000-00000000d203",
      position: 3,
      status: "options_ready" as const,
    };
    expect(nextCraftStudent([newer, ready, older])).toBe(older.publicId);
    expect(
      filterCraftQueue([newer, ready, older], "waiting_for_art").map((item) => item.position),
    ).toEqual([1, 2]);
    expect(filterCraftQueue([ready], "waiting_for_art")).toEqual([]);
    const now = Date.parse("2026-10-24T12:00:00.000Z");
    expect(craftWaitLabel("2026-10-24T09:00:00.000Z", now)).toBe("Queued for 3 hours");
    expect(craftWaitLabel("2026-10-24T11:40:00.000Z", now)).toBe("Queued for 20 minutes");
    expect(craftWaitLabel(null, now)).toBe("Just entered the queue");
  });
});

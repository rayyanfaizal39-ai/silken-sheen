import { describe, expect, it } from "vitest";
import { craftQueueToCsv, craftQueueToJson, type CraftBrief } from "./craft-queue";

const brief: CraftBrief = {
  displayName: "Aisha",
  form: "Form 1",
  companionName: "Lumi",
  species: "Magical Fox",
  element: "Starlight",
  traits: ["curious", "gentle"],
  personality: "Explorer",
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "100000000101",
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
});

import { afterEach, describe, expect, it } from "vitest";
import { barcodeSymbols } from "@/features/nova-cards/codes";
import { craftQueueToCsv, craftQueueToJson } from "@/features/nova-cards/craft-queue";
import { journeyStage } from "@/features/cosmic-companion/journey";
import {
  createMemoryStorage,
  devAttachCraftOptions,
  devChooseCraftArt,
  devChooseStudio,
  devCraftQueue,
  devCompanionPremium,
  devDashboardStatus,
  devLoadStudio,
  devOwnerNova,
  devSetCompanionPremium,
  devResetCraftArt,
  devSaveStudio,
  devSetSharing,
  devSubmitStudio,
  readDevPublicCard,
  signInDevStudentRecord,
  signOutDevStudentRecord,
  useDevAuthStorage,
} from "./store";
import { DEV_STUDENTS } from "./students";

const answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

describe("local dev companion card", () => {
  afterEach(() => {
    useDevAuthStorage(null);
  });

  it("matches a companion and stores a portrait card with a twelve-digit serial", async () => {
    useDevAuthStorage(createMemoryStorage());
    const student = DEV_STUDENTS[0];
    signInDevStudentRecord(student.id);

    let draft = (await devLoadStudio()).draft;
    draft = await devSaveStudio({ ...draft, answers });
    expect(draft.revision).toBe(1);
    expect(journeyStage(devDashboardStatus())).toBe("unfinished");

    const submitted = await devSubmitStudio();
    expect(submitted.kind).toBe("cosmic-companion");
    expect(submitted.companions).toHaveLength(2);
    expect(submitted.candidates).toHaveLength(2);
    expect(submitted.candidates.every((item) => item.url.length > 0)).toBe(true);
    expect(JSON.stringify(submitted.candidates)).not.toMatch(/openai|api\.openai/i);
    expect(submitted.origin?.ready).toBe(true);
    expect(journeyStage(devDashboardStatus())).toBe("ready");

    const chosen = await devChooseStudio("b");
    expect(chosen.selected).toBe("b");
    expect(chosen.companion?.slot).toBe("b");
    expect(chosen.companions).toBeUndefined();
    expect(journeyStage(devDashboardStatus())).toBe("selected");

    const { card, entitlement } = devOwnerNova();
    expect(entitlement.active).toBe(true);
    expect(card?.stage).toBe(1);
    expect(card?.serial).toBe(student.serial);
    expect(card?.serial).toMatch(/^\d{12}$/);
    expect(barcodeSymbols(card!.serial).length).toBeGreaterThan(0);
    expect(card?.companion?.name).toBe(chosen.companion?.name);
    expect(card?.companion?.species).toBeTruthy();
    expect(card?.artworkUrl).toBeFalsy();
    expect(card?.crafting).toBe(true);
    expect(JSON.stringify(card)).not.toMatch(/openai|api\.openai/i);
    expect(card?.sharing).toBe(false);
    expect(readDevPublicCard(card!.publicId)).toBeNull();

    const shared = devSetSharing(true);
    expect(readDevPublicCard(shared.publicId)?.serial).toBe(student.serial);
    expect(JSON.stringify(shared).toLowerCase()).not.toContain("birth year");

    signOutDevStudentRecord();
    expect(() => devOwnerNova()).toThrow(/sign in/i);
  });

  it("blocks a free demo student, allows one premium journey, and refuses a second", async () => {
    useDevAuthStorage(createMemoryStorage());
    signInDevStudentRecord(DEV_STUDENTS[0].id);
    expect(devCompanionPremium()).toBe(true);
    devSetCompanionPremium(false);
    expect(devOwnerNova().entitlement.active).toBe(false);
    const draft = (await devLoadStudio()).draft;
    await expect(devSaveStudio({ ...draft, answers })).rejects.toThrow(/learning plan/i);
    await expect(devSubmitStudio()).rejects.toThrow(/learning plan/i);
    expect(() => devCraftQueue()).toThrow(/administrator/i);

    devSetCompanionPremium(true);
    expect(devOwnerNova().entitlement.active).toBe(true);
    await devSaveStudio({ ...(await devLoadStudio()).draft, answers });
    await devSubmitStudio();
    await expect(devSubmitStudio()).rejects.toThrow(/already complete/i);
    await devChooseStudio("a");

    signInDevStudentRecord(DEV_STUDENTS.find((item) => item.role === "admin")!.id);
    expect(devCraftQueue()).toHaveLength(1);
    expect(devCraftQueue()[0].status).toBe("waiting_for_art");
  });

  it("keeps Form 1 and Form 2 journeys separate", async () => {
    useDevAuthStorage(createMemoryStorage());
    signInDevStudentRecord(DEV_STUDENTS[0].id);
    const first = await devLoadStudio();
    await devSaveStudio({ ...first.draft, username: "Aisha" });

    signInDevStudentRecord(DEV_STUDENTS[1].id);
    const second = await devLoadStudio();
    expect(second.account).toBe(DEV_STUDENTS[1].id);
    expect(second.draft.username).toBe(DEV_STUDENTS[1].name);
    expect(second.draft.answers).toEqual([]);

    signInDevStudentRecord(DEV_STUDENTS[0].id);
    expect((await devLoadStudio()).draft.username).toBe("Aisha");
  });

  it("lets staff upload two portraits and the student pick one", async () => {
    useDevAuthStorage(createMemoryStorage());
    const student = DEV_STUDENTS[0];
    const staff = DEV_STUDENTS.find((item) => item.role === "admin");
    expect(staff?.email).toBe("staff@dev.local");
    signInDevStudentRecord(student.id);
    await devSaveStudio({ ...(await devLoadStudio()).draft, answers });
    await devSubmitStudio();
    await devChooseStudio("b");
    expect(() => devCraftQueue()).toThrow(/administrator/i);

    signInDevStudentRecord(staff!.id);
    const queued = devCraftQueue();
    expect(queued).toHaveLength(1);
    expect(queued[0]).toMatchObject({
      displayName: "Aisha",
      form: "Form 1",
      serial: student.serial,
      status: "waiting_for_art",
    });
    const csv = craftQueueToCsv(queued);
    const json = craftQueueToJson(queued);
    expect(csv.split("\n")[0]).toContain("publicId");
    expect(`${csv}\n${json}`.toLowerCase()).not.toContain("birth year");
    expect(`${csv}\n${json}`).not.toContain(staff!.email);
    expect(`${csv}\n${json}`).not.toContain(student.email);
    expect(json).toContain(queued[0].publicId);

    const first = "data:image/png;base64,iVBORw0KGgo=";
    const second = "data:image/png;base64,iVBORw0KGgoAAA==";
    const attached = devAttachCraftOptions(queued[0].publicId, [
      { option: 1, dataUrl: first },
      { option: 2, dataUrl: second },
    ]);
    expect(attached.status).toBe("options_ready");
    expect(attached.options.map((option) => option.previewUrl)).toEqual([first, second]);
    signInDevStudentRecord(student.id);
    const waiting = devOwnerNova().card;
    expect(waiting?.serial).toBe(student.serial);
    expect(waiting?.crafting).toBe(true);
    expect(waiting?.artworkUrl).toBeFalsy();
    expect(waiting?.artOptions).toEqual([
      { option: 1, url: first },
      { option: 2, url: second },
    ]);
    devSetSharing(true);
    const shared = readDevPublicCard(waiting!.publicId);
    expect(shared?.artOptions).toBeUndefined();
    expect(shared?.crafting).toBe(true);

    const picked = devChooseCraftArt(2);
    expect(picked.artworkUrl).toBe(second);
    expect(picked.crafting).toBe(false);
    expect(picked.artOptions).toBeUndefined();
    expect(picked.serial).toBe(student.serial);
    expect(() => devChooseCraftArt(1)).toThrow(/already saved/);

    signInDevStudentRecord(staff!.id);
    const reset = devResetCraftArt(queued[0].publicId);
    expect(reset.status).toBe("options_ready");
    expect(reset.serial).toBe(student.serial);
    signInDevStudentRecord(student.id);
    const again = devOwnerNova().card;
    expect(again?.artworkUrl).toBeFalsy();
    expect(again?.artOptions).toHaveLength(2);
    const finalPick = devChooseCraftArt(1);
    expect(finalPick.artworkUrl).toBe(first);
    expect(finalPick.serial).toBe(student.serial);
  });
});

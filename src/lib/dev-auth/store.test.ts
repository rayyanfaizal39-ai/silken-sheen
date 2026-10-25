import { afterEach, describe, expect, it } from "vitest";
import { barcodeSymbols } from "@/features/nova-cards/codes";
import { craftQueueToCsv, craftQueueToJson } from "@/features/nova-cards/craft-queue";
import { journeyStage } from "@/features/cosmic-companion/journey";
import {
  createMemoryStorage,
  devAttachCraftOptions,
  devChooseCraftArt,
  devCraftBrief,
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
    expect(submitted.selected).toBe("a");
    expect(submitted.companion?.slot).toBe("a");
    expect(submitted.companions).toBeUndefined();
    expect(submitted.candidates).toEqual([]);
    expect(JSON.stringify(submitted)).not.toMatch(/openai|api\.openai/i);
    expect(journeyStage(devDashboardStatus())).toBe("waiting");

    const { card, entitlement } = devOwnerNova();
    expect(entitlement.active).toBe(true);
    expect(card?.stage).toBe(1);
    expect(card?.serial).toBe(student.serial);
    expect(card?.serial).toMatch(/^\d{12}$/);
    expect(barcodeSymbols(card!.serial).length).toBeGreaterThan(0);
    expect(card?.companion?.name).toBe(submitted.companion?.name);
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
    expect(() => devCraftQueue()).toThrow(/administrator/i);

    signInDevStudentRecord(staff!.id);
    const queued = devCraftQueue();
    expect(queued).toHaveLength(1);
    expect(queued[0]).toMatchObject({
      displayName: "Aisha",
      form: "Form 1",
      serial: student.serial,
      status: "waiting_for_art",
      position: 1,
      staffTest: false,
    });
    expect(queued[0].queuedAt).toEqual(expect.any(String));
    const artist = devCraftBrief(queued[0].publicId);
    expect(artist.cardId).not.toBe(student.id);
    expect(artist.output).toMatchObject({ format: "PNG", minSize: "1024x1536", text: "none" });
    expect(artist.dna.genes).toEqual(expect.objectContaining({ faceShape: expect.any(String) }));
    expect(JSON.stringify(artist)).not.toContain(student.email);
    expect(JSON.stringify(artist)).not.toContain("userId");
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

  it("lets staff summon their own companion while the premium toggle is off", async () => {
    useDevAuthStorage(createMemoryStorage());
    const staff = DEV_STUDENTS.find((item) => item.role === "admin")!;
    const student = DEV_STUDENTS[0];
    expect(staff.serial).toBe("100000000201");
    signInDevStudentRecord(staff.id);
    devSetCompanionPremium(false);
    expect(devDashboardStatus().active).toBe(true);
    expect(devOwnerNova().entitlement.active).toBe(true);
    expect((await devLoadStudio()).active).toBe(true);
    await devSaveStudio({ ...(await devLoadStudio()).draft, answers, username: "Staff" });
    const summoned = await devSubmitStudio();
    expect(summoned.selected).toBe("a");
    expect(summoned.publicId).toBe(staff.id);
    await expect(devSubmitStudio()).rejects.toThrow(/already complete/i);

    signInDevStudentRecord(student.id);
    devSetCompanionPremium(false);
    await expect(devSubmitStudio()).rejects.toThrow(/learning plan/i);
    devSetCompanionPremium(true);
    await devSaveStudio({ ...(await devLoadStudio()).draft, answers });
    await devSubmitStudio();

    signInDevStudentRecord(staff.id);
    const queue = devCraftQueue();
    expect(queue).toHaveLength(2);
    const staffRow = queue.find((row) => row.displayName === "Staff");
    const studentRow = queue.find((row) => row.displayName === "Aisha");
    expect(staffRow).toMatchObject({ staffTest: true, serial: staff.serial, position: 1 });
    expect(studentRow).toMatchObject({ staffTest: false, serial: student.serial, position: 2 });
    const brief = devCraftBrief(staffRow!.publicId);
    expect(brief.staffTest).toBe(true);
    expect(JSON.stringify(brief)).not.toContain(staff.email);
    expect(JSON.stringify(brief)).not.toContain("userId");

    const studentFirst = "data:image/png;base64,iVBORw0KGgo=";
    const studentSecond = "data:image/png;base64,iVBORw0KGgoAAA==";
    const staffFirst = "data:image/png;base64,iVBORw0KGgoSTAFF1";
    const staffSecond = "data:image/png;base64,iVBORw0KGgoSTAFF2";
    devAttachCraftOptions(studentRow!.publicId, [
      { option: 1, dataUrl: studentFirst },
      { option: 2, dataUrl: studentSecond },
    ]);
    devAttachCraftOptions(staffRow!.publicId, [
      { option: 1, dataUrl: staffFirst },
      { option: 2, dataUrl: staffSecond },
    ]);
    const picked = devChooseCraftArt(1);
    expect(picked.publicId).toBe(staff.id);
    expect(picked.artworkUrl).toBe(staffFirst);

    signInDevStudentRecord(student.id);
    const card = devOwnerNova().card;
    expect(card?.artworkUrl).toBeFalsy();
    expect(card?.artOptions).toEqual([
      { option: 1, url: studentFirst },
      { option: 2, url: studentSecond },
    ]);
    expect(devDashboardStatus().active).toBe(true);
  });
});

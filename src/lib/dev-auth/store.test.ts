import { afterEach, describe, expect, it } from "vitest";
import { barcodeSymbols } from "@/features/nova-cards/codes";
import { journeyStage } from "@/features/cosmic-companion/journey";
import {
  createMemoryStorage,
  devChooseStudio,
  devDashboardStatus,
  devLoadStudio,
  devOwnerNova,
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
    expect(card?.artworkUrl).toBeTruthy();
    expect(card?.artworkUrl).not.toMatch(/openai|api\.openai/i);
    expect(card?.sharing).toBe(false);
    expect(readDevPublicCard(card!.publicId)).toBeNull();

    const shared = devSetSharing(true);
    expect(readDevPublicCard(shared.publicId)?.serial).toBe(student.serial);
    expect(JSON.stringify(shared).toLowerCase()).not.toContain("birth year");

    signOutDevStudentRecord();
    expect(() => devOwnerNova()).toThrow(/sign in/i);
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
});

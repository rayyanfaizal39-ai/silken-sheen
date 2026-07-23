import { describe, expect, it } from "vitest";
import {
  calculateCombinedSectionProgress,
  calculateNotesProgress,
  clampNotesProgress,
  enqueuePendingNotesProgress,
  flushPendingNotesProgress,
  getPendingNotesProgressForScope,
  maxNotesProgress,
  mergeSectionProgress,
  notesProgressIdentityKey,
  normalizeNotesVariant,
  selectNotesAwareProgress,
} from "./notes-reading-progress";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() {
    return this.values.size;
  }
  clear() {
    this.values.clear();
  }
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.values.delete(key);
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("Notes reading progress", () => {
  it("calculates progress against the Notes container and completes near its bottom", () => {
    expect(
      calculateNotesProgress({ contentTop: 500, contentHeight: 1000, viewportBottom: 500 }),
    ).toBe(0);
    expect(
      calculateNotesProgress({ contentTop: 500, contentHeight: 1000, viewportBottom: 900 }),
    ).toBe(40);
    expect(
      calculateNotesProgress({ contentTop: 500, contentHeight: 1000, viewportBottom: 1470 }),
    ).toBe(100);
  });

  it("never reduces stored progress", () => {
    expect(maxNotesProgress(65, 40)).toBe(65);
    expect(maxNotesProgress(65, 82)).toBe(82);
  });

  it("normalizes variants and clamps invalid values", () => {
    expect(normalizeNotesVariant(" DLP ")).toBe("dlp");
    expect(normalizeNotesVariant()).toBe("default");
    expect(clampNotesProgress(Number.NaN)).toBe(0);
    expect(clampNotesProgress(120)).toBe(100);
  });

  it("separates users, forms, chapters, and language variants", () => {
    const identities = new Set([
      notesProgressIdentityKey(
        "user-a",
        { subject: "science", form: "Form 1", variant: "bm" },
        "Chapter 1",
      ),
      notesProgressIdentityKey(
        "user-b",
        { subject: "science", form: "Form 1", variant: "bm" },
        "Chapter 1",
      ),
      notesProgressIdentityKey(
        "user-a",
        { subject: "science", form: "Form 2", variant: "bm" },
        "Chapter 1",
      ),
      notesProgressIdentityKey(
        "user-a",
        { subject: "science", form: "Form 1", variant: "dlp" },
        "Chapter 1",
      ),
      notesProgressIdentityKey(
        "user-a",
        { subject: "science", form: "Form 1", variant: "bm" },
        "Chapter 2",
      ),
    ]);
    expect(identities.size).toBe(5);
  });

  it("does not derive Notes progress from quiz or flashcard completion", () => {
    expect(selectNotesAwareProgress("notes", undefined, { quiz: true })).toBe(0);
    expect(selectNotesAwareProgress("notes", undefined, { cards: true })).toBe(0);
  });

  it.each([
    [{ one: 100 }, 25],
    [{ one: 100, two: 100 }, 50],
    [{ one: 100, two: 100, three: 50 }, 63],
  ])("combines continuous progress across four equal sections", (progress, expected) => {
    expect(
      calculateCombinedSectionProgress(progress, [
        { id: "one" },
        { id: "two" },
        { id: "three" },
        { id: "four" },
      ]),
    ).toBe(expected);
  });

  it("weights longer sections without treating one section as the whole chapter", () => {
    const sections = [
      { id: "short", weight: 1 },
      { id: "long", weight: 3 },
    ];
    expect(calculateCombinedSectionProgress({ short: 100 }, sections)).toBe(25);
    expect(calculateCombinedSectionProgress({ long: 100 }, sections)).toBe(75);
  });

  it("completes only after every meaningful section passes the threshold", () => {
    const sections = [{ id: "one" }, { id: "two" }, { id: "three" }];
    expect(calculateCombinedSectionProgress({ one: 100, two: 100, three: 96 }, sections)).toBe(96);
    expect(calculateCombinedSectionProgress({ one: 97, two: 98, three: 100 }, sections)).toBe(100);
  });

  it("preserves each section maximum when switching and revisiting", () => {
    const afterSwitch = mergeSectionProgress({ one: 76 }, { two: 40 });
    expect(mergeSectionProgress(afterSwitch, { one: 18 })).toEqual({ one: 76, two: 40 });
  });

  it("does not award progress for expanding an accordion or opening the final tab", () => {
    const sections = [{ id: "one" }, { id: "two" }, { id: "three" }, { id: "four" }];
    expect(calculateCombinedSectionProgress({}, sections)).toBe(0);
    expect(calculateCombinedSectionProgress({ four: 0 }, sections)).toBe(0);
  });

  it("buffers the newest maximum across navigation and refresh", () => {
    const storage = new MemoryStorage();
    const scope = { subject: "sejarah", form: "Form 2", variant: "default" };
    enqueuePendingNotesProgress(
      {
        userId: "user-a",
        scope,
        chapter: "Chapter 1",
        progressPercent: 60,
        sectionProgress: { one: 100, two: 50 },
      },
      storage,
    );
    enqueuePendingNotesProgress(
      {
        userId: "user-a",
        scope,
        chapter: "Chapter 1",
        progressPercent: 40,
        sectionProgress: { one: 40 },
      },
      storage,
    );
    const [restored] = getPendingNotesProgressForScope("user-a", scope, storage);
    expect(restored.progressPercent).toBe(60);
    expect(restored.sectionProgress).toEqual({ one: 100, two: 50 });
  });

  it("keeps failed writes queued and removes them only after a successful retry", async () => {
    const storage = new MemoryStorage();
    const scope = { subject: "science", form: "Form 1", variant: "dlp" };
    enqueuePendingNotesProgress(
      {
        userId: "user-a",
        scope,
        chapter: "Chapter 3",
        progressPercent: 50,
        sectionProgress: { one: 100, two: 100 },
      },
      storage,
    );
    await expect(
      flushPendingNotesProgress("user-a", storage, async () => {
        throw new Error("offline");
      }),
    ).rejects.toThrow("offline");
    expect(getPendingNotesProgressForScope("user-a", scope, storage)).toHaveLength(1);

    const writes: number[] = [];
    await flushPendingNotesProgress("user-a", storage, async (_user, _scope, _chapter, pct) => {
      writes.push(pct);
    });
    expect(writes).toEqual([50]);
    expect(getPendingNotesProgressForScope("user-a", scope, storage)).toHaveLength(0);
  });

  it("does not expose one user or variant pending progress to another", () => {
    const storage = new MemoryStorage();
    const bmScope = { subject: "science", form: "Form 1", variant: "bm" };
    enqueuePendingNotesProgress(
      {
        userId: "user-a",
        scope: bmScope,
        chapter: "Chapter 1",
        progressPercent: 25,
        sectionProgress: { one: 100 },
      },
      storage,
    );
    expect(getPendingNotesProgressForScope("user-b", bmScope, storage)).toEqual([]);
    expect(
      getPendingNotesProgressForScope("user-a", { ...bmScope, variant: "dlp" }, storage),
    ).toEqual([]);
  });
});

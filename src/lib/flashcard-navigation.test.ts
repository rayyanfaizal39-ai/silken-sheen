import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  chooseBackAction,
  flashcardSearchKey,
  isStructuredMathF1Chapter,
  normalizeMathLangParam,
  parentFlashcardSearch,
  structuredFlashcardLevel,
  type FlashcardSearch,
} from "./flashcard-navigation";

const CHAPTERS: FlashcardSearch = { subject: "math", form: 1 };
const LANGUAGE: FlashcardSearch = { ...CHAPTERS, chapter: "Chapter 1" };
const categories = (lang: "bm" | "dlp"): FlashcardSearch => ({ ...LANGUAGE, lang });
const MODES = ["concept", "practice", "challenge"] as const;
const arena = (lang: "bm" | "dlp", mode: (typeof MODES)[number]): FlashcardSearch => ({
  ...categories(lang),
  set: MODES.indexOf(mode) + 1,
  mode,
});

/**
 * A browser session as the flashcards page drives it: choosing something
 * pushes an entry; the in-page Back button applies chooseBackAction exactly
 * like FlashcardsPage.goUpOneLevel; browser Back/Forward move the index.
 */
class Session {
  entries: FlashcardSearch[];
  index = 0;
  /** What the page recorded per history index (visitedSearchByIndexRef). */
  visited = new Map<number, string>();
  constructor(start: FlashcardSearch) {
    this.entries = [start];
    this.record();
  }
  get url() {
    return this.entries[this.index];
  }
  get screen() {
    return structuredFlashcardLevel(this.url);
  }
  private record() {
    this.visited.set(this.index, flashcardSearchKey(this.url));
  }
  push(search: FlashcardSearch) {
    this.entries = [...this.entries.slice(0, this.index + 1), search];
    this.index += 1;
    this.record();
  }
  inPageBack() {
    const parent = parentFlashcardSearch(this.url);
    if (chooseBackAction(this.index, this.visited, flashcardSearchKey(parent)) === "history-back") {
      this.browserBack();
    } else {
      this.entries[this.index] = parent;
      this.record();
    }
  }
  browserBack() {
    if (this.index > 0) this.index -= 1;
    this.record();
  }
  browserForward() {
    if (this.index < this.entries.length - 1) this.index += 1;
    this.record();
  }
  /** Reload: the page keeps the URL but forgets what it had recorded. */
  reload() {
    this.visited = new Map();
    this.record();
  }
}

/** Chapter list → Chapter 1 → language → review categories. */
function openCategories(lang: "bm" | "dlp" = "bm") {
  const session = new Session(CHAPTERS);
  session.push(LANGUAGE);
  session.push(categories(lang));
  return session;
}

describe("Form 1 Maths Chapter 1 flashcard navigation", () => {
  it("applies only to Form 1 Maths Chapter 1, and reads bm/dlp only", () => {
    expect(isStructuredMathF1Chapter("math", "Form 1", "Chapter 1")).toBe(true);
    expect(isStructuredMathF1Chapter("math", "Form 1", "Chapter 2")).toBe(false);
    expect(isStructuredMathF1Chapter("math", "Form 2", "Chapter 1")).toBe(false);
    expect(isStructuredMathF1Chapter("science", "Form 1", "Chapter 1")).toBe(false);
    expect(normalizeMathLangParam("bm")).toBe("bm");
    expect(normalizeMathLangParam("dlp")).toBe("dlp");
    expect(normalizeMathLangParam("en")).toBeNull();
    expect(normalizeMathLangParam(undefined)).toBeNull();
  });

  it("maps every URL to one screen and one parent: arena → categories → language → chapters", () => {
    expect(structuredFlashcardLevel(arena("bm", "practice"))).toBe("arena");
    expect(structuredFlashcardLevel(categories("bm"))).toBe("categories");
    expect(structuredFlashcardLevel(LANGUAGE)).toBe("language");
    expect(structuredFlashcardLevel(CHAPTERS)).toBe("chapters");
    expect(parentFlashcardSearch(arena("dlp", "challenge"))).toEqual(categories("dlp"));
    expect(parentFlashcardSearch(categories("dlp"))).toEqual(LANGUAGE);
    expect(parentFlashcardSearch(LANGUAGE)).toEqual(CHAPTERS);
    // A URL with a stale set but no language is the language screen, and its
    // parent drops everything below the chapter.
    const stale = { ...LANGUAGE, set: 3, mode: "challenge" };
    expect(structuredFlashcardLevel(stale)).toBe("language");
    expect(parentFlashcardSearch(stale)).toEqual(CHAPTERS);
  });

  it("scenario 1: Concept → Back → Practice → Back → Challenge, each Back landing on the categories", () => {
    const s = openCategories("bm");
    for (const mode of MODES) {
      s.push(arena("bm", mode));
      expect(s.screen).toBe("arena");
      s.inPageBack();
      expect(s.url).toEqual(categories("bm"));
    }
    // In-page Back stepped back through history: no arena entries piled up.
    expect(s.entries).toHaveLength(4);
  });

  it("scenario 2: exits Challenge → categories → language → chapters", () => {
    const s = openCategories("bm");
    s.push(arena("bm", "challenge"));
    s.inPageBack();
    expect(s.screen).toBe("categories");
    s.inPageBack();
    expect(s.screen).toBe("language");
    s.inPageBack();
    expect(s.screen).toBe("chapters");
    expect(s.index).toBe(0);
  });

  it("scenario 3: browser Back/Forward walk the same levels and never reopen a left arena", () => {
    const s = openCategories("dlp");
    s.push(arena("dlp", "practice"));
    s.inPageBack(); // leave the arena with the in-page button
    s.browserBack();
    expect(s.screen).toBe("language");
    s.browserBack();
    expect(s.screen).toBe("chapters");
    s.browserForward();
    expect(s.screen).toBe("language");
    s.browserForward();
    expect(s.screen).toBe("categories");
    // Forward from the categories re-enters the arena only because the
    // student asked to go forward — Back never does.
    s.browserForward();
    expect(s.url).toEqual(arena("dlp", "practice"));
    s.browserBack();
    expect(s.screen).toBe("categories");
  });

  it("scenario 4: after a refresh inside Practice, Back still returns to the categories without pushing", () => {
    const s = openCategories("bm");
    s.push(arena("bm", "practice"));
    s.reload();
    expect(s.screen).toBe("arena");
    s.inPageBack();
    expect(s.url).toEqual(categories("bm"));
    // The arena entry was replaced, so browser Back cannot bring it back.
    expect(s.entries.filter((e) => structuredFlashcardLevel(e) === "arena")).toHaveLength(0);
    s.inPageBack();
    expect(s.screen).toBe("language");
    s.inPageBack();
    expect(s.screen).toBe("chapters");
  });

  it("scenario 5: a direct link with set and mode opens the arena and backs out level by level", () => {
    const s = new Session(arena("dlp", "challenge"));
    expect(s.screen).toBe("arena");
    s.inPageBack();
    expect(s.url).toEqual(categories("dlp"));
    s.inPageBack();
    expect(s.url).toEqual(LANGUAGE);
    s.inPageBack();
    expect(s.url).toEqual(CHAPTERS);
    expect(s.entries).toHaveLength(1);
  });

  it("scenario 6: switching BM → DLP goes back to the language screen and opens the DLP categories", () => {
    const s = openCategories("bm");
    s.push(arena("bm", "concept"));
    s.inPageBack();
    s.inPageBack();
    expect(s.screen).toBe("language");
    s.push(categories("dlp"));
    expect(s.url.lang).toBe("dlp");
    expect(s.url.set).toBeUndefined();
    s.push(arena("dlp", "concept"));
    expect(s.url).toEqual(arena("dlp", "concept"));
  });

  it("does not loop: repeated Back from any screen always reaches the chapter list", () => {
    for (const mode of MODES) {
      const s = openCategories("bm");
      s.push(arena("bm", mode));
      const seen: string[] = [];
      for (let i = 0; i < 6 && s.screen !== "chapters"; i++) {
        seen.push(s.screen);
        s.inPageBack();
      }
      expect(s.screen).toBe("chapters");
      expect(seen).toEqual(["arena", "categories", "language"]);
    }
  });

  it("history-back is chosen only when the previous entry really is the parent screen", () => {
    const visited = new Map([
      [0, flashcardSearchKey(CHAPTERS)],
      [1, flashcardSearchKey(LANGUAGE)],
      [2, flashcardSearchKey(categories("bm"))],
    ]);
    expect(chooseBackAction(3, visited, flashcardSearchKey(categories("bm")))).toBe("history-back");
    expect(chooseBackAction(3, visited, flashcardSearchKey(categories("dlp")))).toBe("replace");
    expect(chooseBackAction(0, visited, flashcardSearchKey(CHAPTERS))).toBe("replace");
    expect(chooseBackAction(undefined, visited, flashcardSearchKey(CHAPTERS))).toBe("replace");
    // Key order and number/string forms do not matter.
    expect(flashcardSearchKey({ form: "1", subject: "math" })).toBe(flashcardSearchKey({ subject: "math", form: 1 }));
  });
});

describe("flashcards page wiring for Form 1 Maths Chapter 1", () => {
  const source = readFileSync(new URL("../routes/flashcards.tsx", import.meta.url), "utf8");

  it("routes all three Back buttons of the structured chapter through goUpOneLevel", () => {
    const uses = source.match(/isStructuredMathF1Chapter\(subject, form, chapter\)\) \{\s*(?:resetSession\(\);|resetMathFlashcardFlow\(\);)\s*goUpOneLevel\(\);/g) ?? [];
    expect(uses).toHaveLength(3);
  });

  it("keeps the language in the URL and clears it when the chapter changes", () => {
    expect(source).toContain("updateFlashcardSearch({ lang, set: null, mode: null })");
    expect(source).toMatch(/lang:\s*next\.lang !== undefined[\s\S]{0,80}chapterChanged\s*\?\s*undefined/);
    expect(source).toContain("setMathFlashcardLang(normalizeMathLangParam(routeSearch.lang))");
  });

  it("never shows the legacy four-category chips for the structured chapter", () => {
    expect(source).toMatch(/MATH_FLASHCARD_BANKS\[chapter\] &&\s*!isStructuredMathF1Chapter\(subject, form, chapter\) &&/);
  });
});

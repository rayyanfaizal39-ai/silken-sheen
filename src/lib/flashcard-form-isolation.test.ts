import { afterEach, describe, expect, it, vi } from "vitest";

import * as registryModule from "@/content/registry";
import { chapters, getRegisteredSubjectChapters } from "@/content/registry";
import * as dataModule from "@/data/content";
import type { Flashcard, Form } from "@/data/types";
import {
  findFlashcardFormLeaks,
  getFlashcardDeckCards as getFlashcardDeckCardsWithModules,
  getFlashcardSessionKey,
  keepSelectedFormCards,
} from "@/lib/flashcard-availability";
import { normalizeFormParam } from "@/lib/study-routing";

// Regression suite for the Sejarah form leak: the Form 1 chapter builder
// selected cards by id regex only, and that regex (`sej-f[123]-c`) also
// matched Form 2/3 cards, so "Sejarah Form 1 Chapter 1" served Form 2 and
// Form 3 Chapter 1 cards too.

const FORMS: Form[] = ["Form 1", "Form 2", "Form 3"];
const LANGS = [undefined, "bm", "dlp"] as const;

function getDeck(subject: string, form: unknown, chapter: string, lang?: "bm" | "dlp") {
  return getFlashcardDeckCardsWithModules(
    subject,
    form,
    chapter,
    lang,
    registryModule,
    dataModule,
  );
}

function sejarahChapterKeys(form: Form) {
  return getRegisteredSubjectChapters("sejarah", undefined, form).map((chapter) => chapter.key);
}

function otherForms(form: Form) {
  return FORMS.filter((candidate) => candidate !== form);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Sejarah flashcards stay inside the selected form", () => {
  for (const form of FORMS) {
    it(`opening Sejarah ${form} returns zero ${otherForms(form).join("/")} cards`, () => {
      const chapterKeys = sejarahChapterKeys(form);
      expect(chapterKeys.length).toBeGreaterThan(0);

      let servedCards = 0;
      for (const chapterKey of chapterKeys) {
        const deck = getDeck("sejarah", form, chapterKey);
        servedCards += deck.length;
        expect(deck.filter((card) => card.form !== form).map((card) => card.id)).toEqual([]);
        expect(deck.every((card) => card.subjectId === "sejarah")).toBe(true);
      }
      // Guard against a vacuous pass (every deck empty).
      expect(servedCards).toBeGreaterThan(0);
    });
  }

  it("keeps the Form 1 chapter builder free of Form 2/3 cards at the source", () => {
    const sejarahF1 = chapters.filter((c) => c.subjectId === "sejarah" && c.form === "Form 1");
    expect(sejarahF1.length).toBeGreaterThan(0);
    for (const chapter of sejarahF1) {
      const ids = (chapter.flashcards ?? []).map((card) => card.id);
      expect(ids.filter((id) => !id.startsWith("sej-f1-"))).toEqual([]);
    }
  });

  it("does not resolve the same 'Chapter N' to one shared dataset across forms", () => {
    for (const chapterKey of ["Chapter 1", "Chapter 2", "Chapter 3"]) {
      const idsByForm = FORMS.map(
        (form) => new Set(getDeck("sejarah", form, chapterKey).map((card) => card.id)),
      );
      for (let a = 0; a < idsByForm.length; a++) {
        for (let b = a + 1; b < idsByForm.length; b++) {
          const shared = [...idsByForm[a]].filter((id) => idsByForm[b].has(id));
          expect(shared).toEqual([]);
        }
      }
    }
  });

  it("serves the full Form 1 deck for a complete chapter (Chapter 2 = 60 cards)", () => {
    const deck = getDeck("sejarah", 1, "Chapter 2");
    expect(deck).toHaveLength(60);
    expect(deck.every((card) => card.id.startsWith("sej-f1-c2-"))).toBe(true);
  });
});

describe("every subject's flashcards stay inside the selected form", () => {
  it("no registered chapter carries flashcards from another subject or form", () => {
    const leaks = chapters.flatMap((chapter) =>
      findFlashcardFormLeaks(chapter.flashcards ?? [], chapter.subjectId, chapter.form).map(
        (card) => `${chapter.id}: ${card.id} (${card.subjectId} ${card.form})`,
      ),
    );
    expect(leaks).toEqual([]);
  });

  it("no resolvable deck (any subject/form/chapter/language) leaks another form", () => {
    const subjectIds = [...new Set(chapters.map((chapter) => chapter.subjectId))];
    const leaks: string[] = [];
    for (const subjectId of subjectIds) {
      for (const form of FORMS) {
        for (const lang of LANGS) {
          for (const { key } of getRegisteredSubjectChapters(subjectId, lang, form)) {
            const deck = getDeck(subjectId, form, key, lang);
            for (const card of findFlashcardFormLeaks(deck, subjectId, form)) {
              leaks.push(`${subjectId} ${form} ${key} ${lang ?? "-"}: ${card.id}`);
            }
          }
        }
      }
    }
    expect(leaks).toEqual([]);
  });
});

describe("form identifiers normalize to one canonical value", () => {
  it.each([
    [1, "Form 1"],
    ["1", "Form 1"],
    ["F1", "Form 1"],
    ["f1", "Form 1"],
    ["Form 1", "Form 1"],
    ["form1", "Form 1"],
    [2, "Form 2"],
    ["F2", "Form 2"],
    ["form2", "Form 2"],
    [3, "Form 3"],
    ["f3", "Form 3"],
    ["Form 3", "Form 3"],
  ])("%j -> %s", (input, expected) => {
    expect(normalizeFormParam(input)).toBe(expected);
  });

  it("resolves the same deck whatever form spelling the URL uses", () => {
    const canonical = getDeck("sejarah", "Form 2", "Chapter 1").map((card) => card.id);
    expect(canonical.length).toBeGreaterThan(0);
    for (const spelling of [2, "2", "F2", "f2", "form2"]) {
      expect(getDeck("sejarah", spelling, "Chapter 1").map((card) => card.id)).toEqual(canonical);
    }
  });
});

describe("the deck guard drops leaked cards instead of falling back", () => {
  const card = (id: string, form: Form, subjectId = "sejarah"): Flashcard => ({
    id,
    subjectId,
    form,
    front: id,
    back: id,
  });

  it("keeps only cards for the selected subject + form and reports the leak", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const kept = keepSelectedFormCards(
      [card("a", "Form 1"), card("b", "Form 3"), card("c", "Form 1", "geography")],
      "sejarah",
      "Form 1",
    );
    expect(kept.map((c) => c.id)).toEqual(["a"]);
    expect(error).toHaveBeenCalledWith("FLASHCARD FORM LEAK", expect.anything());
  });

  it("returns an empty deck — not all cards — when nothing matches", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(
      keepSelectedFormCards([card("x", "Form 2"), card("y", "Form 3")], "sejarah", "Form 1"),
    ).toEqual([]);
  });
});

describe("flashcard sessions are scoped by form", () => {
  it("builds form-scoped session keys", () => {
    expect(getFlashcardSessionKey("sejarah", "Form 1", "Chapter 1")).toBe(
      "flashcard-session:sejarah:f1:chapter-1",
    );
  });

  it("switching Form 3 -> Form 1 starts a new deck instead of reusing the Form 3 one", () => {
    const form3Key = getFlashcardSessionKey("sejarah", "Form 3", "Chapter 2");
    const form1Key = getFlashcardSessionKey("sejarah", "Form 1", "Chapter 2");
    expect(form1Key).not.toBe(form3Key);

    const form3Ids = new Set(getDeck("sejarah", "Form 3", "Chapter 2").map((card) => card.id));
    const form1Deck = getDeck("sejarah", "Form 1", "Chapter 2");
    expect(form1Deck.length).toBeGreaterThan(0);
    expect(form1Deck.filter((card) => form3Ids.has(card.id))).toEqual([]);
  });

  it("refreshing Form 1 restores only the Form 1 session", () => {
    // A refresh re-reads ?subject=sejarah&form=1&chapter=Chapter 2 from the URL.
    const beforeRefresh = getFlashcardSessionKey(
      "sejarah",
      normalizeFormParam("1"),
      "Chapter 2",
      null,
    );
    const afterRefresh = getFlashcardSessionKey(
      "sejarah",
      normalizeFormParam(1),
      "Chapter 2",
      null,
    );
    expect(afterRefresh).toBe(beforeRefresh);
    expect(afterRefresh).toContain(":f1:");
    for (const other of ["Form 2", "Form 3"]) {
      expect(afterRefresh).not.toBe(getFlashcardSessionKey("sejarah", other, "Chapter 2", null));
    }
    const restored = getDeck("sejarah", normalizeFormParam(1), "Chapter 2");
    expect(restored.length).toBeGreaterThan(0);
    expect(restored.every((card) => card.form === "Form 1")).toBe(true);
  });
});

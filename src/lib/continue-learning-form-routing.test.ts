import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import * as registryModule from "@/content/registry";
import * as dataModule from "@/data/content";
import { createLearningCatalog } from "@/components/home/HomeProgressSummaries";
import { buildCanonicalQuizKey, formFromCanonicalQuizKey } from "@/features/quiz/xp/quizXp";
import { subjects } from "@/data/subjects-meta";
import { getFlashcardDeckCards } from "@/lib/flashcard-availability";
import { buildResumeSearch, normalizeFormParam, parseKnownForm } from "@/lib/study-routing";

const FORMS = ["Form 1", "Form 2", "Form 3"] as const;

const source = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("a missing form is unknown, never Form 1", () => {
  it("parses every explicit spelling of a form", () => {
    expect(parseKnownForm(2)).toBe("Form 2");
    expect(parseKnownForm("3")).toBe("Form 3");
    expect(parseKnownForm("Form 2")).toBe("Form 2");
    expect(parseKnownForm("f3")).toBe("Form 3");
    expect(parseKnownForm("form-1")).toBe("Form 1");
  });

  it("returns null — not Form 1 — for a missing or unrecognised form", () => {
    for (const value of [undefined, null, "", "Form 4", "All", 0]) {
      expect(parseKnownForm(value)).toBeNull();
    }
  });

  it("keeps normalizeFormParam's existing URL behaviour", () => {
    expect(normalizeFormParam(undefined)).toBe("Form 1");
    expect(normalizeFormParam("2")).toBe("Form 2");
    expect(normalizeFormParam("form-3")).toBe("Form 3");
  });
});

describe("resume links carry the form or open the Form chooser", () => {
  it("resumes Form 3 Science Chapter 4 into Form 3 Chapter 4", () => {
    expect(
      buildResumeSearch({ subjectId: "science", chapterKey: "Chapter 4", form: "Form 3" }),
    ).toEqual({ subject: "science", form: 3, chapter: "Chapter 4" });
  });

  it("drops form AND chapter when the entry predates form tracking", () => {
    // No form + no chapter is exactly what makes /notes, /quizzes and
    // /flashcards show their Form chooser.
    expect(buildResumeSearch({ subjectId: "science", chapterKey: "Chapter 4" })).toEqual({
      subject: "science",
    });
  });

  it("can resume to the chapter list of a known form", () => {
    expect(
      buildResumeSearch(
        { subjectId: "sejarah", chapterKey: "Chapter 2", form: "Form 2" },
        { withChapter: false },
      ),
    ).toEqual({ subject: "sejarah", form: 2 });
  });
});

describe("quiz history records the form from the canonical quiz key", () => {
  it.each(FORMS)("reads %s back out of every quiz kind", (form) => {
    const keys = [
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "science",
        form,
        chapterKey: "Chapter 4",
        lang: "bm",
        set: null,
        difficulty: "All",
      }),
      buildCanonicalQuizKey({
        kind: "math-objective",
        form,
        chapterKey: "Chapter 1",
        lang: "dlp",
        objectiveId: "objective",
      }),
      buildCanonicalQuizKey({ kind: "english", form, setId: "set-1" }),
      buildCanonicalQuizKey({ kind: "bm-world", form, setId: "set-1" }),
    ];
    for (const key of keys) expect(formFromCanonicalQuizKey(key)).toBe(form);
  });

  it("returns null for keys that don't carry a form", () => {
    expect(formFromCanonicalQuizKey("science:chapter-4:easy")).toBeNull();
  });
});

describe("homepage recommendations never guess a form from subject + chapter", () => {
  const catalog = createLearningCatalog(registryModule);

  it("does not resolve a chapter number that exists in several forms", () => {
    const sharedByAllForms = FORMS.every((form) =>
      catalog.hasResource({ subjectId: "science", form, chapterKey: "Chapter 1" }, "notes"),
    );
    expect(sharedByAllForms).toBe(true);
    // Previously this returned the first match — Form 1.
    expect(catalog.findAvailable("science", "Chapter 1", "notes")).toBeNull();
  });

  it("still resolves a chapter that only one form has", () => {
    const unique = subjects
      .flatMap((subject) =>
        FORMS.flatMap((form) =>
          registryModule
            .getRegisteredSubjectChapters(subject.id, undefined, form)
            .map((chapter) => ({ subjectId: subject.id, form, chapterKey: chapter.key })),
        ),
      )
      .find(
        (candidate) =>
          catalog.hasResource(candidate, "notes") &&
          FORMS.filter((form) => catalog.hasResource({ ...candidate, form }, "notes")).length === 1,
      );
    expect(unique).toBeDefined();
    expect(catalog.findAvailable(unique!.subjectId, unique!.chapterKey, "notes")?.form).toBe(
      unique!.form,
    );
  });
});

describe("the same chapter number resolves to a different deck per form", () => {
  it("Science Chapter 1 in Form 1, 2 and 3 are three disjoint, correctly tagged decks", () => {
    const decks = FORMS.map((form) =>
      getFlashcardDeckCards("science", form, "Chapter 1", "bm", registryModule, dataModule),
    );
    decks.forEach((deck, index) => {
      expect(deck.length).toBeGreaterThan(0);
      expect(deck.every((card) => card.form === FORMS[index])).toBe(true);
    });
    const [f1, f2, f3] = decks.map((deck) => new Set(deck.map((card) => card.id)));
    for (const [a, b] of [
      [f1, f2],
      [f1, f3],
      [f2, f3],
    ] as const) {
      expect([...a].filter((id) => b.has(id))).toEqual([]);
    }
  });
});

describe("entry points into study routes do not force Form 1", () => {
  it("the subject planet cards (Continue Learning → Subjects) send no form", () => {
    const academyPage = source("../components/AcademyPage.tsx");
    const link = academyPage.slice(academyPage.indexOf("export function SubjectPlanetLink"));
    expect(link.slice(0, link.indexOf("className="))).not.toMatch(/form:\s*1/);
  });

  it("homepage and dashboard resume surfaces have no Form 1 fallback", () => {
    for (const path of [
      "../components/home/HomeContinueLearning.tsx",
      "./home-progress-summary.ts",
      "../routes/dashboard.tsx",
      "../components/NextMissionCard.tsx",
    ]) {
      const file = source(path);
      expect(file, path).not.toMatch(/\?\?\s*"Form 1"/);
      expect(file, path).not.toMatch(/match\(\/\\d\/\)\?\.\[0\] \?\? 1/);
    }
  });

  it("flashcards show the Form chooser whenever the form is unknown", () => {
    const flashcards = source("../routes/flashcards.tsx");
    expect(flashcards).toContain("if (subject && !formWasChosen) {");
    expect(flashcards).not.toContain('lastDeck.form ?? "Form 1"');
    expect(flashcards).not.toContain('form: form === "All" ? "Form 1" : form');
  });
});

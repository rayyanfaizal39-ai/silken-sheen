import { describe, expect, it } from "vitest";
import { scienceF3Chapter8Source, chapter8Facts } from "./chapter8-content";
import { scienceF3C8Interactive } from "./interactive";
import { buildScienceF3Notes, buildScienceF3Flashcards, buildScienceF3Quizzes } from "../resource-builders";
import { buildScienceF3MindMap } from "../mindmap-builder";
import { getScienceF3MasterQuizzes } from "../master-quizzes.generated";
import { scienceF3ChapterContent } from "../registration";

describe("Chapter 8 resource parity and assessment corrections", () => {
  it("has nonempty BM/DLP for every shared fact", () => {
    for (const fact of Object.values(chapter8Facts)) for (const lang of ["bm", "dlp"] as const) {
      expect(fact.term[lang].trim().length).toBeGreaterThan(0);
      expect(fact.statement[lang].trim().length).toBeGreaterThan(20);
    }
    expect(scienceF3Chapter8Source.subtopics.map(s => s.number)).toEqual(["8.1", "8.2", "8.3", "8.4"]);
    expect(scienceF3C8Interactive.keywords).toContainEqual({ bm: "Curie (Ci)", dlp: "Curie (Ci)" });
  });

  it.each(["bm", "dlp"] as const)("keeps textbook classification and added uses in shared %s resources", lang => {
    expect(chapter8Facts.nonIonising.statement[lang]).not.toMatch(/ultraviolet|ultraungu/i);
    if (lang === "bm") {
      expect(chapter8Facts.ionising.statement.bm).toBe("Apabila suatu sinaran seperti sinaran radioaktif melintasi udara dan menghasilkan ion positif dan ion negatif, sinaran itu dikenali sebagai sinaran mengion.");
      expect(chapter8Facts.nonIonising.statement.bm).toBe("Sinaran yang tidak menghasilkan ion positif dan ion negatif apabila melintasi udara.");
    } else {
      expect(chapter8Facts.ionising.statement.dlp).toMatch(/ultraviolet/i);
      expect(chapter8Facts.ionising.statement.dlp).toMatch(/alpha/i);
      expect(chapter8Facts.ionising.statement.dlp).toContain("beta");
    }
    for (const resource of [buildScienceF3Notes(8, lang), buildScienceF3Flashcards(8, lang), buildScienceF3MindMap(8, lang)]) {
      const text = JSON.stringify(resource);
      for (const value of ["Tc-99", "2 m", "Th-232", "U-235"]) expect(text).toContain(value);
      expect(text).not.toMatch(/Ultraviolet is classified as non-ionising|Ultraungu dikelaskan sebagai tak mengion/);
      if (lang === "bm") expect(text).not.toMatch(/sinar gamma|lencana radiasi|dos radiasi|gumpalan darah|sinaran tak mengion/i);
    }
    const medical = scienceF3C8Interactive.sections[3].flipCards!.find(card => card.id === "medical")!;
    expect(medical.fact[lang]).toContain("Tc-99");
    expect(chapter8Facts.controls.statement[lang]).toContain("2 m");
  });

  it.each(["bm", "dlp"] as const)("uses the corrected data across registered %s resources", lang => {
    const registered = scienceF3ChapterContent.find(c => c.id === `science-f3-c8-${lang}`)!;
    expect(registered.notes).toEqual(buildScienceF3Notes(8, lang));
    expect(registered.flashcards).toEqual(buildScienceF3Flashcards(8, lang));
    expect(registered.quiz).toEqual(getScienceF3MasterQuizzes(8, lang));
    expect(registered.quiz).toHaveLength(50);
    expect(registered.flashcards).toHaveLength(60);
    for (const resource of [registered.notes, registered.flashcards, buildScienceF3MindMap(8, lang)]) {
      const text = JSON.stringify(resource);
      for (const concept of ["3.7 × 10¹⁰", "1/16", "0.2 μSv/h", "Rn-222"]) expect(text).toContain(concept);
      expect(text).not.toMatch(/undefined|NaN|8\.\d\.\d/);
    }
    // The legacy wrapper quizzes remain valid even though registration uses the master bank.
    for (const q of [...registered.quiz!, ...buildScienceF3Quizzes(8, lang)]) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options[q.answerIndex]).toBeTruthy();
      expect(q.explanation).toBeTruthy();
    }
  });

  it("corrects the live bank's mismatched questions, calculations and science", () => {
    const bank = getScienceF3MasterQuizzes(8, "dlp");
    const q = (set: string, n: number) => bank.find(q => q.id === `sci-f3-c8-set-${set}-dlp-q${n}`)!;
    const answer = (set: string, n: number) => { const item = q(set, n); return item.options[item.answerIndex]; };
    expect(answer("a", 5)).toContain("Random and spontaneous decay");
    expect(answer("a", 24)).toContain("sheet thickness");
    expect(answer("a", 25)).toContain("cancer treatment");
    expect(answer("b", 3)).toContain("ionising power");
    expect(answer("b", 8)).toBe("40 g");
    expect(q("b", 9).explanation).toContain("640 Bq to 320 Bq");
    expect(q("b", 1).explanation).not.toContain("+ 0.8");
    for (const [set,n] of [["a",16],["b",13]] as const) expect(answer(set,n)).toBe("Ultraviolet, X-rays and gamma rays.");
    for (const [set,n] of [["a",23],["b",21]] as const) {
      expect(q(set,n).question).toContain("organic remains");
      expect(answer(set,n)).toContain("continues to decay");
      expect(q(set,n).question).not.toMatch(/dinosaur|fossil/i);
    }
    expect(answer("b", 17)).toContain("into the page");
    expect(q("b",17).question).toContain("downwards");
  });
});

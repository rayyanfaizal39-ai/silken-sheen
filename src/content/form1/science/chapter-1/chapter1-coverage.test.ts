import { describe, expect, it } from "vitest";
import { flashcards, quizzes } from "@/data/content";
import { chapter1LearningExperiences } from "./chapter1-activities";
import {
  chapter1Coverage,
  chapter1Terminology,
  laboratoryApparatus,
  laboratoryHazards,
  scienceProcessSkills,
  scientificInvestigationSteps,
} from "./chapter1-canonical";
import { chapter1Content } from "./chapter1-content";
import { scienceF1C1MindMapBM } from "./mindmap-bm";
import { scienceF1C1MindMapDLP } from "./mindmap-dlp";
import { chapter1InteractionCoverage } from "@/components/notes/blocks/Chapter1InteractiveChecks";

const expectedStandards = [
  "1.1.1", "1.1.2", "1.1.3", "1.1.4", "1.1.5", "1.1.6", "1.1.7",
  "1.2.1", "1.2.2", "1.2.3", "1.2.4",
  "1.3.1", "1.3.2", "1.3.3", "1.3.4",
  "1.4.1", "1.4.2", "1.4.3", "1.4.4", "1.4.5",
  "1.5.1", "1.5.2", "1.5.3", "1.5.4", "1.5.5", "1.5.6",
  "1.6.1", "1.6.2", "1.6.3",
  "1.7.1", "1.7.2", "1.7.3",
];

const practicalStandards = ["1.2.1", "1.2.3", "1.4.1", "1.4.2", "1.4.4", "1.5.1", "1.5.2", "1.5.3", "1.5.4", "1.5.6", "1.6.2", "1.6.3", "1.7.3"];
const unsupportedAssessmentTerms = /acetone|aseton|oxidising|pengoksidaan|potassium manganate|kalium manganat|cyanide|sianida|bell jar|balang loceng|law of flotation|hukum apungan/i;

function flattenLabels(root: { label: string; children?: Array<{ label: string; children?: unknown[] }> }): string[] {
  const labels = [root.label];
  for (const child of root.children ?? []) labels.push(...flattenLabels(child as typeof root));
  return labels;
}

describe("Science Form 1 Chapter 1 canonical coverage", () => {
  it("declares every DSKP learning standard exactly once", () => {
    expect(chapter1Coverage.map((entry) => entry.standard).sort()).toEqual([...expectedStandards].sort());
    expect(new Set(chapter1Coverage.map((entry) => entry.standard)).size).toBe(expectedStandards.length);
    expect(chapter1Coverage.every((entry) => entry.modes.length > 0 && entry.source.length > 0)).toBe(true);
  });

  it("keeps only genuine physical outcomes as concise teacher-guided practicals", () => {
    const represented = new Set(chapter1LearningExperiences.flatMap((experience) => experience.standards));
    for (const standard of practicalStandards) expect(represented.has(standard as `1.${number}.${number}`)).toBe(true);
    expect(chapter1LearningExperiences).toHaveLength(8);
    expect(chapter1LearningExperiences.every((experience) => experience.practicalNotice)).toBe(true);
    expect(chapter1LearningExperiences.map((experience) => experience.id)).toEqual([
      "apparatus-draw-classify",
      "measurement-stations",
      "estimate-then-measure",
      "density-cubes",
      "water-displacement-density",
      "density-innovation",
      "pendulum-investigation",
      "values-reflection",
    ]);
  });

  it("maps every compact interaction to canonical INTERACTIVE coverage", () => {
    const interactiveStandards = new Set(Object.values(chapter1InteractionCoverage).flat());
    for (const standard of interactiveStandards) {
      expect(chapter1Coverage.find((entry) => entry.standard === standard)?.modes).toContain("INTERACTIVE");
    }
  });

  it("does not represent recognition checks as physical or operational outcomes", () => {
    expect(chapter1InteractionCoverage["measuring-tool"]).toEqual([]);
    expect(chapter1InteractionCoverage.density).toEqual(["1.5.2"]);
    expect(chapter1InteractionCoverage["investigation-order"]).toEqual(["1.6.2"]);
    expect(chapter1InteractionCoverage.values).toEqual(["1.7.1"]);
    expect(chapter1Coverage.find((entry) => entry.standard === "1.4.1")?.modes).not.toContain("INTERACTIVE");
    expect(chapter1Coverage.find((entry) => entry.standard === "1.6.3")?.modes).toEqual(["EXPERIMENT"]);
  });

  it("uses the formal DLP measurement term", () => {
    expect(chapter1Terminology.precision.en).toBe("Precision");
    expect(scienceF1C1MindMapDLP.label).toBe("Introduction to Scientific Investigation");
    expect(flattenLabels(scienceF1C1MindMapDLP).join(" ")).toContain("Precision");
  });

  it("keeps the textbook apparatus and warning-category sets complete", () => {
    expect(laboratoryApparatus).toHaveLength(14);
    expect(laboratoryApparatus.find((item) => item.id === "evaporating-dish")?.name.bm).toBe("Piring sejat");
    expect(laboratoryHazards.map((hazard) => hazard.kind)).toEqual(["irritant", "radioactive", "corrosive", "toxic", "explosive", "flammable"]);
  });

  it("keeps twelve DSKP process skills and the canonical nine-step sequence bilingual", () => {
    expect(scienceProcessSkills).toHaveLength(12);
    expect(scienceProcessSkills.every((skill) => skill.name.en && skill.name.bm && skill.description.en && skill.description.bm)).toBe(true);
    expect(scientificInvestigationSteps.map((step) => step.step)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(scientificInvestigationSteps[2].id).toBe("variables");
    expect(scientificInvestigationSteps[4].id).toBe("conduct");
  });

  it("derives both mind maps from the same critical sequence", () => {
    const enLabels = flattenLabels(scienceF1C1MindMapDLP);
    const bmLabels = flattenLabels(scienceF1C1MindMapBM);
    for (const step of scientificInvestigationSteps) {
      expect(enLabels).toContain(`${step.step}. ${step.heading.en}`);
      expect(bmLabels).toContain(`${step.step}. ${step.heading.bm}`);
    }
  });

  it("localizes all authored learning experiences for rendering", () => {
    for (const lang of ["en", "bm"] as const) {
      const localized = Object.values(chapter1Content[lang].learningExperiences).flat();
      expect(localized).toHaveLength(chapter1LearningExperiences.length);
      expect(localized.every((experience) => experience.title && experience.purpose && experience.instructions.length > 0 && experience.studentOutput)).toBe(true);
    }
  });
});

describe("Science Form 1 Chapter 1 assessment remediation", () => {
  const chapterQuizzes = quizzes.filter((quiz) => quiz.subjectId === "science" && quiz.form === "Form 1" && quiz.chapter === "Chapter 1");
  const chapterFlashcards = flashcards.filter((card) => card.subjectId === "science" && card.form === "Form 1" && card.chapter === "Chapter 1");

  it("preserves the thirty quiz and sixty flashcard IDs in each language", () => {
    for (const lang of ["dlp", "bm"] as const) {
      expect(chapterQuizzes.filter((quiz) => quiz.lang === lang).map((quiz) => quiz.id)).toEqual(Array.from({ length: 30 }, (_, index) => `sci-f1-c1-${lang}-q${index + 1}`));
      expect(chapterFlashcards.filter((card) => card.lang === lang).map((card) => card.id)).toEqual(Array.from({ length: 60 }, (_, index) => `sci-f1-c1-${lang}-f${index + 1}`));
    }
  });

  it("removes unsupported assessment terms and includes difficulty progression", () => {
    const assessmentText = [
      ...chapterQuizzes.flatMap((quiz) => [quiz.question, ...quiz.options, quiz.explanation ?? ""]),
      ...chapterFlashcards.flatMap((card) => [card.front, card.back]),
    ].join(" ");
    expect(assessmentText).not.toMatch(unsupportedAssessmentTerms);
    for (const lang of ["dlp", "bm"] as const) {
      const difficulties = new Set(chapterQuizzes.filter((quiz) => quiz.lang === lang).map((quiz) => quiz.difficulty));
      expect(difficulties).toEqual(new Set(["Easy", "Medium", "Hard"]));
    }
  });

  it("uses the canonical nine-step sequence in the investigation flashcard", () => {
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-dlp-f56")?.back).toBe(scientificInvestigationSteps.map((step) => `${step.step}. ${step.heading.en}`).join(" "));
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-bm-f56")?.back).toBe(scientificInvestigationSteps.map((step) => `${step.step}. ${step.heading.bm}`).join(" "));
  });

  it("keeps remediated Chapter 1 terminology and safety wording source-faithful", () => {
    expect(chapterQuizzes.find((quiz) => quiz.id === "sci-f1-c1-dlp-q20")?.question).toContain("Micro (µ)");
    expect(chapterQuizzes.find((quiz) => quiz.id === "sci-f1-c1-dlp-q21")?.question).toContain("Precision");
    expect(chapterQuizzes.find((quiz) => quiz.id === "sci-f1-c1-bm-q20")?.question).toContain("Mikro (µ)");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-dlp-f16")?.back).toContain("eyes, nose and throat");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-bm-f16")?.back).toContain("mata, hidung dan tekak");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-dlp-f21")?.back).toBe("It holds a large quantity of chemicals.");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-bm-f21")?.front).toContain("kelalang dasar leper");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-bm-f22")?.front).toContain("piring sejat");
    expect(chapterFlashcards.find((card) => card.id === "sci-f1-c1-bm-f47")?.back).toContain("ρ = m/V");
  });
});

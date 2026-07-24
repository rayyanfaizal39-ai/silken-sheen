import { describe, expect, it } from "vitest";
import {
  cleanLearningLabel,
  cleanLearningQuestion,
  cleanLearningTitle,
} from "./clean-learning-title";

describe("cleanLearningTitle", () => {
  it.each([
    ["Concept 5.2: Circumference of a Circle", "Circumference of a Circle"],
    [
      "Chapter 3: Pentadbiran Negeri-negeri Melayu Bersekutu",
      "Pentadbiran Negeri-negeri Melayu Bersekutu",
    ],
    ["Bab 4 - Fotosintesis", "Fotosintesis"],
    ["Formula 7.2: Distance Between Two Points (13)", "Distance Between Two Points"],
    ["Subtopic 3.1 — Linear Equations [12]", "Linear Equations"],
    ["Topik 2.4: Cuaca dan Iklim (Set 3)", "Cuaca dan Iklim"],
    ["7.3 Pythagoras’ Theorem", "Pythagoras’ Theorem"],
    ["Module 2. Ecosystems", "Ecosystems"],
    ["Modul 2 — Ekosistem", "Ekosistem"],
    ["Photosynthesis — Set 3", "Photosynthesis"],
    ["Cell Division (12 Questions)", "Cell Division"],
  ])("cleans title %s", (text, expected) => {
    expect(cleanLearningTitle(text)).toBe(expected);
  });

  it.each([
    "2D Shapes",
    "3D Shapes",
    "World War II",
    "Form 1",
    "Vitamin B12",
    "Carbon-14",
    "24-Hour Clock",
    "Chapter 11 bankruptcy",
    "3.14",
    "RM10.50",
    "1.5 × 10³",
  ])("preserves meaningful title %s", (text) => {
    expect(cleanLearningTitle(text)).toBe(text);
  });
});

describe("cleanLearningQuestion", () => {
  it.each([
    [
      "Apakah fakta utama bagi 3.2 Peluasan Kuasa British di Perak, Selangor, Negeri Sembilan dan Pahang? (Set 10)",
      "Apakah fakta utama bagi Peluasan Kuasa British di Perak, Selangor, Negeri Sembilan dan Pahang?",
    ],
    ["What is explained in 4.1 Photosynthesis? (Set 2)", "What is explained in Photosynthesis?"],
    [
      "Based on Subtopic 2.3 Linear Equations, calculate the value.",
      "Based on Linear Equations, calculate the value.",
    ],
    ["Explain Concept 5.2 Circumference of a Circle.", "Explain Circumference of a Circle."],
    [
      "What is Formula 7.2: Distance Between Two Points? [13]",
      "What is Distance Between Two Points?",
    ],
    ["5) What is respiration? (Question 4)", "What is respiration?"],
    [
      "Summarise the Chapter 10 concept map in one sentence.",
      "Summarise the concept map in one sentence.",
    ],
    ["Apakah kesimpulan fundamental Bab 10?", "Apakah kesimpulan fundamental?"],
    ["Summarise the topic of Chapter 13 in one sentence.", "Summarise the topic in one sentence."],
    ["Chapter 7 covers electric circuits.", "Covers electric circuits."],
  ])("cleans question %s", (text, expected) => {
    expect(cleanLearningQuestion(text)).toBe(expected);
  });

  it.each([
    "Calculate 2.5 × 4",
    "A circle has radius 5.2 cm",
    "Find the point (3, 4)",
    "What is f(x)?",
    "The temperature is 20°C.",
    "The current is 1.5 A.",
    "(1.5 × 10⁸)/(1.5 × 10⁸) = 1.0 A.U.",
    "When did World War II end?",
    "Find x² + 3x + 2.",
    "The period was 1939–1945.",
    "The subsets are ∅, {1}, {2}.",
  ])("preserves meaningful question %s", (text) => {
    expect(cleanLearningQuestion(text)).toBe(text);
  });
});

describe("cleanLearningLabel", () => {
  it("cleans compact set and chapter labels", () => {
    expect(cleanLearningLabel("Chapter 4: Photosynthesis [Set 2]")).toBe("Photosynthesis");
  });

  it("accepts missing or malformed content safely", () => {
    expect(cleanLearningLabel(undefined)).toBe("");
    expect(cleanLearningLabel(null)).toBe("");
    expect(cleanLearningLabel("  Formula 7.2:  ")).toBe("Formula 7.2:");
  });
});

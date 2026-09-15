import { describe, expect, it } from "vitest";
import { scienceEmphasisParts } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C13InteractiveBM } from "./interactive-bm";
import { scienceF2C13InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the emphasis markers in Chapter 13 (Meteoroid, Asteroid, Comet).
 *
 * The chapter was restructured into separate object lessons, so the markers now
 * sit on the new wording rather than on the old combined cards: each object's
 * own name in its definition, the one rule each meteoroid sub-concept turns on,
 * the collision condition, and the two comet source regions. What these tests
 * hold constant is the discipline, not the old strings: an exact marked set per
 * stream, each concept once, the same fields in both languages, markers only
 * where `ScienceEmphasis` actually renders them, and none in assessment content.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C13InteractiveBM],
  ["DLP", scienceF2C13InteractiveDLP],
];

/** Every learner-facing string in the chapter, with the field path that holds it. */
function allStrings(content: ScienceF2InteractiveContent): [string, string][] {
  const out: [string, string][] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === "string") out.push([path, node]);
    else if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`));
    else if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) walk(value, `${path}.${key}`);
    }
  };
  walk(content, "content");
  return out;
}

/** The exact set of terms each stream is expected to have marked (order-independent). */
const EXPECTED: Record<string, string[]> = {
  BM: [
    "Komet Shoemaker-Levy 9",
    "Meteoroid",
    "menukar nama mengikut lokasinya",
    "banyak meteor",
    "Asteroid",
    "Perlanggaran boleh berlaku apabila laluan Bumi dan asteroid bertemu",
    "Komet",
    "Jalur Kuiper",
    "Awan Oort",
  ],
  DLP: [
    "Comet Shoemaker-Levy 9",
    "meteoroid",
    "changes its name depending on where it is",
    "many meteors",
    "asteroid",
    "collision can occur when the paths of Earth and an asteroid meet",
    "comet",
    "Kuiper Belt",
    "Oort Cloud",
  ],
};

/** Only these field-path suffixes are rendered through ScienceEmphasis. */
const ALLOWED_FIELD =
  /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

/**
 * `note` is in the shared allow-list for other chapters, but a Chapter 13
 * figure concept's `note` is printed as plain text by InteractiveFigureCard, so
 * a marker there would show literal asterisks.
 */
const PLAIN_TEXT_NOTE = /\.lessonFlow\[\d+\]\.(concepts|items|orbits|regions|steps)\[\d+\]\.note$/;

describe("Chapter 13 — emphasis markers", () => {
  it.each(STREAMS)("%s marks exactly the expected terms", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text);
    expect(new Set(marked)).toEqual(new Set(EXPECTED[name]));
    expect(marked.length, `${name} has a duplicated or missing marker`).toBe(EXPECTED[name].length);
  });

  it.each(STREAMS)("%s marks each concept once, not everywhere it appears", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text.toLowerCase());
    expect(new Set(marked).size, `${name} repeats an emphasised concept`).toBe(marked.length);
  });

  it("marks the equivalent concept in both languages, in the same fields", () => {
    const fieldsWithMarkers = (content: ScienceF2InteractiveContent) =>
      allStrings(content)
        .filter(([, text]) => text.includes("**"))
        .map(([path]) => path)
        .sort();
    expect(fieldsWithMarkers(scienceF2C13InteractiveBM)).toEqual(
      fieldsWithMarkers(scienceF2C13InteractiveDLP),
    );
  });

  it.each(STREAMS)("%s puts markers only in fields wired to ScienceEmphasis", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis marker in an unwired field: ${path}`).toMatch(ALLOWED_FIELD);
      expect(path, `${name}: marker in a plain-text figure note: ${path}`).not.toMatch(
        PLAIN_TEXT_NOTE,
      );
    }
  });

  it.each(STREAMS)("%s leaves quiz, check and reflection content unmarked", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis leaked into assessment content: ${path}`).not.toMatch(
        /miniQuiz|reflectionItems|checks/,
      );
    }
  });
});

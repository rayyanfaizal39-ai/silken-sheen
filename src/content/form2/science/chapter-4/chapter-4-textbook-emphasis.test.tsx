import { describe, expect, it } from "vitest";
import { scienceEmphasisParts } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C4InteractiveBM } from "./interactive-bm";
import { scienceF2C4InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the `**markers**` used to carry the textbook's own emphasis through
 * Chapter 4 (Human Health) after the human-audit correction pass.
 *
 * The previous version of this file locked in the exact wording of the prior
 * audit, byte for byte. That wording has since been deliberately rewritten —
 * sections reordered, transmission/prevention/defence content turned into
 * point form, the vector-borne teaching folded together, and the response
 * graph and society section relocated — so a lock keyed to the old strings
 * would fail on every legitimate content change from here on. What still
 * matters, and what this file checks instead, is that markers only ever land
 * on fields actually wired to render them, that no single field is over-
 * marked, and that BM and DLP mark the equivalent concept in the same shape
 * of field.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C4InteractiveBM],
  ["DLP", scienceF2C4InteractiveDLP],
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

/**
 * Field path suffixes actually wired to render through `ScienceEmphasis`:
 * card/accordion/comparison bodies and their `facts[].value` entries, image
 * annotation notes, cause-effect notes, adaptation copy, and the two callouts.
 */
const ALLOWED_FIELD =
  /\.(body|intro|note|value|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

/** A path is inside `reflectionItems` / `miniQuiz`, which must never carry emphasis. */
const IS_ASSESSMENT_FIELD = /\breflectionItems\b|\bminiQuiz\b/;

describe("Chapter 4 — the textbook's emphasis, and only that", () => {
  it.each(STREAMS)("%s puts markers only in fields wired to ScienceEmphasis", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis marker in an unwired field: ${path}`).toMatch(ALLOWED_FIELD);
    }
  });

  it.each(STREAMS)("%s leaves quiz and reflection content unmarked", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis leaked into assessment content: ${path}`).not.toMatch(
        IS_ASSESSMENT_FIELD,
      );
    }
  });

  it.each(STREAMS)(
    "%s marks each concept once per field, not piled up in one string",
    (name, content) => {
      for (const [path, text] of allStrings(content)) {
        const marked = scienceEmphasisParts(text)
          .filter((part) => part.emphasised)
          .map((part) => part.text.toLowerCase());
        expect(new Set(marked).size, `${name}: ${path} repeats a marker`).toBe(marked.length);
      }
    },
  );

  it.each(STREAMS)("%s never marks the entire field with nothing left plain", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      const parts = scienceEmphasisParts(text);
      const allEmphasised = parts.every((part) => part.emphasised || part.text.trim() === "");
      expect(allEmphasised, `${name}: ${path} has no plain-prose contrast left`).toBe(false);
    }
  });

  it("marks a comparable number of concepts in BM and DLP", () => {
    const markedCount = (content: ScienceF2InteractiveContent) =>
      allStrings(content).filter(([, text]) => text.includes("**")).length;
    const bm = markedCount(scienceF2C4InteractiveBM);
    const dlp = markedCount(scienceF2C4InteractiveDLP);
    // Not required to be identical (BM and DLP restructure a sentence
    // differently now and then), but a large gap would mean one language
    // lost its emphasis pass entirely.
    expect(Math.abs(bm - dlp), `BM marked ${bm}, DLP marked ${dlp}`).toBeLessThanOrEqual(6);
  });
});

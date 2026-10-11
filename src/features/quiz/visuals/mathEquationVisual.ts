import { textFor, type LocalizedText, type MathVisualLang, type VisualText } from "./mathQuestionVisual";

/**
 * Deliberately unsolved representations for Chapter 6.
 * Equality panels display the original two sides, not algebraic transformations.
 * Story cards show only supplied quantities, with unknowns left as letters.
 */
export type MathEquationVisual =
  | {
      kind: "equation-balance";
      title: LocalizedText;
      rows: { left: string; right: string; label?: VisualText }[];
    }
  | {
      kind: "equation-story";
      title: LocalizedText;
      scenes: {
        label?: VisualText;
        items: { text: VisualText; count: number }[];
        result?: VisualText;
      }[];
      note?: VisualText;
    };

export function describeMathEquationVisual(visual: MathEquationVisual, lang: MathVisualLang) {
  const bm = lang === "bm";
  if (visual.kind === "equation-balance") {
    return `${visual.title[lang]}. ${visual.rows.map((row) =>
      `${row.label ? textFor(row.label, lang) + ": " : ""}${row.left} = ${row.right}`,
    ).join("; ")}. ${bm ? "Kedua-dua belah mesti kekal sama" : "Both sides must remain equal"}.`;
  }
  return `${visual.title[lang]}. ${visual.scenes.map((scene) =>
    `${scene.label ? textFor(scene.label, lang) + ": " : ""}${scene.items.map((item) =>
      `${item.count} × ${textFor(item.text, lang)}`,
    ).join("; ")}${scene.result ? "; " + textFor(scene.result, lang) : ""}`,
  ).join(". ")}.${visual.note ? " " + textFor(visual.note, lang) + "." : ""}`;
}

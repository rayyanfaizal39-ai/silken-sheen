import type { LocalizedText, MathVisualLang, VisualText } from "./mathQuestionVisual";
import { textFor } from "./mathQuestionVisual";

/**
 * Chapter 5 diagrams carry original terms only, with no simplified answer.
 * Jars show unknown quantities and any specified loose sweets.
 * Tiles show uncombined signed groups, preserving the original term boundaries.
 */
export type MathAlgebraVisual =
  | {
      kind: "algebra-jars";
      title: LocalizedText;
      jars: 1 | 3;
      perJar: string;
      loose?: { count: number; operation: "add" | "subtract" };
    }
  | {
      kind: "algebra-tiles";
      title: LocalizedText;
      groups: {
        symbol: string;
        count: number;
        operation: "start" | "add" | "subtract" | "compare";
        label?: VisualText;
      }[];
    };

export function describeMathAlgebraVisual(visual: MathAlgebraVisual, lang: MathVisualLang): string {
  const bm = lang === "bm";
  const head = visual.title[lang];
  if (visual.kind === "algebra-jars") {
    const jars = `${visual.jars} ${bm ? "balang" : visual.jars === 1 ? "jar" : "jars"}`;
    const each = bm ? `setiap satu mengandungi ${visual.perJar} gula-gula`
      : `each containing ${visual.perJar} sweets`;
    const loose = visual.loose
      ? `. ${visual.loose.operation === "add" ? (bm ? "Tambah" : "Add") : (bm ? "Tolak" : "Remove")} ${visual.loose.count} ${bm ? "gula-gula" : "sweets"}`
      : "";
    return `${head}. ${jars}, ${each}${loose}.`;
  }
  const words = visual.groups.map((group) => {
    const operator = group.operation === "subtract" ? (bm ? "tolak" : "subtract")
      : group.operation === "compare" ? (bm ? "bandingkan dengan" : "compare with")
      : group.operation === "add" ? (bm ? "tambah" : "add") : "";
    return [operator, group.label ? textFor(group.label, lang) : "",
      `${group.count} × ${group.symbol}`].filter(Boolean).join(" ");
  });
  return `${head}. ${words.join("; ")}.`;
}

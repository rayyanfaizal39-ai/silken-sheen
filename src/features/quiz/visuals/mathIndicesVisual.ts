import type {
  LocalizedText,
  MathVisualLang,
  VisualText,
} from "./mathQuestionVisual";
import { textFor } from "./mathQuestionVisual";

/** Only the givens are stored here. Solutions belong in post-answer explanations. */
export type MathIndicesVisual =
  | {
      kind: "index-notation";
      title: LocalizedText;
      base: string;
      exponent: string;
    }
  | {
      kind: "factor-groups";
      title: LocalizedText;
      rows: {
        label?: VisualText;
        operation: "product" | "quotient";
        groups: string[][];
      }[];
    }
  | {
      kind: "index-equations";
      title: LocalizedText;
      rows: { label?: VisualText; left: string; right: string }[];
    }
  | {
      kind: "unit-cube";
      title: LocalizedText;
      divisions: number;
      volume: number;
      edge: string;
    }
  | {
      kind: "fraction-area";
      title: LocalizedText;
      divisions: number;
      shadedRows: number;
      shadedColumns: number;
      side: string;
    };

export function describeMathIndicesVisual(
  visual: MathIndicesVisual,
  lang: MathVisualLang,
): string {
  const head = visual.title[lang];
  switch (visual.kind) {
    case "index-notation":
      // Do not name the base/index: that is what the identification questions ask.
      return `${head}: ${visual.base}^(${visual.exponent}).`;
    case "factor-groups":
      return `${head}. ${visual.rows
        .map(
          (row) =>
            `${row.label ? `${textFor(row.label, lang)}: ` : ""}${row.groups
              .map((group) => `(${group.join(" × ")})`)
              .join(row.operation === "quotient" ? " ÷ " : " × ")}`,
        )
        .join("; ")}.`;
    case "index-equations":
      return `${head}. ${visual.rows
        .map(
          (row) =>
            `${row.label ? `${textFor(row.label, lang)}: ` : ""}${row.left} = ${row.right}`,
        )
        .join("; ")}.`;
    case "unit-cube":
      return lang === "bm"
        ? `${head}. Kubus terdiri daripada ${visual.volume} kubus unit. Panjang sisi dilabel ${visual.edge}.`
        : `${head}. A cube contains ${visual.volume} unit cubes. Edge length is labelled ${visual.edge}.`;
    case "fraction-area":
      return lang === "bm"
        ? `${head}. Segi empat sama unit dibahagi kepada ${visual.divisions} baris dan ${visual.divisions} lajur. ${visual.shadedRows} baris dan ${visual.shadedColumns} lajur bertindih di kawasan berlorek. Setiap sisi kawasan berlorek ialah ${visual.side} unit.`
        : `${head}. A unit square is divided into ${visual.divisions} rows and ${visual.divisions} columns. ${visual.shadedRows} rows and ${visual.shadedColumns} columns overlap in the shaded area. Each side of the shaded area is ${visual.side} unit.`;
  }
}

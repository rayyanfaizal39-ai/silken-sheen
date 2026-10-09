import {
  textFor,
  type LocalizedText,
  type MathVisualLang,
  type VisualText,
} from "./mathQuestionVisual";

/** Input data only: neither a solution nor highlighted significant digits. */
export type MathStandardFormVisual =
  | {
      kind: "place-value";
      title: LocalizedText;
      value: string;
      task?: LocalizedText;
    }
  | {
      kind: "standard-form-parts";
      title: LocalizedText;
      coefficient: string;
      exponent: string;
    }
  | {
      kind: "standard-form-operation";
      title: LocalizedText;
      terms: [
        { coefficient: string; exponent: string },
        { coefficient: string; exponent: string },
      ];
      operation: "+" | "−" | "×" | "÷";
    }
  | {
      kind: "right-triangle";
      title: LocalizedText;
      pq: string;
      qr: string;
      pr?: string;
    }
  | {
      kind: "measurement-model";
      title: LocalizedText;
      shape: "rectangle" | "cuboid" | "sphere" | "paper-stack";
      /** Width / height for a rectangular sheet or tile. */
      aspect?: number;
      dimensions: { symbol: string; label: LocalizedText; value: string }[];
      givens?: VisualText[];
      task: LocalizedText;
    }
  | {
      kind: "distance-comparison";
      title: LocalizedText;
      entries: { planet: LocalizedText; distance: string; value: number }[];
    }
  | {
      kind: "storage-capacity";
      title: LocalizedText;
      total: string;
      perDrive: string;
      conversion: string;
    };

/** Each digit's place; decimal points remain separators, never digits to count. */
export function placeValueCells(
  value: string,
): { digit: string; exponent?: number }[] {
  const compact = value.replace(/\s/g, "");
  const decimal = compact.indexOf(".");
  const integerLength = decimal < 0 ? compact.length : decimal;
  return [...compact].map((digit, index) => ({
    digit,
    exponent:
      digit === "."
        ? undefined
        : integerLength - index - (index > decimal && decimal >= 0 ? 0 : 1),
  }));
}

export function describeMathStandardFormVisual(
  visual: MathStandardFormVisual,
  lang: MathVisualLang,
): string {
  const bm = lang === "bm";
  const head = visual.title[lang];
  const term = (item: { coefficient: string; exponent: string }) =>
    `${item.coefficient} × 10^(${item.exponent})`;
  switch (visual.kind) {
    case "place-value":
      return `${head}: ${visual.value}. ${bm ? "Nilai tempat setiap digit" : "Each digit's place value"}: ${placeValueCells(
        visual.value,
      )
        .filter((cell) => cell.exponent !== undefined)
        .map(
          (cell) => `${cell.digit} ${bm ? "pada" : "at"} 10^(${cell.exponent})`,
        )
        .join("; ")}. ${visual.task?.[lang] ?? ""}`;
    case "standard-form-parts":
      return `${head}: ${term(visual)}.`;
    case "standard-form-operation":
      return `${head}: ${term(visual.terms[0])} ${visual.operation} ${term(visual.terms[1])} = ?.`;
    case "right-triangle":
      return `${head}. ${bm ? "Sudut tegak di Q" : "Right angle at Q"}. PQ = ${visual.pq}; QR = ${visual.qr}${visual.pr ? `; PR = ${visual.pr}` : ""}.`;
    case "measurement-model":
      return `${head}. ${visual.dimensions.map((d) => `${d.label[lang]} (${d.symbol}) = ${d.value}`).join("; ")}. ${visual.givens?.map((text) => textFor(text, lang)).join("; ") ?? ""}. ${visual.task[lang]}. ${bm ? "Rajah tidak mengikut skala" : "Diagram not to scale"}.`;
    case "distance-comparison":
      return `${head}. ${bm ? "Jarak dari Matahari" : "Distance from the Sun"}: ${visual.entries.map((e) => `${e.planet[lang]} = ${e.distance}`).join("; ")}.`;
    case "storage-capacity":
      return `${head}. ${bm ? "Jumlah data" : "Total data"} = ${visual.total}; ${bm ? "kapasiti setiap pemacu" : "capacity per drive"} = ${visual.perDrive}; ${visual.conversion}. ${bm ? "Bilangan pemacu" : "Number of drives"} = ?.`;
  }
}

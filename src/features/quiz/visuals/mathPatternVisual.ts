import type { LocalizedText, MathVisualLang, VisualText } from "./mathQuestionVisual";

/**
 * Declarative pattern and sequence displays (Form 2 Chapter 1).
 *
 * Every number a learner reads off one of these visuals is either given in
 * the data or computed here (Pascal values, dot counts, stick counts), so a
 * diagram can never disagree with its own mathematics. Blank cells are data
 * (`null` or a `hidden` entry) and are never described with their value.
 */
export type MathPatternVisual =
  | {
      /** Stage n drawn as dots: triangle n(n+1)/2, square n², pairs 2n. */
      kind: "dot-pattern";
      title: LocalizedText;
      shape: "triangle" | "square" | "pairs";
      stages: number[];
      /** A stage drawn as a "?" box instead of its dots. */
      missingStage?: number;
      /** Square shape only: colour each L-shaped layer (1, 3, 5, … dots). */
      layers?: boolean;
      /** Print the dot count under each drawn stage (default true). */
      showCounts?: boolean;
    }
  | {
      /** Rows 1..rows of Pascal's Triangle; row 1 is the single 1 at the top. */
      kind: "pascal-triangle";
      title: LocalizedText;
      rows: number;
      /** 1-based row and position; drawn as `label` (e.g. "P") or "?". */
      hidden?: { row: number; position: number; label?: string }[];
      highlight?: { row: number; position: number }[];
      labelRows?: boolean;
    }
  | {
      /** Terms of a Fibonacci-type sequence; `null` terms are blanks. */
      kind: "fibonacci-chain";
      title: LocalizedText;
      terms: (number | null)[];
      /** Draw "a + b" links from each known pair to the next term. */
      showSums?: boolean;
    }
  | {
      /** Terms in order with optional step labels between neighbours. */
      kind: "sequence-steps";
      title: LocalizedText;
      terms: (number | string | null)[];
      /** One label per gap (terms.length − 1), e.g. "+5", "×2"; null = no label. */
      steps?: (string | null)[];
      /** Label the terms T₁, T₂, … */
      showPositions?: boolean;
      /** 0-based indexes drawn emphasised (e.g. the answer on the back). */
      highlight?: number[];
      /** Continue with "…" after the last term (default true). */
      continues?: boolean;
    }
  | {
      /** A horizontal table: first row is the heading row; `null` = blank cell. */
      kind: "term-table";
      title: LocalizedText;
      rows: { label: VisualText; cells: (VisualText | null)[] }[];
    }
  | {
      /** Real-life objects per stage or row, drawn one glyph per object. */
      kind: "object-stages";
      title: LocalizedText;
      object: "chair" | "tile" | "block" | "can";
      stages: { label: VisualText; count: number }[];
      /** Draw a final "?" stage after the given ones. */
      missingLabel?: VisualText;
    }
  | {
      /** k squares in a row made of matchsticks or rods: 3k + 1 sticks. */
      kind: "matchstick-squares";
      title: LocalizedText;
      stages: number[];
      showCounts?: boolean;
      /** "rod" draws plain wooden rods (fences, frames); default matchsticks. */
      material?: "matchstick" | "rod";
    };

export type MathPatternVisualKind = MathPatternVisual["kind"];

export const MATH_PATTERN_VISUAL_KINDS = [
  "dot-pattern",
  "pascal-triangle",
  "fibonacci-chain",
  "sequence-steps",
  "term-table",
  "object-stages",
  "matchstick-squares",
] as const satisfies readonly MathPatternVisualKind[];

export function isMathPatternVisual(visual: { kind: string }): visual is MathPatternVisual {
  return (MATH_PATTERN_VISUAL_KINDS as readonly string[]).includes(visual.kind);
}

export const MATH_PATTERN_KIND_NAMES: Record<MathPatternVisualKind, LocalizedText> = {
  "dot-pattern": { bm: "Corak titik", dlp: "Dot pattern" },
  "pascal-triangle": { bm: "Segi Tiga Pascal", dlp: "Pascal's Triangle" },
  "fibonacci-chain": { bm: "Jujukan jenis Fibonacci", dlp: "Fibonacci-type sequence" },
  "sequence-steps": { bm: "Jujukan", dlp: "Sequence" },
  "term-table": { bm: "Jadual", dlp: "Table" },
  "object-stages": { bm: "Susunan objek", dlp: "Object arrangement" },
  "matchstick-squares": { bm: "Segi empat batang mancis", dlp: "Matchstick squares" },
};

/** Dots in stage n of a dot pattern. */
export function dotCount(shape: "triangle" | "square" | "pairs", stage: number) {
  if (shape === "triangle") return (stage * (stage + 1)) / 2;
  if (shape === "square") return stage * stage;
  return 2 * stage;
}

/** Value at a 1-based row and position of Pascal's Triangle (row 1 = "1"). */
export function pascalValue(row: number, position: number) {
  const n = row - 1;
  const k = position - 1;
  if (k < 0 || k > n) return 0;
  let value = 1;
  for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i;
  return Math.round(value);
}

export function pascalRow(row: number) {
  return Array.from({ length: row }, (_, index) => pascalValue(row, index + 1));
}

export function matchstickCount(squares: number) {
  return 3 * squares + 1;
}

/** Shared by the renderer and the screen-reader text so both say the same thing. */
export function matchstickWords(material: "matchstick" | "rod", lang: MathVisualLang) {
  const bm = lang === "bm";
  return material === "rod"
    ? {
        shape: bm ? "bingkai" : "frame",
        shapes: bm ? "bingkai" : "frames",
        sticks: bm ? "batang kayu" : "rods",
      }
    : {
        shape: bm ? "segi empat" : "square",
        shapes: bm ? "segi empat" : "squares",
        sticks: bm ? "batang mancis" : "sticks",
      };
}

/** Proper minus sign for negative numbers; decimals keep their digits. */
export function formatPatternNumber(value: number | string) {
  if (typeof value === "string") return value;
  return value < 0 ? `−${Math.abs(value)}` : String(value);
}

const SUBSCRIPTS = "₀₁₂₃₄₅₆₇₈₉";
export function termLabel(position: number) {
  return `T${String(position)
    .split("")
    .map((digit) => SUBSCRIPTS[Number(digit)])
    .join("")}`;
}

const textOf = (text: VisualText, lang: MathVisualLang) =>
  typeof text === "string" ? text : text[lang];

/**
 * Screen-reader text: the visual's type, title and every given value. Blanks
 * are announced as blanks; hidden values are never spoken.
 */
export function describeMathPatternVisual(visual: MathPatternVisual, lang: MathVisualLang) {
  const bm = lang === "bm";
  const head = `${MATH_PATTERN_KIND_NAMES[visual.kind][lang]}: ${visual.title[lang]}.`;
  const blank = bm ? "kosong" : "blank";
  switch (visual.kind) {
    case "dot-pattern": {
      const stages = visual.stages.map((stage) => {
        const label = `${bm ? "Peringkat" : "Stage"} ${stage}`;
        if (stage === visual.missingStage) return `${label}: ?`;
        return visual.showCounts === false
          ? label
          : `${label}: ${dotCount(visual.shape, stage)} ${bm ? "titik" : dotCount(visual.shape, stage) === 1 ? "dot" : "dots"}`;
      });
      return `${head} ${stages.join("; ")}.`;
    }
    case "pascal-triangle": {
      const rows = Array.from({ length: visual.rows }, (_, index) => {
        const row = index + 1;
        const values = pascalRow(row).map((value, position) => {
          const hidden = visual.hidden?.find(
            (cell) => cell.row === row && cell.position === position + 1,
          );
          return hidden ? (hidden.label ?? "?") : String(value);
        });
        return `${bm ? "Baris" : "Row"} ${row}: ${values.join(", ")}`;
      });
      return `${head} ${rows.join("; ")}.`;
    }
    case "fibonacci-chain":
      return `${head} ${visual.terms
        .map((term) => (term === null ? blank : formatPatternNumber(term)))
        .join(", ")}, …`;
    case "sequence-steps": {
      const terms = visual.terms.map((term, index) => {
        const value = term === null ? blank : formatPatternNumber(term);
        return visual.showPositions ? `${termLabel(index + 1)} = ${value}` : value;
      });
      const steps = visual.steps?.some(Boolean)
        ? ` ${bm ? "Perubahan" : "Steps"}: ${visual.steps.map((step) => step ?? "?").join(", ")}.`
        : "";
      return `${head} ${terms.join(", ")}${visual.continues === false ? "." : ", …"}${steps}`;
    }
    case "term-table":
      return `${head} ${visual.rows
        .map(
          (row) =>
            `${textOf(row.label, lang)}: ${row.cells
              .map((cell) => (cell === null ? blank : textOf(cell, lang)))
              .join(", ")}`,
        )
        .join("; ")}.`;
    case "object-stages": {
      const names: Record<typeof visual.object, LocalizedText> = {
        chair: { bm: "kerusi", dlp: "chairs" },
        tile: { bm: "jubin", dlp: "tiles" },
        block: { bm: "blok", dlp: "blocks" },
        can: { bm: "tin", dlp: "cans" },
      };
      const stages = visual.stages.map(
        (stage) => `${textOf(stage.label, lang)}: ${stage.count} ${names[visual.object][lang]}`,
      );
      if (visual.missingLabel) stages.push(`${textOf(visual.missingLabel, lang)}: ?`);
      return `${head} ${stages.join("; ")}.`;
    }
    case "matchstick-squares": {
      const words = matchstickWords(visual.material ?? "matchstick", lang);
      return `${head} ${visual.stages
        .map((squares) => {
          const label = `${squares} ${squares === 1 ? words.shape : words.shapes}`;
          return visual.showCounts === false
            ? label
            : `${label}: ${matchstickCount(squares)} ${words.sticks}`;
        })
        .join("; ")}.`;
    }
  }
}

/**
 * Structural problems that would make a visual unreadable or mathematically
 * inconsistent. Content tests require every pattern visual to return [].
 */
export function validateMathPatternVisual(visual: MathPatternVisual): string[] {
  const issues: string[] = [];
  const positive = (value: number) => Number.isInteger(value) && value >= 1;
  switch (visual.kind) {
    case "dot-pattern":
      if (visual.stages.length === 0 || visual.stages.length > 5) issues.push("1–5 stages");
      if (!visual.stages.every(positive)) issues.push("stages must be positive integers");
      if (visual.stages.some((stage) => dotCount(visual.shape, stage) > 28))
        issues.push("too many dots to read");
      if (visual.missingStage !== undefined && !visual.stages.includes(visual.missingStage))
        issues.push("missing stage must be one of the stages");
      if (visual.layers && visual.shape !== "square") issues.push("layers need the square shape");
      break;
    case "pascal-triangle":
      if (!positive(visual.rows) || visual.rows > 8) issues.push("1–8 rows");
      for (const cell of [...(visual.hidden ?? []), ...(visual.highlight ?? [])]) {
        if (cell.row < 1 || cell.row > visual.rows || cell.position < 1 || cell.position > cell.row)
          issues.push(`cell ${cell.row}:${cell.position} is outside the triangle`);
      }
      break;
    case "fibonacci-chain": {
      const { terms } = visual;
      if (terms.length < 3 || terms.length > 10) issues.push("3–10 terms");
      if (terms[0] === null || terms[1] === null) issues.push("first two terms must be given");
      // Known terms must agree with the rule once every blank is filled.
      const filled = [...terms] as (number | null)[];
      for (let index = 2; index < filled.length; index += 1) {
        const expected = (filled[index - 1] ?? NaN) + (filled[index - 2] ?? NaN);
        if (filled[index] === null) filled[index] = expected;
        else if (filled[index] !== expected) issues.push(`term ${index + 1} breaks the rule`);
      }
      break;
    }
    case "sequence-steps":
      if (visual.terms.length < 2 || visual.terms.length > 8) issues.push("2–8 terms");
      if (visual.steps && visual.steps.length !== visual.terms.length - 1)
        issues.push("one step label per gap");
      if (visual.highlight?.some((index) => index < 0 || index >= visual.terms.length))
        issues.push("highlight outside the terms");
      break;
    case "term-table": {
      const width = visual.rows[0]?.cells.length ?? 0;
      if (visual.rows.length < 2) issues.push("a heading row and at least one data row");
      if (width < 2 || width > 7) issues.push("2–7 columns");
      if (visual.rows.some((row) => row.cells.length !== width)) issues.push("ragged rows");
      if (visual.rows[0]?.cells.some((cell) => cell === null)) issues.push("blank heading");
      break;
    }
    case "object-stages":
      if (visual.stages.length === 0 || visual.stages.length > 4) issues.push("1–4 stages");
      if (!visual.stages.every((stage) => positive(stage.count) && stage.count <= 24))
        issues.push("1–24 objects per stage");
      break;
    case "matchstick-squares":
      if (visual.stages.length === 0 || visual.stages.length > 4) issues.push("1–4 stages");
      if (!visual.stages.every((stage) => positive(stage) && stage <= 5))
        issues.push("1–5 squares");
      break;
  }
  return issues;
}

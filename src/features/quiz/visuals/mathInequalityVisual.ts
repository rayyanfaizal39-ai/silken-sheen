import type { LocalizedText, MathVisualLang } from "./mathQuestionVisual";

/**
 * Form 1 linear-inequality diagrams. Every drawn interval represents a
 * condition already explicitly given in the question, NOT the solved
 * intersection of multiple conditions. Choice diagrams show ALL four options
 * unselected. Reference axes intentionally omit arrows/endpoints so that
 * word-to-inequality questions cannot give away inclusivity or direction.
 */
export type MathInequalityVisual =
  | {
      kind: "inequality-reference-axis";
      title: LocalizedText;
      min: number;
      max: number;
      step: number;
      markers: number[];
    }
  | {
      kind: "inequality-tracks";
      title: LocalizedText;
      min: number;
      max: number;
      step: number;
      tracks: {
        label: string;
        lower?: number;
        upper?: number;
        includeLower?: boolean;
        includeUpper?: boolean;
      }[];
    }
  | {
      kind: "inequality-options";
      title: LocalizedText;
      min: number;
      max: number;
      step: number;
      boundary: number;
      options: { direction: "left" | "right"; inclusive: boolean }[];
    };

export function describeMathInequalityVisual(visual: MathInequalityVisual, lang: MathVisualLang) {
  const bm = lang === "bm";
  const head = visual.title[lang];
  const boundary = (at: number, inclusive: boolean) =>
    `${at} (${inclusive ? (bm ? "bulatan penuh" : "closed circle") : (bm ? "bulatan kosong" : "open circle")})`;
  if (visual.kind === "inequality-reference-axis") {
    return `${head}. ${bm ? "Garis nombor dengan tanda rujukan tanpa anak panah atau titik hujung" : "Number line with reference marks, no arrows or endpoints"}: ${visual.markers.join(", ")}.`;
  }
  if (visual.kind === "inequality-options") {
    return `${head}. ${visual.options.map((option, i) =>
      `${String.fromCharCode(65 + i)}: ${boundary(visual.boundary, option.inclusive)}, ${option.direction === "left" ? (bm ? "anak panah ke kiri" : "arrow left") : (bm ? "anak panah ke kanan" : "arrow right")}`,
    ).join("; ")}. ${bm ? "Tiada jawapan dipilih" : "No option selected"}.`;
  }
  return `${head}. ${visual.tracks.map((track) =>
    `${track.label}: ${[
      track.lower === undefined ? "" : `${bm ? "batas bawah" : "lower bound"} ${boundary(track.lower, Boolean(track.includeLower))}`,
      track.upper === undefined ? "" : `${bm ? "batas atas" : "upper bound"} ${boundary(track.upper, Boolean(track.includeUpper))}`,
    ].filter(Boolean).join("; ")}`,
  ).join(". ")}. ${bm ? "Setiap syarat dilukis berasingan, tanpa mengira persilangan" : "Each given condition is plotted separately, without computing the intersection"}.`;
}

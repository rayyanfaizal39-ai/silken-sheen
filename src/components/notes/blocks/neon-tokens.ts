// Shared design tokens for the Geography Form 1 "signature visuals" chapters (Bab 9-13).
// Values are lifted verbatim from design-reference/geo-signature-visuals-ch9.html..ch13.html
// so components render flat opaque panels + saturated glow accents instead of the app's
// generic translucent primary/accent theme tokens.

/** Flat opaque panel/card backgrounds — NOT Tailwind alpha-blended tokens. */
export const bgPanel = "#0c1128";
export const bgCard = "#111632";

/** Saturated accent hue palette used across the ch9-13 mockups. */
export const neon = {
  violet: "#8b6bff",
  blue: "#4fb0ff",
  amber: "#fbbf5a",
  green: "#4ade80",
  red: "#f87171",
  orange: "#fb923c",
  pink: "#f472b6",
  grey: "#94a3b8",
} as const;

export type NeonColor = keyof typeof neon;

/** Card / group-level ambient glow — 0 0 20-24px rgba(color, 0.15), value varies per mockup use site. */
export function groupGlow(hex: string, blurPx: number = 24, opacity: number = 0.15): string {
  return `0 0 ${blurPx}px ${hexToRgba(hex, opacity)}`;
}

/** Chip / node-level tighter glow — 0 0 10-16px rgba(color, 0.3-0.5), value varies per mockup use site. */
export function chipGlow(hex: string, blurPx: number = 10, opacity: number = 0.35): string {
  return `0 0 ${blurPx}px ${hexToRgba(hex, opacity)}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Two-stop gradient pairs for river-length bars — geo-signature-visuals-ch10.html */
export const riverGradients: Record<string, { from: string; to: string; glow: string }> = {
  "Sungai Mekong": { from: "#4fb0ff", to: "#1d4ed8", glow: neon.blue },
  "Sungai Irrawaddy": { from: "#4ade80", to: "#15803d", glow: neon.green },
  "Menam Chao Phraya": { from: "#fbbf5a", to: "#c2760c", glow: neon.amber },
};

/** Two-stop vertical (180deg) gradient pairs for the top-7 population bars — geo-signature-visuals-ch11.html */
export const populationGradients: Record<string, { from: string; to: string; glow: string }> = {
  Indonesia: { from: "#f87171", to: "#7f1d1d", glow: neon.red },
  Filipina: { from: "#fb923c", to: "#9a3412", glow: neon.orange },
  Vietnam: { from: "#fbbf5a", to: "#92400e", glow: neon.amber },
  Thailand: { from: "#4ade80", to: "#166534", glow: neon.green },
  Myanmar: { from: "#4fb0ff", to: "#1e40af", glow: neon.blue },
  Malaysia: { from: "#8b6bff", to: "#4c1d95", glow: neon.violet },
  Kemboja: { from: "#f472b6", to: "#831843", glow: neon.pink },
};

/** Flat grey gradient for the bottom (non-top-7) population bars — no glow. */
export const populationGreyGradient = { from: "#94a3b8", to: "#334155" };

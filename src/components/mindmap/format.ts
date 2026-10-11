// Display formatting for mind map titles. Presentation only: the content
// files keep their textbook numbering, and node ids are never touched.

/**
 * A leading textbook section number such as "8.1", "3.2.1" or "10.3.",
 * then whitespace or a ":" / dash separator. The first part is 1–99 without
 * a leading zero and later parts have one or two digits, so decimals like
 * "0.008025" or "3.025" never match, and single-level step numbers such as
 * "1. Sambung dua titik" are left alone.
 */
const SECTION_PREFIX = /^\s*[1-9]\d?(?:\.\d{1,2}){1,3}\.?(?:\s*[:\-–—]\s*|\s+)/u;

/**
 * Measurement units, matched in their exact conventional case. A section
 * title starts with a capital, so "12.1 Min" (Malay for "mean") stays a
 * title while "2.5 cm" or "101 Pa" read as values.
 */
const UNIT_SYMBOLS = new Set([
  "mm",
  "cm",
  "dm",
  "m",
  "km",
  "mg",
  "g",
  "kg",
  "ml",
  "mL",
  "l",
  "L",
  "s",
  "ms",
  "min",
  "h",
  "Hz",
  "kHz",
  "MHz",
  "N",
  "kN",
  "J",
  "kJ",
  "MJ",
  "W",
  "kW",
  "MW",
  "V",
  "kV",
  "A",
  "mA",
  "Pa",
  "kPa",
  "MPa",
  "K",
  "mol",
  "cal",
  "kcal",
  "dB",
  "ha",
  "KB",
  "MB",
  "GB",
  "TB",
  "x",
  "×",
]);

/** Quantity words that make a leading decimal a value in any case ("1.2 Juta"). */
const QUANTITY_WORDS = new Set([
  "juta",
  "bilion",
  "billion",
  "million",
  "ribu",
  "thousand",
  "trillion",
  "trilion",
  "peratus",
  "percent",
  "kali",
  "times",
]);

/**
 * Removes a leading textbook section number from a mind map title:
 * "8.1 Force" → "Force", "5.1 Pengasasan Kesultanan Melayu Melaka" →
 * "Pengasasan Kesultanan Melayu Melaka". Anything that might be a value —
 * "2.5 cm", "3.14", "10.5%", "1.5 × 10³", "1. Langkah", years — is kept.
 * When in doubt the title is returned unchanged.
 */
export function formatMindMapTitle(title: string): string {
  if (typeof title !== "string") return title;
  const match = SECTION_PREFIX.exec(title);
  if (!match) return title;
  const rest = title.slice(match[0].length).trim();
  const firstWord = rest.split(/\s+/u)[0] ?? "";
  const bare = firstWord.replace(/[^\p{L}\p{N}°×]/gu, "");
  // A section title starts with a capitalised word of two or more letters.
  if (!/^\p{Lu}/u.test(rest)) return title;
  if (bare.length < 2) return title;
  if (UNIT_SYMBOLS.has(bare) || QUANTITY_WORDS.has(bare.toLowerCase())) return title;
  return rest;
}

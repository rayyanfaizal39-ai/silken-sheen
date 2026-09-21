// ─── Malaysian school name display formatting ────────────────────────────────
//
// PRESENTATION ONLY. The verified directory (public.schools) stores every
// school_name in canonical ALL-CAPS form, e.g.
//   "SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING"
// That canonical value is what the leaderboard RPC returns and what the
// profile/onboarding flow writes — it is never rewritten by this module.
// This formatter only shortens the generic prefix and applies title case so a
// 41-character shouted name fits a secondary line without truncating away the
// part that actually identifies the school.

/**
 * Generic school-type prefixes → their standard Malaysian abbreviation.
 * Matched longest-first so "SEKOLAH MENENGAH JENIS KEBANGSAAN" can never be
 * shadowed by the shorter "SEKOLAH MENENGAH KEBANGSAAN".
 */
const PREFIX_ABBREVIATIONS: ReadonlyArray<readonly [string, string]> = [
  ["SEKOLAH JENIS KEBANGSAAN (CINA)", "SJK(C)"],
  ["SEKOLAH JENIS KEBANGSAAN (TAMIL)", "SJK(T)"],
  ["SEKOLAH MENENGAH JENIS KEBANGSAAN", "SMJK"],
  ["SEKOLAH MENENGAH KEBANGSAAN", "SMK"],
  ["SEKOLAH KEBANGSAAN", "SK"],
];

const PREFIXES_LONGEST_FIRST = [...PREFIX_ABBREVIATIONS].sort(
  (a, b) => b[0].length - a[0].length,
);

/** Roman numerals stay upper-case ("SMK SERI KEMBANGAN II" → "… II", not "Ii"). */
const ROMAN_NUMERAL = /^(?:I{1,3}|IV|V|VI{1,3}|IX|X{1,3})$/;

/** Malay connectors read better lower-case when they are not the first word. */
const LOWERCASE_CONNECTORS = new Set(["dan", "di", "ke", "dari", "pada", "untuk"]);

/** Capitalises one word, preserving internal apostrophes and hyphens. */
function capitalizeWord(word: string): string {
  return word
    .split("-")
    .map((hyphenPart) =>
      hyphenPart
        .split("'")
        .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part))
        .join("'"),
    )
    .join("-");
}

/**
 * Sensible title case for a canonical ALL-CAPS school name. Roman numerals are
 * preserved, Malay connectors are lower-cased unless they lead, and bracketed
 * qualifiers such as "(CINA)" keep their brackets.
 */
export function toSchoolTitleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const bare = word.replace(/[()]/g, "");
      if (ROMAN_NUMERAL.test(bare)) return word.toUpperCase();

      const lower = word.toLowerCase();
      if (index > 0 && LOWERCASE_CONNECTORS.has(lower)) return lower;

      // Keep brackets attached while capitalising the text inside them.
      return word.replace(/[^()]+/g, (segment) => capitalizeWord(segment));
    })
    .join(" ");
}

/**
 * Formats a canonical verified school name for display.
 *
 * "SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING" → "SMK Kota Kemuning"
 * "SEKOLAH KEBANGSAAN TAMAN MELAWATI"         → "SK Taman Melawati"
 *
 * Returns `null` for a missing or blank name so callers can omit the school
 * line entirely rather than rendering a placeholder.
 */
export function formatSchoolName(rawName: string | null | undefined): string | null {
  if (!rawName) return null;

  const normalized = rawName.replace(/\s+/g, " ").trim();
  if (!normalized) return null;

  const upper = normalized.toUpperCase();

  for (const [prefix, abbreviation] of PREFIXES_LONGEST_FIRST) {
    if (upper === prefix) return abbreviation;
    if (upper.startsWith(`${prefix} `)) {
      const remainder = normalized.slice(prefix.length).trim();
      return remainder ? `${abbreviation} ${toSchoolTitleCase(remainder)}` : abbreviation;
    }
  }

  // Unknown school type (e.g. "KOLEJ VOKASIONAL …", "SEKOLAH MENENGAH SAINS …")
  // — keep the full name, just make it readable.
  return toSchoolTitleCase(normalized);
}

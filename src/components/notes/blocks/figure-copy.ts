/**
 * The chrome copy every Science instructional figure shares, in both languages.
 *
 * Single source of truth so a chapter never has to author "Enlarge" or
 * "Interactive" itself. Keeping it out of chapter content also means adding the
 * interaction affordance to a frozen chapter changes no academic data file.
 */

export type FigureLang = "bm" | "en";

export type FigureCopy = {
  /** Label on the enlarge affordance pinned to the artwork. */
  enlarge: string;
  /** Label on the lightbox close button. */
  close: string;
  /** The "this is interactive" badge. */
  badge: string;
  /** One line under the badge saying what to do. */
  instruction: string;
  /** Neutral prompt in the explanation panel before anything is picked. */
  prompt: string;
  /** Accessible name for the row of concept buttons. */
  controlsLabel: string;
  /**
   * Pole letters drawn on magnet figures. BM uses Utara/Selatan, DLP North/South,
   * so the south pole is "S" in both languages and only the north pole differs.
   */
  poleNorth: string;
  poleSouth: string;
  /** Spoken pole names, for the accessible label on each drawn letter. */
  poleNorthName: string;
  poleSouthName: string;
};

const COPY: Record<FigureLang, FigureCopy> = {
  bm: {
    enlarge: "Besarkan",
    close: "Tutup",
    badge: "Interaktif",
    instruction: "Tekan konsep untuk meneroka.",
    prompt: "Tekan konsep di atas untuk melihat penerangannya.",
    controlsLabel: "Konsep dalam rajah ini",
    poleNorth: "U",
    poleSouth: "S",
    poleNorthName: "Kutub utara",
    poleSouthName: "Kutub selatan",
  },
  en: {
    enlarge: "Enlarge",
    close: "Close",
    badge: "Interactive",
    instruction: "Tap a concept to explore.",
    prompt: "Tap a concept above to see what it does.",
    controlsLabel: "Concepts in this figure",
    poleNorth: "N",
    poleSouth: "S",
    poleNorthName: "North pole",
    poleSouthName: "South pole",
  },
};

/** Accepts any lang string a notes block carries; anything not BM reads as DLP. */
export function figureCopy(lang: string | undefined): FigureCopy {
  return COPY[lang === "bm" ? "bm" : "en"];
}

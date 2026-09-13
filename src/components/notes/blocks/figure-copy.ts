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
  /**
   * Names for the two things every current-and-field overlay draws, used in the
   * figure's colour key. They live here rather than in chapter content because
   * the same two words caption every such figure, in either language, and a
   * key that could drift between BM and DLP is a key that eventually does.
   */
  currentKey: string;
  fieldKey: string;
  /**
   * Spoken names for the field-direction symbols — a dot for a field coming out
   * of the page, a cross for one going into it. A screen reader must never be
   * left to read out a bare dot.
   */
  fieldOutOfPage: string;
  fieldIntoPage: string;
  /** Label above the km input on the A.U. / light-year converter. */
  /** Row-header label for the planet column in a comparison table. */
  planetColumn: string;
  distanceKm: string;
  /** Readout placeholder before a usable distance is entered. */
  enterDistance: string;
  /** Input placeholder showing an example distance. */
  distanceExample: string;
  /** Small badge marking specific numbers as a worked example, not a fixed measurement. */
  exampleBadge: string;
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
    currentKey: "Arus",
    fieldKey: "Medan magnet",
    fieldOutOfPage: "Medan magnet keluar dari halaman",
    fieldIntoPage: "Medan magnet masuk ke dalam halaman",
    planetColumn: "Planet",
    distanceKm: "Jarak (km)",
    enterDistance: "Masukkan jarak",
    distanceExample: "cth. 227900000",
    exampleBadge: "Contoh",
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
    currentKey: "Current",
    fieldKey: "Magnetic field",
    fieldOutOfPage: "Magnetic field out of the page",
    fieldIntoPage: "Magnetic field into the page",
    planetColumn: "Planet",
    distanceKm: "Distance (km)",
    enterDistance: "Enter a distance",
    distanceExample: "e.g. 227900000",
    exampleBadge: "Example",
  },
};

/** Accepts any lang string a notes block carries; anything not BM reads as DLP. */
export function figureCopy(lang: string | undefined): FigureCopy {
  return COPY[lang === "bm" ? "bm" : "en"];
}

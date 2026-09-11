/** KPM Science Form 1, printed pp.22–23, 35–37; public reproduction of the original book.
 * https://fliphtml5.com/ffzny/jcjo/SCIENCE_FORM_1_TEXT_BOOK_DLP_KSSM/
 * DLP terminology also checked against DSKP p.42:
 * https://studylib.net/doc/25321481/dskp-science-form-1
 * BM results corroborated in https://fliphtml5.com/ycfyp/pejx/1_Sains_Tingkatan_1Sains_Tingkatan_1-12-53/
 * Preserve the printed averages, including the textbook's rounding.
 */
export const pendulumReadings = [
  { length: 20, readings: [9.1, 9.2, 9.0], average: 9.1 },
  { length: 30, readings: [11.3, 11.4, 11.4], average: 11.4 },
  { length: 40, readings: [13.1, 13.0, 13.1], average: 13.1 },
  { length: 50, readings: [14.4, 14.3, 14.3], average: 14.3 },
  { length: 60, readings: [15.2, 15.1, 15.3], average: 15.2 },
] as const;
export const pendulumGraphData = pendulumReadings.map(
  ({ length, average }) => [length, average] as const,
);

export const instrumentWorkedExamples = {
  vernier: { main: 3.2, secondary: 0.02, total: 3.22, coincidentLine: 2, unit: "cm" },
  micrometer: { main: 3.5, secondary: 0.38, total: 3.88, unit: "mm" },
} as const;

export const reportHeadings = {
  en: [
    "Problem statement",
    "Hypothesis",
    "Aim",
    "Variables",
    "Materials and apparatus",
    "Procedure",
    "Observations / results",
    "Analysis and interpretation of data",
    "Conclusion",
  ],
  bm: [
    "Pernyataan masalah",
    "Hipotesis",
    "Tujuan",
    "Pemboleh ubah",
    "Bahan dan radas",
    "Prosedur",
    "Pemerhatian / keputusan",
    "Analisis dan tafsiran data",
    "Kesimpulan",
  ],
} as const;

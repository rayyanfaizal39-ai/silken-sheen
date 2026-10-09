import type { MathStandardFormVisual } from "@/features/quiz/visuals/mathStandardFormVisual";

const text = (bm: string, dlp: string) => ({ bm, dlp });
const digits = (
  value: string,
  task?: { bm: string; dlp: string },
): MathStandardFormVisual => ({
  kind: "place-value",
  title: text("Digit dan nilai tempat", "Digits and place values"),
  value,
  task,
});
const round = (value: string, count: number) =>
  digits(
    value,
    text(`Bundarkan kepada ${count} a.b.`, `Round to ${count} s.f.`),
  );
const convert = (value: string) =>
  digits(value, text("Bentuk piawai = ?", "Standard form = ?"));
const parts = (
  coefficient: string,
  exponent: string,
): MathStandardFormVisual => ({
  kind: "standard-form-parts",
  title: text("Ungkapan yang diberikan", "Given expression"),
  coefficient,
  exponent,
});
const operation = (
  a: string,
  m: string,
  op: "+" | "−" | "×" | "÷",
  b: string,
  n: string,
): MathStandardFormVisual => ({
  kind: "standard-form-operation",
  title: text("Operasi yang diberikan", "Given operation"),
  terms: [
    { coefficient: a, exponent: m },
    { coefficient: b, exponent: n },
  ],
  operation: op,
});
const triangleTitle = text("Segitiga PQR", "Triangle PQR");

/** Shared by BM/DLP, keyed by the original question number. All answers stay hidden. */
export const MATH_F3_C2_QUIZ_VISUALS: Partial<
  Record<number, MathStandardFormVisual>
> = {
  2: digits("2 763"),
  3: digits("60 007"),
  4: digits("0.007"),
  5: digits("0.005020"),
  6: round("63 479", 2),
  7: round("2 476", 2),
  8: parts("A", "n"),
  9: convert("280"),
  10: convert("2 805.3"),
  11: parts("4.17", "5"),
  12: convert("0.03025"),
  13: parts("8.063", "-5"),
  16: digits("50 007"),
  17: round("0.008025", 3),
  18: parts("9.5", "9"),
  19: digits("50.0042"),
  20: convert("35"),
  21: operation("2.73", "3", "+", "5.92", "3"),
  22: operation("7.02", "4", "+", "2.17", "5"),
  24: operation("3", "5", "×", "4.9", "2"),
  25: operation("5.9", "5", "÷", "2", "2"),
  27: operation("2.3", "-5", "−", "4.6", "-6"),
  30: digits(
    "38 279",
    text("Bundarkan kepada ratus terhampir", "Round to the nearest hundred"),
  ),
  31: digits(
    "38 279",
    text("Bundarkan kepada ribu terhampir", "Round to the nearest thousand"),
  ),
  34: {
    kind: "right-triangle",
    title: triangleTitle,
    pq: "?",
    qr: "2.1 × 10^2 m",
    pr: "3.5 × 10^2 m",
  },
  35: {
    kind: "right-triangle",
    title: triangleTitle,
    pq: "2.8 × 10^2 m",
    qr: "2.1 × 10^2 m",
  },
  37: {
    kind: "measurement-model",
    shape: "paper-stack",
    title: text("Susunan kertas", "Paper stack"),
    dimensions: [
      {
        symbol: "t",
        label: text("Ketebalan sehelai", "Thickness per sheet"),
        value: "9.4 × 10^(-3) cm",
      },
    ],
    givens: [text("800 helai kertas", "800 sheets of paper")],
    task: text("Jumlah ketebalan = ?", "Total thickness = ?"),
  },
  40: round("305.72", 3),
  41: {
    kind: "measurement-model",
    shape: "sphere",
    title: text("Model sfera Bumi", "Spherical model of Earth"),
    dimensions: [
      {
        symbol: "d",
        label: text("Diameter", "Diameter"),
        value: "1.2742 × 10^4 km",
      },
    ],
    givens: ["π = 3.142"],
    task: text("Luas permukaan = 4πj^2 = ?", "Surface area = 4πr^2 = ?"),
  },
  42: {
    kind: "distance-comparison",
    title: text("Bandingkan jarak", "Compare distances"),
    entries: [
      {
        planet: text("Utarid", "Mercury"),
        distance: "5.791 × 10^7 km",
        value: 5.791e7,
      },
      {
        planet: text("Bumi", "Earth"),
        distance: "1.496 × 10^8 km",
        value: 1.496e8,
      },
    ],
  },
  43: {
    kind: "distance-comparison",
    title: text("Bandingkan jarak", "Compare distances"),
    entries: [
      {
        planet: text("Utarid", "Mercury"),
        distance: "5.791 × 10^7 km",
        value: 5.791e7,
      },
      {
        planet: text("Neptun", "Neptune"),
        distance: "4.495 × 10^9 km",
        value: 4.495e9,
      },
    ],
  },
  44: {
    kind: "storage-capacity",
    title: text("Kapasiti storan", "Storage capacity"),
    total: "2 TB",
    perDrive: "32 GB",
    conversion: "1 TB = 1 000 GB",
  },
  45: {
    kind: "measurement-model",
    shape: "cuboid",
    title: text("Kolam berbentuk kuboid", "Cuboid pool"),
    dimensions: [
      { symbol: "a", label: text("Panjang", "Length"), value: "305 cm" },
      { symbol: "b", label: text("Lebar", "Width"), value: "183 cm" },
      { symbol: "h", label: text("Kedalaman", "Depth"), value: "56 cm" },
    ],
    givens: [text("1 liter = 1 000 cm^3", "1 litre = 1 000 cm^3")],
    task: text("Isi padu maksimum = ?", "Maximum volume = ?"),
  },
  47: {
    kind: "measurement-model",
    shape: "rectangle",
    aspect: 1,
    title: text("Sekeping jubin", "One tile"),
    dimensions: [
      { symbol: "a", label: text("Panjang", "Length"), value: "30 cm" },
      { symbol: "b", label: text("Lebar", "Width"), value: "30 cm" },
    ],
    givens: [text("6 185 jubin", "6 185 tiles")],
    task: text("Jumlah luas lantai = ?", "Total floor area = ?"),
  },
  51: operation("1.75", "2", "−", "4.2", "-1"),
  56: {
    kind: "measurement-model",
    shape: "rectangle",
    aspect: 210 / 297,
    title: text("Sehelai kertas A4", "One A4 sheet"),
    dimensions: [
      { symbol: "a", label: text("Panjang", "Length"), value: "297 mm" },
      { symbol: "b", label: text("Lebar", "Width"), value: "210 mm" },
    ],
    givens: ["70 GSM = 70 g/m^2"],
    task: text("Jisim sehelai = ?", "Mass per sheet = ?"),
  },
};

import type {
  LocalizedText,
  MathQuestionVisual,
  VisualText,
} from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Form 1 Chapter 4 — Ratios, Rates and Proportions.
 * All drawings repeat ONLY what the question supplies. They never simplify
 * the ratio, calculate the unknown share, price, distance, or percentage answer.
 * The exact same visual object is shared between BM and DLP questions.
 */
type RatioVisual = Extract<MathQuestionVisual, { kind: "ratio-bars" }>;
type ValuesVisual = Extract<MathQuestionVisual, { kind: "value-pairs" }>;
type PercentVisual = Extract<MathQuestionVisual, { kind: "percentage-strip" }>;
type RatioRow = RatioVisual["rows"][number];
type ValuesRow = ValuesVisual["rows"][number];
const title = (bm: string, dlp: string): LocalizedText => ({ bm, dlp });
const ratio = (bm: string, dlp: string, rows: RatioRow[], note?: VisualText): RatioVisual => ({
  kind: "ratio-bars", title: title(bm, dlp), rows, ...(note ? { note } : {}),
});
const pairs = (
  bm: string, dlp: string, headings: [VisualText, VisualText], rows: ValuesRow[],
): ValuesVisual => ({
  kind: "value-pairs", title: title(bm, dlp), headings, rows,
});
const percent = (
  shaded: number, shadedLabel: VisualText, otherLabel: VisualText, note: VisualText,
): PercentVisual => ({
  kind: "percentage-strip",
  title: title("10 bahagian sama mewakili 100%", "10 equal parts represent 100%"),
  shaded, shadedLabel, otherLabel, note,
});
const label = (bm: string, dlp: string): LocalizedText => ({ bm, dlp });
const unknown = "?";

export const MATH_F1_C4_QUIZ_VISUALS = {
  // Foundation
  equivalent2To3: ratio("Nisbah asal 2 : 3", "Original ratio 2 : 3", [
    { label: "A", parts: 2 }, { label: "B", parts: 3 },
  ]),
  simplify12To18: ratio("Bandingkan 12 dan 18 bahagian", "Compare 12 and 18 parts", [
    { label: "A", parts: 12 }, { label: "B", parts: 18 },
  ]),
  classBoysGirls: ratio("Murid Kelas 1A", "Class 1A pupils", [
    { label: label("Lelaki", "Boys"), parts: 12 },
    { label: label("Perempuan", "Girls"), parts: 15 },
  ]),
  carFuel60km5L: pairs("Jarak dan petrol", "Distance and fuel",
    [label("Jarak", "Distance"), label("Petrol", "Fuel")],
    [{ left: "60 km", right: "5 L" }, { left: "? km", right: "1 L" }],
  ),
  boysGirls3To5: ratio("Nisbah murid lelaki dan perempuan", "Ratio of boys to girls", [
    { label: label("Lelaki", "Boys"), parts: 3 },
    { label: label("Perempuan", "Girls"), parts: 5 },
  ]),
  flour3kgRm12: pairs("Kadar harga tepung", "Flour unit price",
    [label("Jisim", "Weight"), label("Harga", "Price")],
    [{ left: "3 kg", right: "RM12" }, { left: "1 kg", right: unknown }],
  ),

  // Practice
  simplify8_12_20: ratio("Tiga kuantiti dalam nisbah", "Three quantities in a ratio", [
    { label: "A", parts: 8 }, { label: "B", parts: 12 }, { label: "C", parts: 20 },
  ]),
  car180km3h: pairs("Perjalanan kereta", "Car journey",
    [label("Jarak", "Distance"), label("Masa", "Time")],
    [{ left: "180 km", right: "3 h" }, { left: "? km", right: "1 h" }],
  ),
  sugar4kg24Rm: pairs("Harga gula", "Sugar price",
    [label("Jisim", "Weight"), label("Harga", "Price")],
    [{ left: "4 kg", right: "RM24" }, { left: "7 kg", right: unknown }],
  ),
  fiveBooks35Rm: pairs("Harga buku", "Book price",
    [label("Buku", "Books"), label("Harga", "Price")],
    [{ left: "5", right: "RM35" }, { left: "12", right: unknown }],
  ),
  recipeFourToSix: pairs("Resipi: orang dan tepung", "Recipe: people and flour",
    [label("Orang", "People"), label("Tepung", "Flour")],
    [{ left: "4", right: "200 g" }, { left: "6", right: unknown }],
  ),
  boysGirlsTotal30: ratio("Bahagian murid", "Pupil shares", [
    { label: label("Lelaki", "Boys"), parts: 3 },
    { label: label("Perempuan", "Girls"), parts: 2 },
  ], label("Jumlah = 30 murid", "Total = 30 pupils")),
  mapScale5000: pairs("Skala: peta kepada sebenar", "Scale: map to actual",
    [label("Peta", "Map"), label("Sebenar", "Actual")],
    [{ left: "1 cm", right: "5,000 cm" }, { left: "4 cm", right: unknown }],
  ),
  map5cm25km: pairs("Perbandingan jarak peta", "Map distance comparison",
    [label("Peta", "Map"), label("Sebenar", "Actual")],
    [{ left: "5 cm", right: "25 km" }, { left: "1 cm", right: unknown }],
  ),
  a5b3a25: ratio("Nilai A dan B", "Values of A and B", [
    { label: "A", parts: 5, given: "A = 25" },
    { label: "B", parts: 3, given: "B = ?" },
  ]),
  abc2_3_5Total100: ratio("Tiga bahagian daripada jumlah", "Three shares of a total", [
    { label: "A", parts: 2 }, { label: "B", parts: 3 }, { label: "C", parts: 5 },
  ], label("Jumlah = 100", "Total = 100")),

  // Challenge
  cakes8To14: pairs("Resipi mentega untuk kek", "Cake butter recipe",
    [label("Kek", "Cakes"), label("Mentega", "Butter")],
    [{ left: "8", right: "400 g" }, { left: "14", right: unknown }],
  ),
  boys60PctTotal40: percent(6, label("Lelaki", "Boys"), label("Perempuan", "Girls"),
    label("Jumlah = 40 murid", "Total = 40 students")),
  mapScale250000: pairs("Skala peta bandar", "City map scale",
    [label("Peta", "Map"), label("Sebenar", "Actual")],
    [{ left: "1 cm", right: "250,000 cm" }, { left: "6 cm", right: unknown }],
  ),
  difference3To5: ratio("Bandingkan dua bahagian", "Compare two shares", [
    { label: "A", parts: 3 }, { label: "B", parts: 5 },
  ], label("B − A = 8", "B − A = 8")),
  waterSyrup5To3: ratio("Campuran air dan sirap", "Water and syrup mixture", [
    { label: label("Air", "Water"), parts: 5 },
    { label: label("Sirap", "Syrup"), parts: 3, given: "240 ml" },
  ]),
  carComparison: pairs("Dua perjalanan kereta", "Two car journeys",
    [label("Kereta", "Car"), label("Jarak / masa", "Distance / time")],
    [{ left: "A", right: "240 km / 3 h" }, { left: "B", right: "300 km / 4 h" }],
  ),
  groceryPriceComparison: pairs("Bandingkan dua pilihan", "Compare two purchases",
    [label("Jisim", "Weight"), label("Harga", "Price")],
    [{ left: "3 kg", right: "RM21" }, { left: "5 kg", right: "RM30" }],
  ),
  abc2_3_4Total90: ratio("Bahagian A, B dan C", "Shares of A, B and C", [
    { label: "A", parts: 2 }, { label: "B", parts: 3 }, { label: "C", parts: 4 },
  ], label("Jumlah = RM90", "Total = RM90")),
  boysGirls7To5: ratio("Bahagian murid", "Pupil shares", [
    { label: label("Lelaki", "Boys"), parts: 7 },
    { label: label("Perempuan", "Girls"), parts: 5, given: "35" },
  ]),
  juiceWater1To4: ratio("Jus dan air dalam campuran", "Juice and water mixture", [
    { label: label("Jus", "Juice"), parts: 1 },
    { label: label("Air", "Water"), parts: 4 },
  ], label("Jumlah = 1.5 L", "Total = 1.5 L")),
  pass70PctFail21: percent(7, label("Lulus", "Passed"), label("Gagal", "Failed"),
    label("21 murid gagal", "21 students failed")),
  cookieRecipe5_3_2: ratio("Bahagian bahan biskut", "Cookie ingredient shares", [
    { label: label("Tepung", "Flour"), parts: 5 },
    { label: label("Gula", "Sugar"), parts: 3 },
    { label: label("Mentega", "Butter"), parts: 2 },
  ], label("Jumlah = 500 g", "Total = 500 g")),
  workDays6To9Total450: ratio("Bayaran ikut hari bekerja", "Pay follows days worked", [
    { label: "A", parts: 6, given: label("6 hari", "6 days") },
    { label: "B", parts: 9, given: label("9 hari", "9 days") },
  ], label("Jumlah = RM450", "Total = RM450")),
  rectangleLengthWidth5To3: ratio("Nisbah panjang dan lebar", "Length to width ratio", [
    { label: label("Panjang", "Length"), parts: 5 },
    { label: label("Lebar", "Width"), parts: 3 },
  ], label("Perimeter = 64 cm", "Perimeter = 64 cm")),
  car8L96km: pairs("Jarak dan penggunaan petrol", "Distance and petrol use",
    [label("Petrol", "Fuel"), label("Jarak", "Distance")],
    [{ left: "8 L", right: "96 km" }, { left: "15 L", right: unknown }],
  ),
  parkingTimeline: {
    kind: "number-line",
    title: title("Garis masa parkir", "Parking time line"),
    min: 9, max: 14,
    ticks: [
      { value: 9.25, label: "9:15" },
      { value: 10.25, label: "10:15" },
      { value: 11.25, label: "11:15" },
      { value: 12.25, label: "12:15" },
      { value: 13.25, label: "1:15" },
    ],
    points: [{ value: 9.25 }, { value: 13.25 }],
    span: { from: 9.25, to: 13.25, label: title("Tempoh parkir = ? jam", "Parking duration = ? hours") },
  },
} satisfies Record<string, MathQuestionVisual>;

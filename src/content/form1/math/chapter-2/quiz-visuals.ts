import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Selective, answer-neutral representations for Form 1 Chapter 2.
 * Item arrays show quantities, NOT their factorisation; repeated-event tracks
 * deliberately stop before the first shared event, so students must work out
 * the HCF/LCM themselves. BM and DLP questions share the exact same data.
 */
export const MATH_F1_C2_QUIZ_VISUALS = {
  factorsOf12: {
    kind: "item-arrays",
    title: { bm: "Model kuantiti: 12 objek", dlp: "Quantity model: 12 objects" },
    groups: [{ label: { bm: "Objek", dlp: "Objects" }, count: 12 }],
  },
  factorsOf16: {
    kind: "item-arrays",
    title: { bm: "Model kuantiti: 16 objek", dlp: "Quantity model: 16 objects" },
    groups: [{ label: { bm: "Objek", dlp: "Objects" }, count: 16 }],
  },
  factorsOf30: {
    kind: "item-arrays",
    title: { bm: "Model kuantiti: 30 objek", dlp: "Quantity model: 30 objects" },
    groups: [{ label: { bm: "Objek", dlp: "Objects" }, count: 30 }],
  },
  commonFactors12And18: {
    kind: "item-arrays",
    title: { bm: "Bandingkan dua kuantiti", dlp: "Compare the two quantities" },
    groups: [
      { label: "12", count: 12 },
      { label: "18", count: 18 },
    ],
  },
  commonFactors16And24: {
    kind: "item-arrays",
    title: { bm: "Bandingkan dua kuantiti", dlp: "Compare the two quantities" },
    groups: [
      { label: "16", count: 16 },
      { label: "24", count: 24 },
    ],
  },
  pencilsAndPens: {
    kind: "item-arrays",
    title: { bm: "Barang untuk dibahagikan kepada kotak", dlp: "Items to divide into boxes" },
    groups: [
      { label: { bm: "Pensel", dlp: "Pencils" }, count: 24 },
      { label: { bm: "Pen", dlp: "Pens" }, count: 36 },
    ],
  },
  applesAndOranges: {
    kind: "item-arrays",
    title: { bm: "Buah untuk dibahagikan kepada beg", dlp: "Fruit to divide into bags" },
    groups: [
      { label: { bm: "Epal", dlp: "Apples" }, count: 12 },
      { label: { bm: "Oren", dlp: "Oranges" }, count: 18 },
    ],
  },
  ribbons: {
    kind: "item-arrays",
    title: { bm: "Reben untuk dibahagikan kepada kumpulan", dlp: "Ribbons to divide into groups" },
    groups: [
      { label: { bm: "Merah", dlp: "Red" }, count: 16 },
      { label: { bm: "Biru", dlp: "Blue" }, count: 24 },
    ],
  },
  bouquets: {
    kind: "item-arrays",
    title: { bm: "Bunga dan daun untuk jambangan", dlp: "Flowers and leaves for bouquets" },
    groups: [
      { label: { bm: "Bunga", dlp: "Flowers" }, count: 18 },
      { label: { bm: "Daun", dlp: "Leaves" }, count: 24 },
    ],
  },
  multiples4And6: {
    kind: "multiple-tracks",
    title: { bm: "Permulaan dua pola gandaan", dlp: "Start of two multiple patterns" },
    upTo: 10,
    tracks: [{ every: 4 }, { every: 6 }],
  },
  multiples6And8: {
    kind: "multiple-tracks",
    title: { bm: "Permulaan dua pola berulang", dlp: "Start of two repeating patterns" },
    upTo: 18,
    tracks: [{ every: 6 }, { every: 8 }],
  },
  multiples3_4_6: {
    kind: "multiple-tracks",
    title: { bm: "Permulaan tiga pola gandaan", dlp: "Start of three multiple patterns" },
    upTo: 8,
    tracks: [{ every: 3 }, { every: 4 }, { every: 6 }],
  },
  multiples9And12: {
    kind: "multiple-tracks",
    title: { bm: "Permulaan dua pola berulang", dlp: "Start of two repeating patterns" },
    upTo: 24,
    tracks: [{ every: 9 }, { every: 12 }],
  },
  multiples12And18: {
    kind: "multiple-tracks",
    title: { bm: "Permulaan dua pola pek", dlp: "Start of two pack-size patterns" },
    upTo: 30,
    tracks: [{ every: 12 }, { every: 18 }],
  },
} satisfies Record<string, MathQuestionVisual>;

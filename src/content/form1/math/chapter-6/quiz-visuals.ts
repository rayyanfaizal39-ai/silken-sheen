import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { MathEquationVisual } from "@/features/quiz/visuals/mathEquationVisual";
import type { MathGeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";

/**
 * Form 1 Chapter 6 — Linear Equations.
 * No diagram evaluates an unknown. Systems display only the original equations.
 * Story cards show the question's given quantities, without writing the
 * equation for equation-formation questions. Both languages share each diagram.
 */
const title = (bm: string, dlp: string) => ({ bm, dlp });
type Equality = Extract<MathEquationVisual, { kind: "equation-balance" }>;
type Story = Extract<MathEquationVisual, { kind: "equation-story" }>;
type Scene = Story["scenes"][number];
const balance = (
  bm: string, dlp: string,
  ...rows: Equality["rows"]
): Equality => ({ kind: "equation-balance", title: title(bm, dlp), rows });
const story = (bm: string, dlp: string, scenes: Scene[], note?: Story["note"]): Story => ({
  kind: "equation-story", title: title(bm, dlp), scenes,
  ...(note ? { note } : {}),
});

export const MATH_F1_C6_QUIZ_VISUALS = {
  // Foundation — help translate real situations into equations, without
  // showing the requested equation as a finished mathematical sentence.
  rahimMoney: story("Wang Rahim", "Rahim's money", [{
    items: [
      { text: title("Wang awal RM p", "Starting RM p"), count: 1 },
      { text: title("Dibelanja RM q", "Spent RM q"), count: 1 },
    ],
    result: title("Baki RM10", "RM10 left"),
  }]),
  ageDifference: story("Perbezaan umur", "Age difference", [{
    items: [
      { text: title("Salim: p tahun", "Salim: p years"), count: 1 },
      { text: title("Adik: q tahun", "Sibling: q years"), count: 1 },
    ],
    result: title("Beza 10 tahun", "Difference 10 years"),
  }]),
  twiceNPlusFive: story("Nombor tidak diketahui dan pemalar", "Unknown number and constants", [{
    items: [{ text: "n", count: 2 }, { text: "1", count: 5 }],
    result: title("Jumlah = 17", "Total = 17"),
  }]),
  sumXAndY20: story("Jumlah dua nombor", "Sum of two numbers", [{
    items: [{ text: "x", count: 1 }, { text: "y", count: 1 }],
    result: title("Jumlah = 20", "Total = 20"),
  }]),
  fourPens: story("Empat batang pen", "Four pens", [{
    items: [{ text: title("Pen RM x", "Pen RM x"), count: 4 }],
    result: "RM12",
  }]),
  threePMinusFour: story("Tiga nombor dan empat unit ditolak", "Three unknowns minus four units", [{
    items: [{ text: "p", count: 3 }, { text: "−1", count: 4 }],
    result: "11",
  }]),
  xMinusSix: balance("Keseimbangan dua belah", "Balance both sides",
    { left: "x − 6", right: "2" }),

  // Practice — visual equality makes the inverse-operation pathway legible,
  // while leaving the student's x or y calculation untouched.
  xPlusSeven: balance("Tambah 7 pada x", "Add 7 to x",
    { left: "x + 7", right: "11" }),
  xMinusFive: balance("Tolak 5 daripada x", "Subtract 5 from x",
    { left: "x − 5", right: "9" }),
  fourFifthsXPlusSeven: balance("Operasi pecahan dan tambah", "Fraction and addition",
    { left: "4x/5 + 7", right: "23" }),
  threeXMinusFour: balance("Tiga x dan tolak empat", "Three x minus four",
    { left: "3x − 4", right: "11" }),
  xOverFour: balance("Bahagi x kepada empat", "Divide x by four",
    { left: "x/4", right: "6" }),
  twoXPlusThree: balance("Dua x dan tambah tiga", "Two x plus three",
    { left: "2x + 3", right: "13" }),
  twoXPlusY: balance("Dua pemboleh ubah: x dan y", "Two variables: x and y",
    { left: "2x + y", right: "10", label: title("Diberi x = 3", "Given x = 3") }),
  xPlusNine: balance("Tambah sembilan", "Add nine",
    { left: "x + 9", right: "15" }),
  sixXPlusTwo: balance("Enam x tambah dua", "Six x plus two",
    { left: "6x + 2", right: "20" }),
  xBothSides: balance("x pada kedua-dua belah", "x on both sides",
    { left: "7x − 3", right: "4x + 9" }),
  bracketsThreeXMinusTwo: balance("Persamaan dengan kurungan", "Equation with brackets",
    { left: "3(x − 2)", right: "12" }),

  // Challenge — two separate balances prevent students conflating two
  // equations in a system. Shopping cards use only given item counts/prices.
  systemTenTwo: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "x + y", right: "10", label: title("Persamaan 1", "Equation 1") },
    { left: "x − y", right: "2", label: title("Persamaan 2", "Equation 2") }),
  systemDoubleY: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "y", right: "2x", label: title("Persamaan 1", "Equation 1") },
    { left: "x + y", right: "9", label: title("Persamaan 2", "Equation 2") }),
  systemSevenOne: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "x + y", right: "7", label: title("Persamaan 1", "Equation 1") },
    { left: "x − y", right: "1", label: title("Persamaan 2", "Equation 2") }),
  systemThreeEleven: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "3x + y", right: "11", label: title("Persamaan 1", "Equation 1") },
    { left: "x + y", right: "5", label: title("Persamaan 2", "Equation 2") }),
  sumDifference: story("Dua nombor tidak diketahui", "Two unknown numbers", [
    { items: [{ text: "x", count: 1 }, { text: "y", count: 1 }],
      result: title("Jumlah = 15", "Sum = 15") },
    { items: [{ text: "x", count: 1 }, { text: "y", count: 1 }],
      result: title("Beza = 3", "Difference = 3") },
  ]),
  fruitPurchases: story("Dua pembelian buah", "Two fruit purchases", [
    { label: title("Pembelian 1", "Purchase 1"),
      items: [
        { text: title("Epal 1 kg", "Apples 1 kg"), count: 2 },
        { text: title("Oren 1 kg", "Oranges 1 kg"), count: 1 },
      ], result: "RM13" },
    { label: title("Pembelian 2", "Purchase 2"),
      items: [
        { text: title("Epal 1 kg", "Apples 1 kg"), count: 1 },
        { text: title("Oren 1 kg", "Oranges 1 kg"), count: 1 },
      ], result: "RM8" },
  ]),
  systemTwoXSeven: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "2x + y", right: "7", label: title("Persamaan 1", "Equation 1") },
    { left: "x − y", right: "2", label: title("Persamaan 2", "Equation 2") }),
  systemXPlusTwoY: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "x + 2y", right: "8", label: title("Persamaan 1", "Equation 1") },
    { left: "x − y", right: "2", label: title("Persamaan 2", "Equation 2") }),
  bookPencilPurchases: story("Dua pembelian alat tulis", "Two stationery purchases", [
    { label: title("Pembelian 1", "Purchase 1"),
      items: [
        { text: title("Buku RM b", "Book RM b"), count: 2 },
        { text: title("Pensel RM p", "Pencil RM p"), count: 3 },
      ], result: "RM16" },
    { label: title("Pembelian 2", "Purchase 2"),
      items: [
        { text: title("Buku RM b", "Book RM b"), count: 1 },
        { text: title("Pensel RM p", "Pencil RM p"), count: 1 },
      ], result: "RM7" },
  ]),
  systemTwelveThree: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "x + y", right: "12", label: title("Persamaan 1", "Equation 1") },
    { left: "2x − y", right: "3", label: title("Persamaan 2", "Equation 2") }),
  gardenPerimeter: {
    kind: "geometry-diagram",
    title: title("Taman segi empat tepat", "Rectangular garden"),
    panels: [{
      title: title("Sisi dan perimeter", "Sides and perimeter"),
      description: title("Panjang = x m, lebar = y m, perimeter 28 m; bentuk persamaan belum ditentukan.",
        "Length = x m, width = y m, perimeter 28 m; equation not yet formed."),
      paths: [{ points: [[43, 57], [258, 57], [258, 186], [43, 186]], closed: true, fill: true }],
      labels: [
        { at: [149, 43], text: "x m" },
        { at: [278, 126], text: "y m" },
        { at: [149, 122], text: title("Perimeter = 28 m", "Perimeter = 28 m") },
      ],
    }],
  } satisfies MathGeometryVisual,
  systemGarden: balance("Dua persamaan serentak", "Two simultaneous equations",
    { left: "2x + 2y", right: "28", label: title("Persamaan 1", "Equation 1") },
    { left: "x − y", right: "2", label: title("Persamaan 2", "Equation 2") }),
} satisfies Record<string, MathQuestionVisual>;

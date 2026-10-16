import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { LocalizedText, MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { MathF2C1Subtopic } from "./flashcard-subtopics";

/**
 * Form 2 Mathematics Chapter 1 — Patterns and Sequences (Corak dan Jujukan).
 *
 * One bilingual bank feeds both decks, so DLP and BM always share the same
 * numbers and the same visual objects. Order is fixed: card N here becomes
 * `math-f2-c1-{lang}-f{N}`, the ID existing progress and favourites use.
 *
 *   1.1 Patterns              cards  1–20   concept 4 · practice 11 · challenge 5
 *   1.2 Sequences             cards 21–40   concept 4 · practice 11 · challenge 5
 *   1.3 Patterns and Sequences cards 41–60  concept 4 · practice 11 · challenge 5
 *
 * Practice cards follow the short structured style of UASA Bahagian B and
 * Challenge cards the multi-step style of Bahagian C as teaching references
 * only; they do not reproduce official papers or mark schemes.
 *
 * Conventions from the Chapter 1 notes (textbook-derived): Tₙ is the term at
 * position n (T₁ is the first term); a pattern written as an algebraic
 * expression a + dn uses n = 0, 1, 2, … unless a card states otherwise.
 */

type Side = {
  prompt: string;
  parts?: string[];
  answer: string[][];
  note?: string;
};

export interface MathF2C1FlashcardEntry {
  subtopic: MathF2C1Subtopic;
  mode: FlashcardReviewMode;
  visuals?: MathQuestionVisual[];
  answerVisuals?: MathQuestionVisual[];
  dlp: Side;
  bm: Side;
}

const t = (dlp: string, bm: string): LocalizedText => ({ dlp, bm });

// ─── 1.1 Patterns ────────────────────────────────────────────────────────────

const patterns: MathF2C1FlashcardEntry[] = [
  // Concept Review
  {
    subtopic: "1.1",
    mode: "concept",
    visuals: [
      {
        kind: "dot-pattern",
        title: t("Dots in pairs", "Titik berpasangan"),
        shape: "pairs",
        stages: [1, 2, 3, 4],
        missingStage: 4,
      },
    ],
    dlp: {
      prompt: "Describe the pattern of the dots and state the number of dots in Stage 4.",
      answer: [
        ["2, 4, 6, … — add 2 dots each time. These are even numbers.", "Stage 4: 6 + 2 = 8 dots."],
      ],
    },
    bm: {
      prompt: "Huraikan corak titik itu dan nyatakan bilangan titik pada Peringkat 4.",
      answer: [
        [
          "2, 4, 6, … — tambah 2 titik setiap kali. Ini ialah nombor genap.",
          "Peringkat 4: 6 + 2 = 8 titik.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "concept",
    visuals: [
      {
        kind: "dot-pattern",
        title: t("Triangular dot pattern", "Corak titik segi tiga"),
        shape: "triangle",
        stages: [1, 2, 3, 4, 5],
        missingStage: 5,
      },
    ],
    dlp: {
      prompt: "How many dots are in Stage 5?",
      answer: [
        ["The increases are +2, +3, +4, so the next increase is +5.", "Stage 5: 10 + 5 = 15 dots."],
      ],
    },
    bm: {
      prompt: "Berapakah bilangan titik pada Peringkat 5?",
      answer: [
        [
          "Pertambahannya ialah +2, +3, +4, maka pertambahan seterusnya ialah +5.",
          "Peringkat 5: 10 + 5 = 15 titik.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "concept",
    visuals: [
      {
        kind: "pascal-triangle",
        title: t("Pascal's Triangle", "Segi Tiga Pascal"),
        rows: 5,
        hidden: [{ row: 5, position: 3 }],
      },
    ],
    answerVisuals: [
      {
        kind: "pascal-triangle",
        title: t("Add the two numbers directly above", "Tambah dua nombor tepat di atasnya"),
        rows: 5,
        highlight: [
          { row: 4, position: 2 },
          { row: 4, position: 3 },
          { row: 5, position: 3 },
        ],
      },
    ],
    dlp: {
      prompt: "Find the missing number in Pascal's Triangle.",
      answer: [["3 + 3 = 6. Each middle number is the sum of the two numbers directly above it."]],
    },
    bm: {
      prompt: "Cari nombor yang tertinggal dalam Segi Tiga Pascal.",
      answer: [
        ["3 + 3 = 6. Setiap nombor di tengah ialah hasil tambah dua nombor tepat di atasnya."],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "concept",
    visuals: [
      {
        kind: "fibonacci-chain",
        title: t("Fibonacci Numbers", "Nombor Fibonacci"),
        terms: [0, 1, 1, 2, 3, 5, 8, null],
      },
    ],
    dlp: {
      prompt: "State the rule of the Fibonacci Numbers and find the next number.",
      answer: [["Add the previous two terms.", "5 + 8 = 13."]],
    },
    bm: {
      prompt: "Nyatakan peraturan Nombor Fibonacci dan cari nombor seterusnya.",
      answer: [["Tambah dua sebutan sebelumnya.", "5 + 8 = 13."]],
    },
  },

  // Practice Review
  {
    subtopic: "1.1",
    mode: "practice",
    answerVisuals: [
      {
        kind: "sequence-steps",
        title: t("Add 5 each time", "Tambah 5 setiap kali"),
        terms: [-8, -3, 2, 7, 12, 17],
        steps: ["+5", "+5", "+5", "+5", "+5"],
        highlight: [4, 5],
      },
    ],
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Number pattern", "Corak nombor"),
        terms: [-8, -3, 2, 7, null, null],
      },
    ],
    dlp: {
      prompt: "The number pattern is −8, −3, 2, 7, …",
      parts: ["State the pattern.", "Find the next two numbers."],
      answer: [
        ["−3 − (−8) = 5 and 2 − (−3) = 5, so add 5 to the previous number."],
        ["7 + 5 = 12", "12 + 5 = 17"],
      ],
    },
    bm: {
      prompt: "Corak nombor ialah −8, −3, 2, 7, …",
      parts: ["Nyatakan coraknya.", "Cari dua nombor seterusnya."],
      answer: [
        ["−3 − (−8) = 5 dan 2 − (−3) = 5, maka tambah 5 kepada nombor sebelumnya."],
        ["7 + 5 = 12", "12 + 5 = 17"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    dlp: {
      prompt: "The number pattern is 96, 48, 24, …",
      parts: ["State the pattern.", "Find the 5th and 6th numbers."],
      answer: [
        ["96 ÷ 2 = 48 and 48 ÷ 2 = 24, so divide the previous number by 2."],
        ["4th: 24 ÷ 2 = 12", "5th: 12 ÷ 2 = 6", "6th: 6 ÷ 2 = 3"],
      ],
    },
    bm: {
      prompt: "Corak nombor ialah 96, 48, 24, …",
      parts: ["Nyatakan coraknya.", "Cari nombor ke-5 dan ke-6."],
      answer: [
        ["96 ÷ 2 = 48 dan 48 ÷ 2 = 24, maka bahagi nombor sebelumnya dengan 2."],
        ["Ke-4: 24 ÷ 2 = 12", "Ke-5: 12 ÷ 2 = 6", "Ke-6: 6 ÷ 2 = 3"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    dlp: {
      prompt: "The number pattern is 2.5, 2.0, 1.5, …",
      parts: ["State the pattern.", "Find the next two numbers."],
      answer: [
        ["2.0 − 2.5 = −0.5, so subtract 0.5 from the previous number."],
        ["1.5 − 0.5 = 1.0", "1.0 − 0.5 = 0.5"],
      ],
    },
    bm: {
      prompt: "Corak nombor ialah 2.5, 2.0, 1.5, …",
      parts: ["Nyatakan coraknya.", "Cari dua nombor seterusnya."],
      answer: [
        ["2.0 − 2.5 = −0.5, maka tolak 0.5 daripada nombor sebelumnya."],
        ["1.5 − 0.5 = 1.0", "1.0 − 0.5 = 0.5"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    dlp: {
      prompt: "Consider 4, 9, 14, 19, 24, …, 49.",
      parts: ["List all the even numbers in the list.", "State the pattern of the even numbers."],
      answer: [
        ["The list is 4, 9, 14, 19, 24, 29, 34, 39, 44, 49.", "Even numbers: 4, 14, 24, 34, 44"],
        ["Add 10 to the previous even number."],
      ],
    },
    bm: {
      prompt: "Pertimbangkan 4, 9, 14, 19, 24, …, 49.",
      parts: [
        "Senaraikan semua nombor genap dalam senarai itu.",
        "Nyatakan corak nombor genap itu.",
      ],
      answer: [
        [
          "Senarainya ialah 4, 9, 14, 19, 24, 29, 34, 39, 44, 49.",
          "Nombor genap: 4, 14, 24, 34, 44",
        ],
        ["Tambah 10 kepada nombor genap sebelumnya."],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    dlp: {
      prompt: "The number pattern is 5, 15, 45, 135, …",
      parts: ["State the pattern.", "Find the next two numbers."],
      answer: [
        ["15 ÷ 5 = 3 and 45 ÷ 15 = 3, so multiply the previous number by 3."],
        ["135 × 3 = 405", "405 × 3 = 1215"],
      ],
    },
    bm: {
      prompt: "Corak nombor ialah 5, 15, 45, 135, …",
      parts: ["Nyatakan coraknya.", "Cari dua nombor seterusnya."],
      answer: [
        ["15 ÷ 5 = 3 dan 45 ÷ 15 = 3, maka darab nombor sebelumnya dengan 3."],
        ["135 × 3 = 405", "405 × 3 = 1215"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "pascal-triangle",
        title: t("Pascal's Triangle", "Segi Tiga Pascal"),
        rows: 5,
        labelRows: true,
      },
    ],
    answerVisuals: [
      {
        kind: "pascal-triangle",
        title: t("Row 6", "Baris 6"),
        rows: 6,
        labelRows: true,
        highlight: [1, 2, 3, 4, 5, 6].map((position) => ({ row: 6, position })),
      },
    ],
    dlp: {
      prompt: "Row 5 of Pascal's Triangle is 1, 4, 6, 4, 1.",
      parts: ["Write Row 6.", "Find the sum of the numbers in Row 6."],
      answer: [
        ["Start and end with 1: 1, 1 + 4, 4 + 6, 6 + 4, 4 + 1, 1", "Row 6: 1, 5, 10, 10, 5, 1"],
        ["1 + 5 + 10 + 10 + 5 + 1 = 32"],
      ],
    },
    bm: {
      prompt: "Baris 5 Segi Tiga Pascal ialah 1, 4, 6, 4, 1.",
      parts: ["Tulis Baris 6.", "Cari hasil tambah nombor dalam Baris 6."],
      answer: [
        [
          "Mula dan akhiri dengan 1: 1, 1 + 4, 4 + 6, 6 + 4, 4 + 1, 1",
          "Baris 6: 1, 5, 10, 10, 5, 1",
        ],
        ["1 + 5 + 10 + 10 + 5 + 1 = 32"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "pascal-triangle",
        title: t("Pascal's Triangle", "Segi Tiga Pascal"),
        rows: 7,
        labelRows: true,
        hidden: [
          { row: 6, position: 3, label: "P" },
          { row: 7, position: 4, label: "Q" },
        ],
      },
    ],
    dlp: {
      prompt: "P and Q are numbers in Pascal's Triangle.",
      parts: ["Find P.", "Hence, find Q."],
      answer: [
        ["P is below 4 and 6 in Row 5.", "P = 4 + 6 = 10"],
        ["Q is below P and the 10 beside it in Row 6.", "Q = 10 + 10 = 20"],
      ],
    },
    bm: {
      prompt: "P dan Q ialah nombor dalam Segi Tiga Pascal.",
      parts: ["Cari P.", "Seterusnya, cari Q."],
      answer: [
        ["P berada di bawah 4 dan 6 dalam Baris 5.", "P = 4 + 6 = 10"],
        ["Q berada di bawah P dan 10 di sebelahnya dalam Baris 6.", "Q = 10 + 10 = 20"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "fibonacci-chain",
        title: t("Fibonacci Numbers", "Nombor Fibonacci"),
        terms: [0, 1, 1, null, null, null, 8, 13, null],
      },
    ],
    dlp: {
      prompt: "Complete the Fibonacci Numbers.",
      parts: ["Find the three missing numbers before 8.", "Find the number after 13."],
      answer: [["1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5", "Check: 3 + 5 = 8 ✓"], ["8 + 13 = 21"]],
    },
    bm: {
      prompt: "Lengkapkan Nombor Fibonacci.",
      parts: ["Cari tiga nombor yang tertinggal sebelum 8.", "Cari nombor selepas 13."],
      answer: [["1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5", "Semak: 3 + 5 = 8 ✓"], ["8 + 13 = 21"]],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "fibonacci-chain",
        title: t("Fibonacci-type pattern", "Corak jenis Fibonacci"),
        terms: [1, 3, 4, 7, 11, null, null],
      },
    ],
    dlp: {
      prompt: "A Fibonacci-type pattern is 1, 3, 4, 7, 11, …",
      parts: ["Show how 11 is obtained.", "Find the next two numbers."],
      answer: [
        ["11 = 4 + 7, the sum of the previous two numbers."],
        ["7 + 11 = 18", "11 + 18 = 29"],
      ],
    },
    bm: {
      prompt: "Suatu corak jenis Fibonacci ialah 1, 3, 4, 7, 11, …",
      parts: ["Tunjukkan bagaimana 11 diperoleh.", "Cari dua nombor seterusnya."],
      answer: [
        ["11 = 4 + 7, iaitu hasil tambah dua nombor sebelumnya."],
        ["7 + 11 = 18", "11 + 18 = 29"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "dot-pattern",
        title: t("Square dot pattern", "Corak titik segi empat sama"),
        shape: "square",
        stages: [1, 2, 3, 4],
      },
    ],
    dlp: {
      prompt: "The dot pattern gives 1, 4, 9, 16, …",
      parts: ["Write each number as a square.", "Find the number of dots in Stage 7."],
      answer: [["1 = 1², 4 = 2², 9 = 3², 16 = 4²", "Stage n has n² dots."], ["7² = 49 dots"]],
    },
    bm: {
      prompt: "Corak titik itu memberikan 1, 4, 9, 16, …",
      parts: ["Tulis setiap nombor sebagai kuasa dua.", "Cari bilangan titik pada Peringkat 7."],
      answer: [
        ["1 = 1², 4 = 2², 9 = 3², 16 = 4²", "Peringkat n mempunyai n² titik."],
        ["7² = 49 titik"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "practice",
    visuals: [
      {
        kind: "object-stages",
        title: t("Tile pattern", "Corak jubin"),
        object: "tile",
        stages: [
          { label: t("Stage 1", "Peringkat 1"), count: 5 },
          { label: t("Stage 2", "Peringkat 2"), count: 9 },
          { label: t("Stage 3", "Peringkat 3"), count: 13 },
        ],
      },
    ],
    dlp: {
      prompt: "Each stage of a tile pattern has 4 more tiles than the previous stage.",
      parts: ["Find the number of tiles in Stage 4.", "Which stage has 25 tiles?"],
      answer: [
        ["13 + 4 = 17 tiles"],
        ["Stage 5: 17 + 4 = 21", "Stage 6: 21 + 4 = 25", "Stage 6 has 25 tiles."],
      ],
    },
    bm: {
      prompt:
        "Setiap peringkat suatu corak jubin mempunyai 4 jubin lebih daripada peringkat sebelumnya.",
      parts: ["Cari bilangan jubin pada Peringkat 4.", "Peringkat manakah mempunyai 25 jubin?"],
      answer: [
        ["13 + 4 = 17 jubin"],
        ["Peringkat 5: 17 + 4 = 21", "Peringkat 6: 21 + 4 = 25", "Peringkat 6 mempunyai 25 jubin."],
      ],
    },
  },

  // Challenge Review
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "fibonacci-chain",
        title: t("Seedlings in each flower bed", "Anak benih dalam setiap batas bunga"),
        terms: [2, 3, 5, 8, null, null, null],
        showSums: true,
      },
    ],
    dlp: {
      prompt:
        "The school gardening club plants seedlings in a row of flower beds. Bed 1 has 2 seedlings and Bed 2 has 3. Each following bed has as many seedlings as the previous two beds together.",
      parts: [
        "Find the number of seedlings in Beds 5, 6 and 7.",
        "The club has 100 seedlings and plants the beds in order. How many beds can be completed, and how many seedlings are left over?",
        "A teacher suggests a simpler plan: start with 2 and add 5 seedlings for each new bed. For 6 beds, which plan uses fewer seedlings, and by how many?",
      ],
      answer: [
        ["Bed 5: 5 + 8 = 13", "Bed 6: 8 + 13 = 21", "Bed 7: 13 + 21 = 34"],
        [
          "Running totals: 2, 5, 10, 18, 31, 52, 86",
          "Bed 8 needs 21 + 34 = 55, but only 100 − 86 = 14 are left.",
          "7 beds can be completed, with 14 seedlings left over.",
        ],
        [
          "Fibonacci plan, 6 beds: 2 + 3 + 5 + 8 + 13 + 21 = 52",
          "Teacher's plan: 2, 7, 12, 17, 22, 27 → total 87",
          "The Fibonacci plan uses 87 − 52 = 35 fewer seedlings.",
        ],
      ],
    },
    bm: {
      prompt:
        "Kelab berkebun sekolah menanam anak benih dalam sebaris batas bunga. Batas 1 mempunyai 2 anak benih dan Batas 2 mempunyai 3. Setiap batas berikutnya mempunyai bilangan anak benih yang sama dengan jumlah dua batas sebelumnya.",
      parts: [
        "Cari bilangan anak benih dalam Batas 5, 6 dan 7.",
        "Kelab itu mempunyai 100 anak benih dan menanam batas mengikut urutan. Berapakah batas yang dapat disiapkan, dan berapakah anak benih yang berbaki?",
        "Seorang guru mencadangkan pelan yang lebih mudah: mula dengan 2 dan tambah 5 anak benih bagi setiap batas baharu. Bagi 6 batas, pelan manakah menggunakan lebih sedikit anak benih, dan berapa banyak kurangnya?",
      ],
      answer: [
        ["Batas 5: 5 + 8 = 13", "Batas 6: 8 + 13 = 21", "Batas 7: 13 + 21 = 34"],
        [
          "Jumlah terkumpul: 2, 5, 10, 18, 31, 52, 86",
          "Batas 8 memerlukan 21 + 34 = 55, tetapi hanya 100 − 86 = 14 yang tinggal.",
          "7 batas dapat disiapkan, dengan 14 anak benih berbaki.",
        ],
        [
          "Pelan Fibonacci, 6 batas: 2 + 3 + 5 + 8 + 13 + 21 = 52",
          "Pelan guru: 2, 7, 12, 17, 22, 27 → jumlah 87",
          "Pelan Fibonacci menggunakan 87 − 52 = 35 anak benih kurang.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "dot-pattern",
        title: t(
          "Stage n has n rows (each dot is one can)",
          "Peringkat n mempunyai n baris (setiap titik ialah satu tin)",
        ),
        shape: "triangle",
        stages: [1, 2, 3, 4],
        missingStage: 4,
      },
      {
        kind: "term-table",
        title: t("Cans in each stack", "Tin dalam setiap susunan"),
        rows: [
          { label: t("Rows", "Baris"), cells: ["1", "2", "3", "4", "5", "6"] },
          { label: t("Cans", "Tin"), cells: ["1", "3", "6", null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "For Canteen Week, the school canteen stacks drink cans in a triangle. The top row has 1 can and each row below has 1 more can than the row above it.",
      parts: [
        "Complete the table for stacks with 4, 5 and 6 rows.",
        "The canteen has 50 cans. What is the tallest complete stack it can build, and how many cans are left?",
        "The manager wants a complete stack that uses exactly 40 cans. Explain whether this is possible.",
      ],
      answer: [
        ["Add the new bottom row each time: 6 + 4 = 10, 10 + 5 = 15, 15 + 6 = 21"],
        [
          "Continue: 7 rows 28, 8 rows 36, 9 rows 45, 10 rows 55",
          "55 is more than 50, so the tallest stack has 9 rows.",
          "Cans left: 50 − 45 = 5",
        ],
        [
          "The totals jump from 36 (8 rows) to 45 (9 rows).",
          "40 is not one of the totals, so a complete stack of exactly 40 cans is not possible.",
        ],
      ],
    },
    bm: {
      prompt:
        "Sempena Minggu Kantin, kantin sekolah menyusun tin minuman berbentuk segi tiga. Baris teratas mempunyai 1 tin dan setiap baris di bawahnya mempunyai 1 tin lebih daripada baris di atasnya.",
      parts: [
        "Lengkapkan jadual bagi susunan dengan 4, 5 dan 6 baris.",
        "Kantin itu mempunyai 50 tin. Apakah susunan lengkap yang paling tinggi dapat dibina, dan berapakah tin yang tinggal?",
        "Pengurus mahu susunan lengkap yang menggunakan tepat 40 tin. Terangkan sama ada ini mungkin.",
      ],
      answer: [
        ["Tambah baris bawah yang baharu setiap kali: 6 + 4 = 10, 10 + 5 = 15, 15 + 6 = 21"],
        [
          "Teruskan: 7 baris 28, 8 baris 36, 9 baris 45, 10 baris 55",
          "55 lebih daripada 50, maka susunan paling tinggi mempunyai 9 baris.",
          "Tin yang tinggal: 50 − 45 = 5",
        ],
        [
          "Jumlahnya melonjak daripada 36 (8 baris) kepada 45 (9 baris).",
          "40 bukan salah satu jumlah itu, maka susunan lengkap dengan tepat 40 tin tidak mungkin.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "pascal-triangle",
        title: t("Display board, Rows 1–7", "Papan pameran, Baris 1–7"),
        rows: 7,
        labelRows: true,
        hidden: [
          { row: 6, position: 3, label: "P" },
          { row: 7, position: 4, label: "Q" },
        ],
      },
    ],
    dlp: {
      prompt:
        "The Mathematics Society is making a Pascal's Triangle display board for Open Day. Each number is printed on its own card.",
      parts: [
        "Find the numbers on cards P and Q.",
        "How many cards are needed for Rows 1 to 7?",
        "The sum of each row is double the sum of the row above. A teacher says the cards in Row 8 add up to 256. Is the teacher correct? Show your working.",
      ],
      answer: [
        [
          "P = 4 + 6 = 10 (the two cards above it in Row 5)",
          "Q = 10 + 10 = 20 (the two cards above it in Row 6)",
        ],
        ["Row k has k cards.", "1 + 2 + 3 + 4 + 5 + 6 + 7 = 28 cards"],
        [
          "Row sums: 1, 2, 4, 8, 16, 32, 64, 128",
          "Row 8 adds up to 128, not 256. The teacher is not correct; 256 is the sum of Row 9.",
        ],
      ],
    },
    bm: {
      prompt:
        "Persatuan Matematik sedang membina papan pameran Segi Tiga Pascal untuk Hari Terbuka. Setiap nombor dicetak pada kad tersendiri.",
      parts: [
        "Cari nombor pada kad P dan kad Q.",
        "Berapakah kad yang diperlukan bagi Baris 1 hingga 7?",
        "Hasil tambah setiap baris ialah dua kali hasil tambah baris di atasnya. Seorang guru berkata kad dalam Baris 8 berjumlah 256. Adakah guru itu betul? Tunjukkan jalan kerja.",
      ],
      answer: [
        [
          "P = 4 + 6 = 10 (dua kad di atasnya dalam Baris 5)",
          "Q = 10 + 10 = 20 (dua kad di atasnya dalam Baris 6)",
        ],
        ["Baris k mempunyai k kad.", "1 + 2 + 3 + 4 + 5 + 6 + 7 = 28 kad"],
        [
          "Hasil tambah baris: 1, 2, 4, 8, 16, 32, 64, 128",
          "Baris 8 berjumlah 128, bukan 256. Guru itu tidak betul; 256 ialah hasil tambah Baris 9.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("The first lockers in the corridor", "Lokar pertama di koridor"),
        rows: [
          { label: t("Locker", "Lokar"), cells: ["1", "2", "3", "4", "5", "6"] },
          {
            label: t("Wall", "Dinding"),
            cells: [
              t("Left", "Kiri"),
              t("Right", "Kanan"),
              t("Left", "Kiri"),
              t("Right", "Kanan"),
              t("Left", "Kiri"),
              t("Right", "Kanan"),
            ],
          },
        ],
      },
    ],
    dlp: {
      prompt:
        "A school corridor has 60 lockers numbered 1 to 60. Odd-numbered lockers are on the left wall and even-numbered lockers are on the right wall.",
      parts: [
        "Write the first five locker numbers on the left wall and describe the pattern.",
        "How many lockers are on the left wall? Explain.",
        "Mei Ling's locker is number 47. State which wall it is on and its position along that wall.",
      ],
      answer: [
        ["1, 3, 5, 7, 9", "Add 2 to the previous locker number (odd numbers)."],
        ["Half of the numbers 1 to 60 are odd.", "60 ÷ 2 = 30 lockers"],
        [
          "47 is odd, so it is on the left wall.",
          "Odd numbers before 47: 1, 3, …, 45, that is (45 + 1) ÷ 2 = 23 lockers.",
          "Mei Ling's locker is the 24th locker on the left wall.",
        ],
      ],
    },
    bm: {
      prompt:
        "Sebuah koridor sekolah mempunyai 60 lokar bernombor 1 hingga 60. Lokar bernombor ganjil berada di dinding kiri dan lokar bernombor genap berada di dinding kanan.",
      parts: [
        "Tulis lima nombor lokar pertama di dinding kiri dan huraikan coraknya.",
        "Berapakah bilangan lokar di dinding kiri? Terangkan.",
        "Lokar Mei Ling bernombor 47. Nyatakan dinding lokar itu dan kedudukannya di sepanjang dinding itu.",
      ],
      answer: [
        ["1, 3, 5, 7, 9", "Tambah 2 kepada nombor lokar sebelumnya (nombor ganjil)."],
        ["Separuh daripada nombor 1 hingga 60 ialah nombor ganjil.", "60 ÷ 2 = 30 lokar"],
        [
          "47 ialah nombor ganjil, maka lokar itu di dinding kiri.",
          "Nombor ganjil sebelum 47: 1, 3, …, 45, iaitu (45 + 1) ÷ 2 = 23 lokar.",
          "Lokar Mei Ling ialah lokar ke-24 di dinding kiri.",
        ],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "matchstick-squares",
        title: t("Fence frames made of wooden rods", "Bingkai pagar daripada batang kayu"),
        stages: [1, 2, 3],
        material: "rod",
      },
    ],
    dlp: {
      prompt:
        "The gardening club builds a fence from square frames in a row. Neighbouring frames share one wooden rod: 1 frame needs 4 rods, 2 frames need 7 rods and 3 frames need 10 rods.",
      parts: [
        "Describe the pattern of the number of rods in words, then find the number of rods for 6 frames.",
        "The garden edge needs 12 frames. How many rods are needed?",
        "The club has 50 rods. Check whether this is enough for 17 frames. If not, find the greatest number of frames it can build and the number of rods left.",
      ],
      answer: [
        ["Add 3 rods for each new frame.", "4 frames: 13, 5 frames: 16, 6 frames: 19 rods"],
        ["12 frames is 11 frames more than 1 frame.", "4 + 11 × 3 = 37 rods"],
        [
          "k frames need 3k + 1 rods.",
          "17 frames: 3 × 17 + 1 = 52 rods, so 50 rods are not enough.",
          "16 frames: 3 × 16 + 1 = 49 rods. The club can build 16 frames, with 50 − 49 = 1 rod left.",
        ],
      ],
      note: "Common error: 4 rods for every frame gives 4 × 12 = 48 rods. Neighbouring frames share a rod.",
    },
    bm: {
      prompt:
        "Kelab berkebun membina pagar daripada bingkai segi empat sama dalam satu baris. Bingkai yang bersebelahan berkongsi satu batang kayu: 1 bingkai memerlukan 4 batang kayu, 2 bingkai memerlukan 7 batang kayu dan 3 bingkai memerlukan 10 batang kayu.",
      parts: [
        "Huraikan corak bilangan batang kayu dalam perkataan, kemudian cari bilangan batang kayu bagi 6 bingkai.",
        "Tepi taman memerlukan 12 bingkai. Berapakah batang kayu yang diperlukan?",
        "Kelab itu mempunyai 50 batang kayu. Semak sama ada jumlah ini cukup untuk 17 bingkai. Jika tidak, cari bilangan bingkai yang paling banyak dapat dibina dan bilangan batang kayu yang berbaki.",
      ],
      answer: [
        [
          "Tambah 3 batang kayu bagi setiap bingkai baharu.",
          "4 bingkai: 13, 5 bingkai: 16, 6 bingkai: 19 batang kayu",
        ],
        ["12 bingkai ialah 11 bingkai lebih daripada 1 bingkai.", "4 + 11 × 3 = 37 batang kayu"],
        [
          "k bingkai memerlukan 3k + 1 batang kayu.",
          "17 bingkai: 3 × 17 + 1 = 52 batang kayu, maka 50 batang kayu tidak cukup.",
          "16 bingkai: 3 × 16 + 1 = 49 batang kayu. Kelab itu boleh membina 16 bingkai, dengan 50 − 49 = 1 batang kayu berbaki.",
        ],
      ],
      note: "Kesilapan biasa: 4 batang kayu bagi setiap bingkai memberikan 4 × 12 = 48 batang kayu. Bingkai yang bersebelahan berkongsi satu batang kayu.",
    },
  },
];

// ─── 1.2 Sequences ───────────────────────────────────────────────────────────

const sequences: MathF2C1FlashcardEntry[] = [
  // Concept Review
  {
    subtopic: "1.2",
    mode: "concept",
    answerVisuals: [
      {
        kind: "sequence-steps",
        title: t("List A", "Senarai A"),
        terms: [2, 5, 8, 11, 14],
        steps: ["+3", "+3", "+3", "+3"],
      },
    ],
    dlp: {
      prompt: "Which list is a sequence?\nA: 2, 5, 8, 11, 14\nB: 2, 5, 9, 11, 16",
      answer: [
        [
          "A. It follows one pattern: add 3 each time.",
          "B changes by +3, +4, +2, +5, so it does not follow a certain pattern.",
        ],
      ],
    },
    bm: {
      prompt: "Senarai manakah suatu jujukan?\nA: 2, 5, 8, 11, 14\nB: 2, 5, 9, 11, 16",
      answer: [
        [
          "A. Ia mengikut satu corak: tambah 3 setiap kali.",
          "B berubah sebanyak +3, +4, +2, +5, maka ia tidak mengikut corak tertentu.",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "concept",
    visuals: [{ kind: "sequence-steps", title: t("Sequence", "Jujukan"), terms: [50, 40, 30, 20] }],
    dlp: {
      prompt: "Is this sequence increasing or decreasing? State its pattern.",
      answer: [["Decreasing.", "Subtract 10 from the previous number."]],
    },
    bm: {
      prompt: "Adakah jujukan ini menaik atau menurun? Nyatakan coraknya.",
      answer: [["Menurun.", "Tolak 10 daripada nombor sebelumnya."]],
    },
  },
  {
    subtopic: "1.2",
    mode: "concept",
    dlp: {
      prompt: "Is 3, −6, 12, −24, … a sequence? State the pattern.",
      answer: [
        [
          "Yes. Multiply the previous number by −2.",
          "3 × (−2) = −6, −6 × (−2) = 12, 12 × (−2) = −24",
        ],
      ],
    },
    bm: {
      prompt: "Adakah 3, −6, 12, −24, … suatu jujukan? Nyatakan coraknya.",
      answer: [
        [
          "Ya. Darab nombor sebelumnya dengan −2.",
          "3 × (−2) = −6, −6 × (−2) = 12, 12 × (−2) = −24",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "concept",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Sequence", "Jujukan"),
        terms: [1, 0.3, 0.09, 0.027, null],
      },
    ],
    dlp: {
      prompt: "State the pattern and find the next term.",
      answer: [["Multiply the previous number by 0.3.", "0.027 × 0.3 = 0.0081"]],
    },
    bm: {
      prompt: "Nyatakan corak dan cari sebutan seterusnya.",
      answer: [["Darab nombor sebelumnya dengan 0.3.", "0.027 × 0.3 = 0.0081"]],
    },
  },

  // Practice Review
  {
    subtopic: "1.2",
    mode: "practice",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Sequence", "Jujukan"),
        terms: [7, 11, null, 19, 23],
      },
    ],
    dlp: {
      prompt: "The sequence is 7, 11, __, 19, 23, …",
      parts: ["State the pattern.", "Find the missing term."],
      answer: [
        ["23 − 19 = 4, so add 4 to the previous number."],
        ["11 + 4 = 15", "Check: 15 + 4 = 19 ✓"],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 7, 11, __, 19, 23, …",
      parts: ["Nyatakan coraknya.", "Cari sebutan yang tertinggal."],
      answer: [
        ["23 − 19 = 4, maka tambah 4 kepada nombor sebelumnya."],
        ["11 + 4 = 15", "Semak: 15 + 4 = 19 ✓"],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Sequence", "Jujukan"),
        terms: [95, null, 71, 59, null, null],
      },
    ],
    dlp: {
      prompt: "Complete the sequence.",
      parts: ["State the pattern.", "Find the three missing terms."],
      answer: [
        ["59 − 71 = −12, so subtract 12 from the previous number."],
        ["95 − 12 = 83", "59 − 12 = 47", "47 − 12 = 35"],
      ],
    },
    bm: {
      prompt: "Lengkapkan jujukan itu.",
      parts: ["Nyatakan coraknya.", "Cari tiga sebutan yang tertinggal."],
      answer: [
        ["59 − 71 = −12, maka tolak 12 daripada nombor sebelumnya."],
        ["95 − 12 = 83", "59 − 12 = 47", "47 − 12 = 35"],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    visuals: [
      { kind: "sequence-steps", title: t("Sequence", "Jujukan"), terms: [null, null, 18, 54, 162] },
    ],
    dlp: {
      prompt: "The first two terms of the sequence are missing.",
      parts: ["State the pattern.", "Find the first two terms."],
      answer: [
        ["54 ÷ 18 = 3 and 162 ÷ 54 = 3, so multiply by 3."],
        ["Work backwards by dividing by 3:", "18 ÷ 3 = 6", "6 ÷ 3 = 2", "First two terms: 2, 6"],
      ],
    },
    bm: {
      prompt: "Dua sebutan pertama jujukan itu tertinggal.",
      parts: ["Nyatakan coraknya.", "Cari dua sebutan pertama."],
      answer: [
        ["54 ÷ 18 = 3 dan 162 ÷ 54 = 3, maka darab dengan 3."],
        [
          "Kerja ke belakang dengan membahagi dengan 3:",
          "18 ÷ 3 = 6",
          "6 ÷ 3 = 2",
          "Dua sebutan pertama: 2, 6",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    visuals: [
      {
        kind: "number-line",
        title: t(
          "The first three terms on a number line",
          "Tiga sebutan pertama pada garis nombor",
        ),
        min: -20,
        max: 5,
        ticks: [-20, -15, -10, -5, 0, 5].map((value) => ({ value })),
        points: [-20, -14, -8].map((value) => ({ value })),
      },
    ],
    dlp: {
      prompt: "The sequence is −20, −14, −8, …",
      parts: ["Show that the pattern is add 6.", "Find the first positive term."],
      answer: [
        ["−14 − (−20) = 6 and −8 − (−14) = 6"],
        ["−8 + 6 = −2", "−2 + 6 = 4", "The first positive term is 4."],
      ],
    },
    bm: {
      prompt: "Jujukan ialah −20, −14, −8, …",
      parts: ["Tunjukkan bahawa coraknya ialah tambah 6.", "Cari sebutan positif yang pertama."],
      answer: [
        ["−14 − (−20) = 6 dan −8 − (−14) = 6"],
        ["−8 + 6 = −2", "−2 + 6 = 4", "Sebutan positif yang pertama ialah 4."],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    dlp: {
      prompt: "The sequence is 1.2, 2.4, 3.6, …",
      parts: ["State the pattern.", "Find the 6th term."],
      answer: [["Add 1.2 to the previous number."], ["4th: 4.8, 5th: 6.0", "6th: 6.0 + 1.2 = 7.2"]],
    },
    bm: {
      prompt: "Jujukan ialah 1.2, 2.4, 3.6, …",
      parts: ["Nyatakan coraknya.", "Cari sebutan ke-6."],
      answer: [
        ["Tambah 1.2 kepada nombor sebelumnya."],
        ["Ke-4: 4.8, ke-5: 6.0", "Ke-6: 6.0 + 1.2 = 7.2"],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    dlp: {
      prompt: "The sequence is 64, 32, 16, …",
      parts: ["State the pattern.", "Find the first term that is less than 1."],
      answer: [
        ["Divide the previous number by 2."],
        ["16, 8, 4, 2, 1, 0.5", "The first term less than 1 is 0.5."],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 64, 32, 16, …",
      parts: ["Nyatakan coraknya.", "Cari sebutan pertama yang kurang daripada 1."],
      answer: [
        ["Bahagi nombor sebelumnya dengan 2."],
        ["16, 8, 4, 2, 1, 0.5", "Sebutan pertama yang kurang daripada 1 ialah 0.5."],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    dlp: {
      prompt: "A sequence starts with 42. Add 7 to the previous number.",
      parts: ["Write the first five terms.", "Is 91 in the sequence? Show your working."],
      answer: [
        ["42, 49, 56, 63, 70"],
        ["91 − 42 = 49 and 49 ÷ 7 = 7", "Yes. 91 is reached after adding 7 seven times."],
      ],
    },
    bm: {
      prompt: "Suatu jujukan bermula dengan 42. Tambah 7 kepada nombor sebelumnya.",
      parts: ["Tulis lima sebutan pertama.", "Adakah 91 dalam jujukan itu? Tunjukkan jalan kerja."],
      answer: [
        ["42, 49, 56, 63, 70"],
        ["91 − 42 = 49 dan 49 ÷ 7 = 7", "Ya. 91 dicapai selepas menambah 7 sebanyak tujuh kali."],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    dlp: {
      prompt: "Consider −15, −11, −7, −3, 1.",
      parts: [
        "Find the difference between each pair of consecutive numbers.",
        "Is it a sequence? Give a reason.",
      ],
      answer: [
        ["−11 − (−15) = 4, −7 − (−11) = 4, −3 − (−7) = 4, 1 − (−3) = 4"],
        ["Yes. The same rule, add 4, continues throughout."],
      ],
    },
    bm: {
      prompt: "Pertimbangkan −15, −11, −7, −3, 1.",
      parts: [
        "Cari beza antara setiap pasangan nombor berturutan.",
        "Adakah ia suatu jujukan? Berikan alasan.",
      ],
      answer: [
        ["−11 − (−15) = 4, −7 − (−11) = 4, −3 − (−7) = 4, 1 − (−3) = 4"],
        ["Ya. Peraturan yang sama, tambah 4, berterusan sepanjang senarai."],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    answerVisuals: [
      {
        kind: "sequence-steps",
        title: t("The increase grows by 1", "Pertambahan bertambah 1"),
        terms: [2, 5, 9, 14, 20, 27],
        steps: ["+3", "+4", "+5", "+6", "+7"],
        highlight: [5],
      },
    ],
    dlp: {
      prompt: "The sequence is 2, 5, 9, 14, 20, …",
      parts: ["Find the increase between consecutive terms.", "Find the next term."],
      answer: [
        ["+3, +4, +5, +6: each increase is 1 more than the last."],
        ["The next increase is +7.", "20 + 7 = 27"],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 2, 5, 9, 14, 20, …",
      parts: ["Cari pertambahan antara sebutan berturutan.", "Cari sebutan seterusnya."],
      answer: [
        ["+3, +4, +5, +6: setiap pertambahan 1 lebih daripada sebelumnya."],
        ["Pertambahan seterusnya ialah +7.", "20 + 7 = 27"],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    dlp: {
      prompt: "The sequence is ½, 1, 1½, 2, …",
      parts: ["State the pattern.", "Find the next two terms."],
      answer: [["1 − ½ = ½, so add ½ to the previous number."], ["2 + ½ = 2½", "2½ + ½ = 3"]],
    },
    bm: {
      prompt: "Jujukan ialah ½, 1, 1½, 2, …",
      parts: ["Nyatakan coraknya.", "Cari dua sebutan seterusnya."],
      answer: [
        ["1 − ½ = ½, maka tambah ½ kepada nombor sebelumnya."],
        ["2 + ½ = 2½", "2½ + ½ = 3"],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "practice",
    visuals: [
      {
        kind: "object-stages",
        title: t("Blocks in each tower", "Blok dalam setiap menara"),
        object: "block",
        stages: [
          { label: t("Tower 1", "Menara 1"), count: 3 },
          { label: t("Tower 2", "Menara 2"), count: 7 },
          { label: t("Tower 3", "Menara 3"), count: 11 },
        ],
      },
    ],
    dlp: {
      prompt: "The numbers of blocks in the towers form a sequence.",
      parts: ["State the pattern.", "Find the number of blocks in Tower 6."],
      answer: [
        ["7 − 3 = 4 and 11 − 7 = 4, so add 4 blocks each time."],
        ["Tower 4: 15, Tower 5: 19", "Tower 6: 19 + 4 = 23 blocks"],
      ],
    },
    bm: {
      prompt: "Bilangan blok dalam menara-menara itu membentuk suatu jujukan.",
      parts: ["Nyatakan coraknya.", "Cari bilangan blok dalam Menara 6."],
      answer: [
        ["7 − 3 = 4 dan 11 − 7 = 4, maka tambah 4 blok setiap kali."],
        ["Menara 4: 15, Menara 5: 19", "Menara 6: 19 + 4 = 23 blok"],
      ],
    },
  },

  // Challenge Review
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("School bus departures", "Waktu bas sekolah bertolak"),
        rows: [
          { label: t("Bus", "Bas"), cells: ["1", "2", "3", "4", "5"] },
          {
            label: t("Leaves", "Bertolak"),
            cells: [t("6:40 a.m.", "6:40 pagi"), t("7:05 a.m.", "7:05 pagi"), null, null, null],
          },
        ],
      },
    ],
    dlp: {
      prompt:
        "The first school bus leaves the housing-area bus stop at 6:40 a.m. A bus leaves every 25 minutes.",
      parts: [
        "Complete the departure times for Buses 3 to 5.",
        "The journey to school takes 35 minutes and Aiman must arrive by 7:45 a.m. Which is the latest bus he can take? Justify your answer.",
        "One morning Aiman reaches the stop at 8:05 a.m. When does the next bus leave, and how long does he wait?",
      ],
      answer: [
        ["Add 25 minutes each time: 7:30 a.m., 7:55 a.m., 8:20 a.m."],
        [
          "He must leave by 7:45 a.m. − 35 minutes = 7:10 a.m.",
          "Buses leave at 7:05 a.m. and 7:30 a.m.; 7:30 a.m. is too late.",
          "The 7:05 a.m. bus (Bus 2) is the latest he can take. It arrives at 7:40 a.m.",
        ],
        [
          "The 7:55 a.m. bus has already left, so the next bus is at 8:20 a.m.",
          "Wait: 8:20 − 8:05 = 15 minutes",
        ],
      ],
    },
    bm: {
      prompt:
        "Bas sekolah pertama bertolak dari perhentian bas taman perumahan pada 6:40 pagi. Sebuah bas bertolak setiap 25 minit.",
      parts: [
        "Lengkapkan masa bertolak bagi Bas 3 hingga 5.",
        "Perjalanan ke sekolah mengambil masa 35 minit dan Aiman mesti tiba selewat-lewatnya pada 7:45 pagi. Bas manakah yang paling lewat dia boleh naik? Wajarkan jawapan anda.",
        "Pada suatu pagi Aiman tiba di perhentian pada 8:05 pagi. Bilakah bas seterusnya bertolak, dan berapa lama dia menunggu?",
      ],
      answer: [
        ["Tambah 25 minit setiap kali: 7:30 pagi, 7:55 pagi, 8:20 pagi."],
        [
          "Dia mesti bertolak selewat-lewatnya 7:45 pagi − 35 minit = 7:10 pagi.",
          "Bas bertolak pada 7:05 pagi dan 7:30 pagi; 7:30 pagi terlalu lewat.",
          "Bas 7:05 pagi (Bas 2) ialah yang paling lewat dia boleh naik. Bas itu tiba pada 7:40 pagi.",
        ],
        [
          "Bas 7:55 pagi sudah bertolak, maka bas seterusnya pada 8:20 pagi.",
          "Menunggu: 8:20 − 8:05 = 15 minit",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "sequence-steps",
        title: t(
          "Water left at the end of each day (litres)",
          "Air yang tinggal pada akhir setiap hari (liter)",
        ),
        terms: [500, 455, 410, null],
        steps: ["−45", "−45", "−45"],
      },
    ],
    dlp: {
      prompt:
        "The school's rainwater tank holds 500 litres at the start of the dry season. The gardening club uses 45 litres each day and it does not rain.",
      parts: [
        "Find the volume left at the end of Day 3.",
        "At the end of which day is the volume first less than 100 litres?",
        "The dry season is forecast to last 12 days. Will the water last the whole season? Justify your answer.",
      ],
      answer: [
        ["500, 455, 410, 365", "365 litres are left at the end of Day 3."],
        [
          "After d days: 500 − 45d litres.",
          "Day 8: 500 − 360 = 140; Day 9: 500 − 405 = 95",
          "The volume is first below 100 litres at the end of Day 9.",
        ],
        [
          "Day 11: 500 − 495 = 5 litres left.",
          "Day 12 needs 45 litres but only 5 litres remain.",
          "No. The tank runs out during Day 12, so the water does not last the whole season.",
        ],
      ],
    },
    bm: {
      prompt:
        "Tangki air hujan sekolah mengandungi 500 liter pada awal musim kemarau. Kelab berkebun menggunakan 45 liter setiap hari dan hujan tidak turun.",
      parts: [
        "Cari isi padu air yang tinggal pada akhir Hari 3.",
        "Pada akhir hari keberapakah isi padu air mula-mula kurang daripada 100 liter?",
        "Musim kemarau dijangka berlarutan selama 12 hari. Adakah air itu cukup untuk seluruh musim? Wajarkan jawapan anda.",
      ],
      answer: [
        ["500, 455, 410, 365", "365 liter tinggal pada akhir Hari 3."],
        [
          "Selepas d hari: 500 − 45d liter.",
          "Hari 8: 500 − 360 = 140; Hari 9: 500 − 405 = 95",
          "Isi padu mula-mula kurang daripada 100 liter pada akhir Hari 9.",
        ],
        [
          "Hari 11: 500 − 495 = 5 liter tinggal.",
          "Hari 12 memerlukan 45 liter tetapi hanya 5 liter yang tinggal.",
          "Tidak. Air dalam tangki habis semasa Hari 12, maka air itu tidak cukup untuk seluruh musim.",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Savings at the end of each week (RM)", "Simpanan pada akhir setiap minggu (RM)"),
        rows: [
          { label: t("Week", "Minggu"), cells: ["1", "2", "3", "4", "5"] },
          { label: "Aiman", cells: ["20", "28", null, null, null] },
          { label: "Sarah", cells: ["60", "64", null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "Aiman and Sarah are saving for the class trip. Aiman has RM20 at the end of Week 1 and saves RM8 more each week. Sarah has RM60 at the end of Week 1 and saves RM4 more each week.",
      parts: [
        "Complete the table for Weeks 3 to 5.",
        "In which week do they first have the same amount? Explain your method.",
        "Who has more money at the end of Week 15, and by how much?",
      ],
      answer: [
        ["Aiman: 36, 44, 52", "Sarah: 68, 72, 76"],
        [
          "In Week 1 Sarah has RM40 more. The gap shrinks by 8 − 4 = RM4 each week.",
          "40 ÷ 4 = 10 weeks after Week 1, so Week 11.",
          "Check: Aiman 20 + 10 × 8 = 100; Sarah 60 + 10 × 4 = 100 ✓",
        ],
        [
          "Week 15 is 14 weeks after Week 1.",
          "Aiman: 20 + 14 × 8 = 132; Sarah: 60 + 14 × 4 = 116",
          "Aiman has RM16 more.",
        ],
      ],
    },
    bm: {
      prompt:
        "Aiman dan Sarah menyimpan wang untuk lawatan kelas. Aiman mempunyai RM20 pada akhir Minggu 1 dan menyimpan RM8 lagi setiap minggu. Sarah mempunyai RM60 pada akhir Minggu 1 dan menyimpan RM4 lagi setiap minggu.",
      parts: [
        "Lengkapkan jadual bagi Minggu 3 hingga 5.",
        "Pada minggu keberapakah mereka mula-mula mempunyai jumlah wang yang sama? Terangkan kaedah anda.",
        "Siapakah yang mempunyai lebih banyak wang pada akhir Minggu 15, dan berapa banyak lebih?",
      ],
      answer: [
        ["Aiman: 36, 44, 52", "Sarah: 68, 72, 76"],
        [
          "Pada Minggu 1 Sarah mempunyai RM40 lebih. Beza itu berkurang sebanyak 8 − 4 = RM4 setiap minggu.",
          "40 ÷ 4 = 10 minggu selepas Minggu 1, iaitu Minggu 11.",
          "Semak: Aiman 20 + 10 × 8 = 100; Sarah 60 + 10 × 4 = 100 ✓",
        ],
        [
          "Minggu 15 ialah 14 minggu selepas Minggu 1.",
          "Aiman: 20 + 14 × 8 = 132; Sarah: 60 + 14 × 4 = 116",
          "Aiman mempunyai RM16 lebih.",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Nasi lemak price at the carnival", "Harga nasi lemak di karnival"),
        rows: [
          {
            label: t("Time", "Masa"),
            cells: [
              t("2:00 p.m.", "2:00 petang"),
              t("2:30 p.m.", "2:30 petang"),
              t("3:00 p.m.", "3:00 petang"),
              t("3:30 p.m.", "3:30 petang"),
            ],
          },
          { label: t("Price (RM)", "Harga (RM)"), cells: ["4.50", "4.10", null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "At the school carnival, a nasi lemak stall charges RM4.50 at 2:00 p.m. Every 30 minutes, the price drops by RM0.40.",
      parts: [
        "Complete the prices at 3:00 p.m. and 3:30 p.m.",
        "At what time does the price first fall below RM2.50?",
        "The stall closes at 6:00 p.m. A student says the last price is RM0.90. Check the claim and explain the student's mistake.",
      ],
      answer: [
        ["3:00 p.m.: RM4.10 − RM0.40 = RM3.70", "3:30 p.m.: RM3.70 − RM0.40 = RM3.30"],
        [
          "4:00 p.m.: RM2.90; 4:30 p.m.: RM2.50 (not below RM2.50)",
          "5:00 p.m.: RM2.50 − RM0.40 = RM2.10",
          "The price first falls below RM2.50 at 5:00 p.m.",
        ],
        [
          "From 2:00 p.m. to 6:00 p.m. there are 4 × 2 = 8 drops, one every 30 minutes.",
          "RM4.50 − 8 × RM0.40 = RM4.50 − RM3.20 = RM1.30",
          "The claim is wrong. RM0.90 comes from 9 drops; the student also counted the 2:00 p.m. price as a drop.",
        ],
      ],
    },
    bm: {
      prompt:
        "Di karnival sekolah, sebuah gerai nasi lemak mengenakan harga RM4.50 pada 2:00 petang. Setiap 30 minit, harganya turun sebanyak RM0.40.",
      parts: [
        "Lengkapkan harga pada 3:00 petang dan 3:30 petang.",
        "Pada pukul berapakah harga mula-mula turun di bawah RM2.50?",
        "Gerai itu ditutup pada 6:00 petang. Seorang murid berkata harga terakhir ialah RM0.90. Semak dakwaan itu dan terangkan kesilapan murid itu.",
      ],
      answer: [
        ["3:00 petang: RM4.10 − RM0.40 = RM3.70", "3:30 petang: RM3.70 − RM0.40 = RM3.30"],
        [
          "4:00 petang: RM2.90; 4:30 petang: RM2.50 (bukan di bawah RM2.50)",
          "5:00 petang: RM2.50 − RM0.40 = RM2.10",
          "Harga mula-mula turun di bawah RM2.50 pada 5:00 petang.",
        ],
        [
          "Dari 2:00 petang hingga 6:00 petang terdapat 4 × 2 = 8 penurunan, satu setiap 30 minit.",
          "RM4.50 − 8 × RM0.40 = RM4.50 − RM3.20 = RM1.30",
          "Dakwaan itu salah. RM0.90 terhasil daripada 9 penurunan; murid itu turut mengira harga 2:00 petang sebagai satu penurunan.",
        ],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Views of the recycling-campaign video", "Tontonan video kempen kitar semula"),
        rows: [
          {
            label: t("Time", "Masa"),
            cells: [
              t("9 a.m.", "9 pagi"),
              t("10 a.m.", "10 pagi"),
              t("11 a.m.", "11 pagi"),
              t("12 noon", "12 tengah hari"),
              t("1 p.m.", "1 petang"),
            ],
          },
          { label: t("Views", "Tontonan"), cells: ["150", "300", null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "The school posts a recycling-campaign video. The number of views doubles every hour. It has 150 views at 9 a.m.",
      parts: [
        "Complete the table up to 1 p.m.",
        "The campaign team celebrates when the video passes 5000 views. At what time does this first happen?",
        "A student says there are 150 + 4 × 150 = 750 views at 1 p.m. Explain the error.",
      ],
      answer: [
        ["Multiply by 2 each hour: 600, 1200, 2400"],
        [
          "2 p.m.: 2400 × 2 = 4800",
          "3 p.m.: 4800 × 2 = 9600",
          "The views first pass 5000 at 3 p.m.",
        ],
        [
          "The student added 150 each hour, but the rule is multiply by 2.",
          "At 1 p.m. there are 2400 views.",
        ],
      ],
    },
    bm: {
      prompt:
        "Sekolah memuat naik video kempen kitar semula. Bilangan tontonan berganda dua setiap jam. Video itu mempunyai 150 tontonan pada 9 pagi.",
      parts: [
        "Lengkapkan jadual hingga 1 petang.",
        "Pasukan kempen meraikan apabila video itu melebihi 5000 tontonan. Pada pukul berapakah ini mula-mula berlaku?",
        "Seorang murid berkata terdapat 150 + 4 × 150 = 750 tontonan pada 1 petang. Terangkan kesilapannya.",
      ],
      answer: [
        ["Darab dengan 2 setiap jam: 600, 1200, 2400"],
        [
          "2 petang: 2400 × 2 = 4800",
          "3 petang: 4800 × 2 = 9600",
          "Tontonan mula-mula melebihi 5000 pada 3 petang.",
        ],
        [
          "Murid itu menambah 150 setiap jam, tetapi peraturannya ialah darab dengan 2.",
          "Pada 1 petang terdapat 2400 tontonan.",
        ],
      ],
    },
  },
];

// ─── 1.3 Patterns and Sequences ──────────────────────────────────────────────

const patternsAndSequences: MathF2C1FlashcardEntry[] = [
  // Concept Review
  {
    subtopic: "1.3",
    mode: "concept",
    dlp: {
      prompt: "Describe the pattern of 3, 7, 11, 15, … using (i) numbers and (ii) words.",
      answer: [["(i) Numbers: +4, +4, +4", "(ii) Words: add 4 to the previous number."]],
    },
    bm: {
      prompt: "Huraikan corak bagi 3, 7, 11, 15, … menggunakan (i) nombor dan (ii) perkataan.",
      answer: [["(i) Nombor: +4, +4, +4", "(ii) Perkataan: tambah 4 kepada nombor sebelumnya."]],
    },
  },
  {
    subtopic: "1.3",
    mode: "concept",
    answerVisuals: [
      {
        kind: "sequence-steps",
        title: t("Position and value", "Kedudukan dan nilai"),
        terms: [4, 8, 12, 16],
        showPositions: true,
        highlight: [2],
      },
    ],
    dlp: {
      prompt: "For 4, 8, 12, 16, …, state T₁ and T₄. Is T₃ equal to 3?",
      answer: [
        [
          "T₁ = 4 and T₄ = 16.",
          "No. T₃ is the 3rd term, so T₃ = 12. The 3 is the position, not the value.",
        ],
      ],
    },
    bm: {
      prompt: "Bagi 4, 8, 12, 16, …, nyatakan T₁ dan T₄. Adakah T₃ sama dengan 3?",
      answer: [
        [
          "T₁ = 4 dan T₄ = 16.",
          "Tidak. T₃ ialah sebutan ke-3, maka T₃ = 12. Nombor 3 ialah kedudukan, bukan nilai.",
        ],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "concept",
    dlp: {
      prompt: "Which expression gives 5, 8, 11, 14, … for n = 0, 1, 2, 3, …?\nA: 5 + 3n\nB: 3 + 5n",
      answer: [
        [
          "A. 5 + 3(0) = 5, 5 + 3(1) = 8, 5 + 3(2) = 11",
          "B gives 3, 8, 13, …, which is a different sequence.",
        ],
      ],
    },
    bm: {
      prompt:
        "Ungkapan manakah memberikan 5, 8, 11, 14, … bagi n = 0, 1, 2, 3, …?\nA: 5 + 3n\nB: 3 + 5n",
      answer: [
        [
          "A. 5 + 3(0) = 5, 5 + 3(1) = 8, 5 + 3(2) = 11",
          "B memberikan 3, 8, 13, …, iaitu jujukan yang berbeza.",
        ],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "concept",
    dlp: {
      prompt: "A pattern is written as 2 + 6n, where n = 0, 1, 2, … Write its first three terms.",
      answer: [
        [
          "n = 0: 2 + 6(0) = 2",
          "n = 1: 2 + 6(1) = 8",
          "n = 2: 2 + 6(2) = 14",
          "First three terms: 2, 8, 14",
        ],
      ],
    },
    bm: {
      prompt:
        "Suatu corak ditulis sebagai 2 + 6n, dengan n = 0, 1, 2, … Tulis tiga sebutan pertamanya.",
      answer: [
        [
          "n = 0: 2 + 6(0) = 2",
          "n = 1: 2 + 6(1) = 8",
          "n = 2: 2 + 6(2) = 14",
          "Tiga sebutan pertama: 2, 8, 14",
        ],
      ],
    },
  },

  // Practice Review
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "The sequence is 6, 10, 14, 18, …",
      parts: [
        "Describe the pattern in words.",
        "Write the pattern as an algebraic expression, using n = 0, 1, 2, 3, …",
      ],
      answer: [
        ["Add 4 to the previous number."],
        ["First term 6, add 4 each time: 6 + 4n", "Check n = 3: 6 + 4(3) = 18 ✓"],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 6, 10, 14, 18, …",
      parts: [
        "Huraikan corak itu dalam perkataan.",
        "Tulis corak itu sebagai ungkapan algebra, menggunakan n = 0, 1, 2, 3, …",
      ],
      answer: [
        ["Tambah 4 kepada nombor sebelumnya."],
        ["Sebutan pertama 6, tambah 4 setiap kali: 6 + 4n", "Semak n = 3: 6 + 4(3) = 18 ✓"],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "The sequence is 40, 33, 26, 19, …",
      parts: [
        "Describe the pattern using numbers.",
        "Write the pattern as an algebraic expression, using n = 0, 1, 2, 3, …",
      ],
      answer: [
        ["−7, −7, −7"],
        ["First term 40, subtract 7 each time: 40 − 7n", "Check n = 3: 40 − 7(3) = 19 ✓"],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 40, 33, 26, 19, …",
      parts: [
        "Huraikan corak itu menggunakan nombor.",
        "Tulis corak itu sebagai ungkapan algebra, menggunakan n = 0, 1, 2, 3, …",
      ],
      answer: [
        ["−7, −7, −7"],
        ["Sebutan pertama 40, tolak 7 setiap kali: 40 − 7n", "Semak n = 3: 40 − 7(3) = 19 ✓"],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "A sequence is given by 3 + 5n, where n = 0, 1, 2, …",
      parts: ["Write the first four terms.", "Find the term when n = 9 and state its position."],
      answer: [
        ["3, 8, 13, 18"],
        ["3 + 5(9) = 48", "n = 0 gives T₁, so n = 9 gives T₁₀. 48 is T₁₀."],
      ],
    },
    bm: {
      prompt: "Suatu jujukan diberi oleh 3 + 5n, dengan n = 0, 1, 2, …",
      parts: [
        "Tulis empat sebutan pertama.",
        "Cari sebutan apabila n = 9 dan nyatakan kedudukannya.",
      ],
      answer: [
        ["3, 8, 13, 18"],
        ["3 + 5(9) = 48", "n = 0 memberikan T₁, maka n = 9 memberikan T₁₀. 48 ialah T₁₀."],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "The sequence is 9, 16, 23, …",
      parts: ["State the pattern.", "Find T₅."],
      answer: [["Add 7 to the previous number."], ["T₄ = 23 + 7 = 30", "T₅ = 30 + 7 = 37"]],
    },
    bm: {
      prompt: "Jujukan ialah 9, 16, 23, …",
      parts: ["Nyatakan coraknya.", "Cari T₅."],
      answer: [["Tambah 7 kepada nombor sebelumnya."], ["T₄ = 23 + 7 = 30", "T₅ = 30 + 7 = 37"]],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Sequence", "Jujukan"),
        terms: [80, 74, 68, 62],
        showPositions: true,
      },
    ],
    dlp: {
      prompt: "The sequence is 80, 74, 68, 62, …",
      parts: ["State the pattern.", "Which term is 44?"],
      answer: [
        ["Subtract 6 from the previous number."],
        ["T₅ = 56, T₆ = 50, T₇ = 44", "44 is T₇, the 7th term."],
      ],
    },
    bm: {
      prompt: "Jujukan ialah 80, 74, 68, 62, …",
      parts: ["Nyatakan coraknya.", "Sebutan keberapakah 44?"],
      answer: [
        ["Tolak 6 daripada nombor sebelumnya."],
        ["T₅ = 56, T₆ = 50, T₇ = 44", "44 ialah T₇, iaitu sebutan ke-7."],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "In a sequence, T₁ = 12 and 9 is added each time.",
      parts: ["Find T₁₀.", "Find T₁₀ − T₄."],
      answer: [
        ["T₁₀ is 9 steps after T₁: 12 + 9(9) = 93"],
        ["T₄ = 12 + 3(9) = 39", "T₁₀ − T₄ = 93 − 39 = 54", "Check: 6 steps × 9 = 54 ✓"],
      ],
    },
    bm: {
      prompt: "Dalam suatu jujukan, T₁ = 12 dan 9 ditambah setiap kali.",
      parts: ["Cari T₁₀.", "Cari T₁₀ − T₄."],
      answer: [
        ["T₁₀ ialah 9 langkah selepas T₁: 12 + 9(9) = 93"],
        ["T₄ = 12 + 3(9) = 39", "T₁₀ − T₄ = 93 − 39 = 54", "Semak: 6 langkah × 9 = 54 ✓"],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Term positions", "Kedudukan sebutan"),
        terms: [null, null, null, null, null, 42],
        showPositions: true,
      },
    ],
    dlp: {
      prompt: "In a sequence, 5 is added each time and T₆ = 42.",
      parts: ["Find T₁.", "Find T₁₂."],
      answer: [
        ["T₁ is 5 steps before T₆: 42 − 5(5) = 17"],
        ["T₁₂ is 6 steps after T₆: 42 + 6(5) = 72"],
      ],
    },
    bm: {
      prompt: "Dalam suatu jujukan, 5 ditambah setiap kali dan T₆ = 42.",
      parts: ["Cari T₁.", "Cari T₁₂."],
      answer: [
        ["T₁ ialah 5 langkah sebelum T₆: 42 − 5(5) = 17"],
        ["T₁₂ ialah 6 langkah selepas T₆: 42 + 6(5) = 72"],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Term positions", "Kedudukan sebutan"),
        terms: [null, null, 20, null, null, null, 44],
        showPositions: true,
        continues: false,
      },
    ],
    dlp: {
      prompt: "The same number is added each time in a sequence. T₃ = 20 and T₇ = 44.",
      parts: ["Find the number that is added each time.", "Find T₁."],
      answer: [
        ["From T₃ to T₇ there are 4 steps.", "(44 − 20) ÷ 4 = 24 ÷ 4 = 6"],
        ["T₁ = 20 − 2(6) = 8"],
      ],
    },
    bm: {
      prompt: "Nombor yang sama ditambah setiap kali dalam suatu jujukan. T₃ = 20 dan T₇ = 44.",
      parts: ["Cari nombor yang ditambah setiap kali.", "Cari T₁."],
      answer: [
        ["Dari T₃ ke T₇ terdapat 4 langkah.", "(44 − 20) ÷ 4 = 24 ÷ 4 = 6"],
        ["T₁ = 20 − 2(6) = 8"],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    visuals: [
      {
        kind: "term-table",
        title: t("Feeding times", "Masa pemberian makanan"),
        rows: [
          { label: t("Feeding", "Pemberian"), cells: ["1", "2", "3"] },
          { label: t("Time", "Masa"), cells: [t("6:00 a.m.", "6:00 pagi"), null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "An automatic fish feeder feeds the fish 3 times a day at equal intervals. The first feeding is at 6:00 a.m.",
      parts: ["Find the interval between feedings.", "Find the time of the third feeding."],
      answer: [
        ["24 hours ÷ 3 = 8 hours"],
        [
          "T₁ = 6:00 a.m.",
          "T₂ = 6:00 a.m. + 8 hours = 2:00 p.m.",
          "T₃ = 2:00 p.m. + 8 hours = 10:00 p.m.",
        ],
      ],
    },
    bm: {
      prompt:
        "Sebuah alat pemberi makanan ikan automatik memberi makan ikan 3 kali sehari pada selang masa yang sama. Pemberian pertama ialah pada 6:00 pagi.",
      parts: [
        "Cari selang masa antara pemberian makanan.",
        "Cari masa pemberian makanan yang ketiga.",
      ],
      answer: [
        ["24 jam ÷ 3 = 8 jam"],
        [
          "T₁ = 6:00 pagi",
          "T₂ = 6:00 pagi + 8 jam = 2:00 petang",
          "T₃ = 2:00 petang + 8 jam = 10:00 malam",
        ],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "A sequence is given by 4 + 6n, where n = 0, 1, 2, …",
      parts: ["Solve 4 + 6n = 100.", "Is 100 a term of the sequence? If so, state its position."],
      answer: [
        ["6n = 96", "n = 16"],
        ["Yes, because n is a whole number.", "n = 0 is T₁, so n = 16 is T₁₇."],
      ],
    },
    bm: {
      prompt: "Suatu jujukan diberi oleh 4 + 6n, dengan n = 0, 1, 2, …",
      parts: [
        "Selesaikan 4 + 6n = 100.",
        "Adakah 100 suatu sebutan jujukan itu? Jika ya, nyatakan kedudukannya.",
      ],
      answer: [
        ["6n = 96", "n = 16"],
        ["Ya, kerana n ialah nombor bulat.", "n = 0 ialah T₁, maka n = 16 ialah T₁₇."],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "practice",
    dlp: {
      prompt: "A sequence is given by 3 + 4n, where n = 0, 1, 2, …",
      parts: [
        "Solve 3 + 4n = 50.",
        "Is 50 a term of the sequence? State the two terms nearest to 50.",
      ],
      answer: [
        ["4n = 47", "n = 11.75"],
        ["No. n must be a whole number.", "n = 11: 3 + 4(11) = 47", "n = 12: 3 + 4(12) = 51"],
      ],
    },
    bm: {
      prompt: "Suatu jujukan diberi oleh 3 + 4n, dengan n = 0, 1, 2, …",
      parts: [
        "Selesaikan 3 + 4n = 50.",
        "Adakah 50 suatu sebutan jujukan itu? Nyatakan dua sebutan yang paling hampir dengan 50.",
      ],
      answer: [
        ["4n = 47", "n = 11.75"],
        ["Tidak. n mesti nombor bulat.", "n = 11: 3 + 4(11) = 47", "n = 12: 3 + 4(12) = 51"],
      ],
    },
  },

  // Challenge Review
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "object-stages",
        title: t("Chairs in the first rows", "Kerusi dalam baris-baris pertama"),
        object: "chair",
        stages: [
          { label: t("Row 1", "Baris 1"), count: 8 },
          { label: t("Row 2", "Baris 2"), count: 11 },
        ],
        missingLabel: t("Row 3", "Baris 3"),
      },
      {
        kind: "term-table",
        title: t("Chairs in each row", "Kerusi dalam setiap baris"),
        rows: [
          { label: t("Row", "Baris"), cells: ["1", "2", "3", "4", "5"] },
          { label: t("Chairs", "Kerusi"), cells: ["8", null, null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "A school arranges chairs in rows for an assembly. Row 1 has 8 chairs. Each row has 3 more chairs than the row in front of it.",
      parts: [
        "Complete the table for Rows 1 to 5.",
        "Find the number of chairs in Row 12.",
        "Explain whether Row 20 can have exactly 60 chairs.",
      ],
      answer: [
        ["8, 11, 14, 17, 20"],
        ["Row 12 is 11 steps after Row 1.", "T₁₂ = 8 + 11(3) = 41 chairs"],
        ["T₂₀ = 8 + 19(3) = 65 chairs", "No. Row 20 has 65 chairs, not 60."],
      ],
      note: "Check: 60 − 8 = 52 is not a multiple of 3, so no row has exactly 60 chairs.",
    },
    bm: {
      prompt:
        "Sebuah sekolah menyusun kerusi dalam beberapa baris untuk perhimpunan. Baris 1 mempunyai 8 buah kerusi. Setiap baris mempunyai 3 buah kerusi lebih daripada baris di hadapannya.",
      parts: [
        "Lengkapkan jadual bagi Baris 1 hingga 5.",
        "Cari bilangan kerusi dalam Baris 12.",
        "Terangkan sama ada Baris 20 boleh mempunyai tepat 60 buah kerusi.",
      ],
      answer: [
        ["8, 11, 14, 17, 20"],
        ["Baris 12 ialah 11 langkah selepas Baris 1.", "T₁₂ = 8 + 11(3) = 41 buah kerusi"],
        ["T₂₀ = 8 + 19(3) = 65 buah kerusi", "Tidak. Baris 20 mempunyai 65 buah kerusi, bukan 60."],
      ],
      note: "Semak: 60 − 8 = 52 bukan gandaan 3, maka tiada baris yang mempunyai tepat 60 buah kerusi.",
    },
  },
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Seats in one stadium section", "Tempat duduk dalam satu bahagian stadium"),
        rows: [
          { label: t("Row", "Baris"), cells: ["1", "2", "3", "4", "5"] },
          { label: "n", cells: ["0", "1", "2", "3", "4"] },
          { label: t("Seats", "Tempat duduk"), cells: ["20", "24", null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "In one section of the school stadium, Row 1 has 20 seats and each row behind it has 4 more seats than the row in front.",
      parts: [
        "Write an algebraic expression for the number of seats in a row, using n = 0, 1, 2, … where n = 0 is Row 1.",
        "How many seats are in Row 15?",
        "A group of 30 friends wants to sit together in one row. Which is the first row that can seat all of them? Justify your answer.",
      ],
      answer: [
        ["Start with 20 and add 4 for each row: 20 + 4n"],
        ["Row 15 means n = 14.", "20 + 4(14) = 76 seats"],
        [
          "20 + 4n ≥ 30 gives 4n ≥ 10, so n ≥ 2.5.",
          "n = 2 (Row 3): 28 seats, not enough; n = 3 (Row 4): 32 seats.",
          "Row 4 is the first row that can seat all 30 friends.",
        ],
      ],
    },
    bm: {
      prompt:
        "Dalam satu bahagian stadium sekolah, Baris 1 mempunyai 20 tempat duduk dan setiap baris di belakangnya mempunyai 4 tempat duduk lebih daripada baris di hadapannya.",
      parts: [
        "Tulis ungkapan algebra bagi bilangan tempat duduk dalam satu baris, menggunakan n = 0, 1, 2, … dengan n = 0 ialah Baris 1.",
        "Berapakah bilangan tempat duduk dalam Baris 15?",
        "Sekumpulan 30 orang sahabat mahu duduk bersama dalam satu baris. Baris manakah yang pertama dapat memuatkan mereka semua? Wajarkan jawapan anda.",
      ],
      answer: [
        ["Mula dengan 20 dan tambah 4 bagi setiap baris: 20 + 4n"],
        ["Baris 15 bermaksud n = 14.", "20 + 4(14) = 76 tempat duduk"],
        [
          "20 + 4n ≥ 30 memberikan 4n ≥ 10, maka n ≥ 2.5.",
          "n = 2 (Baris 3): 28 tempat duduk, tidak mencukupi; n = 3 (Baris 4): 32 tempat duduk.",
          "Baris 4 ialah baris pertama yang dapat memuatkan kesemua 30 orang sahabat.",
        ],
      ],
    },
  },
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "sequence-steps",
        title: t(
          "Distance of each tree from the gate (m)",
          "Jarak setiap pokok dari pintu pagar (m)",
        ),
        terms: [2, 6, 10, 14, null],
        steps: ["+4", "+4", "+4", "+4"],
      },
    ],
    dlp: {
      prompt:
        "The gardening club plants trees along a 60 m path. The first tree is 2 m from the gate and the trees are 4 m apart.",
      parts: [
        "Write an algebraic expression for the distance of a tree from the gate, using n = 0, 1, 2, … where n = 0 is the first tree.",
        "How far from the gate is the 10th tree?",
        "No tree may be planted beyond the 60 m mark. How many trees can be planted, and how far from the gate is the last one? Justify your answer.",
      ],
      answer: [
        ["Start at 2 m and add 4 m for each tree: 2 + 4n metres"],
        ["The 10th tree is n = 9.", "2 + 4(9) = 38 m"],
        [
          "2 + 4n ≤ 60 gives 4n ≤ 58, so n ≤ 14.5.",
          "The largest whole number is n = 14: 2 + 4(14) = 58 m.",
          "n = 0 to 14 gives 15 trees; the last tree is 58 m from the gate.",
        ],
      ],
      note: "Common error: counting only 14 trees. n starts at 0, so n = 0 to 14 is 15 trees.",
    },
    bm: {
      prompt:
        "Kelab berkebun menanam pokok di sepanjang laluan sepanjang 60 m. Pokok pertama berada 2 m dari pintu pagar dan jarak antara pokok ialah 4 m.",
      parts: [
        "Tulis ungkapan algebra bagi jarak sebatang pokok dari pintu pagar, menggunakan n = 0, 1, 2, … dengan n = 0 ialah pokok pertama.",
        "Berapakah jarak pokok ke-10 dari pintu pagar?",
        "Tiada pokok boleh ditanam melepasi tanda 60 m. Berapakah bilangan pokok yang dapat ditanam, dan berapakah jarak pokok terakhir dari pintu pagar? Wajarkan jawapan anda.",
      ],
      answer: [
        ["Mula pada 2 m dan tambah 4 m bagi setiap pokok: 2 + 4n meter"],
        ["Pokok ke-10 ialah n = 9.", "2 + 4(9) = 38 m"],
        [
          "2 + 4n ≤ 60 memberikan 4n ≤ 58, maka n ≤ 14.5.",
          "Nombor bulat terbesar ialah n = 14: 2 + 4(14) = 58 m.",
          "n = 0 hingga 14 memberikan 15 batang pokok; pokok terakhir berada 58 m dari pintu pagar.",
        ],
      ],
      note: "Kesilapan biasa: mengira hanya 14 batang pokok. n bermula dengan 0, maka n = 0 hingga 14 ialah 15 batang pokok.",
    },
  },
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Clinic appointment slots", "Slot temu janji klinik"),
        rows: [
          { label: t("Slot", "Slot"), cells: ["1", "2", "3", "4"] },
          {
            label: t("Starts", "Mula"),
            cells: [t("8:30 a.m.", "8:30 pagi"), t("8:50 a.m.", "8:50 pagi"), null, null],
          },
        ],
      },
    ],
    dlp: {
      prompt:
        "A community clinic's morning appointment slots start every 20 minutes from 8:30 a.m. The last slot must start by 12:00 noon.",
      parts: [
        "Find the start time of the 7th slot.",
        "How many morning slots are there? Explain why the answer is not 10.",
        "26 patients book a morning slot. How many must be moved to the afternoon?",
      ],
      answer: [
        [
          "The 7th slot is 6 steps after the first: 6 × 20 = 120 minutes",
          "8:30 a.m. + 2 hours = 10:30 a.m.",
        ],
        [
          "From 8:30 a.m. to 12:00 noon is 210 minutes.",
          "210 ÷ 20 = 10.5, so 10 full steps after Slot 1.",
          "Slot 11 starts at 11:50 a.m. There are 11 slots.",
          "It is not 10: the 10 steps come after Slot 1, so Slot 1 must be added.",
        ],
        ["26 − 11 = 15 patients must be moved to the afternoon."],
      ],
      note: "Common error: 210 ÷ 20 = 10.5 → 10 slots. Slot 1 itself must also be counted.",
    },
    bm: {
      prompt:
        "Slot temu janji waktu pagi sebuah klinik komuniti bermula setiap 20 minit dari 8:30 pagi. Slot terakhir mesti bermula selewat-lewatnya pada 12:00 tengah hari.",
      parts: [
        "Cari masa mula slot ke-7.",
        "Berapakah bilangan slot waktu pagi? Terangkan mengapa jawapannya bukan 10.",
        "26 orang pesakit menempah slot waktu pagi. Berapa orang yang mesti dipindahkan ke waktu petang?",
      ],
      answer: [
        [
          "Slot ke-7 ialah 6 langkah selepas slot pertama: 6 × 20 = 120 minit",
          "8:30 pagi + 2 jam = 10:30 pagi",
        ],
        [
          "Dari 8:30 pagi hingga 12:00 tengah hari ialah 210 minit.",
          "210 ÷ 20 = 10.5, maka 10 langkah penuh selepas Slot 1.",
          "Slot 11 bermula pada 11:50 pagi. Terdapat 11 slot.",
          "Jawapannya bukan 10: 10 langkah itu berlaku selepas Slot 1, maka Slot 1 mesti ditambah.",
        ],
        ["26 − 11 = 15 orang pesakit mesti dipindahkan ke waktu petang."],
      ],
      note: "Kesilapan biasa: 210 ÷ 20 = 10.5 → 10 slot. Slot 1 juga mesti dikira.",
    },
  },
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Recyclable bottles collected (kg)", "Botol kitar semula yang dikumpul (kg)"),
        rows: [
          { label: t("Week", "Minggu"), cells: ["1", "2", "3", "4"] },
          { label: "n", cells: ["0", "1", "2", "3"] },
          { label: "kg", cells: ["35", "41", null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "During a community gotong-royong campaign, residents collect 35 kg of recyclable bottles in Week 1. The amount collected increases by 6 kg each week.",
      parts: [
        "Find the amount collected in Week 8.",
        "Write the amount collected as an algebraic expression, where n = 0 is Week 1.",
        "The recycling centre awards a certificate in the first week the collection reaches at least 100 kg. In which week is the certificate awarded? Justify your answer.",
      ],
      answer: [
        ["Week 8 is 7 weeks after Week 1.", "35 + 7 × 6 = 77 kg"],
        ["35 + 6n kg, where n = 0, 1, 2, …"],
        [
          "35 + 6n ≥ 100 gives 6n ≥ 65, so n ≥ 65 ÷ 6 ≈ 10.8.",
          "n = 10 (Week 11): 95 kg, not enough; n = 11 (Week 12): 101 kg.",
          "The certificate is awarded in Week 12.",
        ],
      ],
    },
    bm: {
      prompt:
        "Semasa kempen gotong-royong komuniti, penduduk mengumpul 35 kg botol kitar semula pada Minggu 1. Jumlah yang dikumpul bertambah 6 kg setiap minggu.",
      parts: [
        "Cari jumlah yang dikumpul pada Minggu 8.",
        "Tulis jumlah yang dikumpul sebagai ungkapan algebra, dengan n = 0 ialah Minggu 1.",
        "Pusat kitar semula memberikan sijil pada minggu pertama kutipan mencapai sekurang-kurangnya 100 kg. Pada minggu keberapakah sijil itu diberikan? Wajarkan jawapan anda.",
      ],
      answer: [
        ["Minggu 8 ialah 7 minggu selepas Minggu 1.", "35 + 7 × 6 = 77 kg"],
        ["35 + 6n kg, dengan n = 0, 1, 2, …"],
        [
          "35 + 6n ≥ 100 memberikan 6n ≥ 65, maka n ≥ 65 ÷ 6 ≈ 10.8.",
          "n = 10 (Minggu 11): 95 kg, tidak mencukupi; n = 11 (Minggu 12): 101 kg.",
          "Sijil itu diberikan pada Minggu 12.",
        ],
      ],
    },
  },
];

export const MATH_F2_C1_FLASHCARD_BANK: readonly MathF2C1FlashcardEntry[] = [
  ...patterns,
  ...sequences,
  ...patternsAndSequences,
];

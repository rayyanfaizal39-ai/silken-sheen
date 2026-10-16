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
        kind: "pascal-triangle",
        title: t("Pascal's Triangle, Rows 1–6", "Segi Tiga Pascal, Baris 1–6"),
        rows: 6,
        labelRows: true,
      },
    ],
    answerVisuals: [
      {
        kind: "term-table",
        title: t("Sums of the rows", "Hasil tambah baris"),
        rows: [
          { label: t("Row", "Baris"), cells: ["1", "2", "3", "4", "7"] },
          { label: t("Sum", "Hasil tambah"), cells: ["1", "2", "4", "8", "64"] },
        ],
      },
    ],
    dlp: {
      prompt: "Pascal's Triangle is shown for Rows 1 to 6.",
      parts: [
        "Write Row 7.",
        "Find the sum of each of Rows 1 to 4 and describe the pattern of the sums.",
        "Use your pattern to predict the sum of Row 7, then check it with (a).",
      ],
      answer: [
        ["Row 6 is 1, 5, 10, 10, 5, 1.", "Row 7: 1, 6, 15, 20, 15, 6, 1"],
        ["Sums: 1, 2, 4, 8", "Each sum is the previous sum × 2."],
        [
          "Prediction: 8 × 2 × 2 × 2 = 64 (Rows 5, 6, 7 are 16, 32, 64).",
          "Check: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64 ✓",
        ],
      ],
      note: "Common error: adding all the numbers of a row to build the next row. Only two neighbouring numbers are added.",
    },
    bm: {
      prompt: "Segi Tiga Pascal ditunjukkan bagi Baris 1 hingga 6.",
      parts: [
        "Tulis Baris 7.",
        "Cari hasil tambah setiap Baris 1 hingga 4 dan huraikan corak hasil tambah itu.",
        "Gunakan corak itu untuk meramal hasil tambah Baris 7, kemudian semak dengan (a).",
      ],
      answer: [
        ["Baris 6 ialah 1, 5, 10, 10, 5, 1.", "Baris 7: 1, 6, 15, 20, 15, 6, 1"],
        ["Hasil tambah: 1, 2, 4, 8", "Setiap hasil tambah ialah hasil tambah sebelumnya × 2."],
        [
          "Ramalan: 8 × 2 × 2 × 2 = 64 (Baris 5, 6, 7 ialah 16, 32, 64).",
          "Semak: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64 ✓",
        ],
      ],
      note: "Kesilapan biasa: menambah semua nombor dalam satu baris untuk membina baris seterusnya. Hanya dua nombor bersebelahan ditambah.",
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "fibonacci-chain",
        title: t("Flowers in each ring", "Bunga dalam setiap gelang"),
        terms: [2, 3, 5, 8, null, null],
        showSums: true,
      },
    ],
    dlp: {
      prompt:
        "A garden has rings of flowers. Rings 1 to 4 have 2, 3, 5 and 8 flowers. Each ring has the sum of the flowers in the previous two rings.",
      parts: [
        "Find the number of flowers in Rings 5 and 6.",
        "Find the total number of flowers in Rings 1 to 6.",
        "Sarah says Ring 7 has 29 flowers because she added 8 to Ring 6. Explain her mistake and find the correct number.",
      ],
      answer: [
        ["Ring 5: 5 + 8 = 13", "Ring 6: 8 + 13 = 21"],
        ["2 + 3 + 5 + 8 + 13 + 21 = 52 flowers"],
        [
          "Sarah added a fixed number. The rule adds the previous two rings.",
          "Ring 7: 13 + 21 = 34 flowers",
        ],
      ],
    },
    bm: {
      prompt:
        "Sebuah taman mempunyai beberapa gelang bunga. Gelang 1 hingga 4 mempunyai 2, 3, 5 dan 8 kuntum bunga. Setiap gelang mempunyai hasil tambah bunga dalam dua gelang sebelumnya.",
      parts: [
        "Cari bilangan bunga dalam Gelang 5 dan Gelang 6.",
        "Cari jumlah bunga dalam Gelang 1 hingga 6.",
        "Sarah berkata Gelang 7 mempunyai 29 kuntum bunga kerana dia menambah 8 kepada Gelang 6. Terangkan kesilapannya dan cari bilangan yang betul.",
      ],
      answer: [
        ["Gelang 5: 5 + 8 = 13", "Gelang 6: 8 + 13 = 21"],
        ["2 + 3 + 5 + 8 + 13 + 21 = 52 kuntum"],
        [
          "Sarah menambah nombor tetap. Peraturannya ialah menambah dua gelang sebelumnya.",
          "Gelang 7: 13 + 21 = 34 kuntum",
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
        title: t("Cans stacked in triangles", "Tin disusun berbentuk segi tiga"),
        shape: "triangle",
        stages: [1, 2, 3],
      },
      {
        kind: "term-table",
        title: t("Cans in each stack", "Tin dalam setiap susunan"),
        rows: [
          { label: t("Stage", "Peringkat"), cells: ["1", "2", "3", "4", "5", "6"] },
          { label: t("Cans", "Tin"), cells: ["1", "3", "6", null, null, null] },
        ],
      },
    ],
    dlp: {
      prompt:
        "A shop stacks cans in triangles. Each new bottom row has one more can than the row above it.",
      parts: [
        "Complete the table for Stages 4 to 6.",
        "The shop has 50 cans. What is the largest complete stage it can build, and how many cans are left?",
        "How many more cans are needed to build the next stage?",
      ],
      answer: [
        ["Add 4, 5, 6: Stage 4 = 10, Stage 5 = 15, Stage 6 = 21"],
        [
          "Continue: 28, 36, 45, 55",
          "Stage 9 uses 45 cans; Stage 10 needs 55, which is more than 50.",
          "Largest: Stage 9, with 50 − 45 = 5 cans left.",
        ],
        ["55 − 50 = 5 more cans"],
      ],
    },
    bm: {
      prompt:
        "Sebuah kedai menyusun tin berbentuk segi tiga. Setiap baris bawah yang baharu mempunyai satu tin lebih daripada baris di atasnya.",
      parts: [
        "Lengkapkan jadual bagi Peringkat 4 hingga 6.",
        "Kedai itu mempunyai 50 tin. Apakah peringkat lengkap terbesar yang boleh dibina, dan berapakah tin yang tinggal?",
        "Berapakah tin lagi yang diperlukan untuk membina peringkat seterusnya?",
      ],
      answer: [
        ["Tambah 4, 5, 6: Peringkat 4 = 10, Peringkat 5 = 15, Peringkat 6 = 21"],
        [
          "Teruskan: 28, 36, 45, 55",
          "Peringkat 9 menggunakan 45 tin; Peringkat 10 memerlukan 55, iaitu lebih daripada 50.",
          "Terbesar: Peringkat 9, dengan 50 − 45 = 5 tin tinggal.",
        ],
        ["55 − 50 = 5 tin lagi"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "dot-pattern",
        title: t("Odd numbers as L-shaped layers", "Nombor ganjil sebagai lapisan berbentuk L"),
        shape: "square",
        stages: [1, 2, 3, 4],
        layers: true,
      },
    ],
    dlp: {
      prompt: "Each coloured L-shaped layer adds the next odd number of dots: 1, 3, 5, 7, …",
      parts: [
        "Find 1 + 3, 1 + 3 + 5 and 1 + 3 + 5 + 7.",
        "Describe the pattern of these sums using the diagram.",
        "Hence, find the sum of the first 10 odd numbers without adding them one by one.",
      ],
      answer: [
        ["1 + 3 = 4", "1 + 3 + 5 = 9", "1 + 3 + 5 + 7 = 16"],
        [
          "The sums are square numbers: 2², 3², 4².",
          "Adding the first k odd numbers completes a k × k square.",
        ],
        ["10² = 100", "Check: 1 + 3 + 5 + … + 19 = 100 ✓"],
      ],
    },
    bm: {
      prompt:
        "Setiap lapisan berwarna berbentuk L menambah nombor ganjil seterusnya: 1, 3, 5, 7, …",
      parts: [
        "Cari 1 + 3, 1 + 3 + 5 dan 1 + 3 + 5 + 7.",
        "Huraikan corak hasil tambah ini menggunakan rajah.",
        "Seterusnya, cari hasil tambah 10 nombor ganjil yang pertama tanpa menambahnya satu demi satu.",
      ],
      answer: [
        ["1 + 3 = 4", "1 + 3 + 5 = 9", "1 + 3 + 5 + 7 = 16"],
        [
          "Hasil tambahnya ialah nombor kuasa dua: 2², 3², 4².",
          "Menambah k nombor ganjil yang pertama melengkapkan segi empat sama k × k.",
        ],
        ["10² = 100", "Semak: 1 + 3 + 5 + … + 19 = 100 ✓"],
      ],
    },
  },
  {
    subtopic: "1.1",
    mode: "challenge",
    visuals: [
      {
        kind: "sequence-steps",
        title: t("Aiman's pattern", "Corak Aiman"),
        terms: [3, 6, 12, 24, 48],
        steps: ["×2", "×2", "×2", "×2"],
        continues: false,
      },
      {
        kind: "sequence-steps",
        title: t("Mei Ling's pattern", "Corak Mei Ling"),
        terms: [3, 6, 12, 21, 33],
        steps: ["+3", "+6", "+9", "+12"],
        continues: false,
      },
    ],
    dlp: {
      prompt: "A pattern starts 3, 6, 12, … Aiman and Mei Ling continue it differently.",
      parts: [
        "Describe each student's rule.",
        "Explain why the first three numbers are not enough to decide the pattern.",
        "The teacher says the 4th number is 24. Find the 6th number.",
      ],
      answer: [
        [
          "Aiman: multiply the previous number by 2.",
          "Mei Ling: add 3, 6, 9, 12, … (each increase is 3 more).",
        ],
        [
          "Both rules give 3, 6, 12, so both fit the given numbers.",
          "More terms or a stated rule are needed.",
        ],
        ["24 = 12 × 2, so the rule is × 2.", "5th: 24 × 2 = 48", "6th: 48 × 2 = 96"],
      ],
    },
    bm: {
      prompt: "Suatu corak bermula 3, 6, 12, … Aiman dan Mei Ling meneruskannya secara berbeza.",
      parts: [
        "Huraikan peraturan setiap murid.",
        "Terangkan mengapa tiga nombor pertama tidak cukup untuk menentukan corak.",
        "Guru berkata nombor ke-4 ialah 24. Cari nombor ke-6.",
      ],
      answer: [
        [
          "Aiman: darab nombor sebelumnya dengan 2.",
          "Mei Ling: tambah 3, 6, 9, 12, … (setiap pertambahan bertambah 3).",
        ],
        [
          "Kedua-dua peraturan memberikan 3, 6, 12, maka kedua-duanya sesuai dengan nombor yang diberi.",
          "Lebih banyak sebutan atau peraturan yang dinyatakan diperlukan.",
        ],
        ["24 = 12 × 2, maka peraturannya ialah × 2.", "Ke-5: 24 × 2 = 48", "Ke-6: 48 × 2 = 96"],
      ],
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
        title: t("Bus departures", "Waktu bas bertolak"),
        rows: [
          { label: t("Bus", "Bas"), cells: ["1", "2", "3", "4", "5"] },
          {
            label: t("Time", "Masa"),
            cells: [t("6:40 a.m.", "6:40 pagi"), t("7:05 a.m.", "7:05 pagi"), null, null, null],
          },
        ],
      },
    ],
    dlp: {
      prompt: "The first bus leaves at 6:40 a.m. A bus leaves every 25 minutes.",
      parts: [
        "Complete the times for Buses 3 to 5.",
        "Aiman arrives at the stop at 8:05 a.m. When does the next bus leave, and how long does he wait?",
        "How many buses leave from 6:40 a.m. to 9:00 a.m.?",
      ],
      answer: [
        ["Add 25 minutes each time: 7:30 a.m., 7:55 a.m., 8:20 a.m."],
        [
          "7:55 a.m. is before 8:05 a.m.; the next bus is 8:20 a.m.",
          "Wait: 8:20 − 8:05 = 15 minutes",
        ],
        [
          "Continue: 8:45 a.m., then 9:10 a.m. (after 9:00 a.m.).",
          "Buses 1 to 6 leave by 9:00 a.m.: 6 buses.",
        ],
      ],
      note: "Check: 6:40 a.m. + 5 × 25 minutes = 6:40 a.m. + 2 hours 5 minutes = 8:45 a.m. (Bus 6).",
    },
    bm: {
      prompt: "Bas pertama bertolak pada 6:40 pagi. Sebuah bas bertolak setiap 25 minit.",
      parts: [
        "Lengkapkan masa bagi Bas 3 hingga 5.",
        "Aiman tiba di perhentian pada 8:05 pagi. Bilakah bas seterusnya bertolak, dan berapa lama dia menunggu?",
        "Berapakah bilangan bas yang bertolak dari 6:40 pagi hingga 9:00 pagi?",
      ],
      answer: [
        ["Tambah 25 minit setiap kali: 7:30 pagi, 7:55 pagi, 8:20 pagi."],
        [
          "7:55 pagi adalah sebelum 8:05 pagi; bas seterusnya ialah 8:20 pagi.",
          "Menunggu: 8:20 − 8:05 = 15 minit",
        ],
        [
          "Teruskan: 8:45 pagi, kemudian 9:10 pagi (selepas 9:00 pagi).",
          "Bas 1 hingga 6 bertolak sebelum 9:00 pagi: 6 buah bas.",
        ],
      ],
      note: "Semak: 6:40 pagi + 5 × 25 minit = 6:40 pagi + 2 jam 5 minit = 8:45 pagi (Bas 6).",
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
        "A tank holds 500 litres of water. 45 litres are used each day and the tank is not refilled.",
      parts: [
        "Find the volume left at the end of Day 3.",
        "At the end of which day is the volume first less than 100 litres?",
        "Will the tank be empty within 11 days? Justify your answer.",
      ],
      answer: [
        ["410 − 45 = 365 litres"],
        [
          "After d days: 500 − 45d litres.",
          "Day 8: 500 − 360 = 140; Day 9: 500 − 405 = 95",
          "First below 100 litres at the end of Day 9.",
        ],
        [
          "Day 11: 500 − 45 × 11 = 500 − 495 = 5 litres.",
          "No. 5 litres are still left after 11 days; the tank runs out during Day 12.",
        ],
      ],
    },
    bm: {
      prompt:
        "Sebuah tangki mengandungi 500 liter air. 45 liter digunakan setiap hari dan tangki itu tidak diisi semula.",
      parts: [
        "Cari isi padu air yang tinggal pada akhir Hari 3.",
        "Pada akhir hari keberapakah isi padu air mula-mula kurang daripada 100 liter?",
        "Adakah tangki itu akan kosong dalam masa 11 hari? Wajarkan jawapan anda.",
      ],
      answer: [
        ["410 − 45 = 365 liter"],
        [
          "Selepas d hari: 500 − 45d liter.",
          "Hari 8: 500 − 360 = 140; Hari 9: 500 − 405 = 95",
          "Mula-mula kurang daripada 100 liter pada akhir Hari 9.",
        ],
        [
          "Hari 11: 500 − 45 × 11 = 500 − 495 = 5 liter.",
          "Tidak. Masih ada 5 liter selepas 11 hari; tangki itu kehabisan air semasa Hari 12.",
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
        "Aiman has RM20 at the end of Week 1 and saves RM8 more each week. Sarah has RM60 at the end of Week 1 and saves RM4 more each week.",
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
        "Aiman mempunyai RM20 pada akhir Minggu 1 dan menyimpan RM8 lagi setiap minggu. Sarah mempunyai RM60 pada akhir Minggu 1 dan menyimpan RM4 lagi setiap minggu.",
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
        kind: "sequence-steps",
        title: t("The given terms", "Sebutan yang diberi"),
        terms: [31, 25, 19, 13],
        steps: ["−6", "−6", "−6"],
        showPositions: true,
      },
    ],
    answerVisuals: [
      {
        kind: "sequence-steps",
        title: t(
          "Seven steps of −6 from the first to the 8th term",
          "Tujuh langkah −6 dari sebutan pertama ke sebutan ke-8",
        ),
        terms: [31, 25, 19, 13, 7, 1, -5, -11],
        steps: ["−6", "−6", "−6", "−6", "−6", "−6", "−6"],
        highlight: [6, 7],
        continues: false,
      },
    ],
    dlp: {
      prompt: "For 31, 25, 19, 13, …, a student writes: 8th term = 31 − 8 × 6 = −17.",
      parts: [
        "Find the 8th term by listing the terms.",
        "Explain the student's mistake.",
        "Find the first negative term and its position.",
      ],
      answer: [
        ["31, 25, 19, 13, 7, 1, −5, −11", "The 8th term is −11."],
        [
          "From the first term to the 8th term there are only 7 steps.",
          "Correct: 31 − 7 × 6 = 31 − 42 = −11",
        ],
        ["The first negative term is −5, the 7th term."],
      ],
    },
    bm: {
      prompt: "Bagi 31, 25, 19, 13, …, seorang murid menulis: sebutan ke-8 = 31 − 8 × 6 = −17.",
      parts: [
        "Cari sebutan ke-8 dengan menyenaraikan sebutan.",
        "Terangkan kesilapan murid itu.",
        "Cari sebutan negatif yang pertama dan kedudukannya.",
      ],
      answer: [
        ["31, 25, 19, 13, 7, 1, −5, −11", "Sebutan ke-8 ialah −11."],
        [
          "Dari sebutan pertama ke sebutan ke-8 hanya ada 7 langkah.",
          "Betul: 31 − 7 × 6 = 31 − 42 = −11",
        ],
        ["Sebutan negatif yang pertama ialah −5, iaitu sebutan ke-7."],
      ],
    },
  },
  {
    subtopic: "1.2",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Views of a school video", "Tontonan video sekolah"),
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
        "The number of views of a school video doubles every hour. It has 150 views at 9 a.m.",
      parts: [
        "Complete the table up to 1 p.m.",
        "At what time does the number of views first exceed 5000?",
        "A student says there are 150 + 4 × 150 = 750 views at 1 p.m. Explain the error.",
      ],
      answer: [
        ["Multiply by 2 each hour: 600, 1200, 2400"],
        [
          "2 p.m.: 2400 × 2 = 4800",
          "3 p.m.: 4800 × 2 = 9600",
          "The views first exceed 5000 at 3 p.m.",
        ],
        [
          "The student added 150 each hour, but the rule is multiply by 2.",
          "At 1 p.m. there are 2400 views.",
        ],
      ],
    },
    bm: {
      prompt:
        "Bilangan tontonan suatu video sekolah berganda dua setiap jam. Video itu mempunyai 150 tontonan pada 9 pagi.",
      parts: [
        "Lengkapkan jadual hingga 1 petang.",
        "Pada pukul berapakah bilangan tontonan mula-mula melebihi 5000?",
        "Seorang murid berkata terdapat 150 + 4 × 150 = 750 tontonan pada 1 petang. Terangkan kesilapannya.",
      ],
      answer: [
        ["Darab dengan 2 setiap jam: 600, 1200, 2400"],
        [
          "2 petang: 2400 × 2 = 4800",
          "3 petang: 4800 × 2 = 9600",
          "Bilangan tontonan mula-mula melebihi 5000 pada 3 petang.",
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
        kind: "matchstick-squares",
        title: t("Squares made from matchsticks", "Segi empat sama daripada batang mancis"),
        stages: [1, 2, 3],
      },
    ],
    dlp: {
      prompt:
        "Matchsticks are used to make squares in a row: 1 square needs 4 sticks, 2 squares need 7 and 3 squares need 10.",
      parts: [
        "Write an algebraic expression for the number of sticks, using n = 0, 1, 2, … where n = 0 is 1 square.",
        "How many sticks are needed for 15 squares?",
        "What is the greatest number of squares that can be made with 100 sticks? Are any sticks left over?",
      ],
      answer: [
        ["Each new square adds 3 sticks: 4 + 3n"],
        ["15 squares means n = 14.", "4 + 3(14) = 46 sticks"],
        [
          "4 + 3n = 100 gives 3n = 96, so n = 32.",
          "n = 32 is 33 squares, using exactly 100 sticks. No sticks are left over.",
        ],
      ],
      note: "Common error: 4 sticks per square gives 4 × 15 = 60. Neighbouring squares share a stick.",
    },
    bm: {
      prompt:
        "Batang mancis digunakan untuk membina segi empat sama dalam satu baris: 1 segi empat sama memerlukan 4 batang, 2 segi empat sama memerlukan 7 dan 3 segi empat sama memerlukan 10.",
      parts: [
        "Tulis ungkapan algebra bagi bilangan batang mancis, menggunakan n = 0, 1, 2, … dengan n = 0 ialah 1 segi empat sama.",
        "Berapakah batang mancis yang diperlukan untuk 15 segi empat sama?",
        "Berapakah bilangan segi empat sama yang terbanyak boleh dibina dengan 100 batang mancis? Adakah batang mancis yang berbaki?",
      ],
      answer: [
        ["Setiap segi empat sama baharu menambah 3 batang: 4 + 3n"],
        ["15 segi empat sama bermaksud n = 14.", "4 + 3(14) = 46 batang"],
        [
          "4 + 3n = 100 memberikan 3n = 96, maka n = 32.",
          "n = 32 ialah 33 segi empat sama, menggunakan tepat 100 batang. Tiada batang yang berbaki.",
        ],
      ],
      note: "Kesilapan biasa: 4 batang bagi setiap segi empat sama memberikan 4 × 15 = 60. Segi empat sama yang bersebelahan berkongsi satu batang.",
    },
  },
  {
    subtopic: "1.3",
    mode: "challenge",
    visuals: [
      {
        kind: "term-table",
        title: t("Three expressions for 5, 9, 13, 17, …", "Tiga ungkapan bagi 5, 9, 13, 17, …"),
        rows: [
          { label: t("Student", "Murid"), cells: ["Aiman", "Mei Ling", "Daniel"] },
          { label: t("Expression", "Ungkapan"), cells: ["5 + 4n", "4n + 1", "4n + 5"] },
          { label: t("Starts at", "Bermula"), cells: ["n = 0", "n = 1", "n = 1"] },
        ],
      },
    ],
    dlp: {
      prompt: "Three students write an expression for 5, 9, 13, 17, …",
      parts: [
        "Show that Aiman's and Mei Ling's expressions both give the first three terms.",
        "Use each of their expressions to find T₁₀.",
        "Explain Daniel's error.",
      ],
      answer: [
        ["Aiman, n = 0, 1, 2: 5, 9, 13", "Mei Ling, n = 1, 2, 3: 5, 9, 13"],
        ["Aiman: T₁₀ uses n = 9: 5 + 4(9) = 41", "Mei Ling: T₁₀ uses n = 10: 4(10) + 1 = 41"],
        [
          "Daniel, n = 1: 4(1) + 5 = 9. His sequence starts at the second term, 9, 13, 17, …",
          "With n starting at 1, the expression must give 5 when n = 1.",
        ],
      ],
      note: "Always state where n starts, then test the first term.",
    },
    bm: {
      prompt: "Tiga orang murid menulis ungkapan bagi 5, 9, 13, 17, …",
      parts: [
        "Tunjukkan bahawa ungkapan Aiman dan Mei Ling kedua-duanya memberikan tiga sebutan pertama.",
        "Gunakan setiap ungkapan mereka untuk mencari T₁₀.",
        "Terangkan kesilapan Daniel.",
      ],
      answer: [
        ["Aiman, n = 0, 1, 2: 5, 9, 13", "Mei Ling, n = 1, 2, 3: 5, 9, 13"],
        [
          "Aiman: T₁₀ menggunakan n = 9: 5 + 4(9) = 41",
          "Mei Ling: T₁₀ menggunakan n = 10: 4(10) + 1 = 41",
        ],
        [
          "Daniel, n = 1: 4(1) + 5 = 9. Jujukannya bermula pada sebutan kedua, 9, 13, 17, …",
          "Jika n bermula dengan 1, ungkapan itu mesti memberikan 5 apabila n = 1.",
        ],
      ],
      note: "Sentiasa nyatakan nilai permulaan n, kemudian uji sebutan pertama.",
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
        "A clinic's morning appointment slots start every 20 minutes from 8:30 a.m. The last slot must start by 12:00 noon.",
      parts: [
        "Find the start time of the 7th slot.",
        "How many morning slots are there?",
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
        ],
        ["26 − 11 = 15 patients"],
      ],
      note: "Common error: 210 ÷ 20 = 10.5 → 10 slots. Slot 1 itself must also be counted.",
    },
    bm: {
      prompt:
        "Slot temu janji waktu pagi sebuah klinik bermula setiap 20 minit dari 8:30 pagi. Slot terakhir mesti bermula selewat-lewatnya pada 12:00 tengah hari.",
      parts: [
        "Cari masa mula slot ke-7.",
        "Berapakah bilangan slot waktu pagi?",
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
        ],
        ["26 − 11 = 15 orang pesakit"],
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
        title: t("Weekly deposits (RM)", "Simpanan mingguan (RM)"),
        rows: [
          { label: t("Week", "Minggu"), cells: ["1", "2", "3", "4"] },
          { label: "n", cells: ["0", "1", "2", "3"] },
          { label: "RM", cells: ["5", "8", "11", null] },
        ],
      },
    ],
    dlp: {
      prompt: "Mei Ling saves RM5 in Week 1 and increases her deposit by RM3 every week.",
      parts: [
        "Find her deposit in Week 8.",
        "Write the deposit as an algebraic expression, where n = 0 is Week 1.",
        "In which week does her deposit first exceed RM60? Justify your answer.",
      ],
      answer: [
        ["Week 8 is n = 7: 5 + 3(7) = RM26"],
        ["5 + 3n, where n = 0, 1, 2, …"],
        [
          "5 + 3n > 60 means 3n > 55, so n > 55 ÷ 3 ≈ 18.3.",
          "n = 18: 5 + 54 = RM59 (not yet); n = 19: 5 + 57 = RM62",
          "n = 19 is Week 20.",
        ],
      ],
    },
    bm: {
      prompt:
        "Mei Ling menyimpan RM5 pada Minggu 1 dan menambah simpanannya sebanyak RM3 setiap minggu.",
      parts: [
        "Cari simpanannya pada Minggu 8.",
        "Tulis simpanan itu sebagai ungkapan algebra, dengan n = 0 ialah Minggu 1.",
        "Pada minggu keberapakah simpanannya mula-mula melebihi RM60? Wajarkan jawapan anda.",
      ],
      answer: [
        ["Minggu 8 ialah n = 7: 5 + 3(7) = RM26"],
        ["5 + 3n, dengan n = 0, 1, 2, …"],
        [
          "5 + 3n > 60 bermaksud 3n > 55, maka n > 55 ÷ 3 ≈ 18.3.",
          "n = 18: 5 + 54 = RM59 (belum); n = 19: 5 + 57 = RM62",
          "n = 19 ialah Minggu 20.",
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

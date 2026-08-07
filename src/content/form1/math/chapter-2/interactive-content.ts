// Form 1 Mathematics, Chapter 2 — Factors and Multiples / Faktor dan Gandaan
// Interactive bilingual content, ported from
// design-reference/math1-chapter2-factors-multiples-notes-v3.html. The
// division-ladder algorithms (hcfLadderRows/lcmLadderRows) already live in
// src/components/notes/blocks/DivisionLadder.tsx (used by Chapter 4) and
// are reused as-is here, not reimplemented. Content only — no presentation
// markup (rendered by MathF1Chapter2NotesBlock).
import type { LadderMode } from "@/components/notes/blocks/DivisionLadder";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC2SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 2.1 only — dot array showing a number as a rows×cols grid. */
  arrayGrid?: { n: number; rows: number; cols: number; caption: string };
  /** 2.1 only — factors-of-18-and-24 Venn illustration. */
  vennCaption?: string;
  /** 2.2 only — two rows of multiples with the LCM highlighted where they align. */
  multiplesCaption?: string;
  ladderDemo: { eyebrow: string; introText: string; mode: LadderMode; numbers: number[] };
  worked: { question: string; mode: LadderMode; numbers: number[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife: string[];
}

export interface MathF1C2Content {
  subtopics: MathC2SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Factors, Prime Factors and HCF",
      ideaParagraphs: [
        "A factor is a whole number that divides another number completely, with no remainder — 12 ÷ 3 = 4 exactly, so 3 and 4 are both factors of 12. Some factors are prime numbers too — these are prime factors.",
        "When two numbers share some factors, those shared ones are common factors. The largest shared factor is the Highest Common Factor (HCF).",
      ],
      arrayGrid: {
        n: 12,
        rows: 3,
        cols: 4,
        caption: "3 rows of 4 — one way to arrange 12 objects with no leftover",
      },
      vennCaption: "Where the circles overlap: shared factors — the largest is the HCF",
      ladderDemo: {
        eyebrow: "Prime Factorisation — the Division Ladder",
        introText: "Divide 60 repeatedly by the smallest prime that fits, until you reach 1.",
        mode: "factorise",
        numbers: [60],
      },
      worked: {
        question: "Find the HCF of 48, 64 and 80.",
        mode: "hcf",
        numbers: [48, 64, 80],
      },
      guided: {
        question: "Find the HCF of 18 and 24 by listing factors.",
        answer:
          "Factors of 18: 1,2,3,6,9,18. Factors of 24: 1,2,3,4,6,8,12,24. Common: 1,2,3,6. HCF = 6.",
      },
      mistake: {
        wrong: "Confusing HCF with LCM — picking the largest common MULTIPLE instead.",
        right: "HCF divides INTO the numbers (smaller); LCM is divided BY them (larger).",
      },
      practice: {
        easy: {
          question: "List all the factors of 40.",
          answer: "1, 2, 4, 5, 8, 10, 20, 40",
        },
        medium: {
          question: "Find the HCF of 36, 90 and 108.",
          answer: "HCF = 2 × 9 = 18",
        },
        hard: {
          question:
            "Three strings (192, 242, 328 cm) are cut into equal segments, no leftover. Segments per string?",
          answer: "HCF = 2 cm. Segments: 96, 121, 164 respectively.",
        },
      },
      realLife: ["🧱 Tiling floors", "📦 Packing equally into boxes"],
    },
    {
      num: "2.2",
      title: "Multiples, Common Multiples and LCM",
      ideaParagraphs: [
        "A multiple is what you get multiplying a number by 1, 2, 3… forever: 9, 18, 27… are all multiples of 9. When two numbers share a multiple, it's a common multiple. The smallest one is the Lowest Common Multiple (LCM).",
      ],
      multiplesCaption: "First number that lines up on both rows = LCM(6, 8) = 24",
      ladderDemo: {
        eyebrow: "LCM — the Common Division Ladder",
        introText:
          "Divide all numbers together by any prime that fits at least one, until every number reaches 1.",
        mode: "lcm",
        numbers: [6, 8],
      },
      worked: {
        question: "Find the LCM of 3, 8 and 12.",
        mode: "lcm",
        numbers: [3, 8, 12],
      },
      guided: {
        question:
          "A light blinks every 9 s, another every 12 s. Both blink together now — when again?",
        answer:
          "Find LCM(9,12). Multiples of 9: 9,18,27,36… of 12: 12,24,36… First shared: 36 seconds.",
      },
      mistake: {
        wrong: "For LCM, using only SHARED prime factors (like HCF does).",
        right: "LCM uses EVERY prime factor present, at its HIGHEST power.",
      },
      practice: {
        easy: {
          question: "List the first five multiples of 6 and 8.",
          answer: "6: 6,12,18,24,30. 8: 8,16,24,32,40.",
        },
        medium: {
          question: "Find the LCM of 8, 14 and 32.",
          answer: "LCM = 2⁵ × 7 = 224",
        },
        hard: {
          question:
            "Three friends cut equal-length ribbons into 15, 25, 30 cm pieces, no leftover. Shortest possible ribbon length?",
          answer: "LCM(15,25,30) = 150 cm",
        },
      },
      realLife: ["🎵 Syncing rhythms", "⏰ Repeating events"],
    },
  ],
  summary: {
    center: "Factors and Multiples",
    branches: [
      { title: "Factors", points: ["HCF: largest shared factor"] },
      { title: "Multiples", points: ["LCM: smallest shared multiple"] },
      { title: "Method", points: ["Prime factorisation is most reliable"] },
    ],
  },
  formulaSheet: [
    { formula: "HCF = lowest shared power", label: "of common primes only" },
    { formula: "LCM = highest power", label: "of every prime present" },
    { formula: "HCF ≤ n ≤ LCM", label: "quick sanity check" },
  ],
  quickRevision: [
    "I can list factors, prime factors, and find HCF.",
    "I can list multiples, common multiples, and find LCM.",
    "I can solve real-life problems using HCF and LCM.",
  ],
  examTips: [
    '"Max groups/packs, no leftover, equal shares" → almost always HCF.',
    '"When will they coincide again", "smallest number divisible by" → almost always LCM.',
  ],
  challenge: {
    question:
      "Ai Lin makes a scrapbook with 24 photos and 42 cuttings, each page having equal numbers, using ALL of them. (a) Max pages? (b) Photos and cuttings per page?",
    answer: "HCF(24,42)=6 pages. 24÷6=4 photos, 42÷6=7 cuttings per page.",
  },
};

const bm: MathF1C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Faktor, Faktor Perdana dan FSTB",
      ideaParagraphs: [
        "Faktor ialah nombor bulat yang membahagi nombor lain secara lengkap, tanpa baki — 12 ÷ 3 = 4 tepat, jadi 3 dan 4 kedua-duanya faktor bagi 12. Sesetengah faktor juga nombor perdana — ini faktor perdana.",
        "Apabila dua nombor berkongsi sesetengah faktor, yang dikongsi itu ialah faktor sepunya. Faktor sepunya terbesar ialah Faktor Sepunya Terbesar (FSTB).",
      ],
      arrayGrid: {
        n: 12,
        rows: 3,
        cols: 4,
        caption: "3 baris 4 — satu cara menyusun 12 objek tanpa baki",
      },
      vennCaption: "Di mana bulatan bertindih: faktor sepunya — yang terbesar ialah FSTB",
      ladderDemo: {
        eyebrow: "Pemfaktoran Perdana — Tangga Pembahagian",
        introText: "Bahagi 60 berulang dengan perdana terkecil yang sesuai, sehingga sampai 1.",
        mode: "factorise",
        numbers: [60],
      },
      worked: {
        question: "Cari FSTB bagi 48, 64 dan 80.",
        mode: "hcf",
        numbers: [48, 64, 80],
      },
      guided: {
        question: "Cari FSTB bagi 18 dan 24 dengan menyenaraikan faktor.",
        answer:
          "Faktor 18: 1,2,3,6,9,18. Faktor 24: 1,2,3,4,6,8,12,24. Sepunya: 1,2,3,6. FSTB = 6.",
      },
      mistake: {
        wrong: "Mengelirukan FSTB dengan GSTK — memilih gandaan sepunya terbesar.",
        right:
          "FSTB membahagi MASUK nombor (lebih kecil); GSTK dibahagi OLEH nombor (lebih besar).",
      },
      practice: {
        easy: {
          question: "Senaraikan semua faktor bagi 40.",
          answer: "1, 2, 4, 5, 8, 10, 20, 40",
        },
        medium: {
          question: "Cari FSTB bagi 36, 90 dan 108.",
          answer: "FSTB = 2 × 9 = 18",
        },
        hard: {
          question:
            "Tiga tali (192, 242, 328 cm) dipotong kepada segmen sama, tiada baki. Segmen setiap tali?",
          answer: "FSTB = 2 cm. Segmen: 96, 121, 164 masing-masing.",
        },
      },
      realLife: ["🧱 Memasang jubin", "📦 Mengemas sama rata ke kotak"],
    },
    {
      num: "2.2",
      title: "Gandaan, Gandaan Sepunya dan GSTK",
      ideaParagraphs: [
        "Gandaan ialah hasil mendarab sesuatu nombor dengan 1, 2, 3… tanpa had: 9, 18, 27… semuanya gandaan bagi 9. Apabila dua nombor berkongsi gandaan, ia gandaan sepunya. Yang terkecil ialah Gandaan Sepunya Terkecil (GSTK).",
      ],
      multiplesCaption: "Nombor pertama yang sepadan pada kedua-dua baris = GSTK(6, 8) = 24",
      ladderDemo: {
        eyebrow: "GSTK — Tangga Pembahagian Sepunya",
        introText:
          "Bahagi semua nombor bersama dengan sebarang perdana yang sesuai sekurang-kurangnya satu, sehingga setiap nombor sampai 1.",
        mode: "lcm",
        numbers: [6, 8],
      },
      worked: {
        question: "Cari GSTK bagi 3, 8 dan 12.",
        mode: "lcm",
        numbers: [3, 8, 12],
      },
      guided: {
        question:
          "Lampu berkelip setiap 9 saat, satu lagi setiap 12 saat. Serentak sekarang — bila lagi?",
        answer: "Cari GSTK(9,12). Gandaan 9: 9,18,27,36… 12: 12,24,36… Sepunya pertama: 36 saat.",
      },
      mistake: {
        wrong: "Bagi GSTK, guna hanya faktor perdana DIKONGSI (seperti FSTB).",
        right: "GSTK guna SETIAP faktor perdana hadir, pada kuasa TERTINGGI.",
      },
      practice: {
        easy: {
          question: "Senaraikan lima gandaan pertama bagi 6 dan 8.",
          answer: "6: 6,12,18,24,30. 8: 8,16,24,32,40.",
        },
        medium: {
          question: "Cari GSTK bagi 8, 14 dan 32.",
          answer: "GSTK = 2⁵ × 7 = 224",
        },
        hard: {
          question:
            "Tiga rakan potong reben sama panjang kepada kepingan 15, 25, 30 cm, tiada baki. Panjang reben terpendek?",
          answer: "GSTK(15,25,30) = 150 cm",
        },
      },
      realLife: ["🎵 Menyelaraskan rentak", "⏰ Peristiwa berulang"],
    },
  ],
  summary: {
    center: "Faktor dan Gandaan",
    branches: [
      { title: "Faktor", points: ["FSTB: faktor sepunya terbesar"] },
      { title: "Gandaan", points: ["GSTK: gandaan sepunya terkecil"] },
      { title: "Kaedah", points: ["Pemfaktoran perdana paling dipercayai"] },
    ],
  },
  formulaSheet: [
    { formula: "FSTB = kuasa sepunya terendah", label: "bagi perdana sepunya sahaja" },
    { formula: "GSTK = kuasa tertinggi", label: "bagi setiap perdana hadir" },
    { formula: "FSTB ≤ n ≤ GSTK", label: "semakan pantas" },
  ],
  quickRevision: [
    "Saya boleh menyenaraikan faktor, faktor perdana, dan mencari FSTB.",
    "Saya boleh menyenaraikan gandaan, gandaan sepunya, dan mencari GSTK.",
    "Saya boleh menyelesaikan masalah kehidupan sebenar menggunakan FSTB dan GSTK.",
  ],
  examTips: [
    '"Kumpulan/pek maksimum, tiada baki, kongsi sama" → hampir selalu FSTB.',
    '"Bila akan bertepatan lagi", "nombor terkecil dibahagi oleh" → hampir selalu GSTK.',
  ],
  challenge: {
    question:
      "Ai Lin buat skrapbook dengan 24 foto dan 42 keratan, setiap halaman jumlah sama, guna SEMUA. (a) Halaman maksimum? (b) Foto dan keratan setiap halaman?",
    answer: "FSTB(24,42)=6 halaman. 24÷6=4 foto, 42÷6=7 keratan setiap halaman.",
  },
};

export const mathF1C2InteractiveContent: { en: MathF1C2Content; bm: MathF1C2Content } = { en, bm };

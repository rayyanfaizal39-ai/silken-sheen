// Form 3 Mathematics, Chapter 2 — Standard Form / Bentuk Piawai. 2 official
// subtopics (2.1 Significant Figures, 2.2 Standard Form), built as normal.
// Interactive bilingual content. EN sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter2-standard-form-notes-v1.html.
// Content only — no presentation markup (rendered by MathF3Chapter2NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C2Visual =
  | { kind: "sigFig"; digits: string[]; significant: boolean[]; caption: string }
  | {
      kind: "decimalSlide";
      fromValue: string;
      toValue: string;
      exponentLabel: string;
      placesLabel: string;
      caption: string;
    };

export interface MathF3C2Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: {
    question: string;
    steps: WorkedStep[];
    visual?: Extract<MathF3C2Visual, { kind: "decimalSlide" }>;
  };
}

export interface MathF3C2SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C2Visual;
  blocks: MathF3C2Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C2Content {
  subtopics: MathF3C2SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Significant Figures",
      ideaParagraphs: [
        "Significant figures are the digits that carry real meaning about how precise a measurement is. Every non-zero digit counts. Zeros are trickier — some count, some don't, depending on where they sit.",
      ],
      visual: {
        kind: "sigFig",
        digits: ["0", ".", "0", "0", "5", "0", "2", "0"],
        significant: [false, false, false, false, true, true, true, true],
        caption:
          "0.005020 — red leading zeros don't count, green digits (including the trailing zero) do: 4 significant figures",
      },
      blocks: [
        {
          formula: {
            eyebrow: "The Rules",
            formula: "Leading zeros: NEVER count. Zeros between/after digits: USUALLY count.",
          },
          worked: {
            question: "State the number of significant figures: (a) 60 007 (b) 0.005020",
            steps: [
              {
                calc: "(a) 60 007 → 5 significant figures",
                why: "Every digit counts here — the zeros sit BETWEEN non-zero digits (6...7), and zeros between non-zero digits always count.",
              },
              {
                calc: "(b) 0.005020 → 4 significant figures",
                why: "The three leading zeros (before the 5) don't count. But 5,0,2,0 all count — the middle and trailing zeros do count once a non-zero digit has appeared.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "How many significant figures does 8750 have, if rounded to 2 significant figures?",
        answer: "Rounded to 2 sig figs: 8800 (keep the first 2 meaningful digits, round the rest).",
      },
      mistake: {
        wrong: "Counting the leading zeros in 0.007 as significant.",
        right:
          "Leading zeros only mark the decimal place — they never count. 0.007 has just ONE significant figure (the 7).",
      },
      practice: {
        easy: {
          question: "How many significant figures in 803?",
          answer: "3",
        },
        medium: {
          question: "How many significant figures in 0.03025?",
          answer: "4 (3,0,2,5 — the two leading zeros don't count)",
        },
        hard: {
          question: "Round 50.0042 to 3 significant figures, and explain which digits you kept.",
          answer:
            "50.0 — the digits 5, 0, 0 are the first 3 significant figures (the middle zero counts since it's between non-zero digits).",
        },
      },
      realLife: ["🔬 Scientific measurements", "💰 Price estimation"],
    },
    {
      num: "2.2",
      title: "Standard Form",
      ideaParagraphs: [
        "Slide the decimal point until only ONE digit sits in front of it — count how many places it moved, and that count becomes the power of 10. Move it LEFT (big numbers) → positive power. Move it RIGHT (tiny numbers) → negative power.",
      ],
      visual: {
        kind: "decimalSlide",
        fromValue: "2805.3",
        toValue: "2.8053",
        exponentLabel: "× 10³",
        placesLabel: "3 places left",
        caption:
          "The decimal point moved 3 places left to leave one digit in front — so the power is 3",
      },
      blocks: [
        {
          formula: { eyebrow: "Standard Form", formula: "A × 10ⁿ  (1 ≤ A < 10, n is an integer)" },
          worked: {
            question: "Write in standard form: (a) 2805.3 (b) 0.00325",
            steps: [
              {
                calc: "(a) 2805.3 = 2.8053 × 10³",
                why: "Move the decimal point 3 places left to leave one digit (2) in front — 3 places moved = power of 3.",
              },
              {
                calc: "(b) 0.00325 = 3.25 × 10⁻³",
                why: "Move the decimal point 3 places RIGHT this time (small number) — moving right gives a NEGATIVE power.",
              },
            ],
            visual: {
              kind: "decimalSlide",
              fromValue: "0.00325",
              toValue: "3.25",
              exponentLabel: "× 10⁻³",
              placesLabel: "3 places right",
              caption: "Moving right instead of left flips the power's sign to negative",
            },
          },
        },
      ],
      guided: {
        question: "Write 4.17 × 10⁵ as a single number.",
        answer: "Positive power → move the decimal point 5 places RIGHT: 417,000.",
      },
      mistake: {
        wrong: 'Writing 5.1 × 10⁰ or 51 × 10³ as "standard form".',
        right:
          "A MUST be between 1 and 10 (not including 10 itself) — 51×10³ isn't standard form since 51 is too big; it should be 5.1×10⁴.",
      },
      practice: {
        easy: {
          question: "Write 280 in standard form.",
          answer: "2.8 × 10²",
        },
        medium: {
          question: "Write 8.063 × 10⁻⁵ as a single number.",
          answer: "0.00008063",
        },
        hard: {
          question: "Determine 3050 terabytes in bytes, in standard form (1 tera = 10¹²).",
          answer: "3050×10¹² = (3.05×10³)×10¹² = 3.05×10¹⁵ bytes.",
        },
      },
      realLife: ["🌌 Astronomical distances", "🦠 Microscopic measurements"],
    },
  ],
  summary: {
    center: "Standard Form",
    branches: [
      { title: "Significant Figures", points: ["Leading zeros never count"] },
      { title: "Standard Form", points: ["A × 10ⁿ, 1≤A<10"] },
    ],
  },
  formulaSheet: [
    { formula: "A × 10ⁿ", label: "1 ≤ A < 10" },
    { formula: "Big numbers → positive n", label: "" },
    { formula: "Tiny numbers → negative n", label: "" },
  ],
  quickRevision: [
    "I can count significant figures in a number.",
    "I can convert numbers to and from standard form.",
  ],
  examTips: [
    "Count how many places the decimal point moves — that's your power of 10, every time.",
  ],
  challenge: {
    question:
      "Malaysia's population is approximately 3.35 × 10⁷, and its land area is approximately 3.3 × 10⁵ km². Estimate the population density (people per km²), giving your answer to 2 significant figures.",
    answer: "3.35×10⁷ ÷ 3.3×10⁵ = 1.015×10² ≈ 100 people/km² (2 s.f.).",
  },
};

const bm: MathF3C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Angka Bererti",
      ideaParagraphs: [
        "Angka bererti ialah digit membawa makna sebenar tentang seberapa tepat pengukuran. Setiap digit bukan sifar dikira. Sifar lebih rumit — sesetengah dikira, sesetengah tidak, bergantung di mana ia terletak.",
      ],
      visual: {
        kind: "sigFig",
        digits: ["0", ".", "0", "0", "5", "0", "2", "0"],
        significant: [false, false, false, false, true, true, true, true],
        caption:
          "0.005020 — sifar hadapan merah tidak dikira, digit hijau (termasuk sifar akhir) dikira: 4 angka bererti",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Peraturan",
            formula:
              "Sifar hadapan: TIDAK PERNAH dikira. Sifar antara/selepas digit: BIASANYA dikira.",
          },
          worked: {
            question: "Nyatakan bilangan angka bererti: (a) 60 007 (b) 0.005020",
            steps: [
              {
                calc: "(a) 60 007 → 5 angka bererti",
                why: "Setiap digit dikira di sini — sifar terletak ANTARA digit bukan sifar (6...7), dan sifar antara digit bukan sifar sentiasa dikira.",
              },
              {
                calc: "(b) 0.005020 → 4 angka bererti",
                why: "Tiga sifar hadapan (sebelum 5) tidak dikira. Tetapi 5,0,2,0 semua dikira — sifar tengah dan akhir dikira sebaik digit bukan sifar muncul.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Berapa angka bererti ada 8750, jika dibundarkan kepada 2 angka bererti?",
        answer:
          "Dibundarkan kepada 2 angka bererti: 8800 (kekalkan 2 digit bermakna pertama, bundarkan selebihnya).",
      },
      mistake: {
        wrong: "Mengira sifar hadapan dalam 0.007 sebagai bererti.",
        right:
          "Sifar hadapan hanya menanda tempat perpuluhan — tidak pernah dikira. 0.007 hanya ada SATU angka bererti (7).",
      },
      practice: {
        easy: {
          question: "Berapa angka bererti dalam 803?",
          answer: "3",
        },
        medium: {
          question: "Berapa angka bererti dalam 0.03025?",
          answer: "4 (3,0,2,5 — dua sifar hadapan tidak dikira)",
        },
        hard: {
          question:
            "Bundarkan 50.0042 kepada 3 angka bererti, dan jelaskan digit mana anda kekalkan.",
          answer:
            "50.0 — digit 5, 0, 0 ialah 3 angka bererti pertama (sifar tengah dikira kerana ia antara digit bukan sifar).",
        },
      },
      realLife: ["🔬 Pengukuran saintifik", "💰 Anggaran harga"],
    },
    {
      num: "2.2",
      title: "Bentuk Piawai",
      ideaParagraphs: [
        "Gelongsorkan titik perpuluhan sehingga hanya SATU digit terletak di hadapannya — kira berapa tempat ia bergerak, dan kiraan itu menjadi kuasa 10. Gerak KIRI (nombor besar) → kuasa positif. Gerak KANAN (nombor kecil) → kuasa negatif.",
      ],
      visual: {
        kind: "decimalSlide",
        fromValue: "2805.3",
        toValue: "2.8053",
        exponentLabel: "× 10³",
        placesLabel: "3 tempat kiri",
        caption:
          "Titik perpuluhan bergerak 3 tempat kiri untuk tinggalkan satu digit di hadapan — jadi kuasa ialah 3",
      },
      blocks: [
        {
          formula: { eyebrow: "Bentuk Piawai", formula: "A × 10ⁿ  (1 ≤ A < 10, n integer)" },
          worked: {
            question: "Tulis dalam bentuk piawai: (a) 2805.3 (b) 0.00325",
            steps: [
              {
                calc: "(a) 2805.3 = 2.8053 × 10³",
                why: "Gerak titik perpuluhan 3 tempat kiri untuk tinggalkan satu digit (2) di hadapan — 3 tempat bergerak = kuasa 3.",
              },
              {
                calc: "(b) 0.00325 = 3.25 × 10⁻³",
                why: "Gerak titik perpuluhan 3 tempat KANAN kali ini (nombor kecil) — bergerak kanan beri kuasa NEGATIF.",
              },
            ],
            visual: {
              kind: "decimalSlide",
              fromValue: "0.00325",
              toValue: "3.25",
              exponentLabel: "× 10⁻³",
              placesLabel: "3 tempat kanan",
              caption: "Bergerak kanan bukan kiri membalikkan tanda kuasa kepada negatif",
            },
          },
        },
      ],
      guided: {
        question: "Tulis 4.17 × 10⁵ sebagai nombor tunggal.",
        answer: "Kuasa positif → gerak titik perpuluhan 5 tempat KANAN: 417,000.",
      },
      mistake: {
        wrong: 'Menulis 5.1 × 10⁰ atau 51 × 10³ sebagai "bentuk piawai".',
        right:
          "A MESTI antara 1 dan 10 (tidak termasuk 10 sendiri) — 51×10³ bukan bentuk piawai kerana 51 terlalu besar; ia patut 5.1×10⁴.",
      },
      practice: {
        easy: {
          question: "Tulis 280 dalam bentuk piawai.",
          answer: "2.8 × 10²",
        },
        medium: {
          question: "Tulis 8.063 × 10⁻⁵ sebagai nombor tunggal.",
          answer: "0.00008063",
        },
        hard: {
          question: "Tentukan 3050 terabait dalam bait, dalam bentuk piawai (1 tera = 10¹²).",
          answer: "3050×10¹² = (3.05×10³)×10¹² = 3.05×10¹⁵ bait.",
        },
      },
      realLife: ["🌌 Jarak astronomi", "🦠 Pengukuran mikroskopik"],
    },
  ],
  summary: {
    center: "Bentuk Piawai",
    branches: [
      { title: "Angka Bererti", points: ["Sifar hadapan tidak pernah dikira"] },
      { title: "Bentuk Piawai", points: ["A × 10ⁿ, 1≤A<10"] },
    ],
  },
  formulaSheet: [
    { formula: "A × 10ⁿ", label: "1 ≤ A < 10" },
    { formula: "Nombor besar → n positif", label: "" },
    { formula: "Nombor kecil → n negatif", label: "" },
  ],
  quickRevision: [
    "Saya boleh kira angka bererti dalam nombor.",
    "Saya boleh tukar nombor ke dan dari bentuk piawai.",
  ],
  examTips: ["Kira berapa tempat titik perpuluhan bergerak — itu kuasa 10 anda, setiap kali."],
  challenge: {
    question:
      "Populasi Malaysia lebih kurang 3.35 × 10⁷, dan luas tanahnya lebih kurang 3.3 × 10⁵ km². Anggarkan kepadatan populasi (orang setiap km²), beri jawapan anda kepada 2 angka bererti.",
    answer: "3.35×10⁷ ÷ 3.3×10⁵ = 1.015×10² ≈ 100 orang/km² (2 a.b.).",
  },
};

export const mathF3C2InteractiveContent: { en: MathF3C2Content; bm: MathF3C2Content } = { en, bm };

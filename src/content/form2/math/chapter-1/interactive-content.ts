// Form 2 Mathematics, Chapter 1 — Patterns and Sequences / Pola dan Jujukan
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter1-patterns-sequences-notes-v2.html.
// Content only — no presentation markup (rendered by MathF2Chapter1NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C1IntroVisual =
  | { kind: "dotPattern"; counts: number[]; caption?: string }
  | {
      kind: "gapCheck";
      good: { values: number[]; gaps: number[] };
      bad: { values: number[]; gaps: number[] };
      goodLabel: string;
      badLabel: string;
    }
  | {
      kind: "ntermMachine";
      inputLabel: string;
      formula: string;
      outputLabel: string;
      caption?: string;
    };

export interface MathF2C1SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  introVisual?: MathF2C1IntroVisual;
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  afterMistakeVisual?: { kind: "pascalTriangle"; rows: number; caption?: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C1Content {
  subtopics: MathF2C1SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Patterns",
      ideaParagraphs: [
        "A pattern is a list that follows ONE repeated rule — always add the same amount, or always multiply by the same amount. Watch the dots below grow: every new step adds exactly 3 more.",
      ],
      introVisual: {
        kind: "dotPattern",
        counts: [1, 4, 7, 10],
        caption: "1, 4, 7, 10 — every step adds exactly 3 more dots",
      },
      formula: {
        eyebrow: "Two Ways a Pattern Can Repeat",
        formula: "+d / −d   or   ×r / ÷r",
        legend: [
          {
            label: "→",
            text: "If gaps aren't constant, try RATIOS instead (divide each term by the last)",
          },
        ],
      },
      worked: {
        question: "Find the pattern: (a) −10, −4, 2, 8, ... (b) 2, 6, 18, 54, ...",
        steps: [
          {
            calc: "(a) −10, −4, 2, 8: every gap = +6",
            why: 'Each number is 6 more than the last — same gap throughout means the rule is "add 6".',
          },
          {
            calc: "(b) 2, 6, 18, 54: every ratio = ×3",
            why: "Gaps here aren't constant (4, 12, 36), but each number IS 3 times the last — that's a multiplying pattern.",
          },
        ],
      },
      guided: {
        question: "Complete the Fibonacci sequence: 0, 1, 1, __, __, __, 8, 13, __, ...",
        answer: "Each term is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21.",
      },
      mistake: {
        wrong: "Only checking ADDITION and giving up if the gaps aren't equal.",
        right:
          "If gaps change but keep growing, try dividing consecutive terms — the pattern might be multiplication.",
      },
      afterMistakeVisual: {
        kind: "pascalTriangle",
        rows: 6,
        caption: "Every number is the sum of the two numbers directly above it",
      },
      practice: {
        easy: {
          question: "State the pattern: 5, 12, 19, 26, ...",
          answer: "Add 7 each time.",
        },
        medium: {
          question: "State the pattern: 144, 72, 36, 18, ...",
          answer: "Divide by 2 each time.",
        },
        hard: {
          question:
            "A series: 7, 12, 17, 22, ..., 67. Find the pattern for just the odd numbers in it.",
          answer: "Odd terms: 7, 17, 27, 37, 47, 57, 67 — each 10 more than the last.",
        },
      },
      realLife: ["🌻 Sunflower spirals", "🎨 Batik design"],
    },
    {
      num: "1.2",
      title: "Sequences",
      ideaParagraphs: [
        "A sequence is a pattern where the SAME rule works for every single gap, all the way through — not just the first one or two.",
      ],
      introVisual: {
        kind: "gapCheck",
        good: { values: [-10, -6, -2, 2, 6], gaps: [4, 4, 4, 4] },
        bad: { values: [4, 5, -7, 10, -14], gaps: [1, -12, 17, -24] },
        goodLabel: "same gap every time = sequence",
        badLabel: "gaps keep changing = NOT a sequence",
      },
      worked: {
        question: "Is this a sequence? (a) −10, −6, −2, 2, 6, ... (b) 4, 5, −7, 10, −14, ...",
        steps: [
          {
            calc: "(a) −10, −6, −2, 2, 6: gaps are +4, +4, +4, +4",
            why: "Every gap is exactly the same — this IS a sequence.",
          },
          {
            calc: "(b) 4, 5, −7, 10, −14: gaps are +1, −12, +17, −24",
            why: "The gaps keep changing with no repeating rule — this is NOT a sequence.",
          },
        ],
      },
      guided: {
        question: "Complete: 7, 13, __, 25, __, __, ...",
        answer: "13 − 7 = 6, so the rule is +6: 7, 13, 19, 25, 31, 37.",
      },
      mistake: {
        wrong: "Checking only the FIRST gap and assuming the rest matches.",
        right: "One broken gap disqualifies the whole list — always check EVERY gap.",
      },
      practice: {
        easy: {
          question: "Is 100, 116, 132, 148, ... a sequence?",
          answer: "Yes — every gap is +16.",
        },
        medium: {
          question: "Complete: 88, __, 64, 52, __, __, ...",
          answer: "Gap = −12. Sequence: 88, 76, 64, 52, 40, 28.",
        },
        hard: {
          question: 'Complete using "multiply the previous number by 3": 7, __, __, __, ...',
          answer: "7, 21, 63, 189, ...",
        },
      },
      realLife: ["💰 Compound savings", "🔭 Predicting orbits"],
    },
    {
      num: "1.3",
      title: "Patterns and Sequences",
      ideaParagraphs: [
        "To find the 50th seat number without counting all the way there, you need a shortcut formula — the nth term, written Tₙ. Feed in a position, get back the value at that position.",
      ],
      introVisual: {
        kind: "ntermMachine",
        inputLabel: "n=3",
        formula: "1+8n",
        outputLabel: "25",
        caption:
          "Feed in a position (n=3), the formula does the work, out comes the value (25 = 1+8×3)",
      },
      formula: {
        eyebrow: "Three Ways to Describe One Pattern",
        formula: "Numbers → Words → Algebra",
        legend: [{ label: "→", text: '1+8(0), 1+8(1)... → "add 8 to the previous" → 1+8n' }],
      },
      worked: {
        question: "State the 5th term for the sequence 2, 10, 18, ...",
        steps: [
          { calc: "2, 10, 18: gap = +8", why: "Find the rule first: 10−2=8, 18−10=8." },
          {
            calc: "T1=2, T2=10, T3=18, T4=26, T5=34",
            why: "Apply +8 repeatedly until you reach position 5.",
          },
          { calc: "The 5th term is 34", why: "T5 is the value AT position 5." },
        ],
      },
      guided: {
        question: "Given 65, 60, 55, 50, ..., which term equals 40?",
        answer: "Subtract 5 each time: 65, 60, 55, 50, 45, 40 — that's the 6th term.",
      },
      mistake: {
        wrong: "Confusing the VALUE of a term with its POSITION.",
        right:
          '"Find the 5th term" wants the VALUE there. "Which term equals 40" wants the POSITION.',
      },
      practice: {
        easy: {
          question: "Describe 3, 6, 9, 12, ... as an algebraic expression.",
          answer: "3n, n = 1, 2, 3, ...",
        },
        medium: {
          question: "Find the 7th term for −3, 5, 13, ...",
          answer: "Rule: +8. T1=−3, T2=5, T3=13, T4=21, T5=29, T6=37, T7=45.",
        },
        hard: {
          question:
            "Buses leave at 8:00, 8:30, 9:00 a.m. If the pattern continues, when does the 5th bus leave?",
          answer: "Every 30 min: 8:00, 8:30, 9:00, 9:30, 10:00 a.m.",
        },
      },
      realLife: ["🎟️ Seat numbering", "🚌 Timetables"],
    },
  ],
  summary: {
    center: "Patterns and Sequences",
    branches: [
      { title: "Patterns", points: ["One repeated rule"] },
      { title: "Sequences", points: ["Rule holds for EVERY gap"] },
      { title: "nth Term", points: ["Tₙ — shortcut to any position"] },
    ],
  },
  formulaSheet: [
    { formula: "Tₙ", label: "the nth term" },
    { formula: "0,1,1,2,3,5,8,...", label: "Fibonacci" },
    { formula: "1,1,2,1,3,3,1,...", label: "Pascal's Triangle" },
  ],
  quickRevision: [
    "I can recognise and describe patterns.",
    "I can tell whether a list of numbers is a sequence.",
    "I can find any term using Tₙ.",
  ],
  examTips: [
    "No constant gap? Try dividing consecutive terms instead.",
    "Always check EVERY gap before calling something a sequence.",
  ],
  challenge: {
    question:
      "A fish feeder feeds fish 4 times a day at equal intervals, starting 7:35 a.m. and ending exactly 24 hours later. What time is the 3rd feeding?",
    answer: "24÷4=6 hours apart. T1=7:35am, T2=1:35pm, T3=7:35pm.",
  },
};

const bm: MathF2C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Pola",
      ideaParagraphs: [
        "Pola ialah senarai mengikut SATU peraturan berulang — sentiasa tambah jumlah sama, atau sentiasa darab dengan jumlah sama. Lihat titik di bawah berkembang: setiap langkah baharu tambah tepat 3 lagi.",
      ],
      introVisual: {
        kind: "dotPattern",
        counts: [1, 4, 7, 10],
        caption: "1, 4, 7, 10 — setiap langkah tambah tepat 3 titik lagi",
      },
      formula: {
        eyebrow: "Dua Cara Pola Boleh Berulang",
        formula: "+d / −d   atau   ×r / ÷r",
        legend: [
          {
            label: "→",
            text: "Jika jurang tidak tetap, cuba NISBAH pula (bahagi setiap sebutan dengan yang lepas)",
          },
        ],
      },
      worked: {
        question: "Cari pola: (a) −10, −4, 2, 8, ... (b) 2, 6, 18, 54, ...",
        steps: [
          {
            calc: "(a) −10, −4, 2, 8: setiap jurang = +6",
            why: 'Setiap nombor 6 lebih daripada yang lepas — jurang sama sepanjangnya bermaksud peraturan ialah "tambah 6".',
          },
          {
            calc: "(b) 2, 6, 18, 54: setiap nisbah = ×3",
            why: "Jurang di sini tidak tetap (4, 12, 36), tetapi setiap nombor IALAH 3 kali yang lepas — itu pola pendaraban.",
          },
        ],
      },
      guided: {
        question: "Lengkapkan jujukan Fibonacci: 0, 1, 1, __, __, __, 8, 13, __, ...",
        answer: "Setiap sebutan ialah jumlah dua sebutan sebelumnya: 0, 1, 1, 2, 3, 5, 8, 13, 21.",
      },
      mistake: {
        wrong: "Hanya semak TAMBAH dan berhenti jika jurang tidak sama.",
        right:
          "Jika jurang berubah tetapi terus membesar, cuba bahagi sebutan berturutan — pola mungkin pendaraban.",
      },
      afterMistakeVisual: {
        kind: "pascalTriangle",
        rows: 6,
        caption: "Setiap nombor ialah jumlah dua nombor betul-betul di atasnya",
      },
      practice: {
        easy: {
          question: "Nyatakan pola: 5, 12, 19, 26, ...",
          answer: "Tambah 7 setiap kali.",
        },
        medium: {
          question: "Nyatakan pola: 144, 72, 36, 18, ...",
          answer: "Bahagi dengan 2 setiap kali.",
        },
        hard: {
          question:
            "Satu siri: 7, 12, 17, 22, ..., 67. Cari pola bagi nombor ganjil sahaja di dalamnya.",
          answer:
            "Sebutan ganjil: 7, 17, 27, 37, 47, 57, 67 — setiap satu 10 lebih daripada yang lepas.",
        },
      },
      realLife: ["🌻 Lingkaran bunga matahari", "🎨 Reka bentuk batik"],
    },
    {
      num: "1.2",
      title: "Jujukan",
      ideaParagraphs: [
        "Jujukan ialah pola di mana peraturan SAMA berfungsi untuk setiap jurang, sepanjangnya — bukan hanya satu atau dua yang pertama.",
      ],
      introVisual: {
        kind: "gapCheck",
        good: { values: [-10, -6, -2, 2, 6], gaps: [4, 4, 4, 4] },
        bad: { values: [4, 5, -7, 10, -14], gaps: [1, -12, 17, -24] },
        goodLabel: "jurang sama setiap kali = jujukan",
        badLabel: "jurang sentiasa berubah = BUKAN jujukan",
      },
      worked: {
        question: "Adakah ini jujukan? (a) −10, −6, −2, 2, 6, ... (b) 4, 5, −7, 10, −14, ...",
        steps: [
          {
            calc: "(a) −10, −6, −2, 2, 6: jurang ialah +4, +4, +4, +4",
            why: "Setiap jurang tepat sama — ini ADALAH jujukan.",
          },
          {
            calc: "(b) 4, 5, −7, 10, −14: jurang ialah +1, −12, +17, −24",
            why: "Jurang terus berubah tanpa peraturan berulang — ini BUKAN jujukan.",
          },
        ],
      },
      guided: {
        question: "Lengkapkan: 7, 13, __, 25, __, __, ...",
        answer: "13−7=6, jadi peraturan +6: 7, 13, 19, 25, 31, 37.",
      },
      mistake: {
        wrong: "Semak hanya jurang PERTAMA dan anggap selebihnya sepadan.",
        right: "Satu jurang pecah membatalkan keseluruhan senarai — sentiasa semak SETIAP jurang.",
      },
      practice: {
        easy: {
          question: "Adakah 100, 116, 132, 148, ... jujukan?",
          answer: "Ya — setiap jurang ialah +16.",
        },
        medium: {
          question: "Lengkapkan: 88, __, 64, 52, __, __, ...",
          answer: "Jurang = −12. Jujukan: 88, 76, 64, 52, 40, 28.",
        },
        hard: {
          question: 'Lengkapkan guna "darab nombor sebelumnya dengan 3": 7, __, __, __, ...',
          answer: "7, 21, 63, 189, ...",
        },
      },
      realLife: ["💰 Simpanan kompaun", "🔭 Meramal orbit"],
    },
    {
      num: "1.3",
      title: "Pola dan Jujukan",
      ideaParagraphs: [
        "Untuk cari nombor kerusi ke-50 tanpa mengira sepanjang jalan, anda perlukan formula jalan pintas — sebutan ke-n, ditulis Tₙ. Masukkan kedudukan, dapat semula nilai pada kedudukan itu.",
      ],
      introVisual: {
        kind: "ntermMachine",
        inputLabel: "n=3",
        formula: "1+8n",
        outputLabel: "25",
        caption: "Masukkan kedudukan (n=3), formula buat kerja, keluar nilai (25 = 1+8×3)",
      },
      formula: {
        eyebrow: "Tiga Cara Terangkan Satu Pola",
        formula: "Nombor → Perkataan → Algebra",
        legend: [
          { label: "→", text: '1+8(0), 1+8(1)... → "tambah 8 pada sebutan sebelum" → 1+8n' },
        ],
      },
      worked: {
        question: "Nyatakan sebutan ke-5 bagi jujukan 2, 10, 18, ...",
        steps: [
          { calc: "2, 10, 18: jurang = +8", why: "Cari peraturan dahulu: 10−2=8, 18−10=8." },
          {
            calc: "T1=2, T2=10, T3=18, T4=26, T5=34",
            why: "Guna +8 berulang sehingga sampai kedudukan 5.",
          },
          { calc: "Sebutan ke-5 ialah 34", why: "T5 ialah nilai PADA kedudukan 5." },
        ],
      },
      guided: {
        question: "Diberi 65, 60, 55, 50, ..., sebutan yang manakah bersamaan 40?",
        answer: "Tolak 5 setiap kali: 65, 60, 55, 50, 45, 40 — itu sebutan ke-6.",
      },
      mistake: {
        wrong: "Mengelirukan NILAI sebutan dengan KEDUDUKANnya.",
        right:
          '"Cari sebutan ke-5" mahu NILAI di situ. "Sebutan mana bersamaan 40" mahu KEDUDUKAN.',
      },
      practice: {
        easy: {
          question: "Terangkan 3, 6, 9, 12, ... sebagai ungkapan algebra.",
          answer: "3n, n = 1, 2, 3, ...",
        },
        medium: {
          question: "Cari sebutan ke-7 bagi −3, 5, 13, ...",
          answer: "Peraturan: +8. T1=−3, T2=5, T3=13, T4=21, T5=29, T6=37, T7=45.",
        },
        hard: {
          question:
            "Bas bertolak 8:00, 8:30, 9:00 pagi. Jika pola diteruskan, bila bas ke-5 bertolak?",
          answer: "Setiap 30 minit: 8:00, 8:30, 9:00, 9:30, 10:00 pagi.",
        },
      },
      realLife: ["🎟️ Penomboran kerusi", "🚌 Jadual waktu"],
    },
  ],
  summary: {
    center: "Pola dan Jujukan",
    branches: [
      { title: "Pola", points: ["Satu peraturan berulang"] },
      { title: "Jujukan", points: ["Peraturan berlaku SETIAP jurang"] },
      { title: "Sebutan ke-n", points: ["Tₙ — jalan pintas ke sebarang kedudukan"] },
    ],
  },
  formulaSheet: [
    { formula: "Tₙ", label: "sebutan ke-n" },
    { formula: "0,1,1,2,3,5,8,...", label: "Fibonacci" },
    { formula: "1,1,2,1,3,3,1,...", label: "Segitiga Pascal" },
  ],
  quickRevision: [
    "Saya boleh mengecam dan menerangkan pola.",
    "Saya boleh kenal pasti sama ada senarai nombor ialah jujukan.",
    "Saya boleh cari sebarang sebutan menggunakan Tₙ.",
  ],
  examTips: [
    "Tiada jurang tetap? Cuba bahagi sebutan berturutan pula.",
    "Sentiasa semak SETIAP jurang sebelum panggil sesuatu jujukan.",
  ],
  challenge: {
    question:
      "Pengumpan ikan beri makan 4 kali sehari selang sama, mula 7:35 pagi dan berakhir tepat 24 jam kemudian. Pukul berapa suapan ke-3?",
    answer: "24÷4=6 jam berselang. T1=7:35pg, T2=1:35tgh, T3=7:35mlm.",
  },
};

export const mathF2C1InteractiveContent: { en: MathF2C1Content; bm: MathF2C1Content } = { en, bm };

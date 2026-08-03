// Form 1 Mathematics, Chapter 5 — Algebraic Expressions / Ungkapan Algebra
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter5-algebraic-expressions-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter5NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC5SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C5Content {
  subtopics: MathC5SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Variables and Algebraic Expression",
      ideaParagraphs: [
        "A variable is a letter that stands in for a quantity we don't know yet — like x books, or y ringgit. A variable has a FIXED value if it never changes (a fixed deposit's interest rate); it has a VARIED value if it changes over time (your daily travel time to school).",
        "A number combined with a variable (like 2x, or x+3) is an algebraic term. In a term like 3xy, the number 3 is the coefficient. Terms with the SAME variable at the SAME power are like terms (e.g. 5k² and −k²); otherwise they're unlike terms.",
      ],
      formula: {
        eyebrow: "Anatomy of a Term",
        formula: "3xy = 3 × x × y",
        legend: [
          { label: "3", text: "coefficient of xy" },
          { label: "3x", text: "coefficient of y" },
          { label: "3y", text: "coefficient of x" },
        ],
      },
      worked: {
        question: "Given x = 3 and y = 2, find the value of 8x − 5y + 7.",
        steps: [
          {
            calc: "8x − 5y + 7 = 8(3) − 5(2) + 7",
            why: "Substitute x=3 and y=2 into the expression.",
          },
          { calc: "= 24 − 10 + 7", why: "Multiply first: 8×3=24, 5×2=10." },
          { calc: "= 21", why: "Add and subtract left to right: 24−10=14, 14+7=21." },
        ],
      },
      guided: {
        question: "Are 4xy and −xy like terms or unlike terms? What about 9x² and 8x?",
        answer:
          "4xy and −xy: SAME variable xy → like terms. 9x² and 8x: variable x has DIFFERENT powers (2 vs 1) → unlike terms.",
      },
      mistake: {
        wrong:
          "Thinking 6ab and 7ba are unlike terms because the letters are written in a different order.",
        right: "ab = ba (multiplication order doesn't matter) — so 6ab and 7ba ARE like terms.",
      },
      practice: {
        easy: {
          question: "Identify all the algebraic terms in 6k + 2k.",
          answer: "The terms are 6k and 2k.",
        },
        medium: {
          question: "In the term −8xy², state the coefficient of (a) xy² (b) y²",
          answer:
            "(a) −8xy² = −8 × xy², coefficient of xy² is −8. (b) −8xy² = −8x × y², coefficient of y² is −8x.",
        },
        hard: {
          question: "Given a=7, b=3, c=−4, find the value of 3(b−a) − 5ac + 14.",
          answer: "3(3−7) − 5(7)(−4) + 14 = 3(−4) + 140 + 14 = −12+140+14 = 142.",
        },
      },
      realLife: ["🧳 Tour package pricing formulas", "💰 Bank donations and interest"],
    },
    {
      num: "5.2",
      title: "Algebraic Expressions Involving Basic Arithmetic Operations",
      ideaParagraphs: [
        'To add or subtract algebraic expressions, gather the LIKE terms first, then combine them. When removing brackets: a "+" in front leaves every sign inside unchanged; a "−" in front FLIPS every sign inside.',
        "Repeated multiplication becomes a power: a × a × a = a³. To multiply single-term expressions, multiply the numbers together and gather the same variables; to divide, cancel common factors.",
      ],
      formula: {
        eyebrow: "Removing Brackets",
        formula: "−(a − b) = −a + b",
        legend: [
          { label: "Rule", text: "A minus sign in front flips every sign inside the bracket" },
        ],
      },
      worked: {
        question: "Simplify (12mn − 4p) + (6 + 7p) − (10mn + p − 2).",
        steps: [
          {
            calc: "(12mn − 4p) + (6 + 7p) − (10mn + p − 2)",
            why: "Start with the original expression.",
          },
          {
            calc: "= 12mn − 4p + 6 + 7p − 10mn − p + 2",
            why: 'Remove brackets: "+" keeps signs, "−" flips every sign in the last bracket.',
          },
          {
            calc: "= (12mn−10mn) + (−4p+7p−p) + (6+2)",
            why: "Gather like terms together.",
          },
          { calc: "= 2mn + 2p + 8", why: "Simplify each group." },
        ],
      },
      guided: {
        question: "Simplify 3ab² × 4a³b.",
        answer:
          "Multiply numbers: 3×4=12. Gather a's: a×a³=a⁴. Gather b's: b²×b=b³. Result: 12a⁴b³.",
      },
      mistake: {
        wrong: "Removing −(10mn + p − 2) as −10mn + p − 2 (only flipping the first sign).",
        right: "EVERY term inside flips: −(10mn + p − 2) = −10mn − p + 2.",
      },
      practice: {
        easy: {
          question: "Simplify (3x − 2y) + (5x + 9y).",
          answer: "8x + 7y",
        },
        medium: {
          question: "Simplify 20m⁴n² ÷ 5m²n³.",
          answer: "20÷5=4. m⁴÷m²=m². n²÷n³=1/n. Result: 4m²/n.",
        },
        hard: {
          question: "Simplify (4xy + 5k) − (−3k + 7) + (13xy − k).",
          answer: "= 4xy+5k+3k−7+13xy−k = (4xy+13xy)+(5k+3k−k)−7 = 17xy+7k−7",
        },
      },
      realLife: ["📐 Area and volume formulas", "🧾 Combining multiple cost expressions"],
    },
  ],
  summary: {
    center: "Algebraic Expressions",
    branches: [
      { title: "Variables & Terms", points: ["Coefficients, like/unlike terms"] },
      { title: "Add/Subtract", points: ["Gather like terms; watch bracket signs"] },
      { title: "Multiply/Divide", points: ["Numbers with numbers, variables with variables"] },
    ],
  },
  formulaSheet: [
    { formula: "−(a+b) = −a−b", label: "Bracket sign flip" },
    { formula: "a × a × a = a³", label: "Repeated multiplication" },
    { formula: "3xy = 3 × x × y", label: "Coefficient structure" },
    { formula: "ab = ba", label: "Order doesn't matter for like terms" },
  ],
  quickRevision: [
    "I can represent unknown quantities with variables and derive algebraic expressions.",
    "I can identify terms, coefficients, and like/unlike terms.",
    "I can add, subtract, multiply and divide algebraic expressions.",
  ],
  examTips: [
    "Before adding/subtracting, physically underline or color-code each group of like terms.",
    'A "−" before a bracket is the single most common source of sign errors — double-check every term inside flipped.',
  ],
  challenge: {
    question:
      "Azlan has n coins: x 10-sen coins, 3x 20-sen coins, and the rest 50-sen coins. (a) Write an expression for the number of 50-sen coins. (b) If x=6 and the number of 50-sen coins is twice the 20-sen coins, find the total value.",
    answer:
      "(a) 50-sen coins = n − x − 3x = n − 4x. (b) x=6: 20-sen coins=18, so 50-sen coins=36. 10-sen=6×10=60sen, 20-sen=18×20=360sen, 50-sen=36×50=1800sen. Total=2220 sen=RM22.20",
  },
};

const bm: MathF1C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Pemboleh Ubah dan Ungkapan Algebra",
      ideaParagraphs: [
        "Pemboleh ubah ialah huruf yang mewakili kuantiti yang belum diketahui — seperti x buku, atau y ringgit. Pemboleh ubah mempunyai nilai TETAP jika ia tidak berubah (kadar faedah deposit tetap); ia mempunyai nilai BERUBAH jika ia berubah dari semasa ke semasa (masa perjalanan harian ke sekolah).",
        "Nombor digabung dengan pemboleh ubah (seperti 2x, atau x+3) ialah sebutan algebra. Dalam sebutan seperti 3xy, nombor 3 ialah pekali. Sebutan dengan pemboleh ubah SAMA pada kuasa SAMA ialah sebutan serupa (cth. 5k² dan −k²); jika tidak, ia sebutan tidak serupa.",
      ],
      formula: {
        eyebrow: "Anatomi Sebutan",
        formula: "3xy = 3 × x × y",
        legend: [
          { label: "3", text: "pekali bagi xy" },
          { label: "3x", text: "pekali bagi y" },
          { label: "3y", text: "pekali bagi x" },
        ],
      },
      worked: {
        question: "Diberi x = 3 dan y = 2, cari nilai 8x − 5y + 7.",
        steps: [
          { calc: "8x − 5y + 7 = 8(3) − 5(2) + 7", why: "Gantikan x=3 dan y=2 ke dalam ungkapan." },
          { calc: "= 24 − 10 + 7", why: "Darab dahulu: 8×3=24, 5×2=10." },
          { calc: "= 21", why: "Tambah dan tolak dari kiri: 24−10=14, 14+7=21." },
        ],
      },
      guided: {
        question: "Adakah 4xy dan −xy sebutan serupa atau tidak serupa? Bagaimana pula 9x² dan 8x?",
        answer:
          "4xy dan −xy: pemboleh ubah xy SAMA → sebutan serupa. 9x² dan 8x: pemboleh ubah x mempunyai kuasa BERBEZA (2 lwn 1) → sebutan tidak serupa.",
      },
      mistake: {
        wrong:
          "Menganggap 6ab dan 7ba sebutan tidak serupa kerana huruf ditulis dalam turutan berbeza.",
        right:
          "ab = ba (turutan pendaraban tidak penting) — jadi 6ab dan 7ba ADALAH sebutan serupa.",
      },
      practice: {
        easy: {
          question: "Kenal pasti semua sebutan algebra dalam 6k + 2k.",
          answer: "Sebutannya ialah 6k dan 2k.",
        },
        medium: {
          question: "Dalam sebutan −8xy², nyatakan pekali bagi (a) xy² (b) y²",
          answer:
            "(a) −8xy² = −8 × xy², pekali xy² ialah −8. (b) −8xy² = −8x × y², pekali y² ialah −8x.",
        },
        hard: {
          question: "Diberi a=7, b=3, c=−4, cari nilai 3(b−a) − 5ac + 14.",
          answer: "3(3−7) − 5(7)(−4) + 14 = 3(−4) + 140 + 14 = −12+140+14 = 142.",
        },
      },
      realLife: ["🧳 Formula harga pakej pelancongan", "💰 Derma dan faedah bank"],
    },
    {
      num: "5.2",
      title: "Ungkapan Algebra Melibatkan Operasi Asas Aritmetik",
      ideaParagraphs: [
        'Untuk menambah atau menolak ungkapan algebra, kumpulkan sebutan SERUPA dahulu, kemudian gabungkan. Apabila membuang kurungan: "+" di hadapan tidak mengubah tanda dalam kurungan; "−" di hadapan MENUKAR setiap tanda dalam kurungan.',
        "Pendaraban berulang menjadi kuasa: a × a × a = a³. Untuk mendarab ungkapan satu sebutan, darab nombor bersama dan kumpulkan pemboleh ubah sama; untuk membahagi, batalkan faktor sepunya.",
      ],
      formula: {
        eyebrow: "Membuang Kurungan",
        formula: "−(a − b) = −a + b",
        legend: [
          {
            label: "Peraturan",
            text: "Tanda tolak di hadapan menukar setiap tanda dalam kurungan",
          },
        ],
      },
      worked: {
        question: "Permudahkan (12mn − 4p) + (6 + 7p) − (10mn + p − 2).",
        steps: [
          { calc: "(12mn − 4p) + (6 + 7p) − (10mn + p − 2)", why: "Mula dengan ungkapan asal." },
          {
            calc: "= 12mn − 4p + 6 + 7p − 10mn − p + 2",
            why: 'Buang kurungan: "+" kekalkan tanda, "−" tukar setiap tanda dalam kurungan terakhir.',
          },
          { calc: "= (12mn−10mn) + (−4p+7p−p) + (6+2)", why: "Kumpulkan sebutan serupa bersama." },
          { calc: "= 2mn + 2p + 8", why: "Permudahkan setiap kumpulan." },
        ],
      },
      guided: {
        question: "Permudahkan 3ab² × 4a³b.",
        answer: "Darab nombor: 3×4=12. Kumpul a: a×a³=a⁴. Kumpul b: b²×b=b³. Hasil: 12a⁴b³.",
      },
      mistake: {
        wrong: "Membuang −(10mn + p − 2) sebagai −10mn + p − 2 (hanya menukar tanda pertama).",
        right: "SETIAP sebutan dalam kurungan bertukar: −(10mn + p − 2) = −10mn − p + 2.",
      },
      practice: {
        easy: {
          question: "Permudahkan (3x − 2y) + (5x + 9y).",
          answer: "8x + 7y",
        },
        medium: {
          question: "Permudahkan 20m⁴n² ÷ 5m²n³.",
          answer: "20÷5=4. m⁴÷m²=m². n²÷n³=1/n. Hasil: 4m²/n.",
        },
        hard: {
          question: "Permudahkan (4xy + 5k) − (−3k + 7) + (13xy − k).",
          answer: "= 4xy+5k+3k−7+13xy−k = (4xy+13xy)+(5k+3k−k)−7 = 17xy+7k−7",
        },
      },
      realLife: ["📐 Formula luas dan isi padu", "🧾 Menggabungkan pelbagai ungkapan kos"],
    },
  ],
  summary: {
    center: "Ungkapan Algebra",
    branches: [
      { title: "Pemboleh Ubah & Sebutan", points: ["Pekali, sebutan serupa/tidak serupa"] },
      { title: "Tambah/Tolak", points: ["Kumpul sebutan serupa; jaga tanda kurungan"] },
      {
        title: "Darab/Bahagi",
        points: ["Nombor dengan nombor, pemboleh ubah dengan pemboleh ubah"],
      },
    ],
  },
  formulaSheet: [
    { formula: "−(a+b) = −a−b", label: "Tukar tanda kurungan" },
    { formula: "a × a × a = a³", label: "Pendaraban berulang" },
    { formula: "3xy = 3 × x × y", label: "Struktur pekali" },
    { formula: "ab = ba", label: "Turutan tidak penting bagi sebutan serupa" },
  ],
  quickRevision: [
    "Saya boleh mewakilkan kuantiti tidak diketahui dengan pemboleh ubah dan mencari ungkapan algebra.",
    "Saya boleh mengenal pasti sebutan, pekali, dan sebutan serupa/tidak serupa.",
    "Saya boleh menambah, menolak, mendarab dan membahagi ungkapan algebra.",
  ],
  examTips: [
    "Sebelum menambah/menolak, garis bawah atau warna setiap kumpulan sebutan serupa.",
    '"−" sebelum kurungan adalah punca kesilapan tanda paling lazim — semak semula setiap sebutan dalam kurungan bertukar.',
  ],
  challenge: {
    question:
      "Azlan ada n syiling: x syiling 10-sen, 3x syiling 20-sen, dan selebihnya syiling 50-sen. (a) Tulis ungkapan bagi bilangan syiling 50-sen. (b) Jika x=6 dan bilangan syiling 50-sen dua kali syiling 20-sen, cari jumlah nilai.",
    answer:
      "(a) Syiling 50-sen = n − x − 3x = n − 4x. (b) x=6: syiling 20-sen=18, jadi syiling 50-sen=36. 10-sen=6×10=60sen, 20-sen=18×20=360sen, 50-sen=36×50=1800sen. Jumlah=2220 sen=RM22.20",
  },
};

export const mathF1C5InteractiveContent: { en: MathF1C5Content; bm: MathF1C5Content } = { en, bm };

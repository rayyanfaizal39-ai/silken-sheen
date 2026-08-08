// Form 2 Mathematics, Chapter 2 — Factorisation and Algebraic Fractions /
// Pemfaktoran dan Pecahan Algebra. Interactive bilingual content. EN sourced
// from T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from T2_BT_MAT_-_MATEMATIK.pdf,
// cross-checked against design-reference/math2-chapter2-factorisation-fractions-notes-v2.html.
// Content only — no presentation markup (rendered by MathF2Chapter2NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";
import type { LadderMode } from "@/components/notes/blocks/DivisionLadder";
import type {
  AreaModelCell,
  AreaModelAxisLabel,
  FractionStripRow,
} from "@/components/notes/blocks/AreaModelDiagrams";

export type MathF2C2Visual =
  | { kind: "tiles"; leftLabel: string; rightLabel: string; caption?: string }
  | {
      kind: "areaModel";
      colWidths: [number, number];
      rowHeights: [number, number];
      cells: [[AreaModelCell, AreaModelCell], [AreaModelCell, AreaModelCell]];
      colLabels: [AreaModelAxisLabel, AreaModelAxisLabel];
      rowLabels: [AreaModelAxisLabel, AreaModelAxisLabel];
      caption?: string;
    }
  | { kind: "diffSquares"; caption?: string }
  | {
      kind: "fracStrip";
      topRows: FractionStripRow[];
      dividerLabel?: string;
      bottomRows: FractionStripRow[];
      caption?: string;
    };

export type MathF2C2FormulaOrLadder =
  | {
      kind: "formula";
      eyebrow?: string;
      formula: string;
      legend?: { label: string; text: string }[];
    }
  | { kind: "ladder"; eyebrow: string; mode: LadderMode; numbers: number[]; introText: string };

export interface MathF2C2Block {
  ideaTag?: string;
  ideaParagraphs: string[];
  visual?: MathF2C2Visual;
  formula?: MathF2C2FormulaOrLadder;
  worked: { question: string; steps: WorkedStep[] };
}

export interface MathF2C2SubtopicContent {
  num: string;
  title: string;
  blocks: MathF2C2Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C2Content {
  subtopics: MathF2C2SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const VIOLET = "#8b6bff";
const GREEN = "#4ade80";
const AMBER = "#fbbf5a";

const en: MathF2C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Expansion",
      blocks: [
        {
          ideaParagraphs: [
            "Expansion just means multiplying out a bracket. Whatever is outside the bracket multiplies EVERY term inside it — nothing gets left out.",
          ],
          visual: {
            kind: "tiles",
            leftLabel: "6×3",
            rightLabel: "6×4w",
            caption: "6 tall × (3 + 4w) wide, split into two pieces",
          },
          worked: {
            question: "Expand: 6(3 + 4w)",
            steps: [
              {
                calc: "6(3+4w) = 6×3 + 6×4w",
                why: "The 6 outside multiplies BOTH pieces inside — 3 and 4w — one at a time.",
              },
              { calc: "= 18 + 24w", why: "6×3=18, 6×4w=24w." },
            ],
          },
        },
        {
          ideaTag: "Two Brackets? Same Idea, Just Twice",
          ideaParagraphs: [
            "Picture a square with side length (a+b). Split it into 4 smaller pieces. Adding up all 4 pieces gives you the exact same total area as multiplying the whole side lengths together — that's ALL two-bracket expansion is.",
          ],
          visual: {
            kind: "areaModel",
            colWidths: [70, 45],
            rowHeights: [70, 45],
            cells: [
              [
                { label: "a²", fill: "rgba(139,107,255,0.25)", stroke: VIOLET },
                { label: "ab", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
              ],
              [
                { label: "ab", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
                { label: "b²", fill: "rgba(251,191,90,0.2)", stroke: AMBER },
              ],
            ],
            colLabels: [
              { text: "a", color: VIOLET },
              { text: "b", color: GREEN },
            ],
            rowLabels: [
              { text: "a", color: VIOLET },
              { text: "b", color: GREEN },
            ],
            caption: "(a+b)² = a² + ab + ab + b² = a² + 2ab + b² — four pieces, every time",
          },
          worked: {
            question: "Expand: (y + 1)(y − 3)",
            steps: [
              {
                calc: "(y+1)(y−3) = y(y−3) + 1(y−3)",
                why: "Same square-splitting idea: each term in the first bracket (y and 1) multiplies the WHOLE second bracket.",
              },
              { calc: "= y²−3y+y−3", why: "Expand each piece separately." },
              { calc: "= y²−2y−3", why: "Combine the like terms −3y and +y into −2y." },
            ],
          },
        },
      ],
      guided: {
        question: "Expand and simplify: (3p + 2)²",
        answer: "(3p+2)² means (3p+2)(3p+2). Expand: 9p²+6p+6p+4 = 9p²+12p+4.",
      },
      mistake: {
        wrong: "Writing (a+b)² = a²+b² — this skips two whole pieces of the square.",
        right:
          'Look back at the 4-piece square: (a+b)² = a² + ab + ab + b² = a² + 2ab + b². The middle "2ab" never disappears.',
      },
      practice: {
        easy: { question: "Expand: 3r(r − 2s)", answer: "3r² − 6rs" },
        medium: { question: "Expand: (4 + 3r)(2 + r)", answer: "3r² + 10r + 8" },
        hard: {
          question: "Simplify: (3w − 2)(4w − 1) − 10w",
          answer: "Expand first: 12w²−3w−8w+2. Then subtract 10w: 12w²−21w+2.",
        },
      },
      realLife: ["📐 Area with unknown lengths", "💰 Price formulas"],
    },
    {
      num: "2.2",
      title: "Factorisation",
      blocks: [
        {
          ideaParagraphs: [
            "Factorisation is expansion in reverse — going from the expanded answer BACK to the bracket form. There are 3 methods, one for each type of expression you'll meet.",
          ],
          formula: {
            kind: "ladder",
            eyebrow: "Method 1 — Pull Out the HCF",
            mode: "hcf",
            numbers: [7, 21],
            introText: "Same division ladder from Form 1 — find the HCF, then pull it out front.",
          },
          worked: {
            question: "Factorise: 7m + 21m²",
            steps: [
              {
                calc: "HCF of 7 and 21 is 7",
                why: "7 divides both 7m and 21m² evenly — it's the biggest number that does.",
              },
              {
                calc: "7m + 21m² = 7m(1 + 3m)",
                why: "Divide each term by 7m to see what's left inside the bracket: 7m÷7m=1, 21m²÷7m=3m.",
              },
            ],
          },
        },
        {
          ideaTag: "Method 2 — Difference of Squares",
          ideaParagraphs: [
            "Take a big square and cut a smaller square out of its corner. The leftover L-shaped area can be re-cut into a rectangle — and that rectangle's sides are exactly (x+y) and (x−y).",
          ],
          visual: {
            kind: "diffSquares",
            caption:
              "The leftover L-shape (x²−y²) re-cuts into a rectangle (x+y) by (x−y) — same area, new shape",
          },
          formula: {
            kind: "formula",
            formula: "x² − y² = (x + y)(x − y)",
            legend: [
              { label: "→", text: "Only works with a MINUS sign between two perfect squares" },
            ],
          },
          worked: {
            question: "Factorise: 9m² − 100",
            steps: [
              {
                calc: "9m² = (3m)², 100 = 10²",
                why: "Check both terms are perfect squares first — this method only works then.",
              },
              {
                calc: "9m² − 100 = (3m+10)(3m−10)",
                why: "Apply x²−y²=(x+y)(x−y) with x=3m, y=10 — same picture as the square-cutout above.",
              },
            ],
          },
        },
        {
          ideaTag: "Method 3 — Trinomials",
          ideaParagraphs: [
            "x² + 6x + 8 is really just an area made of 4 tiles — one x² tile, some x-strips, and some unit squares. Rearranged into a rectangle, its two side lengths ARE the factors you're looking for.",
          ],
          visual: {
            kind: "areaModel",
            colWidths: [60, 40],
            rowHeights: [60, 20],
            cells: [
              [
                { label: "x²", fill: "rgba(139,107,255,0.22)", stroke: VIOLET },
                { label: "4x", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
              ],
              [
                { label: "2x", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
                { label: "8", fill: "rgba(251,191,90,0.22)", stroke: AMBER },
              ],
            ],
            colLabels: [
              { text: "x", color: VIOLET },
              { text: "4", color: AMBER },
            ],
            rowLabels: [
              { text: "x", color: VIOLET },
              { text: "2", color: AMBER },
            ],
            caption:
              "x² + 4x + 2x + 8 rearranges into one rectangle, sides (x+2) and (x+4) — those sides ARE the factors",
          },
          worked: {
            question: "Factorise: m² − 2m − 8",
            steps: [
              {
                calc: "Need two numbers: multiply to −8, add to −2",
                why: "These numbers become your two side-length pieces — just like the 2 and 4 in the x²+6x+8 picture.",
              },
              {
                calc: "Try −4 and +2: (−4)×2=−8 ✓, (−4)+2=−2 ✓",
                why: "Test pairs of factors of −8 until one pair also adds to −2.",
              },
              {
                calc: "m² − 2m − 8 = (m−4)(m+2)",
                why: "Write the two numbers straight into the brackets alongside m.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Factorise: 5k² − 80 (pull out the HCF first, then look for a difference of squares)",
        answer: "HCF of 5 and 80 is 5: 5(k²−16). Now 16=4²: 5(k+4)(k−4).",
      },
      mistake: {
        wrong: "Trying difference of squares on x² + 4 — a PLUS sign never works this way.",
        right:
          "Check for a MINUS sign between two perfect squares first — if it's a plus, this method doesn't apply.",
      },
      practice: {
        easy: { question: "Factorise: 3x + 15", answer: "3(x + 5)" },
        medium: { question: "Factorise: b² − 1", answer: "(b+1)(b−1)" },
        hard: {
          question: "Factorise: x² − 6x + 9",
          answer: "Two numbers multiplying to 9, adding to −6: both −3. (x−3)(x−3) = (x−3)².",
        },
      },
      realLife: ["🏗️ Simplifying formulas", "💻 Optimizing algorithms"],
    },
    {
      num: "2.3",
      title: "Algebraic Expressions and Laws of Basic Arithmetic Operations",
      blocks: [
        {
          ideaParagraphs: [
            "You can't add ¼ and ⅙ directly — you first cut both into the SAME size pieces (twelfths), then add. Algebraic fractions work exactly the same way: match the denominators first, using the LCM, before adding or subtracting.",
          ],
          visual: {
            kind: "fracStrip",
            topRows: [
              { n: 4, filled: 1, color: VIOLET, label: "¼" },
              { n: 6, filled: 1, color: GREEN, label: "⅙" },
            ],
            dividerLabel: "both cut into 12ths:",
            bottomRows: [
              { n: 12, filled: 3, color: VIOLET, label: "3/12" },
              { n: 12, filled: 2, color: GREEN, label: "2/12" },
            ],
            caption: "¼ + ⅙ = 3/12 + 2/12 = 5/12 — same idea for algebraic fractions",
          },
          formula: {
            kind: "ladder",
            eyebrow: "Different Denominators Need the LCM",
            mode: "lcm",
            numbers: [4, 6],
            introText:
              "Same LCM ladder from Form 1 — find it, then scale both fractions up to match.",
          },
          worked: {
            question: "Simplify: 1/(4p) + 4/(6p)",
            steps: [
              {
                calc: "LCM of 4 and 6 is 12",
                why: "Just like ¼ and ⅙ needed twelfths, these denominators need the same shared unit.",
              },
              {
                calc: "1/(4p) = 3/(12p), 4/(6p) = 8/(12p)",
                why: "Scale each fraction up to the shared denominator.",
              },
              {
                calc: "3/(12p) + 8/(12p) = 11/(12p)",
                why: "With matching denominators, just add the numerators.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Simplify: (5a)/(a+2b) ÷ (2ab)/(3a+6b) — factorise the second denominator first.",
        answer:
          "3a+6b = 3(a+2b). Dividing = multiplying by the flip: 5a/(a+2b) × 3(a+2b)/(2ab). The (a+2b) cancels, leaving 15/(2b).",
      },
      mistake: {
        wrong: "Adding numerators AND denominators straight across: a/b + c/d = (a+c)/(b+d).",
        right: "Denominators must become EQUAL first (via LCM) — only then do numerators add.",
      },
      practice: {
        easy: { question: "Simplify: 3y/5 + 3y/5", answer: "6y/5" },
        medium: {
          question: "Simplify: 5/(2a) − 2/(3b)",
          answer: "LCM = 6ab. 15b/(6ab) − 4a/(6ab) = (15b−4a)/(6ab).",
        },
        hard: {
          question: "Simplify: (12m − 18m²)/(4n² − 16n) × n/m",
          answer:
            "Factorise first: top=6m(2−3m), bottom=4n(n−4). The m and n cancel, leaving 3(2−3m)/(2(n−4)).",
        },
      },
      realLife: ["⚡ Circuit resistance formulas", "💊 Mixing concentrations"],
    },
  ],
  summary: {
    center: "Factorisation & Algebraic Fractions",
    branches: [
      { title: "Expansion", points: ["Every term × every term (the square picture)"] },
      { title: "Factorisation", points: ["Reverse of expansion — HCF, squares, trinomial"] },
      { title: "Fractions", points: ["Match denominators via LCM first"] },
    ],
  },
  formulaSheet: [
    { formula: "a(b+c) = ab+ac", label: "Single bracket" },
    { formula: "x²−y² = (x+y)(x−y)", label: "Difference of squares" },
    { formula: "(a+b)² = a²+2ab+b²", label: "Never a²+b²" },
    { formula: "÷ = × by the flip", label: "" },
  ],
  quickRevision: [
    "I can expand single and double bracket expressions.",
    "I can factorise using HCF, difference of squares, and trinomial methods.",
    "I can add, subtract, multiply and divide algebraic fractions.",
  ],
  examTips: [
    "Before factorising a trinomial, ALWAYS check for a common HCF first.",
    "Check your factorisation by expanding your answer back — it should match the original exactly.",
  ],
  challenge: {
    question: "Simplify fully: (x+y)(x−y) + x(x−2y)",
    answer: "(x+y)(x−y)=x²−y². x(x−2y)=x²−2xy. Adding: 2x²−y²−2xy.",
  },
};

const bm: MathF2C2Content = {
  subtopics: [
    {
      num: "2.1",
      title: "Kembangan",
      blocks: [
        {
          ideaParagraphs: [
            "Kembangan hanya bermaksud mendarab keluar kurungan. Apa sahaja di luar kurungan mendarab SETIAP sebutan di dalamnya — tiada apa tertinggal.",
          ],
          visual: {
            kind: "tiles",
            leftLabel: "6×3",
            rightLabel: "6×4w",
            caption: "6 tinggi × (3 + 4w) lebar, dibahagi kepada dua bahagian",
          },
          worked: {
            question: "Kembangkan: 6(3 + 4w)",
            steps: [
              {
                calc: "6(3+4w) = 6×3 + 6×4w",
                why: "6 di luar mendarab KEDUA-DUA bahagian dalam — 3 dan 4w — satu setiap kali.",
              },
              { calc: "= 18 + 24w", why: "6×3=18, 6×4w=24w." },
            ],
          },
        },
        {
          ideaTag: "Dua Kurungan? Idea Sama, Cuma Dua Kali",
          ideaParagraphs: [
            "Bayangkan segi empat sama bersisi (a+b). Bahagikannya kepada 4 bahagian lebih kecil. Menambah kesemua 4 bahagian memberi jumlah luas sama tepat seperti mendarab keseluruhan panjang sisi — itu SAHAJA kembangan dua kurungan.",
          ],
          visual: {
            kind: "areaModel",
            colWidths: [70, 45],
            rowHeights: [70, 45],
            cells: [
              [
                { label: "a²", fill: "rgba(139,107,255,0.25)", stroke: VIOLET },
                { label: "ab", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
              ],
              [
                { label: "ab", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
                { label: "b²", fill: "rgba(251,191,90,0.2)", stroke: AMBER },
              ],
            ],
            colLabels: [
              { text: "a", color: VIOLET },
              { text: "b", color: GREEN },
            ],
            rowLabels: [
              { text: "a", color: VIOLET },
              { text: "b", color: GREEN },
            ],
            caption: "(a+b)² = a² + ab + ab + b² = a² + 2ab + b² — empat bahagian, setiap kali",
          },
          worked: {
            question: "Kembangkan: (y + 1)(y − 3)",
            steps: [
              {
                calc: "(y+1)(y−3) = y(y−3) + 1(y−3)",
                why: "Idea membahagi segi empat sama sama: setiap sebutan kurungan pertama (y dan 1) darab KESELURUHAN kurungan kedua.",
              },
              { calc: "= y²−3y+y−3", why: "Kembangkan setiap bahagian berasingan." },
              { calc: "= y²−2y−3", why: "Gabungkan sebutan serupa −3y dan +y menjadi −2y." },
            ],
          },
        },
      ],
      guided: {
        question: "Kembangkan dan permudahkan: (3p + 2)²",
        answer: "(3p+2)² bermaksud (3p+2)(3p+2). Kembangkan: 9p²+6p+6p+4 = 9p²+12p+4.",
      },
      mistake: {
        wrong: "Menulis (a+b)² = a²+b² — ini melangkau dua bahagian penuh segi empat sama.",
        right:
          'Lihat semula segi empat sama 4-bahagian: (a+b)² = a² + ab + ab + b² = a² + 2ab + b². "2ab" tengah tidak pernah hilang.',
      },
      practice: {
        easy: { question: "Kembangkan: 3r(r − 2s)", answer: "3r² − 6rs" },
        medium: { question: "Kembangkan: (4 + 3r)(2 + r)", answer: "3r² + 10r + 8" },
        hard: {
          question: "Permudahkan: (3w − 2)(4w − 1) − 10w",
          answer: "Kembangkan dahulu: 12w²−3w−8w+2. Kemudian tolak 10w: 12w²−21w+2.",
        },
      },
      realLife: ["📐 Luas dengan panjang tidak diketahui", "💰 Formula harga"],
    },
    {
      num: "2.2",
      title: "Pemfaktoran",
      blocks: [
        {
          ideaParagraphs: [
            "Pemfaktoran ialah kembangan secara songsang — daripada jawapan dikembangkan KEMBALI ke bentuk kurungan. Ada 3 kaedah, satu untuk setiap jenis ungkapan yang anda akan jumpa.",
          ],
          formula: {
            kind: "ladder",
            eyebrow: "Kaedah 1 — Keluarkan FSTB",
            mode: "hcf",
            numbers: [7, 21],
            introText:
              "Tangga pembahagian sama dari Tingkatan 1 — cari FSTB, kemudian keluarkan ke hadapan.",
          },
          worked: {
            question: "Faktorkan: 7m + 21m²",
            steps: [
              {
                calc: "FSTB bagi 7 dan 21 ialah 7",
                why: "7 membahagi kedua-dua 7m dan 21m² sama rata — ia nombor terbesar yang boleh.",
              },
              {
                calc: "7m + 21m² = 7m(1 + 3m)",
                why: "Bahagi setiap sebutan dengan 7m untuk lihat apa tinggal dalam kurungan: 7m÷7m=1, 21m²÷7m=3m.",
              },
            ],
          },
        },
        {
          ideaTag: "Kaedah 2 — Beza Dua Kuasa Dua",
          ideaParagraphs: [
            "Ambil segi empat sama besar dan potong segi empat sama lebih kecil dari penjurunya. Kawasan berbaki berbentuk L boleh dipotong semula menjadi segi empat tepat — dan sisi segi empat tepat itu tepat (x+y) dan (x−y).",
          ],
          visual: {
            kind: "diffSquares",
            caption:
              "Bentuk L berbaki (x²−y²) dipotong semula menjadi segi empat tepat (x+y) dengan (x−y) — luas sama, bentuk baharu",
          },
          formula: {
            kind: "formula",
            formula: "x² − y² = (x + y)(x − y)",
            legend: [
              {
                label: "→",
                text: "Hanya berfungsi dengan tanda TOLAK antara dua kuasa dua sempurna",
              },
            ],
          },
          worked: {
            question: "Faktorkan: 9m² − 100",
            steps: [
              {
                calc: "9m² = (3m)², 100 = 10²",
                why: "Semak kedua-dua sebutan kuasa dua sempurna dahulu — kaedah ini hanya berfungsi begitu.",
              },
              {
                calc: "9m² − 100 = (3m+10)(3m−10)",
                why: "Guna x²−y²=(x+y)(x−y) dengan x=3m, y=10 — gambar sama seperti potongan segi empat sama di atas.",
              },
            ],
          },
        },
        {
          ideaTag: "Kaedah 3 — Trinomial",
          ideaParagraphs: [
            "x² + 6x + 8 sebenarnya cuma luas dibina daripada 4 jubin — satu jubin x², beberapa jalur-x, dan beberapa segi empat sama unit. Disusun semula menjadi segi empat tepat, dua panjang sisinya IALAH faktor yang anda cari.",
          ],
          visual: {
            kind: "areaModel",
            colWidths: [60, 40],
            rowHeights: [60, 20],
            cells: [
              [
                { label: "x²", fill: "rgba(139,107,255,0.22)", stroke: VIOLET },
                { label: "4x", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
              ],
              [
                { label: "2x", fill: "rgba(74,222,128,0.2)", stroke: GREEN },
                { label: "8", fill: "rgba(251,191,90,0.22)", stroke: AMBER },
              ],
            ],
            colLabels: [
              { text: "x", color: VIOLET },
              { text: "4", color: AMBER },
            ],
            rowLabels: [
              { text: "x", color: VIOLET },
              { text: "2", color: AMBER },
            ],
            caption:
              "x² + 4x + 2x + 8 disusun semula menjadi satu segi empat tepat, sisi (x+2) dan (x+4) — sisi itu IALAH faktor",
          },
          worked: {
            question: "Faktorkan: m² − 2m − 8",
            steps: [
              {
                calc: "Perlukan dua nombor: darab kepada −8, tambah kepada −2",
                why: "Nombor ini menjadi dua bahagian panjang sisi anda — sama seperti 2 dan 4 dalam gambar x²+6x+8.",
              },
              {
                calc: "Cuba −4 dan +2: (−4)×2=−8 ✓, (−4)+2=−2 ✓",
                why: "Uji pasangan faktor −8 sehingga satu pasangan juga tambah kepada −2.",
              },
              {
                calc: "m² − 2m − 8 = (m−4)(m+2)",
                why: "Tulis dua nombor terus dalam kurungan bersama m.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Faktorkan: 5k² − 80 (keluarkan FSTB dahulu, kemudian cari beza dua kuasa dua)",
        answer: "FSTB bagi 5 dan 80 ialah 5: 5(k²−16). Kini 16=4²: 5(k+4)(k−4).",
      },
      mistake: {
        wrong:
          "Cuba beza dua kuasa dua pada x² + 4 — tanda TAMBAH tidak pernah berfungsi cara ini.",
        right:
          "Semak tanda TOLAK antara dua kuasa dua sempurna dahulu — jika tambah, kaedah ini tidak terpakai.",
      },
      practice: {
        easy: { question: "Faktorkan: 3x + 15", answer: "3(x + 5)" },
        medium: { question: "Faktorkan: b² − 1", answer: "(b+1)(b−1)" },
        hard: {
          question: "Faktorkan: x² − 6x + 9",
          answer:
            "Dua nombor didarab kepada 9, ditambah kepada −6: kedua-dua −3. (x−3)(x−3) = (x−3)².",
        },
      },
      realLife: ["🏗️ Memudahkan formula", "💻 Mengoptimumkan algoritma"],
    },
    {
      num: "2.3",
      title: "Ungkapan Algebra dan Hukum Operasi Asas Aritmetik",
      blocks: [
        {
          ideaParagraphs: [
            "Anda tidak boleh tambah ¼ dan ⅙ terus — anda potong dahulu kedua-dua kepada saiz SAMA (per dua belas), kemudian tambah. Pecahan algebra berfungsi tepat sama: samakan penyebut dahulu, guna GSTK, sebelum menambah atau menolak.",
          ],
          visual: {
            kind: "fracStrip",
            topRows: [
              { n: 4, filled: 1, color: VIOLET, label: "¼" },
              { n: 6, filled: 1, color: GREEN, label: "⅙" },
            ],
            dividerLabel: "kedua-dua dipotong kepada per dua belas:",
            bottomRows: [
              { n: 12, filled: 3, color: VIOLET, label: "3/12" },
              { n: 12, filled: 2, color: GREEN, label: "2/12" },
            ],
            caption: "¼ + ⅙ = 3/12 + 2/12 = 5/12 — idea sama untuk pecahan algebra",
          },
          formula: {
            kind: "ladder",
            eyebrow: "Penyebut Berbeza Perlukan GSTK",
            mode: "lcm",
            numbers: [4, 6],
            introText:
              "Tangga GSTK sama dari Tingkatan 1 — cari, kemudian skalakan kedua-dua pecahan sepadan.",
          },
          worked: {
            question: "Permudahkan: 1/(4p) + 4/(6p)",
            steps: [
              {
                calc: "GSTK bagi 4 dan 6 ialah 12",
                why: "Sama seperti ¼ dan ⅙ perlukan per dua belas, penyebut ini perlukan unit dikongsi sama.",
              },
              {
                calc: "1/(4p) = 3/(12p), 4/(6p) = 8/(12p)",
                why: "Skalakan setiap pecahan kepada penyebut dikongsi.",
              },
              {
                calc: "3/(12p) + 8/(12p) = 11/(12p)",
                why: "Dengan penyebut sepadan, tambah pengangka sahaja.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Permudahkan: (5a)/(a+2b) ÷ (2ab)/(3a+6b) — faktorkan penyebut kedua dahulu.",
        answer:
          "3a+6b = 3(a+2b). Membahagi = mendarab dengan songsang: 5a/(a+2b) × 3(a+2b)/(2ab). (a+2b) batal, tinggal 15/(2b).",
      },
      mistake: {
        wrong: "Menambah pengangka DAN penyebut terus merentasi: a/b + c/d = (a+c)/(b+d).",
        right:
          "Penyebut mesti menjadi SAMA dahulu (melalui GSTK) — hanya kemudian pengangka ditambah.",
      },
      practice: {
        easy: { question: "Permudahkan: 3y/5 + 3y/5", answer: "6y/5" },
        medium: {
          question: "Permudahkan: 5/(2a) − 2/(3b)",
          answer: "GSTK = 6ab. 15b/(6ab) − 4a/(6ab) = (15b−4a)/(6ab).",
        },
        hard: {
          question: "Permudahkan: (12m − 18m²)/(4n² − 16n) × n/m",
          answer:
            "Faktorkan dahulu: atas=6m(2−3m), bawah=4n(n−4). m dan n batal, tinggal 3(2−3m)/(2(n−4)).",
        },
      },
      realLife: ["⚡ Formula rintangan litar", "💊 Mencampur kepekatan"],
    },
  ],
  summary: {
    center: "Pemfaktoran & Pecahan Algebra",
    branches: [
      { title: "Kembangan", points: ["Setiap sebutan × setiap sebutan (gambar segi empat sama)"] },
      { title: "Pemfaktoran", points: ["Songsang kembangan — FSTB, kuasa dua, trinomial"] },
      { title: "Pecahan", points: ["Samakan penyebut melalui GSTK dahulu"] },
    ],
  },
  formulaSheet: [
    { formula: "a(b+c) = ab+ac", label: "Kurungan tunggal" },
    { formula: "x²−y² = (x+y)(x−y)", label: "Beza dua kuasa dua" },
    { formula: "(a+b)² = a²+2ab+b²", label: "Bukan a²+b²" },
    { formula: "÷ = × dengan songsang", label: "" },
  ],
  quickRevision: [
    "Saya boleh mengembangkan ungkapan kurungan tunggal dan berganda.",
    "Saya boleh memfaktorkan menggunakan kaedah FSTB, beza dua kuasa dua, dan trinomial.",
    "Saya boleh menambah, menolak, mendarab dan membahagi pecahan algebra.",
  ],
  examTips: [
    "Sebelum memfaktorkan trinomial, SENTIASA semak FSTB sepunya dahulu.",
    "Semak pemfaktoran anda dengan kembangkan jawapan anda semula — ia patut sepadan tepat dengan asal.",
  ],
  challenge: {
    question: "Permudahkan sepenuhnya: (x+y)(x−y) + x(x−2y)",
    answer: "(x+y)(x−y)=x²−y². x(x−2y)=x²−2xy. Tambah: 2x²−y²−2xy.",
  },
};

export const mathF2C2InteractiveContent: { en: MathF2C2Content; bm: MathF2C2Content } = { en, bm };

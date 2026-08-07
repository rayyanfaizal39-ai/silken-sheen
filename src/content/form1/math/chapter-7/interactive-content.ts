// Form 1 Mathematics, Chapter 7 — Linear Inequalities / Ketaksamaan Linear
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter7-linear-inequalities-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter7NotesBlock).
//
// Note on 7.1's worked example: the mockup's script only renders ONE number
// line (v≤110) with a caption describing the v>110 case in text. Since the
// question explicitly asks to represent BOTH "on separate number lines",
// this port renders two InequalityNumberLine diagrams instead, one per case.
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface IneqNumlineSpec {
  boundary: number;
  direction: "gt" | "lt";
  inclusive: boolean;
  min: number;
  max: number;
  label: string;
}

export interface MathC7SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 7.1 only — illustrative number line embedded in the lesson intro. */
  ineqNumline?: IneqNumlineSpec;
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  /** Worked example — either a step-reveal (7.2) or number-line diagrams (7.1). */
  worked: { question: string; steps?: WorkedStep[]; ineqNumlines?: IneqNumlineSpec[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C7Content {
  subtopics: MathC7SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Inequalities",
      ideaParagraphs: [
        "Two quantities that don't have the same value form an inequality. On a number line, whichever number sits further RIGHT is greater. −2 sits right of −7, so −2 > −7. −2 sits left of 3, so −2 < 3.",
        'Two more symbols combine equality with inequality: ≥ ("greater than or equal to" / at least / minimum) and ≤ ("less than or equal to" / at most / maximum).',
      ],
      ineqNumline: {
        boundary: 4,
        direction: "gt",
        inclusive: false,
        min: 0,
        max: 8,
        label: "x > 4 — open circle, shaded right",
      },
      formula: {
        eyebrow: "Open vs Closed Circle",
        formula: "v < 110   |   v ≤ 110",
        legend: [
          {
            label: "Rule",
            text: "Open circle (◯): value NOT included. Closed circle (●): value IS included.",
          },
        ],
      },
      worked: {
        question:
          "A speed limit sign shows 110 km/h. Represent v ≤ 110 and v > 110 on separate number lines.",
        ineqNumlines: [
          {
            boundary: 110,
            direction: "lt",
            inclusive: true,
            min: 80,
            max: 130,
            label: "v ≤ 110 — closed circle, shaded left",
          },
          {
            boundary: 110,
            direction: "gt",
            inclusive: false,
            min: 80,
            max: 130,
            label: "v > 110 — open circle, shaded right",
          },
        ],
      },
      guided: {
        question:
          "Fatimah earns overtime when she works at least 9 hours. Represent this on a number line and form the inequality.",
        answer:
          '"At least 9" means 9 is included. t ≥ 9 — closed circle at 9, shaded to the right.',
      },
      mistake: {
        wrong:
          'Using an open circle for "at least" or "at most" — these phrases INCLUDE the boundary value.',
        right:
          '"At least / minimum / not less than" → ≥ (closed circle). "At most / maximum / not more than" → ≤ (closed circle).',
      },
      practice: {
        easy: {
          question: "Fill in with > or <: −6 ___ 0",
          answer: "−6 < 0 (−6 is less than 0)",
        },
        medium: {
          question:
            "A minimum deposit of RM100 is needed to open a bank account. Form the inequality (a = deposit amount).",
          answer: 'a ≥ 100 ("minimum" includes the value itself).',
        },
        hard: {
          question: "If x < y, fill in: y ___ x. If p < q and q < 0, fill in: p ___ 0.",
          answer: "y > x (converse property). p < 0 (transitive: p < q < 0, so p < 0).",
        },
      },
      realLife: ["🚗 Speed limits", "🏦 Minimum bank deposits", "⚖️ BMI classification"],
    },
    {
      num: "7.2",
      title: "Linear Inequalities in One Variable",
      ideaParagraphs: [
        "Solving a linear inequality works almost exactly like solving an equation — EXCEPT for one rule: multiplying or dividing both sides by a NEGATIVE number flips the inequality symbol.",
        "Two inequalities sharing one variable are simultaneous linear inequalities. Their solution is the COMMON region where both are true at once.",
      ],
      formula: {
        eyebrow: "The One Rule That's Different",
        formula: "2 < 6   ⟹   2×(−3) > 6×(−3)",
        legend: [
          {
            label: "Rule",
            text: "Multiply/divide by a NEGATIVE number → FLIP the symbol. Add/subtract anything, or multiply/divide by a positive → symbol stays the same.",
          },
        ],
      },
      worked: {
        question: "Solve: 7 − 4x > 15",
        steps: [
          { calc: "7 − 4x > 15", why: "Start with the original inequality." },
          {
            calc: "7 − 4x − 7 > 15 − 7",
            why: "Subtract 7 from both sides — symbol unchanged (subtraction never flips it).",
          },
          { calc: "−4x > 8", why: "7 − 7 cancels to 0 on the left; 15 − 7 = 8 on the right." },
          {
            calc: "x < −2",
            why: "Divide both sides by −4 — a NEGATIVE number, so the symbol FLIPS from > to <.",
          },
        ],
      },
      guided: {
        question: "Solve the simultaneous inequalities: 2x + 5 < 11 and 3x − 10 < 5.",
        answer: "First: 2x<6 → x<3. Second: 3x<15 → x<5. Common region (satisfying both): x<3.",
      },
      mistake: {
        wrong: "Dividing both sides by −4 in −4x > 8 and keeping the symbol as >, giving x > −2.",
        right: "Dividing by a NEGATIVE number flips the symbol: −4x > 8 becomes x < −2.",
      },
      practice: {
        easy: {
          question: "Solve: 7x ≥ 28",
          answer: "Divide by 7 (positive, symbol stays): x ≥ 4.",
        },
        medium: {
          question:
            "A book sale is RM12.50 per book. Ghani spends not more than RM80. What's the maximum number of books he can buy?",
          answer: "12.5n ≤ 80 → n ≤ 6.4. Since n is whole, max is 6 books.",
        },
        hard: {
          question: "Solve the simultaneous inequalities: 8x + 5 ≥ 5x − 13 and 3x − 4 > 9x + 20.",
          answer:
            "First: 3x≥−18 → x≥−6. Second: −6x>24 → x<−4 (flipped, divided by −6). Common region: −6 ≤ x < −4.",
        },
      },
      realLife: ["💰 Budget constraints", "🍬 Daily sugar/nutrient limits"],
    },
  ],
  summary: {
    center: "Linear Inequalities",
    branches: [
      { title: "Symbols", points: [">, <, ≥, ≤"] },
      { title: "Solving", points: ["Like equations, but flip on ×/÷ negative"] },
      { title: "Simultaneous", points: ["Solution = common region"] },
    ],
  },
  formulaSheet: [
    { formula: "≥ at least/minimum", label: "closed circle" },
    { formula: "≤ at most/maximum", label: "closed circle" },
    { formula: "× or ÷ negative", label: "FLIP the symbol" },
    { formula: "Simultaneous", label: "solution = common region" },
  ],
  quickRevision: [
    "I can compare numbers and represent inequalities on a number line.",
    "I can form and solve linear inequalities in one variable.",
    "I can solve simultaneous linear inequalities and find the common region.",
  ],
  examTips: [
    "Circle every negative number you multiply or divide by — it's your reminder to flip the symbol.",
    "For simultaneous inequalities, always sketch BOTH on the same number line to see the common region clearly.",
  ],
  challenge: {
    question:
      "A car rental: Package A costs RM40 + RM8/hour. Package B costs RM15/hour with no base fee. What is the maximum time (to the nearest whole hour) where Package B is cheaper?",
    answer: "15h < 40+8h → 7h < 40 → h < 5.71. So Package B is cheaper for up to 5 hours.",
  },
};

const bm: MathF1C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Ketaksamaan",
      ideaParagraphs: [
        "Dua kuantiti yang tidak mempunyai nilai sama membentuk ketaksamaan. Pada garis nombor, nombor yang terletak lebih ke KANAN adalah lebih besar. −2 terletak di kanan −7, jadi −2 > −7. −2 terletak di kiri 3, jadi −2 < 3.",
        'Dua simbol lagi menggabungkan kesamaan dengan ketaksamaan: ≥ ("lebih besar atau sama dengan" / sekurang-kurangnya / minimum) dan ≤ ("kurang atau sama dengan" / tidak lebih daripada / maksimum).',
      ],
      ineqNumline: {
        boundary: 4,
        direction: "gt",
        inclusive: false,
        min: 0,
        max: 8,
        label: "x > 4 — bulatan terbuka, dilorek ke kanan",
      },
      formula: {
        eyebrow: "Bulatan Terbuka lwn Tertutup",
        formula: "v < 110   |   v ≤ 110",
        legend: [
          {
            label: "Peraturan",
            text: "Bulatan terbuka (◯): nilai TIDAK termasuk. Bulatan tertutup (●): nilai TERMASUK.",
          },
        ],
      },
      worked: {
        question:
          "Papan tanda had laju menunjukkan 110 km/j. Wakilkan v ≤ 110 dan v > 110 pada garis nombor berasingan.",
        ineqNumlines: [
          {
            boundary: 110,
            direction: "lt",
            inclusive: true,
            min: 80,
            max: 130,
            label: "v ≤ 110 — bulatan tertutup, dilorek ke kiri",
          },
          {
            boundary: 110,
            direction: "gt",
            inclusive: false,
            min: 80,
            max: 130,
            label: "v > 110 — bulatan terbuka, dilorek ke kanan",
          },
        ],
      },
      guided: {
        question:
          "Fatimah dapat kerja lebih masa jika bekerja sekurang-kurangnya 9 jam. Wakilkan pada garis nombor dan bentuk ketaksamaan.",
        answer:
          '"Sekurang-kurangnya 9" bermaksud 9 termasuk. t ≥ 9 — bulatan tertutup pada 9, dilorek ke kanan.',
      },
      mistake: {
        wrong:
          'Guna bulatan terbuka untuk "sekurang-kurangnya" atau "tidak lebih daripada" — frasa ini TERMASUK nilai sempadan.',
        right:
          '"Sekurang-kurangnya / minimum" → ≥ (bulatan tertutup). "Tidak lebih daripada / maksimum" → ≤ (bulatan tertutup).',
      },
      practice: {
        easy: {
          question: "Isi dengan > atau <: −6 ___ 0",
          answer: "−6 < 0 (−6 kurang daripada 0)",
        },
        medium: {
          question:
            "Deposit minimum RM100 diperlukan untuk buka akaun bank. Bentuk ketaksamaan (a = jumlah deposit).",
          answer: 'a ≥ 100 ("minimum" termasuk nilai itu sendiri).',
        },
        hard: {
          question: "Jika x < y, isi: y ___ x. Jika p < q dan q < 0, isi: p ___ 0.",
          answer: "y > x (sifat akas). p < 0 (transitif: p < q < 0, jadi p < 0).",
        },
      },
      realLife: ["🚗 Had laju", "🏦 Deposit minimum bank", "⚖️ Klasifikasi BMI"],
    },
    {
      num: "7.2",
      title: "Ketaksamaan Linear dalam Satu Pemboleh Ubah",
      ideaParagraphs: [
        "Menyelesaikan ketaksamaan linear berfungsi hampir sama seperti menyelesaikan persamaan — KECUALI satu peraturan: mendarab atau membahagi kedua-dua belah dengan nombor NEGATIF menukar simbol ketaksamaan.",
        "Dua ketaksamaan berkongsi satu pemboleh ubah ialah ketaksamaan linear serentak. Penyelesaiannya ialah kawasan SEPUNYA di mana kedua-duanya benar serentak.",
      ],
      formula: {
        eyebrow: "Satu Peraturan Yang Berbeza",
        formula: "2 < 6   ⟹   2×(−3) > 6×(−3)",
        legend: [
          {
            label: "Peraturan",
            text: "Darab/bahagi dengan nombor NEGATIF → TUKAR simbol. Tambah/tolak apa sahaja, atau darab/bahagi dengan positif → simbol kekal sama.",
          },
        ],
      },
      worked: {
        question: "Selesaikan: 7 − 4x > 15",
        steps: [
          { calc: "7 − 4x > 15", why: "Mula dengan ketaksamaan asal." },
          {
            calc: "7 − 4x − 7 > 15 − 7",
            why: "Tolak 7 daripada kedua-dua belah — simbol tidak berubah (penolakan tidak pernah menukarnya).",
          },
          {
            calc: "−4x > 8",
            why: "7 − 7 bergugur menjadi 0 di sebelah kiri; 15 − 7 = 8 di sebelah kanan.",
          },
          {
            calc: "x < −2",
            why: "Bahagi kedua-dua belah dengan −4 — nombor NEGATIF, jadi simbol BERTUKAR daripada > kepada <.",
          },
        ],
      },
      guided: {
        question: "Selesaikan ketaksamaan serentak: 2x + 5 < 11 dan 3x − 10 < 5.",
        answer:
          "Pertama: 2x<6 → x<3. Kedua: 3x<15 → x<5. Kawasan sepunya (memenuhi kedua-dua): x<3.",
      },
      mistake: {
        wrong:
          "Membahagi kedua-dua belah dengan −4 dalam −4x > 8 dan kekalkan simbol >, memberi x > −2.",
        right: "Membahagi dengan nombor NEGATIF menukar simbol: −4x > 8 menjadi x < −2.",
      },
      practice: {
        easy: {
          question: "Selesaikan: 7x ≥ 28",
          answer: "Bahagi dengan 7 (positif, simbol kekal): x ≥ 4.",
        },
        medium: {
          question:
            "Jualan buku RM12.50 sebuah. Ghani belanja tidak lebih RM80. Berapa buku maksimum boleh dibeli?",
          answer: "12.5n ≤ 80 → n ≤ 6.4. Oleh kerana n bulat, maksimum ialah 6 buku.",
        },
        hard: {
          question: "Selesaikan ketaksamaan serentak: 8x + 5 ≥ 5x − 13 dan 3x − 4 > 9x + 20.",
          answer:
            "Pertama: 3x≥−18 → x≥−6. Kedua: −6x>24 → x<−4 (ditukar, dibahagi −6). Kawasan sepunya: −6 ≤ x < −4.",
        },
      },
      realLife: ["💰 Kekangan bajet", "🍬 Had gula/nutrien harian"],
    },
  ],
  summary: {
    center: "Ketaksamaan Linear",
    branches: [
      { title: "Simbol", points: [">, <, ≥, ≤"] },
      { title: "Menyelesaikan", points: ["Seperti persamaan, tapi tukar bila ×/÷ negatif"] },
      { title: "Serentak", points: ["Penyelesaian = kawasan sepunya"] },
    ],
  },
  formulaSheet: [
    { formula: "≥ sekurang-kurangnya", label: "bulatan tertutup" },
    { formula: "≤ tidak lebih daripada", label: "bulatan tertutup" },
    { formula: "× atau ÷ negatif", label: "TUKAR simbol" },
    { formula: "Serentak", label: "penyelesaian = kawasan sepunya" },
  ],
  quickRevision: [
    "Saya boleh membanding nombor dan mewakilkan ketaksamaan pada garis nombor.",
    "Saya boleh membentuk dan menyelesaikan ketaksamaan linear satu pemboleh ubah.",
    "Saya boleh menyelesaikan ketaksamaan linear serentak dan cari kawasan sepunya.",
  ],
  examTips: [
    "Bulatkan setiap nombor negatif yang anda darab atau bahagi — peringatan untuk tukar simbol.",
    "Untuk ketaksamaan serentak, sentiasa lakar KEDUA-DUA pada garis nombor sama untuk lihat kawasan sepunya dengan jelas.",
  ],
  challenge: {
    question:
      "Sewa kereta: Pakej A kos RM40 + RM8/jam. Pakej B kos RM15/jam tanpa yuran asas. Apakah masa maksimum (ke jam bulat terdekat) Pakej B lebih murah?",
    answer: "15h < 40+8h → 7h < 40 → h < 5.71. Jadi Pakej B lebih murah sehingga 5 jam.",
  },
};

export const mathF1C7InteractiveContent: { en: MathF1C7Content; bm: MathF1C7Content } = { en, bm };

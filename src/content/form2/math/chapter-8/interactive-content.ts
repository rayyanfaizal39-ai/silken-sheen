// Form 2 Mathematics, Chapter 8 — Graphs of Functions / Graf Fungsi.
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter8-graphs-functions-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter8NotesBlock).
// The graph examples hold a genuine JS function (not hardcoded points) —
// LiveFunctionGraph computes the plotted points from it at render time.
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";
import type { RelationCompareItem } from "@/components/notes/blocks/RelationDiagrams";

export interface MathF2C8FunctionMachine {
  inputLabel: string;
  formula: string;
  outputLabel: string;
  caption?: string;
}

export interface MathF2C8RelationCompare {
  items: RelationCompareItem[];
  caption?: string;
}

export interface MathF2C8GraphExample {
  eyebrow: string;
  question: string;
  fn: (x: number) => number;
  xMin: number;
  xMax: number;
  caption: string;
}

export interface MathF2C8Content {
  subtopic81: {
    num: string;
    title: string;
    ideaParagraphs: string[];
    machine: MathF2C8FunctionMachine;
    formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
    relationCompare: MathF2C8RelationCompare;
    worked: { question: string; steps: WorkedStep[] };
    guided: { question: string; answer: string };
    mistake: { wrong: string; right: string };
    practice: Record<Difficulty, PracticeQuestion>;
    realLife?: string[];
  };
  subtopic82: {
    num: string;
    title: string;
    ideaParagraphs: string[];
    graphExamples: MathF2C8GraphExample[];
    guided: { question: string; answer: string };
    mistake: { wrong: string; right: string };
    practice: Record<Difficulty, PracticeQuestion>;
    realLife?: string[];
  };
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C8Content = {
  subtopic81: {
    num: "8.1",
    title: "Functions",
    ideaParagraphs: [
      "A function is a rule where every input has EXACTLY ONE output — never two. Feed in a number, the rule does its thing, one answer comes out.",
    ],
    machine: {
      inputLabel: "x=4",
      formula: "f(x)=x+3",
      outputLabel: "7",
      caption: "One input in, the rule does its work, exactly ONE output comes out",
    },
    formula: {
      eyebrow: "Function Notation",
      formula: "f(x) = x + 3",
      legend: [{ label: "→", text: 'Read "f of x" — the function f applied to input x' }],
    },
    relationCompare: {
      items: [
        {
          label: "✓ one-to-one",
          inputs: [0, 1, 2],
          outputs: [0, 1, 2],
          pairs: [
            [0, 0],
            [1, 1],
            [2, 2],
          ],
          isValid: true,
        },
        {
          label: "✓ many-to-one",
          inputs: [0, 1, 2],
          outputs: [0, 1],
          pairs: [
            [0, 0],
            [1, 0],
            [2, 1],
          ],
          isValid: true,
        },
        {
          label: "✗ one-to-many",
          inputs: [0, 1],
          outputs: [0, 1, 2],
          pairs: [
            [0, 0],
            [0, 1],
            [1, 2],
          ],
          isValid: false,
        },
      ],
      caption:
        "A function needs every input to have only ONE line leading out — one-to-many breaks that rule",
    },
    worked: {
      question:
        'Set P = {1,2,3} maps to Set Q = {4,5,6} by "adding 3". Write this as (a) ordered pairs (b) an equation.',
      steps: [
        {
          calc: "(a) {(1,4), (2,5), (3,6)}",
          why: "Add 3 to each element of P to get its matching element in Q.",
        },
        { calc: "(b) f(x) = x + 3", why: 'The rule "add 3" written as a function equation.' },
      ],
    },
    guided: {
      question: "Is {(1,2),(2,3),(1,4),(3,5)} a function? Explain.",
      answer:
        "No — the input 1 appears twice with two different outputs (2 and 4). One input must give only one output.",
    },
    mistake: {
      wrong: "Assuming many-to-one relations (several inputs sharing one output) aren't functions.",
      right:
        "Many-to-one IS still a function — the rule only breaks when ONE input gives MULTIPLE outputs.",
    },
    practice: {
      easy: {
        question: "Is {(1,2),(2,3),(3,4),(4,5)} a function?",
        answer: "Yes — every input has exactly one output.",
      },
      medium: { question: "Given f(x) = 3x, find f(5).", answer: "f(5) = 15" },
      hard: {
        question:
          'Set S = {10,12,18,20} maps to Set R by "subtracting 8". State the range, and whether it\'s one-to-one or many-to-one.',
        answer: "Range = {2,4,10,12}. Each input gives a different output, so it's one-to-one.",
      },
    },
    realLife: ["🥤 Vending machines", "📱 App input/output logic"],
  },
  subtopic82: {
    num: "8.2",
    title: "Graphs of Functions",
    ideaParagraphs: [
      "Plug in several x-values, get their y-values, plot the (x,y) points, then join them. A straight-line rule (like y=2x+4) draws a LINE. A squared rule (like y=x²−2x−3) draws a curved PARABOLA.",
    ],
    graphExamples: [
      {
        eyebrow: "Worked Example — Linear",
        question: "Complete the table for y = 2x + 4, then plot the graph, for x from −2 to 3.",
        fn: (x) => 2 * x + 4,
        xMin: -2,
        xMax: 3,
        caption: "y = 2x + 4 — every point lines up perfectly straight",
      },
      {
        eyebrow: "Worked Example — Quadratic",
        question:
          "Complete the table for y = x² − 2x − 3, then plot the graph, for x from −2 to 4.",
        fn: (x) => x * x - 2 * x - 3,
        xMin: -2,
        xMax: 4,
        caption: "y = x² − 2x − 3 — the points curve into a smooth parabola",
      },
    ],
    guided: {
      question: "For y = 5 − x, find y when x = −2, −1, 0, 1.",
      answer: "x=−2: y=7. x=−1: y=6. x=0: y=5. x=1: y=4.",
    },
    mistake: {
      wrong: "Joining plotted points with straight segments for a QUADRATIC function.",
      right:
        "Quadratic functions always form a SMOOTH curve (parabola) — never straight lines between points.",
    },
    practice: {
      easy: { question: "For y = x + 1, find y when x = 0, 1, 2.", answer: "1, 2, 3" },
      medium: {
        question: "Is the graph of y = 4 − 2x a straight line or a curve? Why?",
        answer: "A straight line — x only appears to the power 1.",
      },
      hard: {
        question: "For y = 12 − x³, find y when x = −1, 0, 2. What shape will this graph have?",
        answer:
          "x=−1: y=13. x=0: y=12. x=2: y=4. A cubic curve (x³ term), not a straight line or simple parabola.",
      },
    },
    realLife: ["⚽ Ball trajectory", "📈 Business profit modelling"],
  },
  summary: {
    center: "Graphs of Functions",
    branches: [
      { title: "Functions", points: ["One input, exactly one output"] },
      { title: "Linear Graph", points: ["Straight line"] },
      { title: "Quadratic Graph", points: ["Smooth parabola"] },
    ],
  },
  formulaSheet: [
    { formula: "f(x)", label: '"f of x" — the output for input x' },
    { formula: "Linear: highest power 1", label: "→ straight line" },
    { formula: "Quadratic: highest power 2", label: "→ parabola" },
  ],
  quickRevision: [
    "I can identify functions and relation types.",
    "I can construct a table of values and draw graphs of functions.",
  ],
  examTips: [
    "Look at the highest power of x in the equation — power 1 means straight line, power 2 means parabola.",
  ],
  challenge: {
    question:
      "A ball's height follows s = 25t − 2.5t². Find the height at t=2 seconds and t=8 seconds. What do you notice, and why does that make sense for a thrown ball?",
    answer:
      "t=2: s=50−10=40m. t=8: s=200−160=40m. Same height — the ball passes through 40m once going up, once coming back down, matching the parabola's symmetry.",
  },
};

const bm: MathF2C8Content = {
  subtopic81: {
    num: "8.1",
    title: "Fungsi",
    ideaParagraphs: [
      "Fungsi ialah peraturan di mana setiap input mempunyai TEPAT SATU output — tidak pernah dua. Masukkan nombor, peraturan buat kerjanya, satu jawapan keluar.",
    ],
    machine: {
      inputLabel: "x=4",
      formula: "f(x)=x+3",
      outputLabel: "7",
      caption: "Satu input masuk, peraturan buat kerjanya, tepat SATU output keluar",
    },
    formula: {
      eyebrow: "Tatatanda Fungsi",
      formula: "f(x) = x + 3",
      legend: [{ label: "→", text: 'Baca "f bagi x" — fungsi f dikenakan pada input x' }],
    },
    relationCompare: {
      items: [
        {
          label: "✓ satu-ke-satu",
          inputs: [0, 1, 2],
          outputs: [0, 1, 2],
          pairs: [
            [0, 0],
            [1, 1],
            [2, 2],
          ],
          isValid: true,
        },
        {
          label: "✓ banyak-ke-satu",
          inputs: [0, 1, 2],
          outputs: [0, 1],
          pairs: [
            [0, 0],
            [1, 0],
            [2, 1],
          ],
          isValid: true,
        },
        {
          label: "✗ satu-ke-banyak",
          inputs: [0, 1],
          outputs: [0, 1, 2],
          pairs: [
            [0, 0],
            [0, 1],
            [1, 2],
          ],
          isValid: false,
        },
      ],
      caption:
        "Fungsi perlukan setiap input hanya SATU garis keluar — banyak-ke-satu langgar peraturan itu",
    },
    worked: {
      question:
        'Set P = {1,2,3} memetakan Set Q = {4,5,6} dengan "tambah 3". Tulis sebagai (a) pasangan tertib (b) persamaan.',
      steps: [
        {
          calc: "(a) {(1,4), (2,5), (3,6)}",
          why: "Tambah 3 pada setiap unsur P untuk dapat unsur sepadan dalam Q.",
        },
        { calc: "(b) f(x) = x + 3", why: 'Peraturan "tambah 3" ditulis sebagai persamaan fungsi.' },
      ],
    },
    guided: {
      question: "Adakah {(1,2),(2,3),(1,4),(3,5)} fungsi? Jelaskan.",
      answer:
        "Tidak — input 1 muncul dua kali dengan dua output berbeza (2 dan 4). Satu input mesti beri satu output sahaja.",
    },
    mistake: {
      wrong:
        "Menganggap perhubungan banyak-ke-satu (beberapa input kongsi satu output) bukan fungsi.",
      right:
        "Banyak-ke-satu MASIH fungsi — peraturan hanya pecah bila SATU input beri BANYAK output.",
    },
    practice: {
      easy: {
        question: "Adakah {(1,2),(2,3),(3,4),(4,5)} fungsi?",
        answer: "Ya — setiap input ada tepat satu output.",
      },
      medium: { question: "Diberi f(x) = 3x, cari f(5).", answer: "f(5) = 15" },
      hard: {
        question:
          'Set S = {10,12,18,20} memetakan Set R dengan "tolak 8". Nyatakan julat, dan sama ada satu-ke-satu atau banyak-ke-satu.',
        answer: "Julat = {2,4,10,12}. Setiap input beri output berbeza, jadi satu-ke-satu.",
      },
    },
    realLife: ["🥤 Mesin layan diri", "📱 Logik input/output aplikasi"],
  },
  subtopic82: {
    num: "8.2",
    title: "Graf Fungsi",
    ideaParagraphs: [
      "Masukkan beberapa nilai-x, dapatkan nilai-y, plot titik (x,y), kemudian sambungkan. Peraturan garis lurus (seperti y=2x+4) melukis GARIS. Peraturan kuasa dua (seperti y=x²−2x−3) melukis PARABOLA melengkung.",
    ],
    graphExamples: [
      {
        eyebrow: "Contoh Berpandu — Linear",
        question:
          "Lengkapkan jadual bagi y = 2x + 4, kemudian plot graf, untuk x dari −2 hingga 3.",
        fn: (x) => 2 * x + 4,
        xMin: -2,
        xMax: 3,
        caption: "y = 2x + 4 — setiap titik selari lurus sempurna",
      },
      {
        eyebrow: "Contoh Berpandu — Kuasa Dua",
        question:
          "Lengkapkan jadual bagi y = x² − 2x − 3, kemudian plot graf, untuk x dari −2 hingga 4.",
        fn: (x) => x * x - 2 * x - 3,
        xMin: -2,
        xMax: 4,
        caption: "y = x² − 2x − 3 — titik melengkung menjadi parabola licin",
      },
    ],
    guided: {
      question: "Bagi y = 5 − x, cari y apabila x = −2, −1, 0, 1.",
      answer: "x=−2: y=7. x=−1: y=6. x=0: y=5. x=1: y=4.",
    },
    mistake: {
      wrong: "Menyambung titik diplot dengan segmen lurus untuk fungsi KUASA DUA.",
      right:
        "Fungsi kuasa dua sentiasa bentuk lengkung LICIN (parabola) — tidak pernah garis lurus antara titik.",
    },
    practice: {
      easy: { question: "Bagi y = x + 1, cari y apabila x = 0, 1, 2.", answer: "1, 2, 3" },
      medium: {
        question: "Adakah graf y = 4 − 2x garis lurus atau lengkung? Kenapa?",
        answer: "Garis lurus — x hanya muncul pada kuasa 1.",
      },
      hard: {
        question: "Bagi y = 12 − x³, cari y apabila x = −1, 0, 2. Apakah bentuk graf ini?",
        answer:
          "x=−1: y=13. x=0: y=12. x=2: y=4. Lengkung kubik (sebutan x³), bukan garis lurus atau parabola mudah.",
      },
    },
    realLife: ["⚽ Trajektori bola", "📈 Pemodelan untung perniagaan"],
  },
  summary: {
    center: "Graf Fungsi",
    branches: [
      { title: "Fungsi", points: ["Satu input, tepat satu output"] },
      { title: "Graf Linear", points: ["Garis lurus"] },
      { title: "Graf Kuasa Dua", points: ["Parabola licin"] },
    ],
  },
  formulaSheet: [
    { formula: "f(x)", label: '"f bagi x" — output untuk input x' },
    { formula: "Linear: kuasa tertinggi 1", label: "→ garis lurus" },
    { formula: "Kuasa dua: kuasa tertinggi 2", label: "→ parabola" },
  ],
  quickRevision: [
    "Saya boleh mengenal pasti fungsi dan jenis perhubungan.",
    "Saya boleh membina jadual nilai dan melukis graf fungsi.",
  ],
  examTips: [
    "Lihat kuasa tertinggi x dalam persamaan — kuasa 1 bermaksud garis lurus, kuasa 2 bermaksud parabola.",
  ],
  challenge: {
    question:
      "Ketinggian bola ikut s = 25t − 2.5t². Cari ketinggian pada t=2 saat dan t=8 saat. Apa anda perasan, dan kenapa ia masuk akal untuk bola dilontar?",
    answer:
      "t=2: s=50−10=40m. t=8: s=200−160=40m. Ketinggian sama — bola lalu 40m sekali naik, sekali turun semula, sepadan simetri parabola.",
  },
};

export const mathF2C8InteractiveContent: { en: MathF2C8Content; bm: MathF2C8Content } = { en, bm };

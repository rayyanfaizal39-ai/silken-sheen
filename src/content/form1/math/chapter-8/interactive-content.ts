// Form 1 Mathematics, Chapter 8 — Lines and Angles / Garis dan Sudut
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter8-lines-angles-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter8NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC8SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 8.2 only — intersecting-lines illustration embedded in the lesson intro. */
  intersectDiagramCaption?: string;
  /** 8.3 only — parallel-lines/transversal illustration embedded in the lesson intro. */
  parallelDiagramCaption?: string;
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C8Content {
  subtopics: MathC8SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C8Content = {
  subtopics: [
    {
      num: "8.1",
      title: "Lines and Angles",
      ideaParagraphs: [
        "Line segments with the SAME length are congruent; angles with the SAME size are congruent. An angle on a straight line is always 180°; a full turn around a point is always 360°; a reflex angle is between 180° and 360°.",
        "Two angles that add up to 90° are complementary. Two that add up to 180° are supplementary. Two that add up to 360° are conjugate.",
      ],
      formula: {
        eyebrow: "Three Angle Relationships",
        formula: "a+b=90°   |   a+b=180°   |   a+b=360°",
        legend: [
          { label: "Complementary", text: "= 90°" },
          { label: "Supplementary", text: "= 180°" },
          { label: "Conjugate", text: "= 360°" },
        ],
      },
      worked: {
        question:
          "p and 54° are complementary. p and q are supplementary. The angle conjugate to r is 260°. Find p, q, and r.",
        steps: [
          { calc: "p + 54° = 90°   →   p = 36°", why: "p and 54° are complementary (sum to 90°)." },
          {
            calc: "p + q = 180°   →   q = 180−36 = 144°",
            why: "p and q are supplementary (sum to 180°). Substitute p=36°.",
          },
          { calc: "r + 260° = 360°   →   r = 100°", why: "r is conjugate to 260° (sum to 360°)." },
        ],
      },
      guided: {
        question:
          "p and q are supplementary and p > q. If the difference between p and q is 52°, find p and q.",
        answer: "p+q=180 and p−q=52. Add both equations: 2p=232, p=116. Then q=180−116=64.",
      },
      mistake: {
        wrong: "Confusing complementary (90°) with supplementary (180°) — a very common mix-up.",
        right:
          '"C for Complementary, C for Corner (90°)". Supplementary\'s "S" — think Straight line (180°).',
      },
      practice: {
        easy: {
          question: "Is 60° the complement of 30°?",
          answer: "Yes — 60°+30°=90°.",
        },
        medium: {
          question: "Is 300° and 60° a pair of conjugate angles?",
          answer: "Yes — 300°+60°=360°.",
        },
        hard: {
          question:
            "a and 46° are complementary. a and b are supplementary. The angle conjugate to c is 283°. Find a, b, c.",
          answer: "a=90−46=44°. b=180−44=136°. c=360−283=77°.",
        },
      },
      realLife: ["🏗️ Architecture and construction", "📐 Logo and pattern design"],
    },
    {
      num: "8.2",
      title: "Angles related to Intersecting Lines",
      ideaParagraphs: [
        "When two straight lines cross, they form 4 angles. The two angles directly across from each other are vertically opposite — always EQUAL. Two angles next to each other are adjacent — they always add up to 180° (they sit on a straight line).",
      ],
      intersectDiagramCaption:
        "∠a = ∠c and ∠b = ∠d (vertically opposite, in green/white pairs); every adjacent pair sums to 180°",
      formula: {
        eyebrow: "Vertically Opposite & Adjacent",
        formula: "∠a = ∠c   |   ∠a + ∠b = 180°",
      },
      worked: {
        question:
          "PSQ, RSTU and PTV are straight lines. If one angle at S is 135° and one angle at T is 62°, find x and y (as shown in the diagram).",
        steps: [
          {
            calc: "x + 135° = 180°",
            why: "x and 135° are adjacent angles at the intersecting lines (sum to 180°).",
          },
          {
            calc: "x = 180° − 135° = 45°",
            why: "Subtracting 135° from both sides of the equation leaves x by itself.",
          },
          { calc: "y = 62°", why: "y is vertically opposite to the 62° angle, so it's equal." },
        ],
      },
      guided: {
        question:
          "POR and TOQ are straight lines. ∠POT = 72° and one angle formed is 60° (x is adjacent to it, y is half of the remaining angle). Find x if x+60°=72°.",
        answer:
          "x + 60° = 72° (since ∠POT and this combined angle are vertically opposite to another 72° pair). x = 72° − 60° = 12°.",
      },
      mistake: {
        wrong: "Assuming ALL four angles at an intersection are equal.",
        right:
          "Only the pair directly ACROSS from each other are equal — the two pairs next to each other are supplementary (180°), not equal.",
      },
      practice: {
        easy: {
          question: "Two lines intersect. One angle is 65°. What is its vertically opposite angle?",
          answer: "65°",
        },
        medium: {
          question:
            "PQ, RS and TU are straight lines. One angle is 140°, adjacent angle is 80°. Find x and y (x is vertically opposite to the 140°+80° gap, y adjacent to 80°).",
          answer:
            "Angles on a straight line sum to 180°: x = 180−140=40°... using the vertically-opposite and adjacent rules together to solve for each unknown in sequence.",
        },
        hard: {
          question:
            "POS and UOR are straight lines. OQ bisects ∠POR. ∠POU and ∠UOT are complementary, with ∠POU=56°. Find x and y as shown.",
          answer:
            "∠UOT = 90−56=34° (complementary). Continue applying straight-line (180°) and vertically-opposite rules to find remaining unknowns step by step.",
        },
      },
      realLife: ["🛣️ Road junctions", "✂️ Scissors and X-shaped structures"],
    },
    {
      num: "8.3",
      title: "Angles related to Parallel Lines and Transversals",
      ideaParagraphs: [
        "A transversal is a line that crosses two or more other lines. When it crosses two PARALLEL lines, three special angle pairs appear: corresponding angles (same position at each crossing — EQUAL), alternate angles (opposite sides of the transversal, between the lines — EQUAL), and interior angles (same side, between the lines — sum to 180°).",
      ],
      parallelDiagramCaption:
        "Corresponding (∠2=∠6), alternate (∠4=∠6), interior (∠4+∠5=180°) — same colour = same relationship",
      formula: {
        eyebrow: "Three Angle Types at Parallel Lines",
        formula: "Corresponding =   Alternate =   Interior sum 180°",
      },
      worked: {
        question:
          "PQ, RS and TU are parallel lines. Given one angle is 60° and another is 118°, find a, b and c.",
        steps: [
          { calc: "a = 60°", why: "a is alternate to the 60° angle — alternate angles are equal." },
          {
            calc: "b = 118°",
            why: "b is corresponding to the 118° angle — corresponding angles are equal.",
          },
          {
            calc: "b + c = 180°   →   c = 180−118 = 62°",
            why: "b and c are interior angles (co-interior), so they sum to 180°.",
          },
        ],
      },
      guided: {
        question:
          "Two lines are cut by a transversal. One angle is 42°, and the co-interior angle is 128°. Are the two lines parallel?",
        answer:
          "42° + 128° = 170°, NOT 180°. Since interior angles should sum to 180° for parallel lines, these lines are NOT parallel.",
      },
      mistake: {
        wrong:
          "Assuming any two angles formed by a transversal are equal, without checking their exact position.",
        right:
          "Corresponding and alternate angles are EQUAL; interior (co-interior) angles SUM TO 180° — check which pattern the position matches.",
      },
      practice: {
        easy: {
          question:
            "Two parallel lines cut by a transversal have a corresponding angle pair. If one is 48°, what is the other?",
          answer: "48°",
        },
        medium: {
          question:
            "EF and GH are straight lines (parallel), cut by a transversal. One angle is 76°, another is 110°. Find a, b, c, d marked at the crossings.",
          answer:
            "Use corresponding (equal), alternate (equal), and straight-line (180°) rules together to find each of a, b, c, d in turn.",
        },
        hard: {
          question:
            "The diagram shows Devi and Umi at two buildings. Draw and label the angle of elevation of Umi from Devi, and the angle of depression of Devi from Umi. How are these two angles related?",
          answer:
            "Both horizontal lines are parallel, so the angle of elevation and angle of depression are ALTERNATE angles — they are EQUAL.",
        },
      },
      realLife: ["🛤️ Railway tracks", "🗼 Surveying (elevation/depression)"],
    },
  ],
  summary: {
    center: "Lines and Angles",
    branches: [
      { title: "Basics", points: ["Complementary 90°, Supplementary 180°, Conjugate 360°"] },
      { title: "Intersecting Lines", points: ["Vertically opposite equal; adjacent = 180°"] },
      { title: "Parallel Lines", points: ["Corresponding/alternate equal; interior = 180°"] },
    ],
  },
  formulaSheet: [
    { formula: "Straight line = 180°", label: "One whole turn = 360°" },
    { formula: "Vertically opposite: equal", label: "Adjacent: sum 180°" },
    { formula: "Corresponding/Alternate: equal", label: "Interior: sum 180°" },
    { formula: "Elevation = Depression", label: "(alternate angles, parallel horizontals)" },
  ],
  quickRevision: [
    "I can identify complementary, supplementary and conjugate angles.",
    "I can find angle values at intersecting lines using vertically opposite and adjacent angle rules.",
    "I can find angle values related to parallel lines and transversals, and determine whether lines are parallel.",
  ],
  examTips: [
    'Trace an "F" shape for corresponding angles, a "Z" shape for alternate angles, and a "C" shape for interior angles — the shapes help you spot the pattern fast.',
    "To check if lines are parallel, verify EITHER corresponding angles are equal OR interior angles sum to 180° — either one is sufficient proof.",
  ],
  challenge: {
    question:
      "POS, QOT and UOR are straight lines. Given the angles 5y and 2y marked at O, find the value of y.",
    answer: "Using the angle-on-a-straight-line rule: 5y + 2y + 5y = 180° → 12y = 180° → y = 15°.",
  },
};

const bm: MathF1C8Content = {
  subtopics: [
    {
      num: "8.1",
      title: "Garis dan Sudut",
      ideaParagraphs: [
        "Tembereng garis dengan panjang SAMA ialah kongruen; sudut dengan saiz SAMA ialah kongruen. Sudut pada garis lurus sentiasa 180°; pusingan penuh sekeliling satu titik sentiasa 360°; sudut refleks antara 180° dan 360°.",
        "Dua sudut yang berjumlah 90° ialah pelengkap. Dua yang berjumlah 180° ialah penggenap. Dua yang berjumlah 360° ialah konjugat.",
      ],
      formula: {
        eyebrow: "Tiga Perhubungan Sudut",
        formula: "a+b=90°   |   a+b=180°   |   a+b=360°",
        legend: [
          { label: "Pelengkap", text: "= 90°" },
          { label: "Penggenap", text: "= 180°" },
          { label: "Konjugat", text: "= 360°" },
        ],
      },
      worked: {
        question:
          "p dan 54° pelengkap. p dan q penggenap. Sudut konjugat kepada r ialah 260°. Cari p, q, dan r.",
        steps: [
          { calc: "p + 54° = 90°   →   p = 36°", why: "p dan 54° pelengkap (jumlah 90°)." },
          {
            calc: "p + q = 180°   →   q = 180−36 = 144°",
            why: "p dan q penggenap (jumlah 180°). Gantikan p=36°.",
          },
          { calc: "r + 260° = 360°   →   r = 100°", why: "r konjugat kepada 260° (jumlah 360°)." },
        ],
      },
      guided: {
        question: "p dan q penggenap dan p > q. Jika beza antara p dan q ialah 52°, cari p dan q.",
        answer:
          "p+q=180 dan p−q=52. Tambah kedua-dua persamaan: 2p=232, p=116. Kemudian q=180−116=64.",
      },
      mistake: {
        wrong: "Mengelirukan pelengkap (90°) dengan penggenap (180°) — kesilapan sangat lazim.",
        right: '"P untuk Pelengkap, P untuk Penjuru (90°)". Penggenap — fikir garis lurus (180°).',
      },
      practice: {
        easy: {
          question: "Adakah 60° pelengkap kepada 30°?",
          answer: "Ya — 60°+30°=90°.",
        },
        medium: {
          question: "Adakah 300° dan 60° sepasang sudut konjugat?",
          answer: "Ya — 300°+60°=360°.",
        },
        hard: {
          question:
            "a dan 46° pelengkap. a dan b penggenap. Sudut konjugat kepada c ialah 283°. Cari a, b, c.",
          answer: "a=90−46=44°. b=180−44=136°. c=360−283=77°.",
        },
      },
      realLife: ["🏗️ Senibina dan pembinaan", "📐 Reka bentuk logo dan corak"],
    },
    {
      num: "8.2",
      title: "Sudut berkaitan Garis Bersilang",
      ideaParagraphs: [
        "Apabila dua garis lurus bersilang, ia membentuk 4 sudut. Dua sudut bertentangan terus antara satu sama lain ialah bertentang bucu — sentiasa SAMA. Dua sudut bersebelahan ialah bersebelahan — sentiasa berjumlah 180° (ia terletak pada garis lurus).",
      ],
      intersectDiagramCaption:
        "∠a = ∠c dan ∠b = ∠d (bertentang bucu, pasangan hijau/putih); setiap pasangan bersebelahan berjumlah 180°",
      formula: {
        eyebrow: "Bertentang Bucu & Bersebelahan",
        formula: "∠a = ∠c   |   ∠a + ∠b = 180°",
      },
      worked: {
        question:
          "PSQ, RSTU dan PTV ialah garis lurus. Jika satu sudut di S ialah 135° dan satu sudut di T ialah 62°, cari x dan y (seperti dalam gambar rajah).",
        steps: [
          {
            calc: "x + 135° = 180°",
            why: "x dan 135° sudut bersebelahan pada garis bersilang (jumlah 180°).",
          },
          {
            calc: "x = 180° − 135° = 45°",
            why: "Menolak 135° daripada kedua-dua belah persamaan meninggalkan x bersendirian.",
          },
          { calc: "y = 62°", why: "y bertentang bucu dengan sudut 62°, jadi ia sama." },
        ],
      },
      guided: {
        question:
          "POR dan TOQ ialah garis lurus. ∠POT = 72° dan satu sudut terbentuk ialah 60° (x bersebelahan dengannya). Cari x jika x+60°=72°.",
        answer:
          "x + 60° = 72° (kerana ∠POT dan sudut gabungan ini bertentang bucu dengan pasangan 72° lain). x = 72° − 60° = 12°.",
      },
      mistake: {
        wrong: "Menganggap KESEMUA empat sudut pada persilangan adalah sama.",
        right:
          "Hanya pasangan bertentangan TERUS antara satu sama lain adalah sama — dua pasangan bersebelahan adalah penggenap (180°), bukan sama.",
      },
      practice: {
        easy: {
          question: "Dua garis bersilang. Satu sudut ialah 65°. Apakah sudut bertentang bucunya?",
          answer: "65°",
        },
        medium: {
          question:
            "PQ, RS dan TU ialah garis lurus. Satu sudut 140°, sudut bersebelahan 80°. Cari x dan y.",
          answer:
            "Sudut pada garis lurus berjumlah 180°: x = 180−140=40°... guna peraturan bertentang bucu dan bersebelahan bersama untuk selesaikan setiap yang tidak diketahui.",
        },
        hard: {
          question:
            "POS dan UOR ialah garis lurus. OQ membahagi dua ∠POR. ∠POU dan ∠UOT pelengkap, dengan ∠POU=56°. Cari x dan y.",
          answer:
            "∠UOT = 90−56=34° (pelengkap). Teruskan guna peraturan garis lurus (180°) dan bertentang bucu untuk cari yang tidak diketahui selebihnya.",
        },
      },
      realLife: ["🛣️ Simpang jalan", "✂️ Gunting dan struktur berbentuk X"],
    },
    {
      num: "8.3",
      title: "Sudut berkaitan Garis Selari dan Garis Rentas Lintang",
      ideaParagraphs: [
        "Garis rentas lintang ialah garis yang merentasi dua atau lebih garis lain. Apabila ia merentasi dua garis SELARI, tiga pasangan sudut istimewa muncul: sudut sepadan (kedudukan sama pada setiap persilangan — SAMA), sudut selang-seli (sisi bertentangan garis rentas, antara garis — SAMA), dan sudut pedalaman (sisi sama, antara garis — berjumlah 180°).",
      ],
      parallelDiagramCaption:
        "Sepadan (∠2=∠6), selang-seli (∠4=∠6), pedalaman (∠4+∠5=180°) — warna sama = perhubungan sama",
      formula: {
        eyebrow: "Tiga Jenis Sudut pada Garis Selari",
        formula: "Sepadan =   Selang-seli =   Pedalaman jumlah 180°",
      },
      worked: {
        question:
          "PQ, RS dan TU ialah garis selari. Diberi satu sudut 60° dan satu lagi 118°, cari a, b dan c.",
        steps: [
          {
            calc: "a = 60°",
            why: "a selang-seli dengan sudut 60° — sudut selang-seli adalah sama.",
          },
          { calc: "b = 118°", why: "b sepadan dengan sudut 118° — sudut sepadan adalah sama." },
          {
            calc: "b + c = 180°   →   c = 180−118 = 62°",
            why: "b dan c sudut pedalaman (sepihak), jadi berjumlah 180°.",
          },
        ],
      },
      guided: {
        question:
          "Dua garis dipotong garis rentas lintang. Satu sudut 42°, dan sudut pedalaman sepihak ialah 128°. Adakah kedua-dua garis selari?",
        answer:
          "42° + 128° = 170°, BUKAN 180°. Oleh kerana sudut pedalaman patut berjumlah 180° untuk garis selari, garis ini BUKAN selari.",
      },
      mistake: {
        wrong:
          "Menganggap sebarang dua sudut dibentuk garis rentas lintang adalah sama, tanpa semak kedudukan tepat.",
        right:
          "Sudut sepadan dan selang-seli adalah SAMA; sudut pedalaman BERJUMLAH 180° — semak corak kedudukan mana yang sepadan.",
      },
      practice: {
        easy: {
          question:
            "Dua garis selari dipotong garis rentas lintang mempunyai pasangan sudut sepadan. Jika satu 48°, apakah satu lagi?",
          answer: "48°",
        },
        medium: {
          question:
            "EF dan GH ialah garis lurus (selari), dipotong garis rentas lintang. Satu sudut 76°, satu lagi 110°. Cari a, b, c, d yang ditandakan.",
          answer:
            "Guna peraturan sepadan (sama), selang-seli (sama), dan garis lurus (180°) bersama untuk cari a, b, c, d.",
        },
        hard: {
          question:
            "Gambar rajah tunjuk Devi dan Umi di dua bangunan. Lukis dan label sudut dongak Umi dari Devi, dan sudut tunduk Devi dari Umi. Bagaimana kedua-dua sudut ini berkaitan?",
          answer:
            "Kedua-dua garis mendatar selari, jadi sudut dongak dan sudut tunduk ialah sudut SELANG-SELI — ia SAMA.",
        },
      },
      realLife: ["🛤️ Landasan kereta api", "🗼 Ukur tanah (dongak/tunduk)"],
    },
  ],
  summary: {
    center: "Garis dan Sudut",
    branches: [
      { title: "Asas", points: ["Pelengkap 90°, Penggenap 180°, Konjugat 360°"] },
      { title: "Garis Bersilang", points: ["Bertentang bucu sama; bersebelahan = 180°"] },
      { title: "Garis Selari", points: ["Sepadan/selang-seli sama; pedalaman = 180°"] },
    ],
  },
  formulaSheet: [
    { formula: "Garis lurus = 180°", label: "Satu pusingan penuh = 360°" },
    { formula: "Bertentang bucu: sama", label: "Bersebelahan: jumlah 180°" },
    { formula: "Sepadan/Selang-seli: sama", label: "Pedalaman: jumlah 180°" },
    { formula: "Dongak = Tunduk", label: "(sudut selang-seli, mendatar selari)" },
  ],
  quickRevision: [
    "Saya boleh mengenal pasti sudut pelengkap, penggenap dan konjugat.",
    "Saya boleh cari nilai sudut pada garis bersilang menggunakan peraturan bertentang bucu dan bersebelahan.",
    "Saya boleh cari nilai sudut berkaitan garis selari dan garis rentas lintang, dan tentukan sama ada garis selari.",
  ],
  examTips: [
    'Kesan bentuk "F" untuk sudut sepadan, bentuk "Z" untuk sudut selang-seli, dan bentuk "C" untuk sudut pedalaman — bentuk ini membantu kenal pasti corak dengan cepat.',
    "Untuk semak jika garis selari, sahkan SAMA ADA sudut sepadan sama ATAU sudut pedalaman berjumlah 180° — mana-mana satu sudah cukup bukti.",
  ],
  challenge: {
    question:
      "POS, QOT dan UOR ialah garis lurus. Diberi sudut 5y dan 2y ditandakan di O, cari nilai y.",
    answer: "Guna peraturan sudut pada garis lurus: 5y + 2y + 5y = 180° → 12y = 180° → y = 15°.",
  },
};

export const mathF1C8InteractiveContent: { en: MathF1C8Content; bm: MathF1C8Content } = { en, bm };

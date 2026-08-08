// Form 2 Mathematics, Chapter 5 — Circles / Bulatan. Interactive bilingual
// content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from
// T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter5-circles-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter5NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C5Visual =
  | {
      kind: "circleParts";
      centreLabel: string;
      radiusLabel: string;
      diameterLabel: string;
      chordLabel: string;
      arcLabel: string;
      caption?: string;
    }
  | { kind: "chordBisect"; equalHalvesLabel: string; caption?: string }
  | { kind: "circleUnroll"; caption?: string };

export interface MathF2C5Block {
  formula?: { eyebrow?: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
}

export interface MathF2C5SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C5Visual;
  blocks: MathF2C5Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C5Content {
  subtopics: MathF2C5SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Properties of Circles",
      ideaParagraphs: [
        "A circle is every point sitting the SAME distance from one fixed centre. Once you know the parts' names, every circle rule in this chapter becomes easy to talk about.",
      ],
      visual: {
        kind: "circleParts",
        centreLabel: "centre",
        radiusLabel: "radius",
        diameterLabel: "diameter",
        chordLabel: "chord",
        arcLabel: "arc",
        caption:
          "Radius: centre to edge. Diameter: all the way across through the centre. Chord: any straight line joining two points on the edge. Arc: a piece of the curved edge.",
      },
      blocks: [
        {
          formula: { eyebrow: "Key Parts", formula: "Diameter = 2 × Radius" },
          worked: {
            question:
              "Name the parts labeled in the diagram above: the line from centre to edge, the line all the way across through the centre, and the curve joining two points on the circumference.",
            steps: [
              {
                calc: "Centre to edge = radius",
                why: "Any straight line from the centre to a point on the circle.",
              },
              {
                calc: "All the way across through centre = diameter",
                why: "It's a chord too, but the special one that passes through the centre.",
              },
              {
                calc: "Curve joining two points = arc",
                why: "A piece of the circle's curved edge.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "If a circle's radius is 7 cm, what is its diameter?",
        answer: "Diameter = 2 × 7 = 14 cm.",
      },
      mistake: {
        wrong: "Confusing a chord with the diameter.",
        right:
          "Every diameter IS a chord, but only the one passing through the CENTRE — other chords don't.",
      },
      practice: {
        easy: { question: "A circle has diameter 20 cm. Find its radius.", answer: "10 cm" },
        medium: {
          question: "What's the region enclosed by a chord and an arc called?",
          answer: "A segment.",
        },
        hard: {
          question: "What's the region enclosed by two radii and an arc called?",
          answer: "A sector.",
        },
      },
      realLife: ["🕐 Clocks", "🎡 Ferris wheels"],
    },
    {
      num: "5.2",
      title: "Symmetry and Chords",
      ideaParagraphs: [
        "Fold a circle exactly in half along any diameter, and the two halves match perfectly — that's why every diameter is a line of symmetry. Draw a radius that meets a chord at a right angle, and it splits that chord into two EQUAL halves.",
      ],
      visual: {
        kind: "chordBisect",
        equalHalvesLabel: "equal halves",
        caption:
          "The radius meets the chord at a right angle (small square marker) — the two tick marks show the chord is split into two EQUAL pieces",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Perpendicular Radius Bisects the Chord",
            formula: "Right angle at the chord → equal halves",
            legend: [
              {
                label: "→",
                text: "The radius, half-chord, and full radius form a right-angled triangle — Pythagoras applies!",
              },
            ],
          },
          worked: {
            question:
              "A radius OP is perpendicular to chord MN. If the radius is 10 cm and OS (the distance from centre to chord) is 8 cm, find the length of MN.",
            steps: [
              {
                calc: "MS = √(10² − 8²)",
                why: "The radius, half-chord, and OS form a right-angled triangle — Pythagoras applies.",
              },
              { calc: "MS = √36 = 6 cm", why: "Simplify." },
              {
                calc: "MN = 2 × 6 = 12 cm",
                why: "The perpendicular radius bisects the chord, so double MS to get the full chord.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Two equal chords RS and TU exist in a circle. Are their arcs the same length?",
        answer:
          "Yes — equal chords always produce arcs of equal length, and are equally distant from the centre.",
      },
      mistake: {
        wrong: "Assuming ANY radius bisects a chord it touches.",
        right:
          "Only a radius meeting the chord at exactly 90° bisects it — check for the right angle first.",
      },
      practice: {
        easy: {
          question: "A radius bisects a 16 cm chord. What is the length of each half?",
          answer: "8 cm each",
        },
        medium: {
          question: "OK=3cm, NK=4cm, where K is on chord MN and OK⊥MN. Find ON.",
          answer: "ON²=3²+4²=25. ON=5 cm.",
        },
        hard: {
          question:
            "Two equal chords RS=24cm and TU exist, with OP=5cm (perpendicular distance to RS). Find the circle's radius.",
          answer: "PR=12cm (half of RS). OR²=12²+5²=169. OR=13cm.",
        },
      },
      realLife: ["🌉 Arch bridge design", "📡 Satellite dish shape"],
    },
    {
      num: "5.3",
      title: "Circumference and Area of a Circle",
      ideaParagraphs: [
        "Slice a circle into thin pizza-like sectors and lay them side by side — they roughly form a rectangle. The more slices, the straighter the edges get. That rectangle's height is the radius, and its base is HALF the circumference.",
      ],
      visual: {
        kind: "circleUnroll",
        caption:
          "Area of rectangle = base × height = πr × r = πr² — same area as the circle it came from",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Circumference and Area",
            formula: "C = 2πr   |   A = πr²",
            legend: [
              {
                label: "→",
                text: 'Area = base × height of that "unrolled" rectangle = (πr) × r = πr²',
              },
            ],
          },
          worked: {
            question: "Calculate the circumference of a circle with diameter 14 cm (use π=22/7).",
            steps: [
              { calc: "C = πd = 22/7 × 14", why: "Circumference uses the diameter directly." },
              { calc: "C = 44 cm", why: "22/7 × 14 = 44." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Length of an Arc",
            formula: "Arc length = (θ/360°) × 2πr",
            legend: [
              {
                label: "→",
                text: "An arc is just a FRACTION of the whole circumference — the fraction is θ out of a full 360°",
              },
            ],
          },
          worked: {
            question: "Find the length of a minor arc that spans 60° in a circle of radius 14 cm.",
            steps: [
              {
                calc: "Arc = (60/360) × 2 × 22/7 × 14",
                why: "60° out of the full 360° circle, times the full circumference.",
              },
              { calc: "Arc = 14.67 cm", why: "Simplify the calculation." },
            ],
          },
        },
      ],
      guided: {
        question: "Find the area of a circle with radius 21 cm (use π=22/7).",
        answer: "A = 22/7 × 21² = 22/7 × 441 = 1386 cm².",
      },
      mistake: {
        wrong: "Using the diameter instead of radius in A = πr².",
        right: "Area ALWAYS needs the radius — if you're given the diameter, halve it first.",
      },
      practice: {
        easy: {
          question: "Find the circumference of a circle with radius 7 cm (π=22/7).",
          answer: "44 cm",
        },
        medium: {
          question: "Find the area of a semicircle with radius 10 cm (π=3.142).",
          answer: "Full circle = 3.142×100=314.2. Half = 157.1 cm².",
        },
        hard: {
          question:
            "A circle of radius 21 cm has a sector with angle 72°. Find the sector's area (π=22/7).",
          answer: "Full area = 22/7×441=1386. Sector = 72/360×1386 = 277.2 cm².",
        },
      },
      realLife: ["🍕 Pizza slices", "🎡 Wheel and gear design"],
    },
  ],
  summary: {
    center: "Circles",
    branches: [
      { title: "Parts", points: ["Radius, diameter, chord, arc, sector"] },
      { title: "Chords", points: ["Perpendicular radius bisects it"] },
      { title: "Circumference/Area", points: ["C=2πr, A=πr²"] },
    ],
  },
  formulaSheet: [
    { formula: "C = 2πr = πd", label: "Circumference" },
    { formula: "A = πr²", label: "Area" },
    { formula: "Arc = (θ/360°)×2πr", label: "" },
    { formula: "Sector = (θ/360°)×πr²", label: "" },
  ],
  quickRevision: [
    "I can name the parts of a circle.",
    "I can use chord properties, including with Pythagoras.",
    "I can find circumference, area, arc length and sector area.",
  ],
  examTips: [
    "Given a diameter but need the radius (or vice versa)? Always convert first before using any formula.",
    "Arc and sector problems are just fractions of the full circle — always write the θ/360° fraction first.",
  ],
  challenge: {
    question:
      "A round table (radius 70 cm) needs skirting fabric around its edge, plus a circular tablecloth on top. Find the total length of skirting AND the area of tablecloth needed (π=22/7).",
    answer:
      "Skirting = circumference = 2×22/7×70 = 440 cm. Tablecloth = area = 22/7×70² = 15,400 cm².",
  },
};

const bm: MathF2C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Sifat Bulatan",
      ideaParagraphs: [
        "Bulatan ialah setiap titik terletak jarak SAMA dari satu pusat tetap. Sebaik anda tahu nama bahagiannya, setiap peraturan bulatan dalam bab ini mudah dibincangkan.",
      ],
      visual: {
        kind: "circleParts",
        centreLabel: "pusat",
        radiusLabel: "jejari",
        diameterLabel: "diameter",
        chordLabel: "perentas",
        arcLabel: "lengkok",
        caption:
          "Jejari: pusat ke tepi. Diameter: merentasi terus melalui pusat. Perentas: sebarang garis lurus menghubungkan dua titik di tepi. Lengkok: sebahagian tepi melengkung.",
      },
      blocks: [
        {
          formula: { eyebrow: "Bahagian Utama", formula: "Diameter = 2 × Jejari" },
          worked: {
            question:
              "Namakan bahagian dalam gambar rajah di atas: garis dari pusat ke tepi, garis merentasi terus melalui pusat, dan lengkung menghubungkan dua titik pada lilitan.",
            steps: [
              {
                calc: "Pusat ke tepi = jejari",
                why: "Sebarang garis lurus dari pusat ke titik pada bulatan.",
              },
              {
                calc: "Merentasi terus melalui pusat = diameter",
                why: "Ia perentas juga, tetapi yang istimewa melalui pusat.",
              },
              {
                calc: "Lengkung menghubungkan dua titik = lengkok",
                why: "Sebahagian tepi melengkung bulatan.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Jika jejari bulatan 7 cm, apakah diameternya?",
        answer: "Diameter = 2 × 7 = 14 cm.",
      },
      mistake: {
        wrong: "Mengelirukan perentas dengan diameter.",
        right:
          "Setiap diameter IALAH perentas, tetapi hanya yang melalui PUSAT — perentas lain tidak.",
      },
      practice: {
        easy: { question: "Bulatan ada diameter 20 cm. Cari jejarinya.", answer: "10 cm" },
        medium: {
          question: "Apakah kawasan dilingkungi perentas dan lengkok dipanggil?",
          answer: "Tembereng.",
        },
        hard: {
          question: "Apakah kawasan dilingkungi dua jejari dan lengkok dipanggil?",
          answer: "Sektor.",
        },
      },
      realLife: ["🕐 Jam", "🎡 Kincir raksasa"],
    },
    {
      num: "5.2",
      title: "Simetri dan Perentas",
      ideaParagraphs: [
        "Lipat bulatan tepat separuh di sepanjang sebarang diameter, dan dua separuh sepadan sempurna — itu sebab setiap diameter garis simetri. Lukis jejari bertemu perentas pada sudut tegak, dan ia membahagi perentas itu kepada dua separuh SAMA.",
      ],
      visual: {
        kind: "chordBisect",
        equalHalvesLabel: "separuh sama",
        caption:
          "Jejari bertemu perentas pada sudut tegak (penanda petak kecil) — dua tanda tick tunjuk perentas terbahagi dua bahagian SAMA",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Jejari Serenjang Membahagi Dua Perentas",
            formula: "Sudut tegak di perentas → separuh sama",
            legend: [
              {
                label: "→",
                text: "Jejari, separuh-perentas, dan jejari penuh bentuk segi tiga bersudut tegak — Pythagoras terpakai!",
              },
            ],
          },
          worked: {
            question:
              "Jejari OP serenjang dengan perentas MN. Jika jejari 10 cm dan OS (jarak pusat ke perentas) 8 cm, cari panjang MN.",
            steps: [
              {
                calc: "MS = √(10² − 8²)",
                why: "Jejari, separuh-perentas, dan OS bentuk segi tiga bersudut tegak — Pythagoras terpakai.",
              },
              { calc: "MS = √36 = 6 cm", why: "Permudahkan." },
              {
                calc: "MN = 2 × 6 = 12 cm",
                why: "Jejari serenjang membahagi dua perentas, jadi gandakan MS untuk dapat perentas penuh.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Dua perentas sama RS dan TU wujud dalam bulatan. Adakah lengkoknya panjang sama?",
        answer:
          "Ya — perentas sama sentiasa menghasilkan lengkok panjang sama, dan sama jarak dari pusat.",
      },
      mistake: {
        wrong: "Menganggap SEBARANG jejari membahagi dua perentas yang disentuhnya.",
        right:
          "Hanya jejari bertemu perentas pada tepat 90° membahagi duanya — semak sudut tegak dahulu.",
      },
      practice: {
        easy: {
          question: "Jejari membahagi dua perentas 16 cm. Apakah panjang setiap separuh?",
          answer: "8 cm setiap satu",
        },
        medium: {
          question: "OK=3cm, NK=4cm, K pada perentas MN dan OK⊥MN. Cari ON.",
          answer: "ON²=3²+4²=25. ON=5 cm.",
        },
        hard: {
          question:
            "Dua perentas sama RS=24cm dan TU wujud, dengan OP=5cm (jarak serenjang ke RS). Cari jejari bulatan.",
          answer: "PR=12cm (separuh RS). OR²=12²+5²=169. OR=13cm.",
        },
      },
      realLife: ["🌉 Reka bentuk jambatan gerbang", "📡 Bentuk pinggan satelit"],
    },
    {
      num: "5.3",
      title: "Lilitan dan Luas Bulatan",
      ideaParagraphs: [
        "Hiris bulatan kepada sektor nipis seperti piza dan susun bersebelahan — ia lebih kurang membentuk segi empat tepat. Semakin banyak hirisan, semakin lurus tepinya. Tinggi segi empat tepat itu jejari, dan tapaknya SEPARUH lilitan.",
      ],
      visual: {
        kind: "circleUnroll",
        caption:
          "Luas segi empat tepat = tapak × tinggi = πr × r = πr² — luas sama dengan bulatan asalnya",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Lilitan dan Luas",
            formula: "C = 2πr   |   A = πr²",
            legend: [
              {
                label: "→",
                text: 'Luas = tapak × tinggi segi empat tepat "digulung" itu = (πr) × r = πr²',
              },
            ],
          },
          worked: {
            question: "Kira lilitan bulatan berdiameter 14 cm (guna π=22/7).",
            steps: [
              { calc: "C = πd = 22/7 × 14", why: "Lilitan guna diameter terus." },
              { calc: "C = 44 cm", why: "22/7 × 14 = 44." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Panjang Lengkok",
            formula: "Panjang lengkok = (θ/360°) × 2πr",
            legend: [
              {
                label: "→",
                text: "Lengkok hanyalah PECAHAN keseluruhan lilitan — pecahan itu θ daripada 360° penuh",
              },
            ],
          },
          worked: {
            question: "Cari panjang lengkok minor merangkumi 60° dalam bulatan berjejari 14 cm.",
            steps: [
              {
                calc: "Lengkok = (60/360) × 2 × 22/7 × 14",
                why: "60° daripada bulatan penuh 360°, darab lilitan penuh.",
              },
              { calc: "Lengkok = 14.67 cm", why: "Permudahkan pengiraan." },
            ],
          },
        },
      ],
      guided: {
        question: "Cari luas bulatan berjejari 21 cm (guna π=22/7).",
        answer: "A = 22/7 × 21² = 22/7 × 441 = 1386 cm².",
      },
      mistake: {
        wrong: "Guna diameter bukan jejari dalam A = πr².",
        right: "Luas SENTIASA perlukan jejari — jika diberi diameter, separuhkan dahulu.",
      },
      practice: {
        easy: {
          question: "Cari lilitan bulatan berjejari 7 cm (π=22/7).",
          answer: "44 cm",
        },
        medium: {
          question: "Cari luas separuh bulatan berjejari 10 cm (π=3.142).",
          answer: "Bulatan penuh = 3.142×100=314.2. Separuh = 157.1 cm².",
        },
        hard: {
          question: "Bulatan berjejari 21 cm ada sektor bersudut 72°. Cari luas sektor (π=22/7).",
          answer: "Luas penuh = 22/7×441=1386. Sektor = 72/360×1386 = 277.2 cm².",
        },
      },
      realLife: ["🍕 Hirisan piza", "🎡 Reka bentuk roda dan gear"],
    },
  ],
  summary: {
    center: "Bulatan",
    branches: [
      { title: "Bahagian", points: ["Jejari, diameter, perentas, lengkok, sektor"] },
      { title: "Perentas", points: ["Jejari serenjang membahagi dua"] },
      { title: "Lilitan/Luas", points: ["C=2πr, A=πr²"] },
    ],
  },
  formulaSheet: [
    { formula: "C = 2πr = πd", label: "Lilitan" },
    { formula: "A = πr²", label: "Luas" },
    { formula: "Lengkok = (θ/360°)×2πr", label: "" },
    { formula: "Sektor = (θ/360°)×πr²", label: "" },
  ],
  quickRevision: [
    "Saya boleh namakan bahagian bulatan.",
    "Saya boleh guna sifat perentas, termasuk dengan Pythagoras.",
    "Saya boleh cari lilitan, luas, panjang lengkok dan luas sektor.",
  ],
  examTips: [
    "Diberi diameter tetapi perlukan jejari (atau sebaliknya)? Sentiasa tukar dahulu sebelum guna formula.",
    "Masalah lengkok dan sektor hanya pecahan bulatan penuh — sentiasa tulis pecahan θ/360° dahulu.",
  ],
  challenge: {
    question:
      "Meja bulat (jejari 70 cm) perlukan kain skirting sekeliling tepinya, tambah kain meja bulat di atas. Cari jumlah panjang skirting DAN luas kain meja diperlukan (π=22/7).",
    answer: "Skirting = lilitan = 2×22/7×70 = 440 cm. Kain meja = luas = 22/7×70² = 15,400 cm².",
  },
};

export const mathF2C5InteractiveContent: { en: MathF2C5Content; bm: MathF2C5Content } = { en, bm };

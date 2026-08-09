// Form 2 Mathematics, Chapter 7 — Coordinates / Koordinat. 7.3 is NOT a new
// topic — it's a "solving problems" subtopic combining distance and
// midpoint together. Interactive bilingual content. EN sourced from
// T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from T2_BT_MAT_-_MATEMATIK.pdf,
// cross-checked against design-reference/math2-chapter7-coordinates-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter7NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C7Visual =
  | {
      kind: "distanceGrid";
      horizontalLabel: string;
      verticalLabel: string;
      distanceLabel: string;
      caption?: string;
    }
  | {
      kind: "midpoint";
      pointALabel: string;
      pointBLabel: string;
      midpointLabel: string;
      caption?: string;
    };

export interface MathF2C7SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C7Visual;
  formula?: { eyebrow?: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C7Content {
  subtopics: MathF2C7SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Distance in a Cartesian Coordinate System",
      ideaParagraphs: [
        "Between any two points, draw a right-angled triangle — sideways then up. The straight-line distance between the points is the HYPOTENUSE of that triangle, so Pythagoras finds it directly.",
      ],
      visual: {
        kind: "distanceGrid",
        horizontalLabel: "horizontal",
        verticalLabel: "vertical",
        distanceLabel: "distance",
        caption:
          "Sideways then up forms a right-angled triangle — the direct distance is its hypotenuse",
      },
      formula: {
        eyebrow: "Distance Formula",
        formula: "d = √[(x₂−x₁)² + (y₂−y₁)²]",
        legend: [
          {
            label: "→",
            text: "This is just Pythagoras — (x₂−x₁) is the horizontal leg, (y₂−y₁) is the vertical leg",
          },
        ],
      },
      worked: {
        question: "Find the distance between A(1,7) and B(5,1).",
        steps: [
          {
            calc: "d = √[(5−1)² + (1−7)²]",
            why: "Subtract the x's and the y's separately — these become the two triangle legs.",
          },
          {
            calc: "d = √[4² + (−6)²] = √[16+36]",
            why: "Square each leg — squaring removes the negative automatically.",
          },
          { calc: "d = √52 ≈ 7.21 units", why: "Add and square-root — same Pythagoras as always." },
        ],
      },
      guided: {
        question: "Find the distance between P(−2,6) and Q(4,1).",
        answer: "d=√[(4−(−2))²+(1−6)²]=√[6²+(−5)²]=√61≈7.81 units.",
      },
      mistake: {
        wrong:
          "Mixing up which point is (x₁,y₁) and which is (x₂,y₂), or subtracting in the wrong order.",
        right:
          "It doesn't matter which point you call 1 or 2 — squaring removes any negative sign either way.",
      },
      practice: {
        easy: {
          question: "Find the distance between (1,1) and (4,1).",
          answer: "3 units — same y, so it's just the horizontal gap.",
        },
        medium: {
          question: "Find the distance between (8,2) and (0,−4).",
          answer: "√[8²+6²]=√100=10 units.",
        },
        hard: {
          question:
            "Calculate the perimeter of an isosceles triangle with vertices A(1,4), B(5,4), C(3,7).",
          answer: "AB=4, AC=√[2²+3²]=√13≈3.61, BC=√[2²+3²]=√13≈3.61. Perimeter≈11.22 units.",
        },
      },
      realLife: ["🗺️ GPS navigation", "✈️ Flight distance planning"],
    },
    {
      num: "7.2",
      title: "Midpoint in the Cartesian Coordinate System",
      ideaParagraphs: [
        "The midpoint sits exactly halfway between two points. Its x-coordinate is the AVERAGE of the two x's, and its y-coordinate is the average of the two y's.",
      ],
      visual: {
        kind: "midpoint",
        pointALabel: "A",
        pointBLabel: "B",
        midpointLabel: "M (midpoint)",
        caption:
          "M is exactly halfway along the line — average the x's for M's x, average the y's for M's y",
      },
      formula: { eyebrow: "Midpoint Formula", formula: "M = ( (x₁+x₂)/2 , (y₁+y₂)/2 )" },
      worked: {
        question: "Find the midpoint of A(2,5) and B(2,1).",
        steps: [
          { calc: "x: (2+2)/2 = 2", why: "Average the two x-coordinates." },
          { calc: "y: (5+1)/2 = 3", why: "Average the two y-coordinates." },
          { calc: "Midpoint = (2, 3)", why: "Combine both averages into the midpoint coordinate." },
        ],
      },
      guided: {
        question: "Find the midpoint of M(10,7) and N(4,1).",
        answer: "((10+4)/2, (7+1)/2) = (7, 4).",
      },
      mistake: {
        wrong: "Subtracting instead of adding the coordinates before dividing by 2.",
        right:
          "Midpoint is an AVERAGE — always add the two values, then divide by 2. Subtracting finds a distance, not a midpoint.",
      },
      practice: {
        easy: { question: "Find the midpoint of (4,5) and (2,1).", answer: "(3, 3)" },
        medium: { question: "Find the midpoint of (−1,5) and (3,1).", answer: "(1, 3)" },
        hard: {
          question: "The midpoint of K(4,5) and L is the origin (0,0). Find the coordinates of L.",
          answer: "(4+x)/2=0 → x=−4. (5+y)/2=0 → y=−5. L=(−4,−5).",
        },
      },
      realLife: ["🚁 Meeting-point planning", "🎯 Circle centre-finding"],
    },
    {
      num: "7.3",
      title: "The Cartesian Coordinate System",
      ideaParagraphs: [
        "Many problems need BOTH the distance formula and the midpoint formula together — read the problem carefully to see which one (or both) it's asking for.",
      ],
      worked: {
        question:
          "P(2,3) and Q(8,11) are two points. Find (a) the midpoint of PQ, (b) the distance PQ.",
        steps: [
          { calc: "(a) Midpoint = ((2+8)/2, (3+11)/2) = (5,7)", why: "Average the x's and y's." },
          {
            calc: "(b) Distance = √[(8−2)²+(11−3)²]",
            why: "Now switch to the distance formula for part (b).",
          },
          { calc: "= √[36+64] = √100 = 10 units", why: "Simplify." },
        ],
      },
      guided: {
        question:
          "A(1,2) and B(7,2) are opposite ends of a diameter. Find the centre and radius of the circle.",
        answer: "Centre = midpoint = (4,2). Diameter = distance AB = 6. Radius = 3.",
      },
      mistake: {
        wrong:
          "Using the midpoint formula when the question actually asks for distance, or vice versa.",
        right: '"Halfway" or "centre" → midpoint. "How far" or "length" → distance.',
      },
      practice: {
        easy: {
          question: "Find the midpoint AND distance for A(0,0), B(6,8).",
          answer: "Midpoint=(3,4). Distance=√(36+64)=10.",
        },
        medium: {
          question:
            "Two towns are at (2,5) and (14,5) on a map (units in km). A relay station is placed at the midpoint. How far is the station from each town?",
          answer: "Midpoint=(8,5). Distance from either town = 6 km.",
        },
        hard: {
          question:
            "Triangle PQR has P(0,0), Q(6,0), R(3,6). Find the length of the median from R to the midpoint of PQ.",
          answer: "Midpoint of PQ = (3,0). Distance from R(3,6) to (3,0) = 6 units.",
        },
      },
      realLife: ["📡 Signal tower placement"],
    },
  ],
  summary: {
    center: "Coordinates",
    branches: [
      { title: "Distance", points: ["Pythagoras on the grid"] },
      { title: "Midpoint", points: ["Average the x's, average the y's"] },
    ],
  },
  formulaSheet: [
    { formula: "d = √[(x₂−x₁)²+(y₂−y₁)²]", label: "Distance" },
    { formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)", label: "Midpoint" },
  ],
  quickRevision: [
    "I can find the distance between two points.",
    "I can find the midpoint between two points.",
  ],
  examTips: [
    'Sketch the two points quickly — it helps you spot whether the question wants "halfway" or "how far."',
  ],
  challenge: {
    question:
      "A(2,1), B(8,1), C(8,9) are three corners of a rectangle ABCD. Find D, and the length of the diagonal AC.",
    answer: "D=(2,9) (matches A's x, C's y). AC=√[6²+8²]=√100=10 units.",
  },
};

const bm: MathF2C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Jarak dalam Sistem Koordinat Cartes",
      ideaParagraphs: [
        "Antara sebarang dua titik, lukis segi tiga bersudut tegak — ke sisi kemudian ke atas. Jarak garis lurus antara titik ialah HIPOTENUS segi tiga itu, jadi Pythagoras mencarinya terus.",
      ],
      visual: {
        kind: "distanceGrid",
        horizontalLabel: "mendatar",
        verticalLabel: "menegak",
        distanceLabel: "jarak",
        caption:
          "Ke sisi kemudian ke atas bentuk segi tiga bersudut tegak — jarak terus ialah hipotenusnya",
      },
      formula: {
        eyebrow: "Formula Jarak",
        formula: "d = √[(x₂−x₁)² + (y₂−y₁)²]",
        legend: [
          { label: "→", text: "Ini cuma Pythagoras — (x₂−x₁) kaki mendatar, (y₂−y₁) kaki menegak" },
        ],
      },
      worked: {
        question: "Cari jarak antara A(1,7) dan B(5,1).",
        steps: [
          {
            calc: "d = √[(5−1)² + (1−7)²]",
            why: "Tolak x dan y berasingan — ini menjadi dua kaki segi tiga.",
          },
          {
            calc: "d = √[4² + (−6)²] = √[16+36]",
            why: "Kuasa duakan setiap kaki — kuasa dua buang negatif secara automatik.",
          },
          {
            calc: "d = √52 ≈ 7.21 unit",
            why: "Tambah dan cari punca kuasa dua — Pythagoras sama seperti biasa.",
          },
        ],
      },
      guided: {
        question: "Cari jarak antara P(−2,6) dan Q(4,1).",
        answer: "d=√[(4−(−2))²+(1−6)²]=√[6²+(−5)²]=√61≈7.81 unit.",
      },
      mistake: {
        wrong: "Mengelirukan titik mana (x₁,y₁) dan mana (x₂,y₂), atau menolak salah susunan.",
        right:
          "Tidak penting titik mana anda panggil 1 atau 2 — kuasa dua buang sebarang tanda negatif kedua-dua cara.",
      },
      practice: {
        easy: {
          question: "Cari jarak antara (1,1) dan (4,1).",
          answer: "3 unit — y sama, jadi hanya jurang mendatar.",
        },
        medium: {
          question: "Cari jarak antara (8,2) dan (0,−4).",
          answer: "√[8²+6²]=√100=10 unit.",
        },
        hard: {
          question: "Kira perimeter segi tiga sama kaki bucu A(1,4), B(5,4), C(3,7).",
          answer: "AB=4, AC=√[2²+3²]=√13≈3.61, BC=√[2²+3²]=√13≈3.61. Perimeter≈11.22 unit.",
        },
      },
      realLife: ["🗺️ Navigasi GPS", "✈️ Perancangan jarak penerbangan"],
    },
    {
      num: "7.2",
      title: "Titik Tengah dalam Sistem Koordinat Cartes",
      ideaParagraphs: [
        "Titik tengah terletak tepat separuh jalan antara dua titik. Koordinat-x ialah PURATA dua x, dan koordinat-y ialah purata dua y.",
      ],
      visual: {
        kind: "midpoint",
        pointALabel: "A",
        pointBLabel: "B",
        midpointLabel: "M (titik tengah)",
        caption:
          "M tepat separuh jalan sepanjang garis — purata x untuk x bagi M, purata y untuk y bagi M",
      },
      formula: { eyebrow: "Formula Titik Tengah", formula: "M = ( (x₁+x₂)/2 , (y₁+y₂)/2 )" },
      worked: {
        question: "Cari titik tengah A(2,5) dan B(2,1).",
        steps: [
          { calc: "x: (2+2)/2 = 2", why: "Purata dua koordinat-x." },
          { calc: "y: (5+1)/2 = 3", why: "Purata dua koordinat-y." },
          {
            calc: "Titik tengah = (2, 3)",
            why: "Gabungkan kedua-dua purata menjadi koordinat titik tengah.",
          },
        ],
      },
      guided: {
        question: "Cari titik tengah M(10,7) dan N(4,1).",
        answer: "((10+4)/2, (7+1)/2) = (7, 4).",
      },
      mistake: {
        wrong: "Menolak bukan menambah koordinat sebelum bahagi dengan 2.",
        right:
          "Titik tengah ialah PURATA — sentiasa tambah dua nilai, kemudian bahagi 2. Menolak cari jarak, bukan titik tengah.",
      },
      practice: {
        easy: { question: "Cari titik tengah (4,5) dan (2,1).", answer: "(3, 3)" },
        medium: { question: "Cari titik tengah (−1,5) dan (3,1).", answer: "(1, 3)" },
        hard: {
          question: "Titik tengah K(4,5) dan L ialah asalan (0,0). Cari koordinat L.",
          answer: "(4+x)/2=0 → x=−4. (5+y)/2=0 → y=−5. L=(−4,−5).",
        },
      },
      realLife: ["🚁 Perancangan titik pertemuan", "🎯 Mencari pusat bulatan"],
    },
    {
      num: "7.3",
      title: "Sistem Koordinat Cartes",
      ideaParagraphs: [
        "Banyak masalah perlukan KEDUA-DUA formula jarak dan titik tengah bersama — baca masalah dengan teliti untuk lihat mana satu (atau kedua-dua) yang ditanya.",
      ],
      worked: {
        question: "P(2,3) dan Q(8,11) dua titik. Cari (a) titik tengah PQ, (b) jarak PQ.",
        steps: [
          { calc: "(a) Titik tengah = ((2+8)/2, (3+11)/2) = (5,7)", why: "Purata x dan y." },
          {
            calc: "(b) Jarak = √[(8−2)²+(11−3)²]",
            why: "Kini tukar kepada formula jarak untuk bahagian (b).",
          },
          { calc: "= √[36+64] = √100 = 10 unit", why: "Permudahkan." },
        ],
      },
      guided: {
        question: "A(1,2) dan B(7,2) hujung bertentangan diameter. Cari pusat dan jejari bulatan.",
        answer: "Pusat = titik tengah = (4,2). Diameter = jarak AB = 6. Jejari = 3.",
      },
      mistake: {
        wrong: "Guna formula titik tengah bila soalan sebenarnya tanya jarak, atau sebaliknya.",
        right: '"Separuh jalan" atau "pusat" → titik tengah. "Berapa jauh" atau "panjang" → jarak.',
      },
      practice: {
        easy: {
          question: "Cari titik tengah DAN jarak untuk A(0,0), B(6,8).",
          answer: "Titik tengah=(3,4). Jarak=√(36+64)=10.",
        },
        medium: {
          question:
            "Dua bandar di (2,5) dan (14,5) pada peta (unit km). Stesen geganti diletak di titik tengah. Berapa jauh stesen dari setiap bandar?",
          answer: "Titik tengah=(8,5). Jarak dari mana-mana bandar = 6 km.",
        },
        hard: {
          question:
            "Segi tiga PQR ada P(0,0), Q(6,0), R(3,6). Cari panjang median dari R ke titik tengah PQ.",
          answer: "Titik tengah PQ = (3,0). Jarak dari R(3,6) ke (3,0) = 6 unit.",
        },
      },
      realLife: ["📡 Penempatan menara isyarat"],
    },
  ],
  summary: {
    center: "Koordinat",
    branches: [
      { title: "Jarak", points: ["Pythagoras pada grid"] },
      { title: "Titik Tengah", points: ["Purata x, purata y"] },
    ],
  },
  formulaSheet: [
    { formula: "d = √[(x₂−x₁)²+(y₂−y₁)²]", label: "Jarak" },
    { formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)", label: "Titik Tengah" },
  ],
  quickRevision: [
    "Saya boleh cari jarak antara dua titik.",
    "Saya boleh cari titik tengah antara dua titik.",
  ],
  examTips: [
    'Lakar dua titik dengan cepat — ia bantu anda kesan sama ada soalan mahu "separuh jalan" atau "berapa jauh."',
  ],
  challenge: {
    question:
      "A(2,1), B(8,1), C(8,9) tiga penjuru segi empat tepat ABCD. Cari D, dan panjang pepenjuru AC.",
    answer: "D=(2,9) (sepadan x A, y C). AC=√[6²+8²]=√100=10 unit.",
  },
};

export const mathF2C7InteractiveContent: { en: MathF2C7Content; bm: MathF2C7Content } = { en, bm };

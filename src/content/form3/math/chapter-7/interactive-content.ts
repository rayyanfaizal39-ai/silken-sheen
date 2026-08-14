// Form 3 Mathematics, Chapter 7 — Plans and Elevations / Pelan dan Dongakan.
// 2 official subtopics (7.1 Orthogonal Projections, 7.2 Plans and
// Elevations), built as written — one flowing section per subtopic.
// Interactive bilingual content, cross-checked against
// design-reference/math3-chapter7-plans-elevations-notes-v1.html.
//
// Content accuracy notes:
// - The 7.2 worked example (5cm × 3cm × 2cm cuboid) was independently
//   verified: plan (top view) shows length × width = 5cm × 3cm; front
//   elevation shows length × height = 5cm × 2cm.
// - Formula-sheet entries only had an <span class="en"> in the source
//   mockup (no bm variant was ever written for those three lines); proper
//   Malay translations are supplied here rather than leaving BM mode
//   showing English text.
//
// Content only — no presentation markup (rendered by MathF3Chapter7NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C7Visual =
  | {
      kind: "normalProjection";
      objectLabel: string;
      planeLabel: string;
      projectionLabel: string;
      caption: string;
    }
  | {
      kind: "threeViewLayout";
      planLabel: string;
      frontLabel: string;
      sideLabel: string;
      caption: string;
    };

export interface MathF3C7Block {
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C7SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C7Visual;
  blocks: MathF3C7Block[];
  guided?: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C7Content {
  subtopics: MathF3C7SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Orthogonal Projections",
      ideaParagraphs: [
        "Drop a straight line STRAIGHT DOWN from every point of an object onto a flat surface — each line must hit the surface at a perfect right angle (a normal). The outline that lands on the surface is the object's orthogonal projection.",
      ],
      visual: {
        kind: "normalProjection",
        objectLabel: "object",
        planeLabel: "horizontal plane",
        projectionLabel: "projection",
        caption:
          "Every normal line (amber, dashed) drops straight down at 90° — the green outline is the orthogonal projection",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Normal to a Plane",
            formula: "A normal is perpendicular (90°) to every line on that plane",
          },
          worked: {
            question:
              "A cuboid is projected onto a horizontal plane below it, with normals PA, QB, RC, SD. What is the orthogonal projection?",
            steps: [
              {
                calc: "Orthogonal projection = rectangle ABCD",
                why: "Each corner of the cuboid drops straight down via its own normal (PA, QB, RC, SD) — the four landing points trace out the base outline.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "A line is projected onto a plane using a line that meets the plane at 60° instead of 90°. Is this a valid orthogonal projection?",
        answer:
          "No — an orthogonal projection requires the projecting line to be a NORMAL, meeting the plane at exactly 90°.",
      },
      mistake: {
        wrong:
          "Assuming any straight line dropped from the object to the plane counts as a valid projection.",
        right:
          "It only counts if that line is a NORMAL — perpendicular to the plane. A slanted line gives a distorted, non-orthogonal shadow.",
      },
      practice: {
        easy: {
          question: "What angle must a normal make with its plane?",
          answer: "90°",
        },
        medium: {
          question:
            "A cube PQRSTUVW has plane PQRS as its base. Name the type of plane PQRS represents.",
          answer: "A horizontal plane.",
        },
        hard: {
          question:
            'A right prism stands on a horizontal base. Explain why the vertical side faces of the prism are described as "vertical planes" rather than "inclined planes".',
          answer:
            "A vertical plane stands exactly perpendicular (90°) to the horizontal base — an inclined plane would meet the base at some OTHER angle, neither 0° nor 90°.",
        },
      },
      realLife: ["📷 Drone and satellite photography", "🏗️ CAD/engineering drawings"],
    },
    {
      num: "7.2",
      title: "Plans and Elevations",
      ideaParagraphs: [
        "Any 3D object can be fully described with just THREE flat drawings: the plan (view from directly above), the front elevation (view from the front), and the side elevation (view from the side). Solid lines show edges you can see; dashed lines show edges hidden behind the object.",
      ],
      visual: {
        kind: "threeViewLayout",
        planLabel: "Plan",
        frontLabel: "Front elevation",
        sideLabel: "Side elevation",
        caption:
          "Three flat drawings — top, front, and side — together describe the whole 3D shape",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Drawing to Scale",
            formula: "Every plan and elevation is drawn to FULL SCALE — the actual size",
          },
          worked: {
            question:
              "A cuboid box is 5cm long, 3cm wide, 2cm tall. Sketch (a) the plan (top view), (b) the front elevation, stating their dimensions.",
            steps: [
              {
                calc: "(a) Plan = 5cm × 3cm rectangle",
                why: "Looking straight down, you see the box's length and width — the height doesn't appear in a top view.",
              },
              {
                calc: "(b) Front elevation = 5cm × 2cm rectangle",
                why: "Looking from the front, you see the box's length and height — the width (depth) disappears from this view.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "When drawing a side elevation, an edge exists but is completely hidden behind the front of the object. How should that edge be drawn?",
        answer: "As a dashed line — hidden edges are always drawn dashed, never solid.",
      },
      mistake: {
        wrong: 'Drawing the plan and elevations at different sizes based on "how it looks".',
        right:
          "Every view must use the SAME full scale — matching measurements should line up exactly between the plan and each elevation.",
      },
      practice: {
        easy: {
          question: 'Which view of an object is called the "plan"?',
          answer: "The view from directly above (top view).",
        },
        medium: {
          question: "A cylinder stands upright. Describe the shape of its plan.",
          answer: "A circle — the top view of an upright cylinder is just its circular base.",
        },
        hard: {
          question:
            "A triangular prism lies on one of its rectangular faces. Its front elevation shows a triangle. Describe what its plan (top view) would show.",
          answer:
            "A rectangle — looking down on a prism lying on its side, you see the flat rectangular top face, with a dashed line marking the hidden ridge line underneath.",
        },
      },
      realLife: ["🏠 House floor plans", "🔧 Manufacturing blueprints"],
    },
  ],
  summary: {
    center: "Plans and Elevations",
    branches: [
      { title: "Normal", points: ["Perpendicular to a plane"] },
      { title: "Plan", points: ["View from above"] },
      { title: "Elevations", points: ["Views from front/side"] },
    ],
  },
  formulaSheet: [
    { formula: "Normal = perpendicular to plane", label: "" },
    { formula: "Solid line = visible edge", label: "" },
    { formula: "Dashed line = hidden edge", label: "" },
  ],
  quickRevision: [
    "I can identify normals and orthogonal projections.",
    "I can draw the plan and elevations of a 3D object to scale.",
  ],
  examTips: [
    "Always check whether an edge is visible or hidden from that particular viewing direction before deciding solid or dashed.",
  ],
  challenge: {
    question:
      "An L-shaped block is made of two cuboids joined together. Explain how many DIFFERENT elevations you would need to draw if you viewed it from all 4 sides (front, back, left, right), and why some might look identical.",
    answer:
      "An L-shape typically needs 2 distinct elevations (front/back may differ from left/right) since front and back show mirror-image outlines that might look the same if the shape is symmetric along that axis — always check the actual geometry rather than assuming.",
  },
};

const bm: MathF3C7Content = {
  subtopics: [
    {
      num: "7.1",
      title: "Unjuran Ortogon",
      ideaParagraphs: [
        "Jatuhkan garis lurus TERUS KE BAWAH dari setiap titik objek ke permukaan rata — setiap garis mesti kena permukaan pada sudut tegak sempurna (normal). Garis besar yang mendarat pada permukaan ialah unjuran ortogon objek.",
      ],
      visual: {
        kind: "normalProjection",
        objectLabel: "objek",
        planeLabel: "satah mendatar",
        projectionLabel: "unjuran",
        caption:
          "Setiap garis normal (ambar, putus-putus) jatuh terus 90° — garis besar hijau ialah unjuran ortogon",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Normal kepada Satah",
            formula: "Normal serenjang (90°) dengan setiap garis pada satah itu",
          },
          worked: {
            question:
              "Kuboid diunjur ke satah mendatar di bawahnya, dengan normal PA, QB, RC, SD. Apakah unjuran ortogon?",
            steps: [
              {
                calc: "Unjuran ortogon = segi empat tepat ABCD",
                why: "Setiap penjuru kuboid jatuh terus melalui normal sendiri (PA, QB, RC, SD) — empat titik mendarat jejaki garis besar tapak.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Garis diunjur ke satah guna garis bertemu satah pada 60° bukan 90°. Adakah ini unjuran ortogon sah?",
        answer:
          "Tidak — unjuran ortogon perlukan garis unjuran menjadi NORMAL, bertemu satah pada tepat 90°.",
      },
      mistake: {
        wrong: "Menganggap sebarang garis lurus dijatuhkan dari objek ke satah dikira unjuran sah.",
        right:
          "Ia hanya dikira jika garis itu NORMAL — serenjang dengan satah. Garis condong beri bayang herot, bukan ortogon.",
      },
      practice: {
        easy: {
          question: "Apakah sudut normal mesti buat dengan satahnya?",
          answer: "90°",
        },
        medium: {
          question:
            "Kubus PQRSTUVW ada satah PQRS sebagai tapak. Namakan jenis satah PQRS mewakili.",
          answer: "Satah mendatar.",
        },
        hard: {
          question:
            'Prisma tegak berdiri atas tapak mendatar. Jelaskan kenapa muka sisi menegak prisma diterangkan "satah menegak" bukan "satah condong".',
          answer:
            "Satah menegak berdiri tepat serenjang (90°) dengan tapak mendatar — satah condong akan bertemu tapak pada sudut LAIN, bukan 0° atau 90°.",
        },
      },
      realLife: ["📷 Fotografi dron dan satelit", "🏗️ Lukisan CAD/kejuruteraan"],
    },
    {
      num: "7.2",
      title: "Pelan dan Dongakan",
      ideaParagraphs: [
        "Sebarang objek 3D boleh diterangkan sepenuhnya dengan hanya TIGA lukisan rata: pelan (pandangan dari terus atas), dongakan depan (pandangan dari depan), dan dongakan sisi (pandangan dari sisi). Garis pejal tunjuk tepi boleh dilihat; garis putus-putus tunjuk tepi tersembunyi di belakang objek.",
      ],
      visual: {
        kind: "threeViewLayout",
        planLabel: "Pelan",
        frontLabel: "Dongakan depan",
        sideLabel: "Dongakan sisi",
        caption:
          "Tiga lukisan rata — atas, depan, dan sisi — bersama terangkan keseluruhan bentuk 3D",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Melukis Berskala",
            formula: "Setiap pelan dan dongakan dilukis SKALA PENUH — saiz sebenar",
          },
          worked: {
            question:
              "Kotak kuboid 5cm panjang, 3cm lebar, 2cm tinggi. Lakar (a) pelan (pandangan atas), (b) dongakan depan, nyatakan dimensinya.",
            steps: [
              {
                calc: "(a) Pelan = segi empat tepat 5cm × 3cm",
                why: "Melihat terus ke bawah, anda lihat panjang dan lebar kotak — tinggi tidak muncul dalam pandangan atas.",
              },
              {
                calc: "(b) Dongakan depan = segi empat tepat 5cm × 2cm",
                why: "Melihat dari depan, anda lihat panjang dan tinggi kotak — lebar (kedalaman) hilang daripada pandangan ini.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Bila melukis dongakan sisi, tepi wujud tetapi tersembunyi sepenuhnya di belakang depan objek. Bagaimana tepi itu patut dilukis?",
        answer:
          "Sebagai garis putus-putus — tepi tersembunyi sentiasa dilukis putus-putus, tidak pernah pejal.",
      },
      mistake: {
        wrong: 'Melukis pelan dan dongakan pada saiz berbeza berdasarkan "cara ia nampak".',
        right:
          "Setiap pandangan mesti guna skala penuh SAMA — ukuran sepadan patut sejajar tepat antara pelan dan setiap dongakan.",
      },
      practice: {
        easy: {
          question: 'Pandangan objek mana dipanggil "pelan"?',
          answer: "Pandangan dari terus atas (pandangan atas).",
        },
        medium: {
          question: "Silinder berdiri tegak. Terangkan bentuk pelannya.",
          answer: "Bulatan — pandangan atas silinder tegak hanyalah tapak bulatnya.",
        },
        hard: {
          question:
            "Prisma segi tiga terbaring atas satu muka segi empat tepatnya. Dongakan depan tunjuk segi tiga. Terangkan apa pelannya (pandangan atas) tunjuk.",
          answer:
            "Segi empat tepat — melihat ke bawah pada prisma terbaring sisi, anda lihat muka atas segi empat tepat rata, dengan garis putus-putus tanda garis rabung tersembunyi di bawah.",
        },
      },
      realLife: ["🏠 Pelan lantai rumah", "🔧 Cetak biru pembuatan"],
    },
  ],
  summary: {
    center: "Pelan dan Dongakan",
    branches: [
      { title: "Normal", points: ["Serenjang dengan satah"] },
      { title: "Pelan", points: ["Pandangan dari atas"] },
      { title: "Dongakan", points: ["Pandangan dari depan/sisi"] },
    ],
  },
  formulaSheet: [
    { formula: "Normal = serenjang dengan satah", label: "" },
    { formula: "Garis pejal = tepi kelihatan", label: "" },
    { formula: "Garis putus-putus = tepi tersembunyi", label: "" },
  ],
  quickRevision: [
    "Saya boleh kenal pasti normal dan unjuran ortogon.",
    "Saya boleh lukis pelan dan dongakan objek 3D berskala.",
  ],
  examTips: [
    "Sentiasa semak sama ada tepi boleh dilihat atau tersembunyi dari arah pandangan tertentu sebelum putuskan pejal atau putus-putus.",
  ],
  challenge: {
    question:
      "Blok berbentuk L dibuat daripada dua kuboid disambung. Jelaskan berapa dongakan BERBEZA anda perlu lukis jika anda pandang dari kesemua 4 sisi (depan, belakang, kiri, kanan), dan kenapa sesetengah mungkin nampak serupa.",
    answer:
      "Bentuk L biasanya perlukan 2 dongakan berbeza (depan/belakang mungkin berbeza daripada kiri/kanan) kerana depan dan belakang tunjuk garis besar bayangan cermin — sentiasa semak geometri sebenar bukan anggap sahaja.",
  },
};

export const mathF3C7InteractiveContent: { en: MathF3C7Content; bm: MathF3C7Content } = { en, bm };

// Form 3 Mathematics, Chapter 8 — Loci in Two Dimensions / Lokus dalam Dua
// Matra. 2 official subtopics (8.1 "Locus" — singular, introducing the
// concept — and 8.2 "Loci in Two Dimensions" — plural). 8.2 is built as 2
// flowing sections: "Common Loci Types" and "Intersection of Loci and
// Solving Problems", both carrying the textbook's own "8.2" badge (matching
// the source mockup, which numbers both sec-8-2a and sec-8-2b as "8.2") —
// `num` stays a unique per-section key ("8.2a"/"8.2b") for scroll-tracking
// while `badge` renders the shared "8.2" the textbook uses. Interactive
// bilingual content, cross-checked against
// design-reference/math3-chapter8-loci-two-dimensions-notes-v1.html.
//
// Content accuracy note: 8.2b (Intersection of Loci) has no formula-card in
// the source mockup — only a lesson-intro and worked example — so `formula`
// is optional per block and omitted there, rather than inventing a formula
// summary the mockup never shipped.
//
// Content only — no presentation markup (rendered by MathF3Chapter8NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C8Visual =
  | { kind: "locusTrace"; pointLabel: string; resultLabel: string }
  | { kind: "threeLociTypes"; label1: string; label2: string; label3: string; caption: string }
  | { kind: "lociIntersection"; caption: string };

export interface MathF3C8Block {
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C8SubtopicContent {
  /** Unique key used for the scroll-tracking DOM id (e.g. "8.2a", "8.2b"). */
  num: string;
  /** Displayed section badge, matching the textbook's own numbering (e.g. both flowing 8.2 sections show "8.2"). */
  badge: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C8Visual;
  blocks: MathF3C8Block[];
  guided?: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C8Content {
  subtopics: MathF3C8SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C8Content = {
  subtopics: [
    {
      num: "8.1",
      badge: "8.1",
      title: "Locus",
      ideaParagraphs: [
        "A locus is the path traced out by a point that moves according to ONE consistent rule. A spot on a spinning fan blade always stays the same distance from the centre — so it traces a circle. A rocket flying straight up traces a straight line.",
      ],
      visual: { kind: "locusTrace", pointLabel: "point C", resultLabel: "locus = circle" },
      blocks: [
        {
          formula: {
            eyebrow: "Common Locus Shapes",
            formula: "Straight lines, circles, and curves",
          },
          worked: {
            question:
              "Point C is marked on a swinging pendulum. Describe and sketch the locus of C.",
            steps: [
              {
                calc: "Locus of C = a circular arc",
                why: "The pendulum swings around a fixed pivot at a constant length, so C always stays the same distance from that pivot — tracing part of a circle.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Describe the locus of a point on the shoe of a child sliding straight down a playground slide.",
        answer: "A straight line — the child moves along the fixed straight slope of the slide.",
      },
      mistake: {
        wrong: "Describing the OBJECT's motion instead of the SHAPE the locus traces.",
        right:
          "A locus answer names the GEOMETRIC SHAPE (circle, line, curve) — not a description of the activity itself.",
      },
      practice: {
        easy: {
          question: "Describe the locus of a point on a spinning yo-yo's string end.",
          answer: "A circle.",
        },
        medium: {
          question:
            "A rectangular board PQRS is attached to a pole MN. If side PQ is rotated 360° around MN, what 3D shape is formed?",
          answer: "A right cylinder.",
        },
        hard: {
          question:
            "A semicircular board PQR is attached to pole MN along its straight edge. If rotated 360° around MN, what 3D shape forms, and why is it different from rotating a rectangle?",
          answer:
            "A sphere — every point on the curved edge is already the same distance from the centre, so sweeping it around traces a full round surface, unlike a rectangle's straight edge which sweeps into a flat-ended cylinder.",
        },
      },
      realLife: ["🚴 Bicycle wheel reflectors", "🌦️ Windshield wiper arcs"],
    },
    {
      num: "8.2a",
      badge: "8.2",
      title: "Common Loci Types",
      ideaParagraphs: [
        'Three "equidistant" rules produce three different shapes. Same distance from ONE point → a circle. Same distance from TWO points → the perpendicular bisector between them. Same distance from TWO lines → the angle bisector between them.',
      ],
      visual: {
        kind: "threeLociTypes",
        label1: "1 point",
        label2: "2 points",
        label3: "2 lines",
        caption:
          "Circle (1 fixed point), perpendicular bisector (2 points), angle bisector (2 lines)",
      },
      blocks: [
        {
          formula: {
            eyebrow: "The Three Rules",
            formula:
              "1 point → circle | 2 points → perpendicular bisector | 2 lines → angle bisector",
          },
          worked: {
            question:
              "Construct the locus of point P which is always 3cm from a fixed point O. Then construct the locus of points equidistant from two fixed points P and Q, 8cm apart.",
            steps: [
              {
                calc: "Locus of P: circle of radius 3cm centred at O",
                why: "Set the compass to 3cm and draw a full circle around O — every point on it is exactly 3cm away.",
              },
              {
                calc: "Locus for P,Q: perpendicular bisector through the midpoint of PQ",
                why: "Construct arcs from both P and Q with the same radius (more than half of 8cm) — where the arcs cross marks the bisector line.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Two straight lines cross each other. Describe the locus of points equidistant from both lines.",
        answer:
          "The angle bisector — actually two perpendicular bisector lines, one for each pair of vertical angles formed.",
      },
      mistake: {
        wrong:
          'Confusing "equidistant from a point" with "equidistant from two points" — drawing a circle when a bisector line is needed, or vice versa.',
        right:
          "Count how many fixed points or lines the condition mentions FIRST — that count alone tells you which of the three shapes to draw.",
      },
      practice: {
        easy: {
          question: "What shape is the locus of points 4cm from a fixed point?",
          answer: "A circle of radius 4cm.",
        },
        medium: {
          question:
            "Points A and B are 10cm apart. Describe the locus of points equidistant from A and B, and state where it crosses line AB.",
          answer: "The perpendicular bisector of AB, crossing AB at its midpoint (5cm from each).",
        },
        hard: {
          question:
            "A goat is tied by a 4m rope to a corner post of a rectangular field. Describe the region the goat can graze (ignoring the field's fence for now).",
          answer:
            "A circle of radius 4m centred at the post — the locus of every point exactly 4m (or less) from the fixed point.",
        },
      },
      realLife: ["📡 Radio tower coverage zones", "🏙️ Fair boundary planning"],
    },
    {
      num: "8.2b",
      badge: "8.2",
      title: "Intersection of Loci and Solving Problems",
      ideaParagraphs: [
        "Real problems often give you TWO conditions at once. Draw each locus separately, then the points where they CROSS are the only locations satisfying BOTH conditions together.",
      ],
      visual: {
        kind: "lociIntersection",
        caption:
          "Where the two loci cross (amber marks) are the only points satisfying both conditions",
      },
      blocks: [
        {
          worked: {
            question:
              "A clinic must be (a) equidistant from house P and house Q, and (b) 600m from highway AB. Describe how to find its possible location(s).",
            steps: [
              {
                calc: "Locus (a): perpendicular bisector of PQ",
                why: "Equidistant from two fixed points always gives the perpendicular bisector between them.",
              },
              {
                calc: "Locus (b): two lines parallel to AB, 600m away on each side",
                why: "A constant distance from a straight line gives a parallel line on each side of it (using the given scale, 600m = 1cm on the drawing).",
              },
              {
                calc: "The clinic can be at either point where locus (a) crosses locus (b)",
                why: "Draw both loci on the same diagram — only the crossing points satisfy BOTH conditions at once.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Point F always moves 3 units from the x-axis. Point G always moves 4 units from the origin. Both loci are drawn on the same grid. How many points, at most, could satisfy BOTH conditions?",
        answer:
          "Up to 2 points — a line (y=3 or y=−3) can cross a circle (radius 4) at a maximum of 2 points.",
      },
      mistake: {
        wrong: "Only drawing ONE of the two loci and stopping there.",
        right:
          "Always construct BOTH loci fully on the same diagram — the answer only appears where they actually cross.",
      },
      practice: {
        easy: {
          question:
            "Two loci are drawn: a circle and a straight line that passes through the circle. At most, how many intersection points are there?",
          answer: "2",
        },
        medium: {
          question:
            "Boat V always stays 5 units from point D. Boat W always stays 3 units from line BC. Describe the two loci and what marking their intersection tells you.",
          answer:
            "V's locus is a circle (radius 5, centre D). W's locus is a pair of lines parallel to BC (3 units on each side). The intersection points are where the two boats' paths could meet.",
        },
        hard: {
          question:
            "Faruk is equidistant from the x-axis and y-axis, and is also less than 5 units from the origin. Describe fully where Faruk could be standing.",
          answer:
            "Equidistant from both axes means Faruk is on the line y=x or y=−x (the angle bisectors). Combined with being within 5 units of the origin, Faruk is somewhere on that diagonal line, inside the circle of radius 5.",
        },
      },
      realLife: ["🏥 Public facility site planning", "📡 GPS trilateration"],
    },
  ],
  summary: {
    center: "Loci in Two Dimensions",
    branches: [
      { title: "One Point", points: ["Circle"] },
      { title: "Two Points", points: ["Perpendicular bisector"] },
      { title: "Intersection", points: ["Draw both, mark the crossing"] },
    ],
  },
  formulaSheet: [
    { formula: "Equidistant from 1 point → circle", label: "" },
    { formula: "Equidistant from 2 points → perp. bisector", label: "" },
    { formula: "Equidistant from 2 lines → angle bisector", label: "" },
  ],
  quickRevision: [
    "I can recognise and describe loci in real-life situations.",
    "I can construct the three common locus types.",
    "I can find the intersection of two loci and solve real-world problems.",
  ],
  examTips: [
    "Count the number of fixed points/lines FIRST — that alone tells you which of the three basic locus shapes to draw.",
  ],
  challenge: {
    question:
      "A grazing goat is tied to a post at the CORNER of a rectangular field, with a 6m rope. The field itself is only 4m wide at that corner (in one direction) before hitting a fence. Explain how the fence changes the shape of the goat's grazing area compared to an open field.",
    answer:
      "In an open field, the locus would be a full circle of radius 6m. But the fence blocks part of that circle — the goat's actual grazing area is only the part of the circle that fits inside the field, cut off wherever the rope would otherwise cross the fence.",
  },
};

const bm: MathF3C8Content = {
  subtopics: [
    {
      num: "8.1",
      badge: "8.1",
      title: "Lokus",
      ideaParagraphs: [
        "Lokus ialah laluan dijejaki titik bergerak mengikut SATU peraturan konsisten. Bintik pada bilah kipas berputar sentiasa kekal jarak sama dari pusat — jadi ia jejaki bulatan. Roket terbang lurus ke atas jejaki garis lurus.",
      ],
      visual: { kind: "locusTrace", pointLabel: "titik C", resultLabel: "lokus = bulatan" },
      blocks: [
        {
          formula: {
            eyebrow: "Bentuk Lokus Lazim",
            formula: "Garis lurus, bulatan, dan lengkung",
          },
          worked: {
            question: "Titik C ditanda pada bandul berayun. Terangkan dan lakar lokus C.",
            steps: [
              {
                calc: "Lokus C = lengkok bulatan",
                why: "Bandul berayun sekeliling pangsi tetap pada panjang tetap, jadi C sentiasa kekal jarak sama dari pangsi itu — jejaki sebahagian bulatan.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Terangkan lokus titik pada kasut kanak-kanak meluncur terus ke bawah gelongsor taman permainan.",
        answer: "Garis lurus — kanak-kanak bergerak sepanjang cerun lurus tetap gelongsor.",
      },
      mistake: {
        wrong: "Menerangkan pergerakan OBJEK bukan BENTUK lokus jejaki.",
        right:
          "Jawapan lokus namakan BENTUK GEOMETRI (bulatan, garis, lengkung) — bukan penerangan aktiviti itu sendiri.",
      },
      practice: {
        easy: {
          question: "Terangkan lokus titik pada hujung tali yo-yo berputar.",
          answer: "Bulatan.",
        },
        medium: {
          question:
            "Papan segi empat tepat PQRS dipasang pada tiang MN. Jika sisi PQ diputar 360° sekeliling MN, bentuk 3D apa dibentuk?",
          answer: "Silinder tegak.",
        },
        hard: {
          question:
            "Papan separuh bulatan PQR dipasang pada tiang MN sepanjang tepi lurusnya. Jika diputar 360° sekeliling MN, bentuk 3D apa terbentuk, dan kenapa berbeza daripada memutar segi empat tepat?",
          answer:
            "Sfera — setiap titik tepi melengkung sudah jarak sama dari pusat, jadi mengelilingkannya jejaki permukaan bulat penuh, berbeza daripada tepi lurus segi empat tepat yang mengelilingkan menjadi silinder hujung rata.",
        },
      },
      realLife: ["🚴 Reflektor roda basikal", "🌦️ Lengkok pengelap cermin"],
    },
    {
      num: "8.2a",
      badge: "8.2",
      title: "Jenis Lokus Lazim",
      ideaParagraphs: [
        'Tiga peraturan "jarak sama" hasilkan tiga bentuk berbeza. Jarak sama dari SATU titik → bulatan. Jarak sama dari DUA titik → pembahagi dua serenjang antara mereka. Jarak sama dari DUA garis → pembahagi dua sudut antara mereka.',
      ],
      visual: {
        kind: "threeLociTypes",
        label1: "1 titik",
        label2: "2 titik",
        label3: "2 garis",
        caption:
          "Bulatan (1 titik tetap), pembahagi dua serenjang (2 titik), pembahagi dua sudut (2 garis)",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Tiga Peraturan",
            formula:
              "1 titik → bulatan | 2 titik → pembahagi dua serenjang | 2 garis → pembahagi dua sudut",
          },
          worked: {
            question:
              "Bina lokus titik P sentiasa 3cm dari titik tetap O. Kemudian bina lokus titik sama jarak dari dua titik tetap P dan Q, 8cm berjauhan.",
            steps: [
              {
                calc: "Lokus P: bulatan berjejari 3cm berpusat O",
                why: "Tetapkan kompas kepada 3cm dan lukis bulatan penuh sekeliling O — setiap titik padanya tepat 3cm jauh.",
              },
              {
                calc: "Lokus P,Q: pembahagi dua serenjang melalui titik tengah PQ",
                why: "Bina lengkok dari P dan Q dengan jejari sama (lebih separuh 8cm) — di mana lengkok bersilang tanda garis pembahagi dua.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Dua garis lurus bersilang. Terangkan lokus titik sama jarak dari kedua-dua garis.",
        answer:
          "Pembahagi dua sudut — sebenarnya dua garis pembahagi dua serenjang, satu setiap pasangan sudut menegak dibentuk.",
      },
      mistake: {
        wrong:
          'Mengelirukan "sama jarak dari satu titik" dengan "sama jarak dari dua titik" — lukis bulatan bila garis pembahagi dua diperlukan, atau sebaliknya.',
        right:
          "Kira berapa titik atau garis tetap syarat sebut DAHULU — kiraan itu sahaja beritahu anda bentuk mana antara tiga untuk dilukis.",
      },
      practice: {
        easy: {
          question: "Apakah bentuk lokus titik 4cm dari titik tetap?",
          answer: "Bulatan berjejari 4cm.",
        },
        medium: {
          question:
            "Titik A dan B 10cm berjauhan. Terangkan lokus titik sama jarak dari A dan B, dan nyatakan di mana ia melintasi garis AB.",
          answer:
            "Pembahagi dua serenjang AB, melintasi AB pada titik tengahnya (5cm dari setiap satu).",
        },
        hard: {
          question:
            "Kambing diikat tali 4m pada tiang penjuru padang segi empat tepat. Terangkan kawasan kambing boleh meragut (abaikan pagar padang buat masa ini).",
          answer:
            "Bulatan berjejari 4m berpusat pada tiang — lokus setiap titik tepat 4m (atau kurang) dari titik tetap.",
        },
      },
      realLife: ["📡 Zon liputan menara radio", "🏙️ Perancangan sempadan adil"],
    },
    {
      num: "8.2b",
      badge: "8.2",
      title: "Persilangan Lokus dan Menyelesaikan Masalah",
      ideaParagraphs: [
        "Masalah sebenar selalunya beri anda DUA syarat serentak. Lukis setiap lokus berasingan, kemudian titik di mana mereka BERSILANG ialah satu-satunya lokasi memenuhi KEDUA-DUA syarat bersama.",
      ],
      visual: {
        kind: "lociIntersection",
        caption:
          "Di mana kedua-dua lokus bersilang (tanda ambar) ialah satu-satunya titik memenuhi kedua-dua syarat",
      },
      blocks: [
        {
          worked: {
            question:
              "Klinik mesti (a) sama jarak dari rumah P dan rumah Q, dan (b) 600m dari lebuh raya AB. Terangkan cara cari lokasi mungkinnya.",
            steps: [
              {
                calc: "Lokus (a): pembahagi dua serenjang PQ",
                why: "Sama jarak dari dua titik tetap sentiasa beri pembahagi dua serenjang antara mereka.",
              },
              {
                calc: "Lokus (b): dua garis selari AB, 600m jauh setiap sebelah",
                why: "Jarak tetap dari garis lurus beri garis selari setiap sebelahnya (guna skala diberi, 600m = 1cm pada lukisan).",
              },
              {
                calc: "Klinik boleh berada di mana-mana titik di mana lokus (a) melintasi lokus (b)",
                why: "Lukis kedua-dua lokus pada rajah sama — hanya titik persilangan memenuhi KEDUA-DUA syarat serentak.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Titik F sentiasa bergerak 3 unit dari paksi-x. Titik G sentiasa bergerak 4 unit dari asalan. Kedua-dua lokus dilukis pada grid sama. Berapa titik, paling banyak, boleh memenuhi KEDUA-DUA syarat?",
        answer:
          "Sehingga 2 titik — garis (y=3 atau y=−3) boleh melintasi bulatan (jejari 4) pada maksimum 2 titik.",
      },
      mistake: {
        wrong: "Hanya lukis SATU daripada dua lokus dan berhenti di situ.",
        right:
          "Sentiasa bina KEDUA-DUA lokus sepenuhnya pada rajah sama — jawapan hanya muncul di mana mereka bersilang.",
      },
      practice: {
        easy: {
          question:
            "Dua lokus dilukis: bulatan dan garis lurus melalui bulatan. Paling banyak, berapa titik persilangan?",
          answer: "2",
        },
        medium: {
          question:
            "Bot V sentiasa kekal 5 unit dari titik D. Bot W sentiasa kekal 3 unit dari garis BC. Terangkan kedua-dua lokus dan apa menanda persilangannya beritahu anda.",
          answer:
            "Lokus V ialah bulatan (jejari 5, pusat D). Lokus W ialah sepasang garis selari BC (3 unit setiap sebelah). Titik persilangan ialah di mana laluan kedua-dua bot boleh bertemu.",
        },
        hard: {
          question:
            "Faruk sama jarak dari paksi-x dan paksi-y, dan juga kurang 5 unit dari asalan. Terangkan sepenuhnya di mana Faruk boleh berdiri.",
          answer:
            "Sama jarak dari kedua-dua paksi bermakna Faruk pada garis y=x atau y=−x (pembahagi dua sudut). Digabung dengan dalam 5 unit dari asalan, Faruk di suatu tempat pada garis pepenjuru itu, dalam bulatan jejari 5.",
        },
      },
      realLife: ["🏥 Perancangan tapak kemudahan awam", "📡 Trilaterasi GPS"],
    },
  ],
  summary: {
    center: "Lokus dalam Dua Matra",
    branches: [
      { title: "Satu Titik", points: ["Bulatan"] },
      { title: "Dua Titik", points: ["Pembahagi dua serenjang"] },
      { title: "Persilangan", points: ["Lukis kedua-dua, tanda persilangan"] },
    ],
  },
  formulaSheet: [
    { formula: "Sama jarak dari 1 titik → bulatan", label: "" },
    { formula: "Sama jarak dari 2 titik → pembahagi dua serenjang", label: "" },
    { formula: "Sama jarak dari 2 garis → pembahagi dua sudut", label: "" },
  ],
  quickRevision: [
    "Saya boleh mengecam dan menerangkan lokus dalam situasi kehidupan sebenar.",
    "Saya boleh bina tiga jenis lokus lazim.",
    "Saya boleh cari persilangan dua lokus dan selesaikan masalah dunia sebenar.",
  ],
  examTips: [
    "Kira bilangan titik/garis tetap DAHULU — itu sahaja beritahu anda bentuk lokus asas mana untuk dilukis.",
  ],
  challenge: {
    question:
      "Kambing meragut diikat pada tiang di PENJURU padang segi empat tepat, dengan tali 6m. Padang itu sendiri hanya 4m lebar di penjuru itu (satu arah) sebelum kena pagar. Jelaskan bagaimana pagar mengubah bentuk kawasan meragut kambing berbanding padang terbuka.",
    answer:
      "Dalam padang terbuka, lokus akan jadi bulatan penuh jejari 6m. Tetapi pagar sekat sebahagian bulatan itu — kawasan meragut sebenar kambing hanya bahagian bulatan yang muat dalam padang, terpotong di mana tali sepatutnya melintasi pagar.",
  },
};

export const mathF3C8InteractiveContent: { en: MathF3C8Content; bm: MathF3C8Content } = { en, bm };

// Form 3 Mathematics, Chapter 6 — Angles and Tangents of Circles / Sudut dan
// Tangen bagi Bulatan. 4 official subtopics (6.1 Angle at Circumference /
// Central Angle, 6.2 Cyclic Quadrilaterals, 6.3 Tangents to Circles, 6.4 Two
// Tangents from an External Point), built as written — one flowing section
// per subtopic. Subtopic 6.3 has no "Try It Yourself" guided question or
// "Where You'll See This" chips in the source mockup; that asymmetry is
// intentional and preserved here (both fields are optional). Interactive
// bilingual content. EN sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf, BM
// sourced from T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter6-angles-tangents-circles-notes-v1.html.
//
// Content accuracy notes:
// - The 6.2 "hard" practice question uses ∠A=(2x+10)°, ∠C=(x+50)° (opposite
//   angles) — verified in Node: 3x+60=180, x=40, ∠A=∠C=90°, sums to 180°.
//   (An earlier draft using an angle ratio around the quadrilateral did NOT
//   satisfy the opposite-angles-sum-to-180° rule; any future
//   cyclic-quadrilateral question must be re-verified algebraically before
//   shipping, not assumed from a plausible-looking ratio.)
// - 6.1's "medium" practice question wording was tightened from the mockup's
//   "circumference angle on the same side as the minor arc" (ambiguous — the
//   140/2=70° answer is for a point on the MAJOR arc, per the inscribed
//   angle theorem) to explicitly say "from a point on the major arc".
//
// Content only — no presentation markup (rendered by MathF3Chapter6NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C6Visual =
  | { kind: "centralAngle"; caption: string }
  | { kind: "cyclicQuad"; caption: string }
  | { kind: "tangentRadius"; radiusLabel: string; tangentLabel: string; caption: string }
  | { kind: "twoTangents"; caption: string };

export interface MathF3C6Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C6SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C6Visual;
  blocks: MathF3C6Block[];
  guided?: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C6Content {
  subtopics: MathF3C6SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Angle at the Circumference and Central Angle Subtended by an Arc",
      ideaParagraphs: [
        "Pick any arc. Every angle drawn from the CIRCUMFERENCE looking at that arc is exactly the SAME size, no matter where on the circle you stand. And the angle from the CENTRE is always exactly DOUBLE that.",
      ],
      visual: {
        kind: "centralAngle",
        caption:
          "Same arc PR — the angle at centre O (amber, 2x) is always double the angle at the circumference (green, x)",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Two Key Rules",
            formula:
              "Same arc → equal circumference angles. Central angle = 2 × circumference angle.",
          },
          worked: {
            question:
              "In a circle with centre O, the central angle is 80°. Find the angle at the circumference subtended by the same arc.",
            steps: [
              {
                calc: "Circumference angle = 80° ÷ 2 = 40°",
                why: "The central angle is always DOUBLE the circumference angle for the same arc — so divide by 2 to go the other way.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Two angles, ∠PSQ and ∠PTQ, are both at the circumference, subtended by the same arc PQ. If ∠PSQ=35°, find ∠PTQ.",
        answer: "35° — angles at the circumference subtended by the same arc are always equal.",
      },
      mistake: {
        wrong:
          "Doubling the WRONG angle — accidentally doubling the circumference angle instead of finding half of the central angle.",
        right:
          "The CENTRAL angle is always the BIGGER one (double). Check which angle sits at the centre O before deciding whether to double or halve.",
      },
      practice: {
        easy: {
          question:
            "A circumference angle is 40°. Find the central angle subtended by the same arc.",
          answer: "80°",
        },
        medium: {
          question:
            "The reflex central angle (major arc side) is 220°. Find the circumference angle on the minor arc side.",
          answer: "220÷2 = 110°",
        },
        hard: {
          question:
            "A circle has centre O. The (non-reflex) central angle is 140°. Find (a) the circumference angle subtended by the same arc from a point on the major arc, (b) the reflex central angle.",
          answer: "(a) 140÷2=70°. (b) 360−140=220°.",
        },
      },
      realLife: ["🎡 Ferris wheel design", "📡 Satellite dish geometry"],
    },
    {
      num: "6.2",
      title: "Cyclic Quadrilaterals",
      ideaParagraphs: [
        "A cyclic quadrilateral is a four-sided shape with ALL FOUR corners touching the circle's edge. Whenever that happens, each pair of OPPOSITE angles always adds up to exactly 180°.",
      ],
      visual: {
        kind: "cyclicQuad",
        caption: "P+R = 180° and Q+S = 180° — violet pair and green pair are each opposite pairs",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Opposite Angles",
            formula: "Opposite angle + Opposite angle = 180°",
          },
          worked: {
            question: "PQRS is a cyclic quadrilateral. ∠P=100°, ∠Q=85°. Find ∠R and ∠S.",
            steps: [
              {
                calc: "∠R = 180 − 100 = 80°",
                why: "∠P and ∠R are opposite in PQRS — they must sum to 180°.",
              },
              { calc: "∠S = 180 − 85 = 95°", why: "∠Q and ∠S are the other opposite pair." },
            ],
          },
        },
      ],
      guided: {
        question: "In cyclic quadrilateral ABCD, ∠B and ∠D are opposite. If ∠B=110°, find ∠D.",
        answer: "∠D = 180 − 110 = 70°.",
      },
      mistake: {
        wrong: "Adding ADJACENT (side-by-side) angles instead of OPPOSITE angles.",
        right:
          "Trace the quadrilateral's letters in order (P→Q→R→S) — opposite means P pairs with R, and Q pairs with S, never neighbours.",
      },
      practice: {
        easy: {
          question: "A cyclic quadrilateral has one angle of 75°. Find its opposite angle.",
          answer: "105°",
        },
        medium: {
          question: "Quadrilateral WXYZ is cyclic with ∠W=3x, ∠Y=x+40°. Find x.",
          answer: "3x+x+40=180. 4x=140. x=35.",
        },
        hard: {
          question:
            "Cyclic quadrilateral ABCD has ∠A=(2x+10)°, ∠C=(x+50)°, where ∠A and ∠C are opposite. Find x, then find ∠A.",
          answer: "(2x+10)+(x+50)=180. 3x+60=180. x=40. ∠A=2(40)+10=90°.",
        },
      },
      realLife: ["🏛️ Architectural arch design"],
    },
    {
      num: "6.3",
      title: "Tangents to Circles",
      ideaParagraphs: [
        "A tangent touches a circle at exactly ONE point — like a road touching a rolling wheel. Wherever a tangent touches, the radius drawn to that point ALWAYS meets it at a perfect 90°.",
      ],
      visual: {
        kind: "tangentRadius",
        radiusLabel: "radius",
        tangentLabel: "tangent",
        caption:
          "The white square marker confirms a perfect 90° — always true at the point of tangency",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Tangent-Radius Rule",
            formula: "Radius ⊥ Tangent at the point of tangency, always 90°",
          },
          worked: {
            question:
              "Line ABC is tangent to a circle with centre O, touching at B. In triangle OAB, ∠OAB=42°. Find ∠AOB.",
            steps: [
              {
                calc: "∠OBA = 90°",
                why: "The radius OB is perpendicular to the tangent ABC at the point of tangency B.",
              },
              {
                calc: "∠AOB = 180 − 90 − 42 = 48°",
                why: "The three angles of triangle OAB add up to 180° — subtract the two known angles.",
              },
            ],
          },
        },
      ],
      mistake: {
        wrong:
          "Assuming any line touching a circle once is automatically a tangent, without checking it doesn't cross through.",
        right:
          "A tangent touches at exactly one point and does NOT cross into the circle — a line passing through two points is a chord or secant, not a tangent.",
      },
      practice: {
        easy: {
          question: "A radius meets a tangent at the point of tangency. What angle do they form?",
          answer: "90°",
        },
        medium: {
          question:
            "A tangent meets a radius at point B. The angle between the radius OB and a straight line through B is split into 90° (to the tangent) and y° (the rest of a straight 180° line). Find y.",
          answer: "y = 180−90 = 90°",
        },
        hard: {
          question:
            "Line ABC touches a circle with centre O only at point B, where A, B, C lie on a straight line. Given ∠ABO=90°, find ∠OBC.",
          answer:
            "Since ABC is a straight line, ∠ABO+∠OBC=180°. ∠OBC=180−90=90° — the radius is perpendicular to the whole straight tangent line.",
        },
      },
    },
    {
      num: "6.4",
      title: "Two Tangents from an External Point",
      ideaParagraphs: [
        "Stand outside a circle and draw two tangent lines to it — one to each side. Both tangent segments, from your point to where they touch the circle, are ALWAYS exactly the same length.",
      ],
      visual: {
        kind: "twoTangents",
        caption:
          "AB and AC are both tangent segments from the same outside point A — always exactly equal",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Two Tangents Property",
            formula: "BA = CA  (equal tangent lengths from A)",
          },
          worked: {
            question:
              "Tangents PQ and RQ meet at external point Q. PQ=14cm and ∠OQP=66° (O is the circle's centre). Find (a) ∠POQ, (b) the radius OP, (c) ∠PQR.",
            steps: [
              {
                calc: "(a) ∠POQ = 180 − 90 − 66 = 24°",
                why: "∠OPQ=90° (tangent-radius rule), so the angles of right triangle OPQ give ∠POQ.",
              },
              {
                calc: "(b) OP = 14 × tan(66°) ≈ 31.44 cm",
                why: "In the right triangle, OP is opposite the 66° angle and PQ=14 is adjacent to it — that's exactly what tangent (TOA) relates.",
              },
              {
                calc: "(c) ∠PQR = 2 × 66° = 132°",
                why: "By symmetry, QO bisects the angle between the two tangents, so the full angle PQR is double ∠OQP.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Two tangents from point A touch a circle at B and C. If AB=9cm, find AC.",
        answer:
          "AC = 9 cm — the two tangent lengths from the same external point are always equal.",
      },
      mistake: {
        wrong:
          "Forgetting the right angle at each point of tangency when solving triangle problems involving tangents.",
        right:
          "Every tangent-radius pair gives you a free 90° angle — mark it on your diagram first, it usually unlocks the rest of the problem.",
      },
      practice: {
        easy: {
          question: "Two tangents from point A touch a circle at B and C. AB=7.5cm. Find AC.",
          answer: "7.5 cm",
        },
        medium: {
          question:
            "Tangents PQ and RQ meet at Q, with ∠OQP=30° (O is the circle's centre). Find ∠OQR.",
          answer: "30° — OQ bisects the angle between the two tangents symmetrically.",
        },
        hard: {
          question:
            "Tangents PQ and RQ meet at Q. OP (radius) = 6cm, PQ = 8cm. Find the length OQ.",
          answer: "∠OPQ=90° (tangent-radius). OQ²=OP²+PQ²=36+64=100. OQ=10cm.",
        },
      },
      realLife: ["⚙️ Gear and pulley design", "🚴 Bicycle wheel mechanics"],
    },
  ],
  summary: {
    center: "Angles and Tangents of Circles",
    branches: [
      { title: "Circumference/Central", points: ["Same arc: equal / double"] },
      { title: "Cyclic Quadrilateral", points: ["Opposite angles = 180°"] },
      { title: "Tangents", points: ["⊥ radius; equal lengths from a point"] },
    ],
  },
  formulaSheet: [
    { formula: "Central angle = 2 × circumference angle", label: "" },
    { formula: "Cyclic quad opposite angles sum to 180°", label: "" },
    { formula: "Tangent ⊥ radius at point of tangency", label: "" },
    { formula: "Two tangents from one point: equal length", label: "" },
  ],
  quickRevision: [
    "I can use the circumference/central angle relationships.",
    "I can use cyclic quadrilateral angle properties.",
    "I can use tangent properties, including two tangents from a point.",
  ],
  examTips: [
    "Whenever you see a tangent, mark the 90° angle to the radius immediately — it's a free fact every time.",
    "Opposite angles in a cyclic quadrilateral, not adjacent ones, sum to 180° — trace the letters in order to be sure.",
  ],
  challenge: {
    question: "In cyclic quadrilateral ABCD, ∠A = 3∠C (they are opposite angles). Find ∠A and ∠C.",
    answer: "3∠C + ∠C = 180°. 4∠C=180°. ∠C=45°. ∠A=135°.",
  },
};

const bm: MathF3C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Sudut pada Lilitan dan Sudut Pusat Dicangkum oleh Lengkok",
      ideaParagraphs: [
        "Pilih sebarang lengkok. Setiap sudut dilukis dari LILITAN melihat lengkok itu adalah tepat SAMA saiz, tidak kira di mana pada bulatan anda berdiri. Dan sudut dari PUSAT sentiasa tepat DUA KALI itu.",
      ],
      visual: {
        kind: "centralAngle",
        caption:
          "Lengkok PR sama — sudut di pusat O (ambar, 2x) sentiasa dua kali sudut pada lilitan (hijau, x)",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Dua Peraturan Utama",
            formula: "Lengkok sama → sudut lilitan sama. Sudut pusat = 2 × sudut lilitan.",
          },
          worked: {
            question:
              "Dalam bulatan pusat O, sudut pusat 80°. Cari sudut pada lilitan dicangkum lengkok sama.",
            steps: [
              {
                calc: "Sudut lilitan = 80° ÷ 2 = 40°",
                why: "Sudut pusat sentiasa DUA KALI sudut lilitan untuk lengkok sama — jadi bahagi 2 untuk arah sebaliknya.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Dua sudut, ∠PSQ dan ∠PTQ, kedua-dua pada lilitan, dicangkum lengkok sama PQ. Jika ∠PSQ=35°, cari ∠PTQ.",
        answer: "35° — sudut pada lilitan dicangkum lengkok sama sentiasa sama.",
      },
      mistake: {
        wrong:
          "Menggandakan sudut SALAH — tidak sengaja gandakan sudut lilitan bukan cari separuh sudut pusat.",
        right:
          "Sudut PUSAT sentiasa yang LEBIH BESAR (gandaan). Semak sudut mana terletak di pusat O sebelum putuskan gandakan atau separuhkan.",
      },
      practice: {
        easy: {
          question: "Sudut lilitan 40°. Cari sudut pusat dicangkum lengkok sama.",
          answer: "80°",
        },
        medium: {
          question:
            "Sudut pusat refleks (sebelah lengkok major) 220°. Cari sudut lilitan sebelah lengkok minor.",
          answer: "220÷2 = 110°",
        },
        hard: {
          question:
            "Bulatan pusat O. Sudut pusat (bukan refleks) 140°. Cari (a) sudut lilitan dicangkum lengkok sama dari titik pada lengkok major, (b) sudut pusat refleks.",
          answer: "(a) 140÷2=70°. (b) 360−140=220°.",
        },
      },
      realLife: ["🎡 Reka bentuk kincir raksasa", "📡 Geometri pinggan satelit"],
    },
    {
      num: "6.2",
      title: "Sisi Empat Kitaran",
      ideaParagraphs: [
        "Sisi empat kitaran ialah bentuk empat sisi dengan KESEMUA EMPAT penjuru menyentuh tepi bulatan. Bila itu berlaku, setiap pasangan sudut BERTENTANGAN sentiasa berjumlah tepat 180°.",
      ],
      visual: {
        kind: "cyclicQuad",
        caption:
          "P+R = 180° dan Q+S = 180° — pasangan ungu dan pasangan hijau masing-masing pasangan bertentangan",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Sudut Bertentangan",
            formula: "Sudut bertentangan + Sudut bertentangan = 180°",
          },
          worked: {
            question: "PQRS sisi empat kitaran. ∠P=100°, ∠Q=85°. Cari ∠R dan ∠S.",
            steps: [
              {
                calc: "∠R = 180 − 100 = 80°",
                why: "∠P dan ∠R bertentangan dalam PQRS — mesti berjumlah 180°.",
              },
              { calc: "∠S = 180 − 85 = 95°", why: "∠Q dan ∠S pasangan bertentangan satu lagi." },
            ],
          },
        },
      ],
      guided: {
        question: "Dalam sisi empat kitaran ABCD, ∠B dan ∠D bertentangan. Jika ∠B=110°, cari ∠D.",
        answer: "∠D = 180 − 110 = 70°.",
      },
      mistake: {
        wrong: "Menambah sudut BERSEBELAHAN bukan sudut BERTENTANGAN.",
        right:
          "Jejaki huruf sisi empat mengikut turutan (P→Q→R→S) — bertentangan bermaksud P berpasangan R, dan Q berpasangan S, tidak pernah jiran.",
      },
      practice: {
        easy: {
          question: "Sisi empat kitaran ada satu sudut 75°. Cari sudut bertentangannya.",
          answer: "105°",
        },
        medium: {
          question: "Sisi empat WXYZ kitaran dengan ∠W=3x, ∠Y=x+40°. Cari x.",
          answer: "3x+x+40=180. 4x=140. x=35.",
        },
        hard: {
          question:
            "Sisi empat kitaran ABCD ∠A=(2x+10)°, ∠C=(x+50)°, dengan ∠A dan ∠C bertentangan. Cari x, kemudian cari ∠A.",
          answer: "(2x+10)+(x+50)=180. 3x+60=180. x=40. ∠A=2(40)+10=90°.",
        },
      },
      realLife: ["🏛️ Reka bentuk gerbang senibina"],
    },
    {
      num: "6.3",
      title: "Tangen kepada Bulatan",
      ideaParagraphs: [
        "Tangen menyentuh bulatan pada tepat SATU titik — seperti jalan menyentuh roda bergolek. Di mana sahaja tangen menyentuh, jejari dilukis ke titik itu SENTIASA bertemu pada tepat 90°.",
      ],
      visual: {
        kind: "tangentRadius",
        radiusLabel: "jejari",
        tangentLabel: "tangen",
        caption: "Penanda petak putih mengesahkan tepat 90° — sentiasa benar di titik tangensi",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Peraturan Tangen-Jejari",
            formula: "Jejari ⊥ Tangen di titik tangensi, sentiasa 90°",
          },
          worked: {
            question:
              "Garis ABC tangen kepada bulatan pusat O, menyentuh di B. Dalam segi tiga OAB, ∠OAB=42°. Cari ∠AOB.",
            steps: [
              {
                calc: "∠OBA = 90°",
                why: "Jejari OB serenjang dengan tangen ABC di titik tangensi B.",
              },
              {
                calc: "∠AOB = 180 − 90 − 42 = 48°",
                why: "Tiga sudut segi tiga OAB berjumlah 180° — tolak dua sudut diketahui.",
              },
            ],
          },
        },
      ],
      mistake: {
        wrong:
          "Menganggap sebarang garis menyentuh bulatan sekali automatik tangen, tanpa semak ia tidak merentasi.",
        right:
          "Tangen menyentuh tepat satu titik dan TIDAK merentasi ke dalam bulatan — garis melalui dua titik ialah perentas atau sekan, bukan tangen.",
      },
      practice: {
        easy: {
          question: "Jejari bertemu tangen di titik tangensi. Apakah sudut mereka bentuk?",
          answer: "90°",
        },
        medium: {
          question:
            "Tangen bertemu jejari di titik B. Sudut antara jejari OB dan garis lurus melalui B dibahagi 90° (ke tangen) dan y° (baki garis lurus 180°). Cari y.",
          answer: "y = 180−90 = 90°",
        },
        hard: {
          question:
            "Garis ABC sentuh bulatan pusat O hanya di titik B, dengan A, B, C pada garis lurus. Diberi ∠ABO=90°, cari ∠OBC.",
          answer:
            "Oleh kerana ABC garis lurus, ∠ABO+∠OBC=180°. ∠OBC=180−90=90° — jejari serenjang dengan keseluruhan garis tangen lurus.",
        },
      },
    },
    {
      num: "6.4",
      title: "Dua Tangen dari Titik Luar",
      ideaParagraphs: [
        "Berdiri di luar bulatan dan lukis dua garis tangen kepadanya — satu setiap sebelah. Kedua-dua segmen tangen, dari titik anda ke tempat menyentuh bulatan, SENTIASA tepat panjang sama.",
      ],
      visual: {
        kind: "twoTangents",
        caption: "AB dan AC kedua-dua segmen tangen dari titik luar sama A — sentiasa tepat sama",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Sifat Dua Tangen",
            formula: "BA = CA  (panjang tangen sama dari A)",
          },
          worked: {
            question:
              "Tangen PQ dan RQ bertemu titik luar Q. PQ=14cm dan ∠OQP=66° (O pusat bulatan). Cari (a) ∠POQ, (b) jejari OP, (c) ∠PQR.",
            steps: [
              {
                calc: "(a) ∠POQ = 180 − 90 − 66 = 24°",
                why: "∠OPQ=90° (peraturan tangen-jejari), jadi sudut segi tiga tegak OPQ beri ∠POQ.",
              },
              {
                calc: "(b) OP = 14 × tan(66°) ≈ 31.44 cm",
                why: "Dalam segi tiga tegak, OP bertentangan sudut 66° dan PQ=14 bersebelahan — itu tepat apa tangen (TOA) hubungkan.",
              },
              {
                calc: "(c) ∠PQR = 2 × 66° = 132°",
                why: "Melalui simetri, QO membahagi dua sudut antara dua tangen, jadi sudut penuh PQR dua kali ∠OQP.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Dua tangen dari titik A sentuh bulatan di B dan C. Jika AB=9cm, cari AC.",
        answer: "AC = 9 cm — dua panjang tangen dari titik luar sama sentiasa sama.",
      },
      mistake: {
        wrong:
          "Terlupa sudut tegak setiap titik tangensi apabila selesaikan masalah segi tiga melibatkan tangen.",
        right:
          "Setiap pasangan tangen-jejari beri anda sudut 90° percuma — tanda pada rajah anda dahulu, biasanya buka kunci selebihnya masalah.",
      },
      practice: {
        easy: {
          question: "Dua tangen dari titik A sentuh bulatan di B dan C. AB=7.5cm. Cari AC.",
          answer: "7.5 cm",
        },
        medium: {
          question: "Tangen PQ dan RQ bertemu Q, dengan ∠OQP=30° (O pusat bulatan). Cari ∠OQR.",
          answer: "30° — OQ membahagi dua sudut antara dua tangen secara simetri.",
        },
        hard: {
          question: "Tangen PQ dan RQ bertemu Q. OP (jejari) = 6cm, PQ = 8cm. Cari panjang OQ.",
          answer: "∠OPQ=90° (tangen-jejari). OQ²=OP²+PQ²=36+64=100. OQ=10cm.",
        },
      },
      realLife: ["⚙️ Reka bentuk gear dan takal", "🚴 Mekanik roda basikal"],
    },
  ],
  summary: {
    center: "Sudut dan Tangen Bulatan",
    branches: [
      { title: "Lilitan/Pusat", points: ["Lengkok sama: sama / dua kali"] },
      { title: "Sisi Empat Kitaran", points: ["Sudut bertentangan = 180°"] },
      { title: "Tangen", points: ["⊥ jejari; panjang sama dari titik"] },
    ],
  },
  formulaSheet: [
    { formula: "Sudut pusat = 2 × sudut lilitan", label: "" },
    { formula: "Sudut bertentangan sisi empat kitaran jumlah 180°", label: "" },
    { formula: "Tangen ⊥ jejari di titik tangensi", label: "" },
    { formula: "Dua tangen dari satu titik: panjang sama", label: "" },
  ],
  quickRevision: [
    "Saya boleh guna perhubungan sudut lilitan/pusat.",
    "Saya boleh guna sifat sudut sisi empat kitaran.",
    "Saya boleh guna sifat tangen, termasuk dua tangen dari satu titik.",
  ],
  examTips: [
    "Bila anda nampak tangen, tanda sudut 90° ke jejari serta-merta — fakta percuma setiap kali.",
    "Sudut bertentangan dalam sisi empat kitaran, bukan bersebelahan, jumlah 180° — jejaki huruf mengikut turutan untuk pastikan.",
  ],
  challenge: {
    question: "Dalam sisi empat kitaran ABCD, ∠A = 3∠C (sudut bertentangan). Cari ∠A dan ∠C.",
    answer: "3∠C + ∠C = 180°. 4∠C=180°. ∠C=45°. ∠A=135°.",
  },
};

export const mathF3C6InteractiveContent: { en: MathF3C6Content; bm: MathF3C6Content } = { en, bm };

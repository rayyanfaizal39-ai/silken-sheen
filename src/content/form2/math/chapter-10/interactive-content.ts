// Form 2 Mathematics, Chapter 10 — Gradient of a Straight Line / Kecerunan
// Garis Lurus. 10.1 is the ONLY official subtopic ("Gradient") despite
// covering three distinct calculation methods (rise/run, two points,
// intercepts) — kept as one flowing subtopic, not three.
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter10-gradient-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter10NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

/**
 * Labels for the shared RiseRunTriangle diagram. The same component is
 * reused across all three gradient methods by swapping run/rise for
 * whatever the method actually measures (a plain rise & run, y₂−y₁ &
 * x₂−x₁, or the y/x intercepts) rather than building three diagrams.
 */
export interface MathF2C10RiseRunVisual {
  runLabel: string;
  riseLabel: string;
  caption?: string;
}

export interface MathF2C10Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[]; visual?: MathF2C10RiseRunVisual };
}

export interface MathF2C10SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C10RiseRunVisual;
  blocks: MathF2C10Block[];
  guided: { question: string; visual?: MathF2C10RiseRunVisual; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C10Content {
  subtopics: MathF2C10SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C10Content = {
  subtopics: [
    {
      num: "10.1",
      title: "Gradient",
      ideaParagraphs: [
        "Gradient is the ratio of vertical distance to horizontal distance — how much a line rises for every step it moves sideways. A bigger gradient means a steeper line.",
      ],
      visual: {
        runLabel: "run (horizontal)",
        riseLabel: "rise",
        caption: "Gradient = how much it rises, divided by how far it runs sideways",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Gradient — Rise over Run",
            formula: "m = vertical distance ÷ horizontal distance",
          },
          worked: {
            question:
              "A line rises 4 units for every 3 units it moves sideways. Find its gradient.",
            steps: [
              {
                calc: "m = 4 ÷ 3",
                why: "Gradient is exactly rise (vertical) divided by run (horizontal).",
              },
              {
                calc: "m = 4/3",
                why: "This can stay as a fraction — it doesn't need to simplify to a whole number.",
              },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Gradient from Two Points",
            formula: "m = (y₂ − y₁) ÷ (x₂ − x₁)",
            legend: [
              {
                label: "",
                text: "Same rise-over-run idea, just using coordinates instead of a picture",
              },
            ],
          },
          worked: {
            question: "Find the gradient of the line through A(3,1) and B(6,7).",
            steps: [
              {
                calc: "m = (7−1) ÷ (6−3)",
                why: "Subtract the y's for the rise, the x's for the run — using the same point order for both.",
              },
              { calc: "m = 6 ÷ 3 = 2", why: "Simplify." },
            ],
            visual: {
              runLabel: "x₂ − x₁",
              riseLabel: "y₂ − y₁",
              caption: "Same rise-over-run idea, now measured between two coordinate points",
            },
          },
        },
        {
          formula: {
            eyebrow: "Gradient from Intercepts",
            formula: "m = −(y-intercept ÷ x-intercept)",
          },
        },
      ],
      guided: {
        question: "A line crosses the y-axis at 8 and the x-axis at −5. Find its gradient.",
        visual: {
          runLabel: "x-intercept",
          riseLabel: "y-intercept",
          caption: "Same rise-over-run idea, now measured from where the line crosses each axis",
        },
        answer: "m = −(8÷(−5)) = 8/5.",
      },
      mistake: {
        wrong: "Subtracting x's and y's in a different order between numerator and denominator.",
        right:
          "If you start with point 2's y on top, start with point 2's x on the bottom too — keep the order consistent.",
      },
      practice: {
        easy: {
          question: "A line rises 2 units for every 3 units sideways. Find its gradient.",
          answer: "2/3",
        },
        medium: {
          question: "Find the gradient through P(4,−1) and Q(3,5).",
          answer: "(5−(−1))/(3−4) = 6/(−1) = −6",
        },
        hard: {
          question:
            "Line PQ has y-intercept 9 and x-intercept −3. Line AB has gradient 2/3. Which line is steeper?",
          answer: "PQ: m=−(9÷(−3))=3. Since 3 > 2/3, line PQ is steeper.",
        },
      },
      realLife: ["🚴 Road and cycling gradients", "🏗️ Wheelchair ramp design"],
    },
  ],
  summary: {
    center: "Gradient",
    branches: [
      { title: "Rise over Run", points: ["Vertical ÷ horizontal"] },
      { title: "Two Points", points: ["(y₂−y₁)/(x₂−x₁)"] },
      { title: "Intercepts", points: ["−(y-int/x-int)"] },
    ],
  },
  formulaSheet: [
    { formula: "m = vertical ÷ horizontal", label: "" },
    { formula: "m = (y₂−y₁)/(x₂−x₁)", label: "" },
    { formula: "m = −(y-int/x-int)", label: "" },
  ],
  quickRevision: [
    "I can find the gradient of a straight line using rise/run, two points, or intercepts.",
  ],
  examTips: [
    "A negative gradient means the line slopes DOWN as you move right — sketch it if unsure.",
  ],
  challenge: {
    question:
      "A wheelchair ramp must have a gradient no steeper than 1/12 (that's the accessibility standard). If a doorway is 60 cm above ground level, what's the SHORTEST horizontal length the ramp can be?",
    answer: "1/12 = 60/horizontal. Horizontal = 60×12 = 720 cm.",
  },
};

const bm: MathF2C10Content = {
  subtopics: [
    {
      num: "10.1",
      title: "Kecerunan",
      ideaParagraphs: [
        "Kecerunan ialah nisbah jarak menegak kepada jarak mendatar — berapa banyak garis naik untuk setiap langkah ia bergerak ke sisi. Kecerunan lebih besar bermaksud garis lebih curam.",
      ],
      visual: {
        runLabel: "larian (mendatar)",
        riseLabel: "naik",
        caption: "Kecerunan = berapa banyak ia naik, dibahagi berapa jauh ia larian ke sisi",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Kecerunan — Naik atas Larian",
            formula: "m = jarak menegak ÷ jarak mendatar",
          },
          worked: {
            question:
              "Garis naik 4 unit untuk setiap 3 unit ia bergerak ke sisi. Cari kecerunannya.",
            steps: [
              {
                calc: "m = 4 ÷ 3",
                why: "Kecerunan tepat naik (menegak) dibahagi larian (mendatar).",
              },
              {
                calc: "m = 4/3",
                why: "Ini boleh kekal sebagai pecahan — tidak perlu dipermudahkan kepada nombor bulat.",
              },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Kecerunan daripada Dua Titik",
            formula: "m = (y₂ − y₁) ÷ (x₂ − x₁)",
            legend: [
              { label: "", text: "Idea naik-atas-larian sama, cuma guna koordinat bukan gambar" },
            ],
          },
          worked: {
            question: "Cari kecerunan garis melalui A(3,1) dan B(6,7).",
            steps: [
              {
                calc: "m = (7−1) ÷ (6−3)",
                why: "Tolak y untuk naik, x untuk larian — guna susunan titik sama untuk kedua-dua.",
              },
              { calc: "m = 6 ÷ 3 = 2", why: "Permudahkan." },
            ],
            visual: {
              runLabel: "x₂ − x₁",
              riseLabel: "y₂ − y₁",
              caption: "Idea naik-atas-larian sama, kini diukur antara dua titik koordinat",
            },
          },
        },
        {
          formula: {
            eyebrow: "Kecerunan daripada Pintasan",
            formula: "m = −(pintasan-y ÷ pintasan-x)",
          },
        },
      ],
      guided: {
        question: "Garis melintasi paksi-y pada 8 dan paksi-x pada −5. Cari kecerunannya.",
        visual: {
          runLabel: "pintasan-x",
          riseLabel: "pintasan-y",
          caption:
            "Idea naik-atas-larian sama, kini diukur dari titik garis melintasi setiap paksi",
        },
        answer: "m = −(8÷(−5)) = 8/5.",
      },
      mistake: {
        wrong: "Menolak x dan y dalam susunan berbeza antara pengangka dan penyebut.",
        right:
          "Jika anda mula dengan y titik 2 di atas, mula dengan x titik 2 di bawah juga — kekalkan susunan konsisten.",
      },
      practice: {
        easy: {
          question: "Garis naik 2 unit untuk setiap 3 unit sisi. Cari kecerunannya.",
          answer: "2/3",
        },
        medium: {
          question: "Cari kecerunan melalui P(4,−1) dan Q(3,5).",
          answer: "(5−(−1))/(3−4) = 6/(−1) = −6",
        },
        hard: {
          question:
            "Garis PQ ada pintasan-y 9 dan pintasan-x −3. Garis AB ada kecerunan 2/3. Garis mana lebih curam?",
          answer: "PQ: m=−(9÷(−3))=3. Oleh kerana 3 > 2/3, garis PQ lebih curam.",
        },
      },
      realLife: ["🚴 Kecerunan jalan dan berbasikal", "🏗️ Reka bentuk landasan kerusi roda"],
    },
  ],
  summary: {
    center: "Kecerunan",
    branches: [
      { title: "Naik atas Larian", points: ["Menegak ÷ mendatar"] },
      { title: "Dua Titik", points: ["(y₂−y₁)/(x₂−x₁)"] },
      { title: "Pintasan", points: ["−(pintasan-y/pintasan-x)"] },
    ],
  },
  formulaSheet: [
    { formula: "m = menegak ÷ mendatar", label: "" },
    { formula: "m = (y₂−y₁)/(x₂−x₁)", label: "" },
    { formula: "m = −(pintasan-y/pintasan-x)", label: "" },
  ],
  quickRevision: [
    "Saya boleh cari kecerunan garis lurus menggunakan naik/larian, dua titik, atau pintasan.",
  ],
  examTips: [
    "Kecerunan negatif bermaksud garis menurun ke BAWAH apabila anda bergerak ke kanan — lakar jika tidak pasti.",
  ],
  challenge: {
    question:
      "Landasan kerusi roda mesti ada kecerunan tidak lebih curam daripada 1/12 (piawaian kebolehcapaian). Jika pintu 60 cm di atas aras tanah, apakah panjang mendatar TERPENDEK landasan boleh?",
    answer: "1/12 = 60/mendatar. Mendatar = 60×12 = 720 cm.",
  },
};

export const mathF2C10InteractiveContent: { en: MathF2C10Content; bm: MathF2C10Content } = {
  en,
  bm,
};

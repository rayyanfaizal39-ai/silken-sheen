// Form 1 Mathematics, Chapter 4 — Ratios, Rates and Proportions / Nisbah, Kadar dan Kadaran
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter4-ratios-rates-proportions-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter4NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC4SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 4.3 only — illustrative cross-multiplication SVG embedded in the lesson intro. */
  crossMultiply?: {
    numerator1: number;
    denominator1: number;
    numerator2: number;
    denominator2: number;
  };
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  /** 4.1 only — generic HCF-ladder demo shown right under the formula card. */
  ladderDemo?: { numbers: number[]; introText?: string };
  /** Worked example — either a step-reveal (steps) or, for 4.1, a division ladder. */
  worked: { question: string; steps?: WorkedStep[]; ladder?: { numbers: number[] } };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C4Content {
  subtopics: MathC4SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Ratios",
      ideaParagraphs: [
        "A ratio compares two or more quantities of the SAME kind, measured in the SAME unit. A ratio has no units — it only compares. For example, 5000 g to 9 kg: convert to the same unit first (5 kg : 9 kg), then drop the units → 5 : 9.",
        "Ratios like 1:2, 2:4, and 6:12 are equivalent ratios — multiplying or dividing every part by the same number never changes what the ratio represents.",
      ],
      formula: {
        eyebrow: "Simplifying a Ratio — Divide by the HCF",
        formula: "Ratio ÷ HCF = Simplest Form",
      },
      ladderDemo: {
        numbers: [18, 24, 45],
        introText:
          "Just like Chapter 2, find the HCF of all parts using a division ladder, then divide every part by it.",
      },
      worked: {
        question: "Express 32 : 24 : 20 in its simplest form.",
        ladder: { numbers: [32, 24, 20] },
      },
      guided: {
        question:
          "Express 800 g : 1.8 kg in its simplest form. Think: what must happen before you can even compare these two numbers?",
        answer:
          "Convert to the same unit first: 1.8 kg = 1800 g. So 800 : 1800. HCF of 800 and 1800 is 200. Divide: 4 : 9.",
      },
      mistake: {
        wrong:
          "Simplifying 800 g : 1.8 kg directly as if both numbers were already in the same unit.",
        right: "ALWAYS convert to the same unit BEFORE finding the HCF or simplifying.",
      },
      practice: {
        easy: {
          question:
            "Represent the relationship of 2 weeks to 16 days to 1 week in the form a : b : c.",
          answer: "Convert to days: 14 days : 16 days : 7 days = 14 : 16 : 7.",
        },
        medium: {
          question: "Express 0.04 : 0.12 : 0.56 in its simplest form.",
          answer: "Multiply all by 100: 4 : 12 : 56. HCF of 4,12,56 is 4. Divide: 1 : 3 : 14.",
        },
        hard: {
          question:
            "A mechanic uses a jack (force 120 pounds, 1 pound = 0.45 kg) to lift a car (mass 1350 kg). State the ratio of the car's mass to the force required, in simplest form.",
          answer: "Force = 120 × 0.45 = 54 kg. Ratio = 1350 : 54 = 25 : 1 (HCF = 54).",
        },
      },
      realLife: [
        "🍳 Recipe scaling",
        "🏗️ Concrete mixture ratios",
        "🐎 Population estimation (mark-recapture)",
      ],
    },
    {
      num: "4.2",
      title: "Rates",
      ideaParagraphs: [
        "A rate is a special ratio that compares two quantities with DIFFERENT units — like 285 km in 3 hours, or RM10 for 2 kg. Ordinary ratios need matching units; rates are built on the fact that the units are different.",
      ],
      formula: {
        eyebrow: "Rate Notation",
        formula: "285 km / 3 hours",
        legend: [
          {
            label: "Note",
            text: 'Two DIFFERENT units, always written with a slash or "per"',
          },
        ],
      },
      worked: {
        question: "Rajan is riding his bicycle at a speed of 5 m/s. Convert 5 m/s to km/h.",
        steps: [
          {
            calc: "5 m/s = 5 m ÷ 1 s",
            why: "Rewrite the rate as a division to convert both units.",
          },
          {
            calc: "= (5 ÷ 1000) km ÷ (1 ÷ 3600) h",
            why: "Convert metres to km (÷1000) and seconds to hours (÷3600).",
          },
          {
            calc: "= (5/1000) × (3600/1) km/h = 18 km/h",
            why: "Dividing by a fraction means multiplying by its reciprocal.",
          },
        ],
      },
      guided: {
        question:
          "Two stalls sell tomatoes: Stall A at RM8/500 g, Stall B at RM15/kg. Which is cheaper per kg?",
        answer:
          "Convert Stall A to per kg: RM8/500g × 2 = RM16/kg. RM16 > RM15, so Stall B is cheaper.",
      },
      mistake: {
        wrong:
          "Comparing RM8/500g directly against RM15/kg without converting to the same unit first.",
        right:
          "Always convert BOTH rates to the SAME unit before comparing which is cheaper/faster.",
      },
      practice: {
        easy: {
          question:
            'State the rate and the two quantities involved: "A car consumes 1 litre of petrol for a distance of 12 km."',
          answer: "Rate = 12 km/litre. Quantities: distance (km) and volume (litre).",
        },
        medium: {
          question: "The density of a metal is 2700 kg per m³. State the density in g per cm³.",
          answer:
            "2700 kg = 2 700 000 g. 1 m³ = 100×100×100 = 1 000 000 cm³. So 2 700 000 ÷ 1 000 000 = 2.7 g/cm³.",
        },
        hard: {
          question:
            "An oil palm plantation uses fertiliser at 350 kg per hectare. State this rate in g per m². (1 hectare = 10,000 m²)",
          answer: "350 kg = 350 000 g. 350 000 ÷ 10 000 = 35 g/m².",
        },
      },
      realLife: [
        "💊 Heart rate (beats per minute)",
        "🚗 Speed and fuel consumption",
        "🛒 Comparing prices per unit",
      ],
    },
    {
      num: "4.3",
      title: "Proportions",
      ideaParagraphs: [
        "A proportion states that two ratios or two rates are EQUAL. For example, if 45 words take 5 minutes, then 540 words take 60 minutes — both sides describe the same rate, just scaled up.",
      ],
      crossMultiply: { numerator1: 45, denominator1: 5, numerator2: 540, denominator2: 60 },
      formula: {
        eyebrow: "Cross Multiplication",
        formula: "a/b = c/d  ⟹  a × d = b × c",
        legend: [
          {
            label: "Rule",
            text: "Multiply diagonally across the equals sign to solve for an unknown",
          },
        ],
      },
      worked: {
        question: "Electricity costs 43.6 sen for 2 kWh. How much does 30 kWh cost?",
        steps: [
          {
            calc: "43.6 sen / 2 kWh = x sen / 30 kWh",
            why: "Set up the proportion — both sides compare cost to kWh.",
          },
          { calc: "2 × x = 43.6 × 30", why: "Cross multiply." },
          { calc: "x = 1308 ÷ 2 = 654 sen = RM6.54", why: "Divide to isolate x." },
        ],
      },
      guided: {
        question:
          "A gear rotates: when a large gear turns 4 times, a small gear turns 18 times. If the small gear turns 54 times, how many times does the large gear turn?",
        answer: "4/18 = x/54. Cross multiply: 18x = 4×54 = 216. x = 12.",
      },
      mistake: {
        wrong:
          "Setting up the proportion with mismatched quantities on top and bottom (e.g. time over cost on one side, cost over time on the other).",
        right:
          "Keep the SAME quantity type in the SAME position (top/bottom) on both sides of the proportion.",
      },
      practice: {
        easy: {
          question:
            "In a sports carnival, 200 players form 8 rugby teams. How many players are in 2 teams?",
          answer: "Players per team = 200÷8 = 25. For 2 teams: 25×2 = 50.",
        },
        medium: {
          question:
            "Amir does 60 push-ups in 3 minutes. How many can he do in 5 minutes at the same rate?",
          answer: "60/3 = x/5. Cross multiply: 3x = 300. x = 100.",
        },
        hard: {
          question:
            "A farmer captures 24 snails, marks and releases them. Later he captures 30 snails, 5 marked. Estimate the total snail population.",
          answer: "5/30 = 24/x. Cross multiply: 5x = 720. x = 144 snails.",
        },
      },
      realLife: ["⚡ Utility bills (electricity, water)", "🐌 Wildlife population estimation"],
    },
    {
      num: "4.4",
      title: "Ratios, Rates and Proportions",
      ideaParagraphs: [
        "When you know p:q and q:r separately, you can chain them into one ratio p:q:r — but only if the shared term (q) is matched to the SAME value first. That's the LCM trick from Chapter 2, reused here.",
      ],
      formula: {
        eyebrow: "Chaining Ratios via the Shared Term",
        formula: "p : q = 7 : 3  &  q : r = 3 : 5  ⟹  p : q : r = 7 : 3 : 5",
        legend: [
          {
            label: "Note",
            text: "Here q is already 3 in both — no scaling needed. When it's NOT already equal, find the LCM of the two q-values first.",
          },
        ],
      },
      worked: {
        question:
          "The ratio of storybooks to reference books is 2:5. The ratio of reference books to magazines is 3:2. Find storybooks : reference books : magazines.",
        steps: [
          {
            calc: "storybooks:reference = 2:5,  reference:magazines = 3:2",
            why: "Write both given ratios, noting the shared term (reference books).",
          },
          {
            calc: "LCM(5,3) = 15 → scale both to match",
            why: "Find the LCM of the shared term's two values so they become equal.",
          },
          {
            calc: "2:5 → ×3 → 6:15    3:2 → ×5 → 15:10",
            why: "Scale each ratio so the reference-books term becomes 15 in both.",
          },
          {
            calc: "storybooks : reference : magazines = 6 : 15 : 10",
            why: "Now that the shared term matches, combine into one three-part ratio.",
          },
        ],
      },
      guided: {
        question:
          "The ratio of flour to water is 5:3. If there are 480 g of flour, how much water is needed?",
        answer: "5 parts = 480 g, so 1 part = 96 g. Water = 3 parts = 3 × 96 = 288 g.",
      },
      mistake: {
        wrong: "Combining p:q=2:5 and q:r=3:2 directly as p:q:r = 2:5:2 without matching q first.",
        right:
          "Scale BOTH ratios so the shared term (q) becomes the LCM of 5 and 3 (which is 15), then combine.",
      },
      practice: {
        easy: {
          question: "If p:q = 2:9 and q:r = 9:7, find p:q:r.",
          answer: "q is already 9 in both — p:q:r = 2:9:7.",
        },
        medium: {
          question: "The ratio of donations P:Q is 2:3, and Q:R is 4:1. Find P:Q:R.",
          answer: "LCM(3,4)=12. P:Q=2:3=8:12. Q:R=4:1=12:3. So P:Q:R = 8:12:3.",
        },
        hard: {
          question:
            "A wire of length 12 cm is cut into PQ, QR, RS where PQ:QR=3:2 and RS=2 cm. Find PQ:QR:RS.",
          answer:
            "PR = 12−2 = 10 cm split 3:2 (5 parts): 1 part=2cm. PQ=6cm, QR=4cm. So PQ:QR:RS = 6:4:2 = 3:2:1.",
        },
      },
      realLife: ["💰 Splitting shared costs three ways", "🧪 Multi-ingredient mixtures"],
    },
    {
      num: "4.5",
      title: "Relationship between Ratios, Rates, Proportions, Percentages, Fractions and Decimals",
      ideaParagraphs: [
        'A percentage is just a ratio out of 100 — "percentage" literally means "per 100". So 20% = 20:100 = 20/100 = 0.2. Every percentage can be rewritten as a ratio, a fraction, or a decimal — they\'re four ways of saying the same thing.',
      ],
      formula: {
        eyebrow: "Percentage = Ratio out of 100",
        formula: "20% = 20 : 100 = 20/100 = 0.2",
      },
      worked: {
        question:
          "In a class, the ratio of girls to boys is 3:2. Find the percentage of girls in the class.",
        steps: [
          {
            calc: "girls : boys = 3 : 2   →   girls : total = 3 : 5",
            why: "Total parts = 3+2 = 5, so girls compare to the WHOLE class, not just boys.",
          },
          {
            calc: "3/5 = 3×20 / 5×20 = 60/100",
            why: "Scale the fraction so the denominator becomes 100.",
          },
          { calc: "Percentage of girls = 60%", why: "A fraction over 100 IS the percentage." },
        ],
      },
      guided: {
        question:
          "Zakaria saves 30% of his daily pocket money. Find the ratio of his savings to his total pocket money.",
        answer: "30% = 30/100 = 30:100. Simplify (HCF=10): 3:10.",
      },
      mistake: {
        wrong:
          'Writing a ratio 3:2 (girls:boys) as "3% girls" without first finding girls-to-TOTAL.',
        right: "A percentage of the WHOLE needs girls : TOTAL (3:5), not girls : boys (3:2).",
      },
      practice: {
        easy: {
          question:
            "35% of a hard disk is filled with data. Find the ratio of filled to unfilled capacity.",
          answer: "Filled = 35%, unfilled = 65%. Ratio = 35:65 = 7:13.",
        },
        medium: {
          question: "A box has 8 ribbons, 2 are blue. What percentage of ribbons are blue?",
          answer: "2/8 = x/100. Cross multiply: 8x=200, x=25%.",
        },
        hard: {
          question:
            'A shirt originally RM85 shows "45% price reduction". The scanned price is RM57.80. Does this match? Explain.',
          answer:
            "45% off RM85 → price = 55% × 85 = RM46.75. But scanner shows RM57.80 — these don't match, so the discount displayed is incorrect.",
        },
      },
      realLife: ["🏷️ Sale discounts", "🧪 Fertiliser composition labels"],
    },
  ],
  summary: {
    center: "Ratios, Rates, Proportions",
    branches: [
      { title: "Ratios", points: ["Same units, simplify via HCF"] },
      { title: "Rates & Proportions", points: ["Different units; solve via cross multiplication"] },
      { title: "Percentages", points: ["A ratio out of 100"] },
    ],
  },
  formulaSheet: [
    { formula: "Simplify ratio: ÷ HCF", label: "Same method as Ch 2" },
    { formula: "a/b = c/d ⟹ ad = bc", label: "Cross multiplication" },
    { formula: "x% = x/100", label: "Percentage as ratio" },
    { formula: "Chain ratios: match via LCM", label: "p:q:r" },
  ],
  quickRevision: [
    "I can represent and simplify ratios of two or three quantities.",
    "I can determine and convert rates.",
    "I can solve proportions using cross multiplication.",
    "I can chain two ratios into a three-quantity ratio.",
    "I can relate ratios/rates/proportions to percentages, fractions and decimals.",
  ],
  examTips: [
    "Always match units BEFORE simplifying a ratio.",
    "Set up proportions with matching quantity types on top and bottom on both sides.",
    "Percentage of the WHOLE always uses part:TOTAL, not part:the-other-part.",
  ],
  challenge: {
    question:
      "A 30 kg bag of fertiliser is labelled 15-20-10, meaning 15% nitrogen, 20% phosphorus, 10% potassium by mass. (a) Find the ratio N:P:K. (b) Calculate the mass of each in kg.",
    answer: "(a) 15:20:10 = 3:4:2. (b) N=15%×30=4.5kg, P=20%×30=6kg, K=10%×30=3kg.",
  },
};

const bm: MathF1C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Nisbah",
      ideaParagraphs: [
        "Nisbah membanding dua atau lebih kuantiti JENIS SAMA, diukur dalam UNIT SAMA. Nisbah tiada unit — ia hanya membanding. Contohnya, 5000 g kepada 9 kg: tukar kepada unit sama dahulu (5 kg : 9 kg), kemudian gugurkan unit → 5 : 9.",
        "Nisbah seperti 1:2, 2:4, dan 6:12 ialah nisbah setara — mendarab atau membahagi setiap bahagian dengan nombor sama tidak mengubah apa yang diwakili nisbah itu.",
      ],
      formula: {
        eyebrow: "Memudahkan Nisbah — Bahagi dengan FSTB",
        formula: "Nisbah ÷ FSTB = Bentuk Termudah",
      },
      ladderDemo: {
        numbers: [18, 24, 45],
        introText:
          "Seperti Bab 2, cari FSTB semua bahagian menggunakan tangga pembahagian, kemudian bahagi setiap bahagian dengannya.",
      },
      worked: {
        question: "Ungkapkan 32 : 24 : 20 dalam bentuk termudah.",
        ladder: { numbers: [32, 24, 20] },
      },
      guided: {
        question:
          "Ungkapkan 800 g : 1.8 kg dalam bentuk termudah. Fikir: apa perlu berlaku sebelum anda boleh banding kedua-dua nombor ini?",
        answer:
          "Tukar kepada unit sama dahulu: 1.8 kg = 1800 g. Jadi 800 : 1800. FSTB bagi 800 dan 1800 ialah 200. Bahagi: 4 : 9.",
      },
      mistake: {
        wrong:
          "Memudahkan 800 g : 1.8 kg terus seolah-olah kedua-dua nombor sudah dalam unit sama.",
        right: "SENTIASA tukar kepada unit sama SEBELUM mencari FSTB atau memudahkan.",
      },
      practice: {
        easy: {
          question:
            "Wakilkan hubungan 2 minggu kepada 16 hari kepada 1 minggu dalam bentuk a : b : c.",
          answer: "Tukar kepada hari: 14 hari : 16 hari : 7 hari = 14 : 16 : 7.",
        },
        medium: {
          question: "Ungkapkan 0.04 : 0.12 : 0.56 dalam bentuk termudah.",
          answer:
            "Darab semua dengan 100: 4 : 12 : 56. FSTB bagi 4,12,56 ialah 4. Bahagi: 1 : 3 : 14.",
        },
        hard: {
          question:
            "Mekanik guna jek (daya 120 paun, 1 paun = 0.45 kg) mengangkat kereta (jisim 1350 kg). Nyatakan nisbah jisim kereta kepada daya diperlukan, dalam bentuk termudah.",
          answer: "Daya = 120 × 0.45 = 54 kg. Nisbah = 1350 : 54 = 25 : 1 (FSTB = 54).",
        },
      },
      realLife: [
        "🍳 Penskalaan resipi",
        "🏗️ Nisbah campuran konkrit",
        "🐎 Anggaran populasi (tanda-tangkap semula)",
      ],
    },
    {
      num: "4.2",
      title: "Kadar",
      ideaParagraphs: [
        "Kadar ialah nisbah khas yang membanding dua kuantiti dengan unit BERBEZA — seperti 285 km dalam 3 jam, atau RM10 untuk 2 kg. Nisbah biasa perlukan unit sepadan; kadar dibina atas hakikat unit adalah berbeza.",
      ],
      formula: {
        eyebrow: "Tatatanda Kadar",
        formula: "285 km / 3 jam",
        legend: [
          {
            label: "Nota",
            text: 'Dua unit BERBEZA, sentiasa ditulis dengan garis miring atau "setiap"',
          },
        ],
      },
      worked: {
        question: "Rajan menunggang basikal pada kelajuan 5 m/s. Tukar 5 m/s kepada km/j.",
        steps: [
          {
            calc: "5 m/s = 5 m ÷ 1 s",
            why: "Tulis semula kadar sebagai pembahagian untuk tukar kedua-dua unit.",
          },
          {
            calc: "= (5 ÷ 1000) km ÷ (1 ÷ 3600) j",
            why: "Tukar meter kepada km (÷1000) dan saat kepada jam (÷3600).",
          },
          {
            calc: "= (5/1000) × (3600/1) km/j = 18 km/j",
            why: "Membahagi dengan pecahan bermaksud mendarab dengan salingannya.",
          },
        ],
      },
      guided: {
        question:
          "Dua gerai jual tomato: Gerai A RM8/500 g, Gerai B RM15/kg. Mana lebih murah per kg?",
        answer:
          "Tukar Gerai A kepada per kg: RM8/500g × 2 = RM16/kg. RM16 > RM15, jadi Gerai B lebih murah.",
      },
      mistake: {
        wrong: "Membanding RM8/500g terus dengan RM15/kg tanpa menukar kepada unit sama dahulu.",
        right:
          "Sentiasa tukar KEDUA-DUA kadar kepada unit SAMA sebelum banding mana lebih murah/laju.",
      },
      practice: {
        easy: {
          question:
            'Nyatakan kadar dan dua kuantiti terlibat: "Kereta guna 1 liter petrol untuk jarak 12 km."',
          answer: "Kadar = 12 km/liter. Kuantiti: jarak (km) dan isi padu (liter).",
        },
        medium: {
          question: "Ketumpatan logam ialah 2700 kg per m³. Nyatakan ketumpatan dalam g per cm³.",
          answer:
            "2700 kg = 2 700 000 g. 1 m³ = 100×100×100 = 1 000 000 cm³. Jadi 2 700 000 ÷ 1 000 000 = 2.7 g/cm³.",
        },
        hard: {
          question:
            "Ladang sawit guna baja 350 kg per hektar. Nyatakan kadar ini dalam g per m². (1 hektar = 10,000 m²)",
          answer: "350 kg = 350 000 g. 350 000 ÷ 10 000 = 35 g/m².",
        },
      },
      realLife: [
        "💊 Kadar denyutan jantung (setiap minit)",
        "🚗 Kelajuan dan penggunaan bahan api",
        "🛒 Membanding harga setiap unit",
      ],
    },
    {
      num: "4.3",
      title: "Kadaran",
      ideaParagraphs: [
        "Kadaran menyatakan bahawa dua nisbah atau dua kadar adalah SAMA. Contohnya, jika 45 patah perkataan mengambil 5 minit, maka 540 patah perkataan mengambil 60 minit — kedua-dua belah menggambarkan kadar sama, hanya diskalakan.",
      ],
      crossMultiply: { numerator1: 45, denominator1: 5, numerator2: 540, denominator2: 60 },
      formula: {
        eyebrow: "Pendaraban Silang",
        formula: "a/b = c/d  ⟹  a × d = b × c",
        legend: [
          {
            label: "Peraturan",
            text: "Darab secara pepenjuru merentasi tanda sama untuk selesaikan yang tidak diketahui",
          },
        ],
      },
      worked: {
        question: "Elektrik berharga 43.6 sen bagi 2 kWj. Berapakah kos 30 kWj?",
        steps: [
          {
            calc: "43.6 sen / 2 kWj = x sen / 30 kWj",
            why: "Sediakan kadaran — kedua-dua belah banding kos kepada kWj.",
          },
          { calc: "2 × x = 43.6 × 30", why: "Darab silang." },
          { calc: "x = 1308 ÷ 2 = 654 sen = RM6.54", why: "Bahagi untuk asingkan x." },
        ],
      },
      guided: {
        question:
          "Gear berputar: apabila gear besar berputar 4 kali, gear kecil berputar 18 kali. Jika gear kecil berputar 54 kali, berapa kali gear besar berputar?",
        answer: "4/18 = x/54. Darab silang: 18x = 4×54 = 216. x = 12.",
      },
      mistake: {
        wrong: "Menyediakan kadaran dengan kuantiti tidak sepadan di atas dan bawah.",
        right:
          "Kekalkan JENIS kuantiti SAMA pada kedudukan SAMA (atas/bawah) pada kedua-dua belah kadaran.",
      },
      practice: {
        easy: {
          question:
            "Dalam karnival sukan, 200 pemain membentuk 8 pasukan ragbi. Berapa pemain dalam 2 pasukan?",
          answer: "Pemain setiap pasukan = 200÷8 = 25. Untuk 2 pasukan: 25×2 = 50.",
        },
        medium: {
          question:
            "Amir buat 60 tekan tubi dalam 3 minit. Berapa dia boleh buat dalam 5 minit pada kadar sama?",
          answer: "60/3 = x/5. Darab silang: 3x = 300. x = 100.",
        },
        hard: {
          question:
            "Petani tangkap 24 siput, tanda dan lepaskan. Kemudian tangkap 30 siput, 5 bertanda. Anggarkan jumlah populasi siput.",
          answer: "5/30 = 24/x. Darab silang: 5x = 720. x = 144 siput.",
        },
      },
      realLife: ["⚡ Bil utiliti (elektrik, air)", "🐌 Anggaran populasi hidupan liar"],
    },
    {
      num: "4.4",
      title: "Nisbah, Kadar dan Kadaran",
      ideaParagraphs: [
        "Apabila anda tahu p:q dan q:r berasingan, anda boleh gabungkannya kepada satu nisbah p:q:r — tetapi hanya jika sebutan dikongsi (q) disamakan kepada nilai SAMA dahulu. Itulah helah GSTK daripada Bab 2, digunakan semula di sini.",
      ],
      formula: {
        eyebrow: "Menggabungkan Nisbah melalui Sebutan Dikongsi",
        formula: "p : q = 7 : 3  &  q : r = 3 : 5  ⟹  p : q : r = 7 : 3 : 5",
        legend: [
          {
            label: "Nota",
            text: "Di sini q sudah 3 dalam kedua-dua — tiada penskalaan diperlukan. Apabila ia TIDAK sama, cari GSTK bagi kedua-dua nilai q dahulu.",
          },
        ],
      },
      worked: {
        question:
          "Nisbah buku cerita kepada buku rujukan ialah 2:5. Nisbah buku rujukan kepada majalah ialah 3:2. Cari buku cerita : buku rujukan : majalah.",
        steps: [
          {
            calc: "buku cerita:rujukan = 2:5,  rujukan:majalah = 3:2",
            why: "Tulis kedua-dua nisbah diberi, catat sebutan dikongsi (buku rujukan).",
          },
          {
            calc: "GSTK(5,3) = 15 → skalakan kedua-dua supaya sepadan",
            why: "Cari GSTK bagi dua nilai sebutan dikongsi supaya menjadi sama.",
          },
          {
            calc: "2:5 → ×3 → 6:15    3:2 → ×5 → 15:10",
            why: "Skalakan setiap nisbah supaya sebutan buku rujukan menjadi 15 dalam kedua-dua.",
          },
          {
            calc: "buku cerita : rujukan : majalah = 6 : 15 : 10",
            why: "Oleh kerana sebutan dikongsi sepadan, gabungkan kepada satu nisbah tiga bahagian.",
          },
        ],
      },
      guided: {
        question:
          "Nisbah tepung kepada air ialah 5:3. Jika ada 480 g tepung, berapa air diperlukan?",
        answer: "5 bahagian = 480 g, jadi 1 bahagian = 96 g. Air = 3 bahagian = 3 × 96 = 288 g.",
      },
      mistake: {
        wrong:
          "Menggabungkan p:q=2:5 dan q:r=3:2 terus sebagai p:q:r = 2:5:2 tanpa menyamakan q dahulu.",
        right:
          "Skalakan KEDUA-DUA nisbah supaya sebutan dikongsi (q) menjadi GSTK bagi 5 dan 3 (iaitu 15), kemudian gabungkan.",
      },
      practice: {
        easy: {
          question: "Jika p:q = 2:9 dan q:r = 9:7, cari p:q:r.",
          answer: "q sudah 9 dalam kedua-dua — p:q:r = 2:9:7.",
        },
        medium: {
          question: "Nisbah derma P:Q ialah 2:3, dan Q:R ialah 4:1. Cari P:Q:R.",
          answer: "GSTK(3,4)=12. P:Q=2:3=8:12. Q:R=4:1=12:3. Jadi P:Q:R = 8:12:3.",
        },
        hard: {
          question:
            "Dawai panjang 12 cm dipotong PQ, QR, RS dengan PQ:QR=3:2 dan RS=2 cm. Cari PQ:QR:RS.",
          answer:
            "PR = 12−2 = 10 cm dibahagi 3:2 (5 bahagian): 1 bahagian=2cm. PQ=6cm, QR=4cm. Jadi PQ:QR:RS = 6:4:2 = 3:2:1.",
        },
      },
      realLife: ["💰 Berkongsi kos tiga cara", "🧪 Campuran pelbagai bahan"],
    },
    {
      num: "4.5",
      title: "Perhubungan antara Nisbah, Kadar, Kadaran, Peratusan, Pecahan dan Perpuluhan",
      ideaParagraphs: [
        'Peratusan hanyalah nisbah daripada 100 — "peratusan" bermaksud "per 100". Jadi 20% = 20:100 = 20/100 = 0.2. Setiap peratusan boleh ditulis semula sebagai nisbah, pecahan, atau perpuluhan — empat cara menyatakan perkara sama.',
      ],
      formula: {
        eyebrow: "Peratusan = Nisbah daripada 100",
        formula: "20% = 20 : 100 = 20/100 = 0.2",
      },
      worked: {
        question:
          "Dalam kelas, nisbah pelajar perempuan kepada lelaki ialah 3:2. Cari peratusan pelajar perempuan.",
        steps: [
          {
            calc: "perempuan : lelaki = 3 : 2   →   perempuan : jumlah = 3 : 5",
            why: "Jumlah bahagian = 3+2 = 5, jadi perempuan dibanding dengan KESELURUHAN kelas, bukan lelaki sahaja.",
          },
          {
            calc: "3/5 = 3×20 / 5×20 = 60/100",
            why: "Skalakan pecahan supaya penyebut menjadi 100.",
          },
          { calc: "Peratusan perempuan = 60%", why: "Pecahan per 100 IALAH peratusan." },
        ],
      },
      guided: {
        question:
          "Zakaria simpan 30% wang saku hariannya. Cari nisbah simpanannya kepada jumlah wang saku.",
        answer: "30% = 30/100 = 30:100. Permudahkan (FSTB=10): 3:10.",
      },
      mistake: {
        wrong:
          'Menulis nisbah 3:2 (perempuan:lelaki) sebagai "3% perempuan" tanpa cari perempuan-kepada-JUMLAH dahulu.',
        right:
          "Peratusan daripada KESELURUHAN perlukan perempuan : JUMLAH (3:5), bukan perempuan : lelaki (3:2).",
      },
      practice: {
        easy: {
          question: "35% cakera keras diisi data. Cari nisbah kapasiti diisi kepada tidak diisi.",
          answer: "Diisi = 35%, tidak diisi = 65%. Nisbah = 35:65 = 7:13.",
        },
        medium: {
          question: "Kotak ada 8 reben, 2 biru. Berapa peratus reben biru?",
          answer: "2/8 = x/100. Darab silang: 8x=200, x=25%.",
        },
        hard: {
          question:
            'Kemeja asal RM85 menunjukkan "potongan harga 45%". Harga imbasan ialah RM57.80. Adakah ia sepadan? Jelaskan.',
          answer:
            "45% potongan RM85 → harga = 55% × 85 = RM46.75. Tetapi imbasan tunjuk RM57.80 — tidak sepadan, jadi potongan dipaparkan adalah salah.",
        },
      },
      realLife: ["🏷️ Diskaun jualan", "🧪 Label komposisi baja"],
    },
  ],
  summary: {
    center: "Nisbah, Kadar, Kadaran",
    branches: [
      { title: "Nisbah", points: ["Unit sama, permudah melalui FSTB"] },
      { title: "Kadar & Kadaran", points: ["Unit berbeza; selesai melalui darab silang"] },
      { title: "Peratusan", points: ["Nisbah daripada 100"] },
    ],
  },
  formulaSheet: [
    { formula: "Permudah nisbah: ÷ FSTB", label: "Kaedah sama Bab 2" },
    { formula: "a/b = c/d ⟹ ad = bc", label: "Pendaraban silang" },
    { formula: "x% = x/100", label: "Peratusan sebagai nisbah" },
    { formula: "Gandingkan nisbah: sepadan melalui GSTK", label: "p:q:r" },
  ],
  quickRevision: [
    "Saya boleh mewakilkan dan memudahkan nisbah dua atau tiga kuantiti.",
    "Saya boleh menentukan dan menukar kadar.",
    "Saya boleh menyelesaikan kadaran menggunakan pendaraban silang.",
    "Saya boleh menggabungkan dua nisbah kepada nisbah tiga kuantiti.",
    "Saya boleh mengaitkan nisbah/kadar/kadaran dengan peratusan, pecahan dan perpuluhan.",
  ],
  examTips: [
    "Sentiasa samakan unit SEBELUM memudahkan nisbah.",
    "Sediakan kadaran dengan jenis kuantiti sepadan di atas dan bawah pada kedua-dua belah.",
    "Peratusan daripada KESELURUHAN sentiasa guna bahagian:JUMLAH, bukan bahagian:bahagian-lain.",
  ],
  challenge: {
    question:
      "Beg baja 30 kg berlabel 15-20-10, bermaksud 15% nitrogen, 20% fosforus, 10% kalium mengikut jisim. (a) Cari nisbah N:P:K. (b) Kira jisim setiap satu dalam kg.",
    answer: "(a) 15:20:10 = 3:4:2. (b) N=15%×30=4.5kg, P=20%×30=6kg, K=10%×30=3kg.",
  },
};

export const mathF1C4InteractiveContent: { en: MathF1C4Content; bm: MathF1C4Content } = { en, bm };

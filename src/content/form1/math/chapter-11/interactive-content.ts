// Form 1 Mathematics, Chapter 11 — Introduction of Set / Pengenalan Set
// Interactive bilingual content, ported from
// design-reference/math1-chapter11-introduction-set-notes-v4.html
// (subset/complement/Venn examples spot-verified against the mockup).
// Content only — no presentation markup (rendered by MathF1Chapter11NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

/** Discriminated union covering every Venn/set diagram variant used across Chapter 11's questions. */
export type MathC11Diagram =
  | { kind: "elements"; setName: string; elements: string; countLabel: string }
  | {
      kind: "membershipCheck";
      setName: string;
      elements: string;
      checkedElement: string;
      isIn: boolean;
    }
  | { kind: "emptySet" }
  | { kind: "complement"; pElements: string; complementElements: string }
  | { kind: "missingElement"; setElements: string; missingElement: string }
  | {
      kind: "overlap";
      aOnlyEl: string;
      bothEl: string;
      bOnlyEl: string;
      aLabel: string;
      bLabel: string;
    }
  | { kind: "eventDots"; items: string[] }
  | { kind: "tripleVenn" };

export interface MathC11PracticeItem {
  question: string;
  answer: string;
  diagram?: MathC11Diagram;
}

export interface MathC11SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 11.2 only — the ξ/A/B subset illustration opening the lesson intro. */
  introDiagram?: { kind: "vennSubset"; caption: string };
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; diagram?: MathC11Diagram; steps: WorkedStep[] };
  guided: { question: string; diagram?: MathC11Diagram; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, MathC11PracticeItem>;
  realLife: string[];
}

export interface MathF1C11Content {
  subtopics: MathC11SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; diagram?: MathC11Diagram; answer: string };
}

const en: MathF1C11Content = {
  subtopics: [
    {
      num: "11.1",
      title: "Set",
      ideaParagraphs: [
        "Objects with a common characteristic can be grouped into a set. Each object inside is an element. A set can be written three ways: by description (a sentence), by listing ({red, white, blue, yellow}), or by set builder notation ({x : x is a colour of Jalur Gemilang}).",
        'Symbol ∈ means "is an element of"; ∉ means "is not an element of". n(A) counts the number of elements in set A. Sets with EXACTLY the same elements are equal sets.',
      ],
      formula: {
        eyebrow: "Three Ways to Write a Set",
        formula: "A = {red, white, blue, yellow}",
        legend: [{ label: "Set builder", text: ": A = {x : x is a colour of Jalur Gemilang}" }],
      },
      worked: {
        question: "Given P = {letters in the word 'WAWASAN'}, find n(P).",
        diagram: { kind: "elements", setName: "P", elements: "W, A, S, N", countLabel: "n(P) = 4" },
        steps: [
          {
            calc: "P = {W, A, S, N}",
            why: 'List each distinct letter in "WAWASAN" once only — repeated letters (W, A appear twice) count once.',
          },
          { calc: "n(P) = 4", why: "Count the distinct elements listed." },
        ],
      },
      guided: {
        question:
          "Given P = {x : x is a prime number and 0 < x < 20}, list P. Is 8 an element of P?",
        diagram: {
          kind: "membershipCheck",
          setName: "P",
          elements: "2,3,5,7,11,13,17,19",
          checkedElement: "8",
          isIn: false,
        },
        answer: "P = {2, 3, 5, 7, 11, 13, 17, 19}. 8 is not prime, so 8 ∉ P.",
      },
      mistake: {
        wrong:
          'Repeating a letter that appears twice in a word, e.g. writing {M,A,L,A,Y,S,I,A} for "MALAYSIA".',
        right:
          "Each element is listed ONCE only, even if it repeats in the original word: {M,A,L,Y,S,I}.",
      },
      practice: {
        easy: {
          question: "Given A = {states in Malaysia}, is Langkawi ∈ A or ∉ A?",
          diagram: {
            kind: "membershipCheck",
            setName: "A (states)",
            elements: "Johor, Selangor…",
            checkedElement: "Langkawi",
            isIn: false,
          },
          answer: "∉ A — Langkawi is an island, not a state (it's part of Kedah).",
        },
        medium: {
          question: "Find n(D) where D = {multiples of 11 which are less than 100}.",
          diagram: {
            kind: "elements",
            setName: "D",
            elements: "11,22,33…88,99",
            countLabel: "n(D) = 9",
          },
          answer: "D = {11,22,33,44,55,66,77,88,99}. n(D) = 9.",
        },
        hard: {
          question:
            "If R = {odd numbers which are divisible by 2}, is R = ∅ (an empty set)? Explain.",
          diagram: { kind: "emptySet" },
          answer:
            'Yes — no odd number can be evenly divisible by 2 (that\'s the definition of "odd"), so no element satisfies the condition. R = ∅.',
        },
      },
      realLife: ["♻️ Recycling classification", "🚗 Grouping by transport type"],
    },
    {
      num: "11.2",
      title: "Venn Diagrams, Universal Sets, Complement of a Set and Subsets",
      ideaParagraphs: [
        "The universal set (ξ) contains everything under discussion — drawn as a rectangle. A set inside it is a circle. Everything in ξ but NOT in that circle is the set's complement (A′). If EVERY element of set B is also in set A, then B is a subset of A, written B ⊂ A — drawn as a smaller circle inside the bigger one.",
      ],
      introDiagram: {
        kind: "vennSubset",
        caption:
          "B = {5,10} sits fully inside A = {1,2,5,10} — that's what makes B a subset of A. 7 sits outside both, in ξ only.",
      },
      formula: {
        eyebrow: "Number of Subsets",
        formula: "Subsets of a set with n elements = 2ⁿ",
        legend: [
          { label: "", text: "The empty set ∅ and the set itself are ALWAYS subsets of any set." },
        ],
      },
      worked: {
        question: "List all possible subsets of {a, b, c}.",
        diagram: {
          kind: "elements",
          setName: "{a,b,c}",
          elements: "e.g. subset {a,b}",
          countLabel: "2³ = 8 subsets",
        },
        steps: [
          {
            calc: "∅ (the empty set)",
            why: "The empty set is always a subset of any set — start every subset list here.",
          },
          { calc: "{a}, {b}, {c}", why: "All single-element subsets." },
          { calc: "{a,b}, {a,c}, {b,c}", why: "All two-element (pair) subsets." },
          {
            calc: "{a,b,c}",
            why: "The full set is always a subset of itself. Total: 8 subsets = 2³ ✓",
          },
        ],
      },
      guided: {
        question:
          "ξ = {x : 1 ≤ x ≤ 10, x is an integer}, P = {perfect squares less than 10}. Find P′.",
        diagram: { kind: "complement", pElements: "1, 4, 9", complementElements: "2,3,5,6,7,8,10" },
        answer: "ξ={1..10}. P={1,4,9}. Everything in ξ NOT in P: P′={2,3,5,6,7,8,10}.",
      },
      mistake: {
        wrong: "Forgetting the empty set ∅ when listing all subsets of a set.",
        right:
          "∅ is ALWAYS a subset of every set — a set with n elements has exactly 2ⁿ subsets, including ∅ and the full set.",
      },
      practice: {
        easy: {
          question: "Is {1,3,5,7,9} the universal set of {2,3,5,7}?",
          diagram: { kind: "missingElement", setElements: "1,3,5,7,9", missingElement: "2" },
          answer: "No — it doesn't contain the element 2.",
        },
        medium: {
          question: "A = {prime numbers less than 20}, B = {odd numbers less than 20}. Is A ⊂ B?",
          diagram: {
            kind: "overlap",
            aOnlyEl: "2",
            bothEl: "3,5,7,11,13,17,19",
            bOnlyEl: "9,15",
            aLabel: "A (prime)",
            bLabel: "B (odd)",
          },
          answer: "No — 2 is prime but not odd, so 2 ∈ A but 2 ∉ B. A ⊄ B.",
        },
        hard: {
          question:
            "On day 1 of athletics, three events {100m, 200m, 400m} are held. How many possible combinations of events can a student join (including joining none)?",
          diagram: { kind: "eventDots", items: ["100m", "200m", "400m"] },
          answer:
            "Each combination is a subset of the 3-element event set. Number of subsets = 2³ = 8.",
        },
      },
      realLife: ["🏫 Club membership overlap", "📊 Survey data classification"],
    },
  ],
  summary: {
    center: "Introduction of Set",
    branches: [
      { title: "Set Basics", points: ["Description, listing, set builder"] },
      { title: "Universal Set & Complement", points: ["ξ = everything; A′ = ξ minus A"] },
      { title: "Subsets", points: ["Every element of B in A; 2ⁿ subsets total"] },
    ],
  },
  formulaSheet: [
    { formula: "∈ / ∉", label: "is an element of / is not" },
    { formula: "n(A)", label: "number of elements" },
    { formula: "A′ = ξ − A", label: "complement of A" },
    { formula: "2ⁿ", label: "number of subsets (n elements)" },
  ],
  quickRevision: [
    "I can describe sets using description, listing and set builder notation.",
    "I can identify universal sets, complements and subsets.",
    "I can represent sets, complements and subsets using Venn diagrams.",
  ],
  examTips: [
    "Always check the universal set contains EVERY element mentioned before assuming it's correct.",
    "When listing subsets, work systematically: empty set → single elements → pairs → triples → the full set, so none get missed.",
  ],
  challenge: {
    question:
      "ξ = {x : x ≤ 10, x is a positive integer}, A = {factors of 10}, B = {numbers divisible by 5}. Draw a Venn diagram showing ξ, A and B together.",
    diagram: { kind: "tripleVenn" },
    answer:
      "A={1,2,5,10}, B={5,10}. Since B⊂A, draw B as a smaller circle fully inside A's circle, both inside the ξ rectangle, with 5 and 10 in B, and 1,2 in A but outside B.",
  },
};

const bm: MathF1C11Content = {
  subtopics: [
    {
      num: "11.1",
      title: "Set",
      ideaParagraphs: [
        "Objek dengan ciri sepunya boleh dikumpulkan kepada set. Setiap objek di dalamnya ialah unsur. Set boleh ditulis tiga cara: melalui perihalan (ayat), melalui penyenaraian ({merah, putih, biru, kuning}), atau melalui tatatanda pembina set ({x : x ialah warna Jalur Gemilang}).",
        'Simbol ∈ bermaksud "ialah unsur bagi"; ∉ bermaksud "bukan unsur bagi". n(A) mengira bilangan unsur dalam set A. Set dengan unsur yang SAMA TEPAT ialah set sama.',
      ],
      formula: {
        eyebrow: "Tiga Cara Menulis Set",
        formula: "A = {red, white, blue, yellow}",
        legend: [{ label: "Pembina set", text: ": A = {x : x ialah warna Jalur Gemilang}" }],
      },
      worked: {
        question: "Diberi P = {huruf dalam perkataan 'WAWASAN'}, cari n(P).",
        diagram: { kind: "elements", setName: "P", elements: "W, A, S, N", countLabel: "n(P) = 4" },
        steps: [
          {
            calc: "P = {W, A, S, N}",
            why: 'Senaraikan setiap huruf berbeza dalam "WAWASAN" sekali sahaja — huruf berulang (W, A muncul dua kali) dikira sekali.',
          },
          { calc: "n(P) = 4", why: "Kira unsur berbeza yang disenaraikan." },
        ],
      },
      guided: {
        question:
          "Diberi P = {x : x nombor perdana dan 0 < x < 20}, senaraikan P. Adakah 8 unsur bagi P?",
        diagram: {
          kind: "membershipCheck",
          setName: "P",
          elements: "2,3,5,7,11,13,17,19",
          checkedElement: "8",
          isIn: false,
        },
        answer: "P = {2, 3, 5, 7, 11, 13, 17, 19}. 8 bukan perdana, jadi 8 ∉ P.",
      },
      mistake: {
        wrong:
          'Mengulang huruf yang muncul dua kali dalam perkataan, cth. tulis {M,A,L,A,Y,S,I,A} bagi "MALAYSIA".',
        right:
          "Setiap unsur disenaraikan SEKALI sahaja, walaupun ia berulang dalam perkataan asal: {M,A,L,Y,S,I}.",
      },
      practice: {
        easy: {
          question: "Diberi A = {negeri di Malaysia}, adakah Langkawi ∈ A atau ∉ A?",
          diagram: {
            kind: "membershipCheck",
            setName: "A (negeri)",
            elements: "Johor, Selangor…",
            checkedElement: "Langkawi",
            isIn: false,
          },
          answer: "∉ A — Langkawi ialah pulau, bukan negeri (ia sebahagian Kedah).",
        },
        medium: {
          question: "Cari n(D) dengan D = {gandaan 11 kurang daripada 100}.",
          diagram: {
            kind: "elements",
            setName: "D",
            elements: "11,22,33…88,99",
            countLabel: "n(D) = 9",
          },
          answer: "D = {11,22,33,44,55,66,77,88,99}. n(D) = 9.",
        },
        hard: {
          question:
            "Jika R = {nombor ganjil yang boleh dibahagi 2}, adakah R = ∅ (set kosong)? Jelaskan.",
          diagram: { kind: "emptySet" },
          answer:
            'Ya — tiada nombor ganjil boleh dibahagi sama rata dengan 2 (itulah definisi "ganjil"), jadi tiada unsur memenuhi syarat. R = ∅.',
        },
      },
      realLife: ["♻️ Klasifikasi kitar semula", "🚗 Mengumpulkan mengikut jenis pengangkutan"],
    },
    {
      num: "11.2",
      title: "Gambar Rajah Venn, Set Semesta, Pelengkap Set dan Subset",
      ideaParagraphs: [
        "Set semesta (ξ) mengandungi segala yang dibincangkan — dilukis sebagai segi empat tepat. Set di dalamnya ialah bulatan. Segala dalam ξ tetapi BUKAN dalam bulatan itu ialah pelengkap set itu (A′). Jika SETIAP unsur set B juga dalam set A, maka B ialah subset bagi A, ditulis B ⊂ A — dilukis sebagai bulatan lebih kecil dalam bulatan lebih besar.",
      ],
      introDiagram: {
        kind: "vennSubset",
        caption:
          "B = {5,10} terletak sepenuhnya dalam A = {1,2,5,10} — itulah yang menjadikan B subset bagi A. 7 terletak di luar kedua-dua, hanya dalam ξ.",
      },
      formula: {
        eyebrow: "Bilangan Subset",
        formula: "Bilangan subset bagi set dengan n unsur = 2ⁿ",
        legend: [
          {
            label: "",
            text: "Set kosong ∅ dan set itu sendiri SENTIASA subset bagi sebarang set.",
          },
        ],
      },
      worked: {
        question: "Senaraikan semua subset mungkin bagi {a, b, c}.",
        diagram: {
          kind: "elements",
          setName: "{a,b,c}",
          elements: "cth. subset {a,b}",
          countLabel: "2³ = 8 subset",
        },
        steps: [
          {
            calc: "∅ (set kosong)",
            why: "Set kosong sentiasa subset bagi sebarang set — mula setiap senarai subset di sini.",
          },
          { calc: "{a}, {b}, {c}", why: "Semua subset unsur tunggal." },
          { calc: "{a,b}, {a,c}, {b,c}", why: "Semua subset dua unsur (pasangan)." },
          {
            calc: "{a,b,c}",
            why: "Set penuh sentiasa subset bagi dirinya sendiri. Jumlah: 8 subset = 2³ ✓",
          },
        ],
      },
      guided: {
        question:
          "ξ = {x : 1 ≤ x ≤ 10, x integer}, P = {kuasa dua sempurna kurang daripada 10}. Cari P′.",
        diagram: { kind: "complement", pElements: "1, 4, 9", complementElements: "2,3,5,6,7,8,10" },
        answer: "ξ={1..10}. P={1,4,9}. Segala dalam ξ BUKAN dalam P: P′={2,3,5,6,7,8,10}.",
      },
      mistake: {
        wrong: "Terlupa set kosong ∅ apabila menyenaraikan semua subset sesuatu set.",
        right:
          "∅ SENTIASA subset bagi setiap set — set dengan n unsur mempunyai tepat 2ⁿ subset, termasuk ∅ dan set penuh.",
      },
      practice: {
        easy: {
          question: "Adakah {1,3,5,7,9} set semesta bagi {2,3,5,7}?",
          diagram: { kind: "missingElement", setElements: "1,3,5,7,9", missingElement: "2" },
          answer: "Tidak — ia tidak mengandungi unsur 2.",
        },
        medium: {
          question: "A = {nombor perdana kurang 20}, B = {nombor ganjil kurang 20}. Adakah A ⊂ B?",
          diagram: {
            kind: "overlap",
            aOnlyEl: "2",
            bothEl: "3,5,7,11,13,17,19",
            bOnlyEl: "9,15",
            aLabel: "A (perdana)",
            bLabel: "B (ganjil)",
          },
          answer: "Tidak — 2 perdana tetapi bukan ganjil, jadi 2 ∈ A tetapi 2 ∉ B. A ⊄ B.",
        },
        hard: {
          question:
            "Hari 1 acara olahraga, tiga acara {100m, 200m, 400m} diadakan. Berapa kombinasi acara mungkin pelajar sertai (termasuk tidak sertai)?",
          diagram: { kind: "eventDots", items: ["100m", "200m", "400m"] },
          answer: "Setiap kombinasi ialah subset bagi set acara 3-unsur. Bilangan subset = 2³ = 8.",
        },
      },
      realLife: ["🏫 Pertindihan keahlian kelab", "📊 Klasifikasi data tinjauan"],
    },
  ],
  summary: {
    center: "Pengenalan Set",
    branches: [
      { title: "Asas Set", points: ["Perihalan, penyenaraian, pembina set"] },
      { title: "Set Semesta & Pelengkap", points: ["ξ = semua; A′ = ξ tolak A"] },
      { title: "Subset", points: ["Setiap unsur B dalam A; jumlah 2ⁿ subset"] },
    ],
  },
  formulaSheet: [
    { formula: "∈ / ∉", label: "unsur bagi / bukan" },
    { formula: "n(A)", label: "bilangan unsur" },
    { formula: "A′ = ξ − A", label: "pelengkap A" },
    { formula: "2ⁿ", label: "bilangan subset (n unsur)" },
  ],
  quickRevision: [
    "Saya boleh menerangkan set menggunakan perihalan, penyenaraian dan tatatanda pembina set.",
    "Saya boleh mengenal pasti set semesta, pelengkap dan subset.",
    "Saya boleh mewakilkan set, pelengkap dan subset menggunakan gambar rajah Venn.",
  ],
  examTips: [
    "Sentiasa semak set semesta mengandungi SETIAP unsur disebut sebelum anggap ia betul.",
    "Apabila menyenaraikan subset, buat secara sistematik: set kosong → unsur tunggal → pasangan → tiga → set penuh, supaya tiada tertinggal.",
  ],
  challenge: {
    question:
      "ξ = {x : x ≤ 10, x integer positif}, A = {faktor 10}, B = {nombor boleh bahagi 5}. Lukis gambar rajah Venn menunjukkan ξ, A dan B bersama.",
    diagram: { kind: "tripleVenn" },
    answer:
      "A={1,2,5,10}, B={5,10}. Oleh kerana B⊂A, lukis B sebagai bulatan lebih kecil sepenuhnya dalam bulatan A, kedua-duanya dalam segi empat tepat ξ, dengan 5 dan 10 dalam B, dan 1,2 dalam A tetapi di luar B.",
  },
};

export const mathF1C11InteractiveContent: { en: MathF1C11Content; bm: MathF1C11Content } = {
  en,
  bm,
};

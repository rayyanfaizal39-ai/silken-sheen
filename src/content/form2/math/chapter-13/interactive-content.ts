// Form 2 Mathematics, Chapter 13 — Simple Probability / Kebarangkalian
// Mudah. Four official subtopics: 13.1 Experimental Probability, 13.2
// Theoretical/Equally-Likely Outcomes, 13.3 Complement of an Event, 13.4
// Simple Probability (combined application questions, not new theory).
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter13-simple-probability-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter13NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C13Visual =
  | { kind: "probLine"; wontHappenLabel: string; fiftyFiftyLabel: string; willHappenLabel: string }
  | { kind: "diceGrid"; targetSum: number; caption: string };

export interface MathF2C13SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C13Visual;
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C13Content {
  subtopics: MathF2C13SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C13Content = {
  subtopics: [
    {
      num: "13.1",
      title: "Experimental Probability",
      ideaParagraphs: [
        "Every probability sits somewhere between 0 (won't happen) and 1 (will definitely happen). Experimental probability comes from actually doing the trials and counting: how often something happened, out of how many tries.",
      ],
      visual: {
        kind: "probLine",
        wontHappenLabel: "won't happen",
        fiftyFiftyLabel: "50/50 chance",
        willHappenLabel: "will happen",
      },
      formula: {
        eyebrow: "Experimental Probability",
        formula: "Experimental P = Frequency of Event ÷ Number of Trials",
        legend: [
          {
            label: "",
            text: "The MORE trials you run, the closer this gets to the true theoretical probability",
          },
        ],
      },
      worked: {
        question:
          "A coin is flipped 50 times. Heads appear 23 times. Find the experimental probability of heads.",
        steps: [
          {
            calc: "Experimental P(heads) = 23 ÷ 50",
            why: "Frequency of the event (23 heads) divided by the total number of trials (50 flips).",
          },
          { calc: "= 0.46", why: "Simplify — close to, but not exactly, the theoretical 0.5." },
        ],
      },
      guided: {
        question:
          "A dice is thrown 16 times. An even number appears 7 times. Write the experimental probability as a ratio.",
        answer: "7/16 — the frequency of even numbers out of the 16 trials.",
      },
      mistake: {
        wrong: "Assuming a small number of trials gives a reliable probability.",
        right:
          "With only a few trials, results bounce around a lot. Only with MANY trials does the experimental probability settle close to the true value.",
      },
      practice: {
        easy: {
          question:
            "A spinner is spun 20 times, landing on red 8 times. Find the experimental probability of red.",
          answer: "8/20 = 2/5",
        },
        medium: {
          question:
            "Out of 1200 coin flips, heads appeared 612 times. Is this close to the theoretical 0.5? Explain.",
          answer: "612/1200 = 0.51 — very close to 0.5, as expected with a large number of trials.",
        },
        hard: {
          question:
            "A basketball player makes 34 out of 50 free throws in practice. Based on this, estimate how many she'd make out of 200 attempts.",
          answer: "Experimental P = 34/50 = 0.68. Estimate = 0.68 × 200 = 136 successful throws.",
        },
      },
      realLife: ["🎲 Casino and game odds", "🌦️ Weather forecasting"],
    },
    {
      num: "13.2",
      title: "The Probability Theory Involving Equally Likely Outcomes",
      ideaParagraphs: [
        "When every outcome is equally likely (like each face of a fair dice), you don't need an experiment at all — just COUNT. Theoretical probability is the number of ways your event can happen, out of the total number of equally-likely outcomes.",
      ],
      visual: {
        kind: "diceGrid",
        targetSum: 5,
        caption:
          "All 36 equally-likely dice combinations — sum=5 (highlighted) appears 4 times, so P(sum=5)=4/36",
      },
      formula: {
        eyebrow: "Theoretical Probability",
        formula: "P(A) = n(A) ÷ n(S)",
        legend: [
          { label: "", text: "n(A) = ways the event can happen, n(S) = total possible outcomes" },
        ],
      },
      worked: {
        question: "Two fair dice are thrown together. Find the probability their sum equals 5.",
        steps: [
          {
            calc: "n(S) = 36",
            why: "Two dice, 6 faces each, gives 6×6=36 total equally-likely combinations.",
          },
          {
            calc: "Combos summing to 5: (1,4)(2,3)(3,2)(4,1) → n(A)=4",
            why: "Count every ordered pair of dice values that adds to exactly 5.",
          },
          {
            calc: "P(sum=5) = 4/36 = 1/9",
            why: "Divide the favourable count by the total, then simplify.",
          },
        ],
      },
      guided: {
        question:
          "A box has 25 green apples and 35 red apples. Find the probability of picking a green apple.",
        answer: "P(green) = 25/60 = 5/12.",
      },
      mistake: {
        wrong:
          "Dividing by the number of possible SUMS (like 2 through 12) instead of the total number of dice combinations.",
        right:
          "With two dice, n(S) is always 36 (6×6 combinations) — count how many of THOSE 36 give your target sum.",
      },
      practice: {
        easy: {
          question: "A fair dice is thrown once. Find P(getting number 4).",
          answer: "1/6",
        },
        medium: {
          question:
            "Pramjit gets RM5 pocket money every Tue, Wed, Thu. Find P(getting RM5) on a random day across 4 weeks.",
          answer: "n(A)=12 (3 days×4 weeks), n(S)=28. P=12/28=3/7.",
        },
        hard: {
          question: "Two fair dice are thrown. Find the probability their sum is greater than 9.",
          answer:
            "Sums >9: 10,10,10,11,11,12 (6 combos: (4,6)(5,5)(6,4)(5,6)(6,5)(6,6)). P=6/36=1/6.",
        },
      },
      realLife: ["🎯 Board game strategy", "🃏 Card game odds"],
    },
    {
      num: "13.3",
      title: "Complement of An Event Probability",
      ideaParagraphs: [
        'The complement of an event is simply "everything else that could happen instead." Since SOMETHING must happen, an event and its complement always add up to exactly 1.',
      ],
      formula: {
        eyebrow: "Complement Rule",
        formula: "P(A) + P(A') = 1",
        legend: [
          {
            label: "",
            text: "So P(A') = 1 − P(A) — no need to count the complement directly if you already know P(A)",
          },
        ],
      },
      worked: {
        question:
          "A number is chosen from 1 to 20. A is the event of choosing a prime number. Find P(A').",
        steps: [
          {
            calc: "Primes 1-20: {2,3,5,7,11,13,17,19} → n(A)=8",
            why: "List every prime number in the range.",
          },
          { calc: "P(A) = 8/20", why: "Divide by the total 20 numbers." },
          {
            calc: "P(A') = 1 − 8/20 = 12/20 = 3/5",
            why: "Use the complement rule instead of listing all 12 non-prime numbers separately.",
          },
        ],
      },
      guided: {
        question: "A box has red and blue pens. P(choosing blue) = 3/5. Find P(choosing red).",
        answer: "P(red) = 1 − 3/5 = 2/5.",
      },
      mistake: {
        wrong: "Recounting the complement's elements from scratch when P(A) is already known.",
        right:
          "If you already have P(A), just subtract from 1 — it's faster and avoids re-listing everything.",
      },
      practice: {
        easy: {
          question: "P(rain tomorrow) = 0.3. Find P(no rain tomorrow).",
          answer: "0.7",
        },
        medium: {
          question:
            "A container has 5 red, 8 sambal, 4 chocolate buns. A is getting a chocolate bun. Describe A' in words.",
          answer: "A' is getting a bun that is NOT chocolate (red or sambal).",
        },
        hard: {
          question:
            "10% of oranges from a box of 30 are rotten. C is a non-rotten orange event. Find P(C).",
          answer: "P(rotten)=0.1, so P(C)=1−0.1=0.9.",
        },
      },
      realLife: ["🎫 Lucky draws", "🌦️ Chance of rain vs no rain"],
    },
    {
      num: "13.4",
      title: "Simple Probability",
      ideaParagraphs: [
        "Real problems dress probability up in a story — a lucky draw, a shopping trip, a bus schedule. Strip the story away to find n(A) and n(S), and the rest is the same formula every time.",
      ],
      worked: {
        question:
          "A supermarket gives one lucky-draw entry per RM50 spent, distributing 30 entries a day for a week (210 total). Danial spends RM450. Find his probability of winning.",
        steps: [
          {
            calc: "Danial's entries: 450 ÷ 50 = 9",
            why: "One entry per RM50 spent — divide his total spend by 50.",
          },
          {
            calc: "n(A) = 9, n(S) = 210",
            why: "His entries are the favourable outcomes; all entries given out that week form the sample space.",
          },
          { calc: "P(winning) = 9/210 = 3/70", why: "Divide and simplify." },
        ],
      },
      guided: {
        question:
          "A bicycle shop has 35 bicycles and sold 15 in January. Find the probability that a randomly picked bicycle was sold in January.",
        answer: "P = 15/35 = 3/7.",
      },
      mistake: {
        wrong:
          "Getting lost in the story details before identifying what n(A) and n(S) actually are.",
        right:
          "Underline the total possible outcomes first (n(S)), then the favourable ones (n(A)) — everything else is just context.",
      },
      practice: {
        easy: {
          question:
            "A class has 20 students, 12 of whom play football. Find P(a randomly picked student plays football).",
          answer: "12/20 = 3/5",
        },
        medium: {
          question:
            "The Meteorological Department predicts rain every 3 days in a 30-day month. Find the probability of rain on a random day.",
          answer: "n(A)=30÷3=10 rain days. P=10/30=1/3.",
        },
        hard: {
          question:
            "Ali has RM73 to buy shoes: 3 pairs under RM50, 4 pairs RM50-70, 5 pairs at RM70+. If B is the event Ali buys a pair he can afford, express B' in words.",
          answer:
            "B' is Ali buying a pair he CANNOT afford with RM73 — the pairs priced at RM70 or more that would still leave him short after other costs, or simply outside his choice set.",
        },
      },
      realLife: ["🏪 Retail promotions", "📊 Risk assessment"],
    },
  ],
  summary: {
    center: "Simple Probability",
    branches: [
      { title: "Experimental", points: ["From actual trials"] },
      { title: "Theoretical", points: ["n(A)/n(S)"] },
      { title: "Complement", points: ["P(A)+P(A')=1"] },
    ],
  },
  formulaSheet: [
    { formula: "Experimental P = Frequency ÷ Trials", label: "" },
    { formula: "P(A) = n(A)/n(S)", label: "" },
    { formula: "P(A') = 1 − P(A)", label: "" },
  ],
  quickRevision: [
    "I can calculate experimental probability from trial data.",
    "I can calculate theoretical probability of equally likely outcomes.",
    "I can find the probability of a complement, and solve real-world problems.",
  ],
  examTips: [
    "With two dice, always remember n(S)=36 — list out the winning combinations carefully rather than guessing.",
    "Already know P(A)? Get P(A') in one step: 1 − P(A).",
  ],
  challenge: {
    question:
      "A bag has 4 red, 3 blue, and 5 green marbles. One marble is drawn at random. Find (a) P(red), (b) P(NOT green) using the complement rule.",
    answer: "Total=12. (a) P(red)=4/12=1/3. (b) P(green)=5/12, so P(not green)=1−5/12=7/12.",
  },
};

const bm: MathF2C13Content = {
  subtopics: [
    {
      num: "13.1",
      title: "Kebarangkalian Eksperimen",
      ideaParagraphs: [
        "Setiap kebarangkalian terletak antara 0 (tidak akan berlaku) dan 1 (pasti akan berlaku). Kebarangkalian eksperimen datang daripada sebenarnya buat percubaan dan mengira: berapa kerap sesuatu berlaku, daripada berapa kali cubaan.",
      ],
      visual: {
        kind: "probLine",
        wontHappenLabel: "mustahil",
        fiftyFiftyLabel: "sama mungkin",
        willHappenLabel: "pasti",
      },
      formula: {
        eyebrow: "Kebarangkalian Eksperimen",
        formula: "P Eksperimen = Kekerapan Peristiwa ÷ Bilangan Percubaan",
        legend: [
          {
            label: "",
            text: "SEMAKIN BANYAK percubaan anda jalankan, semakin dekat ini kepada kebarangkalian teori sebenar",
          },
        ],
      },
      worked: {
        question:
          "Syiling dibaling 50 kali. Kepala muncul 23 kali. Cari kebarangkalian eksperimen kepala.",
        steps: [
          {
            calc: "P Eksperimen(kepala) = 23 ÷ 50",
            why: "Kekerapan peristiwa (23 kepala) dibahagi jumlah percubaan (50 balingan).",
          },
          { calc: "= 0.46", why: "Permudahkan — dekat dengan, tetapi bukan tepat, teori 0.5." },
        ],
      },
      guided: {
        question:
          "Dadu dibaling 16 kali. Nombor genap muncul 7 kali. Tulis kebarangkalian eksperimen sebagai nisbah.",
        answer: "7/16 — kekerapan nombor genap daripada 16 percubaan.",
      },
      mistake: {
        wrong: "Menganggap bilangan kecil percubaan beri kebarangkalian boleh dipercayai.",
        right:
          "Dengan hanya beberapa percubaan, keputusan melantun banyak. Hanya dengan BANYAK percubaan kebarangkalian eksperimen mendekati nilai sebenar.",
      },
      practice: {
        easy: {
          question:
            "Pemintal diputar 20 kali, mendarat merah 8 kali. Cari kebarangkalian eksperimen merah.",
          answer: "8/20 = 2/5",
        },
        medium: {
          question:
            "Daripada 1200 balingan syiling, kepala muncul 612 kali. Adakah ini dekat dengan teori 0.5? Jelaskan.",
          answer:
            "612/1200 = 0.51 — sangat dekat dengan 0.5, seperti dijangka dengan bilangan besar percubaan.",
        },
        hard: {
          question:
            "Pemain bola keranjang jaringkan 34 daripada 50 lontaran percuma latihan. Berdasarkan ini, anggarkan berapa dia akan jaringkan daripada 200 percubaan.",
          answer: "P eksperimen = 34/50 = 0.68. Anggaran = 0.68 × 200 = 136 lontaran berjaya.",
        },
      },
      realLife: ["🎲 Kebarangkalian kasino dan permainan", "🌦️ Ramalan cuaca"],
    },
    {
      num: "13.2",
      title: "Teori Kebarangkalian Melibatkan Kesudahan Sama Boleh Jadi",
      ideaParagraphs: [
        "Apabila setiap kesudahan sama mungkin (seperti setiap muka dadu adil), anda tidak perlukan eksperimen langsung — cuma KIRA. Kebarangkalian teori ialah bilangan cara peristiwa anda boleh berlaku, daripada jumlah kesudahan sama mungkin.",
      ],
      visual: {
        kind: "diceGrid",
        targetSum: 5,
        caption:
          "Kesemua 36 gabungan dadu sama mungkin — jumlah=5 (diserlahkan) muncul 4 kali, jadi P(jumlah=5)=4/36",
      },
      formula: {
        eyebrow: "Kebarangkalian Teori",
        formula: "P(A) = n(A) ÷ n(S)",
        legend: [
          {
            label: "",
            text: "n(A) = cara peristiwa boleh berlaku, n(S) = jumlah kesudahan mungkin",
          },
        ],
      },
      worked: {
        question: "Dua dadu adil dibaling bersama. Cari kebarangkalian jumlahnya bersamaan 5.",
        steps: [
          {
            calc: "n(S) = 36",
            why: "Dua dadu, 6 muka setiap satu, memberi 6×6=36 jumlah gabungan sama mungkin.",
          },
          {
            calc: "Gabungan berjumlah 5: (1,4)(2,3)(3,2)(4,1) → n(A)=4",
            why: "Kira setiap pasangan tertib nilai dadu yang jumlah tepat 5.",
          },
          {
            calc: "P(jumlah=5) = 4/36 = 1/9",
            why: "Bahagi kiraan memihak dengan jumlah, kemudian permudahkan.",
          },
        ],
      },
      guided: {
        question:
          "Kotak ada 25 epal hijau dan 35 epal merah. Cari kebarangkalian memilih epal hijau.",
        answer: "P(hijau) = 25/60 = 5/12.",
      },
      mistake: {
        wrong:
          "Bahagi dengan bilangan JUMLAH mungkin (seperti 2 hingga 12) bukan jumlah gabungan dadu.",
        right:
          "Dengan dua dadu, n(S) sentiasa 36 (gabungan 6×6) — kira berapa daripada 36 itu beri jumlah sasaran anda.",
      },
      practice: {
        easy: {
          question: "Dadu adil dibaling sekali. Cari P(dapat nombor 4).",
          answer: "1/6",
        },
        medium: {
          question:
            "Pramjit dapat RM5 wang saku setiap Sel, Rab, Kha. Cari P(dapat RM5) pada hari rawak sepanjang 4 minggu.",
          answer: "n(A)=12 (3 hari×4 minggu), n(S)=28. P=12/28=3/7.",
        },
        hard: {
          question: "Dua dadu adil dibaling. Cari kebarangkalian jumlahnya lebih daripada 9.",
          answer: "Jumlah >9: (4,6)(5,5)(6,4)(5,6)(6,5)(6,6) — 6 gabungan. P=6/36=1/6.",
        },
      },
      realLife: ["🎯 Strategi permainan papan", "🃏 Kebarangkalian permainan kad"],
    },
    {
      num: "13.3",
      title: "Kebarangkalian Pelengkap Peristiwa",
      ideaParagraphs: [
        'Pelengkap peristiwa hanyalah "segala-galanya lain yang boleh berlaku sebaliknya." Oleh kerana SESUATU mesti berlaku, peristiwa dan pelengkapnya sentiasa berjumlah tepat 1.',
      ],
      formula: {
        eyebrow: "Peraturan Pelengkap",
        formula: "P(A) + P(A') = 1",
        legend: [
          {
            label: "",
            text: "Jadi P(A') = 1 − P(A) — tidak perlu kira pelengkap terus jika anda sudah tahu P(A)",
          },
        ],
      },
      worked: {
        question:
          "Nombor dipilih dari 1 hingga 20. A ialah peristiwa memilih nombor perdana. Cari P(A').",
        steps: [
          {
            calc: "Perdana 1-20: {2,3,5,7,11,13,17,19} → n(A)=8",
            why: "Senaraikan setiap nombor perdana dalam julat.",
          },
          { calc: "P(A) = 8/20", why: "Bahagi dengan jumlah 20 nombor." },
          {
            calc: "P(A') = 1 − 8/20 = 12/20 = 3/5",
            why: "Guna peraturan pelengkap bukan senaraikan kesemua 12 nombor bukan perdana berasingan.",
          },
        ],
      },
      guided: {
        question: "Kotak ada pen merah dan biru. P(pilih biru) = 3/5. Cari P(pilih merah).",
        answer: "P(merah) = 1 − 3/5 = 2/5.",
      },
      mistake: {
        wrong: "Mengira semula unsur pelengkap dari awal apabila P(A) sudah diketahui.",
        right:
          "Jika anda sudah ada P(A), hanya tolak daripada 1 — lebih pantas dan elak menyenaraikan semula semuanya.",
      },
      practice: {
        easy: {
          question: "P(hujan esok) = 0.3. Cari P(tiada hujan esok).",
          answer: "0.7",
        },
        medium: {
          question:
            "Bekas ada 5 bun merah, 8 sambal, 4 coklat. A ialah dapat bun coklat. Terangkan A' dalam perkataan.",
          answer: "A' ialah dapat bun yang BUKAN coklat (merah atau sambal).",
        },
        hard: {
          question:
            "10% oren daripada kotak 30 reput. C ialah peristiwa oren tidak reput. Cari P(C).",
          answer: "P(reput)=0.1, jadi P(C)=1−0.1=0.9.",
        },
      },
      realLife: ["🎫 Cabutan bertuah", "🌦️ Peluang hujan lwn tiada hujan"],
    },
    {
      num: "13.4",
      title: "Kebarangkalian Mudah",
      ideaParagraphs: [
        "Masalah sebenar hiaskan kebarangkalian dalam cerita — cabutan bertuah, perjalanan membeli-belah, jadual bas. Buang cerita untuk cari n(A) dan n(S), dan selebihnya formula sama setiap kali.",
      ],
      worked: {
        question:
          "Pasar raya beri satu penyertaan cabutan bertuah setiap RM50 dibelanja, mengedar 30 penyertaan sehari selama seminggu (210 jumlah). Danial belanja RM450. Cari kebarangkalian dia menang.",
        steps: [
          {
            calc: "Penyertaan Danial: 450 ÷ 50 = 9",
            why: "Satu penyertaan setiap RM50 dibelanja — bahagi jumlah perbelanjaannya dengan 50.",
          },
          {
            calc: "n(A) = 9, n(S) = 210",
            why: "Penyertaannya ialah kesudahan memihak; semua penyertaan diberi minggu itu bentuk ruang sampel.",
          },
          { calc: "P(menang) = 9/210 = 3/70", why: "Bahagi dan permudahkan." },
        ],
      },
      guided: {
        question:
          "Kedai basikal ada 35 basikal dan jual 15 pada Januari. Cari kebarangkalian basikal dipilih rawak dijual pada Januari.",
        answer: "P = 15/35 = 3/7.",
      },
      mistake: {
        wrong: "Hilang dalam butiran cerita sebelum kenal pasti apa n(A) dan n(S) sebenarnya.",
        right:
          "Garis bawah jumlah kesudahan mungkin dahulu (n(S)), kemudian yang memihak (n(A)) — selainnya cuma konteks.",
      },
      practice: {
        easy: {
          question:
            "Kelas ada 20 pelajar, 12 bermain bola sepak. Cari P(pelajar dipilih rawak bermain bola sepak).",
          answer: "12/20 = 3/5",
        },
        medium: {
          question:
            "Jabatan Meteorologi ramal hujan setiap 3 hari dalam bulan 30 hari. Cari kebarangkalian hujan pada hari rawak.",
          answer: "n(A)=30÷3=10 hari hujan. P=10/30=1/3.",
        },
        hard: {
          question:
            "Ali ada RM73 untuk beli kasut: 3 pasang bawah RM50, 4 pasang RM50-70, 5 pasang RM70+. Jika B ialah peristiwa Ali beli pasangan mampu dibeli, nyatakan B' dalam perkataan.",
          answer:
            "B' ialah Ali beli pasangan yang TIDAK MAMPU dengan RM73 — pasangan berharga RM70 atau lebih.",
        },
      },
      realLife: ["🏪 Promosi runcit", "📊 Penilaian risiko"],
    },
  ],
  summary: {
    center: "Kebarangkalian Mudah",
    branches: [
      { title: "Eksperimen", points: ["Daripada percubaan sebenar"] },
      { title: "Teori", points: ["n(A)/n(S)"] },
      { title: "Pelengkap", points: ["P(A)+P(A')=1"] },
    ],
  },
  formulaSheet: [
    { formula: "P Eksperimen = Kekerapan ÷ Percubaan", label: "" },
    { formula: "P(A) = n(A)/n(S)", label: "" },
    { formula: "P(A') = 1 − P(A)", label: "" },
  ],
  quickRevision: [
    "Saya boleh kira kebarangkalian eksperimen daripada data percubaan.",
    "Saya boleh kira kebarangkalian teori kesudahan sama mungkin.",
    "Saya boleh cari kebarangkalian pelengkap, dan selesaikan masalah dunia sebenar.",
  ],
  examTips: [
    "Dengan dua dadu, sentiasa ingat n(S)=36 — senaraikan gabungan menang dengan teliti bukan meneka.",
    "Sudah tahu P(A)? Dapatkan P(A') dalam satu langkah: 1 − P(A).",
  ],
  challenge: {
    question:
      "Beg ada 4 guli merah, 3 biru, dan 5 hijau. Satu guli diambil rawak. Cari (a) P(merah), (b) P(BUKAN hijau) guna peraturan pelengkap.",
    answer: "Jumlah=12. (a) P(merah)=4/12=1/3. (b) P(hijau)=5/12, jadi P(bukan hijau)=1−5/12=7/12.",
  },
};

export const mathF2C13InteractiveContent: { en: MathF2C13Content; bm: MathF2C13Content } = {
  en,
  bm,
};

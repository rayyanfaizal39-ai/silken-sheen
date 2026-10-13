/** A playful learning-style snapshot, never an academic or psychological diagnosis. */
export type NovaArchetype = "explorer" | "strategist" | "challenger" | "creator";

export type LearningIdentityResult = {
  archetype: NovaArchetype;
  awardedAt: string;
  quizVersion: 1;
};

export type IdentityQuestion = {
  prompt: string;
  options: ReadonlyArray<{ text: string; type: NovaArchetype }>;
};

export const IDENTITY_TYPES: Record<NovaArchetype, {
  title: string; tagline: string; description: string; glow: string;
}> = {
  explorer: {
    title: "Explorer", tagline: "Si Peneroka",
    description: "Kamu suka meneroka idea baharu dan belajar melalui pengalaman.",
    glow: "#38bdf8",
  },
  strategist: {
    title: "Strategist", tagline: "Si Perancang",
    description: "Kamu gemar menyusun strategi dan memahami sesuatu langkah demi langkah.",
    glow: "#a78bfa",
  },
  challenger: {
    title: "Challenger", tagline: "Si Pencabar",
    description: "Kamu bersemangat menghadapi cabaran dan terus mencuba hingga berjaya.",
    glow: "#fbbf24",
  },
  creator: {
    title: "Creator", tagline: "Si Pencipta",
    description: "Kamu melihat kemungkinan baharu dan suka menghasilkan idea sendiri.",
    glow: "#fb7185",
  },
};

/** Every option is a positive preference. No 'correct' answers or negative labels. */
export const IDENTITY_QUESTIONS: ReadonlyArray<IdentityQuestion> = [
  {
    prompt: "Bila kamu diberi tugasan baharu, apa yang kamu buat dahulu?",
    options: [
      { text: "Cuba pendekatan yang belum pernah dibuat.", type: "explorer" },
      { text: "Susun langkah supaya tugasan lebih teratur.", type: "strategist" },
      { text: "Tetapkan sasaran yang ingin dicapai.", type: "challenger" },
      { text: "Bayangkan cara yang unik untuk menyiapkannya.", type: "creator" },
    ],
  },
  {
    prompt: "Aktiviti manakah paling seronok untuk kamu?",
    options: [
      { text: "Mencipta sesuatu daripada idea sendiri.", type: "creator" },
      { text: "Menyelesaikan teka-teki yang mencabar.", type: "challenger" },
      { text: "Melawat tempat atau belajar topik baharu.", type: "explorer" },
      { text: "Menyusun strategi permainan bersama rakan.", type: "strategist" },
    ],
  },
  {
    prompt: "Apabila belajar topik yang susah, kamu lebih suka...",
    options: [
      { text: "Bahagikan topik kepada bahagian kecil.", type: "strategist" },
      { text: "Cabarkan diri sehingga dapat menjawab.", type: "challenger" },
      { text: "Lukis atau cipta cara sendiri untuk faham.", type: "creator" },
      { text: "Cuba pelbagai contoh dan lihat apa berlaku.", type: "explorer" },
    ],
  },
  {
    prompt: "Dalam kumpulan, peranan yang kamu paling suka ialah...",
    options: [
      { text: "Mencadangkan idea yang kreatif.", type: "creator" },
      { text: "Membantu kumpulan mencapai matlamat.", type: "challenger" },
      { text: "Meneroka maklumat dan mencari inspirasi.", type: "explorer" },
      { text: "Membuat pelan supaya semua orang jelas.", type: "strategist" },
    ],
  },
  {
    prompt: "Jika kamu ada satu hari bebas, kamu mahu...",
    options: [
      { text: "Membina, menulis atau mereka sesuatu.", type: "creator" },
      { text: "Mencuba aktiviti atau tempat yang belum dikenali.", type: "explorer" },
      { text: "Menguasai kemahiran yang sukar.", type: "challenger" },
      { text: "Merancang projek impian dari awal hingga akhir.", type: "strategist" },
    ],
  },
  {
    prompt: "Perkara yang paling membuat kamu bangga ialah...",
    options: [
      { text: "Berjaya menghasilkan sesuatu yang asli.", type: "creator" },
      { text: "Mencapai sasaran selepas berusaha keras.", type: "challenger" },
      { text: "Menemui sesuatu yang tidak diketahui sebelum ini.", type: "explorer" },
      { text: "Melihat rancangan sendiri berjalan lancar.", type: "strategist" },
    ],
  },
  {
    prompt: "Apabila rancangan berubah secara tiba-tiba, kamu...",
    options: [
      { text: "Cari jalan alternatif yang tersusun.", type: "strategist" },
      { text: "Anggapnya peluang untuk cuba benda baharu.", type: "explorer" },
      { text: "Jadikannya cabaran untuk diatasi.", type: "challenger" },
      { text: "Fikirkan penyelesaian di luar kebiasaan.", type: "creator" },
    ],
  },
  {
    prompt: "Kuasa istimewa untuk belajar yang kamu pilih ialah...",
    options: [
      { text: "Boleh merancang setiap langkah dengan bijak.", type: "strategist" },
      { text: "Boleh mencipta apa sahaja daripada imaginasi.", type: "creator" },
      { text: "Boleh terus berani menghadapi cabaran.", type: "challenger" },
      { text: "Boleh menemui dunia pengetahuan yang luas.", type: "explorer" },
    ],
  },
];

const ARCHETYPE_ORDER: readonly NovaArchetype[] = ["explorer", "strategist", "challenger", "creator"];

/** The answers are scored deterministically, so two devices give the same result. */
export function scoreLearningIdentity(answers: readonly NovaArchetype[]): NovaArchetype {
  if (answers.length !== IDENTITY_QUESTIONS.length || answers.some(a => !ARCHETYPE_ORDER.includes(a))) {
    throw new Error("Answer all Mengenal Diri questions before claiming an egg.");
  }
  const scores: Record<NovaArchetype, number> = {
    explorer: 0, strategist: 0, challenger: 0, creator: 0,
  };
  for (const answer of answers) scores[answer] += 1;
  // On a tie, the most recent matching preference wins; no one category is privileged.
  const maxScore = Math.max(...Object.values(scores));
  return [...answers].reverse().find(answer => scores[answer] === maxScore)!;
}

export function isLearningIdentityResult(value: unknown): value is LearningIdentityResult {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return ARCHETYPE_ORDER.includes(record.archetype as NovaArchetype) &&
    record.quizVersion === 1 && typeof record.awardedAt === "string" &&
    Number.isFinite(Date.parse(record.awardedAt));
}

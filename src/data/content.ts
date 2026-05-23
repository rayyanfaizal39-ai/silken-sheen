export type Form = "Form 1" | "Form 2" | "Form 3";

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  description: string;
}

export const subjects: Subject[] = [
  { id: "bm", name: "Bahasa Melayu", emoji: "📘", color: "from-rose-500 to-orange-500", description: "Tatabahasa, karangan, dan kefahaman." },
  { id: "english", name: "English", emoji: "🇬🇧", color: "from-sky-500 to-blue-600", description: "Grammar, comprehension, and writing." },
  { id: "math", name: "Mathematics", emoji: "📐", color: "from-indigo-500 to-purple-600", description: "Algebra, geometry, statistics, and more." },
  { id: "science", name: "Science", emoji: "🔬", color: "from-emerald-500 to-teal-600", description: "Biology, chemistry, and physics basics." },
  { id: "sejarah", name: "Sejarah", emoji: "🏛️", color: "from-amber-500 to-yellow-500", description: "Tamadun, kemerdekaan, dan warisan negara." },
  { id: "geography", name: "Geography", emoji: "🌏", color: "from-cyan-500 to-emerald-500", description: "Physical & human geography of the world." },
];

export const forms: Form[] = ["Form 1", "Form 2", "Form 3"];

export interface Note {
  id: string;
  subjectId: string;
  form: Form;
  chapter: string;
  title: string;
  summary: string;
  keywords: string[];
}

export const notes: Note[] = [
  { id: "n1", subjectId: "math", form: "Form 1", chapter: "Chapter 1", title: "Rational Numbers", summary: "Rational numbers include integers, fractions, and decimals that can be expressed as a/b where b ≠ 0. Operations follow standard rules of arithmetic.", keywords: ["integer", "fraction", "decimal"] },
  { id: "n2", subjectId: "math", form: "Form 2", chapter: "Chapter 3", title: "Algebraic Expressions", summary: "Algebraic expressions use variables to represent numbers. Combine like terms and apply distributive law to simplify.", keywords: ["variable", "like terms", "distributive"] },
  { id: "n3", subjectId: "science", form: "Form 1", chapter: "Chapter 2", title: "Cells & Living Things", summary: "All living organisms are made of cells. Animal cells lack cell walls and chloroplasts found in plant cells.", keywords: ["cell", "nucleus", "membrane"] },
  { id: "n4", subjectId: "science", form: "Form 3", chapter: "Chapter 5", title: "Electricity", summary: "Current flows from positive to negative terminals. Voltage = Current × Resistance (Ohm's Law).", keywords: ["current", "voltage", "Ohm's Law"] },
  { id: "n5", subjectId: "sejarah", form: "Form 2", chapter: "Bab 4", title: "Kesultanan Melayu Melaka", summary: "Diasaskan oleh Parameswara sekitar 1400. Menjadi pusat perdagangan dan penyebaran Islam di Nusantara.", keywords: ["Parameswara", "Melaka", "perdagangan"] },
  { id: "n6", subjectId: "geography", form: "Form 1", chapter: "Chapter 1", title: "Map Reading", summary: "Maps use scale, symbols, and grid references. Latitude lines run east-west; longitude lines run north-south.", keywords: ["scale", "latitude", "longitude"] },
  { id: "n7", subjectId: "english", form: "Form 2", chapter: "Unit 3", title: "Present Perfect Tense", summary: "Used for actions that started in the past and continue, or have relevance now. Form: have/has + past participle.", keywords: ["tense", "past participle", "have/has"] },
  { id: "n8", subjectId: "bm", form: "Form 3", chapter: "Bab 2", title: "Kata Adjektif", summary: "Kata adjektif menerangkan sifat, keadaan atau warna sesuatu kata nama. Contoh: cantik, tinggi, merah.", keywords: ["sifat", "kata nama", "penerangan"] },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: string;
  subjectId: string;
  form: Form;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export const quizzes: QuizQuestion[] = [
  { id: "q1", subjectId: "math", form: "Form 1", difficulty: "Easy", question: "What is 3/4 + 1/4?", options: ["1", "1/2", "3/8", "2"], answerIndex: 0, explanation: "Same denominator: 3/4 + 1/4 = 4/4 = 1." },
  { id: "q2", subjectId: "math", form: "Form 2", difficulty: "Medium", question: "Simplify: 2(x + 3) − x", options: ["x + 6", "3x + 3", "x + 3", "2x + 6"], answerIndex: 0, explanation: "2x + 6 − x = x + 6." },
  { id: "q3", subjectId: "science", form: "Form 1", difficulty: "Easy", question: "Which organelle controls cell activities?", options: ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"], answerIndex: 1 },
  { id: "q4", subjectId: "science", form: "Form 3", difficulty: "Hard", question: "If V = 12V and R = 4Ω, find I.", options: ["2 A", "3 A", "4 A", "48 A"], answerIndex: 1, explanation: "I = V/R = 12/4 = 3 A." },
  { id: "q5", subjectId: "sejarah", form: "Form 2", difficulty: "Medium", question: "Siapa pengasas Kesultanan Melayu Melaka?", options: ["Hang Tuah", "Parameswara", "Tun Perak", "Sultan Mansur"], answerIndex: 1 },
  { id: "q6", subjectId: "geography", form: "Form 1", difficulty: "Easy", question: "Garis lintang 0° dikenali sebagai?", options: ["Tropic of Cancer", "Equator", "Prime Meridian", "Arctic Circle"], answerIndex: 1 },
  { id: "q7", subjectId: "english", form: "Form 2", difficulty: "Medium", question: "Choose the correct sentence:", options: ["She have gone home.", "She has went home.", "She has gone home.", "She gone home."], answerIndex: 2 },
  { id: "q8", subjectId: "bm", form: "Form 3", difficulty: "Easy", question: "Yang manakah kata adjektif?", options: ["Berlari", "Cantik", "Buku", "Mereka"], answerIndex: 1 },
];

export interface Flashcard {
  id: string;
  subjectId: string;
  form: Form;
  front: string;
  back: string;
}

export const flashcards: Flashcard[] = [
  { id: "f1", subjectId: "math", form: "Form 1", front: "What is a prime number?", back: "A number greater than 1 with only two factors: 1 and itself." },
  { id: "f2", subjectId: "math", form: "Form 2", front: "Pythagoras' theorem?", back: "a² + b² = c² for a right-angled triangle." },
  { id: "f3", subjectId: "science", form: "Form 1", front: "Photosynthesis equation?", back: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (with sunlight)." },
  { id: "f4", subjectId: "science", form: "Form 3", front: "Ohm's Law?", back: "V = I × R" },
  { id: "f5", subjectId: "sejarah", form: "Form 2", front: "Tahun kemerdekaan Malaya?", back: "31 Ogos 1957." },
  { id: "f6", subjectId: "geography", form: "Form 1", front: "Garisan Khatulistiwa?", back: "Garisan lintang 0° yang membahagikan bumi kepada hemisfera utara dan selatan." },
  { id: "f7", subjectId: "english", form: "Form 2", front: "Past participle of 'go'?", back: "gone" },
  { id: "f8", subjectId: "bm", form: "Form 3", front: "Apakah kata hubung?", back: "Kata yang menghubungkan dua perkataan atau ayat. Contoh: dan, tetapi, atau." },
];

export const badges = [
  { id: "starter", name: "First Steps", emoji: "🚀", desc: "Complete your first quiz" },
  { id: "streak3", name: "On Fire", emoji: "🔥", desc: "3-day streak" },
  { id: "scholar", name: "Scholar", emoji: "🎓", desc: "Earn 500 XP" },
  { id: "master", name: "Quiz Master", emoji: "🏆", desc: "Score 100% on a Hard quiz" },
];

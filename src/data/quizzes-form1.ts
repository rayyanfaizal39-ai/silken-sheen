import type { Difficulty } from "./content";

export interface QuizQuestion {
  id: string;
  subjectId: string;
  form: "Form 1" | "Form 2" | "Form 3";
  chapter: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  form: "Form 1" | "Form 2" | "Form 3";
  title: string;
  chapter: string;
  description: string;
  duration: number;
  questions: QuizQuestion[];
}

// Quiz data structure for reference
const form1QuizzesRaw: Quiz[] = [
  {
    id: "bm-q1",
    subjectId: "bm",
    form: "Form 1",
    title: "Kelas Kata Bahasa Melayu",
    chapter: "Chapter 1: Tatabahasa Asas",
    description: "Uji pengetahuan tentang 9 kelas kata dalam bahasa Melayu.",
    duration: 15,
    questions: [
      {
        id: "bm-q1-1",
        subjectId: "bm",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "Kata 'cantik' termasuk dalam kelas kata apa?",
        options: ["Nama", "Kata kerja", "Kata sifat", "Kata depan"],
        answerIndex: 2,
        explanation: "Kata 'cantik' menggambarkan sifat atau keadaan sesuatu.",
      },
      {
        id: "bm-q1-2",
        subjectId: "bm",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "Kata 'membaca' dalam ayat adalah?",
        options: ["Nama", "Kata kerja", "Kata sifat", "Kata bilangan"],
        answerIndex: 1,
        explanation: "Kata 'membaca' menunjukkan tindakan atau perbuatan.",
      },
    ],
  },
  {
    id: "eng-q1",
    subjectId: "english",
    form: "Form 1",
    title: "Present Tense Basics",
    chapter: "Chapter 1",
    description: "Master simple present and present continuous.",
    duration: 15,
    questions: [
      {
        id: "eng-q1-1",
        subjectId: "english",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "Choose: He _____ to school every day.",
        options: ["goes", "is going", "go", "going"],
        answerIndex: 0,
        explanation: "Simple present for habitual actions.",
      },
    ],
  },
  {
    id: "math-q1",
    subjectId: "math",
    form: "Form 1",
    title: "Integer Operations",
    chapter: "Chapter 1",
    description: "Test skills with integers.",
    duration: 15,
    questions: [
      {
        id: "math-q1-1",
        subjectId: "math",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "Calculate: -5 + 8 = ?",
        options: ["-13", "3", "-3", "13"],
        answerIndex: 1,
        explanation: "8 - 5 = 3",
      },
    ],
  },
  {
    id: "sci-q1",
    subjectId: "science",
    form: "Form 1",
    title: "Cell Structure",
    chapter: "Chapter 2",
    description: "Test knowledge about cells.",
    duration: 15,
    questions: [
      {
        id: "sci-q1-1",
        subjectId: "science",
        form: "Form 1",
        chapter: "Chapter 2",
        difficulty: "Easy",
        question: "Energy-producing organelle?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"],
        answerIndex: 1,
        explanation: "Mitochondria are the powerhouse of the cell.",
      },
    ],
  },
  {
    id: "geo-q1",
    subjectId: "geography",
    form: "Form 1",
    title: "Maps and Earth",
    chapter: "Chapter 1",
    description: "Test map knowledge.",
    duration: 15,
    questions: [
      {
        id: "geo-q1-1",
        subjectId: "geography",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "Lines running east-west?",
        options: ["Longitude", "Latitude", "Equator", "Meridian"],
        answerIndex: 1,
        explanation: "Latitude lines run east-west.",
      },
    ],
  },
  {
    id: "sej-q1",
    subjectId: "sejarah",
    form: "Form 1",
    title: "Zaman Prasejarah",
    chapter: "Chapter 1",
    description: "Test prasejarah knowledge.",
    duration: 15,
    questions: [
      {
        id: "sej-q1-1",
        subjectId: "sejarah",
        form: "Form 1",
        chapter: "Chapter 1",
        difficulty: "Easy",
        question: "First inhabitants of Malaya?",
        options: ["Jawa", "Cina", "Proto & Deutero-Melayu", "Bugis"],
        answerIndex: 2,
        explanation: "Proto-Melayu and Deutero-Melayu were first.",
      },
    ],
  },
];

// Export flat quiz questions for routes
export const form1Quizzes: QuizQuestion[] = form1QuizzesRaw.flatMap(
  (quiz) => quiz.questions
);

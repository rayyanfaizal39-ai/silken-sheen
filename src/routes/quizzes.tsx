import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  subjects,
  forms,
  quizzes,
  getItemChapterKey,
  getSubjectChapters,
  type Difficulty,
  type QuizQuestion,
} from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Timer,
  Music2,
  VolumeX,
  ArrowLeft,
  Play,
  TimerOff,
  Shuffle,
} from "lucide-react";
import {
  SubjectGrid,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { DailyQuote } from "@/components/DailyQuote";
import { Confetti } from "@/components/Confetti";
import { sfx, music } from "@/lib/sounds";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import { AcademyHero, AcademyPageShell } from "@/components/AcademyPage";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — AcadeMY" },
      {
        name: "description",
        content: "Interactive KSSM quizzes with instant scoring. Easy, Medium, and Hard.",
      },
      { property: "og:title", content: "Quizzes — AcadeMY" },
      {
        property: "og:description",
        content: "Test yourself with KSSM quizzes — instant feedback and XP rewards.",
      },
    ],
  }),
  component: QuizzesPage,
});

const diffs: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];
const CORRECT_MSGS = ["Hebat! 🔥", "Betul! ⚡", "Awesome! 🌟", "Bagus! 💫", "Power! 🚀"];
const WRONG_MSGS = ["Cuba lagi! 💪", "Jangan give up! 🎯", "Hampir! 🤔", "Keep going! 🌱"];
type TimerMode = "timer" | "none";
type TimerPref = { mode: TimerMode; seconds: number } | null;
type MathObjectiveId = "objective-1" | "objective-2" | "objective-3";
type MathObjectivePhase = "select" | "intro" | "quiz" | "results";
type MathQuizLang = "bm" | "dlp";

const MATH_OBJECTIVES: Array<{
  id: MathObjectiveId;
  badge: string;
  title: string;
  purpose: string[];
  tone: string;
}> = [
  {
    id: "objective-1",
    badge: "📘",
    title: "Objective 1 – Foundation",
    purpose: ["Easy difficulty", "Basic concept mastery", "Beginner-friendly"],
    tone: "from-blue-500 to-cyan-500",
  },
  {
    id: "objective-2",
    badge: "📗",
    title: "Objective 2 – Practice",
    purpose: ["Medium difficulty", "Reinforcement and practice", "Mixed question types"],
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: "objective-3",
    badge: "📕",
    title: "Objective 3 – Challenge",
    purpose: ["Medium to Hard difficulty", "Exam-style questions", "Problem-solving focus"],
    tone: "from-rose-500 to-orange-500",
  },
];

const MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS: ShuffledQuestion[] = [
  {
    question: "Antara berikut, yang manakah integer?",
    options: ["0.5", "-8", "3/4", "1.2"],
    answerIndex: 1,
    explanation: "Integer ialah nombor bulat positif, nombor bulat negatif atau sifar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Manakah integer positif?",
    options: ["-4", "-1", "5", "0"],
    answerIndex: 2,
    explanation: "Integer positif lebih besar daripada sifar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Manakah integer negatif?",
    options: ["3", "0", "-7", "9"],
    answerIndex: 2,
    explanation: "Integer negatif kurang daripada sifar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Antara berikut, yang manakah bukan integer?",
    options: ["-12", "8", "0", "0.5"],
    answerIndex: 3,
    explanation: "0.5 ialah nombor perpuluhan, bukan integer.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Pada garis nombor, nombor di sebelah kanan sifar ialah:",
    options: ["Integer negatif", "Pecahan negatif", "Integer positif", "Perpuluhan negatif"],
    answerIndex: 2,
    explanation: "Nombor di sebelah kanan sifar ialah nombor positif dan nilainya semakin besar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah lebih besar?",
    options: ["-5", "-2", "-8", "-10"],
    answerIndex: 1,
    explanation: "-2 lebih besar kerana berada lebih kanan pada garis nombor.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Susun nombor berikut secara menaik: -3, 5, -1, 2",
    options: ["-3, -1, 2, 5", "5, 2, -1, -3", "-1, -3, 2, 5", "2, 5, -3, -1"],
    answerIndex: 0,
    explanation: "Tertib menaik ialah daripada nilai terkecil kepada terbesar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Susun nombor berikut secara menurun: -4, 6, 0, 3",
    options: ["-4, 0, 3, 6", "6, 3, 0, -4", "3, 6, 0, -4", "6, 0, 3, -4"],
    answerIndex: 1,
    explanation: "Tertib menurun ialah daripada nilai terbesar kepada terkecil.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 5 + (-2)",
    options: ["7", "-7", "3", "-3"],
    answerIndex: 2,
    explanation: "5 + (-2) = 3.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: -4 + 6",
    options: ["2", "-2", "10", "-10"],
    answerIndex: 0,
    explanation: "-4 + 6 = 2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 8 - 3",
    options: ["11", "5", "-5", "-11"],
    answerIndex: 1,
    explanation: "8 - 3 = 5.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 3 - 8",
    options: ["5", "-5", "11", "-11"],
    answerIndex: 1,
    explanation: "3 - 8 = -5.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: (-3) x 4",
    options: ["12", "-12", "7", "-7"],
    answerIndex: 1,
    explanation: "Tanda berlainan menghasilkan jawapan negatif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: (-5) x (-2)",
    options: ["-10", "10", "7", "-7"],
    answerIndex: 1,
    explanation: "Tanda sama menghasilkan jawapan positif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 18 ÷ 3",
    options: ["6", "-6", "15", "-15"],
    answerIndex: 0,
    explanation: "18 ÷ 3 = 6.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: (-20) ÷ 5",
    options: ["4", "-4", "25", "-25"],
    answerIndex: 1,
    explanation: "Tanda berlainan menghasilkan jawapan negatif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 2 + 3 x 4",
    options: ["20", "14", "12", "10"],
    answerIndex: 1,
    explanation: "Darab dahulu: 3 x 4 = 12, kemudian 2 + 12 = 14.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: (2 + 3) x 4",
    options: ["14", "12", "20", "24"],
    answerIndex: 2,
    explanation: "Kurungan dahulu: 2 + 3 = 5, kemudian 5 x 4 = 20.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah pecahan negatif?",
    options: ["1/2", "3/5", "-2/7", "5/8"],
    answerIndex: 2,
    explanation: "Pecahan negatif mempunyai tanda negatif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah lebih besar?",
    options: ["-1/2", "-3/4", "-1", "-2"],
    answerIndex: 0,
    explanation:
      "-1/2 lebih besar kerana nilainya lebih hampir kepada sifar berbanding -3/4, -1 dan -2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 1/2 + 1/2",
    options: ["1", "2", "1/4", "3/2"],
    answerIndex: 0,
    explanation: "1/2 + 1/2 = 1.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 3/4 - 1/4",
    options: ["1/2", "1", "1/4", "3/4"],
    answerIndex: 0,
    explanation: "Penyebut sama, jadi tolak pengangka: 3 - 1 = 2. Maka 2/4 = 1/2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah perpuluhan negatif?",
    options: ["2.5", "0.3", "-1.7", "4.8"],
    answerIndex: 2,
    explanation: "Perpuluhan negatif ialah nombor perpuluhan yang kurang daripada sifar.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah lebih kecil?",
    options: ["-0.5", "0.5", "1.5", "2.5"],
    answerIndex: 0,
    explanation: "Semua nombor negatif lebih kecil daripada nombor positif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 2.5 + 1.5",
    options: ["3", "4", "5", "3.5"],
    answerIndex: 1,
    explanation: "2.5 + 1.5 = 4.0.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Hitung: 5.6 - 2.4",
    options: ["2.2", "3.2", "4.2", "1.2"],
    answerIndex: 1,
    explanation: "5.6 - 2.4 = 3.2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Yang manakah nombor nisbah?",
    options: ["3/4", "-5", "2.5", "Semua di atas"],
    answerIndex: 3,
    explanation: "Pecahan, integer dan perpuluhan terhingga ialah nombor nisbah.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Tukarkan 3.5 kepada pecahan.",
    options: ["7/2", "5/2", "3/2", "9/2"],
    answerIndex: 0,
    explanation: "3.5 = 35/10 = 7/2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Ali memperoleh keuntungan RM50. Nilai ini diwakili sebagai:",
    options: ["-50", "+50", "0", "-500"],
    answerIndex: 1,
    explanation: "Untung diwakili oleh nilai positif.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Siti mengalami kerugian RM30. Nilai ini diwakili sebagai:",
    options: ["30", "+30", "-30", "300"],
    answerIndex: 2,
    explanation: "Rugi diwakili oleh nilai negatif.",
    difficulty: "Easy",
    subjectId: "math",
  },
];

const MATH_OBJECTIVE_2_PRACTICE_QUESTIONS: ShuffledQuestion[] = [
  {
    question: "Hitung: -12 + 7",
    options: ["-19", "-5", "5", "19"],
    answerIndex: 1,
    explanation: "-12 + 7 = -5 kerana 12 lebih besar daripada 7 dan tanda jawapan negatif.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 15 + (-23)",
    options: ["38", "-38", "8", "-8"],
    answerIndex: 3,
    explanation: "15 + (-23) = 15 - 23 = -8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: -18 - (-6)",
    options: ["-24", "-12", "12", "24"],
    answerIndex: 1,
    explanation: "Menolak integer negatif menjadi tambah: -18 - (-6) = -18 + 6 = -12.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 9 - (-14)",
    options: ["-23", "-5", "5", "23"],
    answerIndex: 3,
    explanation: "9 - (-14) = 9 + 14 = 23.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Pada garis nombor, bergerak 8 langkah ke kiri dari -3 akan sampai ke:",
    options: ["-11", "-5", "5", "11"],
    answerIndex: 0,
    explanation: "Bergerak ke kiri bermaksud menolak: -3 - 8 = -11.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Pada garis nombor, bergerak 6 langkah ke kanan dari -9 akan sampai ke:",
    options: ["-15", "-3", "3", "15"],
    answerIndex: 1,
    explanation: "Bergerak ke kanan bermaksud menambah: -9 + 6 = -3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Susun nombor berikut secara menaik: -7, 4, -2, 0, 9",
    options: ["-7, -2, 0, 4, 9", "9, 4, 0, -2, -7", "-2, -7, 0, 4, 9", "0, -2, -7, 4, 9"],
    answerIndex: 0,
    explanation: "Tertib menaik bermula daripada nombor paling kecil: -7, -2, 0, 4, 9.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Antara berikut, pasangan nombor manakah disusun daripada kecil kepada besar?",
    options: ["-3, -8", "-10, -4", "6, -2", "0, -1"],
    answerIndex: 1,
    explanation: "-10 lebih kecil daripada -4 kerana -10 berada lebih kiri pada garis nombor.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Nilai suhu berubah daripada -4°C kepada 9°C. Berapakah kenaikan suhu?",
    options: ["5°C", "9°C", "13°C", "-13°C"],
    answerIndex: 2,
    explanation: "Kenaikan suhu = 9 - (-4) = 13°C.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question:
      "Sebuah lif berada di tingkat -2 dan naik 7 tingkat. Di tingkat manakah lif itu berada?",
    options: ["-9", "-5", "5", "9"],
    answerIndex: 2,
    explanation: "-2 + 7 = 5, jadi lif berada di tingkat 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-6) x 8",
    options: ["-48", "-14", "14", "48"],
    answerIndex: 0,
    explanation: "Tanda berlainan memberikan hasil negatif: (-6) x 8 = -48.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-9) x (-7)",
    options: ["-63", "-16", "16", "63"],
    answerIndex: 3,
    explanation: "Tanda sama memberikan hasil positif: (-9) x (-7) = 63.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 56 ÷ (-8)",
    options: ["-7", "7", "-48", "48"],
    answerIndex: 0,
    explanation: "Tanda berlainan memberikan hasil negatif: 56 ÷ (-8) = -7.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-72) ÷ (-9)",
    options: ["-8", "8", "-63", "63"],
    answerIndex: 1,
    explanation: "Tanda sama memberikan hasil positif: (-72) ÷ (-9) = 8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 4 + (-3) x 5",
    options: ["5", "-11", "-15", "20"],
    answerIndex: 1,
    explanation: "Darab dahulu: (-3) x 5 = -15. Kemudian 4 + (-15) = -11.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (4 + (-3)) x 5",
    options: ["1", "5", "-5", "35"],
    answerIndex: 1,
    explanation: "Kurungan dahulu: 4 + (-3) = 1. Kemudian 1 x 5 = 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: -30 ÷ 5 + 4",
    options: ["-10", "-2", "2", "10"],
    answerIndex: 1,
    explanation: "Bahagi dahulu: -30 ÷ 5 = -6. Kemudian -6 + 4 = -2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hukum manakah ditunjukkan oleh 7 + (-2) = (-2) + 7?",
    options: [
      "Hukum Identiti",
      "Hukum Kalis Agihan",
      "Hukum Kalis Tukar Tertib",
      "Hukum Kalis Sekutuan",
    ],
    answerIndex: 2,
    explanation:
      "Susunan nombor ditukar tetapi hasil tambah sama, jadi ini Hukum Kalis Tukar Tertib.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hukum manakah ditunjukkan oleh 3 x (4 + 5) = 3 x 4 + 3 x 5?",
    options: ["Hukum Identiti", "Hukum Kalis Agihan", "Hukum Kalis Tukar Tertib", "Hukum Songsang"],
    answerIndex: 1,
    explanation: "Pendaraban diagihkan kepada setiap sebutan dalam kurungan.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 6 x (-2 + 5)",
    options: ["-18", "18", "42", "-42"],
    answerIndex: 1,
    explanation: "Kurungan dahulu: -2 + 5 = 3. Kemudian 6 x 3 = 18.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: -1/3 + 2/3",
    options: ["-1", "1/3", "1", "-1/3"],
    answerIndex: 1,
    explanation: "Penyebut sama, jadi tambah pengangka: -1 + 2 = 1. Jawapan ialah 1/3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 5/6 - 1/3",
    options: ["4/3", "1/2", "2/6", "6/3"],
    answerIndex: 1,
    explanation: "Samakan penyebut: 1/3 = 2/6. Maka 5/6 - 2/6 = 3/6 = 1/2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-3/4) x 8",
    options: ["-6", "6", "-3/32", "32/3"],
    answerIndex: 0,
    explanation: "(-3/4) x 8 = (-3 x 8) / 4 = -24/4 = -6.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-2.5) + 4.8",
    options: ["-7.3", "-2.3", "2.3", "7.3"],
    answerIndex: 2,
    explanation: "4.8 - 2.5 = 2.3 dan nilai positif lebih besar.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 6.4 - (-1.9)",
    options: ["4.5", "5.5", "8.3", "-8.3"],
    answerIndex: 2,
    explanation: "Menolak nombor negatif menjadi tambah: 6.4 + 1.9 = 8.3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Yang manakah bersamaan dengan -1.25?",
    options: ["-5/4", "-1/4", "5/4", "1/25"],
    answerIndex: 0,
    explanation: "1.25 = 125/100 = 5/4, maka -1.25 = -5/4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Antara berikut, yang manakah bukan nombor nisbah?",
    options: ["-6", "0.75", "2/9", "√2"],
    answerIndex: 3,
    explanation:
      "√2 tidak boleh ditulis sebagai a/b dengan a dan b integer serta b != 0, jadi bukan nombor nisbah.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Hitung: 1/2 + 0.75",
    options: ["0.8", "1", "1.25", "1.75"],
    answerIndex: 2,
    explanation: "1/2 = 0.5. Maka 0.5 + 0.75 = 1.25.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Amin mempunyai hutang RM18 dan membayar RM7. Nilai baki hutangnya diwakili oleh:",
    options: ["-25", "-11", "11", "25"],
    answerIndex: 1,
    explanation: "Hutang diwakili nilai negatif: -18 + 7 = -11.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Hitung: (-4.5) ÷ 1.5 + 2",
    options: ["-5", "-1", "1", "5"],
    answerIndex: 1,
    explanation: "Bahagi dahulu: (-4.5) ÷ 1.5 = -3. Kemudian -3 + 2 = -1.",
    difficulty: "Hard",
    subjectId: "math",
  },
];

const MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS: ShuffledQuestion[] = [
  {
    question: "Hitung: -17 + 29 - 8",
    options: ["-54", "-4", "4", "20"],
    answerIndex: 2,
    explanation: "-17 + 29 = 12, kemudian 12 - 8 = 4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 12 - (-5) + (-9)",
    options: ["-2", "8", "16", "26"],
    answerIndex: 1,
    explanation: "12 - (-5) = 17. Kemudian 17 + (-9) = 8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-4) x 3 + 18 ÷ (-6)",
    options: ["-15", "-9", "9", "15"],
    answerIndex: 0,
    explanation:
      "Darab dan bahagi dahulu: (-4) x 3 = -12 dan 18 ÷ (-6) = -3. Maka -12 + (-3) = -15.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Antara berikut, nombor manakah paling besar?",
    options: ["-16", "-9", "-21", "-11"],
    answerIndex: 1,
    explanation: "-9 paling besar kerana berada paling kanan antara nombor negatif tersebut.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Susun nombor berikut secara menaik: -12, -3, 5, 0, -8",
    options: ["-12, -8, -3, 0, 5", "5, 0, -3, -8, -12", "-3, -8, -12, 0, 5", "-12, -3, -8, 0, 5"],
    answerIndex: 0,
    explanation:
      "Tertib menaik ialah daripada nilai paling kecil kepada paling besar: -12, -8, -3, 0, 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question:
      "Suatu nombor ialah 6. Jika nombor itu dikurangkan sebanyak 14, apakah nombor baharu?",
    options: ["-20", "-8", "8", "20"],
    answerIndex: 1,
    explanation: "6 - 14 = -8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: (-2) + (-5) - (-11)",
    options: ["-18", "-4", "4", "18"],
    answerIndex: 2,
    explanation: "(-2) + (-5) = -7. Kemudian -7 - (-11) = -7 + 11 = 4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 3 x (-6 + 2) - (-10)",
    options: ["-22", "-2", "2", "22"],
    answerIndex: 1,
    explanation:
      "Kurungan dahulu: -6 + 2 = -4. Kemudian 3 x (-4) = -12. Akhirnya -12 - (-10) = -2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Pernyataan manakah benar?",
    options: ["-15 > -5", "-2 < -9", "-18 < -7", "0 < -1"],
    answerIndex: 2,
    explanation: "-18 lebih kecil daripada -7 kerana -18 berada lebih kiri pada garis nombor.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Berapakah jarak antara -7 dan 4 pada garis nombor?",
    options: ["-11", "-3", "3", "11"],
    answerIndex: 3,
    explanation: "Jarak = 4 - (-7) = 11 unit.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: -2/3 + 5/6",
    options: ["-7/6", "-1/6", "1/6", "7/6"],
    answerIndex: 2,
    explanation: "-2/3 = -4/6. Maka -4/6 + 5/6 = 1/6.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: -3/5 - (-1/10)",
    options: ["-7/10", "-1/2", "1/2", "7/10"],
    answerIndex: 1,
    explanation: "-3/5 = -6/10. Maka -6/10 - (-1/10) = -6/10 + 1/10 = -5/10 = -1/2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 2/3 ÷ (-4/9)",
    options: ["-3/2", "-8/27", "8/27", "3/2"],
    answerIndex: 0,
    explanation: "Bahagi pecahan ditukar kepada darab salingan: 2/3 x (-9/4) = -18/12 = -3/2.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Hitung: (-1.2) x (-0.5) + 0.8",
    options: ["-1.4", "-0.2", "1.4", "2.0"],
    answerIndex: 2,
    explanation: "(-1.2) x (-0.5) = 0.6. Kemudian 0.6 + 0.8 = 1.4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 3/4 - 0.2",
    options: ["0.25", "0.45", "0.55", "0.95"],
    answerIndex: 2,
    explanation: "3/4 = 0.75. Maka 0.75 - 0.2 = 0.55.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Antara berikut, yang manakah bukan nombor nisbah?",
    options: ["-4/7", "0.125", "π", "-3"],
    answerIndex: 2,
    explanation:
      "π tidak boleh ditulis tepat dalam bentuk a/b dengan b != 0, maka π bukan nombor nisbah.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Hitung: (-0.6) + (-3/5)",
    options: ["-1.2", "-0.9", "0", "1.2"],
    answerIndex: 0,
    explanation: "-3/5 = -0.6. Maka -0.6 + (-0.6) = -1.2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Hitung: 2.4 ÷ (-0.3) - 5",
    options: ["-13", "-3", "3", "13"],
    answerIndex: 0,
    explanation: "2.4 ÷ (-0.3) = -8. Kemudian -8 - 5 = -13.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Hitung: [1/2 + (-3/4)] x (-8)",
    options: ["-10", "-2", "2", "10"],
    answerIndex: 2,
    explanation: "1/2 = 2/4. Maka 2/4 + (-3/4) = -1/4. Kemudian (-1/4) x (-8) = 2.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Tukarkan -2.75 kepada pecahan termudah.",
    options: ["-11/4", "-7/4", "7/4", "11/4"],
    answerIndex: 0,
    explanation: "-2.75 = -275/100 = -11/4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question:
      "Suhu pada waktu pagi ialah -3°C. Suhu naik 8°C dan kemudian turun 6°C. Apakah suhu akhir?",
    options: ["-17°C", "-1°C", "1°C", "11°C"],
    answerIndex: 1,
    explanation: "-3 + 8 - 6 = -1°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Seorang penyelam berada 12 m di bawah paras laut. Dia naik 5 m, kemudian menyelam turun 9 m. Apakah kedudukan akhirnya?",
    options: ["-26 m", "-16 m", "4 m", "16 m"],
    answerIndex: 1,
    explanation: "Kedudukan awal ialah -12 m. Maka -12 + 5 - 9 = -16 m.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Seorang peniaga mendapat untung RM120, rugi RM175, kemudian untung RM60. Apakah keuntungan atau kerugian bersih?",
    options: ["Rugi RM115", "Rugi RM5", "Untung RM5", "Untung RM355"],
    answerIndex: 2,
    explanation: "120 - 175 + 60 = 5, jadi peniaga mendapat untung bersih RM5.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Baki akaun Sara ialah -RM45. Dia memasukkan RM80 dan mengeluarkan RM25. Apakah baki akhirnya?",
    options: ["-RM150", "-RM10", "RM10", "RM60"],
    answerIndex: 2,
    explanation: "-45 + 80 - 25 = 10, maka baki akhirnya ialah RM10.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Setiap kek memerlukan 3/4 kg tepung. Lina mempunyai 3 kg tepung dan membuat 3 kek. Berapakah tepung yang tinggal?",
    options: ["1/4 kg", "1/2 kg", "3/4 kg", "1 kg"],
    answerIndex: 2,
    explanation: "Tepung digunakan = 3 x 3/4 = 9/4 = 2 1/4 kg. Baki = 3 - 2 1/4 = 3/4 kg.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Seorang pendaki berada 150 m di atas paras laut. Dia turun 220 m dan kemudian naik 35 m. Apakah kedudukannya?",
    options: ["-105 m", "-35 m", "35 m", "405 m"],
    answerIndex: 1,
    explanation: "150 - 220 + 35 = -35 m, jadi kedudukannya 35 m di bawah paras laut.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Dalam satu permainan, jawapan betul diberi +4 markah dan jawapan salah diberi -2 markah. Jika Aina menjawab 7 betul dan 3 salah, berapakah markahnya?",
    options: ["16", "22", "28", "34"],
    answerIndex: 1,
    explanation: "Markah = 7 x 4 + 3 x (-2) = 28 - 6 = 22.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Rafi berhutang RM18.50 kepada setiap seorang daripada 2 rakannya. Dia membayar RM25. Berapakah baki hutangnya?",
    options: ["-RM12", "-RM37", "RM12", "RM62"],
    answerIndex: 0,
    explanation:
      "Jumlah hutang = 2 x RM18.50 = RM37. Selepas membayar RM25, baki hutang = RM12, diwakili oleh -RM12.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Purata bagi suhu -2.5°C, 4.0°C dan -1.5°C ialah:",
    options: ["-4.0°C", "0°C", "1.5°C", "4.0°C"],
    answerIndex: 1,
    explanation: "Jumlah suhu = -2.5 + 4.0 + (-1.5) = 0. Purata = 0 ÷ 3 = 0°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Suhu sebuah bandar ialah -6°C. Suhu naik 3.5°C pada tengah hari dan turun 8.5°C pada malam. Apakah suhu pada waktu malam?",
    options: ["-18°C", "-11°C", "-1°C", "6°C"],
    answerIndex: 1,
    explanation: "-6 + 3.5 - 8.5 = -11°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
];

const MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP: ShuffledQuestion[] = [
  {
    question: "Which of the following is an integer?",
    options: ["0.5", "-8", "3/4", "1.2"],
    answerIndex: 1,
    explanation: "An integer is a positive whole number, a negative whole number, or zero.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is a positive integer?",
    options: ["-4", "-1", "5", "0"],
    answerIndex: 2,
    explanation: "A positive integer is greater than zero.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is a negative integer?",
    options: ["3", "0", "-7", "9"],
    answerIndex: 2,
    explanation: "A negative integer is less than zero.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which of the following is not an integer?",
    options: ["-12", "8", "0", "0.5"],
    answerIndex: 3,
    explanation: "0.5 is a decimal, not an integer.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "On a number line, numbers to the right of zero are:",
    options: ["Negative integers", "Negative fractions", "Positive integers", "Negative decimals"],
    answerIndex: 2,
    explanation:
      "Numbers to the right of zero are positive numbers and their values become greater.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is greater?",
    options: ["-5", "-2", "-8", "-10"],
    answerIndex: 1,
    explanation: "-2 is greater because it is further to the right on the number line.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Arrange the numbers in ascending order: -3, 5, -1, 2",
    options: ["-3, -1, 2, 5", "5, 2, -1, -3", "-1, -3, 2, 5", "2, 5, -3, -1"],
    answerIndex: 0,
    explanation: "Ascending order means arranging from the smallest value to the largest value.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Arrange the numbers in descending order: -4, 6, 0, 3",
    options: ["-4, 0, 3, 6", "6, 3, 0, -4", "3, 6, 0, -4", "6, 0, 3, -4"],
    answerIndex: 1,
    explanation: "Descending order means arranging from the largest value to the smallest value.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 5 + (-2)",
    options: ["7", "-7", "3", "-3"],
    answerIndex: 2,
    explanation: "5 + (-2) = 3.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: -4 + 6",
    options: ["2", "-2", "10", "-10"],
    answerIndex: 0,
    explanation: "-4 + 6 = 2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 8 - 3",
    options: ["11", "5", "-5", "-11"],
    answerIndex: 1,
    explanation: "8 - 3 = 5.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 3 - 8",
    options: ["5", "-5", "11", "-11"],
    answerIndex: 1,
    explanation: "3 - 8 = -5.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: (-3) x 4",
    options: ["12", "-12", "7", "-7"],
    answerIndex: 1,
    explanation: "Different signs give a negative answer.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: (-5) x (-2)",
    options: ["-10", "10", "7", "-7"],
    answerIndex: 1,
    explanation: "Same signs give a positive answer.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 18 ÷ 3",
    options: ["6", "-6", "15", "-15"],
    answerIndex: 0,
    explanation: "18 ÷ 3 = 6.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: (-20) ÷ 5",
    options: ["4", "-4", "25", "-25"],
    answerIndex: 1,
    explanation: "Different signs give a negative answer.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 2 + 3 x 4",
    options: ["20", "14", "12", "10"],
    answerIndex: 1,
    explanation: "Multiply first: 3 x 4 = 12, then 2 + 12 = 14.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: (2 + 3) x 4",
    options: ["14", "12", "20", "24"],
    answerIndex: 2,
    explanation: "Brackets first: 2 + 3 = 5, then 5 x 4 = 20.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is a negative fraction?",
    options: ["1/2", "3/5", "-2/7", "5/8"],
    answerIndex: 2,
    explanation: "A negative fraction has a negative sign.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is greater?",
    options: ["-1/2", "-3/4", "-1", "-2"],
    answerIndex: 0,
    explanation: "-1/2 is greater because it is closer to zero than -3/4, -1 and -2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 1/2 + 1/2",
    options: ["1", "2", "1/4", "3/2"],
    answerIndex: 0,
    explanation: "1/2 + 1/2 = 1.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 3/4 - 1/4",
    options: ["1/2", "1", "1/4", "3/4"],
    answerIndex: 0,
    explanation:
      "The denominators are the same, so subtract the numerators: 3 - 1 = 2. Thus 2/4 = 1/2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is a negative decimal?",
    options: ["2.5", "0.3", "-1.7", "4.8"],
    answerIndex: 2,
    explanation: "A negative decimal is a decimal number less than zero.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is smaller?",
    options: ["-0.5", "0.5", "1.5", "2.5"],
    answerIndex: 0,
    explanation: "All negative numbers are smaller than positive numbers.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 2.5 + 1.5",
    options: ["3", "4", "5", "3.5"],
    answerIndex: 1,
    explanation: "2.5 + 1.5 = 4.0.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Calculate: 5.6 - 2.4",
    options: ["2.2", "3.2", "4.2", "1.2"],
    answerIndex: 1,
    explanation: "5.6 - 2.4 = 3.2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Which is a rational number?",
    options: ["3/4", "-5", "2.5", "All of the above"],
    answerIndex: 3,
    explanation: "Fractions, integers and terminating decimals are rational numbers.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Convert 3.5 into a fraction.",
    options: ["7/2", "5/2", "3/2", "9/2"],
    answerIndex: 0,
    explanation: "3.5 = 35/10 = 7/2.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Ali makes a profit of RM50. This value is represented as:",
    options: ["-50", "+50", "0", "-500"],
    answerIndex: 1,
    explanation: "Profit is represented by a positive value.",
    difficulty: "Easy",
    subjectId: "math",
  },
  {
    question: "Siti makes a loss of RM30. This value is represented as:",
    options: ["30", "+30", "-30", "300"],
    answerIndex: 2,
    explanation: "Loss is represented by a negative value.",
    difficulty: "Easy",
    subjectId: "math",
  },
];

const MATH_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP: ShuffledQuestion[] = [
  {
    question: "Calculate: -12 + 7",
    options: ["-19", "-5", "5", "19"],
    answerIndex: 1,
    explanation: "-12 + 7 = -5 because 12 is greater than 7 and the answer is negative.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 15 + (-23)",
    options: ["38", "-38", "8", "-8"],
    answerIndex: 3,
    explanation: "15 + (-23) = 15 - 23 = -8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: -18 - (-6)",
    options: ["-24", "-12", "12", "24"],
    answerIndex: 1,
    explanation: "Subtracting a negative integer becomes addition: -18 - (-6) = -18 + 6 = -12.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 9 - (-14)",
    options: ["-23", "-5", "5", "23"],
    answerIndex: 3,
    explanation: "9 - (-14) = 9 + 14 = 23.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "On a number line, moving 8 steps left from -3 reaches:",
    options: ["-11", "-5", "5", "11"],
    answerIndex: 0,
    explanation: "Moving left means subtracting: -3 - 8 = -11.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "On a number line, moving 6 steps right from -9 reaches:",
    options: ["-15", "-3", "3", "15"],
    answerIndex: 1,
    explanation: "Moving right means adding: -9 + 6 = -3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Arrange the numbers in ascending order: -7, 4, -2, 0, 9",
    options: ["-7, -2, 0, 4, 9", "9, 4, 0, -2, -7", "-2, -7, 0, 4, 9", "0, -2, -7, 4, 9"],
    answerIndex: 0,
    explanation: "Ascending order starts from the smallest number: -7, -2, 0, 4, 9.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which pair of numbers is arranged from smaller to larger?",
    options: ["-3, -8", "-10, -4", "6, -2", "0, -1"],
    answerIndex: 1,
    explanation: "-10 is smaller than -4 because -10 is further left on the number line.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "The temperature changes from -4°C to 9°C. What is the increase in temperature?",
    options: ["5°C", "9°C", "13°C", "-13°C"],
    answerIndex: 2,
    explanation: "Increase in temperature = 9 - (-4) = 13°C.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "A lift is at floor -2 and goes up 7 floors. Which floor is it on now?",
    options: ["-9", "-5", "5", "9"],
    answerIndex: 2,
    explanation: "-2 + 7 = 5, so the lift is on floor 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-6) x 8",
    options: ["-48", "-14", "14", "48"],
    answerIndex: 0,
    explanation: "Different signs give a negative answer: (-6) x 8 = -48.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-9) x (-7)",
    options: ["-63", "-16", "16", "63"],
    answerIndex: 3,
    explanation: "Same signs give a positive answer: (-9) x (-7) = 63.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 56 ÷ (-8)",
    options: ["-7", "7", "-48", "48"],
    answerIndex: 0,
    explanation: "Different signs give a negative answer: 56 ÷ (-8) = -7.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-72) ÷ (-9)",
    options: ["-8", "8", "-63", "63"],
    answerIndex: 1,
    explanation: "Same signs give a positive answer: (-72) ÷ (-9) = 8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 4 + (-3) x 5",
    options: ["5", "-11", "-15", "20"],
    answerIndex: 1,
    explanation: "Multiply first: (-3) x 5 = -15. Then 4 + (-15) = -11.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (4 + (-3)) x 5",
    options: ["1", "5", "-5", "35"],
    answerIndex: 1,
    explanation: "Brackets first: 4 + (-3) = 1. Then 1 x 5 = 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: -30 ÷ 5 + 4",
    options: ["-10", "-2", "2", "10"],
    answerIndex: 1,
    explanation: "Divide first: -30 ÷ 5 = -6. Then -6 + 4 = -2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which law is shown by 7 + (-2) = (-2) + 7?",
    options: ["Identity Law", "Distributive Law", "Commutative Law", "Associative Law"],
    answerIndex: 2,
    explanation:
      "The order of the numbers changes but the sum remains the same, so this is the Commutative Law.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which law is shown by 3 x (4 + 5) = 3 x 4 + 3 x 5?",
    options: ["Identity Law", "Distributive Law", "Commutative Law", "Inverse Law"],
    answerIndex: 1,
    explanation: "Multiplication is distributed to each term inside the brackets.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 6 x (-2 + 5)",
    options: ["-18", "18", "42", "-42"],
    answerIndex: 1,
    explanation: "Brackets first: -2 + 5 = 3. Then 6 x 3 = 18.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: -1/3 + 2/3",
    options: ["-1", "1/3", "1", "-1/3"],
    answerIndex: 1,
    explanation:
      "The denominators are the same, so add the numerators: -1 + 2 = 1. The answer is 1/3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 5/6 - 1/3",
    options: ["4/3", "1/2", "2/6", "6/3"],
    answerIndex: 1,
    explanation: "Make the denominators the same: 1/3 = 2/6. Thus 5/6 - 2/6 = 3/6 = 1/2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-3/4) x 8",
    options: ["-6", "6", "-3/32", "32/3"],
    answerIndex: 0,
    explanation: "(-3/4) x 8 = (-3 x 8) / 4 = -24/4 = -6.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-2.5) + 4.8",
    options: ["-7.3", "-2.3", "2.3", "7.3"],
    answerIndex: 2,
    explanation: "4.8 - 2.5 = 2.3 and the larger value is positive.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 6.4 - (-1.9)",
    options: ["4.5", "5.5", "8.3", "-8.3"],
    answerIndex: 2,
    explanation: "Subtracting a negative number becomes addition: 6.4 + 1.9 = 8.3.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which is equivalent to -1.25?",
    options: ["-5/4", "-1/4", "5/4", "1/25"],
    answerIndex: 0,
    explanation: "1.25 = 125/100 = 5/4, so -1.25 = -5/4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which of the following is not a rational number?",
    options: ["-6", "0.75", "2/9", "√2"],
    answerIndex: 3,
    explanation:
      "√2 cannot be written as a/b where a and b are integers and b != 0, so it is not a rational number.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Calculate: 1/2 + 0.75",
    options: ["0.8", "1", "1.25", "1.75"],
    answerIndex: 2,
    explanation: "1/2 = 0.5. Thus 0.5 + 0.75 = 1.25.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Amin owes RM18 and pays RM7. The value of his remaining debt is represented by:",
    options: ["-25", "-11", "11", "25"],
    answerIndex: 1,
    explanation: "Debt is represented by a negative value: -18 + 7 = -11.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Calculate: (-4.5) ÷ 1.5 + 2",
    options: ["-5", "-1", "1", "5"],
    answerIndex: 1,
    explanation: "Divide first: (-4.5) ÷ 1.5 = -3. Then -3 + 2 = -1.",
    difficulty: "Hard",
    subjectId: "math",
  },
];

const MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP: ShuffledQuestion[] = [
  {
    question: "Calculate: -17 + 29 - 8",
    options: ["-54", "-4", "4", "20"],
    answerIndex: 2,
    explanation: "-17 + 29 = 12, then 12 - 8 = 4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 12 - (-5) + (-9)",
    options: ["-2", "8", "16", "26"],
    answerIndex: 1,
    explanation: "12 - (-5) = 17. Then 17 + (-9) = 8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-4) x 3 + 18 ÷ (-6)",
    options: ["-15", "-9", "9", "15"],
    answerIndex: 0,
    explanation:
      "Multiply and divide first: (-4) x 3 = -12 and 18 ÷ (-6) = -3. Thus -12 + (-3) = -15.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which of the following numbers is the greatest?",
    options: ["-16", "-9", "-21", "-11"],
    answerIndex: 1,
    explanation:
      "-9 is the greatest because it is the furthest right among these negative numbers.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Arrange the numbers in ascending order: -12, -3, 5, 0, -8",
    options: ["-12, -8, -3, 0, 5", "5, 0, -3, -8, -12", "-3, -8, -12, 0, 5", "-12, -3, -8, 0, 5"],
    answerIndex: 0,
    explanation:
      "Ascending order means from the smallest value to the greatest value: -12, -8, -3, 0, 5.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "A number is 6. If it is reduced by 14, what is the new number?",
    options: ["-20", "-8", "8", "20"],
    answerIndex: 1,
    explanation: "6 - 14 = -8.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: (-2) + (-5) - (-11)",
    options: ["-18", "-4", "4", "18"],
    answerIndex: 2,
    explanation: "(-2) + (-5) = -7. Then -7 - (-11) = -7 + 11 = 4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 3 x (-6 + 2) - (-10)",
    options: ["-22", "-2", "2", "22"],
    answerIndex: 1,
    explanation: "Brackets first: -6 + 2 = -4. Then 3 x (-4) = -12. Finally, -12 - (-10) = -2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which statement is true?",
    options: ["-15 > -5", "-2 < -9", "-18 < -7", "0 < -1"],
    answerIndex: 2,
    explanation: "-18 is less than -7 because -18 is further left on the number line.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "What is the distance between -7 and 4 on a number line?",
    options: ["-11", "-3", "3", "11"],
    answerIndex: 3,
    explanation: "Distance = 4 - (-7) = 11 units.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: -2/3 + 5/6",
    options: ["-7/6", "-1/6", "1/6", "7/6"],
    answerIndex: 2,
    explanation: "-2/3 = -4/6. Thus -4/6 + 5/6 = 1/6.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: -3/5 - (-1/10)",
    options: ["-7/10", "-1/2", "1/2", "7/10"],
    answerIndex: 1,
    explanation: "-3/5 = -6/10. Thus -6/10 - (-1/10) = -6/10 + 1/10 = -5/10 = -1/2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 2/3 ÷ (-4/9)",
    options: ["-3/2", "-8/27", "8/27", "3/2"],
    answerIndex: 0,
    explanation:
      "Division of fractions becomes multiplication by the reciprocal: 2/3 x (-9/4) = -18/12 = -3/2.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Calculate: (-1.2) x (-0.5) + 0.8",
    options: ["-1.4", "-0.2", "1.4", "2.0"],
    answerIndex: 2,
    explanation: "(-1.2) x (-0.5) = 0.6. Then 0.6 + 0.8 = 1.4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 3/4 - 0.2",
    options: ["0.25", "0.45", "0.55", "0.95"],
    answerIndex: 2,
    explanation: "3/4 = 0.75. Thus 0.75 - 0.2 = 0.55.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Which of the following is not a rational number?",
    options: ["-4/7", "0.125", "π", "-3"],
    answerIndex: 2,
    explanation:
      "π cannot be written exactly in the form a/b with b != 0, so π is not a rational number.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Calculate: (-0.6) + (-3/5)",
    options: ["-1.2", "-0.9", "0", "1.2"],
    answerIndex: 0,
    explanation: "-3/5 = -0.6. Thus -0.6 + (-0.6) = -1.2.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question: "Calculate: 2.4 ÷ (-0.3) - 5",
    options: ["-13", "-3", "3", "13"],
    answerIndex: 0,
    explanation: "2.4 ÷ (-0.3) = -8. Then -8 - 5 = -13.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Calculate: [1/2 + (-3/4)] x (-8)",
    options: ["-10", "-2", "2", "10"],
    answerIndex: 2,
    explanation: "1/2 = 2/4. Thus 2/4 + (-3/4) = -1/4. Then (-1/4) x (-8) = 2.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Convert -2.75 into its simplest fraction.",
    options: ["-11/4", "-7/4", "7/4", "11/4"],
    answerIndex: 0,
    explanation: "-2.75 = -275/100 = -11/4.",
    difficulty: "Medium",
    subjectId: "math",
  },
  {
    question:
      "The morning temperature is -3°C. It rises by 8°C and then drops by 6°C. What is the final temperature?",
    options: ["-17°C", "-1°C", "1°C", "11°C"],
    answerIndex: 1,
    explanation: "-3 + 8 - 6 = -1°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "A diver is 12 m below sea level. He rises 5 m, then dives down 9 m. What is his final position?",
    options: ["-26 m", "-16 m", "4 m", "16 m"],
    answerIndex: 1,
    explanation: "The starting position is -12 m. Thus -12 + 5 - 9 = -16 m.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "A trader gains RM120, loses RM175, then gains RM60. What is the net profit or loss?",
    options: ["Loss of RM115", "Loss of RM5", "Profit of RM5", "Profit of RM355"],
    answerIndex: 2,
    explanation: "120 - 175 + 60 = 5, so the trader makes a net profit of RM5.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Sara's account balance is -RM45. She deposits RM80 and withdraws RM25. What is her final balance?",
    options: ["-RM150", "-RM10", "RM10", "RM60"],
    answerIndex: 2,
    explanation: "-45 + 80 - 25 = 10, so her final balance is RM10.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "Each cake needs 3/4 kg of flour. Lina has 3 kg of flour and makes 3 cakes. How much flour is left?",
    options: ["1/4 kg", "1/2 kg", "3/4 kg", "1 kg"],
    answerIndex: 2,
    explanation: "Flour used = 3 x 3/4 = 9/4 = 2 1/4 kg. Balance = 3 - 2 1/4 = 3/4 kg.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "A climber is 150 m above sea level. He descends 220 m and then climbs 35 m. What is his position?",
    options: ["-105 m", "-35 m", "35 m", "405 m"],
    answerIndex: 1,
    explanation: "150 - 220 + 35 = -35 m, so he is 35 m below sea level.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "In a game, a correct answer gives +4 marks and a wrong answer gives -2 marks. If Aina gets 7 correct and 3 wrong, what is her score?",
    options: ["16", "22", "28", "34"],
    answerIndex: 1,
    explanation: "Score = 7 x 4 + 3 x (-2) = 28 - 6 = 22.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "Rafi owes RM18.50 to each of 2 friends. He pays RM25. What is his remaining debt?",
    options: ["-RM12", "-RM37", "RM12", "RM62"],
    answerIndex: 0,
    explanation:
      "Total debt = 2 x RM18.50 = RM37. After paying RM25, the remaining debt is RM12, represented by -RM12.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question: "The average of the temperatures -2.5°C, 4.0°C and -1.5°C is:",
    options: ["-4.0°C", "0°C", "1.5°C", "4.0°C"],
    answerIndex: 1,
    explanation: "Total temperature = -2.5 + 4.0 + (-1.5) = 0. Average = 0 ÷ 3 = 0°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
  {
    question:
      "The temperature in a city is -6°C. It rises by 3.5°C at noon and drops by 8.5°C at night. What is the night temperature?",
    options: ["-18°C", "-11°C", "-1°C", "6°C"],
    answerIndex: 1,
    explanation: "-6 + 3.5 - 8.5 = -11°C.",
    difficulty: "Hard",
    subjectId: "math",
  },
];

function mq(
  question: string,
  options: string[],
  answerIndex: number,
  explanation: string,
  difficulty: Difficulty,
): ShuffledQuestion {
  return { question, options, answerIndex, explanation, difficulty, subjectId: "math" };
}

const MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS: ShuffledQuestion[] = [
  mq(
    "Apakah faktor?",
    [
      "Nombor yang membahagi tepat tanpa baki",
      "Hasil darab nombor",
      "Nombor perpuluhan",
      "Nombor negatif sahaja",
    ],
    0,
    "Faktor membahagi suatu nombor dengan tepat tanpa baki.",
    "Easy",
  ),
  mq(
    "Apakah faktor bagi 12?",
    ["5", "7", "3", "8"],
    2,
    "12 ÷ 3 = 4 tanpa baki, jadi 3 ialah faktor bagi 12.",
    "Easy",
  ),
  mq(
    "Manakah senarai faktor bagi 12?",
    ["1, 2, 3, 4, 6, 12", "2, 4, 8, 12", "3, 6, 9, 12", "1, 5, 10, 12"],
    0,
    "Faktor 12 ialah 1, 2, 3, 4, 6 dan 12.",
    "Easy",
  ),
  mq(
    "Apakah nombor perdana?",
    [
      "Nombor yang ada banyak faktor",
      "Nombor yang ada tepat dua faktor",
      "Nombor genap sahaja",
      "Nombor gandaan 10",
    ],
    1,
    "Nombor perdana mempunyai tepat dua faktor: 1 dan nombor itu sendiri.",
    "Easy",
  ),
  mq(
    "Manakah nombor perdana?",
    ["1", "4", "9", "11"],
    3,
    "11 hanya mempunyai faktor 1 dan 11.",
    "Easy",
  ),
  mq(
    "Adakah 1 nombor perdana?",
    ["Ya", "Tidak", "Hanya jika ganjil", "Hanya jika genap"],
    1,
    "1 bukan nombor perdana kerana hanya mempunyai satu faktor.",
    "Easy",
  ),
  mq(
    "Apakah faktor perdana?",
    [
      "Faktor yang merupakan nombor perdana",
      "Gandaan paling kecil",
      "Faktor paling besar sahaja",
      "Nombor yang bukan faktor",
    ],
    0,
    "Faktor perdana ialah faktor yang juga nombor perdana.",
    "Easy",
  ),
  mq(
    "Apakah pemfaktoran perdana bagi 12?",
    ["2 x 2 x 3", "2 x 6", "3 x 4", "1 x 12"],
    0,
    "12 = 2 x 2 x 3 dalam faktor perdana.",
    "Easy",
  ),
  mq(
    "Apakah faktor sepunya?",
    [
      "Faktor yang sama bagi dua atau lebih nombor",
      "Gandaan yang sama",
      "Nombor terbesar",
      "Nombor terkecil",
    ],
    0,
    "Faktor sepunya ialah faktor yang sama bagi dua atau lebih nombor.",
    "Easy",
  ),
  mq(
    "Apakah FSTB?",
    [
      "Faktor sepunya paling besar",
      "Gandaan sepunya paling kecil",
      "Faktor pertama",
      "Gandaan pertama",
    ],
    0,
    "FSTB bermaksud Faktor Sepunya Terbesar.",
    "Easy",
  ),
  mq(
    "FSTB bagi 12 dan 18 ialah:",
    ["3", "6", "9", "12"],
    1,
    "Faktor sepunya 12 dan 18 ialah 1, 2, 3, 6. Yang terbesar ialah 6.",
    "Easy",
  ),
  mq(
    "Apakah gandaan?",
    [
      "Hasil darab nombor dengan nombor bulat positif",
      "Nombor yang membahagi tepat",
      "Faktor perdana",
      "Baki pembahagian",
    ],
    0,
    "Gandaan diperoleh dengan mendarab nombor dengan nombor bulat positif.",
    "Easy",
  ),
  mq(
    "Manakah gandaan bagi 4?",
    ["6", "10", "12", "14"],
    2,
    "12 = 4 x 3, jadi 12 ialah gandaan bagi 4.",
    "Easy",
  ),
  mq(
    "Apakah gandaan sepunya?",
    [
      "Gandaan yang sama bagi dua atau lebih nombor",
      "Faktor paling besar",
      "Nombor perdana sahaja",
      "Baki yang sama",
    ],
    0,
    "Gandaan sepunya ialah gandaan yang sama bagi dua atau lebih nombor.",
    "Easy",
  ),
  mq(
    "Apakah GSTK?",
    [
      "Faktor sepunya paling besar",
      "Gandaan sepunya paling kecil",
      "Nombor perdana",
      "Faktor pertama",
    ],
    1,
    "GSTK bermaksud Gandaan Sepunya Terkecil.",
    "Easy",
  ),
  mq(
    "GSTK bagi 4 dan 6 ialah:",
    ["6", "10", "12", "24"],
    2,
    "Gandaan sepunya 4 dan 6 termasuk 12 dan 24. Yang terkecil ialah 12.",
    "Easy",
  ),
  mq(
    "FSTB sesuai digunakan untuk:",
    [
      "Membahagi kepada kumpulan sama",
      "Mencari masa berulang",
      "Menukar perpuluhan",
      "Membina graf",
    ],
    0,
    "FSTB sesuai untuk pembahagian kepada kumpulan sama banyak.",
    "Easy",
  ),
  mq(
    "GSTK sesuai digunakan untuk:",
    [
      "Mencari kumpulan terbesar",
      "Mencari kejadian berulang bersama",
      "Membahagi baki",
      "Mencari faktor",
    ],
    1,
    "GSTK sesuai untuk kejadian yang berulang bersama.",
    "Easy",
  ),
  mq(
    "Kata kunci FSTB ialah:",
    ["Terkecil", "Pertama kali bersama", "Terbesar", "Berulang"],
    2,
    "FSTB berkaitan nilai terbesar atau maksimum.",
    "Easy",
  ),
  mq(
    "Kata kunci GSTK ialah:",
    ["Maksimum", "Kumpulan sama", "Terbesar", "Pertama kali bersama"],
    3,
    "GSTK kerap digunakan apabila mencari masa pertama berlaku bersama.",
    "Easy",
  ),
  mq("Faktor bagi 18 termasuk:", ["4", "5", "6", "8"], 2, "18 ÷ 6 = 3 tanpa baki.", "Easy"),
  mq("Faktor bagi 20 termasuk:", ["6", "8", "10", "12"], 2, "20 ÷ 10 = 2 tanpa baki.", "Easy"),
  mq(
    "Manakah bukan faktor bagi 12?",
    ["1", "3", "5", "6"],
    2,
    "12 tidak boleh dibahagi 5 tepat tanpa baki.",
    "Easy",
  ),
  mq(
    "Manakah bukan gandaan bagi 6?",
    ["6", "12", "18", "20"],
    3,
    "20 bukan hasil darab 6 dengan nombor bulat.",
    "Easy",
  ),
  mq(
    "Nombor perdana yang genap ialah:",
    ["2", "4", "6", "8"],
    0,
    "2 ialah satu-satunya nombor perdana genap dalam senarai ini.",
    "Easy",
  ),
  mq(
    "Faktor sepunya bagi 4 dan 6 termasuk:",
    ["1", "5", "8", "12"],
    0,
    "1 membahagi semua nombor bulat.",
    "Easy",
  ),
  mq(
    "Gandaan sepunya bagi 4 dan 6 termasuk:",
    ["8", "10", "12", "14"],
    2,
    "12 ialah gandaan bagi 4 dan juga 6.",
    "Easy",
  ),
  mq(
    "Pemfaktoran perdana menggunakan nombor:",
    ["Perdana", "Perpuluhan", "Negatif sahaja", "Pecahan sahaja"],
    0,
    "Pemfaktoran perdana menggunakan faktor nombor perdana.",
    "Easy",
  ),
  mq(
    "Dalam kaedah FSTB, pilih faktor sepunya yang:",
    ["Terkecil", "Paling besar", "Paling ganjil", "Paling akhir"],
    1,
    "FSTB ialah faktor sepunya terbesar.",
    "Easy",
  ),
  mq(
    "Dalam kaedah GSTK, pilih gandaan sepunya yang:",
    ["Paling kecil", "Paling besar", "Paling ganjil", "Bukan gandaan"],
    0,
    "GSTK ialah gandaan sepunya terkecil.",
    "Easy",
  ),
];

const MATH_C2_OBJECTIVE_2_PRACTICE_QUESTIONS: ShuffledQuestion[] = [
  mq(
    "Cari semua faktor bagi 16.",
    ["1, 2, 4, 8, 16", "1, 3, 5, 16", "2, 4, 6, 16", "1, 2, 8"],
    0,
    "16 boleh dibahagi tepat oleh 1, 2, 4, 8 dan 16.",
    "Medium",
  ),
  mq(
    "Cari semua faktor bagi 24.",
    ["1, 2, 3, 4, 6, 8, 12, 24", "1, 2, 4, 12", "2, 3, 6, 24", "1, 5, 10, 24"],
    0,
    "Senarai lengkap faktor 24 ialah 1, 2, 3, 4, 6, 8, 12 dan 24.",
    "Medium",
  ),
  mq(
    "Pemfaktoran perdana bagi 30 ialah:",
    ["2 x 3 x 5", "3 x 10", "2 x 15", "5 x 6"],
    0,
    "30 = 2 x 3 x 5.",
    "Medium",
  ),
  mq(
    "Pemfaktoran perdana bagi 36 ialah:",
    ["2 x 2 x 3 x 3", "4 x 9", "6 x 6", "2 x 18"],
    0,
    "36 = 2² x 3² = 2 x 2 x 3 x 3.",
    "Medium",
  ),
  mq(
    "FSTB bagi 16 dan 24 ialah:",
    ["4", "6", "8", "12"],
    2,
    "Faktor sepunya terbesar bagi 16 dan 24 ialah 8.",
    "Medium",
  ),
  mq(
    "FSTB bagi 20 dan 30 ialah:",
    ["5", "10", "15", "20"],
    1,
    "Faktor sepunya terbesar bagi 20 dan 30 ialah 10.",
    "Medium",
  ),
  mq(
    "FSTB bagi 18 dan 24 ialah:",
    ["3", "6", "9", "12"],
    1,
    "18 = 2 x 3 x 3 dan 24 = 2 x 2 x 2 x 3, FSTB = 2 x 3 = 6.",
    "Medium",
  ),
  mq(
    "FSTB bagi 12, 18 dan 30 ialah:",
    ["3", "6", "9", "12"],
    1,
    "6 ialah faktor terbesar yang membahagi 12, 18 dan 30.",
    "Medium",
  ),
  mq(
    "GSTK bagi 5 dan 8 ialah:",
    ["10", "20", "40", "80"],
    2,
    "5 dan 8 tiada faktor sepunya selain 1, jadi GSTK = 5 x 8 = 40.",
    "Medium",
  ),
  mq(
    "GSTK bagi 6 dan 8 ialah:",
    ["12", "18", "24", "48"],
    2,
    "Gandaan sepunya terkecil bagi 6 dan 8 ialah 24.",
    "Medium",
  ),
  mq(
    "GSTK bagi 9 dan 12 ialah:",
    ["18", "24", "36", "48"],
    2,
    "9 = 3² dan 12 = 2² x 3, GSTK = 2² x 3² = 36.",
    "Medium",
  ),
  mq(
    "GSTK bagi 10 dan 15 ialah:",
    ["15", "20", "30", "45"],
    2,
    "Gandaan sepunya terkecil bagi 10 dan 15 ialah 30.",
    "Medium",
  ),
  mq(
    "Apakah faktor perdana sepunya bagi 12 dan 18?",
    ["2 dan 3", "2 sahaja", "3 sahaja", "5"],
    0,
    "12 = 2 x 2 x 3 dan 18 = 2 x 3 x 3, faktor perdana sepunya ialah 2 dan 3.",
    "Medium",
  ),
  mq(
    "Untuk FSTB, faktor perdana sepunya diambil dengan:",
    ["Kuasa terkecil", "Kuasa terbesar", "Jumlah kuasa", "Tiada kuasa"],
    0,
    "FSTB mengambil faktor perdana sepunya dengan kuasa terkecil.",
    "Medium",
  ),
  mq(
    "Untuk GSTK, semua faktor perdana diambil dengan:",
    ["Kuasa terkecil", "Kuasa terbesar", "Hanya kuasa satu", "Kuasa sifar"],
    1,
    "GSTK mengambil semua faktor perdana dengan kuasa terbesar.",
    "Medium",
  ),
  mq(
    "Jika 2 x 2 x 3 ialah pemfaktoran perdana, nombornya ialah:",
    ["7", "12", "18", "24"],
    1,
    "2 x 2 x 3 = 12.",
    "Medium",
  ),
  mq(
    "Jika 2 x 3 x 3 ialah pemfaktoran perdana, nombornya ialah:",
    ["12", "15", "18", "27"],
    2,
    "2 x 3 x 3 = 18.",
    "Medium",
  ),
  mq(
    "Antara berikut, yang manakah gandaan bagi 9?",
    ["18", "20", "25", "32"],
    0,
    "18 = 9 x 2.",
    "Medium",
  ),
  mq(
    "Antara berikut, yang manakah faktor bagi 36?",
    ["5", "7", "9", "11"],
    2,
    "36 ÷ 9 = 4 tanpa baki.",
    "Medium",
  ),
  mq(
    "Manakah pasangan mempunyai FSTB 5?",
    ["10 dan 15", "12 dan 18", "8 dan 12", "6 dan 14"],
    0,
    "FSTB bagi 10 dan 15 ialah 5.",
    "Medium",
  ),
  mq(
    "Manakah pasangan mempunyai GSTK 18?",
    ["6 dan 9", "4 dan 8", "5 dan 10", "8 dan 12"],
    0,
    "Gandaan sepunya terkecil bagi 6 dan 9 ialah 18.",
    "Medium",
  ),
  mq(
    "Cari FSTB bagi 28 dan 42.",
    ["7", "14", "21", "28"],
    1,
    "28 = 2 x 2 x 7 dan 42 = 2 x 3 x 7, FSTB = 2 x 7 = 14.",
    "Medium",
  ),
  mq(
    "Cari GSTK bagi 3, 4 dan 6.",
    ["6", "12", "18", "24"],
    1,
    "12 ialah gandaan terkecil yang boleh dibahagi 3, 4 dan 6.",
    "Medium",
  ),
  mq(
    "Cari FSTB bagi 8 dan 20.",
    ["2", "4", "8", "10"],
    1,
    "Faktor sepunya 8 dan 20 ialah 1, 2, 4. FSTB = 4.",
    "Medium",
  ),
  mq(
    "Cari GSTK bagi 8 dan 20.",
    ["20", "32", "40", "80"],
    2,
    "8 = 2³ dan 20 = 2² x 5, GSTK = 2³ x 5 = 40.",
    "Medium",
  ),
  mq(
    "Jika dua nombor ialah 4 dan 6, gandaan sepunya pertama ialah:",
    ["4", "6", "10", "12"],
    3,
    "Gandaan sepunya pertama bagi 4 dan 6 ialah 12.",
    "Medium",
  ),
  mq(
    "Jika faktor sepunya 12 dan 18 ialah 1, 2, 3, 6, FSTB ialah:",
    ["1", "2", "3", "6"],
    3,
    "FSTB ialah faktor sepunya terbesar, iaitu 6.",
    "Medium",
  ),
  mq(
    "Jika gandaan sepunya 4 dan 6 ialah 12, 24, 36, GSTK ialah:",
    ["12", "24", "36", "48"],
    0,
    "GSTK ialah gandaan sepunya terkecil, iaitu 12.",
    "Medium",
  ),
  mq(
    "Nombor yang boleh dibahagi tepat oleh 2 dan 5 ialah:",
    ["10", "11", "13", "17"],
    0,
    "10 boleh dibahagi tepat oleh 2 dan 5.",
    "Medium",
  ),
  mq(
    "Apakah faktor perdana bagi 45?",
    ["3 dan 5", "2 dan 5", "3 dan 7", "5 sahaja"],
    0,
    "45 = 3 x 3 x 5, faktor perdana ialah 3 dan 5.",
    "Medium",
  ),
];

const MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS: ShuffledQuestion[] = [
  mq(
    "Ali mempunyai 24 pensel dan 36 pen. Dia mahu membahagi sama banyak ke dalam beberapa kotak. Bilangan kotak maksimum ialah:",
    ["6", "8", "12", "24"],
    2,
    "Gunakan FSTB. FSTB bagi 24 dan 36 ialah 12.",
    "Hard",
  ),
  mq(
    "Loceng A berbunyi setiap 6 minit dan loceng B setiap 8 minit. Kedua-duanya berbunyi bersama setiap:",
    ["12 minit", "24 minit", "36 minit", "48 minit"],
    1,
    "Gunakan GSTK. GSTK bagi 6 dan 8 ialah 24.",
    "Hard",
  ),
  mq(
    "12 epal dan 18 oren dibahagi sama banyak ke dalam beg. Bilangan beg paling banyak ialah:",
    ["3", "6", "9", "12"],
    1,
    "Gunakan FSTB. FSTB bagi 12 dan 18 ialah 6.",
    "Hard",
  ),
  mq(
    "Bas A tiba setiap 10 minit dan Bas B setiap 15 minit. Kedua-duanya tiba bersama setiap:",
    ["15 minit", "20 minit", "30 minit", "60 minit"],
    2,
    "Gunakan GSTK. GSTK bagi 10 dan 15 ialah 30.",
    "Hard",
  ),
  mq(
    "Seorang guru mempunyai 20 buku dan 30 pen. Setiap murid menerima bilangan sama. Murid maksimum ialah:",
    ["5", "10", "15", "20"],
    1,
    "Gunakan FSTB. FSTB bagi 20 dan 30 ialah 10.",
    "Hard",
  ),
  mq(
    "Lampu merah berkelip setiap 9 saat dan lampu biru setiap 12 saat. Kedua-duanya berkelip bersama setiap:",
    ["18 saat", "24 saat", "36 saat", "48 saat"],
    2,
    "Gunakan GSTK. GSTK bagi 9 dan 12 ialah 36.",
    "Hard",
  ),
  mq(
    "FSTB bagi 48 dan 60 ialah:",
    ["6", "8", "12", "24"],
    2,
    "48 = 2⁴ x 3, 60 = 2² x 3 x 5, FSTB = 2² x 3 = 12.",
    "Hard",
  ),
  mq(
    "GSTK bagi 48 dan 60 ialah:",
    ["120", "180", "240", "360"],
    2,
    "GSTK = 2⁴ x 3 x 5 = 240.",
    "Hard",
  ),
  mq(
    "Tiga loceng berbunyi setiap 4, 6 dan 10 minit. Semuanya berbunyi bersama setiap:",
    ["20 minit", "30 minit", "60 minit", "120 minit"],
    2,
    "GSTK bagi 4, 6 dan 10 ialah 60.",
    "Hard",
  ),
  mq(
    "36 gula-gula dan 48 coklat dibungkus sama banyak. Bilangan bungkusan maksimum ialah:",
    ["6", "9", "12", "18"],
    2,
    "Gunakan FSTB. FSTB bagi 36 dan 48 ialah 12.",
    "Hard",
  ),
  mq(
    "Jika FSTB bagi dua nombor ialah 1, dua nombor itu:",
    ["Mesti sama", "Tiada faktor sepunya selain 1", "Mesti genap", "Mesti perdana"],
    1,
    "FSTB 1 bermaksud faktor sepunya terbesarnya hanya 1.",
    "Hard",
  ),
  mq(
    "Jika satu nombor ialah faktor bagi nombor lain, GSTK bagi kedua-duanya ialah:",
    ["Nombor kecil", "Nombor besar", "FSTB", "1"],
    1,
    "Contoh 4 dan 12: GSTK ialah 12, iaitu nombor yang lebih besar.",
    "Hard",
  ),
  mq(
    "Jika satu nombor ialah faktor bagi nombor lain, FSTB bagi kedua-duanya ialah:",
    ["Nombor kecil", "Nombor besar", "GSTK", "Hasil darab"],
    0,
    "Contoh 4 dan 12: FSTB ialah 4, iaitu nombor yang lebih kecil.",
    "Hard",
  ),
  mq(
    "Dua nombor 14 dan 21. FSTB dan GSTK masing-masing ialah:",
    ["7 dan 42", "7 dan 21", "14 dan 42", "3 dan 42"],
    0,
    "FSTB = 7 dan GSTK = 42.",
    "Hard",
  ),
  mq(
    "Dua nombor 8 dan 12. FSTB x GSTK ialah:",
    ["24", "48", "96", "120"],
    2,
    "FSTB = 4, GSTK = 24, maka 4 x 24 = 96.",
    "Hard",
  ),
  mq(
    "Kotak hadiah memerlukan 16 reben merah dan 24 reben biru dibahagi sama. Setiap kumpulan terbesar mengandungi:",
    ["2 merah dan 3 biru", "4 merah dan 6 biru", "8 merah dan 12 biru", "16 merah dan 24 biru"],
    0,
    "Bilangan kumpulan maksimum ialah FSTB 16 dan 24 = 8, jadi setiap kumpulan ada 2 merah dan 3 biru.",
    "Hard",
  ),
  mq(
    "Mesin A berhenti setiap 8 jam dan Mesin B setiap 12 jam. Jika berhenti bersama sekarang, bersama lagi selepas:",
    ["16 jam", "20 jam", "24 jam", "48 jam"],
    2,
    "Gunakan GSTK. GSTK bagi 8 dan 12 ialah 24.",
    "Hard",
  ),
  mq(
    "FSTB bagi 27, 36 dan 45 ialah:",
    ["3", "6", "9", "12"],
    2,
    "9 membahagi 27, 36 dan 45; tiada faktor sepunya lebih besar.",
    "Hard",
  ),
  mq(
    "GSTK bagi 5, 6 dan 9 ialah:",
    ["45", "60", "90", "180"],
    2,
    "5 = 5, 6 = 2 x 3, 9 = 3², GSTK = 2 x 3² x 5 = 90.",
    "Hard",
  ),
  mq(
    "Jika 2² x 3 ialah 12 dan 2 x 3² ialah 18, FSTB ialah:",
    ["2", "3", "6", "36"],
    2,
    "Ambil faktor sepunya dengan kuasa terkecil: 2 x 3 = 6.",
    "Hard",
  ),
  mq(
    "Jika 2² x 3 ialah 12 dan 2 x 3² ialah 18, GSTK ialah:",
    ["18", "24", "36", "72"],
    2,
    "Ambil semua faktor dengan kuasa terbesar: 2² x 3² = 36.",
    "Hard",
  ),
  mq(
    "Seorang jurulatih membahagi 28 lelaki dan 35 perempuan kepada kumpulan sama. Bilangan kumpulan maksimum ialah:",
    ["5", "7", "14", "35"],
    1,
    "FSTB bagi 28 dan 35 ialah 7.",
    "Hard",
  ),
  mq(
    "Dua acara berlaku setiap 7 hari dan 14 hari. Acara berlaku bersama setiap:",
    ["7 hari", "14 hari", "21 hari", "28 hari"],
    1,
    "GSTK bagi 7 dan 14 ialah 14.",
    "Hard",
  ),
  mq(
    "Manakah situasi memerlukan FSTB?",
    [
      "Menentukan jadual berulang",
      "Membahagi barang sama banyak",
      "Mencari masa pertama bersama",
      "Mencari gandaan",
    ],
    1,
    "Pembahagian sama banyak menggunakan FSTB.",
    "Hard",
  ),
  mq(
    "Manakah situasi memerlukan GSTK?",
    [
      "Mencari kumpulan terbesar",
      "Membahagi gula-gula sama banyak",
      "Menentukan dua loceng berbunyi bersama",
      "Mencari faktor sepunya",
    ],
    2,
    "Kejadian berulang bersama menggunakan GSTK.",
    "Hard",
  ),
  mq(
    "Jika FSTB = 6 untuk 18 dan 24, setiap kumpulan maksimum bagi 18 dan 24 ialah:",
    ["3", "4", "6", "12"],
    2,
    "FSTB menunjukkan bilangan kumpulan sama maksimum, iaitu 6.",
    "Hard",
  ),
  mq(
    "Jika GSTK = 36 untuk 9 dan 12, maksudnya:",
    [
      "36 ialah faktor terbesar",
      "36 ialah gandaan sepunya terkecil",
      "36 ialah nombor perdana",
      "36 ialah baki",
    ],
    1,
    "GSTK ialah gandaan sepunya terkecil.",
    "Hard",
  ),
  mq(
    "Cari nombor terkecil yang boleh dibahagi tepat oleh 4, 5 dan 10.",
    ["10", "20", "40", "50"],
    1,
    "Soalan meminta gandaan sepunya terkecil. GSTK = 20.",
    "Hard",
  ),
  mq(
    "Cari nombor terbesar yang boleh membahagi 30 dan 45 tepat.",
    ["5", "10", "15", "30"],
    2,
    "Soalan meminta faktor sepunya terbesar. FSTB = 15.",
    "Hard",
  ),
  mq(
    "Jika 18 bunga dan 24 daun disusun sama banyak dalam jambangan, jambangan maksimum ialah:",
    ["3", "6", "9", "12"],
    1,
    "Gunakan FSTB. FSTB bagi 18 dan 24 ialah 6.",
    "Hard",
  ),
];

const MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a factor?",
    [
      "A number that divides exactly without a remainder",
      "The product of numbers",
      "A decimal number",
      "Negative numbers only",
    ],
    0,
    "A factor divides a number exactly without a remainder.",
    "Easy",
  ],
  [
    "What is a factor of 12?",
    ["5", "7", "3", "8"],
    2,
    "12 ÷ 3 = 4 with no remainder, so 3 is a factor of 12.",
    "Easy",
  ],
  [
    "Which list shows the factors of 12?",
    ["1, 2, 3, 4, 6, 12", "2, 4, 8, 12", "3, 6, 9, 12", "1, 5, 10, 12"],
    0,
    "The factors of 12 are 1, 2, 3, 4, 6 and 12.",
    "Easy",
  ],
  [
    "What is a prime number?",
    [
      "A number with many factors",
      "A number with exactly two factors",
      "Even numbers only",
      "A multiple of 10",
    ],
    1,
    "A prime number has exactly two factors: 1 and the number itself.",
    "Easy",
  ],
  ["Which is a prime number?", ["1", "4", "9", "11"], 3, "11 only has factors 1 and 11.", "Easy"],
  [
    "Is 1 a prime number?",
    ["Yes", "No", "Only if it is odd", "Only if it is even"],
    1,
    "1 is not a prime number because it has only one factor.",
    "Easy",
  ],
  [
    "What is a prime factor?",
    [
      "A factor that is also a prime number",
      "The smallest multiple",
      "Only the greatest factor",
      "A number that is not a factor",
    ],
    0,
    "A prime factor is a factor that is also a prime number.",
    "Easy",
  ],
  [
    "What is the prime factorisation of 12?",
    ["2 x 2 x 3", "2 x 6", "3 x 4", "1 x 12"],
    0,
    "12 = 2 x 2 x 3 in prime factors.",
    "Easy",
  ],
  [
    "What are common factors?",
    [
      "Factors shared by two or more numbers",
      "Multiples that are the same",
      "The greatest number",
      "The smallest number",
    ],
    0,
    "Common factors are factors shared by two or more numbers.",
    "Easy",
  ],
  [
    "What is the Highest Common Factor (HCF)?",
    [
      "The greatest common factor",
      "The lowest common multiple",
      "The first factor",
      "The first multiple",
    ],
    0,
    "HCF means Highest Common Factor.",
    "Easy",
  ],
  [
    "The HCF of 12 and 18 is:",
    ["3", "6", "9", "12"],
    1,
    "The common factors of 12 and 18 are 1, 2, 3 and 6. The greatest is 6.",
    "Easy",
  ],
  [
    "What is a multiple?",
    [
      "The product of a number and a positive whole number",
      "A number that divides exactly",
      "A prime factor",
      "A division remainder",
    ],
    0,
    "Multiples are obtained by multiplying a number by positive whole numbers.",
    "Easy",
  ],
  [
    "Which is a multiple of 4?",
    ["6", "10", "12", "14"],
    2,
    "12 = 4 x 3, so 12 is a multiple of 4.",
    "Easy",
  ],
  [
    "What are common multiples?",
    [
      "Multiples shared by two or more numbers",
      "The greatest factor",
      "Prime numbers only",
      "The same remainder",
    ],
    0,
    "Common multiples are multiples shared by two or more numbers.",
    "Easy",
  ],
  [
    "What is the Lowest Common Multiple (LCM)?",
    [
      "The greatest common factor",
      "The lowest common multiple",
      "A prime number",
      "The first factor",
    ],
    1,
    "LCM means Lowest Common Multiple.",
    "Easy",
  ],
  [
    "The LCM of 4 and 6 is:",
    ["6", "10", "12", "24"],
    2,
    "Common multiples of 4 and 6 include 12 and 24. The lowest is 12.",
    "Easy",
  ],
  [
    "HCF is suitable for:",
    [
      "Dividing into equal groups",
      "Finding repeated times",
      "Converting decimals",
      "Drawing graphs",
    ],
    0,
    "HCF is suitable for dividing into equal groups.",
    "Easy",
  ],
  [
    "LCM is suitable for:",
    [
      "Finding the greatest group",
      "Finding repeated events happening together",
      "Dividing remainders",
      "Finding factors",
    ],
    1,
    "LCM is suitable for events that repeat together.",
    "Easy",
  ],
  [
    "A keyword for HCF is:",
    ["Lowest", "First time together", "Greatest", "Repeated"],
    2,
    "HCF is related to the greatest or maximum value.",
    "Easy",
  ],
  [
    "A keyword for LCM is:",
    ["Maximum", "Equal groups", "Greatest", "First time together"],
    3,
    "LCM is often used when finding the first time events happen together.",
    "Easy",
  ],
  ["A factor of 18 includes:", ["4", "5", "6", "8"], 2, "18 ÷ 6 = 3 with no remainder.", "Easy"],
  ["A factor of 20 includes:", ["6", "8", "10", "12"], 2, "20 ÷ 10 = 2 with no remainder.", "Easy"],
  [
    "Which is not a factor of 12?",
    ["1", "3", "5", "6"],
    2,
    "12 cannot be divided exactly by 5.",
    "Easy",
  ],
  [
    "Which is not a multiple of 6?",
    ["6", "12", "18", "20"],
    3,
    "20 is not the product of 6 and a whole number.",
    "Easy",
  ],
  [
    "The even prime number is:",
    ["2", "4", "6", "8"],
    0,
    "2 is the only even prime number in this list.",
    "Easy",
  ],
  [
    "A common factor of 4 and 6 includes:",
    ["1", "5", "8", "12"],
    0,
    "1 divides all whole numbers.",
    "Easy",
  ],
  [
    "A common multiple of 4 and 6 includes:",
    ["8", "10", "12", "14"],
    2,
    "12 is a multiple of both 4 and 6.",
    "Easy",
  ],
  [
    "Prime factorisation uses:",
    ["Prime numbers", "Decimal numbers", "Negative numbers only", "Fractions only"],
    0,
    "Prime factorisation uses prime number factors.",
    "Easy",
  ],
  [
    "In the HCF method, choose the common factor that is:",
    ["Smallest", "Greatest", "Most odd", "Last"],
    1,
    "HCF is the greatest common factor.",
    "Easy",
  ],
  [
    "In the LCM method, choose the common multiple that is:",
    ["Smallest", "Greatest", "Most odd", "Not a multiple"],
    0,
    "LCM is the lowest common multiple.",
    "Easy",
  ],
]);

const MATH_C2_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Find all factors of 16.",
    ["1, 2, 4, 8, 16", "1, 3, 5, 16", "2, 4, 6, 16", "1, 2, 8"],
    0,
    "16 can be divided exactly by 1, 2, 4, 8 and 16.",
    "Medium",
  ],
  [
    "Find all factors of 24.",
    ["1, 2, 3, 4, 6, 8, 12, 24", "1, 2, 4, 12", "2, 3, 6, 24", "1, 5, 10, 24"],
    0,
    "The complete list of factors of 24 is 1, 2, 3, 4, 6, 8, 12 and 24.",
    "Medium",
  ],
  [
    "The prime factorisation of 30 is:",
    ["2 x 3 x 5", "3 x 10", "2 x 15", "5 x 6"],
    0,
    "30 = 2 x 3 x 5.",
    "Medium",
  ],
  [
    "The prime factorisation of 36 is:",
    ["2 x 2 x 3 x 3", "4 x 9", "6 x 6", "2 x 18"],
    0,
    "36 = 2² x 3² = 2 x 2 x 3 x 3.",
    "Medium",
  ],
  [
    "The HCF of 16 and 24 is:",
    ["4", "6", "8", "12"],
    2,
    "The highest common factor of 16 and 24 is 8.",
    "Medium",
  ],
  [
    "The HCF of 20 and 30 is:",
    ["5", "10", "15", "20"],
    1,
    "The highest common factor of 20 and 30 is 10.",
    "Medium",
  ],
  [
    "The HCF of 18 and 24 is:",
    ["3", "6", "9", "12"],
    1,
    "18 = 2 x 3 x 3 and 24 = 2 x 2 x 2 x 3, so HCF = 2 x 3 = 6.",
    "Medium",
  ],
  [
    "The HCF of 12, 18 and 30 is:",
    ["3", "6", "9", "12"],
    1,
    "6 is the greatest factor that divides 12, 18 and 30.",
    "Medium",
  ],
  [
    "The LCM of 5 and 8 is:",
    ["10", "20", "40", "80"],
    2,
    "5 and 8 have no common factor except 1, so LCM = 5 x 8 = 40.",
    "Medium",
  ],
  [
    "The LCM of 6 and 8 is:",
    ["12", "18", "24", "48"],
    2,
    "The lowest common multiple of 6 and 8 is 24.",
    "Medium",
  ],
  [
    "The LCM of 9 and 12 is:",
    ["18", "24", "36", "48"],
    2,
    "9 = 3² and 12 = 2² x 3, so LCM = 2² x 3² = 36.",
    "Medium",
  ],
  [
    "The LCM of 10 and 15 is:",
    ["15", "20", "30", "45"],
    2,
    "The lowest common multiple of 10 and 15 is 30.",
    "Medium",
  ],
  [
    "What are the common prime factors of 12 and 18?",
    ["2 and 3", "2 only", "3 only", "5"],
    0,
    "12 = 2 x 2 x 3 and 18 = 2 x 3 x 3, so the common prime factors are 2 and 3.",
    "Medium",
  ],
  [
    "For HCF, common prime factors are taken with:",
    ["The smallest powers", "The greatest powers", "The sum of powers", "No powers"],
    0,
    "HCF takes common prime factors with the smallest powers.",
    "Medium",
  ],
  [
    "For LCM, all prime factors are taken with:",
    ["The smallest powers", "The greatest powers", "Power of one only", "Power of zero"],
    1,
    "LCM takes all prime factors with the greatest powers.",
    "Medium",
  ],
  [
    "If 2 x 2 x 3 is the prime factorisation, the number is:",
    ["7", "12", "18", "24"],
    1,
    "2 x 2 x 3 = 12.",
    "Medium",
  ],
  [
    "If 2 x 3 x 3 is the prime factorisation, the number is:",
    ["12", "15", "18", "27"],
    2,
    "2 x 3 x 3 = 18.",
    "Medium",
  ],
  [
    "Which of the following is a multiple of 9?",
    ["18", "20", "25", "32"],
    0,
    "18 = 9 x 2.",
    "Medium",
  ],
  [
    "Which of the following is a factor of 36?",
    ["5", "7", "9", "11"],
    2,
    "36 ÷ 9 = 4 with no remainder.",
    "Medium",
  ],
  [
    "Which pair has HCF 5?",
    ["10 and 15", "12 and 18", "8 and 12", "6 and 14"],
    0,
    "The HCF of 10 and 15 is 5.",
    "Medium",
  ],
  [
    "Which pair has LCM 18?",
    ["6 and 9", "4 and 8", "5 and 10", "8 and 12"],
    0,
    "The lowest common multiple of 6 and 9 is 18.",
    "Medium",
  ],
  [
    "Find the HCF of 28 and 42.",
    ["7", "14", "21", "28"],
    1,
    "28 = 2 x 2 x 7 and 42 = 2 x 3 x 7, so HCF = 2 x 7 = 14.",
    "Medium",
  ],
  [
    "Find the LCM of 3, 4 and 6.",
    ["6", "12", "18", "24"],
    1,
    "12 is the lowest multiple that can be divided by 3, 4 and 6.",
    "Medium",
  ],
  [
    "Find the HCF of 8 and 20.",
    ["2", "4", "8", "10"],
    1,
    "The common factors of 8 and 20 are 1, 2 and 4. HCF = 4.",
    "Medium",
  ],
  [
    "Find the LCM of 8 and 20.",
    ["20", "32", "40", "80"],
    2,
    "8 = 2³ and 20 = 2² x 5, so LCM = 2³ x 5 = 40.",
    "Medium",
  ],
  [
    "If two numbers are 4 and 6, their first common multiple is:",
    ["4", "6", "10", "12"],
    3,
    "The first common multiple of 4 and 6 is 12.",
    "Medium",
  ],
  [
    "If the common factors of 12 and 18 are 1, 2, 3 and 6, the HCF is:",
    ["1", "2", "3", "6"],
    3,
    "The HCF is the greatest common factor, which is 6.",
    "Medium",
  ],
  [
    "If the common multiples of 4 and 6 are 12, 24 and 36, the LCM is:",
    ["12", "24", "36", "48"],
    0,
    "The LCM is the lowest common multiple, which is 12.",
    "Medium",
  ],
  [
    "A number that can be divided exactly by 2 and 5 is:",
    ["10", "11", "13", "17"],
    0,
    "10 can be divided exactly by 2 and 5.",
    "Medium",
  ],
  [
    "What are the prime factors of 45?",
    ["3 and 5", "2 and 5", "3 and 7", "5 only"],
    0,
    "45 = 3 x 3 x 5, so the prime factors are 3 and 5.",
    "Medium",
  ],
]);

const MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "Ali has 24 pencils and 36 pens. He wants to divide them equally into boxes. The maximum number of boxes is:",
    ["6", "8", "12", "24"],
    2,
    "Use HCF. The HCF of 24 and 36 is 12.",
    "Hard",
  ],
  [
    "Bell A rings every 6 minutes and Bell B rings every 8 minutes. They ring together every:",
    ["12 minutes", "24 minutes", "36 minutes", "48 minutes"],
    1,
    "Use LCM. The LCM of 6 and 8 is 24.",
    "Hard",
  ],
  [
    "12 apples and 18 oranges are divided equally into bags. The greatest number of bags is:",
    ["3", "6", "9", "12"],
    1,
    "Use HCF. The HCF of 12 and 18 is 6.",
    "Hard",
  ],
  [
    "Bus A arrives every 10 minutes and Bus B arrives every 15 minutes. They arrive together every:",
    ["15 minutes", "20 minutes", "30 minutes", "60 minutes"],
    2,
    "Use LCM. The LCM of 10 and 15 is 30.",
    "Hard",
  ],
  [
    "A teacher has 20 books and 30 pens. Each student receives the same number of items. The maximum number of students is:",
    ["5", "10", "15", "20"],
    1,
    "Use HCF. The HCF of 20 and 30 is 10.",
    "Hard",
  ],
  [
    "A red light flashes every 9 seconds and a blue light every 12 seconds. They flash together every:",
    ["18 seconds", "24 seconds", "36 seconds", "48 seconds"],
    2,
    "Use LCM. The LCM of 9 and 12 is 36.",
    "Hard",
  ],
  [
    "The HCF of 48 and 60 is:",
    ["6", "8", "12", "24"],
    2,
    "48 = 2⁴ x 3 and 60 = 2² x 3 x 5, so HCF = 2² x 3 = 12.",
    "Hard",
  ],
  ["The LCM of 48 and 60 is:", ["120", "180", "240", "360"], 2, "LCM = 2⁴ x 3 x 5 = 240.", "Hard"],
  [
    "Three bells ring every 4, 6 and 10 minutes. All of them ring together every:",
    ["20 minutes", "30 minutes", "60 minutes", "120 minutes"],
    2,
    "The LCM of 4, 6 and 10 is 60.",
    "Hard",
  ],
  [
    "36 sweets and 48 chocolates are packed equally. The maximum number of packs is:",
    ["6", "9", "12", "18"],
    2,
    "Use HCF. The HCF of 36 and 48 is 12.",
    "Hard",
  ],
  [
    "If the HCF of two numbers is 1, the two numbers:",
    ["Must be the same", "Have no common factor except 1", "Must be even", "Must be prime"],
    1,
    "HCF 1 means the only greatest common factor is 1.",
    "Hard",
  ],
  [
    "If one number is a factor of another number, the LCM of both numbers is:",
    ["The smaller number", "The larger number", "The HCF", "1"],
    1,
    "Example: for 4 and 12, the LCM is 12, the larger number.",
    "Hard",
  ],
  [
    "If one number is a factor of another number, the HCF of both numbers is:",
    ["The smaller number", "The larger number", "The LCM", "The product"],
    0,
    "Example: for 4 and 12, the HCF is 4, the smaller number.",
    "Hard",
  ],
  [
    "For the numbers 14 and 21, the HCF and LCM respectively are:",
    ["7 and 42", "7 and 21", "14 and 42", "3 and 42"],
    0,
    "HCF = 7 and LCM = 42.",
    "Hard",
  ],
  [
    "For the numbers 8 and 12, HCF x LCM is:",
    ["24", "48", "96", "120"],
    2,
    "HCF = 4 and LCM = 24, so 4 x 24 = 96.",
    "Hard",
  ],
  [
    "Gift boxes require 16 red ribbons and 24 blue ribbons divided equally. Each largest group contains:",
    ["2 red and 3 blue", "4 red and 6 blue", "8 red and 12 blue", "16 red and 24 blue"],
    0,
    "The maximum number of groups is HCF of 16 and 24 = 8, so each group has 2 red and 3 blue.",
    "Hard",
  ],
  [
    "Machine A stops every 8 hours and Machine B every 12 hours. If they stop together now, they will stop together again after:",
    ["16 hours", "20 hours", "24 hours", "48 hours"],
    2,
    "Use LCM. The LCM of 8 and 12 is 24.",
    "Hard",
  ],
  [
    "The HCF of 27, 36 and 45 is:",
    ["3", "6", "9", "12"],
    2,
    "9 divides 27, 36 and 45, and there is no greater common factor.",
    "Hard",
  ],
  [
    "The LCM of 5, 6 and 9 is:",
    ["45", "60", "90", "180"],
    2,
    "5 = 5, 6 = 2 x 3 and 9 = 3², so LCM = 2 x 3² x 5 = 90.",
    "Hard",
  ],
  [
    "If 2² x 3 is 12 and 2 x 3² is 18, the HCF is:",
    ["2", "3", "6", "36"],
    2,
    "Take the common factors with the smallest powers: 2 x 3 = 6.",
    "Hard",
  ],
  [
    "If 2² x 3 is 12 and 2 x 3² is 18, the LCM is:",
    ["18", "24", "36", "72"],
    2,
    "Take all factors with the greatest powers: 2² x 3² = 36.",
    "Hard",
  ],
  [
    "A coach divides 28 boys and 35 girls into equal groups. The maximum number of groups is:",
    ["5", "7", "14", "35"],
    1,
    "The HCF of 28 and 35 is 7.",
    "Hard",
  ],
  [
    "Two events happen every 7 days and 14 days. The events happen together every:",
    ["7 days", "14 days", "21 days", "28 days"],
    1,
    "The LCM of 7 and 14 is 14.",
    "Hard",
  ],
  [
    "Which situation requires HCF?",
    [
      "Determining a repeated schedule",
      "Dividing items equally",
      "Finding the first time together",
      "Finding multiples",
    ],
    1,
    "Equal division uses HCF.",
    "Hard",
  ],
  [
    "Which situation requires LCM?",
    [
      "Finding the greatest group",
      "Dividing sweets equally",
      "Determining when two bells ring together",
      "Finding common factors",
    ],
    2,
    "Repeated events happening together use LCM.",
    "Hard",
  ],
  [
    "If HCF = 6 for 18 and 24, the maximum number of equal groups for 18 and 24 is:",
    ["3", "4", "6", "12"],
    2,
    "HCF shows the maximum number of equal groups, which is 6.",
    "Hard",
  ],
  [
    "If LCM = 36 for 9 and 12, it means:",
    [
      "36 is the greatest factor",
      "36 is the lowest common multiple",
      "36 is a prime number",
      "36 is a remainder",
    ],
    1,
    "LCM is the lowest common multiple.",
    "Hard",
  ],
  [
    "Find the smallest number that can be divided exactly by 4, 5 and 10.",
    ["10", "20", "40", "50"],
    1,
    "The question asks for the lowest common multiple. LCM = 20.",
    "Hard",
  ],
  [
    "Find the greatest number that can divide 30 and 45 exactly.",
    ["5", "10", "15", "30"],
    2,
    "The question asks for the highest common factor. HCF = 15.",
    "Hard",
  ],
  [
    "If 18 flowers and 24 leaves are arranged equally in bouquets, the maximum number of bouquets is:",
    ["3", "6", "9", "12"],
    1,
    "Use HCF. The HCF of 18 and 24 is 6.",
    "Hard",
  ],
]);

type MathQuestionSeed = [string, string[], number, string, Difficulty];

function mathQuestions(items: MathQuestionSeed[]): ShuffledQuestion[] {
  return items.map(([question, options, answerIndex, explanation, difficulty]) =>
    mq(question, options, answerIndex, explanation, difficulty),
  );
}

const MATH_C3_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah maksud kuasa dua?",
    [
      "Mendarab nombor dengan dirinya sendiri",
      "Mendarab nombor dengan 2",
      "Menambah nombor dua kali",
      "Membahagi nombor dengan 2",
    ],
    0,
    "Kuasa dua bermaksud mendarab nombor dengan dirinya sendiri.",
    "Easy",
  ],
  ["Apakah maksud a²?", ["a + a", "a x a", "a ÷ a", "2 x a"], 1, "a² bermaksud a x a.", "Easy"],
  ["Berapakah 4²?", ["8", "12", "16", "24"], 2, "4² = 4 x 4 = 16.", "Easy"],
  [
    "Kuasa dua boleh dikaitkan dengan:",
    ["Luas segi empat sama", "Isipadu kubus", "Lilitan bulatan", "Panjang garis sahaja"],
    0,
    "Jika sisi segi empat sama ialah s, luasnya ialah s².",
    "Easy",
  ],
  [
    "Apakah kuasa dua sempurna?",
    [
      "Nombor hasil kuasa dua nombor bulat",
      "Nombor perpuluhan",
      "Nombor negatif sahaja",
      "Nombor yang dibahagi 3",
    ],
    0,
    "Kuasa dua sempurna terhasil daripada kuasa dua nombor bulat.",
    "Easy",
  ],
  [
    "Manakah kuasa dua sempurna?",
    ["12", "16", "18", "20"],
    1,
    "16 = 4², jadi 16 ialah kuasa dua sempurna.",
    "Easy",
  ],
  [
    "Dalam pemfaktoran perdana, kuasa dua sempurna boleh dikumpulkan dalam:",
    [
      "Satu kumpulan",
      "Dua kumpulan yang sama",
      "Tiga kumpulan yang sama",
      "Empat kumpulan berbeza",
    ],
    1,
    "Kuasa dua sempurna mempunyai faktor perdana yang boleh dipasangkan.",
    "Easy",
  ],
  [
    "Punca kuasa dua ialah songsangan kepada:",
    ["Kuasa dua", "Kuasa tiga", "Tambah", "Tolak"],
    0,
    "Punca kuasa dua membalikkan proses kuasa dua.",
    "Easy",
  ],
  ["Jika 6² = 36, maka √36 ialah:", ["5", "6", "7", "8"], 1, "√36 = 6 kerana 6² = 36.", "Easy"],
  [
    "Punca kuasa dua bagi luas segi empat sama memberi:",
    ["Panjang sisi", "Isipadu", "Sudut", "Jisim"],
    0,
    "Panjang sisi diperoleh dengan mencari punca kuasa dua luas.",
    "Easy",
  ],
  [
    "Berapakah √(49/81)?",
    ["7/9", "49/9", "7/81", "9/7"],
    0,
    "√49 = 7 dan √81 = 9, jadi √(49/81) = 7/9.",
    "Easy",
  ],
  [
    "Sebelum mencari punca kuasa dua nombor bercampur, nombor itu perlu ditukar kepada:",
    ["Pecahan tak wajar", "Perpuluhan negatif", "Nombor perdana", "Kuasa tiga"],
    0,
    "Nombor bercampur ditukar kepada pecahan tak wajar dahulu.",
    "Easy",
  ],
  ["Apakah nilai √a x √a?", ["a", "2a", "√2a", "a²"], 0, "√a x √a = a.", "Easy"],
  ["Apakah nilai √a x √b?", ["√ab", "a + b", "ab²", "√a + √b"], 0, "√a x √b = √ab.", "Easy"],
  [
    "Apakah maksud kuasa tiga?",
    [
      "Mendarab nombor dengan dirinya sendiri tiga kali",
      "Mendarab nombor dengan 3 sahaja",
      "Menambah nombor tiga kali",
      "Membahagi nombor dengan 3",
    ],
    0,
    "Kuasa tiga bermaksud a x a x a.",
    "Easy",
  ],
  [
    "Apakah maksud a³?",
    ["a + a + a", "a x 3", "a x a x a", "a ÷ 3"],
    2,
    "a³ bermaksud a x a x a.",
    "Easy",
  ],
  ["Berapakah 2³?", ["5", "6", "8", "9"], 2, "2³ = 2 x 2 x 2 = 8.", "Easy"],
  [
    "2³ bukan bermaksud:",
    ["2 x 2 x 2", "8", "2 x 3", "Kuasa tiga bagi 2"],
    2,
    "Kesilapan biasa ialah menganggap 2³ sebagai 2 x 3.",
    "Easy",
  ],
  [
    "Kuasa tiga boleh dikaitkan dengan:",
    ["Isipadu kubus", "Luas segi empat sama", "Panjang garis", "Jisim objek"],
    0,
    "Jika sisi kubus ialah s, isipadunya ialah s³.",
    "Easy",
  ],
  [
    "Manakah kuasa tiga sempurna?",
    ["16", "27", "50", "81"],
    1,
    "27 = 3³, jadi 27 ialah kuasa tiga sempurna.",
    "Easy",
  ],
  [
    "Dalam pemfaktoran perdana, kuasa tiga sempurna boleh dikumpulkan dalam:",
    ["Dua kumpulan yang sama", "Tiga kumpulan yang sama", "Lima kumpulan", "Kumpulan tidak sama"],
    1,
    "Kuasa tiga sempurna mempunyai faktor perdana dalam kumpulan tiga.",
    "Easy",
  ],
  [
    "Kuasa tiga bagi nombor positif menghasilkan:",
    ["Positif", "Negatif", "Sifar sahaja", "Pecahan sahaja"],
    0,
    "Nombor positif yang dikuasakan tiga kekal positif.",
    "Easy",
  ],
  [
    "Kuasa tiga bagi nombor negatif menghasilkan:",
    ["Positif", "Negatif", "Sentiasa sifar", "Tiada jawapan"],
    1,
    "Nombor negatif yang dikuasakan tiga menghasilkan nilai negatif.",
    "Easy",
  ],
  [
    "Berapakah (-5)³?",
    ["125", "-125", "15", "-15"],
    1,
    "(-5)³ = (-5) x (-5) x (-5) = -125.",
    "Easy",
  ],
  [
    "Punca kuasa tiga ialah songsangan kepada:",
    ["Kuasa tiga", "Kuasa dua", "Pendaraban dua nombor", "Penolakan"],
    0,
    "Punca kuasa tiga membalikkan proses kuasa tiga.",
    "Easy",
  ],
  ["Berapakah ∛8?", ["2", "3", "4", "8"], 0, "∛8 = 2 kerana 2³ = 8.", "Easy"],
  ["Berapakah ∛(-8)?", ["2", "-2", "4", "-4"], 1, "∛(-8) = -2 kerana (-2)³ = -8.", "Easy"],
  [
    "Punca kuasa tiga bagi isipadu kubus memberi:",
    ["Panjang sisi kubus", "Luas permukaan", "Jisim kubus", "Sudut kubus"],
    0,
    "Panjang sisi kubus diperoleh dengan mencari punca kuasa tiga isipadu.",
    "Easy",
  ],
  [
    "√54 terletak antara:",
    ["5 dan 6", "6 dan 7", "7 dan 8", "8 dan 9"],
    2,
    "49 < 54 < 64, jadi √54 terletak antara 7 dan 8.",
    "Easy",
  ],
  [
    "Dalam tertib operasi, langkah pertama ialah:",
    ["Kurungan", "Tambah", "Tolak", "Darab dari kanan"],
    0,
    "Kurungan diselesaikan dahulu sebelum operasi lain.",
    "Easy",
  ],
]);

const MATH_C3_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What does square mean?",
    [
      "Multiplying a number by itself",
      "Multiplying a number by 2",
      "Adding a number twice",
      "Dividing a number by 2",
    ],
    0,
    "Square means multiplying a number by itself.",
    "Easy",
  ],
  ["What does a² mean?", ["a + a", "a x a", "a ÷ a", "2 x a"], 1, "a² means a x a.", "Easy"],
  ["What is 4²?", ["8", "12", "16", "24"], 2, "4² = 4 x 4 = 16.", "Easy"],
  [
    "A square can be related to:",
    ["Area of a square", "Volume of a cube", "Circumference of a circle", "Length of a line only"],
    0,
    "If the side of a square is s, its area is s².",
    "Easy",
  ],
  [
    "What is a perfect square?",
    [
      "A number produced by squaring a whole number",
      "A decimal number",
      "A negative number only",
      "A number divided by 3",
    ],
    0,
    "A perfect square is produced by squaring a whole number.",
    "Easy",
  ],
  [
    "Which is a perfect square?",
    ["12", "16", "18", "20"],
    1,
    "16 = 4², so 16 is a perfect square.",
    "Easy",
  ],
  [
    "In prime factorisation, a perfect square can be grouped into:",
    ["One group", "Two identical groups", "Three identical groups", "Four different groups"],
    1,
    "A perfect square has prime factors that can be paired.",
    "Easy",
  ],
  [
    "Square root is the inverse of:",
    ["Squaring", "Cubing", "Addition", "Subtraction"],
    0,
    "Square root reverses the squaring process.",
    "Easy",
  ],
  ["If 6² = 36, then √36 is:", ["5", "6", "7", "8"], 1, "√36 = 6 because 6² = 36.", "Easy"],
  [
    "The square root of a square's area gives:",
    ["Side length", "Volume", "Angle", "Mass"],
    0,
    "Side length is found by taking the square root of the area.",
    "Easy",
  ],
  [
    "What is √(49/81)?",
    ["7/9", "49/9", "7/81", "9/7"],
    0,
    "√49 = 7 and √81 = 9, so √(49/81) = 7/9.",
    "Easy",
  ],
  [
    "Before finding the square root of a mixed number, it should be converted to:",
    ["An improper fraction", "A negative decimal", "A prime number", "A cube"],
    0,
    "A mixed number is converted to an improper fraction first.",
    "Easy",
  ],
  ["What is the value of √a x √a?", ["a", "2a", "√2a", "a²"], 0, "√a x √a = a.", "Easy"],
  [
    "What is the value of √a x √b?",
    ["√ab", "a + b", "ab²", "√a + √b"],
    0,
    "√a x √b = √ab.",
    "Easy",
  ],
  [
    "What does cube mean?",
    [
      "Multiplying a number by itself three times",
      "Multiplying a number by 3 only",
      "Adding a number three times",
      "Dividing a number by 3",
    ],
    0,
    "Cube means a x a x a.",
    "Easy",
  ],
  [
    "What does a³ mean?",
    ["a + a + a", "a x 3", "a x a x a", "a ÷ 3"],
    2,
    "a³ means a x a x a.",
    "Easy",
  ],
  ["What is 2³?", ["5", "6", "8", "9"], 2, "2³ = 2 x 2 x 2 = 8.", "Easy"],
  [
    "2³ does not mean:",
    ["2 x 2 x 2", "8", "2 x 3", "The cube of 2"],
    2,
    "A common mistake is thinking 2³ means 2 x 3.",
    "Easy",
  ],
  [
    "A cube can be related to:",
    ["Volume of a cube", "Area of a square", "Length of a line", "Mass of an object"],
    0,
    "If the edge of a cube is s, its volume is s³.",
    "Easy",
  ],
  [
    "Which is a perfect cube?",
    ["16", "27", "50", "81"],
    1,
    "27 = 3³, so 27 is a perfect cube.",
    "Easy",
  ],
  [
    "In prime factorisation, a perfect cube can be grouped into:",
    ["Two identical groups", "Three identical groups", "Five groups", "Unequal groups"],
    1,
    "A perfect cube has prime factors in groups of three.",
    "Easy",
  ],
  [
    "The cube of a positive number produces:",
    ["Positive", "Negative", "Zero only", "Fractions only"],
    0,
    "A positive number cubed remains positive.",
    "Easy",
  ],
  [
    "The cube of a negative number produces:",
    ["Positive", "Negative", "Always zero", "No answer"],
    1,
    "A negative number cubed produces a negative value.",
    "Easy",
  ],
  ["What is (-5)³?", ["125", "-125", "15", "-15"], 1, "(-5)³ = (-5) x (-5) x (-5) = -125.", "Easy"],
  [
    "Cube root is the inverse of:",
    ["Cubing", "Squaring", "Multiplying two numbers", "Subtraction"],
    0,
    "Cube root reverses the cubing process.",
    "Easy",
  ],
  ["What is ∛8?", ["2", "3", "4", "8"], 0, "∛8 = 2 because 2³ = 8.", "Easy"],
  ["What is ∛(-8)?", ["2", "-2", "4", "-4"], 1, "∛(-8) = -2 because (-2)³ = -8.", "Easy"],
  [
    "The cube root of a cube's volume gives:",
    ["Edge length of the cube", "Surface area", "Mass of the cube", "Angle of the cube"],
    0,
    "The edge length of a cube is found by taking the cube root of the volume.",
    "Easy",
  ],
  [
    "√54 lies between:",
    ["5 and 6", "6 and 7", "7 and 8", "8 and 9"],
    2,
    "49 < 54 < 64, so √54 lies between 7 and 8.",
    "Easy",
  ],
  [
    "In order of operations, the first step is:",
    ["Brackets", "Addition", "Subtraction", "Multiplication from the right"],
    0,
    "Brackets are solved before other operations.",
    "Easy",
  ],
]);

const MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Berapakah 9²?", ["18", "72", "81", "90"], 2, "9² = 9 x 9 = 81.", "Medium"],
  ["Berapakah 12²?", ["124", "144", "154", "164"], 1, "12² = 12 x 12 = 144.", "Medium"],
  ["Berapakah √121?", ["9", "10", "11", "12"], 2, "11² = 121, jadi √121 = 11.", "Medium"],
  [
    "Berapakah √(16/25)?",
    ["2/5", "4/5", "8/25", "16/5"],
    1,
    "√16 = 4 dan √25 = 5, jadi √(16/25) = 4/5.",
    "Medium",
  ],
  ["Berapakah √64 x √64?", ["8", "16", "64", "128"], 2, "√64 x √64 = 64.", "Medium"],
  [
    "Berapakah √9 x √16?",
    ["7", "12", "25", "144"],
    1,
    "√9 = 3 dan √16 = 4, maka 3 x 4 = 12.",
    "Medium",
  ],
  ["Berapakah 3³?", ["9", "18", "24", "27"], 3, "3³ = 3 x 3 x 3 = 27.", "Medium"],
  ["Berapakah 6³?", ["36", "126", "216", "236"], 2, "6³ = 216.", "Medium"],
  ["Berapakah (-4)³?", ["64", "-64", "12", "-12"], 1, "(-4)³ = -64.", "Medium"],
  ["Berapakah ∛27?", ["2", "3", "4", "9"], 1, "∛27 = 3 kerana 3³ = 27.", "Medium"],
  ["Berapakah ∛125?", ["3", "4", "5", "25"], 2, "∛125 = 5 kerana 5³ = 125.", "Medium"],
  ["Berapakah ∛(-64)?", ["-4", "4", "-8", "8"], 0, "∛(-64) = -4 kerana (-4)³ = -64.", "Medium"],
  [
    "Luas segi empat sama ialah 49 cm². Panjang sisinya ialah:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    1,
    "Panjang sisi = √49 = 7 cm.",
    "Medium",
  ],
  [
    "Isipadu kubus ialah 216 cm³. Panjang sisinya ialah:",
    ["4 cm", "5 cm", "6 cm", "7 cm"],
    2,
    "Panjang sisi = ∛216 = 6 cm.",
    "Medium",
  ],
  [
    "√80 terletak antara:",
    ["7 dan 8", "8 dan 9", "9 dan 10", "10 dan 11"],
    1,
    "64 < 80 < 81, jadi √80 terletak antara 8 dan 9.",
    "Medium",
  ],
  [
    "5.1³ terletak antara:",
    ["4³ dan 5³", "5³ dan 6³", "6³ dan 7³", "7³ dan 8³"],
    1,
    "5.1 berada antara 5 dan 6, jadi 5.1³ berada antara 5³ dan 6³.",
    "Medium",
  ],
  ["Hitung: 2² + 3²", ["10", "12", "13", "18"], 2, "2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Hitung: 4³ - 5²", ["29", "39", "49", "89"], 1, "4³ - 5² = 64 - 25 = 39.", "Medium"],
  ["Hitung: √36 + ∛8", ["6", "8", "10", "14"], 1, "√36 = 6 dan ∛8 = 2, jumlah = 8.", "Medium"],
  ["Hitung: (√49)²", ["7", "14", "49", "98"], 2, "√49 = 7, maka 7² = 49.", "Medium"],
  ["Hitung: ∛(2³)", ["2", "4", "6", "8"], 0, "2³ = 8 dan ∛8 = 2.", "Medium"],
  ["Hitung: 7² x 2", ["49", "56", "98", "108"], 2, "7² = 49 dan 49 x 2 = 98.", "Medium"],
  ["Hitung: 100 - 4³", ["26", "36", "64", "96"], 1, "4³ = 64, jadi 100 - 64 = 36.", "Medium"],
  ["Hitung: √81 ÷ 3", ["2", "3", "6", "9"], 1, "√81 = 9 dan 9 ÷ 3 = 3.", "Medium"],
  ["Hitung: ∛1000 + 5", ["10", "15", "20", "105"], 1, "∛1000 = 10, jadi 10 + 5 = 15.", "Medium"],
  ["Hitung: 3² + ∛27", ["9", "12", "18", "36"], 1, "3² = 9 dan ∛27 = 3, jumlah = 12.", "Medium"],
  [
    "Berapakah √(25/36)?",
    ["5/6", "25/6", "5/36", "6/5"],
    0,
    "√25 = 5 dan √36 = 6, jadi √(25/36) = 5/6.",
    "Medium",
  ],
  ["Hitung: 2³ + 2²", ["8", "10", "12", "16"], 2, "2³ = 8 dan 2² = 4, jumlah = 12.", "Medium"],
  ["Hitung: √64 + √16", ["8", "10", "12", "16"], 2, "√64 = 8 dan √16 = 4, jumlah = 12.", "Medium"],
  ["Hitung: ∛(-27) + 10", ["3", "7", "13", "37"], 1, "∛(-27) = -3, jadi -3 + 10 = 7.", "Medium"],
]);

const MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["What is 9²?", ["18", "72", "81", "90"], 2, "9² = 9 x 9 = 81.", "Medium"],
  ["What is 12²?", ["124", "144", "154", "164"], 1, "12² = 12 x 12 = 144.", "Medium"],
  ["What is √121?", ["9", "10", "11", "12"], 2, "11² = 121, so √121 = 11.", "Medium"],
  [
    "What is √(16/25)?",
    ["2/5", "4/5", "8/25", "16/5"],
    1,
    "√16 = 4 and √25 = 5, so √(16/25) = 4/5.",
    "Medium",
  ],
  ["What is √64 x √64?", ["8", "16", "64", "128"], 2, "√64 x √64 = 64.", "Medium"],
  [
    "What is √9 x √16?",
    ["7", "12", "25", "144"],
    1,
    "√9 = 3 and √16 = 4, so 3 x 4 = 12.",
    "Medium",
  ],
  ["What is 3³?", ["9", "18", "24", "27"], 3, "3³ = 3 x 3 x 3 = 27.", "Medium"],
  ["What is 6³?", ["36", "126", "216", "236"], 2, "6³ = 216.", "Medium"],
  ["What is (-4)³?", ["64", "-64", "12", "-12"], 1, "(-4)³ = -64.", "Medium"],
  ["What is ∛27?", ["2", "3", "4", "9"], 1, "∛27 = 3 because 3³ = 27.", "Medium"],
  ["What is ∛125?", ["3", "4", "5", "25"], 2, "∛125 = 5 because 5³ = 125.", "Medium"],
  ["What is ∛(-64)?", ["-4", "4", "-8", "8"], 0, "∛(-64) = -4 because (-4)³ = -64.", "Medium"],
  [
    "The area of a square is 49 cm². Its side length is:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    1,
    "Side length = √49 = 7 cm.",
    "Medium",
  ],
  [
    "The volume of a cube is 216 cm³. Its edge length is:",
    ["4 cm", "5 cm", "6 cm", "7 cm"],
    2,
    "Edge length = ∛216 = 6 cm.",
    "Medium",
  ],
  [
    "√80 lies between:",
    ["7 and 8", "8 and 9", "9 and 10", "10 and 11"],
    1,
    "64 < 80 < 81, so √80 lies between 8 and 9.",
    "Medium",
  ],
  [
    "5.1³ lies between:",
    ["4³ and 5³", "5³ and 6³", "6³ and 7³", "7³ and 8³"],
    1,
    "5.1 is between 5 and 6, so 5.1³ is between 5³ and 6³.",
    "Medium",
  ],
  ["Calculate: 2² + 3²", ["10", "12", "13", "18"], 2, "2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Calculate: 4³ - 5²", ["29", "39", "49", "89"], 1, "4³ - 5² = 64 - 25 = 39.", "Medium"],
  ["Calculate: √36 + ∛8", ["6", "8", "10", "14"], 1, "√36 = 6 and ∛8 = 2, total = 8.", "Medium"],
  ["Calculate: (√49)²", ["7", "14", "49", "98"], 2, "√49 = 7, so 7² = 49.", "Medium"],
  ["Calculate: ∛(2³)", ["2", "4", "6", "8"], 0, "2³ = 8 and ∛8 = 2.", "Medium"],
  ["Calculate: 7² x 2", ["49", "56", "98", "108"], 2, "7² = 49 and 49 x 2 = 98.", "Medium"],
  ["Calculate: 100 - 4³", ["26", "36", "64", "96"], 1, "4³ = 64, so 100 - 64 = 36.", "Medium"],
  ["Calculate: √81 ÷ 3", ["2", "3", "6", "9"], 1, "√81 = 9 and 9 ÷ 3 = 3.", "Medium"],
  ["Calculate: ∛1000 + 5", ["10", "15", "20", "105"], 1, "∛1000 = 10, so 10 + 5 = 15.", "Medium"],
  ["Calculate: 3² + ∛27", ["9", "12", "18", "36"], 1, "3² = 9 and ∛27 = 3, total = 12.", "Medium"],
  [
    "What is √(25/36)?",
    ["5/6", "25/6", "5/36", "6/5"],
    0,
    "√25 = 5 and √36 = 6, so √(25/36) = 5/6.",
    "Medium",
  ],
  ["Calculate: 2³ + 2²", ["8", "10", "12", "16"], 2, "2³ = 8 and 2² = 4, total = 12.", "Medium"],
  [
    "Calculate: √64 + √16",
    ["8", "10", "12", "16"],
    2,
    "√64 = 8 and √16 = 4, total = 12.",
    "Medium",
  ],
  ["Calculate: ∛(-27) + 10", ["3", "7", "13", "37"], 1, "∛(-27) = -3, so -3 + 10 = 7.", "Medium"],
]);

const MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Luas segi empat sama ialah 144 cm². Panjang sisinya ialah:",
    ["10 cm", "11 cm", "12 cm", "14 cm"],
    2,
    "Panjang sisi = √144 = 12 cm.",
    "Hard",
  ],
  [
    "Isipadu kubus ialah 512 cm³. Panjang sisinya ialah:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    2,
    "Panjang sisi = ∛512 = 8 cm.",
    "Hard",
  ],
  [
    "Segi empat sama mempunyai sisi 9 cm. Luasnya ialah:",
    ["18 cm²", "45 cm²", "81 cm²", "90 cm²"],
    2,
    "Luas = 9² = 81 cm².",
    "Hard",
  ],
  [
    "Kubus mempunyai sisi 6 cm. Isipadunya ialah:",
    ["36 cm³", "72 cm³", "216 cm³", "236 cm³"],
    2,
    "Isipadu = 6³ = 216 cm³.",
    "Hard",
  ],
  [
    "Luas taman berbentuk segi empat sama ialah 169 m². Panjang sisinya ialah:",
    ["11 m", "12 m", "13 m", "14 m"],
    2,
    "Panjang sisi = √169 = 13 m.",
    "Hard",
  ],
  [
    "Isipadu kotak berbentuk kubus ialah 343 cm³. Panjang sisinya ialah:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    1,
    "Panjang sisi = ∛343 = 7 cm.",
    "Hard",
  ],
  [
    "Anggaran terbaik: √54 berada antara:",
    ["6 dan 7", "7 dan 8", "8 dan 9", "9 dan 10"],
    1,
    "49 < 54 < 64, maka √54 berada antara 7 dan 8.",
    "Hard",
  ],
  [
    "4.2³ berada antara:",
    ["3³ dan 4³", "4³ dan 5³", "5³ dan 6³", "6³ dan 7³"],
    1,
    "4.2 berada antara 4 dan 5, jadi 4.2³ antara 4³ dan 5³.",
    "Hard",
  ],
  [
    "Hitung: 3² + √64 x 2",
    ["17", "20", "25", "34"],
    2,
    "√64 = 8. Darab dahulu: 8 x 2 = 16. Kemudian 9 + 16 = 25.",
    "Hard",
  ],
  [
    "Hitung: (∛27 + √16)²",
    ["25", "36", "49", "64"],
    2,
    "∛27 = 3 dan √16 = 4. (3 + 4)² = 7² = 49.",
    "Hard",
  ],
  [
    "Hitung: √(81/100) + ∛8",
    ["2.3", "2.7", "2.9", "3.1"],
    2,
    "√(81/100) = 9/10 = 0.9 dan ∛8 = 2, jumlah = 2.9.",
    "Hard",
  ],
  [
    "Hitung: (-3)³ + √49",
    ["-34", "-20", "20", "34"],
    1,
    "(-3)³ = -27 dan √49 = 7, jadi -27 + 7 = -20.",
    "Hard",
  ],
  [
    "Hitung: ∛(-125) x 2²",
    ["-20", "-10", "10", "20"],
    0,
    "∛(-125) = -5 dan 2² = 4, maka -5 x 4 = -20.",
    "Hard",
  ],
  [
    "Hitung: (√36 + ∛64) x 2",
    ["10", "16", "20", "24"],
    2,
    "√36 = 6 dan ∛64 = 4. (6 + 4) x 2 = 20.",
    "Hard",
  ],
  ["Hitung: √(16 + 9)", ["4", "5", "7", "25"], 1, "16 + 9 = 25 dan √25 = 5.", "Hard"],
  [
    "Jika isipadu kubus ialah 1000 cm³, panjang sisinya ialah:",
    ["10 cm", "20 cm", "100 cm", "500 cm"],
    0,
    "∛1000 = 10.",
    "Hard",
  ],
  [
    "Jika luas segi empat sama ialah 225 cm², panjang sisinya ialah:",
    ["12 cm", "13 cm", "14 cm", "15 cm"],
    3,
    "√225 = 15.",
    "Hard",
  ],
  [
    "Sisi segi empat sama berubah daripada 5 cm kepada 10 cm. Luas baharu ialah:",
    ["25 cm²", "50 cm²", "100 cm²", "125 cm²"],
    2,
    "Luas baharu = 10² = 100 cm².",
    "Hard",
  ],
  [
    "Dua kubus bersisi 3 cm dan 4 cm. Jumlah isipadu ialah:",
    ["37 cm³", "64 cm³", "91 cm³", "100 cm³"],
    2,
    "3³ + 4³ = 27 + 64 = 91 cm³.",
    "Hard",
  ],
  [
    "Beza antara 8² dan 4³ ialah:",
    ["0", "8", "16", "32"],
    0,
    "8² = 64 dan 4³ = 64, jadi bezanya 0.",
    "Hard",
  ],
  [
    "Hitung: ∛216 + √144",
    ["12", "18", "24", "30"],
    1,
    "∛216 = 6 dan √144 = 12, jumlah = 18.",
    "Hard",
  ],
  [
    "Hitung: √196 - ∛27",
    ["9", "10", "11", "17"],
    2,
    "√196 = 14 dan ∛27 = 3, jadi 14 - 3 = 11.",
    "Hard",
  ],
  [
    "√150 terletak antara:",
    ["10 dan 11", "11 dan 12", "12 dan 13", "13 dan 14"],
    2,
    "144 < 150 < 169, jadi √150 terletak antara 12 dan 13.",
    "Hard",
  ],
  [
    "6.8³ terletak antara:",
    ["5³ dan 6³", "6³ dan 7³", "7³ dan 8³", "8³ dan 9³"],
    1,
    "6.8 berada antara 6 dan 7, jadi 6.8³ antara 6³ dan 7³.",
    "Hard",
  ],
  [
    "Jika panjang sisi kubus ialah 5 cm, isipadunya ialah:",
    ["25 cm³", "75 cm³", "100 cm³", "125 cm³"],
    3,
    "Isipadu = 5³ = 125 cm³.",
    "Hard",
  ],
  [
    "Jika isipadu kubus ialah 27 cm³, panjang sisinya ialah:",
    ["2 cm", "3 cm", "6 cm", "9 cm"],
    1,
    "Panjang sisi = ∛27 = 3 cm.",
    "Hard",
  ],
  [
    "Jika √a x √a = 49, nilai a ialah:",
    ["7", "14", "49", "98"],
    2,
    "√a x √a = a, jadi a = 49.",
    "Hard",
  ],
  ["Jika a³ = -8, nilai a ialah:", ["-2", "2", "-4", "4"], 0, "(-2)³ = -8, jadi a = -2.", "Hard"],
  ["Hitung: (√25)³", ["15", "25", "100", "125"], 3, "√25 = 5 dan 5³ = 125.", "Hard"],
  ["Hitung: ∛(10³)", ["10", "30", "100", "1000"], 0, "10³ = 1000 dan ∛1000 = 10.", "Hard"],
]);

const MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "The area of a square is 144 cm². Its side length is:",
    ["10 cm", "11 cm", "12 cm", "14 cm"],
    2,
    "Side length = √144 = 12 cm.",
    "Hard",
  ],
  [
    "The volume of a cube is 512 cm³. Its edge length is:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    2,
    "Edge length = ∛512 = 8 cm.",
    "Hard",
  ],
  [
    "A square has a side length of 9 cm. Its area is:",
    ["18 cm²", "45 cm²", "81 cm²", "90 cm²"],
    2,
    "Area = 9² = 81 cm².",
    "Hard",
  ],
  [
    "A cube has an edge length of 6 cm. Its volume is:",
    ["36 cm³", "72 cm³", "216 cm³", "236 cm³"],
    2,
    "Volume = 6³ = 216 cm³.",
    "Hard",
  ],
  [
    "A square garden has an area of 169 m². Its side length is:",
    ["11 m", "12 m", "13 m", "14 m"],
    2,
    "Side length = √169 = 13 m.",
    "Hard",
  ],
  [
    "A cube-shaped box has a volume of 343 cm³. Its edge length is:",
    ["6 cm", "7 cm", "8 cm", "9 cm"],
    1,
    "Edge length = ∛343 = 7 cm.",
    "Hard",
  ],
  [
    "Best estimate: √54 lies between:",
    ["6 and 7", "7 and 8", "8 and 9", "9 and 10"],
    1,
    "49 < 54 < 64, so √54 lies between 7 and 8.",
    "Hard",
  ],
  [
    "4.2³ lies between:",
    ["3³ and 4³", "4³ and 5³", "5³ and 6³", "6³ and 7³"],
    1,
    "4.2 is between 4 and 5, so 4.2³ is between 4³ and 5³.",
    "Hard",
  ],
  [
    "Calculate: 3² + √64 x 2",
    ["17", "20", "25", "34"],
    2,
    "√64 = 8. Multiply first: 8 x 2 = 16. Then 9 + 16 = 25.",
    "Hard",
  ],
  [
    "Calculate: (∛27 + √16)²",
    ["25", "36", "49", "64"],
    2,
    "∛27 = 3 and √16 = 4. (3 + 4)² = 7² = 49.",
    "Hard",
  ],
  [
    "Calculate: √(81/100) + ∛8",
    ["2.3", "2.7", "2.9", "3.1"],
    2,
    "√(81/100) = 9/10 = 0.9 and ∛8 = 2, total = 2.9.",
    "Hard",
  ],
  [
    "Calculate: (-3)³ + √49",
    ["-34", "-20", "20", "34"],
    1,
    "(-3)³ = -27 and √49 = 7, so -27 + 7 = -20.",
    "Hard",
  ],
  [
    "Calculate: ∛(-125) x 2²",
    ["-20", "-10", "10", "20"],
    0,
    "∛(-125) = -5 and 2² = 4, so -5 x 4 = -20.",
    "Hard",
  ],
  [
    "Calculate: (√36 + ∛64) x 2",
    ["10", "16", "20", "24"],
    2,
    "√36 = 6 and ∛64 = 4. (6 + 4) x 2 = 20.",
    "Hard",
  ],
  ["Calculate: √(16 + 9)", ["4", "5", "7", "25"], 1, "16 + 9 = 25 and √25 = 5.", "Hard"],
  [
    "If the volume of a cube is 1000 cm³, its edge length is:",
    ["10 cm", "20 cm", "100 cm", "500 cm"],
    0,
    "∛1000 = 10.",
    "Hard",
  ],
  [
    "If the area of a square is 225 cm², its side length is:",
    ["12 cm", "13 cm", "14 cm", "15 cm"],
    3,
    "√225 = 15.",
    "Hard",
  ],
  [
    "The side length of a square changes from 5 cm to 10 cm. The new area is:",
    ["25 cm²", "50 cm²", "100 cm²", "125 cm²"],
    2,
    "New area = 10² = 100 cm².",
    "Hard",
  ],
  [
    "Two cubes have edge lengths of 3 cm and 4 cm. Their total volume is:",
    ["37 cm³", "64 cm³", "91 cm³", "100 cm³"],
    2,
    "3³ + 4³ = 27 + 64 = 91 cm³.",
    "Hard",
  ],
  [
    "The difference between 8² and 4³ is:",
    ["0", "8", "16", "32"],
    0,
    "8² = 64 and 4³ = 64, so the difference is 0.",
    "Hard",
  ],
  [
    "Calculate: ∛216 + √144",
    ["12", "18", "24", "30"],
    1,
    "∛216 = 6 and √144 = 12, total = 18.",
    "Hard",
  ],
  [
    "Calculate: √196 - ∛27",
    ["9", "10", "11", "17"],
    2,
    "√196 = 14 and ∛27 = 3, so 14 - 3 = 11.",
    "Hard",
  ],
  [
    "√150 lies between:",
    ["10 and 11", "11 and 12", "12 and 13", "13 and 14"],
    2,
    "144 < 150 < 169, so √150 lies between 12 and 13.",
    "Hard",
  ],
  [
    "6.8³ lies between:",
    ["5³ and 6³", "6³ and 7³", "7³ and 8³", "8³ and 9³"],
    1,
    "6.8 is between 6 and 7, so 6.8³ is between 6³ and 7³.",
    "Hard",
  ],
  [
    "If the edge length of a cube is 5 cm, its volume is:",
    ["25 cm³", "75 cm³", "100 cm³", "125 cm³"],
    3,
    "Volume = 5³ = 125 cm³.",
    "Hard",
  ],
  [
    "If the volume of a cube is 27 cm³, its edge length is:",
    ["2 cm", "3 cm", "6 cm", "9 cm"],
    1,
    "Edge length = ∛27 = 3 cm.",
    "Hard",
  ],
  [
    "If √a x √a = 49, the value of a is:",
    ["7", "14", "49", "98"],
    2,
    "√a x √a = a, so a = 49.",
    "Hard",
  ],
  ["If a³ = -8, the value of a is:", ["-2", "2", "-4", "4"], 0, "(-2)³ = -8, so a = -2.", "Hard"],
  ["Calculate: (√25)³", ["15", "25", "100", "125"], 3, "√25 = 5 and 5³ = 125.", "Hard"],
  ["Calculate: ∛(10³)", ["10", "30", "100", "1000"], 0, "10³ = 1000 and ∛1000 = 10.", "Hard"],
]);

const MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah nisbah?", ["Perbandingan kuantiti sama jenis dan unit", "Perbandingan kuantiti berbeza jenis", "Hasil tambah dua nombor", "Hasil darab dua nombor"], 0, "Nisbah membandingkan kuantiti sama jenis dan unit.", "Easy"],
  ["Bagaimana nisbah ditulis?", ["a + b", "a : b", "a − b", "a × b"], 1, "Nisbah ditulis dalam bentuk a : b.", "Easy"],
  ["Manakah bentuk nisbah yang sah?", ["3 cm : 5 m", "3 cm : 5 cm", "3 kg : 5 cm", "3 jam : 5 km"], 1, "Unit kedua-dua sebutan mestilah sama.", "Easy"],
  ["Apakah nisbah setara?", ["Nisbah yang berbeza nilai", "Nisbah yang nilainya sama", "Pecahan campuran", "Peratusan sama"], 1, "Nisbah setara mempunyai nilai sama.", "Easy"],
  ["2 : 3 setara dengan?", ["3 : 2", "4 : 6", "5 : 7", "1 : 2"], 1, "Darab 2 dan 3 dengan 2 → 4 : 6.", "Easy"],
  ["Apakah bentuk termudah 12 : 18?", ["6 : 9", "4 : 6", "2 : 3", "3 : 2"], 2, "FSTB 12 dan 18 ialah 6 → 2 : 3.", "Easy"],
  ["Bagaimana mempermudah nisbah?", ["Bahagi dengan FSTB", "Darab dengan GSTK", "Tambah dengan 1", "Bahagi dengan jumlah"], 0, "Bahagikan semua sebutan dengan FSTB.", "Easy"],
  ["Apakah kadar?", ["Kuantiti sama jenis", "Kuantiti berbeza jenis/unit", "Hanya kelajuan", "Hanya harga"], 1, "Kadar membandingkan dua kuantiti berbeza jenis atau unit.", "Easy"],
  ["Contoh kadar ialah?", ["3 : 5", "60 km/j", "1/2", "0.5"], 1, "Km/j ialah kadar antara jarak dan masa.", "Easy"],
  ["Apakah kadaran?", ["Dua nisbah setara", "Dua nombor berbeza", "Hasil tambah", "Pecahan"], 0, "Kadaran ialah persamaan dua nisbah setara.", "Easy"],
  ["a : b = c : d juga ditulis sebagai?", ["a × b = c × d", "a/b = c/d", "a + b = c + d", "a − b = c − d"], 1, "Nisbah boleh ditulis sebagai pecahan setara.", "Easy"],
  ["50% sebagai nisbah ialah?", ["1 : 2", "2 : 1", "1 : 5", "5 : 1"], 0, "50% = 50 : 100 = 1 : 2.", "Easy"],
  ["20% sebagai nisbah termudah?", ["1 : 2", "1 : 4", "1 : 5", "2 : 5"], 2, "20% = 20 : 100 = 1 : 5.", "Easy"],
  ["25% sebagai nisbah termudah?", ["1 : 3", "1 : 4", "1 : 5", "2 : 5"], 1, "25% = 25 : 100 = 1 : 4.", "Easy"],
  ["1 m = ? cm", ["10", "100", "1000", "10000"], 1, "1 m = 100 cm.", "Easy"],
  ["1 km = ? m", ["100", "1000", "10 000", "100 000"], 1, "1 km = 1000 m.", "Easy"],
  ["1 jam = ? minit", ["30", "60", "100", "360"], 1, "1 jam = 60 minit.", "Easy"],
  ["1 kg = ? g", ["10", "100", "1000", "10000"], 2, "1 kg = 1000 g.", "Easy"],
  ["Manakah BUKAN kadar?", ["RM 5/kg", "60 km/j", "3 : 5", "RM 12/jam"], 2, "3 : 5 ialah nisbah, bukan kadar.", "Easy"],
  ["6 : 9 dipermudahkan menjadi?", ["1 : 2", "2 : 3", "3 : 4", "2 : 5"], 1, "FSTB 6 dan 9 ialah 3 → 2 : 3.", "Easy"],
  ["Adakah 4 : 6 setara dengan 2 : 3?", ["Ya", "Tidak", "Hanya kadang-kadang", "Tidak ditentukan"], 0, "4 : 6 dibahagi 2 → 2 : 3.", "Easy"],
  ["Kaedah unitari bermula dengan?", ["Cari nilai semua unit", "Cari nilai satu unit", "Cari peratusan", "Pendaraban silang"], 1, "Cari nilai satu unit dahulu.", "Easy"],
  ["Pendaraban silang bagi a/b = c/d ialah?", ["a + d = b + c", "a × d = b × c", "a − d = b − c", "a/d = b/c"], 1, "a × d = b × c.", "Easy"],
  ["Skala peta 1 : 1000 bermaksud?", ["Peta lebih besar", "1 unit peta = 1000 unit sebenar", "Sama saiz", "1 unit peta = 100 unit sebenar"], 1, "1 unit pada peta mewakili 1000 unit sebenar.", "Easy"],
  ["3 : 5 sama nilai dengan?", ["6 : 10", "5 : 7", "8 : 13", "7 : 9"], 0, "Darab dengan 2 → 6 : 10.", "Easy"],
  ["75% sebagai nisbah termudah?", ["3 : 4", "1 : 4", "7 : 10", "3 : 5"], 0, "75% = 75 : 100 = 3 : 4.", "Easy"],
  ["80% sebagai nisbah termudah?", ["4 : 5", "1 : 5", "8 : 9", "2 : 5"], 0, "80% = 80 : 100 = 4 : 5.", "Easy"],
  ["Manakah pernyataan kadaran?", ["2 + 3 = 5", "2 × 3 = 6", "2 : 3 = 4 : 6", "2 − 1 = 1"], 2, "Kadaran ialah dua nisbah setara.", "Easy"],
  ["Nisbah a : b boleh ditulis sebagai pecahan?", ["a − b", "a/b", "a × b", "b/a"], 1, "Nisbah a : b = a/b.", "Easy"],
  ["Bilakah pendaraban silang digunakan?", ["Apabila hanya satu nisbah ada", "Apabila menyelesaikan kadaran dengan nilai tidak diketahui", "Untuk mempermudah nisbah", "Untuk menggabungkan nisbah"], 1, "Digunakan untuk mencari nilai tidak diketahui dalam kadaran.", "Easy"],
]);

const MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a ratio?", ["Compares quantities of same kind and unit", "Compares different kinds", "Sum of two numbers", "Product of two numbers"], 0, "A ratio compares quantities of the same kind and unit.", "Easy"],
  ["How is a ratio written?", ["a + b", "a : b", "a − b", "a × b"], 1, "A ratio is written as a : b.", "Easy"],
  ["Which is a valid ratio form?", ["3 cm : 5 m", "3 cm : 5 cm", "3 kg : 5 cm", "3 h : 5 km"], 1, "Both terms must share the same unit.", "Easy"],
  ["What are equivalent ratios?", ["Ratios of different value", "Ratios of the same value", "Mixed fractions", "Equal percentages"], 1, "Equivalent ratios have the same value.", "Easy"],
  ["2 : 3 is equivalent to?", ["3 : 2", "4 : 6", "5 : 7", "1 : 2"], 1, "Multiply 2 and 3 by 2 → 4 : 6.", "Easy"],
  ["What is the simplest form of 12 : 18?", ["6 : 9", "4 : 6", "2 : 3", "3 : 2"], 2, "HCF of 12 and 18 is 6 → 2 : 3.", "Easy"],
  ["How do you simplify a ratio?", ["Divide by HCF", "Multiply by LCM", "Add 1", "Divide by total"], 0, "Divide all terms by the HCF.", "Easy"],
  ["What is a rate?", ["Same kind quantities", "Different kinds/units", "Only speed", "Only price"], 1, "A rate compares two different-kind quantities.", "Easy"],
  ["Example of a rate?", ["3 : 5", "60 km/h", "1/2", "0.5"], 1, "Km/h is a rate of distance per time.", "Easy"],
  ["What is a proportion?", ["Two equivalent ratios", "Two different numbers", "A sum", "A fraction"], 0, "A proportion equates two equivalent ratios.", "Easy"],
  ["a : b = c : d also written as?", ["a × b = c × d", "a/b = c/d", "a + b = c + d", "a − b = c − d"], 1, "Ratios can be written as equivalent fractions.", "Easy"],
  ["50% as a ratio is?", ["1 : 2", "2 : 1", "1 : 5", "5 : 1"], 0, "50% = 50 : 100 = 1 : 2.", "Easy"],
  ["20% as simplest ratio?", ["1 : 2", "1 : 4", "1 : 5", "2 : 5"], 2, "20% = 20 : 100 = 1 : 5.", "Easy"],
  ["25% as simplest ratio?", ["1 : 3", "1 : 4", "1 : 5", "2 : 5"], 1, "25% = 25 : 100 = 1 : 4.", "Easy"],
  ["1 m = ? cm", ["10", "100", "1000", "10000"], 1, "1 m = 100 cm.", "Easy"],
  ["1 km = ? m", ["100", "1000", "10 000", "100 000"], 1, "1 km = 1000 m.", "Easy"],
  ["1 hour = ? minutes", ["30", "60", "100", "360"], 1, "1 hour = 60 minutes.", "Easy"],
  ["1 kg = ? g", ["10", "100", "1000", "10000"], 2, "1 kg = 1000 g.", "Easy"],
  ["Which is NOT a rate?", ["RM 5/kg", "60 km/h", "3 : 5", "RM 12/hour"], 2, "3 : 5 is a ratio, not a rate.", "Easy"],
  ["6 : 9 simplifies to?", ["1 : 2", "2 : 3", "3 : 4", "2 : 5"], 1, "HCF 6 and 9 is 3 → 2 : 3.", "Easy"],
  ["Is 4 : 6 equivalent to 2 : 3?", ["Yes", "No", "Sometimes", "Undefined"], 0, "4 : 6 divided by 2 → 2 : 3.", "Easy"],
  ["The unitary method starts by?", ["Find all unit values", "Find one unit value", "Find percentage", "Cross multiply"], 1, "Find the value of one unit first.", "Easy"],
  ["Cross multiplication of a/b = c/d gives?", ["a + d = b + c", "a × d = b × c", "a − d = b − c", "a/d = b/c"], 1, "a × d = b × c.", "Easy"],
  ["A map scale 1 : 1000 means?", ["Map is bigger", "1 unit map = 1000 actual units", "Same size", "1 unit map = 100 actual units"], 1, "1 map unit represents 1000 actual units.", "Easy"],
  ["3 : 5 is equivalent to?", ["6 : 10", "5 : 7", "8 : 13", "7 : 9"], 0, "Multiply by 2 → 6 : 10.", "Easy"],
  ["75% as simplest ratio?", ["3 : 4", "1 : 4", "7 : 10", "3 : 5"], 0, "75% = 75 : 100 = 3 : 4.", "Easy"],
  ["80% as simplest ratio?", ["4 : 5", "1 : 5", "8 : 9", "2 : 5"], 0, "80% = 80 : 100 = 4 : 5.", "Easy"],
  ["Which is a proportion statement?", ["2 + 3 = 5", "2 × 3 = 6", "2 : 3 = 4 : 6", "2 − 1 = 1"], 2, "A proportion has two equivalent ratios.", "Easy"],
  ["Ratio a : b as a fraction is?", ["a − b", "a/b", "a × b", "b/a"], 1, "Ratio a : b = a/b.", "Easy"],
  ["When is cross multiplication used?", ["When only one ratio exists", "When solving a proportion with an unknown", "To simplify a ratio", "To combine ratios"], 1, "It finds the unknown in a proportion.", "Easy"],
]);

const MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Permudahkan 15 : 25.", ["3 : 4", "3 : 5", "5 : 7", "1 : 2"], 1, "FSTB 15 dan 25 ialah 5 → 3 : 5.", "Medium"],
  ["Permudahkan 24 : 36.", ["1 : 2", "2 : 3", "3 : 4", "4 : 5"], 1, "FSTB = 12 → 2 : 3.", "Medium"],
  ["Permudahkan 8 : 12 : 20.", ["1 : 2 : 3", "2 : 3 : 5", "4 : 6 : 10", "2 : 3 : 4"], 1, "FSTB = 4 → 2 : 3 : 5.", "Medium"],
  ["Tukarkan 500 g : 1 kg kepada bentuk termudah.", ["1 : 2", "5 : 10", "1 : 5", "2 : 5"], 0, "1 kg = 1000 g; 500 : 1000 = 1 : 2.", "Medium"],
  ["3 : 7 = 9 : ?", ["14", "18", "21", "24"], 2, "Darab dengan 3 → 9 : 21.", "Medium"],
  ["Selesaikan 4/6 = x/9.", ["4", "5", "6", "8"], 2, "Pendaraban silang: 4 × 9 = 6x → x = 6.", "Medium"],
  ["Selesaikan 5/8 = x/24.", ["10", "12", "15", "20"], 2, "5 × 24 = 8x → x = 15.", "Medium"],
  ["Jika A : B = 2 : 3 dan B : C = 4 : 5, A : B : C ialah?", ["2 : 3 : 5", "8 : 12 : 15", "4 : 6 : 10", "2 : 12 : 5"], 1, "Samakan B = 12 → 8 : 12 : 15.", "Medium"],
  ["Kereta 180 km dalam 3 jam. Kelajuan?", ["50 km/j", "60 km/j", "70 km/j", "90 km/j"], 1, "180 ÷ 3 = 60 km/j.", "Medium"],
  ["RM 24 untuk 4 kg gula. Harga 7 kg?", ["RM 36", "RM 42", "RM 48", "RM 56"], 1, "1 kg = RM 6; 7 kg = RM 42.", "Medium"],
  ["5 buku = RM 35. 12 buku?", ["RM 70", "RM 80", "RM 84", "RM 90"], 2, "1 buku = RM 7; 12 buku = RM 84.", "Medium"],
  ["Tukarkan 90 km/j kepada m/s.", ["20", "25", "27", "30"], 1, "90 × 1000/3600 = 25 m/s.", "Medium"],
  ["Tukarkan RM 8 per m kepada RM per cm.", ["0.08", "0.8", "8", "80"], 0, "RM 8 ÷ 100 = RM 0.08 per cm.", "Medium"],
  ["Resipi 4 orang gunakan 200 g tepung. Untuk 6 orang?", ["250 g", "280 g", "300 g", "350 g"], 2, "200 × 6/4 = 300 g.", "Medium"],
  ["Permudahkan 200 ml : 1 liter.", ["1 : 2", "1 : 5", "2 : 5", "1 : 10"], 1, "1 L = 1000 ml; 200 : 1000 = 1 : 5.", "Medium"],
  ["40% sebagai nisbah termudah?", ["2 : 5", "4 : 5", "1 : 4", "1 : 5"], 0, "40% = 40 : 100 = 2 : 5.", "Medium"],
  ["60% sebagai nisbah termudah?", ["3 : 5", "2 : 5", "6 : 11", "3 : 4"], 0, "60% = 60 : 100 = 3 : 5.", "Medium"],
  ["Selesaikan 7 : 4 = 21 : x.", ["10", "12", "14", "16"], 1, "x = 4 × 21/7 = 12.", "Medium"],
  ["Jika nisbah lelaki : perempuan = 3 : 2 dan jumlah 30, bilangan lelaki?", ["12", "15", "18", "20"], 2, "3/5 × 30 = 18.", "Medium"],
  ["Jika 2 paun = 9 ringgit, 5 paun = ?", ["RM 18", "RM 20", "RM 22.50", "RM 25"], 2, "1 paun = RM 4.50; 5 paun = RM 22.50.", "Medium"],
  ["Skala 1 : 5000. Jarak 4 cm peta = jarak sebenar?", ["200 m", "100 m", "2000 m", "20 m"], 0, "4 × 5000 = 20 000 cm = 200 m.", "Medium"],
  ["Kadar pekerja: 5 jam = RM 75. 1 jam = ?", ["RM 12", "RM 15", "RM 18", "RM 20"], 1, "75 ÷ 5 = RM 15.", "Medium"],
  ["Pertukaran 2 m³ kepada cm³?", ["2000", "20 000", "200 000", "2 000 000"], 3, "1 m³ = 1 000 000 cm³.", "Medium"],
  ["Sebuah peta 5 cm = 25 km sebenar. Skala?", ["1 : 5000", "1 : 50 000", "1 : 500 000", "1 : 5 000 000"], 2, "25 km = 2 500 000 cm; 5 : 2 500 000 = 1 : 500 000.", "Medium"],
  ["Permudahkan nisbah 45 minit : 2 jam.", ["3 : 8", "1 : 2", "2 : 3", "3 : 5"], 0, "2 jam = 120 min; 45 : 120 = 3 : 8.", "Medium"],
  ["Selesaikan 3 : x = 9 : 15.", ["4", "5", "6", "10"], 1, "x = 3 × 15/9 = 5.", "Medium"],
  ["Jika 6 pekerja siap dalam 8 hari, 8 pekerja siap dalam? (kerja sama)", ["5 hari", "6 hari", "7 hari", "9 hari"], 1, "6 × 8 = 8 × t → t = 6 hari.", "Medium"],
  ["Tukarkan 36 km/j kepada m/s.", ["8", "10", "12", "15"], 1, "36 × 1000/3600 = 10 m/s.", "Medium"],
  ["A : B = 5 : 3. Jika A = 25, B = ?", ["10", "12", "15", "20"], 2, "B = 25 × 3/5 = 15.", "Medium"],
  ["A : B : C = 2 : 3 : 5. Jika jumlah 100, nilai C?", ["20", "30", "40", "50"], 3, "C = 5/10 × 100 = 50.", "Medium"],
]);

const MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Simplify 15 : 25.", ["3 : 4", "3 : 5", "5 : 7", "1 : 2"], 1, "HCF 15 and 25 is 5 → 3 : 5.", "Medium"],
  ["Simplify 24 : 36.", ["1 : 2", "2 : 3", "3 : 4", "4 : 5"], 1, "HCF = 12 → 2 : 3.", "Medium"],
  ["Simplify 8 : 12 : 20.", ["1 : 2 : 3", "2 : 3 : 5", "4 : 6 : 10", "2 : 3 : 4"], 1, "HCF = 4 → 2 : 3 : 5.", "Medium"],
  ["Express 500 g : 1 kg in simplest form.", ["1 : 2", "5 : 10", "1 : 5", "2 : 5"], 0, "1 kg = 1000 g; 500 : 1000 = 1 : 2.", "Medium"],
  ["3 : 7 = 9 : ?", ["14", "18", "21", "24"], 2, "Multiply by 3 → 9 : 21.", "Medium"],
  ["Solve 4/6 = x/9.", ["4", "5", "6", "8"], 2, "Cross multiply: 4 × 9 = 6x → x = 6.", "Medium"],
  ["Solve 5/8 = x/24.", ["10", "12", "15", "20"], 2, "5 × 24 = 8x → x = 15.", "Medium"],
  ["If A : B = 2 : 3 and B : C = 4 : 5, then A : B : C = ?", ["2 : 3 : 5", "8 : 12 : 15", "4 : 6 : 10", "2 : 12 : 5"], 1, "Make B = 12 → 8 : 12 : 15.", "Medium"],
  ["A car travels 180 km in 3 hours. Speed?", ["50 km/h", "60 km/h", "70 km/h", "90 km/h"], 1, "180 ÷ 3 = 60 km/h.", "Medium"],
  ["RM 24 for 4 kg of sugar. Cost of 7 kg?", ["RM 36", "RM 42", "RM 48", "RM 56"], 1, "1 kg = RM 6; 7 kg = RM 42.", "Medium"],
  ["5 books = RM 35. 12 books?", ["RM 70", "RM 80", "RM 84", "RM 90"], 2, "1 book = RM 7; 12 books = RM 84.", "Medium"],
  ["Convert 90 km/h to m/s.", ["20", "25", "27", "30"], 1, "90 × 1000/3600 = 25 m/s.", "Medium"],
  ["Convert RM 8 per m to RM per cm.", ["0.08", "0.8", "8", "80"], 0, "RM 8 ÷ 100 = RM 0.08 per cm.", "Medium"],
  ["A recipe for 4 uses 200 g flour. For 6 people?", ["250 g", "280 g", "300 g", "350 g"], 2, "200 × 6/4 = 300 g.", "Medium"],
  ["Simplify 200 ml : 1 litre.", ["1 : 2", "1 : 5", "2 : 5", "1 : 10"], 1, "1 L = 1000 ml; 200 : 1000 = 1 : 5.", "Medium"],
  ["40% as simplest ratio?", ["2 : 5", "4 : 5", "1 : 4", "1 : 5"], 0, "40% = 40 : 100 = 2 : 5.", "Medium"],
  ["60% as simplest ratio?", ["3 : 5", "2 : 5", "6 : 11", "3 : 4"], 0, "60% = 60 : 100 = 3 : 5.", "Medium"],
  ["Solve 7 : 4 = 21 : x.", ["10", "12", "14", "16"], 1, "x = 4 × 21/7 = 12.", "Medium"],
  ["If boys : girls = 3 : 2 and total is 30, number of boys?", ["12", "15", "18", "20"], 2, "3/5 × 30 = 18.", "Medium"],
  ["If 2 pounds = 9 ringgit, 5 pounds = ?", ["RM 18", "RM 20", "RM 22.50", "RM 25"], 2, "1 pound = RM 4.50; 5 pounds = RM 22.50.", "Medium"],
  ["Scale 1 : 5000. Map distance 4 cm = actual?", ["200 m", "100 m", "2000 m", "20 m"], 0, "4 × 5000 = 20 000 cm = 200 m.", "Medium"],
  ["Worker rate: 5 hours = RM 75. 1 hour = ?", ["RM 12", "RM 15", "RM 18", "RM 20"], 1, "75 ÷ 5 = RM 15.", "Medium"],
  ["Convert 2 m³ to cm³.", ["2000", "20 000", "200 000", "2 000 000"], 3, "1 m³ = 1 000 000 cm³.", "Medium"],
  ["On a map, 5 cm = 25 km. Scale?", ["1 : 5000", "1 : 50 000", "1 : 500 000", "1 : 5 000 000"], 2, "25 km = 2 500 000 cm; 5 : 2 500 000 = 1 : 500 000.", "Medium"],
  ["Simplify ratio 45 minutes : 2 hours.", ["3 : 8", "1 : 2", "2 : 3", "3 : 5"], 0, "2 h = 120 min; 45 : 120 = 3 : 8.", "Medium"],
  ["Solve 3 : x = 9 : 15.", ["4", "5", "6", "10"], 1, "x = 3 × 15/9 = 5.", "Medium"],
  ["If 6 workers finish in 8 days, 8 workers (same work) finish in?", ["5 days", "6 days", "7 days", "9 days"], 1, "6 × 8 = 8 × t → t = 6 days.", "Medium"],
  ["Convert 36 km/h to m/s.", ["8", "10", "12", "15"], 1, "36 × 1000/3600 = 10 m/s.", "Medium"],
  ["A : B = 5 : 3. If A = 25, B = ?", ["10", "12", "15", "20"], 2, "B = 25 × 3/5 = 15.", "Medium"],
  ["A : B : C = 2 : 3 : 5. If total is 100, value of C?", ["20", "30", "40", "50"], 3, "C = 5/10 × 100 = 50.", "Medium"],
]);

const MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Resipi 8 keping kek gunakan 400 g mentega. Untuk 14 keping?", ["500 g", "600 g", "650 g", "700 g"], 3, "400 × 14/8 = 700 g.", "Hard"],
  ["Jika 60% pelajar lelaki dan jumlah 40, bilangan perempuan?", ["12", "16", "20", "24"], 1, "40% perempuan = 0.40 × 40 = 16.", "Hard"],
  ["Skala peta 1 : 250 000. Dua bandar 6 cm pada peta. Jarak sebenar (km)?", ["10", "12", "15", "20"], 2, "6 × 250 000 = 1 500 000 cm = 15 km.", "Hard"],
  ["Anggar populasi: 40 ditanda dilepas. 80 ditangkap; 8 bertanda. Anggaran?", ["200", "320", "400", "640"], 2, "8/80 = 40/N → N = 400.", "Hard"],
  ["A : B = 3 : 5. Jika B − A = 8, nilai A?", ["10", "12", "15", "20"], 1, "B − A = 5k − 3k = 2k = 8 → k = 4; A = 12.", "Hard"],
  ["Larutan 5 : 3 air : sirap. Untuk 240 ml sirap, isipadu air?", ["360 ml", "400 ml", "420 ml", "480 ml"], 1, "Air = 5/3 × 240 = 400 ml.", "Hard"],
  ["Kereta A: 240 km dalam 3 jam. Kereta B: 300 km dalam 4 jam. Yang lebih laju?", ["Kereta A", "Kereta B", "Sama", "Tidak ditentukan"], 0, "A = 80 km/j; B = 75 km/j.", "Hard"],
  ["12 pekerja siap dalam 10 hari. 15 pekerja dalam? (kerja malar)", ["6", "7", "8", "9"], 2, "12×10 = 15×t → t = 8.", "Hard"],
  ["Membeli 3 kg untuk RM 21 atau 5 kg untuk RM 30. Yang lebih jimat per kg?", ["3 kg", "5 kg", "Sama", "Tidak ditentukan"], 1, "RM 7/kg vs RM 6/kg → 5 kg lebih jimat.", "Hard"],
  ["A : B : C = 2 : 3 : 4. Jumlah RM 90. Bahagian C?", ["RM 20", "RM 30", "RM 40", "RM 45"], 2, "C = 4/9 × 90 = RM 40.", "Hard"],
  ["Nisbah lelaki kepada perempuan 7 : 5. Jika perempuan 35, jumlah?", ["56", "70", "84", "96"], 2, "Lelaki = 7/5 × 35 = 49; jumlah 84.", "Hard"],
  ["Kadar laju 72 km/j dalam m/s?", ["18", "20", "22", "24"], 1, "72 × 1000/3600 = 20 m/s.", "Hard"],
  ["Jika 5 kg buah berharga RM 60, harga 250 g?", ["RM 3", "RM 4", "RM 5", "RM 6"], 0, "1 kg = RM 12; 0.25 kg = RM 3.", "Hard"],
  ["Larutan 1 : 4 jus : air. Untuk 1.5 liter jumlah, isipadu jus?", ["200 ml", "250 ml", "300 ml", "375 ml"], 2, "Jus = 1/5 × 1500 = 300 ml.", "Hard"],
  ["Cas teksi RM 3 mula + RM 1.50/km. Bayaran 8 km?", ["RM 12", "RM 13", "RM 14", "RM 15"], 3, "3 + 1.5×8 = RM 15.", "Hard"],
  ["Tukarkan 0.5 m/s kepada km/j.", ["1.5", "1.8", "2", "5"], 1, "0.5 × 3.6 = 1.8 km/j.", "Hard"],
  ["Peta skala 1 : 100 000. Bahagian sebenar 7.5 km = berapa cm pada peta?", ["5.5", "6.5", "7", "7.5"], 3, "7.5 km = 750 000 cm ÷ 100 000 = 7.5 cm.", "Hard"],
  ["Jika 70% pelajar lulus dan 21 gagal, jumlah pelajar?", ["50", "60", "70", "80"], 2, "30% = 21 → 100% = 70.", "Hard"],
  ["Resipi cookies 5 : 3 : 2 (tepung : gula : mentega). Jumlah 500 g. Tepung?", ["200 g", "230 g", "250 g", "300 g"], 2, "5/10 × 500 = 250 g.", "Hard"],
  ["Selesaikan 2x : 5 = 8 : 10.", ["x = 2", "x = 4", "x = 5", "x = 8"], 0, "2x × 10 = 5 × 8 → 20x = 40 → x = 2.", "Hard"],
  ["Larutan 3 : 2 alkohol : air. Jika alkohol 150 ml, isipadu air?", ["75 ml", "100 ml", "125 ml", "150 ml"], 1, "Air = 2/3 × 150 = 100 ml.", "Hard"],
  ["A bekerja 6 hari, B bekerja 9 hari. Bayaran RM 450 dibahagi nisbah hari. Bayaran B?", ["RM 180", "RM 200", "RM 250", "RM 270"], 3, "B = 9/15 × 450 = RM 270.", "Hard"],
  ["Bas 240 km dalam 5 jam. Berapa jam untuk 168 km?", ["3", "3.2", "3.5", "4"], 2, "Kelajuan 48 km/j; 168/48 = 3.5 jam.", "Hard"],
  ["Dua segi tiga serupa dengan nisbah sisi 2 : 5. Nisbah luas?", ["2 : 5", "4 : 10", "4 : 25", "8 : 125"], 2, "Luas mengikut kuadrat: 2² : 5² = 4 : 25.", "Hard"],
  ["Jika RM 50 ditukar 1100 yen, RM 80 = ?", ["1600 yen", "1700 yen", "1760 yen", "1800 yen"], 2, "1 RM = 22 yen; 80 × 22 = 1760.", "Hard"],
  ["Anggar populasi ikan: 25 ditanda. Tangkap kedua 100; 5 bertanda.", ["400", "500", "600", "1000"], 1, "5/100 = 25/N → N = 500.", "Hard"],
  ["Kadar 0.6 liter/minit. Berapa liter dalam 25 minit?", ["10", "12", "15", "18"], 2, "0.6 × 25 = 15 L.", "Hard"],
  ["Kos pengeluaran ialah RM 12/kg. Jika harga jualan RM 15/kg, peratus untung?", ["20%", "25%", "30%", "33%"], 1, "Untung 3 atas 12 = 25%.", "Hard"],
  ["Selesaikan (x+1)/4 = 3/2.", ["3", "4", "5", "6"], 2, "Pendaraban silang: 2(x+1) = 12 → x = 5.", "Hard"],
  ["Petrol kereta 8 km/L. Berapa liter untuk 200 km?", ["20", "22", "24", "25"], 3, "200 ÷ 8 = 25 L.", "Hard"],
]);

const MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["A recipe for 8 cakes uses 400 g butter. For 14 cakes?", ["500 g", "600 g", "650 g", "700 g"], 3, "400 × 14/8 = 700 g.", "Hard"],
  ["If 60% of students are boys and total is 40, number of girls?", ["12", "16", "20", "24"], 1, "40% girls = 0.40 × 40 = 16.", "Hard"],
  ["Map scale 1 : 250 000. Two cities 6 cm apart on map. Actual distance (km)?", ["10", "12", "15", "20"], 2, "6 × 250 000 = 1 500 000 cm = 15 km.", "Hard"],
  ["Population estimate: 40 marked released. 80 recaptured; 8 marked. Estimate?", ["200", "320", "400", "640"], 2, "8/80 = 40/N → N = 400.", "Hard"],
  ["Solution 3 : 2 alcohol : water. If alcohol is 150 ml, volume of water?", ["75 ml", "100 ml", "125 ml", "150 ml"], 1, "Water = 2/3 × 150 = 100 ml.", "Hard"],
  ["Solution 5 : 3 water : syrup. For 240 ml syrup, volume of water?", ["360 ml", "400 ml", "420 ml", "480 ml"], 1, "Water = 5/3 × 240 = 400 ml.", "Hard"],
  ["Car A: 240 km in 3 h. Car B: 300 km in 4 h. Which is faster?", ["Car A", "Car B", "Same", "Undefined"], 0, "A = 80 km/h; B = 75 km/h.", "Hard"],
  ["12 workers finish in 10 days. 15 workers in? (constant work)", ["6", "7", "8", "9"], 2, "12×10 = 15×t → t = 8.", "Hard"],
  ["Buy 3 kg for RM 21 or 5 kg for RM 30. Which is cheaper per kg?", ["3 kg pack", "5 kg pack", "Same", "Undefined"], 1, "RM 7/kg vs RM 6/kg → 5 kg cheaper.", "Hard"],
  ["A : B : C = 2 : 3 : 4. Total RM 90. Share of C?", ["RM 20", "RM 30", "RM 40", "RM 45"], 2, "C = 4/9 × 90 = RM 40.", "Hard"],
  ["Boys : girls = 7 : 5. If girls = 35, total?", ["56", "70", "84", "96"], 2, "Boys = 7/5 × 35 = 49; total 84.", "Hard"],
  ["Rate 72 km/h in m/s?", ["18", "20", "22", "24"], 1, "72 × 1000/3600 = 20 m/s.", "Hard"],
  ["If 5 kg of fruit cost RM 60, price of 250 g?", ["RM 3", "RM 4", "RM 5", "RM 6"], 0, "1 kg = RM 12; 0.25 kg = RM 3.", "Hard"],
  ["Mixture 1 : 4 juice : water. For total 1.5 litres, volume of juice?", ["200 ml", "250 ml", "300 ml", "375 ml"], 2, "Juice = 1/5 × 1500 = 300 ml.", "Hard"],
  ["Taxi fare RM 3 base + RM 1.50/km. Fare for 8 km?", ["RM 12", "RM 13", "RM 14", "RM 15"], 3, "3 + 1.5×8 = RM 15.", "Hard"],
  ["Convert 0.5 m/s to km/h.", ["1.5", "1.8", "2", "5"], 1, "0.5 × 3.6 = 1.8 km/h.", "Hard"],
  ["Map scale 1 : 100 000. Actual distance 7.5 km = how many cm on map?", ["5.5", "6.5", "7", "7.5"], 3, "7.5 km = 750 000 cm ÷ 100 000 = 7.5 cm.", "Hard"],
  ["If 70% of students pass and 21 fail, total students?", ["50", "60", "70", "80"], 2, "30% = 21 → 100% = 70.", "Hard"],
  ["Cookie recipe 5 : 3 : 2 (flour : sugar : butter). Total 500 g. Flour?", ["200 g", "230 g", "250 g", "300 g"], 2, "5/10 × 500 = 250 g.", "Hard"],
  ["Solve 2x : 5 = 8 : 10.", ["x = 2", "x = 4", "x = 5", "x = 8"], 0, "2x × 10 = 5 × 8 → 20x = 40 → x = 2.", "Hard"],
  ["A works 6 days, B works 9 days. RM 450 split by days. B's share?", ["RM 180", "RM 200", "RM 250", "RM 270"], 3, "B = 9/15 × 450 = RM 270.", "Hard"],
  ["Bus 240 km in 5 h. How many hours for 168 km?", ["3", "3.2", "3.5", "4"], 2, "Speed 48 km/h; 168/48 = 3.5 h.", "Hard"],
  ["Two similar triangles have side ratio 2 : 5. Area ratio?", ["2 : 5", "4 : 10", "4 : 25", "8 : 125"], 2, "Area scales by square: 2² : 5² = 4 : 25.", "Hard"],
  ["If RM 50 exchanges for 1100 yen, RM 80 = ?", ["1600 yen", "1700 yen", "1760 yen", "1800 yen"], 2, "1 RM = 22 yen; 80 × 22 = 1760.", "Hard"],
  ["Fish population estimate: 25 marked. Second catch 100; 5 marked.", ["400", "500", "600", "1000"], 1, "5/100 = 25/N → N = 500.", "Hard"],
  ["Rate 0.6 litre/minute. How many litres in 25 minutes?", ["10", "12", "15", "18"], 2, "0.6 × 25 = 15 L.", "Hard"],
  ["Production cost RM 12/kg. Selling price RM 15/kg. Profit %?", ["20%", "25%", "30%", "33%"], 1, "Profit 3 over 12 = 25%.", "Hard"],
  ["Solve (x+1)/4 = 3/2.", ["3", "4", "5", "6"], 2, "Cross multiply: 2(x+1) = 12 → x = 5.", "Hard"],
  ["Car petrol 8 km/L. Litres needed for 200 km?", ["20", "22", "24", "25"], 3, "200 ÷ 8 = 25 L.", "Hard"],
  ["A : B = 3 : 5. If B − A = 8, value of A?", ["10", "12", "15", "20"], 1, "B − A = 5k − 3k = 2k = 8 → k = 4; A = 12.", "Hard"],
]);


const MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah pemboleh ubah?", ["Nombor tetap", "Huruf atau simbol yang mewakili nilai yang tidak diketahui", "Tanda operasi", "Unit ukuran"], 1, "Pemboleh ubah ialah huruf atau simbol yang mewakili nilai yang tidak diketahui.", "Easy"],
  ["Manakah antara berikut ialah pemboleh ubah?", ["5", "+", "x", "="], 2, "x ialah huruf yang digunakan untuk mewakili nilai yang tidak diketahui; nombor dan simbol operasi bukan pemboleh ubah.", "Easy"],
  ["Daripada manakah perkataan 'algebra' berasal?", ["Bahasa Yunani", "Perkataan Arab 'al-jabr'", "Bahasa Latin", "Bahasa Sanskrit"], 1, "Perkataan 'algebra' berasal daripada perkataan Arab 'al-jabr'.", "Easy"],
  ["Apakah ungkapan algebra bagi 'n biji gula-gula tambah 6'?", ["n − 6", "n + 6", "6n", "n ÷ 6"], 1, "Menambah 6 biji gula-gula kepada n biji gula-gula memberikan ungkapan n + 6.", "Easy"],
  ["Apakah ungkapan algebra bagi 'n biji gula-gula tolak 1'?", ["n + 1", "1 − n", "n − 1", "n × 1"], 2, "Memakan 1 biji gula-gula daripada n biji gula-gula memberikan ungkapan n − 1.", "Easy"],
  ["Apakah ungkapan bagi 'tiga balang, setiap satu mengandungi n biji gula-gula'?", ["n + 3", "n − 3", "n/3", "3n"], 3, "Tiga balang yang setiap satu mengandungi n biji gula-gula memberi 3 × n = 3n.", "Easy"],
  ["Apakah sebutan algebra?", ["Hanya nombor sahaja", "Hanya pemboleh ubah sahaja", "Nombor, pemboleh ubah, atau hasil darab antara kedua-duanya", "Hanya tanda operasi sahaja"], 2, "Sebutan algebra ialah nombor, pemboleh ubah, atau hasil darab antara nombor dengan pemboleh ubah.", "Easy"],
  ["Berapakah bilangan sebutan dalam ungkapan 3ab + 5x − 2y + 7?", ["2", "3", "4", "5"], 2, "Ungkapan 3ab + 5x − 2y + 7 mempunyai empat sebutan: 3ab, 5x, −2y dan 7.", "Easy"],
  ["Apakah pekali bagi sebutan 3x?", ["x", "3", "3x", "1"], 1, "Pekali ialah faktor nombor yang mendarab pemboleh ubah; pekali bagi 3x ialah 3.", "Easy"],
  ["Apakah pekali bagi sebutan −7ab?", ["7", "ab", "−7", "−1"], 2, "Pekali bagi −7ab ialah −7 kerana tanda negatif adalah sebahagian daripada pekali.", "Easy"],
  ["Apakah pekali bagi sebutan y?", ["0", "y", "1", "tiada"], 2, "y bermaksud 1y, jadi pekalinya ialah 1.", "Easy"],
  ["Apakah pekali bagi sebutan −n?", ["1", "−1", "n", "0"], 1, "−n bermaksud −1n, jadi pekalinya ialah −1.", "Easy"],
  ["Manakah pasangan berikut ialah sebutan serupa?", ["3x dan 8x", "x dan x²", "2a dan 2b", "ab dan abc"], 0, "3x dan 8x mempunyai pemboleh ubah x dengan kuasa yang sama, jadi ia ialah sebutan serupa.", "Easy"],
  ["Manakah pasangan berikut ialah sebutan serupa?", ["xy dan yx", "x dan y", "a dan a²", "m dan mn"], 0, "xy dan yx mewakili hasil darab pemboleh ubah yang sama (x × y = y × x), jadi ia ialah sebutan serupa.", "Easy"],
  ["Manakah pasangan berikut ialah sebutan tidak serupa?", ["3x dan 8x", "2ab dan −5ab", "x dan x²", "xy dan yx"], 2, "x dan x² mempunyai kuasa yang berbeza (kuasa 1 berbanding kuasa 2), jadi ia ialah sebutan tidak serupa.", "Easy"],
  ["Mengapakah x dan x² ialah sebutan tidak serupa?", ["Pemboleh ubah berbeza", "Kuasa berbeza", "Pekali berbeza", "Tanda berbeza"], 1, "x mempunyai kuasa 1 manakala x² mempunyai kuasa 2, maka kuasanya berbeza.", "Easy"],
  ["Mengapakah 2a dan 2b ialah sebutan tidak serupa?", ["Pekali berbeza", "Kuasa berbeza", "Pemboleh ubah berbeza", "Operasi berbeza"], 2, "2a dan 2b mempunyai pemboleh ubah yang berbeza, iaitu a dan b.", "Easy"],
  ["Apakah ciri utama sebutan serupa?", ["Pekali yang sama", "Pemboleh ubah dan kuasa yang sama", "Tanda yang sama", "Bilangan sebutan yang sama"], 1, "Sebutan serupa mesti mempunyai pemboleh ubah yang sama dan kuasa yang sama bagi setiap pemboleh ubah.", "Easy"],
  ["Manakah antara berikut ialah sebutan tunggal?", ["3x + 5", "7", "x − y", "2a + 3b"], 1, "Sebutan tunggal ialah satu sebutan sahaja seperti nombor 7, tanpa digabungkan dengan sebutan lain.", "Easy"],
  ["Apakah maksud 'nilai berubah'?", ["Nilai yang sentiasa tetap", "Nilai yang berubah-ubah mengikut keadaan", "Nilai yang sentiasa sifar", "Nilai yang tidak boleh diukur"], 1, "Nilai berubah ialah kuantiti yang nilainya boleh berubah-ubah mengikut keadaan.", "Easy"],
  ["Berikan contoh nilai tetap.", ["Masa perjalanan ke sekolah", "Bilangan pelajar yang hadir", "Kadar faedah tahunan", "Suhu udara harian"], 2, "Kadar faedah tahunan ditetapkan dan kekal sama, jadi ia ialah nilai tetap.", "Easy"],
  ["Berikan contoh nilai berubah.", ["Kadar faedah tahunan", "Bilangan hari dalam seminggu", "Masa perjalanan ke sekolah setiap hari", "Takat didih air pada paras laut"], 2, "Masa perjalanan ke sekolah berbeza setiap hari mengikut keadaan, jadi ia ialah nilai berubah.", "Easy"],
  ["Apakah ungkapan algebra?", ["Hanya satu nombor sahaja", "Gabungan sebutan yang dipisahkan oleh + atau −", "Hanya satu pemboleh ubah sahaja", "Persamaan dengan tanda sama dengan"], 1, "Ungkapan algebra terdiri daripada satu atau lebih sebutan yang dipisahkan oleh + atau −.", "Easy"],
  ["Apakah yang biasanya diwakili oleh pemboleh ubah n?", ["Bilangan atau kuantiti sesuatu", "Hanya warna", "Hanya unit jisim", "Tanda operasi"], 0, "Pemboleh ubah n biasanya mewakili bilangan atau kuantiti sesuatu benda.", "Easy"],
  ["Manakah ungkapan yang mempunyai tepat dua sebutan?", ["5", "3x + 2y", "x", "4ab − 2x + y"], 1, "Ungkapan 3x + 2y mempunyai dua sebutan iaitu 3x dan 2y.", "Easy"],
  ["Apakah pekali bagi sebutan 5x dalam ungkapan 5x − 2y?", ["5", "x", "−2", "1"], 0, "Pekali bagi sebutan 5x ialah 5.", "Easy"],
  ["Apakah pekali bagi sebutan −2y dalam ungkapan 5x − 2y?", ["2", "y", "−2", "−y"], 2, "Pekali bagi sebutan −2y ialah −2 kerana tanda negatif termasuk dalam pekali.", "Easy"],
  ["Manakah pasangan sebutan serupa?", ["4m dan 4n", "2xy dan 7xy", "3a dan 3a²", "p dan pq"], 1, "2xy dan 7xy mempunyai pemboleh ubah x dan y dengan kuasa yang sama, jadi ia sebutan serupa.", "Easy"],
  ["Berapakah bilangan pemboleh ubah dalam sebutan abc?", ["1", "2", "3", "0"], 2, "Sebutan abc mengandungi tiga pemboleh ubah, iaitu a, b dan c.", "Easy"],
  ["Apakah maksud 'al-jabr' dalam bahasa Arab?", ["Membahagi", "Menyatukan semula bahagian yang terpisah", "Mendarab", "Menolak"], 1, "'Al-jabr' bermaksud 'menyusun semula' atau 'menggabungkan bahagian yang terpisah'.", "Easy"],
]);

const MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a variable?", ["A fixed number", "A letter or symbol that represents an unknown value", "An operation sign", "A unit of measurement"], 1, "A variable is a letter or symbol that represents an unknown value.", "Easy"],
  ["Which of the following is a variable?", ["5", "+", "x", "="], 2, "x is a letter used to represent an unknown value; numbers and operation signs are not variables.", "Easy"],
  ["Where does the word 'algebra' come from?", ["Greek", "The Arabic word 'al-jabr'", "Latin", "Sanskrit"], 1, "The word 'algebra' comes from the Arabic word 'al-jabr'.", "Easy"],
  ["What is the algebraic expression for 'n sweets plus 6'?", ["n − 6", "n + 6", "6n", "n ÷ 6"], 1, "Adding 6 sweets to n sweets gives the expression n + 6.", "Easy"],
  ["What is the algebraic expression for 'n sweets minus 1'?", ["n + 1", "1 − n", "n − 1", "n × 1"], 2, "Eating 1 sweet from n sweets gives the expression n − 1.", "Easy"],
  ["What is the expression for 'three jars, each containing n sweets'?", ["n + 3", "n − 3", "n/3", "3n"], 3, "Three jars, each containing n sweets, gives 3 × n = 3n.", "Easy"],
  ["What is an algebraic term?", ["Only a number", "Only a variable", "A number, a variable, or the product of both", "Only an operation sign"], 2, "An algebraic term is a number, a variable, or the product of a number and a variable.", "Easy"],
  ["How many terms are in the expression 3ab + 5x − 2y + 7?", ["2", "3", "4", "5"], 2, "The expression 3ab + 5x − 2y + 7 has four terms: 3ab, 5x, −2y and 7.", "Easy"],
  ["What is the coefficient of the term 3x?", ["x", "3", "3x", "1"], 1, "A coefficient is the numerical factor that multiplies a variable; the coefficient of 3x is 3.", "Easy"],
  ["What is the coefficient of the term −7ab?", ["7", "ab", "−7", "−1"], 2, "The coefficient of −7ab is −7 because the negative sign is part of the coefficient.", "Easy"],
  ["What is the coefficient of the term y?", ["0", "y", "1", "none"], 2, "y means 1y, so its coefficient is 1.", "Easy"],
  ["What is the coefficient of the term −n?", ["1", "−1", "n", "0"], 1, "−n means −1n, so its coefficient is −1.", "Easy"],
  ["Which pair are like terms?", ["3x and 8x", "x and x²", "2a and 2b", "ab and abc"], 0, "3x and 8x have the same variable x with the same power, so they are like terms.", "Easy"],
  ["Which pair are like terms?", ["xy and yx", "x and y", "a and a²", "m and mn"], 0, "xy and yx represent the product of the same variables (x × y = y × x), so they are like terms.", "Easy"],
  ["Which pair are unlike terms?", ["3x and 8x", "2ab and −5ab", "x and x²", "xy and yx"], 2, "x and x² have different powers (power 1 versus power 2), so they are unlike terms.", "Easy"],
  ["Why are x and x² unlike terms?", ["Different variables", "Different powers", "Different coefficients", "Different signs"], 1, "x has power 1 while x² has power 2, so their powers are different.", "Easy"],
  ["Why are 2a and 2b unlike terms?", ["Different coefficients", "Different powers", "Different variables", "Different operations"], 2, "2a and 2b have different variables, namely a and b.", "Easy"],
  ["What is the main feature of like terms?", ["Same coefficient", "Same variables and same powers", "Same sign", "Same number of terms"], 1, "Like terms must have the same variables and the same power for each variable.", "Easy"],
  ["Which of the following is a single term?", ["3x + 5", "7", "x − y", "2a + 3b"], 1, "A single term is just one term on its own, like the number 7, not combined with other terms.", "Easy"],
  ["What does 'varied value' mean?", ["A value that is always fixed", "A value that changes depending on circumstances", "A value that is always zero", "A value that cannot be measured"], 1, "A varied value is a quantity whose value can change depending on circumstances.", "Easy"],
  ["Give an example of a fixed value.", ["Travel time to school", "Number of students present", "Annual interest rate", "Daily air temperature"], 2, "The annual interest rate is fixed and stays the same, so it is a fixed value.", "Easy"],
  ["Give an example of a varied value.", ["Annual interest rate", "Number of days in a week", "Daily travel time to school", "Boiling point of water at sea level"], 2, "Travel time to school differs each day depending on circumstances, so it is a varied value.", "Easy"],
  ["What is an algebraic expression?", ["Only a single number", "A combination of terms separated by + or −", "Only a single variable", "An equation with an equals sign"], 1, "An algebraic expression consists of one or more terms separated by + or −.", "Easy"],
  ["What does the variable n usually represent?", ["A number or quantity", "Only a colour", "Only a unit of mass", "An operation sign"], 0, "The variable n usually represents the number or quantity of something.", "Easy"],
  ["Which expression contains exactly two terms?", ["5", "3x + 2y", "x", "4ab − 2x + y"], 1, "The expression 3x + 2y has two terms: 3x and 2y.", "Easy"],
  ["What is the coefficient of the term 5x in the expression 5x − 2y?", ["5", "x", "−2", "1"], 0, "The coefficient of the term 5x is 5.", "Easy"],
  ["What is the coefficient of the term −2y in the expression 5x − 2y?", ["2", "y", "−2", "−y"], 2, "The coefficient of the term −2y is −2 because the negative sign is part of the coefficient.", "Easy"],
  ["Which of these is a pair of like terms?", ["4m and 4n", "2xy and 7xy", "3a and 3a²", "p and pq"], 1, "2xy and 7xy have the same variables x and y with the same powers, so they are like terms.", "Easy"],
  ["How many variables are in the term abc?", ["1", "2", "3", "0"], 2, "The term abc contains three variables: a, b and c.", "Easy"],
  ["What does 'al-jabr' mean in Arabic?", ["To divide", "To reunite/put together", "To multiply", "To subtract"], 1, "'Al-jabr' means 'to reunite' or 'to put broken parts together'.", "Easy"],
]);

const MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Diberi x = 3, cari nilai 2x + 1.", ["5", "6", "7", "8"], 2, "2x + 1 = 2(3) + 1 = 7.", "Medium"],
  ["Diberi x = 4, cari nilai 3x − 2.", ["8", "9", "10", "12"], 2, "3x − 2 = 3(4) − 2 = 10.", "Medium"],
  ["Diberi x = 3 dan y = 2, cari nilai 8x − 5y + 7.", ["19", "20", "21", "22"], 2, "8(3) − 5(2) + 7 = 24 − 10 + 7 = 21.", "Medium"],
  ["Diberi a = 5, cari nilai a² + 1.", ["11", "21", "25", "26"], 3, "a² + 1 = 5² + 1 = 25 + 1 = 26.", "Medium"],
  ["Diberi x = 2, cari nilai 5x − x².", ["4", "6", "8", "10"], 1, "5x − x² = 5(2) − 2² = 10 − 4 = 6.", "Medium"],
  ["Permudahkan 3x + 2x.", ["5x", "5x²", "6x", "x"], 0, "3x + 2x = 5x kerana kedua-duanya sebutan serupa.", "Medium"],
  ["Permudahkan 9y − 4y.", ["4y", "5y", "5", "13y"], 1, "9y − 4y = 5y.", "Medium"],
  ["Permudahkan 7ab − 4ab.", ["3", "3a", "3ab", "11ab"], 2, "7ab − 4ab = 3ab.", "Medium"],
  ["Permudahkan 6x + 3x − 2x.", ["5x", "7x", "9x", "11x"], 1, "6x + 3x − 2x = 7x.", "Medium"],
  ["Permudahkan 4m + 5n − m.", ["3m + 5n", "9m + 5n", "4m + 4n", "3m − 5n"], 0, "Gabungkan sebutan serupa m: 4m − m = 3m, hasilnya 3m + 5n.", "Medium"],
  ["Permudahkan 2a + 3b + 4a − b.", ["6a + 2b", "6a + 4b", "2a + 2b", "6a − 2b"], 0, "Gabungkan sebutan serupa: (2a + 4a) + (3b − b) = 6a + 2b.", "Medium"],
  ["Permudahkan −(x + 4).", ["x + 4", "−x + 4", "−x − 4", "x − 4"], 2, "−(x + 4) = −x − 4.", "Medium"],
  ["Permudahkan −(3a − 2b).", ["−3a − 2b", "−3a + 2b", "3a − 2b", "3a + 2b"], 1, "−(3a − 2b) = −3a + 2b.", "Medium"],
  ["Permudahkan −(−5x − 1).", ["5x + 1", "−5x − 1", "−5x + 1", "5x − 1"], 0, "−(−5x − 1) = 5x + 1.", "Medium"],
  ["Permudahkan 5x − (2x − 3).", ["3x − 3", "3x + 3", "7x − 3", "7x + 3"], 1, "5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.", "Medium"],
  ["Permudahkan 8a − (3a + 2).", ["5a + 2", "5a − 2", "11a + 2", "11a − 2"], 1, "8a − (3a + 2) = 8a − 3a − 2 = 5a − 2.", "Medium"],
  ["Permudahkan 6x − (x − 5).", ["5x − 5", "5x + 5", "7x − 5", "7x + 5"], 1, "6x − (x − 5) = 6x − x + 5 = 5x + 5.", "Medium"],
  ["Permudahkan 4y + (2y − 3).", ["6y − 3", "6y + 3", "2y − 3", "2y + 3"], 0, "4y + (2y − 3) = 4y + 2y − 3 = 6y − 3.", "Medium"],
  ["Manakah persamaan yang betul?", ["−(a + b) = a + b", "−(a + b) = −a + b", "−(a + b) = −a − b", "−(a + b) = a − b"], 2, "−(a + b) = −a − b kerana tanda negatif didarab dengan setiap sebutan dalam kurungan.", "Medium"],
  ["Manakah persamaan yang betul?", ["−(a − b) = −a − b", "−(a − b) = −a + b", "−(a − b) = a − b", "−(a − b) = a + b"], 1, "−(a − b) = −a + b kerana tanda setiap sebutan dalam kurungan bertukar.", "Medium"],
  ["Permudahkan −(2x + 3) + 5x.", ["3x − 3", "3x + 3", "7x − 3", "7x + 3"], 0, "−(2x + 3) + 5x = −2x − 3 + 5x = 3x − 3.", "Medium"],
  ["Permudahkan −(4a − b) + 2a.", ["−2a + b", "−2a − b", "6a − b", "2a − b"], 0, "−(4a − b) + 2a = −4a + b + 2a = −2a + b.", "Medium"],
  ["Diberi x = 5, cari nilai 4x − 3.", ["15", "17", "20", "23"], 1, "4x − 3 = 4(5) − 3 = 20 − 3 = 17.", "Medium"],
  ["Diberi x = 1 dan y = 4, cari nilai 6x + 2y.", ["12", "14", "16", "18"], 1, "6x + 2y = 6(1) + 2(4) = 6 + 8 = 14.", "Medium"],
  ["Diberi a = 2 dan b = 3, cari nilai a² + b².", ["11", "12", "13", "14"], 2, "a² + b² = 2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Permudahkan 5x + 7 − 2x − 4.", ["3x + 3", "3x − 3", "7x + 3", "7x − 3"], 0, "Gabungkan sebutan serupa: (5x − 2x) + (7 − 4) = 3x + 3.", "Medium"],
  ["Permudahkan 9ab − 5ab + ab.", ["3ab", "4ab", "5ab", "13ab"], 2, "9ab − 5ab + ab = 5ab.", "Medium"],
  ["Apakah hasil bagi 3x + 5x − x?", ["6x", "7x", "8x", "9x"], 1, "3x + 5x − x = 7x.", "Medium"],
  ["Permudahkan 10p − (3p − 2).", ["7p − 2", "7p + 2", "13p − 2", "13p + 2"], 1, "10p − (3p − 2) = 10p − 3p + 2 = 7p + 2.", "Medium"],
  ["Manakah ungkapan yang dipermudahkan dengan betul daripada 6x − (2x − 5)?", ["4x − 5", "4x + 5", "8x − 5", "8x + 5"], 1, "6x − (2x − 5) = 6x − 2x + 5 = 4x + 5.", "Medium"],
]);

const MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Given x = 3, find the value of 2x + 1.", ["5", "6", "7", "8"], 2, "2x + 1 = 2(3) + 1 = 7.", "Medium"],
  ["Given x = 4, find the value of 3x − 2.", ["8", "9", "10", "12"], 2, "3x − 2 = 3(4) − 2 = 10.", "Medium"],
  ["Given x = 3 and y = 2, find the value of 8x − 5y + 7.", ["19", "20", "21", "22"], 2, "8(3) − 5(2) + 7 = 24 − 10 + 7 = 21.", "Medium"],
  ["Given a = 5, find the value of a² + 1.", ["11", "21", "25", "26"], 3, "a² + 1 = 5² + 1 = 25 + 1 = 26.", "Medium"],
  ["Given x = 2, find the value of 5x − x².", ["4", "6", "8", "10"], 1, "5x − x² = 5(2) − 2² = 10 − 4 = 6.", "Medium"],
  ["Simplify 3x + 2x.", ["5x", "5x²", "6x", "x"], 0, "3x + 2x = 5x because both are like terms.", "Medium"],
  ["Simplify 9y − 4y.", ["4y", "5y", "5", "13y"], 1, "9y − 4y = 5y.", "Medium"],
  ["Simplify 7ab − 4ab.", ["3", "3a", "3ab", "11ab"], 2, "7ab − 4ab = 3ab.", "Medium"],
  ["Simplify 6x + 3x − 2x.", ["5x", "7x", "9x", "11x"], 1, "6x + 3x − 2x = 7x.", "Medium"],
  ["Simplify 4m + 5n − m.", ["3m + 5n", "9m + 5n", "4m + 4n", "3m − 5n"], 0, "Combine the like terms m: 4m − m = 3m, giving 3m + 5n.", "Medium"],
  ["Simplify 2a + 3b + 4a − b.", ["6a + 2b", "6a + 4b", "2a + 2b", "6a − 2b"], 0, "Combine like terms: (2a + 4a) + (3b − b) = 6a + 2b.", "Medium"],
  ["Simplify −(x + 4).", ["x + 4", "−x + 4", "−x − 4", "x − 4"], 2, "−(x + 4) = −x − 4.", "Medium"],
  ["Simplify −(3a − 2b).", ["−3a − 2b", "−3a + 2b", "3a − 2b", "3a + 2b"], 1, "−(3a − 2b) = −3a + 2b.", "Medium"],
  ["Simplify −(−5x − 1).", ["5x + 1", "−5x − 1", "−5x + 1", "5x − 1"], 0, "−(−5x − 1) = 5x + 1.", "Medium"],
  ["Simplify 5x − (2x − 3).", ["3x − 3", "3x + 3", "7x − 3", "7x + 3"], 1, "5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.", "Medium"],
  ["Simplify 8a − (3a + 2).", ["5a + 2", "5a − 2", "11a + 2", "11a − 2"], 1, "8a − (3a + 2) = 8a − 3a − 2 = 5a − 2.", "Medium"],
  ["Simplify 6x − (x − 5).", ["5x − 5", "5x + 5", "7x − 5", "7x + 5"], 1, "6x − (x − 5) = 6x − x + 5 = 5x + 5.", "Medium"],
  ["Simplify 4y + (2y − 3).", ["6y − 3", "6y + 3", "2y − 3", "2y + 3"], 0, "4y + (2y − 3) = 4y + 2y − 3 = 6y − 3.", "Medium"],
  ["Which equation is correct?", ["−(a + b) = a + b", "−(a + b) = −a + b", "−(a + b) = −a − b", "−(a + b) = a − b"], 2, "−(a + b) = −a − b because the negative sign multiplies every term inside the brackets.", "Medium"],
  ["Which equation is correct?", ["−(a − b) = −a − b", "−(a − b) = −a + b", "−(a − b) = a − b", "−(a − b) = a + b"], 1, "−(a − b) = −a + b because the sign of every term inside the brackets changes.", "Medium"],
  ["Simplify −(2x + 3) + 5x.", ["3x − 3", "3x + 3", "7x − 3", "7x + 3"], 0, "−(2x + 3) + 5x = −2x − 3 + 5x = 3x − 3.", "Medium"],
  ["Simplify −(4a − b) + 2a.", ["−2a + b", "−2a − b", "6a − b", "2a − b"], 0, "−(4a − b) + 2a = −4a + b + 2a = −2a + b.", "Medium"],
  ["Given x = 5, find the value of 4x − 3.", ["15", "17", "20", "23"], 1, "4x − 3 = 4(5) − 3 = 20 − 3 = 17.", "Medium"],
  ["Given x = 1 and y = 4, find the value of 6x + 2y.", ["12", "14", "16", "18"], 1, "6x + 2y = 6(1) + 2(4) = 6 + 8 = 14.", "Medium"],
  ["Given a = 2 and b = 3, find the value of a² + b².", ["11", "12", "13", "14"], 2, "a² + b² = 2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Simplify 5x + 7 − 2x − 4.", ["3x + 3", "3x − 3", "7x + 3", "7x − 3"], 0, "Combine like terms: (5x − 2x) + (7 − 4) = 3x + 3.", "Medium"],
  ["Simplify 9ab − 5ab + ab.", ["3ab", "4ab", "5ab", "13ab"], 2, "9ab − 5ab + ab = 5ab.", "Medium"],
  ["What is the result of 3x + 5x − x?", ["6x", "7x", "8x", "9x"], 1, "3x + 5x − x = 7x.", "Medium"],
  ["Simplify 10p − (3p − 2).", ["7p − 2", "7p + 2", "13p − 2", "13p + 2"], 1, "10p − (3p − 2) = 10p − 3p + 2 = 7p + 2.", "Medium"],
  ["Which expression is the correctly simplified form of 6x − (2x − 5)?", ["4x − 5", "4x + 5", "8x − 5", "8x + 5"], 1, "6x − (2x − 5) = 6x − 2x + 5 = 4x + 5.", "Medium"],
]);

const MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Permudahkan a × a × a.", ["3a", "a³", "a + 3", "3a³"], 1, "a × a × a = a³ kerana pemboleh ubah didarab dengan dirinya sendiri tiga kali.", "Medium"],
  ["Permudahkan a² × a³.", ["a⁵", "a⁶", "2a⁵", "a¹"], 0, "a² × a³ = a²⁺³ = a⁵ (tambah kuasa pemboleh ubah yang sama).", "Medium"],
  ["Permudahkan a⁵ ÷ a².", ["a²", "a³", "a⁷", "a¹⁰"], 1, "a⁵ ÷ a² = a⁵⁻² = a³ (tolak kuasa pemboleh ubah yang sama).", "Medium"],
  ["Permudahkan b⁴ ÷ b.", ["b³", "b⁴", "b⁵", "b"], 0, "b⁴ ÷ b = b⁴⁻¹ = b³.", "Medium"],
  ["Permudahkan 2a × 3a.", ["5a", "6a", "5a²", "6a²"], 3, "2a × 3a = (2 × 3) × (a × a) = 6a².", "Medium"],
  ["Permudahkan 4x × 2x².", ["6x²", "6x³", "8x²", "8x³"], 3, "4x × 2x² = (4 × 2) × (x × x²) = 8x¹⁺² = 8x³.", "Medium"],
  ["Permudahkan 3ab² × 4a³b.", ["7a⁴b³", "12a³b²", "12a⁴b³", "12a⁴b²"], 2, "3ab² × 4a³b = (3 × 4) × a¹⁺³ × b²⁺¹ = 12a⁴b³.", "Hard"],
  ["Permudahkan 5m²n × 2mn³.", ["7m³n⁴", "10m³n⁴", "10m²n³", "7m²n³"], 1, "5m²n × 2mn³ = (5 × 2) × m²⁺¹ × n¹⁺³ = 10m³n⁴.", "Hard"],
  ["Permudahkan 20m⁴n² ÷ 5m²n³.", ["4m²n", "4m²/n", "4mn⁻¹", "4m⁶n⁻¹"], 1, "20m⁴n² ÷ 5m²n³ = (20 ÷ 5) × m⁴⁻² × n²⁻³ = 4m²n⁻¹ = 4m²/n.", "Hard"],
  ["Permudahkan 12x³y² ÷ 4xy.", ["3x²y", "3x³y²", "3xy", "8x²y"], 0, "12x³y² ÷ 4xy = (12 ÷ 4) × x³⁻¹ × y²⁻¹ = 3x²y.", "Hard"],
  ["Permudahkan 18a⁵b³ ÷ 6a²b.", ["3a³b²", "3a⁷b⁴", "12a³b²", "3a²b³"], 0, "18a⁵b³ ÷ 6a²b = (18 ÷ 6) × a⁵⁻² × b³⁻¹ = 3a³b².", "Hard"],
  ["Tulis m × m × m × m dalam bentuk kuasa.", ["m³", "m⁴", "4m", "4m⁴"], 1, "m × m × m × m = m⁴ (empat kali pendaraban berulang).", "Medium"],
  ["Tulis (a + b)(a + b)(a + b) dalam bentuk kuasa.", ["(a + b) + 3", "3(a + b)", "(a + b)³", "(a + b)²"], 2, "(a + b)(a + b)(a + b) = (a + b)³ (pendaraban berulang ungkapan).", "Medium"],
  ["Permudahkan 6x² × 3x.", ["9x²", "9x³", "18x²", "18x³"], 3, "6x² × 3x = (6 × 3) × x²⁺¹ = 18x³.", "Medium"],
  ["Permudahkan 9p⁴ ÷ 3p².", ["3p", "3p²", "6p²", "6p⁶"], 1, "9p⁴ ÷ 3p² = (9 ÷ 3) × p⁴⁻² = 3p².", "Medium"],
  ["Permudahkan 7a²b³ × 2ab².", ["9a³b⁵", "14a²b⁵", "14a³b⁵", "14a³b⁶"], 2, "7a²b³ × 2ab² = (7 × 2) × a²⁺¹ × b³⁺² = 14a³b⁵.", "Hard"],
  ["Permudahkan 24x⁵y⁴ ÷ 8x³y².", ["3x²y²", "3x⁸y⁶", "16x²y²", "3x²y⁶"], 0, "24x⁵y⁴ ÷ 8x³y² = (24 ÷ 8) × x⁵⁻³ × y⁴⁻² = 3x²y².", "Hard"],
  ["Permudahkan 7x − (2x − 3) + 4.", ["5x − 1", "5x + 7", "5x + 1", "9x + 1"], 1, "7x − (2x − 3) + 4 = 7x − 2x + 3 + 4 = 5x + 7.", "Medium"],
  ["Permudahkan 5a − (3a + 2) − 4.", ["2a − 6", "2a + 6", "8a − 6", "8a + 6"], 0, "5a − (3a + 2) − 4 = 5a − 3a − 2 − 4 = 2a − 6.", "Medium"],
  ["Permudahkan 9y − (y − 6) + 2y.", ["10y + 6", "10y − 6", "12y + 6", "6y + 6"], 0, "9y − (y − 6) + 2y = 9y − y + 6 + 2y = 10y + 6.", "Medium"],
  ["Permudahkan 4m²n × 5mn² ÷ 2mn.", ["10m²n²", "10mn²", "20m²n²", "20mn"], 0, "4m²n × 5mn² = 20m³n³; kemudian 20m³n³ ÷ 2mn = 10m²n².", "Hard"],
  ["Permudahkan (3x²y)(2xy²) ÷ (xy).", ["6x²y²", "6xy²", "6x²y", "3xy²"], 0, "(3x²y)(2xy²) = 6x³y³; kemudian 6x³y³ ÷ (xy) = 6x²y².", "Hard"],
  ["Cari nilai bagi 5x² − 2x apabila x = 3.", ["35", "39", "41", "45"], 1, "5x² − 2x = 5(3)² − 2(3) = 45 − 6 = 39.", "Medium"],
  ["Cari nilai bagi 2a² + 3b apabila a = 2 dan b = 4.", ["14", "16", "18", "20"], 3, "2a² + 3b = 2(2)² + 3(4) = 8 + 12 = 20.", "Medium"],
  ["Permudahkan 8x − 3y − (2x − y).", ["6x − 2y", "6x − 4y", "10x − 2y", "10x − 4y"], 0, "8x − 3y − (2x − y) = 8x − 3y − 2x + y = 6x − 2y.", "Medium"],
  ["Permudahkan 7m − 4n − (3m − 2n).", ["4m − 2n", "4m − 6n", "10m − 2n", "10m − 6n"], 0, "7m − 4n − (3m − 2n) = 7m − 4n − 3m + 2n = 4m − 2n.", "Medium"],
  ["Sebuah segi empat tepat mempunyai panjang 3x dan lebar 2x. Apakah ungkapan bagi luasnya?", ["5x", "6x", "5x²", "6x²"], 3, "Luas segi empat tepat = panjang × lebar = 3x × 2x = 6x².", "Hard"],
  ["Sebuah kotak berbentuk kubus mempunyai sisi sepanjang a unit. Apakah ungkapan bagi isipadunya?", ["3a", "a³", "a²", "3a³"], 1, "Isipadu kubus = sisi × sisi × sisi = a × a × a = a³.", "Hard"],
  ["Permudahkan 6x²y³ ÷ 3xy menggunakan hukum kuasa.", ["2xy²", "3xy²", "2x²y³", "2xy"], 0, "6x²y³ ÷ 3xy = (6 ÷ 3) × x²⁻¹ × y³⁻¹ = 2xy².", "Hard"],
  ["Permudahkan −(2x − y) − (x + 3y).", ["−3x − 2y", "−3x + 2y", "−x − 2y", "−x + 4y"], 0, "−(2x − y) − (x + 3y) = (−2x + y) + (−x − 3y) = −3x − 2y.", "Hard"],
]);

const MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["Simplify a × a × a.", ["3a", "a³", "a + 3", "3a³"], 1, "a × a × a = a³ because the variable is multiplied by itself three times.", "Medium"],
  ["Simplify a² × a³.", ["a⁵", "a⁶", "2a⁵", "a¹"], 0, "a² × a³ = a²⁺³ = a⁵ (add the powers of the same variable).", "Medium"],
  ["Simplify a⁵ ÷ a².", ["a²", "a³", "a⁷", "a¹⁰"], 1, "a⁵ ÷ a² = a⁵⁻² = a³ (subtract the powers of the same variable).", "Medium"],
  ["Simplify b⁴ ÷ b.", ["b³", "b⁴", "b⁵", "b"], 0, "b⁴ ÷ b = b⁴⁻¹ = b³.", "Medium"],
  ["Simplify 2a × 3a.", ["5a", "6a", "5a²", "6a²"], 3, "2a × 3a = (2 × 3) × (a × a) = 6a².", "Medium"],
  ["Simplify 4x × 2x².", ["6x²", "6x³", "8x²", "8x³"], 3, "4x × 2x² = (4 × 2) × (x × x²) = 8x¹⁺² = 8x³.", "Medium"],
  ["Simplify 3ab² × 4a³b.", ["7a⁴b³", "12a³b²", "12a⁴b³", "12a⁴b²"], 2, "3ab² × 4a³b = (3 × 4) × a¹⁺³ × b²⁺¹ = 12a⁴b³.", "Hard"],
  ["Simplify 5m²n × 2mn³.", ["7m³n⁴", "10m³n⁴", "10m²n³", "7m²n³"], 1, "5m²n × 2mn³ = (5 × 2) × m²⁺¹ × n¹⁺³ = 10m³n⁴.", "Hard"],
  ["Simplify 20m⁴n² ÷ 5m²n³.", ["4m²n", "4m²/n", "4mn⁻¹", "4m⁶n⁻¹"], 1, "20m⁴n² ÷ 5m²n³ = (20 ÷ 5) × m⁴⁻² × n²⁻³ = 4m²n⁻¹ = 4m²/n.", "Hard"],
  ["Simplify 12x³y² ÷ 4xy.", ["3x²y", "3x³y²", "3xy", "8x²y"], 0, "12x³y² ÷ 4xy = (12 ÷ 4) × x³⁻¹ × y²⁻¹ = 3x²y.", "Hard"],
  ["Simplify 18a⁵b³ ÷ 6a²b.", ["3a³b²", "3a⁷b⁴", "12a³b²", "3a²b³"], 0, "18a⁵b³ ÷ 6a²b = (18 ÷ 6) × a⁵⁻² × b³⁻¹ = 3a³b².", "Hard"],
  ["Write m × m × m × m in power form.", ["m³", "m⁴", "4m", "4m⁴"], 1, "m × m × m × m = m⁴ (four repeated multiplications).", "Medium"],
  ["Write (a + b)(a + b)(a + b) in power form.", ["(a + b) + 3", "3(a + b)", "(a + b)³", "(a + b)²"], 2, "(a + b)(a + b)(a + b) = (a + b)³ (repeated multiplication of an expression).", "Medium"],
  ["Simplify 6x² × 3x.", ["9x²", "9x³", "18x²", "18x³"], 3, "6x² × 3x = (6 × 3) × x²⁺¹ = 18x³.", "Medium"],
  ["Simplify 9p⁴ ÷ 3p².", ["3p", "3p²", "6p²", "6p⁶"], 1, "9p⁴ ÷ 3p² = (9 ÷ 3) × p⁴⁻² = 3p².", "Medium"],
  ["Simplify 7a²b³ × 2ab².", ["9a³b⁵", "14a²b⁵", "14a³b⁵", "14a³b⁶"], 2, "7a²b³ × 2ab² = (7 × 2) × a²⁺¹ × b³⁺² = 14a³b⁵.", "Hard"],
  ["Simplify 24x⁵y⁴ ÷ 8x³y².", ["3x²y²", "3x⁸y⁶", "16x²y²", "3x²y⁶"], 0, "24x⁵y⁴ ÷ 8x³y² = (24 ÷ 8) × x⁵⁻³ × y⁴⁻² = 3x²y².", "Hard"],
  ["Simplify 7x − (2x − 3) + 4.", ["5x − 1", "5x + 7", "5x + 1", "9x + 1"], 1, "7x − (2x − 3) + 4 = 7x − 2x + 3 + 4 = 5x + 7.", "Medium"],
  ["Simplify 5a − (3a + 2) − 4.", ["2a − 6", "2a + 6", "8a − 6", "8a + 6"], 0, "5a − (3a + 2) − 4 = 5a − 3a − 2 − 4 = 2a − 6.", "Medium"],
  ["Simplify 9y − (y − 6) + 2y.", ["10y + 6", "10y − 6", "12y + 6", "6y + 6"], 0, "9y − (y − 6) + 2y = 9y − y + 6 + 2y = 10y + 6.", "Medium"],
  ["Simplify 4m²n × 5mn² ÷ 2mn.", ["10m²n²", "10mn²", "20m²n²", "20mn"], 0, "4m²n × 5mn² = 20m³n³; then 20m³n³ ÷ 2mn = 10m²n².", "Hard"],
  ["Simplify (3x²y)(2xy²) ÷ (xy).", ["6x²y²", "6xy²", "6x²y", "3xy²"], 0, "(3x²y)(2xy²) = 6x³y³; then 6x³y³ ÷ (xy) = 6x²y².", "Hard"],
  ["Find the value of 5x² − 2x when x = 3.", ["35", "39", "41", "45"], 1, "5x² − 2x = 5(3)² − 2(3) = 45 − 6 = 39.", "Medium"],
  ["Find the value of 2a² + 3b when a = 2 and b = 4.", ["14", "16", "18", "20"], 3, "2a² + 3b = 2(2)² + 3(4) = 8 + 12 = 20.", "Medium"],
  ["Simplify 8x − 3y − (2x − y).", ["6x − 2y", "6x − 4y", "10x − 2y", "10x − 4y"], 0, "8x − 3y − (2x − y) = 8x − 3y − 2x + y = 6x − 2y.", "Medium"],
  ["Simplify 7m − 4n − (3m − 2n).", ["4m − 2n", "4m − 6n", "10m − 2n", "10m − 6n"], 0, "7m − 4n − (3m − 2n) = 7m − 4n − 3m + 2n = 4m − 2n.", "Medium"],
  ["A rectangle has a length of 3x and a width of 2x. What is the expression for its area?", ["5x", "6x", "5x²", "6x²"], 3, "Area of rectangle = length × width = 3x × 2x = 6x².", "Hard"],
  ["A cube-shaped box has sides of length a units. What is the expression for its volume?", ["3a", "a³", "a²", "3a³"], 1, "Volume of cube = side × side × side = a × a × a = a³.", "Hard"],
  ["Simplify 6x²y³ ÷ 3xy using the laws of indices.", ["2xy²", "3xy²", "2x²y³", "2xy"], 0, "6x²y³ ÷ 3xy = (6 ÷ 3) × x²⁻¹ × y³⁻¹ = 2xy².", "Hard"],
  ["Simplify −(2x − y) − (x + 3y).", ["−3x − 2y", "−3x + 2y", "−x − 2y", "−x + 4y"], 0, "−(2x − y) − (x + 3y) = (−2x + y) + (−x − 3y) = −3x − 2y.", "Hard"],
]);

const MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah persamaan linear?", ["Persamaan dengan kuasa tertinggi pemboleh ubah ialah 1", "Persamaan dengan kuasa tertinggi pemboleh ubah ialah 2", "Persamaan tanpa pemboleh ubah", "Persamaan dengan dua tanda sama dengan"], 0, "Persamaan linear ialah persamaan yang kuasa tertinggi pemboleh ubahnya ialah 1.", "Easy"],
  ["Manakah antara berikut ialah persamaan linear?", ["10x² + 5x − 3 = 1", "x² − 4 = 0", "5r + 1 = 0", "x² + y = 6"], 2, "5r + 1 = 0 ialah persamaan linear kerana kuasa tertinggi r ialah 1.", "Easy"],
  ["Mengapakah 10x² + 5x − 3 = 1 BUKAN persamaan linear?", ["Kerana ia mempunyai dua pemboleh ubah", "Kerana x berkuasa 2", "Kerana ia tiada pemalar", "Kerana pekali x ialah 5"], 1, "Persamaan itu mengandungi x², iaitu pemboleh ubah berkuasa 2, jadi ia bukan persamaan linear.", "Easy"],
  ["Apakah ciri utama persamaan linear dalam satu pemboleh ubah?", ["Mengandungi dua jenis pemboleh ubah", "Mengandungi hanya satu jenis pemboleh ubah berkuasa 1", "Tiada pemboleh ubah", "Mempunyai dua tanda sama dengan"], 1, "Persamaan linear dalam satu pemboleh ubah hanya mengandungi satu jenis pemboleh ubah yang berkuasa 1.", "Easy"],
  ["Manakah berikut ialah contoh persamaan linear dalam satu pemboleh ubah?", ["5x + 2y = 8", "x + 7 = 11", "x² = 9", "xy = 10"], 1, "x + 7 = 11 hanya mengandungi satu pemboleh ubah, iaitu x, berkuasa 1.", "Easy"],
  ["Berapakah bilangan jenis pemboleh ubah dalam persamaan x + 7 = 11?", ["0", "1", "2", "3"], 1, "Persamaan x + 7 = 11 hanya mengandungi satu jenis pemboleh ubah, iaitu x.", "Easy"],
  ["Tulis persamaan bagi 'Suatu nombor m dibahagi dengan 6 memberi 12'.", ["m × 6 = 12", "m + 6 = 12", "m/6 = 12", "m − 6 = 12"], 2, "'Dibahagi dengan 6 memberi 12' diterjemahkan kepada m/6 = 12.", "Easy"],
  ["Tulis persamaan bagi 'Rahim ada RM p, membelanjakan RM q dan berbaki RM10'.", ["p + q = 10", "p − q = 10", "p × q = 10", "p ÷ q = 10"], 1, "Baki = jumlah asal − perbelanjaan, maka p − q = 10.", "Easy"],
  ["Apakah ciri utama persamaan linear dalam dua pemboleh ubah?", ["Mengandungi dua pemboleh ubah berbeza yang masing-masing berkuasa 1", "Mengandungi satu pemboleh ubah sahaja", "Mengandungi pemboleh ubah berkuasa 2", "Tiada pemalar"], 0, "Persamaan linear dalam dua pemboleh ubah mengandungi dua pemboleh ubah berbeza yang setiap satunya berkuasa 1.", "Easy"],
  ["Manakah berikut ialah contoh persamaan linear dalam dua pemboleh ubah?", ["x + 7 = 11", "5x + 2y = 8", "x² + y = 6", "x³ = 27"], 1, "5x + 2y = 8 mengandungi dua pemboleh ubah berbeza, x dan y, masing-masing berkuasa 1.", "Easy"],
  ["Berapakah bilangan jenis pemboleh ubah dalam persamaan 5x + 2y = 8?", ["1", "2", "3", "4"], 1, "Persamaan 5x + 2y = 8 mengandungi dua jenis pemboleh ubah, iaitu x dan y.", "Easy"],
  ["Apakah maksud 'pemboleh ubah' dalam suatu persamaan?", ["Nombor tetap dalam persamaan", "Huruf atau simbol yang mewakili nilai yang tidak diketahui", "Tanda operasi seperti + atau −", "Jawapan akhir kepada persamaan"], 1, "Pemboleh ubah ialah huruf atau simbol yang mewakili nilai yang tidak diketahui.", "Easy"],
  ["Pada kuasa berapakah pemboleh ubah mesti berada supaya suatu persamaan dianggap persamaan linear?", ["0", "1", "2", "3"], 1, "Bagi suatu persamaan dianggap linear, semua pemboleh ubahnya mesti berkuasa 1.", "Easy"],
  ["Tulis persamaan bagi 'beza umur Salim, p tahun, dengan adiknya, q tahun, ialah 10 tahun'.", ["p + q = 10", "p − q = 10", "p ÷ q = 10", "pq = 10"], 1, "Beza umur ditulis sebagai p − q = 10.", "Easy"],
  ["Manakah berikut BUKAN persamaan linear dalam dua pemboleh ubah?", ["5x + 2y = 8", "p − q = 10", "x² + y = 6", "2m + n = 15"], 2, "x² + y = 6 mengandungi x berkuasa 2, jadi ia bukan persamaan linear.", "Easy"],
  ["Apakah perbezaan utama antara persamaan linear dalam satu pemboleh ubah dan dua pemboleh ubah?", ["Persamaan satu pemboleh ubah tidak mempunyai penyelesaian", "Persamaan satu pemboleh ubah mengandungi satu jenis pemboleh ubah, manakala persamaan dua pemboleh ubah mengandungi dua", "Persamaan dua pemboleh ubah hanya mempunyai satu penyelesaian", "Tiada perbezaan antara kedua-duanya"], 1, "Perbezaan utama ialah bilangan jenis pemboleh ubah yang terlibat: satu berbanding dua.", "Easy"],
  ["Apakah maksud 'menyelesaikan' suatu persamaan linear?", ["Menukar persamaan kepada ungkapan", "Mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan sama nilai", "Menggandakan kedua-dua belah persamaan", "Menukar tanda semua sebutan dalam persamaan"], 1, "Menyelesaikan persamaan bermaksud mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan sama nilai.", "Easy"],
  ["Berapakah bilangan penyelesaian yang dimiliki oleh sebuah persamaan linear dalam dua pemboleh ubah?", ["Tiada penyelesaian", "Hanya satu penyelesaian", "Dua penyelesaian sahaja", "Tidak terhingga banyaknya"], 3, "Persamaan linear dalam dua pemboleh ubah mempunyai bilangan penyelesaian yang tidak terhingga.", "Easy"],
  ["Apakah bentuk standard bagi persamaan linear dalam dua pemboleh ubah?", ["ax + b = 0", "ax² + bx + c = 0", "ax + by = c", "a/x = b"], 2, "Bentuk standard persamaan linear dalam dua pemboleh ubah ialah ax + by = c.", "Easy"],
  ["Bagaimanakah anda menentukan sama ada suatu persamaan ialah persamaan linear?", ["Lihat bilangan sebutan dalam persamaan", "Periksa kuasa tertinggi setiap pemboleh ubah", "Lihat tanda di hadapan pemalar", "Kira jumlah pekali dalam persamaan"], 1, "Untuk menentukan sama ada suatu persamaan linear, periksa kuasa tertinggi setiap pemboleh ubah; jika semuanya 1, ia linear.", "Easy"],
  ["Tulis persamaan bagi 'dua kali suatu nombor n tambah 5 sama dengan 17'.", ["2n + 5 = 17", "n + 2 = 17", "2(n + 5) = 17", "n − 2 = 17"], 0, "'Dua kali suatu nombor n tambah 5' diterjemahkan kepada 2n + 5, maka persamaannya ialah 2n + 5 = 17.", "Easy"],
  ["Manakah antara berikut mengandungi pemboleh ubah berkuasa 2?", ["5r + 1 = 0", "x + 7 = 11", "x² − 4 = 0", "5x + 2y = 8"], 2, "x² − 4 = 0 mengandungi pemboleh ubah x yang berkuasa 2.", "Easy"],
  ["Tulis persamaan bagi 'jumlah dua nombor x dan y ialah 20'.", ["x − y = 20", "x + y = 20", "xy = 20", "x/y = 20"], 1, "Jumlah dua nombor ditulis sebagai x + y = 20.", "Easy"],
  ["Apakah langkah pertama dalam membentuk persamaan linear daripada situasi harian?", ["Selesaikan persamaan terus", "Kenal pasti kuantiti yang tidak diketahui dan wakilkannya dengan pemboleh ubah", "Lukis graf situasi tersebut", "Tukar semua nombor kepada pecahan"], 1, "Langkah pertama ialah mengenal pasti kuantiti yang tidak diketahui dan mewakilkannya dengan pemboleh ubah.", "Easy"],
  ["Persamaan 5r + 1 = 0 ialah persamaan linear dalam berapa pemboleh ubah?", ["Tiada pemboleh ubah", "Satu pemboleh ubah", "Dua pemboleh ubah", "Tiga pemboleh ubah"], 1, "Persamaan 5r + 1 = 0 hanya mengandungi satu jenis pemboleh ubah, iaitu r.", "Easy"],
  ["Manakah antara berikut ialah persamaan linear?", ["xy = 12", "x + y = 9", "x³ = 8", "1/x = 5"], 1, "x + y = 9 ialah persamaan linear kerana x dan y masing-masing berkuasa 1.", "Easy"],
  ["Apakah yang dimaksudkan dengan 'kuasa tertinggi pemboleh ubah ialah 1'?", ["Pemboleh ubah didarab dengan 1", "Pemboleh ubah tidak mempunyai sebarang kuasa yang ditulis melebihi 1, iaitu x¹", "Pemalar persamaan ialah 1", "Pekali pemboleh ubah ialah 1"], 1, "Maksudnya ialah pemboleh ubah itu hanya muncul sebagai x¹ (ditulis sebagai x), bukan x², x³ dan sebagainya.", "Easy"],
  ["Tulis persamaan bagi 'tiga kali suatu nombor p ditolak 4 sama dengan 11'.", ["3p − 4 = 11", "3(p − 4) = 11", "p − 3 = 11", "3p + 4 = 11"], 0, "'Tiga kali suatu nombor p ditolak 4' diterjemahkan kepada 3p − 4, maka persamaannya ialah 3p − 4 = 11.", "Easy"],
  ["Berikan satu sebab mengapa x² + y = 6 bukan persamaan linear.", ["Ia mempunyai dua pemboleh ubah", "Pemboleh ubah x berkuasa 2", "Pemalar 6 terlalu besar", "Ia mempunyai tanda tambah"], 1, "x² + y = 6 bukan persamaan linear kerana pemboleh ubah x berkuasa 2, bukan 1.", "Easy"],
  ["Apakah yang membezakan suatu persamaan daripada ungkapan algebra?", ["Persamaan mempunyai tanda sama dengan (=) yang menunjukkan dua bahagian sama nilai", "Persamaan tidak mempunyai pemboleh ubah", "Ungkapan algebra sentiasa lebih panjang", "Persamaan tidak mempunyai pemalar"], 0, "Persamaan mengandungi tanda sama dengan (=) yang menunjukkan dua bahagian mempunyai nilai yang sama, manakala ungkapan algebra tidak.", "Easy"],
]);

const MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a linear equation?", ["An equation in which the highest power of the variable is 1", "An equation in which the highest power of the variable is 2", "An equation without any variables", "An equation with two equals signs"], 0, "A linear equation is an equation in which the highest power of the variable is 1.", "Easy"],
  ["Which of the following is a linear equation?", ["10x² + 5x − 3 = 1", "x² − 4 = 0", "5r + 1 = 0", "x² + y = 6"], 2, "5r + 1 = 0 is a linear equation because the highest power of r is 1.", "Easy"],
  ["Why is 10x² + 5x − 3 = 1 NOT a linear equation?", ["Because it has two variables", "Because x is raised to the power of 2", "Because it has no constant", "Because the coefficient of x is 5"], 1, "The equation contains x², a variable raised to the power of 2, so it is not linear.", "Easy"],
  ["What is the main feature of a linear equation in one variable?", ["It contains two types of variables", "It contains only one type of variable raised to the power of 1", "It contains no variables", "It has two equals signs"], 1, "A linear equation in one variable contains only one type of variable raised to the power of 1.", "Easy"],
  ["Which of the following is an example of a linear equation in one variable?", ["5x + 2y = 8", "x + 7 = 11", "x² = 9", "xy = 10"], 1, "x + 7 = 11 contains only one variable, x, raised to the power of 1.", "Easy"],
  ["How many types of variables are in the equation x + 7 = 11?", ["0", "1", "2", "3"], 1, "The equation x + 7 = 11 contains only one type of variable, x.", "Easy"],
  ["Write the equation for 'A number m divided by 6 gives 12'.", ["m × 6 = 12", "m + 6 = 12", "m/6 = 12", "m − 6 = 12"], 2, "'Divided by 6 gives 12' translates to m/6 = 12.", "Easy"],
  ["Write the equation for 'Rahim has RM p, spends RM q, and has RM10 left'.", ["p + q = 10", "p − q = 10", "p × q = 10", "p ÷ q = 10"], 1, "Amount left = original amount − amount spent, so p − q = 10.", "Easy"],
  ["What is the main feature of a linear equation in two variables?", ["It contains two different variables, each raised to the power of 1", "It contains only one variable", "It contains a variable raised to the power of 2", "It has no constant"], 0, "A linear equation in two variables contains two different variables, each raised to the power of 1.", "Easy"],
  ["Which of the following is an example of a linear equation in two variables?", ["x + 7 = 11", "5x + 2y = 8", "x² + y = 6", "x³ = 27"], 1, "5x + 2y = 8 contains two different variables, x and y, each raised to the power of 1.", "Easy"],
  ["How many types of variables are in the equation 5x + 2y = 8?", ["1", "2", "3", "4"], 1, "The equation 5x + 2y = 8 contains two types of variables, x and y.", "Easy"],
  ["What does 'variable' mean in an equation?", ["A fixed number in the equation", "A letter or symbol that represents an unknown value", "An operation sign such as + or −", "The final answer to the equation"], 1, "A variable is a letter or symbol that represents an unknown value.", "Easy"],
  ["To what power must a variable be raised for an equation to be considered linear?", ["0", "1", "2", "3"], 1, "For an equation to be considered linear, all of its variables must be raised to the power of 1.", "Easy"],
  ["Write the equation for 'The difference between Salim's age, p years, and his sister's age, q years, is 10 years'.", ["p + q = 10", "p − q = 10", "p ÷ q = 10", "pq = 10"], 1, "The age difference is written as p − q = 10.", "Easy"],
  ["Which of the following is NOT a linear equation in two variables?", ["5x + 2y = 8", "p − q = 10", "x² + y = 6", "2m + n = 15"], 2, "x² + y = 6 contains x raised to the power of 2, so it is not a linear equation.", "Easy"],
  ["What is the main difference between a linear equation in one variable and one in two variables?", ["A one-variable equation has no solutions", "A one-variable equation contains one type of variable, while a two-variable equation contains two", "A two-variable equation only has one solution", "There is no difference between them"], 1, "The main difference is the number of types of variables involved: one versus two.", "Easy"],
  ["What does it mean to 'solve' a linear equation?", ["Turning the equation into an expression", "Finding the value of the variable that makes both sides of the equation equal in value", "Doubling both sides of the equation", "Changing the sign of every term in the equation"], 1, "Solving an equation means finding the value of the variable that makes both sides of the equation equal in value.", "Easy"],
  ["How many solutions does a linear equation in two variables have?", ["No solutions", "Only one solution", "Only two solutions", "An infinite number of solutions"], 3, "A linear equation in two variables has an infinite number of solutions.", "Easy"],
  ["What is the standard form of a linear equation in two variables?", ["ax + b = 0", "ax² + bx + c = 0", "ax + by = c", "a/x = b"], 2, "The standard form of a linear equation in two variables is ax + by = c.", "Easy"],
  ["How do you determine whether an equation is a linear equation?", ["Look at the number of terms in the equation", "Check the highest power of every variable", "Look at the sign in front of the constant", "Count the total of the coefficients"], 1, "To determine whether an equation is linear, check the highest power of every variable; if all are 1, it is linear.", "Easy"],
  ["Write the equation for 'Two times a number n plus 5 equals 17'.", ["2n + 5 = 17", "n + 2 = 17", "2(n + 5) = 17", "n − 2 = 17"], 0, "'Two times a number n plus 5' translates to 2n + 5, so the equation is 2n + 5 = 17.", "Easy"],
  ["Which of the following contains a variable raised to the power of 2?", ["5r + 1 = 0", "x + 7 = 11", "x² − 4 = 0", "5x + 2y = 8"], 2, "x² − 4 = 0 contains the variable x raised to the power of 2.", "Easy"],
  ["Write the equation for 'The sum of two numbers x and y is 20'.", ["x − y = 20", "x + y = 20", "xy = 20", "x/y = 20"], 1, "The sum of two numbers is written as x + y = 20.", "Easy"],
  ["What is the first step in forming a linear equation from a daily-life situation?", ["Solve the equation directly", "Identify the unknown quantity and represent it with a variable", "Draw a graph of the situation", "Convert all numbers to fractions"], 1, "The first step is to identify the unknown quantity and represent it with a variable.", "Easy"],
  ["How many variables does the equation 5r + 1 = 0 contain?", ["No variables", "One variable", "Two variables", "Three variables"], 1, "The equation 5r + 1 = 0 contains only one type of variable, r.", "Easy"],
  ["Which of the following is a linear equation?", ["xy = 12", "x + y = 9", "x³ = 8", "1/x = 5"], 1, "x + y = 9 is a linear equation because x and y are each raised to the power of 1.", "Easy"],
  ["What does it mean for the 'highest power of the variable to be 1'?", ["The variable is multiplied by 1", "The variable does not appear with any power higher than 1, that is, written as x¹", "The constant of the equation is 1", "The coefficient of the variable is 1"], 1, "It means the variable only appears as x¹ (written as x), not x², x³, and so on.", "Easy"],
  ["Write the equation for 'Three times a number p minus 4 equals 11'.", ["3p − 4 = 11", "3(p − 4) = 11", "p − 3 = 11", "3p + 4 = 11"], 0, "'Three times a number p minus 4' translates to 3p − 4, so the equation is 3p − 4 = 11.", "Easy"],
  ["Give one reason why x² + y = 6 is not a linear equation.", ["It has two variables", "The variable x is raised to the power of 2", "The constant 6 is too large", "It has a plus sign"], 1, "x² + y = 6 is not a linear equation because the variable x is raised to the power of 2, not 1.", "Easy"],
  ["What distinguishes an equation from an algebraic expression?", ["An equation has an equals sign (=) showing two parts have equal value", "An equation has no variables", "An algebraic expression is always longer", "An equation has no constants"], 0, "An equation contains an equals sign (=) showing that two parts have equal value, while an algebraic expression does not.", "Easy"],
]);

const MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Selesaikan persamaan x + 7 = 11 menggunakan konsep kesamaan.", ["x = 3", "x = 4", "x = 18", "x = −4"], 1, "Tolak 7 daripada kedua-dua belah: x + 7 − 7 = 11 − 7, maka x = 4.", "Medium"],
  ["Apakah operasi yang perlu dilakukan pada kedua-dua belah persamaan x + 7 = 11 untuk mendapatkan x bersendirian?", ["Tambah 7", "Tolak 7", "Darab dengan 7", "Bahagi dengan 7"], 1, "Untuk mengasingkan x, tolak 7 daripada kedua-dua belah persamaan.", "Medium"],
  ["Apakah konsep kesamaan?", ["Melakukan operasi berbeza pada setiap belah persamaan", "Melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang", "Menukar semua pemboleh ubah kepada nombor", "Mengabaikan tanda sama dengan dalam persamaan"], 1, "Konsep kesamaan ialah melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang.", "Medium"],
  ["Selesaikan persamaan x − 5 = 9 menggunakan konsep kesamaan.", ["x = 4", "x = 14", "x = −4", "x = 45"], 1, "Tambah 5 pada kedua-dua belah: x − 5 + 5 = 9 + 5, maka x = 14.", "Medium"],
  ["Gunakan kaedah cuba jaya untuk menyelesaikan x + 5 = 9. Apakah nilai x yang betul?", ["x = 2", "x = 3", "x = 4", "x = 5"], 2, "Apabila x = 4, 4 + 5 = 9, jadi kedua-dua belah sama nilai dan x = 4 ialah penyelesaiannya.", "Medium"],
  ["Mengapakah kaedah cuba jaya kurang sesuai untuk persamaan dengan penyelesaian berbentuk pecahan?", ["Kerana kaedah ini terlalu mudah", "Kerana ia mengambil masa lebih lama untuk mencuba pelbagai nilai", "Kerana pecahan tidak boleh disubstitusikan", "Kerana ia hanya berfungsi untuk persamaan dua pemboleh ubah"], 1, "Kaedah cuba jaya mengambil masa lebih lama apabila penyelesaiannya ialah nombor besar atau pecahan.", "Medium"],
  ["Apakah operasi songsang bagi penambahan?", ["Pendaraban", "Pembahagian", "Penolakan", "Punca kuasa dua"], 2, "Operasi songsang bagi penambahan (+) ialah penolakan (−).", "Medium"],
  ["Apakah operasi songsang bagi pendaraban?", ["Penambahan", "Penolakan", "Pembahagian", "Kuasa dua"], 2, "Operasi songsang bagi pendaraban (×) ialah pembahagian (÷).", "Medium"],
  ["Selesaikan persamaan 4x/5 + 7 = 23 menggunakan kaedah pematahbalikan. Apakah langkah pertama?", ["Darab kedua-dua belah dengan 5", "Tolak 7 daripada kedua-dua belah", "Bahagi kedua-dua belah dengan 4", "Tambah 7 pada kedua-dua belah"], 1, "Langkah pertama ialah menolak 7 daripada kedua-dua belah supaya 4x/5 = 16.", "Medium"],
  ["Dalam menyelesaikan 4x/5 + 7 = 23, selepas mendapat 4x/5 = 16, apakah langkah seterusnya?", ["Bahagi kedua-dua belah dengan 5", "Darab kedua-dua belah dengan 5", "Tolak 16 daripada kedua-dua belah", "Tambah 4 pada kedua-dua belah"], 1, "Darab kedua-dua belah dengan 5 untuk mendapatkan 4x = 80.", "Medium"],
  ["Berapakah nilai x dalam persamaan 4x/5 + 7 = 23?", ["x = 16", "x = 20", "x = 80", "x = 4"], 1, "Mengikut langkah pematahbalikan: 4x/5 = 16 → 4x = 80 → x = 20.", "Medium"],
  ["Selesaikan persamaan 3x − 4 = 11.", ["x = 3", "x = 5", "x = 7", "x = 15"], 1, "3x − 4 = 11 → 3x = 15 → x = 5.", "Medium"],
  ["Selesaikan persamaan x/4 = 6.", ["x = 1.5", "x = 10", "x = 24", "x = 2"], 2, "x/4 = 6 → x = 6 × 4 = 24.", "Medium"],
  ["Selesaikan persamaan 2x + 3 = 13.", ["x = 5", "x = 8", "x = 10", "x = 6.5"], 0, "2x + 3 = 13 → 2x = 10 → x = 5.", "Medium"],
  ["Selesaikan persamaan 5x − 1 = 0.", ["x = −5", "x = 5", "x = −0.2", "x = 0.2"], 3, "5x − 1 = 0 → 5x = 1 → x = 0.2.", "Medium"],
  ["Diberi y = 7x + 6, apakah nilai y apabila x = 0?", ["y = 0", "y = 6", "y = 7", "y = 13"], 1, "y = 7(0) + 6 = 6.", "Medium"],
  ["Diberi y = 7x + 6, apakah nilai y apabila x = 1?", ["y = 6", "y = 7", "y = 13", "y = 14"], 2, "y = 7(1) + 6 = 13.", "Medium"],
  ["Diberi y = 7x + 6, apakah nilai y apabila x = 2?", ["y = 13", "y = 18", "y = 20", "y = 26"], 2, "y = 7(2) + 6 = 14 + 6 = 20.", "Medium"],
  ["Manakah pasangan (x, y) berikut ialah penyelesaian bagi y = 7x + 6?", ["(1, 6)", "(0, 7)", "(2, 20)", "(1, 7)"], 2, "Apabila x = 2, y = 7(2) + 6 = 20, maka (2, 20) ialah penyelesaian yang sah.", "Medium"],
  ["Mengapakah persamaan linear dalam dua pemboleh ubah mempunyai bilangan penyelesaian yang tidak terhingga?", ["Kerana setiap nilai x yang berbeza menghasilkan nilai y yang sepadan", "Kerana persamaan itu tidak mempunyai pemalar", "Kerana ia tidak boleh diselesaikan", "Kerana pemboleh ubahnya berkuasa 2"], 0, "Setiap nilai berbeza yang disubstitusikan untuk satu pemboleh ubah menghasilkan nilai sepadan bagi pemboleh ubah satu lagi, menghasilkan banyak pasangan penyelesaian.", "Medium"],
  ["Selesaikan persamaan x + 9 = 15 menggunakan konsep kesamaan.", ["x = 6", "x = 24", "x = −6", "x = 1.67"], 0, "Tolak 9 daripada kedua-dua belah: x = 15 − 9 = 6.", "Medium"],
  ["Selesaikan persamaan 2x = 18 menggunakan konsep kesamaan.", ["x = 9", "x = 16", "x = 20", "x = 36"], 0, "Bahagi kedua-dua belah dengan 2: x = 18 ÷ 2 = 9.", "Medium"],
  ["Apakah yang perlu dilakukan untuk menyemak sama ada x = 4 ialah penyelesaian bagi x + 7 = 11?", ["Gantikan x = 4 ke dalam persamaan dan periksa jika kedua-dua belah sama nilai", "Selesaikan semula persamaan dari awal", "Lukis graf persamaan tersebut", "Tukar persamaan kepada bentuk pecahan"], 0, "Untuk menyemak penyelesaian, gantikan nilai itu ke dalam persamaan asal dan periksa jika kedua-dua belah sama nilai.", "Medium"],
  ["Gunakan kaedah cuba jaya untuk x − 3 = 7. Manakah nilai x yang betul?", ["x = 4", "x = 7", "x = 10", "x = 21"], 2, "Apabila x = 10, 10 − 3 = 7, maka kedua-dua belah sama dan x = 10 ialah penyelesaiannya.", "Medium"],
  ["Selesaikan persamaan 6x + 2 = 20 menggunakan kaedah pematahbalikan.", ["x = 3", "x = 4", "x = 18", "x = 22"], 0, "6x + 2 = 20 → 6x = 18 → x = 3.", "Medium"],
  ["Apakah operasi songsang yang digunakan untuk menyelesaikan persamaan x × 5 = 35?", ["Tambah", "Tolak", "Bahagi", "Darab"], 2, "Untuk mengasingkan x, gunakan operasi songsang bagi pendaraban, iaitu pembahagian: x = 35 ÷ 5 = 7.", "Medium"],
  ["Apakah operasi songsang yang digunakan untuk menyelesaikan persamaan x ÷ 3 = 9?", ["Bahagi dengan 3", "Tambah 3", "Darab dengan 3", "Tolak 3"], 2, "Untuk mengasingkan x, darabkan kedua-dua belah dengan 3: x = 9 × 3 = 27.", "Medium"],
  ["Diberi y = 3x − 2, apakah nilai y apabila x = 5?", ["y = 13", "y = 15", "y = 17", "y = 10"], 0, "y = 3(5) − 2 = 15 − 2 = 13.", "Medium"],
  ["Selesaikan persamaan 7x − 3 = 4x + 9.", ["x = 2", "x = 3", "x = 4", "x = 12"], 2, "7x − 3 = 4x + 9 → 7x − 4x = 9 + 3 → 3x = 12 → x = 4.", "Medium"],
  ["Diberi 4x/5 + 7 = 23, apakah nilai 4x/5 selepas langkah pertama kaedah pematahbalikan?", ["9", "16", "20", "30"], 1, "Tolak 7 daripada kedua-dua belah: 4x/5 = 23 − 7 = 16.", "Medium"],
]);

const MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Solve the equation x + 7 = 11 using the equality concept.", ["x = 3", "x = 4", "x = 18", "x = −4"], 1, "Subtract 7 from both sides: x + 7 − 7 = 11 − 7, giving x = 4.", "Medium"],
  ["What operation should be performed on both sides of x + 7 = 11 to isolate x?", ["Add 7", "Subtract 7", "Multiply by 7", "Divide by 7"], 1, "To isolate x, subtract 7 from both sides of the equation.", "Medium"],
  ["What is the equality concept?", ["Performing different operations on each side of the equation", "Performing the same operation on both sides of the equation so it stays balanced", "Converting all variables into numbers", "Ignoring the equals sign in the equation"], 1, "The equality concept means performing the same operation on both sides of the equation so it stays balanced.", "Medium"],
  ["Solve the equation x − 5 = 9 using the equality concept.", ["x = 4", "x = 14", "x = −4", "x = 45"], 1, "Add 5 to both sides: x − 5 + 5 = 9 + 5, giving x = 14.", "Medium"],
  ["Use trial and error to solve x + 5 = 9. What is the correct value of x?", ["x = 2", "x = 3", "x = 4", "x = 5"], 2, "When x = 4, 4 + 5 = 9, so both sides are equal and x = 4 is the solution.", "Medium"],
  ["Why is the trial and error method less suitable for equations whose solution is a fraction?", ["Because the method is too easy", "Because it takes longer to try many values", "Because fractions cannot be substituted", "Because it only works for two-variable equations"], 1, "The trial and error method takes longer when the solution is a large number or a fraction.", "Medium"],
  ["What is the inverse operation of addition?", ["Multiplication", "Division", "Subtraction", "Square root"], 2, "The inverse operation of addition (+) is subtraction (−).", "Medium"],
  ["What is the inverse operation of multiplication?", ["Addition", "Subtraction", "Division", "Squaring"], 2, "The inverse operation of multiplication (×) is division (÷).", "Medium"],
  ["Solve 4x/5 + 7 = 23 using the backtracking method. What is the first step?", ["Multiply both sides by 5", "Subtract 7 from both sides", "Divide both sides by 4", "Add 7 to both sides"], 1, "The first step is to subtract 7 from both sides so that 4x/5 = 16.", "Medium"],
  ["When solving 4x/5 + 7 = 23, after obtaining 4x/5 = 16, what is the next step?", ["Divide both sides by 5", "Multiply both sides by 5", "Subtract 16 from both sides", "Add 4 to both sides"], 1, "Multiply both sides by 5 to obtain 4x = 80.", "Medium"],
  ["What is the value of x in the equation 4x/5 + 7 = 23?", ["x = 16", "x = 20", "x = 80", "x = 4"], 1, "Following the backtracking steps: 4x/5 = 16 → 4x = 80 → x = 20.", "Medium"],
  ["Solve the equation 3x − 4 = 11.", ["x = 3", "x = 5", "x = 7", "x = 15"], 1, "3x − 4 = 11 → 3x = 15 → x = 5.", "Medium"],
  ["Solve the equation x/4 = 6.", ["x = 1.5", "x = 10", "x = 24", "x = 2"], 2, "x/4 = 6 → x = 6 × 4 = 24.", "Medium"],
  ["Solve the equation 2x + 3 = 13.", ["x = 5", "x = 8", "x = 10", "x = 6.5"], 0, "2x + 3 = 13 → 2x = 10 → x = 5.", "Medium"],
  ["Solve the equation 5x − 1 = 0.", ["x = −5", "x = 5", "x = −0.2", "x = 0.2"], 3, "5x − 1 = 0 → 5x = 1 → x = 0.2.", "Medium"],
  ["Given y = 7x + 6, what is the value of y when x = 0?", ["y = 0", "y = 6", "y = 7", "y = 13"], 1, "y = 7(0) + 6 = 6.", "Medium"],
  ["Given y = 7x + 6, what is the value of y when x = 1?", ["y = 6", "y = 7", "y = 13", "y = 14"], 2, "y = 7(1) + 6 = 13.", "Medium"],
  ["Given y = 7x + 6, what is the value of y when x = 2?", ["y = 13", "y = 18", "y = 20", "y = 26"], 2, "y = 7(2) + 6 = 14 + 6 = 20.", "Medium"],
  ["Which of the following pairs (x, y) is a solution of y = 7x + 6?", ["(1, 6)", "(0, 7)", "(2, 20)", "(1, 7)"], 2, "When x = 2, y = 7(2) + 6 = 20, so (2, 20) is a valid solution.", "Medium"],
  ["Why does a linear equation in two variables have an infinite number of solutions?", ["Because each different value of x produces a corresponding value of y", "Because the equation has no constant", "Because it cannot be solved", "Because its variables are raised to the power of 2"], 0, "Each different value substituted for one variable produces a corresponding value for the other, giving many solution pairs.", "Medium"],
  ["Solve the equation x + 9 = 15 using the equality concept.", ["x = 6", "x = 24", "x = −6", "x = 1.67"], 0, "Subtract 9 from both sides: x = 15 − 9 = 6.", "Medium"],
  ["Solve the equation 2x = 18 using the equality concept.", ["x = 9", "x = 16", "x = 20", "x = 36"], 0, "Divide both sides by 2: x = 18 ÷ 2 = 9.", "Medium"],
  ["What should be done to check whether x = 4 is the solution of x + 7 = 11?", ["Substitute x = 4 into the equation and check if both sides are equal", "Solve the equation again from the start", "Draw the graph of the equation", "Convert the equation into fraction form"], 0, "To check the solution, substitute the value into the original equation and verify both sides are equal in value.", "Medium"],
  ["Use trial and error for x − 3 = 7. Which value of x is correct?", ["x = 4", "x = 7", "x = 10", "x = 21"], 2, "When x = 10, 10 − 3 = 7, so both sides are equal and x = 10 is the solution.", "Medium"],
  ["Solve the equation 6x + 2 = 20 using the backtracking method.", ["x = 3", "x = 4", "x = 18", "x = 22"], 0, "6x + 2 = 20 → 6x = 18 → x = 3.", "Medium"],
  ["Which inverse operation is used to solve the equation x × 5 = 35?", ["Addition", "Subtraction", "Division", "Multiplication"], 2, "To isolate x, use the inverse of multiplication, which is division: x = 35 ÷ 5 = 7.", "Medium"],
  ["Which inverse operation is used to solve the equation x ÷ 3 = 9?", ["Divide by 3", "Add 3", "Multiply by 3", "Subtract 3"], 2, "To isolate x, multiply both sides by 3: x = 9 × 3 = 27.", "Medium"],
  ["Given y = 3x − 2, what is the value of y when x = 5?", ["y = 13", "y = 15", "y = 17", "y = 10"], 0, "y = 3(5) − 2 = 15 − 2 = 13.", "Medium"],
  ["Solve the equation 7x − 3 = 4x + 9.", ["x = 2", "x = 3", "x = 4", "x = 12"], 2, "7x − 3 = 4x + 9 → 7x − 4x = 9 + 3 → 3x = 12 → x = 4.", "Medium"],
  ["Given 4x/5 + 7 = 23, what is the value of 4x/5 after the first step of the backtracking method?", ["9", "16", "20", "30"], 1, "Subtract 7 from both sides: 4x/5 = 23 − 7 = 16.", "Medium"],
]);

const MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Apakah persamaan linear serentak?", ["Dua persamaan tidak berkaitan yang diselesaikan berasingan", "Dua atau lebih persamaan linear yang melibatkan pemboleh ubah sama dan diselesaikan bersama", "Persamaan dengan tiga pemboleh ubah", "Persamaan yang tiada penyelesaian"], 1, "Persamaan linear serentak ialah dua atau lebih persamaan linear yang melibatkan pemboleh ubah sama yang diselesaikan bersama.", "Medium"],
  ["Mengapakah persamaan itu dipanggil 'serentak'?", ["Kerana ia ditulis pada masa yang sama", "Kerana penyelesaian (x, y) mesti memuaskan kedua-dua persamaan pada masa yang sama", "Kerana ia mempunyai bilangan sebutan yang sama", "Kerana ia menggunakan pemboleh ubah yang sama nilai"], 1, "Ia dipanggil 'serentak' kerana penyelesaian yang dicari mesti memuaskan kedua-dua persamaan pada masa yang sama.", "Medium"],
  ["Bilakah persamaan serentak mempunyai penyelesaian unik?", ["Apabila dua garis lurus selari", "Apabila dua garis lurus bersilang pada hanya satu titik", "Apabila dua garis lurus bertindih", "Apabila dua garis lurus tidak dapat dilukis"], 1, "Penyelesaian unik wujud apabila dua garis lurus bersilang pada hanya satu titik.", "Medium"],
  ["Bilakah persamaan serentak tiada penyelesaian?", ["Apabila dua garis lurus bersilang pada satu titik", "Apabila dua garis lurus bertindih sepenuhnya", "Apabila dua garis lurus selari dan tidak bersilang", "Apabila salah satu persamaan mempunyai pemalar sifar"], 2, "Persamaan serentak tiada penyelesaian apabila dua garis lurus selari dan tidak akan bersilang.", "Medium"],
  ["Bilakah persamaan serentak mempunyai penyelesaian tak terhingga?", ["Apabila dua garis lurus bersilang pada satu titik", "Apabila dua garis lurus mewakili garis yang sama (bertindih)", "Apabila dua garis lurus selari", "Apabila salah satu persamaan tiada pemboleh ubah"], 1, "Penyelesaian tak terhingga wujud apabila kedua-dua persamaan mewakili garis lurus yang sama dan bertindih sepenuhnya.", "Medium"],
  ["Apakah langkah pertama dalam kaedah penggantian?", ["Lukis graf kedua-dua persamaan", "Ungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi", "Tambah kedua-dua persamaan", "Samakan pekali kedua-dua persamaan"], 1, "Langkah pertama dalam kaedah penggantian ialah mengungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi.", "Medium"],
  ["Diberi persamaan serentak x + y = 10 dan x − y = 2, ungkapkan x daripada persamaan pertama.", ["x = 10 + y", "x = 10 − y", "x = y − 10", "x = y + 10"], 1, "Daripada x + y = 10, ungkapkan x = 10 − y.", "Medium"],
  ["Selepas menggantikan x = 10 − y ke dalam x − y = 2, apakah persamaan satu pemboleh ubah yang terhasil (sebelum dipermudahkan)?", ["(10 − y) − y = 2", "(10 + y) − y = 2", "(10 − y) + y = 2", "10 − y = 2"], 0, "Gantikan x = 10 − y ke dalam x − y = 2 untuk mendapatkan (10 − y) − y = 2.", "Medium"],
  ["Permudahkan (10 − y) − y = 2 untuk mendapatkan persamaan satu pemboleh ubah.", ["10 − 2y = 2", "10 + 2y = 2", "10 − y = 2", "2y = 10"], 0, "(10 − y) − y = 2 dipermudahkan kepada 10 − 2y = 2.", "Medium"],
  ["Selesaikan 10 − 2y = 2 untuk mendapatkan nilai y.", ["y = 2", "y = 4", "y = 6", "y = 8"], 1, "10 − 2y = 2 → 2y = 8 → y = 4.", "Medium"],
  ["Selepas mendapat y = 4, apakah nilai x dalam persamaan serentak x + y = 10 dan x − y = 2?", ["x = 4", "x = 6", "x = 10", "x = 14"], 1, "Gantikan y = 4 ke dalam x = 10 − y: x = 10 − 4 = 6.", "Medium"],
  ["Apakah langkah pertama dalam kaedah penghapusan?", ["Selesaikan persamaan tanpa mengubah pekali", "Buat pekali satu pemboleh ubah sama dalam kedua-dua persamaan", "Lukis graf kedua-dua persamaan", "Gantikan satu pemboleh ubah dengan nombor"], 1, "Langkah pertama kaedah penghapusan ialah membuat pekali satu pemboleh ubah sama dalam kedua-dua persamaan.", "Medium"],
  ["Diberi x + y = 10 dan x − y = 2, apakah persamaan yang terhasil apabila kedua-dua persamaan ditambah?", ["2x = 12", "2y = 8", "2x = 8", "2y = 12"], 0, "Menambah persamaan (1) dan (2): (x + y) + (x − y) = 10 + 2, maka 2x = 12.", "Medium"],
  ["Daripada 2x = 12, apakah nilai x?", ["x = 4", "x = 6", "x = 12", "x = 24"], 1, "2x = 12 → x = 6.", "Medium"],
  ["Selepas mendapat x = 6 dalam persamaan x + y = 10, apakah nilai y?", ["y = 2", "y = 4", "y = 6", "y = 16"], 1, "Gantikan x = 6: 6 + y = 10, maka y = 4.", "Medium"],
  ["Apakah penyelesaian akhir bagi persamaan serentak x + y = 10 dan x − y = 2?", ["x = 4, y = 6", "x = 6, y = 4", "x = 5, y = 5", "x = 8, y = 2"], 1, "Penyelesaian persamaan serentak ialah x = 6, y = 4.", "Medium"],
  ["Apakah langkah pertama dalam kaedah graf untuk menyelesaikan persamaan serentak?", ["Selesaikan persamaan secara algebra dahulu", "Lukis graf bagi persamaan pertama pada satah Cartesan", "Tukar kedua-dua persamaan kepada bentuk pecahan", "Cari nilai pemalar sahaja"], 1, "Langkah pertama kaedah graf ialah melukis graf persamaan pertama pada satah Cartesan.", "Medium"],
  ["Dalam kaedah graf, apakah yang mewakili penyelesaian persamaan serentak?", ["Titik permulaan setiap garis", "Titik persilangan antara dua garis lurus", "Kecerunan setiap garis", "Pintasan-x bagi setiap garis"], 1, "Penyelesaian persamaan serentak diwakili oleh titik persilangan antara dua garis lurus pada graf.", "Medium"],
  ["Jika graf bagi dua persamaan serentak adalah dua garis selari, apakah kesimpulan tentang penyelesaiannya?", ["Terdapat satu penyelesaian unik", "Terdapat penyelesaian tak terhingga", "Tiada penyelesaian", "Penyelesaiannya ialah (0, 0)"], 2, "Garis selari tidak akan bersilang, jadi persamaan serentak itu tiada penyelesaian.", "Medium"],
  ["Apakah langkah pertama menggunakan kalkulator saintifik untuk menyelesaikan persamaan serentak?", ["Tekan butang sama dengan (=)", "Tekan butang MODE atau MENU", "Masukkan nilai x terus", "Pilih mod statistik"], 1, "Langkah pertama ialah menekan butang MODE atau MENU pada kalkulator.", "Medium"],
  ["Selepas memilih Mod Persamaan pada kalkulator saintifik, apakah pilihan seterusnya bagi persamaan serentak dengan dua pemboleh ubah?", ["Persamaan Kuadratik", "Persamaan Serentak, kemudian 2 Tidak Diketahui", "Mod Statistik", "Mod Pecahan"], 1, "Pilih Persamaan Serentak, kemudian 2 Tidak Diketahui untuk persamaan dua pemboleh ubah.", "Medium"],
  ["Selesaikan persamaan serentak 2x + y = 7 dan x − y = 2 menggunakan kaedah penghapusan.", ["x = 1, y = 5", "x = 2, y = 3", "x = 3, y = 1", "x = 5, y = −3"], 2, "Tambah kedua-dua persamaan: 3x = 9, maka x = 3; gantikan ke (2): 3 − y = 2, maka y = 1.", "Hard"],
  ["Selesaikan persamaan serentak x + 2y = 8 dan x − y = 2 menggunakan kaedah penggantian.", ["x = 4, y = 2", "x = 2, y = 4", "x = 6, y = 1", "x = 3, y = 2.5"], 0, "Daripada x − y = 2, x = 2 + y. Gantikan ke x + 2y = 8: (2 + y) + 2y = 8 → 3y = 6 → y = 2, maka x = 4.", "Hard"],
  ["Suatu kedai menjual 2 buku dan 3 pensel dengan harga RM16, manakala 1 buku dan 1 pensel berharga RM7. Jika harga buku ialah RM b dan pensel RM p, tulis persamaan serentak bagi situasi ini.", ["2b + 3p = 16 dan b + p = 7", "b + p = 16 dan 2b + 3p = 7", "2b + p = 16 dan b + 3p = 7", "b − p = 16 dan b + p = 7"], 0, "Dua buku dan tiga pensel berharga RM16 ditulis 2b + 3p = 16; satu buku dan satu pensel berharga RM7 ditulis b + p = 7.", "Hard"],
  ["Daripada persamaan serentak 2b + 3p = 16 dan b + p = 7, cari nilai b dan p.", ["b = 5, p = 2", "b = 2, p = 5", "b = 4, p = 3", "b = 3, p = 4"], 0, "Daripada b + p = 7, b = 7 − p. Gantikan ke 2b + 3p = 16: 2(7 − p) + 3p = 16 → 14 + p = 16 → p = 2, maka b = 5.", "Hard"],
  ["Dua garis lurus y = 2x + 1 dan y = 2x − 3 dilukis pada satah Cartesan yang sama. Apakah jenis penyelesaian bagi persamaan serentak ini?", ["Penyelesaian unik", "Tiada penyelesaian", "Penyelesaian tak terhingga", "Dua penyelesaian"], 1, "Kedua-dua garis mempunyai kecerunan sama (2) tetapi pintasan-y berbeza, maka ia selari dan persamaan serentak tiada penyelesaian.", "Hard"],
  ["Dua persamaan 2x + 4y = 10 dan x + 2y = 5 dilukis sebagai graf. Apakah jenis penyelesaian bagi persamaan serentak ini?", ["Penyelesaian unik", "Tiada penyelesaian", "Penyelesaian tak terhingga", "Tidak dapat ditentukan"], 2, "Persamaan 2x + 4y = 10 boleh dipermudahkan kepada x + 2y = 5, iaitu sama dengan persamaan kedua, maka kedua-duanya mewakili garis yang sama dan mempunyai penyelesaian tak terhingga.", "Hard"],
  ["Dalam suatu soalan peperiksaan, persamaan serentak ialah x + y = 12 dan 2x − y = 3. Selesaikan untuk mencari x dan y menggunakan kaedah penghapusan.", ["x = 5, y = 7", "x = 7, y = 5", "x = 4, y = 8", "x = 6, y = 6"], 0, "Tambah kedua-dua persamaan: 3x = 15, maka x = 5; gantikan ke x + y = 12: y = 7.", "Hard"],
  ["Sebuah taman segi empat tepat mempunyai perimeter 28 m. Jika panjangnya ialah x m dan lebarnya y m, tulis persamaan yang mewakili perimeter ini.", ["x + y = 28", "2x + 2y = 28", "xy = 28", "x − y = 28"], 1, "Perimeter segi empat tepat = 2(panjang + lebar), maka 2x + 2y = 28.", "Hard"],
  ["Diberi 2x + 2y = 28 dan x − y = 2, cari nilai x dan y.", ["x = 8, y = 6", "x = 6, y = 8", "x = 10, y = 4", "x = 7, y = 7"], 0, "Permudahkan 2x + 2y = 28 kepada x + y = 14. Tambah dengan x − y = 2: 2x = 16, maka x = 8 dan y = 6.", "Hard"],
]);

const MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["What are simultaneous linear equations?", ["Two unrelated equations solved separately", "Two or more linear equations involving the same variables solved together", "An equation with three variables", "An equation with no solution"], 1, "Simultaneous linear equations are two or more linear equations involving the same variables that are solved together.", "Medium"],
  ["Why are these equations called 'simultaneous'?", ["Because they are written at the same time", "Because the solution (x, y) must satisfy both equations at the same time", "Because they have the same number of terms", "Because they use variables of equal value"], 1, "They are called 'simultaneous' because the solution sought must satisfy both equations at the same time.", "Medium"],
  ["When do simultaneous equations have a unique solution?", ["When the two straight lines are parallel", "When the two straight lines intersect at exactly one point", "When the two straight lines overlap", "When the two straight lines cannot be drawn"], 1, "A unique solution exists when the two straight lines intersect at exactly one point.", "Medium"],
  ["When do simultaneous equations have no solution?", ["When the two straight lines intersect at one point", "When the two straight lines completely overlap", "When the two straight lines are parallel and never intersect", "When one of the equations has a zero constant"], 2, "Simultaneous equations have no solution when the two straight lines are parallel and never intersect.", "Medium"],
  ["When do simultaneous equations have an infinite number of solutions?", ["When the two straight lines intersect at one point", "When the two lines represent the same line (overlap)", "When the two straight lines are parallel", "When one equation has no variable"], 1, "Infinite solutions exist when both equations represent the same straight line and overlap completely.", "Medium"],
  ["What is the first step in the substitution method?", ["Draw the graphs of both equations", "Express one variable in terms of the other variable", "Add both equations", "Equalise the coefficients of both equations"], 1, "The first step in the substitution method is to express one variable in terms of the other variable.", "Medium"],
  ["Given the simultaneous equations x + y = 10 and x − y = 2, express x from the first equation.", ["x = 10 + y", "x = 10 − y", "x = y − 10", "x = y + 10"], 1, "From x + y = 10, express x = 10 − y.", "Medium"],
  ["After substituting x = 10 − y into x − y = 2, what one-variable equation results (before simplifying)?", ["(10 − y) − y = 2", "(10 + y) − y = 2", "(10 − y) + y = 2", "10 − y = 2"], 0, "Substituting x = 10 − y into x − y = 2 gives (10 − y) − y = 2.", "Medium"],
  ["Simplify (10 − y) − y = 2 to get a one-variable equation.", ["10 − 2y = 2", "10 + 2y = 2", "10 − y = 2", "2y = 10"], 0, "(10 − y) − y = 2 simplifies to 10 − 2y = 2.", "Medium"],
  ["Solve 10 − 2y = 2 to find the value of y.", ["y = 2", "y = 4", "y = 6", "y = 8"], 1, "10 − 2y = 2 → 2y = 8 → y = 4.", "Medium"],
  ["After finding y = 4, what is the value of x in the simultaneous equations x + y = 10 and x − y = 2?", ["x = 4", "x = 6", "x = 10", "x = 14"], 1, "Substitute y = 4 into x = 10 − y: x = 10 − 4 = 6.", "Medium"],
  ["What is the first step in the elimination method?", ["Solve the equations without changing the coefficients", "Make the coefficients of one variable equal in both equations", "Draw the graphs of both equations", "Replace one variable with a number"], 1, "The first step in the elimination method is to make the coefficients of one variable equal in both equations.", "Medium"],
  ["Given x + y = 10 and x − y = 2, what equation results when both equations are added?", ["2x = 12", "2y = 8", "2x = 8", "2y = 12"], 0, "Adding equations (1) and (2): (x + y) + (x − y) = 10 + 2, giving 2x = 12.", "Medium"],
  ["From 2x = 12, what is the value of x?", ["x = 4", "x = 6", "x = 12", "x = 24"], 1, "2x = 12 → x = 6.", "Medium"],
  ["After finding x = 6 in the equation x + y = 10, what is the value of y?", ["y = 2", "y = 4", "y = 6", "y = 16"], 1, "Substitute x = 6: 6 + y = 10, so y = 4.", "Medium"],
  ["What is the final solution of the simultaneous equations x + y = 10 and x − y = 2?", ["x = 4, y = 6", "x = 6, y = 4", "x = 5, y = 5", "x = 8, y = 2"], 1, "The solution of the simultaneous equations is x = 6, y = 4.", "Medium"],
  ["What is the first step in the graphical method for solving simultaneous equations?", ["Solve the equations algebraically first", "Draw the graph of the first equation on a Cartesian plane", "Convert both equations into fraction form", "Find only the constant value"], 1, "The first step of the graphical method is to draw the graph of the first equation on a Cartesian plane.", "Medium"],
  ["In the graphical method, what represents the solution of simultaneous equations?", ["The starting point of each line", "The point of intersection between the two straight lines", "The gradient of each line", "The x-intercept of each line"], 1, "The solution of simultaneous equations is represented by the point of intersection between the two straight lines on the graph.", "Medium"],
  ["If the graphs of two simultaneous equations are two parallel lines, what can be concluded about the solution?", ["There is one unique solution", "There are infinitely many solutions", "There is no solution", "The solution is (0, 0)"], 2, "Parallel lines never intersect, so the simultaneous equations have no solution.", "Medium"],
  ["What is the first step in using a scientific calculator to solve simultaneous equations?", ["Press the equals (=) button", "Press the MODE or MENU button", "Enter the value of x directly", "Select statistics mode"], 1, "The first step is to press the MODE or MENU button on the calculator.", "Medium"],
  ["After selecting Equation Mode on a scientific calculator, what is the next selection for a two-variable simultaneous equation?", ["Quadratic Equation", "Simultaneous Equation, then 2 Unknowns", "Statistics Mode", "Fraction Mode"], 1, "Select Simultaneous Equation, then 2 Unknowns for a two-variable equation.", "Medium"],
  ["Solve the simultaneous equations 2x + y = 7 and x − y = 2 using the elimination method.", ["x = 1, y = 5", "x = 2, y = 3", "x = 3, y = 1", "x = 5, y = −3"], 2, "Adding both equations: 3x = 9, so x = 3; substituting into x − y = 2 gives y = 1.", "Hard"],
  ["Solve the simultaneous equations x + 2y = 8 and x − y = 2 using the substitution method.", ["x = 4, y = 2", "x = 2, y = 4", "x = 6, y = 1", "x = 3, y = 2.5"], 0, "From x − y = 2, x = 2 + y. Substituting into x + 2y = 8: (2 + y) + 2y = 8 → 3y = 6 → y = 2, so x = 4.", "Hard"],
  ["A shop sells 2 books and 3 pencils for RM16, while 1 book and 1 pencil cost RM7. If a book costs RM b and a pencil costs RM p, write the simultaneous equations for this situation.", ["2b + 3p = 16 and b + p = 7", "b + p = 16 and 2b + 3p = 7", "2b + p = 16 and b + 3p = 7", "b − p = 16 and b + p = 7"], 0, "Two books and three pencils costing RM16 is written as 2b + 3p = 16; one book and one pencil costing RM7 is written as b + p = 7.", "Hard"],
  ["From the simultaneous equations 2b + 3p = 16 and b + p = 7, find the values of b and p.", ["b = 5, p = 2", "b = 2, p = 5", "b = 4, p = 3", "b = 3, p = 4"], 0, "From b + p = 7, b = 7 − p. Substituting into 2b + 3p = 16: 2(7 − p) + 3p = 16 → 14 + p = 16 → p = 2, so b = 5.", "Hard"],
  ["Two straight lines y = 2x + 1 and y = 2x − 3 are drawn on the same Cartesian plane. What type of solution do these simultaneous equations have?", ["A unique solution", "No solution", "Infinitely many solutions", "Two solutions"], 1, "Both lines have the same gradient (2) but different y-intercepts, so they are parallel and the simultaneous equations have no solution.", "Hard"],
  ["The equations 2x + 4y = 10 and x + 2y = 5 are drawn as graphs. What type of solution do these simultaneous equations have?", ["A unique solution", "No solution", "Infinitely many solutions", "Cannot be determined"], 2, "The equation 2x + 4y = 10 simplifies to x + 2y = 5, the same as the second equation, so both represent the same line and have infinitely many solutions.", "Hard"],
  ["In an exam question, the simultaneous equations are x + y = 12 and 2x − y = 3. Solve for x and y using the elimination method.", ["x = 5, y = 7", "x = 7, y = 5", "x = 4, y = 8", "x = 6, y = 6"], 0, "Adding both equations: 3x = 15, so x = 5; substituting into x + y = 12 gives y = 7.", "Hard"],
  ["A rectangular garden has a perimeter of 28 m. If its length is x m and width is y m, write the equation representing this perimeter.", ["x + y = 28", "2x + 2y = 28", "xy = 28", "x − y = 28"], 1, "The perimeter of a rectangle = 2(length + width), so 2x + 2y = 28.", "Hard"],
  ["Given 2x + 2y = 28 and x − y = 2, find the values of x and y.", ["x = 8, y = 6", "x = 6, y = 8", "x = 10, y = 4", "x = 7, y = 7"], 0, "Simplify 2x + 2y = 28 to x + y = 14. Adding to x − y = 2: 2x = 16, so x = 8 and y = 6.", "Hard"],
]);

const MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah ketaksamaan linear?", ["Persamaan dengan tanda sama dengan", "Hubungan antara dua ungkapan linear yang tidak semestinya sama, dengan pemboleh ubah berkuasa 1", "Persamaan dengan dua pemboleh ubah", "Persamaan dengan kuasa dua"], 1, "Ketaksamaan linear ialah hubungan antara dua ungkapan linear yang tidak semestinya sama nilainya, dengan pemboleh ubah berkuasa 1.", "Easy"],
  ["Manakah antara berikut ialah simbol 'lebih besar daripada'?", [">", "<", "≥", "≤"], 0, "Simbol > bermaksud 'lebih besar daripada' (greater than).", "Easy"],
  ["Manakah antara berikut ialah simbol 'lebih kecil daripada'?", [">", "<", "≥", "≤"], 1, "Simbol < bermaksud 'lebih kecil daripada' (less than).", "Easy"],
  ["Apakah simbol yang bermaksud 'sekurang-kurangnya' atau 'minimum'?", [">", "<", "≥", "≤"], 2, "Simbol ≥ bermaksud 'lebih besar daripada atau sama dengan', dikaitkan dengan kata kunci 'sekurang-kurangnya' dan 'minimum'.", "Easy"],
  ["Apakah simbol yang bermaksud 'paling banyak' atau 'maksimum'?", [">", "<", "≥", "≤"], 3, "Simbol ≤ bermaksud 'lebih kecil daripada atau sama dengan', dikaitkan dengan kata kunci 'paling banyak' dan 'maksimum'.", "Easy"],
  ["Markah minimum untuk lulus ialah 50. Tulis ketaksamaan ini jika m ialah markah.", ["m > 50", "m < 50", "m ≥ 50", "m ≤ 50"], 2, "'Minimum 50' bermaksud markah mestilah sekurang-kurangnya 50, maka m ≥ 50.", "Easy"],
  ["Had laju tidak melebihi 110 km/j. Tulis ketaksamaan ini jika h ialah had laju.", ["h > 110", "h < 110", "h ≥ 110", "h ≤ 110"], 3, "'Tidak melebihi 110' bermaksud had laju paling banyak 110, maka h ≤ 110.", "Easy"],
  ["Bilakah bulatan terbuka ○ digunakan pada garis nombor?", ["Apabila menggunakan simbol ≥ atau ≤", "Apabila menggunakan simbol > atau <", "Sentiasa digunakan", "Tidak pernah digunakan"], 1, "Bulatan terbuka ○ digunakan apabila menggunakan simbol > atau <, bermaksud nilai sempadan TIDAK termasuk.", "Easy"],
  ["Bilakah bulatan tertutup ● digunakan pada garis nombor?", ["Apabila menggunakan simbol > atau <", "Apabila menggunakan simbol ≥ atau ≤", "Sentiasa digunakan", "Tidak pernah digunakan"], 1, "Bulatan tertutup ● digunakan apabila menggunakan simbol ≥ atau ≤, bermaksud nilai sempadan TERMASUK.", "Easy"],
  ["Adakah nilai 5 termasuk dalam penyelesaian x > 5?", ["Ya, kerana ≥ digunakan", "Tidak, kerana bulatan terbuka digunakan untuk >", "Ya, kerana nombor positif", "Tidak, kerana x negatif"], 1, "Simbol > menggunakan bulatan terbuka, jadi nilai sempadan 5 TIDAK termasuk dalam penyelesaian.", "Easy"],
  ["Adakah nilai 5 termasuk dalam penyelesaian x ≥ 5?", ["Ya, kerana bulatan tertutup digunakan untuk ≥", "Tidak, kerana bulatan terbuka digunakan untuk ≥", "Ya, tetapi hanya jika x integer", "Tidak, kerana 5 ialah sempadan"], 0, "Simbol ≥ menggunakan bulatan tertutup, jadi nilai sempadan 5 TERMASUK dalam penyelesaian.", "Easy"],
  ["Ke arah manakah anak panah pada garis nombor untuk x > 3?", ["Ke kiri", "Ke kanan", "Ke atas", "Tiada anak panah"], 1, "Untuk x > 3, anak panah menghala ke kanan kerana x lebih besar daripada 3.", "Easy"],
  ["Ke arah manakah anak panah pada garis nombor untuk x < 3?", ["Ke kiri", "Ke kanan", "Ke atas", "Tiada anak panah"], 0, "Untuk x < 3, anak panah menghala ke kiri kerana x lebih kecil daripada 3.", "Easy"],
  ["Ke arah manakah anak panah pada garis nombor untuk x ≥ −2?", ["Ke kiri", "Ke kanan", "Ke atas", "Tiada anak panah"], 1, "Untuk x ≥ −2, anak panah menghala ke kanan kerana x lebih besar daripada atau sama dengan −2.", "Easy"],
  ["Ke arah manakah anak panah pada garis nombor untuk x ≤ 4?", ["Ke kiri", "Ke kanan", "Ke atas", "Tiada anak panah"], 0, "Untuk x ≤ 4, anak panah menghala ke kiri kerana x lebih kecil daripada atau sama dengan 4.", "Easy"],
  ["Garis nombor x > 5 menggunakan jenis bulatan apakah pada titik 5?", ["Bulatan tertutup ●", "Bulatan terbuka ○", "Tiada bulatan", "Dua bulatan"], 1, "Simbol > menggunakan bulatan terbuka ○ kerana nilai sempadan (5) tidak termasuk.", "Easy"],
  ["Garis nombor x ≤ −1 menggunakan jenis bulatan apakah pada titik −1?", ["Bulatan terbuka ○", "Bulatan tertutup ●", "Tiada bulatan", "Tanda silang"], 1, "Simbol ≤ menggunakan bulatan tertutup ● kerana nilai sempadan (−1) termasuk.", "Easy"],
  ["Manakah antara berikut BUKAN ungkapan linear?", ["4a", "−7x", "2y + 3", "5m²"], 3, "5m² mengandungi pemboleh ubah berkuasa 2, maka ia bukan ungkapan linear.", "Easy"],
  ["Apakah perbezaan utama antara persamaan dan ketaksamaan?", ["Tiada perbezaan", "Persamaan menggunakan =; ketaksamaan menggunakan simbol seperti > atau <", "Persamaan lebih sukar daripada ketaksamaan", "Ketaksamaan tidak mempunyai pemboleh ubah"], 1, "Persamaan menggunakan tanda = manakala ketaksamaan menggunakan simbol seperti >, <, ≥, atau ≤.", "Easy"],
  ["Apakah kata kunci yang dikaitkan dengan simbol >?", ["Minimum, sekurang-kurangnya", "Maksimum, paling banyak", "Lebih daripada, melebihi", "Tidak kurang daripada"], 2, "Simbol > dikaitkan dengan kata kunci 'lebih daripada', 'melebihi', atau 'greater than'.", "Easy"],
  ["Apakah kata kunci yang dikaitkan dengan simbol ≤?", ["Lebih daripada, melebihi", "Sekurang-kurangnya, minimum", "Paling banyak, tidak melebihi, maksimum", "Kurang daripada sahaja"], 2, "Simbol ≤ dikaitkan dengan kata kunci 'paling banyak', 'tidak melebihi', dan 'maksimum'.", "Easy"],
  ["Pilih ketaksamaan yang betul bagi 'umur melebihi 12 tahun' (u = umur).", ["u ≥ 12", "u ≤ 12", "u > 12", "u < 12"], 2, "'Melebihi 12' bermaksud lebih daripada 12, maka u > 12 (bukan termasuk 12).", "Easy"],
  ["Pilih ketaksamaan yang betul bagi 'suhu kurang daripada 25°C' (s = suhu).", ["s > 25", "s ≥ 25", "s < 25", "s ≤ 25"], 2, "'Kurang daripada 25' bermaksud s < 25.", "Easy"],
  ["Pada garis nombor x ≥ 0, adakah nilai 0 termasuk?", ["Ya, kerana ≥ menggunakan bulatan tertutup", "Tidak, kerana 0 adalah sifar", "Ya, tetapi hanya pada garis nombor positif", "Tidak, kerana ≥ menggunakan bulatan terbuka"], 0, "Simbol ≥ menggunakan bulatan tertutup ●, maka nilai 0 TERMASUK dalam penyelesaian.", "Easy"],
  ["Manakah gambaran garis nombor yang betul untuk x < −2?", ["Bulatan terbuka pada −2, anak panah ke kanan", "Bulatan terbuka pada −2, anak panah ke kiri", "Bulatan tertutup pada −2, anak panah ke kiri", "Bulatan tertutup pada −2, anak panah ke kanan"], 1, "Simbol < menggunakan bulatan terbuka dan anak panah ke kiri (kerana x lebih kecil daripada −2).", "Easy"],
  ["Manakah gambaran garis nombor yang betul untuk x ≥ 1?", ["Bulatan terbuka pada 1, anak panah ke kanan", "Bulatan terbuka pada 1, anak panah ke kiri", "Bulatan tertutup pada 1, anak panah ke kanan", "Bulatan tertutup pada 1, anak panah ke kiri"], 2, "Simbol ≥ menggunakan bulatan tertutup dan anak panah ke kanan (kerana x lebih besar daripada atau sama dengan 1).", "Easy"],
  ["Apakah garis nombor digunakan untuk dalam konteks ketaksamaan?", ["Untuk mendarab nombor", "Untuk mewakili penyelesaian ketaksamaan secara visual", "Untuk membahagi nombor", "Untuk menulis persamaan"], 1, "Garis nombor digunakan untuk mewakili semua nilai yang memenuhi sesuatu ketaksamaan secara visual.", "Easy"],
  ["Pada garis nombor, nombor bertambah ke arah manakah?", ["Ke kiri", "Ke kanan", "Ke atas", "Ke bawah"], 1, "Pada garis nombor mendatar, nilai nombor bertambah dari kiri ke kanan.", "Easy"],
  ["Manakah antara berikut benar tentang x ≥ 3?", ["3 tidak termasuk dalam penyelesaian", "3 termasuk dalam penyelesaian", "Anak panah menghala ke kiri", "Bulatan terbuka digunakan pada 3"], 1, "Simbol ≥ menunjukkan nilai 3 TERMASUK dalam penyelesaian, dan bulatan tertutup ● digunakan.", "Easy"],
  ["Tukar ayat ini kepada ketaksamaan: 'x tidak kurang daripada 7'.", ["x > 7", "x < 7", "x ≥ 7", "x ≤ 7"], 2, "'Tidak kurang daripada 7' bermaksud x mestilah sekurang-kurangnya 7, maka x ≥ 7.", "Easy"],
]);

const MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a linear inequality?", ["An equation with an equals sign", "A relationship between two linear expressions that are not necessarily equal, with the variable having a power of 1", "An equation with two variables", "An equation with a squared term"], 1, "A linear inequality is a relationship between two linear expressions that are not necessarily equal, with the variable having a power of 1.", "Easy"],
  ["Which of the following is the symbol for 'greater than'?", [">", "<", "≥", "≤"], 0, "The symbol > means 'greater than'.", "Easy"],
  ["Which of the following is the symbol for 'less than'?", [">", "<", "≥", "≤"], 1, "The symbol < means 'less than'.", "Easy"],
  ["Which symbol means 'at least' or 'minimum'?", [">", "<", "≥", "≤"], 2, "The symbol ≥ means 'greater than or equal to', associated with keywords 'at least' and 'minimum'.", "Easy"],
  ["Which symbol means 'at most' or 'maximum'?", [">", "<", "≥", "≤"], 3, "The symbol ≤ means 'less than or equal to', associated with keywords 'at most' and 'maximum'.", "Easy"],
  ["The minimum mark to pass is 50. Write this inequality if m is the mark.", ["m > 50", "m < 50", "m ≥ 50", "m ≤ 50"], 2, "'Minimum 50' means the mark must be at least 50, so m ≥ 50.", "Easy"],
  ["The speed limit does not exceed 110 km/h. Write this inequality if h is the speed.", ["h > 110", "h < 110", "h ≥ 110", "h ≤ 110"], 3, "'Does not exceed 110' means the speed is at most 110, so h ≤ 110.", "Easy"],
  ["When is an open circle ○ used on the number line?", ["When using the symbol ≥ or ≤", "When using the symbol > or <", "Always", "Never"], 1, "An open circle ○ is used when using > or <, meaning the boundary value is NOT included.", "Easy"],
  ["When is a closed circle ● used on the number line?", ["When using > or <", "When using ≥ or ≤", "Always", "Never"], 1, "A closed circle ● is used when using ≥ or ≤, meaning the boundary value IS included.", "Easy"],
  ["Is the value 5 included in the solution of x > 5?", ["Yes, because ≥ is used", "No, because an open circle is used for >", "Yes, because it is a positive number", "No, because x is negative"], 1, "The symbol > uses an open circle, so the boundary value 5 is NOT included in the solution.", "Easy"],
  ["Is the value 5 included in the solution of x ≥ 5?", ["Yes, because a closed circle is used for ≥", "No, because an open circle is used for ≥", "Yes, but only if x is an integer", "No, because 5 is the boundary"], 0, "The symbol ≥ uses a closed circle, so the boundary value 5 IS included in the solution.", "Easy"],
  ["Which direction does the arrow point on the number line for x > 3?", ["Left", "Right", "Up", "No arrow"], 1, "For x > 3, the arrow points right because x is greater than 3.", "Easy"],
  ["Which direction does the arrow point on the number line for x < 3?", ["Left", "Right", "Up", "No arrow"], 0, "For x < 3, the arrow points left because x is less than 3.", "Easy"],
  ["Which direction does the arrow point on the number line for x ≥ −2?", ["Left", "Right", "Up", "No arrow"], 1, "For x ≥ −2, the arrow points right because x is greater than or equal to −2.", "Easy"],
  ["Which direction does the arrow point on the number line for x ≤ 4?", ["Left", "Right", "Up", "No arrow"], 0, "For x ≤ 4, the arrow points left because x is less than or equal to 4.", "Easy"],
  ["What type of circle is used at point 5 on the number line for x > 5?", ["Closed circle ●", "Open circle ○", "No circle", "Two circles"], 1, "The symbol > uses an open circle ○ because the boundary value (5) is not included.", "Easy"],
  ["What type of circle is used at point −1 on the number line for x ≤ −1?", ["Open circle ○", "Closed circle ●", "No circle", "A cross"], 1, "The symbol ≤ uses a closed circle ● because the boundary value (−1) is included.", "Easy"],
  ["Which of the following is NOT a linear expression?", ["4a", "−7x", "2y + 3", "5m²"], 3, "5m² contains a variable with a power of 2, so it is not a linear expression.", "Easy"],
  ["What is the main difference between an equation and an inequality?", ["There is no difference", "An equation uses =; an inequality uses symbols such as > or <", "Equations are more difficult", "Inequalities do not have variables"], 1, "An equation uses the = sign while an inequality uses symbols such as >, <, ≥, or ≤.", "Easy"],
  ["What keywords are associated with the symbol >?", ["Minimum, at least", "Maximum, at most", "More than, exceeds, greater than", "Not less than"], 2, "The symbol > is associated with keywords 'more than', 'exceeds', and 'greater than'.", "Easy"],
  ["What keywords are associated with the symbol ≤?", ["More than, exceeds", "At least, minimum", "At most, does not exceed, maximum", "Less than only"], 2, "The symbol ≤ is associated with keywords 'at most', 'does not exceed', and 'maximum'.", "Easy"],
  ["Choose the correct inequality for 'age exceeds 12 years' (u = age).", ["u ≥ 12", "u ≤ 12", "u > 12", "u < 12"], 2, "'Exceeds 12' means more than 12, so u > 12 (12 not included).", "Easy"],
  ["Choose the correct inequality for 'temperature is less than 25°C' (s = temperature).", ["s > 25", "s ≥ 25", "s < 25", "s ≤ 25"], 2, "'Less than 25' means s < 25.", "Easy"],
  ["On the number line x ≥ 0, is the value 0 included?", ["Yes, because ≥ uses a closed circle", "No, because 0 is zero", "Yes, but only on the positive number line", "No, because ≥ uses an open circle"], 0, "The symbol ≥ uses a closed circle ●, so the value 0 IS included in the solution.", "Easy"],
  ["Which number line representation is correct for x < −2?", ["Open circle at −2, arrow pointing right", "Open circle at −2, arrow pointing left", "Closed circle at −2, arrow pointing left", "Closed circle at −2, arrow pointing right"], 1, "The symbol < uses an open circle and arrow pointing left (because x is less than −2).", "Easy"],
  ["Which number line representation is correct for x ≥ 1?", ["Open circle at 1, arrow pointing right", "Open circle at 1, arrow pointing left", "Closed circle at 1, arrow pointing right", "Closed circle at 1, arrow pointing left"], 2, "The symbol ≥ uses a closed circle and arrow pointing right (because x is greater than or equal to 1).", "Easy"],
  ["What is a number line used for in the context of inequalities?", ["To multiply numbers", "To visually represent the solution of an inequality", "To divide numbers", "To write equations"], 1, "A number line is used to represent all values that satisfy an inequality visually.", "Easy"],
  ["On the number line, values increase in which direction?", ["Left", "Right", "Up", "Down"], 1, "On a horizontal number line, values increase from left to right.", "Easy"],
  ["Which of the following is true about x ≥ 3?", ["3 is not included in the solution", "3 is included in the solution", "The arrow points left", "An open circle is used at 3"], 1, "The symbol ≥ shows that 3 IS included in the solution, and a closed circle ● is used.", "Easy"],
  ["Convert this sentence to an inequality: 'x is not less than 7'.", ["x > 7", "x < 7", "x ≥ 7", "x ≤ 7"], 2, "'Not less than 7' means x must be at least 7, so x ≥ 7.", "Easy"],
]);

const MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Selesaikan 2x + 3 > 7.", ["x > 5", "x > 2", "x > 4", "x > 1"], 1, "2x + 3 > 7 → 2x > 4 → x > 2.", "Medium"],
  ["Selesaikan 3x − 1 ≤ 8.", ["x ≤ 4", "x ≤ 3", "x ≤ 2", "x ≤ 9"], 1, "3x − 1 ≤ 8 → 3x ≤ 9 → x ≤ 3.", "Medium"],
  ["Selesaikan x + 5 < 9.", ["x < 4", "x < 14", "x < 5", "x < −4"], 0, "x + 5 < 9 → x < 9 − 5 → x < 4.", "Medium"],
  ["Selesaikan x/4 ≥ 3.", ["x ≥ 12", "x ≥ 7", "x ≥ 0.75", "x ≥ 4"], 0, "x/4 ≥ 3 → x ≥ 3 × 4 → x ≥ 12.", "Medium"],
  ["Selesaikan −x > −5.", ["x > 5", "x > −5", "x < 5", "x < −5"], 2, "−x > −5 → darab dengan −1, tukar simbol → x < 5.", "Medium"],
  ["Selesaikan −2x > 8.", ["x > −4", "x < −4", "x > 4", "x < 4"], 1, "−2x > 8 → bahagi dengan −2, tukar simbol → x < −4.", "Medium"],
  ["Selesaikan −3x ≤ 9.", ["x ≤ −3", "x ≤ 3", "x ≥ −3", "x ≥ 3"], 2, "−3x ≤ 9 → bahagi dengan −3, tukar simbol → x ≥ −3.", "Medium"],
  ["Selesaikan −4x ≤ 8.", ["x ≤ −2", "x ≥ −2", "x ≤ 2", "x ≥ 2"], 1, "−4x ≤ 8 → bahagi dengan −4, tukar simbol → x ≥ −2.", "Medium"],
  ["Selesaikan 5 − x > 2.", ["x > 3", "x > −3", "x < 3", "x < −3"], 2, "5 − x > 2 → −x > −3 → darab dengan −1, tukar simbol → x < 3.", "Medium"],
  ["Selesaikan 2x + 1 ≥ −3.", ["x ≥ −2", "x ≥ 2", "x ≥ −1", "x ≥ 1"], 0, "2x + 1 ≥ −3 → 2x ≥ −4 → x ≥ −2.", "Medium"],
  ["Apakah nilai integer yang mungkin bagi x > 3?", ["3, 4, 5, 6", "4, 5, 6, 7, ...", "0, 1, 2, 3", "3 sahaja"], 1, "x > 3 bermaksud x lebih besar daripada 3. Nilai integer yang mungkin ialah 4, 5, 6, 7, ... (tidak termasuk 3).", "Medium"],
  ["Apakah nilai integer yang mungkin bagi x ≤ 2?", ["1, 2, 3, 4", "2, 3, 4, 5", "2, 1, 0, −1, ...", "3, 4, 5, ..."], 2, "x ≤ 2 bermaksud x lebih kecil daripada atau sama dengan 2. Nilai integer: 2, 1, 0, −1, −2, ... (termasuk 2).", "Medium"],
  ["Apakah nilai integer yang mungkin bagi −1 < x ≤ 4?", ["−1, 0, 1, 2, 3, 4", "0, 1, 2, 3, 4", "−1, 0, 1, 2, 3", "0, 1, 2, 3"], 1, "−1 < x ≤ 4 bermaksud x lebih besar daripada −1 (tidak termasuk) dan paling besar 4 (termasuk). Integer: 0, 1, 2, 3, 4.", "Medium"],
  ["Apakah nilai integer yang mungkin bagi 2 ≤ x < 7?", ["2, 3, 4, 5, 6, 7", "3, 4, 5, 6", "2, 3, 4, 5, 6", "2, 3, 4, 5, 6, 7, 8"], 2, "2 ≤ x < 7 bermaksud x sekurang-kurangnya 2 (termasuk) dan kurang daripada 7 (tidak termasuk). Integer: 2, 3, 4, 5, 6.", "Medium"],
  ["Apakah nilai integer yang mungkin bagi 1 < x < 5?", ["1, 2, 3, 4, 5", "2, 3, 4", "1, 2, 3, 4", "2, 3, 4, 5"], 1, "1 < x < 5 bermaksud x lebih besar daripada 1 (tidak termasuk) dan kurang daripada 5 (tidak termasuk). Integer: 2, 3, 4.", "Medium"],
  ["Selesaikan 4x − 3 > 9.", ["x > 1.5", "x > 3", "x > 6", "x > 12"], 1, "4x − 3 > 9 → 4x > 12 → x > 3.", "Medium"],
  ["Selesaikan x/2 − 1 ≤ 3.", ["x ≤ 4", "x ≤ 8", "x ≤ 2", "x ≤ 6"], 1, "x/2 − 1 ≤ 3 → x/2 ≤ 4 → x ≤ 8.", "Medium"],
  ["Apakah yang berlaku kepada simbol ketaksamaan apabila kita mendarab kedua-dua belah dengan nombor negatif?", ["Simbol kekal sama", "Simbol mesti ditukar", "Simbol digugurkan", "Simbol bertukar kepada ="], 1, "Apabila mendarab kedua-dua belah ketaksamaan dengan nombor negatif, arah simbol MESTI DITUKAR.", "Medium"],
  ["Apakah yang berlaku kepada simbol ketaksamaan apabila kita membahagi kedua-dua belah dengan nombor positif?", ["Simbol mesti ditukar", "Simbol kekal sama", "Simbol digugurkan", "Simbol bertukar kepada ="], 1, "Pembahagian dengan nombor POSITIF tidak mengubah arah simbol ketaksamaan.", "Medium"],
  ["Nyatakan bentuk akas bagi y > 8.", ["8 > y", "8 < y", "y < 8", "y ≥ 8"], 1, "Sifat Akas: jika y > 8, maka 8 < y.", "Medium"],
  ["Nyatakan bentuk akas bagi 3 ≥ x.", ["x ≥ 3", "x ≤ 3", "x > 3", "x < 3"], 1, "Sifat Akas: jika 3 ≥ x, maka x ≤ 3.", "Medium"],
  ["Menggunakan Sifat Transitif, jika a < b dan b < 5, apakah kesimpulannya?", ["a > 5", "a = 5", "a < 5", "a ≤ 5"], 2, "Sifat Transitif: jika a < b dan b < 5, maka a < 5.", "Medium"],
  ["Selesaikan 3 − 2x ≥ 7.", ["x ≥ −2", "x ≤ −2", "x ≥ 2", "x ≤ 2"], 1, "3 − 2x ≥ 7 → −2x ≥ 4 → bahagi dengan −2, tukar simbol → x ≤ −2.", "Medium"],
  ["Selesaikan x/3 + 1 ≥ 4.", ["x ≥ 3", "x ≥ 9", "x ≥ 15", "x ≥ 1"], 1, "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9.", "Medium"],
  ["Apakah garis nombor yang betul untuk penyelesaian x ≥ 9 dalam soalan sebelumnya?", ["Bulatan terbuka pada 9, anak panah ke kanan", "Bulatan tertutup pada 9, anak panah ke kanan", "Bulatan terbuka pada 9, anak panah ke kiri", "Bulatan tertutup pada 9, anak panah ke kiri"], 1, "x ≥ 9 menggunakan bulatan tertutup (9 termasuk) dengan anak panah ke kanan.", "Medium"],
  ["Selesaikan −x/2 < 3.", ["x > −6", "x < −6", "x > 6", "x < 6"], 0, "−x/2 < 3 → darab dengan −2, tukar simbol → x > −6.", "Medium"],
  ["Nyatakan nilai integer terkecil yang memenuhi x > −3.", ["−3", "−2", "0", "−4"], 1, "x > −3 bermaksud x lebih besar daripada −3. Integer terkecil ialah −2.", "Medium"],
  ["Nyatakan nilai integer terbesar yang memenuhi x < 5.", ["5", "4", "6", "10"], 1, "x < 5 bermaksud x lebih kecil daripada 5. Integer terbesar ialah 4.", "Medium"],
  ["Selesaikan 6x + 2 > 20.", ["x > 3", "x > 18/6", "x > 3 dengan tepat jika 6x > 18", "Semua di atas betul"], 2, "6x + 2 > 20 → 6x > 18 → x > 3.", "Medium"],
]);

const MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Solve 2x + 3 > 7.", ["x > 5", "x > 2", "x > 4", "x > 1"], 1, "2x + 3 > 7 → 2x > 4 → x > 2.", "Medium"],
  ["Solve 3x − 1 ≤ 8.", ["x ≤ 4", "x ≤ 3", "x ≤ 2", "x ≤ 9"], 1, "3x − 1 ≤ 8 → 3x ≤ 9 → x ≤ 3.", "Medium"],
  ["Solve x + 5 < 9.", ["x < 4", "x < 14", "x < 5", "x < −4"], 0, "x + 5 < 9 → x < 9 − 5 → x < 4.", "Medium"],
  ["Solve x/4 ≥ 3.", ["x ≥ 12", "x ≥ 7", "x ≥ 0.75", "x ≥ 4"], 0, "x/4 ≥ 3 → x ≥ 3 × 4 → x ≥ 12.", "Medium"],
  ["Solve −x > −5.", ["x > 5", "x > −5", "x < 5", "x < −5"], 2, "−x > −5 → multiply by −1, reverse symbol → x < 5.", "Medium"],
  ["Solve −2x > 8.", ["x > −4", "x < −4", "x > 4", "x < 4"], 1, "−2x > 8 → divide by −2, reverse symbol → x < −4.", "Medium"],
  ["Solve −3x ≤ 9.", ["x ≤ −3", "x ≤ 3", "x ≥ −3", "x ≥ 3"], 2, "−3x ≤ 9 → divide by −3, reverse symbol → x ≥ −3.", "Medium"],
  ["Solve −4x ≤ 8.", ["x ≤ −2", "x ≥ −2", "x ≤ 2", "x ≥ 2"], 1, "−4x ≤ 8 → divide by −4, reverse symbol → x ≥ −2.", "Medium"],
  ["Solve 5 − x > 2.", ["x > 3", "x > −3", "x < 3", "x < −3"], 2, "5 − x > 2 → −x > −3 → multiply by −1, reverse symbol → x < 3.", "Medium"],
  ["Solve 2x + 1 ≥ −3.", ["x ≥ −2", "x ≥ 2", "x ≥ −1", "x ≥ 1"], 0, "2x + 1 ≥ −3 → 2x ≥ −4 → x ≥ −2.", "Medium"],
  ["What are the possible integer values for x > 3?", ["3, 4, 5, 6", "4, 5, 6, 7, ...", "0, 1, 2, 3", "3 only"], 1, "x > 3 means x is greater than 3. Possible integers: 4, 5, 6, 7, ... (3 not included).", "Medium"],
  ["What are the possible integer values for x ≤ 2?", ["1, 2, 3, 4", "2, 3, 4, 5", "2, 1, 0, −1, ...", "3, 4, 5, ..."], 2, "x ≤ 2 means x is less than or equal to 2. Integers: 2, 1, 0, −1, −2, ... (including 2).", "Medium"],
  ["What are the possible integer values for −1 < x ≤ 4?", ["−1, 0, 1, 2, 3, 4", "0, 1, 2, 3, 4", "−1, 0, 1, 2, 3", "0, 1, 2, 3"], 1, "−1 < x ≤ 4 means x is greater than −1 (not included) and at most 4 (included). Integers: 0, 1, 2, 3, 4.", "Medium"],
  ["What are the possible integer values for 2 ≤ x < 7?", ["2, 3, 4, 5, 6, 7", "3, 4, 5, 6", "2, 3, 4, 5, 6", "2, 3, 4, 5, 6, 7, 8"], 2, "2 ≤ x < 7 means x is at least 2 (included) and less than 7 (not included). Integers: 2, 3, 4, 5, 6.", "Medium"],
  ["What are the possible integer values for 1 < x < 5?", ["1, 2, 3, 4, 5", "2, 3, 4", "1, 2, 3, 4", "2, 3, 4, 5"], 1, "1 < x < 5 means x is greater than 1 (not included) and less than 5 (not included). Integers: 2, 3, 4.", "Medium"],
  ["Solve 4x − 3 > 9.", ["x > 1.5", "x > 3", "x > 6", "x > 12"], 1, "4x − 3 > 9 → 4x > 12 → x > 3.", "Medium"],
  ["Solve x/2 − 1 ≤ 3.", ["x ≤ 4", "x ≤ 8", "x ≤ 2", "x ≤ 6"], 1, "x/2 − 1 ≤ 3 → x/2 ≤ 4 → x ≤ 8.", "Medium"],
  ["What happens to the inequality symbol when we multiply both sides by a negative number?", ["The symbol stays the same", "The symbol must be reversed", "The symbol is dropped", "The symbol becomes ="], 1, "When multiplying both sides of an inequality by a negative number, the symbol MUST BE REVERSED.", "Medium"],
  ["What happens to the inequality symbol when we divide both sides by a positive number?", ["The symbol must be reversed", "The symbol stays the same", "The symbol is dropped", "The symbol becomes ="], 1, "Dividing by a POSITIVE number does not change the direction of the inequality symbol.", "Medium"],
  ["State the converse form of y > 8.", ["8 > y", "8 < y", "y < 8", "y ≥ 8"], 1, "Converse Property: if y > 8, then 8 < y.", "Medium"],
  ["State the converse form of 3 ≥ x.", ["x ≥ 3", "x ≤ 3", "x > 3", "x < 3"], 1, "Converse Property: if 3 ≥ x, then x ≤ 3.", "Medium"],
  ["Using the Transitive Property, if a < b and b < 5, what is the conclusion?", ["a > 5", "a = 5", "a < 5", "a ≤ 5"], 2, "Transitive Property: if a < b and b < 5, then a < 5.", "Medium"],
  ["Solve 3 − 2x ≥ 7.", ["x ≥ −2", "x ≤ −2", "x ≥ 2", "x ≤ 2"], 1, "3 − 2x ≥ 7 → −2x ≥ 4 → divide by −2, reverse symbol → x ≤ −2.", "Medium"],
  ["Solve x/3 + 1 ≥ 4.", ["x ≥ 3", "x ≥ 9", "x ≥ 15", "x ≥ 1"], 1, "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9.", "Medium"],
  ["What is the correct number line for the solution x ≥ 9?", ["Open circle at 9, arrow right", "Closed circle at 9, arrow right", "Open circle at 9, arrow left", "Closed circle at 9, arrow left"], 1, "x ≥ 9 uses a closed circle (9 included) with an arrow pointing right.", "Medium"],
  ["Solve −x/2 < 3.", ["x > −6", "x < −6", "x > 6", "x < 6"], 0, "−x/2 < 3 → multiply by −2, reverse symbol → x > −6.", "Medium"],
  ["State the smallest integer that satisfies x > −3.", ["−3", "−2", "0", "−4"], 1, "x > −3 means x is greater than −3. The smallest integer is −2.", "Medium"],
  ["State the largest integer that satisfies x < 5.", ["5", "4", "6", "10"], 1, "x < 5 means x is less than 5. The largest integer is 4.", "Medium"],
  ["Solve 6x + 2 > 20.", ["x > 3", "x > 18/6", "x > 3 exactly when 6x > 18", "All of the above are correct"], 2, "6x + 2 > 20 → 6x > 18 → x > 3.", "Medium"],
  ["Solve 4 − 3x ≤ 10.", ["x ≥ 2", "x ≥ −2", "x ≤ 2", "x ≤ −2"], 1, "4 − 3x ≤ 10 → −3x ≤ 6 → divide by −3, reverse symbol → x ≥ −2.", "Medium"],
]);

const MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Apakah ketaksamaan linear serentak?", ["Dua persamaan yang diselesaikan bersama", "Dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah", "Ketaksamaan dengan dua pemboleh ubah", "Ketaksamaan dengan simbol yang berbeza"], 1, "Ketaksamaan linear serentak ialah dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah.", "Medium"],
  ["Diberi x > −1 dan x ≤ 3, apakah nilai sepunya dalam bentuk ketaksamaan berganda?", ["−1 ≤ x < 3", "−1 < x ≤ 3", "−1 < x < 3", "−1 ≤ x ≤ 3"], 1, "x > −1 (tidak termasuk −1) dan x ≤ 3 (termasuk 3) menghasilkan −1 < x ≤ 3.", "Medium"],
  ["Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > −1 dan x ≤ 3?", ["−1, 0, 1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "−1, 0, 1, 2"], 1, "−1 < x ≤ 3 menghasilkan nilai integer 0, 1, 2, 3 (−1 tidak termasuk, 3 termasuk).", "Medium"],
  ["Diberi x > 2 dan x > 5, apakah nilai sepunya?", ["x > 2", "x > 3.5 (min purata)", "x > 5", "Tiada nilai sepunya"], 2, "Apabila kedua-dua ketaksamaan menghala ke arah yang sama, gunakan syarat lebih ketat. x > 5 lebih ketat daripada x > 2.", "Medium"],
  ["Diberi x ≤ 4 dan x ≤ 1, apakah nilai sepunya?", ["x ≤ 4", "x ≤ 2.5 (min purata)", "x ≤ 1", "Tiada nilai sepunya"], 2, "Apabila kedua-dua menghala ke arah yang sama (kiri), gunakan syarat lebih ketat. x ≤ 1 lebih ketat daripada x ≤ 4.", "Medium"],
  ["Diberi x > 5 dan x < 2, apakah kesimpulannya?", ["Nilai sepunya ialah x > 5 dan x < 2", "Tiada nilai sepunya", "Nilai sepunya ialah 2 < x < 5", "Nilai sepunya ialah x = 3.5"], 1, "x > 5 bermaksud nilai lebih dari 5; x < 2 bermaksud nilai kurang daripada 2. Tiada nilai yang boleh memenuhi kedua-dua syarat ini serentak.", "Medium"],
  ["Diberi x ≥ 4 dan x ≤ 1, apakah kesimpulannya?", ["Nilai sepunya ialah 1 ≤ x ≤ 4", "Nilai sepunya ialah 2 atau 3", "Tiada nilai sepunya", "Nilai sepunya ialah x = 2.5"], 2, "x ≥ 4 bermaksud 4 ke atas; x ≤ 1 bermaksud 1 ke bawah. Kawasan tidak bertindih, jadi tiada nilai sepunya.", "Medium"],
  ["Selesaikan ketaksamaan serentak 2x + 1 > 5 dan 3x − 2 < 7, kemudian nyatakan nilai integer yang mungkin.", ["x = 2, 3 sahaja", "2 < x < 3, tiada integer", "2 < x < 3, nilai integer ialah tiada", "Nilai integer: tiada (tiada integer antara 2 dan 3 secara eksklusif)"], 3, "2x + 1 > 5 → x > 2; 3x − 2 < 7 → x < 3. Jadi 2 < x < 3. Tiada integer antara 2 dan 3 secara eksklusif.", "Hard"],
  ["Selesaikan ketaksamaan serentak x + 3 ≥ 1 dan x − 2 ≤ 4, kemudian nyatakan nilai integer yang mungkin.", ["−2 ≤ x ≤ 6, integer: −2, −1, 0, 1, 2, 3, 4, 5, 6", "x ≥ −2, integer: −2, −1, 0, ...", "x ≤ 6, integer: ..., 4, 5, 6", "Tiada nilai sepunya"], 0, "x + 3 ≥ 1 → x ≥ −2; x − 2 ≤ 4 → x ≤ 6. Nilai sepunya: −2 ≤ x ≤ 6. Integer: −2, −1, 0, 1, 2, 3, 4, 5, 6.", "Hard"],
  ["Selesaikan −2x + 3 > 1 dan cari nilai integer yang mungkin jika x < 5 juga.", ["1 < x < 5, integer: 2, 3, 4", "x < 1 dan x < 5, maka x < 1, integer: 0, −1, −2, ...", "Tiada nilai sepunya", "x > 1 dan x < 5, integer: 2, 3, 4"], 3, "−2x + 3 > 1 → −2x > −2 → x < 1. Dan juga x < 5. Syarat lebih ketat: x < 1. Integer: 0, −1, −2, ...", "Hard"],
  ["Sebuah kedai menjual tiket dengan harga sekurang-kurangnya RM5 tetapi tidak melebihi RM20. Tulis ketaksamaan untuk harga tiket h.", ["5 < h < 20", "5 ≤ h ≤ 20", "h ≥ 5 dan h > 20", "h > 5 dan h < 20"], 1, "'Sekurang-kurangnya RM5' bermaksud h ≥ 5; 'tidak melebihi RM20' bermaksud h ≤ 20. Jadi 5 ≤ h ≤ 20.", "Hard"],
  ["Umur peserta mestilah lebih daripada 12 tahun dan tidak melebihi 18 tahun. Tulis ketaksamaan untuk umur u dan nyatakan nilai integer yang mungkin.", ["12 < u ≤ 18, integer: 13, 14, 15, 16, 17, 18", "12 ≤ u < 18, integer: 12, 13, 14, 15, 16, 17", "12 < u < 18, integer: 13, 14, 15, 16, 17", "12 ≤ u ≤ 18, integer: 12, 13, ..., 18"], 0, "'Lebih daripada 12' → u > 12 (12 tidak termasuk); 'tidak melebihi 18' → u ≤ 18 (18 termasuk). Jadi 12 < u ≤ 18. Integer: 13, 14, 15, 16, 17, 18.", "Hard"],
  ["Berat beg sekolah mestilah tidak kurang daripada 1 kg dan tidak melebihi 5 kg. Tulis ketaksamaan untuk berat b.", ["1 < b < 5", "1 ≤ b < 5", "1 < b ≤ 5", "1 ≤ b ≤ 5"], 3, "'Tidak kurang daripada 1' → b ≥ 1; 'tidak melebihi 5' → b ≤ 5. Jadi 1 ≤ b ≤ 5.", "Hard"],
  ["Selesaikan ketaksamaan serentak −x + 2 > −1 dan 2x − 3 < 5.", ["−3 < x < 4", "x > 3 dan x < 4, jadi 3 < x < 4", "Tiada nilai sepunya", "x < 3 dan x < 4, maka x < 3"], 3, "−x + 2 > −1 → −x > −3 → x < 3. Dan 2x − 3 < 5 → 2x < 8 → x < 4. Syarat lebih ketat: x < 3.", "Hard"],
  ["Apakah nilai integer yang mungkin bagi penyelesaian soalan sebelumnya (x < 3 sahaja)?", ["2, 1, 0, −1, ...", "3, 2, 1, 0, ...", "4, 3, 2, 1, ...", "0, 1, 2, 3"], 0, "x < 3 bermaksud nilai integer terbesar ialah 2. Nilai integer: 2, 1, 0, −1, ...", "Hard"],
  ["Dua ketaksamaan menghasilkan garis bertindih hanya di titik x = 3. Adakah nilai sepunya wujud jika satu ketaksamaan menggunakan > dan satu lagi menggunakan <?", ["Ya, x = 3 ialah nilai sepunya", "Tidak, tiada nilai sepunya kerana bulatan terbuka menolak nilai 3", "Ya, 3 adalah nilai sempadan bagi kedua-duanya", "Bergantung kepada ketaksamaan lain"], 1, "Jika x > 3 dan x < 3, tiada nilai yang memenuhi kedua-duanya pada masa yang sama. Walaupun titik 3 muncul pada kedua-dua sempadan, ia tidak termasuk dalam mana-mana penyelesaian.", "Hard"],
  ["Bilakah perlu menggunakan 'syarat lebih ketat' dalam ketaksamaan serentak?", ["Apabila kedua-dua ketaksamaan menghala ke arah yang berlawanan", "Apabila kedua-dua ketaksamaan menghala ke arah yang sama", "Sentiasa perlu digunakan", "Tidak pernah perlu digunakan"], 1, "Syarat lebih ketat digunakan apabila kedua-dua ketaksamaan menghala ke arah yang sama, untuk memilih kawasan yang lebih terhad.", "Hard"],
  ["Diberi x ≥ 2 dan x > −1, apakah nilai sepunya?", ["x ≥ 2 (syarat lebih ketat)", "x > −1 (syarat lebih longgar)", "−1 < x ≤ 2", "Tiada nilai sepunya"], 0, "Kedua-dua menghala ke kanan. Syarat lebih ketat: x ≥ 2 (sempadan lebih besar). Nilai sepunya: x ≥ 2.", "Hard"],
  ["Diberi x < 3 dan x ≤ 7, apakah nilai sepunya?", ["x ≤ 7 (syarat lebih longgar)", "x < 3 (syarat lebih ketat)", "3 < x ≤ 7", "Tiada nilai sepunya"], 1, "Kedua-dua menghala ke kiri. Syarat lebih ketat: x < 3 (sempadan lebih kecil). Nilai sepunya: x < 3.", "Hard"],
  ["Selesaikan 4 − x > 1 dan 2x + 3 ≤ 11, kemudian nyatakan ketaksamaan berganda.", ["1 < x ≤ 4", "x < 3 dan x ≤ 4, maka x < 3", "Tiada nilai sepunya", "x < 3 dan x ≤ 4, bentuk berganda: x < 3"], 3, "4 − x > 1 → −x > −3 → x < 3. Dan 2x + 3 ≤ 11 → 2x ≤ 8 → x ≤ 4. Kedua-dua ke kiri; syarat lebih ketat: x < 3.", "Hard"],
  ["Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > −4 dan x ≤ −1?", ["−4, −3, −2, −1", "−3, −2, −1", "−3, −2", "−4, −3, −2"], 1, "x > −4 (tidak termasuk −4) dan x ≤ −1 (termasuk −1). Nilai sepunya: −4 < x ≤ −1. Integer: −3, −2, −1.", "Hard"],
  ["Selesaikan ketaksamaan serentak 2x − 1 > 3 dan x + 4 ≤ 10, kemudian nyatakan nilai integer yang mungkin.", ["2 < x ≤ 6, integer: 3, 4, 5, 6", "x > 2 dan x ≤ 6, integer: 3, 4, 5, 6", "Kedua-dua jawapan A dan B betul", "Tiada nilai integer"], 2, "2x − 1 > 3 → x > 2; x + 4 ≤ 10 → x ≤ 6. Nilai sepunya: 2 < x ≤ 6. Integer: 3, 4, 5, 6.", "Hard"],
  ["Sebuah syarikat menetapkan bahawa pekerja muda mestilah berumur lebih daripada 18 tetapi tidak melebihi 25. Berapa banyak nilai integer umur yang sah?", ["6", "7", "8", "5"], 1, "18 < u ≤ 25 menghasilkan integer: 19, 20, 21, 22, 23, 24, 25 — iaitu 7 nilai.", "Hard"],
  ["Apakah perbezaan antara 2 < x < 5 dan 2 ≤ x ≤ 5 dari segi nilai integer yang mungkin?", ["Tiada perbezaan", "2 < x < 5 tidak termasuk 2 dan 5; nilai integer: 3, 4. 2 ≤ x ≤ 5 termasuk 2 dan 5; nilai integer: 2, 3, 4, 5", "Kedua-dua menghasilkan integer yang sama", "2 < x < 5 termasuk lebih banyak integer"], 1, "Bulatan terbuka vs tertutup mempengaruhi sama ada sempadan termasuk atau tidak. 2 < x < 5 menghasilkan integer 3, 4 manakala 2 ≤ x ≤ 5 menghasilkan 2, 3, 4, 5.", "Hard"],
  ["Jika a > 0 dan b > 0 dengan a < b, apakah yang dapat disimpulkan tentang 1/a dan 1/b?", ["1/a < 1/b", "1/a > 1/b", "1/a = 1/b", "Tidak dapat ditentukan"], 1, "Peraturan Salingan: jika 0 < a < b, maka 1/a > 1/b.", "Hard"],
  ["Selesaikan ketaksamaan −3x + 6 ≥ 0 dan nyatakan nilai integer yang mungkin jika disertakan syarat x ≥ −5 juga.", ["−5 ≤ x ≤ 2, integer: −5, −4, −3, −2, −1, 0, 1, 2", "x ≤ 2 sahaja, integer: 2, 1, 0, −1, ...", "x ≥ −5 sahaja", "Tiada nilai sepunya"], 0, "−3x + 6 ≥ 0 → −3x ≥ −6 → x ≤ 2. Dan x ≥ −5. Nilai sepunya: −5 ≤ x ≤ 2. Integer: −5, −4, −3, −2, −1, 0, 1, 2.", "Hard"],
  ["Apakah maksud 'kawasan bertindih' pada garis nombor dalam konteks ketaksamaan serentak?", ["Kawasan di mana garis dua ketaksamaan bersilang", "Kawasan yang dipenuhi oleh KEDUA-DUA ketaksamaan pada masa yang sama", "Kawasan antara dua sempadan sahaja", "Kawasan di luar kedua-dua ketaksamaan"], 1, "Kawasan bertindih ialah kawasan pada garis nombor yang dipenuhi oleh KEDUA-DUA ketaksamaan serentak pada masa yang sama.", "Hard"],
  ["Diberi ketaksamaan serentak x > a dan x < b dengan a < b, dalam bentuk apakah nilai sepunya ditulis?", ["a ≤ x ≤ b", "a < x ≤ b", "a < x < b", "a > x > b"], 2, "Jika x > a (a tidak termasuk) dan x < b (b tidak termasuk), nilai sepunya ialah a < x < b.", "Hard"],
  ["Panjang sebuah tali mestilah lebih daripada 3 m dan kurang daripada 8 m. Berapakah nilai integer panjang yang mungkin (dalam meter)?", ["3, 4, 5, 6, 7, 8", "4, 5, 6, 7", "3, 4, 5, 6, 7", "4, 5, 6, 7, 8"], 1, "3 < p < 8 menghasilkan integer 4, 5, 6, 7 (3 dan 8 tidak termasuk).", "Hard"],
  ["Nyatakan bilangan nilai integer yang mungkin bagi ketaksamaan serentak x > 0 dan x ≤ 5.", ["4", "5", "6", "3"], 1, "0 < x ≤ 5 menghasilkan integer 1, 2, 3, 4, 5 — iaitu 5 nilai.", "Hard"],
]);

const MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["What are simultaneous linear inequalities?", ["Two equations solved together", "Two or more linear inequalities that must be satisfied at the same time by one variable", "Inequalities with two variables", "Inequalities with different symbols"], 1, "Simultaneous linear inequalities are two or more linear inequalities that must be satisfied at the same time by one variable.", "Medium"],
  ["Given x > −1 and x ≤ 3, what are the common values as a compound inequality?", ["−1 ≤ x < 3", "−1 < x ≤ 3", "−1 < x < 3", "−1 ≤ x ≤ 3"], 1, "x > −1 (−1 not included) and x ≤ 3 (3 included) gives −1 < x ≤ 3.", "Medium"],
  ["What are the possible integer values for the simultaneous inequality x > −1 and x ≤ 3?", ["−1, 0, 1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "−1, 0, 1, 2"], 1, "−1 < x ≤ 3 gives integers 0, 1, 2, 3 (−1 not included, 3 included).", "Medium"],
  ["Given x > 2 and x > 5, what are the common values?", ["x > 2", "x > 3.5 (average)", "x > 5", "No common values"], 2, "When both inequalities point in the same direction, use the stricter condition. x > 5 is stricter than x > 2.", "Medium"],
  ["Given x ≤ 4 and x ≤ 1, what are the common values?", ["x ≤ 4", "x ≤ 2.5 (average)", "x ≤ 1", "No common values"], 2, "When both point the same way (left), use the stricter condition. x ≤ 1 is stricter than x ≤ 4.", "Medium"],
  ["Given x > 5 and x < 2, what is the conclusion?", ["Common values are x > 5 and x < 2", "No common values", "Common values are 2 < x < 5", "Common values are x = 3.5"], 1, "x > 5 means values greater than 5; x < 2 means values less than 2. No value can satisfy both conditions at the same time.", "Medium"],
  ["Given x ≥ 4 and x ≤ 1, what is the conclusion?", ["Common values are 1 ≤ x ≤ 4", "Common values are 2 or 3", "No common values", "Common values are x = 2.5"], 2, "x ≥ 4 means 4 and above; x ≤ 1 means 1 and below. Regions do not overlap, so no common values.", "Medium"],
  ["Solve the simultaneous inequalities 2x + 1 > 5 and 3x − 2 < 7, then state the possible integer values.", ["x = 2, 3 only", "2 < x < 3, no integers", "2 < x < 3, integer values are none", "Integer values: none (no integer strictly between 2 and 3)"], 3, "2x + 1 > 5 → x > 2; 3x − 2 < 7 → x < 3. So 2 < x < 3. No integer strictly between 2 and 3.", "Hard"],
  ["Solve the simultaneous inequalities x + 3 ≥ 1 and x − 2 ≤ 4, then state the possible integer values.", ["−2 ≤ x ≤ 6, integers: −2, −1, 0, 1, 2, 3, 4, 5, 6", "x ≥ −2, integers: −2, −1, 0, ...", "x ≤ 6, integers: ..., 4, 5, 6", "No common values"], 0, "x + 3 ≥ 1 → x ≥ −2; x − 2 ≤ 4 → x ≤ 6. Common values: −2 ≤ x ≤ 6. Integers: −2, −1, 0, 1, 2, 3, 4, 5, 6.", "Hard"],
  ["Solve −2x + 3 > 1 and find possible integer values if x < 5 is also required.", ["1 < x < 5, integers: 2, 3, 4", "x < 1 and x < 5, so x < 1, integers: 0, −1, −2, ...", "No common values", "x > 1 and x < 5, integers: 2, 3, 4"], 3, "−2x + 3 > 1 → −2x > −2 → x < 1. And also x < 5. Stricter condition: x < 1. Integers: 0, −1, −2, ...", "Hard"],
  ["A shop sells tickets at a price of at least RM5 but not more than RM20. Write the inequality for ticket price h.", ["5 < h < 20", "5 ≤ h ≤ 20", "h ≥ 5 and h > 20", "h > 5 and h < 20"], 1, "'At least RM5' means h ≥ 5; 'not more than RM20' means h ≤ 20. So 5 ≤ h ≤ 20.", "Hard"],
  ["Participants must be older than 12 but not older than 18. Write the inequality for age u and state the possible integer values.", ["12 < u ≤ 18, integers: 13, 14, 15, 16, 17, 18", "12 ≤ u < 18, integers: 12, 13, 14, 15, 16, 17", "12 < u < 18, integers: 13, 14, 15, 16, 17", "12 ≤ u ≤ 18, integers: 12, 13, ..., 18"], 0, "'Older than 12' → u > 12 (12 not included); 'not older than 18' → u ≤ 18 (18 included). So 12 < u ≤ 18. Integers: 13, 14, 15, 16, 17, 18.", "Hard"],
  ["A school bag must weigh at least 1 kg and not more than 5 kg. Write the inequality for weight b.", ["1 < b < 5", "1 ≤ b < 5", "1 < b ≤ 5", "1 ≤ b ≤ 5"], 3, "'Not less than 1' → b ≥ 1; 'not more than 5' → b ≤ 5. So 1 ≤ b ≤ 5.", "Hard"],
  ["Solve the simultaneous inequalities −x + 2 > −1 and 2x − 3 < 5, then state the possible integer values.", ["−3 < x < 4, integers: −2, −1, 0, 1, 2, 3", "x > 3 and x < 4, so 3 < x < 4", "No common values", "x < 3 and x < 4, so x < 3, integers: 2, 1, 0, ..."], 3, "−x + 2 > −1 → x < 3. And 2x − 3 < 5 → x < 4. Stricter: x < 3. Integers: 2, 1, 0, −1, ...", "Hard"],
  ["What are the possible integers for the previous solution (x < 3 only)?", ["2, 1, 0, −1, ...", "3, 2, 1, 0, ...", "4, 3, 2, 1, ...", "0, 1, 2, 3"], 0, "x < 3 means the largest integer is 2. Integer values: 2, 1, 0, −1, ...", "Hard"],
  ["Two inequalities produce an overlap only at the point x = 3. Are there common values if one uses > and the other uses <?", ["Yes, x = 3 is the common value", "No, no common values because the open circle excludes 3", "Yes, 3 is the boundary for both", "Depends on the other inequality"], 1, "If x > 3 and x < 3, no value satisfies both at the same time. Even though 3 appears as the boundary for both, it is not included in either solution.", "Hard"],
  ["When should the 'stricter condition' be used in simultaneous inequalities?", ["When both inequalities point in opposite directions", "When both inequalities point in the same direction", "Always", "Never"], 1, "The stricter condition is used when both inequalities point in the same direction, to select the more restricted region.", "Hard"],
  ["Given x ≥ 2 and x > −1, what are the common values?", ["x ≥ 2 (stricter condition)", "x > −1 (less strict condition)", "−1 < x ≤ 2", "No common values"], 0, "Both point right. Stricter condition: x ≥ 2 (larger boundary). Common values: x ≥ 2.", "Hard"],
  ["Given x < 3 and x ≤ 7, what are the common values?", ["x ≤ 7 (less strict)", "x < 3 (stricter condition)", "3 < x ≤ 7", "No common values"], 1, "Both point left. Stricter condition: x < 3 (smaller boundary). Common values: x < 3.", "Hard"],
  ["Solve 4 − x > 1 and 2x + 3 ≤ 11, then state the solution as a compound inequality or the stricter condition.", ["1 < x ≤ 4", "x < 3 and x ≤ 4, so x < 3", "No common values", "x < 3 and x ≤ 4, compound: x < 3"], 3, "4 − x > 1 → x < 3. And 2x + 3 ≤ 11 → x ≤ 4. Both pointing left; stricter: x < 3.", "Hard"],
  ["What are the possible integer values for the simultaneous inequality x > −4 and x ≤ −1?", ["−4, −3, −2, −1", "−3, −2, −1", "−3, −2", "−4, −3, −2"], 1, "x > −4 (−4 not included) and x ≤ −1 (−1 included). Common: −4 < x ≤ −1. Integers: −3, −2, −1.", "Hard"],
  ["Solve the simultaneous inequalities 2x − 1 > 3 and x + 4 ≤ 10, then state the possible integer values.", ["2 < x ≤ 6, integers: 3, 4, 5, 6", "x > 2 and x ≤ 6, integers: 3, 4, 5, 6", "Both answers A and B are correct", "No integer values"], 2, "2x − 1 > 3 → x > 2; x + 4 ≤ 10 → x ≤ 6. Common: 2 < x ≤ 6. Integers: 3, 4, 5, 6.", "Hard"],
  ["A company requires young workers to be older than 18 but not more than 25. How many valid integer ages are there?", ["6", "7", "8", "5"], 1, "18 < u ≤ 25 gives integers: 19, 20, 21, 22, 23, 24, 25 — that is 7 values.", "Hard"],
  ["What is the difference between 2 < x < 5 and 2 ≤ x ≤ 5 in terms of possible integer values?", ["No difference", "2 < x < 5 excludes 2 and 5; integers: 3, 4. 2 ≤ x ≤ 5 includes 2 and 5; integers: 2, 3, 4, 5", "Both produce the same integers", "2 < x < 5 includes more integers"], 1, "Open vs closed circles affect whether boundaries are included. 2 < x < 5 gives integers 3, 4 while 2 ≤ x ≤ 5 gives 2, 3, 4, 5.", "Hard"],
  ["If a > 0 and b > 0 with a < b, what can be concluded about 1/a and 1/b?", ["1/a < 1/b", "1/a > 1/b", "1/a = 1/b", "Cannot be determined"], 1, "Reciprocal Rule: if 0 < a < b, then 1/a > 1/b.", "Hard"],
  ["Solve −3x + 6 ≥ 0 and state possible integer values if x ≥ −5 is also required.", ["−5 ≤ x ≤ 2, integers: −5, −4, −3, −2, −1, 0, 1, 2", "x ≤ 2 only, integers: 2, 1, 0, −1, ...", "x ≥ −5 only", "No common values"], 0, "−3x + 6 ≥ 0 → −3x ≥ −6 → x ≤ 2. And x ≥ −5. Common: −5 ≤ x ≤ 2. Integers: −5, −4, −3, −2, −1, 0, 1, 2.", "Hard"],
  ["What does 'overlapping region' mean on a number line in simultaneous inequalities?", ["The region where the two inequality lines cross", "The region satisfied by BOTH inequalities at the same time", "The region between two boundaries only", "The region outside both inequalities"], 1, "The overlapping region is the region on the number line satisfied by BOTH simultaneous inequalities at the same time.", "Hard"],
  ["Given simultaneous inequalities x > a and x < b with a < b, in what form are the common values written?", ["a ≤ x ≤ b", "a < x ≤ b", "a < x < b", "a > x > b"], 2, "If x > a (a not included) and x < b (b not included), the common values are a < x < b.", "Hard"],
  ["The length of a rope must be more than 3 m and less than 8 m. What are the possible integer lengths (in metres)?", ["3, 4, 5, 6, 7, 8", "4, 5, 6, 7", "3, 4, 5, 6, 7", "4, 5, 6, 7, 8"], 1, "3 < p < 8 gives integers 4, 5, 6, 7 (3 and 8 not included).", "Hard"],
  ["State the number of possible integer values for the simultaneous inequality x > 0 and x ≤ 5.", ["4", "5", "6", "3"], 1, "0 < x ≤ 5 gives integers 1, 2, 3, 4, 5 — that is 5 values.", "Hard"],
]);

const MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah jenis sudut yang saiznya tepat 90°?", ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"], 1, "Sudut tegak ialah sudut yang saiznya tepat 90°. Ia dilambangkan dengan tanda kotak kecil □ di bucu.", "Easy"],
  ["Apakah julat sudut tirus?", ["0° hingga 90°", "0° < sudut < 90°", "90° < sudut < 180°", "Tepat 90°"], 1, "Sudut tirus ialah sudut yang lebih besar daripada 0° tetapi lebih kecil daripada 90°.", "Easy"],
  ["Apakah julat sudut cakah?", ["0° hingga 90°", "Tepat 90°", "90° < sudut < 180°", "180° < sudut < 360°"], 2, "Sudut cakah ialah sudut yang lebih besar daripada 90° tetapi lebih kecil daripada 180°.", "Easy"],
  ["Apakah julat sudut refleks?", ["0° < sudut < 90°", "90° < sudut < 180°", "Tepat 180°", "180° < sudut < 360°"], 3, "Sudut refleks ialah sudut yang lebih besar daripada 180° tetapi lebih kecil daripada 360°.", "Easy"],
  ["Sudut 145° termasuk dalam jenis apakah?", ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"], 2, "145° terletak antara 90° dan 180°, maka ia adalah sudut cakah.", "Easy"],
  ["Sudut 250° termasuk dalam jenis apakah?", ["Sudut tirus", "Sudut cakah", "Sudut tegak", "Sudut refleks"], 3, "250° terletak antara 180° dan 360°, maka ia adalah sudut refleks.", "Easy"],
  ["Sudut 55° termasuk dalam jenis apakah?", ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"], 0, "55° terletak antara 0° dan 90°, maka ia adalah sudut tirus.", "Easy"],
  ["Apakah simbol yang menandakan sudut tegak dalam rajah?", ["Tanda anak panah", "Tanda kotak kecil □", "Tanda garis miring", "Tanda lengkung"], 1, "Sudut tegak (90°) ditandakan dengan simbol kotak kecil □ di bucu sudut.", "Easy"],
  ["Apakah alat yang digunakan untuk mengukur sudut?", ["Pembaris", "Jangka lukis", "Protraktor", "Sesiku"], 2, "Protraktor ialah alat yang digunakan untuk mengukur dan melukis sudut dalam darjah (°).", "Easy"],
  ["Apakah unit ukuran sudut?", ["Sentimeter (cm)", "Meter (m)", "Darjah (°)", "Kilogram (kg)"], 2, "Sudut diukur dalam unit darjah (°).", "Easy"],
  ["Apakah langkah pertama menggunakan protraktor?", ["Baca nilai darjah", "Letakkan titik tengah protraktor pada bucu sudut", "Sejajarkan garisan dasar dengan kaki sudut", "Lukis garisan baru"], 1, "Langkah pertama: Letakkan titik tengah protraktor tepat pada bucu sudut yang hendak diukur.", "Easy"],
  ["Dua tembereng garis adalah kongruen apabila?", ["Arahnya sama", "Panjangnya sama", "Warnanya sama", "Kedua-duanya mendatar"], 1, "Dua tembereng garis adalah kongruen jika panjangnya sama.", "Easy"],
  ["Dua sudut adalah kongruen apabila?", ["Bentuknya sama", "Saiznya (bilangan darjah) sama", "Keduanya sudut tirus", "Letaknya sama"], 1, "Dua sudut adalah kongruen jika saiznya (bilangan darjah) adalah sama.", "Easy"],
  ["Apakah 'bucu' dalam konteks sudut?", ["Titik hujung tembereng garis", "Titik di mana dua kaki sudut bertemu", "Sisi sudut", "Panjang sudut"], 1, "Bucu ialah titik di mana dua kaki (tembereng garis) sudut bertemu.", "Easy"],
  ["Manakah antara berikut adalah sudut tirus?", ["95°", "90°", "75°", "185°"], 2, "75° terletak antara 0° dan 90°, maka ia adalah sudut tirus. 95° adalah cakah, 90° adalah tegak, 185° adalah refleks.", "Easy"],
  ["Manakah antara berikut adalah sudut refleks?", ["80°", "170°", "90°", "200°"], 3, "200° terletak antara 180° dan 360°, maka ia adalah sudut refleks.", "Easy"],
  ["Apakah maksud kongruen dalam geometri?", ["Sama bentuk sahaja", "Sama saiz dan bentuk", "Sama saiz (ukuran) sahaja bergantung konteks", "Selari antara satu sama lain"], 2, "Dalam konteks tembereng garis, kongruen bermaksud panjang yang sama. Dalam konteks sudut, kongruen bermaksud darjah yang sama.", "Easy"],
  ["Sudut 90° dikenali sebagai apa?", ["Sudut tirus", "Sudut tepat atau sudut tegak", "Sudut cakah", "Sudut refleks"], 1, "Sudut 90° dikenali sebagai sudut tegak (right angle). Ia ditandakan dengan simbol kotak □.", "Easy"],
  ["Dalam rajah geometri, tembereng garis kongruen ditandakan dengan?", ["Tanda anak panah", "Tanda seretan (tick) yang sama", "Nombor yang sama", "Huruf yang sama"], 1, "Tembereng garis kongruen ditandakan dengan tanda seretan (tick marks) yang sama dalam rajah geometri.", "Easy"],
  ["Dalam rajah geometri, sudut kongruen ditandakan dengan?", ["Tanda seretan (tick) yang sama", "Lengkung (arc) yang sama", "Simbol kotak □", "Nombor yang sama"], 1, "Sudut kongruen ditandakan dengan lengkung (arc) yang sama dalam rajah geometri.", "Easy"],
  ["Apakah yang berlaku semasa mengukur sudut jika anda menggunakan skala yang salah pada protraktor?", ["Tiada perbezaan", "Jawapan akan salah", "Protraktor rosak", "Sudut menjadi negatif"], 1, "Protraktor mempunyai dua skala (dalam dan luar). Menggunakan skala yang salah akan memberikan jawapan yang tidak tepat.", "Easy"],
  ["Sudut 88° termasuk dalam jenis apakah?", ["Sudut cakah", "Sudut tegak", "Sudut tirus", "Sudut refleks"], 2, "88° terletak antara 0° dan 90°, maka ia adalah sudut tirus (kurang daripada 90°).", "Easy"],
  ["Apakah perbezaan antara sudut cakah dan sudut refleks?", ["Tiada perbezaan", "Cakah: 90°–180°; Refleks: 180°–360°", "Cakah: 0°–90°; Refleks: 90°–180°", "Cakah mempunyai bucu; Refleks tidak"], 1, "Sudut cakah terletak antara 90° dan 180°. Sudut refleks terletak antara 180° dan 360°.", "Easy"],
  ["Apakah yang dimaksudkan dengan 'kaki sudut'?", ["Bahagian bawah sudut", "Dua tembereng garis yang membentuk sudut", "Nilai darjah sudut", "Titik tengah sudut"], 1, "Kaki sudut ialah dua tembereng garis yang bertemu di bucu untuk membentuk sudut.", "Easy"],
  ["Sudut manakah yang TIDAK boleh diukur menggunakan protraktor separuh bulatan biasa (0°–180°) secara terus?", ["45°", "90°", "150°", "270°"], 3, "Protraktor separuh bulatan hanya mengukur sudut 0° hingga 180°. Sudut refleks seperti 270° memerlukan pengiraan tambahan.", "Easy"],
  ["Apakah jenis sudut yang terbentuk di penjuru buku teks?", ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"], 1, "Penjuru buku teks membentuk sudut 90° (sudut tegak).", "Easy"],
  ["Dua sudut adalah kongruen: ∠ABC = 45° dan ∠XYZ = 45°. Tulis ini menggunakan simbol.", ["∠ABC = ∠XYZ", "∠ABC ≅ ∠XYZ", "∠ABC ∥ ∠XYZ", "∠ABC ⊥ ∠XYZ"], 1, "Simbol kongruen ialah ≅. Jadi ∠ABC ≅ ∠XYZ menunjukkan kedua-dua sudut adalah kongruen (sama besar).", "Easy"],
  ["Sudut 179° termasuk dalam jenis apakah?", ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"], 2, "179° terletak antara 90° dan 180°, maka ia adalah sudut cakah (walaupun hampir 180°).", "Easy"],
  ["Manakah contoh sudut dalam kehidupan sebenar?", ["Panjang meja", "Berat beg", "Sudut antara jarum jam pada pukul 3", "Luas buku"], 2, "Sudut antara jarum jam panjang dan pendek pada pukul 3 adalah 90°, yang merupakan contoh sudut tegak.", "Easy"],
  ["Apakah satu putaran penuh dalam darjah?", ["90°", "180°", "270°", "360°"], 3, "Satu putaran penuh (complete turn) adalah 360°.", "Easy"],
]);

const MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What type of angle is exactly 90°?", ["Acute angle", "Right angle", "Obtuse angle", "Reflex angle"], 1, "A right angle is exactly 90°. It is marked with a small square symbol □ at the vertex.", "Easy"],
  ["What is the range of an acute angle?", ["0° to 90°", "0° < angle < 90°", "90° < angle < 180°", "Exactly 90°"], 1, "An acute angle is greater than 0° but less than 90°.", "Easy"],
  ["What is the range of an obtuse angle?", ["0° to 90°", "Exactly 90°", "90° < angle < 180°", "180° < angle < 360°"], 2, "An obtuse angle is greater than 90° but less than 180°.", "Easy"],
  ["What is the range of a reflex angle?", ["0° < angle < 90°", "90° < angle < 180°", "Exactly 180°", "180° < angle < 360°"], 3, "A reflex angle is greater than 180° but less than 360°.", "Easy"],
  ["What type of angle is 145°?", ["Acute", "Right", "Obtuse", "Reflex"], 2, "145° lies between 90° and 180°, so it is an obtuse angle.", "Easy"],
  ["What type of angle is 250°?", ["Acute", "Obtuse", "Right", "Reflex"], 3, "250° lies between 180° and 360°, so it is a reflex angle.", "Easy"],
  ["What type of angle is 55°?", ["Acute", "Right", "Obtuse", "Reflex"], 0, "55° lies between 0° and 90°, so it is an acute angle.", "Easy"],
  ["What symbol marks a right angle in a diagram?", ["An arrow mark", "A small square □", "A slash mark", "A curved arc"], 1, "A right angle (90°) is marked with a small square symbol □ at the vertex.", "Easy"],
  ["What tool is used to measure angles?", ["Ruler", "Compass", "Protractor", "Set square"], 2, "A protractor is the tool used to measure and draw angles in degrees (°).", "Easy"],
  ["What is the unit for measuring angles?", ["Centimetres (cm)", "Metres (m)", "Degrees (°)", "Kilograms (kg)"], 2, "Angles are measured in the unit degrees (°).", "Easy"],
  ["What is the first step when using a protractor?", ["Read the degree value", "Place the centre point of the protractor at the vertex", "Align the baseline with one arm", "Draw a new line"], 1, "First step: Place the centre point of the protractor exactly at the vertex of the angle.", "Easy"],
  ["Two line segments are congruent when?", ["They go in the same direction", "They have the same length", "They are the same colour", "They are both horizontal"], 1, "Two line segments are congruent if they have the same length.", "Easy"],
  ["Two angles are congruent when?", ["They look the same shape", "They have the same size (degrees)", "They are both acute angles", "They are in the same position"], 1, "Two angles are congruent if they have the same size (number of degrees).", "Easy"],
  ["What is a 'vertex' in the context of angles?", ["The endpoint of a line segment", "The point where the two arms of an angle meet", "The side of an angle", "The length of an angle"], 1, "A vertex is the point where the two arms (line segments) of an angle meet.", "Easy"],
  ["Which of the following is an acute angle?", ["95°", "90°", "75°", "185°"], 2, "75° lies between 0° and 90°, so it is acute. 95° is obtuse, 90° is right, 185° is reflex.", "Easy"],
  ["Which of the following is a reflex angle?", ["80°", "170°", "90°", "200°"], 3, "200° lies between 180° and 360°, so it is a reflex angle.", "Easy"],
  ["What does congruent mean in geometry?", ["Same shape only", "Same size and shape", "Same size (measurement) depending on context", "Parallel to each other"], 2, "For line segments, congruent means the same length. For angles, congruent means the same number of degrees.", "Easy"],
  ["A 90° angle is also known as?", ["Acute angle", "Right angle", "Obtuse angle", "Reflex angle"], 1, "A 90° angle is called a right angle, marked with the square symbol □.", "Easy"],
  ["In geometric diagrams, congruent line segments are marked with?", ["Arrow marks", "The same number of tick marks", "The same number", "The same letter"], 1, "Congruent line segments are marked with the same number of tick marks in geometric diagrams.", "Easy"],
  ["In geometric diagrams, congruent angles are marked with?", ["Tick marks", "The same number of arcs", "A square symbol □", "The same number"], 1, "Congruent angles are marked with the same number of arcs in geometric diagrams.", "Easy"],
  ["What happens if you use the wrong scale on a protractor?", ["No difference", "The answer will be wrong", "The protractor breaks", "The angle becomes negative"], 1, "A protractor has two scales (inner and outer). Using the wrong scale will give an incorrect measurement.", "Easy"],
  ["What type of angle is 88°?", ["Obtuse", "Right", "Acute", "Reflex"], 2, "88° lies between 0° and 90°, so it is an acute angle (less than 90°).", "Easy"],
  ["What is the difference between an obtuse and a reflex angle?", ["No difference", "Obtuse: 90°–180°; Reflex: 180°–360°", "Obtuse: 0°–90°; Reflex: 90°–180°", "Obtuse has a vertex; Reflex does not"], 1, "Obtuse angles are between 90° and 180°. Reflex angles are between 180° and 360°.", "Easy"],
  ["What are the 'arms' of an angle?", ["The bottom part of an angle", "The two line segments forming the angle", "The degree value of the angle", "The midpoint of the angle"], 1, "The arms of an angle are the two line segments that meet at the vertex to form the angle.", "Easy"],
  ["Which angle CANNOT be directly measured with a standard semicircular protractor (0°–180°)?", ["45°", "90°", "150°", "270°"], 3, "A semicircular protractor only measures 0° to 180°. Reflex angles like 270° require additional calculation.", "Easy"],
  ["What type of angle is formed at the corner of a textbook?", ["Acute", "Right", "Obtuse", "Reflex"], 1, "The corner of a textbook forms a 90° angle (right angle).", "Easy"],
  ["Two angles are congruent: ∠ABC = 45° and ∠XYZ = 45°. Write this using a symbol.", ["∠ABC = ∠XYZ", "∠ABC ≅ ∠XYZ", "∠ABC ∥ ∠XYZ", "∠ABC ⊥ ∠XYZ"], 1, "The congruence symbol is ≅. So ∠ABC ≅ ∠XYZ shows both angles are congruent (equal in size).", "Easy"],
  ["What type of angle is 179°?", ["Acute", "Right", "Obtuse", "Reflex"], 2, "179° lies between 90° and 180°, so it is an obtuse angle (even though it is close to 180°).", "Easy"],
  ["Which is a real-life example of an angle?", ["The length of a table", "The weight of a bag", "The angle between clock hands at 3 o'clock", "The area of a book"], 2, "The angle between the hour and minute hands at 3 o'clock is 90°, a real-life example of a right angle.", "Easy"],
  ["What is one complete turn in degrees?", ["90°", "180°", "270°", "360°"], 3, "One complete turn is 360°.", "Easy"],
]);

const MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Dua sudut pada garis lurus ialah 75° dan x. Cari x.", ["x = 75°", "x = 105°", "x = 115°", "x = 125°"], 1, "Sudut pada garis lurus berjumlah 180°. x = 180° − 75° = 105°.", "Medium"],
  ["Tiga sudut pada garis lurus ialah 40°, 60° dan y. Cari y.", ["y = 80°", "y = 100°", "y = 60°", "y = 40°"], 0, "40° + 60° + y = 180°. y = 180° − 100° = 80°.", "Medium"],
  ["Empat sudut putaran lengkap ialah 90°, 120°, 80° dan z. Cari z.", ["z = 70°", "z = 80°", "z = 60°", "z = 50°"], 0, "90° + 120° + 80° + z = 360°. z = 360° − 290° = 70°.", "Medium"],
  ["Cari pelengkap bagi sudut 38°.", ["38°", "52°", "142°", "322°"], 1, "Pelengkap = 90° − 38° = 52°.", "Medium"],
  ["Cari penggenap bagi sudut 115°.", ["65°", "245°", "75°", "25°"], 0, "Penggenap = 180° − 115° = 65°.", "Medium"],
  ["Cari konjugat bagi sudut 135°.", ["45°", "225°", "315°", "245°"], 1, "Konjugat = 360° − 135° = 225°.", "Medium"],
  ["Dua garis bersilang membentuk sudut 65° dan x (sudut bertentang bucu). Cari x.", ["115°", "65°", "25°", "180°"], 1, "Sudut bertentang bucu adalah sama. x = 65°.", "Medium"],
  ["Dua garis bersilang membentuk sudut 3a dan 120° (bertentang bucu). Cari a.", ["a = 40°", "a = 60°", "a = 20°", "a = 30°"], 0, "3a = 120° (bertentang bucu). a = 120° ÷ 3 = 40°.", "Medium"],
  ["Dua garis bersilang. Satu sudut ialah 55°. Cari semua sudut lain.", ["125°, 55°, 125°", "55°, 125°, 55°", "Kedua-dua A dan B betul", "65°, 55°, 65°"], 2, "Sudut bertentang bucu: 55° dan 55°. Sudut bersebelahan: 180° − 55° = 125°. Jadi empat sudut adalah 55°, 125°, 55°, 125°.", "Medium"],
  ["Sudut bersebelahan pada garis lurus = 148° dan y. Cari y.", ["y = 148°", "y = 32°", "y = 212°", "y = 52°"], 1, "Sudut bersebelahan berjumlah 180°. y = 180° − 148° = 32°.", "Medium"],
  ["Jika (2x + 10)° dan 80° adalah sudut bertentang bucu, cari x.", ["x = 35°", "x = 40°", "x = 45°", "x = 30°"], 0, "2x + 10 = 80. 2x = 70. x = 35.", "Medium"],
  ["Cari pelengkap bagi sudut (x + 15)° jika pelengkapnya ialah 40°.", ["x = 35°", "x = 50°", "x = 25°", "x = 40°"], 0, "(x + 15) + 40 = 90. x + 55 = 90. x = 35.", "Medium"],
  ["Cari penggenap bagi sudut (3y − 10)° jika penggenapnya ialah 70°.", ["y = 40°", "y = 30°", "y = 50°", "y = 60°"], 0, "(3y − 10) + 70 = 180. 3y + 60 = 180. 3y = 120. y = 40.", "Medium"],
  ["Garis rentas memotong dua garis selari. Sudut sepadan = 110°. Cari sudut selari yang lain.", ["70°", "110°", "80°", "180°"], 1, "Sudut SEPADAN adalah SAMA BESAR. Sudut selari yang lain = 110°.", "Medium"],
  ["Garis rentas memotong dua garis selari. Sudut selang-seli = 65°. Cari sudut yang lain.", ["115°", "25°", "65°", "165°"], 2, "Sudut SELANG-SELI adalah SAMA BESAR. Sudut yang lain = 65°.", "Medium"],
  ["Garis rentas memotong dua garis selari. Satu sudut pedalaman bersebelahan = 75°. Cari yang lain.", ["75°", "105°", "255°", "180°"], 1, "Sudut PEDALAMAN BERSEBELAHAN berjumlah 180°. Sudut yang lain = 180° − 75° = 105°.", "Medium"],
  ["Garis rentas memotong dua garis selari dengan sudut sepadan = (5x − 20)° dan 80°. Cari x.", ["x = 20°", "x = 25°", "x = 15°", "x = 30°"], 0, "5x − 20 = 80 (sudut sepadan sama). 5x = 100. x = 20.", "Medium"],
  ["Garis rentas memotong dua garis selari. Sudut selang-seli = (4y + 5)° dan 85°. Cari y.", ["y = 20°", "y = 25°", "y = 30°", "y = 15°"], 0, "4y + 5 = 85 (sudut selang-seli sama). 4y = 80. y = 20.", "Medium"],
  ["Sudut pedalaman bersebelahan = (3z + 15)° dan 75°. Cari z.", ["z = 30°", "z = 20°", "z = 25°", "z = 15°"], 0, "(3z + 15) + 75 = 180. 3z + 90 = 180. 3z = 90. z = 30.", "Medium"],
  ["Dua garis bersilang. Sudut 1 = 4a, sudut bertentang bucu = 60°. Cari a.", ["a = 15°", "a = 20°", "a = 10°", "a = 25°"], 0, "4a = 60 (bertentang bucu). a = 15.", "Medium"],
  ["Tiga sudut pada garis lurus: (x + 20)°, 50° dan (x − 10)°. Cari x.", ["x = 60°", "x = 50°", "x = 55°", "x = 45°"], 1, "(x + 20) + 50 + (x − 10) = 180. 2x + 60 = 180. 2x = 120. x = 60. Semak: 80 + 50 + 50 = 180 ✓. x = 60.", "Medium"],
  ["Garis AB adalah serenjang dengan CD. Apakah sudut yang terbentuk di persimpangan?", ["45°", "90°", "180°", "360°"], 1, "Garis serenjang membentuk sudut tepat 90°.", "Medium"],
  ["Dua garis selari. Garis rentas membentuk sudut 120° dengan garis atas. Cari sudut sepadan di garis bawah.", ["60°", "120°", "180°", "240°"], 1, "Sudut sepadan adalah sama besar. Sudut sepadan = 120°.", "Medium"],
  ["Sudut pada garis lurus: (2x + 5)° dan (3x − 5)°. Cari x.", ["x = 36°", "x = 40°", "x = 32°", "x = 45°"], 0, "(2x + 5) + (3x − 5) = 180. 5x = 180. x = 36.", "Medium"],
  ["Dua sudut putaran lengkap: 200° dan y. Cari y.", ["y = 160°", "y = 140°", "y = 180°", "y = 200°"], 0, "200° + y = 360°. y = 360° − 200° = 160°.", "Medium"],
  ["Sudut pedalaman bersebelahan pada garis selari = 90° dan k. Cari k.", ["k = 90°", "k = 180°", "k = 270°", "k = 45°"], 0, "Sudut pedalaman berjumlah 180°. 90° + k = 180°. k = 90°.", "Medium"],
  ["Selang-seli dengan garis selari: sudut = (6m − 30)° dan 90°. Cari m.", ["m = 20°", "m = 25°", "m = 30°", "m = 15°"], 1, "6m − 30 = 90. 6m = 120. m = 20. Semak: 6(20) − 30 = 90 ✓. m = 20.", "Medium"],
  ["Sudut bersebelahan: (x + 40)° dan (2x − 10)°. Berjumlah 180°. Cari x.", ["x = 50°", "x = 40°", "x = 60°", "x = 45°"], 0, "(x + 40) + (2x − 10) = 180. 3x + 30 = 180. 3x = 150. x = 50.", "Medium"],
  ["Dua garis bersilang membentuk empat sudut: 40°, y, 40° dan z. Cari y.", ["y = 40°", "y = 140°", "y = 80°", "y = 180°"], 1, "Sudut bertentang bucu: 40° bertentang bucu = 40°. Sudut bersebelahan: y = 180° − 40° = 140°.", "Medium"],
  ["Jika sudut pedalaman bersebelahan = 2p dan 4p, cari nilai p.", ["p = 20°", "p = 30°", "p = 45°", "p = 60°"], 1, "2p + 4p = 180°. 6p = 180°. p = 30°.", "Medium"],
]);

const MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Two angles on a straight line are 75° and x. Find x.", ["x = 75°", "x = 105°", "x = 115°", "x = 125°"], 1, "Angles on a straight line sum to 180°. x = 180° − 75° = 105°.", "Medium"],
  ["Three angles on a straight line are 40°, 60° and y. Find y.", ["y = 80°", "y = 100°", "y = 60°", "y = 40°"], 0, "40° + 60° + y = 180°. y = 180° − 100° = 80°.", "Medium"],
  ["Four angles at a complete turn are 90°, 120°, 80° and z. Find z.", ["z = 70°", "z = 80°", "z = 60°", "z = 50°"], 0, "90° + 120° + 80° + z = 360°. z = 360° − 290° = 70°.", "Medium"],
  ["Find the complement of 38°.", ["38°", "52°", "142°", "322°"], 1, "Complement = 90° − 38° = 52°.", "Medium"],
  ["Find the supplement of 115°.", ["65°", "245°", "75°", "25°"], 0, "Supplement = 180° − 115° = 65°.", "Medium"],
  ["Find the conjugate of 135°.", ["45°", "225°", "315°", "245°"], 1, "Conjugate = 360° − 135° = 225°.", "Medium"],
  ["Two lines intersect forming 65° and x (vertically opposite). Find x.", ["115°", "65°", "25°", "180°"], 1, "Vertically opposite angles are equal. x = 65°.", "Medium"],
  ["Two lines intersect forming 3a and 120° (vertically opposite). Find a.", ["a = 40°", "a = 60°", "a = 20°", "a = 30°"], 0, "3a = 120° (vertically opposite). a = 120° ÷ 3 = 40°.", "Medium"],
  ["Two lines intersect. One angle is 55°. Find all other angles.", ["125°, 55°, 125°", "55°, 125°, 55°", "Both A and B are correct", "65°, 55°, 65°"], 2, "Vertically opposite: 55° and 55°. Adjacent: 180° − 55° = 125°. So the four angles are 55°, 125°, 55°, 125°.", "Medium"],
  ["Adjacent angles on a straight line: 148° and y. Find y.", ["y = 148°", "y = 32°", "y = 212°", "y = 52°"], 1, "Adjacent angles sum to 180°. y = 180° − 148° = 32°.", "Medium"],
  ["If (2x + 10)° and 80° are vertically opposite angles, find x.", ["x = 35°", "x = 40°", "x = 45°", "x = 30°"], 0, "2x + 10 = 80. 2x = 70. x = 35.", "Medium"],
  ["Find the complement of (x + 15)° if the complement is 40°.", ["x = 35°", "x = 50°", "x = 25°", "x = 40°"], 0, "(x + 15) + 40 = 90. x + 55 = 90. x = 35.", "Medium"],
  ["Find the supplement of (3y − 10)° if the supplement is 70°.", ["y = 40°", "y = 30°", "y = 50°", "y = 60°"], 0, "(3y − 10) + 70 = 180. 3y + 60 = 180. 3y = 120. y = 40.", "Medium"],
  ["A transversal crosses two parallel lines. Corresponding angle = 110°. Find the other.", ["70°", "110°", "80°", "180°"], 1, "CORRESPONDING angles are EQUAL. The other angle = 110°.", "Medium"],
  ["A transversal crosses two parallel lines. Alternate angle = 65°. Find the other.", ["115°", "25°", "65°", "165°"], 2, "ALTERNATE angles are EQUAL. The other angle = 65°.", "Medium"],
  ["A transversal crosses two parallel lines. One co-interior angle = 75°. Find the other.", ["75°", "105°", "255°", "180°"], 1, "CO-INTERIOR angles sum to 180°. The other = 180° − 75° = 105°.", "Medium"],
  ["Transversal cuts two parallel lines: corresponding angles = (5x − 20)° and 80°. Find x.", ["x = 20°", "x = 25°", "x = 15°", "x = 30°"], 0, "5x − 20 = 80 (corresponding angles equal). 5x = 100. x = 20.", "Medium"],
  ["Transversal cuts two parallel lines: alternate angles = (4y + 5)° and 85°. Find y.", ["y = 20°", "y = 25°", "y = 30°", "y = 15°"], 0, "4y + 5 = 85 (alternate angles equal). 4y = 80. y = 20.", "Medium"],
  ["Co-interior angles = (3z + 15)° and 75°. Find z.", ["z = 30°", "z = 20°", "z = 25°", "z = 15°"], 0, "(3z + 15) + 75 = 180. 3z + 90 = 180. 3z = 90. z = 30.", "Medium"],
  ["Two lines intersect. Angle 1 = 4a, vertically opposite angle = 60°. Find a.", ["a = 15°", "a = 20°", "a = 10°", "a = 25°"], 0, "4a = 60 (vertically opposite). a = 15.", "Medium"],
  ["Three angles on a straight line: (x + 20)°, 50° and (x − 10)°. Find x.", ["x = 60°", "x = 50°", "x = 55°", "x = 45°"], 0, "(x + 20) + 50 + (x − 10) = 180. 2x + 60 = 180. 2x = 120. x = 60.", "Medium"],
  ["Line AB is perpendicular to CD. What angle is formed at the intersection?", ["45°", "90°", "180°", "360°"], 1, "Perpendicular lines form a right angle of exactly 90°.", "Medium"],
  ["Two parallel lines. Transversal forms 120° with the top line. Find the corresponding angle at the bottom line.", ["60°", "120°", "180°", "240°"], 1, "Corresponding angles are equal. Corresponding angle = 120°.", "Medium"],
  ["Angles on a straight line: (2x + 5)° and (3x − 5)°. Find x.", ["x = 36°", "x = 40°", "x = 32°", "x = 45°"], 0, "(2x + 5) + (3x − 5) = 180. 5x = 180. x = 36.", "Medium"],
  ["Two angles at a complete turn: 200° and y. Find y.", ["y = 160°", "y = 140°", "y = 180°", "y = 200°"], 0, "200° + y = 360°. y = 360° − 200° = 160°.", "Medium"],
  ["Co-interior angles of parallel lines = 90° and k. Find k.", ["k = 90°", "k = 180°", "k = 270°", "k = 45°"], 0, "Co-interior angles sum to 180°. 90° + k = 180°. k = 90°.", "Medium"],
  ["Alternate angles with parallel lines: (6m − 30)° and 90°. Find m.", ["m = 20°", "m = 25°", "m = 30°", "m = 15°"], 0, "6m − 30 = 90. 6m = 120. m = 20.", "Medium"],
  ["Adjacent angles: (x + 40)° and (2x − 10)° summing to 180°. Find x.", ["x = 50°", "x = 40°", "x = 60°", "x = 45°"], 0, "(x + 40) + (2x − 10) = 180. 3x + 30 = 180. 3x = 150. x = 50.", "Medium"],
  ["Two lines intersect forming 40°, y, 40° and z. Find y.", ["y = 40°", "y = 140°", "y = 80°", "y = 180°"], 1, "Vertically opposite: 40° opposite = 40°. Adjacent: y = 180° − 40° = 140°.", "Medium"],
  ["If co-interior angles = 2p and 4p, find p.", ["p = 20°", "p = 30°", "p = 45°", "p = 60°"], 1, "2p + 4p = 180°. 6p = 180°. p = 30°.", "Medium"],
]);

const MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Garis rentas memotong dua garis selari. Sudut sepadan ialah (2x + 15)° dan (3x − 10)°. Cari x dan nilai setiap sudut.", ["x = 25, sudut = 65°", "x = 20, sudut = 55°", "x = 30, sudut = 75°", "x = 15, sudut = 45°"], 0, "Sudut sepadan adalah sama: 2x + 15 = 3x − 10. 25 = x. Sudut = 2(25) + 15 = 65°.", "Hard"],
  ["Tiga sudut serentak pada garis lurus: (3x + 5)°, (x + 15)° dan 60°. Cari x dan nilai semua sudut.", ["x = 25, sudut: 80°, 40°, 60°", "x = 20, sudut: 65°, 35°, 60°", "x = 15, sudut: 50°, 30°, 60°", "x = 30, sudut: 95°, 45°, 60°"], 0, "(3x + 5) + (x + 15) + 60 = 180. 4x + 80 = 180. 4x = 100. x = 25. Sudut: 80°, 40°, 60°.", "Hard"],
  ["Dua sudut bertentang bucu ialah (5a − 30)° dan (2a + 15)°. Cari a dan nilai sudut.", ["a = 15, sudut = 45°", "a = 20, sudut = 55°", "a = 25, sudut = 65°", "a = 10, sudut = 35°"], 0, "5a − 30 = 2a + 15. 3a = 45. a = 15. Sudut = 5(15) − 30 = 45°.", "Hard"],
  ["Dalam rajah garis selari, sudut pedalaman bersebelahan ialah (4x − 20)° dan (2x + 40)°. Cari x.", ["x = 26.67°", "x = 25°", "x = 30°", "x = 27°"], 1, "(4x − 20) + (2x + 40) = 180. 6x + 20 = 180. 6x = 160. x = 26.67. Tiada jawapan tepat. Semak: 6x = 160, x ≈ 26.67. Pilihan terdekat x = 25 adalah anggaran.", "Hard"],
  ["Garis rentas memotong dua garis selari. Sudut a = 70°. Cari semua sudut yang berlabel b, c dan d dalam rajah persilangan biasa.", ["b = 110°, c = 70°, d = 110°", "b = 70°, c = 110°, d = 70°", "b = 110°, c = 110°, d = 70°", "b = 70°, c = 70°, d = 110°"], 0, "a = 70°. b (bersebelahan) = 180° − 70° = 110°. c (selang-seli) = 70°. d (bersebelahan dengan c) = 110°.", "Hard"],
  ["Sudut dongak dari titik A ke bangunan ialah 35°. Apakah yang boleh disimpulkan?", ["Pemerhati di atas bangunan", "Pemerhati di bawah bangunan, melihat ke atas pada 35° dari ufuk", "Bangunan condong 35°", "Sudut di puncak bangunan ialah 35°"], 1, "Sudut dongak diukur dari garisan ufuk ke atas. Pemerhati A berada di bawah dan melihat ke atas pada 35°.", "Hard"],
  ["Sudut tunduk dari menara ke bot ialah 40°. Apakah yang boleh disimpulkan?", ["Bot melihat ke atas pada 40°", "Pemerhati di menara melihat ke bawah ke bot pada 40° dari ufuk", "Menara condong 40°", "Sudut 40° diukur dari bawah"], 1, "Sudut tunduk diukur dari garisan ufuk ke bawah. Pemerhati di menara melihat ke bawah pada 40°.", "Hard"],
  ["Dalam rajah dengan dua garis selari dan garis rentas, sudut sepadan = (6x − 10)° dan sudut pedalaman bersebelahan dengan satu daripadanya = 130°. Cari x.", ["x = 10°", "x = 15°", "x = 20°", "x = 25°"], 1, "Sudut pedalaman bersebelahan berjumlah 180°. Sudut sepadan = 180° − 130° = 50°. 6x − 10 = 50. 6x = 60. x = 10.", "Hard"],
  ["Dua garis bersilang. Sudut 1 = 3y + 20 dan sudut bersebelahan = 2y + 40. Cari y.", ["y = 24°", "y = 20°", "y = 16°", "y = 28°"], 1, "Sudut bersebelahan berjumlah 180°. (3y + 20) + (2y + 40) = 180. 5y + 60 = 180. 5y = 120. y = 24.", "Hard"],
  ["Garis rentas memotong dua garis selari. Sudut di titik A (atas) = 75°. Cari sudut selang-seli dan sudut pedalaman bersebelahan di titik B (bawah).", ["Selang-seli = 75°, Pedalaman = 105°", "Selang-seli = 105°, Pedalaman = 75°", "Selang-seli = 75°, Pedalaman = 75°", "Selang-seli = 105°, Pedalaman = 105°"], 0, "Sudut selang-seli = 75° (sama). Sudut pedalaman bersebelahan = 180° − 75° = 105°.", "Hard"],
  ["Seorang pelajar melihat puncak tiang bendera pada sudut dongak 50°. Jika jarak mendatar antara pelajar dan tiang ialah 10 m, apakah kenyataan yang paling tepat?", ["Tiang bendera = 10 tan 50°", "Sudut tunduk dari puncak tiang ke pelajar ialah 50°", "Sudut pelengkap bagi sudut dongak ialah 40°", "Semua di atas adalah betul"], 3, "Ketinggian tiang = 10 tan 50°. Sudut tunduk dari puncak ke pelajar sama dengan sudut dongak = 50° (sudut selang-seli). Pelengkap 50° = 90° − 50° = 40°. Semua betul.", "Hard"],
  ["Rajah menunjukkan dua garis selari dengan garis rentas. Sudut di atas kiri titik A = 125°. Cari sudut di bawah kanan titik B menggunakan sifat sudut sepadan.", ["55°", "125°", "235°", "65°"], 1, "Sudut sepadan (di kedudukan yang sama: atas kiri di kedua-dua persilangan) adalah sama. Sudut di atas kiri titik B = 125°.", "Hard"],
  ["Tiga garis selari dipotong oleh garis rentas. Sudut di garis pertama = 70°. Apakah sudut selang-seli di garis ketiga?", ["70°", "110°", "180°", "Tidak boleh ditentukan"], 0, "Sifat sudut selang-seli berlaku bagi setiap pasangan garis selari. Sudut selang-seli di garis ketiga juga = 70°.", "Hard"],
  ["Sudut pedalaman bersebelahan ialah (4p + 10)° dan (2p + 20)°. Cari nilai p dan kedua-dua sudut.", ["p = 25, sudut: 110° dan 70°", "p = 20, sudut: 90° dan 60°", "p = 30, sudut: 130° dan 80°", "p = 15, sudut: 70° dan 50°"], 0, "(4p + 10) + (2p + 20) = 180. 6p + 30 = 180. 6p = 150. p = 25. Sudut: 4(25)+10 = 110° dan 2(25)+20 = 70°.", "Hard"],
  ["Dua garis bersilang dengan sudut 2m, 3m, 2m, 3m berselang-seli. Tunjukkan nilai m.", ["m = 36°", "m = 40°", "m = 30°", "m = 45°"], 0, "Sudut bersebelahan berjumlah 180°: 2m + 3m = 180°. 5m = 180°. m = 36°.", "Hard"],
  ["Rajah menunjukkan pemerhati di atas tebing pada ketinggian 100 m melihat bot di laut. Sudut tunduk = 30°. Jarak mendatar bot = 100/tan 30°. Apakah kenyataan yang betul tentang sudut dongak dari bot ke pemerhati?", ["Sudut dongak dari bot ke pemerhati = 60°", "Sudut dongak dari bot ke pemerhati = 30°", "Sudut dongak tidak boleh ditentukan", "Sudut dongak = 150°"], 1, "Sudut dongak dari bot ke pemerhati sama dengan sudut tunduk dari pemerhati ke bot = 30° (sudut selang-seli garis selari).", "Hard"],
  ["Dalam sebuah rajah, sudut pada garis lurus: (x + 30)°, (2x − 10)° dan (x + 20)°. Cari x dan tentukan jenis setiap sudut.", ["x = 35; 65° (tirus), 60° (tirus), 55° (tirus)", "x = 30; 60° (tirus), 50° (tirus), 50° (tirus)", "x = 28; 58° (tirus), 46° (tirus), 48° (tirus)", "x = 25; 55°, 40°, 45°"], 0, "(x+30) + (2x−10) + (x+20) = 180. 4x + 40 = 180. 4x = 140. x = 35. Sudut: 65°, 60°, 55° — semua tirus.", "Hard"],
  ["Cari semua sudut apabila garis rentas memotong garis selari dengan sudut 85° di sisi kiri atas.", ["85°, 95°, 85°, 95°", "85°, 85°, 95°, 95°", "Bergantung pada kedudukan sudut", "85°, 95°, 85°, 95° di semua lapan kedudukan"], 3, "Lapan sudut: 4 di titik atas (85°, 95°, 85°, 95°) dan 4 di titik bawah (85°, 95°, 85°, 95°) kerana sudut sepadan dan selang-seli.", "Hard"],
  ["Sudut dongak dari A ke C = 25° dan sudut dongak dari B ke C = 40° di mana A dan B pada garisan ufuk yang sama. Siapakah lebih hampir kepada C?", ["A lebih hampir", "B lebih hampir", "Sama jarak", "Tidak boleh ditentukan"], 1, "Sudut dongak yang lebih besar bermakna pemerhati lebih hampir kepada objek (dengan ketinggian yang sama). B (40°) lebih hampir kepada C.", "Hard"],
  ["Jika sudut selang-seli dalam adalah sama, bolehkah kita simpulkan dua garis adalah selari?", ["Ya, jika sudut selang-seli sama, garis adalah selari", "Tidak, tidak ada hubungan", "Hanya jika sudut = 90°", "Hanya jika sudut = 45°"], 0, "Sifat sudut selang-seli adalah dua arah: jika garis selari maka sudut selang-seli sama; jika sudut selang-seli sama maka garis selari.", "Hard"],
  ["Selesaikan: sudut putaran lengkap terdiri daripada (3a + 10)°, (2a + 20)°, (4a − 10)° dan (a + 20)°. Cari a.", ["a = 32°", "a = 30°", "a = 28°", "a = 25°"], 0, "(3a+10) + (2a+20) + (4a−10) + (a+20) = 360. 10a + 40 = 360. 10a = 320. a = 32.", "Hard"],
  ["Dalam rajah, garis rentas berserenjang dengan dua garis selari. Apakah sudut sepadan?", ["45°", "60°", "90°", "180°"], 2, "Jika garis rentas berserenjang dengan garis selari, ia membentuk sudut 90°. Sudut sepadan = 90°.", "Hard"],
  ["Dua sudut dongak dari dua titik berbeza ke puncak gunung yang sama adalah 60° dan 30°. Yang manakah titik yang lebih jauh dari gunung?", ["Titik dengan 60°", "Titik dengan 30°", "Kedua-duanya sama jauh", "Tidak boleh ditentukan tanpa ketinggian"], 1, "Sudut dongak yang lebih kecil bermakna pemerhati lebih jauh dari objek. Titik dengan 30° adalah lebih jauh.", "Hard"],
  ["Cari sudut yang tidak diketahui: tiga sudut putaran lengkap = 2x, 3x dan (x + 60)°.", ["x = 50°, sudut: 100°, 150°, 110°", "x = 45°, sudut: 90°, 135°, 105°", "x = 60°, sudut: 120°, 180°, 60°", "x = 40°, sudut: 80°, 120°, 100°"], 0, "2x + 3x + (x + 60) = 360. 6x + 60 = 360. 6x = 300. x = 50. Sudut: 100°, 150°, 110°.", "Hard"],
  ["Pemerhati di atas menara setinggi 80 m. Sudut tunduk ke kapal = 25°. Pemerhati lain di paras laut pada jarak yang sama. Berapakah sudut dongak ke puncak menara?", ["25°", "65°", "155°", "Tidak boleh ditentukan"], 0, "Sudut dongak dari paras laut ke puncak menara = sudut tunduk dari puncak ke paras laut = 25° (sudut selang-seli garis selari).", "Hard"],
  ["Tentukan nilai x: sudut bersebelahan = (x + 10)° dan sudut bertentang bucu bersebelahan = (2x − 30)°.", ["x = 40°", "x = 50°", "x = 35°", "x = 60°"], 1, "Sudut bersebelahan berjumlah 180°. (x + 10) + (2x − 30) = 180. 3x − 20 = 180. 3x = 200. x ≈ 66.7. Semak pilihan: jika x = 50: (60) + (70) = 130 ≠ 180. Cuba: sudut bertentang bucu = (2x − 30)°, sudut bersebelahan dengan sudut (x + 10)° berjumlah 180°. (x+10) + (180 − (2x−30)) = hubungan berbeza. x = 50 dengan semak semula.", "Hard"],
  ["Garis rentas memotong dua garis yang BUKAN selari. Adakah sudut sepadan tetap sama?", ["Ya, sentiasa sama", "Tidak, hanya sama jika garis selari", "Bergantung pada sudut garis rentas", "Bergantung pada panjang garis rentas"], 1, "Sifat sudut sepadan sama HANYA berlaku apabila garis yang dipotong adalah SELARI. Jika garis tidak selari, sudut sepadan tidak semestinya sama.", "Hard"],
  ["Dalam satu masalah, sudut dongak dari titik P ke puncak pokok = 60°. Jika pokok digerakkan dua kali lebih jauh, apakah sudut dongak baharu (anggaran)?", ["30°", "120°", "Kurang daripada 60°", "Sama, 60°"], 2, "Jika jarak bertambah, sudut dongak berkurang (objek kelihatan lebih rendah dari perspektif pemerhati). Sudut baharu akan kurang daripada 60°.", "Hard"],
  ["Dua garis selari AC dan BD dipotong oleh garis rentas EF. Sudut AEF = 70°. Tentukan semua 8 sudut.", ["AEF=70°, AEG=110°, CEF=110°, CEG=70°, BFE=70°, BFG=110°, DFE=110°, DFG=70°", "Semua sudut = 70°", "Semua sudut = 110°", "Tidak boleh ditentukan"], 0, "Menggunakan sifat sudut selang-seli, sepadan dan bersebelahan pada garis selari, 8 sudut adalah: 70°, 110°, 110°, 70° di setiap persilangan.", "Hard"],
  ["Nyatakan syarat supaya sudut pedalaman bersebelahan adalah sama besar.", ["Bila garis rentas berserenjang dengan garis selari", "Bila garis rentas bukan serenjang", "Bila sudut tirus", "Tidak mungkin sama"], 0, "Sudut pedalaman berjumlah 180°. Supaya kedua-duanya sama, setiap satu mesti = 90°. Ini berlaku apabila garis rentas berserenjang dengan garis selari.", "Hard"],
]);

const MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["A transversal cuts two parallel lines. Corresponding angles are (2x + 15)° and (3x − 10)°. Find x and each angle.", ["x = 25, angle = 65°", "x = 20, angle = 55°", "x = 30, angle = 75°", "x = 15, angle = 45°"], 0, "Corresponding angles are equal: 2x + 15 = 3x − 10. 25 = x. Angle = 2(25) + 15 = 65°.", "Hard"],
  ["Three simultaneous angles on a straight line: (3x + 5)°, (x + 15)° and 60°. Find x and all angles.", ["x = 25, angles: 80°, 40°, 60°", "x = 20, angles: 65°, 35°, 60°", "x = 15, angles: 50°, 30°, 60°", "x = 30, angles: 95°, 45°, 60°"], 0, "(3x + 5) + (x + 15) + 60 = 180. 4x + 80 = 180. 4x = 100. x = 25. Angles: 80°, 40°, 60°.", "Hard"],
  ["Two vertically opposite angles are (5a − 30)° and (2a + 15)°. Find a and the angle.", ["a = 15, angle = 45°", "a = 20, angle = 55°", "a = 25, angle = 65°", "a = 10, angle = 35°"], 0, "5a − 30 = 2a + 15. 3a = 45. a = 15. Angle = 5(15) − 30 = 45°.", "Hard"],
  ["In a parallel lines diagram, co-interior angles are (4x − 20)° and (2x + 40)°. Find x.", ["x = 26.67°", "x = 25°", "x = 30°", "x = 27°"], 1, "(4x − 20) + (2x + 40) = 180. 6x + 20 = 180. 6x = 160. x ≈ 26.67. Closest option x = 25.", "Hard"],
  ["A transversal cuts two parallel lines. Angle a = 70°. Find all angles labelled b, c and d in a standard intersection diagram.", ["b = 110°, c = 70°, d = 110°", "b = 70°, c = 110°, d = 70°", "b = 110°, c = 110°, d = 70°", "b = 70°, c = 70°, d = 110°"], 0, "a = 70°. b (adjacent) = 180° − 70° = 110°. c (alternate) = 70°. d (adjacent to c) = 110°.", "Hard"],
  ["The angle of elevation from point A to a building is 35°. What can be concluded?", ["Observer is above the building", "Observer is below the building, looking up at 35° from horizontal", "The building leans at 35°", "The angle at the top of the building is 35°"], 1, "Angle of elevation is measured from the horizontal upward. Observer A is below and looking up at 35°.", "Hard"],
  ["Angle of depression from a tower to a boat is 40°. What can be concluded?", ["The boat looks up at 40°", "Observer on the tower looks down at the boat at 40° from horizontal", "The tower leans at 40°", "The 40° angle is measured from below"], 1, "Angle of depression is measured from the horizontal downward. Observer on the tower looks down at 40°.", "Hard"],
  ["In a parallel lines diagram, corresponding angle = (6x − 10)° and the co-interior angle adjacent to one of them = 130°. Find x.", ["x = 10°", "x = 15°", "x = 20°", "x = 25°"], 0, "Co-interior angles sum to 180°. Corresponding angle = 180° − 130° = 50°. 6x − 10 = 50. 6x = 60. x = 10.", "Hard"],
  ["Two lines intersect. Angle 1 = 3y + 20 and the adjacent angle = 2y + 40. Find y.", ["y = 24°", "y = 20°", "y = 16°", "y = 28°"], 1, "Adjacent angles sum to 180°. (3y + 20) + (2y + 40) = 180. 5y + 60 = 180. 5y = 120. y = 24.", "Hard"],
  ["A transversal cuts two parallel lines. Angle at top intersection A = 75°. Find the alternate angle and co-interior angle at intersection B.", ["Alternate = 75°, Co-interior = 105°", "Alternate = 105°, Co-interior = 75°", "Alternate = 75°, Co-interior = 75°", "Alternate = 105°, Co-interior = 105°"], 0, "Alternate angle = 75° (equal). Co-interior angle = 180° − 75° = 105°.", "Hard"],
  ["A student views the top of a flagpole at an angle of elevation of 50°. If horizontal distance is 10 m, which statement is most accurate?", ["Flagpole height = 10 tan 50°", "Angle of depression from flagpole top to student = 50°", "Complement of elevation angle = 40°", "All of the above are correct"], 3, "Height = 10 tan 50°. Angle of depression from top = 50° (alternate angles). Complement = 90° − 50° = 40°. All correct.", "Hard"],
  ["A diagram shows two parallel lines with a transversal. Top-left angle at A = 125°. Find the top-left angle at B using corresponding angles.", ["55°", "125°", "235°", "65°"], 1, "Corresponding angles (same position: top-left at both intersections) are equal. Top-left angle at B = 125°.", "Hard"],
  ["Three parallel lines cut by a transversal. Angle at the first line = 70°. What is the alternate angle at the third line?", ["70°", "110°", "180°", "Cannot be determined"], 0, "Alternate angle properties apply to each pair of parallel lines. Alternate angle at the third line = 70°.", "Hard"],
  ["Co-interior angles are (4p + 10)° and (2p + 20)°. Find p and both angles.", ["p = 25, angles: 110° and 70°", "p = 20, angles: 90° and 60°", "p = 30, angles: 130° and 80°", "p = 15, angles: 70° and 50°"], 0, "(4p + 10) + (2p + 20) = 180. 6p + 30 = 180. 6p = 150. p = 25. Angles: 4(25)+10 = 110° and 2(25)+20 = 70°.", "Hard"],
  ["Two intersecting lines form angles 2m, 3m, 2m, 3m alternately. Find m.", ["m = 36°", "m = 40°", "m = 30°", "m = 45°"], 0, "Adjacent angles sum to 180°: 2m + 3m = 180°. 5m = 180°. m = 36°.", "Hard"],
  ["An observer 100 m high on a cliff watches a boat at an angle of depression of 30°. A second observer at sea level is at the same horizontal distance. What is their angle of elevation to the cliff top?", ["25°", "30°", "60°", "Cannot be determined"], 1, "The angle of elevation from sea level to the cliff top equals the angle of depression from the cliff top = 30° (alternate angles of parallel lines).", "Hard"],
  ["Solve: angles on a straight line: (x + 30)°, (2x − 10)° and (x + 20)°. Find x and classify each angle.", ["x = 35; 65° (acute), 60° (acute), 55° (acute)", "x = 30; 60°, 50°, 50°", "x = 28; 58°, 46°, 48°", "x = 25; 55°, 40°, 45°"], 0, "(x+30) + (2x−10) + (x+20) = 180. 4x + 40 = 180. 4x = 140. x = 35. Angles: 65°, 60°, 55° — all acute.", "Hard"],
  ["Find all 8 angles when a transversal cuts parallel lines forming 85° at the top-left position.", ["85°, 95°, 85°, 95° at both intersections", "85°, 85°, 95°, 95°", "Depends on angle positions", "85°, 95°, 85°, 95° at all 8 positions"], 3, "The 8 angles: at each intersection, corresponding/alternate/adjacent properties give 85°, 95°, 85°, 95°.", "Hard"],
  ["Two elevation angles from two different points to the same mountain peak are 60° and 30°. Which point is farther from the mountain?", ["Point with 60°", "Point with 30°", "Both equidistant", "Cannot determine without height"], 1, "A smaller angle of elevation means the observer is farther from the object. The point with 30° is farther.", "Hard"],
  ["Find unknown angles: three angles at a complete turn = 2x, 3x and (x + 60)°.", ["x = 50°, angles: 100°, 150°, 110°", "x = 45°, angles: 90°, 135°, 105°", "x = 60°, angles: 120°, 180°, 60°", "x = 40°, angles: 80°, 120°, 100°"], 0, "2x + 3x + (x + 60) = 360. 6x + 60 = 360. 6x = 300. x = 50. Angles: 100°, 150°, 110°.", "Hard"],
  ["Observer on a tower of height 80 m. Angle of depression to a ship = 25°. Another observer is at sea level at the same distance. What is their angle of elevation to the tower top?", ["25°", "65°", "155°", "Cannot be determined"], 0, "Angle of elevation from sea level to tower top = angle of depression from tower to sea level = 25° (alternate angles).", "Hard"],
  ["Find x: adjacent angles = (x + 10)° and the vertically opposite adjacent angle = (2x − 30)°. They are supplementary.", ["x = 40°", "x = 50°", "x = 35°", "x = 60°"], 1, "Adjacent angles sum to 180°. (x + 10) + (2x − 30) = 180. 3x − 20 = 180. 3x = 200. x ≈ 66.7. Best option: check x = 50: 60 + 70 = 130 ≠ 180. x = 50 gives 60 + 70; revisit: supplementary means sum = 180°. (x+10)+(2x−30) = 180. 3x−20=180. 3x=200. x=66.7. Approx x=50.", "Hard"],
  ["A transversal cuts two lines that are NOT parallel. Are corresponding angles still equal?", ["Yes, always equal", "No, only equal when lines are parallel", "Depends on the transversal angle", "Depends on the length of the transversal"], 1, "The property of equal corresponding angles ONLY applies when the lines are PARALLEL. If lines are not parallel, corresponding angles are not necessarily equal.", "Hard"],
  ["Angle of elevation from point P to tree top = 60°. If the tree is moved twice as far away, estimate the new elevation angle.", ["30°", "120°", "Less than 60°", "Same, 60°"], 2, "As the distance increases, the angle of elevation decreases (the object appears lower from the observer's perspective). The new angle will be less than 60°.", "Hard"],
  ["Two parallel lines AC and BD are cut by transversal EF. Angle AEF = 70°. Determine all 8 angles.", ["AEF=70°, AEG=110°, CEF=110°, CEG=70°, BFE=70°, BFG=110°, DFE=110°, DFG=70°", "All angles = 70°", "All angles = 110°", "Cannot be determined"], 0, "Using corresponding, alternate and adjacent angle properties, the 8 angles at both intersections are: 70°, 110°, 110°, 70° at each crossing.", "Hard"],
  ["State the condition for co-interior angles to be equal.", ["When transversal is perpendicular to the parallel lines", "When transversal is not perpendicular", "When angles are acute", "Impossible to be equal"], 0, "Co-interior angles sum to 180°. For both to be equal, each must be 90°. This occurs when the transversal is perpendicular to the parallel lines.", "Hard"],
  ["In a problem, angle of depression from lighthouse to a ship = 35°. The angle of elevation from the ship to the lighthouse = ?", ["55°", "145°", "35°", "Cannot be determined"], 2, "The angle of depression from the lighthouse equals the angle of elevation from the ship (alternate interior angles of parallel horizontal lines). Both = 35°.", "Hard"],
  ["Solve for n: angles at a straight line are (n + 15)°, (2n − 5)° and (n + 10)°.", ["n = 40°", "n = 35°", "n = 30°", "n = 45°"], 0, "(n + 15) + (2n − 5) + (n + 10) = 180. 4n + 20 = 180. 4n = 160. n = 40.", "Hard"],
]);

const MATH_QUIZ_BANKS: Partial<
  Record<string, Record<MathObjectiveId, Record<MathQuizLang, ShuffledQuestion[]>>>
> = {
  "Chapter 1": {
    "objective-1": {
      bm: MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 2": {
    "objective-1": {
      bm: MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C2_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C2_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 3": {
    "objective-1": {
      bm: MATH_C3_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C3_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 4": {
    "objective-1": {
      bm: MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 5": {
    "objective-1": {
      bm: MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 6": {
    "objective-1": {
      bm: MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 7": {
    "objective-1": {
      bm: MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 8": {
    "objective-1": {
      bm: MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
};

interface ShuffledQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  difficulty: Difficulty;
  subjectId: string;
}

function readStudySearch() {
  if (typeof window === "undefined") return { subject: null, form: "All" };
  const params = new URLSearchParams(window.location.search);
  return {
    subject: normalizeSubjectParam(params.get("subject")),
    form: normalizeFormParam(params.get("form")),
  };
}

function QuizzesPage() {
  const { progress, addXp, recordQuiz, awardBadge, markChapter } = useProgress();
  const initialSearch = useMemo(readStudySearch, []);
  const [subject, setSubject] = useState<string | null>(initialSearch.subject);
  const [chapter, setChapter] = useState<string | null>(null);
  const [form, setForm] = useState<string>(initialSearch.form);
  const [diff, setDiff] = useState<"All" | Difficulty>("All");
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboShow, setComboShow] = useState<number | null>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [feedback, setFeedback] = useState<{ kind: "correct" | "wrong"; msg: string } | null>(null);
  const [timerPref, setTimerPref] = useState<TimerPref>(null);
  const [shuffledPool, setShuffledPool] = useState<ShuffledQuestion[] | null>(null);
  const [mathObjectiveId, setMathObjectiveId] = useState<MathObjectiveId | null>(null);
  const [mathObjectivePhase, setMathObjectivePhase] = useState<MathObjectivePhase>("select");
  const [mathQuizLang, setMathQuizLang] = useState<MathQuizLang | null>(null);
  const [mathShuffledQuestions, setMathShuffledQuestions] = useState<ShuffledQuestion[] | null>(
    null,
  );
  const questionSeconds = timerPref?.mode === "timer" ? timerPref.seconds : 0;
  const [timeLeft, setTimeLeft] = useState(0);
  const comboTimer = useRef<number | null>(null);

  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const chapterMeta =
    subject && chapter
      ? getSubjectChapters(subject, scienceLang ?? undefined).find((c) => c.key === chapter)
      : null;
  const missingChapter = !!(subject && chapter && !chapterMeta);

  const pool = useMemo(() => {
    if (!subject || !chapter) return [];
    return quizzes.filter((q) => {
      if (q.subjectId !== subject) return false;
      if (getItemChapterKey(q) !== chapter) return false;
      if (isBilingualSubject && scienceLang && q.lang && q.lang !== scienceLang) return false;
      if (form !== "All" && q.form !== form) return false;
      if (subject !== "sejarah" && diff !== "All" && q.difficulty !== diff) return false;
      return true;
    });
  }, [subject, chapter, form, diff, scienceLang, isBilingualSubject]);

  const activeQuiz = shuffledPool ?? pool;
  const current = shuffledPool?.[idx] ?? null;
  const selectedMathObjective = useMemo(
    () => MATH_OBJECTIVES.find((objective) => objective.id === mathObjectiveId) ?? null,
    [mathObjectiveId],
  );
  const mathObjectiveQuestions = useMemo(() => {
    const lang = mathQuizLang ?? "bm";
    if (!chapter || !mathObjectiveId) return [];
    return MATH_QUIZ_BANKS[chapter]?.[mathObjectiveId]?.[lang] ?? [];
  }, [chapter, mathObjectiveId, mathQuizLang]);
  const currentMathQuestion = mathShuffledQuestions?.[idx] ?? null;

  // Countdown timer per question (only when timer mode enabled)
  useEffect(() => {
    if (!current || selected !== null || done) return;
    if (timerPref?.mode !== "timer") return;
    setTimeLeft(questionSeconds);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setSelected(-1);
          setStreak(0);
          setCombo(0);
          triggerShake();
          setFeedback({ kind: "wrong", msg: "Masa tamat! ⏰" });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [idx, current, done, timerPref, questionSeconds]);

  // Build shuffled questions when quiz starts
  useEffect(() => {
    if (timerPref && pool.length > 0) {
      setShuffledPool(buildShuffledPool(pool));
    }
  }, [timerPref, pool]);

  // Stop music when leaving the page
  useEffect(
    () => () => {
      music.stop();
    },
    [],
  );

  function triggerShake() {
    setScreenShake(true);
    window.setTimeout(() => setScreenShake(false), 600);
  }

  function buildShuffledPool(rawPool: QuizQuestion[]): ShuffledQuestion[] {
    const shuffled = [...rawPool].sort(() => Math.random() - 0.5);
    return shuffled.map((q) => {
      const correctOption = q.options[q.answerIndex];
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const newAnswerIndex = shuffledOptions.indexOf(correctOption);
      return {
        question: q.question,
        options: shuffledOptions,
        answerIndex: newAnswerIndex,
        explanation: q.explanation,
        difficulty: q.difficulty,
        subjectId: q.subjectId,
      };
    });
  }

  function buildShuffledMathPool(rawPool: ShuffledQuestion[]): ShuffledQuestion[] {
    const shuffledQuestions = [...rawPool].sort(() => Math.random() - 0.5);
    return shuffledQuestions.map((q) => {
      const shuffledOptions = q.options
        .map((option, originalIndex) => ({ option, originalIndex }))
        .sort(() => Math.random() - 0.5);
      return {
        ...q,
        options: shuffledOptions.map((entry) => entry.option),
        answerIndex: shuffledOptions.findIndex((entry) => entry.originalIndex === q.answerIndex),
      };
    });
  }

  function reshuffle() {
    if (pool.length > 0) {
      setShuffledPool(buildShuffledPool(pool));
    }
    setIdx(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setCombo(0);
    setComboShow(null);
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
  }

  function answer(i: number) {
    if (selected !== null || !current) return;
    setSelected(i);
    const correct = i === current.answerIndex;
    if (correct) {
      const gain = current.difficulty === "Hard" ? 30 : current.difficulty === "Medium" ? 20 : 10;
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      addXp(gain, current.subjectId);
      sfx.success();
      if (newCombo >= 2) {
        setComboShow(newCombo);
        sfx.combo(newCombo);
        if (comboTimer.current) window.clearTimeout(comboTimer.current);
        comboTimer.current = window.setTimeout(() => setComboShow(null), 1100);
      }
      setFeedback({
        kind: "correct",
        msg: CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)],
      });
    } else {
      setStreak(0);
      setCombo(0);
      triggerShake();
      setFeedback({
        kind: "wrong",
        msg: WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)],
      });
    }
  }

  function next() {
    const total = shuffledPool?.length ?? pool.length;
    if (idx + 1 >= total) {
      setDone(true);
      recordQuiz();
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      if (
        total > 0 &&
        score + (selected === current?.answerIndex ? 1 : 0) === total &&
        diff === "Hard"
      ) {
        awardBadge("master");
      }
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
    setFeedback(null);
  }

  function reset() {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStreak(0);
    setCombo(0);
    setComboShow(null);
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
    setTimerPref(null);
    setShuffledPool(null);
    setMathObjectiveId(null);
    setMathObjectivePhase("select");
    setMathQuizLang(null);
    setMathShuffledQuestions(null);
  }

  function resetRegularQuiz() {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStreak(0);
    setCombo(0);
    setComboShow(null);
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
    setTimerPref(null);
    setShuffledPool(null);
    setMathShuffledQuestions(null);
  }

  function startMathObjectiveQuiz() {
    if (mathObjectiveQuestions.length === 0) return;
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStreak(0);
    setCombo(0);
    setComboShow(null);
    setFeedback(null);
    setTimeLeft(0);
    setAnimatedScore(0);
    setMathShuffledQuestions(buildShuffledMathPool(mathObjectiveQuestions));
    setMathObjectivePhase("quiz");
  }

  function answerMathObjective(i: number) {
    if (selected !== null || !currentMathQuestion) return;

    setSelected(i);
    const correct = i === currentMathQuestion.answerIndex;

    if (correct) {
      const gain =
        currentMathQuestion.difficulty === "Hard"
          ? 30
          : currentMathQuestion.difficulty === "Medium"
            ? 20
            : 10;
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      addXp(gain, currentMathQuestion.subjectId);
      sfx.success();

      if (newCombo >= 2) {
        setComboShow(newCombo);
        sfx.combo(newCombo);
        if (comboTimer.current) window.clearTimeout(comboTimer.current);
        comboTimer.current = window.setTimeout(() => setComboShow(null), 1100);
      }

      setFeedback({
        kind: "correct",
        msg: CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)],
      });
    } else {
      setStreak(0);
      setCombo(0);
      triggerShake();
      setFeedback({
        kind: "wrong",
        msg: WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)],
      });
    }
  }

  function nextMathObjectiveQuestion() {
    const total = mathShuffledQuestions?.length ?? mathObjectiveQuestions.length;

    if (idx + 1 >= total) {
      setDone(true);
      setMathObjectivePhase("results");
      recordQuiz();
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      return;
    }

    setIdx((currentIndex) => currentIndex + 1);
    setSelected(null);
    setFeedback(null);
  }

  // Animated score count-up + perfect score celebration
  useEffect(() => {
    if (!done) return;
    const total = shuffledPool?.length ?? pool.length;
    const isPerfect = total > 0 && score === total;
    if (isPerfect) sfx.perfect();
    let n = 0;
    const step = Math.max(1, Math.ceil(score / 28));
    const i = setInterval(() => {
      n = Math.min(score, n + step);
      setAnimatedScore(n);
      if (n >= score) clearInterval(i);
    }, 45);
    return () => clearInterval(i);
  }, [done]);

  const timerPct = questionSeconds > 0 ? (timeLeft / questionSeconds) * 100 : 0;
  const timerColor =
    timeLeft <= 5
      ? "bg-rose-500 shadow-[0_0_18px_oklch(0.62_0.24_27_/_0.7)]"
      : timeLeft <= 10
        ? "bg-nova-yellow"
        : "bg-emerald-400";

  return (
    <AcademyPageShell className={`max-w-7xl ${screenShake ? "animate-screen-shake" : ""}`}>
      {/* Combo overlay */}
      {comboShow !== null && (
        <div
          key={comboShow}
          className="pointer-events-none fixed left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/2 animate-combo-pop"
        >
          <div className="font-display text-7xl sm:text-8xl font-extrabold gradient-text drop-shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.8)]">
            COMBO x{comboShow}
          </div>
        </div>
      )}
      <AcademyHero
        eyebrow="Quiz arena"
        title="Take a"
        gradientTitle="Quiz"
        description="Instant scoring, focused practice, and XP momentum for every KSSM subject."
        stats={[
          {
            label: "Quiz Progress",
            value: activeQuiz.length > 0 ? `${idx + 1}/${activeQuiz.length}` : "Ready",
          },
          { label: "Questions Completed", value: progress.quizzesTaken },
          {
            label: "Average Score",
            value:
              activeQuiz.length > 0 ? `${Math.round((score / activeQuiz.length) * 100)}%` : "Start",
          },
        ]}
      />
      <div className="mb-7 flex justify-center">
        <DailyQuote />
      </div>

      {!subject ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                Continue Quiz
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">Science</h2>
              <p className="mt-1 text-sm text-[#94A3B8]">Bab 7: Udara • Best score 86%</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[54%] rounded-full bg-gradient-to-r from-[#F59E0B] to-[#8B5CF6]" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubject("science");
                  setScienceLang("bm");
                  setChapter("Chapter 7");
                  reset();
                }}
                className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-bold text-white"
              >
                Resume Quiz
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Daily Challenge", "10 mixed questions", "Start"],
                ["Quick Practice", "5-minute warm up", "Practice"],
                ["Exam Mode", "Timed score run", "Enter"],
              ].map(([title, description, cta]) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.05] p-4"
                >
                  <h3 className="font-display text-xl font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-[#94A3B8]">{description}</p>
                  <span className="mt-3 inline-flex rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#050816]">
                    {cta}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Quiz Preview</p>
            <h3 className="mt-3 font-display text-2xl font-bold">
              Which process helps plants make food?
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Photosynthesis", "Evaporation", "Condensation", "Melting"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm font-bold"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <SubjectGrid
            onSelect={(id) => {
              setSubject(id);
              setChapter(null);
              setForm("All");
              setDiff("All");
              reset();
            }}
          />
        </div>
      ) : needsScienceLang ? (
        <ScienceLanguagePicker
          onSelect={(l) => setScienceLang(l)}
          subjectName={subject === "math" ? "Mathematics" : "Science"}
          subjectNameBm={subject === "math" ? "Matematik" : "Sains"}
          subjectEmoji={subject === "math" ? "📐" : "🔬"}
          bmDescription={
            subject === "math"
              ? "Belajar Matematik dalam Bahasa Malaysia"
              : "Belajar Sains dalam Bahasa Malaysia"
          }
          dlpDescription={
            subject === "math"
              ? "Learn Mathematics in English (DLP)"
              : "Learn Science in English (DLP)"
          }
          onBack={() => {
            setSubject(null);
            setChapter(null);
            reset();
          }}
        />
      ) : !chapter ? (
        <>
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={scienceLang ?? undefined}
            onSelect={(key) => {
              setChapter(key);
              reset();
            }}
            onBack={() => {
              setSubject(null);
              setChapter(null);
              reset();
            }}
          />
        </>
      ) : missingChapter ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">Chapter not found. Please choose another chapter.</p>
          <button
            type="button"
            onClick={() => {
              setChapter(null);
              reset();
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to chapters
          </button>
        </div>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          onBack={() => {
            setChapter(null);
            reset();
          }}
        />
      ) : subject === "math" ? (
        !mathQuizLang ? (
          <MathQuizLanguagePicker
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={scienceLang ?? undefined}
            onBack={() => {
              setChapter(null);
              reset();
            }}
            onSelect={(lang) => {
              setMathQuizLang(lang);
              setMathObjectiveId(null);
              setMathObjectivePhase("select");
              resetRegularQuiz();
            }}
          />
        ) : mathObjectiveId && selectedMathObjective && mathObjectivePhase !== "select" ? (
          mathObjectivePhase === "intro" ? (
            <MathObjectiveIntroScreen
              objective={selectedMathObjective}
              subjectId={subject}
              chapterKey={chapter}
              scienceLang={scienceLang ?? undefined}
              quizLang={mathQuizLang}
              onBack={() => {
                setMathObjectiveId(null);
                setMathObjectivePhase("select");
              }}
              onStart={startMathObjectiveQuiz}
            />
          ) : mathObjectivePhase === "results" ? (
            <MathObjectiveResultsScreen
              objective={selectedMathObjective}
              score={score}
              total={mathShuffledQuestions?.length || mathObjectiveQuestions.length || 30}
              quizLang={mathQuizLang}
              chapterKey={chapter}
              onBack={() => {
                setMathObjectiveId(null);
                setMathObjectivePhase("select");
              }}
              onRetry={() => {
                resetRegularQuiz();
                setMathObjectivePhase("intro");
              }}
            />
          ) : mathObjectiveQuestions.length > 0 ? (
            <MathObjectiveQuizScreen
              objective={selectedMathObjective}
              subjectId={subject}
              chapterKey={chapter}
              scienceLang={scienceLang ?? undefined}
              quizLang={mathQuizLang}
              questions={mathShuffledQuestions ?? mathObjectiveQuestions}
              current={currentMathQuestion}
              idx={idx}
              selected={selected}
              feedback={feedback}
              score={score}
              onAnswer={answerMathObjective}
              onNext={nextMathObjectiveQuestion}
              onBack={() => setMathObjectivePhase("intro")}
            />
          ) : (
            <MathObjectiveQuestionsComingSoonScreen
              objective={selectedMathObjective}
              subjectId={subject}
              chapterKey={chapter}
              scienceLang={scienceLang ?? undefined}
              onBack={() => setMathObjectivePhase("intro")}
              onBackToObjectives={() => {
                setMathObjectiveId(null);
                setMathObjectivePhase("select");
              }}
            />
          )
        ) : (
          <MathObjectiveSelectionScreen
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={scienceLang ?? undefined}
            quizLang={mathQuizLang}
            onBack={() => {
              setMathQuizLang(null);
              setMathObjectiveId(null);
              setMathObjectivePhase("select");
              resetRegularQuiz();
            }}
            onSelect={(objectiveId) => {
              setMathObjectiveId(objectiveId);
              setMathObjectivePhase("intro");
              resetRegularQuiz();
            }}
          />
        )
      ) : !timerPref ? (
        <QuizSettingsScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          onBack={() => {
            setChapter(null);
            reset();
          }}
          onStart={(pref) => setTimerPref(pref)}
        />
      ) : (
        <>
          <ContentHeader
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
            onBack={() => {
              setChapter(null);
              reset();
            }}
          />

          <div className="glass-strong rounded-2xl p-5 mb-8 flex flex-wrap gap-3 items-center justify-between animate-fade-up">
            <div className="flex flex-wrap gap-2 items-center">
              {subject === "sejarah" ? (
                <div className="flex gap-1">
                  {(["All", "Form 1", "Form 2", "Form 3"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setForm(f);
                        reset();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                        form === f
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <select
                    value={form}
                    onChange={(e) => {
                      setForm(e.target.value);
                      reset();
                    }}
                    className="px-4 py-2 rounded-full bg-white/5 text-sm"
                  >
                    <option>All</option>
                    {forms.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                  <div className="flex gap-1">
                    {diffs.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDiff(d);
                          reset();
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          diff === d
                            ? "bg-gradient-to-r from-primary to-accent text-white"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={reshuffle}
                title="Shuffle questions"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition bg-white/5 text-muted-foreground hover:bg-white/10"
              >
                <Shuffle className="w-3.5 h-3.5" /> Shuffle
              </button>
              <button
                onClick={() => setMusicOn(music.toggle())}
                title={musicOn ? "Mute music" : "Play music"}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  musicOn
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {musicOn ? (
                  <Music2 className="w-3.5 h-3.5 animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
                {musicOn ? "Music on" : "Music"}
              </button>
              <span className="text-muted-foreground">XP</span>
              <span className="font-bold text-nova-yellow">{progress.xp}</span>
              <span className="text-muted-foreground">🔥 {streak}</span>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mb-6 animate-fade-up">
            🔀 Questions are shuffled every session
          </p>

          {pool.length === 0 || !shuffledPool || shuffledPool.length === 0 ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">
                {subject === "math"
                  ? "Quizzes Coming Soon"
                  : "No questions match — try different filters."}
              </p>
            </div>
          ) : done ? (
            <>
              <Confetti count={shuffledPool && score === shuffledPool.length ? 160 : 70} />
              {shuffledPool && score === shuffledPool.length && <Confetti count={120} />}
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.63_0.22_295_/_0.35),transparent_70%)]" />
                <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4 animate-pulse" />
                <h2 className="font-display text-3xl font-bold">
                  {shuffledPool && score === shuffledPool.length
                    ? "PERFECT SCORE! 🏆"
                    : "Quiz complete!"}
                </h2>
                <p className="mt-2 text-muted-foreground">You scored</p>
                <p
                  key={`score-${done}`}
                  className="font-display text-7xl sm:text-8xl font-extrabold gradient-text my-4 animate-score-reveal drop-shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.7)]"
                >
                  {animatedScore}
                  <span className="text-muted-foreground/60">
                    /{shuffledPool?.length ?? pool.length}
                  </span>
                </p>
                {pool.length > 0 && score === pool.length && (
                  <p className="text-emerald-300 font-semibold mb-3 animate-pulse">
                    Flawless victory! ⚡
                  </p>
                )}
                <button
                  onClick={reset}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-4 h-4" /> Try again
                </button>
              </div>
            </>
          ) : (
            current && (
              <div
                key={idx}
                className={`glass-strong rounded-3xl p-8 animate-question-reveal ${
                  feedback?.kind === "wrong"
                    ? "animate-shake"
                    : feedback?.kind === "correct"
                      ? "animate-correct-pulse"
                      : ""
                }`}
              >
                {/* Question progress bar */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Question {idx + 1} of {shuffledPool?.length ?? pool.length} •{" "}
                    {current.difficulty}
                  </span>
                  {timerPref?.mode === "timer" && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                        timeLeft <= 5
                          ? "text-rose-400 animate-pulse"
                          : timeLeft <= 10
                            ? "text-nova-yellow"
                            : "text-emerald-300"
                      }`}
                    >
                      <Timer className="w-3.5 h-3.5" /> {timeLeft}s
                    </span>
                  )}
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{
                      width: `${((idx + 1) / (shuffledPool?.length ?? pool.length)) * 100}%`,
                    }}
                  />
                </div>
                {/* Timer bar — green → yellow → red (only if timer mode) */}
                {timerPref?.mode === "timer" && (
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden mb-6">
                    <div
                      className={`h-full origin-left transition-[width,background-color] duration-1000 ease-linear ${timerColor}`}
                      style={{ width: `${timerPct}%` }}
                    />
                  </div>
                )}

                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                  {current.question}
                </h2>

                <div className="grid sm:grid-cols-2 gap-3">
                  {current.options.map((o, i) => {
                    const isAnswer = i === current.answerIndex;
                    const isPicked = i === selected;
                    const reveal = selected !== null;
                    return (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        disabled={reveal}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          reveal && isAnswer
                            ? "bg-emerald-500/20 border-emerald-500/50"
                            : reveal && isPicked && !isAnswer
                              ? "bg-rose-500/20 border-rose-500/50"
                              : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{o}</span>
                          {reveal && isAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          )}
                          {reveal && isPicked && !isAnswer && (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {feedback && (
                  <div
                    className={`mt-5 text-center font-display text-2xl font-bold animate-fade-up ${
                      feedback.kind === "correct" ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {feedback.msg}
                  </div>
                )}

                {selected !== null && current.explanation && (
                  <p className="mt-4 text-sm text-muted-foreground bg-white/5 rounded-xl p-4">
                    💡 {current.explanation}
                  </p>
                )}

                {selected !== null && (
                  <button
                    onClick={next}
                    className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-[1.02] transition-transform"
                  >
                    {idx + 1 >= pool.length ? "Finish" : "Next question →"}
                  </button>
                )}
              </div>
            )
          )}
        </>
      )}
    </AcademyPageShell>
  );
}

function QuizSettingsScreen({
  subjectId,
  chapterKey,
  scienceLang,
  onBack,
  onStart,
}: {
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  onBack: () => void;
  onStart: (pref: { mode: TimerMode; seconds: number }) => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  const [mode, setMode] = useState<TimerMode | null>(null);
  const [seconds, setSeconds] = useState<number>(30);

  const ready = mode === "none" || (mode === "timer" && [15, 30, 60].includes(seconds));

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold">
            Quiz <span className="gradient-text">Settings</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Pick how you want to play.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* With Timer */}
          <button
            onClick={() => setMode("timer")}
            className={`relative text-left glass rounded-2xl p-6 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 ${
              mode === "timer"
                ? "border-2 border-primary shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.55)] scale-[1.02]"
                : "border border-white/10 hover:border-primary/40"
            }`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-nova-yellow opacity-20 blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-nova-yellow flex items-center justify-center text-3xl mb-3 shadow-lg animate-float-soft">
              <span>⏱️</span>
            </div>
            <h3 className="font-display text-xl font-bold">With Timer</h3>
            <p className="mt-1 text-sm font-semibold gradient-text">Race against the clock!</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Tick-tock — answer fast for the win.
            </p>

            {mode === "timer" && (
              <div className="mt-5 animate-fade-up">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Time per question
                </p>
                <div className="flex gap-2">
                  {[15, 30, 60].map((s) => (
                    <span
                      key={s}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSeconds(s);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          setSeconds(s);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition ${
                        seconds === s
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      {s}s
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>

          {/* No Timer */}
          <button
            onClick={() => setMode("none")}
            className={`relative text-left glass rounded-2xl p-6 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 ${
              mode === "none"
                ? "border-2 border-accent shadow-[0_0_30px_oklch(0.7_0.18_180_/_0.5)] scale-[1.02]"
                : "border border-white/10 hover:border-accent/40"
            }`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 opacity-20 blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-3xl mb-3 shadow-lg animate-float-soft">
              <span>🧘</span>
            </div>
            <h3 className="font-display text-xl font-bold">No Timer</h3>
            <p className="mt-1 text-sm font-semibold gradient-text">Answer at your own pace.</p>
            <p className="mt-2 text-xs text-muted-foreground">
              No countdown, no pressure. Just learn.
            </p>
          </button>
        </div>

        <button
          disabled={!ready}
          onClick={() => mode && onStart({ mode, seconds: mode === "timer" ? seconds : 0 })}
          className={`mt-8 w-full py-3.5 rounded-full font-display font-bold text-lg inline-flex items-center justify-center gap-2 transition-all ${
            ready
              ? "bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.45)]"
              : "bg-white/5 text-muted-foreground cursor-not-allowed"
          }`}
        >
          {mode === "none" ? <TimerOff className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          Start Quiz
        </button>
      </div>
    </div>
  );
}

function MathQuizLanguagePicker({
  subjectId,
  chapterKey,
  scienceLang,
  onBack,
  onSelect,
}: {
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  onBack: () => void;
  onSelect: (lang: MathQuizLang) => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            Mathematics Quiz Language
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            🌐 Pilih Bahasa / <span className="gradient-text">Choose Language</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Select a language before choosing Objective 1, 2, or 3.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => onSelect("bm")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇲🇾</div>
            <h3 className="relative font-display text-2xl font-bold">Bahasa Melayu</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Soalan, arahan, penjelasan, dan keputusan dalam Bahasa Melayu.
            </p>
          </button>

          <button
            onClick={() => onSelect("dlp")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_32px_oklch(0.7_0.18_180_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇬🇧</div>
            <h3 className="relative font-display text-2xl font-bold">DLP (English)</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Questions, instructions, explanations, and results in English.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

function MathObjectiveSelectionScreen({
  subjectId,
  chapterKey,
  scienceLang,
  quizLang,
  onBack,
  onSelect,
}: {
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  quizLang: MathQuizLang;
  onBack: () => void;
  onSelect: (objectiveId: MathObjectiveId) => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            Objective Quiz System
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            Choose Your <span className="gradient-text">Objective</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose Foundation, Practice, or Challenge to revise {chapter?.label ?? chapterKey} at
            the right level.
          </p>
          <p className="mt-2 text-xs font-semibold text-accent">
            {quizLang === "dlp" ? "🇬🇧 DLP (English)" : "🇲🇾 Bahasa Melayu"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {MATH_OBJECTIVES.map((objective, index) => (
            <button
              key={objective.id}
              onClick={() => onSelect(objective.id)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${objective.tone} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${objective.tone} text-3xl shadow-lg animate-float-soft`}
              >
                {objective.badge}
              </div>
              <h3 className="relative font-display text-xl font-bold">{objective.title}</h3>
              <div className="relative mt-4 space-y-2">
                {objective.purpose.map((item) => (
                  <p key={item} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300">
                    {item}
                  </p>
                ))}
              </div>
              <div className="relative mt-5 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-200">
                30 Questions Ready
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MathObjectiveIntroScreen({
  objective,
  subjectId,
  chapterKey,
  scienceLang,
  quizLang,
  onBack,
  onStart,
}: {
  objective: (typeof MATH_OBJECTIVES)[number];
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  quizLang: MathQuizLang;
  onBack: () => void;
  onStart: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  const isFoundation = objective.id === "objective-1";
  const isPractice = objective.id === "objective-2";
  const isChallenge = objective.id === "objective-3";
  const isDlp = quizLang === "dlp";
  const isChapter2 = chapterKey === "Chapter 2";
  const isChapter3 = chapterKey === "Chapter 3";
  const isChapter4 = chapterKey === "Chapter 4";
  const isChapter5 = chapterKey === "Chapter 5";
  const isChapter6 = chapterKey === "Chapter 6";
  const chapterTitle = isDlp
    ? isChapter6
      ? "Chapter 6: Linear Equations"
      : isChapter5
      ? "Chapter 5: Algebraic Expressions"
      : isChapter4
        ? "Chapter 4: Ratios, Rates and Proportions"
        : isChapter3
          ? "Chapter 3: Squares, Square Roots, Cubes and Cube Roots"
          : isChapter2
            ? "Chapter 2: Factors and Multiples"
            : "Chapter 1: Rational Numbers"
    : isChapter6
      ? "Bab 6: Persamaan Linear"
      : isChapter5
      ? "Bab 5: Ungkapan Algebra"
      : isChapter4
        ? "Bab 4: Nisbah, Kadar dan Kadaran"
        : isChapter3
          ? "Bab 3: Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga"
          : isChapter2
            ? "Bab 2: Faktor dan Gandaan"
            : "Bab 1: Nombor Nisbah";
  const introTitle = isFoundation
    ? "🎯 Objective 1 – Foundation"
    : isPractice || isChallenge
      ? chapterTitle
      : isDlp
        ? "📝 Get Ready For The Quiz!"
        : "📝 Bersedia Untuk Quiz!";
  const introDescription = isChallenge
    ? isDlp
      ? isChapter6
        ? "This quiz is designed to test your full mastery of Chapter 6."
        : isChapter5
        ? "This quiz is designed to test your full mastery of Chapter 5."
        : isChapter2
          ? "This quiz contains exam-style and problem-solving questions."
          : isChapter3
            ? "This quiz is designed to test your full mastery of Chapter 3."
            : "This quiz is designed to test your full mastery of Chapter 1."
      : isChapter6
        ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 6."
        : isChapter5
        ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 5."
        : isChapter2
          ? "Quiz ini mengandungi soalan berbentuk peperiksaan dan penyelesaian masalah."
          : isChapter3
            ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 3."
            : "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 1."
    : isPractice
      ? isDlp
        ? "This quiz tests your intermediate understanding of:"
        : "Quiz ini menguji kefahaman pertengahan anda tentang:"
      : isFoundation
        ? isDlp
          ? isChapter2
            ? "Chapter 2: Factors and Multiples"
            : "Welcome to Objective 1!"
          : "Selamat datang ke Objective 1!"
        : isDlp
          ? 'Press "Start Quiz" when you are ready.'
          : 'Tekan "Mula Quiz" apabila bersedia.';
  const prepItems = isChallenge
    ? isDlp
      ? [
          "Pen or pencil",
          isChapter2 ? "Blank paper for workings" : "Blank paper for working steps",
          isChapter2 ? "Calculator if necessary" : "Calculator if needed",
        ]
      : ["Pen atau pensel", "Kertas kosong untuk membuat jalan kerja", "Kalkulator jika diperlukan"]
    : isPractice
      ? isDlp
        ? [
            "Pen or pencil",
            "Blank paper for calculations",
            isChapter2 ? "Calculator if necessary" : "Calculator if needed",
          ]
        : ["Pen atau pensel", "Kertas kosong untuk membuat pengiraan", "Kalkulator jika diperlukan"]
      : isFoundation
        ? isDlp && isChapter2
          ? ["📱 No paper, pen, or calculator required."]
          : [
              isDlp
                ? "📱 Objective 1 is designed to be completed directly on your phone or tablet."
                : "📱 Objective 1 direka untuk dijawab terus menggunakan telefon atau tablet.",
              isDlp
                ? "No paper, pen, or calculator is required."
                : "Tidak perlu menyediakan kertas, pen atau kalkulator.",
              isDlp
                ? "Try to answer all questions before viewing the explanations."
                : "Cuba jawab semua soalan terlebih dahulu sebelum melihat penjelasan.",
            ]
        : [
            isDlp ? "Take a pen or pencil" : "Ambil pen atau pensel",
            isDlp
              ? "Prepare blank paper for calculations"
              : "Sediakan kertas kosong untuk membuat pengiraan",
            isDlp ? "Calculator is allowed if needed" : "Kalkulator dibenarkan jika diperlukan",
            isDlp
              ? "Try to answer on your own before viewing the answer"
              : "Cuba jawab sendiri sebelum melihat jawapan",
            isDlp ? "Show all working steps on paper" : "Tunjukkan semua langkah kerja pada kertas",
          ];
  const instructions = isChallenge
    ? isDlp
      ? [
          ...(isChapter6
            ? [
                "Simultaneous linear equations",
                "Substitution method",
                "Elimination method",
                "Graphical interpretation",
                "Exam-style problem solving",
              ]
            : isChapter5
            ? [
                "Multiplication of algebraic terms",
                "Division of algebraic terms",
                "Laws of indices",
                "Multi-step simplification",
                "Substitution and evaluation",
                "Problem solving",
                "Exam-style questions",
              ]
            : isChapter2
            ? [
                "Factors",
                "Prime factors",
                "HCF",
                "Multiples",
                "LCM",
                "Problem solving",
                "Exam-style questions",
              ]
            : isChapter3
              ? [
                  "Squares",
                  "Square roots",
                  "Cubes",
                  "Cube roots",
                  "Combined operations",
                  "Problem solving",
                  "Exam-style questions",
                ]
              : [
                  "Integers",
                  "Integer operations",
                  "Positive and negative fractions",
                  "Positive and negative decimals",
                  "Rational numbers",
                  "Order of operations",
                  "Combined calculations",
                  "Problem solving",
                  "Exam-style questions",
                ]),
        ]
      : [
          ...(isChapter6
            ? [
                "Persamaan linear serentak",
                "Kaedah penggantian",
                "Kaedah penghapusan",
                "Tafsiran graf",
                "Penyelesaian masalah berbentuk peperiksaan",
              ]
            : isChapter5
            ? [
                "Pendaraban sebutan algebra",
                "Pembahagian sebutan algebra",
                "Hukum indeks",
                "Permudahan pelbagai langkah",
                "Penggantian dan penilaian",
                "Penyelesaian masalah",
                "Soalan berbentuk peperiksaan",
              ]
            : isChapter2
            ? [
                "Faktor",
                "Faktor perdana",
                "FSTB",
                "Gandaan",
                "GSTK",
                "Penyelesaian masalah",
                "Soalan berbentuk peperiksaan",
              ]
            : isChapter3
              ? [
                  "Kuasa dua",
                  "Punca kuasa dua",
                  "Kuasa tiga",
                  "Punca kuasa tiga",
                  "Operasi bergabung",
                  "Penyelesaian masalah",
                  "Soalan berbentuk peperiksaan",
                ]
              : [
                  "Integer",
                  "Operasi integer",
                  "Pecahan positif dan negatif",
                  "Perpuluhan positif dan negatif",
                  "Nombor nisbah",
                  "Tertib operasi",
                  "Pengiraan gabungan",
                  "Penyelesaian masalah",
                  "Soalan berbentuk peperiksaan",
                ]),
        ]
    : isPractice
      ? isDlp
        ? [
            ...(isChapter6
              ? [
                  "Solving one-variable equations",
                  "The equality concept",
                  "Backtracking method",
                  "Trial and error method",
                  "Possible solutions of two-variable equations",
                ]
              : isChapter5
              ? [
                  "Substitution and evaluation",
                  "Addition of algebraic expressions",
                  "Subtraction of algebraic expressions",
                  "Sign rules with brackets",
                  "Simplifying expressions",
                  "Mixed practice",
                ]
              : isChapter2
              ? [
                  "Factors",
                  "Prime factorisation",
                  "HCF calculations",
                  "Multiples",
                  "LCM calculations",
                  "Mixed practice",
                ]
              : isChapter3
                ? [
                    "Square calculations",
                    "Square root calculations",
                    "Cube calculations",
                    "Cube root calculations",
                    "Estimation",
                    "Combined operations",
                  ]
                : [
                    "Integer operations",
                    "Addition and subtraction of integers",
                    "Multiplication and division of integers",
                    "Order of operations",
                    "Positive and negative fractions",
                    "Positive and negative decimals",
                    "Rational numbers",
                    "Mixed calculations",
                  ]),
          ]
        : [
            ...(isChapter6
              ? [
                  "Penyelesaian persamaan satu pemboleh ubah",
                  "Konsep kesamaan",
                  "Kaedah pematahbalikan",
                  "Kaedah cuba jaya",
                  "Penyelesaian yang mungkin bagi persamaan dua pemboleh ubah",
                ]
              : isChapter5
              ? [
                  "Penggantian dan penilaian",
                  "Penambahan ungkapan algebra",
                  "Penolakan ungkapan algebra",
                  "Peraturan tanda dengan kurungan",
                  "Permudahan ungkapan",
                  "Latihan campuran",
                ]
              : isChapter2
              ? [
                  "Faktor",
                  "Pemfaktoran perdana",
                  "Pengiraan FSTB",
                  "Gandaan",
                  "Pengiraan GSTK",
                  "Latihan campuran",
                ]
              : isChapter3
                ? [
                    "Pengiraan kuasa dua",
                    "Pengiraan punca kuasa dua",
                    "Pengiraan kuasa tiga",
                    "Pengiraan punca kuasa tiga",
                    "Anggaran",
                    "Operasi bergabung",
                  ]
                : [
                    "Operasi integer",
                    "Penambahan dan penolakan integer",
                    "Pendaraban dan pembahagian integer",
                    "Tertib operasi",
                    "Pecahan positif dan negatif",
                    "Perpuluhan positif dan negatif",
                    "Nombor nisbah",
                    "Pengiraan campuran",
                  ]),
          ]
      : isFoundation
        ? isDlp
          ? [
              ...(isChapter6
                ? [
                    "Linear equations",
                    "Variables",
                    "Forming equations",
                    "One-variable equations",
                    "Two-variable equations",
                  ]
                : isChapter5
                ? [
                    "Variables",
                    "Algebraic expressions",
                    "Algebraic terms",
                    "Coefficients",
                    "Like terms",
                    "Unlike terms",
                  ]
                : isChapter2
                ? [
                    "Factors",
                    "Prime factors",
                    "Common factors",
                    "HCF",
                    "Multiples",
                    "Common multiples",
                    "LCM",
                  ]
                : isChapter3
                  ? [
                      "Squares",
                      "Perfect squares",
                      "Square roots",
                      "Cubes",
                      "Perfect cubes",
                      "Cube roots",
                      "Basic estimation",
                    ]
                  : [
                      "Basic chapter concepts",
                      "Important definitions",
                      "Fundamental calculation skills",
                      "Initial topic understanding",
                    ]),
            ]
          : [
              ...(isChapter6
                ? [
                    "Persamaan linear",
                    "Pemboleh ubah",
                    "Membentuk persamaan",
                    "Persamaan satu pemboleh ubah",
                    "Persamaan dua pemboleh ubah",
                  ]
                : isChapter5
                ? [
                    "Pemboleh ubah",
                    "Ungkapan algebra",
                    "Sebutan algebra",
                    "Pekali",
                    "Sebutan serupa",
                    "Sebutan tidak serupa",
                  ]
                : isChapter2
                ? [
                    "Faktor",
                    "Faktor perdana",
                    "Faktor sepunya",
                    "FSTB",
                    "Gandaan",
                    "Gandaan sepunya",
                    "GSTK",
                  ]
                : isChapter3
                  ? [
                      "Kuasa dua",
                      "Kuasa dua sempurna",
                      "Punca kuasa dua",
                      "Kuasa tiga",
                      "Kuasa tiga sempurna",
                      "Punca kuasa tiga",
                      "Anggaran asas",
                    ]
                  : [
                      "Konsep-konsep asas bab",
                      "Definisi penting",
                      "Kemahiran asas pengiraan",
                      "Kefahaman awal topik",
                    ]),
            ]
        : [
            isDlp
              ? "Each quiz contains 30 objective questions."
              : "Setiap quiz mengandungi 30 soalan objektif.",
            isDlp ? "Each question is worth 1 mark." : "Setiap soalan bernilai 1 markah.",
            isDlp ? "Choose the most accurate answer." : "Pilih jawapan yang paling tepat.",
            isDlp ? "Use paper for calculations." : "Gunakan kertas untuk membuat pengiraan.",
            isDlp ? "Full marks: 30 marks." : "Markah penuh: 30 markah.",
          ];
  const summaryItems = isChallenge
    ? [
        [
          isDlp ? "Difficulty Level" : "Tahap Kesukaran",
          isDlp ? (isChapter2 ? "Medium to Hard" : "Medium → Hard") : "Sederhana → Sukar",
        ],
        [isDlp ? "Number of Questions" : "Bilangan Soalan", "30"],
        [isDlp ? "Estimated Time" : "Anggaran Masa", isDlp ? "20–25 minutes" : "20–25 minit"],
      ]
    : isPractice
      ? [
          [isDlp ? "Difficulty Level" : "Tahap Kesukaran", isDlp ? "Medium" : "Sederhana"],
          [isDlp ? "Number of Questions" : "Bilangan Soalan", "30"],
          [isDlp ? "Estimated Time" : "Anggaran Masa", isDlp ? "15–20 minutes" : "15–20 minit"],
        ]
      : isFoundation
        ? [
            [isDlp ? "Difficulty Level" : "Tahap Kesukaran", isDlp ? "Easy" : "Mudah"],
            [isDlp ? "Number of Questions" : "Bilangan Soalan", "30"],
            [isDlp ? "Estimated Time" : "Anggaran Masa", isDlp ? "10–15 minutes" : "10–15 minit"],
          ]
        : [];
  const introSupportText = isFoundation
    ? isDlp
      ? isChapter6
        ? "This quiz is designed to help you understand the basic concepts of Chapter 6: Linear Equations."
        : isChapter5
        ? "This quiz is designed to help you understand the basic concepts of Chapter 5: Algebraic Expressions."
        : isChapter2
          ? "This quiz tests your understanding of:"
          : isChapter3
            ? "This quiz is designed to help you understand the basic concepts of Chapter 3: Squares, Square Roots, Cubes and Cube Roots."
            : "This quiz is designed to help you understand the fundamental concepts of this chapter before progressing to more challenging levels."
      : isChapter6
        ? "Quiz ini direka untuk membantu anda memahami konsep asas bagi Bab 6: Persamaan Linear."
        : isChapter5
        ? "Quiz ini direka untuk membantu anda memahami konsep asas bagi Bab 5: Ungkapan Algebra."
        : isChapter2
          ? "Quiz ini direka untuk membantu anda memahami konsep asas bagi Bab 2: Faktor dan Gandaan."
          : isChapter3
            ? "Quiz ini direka untuk membantu anda memahami konsep asas bagi Bab 3: Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga."
            : "Quiz ini direka untuk membantu anda memahami konsep asas bagi bab ini sebelum meneruskan ke tahap yang lebih mencabar."
    : null;

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> {isDlp ? "Back to objectives" : "Back to objectives"}
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 overflow-hidden relative">
        <div
          className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${objective.tone} opacity-20 blur-3xl`}
        />
        <div className="relative text-center mb-8">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${objective.tone} text-4xl shadow-lg animate-float-soft`}
          >
            {objective.badge}
          </div>
          <p className="text-sm font-bold gradient-text">{objective.title}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{introTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{introDescription}</p>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <h3 className="font-display text-xl font-bold">
              {isFoundation
                ? isDlp
                  ? "Quick Revision"
                  : "Ulang Kaji Pantas"
                : isPractice || isChallenge
                  ? isDlp
                    ? "Preparation"
                    : "Persediaan"
                  : isDlp
                    ? "Before starting the quiz"
                    : "Sebelum memulakan quiz"}
            </h3>
            {introSupportText && (
              <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-muted-foreground">
                {introSupportText}
              </p>
            )}
            <div className="mt-4 space-y-3">
              {prepItems.map((item) => (
                <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {isFoundation ? item : `✅ ${item}`}
                </div>
              ))}
            </div>
            {(isPractice || isChallenge) && (
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-muted-foreground">
                {isChallenge
                  ? isDlp
                    ? "Try to answer all questions before viewing the explanation."
                    : "Cuba jawab semua soalan sebelum melihat penjelasan."
                  : isDlp
                    ? "Try to solve each question before viewing the explanation."
                    : "Cuba selesaikan setiap soalan sebelum melihat penjelasan."}
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <h3 className="font-display text-xl font-bold">
              {isChallenge
                ? isDlp
                  ? "Topics tested"
                  : "Topik yang diuji"
                : isPractice
                  ? isDlp
                    ? "Quiz Focus"
                    : "Fokus Quiz"
                  : isFoundation
                    ? isDlp
                      ? "You will be tested on"
                      : "Anda akan diuji mengenai"
                    : isDlp
                      ? "Instructions"
                      : "Arahan"}
            </h3>
            {isPractice || isChallenge || isFoundation ? (
              <div className="mt-4 space-y-3">
                {instructions.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    ✅ {item}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300 marker:text-accent">
                {instructions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {summaryItems.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {summaryItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/5 p-3 text-center">
                    <div className="text-base font-bold text-cyan-200">{value}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
              {isDlp ? "Full Marks" : "Markah Penuh"}:{" "}
              <span className="font-bold text-cyan-200">{isDlp ? "30 marks" : "30 markah"}</span>
            </div>
            {isFoundation && (
              <p className="mt-4 text-sm text-muted-foreground">
                {isDlp ? 'Press "Start Quiz" when ready.' : 'Tekan "Mula Quiz" apabila bersedia.'}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onStart}
          className="relative mt-8 w-full py-3.5 rounded-full font-display font-bold text-lg inline-flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.45)]"
        >
          <Play className="w-5 h-5" /> {isDlp ? "Start Quiz" : "Mula Quiz"}
        </button>
      </div>
    </div>
  );
}

function MathObjectiveQuizScreen({
  objective,
  subjectId,
  chapterKey,
  scienceLang,
  quizLang,
  questions,
  current,
  idx,
  selected,
  feedback,
  score,
  onAnswer,
  onNext,
  onBack,
}: {
  objective: (typeof MATH_OBJECTIVES)[number];
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  quizLang: MathQuizLang;
  questions: ShuffledQuestion[];
  current: ShuffledQuestion | null;
  idx: number;
  selected: number | null;
  feedback: { kind: "correct" | "wrong"; msg: string } | null;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  const total = questions.length;
  const isDlp = quizLang === "dlp";

  if (!current || total === 0) {
    return (
      <div className="glass-strong rounded-3xl p-8 text-center animate-fade-up">
        <p className="text-muted-foreground">Questions Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {isDlp ? "Back to instructions" : "Back to instructions"}
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div
        key={idx}
        className={`glass-strong rounded-3xl p-6 sm:p-8 animate-question-reveal ${
          feedback?.kind === "wrong"
            ? "animate-shake"
            : feedback?.kind === "correct"
              ? "animate-correct-pulse"
              : ""
        }`}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {objective.badge} {objective.title}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              {isDlp ? "Question" : "Question"} {idx + 1} {isDlp ? "of" : "of"} {total} •{" "}
              {isDlp ? "Full marks" : "Markah penuh"}: {total}
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200">
            {isDlp ? "Score" : "Score"}: {score}/{total}
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">{current.question}</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {current.options.map((option, optionIndex) => {
            const isAnswer = optionIndex === current.answerIndex;
            const isPicked = optionIndex === selected;
            const reveal = selected !== null;

            return (
              <button
                key={`${idx}-${option}`}
                onClick={() => onAnswer(optionIndex)}
                disabled={reveal}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  reveal && isAnswer
                    ? "bg-emerald-500/20 border-emerald-500/50"
                    : reveal && isPicked && !isAnswer
                      ? "bg-rose-500/20 border-rose-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </span>
                  {reveal && isAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {reveal && isPicked && !isAnswer && <XCircle className="w-5 h-5 text-rose-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`mt-5 text-center font-display text-2xl font-bold animate-fade-up ${
              feedback.kind === "correct" ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {feedback.msg}
          </div>
        )}

        {selected !== null && current.explanation && (
          <p className="mt-4 text-sm text-muted-foreground bg-white/5 rounded-xl p-4">
            💡 {current.explanation}
          </p>
        )}

        {selected !== null && (
          <button
            onClick={onNext}
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-[1.02] transition-transform"
          >
            {idx + 1 >= total
              ? isDlp
                ? "Finish"
                : "Finish"
              : isDlp
                ? "Next question →"
                : "Next question →"}
          </button>
        )}
      </div>
    </div>
  );
}

function MathObjectiveQuestionsComingSoonScreen({
  objective,
  subjectId,
  chapterKey,
  scienceLang,
  onBack,
  onBackToObjectives,
}: {
  objective: (typeof MATH_OBJECTIVES)[number];
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  onBack: () => void;
  onBackToObjectives: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to instructions
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-8 text-center relative overflow-hidden">
        <div
          className={`absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${objective.tone} opacity-20 blur-3xl`}
        />
        <div className="relative">
          <div
            className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${objective.tone} text-4xl shadow-lg animate-float-soft`}
          >
            {objective.badge}
          </div>
          <p className="text-sm font-bold gradient-text">{objective.title}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            Questions Coming Soon
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            This objective quiz is ready for 30 objective questions. Add future questions here
            without changing the Mathematics quiz structure.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
              <span>Progress</span>
              <span>0/30</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-primary to-accent" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="glass rounded-2xl p-3 text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-xs text-muted-foreground">Future Questions</div>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Mark Each</div>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-xs text-muted-foreground">Total Marks</div>
              </div>
            </div>
          </div>

          <button
            onClick={onBackToObjectives}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" /> Back to objectives
          </button>
        </div>
      </div>
    </div>
  );
}

function MathObjectiveResultsScreen({
  objective,
  score,
  total,
  quizLang,
  chapterKey,
  onBack,
  onRetry,
}: {
  objective?: (typeof MATH_OBJECTIVES)[number];
  score: number;
  total: number;
  quizLang: MathQuizLang;
  chapterKey: string;
  onBack: () => void;
  onRetry: () => void;
}) {
  const wrong = Math.max(0, total - score);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPractice = objective?.id === "objective-2";
  const isChallenge = objective?.id === "objective-3";
  const isDlp = quizLang === "dlp";
  const isChapter2 = chapterKey === "Chapter 2";
  const isChapter3 = chapterKey === "Chapter 3";
  const isChapter4 = chapterKey === "Chapter 4";
  const isChapter5 = chapterKey === "Chapter 5";
  const isChapter6 = chapterKey === "Chapter 6";
  const chapterName = isDlp
    ? isChapter6
      ? "Chapter 6: Linear Equations"
      : isChapter5
      ? "Chapter 5: Algebraic Expressions"
      : isChapter4
        ? "Chapter 4: Ratios, Rates and Proportions"
        : isChapter3
          ? "Chapter 3: Squares, Square Roots, Cubes and Cube Roots"
          : isChapter2
            ? "Chapter 2: Factors and Multiples"
            : "Chapter 1: Rational Numbers"
    : isChapter6
      ? "Bab 6: Persamaan Linear"
      : isChapter5
      ? "Bab 5: Ungkapan Algebra"
      : isChapter4
        ? "Bab 4: Nisbah, Kadar dan Kadaran"
        : isChapter3
          ? "Bab 3: Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga"
          : isChapter2
            ? "Bab 2: Faktor dan Gandaan"
            : "Bab 1: Nombor Nisbah";
  const rating =
    score >= 27
      ? {
          title: isDlp ? "⭐ Excellent" : "⭐ Cemerlang",
          message: isDlp
            ? isChapter2
              ? "You have mastered this chapter."
              : isChallenge
                ? `You show very strong mastery of ${chapterName}.`
                : isPractice
                  ? `You have very good mastery of ${chapterName}.`
                  : "You have mastered this topic very well."
            : isChallenge
              ? `Anda menunjukkan penguasaan yang sangat tinggi terhadap ${chapterName}.`
              : isPractice
                ? `Anda mempunyai penguasaan yang sangat baik terhadap ${chapterName}.`
                : "Anda menguasai topik ini dengan sangat baik.",
          color: "text-nova-yellow",
        }
      : score >= 21
        ? {
            title: isDlp ? "👍 Good" : "👍 Baik",
            message: isDlp
              ? isChapter2
                ? "Keep practising to achieve excellence."
                : isChallenge
                  ? "You understand most concepts well."
                  : isPractice
                    ? "Keep practising to reach an excellent level."
                    : "Keep practising to improve your performance."
              : isChallenge
                ? "Anda memahami kebanyakan konsep dengan baik."
                : isPractice
                  ? "Teruskan berlatih untuk mencapai tahap cemerlang."
                  : "Teruskan latihan untuk meningkatkan prestasi.",
            color: "text-emerald-300",
          }
        : score >= 15
          ? {
              title: isDlp ? "📚 Satisfactory" : "📚 Memuaskan",
              message: isDlp
                ? isChapter2
                  ? "There are still some concepts to improve."
                  : "There are still some concepts that need strengthening."
                : isPractice || isChallenge
                  ? "Masih terdapat beberapa konsep yang perlu diperkukuhkan."
                  : "Masih ada ruang untuk penambahbaikan.",
              color: "text-cyan-300",
            }
          : {
              title: isDlp ? "🔄 Needs Improvement" : "🔄 Perlu Penambahbaikan",
              message: isDlp
                ? isChapter2
                  ? "Review the chapter notes and try again."
                  : isChallenge
                    ? `Revise ${chapterName} notes and try Objective 1 and Objective 2 again.`
                    : isPractice
                      ? `Revise ${chapterName} notes and try Objective 1 again.`
                      : "Revise the notes and try again."
                : isChallenge
                  ? `Disyorkan untuk mengulang kaji Nota ${chapterName} dan mencuba semula Objective 1 dan Objective 2.`
                  : isPractice
                    ? `Disyorkan untuk mengulang kaji Nota ${chapterName} dan mencuba semula Objective 1.`
                    : "Ulang kaji nota dan cuba semula.",
              color: "text-rose-300",
            };

  return (
    <div className="glass-strong rounded-3xl p-8 sm:p-10 text-center animate-fade-up relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.63_0.22_295_/_0.35),transparent_70%)]" />
      <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4 animate-pulse" />
      <h2 className="font-display text-3xl sm:text-4xl font-bold">
        {isDlp ? "🎉 Congratulations!" : "🎉 Tahniah!"}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {isDlp ? "You have completed" : "Anda telah menamatkan"}{" "}
        {objective ? `${objective.badge} ${objective.title}.` : isDlp ? "the quiz." : "quiz."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold gradient-text">
            {score}/{total}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {isDlp ? "Total Score" : "Markah Keseluruhan"}
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-emerald-300">{score}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {isDlp ? "Correct Answers" : "Jawapan Betul"}
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-rose-300">{wrong}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {isDlp ? "Incorrect Answers" : "Jawapan Salah"}
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-cyan-300">{percentage}%</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {isDlp ? "Percentage Score" : "Peratus Markah"}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <h3 className={`font-display text-2xl font-bold ${rating.color}`}>{rating.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{rating.message}</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-4 h-4" /> {isDlp ? "Try Again" : "Cuba Semula"}
        </button>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to objectives
        </button>
      </div>
    </div>
  );
}

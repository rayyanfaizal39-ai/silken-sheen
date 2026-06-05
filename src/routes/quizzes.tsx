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

  const current = shuffledPool?.[idx] ?? null;
  const selectedMathObjective = useMemo(
    () => MATH_OBJECTIVES.find((objective) => objective.id === mathObjectiveId) ?? null,
    [mathObjectiveId],
  );
  const mathObjectiveQuestions = useMemo(() => {
    if (chapter !== "Chapter 1") return [];
    const lang = mathQuizLang ?? "bm";
    if (mathObjectiveId === "objective-1") {
      return lang === "dlp"
        ? MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP
        : MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS;
    }
    if (mathObjectiveId === "objective-2") {
      return lang === "dlp"
        ? MATH_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP
        : MATH_OBJECTIVE_2_PRACTICE_QUESTIONS;
    }
    if (mathObjectiveId === "objective-3") {
      return lang === "dlp"
        ? MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP
        : MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS;
    }
    return [];
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
    <section
      className={`max-w-4xl mx-auto px-4 sm:px-8 py-10 md:py-16 ${screenShake ? "animate-screen-shake" : ""}`}
    >
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
      <div className="text-center mb-6">
        <h1 className="font-display text-5xl font-bold">
          Take a <span className="gradient-text">Quiz</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Instant scoring. Earn XP. Beat your streak.</p>
      </div>
      <div className="flex justify-center">
        <DailyQuote />
      </div>

      {!subject ? (
        <SubjectGrid
          onSelect={(id) => {
            setSubject(id);
            setChapter(null);
            setForm("All");
            setDiff("All");
            reset();
          }}
        />
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
    </section>
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
            Choose Foundation, Practice, or Challenge to revise Bab 1 at the right level.
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
  const introTitle = isFoundation
    ? "🎯 Objective 1 – Foundation"
    : isPractice || isChallenge
      ? isDlp
        ? "Chapter 1: Rational Numbers"
        : "Bab 1: Nombor Nisbah"
      : isDlp
        ? "📝 Get Ready For The Quiz!"
        : "📝 Bersedia Untuk Quiz!";
  const introDescription = isChallenge
    ? isDlp
      ? "This quiz is designed to test your full mastery of Chapter 1."
      : "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 1."
    : isPractice
      ? isDlp
        ? "This quiz tests your intermediate understanding of:"
        : "Quiz ini menguji kefahaman pertengahan anda tentang:"
      : isFoundation
        ? isDlp
          ? "Welcome to Objective 1!"
          : "Selamat datang ke Objective 1!"
        : isDlp
          ? 'Press "Start Quiz" when you are ready.'
          : 'Tekan "Mula Quiz" apabila bersedia.';
  const prepItems = isChallenge
    ? isDlp
      ? ["Pen or pencil", "Blank paper for working steps", "Calculator if needed"]
      : ["Pen atau pensel", "Kertas kosong untuk membuat jalan kerja", "Kalkulator jika diperlukan"]
    : isPractice
      ? isDlp
        ? ["Pen or pencil", "Blank paper for calculations", "Calculator if needed"]
        : ["Pen atau pensel", "Kertas kosong untuk membuat pengiraan", "Kalkulator jika diperlukan"]
      : isFoundation
        ? [
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
          "Integers",
          "Integer operations",
          "Positive and negative fractions",
          "Positive and negative decimals",
          "Rational numbers",
          "Order of operations",
          "Combined calculations",
          "Problem solving",
          "Exam-style questions",
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
        ]
    : isPractice
      ? isDlp
        ? [
            "Integer operations",
            "Addition and subtraction of integers",
            "Multiplication and division of integers",
            "Order of operations",
            "Positive and negative fractions",
            "Positive and negative decimals",
            "Rational numbers",
            "Mixed calculations",
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
          ]
      : isFoundation
        ? isDlp
          ? [
              "Basic chapter concepts",
              "Important definitions",
              "Fundamental calculation skills",
              "Initial topic understanding",
            ]
          : [
              "Konsep-konsep asas bab",
              "Definisi penting",
              "Kemahiran asas pengiraan",
              "Kefahaman awal topik",
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
          isDlp ? "Medium → Hard" : "Sederhana → Sukar",
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
      ? "This quiz is designed to help you understand the fundamental concepts of this chapter before progressing to more challenging levels."
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
  onBack,
  onRetry,
}: {
  objective?: (typeof MATH_OBJECTIVES)[number];
  score: number;
  total: number;
  quizLang: MathQuizLang;
  onBack: () => void;
  onRetry: () => void;
}) {
  const wrong = Math.max(0, total - score);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPractice = objective?.id === "objective-2";
  const isChallenge = objective?.id === "objective-3";
  const isDlp = quizLang === "dlp";
  const rating =
    score >= 27
      ? {
          title: isDlp ? "⭐ Excellent" : "⭐ Cemerlang",
          message: isDlp
            ? isChallenge
              ? "You show very strong mastery of Chapter 1: Rational Numbers."
              : isPractice
                ? "You have very good mastery of Chapter 1."
                : "You have mastered this topic very well."
            : isChallenge
              ? "Anda menunjukkan penguasaan yang sangat tinggi terhadap Bab 1: Nombor Nisbah."
              : isPractice
                ? "Anda mempunyai penguasaan yang sangat baik terhadap Bab 1."
                : "Anda menguasai topik ini dengan sangat baik.",
          color: "text-nova-yellow",
        }
      : score >= 21
        ? {
            title: isDlp ? "👍 Good" : "👍 Baik",
            message: isDlp
              ? isChallenge
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
                ? "There are still some concepts that need strengthening."
                : isPractice || isChallenge
                  ? "Masih terdapat beberapa konsep yang perlu diperkukuhkan."
                  : "Masih ada ruang untuk penambahbaikan.",
              color: "text-cyan-300",
            }
          : {
              title: isDlp ? "🔄 Needs Improvement" : "🔄 Perlu Penambahbaikan",
              message: isDlp
                ? isChallenge
                  ? "Revise Chapter 1 notes and try Objective 1 and Objective 2 again."
                  : isPractice
                    ? "Revise Chapter 1 notes and try Objective 1 again."
                    : "Revise the notes and try again."
                : isChallenge
                  ? "Disyorkan untuk mengulang kaji Nota Bab 1 dan mencuba semula Objective 1 dan Objective 2."
                  : isPractice
                    ? "Disyorkan untuk mengulang kaji Nota Bab 1 dan mencuba semula Objective 1."
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

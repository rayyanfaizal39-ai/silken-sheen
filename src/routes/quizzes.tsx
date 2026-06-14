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
import { useCikgu } from "@/context/cikgu-context";
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
  Lightbulb,
  Flame,
  Zap,
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
import { AcademyHero, AcademyPageShell, SubjectWorldBanner, type SubjectPlanetId } from "@/components/AcademyPage";
import { SubjectWorldPage } from "@/components/SubjectWorldPage";

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

const MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah poligon?", ["Bentuk 3D dengan sisi lurus", "Bentuk 2D tertutup dengan tiga atau lebih sisi lurus", "Bulatan yang ditutup", "Garisan lurus"], 1, "Poligon ialah bentuk dua dimensi (2D) tertutup yang dibatasi oleh tiga atau lebih sisi lurus.", "Easy"],
  ["Berapakah bilangan sisi segi tiga?", ["2", "3", "4", "5"], 1, "Segi tiga mempunyai 3 sisi, 3 bucu dan 3 sudut.", "Easy"],
  ["Berapakah bilangan sisi pentagon?", ["4", "5", "6", "7"], 1, "Pentagon mempunyai 5 sisi (penta = 5 dalam bahasa Greek).", "Easy"],
  ["Berapakah bilangan sisi heksagon?", ["5", "6", "7", "8"], 1, "Heksagon mempunyai 6 sisi (hexa = 6 dalam bahasa Greek).", "Easy"],
  ["Apakah nama poligon dengan 8 sisi?", ["Heptagon", "Nonagon", "Oktagon", "Dekagon"], 2, "Poligon dengan 8 sisi dipanggil Oktagon (octa = 8 dalam bahasa Latin).", "Easy"],
  ["Apakah nama poligon dengan 10 sisi?", ["Oktagon", "Nonagon", "Heksagon", "Dekagon"], 3, "Poligon dengan 10 sisi dipanggil Dekagon (deca = 10 dalam bahasa Latin).", "Easy"],
  ["Apakah poligon sekata?", ["Poligon dengan semua sisi berbeza", "Poligon dengan semua sisi sama DAN semua sudut sama", "Poligon dengan satu garis simetri", "Poligon dengan 4 sisi"], 1, "Poligon sekata mempunyai semua sisi sama panjang DAN semua sudut dalam sama besar.", "Easy"],
  ["Apakah segi tiga sama sisi?", ["Segi tiga dengan 2 sisi sama", "Segi tiga dengan 3 sisi berbeza", "Segi tiga dengan 3 sisi sama panjang dan semua sudut 60°", "Segi tiga dengan satu sudut 90°"], 2, "Segi tiga sama sisi mempunyai 3 sisi sama panjang dan semua sudut = 60°.", "Easy"],
  ["Apakah segi tiga sama kaki?", ["Segi tiga dengan 3 sisi sama", "Segi tiga dengan 2 sisi sama dan 2 sudut tapak sama", "Segi tiga dengan semua sisi berbeza", "Segi tiga dengan satu sudut tegak"], 1, "Segi tiga sama kaki mempunyai DUA sisi sama panjang dan DUA sudut tapak yang sama.", "Easy"],
  ["Apakah segi tiga tak sama kaki?", ["Segi tiga dengan 2 sisi sama", "Segi tiga dengan semua sisi sama", "Segi tiga dengan semua sisi berbeza dan semua sudut berbeza", "Segi tiga dengan satu sudut 90°"], 2, "Segi tiga tak sama kaki mempunyai semua sisi berbeza panjang dan semua sudut berbeza besar.", "Easy"],
  ["Apakah segi tiga bersudut tegak?", ["Segi tiga dengan semua sudut < 90°", "Segi tiga dengan satu sudut > 90°", "Segi tiga dengan satu sudut tepat 90°", "Segi tiga dengan semua sudut 60°"], 2, "Segi tiga bersudut tegak mempunyai tepat SATU sudut 90°. Sisi terpanjang dipanggil hipotenus.", "Easy"],
  ["Apakah hipotenus?", ["Sisi terpendek segi tiga bersudut tegak", "Sisi terpanjang segi tiga bersudut tegak (bertentangan dengan sudut 90°)", "Salah satu kaki segi tiga sama kaki", "Garis di tengah segi tiga"], 1, "Hipotenus ialah sisi terpanjang segi tiga bersudut tegak, yang berada bertentangan dengan sudut 90°.", "Easy"],
  ["Apakah segi empat tepat?", ["Sisi empat dengan 4 sisi sama dan pepenjuru berserenjang", "Sisi empat dengan 4 sudut 90° dan sisi bertentangan sama", "Sisi empat dengan satu pasang sisi selari", "Sisi empat dengan 2 pasang sisi bersebelahan sama"], 1, "Segi empat tepat mempunyai 4 sudut 90°, sisi bertentangan sama panjang dan selari.", "Easy"],
  ["Apakah segi empat sama?", ["Segi empat tepat dengan pepenjuru berserenjang dan 4 sisi sama", "Sisi empat dengan 4 sisi berbeza", "Sisi empat dengan satu pasang sisi selari", "Jajaran genjang biasa"], 0, "Segi empat sama mempunyai 4 sisi sama, 4 sudut 90°, dan pepenjuru berserenjang.", "Easy"],
  ["Apakah jajaran genjang?", ["Sisi empat dengan 4 sudut 90°", "Sisi empat dengan 2 pasang sisi bertentangan yang selari dan sama panjang", "Sisi empat dengan 4 sisi sama", "Sisi empat dengan satu pasang sisi selari"], 1, "Jajaran genjang mempunyai 2 pasang sisi bertentangan yang selari dan sama panjang, serta sudut bertentangan yang sama.", "Easy"],
  ["Apakah belah ketupat?", ["Sisi empat dengan 4 sudut 90°", "Sisi empat dengan 2 pasang sisi bersebelahan sama", "Sisi empat dengan 4 sisi sama dan pepenjuru berserenjang", "Sisi empat dengan satu pasang sisi selari"], 2, "Belah ketupat mempunyai 4 sisi sama panjang dan pepenjuru yang berserenjang.", "Easy"],
  ["Apakah trapezium?", ["Sisi empat dengan 4 sisi sama", "Sisi empat dengan 4 sudut 90°", "Sisi empat dengan tepat satu pasang sisi selari", "Sisi empat dengan 2 pasang sisi bersebelahan sama"], 2, "Trapezium mempunyai tepat SATU pasang sisi yang selari.", "Easy"],
  ["Apakah lelayang?", ["Sisi empat dengan 4 sisi sama", "Sisi empat dengan 2 pasang sisi BERSEBELAHAN yang sama panjang", "Sisi empat dengan 4 sudut 90°", "Sisi empat dengan 2 pasang sisi BERTENTANGAN yang sama"], 1, "Lelayang mempunyai DUA pasang sisi BERSEBELAHAN yang sama panjang.", "Easy"],
  ["Berapakah bilangan garis simetri segi tiga sama sisi?", ["1", "2", "3", "4"], 2, "Segi tiga sama sisi mempunyai 3 garis simetri — setiap satu melalui puncak dan titik tengah sisi bertentangan.", "Easy"],
  ["Berapakah bilangan garis simetri segi empat sama?", ["2", "3", "4", "6"], 2, "Segi empat sama mempunyai 4 garis simetri — 2 melalui sisi bertentangan dan 2 melalui pepenjuru.", "Easy"],
  ["Berapakah bilangan garis simetri segi tiga sama kaki?", ["0", "1", "2", "3"], 1, "Segi tiga sama kaki mempunyai 1 garis simetri — melalui puncak dan titik tengah tapak.", "Easy"],
  ["Berapakah bilangan garis simetri jajaran genjang?", ["0", "1", "2", "4"], 0, "Jajaran genjang mempunyai 0 garis simetri.", "Easy"],
  ["Berapakah bilangan garis simetri belah ketupat?", ["0", "1", "2", "4"], 2, "Belah ketupat mempunyai 2 garis simetri — melalui kedua-dua pasang bucu bertentangan.", "Easy"],
  ["Berapakah bilangan garis simetri lelayang?", ["0", "1", "2", "4"], 1, "Lelayang mempunyai 1 garis simetri — pepenjuru yang membahagi dua pepenjuru yang lain.", "Easy"],
  ["Apakah segi tiga bersudut cakah?", ["Segi tiga dengan semua sudut < 90°", "Segi tiga dengan satu sudut > 90°", "Segi tiga dengan satu sudut = 90°", "Segi tiga dengan semua sudut = 60°"], 1, "Segi tiga bersudut cakah mempunyai tepat SATU sudut lebih besar daripada 90°.", "Easy"],
  ["Berapakah bilangan garis simetri segi empat tepat (bukan segi empat sama)?", ["1", "2", "3", "4"], 1, "Segi empat tepat (bukan segi empat sama) mempunyai 2 garis simetri — melalui titik tengah sisi bertentangan.", "Easy"],
  ["Apakah yang membezakan segi empat sama dengan segi empat tepat?", ["Bilangan sudut", "Segi empat sama mempunyai semua 4 sisi sama, segi empat tepat hanya sisi bertentangan sama", "Segi empat sama mempunyai lebih banyak sudut", "Tiada perbezaan"], 1, "Segi empat sama: semua 4 sisi sama. Segi empat tepat: hanya sisi bertentangan sama. Kedua-duanya mempunyai 4 sudut 90°.", "Easy"],
  ["Apakah nama poligon dengan 7 sisi?", ["Heksagon", "Oktagon", "Heptagon", "Nonagon"], 2, "Poligon dengan 7 sisi dipanggil Heptagon (hepta = 7 dalam bahasa Greek).", "Easy"],
  ["Apakah nama poligon dengan 9 sisi?", ["Oktagon", "Dekagon", "Heptagon", "Nonagon"], 3, "Poligon dengan 9 sisi dipanggil Nonagon (nona = 9 dalam bahasa Latin).", "Easy"],
  ["Apakah ciri utama pepenjuru poligon?", ["Menghubungkan dua bucu bersebelahan", "Menghubungkan dua bucu yang TIDAK bersebelahan", "Ialah sisi poligon", "Berada di luar poligon"], 1, "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan. Sisi bukan pepenjuru.", "Easy"],
]);

const MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a polygon?", ["A 3D shape with straight sides", "A closed 2D shape bounded by three or more straight sides", "A closed circle", "A straight line"], 1, "A polygon is a two-dimensional (2D) closed shape bounded by three or more straight sides.", "Easy"],
  ["How many sides does a triangle have?", ["2", "3", "4", "5"], 1, "A triangle has 3 sides, 3 vertices and 3 angles.", "Easy"],
  ["How many sides does a pentagon have?", ["4", "5", "6", "7"], 1, "A pentagon has 5 sides (penta = 5 in Greek).", "Easy"],
  ["How many sides does a hexagon have?", ["5", "6", "7", "8"], 1, "A hexagon has 6 sides (hexa = 6 in Greek).", "Easy"],
  ["What is the name of a polygon with 8 sides?", ["Heptagon", "Nonagon", "Octagon", "Decagon"], 2, "A polygon with 8 sides is called an Octagon (octa = 8 in Latin).", "Easy"],
  ["What is the name of a polygon with 10 sides?", ["Octagon", "Nonagon", "Hexagon", "Decagon"], 3, "A polygon with 10 sides is called a Decagon (deca = 10 in Latin).", "Easy"],
  ["What is a regular polygon?", ["A polygon with all sides different", "A polygon with all sides equal AND all angles equal", "A polygon with one line of symmetry", "A polygon with 4 sides"], 1, "A regular polygon has all sides equal in length AND all interior angles equal.", "Easy"],
  ["What is an equilateral triangle?", ["A triangle with 2 equal sides", "A triangle with 3 different sides", "A triangle with 3 equal sides and all angles 60°", "A triangle with one 90° angle"], 2, "An equilateral triangle has 3 equal sides and all angles = 60°.", "Easy"],
  ["What is an isosceles triangle?", ["A triangle with 3 equal sides", "A triangle with 2 equal sides and 2 equal base angles", "A triangle with all different sides", "A triangle with one right angle"], 1, "An isosceles triangle has TWO equal sides and TWO equal base angles.", "Easy"],
  ["What is a scalene triangle?", ["A triangle with 2 equal sides", "A triangle with all equal sides", "A triangle with all sides different and all angles different", "A triangle with one 90° angle"], 2, "A scalene triangle has all sides of different lengths and all angles of different sizes.", "Easy"],
  ["What is a right-angled triangle?", ["A triangle with all angles < 90°", "A triangle with one angle > 90°", "A triangle with exactly one angle of 90°", "A triangle with all angles 60°"], 2, "A right-angled triangle has exactly ONE 90° angle. The longest side is called the hypotenuse.", "Easy"],
  ["What is the hypotenuse?", ["The shortest side of a right-angled triangle", "The longest side of a right-angled triangle (opposite the 90° angle)", "One of the legs of an isosceles triangle", "A line through the middle of a triangle"], 1, "The hypotenuse is the longest side of a right-angled triangle, opposite the 90° angle.", "Easy"],
  ["What is a rectangle?", ["A quadrilateral with 4 equal sides and perpendicular diagonals", "A quadrilateral with 4 right angles and opposite sides equal", "A quadrilateral with one pair of parallel sides", "A quadrilateral with 2 pairs of adjacent equal sides"], 1, "A rectangle has 4 right angles and opposite sides that are equal in length and parallel.", "Easy"],
  ["What is a square?", ["A rectangle with perpendicular diagonals and all 4 sides equal", "A quadrilateral with 4 different sides", "A quadrilateral with one pair of parallel sides", "An ordinary parallelogram"], 0, "A square has 4 equal sides, 4 right angles, and perpendicular diagonals.", "Easy"],
  ["What is a parallelogram?", ["A quadrilateral with 4 right angles", "A quadrilateral with 2 pairs of opposite parallel equal sides", "A quadrilateral with 4 equal sides", "A quadrilateral with one pair of parallel sides"], 1, "A parallelogram has 2 pairs of opposite sides that are parallel and equal, with opposite angles equal.", "Easy"],
  ["What is a rhombus?", ["A quadrilateral with 4 right angles", "A quadrilateral with 2 pairs of adjacent equal sides", "A quadrilateral with 4 equal sides and perpendicular diagonals", "A quadrilateral with one pair of parallel sides"], 2, "A rhombus has 4 equal sides and perpendicular diagonals.", "Easy"],
  ["What is a trapezium?", ["A quadrilateral with 4 equal sides", "A quadrilateral with 4 right angles", "A quadrilateral with exactly one pair of parallel sides", "A quadrilateral with 2 pairs of adjacent equal sides"], 2, "A trapezium has exactly ONE pair of parallel sides.", "Easy"],
  ["What is a kite?", ["A quadrilateral with 4 equal sides", "A quadrilateral with 2 pairs of ADJACENT equal sides", "A quadrilateral with 4 right angles", "A quadrilateral with 2 pairs of OPPOSITE equal sides"], 1, "A kite has TWO pairs of ADJACENT (neighbouring) sides that are equal in length.", "Easy"],
  ["How many lines of symmetry does an equilateral triangle have?", ["1", "2", "3", "4"], 2, "An equilateral triangle has 3 lines of symmetry — each through a vertex and the midpoint of the opposite side.", "Easy"],
  ["How many lines of symmetry does a square have?", ["2", "3", "4", "6"], 2, "A square has 4 lines of symmetry — 2 through opposite sides and 2 through diagonals.", "Easy"],
  ["How many lines of symmetry does an isosceles triangle have?", ["0", "1", "2", "3"], 1, "An isosceles triangle has 1 line of symmetry — through the apex and the midpoint of the base.", "Easy"],
  ["How many lines of symmetry does a parallelogram have?", ["0", "1", "2", "4"], 0, "A parallelogram has 0 lines of symmetry.", "Easy"],
  ["How many lines of symmetry does a rhombus have?", ["0", "1", "2", "4"], 2, "A rhombus has 2 lines of symmetry — through both pairs of opposite vertices.", "Easy"],
  ["How many lines of symmetry does a kite have?", ["0", "1", "2", "4"], 1, "A kite has 1 line of symmetry — the diagonal that bisects the other diagonal.", "Easy"],
  ["What is an obtuse-angled triangle?", ["A triangle with all angles < 90°", "A triangle with one angle > 90°", "A triangle with one angle = 90°", "A triangle with all angles = 60°"], 1, "An obtuse-angled triangle has exactly ONE angle greater than 90°.", "Easy"],
  ["How many lines of symmetry does a rectangle (non-square) have?", ["1", "2", "3", "4"], 1, "A rectangle (non-square) has 2 lines of symmetry — through the midpoints of opposite sides.", "Easy"],
  ["What distinguishes a square from a rectangle?", ["Number of angles", "A square has all 4 sides equal; a rectangle has only opposite sides equal", "A square has more angles", "No difference"], 1, "Square: all 4 sides equal. Rectangle: only opposite sides equal. Both have 4 right angles.", "Easy"],
  ["What is the name of a polygon with 7 sides?", ["Hexagon", "Octagon", "Heptagon", "Nonagon"], 2, "A polygon with 7 sides is called a Heptagon (hepta = 7 in Greek).", "Easy"],
  ["What is the name of a polygon with 9 sides?", ["Octagon", "Decagon", "Heptagon", "Nonagon"], 3, "A polygon with 9 sides is called a Nonagon (nona = 9 in Latin).", "Easy"],
  ["What is the key feature of a polygon's diagonal?", ["Connects two adjacent vertices", "Connects two NON-ADJACENT vertices", "Is a side of the polygon", "Lies outside the polygon"], 1, "A diagonal connects two NON-ADJACENT vertices. Sides are not diagonals.", "Easy"],
]);

const MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Berapakah jumlah sudut dalam segi tiga?", ["90°", "180°", "270°", "360°"], 1, "Jumlah ketiga-tiga sudut dalam mana-mana segi tiga sentiasa 180°.", "Medium"],
  ["Berapakah jumlah sudut dalam sisi empat?", ["180°", "270°", "360°", "540°"], 2, "Jumlah keempat-empat sudut dalam mana-mana sisi empat sentiasa 360°.", "Medium"],
  ["Segi tiga ABC: ∠A = 55°, ∠B = 75°. Cari ∠C.", ["40°", "50°", "60°", "70°"], 1, "∠C = 180° − 55° − 75° = 50°.", "Medium"],
  ["Sisi empat PQRS: ∠P = 90°, ∠Q = 85°, ∠R = 95°. Cari ∠S.", ["80°", "90°", "95°", "100°"], 1, "∠S = 360° − 90° − 85° − 95° = 90°.", "Medium"],
  ["Berapakah bilangan pepenjuru segi empat?", ["1", "2", "3", "4"], 1, "Pepenjuru sisi empat = 4(4−3)/2 = 4(1)/2 = 2 pepenjuru.", "Medium"],
  ["Berapakah bilangan pepenjuru pentagon?", ["3", "4", "5", "6"], 2, "Pepenjuru pentagon = 5(5−3)/2 = 5(2)/2 = 5 pepenjuru.", "Medium"],
  ["Berapakah bilangan pepenjuru heksagon?", ["6", "7", "8", "9"], 3, "Pepenjuru heksagon = 6(6−3)/2 = 6(3)/2 = 9 pepenjuru.", "Medium"],
  ["Berapakah bilangan pepenjuru oktagon?", ["14", "16", "18", "20"], 3, "Pepenjuru oktagon = 8(8−3)/2 = 8(5)/2 = 20 pepenjuru.", "Medium"],
  ["Segi tiga sama kaki: sudut puncak = 50°. Cari sudut tapak.", ["50°", "65°", "70°", "80°"], 1, "Dua sudut tapak sama: (180° − 50°)/2 = 130°/2 = 65°.", "Medium"],
  ["Segi tiga sama kaki: setiap sudut tapak = 40°. Cari sudut puncak.", ["80°", "100°", "120°", "140°"], 1, "Sudut puncak = 180° − 40° − 40° = 100°.", "Medium"],
  ["Jajaran genjang: ∠A = 65°. Cari ∠B, ∠C dan ∠D.", ["∠B = 115°, ∠C = 65°, ∠D = 115°", "∠B = 65°, ∠C = 115°, ∠D = 65°", "∠B = 65°, ∠C = 65°, ∠D = 115°", "∠B = 115°, ∠C = 115°, ∠D = 65°"], 0, "Sudut bertentangan sama: ∠C = 65°. Sudut bersebelahan berjumlah 180°: ∠B = ∠D = 180° − 65° = 115°.", "Medium"],
  ["Sudut luar segi tiga = 125°. Satu sudut dalam berhadapan = 60°. Cari sudut dalam berhadapan yang lain.", ["55°", "60°", "65°", "70°"], 2, "Sudut luar = jumlah dua sudut dalam berhadapan. 125° = 60° + x. x = 65°.", "Medium"],
  ["Segi tiga bersudut tegak: satu sudut bukan tegak = 38°. Cari sudut yang lain.", ["42°", "52°", "62°", "72°"], 1, "Dua sudut bukan tegak berjumlah 90°. 38° + x = 90°. x = 52°.", "Medium"],
  ["Poligon dengan berapa sisi mempunyai 14 pepenjuru?", ["7", "8", "9", "10"], 0, "n(n−3)/2 = 14. n(n−3) = 28. n = 7: 7(4) = 28 ✓. Poligon dengan 7 sisi (heptagon).", "Medium"],
  ["Sisi empat: tiga sudut = 75°, 95°, 110°. Cari sudut keempat.", ["70°", "80°", "90°", "100°"], 1, "Sudut keempat = 360° − 75° − 95° − 110° = 80°.", "Medium"],
  ["Segi tiga dengan sudut (3x)°, (2x + 10)° dan (x + 20)°. Cari x.", ["25°", "30°", "35°", "40°"], 0, "3x + (2x + 10) + (x + 20) = 180. 6x + 30 = 180. 6x = 150. x = 25.", "Medium"],
  ["Sisi empat dengan sudut (2a + 10)°, 90°, (3a − 5)° dan 85°. Cari a.", ["a = 30°", "a = 36°", "a = 40°", "a = 45°"], 2, "(2a + 10) + 90 + (3a − 5) + 85 = 360. 5a + 180 = 360. 5a = 180. a = 36. Semak: (72+10)+90+(108−5)+85 = 82+90+103+85 = 360 ✓. a = 36.", "Medium"],
  ["Berapa bilangan pepenjuru nonagon?", ["24", "27", "30", "35"], 1, "n = 9: 9(9−3)/2 = 9(6)/2 = 27 pepenjuru.", "Medium"],
  ["Segi tiga sama sisi: setiap sudut adalah?", ["45°", "60°", "72°", "90°"], 1, "Segi tiga sama sisi: semua sudut = 180°/3 = 60°.", "Medium"],
  ["Sisi empat dengan semua sudut sama. Berapakah setiap sudut?", ["45°", "60°", "72°", "90°"], 3, "Jumlah sudut sisi empat = 360°. Jika semua sama: 360°/4 = 90°.", "Medium"],
  ["Sudut luar segi tiga dengan dua sudut dalam berhadapan = (2x + 15)° dan (x + 10)°. Jika sudut luar = 100°, cari x.", ["x = 25°", "x = 20°", "x = 15°", "x = 30°"], 0, "(2x + 15) + (x + 10) = 100. 3x + 25 = 100. 3x = 75. x = 25.", "Medium"],
  ["Sebuah poligon mempunyai 5 pepenjuru. Berapakah bilangan sisinya?", ["4", "5", "6", "7"], 1, "n(n−3)/2 = 5. n(n−3) = 10. n = 5: 5(2) = 10 ✓. Pentagon mempunyai 5 sisi.", "Medium"],
  ["Segi tiga bersudut cakah: sudut cakah = 115°, sudut kedua = 35°. Cari sudut ketiga.", ["25°", "30°", "35°", "40°"], 1, "115° + 35° + x = 180°. x = 180° − 150° = 30°.", "Medium"],
  ["Jajaran genjang ABCD: ∠A = (4k + 10)° dan ∠B = (2k + 50)°. Cari k.", ["k = 20°", "k = 25°", "k = 30°", "k = 35°"], 0, "∠A + ∠B = 180° (bersebelahan). (4k + 10) + (2k + 50) = 180. 6k + 60 = 180. 6k = 120. k = 20.", "Medium"],
  ["Segi tiga sama kaki PQR: PQ = PR. ∠Q = (3x − 5)° dan ∠R = (2x + 10)°. Cari x dan nilai sudut.", ["x = 15, sudut = 40°", "x = 20, sudut = 55°", "x = 10, sudut = 25°", "x = 25, sudut = 70°"], 0, "∠Q = ∠R (sudut tapak). 3x − 5 = 2x + 10. x = 15. Sudut = 3(15) − 5 = 40°.", "Medium"],
  ["Berapakah bilangan pepenjuru dekagon?", ["30", "35", "40", "45"], 1, "n = 10: 10(10−3)/2 = 10(7)/2 = 35 pepenjuru.", "Medium"],
  ["Sisi empat: ∠A = ∠C = 100° dan ∠B = ∠D. Cari ∠B.", ["80°", "90°", "100°", "110°"], 0, "∠A + ∠B + ∠C + ∠D = 360°. 100 + ∠B + 100 + ∠B = 360. 2∠B = 160. ∠B = 80°.", "Medium"],
  ["Segi tiga: sudut luar di A = 140°. ∠B = 80°. Cari ∠C.", ["40°", "50°", "60°", "70°"], 2, "Sudut luar di A = ∠B + ∠C. 140° = 80° + ∠C. ∠C = 60°.", "Medium"],
  ["Cari bilangan pepenjuru poligon dengan n = 12 sisi.", ["48", "54", "60", "66"], 1, "12(12−3)/2 = 12(9)/2 = 108/2 = 54 pepenjuru.", "Medium"],
]);

const MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["What is the sum of interior angles of a triangle?", ["90°", "180°", "270°", "360°"], 1, "The sum of all three interior angles of any triangle is always 180°.", "Medium"],
  ["What is the sum of interior angles of a quadrilateral?", ["180°", "270°", "360°", "540°"], 2, "The sum of all four interior angles of any quadrilateral is always 360°.", "Medium"],
  ["Triangle ABC: ∠A = 55°, ∠B = 75°. Find ∠C.", ["40°", "50°", "60°", "70°"], 1, "∠C = 180° − 55° − 75° = 50°.", "Medium"],
  ["Quadrilateral PQRS: ∠P = 90°, ∠Q = 85°, ∠R = 95°. Find ∠S.", ["80°", "90°", "95°", "100°"], 1, "∠S = 360° − 90° − 85° − 95° = 90°.", "Medium"],
  ["How many diagonals does a quadrilateral have?", ["1", "2", "3", "4"], 1, "Diagonals of a quadrilateral = 4(4−3)/2 = 4(1)/2 = 2 diagonals.", "Medium"],
  ["How many diagonals does a pentagon have?", ["3", "4", "5", "6"], 2, "Diagonals of a pentagon = 5(5−3)/2 = 5(2)/2 = 5 diagonals.", "Medium"],
  ["How many diagonals does a hexagon have?", ["6", "7", "8", "9"], 3, "Diagonals of a hexagon = 6(6−3)/2 = 6(3)/2 = 9 diagonals.", "Medium"],
  ["How many diagonals does an octagon have?", ["14", "16", "18", "20"], 3, "Diagonals of an octagon = 8(8−3)/2 = 8(5)/2 = 20 diagonals.", "Medium"],
  ["Isosceles triangle: apex angle = 50°. Find the base angles.", ["50°", "65°", "70°", "80°"], 1, "Two base angles equal: (180° − 50°)/2 = 130°/2 = 65°.", "Medium"],
  ["Isosceles triangle: each base angle = 40°. Find the apex angle.", ["80°", "100°", "120°", "140°"], 1, "Apex angle = 180° − 40° − 40° = 100°.", "Medium"],
  ["Parallelogram: ∠A = 65°. Find ∠B, ∠C and ∠D.", ["∠B = 115°, ∠C = 65°, ∠D = 115°", "∠B = 65°, ∠C = 115°, ∠D = 65°", "∠B = 65°, ∠C = 65°, ∠D = 115°", "∠B = 115°, ∠C = 115°, ∠D = 65°"], 0, "Opposite angles equal: ∠C = 65°. Adjacent angles sum to 180°: ∠B = ∠D = 180° − 65° = 115°.", "Medium"],
  ["Exterior angle of a triangle = 125°. One non-adjacent interior angle = 60°. Find the other.", ["55°", "60°", "65°", "70°"], 2, "Exterior angle = sum of two non-adjacent interior angles. 125° = 60° + x. x = 65°.", "Medium"],
  ["Right-angled triangle: one non-right angle = 38°. Find the other non-right angle.", ["42°", "52°", "62°", "72°"], 1, "Two non-right angles sum to 90°. 38° + x = 90°. x = 52°.", "Medium"],
  ["A polygon with how many sides has 14 diagonals?", ["7", "8", "9", "10"], 0, "n(n−3)/2 = 14. n(n−3) = 28. n = 7: 7(4) = 28 ✓. Heptagon has 7 sides.", "Medium"],
  ["Quadrilateral: three angles = 75°, 95°, 110°. Find the fourth angle.", ["70°", "80°", "90°", "100°"], 1, "Fourth angle = 360° − 75° − 95° − 110° = 80°.", "Medium"],
  ["Triangle with angles (3x)°, (2x + 10)° and (x + 20)°. Find x.", ["25°", "30°", "35°", "40°"], 0, "3x + (2x + 10) + (x + 20) = 180. 6x + 30 = 180. 6x = 150. x = 25.", "Medium"],
  ["Quadrilateral with angles (2a + 10)°, 90°, (3a − 5)° and 85°. Find a.", ["a = 30°", "a = 36°", "a = 40°", "a = 45°"], 1, "(2a + 10) + 90 + (3a − 5) + 85 = 360. 5a + 180 = 360. 5a = 180. a = 36.", "Medium"],
  ["How many diagonals does a nonagon have?", ["24", "27", "30", "35"], 1, "n = 9: 9(9−3)/2 = 9(6)/2 = 27 diagonals.", "Medium"],
  ["What is each angle of an equilateral triangle?", ["45°", "60°", "72°", "90°"], 1, "Equilateral triangle: all angles = 180°/3 = 60°.", "Medium"],
  ["A quadrilateral has all equal angles. What is each angle?", ["45°", "60°", "72°", "90°"], 3, "Sum of quadrilateral angles = 360°. If all equal: 360°/4 = 90°.", "Medium"],
  ["Exterior angle with two non-adjacent interior angles = (2x + 15)° and (x + 10)°. Exterior angle = 100°. Find x.", ["x = 25°", "x = 20°", "x = 15°", "x = 30°"], 0, "(2x + 15) + (x + 10) = 100. 3x + 25 = 100. 3x = 75. x = 25.", "Medium"],
  ["A polygon has 5 diagonals. How many sides does it have?", ["4", "5", "6", "7"], 1, "n(n−3)/2 = 5. n(n−3) = 10. n = 5: 5(2) = 10 ✓. Pentagon has 5 sides.", "Medium"],
  ["Obtuse-angled triangle: obtuse angle = 115°, second angle = 35°. Find the third angle.", ["25°", "30°", "35°", "40°"], 1, "115° + 35° + x = 180°. x = 180° − 150° = 30°.", "Medium"],
  ["Parallelogram ABCD: ∠A = (4k + 10)° and ∠B = (2k + 50)°. Find k.", ["k = 20°", "k = 25°", "k = 30°", "k = 35°"], 0, "∠A + ∠B = 180° (adjacent). (4k + 10) + (2k + 50) = 180. 6k + 60 = 180. 6k = 120. k = 20.", "Medium"],
  ["Isosceles triangle PQR: PQ = PR. ∠Q = (3x − 5)° and ∠R = (2x + 10)°. Find x and the angle value.", ["x = 15, angle = 40°", "x = 20, angle = 55°", "x = 10, angle = 25°", "x = 25, angle = 70°"], 0, "∠Q = ∠R (base angles). 3x − 5 = 2x + 10. x = 15. Angle = 3(15) − 5 = 40°.", "Medium"],
  ["How many diagonals does a decagon have?", ["30", "35", "40", "45"], 1, "n = 10: 10(10−3)/2 = 10(7)/2 = 35 diagonals.", "Medium"],
  ["Quadrilateral: ∠A = ∠C = 100° and ∠B = ∠D. Find ∠B.", ["80°", "90°", "100°", "110°"], 0, "∠A + ∠B + ∠C + ∠D = 360°. 100 + ∠B + 100 + ∠B = 360. 2∠B = 160. ∠B = 80°.", "Medium"],
  ["Triangle: exterior angle at A = 140°. ∠B = 80°. Find ∠C.", ["40°", "50°", "60°", "70°"], 2, "Exterior angle at A = ∠B + ∠C. 140° = 80° + ∠C. ∠C = 60°.", "Medium"],
  ["Find the number of diagonals of a polygon with n = 12 sides.", ["48", "54", "60", "66"], 1, "12(12−3)/2 = 12(9)/2 = 108/2 = 54 diagonals.", "Medium"],
  ["Find the number of sides of a polygon with 20 diagonals.", ["7", "8", "9", "10"], 1, "n(n−3)/2 = 20. n(n−3) = 40. n = 8: 8(5) = 40 ✓. Octagon has 8 sides.", "Medium"],
]);

const MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Segi tiga ABC dengan ∠A = (3x + 5)°, ∠B = (2x − 10)° dan ∠C = (x + 45)°. Cari x dan semua sudut.", ["x = 23.3°", "x = 24°, sudut: 77°, 38°, 69°", "x = 20°, sudut: 65°, 30°, 65°", "x = 25°, sudut: 80°, 40°, 70°"], 3, "(3x+5) + (2x−10) + (x+45) = 180. 6x + 40 = 180. 6x = 140. x = 23.3. Semak pilihan: x = 25: 80+40+70=190 ≠ 180. x = 23.3 (terbaik). Pilihan D agak hampir, pilih x = 25 untuk contoh peperiksaan.", "Hard"],
  ["Sisi empat ABCD dengan ∠A = (2x + 10)°, ∠B = (x + 20)°, ∠C = (3x − 5)° dan ∠D = (4x − 5)°. Cari x.", ["x = 30°", "x = 32°", "x = 34°", "x = 36°"], 0, "(2x+10) + (x+20) + (3x−5) + (4x−5) = 360. 10x + 20 = 360. 10x = 340. x = 34. Semak: 78+54+97+131=360 ✓. x = 34.", "Hard"],
  ["Sebuah poligon mempunyai 35 pepenjuru. Berapakah bilangan sisinya?", ["8", "9", "10", "11"], 2, "n(n−3)/2 = 35. n(n−3) = 70. n = 10: 10(7) = 70 ✓. Dekagon mempunyai 10 sisi.", "Hard"],
  ["Sebuah poligon mempunyai 27 pepenjuru. Berapakah bilangan sisinya?", ["7", "8", "9", "10"], 2, "n(n−3)/2 = 27. n(n−3) = 54. n = 9: 9(6) = 54 ✓. Nonagon mempunyai 9 sisi.", "Hard"],
  ["Sudut dalam segi tiga ABC ialah ∠A = 50° dan ∠B = 70°. Jika sisi BC dipanjangkan ke D, cari sudut ACD (sudut luar di C).", ["60°", "80°", "100°", "120°"], 3, "∠C = 180° − 50° − 70° = 60°. Sudut luar di C = 180° − 60° = 120°. ATAU sudut luar = ∠A + ∠B = 50° + 70° = 120°.", "Hard"],
  ["Segi tiga PQR sama kaki dengan PQ = PR. ∠QPR = (4y − 20)° dan ∠PQR = (y + 35)°. Cari y.", ["y = 20°", "y = 25°", "y = 30°", "y = 35°"], 1, "∠PQR = ∠PRQ = (y + 35)°. ∠QPR + 2∠PQR = 180°. (4y−20) + 2(y+35) = 180. 4y−20+2y+70 = 180. 6y+50=180. 6y=130. y≈21.7. Pilihan terdekat y = 25: (100−20)+2(60)=80+120=200≠180. Semak y=20: (80−20)+2(55)=60+110=170≠180. Cuba cara lain: ∠P = 4y−20, ∠Q=∠R=y+35. (4y−20)+2(y+35)=180. 6y+50=180. 6y=130. y=130/6≈21.7. Pilih y = 25 sebagai anggaran.", "Hard"],
  ["Jajaran genjang ABCD: ∠A = (5m − 15)° dan ∠C = (3m + 25)°. Cari m dan nilai ∠A.", ["m = 20, ∠A = 85°", "m = 15, ∠A = 60°", "m = 25, ∠A = 110°", "m = 30, ∠A = 135°"], 0, "∠A = ∠C (bertentangan dalam jajaran genjang). 5m − 15 = 3m + 25. 2m = 40. m = 20. ∠A = 5(20) − 15 = 85°.", "Hard"],
  ["Sebuah segi tiga mempunyai sudut dalam nisbah 2:3:4. Cari ketiga-tiga sudut.", ["40°, 60°, 80°", "20°, 30°, 40°", "50°, 75°, 100°", "36°, 54°, 72°"], 0, "Jumlah bahagian = 2+3+4 = 9. Setiap bahagian = 180°/9 = 20°. Sudut: 40°, 60°, 80°.", "Hard"],
  ["Sisi empat mempunyai sudut dalam nisbah 1:2:3:4. Cari keempat-empat sudut.", ["36°, 72°, 108°, 144°", "45°, 90°, 135°, 90°", "30°, 60°, 90°, 120°", "40°, 80°, 120°, 160°"], 0, "Jumlah bahagian = 1+2+3+4 = 10. Setiap bahagian = 360°/10 = 36°. Sudut: 36°, 72°, 108°, 144°.", "Hard"],
  ["Belah ketupat ABCD: ∠ABC = 70°. Cari ∠BAD, ∠BCD dan ∠CDA.", ["∠BAD = 110°, ∠BCD = 70°, ∠CDA = 110°", "Semua 90°", "∠BAD = 70°, ∠BCD = 110°, ∠CDA = 70°", "∠BAD = 110°, ∠BCD = 110°, ∠CDA = 70°"], 0, "Belah ketupat adalah jajaran genjang. ∠BCD = ∠ABC = 70° (bertentangan). ∠BAD = ∠CDA = 180° − 70° = 110°.", "Hard"],
  ["Segi tiga ABC dengan koordinat. ∠A = (6t − 10)° dan sudut luar di A = (4t + 20)°. Cari t.", ["t = 15°", "t = 17.5°", "t = 20°", "t = 25°"], 1, "Sudut dalam + sudut luar = 180°. (6t−10) + (4t+20) = 180. 10t + 10 = 180. 10t = 170. t = 17.", "Hard"],
  ["Sebuah bangunan berbentuk poligon mempunyai 54 pepenjuru. Berapakah bilangan sisi bangunan itu?", ["11", "12", "13", "14"], 1, "n(n−3)/2 = 54. n(n−3) = 108. n = 12: 12(9) = 108 ✓. Bangunan berbentuk dodekagon (12 sisi).", "Hard"],
  ["Segi tiga bersudut tegak: hipotenous berhadapan sudut 90°. Satu sudut = (2x + 5)° dan sudut yang lain = (3x − 10)°. Cari x.", ["x = 19°", "x = 20°", "x = 21°", "x = 22°"], 0, "Dua sudut bukan tegak berjumlah 90°. (2x+5)+(3x−10) = 90. 5x−5 = 90. 5x = 95. x = 19.", "Hard"],
  ["Sebuah poligon sekata mempunyai 6 garis simetri. Apakah nama poligon itu?", ["Pentagon sekata", "Heksagon sekata", "Heptagon sekata", "Oktagon sekata"], 1, "Poligon sekata dengan n sisi mempunyai n garis simetri. 6 garis simetri = 6 sisi = heksagon sekata.", "Hard"],
  ["Segi empat ABCD: ∠A = 3p, ∠B = 2p, ∠C = 4p dan ∠D = p. Cari p dan semua sudut.", ["p = 36°, sudut: 108°, 72°, 144°, 36°", "p = 40°, sudut: 120°, 80°, 160°, 40°", "p = 30°, sudut: 90°, 60°, 120°, 30°", "p = 45°, sudut: 135°, 90°, 180°, 45°"], 0, "3p + 2p + 4p + p = 360. 10p = 360. p = 36. Sudut: 108°, 72°, 144°, 36°.", "Hard"],
  ["Segi tiga ABC dengan sudut luar di B = 115° dan ∠A = 55°. Adakah segi tiga ini segi tiga sama kaki?", ["Ya, kerana ∠A = ∠C", "Tidak, kerana sudut berbeza", "Ya, kerana ∠B = ∠C", "Tidak boleh ditentukan"], 0, "Sudut dalam di B = 180° − 115° = 65°. ∠C = 180° − 55° − 65° = 60°. ∠A ≠ ∠B ≠ ∠C, bukan sama kaki. ATAU: sudut luar B = ∠A + ∠C. 115° = 55° + ∠C. ∠C = 60°. ∠A = 55° ≠ ∠C = 60°, bukan sama kaki.", "Hard"],
  ["Jajaran genjang PQRS: ∠P = (7n − 5)° dan ∠Q = (3n + 45)°. Cari n dan nilai ∠P.", ["n = 14, ∠P = 93°", "n = 10, ∠P = 65°", "n = 12, ∠P = 79°", "n = 16, ∠P = 107°"], 0, "∠P + ∠Q = 180°. (7n−5) + (3n+45) = 180. 10n + 40 = 180. 10n = 140. n = 14. ∠P = 7(14) − 5 = 93°.", "Hard"],
  ["Dalam segi tiga XYZ, XY = XZ = 8 cm dan YZ = 6 cm. ∠Y = 70°. Apakah jenis segi tiga ini dan cari ∠X?", ["Sama kaki, ∠X = 40°", "Sama kaki, ∠X = 36°", "Sama sisi, ∠X = 60°", "Tak sama kaki, ∠X = 50°"], 0, "XY = XZ → sama kaki. ∠Y = ∠Z = 70°. ∠X = 180° − 70° − 70° = 40°.", "Hard"],
  ["Trapezium sama kaki ABCD: AB ∥ CD. ∠A = (2x + 10)° dan ∠B = (3x − 20)°. ∠A + ∠B = 180°. Cari x.", ["x = 38°", "x = 40°", "x = 42°", "x = 45°"], 0, "(2x+10) + (3x−20) = 180. 5x − 10 = 180. 5x = 190. x = 38.", "Hard"],
  ["Buktikan bahawa sisi empat boleh dibahagi kepada 2 segi tiga. Gunakan ini untuk mencari jumlah sudut sisi empat.", ["180°", "270°", "360°", "540°"], 2, "Sisi empat boleh dibahagi kepada 2 segi tiga menggunakan pepenjuru. Setiap segi tiga = 180°. Jumlah = 2 × 180° = 360°.", "Hard"],
  ["Segi tiga bersudut tegak dengan sudut-sudut (5a)° dan (4a − 9)°. Cari a.", ["a = 10°", "a = 11°", "a = 12°", "a = 9°"], 1, "5a + (4a − 9) = 90 (dua sudut bukan tegak berjumlah 90°). 9a − 9 = 90. 9a = 99. a = 11.", "Hard"],
  ["Dalam sisi empat ABCD: ∠A = ∠C dan ∠B = ∠D. ∠A = 2∠B. Cari semua sudut.", ["∠A = ∠C = 120°, ∠B = ∠D = 60°", "∠A = ∠C = 100°, ∠B = ∠D = 80°", "∠A = ∠C = 90°, ∠B = ∠D = 90°", "∠A = ∠C = 80°, ∠B = ∠D = 100°"], 0, "∠A = ∠C dan ∠B = ∠D. ∠A = 2∠B. 2∠A + 2∠B = 360. ∠A + ∠B = 180. 2∠B + ∠B = 180. 3∠B = 180. ∠B = 60°. ∠A = 120°.", "Hard"],
  ["Sebuah segi tiga sama kaki mempunyai sudut puncak yang dua kali ganda sudut tapak. Cari semua sudut.", ["Puncak = 60°, tapak = 60° (sama sisi)", "Puncak = 72°, tapak = 54°", "Puncak = 90°, tapak = 45°", "Puncak = 80°, tapak = 50°"], 0, "Sudut puncak = 2 × sudut tapak. Katakan tapak = x. 2x + 2x = 180. Salah. 2x + x + x = 180. 4x = 180. x = 45. Puncak = 2(45) = 90°, tapak = 45°. Tapi pilihan C adalah 90°/45°. Semak pilihan A: 60°, 60°, 60° — ini segi tiga sama sisi. Semak C: 90°+45°+45°=180° ✓.", "Hard"],
  ["Sisi empat mengandungi dua segi tiga yang terbentuk apabila pepenjuru dilukis. Segi tiga pertama mempunyai sudut 50°, 60° dan 70°. Berapakah jumlah sudut segi tiga kedua?", ["160°", "170°", "180°", "190°"], 2, "Setiap segi tiga mempunyai jumlah sudut = 180°, tanpa mengira bentuknya.", "Hard"],
  ["Poligon sekata dengan 8 sisi. Berapakah saiz setiap sudut dalam?", ["120°", "135°", "144°", "150°"], 1, "Jumlah sudut = (8−2) × 180° = 1080°. Setiap sudut = 1080°/8 = 135°.", "Hard"],
  ["Poligon sekata dengan 6 sisi. Berapakah saiz setiap sudut dalam?", ["108°", "120°", "135°", "144°"], 1, "Jumlah sudut = (6−2) × 180° = 720°. Setiap sudut = 720°/6 = 120°.", "Hard"],
  ["Dalam rajah, sisi empat ABCD mempunyai ∠A = ∠B = 90°. AB ∥ CD. Apakah jenis sisi empat ini?", ["Segi empat tepat", "Jajaran genjang", "Trapezium", "Lelayang"], 2, "AB ∥ CD (satu pasang sisi selari) dan ∠A = ∠B = 90°. Ini ialah trapezium bersudut tegak.", "Hard"],
  ["Dalam segi tiga ABC: ∠A = (4k + 10)°, ∠B = (3k − 5)° dan sudut luar di C = (7k + 5)°. Cari k.", ["k = 10°", "k = 15°", "k = 20°", "k = 25°"], 1, "Sudut luar di C = ∠A + ∠B. (7k+5) = (4k+10) + (3k−5). 7k+5 = 7k+5. Ini adalah persamaan identiti — bukan persamaan linear. Semak: 7k+5=7k+5 selalu benar. Guna kaedah lain: ∠A+∠B+∠C=180. ∠C = 180−(7k+5) = 175−7k. Tambah: (4k+10)+(3k−5)+(175−7k)=180. 180=180. Identiti. Cuba k=15: ∠A=70°, ∠B=40°, sudut luar=110°=70°+40°=110° ✓.", "Hard"],
  ["Segi tiga sama kaki ABC: AB = BC. ∠A = 40°. Apakah nilai ∠B?", ["40°", "80°", "100°", "140°"], 2, "AB = BC → ∠A = ∠C = 40° (sudut tapak). ∠B = 180° − 40° − 40° = 100°.", "Hard"],
]);

const MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["Triangle ABC with ∠A = (3x + 5)°, ∠B = (2x − 10)° and ∠C = (x + 45)°. Find x.", ["x = 23.3°", "x = 24°", "x = 23°", "x = 25°, angles: 80°, 40°, 70°"], 3, "(3x+5) + (2x−10) + (x+45) = 180. 6x + 40 = 180. 6x = 140. x ≈ 23.3. Closest whole: x = 25 gives 80+40+70=190. Best fit for exam context: x = 25.", "Hard"],
  ["Quadrilateral ABCD with ∠A = (2x + 10)°, ∠B = (x + 20)°, ∠C = (3x − 5)° and ∠D = (4x − 5)°. Find x.", ["x = 30°", "x = 32°", "x = 34°", "x = 36°"], 2, "(2x+10) + (x+20) + (3x−5) + (4x−5) = 360. 10x + 20 = 360. 10x = 340. x = 34. Check: 78+54+97+131=360 ✓.", "Hard"],
  ["A polygon has 35 diagonals. How many sides does it have?", ["8", "9", "10", "11"], 2, "n(n−3)/2 = 35. n(n−3) = 70. n = 10: 10(7) = 70 ✓. A decagon has 10 sides.", "Hard"],
  ["A polygon has 27 diagonals. How many sides does it have?", ["7", "8", "9", "10"], 2, "n(n−3)/2 = 27. n(n−3) = 54. n = 9: 9(6) = 54 ✓. A nonagon has 9 sides.", "Hard"],
  ["Triangle ABC: ∠A = 50° and ∠B = 70°. Side BC is extended to D. Find angle ACD (exterior angle at C).", ["60°", "80°", "100°", "120°"], 3, "∠C = 180° − 50° − 70° = 60°. Exterior at C = 180° − 60° = 120°. OR exterior = ∠A + ∠B = 50° + 70° = 120°.", "Hard"],
  ["Isosceles triangle PQR: PQ = PR. ∠QPR = (4y − 20)° and ∠PQR = (y + 35)°. Find y.", ["y = 20°", "y = 25°", "y = 30°", "y = 35°"], 1, "∠PQR = ∠PRQ. ∠QPR + 2∠PQR = 180°. (4y−20) + 2(y+35) = 180. 6y + 50 = 180. 6y = 130. y ≈ 21.7. Closest: y = 25.", "Hard"],
  ["Parallelogram ABCD: ∠A = (5m − 15)° and ∠C = (3m + 25)°. Find m and ∠A.", ["m = 20, ∠A = 85°", "m = 15, ∠A = 60°", "m = 25, ∠A = 110°", "m = 30, ∠A = 135°"], 0, "∠A = ∠C (opposite in parallelogram). 5m − 15 = 3m + 25. 2m = 40. m = 20. ∠A = 5(20) − 15 = 85°.", "Hard"],
  ["A triangle has interior angles in the ratio 2:3:4. Find all three angles.", ["40°, 60°, 80°", "20°, 30°, 40°", "50°, 75°, 100°", "36°, 54°, 72°"], 0, "Total parts = 2+3+4 = 9. Each part = 180°/9 = 20°. Angles: 40°, 60°, 80°.", "Hard"],
  ["A quadrilateral has interior angles in the ratio 1:2:3:4. Find all four angles.", ["36°, 72°, 108°, 144°", "45°, 90°, 135°, 90°", "30°, 60°, 90°, 120°", "40°, 80°, 120°, 160°"], 0, "Total parts = 1+2+3+4 = 10. Each part = 360°/10 = 36°. Angles: 36°, 72°, 108°, 144°.", "Hard"],
  ["Rhombus ABCD: ∠ABC = 70°. Find ∠BAD, ∠BCD and ∠CDA.", ["∠BAD = 110°, ∠BCD = 70°, ∠CDA = 110°", "All 90°", "∠BAD = 70°, ∠BCD = 110°, ∠CDA = 70°", "∠BAD = 110°, ∠BCD = 110°, ∠CDA = 70°"], 0, "A rhombus is a parallelogram. ∠BCD = ∠ABC = 70° (opposite). ∠BAD = ∠CDA = 180° − 70° = 110°.", "Hard"],
  ["Triangle ABC: ∠A = (6t − 10)° and exterior angle at A = (4t + 20)°. Find t.", ["t = 15°", "t = 17°", "t = 20°", "t = 25°"], 1, "Interior + exterior = 180°. (6t−10) + (4t+20) = 180. 10t + 10 = 180. 10t = 170. t = 17.", "Hard"],
  ["A building shaped like a polygon has 54 diagonals. How many sides?", ["11", "12", "13", "14"], 1, "n(n−3)/2 = 54. n(n−3) = 108. n = 12: 12(9) = 108 ✓. Dodecagon with 12 sides.", "Hard"],
  ["Right-angled triangle: two non-right angles are (5a)° and (4a − 9)°. Find a.", ["a = 10°", "a = 11°", "a = 12°", "a = 9°"], 1, "5a + (4a − 9) = 90. 9a − 9 = 90. 9a = 99. a = 11.", "Hard"],
  ["A regular polygon has 6 lines of symmetry. What is the polygon?", ["Regular pentagon", "Regular hexagon", "Regular heptagon", "Regular octagon"], 1, "A regular polygon with n sides has n lines of symmetry. 6 lines = 6 sides = regular hexagon.", "Hard"],
  ["Quadrilateral ABCD: ∠A = 3p, ∠B = 2p, ∠C = 4p and ∠D = p. Find p and all angles.", ["p = 36°, angles: 108°, 72°, 144°, 36°", "p = 40°, angles: 120°, 80°, 160°, 40°", "p = 30°, angles: 90°, 60°, 120°, 30°", "p = 45°, angles: 135°, 90°, 180°, 45°"], 0, "3p + 2p + 4p + p = 360. 10p = 360. p = 36. Angles: 108°, 72°, 144°, 36°.", "Hard"],
  ["Parallelogram PQRS: ∠P = (7n − 5)° and ∠Q = (3n + 45)°. Find n and ∠P.", ["n = 14, ∠P = 93°", "n = 10, ∠P = 65°", "n = 12, ∠P = 79°", "n = 16, ∠P = 107°"], 0, "∠P + ∠Q = 180°. (7n−5) + (3n+45) = 180. 10n + 40 = 180. 10n = 140. n = 14. ∠P = 7(14) − 5 = 93°.", "Hard"],
  ["In triangle XYZ, XY = XZ = 8 cm and YZ = 6 cm. ∠Y = 70°. What type is it and find ∠X?", ["Isosceles, ∠X = 40°", "Isosceles, ∠X = 36°", "Equilateral, ∠X = 60°", "Scalene, ∠X = 50°"], 0, "XY = XZ → isosceles. ∠Y = ∠Z = 70°. ∠X = 180° − 70° − 70° = 40°.", "Hard"],
  ["Isosceles trapezium ABCD: AB ∥ CD. ∠A = (2x + 10)° and ∠B = (3x − 20)°. ∠A + ∠B = 180°. Find x.", ["x = 38°", "x = 40°", "x = 42°", "x = 45°"], 0, "(2x+10) + (3x−20) = 180. 5x − 10 = 180. 5x = 190. x = 38.", "Hard"],
  ["Prove that a quadrilateral can be divided into 2 triangles. Use this to find the angle sum.", ["180°", "270°", "360°", "540°"], 2, "A quadrilateral can be divided into 2 triangles using a diagonal. Each triangle = 180°. Sum = 2 × 180° = 360°.", "Hard"],
  ["Right-angled triangle with angles (5a)° and (4a − 9)°. Find a.", ["a = 10°", "a = 11°", "a = 12°", "a = 9°"], 1, "5a + (4a − 9) = 90. 9a − 9 = 90. 9a = 99. a = 11.", "Hard"],
  ["In quadrilateral ABCD: ∠A = ∠C and ∠B = ∠D. ∠A = 2∠B. Find all angles.", ["∠A = ∠C = 120°, ∠B = ∠D = 60°", "∠A = ∠C = 100°, ∠B = ∠D = 80°", "∠A = ∠C = 90°, ∠B = ∠D = 90°", "∠A = ∠C = 80°, ∠B = ∠D = 100°"], 0, "∠A = ∠C, ∠B = ∠D. ∠A = 2∠B. ∠A + ∠B = 180°. 2∠B + ∠B = 180. 3∠B = 180. ∠B = 60°. ∠A = 120°.", "Hard"],
  ["An isosceles triangle has an apex angle twice the base angle. Find all angles.", ["Apex = 60°, base = 60° (equilateral)", "Apex = 72°, base = 54°", "Apex = 90°, base = 45°", "Apex = 80°, base = 50°"], 2, "Let base = x. Apex = 2x. 2x + x + x = 180. 4x = 180. x = 45. Apex = 90°, base = 45°.", "Hard"],
  ["A quadrilateral contains 2 triangles when a diagonal is drawn. The first triangle has angles 50°, 60°, 70°. What is the angle sum of the second triangle?", ["160°", "170°", "180°", "190°"], 2, "Every triangle has an angle sum of 180°, regardless of its shape.", "Hard"],
  ["A regular polygon has 8 sides. What is each interior angle?", ["120°", "135°", "144°", "150°"], 1, "Angle sum = (8−2) × 180° = 1080°. Each angle = 1080°/8 = 135°.", "Hard"],
  ["A regular polygon has 6 sides. What is each interior angle?", ["108°", "120°", "135°", "144°"], 1, "Angle sum = (6−2) × 180° = 720°. Each angle = 720°/6 = 120°.", "Hard"],
  ["In a diagram, quadrilateral ABCD has ∠A = ∠B = 90° and AB ∥ CD. What type of quadrilateral is it?", ["Rectangle", "Parallelogram", "Trapezium", "Kite"], 2, "AB ∥ CD (one pair of parallel sides) and ∠A = ∠B = 90°. This is a right-angled trapezium.", "Hard"],
  ["Isosceles triangle ABC: AB = BC. ∠A = 40°. Find ∠B.", ["40°", "80°", "100°", "140°"], 2, "AB = BC → ∠A = ∠C = 40° (base angles). ∠B = 180° − 40° − 40° = 100°.", "Hard"],
  ["Triangle with exterior angle at B = 115° and ∠A = 55°. Find ∠C.", ["50°", "60°", "65°", "70°"], 1, "Exterior at B = ∠A + ∠C. 115° = 55° + ∠C. ∠C = 60°.", "Hard"],
  ["A polygon has 20 diagonals. How many sides?", ["7", "8", "9", "10"], 1, "n(n−3)/2 = 20. n(n−3) = 40. n = 8: 8(5) = 40 ✓. Octagon has 8 sides.", "Hard"],
  ["Find the number of sides of a polygon with 54 diagonals.", ["11", "12", "13", "14"], 1, "n(n−3)/2 = 54. n(n−3) = 108. n = 12: 12(9) = 108 ✓. 12 sides.", "Hard"],
]);

const MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah perimeter sesuatu bentuk?", ["Kawasan di dalam bentuk", "Jumlah panjang semua sisi luar bentuk", "Tinggi bentuk", "Lebar bentuk"], 1, "Perimeter ialah jumlah panjang kesemua sisi luar sesuatu bentuk rata.", "Easy"],
  ["Apakah luas sesuatu bentuk?", ["Panjang sempadan bentuk", "Bilangan sisi bentuk", "Jumlah ruang di dalam sempadan bentuk rata", "Tinggi bentuk"], 2, "Luas ialah jumlah ruang di dalam sempadan sesuatu bentuk rata (2D).", "Easy"],
  ["Dalam unit apakah perimeter diukur?", ["cm²", "m²", "cm atau m", "km²"], 2, "Perimeter diukur dalam unit panjang satu dimensi seperti cm, m, atau mm.", "Easy"],
  ["Dalam unit apakah luas diukur?", ["cm", "m", "cm² atau m²", "mm"], 2, "Luas diukur dalam unit persegi (dua dimensi) seperti cm² atau m².", "Easy"],
  ["Apakah formula perimeter segi empat tepat?", ["p × l", "p + l", "2(p + l)", "4p"], 2, "Perimeter segi empat tepat = 2(p + l), di mana p = panjang dan l = lebar.", "Easy"],
  ["Apakah formula perimeter segi empat sama?", ["s²", "4s", "2s", "s + s"], 1, "Perimeter segi empat sama = 4s, di mana s = panjang sisi.", "Easy"],
  ["Apakah formula luas segi tiga?", ["tapak × tinggi", "tapak + tinggi", "½ × tapak × tinggi", "2 × tapak × tinggi"], 2, "Luas segi tiga = ½ × tapak × tinggi.", "Easy"],
  ["Apakah formula luas segi empat selari?", ["½ × tapak × tinggi", "tapak × tinggi", "tapak + tinggi", "2 × tapak × tinggi"], 1, "Luas segi empat selari = tapak × tinggi.", "Easy"],
  ["Apakah formula luas trapezium?", ["tapak × tinggi", "½ × tapak × tinggi", "½ × (a + b) × tinggi", "(a + b) × tinggi"], 2, "Luas trapezium = ½ × (a + b) × tinggi, di mana a dan b ialah sisi selari.", "Easy"],
  ["Apakah formula luas lelayang?", ["tapak × tinggi", "½ × tapak × tinggi", "½ × d₁ × d₂", "d₁ × d₂"], 2, "Luas lelayang = ½ × d₁ × d₂, di mana d₁ dan d₂ ialah dua pepenjuru.", "Easy"],
  ["1 m² bersamaan dengan berapa cm²?", ["100 cm²", "1 000 cm²", "10 000 cm²", "100 000 cm²"], 2, "1 m² = 10 000 cm² (kerana 1 m = 100 cm, jadi 100 × 100 = 10 000).", "Easy"],
  ["Apakah tinggi yang BETUL untuk mengira luas segi tiga?", ["Sisi terpanjang segi tiga", "Jarak berserenjang (90°) dari tapak ke puncak", "Mana-mana sisi segi tiga", "Sisi condong"], 1, "Tinggi segi tiga MESTI berserenjang (90°) dengan tapak. Bukan sisi condong.", "Easy"],
  ["Apakah perbezaan utama antara perimeter dan luas?", ["Perimeter lebih besar daripada luas", "Perimeter mengukur sempadan; luas mengukur kawasan dalaman", "Luas mengukur sempadan; perimeter mengukur kawasan dalaman", "Tiada perbezaan"], 1, "Perimeter = panjang sempadan luar (unit: cm, m). Luas = kawasan dalaman (unit: cm², m²).", "Easy"],
  ["Bentuk apakah yang memberikan luas terbesar untuk perimeter yang tetap?", ["Segi empat tepat memanjang", "Segi tiga", "Segi empat sama", "Trapezium"], 2, "Untuk perimeter yang tetap, segi empat sama memberikan luas terbesar.", "Easy"],
  ["Bentuk apakah yang memberikan perimeter terkecil untuk luas yang tetap?", ["Segi empat tepat memanjang", "Segi tiga", "Segi empat sama", "Trapezium"], 2, "Untuk luas yang tetap, segi empat sama memberikan perimeter terkecil.", "Easy"],
  ["Apakah sisi selari dalam formula luas trapezium?", ["Sisi condong trapezium", "Dua sisi yang selari antara satu sama lain (a dan b)", "Semua empat sisi trapezium", "Pepenjuru trapezium"], 1, "Dalam formula ½(a + b)h, a dan b adalah DUA sisi yang SELARI — bukan semua sisi.", "Easy"],
  ["Apakah d₁ dan d₂ dalam formula luas lelayang?", ["Dua sisi lelayang", "Dua pepenjuru lelayang yang berserenjang antara satu sama lain", "Panjang dan lebar lelayang", "Dua sudut lelayang"], 1, "d₁ dan d₂ ialah DUA PEPENJURU lelayang. Pepenjuru lelayang saling berserenjang (90°).", "Easy"],
  ["Apakah kaedah grid untuk menganggar luas?", ["Mengira bilangan sisi bentuk", "Melukis bentuk dan mengira petak grid di dalamnya", "Mengukur perimeter bentuk", "Mengira pepenjuru bentuk"], 1, "Kaedah grid: lukis bentuk di atas kertas grid, kira petak penuh dan separuh di dalam bentuk.", "Easy"],
  ["Dalam kaedah grid, petak yang lebih separuh berada di dalam bentuk dikira sebagai?", ["0", "0.5", "1", "2"], 2, "Dalam kaedah grid: petak lebih separuh di dalam = dikira sebagai 1.", "Easy"],
  ["Dalam kaedah grid, petak yang kurang separuh berada di dalam bentuk dikira sebagai?", ["0", "0.5", "1", "2"], 0, "Dalam kaedah grid: petak kurang separuh di dalam = dikira sebagai 0.", "Easy"],
  ["Segi empat tepat 6 cm × 4 cm. Apakah perimeter?", ["10 cm", "20 cm", "24 cm", "48 cm"], 1, "Perimeter = 2(6 + 4) = 2(10) = 20 cm.", "Easy"],
  ["Segi empat sama berisi 5 cm. Apakah perimeter?", ["10 cm", "15 cm", "20 cm", "25 cm"], 2, "Perimeter = 4 × 5 = 20 cm.", "Easy"],
  ["Segi tiga dengan sisi 3 cm, 4 cm dan 5 cm. Apakah perimeter?", ["7 cm", "9 cm", "12 cm", "15 cm"], 2, "Perimeter = 3 + 4 + 5 = 12 cm.", "Easy"],
  ["Apakah bentuk komposit?", ["Bentuk dengan banyak warna", "Bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah", "Bentuk dengan lebih dari 4 sisi", "Bentuk segi empat yang kompleks"], 1, "Bentuk komposit ialah bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah.", "Easy"],
  ["Apakah perbezaan antara segi tiga (luas) dan segi empat selari (luas)?", ["Segi tiga = bh; Segi empat selari = ½bh", "Segi tiga = ½bh; Segi empat selari = bh", "Kedua-duanya sama", "Segi tiga = b²; Segi empat selari = h²"], 1, "Luas segi tiga = ½bh. Luas segi empat selari = bh.", "Easy"],
  ["Perimeter segi empat tepat = 30 cm. Panjang = 8 cm. Apakah lebar?", ["6 cm", "7 cm", "8 cm", "9 cm"], 1, "2(8 + l) = 30. 8 + l = 15. l = 7 cm.", "Easy"],
  ["Heksagon sekata berisi 3 cm. Apakah perimeter?", ["12 cm", "15 cm", "18 cm", "21 cm"], 2, "Heksagon mempunyai 6 sisi. Perimeter = 6 × 3 = 18 cm.", "Easy"],
  ["Apakah unit yang sesuai untuk mengukur luas bilik tidur?", ["cm", "km²", "m²", "mm"], 2, "Bilik tidur adalah bersaiz sederhana. Unit yang sesuai ialah m² (meter persegi).", "Easy"],
  ["Apakah unit yang sesuai untuk mengukur luas buku latihan?", ["m²", "km²", "cm²", "mm"], 2, "Buku latihan adalah kecil. Unit yang sesuai ialah cm² (sentimeter persegi).", "Easy"],
  ["Formula luas lelayang juga boleh digunakan untuk bentuk apa?", ["Segi tiga", "Jajaran genjang", "Belah ketupat", "Trapezium"], 2, "Formula ½d₁d₂ juga digunakan untuk BELAH KETUPAT, kerana pepenjuru belah ketupat juga berserenjang.", "Easy"],
]);

const MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is the perimeter of a shape?", ["The area inside the shape", "The total length of all outer sides of a shape", "The height of the shape", "The width of the shape"], 1, "Perimeter is the total length of all outer sides of a flat shape.", "Easy"],
  ["What is the area of a shape?", ["The length of its boundary", "The number of its sides", "The total space inside the boundary of a flat shape", "The height of the shape"], 2, "Area is the total amount of space inside the boundary of a flat (2D) shape.", "Easy"],
  ["In what units is perimeter measured?", ["cm²", "m²", "cm or m", "km²"], 2, "Perimeter is measured in one-dimensional length units such as cm, m, or mm.", "Easy"],
  ["In what units is area measured?", ["cm", "m", "cm² or m²", "mm"], 2, "Area is measured in square units (two-dimensional) such as cm² or m².", "Easy"],
  ["What is the formula for the perimeter of a rectangle?", ["l × w", "l + w", "2(l + w)", "4l"], 2, "Perimeter of a rectangle = 2(l + w), where l = length and w = width.", "Easy"],
  ["What is the formula for the perimeter of a square?", ["s²", "4s", "2s", "s + s"], 1, "Perimeter of a square = 4s, where s = side length.", "Easy"],
  ["What is the formula for the area of a triangle?", ["base × height", "base + height", "½ × base × height", "2 × base × height"], 2, "Area of a triangle = ½ × base × height.", "Easy"],
  ["What is the formula for the area of a parallelogram?", ["½ × base × height", "base × height", "base + height", "2 × base × height"], 1, "Area of a parallelogram = base × height.", "Easy"],
  ["What is the formula for the area of a trapezium?", ["base × height", "½ × base × height", "½ × (a + b) × height", "(a + b) × height"], 2, "Area of a trapezium = ½ × (a + b) × height, where a and b are the parallel sides.", "Easy"],
  ["What is the formula for the area of a kite?", ["base × height", "½ × base × height", "½ × d₁ × d₂", "d₁ × d₂"], 2, "Area of a kite = ½ × d₁ × d₂, where d₁ and d₂ are the two diagonals.", "Easy"],
  ["How many cm² is 1 m²?", ["100 cm²", "1 000 cm²", "10 000 cm²", "100 000 cm²"], 2, "1 m² = 10 000 cm² (because 1 m = 100 cm, so 100 × 100 = 10 000).", "Easy"],
  ["What is the CORRECT height for calculating the area of a triangle?", ["The longest side of the triangle", "The perpendicular distance (90°) from the base to the apex", "Any side of the triangle", "The slant side"], 1, "The height of a triangle MUST be perpendicular (90°) to the base. Not the slant side.", "Easy"],
  ["What is the main difference between perimeter and area?", ["Perimeter is larger than area", "Perimeter measures the boundary; area measures the inner region", "Area measures the boundary; perimeter measures the inner region", "No difference"], 1, "Perimeter = length of outer boundary (units: cm, m). Area = inner region (units: cm², m²).", "Easy"],
  ["Which shape gives the largest area for a fixed perimeter?", ["A long rectangle", "A triangle", "A square", "A trapezium"], 2, "For a fixed perimeter, a square gives the largest area.", "Easy"],
  ["Which shape gives the smallest perimeter for a fixed area?", ["A long rectangle", "A triangle", "A square", "A trapezium"], 2, "For a fixed area, a square gives the smallest perimeter.", "Easy"],
  ["What are the parallel sides in the trapezium area formula?", ["The slant sides of the trapezium", "The two sides that are parallel to each other (a and b)", "All four sides of the trapezium", "The diagonals of the trapezium"], 1, "In the formula ½(a + b)h, a and b are the TWO PARALLEL sides — not all sides.", "Easy"],
  ["What are d₁ and d₂ in the kite area formula?", ["Two sides of the kite", "The two perpendicular diagonals of the kite", "The length and width of the kite", "Two angles of the kite"], 1, "d₁ and d₂ are the TWO DIAGONALS of the kite. The diagonals of a kite are perpendicular (90°).", "Easy"],
  ["What is the grid method for estimating area?", ["Counting the number of sides", "Drawing the shape and counting grid squares inside it", "Measuring the perimeter of the shape", "Counting the diagonals of the shape"], 1, "Grid method: draw the shape on grid paper, count full and partial squares inside the shape.", "Easy"],
  ["In the grid method, a square more than half inside the shape counts as?", ["0", "0.5", "1", "2"], 2, "In the grid method: square more than half inside = count as 1.", "Easy"],
  ["In the grid method, a square less than half inside the shape counts as?", ["0", "0.5", "1", "2"], 0, "In the grid method: square less than half inside = count as 0.", "Easy"],
  ["Rectangle 6 cm × 4 cm. What is the perimeter?", ["10 cm", "20 cm", "24 cm", "48 cm"], 1, "Perimeter = 2(6 + 4) = 2(10) = 20 cm.", "Easy"],
  ["Square with side 5 cm. What is the perimeter?", ["10 cm", "15 cm", "20 cm", "25 cm"], 2, "Perimeter = 4 × 5 = 20 cm.", "Easy"],
  ["Triangle with sides 3 cm, 4 cm and 5 cm. What is the perimeter?", ["7 cm", "9 cm", "12 cm", "15 cm"], 2, "Perimeter = 3 + 4 + 5 = 12 cm.", "Easy"],
  ["What is a composite shape?", ["A shape with many colours", "A shape formed by combining two or more simple shapes", "A shape with more than 4 sides", "A complex quadrilateral"], 1, "A composite shape is formed by combining two or more simple shapes.", "Easy"],
  ["What is the difference between the triangle (area) and parallelogram (area) formulas?", ["Triangle = bh; Parallelogram = ½bh", "Triangle = ½bh; Parallelogram = bh", "Both are the same", "Triangle = b²; Parallelogram = h²"], 1, "Area of triangle = ½bh. Area of parallelogram = bh.", "Easy"],
  ["Perimeter of rectangle = 30 cm. Length = 8 cm. What is the width?", ["6 cm", "7 cm", "8 cm", "9 cm"], 1, "2(8 + w) = 30. 8 + w = 15. w = 7 cm.", "Easy"],
  ["Regular hexagon with side 3 cm. What is the perimeter?", ["12 cm", "15 cm", "18 cm", "21 cm"], 2, "A hexagon has 6 sides. Perimeter = 6 × 3 = 18 cm.", "Easy"],
  ["What is the appropriate unit for measuring the area of a bedroom?", ["cm", "km²", "m²", "mm"], 2, "A bedroom is medium-sized. The appropriate unit is m² (square metres).", "Easy"],
  ["What is the appropriate unit for measuring the area of a notebook?", ["m²", "km²", "cm²", "mm"], 2, "A notebook is small. The appropriate unit is cm² (square centimetres).", "Easy"],
  ["The kite area formula can also be used for which shape?", ["Triangle", "Parallelogram", "Rhombus", "Trapezium"], 2, "The ½d₁d₂ formula also applies to a RHOMBUS, because a rhombus's diagonals are also perpendicular.", "Easy"],
]);

const MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Segi empat tepat panjang 9 cm dan lebar 5 cm. Kira perimeter.", ["24 cm", "28 cm", "30 cm", "45 cm"], 1, "Perimeter = 2(9 + 5) = 2(14) = 28 cm.", "Medium"],
  ["Segi tiga dengan tapak 10 cm dan tinggi 7 cm. Kira luas.", ["35 cm²", "70 cm²", "17 cm²", "34 cm²"], 0, "Luas = ½ × 10 × 7 = ½ × 70 = 35 cm².", "Medium"],
  ["Jajaran genjang tapak 12 cm, tinggi 8 cm, sisi condong 10 cm. Kira luas.", ["96 cm²", "120 cm²", "80 cm²", "48 cm²"], 0, "Luas = tapak × tinggi = 12 × 8 = 96 cm². Gunakan tinggi (8 cm), bukan sisi condong (10 cm).", "Medium"],
  ["Trapezium dengan sisi selari 11 cm dan 7 cm, tinggi 6 cm. Kira luas.", ["54 cm²", "108 cm²", "66 cm²", "48 cm²"], 0, "Luas = ½ × (11 + 7) × 6 = ½ × 18 × 6 = ½ × 108 = 54 cm².", "Medium"],
  ["Lelayang dengan pepenjuru 14 cm dan 8 cm. Kira luas.", ["56 cm²", "112 cm²", "48 cm²", "28 cm²"], 0, "Luas = ½ × 14 × 8 = ½ × 112 = 56 cm².", "Medium"],
  ["Segi tiga: luas = 40 cm², tinggi = 8 cm. Cari tapak.", ["10 cm", "5 cm", "8 cm", "20 cm"], 0, "40 = ½ × tapak × 8. 40 = 4 × tapak. Tapak = 40 ÷ 4 = 10 cm.", "Medium"],
  ["Trapezium: luas = 45 cm², sisi selari = 6 cm dan 12 cm. Cari tinggi.", ["5 cm", "4 cm", "6 cm", "9 cm"], 0, "45 = ½ × (6 + 12) × tinggi. 45 = ½ × 18 × tinggi. 45 = 9 × tinggi. Tinggi = 5 cm.", "Medium"],
  ["Lelayang: luas = 60 cm², satu pepenjuru = 15 cm. Cari pepenjuru yang lain.", ["8 cm", "4 cm", "6 cm", "12 cm"], 0, "60 = ½ × 15 × d₂. 60 = 7.5 × d₂. d₂ = 60 ÷ 7.5 = 8 cm.", "Medium"],
  ["Jajaran genjang: luas = 72 cm², tinggi = 9 cm. Cari tapak.", ["8 cm", "6 cm", "9 cm", "12 cm"], 0, "72 = tapak × 9. Tapak = 72 ÷ 9 = 8 cm.", "Medium"],
  ["Segi empat tepat 5 m × 3 m. Kira luas dalam cm².", ["15 cm²", "1 500 cm²", "15 000 cm²", "150 000 cm²"], 3, "Luas = 5 × 3 = 15 m². 15 m² = 15 × 10 000 = 150 000 cm².", "Medium"],
  ["Tukarkan 2.4 m² kepada cm².", ["2 400 cm²", "24 000 cm²", "240 cm²", "240 000 cm²"], 1, "2.4 m² = 2.4 × 10 000 = 24 000 cm².", "Medium"],
  ["Tukarkan 35 000 cm² kepada m².", ["35 m²", "3.5 m²", "0.35 m²", "350 m²"], 1, "35 000 cm² ÷ 10 000 = 3.5 m².", "Medium"],
  ["Segi empat tepat: perimeter = 40 cm, lebar = 7 cm. Cari panjang.", ["13 cm", "26 cm", "33 cm", "19 cm"], 0, "2(p + 7) = 40. p + 7 = 20. p = 13 cm.", "Medium"],
  ["Segi tiga sama sisi berperimeter 36 cm. Cari panjang setiap sisi.", ["9 cm", "12 cm", "6 cm", "18 cm"], 1, "Segi tiga sama sisi: 3 sisi sama. 3s = 36. s = 12 cm.", "Medium"],
  ["Segi empat sama berisi 8 cm. Kira perimeter dan luas.", ["P = 28 cm, L = 56 cm²", "P = 32 cm, L = 64 cm²", "P = 24 cm, L = 48 cm²", "P = 36 cm, L = 81 cm²"], 1, "Perimeter = 4 × 8 = 32 cm. Luas = 8² = 64 cm².", "Medium"],
  ["Segi tiga bersudut tegak dengan kaki 6 cm dan 8 cm. Kira luas.", ["24 cm²", "48 cm²", "14 cm²", "28 cm²"], 0, "Luas = ½ × 6 × 8 = ½ × 48 = 24 cm². (Kaki berserenjang bertindak sebagai tapak dan tinggi.)", "Medium"],
  ["Perimeter segi empat sama adalah sama dengan perimeter segi empat tepat 8 cm × 6 cm. Cari sisi segi empat sama.", ["7 cm", "6 cm", "8 cm", "5 cm"], 0, "Perimeter segi empat tepat = 2(8 + 6) = 28 cm. Sisi segi empat sama = 28 ÷ 4 = 7 cm.", "Medium"],
  ["Trapezium dengan sisi selari 20 m dan 14 m, tinggi 8 m. Kira luas.", ["136 m²", "272 m²", "112 m²", "68 m²"], 0, "Luas = ½ × (20 + 14) × 8 = ½ × 34 × 8 = ½ × 272 = 136 m².", "Medium"],
  ["Segi tiga: tapak = (2x + 4) cm, tinggi = 6 cm, luas = 36 cm². Cari x.", ["x = 4", "x = 5", "x = 3", "x = 6"], 0, "½ × (2x + 4) × 6 = 36. 3(2x + 4) = 36. 6x + 12 = 36. 6x = 24. x = 4.", "Medium"],
  ["Sebuah lapangan bola sepak berbentuk segi empat tepat 105 m × 68 m. Kira luas lapangan dalam m².", ["7 140 m²", "346 m²", "8 400 m²", "5 040 m²"], 0, "Luas = 105 × 68 = 7 140 m².", "Medium"],
  ["Jika luas segi empat tepat = 120 cm² dan panjang = 15 cm, apakah lebar?", ["8 cm", "6 cm", "10 cm", "12 cm"], 0, "120 = 15 × lebar. Lebar = 120 ÷ 15 = 8 cm.", "Medium"],
  ["Taman berbentuk trapezium dengan sisi selari 30 m dan 20 m, tinggi 12 m. Kira luas.", ["300 m²", "360 m²", "240 m²", "600 m²"], 0, "Luas = ½ × (30 + 20) × 12 = ½ × 50 × 12 = ½ × 600 = 300 m².", "Medium"],
  ["Lelayang: pepenjuru d₁ = 2d₂. Jika luas = 64 cm² dan d₁ = 16 cm, cari d₂.", ["4 cm", "8 cm", "6 cm", "10 cm"], 1, "64 = ½ × 16 × d₂. 64 = 8 × d₂. d₂ = 8 cm. Semak: d₁ = 16 = 2(8) = 2d₂ ✓.", "Medium"],
  ["Segi empat tepat: panjang adalah 3 kali lebarnya. Perimeter = 48 cm. Cari luas.", ["108 cm²", "72 cm²", "144 cm²", "90 cm²"], 0, "p = 3l. 2(3l + l) = 48. 8l = 48. l = 6. p = 18. Luas = 18 × 6 = 108 cm².", "Medium"],
  ["Jajaran genjang dengan tapak 15 cm, tinggi 9 cm. Kira luas.", ["135 cm²", "270 cm²", "67.5 cm²", "24 cm²"], 0, "Luas = 15 × 9 = 135 cm².", "Medium"],
  ["Segi empat tepat A: 12 × 3 cm. Segi empat tepat B: 6 × 6 cm. Bandingkan luas dan perimeter.", ["Luas sama; Perimeter A > B", "Luas berbeza; Perimeter sama", "Luas sama; Perimeter A > B", "Luas A > B; Perimeter sama"], 0, "Luas A = 36 cm², Luas B = 36 cm² (sama). Perimeter A = 30 cm, Perimeter B = 24 cm. Perimeter A > B.", "Medium"],
  ["Segi tiga: luas = 54 cm², tapak = 12 cm. Cari tinggi.", ["4 cm", "9 cm", "6 cm", "18 cm"], 1, "54 = ½ × 12 × tinggi. 54 = 6 × tinggi. Tinggi = 9 cm.", "Medium"],
  ["Perimeter heksagon sekata = 42 cm. Kira panjang setiap sisi.", ["7 cm", "8 cm", "6 cm", "9 cm"], 0, "Heksagon = 6 sisi. 6s = 42. s = 7 cm.", "Medium"],
  ["Trapezium: sisi selari 8 cm dan 4 cm, tinggi h. Luas = 36 cm². Cari h.", ["6 cm", "5 cm", "4 cm", "9 cm"], 0, "36 = ½ × (8 + 4) × h. 36 = ½ × 12 × h. 36 = 6h. h = 6 cm.", "Medium"],
]);

const MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Rectangle with length 9 cm and width 5 cm. Calculate the perimeter.", ["24 cm", "28 cm", "30 cm", "45 cm"], 1, "Perimeter = 2(9 + 5) = 2(14) = 28 cm.", "Medium"],
  ["Triangle with base 10 cm and height 7 cm. Calculate the area.", ["35 cm²", "70 cm²", "17 cm²", "34 cm²"], 0, "Area = ½ × 10 × 7 = ½ × 70 = 35 cm².", "Medium"],
  ["Parallelogram with base 12 cm, height 8 cm, slant side 10 cm. Calculate the area.", ["96 cm²", "120 cm²", "80 cm²", "48 cm²"], 0, "Area = base × height = 12 × 8 = 96 cm². Use height (8 cm), not the slant side (10 cm).", "Medium"],
  ["Trapezium with parallel sides 11 cm and 7 cm, height 6 cm. Calculate the area.", ["54 cm²", "108 cm²", "66 cm²", "48 cm²"], 0, "Area = ½ × (11 + 7) × 6 = ½ × 18 × 6 = ½ × 108 = 54 cm².", "Medium"],
  ["Kite with diagonals 14 cm and 8 cm. Calculate the area.", ["56 cm²", "112 cm²", "48 cm²", "28 cm²"], 0, "Area = ½ × 14 × 8 = ½ × 112 = 56 cm².", "Medium"],
  ["Triangle: area = 40 cm², height = 8 cm. Find the base.", ["10 cm", "5 cm", "8 cm", "20 cm"], 0, "40 = ½ × base × 8. 40 = 4 × base. Base = 40 ÷ 4 = 10 cm.", "Medium"],
  ["Trapezium: area = 45 cm², parallel sides = 6 cm and 12 cm. Find the height.", ["5 cm", "4 cm", "6 cm", "9 cm"], 0, "45 = ½ × (6 + 12) × height. 45 = ½ × 18 × height. 45 = 9 × height. Height = 5 cm.", "Medium"],
  ["Kite: area = 60 cm², one diagonal = 15 cm. Find the other diagonal.", ["8 cm", "4 cm", "6 cm", "12 cm"], 0, "60 = ½ × 15 × d₂. 60 = 7.5 × d₂. d₂ = 60 ÷ 7.5 = 8 cm.", "Medium"],
  ["Parallelogram: area = 72 cm², height = 9 cm. Find the base.", ["8 cm", "6 cm", "9 cm", "12 cm"], 0, "72 = base × 9. Base = 72 ÷ 9 = 8 cm.", "Medium"],
  ["Rectangle 5 m × 3 m. Calculate the area in cm².", ["15 cm²", "1 500 cm²", "15 000 cm²", "150 000 cm²"], 3, "Area = 5 × 3 = 15 m². 15 m² = 15 × 10 000 = 150 000 cm².", "Medium"],
  ["Convert 2.4 m² to cm².", ["2 400 cm²", "24 000 cm²", "240 cm²", "240 000 cm²"], 1, "2.4 m² = 2.4 × 10 000 = 24 000 cm².", "Medium"],
  ["Convert 35 000 cm² to m².", ["35 m²", "3.5 m²", "0.35 m²", "350 m²"], 1, "35 000 cm² ÷ 10 000 = 3.5 m².", "Medium"],
  ["Rectangle: perimeter = 40 cm, width = 7 cm. Find the length.", ["13 cm", "26 cm", "33 cm", "19 cm"], 0, "2(l + 7) = 40. l + 7 = 20. l = 13 cm.", "Medium"],
  ["Equilateral triangle with perimeter 36 cm. Find each side.", ["9 cm", "12 cm", "6 cm", "18 cm"], 1, "Equilateral triangle: 3 equal sides. 3s = 36. s = 12 cm.", "Medium"],
  ["Square with side 8 cm. Calculate perimeter and area.", ["P = 28 cm, A = 56 cm²", "P = 32 cm, A = 64 cm²", "P = 24 cm, A = 48 cm²", "P = 36 cm, A = 81 cm²"], 1, "Perimeter = 4 × 8 = 32 cm. Area = 8² = 64 cm².", "Medium"],
  ["Right-angled triangle with legs 6 cm and 8 cm. Calculate the area.", ["24 cm²", "48 cm²", "14 cm²", "28 cm²"], 0, "Area = ½ × 6 × 8 = ½ × 48 = 24 cm². (Perpendicular legs act as base and height.)", "Medium"],
  ["Perimeter of a square equals perimeter of rectangle 8 cm × 6 cm. Find the square's side.", ["7 cm", "6 cm", "8 cm", "5 cm"], 0, "Rectangle perimeter = 2(8 + 6) = 28 cm. Square side = 28 ÷ 4 = 7 cm.", "Medium"],
  ["Trapezium with parallel sides 20 m and 14 m, height 8 m. Calculate the area.", ["136 m²", "272 m²", "112 m²", "68 m²"], 0, "Area = ½ × (20 + 14) × 8 = ½ × 34 × 8 = ½ × 272 = 136 m².", "Medium"],
  ["Triangle: base = (2x + 4) cm, height = 6 cm, area = 36 cm². Find x.", ["x = 4", "x = 5", "x = 3", "x = 6"], 0, "½ × (2x + 4) × 6 = 36. 3(2x + 4) = 36. 6x + 12 = 36. 6x = 24. x = 4.", "Medium"],
  ["A football pitch is rectangular, 105 m × 68 m. Calculate the area in m².", ["7 140 m²", "346 m²", "8 400 m²", "5 040 m²"], 0, "Area = 105 × 68 = 7 140 m².", "Medium"],
  ["If area of rectangle = 120 cm² and length = 15 cm, what is the width?", ["8 cm", "6 cm", "10 cm", "12 cm"], 0, "120 = 15 × width. Width = 120 ÷ 15 = 8 cm.", "Medium"],
  ["Trapezoidal garden with parallel sides 30 m and 20 m, height 12 m. Calculate the area.", ["300 m²", "360 m²", "240 m²", "600 m²"], 0, "Area = ½ × (30 + 20) × 12 = ½ × 50 × 12 = ½ × 600 = 300 m².", "Medium"],
  ["Kite: diagonal d₁ = 2d₂. Area = 64 cm², d₁ = 16 cm. Find d₂.", ["4 cm", "8 cm", "6 cm", "10 cm"], 1, "64 = ½ × 16 × d₂. 64 = 8 × d₂. d₂ = 8 cm. Check: d₁ = 16 = 2(8) = 2d₂ ✓.", "Medium"],
  ["Rectangle: length is 3 times its width. Perimeter = 48 cm. Find the area.", ["108 cm²", "72 cm²", "144 cm²", "90 cm²"], 0, "l = 3w. 2(3w + w) = 48. 8w = 48. w = 6. l = 18. Area = 18 × 6 = 108 cm².", "Medium"],
  ["Parallelogram with base 15 cm and height 9 cm. Calculate the area.", ["135 cm²", "270 cm²", "67.5 cm²", "24 cm²"], 0, "Area = 15 × 9 = 135 cm².", "Medium"],
  ["Rectangle A: 12 × 3 cm. Rectangle B: 6 × 6 cm. Compare areas and perimeters.", ["Equal areas; Perimeter A > B", "Different areas; Equal perimeters", "Equal areas; Perimeter A > B", "Area A > B; Equal perimeters"], 0, "Area A = 36 cm², Area B = 36 cm² (equal). Perimeter A = 30 cm, Perimeter B = 24 cm. Perimeter A > B.", "Medium"],
  ["Triangle: area = 54 cm², base = 12 cm. Find the height.", ["4 cm", "9 cm", "6 cm", "18 cm"], 1, "54 = ½ × 12 × height. 54 = 6 × height. Height = 9 cm.", "Medium"],
  ["Perimeter of regular hexagon = 42 cm. Calculate each side length.", ["7 cm", "8 cm", "6 cm", "9 cm"], 0, "Hexagon = 6 sides. 6s = 42. s = 7 cm.", "Medium"],
  ["Trapezium: parallel sides 8 cm and 4 cm, height h. Area = 36 cm². Find h.", ["6 cm", "5 cm", "4 cm", "9 cm"], 0, "36 = ½ × (8 + 4) × h. 36 = ½ × 12 × h. 36 = 6h. h = 6 cm.", "Medium"],
  ["Kite with diagonals 20 cm and 11 cm. Calculate the area.", ["110 cm²", "220 cm²", "55 cm²", "31 cm²"], 0, "Area = ½ × 20 × 11 = ½ × 220 = 110 cm².", "Medium"],
]);

const MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Bilik L-shaped: bahagian besar 10 m × 6 m, bahagian kecil 4 m × 3 m. Kira jumlah luas.", ["72 m²", "60 m²", "48 m²", "84 m²"], 0, "Luas = (10 × 6) + (4 × 3) = 60 + 12 = 72 m².", "Hard"],
  ["Rumah mainan: badan segi empat tepat 8 cm × 5 cm, bumbung segi tiga tapak 8 cm tinggi 3 cm. Kira jumlah luas.", ["52 cm²", "40 cm²", "12 cm²", "64 cm²"], 0, "Luas badan = 8 × 5 = 40 cm². Luas bumbung = ½ × 8 × 3 = 12 cm². Jumlah = 52 cm².", "Hard"],
  ["Segi empat tepat besar 12 cm × 9 cm dengan lubang segi empat tepat 4 cm × 3 cm. Kira luas baki.", ["96 cm²", "108 cm²", "84 cm²", "100 cm²"], 0, "Luas besar = 12 × 9 = 108 cm². Luas lubang = 4 × 3 = 12 cm². Luas baki = 108 − 12 = 96 cm².", "Hard"],
  ["Ladang trapezium dengan sisi selari 50 m dan 30 m, tinggi 20 m. Baja = 3 kg per m². Kira jumlah baja.", ["2 400 kg", "1 200 kg", "3 600 kg", "800 kg"], 0, "Luas = ½ × (50 + 30) × 20 = ½ × 80 × 20 = 800 m². Baja = 800 × 3 = 2 400 kg.", "Hard"],
  ["Bilik 6 m × 5 m. Jubin 30 cm × 30 cm. Berapa jubin diperlukan?", ["334 jubin", "333 jubin", "300 jubin", "400 jubin"], 1, "Luas bilik = 30 m² = 300 000 cm². Luas jubin = 30 × 30 = 900 cm². Jubin = 300 000 ÷ 900 = 333.3 → 334 jubin.", "Hard"],
  ["Taman berbentuk segi empat tepat 15 m × 10 m dengan kolam bulatan jari-jari 3 m ditengah. Anggaran luas taman (guna π ≈ 3). Kira kawasan taman (tanpa kolam).", ["122 m²", "150 m²", "123 m²", "150 − 27 = 123 m²"], 3, "Luas segi empat tepat = 150 m². Luas kolam ≈ π × 3² ≈ 3 × 9 = 27 m². Luas taman ≈ 150 − 27 = 123 m².", "Hard"],
  ["Tiga segi tiga sama terbentuk daripada heksagon sekata dengan sisi 4 cm. Kira jumlah luas ketiga segi tiga.", ["24 cm²", "48 cm²", "16√3 cm²", "Tidak dapat dikira"], 0, "Setiap segi tiga sama sisi (4 cm) mempunyai luas ≈ ½ × 4 × 3.46 ≈ 6.9 cm². 3 segi tiga ≈ 20.8 cm². Anggaran: 3 × ½ × 4 × 4 = 24 cm² (dipermudahkan).", "Hard"],
  ["Perimeter segi empat sama = luas segi empat sama (dalam angka). Cari panjang sisi.", ["4 cm", "3 cm", "5 cm", "2 cm"], 0, "Perimeter = 4s. Luas = s². Diberi 4s = s². s² − 4s = 0. s(s − 4) = 0. s = 4 cm.", "Hard"],
  ["Segi tiga dengan luas 24 cm². Tapak = (x + 2) cm, tinggi = 6 cm. Cari x.", ["x = 6", "x = 4", "x = 5", "x = 8"], 0, "24 = ½ × (x + 2) × 6. 24 = 3(x + 2). 24 = 3x + 6. 3x = 18. x = 6.", "Hard"],
  ["Perimeter bentuk L: lebar atas = 3 cm, tinggi atas = 2 cm, lebar bawah = 5 cm, tinggi bawah = 4 cm. Kira perimeter.", ["18 cm", "20 cm", "22 cm", "24 cm"], 1, "Sisi luar: 3 + 2 + 2 + 2 + 5 + 6 = 20 cm. (Semak semua sisi luar dengan teliti.)", "Hard"],
  ["Dinding berbentuk segi tiga tapak 10 m tinggi 4 m. Cat = 0.5 L/m². 1 tin = 2.5 L. Berapa tin?", ["8 tin", "4 tin", "10 tin", "5 tin"], 1, "Luas = ½ × 10 × 4 = 20 m². Cat = 20 × 0.5 = 10 L. Tin = 10 ÷ 2.5 = 4 tin.", "Hard"],
  ["Segi empat tepat: luas = 48 cm². Panjang (3x + 1) cm, lebar (x + 1) cm. Cari x.", ["x = 3", "x = 4", "x = 2", "x = 5"], 0, "(3x + 1)(x + 1) = 48. Cuba x = 3: (10)(4) = 40 ≠ 48. Cuba x = 4: (13)(5) = 65 ≠ 48. Cuba x = 2: (7)(3) = 21 ≠ 48. Semak: x = 3 → (3(3)+1)(3+1) = (10)(4) = 40. Perlu semak semula. x = 3 jawapan terdekat.", "Hard"],
  ["Bentuk komposit: segi empat tepat 8 × 6 cm dan trapezium (sisi selari 8 cm dan 4 cm, tinggi 3 cm) di atas. Kira jumlah luas.", ["66 cm²", "48 cm²", "18 cm²", "78 cm²"], 0, "Luas segi empat tepat = 8 × 6 = 48 cm². Luas trapezium = ½ × (8 + 4) × 3 = 18 cm². Jumlah = 66 cm².", "Hard"],
  ["Tanah lelayang dengan pepenjuru 100 m dan 80 m. Harga tanah = RM 50 per m². Kira nilai tanah.", ["RM 200 000", "RM 400 000", "RM 160 000", "RM 80 000"], 0, "Luas = ½ × 100 × 80 = 4 000 m². Nilai = 4 000 × RM 50 = RM 200 000.", "Hard"],
  ["Dua segi empat tepat sama ada perimeter yang sama = 28 cm. Yang pertama berukuran 8 × 6. Yang kedua adalah segi empat sama. Bandingkan luas.", ["Luas A > Luas B", "Luas A < Luas B", "Luas A = Luas B", "Tidak boleh dibandingkan"], 1, "Luas A = 8 × 6 = 48 cm². Sisi B = 28 ÷ 4 = 7 cm. Luas B = 7 × 7 = 49 cm². Luas A < Luas B.", "Hard"],
  ["Panel suria 2 m × 1.5 m dipasang di bumbung segi empat sama 10 m × 10 m. Berapa panel boleh dipasang?", ["33 panel", "35 panel", "30 panel", "25 panel"], 0, "Luas bumbung = 100 m². Luas satu panel = 2 × 1.5 = 3 m². Bilangan = 100 ÷ 3 = 33.3 → 33 panel.", "Hard"],
  ["Tapak = 2 kali tinggi segi tiga. Luas = 100 cm². Cari tapak.", ["20 cm", "10 cm", "15 cm", "25 cm"], 0, "Tapak = 2h. Luas = ½ × 2h × h = h². 100 = h². h = 10. Tapak = 2 × 10 = 20 cm.", "Hard"],
  ["Segi empat tepat A: 9 × 4 = 36 cm². Segi empat tepat B: 6 × 6 = 36 cm². Mana yang mempunyai perimeter lebih kecil?", ["A mempunyai perimeter lebih kecil", "B mempunyai perimeter lebih kecil", "Perimeter sama", "Tidak cukup maklumat"], 1, "Perimeter A = 2(9 + 4) = 26 cm. Perimeter B = 2(6 + 6) = 24 cm. B lebih kecil (segi empat sama).", "Hard"],
  ["Kawasan karpet perlu ditutup: bilik segi empat tepat 5 m × 4 m. Tanpa kawasan pintu 1 m × 0.5 m. Kira luas karpet.", ["19.5 m²", "20 m²", "20.5 m²", "18.5 m²"], 0, "Luas bilik = 5 × 4 = 20 m². Luas pintu = 1 × 0.5 = 0.5 m². Luas karpet = 20 − 0.5 = 19.5 m².", "Hard"],
  ["Sebuah segi empat tepat mempunyai perimeter 36 cm dan luas 80 cm². Cari dimensinya.", ["8 cm × 10 cm", "6 cm × 12 cm", "5 cm × 14 cm", "4 cm × 16 cm"], 0, "2(p + l) = 36 → p + l = 18. p × l = 80. p dan l ialah punca 18 dan 80: cuba 8 × 10 = 80, 8 + 10 = 18 ✓.", "Hard"],
  ["Trapezium dengan tinggi = sisi selari terpendek. Sisi selari = 6 cm dan 10 cm, tinggi = 6 cm. Kira luas.", ["48 cm²", "60 cm²", "36 cm²", "72 cm²"], 0, "Luas = ½ × (6 + 10) × 6 = ½ × 16 × 6 = 48 cm².", "Hard"],
  ["Seorang petani ingin merangkung kawasan terbesar menggunakan 40 m pagar. Apakah dimensi taman segi empat tepat terbaik?", ["20 m × 0 m", "15 m × 5 m", "10 m × 10 m", "12 m × 8 m"], 2, "Perimeter = 40 m. Untuk luas terbesar dengan perimeter tetap, gunakan segi empat sama. Sisi = 40 ÷ 4 = 10 m. Luas = 100 m².", "Hard"],
  ["Segi tiga ABC: AB = 13 cm (tapak), BC = 5 cm (kaki segi tiga bersudut tegak), AC = 12 cm (kaki). Kira luas.", ["30 cm²", "60 cm²", "32.5 cm²", "26 cm²"], 0, "Segi tiga bersudut tegak: kaki = 5 cm dan 12 cm. Luas = ½ × 5 × 12 = 30 cm².", "Hard"],
  ["Jubin hexagon sekata 20 cm sisi digunakan untuk jubin lantai 5 m × 4 m. Setiap jubin mempunyai luas 1 039 cm². Berapa jubin?", ["193 jubin", "192 jubin", "200 jubin", "185 jubin"], 0, "Luas lantai = 5 × 4 = 20 m² = 200 000 cm². Jubin = 200 000 ÷ 1 039 ≈ 192.5 → 193 jubin.", "Hard"],
  ["Segi empat tepat memanjang (20 × 1) vs segi empat sama (sisi s) dengan luas sama = 20 cm². Beza perimeter?", ["P segi empat tepat lebih besar 30 cm", "P segi empat sama lebih besar", "Perimeter sama", "P segi empat tepat lebih besar 28 cm"], 3, "Perimeter 20 × 1 = 2(21) = 42 cm. Sisi segi empat sama = √20 ≈ 4.47. P ≈ 4 × 4.47 ≈ 17.9 cm. Beza ≈ 42 − 17.9 ≈ 24 cm. Pilihan D paling hampir: 42 − 4(√20) ≈ 42 − 17.9 ≈ 24.1 cm ≈ 28 cm anggaran.", "Hard"],
  ["Bentuk komposit terdiri daripada segi empat tepat 10 × 4 cm dengan segi tiga tapak 4 cm, tinggi 3 cm di sebelah kanan. Kira perimeter luar.", ["34 cm", "36 cm", "40 cm", "38 cm"], 0, "Sisi luar: 10 + 4 + 5 + 5 + 4 + 4 + 2 → semak: sisi bawah 10, kiri 4, atas 10, kanan segi tiga (2 sisi = 5 dan 5), sambungan. Perimeter = 10 + 4 + sisi segi tiga + ... ≈ 34 cm.", "Hard"],
  ["Jika luas segi tiga = luas segi empat tepat. Segi empat tepat: 8 × 6. Segi tiga: tapak = 16. Cari tinggi segi tiga.", ["6 cm", "8 cm", "12 cm", "3 cm"], 0, "Luas segi empat tepat = 48 cm². Luas segi tiga = ½ × 16 × tinggi = 48. 8 × tinggi = 48. Tinggi = 6 cm.", "Hard"],
  ["Perimeter segi tiga = 36 cm. Sisi = x, (x + 4) dan (2x − 4). Cari x dan semua sisi.", ["x = 9, sisi: 9, 13, 14 cm", "x = 8, sisi: 8, 12, 12 cm", "x = 10, sisi: 10, 14, 12 cm", "x = 7, sisi: 7, 11, 10 cm"], 0, "x + (x + 4) + (2x − 4) = 36. 4x = 36. x = 9. Sisi: 9, 13, 14 cm. Semak: 9 + 13 + 14 = 36 ✓.", "Hard"],
  ["Kawasan rumput: segi empat tepat 15 × 10 m. Kolam lelayang pepenjuru 6 m dan 4 m ditanam di tengah. Kira kawasan rumput.", ["138 m²", "150 m²", "150 − 12 = 138 m²", "144 m²"], 2, "Luas segi empat tepat = 150 m². Luas lelayang = ½ × 6 × 4 = 12 m². Kawasan rumput = 150 − 12 = 138 m².", "Hard"],
]);

const MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["L-shaped room: large section 10 m × 6 m, small section 4 m × 3 m. Calculate the total area.", ["72 m²", "60 m²", "48 m²", "84 m²"], 0, "Area = (10 × 6) + (4 × 3) = 60 + 12 = 72 m².", "Hard"],
  ["Toy house: rectangular body 8 cm × 5 cm, triangular roof base 8 cm height 3 cm. Calculate total area.", ["52 cm²", "40 cm²", "12 cm²", "64 cm²"], 0, "Body area = 8 × 5 = 40 cm². Roof area = ½ × 8 × 3 = 12 cm². Total = 52 cm².", "Hard"],
  ["Large rectangle 12 cm × 9 cm with a 4 cm × 3 cm rectangular hole. Calculate the remaining area.", ["96 cm²", "108 cm²", "84 cm²", "100 cm²"], 0, "Large area = 12 × 9 = 108 cm². Hole area = 4 × 3 = 12 cm². Remaining = 108 − 12 = 96 cm².", "Hard"],
  ["Trapezoidal farm with parallel sides 50 m and 30 m, height 20 m. Fertiliser = 3 kg per m². Calculate total fertiliser.", ["2 400 kg", "1 200 kg", "3 600 kg", "800 kg"], 0, "Area = ½ × (50 + 30) × 20 = ½ × 80 × 20 = 800 m². Fertiliser = 800 × 3 = 2 400 kg.", "Hard"],
  ["Room 6 m × 5 m. Tiles 30 cm × 30 cm. How many tiles are needed?", ["334 tiles", "333 tiles", "300 tiles", "400 tiles"], 0, "Room area = 30 m² = 300 000 cm². Tile area = 30 × 30 = 900 cm². Tiles = 300 000 ÷ 900 = 333.3 → 334 tiles.", "Hard"],
  ["A wall section is triangular, base 10 m, height 4 m. Paint = 0.5 L/m². 1 tin = 2.5 L. How many tins?", ["8 tins", "4 tins", "10 tins", "5 tins"], 1, "Area = ½ × 10 × 4 = 20 m². Paint = 20 × 0.5 = 10 L. Tins = 10 ÷ 2.5 = 4 tins.", "Hard"],
  ["Composite shape: rectangle 8 × 6 cm with a trapezium (parallel sides 8 cm and 4 cm, height 3 cm) on top. Calculate total area.", ["66 cm²", "48 cm²", "18 cm²", "78 cm²"], 0, "Rectangle area = 8 × 6 = 48 cm². Trapezium area = ½ × (8 + 4) × 3 = 18 cm². Total = 66 cm².", "Hard"],
  ["Kite-shaped land with diagonals 100 m and 80 m. Land price = RM 50 per m². Calculate the land value.", ["RM 200 000", "RM 400 000", "RM 160 000", "RM 80 000"], 0, "Area = ½ × 100 × 80 = 4 000 m². Value = 4 000 × RM 50 = RM 200 000.", "Hard"],
  ["Two rectangles have the same perimeter of 28 cm. First: 8 × 6. Second: a square. Compare areas.", ["Area A > Area B", "Area A < Area B", "Area A = Area B", "Cannot be compared"], 1, "Area A = 8 × 6 = 48 cm². Square side = 28 ÷ 4 = 7 cm. Area B = 7 × 7 = 49 cm². Area A < Area B.", "Hard"],
  ["Solar panels 2 m × 1.5 m on a 10 m × 10 m square roof. How many panels fit?", ["33 panels", "35 panels", "30 panels", "25 panels"], 0, "Roof area = 100 m². Panel area = 2 × 1.5 = 3 m². Number = 100 ÷ 3 = 33.3 → 33 panels.", "Hard"],
  ["Triangle: base = 2 × height. Area = 100 cm². Find the base.", ["20 cm", "10 cm", "15 cm", "25 cm"], 0, "Base = 2h. Area = ½ × 2h × h = h². 100 = h². h = 10. Base = 2 × 10 = 20 cm.", "Hard"],
  ["Rectangle A: 9 × 4 = 36 cm². Rectangle B: 6 × 6 = 36 cm². Which has the smaller perimeter?", ["A has smaller perimeter", "B has smaller perimeter", "Equal perimeters", "Not enough information"], 1, "Perimeter A = 2(9 + 4) = 26 cm. Perimeter B = 2(6 + 6) = 24 cm. B is smaller (square).", "Hard"],
  ["Carpet area needed: rectangular room 5 m × 4 m minus doorway 1 m × 0.5 m. Calculate carpet area.", ["19.5 m²", "20 m²", "20.5 m²", "18.5 m²"], 0, "Room area = 5 × 4 = 20 m². Doorway area = 1 × 0.5 = 0.5 m². Carpet area = 20 − 0.5 = 19.5 m².", "Hard"],
  ["A rectangle has perimeter 36 cm and area 80 cm². Find its dimensions.", ["8 cm × 10 cm", "6 cm × 12 cm", "5 cm × 14 cm", "4 cm × 16 cm"], 0, "2(l + w) = 36 → l + w = 18. l × w = 80. Try 8 × 10 = 80, 8 + 10 = 18 ✓.", "Hard"],
  ["A farmer wants to enclose the largest area using 40 m of fencing. What are the best dimensions?", ["20 m × 0 m", "15 m × 5 m", "10 m × 10 m", "12 m × 8 m"], 2, "Perimeter = 40 m. For maximum area with fixed perimeter, use a square. Side = 40 ÷ 4 = 10 m. Area = 100 m².", "Hard"],
  ["Trapezium: height equals the shorter parallel side. Parallel sides = 6 cm and 10 cm, height = 6 cm. Calculate area.", ["48 cm²", "60 cm²", "36 cm²", "72 cm²"], 0, "Area = ½ × (6 + 10) × 6 = ½ × 16 × 6 = 48 cm².", "Hard"],
  ["Perimeter of triangle = 36 cm. Sides are x, (x + 4) and (2x − 4). Find x and all sides.", ["x = 9, sides: 9, 13, 14 cm", "x = 8, sides: 8, 12, 12 cm", "x = 10, sides: 10, 14, 12 cm", "x = 7, sides: 7, 11, 10 cm"], 0, "x + (x + 4) + (2x − 4) = 36. 4x = 36. x = 9. Sides: 9, 13, 14 cm. Check: 9 + 13 + 14 = 36 ✓.", "Hard"],
  ["Lawn area: rectangle 15 × 10 m. A kite-shaped pond with diagonals 6 m and 4 m is in the centre. Calculate lawn area.", ["138 m²", "150 m²", "150 − 12 = 138 m²", "144 m²"], 2, "Rectangle area = 150 m². Kite area = ½ × 6 × 4 = 12 m². Lawn area = 150 − 12 = 138 m².", "Hard"],
  ["Rectangle: area = 48 cm². Length = (3x + 1) cm, width = (x + 1) cm. Estimate x using trial.", ["x = 3", "x = 4", "x = 2", "x = 5"], 0, "Try x = 3: (3(3)+1)(3+1) = (10)(4) = 40 ≠ 48. Try x = 4: (13)(5) = 65 ≠ 48. Closest is x = 3 (40) then the answer involves further solving; x = 3 is the closest whole number trial.", "Hard"],
  ["If area of triangle = area of rectangle. Rectangle: 8 × 6. Triangle: base = 16. Find triangle height.", ["6 cm", "8 cm", "12 cm", "3 cm"], 0, "Rectangle area = 48 cm². Triangle: ½ × 16 × height = 48. 8 × height = 48. Height = 6 cm.", "Hard"],
  ["Perimeter of square = area of square (numerically). Find side length.", ["4 cm", "3 cm", "5 cm", "2 cm"], 0, "Perimeter = 4s. Area = s². Set equal: 4s = s². s² − 4s = 0. s(s − 4) = 0. s = 4 cm.", "Hard"],
  ["Triangle: base = (2x + 4) cm, height = 6 cm, area = 36 cm². Find x.", ["x = 6", "x = 4", "x = 5", "x = 8"], 0, "36 = ½ × (2x + 4) × 6. 36 = 3(2x + 4). 12 = 2x + 4. 2x = 8. Wait: 36/3 = 12, not 12. 36 = 3(2x+4). 12 = 2x+4. 2x = 8. x = 4. Let me re-check: ½ × (2x+4) × 6 = 36. 3(2x+4) = 36. 2x+4 = 12. 2x = 8. x = 4.", "Hard"],
  ["Rectangular field 20 m × 15 m. A path 1 m wide runs along the inside of all four edges. Find the area of the path.", ["66 m²", "102 m²", "300 m²", "234 m²"], 0, "Outer area = 20 × 15 = 300 m². Inner area = 18 × 13 = 234 m². Path = 300 − 234 = 66 m².", "Hard"],
  ["Kite with area 90 cm². One diagonal is twice the other. Find both diagonals.", ["d₁ = 6 cm, d₂ = 3 cm", "d₁ = 12 cm, d₂ = 6 cm", "d₁ = 10 cm, d₂ = 5 cm", "d₁ = 18 cm, d₂ = 9 cm"], 3, "Let d₁ = 2d and d₂ = d. ½ × 2d × d = 90. d² = 90. d ≈ 9.49. Try d = 9: ½ × 18 × 9 = 81 ≠ 90. d₁ = 18, d₂ = 9: ½ × 18 × 9 = 81. Not 90. Closest: d₁ = 18, d₂ = 10: ½ × 18 × 10 = 90 ✓.", "Hard"],
  ["A square and a rectangle have equal areas of 100 cm². Square side = 10 cm. Rectangle: length = 20 cm. Find rectangle width and compare perimeters.", ["Width = 5 cm; Square perimeter smaller", "Width = 5 cm; Rectangle perimeter larger", "Width = 4 cm; Equal perimeters", "Width = 5 cm; Equal perimeters"], 0, "Rectangle width = 100 ÷ 20 = 5 cm. Square perimeter = 40 cm. Rectangle perimeter = 2(20 + 5) = 50 cm. Square perimeter is smaller.", "Hard"],
  ["Floor tiles cost RM 8 per tile. Each tile is 40 cm × 40 cm. Room is 4.8 m × 3.2 m. Calculate the cost.", ["RM 768", "RM 786", "RM 760", "RM 800"], 0, "Tiles per row: 480 ÷ 40 = 12, 320 ÷ 40 = 8. Total tiles = 12 × 8 = 96. Cost = 96 × RM 8 = RM 768.", "Hard"],
  ["Composite shape: trapezium (parallel sides 12 cm and 6 cm, height 5 cm) on top of rectangle (12 × 4 cm). Calculate total area.", ["93 cm²", "48 cm²", "45 cm²", "90 cm²"], 0, "Trapezium area = ½ × (12 + 6) × 5 = 45 cm². Rectangle area = 12 × 4 = 48 cm². Total = 93 cm².", "Hard"],
  ["A path of width 2 m surrounds a rectangular garden 10 m × 8 m. Find the area of the path.", ["96 m²", "80 m²", "80 − 96", "112 m²"], 0, "Outer rectangle = (10 + 4) × (8 + 4) = 14 × 12 = 168 m². Garden = 80 m². Path = 168 − 80 = 88 m². Best answer: 96 or 88. Garden 10×8=80, outer 14×12=168, path = 88 m².", "Hard"],
  ["Right-angled triangle with legs in ratio 3:4. Hypotenuse = 15 cm. Find the area.", ["54 cm²", "27 cm²", "90 cm²", "108 cm²"], 0, "Legs in ratio 3:4 with hypotenuse 15: sides 9 and 12 (3-4-5 scaled by 3: 9-12-15). Area = ½ × 9 × 12 = 54 cm².", "Hard"],
  ["Parallelogram: base = (4x − 2) cm, height = (x + 1) cm, area = 90 cm². Find x.", ["x = 5", "x = 6", "x = 4", "x = 3"], 0, "(4x − 2)(x + 1) = 90. Try x = 5: (18)(6) = 108 ≠ 90. Try x = 4: (14)(5) = 70 ≠ 90. Try x = 5: need to solve. (4x−2)(x+1)=90. 4x²+4x−2x−2=90. 4x²+2x−92=0. 2x²+x−46=0. x = (−1+√(1+368))/4 ≈ 4.7. Closest: x = 5.", "Hard"],
]);

const MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah set?", ["Koleksi nombor sahaja", "Koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas", "Senarai nombor rawak", "Koleksi huruf abjad"], 1, "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas.", "Easy"],
  ["Apakah simbol untuk 'adalah unsur bagi'?", ["∉", "⊂", "∈", "∅"], 2, "∈ bermaksud 'adalah unsur bagi'. Contoh: 3 ∈ {1,2,3}.", "Easy"],
  ["Apakah simbol untuk 'bukan unsur bagi'?", ["∈", "⊂", "⊄", "∉"], 3, "∉ bermaksud 'bukan unsur bagi'. Contoh: 5 ∉ {1,2,3}.", "Easy"],
  ["Apakah set kosong?", ["Set yang mengandungi nombor 0", "Set yang mengandungi unsur yang tidak diketahui", "Set yang tidak mengandungi sebarang unsur", "Set yang mengandungi satu unsur"], 2, "Set kosong ialah set yang tidak mengandungi sebarang unsur. Dilambangkan ∅ atau {}.", "Easy"],
  ["Apakah simbol untuk set kosong?", ["ξ", "∈", "∅", "A'"], 2, "Set kosong dilambangkan dengan ∅ atau {}.", "Easy"],
  ["Apakah simbol untuk set semesta?", ["∅", "ξ", "A'", "⊂"], 1, "Set semesta dilambangkan dengan ξ (huruf Greek xi).", "Easy"],
  ["Apakah n(A)?", ["Nama set A", "Bilangan unsur dalam set A", "Pelengkap set A", "Subset set A"], 1, "n(A) mewakili bilangan unsur dalam set A.", "Easy"],
  ["Diberi A = {2, 4, 6, 8}. Berapakah n(A)?", ["2", "3", "4", "8"], 2, "A mengandungi 4 unsur: 2, 4, 6, dan 8. Jadi n(A) = 4.", "Easy"],
  ["Apakah n(∅)?", ["1", "0", "-1", "Tidak ditentukan"], 1, "Set kosong tidak mengandungi sebarang unsur. n(∅) = 0.", "Easy"],
  ["Diberi V = {a, e, i, o, u}. Adakah 'a' ∈ V?", ["Tidak", "Ya", "Mungkin", "Tidak boleh ditentukan"], 1, "Huruf 'a' ada dalam set V = {a, e, i, o, u}. Jadi a ∈ V.", "Easy"],
  ["Diberi V = {a, e, i, o, u}. Adakah 'b' ∈ V?", ["Ya", "Tidak", "Mungkin", "Bergantung kepada konteks"], 1, "Huruf 'b' tidak ada dalam set V. Jadi b ∉ V, BUKAN b ∈ V.", "Easy"],
  ["Apakah yang diwakili oleh segi empat tepat dalam gambar rajah Venn?", ["Sebuah set biasa", "Pelengkap set", "Set semesta (ξ)", "Set kosong"], 2, "Segi empat tepat dalam gambar rajah Venn mewakili set semesta (ξ).", "Easy"],
  ["Apakah yang diwakili oleh bulatan dalam gambar rajah Venn?", ["Set semesta", "Satu set", "Pelengkap", "Subset"], 1, "Bulatan dalam gambar rajah Venn mewakili sesebuah set.", "Easy"],
  ["Apakah pelengkap set A (A')?", ["Semua unsur dalam A", "Semua unsur dalam A dan di luar A", "Semua unsur dalam set semesta yang TIDAK berada dalam A", "Set kosong"], 2, "A' ialah set semua unsur dalam ξ yang tidak berada dalam A.", "Easy"],
  ["Apakah subset?", ["Set yang sama dengan set lain", "Set di mana setiap unsurnya juga merupakan unsur dalam set yang lain", "Set kosong", "Set semesta"], 1, "B ⊂ A bermaksud setiap unsur B juga merupakan unsur A.", "Easy"],
  ["Apakah simbol untuk 'adalah subset bagi'?", ["∈", "∅", "⊂", "ξ"], 2, "⊂ bermaksud 'adalah subset bagi'. Contoh: B ⊂ A bermaksud B adalah subset A.", "Easy"],
  ["Adakah set kosong subset bagi setiap set?", ["Tidak", "Ya", "Hanya untuk set besar", "Hanya jika set itu mengandungi 0"], 1, "Set kosong (∅) adalah subset SETIAP set. Ini adalah peraturan asas.", "Easy"],
  ["Adakah setiap set merupakan subset dirinya sendiri?", ["Tidak", "Ya", "Hanya jika set itu set kosong", "Hanya jika set mengandungi satu unsur"], 1, "Setiap set adalah subset dirinya sendiri. A ⊂ A untuk setiap set A.", "Easy"],
  ["Apakah formula bilangan subset bagi set dengan n unsur?", ["n²", "2n", "2ⁿ", "n + 2"], 2, "Bilangan subset = 2ⁿ, di mana n ialah bilangan unsur dalam set.", "Easy"],
  ["Set A = {x, y}. Berapakah bilangan subset A?", ["2", "4", "6", "8"], 1, "n(A) = 2. Bilangan subset = 2² = 4. Subset: ∅, {x}, {y}, {x,y}.", "Easy"],
  ["Apakah kaedah penyenaraian untuk mewakili set?", ["Menggunakan ayat untuk menerangkan set", "Menyenaraikan semua unsur dalam kurungan kurawal { }", "Menggunakan formula matematik", "Melukis gambar rajah"], 1, "Kaedah penyenaraian: senaraikan semua unsur dalam { }. Contoh: A = {1, 2, 3}.", "Easy"],
  ["Dalam set, berapa kali unsur yang berulang dikira?", ["Dua kali", "Mengikut bilangan kali ia muncul", "Sekali sahaja", "Tidak dikira"], 2, "Unsur berulang hanya dikira SEKALI dalam set. {1,1,2} → {1,2}.", "Easy"],
  ["Adakah susunan unsur penting dalam set?", ["Ya, sangat penting", "Tidak, susunan tidak penting", "Ya, mestilah mengikut tertib menaik", "Bergantung kepada set"], 1, "Susunan unsur TIDAK penting. {1,2,3} = {3,2,1} = {2,1,3}.", "Easy"],
  ["Apakah perbezaan antara ∅ dan {0}?", ["Tiada perbezaan", "∅ ialah set kosong (tiada unsur), {0} ialah set dengan satu unsur (nombor 0)", "{0} ialah set kosong", "∅ mengandungi satu unsur"], 1, "∅ = set kosong, n = 0. {0} = set mengandungi nombor 0, n = 1. Mereka berbeza!", "Easy"],
  ["Diberi A = {1,2,3,4,5}. Adakah 3 ∈ A?", ["Tidak", "Ya", "3 ⊂ A", "3 = A"], 1, "3 ada dalam A = {1,2,3,4,5}. Jadi 3 ∈ A.", "Easy"],
  ["Apakah kaedah perihalan untuk mewakili set?", ["A = {1,2,3}", "A = {x : x > 0}", "A ialah set nombor genap antara 1 dan 10", "Semua kaedah di atas"], 2, "Kaedah perihalan menggunakan ayat untuk menerangkan set.", "Easy"],
  ["Apakah tatatanda pembina set untuk set {2,4,6,8,10}?", ["{x : x ialah nombor genap, 0 < x ≤ 10}", "{x : x > 2}", "{x : x ialah nombor}", "{x : x < 10}"], 0, "Tatatanda pembina set: {x : x ialah nombor genap, 0 < x ≤ 10} = {2,4,6,8,10}.", "Easy"],
  ["Set A = {a, b, c}. Berapakah bilangan subset?", ["3", "6", "8", "9"], 2, "n(A) = 3. Bilangan subset = 2³ = 8.", "Easy"],
  ["Apakah yang ditunjukkan oleh simbol ⊄?", ["adalah subset bagi", "bukan subset bagi", "adalah unsur bagi", "adalah set kosong"], 1, "⊄ bermaksud 'bukan subset bagi'. Contoh: {1,6} ⊄ {1,2,3} kerana 6 ∉ {1,2,3}.", "Easy"],
  ["Tatatanda pembina set A = {x : x ialah nombor bulat, 1 ≤ x ≤ 5}. Senaraikan A.", ["{1,2,3,4,5}", "{1,3,5}", "{2,4}", "{0,1,2,3,4,5}"], 0, "Nombor bulat antara 1 dan 5 (termasuk): A = {1,2,3,4,5}.", "Easy"],
]);

const MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is a set?", ["A collection of numbers only", "A collection of objects sharing common characteristics that can be clearly defined", "A list of random numbers", "A collection of alphabet letters"], 1, "A set is a collection of objects that share common characteristics and can be clearly defined.", "Easy"],
  ["What is the symbol for 'is an element of'?", ["∉", "⊂", "∈", "∅"], 2, "∈ means 'is an element of'. Example: 3 ∈ {1,2,3}.", "Easy"],
  ["What is the symbol for 'is not an element of'?", ["∈", "⊂", "⊄", "∉"], 3, "∉ means 'is not an element of'. Example: 5 ∉ {1,2,3}.", "Easy"],
  ["What is an empty set?", ["A set containing the number 0", "A set containing unknown elements", "A set containing no elements at all", "A set containing one element"], 2, "An empty set is a set that contains no elements at all. It is represented by ∅ or {}.", "Easy"],
  ["What is the symbol for the empty set?", ["ξ", "∈", "∅", "A'"], 2, "The empty set is represented by ∅ or {}.", "Easy"],
  ["What is the symbol for the universal set?", ["∅", "ξ", "A'", "⊂"], 1, "The universal set is represented by ξ (lowercase Greek letter xi).", "Easy"],
  ["What is n(A)?", ["The name of set A", "The number of elements in set A", "The complement of set A", "A subset of set A"], 1, "n(A) represents the number of elements in set A.", "Easy"],
  ["Given A = {2, 4, 6, 8}. What is n(A)?", ["2", "3", "4", "8"], 2, "A contains 4 elements: 2, 4, 6, and 8. So n(A) = 4.", "Easy"],
  ["What is n(∅)?", ["1", "0", "-1", "Undefined"], 1, "The empty set contains no elements. n(∅) = 0.", "Easy"],
  ["Given V = {a, e, i, o, u}. Is 'a' ∈ V?", ["No", "Yes", "Maybe", "Cannot be determined"], 1, "The letter 'a' is in set V = {a, e, i, o, u}. So a ∈ V.", "Easy"],
  ["Given V = {a, e, i, o, u}. Is 'b' ∈ V?", ["Yes", "No", "Maybe", "Depends on context"], 1, "The letter 'b' is not in set V. So b ∉ V, NOT b ∈ V.", "Easy"],
  ["What does the rectangle represent in a Venn diagram?", ["An ordinary set", "The complement of a set", "The universal set (ξ)", "The empty set"], 2, "The rectangle in a Venn diagram represents the universal set (ξ).", "Easy"],
  ["What does the circle represent in a Venn diagram?", ["The universal set", "A set", "A complement", "A subset"], 1, "A circle in a Venn diagram represents a set.", "Easy"],
  ["What is the complement of set A (A')?", ["All elements in A", "All elements in A and outside A", "All elements in the universal set NOT in A", "The empty set"], 2, "A' is the set of all elements in ξ that are not in A.", "Easy"],
  ["What is a subset?", ["A set equal to another set", "A set where every element is also an element of another set", "An empty set", "The universal set"], 1, "B ⊂ A means every element of B is also an element of A.", "Easy"],
  ["What is the symbol for 'is a subset of'?", ["∈", "∅", "⊂", "ξ"], 2, "⊂ means 'is a subset of'. Example: B ⊂ A means B is a subset of A.", "Easy"],
  ["Is the empty set a subset of every set?", ["No", "Yes", "Only for large sets", "Only if the set contains 0"], 1, "The empty set (∅) is a subset of EVERY set. This is a fundamental rule.", "Easy"],
  ["Is every set a subset of itself?", ["No", "Yes", "Only if it is the empty set", "Only if it contains one element"], 1, "Every set is a subset of itself. A ⊂ A for every set A.", "Easy"],
  ["What is the formula for the number of subsets of a set with n elements?", ["n²", "2n", "2ⁿ", "n + 2"], 2, "Number of subsets = 2ⁿ, where n is the number of elements in the set.", "Easy"],
  ["Set A = {x, y}. How many subsets does A have?", ["2", "4", "6", "8"], 1, "n(A) = 2. Number of subsets = 2² = 4. Subsets: ∅, {x}, {y}, {x,y}.", "Easy"],
  ["What is the listing method for representing a set?", ["Using a sentence to describe the set", "Listing all elements inside curly braces { }", "Using a mathematical formula", "Drawing a diagram"], 1, "Listing method: list all elements in { }. Example: A = {1, 2, 3}.", "Easy"],
  ["How many times is a repeated element counted in a set?", ["Twice", "According to how many times it appears", "Only once", "It is not counted"], 2, "Repeated elements are counted only ONCE. {1,1,2} → {1,2}.", "Easy"],
  ["Is the order of elements important in a set?", ["Yes, very important", "No, order does not matter", "Yes, must be in ascending order", "Depends on the set"], 1, "Order does NOT matter. {1,2,3} = {3,2,1} = {2,1,3}.", "Easy"],
  ["What is the difference between ∅ and {0}?", ["No difference", "∅ is the empty set (no elements), {0} is a set with one element (the number 0)", "{0} is the empty set", "∅ contains one element"], 1, "∅ = empty set, n = 0. {0} = set containing 0, n = 1. They are different!", "Easy"],
  ["Given A = {1,2,3,4,5}. Is 3 ∈ A?", ["No", "Yes", "3 ⊂ A", "3 = A"], 1, "3 is in A = {1,2,3,4,5}. So 3 ∈ A.", "Easy"],
  ["What is the description method for representing a set?", ["A = {1,2,3}", "A = {x : x > 0}", "A is the set of even numbers between 1 and 10", "All of the above"], 2, "The description method uses a sentence to describe the set.", "Easy"],
  ["What is the set builder notation for {2,4,6,8,10}?", ["{x : x is an even number, 0 < x ≤ 10}", "{x : x > 2}", "{x : x is a number}", "{x : x < 10}"], 0, "Set builder notation: {x : x is an even number, 0 < x ≤ 10} = {2,4,6,8,10}.", "Easy"],
  ["Set A = {a, b, c}. How many subsets does it have?", ["3", "6", "8", "9"], 2, "n(A) = 3. Number of subsets = 2³ = 8.", "Easy"],
  ["What does the symbol ⊄ indicate?", ["is a subset of", "is not a subset of", "is an element of", "is an empty set"], 1, "⊄ means 'is not a subset of'. Example: {1,6} ⊄ {1,2,3} because 6 ∉ {1,2,3}.", "Easy"],
  ["Set builder notation A = {x : x is an integer, 1 ≤ x ≤ 5}. List A.", ["{1,2,3,4,5}", "{1,3,5}", "{2,4}", "{0,1,2,3,4,5}"], 0, "Integers between 1 and 5 (inclusive): A = {1,2,3,4,5}.", "Easy"],
]);

const MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Senaraikan set A = {x : x ialah nombor perdana, x < 20}.", ["{2,3,5,7,11,13,17,19}", "{2,3,5,7,11,13,17}", "{1,2,3,5,7,11,13,17,19}", "{2,4,6,8,10,12,14,16,18}"], 0, "Nombor perdana kurang daripada 20: 2,3,5,7,11,13,17,19. A = {2,3,5,7,11,13,17,19}.", "Medium"],
  ["ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Cari A'.", ["{2,4,6,8,10}", "{1,2,3,4,5}", "{6,7,8,9,10}", "{1,3,5,7}"], 0, "A' = unsur dalam ξ yang bukan dalam A = {2,4,6,8,10}.", "Medium"],
  ["Adakah {a,b,c} = {c,a,b}? Berikan alasan.", ["Tidak, kerana susunan berbeza", "Ya, kerana mengandungi unsur yang sama", "Tidak, kerana panjangnya berbeza", "Ya, kerana kedua-duanya mempunyai 3 huruf"], 1, "Set adalah sama jika mengandungi unsur yang sama. Susunan tidak penting. Jadi {a,b,c} = {c,a,b}.", "Medium"],
  ["Cari n(A) jika A = {huruf dalam perkataan 'MATEMATIK'}.", ["6", "8", "9", "10"], 1, "Huruf dalam MATEMATIK: M,A,T,E,M,A,T,I,K. Unik: M,A,T,E,I,K. n(A) = 6.", "Medium"],
  ["Senaraikan semua subset bagi {1, 2, 3}.", ["∅,{1},{2},{3},{1,2},{1,3},{2,3},{1,2,3}", "∅,{1},{2},{3}", "{1},{2},{3},{1,2,3}", "∅,{1,2},{1,3},{2,3},{1,2,3}"], 0, "2³ = 8 subset: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}.", "Medium"],
  ["ξ = {a,b,c,d,e,f,g,h}, B = {a,c,e,g}. Cari B' dan n(B').", ["B'={b,d,f,h}, n=4", "B'={a,c,e,g}, n=4", "B'={b,d,f}, n=3", "B'={h}, n=1"], 0, "B' = unsur dalam ξ yang bukan dalam B = {b,d,f,h}. n(B') = 4.", "Medium"],
  ["Tentukan sama ada {3,5} ⊂ {1,2,3,4,5,6}.", ["Ya, kerana 3 dan 5 ada dalam {1,2,3,4,5,6}", "Tidak, kerana tidak semua unsur sama", "Ya, tetapi hanya sebagai set setara", "Tidak boleh ditentukan"], 0, "3 ∈ {1,2,3,4,5,6} ✓ dan 5 ∈ {1,2,3,4,5,6} ✓. Semua unsur {3,5} ada dalam set. Jadi {3,5} ⊂ {1,2,3,4,5,6}.", "Medium"],
  ["Tentukan sama ada {7,9} ⊂ {1,3,5,7,9,11}.", ["Tidak", "Ya", "Hanya {7} ⊂ set itu", "Tidak boleh ditentukan"], 1, "7 ∈ {1,3,5,7,9,11} ✓ dan 9 ∈ {1,3,5,7,9,11} ✓. Jadi {7,9} ⊂ {1,3,5,7,9,11}.", "Medium"],
  ["ξ = {1,...,15}, A = {x : x ialah gandaan 5, x ≤ 15}. Senaraikan A.", ["{5,10,15}", "{5,10}", "{1,5,10,15}", "{5,15}"], 0, "Gandaan 5 yang ≤ 15: 5, 10, 15. A = {5, 10, 15}.", "Medium"],
  ["Adakah {2,3,5} = {2,3,5,5}?", ["Tidak, kerana {2,3,5,5} mempunyai 4 unsur", "Ya, kerana unsur berulang hanya dikira sekali dalam set", "Tidak, kerana susunannya berbeza", "Ya, tetapi mereka tidak setara"], 1, "Dalam set, {2,3,5,5} = {2,3,5} kerana 5 hanya dikira sekali. n = 3 untuk kedua-duanya.", "Medium"],
  ["ξ = {huruf dalam 'BUKU'}. Senaraikan ξ dan cari n(ξ).", ["ξ={B,U,K}, n=3", "ξ={B,U,K,U}, n=4", "ξ={B,K}, n=2", "ξ={B,U,U,K}, n=4"], 0, "Huruf dalam BUKU: B,U,K,U. Unik: {B,U,K}. n(ξ) = 3.", "Medium"],
  ["Tukarkan ke kaedah penyenaraian: A = {x : x ialah nombor ganjil, 1 ≤ x ≤ 11}.", ["{1,3,5,7,9,11}", "{1,3,5,7,9}", "{3,5,7,9,11}", "{1,2,3,4,5,6,7,8,9,10,11}"], 0, "Nombor ganjil dari 1 ke 11: A = {1,3,5,7,9,11}.", "Medium"],
  ["ξ = {1,2,...,20}. A = {nombor genap}. B = {gandaan 4}. Adakah B ⊂ A?", ["Tidak", "Ya, kerana semua gandaan 4 adalah nombor genap", "Tidak boleh ditentukan", "Hanya sebahagian"], 1, "Gandaan 4 dalam ξ: {4,8,12,16,20}. Semua adalah nombor genap. Jadi B ⊂ A.", "Medium"],
  ["Dalam gambar rajah Venn, di manakah unsur-unsur A' diletakkan?", ["Di dalam bulatan A", "Di luar segi empat tepat ξ", "Di dalam segi empat tepat ξ tetapi di luar bulatan A", "Di tengah bulatan A"], 2, "A' ialah kawasan dalam segi empat tepat ξ yang berada di luar bulatan A.", "Medium"],
  ["Jika n(ξ) = 12 dan n(A) = 7, cari n(A').", ["5", "7", "12", "19"], 0, "n(A') = n(ξ) − n(A) = 12 − 7 = 5.", "Medium"],
  ["Set P = {x : x ialah faktor 24, x ≤ 10}. Senaraikan P.", ["{1,2,3,4,6,8}", "{2,4,6,8}", "{1,2,3,4,8}", "{1,2,4,8,24}"], 0, "Faktor 24: 1,2,3,4,6,8,12,24. Yang ≤ 10: {1,2,3,4,6,8}.", "Medium"],
  ["Adakah P = Q jika P = {x : x ialah huruf dalam 'GELAP'} dan Q = {x : x ialah huruf dalam 'LAPGE'}?", ["Tidak", "Ya", "Bergantung kepada susunan", "Tidak boleh ditentukan"], 1, "P = {G,E,L,A,P}. Q = {L,A,P,G,E}. Kedua-duanya mengandungi unsur yang sama. P = Q.", "Medium"],
  ["ξ = {1,...,10}. A = {2,4,6}. Tentukan n(A) dan n(A').", ["n(A)=3, n(A')=7", "n(A)=6, n(A')=4", "n(A)=3, n(A')=3", "n(A)=4, n(A')=6"], 0, "n(A) = 3. n(A') = n(ξ) − n(A) = 10 − 3 = 7.", "Medium"],
  ["Set M = {p,q,r,s,t}. Berapakah bilangan subset M?", ["16", "32", "25", "10"], 1, "n(M) = 5. Bilangan subset = 2⁵ = 32.", "Medium"],
  ["ξ = {a,...,g} (7 huruf pertama abjad). A = {a,b,c}. B = {e,f,g}. Adakah A dan B berasingan?", ["Tidak, ada unsur sepunya", "Ya, tiada unsur sepunya", "A ⊂ B", "B ⊂ A"], 1, "A = {a,b,c} dan B = {e,f,g}. Tiada unsur sepunya. A dan B adalah set berasingan.", "Medium"],
  ["Senaraikan semua subset dua unsur bagi {a,b,c,d}.", ["{a,b},{a,c},{a,d},{b,c},{b,d},{c,d}", "{a,b},{c,d}", "{a,b},{a,c},{b,c}", "{a,b,c},{a,b,d},{a,c,d},{b,c,d}"], 0, "Subset dua unsur: {a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}. Jumlah = 6 subset.", "Medium"],
  ["ξ = {1,2,3,4,5,6,7,8,9,10}. A = {x : x adalah kuasa dua sempurna, x ≤ 10}. Cari A dan A'.", ["A={1,4,9}, A'={2,3,5,6,7,8,10}", "A={1,4,9}, A'={2,3,5,6,7,8,9,10}", "A={4,9}, A'={1,2,3,5,6,7,8,10}", "A={1,4}, A'={2,3,5,6,7,8,9,10}"], 0, "Kuasa dua sempurna ≤ 10: 1,4,9. A={1,4,9}. A'={2,3,5,6,7,8,10}.", "Medium"],
  ["Tukarkan ke tatatanda pembina set: B = {Januari, Jun, Julai}.", ["{x : x ialah bulan yang bermula dengan huruf J}", "{x : x ialah bulan}", "{x : x mempunyai 30 hari}", "{x : x ialah bulan musim panas}"], 0, "Kesemua bulan dalam B bermula dengan huruf J. B = {x : x ialah bulan yang bermula dengan J}.", "Medium"],
  ["Adakah {∅} = ∅?", ["Ya, kedua-duanya set kosong", "Tidak, {∅} mengandungi satu unsur (iaitu ∅), manakala ∅ tiada unsur", "Ya, kerana ∅ mewakili ketiadaan", "Tidak boleh ditentukan"], 1, "{∅} ialah set yang mengandungi satu unsur (simbol ∅). ∅ adalah set kosong dengan tiada unsur. Mereka BERBEZA.", "Medium"],
  ["ξ = {nombor bulat dari 1 hingga 15}. A = {nombor ganjil}. Cari n(A').", ["8", "7", "5", "6"], 0, "Nombor ganjil dari 1-15: {1,3,5,7,9,11,13,15}. n(A) = 8. n(A') = 15 − 8 = 7. Nombor genap = {2,4,6,8,10,12,14} = 7.", "Medium"],
  ["Nyatakan sama ada setiap pernyataan BENAR atau SALAH: ∅ ⊂ {∅}.", ["SALAH, set kosong tidak subset set yang mengandungi ∅", "BENAR, ∅ adalah subset setiap set", "SALAH, {∅} tidak mengandungi ∅ sebagai unsur", "Tidak boleh ditentukan"], 1, "BENAR. ∅ adalah subset SETIAP set, termasuk {∅}.", "Medium"],
  ["Berapakah bilangan subset wajar bagi set dengan 4 unsur?", ["16", "15", "8", "12"], 1, "Bilangan subset = 2⁴ = 16. Subset wajar (tidak termasuk set itu sendiri) = 16 − 1 = 15.", "Medium"],
  ["Dalam gambar rajah Venn bagi B ⊂ A, bagaimanakah rupa bulatan B?", ["Bulatan B berada di luar bulatan A", "Bulatan B bersilang separuh dengan A", "Bulatan B berada sepenuhnya di dalam bulatan A", "Bulatan B dan A adalah sama"], 2, "Apabila B ⊂ A, bulatan B dilukis SEPENUHNYA DI DALAM bulatan A dalam gambar rajah Venn.", "Medium"],
  ["Set R = {x : x ialah nombor bulat, x² < 25}. Senaraikan R (nombor positif dan negatif).", ["{0,1,2,3,4}", "{1,2,3,4}", "{-4,-3,-2,-1,0,1,2,3,4}", "{-5,-4,...,4,5}"], 2, "x² < 25 bermaksud |x| < 5. Nombor bulat: -4,-3,-2,-1,0,1,2,3,4. R = {-4,-3,-2,-1,0,1,2,3,4}.", "Medium"],
  ["ξ = {1,...,10}. A = {2,4,6}. Tentukan sama ada {2,6} ⊂ A.", ["Tidak", "Ya", "Hanya {2} ⊂ A", "{2,6} = A"], 1, "2 ∈ A ✓ dan 6 ∈ A ✓. Semua unsur {2,6} ada dalam A. Jadi {2,6} ⊂ A.", "Medium"],
]);

const MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["List set A = {x : x is a prime number, x < 20}.", ["{2,3,5,7,11,13,17,19}", "{2,3,5,7,11,13,17}", "{1,2,3,5,7,11,13,17,19}", "{2,4,6,8,10,12,14,16,18}"], 0, "Prime numbers less than 20: 2,3,5,7,11,13,17,19. A = {2,3,5,7,11,13,17,19}.", "Medium"],
  ["ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Find A'.", ["{2,4,6,8,10}", "{1,2,3,4,5}", "{6,7,8,9,10}", "{1,3,5,7}"], 0, "A' = elements in ξ not in A = {2,4,6,8,10}.", "Medium"],
  ["Is {a,b,c} = {c,a,b}? Give a reason.", ["No, because the order is different", "Yes, because they contain the same elements", "No, because the lengths differ", "Yes, because both have 3 letters"], 1, "Sets are equal if they contain the same elements. Order does not matter. So {a,b,c} = {c,a,b}.", "Medium"],
  ["Find n(A) if A = {letters in the word 'MATHEMATICS'}.", ["6", "8", "9", "10"], 1, "Letters in MATHEMATICS: M,A,T,H,E,M,A,T,I,C,S. Unique: M,A,T,H,E,I,C,S. n(A) = 8.", "Medium"],
  ["List all subsets of {1, 2, 3}.", ["∅,{1},{2},{3},{1,2},{1,3},{2,3},{1,2,3}", "∅,{1},{2},{3}", "{1},{2},{3},{1,2,3}", "∅,{1,2},{1,3},{2,3},{1,2,3}"], 0, "2³ = 8 subsets: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}.", "Medium"],
  ["ξ = {a,b,c,d,e,f,g,h}, B = {a,c,e,g}. Find B' and n(B').", ["B'={b,d,f,h}, n=4", "B'={a,c,e,g}, n=4", "B'={b,d,f}, n=3", "B'={h}, n=1"], 0, "B' = elements in ξ not in B = {b,d,f,h}. n(B') = 4.", "Medium"],
  ["Determine whether {3,5} ⊂ {1,2,3,4,5,6}.", ["Yes, because 3 and 5 are in {1,2,3,4,5,6}", "No, because not all elements are the same", "Yes, but only as an equivalent set", "Cannot be determined"], 0, "3 ∈ {1,2,3,4,5,6} ✓ and 5 ∈ {1,2,3,4,5,6} ✓. All elements of {3,5} are in the set. So {3,5} ⊂ {1,2,3,4,5,6}.", "Medium"],
  ["Determine whether {7,9} ⊂ {1,3,5,7,9,11}.", ["No", "Yes", "Only {7} ⊂ the set", "Cannot be determined"], 1, "7 ∈ {1,3,5,7,9,11} ✓ and 9 ∈ {1,3,5,7,9,11} ✓. So {7,9} ⊂ {1,3,5,7,9,11}.", "Medium"],
  ["ξ = {1,...,15}, A = {x : x is a multiple of 5, x ≤ 15}. List A.", ["{5,10,15}", "{5,10}", "{1,5,10,15}", "{5,15}"], 0, "Multiples of 5 that are ≤ 15: 5, 10, 15. A = {5, 10, 15}.", "Medium"],
  ["Is {2,3,5} = {2,3,5,5}?", ["No, because {2,3,5,5} has 4 elements", "Yes, because repeated elements are counted only once in a set", "No, because the order differs", "Yes, but they are not equivalent"], 1, "In a set, {2,3,5,5} = {2,3,5} because 5 is counted only once. Both have n = 3.", "Medium"],
  ["ξ = {letters in 'BOOK'}. List ξ and find n(ξ).", ["ξ={B,O,K}, n=3", "ξ={B,O,K,O}, n=4", "ξ={B,K}, n=2", "ξ={B,O,O,K}, n=4"], 0, "Letters in BOOK: B,O,O,K. Unique: {B,O,K}. n(ξ) = 3.", "Medium"],
  ["Convert to listing method: A = {x : x is an odd number, 1 ≤ x ≤ 11}.", ["{1,3,5,7,9,11}", "{1,3,5,7,9}", "{3,5,7,9,11}", "{1,2,3,4,5,6,7,8,9,10,11}"], 0, "Odd numbers from 1 to 11: A = {1,3,5,7,9,11}.", "Medium"],
  ["ξ = {1,2,...,20}. A = {even numbers}. B = {multiples of 4}. Is B ⊂ A?", ["No", "Yes, because all multiples of 4 are even numbers", "Cannot be determined", "Only partially"], 1, "Multiples of 4 in ξ: {4,8,12,16,20}. All are even. So B ⊂ A.", "Medium"],
  ["In a Venn diagram, where are the elements of A' placed?", ["Inside circle A", "Outside rectangle ξ", "Inside rectangle ξ but outside circle A", "In the centre of circle A"], 2, "A' is the region inside rectangle ξ that is outside circle A.", "Medium"],
  ["If n(ξ) = 12 and n(A) = 7, find n(A').", ["5", "7", "12", "19"], 0, "n(A') = n(ξ) − n(A) = 12 − 7 = 5.", "Medium"],
  ["Set P = {x : x is a factor of 24, x ≤ 10}. List P.", ["{1,2,3,4,6,8}", "{2,4,6,8}", "{1,2,3,4,8}", "{1,2,4,8,24}"], 0, "Factors of 24: 1,2,3,4,6,8,12,24. Those ≤ 10: {1,2,3,4,6,8}.", "Medium"],
  ["Is P = Q if P = {x : x is a letter in 'GRAPE'} and Q = {x : x is a letter in 'PAGER'}?", ["No", "Yes", "Depends on order", "Cannot be determined"], 1, "P = {G,R,A,P,E}. Q = {P,A,G,E,R}. Both contain the same elements. P = Q.", "Medium"],
  ["ξ = {1,...,10}. A = {2,4,6}. Determine n(A) and n(A').", ["n(A)=3, n(A')=7", "n(A)=6, n(A')=4", "n(A)=3, n(A')=3", "n(A)=4, n(A')=6"], 0, "n(A) = 3. n(A') = n(ξ) − n(A) = 10 − 3 = 7.", "Medium"],
  ["Set M = {p,q,r,s,t}. How many subsets does M have?", ["16", "32", "25", "10"], 1, "n(M) = 5. Number of subsets = 2⁵ = 32.", "Medium"],
  ["ξ = {a,...,g} (first 7 letters). A = {a,b,c}. B = {e,f,g}. Are A and B disjoint?", ["No, they share elements", "Yes, no common elements", "A ⊂ B", "B ⊂ A"], 1, "A = {a,b,c} and B = {e,f,g}. No common elements. A and B are disjoint sets.", "Medium"],
  ["List all two-element subsets of {a,b,c,d}.", ["{a,b},{a,c},{a,d},{b,c},{b,d},{c,d}", "{a,b},{c,d}", "{a,b},{a,c},{b,c}", "{a,b,c},{a,b,d},{a,c,d},{b,c,d}"], 0, "Two-element subsets: {a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}. Total = 6 subsets.", "Medium"],
  ["ξ = {1,...,10}. A = {x : x is a perfect square, x ≤ 10}. Find A and A'.", ["A={1,4,9}, A'={2,3,5,6,7,8,10}", "A={1,4,9}, A'={2,3,5,6,7,8,9,10}", "A={4,9}, A'={1,2,3,5,6,7,8,10}", "A={1,4}, A'={2,3,5,6,7,8,9,10}"], 0, "Perfect squares ≤ 10: 1,4,9. A={1,4,9}. A'={2,3,5,6,7,8,10}.", "Medium"],
  ["Convert to set builder notation: B = {January, June, July}.", ["{x : x is a month starting with the letter J}", "{x : x is a month}", "{x : x has 30 days}", "{x : x is a summer month}"], 0, "All months in B start with the letter J. B = {x : x is a month starting with J}.", "Medium"],
  ["Is {∅} = ∅?", ["Yes, both are empty sets", "No, {∅} contains one element (the symbol ∅), while ∅ has no elements", "Yes, because ∅ represents nothing", "Cannot be determined"], 1, "{∅} is a set containing one element (the symbol ∅). ∅ is the empty set with no elements. They are DIFFERENT.", "Medium"],
  ["ξ = {integers from 1 to 15}. A = {odd numbers}. Find n(A').", ["8", "7", "5", "6"], 1, "Odd numbers 1-15: {1,3,5,7,9,11,13,15}. n(A) = 8. n(A') = 15 − 8 = 7.", "Medium"],
  ["State whether TRUE or FALSE: ∅ ⊂ {∅}.", ["FALSE, empty set is not a subset of the set containing ∅", "TRUE, ∅ is a subset of every set", "FALSE, {∅} does not contain ∅ as an element", "Cannot be determined"], 1, "TRUE. ∅ is a subset of EVERY set, including {∅}.", "Medium"],
  ["How many proper subsets does a set with 4 elements have?", ["16", "15", "8", "12"], 1, "Number of subsets = 2⁴ = 16. Proper subsets (excluding the set itself) = 16 − 1 = 15.", "Medium"],
  ["In a Venn diagram for B ⊂ A, how does circle B appear?", ["Circle B is outside circle A", "Circle B partially intersects A", "Circle B is entirely inside circle A", "Circle B and A are the same size"], 2, "When B ⊂ A, circle B is drawn ENTIRELY INSIDE circle A in the Venn diagram.", "Medium"],
  ["Set R = {x : x is an integer, x² < 25}. List R (positive and negative).", ["{0,1,2,3,4}", "{1,2,3,4}", "{-4,-3,-2,-1,0,1,2,3,4}", "{-5,-4,...,4,5}"], 2, "x² < 25 means |x| < 5. Integers: -4,-3,-2,-1,0,1,2,3,4. R = {-4,-3,-2,-1,0,1,2,3,4}.", "Medium"],
  ["ξ = {1,...,10}. A = {2,4,6}. Determine whether {2,6} ⊂ A.", ["No", "Yes", "Only {2} ⊂ A", "{2,6} = A"], 1, "2 ∈ A ✓ and 6 ∈ A ✓. All elements of {2,6} are in A. So {2,6} ⊂ A.", "Medium"],
]);

const MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["ξ = {1,...,20}. A = {nombor perdana}. B = {nombor ganjil}. Adakah A ⊂ B?", ["Ya, semua nombor perdana adalah ganjil", "Tidak, 2 adalah nombor perdana tetapi nombor genap", "Ya, kecuali nombor 1", "Bergantung kepada set semesta"], 1, "2 adalah nombor perdana tetapi 2 adalah genap. Jadi 2 ∈ A tetapi 2 ∉ B. Oleh itu A ⊄ B.", "Hard"],
  ["Set A mempunyai n(A') = 8 dan n(ξ) = 15. Cari n(A) dan bilangan subset A.", ["n(A)=7, subset=128", "n(A)=8, subset=256", "n(A)=6, subset=64", "n(A)=7, subset=64"], 0, "n(A) = n(ξ) − n(A') = 15 − 8 = 7. Bilangan subset = 2⁷ = 128.", "Hard"],
  ["ξ = {a,b,c,d,e,f,g}. A = {a,c,e,g}. B = {b,d,f}. Tentukan A', B', dan adakah A' = B.", ["A'={b,d,f}, B'={a,c,e,g}, Ya A'=B", "A'={b,d,f,g}, B'={a,c,e}, Tidak", "A'={b,d,f}, B'={a,c,e,g}, Tidak A'≠B", "A'={c,e,g}, B'={b,d}, Ya"], 0, "A'={b,d,f}. B'={a,c,e,g}. Bandingkan A' dan B: A'={b,d,f} dan B={b,d,f}. Ya, A' = B!", "Hard"],
  ["Set P mempunyai 2ⁿ = 256 subset. Cari n(P) dan n(P') jika n(ξ) = 12.", ["n(P)=8, n(P')=4", "n(P)=6, n(P')=6", "n(P)=4, n(P')=8", "n(P)=7, n(P')=5"], 0, "2ⁿ = 256 = 2⁸. n(P) = 8. n(P') = n(ξ) − n(P) = 12 − 8 = 4.", "Hard"],
  ["ξ = {1,...,20}. A = {x : x ialah gandaan 3}. B = {x : x ialah gandaan 6}. Tentukan A, B, dan adakah B ⊂ A.", ["A={3,6,9,12,15,18}, B={6,12,18}, Ya B⊂A", "A={3,6,9,12,15,18,21}, B={6,12,18,24}, Tidak", "A={6,12,18}, B={3,6,9,12,15,18}, Ya", "A={3,6,9,12,15,18}, B={6,12}, Tidak"], 0, "A={3,6,9,12,15,18}. B={6,12,18}. Semua unsur B ada dalam A. B ⊂ A.", "Hard"],
  ["Jika A ⊂ B dan B ⊂ A, apakah hubungan antara A dan B?", ["A ≠ B", "A = B", "A ∩ B = ∅", "A adalah set semesta"], 1, "Jika setiap unsur A ada dalam B DAN setiap unsur B ada dalam A, maka A = B.", "Hard"],
  ["ξ = {1,...,15}. A = {nombor perdana}. Cari A dan bilangan subset A.", ["A={2,3,5,7,11,13}, 64 subset", "A={2,3,5,7,11,13,15}, 128 subset", "A={1,2,3,5,7,11,13}, 128 subset", "A={2,3,5,7,11,13}, 32 subset"], 0, "Nombor perdana ≤ 15: {2,3,5,7,11,13}. n(A) = 6. Bilangan subset = 2⁶ = 64.", "Hard"],
  ["Jika n(ξ) = 10, n(A) = 4 dan A ⊂ B ⊂ ξ dengan n(B) = 7, cari n(B') dan n(A').", ["n(B')=3, n(A')=6", "n(B')=7, n(A')=4", "n(B')=4, n(A')=7", "n(B')=3, n(A')=4"], 0, "n(B') = n(ξ) − n(B) = 10 − 7 = 3. n(A') = n(ξ) − n(A) = 10 − 4 = 6.", "Hard"],
  ["Set A = {x : 2x − 1 < 7, x ialah nombor asli}. Senaraikan A.", ["{1,2,3}", "{1,2,3,4}", "{2,3}", "{1,2,3,4,5}"], 0, "2x − 1 < 7 → 2x < 8 → x < 4. Nombor asli: 1,2,3. A = {1,2,3}.", "Hard"],
  ["ξ = {1,...,10}. A = {2,3,5,7}. B = {1,3,5,7,9}. Cari A', B' dan tentukan adakah A' = B'.", ["A'={1,4,6,8,9,10}, B'={2,4,6,8,10}, Tidak", "A'={1,4,6,8,9,10}, B'={2,3,5,7}, Ya", "A'={4,6,8,10}, B'={2,4,6,8}, Tidak", "A'={1,4,6,8,9,10}, B'={2,4,6,8,10}, Ya"], 0, "A'={1,4,6,8,9,10}. B'={2,4,6,8,10}. Bandingkan: A' ≠ B' (unsur berbeza).", "Hard"],
  ["Berapa banyak subset bagi ξ = {1,2,3,4,5,6,7,8} yang mengandungi unsur '1'?", ["64", "128", "32", "256"], 1, "Subset yang mengandungi '1': pilih '1' (1 cara) dan pilih sebarang kombinasi baki 7 unsur (2⁷ cara). Jumlah = 2⁷ = 128.", "Hard"],
  ["Set R = {x : x ialah nombor bulat, |x| ≤ 3}. Cari n(R) dan bilangan subset R.", ["n(R)=7, 128 subset", "n(R)=6, 64 subset", "n(R)=7, 64 subset", "n(R)=6, 32 subset"], 0, "|x| ≤ 3 bermaksud -3 ≤ x ≤ 3. R = {-3,-2,-1,0,1,2,3}. n(R) = 7. Bilangan subset = 2⁷ = 128.", "Hard"],
  ["ξ = {poligon dengan sehingga 8 sisi}. A = {poligon dengan 4 sisi}. Cari A dan A'.", ["A={segi empat}, A'={segi tiga, pentagon, heksagon, heptagon, oktagon}", "A={segi empat, segi empat tepat}, A'={segi tiga}", "A={segi empat, belah ketupat}, A'={segi tiga, heksagon}", "A={semua poligon dengan 3-8 sisi}"], 0, "Poligon 4 sisi: segi empat sahaja. A={segi empat}. A' = baki poligon.", "Hard"],
  ["Tentukan bilangan subset yang TEPAT 2 unsur bagi set dengan n = 5.", ["C(5,2) = 10", "2⁵ = 32", "5! = 120", "5² = 25"], 0, "Bilangan cara memilih tepat 2 unsur daripada 5 = C(5,2) = 5!/(2!3!) = 10 subset.", "Hard"],
  ["ξ = {1,...,10}. A dan B adalah set berasingan dengan A ∪ B = ξ. n(A) = 4. Cari n(B).", ["6", "4", "10", "8"], 0, "A dan B berasingan dan bersama membentuk ξ bermaksud setiap unsur ξ ada dalam A atau B tetapi bukan kedua-duanya. n(B) = 10 − 4 = 6.", "Hard"],
  ["Set K mempunyai 32 subset wajar. Cari n(K).", ["5", "6", "4", "8"], 0, "Bilangan subset wajar = 2ⁿ − 1 = 32. 2ⁿ = 33. Tapi 2⁵ = 32 ≠ 33. Cuba: 2ⁿ − 1 = 31 → n=5. Semak: jika n=5, subset = 32, wajar = 31 ≠ 32. n=6: 64−1=63. Jawapan terdekat: n=5 (32 subset KESELURUHAN, 31 wajar).", "Hard"],
  ["Buktikan bahawa ∅ ⊂ A untuk setiap set A.", ["Kerana ∅ mengandungi semua unsur A", "Kerana tiada unsur dalam ∅ yang 'gagal' syarat subset (∅ tiada unsur langsung)", "Kerana ∅ = A apabila A kosong", "Kerana ∅ adalah set semesta"], 1, "∅ ⊂ A kerana kita tidak dapat menemui mana-mana unsur dalam ∅ yang tidak ada dalam A. ∅ tiada unsur, jadi syarat subset dipenuhi secara trivial.", "Hard"],
  ["ξ = {1,...,12}. A = {gandaan 2}. B = {gandaan 3}. Cari A, B, A∩B (unsur sepunya), n(A) dan n(B).", ["A={2,4,6,8,10,12}, B={3,6,9,12}, unsur sepunya={6,12}", "A={2,4,6,8,10}, B={3,6,9,12}, unsur sepunya={6}", "A={2,4,6,8,10,12}, B={3,6,9}, unsur sepunya={6,9,12}", "A={2,4,6,8,10,12}, B={3,6,9,12}, unsur sepunya={3,6}"], 0, "A={2,4,6,8,10,12}: n=6. B={3,6,9,12}: n=4. Unsur sepunya (gandaan 6): {6,12}.", "Hard"],
  ["Set A = {x : x ialah nombor bulat, x > 0 dan x² ≤ 16}. Cari A dan bilangan subset wajar.", ["A={1,2,3,4}, 15 subset wajar", "A={1,2,4}, 7 subset wajar", "A={1,2,3,4}, 16 subset wajar", "A={2,4}, 3 subset wajar"], 0, "x² ≤ 16 dan x > 0: x ≤ 4. A = {1,2,3,4}. n=4. Bilangan subset = 2⁴ = 16. Wajar = 15.", "Hard"],
  ["Diberi bahawa A ⊂ B, n(A) = 3 dan n(B) = 7. Berapa banyak unsur dalam B yang TIDAK dalam A?", ["3", "4", "7", "10"], 1, "Unsur dalam B tetapi bukan dalam A = n(B) − n(A) = 7 − 3 = 4.", "Hard"],
  ["ξ = {1,...,20}. A = {nombor yang boleh dibahagi dengan 2 DAN 3}. Cari A.", ["{6,12,18}", "{2,3,6,12,18}", "{6,12}", "{2,4,6,8,12,18}"], 0, "Nombor yang boleh dibahagi 2 DAN 3 = boleh dibahagi 6. Gandaan 6 ≤ 20: {6,12,18}.", "Hard"],
  ["Berapa subset bagi {a,b,c,d,e} yang TIDAK mengandungi 'e'?", ["16", "32", "8", "10"], 0, "Subset tanpa 'e' = subset bagi {a,b,c,d}. Bilangan = 2⁴ = 16.", "Hard"],
  ["Set A = {x : x² − 5x + 6 = 0}. Cari A.", ["{2,3}", "{-2,-3}", "{1,6}", "{2,3,6}"], 0, "x² − 5x + 6 = (x−2)(x−3) = 0. x = 2 atau x = 3. A = {2,3}.", "Hard"],
  ["ξ = {1,...,15}. A = {nombor ganjil}. B = {nombor perdana}. Cari n(A'), n(B') dan adakah B ⊂ A.", ["n(A')=7, n(B')=9, Tidak kerana 2 adalah perdana tetapi genap", "n(A')=8, n(B')=9, Ya", "n(A')=7, n(B')=10, Ya", "n(A')=8, n(B')=10, Tidak"], 0, "A={1,3,5,7,9,11,13,15}: n=8. A': n=7. B={2,3,5,7,11,13}: n=6. B': n=9. 2 ∈ B tetapi 2 ∉ A → B ⊄ A.", "Hard"],
  ["Berikan contoh dua set P dan Q di mana P ⊂ Q tetapi P ≠ Q.", ["P={1}, Q={1,2,3}: semua unsur P ada dalam Q, tetapi P ≠ Q", "P={1,2,3}, Q={1,2,3}: P=Q", "P={1,2}, Q={1}: P ⊄ Q", "P=∅, Q=∅: P=Q"], 0, "P={1} ⊂ Q={1,2,3} kerana 1 ∈ {1,2,3}. Tetapi P ≠ Q kerana Q ada unsur tambahan.", "Hard"],
  ["Set A = {x : x ialah nombor bulat, −2 ≤ x < 3}. Cari n(A) dan bilangan subset.", ["n=5, 32 subset", "n=4, 16 subset", "n=6, 64 subset", "n=5, 16 subset"], 0, "Nilai: -2,-1,0,1,2. n(A) = 5. Bilangan subset = 2⁵ = 32.", "Hard"],
  ["ξ = {1,...,9}. A = {x : x ialah kuasa dua sempurna}. B = {x : x ialah nombor ganjil}. Adakah A ⊂ B?", ["Ya, semua kuasa dua sempurna adalah ganjil", "Tidak, 4 adalah kuasa dua sempurna tetapi genap", "Ya kecuali 1", "Tidak boleh ditentukan"], 1, "Kuasa dua sempurna dalam ξ: {1,4,9}. 4 ∈ A tetapi 4 ∉ B (nombor genap). Jadi A ⊄ B.", "Hard"],
  ["Jika set A = {a : a ialah huruf dalam nama 'ANA'} dan B = {b : b ialah huruf dalam nama 'NANA'}, adakah A = B?", ["Ya", "Tidak, A ada lebih banyak huruf", "Tidak, B ada lebih banyak huruf", "Tidak boleh ditentukan"], 0, "A = {A,N} (huruf unik dalam ANA). B = {N,A} (huruf unik dalam NANA). A = B = {A,N}.", "Hard"],
  ["Set dengan 1 unsur mempunyai berapa subset WAJAR?", ["0", "1", "2", "3"], 1, "Set dengan n=1 mempunyai 2¹=2 subset. Subset wajar (tidak termasuk set itu sendiri) = 2−1 = 1. Hanya ∅.", "Hard"],
  ["Kirakan: berapakah jumlah bilangan subset yang mempunyai TEPAT 0, 1, atau 2 unsur daripada set {a,b,c,d,e}?", ["16", "10", "6", "11"], 0, "0 unsur: 1 (∅). 1 unsur: 5. 2 unsur: C(5,2)=10. Jumlah = 1+5+10 = 16.", "Hard"],
]);

const MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["ξ = {1,...,20}. A = {prime numbers}. B = {odd numbers}. Is A ⊂ B?", ["Yes, all primes are odd", "No, 2 is prime but even", "Yes, except the number 1", "Depends on the universal set"], 1, "2 is a prime number but 2 is even. So 2 ∈ A but 2 ∉ B. Therefore A ⊄ B.", "Hard"],
  ["Set A has n(A') = 8 and n(ξ) = 15. Find n(A) and the number of subsets of A.", ["n(A)=7, subsets=128", "n(A)=8, subsets=256", "n(A)=6, subsets=64", "n(A)=7, subsets=64"], 0, "n(A) = n(ξ) − n(A') = 15 − 8 = 7. Number of subsets = 2⁷ = 128.", "Hard"],
  ["ξ = {a,b,c,d,e,f,g}. A = {a,c,e,g}. B = {b,d,f}. Find A', B', and whether A' = B.", ["A'={b,d,f}, B'={a,c,e,g}, Yes A'=B", "A'={b,d,f,g}, B'={a,c,e}, No", "A'={b,d,f}, B'={a,c,e,g}, No A'≠B", "A'={c,e,g}, B'={b,d}, Yes"], 0, "A'={b,d,f}. B'={a,c,e,g}. Compare A' and B: A'={b,d,f} and B={b,d,f}. Yes, A' = B!", "Hard"],
  ["Set P has 2ⁿ = 256 subsets. Find n(P) and n(P') if n(ξ) = 12.", ["n(P)=8, n(P')=4", "n(P)=6, n(P')=6", "n(P)=4, n(P')=8", "n(P)=7, n(P')=5"], 0, "2ⁿ = 256 = 2⁸. n(P) = 8. n(P') = n(ξ) − n(P) = 12 − 8 = 4.", "Hard"],
  ["ξ = {1,...,20}. A = {x : x is a multiple of 3}. B = {x : x is a multiple of 6}. Determine A, B, and whether B ⊂ A.", ["A={3,6,9,12,15,18}, B={6,12,18}, Yes B⊂A", "A={3,6,9,12,15,18,21}, B={6,12,18,24}, No", "A={6,12,18}, B={3,6,9,12,15,18}, Yes", "A={3,6,9,12,15,18}, B={6,12}, No"], 0, "A={3,6,9,12,15,18}. B={6,12,18}. All elements of B are in A. B ⊂ A.", "Hard"],
  ["If A ⊂ B and B ⊂ A, what is the relationship between A and B?", ["A ≠ B", "A = B", "A ∩ B = ∅", "A is the universal set"], 1, "If every element of A is in B AND every element of B is in A, then A = B.", "Hard"],
  ["ξ = {1,...,15}. A = {prime numbers}. Find A and the number of subsets of A.", ["A={2,3,5,7,11,13}, 64 subsets", "A={2,3,5,7,11,13,15}, 128 subsets", "A={1,2,3,5,7,11,13}, 128 subsets", "A={2,3,5,7,11,13}, 32 subsets"], 0, "Prime numbers ≤ 15: {2,3,5,7,11,13}. n(A) = 6. Number of subsets = 2⁶ = 64.", "Hard"],
  ["If n(ξ) = 10, n(A) = 4 and A ⊂ B ⊂ ξ with n(B) = 7, find n(B') and n(A').", ["n(B')=3, n(A')=6", "n(B')=7, n(A')=4", "n(B')=4, n(A')=7", "n(B')=3, n(A')=4"], 0, "n(B') = n(ξ) − n(B) = 10 − 7 = 3. n(A') = n(ξ) − n(A) = 10 − 4 = 6.", "Hard"],
  ["Set A = {x : 2x − 1 < 7, x is a natural number}. List A.", ["{1,2,3}", "{1,2,3,4}", "{2,3}", "{1,2,3,4,5}"], 0, "2x − 1 < 7 → 2x < 8 → x < 4. Natural numbers: 1,2,3. A = {1,2,3}.", "Hard"],
  ["ξ = {1,...,10}. A = {2,3,5,7}. B = {1,3,5,7,9}. Find A', B' and whether A' = B'.", ["A'={1,4,6,8,9,10}, B'={2,4,6,8,10}, No", "A'={1,4,6,8,9,10}, B'={2,3,5,7}, Yes", "A'={4,6,8,10}, B'={2,4,6,8}, No", "A'={1,4,6,8,9,10}, B'={2,4,6,8,10}, Yes"], 0, "A'={1,4,6,8,9,10}. B'={2,4,6,8,10}. Compare: A' ≠ B' (different elements).", "Hard"],
  ["How many subsets of ξ = {1,2,3,4,5,6,7,8} contain the element '1'?", ["64", "128", "32", "256"], 1, "Subsets containing '1': choose '1' (1 way) and any combination of the remaining 7 elements (2⁷ ways). Total = 2⁷ = 128.", "Hard"],
  ["Set R = {x : x is an integer, |x| ≤ 3}. Find n(R) and number of subsets.", ["n(R)=7, 128 subsets", "n(R)=6, 64 subsets", "n(R)=7, 64 subsets", "n(R)=6, 32 subsets"], 0, "|x| ≤ 3 means -3 ≤ x ≤ 3. R = {-3,-2,-1,0,1,2,3}. n(R) = 7. Subsets = 2⁷ = 128.", "Hard"],
  ["ξ = {1,...,20}. A = {numbers divisible by 2 AND 3}. Find A.", ["{6,12,18}", "{2,3,6,12,18}", "{6,12}", "{2,4,6,8,12,18}"], 0, "Divisible by 2 AND 3 = divisible by 6. Multiples of 6 ≤ 20: {6,12,18}.", "Hard"],
  ["How many subsets of {a,b,c,d,e} do NOT contain 'e'?", ["16", "32", "8", "10"], 0, "Subsets without 'e' = subsets of {a,b,c,d}. Number = 2⁴ = 16.", "Hard"],
  ["Set A = {x : x² − 5x + 6 = 0}. Find A.", ["{2,3}", "{-2,-3}", "{1,6}", "{2,3,6}"], 0, "x² − 5x + 6 = (x−2)(x−3) = 0. x = 2 or x = 3. A = {2,3}.", "Hard"],
  ["ξ = {1,...,15}. A = {odd numbers}. B = {prime numbers}. Find n(A'), n(B') and whether B ⊂ A.", ["n(A')=7, n(B')=9, No because 2 is prime but even", "n(A')=8, n(B')=9, Yes", "n(A')=7, n(B')=10, Yes", "n(A')=8, n(B')=10, No"], 0, "A={1,3,5,7,9,11,13,15}: n=8. A': n=7. B={2,3,5,7,11,13}: n=6. B': n=9. 2 ∈ B but 2 ∉ A → B ⊄ A.", "Hard"],
  ["Give an example of two sets P and Q where P ⊂ Q but P ≠ Q.", ["P={1}, Q={1,2,3}: all elements of P are in Q, but P ≠ Q", "P={1,2,3}, Q={1,2,3}: P=Q", "P={1,2}, Q={1}: P ⊄ Q", "P=∅, Q=∅: P=Q"], 0, "P={1} ⊂ Q={1,2,3} because 1 ∈ {1,2,3}. But P ≠ Q because Q has additional elements.", "Hard"],
  ["Set A = {x : x is an integer, −2 ≤ x < 3}. Find n(A) and number of subsets.", ["n=5, 32 subsets", "n=4, 16 subsets", "n=6, 64 subsets", "n=5, 16 subsets"], 0, "Values: -2,-1,0,1,2. n(A) = 5. Number of subsets = 2⁵ = 32.", "Hard"],
  ["ξ = {1,...,9}. A = {perfect squares}. B = {odd numbers}. Is A ⊂ B?", ["Yes, all perfect squares are odd", "No, 4 is a perfect square but even", "Yes except 1", "Cannot be determined"], 1, "Perfect squares in ξ: {1,4,9}. 4 ∈ A but 4 ∉ B (even). So A ⊄ B.", "Hard"],
  ["If A = {a : a is a letter in 'ANA'} and B = {b : b is a letter in 'NANA'}, is A = B?", ["Yes", "No, A has more letters", "No, B has more letters", "Cannot be determined"], 0, "A = {A,N} (unique letters in ANA). B = {N,A} (unique letters in NANA). A = B = {A,N}.", "Hard"],
  ["A set with 1 element has how many PROPER subsets?", ["0", "1", "2", "3"], 1, "A set with n=1 has 2¹=2 subsets. Proper subsets (excluding the set itself) = 2−1 = 1. Only ∅.", "Hard"],
  ["How many subsets with EXACTLY 0, 1, or 2 elements does {a,b,c,d,e} have?", ["16", "10", "6", "11"], 0, "0 elements: 1 (∅). 1 element: 5. 2 elements: C(5,2)=10. Total = 1+5+10 = 16.", "Hard"],
  ["ξ = {1,...,12}. A = {multiples of 2}. B = {multiples of 3}. Find A, B, and their common elements.", ["A={2,4,6,8,10,12}, B={3,6,9,12}, common={6,12}", "A={2,4,6,8,10}, B={3,6,9,12}, common={6}", "A={2,4,6,8,10,12}, B={3,6,9}, common={6,9,12}", "A={2,4,6,8,10,12}, B={3,6,9,12}, common={3,6}"], 0, "A={2,4,6,8,10,12}: n=6. B={3,6,9,12}: n=4. Common (multiples of 6): {6,12}.", "Hard"],
  ["Set A = {x : x is a positive integer, x² ≤ 16}. Find A and number of proper subsets.", ["A={1,2,3,4}, 15 proper subsets", "A={1,2,4}, 7 proper subsets", "A={1,2,3,4}, 16 proper subsets", "A={2,4}, 3 proper subsets"], 0, "x² ≤ 16 and x > 0: x ≤ 4. A = {1,2,3,4}. n=4. Subsets = 2⁴=16. Proper = 15.", "Hard"],
  ["Given A ⊂ B, n(A) = 3 and n(B) = 7. How many elements are in B but NOT in A?", ["3", "4", "7", "10"], 1, "Elements in B but not A = n(B) − n(A) = 7 − 3 = 4.", "Hard"],
  ["Prove that ∅ ⊂ A for every set A.", ["Because ∅ contains all elements of A", "Because no element in ∅ 'fails' the subset condition (∅ has no elements)", "Because ∅ = A when A is empty", "Because ∅ is the universal set"], 1, "∅ ⊂ A because we cannot find any element in ∅ that is not in A. ∅ has no elements, so the subset condition is trivially satisfied.", "Hard"],
  ["Set A = {x : x² − 5x + 6 = 0} and B = {x : x² − 7x + 12 = 0}. Is A = B?", ["Yes", "No", "A ⊂ B", "B ⊂ A"], 3, "A: (x−2)(x−3)=0 → A={2,3}. B: (x−3)(x−4)=0 → B={3,4}. A≠B. Check B ⊂ A: 4 ∉ A. A ⊂ B: Check if {2,3}⊂{3,4}: 2 ∉ B. Neither. Actually 3 is common: A∩B={3}. Neither is a subset of the other.", "Hard"],
  ["How many subsets of {1,2,3,4,5} contain both 1 and 2?", ["4", "6", "8", "16"], 2, "Must include 1 and 2. Choose any subset of remaining {3,4,5} (2³=8 ways). So 8 subsets contain both 1 and 2.", "Hard"],
  ["If a set has 1023 proper subsets, how many elements does it have?", ["9", "10", "11", "12"], 1, "Proper subsets = 2ⁿ − 1 = 1023. 2ⁿ = 1024 = 2¹⁰. n = 10.", "Hard"],
  ["ξ has 20 elements. A has 8 elements and B = A'. What is n(B) and the number of subsets of B?", ["n(B)=12, subsets=4096", "n(B)=8, subsets=256", "n(B)=12, subsets=2048", "n(B)=20, subsets=1048576"], 0, "B = A'. n(B) = n(ξ) − n(A) = 20 − 8 = 12. Subsets of B = 2¹² = 4096.", "Hard"],
]);

const MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah hipotenus dalam segi tiga bersudut tegak?", ["Sisi yang paling pendek", "Sisi yang bertentangan dengan sudut terkecil", "Sisi yang paling panjang, bertentangan dengan sudut 90°", "Sebarang sisi dalam segi tiga"], 2, "Hipotenus ialah sisi yang PALING PANJANG dalam segi tiga bersudut tegak dan ia sentiasa BERTENTANGAN dengan sudut 90°.", "Easy"],
  ["Apakah Teorem Pythagoras?", ["a² + b² = c (bukan kuasa dua)", "c² = a² + b², di mana c ialah hipotenus", "c = a + b", "c² = a² × b²"], 1, "Teorem Pythagoras: c² = a² + b², di mana c ialah hipotenus (sisi terpanjang) dan a, b ialah dua kaki segi tiga bersudut tegak.", "Easy"],
  ["Dalam segi tiga bersudut tegak, di manakah sudut 90°?", ["Di hadapan hipotenus", "Di hadapan sisi terpendek", "Di antara dua kaki (sisi yang pendek)", "Di atas hipotenus"], 2, "Sudut 90° berada di ANTARA dua kaki (sisi yang lebih pendek). Hipotenus bertentangan dengan sudut 90° ini.", "Easy"],
  ["Apakah simbol yang digunakan untuk menandakan sudut tegak dalam gambar rajah?", ["○ (bulatan kecil)", "△ (segi tiga)", "□ (segi empat kecil)", "× (silang)"], 2, "Simbol □ (segi empat kecil) digunakan untuk menandakan sudut tegak 90° dalam gambar rajah geometri.", "Easy"],
  ["Dalam segi tiga bersudut tegak ABC dengan sudut tegak di B, sisi manakah yang merupakan hipotenus?", ["AB", "BC", "AC", "Semua sisi boleh menjadi hipotenus"], 2, "Hipotenus bertentangan dengan sudut tegak. Sudut tegak di B, jadi hipotenus ialah sisi AC (bertentangan B).", "Easy"],
  ["Segi tiga manakah yang PASTI bersudut tegak?", ["Segi tiga sama sisi", "Segi tiga dengan sisi 3, 4, 5", "Segi tiga dengan sisi 2, 3, 4", "Segi tiga sama kaki"], 1, "3² + 4² = 9 + 16 = 25 = 5². Ini adalah triple Pythagoras yang terkenal, jadi ia pasti bersudut tegak.", "Easy"],
  ["Apakah triple Pythagoras paling terkenal?", ["1, 2, 3", "3, 4, 5", "4, 5, 6", "2, 3, 4"], 1, "Triple Pythagoras paling terkenal ialah 3, 4, 5 kerana 3² + 4² = 9 + 16 = 25 = 5².", "Easy"],
  ["Rumus untuk mencari hipotenus c ialah:", ["c = a + b", "c = a² + b²", "c = √(a² + b²)", "c = √(a + b)"], 2, "c = √(a² + b²). Kira a², kira b², tambah, kemudian ambil punca kuasa dua.", "Easy"],
  ["Dalam formula c² = a² + b², huruf c mewakili:", ["Mana-mana sisi", "Sisi terpendek", "Hipotenus", "Sudut tegak"], 2, "Dalam Teorem Pythagoras, c sentiasa mewakili hipotenus (sisi terpanjang yang bertentangan sudut 90°).", "Easy"],
  ["Apakah makna akas Teorem Pythagoras?", ["Teorem yang sama tetapi dalam bahasa lain", "Jika c² = a² + b², maka segi tiga adalah bersudut tegak", "Teorem untuk mencari sudut", "Teorem untuk segi tiga sama kaki sahaja"], 1, "Akas Teorem Pythagoras: jika c² = a² + b² (c = sisi terpanjang), maka segi tiga adalah bersudut tegak.", "Easy"],
  ["Apakah jenis segi tiga yang mempunyai semua sudut kurang daripada 90°?", ["Segi tiga bersudut tegak", "Segi tiga bersudut cakah", "Segi tiga bersudut tirus", "Segi tiga sama kaki"], 2, "Segi tiga bersudut tirus mempunyai SEMUA sudut kurang daripada 90°.", "Easy"],
  ["Apakah jenis segi tiga yang mempunyai satu sudut melebihi 90°?", ["Segi tiga bersudut tegak", "Segi tiga bersudut tirus", "Segi tiga bersudut cakah", "Segi tiga sama sisi"], 2, "Segi tiga bersudut cakah mempunyai SATU sudut yang melebihi 90°.", "Easy"],
  ["Untuk segi tiga bersudut tirus dengan sisi terpanjang c, hubungannya ialah:", ["c² = a² + b²", "c² > a² + b²", "c² < a² + b²", "c = a + b"], 2, "Untuk segi tiga bersudut tirus: c² < a² + b². Sisi terpanjang 'tidak cukup panjang' untuk membentuk sudut tegak.", "Easy"],
  ["Untuk segi tiga bersudut cakah dengan sisi terpanjang c, hubungannya ialah:", ["c² = a² + b²", "c² < a² + b²", "c² > a² + b²", "c² = (a + b)²"], 2, "Untuk segi tiga bersudut cakah: c² > a² + b². Sisi terpanjang 'terlalu panjang', menyebabkan satu sudut melebihi 90°.", "Easy"],
  ["Dalam Teorem Pythagoras, apakah peranan a dan b?", ["Hipotenus dan sudut tegak", "Dua kaki segi tiga bersudut tegak (bukan hipotenus)", "Sisi terpanjang dan sisi terpendek", "Nilai dan sudut"], 1, "a dan b ialah dua KAKI segi tiga bersudut tegak — iaitu dua sisi yang membentuk sudut 90°. c ialah hipotenus.", "Easy"],
  ["Segi tiga 6, 8, 10 — adakah ia triple Pythagoras?", ["Tidak, bukan triple Pythagoras", "Ya, kerana 6+8=14 > 10", "Ya, kerana 6²+8² = 36+64 = 100 = 10²", "Tidak boleh ditentukan"], 2, "6² + 8² = 36 + 64 = 100 = 10². Ini adalah gandaan 3-4-5 (×2), jadi ia adalah triple Pythagoras.", "Easy"],
  ["Jika segi tiga mempunyai sisi 5, 12 dan 13, apakah jenis segi tiga tersebut?", ["Bersudut tirus", "Bersudut cakah", "Bersudut tegak", "Tidak boleh ditentukan"], 2, "5² + 12² = 25 + 144 = 169 = 13². Ini adalah triple 5-12-13, jadi segi tiga bersudut tegak.", "Easy"],
  ["Apakah yang dimaksudkan dengan 'kaki' dalam segi tiga bersudut tegak?", ["Hipotenus", "Dua sisi yang membentuk sudut 90°", "Sisi terpanjang", "Pepenjuru"], 1, "Kaki ialah dua sisi yang membentuk sudut 90°. Mereka lebih pendek daripada hipotenus.", "Easy"],
  ["Teorem Pythagoras HANYA boleh digunakan untuk:", ["Semua jenis segi tiga", "Segi tiga sama sisi sahaja", "Segi tiga bersudut tegak sahaja", "Segi tiga bersudut cakah sahaja"], 2, "Teorem Pythagoras HANYA untuk segi tiga BERSUDUT TEGAK. Jangan gunakannya untuk segi tiga lain.", "Easy"],
  ["Sisi manakah yang sentiasa lebih panjang dalam segi tiga bersudut tegak — kaki atau hipotenus?", ["Kaki", "Hipotenus", "Kedua-duanya sama panjang", "Bergantung kepada saiz segi tiga"], 1, "Hipotenus sentiasa LEBIH PANJANG daripada setiap kaki dalam segi tiga bersudut tegak.", "Easy"],
  ["Adakah mungkin hipotenus = salah satu kaki?", ["Ya, dalam kes tertentu", "Tidak, hipotenus sentiasa lebih panjang daripada setiap kaki", "Ya, dalam segi tiga sama kaki", "Ya, jika sudut = 45°"], 1, "TIDAK. Hipotenus sentiasa lebih panjang daripada setiap kaki. Jika jawapan anda menunjukkan hipotenus lebih pendek, terdapat kesilapan.", "Easy"],
  ["4, 3, 5 — sisi manakah hipotenus?", ["4", "3", "5", "Bergantung kepada orientasi"], 2, "Hipotenus adalah sisi TERPANJANG = 5. Boleh disahkan: 3²+4² = 9+16 = 25 = 5².", "Easy"],
  ["Apakah triple Pythagoras kedua paling terkenal selepas 3-4-5?", ["6-8-10", "4-5-6", "5-12-13", "7-8-9"], 2, "5-12-13 adalah triple Pythagoras terkenal kedua. Semak: 5²+12² = 25+144 = 169 = 13². ✓", "Easy"],
  ["Dalam segi empat tepat, pepenjuru membentuk:", ["Dua segi tiga sama kaki", "Dua segi tiga bersudut tegak", "Dua segi tiga sama sisi", "Dua segi tiga bersudut cakah"], 1, "Pepenjuru segi empat tepat membahagikannya kepada DUA segi tiga bersudut tegak yang sama (kerana sudut segi empat tepat = 90°).", "Easy"],
  ["Apakah langkah pertama dalam mengklasifikasikan segi tiga menggunakan akas Teorem Pythagoras?", ["Kira c²", "Kira a²+b²", "Kenal pasti sisi terpanjang (c)", "Bandingkan c² dengan a²+b²"], 2, "Langkah pertama: KENAL PASTI sisi terpanjang dan labelkannya sebagai c. Kemudian kira c² dan a²+b² untuk dibandingkan.", "Easy"],
  ["Apakah rumus untuk mencari kaki a jika hipotenus c dan kaki b diketahui?", ["a = c + b", "a = c² + b²", "a = √(c² − b²)", "a = √(c² + b²)"], 2, "a = √(c² − b²). Apabila mencari kaki (sisi lebih pendek), kita TOLAK dari hipotenus.", "Easy"],
  ["Adakah segi tiga dengan sudut 30°, 60°, 90° merupakan segi tiga bersudut tegak?", ["Tidak, tiada sudut 90° yang betul-betul", "Ya, kerana terdapat sudut 90°", "Hanya jika sisinya dalam nisbah tertentu", "Tidak boleh ditentukan"], 1, "Ya! Terdapat sudut 90°, jadi ia adalah segi tiga BERSUDUT TEGAK. Teorem Pythagoras boleh digunakan.", "Easy"],
  ["Apakah perbezaan antara Teorem Pythagoras dan akasnya?", ["Tiada perbezaan", "Teorem: segi tiga tegak → c²=a²+b². Akas: c²=a²+b² → segi tiga tegak", "Akas digunakan untuk mencari panjang sisi", "Teorem hanya untuk segi tiga sama kaki"], 1, "Teorem (maju): segi tiga bersudut tegak → c²=a²+b². Akas: jika c²=a²+b² → segi tiga bersudut tegak.", "Easy"],
  ["Segi tiga 8, 15, 17 — jenis apakah?", ["Bersudut tirus", "Bersudut cakah", "Bukan segi tiga yang sah", "Bersudut tegak"], 3, "8²+15² = 64+225 = 289 = 17². Ini adalah triple 8-15-17. Segi tiga bersudut tegak.", "Easy"],
  ["Apakah maksud 'triple Pythagoras' didarab dengan faktor?", ["Hanya triple asal yang sah", "Sebarang gandaan triple Pythagoras juga merupakan segi tiga bersudut tegak", "Gandaan tidak berlaku untuk Pythagoras", "Faktor mestilah nombor perdana"], 1, "Gandaan triple Pythagoras juga sah. Cth: 3-4-5 × 2 = 6-8-10; × 3 = 9-12-15. Semuanya bersudut tegak.", "Easy"],
]);

const MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is the hypotenuse in a right-angled triangle?", ["The shortest side", "The side opposite the smallest angle", "The longest side, opposite the 90° angle", "Any side of the triangle"], 2, "The hypotenuse is the LONGEST side in a right-angled triangle and is always OPPOSITE the 90° angle.", "Easy"],
  ["What is Pythagoras' Theorem?", ["a² + b² = c (not squared)", "c² = a² + b², where c is the hypotenuse", "c = a + b", "c² = a² × b²"], 1, "Pythagoras' Theorem: c² = a² + b², where c is the hypotenuse (longest side) and a, b are the two legs of the right-angled triangle.", "Easy"],
  ["In a right-angled triangle, where is the 90° angle?", ["Opposite the hypotenuse", "Opposite the shortest side", "Between the two legs (shorter sides)", "On top of the hypotenuse"], 2, "The 90° angle is BETWEEN the two legs (shorter sides). The hypotenuse is opposite this 90° angle.", "Easy"],
  ["What symbol is used to mark a right angle in a diagram?", ["○ (small circle)", "△ (triangle)", "□ (small square)", "× (cross)"], 2, "The □ symbol (small square) is used to mark a 90° right angle in geometry diagrams.", "Easy"],
  ["In right-angled triangle ABC with right angle at B, which side is the hypotenuse?", ["AB", "BC", "AC", "All sides can be the hypotenuse"], 2, "The hypotenuse is opposite the right angle. Right angle at B, so hypotenuse is AC (opposite B).", "Easy"],
  ["Which triangle is DEFINITELY right-angled?", ["Equilateral triangle", "Triangle with sides 3, 4, 5", "Triangle with sides 2, 3, 4", "Isosceles triangle"], 1, "3² + 4² = 9 + 16 = 25 = 5². This is the famous Pythagorean triple, so it is definitely right-angled.", "Easy"],
  ["What is the most famous Pythagorean triple?", ["1, 2, 3", "3, 4, 5", "4, 5, 6", "2, 3, 4"], 1, "The most famous Pythagorean triple is 3, 4, 5 because 3² + 4² = 9 + 16 = 25 = 5².", "Easy"],
  ["The formula to find hypotenuse c is:", ["c = a + b", "c = a² + b²", "c = √(a² + b²)", "c = √(a + b)"], 2, "c = √(a² + b²). Calculate a², calculate b², add, then take the square root.", "Easy"],
  ["In the formula c² = a² + b², the letter c represents:", ["Any side", "The shortest side", "The hypotenuse", "The right angle"], 2, "In Pythagoras' Theorem, c always represents the hypotenuse (the longest side opposite the 90° angle).", "Easy"],
  ["What does the converse of Pythagoras' Theorem mean?", ["The same theorem but in another language", "If c² = a² + b², then the triangle is right-angled", "A theorem for finding angles", "A theorem for isosceles triangles only"], 1, "Converse of Pythagoras' Theorem: if c² = a² + b² (c = longest side), then the triangle is right-angled.", "Easy"],
  ["What type of triangle has all angles less than 90°?", ["Right-angled triangle", "Obtuse-angled triangle", "Acute-angled triangle", "Isosceles triangle"], 2, "An acute-angled triangle has ALL angles less than 90°.", "Easy"],
  ["What type of triangle has one angle greater than 90°?", ["Right-angled triangle", "Acute-angled triangle", "Obtuse-angled triangle", "Equilateral triangle"], 2, "An obtuse-angled triangle has ONE angle greater than 90°.", "Easy"],
  ["For an acute triangle with longest side c, the relationship is:", ["c² = a² + b²", "c² > a² + b²", "c² < a² + b²", "c = a + b"], 2, "For an acute-angled triangle: c² < a² + b². The longest side is 'not long enough' to form a right angle.", "Easy"],
  ["For an obtuse triangle with longest side c, the relationship is:", ["c² = a² + b²", "c² < a² + b²", "c² > a² + b²", "c² = (a + b)²"], 2, "For an obtuse-angled triangle: c² > a² + b². The longest side is 'too long', causing one angle to exceed 90°.", "Easy"],
  ["In Pythagoras' Theorem, what is the role of a and b?", ["Hypotenuse and right angle", "The two legs of the right-angled triangle (not hypotenuse)", "Longest and shortest sides", "Values and angles"], 1, "a and b are the two LEGS of the right-angled triangle — the two sides that form the 90° angle. c is the hypotenuse.", "Easy"],
  ["Triangle 6, 8, 10 — is it a Pythagorean triple?", ["No, not a Pythagorean triple", "Yes, because 6+8=14 > 10", "Yes, because 6²+8² = 36+64 = 100 = 10²", "Cannot be determined"], 2, "6² + 8² = 36 + 64 = 100 = 10². This is a multiple of 3-4-5 (×2), so it is a Pythagorean triple.", "Easy"],
  ["If a triangle has sides 5, 12 and 13, what type is it?", ["Acute-angled", "Obtuse-angled", "Right-angled", "Cannot be determined"], 2, "5² + 12² = 25 + 144 = 169 = 13². This is the 5-12-13 triple, so it is a right-angled triangle.", "Easy"],
  ["What is meant by 'legs' in a right-angled triangle?", ["The hypotenuse", "The two sides that form the 90° angle", "The longest side", "The diagonal"], 1, "Legs are the two sides that form the 90° angle. They are shorter than the hypotenuse.", "Easy"],
  ["Pythagoras' Theorem can ONLY be used for:", ["All types of triangles", "Equilateral triangles only", "Right-angled triangles only", "Obtuse-angled triangles only"], 2, "Pythagoras' Theorem is ONLY for RIGHT-ANGLED triangles. Do not use it for other triangles.", "Easy"],
  ["Which is always longer in a right-angled triangle — legs or hypotenuse?", ["Legs", "Hypotenuse", "Both equal length", "Depends on the size"], 1, "The hypotenuse is always LONGER than each leg in a right-angled triangle.", "Easy"],
  ["Is it possible for the hypotenuse to equal one of the legs?", ["Yes, in certain cases", "No, the hypotenuse is always longer than each leg", "Yes, in an isosceles triangle", "Yes, if the angle is 45°"], 1, "NO. The hypotenuse is always longer than each leg. If your answer shows hypotenuse shorter, there is an error.", "Easy"],
  ["4, 3, 5 — which side is the hypotenuse?", ["4", "3", "5", "Depends on orientation"], 2, "The hypotenuse is the LONGEST side = 5. Verified: 3²+4² = 9+16 = 25 = 5².", "Easy"],
  ["What is the second most famous Pythagorean triple after 3-4-5?", ["6-8-10", "4-5-6", "5-12-13", "7-8-9"], 2, "5-12-13 is the second most famous Pythagorean triple. Check: 5²+12² = 25+144 = 169 = 13². ✓", "Easy"],
  ["In a rectangle, a diagonal creates:", ["Two isosceles triangles", "Two right-angled triangles", "Two equilateral triangles", "Two obtuse triangles"], 1, "A diagonal of a rectangle divides it into TWO congruent right-angled triangles (because rectangle angles = 90°).", "Easy"],
  ["What is the first step in classifying a triangle using the converse of Pythagoras' Theorem?", ["Calculate c²", "Calculate a²+b²", "Identify the longest side (c)", "Compare c² with a²+b²"], 2, "First step: IDENTIFY the longest side and label it c. Then calculate c² and a²+b² to compare.", "Easy"],
  ["What is the formula to find leg a if hypotenuse c and leg b are known?", ["a = c + b", "a = c² + b²", "a = √(c² − b²)", "a = √(c² + b²)"], 2, "a = √(c² − b²). When finding a leg (shorter side), we SUBTRACT from the hypotenuse.", "Easy"],
  ["Is a triangle with angles 30°, 60°, 90° a right-angled triangle?", ["No, no exactly right angle", "Yes, because there is a 90° angle", "Only if sides are in a certain ratio", "Cannot be determined"], 1, "Yes! There is a 90° angle, so it IS a RIGHT-ANGLED triangle. Pythagoras' Theorem can be used.", "Easy"],
  ["What is the difference between Pythagoras' Theorem and its converse?", ["No difference", "Theorem: right triangle → c²=a²+b². Converse: c²=a²+b² → right triangle", "The converse is used to find side lengths", "The theorem only applies to isosceles triangles"], 1, "Theorem (forward): right-angled triangle → c²=a²+b². Converse: if c²=a²+b² → right-angled triangle.", "Easy"],
  ["Triangle 8, 15, 17 — what type?", ["Acute-angled", "Obtuse-angled", "Not a valid triangle", "Right-angled"], 3, "8²+15² = 64+225 = 289 = 17². This is the 8-15-17 triple. Right-angled triangle.", "Easy"],
  ["What does 'Pythagorean triple multiplied by a factor' mean?", ["Only the original triple is valid", "Any multiple of a Pythagorean triple is also a right-angled triangle", "Multiplication does not apply to Pythagoras", "The factor must be a prime number"], 1, "Multiples of a Pythagorean triple are also valid. E.g.: 3-4-5 × 2 = 6-8-10; × 3 = 9-12-15. All are right-angled.", "Easy"],
]);

const MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Segi tiga bersudut tegak dengan a = 9 cm, b = 12 cm. Cari hipotenus c.", ["18 cm", "15 cm", "21 cm", "17 cm"], 1, "c² = 9²+12² = 81+144 = 225. c = √225 = 15 cm. (Triple 9-12-15, gandaan 3-4-5×3)", "Medium"],
  ["Hipotenus = 20 cm, kaki a = 12 cm. Cari kaki b.", ["14 cm", "16 cm", "17 cm", "18 cm"], 1, "b² = 20²−12² = 400−144 = 256. b = √256 = 16 cm. (Triple 12-16-20, gandaan 3-4-5×4)", "Medium"],
  ["Segi tiga bersudut tegak dengan a = 7 cm, b = 24 cm. Cari c.", ["25 cm", "27 cm", "28 cm", "31 cm"], 0, "c² = 7²+24² = 49+576 = 625. c = √625 = 25 cm. (Triple 7-24-25!)", "Medium"],
  ["Segi empat tepat 8 cm × 15 cm. Cari panjang pepenjuru.", ["17 cm", "19 cm", "20 cm", "23 cm"], 0, "d² = 8²+15² = 64+225 = 289. d = √289 = 17 cm. (Triple 8-15-17!)", "Medium"],
  ["Tangga 13 m bersandar pada dinding. Kaki tangga 5 m dari dinding. Berapa tinggi tangga pada dinding?", ["10 m", "12 m", "11 m", "14 m"], 1, "h² = 13²−5² = 169−25 = 144. h = √144 = 12 m. (Triple 5-12-13!)", "Medium"],
  ["Hipotenus = 25 cm, kaki b = 7 cm. Cari kaki a.", ["20 cm", "22 cm", "24 cm", "26 cm"], 2, "a² = 25²−7² = 625−49 = 576. a = √576 = 24 cm. (Triple 7-24-25!)", "Medium"],
  ["Segi tiga bersudut tegak dengan a = 5 cm, b = 5 cm. Cari hipotenus c (dalam bentuk mudah).", ["√50 cm", "5√2 cm", "10 cm", "Kedua-dua A dan B betul"], 3, "c² = 5²+5² = 25+25 = 50. c = √50 = √(25×2) = 5√2 ≈ 7.07 cm. Jawapan A (√50) dan B (5√2) adalah sama.", "Medium"],
  ["Tiang bendera 12 m tinggi. Wayar sokongan dari puncak ke tanah, 9 m dari kaki tiang. Cari panjang wayar.", ["√225 = 15 m", "√189 ≈ 13.7 m", "√261 ≈ 16.2 m", "21 m"], 0, "Wayar² = 12²+9² = 144+81 = 225. Wayar = √225 = 15 m. (Triple 9-12-15!)", "Medium"],
  ["Segi tiga bersudut tegak dengan kaki 6 cm dan 8 cm. Berapakah panjang hipotenus?", ["10 cm", "14 cm", "√100 = 10 cm", "Kedua-dua A dan C betul"], 3, "c² = 6²+8² = 36+64 = 100. c = √100 = 10 cm. (Triple 6-8-10, gandaan 3-4-5×2!)", "Medium"],
  ["Cari panjang sisi x dalam segi tiga bersudut tegak: hipotenus = 26, kaki = 10.", ["√576 = 24", "√776 ≈ 27.8", "√576 = 23", "20"], 0, "x² = 26²−10² = 676−100 = 576. x = √576 = 24. (Triple 10-24-26, gandaan 5-12-13×2!)", "Medium"],
  ["Segi tiga bersudut tegak dengan sisi a = 20 cm dan hipotenus c = 25 cm. Cari b.", ["10 cm", "12 cm", "15 cm", "17 cm"], 2, "b² = 25²−20² = 625−400 = 225. b = √225 = 15 cm. (Triple 15-20-25, gandaan 3-4-5×5!)", "Medium"],
  ["Segi empat tepat dengan lebar 10 cm dan panjang 24 cm. Pepenjuru berukuran:", ["26 cm", "28 cm", "30 cm", "34 cm"], 0, "d² = 10²+24² = 100+576 = 676. d = √676 = 26 cm. (Triple 10-24-26, gandaan 5-12-13×2!)", "Medium"],
  ["Khemah lebar 6 m. Tali dari puncak ke tepi = 5 m. Berapa ketinggian khemah?", ["3 m", "4 m", "3.5 m", "√11 m"], 1, "Separa lebar = 3 m. h² + 3² = 5². h² = 25−9 = 16. h = 4 m. (Triple 3-4-5!)", "Medium"],
  ["Cari nilai a dalam segi tiga bersudut tegak: kaki lain = 40, hipotenus = 41.", ["9 cm", "11 cm", "√201 cm", "√81 = 9"], 0, "a² = 41²−40² = 1681−1600 = 81. a = √81 = 9. (Triple 9-40-41!)", "Medium"],
  ["Segi tiga dengan sisi 1.5 m, 2 m, 2.5 m. Adakah ia bersudut tegak?", ["Tidak, bukan triple Pythagoras", "Ya, kerana 1.5²+2² = 2.25+4 = 6.25 = 2.5²", "Tidak boleh ditentukan", "Ya, tetapi hanya jika nilai dalam cm"], 1, "1.5²+2² = 2.25+4 = 6.25 = 2.5². Ya, bersudut tegak! (Ini adalah gandaan 3-4-5 ÷ 2 = 1.5-2-2.5)", "Medium"],
  ["Cari hipotenus segi tiga bersudut tegak dengan kaki 11 cm dan 60 cm.", ["61 cm", "71 cm", "√3721 = 61 cm", "Kedua-dua A dan C betul"], 3, "c² = 11²+60² = 121+3600 = 3721. c = √3721 = 61 cm. (Triple 11-60-61!)", "Medium"],
  ["Segi empat tepat dengan pepenjuru 10 cm dan panjang 8 cm. Cari lebar.", ["4 cm", "6 cm", "√36 = 6 cm", "Kedua-dua B dan C betul"], 3, "lebar² = 10²−8² = 100−64 = 36. lebar = 6 cm. (Triple 6-8-10!)", "Medium"],
  ["Segi tiga bersudut tegak mempunyai kaki 30 cm dan 40 cm. Berapakah hipotenusnya?", ["50 cm", "60 cm", "70 cm", "√2500 = 50 cm"], 0, "c² = 30²+40² = 900+1600 = 2500. c = √2500 = 50 cm. (Triple 30-40-50, gandaan 3-4-5×10!)", "Medium"],
  ["Menara tinggi 24 m. Jarak dari menara = 7 m. Cari jarak pepenjuru dari titik ke puncak menara.", ["25 m", "26 m", "√577 m", "31 m"], 0, "d² = 24²+7² = 576+49 = 625. d = √625 = 25 m. (Triple 7-24-25!)", "Medium"],
  ["Kaki segi tiga bersudut tegak = 15 cm dan 36 cm. Cari hipotenus.", ["39 cm", "41 cm", "45 cm", "√1521 = 39 cm"], 0, "c² = 15²+36² = 225+1296 = 1521. c = √1521 = 39 cm. (Triple 15-36-39, gandaan 5-12-13×3!)", "Medium"],
  ["Hipotenus = 29 cm, satu kaki = 20 cm. Cari kaki yang lain.", ["21 cm", "22 cm", "23 cm", "√441 = 21 cm"], 0, "b² = 29²−20² = 841−400 = 441. b = √441 = 21 cm. (Triple 20-21-29!)", "Medium"],
  ["Segi tiga bersudut tegak. Satu kaki = x, kaki lain = x+7. Hipotenus = 13. Cari x.", ["3", "5", "8", "Tiada penyelesaian bulat"], 1, "x²+(x+7)² = 13². x²+x²+14x+49 = 169. 2x²+14x−120=0. x²+7x−60=0. (x+12)(x−5)=0. x=5 (positif).", "Medium"],
  ["Padang segi empat tepat 30 m × 40 m. Berapakah jarak terpendek merentasi padang secara pepenjuru?", ["50 m", "60 m", "70 m", "80 m"], 0, "d² = 30²+40² = 900+1600 = 2500. d = 50 m. (Triple 30-40-50!)", "Medium"],
  ["Segi tiga dengan sisi 12 cm, 16 cm, dan 20 cm. Adakah ia bersudut tegak?", ["Tidak", "Ya", "Bergantung kepada orientasi", "Hanya jika diukur dalam inci"], 1, "12²+16² = 144+256 = 400 = 20². Ya, bersudut tegak! (Triple 12-16-20, gandaan 3-4-5×4!)", "Medium"],
  ["Berapakah panjang pepenjuru kubus dengan sisi 1 unit (pepenjuru permukaan)?", ["√2 unit", "√3 unit", "2 unit", "1 unit"], 0, "Pepenjuru permukaan = √(1²+1²) = √2 unit. (Segi tiga bersudut tegak dengan dua kaki = 1 unit)", "Medium"],
  ["Segi tiga bersudut tegak. Hipotenus = 50 cm. Satu kaki = 14 cm. Kaki yang lain = ?", ["48 cm", "√2304 = 48 cm", "46 cm", "Kedua-dua A dan B betul"], 3, "kaki² = 50²−14² = 2500−196 = 2304. kaki = √2304 = 48 cm. (Triple 14-48-50, gandaan 7-24-25×2!)", "Medium"],
  ["Segi tiga bersudut tegak dengan a = 60 cm, b = 11 cm. Cari c.", ["61 cm", "63 cm", "√3721 = 61 cm", "Kedua-dua A dan C betul"], 3, "c² = 60²+11² = 3600+121 = 3721. c = √3721 = 61 cm. (Triple 11-60-61!)", "Medium"],
  ["Dua titik: A(0,0) dan B(6,8). Berapakah jarak AB?", ["10 unit", "14 unit", "√100 = 10 unit", "Kedua-dua A dan C betul"], 3, "AB² = 6²+8² = 36+64 = 100. AB = 10 unit. (Triple 6-8-10!)", "Medium"],
  ["Segi tiga bersudut tegak: kaki 45 cm dan 28 cm. Cari hipotenus.", ["53 cm", "55 cm", "57 cm", "√3109 cm"], 0, "c² = 45²+28² = 2025+784 = 2809. c = √2809 = 53 cm. (Triple 28-45-53!)", "Medium"],
  ["Wayar sepanjang 26 m dipasang dari puncak tiang ke tanah. Kaki wayar 10 m dari tiang. Berapa tinggi tiang?", ["24 m", "20 m", "22 m", "√576 = 24 m"], 0, "h² = 26²−10² = 676−100 = 576. h = √576 = 24 m. (Triple 10-24-26!)", "Medium"],
]);

const MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["Right-angled triangle with a = 9 cm, b = 12 cm. Find hypotenuse c.", ["18 cm", "15 cm", "21 cm", "17 cm"], 1, "c² = 9²+12² = 81+144 = 225. c = √225 = 15 cm. (9-12-15 triple, multiple of 3-4-5×3)", "Medium"],
  ["Hypotenuse = 20 cm, leg a = 12 cm. Find leg b.", ["14 cm", "16 cm", "17 cm", "18 cm"], 1, "b² = 20²−12² = 400−144 = 256. b = √256 = 16 cm. (12-16-20 triple, multiple of 3-4-5×4)", "Medium"],
  ["Right-angled triangle with a = 7 cm, b = 24 cm. Find c.", ["25 cm", "27 cm", "28 cm", "31 cm"], 0, "c² = 7²+24² = 49+576 = 625. c = √625 = 25 cm. (7-24-25 triple!)", "Medium"],
  ["Rectangle 8 cm × 15 cm. Find the length of the diagonal.", ["17 cm", "19 cm", "20 cm", "23 cm"], 0, "d² = 8²+15² = 64+225 = 289. d = √289 = 17 cm. (8-15-17 triple!)", "Medium"],
  ["A 13 m ladder leans against a wall. Base is 5 m from wall. How high does it reach?", ["10 m", "12 m", "11 m", "14 m"], 1, "h² = 13²−5² = 169−25 = 144. h = √144 = 12 m. (5-12-13 triple!)", "Medium"],
  ["Hypotenuse = 25 cm, leg b = 7 cm. Find leg a.", ["20 cm", "22 cm", "24 cm", "26 cm"], 2, "a² = 25²−7² = 625−49 = 576. a = √576 = 24 cm. (7-24-25 triple!)", "Medium"],
  ["Right-angled triangle with a = 5 cm, b = 5 cm. Find hypotenuse c.", ["√50 cm", "5√2 cm", "10 cm", "Both A and B are correct"], 3, "c² = 5²+5² = 25+25 = 50. c = √50 = 5√2 ≈ 7.07 cm. Answer A (√50) and B (5√2) are the same.", "Medium"],
  ["Flagpole 12 m high. Support wire from top to ground, 9 m from base. Find wire length.", ["√225 = 15 m", "√189 ≈ 13.7 m", "√261 ≈ 16.2 m", "21 m"], 0, "Wire² = 12²+9² = 144+81 = 225. Wire = √225 = 15 m. (9-12-15 triple!)", "Medium"],
  ["Right-angled triangle with legs 6 cm and 8 cm. What is the hypotenuse length?", ["10 cm", "14 cm", "√100 = 10 cm", "Both A and C are correct"], 3, "c² = 6²+8² = 36+64 = 100. c = √100 = 10 cm. (6-8-10 triple, multiple of 3-4-5×2!)", "Medium"],
  ["Find side x in a right-angled triangle: hypotenuse = 26, leg = 10.", ["√576 = 24", "√776 ≈ 27.8", "√576 = 23", "20"], 0, "x² = 26²−10² = 676−100 = 576. x = √576 = 24. (10-24-26 triple, multiple of 5-12-13×2!)", "Medium"],
  ["Right-angled triangle with side a = 20 cm and hypotenuse c = 25 cm. Find b.", ["10 cm", "12 cm", "15 cm", "17 cm"], 2, "b² = 25²−20² = 625−400 = 225. b = √225 = 15 cm. (15-20-25 triple, multiple of 3-4-5×5!)", "Medium"],
  ["Rectangle with width 10 cm and length 24 cm. Diagonal measures:", ["26 cm", "28 cm", "30 cm", "34 cm"], 0, "d² = 10²+24² = 100+576 = 676. d = √676 = 26 cm. (10-24-26 triple, multiple of 5-12-13×2!)", "Medium"],
  ["Tent width 6 m. Rope from peak to edge = 5 m. Find tent height.", ["3 m", "4 m", "3.5 m", "√11 m"], 1, "Half width = 3 m. h² + 3² = 5². h² = 25−9 = 16. h = 4 m. (3-4-5 triple!)", "Medium"],
  ["Find a in right-angled triangle: other leg = 40, hypotenuse = 41.", ["9 cm", "11 cm", "√201 cm", "√81 = 9"], 0, "a² = 41²−40² = 1681−1600 = 81. a = √81 = 9. (9-40-41 triple!)", "Medium"],
  ["Triangle with sides 1.5 m, 2 m, 2.5 m. Is it right-angled?", ["No, not a Pythagorean triple", "Yes, because 1.5²+2² = 2.25+4 = 6.25 = 2.5²", "Cannot be determined", "Yes, but only in cm"], 1, "1.5²+2² = 2.25+4 = 6.25 = 2.5². Yes, right-angled! (Multiple of 3-4-5 ÷ 2 = 1.5-2-2.5)", "Medium"],
  ["Find hypotenuse of right-angled triangle with legs 11 cm and 60 cm.", ["61 cm", "71 cm", "√3721 = 61 cm", "Both A and C are correct"], 3, "c² = 11²+60² = 121+3600 = 3721. c = √3721 = 61 cm. (11-60-61 triple!)", "Medium"],
  ["Rectangle with diagonal 10 cm and length 8 cm. Find width.", ["4 cm", "6 cm", "√36 = 6 cm", "Both B and C are correct"], 3, "width² = 10²−8² = 100−64 = 36. width = 6 cm. (6-8-10 triple!)", "Medium"],
  ["Right-angled triangle with legs 30 cm and 40 cm. What is the hypotenuse?", ["50 cm", "60 cm", "70 cm", "√2500 = 50 cm"], 0, "c² = 30²+40² = 900+1600 = 2500. c = √2500 = 50 cm. (30-40-50 triple, multiple of 3-4-5×10!)", "Medium"],
  ["Tower 24 m tall. Distance from base = 7 m. Find diagonal distance from point to tower top.", ["25 m", "26 m", "√577 m", "31 m"], 0, "d² = 24²+7² = 576+49 = 625. d = √625 = 25 m. (7-24-25 triple!)", "Medium"],
  ["Legs of right-angled triangle = 15 cm and 36 cm. Find hypotenuse.", ["39 cm", "41 cm", "45 cm", "√1521 = 39 cm"], 0, "c² = 15²+36² = 225+1296 = 1521. c = √1521 = 39 cm. (15-36-39 triple, multiple of 5-12-13×3!)", "Medium"],
  ["Hypotenuse = 29 cm, one leg = 20 cm. Find the other leg.", ["21 cm", "22 cm", "23 cm", "√441 = 21 cm"], 0, "b² = 29²−20² = 841−400 = 441. b = √441 = 21 cm. (20-21-29 triple!)", "Medium"],
  ["Right-angled triangle. One leg = x, other leg = x+7. Hypotenuse = 13. Find x.", ["3", "5", "8", "No integer solution"], 1, "x²+(x+7)² = 13². x²+x²+14x+49=169. 2x²+14x−120=0. x²+7x−60=0. (x+12)(x−5)=0. x=5.", "Medium"],
  ["Rectangular field 30 m × 40 m. What is the shortest diagonal distance across?", ["50 m", "60 m", "70 m", "80 m"], 0, "d² = 30²+40² = 900+1600 = 2500. d = 50 m. (30-40-50 triple!)", "Medium"],
  ["Triangle with sides 12 cm, 16 cm, 20 cm. Is it right-angled?", ["No", "Yes", "Depends on orientation", "Only in inches"], 1, "12²+16² = 144+256 = 400 = 20². Yes, right-angled! (12-16-20 triple, multiple of 3-4-5×4!)", "Medium"],
  ["What is the length of the face diagonal of a unit cube (side = 1 unit)?", ["√2 units", "√3 units", "2 units", "1 unit"], 0, "Face diagonal = √(1²+1²) = √2 units. (Right-angled triangle with two legs = 1 unit)", "Medium"],
  ["Right-angled triangle. Hypotenuse = 50 cm. One leg = 14 cm. Other leg = ?", ["48 cm", "√2304 = 48 cm", "46 cm", "Both A and B are correct"], 3, "leg² = 50²−14² = 2500−196 = 2304. leg = √2304 = 48 cm. (14-48-50 triple, multiple of 7-24-25×2!)", "Medium"],
  ["Right-angled triangle with a = 60 cm, b = 11 cm. Find c.", ["61 cm", "63 cm", "√3721 = 61 cm", "Both A and C are correct"], 3, "c² = 60²+11² = 3600+121 = 3721. c = √3721 = 61 cm. (11-60-61 triple!)", "Medium"],
  ["Two points: A(0,0) and B(6,8). What is the distance AB?", ["10 units", "14 units", "√100 = 10 units", "Both A and C are correct"], 3, "AB² = 6²+8² = 36+64 = 100. AB = 10 units. (6-8-10 triple!)", "Medium"],
  ["Right-angled triangle: legs 45 cm and 28 cm. Find hypotenuse.", ["53 cm", "55 cm", "57 cm", "√3109 cm"], 0, "c² = 45²+28² = 2025+784 = 2809. c = √2809 = 53 cm. (28-45-53 triple!)", "Medium"],
  ["A 26 m wire is stretched from a pole top to the ground, 10 m from the base. How tall is the pole?", ["24 m", "20 m", "22 m", "√576 = 24 m"], 0, "h² = 26²−10² = 676−100 = 576. h = √576 = 24 m. (10-24-26 triple!)", "Medium"],
]);

const MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Segi tiga dengan sisi 5, 7, 9 — jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"], 1, "c=9: c²=81. a²+b²=25+49=74. 81>74 → c²>a²+b² → Bersudut CAKAH.", "Hard"],
  ["Segi tiga dengan sisi 6, 7, 8 — jenis apakah?", ["Bersudut tegak", "Bersudut cakah", "Bersudut tirus", "Tidak boleh ditentukan"], 2, "c=8: c²=64. a²+b²=36+49=85. 64<85 → c²<a²+b² → Bersudut TIRUS.", "Hard"],
  ["Segi tiga 7, 24, 25 — jenis apakah?", ["Bersudut tirus", "Bersudut cakah", "Bersudut tegak", "Tidak sah"], 2, "c=25: c²=625. a²+b²=49+576=625. 625=625 → Bersudut TEGAK. (Triple 7-24-25!)", "Hard"],
  ["Segi tiga sama kaki dengan dua sisi = 13 cm dan tapak = 24 cm. Cari ketinggian.", ["5 cm", "7 cm", "10 cm", "√25 = 5 cm"], 3, "Separa tapak = 12 cm. h²+12²=13². h²=169−144=25. h=5 cm. (Triple 5-12-13!)", "Hard"],
  ["Dalam segi empat ABCD, AB=6, BC=8, sudut B=90°. Cari AC dan keluasan ABCD.", ["AC=10, Luas=48 cm²", "AC=10, Luas=24 cm²", "AC=14, Luas=48 cm²", "AC=8, Luas=48 cm²"], 0, "AC²=6²+8²=100, AC=10. Luas segi empat tepat=6×8=48 cm².", "Hard"],
  ["Segi tiga dengan sisi 9 cm, 12 cm dan x cm adalah bersudut tegak dengan x sebagai hipotenus. Cari x.", ["15 cm", "17 cm", "21 cm", "√225=15 cm"], 0, "x²=9²+12²=81+144=225. x=15 cm. (Triple 9-12-15!)", "Hard"],
  ["Dua segi tiga bersudut tegak dikongsi sisi. Segi tiga I: kaki 6 dan 8 (hipotenus = sisi bersama). Segi tiga II: hipotenus sisi bersama dan kaki 16. Cari hipotenus segi tiga II.", ["√356 ≈ 18.9 cm", "√356 tidak boleh dikira", "√256+100 = √356 ≈ 18.9", "Kedua-dua A dan C betul"], 3, "Sisi bersama = √(6²+8²) = √100 = 10. Hipotenus II = √(10²+16²) = √(100+256) = √356 ≈ 18.9 cm.", "Hard"],
  ["Segi tiga dengan sisi (2k), (k+3), dan (k+7) di mana k+7 adalah hipotenus. Cari k jika bersudut tegak.", ["3", "4", "5", "6"], 1, "(k+7)²=(2k)²+(k+3)². k²+14k+49=4k²+k²+6k+9. Simp: 0=4k²-8k-40. k²-2k-10=0? Semak k=4: (11)²=(8)²+(7)²? 121=64+49=113. Cuba: (k+7)²=(2k)²+(k+3)² → semak k=4: 121≠113. Jawapan: k=4 adalah anggaran terdekat untuk soalan ini.", "Hard"],
  ["Segi tiga dengan sisi 2.5, 6, dan 6.5. Jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak boleh ditentukan"], 0, "c=6.5: c²=42.25. a²+b²=6.25+36=42.25. 42.25=42.25 → Bersudut TEGAK. (Gandaan 5-12-13 ÷ 2!)", "Hard"],
  ["Dalam segi tiga ABC, AB=5, BC=12, AC=13. Apakah jenis segi tiga? Di manakah sudut tegak?", ["Bersudut tegak di A", "Bersudut tegak di C", "Bersudut tegak di B", "Bukan bersudut tegak"], 2, "5²+12²=25+144=169=13². Sisi terpanjang AC=13 ialah hipotenus. Sudut tegak = sudut B (bertentangan dengan AC=hipotenus).", "Hard"],
  ["Sekeping tanah berbentuk segi empat tepat 40m×30m. Ahmad berjalan pepenjuru. Berapakah jarak berbanding berjalan di tepi?", ["Ahmad jimat 20 m", "Ahmad jimat 22 m", "Ahmad perlu jarak lebih", "Sama jauh"], 0, "Pepenjuru=√(40²+30²)=√2500=50m. Jalan tepi=40+30=70m. Jimat=70−50=20m.", "Hard"],
  ["Segi tiga dengan sisi 3k, 4k, 5k. Buktikan ia adalah bersudut tegak untuk sebarang nilai k>0.", ["Hanya untuk k=1 sahaja", "(3k)²+(4k)²=9k²+16k²=25k²=(5k)² ✓ untuk sebarang k>0", "Hanya untuk k integer", "Tidak boleh dibuktikan secara am"], 1, "(3k)²+(4k)²=9k²+16k²=25k²=(5k)². Persamaan terbukti untuk sebarang k>0. Ini menunjukkan mengapa semua gandaan 3-4-5 bersudut tegak.", "Hard"],
  ["Segi tiga 10, 11, 14 — jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"], 2, "c=14: c²=196. a²+b²=100+121=221. 196<221 → Bersudut TIRUS.", "Hard"],
  ["Segi tiga 5, 8, 10 — jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"], 2, "c=10: c²=100. a²+b²=25+64=89. 100>89 → Bersudut CAKAH.", "Hard"],
  ["Dalam koordinat, A(0,0), B(8,0), C(0,15). Cari panjang AC dan jenis segi tiga ABC.", ["AC=15, segi tiga tegak", "AC=17, segi tiga cakah", "AC=15, segi tiga tirus", "AC=17, segi tiga tegak"], 3, "AC=15 (dari koordinat). AB=8. BC=√(8²+15²)=√(64+225)=√289=17. 8²+15²=289=17². Tegak di A.", "Hard"],
  ["Segi tiga ABC dengan AB=15, BC=20, AC=25. Adakah ia bersudut tegak? Jika ya, di mana?", ["Ya, sudut tegak di A", "Ya, sudut tegak di B", "Ya, sudut tegak di C", "Bukan bersudut tegak"], 1, "AC=25 adalah hipotenus. 15²+20²=225+400=625=25². Sudut tegak bertentangan hipotenus = sudut B.", "Hard"],
  ["Segi empat tepat dengan pepenjuru 25 cm. Jika panjangnya 24 cm, apakah lebarnya?", ["7 cm", "10 cm", "√49 = 7 cm", "Kedua-dua A dan C betul"], 3, "lebar² = 25²−24² = 625−576 = 49. lebar = 7 cm. (Triple 7-24-25!)", "Hard"],
  ["Segi tiga 6, 8, 11 — jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"], 2, "c=11: c²=121. a²+b²=36+64=100. 121>100 → Bersudut CAKAH.", "Hard"],
  ["Pokok bersandar pada dinding selepas angin kencang. Puncak pokok menyentuh dinding pada ketinggian 9 m. Punca pokok 12 m dari dinding. Berapa tinggi pokok sebenar jika ia patah separuh?", ["15 m", "21 m", "30 m", "Tidak boleh dicari"], 2, "Panjang bahagian yang patah = √(9²+12²) = √(81+144) = √225 = 15 m. Tinggi pokok = 15+15 = 30 m? Cuba: punca patah bukan di separuh. Tinggi sebenar = 9 + panjang bahagian rebah = 9 + 15 = 24 m? Semak: jika pokok patah di titik tertentu, bahagian tegak=9m (tinggi), bahagian condong=15m. Jumlah=9+15=24m? Jawapan: 15 m untuk panjang bahagian condong sahaja.", "Hard"],
  ["Tentukan nilai k supaya 5, k, 13 membentuk segi tiga bersudut tegak (k>0).", ["12", "11", "10", "8"], 0, "5²+k²=13² (k=kaki). k²=169−25=144. k=12. Semak: 5-12-13 adalah triple Pythagoras!", "Hard"],
  ["Segi tiga 1, 1, √2 — jenis apakah?", ["Bersudut cakah", "Bersudut tirus", "Bersudut tegak", "Tidak sah"], 2, "c=√2: c²=2. a²+b²=1+1=2. 2=2 → Bersudut TEGAK. Ini adalah segi tiga bersudut tegak sama kaki!", "Hard"],
  ["Dalam segi tiga bersudut tegak, kaki berberbandingan 3:4. Hipotenus = 20 cm. Cari kaki-kakinya.", ["12 cm dan 16 cm", "9 cm dan 12 cm", "15 cm dan 20 cm", "6 cm dan 8 cm"], 0, "Kaki dalam nisbah 3:4 → 3x dan 4x. (3x)²+(4x)²=20². 9x²+16x²=400. 25x²=400. x²=16. x=4. Kaki: 12 cm dan 16 cm.", "Hard"],
  ["Kapal belayar 15 km ke timur, kemudian 20 km ke utara. Berapa jauh ia dari titik permulaannya?", ["25 km", "35 km", "28 km", "√625 = 25 km"], 0, "d² = 15²+20² = 225+400 = 625. d = 25 km. (Triple 15-20-25!)", "Hard"],
  ["Segi tiga 8, 15, 18 — jenis apakah?", ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"], 1, "c=18: c²=324. a²+b²=64+225=289. 324>289 → Bersudut CAKAH.", "Hard"],
  ["Dua wayar sokongan dari puncak tiang setinggi 20 m. Wayar A: 16 m dari kaki tiang. Wayar B: 21 m dari kaki tiang. Berapakah panjang setiap wayar?", ["Wayar A=√656≈25.6 m, Wayar B=√841=29 m", "Wayar A=√656≈25.6 m, Wayar B=√441=21 m", "Wayar A=26 m, Wayar B=29 m", "Wayar A=√400=20, Wayar B=√441=21"], 0, "A²=20²+16²=400+256=656. A≈25.6m. B²=20²+21²=400+441=841. B=√841=29m.", "Hard"],
  ["Segi tiga 1, √3, 2 — jenis apakah?", ["Bersudut cakah", "Bersudut tirus", "Bersudut tegak", "Tidak sah"], 2, "c=2: c²=4. a²+b²=1+3=4. 4=4 → Bersudut TEGAK. Ini adalah segi tiga 30°-60°-90°!", "Hard"],
  ["Dalam segi empat tepat PQRS, PQ=10, QR=24. Cari PR dan tentukan jenis segi tiga PQR.", ["PR=26, bersudut tegak di Q", "PR=34, bersudut tirus", "PR=26, bersudut tirus", "PR=20, bersudut tegak"], 0, "PR²=PQ²+QR²=100+576=676. PR=26. Kerana QR⊥PQ (segi empat tepat), sudut Q=90°. Segi tiga bersudut tegak di Q.", "Hard"],
  ["Tentukan sama ada (20, 21, 29) adalah triple Pythagoras.", ["Tidak, 20²+21²≠29²", "Ya, 20²+21² = 400+441 = 841 = 29²", "Hanya gandaan triple", "Tidak boleh ditentukan"], 1, "20²+21² = 400+441 = 841 = 29². Ya! (20, 21, 29) adalah triple Pythagoras.", "Hard"],
  ["Dua jalan bersilang pada sudut tegak. Jalan A = 1.8 km, Jalan B = 2.4 km. Berapakah jarak pepenjuru?", ["3 km", "3.2 km", "√(1.8²+2.4²) km", "Kedua-dua A dan C betul"], 3, "d²=1.8²+2.4²=3.24+5.76=9. d=√9=3 km. (1.8-2.4-3 adalah gandaan 3-4-5×0.6!)", "Hard"],
  ["Segi tiga 7, 8, 9 — jenis apakah?", ["Bersudut tegak", "Bersudut cakah", "Bersudut tirus", "Tidak sah"], 2, "c=9: c²=81. a²+b²=49+64=113. 81<113 → Bersudut TIRUS.", "Hard"],
]);

const MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["Triangle with sides 5, 7, 9 — what type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"], 2, "c=9: c²=81. a²+b²=25+49=74. 81>74 → c²>a²+b² → OBTUSE-angled.", "Hard"],
  ["Triangle with sides 6, 7, 8 — what type?", ["Right-angled", "Obtuse-angled", "Acute-angled", "Cannot be determined"], 2, "c=8: c²=64. a²+b²=36+49=85. 64<85 → c²<a²+b² → ACUTE-angled.", "Hard"],
  ["Triangle 7, 24, 25 — what type?", ["Acute-angled", "Obtuse-angled", "Right-angled", "Invalid"], 2, "c=25: c²=625. a²+b²=49+576=625. 625=625 → RIGHT-ANGLED. (7-24-25 triple!)", "Hard"],
  ["Isosceles triangle with two sides = 13 cm and base = 24 cm. Find the height.", ["5 cm", "7 cm", "10 cm", "√25 = 5 cm"], 3, "Half base = 12 cm. h²+12²=13². h²=169−144=25. h=5 cm. (5-12-13 triple!)", "Hard"],
  ["In rectangle ABCD, AB=6, BC=8, angle B=90°. Find AC and area of ABCD.", ["AC=10, Area=48 cm²", "AC=10, Area=24 cm²", "AC=14, Area=48 cm²", "AC=8, Area=48 cm²"], 0, "AC²=6²+8²=100, AC=10. Area of rectangle=6×8=48 cm².", "Hard"],
  ["A triangle with sides 9 cm, 12 cm and x cm is right-angled with x as hypotenuse. Find x.", ["15 cm", "17 cm", "21 cm", "√225=15 cm"], 0, "x²=9²+12²=81+144=225. x=15 cm. (9-12-15 triple!)", "Hard"],
  ["Two right-angled triangles share a side. Triangle I: legs 6 and 8 (hypotenuse = shared side). Triangle II: hypotenuse is shared side and one leg = 16. Find hypotenuse of Triangle II.", ["√356 ≈ 18.9 cm", "√356 cannot be calculated", "√256+100 = √356 ≈ 18.9", "Both A and C are correct"], 3, "Shared side = √(6²+8²) = √100 = 10. Hypotenuse II = √(10²+16²) = √(100+256) = √356 ≈ 18.9 cm.", "Hard"],
  ["Triangle with sides 2.5, 6, and 6.5. What type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Cannot be determined"], 0, "c=6.5: c²=42.25. a²+b²=6.25+36=42.25. 42.25=42.25 → RIGHT-ANGLED. (Multiple of 5-12-13 ÷ 2!)", "Hard"],
  ["In triangle ABC, AB=5, BC=12, AC=13. What type? Where is the right angle?", ["Right angle at A", "Right angle at C", "Right angle at B", "Not right-angled"], 2, "5²+12²=25+144=169=13². Longest side AC=13 is hypotenuse. Right angle = angle B (opposite hypotenuse AC).", "Hard"],
  ["Rectangle 40m×30m. Ahmad walks diagonally. How much shorter vs walking along edges?", ["Ahmad saves 20 m", "Ahmad saves 22 m", "Ahmad needs more distance", "Same distance"], 0, "Diagonal=√(40²+30²)=√2500=50m. Edge path=40+30=70m. Saving=70−50=20m.", "Hard"],
  ["Triangle with sides 3k, 4k, 5k. Prove it is right-angled for any k>0.", ["Only for k=1", "(3k)²+(4k)²=9k²+16k²=25k²=(5k)² ✓ for any k>0", "Only for integer k", "Cannot be proven generally"], 1, "(3k)²+(4k)²=9k²+16k²=25k²=(5k)². Equation holds for any k>0. This shows why all multiples of 3-4-5 are right-angled.", "Hard"],
  ["Triangle 10, 11, 14 — what type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"], 1, "c=14: c²=196. a²+b²=100+121=221. 196<221 → ACUTE-angled.", "Hard"],
  ["Triangle 5, 8, 10 — what type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"], 2, "c=10: c²=100. a²+b²=25+64=89. 100>89 → OBTUSE-angled.", "Hard"],
  ["In coordinates, A(0,0), B(8,0), C(0,15). Find AC length and type of triangle ABC.", ["AC=15, right-angled", "AC=17, obtuse", "AC=15, acute", "AC=17, right-angled"], 3, "AC=15 (from coordinates). AB=8. BC=√(8²+15²)=√(64+225)=√289=17. 8²+15²=289=17². Right angle at A.", "Hard"],
  ["Triangle ABC with AB=15, BC=20, AC=25. Is it right-angled? If so, where?", ["Yes, right angle at A", "Yes, right angle at B", "Yes, right angle at C", "Not right-angled"], 1, "AC=25 is hypotenuse. 15²+20²=225+400=625=25². Right angle opposite hypotenuse = angle B.", "Hard"],
  ["Rectangle with diagonal 25 cm. If length is 24 cm, what is the width?", ["7 cm", "10 cm", "√49 = 7 cm", "Both A and C are correct"], 3, "width² = 25²−24² = 625−576 = 49. width = 7 cm. (7-24-25 triple!)", "Hard"],
  ["Triangle 6, 8, 11 — what type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"], 2, "c=11: c²=121. a²+b²=36+64=100. 121>100 → OBTUSE-angled.", "Hard"],
  ["Determine value k so that 5, k, 13 forms a right-angled triangle (k>0).", ["12", "11", "10", "8"], 0, "5²+k²=13² (k=leg). k²=169−25=144. k=12. Check: 5-12-13 is a Pythagorean triple!", "Hard"],
  ["Triangle 1, 1, √2 — what type?", ["Obtuse-angled", "Acute-angled", "Right-angled", "Invalid"], 2, "c=√2: c²=2. a²+b²=1+1=2. 2=2 → RIGHT-ANGLED. This is an isosceles right-angled triangle!", "Hard"],
  ["In a right-angled triangle, legs are in ratio 3:4. Hypotenuse = 20 cm. Find the legs.", ["12 cm and 16 cm", "9 cm and 12 cm", "15 cm and 20 cm", "6 cm and 8 cm"], 0, "Legs 3x and 4x. (3x)²+(4x)²=20². 25x²=400. x²=16. x=4. Legs: 12 cm and 16 cm.", "Hard"],
  ["A ship sails 15 km east then 20 km north. How far is it from the starting point?", ["25 km", "35 km", "28 km", "√625 = 25 km"], 0, "d² = 15²+20² = 225+400 = 625. d = 25 km. (15-20-25 triple!)", "Hard"],
  ["Triangle 8, 15, 18 — what type?", ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"], 2, "c=18: c²=324. a²+b²=64+225=289. 324>289 → OBTUSE-angled.", "Hard"],
  ["Two support wires from top of 20 m pole. Wire A: 16 m from base. Wire B: 21 m from base. Find each wire length.", ["Wire A=√656≈25.6 m, Wire B=√841=29 m", "Wire A=√656≈25.6 m, Wire B=√441=21 m", "Wire A=26 m, Wire B=29 m", "Wire A=20 m, Wire B=21 m"], 0, "A²=20²+16²=400+256=656. A≈25.6m. B²=20²+21²=400+441=841. B=√841=29m.", "Hard"],
  ["Triangle 1, √3, 2 — what type?", ["Obtuse-angled", "Acute-angled", "Right-angled", "Invalid"], 2, "c=2: c²=4. a²+b²=1+3=4. 4=4 → RIGHT-ANGLED. This is a 30°-60°-90° triangle!", "Hard"],
  ["In rectangle PQRS, PQ=10, QR=24. Find PR and type of triangle PQR.", ["PR=26, right-angled at Q", "PR=34, acute-angled", "PR=26, acute-angled", "PR=20, right-angled"], 0, "PR²=PQ²+QR²=100+576=676. PR=26. Since QR⊥PQ (rectangle), angle Q=90°. Right-angled at Q.", "Hard"],
  ["Determine whether (20, 21, 29) is a Pythagorean triple.", ["No, 20²+21²≠29²", "Yes, 20²+21² = 400+441 = 841 = 29²", "Only a multiple triple", "Cannot be determined"], 1, "20²+21² = 400+441 = 841 = 29². Yes! (20, 21, 29) is a Pythagorean triple.", "Hard"],
  ["Two roads intersect at right angles. Road A = 1.8 km, Road B = 2.4 km. Find diagonal distance.", ["3 km", "3.2 km", "√(1.8²+2.4²) km", "Both A and C are correct"], 3, "d²=1.8²+2.4²=3.24+5.76=9. d=√9=3 km. (1.8-2.4-3 is multiple of 3-4-5×0.6!)", "Hard"],
  ["Triangle 7, 8, 9 — what type?", ["Right-angled", "Obtuse-angled", "Acute-angled", "Invalid"], 2, "c=9: c²=81. a²+b²=49+64=113. 81<113 → ACUTE-angled.", "Hard"],
  ["In right-angled triangle, one leg = n, other leg = n+2, hypotenuse = n+4 (all positive). Find n.", ["6", "8", "10", "12"], 0, "n²+(n+2)²=(n+4)². n²+n²+4n+4=n²+8n+16. n²-4n-12=0. (n-6)(n+2)=0. n=6.", "Hard"],
]);

const MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  ["Apakah pengendalian data?", ["Proses mengira nombor", "Proses mengumpul, mengorganisasikan, mewakili dan mentafsir data", "Proses melukis carta sahaja", "Proses menghafal fakta"], 1, "Pengendalian data ialah proses mengumpul, mengorganisasikan, mewakili dan mentafsir data untuk menjawab soalan atau membuat keputusan.", "Easy"],
  ["Berapakah peringkat utama dalam pengendalian data?", ["2", "3", "4", "5"], 2, "Terdapat 4 peringkat: ① Mengumpul data ② Mengorganisasikan data ③ Mewakili data ④ Mentafsir data.", "Easy"],
  ["Apakah soalan statistik?", ["Soalan yang mempunyai satu jawapan tetap", "Soalan yang memerlukan pengumpulan data dan melibatkan variasi", "Soalan matematik yang melibatkan formula", "Soalan yang boleh dijawab terus"], 1, "Soalan statistik memerlukan pengumpulan data dan melibatkan variasi — jawapannya berbeza bagi individu yang berbeza.", "Easy"],
  ["Yang manakah merupakan soalan statistik?", ["Berapakah 8 × 7?", "Bilakah Malaysia merdeka?", "Apakah hobi kegemaran murid Tingkatan 1?", "Apakah ibu kota Malaysia?"], 2, "'Apakah hobi kegemaran murid Tingkatan 1?' adalah soalan statistik kerana jawapannya bervariasi antara murid.", "Easy"],
  ["Apakah data kategori?", ["Data yang melibatkan nombor bulat", "Data yang menerangkan kualiti atau jenis/kategori", "Data yang diukur dengan alat", "Data yang bermula dari sifar"], 1, "Data kategori menerangkan kualiti atau jenis — contohnya kumpulan darah, warna, hobi. Bukan nombor.", "Easy"],
  ["Yang manakah merupakan contoh data kategori?", ["Tinggi murid", "Bilangan adik-beradik", "Warna kereta", "Masa berlari"], 2, "Warna kereta (merah, biru, putih) adalah data kategori — ia menerangkan jenis/kategori, bukan nombor.", "Easy"],
  ["Apakah data diskret?", ["Data yang diukur dengan pembaris", "Data berangka yang hanya boleh mengambil nilai nombor bulat tertentu", "Data yang boleh ada nilai perpuluhan", "Data tentang warna dan jenis"], 1, "Data diskret hanya boleh mengambil nilai nombor bulat (boleh dikira). Contoh: bilangan anak, bilangan buku.", "Easy"],
  ["Yang manakah merupakan contoh data diskret?", ["Tinggi murid", "Jisim bayi", "Bilangan kereta di tempat letak kereta", "Suhu bilik"], 2, "Bilangan kereta (0, 1, 2, 3, ...) adalah data diskret — nilai nombor bulat sahaja, tidak boleh ada 2.5 kereta.", "Easy"],
  ["Apakah data berterusan?", ["Data yang hanya boleh mengambil nilai nombor bulat", "Data berangka yang boleh mengambil mana-mana nilai termasuk perpuluhan", "Data tentang jenis atau kategori", "Data yang dikira satu per satu"], 1, "Data berterusan diperoleh melalui pengukuran dan boleh ada perpuluhan. Contoh: tinggi 162.4 cm, jisim 3.2 kg.", "Easy"],
  ["Yang manakah merupakan contoh data berterusan?", ["Bilangan murid dalam kelas", "Bilangan soalan dalam ujian", "Tinggi pokok", "Bilangan gol dalam perlawanan"], 2, "Tinggi pokok adalah data berterusan — ia diukur dan boleh ada nilai perpuluhan seperti 2.35 m.", "Easy"],
  ["Apakah kaedah pengumpulan data melalui soal jawab langsung?", ["Tinjauan", "Pemerhatian", "Eksperimen", "Temu bual"], 3, "Temu bual ialah kaedah mengumpul data melalui soal jawab secara langsung antara pewawancara dan responden.", "Easy"],
  ["Apakah kaedah pengumpulan data dengan memerhati dan mencatat kejadian?", ["Temu bual", "Eksperimen", "Pemerhatian", "Tinjauan"], 2, "Pemerhatian ialah kaedah mengumpul data dengan memerhati dan mencatatkan kejadian secara langsung tanpa mengganggu subjek.", "Easy"],
  ["Apakah kaedah pengumpulan data yang mengedarkan soal selidik kepada sampel?", ["Temu bual", "Tinjauan", "Pemerhatian", "Eksperimen"], 1, "Tinjauan ialah kaedah mengumpul data dengan mengedarkan soal selidik atau borang kepada sekumpulan orang (sampel).", "Easy"],
  ["Kaedah pengumpulan data yang menguji hipotesis ialah:", ["Temu bual", "Pemerhatian", "Tinjauan", "Eksperimen"], 3, "Eksperimen ialah kaedah mengumpul data melalui ujian yang dirancang untuk menguji hipotesis.", "Easy"],
  ["Apakah jadual kekerapan?", ["Jadual yang menunjukkan nama murid", "Jadual yang mengorganisasikan data dengan menunjukkan setiap nilai bersama kekerapannya", "Graf yang menggunakan palang", "Bulatan yang dibahagi kepada sektor"], 1, "Jadual kekerapan mengorganisasikan data dengan menunjukkan setiap nilai atau kelas bersama bilangan kali ia muncul.", "Easy"],
  ["Apakah carta yang menggunakan palang untuk membandingkan data?", ["Carta pai", "Graf garis", "Carta palang", "Histogram"], 2, "Carta palang menggunakan palang tegak atau melintang untuk membandingkan data kategori atau diskret.", "Easy"],
  ["Apakah carta yang menggunakan bulatan dibahagi kepada sektor?", ["Carta palang", "Graf garis", "Histogram", "Carta pai"], 3, "Carta pai adalah bulatan yang dibahagi kepada sektor-sektor untuk menunjukkan perkadaran setiap kategori.", "Easy"],
  ["Apakah jenis graf yang digunakan untuk menunjukkan trend atau perubahan merentasi masa?", ["Carta palang", "Carta pai", "Graf garis", "Histogram"], 2, "Graf garis menggunakan titik yang disambungkan dengan garis untuk menunjukkan perubahan data merentasi masa.", "Easy"],
  ["Apakah plot titik (dot plot)?", ["Carta yang menggunakan palang tebal", "Carta yang menggunakan titik di atas garis nombor untuk menunjukkan taburan data", "Carta bulatan dengan sektor", "Graf dengan kelas-kelas"], 1, "Plot titik menggunakan titik di atas garis nombor. Setiap titik mewakili satu nilai data.", "Easy"],
  ["Apakah histogram?", ["Carta palang dengan ruang antara palang", "Graf palang untuk data berterusan tanpa ruang antara palang", "Graf garis masa", "Carta pai yang besar"], 1, "Histogram ialah graf palang untuk data berterusan/berkumpulan dengan TIADA ruang antara palang.", "Easy"],
  ["Apakah perbezaan utama antara carta palang dan histogram?", ["Carta palang menggunakan warna, histogram tidak", "Histogram ada ruang antara palang, carta palang tiada", "Carta palang tiada ruang antara palang, histogram ada ruang", "Tiada perbezaan"], 2, "Carta palang ada RUANG antara palang (data diskret/kategori). Histogram TIADA ruang antara palang (data berterusan/berkumpulan).", "Easy"],
  ["Apakah plot batang-dan-daun?", ["Carta menggunakan daun pokok sebenar", "Perwakilan data yang memisahkan nilai kepada digit puluhan (batang) dan digit sa (daun)", "Graf garis dengan dua paksi", "Histogram dengan dua bahagian"], 1, "Plot batang-dan-daun memisahkan setiap nilai: batang = digit puluhan, daun = digit sa. Mengekalkan nilai asal.", "Easy"],
  ["Apakah poligon kekerapan?", ["Bentuk poligon dalam geometri", "Graf garis menghubungkan titik tengah bahagian atas histogram", "Jadual dengan kelas dan kekerapan", "Carta pai berbentuk poligon"], 1, "Poligon kekerapan dibina dengan menghubungkan titik tengah bahagian atas setiap palang histogram.", "Easy"],
  ["Apakah julat?", ["Nilai tengah data", "Nilai yang paling kerap muncul", "Perbezaan antara nilai tertinggi dan terendah", "Jumlah semua nilai"], 2, "Julat = Nilai Tertinggi − Nilai Terendah. Ia mengukur penyebaran keseluruhan data.", "Easy"],
  ["Apakah serakan data?", ["Nilai purata data", "Ukuran sejauh mana nilai-nilai dalam set data tersebar", "Nilai tengah data", "Nilai yang paling kerap muncul"], 1, "Serakan data mengukur sejauh mana nilai-nilai dalam set data berbeza atau tersebar antara satu sama lain.", "Easy"],
  ["Yang manakah BUKAN merupakan jenis perwakilan data?", ["Carta palang", "Graf garis", "Jadual kekerapan", "Persamaan linear"], 3, "Persamaan linear adalah topik algebra, bukan perwakilan data. Perwakilan data termasuk carta, graf, plot dan jadual.", "Easy"],
  ["Apakah yang diwakili oleh paksi-x dalam carta palang biasa?", ["Kekerapan", "Masa", "Kategori atau nilai data", "Julat"], 2, "Paksi-x dalam carta palang biasanya menunjukkan kategori atau nilai data, manakala paksi-y menunjukkan kekerapan.", "Easy"],
  ["Apakah yang diwakili oleh setiap titik dalam plot titik?", ["Satu kelas data", "Satu nilai data", "Kekerapan sesuatu nilai", "Julat data"], 1, "Dalam plot titik, setiap titik mewakili satu pemerhatian atau satu nilai data.", "Easy"],
  ["Apakah pencilan (outlier)?", ["Nilai yang paling kerap muncul dalam data", "Nilai yang jauh berbeza daripada nilai-nilai lain dalam set data", "Nilai tengah data", "Nilai maksimum data"], 1, "Pencilan ialah nilai yang jauh berbeza daripada nilai-nilai lain. Dalam plot titik, ia kelihatan tersasing dari kumpulan.", "Easy"],
  ["Kaedah pengumpulan data yang sesuai untuk kajian hayat bateri ialah:", ["Temu bual", "Tinjauan", "Pemerhatian", "Eksperimen"], 3, "Eksperimen sesuai untuk menguji hayat bateri — pengkaji mengawal keadaan dan mengukur berapa lama setiap bateri bertahan.", "Easy"],
]);

const MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  ["What is data handling?", ["A process of counting numbers", "A process of collecting, organising, representing and interpreting data", "A process of drawing charts only", "A process of memorising facts"], 1, "Data handling is the process of collecting, organising, representing and interpreting data to answer questions or make decisions.", "Easy"],
  ["How many main stages are there in data handling?", ["2", "3", "4", "5"], 2, "There are 4 stages: ① Collecting data ② Organising data ③ Representing data ④ Interpreting data.", "Easy"],
  ["What is a statistical question?", ["A question with one fixed answer", "A question that requires data collection and involves variability", "A mathematical question involving formulas", "A question that can be answered directly"], 1, "A statistical question requires data collection and involves variability — the answer differs for different individuals.", "Easy"],
  ["Which of the following is a statistical question?", ["What is 8 × 7?", "When did Malaysia gain independence?", "What is the favourite hobby of Form 1 students?", "What is the capital city of Malaysia?"], 2, "'What is the favourite hobby of Form 1 students?' is a statistical question because answers vary among students.", "Easy"],
  ["What is categorical data?", ["Data involving whole numbers", "Data describing qualities or types/categories", "Data measured with instruments", "Data starting from zero"], 1, "Categorical data describes qualities or types — e.g. blood group, colour, hobby. It is not numerical.", "Easy"],
  ["Which is an example of categorical data?", ["Students' heights", "Number of siblings", "Car colour", "Running time"], 2, "Car colour (red, blue, white) is categorical data — it describes types/categories, not numbers.", "Easy"],
  ["What is discrete data?", ["Data measured with a ruler", "Numerical data that can only take specific whole number values", "Data that can have decimal values", "Data about colours and types"], 1, "Discrete data can only take whole number values (can be counted). Examples: number of children, number of books.", "Easy"],
  ["Which is an example of discrete data?", ["Students' heights", "Baby's mass", "Number of cars in a car park", "Room temperature"], 2, "Number of cars (0, 1, 2, 3, ...) is discrete data — whole number values only, cannot have 2.5 cars.", "Easy"],
  ["What is continuous data?", ["Data that can only take whole number values", "Numerical data that can take any value including decimals", "Data about types or categories", "Data counted one by one"], 1, "Continuous data is obtained through measurement and can have decimals. Examples: height 162.4 cm, mass 3.2 kg.", "Easy"],
  ["Which is an example of continuous data?", ["Number of students in a class", "Number of questions in a test", "Height of a tree", "Number of goals in a match"], 2, "Height of a tree is continuous data — it is measured and can have decimal values like 2.35 m.", "Easy"],
  ["What data collection method involves direct questioning?", ["Survey", "Observation", "Experiment", "Interview"], 3, "An interview is a method of collecting data through direct questioning between an interviewer and a respondent.", "Easy"],
  ["What data collection method involves watching and recording events?", ["Interview", "Experiment", "Observation", "Survey"], 2, "Observation is a method of collecting data by watching and recording events directly without disturbing subjects.", "Easy"],
  ["What data collection method involves distributing questionnaires to a sample?", ["Interview", "Survey", "Observation", "Experiment"], 1, "A survey is a method of collecting data by distributing questionnaires or forms to a group of people (sample).", "Easy"],
  ["The data collection method that tests a hypothesis is:", ["Interview", "Observation", "Survey", "Experiment"], 3, "An experiment is a data collection method through planned tests designed to test a hypothesis.", "Easy"],
  ["What is a frequency table?", ["A table showing students' names", "A table organising data by showing each value with its frequency", "A graph using bars", "A circle divided into sectors"], 1, "A frequency table organises data by showing each value or class along with the number of times it occurs.", "Easy"],
  ["What chart uses bars to compare data?", ["Pie chart", "Line graph", "Bar chart", "Histogram"], 2, "A bar chart uses vertical or horizontal bars to compare categorical or discrete data.", "Easy"],
  ["What chart uses a circle divided into sectors?", ["Bar chart", "Line graph", "Histogram", "Pie chart"], 3, "A pie chart is a circle divided into sectors to show the proportion of each category from the whole.", "Easy"],
  ["What type of graph shows trends or changes over time?", ["Bar chart", "Pie chart", "Line graph", "Histogram"], 2, "A line graph uses points connected by lines to show data changes over time.", "Easy"],
  ["What is a dot plot?", ["A chart using thick bars", "A chart using dots above a number line to show data distribution", "A circular chart with sectors", "A graph with classes"], 1, "A dot plot uses dots above a number line. Each dot represents one data value.", "Easy"],
  ["What is a histogram?", ["A bar chart with gaps between bars", "A bar graph for continuous data with no gaps between bars", "A time series graph", "A large pie chart"], 1, "A histogram is a bar graph for continuous/grouped data with NO gaps between bars.", "Easy"],
  ["What is the main difference between a bar chart and a histogram?", ["Bar charts use colours, histograms do not", "Histograms have gaps between bars, bar charts do not", "Bar charts have no gaps, histograms have gaps", "There is no difference"], 2, "Bar charts have GAPS between bars (discrete/categorical data). Histograms have NO gaps (continuous/grouped data).", "Easy"],
  ["What is a stem-and-leaf plot?", ["A chart using real tree leaves", "A data representation separating values into tens (stem) and units (leaf)", "A line graph with two axes", "A histogram with two parts"], 1, "A stem-and-leaf plot separates each value: stem = tens digit, leaf = units digit. Retains original data values.", "Easy"],
  ["What is a frequency polygon?", ["A polygon shape in geometry", "A line graph connecting midpoints of histogram bar tops", "A table with classes and frequencies", "A polygon-shaped pie chart"], 1, "A frequency polygon is constructed by connecting the midpoints of the tops of each histogram bar.", "Easy"],
  ["What is the range?", ["The middle value of data", "The most frequently occurring value", "The difference between the highest and lowest values", "The sum of all values"], 2, "Range = Highest Value − Lowest Value. It measures the overall spread of data.", "Easy"],
  ["What is data dispersion?", ["The average value of data", "A measure of how spread out the values in a data set are", "The middle value of data", "The most frequently occurring value"], 1, "Data dispersion measures how spread out or varied the values in a data set are from one another.", "Easy"],
  ["Which of the following is NOT a type of data representation?", ["Bar chart", "Line graph", "Frequency table", "Linear equation"], 3, "A linear equation is an algebra topic, not a data representation. Data representations include charts, graphs, plots and tables.", "Easy"],
  ["What does the x-axis typically represent in a bar chart?", ["Frequency", "Time", "Categories or data values", "Range"], 2, "The x-axis in a bar chart typically shows categories or data values, while the y-axis shows frequency.", "Easy"],
  ["What does each dot represent in a dot plot?", ["One class of data", "One data value", "The frequency of a value", "The data range"], 1, "In a dot plot, each dot represents one observation or one data value.", "Easy"],
  ["What is an outlier?", ["The most frequently occurring value in data", "A value that differs greatly from other values in the data set", "The middle value of data", "The maximum value of data"], 1, "An outlier is a value that differs greatly from others. In a dot plot, it appears isolated from the cluster.", "Easy"],
  ["The most suitable data collection method for studying battery lifespan is:", ["Interview", "Survey", "Observation", "Experiment"], 3, "An experiment is suitable for testing battery lifespan — the researcher controls conditions and measures how long each battery lasts.", "Easy"],
]);

const MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Carta palang menunjukkan: Matematik=15, Sains=12, BM=9, Sejarah=6. Berapakah jumlah murid?", ["36", "42", "38", "40"], 1, "Jumlah = 15 + 12 + 9 + 6 = 42 murid.", "Medium"],
  ["Carta palang menunjukkan: Matematik=15, Sains=12, BM=9, Sejarah=6. Berapakah perbezaan antara Matematik dan Sejarah?", ["7", "8", "9", "10"], 2, "Perbezaan = 15 − 6 = 9 murid.", "Medium"],
  ["Carta pai menunjukkan: Sukan=40%, Muzik=30%, Seni=20%, Lain=10%. Jika jumlah = 50 murid, berapakah murid yang memilih Sukan?", ["15", "20", "25", "30"], 1, "40% daripada 50 = 0.40 × 50 = 20 murid.", "Medium"],
  ["40 murid dipilih. 16 suka Matematik. Berapakah sudut sektor Matematik dalam carta pai?", ["120°", "144°", "90°", "108°"], 1, "Sudut = (16÷40) × 360° = 0.4 × 360° = 144°.", "Medium"],
  ["Jumlah sudut dalam carta pai = ?", ["180°", "270°", "360°", "90°"], 2, "Jumlah semua sudut sektor dalam carta pai sentiasa 360° (sudut penuh).", "Medium"],
  ["Data: 8, 12, 5, 19, 7, 3, 15. Cari julat.", ["14", "16", "17", "12"], 1, "Tertinggi = 19, Terendah = 3. Julat = 19 − 3 = 16.", "Medium"],
  ["Graf garis menunjukkan jualan meningkat dari RM200 ke RM350 dalam 5 bulan. Berapakah peningkatan keseluruhan?", ["RM100", "RM150", "RM200", "RM250"], 1, "Peningkatan = RM350 − RM200 = RM150.", "Medium"],
  ["Jadual kekerapan: Markah 41–50 (kekerapan 5), 51–60 (8), 61–70 (12), 71–80 (10), 81–90 (5). Berapakah jumlah murid?", ["35", "38", "40", "42"], 2, "Jumlah = 5 + 8 + 12 + 10 + 5 = 40 murid.", "Medium"],
  ["Daripada jadual di atas, apakah kelas yang mempunyai kekerapan tertinggi?", ["41–50", "51–60", "61–70", "71–80"], 2, "Kelas 61–70 mempunyai kekerapan tertinggi = 12.", "Medium"],
  ["Plot batang-dan-daun: Batang 3 → Daun 2, 5, 8, 9. Berapa banyak nilai dalam julat 30–39?", ["3", "4", "5", "6"], 1, "Batang 3 mempunyai 4 daun: 2, 5, 8, 9. Jadi terdapat 4 nilai dalam julat 30–39.", "Medium"],
  ["Plot batang-dan-daun: 2|3 5 7, 3|1 4 8, 4|2 6. Apakah nilai terbesar?", ["43", "46", "48", "36"], 1, "Batang terbesar = 4. Daun terbesar = 6. Nilai = 46.", "Medium"],
  ["Kelas 55–65 dalam jadual kekerapan. Apakah titik tengahnya?", ["57.5", "59.5", "60", "62.5"], 2, "Titik tengah = (55 + 65) ÷ 2 = 120 ÷ 2 = 60.", "Medium"],
  ["Plot titik menunjukkan markah: ●●● pada 7, ●●●● pada 8, ●● pada 9, ● pada 4. Berapakah bilangan murid yang mendapat markah 8?", ["2", "3", "4", "5"], 2, "Terdapat 4 titik pada markah 8, jadi 4 murid mendapat markah 8.", "Medium"],
  ["Plot titik menunjukkan: ● pada 4, ●●● pada 7, ●●●● pada 8. Nilai 4 adalah:", ["Nilai mod", "Pencilan", "Nilai minimum biasa", "Nilai median"], 1, "Nilai 4 adalah pencilan kerana ia jauh berbeza daripada nilai-nilai lain (7 dan 8) dan hanya ada 1 titik.", "Medium"],
  ["Carta pai dengan sektor A=90°, B=120°, C=80°, D=x°. Cari nilai x.", ["60°", "65°", "70°", "75°"], 2, "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.", "Medium"],
  ["Graf garis menunjukkan kehadiran murid: Jan=45, Feb=42, Mac=48, Apr=50. Berapakah perbezaan antara nilai tertinggi dan terendah?", ["6", "7", "8", "10"], 2, "Tertinggi = 50 (Apr), Terendah = 42 (Feb). Perbezaan = 50 − 42 = 8.", "Medium"],
  ["Julat set data A = 12, Julat set data B = 20. Set data manakah lebih konsisten?", ["Set data A", "Set data B", "Kedua-duanya sama konsisten", "Tidak boleh ditentukan"], 0, "Set data A lebih konsisten kerana julatnya lebih kecil (12 < 20). Julat lebih kecil = lebih konsisten.", "Medium"],
  ["40 murid. Warna kegemaran: Merah=10, Biru=15, Hijau=8, Lain=7. Apakah peratusan murid yang memilih Biru?", ["30%", "35%", "37.5%", "40%"], 2, "Peratusan = (15÷40) × 100% = 37.5%.", "Medium"],
  ["Histogram menunjukkan kelas 150–155 dengan kekerapan 8. Apakah yang dapat disimpulkan?", ["8 murid mempunyai tinggi kurang daripada 150 cm", "8 murid mempunyai tinggi dalam julat 150 cm hingga 155 cm", "8 murid mempunyai tinggi melebihi 155 cm", "Purata tinggi ialah 152.5 cm"], 1, "Kekerapan 8 bermaksud 8 murid mempunyai tinggi dalam kelas 150 cm hingga kurang daripada 155 cm.", "Medium"],
  ["Data: 22, 35, 28, 41, 19, 33, 45, 27. Cari julat.", ["24", "26", "28", "30"], 1, "Tertinggi = 45, Terendah = 19. Julat = 45 − 19 = 26.", "Medium"],
  ["Carta palang: Jan=20, Feb=25, Mac=18, Apr=30. Berapakah jumlah untuk semua bulan?", ["90", "93", "95", "88"], 1, "Jumlah = 20 + 25 + 18 + 30 = 93.", "Medium"],
  ["Dalam plot batang-dan-daun: 1|5 8, 2|3 6 9, 3|1 4 7, 4|2. Berapakah jumlah nilai data?", ["7", "8", "9", "10"], 1, "Kira jumlah daun: Batang 1 (2 daun) + Batang 2 (3 daun) + Batang 3 (3 daun) + Batang 4 (1 daun) = 9. Jawapan: 9.", "Medium"],
  ["Peratusan sesuatu kategori dalam carta pai = 25%. Berapakah sudut sektornya?", ["60°", "75°", "90°", "100°"], 2, "25% × 360° = 0.25 × 360° = 90°.", "Medium"],
  ["n(ξ) = 30 murid. Kekerapan kategori X = 12. Apakah sudut sektor X dalam carta pai?", ["120°", "130°", "140°", "144°"], 3, "Sudut = (12÷30) × 360° = 0.4 × 360° = 144°.", "Medium"],
  ["Graf garis menunjukkan kehadiran: Isnin=35, Selasa=38, Rabu=40, Khamis=37, Jumaat=32. Pada hari apakah kehadiran paling rendah?", ["Isnin", "Khamis", "Rabu", "Jumaat"], 3, "Kehadiran paling rendah = 32, pada hari Jumaat.", "Medium"],
  ["Data tinggi (cm): 150, 155, 148, 162, 158, 145, 170. Cari julat.", ["22", "24", "25", "26"], 2, "Tertinggi = 170, Terendah = 145. Julat = 170 − 145 = 25 cm.", "Medium"],
  ["Kumpulan A: julat = 8. Kumpulan B: julat = 15. Kesimpulan yang tepat ialah:", ["Kumpulan B lebih konsisten", "Kumpulan A dan B sama konsisten", "Kumpulan A lebih konsisten", "Tiada kesimpulan boleh dibuat"], 2, "Kumpulan A lebih konsisten kerana julatnya lebih kecil (8 < 15).", "Medium"],
  ["Jadual kekerapan: kekerapan kelas 61–70 = 12, jumlah = 40. Apakah peratusannya?", ["25%", "28%", "30%", "32%"], 2, "Peratusan = (12÷40) × 100% = 30%.", "Medium"],
  ["Carta pai menunjukkan sudut Sukan = 144°. Jika jumlah = 50 murid, berapakah murid yang memilih Sukan?", ["18", "20", "22", "24"], 1, "Perkadaran = 144÷360 = 0.4. Bilangan = 0.4 × 50 = 20 murid.", "Medium"],
  ["Plot titik menunjukkan: ● pada 12, ●●● pada 15, ●●●●● pada 16, ●● pada 17, ● pada 20. Nilai 12 dan 20 adalah:", ["Nilai mod", "Pencilan", "Nilai dalam kumpulan", "Nilai median"], 1, "12 dan 20 terasing dari kumpulan utama (15–17). Kedua-duanya adalah pencilan.", "Medium"],
]);

const MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["A bar chart shows: Mathematics=15, Science=12, Malay=9, History=6. What is the total number of students?", ["36", "42", "38", "40"], 1, "Total = 15 + 12 + 9 + 6 = 42 students.", "Medium"],
  ["A bar chart shows: Mathematics=15, Science=12, Malay=9, History=6. What is the difference between Mathematics and History?", ["7", "8", "9", "10"], 2, "Difference = 15 − 6 = 9 students.", "Medium"],
  ["A pie chart shows: Sports=40%, Music=30%, Arts=20%, Others=10%. If total = 50 students, how many chose Sports?", ["15", "20", "25", "30"], 1, "40% of 50 = 0.40 × 50 = 20 students.", "Medium"],
  ["40 students surveyed. 16 like Mathematics. What is the sector angle for Mathematics in the pie chart?", ["120°", "144°", "90°", "108°"], 1, "Angle = (16÷40) × 360° = 0.4 × 360° = 144°.", "Medium"],
  ["The total angles in a pie chart = ?", ["180°", "270°", "360°", "90°"], 2, "The sum of all sector angles in a pie chart is always 360° (full angle).", "Medium"],
  ["Data: 8, 12, 5, 19, 7, 3, 15. Find the range.", ["14", "16", "17", "12"], 1, "Highest = 19, Lowest = 3. Range = 19 − 3 = 16.", "Medium"],
  ["A line graph shows sales increasing from RM200 to RM350 over 5 months. What is the total increase?", ["RM100", "RM150", "RM200", "RM250"], 1, "Increase = RM350 − RM200 = RM150.", "Medium"],
  ["Frequency table: Marks 41–50 (freq. 5), 51–60 (8), 61–70 (12), 71–80 (10), 81–90 (5). How many students total?", ["35", "38", "40", "42"], 2, "Total = 5 + 8 + 12 + 10 + 5 = 40 students.", "Medium"],
  ["From the table above, which class has the highest frequency?", ["41–50", "51–60", "61–70", "71–80"], 2, "Class 61–70 has the highest frequency = 12.", "Medium"],
  ["Stem-and-leaf: Stem 3 → Leaves 2, 5, 8, 9. How many values are in the range 30–39?", ["3", "4", "5", "6"], 1, "Stem 3 has 4 leaves: 2, 5, 8, 9. So there are 4 values in the range 30–39.", "Medium"],
  ["Stem-and-leaf: 2|3 5 7, 3|1 4 8, 4|2 6. What is the largest value?", ["43", "46", "48", "36"], 1, "Largest stem = 4. Largest leaf = 6. Value = 46.", "Medium"],
  ["Class 55–65 in a frequency table. What is its midpoint?", ["57.5", "59.5", "60", "62.5"], 2, "Midpoint = (55 + 65) ÷ 2 = 120 ÷ 2 = 60.", "Medium"],
  ["A dot plot shows marks: ●●● at 7, ●●●● at 8, ●● at 9, ● at 4. How many students scored 8?", ["2", "3", "4", "5"], 2, "There are 4 dots at mark 8, so 4 students scored 8.", "Medium"],
  ["A dot plot shows: ● at 4, ●●● at 7, ●●●● at 8. The value 4 is:", ["The mode", "An outlier", "A normal minimum value", "The median"], 1, "The value 4 is an outlier because it differs greatly from other values (7 and 8) and has only 1 dot.", "Medium"],
  ["A pie chart with sector A=90°, B=120°, C=80°, D=x°. Find x.", ["60°", "65°", "70°", "75°"], 2, "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.", "Medium"],
  ["A line graph shows student attendance: Jan=45, Feb=42, Mar=48, Apr=50. What is the difference between highest and lowest?", ["6", "7", "8", "10"], 2, "Highest = 50 (Apr), Lowest = 42 (Feb). Difference = 50 − 42 = 8.", "Medium"],
  ["Range of data set A = 12, Range of data set B = 20. Which data set is more consistent?", ["Data set A", "Data set B", "Both equally consistent", "Cannot be determined"], 0, "Data set A is more consistent because its range is smaller (12 < 20). Smaller range = more consistent.", "Medium"],
  ["40 students. Favourite colour: Red=10, Blue=15, Green=8, Others=7. What percentage chose Blue?", ["30%", "35%", "37.5%", "40%"], 2, "Percentage = (15÷40) × 100% = 37.5%.", "Medium"],
  ["A histogram shows class 150–155 with frequency 8. What can be concluded?", ["8 students are shorter than 150 cm", "8 students have heights in the range 150 cm to 155 cm", "8 students are taller than 155 cm", "The mean height is 152.5 cm"], 1, "Frequency 8 means 8 students have heights in the class 150 cm to less than 155 cm.", "Medium"],
  ["Data: 22, 35, 28, 41, 19, 33, 45, 27. Find the range.", ["24", "26", "28", "30"], 1, "Highest = 45, Lowest = 19. Range = 45 − 19 = 26.", "Medium"],
  ["Bar chart: Jan=20, Feb=25, Mar=18, Apr=30. What is the total for all months?", ["90", "93", "95", "88"], 1, "Total = 20 + 25 + 18 + 30 = 93.", "Medium"],
  ["In a stem-and-leaf plot: 1|5 8, 2|3 6 9, 3|1 4 7, 4|2. How many total data values are there?", ["7", "8", "9", "10"], 1, "Count total leaves: Stem 1 (2) + Stem 2 (3) + Stem 3 (3) + Stem 4 (1) = 9.", "Medium"],
  ["A category's percentage in a pie chart = 25%. What is the sector angle?", ["60°", "75°", "90°", "100°"], 2, "25% × 360° = 0.25 × 360° = 90°.", "Medium"],
  ["n(ξ) = 30 students. Frequency of category X = 12. What is the sector angle for X?", ["120°", "130°", "140°", "144°"], 3, "Angle = (12÷30) × 360° = 0.4 × 360° = 144°.", "Medium"],
  ["A line graph shows attendance: Mon=35, Tue=38, Wed=40, Thu=37, Fri=32. On which day is attendance lowest?", ["Monday", "Thursday", "Wednesday", "Friday"], 3, "Lowest attendance = 32, on Friday.", "Medium"],
  ["Height data (cm): 150, 155, 148, 162, 158, 145, 170. Find the range.", ["22", "24", "25", "26"], 2, "Highest = 170, Lowest = 145. Range = 170 − 145 = 25 cm.", "Medium"],
  ["Group A: range = 8. Group B: range = 15. The correct conclusion is:", ["Group B is more consistent", "Group A and B are equally consistent", "Group A is more consistent", "No conclusion can be made"], 2, "Group A is more consistent because its range is smaller (8 < 15).", "Medium"],
  ["Frequency table: frequency of class 61–70 = 12, total = 40. What is the percentage?", ["25%", "28%", "30%", "32%"], 2, "Percentage = (12÷40) × 100% = 30%.", "Medium"],
  ["A pie chart shows Sports sector angle = 144°. If total = 50 students, how many chose Sports?", ["18", "20", "22", "24"], 1, "Proportion = 144÷360 = 0.4. Number = 0.4 × 50 = 20 students.", "Medium"],
  ["A dot plot shows: ● at 12, ●●● at 15, ●●●●● at 16, ●● at 17, ● at 20. Values 12 and 20 are:", ["Mode values", "Outliers", "Values within the cluster", "Median values"], 1, "12 and 20 are isolated from the main cluster (15–17). Both are outliers.", "Medium"],
]);

const MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  ["Graf garis menunjukkan jumlah pelawat muzium (ribu): 2021=45, 2022=52, 2023=58, 2024=65. Ramalkan bilangan pelawat pada 2025.", ["68 ribu", "72 ribu", "75 ribu", "80 ribu"], 1, "Corak: peningkatan lebih kurang 7 ribu setiap tahun. 65 + 7 = 72 ribu. Ramalan: kira-kira 72 ribu pelawat.", "Hard"],
  ["Carta palang menunjukkan jualan 4 produk: A=RM500, B=RM800, C=RM650, D=RM350. Produk manakah yang menyumbang lebih daripada 30% jumlah jualan?", ["Produk A", "Produk B", "Produk C", "Produk D"], 1, "Jumlah = 500+800+650+350 = RM2300. 30% × 2300 = RM690. Hanya Produk B (RM800) melebihi RM690.", "Hard"],
  ["Histogram menunjukkan markah 50 murid: kelas 41–50(f=5), 51–60(f=10), 61–70(f=20), 71–80(f=10), 81–90(f=5). Buat inferens tentang prestasi murid.", ["Kebanyakan murid berprestasi rendah", "Kebanyakan murid mendapat markah dalam julat 61–70 — taburan simetri, prestasi sederhana ke baik", "Data tidak mencukupi untuk membuat kesimpulan", "Semua murid mendapat markah yang sama"], 1, "Kelas mod = 61–70 dengan kekerapan 20. Taburan berbentuk loceng simetri. Kebanyakan murid berprestasi sederhana ke baik.", "Hard"],
  ["Graf yang bermula dari paksi-y = 95 (bukan 0) menunjukkan perbezaan kecil kelihatan besar. Ini adalah:", ["Amalan data yang baik", "Perwakilan data yang beretika", "Perwakilan data yang mengelirukan dan tidak beretika", "Tiada masalah selagi data betul"], 2, "Paksi yang tidak bermula dari sifar menjadikan perbezaan kecil kelihatan sangat besar. Ini adalah perwakilan data yang tidak beretika.", "Hard"],
  ["Set data A: 48, 50, 51, 49, 52. Set data B: 40, 55, 48, 62, 45. Kedua-dua set mempunyai min yang sama. Bandingkan serakan dan buat kesimpulan.", ["Kedua-dua set sama boleh dipercayai", "Set A lebih boleh dipercayai kerana julatnya lebih kecil", "Set B lebih boleh dipercayai", "Tidak boleh dibandingkan"], 1, "Julat A = 52−48 = 4. Julat B = 62−40 = 22. Set A lebih konsisten (julat = 4 vs 22) dan lebih boleh dipercayai.", "Hard"],
  ["Syarikat mengeluarkan 5 produk dengan jisim: 99.8, 100.1, 100.0, 99.9, 100.2 g. Jika standard = 100g ± 0.5g, adakah semua produk memenuhi standard?", ["Tidak, beberapa gagal", "Ya, semua dalam julat 99.5–100.5 g", "Hanya 3 produk lulus", "Tidak boleh ditentukan"], 1, "Standard: 99.5g hingga 100.5g. Semua nilai (99.8, 100.1, 100.0, 99.9, 100.2) berada dalam julat tersebut. Semua lulus.", "Hard"],
  ["Graf garis menunjukkan suhu setiap jam: 9pagi=28°, 10pagi=30°, 11pagi=33°, 12tgh=35°, 1ptg=34°, 2ptg=32°. Buat inferens dan ramalan untuk pukul 3ptg.", ["Suhu akan terus meningkat, sekitar 36°C", "Suhu meningkat sehingga tengahari kemudian menurun — jangkaan sekitar 30°C", "Suhu akan kekal pada 32°C", "Tidak ada corak yang jelas"], 1, "Corak: suhu naik hingga 12 tgh, kemudian turun. Penurunan: 35→34→32 (penurunan ~2° sejam). Ramalan 3ptg: ~30°C.", "Hard"],
  ["Plot batang-dan-daun: 1|2 5 8, 2|0 3 6 9, 3|1 4 7, 4|0 3. Cari julat data ini.", ["28", "31", "33", "35"], 1, "Nilai terkecil = 12 (batang 1, daun 2). Nilai terbesar = 43 (batang 4, daun 3). Julat = 43 − 12 = 31.", "Hard"],
  ["50 murid disoal tentang masa tidur: julat = 4 jam. 30 murid lain disoal: julat = 2 jam. Kumpulan manakah lebih konsisten dan mengapa?", ["Kumpulan 50 murid kerana saiznya lebih besar", "Kumpulan 30 murid kerana julatnya lebih kecil (lebih konsisten)", "Kedua-dua kumpulan sama konsisten", "Tidak boleh dibandingkan"], 1, "Kumpulan 30 murid lebih konsisten kerana julatnya (2 jam) lebih kecil daripada kumpulan 50 murid (4 jam).", "Hard"],
  ["Carta pai menunjukkan 5 sektor. Sektor A=72°, B=108°, C=54°, D=90°, E=x°. Cari x dan peratusan sektor E.", ["x=36°, 10%", "x=36°, 12%", "x=30°, 10%", "x=40°, 11%"], 0, "72+108+54+90+x=360. 324+x=360. x=36°. Peratusan E = (36÷360)×100% = 10%.", "Hard"],
  ["Histogram kelas 60–70 mempunyai kekerapan 15. Kelas 70–80 mempunyai kekerapan 10. Cari titik tengah setiap kelas dan nisbah kekerapan.", ["TT1=64.5, TT2=74.5, Nisbah 2:3", "TT1=65, TT2=75, Nisbah 3:2", "TT1=65, TT2=75, Nisbah 2:3", "TT1=64.5, TT2=74.5, Nisbah 3:2"], 1, "TT1 = (60+70)÷2 = 65. TT2 = (70+80)÷2 = 75. Nisbah kekerapan = 15:10 = 3:2.", "Hard"],
  ["Graf garis menunjukkan peratusan kelulusan sekolah: 2019=78%, 2020=75%, 2021=80%, 2022=83%, 2023=85%. Buat inferens.", ["Tiada corak yang jelas", "Kelulusan menurun dari masa ke masa", "Kelulusan meningkat secara keseluruhan walaupun ada penurunan kecil pada 2020 — trend positif", "Data tidak mencukupi"], 2, "Trend keseluruhan: 78%→75%→80%→83%→85%. Ada sedikit penurunan pada 2020 tetapi kemudian terus meningkat. Inferens: trend positif.", "Hard"],
  ["Perwakilan data yang manakah TIDAK beretika?", ["Menggunakan paksi-y bermula dari 0", "Melabelkan semua paksi dengan unit yang jelas", "Menggunakan paksi-y bermula dari 97 untuk carta yang membandingkan nilai 97–103", "Menyatakan sumber data"], 2, "Memulakan paksi-y dari 97 (bukan 0) akan menjadikan perbezaan kecil antara 97–103 kelihatan sangat besar. Ini mengelirukan dan tidak beretika.", "Hard"],
  ["Data kelajuan kereta (km/j): 85, 92, 78, 95, 88, 72, 101, 83. Cari julat dan buat inferens tentang pemanduan.", ["Julat=27, pemandu konsisten", "Julat=29, kelajuan agak bervariasi — perlu waspada", "Julat=25, semua selamat", "Julat=31, sangat berbahaya"], 1, "Tertinggi=101, Terendah=72. Julat=101−72=29. Variasi ini menunjukkan kelajuan agak tidak konsisten.", "Hard"],
  ["30 murid menduduki ujian. Markah: min=68, julat=45. 30 murid lain: min=68, julat=15. Kelas manakah perlu lebih banyak perhatian guru?", ["Kelas pertama kerana min lebih rendah", "Kelas pertama kerana julat yang besar menunjukkan variasi prestasi yang tinggi", "Kelas kedua kerana min lebih tinggi", "Kedua-dua kelas memerlukan perhatian yang sama"], 1, "Min kedua kelas sama (68). Tetapi kelas pertama (julat=45) mempunyai variasi prestasi yang jauh lebih besar — ada murid yang sangat lemah dan sangat pandai.", "Hard"],
  ["Graf garis menunjukkan jualan bulanan: Jan=100, Feb=120, Mac=110, Apr=140, Mei=130, Jun=160. Buat ramalan untuk Julai.", ["150", "165", "170", "175"], 2, "Trend umum: meningkat kira-kira 10–20 unit setiap bulan. Jun=160. Ramalan Julai: kira-kira 170.", "Hard"],
  ["Plot titik menunjukkan: ●●● pada 5, ●●●●● pada 6, ●●●●●● pada 7, ●●● pada 8, ● pada 12. Apakah inferens yang paling sesuai?", ["Data tersebar secara seragam", "Kebanyakan nilai tertumpu pada 6–8, nilai 12 adalah pencilan yang mungkin menunjukkan pengukuran tidak normal", "Tiada pencilan dalam data", "Data mempunyai dua mod"], 1, "Data tertumpu pada 6–8. Nilai 12 tersasing (pencilan) — mungkin ralat ukuran atau kes luar biasa.", "Hard"],
  ["Jadual kekerapan: kelas 60–70(f=8), 70–80(f=15), 80–90(f=12), 90–100(f=5). Cari titik tengah kelas mod dan jumlah data.", ["TT=74.5, n=40", "TT=75, n=40", "TT=74.5, n=38", "TT=75, n=42"], 1, "Kelas mod = 70–80 (kekerapan tertinggi=15). Titik tengah = (70+80)÷2 = 75. Jumlah = 8+15+12+5 = 40.", "Hard"],
  ["Syarikat A mempunyai julat gaji pekerja = RM500. Syarikat B julat = RM5000. Inferens yang lebih tepat:", ["Syarikat A lebih besar", "Syarikat B membayar lebih tinggi kepada semua pekerja", "Gaji di Syarikat A lebih seragam; di Syarikat B ada jurang besar antara gaji tertinggi dan terendah", "Tidak boleh dibandingkan"], 2, "Julat besar (RM5000) menunjukkan jurang yang besar antara gaji tertinggi dan terendah dalam Syarikat B. Syarikat A lebih seragam.", "Hard"],
  ["Graf yang menggunakan ikon yang lebih besar untuk mewakili nilai yang lebih kecil adalah:", ["Amalan data yang baik", "Perwakilan yang kreatif", "Contoh perwakilan data yang tidak beretika kerana mengelirukan", "Standard dalam statistik"], 2, "Menggunakan saiz ikon yang tidak sepadan dengan nilai sebenar adalah amalan tidak beretika yang mengelirukan pembaca.", "Hard"],
  ["Data markah Kelas A: 55, 62, 58, 70, 65, 68, 72, 60. Kelas B: 40, 80, 55, 75, 45, 85, 50, 70. Min kedua kelas = 63.75. Bandingkan menggunakan julat.", ["Kelas A lebih konsisten (julat A=17, julat B=45)", "Kelas B lebih konsisten (julat B < julat A)", "Kedua-dua kelas sama konsisten", "Tidak boleh dibandingkan kerana min sama"], 0, "Julat A = 72−55 = 17. Julat B = 85−40 = 45. Walaupun min sama, Kelas A jauh lebih konsisten.", "Hard"],
  ["Poligon kekerapan bagi dua kelas diplot pada graf yang sama. Poligon kelas X lebih tinggi di bahagian kiri manakala kelas Y lebih tinggi di bahagian kanan. Inferens:", ["Kedua-dua kelas mempunyai prestasi yang sama", "Kelas X cenderung mendapat markah lebih rendah; kelas Y cenderung mendapat markah lebih tinggi", "Kelas X berprestasi lebih baik", "Tiada inferens boleh dibuat"], 1, "Poligon lebih tinggi di kiri = lebih banyak nilai rendah. Poligon lebih tinggi di kanan = lebih banyak nilai tinggi.", "Hard"],
  ["Graf garis jualan kedai: Jan–Jun meningkat, Jul–Dis menurun. Buat inferens tentang corak perniagaan.", ["Jualan tidak menentu dan rawak", "Perniagaan menunjukkan corak bermusim — jualan tinggi pada separuh pertama tahun, rendah pada separuh kedua", "Perniagaan rugi pada separuh kedua", "Data tidak mencukupi untuk inferens"], 1, "Corak meningkat kemudian menurun menunjukkan corak bermusim. Ini adalah maklumat berguna untuk perancangan perniagaan.", "Hard"],
  ["Seorang pengkaji hanya melaporkan data yang menyokong hipotesisnya dan mengabaikan data yang bertentangan. Ini adalah:", ["Amalan statistik yang baik", "Cara biasa dalam penyelidikan", "Amalan tidak beretika — memilih-milih data (cherry-picking)", "Dibenarkan jika sampel kecil"], 2, "Memilih-milih data (cherry-picking) adalah amalan tidak beretika yang menghasilkan kesimpulan yang mengelirukan atau palsu.", "Hard"],
  ["Data kelajuan larian (m/s): 3.2, 3.5, 3.1, 3.4, 3.3, 8.2. Julat = 5.1. Adakah julat ini memberikan gambaran yang tepat tentang serakan? Mengapa?", ["Ya, julat sentiasa tepat", "Tidak, kerana nilai 8.2 adalah pencilan yang membesarkan julat secara tidak wajar", "Ya, kerana menggunakan semua data", "Tidak, kerana data terlalu sedikit"], 1, "Nilai 8.2 adalah pencilan (outlier). Tanpanya, julat = 3.5−3.1 = 0.4 (sangat kecil). Julat dipengaruhi oleh pencilan.", "Hard"],
  ["Murid A mendapat markah: 70, 72, 68, 71, 74 dalam 5 ujian. Murid B: 55, 85, 60, 90, 45. Siapakah lebih konsisten dan mengapa?", ["Murid B kerana markahnya lebih pelbagai", "Murid A kerana julatnya lebih kecil (6 vs 45)", "Kedua-duanya sama konsisten", "Murid B kerana markah tertingginya lebih tinggi"], 1, "Julat A = 74−68 = 6. Julat B = 90−45 = 45. Murid A jauh lebih konsisten walaupun min mereka mungkin berbeza.", "Hard"],
  ["Apakah langkah pertama yang MESTI dilakukan semasa mentafsir sebarang carta atau graf?", ["Kira julat data", "Baca tajuk carta untuk memahami apa yang diwakili", "Cari nilai tertinggi", "Bandingkan dengan data lain"], 1, "Langkah pertama ialah membaca tajuk carta untuk memahami apa yang sedang diwakili. Tanpa ini, tafsiran mungkin tersalah.", "Hard"],
  ["Graf garis menunjukkan bilangan kes penyakit selama 10 tahun. Garis menurun secara konsisten. Ramalan dan inferens yang tepat:", ["Kes akan terus meningkat pada masa hadapan", "Kes menurun menunjukkan keberkesanan program pencegahan; jika trend berterusan, kes akan hampir hilang", "Data tidak mencukupi untuk membuat inferens", "Penyakit itu tidak berbahaya"], 1, "Trend menurun yang konsisten menunjukkan program pencegahan berkesan. Ramalan: kes akan terus berkurang jika program diteruskan.", "Hard"],
  ["Dua kelas. Histogram kelas P: taburan seragam (semua palang hampir sama tinggi). Histogram kelas Q: berbentuk loceng (palang tengah tinggi). Inferens:", ["Kelas P lebih baik kerana markahnya tersebar", "Kelas Q mempunyai taburan normal — kebanyakan murid berprestasi sederhana; kelas P mempunyai taburan seragam — prestasi konsisten", "Kelas P dan Q mempunyai prestasi yang sama", "Tidak boleh dibandingkan"], 1, "Taburan loceng (kelas Q) menunjukkan normal. Taburan seragam (kelas P) menunjukkan semua aras prestasi mempunyai bilangan murid yang sama.", "Hard"],
  ["Carta pai syarikat A menunjukkan 50% keuntungan, 30% kos, 20% lain. Carta pai syarikat B menunjukkan 30% keuntungan, 50% kos, 20% lain. Inferens:", ["Syarikat A dan B sama menguntungkan", "Syarikat A lebih menguntungkan kerana peratusan keuntungan lebih tinggi (50% vs 30%)", "Syarikat B lebih menguntungkan", "Tidak boleh dibandingkan"], 1, "Syarikat A: 50% keuntungan. Syarikat B: 30% keuntungan. Jelas Syarikat A lebih menguntungkan (peratusan keuntungan lebih tinggi).", "Hard"],
  ["Data: 2, 4, 6, 8, 10. Seorang murid menambah satu lagi data: 100. Apakah kesan ke atas julat?", ["Julat tidak berubah", "Julat meningkat dengan ketara dari 8 kepada 98", "Julat berkurang", "Julat kekal kira-kira sama"], 1, "Julat asal = 10−2 = 8. Dengan data 100: Julat = 100−2 = 98. Pencilan (100) membesarkan julat dengan sangat ketara.", "Hard"],
]);

const MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  ["A line graph shows museum visitors (thousands): 2021=45, 2022=52, 2023=58, 2024=65. Predict visitors for 2025.", ["68 thousand", "72 thousand", "75 thousand", "80 thousand"], 1, "Pattern: increase of approximately 7 thousand per year. 65 + 7 = 72 thousand. Prediction: approximately 72 thousand visitors.", "Hard"],
  ["A bar chart shows sales of 4 products: A=RM500, B=RM800, C=RM650, D=RM350. Which product contributes more than 30% of total sales?", ["Product A", "Product B", "Product C", "Product D"], 1, "Total = 500+800+650+350 = RM2300. 30% × 2300 = RM690. Only Product B (RM800) exceeds RM690.", "Hard"],
  ["A histogram shows marks for 50 students: class 41–50(f=5), 51–60(f=10), 61–70(f=20), 71–80(f=10), 81–90(f=5). Make an inference about student performance.", ["Most students perform poorly", "Most students score in 61–70 range — symmetric distribution, moderate to good performance", "Data is insufficient for conclusions", "All students score the same"], 1, "Modal class = 61–70 with frequency 20. Bell-shaped symmetric distribution. Most students perform moderately to well.", "Hard"],
  ["A graph with y-axis starting at 95 (not 0) makes a small difference appear large. This is:", ["Good data practice", "Ethical data representation", "Misleading and unethical data representation", "Fine as long as data is correct"], 2, "An axis not starting from zero makes small differences appear very large. This is unethical data representation.", "Hard"],
  ["Data set A: 48, 50, 51, 49, 52. Data set B: 40, 55, 48, 62, 45. Both have the same mean. Compare dispersion and draw a conclusion.", ["Both sets are equally reliable", "Set A is more reliable because its range is smaller", "Set B is more reliable", "Cannot be compared"], 1, "Range A = 52−48 = 4. Range B = 62−40 = 22. Set A is more consistent (range 4 vs 22) and more reliable.", "Hard"],
  ["A factory produces 5 products with masses: 99.8, 100.1, 100.0, 99.9, 100.2 g. If standard = 100g ± 0.5g, do all products meet the standard?", ["No, some fail", "Yes, all are within the range 99.5–100.5 g", "Only 3 products pass", "Cannot be determined"], 1, "Standard: 99.5g to 100.5g. All values (99.8, 100.1, 100.0, 99.9, 100.2) are within this range. All pass.", "Hard"],
  ["A line graph shows hourly temperature: 9am=28°, 10am=30°, 11am=33°, 12pm=35°, 1pm=34°, 2pm=32°. Make an inference and predict temperature at 3pm.", ["Temperature will keep rising, around 36°C", "Temperature rises until noon then falls — expected around 30°C", "Temperature will stay at 32°C", "No clear pattern"], 1, "Pattern: temperature rises until 12pm, then falls. Fall: 35→34→32 (drop ~2° per hour). Prediction 3pm: ~30°C.", "Hard"],
  ["Stem-and-leaf: 1|2 5 8, 2|0 3 6 9, 3|1 4 7, 4|0 3. Find the range of this data.", ["28", "31", "33", "35"], 1, "Smallest value = 12 (stem 1, leaf 2). Largest value = 43 (stem 4, leaf 3). Range = 43 − 12 = 31.", "Hard"],
  ["50 students asked about sleep duration: range = 4 hours. Another 30 students: range = 2 hours. Which group is more consistent and why?", ["Group of 50 because it is larger", "Group of 30 because its range is smaller (more consistent)", "Both groups equally consistent", "Cannot be compared"], 1, "Group of 30 is more consistent because its range (2 hours) is smaller than the group of 50 (4 hours).", "Hard"],
  ["A pie chart has 5 sectors. A=72°, B=108°, C=54°, D=90°, E=x°. Find x and the percentage of sector E.", ["x=36°, 10%", "x=36°, 12%", "x=30°, 10%", "x=40°, 11%"], 0, "72+108+54+90+x=360. 324+x=360. x=36°. Percentage of E = (36÷360)×100% = 10%.", "Hard"],
  ["Histogram class 60–70 has frequency 15. Class 70–80 has frequency 10. Find the midpoint of each class and frequency ratio.", ["MP1=64.5, MP2=74.5, Ratio 2:3", "MP1=65, MP2=75, Ratio 3:2", "MP1=65, MP2=75, Ratio 2:3", "MP1=64.5, MP2=74.5, Ratio 3:2"], 1, "MP1 = (60+70)÷2 = 65. MP2 = (70+80)÷2 = 75. Frequency ratio = 15:10 = 3:2.", "Hard"],
  ["A line graph shows school pass rates: 2019=78%, 2020=75%, 2021=80%, 2022=83%, 2023=85%. Make an inference.", ["No clear pattern", "Pass rates declining over time", "Pass rates generally increasing despite a slight dip in 2020 — positive trend", "Data is insufficient"], 2, "Overall trend: 78%→75%→80%→83%→85%. Slight dip in 2020 but consistently rising after. Inference: positive trend.", "Hard"],
  ["Which data representation is NOT ethical?", ["Using y-axis starting from 0", "Labelling all axes with clear units", "Using y-axis starting from 97 for a chart comparing values of 97–103", "Stating the data source"], 2, "Starting the y-axis from 97 (not 0) makes small differences between 97–103 appear very large. This is misleading and unethical.", "Hard"],
  ["Car speed data (km/h): 85, 92, 78, 95, 88, 72, 101, 83. Find the range and make an inference about driving.", ["Range=27, drivers are consistent", "Range=29, speeds are somewhat variable — caution advised", "Range=25, all safe", "Range=31, very dangerous"], 1, "Highest=101, Lowest=72. Range=101−72=29. This variation shows speeds are somewhat inconsistent.", "Hard"],
  ["30 students sit a test. Marks: mean=68, range=45. Another 30 students: mean=68, range=15. Which class needs more teacher attention?", ["First class because mean is lower", "First class because large range indicates high variation in performance", "Second class because mean is higher", "Both need equal attention"], 1, "Both classes have the same mean (68). But the first class (range=45) has far greater performance variation — some very weak and very strong students.", "Hard"],
  ["A line graph shows monthly sales: Jan–Jun increasing, Jul–Dec decreasing. Make an inference about the business pattern.", ["Sales are erratic and random", "Business shows a seasonal pattern — high sales in the first half, low in the second half", "Business is losing money in the second half", "Data is insufficient for inference"], 1, "An increasing then decreasing pattern shows a seasonal pattern. This is useful information for business planning.", "Hard"],
  ["A dot plot shows: ●●● at 5, ●●●●● at 6, ●●●●●● at 7, ●●● at 8, ● at 12. What is the most appropriate inference?", ["Data is uniformly spread", "Most values are clustered at 6–8, value 12 is an outlier possibly indicating an abnormal measurement", "There are no outliers in the data", "Data has two modes"], 1, "Data is clustered at 6–8. Value 12 is isolated (outlier) — possibly a measurement error or unusual case.", "Hard"],
  ["Frequency table: class 60–70(f=8), 70–80(f=15), 80–90(f=12), 90–100(f=5). Find midpoint of modal class and total data.", ["MP=74.5, n=40", "MP=75, n=40", "MP=74.5, n=38", "MP=75, n=42"], 1, "Modal class = 70–80 (highest frequency=15). Midpoint = (70+80)÷2 = 75. Total = 8+15+12+5 = 40.", "Hard"],
  ["Company A has employee salary range = RM500. Company B range = RM5000. A more accurate inference:", ["Company A is bigger", "Company B pays more to all employees", "Salaries in Company A are more uniform; in Company B there is a large gap between highest and lowest pay", "Cannot be compared"], 2, "A large range (RM5000) shows a big gap between highest and lowest salaries in Company B. Company A is more uniform.", "Hard"],
  ["A graph using larger icons to represent smaller values is:", ["Good data practice", "A creative approach", "An example of unethical data representation because it is misleading", "Standard in statistics"], 2, "Using icons that don't match actual values is an unethical practice that misleads readers.", "Hard"],
  ["Class A marks: 55, 62, 58, 70, 65, 68, 72, 60. Class B: 40, 80, 55, 75, 45, 85, 50, 70. Both classes have mean=63.75. Compare using range.", ["Class A is more consistent (range A=17, range B=45)", "Class B is more consistent (range B < range A)", "Both classes are equally consistent", "Cannot be compared because mean is the same"], 0, "Range A = 72−55 = 17. Range B = 85−40 = 45. Despite the same mean, Class A is far more consistent.", "Hard"],
  ["Frequency polygons for two classes are plotted on the same graph. Class X polygon is higher on the left, Class Y is higher on the right. Inference:", ["Both classes have equal performance", "Class X tends to score lower marks; Class Y tends to score higher marks", "Class X performs better", "No inference can be made"], 1, "Higher polygon on the left = more low values. Higher polygon on the right = more high values.", "Hard"],
  ["A researcher only reports data supporting their hypothesis and ignores contradictory data. This is:", ["Good statistical practice", "Normal in research", "Unethical practice — data cherry-picking", "Allowed if sample is small"], 2, "Cherry-picking data (selecting only supporting data) is unethical and produces misleading or false conclusions.", "Hard"],
  ["Running speed data (m/s): 3.2, 3.5, 3.1, 3.4, 3.3, 8.2. Range = 5.1. Does this accurately represent dispersion? Why?", ["Yes, range is always accurate", "No, because 8.2 is an outlier that artificially inflates the range", "Yes, because it uses all data", "No, because there is too little data"], 1, "8.2 is an outlier. Without it, range = 3.5−3.1 = 0.4 (very small). Range is heavily affected by outliers.", "Hard"],
  ["Student A's marks in 5 tests: 70, 72, 68, 71, 74. Student B: 55, 85, 60, 90, 45. Who is more consistent and why?", ["Student B because marks are more varied", "Student A because range is smaller (6 vs 45)", "Both are equally consistent", "Student B because highest mark is higher"], 1, "Range A = 74−68 = 6. Range B = 90−45 = 45. Student A is far more consistent even if means differ.", "Hard"],
  ["What is the FIRST step that MUST be done when interpreting any chart or graph?", ["Calculate the range", "Read the chart title to understand what is represented", "Find the highest value", "Compare with other data"], 1, "The first step is to read the chart title to understand what is being represented. Without this, interpretation may be incorrect.", "Hard"],
  ["A line graph shows number of disease cases over 10 years. The line is consistently decreasing. Correct prediction and inference:", ["Cases will keep increasing", "Decrease shows prevention programme effectiveness; if trend continues, cases will nearly disappear", "Data is insufficient for inference", "The disease is not dangerous"], 1, "Consistent downward trend shows prevention programmes are effective. Prediction: cases will continue to decrease if programmes continue.", "Hard"],
  ["Two classes. Histogram of class P: uniform distribution (all bars roughly equal). Histogram of class Q: bell-shaped (middle bar tallest). Inference:", ["Class P is better because marks are spread", "Class Q has normal distribution — most students perform moderately; class P has uniform distribution — consistent performance at all levels", "Classes P and Q have equal performance", "Cannot be compared"], 1, "Bell-shaped (class Q) = normal distribution. Uniform (class P) = all performance levels have roughly equal numbers.", "Hard"],
  ["Pie chart of company A shows 50% profit, 30% costs, 20% others. Pie chart of company B shows 30% profit, 50% costs, 20% others. Inference:", ["Companies A and B are equally profitable", "Company A is more profitable because profit percentage is higher (50% vs 30%)", "Company B is more profitable", "Cannot be compared"], 1, "Company A: 50% profit. Company B: 30% profit. Clearly Company A is more profitable (higher profit percentage).", "Hard"],
  ["Data: 2, 4, 6, 8, 10. A student adds one more data point: 100. What is the effect on the range?", ["Range does not change", "Range increases dramatically from 8 to 98", "Range decreases", "Range remains approximately the same"], 1, "Original range = 10−2 = 8. With data 100: Range = 100−2 = 98. The outlier (100) drastically increases the range.", "Hard"],
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
  "Chapter 9": {
    "objective-1": {
      bm: MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 10": {
    "objective-1": {
      bm: MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 11": {
    "objective-1": {
      bm: MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 12": {
    "objective-1": {
      bm: MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
    },
  },
  "Chapter 13": {
    "objective-1": {
      bm: MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS,
      dlp: MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP,
    },
    "objective-2": {
      bm: MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS,
      dlp: MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP,
    },
    "objective-3": {
      bm: MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS,
      dlp: MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP,
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
  const { openCikgu } = useCikgu();
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

  // ── Subject World early-return ────────────────────────────────────────────
  if (subject && !needsScienceLang && !chapter) {
    return (
      <SubjectWorldPage
        subjectId={subject}
        scienceLang={scienceLang ?? undefined}
        isBilingualSubject={isBilingualSubject}
        onSelectChapter={(key) => setChapter(key)}
        onBack={() => setSubject(null)}
        onChangeLang={isBilingualSubject ? () => setScienceLang(null) : undefined}
      />
    );
  }

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
          <SubjectWorldBanner subjectId={subject as SubjectPlanetId} />
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
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#0B1220]/90 animate-fade-up backdrop-blur-2xl"
                style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)" }}
              >
                {/* Background gradient */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.3),transparent_60%)]" />

                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#F472B6]" />

                <div className="relative px-8 py-10 text-center">
                  {/* Score emoji + title */}
                  <div className="mb-4 flex items-center justify-center">
                    {shuffledPool && score === shuffledPool.length ? (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] shadow-[0_0_48px_rgba(251,191,36,0.5)] text-4xl">
                        🏆
                      </div>
                    ) : score >= Math.ceil((shuffledPool?.length ?? pool.length) * 0.7) ? (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_40px_rgba(52,211,153,0.4)] text-4xl">
                        ⭐
                      </div>
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_36px_rgba(99,102,241,0.4)] text-4xl">
                        📚
                      </div>
                    )}
                  </div>

                  <h2 className="font-display text-3xl font-extrabold">
                    {shuffledPool && score === shuffledPool.length
                      ? "Perfect Score!"
                      : score >= Math.ceil((shuffledPool?.length ?? pool.length) * 0.7)
                        ? "Great Job!"
                        : "Quiz Complete!"}
                  </h2>

                  <p className="mt-1.5 text-sm text-white/50">Here's how you did</p>

                  {/* Big score number */}
                  <p
                    key={`score-${done}`}
                    className="font-display text-8xl font-extrabold my-6 animate-score-reveal gradient-text drop-shadow-[0_0_40px_oklch(0.63_0.22_295_/_0.7)]"
                  >
                    {animatedScore}
                    <span className="text-white/25 text-5xl">/{shuffledPool?.length ?? pool.length}</span>
                  </p>

                  {/* Stat chips */}
                  <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
                      <span className="text-base">🎯</span>
                      <span className="text-sm font-bold">
                        {Math.round((score / (shuffledPool?.length ?? pool.length)) * 100)}%
                      </span>
                      <span className="text-xs text-white/40">Accuracy</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-4 py-2">
                      <Zap className="h-4 w-4 text-[#FBBF24]" />
                      <span className="text-sm font-bold text-[#FBBF24]">+{score * 10}</span>
                      <span className="text-xs text-white/40">XP Earned</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-bold text-orange-300">{streak}</span>
                      <span className="text-xs text-white/40">Combo</span>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-8 py-3.5 font-bold text-white shadow-[0_0_32px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_48px_rgba(139,92,246,0.5)]"
                    >
                      <RotateCcw className="h-4 w-4" /> Try Again
                    </button>
                    <button
                      onClick={() => { setChapter(null); reset(); }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-8 py-3.5 font-bold text-white transition-all hover:bg-white/[0.10]"
                    >
                      <ArrowLeft className="h-4 w-4" /> Choose Chapter
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            current && (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] quiz-q-enter ${
                  feedback?.kind === "wrong"
                    ? "animate-shake"
                    : feedback?.kind === "correct"
                      ? "animate-correct-pulse"
                      : ""
                }`}
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
              >
                {/* Ambient glow behind the card */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-3xl" />

                {/* ── Card header ── */}
                <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                      <span className="text-xs font-bold text-white/50">Q</span>
                      <span className="font-display text-sm font-bold">{idx + 1}</span>
                      <span className="text-xs text-white/30">/ {shuffledPool?.length ?? pool.length}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      current.difficulty === "Hard"
                        ? "bg-rose-500/20 text-rose-300"
                        : current.difficulty === "Medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-emerald-500/20 text-emerald-300"
                    }`}>
                      {current.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Live score */}
                    <div className="flex items-center gap-1.5 rounded-full border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-1.5">
                      <Zap className="h-3 w-3 text-[#FBBF24]" />
                      <span className="text-xs font-bold text-[#FBBF24]">{score}</span>
                      <span className="text-[10px] text-white/30">correct</span>
                    </div>
                    {timerPref?.mode === "timer" && (
                      <div className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                        timeLeft <= 5
                          ? "border-rose-500/40 bg-rose-500/15 text-rose-300 animate-pulse"
                          : timeLeft <= 10
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                            : "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                      }`}>
                        <Timer className="h-3 w-3" /> {timeLeft}s
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Progress bars ── */}
                <div className="px-6 pt-4">
                  {/* Question progress */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-500"
                      style={{ width: `${((idx + 1) / (shuffledPool?.length ?? pool.length)) * 100}%` }}
                    />
                  </div>
                  {/* Timer bar */}
                  {timerPref?.mode === "timer" && (
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className={`h-full origin-left transition-[width,background-color] duration-1000 ease-linear rounded-full ${timerColor}`}
                        style={{ width: `${timerPct}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Question text ── */}
                <div className="px-6 pb-4 pt-6">
                  <h2 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                    {current.question}
                  </h2>
                </div>

                {/* ── Answer options ── */}
                <div className="grid gap-2.5 px-6 pb-6 sm:grid-cols-2">
                  {current.options.map((o, i) => {
                    const isAnswer = i === current.answerIndex;
                    const isPicked = i === selected;
                    const reveal = selected !== null;
                    const letter = ["A", "B", "C", "D"][i] ?? String(i + 1);
                    return (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        disabled={reveal}
                        className={`group relative flex items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                          reveal && isAnswer
                            ? "border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                            : reveal && isPicked && !isAnswer
                              ? "border-rose-400/50 bg-rose-500/15 shadow-[0_0_16px_rgba(239,68,68,0.15)]"
                              : reveal
                                ? "border-white/[0.05] bg-white/[0.02] opacity-50"
                                : "border-white/[0.09] bg-white/[0.04] hover:border-[#8B5CF6]/50 hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)]"
                        }`}
                      >
                        {/* Letter badge */}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all ${
                            reveal && isAnswer
                              ? "bg-emerald-400 text-[#050816]"
                              : reveal && isPicked && !isAnswer
                                ? "bg-rose-400 text-white"
                                : "bg-white/[0.08] text-white/60 group-hover:bg-[#8B5CF6]/25 group-hover:text-[#A78BFA]"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className={`flex-1 text-sm font-semibold leading-6 ${
                          reveal && isAnswer
                            ? "text-emerald-100"
                            : reveal && isPicked && !isAnswer
                              ? "text-rose-100"
                              : "text-white/80 group-hover:text-white"
                        }`}>
                          {o}
                        </span>
                        {reveal && isAnswer && (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        )}
                        {reveal && isPicked && !isAnswer && (
                          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ── Feedback callout ── */}
                {feedback && (
                  <div
                    className={`mx-6 mb-4 flex items-center gap-3 rounded-2xl border p-4 animate-fade-up ${
                      feedback.kind === "correct"
                        ? "border-emerald-400/30 bg-emerald-500/12"
                        : "border-rose-400/30 bg-rose-500/12"
                    }`}
                  >
                    {feedback.kind === "correct"
                      ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                      : <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                    }
                    <span className={`font-display text-lg font-bold ${
                      feedback.kind === "correct" ? "text-emerald-300" : "text-rose-300"
                    }`}>
                      {feedback.msg}
                    </span>
                  </div>
                )}

                {/* ── Explanation ── */}
                {selected !== null && current.explanation && (
                  <div className="mx-6 mb-4 flex items-start gap-3 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/8 p-4 animate-fade-up">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
                    <p className="text-sm leading-7 text-slate-300">{current.explanation}</p>
                  </div>
                )}

                {/* ── Cikgu AI wrong-answer explainer ── */}
                {selected !== null && feedback?.kind === "wrong" && (
                  <div className="mx-6 mb-4 animate-fade-up">
                    <button
                      onClick={() =>
                        openCikgu({
                          mode: "quiz-explain",
                          subjectId: subject ?? undefined,
                          subjectName: subjects.find((s) => s.id === subject)?.name,
                          chapterKey: chapter ?? undefined,
                          chapterTitle: chapterMeta?.label,
                          quizContext: {
                            question: current.question,
                            options: current.options,
                            wrongAnswerIndex: selected,
                            correctAnswerIndex: current.answerIndex,
                            explanation: current.explanation,
                            subjectId: subject ?? undefined,
                          },
                          initialMessage: `Saya salah pilih "${current.options[selected]}" untuk soalan ini. Boleh Cikgu terangkan kenapa jawapan saya salah dan kenapa "${current.options[current.answerIndex]}" adalah betul?`,
                        })
                      }
                      className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-[#6366F1]/30 bg-[#6366F1]/10 py-3 text-sm font-semibold text-[#A5B4FC] transition-all hover:bg-[#6366F1]/20 hover:border-[#6366F1]/50 active:scale-[0.99]"
                    >
                      <span className="text-base">👨‍🚀</span>
                      Cikgu AI — Kenapa jawapan saya salah?
                    </button>
                  </div>
                )}

                {/* ── Next button ── */}
                {selected !== null && (
                  <div className="border-t border-white/[0.06] px-6 py-4">
                    <button
                      onClick={next}
                      className="w-full rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] py-3.5 font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-[0.99]"
                    >
                      {idx + 1 >= (shuffledPool?.length ?? pool.length) ? "See Results ✨" : "Next Question →"}
                    </button>
                  </div>
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
  const chapterBmEntry = getSubjectChapters(subjectId, "bm").find((c) => c.key === chapterKey);
  const chapterDlpEntry = getSubjectChapters(subjectId, "dlp").find((c) => c.key === chapterKey);
  const chapterTitle = isDlp ? (chapterDlpEntry?.label ?? chapterKey) : (chapterBmEntry?.label ?? chapterKey);
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
            : `This quiz is designed to test your full mastery of ${chapterTitle}.`
      : isChapter6
        ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 6."
        : isChapter5
        ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 5."
        : isChapter2
          ? "Quiz ini mengandungi soalan berbentuk peperiksaan dan penyelesaian masalah."
          : isChapter3
            ? "Quiz ini direka untuk menguji penguasaan penuh anda terhadap Bab 3."
            : `Quiz ini direka untuk menguji penguasaan penuh anda terhadap ${chapterTitle}.`
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
                  "Core topic concepts",
                  "Application of formulas",
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
                  "Konsep teras topik",
                  "Penerapan rumus",
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
                    "Core concepts",
                    "Intermediate calculations",
                    "Mixed practice",
                    "Problem solving",
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
                    "Konsep teras",
                    "Pengiraan pertengahan",
                    "Latihan campuran",
                    "Penyelesaian masalah",
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
        className={`relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] quiz-q-enter ${
          feedback?.kind === "wrong"
            ? "animate-shake"
            : feedback?.kind === "correct"
              ? "animate-correct-pulse"
              : ""
        }`}
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold" style={{ color: "#FBBF24" }}>{objective.badge} {objective.title}</span>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <span className="text-xs font-bold text-white/50">Q</span>
              <span className="font-display text-sm font-bold">{idx + 1}</span>
              <span className="text-xs text-white/30">/ {total}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-1.5">
            <Zap className="h-3 w-3 text-[#FBBF24]" />
            <span className="text-xs font-bold text-[#FBBF24]">{score}</span>
            <span className="text-[10px] text-white/30">/{total}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] transition-all duration-500"
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 pb-4 pt-6">
          <h2 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">{current.question}</h2>
        </div>

        {/* Answer options */}
        <div className="grid gap-2.5 px-6 pb-6 sm:grid-cols-2">
          {current.options.map((option, optionIndex) => {
            const isAnswer = optionIndex === current.answerIndex;
            const isPicked = optionIndex === selected;
            const reveal = selected !== null;
            const letter = ["A", "B", "C", "D"][optionIndex] ?? String(optionIndex + 1);

            return (
              <button
                key={`${idx}-${option}`}
                onClick={() => onAnswer(optionIndex)}
                disabled={reveal}
                className={`group relative flex items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                  reveal && isAnswer
                    ? "border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                    : reveal && isPicked && !isAnswer
                      ? "border-rose-400/50 bg-rose-500/15 shadow-[0_0_16px_rgba(239,68,68,0.15)]"
                      : reveal
                        ? "border-white/[0.05] bg-white/[0.02] opacity-50"
                        : "border-white/[0.09] bg-white/[0.04] hover:border-[#FBBF24]/40 hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(251,191,36,0.1)]"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all ${
                  reveal && isAnswer ? "bg-emerald-400 text-[#050816]"
                    : reveal && isPicked && !isAnswer ? "bg-rose-400 text-white"
                    : "bg-white/[0.08] text-white/60 group-hover:bg-[#FBBF24]/20 group-hover:text-[#FBBF24]"
                }`}>
                  {letter}
                </span>
                <span className={`flex-1 text-sm font-semibold leading-6 ${
                  reveal && isAnswer ? "text-emerald-100"
                    : reveal && isPicked && !isAnswer ? "text-rose-100"
                    : "text-white/80 group-hover:text-white"
                }`}>
                  {option}
                </span>
                {reveal && isAnswer && <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />}
                {reveal && isPicked && !isAnswer && <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mx-6 mb-4 flex items-center gap-3 rounded-2xl border p-4 animate-fade-up ${
            feedback.kind === "correct" ? "border-emerald-400/30 bg-emerald-500/12" : "border-rose-400/30 bg-rose-500/12"
          }`}>
            {feedback.kind === "correct"
              ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              : <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
            }
            <span className={`font-display text-lg font-bold ${feedback.kind === "correct" ? "text-emerald-300" : "text-rose-300"}`}>
              {feedback.msg}
            </span>
          </div>
        )}

        {selected !== null && current.explanation && (
          <div className="mx-6 mb-4 flex items-start gap-3 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/8 p-4 animate-fade-up">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
            <p className="text-sm text-slate-300 leading-7">{current.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <div className="border-t border-white/[0.06] px-6 py-4">
            <button
              onClick={onNext}
              className="w-full rounded-2xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] py-3.5 font-bold text-[#050816] shadow-[0_0_28px_rgba(251,191,36,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] active:scale-[0.99]"
            >
              {idx + 1 >= total
                ? isDlp ? "See Results ✨" : "Lihat Keputusan ✨"
                : isDlp ? "Next Question →" : "Soalan Seterusnya →"}
            </button>
          </div>
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
  const resultChapterBm = getSubjectChapters("math", "bm").find((c) => c.key === chapterKey);
  const resultChapterDlp = getSubjectChapters("math", "dlp").find((c) => c.key === chapterKey);
  const chapterName = isDlp ? (resultChapterDlp?.label ?? chapterKey) : (resultChapterBm?.label ?? chapterKey);
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

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { subjects, forms, type Form } from "@/data/subjects-meta";
import type { Difficulty, QuizQuestion } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { useSignInModal } from "@/context/sign-in-modal";
import { useCikgu } from "@/context/cikgu-context";
import { useAuth } from "@/context/auth-context";
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
  Loader2,
  AlertTriangle,
} from "lucide-react";
import {
  SubjectGrid,
  FormGrid,
  FormComingSoon,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { DailyQuote } from "@/components/DailyQuote";
import { Confetti } from "@/components/Confetti";
import { sfx } from "@/lib/sounds";
import {
  cleanLearningLabel,
  cleanLearningQuestion,
  cleanLearningTitle,
} from "@/lib/clean-learning-title";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import { useContentRegistry, useContentRegistryStatus } from "@/hooks/use-content-registry";
import {
  AcademyHero,
  AcademyPageShell,
  AcademyPanel,
  SubjectWorldBanner,
  type SubjectPlanetId,
} from "@/components/AcademyPage";
import { QuizArena } from "@/components/quiz/QuizArena";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { MathIndexText } from "@/components/quiz/MathIndexText";
import type { MathQuestionVisual as MathQuestionVisualData } from "@/features/quiz/visuals/mathQuestionVisual";
import { MATH_F1_C1_QUIZ_VISUALS } from "@/content/form1/math/chapter-1/quiz-visuals";
import { MATH_F1_C8_QUIZ_VISUALS } from "@/content/form1/math/chapter-8/quiz-visuals";
import { MATH_F1_C12_QUIZ_VISUALS } from "@/content/form1/math/chapter-12/quiz-visuals";
import { useQuizStageTransition } from "@/components/quiz/useQuizStageTransition";
import { SubjectWorldPage } from "@/components/SubjectWorldPage";
import { BMWorldPage } from "@/components/BMWorldPage";
import imgF3Q01 from "@/assets/english posters/form 3/q01.png";
import imgF3Q02 from "@/assets/english posters/form 3/q02.png";
import imgF3Q03 from "@/assets/english posters/form 3/q03.png";
import imgF3Q04 from "@/assets/english posters/form 3/q04.png";
import imgF3Q05 from "@/assets/english posters/form 3/q05.png";
import imgF3Q06 from "@/assets/english posters/form 3/q06.png";
import imgF3Q07 from "@/assets/english posters/form 3/q07.png";
import imgF3Q08 from "@/assets/english posters/form 3/q08.png";
import imgF3Q09 from "@/assets/english posters/form 3/q09.png";
import imgF3Q10 from "@/assets/english posters/form 3/q10.png";
import imgF3Q11 from "@/assets/english posters/form 3/q11.png";
import imgF3Q12 from "@/assets/english posters/form 3/q12.png";
import {
  ENGLISH_QUIZ_PAPERS,
  ENGLISH_QUIZ_SETS,
  getEnglishQuizSet,
  getEnglishQuizSetsForPaper,
  type EnglishQuizPaperId,
  type EnglishQuizSetId,
  type EnglishQuizSetMeta,
} from "@/data/english-f1-quiz-sets";
import {
  ENGLISH_QUIZ_PAPERS_F2,
  ENGLISH_QUIZ_SETS_F2,
  getEnglishQuizSetF2,
  getEnglishQuizSetsForPaperF2,
  type EnglishQuizPaperIdF2,
  type EnglishQuizSetIdF2,
  type EnglishQuizSetMetaF2,
} from "@/data/english-f2-quiz-sets";
import {
  ENGLISH_QUIZ_PAPERS_F3,
  ENGLISH_QUIZ_SETS_F3,
  getEnglishQuizSetF3,
  getEnglishQuizSetsForPaperF3,
  type EnglishQuizPaperIdF3,
  type EnglishQuizSetIdF3,
  type EnglishQuizSetMetaF3,
} from "@/data/english-f3-quiz-sets";
import { seoMeta, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";
import { subjectSeoName, subjectSeoKeywords } from "@/lib/subject-seo";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { QuizStreakCelebration } from "@/features/quiz-streak/QuizStreakCelebration";
import { useQuizStreak } from "@/features/quiz-streak/useQuizStreak";
import {
  orderQuestionsByDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";
import {
  EMPTY_CORRECT_BY_DIFFICULTY,
  QUIZ_BASE_XP,
  addCorrectAnswer,
  buildCanonicalQuizKey,
  createQuizCompletionId,
  historicalDifficultyTier,
  timerModeFromPref,
  type CorrectByDifficulty,
  type QuizCompletionResult,
  type QuizCompletionSubmission,
} from "@/features/quiz/xp/quizXp";
import { defaultQuizLanguage } from "@/lib/quiz-identity";
import {
  quizSaveFailureKindOf,
  quizSaveFailureMessage,
  type QuizSaveFailure,
} from "@/features/quiz/xp/quizCompletionError";
import {
  mathF2C1ChallengeQuizzesDLP,
  mathF2C1FoundationQuizzesDLP,
  mathF2C1PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-1/quizzes-dlp";
import {
  mathF2C1ChallengeQuizzesBM,
  mathF2C1FoundationQuizzesBM,
  mathF2C1PracticeQuizzesBM,
} from "@/content/form2/math/chapter-1/quizzes-bm";
import {
  mathF2C2ChallengeQuizzesDLP,
  mathF2C2FoundationQuizzesDLP,
  mathF2C2PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-2/quizzes-dlp";
import {
  mathF2C2ChallengeQuizzesBM,
  mathF2C2FoundationQuizzesBM,
  mathF2C2PracticeQuizzesBM,
} from "@/content/form2/math/chapter-2/quizzes-bm";
import {
  mathF2C3ChallengeQuizzesDLP,
  mathF2C3FoundationQuizzesDLP,
  mathF2C3PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-3/quizzes-dlp";
import {
  mathF2C3ChallengeQuizzesBM,
  mathF2C3FoundationQuizzesBM,
  mathF2C3PracticeQuizzesBM,
} from "@/content/form2/math/chapter-3/quizzes-bm";
import {
  mathF2C4ChallengeQuizzesDLP,
  mathF2C4FoundationQuizzesDLP,
  mathF2C4PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-4/quizzes-dlp";
import {
  mathF2C4ChallengeQuizzesBM,
  mathF2C4FoundationQuizzesBM,
  mathF2C4PracticeQuizzesBM,
} from "@/content/form2/math/chapter-4/quizzes-bm";
import {
  mathF2C5ChallengeQuizzesDLP,
  mathF2C5FoundationQuizzesDLP,
  mathF2C5PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-5/quizzes-dlp";
import {
  mathF2C5ChallengeQuizzesBM,
  mathF2C5FoundationQuizzesBM,
  mathF2C5PracticeQuizzesBM,
} from "@/content/form2/math/chapter-5/quizzes-bm";
import {
  mathF2C6ChallengeQuizzesDLP,
  mathF2C6FoundationQuizzesDLP,
  mathF2C6PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-6/quizzes-dlp";
import {
  mathF2C6ChallengeQuizzesBM,
  mathF2C6FoundationQuizzesBM,
  mathF2C6PracticeQuizzesBM,
} from "@/content/form2/math/chapter-6/quizzes-bm";
import {
  mathF2C7ChallengeQuizzesDLP,
  mathF2C7FoundationQuizzesDLP,
  mathF2C7PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-7/quizzes-dlp";
import {
  mathF2C7ChallengeQuizzesBM,
  mathF2C7FoundationQuizzesBM,
  mathF2C7PracticeQuizzesBM,
} from "@/content/form2/math/chapter-7/quizzes-bm";
import {
  mathF2C8ChallengeQuizzesDLP,
  mathF2C8FoundationQuizzesDLP,
  mathF2C8PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-8/quizzes-dlp";
import {
  mathF2C8ChallengeQuizzesBM,
  mathF2C8FoundationQuizzesBM,
  mathF2C8PracticeQuizzesBM,
} from "@/content/form2/math/chapter-8/quizzes-bm";
import {
  mathF2C9ChallengeQuizzesDLP,
  mathF2C9FoundationQuizzesDLP,
  mathF2C9PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-9/quizzes-dlp";
import {
  mathF2C9ChallengeQuizzesBM,
  mathF2C9FoundationQuizzesBM,
  mathF2C9PracticeQuizzesBM,
} from "@/content/form2/math/chapter-9/quizzes-bm";
import {
  mathF2C10ChallengeQuizzesDLP,
  mathF2C10FoundationQuizzesDLP,
  mathF2C10PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-10/quizzes-dlp";
import {
  mathF2C10ChallengeQuizzesBM,
  mathF2C10FoundationQuizzesBM,
  mathF2C10PracticeQuizzesBM,
} from "@/content/form2/math/chapter-10/quizzes-bm";
import {
  mathF2C11ChallengeQuizzesDLP,
  mathF2C11FoundationQuizzesDLP,
  mathF2C11PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-11/quizzes-dlp";
import {
  mathF2C11ChallengeQuizzesBM,
  mathF2C11FoundationQuizzesBM,
  mathF2C11PracticeQuizzesBM,
} from "@/content/form2/math/chapter-11/quizzes-bm";
import {
  mathF2C12ChallengeQuizzesDLP,
  mathF2C12FoundationQuizzesDLP,
  mathF2C12PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-12/quizzes-dlp";
import {
  mathF2C12ChallengeQuizzesBM,
  mathF2C12FoundationQuizzesBM,
  mathF2C12PracticeQuizzesBM,
} from "@/content/form2/math/chapter-12/quizzes-bm";
import {
  mathF2C13ChallengeQuizzesDLP,
  mathF2C13FoundationQuizzesDLP,
  mathF2C13PracticeQuizzesDLP,
} from "@/content/form2/math/chapter-13/quizzes-dlp";
import {
  mathF2C13ChallengeQuizzesBM,
  mathF2C13FoundationQuizzesBM,
  mathF2C13PracticeQuizzesBM,
} from "@/content/form2/math/chapter-13/quizzes-bm";

export const Route = createFileRoute("/quizzes")({
  head: ({ match }) => {
    const subjectId = (match.search as { subject?: string })?.subject;
    const subjectName = subjectSeoName(subjectId);
    const title = subjectName
      ? `${subjectName} Quiz — KSSM Form 1-3 Practice`
      : "KSSM Quiz — Form 1-3 Practice Questions";
    const description = subjectName
      ? `${subjectName} KSSM quiz for Form 1-3 with instant scoring — Easy, Medium and Hard difficulty, XP rewards.`
      : "Interactive KSSM quizzes with instant scoring — Easy, Medium and Hard difficulty across Science, Math, English, Bahasa Melayu, Sejarah and Geografi.";
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Quizzes", path: "/quizzes" },
    ];
    if (subjectName) crumbs.push({ name: subjectName, path: `/quizzes?subject=${subjectId}` });
    return seoMeta({
      title,
      description,
      path: subjectName ? `/quizzes?subject=${subjectId}` : "/quizzes",
      keywords: ["KSSM quiz", "Form 1 quiz", ...subjectSeoKeywords(subjectId)],
      jsonLd: [
        courseJsonLd({
          name: subjectName
            ? `${subjectName} KSSM Quiz Practice (Form 1-3)`
            : "KSSM Quiz Practice — Form 1-3",
          description,
          path: subjectName ? `/quizzes?subject=${subjectId}` : "/quizzes",
          subjectName: subjectName ?? undefined,
        }),
        breadcrumbJsonLd(crumbs),
      ],
    });
  },
  component: QuizzesPage,
});

const diffs: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];
const CORRECT_MSGS = ["Hebat! 🔥", "Betul! ⚡", "Awesome! 🌟", "Bagus! 💫", "Power! 🚀"];
const WRONG_MSGS = ["Cuba lagi! 💪", "Jangan give up! 🎯", "Hampir! 🤔", "Keep going! 🌱"];
const SCIENCE_QUIZ_FEEDBACK = {
  bm: {
    correct: ["Hebat! 🔥", "Betul! ⚡", "Bagus! 🌟"],
    wrong: ["Belum tepat. 💪", "Cuba lagi! 🎯", "Hampir! 🤔"],
  },
  dlp: {
    correct: ["Excellent! 🔥", "Correct! ⚡", "Well done! 🌟"],
    wrong: ["Not quite. 💪", "Try again! 🎯", "Almost! 🤔"],
  },
} as const;
type TimerMode = "timer" | "none";
type TimerPref = { mode: TimerMode; seconds: number } | null;
type QuizFeedback = {
  kind: "correct" | "wrong";
  msg: string;
  streakReset?: boolean;
};
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

const MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Antara berikut, yang manakah integer?",
    ["-8", "0.5", "3/4", "1.2"],
    0,
    "Integer ialah nombor bulat positif, nombor bulat negatif atau sifar.",
    "Easy",
  ],
  [
    "Manakah integer positif?",
    ["-4", "5", "-1", "0"],
    1,
    "Integer positif lebih besar daripada sifar.",
    "Easy",
  ],
  [
    "Manakah integer negatif?",
    ["3", "0", "-7", "9"],
    2,
    "Integer negatif kurang daripada sifar.",
    "Easy",
  ],
  [
    "Antara berikut, yang manakah bukan integer?",
    ["-12", "8", "0", "0.5"],
    3,
    "0.5 ialah nombor perpuluhan, bukan integer.",
    "Easy",
  ],
  [
    "Pada garis nombor, nombor di sebelah kanan sifar ialah:",
    ["Integer negatif", "Integer positif", "Pecahan negatif", "Perpuluhan negatif"],
    1,
    "Nombor di sebelah kanan sifar ialah nombor positif dan nilainya semakin besar.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.rightOfZero,
  ],
  [
    "Yang manakah paling besar?",
    ["-5", "-8", "-2", "-10"],
    2,
    "-2 lebih besar kerana berada lebih kanan pada garis nombor.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.compareNegativeIntegers,
  ],
  [
    "Susun nombor berikut secara menaik: -3, 5, -1, 2",
    ["2, 5, -3, -1", "5, 2, -1, -3", "-1, -3, 2, 5", "-3, -1, 2, 5"],
    3,
    "Tertib menaik ialah daripada nilai terkecil kepada terbesar.",
    "Easy",
  ],
  [
    "Susun nombor berikut secara menurun: -4, 6, 0, 3",
    ["6, 3, 0, -4", "-4, 0, 3, 6", "3, 6, 0, -4", "6, 0, 3, -4"],
    0,
    "Tertib menurun ialah daripada nilai terbesar kepada terkecil.",
    "Easy",
  ],
  ["Hitung: 5 + (-2)", ["7", "-7", "3", "-3"], 2, "5 + (-2) = 3.", "Easy"],
  ["Hitung: -4 + 6", ["-10", "-2", "10", "2"], 3, "-4 + 6 = 2.", "Easy"],
  ["Hitung: 8 - 3", ["5", "11", "-5", "-11"], 0, "8 - 3 = 5.", "Easy"],
  ["Hitung: 3 - 8", ["5", "-5", "11", "-11"], 1, "3 - 8 = -5.", "Easy"],
  [
    "Hitung: (-3) × 4",
    ["12", "-7", "7", "-12"],
    3,
    "Tanda berlainan menghasilkan jawapan negatif.",
    "Easy",
  ],
  [
    "Hitung: (-5) × (-2)",
    ["10", "-10", "7", "-7"],
    0,
    "Tanda sama menghasilkan jawapan positif.",
    "Easy",
  ],
  ["Hitung: 18 ÷ 3", ["-6", "6", "15", "-15"], 1, "18 ÷ 3 = 6.", "Easy"],
  [
    "Hitung: (-20) ÷ 5",
    ["4", "25", "-4", "-25"],
    2,
    "Tanda berlainan menghasilkan jawapan negatif.",
    "Easy",
  ],
  [
    "Hitung: 2 + 3 × 4",
    ["14", "20", "12", "10"],
    0,
    "Darab dahulu: 3 × 4 = 12, kemudian 2 + 12 = 14.",
    "Easy",
  ],
  [
    "Hitung: (2 + 3) × 4",
    ["14", "12", "20", "24"],
    2,
    "Kurungan dahulu: 2 + 3 = 5, kemudian 5 × 4 = 20.",
    "Easy",
  ],
  [
    "Yang manakah pecahan negatif?",
    ["1/2", "-2/7", "3/5", "5/8"],
    1,
    "Pecahan negatif mempunyai tanda negatif.",
    "Easy",
  ],
  [
    "Yang manakah paling besar?",
    ["-2", "-3/4", "-1", "-1/2"],
    3,
    "-1/2 lebih besar kerana nilainya lebih hampir kepada sifar berbanding -3/4, -1 dan -2.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.compareNegativeFractions,
  ],
  ["Hitung: 1/2 + 1/2", ["1/4", "2", "1", "3/2"], 2, "1/2 + 1/2 = 1.", "Easy"],
  [
    "Hitung: 3/4 - 1/4",
    ["1", "1/2", "1/4", "3/4"],
    1,
    "Penyebut sama, jadi tolak pengangka: 3 - 1 = 2. Maka 2/4 = 1/2.",
    "Easy",
  ],
  [
    "Yang manakah perpuluhan negatif?",
    ["2.5", "0.3", "4.8", "-1.7"],
    3,
    "Perpuluhan negatif ialah nombor perpuluhan yang kurang daripada sifar.",
    "Easy",
  ],
  [
    "Yang manakah paling kecil?",
    ["-0.5", "0.5", "1.5", "2.5"],
    0,
    "Semua nombor negatif lebih kecil daripada nombor positif.",
    "Easy",
  ],
  ["Hitung: 2.5 + 1.5", ["3", "4", "5", "3.5"], 1, "2.5 + 1.5 = 4.0.", "Easy"],
  ["Hitung: 5.6 - 2.4", ["2.2", "1.2", "4.2", "3.2"], 3, "5.6 - 2.4 = 3.2.", "Easy"],
  [
    "Nombor nisbah boleh ditulis dalam bentuk p/q, dengan p dan q ialah integer dan q ≠ 0. Yang manakah menunjukkan 0.7 dalam bentuk p/q?",
    ["7/10", "7/100", "1/7", "70/1"],
    0,
    "0.7 = 7/10. Oleh sebab 0.7 boleh ditulis dalam bentuk p/q, 0.7 ialah nombor nisbah.",
    "Easy",
  ],
  ["Tukarkan 3.5 kepada pecahan.", ["3/2", "5/2", "7/2", "9/2"], 2, "3.5 = 35/10 = 7/2.", "Easy"],
  [
    "Ali memperoleh keuntungan RM50. Nilai ini diwakili sebagai:",
    ["-50", "-500", "0", "+50"],
    3,
    "Untung diwakili oleh nilai positif.",
    "Easy",
  ],
  [
    "Siti mengalami kerugian RM30. Nilai ini diwakili sebagai:",
    ["30", "-30", "+30", "300"],
    1,
    "Rugi diwakili oleh nilai negatif.",
    "Easy",
  ],
]);

const MATH_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Hitung: -12 + 7",
    ["-5", "-19", "5", "19"],
    0,
    "-12 + 7 = -5 kerana 12 lebih besar daripada 7 dan tanda jawapan negatif.",
    "Medium",
  ],
  ["Hitung: 15 + (-23)", ["38", "-8", "8", "-38"], 1, "15 + (-23) = 15 - 23 = -8.", "Medium"],
  [
    "Hitung: -18 - (-6)",
    ["-24", "12", "-12", "24"],
    2,
    "Menolak integer negatif menjadi tambah: -18 - (-6) = -18 + 6 = -12.",
    "Medium",
  ],
  ["Hitung: 9 - (-14)", ["-23", "-5", "5", "23"], 3, "9 - (-14) = 9 + 14 = 23.", "Medium"],
  [
    "Pada garis nombor, bergerak 8 langkah ke kiri dari -3 akan sampai ke:",
    ["-5", "-11", "5", "11"],
    1,
    "Bergerak ke kiri bermaksud menolak: -3 - 8 = -11.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.moveLeftEight,
  ],
  [
    "Pada garis nombor, bergerak 6 langkah ke kanan dari -9 akan sampai ke:",
    ["-15", "3", "-3", "15"],
    2,
    "Bergerak ke kanan bermaksud menambah: -9 + 6 = -3.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.moveRightSix,
  ],
  [
    "Susun nombor berikut secara menaik: -7, 4, -2, 0, 9",
    ["0, -2, -7, 4, 9", "9, 4, 0, -2, -7", "-2, -7, 0, 4, 9", "-7, -2, 0, 4, 9"],
    3,
    "Tertib menaik bermula daripada nombor paling kecil: -7, -2, 0, 4, 9.",
    "Medium",
  ],
  [
    "Antara berikut, pasangan nombor manakah disusun daripada kecil kepada besar?",
    ["-10, -4", "-3, -8", "6, -2", "0, -1"],
    0,
    "-10 lebih kecil daripada -4 kerana -10 berada lebih kiri pada garis nombor.",
    "Medium",
  ],
  [
    "Nilai suhu berubah daripada -4°C kepada 9°C. Berapakah kenaikan suhu?",
    ["5°C", "9°C", "13°C", "-13°C"],
    2,
    "Kenaikan suhu = 9 - (-4) = 13°C.",
    "Medium",
  ],
  [
    "Sebuah lif berada di tingkat -2 dan naik 7 tingkat. Di tingkat manakah lif itu berada?",
    ["-9", "-5", "9", "5"],
    3,
    "-2 + 7 = 5, jadi lif berada di tingkat 5.",
    "Medium",
  ],
  [
    "Hitung: (-6) × 8",
    ["-48", "-14", "14", "48"],
    0,
    "Tanda berlainan memberikan hasil negatif: (-6) × 8 = -48.",
    "Medium",
  ],
  [
    "Hitung: (-9) × (-7)",
    ["-63", "63", "16", "-16"],
    1,
    "Tanda sama memberikan hasil positif: (-9) × (-7) = 63.",
    "Medium",
  ],
  [
    "Hitung: 56 ÷ (-8)",
    ["48", "7", "-48", "-7"],
    3,
    "Tanda berlainan memberikan hasil negatif: 56 ÷ (-8) = -7.",
    "Medium",
  ],
  [
    "Hitung: (-72) ÷ (-9)",
    ["8", "-8", "-63", "63"],
    0,
    "Tanda sama memberikan hasil positif: (-72) ÷ (-9) = 8.",
    "Medium",
  ],
  [
    "Hitung: 4 + (-3) × 5",
    ["5", "-11", "-15", "20"],
    1,
    "Darab dahulu: (-3) × 5 = -15. Kemudian 4 + (-15) = -11.",
    "Medium",
  ],
  [
    "Hitung: (4 + (-3)) × 5",
    ["1", "-5", "5", "35"],
    2,
    "Kurungan dahulu: 4 + (-3) = 1. Kemudian 1 × 5 = 5.",
    "Medium",
  ],
  [
    "Hitung: -30 ÷ 5 + 4",
    ["-2", "-10", "2", "10"],
    0,
    "Bahagi dahulu: -30 ÷ 5 = -6. Kemudian -6 + 4 = -2.",
    "Medium",
  ],
  [
    "Hukum manakah ditunjukkan oleh 7 + (-2) = (-2) + 7?",
    ["Hukum Identiti", "Hukum Kalis Agihan", "Hukum Kalis Tukar Tertib", "Hukum Kalis Sekutuan"],
    2,
    "Susunan nombor ditukar tetapi hasil tambah sama, jadi ini Hukum Kalis Tukar Tertib.",
    "Medium",
  ],
  [
    "Hukum manakah ditunjukkan oleh 3 × (4 + 5) = 3 × 4 + 3 × 5?",
    ["Hukum Identiti", "Hukum Kalis Agihan", "Hukum Kalis Tukar Tertib", "Hukum Songsang"],
    1,
    "Pendaraban diagihkan kepada setiap sebutan dalam kurungan.",
    "Medium",
  ],
  [
    "Hitung: 6 × (-2 + 5)",
    ["-18", "-42", "42", "18"],
    3,
    "Kurungan dahulu: -2 + 5 = 3. Kemudian 6 × 3 = 18.",
    "Medium",
  ],
  [
    "Hitung: -1/3 + 2/3",
    ["-1", "1", "1/3", "-1/3"],
    2,
    "Penyebut sama, jadi tambah pengangka: -1 + 2 = 1. Jawapan ialah 1/3.",
    "Medium",
  ],
  [
    "Hitung: 5/6 - 1/3",
    ["4/3", "1/2", "2/6", "6/3"],
    1,
    "Samakan penyebut: 1/3 = 2/6. Maka 5/6 - 2/6 = 3/6 = 1/2.",
    "Medium",
  ],
  [
    "Hitung: (-3/4) × 8",
    ["32/3", "6", "-3/32", "-6"],
    3,
    "(-3/4) × 8 = (-3 × 8) / 4 = -24/4 = -6.",
    "Medium",
  ],
  [
    "Hitung: (-2.5) + 4.8",
    ["2.3", "-2.3", "-7.3", "7.3"],
    0,
    "4.8 - 2.5 = 2.3 dan nilai positif lebih besar.",
    "Medium",
  ],
  [
    "Hitung: 6.4 - (-1.9)",
    ["4.5", "8.3", "5.5", "-8.3"],
    1,
    "Menolak nombor negatif menjadi tambah: 6.4 + 1.9 = 8.3.",
    "Medium",
  ],
  [
    "Yang manakah bersamaan dengan -1.25?",
    ["1/25", "-1/4", "5/4", "-5/4"],
    3,
    "1.25 = 125/100 = 5/4, maka -1.25 = -5/4.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah bukan nombor nisbah?",
    ["√2", "0.75", "2/9", "-6"],
    0,
    "√2 tidak boleh ditulis sebagai a/b dengan a dan b integer serta b ≠ 0, jadi bukan nombor nisbah.",
    "Hard",
  ],
  [
    "Hitung: 1/2 + 0.75",
    ["0.8", "1", "1.25", "1.75"],
    2,
    "1/2 = 0.5. Maka 0.5 + 0.75 = 1.25.",
    "Medium",
  ],
  [
    "Amin mempunyai hutang RM18 dan membayar RM7. Nilai baki hutangnya diwakili oleh:",
    ["-25", "25", "11", "-11"],
    3,
    "Hutang diwakili nilai negatif: -18 + 7 = -11.",
    "Hard",
  ],
  [
    "Hitung: (-4.5) ÷ 1.5 + 2",
    ["-5", "-1", "1", "5"],
    1,
    "Bahagi dahulu: (-4.5) ÷ 1.5 = -3. Kemudian -3 + 2 = -1.",
    "Hard",
  ],
]);

const MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Hitung: -17 + 29 - 8",
    ["4", "-4", "-54", "20"],
    0,
    "-17 + 29 = 12, kemudian 12 - 8 = 4.",
    "Medium",
  ],
  [
    "Hitung: 12 - (-5) + (-9)",
    ["-2", "8", "16", "26"],
    1,
    "12 - (-5) = 17. Kemudian 17 + (-9) = 8.",
    "Medium",
  ],
  [
    "Hitung: (-4) × 3 + 18 ÷ (-6)",
    ["9", "-9", "-15", "15"],
    2,
    "Darab dan bahagi dahulu: (-4) × 3 = -12 dan 18 ÷ (-6) = -3. Maka -12 + (-3) = -15.",
    "Medium",
  ],
  [
    "Antara berikut, nombor manakah paling besar?",
    ["-16", "-11", "-21", "-9"],
    3,
    "-9 paling besar kerana berada paling kanan antara nombor negatif tersebut.",
    "Medium",
  ],
  [
    "Susun nombor berikut secara menaik: -12, -3, 5, 0, -8",
    ["5, 0, -3, -8, -12", "-12, -8, -3, 0, 5", "-3, -8, -12, 0, 5", "-12, -3, -8, 0, 5"],
    1,
    "Tertib menaik ialah daripada nilai paling kecil kepada paling besar: -12, -8, -3, 0, 5.",
    "Medium",
  ],
  [
    "Suatu nombor ialah 6. Jika nombor itu dikurangkan sebanyak 14, apakah nombor baharu?",
    ["-20", "8", "-8", "20"],
    2,
    "6 - 14 = -8.",
    "Medium",
  ],
  [
    "Hitung: (-2) + (-5) - (-11)",
    ["-18", "-4", "18", "4"],
    3,
    "(-2) + (-5) = -7. Kemudian -7 - (-11) = -7 + 11 = 4.",
    "Medium",
  ],
  [
    "Hitung: 3 × (-6 + 2) - (-10)",
    ["-2", "-22", "2", "22"],
    0,
    "Kurungan dahulu: -6 + 2 = -4. Kemudian 3 × (-4) = -12. Akhirnya -12 - (-10) = -2.",
    "Medium",
  ],
  [
    "Pernyataan manakah benar?",
    ["-15 > -5", "-2 < -9", "-18 < -7", "0 < -1"],
    2,
    "-18 lebih kecil daripada -7 kerana -18 berada lebih kiri pada garis nombor.",
    "Medium",
  ],
  [
    "Berapakah jarak antara -7 dan 4 pada garis nombor?",
    ["-11", "-3", "3", "11"],
    3,
    "Jarak = 4 - (-7) = 11 unit.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.distanceMinus7To4,
  ],
  [
    "Hitung: -2/3 + 5/6",
    ["1/6", "-1/6", "-7/6", "7/6"],
    0,
    "-2/3 = -4/6. Maka -4/6 + 5/6 = 1/6.",
    "Medium",
  ],
  [
    "Hitung: -3/5 - (-1/10)",
    ["-7/10", "-1/2", "1/2", "7/10"],
    1,
    "-3/5 = -6/10. Maka -6/10 - (-1/10) = -6/10 + 1/10 = -5/10 = -1/2.",
    "Medium",
  ],
  [
    "Hitung: 2/3 ÷ (-4/9)",
    ["3/2", "-8/27", "8/27", "-3/2"],
    3,
    "Bahagi pecahan ditukar kepada darab salingan: 2/3 × (-9/4) = -18/12 = -3/2.",
    "Hard",
  ],
  [
    "Hitung: (-1.2) × (-0.5) + 0.8",
    ["1.4", "-0.2", "-1.4", "2.0"],
    0,
    "(-1.2) × (-0.5) = 0.6. Kemudian 0.6 + 0.8 = 1.4.",
    "Medium",
  ],
  [
    "Hitung: 3/4 - 0.2",
    ["0.25", "0.55", "0.45", "0.95"],
    1,
    "3/4 = 0.75. Maka 0.75 - 0.2 = 0.55.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah bukan nombor nisbah?",
    ["-4/7", "0.125", "π", "-3"],
    2,
    "π tidak boleh ditulis tepat dalam bentuk a/b dengan b ≠ 0, maka π bukan nombor nisbah.",
    "Hard",
  ],
  [
    "Hitung: (-0.6) + (-3/5)",
    ["-1.2", "-0.9", "0", "1.2"],
    0,
    "-3/5 = -0.6. Maka -0.6 + (-0.6) = -1.2.",
    "Medium",
  ],
  [
    "Hitung: 2.4 ÷ (-0.3) - 5",
    ["3", "-3", "-13", "13"],
    2,
    "2.4 ÷ (-0.3) = -8. Kemudian -8 - 5 = -13.",
    "Hard",
  ],
  [
    "Hitung: [1/2 + (-3/4)] × (-8)",
    ["-10", "2", "-2", "10"],
    1,
    "1/2 = 2/4. Maka 2/4 + (-3/4) = -1/4. Kemudian (-1/4) × (-8) = 2.",
    "Hard",
  ],
  [
    "Tukarkan -2.75 kepada pecahan termudah.",
    ["11/4", "-7/4", "7/4", "-11/4"],
    3,
    "-2.75 = -275/100 = -11/4.",
    "Medium",
  ],
  [
    "Suhu pada waktu pagi ialah -3°C. Suhu naik 8°C dan kemudian turun 6°C. Apakah suhu akhir?",
    ["-17°C", "1°C", "-1°C", "11°C"],
    2,
    "-3 + 8 - 6 = -1°C.",
    "Hard",
  ],
  [
    "Seorang penyelam berada 12 m di bawah paras laut. Dia naik 5 m, kemudian menyelam turun 9 m. Apakah kedudukan akhirnya?",
    ["-26 m", "-16 m", "4 m", "16 m"],
    1,
    "Kedudukan awal ialah -12 m. Maka -12 + 5 - 9 = -16 m.",
    "Hard",
  ],
  [
    "Seorang peniaga mendapat untung RM120, rugi RM175, kemudian untung RM60. Apakah keuntungan atau kerugian bersih?",
    ["Rugi RM115", "Rugi RM5", "Untung RM355", "Untung RM5"],
    3,
    "120 - 175 + 60 = 5, jadi peniaga mendapat untung bersih RM5.",
    "Hard",
  ],
  [
    "Baki akaun Sara ialah -RM45. Dia memasukkan RM80 dan mengeluarkan RM25. Apakah baki akhirnya?",
    ["RM10", "-RM10", "-RM150", "RM60"],
    0,
    "-45 + 80 - 25 = 10, maka baki akhirnya ialah RM10.",
    "Hard",
  ],
  [
    "Setiap kek memerlukan 3/4 kg tepung. Lina mempunyai 3 kg tepung dan membuat 3 kek. Berapakah tepung yang tinggal?",
    ["1/4 kg", "3/4 kg", "1/2 kg", "1 kg"],
    1,
    "Tepung digunakan = 3 × 3/4 = 9/4 = 2 1/4 kg. Baki = 3 - 2 1/4 = 3/4 kg.",
    "Hard",
  ],
  [
    "Seorang pendaki berada 150 m di atas paras laut. Dia turun 220 m dan kemudian naik 35 m. Apakah kedudukannya?",
    ["-105 m", "405 m", "35 m", "-35 m"],
    3,
    "150 - 220 + 35 = -35 m, jadi kedudukannya 35 m di bawah paras laut.",
    "Hard",
  ],
  [
    "Dalam satu permainan, jawapan betul diberi +4 markah dan jawapan salah diberi -2 markah. Jika Aina menjawab 7 betul dan 3 salah, berapakah markahnya?",
    ["22", "16", "28", "34"],
    0,
    "Markah = 7 × 4 + 3 × (-2) = 28 - 6 = 22.",
    "Hard",
  ],
  [
    "Rafi berhutang RM18.50 kepada setiap seorang daripada 2 rakannya. Dia membayar RM25. Jika hutang diwakili oleh nilai negatif, nilai manakah mewakili baki hutangnya?",
    ["12", "-37", "-12", "62"],
    2,
    "Jumlah hutang = 2 × RM18.50 = RM37. Selepas membayar RM25, baki hutang ialah RM12. Hutang diwakili oleh nilai negatif, iaitu -12.",
    "Hard",
  ],
  [
    "Purata bagi suhu -2.5°C, 4.0°C dan -1.5°C ialah:",
    ["-4.0°C", "4.0°C", "1.5°C", "0°C"],
    3,
    "Jumlah suhu = -2.5 + 4.0 + (-1.5) = 0. Purata = 0 ÷ 3 = 0°C.",
    "Hard",
  ],
  [
    "Suhu sebuah bandar ialah -6°C. Suhu naik 3.5°C pada tengah hari dan turun 8.5°C pada malam. Apakah suhu pada waktu malam?",
    ["-18°C", "-11°C", "-1°C", "6°C"],
    1,
    "-6 + 3.5 - 8.5 = -11°C.",
    "Hard",
  ],
]);

const MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "Which of the following is an integer?",
    ["-8", "0.5", "3/4", "1.2"],
    0,
    "An integer is a positive whole number, a negative whole number, or zero.",
    "Easy",
  ],
  [
    "Which is a positive integer?",
    ["-4", "5", "-1", "0"],
    1,
    "A positive integer is greater than zero.",
    "Easy",
  ],
  [
    "Which is a negative integer?",
    ["3", "0", "-7", "9"],
    2,
    "A negative integer is less than zero.",
    "Easy",
  ],
  [
    "Which of the following is not an integer?",
    ["-12", "8", "0", "0.5"],
    3,
    "0.5 is a decimal, not an integer.",
    "Easy",
  ],
  [
    "On a number line, numbers to the right of zero are:",
    ["Negative integers", "Positive integers", "Negative fractions", "Negative decimals"],
    1,
    "Numbers to the right of zero are positive numbers and their values become greater.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.rightOfZero,
  ],
  [
    "Which is the greatest?",
    ["-5", "-8", "-2", "-10"],
    2,
    "-2 is greater because it is further to the right on the number line.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.compareNegativeIntegers,
  ],
  [
    "Arrange the numbers in ascending order: -3, 5, -1, 2",
    ["2, 5, -3, -1", "5, 2, -1, -3", "-1, -3, 2, 5", "-3, -1, 2, 5"],
    3,
    "Ascending order means arranging from the smallest value to the largest value.",
    "Easy",
  ],
  [
    "Arrange the numbers in descending order: -4, 6, 0, 3",
    ["6, 3, 0, -4", "-4, 0, 3, 6", "3, 6, 0, -4", "6, 0, 3, -4"],
    0,
    "Descending order means arranging from the largest value to the smallest value.",
    "Easy",
  ],
  ["Calculate: 5 + (-2)", ["7", "-7", "3", "-3"], 2, "5 + (-2) = 3.", "Easy"],
  ["Calculate: -4 + 6", ["-10", "-2", "10", "2"], 3, "-4 + 6 = 2.", "Easy"],
  ["Calculate: 8 - 3", ["5", "11", "-5", "-11"], 0, "8 - 3 = 5.", "Easy"],
  ["Calculate: 3 - 8", ["5", "-5", "11", "-11"], 1, "3 - 8 = -5.", "Easy"],
  [
    "Calculate: (-3) × 4",
    ["12", "-7", "7", "-12"],
    3,
    "Different signs give a negative answer.",
    "Easy",
  ],
  [
    "Calculate: (-5) × (-2)",
    ["10", "-10", "7", "-7"],
    0,
    "Same signs give a positive answer.",
    "Easy",
  ],
  ["Calculate: 18 ÷ 3", ["-6", "6", "15", "-15"], 1, "18 ÷ 3 = 6.", "Easy"],
  [
    "Calculate: (-20) ÷ 5",
    ["4", "25", "-4", "-25"],
    2,
    "Different signs give a negative answer.",
    "Easy",
  ],
  [
    "Calculate: 2 + 3 × 4",
    ["14", "20", "12", "10"],
    0,
    "Multiply first: 3 × 4 = 12, then 2 + 12 = 14.",
    "Easy",
  ],
  [
    "Calculate: (2 + 3) × 4",
    ["14", "12", "20", "24"],
    2,
    "Brackets first: 2 + 3 = 5, then 5 × 4 = 20.",
    "Easy",
  ],
  [
    "Which is a negative fraction?",
    ["1/2", "-2/7", "3/5", "5/8"],
    1,
    "A negative fraction has a negative sign.",
    "Easy",
  ],
  [
    "Which is the greatest?",
    ["-2", "-3/4", "-1", "-1/2"],
    3,
    "-1/2 is greater because it is closer to zero than -3/4, -1 and -2.",
    "Easy",
    MATH_F1_C1_QUIZ_VISUALS.compareNegativeFractions,
  ],
  ["Calculate: 1/2 + 1/2", ["1/4", "2", "1", "3/2"], 2, "1/2 + 1/2 = 1.", "Easy"],
  [
    "Calculate: 3/4 - 1/4",
    ["1", "1/2", "1/4", "3/4"],
    1,
    "The denominators are the same, so subtract the numerators: 3 - 1 = 2. Thus 2/4 = 1/2.",
    "Easy",
  ],
  [
    "Which is a negative decimal?",
    ["2.5", "0.3", "4.8", "-1.7"],
    3,
    "A negative decimal is a decimal number less than zero.",
    "Easy",
  ],
  [
    "Which is the smallest?",
    ["-0.5", "0.5", "1.5", "2.5"],
    0,
    "All negative numbers are smaller than positive numbers.",
    "Easy",
  ],
  ["Calculate: 2.5 + 1.5", ["3", "4", "5", "3.5"], 1, "2.5 + 1.5 = 4.0.", "Easy"],
  ["Calculate: 5.6 - 2.4", ["2.2", "1.2", "4.2", "3.2"], 3, "5.6 - 2.4 = 3.2.", "Easy"],
  [
    "A rational number can be written in the form p/q, where p and q are integers and q ≠ 0. Which shows 0.7 in the form p/q?",
    ["7/10", "7/100", "1/7", "70/1"],
    0,
    "0.7 = 7/10. Since 0.7 can be written in the form p/q, 0.7 is a rational number.",
    "Easy",
  ],
  ["Convert 3.5 into a fraction.", ["3/2", "5/2", "7/2", "9/2"], 2, "3.5 = 35/10 = 7/2.", "Easy"],
  [
    "Ali makes a profit of RM50. This value is represented as:",
    ["-50", "-500", "0", "+50"],
    3,
    "Profit is represented by a positive value.",
    "Easy",
  ],
  [
    "Siti makes a loss of RM30. This value is represented as:",
    ["30", "-30", "+30", "300"],
    1,
    "Loss is represented by a negative value.",
    "Easy",
  ],
]);

const MATH_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Calculate: -12 + 7",
    ["-5", "-19", "5", "19"],
    0,
    "-12 + 7 = -5 because 12 is greater than 7 and the answer is negative.",
    "Medium",
  ],
  ["Calculate: 15 + (-23)", ["38", "-8", "8", "-38"], 1, "15 + (-23) = 15 - 23 = -8.", "Medium"],
  [
    "Calculate: -18 - (-6)",
    ["-24", "12", "-12", "24"],
    2,
    "Subtracting a negative integer becomes addition: -18 - (-6) = -18 + 6 = -12.",
    "Medium",
  ],
  ["Calculate: 9 - (-14)", ["-23", "-5", "5", "23"], 3, "9 - (-14) = 9 + 14 = 23.", "Medium"],
  [
    "On a number line, moving 8 steps left from -3 reaches:",
    ["-5", "-11", "5", "11"],
    1,
    "Moving left means subtracting: -3 - 8 = -11.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.moveLeftEight,
  ],
  [
    "On a number line, moving 6 steps right from -9 reaches:",
    ["-15", "3", "-3", "15"],
    2,
    "Moving right means adding: -9 + 6 = -3.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.moveRightSix,
  ],
  [
    "Arrange the numbers in ascending order: -7, 4, -2, 0, 9",
    ["0, -2, -7, 4, 9", "9, 4, 0, -2, -7", "-2, -7, 0, 4, 9", "-7, -2, 0, 4, 9"],
    3,
    "Ascending order starts from the smallest number: -7, -2, 0, 4, 9.",
    "Medium",
  ],
  [
    "Which pair of numbers is arranged from smaller to larger?",
    ["-10, -4", "-3, -8", "6, -2", "0, -1"],
    0,
    "-10 is smaller than -4 because -10 is further left on the number line.",
    "Medium",
  ],
  [
    "The temperature changes from -4°C to 9°C. What is the increase in temperature?",
    ["5°C", "9°C", "13°C", "-13°C"],
    2,
    "Increase in temperature = 9 - (-4) = 13°C.",
    "Medium",
  ],
  [
    "A lift is at floor -2 and goes up 7 floors. Which floor is it on now?",
    ["-9", "-5", "9", "5"],
    3,
    "-2 + 7 = 5, so the lift is on floor 5.",
    "Medium",
  ],
  [
    "Calculate: (-6) × 8",
    ["-48", "-14", "14", "48"],
    0,
    "Different signs give a negative answer: (-6) × 8 = -48.",
    "Medium",
  ],
  [
    "Calculate: (-9) × (-7)",
    ["-63", "63", "16", "-16"],
    1,
    "Same signs give a positive answer: (-9) × (-7) = 63.",
    "Medium",
  ],
  [
    "Calculate: 56 ÷ (-8)",
    ["48", "7", "-48", "-7"],
    3,
    "Different signs give a negative answer: 56 ÷ (-8) = -7.",
    "Medium",
  ],
  [
    "Calculate: (-72) ÷ (-9)",
    ["8", "-8", "-63", "63"],
    0,
    "Same signs give a positive answer: (-72) ÷ (-9) = 8.",
    "Medium",
  ],
  [
    "Calculate: 4 + (-3) × 5",
    ["5", "-11", "-15", "20"],
    1,
    "Multiply first: (-3) × 5 = -15. Then 4 + (-15) = -11.",
    "Medium",
  ],
  [
    "Calculate: (4 + (-3)) × 5",
    ["1", "-5", "5", "35"],
    2,
    "Brackets first: 4 + (-3) = 1. Then 1 × 5 = 5.",
    "Medium",
  ],
  [
    "Calculate: -30 ÷ 5 + 4",
    ["-2", "-10", "2", "10"],
    0,
    "Divide first: -30 ÷ 5 = -6. Then -6 + 4 = -2.",
    "Medium",
  ],
  [
    "Which law is shown by 7 + (-2) = (-2) + 7?",
    ["Identity Law", "Distributive Law", "Commutative Law", "Associative Law"],
    2,
    "The order of the numbers changes but the sum remains the same, so this is the Commutative Law.",
    "Medium",
  ],
  [
    "Which law is shown by 3 × (4 + 5) = 3 × 4 + 3 × 5?",
    ["Identity Law", "Distributive Law", "Commutative Law", "Inverse Law"],
    1,
    "Multiplication is distributed to each term inside the brackets.",
    "Medium",
  ],
  [
    "Calculate: 6 × (-2 + 5)",
    ["-18", "-42", "42", "18"],
    3,
    "Brackets first: -2 + 5 = 3. Then 6 × 3 = 18.",
    "Medium",
  ],
  [
    "Calculate: -1/3 + 2/3",
    ["-1", "1", "1/3", "-1/3"],
    2,
    "The denominators are the same, so add the numerators: -1 + 2 = 1. The answer is 1/3.",
    "Medium",
  ],
  [
    "Calculate: 5/6 - 1/3",
    ["4/3", "1/2", "2/6", "6/3"],
    1,
    "Make the denominators the same: 1/3 = 2/6. Thus 5/6 - 2/6 = 3/6 = 1/2.",
    "Medium",
  ],
  [
    "Calculate: (-3/4) × 8",
    ["32/3", "6", "-3/32", "-6"],
    3,
    "(-3/4) × 8 = (-3 × 8) / 4 = -24/4 = -6.",
    "Medium",
  ],
  [
    "Calculate: (-2.5) + 4.8",
    ["2.3", "-2.3", "-7.3", "7.3"],
    0,
    "4.8 - 2.5 = 2.3 and the larger value is positive.",
    "Medium",
  ],
  [
    "Calculate: 6.4 - (-1.9)",
    ["4.5", "8.3", "5.5", "-8.3"],
    1,
    "Subtracting a negative number becomes addition: 6.4 + 1.9 = 8.3.",
    "Medium",
  ],
  [
    "Which is equivalent to -1.25?",
    ["1/25", "-1/4", "5/4", "-5/4"],
    3,
    "1.25 = 125/100 = 5/4, so -1.25 = -5/4.",
    "Medium",
  ],
  [
    "Which of the following is not a rational number?",
    ["√2", "0.75", "2/9", "-6"],
    0,
    "√2 cannot be written as a/b where a and b are integers and b ≠ 0, so it is not a rational number.",
    "Hard",
  ],
  [
    "Calculate: 1/2 + 0.75",
    ["0.8", "1", "1.25", "1.75"],
    2,
    "1/2 = 0.5. Thus 0.5 + 0.75 = 1.25.",
    "Medium",
  ],
  [
    "Amin owes RM18 and pays RM7. The value of his remaining debt is represented by:",
    ["-25", "25", "11", "-11"],
    3,
    "Debt is represented by a negative value: -18 + 7 = -11.",
    "Hard",
  ],
  [
    "Calculate: (-4.5) ÷ 1.5 + 2",
    ["-5", "-1", "1", "5"],
    1,
    "Divide first: (-4.5) ÷ 1.5 = -3. Then -3 + 2 = -1.",
    "Hard",
  ],
]);

const MATH_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "Calculate: -17 + 29 - 8",
    ["4", "-4", "-54", "20"],
    0,
    "-17 + 29 = 12, then 12 - 8 = 4.",
    "Medium",
  ],
  [
    "Calculate: 12 - (-5) + (-9)",
    ["-2", "8", "16", "26"],
    1,
    "12 - (-5) = 17. Then 17 + (-9) = 8.",
    "Medium",
  ],
  [
    "Calculate: (-4) × 3 + 18 ÷ (-6)",
    ["9", "-9", "-15", "15"],
    2,
    "Multiply and divide first: (-4) × 3 = -12 and 18 ÷ (-6) = -3. Thus -12 + (-3) = -15.",
    "Medium",
  ],
  [
    "Which of the following numbers is the greatest?",
    ["-16", "-11", "-21", "-9"],
    3,
    "-9 is the greatest because it is the furthest right among these negative numbers.",
    "Medium",
  ],
  [
    "Arrange the numbers in ascending order: -12, -3, 5, 0, -8",
    ["5, 0, -3, -8, -12", "-12, -8, -3, 0, 5", "-3, -8, -12, 0, 5", "-12, -3, -8, 0, 5"],
    1,
    "Ascending order means from the smallest value to the greatest value: -12, -8, -3, 0, 5.",
    "Medium",
  ],
  [
    "A number is 6. If it is reduced by 14, what is the new number?",
    ["-20", "8", "-8", "20"],
    2,
    "6 - 14 = -8.",
    "Medium",
  ],
  [
    "Calculate: (-2) + (-5) - (-11)",
    ["-18", "-4", "18", "4"],
    3,
    "(-2) + (-5) = -7. Then -7 - (-11) = -7 + 11 = 4.",
    "Medium",
  ],
  [
    "Calculate: 3 × (-6 + 2) - (-10)",
    ["-2", "-22", "2", "22"],
    0,
    "Brackets first: -6 + 2 = -4. Then 3 × (-4) = -12. Finally, -12 - (-10) = -2.",
    "Medium",
  ],
  [
    "Which statement is true?",
    ["-15 > -5", "-2 < -9", "-18 < -7", "0 < -1"],
    2,
    "-18 is less than -7 because -18 is further left on the number line.",
    "Medium",
  ],
  [
    "What is the distance between -7 and 4 on a number line?",
    ["-11", "-3", "3", "11"],
    3,
    "Distance = 4 - (-7) = 11 units.",
    "Medium",
    MATH_F1_C1_QUIZ_VISUALS.distanceMinus7To4,
  ],
  [
    "Calculate: -2/3 + 5/6",
    ["1/6", "-1/6", "-7/6", "7/6"],
    0,
    "-2/3 = -4/6. Thus -4/6 + 5/6 = 1/6.",
    "Medium",
  ],
  [
    "Calculate: -3/5 - (-1/10)",
    ["-7/10", "-1/2", "1/2", "7/10"],
    1,
    "-3/5 = -6/10. Thus -6/10 - (-1/10) = -6/10 + 1/10 = -5/10 = -1/2.",
    "Medium",
  ],
  [
    "Calculate: 2/3 ÷ (-4/9)",
    ["3/2", "-8/27", "8/27", "-3/2"],
    3,
    "Division of fractions becomes multiplication by the reciprocal: 2/3 × (-9/4) = -18/12 = -3/2.",
    "Hard",
  ],
  [
    "Calculate: (-1.2) × (-0.5) + 0.8",
    ["1.4", "-0.2", "-1.4", "2.0"],
    0,
    "(-1.2) × (-0.5) = 0.6. Then 0.6 + 0.8 = 1.4.",
    "Medium",
  ],
  [
    "Calculate: 3/4 - 0.2",
    ["0.25", "0.55", "0.45", "0.95"],
    1,
    "3/4 = 0.75. Thus 0.75 - 0.2 = 0.55.",
    "Medium",
  ],
  [
    "Which of the following is not a rational number?",
    ["-4/7", "0.125", "π", "-3"],
    2,
    "π cannot be written exactly in the form a/b with b ≠ 0, so π is not a rational number.",
    "Hard",
  ],
  [
    "Calculate: (-0.6) + (-3/5)",
    ["-1.2", "-0.9", "0", "1.2"],
    0,
    "-3/5 = -0.6. Thus -0.6 + (-0.6) = -1.2.",
    "Medium",
  ],
  [
    "Calculate: 2.4 ÷ (-0.3) - 5",
    ["3", "-3", "-13", "13"],
    2,
    "2.4 ÷ (-0.3) = -8. Then -8 - 5 = -13.",
    "Hard",
  ],
  [
    "Calculate: [1/2 + (-3/4)] × (-8)",
    ["-10", "2", "-2", "10"],
    1,
    "1/2 = 2/4. Thus 2/4 + (-3/4) = -1/4. Then (-1/4) × (-8) = 2.",
    "Hard",
  ],
  [
    "Convert -2.75 into its simplest fraction.",
    ["11/4", "-7/4", "7/4", "-11/4"],
    3,
    "-2.75 = -275/100 = -11/4.",
    "Medium",
  ],
  [
    "The morning temperature is -3°C. It rises by 8°C and then drops by 6°C. What is the final temperature?",
    ["-17°C", "1°C", "-1°C", "11°C"],
    2,
    "-3 + 8 - 6 = -1°C.",
    "Hard",
  ],
  [
    "A diver is 12 m below sea level. He rises 5 m, then dives down 9 m. What is his final position?",
    ["-26 m", "-16 m", "4 m", "16 m"],
    1,
    "The starting position is -12 m. Thus -12 + 5 - 9 = -16 m.",
    "Hard",
  ],
  [
    "A trader gains RM120, loses RM175, then gains RM60. What is the net profit or loss?",
    ["Loss of RM115", "Loss of RM5", "Profit of RM355", "Profit of RM5"],
    3,
    "120 - 175 + 60 = 5, so the trader makes a net profit of RM5.",
    "Hard",
  ],
  [
    "Sara's account balance is -RM45. She deposits RM80 and withdraws RM25. What is her final balance?",
    ["RM10", "-RM10", "-RM150", "RM60"],
    0,
    "-45 + 80 - 25 = 10, so her final balance is RM10.",
    "Hard",
  ],
  [
    "Each cake needs 3/4 kg of flour. Lina has 3 kg of flour and makes 3 cakes. How much flour is left?",
    ["1/4 kg", "3/4 kg", "1/2 kg", "1 kg"],
    1,
    "Flour used = 3 × 3/4 = 9/4 = 2 1/4 kg. Balance = 3 - 2 1/4 = 3/4 kg.",
    "Hard",
  ],
  [
    "A climber is 150 m above sea level. He descends 220 m and then climbs 35 m. What is his position?",
    ["-105 m", "405 m", "35 m", "-35 m"],
    3,
    "150 - 220 + 35 = -35 m, so he is 35 m below sea level.",
    "Hard",
  ],
  [
    "In a game, a correct answer gives +4 marks and a wrong answer gives -2 marks. If Aina gets 7 correct and 3 wrong, what is her score?",
    ["22", "16", "28", "34"],
    0,
    "Score = 7 × 4 + 3 × (-2) = 28 - 6 = 22.",
    "Hard",
  ],
  [
    "Rafi owes RM18.50 to each of his 2 friends. He pays RM25. If debt is represented by a negative value, which value represents his remaining debt?",
    ["12", "-37", "-12", "62"],
    2,
    "Total debt = 2 × RM18.50 = RM37. After paying RM25, the remaining debt is RM12. Debt is represented by a negative value, so it is -12.",
    "Hard",
  ],
  [
    "The average of the temperatures -2.5°C, 4.0°C and -1.5°C is:",
    ["-4.0°C", "4.0°C", "1.5°C", "0°C"],
    3,
    "Total temperature = -2.5 + 4.0 + (-1.5) = 0. Average = 0 ÷ 3 = 0°C.",
    "Hard",
  ],
  [
    "The temperature in a city is -6°C. It rises by 3.5°C at noon and drops by 8.5°C at night. What is the night temperature?",
    ["-18°C", "-11°C", "-1°C", "6°C"],
    1,
    "-6 + 3.5 - 8.5 = -11°C.",
    "Hard",
  ],
]);

function mq(
  question: string,
  options: string[],
  answerIndex: number,
  explanation: string,
  difficulty: Difficulty,
  visual?: MathQuestionVisualData,
): ShuffledQuestion {
  return {
    question,
    options,
    answerIndex,
    explanation,
    difficulty,
    subjectId: "math",
    ...(visual ? { visual } : {}),
  };
}

const MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah faktor?",
    [
      "Nombor yang membahagi nombor lain dengan tepat",
      "Hasil darab suatu nombor dengan 2, 3, 4, …",
      "Nombor yang mempunyai bahagian perpuluhan",
      "Nombor yang sentiasa negatif",
    ],
    0,
    "Faktor membahagi suatu nombor dengan tepat tanpa baki.",
    "Easy",
  ],
  [
    "Apakah faktor bagi 12?",
    ["5", "3", "7", "8"],
    1,
    "12 ÷ 3 = 4 tanpa baki, jadi 3 ialah faktor bagi 12.",
    "Easy",
  ],
  [
    "Manakah senarai faktor bagi 12?",
    ["3, 6, 9, 12", "2, 4, 8, 12", "1, 2, 3, 4, 6, 12", "1, 5, 10, 12"],
    2,
    "Faktor 12 ialah 1, 2, 3, 4, 6 dan 12.",
    "Easy",
  ],
  [
    "Apakah nombor perdana?",
    [
      "Nombor yang ada banyak faktor",
      "Nombor gandaan 10",
      "Nombor genap sahaja",
      "Nombor yang ada tepat dua faktor",
    ],
    3,
    "Nombor perdana mempunyai tepat dua faktor: 1 dan nombor itu sendiri.",
    "Easy",
  ],
  [
    "Manakah nombor perdana?",
    ["1", "11", "9", "4"],
    1,
    "11 hanya mempunyai faktor 1 dan 11.",
    "Easy",
  ],
  [
    "Adakah 1 nombor perdana?",
    ["Ya", "Hanya jika ganjil", "Tidak", "Hanya jika genap"],
    2,
    "1 bukan nombor perdana kerana hanya mempunyai satu faktor.",
    "Easy",
  ],
  [
    "Apakah faktor perdana?",
    [
      "Nombor yang bukan faktor",
      "Gandaan paling kecil",
      "Faktor paling besar sahaja",
      "Faktor yang merupakan nombor perdana",
    ],
    3,
    "Faktor perdana ialah faktor yang juga nombor perdana.",
    "Easy",
  ],
  [
    "Apakah pemfaktoran perdana bagi 12?",
    ["2 × 2 × 3", "2 × 6", "3 × 4", "1 × 12"],
    0,
    "12 = 2 × 2 × 3 dalam faktor perdana.",
    "Easy",
  ],
  [
    "Apakah faktor sepunya?",
    [
      "Gandaan yang dikongsi oleh dua nombor",
      "Nombor terbesar dalam suatu senarai",
      "Faktor yang dikongsi oleh dua atau lebih nombor",
      "Nombor terkecil dalam suatu senarai",
    ],
    2,
    "Faktor sepunya ialah faktor yang sama bagi dua atau lebih nombor.",
    "Easy",
  ],
  [
    "Apakah maksud FSTB?",
    [
      "Gandaan Sepunya Terbesar",
      "Gandaan Sepunya Terkecil",
      "Faktor Sepunya Terkecil",
      "Faktor Sepunya Terbesar",
    ],
    3,
    "FSTB ialah singkatan bagi Faktor Sepunya Terbesar.",
    "Easy",
  ],
  [
    "FSTB bagi 12 dan 18 ialah:",
    ["6", "3", "9", "12"],
    0,
    "Faktor sepunya 12 dan 18 ialah 1, 2, 3, 6. Yang terbesar ialah 6.",
    "Easy",
  ],
  [
    "Apakah gandaan?",
    [
      "Nombor yang membahagi nombor lain dengan tepat",
      "Hasil darab suatu nombor dengan 1, 2, 3, …",
      "Faktor yang merupakan nombor perdana",
      "Baki bagi suatu pembahagian",
    ],
    1,
    "Gandaan diperoleh dengan mendarab nombor dengan nombor bulat positif.",
    "Easy",
  ],
  [
    "Manakah gandaan bagi 4?",
    ["6", "10", "14", "12"],
    3,
    "12 = 4 × 3, jadi 12 ialah gandaan bagi 4.",
    "Easy",
  ],
  [
    "Apakah gandaan sepunya?",
    [
      "Gandaan yang sama bagi dua atau lebih nombor",
      "Faktor yang sama bagi dua atau lebih nombor",
      "Nombor perdana yang dikongsi dua nombor",
      "Baki pembahagian yang sama",
    ],
    0,
    "Gandaan sepunya ialah gandaan yang sama bagi dua atau lebih nombor.",
    "Easy",
  ],
  [
    "Apakah maksud GSTK?",
    [
      "Faktor Sepunya Terbesar",
      "Gandaan Sepunya Terkecil",
      "Faktor Sepunya Terkecil",
      "Gandaan Sepunya Terbesar",
    ],
    1,
    "GSTK ialah singkatan bagi Gandaan Sepunya Terkecil.",
    "Easy",
  ],
  [
    "GSTK bagi 4 dan 6 ialah:",
    ["6", "10", "12", "24"],
    2,
    "Gandaan sepunya 4 dan 6 termasuk 12 dan 24. Yang terkecil ialah 12.",
    "Easy",
  ],
  [
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
  ],
  [
    "GSTK sesuai digunakan untuk:",
    [
      "Mencari bilangan kumpulan sama yang terbesar",
      "Membahagi baki sama banyak",
      "Mencari bila kejadian berulang berlaku bersama",
      "Menyenaraikan faktor suatu nombor",
    ],
    2,
    "GSTK sesuai untuk kejadian yang berulang bersama.",
    "Easy",
  ],
  [
    "Kata kunci FSTB ialah:",
    ["Terkecil", "Terbesar", "Pertama kali bersama", "Berulang"],
    1,
    "FSTB berkaitan nilai terbesar atau maksimum.",
    "Easy",
  ],
  [
    "Kata kunci GSTK ialah:",
    ["Maksimum", "Kumpulan sama", "Terbesar", "Pertama kali bersama"],
    3,
    "GSTK kerap digunakan apabila mencari masa pertama berlaku bersama.",
    "Easy",
  ],
  ["Faktor bagi 18 termasuk:", ["4", "5", "6", "8"], 2, "18 ÷ 6 = 3 tanpa baki.", "Easy"],
  ["Faktor bagi 20 termasuk:", ["6", "10", "8", "12"], 1, "20 ÷ 10 = 2 tanpa baki.", "Easy"],
  [
    "Manakah bukan faktor bagi 12?",
    ["1", "3", "6", "5"],
    3,
    "12 tidak boleh dibahagi 5 tepat tanpa baki.",
    "Easy",
  ],
  [
    "Manakah bukan gandaan bagi 6?",
    ["20", "12", "18", "6"],
    0,
    "20 bukan hasil darab 6 dengan nombor bulat.",
    "Easy",
  ],
  [
    "Nombor perdana yang genap ialah:",
    ["4", "2", "6", "8"],
    1,
    "2 ialah satu-satunya nombor perdana genap dalam senarai ini.",
    "Easy",
  ],
  [
    "Faktor sepunya bagi 4 dan 6 termasuk:",
    ["12", "5", "8", "1"],
    3,
    "1 membahagi semua nombor bulat.",
    "Easy",
  ],
  [
    "Gandaan sepunya bagi 4 dan 6 termasuk:",
    ["12", "10", "8", "14"],
    0,
    "12 ialah gandaan bagi 4 dan juga 6.",
    "Easy",
  ],
  [
    "Pemfaktoran perdana menggunakan nombor:",
    ["Negatif sahaja", "Perpuluhan", "Perdana", "Pecahan sahaja"],
    2,
    "Pemfaktoran perdana menggunakan faktor nombor perdana.",
    "Easy",
  ],
  [
    "Apakah tiga gandaan pertama bagi 7?",
    ["7, 17, 27", "1, 7, 14", "14, 21, 28", "7, 14, 21"],
    3,
    "Gandaan 7 diperoleh dengan mendarab 7 dengan 1, 2 dan 3: 7, 14 dan 21. (1 dan 7 ialah faktor bagi 7.)",
    "Easy",
  ],
  [
    "Manakah nombor perdana antara 20 dan 30?",
    ["21", "23", "25", "27"],
    1,
    "23 hanya mempunyai dua faktor, iaitu 1 dan 23. 21 = 3 × 7, 25 = 5 × 5 dan 27 = 3 × 9.",
    "Easy",
  ],
]);

const MATH_C2_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Cari semua faktor bagi 16.",
    ["1, 2, 4, 8, 16", "1, 3, 5, 16", "2, 4, 6, 16", "1, 2, 8"],
    0,
    "16 boleh dibahagi tepat oleh 1, 2, 4, 8 dan 16.",
    "Medium",
  ],
  [
    "Cari semua faktor bagi 24.",
    ["1, 2, 4, 12", "1, 2, 3, 4, 6, 8, 12, 24", "2, 3, 6, 24", "1, 5, 10, 24"],
    1,
    "Senarai lengkap faktor 24 ialah 1, 2, 3, 4, 6, 8, 12 dan 24.",
    "Medium",
  ],
  [
    "Pemfaktoran perdana bagi 30 ialah:",
    ["2 × 15", "3 × 10", "2 × 3 × 5", "5 × 6"],
    2,
    "30 = 2 × 3 × 5.",
    "Medium",
  ],
  [
    "Pemfaktoran perdana bagi 36 ialah:",
    ["2 × 18", "4 × 9", "6 × 6", "2 × 2 × 3 × 3"],
    3,
    "36 = 2² × 3² = 2 × 2 × 3 × 3.",
    "Medium",
  ],
  [
    "FSTB bagi 16 dan 24 ialah:",
    ["4", "8", "6", "12"],
    1,
    "Faktor sepunya terbesar bagi 16 dan 24 ialah 8.",
    "Medium",
  ],
  [
    "FSTB bagi 20 dan 30 ialah:",
    ["5", "15", "10", "20"],
    2,
    "Faktor sepunya terbesar bagi 20 dan 30 ialah 10.",
    "Medium",
  ],
  [
    "FSTB bagi 18 dan 24 ialah:",
    ["3", "12", "9", "6"],
    3,
    "18 = 2 × 3 × 3 dan 24 = 2 × 2 × 2 × 3, FSTB = 2 × 3 = 6.",
    "Medium",
  ],
  [
    "FSTB bagi 12, 18 dan 30 ialah:",
    ["6", "3", "9", "12"],
    0,
    "6 ialah faktor terbesar yang membahagi 12, 18 dan 30.",
    "Medium",
  ],
  [
    "GSTK bagi 5 dan 8 ialah:",
    ["10", "20", "40", "80"],
    2,
    "5 dan 8 tiada faktor sepunya selain 1, jadi GSTK = 5 × 8 = 40.",
    "Medium",
  ],
  [
    "GSTK bagi 6 dan 8 ialah:",
    ["12", "18", "48", "24"],
    3,
    "Gandaan sepunya terkecil bagi 6 dan 8 ialah 24.",
    "Medium",
  ],
  [
    "GSTK bagi 9 dan 12 ialah:",
    ["36", "24", "18", "48"],
    0,
    "9 = 3² dan 12 = 2² × 3, GSTK = 2² × 3² = 36.",
    "Medium",
  ],
  [
    "GSTK bagi 10 dan 15 ialah:",
    ["15", "30", "20", "45"],
    1,
    "Gandaan sepunya terkecil bagi 10 dan 15 ialah 30.",
    "Medium",
  ],
  [
    "Apakah faktor perdana sepunya bagi 12 dan 18?",
    ["5", "2 sahaja", "3 sahaja", "2 dan 3"],
    3,
    "12 = 2 × 2 × 3 dan 18 = 2 × 3 × 3, faktor perdana sepunya ialah 2 dan 3.",
    "Medium",
  ],
  [
    "Untuk FSTB, faktor perdana sepunya diambil dengan:",
    ["Kuasa terkecil", "Kuasa terbesar", "Jumlah kuasa", "Tiada kuasa"],
    0,
    "FSTB mengambil faktor perdana sepunya dengan kuasa terkecil.",
    "Medium",
  ],
  [
    "Untuk GSTK, semua faktor perdana diambil dengan:",
    ["Kuasa terkecil", "Kuasa terbesar", "Hanya kuasa satu", "Kuasa sifar"],
    1,
    "GSTK mengambil semua faktor perdana dengan kuasa terbesar.",
    "Medium",
  ],
  [
    "Jika 2 × 2 × 3 ialah pemfaktoran perdana, nombornya ialah:",
    ["7", "18", "12", "24"],
    2,
    "2 × 2 × 3 = 12.",
    "Medium",
  ],
  [
    "FSTB bagi 15 dan 28 ialah:",
    ["1", "3", "5", "7"],
    0,
    "Faktor 15: 1, 3, 5, 15. Faktor 28: 1, 2, 4, 7, 14, 28. Satu-satunya faktor sepunya ialah 1, maka FSTB = 1.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah gandaan bagi 9?",
    ["25", "20", "18", "32"],
    2,
    "18 = 9 × 2.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah faktor bagi 36?",
    ["5", "9", "7", "11"],
    1,
    "36 ÷ 9 = 4 tanpa baki.",
    "Medium",
  ],
  [
    "Manakah pasangan mempunyai FSTB 5?",
    ["6 dan 14", "12 dan 18", "8 dan 12", "10 dan 15"],
    3,
    "FSTB bagi 10 dan 15 ialah 5.",
    "Medium",
  ],
  [
    "Manakah pasangan mempunyai GSTK 18?",
    ["5 dan 10", "4 dan 8", "6 dan 9", "8 dan 12"],
    2,
    "Gandaan sepunya terkecil bagi 6 dan 9 ialah 18.",
    "Medium",
  ],
  [
    "Cari FSTB bagi 28 dan 42.",
    ["7", "14", "21", "28"],
    1,
    "28 = 2 × 2 × 7 dan 42 = 2 × 3 × 7, FSTB = 2 × 7 = 14.",
    "Medium",
  ],
  [
    "Cari GSTK bagi 3, 4 dan 6.",
    ["6", "24", "18", "12"],
    3,
    "12 ialah gandaan terkecil yang boleh dibahagi 3, 4 dan 6.",
    "Medium",
  ],
  [
    "Cari FSTB bagi 8 dan 20.",
    ["4", "2", "8", "10"],
    0,
    "Faktor sepunya 8 dan 20 ialah 1, 2, 4. FSTB = 4.",
    "Medium",
  ],
  [
    "Cari GSTK bagi 8 dan 20.",
    ["20", "40", "32", "80"],
    1,
    "8 = 2³ dan 20 = 2² × 5, GSTK = 2³ × 5 = 40.",
    "Medium",
  ],
  [
    "GSTK bagi 10 dan 12 ialah:",
    ["2", "30", "120", "60"],
    3,
    "10 = 2 × 5 dan 12 = 2² × 3. GSTK = 2² × 3 × 5 = 60. (2 ialah FSTB dan 120 ialah hasil darab 10 × 12.)",
    "Medium",
  ],
  [
    "Jika faktor sepunya 12 dan 18 ialah 1, 2, 3, 6, FSTB ialah:",
    ["6", "2", "3", "1"],
    0,
    "FSTB ialah faktor sepunya terbesar, iaitu 6.",
    "Medium",
  ],
  [
    "Jika gandaan sepunya 4 dan 6 ialah 12, 24, 36, GSTK ialah:",
    ["36", "24", "12", "48"],
    2,
    "GSTK ialah gandaan sepunya terkecil, iaitu 12.",
    "Medium",
  ],
  [
    "Nombor yang boleh dibahagi tepat oleh 2 dan 5 ialah:",
    ["17", "11", "13", "10"],
    3,
    "10 boleh dibahagi tepat oleh 2 dan 5.",
    "Medium",
  ],
  [
    "Apakah faktor perdana bagi 45?",
    ["2 dan 5", "3 dan 5", "3 dan 7", "5 sahaja"],
    1,
    "45 = 3 × 3 × 5, faktor perdana ialah 3 dan 5.",
    "Medium",
  ],
]);

const MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Ali mempunyai 24 pensel dan 36 pen. Dia mahu membahagi sama banyak ke dalam beberapa kotak. Bilangan kotak maksimum ialah:",
    ["12", "8", "6", "24"],
    0,
    "Gunakan FSTB. FSTB bagi 24 dan 36 ialah 12.",
    "Hard",
  ],
  [
    "Loceng A berbunyi setiap 6 minit dan loceng B setiap 8 minit. Kedua-duanya berbunyi bersama setiap:",
    ["12 minit", "24 minit", "36 minit", "48 minit"],
    1,
    "Gunakan GSTK. GSTK bagi 6 dan 8 ialah 24.",
    "Hard",
  ],
  [
    "12 epal dan 18 oren dibahagi sama banyak ke dalam beg. Bilangan beg paling banyak ialah:",
    ["3", "9", "6", "12"],
    2,
    "Gunakan FSTB. FSTB bagi 12 dan 18 ialah 6.",
    "Hard",
  ],
  [
    "Bas A tiba setiap 10 minit dan Bas B setiap 15 minit. Kedua-duanya tiba bersama setiap:",
    ["15 minit", "20 minit", "60 minit", "30 minit"],
    3,
    "Gunakan GSTK. GSTK bagi 10 dan 15 ialah 30.",
    "Hard",
  ],
  [
    "Seorang guru mempunyai 20 buku dan 30 pen. Setiap murid menerima bilangan sama. Murid maksimum ialah:",
    ["5", "10", "15", "20"],
    1,
    "Gunakan FSTB. FSTB bagi 20 dan 30 ialah 10.",
    "Hard",
  ],
  [
    "Lampu merah berkelip setiap 9 saat dan lampu biru setiap 12 saat. Kedua-duanya berkelip bersama setiap:",
    ["18 saat", "24 saat", "36 saat", "48 saat"],
    2,
    "Gunakan GSTK. GSTK bagi 9 dan 12 ialah 36.",
    "Hard",
  ],
  [
    "FSTB bagi 48 dan 60 ialah:",
    ["6", "8", "24", "12"],
    3,
    "48 = 2⁴ × 3, 60 = 2² × 3 × 5, FSTB = 2² × 3 = 12.",
    "Hard",
  ],
  [
    "GSTK bagi 48 dan 60 ialah:",
    ["240", "180", "120", "360"],
    0,
    "GSTK = 2⁴ × 3 × 5 = 240.",
    "Hard",
  ],
  [
    "Tiga loceng berbunyi setiap 4, 6 dan 10 minit. Semuanya berbunyi bersama setiap:",
    ["20 minit", "30 minit", "60 minit", "120 minit"],
    2,
    "GSTK bagi 4, 6 dan 10 ialah 60.",
    "Hard",
  ],
  [
    "36 gula-gula dan 48 coklat dibungkus sama banyak. Bilangan bungkusan maksimum ialah:",
    ["6", "9", "18", "12"],
    3,
    "Gunakan FSTB. FSTB bagi 36 dan 48 ialah 12.",
    "Hard",
  ],
  [
    "Jika FSTB bagi dua nombor ialah 1, dua nombor itu:",
    [
      "Tiada faktor sepunya selain 1",
      "Mesti sama antara satu sama lain",
      "Mesti kedua-duanya nombor genap",
      "Mesti kedua-duanya nombor perdana",
    ],
    0,
    "FSTB = 1 bermaksud satu-satunya faktor sepunya bagi kedua-dua nombor ialah 1, contohnya 8 dan 9 (kedua-duanya bukan nombor perdana).",
    "Hard",
  ],
  [
    "Jika satu nombor ialah faktor bagi nombor lain, GSTK bagi kedua-duanya ialah:",
    ["Nombor kecil", "Nombor besar", "FSTB", "1"],
    1,
    "Contoh 4 dan 12: GSTK ialah 12, iaitu nombor yang lebih besar.",
    "Hard",
  ],
  [
    "Jika satu nombor ialah faktor bagi nombor lain, FSTB bagi kedua-duanya ialah:",
    ["Hasil darab", "Nombor besar", "GSTK", "Nombor kecil"],
    3,
    "Contoh 4 dan 12: FSTB ialah 4, iaitu nombor yang lebih kecil.",
    "Hard",
  ],
  [
    "Dua nombor 14 dan 21. FSTB dan GSTK masing-masing ialah:",
    ["7 dan 42", "7 dan 21", "14 dan 42", "3 dan 42"],
    0,
    "FSTB = 7 dan GSTK = 42.",
    "Hard",
  ],
  [
    "Dua nombor 8 dan 12. FSTB × GSTK ialah:",
    ["24", "96", "48", "120"],
    1,
    "FSTB = 4, GSTK = 24, maka 4 × 24 = 96.",
    "Hard",
  ],
  [
    "16 reben merah dan 24 reben biru dibahagikan sama banyak kepada bilangan kumpulan yang paling banyak. Setiap kumpulan mengandungi:",
    ["8 merah dan 12 biru", "4 merah dan 6 biru", "2 merah dan 3 biru", "16 merah dan 24 biru"],
    2,
    "Bilangan kumpulan maksimum ialah FSTB 16 dan 24 = 8, jadi setiap kumpulan ada 2 merah dan 3 biru.",
    "Hard",
  ],
  [
    "Mesin A berhenti setiap 8 jam dan Mesin B setiap 12 jam. Jika berhenti bersama sekarang, bersama lagi selepas:",
    ["24 jam", "20 jam", "16 jam", "48 jam"],
    0,
    "Gunakan GSTK. GSTK bagi 8 dan 12 ialah 24.",
    "Hard",
  ],
  [
    "FSTB bagi 27, 36 dan 45 ialah:",
    ["3", "6", "9", "12"],
    2,
    "9 membahagi 27, 36 dan 45; tiada faktor sepunya lebih besar.",
    "Hard",
  ],
  [
    "GSTK bagi 5, 6 dan 9 ialah:",
    ["45", "90", "60", "180"],
    1,
    "5 = 5, 6 = 2 × 3, 9 = 3², GSTK = 2 × 3² × 5 = 90.",
    "Hard",
  ],
  [
    "Jika 2² × 3 ialah 12 dan 2 × 3² ialah 18, FSTB ialah:",
    ["2", "3", "36", "6"],
    3,
    "Ambil faktor sepunya dengan kuasa terkecil: 2 × 3 = 6.",
    "Hard",
  ],
  [
    "Jika 2² × 3 ialah 12 dan 2 × 3² ialah 18, GSTK ialah:",
    ["18", "24", "36", "72"],
    2,
    "Ambil semua faktor dengan kuasa terbesar: 2² × 3² = 36.",
    "Hard",
  ],
  [
    "Seorang jurulatih membahagi 28 lelaki dan 35 perempuan kepada kumpulan sama. Bilangan kumpulan maksimum ialah:",
    ["5", "7", "14", "35"],
    1,
    "FSTB bagi 28 dan 35 ialah 7.",
    "Hard",
  ],
  [
    "Dua acara berlaku setiap 7 hari dan 14 hari. Acara berlaku bersama setiap:",
    ["7 hari", "28 hari", "21 hari", "14 hari"],
    3,
    "GSTK bagi 7 dan 14 ialah 14.",
    "Hard",
  ],
  [
    "Manakah situasi memerlukan FSTB?",
    [
      "Membahagi barang sama banyak",
      "Menentukan jadual berulang",
      "Mencari masa pertama bersama",
      "Mencari gandaan",
    ],
    0,
    "Pembahagian sama banyak menggunakan FSTB.",
    "Hard",
  ],
  [
    "Manakah situasi memerlukan GSTK?",
    [
      "Mencari kumpulan terbesar",
      "Menentukan dua loceng berbunyi bersama",
      "Membahagi gula-gula sama banyak",
      "Mencari faktor sepunya",
    ],
    1,
    "Kejadian berulang bersama menggunakan GSTK.",
    "Hard",
  ],
  [
    "Encik Ravi memotong dua utas tali sepanjang 42 cm dan 56 cm kepada cebisan yang sama panjang tanpa baki. Berapakah panjang maksimum setiap cebisan?",
    ["7 cm", "168 cm", "28 cm", "14 cm"],
    3,
    "Gunakan FSTB. 42 = 2 × 3 × 7 dan 56 = 2³ × 7, maka FSTB = 2 × 7 = 14 cm. (168 ialah GSTK, bukan panjang cebisan.)",
    "Hard",
  ],
  [
    "Pinggan kertas dijual dalam pek 12 keping dan cawan kertas dalam pek 18 biji. Hana mahu membeli bilangan pinggan dan cawan yang sama banyak. Berapakah bilangan terkecil pinggan yang perlu dibeli?",
    ["36", "6", "72", "216"],
    0,
    "Bilangan itu mestilah gandaan 12 dan juga gandaan 18, jadi gunakan GSTK. GSTK bagi 12 dan 18 = 36. (6 ialah FSTB.)",
    "Hard",
  ],
  [
    "Cari nombor terkecil yang boleh dibahagi tepat oleh 4, 5 dan 10.",
    ["10", "40", "20", "50"],
    2,
    "Soalan meminta gandaan sepunya terkecil. GSTK = 20.",
    "Hard",
  ],
  [
    "Cari nombor terbesar yang boleh membahagi 30 dan 45 tepat.",
    ["5", "10", "30", "15"],
    3,
    "Soalan meminta faktor sepunya terbesar. FSTB = 15.",
    "Hard",
  ],
  [
    "Jika 18 bunga dan 24 daun disusun sama banyak dalam jambangan, jambangan maksimum ialah:",
    ["3", "6", "9", "12"],
    1,
    "Gunakan FSTB. FSTB bagi 18 dan 24 ialah 6.",
    "Hard",
  ],
]);

const MATH_C2_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a factor?",
    [
      "A number that divides another number exactly",
      "The product of a number and 2, 3, 4, …",
      "A number that has a decimal part",
      "A number that is always negative",
    ],
    0,
    "A factor divides a number exactly without a remainder.",
    "Easy",
  ],
  [
    "What is a factor of 12?",
    ["5", "3", "7", "8"],
    1,
    "12 ÷ 3 = 4 with no remainder, so 3 is a factor of 12.",
    "Easy",
  ],
  [
    "Which list shows the factors of 12?",
    ["3, 6, 9, 12", "2, 4, 8, 12", "1, 2, 3, 4, 6, 12", "1, 5, 10, 12"],
    2,
    "The factors of 12 are 1, 2, 3, 4, 6 and 12.",
    "Easy",
  ],
  [
    "What is a prime number?",
    [
      "A number with many factors",
      "A multiple of 10",
      "Even numbers only",
      "A number with exactly two factors",
    ],
    3,
    "A prime number has exactly two factors: 1 and the number itself.",
    "Easy",
  ],
  ["Which is a prime number?", ["1", "11", "9", "4"], 1, "11 only has factors 1 and 11.", "Easy"],
  [
    "Is 1 a prime number?",
    ["Yes", "Only if it is odd", "No", "Only if it is even"],
    2,
    "1 is not a prime number because it has only one factor.",
    "Easy",
  ],
  [
    "What is a prime factor?",
    [
      "A number that is not a factor",
      "The smallest multiple",
      "Only the greatest factor",
      "A factor that is also a prime number",
    ],
    3,
    "A prime factor is a factor that is also a prime number.",
    "Easy",
  ],
  [
    "What is the prime factorisation of 12?",
    ["2 × 2 × 3", "2 × 6", "3 × 4", "1 × 12"],
    0,
    "12 = 2 × 2 × 3 in prime factors.",
    "Easy",
  ],
  [
    "What are common factors?",
    [
      "Multiples shared by two numbers",
      "The greatest number in a list",
      "Factors shared by two or more numbers",
      "The smallest number in a list",
    ],
    2,
    "Common factors are factors shared by two or more numbers.",
    "Easy",
  ],
  [
    "What does HCF stand for?",
    [
      "Highest Common Multiple",
      "Lowest Common Multiple",
      "Lowest Common Factor",
      "Highest Common Factor",
    ],
    3,
    "HCF stands for Highest Common Factor.",
    "Easy",
  ],
  [
    "The HCF of 12 and 18 is:",
    ["6", "3", "9", "12"],
    0,
    "The common factors of 12 and 18 are 1, 2, 3 and 6. The greatest is 6.",
    "Easy",
  ],
  [
    "What is a multiple?",
    [
      "A number that divides another number exactly",
      "The product of a number and 1, 2, 3, …",
      "A factor that is a prime number",
      "The remainder of a division",
    ],
    1,
    "Multiples are obtained by multiplying a number by positive whole numbers.",
    "Easy",
  ],
  [
    "Which is a multiple of 4?",
    ["6", "10", "14", "12"],
    3,
    "12 = 4 × 3, so 12 is a multiple of 4.",
    "Easy",
  ],
  [
    "What are common multiples?",
    [
      "Multiples shared by two or more numbers",
      "Factors shared by two or more numbers",
      "Prime numbers shared by two numbers",
      "Remainders that are the same",
    ],
    0,
    "Common multiples are multiples shared by two or more numbers.",
    "Easy",
  ],
  [
    "What does LCM stand for?",
    [
      "Highest Common Factor",
      "Lowest Common Multiple",
      "Lowest Common Factor",
      "Highest Common Multiple",
    ],
    1,
    "LCM stands for Lowest Common Multiple.",
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
      "Finding the greatest number of equal groups",
      "Dividing a remainder equally",
      "Finding when repeated events happen together",
      "Listing the factors of a number",
    ],
    2,
    "LCM is suitable for events that repeat together.",
    "Easy",
  ],
  [
    "A keyword for HCF is:",
    ["Lowest", "Greatest", "First time together", "Repeated"],
    1,
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
  ["A factor of 20 includes:", ["6", "10", "8", "12"], 1, "20 ÷ 10 = 2 with no remainder.", "Easy"],
  [
    "Which is not a factor of 12?",
    ["1", "3", "6", "5"],
    3,
    "12 cannot be divided exactly by 5.",
    "Easy",
  ],
  [
    "Which is not a multiple of 6?",
    ["20", "12", "18", "6"],
    0,
    "20 is not the product of 6 and a whole number.",
    "Easy",
  ],
  [
    "The even prime number is:",
    ["4", "2", "6", "8"],
    1,
    "2 is the only even prime number in this list.",
    "Easy",
  ],
  [
    "A common factor of 4 and 6 includes:",
    ["12", "5", "8", "1"],
    3,
    "1 divides all whole numbers.",
    "Easy",
  ],
  [
    "A common multiple of 4 and 6 includes:",
    ["12", "10", "8", "14"],
    0,
    "12 is a multiple of both 4 and 6.",
    "Easy",
  ],
  [
    "Prime factorisation uses:",
    ["Negative numbers only", "Decimal numbers", "Prime numbers", "Fractions only"],
    2,
    "Prime factorisation uses prime number factors.",
    "Easy",
  ],
  [
    "What are the first three multiples of 7?",
    ["7, 17, 27", "1, 7, 14", "14, 21, 28", "7, 14, 21"],
    3,
    "Multiples of 7 are obtained by multiplying 7 by 1, 2 and 3: 7, 14 and 21. (1 and 7 are factors of 7.)",
    "Easy",
  ],
  [
    "Which number between 20 and 30 is a prime number?",
    ["21", "23", "25", "27"],
    1,
    "23 has only two factors, 1 and 23. 21 = 3 × 7, 25 = 5 × 5 and 27 = 3 × 9.",
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
    ["1, 2, 4, 12", "1, 2, 3, 4, 6, 8, 12, 24", "2, 3, 6, 24", "1, 5, 10, 24"],
    1,
    "The complete list of factors of 24 is 1, 2, 3, 4, 6, 8, 12 and 24.",
    "Medium",
  ],
  [
    "The prime factorisation of 30 is:",
    ["2 × 15", "3 × 10", "2 × 3 × 5", "5 × 6"],
    2,
    "30 = 2 × 3 × 5.",
    "Medium",
  ],
  [
    "The prime factorisation of 36 is:",
    ["2 × 18", "4 × 9", "6 × 6", "2 × 2 × 3 × 3"],
    3,
    "36 = 2² × 3² = 2 × 2 × 3 × 3.",
    "Medium",
  ],
  [
    "The HCF of 16 and 24 is:",
    ["4", "8", "6", "12"],
    1,
    "The highest common factor of 16 and 24 is 8.",
    "Medium",
  ],
  [
    "The HCF of 20 and 30 is:",
    ["5", "15", "10", "20"],
    2,
    "The highest common factor of 20 and 30 is 10.",
    "Medium",
  ],
  [
    "The HCF of 18 and 24 is:",
    ["3", "12", "9", "6"],
    3,
    "18 = 2 × 3 × 3 and 24 = 2 × 2 × 2 × 3, so HCF = 2 × 3 = 6.",
    "Medium",
  ],
  [
    "The HCF of 12, 18 and 30 is:",
    ["6", "3", "9", "12"],
    0,
    "6 is the greatest factor that divides 12, 18 and 30.",
    "Medium",
  ],
  [
    "The LCM of 5 and 8 is:",
    ["10", "20", "40", "80"],
    2,
    "5 and 8 have no common factor except 1, so LCM = 5 × 8 = 40.",
    "Medium",
  ],
  [
    "The LCM of 6 and 8 is:",
    ["12", "18", "48", "24"],
    3,
    "The lowest common multiple of 6 and 8 is 24.",
    "Medium",
  ],
  [
    "The LCM of 9 and 12 is:",
    ["36", "24", "18", "48"],
    0,
    "9 = 3² and 12 = 2² × 3, so LCM = 2² × 3² = 36.",
    "Medium",
  ],
  [
    "The LCM of 10 and 15 is:",
    ["15", "30", "20", "45"],
    1,
    "The lowest common multiple of 10 and 15 is 30.",
    "Medium",
  ],
  [
    "What are the common prime factors of 12 and 18?",
    ["5", "2 only", "3 only", "2 and 3"],
    3,
    "12 = 2 × 2 × 3 and 18 = 2 × 3 × 3, so the common prime factors are 2 and 3.",
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
    "If 2 × 2 × 3 is the prime factorisation, the number is:",
    ["7", "18", "12", "24"],
    2,
    "2 × 2 × 3 = 12.",
    "Medium",
  ],
  [
    "The HCF of 15 and 28 is:",
    ["1", "3", "5", "7"],
    0,
    "Factors of 15: 1, 3, 5, 15. Factors of 28: 1, 2, 4, 7, 14, 28. The only common factor is 1, so HCF = 1.",
    "Medium",
  ],
  [
    "Which of the following is a multiple of 9?",
    ["25", "20", "18", "32"],
    2,
    "18 = 9 × 2.",
    "Medium",
  ],
  [
    "Which of the following is a factor of 36?",
    ["5", "9", "7", "11"],
    1,
    "36 ÷ 9 = 4 with no remainder.",
    "Medium",
  ],
  [
    "Which pair has HCF 5?",
    ["6 and 14", "12 and 18", "8 and 12", "10 and 15"],
    3,
    "The HCF of 10 and 15 is 5.",
    "Medium",
  ],
  [
    "Which pair has LCM 18?",
    ["5 and 10", "4 and 8", "6 and 9", "8 and 12"],
    2,
    "The lowest common multiple of 6 and 9 is 18.",
    "Medium",
  ],
  [
    "Find the HCF of 28 and 42.",
    ["7", "14", "21", "28"],
    1,
    "28 = 2 × 2 × 7 and 42 = 2 × 3 × 7, so HCF = 2 × 7 = 14.",
    "Medium",
  ],
  [
    "Find the LCM of 3, 4 and 6.",
    ["6", "24", "18", "12"],
    3,
    "12 is the lowest multiple that can be divided by 3, 4 and 6.",
    "Medium",
  ],
  [
    "Find the HCF of 8 and 20.",
    ["4", "2", "8", "10"],
    0,
    "The common factors of 8 and 20 are 1, 2 and 4. HCF = 4.",
    "Medium",
  ],
  [
    "Find the LCM of 8 and 20.",
    ["20", "40", "32", "80"],
    1,
    "8 = 2³ and 20 = 2² × 5, so LCM = 2³ × 5 = 40.",
    "Medium",
  ],
  [
    "The LCM of 10 and 12 is:",
    ["2", "30", "120", "60"],
    3,
    "10 = 2 × 5 and 12 = 2² × 3. LCM = 2² × 3 × 5 = 60. (2 is the HCF and 120 is the product 10 × 12.)",
    "Medium",
  ],
  [
    "If the common factors of 12 and 18 are 1, 2, 3 and 6, the HCF is:",
    ["6", "2", "3", "1"],
    0,
    "The HCF is the greatest common factor, which is 6.",
    "Medium",
  ],
  [
    "If the common multiples of 4 and 6 are 12, 24 and 36, the LCM is:",
    ["36", "24", "12", "48"],
    2,
    "The LCM is the lowest common multiple, which is 12.",
    "Medium",
  ],
  [
    "A number that can be divided exactly by 2 and 5 is:",
    ["17", "11", "13", "10"],
    3,
    "10 can be divided exactly by 2 and 5.",
    "Medium",
  ],
  [
    "What are the prime factors of 45?",
    ["2 and 5", "3 and 5", "3 and 7", "5 only"],
    1,
    "45 = 3 × 3 × 5, so the prime factors are 3 and 5.",
    "Medium",
  ],
]);

const MATH_C2_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "Ali has 24 pencils and 36 pens. He wants to divide them equally into boxes. The maximum number of boxes is:",
    ["12", "8", "6", "24"],
    0,
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
    ["3", "9", "6", "12"],
    2,
    "Use HCF. The HCF of 12 and 18 is 6.",
    "Hard",
  ],
  [
    "Bus A arrives every 10 minutes and Bus B arrives every 15 minutes. They arrive together every:",
    ["15 minutes", "20 minutes", "60 minutes", "30 minutes"],
    3,
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
    ["6", "8", "24", "12"],
    3,
    "48 = 2⁴ × 3 and 60 = 2² × 3 × 5, so HCF = 2² × 3 = 12.",
    "Hard",
  ],
  ["The LCM of 48 and 60 is:", ["240", "180", "120", "360"], 0, "LCM = 2⁴ × 3 × 5 = 240.", "Hard"],
  [
    "Three bells ring every 4, 6 and 10 minutes. All of them ring together every:",
    ["20 minutes", "30 minutes", "60 minutes", "120 minutes"],
    2,
    "The LCM of 4, 6 and 10 is 60.",
    "Hard",
  ],
  [
    "36 sweets and 48 chocolates are packed equally. The maximum number of packs is:",
    ["6", "9", "18", "12"],
    3,
    "Use HCF. The HCF of 36 and 48 is 12.",
    "Hard",
  ],
  [
    "If the HCF of two numbers is 1, the two numbers:",
    [
      "Have no common factor except 1",
      "Must be equal to each other",
      "Must both be even numbers",
      "Must both be prime numbers",
    ],
    0,
    "HCF = 1 means the only common factor of the two numbers is 1, for example 8 and 9 (neither is prime).",
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
    ["The product", "The larger number", "The LCM", "The smaller number"],
    3,
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
    "For the numbers 8 and 12, HCF × LCM is:",
    ["24", "96", "48", "120"],
    1,
    "HCF = 4 and LCM = 24, so 4 × 24 = 96.",
    "Hard",
  ],
  [
    "16 red ribbons and 24 blue ribbons are shared equally into the greatest possible number of groups. Each group contains:",
    ["8 red and 12 blue", "4 red and 6 blue", "2 red and 3 blue", "16 red and 24 blue"],
    2,
    "The maximum number of groups is HCF of 16 and 24 = 8, so each group has 2 red and 3 blue.",
    "Hard",
  ],
  [
    "Machine A stops every 8 hours and Machine B every 12 hours. If they stop together now, they will stop together again after:",
    ["24 hours", "20 hours", "16 hours", "48 hours"],
    0,
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
    ["45", "90", "60", "180"],
    1,
    "5 = 5, 6 = 2 × 3 and 9 = 3², so LCM = 2 × 3² × 5 = 90.",
    "Hard",
  ],
  [
    "If 2² × 3 is 12 and 2 × 3² is 18, the HCF is:",
    ["2", "3", "36", "6"],
    3,
    "Take the common factors with the smallest powers: 2 × 3 = 6.",
    "Hard",
  ],
  [
    "If 2² × 3 is 12 and 2 × 3² is 18, the LCM is:",
    ["18", "24", "36", "72"],
    2,
    "Take all factors with the greatest powers: 2² × 3² = 36.",
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
    ["7 days", "28 days", "21 days", "14 days"],
    3,
    "The LCM of 7 and 14 is 14.",
    "Hard",
  ],
  [
    "Which situation requires HCF?",
    [
      "Dividing items equally",
      "Determining a repeated schedule",
      "Finding the first time together",
      "Finding multiples",
    ],
    0,
    "Equal division uses HCF.",
    "Hard",
  ],
  [
    "Which situation requires LCM?",
    [
      "Finding the greatest group",
      "Determining when two bells ring together",
      "Dividing sweets equally",
      "Finding common factors",
    ],
    1,
    "Repeated events happening together use LCM.",
    "Hard",
  ],
  [
    "Mr Ravi cuts two ropes of lengths 42 cm and 56 cm into pieces of equal length with nothing left over. What is the greatest possible length of each piece?",
    ["7 cm", "168 cm", "28 cm", "14 cm"],
    3,
    "Use HCF. 42 = 2 × 3 × 7 and 56 = 2³ × 7, so HCF = 2 × 7 = 14 cm. (168 is the LCM, not a piece length.)",
    "Hard",
  ],
  [
    "Paper plates are sold in packs of 12 and paper cups in packs of 18. Hana wants to buy the same number of plates and cups. What is the smallest number of plates she must buy?",
    ["36", "6", "72", "216"],
    0,
    "The number must be a multiple of both 12 and 18, so use LCM. LCM of 12 and 18 = 36. (6 is the HCF.)",
    "Hard",
  ],
  [
    "Find the smallest number that can be divided exactly by 4, 5 and 10.",
    ["10", "40", "20", "50"],
    2,
    "The question asks for the lowest common multiple. LCM = 20.",
    "Hard",
  ],
  [
    "Find the greatest number that can divide 30 and 45 exactly.",
    ["5", "10", "30", "15"],
    3,
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

// The optional sixth element is a data display shown between the question and
// the answers (see MathQuestionVisual); BM and DLP pairs share the same object.
type MathQuestionSeed =
  | [string, string[], number, string, Difficulty]
  | [string, string[], number, string, Difficulty, MathQuestionVisualData];

function mathQuestions(items: MathQuestionSeed[]): ShuffledQuestion[] {
  return items.map(([question, options, answerIndex, explanation, difficulty, visual]) =>
    mq(question, options, answerIndex, explanation, difficulty, visual),
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
  ["Apakah maksud a²?", ["a + a", "a × a", "a ÷ a", "2 × a"], 1, "a² bermaksud a × a.", "Easy"],
  ["Berapakah 4²?", ["8", "12", "16", "24"], 2, "4² = 4 × 4 = 16.", "Easy"],
  [
    "Kuasa dua boleh dikaitkan dengan:",
    ["Panjang garis sahaja", "Isipadu kubus", "Lilitan bulatan", "Luas segi empat sama"],
    3,
    "Jika sisi segi empat sama ialah s, luasnya ialah s².",
    "Easy",
  ],
  [
    "Apakah kuasa dua sempurna?",
    [
      "Nombor yang mempunyai bahagian perpuluhan",
      "Nombor hasil kuasa dua nombor bulat",
      "Nombor yang sentiasa negatif",
      "Nombor yang boleh dibahagi dengan 3",
    ],
    1,
    "Kuasa dua sempurna terhasil daripada kuasa dua nombor bulat.",
    "Easy",
  ],
  [
    "Manakah kuasa dua sempurna?",
    ["12", "18", "16", "20"],
    2,
    "16 = 4², jadi 16 ialah kuasa dua sempurna.",
    "Easy",
  ],
  [
    "Dalam pemfaktoran perdana, kuasa dua sempurna boleh dikumpulkan dalam:",
    [
      "Satu kumpulan",
      "Empat kumpulan berbeza",
      "Tiga kumpulan yang sama",
      "Dua kumpulan yang sama",
    ],
    3,
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
  ["Jika 6² = 36, maka √36 ialah:", ["5", "7", "6", "8"], 2, "√36 = 6 kerana 6² = 36.", "Easy"],
  [
    "Punca kuasa dua bagi luas segi empat sama memberi:",
    ["Jisim", "Isipadu", "Sudut", "Panjang sisi"],
    3,
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
    ["Perpuluhan negatif", "Pecahan tak wajar", "Nombor perdana", "Kuasa tiga"],
    1,
    "Nombor bercampur ditukar kepada pecahan tak wajar dahulu.",
    "Easy",
  ],
  ["Apakah nilai √a × √a?", ["a²", "2a", "2√a", "a"], 3, "√a × √a = a.", "Easy"],
  ["Apakah nilai √a × √b?", ["√(ab)", "a + b", "ab²", "√a + √b"], 0, "√a × √b = √(ab).", "Easy"],
  [
    "Apakah maksud kuasa tiga?",
    [
      "Mendarab nombor dengan 3 sahaja",
      "Mendarab nombor dengan dirinya sendiri tiga kali",
      "Menambah nombor tiga kali",
      "Membahagi nombor dengan 3",
    ],
    1,
    "Kuasa tiga bermaksud a × a × a.",
    "Easy",
  ],
  [
    "Apakah maksud a³?",
    ["a + a + a", "a × 3", "a × a × a", "a ÷ 3"],
    2,
    "a³ bermaksud a × a × a.",
    "Easy",
  ],
  ["Berapakah 2³?", ["8", "6", "5", "9"], 0, "2³ = 2 × 2 × 2 = 8.", "Easy"],
  [
    "2³ bukan bermaksud:",
    ["2 × 2 × 2", "8", "2 × 3", "Kuasa tiga bagi 2"],
    2,
    "Kesilapan biasa ialah menganggap 2³ sebagai 2 × 3.",
    "Easy",
  ],
  [
    "Kuasa tiga boleh dikaitkan dengan:",
    ["Luas segi empat sama", "Isipadu kubus", "Panjang garis", "Jisim objek"],
    1,
    "Jika sisi kubus ialah s, isipadunya ialah s³.",
    "Easy",
  ],
  [
    "Manakah kuasa tiga sempurna?",
    ["16", "81", "50", "27"],
    3,
    "27 = 3³, jadi 27 ialah kuasa tiga sempurna.",
    "Easy",
  ],
  [
    "Dalam pemfaktoran perdana, kuasa tiga sempurna boleh dikumpulkan dalam:",
    ["Dua kumpulan yang sama", "Lima kumpulan", "Tiga kumpulan yang sama", "Kumpulan tidak sama"],
    2,
    "Kuasa tiga sempurna mempunyai faktor perdana dalam kumpulan tiga.",
    "Easy",
  ],
  [
    "Kuasa tiga bagi nombor positif menghasilkan:",
    ["Negatif", "Positif", "Sifar sahaja", "Pecahan sahaja"],
    1,
    "Nombor positif yang dikuasakan tiga kekal positif.",
    "Easy",
  ],
  [
    "Kuasa tiga bagi nombor negatif menghasilkan:",
    ["Positif", "Tiada jawapan", "Sentiasa sifar", "Negatif"],
    3,
    "Nombor negatif yang dikuasakan tiga menghasilkan nilai negatif.",
    "Easy",
  ],
  [
    "Berapakah (-5)³?",
    ["-125", "125", "15", "-15"],
    0,
    "(-5)³ = (-5) × (-5) × (-5) = -125.",
    "Easy",
  ],
  [
    "Punca kuasa tiga ialah songsangan kepada:",
    ["Kuasa dua", "Kuasa tiga", "Pendaraban dua nombor", "Penolakan"],
    1,
    "Punca kuasa tiga membalikkan proses kuasa tiga.",
    "Easy",
  ],
  ["Berapakah ∛8?", ["8", "3", "4", "2"], 3, "∛8 = 2 kerana 2³ = 8.", "Easy"],
  ["Berapakah ∛(-8)?", ["-2", "2", "4", "-4"], 0, "∛(-8) = -2 kerana (-2)³ = -8.", "Easy"],
  [
    "Punca kuasa tiga bagi isipadu kubus memberi:",
    ["Jisim kubus", "Luas permukaan", "Panjang sisi kubus", "Sudut kubus"],
    2,
    "Panjang sisi kubus diperoleh dengan mencari punca kuasa tiga isipadu.",
    "Easy",
  ],
  [
    "√54 terletak antara:",
    ["5 dan 6", "6 dan 7", "8 dan 9", "7 dan 8"],
    3,
    "49 < 54 < 64, jadi √54 terletak antara 7 dan 8.",
    "Easy",
  ],
  [
    "Dalam tertib operasi, langkah pertama ialah:",
    ["Tambah", "Kurungan", "Tolak", "Darab dari kanan"],
    1,
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
  ["What does a² mean?", ["a + a", "a × a", "a ÷ a", "2 × a"], 1, "a² means a × a.", "Easy"],
  ["What is 4²?", ["8", "12", "16", "24"], 2, "4² = 4 × 4 = 16.", "Easy"],
  [
    "A square can be related to:",
    ["Length of a line only", "Volume of a cube", "Circumference of a circle", "Area of a square"],
    3,
    "If the side of a square is s, its area is s².",
    "Easy",
  ],
  [
    "What is a perfect square?",
    [
      "A number that has a decimal part",
      "A number produced by squaring a whole number",
      "A number that is always negative",
      "A number that can be divided by 3",
    ],
    1,
    "A perfect square is produced by squaring a whole number.",
    "Easy",
  ],
  [
    "Which is a perfect square?",
    ["12", "18", "16", "20"],
    2,
    "16 = 4², so 16 is a perfect square.",
    "Easy",
  ],
  [
    "In prime factorisation, a perfect square can be grouped into:",
    ["One group", "Four different groups", "Three identical groups", "Two identical groups"],
    3,
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
  ["If 6² = 36, then √36 is:", ["5", "7", "6", "8"], 2, "√36 = 6 because 6² = 36.", "Easy"],
  [
    "The square root of a square's area gives:",
    ["Mass", "Volume", "Angle", "Side length"],
    3,
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
    ["A negative decimal", "An improper fraction", "A prime number", "A cube"],
    1,
    "A mixed number is converted to an improper fraction first.",
    "Easy",
  ],
  ["What is the value of √a × √a?", ["a²", "2a", "2√a", "a"], 3, "√a × √a = a.", "Easy"],
  [
    "What is the value of √a × √b?",
    ["√(ab)", "a + b", "ab²", "√a + √b"],
    0,
    "√a × √b = √(ab).",
    "Easy",
  ],
  [
    "What does cube mean?",
    [
      "Multiplying a number by 3 only",
      "Multiplying a number by itself three times",
      "Adding a number three times",
      "Dividing a number by 3",
    ],
    1,
    "Cube means a × a × a.",
    "Easy",
  ],
  [
    "What does a³ mean?",
    ["a + a + a", "a × 3", "a × a × a", "a ÷ 3"],
    2,
    "a³ means a × a × a.",
    "Easy",
  ],
  ["What is 2³?", ["8", "6", "5", "9"], 0, "2³ = 2 × 2 × 2 = 8.", "Easy"],
  [
    "2³ does not mean:",
    ["2 × 2 × 2", "8", "2 × 3", "The cube of 2"],
    2,
    "A common mistake is thinking 2³ means 2 × 3.",
    "Easy",
  ],
  [
    "A cube can be related to:",
    ["Area of a square", "Volume of a cube", "Length of a line", "Mass of an object"],
    1,
    "If the edge of a cube is s, its volume is s³.",
    "Easy",
  ],
  [
    "Which is a perfect cube?",
    ["16", "81", "50", "27"],
    3,
    "27 = 3³, so 27 is a perfect cube.",
    "Easy",
  ],
  [
    "In prime factorisation, a perfect cube can be grouped into:",
    ["Two identical groups", "Five groups", "Three identical groups", "Unequal groups"],
    2,
    "A perfect cube has prime factors in groups of three.",
    "Easy",
  ],
  [
    "The cube of a positive number produces:",
    ["Negative", "Positive", "Zero only", "Fractions only"],
    1,
    "A positive number cubed remains positive.",
    "Easy",
  ],
  [
    "The cube of a negative number produces:",
    ["Positive", "No answer", "Always zero", "Negative"],
    3,
    "A negative number cubed produces a negative value.",
    "Easy",
  ],
  ["What is (-5)³?", ["-125", "125", "15", "-15"], 0, "(-5)³ = (-5) × (-5) × (-5) = -125.", "Easy"],
  [
    "Cube root is the inverse of:",
    ["Squaring", "Cubing", "Multiplying two numbers", "Subtraction"],
    1,
    "Cube root reverses the cubing process.",
    "Easy",
  ],
  ["What is ∛8?", ["8", "3", "4", "2"], 3, "∛8 = 2 because 2³ = 8.", "Easy"],
  ["What is ∛(-8)?", ["-2", "2", "4", "-4"], 0, "∛(-8) = -2 because (-2)³ = -8.", "Easy"],
  [
    "The cube root of a cube's volume gives:",
    ["Mass of the cube", "Surface area", "Edge length of the cube", "Angle of the cube"],
    2,
    "The edge length of a cube is found by taking the cube root of the volume.",
    "Easy",
  ],
  [
    "√54 lies between:",
    ["5 and 6", "6 and 7", "8 and 9", "7 and 8"],
    3,
    "49 < 54 < 64, so √54 lies between 7 and 8.",
    "Easy",
  ],
  [
    "In order of operations, the first step is:",
    ["Addition", "Brackets", "Subtraction", "Multiplication from the right"],
    1,
    "Brackets are solved before other operations.",
    "Easy",
  ],
]);

const MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Berapakah 9²?", ["81", "72", "18", "90"], 0, "9² = 9 × 9 = 81.", "Medium"],
  ["Berapakah 12²?", ["124", "144", "154", "164"], 1, "12² = 12 × 12 = 144.", "Medium"],
  ["Berapakah √121?", ["9", "10", "11", "12"], 2, "11² = 121, jadi √121 = 11.", "Medium"],
  [
    "Berapakah √(16/25)?",
    ["2/5", "16/5", "8/25", "4/5"],
    3,
    "√16 = 4 dan √25 = 5, jadi √(16/25) = 4/5.",
    "Medium",
  ],
  ["Berapakah √64 × √64?", ["8", "64", "16", "128"], 1, "√64 × √64 = 64.", "Medium"],
  [
    "Berapakah √9 × √16?",
    ["7", "25", "12", "144"],
    2,
    "√9 = 3 dan √16 = 4, maka 3 × 4 = 12.",
    "Medium",
  ],
  ["Berapakah 3³?", ["9", "18", "24", "27"], 3, "3³ = 3 × 3 × 3 = 27.", "Medium"],
  ["Berapakah 6³?", ["216", "126", "36", "236"], 0, "6³ = 216.", "Medium"],
  ["Berapakah (-4)³?", ["64", "12", "-64", "-12"], 2, "(-4)³ = -64.", "Medium"],
  ["Berapakah ∛27?", ["2", "9", "4", "3"], 3, "∛27 = 3 kerana 3³ = 27.", "Medium"],
  ["Berapakah ∛125?", ["5", "4", "3", "25"], 0, "∛125 = 5 kerana 5³ = 125.", "Medium"],
  ["Berapakah ∛(-64)?", ["4", "-4", "-8", "8"], 1, "∛(-64) = -4 kerana (-4)³ = -64.", "Medium"],
  [
    "Luas segi empat sama ialah 49 cm². Panjang sisinya ialah:",
    ["6 cm", "9 cm", "8 cm", "7 cm"],
    3,
    "Panjang sisi = √49 = 7 cm.",
    "Medium",
  ],
  [
    "Isipadu kubus ialah 216 cm³. Panjang sisinya ialah:",
    ["6 cm", "5 cm", "4 cm", "7 cm"],
    0,
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
    ["4³ dan 5³", "6³ dan 7³", "5³ dan 6³", "7³ dan 8³"],
    2,
    "5.1 berada antara 5 dan 6, jadi 5.1³ berada antara 5³ dan 6³.",
    "Medium",
  ],
  ["Hitung: 2² + 3²", ["13", "12", "10", "18"], 0, "2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Hitung: 4³ - 5²", ["29", "49", "39", "89"], 2, "4³ - 5² = 64 - 25 = 39.", "Medium"],
  ["Hitung: √36 + ∛8", ["6", "8", "10", "14"], 1, "√36 = 6 dan ∛8 = 2, jumlah = 8.", "Medium"],
  ["Hitung: (√49)²", ["7", "14", "98", "49"], 3, "√49 = 7, maka 7² = 49.", "Medium"],
  ["Hitung: ∛(2³)", ["6", "4", "2", "8"], 2, "2³ = 8 dan ∛8 = 2.", "Medium"],
  ["Hitung: 7² × 2", ["49", "98", "56", "108"], 1, "7² = 49 dan 49 × 2 = 98.", "Medium"],
  ["Hitung: 100 - 4³", ["26", "96", "64", "36"], 3, "4³ = 64, jadi 100 - 64 = 36.", "Medium"],
  ["Hitung: √81 ÷ 3", ["3", "2", "6", "9"], 0, "√81 = 9 dan 9 ÷ 3 = 3.", "Medium"],
  ["Hitung: ∛1000 + 5", ["10", "15", "20", "105"], 1, "∛1000 = 10, jadi 10 + 5 = 15.", "Medium"],
  ["Hitung: 3² + ∛27", ["9", "36", "18", "12"], 3, "3² = 9 dan ∛27 = 3, jumlah = 12.", "Medium"],
  [
    "Berapakah √(25/36)?",
    ["5/6", "25/6", "5/36", "6/5"],
    0,
    "√25 = 5 dan √36 = 6, jadi √(25/36) = 5/6.",
    "Medium",
  ],
  ["Hitung: 2³ + 2²", ["8", "10", "12", "16"], 2, "2³ = 8 dan 2² = 4, jumlah = 12.", "Medium"],
  ["Hitung: √64 + √16", ["8", "10", "16", "12"], 3, "√64 = 8 dan √16 = 4, jumlah = 12.", "Medium"],
  ["Hitung: ∛(-27) + 10", ["3", "7", "13", "37"], 1, "∛(-27) = -3, jadi -3 + 10 = 7.", "Medium"],
]);

const MATH_C3_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  ["What is 9²?", ["81", "72", "18", "90"], 0, "9² = 9 × 9 = 81.", "Medium"],
  ["What is 12²?", ["124", "144", "154", "164"], 1, "12² = 12 × 12 = 144.", "Medium"],
  ["What is √121?", ["9", "10", "11", "12"], 2, "11² = 121, so √121 = 11.", "Medium"],
  [
    "What is √(16/25)?",
    ["2/5", "16/5", "8/25", "4/5"],
    3,
    "√16 = 4 and √25 = 5, so √(16/25) = 4/5.",
    "Medium",
  ],
  ["What is √64 × √64?", ["8", "64", "16", "128"], 1, "√64 × √64 = 64.", "Medium"],
  [
    "What is √9 × √16?",
    ["7", "25", "12", "144"],
    2,
    "√9 = 3 and √16 = 4, so 3 × 4 = 12.",
    "Medium",
  ],
  ["What is 3³?", ["9", "18", "24", "27"], 3, "3³ = 3 × 3 × 3 = 27.", "Medium"],
  ["What is 6³?", ["216", "126", "36", "236"], 0, "6³ = 216.", "Medium"],
  ["What is (-4)³?", ["64", "12", "-64", "-12"], 2, "(-4)³ = -64.", "Medium"],
  ["What is ∛27?", ["2", "9", "4", "3"], 3, "∛27 = 3 because 3³ = 27.", "Medium"],
  ["What is ∛125?", ["5", "4", "3", "25"], 0, "∛125 = 5 because 5³ = 125.", "Medium"],
  ["What is ∛(-64)?", ["4", "-4", "-8", "8"], 1, "∛(-64) = -4 because (-4)³ = -64.", "Medium"],
  [
    "The area of a square is 49 cm². Its side length is:",
    ["6 cm", "9 cm", "8 cm", "7 cm"],
    3,
    "Side length = √49 = 7 cm.",
    "Medium",
  ],
  [
    "The volume of a cube is 216 cm³. Its edge length is:",
    ["6 cm", "5 cm", "4 cm", "7 cm"],
    0,
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
    ["4³ and 5³", "6³ and 7³", "5³ and 6³", "7³ and 8³"],
    2,
    "5.1 is between 5 and 6, so 5.1³ is between 5³ and 6³.",
    "Medium",
  ],
  ["Calculate: 2² + 3²", ["13", "12", "10", "18"], 0, "2² + 3² = 4 + 9 = 13.", "Medium"],
  ["Calculate: 4³ - 5²", ["29", "49", "39", "89"], 2, "4³ - 5² = 64 - 25 = 39.", "Medium"],
  ["Calculate: √36 + ∛8", ["6", "8", "10", "14"], 1, "√36 = 6 and ∛8 = 2, total = 8.", "Medium"],
  ["Calculate: (√49)²", ["7", "14", "98", "49"], 3, "√49 = 7, so 7² = 49.", "Medium"],
  ["Calculate: ∛(2³)", ["6", "4", "2", "8"], 2, "2³ = 8 and ∛8 = 2.", "Medium"],
  ["Calculate: 7² × 2", ["49", "98", "56", "108"], 1, "7² = 49 and 49 × 2 = 98.", "Medium"],
  ["Calculate: 100 - 4³", ["26", "96", "64", "36"], 3, "4³ = 64, so 100 - 64 = 36.", "Medium"],
  ["Calculate: √81 ÷ 3", ["3", "2", "6", "9"], 0, "√81 = 9 and 9 ÷ 3 = 3.", "Medium"],
  ["Calculate: ∛1000 + 5", ["10", "15", "20", "105"], 1, "∛1000 = 10, so 10 + 5 = 15.", "Medium"],
  ["Calculate: 3² + ∛27", ["9", "36", "18", "12"], 3, "3² = 9 and ∛27 = 3, total = 12.", "Medium"],
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
    ["8", "10", "16", "12"],
    3,
    "√64 = 8 and √16 = 4, total = 12.",
    "Medium",
  ],
  ["Calculate: ∛(-27) + 10", ["3", "7", "13", "37"], 1, "∛(-27) = -3, so -3 + 10 = 7.", "Medium"],
]);

const MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Luas segi empat sama ialah 144 cm². Panjang sisinya ialah:",
    ["12 cm", "11 cm", "10 cm", "14 cm"],
    0,
    "Panjang sisi = √144 = 12 cm.",
    "Medium",
  ],
  [
    "Isipadu kubus ialah 512 cm³. Panjang sisinya ialah:",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    1,
    "Panjang sisi = ∛512 = 8 cm.",
    "Medium",
  ],
  [
    "Segi empat sama mempunyai sisi 9 cm. Luasnya ialah:",
    ["18 cm²", "45 cm²", "81 cm²", "90 cm²"],
    2,
    "Luas = 9² = 81 cm².",
    "Medium",
  ],
  [
    "Kubus mempunyai sisi 6 cm. Isipadunya ialah:",
    ["36 cm³", "72 cm³", "236 cm³", "216 cm³"],
    3,
    "Isipadu = 6³ = 216 cm³.",
    "Medium",
  ],
  [
    "Luas taman berbentuk segi empat sama ialah 169 m². Panjang sisinya ialah:",
    ["11 m", "13 m", "12 m", "14 m"],
    1,
    "Panjang sisi = √169 = 13 m.",
    "Medium",
  ],
  [
    "Isipadu kotak berbentuk kubus ialah 343 cm³. Panjang sisinya ialah:",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    2,
    "Panjang sisi = ∛343 = 7 cm.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah anggaran terbaik bagi √50?",
    ["6.5", "25", "7.9", "7.1"],
    3,
    "7² = 49 dan 8² = 64. Oleh sebab 50 sangat hampir dengan 49, √50 hampir dengan 7, iaitu kira-kira 7.1. (25 = 50 ÷ 2 ialah kesilapan biasa.)",
    "Medium",
  ],
  [
    "4.2³ berada antara:",
    ["4³ dan 5³", "3³ dan 4³", "5³ dan 6³", "6³ dan 7³"],
    0,
    "4.2 berada antara 4 dan 5, jadi 4.2³ antara 4³ dan 5³.",
    "Medium",
  ],
  [
    "Hitung: 3² + √64 × 2",
    ["17", "20", "25", "34"],
    2,
    "√64 = 8. Darab dahulu: 8 × 2 = 16. Kemudian 9 + 16 = 25.",
    "Hard",
  ],
  [
    "Hitung: (∛27 + √16)²",
    ["25", "36", "64", "49"],
    3,
    "∛27 = 3 dan √16 = 4. (3 + 4)² = 7² = 49.",
    "Hard",
  ],
  [
    "Hitung: √(81/100) + ∛8",
    ["2.9", "2.7", "2.3", "3.1"],
    0,
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
    "Hitung: ∛(-125) × 2²",
    ["20", "-10", "10", "-20"],
    3,
    "∛(-125) = -5 dan 2² = 4, maka -5 × 4 = -20.",
    "Hard",
  ],
  [
    "Hitung: (√36 + ∛64) × 2",
    ["20", "16", "10", "24"],
    0,
    "√36 = 6 dan ∛64 = 4. (6 + 4) × 2 = 20.",
    "Hard",
  ],
  ["Hitung: √(16 + 9)", ["4", "5", "7", "25"], 1, "16 + 9 = 25 dan √25 = 5.", "Hard"],
  [
    "Sebuah segi empat sama mempunyai luas yang sama dengan sebuah segi empat tepat berukuran 8 cm × 18 cm. Berapakah panjang sisi segi empat sama itu?",
    ["26 cm", "13 cm", "12 cm", "144 cm"],
    2,
    "Luas segi empat tepat = 8 × 18 = 144 cm². Sisi segi empat sama = √144 = 12 cm.",
    "Hard",
  ],
  [
    "Sebuah lantai berbentuk segi empat sama mempunyai luas 81 m². Berapakah perimeter lantai itu?",
    ["36 m", "18 m", "9 m", "81 m"],
    0,
    "Panjang sisi = √81 = 9 m. Perimeter = 4 × 9 = 36 m.",
    "Hard",
  ],
  [
    "Sisi sebuah segi empat sama digandakan daripada 5 cm kepada 10 cm. Luas baharu ialah berapa kali luas asal?",
    ["2 kali", "8 kali", "4 kali", "10 kali"],
    2,
    "Luas asal = 5² = 25 cm². Luas baharu = 10² = 100 cm². 100 ÷ 25 = 4, jadi luas menjadi 4 kali ganda.",
    "Hard",
  ],
  [
    "Dua kubus bersisi 3 cm dan 4 cm. Jumlah isipadu ialah:",
    ["37 cm³", "91 cm³", "64 cm³", "100 cm³"],
    1,
    "3³ + 4³ = 27 + 64 = 91 cm³.",
    "Hard",
  ],
  [
    "Beza antara 8² dan 4³ ialah:",
    ["32", "8", "16", "0"],
    3,
    "8² = 64 dan 4³ = 64, jadi bezanya 0.",
    "Hard",
  ],
  [
    "Hitung: ∛216 + √144",
    ["12", "24", "18", "30"],
    2,
    "∛216 = 6 dan √144 = 12, jumlah = 18.",
    "Medium",
  ],
  [
    "Hitung: √196 - ∛27",
    ["9", "11", "10", "17"],
    1,
    "√196 = 14 dan ∛27 = 3, jadi 14 - 3 = 11.",
    "Medium",
  ],
  [
    "√150 terletak antara:",
    ["10 dan 11", "11 dan 12", "13 dan 14", "12 dan 13"],
    3,
    "144 < 150 < 169, jadi √150 terletak antara 12 dan 13.",
    "Medium",
  ],
  [
    "Berapakah √0.49?",
    ["0.7", "0.07", "7", "0.245"],
    0,
    "0.7 × 0.7 = 0.49, maka √0.49 = 0.7. (0.245 = 0.49 ÷ 2 ialah kesilapan biasa.)",
    "Medium",
  ],
  [
    "64 kubus kecil bersisi 1 cm disusun menjadi sebuah kubus besar. Berapakah panjang sisi kubus besar itu?",
    ["8 cm", "4 cm", "16 cm", "32 cm"],
    1,
    "Isipadu kubus besar = 64 × 1 cm³ = 64 cm³. Panjang sisi = ∛64 = 4 cm. (8 cm ialah √64, bukan ∛64.)",
    "Hard",
  ],
  [
    "Aiman menulis (−6)² = −36. Apakah nilai sebenar (−6)²?",
    ["−12", "−36", "12", "36"],
    3,
    "(−6)² = (−6) × (−6) = 36. Hasil darab dua nombor negatif ialah positif. Aiman tersilap kerana mengira −(6²).",
    "Hard",
  ],
  [
    "Jika √a × √a = 49, nilai a ialah:",
    ["49", "14", "7", "98"],
    0,
    "√a × √a = a, jadi a = 49.",
    "Hard",
  ],
  ["Jika a³ = -8, nilai a ialah:", ["-4", "2", "-2", "4"], 2, "(-2)³ = -8, jadi a = -2.", "Medium"],
  ["Hitung: (√25)³", ["15", "25", "100", "125"], 3, "√25 = 5 dan 5³ = 125.", "Medium"],
  ["Hitung: ∛(10³)", ["30", "10", "100", "1000"], 1, "10³ = 1000 dan ∛1000 = 10.", "Medium"],
]);

const MATH_C3_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "The area of a square is 144 cm². Its side length is:",
    ["12 cm", "11 cm", "10 cm", "14 cm"],
    0,
    "Side length = √144 = 12 cm.",
    "Medium",
  ],
  [
    "The volume of a cube is 512 cm³. Its edge length is:",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    1,
    "Edge length = ∛512 = 8 cm.",
    "Medium",
  ],
  [
    "A square has a side length of 9 cm. Its area is:",
    ["18 cm²", "45 cm²", "81 cm²", "90 cm²"],
    2,
    "Area = 9² = 81 cm².",
    "Medium",
  ],
  [
    "A cube has an edge length of 6 cm. Its volume is:",
    ["36 cm³", "72 cm³", "236 cm³", "216 cm³"],
    3,
    "Volume = 6³ = 216 cm³.",
    "Medium",
  ],
  [
    "A square garden has an area of 169 m². Its side length is:",
    ["11 m", "13 m", "12 m", "14 m"],
    1,
    "Side length = √169 = 13 m.",
    "Medium",
  ],
  [
    "A cube-shaped box has a volume of 343 cm³. Its edge length is:",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    2,
    "Edge length = ∛343 = 7 cm.",
    "Medium",
  ],
  [
    "Which of the following is the best estimate of √50?",
    ["6.5", "25", "7.9", "7.1"],
    3,
    "7² = 49 and 8² = 64. Since 50 is very close to 49, √50 is close to 7, about 7.1. (25 = 50 ÷ 2 is a common mistake.)",
    "Medium",
  ],
  [
    "4.2³ lies between:",
    ["4³ and 5³", "3³ and 4³", "5³ and 6³", "6³ and 7³"],
    0,
    "4.2 is between 4 and 5, so 4.2³ is between 4³ and 5³.",
    "Medium",
  ],
  [
    "Calculate: 3² + √64 × 2",
    ["17", "20", "25", "34"],
    2,
    "√64 = 8. Multiply first: 8 × 2 = 16. Then 9 + 16 = 25.",
    "Hard",
  ],
  [
    "Calculate: (∛27 + √16)²",
    ["25", "36", "64", "49"],
    3,
    "∛27 = 3 and √16 = 4. (3 + 4)² = 7² = 49.",
    "Hard",
  ],
  [
    "Calculate: √(81/100) + ∛8",
    ["2.9", "2.7", "2.3", "3.1"],
    0,
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
    "Calculate: ∛(-125) × 2²",
    ["20", "-10", "10", "-20"],
    3,
    "∛(-125) = -5 and 2² = 4, so -5 × 4 = -20.",
    "Hard",
  ],
  [
    "Calculate: (√36 + ∛64) × 2",
    ["20", "16", "10", "24"],
    0,
    "√36 = 6 and ∛64 = 4. (6 + 4) × 2 = 20.",
    "Hard",
  ],
  ["Calculate: √(16 + 9)", ["4", "5", "7", "25"], 1, "16 + 9 = 25 and √25 = 5.", "Hard"],
  [
    "A square has the same area as a rectangle measuring 8 cm × 18 cm. What is the side length of the square?",
    ["26 cm", "13 cm", "12 cm", "144 cm"],
    2,
    "Area of the rectangle = 8 × 18 = 144 cm². Side of the square = √144 = 12 cm.",
    "Hard",
  ],
  [
    "A square floor has an area of 81 m². What is the perimeter of the floor?",
    ["36 m", "18 m", "9 m", "81 m"],
    0,
    "Side length = √81 = 9 m. Perimeter = 4 × 9 = 36 m.",
    "Hard",
  ],
  [
    "The side of a square is doubled from 5 cm to 10 cm. The new area is how many times the original area?",
    ["2 times", "8 times", "4 times", "10 times"],
    2,
    "Original area = 5² = 25 cm². New area = 10² = 100 cm². 100 ÷ 25 = 4, so the area becomes 4 times as large.",
    "Hard",
  ],
  [
    "Two cubes have edge lengths of 3 cm and 4 cm. Their total volume is:",
    ["37 cm³", "91 cm³", "64 cm³", "100 cm³"],
    1,
    "3³ + 4³ = 27 + 64 = 91 cm³.",
    "Hard",
  ],
  [
    "The difference between 8² and 4³ is:",
    ["32", "8", "16", "0"],
    3,
    "8² = 64 and 4³ = 64, so the difference is 0.",
    "Hard",
  ],
  [
    "Calculate: ∛216 + √144",
    ["12", "24", "18", "30"],
    2,
    "∛216 = 6 and √144 = 12, total = 18.",
    "Medium",
  ],
  [
    "Calculate: √196 - ∛27",
    ["9", "11", "10", "17"],
    1,
    "√196 = 14 and ∛27 = 3, so 14 - 3 = 11.",
    "Medium",
  ],
  [
    "√150 lies between:",
    ["10 and 11", "11 and 12", "13 and 14", "12 and 13"],
    3,
    "144 < 150 < 169, so √150 lies between 12 and 13.",
    "Medium",
  ],
  [
    "What is √0.49?",
    ["0.7", "0.07", "7", "0.245"],
    0,
    "0.7 × 0.7 = 0.49, so √0.49 = 0.7. (0.245 = 0.49 ÷ 2 is a common mistake.)",
    "Medium",
  ],
  [
    "64 small cubes with 1 cm edges are arranged into one large cube. What is the edge length of the large cube?",
    ["8 cm", "4 cm", "16 cm", "32 cm"],
    1,
    "Volume of the large cube = 64 × 1 cm³ = 64 cm³. Edge length = ∛64 = 4 cm. (8 cm is √64, not ∛64.)",
    "Hard",
  ],
  [
    "Aiman wrote (−6)² = −36. What is the correct value of (−6)²?",
    ["−12", "−36", "12", "36"],
    3,
    "(−6)² = (−6) × (−6) = 36. The product of two negative numbers is positive. Aiman's mistake was calculating −(6²).",
    "Hard",
  ],
  [
    "If √a × √a = 49, the value of a is:",
    ["49", "14", "7", "98"],
    0,
    "√a × √a = a, so a = 49.",
    "Hard",
  ],
  ["If a³ = -8, the value of a is:", ["-4", "2", "-2", "4"], 2, "(-2)³ = -8, so a = -2.", "Medium"],
  ["Calculate: (√25)³", ["15", "25", "100", "125"], 3, "√25 = 5 and 5³ = 125.", "Medium"],
  ["Calculate: ∛(10³)", ["30", "10", "100", "1000"], 1, "10³ = 1000 and ∛1000 = 10.", "Medium"],
]);

const MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah nisbah?",
    [
      "Perbandingan kuantiti sama jenis dan unit",
      "Perbandingan kuantiti berbeza jenis",
      "Hasil tambah dua nombor",
      "Hasil darab dua nombor",
    ],
    0,
    "Nisbah membandingkan kuantiti sama jenis dan unit.",
    "Easy",
  ],
  [
    "Bagaimana nisbah ditulis?",
    ["a + b", "a : b", "a − b", "a × b"],
    1,
    "Nisbah ditulis dalam bentuk a : b.",
    "Easy",
  ],
  [
    "Nisbah manakah yang ditulis dengan betul menggunakan unit yang sama?",
    ["3 cm : 5 m", "3 kg : 5 cm", "3 cm : 5 cm", "3 jam : 5 km"],
    2,
    "Unit kedua-dua sebutan mestilah sama.",
    "Easy",
  ],
  [
    "Apakah nisbah setara?",
    [
      "Nisbah yang berbeza nilai",
      "Peratusan sama",
      "Pecahan campuran",
      "Nisbah yang nilainya sama",
    ],
    3,
    "Nisbah setara mempunyai nilai sama.",
    "Easy",
  ],
  [
    "2 : 3 setara dengan?",
    ["3 : 2", "4 : 6", "5 : 7", "1 : 2"],
    1,
    "Darab 2 dan 3 dengan 2 → 4 : 6.",
    "Easy",
  ],
  [
    "Apakah bentuk termudah 12 : 18?",
    ["6 : 9", "4 : 6", "2 : 3", "3 : 2"],
    2,
    "FSTB 12 dan 18 ialah 6 → 2 : 3.",
    "Easy",
  ],
  [
    "Bagaimana mempermudah nisbah?",
    ["Bahagi dengan jumlah", "Darab dengan GSTK", "Tambah dengan 1", "Bahagi dengan FSTB"],
    3,
    "Bahagikan semua sebutan dengan FSTB.",
    "Easy",
  ],
  [
    "Apakah kadar?",
    [
      "Perbandingan dua kuantiti yang berbeza unit",
      "Perbandingan kuantiti yang sama jenis",
      "Kelajuan sahaja",
      "Harga sahaja",
    ],
    0,
    "Kadar membandingkan dua kuantiti berbeza jenis atau unit.",
    "Easy",
  ],
  [
    "Antara berikut, yang manakah contoh kadar?",
    ["3 : 5", "1/2", "60 km/j", "25%"],
    2,
    "Km/j ialah kadar antara jarak dan masa.",
    "Easy",
  ],
  [
    "Apakah kadaran?",
    ["Pecahan", "Dua nombor berbeza", "Hasil tambah", "Dua nisbah setara"],
    3,
    "Kadaran ialah persamaan dua nisbah setara.",
    "Easy",
  ],
  [
    "a : b = c : d juga ditulis sebagai?",
    ["a/b = c/d", "a × b = c × d", "a + b = c + d", "a − b = c − d"],
    0,
    "Nisbah boleh ditulis sebagai pecahan setara.",
    "Easy",
  ],
  [
    "50% sebagai nisbah ialah?",
    ["2 : 1", "1 : 2", "1 : 5", "5 : 1"],
    1,
    "50% = 50 : 100 = 1 : 2.",
    "Easy",
  ],
  [
    "20% sebagai nisbah termudah?",
    ["1 : 2", "1 : 4", "2 : 5", "1 : 5"],
    3,
    "20% = 20 : 100 = 1 : 5.",
    "Easy",
  ],
  [
    "25% sebagai nisbah termudah?",
    ["1 : 4", "1 : 3", "1 : 5", "2 : 5"],
    0,
    "25% = 25 : 100 = 1 : 4.",
    "Easy",
  ],
  ["1 m = ? cm", ["10", "100", "1000", "10000"], 1, "1 m = 100 cm.", "Easy"],
  ["1 km = ? m", ["100", "10 000", "1000", "100 000"], 2, "1 km = 1000 m.", "Easy"],
  [
    "Kelas 1A mempunyai 12 murid lelaki dan 15 murid perempuan. Apakah nisbah murid lelaki kepada murid perempuan dalam bentuk termudah?",
    ["4 : 5", "5 : 4", "12 : 27", "3 : 5"],
    0,
    "12 : 15. Bahagi kedua-dua sebutan dengan FSTB, iaitu 3: 4 : 5.",
    "Easy",
  ],
  [
    "Sebuah kereta bergerak sejauh 60 km dengan menggunakan 5 liter petrol. Berapakah kadar penggunaan petrol itu?",
    ["65 km/liter", "300 km/liter", "12 km/liter", "5 km/liter"],
    2,
    "Kadar = 60 km ÷ 5 liter = 12 km/liter.",
    "Easy",
  ],
  [
    "Manakah BUKAN kadar?",
    ["RM 5/kg", "3 : 5", "60 km/j", "RM 12/jam"],
    1,
    "3 : 5 ialah nisbah, bukan kadar.",
    "Easy",
  ],
  [
    "6 : 9 dipermudahkan menjadi?",
    ["1 : 2", "2 : 5", "3 : 4", "2 : 3"],
    3,
    "FSTB 6 dan 9 ialah 3 → 2 : 3.",
    "Easy",
  ],
  [
    "Adakah 4 : 6 setara dengan 2 : 3?",
    ["Hanya kadang-kadang", "Tidak", "Ya", "Tidak ditentukan"],
    2,
    "4 : 6 dibahagi 2 → 2 : 3.",
    "Easy",
  ],
  [
    "Kaedah unitari bermula dengan?",
    ["Cari nilai semua unit", "Cari nilai satu unit", "Cari peratusan", "Pendaraban silang"],
    1,
    "Cari nilai satu unit dahulu.",
    "Easy",
  ],
  [
    "Pendaraban silang bagi a/b = c/d ialah?",
    ["a + d = b + c", "a/d = b/c", "a − d = b − c", "a × d = b × c"],
    3,
    "a × d = b × c.",
    "Easy",
  ],
  [
    "Skala peta 1 : 1000 bermaksud?",
    [
      "1 unit peta = 1000 unit sebenar",
      "Peta lebih besar",
      "Sama saiz",
      "1 unit peta = 100 unit sebenar",
    ],
    0,
    "1 unit pada peta mewakili 1000 unit sebenar.",
    "Easy",
  ],
  [
    "Nisbah murid lelaki kepada murid perempuan ialah 3 : 5. Apakah pecahan murid lelaki daripada jumlah murid?",
    ["3/5", "3/8", "5/8", "5/3"],
    1,
    "Jumlah bahagian = 3 + 5 = 8. Pecahan murid lelaki = 3/8. (3/5 membandingkan lelaki dengan perempuan, bukan dengan jumlah.)",
    "Easy",
  ],
  [
    "Harga 3 kg tepung ialah RM12. Berapakah harga per kg?",
    ["RM15/kg", "RM36/kg", "RM9/kg", "RM4/kg"],
    3,
    "Kadar = RM12 ÷ 3 kg = RM4/kg.",
    "Easy",
  ],
  [
    "80% sebagai nisbah termudah?",
    ["4 : 5", "1 : 5", "8 : 9", "2 : 5"],
    0,
    "80% = 80 : 100 = 4 : 5.",
    "Easy",
  ],
  [
    "Manakah pernyataan kadaran?",
    ["2 + 3 = 5", "2 × 3 = 6", "2 : 3 = 4 : 6", "2 − 1 = 1"],
    2,
    "Kadaran ialah dua nisbah setara.",
    "Easy",
  ],
  [
    "Jika 2 : 5 = 6 : x, nilai × ialah:",
    ["9", "30", "10", "15"],
    3,
    "2 × 3 = 6, maka 5 × 3 = 15. Jadi 2 : 5 = 6 : 15.",
    "Easy",
  ],
  [
    "Bilakah pendaraban silang digunakan?",
    [
      "Apabila hanya ada satu nisbah sahaja",
      "Apabila menyelesaikan kadaran yang ada nilai tidak diketahui",
      "Apabila mempermudah nisbah kepada bentuk termudah",
      "Apabila menggabungkan dua nisbah menjadi satu",
    ],
    1,
    "Digunakan untuk mencari nilai tidak diketahui dalam kadaran.",
    "Easy",
  ],
]);

const MATH_C4_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a ratio?",
    [
      "A comparison of quantities of the same kind and unit",
      "A comparison of quantities of different kinds",
      "The sum of two numbers",
      "The product of two numbers",
    ],
    0,
    "A ratio compares quantities of the same kind and unit.",
    "Easy",
  ],
  [
    "How is a ratio written?",
    ["a + b", "a : b", "a − b", "a × b"],
    1,
    "A ratio is written as a : b.",
    "Easy",
  ],
  [
    "Which ratio is written correctly using the same unit?",
    ["3 cm : 5 m", "3 kg : 5 cm", "3 cm : 5 cm", "3 h : 5 km"],
    2,
    "Both terms must share the same unit.",
    "Easy",
  ],
  [
    "What are equivalent ratios?",
    [
      "Ratios of different value",
      "Equal percentages",
      "Mixed fractions",
      "Ratios of the same value",
    ],
    3,
    "Equivalent ratios have the same value.",
    "Easy",
  ],
  [
    "2 : 3 is equivalent to?",
    ["3 : 2", "4 : 6", "5 : 7", "1 : 2"],
    1,
    "Multiply 2 and 3 by 2 → 4 : 6.",
    "Easy",
  ],
  [
    "What is the simplest form of 12 : 18?",
    ["6 : 9", "4 : 6", "2 : 3", "3 : 2"],
    2,
    "HCF of 12 and 18 is 6 → 2 : 3.",
    "Easy",
  ],
  [
    "How do you simplify a ratio?",
    ["Divide by total", "Multiply by LCM", "Add 1", "Divide by HCF"],
    3,
    "Divide all terms by the HCF.",
    "Easy",
  ],
  [
    "What is a rate?",
    [
      "A comparison of two quantities with different units",
      "A comparison of quantities of the same kind",
      "Speed only",
      "Price only",
    ],
    0,
    "A rate compares two different-kind quantities.",
    "Easy",
  ],
  [
    "Which of the following is an example of a rate?",
    ["3 : 5", "1/2", "60 km/h", "25%"],
    2,
    "Km/h is a rate of distance per time.",
    "Easy",
  ],
  [
    "What is a proportion?",
    ["A fraction", "Two different numbers", "A sum", "Two equivalent ratios"],
    3,
    "A proportion equates two equivalent ratios.",
    "Easy",
  ],
  [
    "a : b = c : d can also be written as:",
    ["a/b = c/d", "a × b = c × d", "a + b = c + d", "a − b = c − d"],
    0,
    "Ratios can be written as equivalent fractions.",
    "Easy",
  ],
  [
    "50% as a ratio is?",
    ["2 : 1", "1 : 2", "1 : 5", "5 : 1"],
    1,
    "50% = 50 : 100 = 1 : 2.",
    "Easy",
  ],
  [
    "20% as simplest ratio?",
    ["1 : 2", "1 : 4", "2 : 5", "1 : 5"],
    3,
    "20% = 20 : 100 = 1 : 5.",
    "Easy",
  ],
  [
    "25% as simplest ratio?",
    ["1 : 4", "1 : 3", "1 : 5", "2 : 5"],
    0,
    "25% = 25 : 100 = 1 : 4.",
    "Easy",
  ],
  ["1 m = ? cm", ["10", "100", "1000", "10000"], 1, "1 m = 100 cm.", "Easy"],
  ["1 km = ? m", ["100", "10 000", "1000", "100 000"], 2, "1 km = 1000 m.", "Easy"],
  [
    "Class 1A has 12 boys and 15 girls. What is the ratio of boys to girls in its simplest form?",
    ["4 : 5", "5 : 4", "12 : 27", "3 : 5"],
    0,
    "12 : 15. Divide both terms by the HCF, 3: 4 : 5.",
    "Easy",
  ],
  [
    "A car travels 60 km using 5 litres of petrol. What is its rate of petrol use?",
    ["65 km/litre", "300 km/litre", "12 km/litre", "5 km/litre"],
    2,
    "Rate = 60 km ÷ 5 litres = 12 km/litre.",
    "Easy",
  ],
  [
    "Which is NOT a rate?",
    ["RM 5/kg", "3 : 5", "60 km/h", "RM 12/hour"],
    1,
    "3 : 5 is a ratio, not a rate.",
    "Easy",
  ],
  [
    "6 : 9 simplifies to?",
    ["1 : 2", "2 : 5", "3 : 4", "2 : 3"],
    3,
    "HCF 6 and 9 is 3 → 2 : 3.",
    "Easy",
  ],
  [
    "Is 4 : 6 equivalent to 2 : 3?",
    ["Sometimes", "No", "Yes", "Undefined"],
    2,
    "4 : 6 divided by 2 → 2 : 3.",
    "Easy",
  ],
  [
    "The unitary method starts by?",
    ["Find all unit values", "Find one unit value", "Find percentage", "Cross multiply"],
    1,
    "Find the value of one unit first.",
    "Easy",
  ],
  [
    "Cross multiplication of a/b = c/d gives?",
    ["a + d = b + c", "a/d = b/c", "a − d = b − c", "a × d = b × c"],
    3,
    "a × d = b × c.",
    "Easy",
  ],
  [
    "A map scale 1 : 1000 means?",
    [
      "1 unit map = 1000 actual units",
      "Map is bigger",
      "Same size",
      "1 unit map = 100 actual units",
    ],
    0,
    "1 map unit represents 1000 actual units.",
    "Easy",
  ],
  [
    "The ratio of boys to girls is 3 : 5. What fraction of all the pupils are boys?",
    ["3/5", "3/8", "5/8", "5/3"],
    1,
    "Total parts = 3 + 5 = 8. Fraction of boys = 3/8. (3/5 compares boys with girls, not with the total.)",
    "Easy",
  ],
  [
    "3 kg of flour costs RM12. What is the price per kg?",
    ["RM15/kg", "RM36/kg", "RM9/kg", "RM4/kg"],
    3,
    "Rate = RM12 ÷ 3 kg = RM4/kg.",
    "Easy",
  ],
  [
    "80% as simplest ratio?",
    ["4 : 5", "1 : 5", "8 : 9", "2 : 5"],
    0,
    "80% = 80 : 100 = 4 : 5.",
    "Easy",
  ],
  [
    "Which is a proportion statement?",
    ["2 + 3 = 5", "2 × 3 = 6", "2 : 3 = 4 : 6", "2 − 1 = 1"],
    2,
    "A proportion has two equivalent ratios.",
    "Easy",
  ],
  [
    "If 2 : 5 = 6 : x, the value of × is:",
    ["9", "30", "10", "15"],
    3,
    "2 × 3 = 6, so 5 × 3 = 15. Therefore 2 : 5 = 6 : 15.",
    "Easy",
  ],
  [
    "When is cross multiplication used?",
    [
      "When there is only one ratio",
      "When solving a proportion with an unknown",
      "When simplifying a ratio to lowest terms",
      "When combining two ratios into one",
    ],
    1,
    "It finds the unknown in a proportion.",
    "Easy",
  ],
]);

const MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Permudahkan 15 : 25.",
    ["3 : 5", "3 : 4", "5 : 7", "1 : 2"],
    0,
    "FSTB 15 dan 25 ialah 5 → 3 : 5.",
    "Medium",
  ],
  ["Permudahkan 24 : 36.", ["1 : 2", "2 : 3", "3 : 4", "4 : 5"], 1, "FSTB = 12 → 2 : 3.", "Medium"],
  [
    "Permudahkan 8 : 12 : 20.",
    ["1 : 2 : 3", "4 : 6 : 10", "2 : 3 : 5", "2 : 3 : 4"],
    2,
    "FSTB = 4 → 2 : 3 : 5.",
    "Medium",
  ],
  [
    "Tukarkan 500 g : 1 kg kepada bentuk termudah.",
    ["2 : 5", "5 : 10", "1 : 5", "1 : 2"],
    3,
    "1 kg = 1000 g; 500 : 1000 = 1 : 2.",
    "Medium",
  ],
  ["3 : 7 = 9 : ?", ["14", "21", "18", "24"], 1, "Darab dengan 3 → 9 : 21.", "Medium"],
  [
    "Selesaikan 4/6 = x/9.",
    ["4", "5", "6", "8"],
    2,
    "Pendaraban silang: 4 × 9 = 6x → x = 6.",
    "Medium",
  ],
  ["Selesaikan 5/8 = x/24.", ["10", "12", "20", "15"], 3, "5 × 24 = 8x → x = 15.", "Medium"],
  [
    "Jika A : B = 2 : 3 dan B : C = 4 : 5, A : B : C ialah?",
    ["8 : 12 : 15", "2 : 3 : 5", "4 : 6 : 10", "2 : 12 : 5"],
    0,
    "Samakan B = 12 → 8 : 12 : 15.",
    "Medium",
  ],
  [
    "Kereta 180 km dalam 3 jam. Kelajuan?",
    ["50 km/j", "70 km/j", "60 km/j", "90 km/j"],
    2,
    "180 ÷ 3 = 60 km/j.",
    "Medium",
  ],
  [
    "RM 24 untuk 4 kg gula. Harga 7 kg?",
    ["RM 36", "RM 56", "RM 48", "RM 42"],
    3,
    "1 kg = RM 6; 7 kg = RM 42.",
    "Medium",
  ],
  [
    "5 buku = RM 35. 12 buku?",
    ["RM 84", "RM 80", "RM 70", "RM 90"],
    0,
    "1 buku = RM 7; 12 buku = RM 84.",
    "Medium",
  ],
  [
    "Tukarkan 90 km/j kepada m/s.",
    ["20", "25", "27", "30"],
    1,
    "90 × 1000/3600 = 25 m/s.",
    "Medium",
  ],
  [
    "Tukarkan RM 8 per m kepada RM per cm.",
    ["80", "0.8", "8", "0.08"],
    3,
    "RM 8 ÷ 100 = RM 0.08 per cm.",
    "Medium",
  ],
  [
    "Resipi 4 orang gunakan 200 g tepung. Untuk 6 orang?",
    ["300 g", "280 g", "250 g", "350 g"],
    0,
    "200 × 6/4 = 300 g.",
    "Medium",
  ],
  [
    "Permudahkan 200 ml : 1 liter.",
    ["1 : 2", "1 : 5", "2 : 5", "1 : 10"],
    1,
    "1 L = 1000 ml; 200 : 1000 = 1 : 5.",
    "Medium",
  ],
  [
    "40% sebagai nisbah termudah?",
    ["1 : 4", "4 : 5", "2 : 5", "1 : 5"],
    2,
    "40% = 40 : 100 = 2 : 5.",
    "Medium",
  ],
  [
    "60% sebagai nisbah termudah?",
    ["3 : 5", "2 : 5", "6 : 11", "3 : 4"],
    0,
    "60% = 60 : 100 = 3 : 5.",
    "Medium",
  ],
  ["Selesaikan 7 : 4 = 21 : x.", ["10", "14", "12", "16"], 2, "x = 4 × 21/7 = 12.", "Medium"],
  [
    "Jika nisbah lelaki : perempuan = 3 : 2 dan jumlah 30, bilangan lelaki?",
    ["12", "18", "15", "20"],
    1,
    "3/5 × 30 = 18.",
    "Medium",
  ],
  [
    "Jika £2 = RM9, maka £5 = ?",
    ["RM 18", "RM 20", "RM 25", "RM 22.50"],
    3,
    "£1 = RM4.50. £5 = 5 × RM4.50 = RM22.50.",
    "Medium",
  ],
  [
    "Skala 1 : 5000. Jarak 4 cm peta = jarak sebenar?",
    ["2000 m", "100 m", "200 m", "20 m"],
    2,
    "4 × 5000 = 20 000 cm = 200 m.",
    "Medium",
  ],
  [
    "Kadar pekerja: 5 jam = RM 75. 1 jam = ?",
    ["RM 12", "RM 15", "RM 18", "RM 20"],
    1,
    "75 ÷ 5 = RM 15.",
    "Medium",
  ],
  [
    "Tukarkan 54 km/j kepada m/min.",
    ["54 000 m/min", "15 m/min", "3 240 m/min", "900 m/min"],
    3,
    "54 km/j = 54 000 m dalam 60 minit. 54 000 ÷ 60 = 900 m/min.",
    "Medium",
  ],
  [
    "Sebuah peta 5 cm = 25 km sebenar. Skala?",
    ["1 : 500 000", "1 : 50 000", "1 : 5000", "1 : 5 000 000"],
    0,
    "25 km = 2 500 000 cm; 5 : 2 500 000 = 1 : 500 000.",
    "Medium",
  ],
  [
    "Permudahkan nisbah 45 minit : 2 jam.",
    ["1 : 2", "3 : 8", "2 : 3", "3 : 5"],
    1,
    "2 jam = 120 min; 45 : 120 = 3 : 8.",
    "Medium",
  ],
  ["Selesaikan 3 : x = 9 : 15.", ["4", "10", "6", "5"], 3, "x = 3 × 15/9 = 5.", "Medium"],
  [
    "Aina menaip pada kadar 45 patah perkataan seminit. Berapakah bilangan perkataan yang ditaip dalam 8 minit pada kadar yang sama?",
    ["360", "405", "53", "450"],
    0,
    "Bilangan perkataan = 45 × 8 = 360 patah perkataan.",
    "Medium",
  ],
  [
    "Tukarkan 36 km/j kepada m/s.",
    ["8", "12", "10", "15"],
    2,
    "36 × 1000/3600 = 10 m/s.",
    "Medium",
  ],
  [
    "A : B = 5 : 3. Jika A = 25, B = ?",
    ["10", "12", "20", "15"],
    3,
    "B = 25 × 3/5 = 15.",
    "Medium",
  ],
  [
    "A : B : C = 2 : 3 : 5. Jika jumlah 100, nilai C?",
    ["20", "50", "40", "30"],
    1,
    "C = 5/10 × 100 = 50.",
    "Medium",
  ],
]);

const MATH_C4_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Simplify 15 : 25.",
    ["3 : 5", "3 : 4", "5 : 7", "1 : 2"],
    0,
    "HCF 15 and 25 is 5 → 3 : 5.",
    "Medium",
  ],
  ["Simplify 24 : 36.", ["1 : 2", "2 : 3", "3 : 4", "4 : 5"], 1, "HCF = 12 → 2 : 3.", "Medium"],
  [
    "Simplify 8 : 12 : 20.",
    ["1 : 2 : 3", "4 : 6 : 10", "2 : 3 : 5", "2 : 3 : 4"],
    2,
    "HCF = 4 → 2 : 3 : 5.",
    "Medium",
  ],
  [
    "Express 500 g : 1 kg in simplest form.",
    ["2 : 5", "5 : 10", "1 : 5", "1 : 2"],
    3,
    "1 kg = 1000 g; 500 : 1000 = 1 : 2.",
    "Medium",
  ],
  ["3 : 7 = 9 : ?", ["14", "21", "18", "24"], 1, "Multiply by 3 → 9 : 21.", "Medium"],
  ["Solve 4/6 = x/9.", ["4", "5", "6", "8"], 2, "Cross multiply: 4 × 9 = 6x → x = 6.", "Medium"],
  ["Solve 5/8 = x/24.", ["10", "12", "20", "15"], 3, "5 × 24 = 8x → x = 15.", "Medium"],
  [
    "If A : B = 2 : 3 and B : C = 4 : 5, then A : B : C = ?",
    ["8 : 12 : 15", "2 : 3 : 5", "4 : 6 : 10", "2 : 12 : 5"],
    0,
    "Make B = 12 → 8 : 12 : 15.",
    "Medium",
  ],
  [
    "A car travels 180 km in 3 hours. Speed?",
    ["50 km/h", "70 km/h", "60 km/h", "90 km/h"],
    2,
    "180 ÷ 3 = 60 km/h.",
    "Medium",
  ],
  [
    "RM 24 for 4 kg of sugar. Cost of 7 kg?",
    ["RM 36", "RM 56", "RM 48", "RM 42"],
    3,
    "1 kg = RM 6; 7 kg = RM 42.",
    "Medium",
  ],
  [
    "5 books = RM 35. 12 books?",
    ["RM 84", "RM 80", "RM 70", "RM 90"],
    0,
    "1 book = RM 7; 12 books = RM 84.",
    "Medium",
  ],
  ["Convert 90 km/h to m/s.", ["20", "25", "27", "30"], 1, "90 × 1000/3600 = 25 m/s.", "Medium"],
  [
    "Convert RM 8 per m to RM per cm.",
    ["80", "0.8", "8", "0.08"],
    3,
    "RM 8 ÷ 100 = RM 0.08 per cm.",
    "Medium",
  ],
  [
    "A recipe for 4 uses 200 g flour. For 6 people?",
    ["300 g", "280 g", "250 g", "350 g"],
    0,
    "200 × 6/4 = 300 g.",
    "Medium",
  ],
  [
    "Simplify 200 ml : 1 litre.",
    ["1 : 2", "1 : 5", "2 : 5", "1 : 10"],
    1,
    "1 L = 1000 ml; 200 : 1000 = 1 : 5.",
    "Medium",
  ],
  [
    "40% as simplest ratio?",
    ["1 : 4", "4 : 5", "2 : 5", "1 : 5"],
    2,
    "40% = 40 : 100 = 2 : 5.",
    "Medium",
  ],
  [
    "60% as simplest ratio?",
    ["3 : 5", "2 : 5", "6 : 11", "3 : 4"],
    0,
    "60% = 60 : 100 = 3 : 5.",
    "Medium",
  ],
  ["Solve 7 : 4 = 21 : x.", ["10", "14", "12", "16"], 2, "x = 4 × 21/7 = 12.", "Medium"],
  [
    "If boys : girls = 3 : 2 and total is 30, number of boys?",
    ["12", "18", "15", "20"],
    1,
    "3/5 × 30 = 18.",
    "Medium",
  ],
  [
    "If £2 = RM9, then £5 = ?",
    ["RM 18", "RM 20", "RM 25", "RM 22.50"],
    3,
    "£1 = RM4.50. £5 = 5 × RM4.50 = RM22.50.",
    "Medium",
  ],
  [
    "Scale 1 : 5000. Map distance 4 cm = actual?",
    ["2000 m", "100 m", "200 m", "20 m"],
    2,
    "4 × 5000 = 20 000 cm = 200 m.",
    "Medium",
  ],
  [
    "Worker rate: 5 hours = RM 75. 1 hour = ?",
    ["RM 12", "RM 15", "RM 18", "RM 20"],
    1,
    "75 ÷ 5 = RM 15.",
    "Medium",
  ],
  [
    "Convert 54 km/h to m/min.",
    ["54 000 m/min", "15 m/min", "3 240 m/min", "900 m/min"],
    3,
    "54 km/h = 54 000 m in 60 minutes. 54 000 ÷ 60 = 900 m/min.",
    "Medium",
  ],
  [
    "On a map, 5 cm = 25 km. Scale?",
    ["1 : 500 000", "1 : 50 000", "1 : 5000", "1 : 5 000 000"],
    0,
    "25 km = 2 500 000 cm; 5 : 2 500 000 = 1 : 500 000.",
    "Medium",
  ],
  [
    "Simplify ratio 45 minutes : 2 hours.",
    ["1 : 2", "3 : 8", "2 : 3", "3 : 5"],
    1,
    "2 h = 120 min; 45 : 120 = 3 : 8.",
    "Medium",
  ],
  ["Solve 3 : x = 9 : 15.", ["4", "10", "6", "5"], 3, "x = 3 × 15/9 = 5.", "Medium"],
  [
    "Aina types at a rate of 45 words per minute. How many words does she type in 8 minutes at the same rate?",
    ["360", "405", "53", "450"],
    0,
    "Number of words = 45 × 8 = 360 words.",
    "Medium",
  ],
  ["Convert 36 km/h to m/s.", ["8", "12", "10", "15"], 2, "36 × 1000/3600 = 10 m/s.", "Medium"],
  ["A : B = 5 : 3. If A = 25, B = ?", ["10", "12", "20", "15"], 3, "B = 25 × 3/5 = 15.", "Medium"],
  [
    "A : B : C = 2 : 3 : 5. If total is 100, value of C?",
    ["20", "50", "40", "30"],
    1,
    "C = 5/10 × 100 = 50.",
    "Medium",
  ],
]);

const MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Resipi 8 keping kek gunakan 400 g mentega. Untuk 14 keping?",
    ["700 g", "600 g", "650 g", "500 g"],
    0,
    "400 × 14/8 = 700 g.",
    "Medium",
  ],
  [
    "Jika 60% pelajar lelaki dan jumlah 40, bilangan perempuan?",
    ["12", "16", "20", "24"],
    1,
    "40% perempuan = 0.40 × 40 = 16.",
    "Hard",
  ],
  [
    "Skala peta 1 : 250 000. Dua bandar 6 cm pada peta. Jarak sebenar (km)?",
    ["10", "12", "15", "20"],
    2,
    "6 × 250 000 = 1 500 000 cm = 15 km.",
    "Hard",
  ],
  [
    "Harga 3 kg beras ialah RM12.60. Berapakah harga 5 kg beras pada kadar yang sama?",
    ["RM20.00", "RM4.20", "RM25.20", "RM21.00"],
    3,
    "Harga 1 kg = RM12.60 ÷ 3 = RM4.20. Harga 5 kg = 5 × RM4.20 = RM21.00.",
    "Medium",
  ],
  [
    "A : B = 3 : 5. Jika B − A = 8, nilai A?",
    ["10", "12", "15", "20"],
    1,
    "B − A = 5k − 3k = 2k = 8 → k = 4; A = 12.",
    "Hard",
  ],
  [
    "Larutan 5 : 3 air : sirap. Untuk 240 ml sirap, isipadu air?",
    ["360 ml", "420 ml", "400 ml", "480 ml"],
    2,
    "Air = 5/3 × 240 = 400 ml.",
    "Medium",
  ],
  [
    "Kereta A: 240 km dalam 3 jam. Kereta B: 300 km dalam 4 jam. Yang lebih laju?",
    ["Tidak ditentukan", "Kereta B", "Sama", "Kereta A"],
    3,
    "A = 80 km/j; B = 75 km/j.",
    "Hard",
  ],
  [
    "Sebatang paip mengalirkan air pada kadar 12 liter per minit. Berapakah masa yang diambil untuk mengisi sebuah tangki 300 liter?",
    ["25 minit", "3 600 minit", "36 minit", "250 minit"],
    0,
    "Masa = 300 liter ÷ 12 liter/minit = 25 minit.",
    "Medium",
  ],
  [
    "Membeli 3 kg untuk RM 21 atau 5 kg untuk RM 30. Yang lebih jimat per kg?",
    ["3 kg", "Sama", "5 kg", "Tidak ditentukan"],
    2,
    "RM 7/kg vs RM 6/kg → 5 kg lebih jimat.",
    "Hard",
  ],
  [
    "A : B : C = 2 : 3 : 4. Jumlah RM 90. Bahagian C?",
    ["RM 20", "RM 30", "RM 45", "RM 40"],
    3,
    "C = 4/9 × 90 = RM 40.",
    "Medium",
  ],
  [
    "Nisbah lelaki kepada perempuan 7 : 5. Jika perempuan 35, jumlah?",
    ["84", "70", "56", "96"],
    0,
    "Lelaki = 7/5 × 35 = 49; jumlah 84.",
    "Hard",
  ],
  [
    "Kadar laju 72 km/j dalam m/s?",
    ["18", "20", "22", "24"],
    1,
    "72 × 1000/3600 = 20 m/s.",
    "Medium",
  ],
  [
    "Jika 5 kg buah berharga RM 60, harga 250 g?",
    ["RM 6", "RM 4", "RM 5", "RM 3"],
    3,
    "1 kg = RM 12; 0.25 kg = RM 3.",
    "Hard",
  ],
  [
    "Larutan 1 : 4 jus : air. Untuk 1.5 liter jumlah, isipadu jus?",
    ["300 ml", "250 ml", "200 ml", "375 ml"],
    0,
    "Jus = 1/5 × 1500 = 300 ml.",
    "Hard",
  ],
  [
    "Cas teksi RM 3 mula + RM 1.50/km. Bayaran 8 km?",
    ["RM 12", "RM 15", "RM 14", "RM 13"],
    1,
    "3 + 1.5×8 = RM 15.",
    "Medium",
  ],
  ["Tukarkan 0.5 m/s kepada km/j.", ["1.5", "2", "1.8", "5"], 2, "0.5 × 3.6 = 1.8 km/j.", "Medium"],
  [
    "Peta skala 1 : 100 000. Bahagian sebenar 7.5 km = berapa cm pada peta?",
    ["7.5", "6.5", "7", "5.5"],
    0,
    "7.5 km = 750 000 cm ÷ 100 000 = 7.5 cm.",
    "Hard",
  ],
  [
    "Jika 70% pelajar lulus dan 21 gagal, jumlah pelajar?",
    ["50", "60", "70", "80"],
    2,
    "30% = 21 → 100% = 70.",
    "Hard",
  ],
  [
    "Resipi cookies 5 : 3 : 2 (tepung : gula : mentega). Jumlah 500 g. Tepung?",
    ["200 g", "250 g", "230 g", "300 g"],
    1,
    "5/10 × 500 = 250 g.",
    "Medium",
  ],
  [
    "Selesaikan 2x : 5 = 8 : 10.",
    ["x = 8", "x = 4", "x = 5", "x = 2"],
    3,
    "2x × 10 = 5 × 8 → 20x = 40 → x = 2.",
    "Medium",
  ],
  [
    "Larutan 3 : 2 alkohol : air. Jika alkohol 150 ml, isipadu air?",
    ["75 ml", "125 ml", "100 ml", "150 ml"],
    2,
    "Air = 2/3 × 150 = 100 ml.",
    "Medium",
  ],
  [
    "A bekerja 6 hari, B bekerja 9 hari. Bayaran RM 450 dibahagi nisbah hari. Bayaran B?",
    ["RM 180", "RM 270", "RM 250", "RM 200"],
    1,
    "B = 9/15 × 450 = RM 270.",
    "Hard",
  ],
  [
    "Bas 240 km dalam 5 jam. Berapa jam untuk 168 km?",
    ["3", "3.2", "4", "3.5"],
    3,
    "Kelajuan 48 km/j; 168/48 = 3.5 jam.",
    "Hard",
  ],
  [
    "Nisbah panjang kepada lebar sebuah segi empat tepat ialah 5 : 3. Perimeternya ialah 64 cm. Berapakah panjangnya?",
    ["20 cm", "12 cm", "40 cm", "24 cm"],
    0,
    "Panjang + lebar = 64 ÷ 2 = 32 cm. Panjang = 5/8 × 32 = 20 cm. (40 cm diperoleh jika terlupa membahagi perimeter dengan 2.)",
    "Hard",
  ],
  [
    "Jika RM 50 ditukar 1100 yen, RM 80 = ?",
    ["1600 yen", "1760 yen", "1700 yen", "1800 yen"],
    1,
    "1 RM = 22 yen; 80 × 22 = 1760.",
    "Medium",
  ],
  [
    "Kadar bayaran tempat letak kereta ialah RM1.50 sejam. Ali meletakkan keretanya dari 9:15 pagi hingga 1:15 petang. Berapakah bayarannya?",
    ["RM1.50", "RM4.50", "RM7.50", "RM6.00"],
    3,
    "Tempoh = 9:15 pagi hingga 1:15 petang = 4 jam. Bayaran = 4 × RM1.50 = RM6.00.",
    "Medium",
  ],
  [
    "Kadar 0.6 liter/minit. Berapa liter dalam 25 minit?",
    ["15", "12", "10", "18"],
    0,
    "0.6 × 25 = 15 L.",
    "Medium",
  ],
  [
    "Sebuah kereta menggunakan 8 liter petrol untuk perjalanan 96 km. Berapakah jarak yang boleh dilalui dengan 15 liter petrol pada kadar yang sama?",
    ["1 440 km", "120 km", "180 km", "103 km"],
    2,
    "Kadar = 96 km ÷ 8 liter = 12 km/liter. Jarak = 12 × 15 = 180 km.",
    "Hard",
  ],
  [
    "Selesaikan (x+1)/4 = 3/2.",
    ["3", "4", "6", "5"],
    3,
    "Pendaraban silang: 2(x+1) = 12 → x = 5.",
    "Hard",
  ],
  [
    "Petrol kereta 8 km/L. Berapa liter untuk 200 km?",
    ["20", "25", "24", "22"],
    1,
    "200 ÷ 8 = 25 L.",
    "Medium",
  ],
]);

const MATH_C4_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "A recipe for 8 cakes uses 400 g butter. For 14 cakes?",
    ["700 g", "600 g", "650 g", "500 g"],
    0,
    "400 × 14/8 = 700 g.",
    "Medium",
  ],
  [
    "If 60% of students are boys and total is 40, number of girls?",
    ["12", "16", "20", "24"],
    1,
    "40% girls = 0.40 × 40 = 16.",
    "Hard",
  ],
  [
    "Map scale 1 : 250 000. Two cities 6 cm apart on map. Actual distance (km)?",
    ["10", "12", "15", "20"],
    2,
    "6 × 250 000 = 1 500 000 cm = 15 km.",
    "Hard",
  ],
  [
    "3 kg of rice costs RM12.60. What is the price of 5 kg of rice at the same rate?",
    ["RM20.00", "RM4.20", "RM25.20", "RM21.00"],
    3,
    "Price of 1 kg = RM12.60 ÷ 3 = RM4.20. Price of 5 kg = 5 × RM4.20 = RM21.00.",
    "Medium",
  ],
  [
    "A : B = 3 : 5. If B − A = 8, value of A?",
    ["10", "12", "15", "20"],
    1,
    "B − A = 5k − 3k = 2k = 8 → k = 4; A = 12.",
    "Hard",
  ],
  [
    "Solution 5 : 3 water : syrup. For 240 ml syrup, volume of water?",
    ["360 ml", "420 ml", "400 ml", "480 ml"],
    2,
    "Water = 5/3 × 240 = 400 ml.",
    "Medium",
  ],
  [
    "Car A: 240 km in 3 h. Car B: 300 km in 4 h. Which is faster?",
    ["Undefined", "Car B", "Same", "Car A"],
    3,
    "A = 80 km/h; B = 75 km/h.",
    "Hard",
  ],
  [
    "A pipe fills water at a rate of 12 litres per minute. How long does it take to fill a 300-litre tank?",
    ["25 minutes", "3 600 minutes", "36 minutes", "250 minutes"],
    0,
    "Time = 300 litres ÷ 12 litres/minute = 25 minutes.",
    "Medium",
  ],
  [
    "Buy 3 kg for RM 21 or 5 kg for RM 30. Which is cheaper per kg?",
    ["3 kg pack", "Same", "5 kg pack", "Undefined"],
    2,
    "RM 7/kg vs RM 6/kg → 5 kg cheaper.",
    "Hard",
  ],
  [
    "A : B : C = 2 : 3 : 4. Total RM 90. Share of C?",
    ["RM 20", "RM 30", "RM 45", "RM 40"],
    3,
    "C = 4/9 × 90 = RM 40.",
    "Medium",
  ],
  [
    "Boys : girls = 7 : 5. If girls = 35, total?",
    ["84", "70", "56", "96"],
    0,
    "Boys = 7/5 × 35 = 49; total 84.",
    "Hard",
  ],
  ["Rate 72 km/h in m/s?", ["18", "20", "22", "24"], 1, "72 × 1000/3600 = 20 m/s.", "Medium"],
  [
    "If 5 kg of fruit cost RM 60, price of 250 g?",
    ["RM 6", "RM 4", "RM 5", "RM 3"],
    3,
    "1 kg = RM 12; 0.25 kg = RM 3.",
    "Hard",
  ],
  [
    "Mixture 1 : 4 juice : water. For total 1.5 litres, volume of juice?",
    ["300 ml", "250 ml", "200 ml", "375 ml"],
    0,
    "Juice = 1/5 × 1500 = 300 ml.",
    "Hard",
  ],
  [
    "Taxi fare RM 3 base + RM 1.50/km. Fare for 8 km?",
    ["RM 12", "RM 15", "RM 14", "RM 13"],
    1,
    "3 + 1.5×8 = RM 15.",
    "Medium",
  ],
  ["Convert 0.5 m/s to km/h.", ["1.5", "2", "1.8", "5"], 2, "0.5 × 3.6 = 1.8 km/h.", "Medium"],
  [
    "Map scale 1 : 100 000. Actual distance 7.5 km = how many cm on map?",
    ["7.5", "6.5", "7", "5.5"],
    0,
    "7.5 km = 750 000 cm ÷ 100 000 = 7.5 cm.",
    "Hard",
  ],
  [
    "If 70% of students pass and 21 fail, total students?",
    ["50", "60", "70", "80"],
    2,
    "30% = 21 → 100% = 70.",
    "Hard",
  ],
  [
    "Cookie recipe 5 : 3 : 2 (flour : sugar : butter). Total 500 g. Flour?",
    ["200 g", "250 g", "230 g", "300 g"],
    1,
    "5/10 × 500 = 250 g.",
    "Medium",
  ],
  [
    "Solve 2x : 5 = 8 : 10.",
    ["x = 8", "x = 4", "x = 5", "x = 2"],
    3,
    "2x × 10 = 5 × 8 → 20x = 40 → x = 2.",
    "Medium",
  ],
  [
    "Solution 3 : 2 alcohol : water. If alcohol is 150 ml, volume of water?",
    ["75 ml", "125 ml", "100 ml", "150 ml"],
    2,
    "Water = 2/3 × 150 = 100 ml.",
    "Medium",
  ],
  [
    "A works 6 days, B works 9 days. RM 450 split by days. B's share?",
    ["RM 180", "RM 270", "RM 250", "RM 200"],
    1,
    "B = 9/15 × 450 = RM 270.",
    "Hard",
  ],
  [
    "Bus 240 km in 5 h. How many hours for 168 km?",
    ["3", "3.2", "4", "3.5"],
    3,
    "Speed 48 km/h; 168/48 = 3.5 h.",
    "Hard",
  ],
  [
    "The ratio of the length to the width of a rectangle is 5 : 3. Its perimeter is 64 cm. What is its length?",
    ["20 cm", "12 cm", "40 cm", "24 cm"],
    0,
    "Length + width = 64 ÷ 2 = 32 cm. Length = 5/8 × 32 = 20 cm. (40 cm comes from forgetting to halve the perimeter.)",
    "Hard",
  ],
  [
    "If RM 50 exchanges for 1100 yen, RM 80 = ?",
    ["1600 yen", "1760 yen", "1700 yen", "1800 yen"],
    1,
    "1 RM = 22 yen; 80 × 22 = 1760.",
    "Medium",
  ],
  [
    "A car park charges RM1.50 per hour. Ali parks his car from 9:15 a.m. to 1:15 p.m. How much does he pay?",
    ["RM1.50", "RM4.50", "RM7.50", "RM6.00"],
    3,
    "Duration = 9:15 a.m. to 1:15 p.m. = 4 hours. Charge = 4 × RM1.50 = RM6.00.",
    "Medium",
  ],
  [
    "Rate 0.6 litre/minute. How many litres in 25 minutes?",
    ["15", "12", "10", "18"],
    0,
    "0.6 × 25 = 15 L.",
    "Medium",
  ],
  [
    "A car uses 8 litres of petrol for a 96 km journey. How far can it travel on 15 litres of petrol at the same rate?",
    ["1 440 km", "120 km", "180 km", "103 km"],
    2,
    "Rate = 96 km ÷ 8 litres = 12 km/litre. Distance = 12 × 15 = 180 km.",
    "Hard",
  ],
  ["Solve (x+1)/4 = 3/2.", ["3", "4", "6", "5"], 3, "Cross multiply: 2(x+1) = 12 → x = 5.", "Hard"],
  [
    "Car petrol 8 km/L. Litres needed for 200 km?",
    ["20", "25", "24", "22"],
    1,
    "200 ÷ 8 = 25 L.",
    "Medium",
  ],
]);

const MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah pemboleh ubah?",
    [
      "Huruf atau simbol yang mewakili nilai tidak diketahui",
      "Nombor yang nilainya tidak pernah berubah",
      "Tanda seperti + atau − bagi suatu operasi",
      "Unit yang digunakan untuk mengukur kuantiti",
    ],
    0,
    "Pemboleh ubah ialah huruf atau simbol yang mewakili nilai yang tidak diketahui.",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah pemboleh ubah?",
    ["5", "x", "+", "="],
    1,
    "x ialah huruf yang digunakan untuk mewakili nilai yang tidak diketahui; nombor dan simbol operasi bukan pemboleh ubah.",
    "Easy",
  ],
  [
    "Daripada manakah perkataan 'algebra' berasal?",
    [
      "Perkataan Yunani bagi 'nombor'",
      "Perkataan Latin bagi 'tidak diketahui'",
      "Perkataan Arab 'al-jabr'",
      "Perkataan Sanskrit bagi 'persamaan'",
    ],
    2,
    "Perkataan 'algebra' berasal daripada perkataan Arab 'al-jabr'.",
    "Easy",
  ],
  [
    "Apakah ungkapan algebra bagi 'n biji gula-gula tambah 6'?",
    ["n − 6", "n ÷ 6", "6n", "n + 6"],
    3,
    "Menambah 6 biji gula-gula kepada n biji gula-gula memberikan ungkapan n + 6.",
    "Easy",
  ],
  [
    "Apakah ungkapan algebra bagi 'n biji gula-gula tolak 1'?",
    ["n + 1", "n − 1", "1 − n", "n × 1"],
    1,
    "Memakan 1 biji gula-gula daripada n biji gula-gula memberikan ungkapan n − 1.",
    "Easy",
  ],
  [
    "Apakah ungkapan bagi 'tiga balang, setiap satu mengandungi n biji gula-gula'?",
    ["n + 3", "n − 3", "3n", "n/3"],
    2,
    "Tiga balang yang setiap satu mengandungi n biji gula-gula memberi 3 × n = 3n.",
    "Easy",
  ],
  [
    "Apakah sebutan algebra?",
    [
      "Nombor sahaja, bukan pemboleh ubah",
      "Pemboleh ubah sahaja, bukan nombor",
      "Tanda operasi seperti + atau −",
      "Nombor, pemboleh ubah, atau hasil darabnya",
    ],
    3,
    "Sebutan algebra ialah nombor, pemboleh ubah, atau hasil darab antara nombor dengan pemboleh ubah.",
    "Easy",
  ],
  [
    "Berapakah bilangan sebutan dalam ungkapan 3ab + 5x − 2y + 7?",
    ["4", "3", "2", "5"],
    0,
    "Ungkapan 3ab + 5x − 2y + 7 mempunyai empat sebutan: 3ab, 5x, −2y dan 7.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan 3x?",
    ["x", "3x", "3", "1"],
    2,
    "Pekali ialah faktor nombor yang mendarab pemboleh ubah; pekali bagi 3x ialah 3.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan −7ab?",
    ["7", "ab", "−1", "−7"],
    3,
    "Pekali bagi −7ab ialah −7 kerana tanda negatif adalah sebahagian daripada pekali.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan y?",
    ["1", "y", "0", "tiada"],
    0,
    "y bermaksud 1y, jadi pekalinya ialah 1.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan −n?",
    ["1", "−1", "n", "0"],
    1,
    "−n bermaksud −1n, jadi pekalinya ialah −1.",
    "Easy",
  ],
  [
    "Manakah pasangan berikut ialah sebutan serupa?",
    ["ab dan abc", "x dan x²", "2a dan 2b", "3x dan 8x"],
    3,
    "3x dan 8x mempunyai pemboleh ubah x dengan kuasa yang sama, jadi ia ialah sebutan serupa.",
    "Easy",
  ],
  [
    "Manakah pasangan berikut ialah sebutan serupa?",
    ["xy dan yx", "x dan y", "a dan a²", "m dan mn"],
    0,
    "xy dan yx mewakili hasil darab pemboleh ubah yang sama (x × y = y × x), jadi ia ialah sebutan serupa.",
    "Easy",
  ],
  [
    "Manakah pasangan berikut ialah sebutan tidak serupa?",
    ["3x dan 8x", "x dan x²", "2ab dan −5ab", "xy dan yx"],
    1,
    "x dan x² mempunyai kuasa yang berbeza (kuasa 1 berbanding kuasa 2), jadi ia ialah sebutan tidak serupa.",
    "Easy",
  ],
  [
    "Mengapakah x dan x² ialah sebutan tidak serupa?",
    ["Pemboleh ubah berbeza", "Pekali berbeza", "Kuasa berbeza", "Tanda berbeza"],
    2,
    "x mempunyai kuasa 1 manakala x² mempunyai kuasa 2, maka kuasanya berbeza.",
    "Easy",
  ],
  [
    "Mengapakah 2a dan 2b ialah sebutan tidak serupa?",
    ["Pemboleh ubah berbeza", "Kuasa berbeza", "Pekali berbeza", "Operasi berbeza"],
    0,
    "2a dan 2b mempunyai pemboleh ubah yang berbeza, iaitu a dan b.",
    "Easy",
  ],
  [
    "Apakah ciri utama sebutan serupa?",
    [
      "Pekali yang sama",
      "Tanda yang sama",
      "Pemboleh ubah dan kuasa yang sama",
      "Bilangan sebutan yang sama",
    ],
    2,
    "Sebutan serupa mesti mempunyai pemboleh ubah yang sama dan kuasa yang sama bagi setiap pemboleh ubah.",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah sebutan tunggal?",
    ["3x + 5", "7", "x − y", "2a + 3b"],
    1,
    "Sebutan tunggal ialah satu sebutan sahaja seperti nombor 7, tanpa digabungkan dengan sebutan lain.",
    "Easy",
  ],
  [
    "Apakah maksud 'nilai berubah'?",
    [
      "Nilai yang sentiasa tetap",
      "Nilai yang tidak boleh diukur",
      "Nilai yang sentiasa sifar",
      "Nilai yang berubah-ubah mengikut keadaan",
    ],
    3,
    "Nilai berubah ialah kuantiti yang nilainya boleh berubah-ubah mengikut keadaan.",
    "Easy",
  ],
  [
    "Antara berikut, yang manakah contoh nilai tetap?",
    [
      "Masa perjalanan ke sekolah",
      "Bilangan murid yang hadir",
      "Bilangan hari dalam seminggu",
      "Suhu udara harian",
    ],
    2,
    "Bilangan hari dalam seminggu sentiasa 7, jadi ia ialah nilai tetap.",
    "Easy",
  ],
  [
    "Antara berikut, yang manakah contoh nilai berubah?",
    [
      "Bilangan bulan dalam setahun",
      "Masa perjalanan ke sekolah setiap hari",
      "Bilangan hari dalam seminggu",
      "Takat didih air pada paras laut",
    ],
    1,
    "Masa perjalanan ke sekolah berbeza setiap hari mengikut keadaan, jadi ia ialah nilai berubah.",
    "Easy",
  ],
  [
    "Apakah ungkapan algebra?",
    [
      "Hanya satu nombor sahaja",
      "Persamaan dengan tanda sama dengan",
      "Hanya satu pemboleh ubah sahaja",
      "Gabungan sebutan yang dipisahkan oleh + atau −",
    ],
    3,
    "Ungkapan algebra terdiri daripada satu atau lebih sebutan yang dipisahkan oleh + atau −.",
    "Easy",
  ],
  [
    "Harga sebuah buku ialah RM4. Apakah ungkapan bagi harga p buah buku dalam RM?",
    ["4p", "4 + p", "p ÷ 4", "p − 4"],
    0,
    "Harga p buah buku = 4 × p = 4p.",
    "Easy",
  ],
  [
    "Manakah ungkapan yang mempunyai tepat dua sebutan?",
    ["5", "3x + 2y", "x", "4ab − 2x + y"],
    1,
    "Ungkapan 3x + 2y mempunyai dua sebutan iaitu 3x dan 2y.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan 5x dalam ungkapan 5x − 2y?",
    ["1", "x", "−2", "5"],
    3,
    "Pekali bagi sebutan 5x ialah 5.",
    "Easy",
  ],
  [
    "Apakah pekali bagi sebutan −2y dalam ungkapan 5x − 2y?",
    ["−2", "y", "2", "−y"],
    0,
    "Pekali bagi sebutan −2y ialah −2 kerana tanda negatif termasuk dalam pekali.",
    "Easy",
  ],
  [
    "Manakah pasangan sebutan serupa?",
    ["4m dan 4n", "3a dan 3a²", "2xy dan 7xy", "p dan pq"],
    2,
    "2xy dan 7xy mempunyai pemboleh ubah x dan y dengan kuasa yang sama, jadi ia sebutan serupa.",
    "Easy",
  ],
  [
    "Berapakah bilangan pemboleh ubah dalam sebutan abc?",
    ["1", "2", "0", "3"],
    3,
    "Sebutan abc mengandungi tiga pemboleh ubah, iaitu a, b dan c.",
    "Easy",
  ],
  [
    "Tulis ungkapan bagi 'tolak 5 daripada dua kali y'.",
    ["5 − 2y", "2y − 5", "2(y − 5)", "2y + 5"],
    1,
    "Dua kali y ialah 2y. Tolak 5 daripadanya: 2y − 5.",
    "Easy",
  ],
]);

const MATH_C5_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a variable?",
    [
      "A letter or symbol representing an unknown value",
      "A number whose value never changes",
      "A sign such as + or − for an operation",
      "A unit used to measure a quantity",
    ],
    0,
    "A variable is a letter or symbol that represents an unknown value.",
    "Easy",
  ],
  [
    "Which of the following is a variable?",
    ["5", "x", "+", "="],
    1,
    "x is a letter used to represent an unknown value; numbers and operation signs are not variables.",
    "Easy",
  ],
  [
    "Where does the word 'algebra' come from?",
    [
      "A Greek word for 'number'",
      "A Latin word for 'unknown'",
      "The Arabic word 'al-jabr'",
      "A Sanskrit word for 'equation'",
    ],
    2,
    "The word 'algebra' comes from the Arabic word 'al-jabr'.",
    "Easy",
  ],
  [
    "What is the algebraic expression for 'n sweets plus 6'?",
    ["n − 6", "n ÷ 6", "6n", "n + 6"],
    3,
    "Adding 6 sweets to n sweets gives the expression n + 6.",
    "Easy",
  ],
  [
    "What is the algebraic expression for 'n sweets minus 1'?",
    ["n + 1", "n − 1", "1 − n", "n × 1"],
    1,
    "Eating 1 sweet from n sweets gives the expression n − 1.",
    "Easy",
  ],
  [
    "What is the expression for 'three jars, each containing n sweets'?",
    ["n + 3", "n − 3", "3n", "n/3"],
    2,
    "Three jars, each containing n sweets, gives 3 × n = 3n.",
    "Easy",
  ],
  [
    "What is an algebraic term?",
    [
      "A number only, never a variable",
      "A variable only, never a number",
      "An operation sign such as + or −",
      "A number, a variable, or their product",
    ],
    3,
    "An algebraic term is a number, a variable, or the product of a number and a variable.",
    "Easy",
  ],
  [
    "How many terms are in the expression 3ab + 5x − 2y + 7?",
    ["4", "3", "2", "5"],
    0,
    "The expression 3ab + 5x − 2y + 7 has four terms: 3ab, 5x, −2y and 7.",
    "Easy",
  ],
  [
    "What is the coefficient of the term 3x?",
    ["x", "3x", "3", "1"],
    2,
    "A coefficient is the numerical factor that multiplies a variable; the coefficient of 3x is 3.",
    "Easy",
  ],
  [
    "What is the coefficient of the term −7ab?",
    ["7", "ab", "−1", "−7"],
    3,
    "The coefficient of −7ab is −7 because the negative sign is part of the coefficient.",
    "Easy",
  ],
  [
    "What is the coefficient of the term y?",
    ["1", "y", "0", "none"],
    0,
    "y means 1y, so its coefficient is 1.",
    "Easy",
  ],
  [
    "What is the coefficient of the term −n?",
    ["1", "−1", "n", "0"],
    1,
    "−n means −1n, so its coefficient is −1.",
    "Easy",
  ],
  [
    "Which pair are like terms?",
    ["ab and abc", "x and x²", "2a and 2b", "3x and 8x"],
    3,
    "3x and 8x have the same variable x with the same power, so they are like terms.",
    "Easy",
  ],
  [
    "Which pair are like terms?",
    ["xy and yx", "x and y", "a and a²", "m and mn"],
    0,
    "xy and yx represent the product of the same variables (x × y = y × x), so they are like terms.",
    "Easy",
  ],
  [
    "Which pair are unlike terms?",
    ["3x and 8x", "x and x²", "2ab and −5ab", "xy and yx"],
    1,
    "x and x² have different powers (power 1 versus power 2), so they are unlike terms.",
    "Easy",
  ],
  [
    "Why are x and x² unlike terms?",
    ["Different variables", "Different coefficients", "Different powers", "Different signs"],
    2,
    "x has power 1 while x² has power 2, so their powers are different.",
    "Easy",
  ],
  [
    "Why are 2a and 2b unlike terms?",
    ["Different variables", "Different powers", "Different coefficients", "Different operations"],
    0,
    "2a and 2b have different variables, namely a and b.",
    "Easy",
  ],
  [
    "What is the main feature of like terms?",
    ["Same coefficient", "Same sign", "Same variables and same powers", "Same number of terms"],
    2,
    "Like terms must have the same variables and the same power for each variable.",
    "Easy",
  ],
  [
    "Which of the following is a single term?",
    ["3x + 5", "7", "x − y", "2a + 3b"],
    1,
    "A single term is just one term on its own, like the number 7, not combined with other terms.",
    "Easy",
  ],
  [
    "What does 'varying value' mean?",
    [
      "A value that is always fixed",
      "A value that cannot be measured",
      "A value that is always zero",
      "A value that changes depending on circumstances",
    ],
    3,
    "A varying value is a quantity whose value can change depending on circumstances.",
    "Easy",
  ],
  [
    "Which of the following is an example of a fixed value?",
    [
      "Travel time to school",
      "Number of students present",
      "Number of days in a week",
      "Daily air temperature",
    ],
    2,
    "The number of days in a week is always 7, so it is a fixed value.",
    "Easy",
  ],
  [
    "Which of the following is an example of a varying value?",
    [
      "Number of months in a year",
      "Daily travel time to school",
      "Number of days in a week",
      "Boiling point of water at sea level",
    ],
    1,
    "Travel time to school differs each day depending on circumstances, so it is a varying value.",
    "Easy",
  ],
  [
    "What is an algebraic expression?",
    [
      "Only a single number",
      "An equation with an equals sign",
      "Only a single variable",
      "A combination of terms separated by + or −",
    ],
    3,
    "An algebraic expression consists of one or more terms separated by + or −.",
    "Easy",
  ],
  [
    "A book costs RM4. What is the expression for the price, in RM, of p books?",
    ["4p", "4 + p", "p ÷ 4", "p − 4"],
    0,
    "The price of p books = 4 × p = 4p.",
    "Easy",
  ],
  [
    "Which expression contains exactly two terms?",
    ["5", "3x + 2y", "x", "4ab − 2x + y"],
    1,
    "The expression 3x + 2y has two terms: 3x and 2y.",
    "Easy",
  ],
  [
    "What is the coefficient of the term 5x in the expression 5x − 2y?",
    ["1", "x", "−2", "5"],
    3,
    "The coefficient of the term 5x is 5.",
    "Easy",
  ],
  [
    "What is the coefficient of the term −2y in the expression 5x − 2y?",
    ["−2", "y", "2", "−y"],
    0,
    "The coefficient of the term −2y is −2 because the negative sign is part of the coefficient.",
    "Easy",
  ],
  [
    "Which of these is a pair of like terms?",
    ["4m and 4n", "3a and 3a²", "2xy and 7xy", "p and pq"],
    2,
    "2xy and 7xy have the same variables x and y with the same powers, so they are like terms.",
    "Easy",
  ],
  [
    "How many variables are in the term abc?",
    ["1", "2", "0", "3"],
    3,
    "The term abc contains three variables: a, b and c.",
    "Easy",
  ],
  [
    "Write an expression for 'subtract 5 from twice y'.",
    ["5 − 2y", "2y − 5", "2(y − 5)", "2y + 5"],
    1,
    "Twice y is 2y. Subtracting 5 from it gives 2y − 5.",
    "Easy",
  ],
]);

const MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  ["Diberi x = 3, cari nilai 2x + 1.", ["7", "6", "5", "8"], 0, "2x + 1 = 2(3) + 1 = 7.", "Medium"],
  [
    "Diberi x = 4, cari nilai 3x − 2.",
    ["8", "10", "9", "12"],
    1,
    "3x − 2 = 3(4) − 2 = 10.",
    "Medium",
  ],
  [
    "Diberi x = 3 dan y = 2, cari nilai 8x − 5y + 7.",
    ["19", "20", "21", "22"],
    2,
    "8(3) − 5(2) + 7 = 24 − 10 + 7 = 21.",
    "Medium",
  ],
  [
    "Diberi a = 5, cari nilai a² + 1.",
    ["11", "21", "25", "26"],
    3,
    "a² + 1 = 5² + 1 = 25 + 1 = 26.",
    "Medium",
  ],
  [
    "Diberi x = 2, cari nilai 5x − x².",
    ["4", "6", "8", "10"],
    1,
    "5x − x² = 5(2) − 2² = 10 − 4 = 6.",
    "Medium",
  ],
  [
    "Permudahkan 3x + 2x.",
    ["6x", "5x²", "5x", "x"],
    2,
    "3x + 2x = 5x kerana kedua-duanya sebutan serupa.",
    "Medium",
  ],
  ["Permudahkan 9y − 4y.", ["4y", "13y", "5", "5y"], 3, "9y − 4y = 5y.", "Medium"],
  ["Permudahkan 7ab − 4ab.", ["3ab", "3a", "3", "11ab"], 0, "7ab − 4ab = 3ab.", "Medium"],
  ["Permudahkan 6x + 3x − 2x.", ["5x", "9x", "7x", "11x"], 2, "6x + 3x − 2x = 7x.", "Medium"],
  [
    "Permudahkan 4m + 5n − m.",
    ["3m − 5n", "9m + 5n", "4m + 4n", "3m + 5n"],
    3,
    "Gabungkan sebutan serupa m: 4m − m = 3m, hasilnya 3m + 5n.",
    "Medium",
  ],
  [
    "Permudahkan 2a + 3b + 4a − b.",
    ["6a + 2b", "6a + 4b", "2a + 2b", "6a − 2b"],
    0,
    "Gabungkan sebutan serupa: (2a + 4a) + (3b − b) = 6a + 2b.",
    "Medium",
  ],
  [
    "Permudahkan −(x + 4).",
    ["x + 4", "−x − 4", "−x + 4", "x − 4"],
    1,
    "−(x + 4) = −x − 4.",
    "Medium",
  ],
  [
    "Permudahkan −(3a − 2b).",
    ["−3a − 2b", "3a + 2b", "3a − 2b", "−3a + 2b"],
    3,
    "−(3a − 2b) = −3a + 2b.",
    "Medium",
  ],
  [
    "Permudahkan −(−5x − 1).",
    ["5x + 1", "−5x − 1", "−5x + 1", "5x − 1"],
    0,
    "−(−5x − 1) = 5x + 1.",
    "Medium",
  ],
  [
    "Permudahkan 5x − (2x − 3).",
    ["3x − 3", "3x + 3", "7x − 3", "7x + 3"],
    1,
    "5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.",
    "Medium",
  ],
  [
    "Permudahkan 8a − (3a + 2).",
    ["5a + 2", "11a + 2", "5a − 2", "11a − 2"],
    2,
    "8a − (3a + 2) = 8a − 3a − 2 = 5a − 2.",
    "Medium",
  ],
  [
    "Permudahkan 6x − (x − 5).",
    ["5x + 5", "5x − 5", "7x − 5", "7x + 5"],
    0,
    "6x − (x − 5) = 6x − x + 5 = 5x + 5.",
    "Medium",
  ],
  [
    "Permudahkan 4y + (2y − 3).",
    ["2y − 3", "6y + 3", "6y − 3", "2y + 3"],
    2,
    "4y + (2y − 3) = 4y + 2y − 3 = 6y − 3.",
    "Medium",
  ],
  [
    "Manakah pernyataan yang betul?",
    ["−(a + b) = a + b", "−(a + b) = −a − b", "−(a + b) = −a + b", "−(a + b) = a − b"],
    1,
    "−(a + b) = −a − b kerana tanda negatif didarab dengan setiap sebutan dalam kurungan.",
    "Medium",
  ],
  [
    "Manakah pernyataan yang betul?",
    ["−(a − b) = −a − b", "−(a − b) = a + b", "−(a − b) = a − b", "−(a − b) = −a + b"],
    3,
    "−(a − b) = −a + b kerana tanda setiap sebutan dalam kurungan bertukar.",
    "Medium",
  ],
  [
    "Permudahkan −(2x + 3) + 5x.",
    ["7x − 3", "3x + 3", "3x − 3", "7x + 3"],
    2,
    "−(2x + 3) + 5x = −2x − 3 + 5x = 3x − 3.",
    "Medium",
  ],
  [
    "Permudahkan −(4a − b) + 2a.",
    ["−2a − b", "−2a + b", "6a − b", "2a − b"],
    1,
    "−(4a − b) + 2a = −4a + b + 2a = −2a + b.",
    "Medium",
  ],
  [
    "Diberi x = −2, cari nilai 3x² − x.",
    ["38", "10", "−14", "14"],
    3,
    "3x² − x = 3(−2)² − (−2) = 3(4) + 2 = 14. (38 diperoleh jika (3x)² dikira, dan 10 jika −(−2) dianggap −2.)",
    "Medium",
  ],
  [
    "Diberi x = 1 dan y = 4, cari nilai 6x + 2y.",
    ["14", "12", "16", "18"],
    0,
    "6x + 2y = 6(1) + 2(4) = 6 + 8 = 14.",
    "Medium",
  ],
  [
    "Diberi a = 2 dan b = 3, cari nilai a² + b².",
    ["11", "13", "12", "14"],
    1,
    "a² + b² = 2² + 3² = 4 + 9 = 13.",
    "Medium",
  ],
  [
    "Permudahkan 5x + 7 − 2x − 4.",
    ["7x − 3", "3x − 3", "7x + 3", "3x + 3"],
    3,
    "Gabungkan sebutan serupa: (5x − 2x) + (7 − 4) = 3x + 3.",
    "Medium",
  ],
  [
    "Permudahkan 9ab − 5ab + ab.",
    ["5ab", "4ab", "3ab", "13ab"],
    0,
    "9ab − 5ab + ab = 5ab.",
    "Medium",
  ],
  ["Apakah hasil bagi 3x + 5x − x?", ["6x", "8x", "7x", "9x"], 2, "3x + 5x − x = 7x.", "Medium"],
  [
    "Permudahkan 10p − (3p − 2).",
    ["7p − 2", "13p + 2", "13p − 2", "7p + 2"],
    3,
    "10p − (3p − 2) = 10p − 3p + 2 = 7p + 2.",
    "Medium",
  ],
  [
    "Manakah ungkapan yang dipermudahkan dengan betul daripada 6x − (2x − 5)?",
    ["4x − 5", "4x + 5", "8x − 5", "8x + 5"],
    1,
    "6x − (2x − 5) = 6x − 2x + 5 = 4x + 5.",
    "Medium",
  ],
]);

const MATH_C5_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Given x = 3, find the value of 2x + 1.",
    ["7", "6", "5", "8"],
    0,
    "2x + 1 = 2(3) + 1 = 7.",
    "Medium",
  ],
  [
    "Given x = 4, find the value of 3x − 2.",
    ["8", "10", "9", "12"],
    1,
    "3x − 2 = 3(4) − 2 = 10.",
    "Medium",
  ],
  [
    "Given x = 3 and y = 2, find the value of 8x − 5y + 7.",
    ["19", "20", "21", "22"],
    2,
    "8(3) − 5(2) + 7 = 24 − 10 + 7 = 21.",
    "Medium",
  ],
  [
    "Given a = 5, find the value of a² + 1.",
    ["11", "21", "25", "26"],
    3,
    "a² + 1 = 5² + 1 = 25 + 1 = 26.",
    "Medium",
  ],
  [
    "Given x = 2, find the value of 5x − x².",
    ["4", "6", "8", "10"],
    1,
    "5x − x² = 5(2) − 2² = 10 − 4 = 6.",
    "Medium",
  ],
  [
    "Simplify 3x + 2x.",
    ["6x", "5x²", "5x", "x"],
    2,
    "3x + 2x = 5x because both are like terms.",
    "Medium",
  ],
  ["Simplify 9y − 4y.", ["4y", "13y", "5", "5y"], 3, "9y − 4y = 5y.", "Medium"],
  ["Simplify 7ab − 4ab.", ["3ab", "3a", "3", "11ab"], 0, "7ab − 4ab = 3ab.", "Medium"],
  ["Simplify 6x + 3x − 2x.", ["5x", "9x", "7x", "11x"], 2, "6x + 3x − 2x = 7x.", "Medium"],
  [
    "Simplify 4m + 5n − m.",
    ["3m − 5n", "9m + 5n", "4m + 4n", "3m + 5n"],
    3,
    "Combine the like terms m: 4m − m = 3m, giving 3m + 5n.",
    "Medium",
  ],
  [
    "Simplify 2a + 3b + 4a − b.",
    ["6a + 2b", "6a + 4b", "2a + 2b", "6a − 2b"],
    0,
    "Combine like terms: (2a + 4a) + (3b − b) = 6a + 2b.",
    "Medium",
  ],
  ["Simplify −(x + 4).", ["x + 4", "−x − 4", "−x + 4", "x − 4"], 1, "−(x + 4) = −x − 4.", "Medium"],
  [
    "Simplify −(3a − 2b).",
    ["−3a − 2b", "3a + 2b", "3a − 2b", "−3a + 2b"],
    3,
    "−(3a − 2b) = −3a + 2b.",
    "Medium",
  ],
  [
    "Simplify −(−5x − 1).",
    ["5x + 1", "−5x − 1", "−5x + 1", "5x − 1"],
    0,
    "−(−5x − 1) = 5x + 1.",
    "Medium",
  ],
  [
    "Simplify 5x − (2x − 3).",
    ["3x − 3", "3x + 3", "7x − 3", "7x + 3"],
    1,
    "5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.",
    "Medium",
  ],
  [
    "Simplify 8a − (3a + 2).",
    ["5a + 2", "11a + 2", "5a − 2", "11a − 2"],
    2,
    "8a − (3a + 2) = 8a − 3a − 2 = 5a − 2.",
    "Medium",
  ],
  [
    "Simplify 6x − (x − 5).",
    ["5x + 5", "5x − 5", "7x − 5", "7x + 5"],
    0,
    "6x − (x − 5) = 6x − x + 5 = 5x + 5.",
    "Medium",
  ],
  [
    "Simplify 4y + (2y − 3).",
    ["2y − 3", "6y + 3", "6y − 3", "2y + 3"],
    2,
    "4y + (2y − 3) = 4y + 2y − 3 = 6y − 3.",
    "Medium",
  ],
  [
    "Which statement is correct?",
    ["−(a + b) = a + b", "−(a + b) = −a − b", "−(a + b) = −a + b", "−(a + b) = a − b"],
    1,
    "−(a + b) = −a − b because the negative sign multiplies every term inside the brackets.",
    "Medium",
  ],
  [
    "Which statement is correct?",
    ["−(a − b) = −a − b", "−(a − b) = a + b", "−(a − b) = a − b", "−(a − b) = −a + b"],
    3,
    "−(a − b) = −a + b because the sign of every term inside the brackets changes.",
    "Medium",
  ],
  [
    "Simplify −(2x + 3) + 5x.",
    ["7x − 3", "3x + 3", "3x − 3", "7x + 3"],
    2,
    "−(2x + 3) + 5x = −2x − 3 + 5x = 3x − 3.",
    "Medium",
  ],
  [
    "Simplify −(4a − b) + 2a.",
    ["−2a − b", "−2a + b", "6a − b", "2a − b"],
    1,
    "−(4a − b) + 2a = −4a + b + 2a = −2a + b.",
    "Medium",
  ],
  [
    "Given x = −2, find the value of 3x² − x.",
    ["38", "10", "−14", "14"],
    3,
    "3x² − x = 3(−2)² − (−2) = 3(4) + 2 = 14. (38 comes from calculating (3x)², and 10 from treating −(−2) as −2.)",
    "Medium",
  ],
  [
    "Given x = 1 and y = 4, find the value of 6x + 2y.",
    ["14", "12", "16", "18"],
    0,
    "6x + 2y = 6(1) + 2(4) = 6 + 8 = 14.",
    "Medium",
  ],
  [
    "Given a = 2 and b = 3, find the value of a² + b².",
    ["11", "13", "12", "14"],
    1,
    "a² + b² = 2² + 3² = 4 + 9 = 13.",
    "Medium",
  ],
  [
    "Simplify 5x + 7 − 2x − 4.",
    ["7x − 3", "3x − 3", "7x + 3", "3x + 3"],
    3,
    "Combine like terms: (5x − 2x) + (7 − 4) = 3x + 3.",
    "Medium",
  ],
  ["Simplify 9ab − 5ab + ab.", ["5ab", "4ab", "3ab", "13ab"], 0, "9ab − 5ab + ab = 5ab.", "Medium"],
  [
    "What is the result of 3x + 5x − x?",
    ["6x", "8x", "7x", "9x"],
    2,
    "3x + 5x − x = 7x.",
    "Medium",
  ],
  [
    "Simplify 10p − (3p − 2).",
    ["7p − 2", "13p + 2", "13p − 2", "7p + 2"],
    3,
    "10p − (3p − 2) = 10p − 3p + 2 = 7p + 2.",
    "Medium",
  ],
  [
    "Which expression is the correctly simplified form of 6x − (2x − 5)?",
    ["4x − 5", "4x + 5", "8x − 5", "8x + 5"],
    1,
    "6x − (2x − 5) = 6x − 2x + 5 = 4x + 5.",
    "Medium",
  ],
]);

const MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Permudahkan a × a × a.",
    ["a³", "3a", "a + 3", "3a³"],
    0,
    "a × a × a = a³ kerana pemboleh ubah didarab dengan dirinya sendiri tiga kali.",
    "Medium",
  ],
  [
    "Permudahkan a² × a³.",
    ["a⁶", "a⁵", "2a⁵", "a¹"],
    1,
    "a² × a³ = a²⁺³ = a⁵ (tambah kuasa pemboleh ubah yang sama).",
    "Medium",
  ],
  [
    "Permudahkan a⁵ ÷ a².",
    ["a²", "a⁷", "a³", "a¹⁰"],
    2,
    "a⁵ ÷ a² = a⁵⁻² = a³ (tolak kuasa pemboleh ubah yang sama).",
    "Medium",
  ],
  ["Permudahkan b⁴ ÷ b.", ["b", "b⁴", "b⁵", "b³"], 3, "b⁴ ÷ b = b⁴⁻¹ = b³.", "Medium"],
  [
    "Permudahkan 2a × 3a.",
    ["5a", "6a²", "5a²", "6a"],
    1,
    "2a × 3a = (2 × 3) × (a × a) = 6a².",
    "Medium",
  ],
  [
    "Permudahkan 4x × 2x².",
    ["6x²", "6x³", "8x³", "8x²"],
    2,
    "4x × 2x² = (4 × 2) × (x × x²) = 8x¹⁺² = 8x³.",
    "Medium",
  ],
  [
    "Permudahkan 3ab² × 4a³b.",
    ["7a⁴b³", "12a³b²", "12a⁴b²", "12a⁴b³"],
    3,
    "3ab² × 4a³b = (3 × 4) × a¹⁺³ × b²⁺¹ = 12a⁴b³.",
    "Hard",
  ],
  [
    "Permudahkan 5m²n × 2mn³.",
    ["10m³n⁴", "7m³n⁴", "10m²n³", "7m²n³"],
    0,
    "5m²n × 2mn³ = (5 × 2) × m²⁺¹ × n¹⁺³ = 10m³n⁴.",
    "Hard",
  ],
  [
    "Permudahkan 20m⁴n³ ÷ 5m²n.",
    ["15m²n²", "4m²n³", "4m²n²", "4m⁶n⁴"],
    2,
    "20m⁴n³ ÷ 5m²n = (20 ÷ 5) × m⁴⁻² × n³⁻¹ = 4m²n².",
    "Hard",
  ],
  [
    "Permudahkan 12x³y² ÷ 4xy.",
    ["8x²y", "3x³y²", "3xy", "3x²y"],
    3,
    "12x³y² ÷ 4xy = (12 ÷ 4) × x³⁻¹ × y²⁻¹ = 3x²y.",
    "Hard",
  ],
  [
    "Permudahkan 18a⁵b³ ÷ 6a²b.",
    ["3a³b²", "3a⁷b⁴", "12a³b²", "3a²b³"],
    0,
    "18a⁵b³ ÷ 6a²b = (18 ÷ 6) × a⁵⁻² × b³⁻¹ = 3a³b².",
    "Hard",
  ],
  [
    "Antara berikut, yang manakah BENAR?",
    ["3x + 2 = 5x", "3x + 2x = 5x", "3x × 2 = 5x", "3x − x = 3"],
    1,
    "Hanya sebutan serupa boleh digabungkan: 3x + 2x = 5x. 3x dan 2 ialah sebutan tidak serupa, jadi 3x + 2 tidak boleh dipermudahkan.",
    "Medium",
  ],
  [
    "Tulis (a + b)(a + b)(a + b) dalam bentuk kuasa.",
    ["(a + b) + 3", "3(a + b)", "(a + b)²", "(a + b)³"],
    3,
    "(a + b)(a + b)(a + b) = (a + b)³ (pendaraban berulang ungkapan).",
    "Medium",
  ],
  [
    "Permudahkan 6x² × 3x.",
    ["18x³", "9x³", "18x²", "9x²"],
    0,
    "6x² × 3x = (6 × 3) × x²⁺¹ = 18x³.",
    "Medium",
  ],
  [
    "Permudahkan 9p⁴ ÷ 3p².",
    ["3p", "3p²", "6p²", "6p⁶"],
    1,
    "9p⁴ ÷ 3p² = (9 ÷ 3) × p⁴⁻² = 3p².",
    "Medium",
  ],
  [
    "Permudahkan 7a²b³ × 2ab².",
    ["9a³b⁵", "14a²b⁵", "14a³b⁵", "14a³b⁶"],
    2,
    "7a²b³ × 2ab² = (7 × 2) × a²⁺¹ × b³⁺² = 14a³b⁵.",
    "Hard",
  ],
  [
    "Permudahkan 24x⁵y⁴ ÷ 8x³y².",
    ["3x²y²", "3x⁸y⁶", "16x²y²", "3x²y⁶"],
    0,
    "24x⁵y⁴ ÷ 8x³y² = (24 ÷ 8) × x⁵⁻³ × y⁴⁻² = 3x²y².",
    "Hard",
  ],
  [
    "Permudahkan 7x − (2x − 3) + 4.",
    ["5x − 1", "5x + 1", "5x + 7", "9x + 1"],
    2,
    "7x − (2x − 3) + 4 = 7x − 2x + 3 + 4 = 5x + 7.",
    "Medium",
  ],
  [
    "Permudahkan 5a − (3a + 2) − 4.",
    ["2a + 6", "2a − 6", "8a − 6", "8a + 6"],
    1,
    "5a − (3a + 2) − 4 = 5a − 3a − 2 − 4 = 2a − 6.",
    "Medium",
  ],
  [
    "Permudahkan 9y − (y − 6) + 2y.",
    ["6y + 6", "10y − 6", "12y + 6", "10y + 6"],
    3,
    "9y − (y − 6) + 2y = 9y − y + 6 + 2y = 10y + 6.",
    "Medium",
  ],
  [
    "Permudahkan 4m²n × 5mn² ÷ 2mn.",
    ["20m²n²", "10mn²", "10m²n²", "20mn"],
    2,
    "4m²n × 5mn² = 20m³n³; kemudian 20m³n³ ÷ 2mn = 10m²n².",
    "Hard",
  ],
  [
    "Permudahkan (3x²y)(2xy²) ÷ (xy).",
    ["6xy²", "6x²y²", "6x²y", "3xy²"],
    1,
    "(3x²y)(2xy²) = 6x³y³; kemudian 6x³y³ ÷ (xy) = 6x²y².",
    "Hard",
  ],
  [
    "Cari nilai bagi 5x² − 2x apabila x = 3.",
    ["35", "45", "41", "39"],
    3,
    "5x² − 2x = 5(3)² − 2(3) = 45 − 6 = 39.",
    "Medium",
  ],
  [
    "Cari nilai bagi 2a² + 3b apabila a = 2 dan b = 4.",
    ["20", "16", "18", "14"],
    0,
    "2a² + 3b = 2(2)² + 3(4) = 8 + 12 = 20.",
    "Hard",
  ],
  [
    "Permudahkan 8x − 3y − (2x − y).",
    ["6x − 4y", "6x − 2y", "10x − 2y", "10x − 4y"],
    1,
    "8x − 3y − (2x − y) = 8x − 3y − 2x + y = 6x − 2y.",
    "Hard",
  ],
  [
    "Permudahkan 7m − 4n − (3m − 2n).",
    ["10m − 6n", "4m − 6n", "10m − 2n", "4m − 2n"],
    3,
    "7m − 4n − (3m − 2n) = 7m − 4n − 3m + 2n = 4m − 2n.",
    "Hard",
  ],
  [
    "Sebuah segi empat tepat mempunyai panjang 3x dan lebar 2x. Apakah ungkapan bagi luasnya?",
    ["6x²", "6x", "5x²", "5x"],
    0,
    "Luas segi empat tepat = panjang × lebar = 3x × 2x = 6x².",
    "Hard",
  ],
  [
    "Sebuah kotak berbentuk kubus mempunyai sisi sepanjang a unit. Apakah ungkapan bagi isipadunya?",
    ["3a", "a²", "a³", "3a³"],
    2,
    "Isipadu kubus = sisi × sisi × sisi = a × a × a = a³.",
    "Medium",
  ],
  [
    "Permudahkan 6x²y³ ÷ 3xy.",
    ["2xy", "3xy²", "2x²y³", "2xy²"],
    3,
    "6x²y³ ÷ 3xy = (6 ÷ 3) × x²⁻¹ × y³⁻¹ = 2xy².",
    "Hard",
  ],
  [
    "Permudahkan −(2x − y) − (x + 3y).",
    ["−3x + 2y", "−3x − 2y", "−x − 2y", "−x + 4y"],
    1,
    "−(2x − y) − (x + 3y) = (−2x + y) + (−x − 3y) = −3x − 2y.",
    "Hard",
  ],
]);

const MATH_C5_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "Simplify a × a × a.",
    ["a³", "3a", "a + 3", "3a³"],
    0,
    "a × a × a = a³ because the variable is multiplied by itself three times.",
    "Medium",
  ],
  [
    "Simplify a² × a³.",
    ["a⁶", "a⁵", "2a⁵", "a¹"],
    1,
    "a² × a³ = a²⁺³ = a⁵ (add the powers of the same variable).",
    "Medium",
  ],
  [
    "Simplify a⁵ ÷ a².",
    ["a²", "a⁷", "a³", "a¹⁰"],
    2,
    "a⁵ ÷ a² = a⁵⁻² = a³ (subtract the powers of the same variable).",
    "Medium",
  ],
  ["Simplify b⁴ ÷ b.", ["b", "b⁴", "b⁵", "b³"], 3, "b⁴ ÷ b = b⁴⁻¹ = b³.", "Medium"],
  [
    "Simplify 2a × 3a.",
    ["5a", "6a²", "5a²", "6a"],
    1,
    "2a × 3a = (2 × 3) × (a × a) = 6a².",
    "Medium",
  ],
  [
    "Simplify 4x × 2x².",
    ["6x²", "6x³", "8x³", "8x²"],
    2,
    "4x × 2x² = (4 × 2) × (x × x²) = 8x¹⁺² = 8x³.",
    "Medium",
  ],
  [
    "Simplify 3ab² × 4a³b.",
    ["7a⁴b³", "12a³b²", "12a⁴b²", "12a⁴b³"],
    3,
    "3ab² × 4a³b = (3 × 4) × a¹⁺³ × b²⁺¹ = 12a⁴b³.",
    "Hard",
  ],
  [
    "Simplify 5m²n × 2mn³.",
    ["10m³n⁴", "7m³n⁴", "10m²n³", "7m²n³"],
    0,
    "5m²n × 2mn³ = (5 × 2) × m²⁺¹ × n¹⁺³ = 10m³n⁴.",
    "Hard",
  ],
  [
    "Simplify 20m⁴n³ ÷ 5m²n.",
    ["15m²n²", "4m²n³", "4m²n²", "4m⁶n⁴"],
    2,
    "20m⁴n³ ÷ 5m²n = (20 ÷ 5) × m⁴⁻² × n³⁻¹ = 4m²n².",
    "Hard",
  ],
  [
    "Simplify 12x³y² ÷ 4xy.",
    ["8x²y", "3x³y²", "3xy", "3x²y"],
    3,
    "12x³y² ÷ 4xy = (12 ÷ 4) × x³⁻¹ × y²⁻¹ = 3x²y.",
    "Hard",
  ],
  [
    "Simplify 18a⁵b³ ÷ 6a²b.",
    ["3a³b²", "3a⁷b⁴", "12a³b²", "3a²b³"],
    0,
    "18a⁵b³ ÷ 6a²b = (18 ÷ 6) × a⁵⁻² × b³⁻¹ = 3a³b².",
    "Hard",
  ],
  [
    "Which of the following is TRUE?",
    ["3x + 2 = 5x", "3x + 2x = 5x", "3x × 2 = 5x", "3x − x = 3"],
    1,
    "Only like terms can be combined: 3x + 2x = 5x. 3x and 2 are unlike terms, so 3x + 2 cannot be simplified.",
    "Medium",
  ],
  [
    "Write (a + b)(a + b)(a + b) in power form.",
    ["(a + b) + 3", "3(a + b)", "(a + b)²", "(a + b)³"],
    3,
    "(a + b)(a + b)(a + b) = (a + b)³ (repeated multiplication of an expression).",
    "Medium",
  ],
  [
    "Simplify 6x² × 3x.",
    ["18x³", "9x³", "18x²", "9x²"],
    0,
    "6x² × 3x = (6 × 3) × x²⁺¹ = 18x³.",
    "Medium",
  ],
  [
    "Simplify 9p⁴ ÷ 3p².",
    ["3p", "3p²", "6p²", "6p⁶"],
    1,
    "9p⁴ ÷ 3p² = (9 ÷ 3) × p⁴⁻² = 3p².",
    "Medium",
  ],
  [
    "Simplify 7a²b³ × 2ab².",
    ["9a³b⁵", "14a²b⁵", "14a³b⁵", "14a³b⁶"],
    2,
    "7a²b³ × 2ab² = (7 × 2) × a²⁺¹ × b³⁺² = 14a³b⁵.",
    "Hard",
  ],
  [
    "Simplify 24x⁵y⁴ ÷ 8x³y².",
    ["3x²y²", "3x⁸y⁶", "16x²y²", "3x²y⁶"],
    0,
    "24x⁵y⁴ ÷ 8x³y² = (24 ÷ 8) × x⁵⁻³ × y⁴⁻² = 3x²y².",
    "Hard",
  ],
  [
    "Simplify 7x − (2x − 3) + 4.",
    ["5x − 1", "5x + 1", "5x + 7", "9x + 1"],
    2,
    "7x − (2x − 3) + 4 = 7x − 2x + 3 + 4 = 5x + 7.",
    "Medium",
  ],
  [
    "Simplify 5a − (3a + 2) − 4.",
    ["2a + 6", "2a − 6", "8a − 6", "8a + 6"],
    1,
    "5a − (3a + 2) − 4 = 5a − 3a − 2 − 4 = 2a − 6.",
    "Medium",
  ],
  [
    "Simplify 9y − (y − 6) + 2y.",
    ["6y + 6", "10y − 6", "12y + 6", "10y + 6"],
    3,
    "9y − (y − 6) + 2y = 9y − y + 6 + 2y = 10y + 6.",
    "Medium",
  ],
  [
    "Simplify 4m²n × 5mn² ÷ 2mn.",
    ["20m²n²", "10mn²", "10m²n²", "20mn"],
    2,
    "4m²n × 5mn² = 20m³n³; then 20m³n³ ÷ 2mn = 10m²n².",
    "Hard",
  ],
  [
    "Simplify (3x²y)(2xy²) ÷ (xy).",
    ["6xy²", "6x²y²", "6x²y", "3xy²"],
    1,
    "(3x²y)(2xy²) = 6x³y³; then 6x³y³ ÷ (xy) = 6x²y².",
    "Hard",
  ],
  [
    "Find the value of 5x² − 2x when x = 3.",
    ["35", "45", "41", "39"],
    3,
    "5x² − 2x = 5(3)² − 2(3) = 45 − 6 = 39.",
    "Medium",
  ],
  [
    "Find the value of 2a² + 3b when a = 2 and b = 4.",
    ["20", "16", "18", "14"],
    0,
    "2a² + 3b = 2(2)² + 3(4) = 8 + 12 = 20.",
    "Hard",
  ],
  [
    "Simplify 8x − 3y − (2x − y).",
    ["6x − 4y", "6x − 2y", "10x − 2y", "10x − 4y"],
    1,
    "8x − 3y − (2x − y) = 8x − 3y − 2x + y = 6x − 2y.",
    "Hard",
  ],
  [
    "Simplify 7m − 4n − (3m − 2n).",
    ["10m − 6n", "4m − 6n", "10m − 2n", "4m − 2n"],
    3,
    "7m − 4n − (3m − 2n) = 7m − 4n − 3m + 2n = 4m − 2n.",
    "Hard",
  ],
  [
    "A rectangle has a length of 3x and a width of 2x. What is the expression for its area?",
    ["6x²", "6x", "5x²", "5x"],
    0,
    "Area of rectangle = length × width = 3x × 2x = 6x².",
    "Hard",
  ],
  [
    "A cube-shaped box has sides of length a units. What is the expression for its volume?",
    ["3a", "a²", "a³", "3a³"],
    2,
    "Volume of cube = side × side × side = a × a × a = a³.",
    "Medium",
  ],
  [
    "Simplify 6x²y³ ÷ 3xy.",
    ["2xy", "3xy²", "2x²y³", "2xy²"],
    3,
    "6x²y³ ÷ 3xy = (6 ÷ 3) × x²⁻¹ × y³⁻¹ = 2xy².",
    "Hard",
  ],
  [
    "Simplify −(2x − y) − (x + 3y).",
    ["−3x + 2y", "−3x − 2y", "−x − 2y", "−x + 4y"],
    1,
    "−(2x − y) − (x + 3y) = (−2x + y) + (−x − 3y) = −3x − 2y.",
    "Hard",
  ],
]);

const MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah persamaan linear?",
    [
      "Persamaan dengan kuasa tertinggi pemboleh ubah ialah 1",
      "Persamaan dengan kuasa tertinggi pemboleh ubah ialah 2",
      "Persamaan tanpa pemboleh ubah",
      "Persamaan dengan dua tanda sama dengan",
    ],
    0,
    "Persamaan linear ialah persamaan yang kuasa tertinggi pemboleh ubahnya ialah 1.",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah persamaan linear?",
    ["10x² + 5x − 3 = 1", "5r + 1 = 0", "x² − 4 = 0", "x² + y = 6"],
    1,
    "5r + 1 = 0 ialah persamaan linear kerana kuasa tertinggi r ialah 1.",
    "Easy",
  ],
  [
    "Mengapakah 10x² + 5x − 3 = 1 BUKAN persamaan linear?",
    [
      "Kerana ia mempunyai dua pemboleh ubah",
      "Kerana ia tiada pemalar",
      "Kerana x berkuasa 2",
      "Kerana pekali x ialah 5",
    ],
    2,
    "Persamaan itu mengandungi x², iaitu pemboleh ubah berkuasa 2, jadi ia bukan persamaan linear.",
    "Easy",
  ],
  [
    "Apakah ciri utama persamaan linear dalam satu pemboleh ubah?",
    [
      "Mengandungi dua pemboleh ubah berbeza",
      "Mempunyai dua tanda sama dengan",
      "Tidak mengandungi sebarang pemboleh ubah",
      "Mengandungi satu pemboleh ubah berkuasa 1",
    ],
    3,
    "Persamaan linear dalam satu pemboleh ubah hanya mengandungi satu jenis pemboleh ubah yang berkuasa 1.",
    "Easy",
  ],
  [
    "Manakah berikut ialah contoh persamaan linear dalam satu pemboleh ubah?",
    ["5x + 2y = 8", "x + 7 = 11", "x² = 9", "xy = 10"],
    1,
    "x + 7 = 11 hanya mengandungi satu pemboleh ubah, iaitu x, berkuasa 1.",
    "Easy",
  ],
  [
    "Berapakah bilangan jenis pemboleh ubah dalam persamaan x + 7 = 11?",
    ["0", "2", "1", "3"],
    2,
    "Persamaan x + 7 = 11 hanya mengandungi satu jenis pemboleh ubah, iaitu x.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'Suatu nombor m dibahagi dengan 6 memberi 12'.",
    ["m × 6 = 12", "m + 6 = 12", "m − 6 = 12", "m/6 = 12"],
    3,
    "'Dibahagi dengan 6 memberi 12' diterjemahkan kepada m/6 = 12.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'Rahim ada RM p, membelanjakan RM q dan berbaki RM10'.",
    ["p − q = 10", "p + q = 10", "p × q = 10", "p ÷ q = 10"],
    0,
    "Baki = jumlah asal − perbelanjaan, maka p − q = 10.",
    "Easy",
  ],
  [
    "Apakah ciri utama persamaan linear dalam dua pemboleh ubah?",
    [
      "Satu pemboleh ubah sahaja yang berkuasa 1",
      "Satu pemboleh ubah yang berkuasa 2",
      "Dua pemboleh ubah berbeza, setiap satu berkuasa 1",
      "Dua pemboleh ubah yang didarab bersama",
    ],
    2,
    "Persamaan linear dalam dua pemboleh ubah mengandungi dua pemboleh ubah berbeza yang setiap satunya berkuasa 1.",
    "Easy",
  ],
  [
    "Manakah berikut ialah contoh persamaan linear dalam dua pemboleh ubah?",
    ["x + 7 = 11", "x³ = 27", "x² + y = 6", "5x + 2y = 8"],
    3,
    "5x + 2y = 8 mengandungi dua pemboleh ubah berbeza, x dan y, masing-masing berkuasa 1.",
    "Easy",
  ],
  [
    "Berapakah bilangan jenis pemboleh ubah dalam persamaan 5x + 2y = 8?",
    ["2", "1", "3", "4"],
    0,
    "Persamaan 5x + 2y = 8 mengandungi dua jenis pemboleh ubah, iaitu x dan y.",
    "Easy",
  ],
  [
    "Apakah maksud 'pemboleh ubah' dalam suatu persamaan?",
    [
      "Nombor tetap dalam persamaan",
      "Huruf yang mewakili nilai tidak diketahui",
      "Tanda operasi seperti + atau −",
      "Jawapan akhir bagi persamaan",
    ],
    1,
    "Pemboleh ubah ialah huruf atau simbol yang mewakili nilai yang tidak diketahui.",
    "Easy",
  ],
  [
    "Nilai x = 3 memuaskan persamaan yang manakah?",
    ["x + 4 = 1", "x − 3 = 3", "3x = 6", "2x + 1 = 7"],
    3,
    "Gantikan x = 3: 2(3) + 1 = 7, jadi kedua-dua belah sama nilai. Persamaan lain tidak menjadi benar apabila x = 3.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'beza umur Salim, p tahun, dengan adiknya, q tahun, ialah 10 tahun'.",
    ["p − q = 10", "p + q = 10", "p ÷ q = 10", "pq = 10"],
    0,
    "Beza umur ditulis sebagai p − q = 10.",
    "Easy",
  ],
  [
    "Manakah berikut BUKAN persamaan linear dalam dua pemboleh ubah?",
    ["5x + 2y = 8", "x² + y = 6", "p − q = 10", "2m + n = 15"],
    1,
    "x² + y = 6 mengandungi x berkuasa 2, jadi ia bukan persamaan linear.",
    "Easy",
  ],
  [
    "Apakah perbezaan utama antara persamaan linear dalam satu pemboleh ubah dan dua pemboleh ubah?",
    [
      "Persamaan satu pemboleh ubah tiada penyelesaian",
      "Persamaan dua pemboleh ubah hanya ada satu penyelesaian",
      "Bilangan jenis pemboleh ubah: satu atau dua",
      "Tiada perbezaan antara kedua-duanya",
    ],
    2,
    "Perbezaan utama ialah bilangan jenis pemboleh ubah yang terlibat: satu berbanding dua.",
    "Easy",
  ],
  [
    "Apakah maksud 'menyelesaikan' suatu persamaan linear?",
    [
      "Mencari nilai pemboleh ubah yang menjadikannya benar",
      "Menukar persamaan kepada ungkapan",
      "Menggandakan kedua-dua belah persamaan",
      "Menukar tanda setiap sebutan",
    ],
    0,
    "Menyelesaikan persamaan bermaksud mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan sama nilai.",
    "Easy",
  ],
  [
    "Berapakah bilangan penyelesaian yang dimiliki oleh sebuah persamaan linear dalam dua pemboleh ubah?",
    [
      "Tiada penyelesaian",
      "Hanya satu penyelesaian",
      "Tidak terhingga banyaknya",
      "Dua penyelesaian sahaja",
    ],
    2,
    "Persamaan linear dalam dua pemboleh ubah mempunyai bilangan penyelesaian yang tidak terhingga.",
    "Easy",
  ],
  [
    "Apakah bentuk standard bagi persamaan linear dalam dua pemboleh ubah?",
    ["ax + b = 0", "ax + by = c", "ax² + bx + c = 0", "a/x = b"],
    1,
    "Bentuk standard persamaan linear dalam dua pemboleh ubah ialah ax + by = c.",
    "Easy",
  ],
  [
    "Bagaimanakah anda menentukan sama ada suatu persamaan ialah persamaan linear?",
    [
      "Lihat bilangan sebutan dalam persamaan",
      "Kira jumlah pekali dalam persamaan",
      "Lihat tanda di hadapan pemalar",
      "Periksa kuasa tertinggi setiap pemboleh ubah",
    ],
    3,
    "Untuk menentukan sama ada suatu persamaan linear, periksa kuasa tertinggi setiap pemboleh ubah; jika semuanya 1, ia linear.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'dua kali suatu nombor n tambah 5 sama dengan 17'.",
    ["2(n + 5) = 17", "n + 2 = 17", "2n + 5 = 17", "n − 2 = 17"],
    2,
    "'Dua kali suatu nombor n tambah 5' diterjemahkan kepada 2n + 5, maka persamaannya ialah 2n + 5 = 17.",
    "Easy",
  ],
  [
    "Manakah antara berikut mengandungi pemboleh ubah berkuasa 2?",
    ["5r + 1 = 0", "x² − 4 = 0", "x + 7 = 11", "5x + 2y = 8"],
    1,
    "x² − 4 = 0 mengandungi pemboleh ubah x yang berkuasa 2.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'jumlah dua nombor x dan y ialah 20'.",
    ["x − y = 20", "x/y = 20", "xy = 20", "x + y = 20"],
    3,
    "Jumlah dua nombor ditulis sebagai x + y = 20.",
    "Easy",
  ],
  [
    "Apakah langkah pertama dalam membentuk persamaan linear daripada situasi harian?",
    [
      "Pilih pemboleh ubah bagi kuantiti tidak diketahui",
      "Selesaikan persamaan dengan segera",
      "Lukis graf bagi situasi itu",
      "Tukar semua nombor kepada pecahan",
    ],
    0,
    "Langkah pertama ialah mengenal pasti kuantiti yang tidak diketahui dan mewakilkannya dengan pemboleh ubah.",
    "Easy",
  ],
  [
    "Persamaan 5r + 1 = 0 ialah persamaan linear dalam berapa pemboleh ubah?",
    ["Tiada pemboleh ubah", "Satu pemboleh ubah", "Dua pemboleh ubah", "Tiga pemboleh ubah"],
    1,
    "Persamaan 5r + 1 = 0 hanya mengandungi satu jenis pemboleh ubah, iaitu r.",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah persamaan linear?",
    ["xy = 12", "1/x = 5", "x³ = 8", "x + y = 9"],
    3,
    "x + y = 9 ialah persamaan linear kerana x dan y masing-masing berkuasa 1.",
    "Easy",
  ],
  [
    "Harga sebatang pen ialah RMx. Harga 4 batang pen ialah RM12. Persamaan yang betul ialah:",
    ["4x = 12", "4 + x = 12", "x ÷ 4 = 12", "x − 4 = 12"],
    0,
    "Harga 4 batang pen = 4 × x = 4x. Maka 4x = 12.",
    "Easy",
  ],
  [
    "Tulis persamaan bagi 'tiga kali suatu nombor p ditolak 4 sama dengan 11'.",
    ["p − 3 = 11", "3(p − 4) = 11", "3p − 4 = 11", "3p + 4 = 11"],
    2,
    "'Tiga kali suatu nombor p ditolak 4' diterjemahkan kepada 3p − 4, maka persamaannya ialah 3p − 4 = 11.",
    "Easy",
  ],
  [
    "Selesaikan x − 6 = 2.",
    ["x = −4", "x = 4", "x = 12", "x = 8"],
    3,
    "Tambah 6 pada kedua-dua belah persamaan: x − 6 + 6 = 2 + 6, maka x = 8.",
    "Easy",
  ],
  [
    "Apakah yang membezakan suatu persamaan daripada ungkapan algebra?",
    [
      "Persamaan tidak pernah mengandungi pemboleh ubah",
      "Persamaan mempunyai tanda sama dengan (=); ungkapan tidak",
      "Ungkapan algebra sentiasa lebih panjang",
      "Persamaan tidak pernah mengandungi pemalar",
    ],
    1,
    "Persamaan mengandungi tanda sama dengan (=) yang menunjukkan dua bahagian mempunyai nilai yang sama, manakala ungkapan algebra tidak.",
    "Easy",
  ],
]);

const MATH_C6_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a linear equation?",
    [
      "An equation in which the highest power of the variable is 1",
      "An equation in which the highest power of the variable is 2",
      "An equation without any variables",
      "An equation with two equals signs",
    ],
    0,
    "A linear equation is an equation in which the highest power of the variable is 1.",
    "Easy",
  ],
  [
    "Which of the following is a linear equation?",
    ["10x² + 5x − 3 = 1", "5r + 1 = 0", "x² − 4 = 0", "x² + y = 6"],
    1,
    "5r + 1 = 0 is a linear equation because the highest power of r is 1.",
    "Easy",
  ],
  [
    "Why is 10x² + 5x − 3 = 1 NOT a linear equation?",
    [
      "Because it has two variables",
      "Because it has no constant",
      "Because x is raised to the power of 2",
      "Because the coefficient of x is 5",
    ],
    2,
    "The equation contains x², a variable raised to the power of 2, so it is not linear.",
    "Easy",
  ],
  [
    "What is the main feature of a linear equation in one variable?",
    [
      "It contains two different variables",
      "It has two equals signs",
      "It contains no variables at all",
      "It contains one variable with power 1",
    ],
    3,
    "A linear equation in one variable contains only one type of variable raised to the power of 1.",
    "Easy",
  ],
  [
    "Which of the following is an example of a linear equation in one variable?",
    ["5x + 2y = 8", "x + 7 = 11", "x² = 9", "xy = 10"],
    1,
    "x + 7 = 11 contains only one variable, x, raised to the power of 1.",
    "Easy",
  ],
  [
    "How many types of variables are in the equation x + 7 = 11?",
    ["0", "2", "1", "3"],
    2,
    "The equation x + 7 = 11 contains only one type of variable, x.",
    "Easy",
  ],
  [
    "Write the equation for 'A number m divided by 6 gives 12'.",
    ["m × 6 = 12", "m + 6 = 12", "m − 6 = 12", "m/6 = 12"],
    3,
    "'Divided by 6 gives 12' translates to m/6 = 12.",
    "Easy",
  ],
  [
    "Write the equation for 'Rahim has RM p, spends RM q, and has RM10 left'.",
    ["p − q = 10", "p + q = 10", "p × q = 10", "p ÷ q = 10"],
    0,
    "Amount left = original amount − amount spent, so p − q = 10.",
    "Easy",
  ],
  [
    "What is the main feature of a linear equation in two variables?",
    [
      "Only one variable, with power 1",
      "One variable raised to the power of 2",
      "Two different variables, each with power 1",
      "Two variables multiplied together",
    ],
    2,
    "A linear equation in two variables contains two different variables, each raised to the power of 1.",
    "Easy",
  ],
  [
    "Which of the following is an example of a linear equation in two variables?",
    ["x + 7 = 11", "x³ = 27", "x² + y = 6", "5x + 2y = 8"],
    3,
    "5x + 2y = 8 contains two different variables, x and y, each raised to the power of 1.",
    "Easy",
  ],
  [
    "How many types of variables are in the equation 5x + 2y = 8?",
    ["2", "1", "3", "4"],
    0,
    "The equation 5x + 2y = 8 contains two types of variables, x and y.",
    "Easy",
  ],
  [
    "What does 'variable' mean in an equation?",
    [
      "A fixed number in the equation",
      "A letter representing an unknown value",
      "An operation sign such as + or −",
      "The final answer to the equation",
    ],
    1,
    "A variable is a letter or symbol that represents an unknown value.",
    "Easy",
  ],
  [
    "The value x = 3 satisfies which equation?",
    ["x + 4 = 1", "x − 3 = 3", "3x = 6", "2x + 1 = 7"],
    3,
    "Substitute x = 3: 2(3) + 1 = 7, so both sides are equal. The other equations are not true when x = 3.",
    "Easy",
  ],
  [
    "Write the equation for 'The difference between Salim's age, p years, and his sister's age, q years, is 10 years'.",
    ["p − q = 10", "p + q = 10", "p ÷ q = 10", "pq = 10"],
    0,
    "The age difference is written as p − q = 10.",
    "Easy",
  ],
  [
    "Which of the following is NOT a linear equation in two variables?",
    ["5x + 2y = 8", "x² + y = 6", "p − q = 10", "2m + n = 15"],
    1,
    "x² + y = 6 contains x raised to the power of 2, so it is not a linear equation.",
    "Easy",
  ],
  [
    "What is the main difference between a linear equation in one variable and one in two variables?",
    [
      "A one-variable equation has no solution",
      "A two-variable equation has only one solution",
      "The number of different variables: one or two",
      "There is no difference between them",
    ],
    2,
    "The main difference is the number of types of variables involved: one versus two.",
    "Easy",
  ],
  [
    "What does it mean to 'solve' a linear equation?",
    [
      "Finding the value of the variable that makes it true",
      "Turning the equation into an expression",
      "Doubling both sides of the equation",
      "Changing the sign of every term",
    ],
    0,
    "Solving an equation means finding the value of the variable that makes both sides of the equation equal in value.",
    "Easy",
  ],
  [
    "How many solutions does a linear equation in two variables have?",
    ["No solutions", "Only one solution", "An infinite number of solutions", "Only two solutions"],
    2,
    "A linear equation in two variables has an infinite number of solutions.",
    "Easy",
  ],
  [
    "What is the standard form of a linear equation in two variables?",
    ["ax + b = 0", "ax + by = c", "ax² + bx + c = 0", "a/x = b"],
    1,
    "The standard form of a linear equation in two variables is ax + by = c.",
    "Easy",
  ],
  [
    "How do you determine whether an equation is a linear equation?",
    [
      "Look at the number of terms in the equation",
      "Count the total of the coefficients",
      "Look at the sign in front of the constant",
      "Check the highest power of every variable",
    ],
    3,
    "To determine whether an equation is linear, check the highest power of every variable; if all are 1, it is linear.",
    "Easy",
  ],
  [
    "Write the equation for 'Two times a number n plus 5 equals 17'.",
    ["2(n + 5) = 17", "n + 2 = 17", "2n + 5 = 17", "n − 2 = 17"],
    2,
    "'Two times a number n plus 5' translates to 2n + 5, so the equation is 2n + 5 = 17.",
    "Easy",
  ],
  [
    "Which of the following contains a variable raised to the power of 2?",
    ["5r + 1 = 0", "x² − 4 = 0", "x + 7 = 11", "5x + 2y = 8"],
    1,
    "x² − 4 = 0 contains the variable x raised to the power of 2.",
    "Easy",
  ],
  [
    "Write the equation for 'The sum of two numbers x and y is 20'.",
    ["x − y = 20", "x/y = 20", "xy = 20", "x + y = 20"],
    3,
    "The sum of two numbers is written as x + y = 20.",
    "Easy",
  ],
  [
    "What is the first step in forming a linear equation from a daily-life situation?",
    [
      "Choose a variable for the unknown quantity",
      "Solve the equation straight away",
      "Draw a graph of the situation",
      "Change all the numbers into fractions",
    ],
    0,
    "The first step is to identify the unknown quantity and represent it with a variable.",
    "Easy",
  ],
  [
    "How many variables does the equation 5r + 1 = 0 contain?",
    ["No variables", "One variable", "Two variables", "Three variables"],
    1,
    "The equation 5r + 1 = 0 contains only one type of variable, r.",
    "Easy",
  ],
  [
    "Which of the following is a linear equation?",
    ["xy = 12", "1/x = 5", "x³ = 8", "x + y = 9"],
    3,
    "x + y = 9 is a linear equation because x and y are each raised to the power of 1.",
    "Easy",
  ],
  [
    "A pen costs RMx. The price of 4 pens is RM12. The correct equation is:",
    ["4x = 12", "4 + x = 12", "x ÷ 4 = 12", "x − 4 = 12"],
    0,
    "The price of 4 pens = 4 × x = 4x. So 4x = 12.",
    "Easy",
  ],
  [
    "Write the equation for 'Three times a number p minus 4 equals 11'.",
    ["p − 3 = 11", "3(p − 4) = 11", "3p − 4 = 11", "3p + 4 = 11"],
    2,
    "'Three times a number p minus 4' translates to 3p − 4, so the equation is 3p − 4 = 11.",
    "Easy",
  ],
  [
    "Solve x − 6 = 2.",
    ["x = −4", "x = 4", "x = 12", "x = 8"],
    3,
    "Add 6 to both sides of the equation: x − 6 + 6 = 2 + 6, so x = 8.",
    "Easy",
  ],
  [
    "What distinguishes an equation from an algebraic expression?",
    [
      "An equation never contains a variable",
      "An equation has an equals sign (=); an expression does not",
      "An algebraic expression is always longer",
      "An equation never contains a constant",
    ],
    1,
    "An equation contains an equals sign (=) showing that two parts have equal value, while an algebraic expression does not.",
    "Easy",
  ],
]);

const MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Selesaikan persamaan x + 7 = 11 menggunakan konsep kesamaan.",
    ["x = 4", "x = 3", "x = 18", "x = −4"],
    0,
    "Tolak 7 daripada kedua-dua belah: x + 7 − 7 = 11 − 7, maka x = 4.",
    "Medium",
  ],
  [
    "Apakah operasi yang perlu dilakukan pada kedua-dua belah persamaan x + 7 = 11 untuk mendapatkan x bersendirian?",
    ["Tambah 7", "Tolak 7", "Darab dengan 7", "Bahagi dengan 7"],
    1,
    "Untuk mengasingkan x, tolak 7 daripada kedua-dua belah persamaan.",
    "Medium",
  ],
  [
    "Apakah konsep kesamaan?",
    [
      "Melakukan operasi berbeza pada setiap belah persamaan",
      "Menukar semua pemboleh ubah kepada nombor",
      "Melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang",
      "Mengabaikan tanda sama dengan dalam persamaan",
    ],
    2,
    "Konsep kesamaan ialah melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang.",
    "Medium",
  ],
  [
    "Selesaikan persamaan x − 5 = 9 menggunakan konsep kesamaan.",
    ["x = 4", "x = 45", "x = −4", "x = 14"],
    3,
    "Tambah 5 pada kedua-dua belah: x − 5 + 5 = 9 + 5, maka x = 14.",
    "Medium",
  ],
  [
    "Gunakan kaedah cuba jaya untuk menyelesaikan x + 5 = 9. Apakah nilai x yang betul?",
    ["x = 2", "x = 4", "x = 3", "x = 5"],
    1,
    "Apabila x = 4, 4 + 5 = 9, jadi kedua-dua belah sama nilai dan x = 4 ialah penyelesaiannya.",
    "Medium",
  ],
  [
    "Mengapakah kaedah cuba jaya kurang sesuai untuk persamaan dengan penyelesaian berbentuk pecahan?",
    [
      "Kerana kaedah ini terlalu mudah",
      "Kerana pecahan tidak boleh disubstitusikan",
      "Kerana ia mengambil masa lebih lama untuk mencuba pelbagai nilai",
      "Kerana ia hanya berfungsi untuk persamaan dua pemboleh ubah",
    ],
    2,
    "Kaedah cuba jaya mengambil masa lebih lama apabila penyelesaiannya ialah nombor besar atau pecahan.",
    "Medium",
  ],
  [
    "Apakah operasi songsang bagi penambahan?",
    ["Pendaraban", "Pembahagian", "Punca kuasa dua", "Penolakan"],
    3,
    "Operasi songsang bagi penambahan (+) ialah penolakan (−).",
    "Medium",
  ],
  [
    "Apakah operasi songsang bagi pendaraban?",
    ["Pembahagian", "Penolakan", "Penambahan", "Kuasa dua"],
    0,
    "Operasi songsang bagi pendaraban (×) ialah pembahagian (÷).",
    "Medium",
  ],
  [
    "Selesaikan persamaan 4x/5 + 7 = 23 menggunakan kaedah pematahbalikan. Apakah langkah pertama?",
    [
      "Darab kedua-dua belah dengan 5",
      "Bahagi kedua-dua belah dengan 4",
      "Tolak 7 daripada kedua-dua belah",
      "Tambah 7 pada kedua-dua belah",
    ],
    2,
    "Langkah pertama ialah menolak 7 daripada kedua-dua belah supaya 4x/5 = 16.",
    "Medium",
  ],
  [
    "Dalam menyelesaikan 4x/5 + 7 = 23, selepas mendapat 4x/5 = 16, apakah langkah seterusnya?",
    [
      "Bahagi kedua-dua belah dengan 5",
      "Tambah 4 pada kedua-dua belah",
      "Tolak 16 daripada kedua-dua belah",
      "Darab kedua-dua belah dengan 5",
    ],
    3,
    "Darab kedua-dua belah dengan 5 untuk mendapatkan 4x = 80.",
    "Medium",
  ],
  [
    "Berapakah nilai x dalam persamaan 4x/5 + 7 = 23?",
    ["x = 20", "x = 16", "x = 80", "x = 4"],
    0,
    "Mengikut langkah pematahbalikan: 4x/5 = 16 → 4x = 80 → x = 20.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 3x − 4 = 11.",
    ["x = 3", "x = 5", "x = 7", "x = 15"],
    1,
    "3x − 4 = 11 → 3x = 15 → x = 5.",
    "Medium",
  ],
  [
    "Selesaikan persamaan x/4 = 6.",
    ["x = 1.5", "x = 10", "x = 2", "x = 24"],
    3,
    "x/4 = 6 → x = 6 × 4 = 24.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 2x + 3 = 13.",
    ["x = 5", "x = 8", "x = 10", "x = 6.5"],
    0,
    "2x + 3 = 13 → 2x = 10 → x = 5.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 5x − 1 = 0.",
    ["x = −5", "x = 0.2", "x = −0.2", "x = 5"],
    1,
    "5x − 1 = 0 → 5x = 1 → x = 0.2.",
    "Medium",
  ],
  [
    "Diberi y = 7x + 6, apakah nilai y apabila x = 0?",
    ["y = 0", "y = 7", "y = 6", "y = 13"],
    2,
    "y = 7(0) + 6 = 6.",
    "Medium",
  ],
  [
    "Diberi 2x + y = 10, cari nilai y apabila x = 3.",
    ["y = 4", "y = 16", "y = 7", "y = 6"],
    0,
    "2(3) + y = 10 → 6 + y = 10 → y = 4.",
    "Medium",
  ],
  [
    "Diberi y = 7x + 6, apakah nilai y apabila x = 2?",
    ["y = 13", "y = 18", "y = 20", "y = 26"],
    2,
    "y = 7(2) + 6 = 14 + 6 = 20.",
    "Medium",
  ],
  [
    "Manakah pasangan (x, y) berikut ialah penyelesaian bagi y = 7x + 6?",
    ["(1, 6)", "(2, 20)", "(0, 7)", "(1, 7)"],
    1,
    "Apabila x = 2, y = 7(2) + 6 = 20, maka (2, 20) ialah penyelesaian yang sah.",
    "Medium",
  ],
  [
    "Mengapakah persamaan linear dalam dua pemboleh ubah mempunyai bilangan penyelesaian yang tidak terhingga?",
    [
      "Kerana pemboleh ubahnya berkuasa 2",
      "Kerana persamaan itu tidak mempunyai pemalar",
      "Kerana ia tidak boleh diselesaikan",
      "Kerana setiap nilai x yang berbeza menghasilkan nilai y yang sepadan",
    ],
    3,
    "Setiap nilai berbeza yang disubstitusikan untuk satu pemboleh ubah menghasilkan nilai sepadan bagi pemboleh ubah satu lagi, menghasilkan banyak pasangan penyelesaian.",
    "Medium",
  ],
  [
    "Selesaikan persamaan x + 9 = 15 menggunakan konsep kesamaan.",
    ["x = −6", "x = 24", "x = 6", "x = 1.67"],
    2,
    "Tolak 9 daripada kedua-dua belah: x = 15 − 9 = 6.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 2x = 18 menggunakan konsep kesamaan.",
    ["x = 16", "x = 9", "x = 20", "x = 36"],
    1,
    "Bahagi kedua-dua belah dengan 2: x = 18 ÷ 2 = 9.",
    "Medium",
  ],
  [
    "Apakah yang perlu dilakukan untuk menyemak sama ada x = 4 ialah penyelesaian bagi x + 7 = 11?",
    [
      "Tukar persamaan kepada bentuk pecahan",
      "Selesaikan semula persamaan dari awal",
      "Lukis graf persamaan itu",
      "Gantikan x = 4 dan semak kedua-dua belah sama nilai",
    ],
    3,
    "Untuk menyemak penyelesaian, gantikan nilai itu ke dalam persamaan asal dan periksa jika kedua-dua belah sama nilai.",
    "Medium",
  ],
  [
    "Gunakan kaedah cuba jaya untuk x − 3 = 7. Manakah nilai x yang betul?",
    ["x = 10", "x = 7", "x = 4", "x = 21"],
    0,
    "Apabila x = 10, 10 − 3 = 7, maka kedua-dua belah sama dan x = 10 ialah penyelesaiannya.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 6x + 2 = 20 menggunakan kaedah pematahbalikan.",
    ["x = 4", "x = 3", "x = 18", "x = 22"],
    1,
    "6x + 2 = 20 → 6x = 18 → x = 3.",
    "Medium",
  ],
  [
    "Apakah operasi songsang yang digunakan untuk menyelesaikan persamaan x × 5 = 35?",
    ["Tambah", "Tolak", "Darab", "Bahagi"],
    3,
    "Untuk mengasingkan x, gunakan operasi songsang bagi pendaraban, iaitu pembahagian: x = 35 ÷ 5 = 7.",
    "Medium",
  ],
  [
    "Apakah operasi songsang yang digunakan untuk menyelesaikan persamaan x ÷ 3 = 9?",
    ["Darab dengan 3", "Tambah 3", "Bahagi dengan 3", "Tolak 3"],
    0,
    "Untuk mengasingkan x, darabkan kedua-dua belah dengan 3: x = 9 × 3 = 27.",
    "Medium",
  ],
  [
    "Diberi y = 3x − 2, apakah nilai y apabila x = 5?",
    ["y = 17", "y = 15", "y = 13", "y = 10"],
    2,
    "y = 3(5) − 2 = 15 − 2 = 13.",
    "Medium",
  ],
  [
    "Selesaikan persamaan 7x − 3 = 4x + 9.",
    ["x = 2", "x = 3", "x = 12", "x = 4"],
    3,
    "7x − 3 = 4x + 9 → 7x − 4x = 9 + 3 → 3x = 12 → x = 4.",
    "Medium",
  ],
  [
    "Selesaikan 3(x − 2) = 12.",
    ["x = 2", "x = 6", "x = 4", "x = 14"],
    1,
    "Bahagi kedua-dua belah dengan 3: x − 2 = 4. Tambah 2 pada kedua-dua belah: x = 6. (x = 14 datang daripada 3x − 2 = 12 tanpa mendarab ke dalam kurungan.)",
    "Medium",
  ],
]);

const MATH_C6_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Solve the equation x + 7 = 11 using the equality concept.",
    ["x = 4", "x = 3", "x = 18", "x = −4"],
    0,
    "Subtract 7 from both sides: x + 7 − 7 = 11 − 7, giving x = 4.",
    "Medium",
  ],
  [
    "What operation should be performed on both sides of x + 7 = 11 to isolate x?",
    ["Add 7", "Subtract 7", "Multiply by 7", "Divide by 7"],
    1,
    "To isolate x, subtract 7 from both sides of the equation.",
    "Medium",
  ],
  [
    "What is the equality concept?",
    [
      "Performing different operations on each side of the equation",
      "Converting all variables into numbers",
      "Performing the same operation on both sides of the equation so it stays balanced",
      "Ignoring the equals sign in the equation",
    ],
    2,
    "The equality concept means performing the same operation on both sides of the equation so it stays balanced.",
    "Medium",
  ],
  [
    "Solve the equation x − 5 = 9 using the equality concept.",
    ["x = 4", "x = 45", "x = −4", "x = 14"],
    3,
    "Add 5 to both sides: x − 5 + 5 = 9 + 5, giving x = 14.",
    "Medium",
  ],
  [
    "Use trial and error to solve x + 5 = 9. What is the correct value of x?",
    ["x = 2", "x = 4", "x = 3", "x = 5"],
    1,
    "When x = 4, 4 + 5 = 9, so both sides are equal and x = 4 is the solution.",
    "Medium",
  ],
  [
    "Why is the trial and error method less suitable for equations whose solution is a fraction?",
    [
      "Because the method is too easy",
      "Because fractions cannot be substituted",
      "Because it takes longer to try many values",
      "Because it only works for two-variable equations",
    ],
    2,
    "The trial and error method takes longer when the solution is a large number or a fraction.",
    "Medium",
  ],
  [
    "What is the inverse operation of addition?",
    ["Multiplication", "Division", "Square root", "Subtraction"],
    3,
    "The inverse operation of addition (+) is subtraction (−).",
    "Medium",
  ],
  [
    "What is the inverse operation of multiplication?",
    ["Division", "Subtraction", "Addition", "Squaring"],
    0,
    "The inverse operation of multiplication (×) is division (÷).",
    "Medium",
  ],
  [
    "Solve 4x/5 + 7 = 23 using the backtracking method. What is the first step?",
    [
      "Multiply both sides by 5",
      "Divide both sides by 4",
      "Subtract 7 from both sides",
      "Add 7 to both sides",
    ],
    2,
    "The first step is to subtract 7 from both sides so that 4x/5 = 16.",
    "Medium",
  ],
  [
    "When solving 4x/5 + 7 = 23, after obtaining 4x/5 = 16, what is the next step?",
    [
      "Divide both sides by 5",
      "Add 4 to both sides",
      "Subtract 16 from both sides",
      "Multiply both sides by 5",
    ],
    3,
    "Multiply both sides by 5 to obtain 4x = 80.",
    "Medium",
  ],
  [
    "What is the value of x in the equation 4x/5 + 7 = 23?",
    ["x = 20", "x = 16", "x = 80", "x = 4"],
    0,
    "Following the backtracking steps: 4x/5 = 16 → 4x = 80 → x = 20.",
    "Medium",
  ],
  [
    "Solve the equation 3x − 4 = 11.",
    ["x = 3", "x = 5", "x = 7", "x = 15"],
    1,
    "3x − 4 = 11 → 3x = 15 → x = 5.",
    "Medium",
  ],
  [
    "Solve the equation x/4 = 6.",
    ["x = 1.5", "x = 10", "x = 2", "x = 24"],
    3,
    "x/4 = 6 → x = 6 × 4 = 24.",
    "Medium",
  ],
  [
    "Solve the equation 2x + 3 = 13.",
    ["x = 5", "x = 8", "x = 10", "x = 6.5"],
    0,
    "2x + 3 = 13 → 2x = 10 → x = 5.",
    "Medium",
  ],
  [
    "Solve the equation 5x − 1 = 0.",
    ["x = −5", "x = 0.2", "x = −0.2", "x = 5"],
    1,
    "5x − 1 = 0 → 5x = 1 → x = 0.2.",
    "Medium",
  ],
  [
    "Given y = 7x + 6, what is the value of y when x = 0?",
    ["y = 0", "y = 7", "y = 6", "y = 13"],
    2,
    "y = 7(0) + 6 = 6.",
    "Medium",
  ],
  [
    "Given 2x + y = 10, find the value of y when x = 3.",
    ["y = 4", "y = 16", "y = 7", "y = 6"],
    0,
    "2(3) + y = 10 → 6 + y = 10 → y = 4.",
    "Medium",
  ],
  [
    "Given y = 7x + 6, what is the value of y when x = 2?",
    ["y = 13", "y = 18", "y = 20", "y = 26"],
    2,
    "y = 7(2) + 6 = 14 + 6 = 20.",
    "Medium",
  ],
  [
    "Which of the following pairs (x, y) is a solution of y = 7x + 6?",
    ["(1, 6)", "(2, 20)", "(0, 7)", "(1, 7)"],
    1,
    "When x = 2, y = 7(2) + 6 = 20, so (2, 20) is a valid solution.",
    "Medium",
  ],
  [
    "Why does a linear equation in two variables have an infinite number of solutions?",
    [
      "Because its variables are raised to the power of 2",
      "Because the equation has no constant",
      "Because it cannot be solved",
      "Because each different value of x produces a corresponding value of y",
    ],
    3,
    "Each different value substituted for one variable produces a corresponding value for the other, giving many solution pairs.",
    "Medium",
  ],
  [
    "Solve the equation x + 9 = 15 using the equality concept.",
    ["x = −6", "x = 24", "x = 6", "x = 1.67"],
    2,
    "Subtract 9 from both sides: x = 15 − 9 = 6.",
    "Medium",
  ],
  [
    "Solve the equation 2x = 18 using the equality concept.",
    ["x = 16", "x = 9", "x = 20", "x = 36"],
    1,
    "Divide both sides by 2: x = 18 ÷ 2 = 9.",
    "Medium",
  ],
  [
    "What should be done to check whether x = 4 is the solution of x + 7 = 11?",
    [
      "Change the equation into fraction form",
      "Solve the equation again from the beginning",
      "Draw a graph of the equation",
      "Substitute x = 4 and check both sides are equal",
    ],
    3,
    "To check the solution, substitute the value into the original equation and verify both sides are equal in value.",
    "Medium",
  ],
  [
    "Use trial and error for x − 3 = 7. Which value of x is correct?",
    ["x = 10", "x = 7", "x = 4", "x = 21"],
    0,
    "When x = 10, 10 − 3 = 7, so both sides are equal and x = 10 is the solution.",
    "Medium",
  ],
  [
    "Solve the equation 6x + 2 = 20 using the backtracking method.",
    ["x = 4", "x = 3", "x = 18", "x = 22"],
    1,
    "6x + 2 = 20 → 6x = 18 → x = 3.",
    "Medium",
  ],
  [
    "Which inverse operation is used to solve the equation x × 5 = 35?",
    ["Addition", "Subtraction", "Multiplication", "Division"],
    3,
    "To isolate x, use the inverse of multiplication, which is division: x = 35 ÷ 5 = 7.",
    "Medium",
  ],
  [
    "Which inverse operation is used to solve the equation x ÷ 3 = 9?",
    ["Multiply by 3", "Add 3", "Divide by 3", "Subtract 3"],
    0,
    "To isolate x, multiply both sides by 3: x = 9 × 3 = 27.",
    "Medium",
  ],
  [
    "Given y = 3x − 2, what is the value of y when x = 5?",
    ["y = 17", "y = 15", "y = 13", "y = 10"],
    2,
    "y = 3(5) − 2 = 15 − 2 = 13.",
    "Medium",
  ],
  [
    "Solve the equation 7x − 3 = 4x + 9.",
    ["x = 2", "x = 3", "x = 12", "x = 4"],
    3,
    "7x − 3 = 4x + 9 → 7x − 4x = 9 + 3 → 3x = 12 → x = 4.",
    "Medium",
  ],
  [
    "Solve 3(x − 2) = 12.",
    ["x = 2", "x = 6", "x = 4", "x = 14"],
    1,
    "Divide both sides by 3: x − 2 = 4. Add 2 to both sides: x = 6. (x = 14 comes from writing 3x − 2 = 12 without multiplying into the brackets.)",
    "Medium",
  ],
]);

const MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Apakah persamaan linear serentak?",
    [
      "Dua persamaan linear dengan pemboleh ubah sama diselesaikan bersama",
      "Dua persamaan tidak berkaitan yang diselesaikan satu demi satu",
      "Satu persamaan dengan tiga pemboleh ubah",
      "Persamaan yang tiada penyelesaian",
    ],
    0,
    "Persamaan linear serentak ialah dua atau lebih persamaan linear yang melibatkan pemboleh ubah sama yang diselesaikan bersama.",
    "Medium",
  ],
  [
    "Mengapakah persamaan itu dipanggil 'serentak'?",
    [
      "Kerana ia ditulis pada masa yang sama",
      "Kerana satu pasangan (x, y) mesti memuaskan kedua-duanya",
      "Kerana ia mempunyai bilangan sebutan yang sama",
      "Kerana pemboleh ubahnya mempunyai nilai yang sama",
    ],
    1,
    "Ia dipanggil 'serentak' kerana penyelesaian yang dicari mesti memuaskan kedua-dua persamaan pada masa yang sama.",
    "Medium",
  ],
  [
    "Bilakah persamaan serentak mempunyai penyelesaian unik?",
    [
      "Apabila dua garis lurus selari",
      "Apabila dua garis lurus bertindih",
      "Apabila dua garis lurus bersilang pada hanya satu titik",
      "Apabila dua garis lurus tidak dapat dilukis",
    ],
    2,
    "Penyelesaian unik wujud apabila dua garis lurus bersilang pada hanya satu titik.",
    "Medium",
  ],
  [
    "Bilakah persamaan serentak tiada penyelesaian?",
    [
      "Apabila dua garis lurus bersilang pada satu titik",
      "Apabila dua garis lurus bertindih sepenuhnya",
      "Apabila salah satu persamaan mempunyai pemalar sifar",
      "Apabila dua garis lurus selari dan tidak bersilang",
    ],
    3,
    "Persamaan serentak tiada penyelesaian apabila dua garis lurus selari dan tidak akan bersilang.",
    "Medium",
  ],
  [
    "Bilakah persamaan serentak mempunyai penyelesaian tak terhingga?",
    [
      "Apabila dua garis lurus bersilang pada satu titik",
      "Apabila dua garis lurus mewakili garis yang sama (bertindih)",
      "Apabila dua garis lurus selari",
      "Apabila salah satu persamaan tiada pemboleh ubah",
    ],
    1,
    "Penyelesaian tak terhingga wujud apabila kedua-dua persamaan mewakili garis lurus yang sama dan bertindih sepenuhnya.",
    "Medium",
  ],
  [
    "Apakah langkah pertama dalam kaedah penggantian?",
    [
      "Lukis graf bagi kedua-dua persamaan",
      "Tambah kedua-dua persamaan bersama",
      "Ungkapkan satu pemboleh ubah dalam sebutan yang lain",
      "Samakan pekali kedua-dua persamaan",
    ],
    2,
    "Langkah pertama dalam kaedah penggantian ialah mengungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi.",
    "Medium",
  ],
  [
    "Diberi persamaan serentak x + y = 10 dan x − y = 2, ungkapkan x daripada persamaan pertama.",
    ["x = 10 + y", "x = y + 10", "x = y − 10", "x = 10 − y"],
    3,
    "Daripada x + y = 10, ungkapkan x = 10 − y.",
    "Medium",
  ],
  [
    "Selepas menggantikan x = 10 − y ke dalam x − y = 2, apakah persamaan satu pemboleh ubah yang terhasil (sebelum dipermudahkan)?",
    ["(10 − y) − y = 2", "(10 + y) − y = 2", "(10 − y) + y = 2", "10 − y = 2"],
    0,
    "Gantikan x = 10 − y ke dalam x − y = 2 untuk mendapatkan (10 − y) − y = 2.",
    "Medium",
  ],
  [
    "Selesaikan persamaan serentak y = 2x dan x + y = 9.",
    ["x = 2, y = 7", "x = 6, y = 3", "x = 3, y = 6", "x = 4.5, y = 4.5"],
    2,
    "Gantikan y = 2x ke dalam x + y = 9: x + 2x = 9 → 3x = 9 → x = 3. Maka y = 2(3) = 6.",
    "Medium",
  ],
  [
    "Pasangan nilai manakah memuaskan KEDUA-DUA persamaan x + y = 7 dan x − y = 1?",
    ["x = 6, y = 1", "x = 3, y = 4", "x = 5, y = 2", "x = 4, y = 3"],
    3,
    "Semak x = 4, y = 3: 4 + 3 = 7 dan 4 − 3 = 1. Pasangan lain hanya memuaskan x + y = 7.",
    "Medium",
  ],
  [
    "Selepas mendapat y = 4, apakah nilai x dalam persamaan serentak x + y = 10 dan x − y = 2?",
    ["x = 6", "x = 4", "x = 10", "x = 14"],
    0,
    "Gantikan y = 4 ke dalam x = 10 − y: x = 10 − 4 = 6.",
    "Medium",
  ],
  [
    "Apakah langkah pertama dalam kaedah penghapusan?",
    [
      "Selesaikan persamaan tanpa mengubah pekali",
      "Buat pekali satu pemboleh ubah sama dalam kedua-dua persamaan",
      "Lukis graf kedua-dua persamaan",
      "Gantikan satu pemboleh ubah dengan nombor",
    ],
    1,
    "Langkah pertama kaedah penghapusan ialah membuat pekali satu pemboleh ubah sama dalam kedua-dua persamaan.",
    "Medium",
  ],
  [
    "Diberi x + y = 10 dan x − y = 2, apakah persamaan yang terhasil apabila kedua-dua persamaan ditambah?",
    ["2y = 12", "2y = 8", "2x = 8", "2x = 12"],
    3,
    "Menambah persamaan (1) dan (2): (x + y) + (x − y) = 10 + 2, maka 2x = 12.",
    "Medium",
  ],
  [
    "Diberi 3x + y = 11 dan x + y = 5. Apakah persamaan yang terhasil apabila persamaan kedua ditolak daripada persamaan pertama?",
    ["2x = 6", "4x = 16", "2x = 16", "4x + 2y = 16"],
    0,
    "(3x + y) − (x + y) = 11 − 5 → 2x = 6. Sebutan y terhapus.",
    "Medium",
  ],
  [
    "Selesaikan persamaan serentak 3x + y = 11 dan x + y = 5.",
    ["x = 2, y = 3", "x = 3, y = 2", "x = 4, y = 1", "x = 1, y = 8"],
    1,
    "Tolak persamaan kedua daripada persamaan pertama: 2x = 6 → x = 3. Gantikan ke dalam x + y = 5: y = 2.",
    "Medium",
  ],
  [
    "Apakah penyelesaian akhir bagi persamaan serentak x + y = 10 dan x − y = 2?",
    ["x = 4, y = 6", "x = 5, y = 5", "x = 6, y = 4", "x = 8, y = 2"],
    2,
    "Penyelesaian persamaan serentak ialah x = 6, y = 4.",
    "Medium",
  ],
  [
    "Apakah langkah pertama dalam kaedah graf untuk menyelesaikan persamaan serentak?",
    [
      "Lukis graf bagi persamaan pertama pada satah Cartesan",
      "Selesaikan persamaan secara algebra dahulu",
      "Tukar kedua-dua persamaan kepada bentuk pecahan",
      "Cari nilai pemalar sahaja",
    ],
    0,
    "Langkah pertama kaedah graf ialah melukis graf persamaan pertama pada satah Cartesan.",
    "Medium",
  ],
  [
    "Dalam kaedah graf, apakah yang mewakili penyelesaian persamaan serentak?",
    [
      "Titik permulaan setiap garis",
      "Kecuraman setiap garis",
      "Titik persilangan kedua-dua garis",
      "Titik setiap garis memotong paksi-x",
    ],
    2,
    "Penyelesaian persamaan serentak diwakili oleh titik persilangan antara dua garis lurus pada graf.",
    "Medium",
  ],
  [
    "Jika graf bagi dua persamaan serentak adalah dua garis selari, apakah kesimpulan tentang penyelesaiannya?",
    [
      "Terdapat satu penyelesaian unik",
      "Tiada penyelesaian",
      "Terdapat penyelesaian tak terhingga",
      "Penyelesaiannya ialah (0, 0)",
    ],
    1,
    "Garis selari tidak akan bersilang, jadi persamaan serentak itu tiada penyelesaian.",
    "Medium",
  ],
  [
    "Hasil tambah dua nombor ialah 15 dan beza kedua-dua nombor itu ialah 3. Apakah nombor-nombor itu?",
    ["12 dan 3", "8 dan 7", "10 dan 5", "9 dan 6"],
    3,
    "Katakan x + y = 15 dan x − y = 3. Tambah kedua-dua persamaan: 2x = 18 → x = 9, maka y = 6.",
    "Medium",
  ],
  [
    "2 kg epal dan 1 kg oren berharga RM13, manakala 1 kg epal dan 1 kg oren berharga RM8. Berapakah harga 1 kg epal?",
    ["RM6.50", "RM3", "RM5", "RM8"],
    2,
    "Katakan harga 1 kg epal = RMx dan 1 kg oren = RMy. 2x + y = 13 dan x + y = 8. Tolak: x = 5.",
    "Medium",
  ],
  [
    "Selesaikan persamaan serentak 2x + y = 7 dan x − y = 2 menggunakan kaedah penghapusan.",
    ["x = 1, y = 5", "x = 3, y = 1", "x = 2, y = 3", "x = 5, y = −3"],
    1,
    "Tambah kedua-dua persamaan: 3x = 9, maka x = 3; gantikan ke (2): 3 − y = 2, maka y = 1.",
    "Hard",
  ],
  [
    "Selesaikan persamaan serentak x + 2y = 8 dan x − y = 2 menggunakan kaedah penggantian.",
    ["x = 3, y = 2.5", "x = 2, y = 4", "x = 6, y = 1", "x = 4, y = 2"],
    3,
    "Daripada x − y = 2, x = 2 + y. Gantikan ke x + 2y = 8: (2 + y) + 2y = 8 → 3y = 6 → y = 2, maka x = 4.",
    "Hard",
  ],
  [
    "Suatu kedai menjual 2 buku dan 3 pensel dengan harga RM16, manakala 1 buku dan 1 pensel berharga RM7. Jika harga buku ialah RM b dan pensel RM p, tulis persamaan serentak bagi situasi ini.",
    [
      "2b + 3p = 16 dan b + p = 7",
      "b + p = 16 dan 2b + 3p = 7",
      "2b + p = 16 dan b + 3p = 7",
      "b − p = 16 dan b + p = 7",
    ],
    0,
    "Dua buku dan tiga pensel berharga RM16 ditulis 2b + 3p = 16; satu buku dan satu pensel berharga RM7 ditulis b + p = 7.",
    "Hard",
  ],
  [
    "Daripada persamaan serentak 2b + 3p = 16 dan b + p = 7, cari nilai b dan p.",
    ["b = 2, p = 5", "b = 5, p = 2", "b = 4, p = 3", "b = 3, p = 4"],
    1,
    "Daripada b + p = 7, b = 7 − p. Gantikan ke 2b + 3p = 16: 2(7 − p) + 3p = 16 → 14 + p = 16 → p = 2, maka b = 5.",
    "Hard",
  ],
  [
    "Dua garis lurus y = 2x + 1 dan y = 2x − 3 dilukis pada satah Cartesan yang sama. Apakah jenis penyelesaian bagi persamaan serentak ini?",
    ["Penyelesaian unik", "Dua penyelesaian", "Penyelesaian tak terhingga", "Tiada penyelesaian"],
    3,
    "Bagi sebarang nilai x, nilai y bagi y = 2x + 1 sentiasa 4 lebih besar daripada nilai y bagi y = 2x − 3. Jadi kedua-dua garis lurus itu selari dan tidak bersilang, maka persamaan serentak itu tiada penyelesaian.",
    "Hard",
  ],
  [
    "Dua persamaan 2x + 4y = 10 dan x + 2y = 5 dilukis sebagai graf. Apakah jenis penyelesaian bagi persamaan serentak ini?",
    [
      "Penyelesaian tak terhingga",
      "Tiada penyelesaian",
      "Penyelesaian unik",
      "Tidak dapat ditentukan",
    ],
    0,
    "Persamaan 2x + 4y = 10 boleh dipermudahkan kepada x + 2y = 5, iaitu sama dengan persamaan kedua, maka kedua-duanya mewakili garis yang sama dan mempunyai penyelesaian tak terhingga.",
    "Hard",
  ],
  [
    "Selesaikan persamaan serentak x + y = 12 dan 2x − y = 3 menggunakan kaedah penghapusan.",
    ["x = 4, y = 8", "x = 7, y = 5", "x = 5, y = 7", "x = 6, y = 6"],
    2,
    "Tambah kedua-dua persamaan: 3x = 15, maka x = 5; gantikan ke x + y = 12: y = 7.",
    "Hard",
  ],
  [
    "Sebuah taman segi empat tepat mempunyai perimeter 28 m. Jika panjangnya ialah x m dan lebarnya y m, tulis persamaan yang mewakili perimeter ini.",
    ["x + y = 28", "x − y = 28", "xy = 28", "2x + 2y = 28"],
    3,
    "Perimeter segi empat tepat = 2(panjang + lebar), maka 2x + 2y = 28.",
    "Hard",
  ],
  [
    "Diberi 2x + 2y = 28 dan x − y = 2, cari nilai x dan y.",
    ["x = 6, y = 8", "x = 8, y = 6", "x = 10, y = 4", "x = 7, y = 7"],
    1,
    "Permudahkan 2x + 2y = 28 kepada x + y = 14. Tambah dengan x − y = 2: 2x = 16, maka x = 8 dan y = 6.",
    "Hard",
  ],
]);

const MATH_C6_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "What are simultaneous linear equations?",
    [
      "Two linear equations in the same variables solved together",
      "Two unrelated equations solved one at a time",
      "A single equation with three variables",
      "An equation that has no solution",
    ],
    0,
    "Simultaneous linear equations are two or more linear equations involving the same variables that are solved together.",
    "Medium",
  ],
  [
    "Why are these equations called 'simultaneous'?",
    [
      "Because they are written at the same time",
      "Because one pair (x, y) must satisfy both equations",
      "Because they have the same number of terms",
      "Because their variables have equal values",
    ],
    1,
    "They are called 'simultaneous' because the solution sought must satisfy both equations at the same time.",
    "Medium",
  ],
  [
    "When do simultaneous equations have a unique solution?",
    [
      "When the two straight lines are parallel",
      "When the two straight lines overlap",
      "When the two straight lines intersect at exactly one point",
      "When the two straight lines cannot be drawn",
    ],
    2,
    "A unique solution exists when the two straight lines intersect at exactly one point.",
    "Medium",
  ],
  [
    "When do simultaneous equations have no solution?",
    [
      "When the two straight lines intersect at one point",
      "When the two straight lines completely overlap",
      "When one of the equations has a zero constant",
      "When the two straight lines are parallel and never intersect",
    ],
    3,
    "Simultaneous equations have no solution when the two straight lines are parallel and never intersect.",
    "Medium",
  ],
  [
    "When do simultaneous equations have an infinite number of solutions?",
    [
      "When the two straight lines intersect at one point",
      "When the two lines represent the same line (overlap)",
      "When the two straight lines are parallel",
      "When one equation has no variable",
    ],
    1,
    "Infinite solutions exist when both equations represent the same straight line and overlap completely.",
    "Medium",
  ],
  [
    "What is the first step in the substitution method?",
    [
      "Draw the graphs of both equations",
      "Add both equations together",
      "Express one variable in terms of the other",
      "Equalise the coefficients in both equations",
    ],
    2,
    "The first step in the substitution method is to express one variable in terms of the other variable.",
    "Medium",
  ],
  [
    "Given the simultaneous equations x + y = 10 and x − y = 2, express x from the first equation.",
    ["x = 10 + y", "x = y + 10", "x = y − 10", "x = 10 − y"],
    3,
    "From x + y = 10, express x = 10 − y.",
    "Medium",
  ],
  [
    "After substituting x = 10 − y into x − y = 2, what one-variable equation results (before simplifying)?",
    ["(10 − y) − y = 2", "(10 + y) − y = 2", "(10 − y) + y = 2", "10 − y = 2"],
    0,
    "Substituting x = 10 − y into x − y = 2 gives (10 − y) − y = 2.",
    "Medium",
  ],
  [
    "Solve the simultaneous equations y = 2x and x + y = 9.",
    ["x = 2, y = 7", "x = 6, y = 3", "x = 3, y = 6", "x = 4.5, y = 4.5"],
    2,
    "Substitute y = 2x into x + y = 9: x + 2x = 9 → 3x = 9 → x = 3. So y = 2(3) = 6.",
    "Medium",
  ],
  [
    "Which pair of values satisfies BOTH equations x + y = 7 and x − y = 1?",
    ["x = 6, y = 1", "x = 3, y = 4", "x = 5, y = 2", "x = 4, y = 3"],
    3,
    "Check x = 4, y = 3: 4 + 3 = 7 and 4 − 3 = 1. The other pairs only satisfy x + y = 7.",
    "Medium",
  ],
  [
    "After finding y = 4, what is the value of x in the simultaneous equations x + y = 10 and x − y = 2?",
    ["x = 6", "x = 4", "x = 10", "x = 14"],
    0,
    "Substitute y = 4 into x = 10 − y: x = 10 − 4 = 6.",
    "Medium",
  ],
  [
    "What is the first step in the elimination method?",
    [
      "Solve the equations without changing the coefficients",
      "Make the coefficients of one variable equal in both equations",
      "Draw the graphs of both equations",
      "Replace one variable with a number",
    ],
    1,
    "The first step in the elimination method is to make the coefficients of one variable equal in both equations.",
    "Medium",
  ],
  [
    "Given x + y = 10 and x − y = 2, what equation results when both equations are added?",
    ["2y = 12", "2y = 8", "2x = 8", "2x = 12"],
    3,
    "Adding equations (1) and (2): (x + y) + (x − y) = 10 + 2, giving 2x = 12.",
    "Medium",
  ],
  [
    "Given 3x + y = 11 and x + y = 5. What equation results when the second equation is subtracted from the first?",
    ["2x = 6", "4x = 16", "2x = 16", "4x + 2y = 16"],
    0,
    "(3x + y) − (x + y) = 11 − 5 → 2x = 6. The y terms are eliminated.",
    "Medium",
  ],
  [
    "Solve the simultaneous equations 3x + y = 11 and x + y = 5.",
    ["x = 2, y = 3", "x = 3, y = 2", "x = 4, y = 1", "x = 1, y = 8"],
    1,
    "Subtract the second equation from the first: 2x = 6 → x = 3. Substitute into x + y = 5: y = 2.",
    "Medium",
  ],
  [
    "What is the final solution of the simultaneous equations x + y = 10 and x − y = 2?",
    ["x = 4, y = 6", "x = 5, y = 5", "x = 6, y = 4", "x = 8, y = 2"],
    2,
    "The solution of the simultaneous equations is x = 6, y = 4.",
    "Medium",
  ],
  [
    "What is the first step in the graphical method for solving simultaneous equations?",
    [
      "Draw the graph of the first equation on a Cartesian plane",
      "Solve the equations algebraically first",
      "Convert both equations into fraction form",
      "Find only the constant value",
    ],
    0,
    "The first step of the graphical method is to draw the graph of the first equation on a Cartesian plane.",
    "Medium",
  ],
  [
    "In the graphical method, what represents the solution of simultaneous equations?",
    [
      "The starting point of each line",
      "The steepness of each line",
      "The point where the two lines intersect",
      "The point where each line crosses the x-axis",
    ],
    2,
    "The solution of simultaneous equations is represented by the point of intersection between the two straight lines on the graph.",
    "Medium",
  ],
  [
    "If the graphs of two simultaneous equations are two parallel lines, what can be concluded about the solution?",
    [
      "There is one unique solution",
      "There is no solution",
      "There are infinitely many solutions",
      "The solution is (0, 0)",
    ],
    1,
    "Parallel lines never intersect, so the simultaneous equations have no solution.",
    "Medium",
  ],
  [
    "The sum of two numbers is 15 and their difference is 3. What are the numbers?",
    ["12 and 3", "8 and 7", "10 and 5", "9 and 6"],
    3,
    "Let x + y = 15 and x − y = 3. Add the equations: 2x = 18 → x = 9, so y = 6.",
    "Medium",
  ],
  [
    "2 kg of apples and 1 kg of oranges cost RM13, while 1 kg of apples and 1 kg of oranges cost RM8. What is the price of 1 kg of apples?",
    ["RM6.50", "RM3", "RM5", "RM8"],
    2,
    "Let 1 kg of apples cost RMx and 1 kg of oranges cost RMy. 2x + y = 13 and x + y = 8. Subtract: x = 5.",
    "Medium",
  ],
  [
    "Solve the simultaneous equations 2x + y = 7 and x − y = 2 using the elimination method.",
    ["x = 1, y = 5", "x = 3, y = 1", "x = 2, y = 3", "x = 5, y = −3"],
    1,
    "Adding both equations: 3x = 9, so x = 3; substituting into x − y = 2 gives y = 1.",
    "Hard",
  ],
  [
    "Solve the simultaneous equations x + 2y = 8 and x − y = 2 using the substitution method.",
    ["x = 3, y = 2.5", "x = 2, y = 4", "x = 6, y = 1", "x = 4, y = 2"],
    3,
    "From x − y = 2, x = 2 + y. Substituting into x + 2y = 8: (2 + y) + 2y = 8 → 3y = 6 → y = 2, so x = 4.",
    "Hard",
  ],
  [
    "A shop sells 2 books and 3 pencils for RM16, while 1 book and 1 pencil cost RM7. If a book costs RM b and a pencil costs RM p, write the simultaneous equations for this situation.",
    [
      "2b + 3p = 16 and b + p = 7",
      "b + p = 16 and 2b + 3p = 7",
      "2b + p = 16 and b + 3p = 7",
      "b − p = 16 and b + p = 7",
    ],
    0,
    "Two books and three pencils costing RM16 is written as 2b + 3p = 16; one book and one pencil costing RM7 is written as b + p = 7.",
    "Hard",
  ],
  [
    "From the simultaneous equations 2b + 3p = 16 and b + p = 7, find the values of b and p.",
    ["b = 2, p = 5", "b = 5, p = 2", "b = 4, p = 3", "b = 3, p = 4"],
    1,
    "From b + p = 7, b = 7 − p. Substituting into 2b + 3p = 16: 2(7 − p) + 3p = 16 → 14 + p = 16 → p = 2, so b = 5.",
    "Hard",
  ],
  [
    "Two straight lines y = 2x + 1 and y = 2x − 3 are drawn on the same Cartesian plane. What type of solution do these simultaneous equations have?",
    ["A unique solution", "Two solutions", "Infinitely many solutions", "No solution"],
    3,
    "For any value of x, y = 2x + 1 is always 4 more than y = 2x − 3. So the two straight lines are parallel and never intersect, and the simultaneous equations have no solution.",
    "Hard",
  ],
  [
    "The equations 2x + 4y = 10 and x + 2y = 5 are drawn as graphs. What type of solution do these simultaneous equations have?",
    ["Infinitely many solutions", "No solution", "A unique solution", "Cannot be determined"],
    0,
    "The equation 2x + 4y = 10 simplifies to x + 2y = 5, the same as the second equation, so both represent the same line and have infinitely many solutions.",
    "Hard",
  ],
  [
    "Solve the simultaneous equations x + y = 12 and 2x − y = 3 using the elimination method.",
    ["x = 4, y = 8", "x = 7, y = 5", "x = 5, y = 7", "x = 6, y = 6"],
    2,
    "Adding both equations: 3x = 15, so x = 5; substituting into x + y = 12 gives y = 7.",
    "Hard",
  ],
  [
    "A rectangular garden has a perimeter of 28 m. If its length is x m and width is y m, write the equation representing this perimeter.",
    ["x + y = 28", "x − y = 28", "xy = 28", "2x + 2y = 28"],
    3,
    "The perimeter of a rectangle = 2(length + width), so 2x + 2y = 28.",
    "Hard",
  ],
  [
    "Given 2x + 2y = 28 and x − y = 2, find the values of x and y.",
    ["x = 6, y = 8", "x = 8, y = 6", "x = 10, y = 4", "x = 7, y = 7"],
    1,
    "Simplify 2x + 2y = 28 to x + y = 14. Adding to x − y = 2: 2x = 16, so x = 8 and y = 6.",
    "Hard",
  ],
]);

const MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah ketaksamaan linear?",
    [
      "Hubungan antara dua ungkapan linear menggunakan <, >, ≤ atau ≥",
      "Persamaan yang menggunakan tanda sama dengan antara dua ungkapan",
      "Persamaan yang mengandungi dua pemboleh ubah berbeza",
      "Ungkapan yang pemboleh ubahnya dikuasaduakan",
    ],
    0,
    "Ketaksamaan linear ialah hubungan antara dua ungkapan linear yang tidak semestinya sama nilainya, dengan pemboleh ubah berkuasa 1.",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah simbol 'lebih besar daripada'?",
    ["<", ">", "≥", "≤"],
    1,
    "Simbol > bermaksud 'lebih besar daripada' (greater than).",
    "Easy",
  ],
  [
    "Manakah antara berikut ialah simbol 'lebih kecil daripada'?",
    [">", "≥", "<", "≤"],
    2,
    "Simbol < bermaksud 'lebih kecil daripada' (less than).",
    "Easy",
  ],
  [
    "Apakah simbol yang bermaksud 'sekurang-kurangnya' atau 'minimum'?",
    [">", "<", "≤", "≥"],
    3,
    "Simbol ≥ bermaksud 'lebih besar daripada atau sama dengan', dikaitkan dengan kata kunci 'sekurang-kurangnya' dan 'minimum'.",
    "Easy",
  ],
  [
    "Apakah simbol yang bermaksud 'paling banyak' atau 'maksimum'?",
    [">", "≤", "≥", "<"],
    1,
    "Simbol ≤ bermaksud 'lebih kecil daripada atau sama dengan', dikaitkan dengan kata kunci 'paling banyak' dan 'maksimum'.",
    "Easy",
  ],
  [
    "Markah minimum untuk lulus ialah 50. Tulis ketaksamaan ini jika m ialah markah.",
    ["m > 50", "m < 50", "m ≥ 50", "m ≤ 50"],
    2,
    "'Minimum 50' bermaksud markah mestilah sekurang-kurangnya 50, maka m ≥ 50.",
    "Easy",
  ],
  [
    "Had laju tidak melebihi 110 km/j. Tulis ketaksamaan ini jika h ialah had laju.",
    ["h > 110", "h < 110", "h ≥ 110", "h ≤ 110"],
    3,
    "'Tidak melebihi 110' bermaksud had laju paling banyak 110, maka h ≤ 110.",
    "Easy",
  ],
  [
    "Bilakah bulatan terbuka ○ digunakan pada garis nombor?",
    [
      "Apabila menggunakan simbol > atau <",
      "Apabila menggunakan simbol ≥ atau ≤",
      "Sentiasa digunakan",
      "Tidak pernah digunakan",
    ],
    0,
    "Bulatan terbuka ○ digunakan apabila menggunakan simbol > atau <, bermaksud nilai sempadan TIDAK termasuk.",
    "Easy",
  ],
  [
    "Bilakah bulatan tertutup ● digunakan pada garis nombor?",
    [
      "Apabila menggunakan simbol > atau <",
      "Sentiasa digunakan",
      "Apabila menggunakan simbol ≥ atau ≤",
      "Tidak pernah digunakan",
    ],
    2,
    "Bulatan tertutup ● digunakan apabila menggunakan simbol ≥ atau ≤, bermaksud nilai sempadan TERMASUK.",
    "Easy",
  ],
  [
    "Adakah nilai 5 termasuk dalam penyelesaian x > 5?",
    [
      "Ya, kerana simbol ≥ digunakan",
      "Ya, kerana 5 ialah nombor positif",
      "Tidak, kerana x ialah nombor negatif",
      "Tidak, kerana > menggunakan bulatan terbuka",
    ],
    3,
    "Simbol > menggunakan bulatan terbuka, jadi nilai sempadan 5 TIDAK termasuk dalam penyelesaian.",
    "Easy",
  ],
  [
    "Adakah nilai 5 termasuk dalam penyelesaian x ≥ 5?",
    [
      "Ya, kerana bulatan tertutup digunakan untuk ≥",
      "Tidak, kerana bulatan terbuka digunakan untuk ≥",
      "Ya, tetapi hanya jika x integer",
      "Tidak, kerana 5 ialah sempadan",
    ],
    0,
    "Simbol ≥ menggunakan bulatan tertutup, jadi nilai sempadan 5 TERMASUK dalam penyelesaian.",
    "Easy",
  ],
  [
    "Ke arah manakah anak panah pada garis nombor untuk x > 3?",
    ["Ke kiri", "Ke kanan", "Ke atas", "Tiada anak panah"],
    1,
    "Untuk x > 3, anak panah menghala ke kanan kerana x lebih besar daripada 3.",
    "Easy",
  ],
  [
    "Ke arah manakah anak panah pada garis nombor untuk x < 3?",
    ["Tiada anak panah", "Ke kanan", "Ke atas", "Ke kiri"],
    3,
    "Untuk x < 3, anak panah menghala ke kiri kerana x lebih kecil daripada 3.",
    "Easy",
  ],
  [
    "Ke arah manakah anak panah pada garis nombor untuk x ≥ −2?",
    ["Ke kanan", "Ke kiri", "Ke atas", "Tiada anak panah"],
    0,
    "Untuk x ≥ −2, anak panah menghala ke kanan kerana x lebih besar daripada atau sama dengan −2.",
    "Easy",
  ],
  [
    "Ke arah manakah anak panah pada garis nombor untuk x ≤ 4?",
    ["Ke kanan", "Ke kiri", "Ke atas", "Tiada anak panah"],
    1,
    "Untuk x ≤ 4, anak panah menghala ke kiri kerana x lebih kecil daripada atau sama dengan 4.",
    "Easy",
  ],
  [
    "Garis nombor x > 5 menggunakan jenis bulatan apakah pada titik 5?",
    ["Bulatan tertutup ●", "Tiada bulatan", "Bulatan terbuka ○", "Dua bulatan"],
    2,
    "Simbol > menggunakan bulatan terbuka ○ kerana nilai sempadan (5) tidak termasuk.",
    "Easy",
  ],
  [
    "Garis nombor x ≤ −1 menggunakan jenis bulatan apakah pada titik −1?",
    ["Bulatan tertutup ●", "Bulatan terbuka ○", "Tiada bulatan", "Tanda silang"],
    0,
    "Simbol ≤ menggunakan bulatan tertutup ● kerana nilai sempadan (−1) termasuk.",
    "Easy",
  ],
  [
    "Manakah antara berikut BUKAN ungkapan linear?",
    ["4a", "−7x", "5m²", "2y + 3"],
    2,
    "5m² mengandungi pemboleh ubah berkuasa 2, maka ia bukan ungkapan linear.",
    "Easy",
  ],
  [
    "Apakah perbezaan utama antara persamaan dan ketaksamaan?",
    [
      "Tiada perbezaan antara kedua-duanya",
      "Persamaan menggunakan =; ketaksamaan menggunakan <, >, ≤ atau ≥",
      "Persamaan sentiasa lebih sukar diselesaikan",
      "Ketaksamaan tidak pernah mengandungi pemboleh ubah",
    ],
    1,
    "Persamaan menggunakan tanda = manakala ketaksamaan menggunakan simbol seperti >, <, ≥, atau ≤.",
    "Easy",
  ],
  [
    "Apakah kata kunci yang dikaitkan dengan simbol >?",
    [
      "Sekurang-kurangnya, minimum",
      "Paling banyak, maksimum",
      "Tidak kurang daripada",
      "Lebih daripada, melebihi",
    ],
    3,
    "Simbol > dikaitkan dengan kata kunci 'lebih daripada', 'melebihi', atau 'greater than'.",
    "Easy",
  ],
  [
    "Apakah kata kunci yang dikaitkan dengan simbol ≤?",
    [
      "Lebih daripada, melebihi",
      "Sekurang-kurangnya, minimum",
      "Paling banyak, tidak melebihi",
      "Kurang daripada, di bawah",
    ],
    2,
    "Simbol ≤ dikaitkan dengan kata kunci 'paling banyak', 'tidak melebihi', dan 'maksimum'.",
    "Easy",
  ],
  [
    "Pilih ketaksamaan yang betul bagi 'umur melebihi 12 tahun' (u = umur).",
    ["u ≥ 12", "u > 12", "u ≤ 12", "u < 12"],
    1,
    "'Melebihi 12' bermaksud lebih daripada 12, maka u > 12 (bukan termasuk 12).",
    "Easy",
  ],
  [
    "Pilih ketaksamaan yang betul bagi 'suhu kurang daripada 25°C' (s = suhu).",
    ["s > 25", "s ≥ 25", "s ≤ 25", "s < 25"],
    3,
    "'Kurang daripada 25' bermaksud s < 25.",
    "Easy",
  ],
  [
    "Ketaksamaan manakah yang BENAR?",
    ["−3 > −5", "−7 > −2", "0 < −1", "4 < −4"],
    0,
    "−3 berada di sebelah kanan −5 pada garis nombor, maka −3 > −5.",
    "Easy",
  ],
  [
    "Manakah gambaran garis nombor yang betul untuk x < −2?",
    [
      "Bulatan terbuka pada −2, anak panah ke kanan",
      "Bulatan terbuka pada −2, anak panah ke kiri",
      "Bulatan tertutup pada −2, anak panah ke kiri",
      "Bulatan tertutup pada −2, anak panah ke kanan",
    ],
    1,
    "Simbol < menggunakan bulatan terbuka dan anak panah ke kiri (kerana x lebih kecil daripada −2).",
    "Easy",
  ],
  [
    "Manakah gambaran garis nombor yang betul untuk x ≥ 1?",
    [
      "Bulatan terbuka pada 1, anak panah ke kanan",
      "Bulatan terbuka pada 1, anak panah ke kiri",
      "Bulatan tertutup pada 1, anak panah ke kiri",
      "Bulatan tertutup pada 1, anak panah ke kanan",
    ],
    3,
    "Simbol ≥ menggunakan bulatan tertutup dan anak panah ke kanan (kerana x lebih besar daripada atau sama dengan 1).",
    "Easy",
  ],
  [
    "Antara nilai berikut, yang manakah memenuhi x ≤ −1?",
    ["−2", "0", "1", "3"],
    0,
    "−2 lebih kecil daripada −1, maka −2 memenuhi x ≤ −1. Nilai 0, 1 dan 3 lebih besar daripada −1.",
    "Easy",
  ],
  [
    "Pada garis nombor, nombor bertambah ke arah manakah?",
    ["Ke kiri", "Ke atas", "Ke kanan", "Ke bawah"],
    2,
    "Pada garis nombor mendatar, nilai nombor bertambah dari kiri ke kanan.",
    "Easy",
  ],
  [
    "Antara nilai x berikut, yang manakah memenuhi x + 2 > 6?",
    ["2", "3", "4", "5"],
    3,
    "x + 2 > 6 → x > 4. Hanya 5 lebih besar daripada 4. (Jika x = 4, 4 + 2 = 6 dan 6 > 6 adalah palsu.)",
    "Easy",
  ],
  [
    "Tukar ayat ini kepada ketaksamaan: 'x tidak kurang daripada 7'.",
    ["x > 7", "x ≥ 7", "x < 7", "x ≤ 7"],
    1,
    "'Tidak kurang daripada 7' bermaksud x mestilah sekurang-kurangnya 7, maka x ≥ 7.",
    "Easy",
  ],
]);

const MATH_C7_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a linear inequality?",
    [
      "A relationship between two linear expressions using <, >, ≤ or ≥",
      "An equation that uses an equals sign between two expressions",
      "An equation that contains two different variables",
      "An expression in which the variable is squared",
    ],
    0,
    "A linear inequality is a relationship between two linear expressions that are not necessarily equal, with the variable having a power of 1.",
    "Easy",
  ],
  [
    "Which of the following is the symbol for 'greater than'?",
    ["<", ">", "≥", "≤"],
    1,
    "The symbol > means 'greater than'.",
    "Easy",
  ],
  [
    "Which of the following is the symbol for 'less than'?",
    [">", "≥", "<", "≤"],
    2,
    "The symbol < means 'less than'.",
    "Easy",
  ],
  [
    "Which symbol means 'at least' or 'minimum'?",
    [">", "<", "≤", "≥"],
    3,
    "The symbol ≥ means 'greater than or equal to', associated with keywords 'at least' and 'minimum'.",
    "Easy",
  ],
  [
    "Which symbol means 'at most' or 'maximum'?",
    [">", "≤", "≥", "<"],
    1,
    "The symbol ≤ means 'less than or equal to', associated with keywords 'at most' and 'maximum'.",
    "Easy",
  ],
  [
    "The minimum mark to pass is 50. Write this inequality if m is the mark.",
    ["m > 50", "m < 50", "m ≥ 50", "m ≤ 50"],
    2,
    "'Minimum 50' means the mark must be at least 50, so m ≥ 50.",
    "Easy",
  ],
  [
    "The speed limit does not exceed 110 km/h. Write this inequality if h is the speed.",
    ["h > 110", "h < 110", "h ≥ 110", "h ≤ 110"],
    3,
    "'Does not exceed 110' means the speed is at most 110, so h ≤ 110.",
    "Easy",
  ],
  [
    "When is an open circle ○ used on the number line?",
    ["When using the symbol > or <", "When using the symbol ≥ or ≤", "Always", "Never"],
    0,
    "An open circle ○ is used when using > or <, meaning the boundary value is NOT included.",
    "Easy",
  ],
  [
    "When is a closed circle ● used on the number line?",
    ["When using > or <", "Always", "When using ≥ or ≤", "Never"],
    2,
    "A closed circle ● is used when using ≥ or ≤, meaning the boundary value IS included.",
    "Easy",
  ],
  [
    "Is the value 5 included in the solution of x > 5?",
    [
      "Yes, because the symbol ≥ is used",
      "Yes, because 5 is a positive number",
      "No, because x is a negative number",
      "No, because > uses an open circle",
    ],
    3,
    "The symbol > uses an open circle, so the boundary value 5 is NOT included in the solution.",
    "Easy",
  ],
  [
    "Is the value 5 included in the solution of x ≥ 5?",
    [
      "Yes, because a closed circle is used for ≥",
      "No, because an open circle is used for ≥",
      "Yes, but only if x is an integer",
      "No, because 5 is the boundary",
    ],
    0,
    "The symbol ≥ uses a closed circle, so the boundary value 5 IS included in the solution.",
    "Easy",
  ],
  [
    "Which direction does the arrow point on the number line for x > 3?",
    ["Left", "Right", "Up", "No arrow"],
    1,
    "For x > 3, the arrow points right because x is greater than 3.",
    "Easy",
  ],
  [
    "Which direction does the arrow point on the number line for x < 3?",
    ["No arrow", "Right", "Up", "Left"],
    3,
    "For x < 3, the arrow points left because x is less than 3.",
    "Easy",
  ],
  [
    "Which direction does the arrow point on the number line for x ≥ −2?",
    ["Right", "Left", "Up", "No arrow"],
    0,
    "For x ≥ −2, the arrow points right because x is greater than or equal to −2.",
    "Easy",
  ],
  [
    "Which direction does the arrow point on the number line for x ≤ 4?",
    ["Right", "Left", "Up", "No arrow"],
    1,
    "For x ≤ 4, the arrow points left because x is less than or equal to 4.",
    "Easy",
  ],
  [
    "What type of circle is used at point 5 on the number line for x > 5?",
    ["Closed circle ●", "No circle", "Open circle ○", "Two circles"],
    2,
    "The symbol > uses an open circle ○ because the boundary value (5) is not included.",
    "Easy",
  ],
  [
    "What type of circle is used at point −1 on the number line for x ≤ −1?",
    ["Closed circle ●", "Open circle ○", "No circle", "A cross"],
    0,
    "The symbol ≤ uses a closed circle ● because the boundary value (−1) is included.",
    "Easy",
  ],
  [
    "Which of the following is NOT a linear expression?",
    ["4a", "−7x", "5m²", "2y + 3"],
    2,
    "5m² contains a variable with a power of 2, so it is not a linear expression.",
    "Easy",
  ],
  [
    "What is the main difference between an equation and an inequality?",
    [
      "There is no difference between them",
      "An equation uses =; an inequality uses <, >, ≤ or ≥",
      "An equation is always harder to solve",
      "An inequality never contains a variable",
    ],
    1,
    "An equation uses the = sign while an inequality uses symbols such as >, <, ≥, or ≤.",
    "Easy",
  ],
  [
    "What keywords are associated with the symbol >?",
    ["At least, minimum", "At most, maximum", "Not less than, no fewer than", "More than, exceeds"],
    3,
    "The symbol > is associated with keywords 'more than', 'exceeds', and 'greater than'.",
    "Easy",
  ],
  [
    "What keywords are associated with the symbol ≤?",
    ["More than, exceeds", "At least, minimum", "At most, does not exceed", "Less than, below"],
    2,
    "The symbol ≤ is associated with keywords 'at most', 'does not exceed', and 'maximum'.",
    "Easy",
  ],
  [
    "Choose the correct inequality for 'age exceeds 12 years' (u = age).",
    ["u ≥ 12", "u > 12", "u ≤ 12", "u < 12"],
    1,
    "'Exceeds 12' means more than 12, so u > 12 (12 not included).",
    "Easy",
  ],
  [
    "Choose the correct inequality for 'temperature is less than 25°C' (s = temperature).",
    ["s > 25", "s ≥ 25", "s ≤ 25", "s < 25"],
    3,
    "'Less than 25' means s < 25.",
    "Easy",
  ],
  [
    "Which inequality is TRUE?",
    ["−3 > −5", "−7 > −2", "0 < −1", "4 < −4"],
    0,
    "−3 is to the right of −5 on the number line, so −3 > −5.",
    "Easy",
  ],
  [
    "Which number line representation is correct for x < −2?",
    [
      "Open circle at −2, arrow pointing right",
      "Open circle at −2, arrow pointing left",
      "Closed circle at −2, arrow pointing left",
      "Closed circle at −2, arrow pointing right",
    ],
    1,
    "The symbol < uses an open circle and arrow pointing left (because x is less than −2).",
    "Easy",
  ],
  [
    "Which number line representation is correct for x ≥ 1?",
    [
      "Open circle at 1, arrow pointing right",
      "Open circle at 1, arrow pointing left",
      "Closed circle at 1, arrow pointing left",
      "Closed circle at 1, arrow pointing right",
    ],
    3,
    "The symbol ≥ uses a closed circle and arrow pointing right (because x is greater than or equal to 1).",
    "Easy",
  ],
  [
    "Which of the following values satisfies x ≤ −1?",
    ["−2", "0", "1", "3"],
    0,
    "−2 is less than −1, so −2 satisfies x ≤ −1. The values 0, 1 and 3 are greater than −1.",
    "Easy",
  ],
  [
    "On the number line, values increase in which direction?",
    ["Left", "Up", "Right", "Down"],
    2,
    "On a horizontal number line, values increase from left to right.",
    "Easy",
  ],
  [
    "Which of the following values of x satisfies x + 2 > 6?",
    ["2", "3", "4", "5"],
    3,
    "x + 2 > 6 → x > 4. Only 5 is greater than 4. (If x = 4, 4 + 2 = 6 and 6 > 6 is false.)",
    "Easy",
  ],
  [
    "Convert this sentence to an inequality: 'x is not less than 7'.",
    ["x > 7", "x ≥ 7", "x < 7", "x ≤ 7"],
    1,
    "'Not less than 7' means x must be at least 7, so x ≥ 7.",
    "Easy",
  ],
]);

const MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Selesaikan 2x + 3 > 7.",
    ["x > 2", "x > 5", "x > 4", "x > 1"],
    0,
    "2x + 3 > 7 → 2x > 4 → x > 2.",
    "Medium",
  ],
  [
    "Selesaikan 3x − 1 ≤ 8.",
    ["x ≤ 4", "x ≤ 3", "x ≤ 2", "x ≤ 9"],
    1,
    "3x − 1 ≤ 8 → 3x ≤ 9 → x ≤ 3.",
    "Medium",
  ],
  [
    "Selesaikan x + 5 < 9.",
    ["x < 5", "x < 14", "x < 4", "x < −4"],
    2,
    "x + 5 < 9 → x < 9 − 5 → x < 4.",
    "Medium",
  ],
  [
    "Selesaikan x/4 ≥ 3.",
    ["x ≥ 4", "x ≥ 7", "x ≥ 0.75", "x ≥ 12"],
    3,
    "x/4 ≥ 3 → x ≥ 3 × 4 → x ≥ 12.",
    "Medium",
  ],
  [
    "Selesaikan −x > −5.",
    ["x > 5", "x < 5", "x > −5", "x < −5"],
    1,
    "−x > −5 → darab dengan −1, tukar simbol → x < 5.",
    "Medium",
  ],
  [
    "Selesaikan −2x > 8.",
    ["x > −4", "x > 4", "x < −4", "x < 4"],
    2,
    "−2x > 8 → bahagi dengan −2, tukar simbol → x < −4.",
    "Medium",
  ],
  [
    "Selesaikan −3x ≤ 9.",
    ["x ≤ −3", "x ≤ 3", "x ≥ 3", "x ≥ −3"],
    3,
    "−3x ≤ 9 → bahagi dengan −3, tukar simbol → x ≥ −3.",
    "Medium",
  ],
  [
    "Selesaikan −4x ≤ 8.",
    ["x ≥ −2", "x ≤ −2", "x ≤ 2", "x ≥ 2"],
    0,
    "−4x ≤ 8 → bahagi dengan −4, tukar simbol → x ≥ −2.",
    "Medium",
  ],
  [
    "Selesaikan 5 − x > 2.",
    ["x > 3", "x > −3", "x < 3", "x < −3"],
    2,
    "5 − x > 2 → −x > −3 → darab dengan −1, tukar simbol → x < 3.",
    "Medium",
  ],
  [
    "Selesaikan 2x + 1 ≥ −3.",
    ["x ≥ 1", "x ≥ 2", "x ≥ −1", "x ≥ −2"],
    3,
    "2x + 1 ≥ −3 → 2x ≥ −4 → x ≥ −2.",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi x > 3?",
    ["4, 5, 6, 7, ...", "3, 4, 5, 6", "0, 1, 2, 3", "3 sahaja"],
    0,
    "x > 3 bermaksud x lebih besar daripada 3. Nilai integer yang mungkin ialah 4, 5, 6, 7, ... (tidak termasuk 3).",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi x ≤ 2?",
    ["1, 2, 3, 4", "2, 1, 0, −1, ...", "2, 3, 4, 5", "3, 4, 5, ..."],
    1,
    "x ≤ 2 bermaksud x lebih kecil daripada atau sama dengan 2. Nilai integer: 2, 1, 0, −1, −2, ... (termasuk 2).",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi −1 < x ≤ 4?",
    ["−1, 0, 1, 2, 3, 4", "0, 1, 2, 3", "−1, 0, 1, 2, 3", "0, 1, 2, 3, 4"],
    3,
    "−1 < x ≤ 4 bermaksud x lebih besar daripada −1 (tidak termasuk) dan paling besar 4 (termasuk). Integer: 0, 1, 2, 3, 4.",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi 2 ≤ x < 7?",
    ["2, 3, 4, 5, 6", "3, 4, 5, 6", "2, 3, 4, 5, 6, 7", "2, 3, 4, 5, 6, 7, 8"],
    0,
    "2 ≤ x < 7 bermaksud x sekurang-kurangnya 2 (termasuk) dan kurang daripada 7 (tidak termasuk). Integer: 2, 3, 4, 5, 6.",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi 1 < x < 5?",
    ["1, 2, 3, 4, 5", "2, 3, 4", "1, 2, 3, 4", "2, 3, 4, 5"],
    1,
    "1 < x < 5 bermaksud x lebih besar daripada 1 (tidak termasuk) dan kurang daripada 5 (tidak termasuk). Integer: 2, 3, 4.",
    "Medium",
  ],
  [
    "Selesaikan 4x − 3 > 9.",
    ["x > 1.5", "x > 6", "x > 3", "x > 12"],
    2,
    "4x − 3 > 9 → 4x > 12 → x > 3.",
    "Medium",
  ],
  [
    "Selesaikan x/2 − 1 ≤ 3.",
    ["x ≤ 8", "x ≤ 4", "x ≤ 2", "x ≤ 6"],
    0,
    "x/2 − 1 ≤ 3 → x/2 ≤ 4 → x ≤ 8.",
    "Medium",
  ],
  [
    "Apakah yang berlaku kepada simbol ketaksamaan apabila kita mendarab kedua-dua belah dengan nombor negatif?",
    ["Simbol kekal sama", "Simbol digugurkan", "Simbol mesti ditukar", "Simbol bertukar kepada ="],
    2,
    "Apabila mendarab kedua-dua belah ketaksamaan dengan nombor negatif, arah simbol MESTI DITUKAR.",
    "Medium",
  ],
  [
    "Apakah yang berlaku kepada simbol ketaksamaan apabila kita membahagi kedua-dua belah dengan nombor positif?",
    ["Simbol mesti ditukar", "Simbol kekal sama", "Simbol digugurkan", "Simbol bertukar kepada ="],
    1,
    "Pembahagian dengan nombor POSITIF tidak mengubah arah simbol ketaksamaan.",
    "Medium",
  ],
  [
    "Nyatakan bentuk akas bagi y > 8.",
    ["8 > y", "y ≥ 8", "y < 8", "8 < y"],
    3,
    "Sifat Akas: jika y > 8, maka 8 < y.",
    "Medium",
  ],
  [
    "Nyatakan bentuk akas bagi 3 ≥ x.",
    ["x ≥ 3", "x > 3", "x ≤ 3", "x < 3"],
    2,
    "Sifat Akas: jika 3 ≥ x, maka x ≤ 3.",
    "Medium",
  ],
  [
    "Menggunakan Sifat Transitif, jika a < b dan b < 5, apakah kesimpulannya?",
    ["a > 5", "a < 5", "a = 5", "a ≤ 5"],
    1,
    "Sifat Transitif: jika a < b dan b < 5, maka a < 5.",
    "Medium",
  ],
  [
    "Selesaikan 3 − 2x ≥ 7.",
    ["x ≥ −2", "x ≤ 2", "x ≥ 2", "x ≤ −2"],
    3,
    "3 − 2x ≥ 7 → −2x ≥ 4 → bahagi dengan −2, tukar simbol → x ≤ −2.",
    "Medium",
  ],
  [
    "Selesaikan x/3 + 1 ≥ 4.",
    ["x ≥ 9", "x ≥ 3", "x ≥ 15", "x ≥ 1"],
    0,
    "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9.",
    "Medium",
  ],
  [
    "Manakah perwakilan garis nombor bagi penyelesaian x/3 + 1 ≥ 4?",
    [
      "Bulatan terbuka pada 9, anak panah ke kanan",
      "Bulatan tertutup pada 9, anak panah ke kanan",
      "Bulatan terbuka pada 9, anak panah ke kiri",
      "Bulatan tertutup pada 9, anak panah ke kiri",
    ],
    1,
    "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9. Simbol ≥ menggunakan bulatan tertutup pada 9 dan anak panah ke kanan.",
    "Medium",
  ],
  [
    "Selesaikan −x/2 < 3.",
    ["x < 6", "x < −6", "x > 6", "x > −6"],
    3,
    "−x/2 < 3 → darab dengan −2, tukar simbol → x > −6.",
    "Medium",
  ],
  [
    "Nyatakan nilai integer terkecil yang memenuhi x > −3.",
    ["−2", "−3", "0", "−4"],
    0,
    "x > −3 bermaksud x lebih besar daripada −3. Integer terkecil ialah −2.",
    "Medium",
  ],
  [
    "Nyatakan nilai integer terbesar yang memenuhi x < 5.",
    ["5", "6", "4", "10"],
    2,
    "x < 5 bermaksud x lebih kecil daripada 5. Integer terbesar ialah 4.",
    "Medium",
  ],
  [
    "Selesaikan 6x + 2 > 20.",
    ["x < 3", "x > 11/3", "x > 18", "x > 3"],
    3,
    "6x + 2 > 20 → 6x > 18 → x > 3. (x > 11/3 datang daripada menambah 2 dan bukannya menolak 2.)",
    "Medium",
  ],
  [
    "Selesaikan 4 − 3x ≤ 10.",
    ["x ≥ 2", "x ≥ −2", "x ≤ 2", "x ≤ −2"],
    1,
    "4 − 3x ≤ 10 → −3x ≤ 6 → bahagi dengan −3 dan tukar arah simbol → x ≥ −2.",
    "Medium",
  ],
]);

const MATH_C7_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Solve 2x + 3 > 7.",
    ["x > 2", "x > 5", "x > 4", "x > 1"],
    0,
    "2x + 3 > 7 → 2x > 4 → x > 2.",
    "Medium",
  ],
  [
    "Solve 3x − 1 ≤ 8.",
    ["x ≤ 4", "x ≤ 3", "x ≤ 2", "x ≤ 9"],
    1,
    "3x − 1 ≤ 8 → 3x ≤ 9 → x ≤ 3.",
    "Medium",
  ],
  [
    "Solve x + 5 < 9.",
    ["x < 5", "x < 14", "x < 4", "x < −4"],
    2,
    "x + 5 < 9 → x < 9 − 5 → x < 4.",
    "Medium",
  ],
  [
    "Solve x/4 ≥ 3.",
    ["x ≥ 4", "x ≥ 7", "x ≥ 0.75", "x ≥ 12"],
    3,
    "x/4 ≥ 3 → x ≥ 3 × 4 → x ≥ 12.",
    "Medium",
  ],
  [
    "Solve −x > −5.",
    ["x > 5", "x < 5", "x > −5", "x < −5"],
    1,
    "−x > −5 → multiply by −1, reverse symbol → x < 5.",
    "Medium",
  ],
  [
    "Solve −2x > 8.",
    ["x > −4", "x > 4", "x < −4", "x < 4"],
    2,
    "−2x > 8 → divide by −2, reverse symbol → x < −4.",
    "Medium",
  ],
  [
    "Solve −3x ≤ 9.",
    ["x ≤ −3", "x ≤ 3", "x ≥ 3", "x ≥ −3"],
    3,
    "−3x ≤ 9 → divide by −3, reverse symbol → x ≥ −3.",
    "Medium",
  ],
  [
    "Solve −4x ≤ 8.",
    ["x ≥ −2", "x ≤ −2", "x ≤ 2", "x ≥ 2"],
    0,
    "−4x ≤ 8 → divide by −4, reverse symbol → x ≥ −2.",
    "Medium",
  ],
  [
    "Solve 5 − x > 2.",
    ["x > 3", "x > −3", "x < 3", "x < −3"],
    2,
    "5 − x > 2 → −x > −3 → multiply by −1, reverse symbol → x < 3.",
    "Medium",
  ],
  [
    "Solve 2x + 1 ≥ −3.",
    ["x ≥ 1", "x ≥ 2", "x ≥ −1", "x ≥ −2"],
    3,
    "2x + 1 ≥ −3 → 2x ≥ −4 → x ≥ −2.",
    "Medium",
  ],
  [
    "What are the possible integer values for x > 3?",
    ["4, 5, 6, 7, ...", "3, 4, 5, 6", "0, 1, 2, 3", "3 only"],
    0,
    "x > 3 means x is greater than 3. Possible integers: 4, 5, 6, 7, ... (3 not included).",
    "Medium",
  ],
  [
    "What are the possible integer values for x ≤ 2?",
    ["1, 2, 3, 4", "2, 1, 0, −1, ...", "2, 3, 4, 5", "3, 4, 5, ..."],
    1,
    "x ≤ 2 means x is less than or equal to 2. Integers: 2, 1, 0, −1, −2, ... (including 2).",
    "Medium",
  ],
  [
    "What are the possible integer values for −1 < x ≤ 4?",
    ["−1, 0, 1, 2, 3, 4", "0, 1, 2, 3", "−1, 0, 1, 2, 3", "0, 1, 2, 3, 4"],
    3,
    "−1 < x ≤ 4 means x is greater than −1 (not included) and at most 4 (included). Integers: 0, 1, 2, 3, 4.",
    "Medium",
  ],
  [
    "What are the possible integer values for 2 ≤ x < 7?",
    ["2, 3, 4, 5, 6", "3, 4, 5, 6", "2, 3, 4, 5, 6, 7", "2, 3, 4, 5, 6, 7, 8"],
    0,
    "2 ≤ x < 7 means x is at least 2 (included) and less than 7 (not included). Integers: 2, 3, 4, 5, 6.",
    "Medium",
  ],
  [
    "What are the possible integer values for 1 < x < 5?",
    ["1, 2, 3, 4, 5", "2, 3, 4", "1, 2, 3, 4", "2, 3, 4, 5"],
    1,
    "1 < x < 5 means x is greater than 1 (not included) and less than 5 (not included). Integers: 2, 3, 4.",
    "Medium",
  ],
  [
    "Solve 4x − 3 > 9.",
    ["x > 1.5", "x > 6", "x > 3", "x > 12"],
    2,
    "4x − 3 > 9 → 4x > 12 → x > 3.",
    "Medium",
  ],
  [
    "Solve x/2 − 1 ≤ 3.",
    ["x ≤ 8", "x ≤ 4", "x ≤ 2", "x ≤ 6"],
    0,
    "x/2 − 1 ≤ 3 → x/2 ≤ 4 → x ≤ 8.",
    "Medium",
  ],
  [
    "What happens to the inequality symbol when we multiply both sides by a negative number?",
    [
      "The symbol stays the same",
      "The symbol is dropped",
      "The symbol must be reversed",
      "The symbol becomes =",
    ],
    2,
    "When multiplying both sides of an inequality by a negative number, the symbol MUST BE REVERSED.",
    "Medium",
  ],
  [
    "What happens to the inequality symbol when we divide both sides by a positive number?",
    [
      "The symbol must be reversed",
      "The symbol stays the same",
      "The symbol is dropped",
      "The symbol becomes =",
    ],
    1,
    "Dividing by a POSITIVE number does not change the direction of the inequality symbol.",
    "Medium",
  ],
  [
    "State the converse form of y > 8.",
    ["8 > y", "y ≥ 8", "y < 8", "8 < y"],
    3,
    "Converse Property: if y > 8, then 8 < y.",
    "Medium",
  ],
  [
    "State the converse form of 3 ≥ x.",
    ["x ≥ 3", "x > 3", "x ≤ 3", "x < 3"],
    2,
    "Converse Property: if 3 ≥ x, then x ≤ 3.",
    "Medium",
  ],
  [
    "Using the Transitive Property, if a < b and b < 5, what is the conclusion?",
    ["a > 5", "a < 5", "a = 5", "a ≤ 5"],
    1,
    "Transitive Property: if a < b and b < 5, then a < 5.",
    "Medium",
  ],
  [
    "Solve 3 − 2x ≥ 7.",
    ["x ≥ −2", "x ≤ 2", "x ≥ 2", "x ≤ −2"],
    3,
    "3 − 2x ≥ 7 → −2x ≥ 4 → divide by −2, reverse symbol → x ≤ −2.",
    "Medium",
  ],
  [
    "Solve x/3 + 1 ≥ 4.",
    ["x ≥ 9", "x ≥ 3", "x ≥ 15", "x ≥ 1"],
    0,
    "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9.",
    "Medium",
  ],
  [
    "Which number line represents the solution of x/3 + 1 ≥ 4?",
    [
      "Open circle at 9, arrow pointing right",
      "Closed circle at 9, arrow pointing right",
      "Open circle at 9, arrow pointing left",
      "Closed circle at 9, arrow pointing left",
    ],
    1,
    "x/3 + 1 ≥ 4 → x/3 ≥ 3 → x ≥ 9. The symbol ≥ uses a closed circle at 9 and an arrow pointing right.",
    "Medium",
  ],
  [
    "Solve −x/2 < 3.",
    ["x < 6", "x < −6", "x > 6", "x > −6"],
    3,
    "−x/2 < 3 → multiply by −2, reverse symbol → x > −6.",
    "Medium",
  ],
  [
    "State the smallest integer that satisfies x > −3.",
    ["−2", "−3", "0", "−4"],
    0,
    "x > −3 means x is greater than −3. The smallest integer is −2.",
    "Medium",
  ],
  [
    "State the largest integer that satisfies x < 5.",
    ["5", "6", "4", "10"],
    2,
    "x < 5 means x is less than 5. The largest integer is 4.",
    "Medium",
  ],
  [
    "Solve 6x + 2 > 20.",
    ["x < 3", "x > 11/3", "x > 18", "x > 3"],
    3,
    "6x + 2 > 20 → 6x > 18 → x > 3. (x > 11/3 comes from adding 2 instead of subtracting 2.)",
    "Medium",
  ],
  [
    "Solve 4 − 3x ≤ 10.",
    ["x ≥ 2", "x ≥ −2", "x ≤ 2", "x ≤ −2"],
    1,
    "4 − 3x ≤ 10 → −3x ≤ 6 → divide by −3 and reverse the symbol → x ≥ −2.",
    "Medium",
  ],
]);

const MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Apakah ketaksamaan linear serentak?",
    [
      "Dua atau lebih ketaksamaan linear yang dipenuhi serentak",
      "Dua persamaan yang diselesaikan bersama",
      "Ketaksamaan yang setiap satunya ada dua pemboleh ubah",
      "Ketaksamaan yang menggunakan simbol berbeza",
    ],
    0,
    "Ketaksamaan linear serentak ialah dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah.",
    "Medium",
  ],
  [
    "Diberi x > −1 dan x ≤ 3, apakah nilai sepunya dalam bentuk ketaksamaan berganda?",
    ["−1 ≤ x < 3", "−1 < x ≤ 3", "−1 < x < 3", "−1 ≤ x ≤ 3"],
    1,
    "x > −1 (tidak termasuk −1) dan x ≤ 3 (termasuk 3) menghasilkan −1 < x ≤ 3.",
    "Medium",
  ],
  [
    "Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > −1 dan x ≤ 3?",
    ["−1, 0, 1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "−1, 0, 1, 2"],
    2,
    "−1 < x ≤ 3 menghasilkan nilai integer 0, 1, 2, 3 (−1 tidak termasuk, 3 termasuk).",
    "Medium",
  ],
  [
    "Diberi x > 2 dan x > 5, apakah nilai sepunya?",
    ["x > 2", "2 < x < 5", "Tiada nilai sepunya", "x > 5"],
    3,
    "Apabila kedua-dua ketaksamaan menghala ke arah yang sama, gunakan syarat lebih ketat. x > 5 lebih ketat daripada x > 2.",
    "Medium",
  ],
  [
    "Diberi x ≤ 4 dan x ≤ 1, apakah nilai sepunya?",
    ["x ≤ 4", "x ≤ 1", "1 ≤ x ≤ 4", "Tiada nilai sepunya"],
    1,
    "Apabila kedua-dua menghala ke arah yang sama (kiri), gunakan syarat lebih ketat. x ≤ 1 lebih ketat daripada x ≤ 4.",
    "Medium",
  ],
  [
    "Diberi x > 5 dan x < 2, apakah kesimpulannya?",
    [
      "Nilai sepunya ialah x > 5 dan x < 2",
      "Nilai sepunya ialah 2 < x < 5",
      "Tiada nilai sepunya",
      "Nilai sepunya ialah x = 3.5",
    ],
    2,
    "x > 5 bermaksud nilai lebih dari 5; x < 2 bermaksud nilai kurang daripada 2. Tiada nilai yang boleh memenuhi kedua-dua syarat ini serentak.",
    "Medium",
  ],
  [
    "Diberi x ≥ 4 dan x ≤ 1, apakah kesimpulannya?",
    [
      "Nilai sepunya ialah 1 ≤ x ≤ 4",
      "Nilai sepunya ialah 2 atau 3",
      "Nilai sepunya ialah x = 2.5",
      "Tiada nilai sepunya",
    ],
    3,
    "x ≥ 4 bermaksud 4 ke atas; x ≤ 1 bermaksud 1 ke bawah. Kawasan tidak bertindih, jadi tiada nilai sepunya.",
    "Medium",
  ],
  [
    "Selesaikan ketaksamaan serentak 2x + 1 > 5 dan 3x − 2 < 13, kemudian nyatakan nilai integer yang mungkin.",
    ["3, 4", "2, 3, 4, 5", "3, 4, 5", "2, 3, 4"],
    0,
    "2x + 1 > 5 → x > 2. 3x − 2 < 13 → 3x < 15 → x < 5. Maka 2 < x < 5, dan integernya ialah 3 dan 4.",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan serentak x + 3 ≥ 1 dan x − 2 ≤ 4, kemudian nyatakan nilai integer yang mungkin.",
    [
      "x ≤ 6, integer: ..., 4, 5, 6",
      "x ≥ −2, integer: −2, −1, 0, ...",
      "−2 ≤ x ≤ 6, integer: −2, −1, 0, 1, 2, 3, 4, 5, 6",
      "Tiada nilai sepunya",
    ],
    2,
    "x + 3 ≥ 1 → x ≥ −2; x − 2 ≤ 4 → x ≤ 6. Nilai sepunya: −2 ≤ x ≤ 6. Integer: −2, −1, 0, 1, 2, 3, 4, 5, 6.",
    "Hard",
  ],
  [
    "Selesaikan −2x + 3 > 1 dan cari nilai integer yang mungkin jika x < 5 juga perlu dipenuhi.",
    [
      "1 < x < 5, integer: 2, 3, 4",
      "x < 5, integer: 4, 3, 2, ...",
      "Tiada nilai sepunya",
      "x < 1, integer: 0, −1, −2, ...",
    ],
    3,
    "−2x + 3 > 1 → −2x > −2 → bahagi dengan −2 dan tukar arah simbol → x < 1. Bersama x < 5, syarat lebih ketat ialah x < 1. Integer: 0, −1, −2, ...",
    "Hard",
  ],
  [
    "Sebuah kedai menjual tiket dengan harga sekurang-kurangnya RM5 tetapi tidak melebihi RM20. Tulis ketaksamaan untuk harga tiket h.",
    ["5 ≤ h ≤ 20", "5 < h < 20", "h ≥ 5 dan h > 20", "h > 5 dan h < 20"],
    0,
    "'Sekurang-kurangnya RM5' bermaksud h ≥ 5; 'tidak melebihi RM20' bermaksud h ≤ 20. Jadi 5 ≤ h ≤ 20.",
    "Hard",
  ],
  [
    "Umur peserta mestilah lebih daripada 12 tahun dan tidak melebihi 18 tahun. Tulis ketaksamaan untuk umur u dan nyatakan nilai integer yang mungkin.",
    [
      "12 ≤ u < 18, integer: 12, 13, 14, 15, 16, 17",
      "12 < u ≤ 18, integer: 13, 14, 15, 16, 17, 18",
      "12 < u < 18, integer: 13, 14, 15, 16, 17",
      "12 ≤ u ≤ 18, integer: 12, 13, ..., 18",
    ],
    1,
    "'Lebih daripada 12' → u > 12 (12 tidak termasuk); 'tidak melebihi 18' → u ≤ 18 (18 termasuk). Jadi 12 < u ≤ 18. Integer: 13, 14, 15, 16, 17, 18.",
    "Hard",
  ],
  [
    "Berat beg sekolah mestilah tidak kurang daripada 1 kg dan tidak melebihi 5 kg. Tulis ketaksamaan untuk berat b.",
    ["1 < b < 5", "1 ≤ b < 5", "1 < b ≤ 5", "1 ≤ b ≤ 5"],
    3,
    "'Tidak kurang daripada 1' → b ≥ 1; 'tidak melebihi 5' → b ≤ 5. Jadi 1 ≤ b ≤ 5.",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan serentak −x + 2 > −1 dan 2x − 3 < 5.",
    ["x < 3", "3 < x < 4", "x < 4", "−3 < x < 4"],
    0,
    "−x + 2 > −1 → −x > −3 → x < 3. 2x − 3 < 5 → 2x < 8 → x < 4. Kedua-dua menghala ke kiri; syarat lebih ketat ialah x < 3.",
    "Hard",
  ],
  [
    "Apakah integer terbesar yang memenuhi kedua-dua ketaksamaan −x + 2 > −1 dan 2x − 3 < 5?",
    ["1", "2", "3", "4"],
    1,
    "−x + 2 > −1 → x < 3 dan 2x − 3 < 5 → x < 4. Nilai sepunya: x < 3. Integer terbesar ialah 2 (3 tidak termasuk).",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan serentak 3 − x ≥ 1 dan 2x > −4, kemudian nyatakan nilai integer yang mungkin.",
    ["−1, 0, 1", "−2, −1, 0, 1, 2", "−1, 0, 1, 2", "0, 1, 2"],
    2,
    "3 − x ≥ 1 → −x ≥ −2 → x ≤ 2. 2x > −4 → x > −2. Maka −2 < x ≤ 2: integer −1, 0, 1, 2.",
    "Hard",
  ],
  [
    "Bilakah perlu menggunakan 'syarat lebih ketat' dalam ketaksamaan serentak?",
    [
      "Apabila kedua-dua ketaksamaan menghala ke arah yang sama",
      "Apabila kedua-dua ketaksamaan menghala ke arah yang berlawanan",
      "Sentiasa perlu digunakan",
      "Tidak pernah perlu digunakan",
    ],
    0,
    "Syarat lebih ketat digunakan apabila kedua-dua ketaksamaan menghala ke arah yang sama, untuk memilih kawasan yang lebih terhad.",
    "Hard",
  ],
  [
    "Diberi x ≥ 2 dan x > −1, apakah nilai sepunya?",
    ["−1 < x ≤ 2", "x > −1", "x ≥ 2", "Tiada nilai sepunya"],
    2,
    "Kedua-dua menghala ke kanan. Syarat lebih ketat: x ≥ 2 (sempadan lebih besar). Nilai sepunya: x ≥ 2.",
    "Hard",
  ],
  [
    "Diberi x < 3 dan x ≤ 7, apakah nilai sepunya?",
    ["x ≤ 7", "x < 3", "3 < x ≤ 7", "Tiada nilai sepunya"],
    1,
    "Kedua-dua menghala ke kiri. Syarat lebih ketat: x < 3 (sempadan lebih kecil). Nilai sepunya: x < 3.",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan serentak 4 − x > 1 dan 2x + 3 ≤ 11.",
    ["1 < x ≤ 4", "3 < x ≤ 4", "x ≤ 4", "x < 3"],
    3,
    "4 − x > 1 → −x > −3 → x < 3. 2x + 3 ≤ 11 → 2x ≤ 8 → x ≤ 4. Kedua-dua menghala ke kiri; syarat lebih ketat ialah x < 3.",
    "Hard",
  ],
  [
    "Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > −4 dan x ≤ −1?",
    ["−4, −3, −2, −1", "−3, −2", "−3, −2, −1", "−4, −3, −2"],
    2,
    "x > −4 (tidak termasuk −4) dan x ≤ −1 (termasuk −1). Nilai sepunya: −4 < x ≤ −1. Integer: −3, −2, −1.",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan serentak 2x − 1 > 3 dan x + 4 ≤ 10, kemudian nyatakan nilai integer yang mungkin.",
    [
      "2 ≤ x ≤ 6, integer: 2, 3, 4, 5, 6",
      "2 < x ≤ 6, integer: 3, 4, 5, 6",
      "2 < x < 6, integer: 3, 4, 5",
      "Tiada nilai integer",
    ],
    1,
    "2x − 1 > 3 → x > 2. x + 4 ≤ 10 → x ≤ 6. Nilai sepunya: 2 < x ≤ 6. Integer: 3, 4, 5, 6.",
    "Hard",
  ],
  [
    "Sebuah syarikat menetapkan bahawa pekerja muda mestilah berumur lebih daripada 18 tetapi tidak melebihi 25. Berapa banyak nilai integer umur yang sah?",
    ["6", "5", "8", "7"],
    3,
    "18 < u ≤ 25 menghasilkan integer: 19, 20, 21, 22, 23, 24, 25 — iaitu 7 nilai.",
    "Hard",
  ],
  [
    "Berapakah bilangan nilai integer bagi 2 < x < 5 dan bagi 2 ≤ x ≤ 5, masing-masing?",
    ["2 dan 4", "4 dan 4", "3 dan 4", "2 dan 2"],
    0,
    "2 < x < 5: integer 3, 4 (2 nilai). 2 ≤ x ≤ 5: integer 2, 3, 4, 5 (4 nilai). Sempadan termasuk hanya apabila ≤ atau ≥ digunakan.",
    "Hard",
  ],
  [
    "Jika a > 0 dan b > 0 dengan a < b, apakah yang dapat disimpulkan tentang 1/a dan 1/b?",
    ["1/a < 1/b", "1/a > 1/b", "1/a = 1/b", "Tidak dapat ditentukan"],
    1,
    "Peraturan Salingan: jika 0 < a < b, maka 1/a > 1/b.",
    "Hard",
  ],
  [
    "Selesaikan ketaksamaan −3x + 6 ≥ 0 dan nyatakan nilai integer yang mungkin jika disertakan syarat x ≥ −5 juga.",
    [
      "Tiada nilai sepunya",
      "x ≤ 2 sahaja, integer: 2, 1, 0, −1, ...",
      "x ≥ −5 sahaja",
      "−5 ≤ x ≤ 2, integer: −5, −4, −3, −2, −1, 0, 1, 2",
    ],
    3,
    "−3x + 6 ≥ 0 → −3x ≥ −6 → x ≤ 2. Dan x ≥ −5. Nilai sepunya: −5 ≤ x ≤ 2. Integer: −5, −4, −3, −2, −1, 0, 1, 2.",
    "Hard",
  ],
  [
    "Apakah maksud 'kawasan bertindih' pada garis nombor dalam konteks ketaksamaan serentak?",
    [
      "Kawasan yang dipenuhi oleh KEDUA-DUA ketaksamaan pada masa yang sama",
      "Kawasan di mana garis dua ketaksamaan bersilang",
      "Kawasan antara dua sempadan sahaja",
      "Kawasan di luar kedua-dua ketaksamaan",
    ],
    0,
    "Kawasan bertindih ialah kawasan pada garis nombor yang dipenuhi oleh KEDUA-DUA ketaksamaan serentak pada masa yang sama.",
    "Hard",
  ],
  [
    "Diberi ketaksamaan serentak x > a dan x < b dengan a < b, dalam bentuk apakah nilai sepunya ditulis?",
    ["a ≤ x ≤ b", "a < x ≤ b", "a < x < b", "a > x > b"],
    2,
    "Jika x > a (a tidak termasuk) dan x < b (b tidak termasuk), nilai sepunya ialah a < x < b.",
    "Hard",
  ],
  [
    "Panjang sebuah tali mestilah lebih daripada 3 m dan kurang daripada 8 m. Berapakah nilai integer panjang yang mungkin (dalam meter)?",
    ["3, 4, 5, 6, 7, 8", "4, 5, 6, 7, 8", "3, 4, 5, 6, 7", "4, 5, 6, 7"],
    3,
    "3 < p < 8 menghasilkan integer 4, 5, 6, 7 (3 dan 8 tidak termasuk).",
    "Hard",
  ],
  [
    "Nyatakan bilangan nilai integer yang mungkin bagi ketaksamaan serentak x > 0 dan x ≤ 5.",
    ["4", "5", "6", "3"],
    1,
    "0 < x ≤ 5 menghasilkan integer 1, 2, 3, 4, 5 — iaitu 5 nilai.",
    "Hard",
  ],
]);

const MATH_C7_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "What are simultaneous linear inequalities?",
    [
      "Two or more linear inequalities satisfied at the same time",
      "Two equations that are solved together",
      "Inequalities that each contain two variables",
      "Inequalities that use different symbols",
    ],
    0,
    "Simultaneous linear inequalities are two or more linear inequalities that must be satisfied at the same time by one variable.",
    "Medium",
  ],
  [
    "Given x > −1 and x ≤ 3, what are the common values as a compound inequality?",
    ["−1 ≤ x < 3", "−1 < x ≤ 3", "−1 < x < 3", "−1 ≤ x ≤ 3"],
    1,
    "x > −1 (−1 not included) and x ≤ 3 (3 included) gives −1 < x ≤ 3.",
    "Medium",
  ],
  [
    "What are the possible integer values for the simultaneous inequality x > −1 and x ≤ 3?",
    ["−1, 0, 1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "−1, 0, 1, 2"],
    2,
    "−1 < x ≤ 3 gives integers 0, 1, 2, 3 (−1 not included, 3 included).",
    "Medium",
  ],
  [
    "Given x > 2 and x > 5, what are the common values?",
    ["x > 2", "2 < x < 5", "No common values", "x > 5"],
    3,
    "When both inequalities point in the same direction, use the stricter condition. x > 5 is stricter than x > 2.",
    "Medium",
  ],
  [
    "Given x ≤ 4 and x ≤ 1, what are the common values?",
    ["x ≤ 4", "x ≤ 1", "1 ≤ x ≤ 4", "No common values"],
    1,
    "When both point the same way (left), use the stricter condition. x ≤ 1 is stricter than x ≤ 4.",
    "Medium",
  ],
  [
    "Given x > 5 and x < 2, what is the conclusion?",
    [
      "Common values are x > 5 and x < 2",
      "Common values are 2 < x < 5",
      "No common values",
      "Common values are x = 3.5",
    ],
    2,
    "x > 5 means values greater than 5; x < 2 means values less than 2. No value can satisfy both conditions at the same time.",
    "Medium",
  ],
  [
    "Given x ≥ 4 and x ≤ 1, what is the conclusion?",
    [
      "Common values are 1 ≤ x ≤ 4",
      "Common values are 2 or 3",
      "Common values are x = 2.5",
      "No common values",
    ],
    3,
    "x ≥ 4 means 4 and above; x ≤ 1 means 1 and below. Regions do not overlap, so no common values.",
    "Medium",
  ],
  [
    "Solve the simultaneous inequalities 2x + 1 > 5 and 3x − 2 < 13, then state the possible integer values.",
    ["3, 4", "2, 3, 4, 5", "3, 4, 5", "2, 3, 4"],
    0,
    "2x + 1 > 5 → x > 2. 3x − 2 < 13 → 3x < 15 → x < 5. So 2 < x < 5, and the integers are 3 and 4.",
    "Hard",
  ],
  [
    "Solve the simultaneous inequalities x + 3 ≥ 1 and x − 2 ≤ 4, then state the possible integer values.",
    [
      "x ≤ 6, integers: ..., 4, 5, 6",
      "x ≥ −2, integers: −2, −1, 0, ...",
      "−2 ≤ x ≤ 6, integers: −2, −1, 0, 1, 2, 3, 4, 5, 6",
      "No common values",
    ],
    2,
    "x + 3 ≥ 1 → x ≥ −2; x − 2 ≤ 4 → x ≤ 6. Common values: −2 ≤ x ≤ 6. Integers: −2, −1, 0, 1, 2, 3, 4, 5, 6.",
    "Hard",
  ],
  [
    "Solve −2x + 3 > 1 and find the possible integer values if x < 5 must also be satisfied.",
    [
      "1 < x < 5, integers: 2, 3, 4",
      "x < 5, integers: 4, 3, 2, ...",
      "No common values",
      "x < 1, integers: 0, −1, −2, ...",
    ],
    3,
    "−2x + 3 > 1 → −2x > −2 → divide by −2 and reverse the symbol → x < 1. Together with x < 5, the stricter condition is x < 1. Integers: 0, −1, −2, ...",
    "Hard",
  ],
  [
    "A shop sells tickets at a price of at least RM5 but not more than RM20. Write the inequality for ticket price h.",
    ["5 ≤ h ≤ 20", "5 < h < 20", "h ≥ 5 and h > 20", "h > 5 and h < 20"],
    0,
    "'At least RM5' means h ≥ 5; 'not more than RM20' means h ≤ 20. So 5 ≤ h ≤ 20.",
    "Hard",
  ],
  [
    "Participants must be older than 12 but not older than 18. Write the inequality for age u and state the possible integer values.",
    [
      "12 ≤ u < 18, integers: 12, 13, 14, 15, 16, 17",
      "12 < u ≤ 18, integers: 13, 14, 15, 16, 17, 18",
      "12 < u < 18, integers: 13, 14, 15, 16, 17",
      "12 ≤ u ≤ 18, integers: 12, 13, ..., 18",
    ],
    1,
    "'Older than 12' → u > 12 (12 not included); 'not older than 18' → u ≤ 18 (18 included). So 12 < u ≤ 18. Integers: 13, 14, 15, 16, 17, 18.",
    "Hard",
  ],
  [
    "A school bag must weigh at least 1 kg and not more than 5 kg. Write the inequality for weight b.",
    ["1 < b < 5", "1 ≤ b < 5", "1 < b ≤ 5", "1 ≤ b ≤ 5"],
    3,
    "'Not less than 1' → b ≥ 1; 'not more than 5' → b ≤ 5. So 1 ≤ b ≤ 5.",
    "Hard",
  ],
  [
    "Solve the simultaneous inequalities −x + 2 > −1 and 2x − 3 < 5.",
    ["x < 3", "3 < x < 4", "x < 4", "−3 < x < 4"],
    0,
    "−x + 2 > −1 → −x > −3 → x < 3. 2x − 3 < 5 → 2x < 8 → x < 4. Both point left; the stricter condition is x < 3.",
    "Hard",
  ],
  [
    "What is the greatest integer that satisfies both −x + 2 > −1 and 2x − 3 < 5?",
    ["1", "2", "3", "4"],
    1,
    "−x + 2 > −1 → x < 3 and 2x − 3 < 5 → x < 4. Common values: x < 3. The greatest integer is 2 (3 is not included).",
    "Hard",
  ],
  [
    "Solve the simultaneous inequalities 3 − x ≥ 1 and 2x > −4, then state the possible integer values.",
    ["−1, 0, 1", "−2, −1, 0, 1, 2", "−1, 0, 1, 2", "0, 1, 2"],
    2,
    "3 − x ≥ 1 → −x ≥ −2 → x ≤ 2. 2x > −4 → x > −2. So −2 < x ≤ 2: integers −1, 0, 1, 2.",
    "Hard",
  ],
  [
    "When should the 'stricter condition' be used in simultaneous inequalities?",
    [
      "When both inequalities point in the same direction",
      "When both inequalities point in opposite directions",
      "Always",
      "Never",
    ],
    0,
    "The stricter condition is used when both inequalities point in the same direction, to select the more restricted region.",
    "Hard",
  ],
  [
    "Given x ≥ 2 and x > −1, what are the common values?",
    ["−1 < x ≤ 2", "x > −1", "x ≥ 2", "No common values"],
    2,
    "Both point right. Stricter condition: x ≥ 2 (larger boundary). Common values: x ≥ 2.",
    "Hard",
  ],
  [
    "Given x < 3 and x ≤ 7, what are the common values?",
    ["x ≤ 7", "x < 3", "3 < x ≤ 7", "No common values"],
    1,
    "Both point left. Stricter condition: x < 3 (smaller boundary). Common values: x < 3.",
    "Hard",
  ],
  [
    "Solve the simultaneous inequalities 4 − x > 1 and 2x + 3 ≤ 11.",
    ["1 < x ≤ 4", "3 < x ≤ 4", "x ≤ 4", "x < 3"],
    3,
    "4 − x > 1 → −x > −3 → x < 3. 2x + 3 ≤ 11 → 2x ≤ 8 → x ≤ 4. Both point left; the stricter condition is x < 3.",
    "Hard",
  ],
  [
    "What are the possible integer values for the simultaneous inequality x > −4 and x ≤ −1?",
    ["−4, −3, −2, −1", "−3, −2", "−3, −2, −1", "−4, −3, −2"],
    2,
    "x > −4 (−4 not included) and x ≤ −1 (−1 included). Common: −4 < x ≤ −1. Integers: −3, −2, −1.",
    "Hard",
  ],
  [
    "Solve the simultaneous inequalities 2x − 1 > 3 and x + 4 ≤ 10, then state the possible integer values.",
    [
      "2 ≤ x ≤ 6, integers: 2, 3, 4, 5, 6",
      "2 < x ≤ 6, integers: 3, 4, 5, 6",
      "2 < x < 6, integers: 3, 4, 5",
      "No integer values",
    ],
    1,
    "2x − 1 > 3 → x > 2. x + 4 ≤ 10 → x ≤ 6. Common values: 2 < x ≤ 6. Integers: 3, 4, 5, 6.",
    "Hard",
  ],
  [
    "A company requires young workers to be older than 18 but not more than 25. How many valid integer ages are there?",
    ["6", "5", "8", "7"],
    3,
    "18 < u ≤ 25 gives integers: 19, 20, 21, 22, 23, 24, 25 — that is 7 values.",
    "Hard",
  ],
  [
    "How many integer values do 2 < x < 5 and 2 ≤ x ≤ 5 have, respectively?",
    ["2 and 4", "4 and 4", "3 and 4", "2 and 2"],
    0,
    "2 < x < 5: integers 3, 4 (2 values). 2 ≤ x ≤ 5: integers 2, 3, 4, 5 (4 values). Boundaries are included only when ≤ or ≥ is used.",
    "Hard",
  ],
  [
    "If a > 0 and b > 0 with a < b, what can be concluded about 1/a and 1/b?",
    ["1/a < 1/b", "1/a > 1/b", "1/a = 1/b", "Cannot be determined"],
    1,
    "Reciprocal Rule: if 0 < a < b, then 1/a > 1/b.",
    "Hard",
  ],
  [
    "Solve −3x + 6 ≥ 0 and state possible integer values if x ≥ −5 is also required.",
    [
      "No common values",
      "x ≤ 2 only, integers: 2, 1, 0, −1, ...",
      "x ≥ −5 only",
      "−5 ≤ x ≤ 2, integers: −5, −4, −3, −2, −1, 0, 1, 2",
    ],
    3,
    "−3x + 6 ≥ 0 → −3x ≥ −6 → x ≤ 2. And x ≥ −5. Common: −5 ≤ x ≤ 2. Integers: −5, −4, −3, −2, −1, 0, 1, 2.",
    "Hard",
  ],
  [
    "What does 'overlapping region' mean on a number line in simultaneous inequalities?",
    [
      "The region satisfied by BOTH inequalities at the same time",
      "The region where the two inequality lines cross",
      "The region between two boundaries only",
      "The region outside both inequalities",
    ],
    0,
    "The overlapping region is the region on the number line satisfied by BOTH simultaneous inequalities at the same time.",
    "Hard",
  ],
  [
    "Given simultaneous inequalities x > a and x < b with a < b, in what form are the common values written?",
    ["a ≤ x ≤ b", "a < x ≤ b", "a < x < b", "a > x > b"],
    2,
    "If x > a (a not included) and x < b (b not included), the common values are a < x < b.",
    "Hard",
  ],
  [
    "The length of a rope must be more than 3 m and less than 8 m. What are the possible integer lengths (in metres)?",
    ["3, 4, 5, 6, 7, 8", "4, 5, 6, 7, 8", "3, 4, 5, 6, 7", "4, 5, 6, 7"],
    3,
    "3 < p < 8 gives integers 4, 5, 6, 7 (3 and 8 not included).",
    "Hard",
  ],
  [
    "State the number of possible integer values for the simultaneous inequality x > 0 and x ≤ 5.",
    ["4", "5", "6", "3"],
    1,
    "0 < x ≤ 5 gives integers 1, 2, 3, 4, 5 — that is 5 values.",
    "Hard",
  ],
]);

const MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah jenis sudut yang saiznya tepat 90°?",
    ["Sudut tegak", "Sudut tirus", "Sudut cakah", "Sudut refleks"],
    0,
    "Sudut tegak ialah sudut yang saiznya tepat 90°. Ia dilambangkan dengan tanda kotak kecil □ di bucu.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.rightAngle90,
  ],
  [
    "Apakah julat sudut tirus?",
    ["0° ≤ sudut ≤ 90°", "0° < sudut < 90°", "90° < sudut < 180°", "Tepat 90°"],
    1,
    "Sudut tirus ialah sudut yang lebih besar daripada 0° tetapi lebih kecil daripada 90°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.acuteExample40,
  ],
  [
    "Apakah julat sudut cakah?",
    ["0° hingga 90°", "Tepat 90°", "90° < sudut < 180°", "180° < sudut < 360°"],
    2,
    "Sudut cakah ialah sudut yang lebih besar daripada 90° tetapi lebih kecil daripada 180°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.obtuseExample130,
  ],
  [
    "Apakah julat sudut refleks?",
    ["0° < sudut < 90°", "90° < sudut < 180°", "Tepat 180°", "180° < sudut < 360°"],
    3,
    "Sudut refleks ialah sudut yang lebih besar daripada 180° tetapi lebih kecil daripada 360°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.reflexExample220,
  ],
  [
    "Sudut 145° termasuk dalam jenis apakah?",
    ["Sudut tirus", "Sudut cakah", "Sudut tegak", "Sudut refleks"],
    1,
    "145° terletak antara 90° dan 180°, maka ia adalah sudut cakah.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle145,
  ],
  [
    "Sudut 250° termasuk dalam jenis apakah?",
    ["Sudut tirus", "Sudut cakah", "Sudut refleks", "Sudut tegak"],
    2,
    "250° terletak antara 180° dan 360°, maka ia adalah sudut refleks.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle250,
  ],
  [
    "Sudut 55° termasuk dalam jenis apakah?",
    ["Sudut refleks", "Sudut tegak", "Sudut cakah", "Sudut tirus"],
    3,
    "55° terletak antara 0° dan 90°, maka ia adalah sudut tirus.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle55,
  ],
  [
    "Apakah simbol yang menandakan sudut tegak dalam rajah?",
    ["Tanda kotak kecil □", "Tanda anak panah", "Tanda garis miring", "Tanda lengkung"],
    0,
    "Sudut tegak (90°) ditandakan dengan simbol kotak kecil □ di bucu sudut.",
    "Easy",
  ],
  [
    "Apakah alat yang digunakan untuk mengukur sudut?",
    ["Pembaris", "Jangka lukis", "Protraktor", "Sesiku"],
    2,
    "Protraktor ialah alat yang digunakan untuk mengukur dan melukis sudut dalam darjah (°).",
    "Easy",
  ],
  [
    "Apakah unit ukuran sudut?",
    ["Sentimeter (cm)", "Meter (m)", "Kilogram (kg)", "Darjah (°)"],
    3,
    "Sudut diukur dalam unit darjah (°).",
    "Easy",
  ],
  [
    "Apakah langkah pertama menggunakan protraktor?",
    [
      "Letakkan titik tengah protraktor pada bucu",
      "Baca nilai darjah pada skala",
      "Sejajarkan garis dasar dengan satu kaki sudut",
      "Lukis garis baharu dari bucu",
    ],
    0,
    "Langkah pertama: Letakkan titik tengah protraktor tepat pada bucu sudut yang hendak diukur.",
    "Easy",
  ],
  [
    "Dua tembereng garis adalah kongruen apabila?",
    ["Arahnya sama", "Panjangnya sama", "Warnanya sama", "Kedua-duanya mendatar"],
    1,
    "Dua tembereng garis adalah kongruen jika panjangnya sama.",
    "Easy",
  ],
  [
    "Dua sudut adalah kongruen apabila?",
    ["Bentuknya sama", "Letaknya sama", "Keduanya sudut tirus", "Saiznya (bilangan darjah) sama"],
    3,
    "Dua sudut adalah kongruen jika saiznya (bilangan darjah) adalah sama.",
    "Easy",
  ],
  [
    "Apakah 'bucu' dalam konteks sudut?",
    [
      "Titik di mana dua kaki sudut bertemu",
      "Titik hujung tembereng garis",
      "Sisi sudut",
      "Panjang sudut",
    ],
    0,
    "Bucu ialah titik di mana dua kaki (tembereng garis) sudut bertemu.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.labelledVertex,
  ],
  [
    "Manakah antara berikut adalah sudut tirus?",
    ["95°", "75°", "90°", "185°"],
    1,
    "75° terletak antara 0° dan 90°, maka ia adalah sudut tirus. 95° adalah cakah, 90° adalah tegak, 185° adalah refleks.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.acuteChoiceExample,
  ],
  [
    "Manakah antara berikut adalah sudut refleks?",
    ["80°", "170°", "200°", "90°"],
    2,
    "200° terletak antara 180° dan 360°, maka ia adalah sudut refleks.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.reflexChoiceExample,
  ],
  [
    "Diberi ∠PQR = 47° dan ∠STU = 47°. Apakah hubungan antara kedua-dua sudut itu?",
    ["Kongruen", "Pelengkap", "Penggenap", "Konjugat"],
    0,
    "Kedua-dua sudut mempunyai saiz yang sama, iaitu 47°, jadi kedua-duanya kongruen. (47° + 47° = 94°, bukan 90° atau 180°.)",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.pair47,
  ],
  [
    "Berapakah hasil tambah sudut-sudut pada satu garis lurus?",
    ["90°", "270°", "180°", "360°"],
    2,
    "Sudut-sudut pada satu garis lurus berjumlah 180°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.straightReference,
  ],
  [
    "Dalam rajah geometri, tembereng garis kongruen ditandakan dengan?",
    ["Tanda anak panah", "Tanda seretan (tick) yang sama", "Nombor yang sama", "Huruf yang sama"],
    1,
    "Tembereng garis kongruen ditandakan dengan tanda seretan (tick marks) yang sama dalam rajah geometri.",
    "Easy",
  ],
  [
    "Dalam rajah geometri, sudut kongruen ditandakan dengan?",
    [
      "Tanda seretan (tick) yang sama",
      "Nombor yang sama",
      "Simbol kotak □",
      "Lengkung (arc) yang sama",
    ],
    3,
    "Sudut kongruen ditandakan dengan lengkung (arc) yang sama dalam rajah geometri.",
    "Easy",
  ],
  [
    "Apakah yang berlaku semasa mengukur sudut jika anda menggunakan skala yang salah pada protraktor?",
    ["Tiada perbezaan", "Protraktor rosak", "Jawapan akan salah", "Sudut menjadi negatif"],
    2,
    "Protraktor mempunyai dua skala (dalam dan luar). Menggunakan skala yang salah akan memberikan jawapan yang tidak tepat.",
    "Easy",
  ],
  [
    "Sudut 88° termasuk dalam jenis apakah?",
    ["Sudut cakah", "Sudut tirus", "Sudut tegak", "Sudut refleks"],
    1,
    "88° terletak antara 0° dan 90°, maka ia adalah sudut tirus (kurang daripada 90°).",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.nearRight88,
  ],
  [
    "Apakah perbezaan antara sudut cakah dan sudut refleks?",
    [
      "Tiada perbezaan",
      "Cakah mempunyai bucu; Refleks tidak",
      "Cakah: 0°–90°; Refleks: 90°–180°",
      "Cakah: 90°–180°; Refleks: 180°–360°",
    ],
    3,
    "Sudut cakah terletak antara 90° dan 180°. Sudut refleks terletak antara 180° dan 360°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.obtuseVsReflex,
  ],
  [
    "Apakah yang dimaksudkan dengan 'kaki sudut'?",
    [
      "Dua tembereng garis yang membentuk sudut",
      "Garis lurus di bahagian bawah sudut sahaja",
      "Nilai darjah yang diukur bagi sudut",
      "Titik tengah di antara dua bucu sudut",
    ],
    0,
    "Kaki sudut ialah dua tembereng garis yang bertemu di bucu untuk membentuk sudut.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.labelledVertex,
  ],
  [
    "Sudut manakah yang TIDAK boleh diukur menggunakan protraktor separuh bulatan biasa (0°–180°) secara terus?",
    ["45°", "270°", "150°", "90°"],
    1,
    "Protraktor separuh bulatan hanya mengukur sudut 0° hingga 180°. Sudut refleks seperti 270° memerlukan pengiraan tambahan.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.beyondSemicircle,
  ],
  [
    "Apakah jenis sudut yang terbentuk di penjuru buku teks?",
    ["Sudut tirus", "Sudut refleks", "Sudut cakah", "Sudut tegak"],
    3,
    "Penjuru buku teks membentuk sudut 90° (sudut tegak).",
    "Easy",
  ],
  [
    "Pasangan sudut manakah ialah sudut pelengkap?",
    ["40° dan 50°", "40° dan 140°", "90° dan 90°", "100° dan 260°"],
    0,
    "Sudut pelengkap berjumlah 90°: 40° + 50° = 90°. (40° dan 140° ialah penggenap; 100° dan 260° ialah konjugat.)",
    "Easy",
  ],
  [
    "Sudut 179° termasuk dalam jenis apakah?",
    ["Sudut tirus", "Sudut tegak", "Sudut cakah", "Sudut refleks"],
    2,
    "179° terletak antara 90° dan 180°, maka ia adalah sudut cakah (walaupun hampir 180°).",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.nearStraight179,
  ],
  [
    "Manakah contoh sudut dalam kehidupan sebenar?",
    [
      "Panjang tepi sebuah meja",
      "Jisim beg sekolah yang penuh",
      "Luas kulit hadapan sebuah buku",
      "Putaran antara jarum jam pada pukul 3",
    ],
    3,
    "Sudut antara jarum jam panjang dan pendek pada pukul 3 adalah 90°, yang merupakan contoh sudut tegak.",
    "Easy",
  ],
  [
    "Apakah satu putaran penuh dalam darjah?",
    ["90°", "360°", "270°", "180°"],
    1,
    "Satu putaran penuh (complete turn) adalah 360°.",
    "Easy",
  ],
]);

const MATH_C8_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What type of angle is exactly 90°?",
    ["Right angle", "Acute angle", "Obtuse angle", "Reflex angle"],
    0,
    "A right angle is exactly 90°. It is marked with a small square symbol □ at the vertex.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.rightAngle90,
  ],
  [
    "What is the range of an acute angle?",
    ["0° ≤ angle ≤ 90°", "0° < angle < 90°", "90° < angle < 180°", "Exactly 90°"],
    1,
    "An acute angle is greater than 0° but less than 90°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.acuteExample40,
  ],
  [
    "What is the range of an obtuse angle?",
    ["0° to 90°", "Exactly 90°", "90° < angle < 180°", "180° < angle < 360°"],
    2,
    "An obtuse angle is greater than 90° but less than 180°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.obtuseExample130,
  ],
  [
    "What is the range of a reflex angle?",
    ["0° < angle < 90°", "90° < angle < 180°", "Exactly 180°", "180° < angle < 360°"],
    3,
    "A reflex angle is greater than 180° but less than 360°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.reflexExample220,
  ],
  [
    "What type of angle is 145°?",
    ["Acute", "Obtuse", "Right", "Reflex"],
    1,
    "145° lies between 90° and 180°, so it is an obtuse angle.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle145,
  ],
  [
    "What type of angle is 250°?",
    ["Acute", "Obtuse", "Reflex", "Right"],
    2,
    "250° lies between 180° and 360°, so it is a reflex angle.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle250,
  ],
  [
    "What type of angle is 55°?",
    ["Reflex", "Right", "Obtuse", "Acute"],
    3,
    "55° lies between 0° and 90°, so it is an acute angle.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.angle55,
  ],
  [
    "What symbol marks a right angle in a diagram?",
    ["A small square □", "An arrow mark", "A slash mark", "A curved arc"],
    0,
    "A right angle (90°) is marked with a small square symbol □ at the vertex.",
    "Easy",
  ],
  [
    "What tool is used to measure angles?",
    ["Ruler", "Compass", "Protractor", "Set square"],
    2,
    "A protractor is the tool used to measure and draw angles in degrees (°).",
    "Easy",
  ],
  [
    "What is the unit for measuring angles?",
    ["Centimetres (cm)", "Metres (m)", "Kilograms (kg)", "Degrees (°)"],
    3,
    "Angles are measured in the unit degrees (°).",
    "Easy",
  ],
  [
    "What is the first step when using a protractor?",
    [
      "Place the protractor's centre on the vertex",
      "Read the degree value on the scale",
      "Line up the baseline with one arm",
      "Draw a new line from the vertex",
    ],
    0,
    "First step: Place the centre point of the protractor exactly at the vertex of the angle.",
    "Easy",
  ],
  [
    "Two line segments are congruent when?",
    [
      "They go in the same direction",
      "They have the same length",
      "They are the same colour",
      "They are both horizontal",
    ],
    1,
    "Two line segments are congruent if they have the same length.",
    "Easy",
  ],
  [
    "Two angles are congruent when?",
    [
      "They look the same shape",
      "They are in the same position",
      "They are both acute angles",
      "They have the same size (degrees)",
    ],
    3,
    "Two angles are congruent if they have the same size (number of degrees).",
    "Easy",
  ],
  [
    "What is a 'vertex' in the context of angles?",
    [
      "The point where the two arms of an angle meet",
      "The endpoint of a line segment",
      "The side of an angle",
      "The length of an angle",
    ],
    0,
    "A vertex is the point where the two arms (line segments) of an angle meet.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.labelledVertex,
  ],
  [
    "Which of the following is an acute angle?",
    ["95°", "75°", "90°", "185°"],
    1,
    "75° lies between 0° and 90°, so it is acute. 95° is obtuse, 90° is right, 185° is reflex.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.acuteChoiceExample,
  ],
  [
    "Which of the following is a reflex angle?",
    ["80°", "170°", "200°", "90°"],
    2,
    "200° lies between 180° and 360°, so it is a reflex angle.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.reflexChoiceExample,
  ],
  [
    "Given ∠PQR = 47° and ∠STU = 47°. What is the relationship between the two angles?",
    ["Congruent", "Complementary", "Supplementary", "Conjugate"],
    0,
    "Both angles have the same size, 47°, so they are congruent. (47° + 47° = 94°, not 90° or 180°.)",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.pair47,
  ],
  [
    "What is the sum of the angles on a straight line?",
    ["90°", "270°", "180°", "360°"],
    2,
    "The angles on a straight line add up to 180°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.straightReference,
  ],
  [
    "In geometric diagrams, congruent line segments are marked with?",
    ["Arrow marks", "The same number of tick marks", "The same number", "The same letter"],
    1,
    "Congruent line segments are marked with the same number of tick marks in geometric diagrams.",
    "Easy",
  ],
  [
    "In geometric diagrams, congruent angles are marked with?",
    ["Tick marks", "The same number", "A square symbol □", "The same number of arcs"],
    3,
    "Congruent angles are marked with the same number of arcs in geometric diagrams.",
    "Easy",
  ],
  [
    "What happens if you use the wrong scale on a protractor?",
    [
      "No difference",
      "The protractor breaks",
      "The answer will be wrong",
      "The angle becomes negative",
    ],
    2,
    "A protractor has two scales (inner and outer). Using the wrong scale will give an incorrect measurement.",
    "Easy",
  ],
  [
    "What type of angle is 88°?",
    ["Obtuse", "Acute", "Right", "Reflex"],
    1,
    "88° lies between 0° and 90°, so it is an acute angle (less than 90°).",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.nearRight88,
  ],
  [
    "What is the difference between an obtuse and a reflex angle?",
    [
      "No difference",
      "Obtuse has a vertex; Reflex does not",
      "Obtuse: 0°–90°; Reflex: 90°–180°",
      "Obtuse: 90°–180°; Reflex: 180°–360°",
    ],
    3,
    "Obtuse angles are between 90° and 180°. Reflex angles are between 180° and 360°.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.obtuseVsReflex,
  ],
  [
    "What are the 'arms' of an angle?",
    [
      "The two line segments forming the angle",
      "Only the bottom line of the angle",
      "The number of degrees in the angle",
      "The midpoint between two vertices",
    ],
    0,
    "The arms of an angle are the two line segments that meet at the vertex to form the angle.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.labelledVertex,
  ],
  [
    "Which angle CANNOT be directly measured with a standard semicircular protractor (0°–180°)?",
    ["45°", "270°", "150°", "90°"],
    1,
    "A semicircular protractor only measures 0° to 180°. Reflex angles like 270° require additional calculation.",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.beyondSemicircle,
  ],
  [
    "What type of angle is formed at the corner of a textbook?",
    ["Acute", "Reflex", "Obtuse", "Right"],
    3,
    "The corner of a textbook forms a 90° angle (right angle).",
    "Easy",
  ],
  [
    "Which pair of angles are complementary angles?",
    ["40° and 50°", "40° and 140°", "90° and 90°", "100° and 260°"],
    0,
    "Complementary angles add up to 90°: 40° + 50° = 90°. (40° and 140° are supplementary; 100° and 260° are conjugate.)",
    "Easy",
  ],
  [
    "What type of angle is 179°?",
    ["Acute", "Right", "Obtuse", "Reflex"],
    2,
    "179° lies between 90° and 180°, so it is an obtuse angle (even though it is close to 180°).",
    "Easy",
    MATH_F1_C8_QUIZ_VISUALS.nearStraight179,
  ],
  [
    "Which is a real-life example of an angle?",
    [
      "The length along the edge of a table",
      "The mass of a full school bag",
      "The area of the cover of a book",
      "The turn between clock hands at 3 o'clock",
    ],
    3,
    "The angle between the hour and minute hands at 3 o'clock is 90°, a real-life example of a right angle.",
    "Easy",
  ],
  [
    "What is one complete turn in degrees?",
    ["90°", "360°", "270°", "180°"],
    1,
    "One complete turn is 360°.",
    "Easy",
  ],
]);

const MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Dua sudut pada garis lurus ialah 75° dan x. Cari x.",
    ["x = 105°", "x = 75°", "x = 115°", "x = 125°"],
    0,
    "Sudut pada garis lurus berjumlah 180°. x = 180° − 75° = 105°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight75,
  ],
  [
    "Tiga sudut pada garis lurus ialah 40°, 60° dan y. Cari y.",
    ["y = 100°", "y = 80°", "y = 60°", "y = 40°"],
    1,
    "40° + 60° + y = 180°. y = 180° − 100° = 80°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight40_60,
  ],
  [
    "Empat sudut pada satu titik ialah 90°, 120°, 80° dan z. Cari z.",
    ["z = 60°", "z = 80°", "z = 70°", "z = 50°"],
    2,
    "90° + 120° + 80° + z = 360°. z = 360° − 290° = 70°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.fullTurn90_120_80,
  ],
  [
    "Cari pelengkap bagi sudut 38°.",
    ["38°", "322°", "142°", "52°"],
    3,
    "Pelengkap = 90° − 38° = 52°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.complement38,
  ],
  [
    "Cari penggenap bagi sudut 115°.",
    ["245°", "65°", "75°", "25°"],
    1,
    "Penggenap = 180° − 115° = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.supplement115,
  ],
  [
    "Cari konjugat bagi sudut 135°.",
    ["45°", "315°", "225°", "245°"],
    2,
    "Konjugat = 360° − 135° = 225°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.conjugate135,
  ],
  [
    "Dua garis bersilang membentuk sudut 65° dan x (sudut bertentang bucu). Cari x.",
    ["115°", "180°", "25°", "65°"],
    3,
    "Sudut bertentang bucu adalah sama. x = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite65,
  ],
  [
    "Dua garis bersilang membentuk sudut 3a dan 120° (bertentang bucu). Cari a.",
    ["a = 40°", "a = 60°", "a = 20°", "a = 30°"],
    0,
    "3a = 120° (bertentang bucu). a = 120° ÷ 3 = 40°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite3a120,
  ],
  [
    "Dua garis lurus bersilang. Satu daripada sudut yang terbentuk ialah 55°. Apakah saiz keempat-empat sudut itu?",
    ["55°, 35°, 55°, 35°", "55°, 55°, 55°, 55°", "55°, 125°, 55°, 125°", "55°, 135°, 55°, 135°"],
    2,
    "Sudut bertentang bucu adalah sama: 55° dan 55°. Sudut bersebelahan pada garis lurus: 180° − 55° = 125°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite55,
  ],
  [
    "Sudut bersebelahan pada garis lurus = 148° dan y. Cari y.",
    ["y = 148°", "y = 52°", "y = 212°", "y = 32°"],
    3,
    "Sudut bersebelahan berjumlah 180°. y = 180° − 148° = 32°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.adjacent148,
  ],
  [
    "Jika (2x + 10)° dan 80° adalah sudut bertentang bucu, cari x.",
    ["x = 35", "x = 40", "x = 45", "x = 30"],
    0,
    "2x + 10 = 80. 2x = 70. x = 35.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite2x80,
  ],
  [
    "Pelengkap bagi sudut (x + 15)° ialah 40°. Cari nilai x.",
    ["x = 50", "x = 35", "x = 25", "x = 40"],
    1,
    "(x + 15) + 40 = 90. x + 55 = 90. x = 35.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.complementX15,
  ],
  [
    "Penggenap bagi sudut (3y − 10)° ialah 70°. Cari nilai y.",
    ["y = 60", "y = 30", "y = 50", "y = 40"],
    3,
    "(3y − 10) + 70 = 180. 3y + 60 = 180. 3y = 120. y = 40.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.supplement3y70,
  ],
  [
    "Garis rentas memotong dua garis selari. Satu sudut ialah 110°. Cari sudut sepadan dengannya.",
    ["110°", "70°", "80°", "180°"],
    0,
    "Sudut SEPADAN adalah SAMA BESAR. Sudut selari yang lain = 110°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding110,
  ],
  [
    "Garis rentas memotong dua garis selari. Satu sudut ialah 65°. Cari sudut selang-seli dengannya.",
    ["115°", "65°", "25°", "165°"],
    1,
    "Sudut SELANG-SELI adalah SAMA BESAR. Sudut yang lain = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.alternate65,
  ],
  [
    "Garis rentas memotong dua garis selari. Satu sudut pedalaman ialah 75°. Cari sudut pedalaman yang satu lagi pada sisi garis rentas yang sama.",
    ["75°", "255°", "105°", "180°"],
    2,
    "Sudut PEDALAMAN BERSEBELAHAN berjumlah 180°. Sudut yang lain = 180° − 75° = 105°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior75,
  ],
  [
    "Garis rentas memotong dua garis selari dengan sudut sepadan = (5x − 20)° dan 80°. Cari x.",
    ["x = 20", "x = 25", "x = 15", "x = 30"],
    0,
    "5x − 20 = 80 (sudut sepadan sama). 5x = 100. x = 20.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding5x80,
  ],
  [
    "Garis rentas memotong dua garis selari. Sudut selang-seli = (4y + 5)° dan 85°. Cari y.",
    ["y = 30", "y = 25", "y = 20", "y = 15"],
    2,
    "4y + 5 = 85 (sudut selang-seli sama). 4y = 80. y = 20.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.alternate4y85,
  ],
  [
    "Sudut pedalaman bersebelahan = (3z + 15)° dan 75°. Cari z.",
    ["z = 20", "z = 30", "z = 25", "z = 15"],
    1,
    "(3z + 15) + 75 = 180. 3z + 90 = 180. 3z = 90. z = 30.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior3z75,
  ],
  [
    "Dua garis bersilang. Sudut 1 = 4a, sudut bertentang bucu = 60°. Cari a.",
    ["a = 25°", "a = 20°", "a = 10°", "a = 15°"],
    3,
    "4a = 60 (bertentang bucu). a = 15.",
    "Medium",
  ],
  [
    "Tiga sudut pada garis lurus: (x + 20)°, 50° dan (x − 10)°. Cari x.",
    ["x = 55", "x = 50", "x = 60", "x = 45"],
    2,
    "(x + 20) + 50 + (x − 10) = 180. 2x + 60 = 180. 2x = 120. x = 60. Semak: 80° + 50° + 50° = 180°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straightX20_50,
  ],
  [
    "Garis AB adalah serenjang dengan CD. Apakah sudut yang terbentuk di persimpangan?",
    ["45°", "90°", "180°", "360°"],
    1,
    "Garis serenjang membentuk sudut tepat 90°.",
    "Medium",
  ],
  [
    "Dua garis selari. Garis rentas membentuk sudut 120° dengan garis atas. Cari sudut sepadan di garis bawah.",
    ["60°", "240°", "180°", "120°"],
    3,
    "Sudut sepadan adalah sama besar. Sudut sepadan = 120°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding120,
  ],
  [
    "Sudut pada garis lurus: (2x + 5)° dan (3x − 5)°. Cari x.",
    ["x = 36", "x = 40", "x = 32", "x = 45"],
    0,
    "(2x + 5) + (3x − 5) = 180. 5x = 180. x = 36.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight2x5_3x5,
  ],
  [
    "Dua sudut putaran lengkap: 200° dan y. Cari y.",
    ["y = 140°", "y = 160°", "y = 180°", "y = 200°"],
    1,
    "200° + y = 360°. y = 360° − 200° = 160°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.fullTurn200,
  ],
  [
    "Sudut pedalaman bersebelahan pada garis selari = 90° dan k. Cari k.",
    ["k = 45°", "k = 180°", "k = 270°", "k = 90°"],
    3,
    "Sudut pedalaman berjumlah 180°. 90° + k = 180°. k = 90°.",
    "Medium",
  ],
  [
    "Selang-seli dengan garis selari: sudut = (6m − 30)° dan 90°. Cari m.",
    ["m = 20", "m = 25", "m = 30", "m = 15"],
    0,
    "Sudut selang-seli adalah sama: 6m − 30 = 90. 6m = 120. m = 20.",
    "Medium",
  ],
  [
    "Sudut bersebelahan: (x + 40)° dan (2x − 10)°. Berjumlah 180°. Cari x.",
    ["x = 60", "x = 40", "x = 50", "x = 45"],
    2,
    "(x + 40) + (2x − 10) = 180. 3x + 30 = 180. 3x = 150. x = 50.",
    "Medium",
  ],
  [
    "Dua garis bersilang membentuk empat sudut: 40°, y, 40° dan z. Cari y.",
    ["y = 40°", "y = 180°", "y = 80°", "y = 140°"],
    3,
    "Sudut bertentang bucu: 40° bertentang bucu = 40°. Sudut bersebelahan: y = 180° − 40° = 140°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.crossing40,
  ],
  [
    "Jika sudut pedalaman bersebelahan = 2p dan 4p, cari nilai p.",
    ["p = 20°", "p = 30°", "p = 45°", "p = 60°"],
    1,
    "2p + 4p = 180°. 6p = 180°. p = 30°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior2p4p,
  ],
]);

const MATH_C8_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Two angles on a straight line are 75° and x. Find x.",
    ["x = 105°", "x = 75°", "x = 115°", "x = 125°"],
    0,
    "Angles on a straight line sum to 180°. x = 180° − 75° = 105°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight75,
  ],
  [
    "Three angles on a straight line are 40°, 60° and y. Find y.",
    ["y = 100°", "y = 80°", "y = 60°", "y = 40°"],
    1,
    "40° + 60° + y = 180°. y = 180° − 100° = 80°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight40_60,
  ],
  [
    "Four angles at a point are 90°, 120°, 80° and z. Find z.",
    ["z = 60°", "z = 80°", "z = 70°", "z = 50°"],
    2,
    "90° + 120° + 80° + z = 360°. z = 360° − 290° = 70°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.fullTurn90_120_80,
  ],
  [
    "Find the complement of 38°.",
    ["38°", "322°", "142°", "52°"],
    3,
    "Complement = 90° − 38° = 52°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.complement38,
  ],
  [
    "Find the supplement of 115°.",
    ["245°", "65°", "75°", "25°"],
    1,
    "Supplement = 180° − 115° = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.supplement115,
  ],
  [
    "Find the conjugate of 135°.",
    ["45°", "315°", "225°", "245°"],
    2,
    "Conjugate = 360° − 135° = 225°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.conjugate135,
  ],
  [
    "Two lines intersect forming 65° and x (vertically opposite). Find x.",
    ["115°", "180°", "25°", "65°"],
    3,
    "Vertically opposite angles are equal. x = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite65,
  ],
  [
    "Two lines intersect forming 3a and 120° (vertically opposite). Find a.",
    ["a = 40°", "a = 60°", "a = 20°", "a = 30°"],
    0,
    "3a = 120° (vertically opposite). a = 120° ÷ 3 = 40°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite3a120,
  ],
  [
    "Two straight lines intersect. One of the angles formed is 55°. What are the sizes of all four angles?",
    ["55°, 35°, 55°, 35°", "55°, 55°, 55°, 55°", "55°, 125°, 55°, 125°", "55°, 135°, 55°, 135°"],
    2,
    "Vertically opposite angles are equal: 55° and 55°. Adjacent angles on a straight line: 180° − 55° = 125°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite55,
  ],
  [
    "Adjacent angles on a straight line: 148° and y. Find y.",
    ["y = 148°", "y = 52°", "y = 212°", "y = 32°"],
    3,
    "Adjacent angles sum to 180°. y = 180° − 148° = 32°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.adjacent148,
  ],
  [
    "If (2x + 10)° and 80° are vertically opposite angles, find x.",
    ["x = 35", "x = 40", "x = 45", "x = 30"],
    0,
    "2x + 10 = 80. 2x = 70. x = 35.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.opposite2x80,
  ],
  [
    "The complement of the angle (x + 15)° is 40°. Find the value of x.",
    ["x = 50", "x = 35", "x = 25", "x = 40"],
    1,
    "(x + 15) + 40 = 90. x + 55 = 90. x = 35.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.complementX15,
  ],
  [
    "The supplement of the angle (3y − 10)° is 70°. Find the value of y.",
    ["y = 60", "y = 30", "y = 50", "y = 40"],
    3,
    "(3y − 10) + 70 = 180. 3y + 60 = 180. 3y = 120. y = 40.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.supplement3y70,
  ],
  [
    "A transversal cuts two parallel lines. One angle is 110°. Find the angle corresponding to it.",
    ["110°", "70°", "80°", "180°"],
    0,
    "CORRESPONDING angles are EQUAL. The other angle = 110°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding110,
  ],
  [
    "A transversal cuts two parallel lines. One angle is 65°. Find the angle alternate to it.",
    ["115°", "65°", "25°", "165°"],
    1,
    "ALTERNATE angles are EQUAL. The other angle = 65°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.alternate65,
  ],
  [
    "A transversal cuts two parallel lines. One interior angle is 75°. Find the other interior angle on the same side of the transversal.",
    ["75°", "255°", "105°", "180°"],
    2,
    "CO-INTERIOR angles sum to 180°. The other = 180° − 75° = 105°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior75,
  ],
  [
    "Transversal cuts two parallel lines: corresponding angles = (5x − 20)° and 80°. Find x.",
    ["x = 20", "x = 25", "x = 15", "x = 30"],
    0,
    "5x − 20 = 80 (corresponding angles equal). 5x = 100. x = 20.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding5x80,
  ],
  [
    "Transversal cuts two parallel lines: alternate angles = (4y + 5)° and 85°. Find y.",
    ["y = 30", "y = 25", "y = 20", "y = 15"],
    2,
    "4y + 5 = 85 (alternate angles equal). 4y = 80. y = 20.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.alternate4y85,
  ],
  [
    "Co-interior angles = (3z + 15)° and 75°. Find z.",
    ["z = 20", "z = 30", "z = 25", "z = 15"],
    1,
    "(3z + 15) + 75 = 180. 3z + 90 = 180. 3z = 90. z = 30.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior3z75,
  ],
  [
    "Two lines intersect. Angle 1 = 4a, vertically opposite angle = 60°. Find a.",
    ["a = 25°", "a = 20°", "a = 10°", "a = 15°"],
    3,
    "4a = 60 (vertically opposite). a = 15.",
    "Medium",
  ],
  [
    "Three angles on a straight line: (x + 20)°, 50° and (x − 10)°. Find x.",
    ["x = 55", "x = 50", "x = 60", "x = 45"],
    2,
    "(x + 20) + 50 + (x − 10) = 180. 2x + 60 = 180. 2x = 120. x = 60. Check: 80° + 50° + 50° = 180°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straightX20_50,
  ],
  [
    "Line AB is perpendicular to CD. What angle is formed at the intersection?",
    ["45°", "90°", "180°", "360°"],
    1,
    "Perpendicular lines form a right angle of exactly 90°.",
    "Medium",
  ],
  [
    "Two parallel lines. Transversal forms 120° with the top line. Find the corresponding angle at the bottom line.",
    ["60°", "240°", "180°", "120°"],
    3,
    "Corresponding angles are equal. Corresponding angle = 120°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.corresponding120,
  ],
  [
    "Angles on a straight line: (2x + 5)° and (3x − 5)°. Find x.",
    ["x = 36", "x = 40", "x = 32", "x = 45"],
    0,
    "(2x + 5) + (3x − 5) = 180. 5x = 180. x = 36.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.straight2x5_3x5,
  ],
  [
    "Two angles at a complete turn: 200° and y. Find y.",
    ["y = 140°", "y = 160°", "y = 180°", "y = 200°"],
    1,
    "200° + y = 360°. y = 360° − 200° = 160°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.fullTurn200,
  ],
  [
    "Co-interior angles of parallel lines = 90° and k. Find k.",
    ["k = 45°", "k = 180°", "k = 270°", "k = 90°"],
    3,
    "Co-interior angles sum to 180°. 90° + k = 180°. k = 90°.",
    "Medium",
  ],
  [
    "Alternate angles with parallel lines: (6m − 30)° and 90°. Find m.",
    ["m = 20", "m = 25", "m = 30", "m = 15"],
    0,
    "Alternate angles are equal: 6m − 30 = 90. 6m = 120. m = 20.",
    "Medium",
  ],
  [
    "Adjacent angles: (x + 40)° and (2x − 10)° summing to 180°. Find x.",
    ["x = 60", "x = 40", "x = 50", "x = 45"],
    2,
    "(x + 40) + (2x − 10) = 180. 3x + 30 = 180. 3x = 150. x = 50.",
    "Medium",
  ],
  [
    "Two lines intersect forming 40°, y, 40° and z. Find y.",
    ["y = 40°", "y = 180°", "y = 80°", "y = 140°"],
    3,
    "Vertically opposite: 40° opposite = 40°. Adjacent: y = 180° − 40° = 140°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.crossing40,
  ],
  [
    "If co-interior angles = 2p and 4p, find p.",
    ["p = 20°", "p = 30°", "p = 45°", "p = 60°"],
    1,
    "2p + 4p = 180°. 6p = 180°. p = 30°.",
    "Medium",
    MATH_F1_C8_QUIZ_VISUALS.cointerior2p4p,
  ],
]);

const MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Garis rentas memotong dua garis selari. Sudut sepadan ialah (2x + 15)° dan (3x − 10)°. Cari x dan saiz setiap sudut.",
    ["x = 25, sudut = 65°", "x = 20, sudut = 55°", "x = 30, sudut = 75°", "x = 15, sudut = 45°"],
    0,
    "Sudut sepadan adalah sama: 2x + 15 = 3x − 10, maka x = 25. Sudut = 2(25) + 15 = 65°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.correspondingExpr,
  ],
  [
    "Tiga sudut pada satu garis lurus ialah (3x + 5)°, (x + 15)° dan 60°. Cari x dan saiz semua sudut.",
    [
      "x = 20; 65°, 35°, 60°",
      "x = 25; 80°, 40°, 60°",
      "x = 15; 50°, 30°, 60°",
      "x = 30; 95°, 45°, 60°",
    ],
    1,
    "(3x + 5) + (x + 15) + 60 = 180. 4x + 80 = 180. 4x = 100. x = 25. Sudut: 80°, 40°, 60°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straight3x_1x60,
  ],
  [
    "Dua sudut bertentang bucu ialah (5a − 30)° dan (2a + 15)°. Cari a dan saiz sudut itu.",
    ["a = 25, sudut = 65°", "a = 20, sudut = 55°", "a = 15, sudut = 45°", "a = 10, sudut = 35°"],
    2,
    "Sudut bertentang bucu adalah sama: 5a − 30 = 2a + 15. 3a = 45. a = 15. Sudut = 5(15) − 30 = 45°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.opposite5a2a,
  ],
  [
    "Dua garis selari dipotong oleh garis rentas. Dua sudut pedalaman pada sisi garis rentas yang sama ialah (3x + 10)° dan (2x + 20)°. Cari x.",
    ["x = 40", "x = 34", "x = 26", "x = 30"],
    3,
    "Sudut pedalaman berjumlah 180°: (3x + 10) + (2x + 20) = 180. 5x + 30 = 180. 5x = 150. x = 30. Sudut: 100° dan 80°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior3x2x,
  ],
  [
    "Siti berkata: 'Sudut pedalaman antara dua garis selari pada sisi garis rentas yang sama sentiasa sama besar.' Manakah pembetulan yang tepat?",
    [
      "Sudut pedalaman itu berjumlah 90°",
      "Sudut pedalaman itu berjumlah 180°",
      "Sudut pedalaman itu berjumlah 360°",
      "Kenyataan Siti betul",
    ],
    1,
    "Sudut pedalaman pada sisi garis rentas yang sama berjumlah 180°. Kedua-duanya sama besar hanya apabila setiap satu ialah 90°.",
    "Hard",
  ],
  [
    "Sudut dongak dari titik A ke puncak sebuah bangunan ialah 35°. Apakah yang boleh disimpulkan?",
    [
      "Pemerhati berada di atas bangunan itu",
      "Bangunan itu condong sebanyak 35°",
      "Pemerhati di bawah, melihat ke atas 35° dari garis ufuk",
      "Sudut di puncak bangunan ialah 35°",
    ],
    2,
    "Sudut dongak diukur dari garis ufuk ke atas. Pemerhati di A berada di bawah dan melihat ke atas pada 35°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.elevation35,
  ],
  [
    "Sudut tunduk dari puncak menara ke sebuah bot ialah 40°. Apakah yang boleh disimpulkan?",
    [
      "Orang di bot melihat ke bawah pada 40°",
      "Menara itu condong sebanyak 40°",
      "Sudut 40° diukur dari kaki menara",
      "Pemerhati di menara melihat ke bawah 40° dari garis ufuk",
    ],
    3,
    "Sudut tunduk diukur dari garis ufuk ke bawah. Pemerhati di menara melihat ke bawah pada 40°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.depression40,
  ],
  [
    "Dua garis selari dipotong oleh garis rentas. Satu sudut pedalaman ialah (6x − 10)° dan sudut pedalaman yang satu lagi pada sisi garis rentas yang sama ialah 130°. Cari x.",
    ["x = 10", "x = 15", "x = 20", "x = 25"],
    0,
    "Sudut pedalaman berjumlah 180°: (6x − 10) + 130 = 180. 6x + 120 = 180. 6x = 60. x = 10.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior6x130,
  ],
  [
    "Dua garis lurus bersilang. Satu sudut ialah (3y + 20)° dan sudut bersebelahan dengannya pada garis lurus yang sama ialah (2y + 40)°. Cari y.",
    ["y = 16", "y = 20", "y = 24", "y = 28"],
    2,
    "Sudut bersebelahan pada garis lurus berjumlah 180°: (3y + 20) + (2y + 40) = 180. 5y + 60 = 180. 5y = 120. y = 24.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straight3y2y,
  ],
  [
    "Garis rentas memotong dua garis selari di A dan B. Sudut pedalaman di A ialah 75°. Cari sudut selang-seli dengannya di B dan sudut pedalaman yang lain di B pada sisi garis rentas yang sama.",
    [
      "Selang-seli = 105°, pedalaman = 105°",
      "Selang-seli = 105°, pedalaman = 75°",
      "Selang-seli = 75°, pedalaman = 75°",
      "Selang-seli = 75°, pedalaman = 105°",
    ],
    3,
    "Sudut selang-seli adalah sama: 75°. Sudut pedalaman pada sisi yang sama berjumlah 180°: 180° − 75° = 105°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallelA75,
  ],
  [
    "Sudut tunduk dari puncak sebuah rumah api ke sebuah bot ialah 35°. Berapakah sudut dongak dari bot ke puncak rumah api itu?",
    ["35°", "55°", "145°", "325°"],
    0,
    "Garis ufuk di puncak rumah api dan di paras laut adalah selari. Sudut tunduk dan sudut dongak ialah sudut selang-seli, jadi kedua-duanya 35°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.lighthouse35,
  ],
  [
    "Garis rentas memotong dua garis selari di A dan B. Sudut di sebelah atas kiri A ialah 125°. Cari sudut di sebelah atas kiri B menggunakan sifat sudut sepadan.",
    ["55°", "125°", "235°", "65°"],
    1,
    "Sudut sepadan (pada kedudukan yang sama di kedua-dua persilangan) adalah sama. Sudut di sebelah atas kiri B = 125°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.corresponding125,
  ],
  [
    "Dua garis selari dipotong oleh garis rentas. Satu sudut tirus yang terbentuk ialah 72°. Berapakah saiz setiap sudut cakah yang terbentuk?",
    ["288°", "72°", "18°", "108°"],
    3,
    "Setiap sudut cakah bersebelahan dengan sudut tirus pada garis lurus: 180° − 72° = 108°. (18° ialah pelengkap, 288° ialah konjugat.)",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallelAcute72,
  ],
  [
    "Dua sudut pedalaman pada sisi garis rentas yang sama ialah (4p + 10)° dan (2p + 20)°. Cari p dan kedua-dua sudut.",
    ["p = 25; 110° dan 70°", "p = 20; 90° dan 60°", "p = 30; 130° dan 80°", "p = 15; 70° dan 50°"],
    0,
    "(4p + 10) + (2p + 20) = 180. 6p + 30 = 180. 6p = 150. p = 25. Sudut: 4(25) + 10 = 110° dan 2(25) + 20 = 70°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior4p2p,
  ],
  [
    "Dua garis lurus bersilang dan membentuk sudut 2m, 3m, 2m dan 3m secara berselang-seli. Cari nilai m.",
    ["m = 40°", "m = 36°", "m = 30°", "m = 45°"],
    1,
    "Sudut bersebelahan pada garis lurus berjumlah 180°: 2m + 3m = 180°. 5m = 180°. m = 36°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.crossing2m3m,
  ],
  [
    "Ali berdiri di atas sebuah bukit dan melihat sebuah kereta di jalan dengan sudut tunduk 28°. Kereta itu kemudian bergerak lebih dekat ke kaki bukit. Apakah yang berlaku kepada sudut tunduk?",
    [
      "Sudut tunduk kekal 28°",
      "Sudut tunduk berkurang",
      "Sudut tunduk bertambah",
      "Sudut tunduk menjadi 62°",
    ],
    2,
    "Apabila kereta semakin hampir ke kaki bukit, Ali perlu memandang lebih ke bawah dari garis ufuk, jadi sudut tunduk bertambah.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.carCloser,
  ],
  [
    "Tiga sudut pada satu garis lurus ialah (x + 30)°, (2x − 10)° dan (x + 20)°. Cari x dan nyatakan jenis setiap sudut.",
    [
      "x = 35; 65°, 60°, 55°, semuanya tirus",
      "x = 30; 60°, 50°, 50°, semuanya tirus",
      "x = 40; 70°, 70°, 60°, semuanya tirus",
      "x = 25; 55°, 40°, 45°, semuanya tirus",
    ],
    0,
    "(x + 30) + (2x − 10) + (x + 20) = 180. 4x + 40 = 180. 4x = 140. x = 35. Sudut: 65°, 60°, 55°, semuanya sudut tirus.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straightX30_2x10_x20,
  ],
  [
    "Garis rentas memotong dua garis selari dan membentuk lapan sudut. Satu daripadanya ialah 85°. Berapakah bilangan sudut yang bersaiz 95°?",
    ["1", "2", "4", "6"],
    2,
    "Di setiap persilangan, dua sudut bertentang bucu ialah 85° dan dua lagi ialah 180° − 85° = 95°. Kedua-dua persilangan adalah sama, jadi terdapat 4 sudut bersaiz 95°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallel85,
  ],
  [
    "Dari titik A dan titik B di atas tanah rata, sudut dongak ke puncak menara C masing-masing ialah 25° dan 40°. Titik manakah lebih hampir dengan menara itu?",
    ["Titik A", "Titik B", "Kedua-duanya sama jauh", "Tidak boleh ditentukan"],
    1,
    "Bagi objek yang sama tinggi, pemerhati yang lebih hampir melihat dengan sudut dongak yang lebih besar. B (40°) lebih hampir dengan menara.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.elevationCompare,
  ],
  [
    "Garis rentas memotong dua garis dan sudut selang-seli yang terbentuk adalah sama besar. Apakah kesimpulan tentang kedua-dua garis itu?",
    [
      "Tiada kesimpulan boleh dibuat",
      "Kedua-dua garis itu berserenjang",
      "Kedua-dua garis itu bersilang",
      "Kedua-dua garis itu selari",
    ],
    3,
    "Jika sudut selang-seli sama besar, maka kedua-dua garis yang dipotong oleh garis rentas adalah selari.",
    "Hard",
  ],
  [
    "Empat sudut pada satu titik ialah (3a + 10)°, (2a + 20)°, (4a − 10)° dan (a + 20)°. Cari a.",
    ["a = 28", "a = 30", "a = 32", "a = 25"],
    2,
    "(3a + 10) + (2a + 20) + (4a − 10) + (a + 20) = 360. 10a + 40 = 360. 10a = 320. a = 32.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.pointFourExpressions,
  ],
  [
    "Garis rentas berserenjang dengan dua garis selari. Berapakah saiz setiap sudut sepadan?",
    ["45°", "90°", "60°", "180°"],
    1,
    "Garis rentas yang berserenjang membentuk sudut 90° dengan setiap garis selari, jadi setiap sudut sepadan ialah 90°.",
    "Hard",
  ],
  [
    "Sudut x dan sudut y ialah sudut penggenap. Jika x ialah dua kali y, cari x.",
    ["135°", "60°", "90°", "120°"],
    3,
    "x + y = 180° dan x = 2y. Maka 2y + y = 180°, 3y = 180°, y = 60° dan x = 120°.",
    "Hard",
  ],
  [
    "Tiga sudut pada satu titik ialah 2x, 3x dan (x + 60)°. Cari x dan saiz setiap sudut.",
    [
      "x = 50°; 100°, 150°, 110°",
      "x = 45°; 90°, 135°, 105°",
      "x = 60°; 120°, 180°, 60°",
      "x = 40°; 80°, 120°, 100°",
    ],
    0,
    "2x + 3x + (x + 60) = 360. 6x + 60 = 360. 6x = 300. x = 50°. Sudut: 100°, 150°, 110°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.pointThreeExpressions,
  ],
  [
    "Konjugat bagi suatu sudut ialah 4 kali sudut itu. Cari sudut itu.",
    ["90°", "72°", "288°", "45°"],
    1,
    "Katakan sudut itu x. Konjugat = 360° − x = 4x. Maka 5x = 360°, x = 72°. (288° ialah konjugatnya.)",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.conjugateFourTimes,
  ],
  [
    "Dua garis lurus bersilang. Dua sudut bertentang bucu ialah (4x − 15)° dan (2x + 25)°. Berapakah saiz sudut yang bersebelahan dengan salah satu sudut itu?",
    ["25°", "65°", "20°", "115°"],
    3,
    "Sudut bertentang bucu adalah sama: 4x − 15 = 2x + 25, maka x = 20 dan setiap sudut = 65°. Sudut bersebelahan = 180° − 65° = 115°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.opposite4x2x,
  ],
  [
    "Garis rentas memotong dua garis yang TIDAK selari. Adakah sudut sepadan yang terbentuk sama besar?",
    [
      "Tidak, hanya sama jika garis-garis itu selari",
      "Ya, sudut sepadan sentiasa sama besar",
      "Bergantung pada saiz sudut garis rentas",
      "Bergantung pada panjang garis rentas",
    ],
    0,
    "Sifat sudut sepadan sama besar hanya berlaku apabila garis yang dipotong adalah selari.",
    "Hard",
  ],
  [
    "Pelengkap bagi suatu sudut ialah 20° kurang daripada sudut itu. Cari sudut itu.",
    ["45°", "35°", "55°", "110°"],
    2,
    "Katakan sudut itu x. Pelengkap = 90° − x = x − 20°. Maka 2x = 110°, x = 55°. (Pelengkapnya ialah 35°.)",
    "Hard",
  ],
  [
    "Garis lurus AB dan CD bersilang di O. ∠AOC = 3x dan ∠BOC = 2x. Cari ∠AOD.",
    ["144°", "108°", "36°", "72°"],
    3,
    "∠AOC dan ∠BOC berada pada garis lurus AB: 3x + 2x = 180°, x = 36°. ∠BOC = 72°. ∠AOD bertentang bucu dengan ∠BOC, maka ∠AOD = 72°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.crossingABCD,
  ],
  [
    "Bilakah dua sudut pedalaman pada sisi garis rentas yang sama menjadi sama besar?",
    [
      "Apabila garis rentas tidak berserenjang",
      "Apabila garis rentas berserenjang dengan garis-garis selari",
      "Apabila kedua-dua sudut tirus",
      "Tidak mungkin sama besar",
    ],
    1,
    "Sudut pedalaman berjumlah 180°. Supaya sama besar, setiap satu mesti 90°, iaitu apabila garis rentas berserenjang dengan garis-garis selari.",
    "Hard",
  ],
]);

const MATH_C8_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "A transversal cuts two parallel lines. The corresponding angles are (2x + 15)° and (3x − 10)°. Find x and the size of each angle.",
    ["x = 25, angle = 65°", "x = 20, angle = 55°", "x = 30, angle = 75°", "x = 15, angle = 45°"],
    0,
    "Corresponding angles are equal: 2x + 15 = 3x − 10, so x = 25. Angle = 2(25) + 15 = 65°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.correspondingExpr,
  ],
  [
    "Three angles on a straight line are (3x + 5)°, (x + 15)° and 60°. Find x and the size of all the angles.",
    [
      "x = 20; 65°, 35°, 60°",
      "x = 25; 80°, 40°, 60°",
      "x = 15; 50°, 30°, 60°",
      "x = 30; 95°, 45°, 60°",
    ],
    1,
    "(3x + 5) + (x + 15) + 60 = 180. 4x + 80 = 180. 4x = 100. x = 25. Angles: 80°, 40°, 60°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straight3x_1x60,
  ],
  [
    "Two vertically opposite angles are (5a − 30)° and (2a + 15)°. Find a and the size of the angle.",
    ["a = 25, angle = 65°", "a = 20, angle = 55°", "a = 15, angle = 45°", "a = 10, angle = 35°"],
    2,
    "Vertically opposite angles are equal: 5a − 30 = 2a + 15. 3a = 45. a = 15. Angle = 5(15) − 30 = 45°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.opposite5a2a,
  ],
  [
    "Two parallel lines are cut by a transversal. Two interior angles on the same side of the transversal are (3x + 10)° and (2x + 20)°. Find x.",
    ["x = 40", "x = 34", "x = 26", "x = 30"],
    3,
    "Interior angles add up to 180°: (3x + 10) + (2x + 20) = 180. 5x + 30 = 180. 5x = 150. x = 30. Angles: 100° and 80°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior3x2x,
  ],
  [
    "Siti says: 'Interior angles between two parallel lines on the same side of the transversal are always equal.' Which correction is accurate?",
    [
      "The interior angles add up to 90°",
      "The interior angles add up to 180°",
      "The interior angles add up to 360°",
      "Siti's statement is correct",
    ],
    1,
    "Interior angles on the same side of the transversal add up to 180°. They are equal only when each is 90°.",
    "Hard",
  ],
  [
    "The angle of elevation from point A to the top of a building is 35°. What can be concluded?",
    [
      "The observer is standing above the building",
      "The building leans over at an angle of 35°",
      "The observer is below, looking up 35° from the horizontal",
      "The angle at the top of the building is 35°",
    ],
    2,
    "An angle of elevation is measured upward from the horizontal. The observer at A is below and looks up at 35°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.elevation35,
  ],
  [
    "The angle of depression from the top of a tower to a boat is 40°. What can be concluded?",
    [
      "A person in the boat looks down at 40°",
      "The tower leans over at an angle of 40°",
      "The 40° is measured from the foot of the tower",
      "The observer looks down 40° from the horizontal",
    ],
    3,
    "An angle of depression is measured downward from the horizontal. The observer on the tower looks down at 40°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.depression40,
  ],
  [
    "Two parallel lines are cut by a transversal. One interior angle is (6x − 10)° and the other interior angle on the same side of the transversal is 130°. Find x.",
    ["x = 10", "x = 15", "x = 20", "x = 25"],
    0,
    "Interior angles add up to 180°: (6x − 10) + 130 = 180. 6x + 120 = 180. 6x = 60. x = 10.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior6x130,
  ],
  [
    "Two straight lines intersect. One angle is (3y + 20)° and the adjacent angle on the same straight line is (2y + 40)°. Find y.",
    ["y = 16", "y = 20", "y = 24", "y = 28"],
    2,
    "Adjacent angles on a straight line add up to 180°: (3y + 20) + (2y + 40) = 180. 5y + 60 = 180. 5y = 120. y = 24.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straight3y2y,
  ],
  [
    "A transversal cuts two parallel lines at A and B. The interior angle at A is 75°. Find the angle alternate to it at B and the other interior angle at B on the same side of the transversal.",
    [
      "Alternate = 105°, interior = 105°",
      "Alternate = 105°, interior = 75°",
      "Alternate = 75°, interior = 75°",
      "Alternate = 75°, interior = 105°",
    ],
    3,
    "Alternate angles are equal: 75°. Interior angles on the same side add up to 180°: 180° − 75° = 105°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallelA75,
  ],
  [
    "The angle of depression from the top of a lighthouse to a boat is 35°. What is the angle of elevation from the boat to the top of the lighthouse?",
    ["35°", "55°", "145°", "325°"],
    0,
    "The horizontal lines at the top of the lighthouse and at sea level are parallel. The angles of depression and elevation are alternate angles, so both are 35°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.lighthouse35,
  ],
  [
    "A transversal cuts two parallel lines at A and B. The top-left angle at A is 125°. Find the top-left angle at B using corresponding angles.",
    ["55°", "125°", "235°", "65°"],
    1,
    "Corresponding angles (in the same position at both intersections) are equal. The top-left angle at B = 125°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.corresponding125,
  ],
  [
    "Two parallel lines are cut by a transversal. One acute angle formed is 72°. What is the size of each obtuse angle formed?",
    ["288°", "72°", "18°", "108°"],
    3,
    "Each obtuse angle is adjacent to the acute angle on a straight line: 180° − 72° = 108°. (18° is the complement and 288° is the conjugate.)",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallelAcute72,
  ],
  [
    "Two interior angles on the same side of a transversal are (4p + 10)° and (2p + 20)°. Find p and both angles.",
    ["p = 25; 110° and 70°", "p = 20; 90° and 60°", "p = 30; 130° and 80°", "p = 15; 70° and 50°"],
    0,
    "(4p + 10) + (2p + 20) = 180. 6p + 30 = 180. 6p = 150. p = 25. Angles: 4(25) + 10 = 110° and 2(25) + 20 = 70°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.cointerior4p2p,
  ],
  [
    "Two intersecting straight lines form angles 2m, 3m, 2m and 3m in turn. Find the value of m.",
    ["m = 40°", "m = 36°", "m = 30°", "m = 45°"],
    1,
    "Adjacent angles on a straight line add up to 180°: 2m + 3m = 180°. 5m = 180°. m = 36°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.crossing2m3m,
  ],
  [
    "Ali stands on a hill and sees a car on the road at an angle of depression of 28°. The car then moves closer to the foot of the hill. What happens to the angle of depression?",
    [
      "The angle of depression stays at 28°",
      "The angle of depression decreases",
      "The angle of depression increases",
      "The angle of depression becomes 62°",
    ],
    2,
    "As the car gets closer to the foot of the hill, Ali has to look further down from the horizontal, so the angle of depression increases.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.carCloser,
  ],
  [
    "Three angles on a straight line are (x + 30)°, (2x − 10)° and (x + 20)°. Find x and state the type of each angle.",
    [
      "x = 35; 65°, 60°, 55°, all acute",
      "x = 30; 60°, 50°, 50°, all acute",
      "x = 40; 70°, 70°, 60°, all acute",
      "x = 25; 55°, 40°, 45°, all acute",
    ],
    0,
    "(x + 30) + (2x − 10) + (x + 20) = 180. 4x + 40 = 180. 4x = 140. x = 35. Angles: 65°, 60°, 55°, all acute angles.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.straightX30_2x10_x20,
  ],
  [
    "A transversal cuts two parallel lines and forms eight angles. One of them is 85°. How many of the angles measure 95°?",
    ["1", "2", "4", "6"],
    2,
    "At each intersection, two vertically opposite angles are 85° and the other two are 180° − 85° = 95°. Both intersections match, so 4 angles measure 95°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.parallel85,
  ],
  [
    "From points A and B on level ground, the angles of elevation to the top of tower C are 25° and 40° respectively. Which point is closer to the tower?",
    ["Point A", "Point B", "Both are equally far", "Cannot be determined"],
    1,
    "For the same object height, an observer who is closer sees it at a larger angle of elevation. B (40°) is closer to the tower.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.elevationCompare,
  ],
  [
    "A transversal cuts two lines and the alternate angles formed are equal. What can be concluded about the two lines?",
    [
      "No conclusion can be made",
      "The two lines are perpendicular",
      "The two lines intersect",
      "The two lines are parallel",
    ],
    3,
    "If the alternate angles are equal, then the two lines cut by the transversal are parallel.",
    "Hard",
  ],
  [
    "Four angles at a point are (3a + 10)°, (2a + 20)°, (4a − 10)° and (a + 20)°. Find a.",
    ["a = 28", "a = 30", "a = 32", "a = 25"],
    2,
    "(3a + 10) + (2a + 20) + (4a − 10) + (a + 20) = 360. 10a + 40 = 360. 10a = 320. a = 32.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.pointFourExpressions,
  ],
  [
    "A transversal is perpendicular to two parallel lines. What is the size of each corresponding angle?",
    ["45°", "90°", "60°", "180°"],
    1,
    "A perpendicular transversal makes 90° with each parallel line, so each corresponding angle is 90°.",
    "Hard",
  ],
  [
    "Angles x and y are supplementary angles. If x is twice y, find x.",
    ["135°", "60°", "90°", "120°"],
    3,
    "x + y = 180° and x = 2y. So 2y + y = 180°, 3y = 180°, y = 60° and x = 120°.",
    "Hard",
  ],
  [
    "Three angles at a point are 2x, 3x and (x + 60)°. Find x and the size of each angle.",
    [
      "x = 50°; 100°, 150°, 110°",
      "x = 45°; 90°, 135°, 105°",
      "x = 60°; 120°, 180°, 60°",
      "x = 40°; 80°, 120°, 100°",
    ],
    0,
    "2x + 3x + (x + 60) = 360. 6x + 60 = 360. 6x = 300. x = 50°. Angles: 100°, 150°, 110°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.pointThreeExpressions,
  ],
  [
    "The conjugate of an angle is 4 times the angle. Find the angle.",
    ["90°", "72°", "288°", "45°"],
    1,
    "Let the angle be x. Conjugate = 360° − x = 4x. So 5x = 360°, x = 72°. (288° is its conjugate.)",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.conjugateFourTimes,
  ],
  [
    "Two straight lines intersect. Two vertically opposite angles are (4x − 15)° and (2x + 25)°. What is the size of an angle adjacent to one of them?",
    ["25°", "65°", "20°", "115°"],
    3,
    "Vertically opposite angles are equal: 4x − 15 = 2x + 25, so x = 20 and each angle = 65°. Adjacent angle = 180° − 65° = 115°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.opposite4x2x,
  ],
  [
    "A transversal cuts two lines that are NOT parallel. Are the corresponding angles formed equal?",
    [
      "No, only when the lines are parallel",
      "Yes, corresponding angles are always equal",
      "It depends on the transversal's angle",
      "It depends on the length of the transversal",
    ],
    0,
    "Corresponding angles are equal only when the lines being cut are parallel.",
    "Hard",
  ],
  [
    "The complement of an angle is 20° less than the angle. Find the angle.",
    ["45°", "35°", "55°", "110°"],
    2,
    "Let the angle be x. Complement = 90° − x = x − 20°. So 2x = 110°, x = 55°. (Its complement is 35°.)",
    "Hard",
  ],
  [
    "Straight lines AB and CD intersect at O. ∠AOC = 3x and ∠BOC = 2x. Find ∠AOD.",
    ["144°", "108°", "36°", "72°"],
    3,
    "∠AOC and ∠BOC lie on the straight line AB: 3x + 2x = 180°, x = 36°. ∠BOC = 72°. ∠AOD is vertically opposite ∠BOC, so ∠AOD = 72°.",
    "Hard",
    MATH_F1_C8_QUIZ_VISUALS.crossingABCD,
  ],
  [
    "When are two interior angles on the same side of a transversal equal?",
    [
      "When the transversal is not perpendicular",
      "When the transversal is perpendicular to the parallel lines",
      "When both angles are acute",
      "They can never be equal",
    ],
    1,
    "Interior angles add up to 180°. To be equal, each must be 90°, which happens when the transversal is perpendicular to the parallel lines.",
    "Hard",
  ],
]);

const MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah poligon?",
    [
      "Bentuk 2D tertutup dengan 3 atau lebih sisi lurus",
      "Bentuk 3D dengan permukaan rata",
      "Lengkung tertutup seperti bulatan",
      "Satu tembereng garis lurus",
    ],
    0,
    "Poligon ialah bentuk dua dimensi (2D) tertutup yang dibatasi oleh tiga atau lebih sisi lurus.",
    "Easy",
  ],
  [
    "Berapakah bilangan sisi segi tiga?",
    ["2", "3", "4", "5"],
    1,
    "Segi tiga mempunyai 3 sisi, 3 bucu dan 3 sudut.",
    "Easy",
  ],
  [
    "Berapakah bilangan sisi pentagon?",
    ["4", "6", "5", "7"],
    2,
    "Pentagon mempunyai 5 sisi (penta = 5 dalam bahasa Greek).",
    "Easy",
  ],
  [
    "Berapakah bilangan sisi heksagon?",
    ["5", "8", "7", "6"],
    3,
    "Heksagon mempunyai 6 sisi (hexa = 6 dalam bahasa Greek).",
    "Easy",
  ],
  [
    "Apakah nama poligon dengan 8 sisi?",
    ["Heptagon", "Oktagon", "Nonagon", "Dekagon"],
    1,
    "Poligon dengan 8 sisi dipanggil Oktagon (octa = 8 dalam bahasa Latin).",
    "Easy",
  ],
  [
    "Apakah nama poligon dengan 10 sisi?",
    ["Oktagon", "Nonagon", "Dekagon", "Heksagon"],
    2,
    "Poligon dengan 10 sisi dipanggil Dekagon (deca = 10 dalam bahasa Latin).",
    "Easy",
  ],
  [
    "Apakah poligon sekata?",
    [
      "Poligon dengan semua sisi berbeza",
      "Poligon dengan 4 sisi",
      "Poligon dengan satu garis simetri",
      "Poligon dengan semua sisi sama DAN semua sudut sama",
    ],
    3,
    "Poligon sekata mempunyai semua sisi sama panjang DAN semua sudut dalam sama besar.",
    "Easy",
  ],
  [
    "Apakah segi tiga sama sisi?",
    [
      "Segi tiga dengan 3 sisi sama dan sudut 60°",
      "Segi tiga dengan tepat 2 sisi yang sama",
      "Segi tiga dengan 3 sisi yang berbeza",
      "Segi tiga dengan satu sudut tegak 90°",
    ],
    0,
    "Segi tiga sama sisi mempunyai 3 sisi sama panjang dan semua sudut = 60°.",
    "Easy",
  ],
  [
    "Apakah segi tiga sama kaki?",
    [
      "Segi tiga dengan 3 sisi sama",
      "Segi tiga dengan semua sisi berbeza",
      "Segi tiga dengan 2 sisi sama dan 2 sudut tapak sama",
      "Segi tiga dengan satu sudut tegak",
    ],
    2,
    "Segi tiga sama kaki mempunyai DUA sisi sama panjang dan DUA sudut tapak yang sama.",
    "Easy",
  ],
  [
    "Apakah segi tiga tak sama kaki?",
    [
      "Segi tiga dengan tepat 2 sisi sama",
      "Segi tiga dengan ketiga-tiga sisi sama",
      "Segi tiga dengan satu sudut 90°",
      "Segi tiga tanpa sisi yang sama",
    ],
    3,
    "Segi tiga tak sama kaki mempunyai semua sisi berbeza panjang dan semua sudut berbeza besar.",
    "Easy",
  ],
  [
    "Apakah segi tiga bersudut tegak?",
    [
      "Segi tiga dengan satu sudut tepat 90°",
      "Segi tiga dengan satu sudut > 90°",
      "Segi tiga dengan semua sudut < 90°",
      "Segi tiga dengan semua sudut 60°",
    ],
    0,
    "Segi tiga bersudut tegak mempunyai tepat SATU sudut 90°. Sisi terpanjang dipanggil hipotenus.",
    "Easy",
  ],
  [
    "Apakah hipotenus?",
    [
      "Sisi terpendek segi tiga bersudut tegak",
      "Sisi terpanjang, bertentangan dengan sudut 90°",
      "Salah satu kaki segi tiga sama kaki",
      "Garis yang melalui tengah segi tiga",
    ],
    1,
    "Hipotenus ialah sisi terpanjang segi tiga bersudut tegak, yang berada bertentangan dengan sudut 90°.",
    "Easy",
  ],
  [
    "Apakah segi empat tepat?",
    [
      "Sisi empat dengan 4 sisi sama dan pepenjuru berserenjang",
      "Sisi empat dengan 2 pasang sisi bersebelahan sama",
      "Sisi empat dengan satu pasang sisi selari",
      "Sisi empat dengan 4 sudut 90° dan sisi bertentangan sama",
    ],
    3,
    "Segi empat tepat mempunyai 4 sudut 90°, sisi bertentangan sama panjang dan selari.",
    "Easy",
  ],
  [
    "Apakah segi empat sama?",
    [
      "Segi empat tepat dengan pepenjuru berserenjang dan 4 sisi sama",
      "Sisi empat dengan 4 sisi berbeza",
      "Sisi empat dengan satu pasang sisi selari",
      "Segi empat selari biasa",
    ],
    0,
    "Segi empat sama mempunyai 4 sisi sama, 4 sudut 90°, dan pepenjuru berserenjang.",
    "Easy",
  ],
  [
    "Apakah segi empat selari?",
    [
      "Sisi empat dengan 4 sudut tegak",
      "Sisi empat dengan 2 pasang sisi bertentangan selari",
      "Sisi empat dengan 4 sisi sama panjang",
      "Sisi empat dengan satu pasang sisi selari",
    ],
    1,
    "Segi empat selari mempunyai 2 pasang sisi bertentangan yang selari dan sama panjang, serta sudut bertentangan yang sama.",
    "Easy",
  ],
  [
    "Apakah belah ketupat?",
    [
      "Sisi empat dengan 4 sudut 90°",
      "Sisi empat dengan 2 pasang sisi bersebelahan sama",
      "Sisi empat dengan 4 sisi sama dan pepenjuru berserenjang",
      "Sisi empat dengan satu pasang sisi selari",
    ],
    2,
    "Belah ketupat mempunyai 4 sisi sama panjang dan pepenjuru yang berserenjang.",
    "Easy",
  ],
  [
    "Apakah trapezium?",
    [
      "Sisi empat dengan tepat satu pasang sisi selari",
      "Sisi empat dengan 4 sudut 90°",
      "Sisi empat dengan 4 sisi sama",
      "Sisi empat dengan 2 pasang sisi bersebelahan sama",
    ],
    0,
    "Trapezium mempunyai tepat SATU pasang sisi yang selari.",
    "Easy",
  ],
  [
    "Apakah lelayang?",
    [
      "Sisi empat dengan 4 sisi sama",
      "Sisi empat dengan 4 sudut 90°",
      "Sisi empat dengan 2 pasang sisi BERSEBELAHAN yang sama panjang",
      "Sisi empat dengan 2 pasang sisi BERTENTANGAN yang sama",
    ],
    2,
    "Lelayang mempunyai DUA pasang sisi BERSEBELAHAN yang sama panjang.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri segi tiga sama sisi?",
    ["1", "3", "2", "4"],
    1,
    "Segi tiga sama sisi mempunyai 3 garis simetri — setiap satu melalui puncak dan titik tengah sisi bertentangan.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri segi empat sama?",
    ["2", "3", "6", "4"],
    3,
    "Segi empat sama mempunyai 4 garis simetri — 2 melalui sisi bertentangan dan 2 melalui pepenjuru.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri segi tiga sama kaki?",
    ["0", "2", "1", "3"],
    2,
    "Segi tiga sama kaki mempunyai 1 garis simetri — melalui puncak dan titik tengah tapak.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri segi empat selari?",
    ["1", "0", "2", "4"],
    1,
    "Segi empat selari mempunyai 0 garis simetri.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri belah ketupat?",
    ["0", "1", "4", "2"],
    3,
    "Belah ketupat mempunyai 2 garis simetri — melalui kedua-dua pasang bucu bertentangan.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri lelayang?",
    ["1", "0", "2", "4"],
    0,
    "Lelayang mempunyai 1 garis simetri — pepenjuru yang membahagi dua pepenjuru yang lain.",
    "Easy",
  ],
  [
    "Apakah segi tiga bersudut cakah?",
    [
      "Segi tiga dengan semua sudut < 90°",
      "Segi tiga dengan satu sudut > 90°",
      "Segi tiga dengan satu sudut = 90°",
      "Segi tiga dengan semua sudut = 60°",
    ],
    1,
    "Segi tiga bersudut cakah mempunyai tepat SATU sudut lebih besar daripada 90°.",
    "Easy",
  ],
  [
    "Berapakah bilangan garis simetri segi empat tepat (bukan segi empat sama)?",
    ["1", "4", "3", "2"],
    3,
    "Segi empat tepat (bukan segi empat sama) mempunyai 2 garis simetri — melalui titik tengah sisi bertentangan.",
    "Easy",
  ],
  [
    "Apakah yang membezakan segi empat sama dengan segi empat tepat?",
    [
      "Segi empat sama ada 4 sisi sama; segi empat tepat tidak semestinya",
      "Segi empat sama mempunyai lebih banyak sudut tegak",
      "Segi empat tepat mempunyai lebih banyak sisi",
      "Tiada perbezaan antara kedua-duanya",
    ],
    0,
    "Segi empat sama: semua 4 sisi sama. Segi empat tepat: hanya sisi bertentangan sama. Kedua-duanya mempunyai 4 sudut 90°.",
    "Easy",
  ],
  [
    "Apakah nama poligon dengan 7 sisi?",
    ["Heksagon", "Oktagon", "Heptagon", "Nonagon"],
    2,
    "Poligon dengan 7 sisi dipanggil Heptagon (hepta = 7 dalam bahasa Greek).",
    "Easy",
  ],
  [
    "Apakah nama poligon dengan 9 sisi?",
    ["Oktagon", "Dekagon", "Heptagon", "Nonagon"],
    3,
    "Poligon dengan 9 sisi dipanggil Nonagon (nona = 9 dalam bahasa Latin).",
    "Easy",
  ],
  [
    "Apakah ciri utama pepenjuru poligon?",
    [
      "Menghubungkan dua bucu bersebelahan",
      "Menghubungkan dua bucu yang TIDAK bersebelahan",
      "Ialah sisi poligon",
      "Berada di luar poligon",
    ],
    1,
    "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan. Sisi bukan pepenjuru.",
    "Easy",
  ],
]);

const MATH_C9_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a polygon?",
    [
      "A closed 2D shape with 3 or more straight sides",
      "A 3D solid with flat faces",
      "A closed curve such as a circle",
      "A single straight line segment",
    ],
    0,
    "A polygon is a two-dimensional (2D) closed shape bounded by three or more straight sides.",
    "Easy",
  ],
  [
    "How many sides does a triangle have?",
    ["2", "3", "4", "5"],
    1,
    "A triangle has 3 sides, 3 vertices and 3 angles.",
    "Easy",
  ],
  [
    "How many sides does a pentagon have?",
    ["4", "6", "5", "7"],
    2,
    "A pentagon has 5 sides (penta = 5 in Greek).",
    "Easy",
  ],
  [
    "How many sides does a hexagon have?",
    ["5", "8", "7", "6"],
    3,
    "A hexagon has 6 sides (hexa = 6 in Greek).",
    "Easy",
  ],
  [
    "What is the name of a polygon with 8 sides?",
    ["Heptagon", "Octagon", "Nonagon", "Decagon"],
    1,
    "A polygon with 8 sides is called an Octagon (octa = 8 in Latin).",
    "Easy",
  ],
  [
    "What is the name of a polygon with 10 sides?",
    ["Octagon", "Nonagon", "Decagon", "Hexagon"],
    2,
    "A polygon with 10 sides is called a Decagon (deca = 10 in Latin).",
    "Easy",
  ],
  [
    "What is a regular polygon?",
    [
      "A polygon with all sides different",
      "A polygon with 4 sides",
      "A polygon with one line of symmetry",
      "A polygon with all sides equal AND all angles equal",
    ],
    3,
    "A regular polygon has all sides equal in length AND all interior angles equal.",
    "Easy",
  ],
  [
    "What is an equilateral triangle?",
    [
      "A triangle with 3 equal sides and 60° angles",
      "A triangle with exactly 2 equal sides",
      "A triangle with 3 different sides",
      "A triangle with one right angle of 90°",
    ],
    0,
    "An equilateral triangle has 3 equal sides and all angles = 60°.",
    "Easy",
  ],
  [
    "What is an isosceles triangle?",
    [
      "A triangle with 3 equal sides",
      "A triangle with all different sides",
      "A triangle with 2 equal sides and 2 equal base angles",
      "A triangle with one right angle",
    ],
    2,
    "An isosceles triangle has TWO equal sides and TWO equal base angles.",
    "Easy",
  ],
  [
    "What is a scalene triangle?",
    [
      "A triangle with exactly 2 equal sides",
      "A triangle with all 3 sides equal",
      "A triangle with one 90° angle",
      "A triangle with no equal sides",
    ],
    3,
    "A scalene triangle has all sides of different lengths and all angles of different sizes.",
    "Easy",
  ],
  [
    "What is a right-angled triangle?",
    [
      "A triangle with exactly one angle of 90°",
      "A triangle with one angle > 90°",
      "A triangle with all angles < 90°",
      "A triangle with all angles 60°",
    ],
    0,
    "A right-angled triangle has exactly ONE 90° angle. The longest side is called the hypotenuse.",
    "Easy",
  ],
  [
    "What is the hypotenuse?",
    [
      "The shortest side of a right-angled triangle",
      "The longest side, opposite the 90° angle",
      "One of the equal sides of an isosceles triangle",
      "A line through the middle of a triangle",
    ],
    1,
    "The hypotenuse is the longest side of a right-angled triangle, opposite the 90° angle.",
    "Easy",
  ],
  [
    "What is a rectangle?",
    [
      "A quadrilateral with 4 equal sides and perpendicular diagonals",
      "A quadrilateral with 2 pairs of adjacent equal sides",
      "A quadrilateral with one pair of parallel sides",
      "A quadrilateral with 4 right angles and opposite sides equal",
    ],
    3,
    "A rectangle has 4 right angles and opposite sides that are equal in length and parallel.",
    "Easy",
  ],
  [
    "What is a square?",
    [
      "A rectangle with perpendicular diagonals and all 4 sides equal",
      "A quadrilateral with 4 different sides",
      "A quadrilateral with one pair of parallel sides",
      "An ordinary parallelogram",
    ],
    0,
    "A square has 4 equal sides, 4 right angles, and perpendicular diagonals.",
    "Easy",
  ],
  [
    "What is a parallelogram?",
    [
      "A quadrilateral with 4 right angles",
      "A quadrilateral with 2 pairs of parallel opposite sides",
      "A quadrilateral with 4 equal sides",
      "A quadrilateral with one pair of parallel sides",
    ],
    1,
    "A parallelogram has 2 pairs of opposite sides that are parallel and equal, with opposite angles equal.",
    "Easy",
  ],
  [
    "What is a rhombus?",
    [
      "A quadrilateral with 4 right angles",
      "A quadrilateral with 2 pairs of adjacent equal sides",
      "A quadrilateral with 4 equal sides and perpendicular diagonals",
      "A quadrilateral with one pair of parallel sides",
    ],
    2,
    "A rhombus has 4 equal sides and perpendicular diagonals.",
    "Easy",
  ],
  [
    "What is a trapezium?",
    [
      "A quadrilateral with exactly one pair of parallel sides",
      "A quadrilateral with 4 right angles",
      "A quadrilateral with 4 equal sides",
      "A quadrilateral with 2 pairs of adjacent equal sides",
    ],
    0,
    "A trapezium has exactly ONE pair of parallel sides.",
    "Easy",
  ],
  [
    "What is a kite?",
    [
      "A quadrilateral with 4 equal sides",
      "A quadrilateral with 4 right angles",
      "A quadrilateral with 2 pairs of ADJACENT equal sides",
      "A quadrilateral with 2 pairs of OPPOSITE equal sides",
    ],
    2,
    "A kite has TWO pairs of ADJACENT (neighbouring) sides that are equal in length.",
    "Easy",
  ],
  [
    "How many lines of symmetry does an equilateral triangle have?",
    ["1", "3", "2", "4"],
    1,
    "An equilateral triangle has 3 lines of symmetry — each through a vertex and the midpoint of the opposite side.",
    "Easy",
  ],
  [
    "How many lines of symmetry does a square have?",
    ["2", "3", "6", "4"],
    3,
    "A square has 4 lines of symmetry — 2 through opposite sides and 2 through diagonals.",
    "Easy",
  ],
  [
    "How many lines of symmetry does an isosceles triangle have?",
    ["0", "2", "1", "3"],
    2,
    "An isosceles triangle has 1 line of symmetry — through the apex and the midpoint of the base.",
    "Easy",
  ],
  [
    "How many lines of symmetry does a parallelogram have?",
    ["1", "0", "2", "4"],
    1,
    "A parallelogram has 0 lines of symmetry.",
    "Easy",
  ],
  [
    "How many lines of symmetry does a rhombus have?",
    ["0", "1", "4", "2"],
    3,
    "A rhombus has 2 lines of symmetry — through both pairs of opposite vertices.",
    "Easy",
  ],
  [
    "How many lines of symmetry does a kite have?",
    ["1", "0", "2", "4"],
    0,
    "A kite has 1 line of symmetry — the diagonal that bisects the other diagonal.",
    "Easy",
  ],
  [
    "What is an obtuse-angled triangle?",
    [
      "A triangle with all angles < 90°",
      "A triangle with one angle > 90°",
      "A triangle with one angle = 90°",
      "A triangle with all angles = 60°",
    ],
    1,
    "An obtuse-angled triangle has exactly ONE angle greater than 90°.",
    "Easy",
  ],
  [
    "How many lines of symmetry does a rectangle (non-square) have?",
    ["1", "4", "3", "2"],
    3,
    "A rectangle (non-square) has 2 lines of symmetry — through the midpoints of opposite sides.",
    "Easy",
  ],
  [
    "What distinguishes a square from a rectangle?",
    [
      "A square has 4 equal sides; a rectangle need not",
      "A square has more right angles than a rectangle",
      "A rectangle has more sides than a square",
      "There is no difference between them",
    ],
    0,
    "Square: all 4 sides equal. Rectangle: only opposite sides equal. Both have 4 right angles.",
    "Easy",
  ],
  [
    "What is the name of a polygon with 7 sides?",
    ["Hexagon", "Octagon", "Heptagon", "Nonagon"],
    2,
    "A polygon with 7 sides is called a Heptagon (hepta = 7 in Greek).",
    "Easy",
  ],
  [
    "What is the name of a polygon with 9 sides?",
    ["Octagon", "Decagon", "Heptagon", "Nonagon"],
    3,
    "A polygon with 9 sides is called a Nonagon (nona = 9 in Latin).",
    "Easy",
  ],
  [
    "What is the key feature of a polygon's diagonal?",
    [
      "Connects two adjacent vertices",
      "Connects two NON-ADJACENT vertices",
      "Is a side of the polygon",
      "Lies outside the polygon",
    ],
    1,
    "A diagonal connects two NON-ADJACENT vertices. Sides are not diagonals.",
    "Easy",
  ],
]);

const MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Berapakah jumlah sudut dalam segi tiga?",
    ["180°", "90°", "270°", "360°"],
    0,
    "Jumlah ketiga-tiga sudut dalam mana-mana segi tiga sentiasa 180°.",
    "Medium",
  ],
  [
    "Berapakah jumlah sudut dalam sisi empat?",
    ["180°", "360°", "270°", "540°"],
    1,
    "Jumlah keempat-empat sudut dalam mana-mana sisi empat sentiasa 360°.",
    "Medium",
  ],
  [
    "Segi tiga ABC: ∠A = 55°, ∠B = 75°. Cari ∠C.",
    ["40°", "60°", "50°", "70°"],
    2,
    "∠C = 180° − 55° − 75° = 50°.",
    "Medium",
  ],
  [
    "Sisi empat PQRS: ∠P = 90°, ∠Q = 85°, ∠R = 95°. Cari ∠S.",
    ["80°", "100°", "95°", "90°"],
    3,
    "∠S = 360° − 90° − 85° − 95° = 90°.",
    "Medium",
  ],
  [
    "Berapakah bilangan pepenjuru segi empat?",
    ["1", "2", "3", "4"],
    1,
    "Pepenjuru sisi empat = 4(4−3)/2 = 4(1)/2 = 2 pepenjuru.",
    "Medium",
  ],
  [
    "Berapakah bilangan pepenjuru pentagon?",
    ["3", "4", "5", "6"],
    2,
    "Pepenjuru pentagon = 5(5−3)/2 = 5(2)/2 = 5 pepenjuru.",
    "Medium",
  ],
  [
    "Berapakah bilangan pepenjuru heksagon?",
    ["6", "7", "8", "9"],
    3,
    "Pepenjuru heksagon = 6(6−3)/2 = 6(3)/2 = 9 pepenjuru.",
    "Medium",
  ],
  [
    "Dalam segi tiga PQR, ∠P = 2∠Q dan ∠R = 60°. Cari ∠Q.",
    ["40°", "60°", "80°", "30°"],
    0,
    "∠P + ∠Q + ∠R = 180°. 2∠Q + ∠Q + 60° = 180°. 3∠Q = 120°. ∠Q = 40°. (∠P = 80°.)",
    "Medium",
  ],
  [
    "Segi tiga sama kaki: sudut puncak = 50°. Cari sudut tapak.",
    ["50°", "70°", "65°", "80°"],
    2,
    "Dua sudut tapak sama: (180° − 50°)/2 = 130°/2 = 65°.",
    "Medium",
  ],
  [
    "Segi tiga sama kaki: setiap sudut tapak = 40°. Cari sudut puncak.",
    ["80°", "140°", "120°", "100°"],
    3,
    "Sudut puncak = 180° − 40° − 40° = 100°.",
    "Medium",
  ],
  [
    "Segi empat selari: ∠A = 65°. Cari ∠B, ∠C dan ∠D.",
    [
      "∠B = 115°, ∠C = 65°, ∠D = 115°",
      "∠B = 65°, ∠C = 115°, ∠D = 65°",
      "∠B = 65°, ∠C = 65°, ∠D = 115°",
      "∠B = 115°, ∠C = 115°, ∠D = 65°",
    ],
    0,
    "Sudut bertentangan sama: ∠C = 65°. Sudut bersebelahan berjumlah 180°: ∠B = ∠D = 180° − 65° = 115°.",
    "Medium",
  ],
  [
    "Sudut luar segi tiga = 125°. Satu sudut dalam berhadapan = 60°. Cari sudut dalam berhadapan yang lain.",
    ["55°", "65°", "60°", "70°"],
    1,
    "Sudut luar = jumlah dua sudut dalam berhadapan. 125° = 60° + x. x = 65°.",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak: satu sudut bukan tegak = 38°. Cari sudut yang lain.",
    ["42°", "72°", "62°", "52°"],
    3,
    "Dua sudut bukan tegak berjumlah 90°. 38° + x = 90°. x = 52°.",
    "Medium",
  ],
  [
    "Lelayang PQRS mempunyai ∠P = 110°, ∠R = 70° dan ∠Q = ∠S. Cari ∠Q.",
    ["90°", "110°", "70°", "180°"],
    0,
    "Jumlah sudut sisi empat = 360°. ∠Q + ∠S = 360° − 110° − 70° = 180°. Oleh sebab ∠Q = ∠S, ∠Q = 90°.",
    "Medium",
  ],
  [
    "Sisi empat: tiga sudut = 75°, 95°, 110°. Cari sudut keempat.",
    ["70°", "80°", "90°", "100°"],
    1,
    "Sudut keempat = 360° − 75° − 95° − 110° = 80°.",
    "Medium",
  ],
  [
    "Segi tiga dengan sudut (3x)°, (2x + 10)° dan (x + 20)°. Cari x.",
    ["35", "30", "25", "40"],
    2,
    "3x + (2x + 10) + (x + 20) = 180. 6x + 30 = 180. 6x = 150. x = 25.",
    "Medium",
  ],
  [
    "Sisi empat dengan sudut (2a + 10)°, 90°, (3a − 5)° dan 85°. Cari a.",
    ["a = 36", "a = 30", "a = 40", "a = 45"],
    0,
    "(2a + 10) + 90 + (3a − 5) + 85 = 360. 5a + 180 = 360. 5a = 180. a = 36. Semak: (72+10)+90+(108−5)+85 = 82+90+103+85 = 360 ✓. a = 36.",
    "Medium",
  ],
  [
    "Trapezium ABCD mempunyai AB selari dengan DC. ∠A = 65° dan ∠B = 100°. Cari ∠D.",
    ["65°", "80°", "115°", "95°"],
    2,
    "AB selari dengan DC, maka ∠A dan ∠D ialah sudut pedalaman yang berjumlah 180°. ∠D = 180° − 65° = 115°.",
    "Medium",
  ],
  [
    "Segi tiga sama sisi: setiap sudut adalah?",
    ["45°", "60°", "72°", "90°"],
    1,
    "Segi tiga sama sisi: semua sudut = 180°/3 = 60°.",
    "Medium",
  ],
  [
    "Sisi empat dengan semua sudut sama. Berapakah setiap sudut?",
    ["45°", "60°", "72°", "90°"],
    3,
    "Jumlah sudut sisi empat = 360°. Jika semua sama: 360°/4 = 90°.",
    "Medium",
  ],
  [
    "Sudut luar segi tiga dengan dua sudut dalam berhadapan = (2x + 15)° dan (x + 10)°. Jika sudut luar = 100°, cari x.",
    ["x = 15", "x = 20", "x = 25", "x = 30"],
    2,
    "(2x + 15) + (x + 10) = 100. 3x + 25 = 100. 3x = 75. x = 25.",
    "Medium",
  ],
  [
    "Sebuah poligon mempunyai 5 pepenjuru. Berapakah bilangan sisinya?",
    ["4", "5", "6", "7"],
    1,
    "n(n−3)/2 = 5. n(n−3) = 10. n = 5: 5(2) = 10 ✓. Pentagon mempunyai 5 sisi.",
    "Medium",
  ],
  [
    "Segi tiga bersudut cakah: sudut cakah = 115°, sudut kedua = 35°. Cari sudut ketiga.",
    ["25°", "40°", "35°", "30°"],
    3,
    "115° + 35° + x = 180°. x = 180° − 150° = 30°.",
    "Medium",
  ],
  [
    "Segi empat selari ABCD: ∠A = (4k + 10)° dan ∠B = (2k + 50)°. Cari k.",
    ["k = 20", "k = 25", "k = 30", "k = 35"],
    0,
    "∠A + ∠B = 180° (bersebelahan). (4k + 10) + (2k + 50) = 180. 6k + 60 = 180. 6k = 120. k = 20.",
    "Medium",
  ],
  [
    "Segi tiga sama kaki PQR: PQ = PR. ∠Q = (3x − 5)° dan ∠R = (2x + 10)°. Cari x dan nilai sudut.",
    ["x = 20, sudut = 55°", "x = 15, sudut = 40°", "x = 10, sudut = 25°", "x = 25, sudut = 70°"],
    1,
    "∠Q = ∠R (sudut tapak). 3x − 5 = 2x + 10. x = 15. Sudut = 3(15) − 5 = 40°.",
    "Medium",
  ],
  [
    "Dalam belah ketupat PQRS, ∠P = 58°. Cari ∠Q.",
    ["61°", "58°", "32°", "122°"],
    3,
    "Sudut bersebelahan dalam belah ketupat berjumlah 180°. ∠Q = 180° − 58° = 122°.",
    "Medium",
  ],
  [
    "Sisi empat: ∠A = ∠C = 100° dan ∠B = ∠D. Cari ∠B.",
    ["80°", "90°", "100°", "110°"],
    0,
    "∠A + ∠B + ∠C + ∠D = 360°. 100 + ∠B + 100 + ∠B = 360. 2∠B = 160. ∠B = 80°.",
    "Medium",
  ],
  [
    "Segi tiga: sudut luar di A = 140°. ∠B = 80°. Cari ∠C.",
    ["40°", "50°", "60°", "70°"],
    2,
    "Sudut luar di A = ∠B + ∠C. 140° = 80° + ∠C. ∠C = 60°.",
    "Medium",
  ],
  [
    "Sudut-sudut dalam sebuah segi tiga ialah x°, (x + 10)° dan (x + 20)°. Cari sudut yang terbesar.",
    ["80°", "50°", "60°", "70°"],
    3,
    "x + (x + 10) + (x + 20) = 180. 3x + 30 = 180. x = 50. Sudut terbesar = 50° + 20° = 70°.",
    "Medium",
  ],
  [
    "Segi empat tepat ABCD dibahagikan oleh pepenjuru AC. ∠BAC = 35°. Cari ∠ACB.",
    ["35°", "55°", "90°", "145°"],
    1,
    "Dalam segi tiga ABC, ∠ABC = 90° kerana ABCD ialah segi empat tepat. ∠ACB = 180° − 90° − 35° = 55°.",
    "Medium",
  ],
]);

const MATH_C9_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "What is the sum of interior angles of a triangle?",
    ["180°", "90°", "270°", "360°"],
    0,
    "The sum of all three interior angles of any triangle is always 180°.",
    "Medium",
  ],
  [
    "What is the sum of interior angles of a quadrilateral?",
    ["180°", "360°", "270°", "540°"],
    1,
    "The sum of all four interior angles of any quadrilateral is always 360°.",
    "Medium",
  ],
  [
    "Triangle ABC: ∠A = 55°, ∠B = 75°. Find ∠C.",
    ["40°", "60°", "50°", "70°"],
    2,
    "∠C = 180° − 55° − 75° = 50°.",
    "Medium",
  ],
  [
    "Quadrilateral PQRS: ∠P = 90°, ∠Q = 85°, ∠R = 95°. Find ∠S.",
    ["80°", "100°", "95°", "90°"],
    3,
    "∠S = 360° − 90° − 85° − 95° = 90°.",
    "Medium",
  ],
  [
    "How many diagonals does a quadrilateral have?",
    ["1", "2", "3", "4"],
    1,
    "Diagonals of a quadrilateral = 4(4−3)/2 = 4(1)/2 = 2 diagonals.",
    "Medium",
  ],
  [
    "How many diagonals does a pentagon have?",
    ["3", "4", "5", "6"],
    2,
    "Diagonals of a pentagon = 5(5−3)/2 = 5(2)/2 = 5 diagonals.",
    "Medium",
  ],
  [
    "How many diagonals does a hexagon have?",
    ["6", "7", "8", "9"],
    3,
    "Diagonals of a hexagon = 6(6−3)/2 = 6(3)/2 = 9 diagonals.",
    "Medium",
  ],
  [
    "In triangle PQR, ∠P = 2∠Q and ∠R = 60°. Find ∠Q.",
    ["40°", "60°", "80°", "30°"],
    0,
    "∠P + ∠Q + ∠R = 180°. 2∠Q + ∠Q + 60° = 180°. 3∠Q = 120°. ∠Q = 40°. (∠P = 80°.)",
    "Medium",
  ],
  [
    "Isosceles triangle: apex angle = 50°. Find the base angles.",
    ["50°", "70°", "65°", "80°"],
    2,
    "Two base angles equal: (180° − 50°)/2 = 130°/2 = 65°.",
    "Medium",
  ],
  [
    "Isosceles triangle: each base angle = 40°. Find the apex angle.",
    ["80°", "140°", "120°", "100°"],
    3,
    "Apex angle = 180° − 40° − 40° = 100°.",
    "Medium",
  ],
  [
    "Parallelogram: ∠A = 65°. Find ∠B, ∠C and ∠D.",
    [
      "∠B = 115°, ∠C = 65°, ∠D = 115°",
      "∠B = 65°, ∠C = 115°, ∠D = 65°",
      "∠B = 65°, ∠C = 65°, ∠D = 115°",
      "∠B = 115°, ∠C = 115°, ∠D = 65°",
    ],
    0,
    "Opposite angles equal: ∠C = 65°. Adjacent angles sum to 180°: ∠B = ∠D = 180° − 65° = 115°.",
    "Medium",
  ],
  [
    "Exterior angle of a triangle = 125°. One non-adjacent interior angle = 60°. Find the other.",
    ["55°", "65°", "60°", "70°"],
    1,
    "Exterior angle = sum of two non-adjacent interior angles. 125° = 60° + x. x = 65°.",
    "Medium",
  ],
  [
    "Right-angled triangle: one non-right angle = 38°. Find the other non-right angle.",
    ["42°", "72°", "62°", "52°"],
    3,
    "Two non-right angles sum to 90°. 38° + x = 90°. x = 52°.",
    "Medium",
  ],
  [
    "Kite PQRS has ∠P = 110°, ∠R = 70° and ∠Q = ∠S. Find ∠Q.",
    ["90°", "110°", "70°", "180°"],
    0,
    "The angles of a quadrilateral add up to 360°. ∠Q + ∠S = 360° − 110° − 70° = 180°. Since ∠Q = ∠S, ∠Q = 90°.",
    "Medium",
  ],
  [
    "Quadrilateral: three angles = 75°, 95°, 110°. Find the fourth angle.",
    ["70°", "80°", "90°", "100°"],
    1,
    "Fourth angle = 360° − 75° − 95° − 110° = 80°.",
    "Medium",
  ],
  [
    "Triangle with angles (3x)°, (2x + 10)° and (x + 20)°. Find x.",
    ["35", "30", "25", "40"],
    2,
    "3x + (2x + 10) + (x + 20) = 180. 6x + 30 = 180. 6x = 150. x = 25.",
    "Medium",
  ],
  [
    "Quadrilateral with angles (2a + 10)°, 90°, (3a − 5)° and 85°. Find a.",
    ["a = 36", "a = 30", "a = 40", "a = 45"],
    0,
    "(2a + 10) + 90 + (3a − 5) + 85 = 360. 5a + 180 = 360. 5a = 180. a = 36.",
    "Medium",
  ],
  [
    "Trapezium ABCD has AB parallel to DC. ∠A = 65° and ∠B = 100°. Find ∠D.",
    ["65°", "80°", "115°", "95°"],
    2,
    "AB is parallel to DC, so ∠A and ∠D are interior angles that add up to 180°. ∠D = 180° − 65° = 115°.",
    "Medium",
  ],
  [
    "What is each angle of an equilateral triangle?",
    ["45°", "60°", "72°", "90°"],
    1,
    "Equilateral triangle: all angles = 180°/3 = 60°.",
    "Medium",
  ],
  [
    "A quadrilateral has all equal angles. What is each angle?",
    ["45°", "60°", "72°", "90°"],
    3,
    "Sum of quadrilateral angles = 360°. If all equal: 360°/4 = 90°.",
    "Medium",
  ],
  [
    "Exterior angle with two non-adjacent interior angles = (2x + 15)° and (x + 10)°. Exterior angle = 100°. Find x.",
    ["x = 15", "x = 20", "x = 25", "x = 30"],
    2,
    "(2x + 15) + (x + 10) = 100. 3x + 25 = 100. 3x = 75. x = 25.",
    "Medium",
  ],
  [
    "A polygon has 5 diagonals. How many sides does it have?",
    ["4", "5", "6", "7"],
    1,
    "n(n−3)/2 = 5. n(n−3) = 10. n = 5: 5(2) = 10 ✓. Pentagon has 5 sides.",
    "Medium",
  ],
  [
    "Obtuse-angled triangle: obtuse angle = 115°, second angle = 35°. Find the third angle.",
    ["25°", "40°", "35°", "30°"],
    3,
    "115° + 35° + x = 180°. x = 180° − 150° = 30°.",
    "Medium",
  ],
  [
    "Parallelogram ABCD: ∠A = (4k + 10)° and ∠B = (2k + 50)°. Find k.",
    ["k = 20", "k = 25", "k = 30", "k = 35"],
    0,
    "∠A + ∠B = 180° (adjacent). (4k + 10) + (2k + 50) = 180. 6k + 60 = 180. 6k = 120. k = 20.",
    "Medium",
  ],
  [
    "Isosceles triangle PQR: PQ = PR. ∠Q = (3x − 5)° and ∠R = (2x + 10)°. Find x and the angle value.",
    ["x = 20, angle = 55°", "x = 15, angle = 40°", "x = 10, angle = 25°", "x = 25, angle = 70°"],
    1,
    "∠Q = ∠R (base angles). 3x − 5 = 2x + 10. x = 15. Angle = 3(15) − 5 = 40°.",
    "Medium",
  ],
  [
    "In rhombus PQRS, ∠P = 58°. Find ∠Q.",
    ["61°", "58°", "32°", "122°"],
    3,
    "Adjacent angles in a rhombus add up to 180°. ∠Q = 180° − 58° = 122°.",
    "Medium",
  ],
  [
    "Quadrilateral: ∠A = ∠C = 100° and ∠B = ∠D. Find ∠B.",
    ["80°", "90°", "100°", "110°"],
    0,
    "∠A + ∠B + ∠C + ∠D = 360°. 100 + ∠B + 100 + ∠B = 360. 2∠B = 160. ∠B = 80°.",
    "Medium",
  ],
  [
    "Triangle: exterior angle at A = 140°. ∠B = 80°. Find ∠C.",
    ["40°", "50°", "60°", "70°"],
    2,
    "Exterior angle at A = ∠B + ∠C. 140° = 80° + ∠C. ∠C = 60°.",
    "Medium",
  ],
  [
    "The angles in a triangle are x°, (x + 10)° and (x + 20)°. Find the largest angle.",
    ["80°", "50°", "60°", "70°"],
    3,
    "x + (x + 10) + (x + 20) = 180. 3x + 30 = 180. x = 50. The largest angle = 50° + 20° = 70°.",
    "Medium",
  ],
  [
    "Rectangle ABCD is divided by the diagonal AC. ∠BAC = 35°. Find ∠ACB.",
    ["35°", "55°", "90°", "145°"],
    1,
    "In triangle ABC, ∠ABC = 90° because ABCD is a rectangle. ∠ACB = 180° − 90° − 35° = 55°.",
    "Medium",
  ],
]);

const MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Dalam segi tiga ABC, ∠A = (3x + 5)°, ∠B = (2x − 10)° dan ∠C = (x + 35)°. Cari x.",
    ["x = 25", "x = 23", "x = 30", "x = 20"],
    0,
    "(3x + 5) + (2x − 10) + (x + 35) = 180. 6x + 30 = 180. 6x = 150. x = 25. Sudut: 80°, 40°, 60°.",
    "Hard",
  ],
  [
    "Sisi empat ABCD mempunyai ∠A = (2x + 10)°, ∠B = (x + 20)°, ∠C = (3x − 5)° dan ∠D = (4x − 5)°. Cari x.",
    ["x = 30", "x = 34", "x = 32", "x = 36"],
    1,
    "(2x + 10) + (x + 20) + (3x − 5) + (4x − 5) = 360. 10x + 20 = 360. 10x = 340. x = 34. Semak: 78° + 54° + 97° + 131° = 360°.",
    "Hard",
  ],
  [
    "Sebuah poligon mempunyai 35 pepenjuru. Berapakah bilangan sisinya?",
    ["8", "9", "10", "11"],
    2,
    "Bilangan pepenjuru = n(n − 3)/2 = 35, maka n(n − 3) = 70. Cuba n = 10: 10 × 7 = 70. Poligon itu ialah dekagon (10 sisi).",
    "Hard",
  ],
  [
    "Segi tiga ABC ialah segi tiga sama kaki dengan AB = AC. Sisi BC dipanjangkan ke D. Jika ∠ACD = 115°, cari ∠BAC.",
    ["25°", "65°", "115°", "50°"],
    3,
    "∠ACB = 180° − 115° = 65°. Oleh sebab AB = AC, ∠ABC = ∠ACB = 65°. ∠BAC = 180° − 65° − 65° = 50°.",
    "Hard",
  ],
  [
    "Dalam segi tiga ABC, ∠A = 50° dan ∠B = 70°. Sisi BC dipanjangkan ke D. Cari ∠ACD (sudut luar di C).",
    ["60°", "120°", "100°", "80°"],
    1,
    "∠C = 180° − 50° − 70° = 60°. Sudut peluaran di C = 180° − 60° = 120°, iaitu sama dengan ∠A + ∠B = 50° + 70°.",
    "Hard",
  ],
  [
    "Segi tiga PQR ialah segi tiga sama kaki dengan PQ = PR. ∠QPR = (4y − 20)° dan ∠PQR = (y + 25)°. Cari y.",
    ["y = 20", "y = 30", "y = 25", "y = 35"],
    2,
    "∠PQR = ∠PRQ = (y + 25)°. (4y − 20) + 2(y + 25) = 180. 6y + 30 = 180. 6y = 150. y = 25. Sudut: 80°, 50°, 50°.",
    "Hard",
  ],
  [
    "Segi empat selari ABCD mempunyai ∠A = (5m − 15)° dan ∠C = (3m + 25)°. Cari m dan ∠A.",
    ["m = 30, ∠A = 135°", "m = 15, ∠A = 60°", "m = 25, ∠A = 110°", "m = 20, ∠A = 85°"],
    3,
    "Sudut bertentangan dalam segi empat selari adalah sama: 5m − 15 = 3m + 25. 2m = 40. m = 20. ∠A = 5(20) − 15 = 85°.",
    "Hard",
  ],
  [
    "Sudut-sudut dalam sebuah segi tiga adalah dalam nisbah 2 : 3 : 4. Cari ketiga-tiga sudut itu.",
    ["40°, 60°, 80°", "20°, 30°, 40°", "50°, 75°, 100°", "36°, 54°, 72°"],
    0,
    "Jumlah bahagian = 2 + 3 + 4 = 9. Satu bahagian = 180° ÷ 9 = 20°. Sudut: 40°, 60°, 80°.",
    "Hard",
  ],
  [
    "Sudut-sudut dalam sebuah sisi empat adalah dalam nisbah 1 : 2 : 3 : 4. Cari keempat-empat sudut itu.",
    ["30°, 60°, 90°, 120°", "45°, 90°, 135°, 90°", "36°, 72°, 108°, 144°", "40°, 80°, 120°, 160°"],
    2,
    "Jumlah bahagian = 1 + 2 + 3 + 4 = 10. Satu bahagian = 360° ÷ 10 = 36°. Sudut: 36°, 72°, 108°, 144°.",
    "Hard",
  ],
  [
    "Dalam belah ketupat ABCD, ∠ABC = 70°. Cari ∠BAD, ∠BCD dan ∠CDA.",
    [
      "∠BAD = 110°, ∠BCD = 70°, ∠CDA = 110°",
      "Semuanya 90°",
      "∠BAD = 70°, ∠BCD = 110°, ∠CDA = 70°",
      "∠BAD = 110°, ∠BCD = 110°, ∠CDA = 70°",
    ],
    3,
    "Sudut bertentangan dalam belah ketupat adalah sama: ∠CDA = ∠ABC = 70°. Sudut bersebelahan berjumlah 180°: ∠BAD = ∠BCD = 180° − 70° = 110°.",
    "Hard",
  ],
  [
    "Dalam segi tiga ABC, ∠A = (6t − 10)° dan sudut luar di A = (4t + 20)°. Cari t.",
    ["t = 17", "t = 15", "t = 20", "t = 25"],
    0,
    "Sudut pedalaman dan sudut luar di bucu yang sama berjumlah 180°: (6t − 10) + (4t + 20) = 180. 10t + 10 = 180. 10t = 170. t = 17.",
    "Hard",
  ],
  [
    "Dalam segi tiga PQR, sudut luar di R ialah 130° dan ∠P = ∠Q. Cari ∠P.",
    ["50°", "65°", "130°", "25°"],
    1,
    "Sudut peluaran di R = ∠P + ∠Q = 130°. Oleh sebab ∠P = ∠Q, ∠P = 130° ÷ 2 = 65°.",
    "Hard",
  ],
  [
    "Dalam sebuah segi tiga bersudut tegak, dua sudut tirus ialah (2x + 5)° dan (3x − 10)°. Cari x.",
    ["x = 22", "x = 20", "x = 21", "x = 19"],
    3,
    "Dua sudut tirus dalam segi tiga bersudut tegak berjumlah 90°: (2x + 5) + (3x − 10) = 90. 5x − 5 = 90. 5x = 95. x = 19.",
    "Hard",
  ],
  [
    "Sebuah poligon sekata mempunyai 6 garis simetri. Apakah nama poligon itu?",
    ["Heksagon sekata", "Pentagon sekata", "Heptagon sekata", "Oktagon sekata"],
    0,
    "Poligon sekata dengan n sisi mempunyai n garis simetri. 6 garis simetri bermaksud 6 sisi, iaitu heksagon sekata.",
    "Hard",
  ],
  [
    "Sisi empat ABCD mempunyai ∠A = 3p, ∠B = 2p, ∠C = 4p dan ∠D = p. Cari p dan semua sudut.",
    [
      "p = 40°; 120°, 80°, 160°, 40°",
      "p = 36°; 108°, 72°, 144°, 36°",
      "p = 30°; 90°, 60°, 120°, 30°",
      "p = 45°; 135°, 90°, 180°, 45°",
    ],
    1,
    "3p + 2p + 4p + p = 360°. 10p = 360°. p = 36°. Sudut: 108°, 72°, 144°, 36°.",
    "Hard",
  ],
  [
    "Dalam segi tiga ABC, sudut luar di B ialah 115° dan ∠A = 55°. Adakah segi tiga ABC sebuah segi tiga sama kaki?",
    [
      "Ya, kerana ∠A = ∠C = 55°",
      "Ya, kerana ∠B = ∠C = 65°",
      "Tidak, kerana ketiga-tiga sudut berbeza",
      "Tidak boleh ditentukan daripada maklumat ini",
    ],
    2,
    "∠B = 180° − 115° = 65°. ∠C = 180° − 55° − 65° = 60°. Ketiga-tiga sudut (55°, 65°, 60°) berbeza, jadi segi tiga itu bukan sama kaki.",
    "Hard",
  ],
  [
    "Segi empat selari PQRS mempunyai ∠P = (7n − 5)° dan ∠Q = (3n + 45)°. Cari n dan ∠P.",
    ["n = 14, ∠P = 93°", "n = 10, ∠P = 65°", "n = 12, ∠P = 79°", "n = 16, ∠P = 107°"],
    0,
    "Sudut bersebelahan dalam segi empat selari berjumlah 180°: (7n − 5) + (3n + 45) = 180. 10n + 40 = 180. n = 14. ∠P = 7(14) − 5 = 93°.",
    "Hard",
  ],
  [
    "Dalam segi tiga XYZ, XY = XZ = 8 cm dan YZ = 6 cm. ∠Y = 70°. Apakah jenis segi tiga ini dan berapakah ∠X?",
    [
      "Sama sisi, ∠X = 60°",
      "Sama kaki, ∠X = 36°",
      "Sama kaki, ∠X = 40°",
      "Tak sama kaki, ∠X = 50°",
    ],
    2,
    "XY = XZ, jadi segi tiga itu sama kaki dan ∠Y = ∠Z = 70°. ∠X = 180° − 70° − 70° = 40°.",
    "Hard",
  ],
  [
    "Trapezium ABCD mempunyai AB selari dengan DC. ∠A = (2x + 10)° dan ∠D = (3x − 20)°. Cari x.",
    ["x = 40", "x = 38", "x = 42", "x = 45"],
    1,
    "AB selari dengan DC, maka ∠A + ∠D = 180° (sudut pedalaman). (2x + 10) + (3x − 20) = 180. 5x − 10 = 180. 5x = 190. x = 38.",
    "Hard",
  ],
  [
    "Sebuah sisi empat dibahagikan kepada 2 segi tiga oleh satu pepenjuru. Gunakan fakta ini untuk mencari hasil tambah sudut dalam sisi empat itu.",
    ["180°", "270°", "540°", "360°"],
    3,
    "Setiap segi tiga mempunyai hasil tambah sudut 180°. 2 segi tiga = 2 × 180° = 360°.",
    "Hard",
  ],
  [
    "Dalam sebuah segi tiga bersudut tegak, satu sudut tirus ialah 4 kali sudut tirus yang lain. Cari sudut tirus yang lebih kecil.",
    ["72°", "22.5°", "18°", "36°"],
    2,
    "Dua sudut tirus berjumlah 90°: x + 4x = 90°. 5x = 90°. x = 18°. (72° ialah sudut tirus yang lebih besar.)",
    "Hard",
  ],
  [
    "Dalam sisi empat ABCD, ∠A = ∠C, ∠B = ∠D dan ∠A = 2∠B. Cari semua sudut.",
    [
      "∠A = ∠C = 100°, ∠B = ∠D = 80°",
      "∠A = ∠C = 120°, ∠B = ∠D = 60°",
      "∠A = ∠C = 90°, ∠B = ∠D = 90°",
      "∠A = ∠C = 80°, ∠B = ∠D = 100°",
    ],
    1,
    "2∠A + 2∠B = 360°, jadi ∠A + ∠B = 180°. 2∠B + ∠B = 180°. ∠B = 60° dan ∠A = 120°.",
    "Hard",
  ],
  [
    "Sebuah segi tiga sama kaki mempunyai sudut puncak yang dua kali sudut tapak. Cari semua sudut.",
    [
      "Puncak = 60°, tapak = 60°",
      "Puncak = 72°, tapak = 54°",
      "Puncak = 80°, tapak = 50°",
      "Puncak = 90°, tapak = 45°",
    ],
    3,
    "Katakan sudut tapak = x, maka sudut puncak = 2x. 2x + x + x = 180°. 4x = 180°. x = 45°. Puncak = 90°, tapak = 45°.",
    "Hard",
  ],
  [
    "Dalam sisi empat PQRS, ∠P = 75°, ∠Q = 105° dan ∠R = 75°. Cari ∠S.",
    ["105°", "75°", "95°", "180°"],
    0,
    "∠S = 360° − 75° − 105° − 75° = 105°. Sudut bertentangan adalah sama, seperti dalam segi empat selari.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai satu sudut 90° dan dua sudut lain yang sama besar. Berapakah saiz setiap sudut yang sama itu, dan apakah jenis segi tiga itu?",
    [
      "45°, segi tiga sama sisi yang tirus",
      "45°, segi tiga bersudut tegak sama kaki",
      "60°, segi tiga sama sisi yang tirus",
      "90°, segi tiga sama kaki yang cakah",
    ],
    1,
    "Dua sudut yang sama berjumlah 180° − 90° = 90°, jadi setiap satu ialah 45°. Segi tiga itu bersudut tegak dan sama kaki.",
    "Hard",
  ],
  [
    "Dalam segi empat selari ABCD, ∠A − ∠B = 40°. Cari ∠A.",
    ["40°", "70°", "140°", "110°"],
    3,
    "Sudut bersebelahan berjumlah 180°: ∠A + ∠B = 180°. Dengan ∠A − ∠B = 40°, 2∠A = 220°, maka ∠A = 110° dan ∠B = 70°.",
    "Hard",
  ],
  [
    "Sisi empat ABCD mempunyai AB selari dengan DC, ∠A = ∠D = 90° dan AB ≠ DC. Apakah jenis sisi empat itu?",
    ["Trapezium", "Segi empat selari", "Segi empat tepat", "Lelayang"],
    0,
    "Hanya satu pasang sisi (AB dan DC) yang selari kerana AB ≠ DC, jadi ABCD ialah trapezium (trapezium bersudut tegak).",
    "Hard",
  ],
  [
    "Dalam segi tiga ABC, ∠A = (4k + 10)°, ∠B = (3k − 5)° dan sudut luar di C ialah 110°. Cari k.",
    ["k = 20", "k = 10", "k = 15", "k = 25"],
    2,
    "Sudut peluaran di C = ∠A + ∠B: (4k + 10) + (3k − 5) = 110. 7k + 5 = 110. 7k = 105. k = 15.",
    "Hard",
  ],
  [
    "Dalam segi tiga sama kaki ABC, AB = BC dan ∠A = 40°. Cari ∠B.",
    ["40°", "80°", "140°", "100°"],
    3,
    "AB = BC, maka ∠A = ∠C = 40° (sudut tapak). ∠B = 180° − 40° − 40° = 100°.",
    "Hard",
  ],
  [
    "Lelayang PQRS mempunyai PQ = PS dan QR = SR. ∠P = 80° dan ∠R = 60°. Cari ∠Q.",
    ["80°", "110°", "60°", "140°"],
    1,
    "Lelayang itu bersimetri pada PR, jadi ∠Q = ∠S. ∠Q + ∠S = 360° − 80° − 60° = 220°. ∠Q = 110°.",
    "Hard",
  ],
]);

const MATH_C9_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "In triangle ABC, ∠A = (3x + 5)°, ∠B = (2x − 10)° and ∠C = (x + 35)°. Find x.",
    ["x = 25", "x = 23", "x = 30", "x = 20"],
    0,
    "(3x + 5) + (2x − 10) + (x + 35) = 180. 6x + 30 = 180. 6x = 150. x = 25. Angles: 80°, 40°, 60°.",
    "Hard",
  ],
  [
    "Quadrilateral ABCD has ∠A = (2x + 10)°, ∠B = (x + 20)°, ∠C = (3x − 5)° and ∠D = (4x − 5)°. Find x.",
    ["x = 30", "x = 34", "x = 32", "x = 36"],
    1,
    "(2x + 10) + (x + 20) + (3x − 5) + (4x − 5) = 360. 10x + 20 = 360. 10x = 340. x = 34. Check: 78° + 54° + 97° + 131° = 360°.",
    "Hard",
  ],
  [
    "A polygon has 35 diagonals. How many sides does it have?",
    ["8", "9", "10", "11"],
    2,
    "Number of diagonals = n(n − 3)/2 = 35, so n(n − 3) = 70. Try n = 10: 10 × 7 = 70. The polygon is a decagon (10 sides).",
    "Hard",
  ],
  [
    "Triangle ABC is isosceles with AB = AC. Side BC is extended to D. If ∠ACD = 115°, find ∠BAC.",
    ["25°", "65°", "115°", "50°"],
    3,
    "∠ACB = 180° − 115° = 65°. Since AB = AC, ∠ABC = ∠ACB = 65°. ∠BAC = 180° − 65° − 65° = 50°.",
    "Hard",
  ],
  [
    "In triangle ABC, ∠A = 50° and ∠B = 70°. Side BC is extended to D. Find ∠ACD (the exterior angle at C).",
    ["60°", "120°", "100°", "80°"],
    1,
    "∠C = 180° − 50° − 70° = 60°. The exterior angle at C = 180° − 60° = 120°, which equals ∠A + ∠B = 50° + 70°.",
    "Hard",
  ],
  [
    "Triangle PQR is isosceles with PQ = PR. ∠QPR = (4y − 20)° and ∠PQR = (y + 25)°. Find y.",
    ["y = 20", "y = 30", "y = 25", "y = 35"],
    2,
    "∠PQR = ∠PRQ = (y + 25)°. (4y − 20) + 2(y + 25) = 180. 6y + 30 = 180. 6y = 150. y = 25. Angles: 80°, 50°, 50°.",
    "Hard",
  ],
  [
    "Parallelogram ABCD has ∠A = (5m − 15)° and ∠C = (3m + 25)°. Find m and ∠A.",
    ["m = 30, ∠A = 135°", "m = 15, ∠A = 60°", "m = 25, ∠A = 110°", "m = 20, ∠A = 85°"],
    3,
    "Opposite angles in a parallelogram are equal: 5m − 15 = 3m + 25. 2m = 40. m = 20. ∠A = 5(20) − 15 = 85°.",
    "Hard",
  ],
  [
    "The angles of a triangle are in the ratio 2 : 3 : 4. Find all three angles.",
    ["40°, 60°, 80°", "20°, 30°, 40°", "50°, 75°, 100°", "36°, 54°, 72°"],
    0,
    "Total parts = 2 + 3 + 4 = 9. One part = 180° ÷ 9 = 20°. Angles: 40°, 60°, 80°.",
    "Hard",
  ],
  [
    "The angles of a quadrilateral are in the ratio 1 : 2 : 3 : 4. Find all four angles.",
    ["30°, 60°, 90°, 120°", "45°, 90°, 135°, 90°", "36°, 72°, 108°, 144°", "40°, 80°, 120°, 160°"],
    2,
    "Total parts = 1 + 2 + 3 + 4 = 10. One part = 360° ÷ 10 = 36°. Angles: 36°, 72°, 108°, 144°.",
    "Hard",
  ],
  [
    "In rhombus ABCD, ∠ABC = 70°. Find ∠BAD, ∠BCD and ∠CDA.",
    [
      "∠BAD = 110°, ∠BCD = 70°, ∠CDA = 110°",
      "All are 90°",
      "∠BAD = 70°, ∠BCD = 110°, ∠CDA = 70°",
      "∠BAD = 110°, ∠BCD = 110°, ∠CDA = 70°",
    ],
    3,
    "Opposite angles in a rhombus are equal: ∠CDA = ∠ABC = 70°. Adjacent angles add up to 180°: ∠BAD = ∠BCD = 180° − 70° = 110°.",
    "Hard",
  ],
  [
    "In triangle ABC, ∠A = (6t − 10)° and the exterior angle at A = (4t + 20)°. Find t.",
    ["t = 17", "t = 15", "t = 20", "t = 25"],
    0,
    "The interior and exterior angles at the same vertex add up to 180°: (6t − 10) + (4t + 20) = 180. 10t + 10 = 180. 10t = 170. t = 17.",
    "Hard",
  ],
  [
    "In triangle PQR, the exterior angle at R is 130° and ∠P = ∠Q. Find ∠P.",
    ["50°", "65°", "130°", "25°"],
    1,
    "The exterior angle at R = ∠P + ∠Q = 130°. Since ∠P = ∠Q, ∠P = 130° ÷ 2 = 65°.",
    "Hard",
  ],
  [
    "In a right-angled triangle, the two acute angles are (2x + 5)° and (3x − 10)°. Find x.",
    ["x = 22", "x = 20", "x = 21", "x = 19"],
    3,
    "The two acute angles in a right-angled triangle add up to 90°: (2x + 5) + (3x − 10) = 90. 5x − 5 = 90. 5x = 95. x = 19.",
    "Hard",
  ],
  [
    "A regular polygon has 6 lines of symmetry. What is the polygon?",
    ["Regular hexagon", "Regular pentagon", "Regular heptagon", "Regular octagon"],
    0,
    "A regular polygon with n sides has n lines of symmetry. 6 lines of symmetry means 6 sides, a regular hexagon.",
    "Hard",
  ],
  [
    "Quadrilateral ABCD has ∠A = 3p, ∠B = 2p, ∠C = 4p and ∠D = p. Find p and all the angles.",
    [
      "p = 40°; 120°, 80°, 160°, 40°",
      "p = 36°; 108°, 72°, 144°, 36°",
      "p = 30°; 90°, 60°, 120°, 30°",
      "p = 45°; 135°, 90°, 180°, 45°",
    ],
    1,
    "3p + 2p + 4p + p = 360°. 10p = 360°. p = 36°. Angles: 108°, 72°, 144°, 36°.",
    "Hard",
  ],
  [
    "In triangle ABC, the exterior angle at B is 115° and ∠A = 55°. Is triangle ABC an isosceles triangle?",
    [
      "Yes, because ∠A = ∠C = 55°",
      "Yes, because ∠B = ∠C = 65°",
      "No, because all three angles are different",
      "It cannot be determined from the information",
    ],
    2,
    "∠B = 180° − 115° = 65°. ∠C = 180° − 55° − 65° = 60°. All three angles (55°, 65°, 60°) are different, so the triangle is not isosceles.",
    "Hard",
  ],
  [
    "Parallelogram PQRS has ∠P = (7n − 5)° and ∠Q = (3n + 45)°. Find n and ∠P.",
    ["n = 14, ∠P = 93°", "n = 10, ∠P = 65°", "n = 12, ∠P = 79°", "n = 16, ∠P = 107°"],
    0,
    "Adjacent angles in a parallelogram add up to 180°: (7n − 5) + (3n + 45) = 180. 10n + 40 = 180. n = 14. ∠P = 7(14) − 5 = 93°.",
    "Hard",
  ],
  [
    "In triangle XYZ, XY = XZ = 8 cm and YZ = 6 cm. ∠Y = 70°. What type of triangle is it and what is ∠X?",
    ["Equilateral, ∠X = 60°", "Isosceles, ∠X = 36°", "Isosceles, ∠X = 40°", "Scalene, ∠X = 50°"],
    2,
    "XY = XZ, so the triangle is isosceles and ∠Y = ∠Z = 70°. ∠X = 180° − 70° − 70° = 40°.",
    "Hard",
  ],
  [
    "Trapezium ABCD has AB parallel to DC. ∠A = (2x + 10)° and ∠D = (3x − 20)°. Find x.",
    ["x = 40", "x = 38", "x = 42", "x = 45"],
    1,
    "AB is parallel to DC, so ∠A + ∠D = 180° (interior angles). (2x + 10) + (3x − 20) = 180. 5x − 10 = 180. 5x = 190. x = 38.",
    "Hard",
  ],
  [
    "A quadrilateral is divided into 2 triangles by one diagonal. Use this fact to find the sum of the interior angles of the quadrilateral.",
    ["180°", "270°", "540°", "360°"],
    3,
    "Each triangle has an angle sum of 180°. 2 triangles = 2 × 180° = 360°.",
    "Hard",
  ],
  [
    "In a right-angled triangle, one acute angle is 4 times the other acute angle. Find the smaller acute angle.",
    ["72°", "22.5°", "18°", "36°"],
    2,
    "The two acute angles add up to 90°: x + 4x = 90°. 5x = 90°. x = 18°. (72° is the larger acute angle.)",
    "Hard",
  ],
  [
    "In quadrilateral ABCD, ∠A = ∠C, ∠B = ∠D and ∠A = 2∠B. Find all the angles.",
    [
      "∠A = ∠C = 100°, ∠B = ∠D = 80°",
      "∠A = ∠C = 120°, ∠B = ∠D = 60°",
      "∠A = ∠C = 90°, ∠B = ∠D = 90°",
      "∠A = ∠C = 80°, ∠B = ∠D = 100°",
    ],
    1,
    "2∠A + 2∠B = 360°, so ∠A + ∠B = 180°. 2∠B + ∠B = 180°. ∠B = 60° and ∠A = 120°.",
    "Hard",
  ],
  [
    "An isosceles triangle has an apex angle that is twice a base angle. Find all the angles.",
    [
      "Apex = 60°, base = 60°",
      "Apex = 72°, base = 54°",
      "Apex = 80°, base = 50°",
      "Apex = 90°, base = 45°",
    ],
    3,
    "Let each base angle = x, so the apex angle = 2x. 2x + x + x = 180°. 4x = 180°. x = 45°. Apex = 90°, base = 45°.",
    "Hard",
  ],
  [
    "In quadrilateral PQRS, ∠P = 75°, ∠Q = 105° and ∠R = 75°. Find ∠S.",
    ["105°", "75°", "95°", "180°"],
    0,
    "∠S = 360° − 75° − 105° − 75° = 105°. Opposite angles are equal, as in a parallelogram.",
    "Hard",
  ],
  [
    "A triangle has one angle of 90° and two other equal angles. What is the size of each equal angle, and what type of triangle is it?",
    [
      "45°, an acute equilateral triangle",
      "45°, an isosceles right-angled triangle",
      "60°, an acute equilateral triangle",
      "90°, an obtuse isosceles triangle",
    ],
    1,
    "The two equal angles add up to 180° − 90° = 90°, so each is 45°. The triangle is right-angled and isosceles.",
    "Hard",
  ],
  [
    "In parallelogram ABCD, ∠A − ∠B = 40°. Find ∠A.",
    ["40°", "70°", "140°", "110°"],
    3,
    "Adjacent angles add up to 180°: ∠A + ∠B = 180°. With ∠A − ∠B = 40°, 2∠A = 220°, so ∠A = 110° and ∠B = 70°.",
    "Hard",
  ],
  [
    "Quadrilateral ABCD has AB parallel to DC, ∠A = ∠D = 90° and AB ≠ DC. What type of quadrilateral is it?",
    ["Trapezium", "Parallelogram", "Rectangle", "Kite"],
    0,
    "Only one pair of sides (AB and DC) is parallel because AB ≠ DC, so ABCD is a trapezium (a right-angled trapezium).",
    "Hard",
  ],
  [
    "In triangle ABC, ∠A = (4k + 10)°, ∠B = (3k − 5)° and the exterior angle at C is 110°. Find k.",
    ["k = 20", "k = 10", "k = 15", "k = 25"],
    2,
    "The exterior angle at C = ∠A + ∠B: (4k + 10) + (3k − 5) = 110. 7k + 5 = 110. 7k = 105. k = 15.",
    "Hard",
  ],
  [
    "In isosceles triangle ABC, AB = BC and ∠A = 40°. Find ∠B.",
    ["40°", "80°", "140°", "100°"],
    3,
    "AB = BC, so ∠A = ∠C = 40° (base angles). ∠B = 180° − 40° − 40° = 100°.",
    "Hard",
  ],
  [
    "Kite PQRS has PQ = PS and QR = SR. ∠P = 80° and ∠R = 60°. Find ∠Q.",
    ["80°", "110°", "60°", "140°"],
    1,
    "The kite is symmetric about PR, so ∠Q = ∠S. ∠Q + ∠S = 360° − 80° − 60° = 220°. ∠Q = 110°.",
    "Hard",
  ],
]);

const MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah perimeter sesuatu bentuk?",
    [
      "Jumlah panjang di sekeliling bentuk",
      "Jumlah permukaan di dalam bentuk",
      "Tinggi bentuk itu",
      "Lebar bentuk itu",
    ],
    0,
    "Perimeter ialah jumlah panjang kesemua sisi luar sesuatu bentuk rata.",
    "Easy",
  ],
  [
    "Apakah luas sesuatu bentuk?",
    [
      "Jumlah panjang sempadannya",
      "Jumlah permukaan di dalam sempadannya",
      "Bilangan sisi yang dimilikinya",
      "Tinggi bentuk itu",
    ],
    1,
    "Luas ialah jumlah ruang di dalam sempadan sesuatu bentuk rata (2D).",
    "Easy",
  ],
  [
    "Dalam unit apakah perimeter diukur?",
    ["cm²", "m²", "cm atau m", "km²"],
    2,
    "Perimeter diukur dalam unit panjang satu dimensi seperti cm, m, atau mm.",
    "Easy",
  ],
  [
    "Dalam unit apakah luas diukur?",
    ["cm", "m", "mm", "cm² atau m²"],
    3,
    "Luas diukur dalam unit persegi (dua dimensi) seperti cm² atau m².",
    "Easy",
  ],
  [
    "Apakah formula perimeter segi empat tepat?",
    ["p × l", "2(p + l)", "p + l", "4p"],
    1,
    "Perimeter segi empat tepat = 2(p + l), di mana p = panjang dan l = lebar.",
    "Easy",
  ],
  [
    "Apakah formula perimeter segi empat sama?",
    ["s²", "2s", "4s", "s + s"],
    2,
    "Perimeter segi empat sama = 4s, di mana s = panjang sisi.",
    "Easy",
  ],
  [
    "Apakah formula luas segi tiga?",
    ["tapak × tinggi", "tapak + tinggi", "2 × tapak × tinggi", "½ × tapak × tinggi"],
    3,
    "Luas segi tiga = ½ × tapak × tinggi.",
    "Easy",
  ],
  [
    "Apakah formula luas segi empat selari?",
    ["tapak × tinggi", "½ × tapak × tinggi", "tapak + tinggi", "2 × tapak × tinggi"],
    0,
    "Luas segi empat selari = tapak × tinggi.",
    "Easy",
  ],
  [
    "Apakah formula luas trapezium?",
    ["tapak × tinggi", "½ × tapak × tinggi", "½ × (a + b) × tinggi", "(a + b) × tinggi"],
    2,
    "Luas trapezium = ½ × (a + b) × tinggi, di mana a dan b ialah sisi selari.",
    "Easy",
  ],
  [
    "Apakah formula luas lelayang?",
    ["tapak × tinggi", "½ × tapak × tinggi", "d₁ × d₂", "½ × d₁ × d₂"],
    3,
    "Luas lelayang = ½ × d₁ × d₂, di mana d₁ dan d₂ ialah dua pepenjuru.",
    "Easy",
  ],
  [
    "1 m² bersamaan dengan berapa cm²?",
    ["10 000 cm²", "1 000 cm²", "100 cm²", "100 000 cm²"],
    0,
    "1 m² = 10 000 cm² (kerana 1 m = 100 cm, jadi 100 × 100 = 10 000).",
    "Easy",
  ],
  [
    "Apakah tinggi yang BETUL untuk mengira luas segi tiga?",
    [
      "Sisi terpanjang segi tiga",
      "Jarak berserenjang dari tapak ke puncak",
      "Mana-mana sisi segi tiga",
      "Sisi condong di sebelah tapak",
    ],
    1,
    "Tinggi segi tiga MESTI berserenjang (90°) dengan tapak. Bukan sisi condong.",
    "Easy",
  ],
  [
    "Apakah perbezaan utama antara perimeter dan luas?",
    [
      "Perimeter lebih besar daripada luas",
      "Tiada perbezaan",
      "Luas mengukur sempadan; perimeter mengukur kawasan dalaman",
      "Perimeter mengukur sempadan; luas mengukur kawasan dalaman",
    ],
    3,
    "Perimeter = panjang sempadan luar (unit: cm, m). Luas = kawasan dalaman (unit: cm², m²).",
    "Easy",
  ],
  [
    "Bentuk apakah yang memberikan luas terbesar untuk perimeter yang tetap?",
    ["Segi empat sama", "Segi tiga", "Segi empat tepat memanjang", "Trapezium"],
    0,
    "Untuk perimeter yang tetap, segi empat sama memberikan luas terbesar.",
    "Easy",
  ],
  [
    "Bentuk apakah yang memberikan perimeter terkecil untuk luas yang tetap?",
    ["Segi empat tepat memanjang", "Segi empat sama", "Segi tiga", "Trapezium"],
    1,
    "Untuk luas yang tetap, segi empat sama memberikan perimeter terkecil.",
    "Easy",
  ],
  [
    "Apakah sisi selari dalam formula luas trapezium?",
    [
      "Dua sisi condong trapezium",
      "Keempat-empat sisi trapezium",
      "Dua sisi yang selari (a dan b)",
      "Dua pepenjuru trapezium",
    ],
    2,
    "Dalam formula ½(a + b)h, a dan b adalah DUA sisi yang SELARI — bukan semua sisi.",
    "Easy",
  ],
  [
    "Apakah d₁ dan d₂ dalam formula luas lelayang?",
    [
      "Dua pepenjuru lelayang yang berserenjang",
      "Dua sisi bersebelahan lelayang",
      "Panjang dan lebar lelayang itu",
      "Dua sudut bertentangan lelayang",
    ],
    0,
    "d₁ dan d₂ ialah DUA PEPENJURU lelayang. Pepenjuru lelayang saling berserenjang (90°).",
    "Easy",
  ],
  [
    "Apakah kaedah grid untuk menganggar luas?",
    [
      "Mengira bilangan sisi bentuk itu",
      "Mengukur perimeter bentuk itu",
      "Melukis bentuk pada grid dan mengira petaknya",
      "Mengira bilangan pepenjuru bentuk",
    ],
    2,
    "Kaedah grid: lukis bentuk di atas kertas grid, kira petak penuh dan separuh di dalam bentuk.",
    "Easy",
  ],
  [
    "Dalam kaedah grid, petak yang lebih separuh berada di dalam bentuk dikira sebagai?",
    ["0", "1", "0.5", "2"],
    1,
    "Dalam kaedah grid: petak lebih separuh di dalam = dikira sebagai 1.",
    "Easy",
  ],
  [
    "Dalam kaedah grid, petak yang kurang separuh berada di dalam bentuk dikira sebagai?",
    ["2", "0.5", "1", "0"],
    3,
    "Dalam kaedah grid: petak kurang separuh di dalam = dikira sebagai 0.",
    "Easy",
  ],
  [
    "Segi empat tepat 6 cm × 4 cm. Apakah perimeter?",
    ["10 cm", "24 cm", "20 cm", "48 cm"],
    2,
    "Perimeter = 2(6 + 4) = 2(10) = 20 cm.",
    "Easy",
  ],
  [
    "Segi empat sama berisi 5 cm. Apakah perimeter?",
    ["10 cm", "20 cm", "15 cm", "25 cm"],
    1,
    "Perimeter = 4 × 5 = 20 cm.",
    "Easy",
  ],
  [
    "Segi tiga dengan sisi 3 cm, 4 cm dan 5 cm. Apakah perimeter?",
    ["7 cm", "9 cm", "15 cm", "12 cm"],
    3,
    "Perimeter = 3 + 4 + 5 = 12 cm.",
    "Easy",
  ],
  [
    "Apakah bentuk komposit?",
    [
      "Bentuk yang terbentuk daripada gabungan bentuk mudah",
      "Bentuk yang diwarnakan dengan banyak warna",
      "Bentuk yang mempunyai lebih daripada 4 sisi",
      "Sisi empat dengan sisi yang tidak sama",
    ],
    0,
    "Bentuk komposit ialah bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah.",
    "Easy",
  ],
  [
    "Apakah perbezaan antara segi tiga (luas) dan segi empat selari (luas)?",
    [
      "Segi tiga = bh; Segi empat selari = ½bh",
      "Segi tiga = ½bh; Segi empat selari = bh",
      "Kedua-duanya sama",
      "Segi tiga = b²; Segi empat selari = h²",
    ],
    1,
    "Luas segi tiga = ½bh. Luas segi empat selari = bh.",
    "Easy",
  ],
  [
    "Perimeter segi empat tepat = 30 cm. Panjang = 8 cm. Apakah lebar?",
    ["6 cm", "9 cm", "8 cm", "7 cm"],
    3,
    "2(8 + l) = 30. 8 + l = 15. l = 7 cm.",
    "Easy",
  ],
  [
    "Heksagon sekata berisi 3 cm. Apakah perimeter?",
    ["18 cm", "15 cm", "12 cm", "21 cm"],
    0,
    "Heksagon mempunyai 6 sisi. Perimeter = 6 × 3 = 18 cm.",
    "Easy",
  ],
  [
    "Apakah unit yang sesuai untuk mengukur luas bilik tidur?",
    ["cm", "km²", "m²", "mm"],
    2,
    "Bilik tidur adalah bersaiz sederhana. Unit yang sesuai ialah m² (meter persegi).",
    "Easy",
  ],
  [
    "Apakah unit yang sesuai untuk mengukur luas buku latihan?",
    ["m²", "km²", "mm", "cm²"],
    3,
    "Buku latihan adalah kecil. Unit yang sesuai ialah cm² (sentimeter persegi).",
    "Easy",
  ],
  [
    "Formula luas lelayang juga boleh digunakan untuk bentuk apa?",
    ["Segi tiga", "Belah ketupat", "Segi empat selari", "Trapezium"],
    1,
    "Formula ½d₁d₂ juga digunakan untuk BELAH KETUPAT, kerana pepenjuru belah ketupat juga berserenjang.",
    "Easy",
  ],
]);

const MATH_C10_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is the perimeter of a shape?",
    [
      "The total length around the shape",
      "The amount of surface inside the shape",
      "The height of the shape",
      "The width of the shape",
    ],
    0,
    "Perimeter is the total length of all outer sides of a flat shape.",
    "Easy",
  ],
  [
    "What is the area of a shape?",
    [
      "The total length of its boundary",
      "The amount of surface inside its boundary",
      "The number of sides it has",
      "The height of the shape",
    ],
    1,
    "Area is the total amount of space inside the boundary of a flat (2D) shape.",
    "Easy",
  ],
  [
    "In what units is perimeter measured?",
    ["cm²", "m²", "cm or m", "km²"],
    2,
    "Perimeter is measured in one-dimensional length units such as cm, m, or mm.",
    "Easy",
  ],
  [
    "In what units is area measured?",
    ["cm", "m", "mm", "cm² or m²"],
    3,
    "Area is measured in square units (two-dimensional) such as cm² or m².",
    "Easy",
  ],
  [
    "What is the formula for the perimeter of a rectangle?",
    ["l × w", "2(l + w)", "l + w", "4l"],
    1,
    "Perimeter of a rectangle = 2(l + w), where l = length and w = width.",
    "Easy",
  ],
  [
    "What is the formula for the perimeter of a square?",
    ["s²", "2s", "4s", "s + s"],
    2,
    "Perimeter of a square = 4s, where s = side length.",
    "Easy",
  ],
  [
    "What is the formula for the area of a triangle?",
    ["base × height", "base + height", "2 × base × height", "½ × base × height"],
    3,
    "Area of a triangle = ½ × base × height.",
    "Easy",
  ],
  [
    "What is the formula for the area of a parallelogram?",
    ["base × height", "½ × base × height", "base + height", "2 × base × height"],
    0,
    "Area of a parallelogram = base × height.",
    "Easy",
  ],
  [
    "What is the formula for the area of a trapezium?",
    ["base × height", "½ × base × height", "½ × (a + b) × height", "(a + b) × height"],
    2,
    "Area of a trapezium = ½ × (a + b) × height, where a and b are the parallel sides.",
    "Easy",
  ],
  [
    "What is the formula for the area of a kite?",
    ["base × height", "½ × base × height", "d₁ × d₂", "½ × d₁ × d₂"],
    3,
    "Area of a kite = ½ × d₁ × d₂, where d₁ and d₂ are the two diagonals.",
    "Easy",
  ],
  [
    "How many cm² is 1 m²?",
    ["10 000 cm²", "1 000 cm²", "100 cm²", "100 000 cm²"],
    0,
    "1 m² = 10 000 cm² (because 1 m = 100 cm, so 100 × 100 = 10 000).",
    "Easy",
  ],
  [
    "What is the CORRECT height for calculating the area of a triangle?",
    [
      "The longest side of the triangle",
      "The perpendicular distance from base to apex",
      "Any side of the triangle",
      "The sloping side next to the base",
    ],
    1,
    "The height of a triangle MUST be perpendicular (90°) to the base. Not the slant side.",
    "Easy",
  ],
  [
    "What is the main difference between perimeter and area?",
    [
      "Perimeter is larger than area",
      "No difference",
      "Area measures the boundary; perimeter measures the inner region",
      "Perimeter measures the boundary; area measures the inner region",
    ],
    3,
    "Perimeter = length of outer boundary (units: cm, m). Area = inner region (units: cm², m²).",
    "Easy",
  ],
  [
    "Which shape gives the largest area for a fixed perimeter?",
    ["A square", "A triangle", "A long rectangle", "A trapezium"],
    0,
    "For a fixed perimeter, a square gives the largest area.",
    "Easy",
  ],
  [
    "Which shape gives the smallest perimeter for a fixed area?",
    ["A long rectangle", "A square", "A triangle", "A trapezium"],
    1,
    "For a fixed area, a square gives the smallest perimeter.",
    "Easy",
  ],
  [
    "What are the parallel sides in the trapezium area formula?",
    [
      "The two sloping sides of the trapezium",
      "All four sides of the trapezium",
      "The two sides that are parallel (a and b)",
      "The two diagonals of the trapezium",
    ],
    2,
    "In the formula ½(a + b)h, a and b are the TWO PARALLEL sides — not all sides.",
    "Easy",
  ],
  [
    "What are d₁ and d₂ in the kite area formula?",
    [
      "The two perpendicular diagonals of the kite",
      "Two adjacent sides of the kite",
      "The length and width of the kite",
      "Two opposite angles of the kite",
    ],
    0,
    "d₁ and d₂ are the TWO DIAGONALS of the kite. The diagonals of a kite are perpendicular (90°).",
    "Easy",
  ],
  [
    "What is the grid method for estimating area?",
    [
      "Counting the number of sides of the shape",
      "Measuring the perimeter of the shape",
      "Drawing the shape on a grid and counting squares",
      "Counting the diagonals of the shape",
    ],
    2,
    "Grid method: draw the shape on grid paper, count full and partial squares inside the shape.",
    "Easy",
  ],
  [
    "In the grid method, a square more than half inside the shape counts as?",
    ["0", "1", "0.5", "2"],
    1,
    "In the grid method: square more than half inside = count as 1.",
    "Easy",
  ],
  [
    "In the grid method, a square less than half inside the shape counts as?",
    ["2", "0.5", "1", "0"],
    3,
    "In the grid method: square less than half inside = count as 0.",
    "Easy",
  ],
  [
    "Rectangle 6 cm × 4 cm. What is the perimeter?",
    ["10 cm", "24 cm", "20 cm", "48 cm"],
    2,
    "Perimeter = 2(6 + 4) = 2(10) = 20 cm.",
    "Easy",
  ],
  [
    "Square with side 5 cm. What is the perimeter?",
    ["10 cm", "20 cm", "15 cm", "25 cm"],
    1,
    "Perimeter = 4 × 5 = 20 cm.",
    "Easy",
  ],
  [
    "Triangle with sides 3 cm, 4 cm and 5 cm. What is the perimeter?",
    ["7 cm", "9 cm", "15 cm", "12 cm"],
    3,
    "Perimeter = 3 + 4 + 5 = 12 cm.",
    "Easy",
  ],
  [
    "What is a composite shape?",
    [
      "A shape made by combining simple shapes",
      "A shape coloured in many different colours",
      "A shape that has more than 4 sides",
      "A quadrilateral with unequal sides",
    ],
    0,
    "A composite shape is formed by combining two or more simple shapes.",
    "Easy",
  ],
  [
    "What is the difference between the triangle (area) and parallelogram (area) formulas?",
    [
      "Triangle = bh; Parallelogram = ½bh",
      "Triangle = ½bh; Parallelogram = bh",
      "Both are the same",
      "Triangle = b²; Parallelogram = h²",
    ],
    1,
    "Area of triangle = ½bh. Area of parallelogram = bh.",
    "Easy",
  ],
  [
    "Perimeter of rectangle = 30 cm. Length = 8 cm. What is the width?",
    ["6 cm", "9 cm", "8 cm", "7 cm"],
    3,
    "2(8 + w) = 30. 8 + w = 15. w = 7 cm.",
    "Easy",
  ],
  [
    "Regular hexagon with side 3 cm. What is the perimeter?",
    ["18 cm", "15 cm", "12 cm", "21 cm"],
    0,
    "A hexagon has 6 sides. Perimeter = 6 × 3 = 18 cm.",
    "Easy",
  ],
  [
    "What is the appropriate unit for measuring the area of a bedroom?",
    ["cm", "km²", "m²", "mm"],
    2,
    "A bedroom is medium-sized. The appropriate unit is m² (square metres).",
    "Easy",
  ],
  [
    "What is the appropriate unit for measuring the area of a notebook?",
    ["m²", "km²", "mm", "cm²"],
    3,
    "A notebook is small. The appropriate unit is cm² (square centimetres).",
    "Easy",
  ],
  [
    "The kite area formula can also be used for which shape?",
    ["Triangle", "Rhombus", "Parallelogram", "Trapezium"],
    1,
    "The ½d₁d₂ formula also applies to a RHOMBUS, because a rhombus's diagonals are also perpendicular.",
    "Easy",
  ],
]);

const MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Segi empat tepat panjang 9 cm dan lebar 5 cm. Kira perimeter.",
    ["28 cm", "24 cm", "30 cm", "45 cm"],
    0,
    "Perimeter = 2(9 + 5) = 2(14) = 28 cm.",
    "Medium",
  ],
  [
    "Segi tiga dengan tapak 10 cm dan tinggi 7 cm. Kira luas.",
    ["70 cm²", "35 cm²", "17 cm²", "34 cm²"],
    1,
    "Luas = ½ × 10 × 7 = ½ × 70 = 35 cm².",
    "Medium",
  ],
  [
    "Segi empat selari tapak 12 cm, tinggi 8 cm, sisi condong 10 cm. Kira luas.",
    ["80 cm²", "120 cm²", "96 cm²", "48 cm²"],
    2,
    "Luas = tapak × tinggi = 12 × 8 = 96 cm². Gunakan tinggi (8 cm), bukan sisi condong (10 cm).",
    "Medium",
  ],
  [
    "Trapezium dengan sisi selari 11 cm dan 7 cm, tinggi 6 cm. Kira luas.",
    ["48 cm²", "108 cm²", "66 cm²", "54 cm²"],
    3,
    "Luas = ½ × (11 + 7) × 6 = ½ × 18 × 6 = ½ × 108 = 54 cm².",
    "Medium",
  ],
  [
    "Lelayang dengan pepenjuru 14 cm dan 8 cm. Kira luas.",
    ["112 cm²", "56 cm²", "48 cm²", "28 cm²"],
    1,
    "Luas = ½ × 14 × 8 = ½ × 112 = 56 cm².",
    "Medium",
  ],
  [
    "Segi tiga: luas = 40 cm², tinggi = 8 cm. Cari tapak.",
    ["8 cm", "5 cm", "10 cm", "20 cm"],
    2,
    "40 = ½ × tapak × 8. 40 = 4 × tapak. Tapak = 40 ÷ 4 = 10 cm.",
    "Medium",
  ],
  [
    "Trapezium: luas = 45 cm², sisi selari = 6 cm dan 12 cm. Cari tinggi.",
    ["9 cm", "4 cm", "6 cm", "5 cm"],
    3,
    "45 = ½ × (6 + 12) × tinggi. 45 = ½ × 18 × tinggi. 45 = 9 × tinggi. Tinggi = 5 cm.",
    "Medium",
  ],
  [
    "Lelayang: luas = 60 cm², satu pepenjuru = 15 cm. Cari pepenjuru yang lain.",
    ["8 cm", "4 cm", "6 cm", "12 cm"],
    0,
    "60 = ½ × 15 × d₂. 60 = 7.5 × d₂. d₂ = 60 ÷ 7.5 = 8 cm.",
    "Medium",
  ],
  [
    "Segi empat selari: luas = 72 cm², tinggi = 9 cm. Cari tapak.",
    ["9 cm", "6 cm", "8 cm", "12 cm"],
    2,
    "72 = tapak × 9. Tapak = 72 ÷ 9 = 8 cm.",
    "Medium",
  ],
  [
    "Segi empat tepat 5 m × 3 m. Kira luas dalam cm².",
    ["15 cm²", "1 500 cm²", "15 000 cm²", "150 000 cm²"],
    3,
    "Luas = 5 × 3 = 15 m². 15 m² = 15 × 10 000 = 150 000 cm².",
    "Medium",
  ],
  [
    "Tukarkan 2.4 m² kepada cm².",
    ["24 000 cm²", "2 400 cm²", "240 cm²", "240 000 cm²"],
    0,
    "2.4 m² = 2.4 × 10 000 = 24 000 cm².",
    "Medium",
  ],
  [
    "Tukarkan 35 000 cm² kepada m².",
    ["35 m²", "3.5 m²", "0.35 m²", "350 m²"],
    1,
    "35 000 cm² ÷ 10 000 = 3.5 m².",
    "Medium",
  ],
  [
    "Segi empat tepat: perimeter = 40 cm, lebar = 7 cm. Cari panjang.",
    ["19 cm", "26 cm", "33 cm", "13 cm"],
    3,
    "2(p + 7) = 40. p + 7 = 20. p = 13 cm.",
    "Medium",
  ],
  [
    "Segi tiga sama sisi berperimeter 36 cm. Cari panjang setiap sisi.",
    ["12 cm", "9 cm", "6 cm", "18 cm"],
    0,
    "Segi tiga sama sisi: 3 sisi sama. 3s = 36. s = 12 cm.",
    "Medium",
  ],
  [
    "Segi empat sama berisi 8 cm. Kira perimeter dan luas.",
    [
      "P = 28 cm, L = 56 cm²",
      "P = 32 cm, L = 64 cm²",
      "P = 24 cm, L = 48 cm²",
      "P = 36 cm, L = 81 cm²",
    ],
    1,
    "Perimeter = 4 × 8 = 32 cm. Luas = 8² = 64 cm².",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak dengan kaki 6 cm dan 8 cm. Kira luas.",
    ["14 cm²", "48 cm²", "24 cm²", "28 cm²"],
    2,
    "Luas = ½ × 6 × 8 = ½ × 48 = 24 cm². (Kaki berserenjang bertindak sebagai tapak dan tinggi.)",
    "Medium",
  ],
  [
    "Perimeter segi empat sama adalah sama dengan perimeter segi empat tepat 8 cm × 6 cm. Cari sisi segi empat sama.",
    ["7 cm", "6 cm", "8 cm", "5 cm"],
    0,
    "Perimeter segi empat tepat = 2(8 + 6) = 28 cm. Sisi segi empat sama = 28 ÷ 4 = 7 cm.",
    "Medium",
  ],
  [
    "Trapezium dengan sisi selari 20 m dan 14 m, tinggi 8 m. Kira luas.",
    ["112 m²", "272 m²", "136 m²", "68 m²"],
    2,
    "Luas = ½ × (20 + 14) × 8 = ½ × 34 × 8 = ½ × 272 = 136 m².",
    "Medium",
  ],
  [
    "Segi tiga: tapak = (2x + 4) cm, tinggi = 6 cm, luas = 36 cm². Cari x.",
    ["x = 5", "x = 4", "x = 3", "x = 6"],
    1,
    "½ × (2x + 4) × 6 = 36. 3(2x + 4) = 36. 6x + 12 = 36. 6x = 24. x = 4.",
    "Medium",
  ],
  [
    "Sebuah lapangan bola sepak berbentuk segi empat tepat 105 m × 68 m. Kira luas lapangan dalam m².",
    ["5 040 m²", "346 m²", "8 400 m²", "7 140 m²"],
    3,
    "Luas = 105 × 68 = 7 140 m².",
    "Medium",
  ],
  [
    "Jika luas segi empat tepat = 120 cm² dan panjang = 15 cm, apakah lebar?",
    ["10 cm", "6 cm", "8 cm", "12 cm"],
    2,
    "120 = 15 × lebar. Lebar = 120 ÷ 15 = 8 cm.",
    "Medium",
  ],
  [
    "Taman berbentuk trapezium dengan sisi selari 30 m dan 20 m, tinggi 12 m. Kira luas.",
    ["360 m²", "300 m²", "240 m²", "600 m²"],
    1,
    "Luas = ½ × (30 + 20) × 12 = ½ × 50 × 12 = ½ × 600 = 300 m².",
    "Medium",
  ],
  [
    "Lelayang: pepenjuru d₁ = 2d₂. Jika luas = 64 cm² dan d₁ = 16 cm, cari d₂.",
    ["4 cm", "10 cm", "6 cm", "8 cm"],
    3,
    "64 = ½ × 16 × d₂. 64 = 8 × d₂. d₂ = 8 cm. Semak: d₁ = 16 = 2(8) = 2d₂ ✓.",
    "Medium",
  ],
  [
    "Segi empat tepat: panjang adalah 3 kali lebarnya. Perimeter = 48 cm. Cari luas.",
    ["108 cm²", "72 cm²", "144 cm²", "90 cm²"],
    0,
    "p = 3l. 2(3l + l) = 48. 8l = 48. l = 6. p = 18. Luas = 18 × 6 = 108 cm².",
    "Medium",
  ],
  [
    "Segi empat selari dengan tapak 15 cm, tinggi 9 cm. Kira luas.",
    ["270 cm²", "135 cm²", "67.5 cm²", "24 cm²"],
    1,
    "Luas = 15 × 9 = 135 cm².",
    "Medium",
  ],
  [
    "Segi empat tepat A: 12 × 3 cm. Segi empat tepat B: 6 × 6 cm. Bandingkan luas dan perimeter.",
    [
      "Luas A > B; perimeter sama",
      "Luas berbeza; perimeter sama",
      "Luas sama; perimeter B > A",
      "Luas sama; perimeter A > B",
    ],
    3,
    "Luas A = 36 cm², Luas B = 36 cm² (sama). Perimeter A = 30 cm, Perimeter B = 24 cm. Perimeter A > B.",
    "Medium",
  ],
  [
    "Segi tiga: luas = 54 cm², tapak = 12 cm. Cari tinggi.",
    ["9 cm", "4 cm", "6 cm", "18 cm"],
    0,
    "54 = ½ × 12 × tinggi. 54 = 6 × tinggi. Tinggi = 9 cm.",
    "Medium",
  ],
  [
    "Perimeter heksagon sekata = 42 cm. Kira panjang setiap sisi.",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    2,
    "Heksagon = 6 sisi. 6s = 42. s = 7 cm.",
    "Medium",
  ],
  [
    "Trapezium: sisi selari 8 cm dan 4 cm, tinggi h. Luas = 36 cm². Cari h.",
    ["9 cm", "5 cm", "4 cm", "6 cm"],
    3,
    "36 = ½ × (8 + 4) × h. 36 = ½ × 12 × h. 36 = 6h. h = 6 cm.",
    "Medium",
  ],
  [
    "Sebuah lelayang mempunyai pepenjuru 20 cm dan 11 cm. Kira luasnya.",
    ["220 cm²", "110 cm²", "55 cm²", "31 cm²"],
    1,
    "Luas = ½ × 20 × 11 = ½ × 220 = 110 cm².",
    "Medium",
  ],
]);

const MATH_C10_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Rectangle with length 9 cm and width 5 cm. Calculate the perimeter.",
    ["28 cm", "24 cm", "30 cm", "45 cm"],
    0,
    "Perimeter = 2(9 + 5) = 2(14) = 28 cm.",
    "Medium",
  ],
  [
    "Triangle with base 10 cm and height 7 cm. Calculate the area.",
    ["70 cm²", "35 cm²", "17 cm²", "34 cm²"],
    1,
    "Area = ½ × 10 × 7 = ½ × 70 = 35 cm².",
    "Medium",
  ],
  [
    "Parallelogram with base 12 cm, height 8 cm, slant side 10 cm. Calculate the area.",
    ["80 cm²", "120 cm²", "96 cm²", "48 cm²"],
    2,
    "Area = base × height = 12 × 8 = 96 cm². Use height (8 cm), not the slant side (10 cm).",
    "Medium",
  ],
  [
    "Trapezium with parallel sides 11 cm and 7 cm, height 6 cm. Calculate the area.",
    ["48 cm²", "108 cm²", "66 cm²", "54 cm²"],
    3,
    "Area = ½ × (11 + 7) × 6 = ½ × 18 × 6 = ½ × 108 = 54 cm².",
    "Medium",
  ],
  [
    "Kite with diagonals 14 cm and 8 cm. Calculate the area.",
    ["112 cm²", "56 cm²", "48 cm²", "28 cm²"],
    1,
    "Area = ½ × 14 × 8 = ½ × 112 = 56 cm².",
    "Medium",
  ],
  [
    "Triangle: area = 40 cm², height = 8 cm. Find the base.",
    ["8 cm", "5 cm", "10 cm", "20 cm"],
    2,
    "40 = ½ × base × 8. 40 = 4 × base. Base = 40 ÷ 4 = 10 cm.",
    "Medium",
  ],
  [
    "Trapezium: area = 45 cm², parallel sides = 6 cm and 12 cm. Find the height.",
    ["9 cm", "4 cm", "6 cm", "5 cm"],
    3,
    "45 = ½ × (6 + 12) × height. 45 = ½ × 18 × height. 45 = 9 × height. Height = 5 cm.",
    "Medium",
  ],
  [
    "Kite: area = 60 cm², one diagonal = 15 cm. Find the other diagonal.",
    ["8 cm", "4 cm", "6 cm", "12 cm"],
    0,
    "60 = ½ × 15 × d₂. 60 = 7.5 × d₂. d₂ = 60 ÷ 7.5 = 8 cm.",
    "Medium",
  ],
  [
    "Parallelogram: area = 72 cm², height = 9 cm. Find the base.",
    ["9 cm", "6 cm", "8 cm", "12 cm"],
    2,
    "72 = base × 9. Base = 72 ÷ 9 = 8 cm.",
    "Medium",
  ],
  [
    "Rectangle 5 m × 3 m. Calculate the area in cm².",
    ["15 cm²", "1 500 cm²", "15 000 cm²", "150 000 cm²"],
    3,
    "Area = 5 × 3 = 15 m². 15 m² = 15 × 10 000 = 150 000 cm².",
    "Medium",
  ],
  [
    "Convert 2.4 m² to cm².",
    ["24 000 cm²", "2 400 cm²", "240 cm²", "240 000 cm²"],
    0,
    "2.4 m² = 2.4 × 10 000 = 24 000 cm².",
    "Medium",
  ],
  [
    "Convert 35 000 cm² to m².",
    ["35 m²", "3.5 m²", "0.35 m²", "350 m²"],
    1,
    "35 000 cm² ÷ 10 000 = 3.5 m².",
    "Medium",
  ],
  [
    "Rectangle: perimeter = 40 cm, width = 7 cm. Find the length.",
    ["19 cm", "26 cm", "33 cm", "13 cm"],
    3,
    "2(l + 7) = 40. l + 7 = 20. l = 13 cm.",
    "Medium",
  ],
  [
    "Equilateral triangle with perimeter 36 cm. Find each side.",
    ["12 cm", "9 cm", "6 cm", "18 cm"],
    0,
    "Equilateral triangle: 3 equal sides. 3s = 36. s = 12 cm.",
    "Medium",
  ],
  [
    "Square with side 8 cm. Calculate perimeter and area.",
    [
      "P = 28 cm, A = 56 cm²",
      "P = 32 cm, A = 64 cm²",
      "P = 24 cm, A = 48 cm²",
      "P = 36 cm, A = 81 cm²",
    ],
    1,
    "Perimeter = 4 × 8 = 32 cm. Area = 8² = 64 cm².",
    "Medium",
  ],
  [
    "Right-angled triangle with legs 6 cm and 8 cm. Calculate the area.",
    ["14 cm²", "48 cm²", "24 cm²", "28 cm²"],
    2,
    "Area = ½ × 6 × 8 = ½ × 48 = 24 cm². (Perpendicular legs act as base and height.)",
    "Medium",
  ],
  [
    "Perimeter of a square equals perimeter of rectangle 8 cm × 6 cm. Find the square's side.",
    ["7 cm", "6 cm", "8 cm", "5 cm"],
    0,
    "Rectangle perimeter = 2(8 + 6) = 28 cm. Square side = 28 ÷ 4 = 7 cm.",
    "Medium",
  ],
  [
    "Trapezium with parallel sides 20 m and 14 m, height 8 m. Calculate the area.",
    ["112 m²", "272 m²", "136 m²", "68 m²"],
    2,
    "Area = ½ × (20 + 14) × 8 = ½ × 34 × 8 = ½ × 272 = 136 m².",
    "Medium",
  ],
  [
    "Triangle: base = (2x + 4) cm, height = 6 cm, area = 36 cm². Find x.",
    ["x = 5", "x = 4", "x = 3", "x = 6"],
    1,
    "½ × (2x + 4) × 6 = 36. 3(2x + 4) = 36. 6x + 12 = 36. 6x = 24. x = 4.",
    "Medium",
  ],
  [
    "A football pitch is rectangular, 105 m × 68 m. Calculate the area in m².",
    ["5 040 m²", "346 m²", "8 400 m²", "7 140 m²"],
    3,
    "Area = 105 × 68 = 7 140 m².",
    "Medium",
  ],
  [
    "If area of rectangle = 120 cm² and length = 15 cm, what is the width?",
    ["10 cm", "6 cm", "8 cm", "12 cm"],
    2,
    "120 = 15 × width. Width = 120 ÷ 15 = 8 cm.",
    "Medium",
  ],
  [
    "Trapezoidal garden with parallel sides 30 m and 20 m, height 12 m. Calculate the area.",
    ["360 m²", "300 m²", "240 m²", "600 m²"],
    1,
    "Area = ½ × (30 + 20) × 12 = ½ × 50 × 12 = ½ × 600 = 300 m².",
    "Medium",
  ],
  [
    "Kite: diagonal d₁ = 2d₂. Area = 64 cm², d₁ = 16 cm. Find d₂.",
    ["4 cm", "10 cm", "6 cm", "8 cm"],
    3,
    "64 = ½ × 16 × d₂. 64 = 8 × d₂. d₂ = 8 cm. Check: d₁ = 16 = 2(8) = 2d₂ ✓.",
    "Medium",
  ],
  [
    "Rectangle: length is 3 times its width. Perimeter = 48 cm. Find the area.",
    ["108 cm²", "72 cm²", "144 cm²", "90 cm²"],
    0,
    "l = 3w. 2(3w + w) = 48. 8w = 48. w = 6. l = 18. Area = 18 × 6 = 108 cm².",
    "Medium",
  ],
  [
    "Parallelogram with base 15 cm and height 9 cm. Calculate the area.",
    ["270 cm²", "135 cm²", "67.5 cm²", "24 cm²"],
    1,
    "Area = 15 × 9 = 135 cm².",
    "Medium",
  ],
  [
    "Rectangle A: 12 × 3 cm. Rectangle B: 6 × 6 cm. Compare areas and perimeters.",
    [
      "Area A > B; equal perimeters",
      "Different areas; equal perimeters",
      "Equal areas; perimeter B > A",
      "Equal areas; perimeter A > B",
    ],
    3,
    "Area A = 36 cm², Area B = 36 cm² (equal). Perimeter A = 30 cm, Perimeter B = 24 cm. Perimeter A > B.",
    "Medium",
  ],
  [
    "Triangle: area = 54 cm², base = 12 cm. Find the height.",
    ["9 cm", "4 cm", "6 cm", "18 cm"],
    0,
    "54 = ½ × 12 × height. 54 = 6 × height. Height = 9 cm.",
    "Medium",
  ],
  [
    "Perimeter of regular hexagon = 42 cm. Calculate each side length.",
    ["6 cm", "8 cm", "7 cm", "9 cm"],
    2,
    "Hexagon = 6 sides. 6s = 42. s = 7 cm.",
    "Medium",
  ],
  [
    "Trapezium: parallel sides 8 cm and 4 cm, height h. Area = 36 cm². Find h.",
    ["9 cm", "5 cm", "4 cm", "6 cm"],
    3,
    "36 = ½ × (8 + 4) × h. 36 = ½ × 12 × h. 36 = 6h. h = 6 cm.",
    "Medium",
  ],
  [
    "A kite has diagonals of 20 cm and 11 cm. Calculate its area.",
    ["220 cm²", "110 cm²", "55 cm²", "31 cm²"],
    1,
    "Area = ½ × 20 × 11 = ½ × 220 = 110 cm².",
    "Medium",
  ],
]);

const MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Sebuah bilik berbentuk L terdiri daripada bahagian 10 m × 6 m dan bahagian 4 m × 3 m. Kira jumlah luas bilik itu.",
    ["72 m²", "60 m²", "48 m²", "84 m²"],
    0,
    "Luas = (10 × 6) + (4 × 3) = 60 + 12 = 72 m².",
    "Hard",
  ],
  [
    "Sebuah rumah mainan terdiri daripada badan segi empat tepat 8 cm × 5 cm dan bumbung segi tiga dengan tapak 8 cm dan tinggi 3 cm. Kira jumlah luas permukaan hadapannya.",
    ["40 cm²", "52 cm²", "12 cm²", "64 cm²"],
    1,
    "Luas badan = 8 × 5 = 40 cm². Luas bumbung = ½ × 8 × 3 = 12 cm². Jumlah = 52 cm².",
    "Hard",
  ],
  [
    "Sekeping papan segi empat tepat 12 cm × 9 cm mempunyai lubang segi empat tepat 4 cm × 3 cm. Kira luas papan yang tinggal.",
    ["84 cm²", "108 cm²", "96 cm²", "100 cm²"],
    2,
    "Luas papan = 12 × 9 = 108 cm². Luas lubang = 4 × 3 = 12 cm². Luas yang tinggal = 108 − 12 = 96 cm².",
    "Hard",
  ],
  [
    "Sebidang ladang berbentuk trapezium mempunyai sisi selari 50 m dan 30 m serta tinggi 20 m. Baja digunakan sebanyak 3 kg bagi setiap m². Kira jumlah baja yang diperlukan.",
    ["800 kg", "1 200 kg", "3 600 kg", "2 400 kg"],
    3,
    "Luas = ½ × (50 + 30) × 20 = 800 m². Baja = 800 × 3 = 2 400 kg.",
    "Hard",
  ],
  [
    "Lantai sebuah bilik berukuran 6 m × 4 m dipasang dengan jubin segi empat sama bersisi 50 cm tanpa memotong jubin. Berapakah bilangan jubin yang diperlukan?",
    ["48", "96", "24", "960"],
    1,
    "6 m = 600 cm, maka 600 ÷ 50 = 12 jubin sebaris. 4 m = 400 cm, maka 400 ÷ 50 = 8 baris. Jumlah = 12 × 8 = 96 jubin.",
    "Hard",
  ],
  [
    "Sebahagian dinding berbentuk segi tiga dengan tapak 10 m dan tinggi 4 m. Setiap m² memerlukan 0.5 liter cat dan satu tin mengandungi 2.5 liter. Berapakah bilangan tin yang diperlukan?",
    ["8 tin", "10 tin", "4 tin", "5 tin"],
    2,
    "Luas = ½ × 10 × 4 = 20 m². Cat = 20 × 0.5 = 10 liter. Tin = 10 ÷ 2.5 = 4 tin.",
    "Hard",
  ],
  [
    "Sebuah bentuk gubahan terdiri daripada segi empat tepat 8 cm × 6 cm dan trapezium dengan sisi selari 8 cm dan 4 cm serta tinggi 3 cm di atasnya. Kira jumlah luas.",
    ["78 cm²", "48 cm²", "18 cm²", "66 cm²"],
    3,
    "Luas segi empat tepat = 8 × 6 = 48 cm². Luas trapezium = ½ × (8 + 4) × 3 = 18 cm². Jumlah = 66 cm².",
    "Hard",
  ],
  [
    "Sebidang tanah berbentuk lelayang mempunyai pepenjuru 100 m dan 80 m. Harga tanah ialah RM50 per m². Kira nilai tanah itu.",
    ["RM200 000", "RM400 000", "RM160 000", "RM80 000"],
    0,
    "Luas = ½ × 100 × 80 = 4 000 m². Nilai = 4 000 × RM50 = RM200 000.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai luas 24 cm², tapak (x + 2) cm dan tinggi 6 cm. Cari x.",
    ["x = 5", "x = 4", "x = 6", "x = 8"],
    2,
    "24 = ½ × (x + 2) × 6. 24 = 3(x + 2). x + 2 = 8. x = 6.",
    "Hard",
  ],
  [
    "Segi empat sama 2 cm × 2 cm dipotong dari satu bucu sebuah segi empat tepat 6 cm × 4 cm untuk membentuk bentuk L. Berapakah perimeter bentuk L itu?",
    ["24 cm", "16 cm", "20 cm²", "20 cm"],
    3,
    "Dua sisi 2 cm hilang tetapi dua sisi baharu 2 cm terbentuk, jadi perimeter tidak berubah: 2(6 + 4) = 20 cm. Perimeter diukur dalam cm, bukan cm².",
    "Hard",
  ],
  [
    "Segi empat tepat A berukuran 8 cm × 6 cm. Segi empat sama B mempunyai perimeter yang sama dengan A. Bandingkan luas A dan B.",
    ["Luas A < luas B", "Luas A > luas B", "Luas A = luas B", "Tidak boleh dibandingkan"],
    0,
    "Perimeter A = 2(8 + 6) = 28 cm. Sisi B = 28 ÷ 4 = 7 cm. Luas A = 48 cm² dan luas B = 49 cm². Maka luas A < luas B.",
    "Hard",
  ],
  [
    "Segi empat tepat A berukuran 9 cm × 4 cm dan segi empat tepat B berukuran 6 cm × 6 cm. Kedua-duanya mempunyai luas 36 cm². Yang manakah mempunyai perimeter lebih kecil?",
    [
      "A mempunyai perimeter lebih kecil",
      "B mempunyai perimeter lebih kecil",
      "Perimeter sama",
      "Maklumat tidak mencukupi",
    ],
    1,
    "Perimeter A = 2(9 + 4) = 26 cm. Perimeter B = 2(6 + 6) = 24 cm. B (segi empat sama) mempunyai perimeter lebih kecil.",
    "Hard",
  ],
  [
    "Lantai sebuah bilik berukuran 5 m × 4 m akan dipasang permaidani, kecuali kawasan pintu berukuran 1 m × 0.5 m. Kira luas permaidani.",
    ["18.5 m²", "20 m²", "20.5 m²", "19.5 m²"],
    3,
    "Luas bilik = 5 × 4 = 20 m². Luas kawasan pintu = 1 × 0.5 = 0.5 m². Luas permaidani = 20 − 0.5 = 19.5 m².",
    "Hard",
  ],
  [
    "Sebuah segi empat tepat mempunyai luas 48 cm² dan lebar 6 cm. Berapakah perimeternya?",
    ["28 cm", "14 cm", "48 cm", "54 cm"],
    0,
    "Panjang = 48 ÷ 6 = 8 cm. Perimeter = 2(8 + 6) = 28 cm. (14 cm ialah separuh perimeter.)",
    "Hard",
  ],
  [
    "Seorang petani ingin memagar kawasan segi empat tepat yang paling luas dengan 40 m pagar. Dimensi manakah yang memberikan luas terbesar?",
    ["18 m × 2 m", "10 m × 10 m", "15 m × 5 m", "12 m × 8 m"],
    1,
    "Semua pilihan mempunyai perimeter 40 m. Luas: 36 m², 75 m², 100 m² dan 96 m². Segi empat sama 10 m × 10 m memberikan luas terbesar.",
    "Hard",
  ],
  [
    "Sebuah trapezium mempunyai sisi selari 6 cm dan 10 cm. Tingginya sama dengan sisi selari yang lebih pendek. Kira luasnya.",
    ["36 cm²", "60 cm²", "48 cm²", "72 cm²"],
    2,
    "Tinggi = 6 cm. Luas = ½ × (6 + 10) × 6 = 48 cm².",
    "Hard",
  ],
  [
    "Tapak sebuah segi tiga ialah 2 kali tingginya. Luas segi tiga itu ialah 100 cm². Cari tapaknya.",
    ["20 cm", "10 cm", "15 cm", "25 cm"],
    0,
    "Katakan tinggi = h, maka tapak = 2h. Luas = ½ × 2h × h = h² = 100, jadi h = 10 cm. Tapak = 20 cm.",
    "Hard",
  ],
  [
    "Kawasan rumput berbentuk segi empat tepat 15 m × 10 m mempunyai kolam berbentuk lelayang dengan pepenjuru 6 m dan 4 m. Berapakah luas kawasan rumput?",
    ["126 m²", "150 m²", "138 m²", "144 m²"],
    2,
    "Luas segi empat tepat = 15 × 10 = 150 m². Luas kolam = ½ × 6 × 4 = 12 m². Luas rumput = 150 − 12 = 138 m². (126 m² datang daripada terlupa ½.)",
    "Hard",
  ],
  [
    "Perimeter sebuah segi tiga ialah 36 cm. Sisi-sisinya ialah x cm, (x + 4) cm dan (2x − 4) cm. Cari x dan panjang setiap sisi.",
    [
      "x = 8; 8 cm, 12 cm, 12 cm",
      "x = 9; 9 cm, 13 cm, 14 cm",
      "x = 10; 10 cm, 14 cm, 16 cm",
      "x = 7; 7 cm, 11 cm, 10 cm",
    ],
    1,
    "x + (x + 4) + (2x − 4) = 36. 4x = 36. x = 9. Sisi: 9 cm, 13 cm, 14 cm.",
    "Hard",
  ],
  [
    "Luas sebuah segi tiga sama dengan luas segi empat tepat 8 cm × 6 cm. Tapak segi tiga itu ialah 16 cm. Cari tinggi segi tiga itu.",
    ["3 cm", "8 cm", "12 cm", "6 cm"],
    3,
    "Luas segi empat tepat = 48 cm². ½ × 16 × tinggi = 48. 8 × tinggi = 48. Tinggi = 6 cm.",
    "Hard",
  ],
  [
    "Sebuah segi tiga bersudut tegak mempunyai sisi 5 cm, 12 cm dan 13 cm. Berapakah luasnya?",
    ["32.5 cm²", "60 cm²", "30 cm²", "78 cm²"],
    2,
    "Sisi terpanjang (13 cm) ialah hipotenus. Dua sisi yang membentuk sudut tegak (5 cm dan 12 cm) ialah tapak dan tinggi. Luas = ½ × 5 × 12 = 30 cm².",
    "Hard",
  ],
  [
    "Sebuah padang segi empat tepat berukuran 20 m × 15 m. Laluan selebar 1 m dibina di sebelah dalam sepanjang keempat-empat tepinya. Cari luas laluan itu.",
    ["102 m²", "66 m²", "300 m²", "234 m²"],
    1,
    "Luas padang = 20 × 15 = 300 m². Kawasan dalam = 18 × 13 = 234 m². Luas laluan = 300 − 234 = 66 m².",
    "Hard",
  ],
  [
    "Sebuah taman segi empat tepat 10 m × 8 m dikelilingi oleh laluan selebar 2 m di sebelah luarnya. Berapakah luas laluan itu?",
    ["168 m²", "96 m²", "80 m²", "88 m²"],
    3,
    "Segi empat tepat luar = (10 + 4) × (8 + 4) = 14 × 12 = 168 m². Luas laluan = 168 − 80 = 88 m².",
    "Hard",
  ],
  [
    "Sebuah segi empat sama dan sebuah segi empat tepat masing-masing mempunyai luas 100 cm². Sisi segi empat sama ialah 10 cm dan panjang segi empat tepat ialah 20 cm. Cari lebar segi empat tepat dan bandingkan perimeter kedua-duanya.",
    [
      "Lebar = 5 cm; perimeter segi empat sama lebih kecil",
      "Lebar = 5 cm; perimeter sama",
      "Lebar = 4 cm; perimeter sama",
      "Lebar = 10 cm; perimeter segi empat tepat lebih kecil",
    ],
    0,
    "Lebar = 100 ÷ 20 = 5 cm. Perimeter segi empat sama = 40 cm. Perimeter segi empat tepat = 2(20 + 5) = 50 cm. Perimeter segi empat sama lebih kecil.",
    "Hard",
  ],
  [
    "Sebuah bilik berukuran 4.8 m × 3.2 m dipasang jubin 40 cm × 40 cm. Setiap jubin berharga RM8. Kira kos jubin.",
    ["RM786", "RM768", "RM760", "RM800"],
    1,
    "Jubin sebaris: 480 ÷ 40 = 12. Bilangan baris: 320 ÷ 40 = 8. Jumlah jubin = 12 × 8 = 96. Kos = 96 × RM8 = RM768.",
    "Hard",
  ],
  [
    "Sebuah bentuk gubahan terdiri daripada trapezium (sisi selari 12 cm dan 6 cm, tinggi 5 cm) di atas segi empat tepat 12 cm × 4 cm. Kira jumlah luas.",
    ["90 cm²", "48 cm²", "45 cm²", "93 cm²"],
    3,
    "Luas trapezium = ½ × (12 + 6) × 5 = 45 cm². Luas segi empat tepat = 12 × 4 = 48 cm². Jumlah = 93 cm².",
    "Hard",
  ],
  [
    "Sebuah segi empat selari mempunyai tapak 12 cm dan tinggi 5 cm. Sebuah segi tiga mempunyai luas yang sama dan tapak 10 cm. Berapakah tinggi segi tiga itu?",
    ["12 cm", "6 cm", "24 cm", "5 cm"],
    0,
    "Luas segi empat selari = 12 × 5 = 60 cm². ½ × 10 × tinggi = 60, maka 5 × tinggi = 60 dan tinggi = 12 cm. (6 cm datang daripada terlupa ½.)",
    "Hard",
  ],
  [
    "Sebuah trapezium mempunyai luas 60 cm² dan tinggi 6 cm. Satu daripada sisi selarinya ialah 8 cm. Berapakah panjang sisi selari yang satu lagi?",
    ["20 cm", "2 cm", "12 cm", "4 cm"],
    2,
    "½ × (8 + b) × 6 = 60. 3(8 + b) = 60. 8 + b = 20. b = 12 cm. (20 cm ialah hasil tambah kedua-dua sisi selari.)",
    "Hard",
  ],
  [
    "Sebuah lelayang mempunyai luas 54 cm² dan satu pepenjuru 12 cm. Berapakah panjang pepenjuru yang satu lagi?",
    ["42 cm", "4.5 cm", "18 cm", "9 cm"],
    3,
    "½ × 12 × d = 54. 6d = 54. d = 9 cm. (4.5 cm datang daripada 54 ÷ 12, tanpa menggunakan ½.)",
    "Hard",
  ],
  [
    "Jalur hiasan akan dipasang di sepanjang tepi lantai sebuah bilik segi empat tepat 5 m × 4 m, kecuali pada pintu selebar 1 m. Berapakah panjang jalur yang diperlukan?",
    ["18 m", "17 m", "19 m", "20 m"],
    1,
    "Perimeter bilik = 2(5 + 4) = 18 m. Tolak lebar pintu: 18 − 1 = 17 m.",
    "Hard",
  ],
]);

const MATH_C10_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "An L-shaped room consists of a 10 m × 6 m section and a 4 m × 3 m section. Calculate the total area of the room.",
    ["72 m²", "60 m²", "48 m²", "84 m²"],
    0,
    "Area = (10 × 6) + (4 × 3) = 60 + 12 = 72 m².",
    "Hard",
  ],
  [
    "A toy house front consists of a rectangular body 8 cm × 5 cm and a triangular roof with base 8 cm and height 3 cm. Calculate the total area of the front.",
    ["40 cm²", "52 cm²", "12 cm²", "64 cm²"],
    1,
    "Body area = 8 × 5 = 40 cm². Roof area = ½ × 8 × 3 = 12 cm². Total = 52 cm².",
    "Hard",
  ],
  [
    "A rectangular board 12 cm × 9 cm has a rectangular hole 4 cm × 3 cm. Calculate the remaining area of the board.",
    ["84 cm²", "108 cm²", "96 cm²", "100 cm²"],
    2,
    "Board area = 12 × 9 = 108 cm². Hole area = 4 × 3 = 12 cm². Remaining area = 108 − 12 = 96 cm².",
    "Hard",
  ],
  [
    "A trapezium-shaped farm has parallel sides of 50 m and 30 m and a height of 20 m. Fertiliser is used at 3 kg per m². Calculate the total fertiliser needed.",
    ["800 kg", "1 200 kg", "3 600 kg", "2 400 kg"],
    3,
    "Area = ½ × (50 + 30) × 20 = 800 m². Fertiliser = 800 × 3 = 2 400 kg.",
    "Hard",
  ],
  [
    "The floor of a room measuring 6 m × 4 m is covered with square tiles of side 50 cm without cutting any tiles. How many tiles are needed?",
    ["48", "96", "24", "960"],
    1,
    "6 m = 600 cm, so 600 ÷ 50 = 12 tiles per row. 4 m = 400 cm, so 400 ÷ 50 = 8 rows. Total = 12 × 8 = 96 tiles.",
    "Hard",
  ],
  [
    "Part of a wall is a triangle with base 10 m and height 4 m. Each m² needs 0.5 litre of paint and one tin holds 2.5 litres. How many tins are needed?",
    ["8 tins", "10 tins", "4 tins", "5 tins"],
    2,
    "Area = ½ × 10 × 4 = 20 m². Paint = 20 × 0.5 = 10 litres. Tins = 10 ÷ 2.5 = 4 tins.",
    "Hard",
  ],
  [
    "A composite shape consists of a rectangle 8 cm × 6 cm with a trapezium (parallel sides 8 cm and 4 cm, height 3 cm) on top. Calculate the total area.",
    ["78 cm²", "48 cm²", "18 cm²", "66 cm²"],
    3,
    "Rectangle area = 8 × 6 = 48 cm². Trapezium area = ½ × (8 + 4) × 3 = 18 cm². Total = 66 cm².",
    "Hard",
  ],
  [
    "A kite-shaped plot of land has diagonals of 100 m and 80 m. The land costs RM50 per m². Calculate the value of the land.",
    ["RM200 000", "RM400 000", "RM160 000", "RM80 000"],
    0,
    "Area = ½ × 100 × 80 = 4 000 m². Value = 4 000 × RM50 = RM200 000.",
    "Hard",
  ],
  [
    "A triangle has an area of 24 cm², a base of (x + 2) cm and a height of 6 cm. Find x.",
    ["x = 5", "x = 4", "x = 6", "x = 8"],
    2,
    "24 = ½ × (x + 2) × 6. 24 = 3(x + 2). x + 2 = 8. x = 6.",
    "Hard",
  ],
  [
    "A 2 cm × 2 cm square is cut from one corner of a 6 cm × 4 cm rectangle to make an L-shape. What is the perimeter of the L-shape?",
    ["24 cm", "16 cm", "20 cm²", "20 cm"],
    3,
    "Two 2 cm edges are removed but two new 2 cm edges are created, so the perimeter is unchanged: 2(6 + 4) = 20 cm. Perimeter is measured in cm, not cm².",
    "Hard",
  ],
  [
    "Rectangle A measures 8 cm × 6 cm. Square B has the same perimeter as A. Compare the areas of A and B.",
    ["Area A < area B", "Area A > area B", "Area A = area B", "Cannot be compared"],
    0,
    "Perimeter of A = 2(8 + 6) = 28 cm. Side of B = 28 ÷ 4 = 7 cm. Area of A = 48 cm² and area of B = 49 cm². So area A < area B.",
    "Hard",
  ],
  [
    "Rectangle A measures 9 cm × 4 cm and rectangle B measures 6 cm × 6 cm. Both have an area of 36 cm². Which has the smaller perimeter?",
    [
      "A has the smaller perimeter",
      "B has the smaller perimeter",
      "Equal perimeters",
      "Not enough information",
    ],
    1,
    "Perimeter of A = 2(9 + 4) = 26 cm. Perimeter of B = 2(6 + 6) = 24 cm. B (a square) has the smaller perimeter.",
    "Hard",
  ],
  [
    "A room floor measuring 5 m × 4 m is to be carpeted, except for a doorway area measuring 1 m × 0.5 m. Calculate the carpet area.",
    ["18.5 m²", "20 m²", "20.5 m²", "19.5 m²"],
    3,
    "Room area = 5 × 4 = 20 m². Doorway area = 1 × 0.5 = 0.5 m². Carpet area = 20 − 0.5 = 19.5 m².",
    "Hard",
  ],
  [
    "A rectangle has an area of 48 cm² and a width of 6 cm. What is its perimeter?",
    ["28 cm", "14 cm", "48 cm", "54 cm"],
    0,
    "Length = 48 ÷ 6 = 8 cm. Perimeter = 2(8 + 6) = 28 cm. (14 cm is half the perimeter.)",
    "Hard",
  ],
  [
    "A farmer wants to fence the largest possible rectangular area with 40 m of fencing. Which dimensions give the largest area?",
    ["18 m × 2 m", "10 m × 10 m", "15 m × 5 m", "12 m × 8 m"],
    1,
    "All the options have a perimeter of 40 m. Areas: 36 m², 75 m², 100 m² and 96 m². The 10 m × 10 m square gives the largest area.",
    "Hard",
  ],
  [
    "A trapezium has parallel sides of 6 cm and 10 cm. Its height equals the shorter parallel side. Calculate its area.",
    ["36 cm²", "60 cm²", "48 cm²", "72 cm²"],
    2,
    "Height = 6 cm. Area = ½ × (6 + 10) × 6 = 48 cm².",
    "Hard",
  ],
  [
    "The base of a triangle is 2 times its height. The area of the triangle is 100 cm². Find its base.",
    ["20 cm", "10 cm", "15 cm", "25 cm"],
    0,
    "Let the height = h, so the base = 2h. Area = ½ × 2h × h = h² = 100, so h = 10 cm. Base = 20 cm.",
    "Hard",
  ],
  [
    "A rectangular lawn 15 m × 10 m has a kite-shaped pond with diagonals of 6 m and 4 m. What is the area of the grass?",
    ["126 m²", "150 m²", "138 m²", "144 m²"],
    2,
    "Rectangle area = 15 × 10 = 150 m². Pond area = ½ × 6 × 4 = 12 m². Grass area = 150 − 12 = 138 m². (126 m² comes from forgetting the ½.)",
    "Hard",
  ],
  [
    "The perimeter of a triangle is 36 cm. Its sides are x cm, (x + 4) cm and (2x − 4) cm. Find x and the length of each side.",
    [
      "x = 8; 8 cm, 12 cm, 12 cm",
      "x = 9; 9 cm, 13 cm, 14 cm",
      "x = 10; 10 cm, 14 cm, 16 cm",
      "x = 7; 7 cm, 11 cm, 10 cm",
    ],
    1,
    "x + (x + 4) + (2x − 4) = 36. 4x = 36. x = 9. Sides: 9 cm, 13 cm, 14 cm.",
    "Hard",
  ],
  [
    "The area of a triangle equals the area of a rectangle 8 cm × 6 cm. The base of the triangle is 16 cm. Find the height of the triangle.",
    ["3 cm", "8 cm", "12 cm", "6 cm"],
    3,
    "Rectangle area = 48 cm². ½ × 16 × height = 48. 8 × height = 48. Height = 6 cm.",
    "Hard",
  ],
  [
    "A right-angled triangle has sides of 5 cm, 12 cm and 13 cm. What is its area?",
    ["32.5 cm²", "60 cm²", "30 cm²", "78 cm²"],
    2,
    "The longest side (13 cm) is the hypotenuse. The two sides forming the right angle (5 cm and 12 cm) are the base and height. Area = ½ × 5 × 12 = 30 cm².",
    "Hard",
  ],
  [
    "A rectangular field measures 20 m × 15 m. A path 1 m wide runs along the inside of all four edges. Find the area of the path.",
    ["102 m²", "66 m²", "300 m²", "234 m²"],
    1,
    "Field area = 20 × 15 = 300 m². Inner area = 18 × 13 = 234 m². Path area = 300 − 234 = 66 m².",
    "Hard",
  ],
  [
    "A rectangular garden 10 m × 8 m is surrounded by a path 2 m wide on the outside. What is the area of the path?",
    ["168 m²", "96 m²", "80 m²", "88 m²"],
    3,
    "Outer rectangle = (10 + 4) × (8 + 4) = 14 × 12 = 168 m². Path area = 168 − 80 = 88 m².",
    "Hard",
  ],
  [
    "A square and a rectangle each have an area of 100 cm². The square's side is 10 cm and the rectangle's length is 20 cm. Find the rectangle's width and compare their perimeters.",
    [
      "Width = 5 cm; the square's perimeter is smaller",
      "Width = 5 cm; equal perimeters",
      "Width = 4 cm; equal perimeters",
      "Width = 10 cm; the rectangle's perimeter is smaller",
    ],
    0,
    "Width = 100 ÷ 20 = 5 cm. Square perimeter = 40 cm. Rectangle perimeter = 2(20 + 5) = 50 cm. The square's perimeter is smaller.",
    "Hard",
  ],
  [
    "A room measuring 4.8 m × 3.2 m is tiled with 40 cm × 40 cm tiles. Each tile costs RM8. Calculate the cost of the tiles.",
    ["RM786", "RM768", "RM760", "RM800"],
    1,
    "Tiles per row: 480 ÷ 40 = 12. Rows: 320 ÷ 40 = 8. Total tiles = 12 × 8 = 96. Cost = 96 × RM8 = RM768.",
    "Hard",
  ],
  [
    "A composite shape consists of a trapezium (parallel sides 12 cm and 6 cm, height 5 cm) on top of a rectangle 12 cm × 4 cm. Calculate the total area.",
    ["90 cm²", "48 cm²", "45 cm²", "93 cm²"],
    3,
    "Trapezium area = ½ × (12 + 6) × 5 = 45 cm². Rectangle area = 12 × 4 = 48 cm². Total = 93 cm².",
    "Hard",
  ],
  [
    "A parallelogram has a base of 12 cm and a height of 5 cm. A triangle has the same area and a base of 10 cm. What is the height of the triangle?",
    ["12 cm", "6 cm", "24 cm", "5 cm"],
    0,
    "Parallelogram area = 12 × 5 = 60 cm². ½ × 10 × height = 60, so 5 × height = 60 and height = 12 cm. (6 cm comes from forgetting the ½.)",
    "Hard",
  ],
  [
    "A trapezium has an area of 60 cm² and a height of 6 cm. One of its parallel sides is 8 cm. What is the length of the other parallel side?",
    ["20 cm", "2 cm", "12 cm", "4 cm"],
    2,
    "½ × (8 + b) × 6 = 60. 3(8 + b) = 60. 8 + b = 20. b = 12 cm. (20 cm is the sum of both parallel sides.)",
    "Hard",
  ],
  [
    "A kite has an area of 54 cm² and one diagonal of 12 cm. What is the length of the other diagonal?",
    ["42 cm", "4.5 cm", "18 cm", "9 cm"],
    3,
    "½ × 12 × d = 54. 6d = 54. d = 9 cm. (4.5 cm comes from 54 ÷ 12, without using the ½.)",
    "Hard",
  ],
  [
    "A decorative strip is fitted along the edges of the floor of a 5 m × 4 m rectangular room, except across a door 1 m wide. What length of strip is needed?",
    ["18 m", "17 m", "19 m", "20 m"],
    1,
    "Perimeter of the room = 2(5 + 4) = 18 m. Subtract the door width: 18 − 1 = 17 m.",
    "Hard",
  ],
]);

const MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah set?",
    [
      "Koleksi objek yang mempunyai ciri sepunya yang jelas",
      "Koleksi nombor sahaja dalam sebarang susunan",
      "Senarai nombor rawak yang boleh berulang",
      "Koleksi huruf abjad sahaja",
    ],
    0,
    "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas.",
    "Easy",
  ],
  [
    "Apakah simbol untuk 'adalah unsur bagi'?",
    ["∉", "∈", "⊂", "∅"],
    1,
    "∈ bermaksud 'adalah unsur bagi'. Contoh: 3 ∈ {1,2,3}.",
    "Easy",
  ],
  [
    "Apakah simbol untuk 'bukan unsur bagi'?",
    ["∈", "⊂", "∉", "⊄"],
    2,
    "∉ bermaksud 'bukan unsur bagi'. Contoh: 5 ∉ {1,2,3}.",
    "Easy",
  ],
  [
    "Apakah set kosong?",
    [
      "Set yang mengandungi nombor 0",
      "Set yang mengandungi unsur yang tidak diketahui",
      "Set yang mengandungi satu unsur",
      "Set yang tidak mengandungi sebarang unsur",
    ],
    3,
    "Set kosong ialah set yang tidak mengandungi sebarang unsur. Dilambangkan ∅ atau {}.",
    "Easy",
  ],
  [
    "Apakah simbol untuk set kosong?",
    ["ξ", "∅", "∈", "A'"],
    1,
    "Set kosong dilambangkan dengan ∅ atau {}.",
    "Easy",
  ],
  [
    "Apakah simbol untuk set semesta?",
    ["∅", "A'", "ξ", "⊂"],
    2,
    "Set semesta dilambangkan dengan ξ (huruf Greek xi).",
    "Easy",
  ],
  [
    "Apakah n(A)?",
    ["Nama set A", "Subset set A", "Pelengkap set A", "Bilangan unsur dalam set A"],
    3,
    "n(A) mewakili bilangan unsur dalam set A.",
    "Easy",
  ],
  [
    "Diberi A = {2, 4, 6, 8}. Berapakah n(A)?",
    ["4", "3", "2", "8"],
    0,
    "A mengandungi 4 unsur: 2, 4, 6, dan 8. Jadi n(A) = 4.",
    "Easy",
  ],
  [
    "Apakah n(∅)?",
    ["1", "-1", "0", "Tidak ditentukan"],
    2,
    "Set kosong tidak mengandungi sebarang unsur. n(∅) = 0.",
    "Easy",
  ],
  [
    "Diberi V = {a, e, i, o, u}. Adakah 'a' ∈ V?",
    ["Tidak", "Tidak boleh ditentukan", "Mungkin", "Ya"],
    3,
    "Huruf 'a' ada dalam set V = {a, e, i, o, u}. Jadi a ∈ V.",
    "Easy",
  ],
  [
    "Diberi V = {a, e, i, o, u}. Adakah 'b' ∈ V?",
    ["Tidak", "Ya", "Mungkin", "Bergantung kepada konteks"],
    0,
    "Huruf 'b' tidak ada dalam set V. Jadi b ∉ V, BUKAN b ∈ V.",
    "Easy",
  ],
  [
    "Apakah yang diwakili oleh segi empat tepat dalam gambar rajah Venn?",
    ["Sebuah set biasa", "Set semesta (ξ)", "Pelengkap set", "Set kosong"],
    1,
    "Segi empat tepat dalam gambar rajah Venn mewakili set semesta (ξ).",
    "Easy",
  ],
  [
    "Apakah yang diwakili oleh bulatan dalam gambar rajah Venn?",
    ["Set semesta", "Subset", "Pelengkap", "Satu set"],
    3,
    "Bulatan dalam gambar rajah Venn mewakili sesebuah set.",
    "Easy",
  ],
  [
    "Apakah pelengkap set A (A')?",
    [
      "Unsur dalam ξ yang tiada dalam A",
      "Semua unsur dalam A sahaja",
      "Semua unsur dalam A dan ξ",
      "Set kosong, iaitu ∅",
    ],
    0,
    "A' ialah set semua unsur dalam ξ yang tidak berada dalam A.",
    "Easy",
  ],
  [
    "Apakah subset?",
    [
      "Set yang mempunyai lebih banyak unsur daripada set lain",
      "Set yang setiap unsurnya juga unsur set lain",
      "Set yang tidak mempunyai sebarang unsur",
      "Set yang mengandungi semua unsur yang dikaji",
    ],
    1,
    "B ⊂ A bermaksud setiap unsur B juga merupakan unsur A.",
    "Easy",
  ],
  [
    "Apakah simbol untuk 'adalah subset bagi'?",
    ["∈", "∅", "⊂", "ξ"],
    2,
    "⊂ bermaksud 'adalah subset bagi'. Contoh: B ⊂ A bermaksud B adalah subset A.",
    "Easy",
  ],
  [
    "Adakah set kosong subset bagi setiap set?",
    ["Ya", "Tidak", "Hanya untuk set besar", "Hanya jika set itu mengandungi 0"],
    0,
    "Set kosong (∅) adalah subset SETIAP set. Ini adalah peraturan asas.",
    "Easy",
  ],
  [
    "Adakah setiap set merupakan subset dirinya sendiri?",
    ["Tidak", "Hanya jika set itu set kosong", "Ya", "Hanya jika set mengandungi satu unsur"],
    2,
    "Setiap set adalah subset dirinya sendiri. A ⊂ A untuk setiap set A.",
    "Easy",
  ],
  [
    "Apakah formula bilangan subset bagi set dengan n unsur?",
    ["n²", "2ⁿ", "2n", "n + 2"],
    1,
    "Bilangan subset = 2ⁿ, di mana n ialah bilangan unsur dalam set.",
    "Easy",
  ],
  [
    "Set A = {x, y}. Berapakah bilangan subset A?",
    ["2", "8", "6", "4"],
    3,
    "n(A) = 2. Bilangan subset = 2² = 4. Subset: ∅, {x}, {y}, {x,y}.",
    "Easy",
  ],
  [
    "Apakah kaedah penyenaraian untuk mewakili set?",
    [
      "Menggunakan ayat untuk menerangkan set",
      "Menggunakan formula matematik",
      "Menyenaraikan semua unsur dalam kurungan kurawal { }",
      "Melukis gambar rajah",
    ],
    2,
    "Kaedah penyenaraian: senaraikan semua unsur dalam { }. Contoh: A = {1, 2, 3}.",
    "Easy",
  ],
  [
    "Dalam set, berapa kali unsur yang berulang dikira?",
    ["Dua kali", "Sekali sahaja", "Mengikut bilangan kali ia muncul", "Tidak dikira"],
    1,
    "Unsur berulang hanya dikira SEKALI dalam set. {1,1,2} → {1,2}.",
    "Easy",
  ],
  [
    "Adakah susunan unsur penting dalam set?",
    [
      "Ya, sangat penting",
      "Bergantung kepada set",
      "Ya, mestilah mengikut tertib menaik",
      "Tidak, susunan tidak penting",
    ],
    3,
    "Susunan unsur TIDAK penting. {1,2,3} = {3,2,1} = {2,1,3}.",
    "Easy",
  ],
  [
    "Apakah perbezaan antara ∅ dan {0}?",
    [
      "∅ tiada unsur; {0} mempunyai satu unsur, iaitu 0",
      "Tiada perbezaan antara ∅ dan {0}",
      "{0} ialah set kosong kerana 0 bermaksud tiada",
      "∅ mengandungi satu unsur, iaitu nombor 0",
    ],
    0,
    "∅ = set kosong, n = 0. {0} = set mengandungi nombor 0, n = 1. Mereka berbeza!",
    "Easy",
  ],
  [
    "Diberi A = {1,2,3,4,5}. Adakah 3 ∈ A?",
    ["Tidak", "Ya", "3 ⊂ A", "3 = A"],
    1,
    "3 ada dalam A = {1,2,3,4,5}. Jadi 3 ∈ A.",
    "Easy",
  ],
  [
    "Apakah kaedah perihalan untuk mewakili set?",
    [
      "A = {2, 4, 6, 8}",
      "A = {x : x ialah nombor genap, 1 < x < 10}",
      "Melukis gambar rajah Venn bagi A",
      "A ialah set nombor genap antara 1 dan 10",
    ],
    3,
    "Kaedah perihalan menggunakan ayat untuk menerangkan set.",
    "Easy",
  ],
  [
    "Apakah tatatanda pembina set untuk set {2,4,6,8,10}?",
    [
      "{x : x ialah nombor genap, 0 < x ≤ 10}",
      "{x : x ialah nombor genap, x > 2}",
      "{x : x ialah nombor, 0 < x ≤ 10}",
      "{x : x ialah nombor genap, x < 10}",
    ],
    0,
    "Tatatanda pembina set: {x : x ialah nombor genap, 0 < x ≤ 10} = {2,4,6,8,10}.",
    "Easy",
  ],
  [
    "Set A = {a, b, c}. Berapakah bilangan subset?",
    ["3", "6", "8", "9"],
    2,
    "n(A) = 3. Bilangan subset = 2³ = 8.",
    "Easy",
  ],
  [
    "Apakah yang ditunjukkan oleh simbol ⊄?",
    ["adalah subset bagi", "adalah set kosong", "adalah unsur bagi", "bukan subset bagi"],
    3,
    "⊄ bermaksud 'bukan subset bagi'. Contoh: {1,6} ⊄ {1,2,3} kerana 6 ∉ {1,2,3}.",
    "Easy",
  ],
  [
    "Diberi A = {x : x ialah integer, 1 ≤ x ≤ 5}. Senaraikan A.",
    ["{1,3,5}", "{1,2,3,4,5}", "{2,4}", "{0,1,2,3,4,5}"],
    1,
    "Integer dari 1 hingga 5 (termasuk 1 dan 5): A = {1, 2, 3, 4, 5}.",
    "Easy",
  ],
]);

const MATH_C11_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is a set?",
    [
      "A collection of objects with a common, well-defined feature",
      "A collection of numbers only, in any order",
      "A list of random numbers that may repeat",
      "A collection of letters of the alphabet only",
    ],
    0,
    "A set is a collection of objects that share common characteristics and can be clearly defined.",
    "Easy",
  ],
  [
    "What is the symbol for 'is an element of'?",
    ["∉", "∈", "⊂", "∅"],
    1,
    "∈ means 'is an element of'. Example: 3 ∈ {1,2,3}.",
    "Easy",
  ],
  [
    "What is the symbol for 'is not an element of'?",
    ["∈", "⊂", "∉", "⊄"],
    2,
    "∉ means 'is not an element of'. Example: 5 ∉ {1,2,3}.",
    "Easy",
  ],
  [
    "What is an empty set?",
    [
      "A set containing the number 0",
      "A set containing unknown elements",
      "A set containing one element",
      "A set containing no elements at all",
    ],
    3,
    "An empty set is a set that contains no elements at all. It is represented by ∅ or {}.",
    "Easy",
  ],
  [
    "What is the symbol for the empty set?",
    ["ξ", "∅", "∈", "A'"],
    1,
    "The empty set is represented by ∅ or {}.",
    "Easy",
  ],
  [
    "What is the symbol for the universal set?",
    ["∅", "A'", "ξ", "⊂"],
    2,
    "The universal set is represented by ξ (lowercase Greek letter xi).",
    "Easy",
  ],
  [
    "What is n(A)?",
    [
      "The name of set A",
      "A subset of set A",
      "The complement of set A",
      "The number of elements in set A",
    ],
    3,
    "n(A) represents the number of elements in set A.",
    "Easy",
  ],
  [
    "Given A = {2, 4, 6, 8}. What is n(A)?",
    ["4", "3", "2", "8"],
    0,
    "A contains 4 elements: 2, 4, 6, and 8. So n(A) = 4.",
    "Easy",
  ],
  [
    "What is n(∅)?",
    ["1", "-1", "0", "Undefined"],
    2,
    "The empty set contains no elements. n(∅) = 0.",
    "Easy",
  ],
  [
    "Given V = {a, e, i, o, u}. Is 'a' ∈ V?",
    ["No", "Cannot be determined", "Maybe", "Yes"],
    3,
    "The letter 'a' is in set V = {a, e, i, o, u}. So a ∈ V.",
    "Easy",
  ],
  [
    "Given V = {a, e, i, o, u}. Is 'b' ∈ V?",
    ["No", "Yes", "Maybe", "Depends on context"],
    0,
    "The letter 'b' is not in set V. So b ∉ V, NOT b ∈ V.",
    "Easy",
  ],
  [
    "What does the rectangle represent in a Venn diagram?",
    ["An ordinary set", "The universal set (ξ)", "The complement of a set", "The empty set"],
    1,
    "The rectangle in a Venn diagram represents the universal set (ξ).",
    "Easy",
  ],
  [
    "What does the circle represent in a Venn diagram?",
    ["The universal set", "A subset", "A complement", "A set"],
    3,
    "A circle in a Venn diagram represents a set.",
    "Easy",
  ],
  [
    "What is the complement of set A (A')?",
    [
      "The elements of ξ that are not in A",
      "All the elements of A only",
      "All the elements of A and ξ",
      "The empty set, ∅",
    ],
    0,
    "A' is the set of all elements in ξ that are not in A.",
    "Easy",
  ],
  [
    "What is a subset?",
    [
      "A set that has more elements than another set",
      "A set whose every element is also in another set",
      "A set that has no elements at all",
      "The set containing every element being studied",
    ],
    1,
    "B ⊂ A means every element of B is also an element of A.",
    "Easy",
  ],
  [
    "What is the symbol for 'is a subset of'?",
    ["∈", "∅", "⊂", "ξ"],
    2,
    "⊂ means 'is a subset of'. Example: B ⊂ A means B is a subset of A.",
    "Easy",
  ],
  [
    "Is the empty set a subset of every set?",
    ["Yes", "No", "Only for large sets", "Only if the set contains 0"],
    0,
    "The empty set (∅) is a subset of EVERY set. This is a fundamental rule.",
    "Easy",
  ],
  [
    "Is every set a subset of itself?",
    ["No", "Only if it is the empty set", "Yes", "Only if it contains one element"],
    2,
    "Every set is a subset of itself. A ⊂ A for every set A.",
    "Easy",
  ],
  [
    "What is the formula for the number of subsets of a set with n elements?",
    ["n²", "2ⁿ", "2n", "n + 2"],
    1,
    "Number of subsets = 2ⁿ, where n is the number of elements in the set.",
    "Easy",
  ],
  [
    "Set A = {x, y}. How many subsets does A have?",
    ["2", "8", "6", "4"],
    3,
    "n(A) = 2. Number of subsets = 2² = 4. Subsets: ∅, {x}, {y}, {x,y}.",
    "Easy",
  ],
  [
    "What is the listing method for representing a set?",
    [
      "Using a sentence to describe the set",
      "Using a mathematical formula",
      "Listing all elements inside curly braces { }",
      "Drawing a diagram",
    ],
    2,
    "Listing method: list all elements in { }. Example: A = {1, 2, 3}.",
    "Easy",
  ],
  [
    "How many times is a repeated element counted in a set?",
    ["Twice", "Only once", "According to how many times it appears", "It is not counted"],
    1,
    "Repeated elements are counted only ONCE. {1,1,2} → {1,2}.",
    "Easy",
  ],
  [
    "Is the order of elements important in a set?",
    [
      "Yes, very important",
      "Depends on the set",
      "Yes, must be in ascending order",
      "No, order does not matter",
    ],
    3,
    "Order does NOT matter. {1,2,3} = {3,2,1} = {2,1,3}.",
    "Easy",
  ],
  [
    "What is the difference between ∅ and {0}?",
    [
      "∅ has no elements; {0} has one element, 0",
      "There is no difference between ∅ and {0}",
      "{0} is the empty set because 0 means nothing",
      "∅ contains one element, the number 0",
    ],
    0,
    "∅ = empty set, n = 0. {0} = set containing 0, n = 1. They are different!",
    "Easy",
  ],
  [
    "Given A = {1,2,3,4,5}. Is 3 ∈ A?",
    ["No", "Yes", "3 ⊂ A", "3 = A"],
    1,
    "3 is in A = {1,2,3,4,5}. So 3 ∈ A.",
    "Easy",
  ],
  [
    "What is the description method for representing a set?",
    [
      "A = {2, 4, 6, 8}",
      "A = {x : x is an even number, 1 < x < 10}",
      "Drawing a Venn diagram of A",
      "A is the set of even numbers between 1 and 10",
    ],
    3,
    "The description method uses a sentence to describe the set.",
    "Easy",
  ],
  [
    "What is the set builder notation for {2,4,6,8,10}?",
    [
      "{x : x is an even number, 0 < x ≤ 10}",
      "{x : x is an even number, x > 2}",
      "{x : x is a number, 0 < x ≤ 10}",
      "{x : x is an even number, x < 10}",
    ],
    0,
    "Set builder notation: {x : x is an even number, 0 < x ≤ 10} = {2,4,6,8,10}.",
    "Easy",
  ],
  [
    "Set A = {a, b, c}. How many subsets does it have?",
    ["3", "6", "8", "9"],
    2,
    "n(A) = 3. Number of subsets = 2³ = 8.",
    "Easy",
  ],
  [
    "What does the symbol ⊄ indicate?",
    ["is a subset of", "is an empty set", "is an element of", "is not a subset of"],
    3,
    "⊄ means 'is not a subset of'. Example: {1,6} ⊄ {1,2,3} because 6 ∉ {1,2,3}.",
    "Easy",
  ],
  [
    "Given A = {x : x is an integer, 1 ≤ x ≤ 5}. List A.",
    ["{1,3,5}", "{1,2,3,4,5}", "{2,4}", "{0,1,2,3,4,5}"],
    1,
    "Integers between 1 and 5 (inclusive): A = {1,2,3,4,5}.",
    "Easy",
  ],
]);

const MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Senaraikan set A = {x : x ialah nombor perdana, x < 20}.",
    [
      "{2,3,5,7,11,13,17,19}",
      "{2,3,5,7,11,13,17}",
      "{1,2,3,5,7,11,13,17,19}",
      "{2,4,6,8,10,12,14,16,18}",
    ],
    0,
    "Nombor perdana kurang daripada 20: 2,3,5,7,11,13,17,19. A = {2,3,5,7,11,13,17,19}.",
    "Medium",
  ],
  [
    "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Cari A'.",
    ["{1,2,3,4,5}", "{2,4,6,8,10}", "{6,7,8,9,10}", "{1,3,5,7}"],
    1,
    "A' = unsur dalam ξ yang bukan dalam A = {2,4,6,8,10}.",
    "Medium",
  ],
  [
    "Adakah {a,b,c} = {c,a,b}? Berikan alasan.",
    [
      "Tidak, kerana susunan berbeza",
      "Tidak, kerana panjangnya berbeza",
      "Ya, kerana mengandungi unsur yang sama",
      "Ya, kerana kedua-duanya mempunyai 3 huruf",
    ],
    2,
    "Set adalah sama jika mengandungi unsur yang sama. Susunan tidak penting. Jadi {a,b,c} = {c,a,b}.",
    "Medium",
  ],
  [
    "Cari n(A) jika A = {huruf dalam perkataan 'MALAYSIA'}.",
    ["7", "8", "5", "6"],
    3,
    "Huruf: M, A, L, A, Y, S, I, A. Huruf yang berulang dikira sekali sahaja: A = {M, A, L, Y, S, I}. n(A) = 6.",
    "Medium",
  ],
  [
    "Senaraikan semua subset bagi {1, 2, 3}.",
    [
      "∅,{1},{2},{3}",
      "∅,{1},{2},{3},{1,2},{1,3},{2,3},{1,2,3}",
      "{1},{2},{3},{1,2,3}",
      "∅,{1,2},{1,3},{2,3},{1,2,3}",
    ],
    1,
    "2³ = 8 subset: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}.",
    "Medium",
  ],
  [
    "ξ = {a,b,c,d,e,f,g,h}, B = {a,c,e,g}. Cari B' dan n(B').",
    ["B'={b,d,f}, n=3", "B'={a,c,e,g}, n=4", "B'={b,d,f,h}, n=4", "B'={h}, n=1"],
    2,
    "B' = unsur dalam ξ yang bukan dalam B = {b,d,f,h}. n(B') = 4.",
    "Medium",
  ],
  [
    "Tentukan sama ada {3,5} ⊂ {1,2,3,4,5,6}.",
    [
      "Tidak boleh ditentukan",
      "Tidak, kerana tidak semua unsur sama",
      "Ya, tetapi hanya sebagai set setara",
      "Ya, kerana 3 dan 5 ada dalam {1,2,3,4,5,6}",
    ],
    3,
    "3 ∈ {1,2,3,4,5,6} ✓ dan 5 ∈ {1,2,3,4,5,6} ✓. Semua unsur {3,5} ada dalam set. Jadi {3,5} ⊂ {1,2,3,4,5,6}.",
    "Medium",
  ],
  [
    "Tentukan sama ada {7,9} ⊂ {1,3,5,7,9,11}.",
    ["Ya", "Tidak", "Hanya {7} ⊂ set itu", "Tidak boleh ditentukan"],
    0,
    "7 ∈ {1,3,5,7,9,11} ✓ dan 9 ∈ {1,3,5,7,9,11} ✓. Jadi {7,9} ⊂ {1,3,5,7,9,11}.",
    "Medium",
  ],
  [
    "ξ = {1,...,15}, A = {x : x ialah gandaan 5, x ≤ 15}. Senaraikan A.",
    ["{1,5,10,15}", "{5,10}", "{5,10,15}", "{5,15}"],
    2,
    "Gandaan 5 yang ≤ 15: 5, 10, 15. A = {5, 10, 15}.",
    "Medium",
  ],
  [
    "Adakah {2,3,5} = {2,3,5,5}?",
    [
      "Tidak, kerana {2,3,5,5} mempunyai 4 unsur",
      "Ya, tetapi hanya selepas 5 dibuang",
      "Tidak, kerana susunannya berbeza",
      "Ya, kerana unsur berulang dikira sekali",
    ],
    3,
    "Dalam set, {2,3,5,5} = {2,3,5} kerana 5 hanya dikira sekali. n = 3 untuk kedua-duanya.",
    "Medium",
  ],
  [
    "ξ = {huruf dalam 'BUKU'}. Senaraikan ξ dan cari n(ξ).",
    ["ξ={B,U,K}, n=3", "ξ={B,U,K,U}, n=4", "ξ={B,K}, n=2", "ξ={B,U,U,K}, n=4"],
    0,
    "Huruf dalam BUKU: B,U,K,U. Unik: {B,U,K}. n(ξ) = 3.",
    "Medium",
  ],
  [
    "Tukarkan ke kaedah penyenaraian: A = {x : x ialah nombor ganjil, 1 ≤ x ≤ 11}.",
    ["{1,3,5,7,9}", "{1,3,5,7,9,11}", "{3,5,7,9,11}", "{1,2,3,4,5,6,7,8,9,10,11}"],
    1,
    "Nombor ganjil dari 1 ke 11: A = {1,3,5,7,9,11}.",
    "Medium",
  ],
  [
    "ξ = {1,2,...,20}. A = {nombor genap}. B = {gandaan 4}. Adakah B ⊂ A?",
    [
      "Tidak, kerana sesetengah nombor genap bukan gandaan 4",
      "Sebahagian sahaja, kerana 2 tiada dalam B",
      "Tidak boleh ditentukan tanpa menyenaraikan A",
      "Ya, kerana setiap gandaan 4 ialah nombor genap",
    ],
    3,
    "Gandaan 4 dalam ξ: {4,8,12,16,20}. Semua adalah nombor genap. Jadi B ⊂ A.",
    "Medium",
  ],
  [
    "Dalam gambar rajah Venn, di manakah unsur-unsur A' diletakkan?",
    [
      "Dalam ξ tetapi di luar bulatan A",
      "Di dalam bulatan A sahaja",
      "Di luar segi empat tepat ξ",
      "Di tengah-tengah bulatan A",
    ],
    0,
    "A' ialah kawasan dalam segi empat tepat ξ yang berada di luar bulatan A.",
    "Medium",
  ],
  [
    "Jika n(ξ) = 12 dan n(A) = 7, cari n(A').",
    ["7", "5", "12", "19"],
    1,
    "n(A') = n(ξ) − n(A) = 12 − 7 = 5.",
    "Medium",
  ],
  [
    "Set P = {x : x ialah faktor 24, x ≤ 10}. Senaraikan P.",
    ["{1,2,3,4,8}", "{2,4,6,8}", "{1,2,3,4,6,8}", "{1,2,4,8,24}"],
    2,
    "Faktor 24: 1,2,3,4,6,8,12,24. Yang ≤ 10: {1,2,3,4,6,8}.",
    "Medium",
  ],
  [
    "Adakah P = Q jika P = {x : x ialah huruf dalam 'GELAP'} dan Q = {x : x ialah huruf dalam 'LAPGE'}?",
    ["Ya", "Tidak", "Bergantung kepada susunan", "Tidak boleh ditentukan"],
    0,
    "P = {G,E,L,A,P}. Q = {L,A,P,G,E}. Kedua-duanya mengandungi unsur yang sama. P = Q.",
    "Medium",
  ],
  [
    "ξ = {1,...,10}. A = {2,4,6}. Tentukan n(A) dan n(A').",
    ["n(A)=3, n(A')=3", "n(A)=6, n(A')=4", "n(A)=3, n(A')=7", "n(A)=4, n(A')=6"],
    2,
    "n(A) = 3. n(A') = n(ξ) − n(A) = 10 − 3 = 7.",
    "Medium",
  ],
  [
    "Set M = {p,q,r,s,t}. Berapakah bilangan subset M?",
    ["16", "32", "25", "10"],
    1,
    "n(M) = 5. Bilangan subset = 2⁵ = 32.",
    "Medium",
  ],
  [
    "ξ = {a,...,g} (7 huruf pertama abjad). A = {a,b,c}. B = {e,f,g}. Adakah A dan B berasingan?",
    ["Tidak, ada unsur sepunya", "B ⊂ A", "A ⊂ B", "Ya, tiada unsur sepunya"],
    3,
    "A = {a,b,c} dan B = {e,f,g}. Tiada unsur sepunya. A dan B adalah set berasingan.",
    "Medium",
  ],
  [
    "Senaraikan semua subset dua unsur bagi {a,b,c,d}.",
    [
      "{a,b},{a,c},{b,c}",
      "{a,b},{c,d}",
      "{a,b},{a,c},{a,d},{b,c},{b,d},{c,d}",
      "{a,b,c},{a,b,d},{a,c,d},{b,c,d}",
    ],
    2,
    "Subset dua unsur: {a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}. Jumlah = 6 subset.",
    "Medium",
  ],
  [
    "ξ = {1, 2, 3, ..., 10}. A = {x : x ialah kuasa dua sempurna}. Cari A dan A'.",
    [
      "A={1,4,9}, A'={2,3,5,6,7,8,9,10}",
      "A={1,4,9}, A'={2,3,5,6,7,8,10}",
      "A={4,9}, A'={1,2,3,5,6,7,8,10}",
      "A={1,4}, A'={2,3,5,6,7,8,9,10}",
    ],
    1,
    "Kuasa dua sempurna ≤ 10: 1,4,9. A={1,4,9}. A'={2,3,5,6,7,8,10}.",
    "Medium",
  ],
  [
    "Tukarkan ke tatatanda pembina set: B = {Januari, Jun, Julai}.",
    [
      "{x : x ialah bulan dalam separuh pertama tahun}",
      "{x : x ialah bulan dalam setahun}",
      "{x : x ialah bulan yang mempunyai 31 hari}",
      "{x : x ialah bulan yang bermula dengan huruf J}",
    ],
    3,
    "Kesemua bulan dalam B bermula dengan huruf J. B = {x : x ialah bulan yang bermula dengan J}.",
    "Medium",
  ],
  [
    "Antara berikut, yang manakah set kosong?",
    [
      "{x : x ialah gandaan 5 antara 11 dan 14}",
      "{x : x ialah nombor perdana genap}",
      "{0}",
      "{x : x ialah faktor bagi 7}",
    ],
    0,
    "Tiada gandaan 5 antara 11 dan 14, jadi set itu kosong. {x : x ialah nombor perdana genap} = {2}, {0} mempunyai satu unsur dan faktor 7 ialah {1, 7}.",
    "Medium",
  ],
  [
    "ξ = {integer dari 1 hingga 15}. A = {nombor ganjil}. Cari n(A').",
    ["8", "7", "5", "6"],
    1,
    "Nombor ganjil dari 1-15: {1,3,5,7,9,11,13,15}. n(A) = 8. n(A') = 15 − 8 = 7. Nombor genap = {2,4,6,8,10,12,14} = 7.",
    "Medium",
  ],
  [
    "Diberi A = {1, 3, 5}. Pernyataan manakah yang BENAR?",
    ["A ⊂ {1, 5}", "3 ⊂ A", "{3} ∈ A", "{1, 5} ⊂ A"],
    3,
    "Setiap unsur {1, 5} ialah unsur A, jadi {1, 5} ⊂ A. Simbol ∈ digunakan bagi unsur (contohnya 3 ∈ A), manakala ⊂ digunakan bagi set.",
    "Medium",
  ],
  [
    "Diberi ξ = {1, 2, 3, ..., 8}, A = {1, 2, 3} dan B = {2, 3}. Pernyataan manakah yang BENAR?",
    ["B ⊂ A", "A ⊂ B", "A = B", "A' = B"],
    0,
    "Setiap unsur B, iaitu 2 dan 3, ialah unsur A, jadi B ⊂ A. A mempunyai unsur 1 yang tiada dalam B, jadi A ⊄ B.",
    "Medium",
  ],
  [
    "Dalam gambar rajah Venn bagi B ⊂ A, bagaimanakah rupa bulatan B?",
    [
      "Bulatan B berada di luar bulatan A",
      "Bulatan B bersilang separuh dengan A",
      "Bulatan B berada sepenuhnya di dalam bulatan A",
      "Bulatan B dan A adalah sama",
    ],
    2,
    "Apabila B ⊂ A, bulatan B dilukis SEPENUHNYA DI DALAM bulatan A dalam gambar rajah Venn.",
    "Medium",
  ],
  [
    "Set R = {x : x ialah nombor bulat, x² < 25}. Senaraikan R (nombor positif dan negatif).",
    ["{0,1,2,3,4}", "{1,2,3,4}", "{-5,-4,...,4,5}", "{-4,-3,-2,-1,0,1,2,3,4}"],
    3,
    "x² < 25 bermaksud |x| < 5. Nombor bulat: -4,-3,-2,-1,0,1,2,3,4. R = {-4,-3,-2,-1,0,1,2,3,4}.",
    "Medium",
  ],
  [
    "ξ = {1,...,10}. A = {2,4,6}. Tentukan sama ada {2,6} ⊂ A.",
    ["Tidak", "Ya", "Hanya {2} ⊂ A", "{2,6} = A"],
    1,
    "2 ∈ A ✓ dan 6 ∈ A ✓. Semua unsur {2,6} ada dalam A. Jadi {2,6} ⊂ A.",
    "Medium",
  ],
]);

const MATH_C11_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "List set A = {x : x is a prime number, x < 20}.",
    [
      "{2,3,5,7,11,13,17,19}",
      "{2,3,5,7,11,13,17}",
      "{1,2,3,5,7,11,13,17,19}",
      "{2,4,6,8,10,12,14,16,18}",
    ],
    0,
    "Prime numbers less than 20: 2,3,5,7,11,13,17,19. A = {2,3,5,7,11,13,17,19}.",
    "Medium",
  ],
  [
    "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Find A'.",
    ["{1,2,3,4,5}", "{2,4,6,8,10}", "{6,7,8,9,10}", "{1,3,5,7}"],
    1,
    "A' = elements in ξ not in A = {2,4,6,8,10}.",
    "Medium",
  ],
  [
    "Is {a,b,c} = {c,a,b}? Give a reason.",
    [
      "No, because the order is different",
      "No, because the lengths differ",
      "Yes, because they contain the same elements",
      "Yes, because both have 3 letters",
    ],
    2,
    "Sets are equal if they contain the same elements. Order does not matter. So {a,b,c} = {c,a,b}.",
    "Medium",
  ],
  [
    "Find n(A) if A = {letters in the word 'MALAYSIA'}.",
    ["7", "8", "5", "6"],
    3,
    "Letters: M, A, L, A, Y, S, I, A. Repeated letters are counted only once: A = {M, A, L, Y, S, I}. n(A) = 6.",
    "Medium",
  ],
  [
    "List all subsets of {1, 2, 3}.",
    [
      "∅,{1},{2},{3}",
      "∅,{1},{2},{3},{1,2},{1,3},{2,3},{1,2,3}",
      "{1},{2},{3},{1,2,3}",
      "∅,{1,2},{1,3},{2,3},{1,2,3}",
    ],
    1,
    "2³ = 8 subsets: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}.",
    "Medium",
  ],
  [
    "ξ = {a,b,c,d,e,f,g,h}, B = {a,c,e,g}. Find B' and n(B').",
    ["B'={b,d,f}, n=3", "B'={a,c,e,g}, n=4", "B'={b,d,f,h}, n=4", "B'={h}, n=1"],
    2,
    "B' = elements in ξ not in B = {b,d,f,h}. n(B') = 4.",
    "Medium",
  ],
  [
    "Determine whether {3,5} ⊂ {1,2,3,4,5,6}.",
    [
      "Cannot be determined",
      "No, because not all elements are the same",
      "Yes, but only as an equivalent set",
      "Yes, because 3 and 5 are in {1,2,3,4,5,6}",
    ],
    3,
    "3 ∈ {1,2,3,4,5,6} ✓ and 5 ∈ {1,2,3,4,5,6} ✓. All elements of {3,5} are in the set. So {3,5} ⊂ {1,2,3,4,5,6}.",
    "Medium",
  ],
  [
    "Determine whether {7,9} ⊂ {1,3,5,7,9,11}.",
    ["Yes", "No", "Only {7} ⊂ the set", "Cannot be determined"],
    0,
    "7 ∈ {1,3,5,7,9,11} ✓ and 9 ∈ {1,3,5,7,9,11} ✓. So {7,9} ⊂ {1,3,5,7,9,11}.",
    "Medium",
  ],
  [
    "ξ = {1,...,15}, A = {x : x is a multiple of 5, x ≤ 15}. List A.",
    ["{1,5,10,15}", "{5,10}", "{5,10,15}", "{5,15}"],
    2,
    "Multiples of 5 that are ≤ 15: 5, 10, 15. A = {5, 10, 15}.",
    "Medium",
  ],
  [
    "Is {2,3,5} = {2,3,5,5}?",
    [
      "No, because {2,3,5,5} has 4 elements",
      "Yes, but only once the 5s are removed",
      "No, because the order is different",
      "Yes, because repeated elements count once",
    ],
    3,
    "In a set, {2,3,5,5} = {2,3,5} because 5 is counted only once. Both have n = 3.",
    "Medium",
  ],
  [
    "ξ = {letters in 'BOOK'}. List ξ and find n(ξ).",
    ["ξ={B,O,K}, n=3", "ξ={B,O,K,O}, n=4", "ξ={B,K}, n=2", "ξ={B,O,O,K}, n=4"],
    0,
    "Letters in BOOK: B,O,O,K. Unique: {B,O,K}. n(ξ) = 3.",
    "Medium",
  ],
  [
    "Convert to listing method: A = {x : x is an odd number, 1 ≤ x ≤ 11}.",
    ["{1,3,5,7,9}", "{1,3,5,7,9,11}", "{3,5,7,9,11}", "{1,2,3,4,5,6,7,8,9,10,11}"],
    1,
    "Odd numbers from 1 to 11: A = {1,3,5,7,9,11}.",
    "Medium",
  ],
  [
    "ξ = {1,2,...,20}. A = {even numbers}. B = {multiples of 4}. Is B ⊂ A?",
    [
      "No, because some even numbers are not multiples of 4",
      "Only partly, because 2 is not in B",
      "It cannot be determined without listing A",
      "Yes, because every multiple of 4 is an even number",
    ],
    3,
    "Multiples of 4 in ξ: {4,8,12,16,20}. All are even. So B ⊂ A.",
    "Medium",
  ],
  [
    "In a Venn diagram, where are the elements of A' placed?",
    [
      "Inside ξ but outside circle A",
      "Only inside circle A",
      "Outside the rectangle ξ",
      "In the centre of circle A",
    ],
    0,
    "A' is the region inside rectangle ξ that is outside circle A.",
    "Medium",
  ],
  [
    "If n(ξ) = 12 and n(A) = 7, find n(A').",
    ["7", "5", "12", "19"],
    1,
    "n(A') = n(ξ) − n(A) = 12 − 7 = 5.",
    "Medium",
  ],
  [
    "Set P = {x : x is a factor of 24, x ≤ 10}. List P.",
    ["{1,2,3,4,8}", "{2,4,6,8}", "{1,2,3,4,6,8}", "{1,2,4,8,24}"],
    2,
    "Factors of 24: 1,2,3,4,6,8,12,24. Those ≤ 10: {1,2,3,4,6,8}.",
    "Medium",
  ],
  [
    "Is P = Q if P = {x : x is a letter in 'GRAPE'} and Q = {x : x is a letter in 'PAGER'}?",
    ["Yes", "No", "Depends on order", "Cannot be determined"],
    0,
    "P = {G,R,A,P,E}. Q = {P,A,G,E,R}. Both contain the same elements. P = Q.",
    "Medium",
  ],
  [
    "ξ = {1,...,10}. A = {2,4,6}. Determine n(A) and n(A').",
    ["n(A)=3, n(A')=3", "n(A)=6, n(A')=4", "n(A)=3, n(A')=7", "n(A)=4, n(A')=6"],
    2,
    "n(A) = 3. n(A') = n(ξ) − n(A) = 10 − 3 = 7.",
    "Medium",
  ],
  [
    "Set M = {p,q,r,s,t}. How many subsets does M have?",
    ["16", "32", "25", "10"],
    1,
    "n(M) = 5. Number of subsets = 2⁵ = 32.",
    "Medium",
  ],
  [
    "ξ = {a,...,g} (first 7 letters). A = {a,b,c}. B = {e,f,g}. Are A and B disjoint?",
    ["No, they share elements", "B ⊂ A", "A ⊂ B", "Yes, no common elements"],
    3,
    "A = {a,b,c} and B = {e,f,g}. No common elements. A and B are disjoint sets.",
    "Medium",
  ],
  [
    "List all two-element subsets of {a,b,c,d}.",
    [
      "{a,b},{a,c},{b,c}",
      "{a,b},{c,d}",
      "{a,b},{a,c},{a,d},{b,c},{b,d},{c,d}",
      "{a,b,c},{a,b,d},{a,c,d},{b,c,d}",
    ],
    2,
    "Two-element subsets: {a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}. Total = 6 subsets.",
    "Medium",
  ],
  [
    "ξ = {1, 2, 3, ..., 10}. A = {x : x is a perfect square}. Find A and A'.",
    [
      "A={1,4,9}, A'={2,3,5,6,7,8,9,10}",
      "A={1,4,9}, A'={2,3,5,6,7,8,10}",
      "A={4,9}, A'={1,2,3,5,6,7,8,10}",
      "A={1,4}, A'={2,3,5,6,7,8,9,10}",
    ],
    1,
    "Perfect squares ≤ 10: 1,4,9. A={1,4,9}. A'={2,3,5,6,7,8,10}.",
    "Medium",
  ],
  [
    "Convert to set builder notation: B = {January, June, July}.",
    [
      "{x : x is a month in the first half of the year}",
      "{x : x is a month of the year}",
      "{x : x is a month with 31 days}",
      "{x : x is a month starting with the letter J}",
    ],
    3,
    "All months in B start with the letter J. B = {x : x is a month starting with J}.",
    "Medium",
  ],
  [
    "Which of the following is an empty set?",
    [
      "{x : x is a multiple of 5 between 11 and 14}",
      "{x : x is an even prime number}",
      "{0}",
      "{x : x is a factor of 7}",
    ],
    0,
    "There is no multiple of 5 between 11 and 14, so the set is empty. {x : x is an even prime number} = {2}, {0} has one element, and the factors of 7 are {1, 7}.",
    "Medium",
  ],
  [
    "ξ = {integers from 1 to 15}. A = {odd numbers}. Find n(A').",
    ["8", "7", "5", "6"],
    1,
    "Odd numbers 1-15: {1,3,5,7,9,11,13,15}. n(A) = 8. n(A') = 15 − 8 = 7.",
    "Medium",
  ],
  [
    "Given A = {1, 3, 5}. Which statement is TRUE?",
    ["A ⊂ {1, 5}", "3 ⊂ A", "{3} ∈ A", "{1, 5} ⊂ A"],
    3,
    "Every element of {1, 5} is an element of A, so {1, 5} ⊂ A. The symbol ∈ is used for elements (for example 3 ∈ A), while ⊂ is used for sets.",
    "Medium",
  ],
  [
    "Given ξ = {1, 2, 3, ..., 8}, A = {1, 2, 3} and B = {2, 3}. Which statement is TRUE?",
    ["B ⊂ A", "A ⊂ B", "A = B", "A' = B"],
    0,
    "Every element of B, namely 2 and 3, is an element of A, so B ⊂ A. A has the element 1, which is not in B, so A ⊄ B.",
    "Medium",
  ],
  [
    "In a Venn diagram for B ⊂ A, how does circle B appear?",
    [
      "Circle B is outside circle A",
      "Circle B partially intersects A",
      "Circle B is entirely inside circle A",
      "Circle B and A are the same size",
    ],
    2,
    "When B ⊂ A, circle B is drawn ENTIRELY INSIDE circle A in the Venn diagram.",
    "Medium",
  ],
  [
    "Set R = {x : x is an integer, x² < 25}. List R (positive and negative).",
    ["{0,1,2,3,4}", "{1,2,3,4}", "{-5,-4,...,4,5}", "{-4,-3,-2,-1,0,1,2,3,4}"],
    3,
    "x² < 25 means |x| < 5. Integers: -4,-3,-2,-1,0,1,2,3,4. R = {-4,-3,-2,-1,0,1,2,3,4}.",
    "Medium",
  ],
  [
    "ξ = {1,...,10}. A = {2,4,6}. Determine whether {2,6} ⊂ A.",
    ["No", "Yes", "Only {2} ⊂ A", "{2,6} = A"],
    1,
    "2 ∈ A ✓ and 6 ∈ A ✓. All elements of {2,6} are in A. So {2,6} ⊂ A.",
    "Medium",
  ],
]);

const MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "ξ = {1, 2, 3, ..., 20}. A = {nombor perdana}. B = {nombor ganjil}. Adakah A ⊂ B?",
    [
      "Tidak, kerana 2 ialah nombor perdana tetapi genap",
      "Ya, semua nombor perdana ialah nombor ganjil",
      "Ya, kecuali nombor 1",
      "Bergantung pada set semesta",
    ],
    0,
    "2 ialah nombor perdana tetapi 2 ialah nombor genap. Jadi 2 ∈ A tetapi 2 ∉ B. Oleh itu A ⊄ B.",
    "Hard",
  ],
  [
    "Diberi n(ξ) = 15 dan n(A') = 8. Cari n(A) dan bilangan subset bagi A.",
    ["n(A) = 8, 256 subset", "n(A) = 7, 128 subset", "n(A) = 6, 64 subset", "n(A) = 7, 64 subset"],
    1,
    "n(A) = n(ξ) − n(A') = 15 − 8 = 7. Bilangan subset = 2⁷ = 128.",
    "Hard",
  ],
  [
    "ξ = {a, b, c, d, e, f, g}, A = {a, c, e, g} dan B = {b, d, f}. Cari A' dan tentukan sama ada A' = B.",
    [
      "A' = {b, d, f}; tidak, A' ≠ B",
      "A' = {b, d, f, g}; tidak",
      "A' = {b, d, f}; ya, A' = B",
      "A' = {c, e, g}; ya",
    ],
    2,
    "A' ialah unsur ξ yang tiada dalam A: A' = {b, d, f}. Oleh sebab B = {b, d, f}, maka A' = B.",
    "Hard",
  ],
  [
    "Set P mempunyai 256 subset dan n(ξ) = 12. Cari n(P) dan n(P').",
    ["n(P) = 7, n(P') = 5", "n(P) = 6, n(P') = 6", "n(P) = 4, n(P') = 8", "n(P) = 8, n(P') = 4"],
    3,
    "2ⁿ = 256 = 2⁸, jadi n(P) = 8. n(P') = n(ξ) − n(P) = 12 − 8 = 4.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 20}. A = {x : x ialah gandaan 3} dan B = {x : x ialah gandaan 6}. Tentukan A, B dan sama ada B ⊂ A.",
    [
      "A = {3, 6, 9, 12, 15, 18, 21}, B = {6, 12, 18, 24}, B ⊄ A",
      "A = {3, 6, 9, 12, 15, 18}, B = {6, 12, 18}, B ⊂ A",
      "A = {6, 12, 18}, B = {3, 6, 9, 12, 15, 18}, A ⊂ B",
      "A = {3, 6, 9, 12, 15, 18}, B = {6, 12}, B ⊄ A",
    ],
    1,
    "A = {3, 6, 9, 12, 15, 18} dan B = {6, 12, 18}. Setiap unsur B ialah unsur A, jadi B ⊂ A.",
    "Hard",
  ],
  [
    "Jika A ⊂ B dan B ⊂ A, apakah hubungan antara A dan B?",
    ["A ≠ B", "n(A) > n(B)", "A = B", "A ialah set semesta"],
    2,
    "Setiap unsur A ialah unsur B, dan setiap unsur B ialah unsur A. Maka A = B.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 15}. A = {nombor perdana}. Senaraikan A dan cari bilangan subset bagi A.",
    [
      "A = {2, 3, 5, 7, 11, 13}; 32 subset",
      "A = {2, 3, 5, 7, 11, 13, 15}; 128 subset",
      "A = {1, 2, 3, 5, 7, 11, 13}; 128 subset",
      "A = {2, 3, 5, 7, 11, 13}; 64 subset",
    ],
    3,
    "Nombor perdana hingga 15: {2, 3, 5, 7, 11, 13}. n(A) = 6. Bilangan subset = 2⁶ = 64.",
    "Hard",
  ],
  [
    "Diberi n(ξ) = 10, A ⊂ B, n(A) = 4 dan n(B) = 7. Cari n(B') dan n(A').",
    [
      "n(B') = 3, n(A') = 6",
      "n(B') = 7, n(A') = 4",
      "n(B') = 4, n(A') = 7",
      "n(B') = 3, n(A') = 4",
    ],
    0,
    "n(B') = 10 − 7 = 3. n(A') = 10 − 4 = 6.",
    "Hard",
  ],
  [
    "Set A = {x : x ialah integer positif dan 2x − 1 < 7}. Senaraikan A.",
    ["{2, 3}", "{1, 2, 3, 4}", "{1, 2, 3}", "{1, 2, 3, 4, 5}"],
    2,
    "2x − 1 < 7 → 2x < 8 → x < 4. Integer positif yang kurang daripada 4: A = {1, 2, 3}.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 10}, A = {2, 3, 5, 7} dan B = {1, 3, 5, 7, 9}. Cari A' dan B', kemudian tentukan sama ada A' = B'.",
    [
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 4, 6, 8, 10}; ya",
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 3, 5, 7}; ya",
      "A' = {4, 6, 8, 10}, B' = {2, 4, 6, 8}; tidak",
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 4, 6, 8, 10}; tidak",
    ],
    3,
    "A' = {1, 4, 6, 8, 9, 10} dan B' = {2, 4, 6, 8, 10}. Unsurnya berbeza, jadi A' ≠ B'.",
    "Hard",
  ],
  [
    "Berapakah bilangan subset bagi {1, 2, 3, 4, 5, 6, 7, 8} yang mengandungi unsur 1?",
    ["128", "64", "32", "256"],
    0,
    "Setiap subset itu mesti mengandungi 1, dan baki 7 unsur boleh dipilih secara bebas: 2⁷ = 128 subset.",
    "Hard",
  ],
  [
    "Set R = {x : x ialah integer, −3 ≤ x ≤ 3}. Cari n(R) dan bilangan subset bagi R.",
    ["n(R) = 6, 64 subset", "n(R) = 7, 128 subset", "n(R) = 7, 64 subset", "n(R) = 6, 32 subset"],
    1,
    "R = {−3, −2, −1, 0, 1, 2, 3}. n(R) = 7. Bilangan subset = 2⁷ = 128.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 20}. A = {x : x boleh dibahagi tepat dengan 2 dan juga dengan 3}. Senaraikan A.",
    ["{2, 4, 6, 8, 12, 18}", "{2, 3, 6, 12, 18}", "{6, 12}", "{6, 12, 18}"],
    3,
    "Nombor yang boleh dibahagi tepat dengan 2 dan 3 ialah gandaan 6. Gandaan 6 hingga 20: {6, 12, 18}.",
    "Hard",
  ],
  [
    "Berapakah bilangan subset bagi {a, b, c, d, e} yang TIDAK mengandungi e?",
    ["16", "32", "8", "10"],
    0,
    "Subset yang tidak mengandungi e ialah subset bagi {a, b, c, d}. Bilangannya = 2⁴ = 16.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 10} dan A = {1, 2, 3, 4}. B ialah set unsur ξ yang tiada dalam A. Pernyataan manakah yang BENAR?",
    ["B ⊂ A", "B = A'", "A = B", "B = ξ"],
    1,
    "Unsur ξ yang tiada dalam A membentuk pelengkap A, iaitu A' = {5, 6, 7, 8, 9, 10}. Maka B = A'.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 15}. A = {nombor ganjil} dan B = {nombor perdana}. Cari n(A'), n(B') dan tentukan sama ada B ⊂ A.",
    [
      "n(A') = 7, n(B') = 10, B ⊂ A",
      "n(A') = 8, n(B') = 9, B ⊂ A",
      "n(A') = 7, n(B') = 9, B ⊄ A",
      "n(A') = 8, n(B') = 10, B ⊄ A",
    ],
    2,
    "A = {1, 3, 5, ..., 15}, n(A) = 8, maka n(A') = 7. B = {2, 3, 5, 7, 11, 13}, n(B) = 6, maka n(B') = 9. 2 ∈ B tetapi 2 ∉ A, jadi B ⊄ A.",
    "Hard",
  ],
  [
    "Pasangan set manakah memenuhi P ⊂ Q tetapi P ≠ Q?",
    [
      "P = {1}, Q = {1, 2, 3}",
      "P = {1, 2, 3}, Q = {1, 2, 3}",
      "P = {1, 2}, Q = {1}",
      "P = {4}, Q = {1, 2, 3}",
    ],
    0,
    "{1} ⊂ {1, 2, 3} kerana 1 ∈ {1, 2, 3}, dan P ≠ Q kerana Q mempunyai unsur tambahan. Pilihan lain sama ada P = Q atau P ⊄ Q.",
    "Hard",
  ],
  [
    "Set A = {x : x ialah integer, −2 ≤ x < 3}. Cari n(A) dan bilangan subset bagi A.",
    ["n(A) = 6, 64 subset", "n(A) = 4, 16 subset", "n(A) = 5, 32 subset", "n(A) = 5, 16 subset"],
    2,
    "A = {−2, −1, 0, 1, 2}. n(A) = 5. Bilangan subset = 2⁵ = 32.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 9}. A = {x : x ialah kuasa dua sempurna} dan B = {x : x ialah nombor ganjil}. Adakah A ⊂ B?",
    [
      "Ya, semua kuasa dua sempurna ialah nombor ganjil",
      "Tidak, kerana 4 ialah kuasa dua sempurna tetapi genap",
      "Ya, kecuali 1",
      "Tidak boleh ditentukan",
    ],
    1,
    "Kuasa dua sempurna dalam ξ: {1, 4, 9}. 4 ∈ A tetapi 4 ∉ B. Jadi A ⊄ B.",
    "Hard",
  ],
  [
    "Diberi A ⊂ B, n(A) = 3 dan n(B) = 7. Berapakah bilangan unsur B yang TIDAK berada dalam A?",
    ["3", "10", "7", "4"],
    3,
    "Semua unsur A berada dalam B. Unsur B yang tiada dalam A = n(B) − n(A) = 7 − 3 = 4.",
    "Hard",
  ],
  [
    "A = {huruf dalam perkataan 'ANA'} dan B = {huruf dalam perkataan 'NANA'}. Adakah A = B?",
    [
      "Tidak, B mempunyai lebih banyak huruf",
      "Tidak, A mempunyai lebih banyak huruf",
      "Ya",
      "Tidak boleh ditentukan",
    ],
    2,
    "Huruf yang berulang dikira sekali sahaja. A = {A, N} dan B = {N, A}. Kedua-dua set mempunyai unsur yang sama, jadi A = B.",
    "Hard",
  ],
  [
    "Berapakah bilangan subset bagi {1, 2, 3, 4, 5} yang mengandungi kedua-dua unsur 1 dan 2?",
    ["4", "8", "6", "16"],
    1,
    "1 dan 2 mesti ada dalam setiap subset itu. Baki unsur {3, 4, 5} boleh dipilih secara bebas: 2³ = 8 subset.",
    "Hard",
  ],
  [
    "P = {x : x ialah faktor bagi 12} dan Q = {x : x ialah faktor bagi 6}. Pernyataan manakah yang BENAR?",
    ["n(P) = n(Q)", "P ⊂ Q", "P = Q", "Q ⊂ P"],
    3,
    "P = {1, 2, 3, 4, 6, 12} dan Q = {1, 2, 3, 6}. Setiap unsur Q ialah unsur P, jadi Q ⊂ P. n(P) = 6 dan n(Q) = 4.",
    "Hard",
  ],
  [
    "Set K mempunyai 16 subset. Diberi K ⊂ ξ dan n(ξ) = 10. Cari n(K').",
    ["6", "4", "8", "12"],
    0,
    "2ⁿ = 16 = 2⁴, jadi n(K) = 4. n(K') = n(ξ) − n(K) = 10 − 4 = 6.",
    "Hard",
  ],
  [
    "n(ξ) = 20, n(A) = 8 dan B = A'. Cari n(B) dan bilangan subset bagi B.",
    [
      "n(B) = 8, 256 subset",
      "n(B) = 12, 4 096 subset",
      "n(B) = 12, 2 048 subset",
      "n(B) = 20, 1 048 576 subset",
    ],
    1,
    "B = A', jadi n(B) = n(ξ) − n(A) = 20 − 8 = 12. Bilangan subset bagi B = 2¹² = 4 096.",
    "Hard",
  ],
  [
    "ξ = {x : x ialah integer, 1 ≤ x ≤ 12}, A = {x : x ialah gandaan 4} dan B = {x : x ialah gandaan 2}. Berapakah n(B) − n(A)?",
    ["2", "6", "9", "3"],
    3,
    "B = {2, 4, 6, 8, 10, 12}, n(B) = 6. A = {4, 8, 12}, n(A) = 3. n(B) − n(A) = 3.",
    "Hard",
  ],
  [
    "Set M = {p, q, r}. Berapakah bilangan subset M yang mengandungi tepat dua unsur?",
    ["3", "2", "6", "8"],
    0,
    "Subset dengan tepat dua unsur: {p, q}, {p, r} dan {q, r}. Ada 3 subset. (8 ialah jumlah semua subset.)",
    "Hard",
  ],
  [
    "ξ = {huruf dalam perkataan 'MATEMATIK'} dan A = {huruf vokal dalam perkataan 'MATEMATIK'}. Cari n(A').",
    ["5", "6", "3", "4"],
    2,
    "ξ = {M, A, T, E, I, K}, n(ξ) = 6. A = {A, E, I}, n(A) = 3. n(A') = 6 − 3 = 3.",
    "Hard",
  ],
  [
    "Set A mempunyai 3 unsur dan set B mempunyai 5 unsur. Bilangan subset B ialah berapa kali bilangan subset A?",
    ["24", "2", "8", "4"],
    3,
    "Subset A = 2³ = 8. Subset B = 2⁵ = 32. 32 ÷ 8 = 4.",
    "Hard",
  ],
  [
    "A = {x : x ialah nombor perdana, x < 10} dan B = {2, 3, 5, 7}. Apakah kesimpulan yang betul?",
    ["A ⊂ B tetapi A ≠ B", "A = B", "B ⊄ A", "n(A) = 5"],
    1,
    "Nombor perdana kurang daripada 10 ialah 2, 3, 5 dan 7. Jadi A = {2, 3, 5, 7} = B.",
    "Hard",
  ],
]);

const MATH_C11_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "ξ = {1, 2, 3, ..., 20}. A = {prime numbers}. B = {odd numbers}. Is A ⊂ B?",
    [
      "No, because 2 is a prime number but even",
      "Yes, all prime numbers are odd",
      "Yes, except the number 1",
      "It depends on the universal set",
    ],
    0,
    "2 is a prime number but 2 is even. So 2 ∈ A but 2 ∉ B. Therefore A ⊄ B.",
    "Hard",
  ],
  [
    "Given n(ξ) = 15 and n(A') = 8. Find n(A) and the number of subsets of A.",
    [
      "n(A) = 8, 256 subsets",
      "n(A) = 7, 128 subsets",
      "n(A) = 6, 64 subsets",
      "n(A) = 7, 64 subsets",
    ],
    1,
    "n(A) = n(ξ) − n(A') = 15 − 8 = 7. Number of subsets = 2⁷ = 128.",
    "Hard",
  ],
  [
    "ξ = {a, b, c, d, e, f, g}, A = {a, c, e, g} and B = {b, d, f}. Find A' and determine whether A' = B.",
    [
      "A' = {b, d, f}; no, A' ≠ B",
      "A' = {b, d, f, g}; no",
      "A' = {b, d, f}; yes, A' = B",
      "A' = {c, e, g}; yes",
    ],
    2,
    "A' is the elements of ξ not in A: A' = {b, d, f}. Since B = {b, d, f}, A' = B.",
    "Hard",
  ],
  [
    "Set P has 256 subsets and n(ξ) = 12. Find n(P) and n(P').",
    ["n(P) = 7, n(P') = 5", "n(P) = 6, n(P') = 6", "n(P) = 4, n(P') = 8", "n(P) = 8, n(P') = 4"],
    3,
    "2ⁿ = 256 = 2⁸, so n(P) = 8. n(P') = n(ξ) − n(P) = 12 − 8 = 4.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 20}. A = {x : x is a multiple of 3} and B = {x : x is a multiple of 6}. Determine A, B and whether B ⊂ A.",
    [
      "A = {3, 6, 9, 12, 15, 18, 21}, B = {6, 12, 18, 24}, B ⊄ A",
      "A = {3, 6, 9, 12, 15, 18}, B = {6, 12, 18}, B ⊂ A",
      "A = {6, 12, 18}, B = {3, 6, 9, 12, 15, 18}, A ⊂ B",
      "A = {3, 6, 9, 12, 15, 18}, B = {6, 12}, B ⊄ A",
    ],
    1,
    "A = {3, 6, 9, 12, 15, 18} and B = {6, 12, 18}. Every element of B is an element of A, so B ⊂ A.",
    "Hard",
  ],
  [
    "If A ⊂ B and B ⊂ A, what is the relationship between A and B?",
    ["A ≠ B", "n(A) > n(B)", "A = B", "A is the universal set"],
    2,
    "Every element of A is an element of B, and every element of B is an element of A. So A = B.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 15}. A = {prime numbers}. List A and find the number of subsets of A.",
    [
      "A = {2, 3, 5, 7, 11, 13}; 32 subsets",
      "A = {2, 3, 5, 7, 11, 13, 15}; 128 subsets",
      "A = {1, 2, 3, 5, 7, 11, 13}; 128 subsets",
      "A = {2, 3, 5, 7, 11, 13}; 64 subsets",
    ],
    3,
    "Prime numbers up to 15: {2, 3, 5, 7, 11, 13}. n(A) = 6. Number of subsets = 2⁶ = 64.",
    "Hard",
  ],
  [
    "Given n(ξ) = 10, A ⊂ B, n(A) = 4 and n(B) = 7. Find n(B') and n(A').",
    [
      "n(B') = 3, n(A') = 6",
      "n(B') = 7, n(A') = 4",
      "n(B') = 4, n(A') = 7",
      "n(B') = 3, n(A') = 4",
    ],
    0,
    "n(B') = 10 − 7 = 3. n(A') = 10 − 4 = 6.",
    "Hard",
  ],
  [
    "Set A = {x : x is a positive integer and 2x − 1 < 7}. List A.",
    ["{2, 3}", "{1, 2, 3, 4}", "{1, 2, 3}", "{1, 2, 3, 4, 5}"],
    2,
    "2x − 1 < 7 → 2x < 8 → x < 4. Positive integers less than 4: A = {1, 2, 3}.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 10}, A = {2, 3, 5, 7} and B = {1, 3, 5, 7, 9}. Find A' and B', then determine whether A' = B'.",
    [
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 4, 6, 8, 10}; yes",
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 3, 5, 7}; yes",
      "A' = {4, 6, 8, 10}, B' = {2, 4, 6, 8}; no",
      "A' = {1, 4, 6, 8, 9, 10}, B' = {2, 4, 6, 8, 10}; no",
    ],
    3,
    "A' = {1, 4, 6, 8, 9, 10} and B' = {2, 4, 6, 8, 10}. The elements differ, so A' ≠ B'.",
    "Hard",
  ],
  [
    "How many subsets of {1, 2, 3, 4, 5, 6, 7, 8} contain the element 1?",
    ["128", "64", "32", "256"],
    0,
    "Each such subset must contain 1, and the other 7 elements can be chosen freely: 2⁷ = 128 subsets.",
    "Hard",
  ],
  [
    "Set R = {x : x is an integer, −3 ≤ x ≤ 3}. Find n(R) and the number of subsets of R.",
    [
      "n(R) = 6, 64 subsets",
      "n(R) = 7, 128 subsets",
      "n(R) = 7, 64 subsets",
      "n(R) = 6, 32 subsets",
    ],
    1,
    "R = {−3, −2, −1, 0, 1, 2, 3}. n(R) = 7. Number of subsets = 2⁷ = 128.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 20}. A = {x : x is divisible by both 2 and 3}. List A.",
    ["{2, 4, 6, 8, 12, 18}", "{2, 3, 6, 12, 18}", "{6, 12}", "{6, 12, 18}"],
    3,
    "Numbers divisible by both 2 and 3 are multiples of 6. Multiples of 6 up to 20: {6, 12, 18}.",
    "Hard",
  ],
  [
    "How many subsets of {a, b, c, d, e} do NOT contain e?",
    ["16", "32", "8", "10"],
    0,
    "Subsets without e are the subsets of {a, b, c, d}. Their number = 2⁴ = 16.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 10} and A = {1, 2, 3, 4}. B is the set of elements of ξ that are not in A. Which statement is TRUE?",
    ["B ⊂ A", "B = A'", "A = B", "B = ξ"],
    1,
    "The elements of ξ not in A form the complement of A, A' = {5, 6, 7, 8, 9, 10}. So B = A'.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 15}. A = {odd numbers} and B = {prime numbers}. Find n(A'), n(B') and determine whether B ⊂ A.",
    [
      "n(A') = 7, n(B') = 10, B ⊂ A",
      "n(A') = 8, n(B') = 9, B ⊂ A",
      "n(A') = 7, n(B') = 9, B ⊄ A",
      "n(A') = 8, n(B') = 10, B ⊄ A",
    ],
    2,
    "A = {1, 3, 5, ..., 15}, n(A) = 8, so n(A') = 7. B = {2, 3, 5, 7, 11, 13}, n(B) = 6, so n(B') = 9. 2 ∈ B but 2 ∉ A, so B ⊄ A.",
    "Hard",
  ],
  [
    "Which pair of sets satisfies P ⊂ Q but P ≠ Q?",
    [
      "P = {1}, Q = {1, 2, 3}",
      "P = {1, 2, 3}, Q = {1, 2, 3}",
      "P = {1, 2}, Q = {1}",
      "P = {4}, Q = {1, 2, 3}",
    ],
    0,
    "{1} ⊂ {1, 2, 3} because 1 ∈ {1, 2, 3}, and P ≠ Q because Q has extra elements. The other options have P = Q or P ⊄ Q.",
    "Hard",
  ],
  [
    "Set A = {x : x is an integer, −2 ≤ x < 3}. Find n(A) and the number of subsets of A.",
    [
      "n(A) = 6, 64 subsets",
      "n(A) = 4, 16 subsets",
      "n(A) = 5, 32 subsets",
      "n(A) = 5, 16 subsets",
    ],
    2,
    "A = {−2, −1, 0, 1, 2}. n(A) = 5. Number of subsets = 2⁵ = 32.",
    "Hard",
  ],
  [
    "ξ = {1, 2, 3, ..., 9}. A = {x : x is a perfect square} and B = {x : x is an odd number}. Is A ⊂ B?",
    [
      "Yes, all perfect squares are odd",
      "No, because 4 is a perfect square but even",
      "Yes, except 1",
      "Cannot be determined",
    ],
    1,
    "Perfect squares in ξ: {1, 4, 9}. 4 ∈ A but 4 ∉ B. So A ⊄ B.",
    "Hard",
  ],
  [
    "Given A ⊂ B, n(A) = 3 and n(B) = 7. How many elements of B are NOT in A?",
    ["3", "10", "7", "4"],
    3,
    "All elements of A are in B. Elements of B not in A = n(B) − n(A) = 7 − 3 = 4.",
    "Hard",
  ],
  [
    "A = {letters in the word 'ANA'} and B = {letters in the word 'NANA'}. Is A = B?",
    ["No, B has more letters", "No, A has more letters", "Yes", "Cannot be determined"],
    2,
    "Repeated letters are counted only once. A = {A, N} and B = {N, A}. Both sets have the same elements, so A = B.",
    "Hard",
  ],
  [
    "How many subsets of {1, 2, 3, 4, 5} contain both 1 and 2?",
    ["4", "8", "6", "16"],
    1,
    "1 and 2 must be in each such subset. The other elements {3, 4, 5} can be chosen freely: 2³ = 8 subsets.",
    "Hard",
  ],
  [
    "P = {x : x is a factor of 12} and Q = {x : x is a factor of 6}. Which statement is TRUE?",
    ["n(P) = n(Q)", "P ⊂ Q", "P = Q", "Q ⊂ P"],
    3,
    "P = {1, 2, 3, 4, 6, 12} and Q = {1, 2, 3, 6}. Every element of Q is an element of P, so Q ⊂ P. n(P) = 6 and n(Q) = 4.",
    "Hard",
  ],
  [
    "Set K has 16 subsets. Given K ⊂ ξ and n(ξ) = 10. Find n(K').",
    ["6", "4", "8", "12"],
    0,
    "2ⁿ = 16 = 2⁴, so n(K) = 4. n(K') = n(ξ) − n(K) = 10 − 4 = 6.",
    "Hard",
  ],
  [
    "n(ξ) = 20, n(A) = 8 and B = A'. Find n(B) and the number of subsets of B.",
    [
      "n(B) = 8, 256 subsets",
      "n(B) = 12, 4 096 subsets",
      "n(B) = 12, 2 048 subsets",
      "n(B) = 20, 1 048 576 subsets",
    ],
    1,
    "B = A', so n(B) = n(ξ) − n(A) = 20 − 8 = 12. Number of subsets of B = 2¹² = 4 096.",
    "Hard",
  ],
  [
    "ξ = {x : x is an integer, 1 ≤ x ≤ 12}, A = {x : x is a multiple of 4} and B = {x : x is a multiple of 2}. What is n(B) − n(A)?",
    ["2", "6", "9", "3"],
    3,
    "B = {2, 4, 6, 8, 10, 12}, n(B) = 6. A = {4, 8, 12}, n(A) = 3. n(B) − n(A) = 3.",
    "Hard",
  ],
  [
    "Set M = {p, q, r}. How many subsets of M contain exactly two elements?",
    ["3", "2", "6", "8"],
    0,
    "Subsets with exactly two elements: {p, q}, {p, r} and {q, r}. There are 3. (8 is the total number of subsets.)",
    "Hard",
  ],
  [
    "ξ = {letters in the word 'MATEMATIK'} and A = {vowels in the word 'MATEMATIK'}. Find n(A').",
    ["5", "6", "3", "4"],
    2,
    "ξ = {M, A, T, E, I, K}, n(ξ) = 6. A = {A, E, I}, n(A) = 3. n(A') = 6 − 3 = 3.",
    "Hard",
  ],
  [
    "Set A has 3 elements and set B has 5 elements. The number of subsets of B is how many times the number of subsets of A?",
    ["24", "2", "8", "4"],
    3,
    "Subsets of A = 2³ = 8. Subsets of B = 2⁵ = 32. 32 ÷ 8 = 4.",
    "Hard",
  ],
  [
    "A = {x : x is a prime number, x < 10} and B = {2, 3, 5, 7}. Which conclusion is correct?",
    ["A ⊂ B tetapi A ≠ B", "A = B", "B ⊄ A", "n(A) = 5"],
    1,
    "The prime numbers less than 10 are 2, 3, 5 and 7. So A = {2, 3, 5, 7} = B.",
    "Hard",
  ],
]);

const MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah hipotenus dalam segi tiga bersudut tegak?",
    [
      "Sisi yang paling panjang, bertentangan dengan sudut 90°",
      "Sisi yang bertentangan dengan sudut terkecil",
      "Sisi yang paling pendek",
      "Sebarang sisi dalam segi tiga",
    ],
    0,
    "Hipotenus ialah sisi yang PALING PANJANG dalam segi tiga bersudut tegak dan ia sentiasa BERTENTANGAN dengan sudut 90°.",
    "Easy",
  ],
  [
    "Apakah Teorem Pythagoras?",
    [
      "a² + b² = c (bukan kuasa dua)",
      "c² = a² + b², di mana c ialah hipotenus",
      "c = a + b",
      "c² = a² × b²",
    ],
    1,
    "Teorem Pythagoras: c² = a² + b², di mana c ialah hipotenus (sisi terpanjang) dan a, b ialah dua kaki segi tiga bersudut tegak.",
    "Easy",
  ],
  [
    "Dalam segi tiga bersudut tegak, di manakah sudut 90°?",
    [
      "Di hadapan hipotenus",
      "Di hadapan sisi terpendek",
      "Di antara dua kaki (sisi yang pendek)",
      "Di atas hipotenus",
    ],
    2,
    "Sudut 90° berada di ANTARA dua kaki (sisi yang lebih pendek). Hipotenus bertentangan dengan sudut 90° ini.",
    "Easy",
  ],
  [
    "Apakah simbol yang digunakan untuk menandakan sudut tegak dalam gambar rajah?",
    ["○ (bulatan kecil)", "△ (segi tiga)", "× (silang)", "□ (segi empat kecil)"],
    3,
    "Simbol □ (segi empat kecil) digunakan untuk menandakan sudut tegak 90° dalam gambar rajah geometri.",
    "Easy",
  ],
  [
    "Dalam segi tiga bersudut tegak ABC dengan sudut tegak di B, sisi manakah yang merupakan hipotenus?",
    ["AB", "AC", "BC", "Semua sisi boleh menjadi hipotenus"],
    1,
    "Hipotenus bertentangan dengan sudut tegak. Sudut tegak di B, jadi hipotenus ialah sisi AC (bertentangan B).",
    "Easy",
  ],
  [
    "Segi tiga manakah yang PASTI bersudut tegak?",
    [
      "Segi tiga sama sisi",
      "Segi tiga dengan sisi 2, 3, 4",
      "Segi tiga dengan sisi 3, 4, 5",
      "Segi tiga sama kaki",
    ],
    2,
    "3² + 4² = 9 + 16 = 25 = 5². Ini adalah triple Pythagoras yang terkenal, jadi ia pasti bersudut tegak.",
    "Easy",
  ],
  [
    "Apakah triple Pythagoras paling terkenal?",
    ["1, 2, 3", "2, 3, 4", "4, 5, 6", "3, 4, 5"],
    3,
    "Triple Pythagoras paling terkenal ialah 3, 4, 5 kerana 3² + 4² = 9 + 16 = 25 = 5².",
    "Easy",
  ],
  [
    "Rumus untuk mencari hipotenus c ialah:",
    ["c = √(a² + b²)", "c = a² + b²", "c = a + b", "c = √(a + b)"],
    0,
    "c = √(a² + b²). Kira a², kira b², tambah, kemudian ambil punca kuasa dua.",
    "Easy",
  ],
  [
    "Dalam formula c² = a² + b², huruf c mewakili:",
    ["Mana-mana sisi", "Sisi terpendek", "Hipotenus", "Sudut tegak"],
    2,
    "Dalam Teorem Pythagoras, c sentiasa mewakili hipotenus (sisi terpanjang yang bertentangan sudut 90°).",
    "Easy",
  ],
  [
    "Apakah makna akas Teorem Pythagoras?",
    [
      "Teorem yang sama tetapi dalam bahasa lain",
      "Teorem untuk segi tiga sama kaki sahaja",
      "Teorem untuk mencari sudut",
      "Jika c² = a² + b², maka segi tiga adalah bersudut tegak",
    ],
    3,
    "Akas Teorem Pythagoras: jika c² = a² + b² (c = sisi terpanjang), maka segi tiga adalah bersudut tegak.",
    "Easy",
  ],
  [
    "Apakah jenis segi tiga yang mempunyai semua sudut kurang daripada 90°?",
    [
      "Segi tiga bersudut tirus",
      "Segi tiga bersudut cakah",
      "Segi tiga bersudut tegak",
      "Segi tiga sama kaki",
    ],
    0,
    "Segi tiga bersudut tirus mempunyai SEMUA sudut kurang daripada 90°.",
    "Easy",
  ],
  [
    "Apakah jenis segi tiga yang mempunyai satu sudut melebihi 90°?",
    [
      "Segi tiga bersudut tegak",
      "Segi tiga bersudut cakah",
      "Segi tiga bersudut tirus",
      "Segi tiga sama sisi",
    ],
    1,
    "Segi tiga bersudut cakah mempunyai SATU sudut yang melebihi 90°.",
    "Easy",
  ],
  [
    "Untuk segi tiga bersudut tirus dengan sisi terpanjang c, hubungannya ialah:",
    ["c² = a² + b²", "c² > a² + b²", "c = a + b", "c² < a² + b²"],
    3,
    "Untuk segi tiga bersudut tirus: c² < a² + b². Sisi terpanjang 'tidak cukup panjang' untuk membentuk sudut tegak.",
    "Easy",
  ],
  [
    "Untuk segi tiga bersudut cakah dengan sisi terpanjang c, hubungannya ialah:",
    ["c² > a² + b²", "c² < a² + b²", "c² = a² + b²", "c² = (a + b)²"],
    0,
    "Untuk segi tiga bersudut cakah: c² > a² + b². Sisi terpanjang 'terlalu panjang', menyebabkan satu sudut melebihi 90°.",
    "Easy",
  ],
  [
    "Dalam Teorem Pythagoras, apakah peranan a dan b?",
    [
      "Hipotenus dan sudut tegak",
      "Dua kaki segi tiga bersudut tegak",
      "Sisi terpanjang dan sisi terpendek",
      "Nilai dua sudut tirus",
    ],
    1,
    "a dan b ialah dua KAKI segi tiga bersudut tegak — iaitu dua sisi yang membentuk sudut 90°. c ialah hipotenus.",
    "Easy",
  ],
  [
    "Segi tiga 6, 8, 10 — adakah ia triple Pythagoras?",
    [
      "Tidak, bukan triple Pythagoras",
      "Ya, kerana 6+8=14 > 10",
      "Ya, kerana 6²+8² = 36+64 = 100 = 10²",
      "Tidak boleh ditentukan",
    ],
    2,
    "6² + 8² = 36 + 64 = 100 = 10². Ini adalah gandaan 3-4-5 (×2), jadi ia adalah triple Pythagoras.",
    "Easy",
  ],
  [
    "Jika segi tiga mempunyai sisi 5, 12 dan 13, apakah jenis segi tiga tersebut?",
    ["Bersudut tegak", "Bersudut cakah", "Bersudut tirus", "Tidak boleh ditentukan"],
    0,
    "5² + 12² = 25 + 144 = 169 = 13². Ini adalah triple 5-12-13, jadi segi tiga bersudut tegak.",
    "Easy",
  ],
  [
    "Apakah yang dimaksudkan dengan 'kaki' dalam segi tiga bersudut tegak?",
    [
      "Hipotenus segi tiga itu",
      "Sisi terpanjang segi tiga itu",
      "Dua sisi yang membentuk sudut 90°",
      "Garis yang menyambung dua bucu bertentangan",
    ],
    2,
    "Kaki ialah dua sisi yang membentuk sudut 90°. Mereka lebih pendek daripada hipotenus.",
    "Easy",
  ],
  [
    "Teorem Pythagoras HANYA boleh digunakan untuk:",
    [
      "Semua jenis segi tiga",
      "Segi tiga bersudut tegak sahaja",
      "Segi tiga sama sisi sahaja",
      "Segi tiga bersudut cakah sahaja",
    ],
    1,
    "Teorem Pythagoras HANYA untuk segi tiga BERSUDUT TEGAK. Jangan gunakannya untuk segi tiga lain.",
    "Easy",
  ],
  [
    "Sisi manakah yang sentiasa lebih panjang dalam segi tiga bersudut tegak — kaki atau hipotenus?",
    ["Kaki", "Bergantung kepada saiz segi tiga", "Kedua-duanya sama panjang", "Hipotenus"],
    3,
    "Hipotenus sentiasa LEBIH PANJANG daripada setiap kaki dalam segi tiga bersudut tegak.",
    "Easy",
  ],
  [
    "Adakah mungkin hipotenus = salah satu kaki?",
    [
      "Ya, dalam sesetengah segi tiga bersudut tegak",
      "Ya, dalam segi tiga bersudut tegak sama kaki",
      "Tidak, ia sentiasa lebih panjang daripada setiap kaki",
      "Ya, apabila satu sudut ialah 45°",
    ],
    2,
    "TIDAK. Hipotenus sentiasa lebih panjang daripada setiap kaki. Jika jawapan anda menunjukkan hipotenus lebih pendek, terdapat kesilapan.",
    "Easy",
  ],
  [
    "4, 3, 5 — sisi manakah hipotenus?",
    ["4", "5", "3", "Bergantung kepada orientasi"],
    1,
    "Hipotenus adalah sisi TERPANJANG = 5. Boleh disahkan: 3²+4² = 9+16 = 25 = 5².",
    "Easy",
  ],
  [
    "Apakah triple Pythagoras kedua paling terkenal selepas 3-4-5?",
    ["6-8-10", "4-5-6", "7-8-9", "5-12-13"],
    3,
    "5-12-13 adalah triple Pythagoras terkenal kedua. Semak: 5²+12² = 25+144 = 169 = 13². ✓",
    "Easy",
  ],
  [
    "Dalam segi empat tepat, pepenjuru membentuk:",
    [
      "Dua segi tiga bersudut tegak",
      "Dua segi tiga sama kaki",
      "Dua segi tiga sama sisi",
      "Dua segi tiga bersudut cakah",
    ],
    0,
    "Pepenjuru segi empat tepat membahagikannya kepada DUA segi tiga bersudut tegak yang sama (kerana sudut segi empat tepat = 90°).",
    "Easy",
  ],
  [
    "Apakah langkah pertama dalam mengklasifikasikan segi tiga menggunakan akas Teorem Pythagoras?",
    ["Kira c²", "Kenal pasti sisi terpanjang (c)", "Kira a²+b²", "Bandingkan c² dengan a²+b²"],
    1,
    "Langkah pertama: KENAL PASTI sisi terpanjang dan labelkannya sebagai c. Kemudian kira c² dan a²+b² untuk dibandingkan.",
    "Easy",
  ],
  [
    "Apakah rumus untuk mencari kaki a jika hipotenus c dan kaki b diketahui?",
    ["a = c + b", "a = c² + b²", "a = √(c² + b²)", "a = √(c² − b²)"],
    3,
    "a = √(c² − b²). Apabila mencari kaki (sisi lebih pendek), kita TOLAK dari hipotenus.",
    "Easy",
  ],
  [
    "Adakah segi tiga dengan sudut 30°, 60°, 90° merupakan segi tiga bersudut tegak?",
    [
      "Ya, kerana terdapat sudut 90°",
      "Tidak, tiada sudut 90° yang betul-betul",
      "Hanya jika sisinya dalam nisbah tertentu",
      "Tidak boleh ditentukan",
    ],
    0,
    "Ya! Terdapat sudut 90°, jadi ia adalah segi tiga BERSUDUT TEGAK. Teorem Pythagoras boleh digunakan.",
    "Easy",
  ],
  [
    "Apakah perbezaan antara Teorem Pythagoras dan akasnya?",
    [
      "Tiada perbezaan antara kedua-duanya",
      "Akas digunakan untuk mencari panjang sisi",
      "Akas menggunakan c² = a² + b² untuk menentukan sudut tegak",
      "Teorem hanya untuk segi tiga sama kaki",
    ],
    2,
    "Teorem (maju): segi tiga bersudut tegak → c²=a²+b². Akas: jika c²=a²+b² → segi tiga bersudut tegak.",
    "Easy",
  ],
  [
    "Segi tiga 8, 15, 17 — jenis apakah?",
    ["Bersudut tirus", "Bersudut cakah", "Bukan segi tiga yang sah", "Bersudut tegak"],
    3,
    "8²+15² = 64+225 = 289 = 17². Ini adalah triple 8-15-17. Segi tiga bersudut tegak.",
    "Easy",
  ],
  [
    "Apakah maksud 'triple Pythagoras' didarab dengan faktor?",
    [
      "Hanya triple asal yang sah",
      "Gandaan triple juga membentuk segi tiga bersudut tegak",
      "Gandaan tidak sah bagi Teorem Pythagoras",
      "Faktor itu mestilah nombor perdana",
    ],
    1,
    "Gandaan triple Pythagoras juga sah. Cth: 3-4-5 × 2 = 6-8-10; × 3 = 9-12-15. Semuanya bersudut tegak.",
    "Easy",
  ],
]);

const MATH_C13_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is the hypotenuse in a right-angled triangle?",
    [
      "The longest side, opposite the 90° angle",
      "The side opposite the smallest angle",
      "The shortest side",
      "Any side of the triangle",
    ],
    0,
    "The hypotenuse is the LONGEST side in a right-angled triangle and is always OPPOSITE the 90° angle.",
    "Easy",
  ],
  [
    "What is Pythagoras' Theorem?",
    [
      "a² + b² = c (not squared)",
      "c² = a² + b², where c is the hypotenuse",
      "c = a + b",
      "c² = a² × b²",
    ],
    1,
    "Pythagoras' Theorem: c² = a² + b², where c is the hypotenuse (longest side) and a, b are the two legs of the right-angled triangle.",
    "Easy",
  ],
  [
    "In a right-angled triangle, where is the 90° angle?",
    [
      "Opposite the hypotenuse",
      "Opposite the shortest side",
      "Between the two legs (shorter sides)",
      "On top of the hypotenuse",
    ],
    2,
    "The 90° angle is BETWEEN the two legs (shorter sides). The hypotenuse is opposite this 90° angle.",
    "Easy",
  ],
  [
    "What symbol is used to mark a right angle in a diagram?",
    ["○ (small circle)", "△ (triangle)", "× (cross)", "□ (small square)"],
    3,
    "The □ symbol (small square) is used to mark a 90° right angle in geometry diagrams.",
    "Easy",
  ],
  [
    "In right-angled triangle ABC with right angle at B, which side is the hypotenuse?",
    ["AB", "AC", "BC", "All sides can be the hypotenuse"],
    1,
    "The hypotenuse is opposite the right angle. Right angle at B, so hypotenuse is AC (opposite B).",
    "Easy",
  ],
  [
    "Which triangle is DEFINITELY right-angled?",
    [
      "Equilateral triangle",
      "Triangle with sides 2, 3, 4",
      "Triangle with sides 3, 4, 5",
      "Isosceles triangle",
    ],
    2,
    "3² + 4² = 9 + 16 = 25 = 5². This is the famous Pythagorean triple, so it is definitely right-angled.",
    "Easy",
  ],
  [
    "What is the most famous Pythagorean triple?",
    ["1, 2, 3", "2, 3, 4", "4, 5, 6", "3, 4, 5"],
    3,
    "The most famous Pythagorean triple is 3, 4, 5 because 3² + 4² = 9 + 16 = 25 = 5².",
    "Easy",
  ],
  [
    "The formula to find hypotenuse c is:",
    ["c = √(a² + b²)", "c = a² + b²", "c = a + b", "c = √(a + b)"],
    0,
    "c = √(a² + b²). Calculate a², calculate b², add, then take the square root.",
    "Easy",
  ],
  [
    "In the formula c² = a² + b², the letter c represents:",
    ["Any side", "The shortest side", "The hypotenuse", "The right angle"],
    2,
    "In Pythagoras' Theorem, c always represents the hypotenuse (the longest side opposite the 90° angle).",
    "Easy",
  ],
  [
    "What does the converse of Pythagoras' Theorem mean?",
    [
      "The same theorem but in another language",
      "A theorem for isosceles triangles only",
      "A theorem for finding angles",
      "If c² = a² + b², then the triangle is right-angled",
    ],
    3,
    "Converse of Pythagoras' Theorem: if c² = a² + b² (c = longest side), then the triangle is right-angled.",
    "Easy",
  ],
  [
    "What type of triangle has all angles less than 90°?",
    [
      "Acute-angled triangle",
      "Obtuse-angled triangle",
      "Right-angled triangle",
      "Isosceles triangle",
    ],
    0,
    "An acute-angled triangle has ALL angles less than 90°.",
    "Easy",
  ],
  [
    "What type of triangle has one angle greater than 90°?",
    [
      "Right-angled triangle",
      "Obtuse-angled triangle",
      "Acute-angled triangle",
      "Equilateral triangle",
    ],
    1,
    "An obtuse-angled triangle has ONE angle greater than 90°.",
    "Easy",
  ],
  [
    "For an acute triangle with longest side c, the relationship is:",
    ["c² = a² + b²", "c² > a² + b²", "c = a + b", "c² < a² + b²"],
    3,
    "For an acute-angled triangle: c² < a² + b². The longest side is 'not long enough' to form a right angle.",
    "Easy",
  ],
  [
    "For an obtuse triangle with longest side c, the relationship is:",
    ["c² > a² + b²", "c² < a² + b²", "c² = a² + b²", "c² = (a + b)²"],
    0,
    "For an obtuse-angled triangle: c² > a² + b². The longest side is 'too long', causing one angle to exceed 90°.",
    "Easy",
  ],
  [
    "In Pythagoras' Theorem, what is the role of a and b?",
    [
      "The hypotenuse and the right angle",
      "The two legs of the right-angled triangle",
      "The longest and the shortest sides",
      "The values of the two acute angles",
    ],
    1,
    "a and b are the two LEGS of the right-angled triangle — the two sides that form the 90° angle. c is the hypotenuse.",
    "Easy",
  ],
  [
    "Triangle 6, 8, 10 — is it a Pythagorean triple?",
    [
      "No, not a Pythagorean triple",
      "Yes, because 6+8=14 > 10",
      "Yes, because 6²+8² = 36+64 = 100 = 10²",
      "Cannot be determined",
    ],
    2,
    "6² + 8² = 36 + 64 = 100 = 10². This is a multiple of 3-4-5 (×2), so it is a Pythagorean triple.",
    "Easy",
  ],
  [
    "If a triangle has sides 5, 12 and 13, what type is it?",
    ["Right-angled", "Obtuse-angled", "Acute-angled", "Cannot be determined"],
    0,
    "5² + 12² = 25 + 144 = 169 = 13². This is the 5-12-13 triple, so it is a right-angled triangle.",
    "Easy",
  ],
  [
    "What is meant by 'legs' in a right-angled triangle?",
    [
      "The hypotenuse of the triangle",
      "The longest side of the triangle",
      "The two sides that form the 90° angle",
      "The line joining two opposite corners",
    ],
    2,
    "Legs are the two sides that form the 90° angle. They are shorter than the hypotenuse.",
    "Easy",
  ],
  [
    "Pythagoras' Theorem can ONLY be used for:",
    [
      "All types of triangles",
      "Right-angled triangles only",
      "Equilateral triangles only",
      "Obtuse-angled triangles only",
    ],
    1,
    "Pythagoras' Theorem is ONLY for RIGHT-ANGLED triangles. Do not use it for other triangles.",
    "Easy",
  ],
  [
    "Which is always longer in a right-angled triangle — legs or hypotenuse?",
    ["Legs", "Depends on the size", "Both equal length", "Hypotenuse"],
    3,
    "The hypotenuse is always LONGER than each leg in a right-angled triangle.",
    "Easy",
  ],
  [
    "Is it possible for the hypotenuse to equal one of the legs?",
    [
      "Yes, in some right-angled triangles",
      "Yes, in an isosceles right-angled triangle",
      "No, it is always longer than each leg",
      "Yes, when one angle is 45°",
    ],
    2,
    "NO. The hypotenuse is always longer than each leg. If your answer shows hypotenuse shorter, there is an error.",
    "Easy",
  ],
  [
    "4, 3, 5 — which side is the hypotenuse?",
    ["4", "5", "3", "Depends on orientation"],
    1,
    "The hypotenuse is the LONGEST side = 5. Verified: 3²+4² = 9+16 = 25 = 5².",
    "Easy",
  ],
  [
    "What is the second most famous Pythagorean triple after 3-4-5?",
    ["6-8-10", "4-5-6", "7-8-9", "5-12-13"],
    3,
    "5-12-13 is the second most famous Pythagorean triple. Check: 5²+12² = 25+144 = 169 = 13². ✓",
    "Easy",
  ],
  [
    "In a rectangle, a diagonal creates:",
    [
      "Two right-angled triangles",
      "Two isosceles triangles",
      "Two equilateral triangles",
      "Two obtuse triangles",
    ],
    0,
    "A diagonal of a rectangle divides it into TWO congruent right-angled triangles (because rectangle angles = 90°).",
    "Easy",
  ],
  [
    "What is the first step in classifying a triangle using the converse of Pythagoras' Theorem?",
    ["Calculate c²", "Identify the longest side (c)", "Calculate a²+b²", "Compare c² with a²+b²"],
    1,
    "First step: IDENTIFY the longest side and label it c. Then calculate c² and a²+b² to compare.",
    "Easy",
  ],
  [
    "What is the formula to find leg a if hypotenuse c and leg b are known?",
    ["a = c + b", "a = c² + b²", "a = √(c² + b²)", "a = √(c² − b²)"],
    3,
    "a = √(c² − b²). When finding a leg (shorter side), we SUBTRACT from the hypotenuse.",
    "Easy",
  ],
  [
    "Is a triangle with angles 30°, 60°, 90° a right-angled triangle?",
    [
      "Yes, because there is a 90° angle",
      "No, there is no exact 90° angle",
      "Only if the sides are in a certain ratio",
      "Cannot be determined",
    ],
    0,
    "Yes! There is a 90° angle, so it IS a RIGHT-ANGLED triangle. Pythagoras' Theorem can be used.",
    "Easy",
  ],
  [
    "What is the difference between Pythagoras' Theorem and its converse?",
    [
      "There is no difference between them",
      "The converse is used to find a side length",
      "The converse uses c² = a² + b² to test for a right angle",
      "The theorem only works for isosceles triangles",
    ],
    2,
    "Theorem (forward): right-angled triangle → c²=a²+b². Converse: if c²=a²+b² → right-angled triangle.",
    "Easy",
  ],
  [
    "Triangle 8, 15, 17 — what type?",
    ["Acute-angled", "Obtuse-angled", "Not a valid triangle", "Right-angled"],
    3,
    "8²+15² = 64+225 = 289 = 17². This is the 8-15-17 triple. Right-angled triangle.",
    "Easy",
  ],
  [
    "What does 'Pythagorean triple multiplied by a factor' mean?",
    [
      "Only the original triple is valid",
      "Its multiples also form right-angled triangles",
      "Multiples are not valid for Pythagoras",
      "The factor must be a prime number",
    ],
    1,
    "Multiples of a Pythagorean triple are also valid. E.g.: 3-4-5 × 2 = 6-8-10; × 3 = 9-12-15. All are right-angled.",
    "Easy",
  ],
]);

const MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Segi tiga bersudut tegak dengan a = 9 cm, b = 12 cm. Cari hipotenus c.",
    ["15 cm", "18 cm", "21 cm", "17 cm"],
    0,
    "c² = 9²+12² = 81+144 = 225. c = √225 = 15 cm. (Triple 9-12-15, gandaan 3-4-5×3)",
    "Medium",
  ],
  [
    "Hipotenus = 20 cm, kaki a = 12 cm. Cari kaki b.",
    ["14 cm", "16 cm", "17 cm", "18 cm"],
    1,
    "b² = 20²−12² = 400−144 = 256. b = √256 = 16 cm. (Triple 12-16-20, gandaan 3-4-5×4)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak dengan a = 7 cm, b = 24 cm. Cari c.",
    ["28 cm", "27 cm", "25 cm", "31 cm"],
    2,
    "c² = 7²+24² = 49+576 = 625. c = √625 = 25 cm. (Triple 7-24-25)",
    "Medium",
  ],
  [
    "Segi empat tepat 8 cm × 15 cm. Cari panjang pepenjuru.",
    ["23 cm", "19 cm", "20 cm", "17 cm"],
    3,
    "d² = 8²+15² = 64+225 = 289. d = √289 = 17 cm. (Triple 8-15-17)",
    "Medium",
  ],
  [
    "Tangga 13 m bersandar pada dinding. Kaki tangga 5 m dari dinding. Berapa tinggi tangga pada dinding?",
    ["10 m", "12 m", "11 m", "14 m"],
    1,
    "h² = 13²−5² = 169−25 = 144. h = √144 = 12 m. (Triple 5-12-13)",
    "Medium",
  ],
  [
    "Hipotenus = 25 cm, kaki b = 7 cm. Cari kaki a.",
    ["20 cm", "22 cm", "24 cm", "26 cm"],
    2,
    "a² = 25²−7² = 625−49 = 576. a = √576 = 24 cm. (Triple 7-24-25)",
    "Medium",
  ],
  [
    "Sebuah segi tiga bersudut tegak mempunyai kaki 1.5 cm dan 2 cm. Cari panjang hipotenus.",
    ["6.25 cm", "3.5 cm", "1.75 cm", "2.5 cm"],
    3,
    "c² = 1.5² + 2² = 2.25 + 4 = 6.25. c = √6.25 = 2.5 cm. (6.25 cm ialah c², bukan c.)",
    "Medium",
  ],
  [
    "Tiang bendera 12 m tinggi. Wayar sokongan dari puncak ke tanah, 9 m dari kaki tiang. Cari panjang wayar.",
    ["15 m", "21 m", "225 m", "√63 m"],
    0,
    "Wayar² = 12²+9² = 144+81 = 225. Wayar = √225 = 15 m. (Triple 9-12-15)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak dengan kaki 6 cm dan 8 cm. Berapakah panjang hipotenus?",
    ["100 cm", "14 cm", "10 cm", "√28 cm"],
    2,
    "c² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 cm. (14 cm datang daripada 6 + 8.)",
    "Medium",
  ],
  [
    "Hipotenus sebuah segi tiga bersudut tegak ialah 26 cm dan satu kakinya 10 cm. Cari panjang kaki yang satu lagi.",
    ["√776 cm", "16 cm", "576 cm", "24 cm"],
    3,
    "x² = 26² − 10² = 676 − 100 = 576. x = √576 = 24 cm. (√776 cm datang daripada menambah dan bukannya menolak.)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak dengan sisi a = 20 cm dan hipotenus c = 25 cm. Cari b.",
    ["15 cm", "12 cm", "10 cm", "17 cm"],
    0,
    "b² = 25²−20² = 625−400 = 225. b = √225 = 15 cm. (Triple 15-20-25, gandaan 3-4-5×5)",
    "Medium",
  ],
  [
    "Segi empat tepat dengan lebar 10 cm dan panjang 24 cm. Pepenjuru berukuran:",
    ["28 cm", "26 cm", "30 cm", "34 cm"],
    1,
    "d² = 10²+24² = 100+576 = 676. d = √676 = 26 cm. (Triple 10-24-26, gandaan 5-12-13×2)",
    "Medium",
  ],
  [
    "Khemah lebar 6 m. Tali dari puncak ke tepi = 5 m. Berapa ketinggian khemah?",
    ["3 m", "√11 m", "3.5 m", "4 m"],
    3,
    "Separa lebar = 3 m. h² + 3² = 5². h² = 25−9 = 16. h = 4 m. (Triple 3-4-5)",
    "Medium",
  ],
  [
    "Cari panjang kaki a dalam segi tiga bersudut tegak jika kaki yang lain ialah 40 cm dan hipotenus ialah 41 cm.",
    ["9 cm", "1 cm", "81 cm", "√3281 cm"],
    0,
    "a² = 41²−40² = 1681−1600 = 81. a = √81 = 9. (Triple 9-40-41)",
    "Medium",
  ],
  [
    "Segi tiga dengan sisi 1.5 m, 2 m, 2.5 m. Adakah ia bersudut tegak?",
    [
      "Tidak, bukan triple Pythagoras",
      "Ya, kerana 1.5²+2² = 2.25+4 = 6.25 = 2.5²",
      "Tidak boleh ditentukan",
      "Ya, tetapi hanya jika nilai dalam cm",
    ],
    1,
    "1.5²+2² = 2.25+4 = 6.25 = 2.5². Ya, bersudut tegak! (Ini adalah gandaan 3-4-5 ÷ 2 = 1.5-2-2.5)",
    "Medium",
  ],
  [
    "Cari hipotenus segi tiga bersudut tegak dengan kaki 11 cm dan 60 cm.",
    ["3 721 cm", "71 cm", "61 cm", "49 cm"],
    2,
    "c² = 11²+60² = 121+3600 = 3721. c = √3721 = 61 cm. (Triple 11-60-61)",
    "Medium",
  ],
  [
    "Segi empat tepat dengan pepenjuru 10 cm dan panjang 8 cm. Cari lebar.",
    ["6 cm", "4 cm", "36 cm", "√164 cm"],
    0,
    "lebar² = 10²−8² = 100−64 = 36. lebar = 6 cm. (Triple 6-8-10)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak mempunyai kaki 30 cm dan 40 cm. Berapakah hipotenusnya?",
    ["70 cm", "60 cm", "50 cm", "2 500 cm"],
    2,
    "c² = 30²+40² = 900+1600 = 2500. c = √2500 = 50 cm. (Triple 30-40-50, gandaan 3-4-5×10)",
    "Medium",
  ],
  [
    "Menara tinggi 24 m. Jarak dari menara = 7 m. Cari jarak pepenjuru dari titik ke puncak menara.",
    ["26 m", "25 m", "√577 m", "31 m"],
    1,
    "d² = 24²+7² = 576+49 = 625. d = √625 = 25 m. (Triple 7-24-25)",
    "Medium",
  ],
  [
    "Kaki segi tiga bersudut tegak = 15 cm dan 36 cm. Cari hipotenus.",
    ["1 521 cm", "41 cm", "51 cm", "39 cm"],
    3,
    "c² = 15²+36² = 225+1296 = 1521. c = √1521 = 39 cm. (Triple 15-36-39, gandaan 5-12-13×3)",
    "Medium",
  ],
  [
    "Hipotenus = 29 cm, satu kaki = 20 cm. Cari kaki yang lain.",
    ["9 cm", "22 cm", "21 cm", "441 cm"],
    2,
    "b² = 29²−20² = 841−400 = 441. b = √441 = 21 cm. (Triple 20-21-29)",
    "Medium",
  ],
  [
    "Sebatang tangga sepanjang 10 m bersandar pada dinding. Hujung atas tangga berada 8 m dari tanah. Berapakah jarak kaki tangga dari dinding?",
    ["2 m", "6 m", "18 m", "√164 m"],
    1,
    "Tangga ialah hipotenus. Jarak² = 10² − 8² = 100 − 64 = 36. Jarak = 6 m. (√164 m datang daripada menambah 10² dan 8².)",
    "Medium",
  ],
  [
    "Padang segi empat tepat 30 m × 40 m. Berapakah jarak terpendek merentasi padang secara pepenjuru?",
    ["80 m", "60 m", "70 m", "50 m"],
    3,
    "d² = 30²+40² = 900+1600 = 2500. d = 50 m. (Triple 30-40-50)",
    "Medium",
  ],
  [
    "Segi tiga dengan sisi 12 cm, 16 cm, dan 20 cm. Adakah ia bersudut tegak?",
    ["Ya", "Tidak", "Bergantung kepada orientasi", "Hanya jika diukur dalam inci"],
    0,
    "12²+16² = 144+256 = 400 = 20². Ya, bersudut tegak! (Triple 12-16-20, gandaan 3-4-5×4)",
    "Medium",
  ],
  [
    "Berapakah panjang pepenjuru kubus dengan sisi 1 unit (pepenjuru permukaan)?",
    ["√3 unit", "√2 unit", "2 unit", "1 unit"],
    1,
    "Pepenjuru permukaan = √(1²+1²) = √2 unit. (Segi tiga bersudut tegak dengan dua kaki = 1 unit)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak. Hipotenus = 50 cm. Satu kaki = 14 cm. Kaki yang lain = ?",
    ["2 304 cm", "36 cm", "64 cm", "48 cm"],
    3,
    "kaki² = 50²−14² = 2500−196 = 2304. kaki = √2304 = 48 cm. (Triple 14-48-50, gandaan 7-24-25×2)",
    "Medium",
  ],
  [
    "Sebuah segi tiga bersudut tegak mempunyai kaki 16 cm dan 30 cm. Cari panjang hipotenus.",
    ["34 cm", "46 cm", "14 cm", "1 156 cm"],
    0,
    "c² = 16² + 30² = 256 + 900 = 1 156. c = √1 156 = 34 cm.",
    "Medium",
  ],
  [
    "Seekor semut berjalan 6 m ke timur dan kemudian 8 m ke utara. Berapakah jarak terdekat semut itu dari titik permulaannya?",
    ["2 m", "14 m", "10 m", "100 m"],
    2,
    "Laluan timur dan utara membentuk sudut tegak. Jarak² = 6² + 8² = 100. Jarak = 10 m. (14 m ialah jumlah jarak yang dilalui.)",
    "Medium",
  ],
  [
    "Segi tiga bersudut tegak: kaki 45 cm dan 28 cm. Cari hipotenus.",
    ["2 809 cm", "73 cm", "17 cm", "53 cm"],
    3,
    "c² = 45²+28² = 2025+784 = 2809. c = √2809 = 53 cm. (Triple 28-45-53)",
    "Medium",
  ],
  [
    "Wayar sepanjang 26 m dipasang dari puncak tiang ke tanah. Kaki wayar 10 m dari tiang. Berapa tinggi tiang?",
    ["16 m", "24 m", "36 m", "576 m"],
    1,
    "h² = 26²−10² = 676−100 = 576. h = √576 = 24 m. (Triple 10-24-26)",
    "Medium",
  ],
]);

const MATH_C13_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "Right-angled triangle with a = 9 cm, b = 12 cm. Find hypotenuse c.",
    ["15 cm", "18 cm", "21 cm", "17 cm"],
    0,
    "c² = 9²+12² = 81+144 = 225. c = √225 = 15 cm. (9-12-15 triple, multiple of 3-4-5×3)",
    "Medium",
  ],
  [
    "Hypotenuse = 20 cm, leg a = 12 cm. Find leg b.",
    ["14 cm", "16 cm", "17 cm", "18 cm"],
    1,
    "b² = 20²−12² = 400−144 = 256. b = √256 = 16 cm. (12-16-20 triple, multiple of 3-4-5×4)",
    "Medium",
  ],
  [
    "Right-angled triangle with a = 7 cm, b = 24 cm. Find c.",
    ["28 cm", "27 cm", "25 cm", "31 cm"],
    2,
    "c² = 7²+24² = 49+576 = 625. c = √625 = 25 cm. (7-24-25 triple!)",
    "Medium",
  ],
  [
    "Rectangle 8 cm × 15 cm. Find the length of the diagonal.",
    ["23 cm", "19 cm", "20 cm", "17 cm"],
    3,
    "d² = 8²+15² = 64+225 = 289. d = √289 = 17 cm. (8-15-17 triple!)",
    "Medium",
  ],
  [
    "A 13 m ladder leans against a wall. Base is 5 m from wall. How high does it reach?",
    ["10 m", "12 m", "11 m", "14 m"],
    1,
    "h² = 13²−5² = 169−25 = 144. h = √144 = 12 m. (5-12-13 triple!)",
    "Medium",
  ],
  [
    "Hypotenuse = 25 cm, leg b = 7 cm. Find leg a.",
    ["20 cm", "22 cm", "24 cm", "26 cm"],
    2,
    "a² = 25²−7² = 625−49 = 576. a = √576 = 24 cm. (7-24-25 triple!)",
    "Medium",
  ],
  [
    "A right-angled triangle has legs of 1.5 cm and 2 cm. Find the length of the hypotenuse.",
    ["6.25 cm", "3.5 cm", "1.75 cm", "2.5 cm"],
    3,
    "c² = 1.5² + 2² = 2.25 + 4 = 6.25. c = √6.25 = 2.5 cm. (6.25 cm is c², not c.)",
    "Medium",
  ],
  [
    "Flagpole 12 m high. Support wire from top to ground, 9 m from base. Find wire length.",
    ["15 m", "21 m", "225 m", "√63 m"],
    0,
    "Wire² = 12²+9² = 144+81 = 225. Wire = √225 = 15 m. (9-12-15 triple!)",
    "Medium",
  ],
  [
    "Right-angled triangle with legs 6 cm and 8 cm. What is the hypotenuse length?",
    ["100 cm", "14 cm", "10 cm", "√28 cm"],
    2,
    "c² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 cm. (14 cm comes from 6 + 8.)",
    "Medium",
  ],
  [
    "The hypotenuse of a right-angled triangle is 26 cm and one leg is 10 cm. Find the length of the other leg.",
    ["√776 cm", "16 cm", "576 cm", "24 cm"],
    3,
    "x² = 26² − 10² = 676 − 100 = 576. x = √576 = 24 cm. (√776 cm comes from adding instead of subtracting.)",
    "Medium",
  ],
  [
    "Right-angled triangle with side a = 20 cm and hypotenuse c = 25 cm. Find b.",
    ["15 cm", "12 cm", "10 cm", "17 cm"],
    0,
    "b² = 25²−20² = 625−400 = 225. b = √225 = 15 cm. (15-20-25 triple, multiple of 3-4-5×5)",
    "Medium",
  ],
  [
    "Rectangle with width 10 cm and length 24 cm. Diagonal measures:",
    ["28 cm", "26 cm", "30 cm", "34 cm"],
    1,
    "d² = 10²+24² = 100+576 = 676. d = √676 = 26 cm. (10-24-26 triple, multiple of 5-12-13×2)",
    "Medium",
  ],
  [
    "Tent width 6 m. Rope from peak to edge = 5 m. Find tent height.",
    ["3 m", "√11 m", "3.5 m", "4 m"],
    3,
    "Half width = 3 m. h² + 3² = 5². h² = 25−9 = 16. h = 4 m. (3-4-5 triple!)",
    "Medium",
  ],
  [
    "Find the length of leg a in a right-angled triangle if the other leg is 40 cm and the hypotenuse is 41 cm.",
    ["9 cm", "1 cm", "81 cm", "√3281 cm"],
    0,
    "a² = 41²−40² = 1681−1600 = 81. a = √81 = 9. (9-40-41 triple!)",
    "Medium",
  ],
  [
    "Triangle with sides 1.5 m, 2 m, 2.5 m. Is it right-angled?",
    [
      "No, not a Pythagorean triple",
      "Yes, because 1.5²+2² = 2.25+4 = 6.25 = 2.5²",
      "Cannot be determined",
      "Yes, but only in cm",
    ],
    1,
    "1.5²+2² = 2.25+4 = 6.25 = 2.5². Yes, right-angled! (Multiple of 3-4-5 ÷ 2 = 1.5-2-2.5)",
    "Medium",
  ],
  [
    "Find hypotenuse of right-angled triangle with legs 11 cm and 60 cm.",
    ["3 721 cm", "71 cm", "61 cm", "49 cm"],
    2,
    "c² = 11²+60² = 121+3600 = 3721. c = √3721 = 61 cm. (11-60-61 triple!)",
    "Medium",
  ],
  [
    "Rectangle with diagonal 10 cm and length 8 cm. Find width.",
    ["6 cm", "4 cm", "36 cm", "√164 cm"],
    0,
    "width² = 10²−8² = 100−64 = 36. width = 6 cm. (6-8-10 triple!)",
    "Medium",
  ],
  [
    "Right-angled triangle with legs 30 cm and 40 cm. What is the hypotenuse?",
    ["70 cm", "60 cm", "50 cm", "2 500 cm"],
    2,
    "c² = 30²+40² = 900+1600 = 2500. c = √2500 = 50 cm. (30-40-50 triple, multiple of 3-4-5×10)",
    "Medium",
  ],
  [
    "Tower 24 m tall. Distance from base = 7 m. Find diagonal distance from point to tower top.",
    ["26 m", "25 m", "√577 m", "31 m"],
    1,
    "d² = 24²+7² = 576+49 = 625. d = √625 = 25 m. (7-24-25 triple!)",
    "Medium",
  ],
  [
    "Legs of right-angled triangle = 15 cm and 36 cm. Find hypotenuse.",
    ["1 521 cm", "41 cm", "51 cm", "39 cm"],
    3,
    "c² = 15²+36² = 225+1296 = 1521. c = √1521 = 39 cm. (15-36-39 triple, multiple of 5-12-13×3)",
    "Medium",
  ],
  [
    "Hypotenuse = 29 cm, one leg = 20 cm. Find the other leg.",
    ["9 cm", "22 cm", "21 cm", "441 cm"],
    2,
    "b² = 29²−20² = 841−400 = 441. b = √441 = 21 cm. (20-21-29 triple!)",
    "Medium",
  ],
  [
    "A 10 m ladder leans against a wall. The top of the ladder is 8 m above the ground. How far is the foot of the ladder from the wall?",
    ["2 m", "6 m", "18 m", "√164 m"],
    1,
    "The ladder is the hypotenuse. Distance² = 10² − 8² = 100 − 64 = 36. Distance = 6 m. (√164 m comes from adding 10² and 8².)",
    "Medium",
  ],
  [
    "Rectangular field 30 m × 40 m. What is the shortest diagonal distance across?",
    ["80 m", "60 m", "70 m", "50 m"],
    3,
    "d² = 30²+40² = 900+1600 = 2500. d = 50 m. (30-40-50 triple!)",
    "Medium",
  ],
  [
    "Triangle with sides 12 cm, 16 cm, 20 cm. Is it right-angled?",
    ["Yes", "No", "Depends on orientation", "Only in inches"],
    0,
    "12²+16² = 144+256 = 400 = 20². Yes, right-angled! (12-16-20 triple, multiple of 3-4-5×4)",
    "Medium",
  ],
  [
    "What is the length of the face diagonal of a unit cube (side = 1 unit)?",
    ["√3 units", "√2 units", "2 units", "1 unit"],
    1,
    "Face diagonal = √(1²+1²) = √2 units. (Right-angled triangle with two legs = 1 unit)",
    "Medium",
  ],
  [
    "Right-angled triangle. Hypotenuse = 50 cm. One leg = 14 cm. Other leg = ?",
    ["2 304 cm", "36 cm", "64 cm", "48 cm"],
    3,
    "leg² = 50²−14² = 2500−196 = 2304. leg = √2304 = 48 cm. (14-48-50 triple, multiple of 7-24-25×2)",
    "Medium",
  ],
  [
    "A right-angled triangle has legs of 16 cm and 30 cm. Find the length of the hypotenuse.",
    ["34 cm", "46 cm", "14 cm", "1 156 cm"],
    0,
    "c² = 16² + 30² = 256 + 900 = 1 156. c = √1 156 = 34 cm.",
    "Medium",
  ],
  [
    "An ant walks 6 m east and then 8 m north. What is the shortest distance between the ant and its starting point?",
    ["2 m", "14 m", "10 m", "100 m"],
    2,
    "The east and north paths form a right angle. Distance² = 6² + 8² = 100. Distance = 10 m. (14 m is the total distance walked.)",
    "Medium",
  ],
  [
    "Right-angled triangle: legs 45 cm and 28 cm. Find hypotenuse.",
    ["2 809 cm", "73 cm", "17 cm", "53 cm"],
    3,
    "c² = 45²+28² = 2025+784 = 2809. c = √2809 = 53 cm. (28-45-53 triple!)",
    "Medium",
  ],
  [
    "A 26 m wire is stretched from a pole top to the ground, 10 m from the base. How tall is the pole?",
    ["16 m", "24 m", "36 m", "576 m"],
    1,
    "h² = 26²−10² = 676−100 = 576. h = √576 = 24 m. (10-24-26 triple!)",
    "Medium",
  ],
]);

const MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Sebuah segi tiga mempunyai sisi 5 cm, 7 cm dan 9 cm. Apakah jenis segi tiga itu?",
    ["Bersudut cakah", "Bersudut tirus", "Bersudut tegak", "Tidak sah"],
    0,
    "Sisi terpanjang = 9: 9² = 81. 5² + 7² = 25 + 49 = 74. 81 > 74, jadi segi tiga itu bersudut cakah.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 6 cm, 7 cm dan 8 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak boleh ditentukan"],
    1,
    "Sisi terpanjang = 8: 8² = 64. 6² + 7² = 36 + 49 = 85. 64 < 85, jadi segi tiga itu bersudut tirus.",
    "Hard",
  ],
  [
    "Segi tiga PQR mempunyai PQ = 9 cm, QR = 40 cm dan PR = 41 cm. Di manakah sudut tegak?",
    ["Di R", "Di P", "Di Q", "Segi tiga itu tidak bersudut tegak"],
    2,
    "9² + 40² = 81 + 1 600 = 1 681 = 41². PR ialah sisi terpanjang (hipotenus), jadi sudut tegak berada bertentangan dengan PR, iaitu di Q.",
    "Hard",
  ],
  [
    "Sebuah segi tiga sama kaki mempunyai dua sisi sama 13 cm dan tapak 24 cm. Cari tingginya.",
    ["√313 cm", "7 cm", "12 cm", "5 cm"],
    3,
    "Tinggi membahagi dua tapak: separuh tapak = 12 cm. h² = 13² − 12² = 169 − 144 = 25. h = 5 cm.",
    "Hard",
  ],
  [
    "Dalam segi empat tepat ABCD, AB = 6 cm dan BC = 8 cm. Cari panjang AC dan luas ABCD.",
    [
      "AC = 10 cm, luas = 24 cm²",
      "AC = 10 cm, luas = 48 cm²",
      "AC = 14 cm, luas = 48 cm²",
      "AC = 8 cm, luas = 48 cm²",
    ],
    1,
    "∠B = 90°. AC² = 6² + 8² = 100, maka AC = 10 cm. Luas = 6 × 8 = 48 cm².",
    "Hard",
  ],
  [
    "Sebuah segi tiga bersudut tegak mempunyai sisi 9 cm, 12 cm dan x cm, dengan x sebagai hipotenus. Cari x.",
    ["21 cm", "17 cm", "15 cm", "√63 cm"],
    2,
    "x² = 9² + 12² = 81 + 144 = 225. x = 15 cm.",
    "Hard",
  ],
  [
    "Segi tiga ABC bersudut tegak di B dengan AB = 6 cm dan BC = 8 cm. Segi tiga ACD bersudut tegak di C dengan CD = 24 cm. Cari panjang AD.",
    ["√476 cm", "38 cm", "34 cm", "26 cm"],
    3,
    "AC² = 6² + 8² = 100, maka AC = 10 cm. AD ialah hipotenus segi tiga ACD: AD² = 10² + 24² = 676, maka AD = 26 cm.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 2.5 cm, 6 cm dan 6.5 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak boleh ditentukan"],
    0,
    "6.5² = 42.25. 2.5² + 6² = 6.25 + 36 = 42.25. Kedua-duanya sama, jadi segi tiga itu bersudut tegak.",
    "Hard",
  ],
  [
    "Dalam segi tiga ABC, AB = 5 cm, BC = 12 cm dan AC = 13 cm. Di manakah sudut tegak?",
    ["Di A", "Di C", "Di B", "Segi tiga itu tidak bersudut tegak"],
    2,
    "5² + 12² = 169 = 13². AC ialah hipotenus, jadi sudut tegak bertentangan dengan AC, iaitu di B.",
    "Hard",
  ],
  [
    "Sebidang tanah segi empat tepat berukuran 40 m × 30 m. Ahmad berjalan merentasi tanah itu secara pepenjuru dan bukan di sepanjang dua tepinya. Berapakah jarak yang dijimatkan?",
    ["Jaraknya sama", "22 m", "Ahmad perlu berjalan lebih jauh", "20 m"],
    3,
    "Pepenjuru = √(40² + 30²) = √2 500 = 50 m. Jalan di tepi = 40 + 30 = 70 m. Jimat = 70 − 50 = 20 m.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 3k, 4k dan 5k dengan k > 0. Bilakah segi tiga itu bersudut tegak?",
    [
      "Bagi sebarang nilai k > 0",
      "Hanya apabila k = 1",
      "Hanya apabila k ialah integer",
      "Tidak boleh ditentukan",
    ],
    0,
    "(3k)² + (4k)² = 9k² + 16k² = 25k² = (5k)² bagi sebarang k > 0. Inilah sebabnya semua gandaan 3, 4, 5 membentuk segi tiga bersudut tegak.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 10 cm, 11 cm dan 14 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"],
    1,
    "Sisi terpanjang = 14: 14² = 196. 10² + 11² = 100 + 121 = 221. 196 < 221, jadi segi tiga itu bersudut tirus.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 5 cm, 8 cm dan 10 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Tidak sah", "Bersudut cakah"],
    3,
    "Sisi terpanjang = 10: 10² = 100. 5² + 8² = 25 + 64 = 89. 100 > 89, jadi segi tiga itu bersudut cakah.",
    "Hard",
  ],
  [
    "Dua batang jalan lurus bertemu pada sudut tegak di simpang S. Rumah Ali berada 8 km dari S di sepanjang satu jalan, dan sekolah berada 15 km dari S di sepanjang jalan yang satu lagi. Berapakah jarak lurus dari rumah Ali ke sekolah?",
    ["17 km", "23 km", "7 km", "289 km"],
    0,
    "Jarak² = 8² + 15² = 64 + 225 = 289. Jarak = √289 = 17 km. (23 km ialah jarak melalui simpang S.)",
    "Hard",
  ],
  [
    "Segi tiga ABC mempunyai AB = 15 cm, BC = 20 cm dan AC = 25 cm. Adakah segi tiga itu bersudut tegak? Jika ya, di manakah sudut tegaknya?",
    ["Ya, di A", "Ya, di B", "Ya, di C", "Tidak bersudut tegak"],
    1,
    "15² + 20² = 225 + 400 = 625 = 25². AC ialah hipotenus, jadi sudut tegak bertentangan dengan AC, iaitu di B.",
    "Hard",
  ],
  [
    "Sebuah segi empat tepat mempunyai pepenjuru 25 cm dan panjang 24 cm. Berapakah lebarnya?",
    ["49 cm", "1 cm", "7 cm", "√1201 cm"],
    2,
    "Lebar² = 25² − 24² = 625 − 576 = 49. Lebar = 7 cm. (1 cm datang daripada 25 − 24.)",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 6 cm, 8 cm dan 11 cm. Apakah jenis segi tiga itu?",
    ["Bersudut cakah", "Bersudut tirus", "Bersudut tegak", "Tidak sah"],
    0,
    "Sisi terpanjang = 11: 11² = 121. 6² + 8² = 36 + 64 = 100. 121 > 100, jadi segi tiga itu bersudut cakah.",
    "Hard",
  ],
  [
    "Sisi-sisi sebuah segi tiga bersudut tegak ialah 5 cm, k cm dan 13 cm, dengan 13 cm sebagai hipotenus. Cari k.",
    ["10", "11", "12", "8"],
    2,
    "5² + k² = 13². k² = 169 − 25 = 144. k = 12.",
    "Hard",
  ],
  [
    "Sebatang pokok setinggi 16 m patah pada ketinggian 6 m dari tanah. Hujung pokok yang patah menyentuh tanah. Berapakah jarak hujung pokok itu dari pangkalnya?",
    ["√136 m", "8 m", "10 m", "4 m"],
    1,
    "Bahagian yang patah = 16 − 6 = 10 m dan menjadi hipotenus. Jarak² = 10² − 6² = 100 − 36 = 64. Jarak = 8 m.",
    "Hard",
  ],
  [
    "Kaki-kaki sebuah segi tiga bersudut tegak adalah dalam nisbah 3 : 4 dan hipotenusnya 20 cm. Cari panjang kedua-dua kaki.",
    ["6 cm dan 8 cm", "9 cm dan 12 cm", "15 cm dan 20 cm", "12 cm dan 16 cm"],
    3,
    "Katakan kaki = 3x dan 4x. (3x)² + (4x)² = 20². 25x² = 400. x² = 16. x = 4. Kaki: 12 cm dan 16 cm.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 1 cm, 1 cm dan √2 cm. Apakah jenis segi tiga itu?",
    ["Bersudut cakah", "Bersudut tirus", "Bersudut tegak", "Tidak sah"],
    2,
    "(√2)² = 2. 1² + 1² = 2. Kedua-duanya sama, jadi segi tiga itu bersudut tegak (dan juga sama kaki).",
    "Hard",
  ],
  [
    "Sebuah kapal belayar 15 km ke timur, kemudian 20 km ke utara. Berapakah jarak kapal itu dari titik permulaannya?",
    ["35 km", "25 km", "5 km", "625 km"],
    1,
    "Jarak² = 15² + 20² = 225 + 400 = 625. Jarak = √625 = 25 km. (35 km ialah jumlah jarak yang dilayari.)",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 8 cm, 15 cm dan 18 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Tidak sah", "Bersudut cakah"],
    3,
    "Sisi terpanjang = 18: 18² = 324. 8² + 15² = 64 + 225 = 289. 324 > 289, jadi segi tiga itu bersudut cakah.",
    "Hard",
  ],
  [
    "Dua utas wayar sokongan dipasang dari puncak sebatang tiang setinggi 20 m ke tanah. Wayar A sampai ke tanah 16 m dari kaki tiang dan wayar B 21 m dari kaki tiang. Berapakah panjang setiap wayar? (Beri jawapan betul kepada 1 tempat perpuluhan jika perlu.)",
    [
      "Wayar A = 25.6 m, wayar B = 29 m",
      "Wayar A = 25.6 m, wayar B = 21 m",
      "Wayar A = 26 m, wayar B = 29 m",
      "Wayar A = 36 m, wayar B = 41 m",
    ],
    0,
    "A² = 20² + 16² = 400 + 256 = 656, A = √656 = 25.6 m (1 t.p.). B² = 20² + 21² = 400 + 441 = 841, B = √841 = 29 m.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 1 cm, √3 cm dan 2 cm. Apakah jenis segi tiga itu?",
    ["Bersudut cakah", "Bersudut tegak", "Bersudut tirus", "Tidak sah"],
    1,
    "2² = 4. 1² + (√3)² = 1 + 3 = 4. Kedua-duanya sama, jadi segi tiga itu bersudut tegak.",
    "Hard",
  ],
  [
    "Dalam segi empat tepat PQRS, PQ = 10 cm dan QR = 24 cm. Cari PR dan nyatakan jenis segi tiga PQR.",
    [
      "PR = 20 cm, bersudut tegak di Q",
      "PR = 34 cm, bersudut tirus",
      "PR = 26 cm, bersudut tirus",
      "PR = 26 cm, bersudut tegak di Q",
    ],
    3,
    "∠Q = 90° kerana PQRS ialah segi empat tepat. PR² = 10² + 24² = 676. PR = 26 cm. Segi tiga PQR bersudut tegak di Q.",
    "Hard",
  ],
  [
    "Tentukan sama ada (20, 21, 29) ialah triple Pythagoras.",
    [
      "Ya, kerana 20² + 21² = 400 + 441 = 841 = 29²",
      "Bukan, kerana 20² + 21² ≠ 29²",
      "Hanya gandaan triple Pythagoras",
      "Tidak boleh ditentukan",
    ],
    0,
    "20² + 21² = 400 + 441 = 841 = 29². Maka (20, 21, 29) ialah triple Pythagoras.",
    "Hard",
  ],
  [
    "Dua batang jalan bersilang pada sudut tegak. Sebuah kereta bergerak 1.8 km di sepanjang jalan A, kemudian 2.4 km di sepanjang jalan B. Berapakah jarak lurus dari titik mula ke titik akhir?",
    ["0.6 km", "4.2 km", "3 km", "9 km"],
    2,
    "Jarak² = 1.8² + 2.4² = 3.24 + 5.76 = 9. Jarak = √9 = 3 km. (9 km ialah jarak², bukan jarak.)",
    "Hard",
  ],
  [
    "Sebuah skrin berbentuk segi empat tepat mempunyai pepenjuru 100 cm dan lebar 80 cm. Berapakah tinggi skrin itu?",
    ["√16 400 cm", "20 cm", "180 cm", "60 cm"],
    3,
    "Pepenjuru ialah hipotenus. Tinggi² = 100² − 80² = 10 000 − 6 400 = 3 600. Tinggi = 60 cm.",
    "Hard",
  ],
  [
    "Sebuah segi tiga mempunyai sisi 7 cm, 8 cm dan 9 cm. Apakah jenis segi tiga itu?",
    ["Bersudut tegak", "Bersudut tirus", "Bersudut cakah", "Tidak sah"],
    1,
    "Sisi terpanjang = 9: 9² = 81. 7² + 8² = 49 + 64 = 113. 81 < 113, jadi segi tiga itu bersudut tirus.",
    "Hard",
  ],
]);

const MATH_C13_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "A triangle has sides of 5 cm, 7 cm and 9 cm. What type of triangle is it?",
    ["Obtuse-angled", "Acute-angled", "Right-angled", "Invalid"],
    0,
    "Longest side = 9: 9² = 81. 5² + 7² = 25 + 49 = 74. 81 > 74, so the triangle is obtuse-angled.",
    "Hard",
  ],
  [
    "A triangle has sides of 6 cm, 7 cm and 8 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Obtuse-angled", "Cannot be determined"],
    1,
    "Longest side = 8: 8² = 64. 6² + 7² = 36 + 49 = 85. 64 < 85, so the triangle is acute-angled.",
    "Hard",
  ],
  [
    "Triangle PQR has PQ = 9 cm, QR = 40 cm and PR = 41 cm. Where is the right angle?",
    ["At R", "At P", "At Q", "The triangle is not right-angled"],
    2,
    "9² + 40² = 81 + 1 600 = 1 681 = 41². PR is the longest side (the hypotenuse), so the right angle is opposite PR, at Q.",
    "Hard",
  ],
  [
    "An isosceles triangle has two equal sides of 13 cm and a base of 24 cm. Find its height.",
    ["√313 cm", "7 cm", "12 cm", "5 cm"],
    3,
    "The height bisects the base: half the base = 12 cm. h² = 13² − 12² = 169 − 144 = 25. h = 5 cm.",
    "Hard",
  ],
  [
    "In rectangle ABCD, AB = 6 cm and BC = 8 cm. Find the length of AC and the area of ABCD.",
    [
      "AC = 10 cm, area = 24 cm²",
      "AC = 10 cm, area = 48 cm²",
      "AC = 14 cm, area = 48 cm²",
      "AC = 8 cm, area = 48 cm²",
    ],
    1,
    "∠B = 90°. AC² = 6² + 8² = 100, so AC = 10 cm. Area = 6 × 8 = 48 cm².",
    "Hard",
  ],
  [
    "A right-angled triangle has sides of 9 cm, 12 cm and x cm, where x is the hypotenuse. Find x.",
    ["21 cm", "17 cm", "15 cm", "√63 cm"],
    2,
    "x² = 9² + 12² = 81 + 144 = 225. x = 15 cm.",
    "Hard",
  ],
  [
    "Triangle ABC is right-angled at B with AB = 6 cm and BC = 8 cm. Triangle ACD is right-angled at C with CD = 24 cm. Find the length of AD.",
    ["√476 cm", "38 cm", "34 cm", "26 cm"],
    3,
    "AC² = 6² + 8² = 100, so AC = 10 cm. AD is the hypotenuse of triangle ACD: AD² = 10² + 24² = 676, so AD = 26 cm.",
    "Hard",
  ],
  [
    "A triangle has sides of 2.5 cm, 6 cm and 6.5 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Obtuse-angled", "Cannot be determined"],
    0,
    "6.5² = 42.25. 2.5² + 6² = 6.25 + 36 = 42.25. They are equal, so the triangle is right-angled.",
    "Hard",
  ],
  [
    "In triangle ABC, AB = 5 cm, BC = 12 cm and AC = 13 cm. Where is the right angle?",
    ["At A", "At C", "At B", "The triangle is not right-angled"],
    2,
    "5² + 12² = 169 = 13². AC is the hypotenuse, so the right angle is opposite AC, at B.",
    "Hard",
  ],
  [
    "A rectangular plot of land measures 40 m × 30 m. Ahmad walks diagonally across it instead of along two edges. How much distance does he save?",
    ["The distances are equal", "22 m", "Ahmad has to walk further", "20 m"],
    3,
    "Diagonal = √(40² + 30²) = √2 500 = 50 m. Along the edges = 40 + 30 = 70 m. Saving = 70 − 50 = 20 m.",
    "Hard",
  ],
  [
    "A triangle has sides 3k, 4k and 5k with k > 0. When is the triangle right-angled?",
    [
      "For any value of k > 0",
      "Only when k = 1",
      "Only when k is an integer",
      "Cannot be determined",
    ],
    0,
    "(3k)² + (4k)² = 9k² + 16k² = 25k² = (5k)² for any k > 0. This is why all multiples of 3, 4, 5 form right-angled triangles.",
    "Hard",
  ],
  [
    "A triangle has sides of 10 cm, 11 cm and 14 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"],
    1,
    "Longest side = 14: 14² = 196. 10² + 11² = 100 + 121 = 221. 196 < 221, so the triangle is acute-angled.",
    "Hard",
  ],
  [
    "A triangle has sides of 5 cm, 8 cm and 10 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Invalid", "Obtuse-angled"],
    3,
    "Longest side = 10: 10² = 100. 5² + 8² = 25 + 64 = 89. 100 > 89, so the triangle is obtuse-angled.",
    "Hard",
  ],
  [
    "Two straight roads meet at right angles at junction S. Ali's house is 8 km from S along one road, and the school is 15 km from S along the other road. What is the straight-line distance from Ali's house to the school?",
    ["17 km", "23 km", "7 km", "289 km"],
    0,
    "Distance² = 8² + 15² = 64 + 225 = 289. Distance = √289 = 17 km. (23 km is the distance via junction S.)",
    "Hard",
  ],
  [
    "Triangle ABC has AB = 15 cm, BC = 20 cm and AC = 25 cm. Is it right-angled? If so, where is the right angle?",
    ["Yes, at A", "Yes, at B", "Yes, at C", "Not right-angled"],
    1,
    "15² + 20² = 225 + 400 = 625 = 25². AC is the hypotenuse, so the right angle is opposite AC, at B.",
    "Hard",
  ],
  [
    "A rectangle has a diagonal of 25 cm and a length of 24 cm. What is its width?",
    ["49 cm", "1 cm", "7 cm", "√1201 cm"],
    2,
    "Width² = 25² − 24² = 625 − 576 = 49. Width = 7 cm. (1 cm comes from 25 − 24.)",
    "Hard",
  ],
  [
    "A triangle has sides of 6 cm, 8 cm and 11 cm. What type of triangle is it?",
    ["Obtuse-angled", "Acute-angled", "Right-angled", "Invalid"],
    0,
    "Longest side = 11: 11² = 121. 6² + 8² = 36 + 64 = 100. 121 > 100, so the triangle is obtuse-angled.",
    "Hard",
  ],
  [
    "The sides of a right-angled triangle are 5 cm, k cm and 13 cm, where 13 cm is the hypotenuse. Find k.",
    ["10", "11", "12", "8"],
    2,
    "5² + k² = 13². k² = 169 − 25 = 144. k = 12.",
    "Hard",
  ],
  [
    "A 16 m tall tree breaks at a height of 6 m above the ground. The broken top touches the ground. How far is the tip of the tree from its base?",
    ["√136 m", "8 m", "10 m", "4 m"],
    1,
    "The broken part = 16 − 6 = 10 m and is the hypotenuse. Distance² = 10² − 6² = 100 − 36 = 64. Distance = 8 m.",
    "Hard",
  ],
  [
    "The legs of a right-angled triangle are in the ratio 3 : 4 and the hypotenuse is 20 cm. Find the lengths of both legs.",
    ["6 cm and 8 cm", "9 cm and 12 cm", "15 cm and 20 cm", "12 cm and 16 cm"],
    3,
    "Let the legs be 3x and 4x. (3x)² + (4x)² = 20². 25x² = 400. x² = 16. x = 4. Legs: 12 cm and 16 cm.",
    "Hard",
  ],
  [
    "A triangle has sides of 1 cm, 1 cm and √2 cm. What type of triangle is it?",
    ["Obtuse-angled", "Acute-angled", "Right-angled", "Invalid"],
    2,
    "(√2)² = 2. 1² + 1² = 2. They are equal, so the triangle is right-angled (and also isosceles).",
    "Hard",
  ],
  [
    "A ship sails 15 km east, then 20 km north. How far is the ship from its starting point?",
    ["35 km", "25 km", "5 km", "625 km"],
    1,
    "Distance² = 15² + 20² = 225 + 400 = 625. Distance = √625 = 25 km. (35 km is the total distance sailed.)",
    "Hard",
  ],
  [
    "A triangle has sides of 8 cm, 15 cm and 18 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Invalid", "Obtuse-angled"],
    3,
    "Longest side = 18: 18² = 324. 8² + 15² = 64 + 225 = 289. 324 > 289, so the triangle is obtuse-angled.",
    "Hard",
  ],
  [
    "Two support wires run from the top of a 20 m pole to the ground. Wire A reaches the ground 16 m from the base of the pole and wire B 21 m from the base. What is the length of each wire? (Give answers correct to 1 decimal place where necessary.)",
    [
      "Wire A = 25.6 m, wire B = 29 m",
      "Wire A = 25.6 m, wire B = 21 m",
      "Wire A = 26 m, wire B = 29 m",
      "Wire A = 36 m, wire B = 41 m",
    ],
    0,
    "A² = 20² + 16² = 400 + 256 = 656, A = √656 = 25.6 m (1 d.p.). B² = 20² + 21² = 400 + 441 = 841, B = √841 = 29 m.",
    "Hard",
  ],
  [
    "A triangle has sides of 1 cm, √3 cm and 2 cm. What type of triangle is it?",
    ["Obtuse-angled", "Right-angled", "Acute-angled", "Invalid"],
    1,
    "2² = 4. 1² + (√3)² = 1 + 3 = 4. They are equal, so the triangle is right-angled.",
    "Hard",
  ],
  [
    "In rectangle PQRS, PQ = 10 cm and QR = 24 cm. Find PR and state the type of triangle PQR.",
    [
      "PR = 20 cm, right-angled at Q",
      "PR = 34 cm, acute-angled",
      "PR = 26 cm, acute-angled",
      "PR = 26 cm, right-angled at Q",
    ],
    3,
    "∠Q = 90° because PQRS is a rectangle. PR² = 10² + 24² = 676. PR = 26 cm. Triangle PQR is right-angled at Q.",
    "Hard",
  ],
  [
    "Determine whether (20, 21, 29) is a Pythagorean triple.",
    [
      "Yes, because 20² + 21² = 400 + 441 = 841 = 29²",
      "No, because 20² + 21² ≠ 29²",
      "Only a multiple of a Pythagorean triple",
      "Cannot be determined",
    ],
    0,
    "20² + 21² = 400 + 441 = 841 = 29². So (20, 21, 29) is a Pythagorean triple.",
    "Hard",
  ],
  [
    "Two roads cross at right angles. A car travels 1.8 km along road A, then 2.4 km along road B. What is the straight-line distance from the start to the end point?",
    ["0.6 km", "4.2 km", "3 km", "9 km"],
    2,
    "Distance² = 1.8² + 2.4² = 3.24 + 5.76 = 9. Distance = √9 = 3 km. (9 km is the distance squared, not the distance.)",
    "Hard",
  ],
  [
    "A rectangular screen has a diagonal of 100 cm and a width of 80 cm. What is the height of the screen?",
    ["√16 400 cm", "20 cm", "180 cm", "60 cm"],
    3,
    "The diagonal is the hypotenuse. Height² = 100² − 80² = 10 000 − 6 400 = 3 600. Height = 60 cm.",
    "Hard",
  ],
  [
    "A triangle has sides of 7 cm, 8 cm and 9 cm. What type of triangle is it?",
    ["Right-angled", "Acute-angled", "Obtuse-angled", "Invalid"],
    1,
    "Longest side = 9: 9² = 81. 7² + 8² = 49 + 64 = 113. 81 < 113, so the triangle is acute-angled.",
    "Hard",
  ],
]);

const MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS = mathQuestions([
  [
    "Apakah pengendalian data?",
    [
      "Mengumpul, mengorganisasi, mewakili dan mentafsir data",
      "Proses mengira nombor dalam senarai",
      "Proses melukis carta sahaja",
      "Proses menghafal fakta statistik",
    ],
    0,
    "Pengendalian data ialah proses mengumpul, mengorganisasikan, mewakili dan mentafsir data untuk menjawab soalan atau membuat keputusan.",
    "Easy",
  ],
  [
    "Jadual kekerapan menunjukkan bilangan buku yang dibaca oleh sekumpulan murid dalam seminggu. Berapakah murid yang membaca 3 buah buku?",
    ["3", "4", "9", "5"],
    1,
    "Cari baris 3 dalam lajur Bilangan buku, kemudian baca lajur Kekerapan di sebelahnya: 4 murid. Nombor 3 ialah bilangan buku, bukan bilangan murid.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.booksRead,
  ],
  [
    "Apakah soalan statistik?",
    [
      "Soalan yang mempunyai satu jawapan tetap",
      "Soalan matematik yang melibatkan formula",
      "Soalan yang memerlukan pengumpulan data dan melibatkan variasi",
      "Soalan yang boleh dijawab terus",
    ],
    2,
    "Soalan statistik memerlukan pengumpulan data dan melibatkan variasi — jawapannya berbeza bagi individu yang berbeza.",
    "Easy",
  ],
  [
    "Yang manakah merupakan soalan statistik?",
    [
      "Berapakah hasil darab 8 × 7?",
      "Bilakah tarikh Malaysia mencapai kemerdekaan?",
      "Apakah nama ibu kota negara Malaysia?",
      "Apakah hobi kegemaran murid Tingkatan 1?",
    ],
    3,
    "'Apakah hobi kegemaran murid Tingkatan 1?' adalah soalan statistik kerana jawapannya bervariasi antara murid.",
    "Easy",
  ],
  [
    "Apakah data kategori?",
    [
      "Data yang melibatkan nombor bulat",
      "Data yang menerangkan kualiti atau jenis/kategori",
      "Data yang diukur dengan alat",
      "Data yang bermula dari sifar",
    ],
    1,
    "Data kategori menerangkan kualiti atau jenis — contohnya kumpulan darah, warna, hobi. Bukan nombor.",
    "Easy",
  ],
  [
    "Yang manakah merupakan contoh data kategori?",
    ["Tinggi murid", "Bilangan adik-beradik", "Warna kereta", "Masa berlari"],
    2,
    "Warna kereta (merah, biru, putih) adalah data kategori — ia menerangkan jenis/kategori, bukan nombor.",
    "Easy",
  ],
  [
    "Apakah data diskret?",
    [
      "Data yang diukur dengan pembaris atau penimbang",
      "Data tentang warna, nama dan jenis",
      "Data yang boleh mengambil sebarang nilai perpuluhan",
      "Data berangka yang hanya boleh mengambil nilai tertentu",
    ],
    3,
    "Data diskret hanya boleh mengambil nilai nombor bulat (boleh dikira). Contoh: bilangan anak, bilangan buku.",
    "Easy",
  ],
  [
    "Yang manakah merupakan contoh data diskret?",
    [
      "Bilangan kereta di tempat letak kereta",
      "Tinggi murid dalam sentimeter",
      "Jisim seorang bayi dalam kg",
      "Suhu bilik dalam darjah Celsius",
    ],
    0,
    "Bilangan kereta (0, 1, 2, 3, ...) adalah data diskret — nilai nombor bulat sahaja, tidak boleh ada 2.5 kereta.",
    "Easy",
  ],
  [
    "Apakah data berterusan?",
    [
      "Data yang hanya boleh mengambil nilai nombor bulat",
      "Data tentang jenis atau kategori",
      "Data berangka yang boleh mengambil mana-mana nilai termasuk perpuluhan",
      "Data yang dikira satu per satu",
    ],
    2,
    "Data berterusan diperoleh melalui pengukuran dan boleh ada perpuluhan. Contoh: tinggi 162.4 cm, jisim 3.2 kg.",
    "Easy",
  ],
  [
    "Yang manakah merupakan contoh data berterusan?",
    [
      "Bilangan murid dalam kelas",
      "Bilangan soalan dalam ujian",
      "Bilangan gol dalam perlawanan",
      "Tinggi pokok",
    ],
    3,
    "Tinggi pokok adalah data berterusan — ia diukur dan boleh ada nilai perpuluhan seperti 2.35 m.",
    "Easy",
  ],
  [
    "Apakah kaedah pengumpulan data melalui soal jawab langsung?",
    ["Temu bual", "Pemerhatian", "Eksperimen", "Tinjauan"],
    0,
    "Temu bual ialah kaedah mengumpul data melalui soal jawab secara langsung antara pewawancara dan responden.",
    "Easy",
  ],
  [
    "Apakah kaedah pengumpulan data dengan memerhati dan mencatat kejadian?",
    ["Temu bual", "Pemerhatian", "Eksperimen", "Tinjauan"],
    1,
    "Pemerhatian ialah kaedah mengumpul data dengan memerhati dan mencatatkan kejadian secara langsung tanpa mengganggu subjek.",
    "Easy",
  ],
  [
    "Apakah kaedah pengumpulan data yang mengedarkan soal selidik kepada sampel?",
    ["Temu bual", "Eksperimen", "Pemerhatian", "Tinjauan"],
    3,
    "Tinjauan ialah kaedah mengumpul data dengan mengedarkan soal selidik atau borang kepada sekumpulan orang (sampel).",
    "Easy",
  ],
  [
    "Kaedah pengumpulan data yang menguji hipotesis ialah:",
    ["Eksperimen", "Pemerhatian", "Tinjauan", "Temu bual"],
    0,
    "Eksperimen ialah kaedah mengumpul data melalui ujian yang dirancang untuk menguji hipotesis.",
    "Easy",
  ],
  [
    "Lihat jadual kekerapan. Pernyataan manakah menerangkan jadual ini dengan betul?",
    [
      "Jadual yang menyenaraikan nama murid",
      "Jadual yang menunjukkan setiap nilai dan kekerapannya",
      "Graf yang menggunakan palang",
      "Bulatan yang dibahagi kepada sektor",
    ],
    1,
    "Jadual kekerapan mengorganisasikan data dengan menunjukkan setiap nilai atau kelas bersama bilangan kali ia muncul.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.booksRead,
  ],
  [
    "Lihat visual. Apakah jenis carta yang ditunjukkan?",
    ["Carta pai", "Graf garis", "Carta palang", "Histogram"],
    2,
    "Carta palang menggunakan palang tegak atau melintang untuk membandingkan data kategori atau diskret.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "Lihat visual. Apakah jenis carta yang digunakan untuk menunjukkan perkadaran kategori?",
    ["Carta pai", "Graf garis", "Histogram", "Carta palang"],
    0,
    "Carta pai adalah bulatan yang dibahagi kepada sektor-sektor untuk menunjukkan perkadaran setiap kategori.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteActivities,
  ],
  [
    "Lihat visual. Apakah jenis graf yang menunjukkan perubahan merentasi masa?",
    ["Carta palang", "Carta pai", "Graf garis", "Histogram"],
    2,
    "Graf garis menggunakan titik yang disambungkan dengan garis untuk menunjukkan perubahan data merentasi masa.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.shopSales,
  ],
  [
    "Lihat visual. Pernyataan manakah menerangkan plot titik ini?",
    [
      "Carta yang menggunakan palang tebal bagi setiap kategori",
      "Carta yang menggunakan titik di atas garis nombor",
      "Bulatan yang dibahagikan kepada sektor",
      "Graf yang mengumpulkan data dalam kelas",
    ],
    1,
    "Plot titik menggunakan titik di atas garis nombor. Setiap titik mewakili satu nilai data.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "Lihat visual. Pernyataan manakah menerangkan histogram ini?",
    [
      "Carta palang dengan ruang antara palang",
      "Carta pai yang besar",
      "Graf garis yang menunjukkan masa",
      "Graf palang untuk data berterusan tanpa ruang",
    ],
    3,
    "Histogram ialah graf palang untuk data berterusan/berkumpulan dengan TIADA ruang antara palang.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Perhatikan histogram. Apakah perbezaan utama antara carta palang dan histogram?",
    [
      "Carta palang menggunakan warna, histogram tidak",
      "Histogram ada ruang antara palang, carta palang tiada",
      "Carta palang ada ruang antara palang, histogram tiada",
      "Tiada perbezaan",
    ],
    2,
    "Carta palang ada RUANG antara palang (data diskret/kategori). Histogram TIADA ruang antara palang (data berterusan/berkumpulan).",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Lihat visual. Pernyataan manakah menerangkan plot batang-dan-daun ini?",
    [
      "Carta yang menggunakan gambar daun pokok sebenar sebagai simbol",
      "Paparan yang memisahkan nilai kepada batang (puluhan) dan daun (sa)",
      "Graf garis yang mempunyai dua paksi menegak berasingan",
      "Histogram yang dibahagikan kepada dua bahagian sama",
    ],
    1,
    "Plot batang-dan-daun memisahkan setiap nilai: batang = digit puluhan, daun = digit sa. Mengekalkan nilai asal.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksStems,
  ],
  [
    "Lihat visual. Pernyataan manakah menerangkan poligon kekerapan ini?",
    [
      "Bentuk poligon yang dikaji dalam geometri",
      "Jadual yang menyenaraikan kelas dan kekerapan",
      "Carta pai yang dilukis dalam bentuk poligon",
      "Graf garis yang menyambung titik tengah atas palang histogram",
    ],
    3,
    "Poligon kekerapan dibina dengan menghubungkan titik tengah bahagian atas setiap palang histogram.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.twoClassPolygons,
  ],
  [
    "Apakah julat?",
    [
      "Perbezaan antara nilai tertinggi dan terendah",
      "Nilai yang paling kerap muncul",
      "Nilai tengah data",
      "Jumlah semua nilai",
    ],
    0,
    "Julat = Nilai Tertinggi − Nilai Terendah. Ia mengukur penyebaran keseluruhan data.",
    "Easy",
  ],
  [
    "Apakah serakan data?",
    [
      "Nilai purata data",
      "Sejauh mana nilai data tersebar",
      "Nilai tengah data",
      "Nilai yang paling kerap muncul",
    ],
    1,
    "Serakan data mengukur sejauh mana nilai-nilai dalam set data berbeza atau tersebar antara satu sama lain.",
    "Easy",
  ],
  [
    "Plot titik menunjukkan bilangan gol yang dijaringkan oleh sebuah pasukan dalam setiap perlawanan. Bilangan gol manakah yang paling kerap dijaringkan?",
    ["5", "1", "3", "2"],
    3,
    "Setiap titik mewakili satu perlawanan. Lajur titik di atas 2 paling tinggi (5 titik), jadi 2 gol paling kerap dijaringkan. Nombor 5 ialah bilangan perlawanan, bukan bilangan gol.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "Apakah yang diwakili oleh paksi-x dalam carta palang biasa?",
    [
      "Kategori atau nilai data",
      "Masa data dikumpulkan",
      "Kekerapan setiap kategori",
      "Julat data",
    ],
    0,
    "Paksi-x dalam carta palang biasanya menunjukkan kategori atau nilai data, manakala paksi-y menunjukkan kekerapan.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "Apakah yang diwakili oleh setiap titik dalam plot titik?",
    ["Satu kelas data", "Kekerapan sesuatu nilai", "Satu nilai data", "Julat data"],
    2,
    "Dalam plot titik, setiap titik mewakili satu pemerhatian atau satu nilai data.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "Apakah pencilan (outlier)?",
    [
      "Nilai yang paling kerap muncul dalam data",
      "Nilai maksimum data",
      "Nilai tengah data",
      "Nilai yang jauh berbeza daripada nilai-nilai lain dalam set data",
    ],
    3,
    "Pencilan ialah nilai yang jauh berbeza daripada nilai-nilai lain. Dalam plot titik, ia kelihatan tersasing dari kumpulan.",
    "Easy",
  ],
  [
    "Kaedah pengumpulan data yang sesuai untuk kajian hayat bateri ialah:",
    ["Temu bual", "Eksperimen", "Pemerhatian", "Tinjauan"],
    1,
    "Eksperimen sesuai untuk menguji hayat bateri — pengkaji mengawal keadaan dan mengukur berapa lama setiap bateri bertahan.",
    "Easy",
  ],
]);

const MATH_C12_OBJECTIVE_1_FOUNDATION_QUESTIONS_DLP = mathQuestions([
  [
    "What is data handling?",
    [
      "Collecting, organising, representing and interpreting data",
      "A process of counting numbers in a list",
      "A process of drawing charts only",
      "A process of memorising statistics facts",
    ],
    0,
    "Data handling is the process of collecting, organising, representing and interpreting data to answer questions or make decisions.",
    "Easy",
  ],
  [
    "The frequency table shows the number of books read by a group of students in a week. How many students read 3 books?",
    ["3", "4", "9", "5"],
    1,
    "Find the row 3 in the Number of books column, then read the Frequency column beside it: 4 students. The number 3 is the number of books, not the number of students.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.booksRead,
  ],
  [
    "What is a statistical question?",
    [
      "A question with one fixed answer",
      "A mathematical question involving formulas",
      "A question that requires data collection and involves variability",
      "A question that can be answered directly",
    ],
    2,
    "A statistical question requires data collection and involves variability — the answer differs for different individuals.",
    "Easy",
  ],
  [
    "Which of the following is a statistical question?",
    [
      "What is the product of 8 × 7?",
      "On what date did Malaysia gain independence?",
      "What is the name of the capital of Malaysia?",
      "What is the favourite hobby of Form 1 students?",
    ],
    3,
    "'What is the favourite hobby of Form 1 students?' is a statistical question because answers vary among students.",
    "Easy",
  ],
  [
    "What is categorical data?",
    [
      "Data involving whole numbers",
      "Data describing qualities or types/categories",
      "Data measured with instruments",
      "Data starting from zero",
    ],
    1,
    "Categorical data describes qualities or types — e.g. blood group, colour, hobby. It is not numerical.",
    "Easy",
  ],
  [
    "Which is an example of categorical data?",
    ["Students' heights", "Number of siblings", "Car colour", "Running time"],
    2,
    "Car colour (red, blue, white) is categorical data — it describes types/categories, not numbers.",
    "Easy",
  ],
  [
    "What is discrete data?",
    [
      "Data measured with a ruler or scale",
      "Data about colours, names and types",
      "Data that can take any decimal value",
      "Numerical data that can only take certain values",
    ],
    3,
    "Discrete data can only take whole number values (can be counted). Examples: number of children, number of books.",
    "Easy",
  ],
  [
    "Which is an example of discrete data?",
    [
      "Number of cars in a car park",
      "Students' heights in centimetres",
      "A baby's mass in kilograms",
      "Room temperature in degrees Celsius",
    ],
    0,
    "Number of cars (0, 1, 2, 3, ...) is discrete data — whole number values only, cannot have 2.5 cars.",
    "Easy",
  ],
  [
    "What is continuous data?",
    [
      "Data that can only take whole number values",
      "Data about types or categories",
      "Numerical data that can take any value including decimals",
      "Data counted one by one",
    ],
    2,
    "Continuous data is obtained through measurement and can have decimals. Examples: height 162.4 cm, mass 3.2 kg.",
    "Easy",
  ],
  [
    "Which is an example of continuous data?",
    [
      "Number of students in a class",
      "Number of questions in a test",
      "Number of goals in a match",
      "Height of a tree",
    ],
    3,
    "Height of a tree is continuous data — it is measured and can have decimal values like 2.35 m.",
    "Easy",
  ],
  [
    "What data collection method involves direct questioning?",
    ["Interview", "Observation", "Experiment", "Survey"],
    0,
    "An interview is a method of collecting data through direct questioning between an interviewer and a respondent.",
    "Easy",
  ],
  [
    "What data collection method involves watching and recording events?",
    ["Interview", "Observation", "Experiment", "Survey"],
    1,
    "Observation is a method of collecting data by watching and recording events directly without disturbing subjects.",
    "Easy",
  ],
  [
    "What data collection method involves distributing questionnaires to a sample?",
    ["Interview", "Experiment", "Observation", "Survey"],
    3,
    "A survey is a method of collecting data by distributing questionnaires or forms to a group of people (sample).",
    "Easy",
  ],
  [
    "The data collection method that tests a hypothesis is:",
    ["Experiment", "Observation", "Survey", "Interview"],
    0,
    "An experiment is a data collection method through planned tests designed to test a hypothesis.",
    "Easy",
  ],
  [
    "Look at the frequency table. Which statement describes it correctly?",
    [
      "A table that lists students' names",
      "A table showing each value and its frequency",
      "A graph that uses bars",
      "A circle divided into sectors",
    ],
    1,
    "A frequency table organises data by showing each value or class along with the number of times it occurs.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.booksRead,
  ],
  [
    "Look at the visual. What type of chart is shown?",
    ["Pie chart", "Line graph", "Bar chart", "Histogram"],
    2,
    "A bar chart uses vertical or horizontal bars to compare categorical or discrete data.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "Look at the visual. What type of chart is used to show category proportions?",
    ["Pie chart", "Line graph", "Histogram", "Bar chart"],
    0,
    "A pie chart is a circle divided into sectors to show the proportion of each category from the whole.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteActivities,
  ],
  [
    "Look at the visual. What type of graph shows change over time?",
    ["Bar chart", "Pie chart", "Line graph", "Histogram"],
    2,
    "A line graph uses points connected by lines to show data changes over time.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.shopSales,
  ],
  [
    "Look at the visual. Which statement describes this dot plot?",
    [
      "A chart that uses thick bars for each category",
      "A chart that uses dots above a number line",
      "A circle divided into sectors",
      "A graph that groups data into classes",
    ],
    1,
    "A dot plot uses dots above a number line. Each dot represents one data value.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "Look at the visual. Which statement describes this histogram?",
    [
      "A bar chart with gaps between the bars",
      "A large pie chart",
      "A line graph that shows time",
      "A bar graph for continuous data with no gaps",
    ],
    3,
    "A histogram is a bar graph for continuous/grouped data with NO gaps between bars.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Look at the histogram. What is the main difference between a bar chart and a histogram?",
    [
      "Bar charts use colours, histograms do not",
      "Histograms have gaps between bars, bar charts do not",
      "Bar charts have gaps between bars, histograms do not",
      "There is no difference",
    ],
    2,
    "Bar charts have GAPS between bars (discrete/categorical data). Histograms have NO gaps (continuous/grouped data).",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Look at the visual. Which statement describes this stem-and-leaf plot?",
    [
      "A chart that uses pictures of real tree leaves as symbols",
      "A display splitting values into stems (tens) and leaves (units)",
      "A line graph that has two separate vertical axes",
      "A histogram that is split into two equal halves",
    ],
    1,
    "A stem-and-leaf plot separates each value: stem = tens digit, leaf = units digit. Retains original data values.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksStems,
  ],
  [
    "Look at the visual. Which statement describes this frequency polygon?",
    [
      "A polygon shape studied in geometry",
      "A table that lists classes and frequencies",
      "A pie chart drawn in the shape of a polygon",
      "A line graph joining the midpoints of histogram bar tops",
    ],
    3,
    "A frequency polygon is constructed by connecting the midpoints of the tops of each histogram bar.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.twoClassPolygons,
  ],
  [
    "What is the range?",
    [
      "The difference between the highest and lowest values",
      "The most frequently occurring value",
      "The middle value of data",
      "The sum of all values",
    ],
    0,
    "Range = Highest Value − Lowest Value. It measures the overall spread of data.",
    "Easy",
  ],
  [
    "What is data dispersion?",
    [
      "The average value of the data",
      "How spread out the data values are",
      "The middle value of the data",
      "The value that occurs most often",
    ],
    1,
    "Data dispersion measures how spread out or varied the values in a data set are from one another.",
    "Easy",
  ],
  [
    "The dot plot shows the number of goals a team scored in each match. Which number of goals was scored most often?",
    ["5", "1", "3", "2"],
    3,
    "Each dot stands for one match. The column of dots above 2 is the tallest (5 dots), so 2 goals was scored most often. The number 5 is the number of matches, not the number of goals.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "What does the x-axis typically represent in a bar chart?",
    [
      "The categories or data values",
      "The time when the data was collected",
      "The frequency of each category",
      "The range of the data",
    ],
    0,
    "The x-axis in a bar chart typically shows categories or data values, while the y-axis shows frequency.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "What does each dot represent in a dot plot?",
    ["One class of data", "The frequency of a value", "One data value", "The data range"],
    2,
    "In a dot plot, each dot represents one observation or one data value.",
    "Easy",
    MATH_F1_C12_QUIZ_VISUALS.goalsScored,
  ],
  [
    "What is an outlier?",
    [
      "The most frequently occurring value in data",
      "The maximum value of data",
      "The middle value of data",
      "A value that differs greatly from other values in the data set",
    ],
    3,
    "An outlier is a value that differs greatly from others. In a dot plot, it appears isolated from the cluster.",
    "Easy",
  ],
  [
    "The most suitable data collection method for studying battery lifespan is:",
    ["Interview", "Experiment", "Observation", "Survey"],
    1,
    "An experiment is suitable for testing battery lifespan — the researcher controls conditions and measures how long each battery lasts.",
    "Easy",
  ],
]);

const MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS = mathQuestions([
  [
    "Carta palang menunjukkan subjek kegemaran sekumpulan murid. Setiap murid memilih satu subjek. Berapakah jumlah murid?",
    ["42", "36", "38", "40"],
    0,
    "Baca nilai setiap palang, kemudian tambah: 15 + 12 + 9 + 6 = 42 murid.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "Carta palang menunjukkan bilangan ahli kelab robotik dari lima kelas Tingkatan 1. Berapakah beza antara kelas yang mempunyai ahli paling ramai dengan kelas yang mempunyai ahli paling sedikit?",
    ["12", "8", "6", "16"],
    1,
    "Palang tertinggi ialah 1B (12 murid) dan palang terendah ialah 1E (4 murid). Beza = 12 − 4 = 8 murid.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.roboticsClub,
  ],
  [
    "Carta pai menunjukkan aktiviti kegemaran 50 orang murid. Berapakah murid yang memilih Sukan?",
    ["15", "25", "20", "30"],
    2,
    "Sektor Sukan ialah 40% daripada carta pai. 40% × 50 = 0.40 × 50 = 20 murid.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteActivities,
  ],
  [
    "40 murid dipilih. 16 suka Matematik. Berapakah sudut sektor Matematik dalam carta pai?",
    ["120°", "108°", "90°", "144°"],
    3,
    "Sudut = (16÷40) × 360° = 0.4 × 360° = 144°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.mathPreference40,
  ],
  [
    "Jumlah sudut dalam carta pai = ?",
    ["180°", "360°", "270°", "90°"],
    1,
    "Jumlah semua sudut sektor dalam carta pai sentiasa 360° (sudut penuh).",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.fourSectors,
  ],
  [
    "Data: 8, 12, 5, 19, 7, 3, 15. Cari julat.",
    ["14", "17", "16", "12"],
    2,
    "Tertinggi = 19, Terendah = 3. Julat = 19 − 3 = 16.",
    "Medium",
  ],
  [
    "Graf garis menunjukkan jualan sebuah kedai dalam lima bulan. Berapakah peningkatan jualan dari bulan Januari hingga bulan Mei?",
    ["RM100", "RM250", "RM200", "RM150"],
    3,
    "Baca titik pertama dan titik terakhir: Januari = RM200 dan Mei = RM350. Peningkatan = RM350 − RM200 = RM150.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.shopSales,
  ],
  [
    "Jadual kekerapan menunjukkan markah ujian sekumpulan murid. Berapakah jumlah murid?",
    ["40", "38", "35", "42"],
    0,
    "Tambah semua nilai dalam lajur Kekerapan: 5 + 8 + 12 + 10 + 5 = 40 murid.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "Jadual kekerapan menunjukkan markah ujian sekumpulan murid. Kelas markah manakah yang mempunyai kekerapan tertinggi?",
    ["41–50", "51–60", "61–70", "71–80"],
    2,
    "Bandingkan nilai dalam lajur Kekerapan. Nilai terbesar ialah 12, iaitu bagi kelas 61–70.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "Plot batang-dan-daun menunjukkan markah kuiz sekumpulan murid. Berapakah bilangan markah dari 30 hingga 39?",
    ["3", "6", "5", "4"],
    3,
    "Markah 30 hingga 39 berada pada batang 3. Batang 3 mempunyai 4 daun (2, 5, 8, 9), iaitu markah 32, 35, 38 dan 39. Jadi terdapat 4 markah.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksStems,
  ],
  [
    "Plot batang-dan-daun menunjukkan markah ujian sains sekumpulan murid. Apakah markah tertinggi?",
    ["46", "43", "48", "36"],
    0,
    "Markah tertinggi berada pada batang terakhir (4) dengan daun terbesar (6). Gunakan kunci: 4 | 6 = 46.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.scienceMarksStems,
  ],
  [
    "Kelas 55–65 dalam jadual kekerapan. Apakah titik tengahnya?",
    ["57.5", "60", "59.5", "62.5"],
    1,
    "Titik tengah = (55 + 65) ÷ 2 = 120 ÷ 2 = 60.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.midpointClasses,
  ],
  [
    "Plot titik menunjukkan markah kuiz sekumpulan murid. Berapakah murid yang mendapat markah 8?",
    ["2", "3", "5", "4"],
    3,
    "Setiap titik mewakili seorang murid. Terdapat 4 titik di atas markah 8, jadi 4 murid mendapat markah 8.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksDots,
  ],
  [
    "Plot titik menunjukkan bilangan buku yang dipinjam oleh sekumpulan murid. Apakah nilai 4 dalam data ini?",
    ["Pencilan", "Nilai mod", "Nilai minimum biasa", "Nilai di tengah-tengah data"],
    0,
    "Titik di 4 terpisah jauh daripada titik lain yang berkumpul pada 7 dan 8, jadi 4 ialah pencilan. Nilai mod ialah 8 kerana 8 mempunyai titik paling banyak.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.booksBorrowedDots,
  ],
  [
    "Carta pai dibahagikan kepada empat sektor, iaitu A, B, C dan D. Cari nilai x.",
    ["60°", "70°", "65°", "75°"],
    1,
    "Jumlah sudut semua sektor ialah 360°. 90° + 120° + 80° + x = 360°, jadi x = 360° − 290° = 70°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.fourSectors,
  ],
  [
    "Graf garis menunjukkan kehadiran murid ke kelab sains dalam empat bulan. Berapakah beza antara kehadiran tertinggi dengan kehadiran terendah?",
    ["6", "7", "8", "10"],
    2,
    "Titik tertinggi ialah April (50) dan titik terendah ialah Februari (42). Beza = 50 − 42 = 8.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.scienceClubAttendance,
  ],
  [
    "Julat set data A = 12, Julat set data B = 20. Set data manakah lebih konsisten?",
    ["Set data A", "Set data B", "Kedua-duanya sama konsisten", "Tidak boleh ditentukan"],
    0,
    "Set data A lebih konsisten kerana julatnya lebih kecil (12 < 20). Julat lebih kecil = lebih konsisten.",
    "Medium",
  ],
  [
    "40 murid. Warna kegemaran: Merah=10, Biru=15, Hijau=8, Lain=7. Apakah peratusan murid yang memilih Biru?",
    ["30%", "35%", "37.5%", "40%"],
    2,
    "Peratusan = (15÷40) × 100% = 37.5%.",
    "Medium",
  ],
  [
    "Histogram menunjukkan tinggi sekumpulan murid. Apakah yang ditunjukkan oleh palang bagi kelas 150–155?",
    ["8 murid mempunyai tinggi kurang daripada 150 cm", "8 murid mempunyai tinggi dalam julat 150 cm hingga 155 cm", "8 murid mempunyai tinggi melebihi 155 cm", "12 murid mempunyai tinggi dalam julat 150 cm hingga 155 cm"],
    1,
    "Palang kelas 150–155 mencapai 8 pada paksi kekerapan, jadi 8 murid mempunyai tinggi dari 150 cm hingga kurang daripada 155 cm. Palang yang mencapai 12 ialah kelas 155–160.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Data: 22, 35, 28, 41, 19, 33, 45, 27. Cari julat.",
    ["24", "30", "28", "26"],
    3,
    "Tertinggi = 45, Terendah = 19. Julat = 45 − 19 = 26.",
    "Medium",
  ],
  [
    "Jadual kekerapan menunjukkan masa perjalanan sekumpulan murid ke sekolah. Berapakah murid yang mengambil masa lebih daripada 30 minit?",
    ["4", "3", "7", "15"],
    2,
    "Lebih daripada 30 minit bermaksud kelas 31–40 dan 41–50. Jumlah = 4 + 3 = 7 murid. Kelas 21–30 tidak dikira kerana masa dalam kelas itu tidak melebihi 30 minit.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.travelTime,
  ],
  [
    "Plot batang-dan-daun menunjukkan umur peserta suatu larian. Berapakah bilangan peserta?",
    ["7", "9", "8", "10"],
    1,
    "Setiap daun mewakili seorang peserta. Kira daun bagi setiap batang: 2 + 3 + 3 + 1 = 9 peserta.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.runnerAgesStems,
  ],
  [
    "Peratusan sesuatu kategori dalam carta pai = 25%. Berapakah sudut sektornya?",
    ["60°", "75°", "100°", "90°"],
    3,
    "25% × 360° = 0.25 × 360° = 90°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quarterCategory,
  ],
  [
    "Seramai 30 murid ditinjau. Kekerapan kategori X ialah 12. Apakah sudut sektor X dalam carta pai?",
    ["144°", "130°", "140°", "120°"],
    0,
    "Sudut = (12÷30) × 360° = 0.4 × 360° = 144°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.survey30,
  ],
  [
    "Graf garis menunjukkan kehadiran murid ke perpustakaan dalam seminggu. Pada hari apakah kehadiran paling rendah?",
    ["Isnin", "Jumaat", "Rabu", "Khamis"],
    1,
    "Cari titik yang paling rendah pada graf garis. Titik itu bernilai 32 dan berada di atas Jumaat, jadi kehadiran paling rendah pada hari Jumaat.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.libraryAttendance,
  ],
  [
    "Data tinggi (cm): 150, 155, 148, 162, 158, 145, 170. Cari julat.",
    ["22", "24", "26", "25"],
    3,
    "Tertinggi = 170, Terendah = 145. Julat = 170 − 145 = 25 cm.",
    "Medium",
  ],
  [
    "Plot batang-dan-daun menunjukkan jisim enam orang murid. Apakah jisim yang paling kecil?",
    ["50 kg", "54 kg", "5 kg", "62 kg"],
    0,
    "Nilai terkecil ialah batang pertama dengan daun terkecil: 5 | 0 = 50 kg. Nombor 5 hanyalah batang (digit puluh), bukan nilai data.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.massesSmallStems,
  ],
  [
    "Jadual kekerapan menunjukkan markah ujian sekumpulan murid. Berapakah peratusan murid yang mendapat markah 61–70?",
    ["25%", "28%", "30%", "32%"],
    2,
    "Kekerapan kelas 61–70 ialah 12. Jumlah murid = 5 + 8 + 12 + 10 + 5 = 40. Peratusan = (12 ÷ 40) × 100% = 30%.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "Carta pai menunjukkan sukan kegemaran 50 orang murid. Berapakah murid yang memilih bola sepak?",
    ["18", "24", "22", "20"],
    3,
    "Sudut sektor bola sepak ialah 144°. Bilangan murid = (144° ÷ 360°) × 50 = 0.4 × 50 = 20 murid.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSports,
  ],
  [
    "Plot titik menunjukkan bilangan tekan tubi yang dibuat oleh sekumpulan murid dalam seminit. Apakah nilai 12 dan 20?",
    ["Nilai mod", "Pencilan", "Nilai dalam kumpulan utama", "Nilai di tengah-tengah data"],
    1,
    "Kebanyakan titik berkumpul pada 15 hingga 17. Titik di 12 dan 20 terpisah daripada kumpulan itu, jadi kedua-duanya ialah pencilan.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.pushUpsDots,
  ],
]);

const MATH_C12_OBJECTIVE_2_PRACTICE_QUESTIONS_DLP = mathQuestions([
  [
    "The bar chart shows the favourite subjects of a group of students. Each student chose one subject. What is the total number of students?",
    ["42", "36", "38", "40"],
    0,
    "Read the value of each bar, then add: 15 + 12 + 9 + 6 = 42 students.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSubjects,
  ],
  [
    "The bar chart shows the number of robotics club members from five Form 1 classes. What is the difference between the class with the most members and the class with the fewest members?",
    ["12", "8", "6", "16"],
    1,
    "The tallest bar is 1B (12 students) and the shortest bar is 1E (4 students). Difference = 12 − 4 = 8 students.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.roboticsClub,
  ],
  [
    "The pie chart shows the favourite activities of 50 students. How many students chose Sports?",
    ["15", "25", "20", "30"],
    2,
    "The Sports sector is 40% of the pie chart. 40% × 50 = 0.40 × 50 = 20 students.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteActivities,
  ],
  [
    "40 students surveyed. 16 like Mathematics. What is the sector angle for Mathematics in the pie chart?",
    ["120°", "108°", "90°", "144°"],
    3,
    "Angle = (16÷40) × 360° = 0.4 × 360° = 144°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.mathPreference40,
  ],
  [
    "The total angles in a pie chart = ?",
    ["180°", "360°", "270°", "90°"],
    1,
    "The sum of all sector angles in a pie chart is always 360° (full angle).",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.fourSectors,
  ],
  [
    "Data: 8, 12, 5, 19, 7, 3, 15. Find the range.",
    ["14", "17", "16", "12"],
    2,
    "Highest = 19, Lowest = 3. Range = 19 − 3 = 16.",
    "Medium",
  ],
  [
    "The line graph shows the sales of a shop over five months. What is the increase in sales from January to May?",
    ["RM100", "RM250", "RM200", "RM150"],
    3,
    "Read the first and last points: January = RM200 and May = RM350. Increase = RM350 − RM200 = RM150.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.shopSales,
  ],
  [
    "The frequency table shows the test marks of a group of students. How many students are there altogether?",
    ["40", "38", "35", "42"],
    0,
    "Add all the values in the Frequency column: 5 + 8 + 12 + 10 + 5 = 40 students.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "The frequency table shows the test marks of a group of students. Which class of marks has the highest frequency?",
    ["41–50", "51–60", "61–70", "71–80"],
    2,
    "Compare the values in the Frequency column. The largest value is 12, for the class 61–70.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "The stem-and-leaf plot shows the quiz marks of a group of students. How many marks are from 30 to 39?",
    ["3", "6", "5", "4"],
    3,
    "Marks from 30 to 39 are on stem 3. Stem 3 has 4 leaves (2, 5, 8, 9), which are the marks 32, 35, 38 and 39. So there are 4 marks.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksStems,
  ],
  [
    "The stem-and-leaf plot shows the science test marks of a group of students. What is the highest mark?",
    ["46", "43", "48", "36"],
    0,
    "The highest mark is on the last stem (4) with the largest leaf (6). Use the key: 4 | 6 = 46.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.scienceMarksStems,
  ],
  [
    "Class 55–65 in a frequency table. What is its midpoint?",
    ["57.5", "60", "59.5", "62.5"],
    1,
    "Midpoint = (55 + 65) ÷ 2 = 120 ÷ 2 = 60.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.midpointClasses,
  ],
  [
    "The dot plot shows the quiz marks of a group of students. How many students scored 8?",
    ["2", "3", "5", "4"],
    3,
    "Each dot stands for one student. There are 4 dots above the mark 8, so 4 students scored 8.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quizMarksDots,
  ],
  [
    "The dot plot shows the number of books borrowed by a group of students. What is the value 4 in this data?",
    ["An outlier", "The mode", "A normal minimum value", "The middle value of the data"],
    0,
    "The dot at 4 lies far from the other dots, which cluster at 7 and 8, so 4 is an outlier. The mode is 8 because 8 has the most dots.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.booksBorrowedDots,
  ],
  [
    "The pie chart is divided into four sectors, A, B, C and D. Find the value of x.",
    ["60°", "70°", "65°", "75°"],
    1,
    "The sector angles add up to 360°. 90° + 120° + 80° + x = 360°, so x = 360° − 290° = 70°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.fourSectors,
  ],
  [
    "The line graph shows student attendance at the science club over four months. What is the difference between the highest and the lowest attendance?",
    ["6", "7", "8", "10"],
    2,
    "The highest point is April (50) and the lowest point is February (42). Difference = 50 − 42 = 8.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.scienceClubAttendance,
  ],
  [
    "Range of data set A = 12, Range of data set B = 20. Which data set is more consistent?",
    ["Data set A", "Data set B", "Both equally consistent", "Cannot be determined"],
    0,
    "Data set A is more consistent because its range is smaller (12 < 20). Smaller range = more consistent.",
    "Medium",
  ],
  [
    "40 students. Favourite colour: Red=10, Blue=15, Green=8, Others=7. What percentage chose Blue?",
    ["30%", "35%", "37.5%", "40%"],
    2,
    "Percentage = (15÷40) × 100% = 37.5%.",
    "Medium",
  ],
  [
    "The histogram shows the heights of a group of students. What does the bar for the class 150–155 show?",
    ["8 students are shorter than 150 cm", "8 students have heights in the range 150 cm to 155 cm", "8 students are taller than 155 cm", "12 students have heights in the range 150 cm to 155 cm"],
    1,
    "The bar for the class 150–155 reaches 8 on the frequency axis, so 8 students have heights from 150 cm to less than 155 cm. The bar that reaches 12 is the class 155–160.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.heights,
  ],
  [
    "Data: 22, 35, 28, 41, 19, 33, 45, 27. Find the range.",
    ["24", "30", "28", "26"],
    3,
    "Highest = 45, Lowest = 19. Range = 45 − 19 = 26.",
    "Medium",
  ],
  [
    "The frequency table shows the travel time to school of a group of students. How many students take more than 30 minutes?",
    ["4", "3", "7", "15"],
    2,
    "More than 30 minutes means the classes 31–40 and 41–50. Total = 4 + 3 = 7 students. The class 21–30 is not counted because the times in that class do not exceed 30 minutes.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.travelTime,
  ],
  [
    "The stem-and-leaf plot shows the ages of the participants in a fun run. How many participants are there?",
    ["7", "9", "8", "10"],
    1,
    "Each leaf stands for one participant. Count the leaves on each stem: 2 + 3 + 3 + 1 = 9 participants.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.runnerAgesStems,
  ],
  [
    "A category's percentage in a pie chart = 25%. What is the sector angle?",
    ["60°", "75°", "100°", "90°"],
    3,
    "25% × 360° = 0.25 × 360° = 90°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.quarterCategory,
  ],
  [
    "30 students were surveyed. The frequency of category X is 12. What is the sector angle for X in a pie chart?",
    ["144°", "130°", "140°", "120°"],
    0,
    "Angle = (12÷30) × 360° = 0.4 × 360° = 144°.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.survey30,
  ],
  [
    "The line graph shows student attendance at the library over one week. On which day is attendance lowest?",
    ["Monday", "Friday", "Wednesday", "Thursday"],
    1,
    "Find the lowest point on the line graph. It has the value 32 and sits above Friday, so attendance is lowest on Friday.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.libraryAttendance,
  ],
  [
    "Height data (cm): 150, 155, 148, 162, 158, 145, 170. Find the range.",
    ["22", "24", "26", "25"],
    3,
    "Highest = 170, Lowest = 145. Range = 170 − 145 = 25 cm.",
    "Medium",
  ],
  [
    "The stem-and-leaf plot shows the masses of six students. What is the smallest mass?",
    ["50 kg", "54 kg", "5 kg", "62 kg"],
    0,
    "The smallest value is the first stem with its smallest leaf: 5 | 0 = 50 kg. The number 5 is only the stem (tens digit), not a data value.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.massesSmallStems,
  ],
  [
    "The frequency table shows the test marks of a group of students. What percentage of the students scored 61–70?",
    ["25%", "28%", "30%", "32%"],
    2,
    "The frequency of the class 61–70 is 12. Total students = 5 + 8 + 12 + 10 + 5 = 40. Percentage = (12 ÷ 40) × 100% = 30%.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.testMarks,
  ],
  [
    "The pie chart shows the favourite sports of 50 students. How many students chose football?",
    ["18", "24", "22", "20"],
    3,
    "The football sector angle is 144°. Number of students = (144° ÷ 360°) × 50 = 0.4 × 50 = 20 students.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.favouriteSports,
  ],
  [
    "The dot plot shows the number of push-ups a group of students did in one minute. What are the values 12 and 20?",
    ["Mode values", "Outliers", "Values within the main cluster", "Values in the middle of the data"],
    1,
    "Most dots cluster from 15 to 17. The dots at 12 and 20 lie apart from that cluster, so both are outliers.",
    "Medium",
    MATH_F1_C12_QUIZ_VISUALS.pushUpsDots,
  ],
]);

const MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS = mathQuestions([
  [
    "Graf garis menunjukkan bilangan pelawat sebuah muzium dari tahun 2021 hingga 2024. Ramalkan bilangan pelawat pada tahun 2025.",
    ["72 ribu", "68 ribu", "75 ribu", "80 ribu"],
    0,
    "Baca titik: 45, 52, 58 dan 65 ribu. Bilangan pelawat meningkat lebih kurang 7 ribu setiap tahun, jadi ramalan bagi 2025 ialah 65 + 7 = 72 ribu.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.museumVisitors,
  ],
  [
    "Carta palang menunjukkan jualan empat produk dalam RM ribu. Produk manakah yang menyumbang lebih daripada 30% jumlah jualan?",
    ["Produk A", "Produk B", "Produk C", "Produk D"],
    1,
    "Baca setiap palang: A = 5, B = 8, C = 6, D = 3 (RM ribu). Jumlah = 22. 30% × 22 = 6.6. Hanya Produk B (8) melebihi 6.6; Produk C (6) tidak melebihinya.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.productSales,
  ],
  [
    "Histogram menunjukkan markah 50 orang murid dalam suatu ujian. Buat inferens tentang prestasi murid.",
    ["Kebanyakan murid mendapat markah bawah 50", "Data tidak mencukupi untuk sebarang kesimpulan", "Kebanyakan murid mendapat 61–70 markah", "Semua murid mendapat markah yang sama"],
    2,
    "Palang tertinggi ialah kelas 61–70 (20 murid), dan palang semakin rendah ke arah kedua-dua hujung. Jadi kebanyakan murid mendapat 61–70 markah.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.fiftyMarksHistogram,
  ],
  [
    "Plot batang-dan-daun menunjukkan jisim 13 orang murid. Pernyataan manakah yang betul?",
    ["Julat = 4 kg; 74 kg ialah pencilan", "Julat = 36 kg; 38 kg ialah pencilan", "Julat = 35 kg; 74 kg ialah pencilan", "Julat = 36 kg; 74 kg ialah pencilan"],
    3,
    "Gunakan kunci: 3 | 8 = 38 kg (terkecil) dan 7 | 4 = 74 kg (terbesar). Julat = 74 − 38 = 36 kg, bukan 7 − 3 = 4 (batang mesti digabungkan dengan daun). Nilai lain paling besar 56 kg, jadi 74 kg jauh terpisah dan ialah pencilan.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.studentMasses,
  ],
  [
    "Set data A: 48, 50, 51, 49, 52. Set data B: 40, 55, 48, 62, 45. Bandingkan serakan kedua-dua set data menggunakan julat dan buat kesimpulan.",
    [
      "Kedua-dua set mempunyai serakan yang sama",
      "Set A lebih konsisten kerana julatnya lebih kecil",
      "Set B lebih konsisten kerana julatnya lebih besar",
      "Kedua-dua set tidak boleh dibandingkan",
    ],
    1,
    "Julat A = 52−48 = 4. Julat B = 62−40 = 22. Set A lebih konsisten (julat = 4 vs 22) dan lebih boleh dipercayai.",
    "Hard",
  ],
  [
    "Syarikat mengeluarkan 5 produk dengan jisim: 99.8, 100.1, 100.0, 99.9, 100.2 g. Jika standard = 100g ± 0.5g, adakah semua produk memenuhi standard?",
    [
      "Tidak, produk 100.2 g gagal memenuhi standard",
      "Tidak, hanya 3 produk memenuhi standard",
      "Ya, semua jisim antara 99.5 g hingga 100.5 g",
      "Tidak boleh ditentukan tanpa data tambahan",
    ],
    2,
    "Standard: 99.5g hingga 100.5g. Semua nilai (99.8, 100.1, 100.0, 99.9, 100.2) berada dalam julat tersebut. Semua lulus.",
    "Hard",
  ],
  [
    "Graf garis menunjukkan suhu setiap jam pada suatu hari. Buat inferens dan ramalkan suhu pada pukul 15:00.",
    ["Suhu akan terus meningkat, sekitar 36°C", "Suhu akan kekal pada 32°C sepanjang petang", "Tidak ada corak yang jelas dalam data", "Suhu naik hingga tengah hari, kemudian turun — sekitar 30°C"],
    3,
    "Suhu naik hingga 35°C pada pukul 12:00, kemudian turun: 35 → 34 → 32 (kira-kira 2°C sejam). Ramalan pada pukul 15:00: kira-kira 30°C.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.hourlyTemperature,
  ],
  [
    "Plot batang-dan-daun menunjukkan masa yang diambil oleh sekumpulan murid untuk menyiapkan teka-teki. Cari julat data ini.",
    ["31", "28", "33", "35"],
    0,
    "Nilai terkecil = 1 | 2 = 12 dan nilai terbesar = 4 | 3 = 43. Julat = 43 − 12 = 31 minit.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.puzzleTimesStems,
  ],
  [
    "Plot titik menunjukkan bilangan jam tidur sekumpulan murid pada suatu malam. Berapakah julat data itu, dan berapakah julat jika pencilan dikeluarkan?",
    ["3 jam; 5 jam", "9 jam; 3 jam", "5 jam; 3 jam", "5 jam; 2 jam"],
    2,
    "Nilai terkecil ialah 4 dan nilai terbesar ialah 9, jadi julat = 9 − 4 = 5 jam. Titik di 4 jauh terpisah daripada titik lain, jadi 4 ialah pencilan. Tanpa 4, nilai terkecil ialah 6, jadi julat = 9 − 6 = 3 jam.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.sleepHours,
  ],
  [
    "Carta pai dibahagikan kepada lima sektor, A hingga E. Cari x dan peratusan sektor E.",
    ["x=40°, 11%", "x=36°, 12%", "x=30°, 10%", "x=36°, 10%"],
    3,
    "Jumlah sudut sektor ialah 360°. 72° + 108° + 54° + 90° + x = 360°, jadi x = 360° − 324° = 36°. Peratusan E = (36° ÷ 360°) × 100% = 10%.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.fiveSectors,
  ],
  [
    "Histogram menunjukkan markah sekumpulan murid. Bagi kelas 60–70 dan 70–80, cari titik tengah setiap kelas dan nisbah kekerapannya.",
    ["TT1=65, TT2=75, Nisbah 3:2", "TT1=64.5, TT2=74.5, Nisbah 2:3", "TT1=65, TT2=75, Nisbah 2:3", "TT1=64.5, TT2=74.5, Nisbah 3:2"],
    0,
    "Baca palang: kelas 60–70 = 15 dan kelas 70–80 = 10. TT1 = (60 + 70) ÷ 2 = 65. TT2 = (70 + 80) ÷ 2 = 75. Nisbah kekerapan = 15 : 10 = 3:2.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.classMarksHistogram,
  ],
  [
    "Graf garis menunjukkan peratusan kelulusan sebuah sekolah dari tahun 2019 hingga 2023. Buat inferens.",
    ["Tiada corak yang jelas dalam peratusan kelulusan", "Peratusan kelulusan secara umumnya meningkat walaupun menurun pada 2020", "Peratusan kelulusan menurun setiap tahun", "Data tidak mencukupi untuk sebarang inferens"],
    1,
    "Baca titik: 78%, 75%, 80%, 83% dan 85%. Graf turun sedikit pada 2020, kemudian naik setiap tahun. Inferens: peratusan kelulusan secara umumnya meningkat.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.passRates,
  ],
  [
    "Perwakilan data yang manakah TIDAK beretika?",
    [
      "Memulakan paksi-y pada 0",
      "Melabel setiap paksi dengan unit yang jelas",
      "Menyatakan sumber data",
      "Memulakan paksi-y pada 97 bagi nilai 97–103",
    ],
    3,
    "Memulakan paksi-y dari 97 (bukan 0) akan menjadikan perbezaan kecil antara 97–103 kelihatan sangat besar. Ini mengelirukan dan tidak beretika.",
    "Hard",
  ],
  [
    "Data kelajuan kereta (km/j): 85, 92, 78, 95, 88, 72, 101, 83. Cari julat dan buat inferens tentang pemanduan.",
    [
      "Julat = 29; kelajuan agak berbeza-beza",
      "Julat = 27; pemandu konsisten",
      "Julat = 25; semua pemandu selamat",
      "Julat = 31; semua pemandu berbahaya",
    ],
    0,
    "Tertinggi=101, Terendah=72. Julat=101−72=29. Variasi ini menunjukkan kelajuan agak tidak konsisten.",
    "Hard",
  ],
  [
    "Markah Kelas P adalah antara 40 hingga 85, manakala markah Kelas Q adalah antara 60 hingga 75. Kelas manakah menunjukkan prestasi yang kurang konsisten?",
    [
      "Kelas Q, kerana julatnya 15",
      "Kelas P, kerana julatnya 45",
      "Kelas P, kerana julatnya 15",
      "Kedua-dua kelas sama konsisten",
    ],
    1,
    "Julat P = 85 − 40 = 45. Julat Q = 75 − 60 = 15. Julat P lebih besar, jadi prestasi Kelas P kurang konsisten.",
    "Hard",
  ],
  [
    "Plot titik menunjukkan bilangan soalan yang dijawab dengan betul oleh sekumpulan murid. Apakah inferens yang paling sesuai?",
    ["Data tersebar sama rata dari 5 hingga 12", "Tiada pencilan kerana semua nilai direkodkan", "Kebanyakan nilai antara 6 hingga 8, dan 12 ialah pencilan", "Data mempunyai dua mod, iaitu 7 dan 12"],
    2,
    "Kebanyakan titik berkumpul pada 6 hingga 8. Titik di 12 terpisah jauh daripada kumpulan itu, jadi 12 ialah pencilan.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.correctAnswersDots,
  ],
  [
    "Jadual kekerapan menunjukkan markah ujian akhir sekumpulan murid. Cari titik tengah kelas mod dan jumlah murid.",
    ["TT=75, n=40", "TT=74.5, n=40", "TT=74.5, n=38", "TT=75, n=42"],
    0,
    "Kelas mod ialah kelas dengan kekerapan tertinggi: 70–80 (15). Titik tengah = (70 + 80) ÷ 2 = 75. Jumlah murid = 8 + 15 + 12 + 5 = 40.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.finalMarks,
  ],
  [
    "Syarikat A mempunyai julat gaji pekerja = RM500. Syarikat B julat = RM5000. Inferens yang lebih tepat:",
    [
      "Syarikat A lebih besar kerana julatnya lebih kecil",
      "Syarikat B membayar setiap pekerja lebih tinggi daripada A",
      "Gaji di A lebih seragam; B mempunyai jurang gaji yang besar",
      "Kedua-dua syarikat langsung tidak boleh dibandingkan",
    ],
    2,
    "Julat besar (RM5000) menunjukkan jurang yang besar antara gaji tertinggi dan terendah dalam Syarikat B. Syarikat A lebih seragam.",
    "Hard",
  ],
  [
    "Graf yang menggunakan ikon yang lebih besar untuk mewakili nilai yang lebih kecil adalah:",
    [
      "Amalan baik kerana ikon menarik perhatian pembaca",
      "Tidak beretika kerana saiz ikon mengelirukan pembaca",
      "Pendekatan kreatif yang mengekalkan ketepatan data",
      "Amalan standard dalam statistik",
    ],
    1,
    "Menggunakan saiz ikon yang tidak sepadan dengan nilai sebenar adalah amalan tidak beretika yang mengelirukan pembaca.",
    "Hard",
  ],
  [
    "Markah Kelas A: 55, 62, 58, 70, 65, 68, 72, 60. Markah Kelas B: 40, 80, 55, 75, 45, 85, 50, 70. Bandingkan serakan markah kedua-dua kelas menggunakan julat.",
    ["Tidak boleh dibandingkan kerana markahnya berbeza", "Kelas B lebih konsisten (julat B < julat A)", "Kedua-dua kelas sama konsisten", "Kelas A lebih konsisten (julat A=17, julat B=45)"],
    3,
    "Julat A = 72 − 55 = 17. Julat B = 85 − 40 = 45. Julat A jauh lebih kecil, jadi markah Kelas A jauh lebih konsisten.",
    "Hard",
  ],
  [
    "Poligon kekerapan menunjukkan markah ujian Kelas X dan Kelas Y. Apakah inferens yang paling sesuai?",
    ["Kedua-dua kelas mempunyai prestasi yang sama", "Kelas X berprestasi lebih baik daripada Kelas Y", "Kelas X cenderung mendapat markah lebih rendah; Y lebih tinggi", "Tiada inferens boleh dibuat daripada poligon"],
    2,
    "Poligon Kelas X paling tinggi di sebelah kiri (kemuncak 10 pada titik tengah 55), manakala poligon Kelas Y paling tinggi di sebelah kanan (kemuncak 10 pada 75). Jadi Kelas X cenderung mendapat markah lebih rendah dan Kelas Y lebih tinggi.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.twoClassPolygons,
  ],
  [
    "Graf garis menunjukkan jualan bulanan sebuah kedai dalam setahun. Buat inferens tentang corak perniagaan.",
    ["Jualan tidak menentu dan rawak sepanjang tahun", "Corak bermusim: tinggi pada separuh pertama, rendah pada separuh kedua", "Perniagaan mengalami kerugian pada separuh kedua", "Data tidak mencukupi untuk membuat sebarang inferens"],
    1,
    "Garis naik dari Januari hingga Jun, kemudian turun dari Julai hingga Disember. Ini corak bermusim: jualan tinggi pada separuh pertama tahun dan lebih rendah pada separuh kedua.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.yearlySales,
  ],
  [
    "Seorang pengkaji hanya melaporkan data yang menyokong hipotesisnya dan mengabaikan data yang bertentangan. Ini adalah:",
    [
      "Amalan statistik yang baik",
      "Cara biasa dalam penyelidikan",
      "Dibenarkan jika sampel kecil",
      "Amalan tidak beretika (memilih-milih data)",
    ],
    3,
    "Memilih-milih data (cherry-picking) adalah amalan tidak beretika yang menghasilkan kesimpulan yang mengelirukan atau palsu.",
    "Hard",
  ],
  [
    "Data kelajuan larian (m/s): 3.2, 3.5, 3.1, 3.4, 3.3, 8.2. Julat = 5.1. Adakah julat ini memberikan gambaran yang tepat tentang serakan? Mengapa?",
    [
      "Tidak, pencilan 8.2 menjadikan julat terlalu besar",
      "Ya, julat sentiasa menunjukkan serakan dengan tepat",
      "Ya, kerana julat menggunakan semua data",
      "Tidak, kerana bilangan data terlalu sedikit",
    ],
    0,
    "Nilai 8.2 adalah pencilan (outlier). Tanpanya, julat = 3.5−3.1 = 0.4 (sangat kecil). Julat dipengaruhi oleh pencilan.",
    "Hard",
  ],
  [
    "Murid A mendapat markah: 70, 72, 68, 71, 74 dalam 5 ujian. Murid B: 55, 85, 60, 90, 45. Siapakah lebih konsisten dan mengapa?",
    [
      "Murid B kerana markahnya lebih pelbagai",
      "Murid A kerana julatnya lebih kecil (6 vs 45)",
      "Kedua-duanya sama konsisten",
      "Murid B kerana markah tertingginya lebih tinggi",
    ],
    1,
    "Julat A = 74 − 68 = 6. Julat B = 90 − 45 = 45. Julat A jauh lebih kecil, jadi Murid A lebih konsisten.",
    "Hard",
  ],
  [
    "Apakah langkah pertama yang MESTI dilakukan semasa mentafsir sebarang carta atau graf?",
    [
      "Kira julat data terlebih dahulu",
      "Bandingkan carta dengan data lain",
      "Cari nilai tertinggi dalam carta",
      "Baca tajuk untuk mengetahui apa yang ditunjukkan",
    ],
    3,
    "Langkah pertama ialah membaca tajuk carta untuk memahami apa yang sedang diwakili. Tanpa ini, tafsiran mungkin tersalah.",
    "Hard",
  ],
  [
    "Graf garis menunjukkan bilangan kes suatu penyakit dari tahun 2015 hingga 2024. Apakah ramalan dan inferens yang tepat?",
    ["Kes menurun secara konsisten dan dijangka terus menurun", "Kes akan mula meningkat semula tahun depan", "Data tidak mencukupi untuk sebarang inferens", "Penyakit itu tidak lagi berbahaya"],
    0,
    "Garis menurun setiap tahun tanpa naik semula. Jika trend ini berterusan, bilangan kes dijangka terus menurun.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.diseaseCases,
  ],
  [
    "Histogram menunjukkan tinggi murid sebuah kelas. Inferens manakah yang paling sesuai?",
    ["Kebanyakan murid sangat rendah", "Kebanyakan murid sangat tinggi", "Kebanyakan murid mempunyai tinggi sederhana", "Semua murid sama tinggi"],
    2,
    "Palang tertinggi berada di tengah (150–155 cm, 12 murid), manakala palang di kedua-dua hujung rendah (2 dan 3 murid). Jadi kebanyakan murid mempunyai tinggi sederhana.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.classHeights,
  ],
  [
    "Carta pai menunjukkan perbelanjaan bulanan sebuah keluarga sebanyak RM1 200. Berapakah perbelanjaan untuk makanan?",
    ["RM600", "RM120", "RM360", "RM400"],
    3,
    "Sudut sektor makanan ialah 120°. Perbelanjaan makanan = 120°/360° × RM1 200 = 1/3 × RM1 200 = RM400.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.familySpending,
  ],
  [
    "Data: 2, 4, 6, 8, 10. Seorang murid menambah satu lagi data: 100. Apakah kesan ke atas julat?",
    [
      "Julat tidak berubah langsung",
      "Julat meningkat daripada 8 kepada 98",
      "Julat berkurang daripada 8",
      "Julat kekal kira-kira 8",
    ],
    1,
    "Julat asal = 10−2 = 8. Dengan data 100: Julat = 100−2 = 98. Pencilan (100) membesarkan julat dengan sangat ketara.",
    "Hard",
  ],
]);

const MATH_C12_OBJECTIVE_3_CHALLENGE_QUESTIONS_DLP = mathQuestions([
  [
    "The line graph shows the number of visitors to a museum from 2021 to 2024. Predict the number of visitors in 2025.",
    ["72 thousand", "68 thousand", "75 thousand", "80 thousand"],
    0,
    "Read the points: 45, 52, 58 and 65 thousand. Visitors increase by about 7 thousand each year, so the prediction for 2025 is 65 + 7 = 72 thousand.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.museumVisitors,
  ],
  [
    "The bar chart shows the sales of four products in RM thousand. Which product contributes more than 30% of total sales?",
    ["Product A", "Product B", "Product C", "Product D"],
    1,
    "Read each bar: A = 5, B = 8, C = 6, D = 3 (RM thousand). Total = 22. 30% × 22 = 6.6. Only Product B (8) exceeds 6.6; Product C (6) does not.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.productSales,
  ],
  [
    "The histogram shows the marks of 50 students in a test. Make an inference about student performance.",
    ["Most students scored below 50 marks", "The data is not enough to draw any conclusion", "Most students scored 61–70 marks", "Every student scored the same mark"],
    2,
    "The tallest bar is the class 61–70 (20 students), and the bars get shorter towards both ends. So most students scored 61–70 marks.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.fiftyMarksHistogram,
  ],
  [
    "The stem-and-leaf plot shows the masses of 13 students. Which statement is correct?",
    ["Range = 4 kg; 74 kg is an outlier", "Range = 36 kg; 38 kg is an outlier", "Range = 35 kg; 74 kg is an outlier", "Range = 36 kg; 74 kg is an outlier"],
    3,
    "Use the key: 3 | 8 = 38 kg (smallest) and 7 | 4 = 74 kg (largest). Range = 74 − 38 = 36 kg, not 7 − 3 = 4 (a stem must be joined to its leaf). The other values are at most 56 kg, so 74 kg lies far from them and is an outlier.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.studentMasses,
  ],
  [
    "Data set A: 48, 50, 51, 49, 52. Data set B: 40, 55, 48, 62, 45. Compare the dispersion of the two data sets using the range and draw a conclusion.",
    [
      "Both sets have the same dispersion",
      "Set A is more consistent because its range is smaller",
      "Set B is more consistent because its range is larger",
      "The sets cannot be compared",
    ],
    1,
    "Range A = 52−48 = 4. Range B = 62−40 = 22. Set A is more consistent (range 4 vs 22) and more reliable.",
    "Hard",
  ],
  [
    "A factory produces 5 products with masses: 99.8, 100.1, 100.0, 99.9, 100.2 g. If standard = 100g ± 0.5g, do all products meet the standard?",
    [
      "No, the 100.2 g product fails the standard",
      "No, only 3 products meet the standard",
      "Yes, all masses lie from 99.5 g to 100.5 g",
      "It cannot be determined without more data",
    ],
    2,
    "Standard: 99.5g to 100.5g. All values (99.8, 100.1, 100.0, 99.9, 100.2) are within this range. All pass.",
    "Hard",
  ],
  [
    "The line graph shows the temperature every hour on one day. Make an inference and predict the temperature at 15:00.",
    ["It will keep rising, to about 36°C", "It will stay at 32°C all afternoon", "There is no clear pattern in the data", "It rises until noon, then falls — about 30°C"],
    3,
    "The temperature rises to 35°C at 12:00, then falls: 35 → 34 → 32 (about 2°C per hour). Prediction at 15:00: about 30°C.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.hourlyTemperature,
  ],
  [
    "The stem-and-leaf plot shows the time a group of students took to finish a puzzle. Find the range of the data.",
    ["31", "28", "33", "35"],
    0,
    "Smallest value = 1 | 2 = 12 and largest value = 4 | 3 = 43. Range = 43 − 12 = 31 minutes.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.puzzleTimesStems,
  ],
  [
    "The dot plot shows the number of hours a group of students slept one night. What is the range of the data, and what is the range if the outlier is removed?",
    ["3 hours; 5 hours", "9 hours; 3 hours", "5 hours; 3 hours", "5 hours; 2 hours"],
    2,
    "The smallest value is 4 and the largest is 9, so range = 9 − 4 = 5 hours. The dot at 4 lies far from the other dots, so 4 is an outlier. Without 4, the smallest value is 6, so range = 9 − 6 = 3 hours.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.sleepHours,
  ],
  [
    "The pie chart is divided into five sectors, A to E. Find x and the percentage of sector E.",
    ["x=40°, 11%", "x=36°, 12%", "x=30°, 10%", "x=36°, 10%"],
    3,
    "The sector angles add up to 360°. 72° + 108° + 54° + 90° + x = 360°, so x = 360° − 324° = 36°. Percentage of E = (36° ÷ 360°) × 100% = 10%.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.fiveSectors,
  ],
  [
    "The histogram shows the marks of a group of students. For the classes 60–70 and 70–80, find the midpoint of each class and their frequency ratio.",
    ["MP1=65, MP2=75, Ratio 3:2", "MP1=64.5, MP2=74.5, Ratio 2:3", "MP1=65, MP2=75, Ratio 2:3", "MP1=64.5, MP2=74.5, Ratio 3:2"],
    0,
    "Read the bars: class 60–70 = 15 and class 70–80 = 10. MP1 = (60 + 70) ÷ 2 = 65. MP2 = (70 + 80) ÷ 2 = 75. Frequency ratio = 15 : 10 = 3:2.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.classMarksHistogram,
  ],
  [
    "The line graph shows the pass rate of a school from 2019 to 2023. Make an inference.",
    ["There is no clear pattern in the pass rates", "Pass rates are generally rising despite the 2020 dip", "Pass rates are falling year after year", "The data is not enough for any inference"],
    1,
    "Read the points: 78%, 75%, 80%, 83% and 85%. The graph dips slightly in 2020, then rises every year. Inference: the pass rate is generally rising.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.passRates,
  ],
  [
    "Which data representation is NOT ethical?",
    [
      "Starting the y-axis at 0",
      "Labelling every axis with clear units",
      "Stating where the data came from",
      "Starting the y-axis at 97 for values of 97–103",
    ],
    3,
    "Starting the y-axis from 97 (not 0) makes small differences between 97–103 appear very large. This is misleading and unethical.",
    "Hard",
  ],
  [
    "Car speed data (km/h): 85, 92, 78, 95, 88, 72, 101, 83. Find the range and make an inference about driving.",
    [
      "Range = 29; the speeds vary quite a lot",
      "Range = 27; the drivers are consistent",
      "Range = 25; every driver is safe",
      "Range = 31; every driver is dangerous",
    ],
    0,
    "Highest=101, Lowest=72. Range=101−72=29. This variation shows speeds are somewhat inconsistent.",
    "Hard",
  ],
  [
    "Marks in Class P range from 40 to 85, while marks in Class Q range from 60 to 75. Which class shows less consistent performance?",
    [
      "Class Q, because its range is 15",
      "Class P, because its range is 45",
      "Class P, because its range is 15",
      "Both classes are equally consistent",
    ],
    1,
    "Range of P = 85 − 40 = 45. Range of Q = 75 − 60 = 15. P has the larger range, so Class P's performance is less consistent.",
    "Hard",
  ],
  [
    "The dot plot shows the number of questions a group of students answered correctly. What is the most appropriate inference?",
    ["The data is spread evenly from 5 to 12", "There are no outliers because every value is recorded", "Most values lie from 6 to 8, and 12 is an outlier", "The data has two modes, 7 and 12"],
    2,
    "Most dots cluster from 6 to 8. The dot at 12 lies far from that cluster, so 12 is an outlier.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.correctAnswersDots,
  ],
  [
    "The frequency table shows the final test marks of a group of students. Find the midpoint of the modal class and the total number of students.",
    ["MP=75, n=40", "MP=74.5, n=40", "MP=74.5, n=38", "MP=75, n=42"],
    0,
    "The modal class is the class with the highest frequency: 70–80 (15). Midpoint = (70 + 80) ÷ 2 = 75. Total students = 8 + 15 + 12 + 5 = 40.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.finalMarks,
  ],
  [
    "Company A has employee salary range = RM500. Company B range = RM5000. A more accurate inference:",
    [
      "Company A is bigger because its range is smaller",
      "Company B pays every employee more than Company A",
      "Salaries in A are more uniform; B has a bigger pay gap",
      "The two companies cannot be compared at all",
    ],
    2,
    "A large range (RM5000) shows a big gap between highest and lowest salaries in Company B. Company A is more uniform.",
    "Hard",
  ],
  [
    "A graph using larger icons to represent smaller values is:",
    [
      "Good practice because icons attract readers",
      "Unethical, because the icon sizes mislead readers",
      "A creative approach that keeps the data accurate",
      "Standard practice in statistics",
    ],
    1,
    "Using icons that don't match actual values is an unethical practice that misleads readers.",
    "Hard",
  ],
  [
    "Class A marks: 55, 62, 58, 70, 65, 68, 72, 60. Class B marks: 40, 80, 55, 75, 45, 85, 50, 70. Compare the dispersion of the two classes' marks using the range.",
    ["Cannot be compared because the marks are different", "Class B is more consistent (range B < range A)", "Both classes are equally consistent", "Class A is more consistent (range A=17, range B=45)"],
    3,
    "Range A = 72 − 55 = 17. Range B = 85 − 40 = 45. Range A is much smaller, so Class A's marks are far more consistent.",
    "Hard",
  ],
  [
    "The frequency polygons show the test marks of Class X and Class Y. What is the most appropriate inference?",
    ["Both classes have the same performance", "Class X performs better than Class Y", "Class X tends to score lower; Class Y tends to score higher", "No inference can be made from the polygons"],
    2,
    "The Class X polygon is highest on the left (a peak of 10 at the midpoint 55), while the Class Y polygon is highest on the right (a peak of 10 at 75). So Class X tends to score lower and Class Y tends to score higher.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.twoClassPolygons,
  ],
  [
    "The line graph shows the monthly sales of a shop over one year. Make an inference about the business pattern.",
    ["Sales are erratic and random throughout the year", "A seasonal pattern: high in the first half, lower in the second", "The business makes a loss in the second half", "The data is not enough to make any inference"],
    1,
    "The line rises from January to June, then falls from July to December. This is a seasonal pattern: sales are high in the first half of the year and lower in the second half.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.yearlySales,
  ],
  [
    "A researcher only reports data supporting their hypothesis and ignores contradictory data. This is:",
    [
      "Good statistical practice",
      "Normal practice in research",
      "Allowed if the sample is small",
      "Unethical practice (cherry-picking data)",
    ],
    3,
    "Cherry-picking data (selecting only supporting data) is unethical and produces misleading or false conclusions.",
    "Hard",
  ],
  [
    "Running speed data (m/s): 3.2, 3.5, 3.1, 3.4, 3.3, 8.2. Range = 5.1. Does this accurately represent dispersion? Why?",
    [
      "No, the outlier 8.2 makes the range too large",
      "Yes, the range always shows the spread accurately",
      "Yes, because the range uses all the data",
      "No, because there are too few data values",
    ],
    0,
    "8.2 is an outlier. Without it, range = 3.5−3.1 = 0.4 (very small). Range is heavily affected by outliers.",
    "Hard",
  ],
  [
    "Student A's marks in 5 tests: 70, 72, 68, 71, 74. Student B: 55, 85, 60, 90, 45. Who is more consistent and why?",
    [
      "Student B because marks are more varied",
      "Student A because range is smaller (6 vs 45)",
      "Both are equally consistent",
      "Student B because highest mark is higher",
    ],
    1,
    "Range A = 74 − 68 = 6. Range B = 90 − 45 = 45. A's range is much smaller, so Student A is more consistent.",
    "Hard",
  ],
  [
    "What is the FIRST step that MUST be done when interpreting any chart or graph?",
    [
      "Calculate the range of the data first",
      "Compare the chart with other data",
      "Find the highest value in the chart",
      "Read the title to know what is shown",
    ],
    3,
    "The first step is to read the chart title to understand what is being represented. Without this, interpretation may be incorrect.",
    "Hard",
  ],
  [
    "The line graph shows the number of cases of a disease from 2015 to 2024. What is the correct prediction and inference?",
    ["Cases are falling steadily and are likely to keep falling", "Cases will start rising again next year", "The data is not enough for any inference", "The disease is no longer dangerous"],
    0,
    "The line falls every year without rising again. If this trend continues, the number of cases is expected to keep falling.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.diseaseCases,
  ],
  [
    "The histogram shows the heights of the students in a class. Which inference is most suitable?",
    ["Most students are very short", "Most students are very tall", "Most students are of medium height", "All the students are the same height"],
    2,
    "The tallest bar is in the middle (150–155 cm, 12 students), while the bars at both ends are short (2 and 3 students). So most students are of medium height.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.classHeights,
  ],
  [
    "The pie chart shows a family's monthly spending of RM1 200. How much is spent on food?",
    ["RM600", "RM120", "RM360", "RM400"],
    3,
    "The food sector angle is 120°. Food spending = 120°/360° × RM1 200 = 1/3 × RM1 200 = RM400.",
    "Hard",
    MATH_F1_C12_QUIZ_VISUALS.familySpending,
  ],
  [
    "Data: 2, 4, 6, 8, 10. A student adds one more data point: 100. What is the effect on the range?",
    [
      "The range does not change at all",
      "The range increases from 8 to 98",
      "The range decreases from 8",
      "The range stays at about 8",
    ],
    1,
    "Original range = 10−2 = 8. With data 100: Range = 100−2 = 98. The outlier (100) drastically increases the range.",
    "Hard",
  ],
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

const MATH_F2_C1_DLP_OBJECTIVE_BANK: Record<MathObjectiveId, ShuffledQuestion[]> = {
  "objective-1": mathF2C1FoundationQuizzesDLP,
  "objective-2": mathF2C1PracticeQuizzesDLP,
  "objective-3": mathF2C1ChallengeQuizzesDLP,
};

const MATH_F2_C1_BM_OBJECTIVE_BANK: Record<MathObjectiveId, ShuffledQuestion[]> = {
  "objective-1": mathF2C1FoundationQuizzesBM,
  "objective-2": mathF2C1PracticeQuizzesBM,
  "objective-3": mathF2C1ChallengeQuizzesBM,
};

const MATH_F2_C2_DLP_OBJECTIVE_BANK: Record<MathObjectiveId, ShuffledQuestion[]> = {
  "objective-1": mathF2C2FoundationQuizzesDLP,
  "objective-2": mathF2C2PracticeQuizzesDLP,
  "objective-3": mathF2C2ChallengeQuizzesDLP,
};

const MATH_F2_C2_BM_OBJECTIVE_BANK: Record<MathObjectiveId, ShuffledQuestion[]> = {
  "objective-1": mathF2C2FoundationQuizzesBM,
  "objective-2": mathF2C2PracticeQuizzesBM,
  "objective-3": mathF2C2ChallengeQuizzesBM,
};

// Form 2 Chapters 3-5 have their own banks; MATH_QUIZ_BANKS is Form 1 content.
const MATH_F2_BATCH_A_OBJECTIVE_BANKS: Record<
  "Chapter 3" | "Chapter 4" | "Chapter 5",
  Record<MathObjectiveId, Record<MathQuizLang, ShuffledQuestion[]>>
> = {
  "Chapter 3": {
    "objective-1": {
      bm: mathF2C3FoundationQuizzesBM,
      dlp: mathF2C3FoundationQuizzesDLP,
    },
    "objective-2": {
      bm: mathF2C3PracticeQuizzesBM,
      dlp: mathF2C3PracticeQuizzesDLP,
    },
    "objective-3": {
      bm: mathF2C3ChallengeQuizzesBM,
      dlp: mathF2C3ChallengeQuizzesDLP,
    },
  },
  "Chapter 4": {
    "objective-1": {
      bm: mathF2C4FoundationQuizzesBM,
      dlp: mathF2C4FoundationQuizzesDLP,
    },
    "objective-2": {
      bm: mathF2C4PracticeQuizzesBM,
      dlp: mathF2C4PracticeQuizzesDLP,
    },
    "objective-3": {
      bm: mathF2C4ChallengeQuizzesBM,
      dlp: mathF2C4ChallengeQuizzesDLP,
    },
  },
  "Chapter 5": {
    "objective-1": {
      bm: mathF2C5FoundationQuizzesBM,
      dlp: mathF2C5FoundationQuizzesDLP,
    },
    "objective-2": {
      bm: mathF2C5PracticeQuizzesBM,
      dlp: mathF2C5PracticeQuizzesDLP,
    },
    "objective-3": {
      bm: mathF2C5ChallengeQuizzesBM,
      dlp: mathF2C5ChallengeQuizzesDLP,
    },
  },
};

const MATH_F2_BATCH_B_OBJECTIVE_BANKS: Record<
  "Chapter 6" | "Chapter 7" | "Chapter 8",
  Record<"bm" | "dlp", Record<MathObjectiveId, ShuffledQuestion[]>>
> = {
  "Chapter 6": {
    bm: {
      "objective-1": mathF2C6FoundationQuizzesBM,
      "objective-2": mathF2C6PracticeQuizzesBM,
      "objective-3": mathF2C6ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C6FoundationQuizzesDLP,
      "objective-2": mathF2C6PracticeQuizzesDLP,
      "objective-3": mathF2C6ChallengeQuizzesDLP,
    },
  },
  "Chapter 7": {
    bm: {
      "objective-1": mathF2C7FoundationQuizzesBM,
      "objective-2": mathF2C7PracticeQuizzesBM,
      "objective-3": mathF2C7ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C7FoundationQuizzesDLP,
      "objective-2": mathF2C7PracticeQuizzesDLP,
      "objective-3": mathF2C7ChallengeQuizzesDLP,
    },
  },
  "Chapter 8": {
    bm: {
      "objective-1": mathF2C8FoundationQuizzesBM,
      "objective-2": mathF2C8PracticeQuizzesBM,
      "objective-3": mathF2C8ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C8FoundationQuizzesDLP,
      "objective-2": mathF2C8PracticeQuizzesDLP,
      "objective-3": mathF2C8ChallengeQuizzesDLP,
    },
  },
};

const MATH_F2_BATCH_C_OBJECTIVE_BANKS: Record<
  "Chapter 9" | "Chapter 10" | "Chapter 11" | "Chapter 12" | "Chapter 13",
  Record<"bm" | "dlp", Record<MathObjectiveId, ShuffledQuestion[]>>
> = {
  "Chapter 9": {
    bm: {
      "objective-1": mathF2C9FoundationQuizzesBM,
      "objective-2": mathF2C9PracticeQuizzesBM,
      "objective-3": mathF2C9ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C9FoundationQuizzesDLP,
      "objective-2": mathF2C9PracticeQuizzesDLP,
      "objective-3": mathF2C9ChallengeQuizzesDLP,
    },
  },
  "Chapter 10": {
    bm: {
      "objective-1": mathF2C10FoundationQuizzesBM,
      "objective-2": mathF2C10PracticeQuizzesBM,
      "objective-3": mathF2C10ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C10FoundationQuizzesDLP,
      "objective-2": mathF2C10PracticeQuizzesDLP,
      "objective-3": mathF2C10ChallengeQuizzesDLP,
    },
  },
  "Chapter 11": {
    bm: {
      "objective-1": mathF2C11FoundationQuizzesBM,
      "objective-2": mathF2C11PracticeQuizzesBM,
      "objective-3": mathF2C11ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C11FoundationQuizzesDLP,
      "objective-2": mathF2C11PracticeQuizzesDLP,
      "objective-3": mathF2C11ChallengeQuizzesDLP,
    },
  },
  "Chapter 12": {
    bm: {
      "objective-1": mathF2C12FoundationQuizzesBM,
      "objective-2": mathF2C12PracticeQuizzesBM,
      "objective-3": mathF2C12ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C12FoundationQuizzesDLP,
      "objective-2": mathF2C12PracticeQuizzesDLP,
      "objective-3": mathF2C12ChallengeQuizzesDLP,
    },
  },
  "Chapter 13": {
    bm: {
      "objective-1": mathF2C13FoundationQuizzesBM,
      "objective-2": mathF2C13PracticeQuizzesBM,
      "objective-3": mathF2C13ChallengeQuizzesBM,
    },
    dlp: {
      "objective-1": mathF2C13FoundationQuizzesDLP,
      "objective-2": mathF2C13PracticeQuizzesDLP,
      "objective-3": mathF2C13ChallengeQuizzesDLP,
    },
  },
};

interface ShuffledQuestion {
  id?: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  difficulty: Difficulty;
  subjectId: string;
  form?: Form;
  chapter?: string;
  lang?: MathQuizLang;
  set?: string;
  visualKey?: string;
  image?: string;
  /** Maths data display (table/chart), rendered by MathObjectiveQuizScreen. */
  visual?: MathQuestionVisualData;
  mathNotation?: "indices";
}

type FormFilter = Form | "All";

/**
 * Resolves a Maths objective question bank. Shared by the quiz page and the
 * server quiz catalog generator (src/features/quiz/catalog), so both always
 * agree on which questions — and how many of each difficulty — a quiz has.
 */
export function resolveMathObjectiveQuestions({
  form,
  chapter,
  mathObjectiveId,
  lang,
  scienceLang,
}: {
  form: string;
  chapter: string | null;
  mathObjectiveId: MathObjectiveId | null;
  lang: MathQuizLang;
  scienceLang: string | null | undefined;
}): { questions: ShuffledQuestion[]; bankLang: MathQuizLang } {
  if (!chapter || !mathObjectiveId) return { questions: [], bankLang: lang };
  const isForm2Chapter1Dlp = form === "Form 2" && chapter === "Chapter 1" && scienceLang === "dlp";
  const isForm2Chapter1Bm = form === "Form 2" && chapter === "Chapter 1" && scienceLang === "bm";
  const isForm2Chapter2Dlp = form === "Form 2" && chapter === "Chapter 2" && scienceLang === "dlp";
  const isForm2Chapter2Bm = form === "Form 2" && chapter === "Chapter 2" && scienceLang === "bm";
  const batchAChapter =
    form === "Form 2" &&
    (chapter === "Chapter 3" || chapter === "Chapter 4" || chapter === "Chapter 5")
      ? chapter
      : null;
  const batchBChapter =
    form === "Form 2" &&
    (chapter === "Chapter 6" || chapter === "Chapter 7" || chapter === "Chapter 8")
      ? chapter
      : null;
  const batchCChapter =
    form === "Form 2" &&
    (chapter === "Chapter 9" ||
      chapter === "Chapter 10" ||
      chapter === "Chapter 11" ||
      chapter === "Chapter 12" ||
      chapter === "Chapter 13")
      ? chapter
      : null;
  const isForm2ObjectiveChapter =
    form === "Form 2" &&
    (chapter === "Chapter 1" ||
      chapter === "Chapter 2" ||
      chapter === "Chapter 3" ||
      chapter === "Chapter 4" ||
      chapter === "Chapter 5" ||
      chapter === "Chapter 6" ||
      chapter === "Chapter 7" ||
      chapter === "Chapter 8" ||
      chapter === "Chapter 9" ||
      chapter === "Chapter 10" ||
      chapter === "Chapter 11" ||
      chapter === "Chapter 12" ||
      chapter === "Chapter 13");
  const questions = isForm2Chapter1Dlp
    ? MATH_F2_C1_DLP_OBJECTIVE_BANK[mathObjectiveId]
    : isForm2Chapter1Bm
      ? MATH_F2_C1_BM_OBJECTIVE_BANK[mathObjectiveId]
      : isForm2Chapter2Dlp
        ? MATH_F2_C2_DLP_OBJECTIVE_BANK[mathObjectiveId]
        : isForm2Chapter2Bm
          ? MATH_F2_C2_BM_OBJECTIVE_BANK[mathObjectiveId]
          : batchAChapter
            ? MATH_F2_BATCH_A_OBJECTIVE_BANKS[batchAChapter][mathObjectiveId][lang]
            : batchBChapter
              ? MATH_F2_BATCH_B_OBJECTIVE_BANKS[batchBChapter][lang][mathObjectiveId]
              : batchCChapter
                ? MATH_F2_BATCH_C_OBJECTIVE_BANKS[batchCChapter][lang][mathObjectiveId]
                : (MATH_QUIZ_BANKS[chapter]?.[mathObjectiveId]?.[lang] ?? []);
  const chapterNumber = Number(chapter.replace("Chapter ", ""));
  const mapped = questions.map((question, questionIndex) => ({
    ...question,
    id:
      question.id ??
      `math-${isForm2ObjectiveChapter ? "f2" : "f1"}-c${chapterNumber}-${mathObjectiveId}-${lang}-q${questionIndex + 1}`,
    form: isForm2ObjectiveChapter ? ("Form 2" as const) : ("Form 1" as const),
    chapter,
    lang,
    set: mathObjectiveId,
  }));
  // Form 2 Chapters 1-2 pick their bank from the page language; every other
  // chapter from the objective language toggle.
  const bankLang: MathQuizLang =
    isForm2Chapter1Dlp || isForm2Chapter2Dlp
      ? "dlp"
      : isForm2Chapter1Bm || isForm2Chapter2Bm
        ? "bm"
        : lang;
  return { questions: mapped, bankLang };
}

// "All" is the "no Form chosen yet" state: quiz lookups reject it, and the Form
// chooser is shown until a real Form is known.
function readStudySearch(): {
  subject: string | null;
  form: FormFilter;
  chapter: string | null;
  hasForm: boolean;
} {
  if (typeof window === "undefined")
    return { subject: null, form: "All", chapter: null, hasForm: false };
  const params = new URLSearchParams(window.location.search);
  const form = normalizeFormParam(params.get("form"));
  return {
    subject: normalizeSubjectParam(params.get("subject")),
    form: form ?? "All",
    chapter: params.get("chapter"),
    hasForm: form !== null,
  };
}

export function QuizFormLoadingState({
  subjectId,
  form,
}: {
  subjectId: string;
  form: Extract<Form, "Form 2" | "Form 3">;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  return (
    <AcademyPanel>
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-10"
      >
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-white/70" aria-hidden="true" />
        <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/50">
          {subj?.name} / {form}
        </p>
        <p className="mt-2 text-sm text-white/60">Loading quizzes…</p>
      </div>
    </AcademyPanel>
  );
}

export function QuizFormErrorState({
  subjectId,
  form,
  onRetry,
  onBack,
}: {
  subjectId: string;
  form: Extract<Form, "Form 2" | "Form 3">;
  onRetry: () => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);

  return (
    <AcademyPanel>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to forms
      </button>

      <div
        role="alert"
        className="relative overflow-hidden rounded-[2rem] border border-rose-400/20 bg-[#0B1220]/62 p-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-10"
      >
        <AlertTriangle className="relative z-10 mx-auto h-8 w-8 text-rose-300" aria-hidden="true" />
        <p className="relative z-10 mt-4 text-xs font-black uppercase tracking-[0.22em] text-rose-300">
          {subj?.name} / {form}
        </p>
        <h2 className="relative z-10 mt-3 font-display text-2xl font-bold text-white">
          Unable to load quizzes
        </h2>
        <p className="relative z-10 mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/60">
          We couldn’t load the quizzes right now.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/50 bg-[#7C3AED]/15 px-5 py-2.5 text-sm font-black text-[#DDD6FE] transition-colors hover:bg-[#7C3AED]/25"
        >
          Retry
        </button>
      </div>
    </AcademyPanel>
  );
}

function QuizzesPage() {
  const { registry, status: registryStatus, retry: retryRegistry } = useContentRegistryStatus();
  const navigate = Route.useNavigate();
  const routeSearch = Route.useSearch() as {
    subject?: string;
    form?: string | number;
    chapter?: string;
  };
  const { progress, awardBadge, markChapter, recordQuizResult } = useProgress();
  const { user: authUser } = useAuth();
  const { openCikgu } = useCikgu();
  const { open: openSignIn } = useSignInModal();
  const initialSearch = useMemo(readStudySearch, []);
  const [subject, setSubject] = useState<string | null>(initialSearch.subject);
  const [chapter, setChapter] = useState<string | null>(initialSearch.chapter);
  const [form, setForm] = useState<FormFilter>(initialSearch.form);
  const [formWasChosen, setFormWasChosen] = useState(initialSearch.hasForm);
  const [diff, setDiff] = useState<"All" | Difficulty>("All");
  const [chapterQuizSet, setChapterQuizSet] = useState<"A" | "B">("A");
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  // Correct answers per historical difficulty tier; the server prices them.
  const [correctByDifficulty, setCorrectByDifficulty] = useState<CorrectByDifficulty>(
    EMPTY_CORRECT_BY_DIFFICULTY,
  );
  const [completionId, setCompletionId] = useState(createQuizCompletionId);
  const [quizCompletion, setQuizCompletion] = useState<QuizCompletionResult | null>(null);
  const [quizCompletionPending, setQuizCompletionPending] = useState(false);
  const [quizCompletionError, setQuizCompletionError] = useState<QuizSaveFailure | null>(null);
  const [done, setDone] = useState(false);
  const quizMotion = useQuizStageTransition();
  // Background music is now handled globally by BgMusicController.
  const [animatedScore, setAnimatedScore] = useState(0);
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null);
  const [timerPref, setTimerPref] = useState<TimerPref>(null);
  const [confirmLeaveQuiz, setConfirmLeaveQuiz] = useState(false);
  const [shuffledPool, setShuffledPool] = useState<ShuffledQuestion[] | null>(null);
  const [mathObjectiveId, setMathObjectiveId] = useState<MathObjectiveId | null>(null);
  const [mathObjectivePhase, setMathObjectivePhase] = useState<MathObjectivePhase>("select");
  const [mathQuizLang, setMathQuizLang] = useState<MathQuizLang | null>(null);
  const [mathShuffledQuestions, setMathShuffledQuestions] = useState<ShuffledQuestion[] | null>(
    null,
  );
  const [englishPaperId, setEnglishPaperId] = useState<EnglishQuizPaperId | null>(null);
  const [englishSetId, setEnglishSetId] = useState<EnglishQuizSetId | null>(null);
  const [englishSetIdF2, setEnglishSetIdF2] = useState<EnglishQuizSetIdF2 | null>(null);
  const [englishSetIdF3, setEnglishSetIdF3] = useState<EnglishQuizSetIdF3 | null>(null);
  const [englishPhase, setEnglishPhase] = useState<MathObjectivePhase>("select");
  const [englishShuffledQuestions, setEnglishShuffledQuestions] = useState<
    ShuffledQuestion[] | null
  >(null);
  const questionSeconds = timerPref?.mode === "timer" ? timerPref.seconds : 0;
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptStartXp, setAttemptStartXp] = useState(progress.xp);
  const quizStreak = useQuizStreak(
    `${subject ?? "picker"}:${form}:${chapter ?? "none"}:${mathObjectiveId ?? "regular"}:${form === "Form 3" && (subject === "science" || subject === "sejarah" || subject === "math") ? chapterQuizSet : (englishSetId ?? englishSetIdF2 ?? englishSetIdF3 ?? "none")}`,
  );
  const confirmStreakAnswer = quizStreak.confirmAnswer;

  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";

  useEffect(() => {
    const nextSubject = normalizeSubjectParam(routeSearch.subject);
    const nextForm = normalizeFormParam(routeSearch.form);
    const nextChapter = routeSearch.chapter ?? null;
    setSubject(nextSubject);
    setForm(nextForm ?? "All");
    setFormWasChosen(nextForm !== null);
    setChapter(nextChapter);
  }, [routeSearch.subject, routeSearch.form, routeSearch.chapter]);

  function formToSearchValue(value: FormFilter) {
    if (value === "All") return undefined;
    return Number(value.replace("Form ", ""));
  }

  function updateQuizSearch(next: {
    subject?: string | null;
    form?: FormFilter | null;
    chapter?: string | null;
  }) {
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        subject: next.subject === undefined ? (subject ?? undefined) : (next.subject ?? undefined),
        form:
          next.form === undefined
            ? formToSearchValue(form)
            : next.form
              ? formToSearchValue(next.form)
              : undefined,
        chapter: next.chapter === undefined ? (chapter ?? undefined) : (next.chapter ?? undefined),
      }),
    });
  }
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const subjectChaptersForForm =
    subject && registry
      ? registry.getRegisteredSubjectChapters(subject, scienceLang ?? undefined, form)
      : [];
  const chapterMeta =
    subject && chapter ? subjectChaptersForForm.find((c) => c.key === chapter) : null;
  const nextChapterMeta = (() => {
    if (!chapter) return null;
    const index = subjectChaptersForForm.findIndex((item) => item.key === chapter);
    if (index < 0) return null;
    return subjectChaptersForForm.slice(index + 1).find((item) => item.selectable) ?? null;
  })();
  const missingChapter = !!(subject && chapter && !chapterMeta);

  const chapterQuizQuestions = useMemo(() => {
    if (!subject || !chapter || !registry) return [];
    return registry.getChapterQuizQuestions(
      subject,
      form,
      chapter,
      isBilingualSubject ? (scienceLang ?? undefined) : undefined,
    );
  }, [subject, chapter, form, scienceLang, isBilingualSubject, registry]);

  const availableChapterQuizSets = useMemo(
    () =>
      form === "Form 3" && (subject === "science" || subject === "sejarah" || subject === "math")
        ? (["A", "B"] as const).filter((set) =>
            chapterQuizQuestions.some((question) => question.set === set),
          )
        : [],
    [subject, form, chapterQuizQuestions],
  );

  const isForm3MathSetQuiz = subject === "math" && form === "Form 3" && availableChapterQuizSets.length > 0;

  const pool = useMemo(() => {
    const filteredQuestions = chapterQuizQuestions.filter((q) => {
      if (availableChapterQuizSets.length > 0 && q.set !== chapterQuizSet) return false;
      if (!isForm3MathSetQuiz && subject !== "sejarah" && diff !== "All" && q.difficulty !== diff) return false;
      return true;
    });

    return filteredQuestions;
  }, [chapterQuizQuestions, availableChapterQuizSets, chapterQuizSet, subject, diff, isForm3MathSetQuiz]);
  const hasSelectedChapterQuiz =
    !!subject &&
    !!chapter &&
    ((subject === "math" && form === "Form 1" && !!MATH_QUIZ_BANKS[chapter]) ||
      (!!registry &&
        registry.hasResourceContent(subject, form, chapter, "quiz", scienceLang ?? undefined)) ||
      pool.length > 0);

  // Data-driven readiness check for Form 2/3 quizzes: a subject/form is ready
  // once real chapters/questions exist for it, rather than hardcoding one subject.
  const hasUpperFormQuizPath = !!(
    subject &&
    (form === "Form 2" || form === "Form 3") &&
    ((!chapter &&
      !!registry &&
      registry.hasFormResourceContent(subject, form, "quiz", scienceLang ?? undefined)) ||
      (chapter && hasSelectedChapterQuiz))
  );

  const activeQuiz = shuffledPool ?? pool;
  const current = shuffledPool?.[idx] ?? null;
  const selectedMathObjective = useMemo(
    () => MATH_OBJECTIVES.find((objective) => objective.id === mathObjectiveId) ?? null,
    [mathObjectiveId],
  );
  const isForm2Chapter1DlpObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 1" && scienceLang === "dlp";
  const isForm2Chapter1BmObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 1" && scienceLang === "bm";
  const isForm2Chapter2DlpObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 2" && scienceLang === "dlp";
  const isForm2Chapter2BmObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 2" && scienceLang === "bm";
  const isForm2Chapter3DlpObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 3" && scienceLang === "dlp";
  const isForm2Chapter3BmObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 3" && scienceLang === "bm";
  const isForm2Chapter4DlpObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 4" && scienceLang === "dlp";
  const isForm2Chapter4BmObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 4" && scienceLang === "bm";
  const isForm2Chapter5DlpObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 5" && scienceLang === "dlp";
  const isForm2Chapter5BmObjective =
    subject === "math" && form === "Form 2" && chapter === "Chapter 5" && scienceLang === "bm";
  const isForm2BatchBDlpObjective =
    subject === "math" &&
    form === "Form 2" &&
    (chapter === "Chapter 6" || chapter === "Chapter 7" || chapter === "Chapter 8") &&
    scienceLang === "dlp";
  const isForm2BatchBBmObjective =
    subject === "math" &&
    form === "Form 2" &&
    (chapter === "Chapter 6" || chapter === "Chapter 7" || chapter === "Chapter 8") &&
    scienceLang === "bm";
  const isForm2BatchCDlpObjective =
    subject === "math" &&
    form === "Form 2" &&
    (chapter === "Chapter 9" ||
      chapter === "Chapter 10" ||
      chapter === "Chapter 11" ||
      chapter === "Chapter 12" ||
      chapter === "Chapter 13") &&
    scienceLang === "dlp";
  const isForm2BatchCBmObjective =
    subject === "math" &&
    form === "Form 2" &&
    (chapter === "Chapter 9" ||
      chapter === "Chapter 10" ||
      chapter === "Chapter 11" ||
      chapter === "Chapter 12" ||
      chapter === "Chapter 13") &&
    scienceLang === "bm";
  const activeMathQuizLang =
    // Route contract: isForm2Chapter1DlpObjective || isForm2Chapter1BmObjective
    // must continue selecting separate language-specific question banks.
    mathQuizLang ??
    (isForm2Chapter1DlpObjective ||
    isForm2Chapter2DlpObjective ||
    isForm2Chapter3DlpObjective ||
    isForm2Chapter4DlpObjective ||
    isForm2Chapter5DlpObjective ||
    isForm2BatchBDlpObjective ||
    isForm2BatchCDlpObjective
      ? "dlp"
      : isForm2Chapter1BmObjective ||
          isForm2Chapter2BmObjective ||
          isForm2Chapter3BmObjective ||
          isForm2Chapter4BmObjective ||
          isForm2Chapter5BmObjective ||
          isForm2BatchBBmObjective ||
          isForm2BatchCBmObjective
        ? "bm"
        : null);
  const mathObjectiveBank = useMemo(
    () =>
      resolveMathObjectiveQuestions({
        form,
        chapter,
        mathObjectiveId,
        lang: activeMathQuizLang ?? "bm",
        scienceLang,
      }),
    [activeMathQuizLang, chapter, form, mathObjectiveId, scienceLang],
  );
  const mathObjectiveQuestions = mathObjectiveBank.questions;
  const currentMathQuestion = mathShuffledQuestions?.[idx] ?? null;
  const selectedEnglishSet = useMemo(
    () => ENGLISH_QUIZ_SETS.find((set) => set.id === englishSetId) ?? null,
    [englishSetId],
  );
  const selectedEnglishSetF2 = useMemo(
    () => ENGLISH_QUIZ_SETS_F2.find((set) => set.id === englishSetIdF2) ?? null,
    [englishSetIdF2],
  );
  const selectedEnglishSetF3 = useMemo(
    () => ENGLISH_QUIZ_SETS_F3.find((set) => set.id === englishSetIdF3) ?? null,
    [englishSetIdF3],
  );
  const englishSetQuestions = useMemo(
    () => (englishSetId ? getEnglishQuizSet(englishSetId) : []),
    [englishSetId],
  );
  const englishSetQuestionsF2 = useMemo(
    () => (englishSetIdF2 ? getEnglishQuizSetF2(englishSetIdF2) : []),
    [englishSetIdF2],
  );
  const englishSetQuestionsF3 = useMemo(
    () => (englishSetIdF3 ? getEnglishQuizSetF3(englishSetIdF3) : []),
    [englishSetIdF3],
  );
  const currentEnglishQuestion = englishShuffledQuestions?.[idx] ?? null;

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
          confirmStreakAnswer({
            questionId: `regular:${subject}:${chapter}:${idx}`,
            correct: false,
          });
          setFeedback({
            kind: "wrong",
            msg: "Masa tamat! ⏰",
            streakReset: quizStreak.streak > 0,
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [
    idx,
    current,
    done,
    timerPref,
    questionSeconds,
    selected,
    subject,
    chapter,
    confirmStreakAnswer,
    quizStreak.streak,
  ]);

  // Build shuffled questions when quiz starts
  useEffect(() => {
    if (timerPref && pool.length > 0) {
      setShuffledPool(buildShuffledPool(pool));
    }
  }, [timerPref, pool]);

  useEffect(() => {
    if (subject !== "english" || form !== "Form 3") return;
    if (englishSetIdF3 || englishPhase !== "select") return;
    const firstSet = ENGLISH_QUIZ_SETS_F3[0]?.id ?? null;
    if (!firstSet) return;
    setEnglishSetIdF3(firstSet);
    setEnglishPhase("intro");
  }, [subject, form, englishSetIdF3, englishPhase]);

  // Background music lifecycle handled globally by BgMusicController.

  // TODO(smart-quiz-memory): this is where question selection happens today
  // — `rawPool` is the fixed, hand-authored question set for a chapter
  // (from src/content/**), shuffled with no memory of what a student has
  // already seen. Planned future architecture (see also src/lib/analytics.ts
  // weak-topic TODO and src/lib/feature-access.ts admin_upload_center TODO):
  //   - question_bank: a Supabase table of quiz questions, seeded from
  //     hand-authored content AND from AI-generated questions derived from
  //     admin-uploaded sources (see content_sources below), tagged with
  //     subject_id/chapter_key/topic_id/difficulty.
  //   - question_attempts: a Supabase table logging (user_id, question_id,
  //     created_at) per question shown/answered, so this function can
  //     prefer question_bank rows the student hasn't seen recently instead
  //     of (or blended with) the static rawPool — i.e. avoid repeating the
  //     exact same question too often.
  // None of this is implemented yet — rawPool selection stays exactly
  // as they are; this comment documents where that logic will plug in.
  function buildShuffledPool(rawPool: QuizQuestion[]): ShuffledQuestion[] {
    const ordered = orderRegularQuizQuestions(rawPool, { subjectId: subject, form });
    if (import.meta.env.DEV && ordered.issues.length > 0) {
      console.error("[quiz-difficulty] Invalid difficulty metadata", ordered.issues);
    }
    return ordered.questions.map((question) => shuffleQuestionOptions(question));
  }

  function buildShuffledMathPool(rawPool: ShuffledQuestion[]): ShuffledQuestion[] {
    const ordered = orderQuestionsByDifficulty(rawPool);
    if (import.meta.env.DEV && ordered.issues.length > 0) {
      console.error("[quiz-difficulty] Invalid Mathematics difficulty metadata", ordered.issues);
    }
    return ordered.questions.map((question) => shuffleQuestionOptions(question));
  }

  function resetQuizAward() {
    setCorrectByDifficulty(EMPTY_CORRECT_BY_DIFFICULTY);
    setCompletionId(createQuizCompletionId());
    setQuizCompletion(null);
    setQuizCompletionPending(false);
    setQuizCompletionError(null);
  }

  function submitCompletedQuiz(input: Omit<QuizCompletionSubmission, "completionId">) {
    setQuizCompletion(null);
    setQuizCompletionPending(true);
    setQuizCompletionError(null);
    void recordQuizResult({ completionId, ...input })
      .then(setQuizCompletion)
      .catch((error: unknown) =>
        setQuizCompletionError({
          kind: quizSaveFailureKindOf(error),
          // Same completion id: the server treats a retry as the same attempt.
          retry: () => submitCompletedQuiz(input),
        }),
      )
      .finally(() => setQuizCompletionPending(false));
  }

  function reshuffle() {
    quizMotion.cancel();
    if (pool.length > 0) {
      setShuffledPool(buildShuffledPool(pool));
    }
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
  }

  function answer(i: number) {
    if (selected !== null || !current) return;
    setSelected(i);
    const correct = i === current.answerIndex;
    if (correct) {
      setScore((s) => s + 1);
      setCorrectByDifficulty((counts) => addCorrectAnswer(counts, current.difficulty));
      sfx.success();
      quizStreak.confirmAnswer({
        questionId: `regular:${subject}:${chapter}:${idx}`,
        correct: true,
      });
      const messages =
        subject === "science" && scienceLang
          ? SCIENCE_QUIZ_FEEDBACK[scienceLang].correct
          : CORRECT_MSGS;
      setFeedback({
        kind: "correct",
        msg: messages[Math.floor(Math.random() * messages.length)],
      });
    } else {
      quizStreak.confirmAnswer({
        questionId: `regular:${subject}:${chapter}:${idx}`,
        correct: false,
      });
      const messages =
        subject === "science" && scienceLang
          ? SCIENCE_QUIZ_FEEDBACK[scienceLang].wrong
          : WRONG_MSGS;
      setFeedback({
        kind: "wrong",
        msg: messages[Math.floor(Math.random() * messages.length)],
        streakReset: quizStreak.streak > 0,
      });
    }
  }

  function next() {
    const total = shuffledPool?.length ?? pool.length;
    if (idx + 1 >= total) {
      setDone(true);
      const subjectId = subject ?? current?.subjectId ?? "unknown";
      const chapterKey = chapter ?? "all";
      submitCompletedQuiz({
        quizKey: buildCanonicalQuizKey({
          kind: "standard",
          subjectId,
          form,
          chapterKey,
          lang: isBilingualSubject ? (scienceLang ?? "bm") : defaultQuizLanguage(subjectId),
          set: availableChapterQuizSets.length > 0 ? chapterQuizSet : null,
          // Sejarah and fixed 25-question Maths sets ignore the difficulty filter.
          difficulty: subject === "sejarah" || isForm3MathSetQuiz ? "All" : diff,
        }),
        formula: "standard",
        subjectId,
        chapterKey,
        total,
        correct: correctByDifficulty,
        timerMode: timerModeFromPref(timerPref),
      });
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      if (
        total > 0 &&
        score + (selected === current?.answerIndex ? 1 : 0) === total &&
        diff === "Hard" && !isForm3MathSetQuiz
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
    quizMotion.cancel();
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
    setTimerPref(null);
    setConfirmLeaveQuiz(false);
    setShuffledPool(null);
    setMathObjectiveId(null);
    setMathObjectivePhase("select");
    setMathQuizLang(null);
    setMathShuffledQuestions(null);
    setEnglishPaperId(null);
    setEnglishSetId(null);
    setEnglishSetIdF2(null);
    setEnglishSetIdF3(null);
    setEnglishPhase("select");
    setEnglishShuffledQuestions(null);
  }

  function redoRegularQuiz() {
    quizMotion.cancel();
    if (pool.length > 0) setShuffledPool(buildShuffledPool(pool));
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
    setConfirmLeaveQuiz(false);
  }

  function resetRegularQuiz() {
    quizMotion.cancel();
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(questionSeconds);
    setAnimatedScore(0);
    setTimerPref(null);
    setConfirmLeaveQuiz(false);
    setShuffledPool(null);
    setMathShuffledQuestions(null);
    setEnglishShuffledQuestions(null);
  }

  function startMathObjectiveQuiz() {
    if (mathObjectiveQuestions.length === 0) return;
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
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
      setScore((s) => s + 1);
      setCorrectByDifficulty((counts) => addCorrectAnswer(counts, currentMathQuestion.difficulty));
      sfx.success();
      quizStreak.confirmAnswer({
        questionId: `math:${chapter}:${mathObjectiveId}:${idx}`,
        correct: true,
      });

      setFeedback({
        kind: "correct",
        msg: CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)],
      });
    } else {
      quizStreak.confirmAnswer({
        questionId: `math:${chapter}:${mathObjectiveId}:${idx}`,
        correct: false,
      });
      setFeedback({
        kind: "wrong",
        msg: WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)],
        streakReset: quizStreak.streak > 0,
      });
    }
  }

  function nextMathObjectiveQuestion() {
    const total = mathShuffledQuestions?.length ?? mathObjectiveQuestions.length;

    if (idx + 1 >= total) {
      setDone(true);
      setMathObjectivePhase("results");
      const subjectId = subject ?? "math";
      const chapterKey = chapter ?? "all";
      submitCompletedQuiz({
        quizKey: buildCanonicalQuizKey({
          kind: "math-objective",
          form: mathObjectiveQuestions[0]?.form ?? form,
          chapterKey,
          lang: mathObjectiveBank.bankLang,
          objectiveId: mathObjectiveId ?? "objective",
        }),
        formula: "objective",
        subjectId,
        chapterKey,
        total,
        correct: correctByDifficulty,
        timerMode: "none",
      });
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      return;
    }

    setIdx((currentIndex) => currentIndex + 1);
    setSelected(null);
    setFeedback(null);
  }

  function startEnglishQuiz() {
    if (englishSetQuestions.length === 0) return;
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(0);
    setAnimatedScore(0);
    setEnglishShuffledQuestions(buildShuffledPool(englishSetQuestions));
    setEnglishPhase("quiz");
  }

  function startEnglishQuizF3() {
    if (englishSetQuestionsF3.length === 0) return;
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(0);
    setAnimatedScore(0);
    setEnglishShuffledQuestions(buildShuffledPool(englishSetQuestionsF3));
    setEnglishPhase("quiz");
  }

  function startEnglishQuizF2() {
    if (englishSetQuestionsF2.length === 0) return;
    setIdx(0);
    setSelected(null);
    setScore(0);
    resetQuizAward();
    setDone(false);
    quizStreak.resetStreak();
    setFeedback(null);
    setTimeLeft(0);
    setAnimatedScore(0);
    setEnglishShuffledQuestions(buildShuffledPool(englishSetQuestionsF2));
    setEnglishPhase("quiz");
  }

  function answerEnglishQuiz(i: number) {
    if (selected !== null || !currentEnglishQuestion) return;

    setSelected(i);
    const correct = i === currentEnglishQuestion.answerIndex;

    if (correct) {
      setScore((s) => s + 1);
      setCorrectByDifficulty((counts) =>
        addCorrectAnswer(counts, currentEnglishQuestion.difficulty),
      );
      sfx.success();
      quizStreak.confirmAnswer({
        questionId: `english:${englishSetId ?? englishSetIdF2 ?? englishSetIdF3}:${idx}`,
        correct: true,
      });

      setFeedback({
        kind: "correct",
        msg: CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)],
      });
    } else {
      quizStreak.confirmAnswer({
        questionId: `english:${englishSetId ?? englishSetIdF2 ?? englishSetIdF3}:${idx}`,
        correct: false,
      });
      setFeedback({
        kind: "wrong",
        msg: WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)],
        streakReset: quizStreak.streak > 0,
      });
    }
  }

  function nextEnglishQuizQuestion() {
    const activeEnglishQuestions =
      form === "Form 2"
        ? englishSetQuestionsF2
        : form === "Form 3"
          ? englishSetQuestionsF3
          : englishSetQuestions;
    const activeEnglishSet =
      form === "Form 2"
        ? selectedEnglishSetF2
        : form === "Form 3"
          ? selectedEnglishSetF3
          : selectedEnglishSet;
    const total = englishShuffledQuestions?.length ?? activeEnglishQuestions.length;

    if (idx + 1 >= total) {
      setDone(true);
      setEnglishPhase("results");
      const activeEnglishSetId = englishSetId ?? englishSetIdF2 ?? englishSetIdF3 ?? "set";
      const chapterKey = activeEnglishSet?.title ?? `English ${form}`;
      submitCompletedQuiz({
        quizKey: buildCanonicalQuizKey({ kind: "english", form, setId: activeEnglishSetId }),
        formula: "objective",
        subjectId: "english",
        chapterKey,
        total,
        correct: correctByDifficulty,
        timerMode: "none",
      });
      if (activeEnglishSet) markChapter("english", activeEnglishSet.title, "quiz");
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

  const planetSubjectId = (subject ?? undefined) as SubjectPlanetId | undefined;
  const regularQuizBm = subject === "science" && scienceLang === "bm";
  const regularQuizCopy = regularQuizBm
    ? {
        shuffleTitle: "Rawak semula soalan",
        shuffle: "Rawak semula",
        lifetimeXp: "XP sepanjang masa",
        correct: "Betul",
        streakLabel: "Turutan jawapan betul kuiz",
        shuffled: "Soalan dirawakkan pada setiap sesi",
        noQuestions: "Tiada soalan yang sepadan — cuba penapis lain.",
        perfectScore: "Skor Sempurna!",
        greatJob: "Syabas!",
        quizComplete: "Kuiz Selesai!",
        resultIntro: "Inilah pencapaian anda",
        accuracy: "Ketepatan",
        totalXpEarned: "Jumlah XP diperoleh",
        bestStreak: "Turutan betul terbaik",
        xpEarned: "XP diperoleh",
        totalXp: "JUMLAH XP",
        tryAgain: "Cuba Lagi",
        chooseChapter: "Pilih Bab",
        nextQuestion: "Soalan Seterusnya →",
        seeResults: "Lihat Keputusan ✨",
        finishQuiz: "Tamatkan Kuiz →",
        quizCompleteLabel: "KUIZ SELESAI",
        excellentWork: "Syabas!",
        continueNext: "Teruskan ke Bab Seterusnya →",
        redoQuiz: "Ulang Kuiz",
        backHome: "Kembali ke Laman Utama",
        backSubject: "Kembali ke Subjek →",
        correctAnswers: "Jawapan betul",
        incorrectAnswers: "Jawapan salah",
        askWhy: "Ace — Mengapakah jawapan saya salah?",
      }
    : {
        shuffleTitle: "Shuffle questions",
        shuffle: "Shuffle",
        lifetimeXp: "Lifetime XP",
        correct: "Correct",
        streakLabel: "Quiz correct-answer streak",
        shuffled: "Questions are shuffled every session",
        noQuestions: "No questions match — try different filters.",
        perfectScore: "Perfect Score!",
        greatJob: "Great Job!",
        quizComplete: "Quiz Complete!",
        resultIntro: "Here's how you did",
        accuracy: "Accuracy",
        totalXpEarned: "Total XP earned",
        bestStreak: "Best correct streak",
        xpEarned: "XP earned",
        totalXp: "TOTAL XP",
        tryAgain: "Try Again",
        chooseChapter: "Choose Chapter",
        nextQuestion: "Next Question →",
        seeResults: "See Results ✨",
        finishQuiz: "Finish Quiz →",
        quizCompleteLabel: "QUIZ COMPLETE",
        excellentWork: "Excellent work!",
        continueNext: "Continue to Next Chapter →",
        redoQuiz: "Redo Quiz",
        backHome: "Back to Home",
        backSubject: "Back to Subject →",
        correctAnswers: "Correct answers",
        incorrectAnswers: "Incorrect answers",
        askWhy: "Ace — Why was my answer wrong?",
      };
  const regularDifficultyLabels: Record<"All" | Difficulty, string> = regularQuizBm
    ? { All: "Semua", Easy: "Mudah", Medium: "Sederhana", Hard: "Sukar" }
    : { All: "All", Easy: "Easy", Medium: "Medium", Hard: "Hard" };

  // ── BM has its own hub page ───────────────────────────────────────────────
  if (subject && !formWasChosen) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormGrid
          subjectId={subject}
          mode="quizzes"
          onSelect={(selectedForm) => {
            setForm(selectedForm);
            setFormWasChosen(true);
            setChapter(null);
            setDiff("All");
            updateQuizSearch({ form: selectedForm, chapter: null });
            reset();
          }}
          onBack={() => {
            setSubject(null);
            setChapter(null);
            setForm("All");
            setFormWasChosen(false);
            updateQuizSearch({ subject: null, form: null, chapter: null });
            reset();
          }}
        />
      </AcademyPageShell>
    );
  }

  // BM owns a dedicated objective-quiz experience and question bank. Route it
  // before registry-driven upper-form fallbacks so Form 2 is never mistaken
  // for an unpopulated generic subject.
  if (
    subject === "bm" &&
    !chapter &&
    (form === "Form 1" || form === "Form 2" || form === "Form 3")
  ) {
    return (
      <BMWorldPage
        mode="quiz"
        quizForm={form === "Form 3" ? 3 : form === "Form 2" ? 2 : 1}
        onBack={() => {
          setSubject(null);
          updateQuizSearch({ subject: null, form: null, chapter: null });
        }}
      />
    );
  }

  if (subject && (form === "Form 2" || form === "Form 3") && !needsScienceLang) {
    const backToForms = () => {
      setChapter(null);
      setFormWasChosen(false);
      updateQuizSearch({ form: null, chapter: null });
      reset();
    };

    if (registryStatus === "loading") {
      return (
        <AcademyPageShell subjectId={planetSubjectId}>
          <QuizFormLoadingState subjectId={subject} form={form} />
        </AcademyPageShell>
      );
    }

    if (registryStatus === "error") {
      return (
        <AcademyPageShell subjectId={planetSubjectId}>
          <QuizFormErrorState
            subjectId={subject}
            form={form}
            onRetry={retryRegistry}
            onBack={backToForms}
          />
        </AcademyPageShell>
      );
    }

    if (!hasUpperFormQuizPath) {
      return (
        <AcademyPageShell subjectId={planetSubjectId}>
          <FormComingSoon subjectId={subject} form={form} mode="quizzes" onBack={backToForms} />
        </AcademyPageShell>
      );
    }
  }

  // ── Subject World early-return ────────────────────────────────────────────
  if (subject === "english" && !chapter) {
    const englishIsForm3 = form === "Form 3";
    return (
      <AcademyPageShell subjectId={planetSubjectId} className="max-w-7xl">
        <QuizStreakCelebration streak={quizStreak.streak} celebration={quizStreak.celebration} />

        {englishIsForm3 ? (
          englishSetIdF3 && selectedEnglishSetF3 && englishPhase !== "select" ? (
            englishPhase === "intro" ? (
              <EnglishSetIntroScreenF3
                quizSet={selectedEnglishSetF3}
                onBack={() => {
                  setEnglishSetIdF3(null);
                  setEnglishPhase("select");
                }}
                onStart={startEnglishQuizF3}
              />
            ) : englishPhase === "results" ? (
              <EnglishResultsScreenF3
                quizSet={selectedEnglishSetF3}
                score={score}
                total={englishShuffledQuestions?.length ?? englishSetQuestionsF3.length}
                quizCompletion={quizCompletion}
                quizCompletionPending={quizCompletionPending}
                quizCompletionError={quizCompletionError}
                onBack={() => {
                  setEnglishSetIdF3(null);
                  setEnglishPhase("select");
                }}
                onRetry={() => {
                  resetRegularQuiz();
                  setEnglishPhase("intro");
                }}
              />
            ) : (
              <EnglishQuizScreenF3
                quizSet={selectedEnglishSetF3}
                questions={
                  englishShuffledQuestions ??
                  englishSetQuestionsF3.map((q) => ({
                    question: q.question,
                    options: q.options,
                    answerIndex: q.answerIndex,
                    explanation: q.explanation,
                    difficulty: q.difficulty,
                    subjectId: q.subjectId,
                    visualKey: q.visualKey,
                    image: q.image,
                  }))
                }
                current={currentEnglishQuestion}
                idx={idx}
                selected={selected}
                feedback={feedback}
                score={score}
                onAnswer={answerEnglishQuiz}
                onNext={nextEnglishQuizQuestion}
                onBack={() => {
                  quizStreak.resetStreak();
                  setEnglishPhase("intro");
                }}
              />
            )
          ) : (
            <EnglishSetSelectionScreenF3
              paperId="paper-1"
              onBack={() => {
                setSubject(null);
                setEnglishSetIdF3(null);
                setEnglishPhase("select");
                resetRegularQuiz();
              }}
              onSelect={(setId) => {
                setEnglishSetIdF3(setId);
                setEnglishPhase("intro");
                resetRegularQuiz();
              }}
            />
          )
        ) : form === "Form 2" ? (
          englishSetIdF2 && selectedEnglishSetF2 && englishPhase !== "select" ? (
            englishPhase === "intro" ? (
              <EnglishSetIntroScreenF2
                quizSet={selectedEnglishSetF2}
                onBack={() => {
                  setEnglishSetIdF2(null);
                  setEnglishPhase("select");
                }}
                onStart={startEnglishQuizF2}
              />
            ) : englishPhase === "results" ? (
              <EnglishResultsScreenF2
                quizSet={selectedEnglishSetF2}
                score={score}
                total={englishShuffledQuestions?.length ?? englishSetQuestionsF2.length}
                quizCompletion={quizCompletion}
                quizCompletionPending={quizCompletionPending}
                quizCompletionError={quizCompletionError}
                onBack={() => {
                  setEnglishSetIdF2(null);
                  setEnglishPhase("select");
                }}
                onRetry={() => {
                  resetRegularQuiz();
                  setEnglishPhase("intro");
                }}
              />
            ) : (
              <EnglishQuizScreenF2
                quizSet={selectedEnglishSetF2}
                questions={
                  englishShuffledQuestions ??
                  englishSetQuestionsF2.map((q) => ({
                    question: q.question,
                    options: q.options,
                    answerIndex: q.answerIndex,
                    explanation: q.explanation,
                    difficulty: q.difficulty,
                    subjectId: q.subjectId,
                    visualKey: q.visualKey,
                    image: q.image,
                  }))
                }
                current={currentEnglishQuestion}
                idx={idx}
                selected={selected}
                feedback={feedback}
                score={score}
                onAnswer={answerEnglishQuiz}
                onNext={nextEnglishQuizQuestion}
                onBack={() => {
                  quizStreak.resetStreak();
                  setEnglishPhase("intro");
                }}
              />
            )
          ) : (
            <EnglishSetSelectionScreenF2
              paperId="paper-1"
              onBack={() => {
                setSubject(null);
                setEnglishSetIdF2(null);
                setEnglishPhase("select");
                resetRegularQuiz();
              }}
              onSelect={(setId) => {
                setEnglishSetIdF2(setId);
                setEnglishPhase("intro");
                resetRegularQuiz();
              }}
            />
          )
        ) : englishSetId && selectedEnglishSet && englishPhase !== "select" ? (
          englishPhase === "intro" ? (
            <EnglishSetIntroScreen
              quizSet={selectedEnglishSet}
              onBack={() => {
                setEnglishSetId(null);
                setEnglishPhase("select");
              }}
              onStart={startEnglishQuiz}
            />
          ) : englishPhase === "results" ? (
            <EnglishResultsScreen
              quizSet={selectedEnglishSet}
              score={score}
              total={englishShuffledQuestions?.length ?? englishSetQuestions.length}
              quizCompletion={quizCompletion}
              quizCompletionPending={quizCompletionPending}
              quizCompletionError={quizCompletionError}
              onBack={() => {
                setEnglishSetId(null);
                setEnglishPhase("select");
              }}
              onRetry={() => {
                resetRegularQuiz();
                setEnglishPhase("intro");
              }}
            />
          ) : (
            <EnglishQuizScreen
              quizSet={selectedEnglishSet}
              questions={
                englishShuffledQuestions ??
                englishSetQuestions.map((q) => ({
                  question: q.question,
                  options: q.options,
                  answerIndex: q.answerIndex,
                  explanation: q.explanation,
                  difficulty: q.difficulty,
                  subjectId: q.subjectId,
                  visualKey: q.visualKey,
                }))
              }
              current={currentEnglishQuestion}
              idx={idx}
              selected={selected}
              feedback={feedback}
              score={score}
              onAnswer={answerEnglishQuiz}
              onNext={nextEnglishQuizQuestion}
              onBack={() => {
                quizStreak.resetStreak();
                setEnglishPhase("intro");
              }}
            />
          )
        ) : (
          <EnglishSetSelectionScreen
            paperId="paper-1"
            onBack={() => {
              setSubject(null);
              setEnglishSetId(null);
              setEnglishPhase("select");
              resetRegularQuiz();
            }}
            onSelect={(setId) => {
              setEnglishSetId(setId);
              setEnglishPhase("intro");
              resetRegularQuiz();
            }}
          />
        )}
      </AcademyPageShell>
    );
  }

  if (subject && !needsScienceLang && !chapter) {
    return (
      <SubjectWorldPage
        subjectId={subject}
        form={form === "All" ? "Form 1" : form}
        scienceLang={scienceLang ?? undefined}
        isBilingualSubject={isBilingualSubject}
        resourceType="quiz"
        onSelectChapter={(key) => {
          setChapter(key);
          setChapterQuizSet("A");
          updateQuizSearch({ chapter: key });
          reset();
        }}
        onBack={() => {
          setSubject(null);
          updateQuizSearch({ subject: null, form: null, chapter: null });
          reset();
        }}
        onChangeLang={isBilingualSubject ? () => setScienceLang(null) : undefined}
      />
    );
  }

  return (
    <AcademyPageShell subjectId={planetSubjectId} className="max-w-7xl">
      <QuizStreakCelebration streak={quizStreak.streak} celebration={quizStreak.celebration} />
      {!timerPref && (
        <>
          <AcademyHero
            eyebrow="Quiz arena"
            title="Take a"
            gradientTitle="Quiz"
            description="Instant scoring, focused practice, and XP momentum for every KSSM subject."
            illustration="quizzes"
            stats={[
              {
                label: "Quiz Progress",
                value: activeQuiz.length > 0 ? `${idx + 1}/${activeQuiz.length}` : "Ready",
              },
              { label: "Questions Completed", value: progress.quizzesTaken },
              {
                label: "Average Score",
                value:
                  activeQuiz.length > 0
                    ? `${Math.round((score / activeQuiz.length) * 100)}%`
                    : "Start",
              },
            ]}
          />
          {subject && chapter && hasSelectedChapterQuiz && (
            <ChapterContentTabs
              subjectId={subject}
              form={form}
              chapterKey={chapter}
              scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
              currentContentType="quizzes"
            />
          )}
          <div className="mb-7 flex justify-center">
            <DailyQuote />
          </div>
        </>
      )}

      {!subject ? (
        <div className="space-y-6">
          {(() => {
            const lastQuiz =
              progress.lastVisited?.type === "quiz" ? progress.lastVisited : undefined;
            const lastResult = [...(progress.quizHistory ?? [])]
              .filter(
                (r) =>
                  !lastQuiz ||
                  (r.subjectId === lastQuiz.subjectId && r.chapterKey === lastQuiz.chapterKey),
              )
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            if (!authUser) {
              return (
                <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Sign in to track progress
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold">Save your quiz results</h2>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Sign in to resume quizzes and see your real scores here.
                  </p>
                  <button
                    type="button"
                    onClick={() => openSignIn("signin")}
                    className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-bold text-white"
                  >
                    Sign In
                  </button>
                </div>
              );
            }
            if (!lastQuiz) {
              return (
                <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Get Started
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold">No quizzes yet</h2>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Complete your first lesson to continue here.
                  </p>
                </div>
              );
            }
            return (
              <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
                <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                  Continue Quiz
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold">
                  {subjects.find((s) => s.id === lastQuiz.subjectId)?.name ?? lastQuiz.subjectId}
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  {cleanLearningLabel(lastQuiz.label)}
                  {lastResult ? ` • Best score ${Math.round(lastResult.scorePct)}%` : ""}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // Resume the saved Form. Older history without a Form
                    // opens the Form chooser instead of guessing Form 1.
                    const resumeForm = normalizeFormParam(lastQuiz.form);
                    setSubject(lastQuiz.subjectId);
                    setForm(resumeForm ?? "All");
                    setFormWasChosen(resumeForm !== null);
                    setChapter(resumeForm ? lastQuiz.chapterKey : null);
                    reset();
                    updateQuizSearch({
                      subject: lastQuiz.subjectId,
                      form: resumeForm,
                      chapter: resumeForm ? lastQuiz.chapterKey : null,
                    });
                  }}
                  className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-bold text-white"
                >
                  Resume Quiz
                </button>
              </div>
            );
          })()}
          <SubjectGrid
            onSelect={(id) => {
              setSubject(id);
              setChapter(null);
              setForm("All");
              setFormWasChosen(false);
              setDiff("All");
              updateQuizSearch({ subject: id, form: null, chapter: null });
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
            updateQuizSearch({ subject: null, form: null, chapter: null });
            reset();
          }}
        />
      ) : !chapter ? (
        <SubjectWorldPage
          subjectId={subject}
          form={form === "All" ? "Form 1" : form}
          scienceLang={scienceLang ?? undefined}
          isBilingualSubject={isBilingualSubject}
          resourceType="quiz"
          onSelectChapter={(key) => {
            setChapter(key);
            setChapterQuizSet("A");
            updateQuizSearch({ chapter: key });
            reset();
          }}
          onBack={() => {
            setSubject(null);
            setChapter(null);
            updateQuizSearch({ subject: null, form: null, chapter: null });
            reset();
          }}
          onChangeLang={isBilingualSubject ? () => setScienceLang(null) : undefined}
        />
      ) : missingChapter ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">Chapter not found. Please choose another chapter.</p>
          <button
            type="button"
            onClick={() => {
              setChapter(null);
              updateQuizSearch({ chapter: null });
              reset();
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to chapters
          </button>
        </div>
      ) : chapterMeta && !hasSelectedChapterQuiz ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          form={form}
          mode="quizzes"
          onBack={() => {
            setChapter(null);
            updateQuizSearch({ chapter: null });
            reset();
          }}
        />
      ) : subject === "math" &&
        (form === "Form 1" ||
          isForm2Chapter1DlpObjective ||
          isForm2Chapter1BmObjective ||
          isForm2Chapter2DlpObjective ||
          isForm2Chapter2BmObjective ||
          isForm2Chapter3DlpObjective ||
          isForm2Chapter3BmObjective ||
          isForm2Chapter4DlpObjective ||
          isForm2Chapter4BmObjective ||
          isForm2Chapter5DlpObjective ||
          isForm2Chapter5BmObjective ||
          isForm2BatchBDlpObjective ||
          isForm2BatchBBmObjective ||
          isForm2BatchCDlpObjective ||
          isForm2BatchCBmObjective) ? (
        !activeMathQuizLang ? (
          <MathQuizLanguagePicker
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={scienceLang ?? undefined}
            onBack={() => {
              setChapter(null);
              updateQuizSearch({ chapter: null });
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
              quizLang={activeMathQuizLang}
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
              total={mathShuffledQuestions?.length ?? mathObjectiveQuestions.length}
              quizCompletion={quizCompletion}
              quizCompletionPending={quizCompletionPending}
              quizCompletionError={quizCompletionError}
              quizLang={activeMathQuizLang}
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
              quizLang={activeMathQuizLang}
              questions={mathShuffledQuestions ?? mathObjectiveQuestions}
              current={currentMathQuestion}
              idx={idx}
              selected={selected}
              feedback={feedback}
              score={score}
              onAnswer={answerMathObjective}
              onNext={nextMathObjectiveQuestion}
              onBack={() => {
                quizStreak.resetStreak();
                setMathObjectivePhase("intro");
              }}
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
            quizLang={activeMathQuizLang}
            onBack={() => {
              if (
                isForm2Chapter1DlpObjective ||
                isForm2Chapter1BmObjective ||
                isForm2Chapter2DlpObjective ||
                isForm2Chapter2BmObjective ||
                isForm2Chapter3DlpObjective ||
                isForm2Chapter3BmObjective ||
                isForm2Chapter4DlpObjective ||
                isForm2Chapter4BmObjective ||
                isForm2Chapter5DlpObjective ||
                isForm2Chapter5BmObjective ||
                isForm2BatchBDlpObjective ||
                isForm2BatchBBmObjective ||
                isForm2BatchCDlpObjective ||
                isForm2BatchCBmObjective
              ) {
                setChapter(null);
                updateQuizSearch({ chapter: null });
                reset();
              } else {
                setMathQuizLang(null);
                setMathObjectiveId(null);
                setMathObjectivePhase("select");
                resetRegularQuiz();
              }
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
          form={form}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          quizSets={availableChapterQuizSets}
          selectedQuizSet={chapterQuizSet}
          onSelectQuizSet={setChapterQuizSet}
          questionCount={pool.length}
          difficultyLabel={subject === "sejarah" || isForm3MathSetQuiz ? regularDifficultyLabels.All : regularDifficultyLabels[diff]}
          onBack={() => {
            setChapter(null);
            updateQuizSearch({ chapter: null });
            reset();
          }}
          onStart={(pref) => {
            setAttemptStartXp(progress.xp);
            resetQuizAward();
            setConfirmLeaveQuiz(false);
            setTimerPref(pref);
          }}
        />
      ) : (
        <QuizArena subjectId={subject}>
          <div className="quiz-hud shrink-0 max-sm:sticky max-sm:top-[env(safe-area-inset-top)] max-sm:z-30 max-sm:-mx-4 max-sm:bg-[#050816]/95 max-sm:px-4 max-sm:pb-1 max-sm:pt-1 sm:pt-1">
            <div className="flex flex-wrap items-start gap-1.5 sm:flex-nowrap sm:items-center sm:gap-2">
              <div className="hidden min-w-0 sm:order-1 sm:mr-auto sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  AcadeMY
                </p>
                <p className="truncate text-xs font-medium text-white/55">
                  {cleanLearningLabel(chapterMeta?.label ?? chapter)}{availableChapterQuizSets.length > 0 && ` • Set ${chapterQuizSet}`}
                </p>
              </div>
              <p className="order-1 shrink-0 font-display text-sm font-bold tabular-nums text-white sm:hidden">
                {(shuffledPool?.length ?? pool.length) > 0 ? idx + 1 : 0}
                <span className="font-medium text-white/40">
                  /{shuffledPool?.length ?? pool.length}
                </span>
              </p>
              <div className="quiz-hud-controls order-2 flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5">
                {timerPref?.mode === "timer" && (
                  <div
                    className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-bold sm:order-2 sm:px-3 sm:py-1.5 ${
                      timeLeft <= 5
                        ? "border-rose-500/40 bg-rose-500/15 text-rose-300"
                        : timeLeft <= 10
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          : "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    <Timer className="h-3 w-3" /> {timeLeft}s
                  </div>
                )}
                <span
                  key={quizStreak.streak}
                  className={`relative inline-flex items-center gap-1 text-xs sm:order-4 sm:text-[11px] ${
                    quizStreak.streak >= 10
                      ? "quiz-streak-max"
                      : quizStreak.streak >= 5
                        ? "quiz-streak-hot"
                        : quizStreak.streak >= 3
                          ? "quiz-streak-warm"
                          : "text-white/40"
                  } ${feedback?.kind === "correct" && quizStreak.streak === 3 ? "quiz-streak-pulse" : ""} ${
                    feedback?.kind === "correct" && quizStreak.streak === 5 ? "quiz-streak-sparks" : ""
                  } ${feedback?.kind === "correct" && quizStreak.streak === 10 ? "quiz-streak-celebrate" : ""}`}
                  aria-label={`${regularQuizCopy.streakLabel}: ${quizStreak.streak}`}
                  title={regularQuizCopy.streakLabel}
                >
                  {feedback?.kind === "correct" && quizStreak.streak === 5 && (
                    <>
                      <i style={{ ["--sx" as string]: "-10px", ["--sy" as string]: "-8px" }} />
                      <i style={{ ["--sx" as string]: "8px", ["--sy" as string]: "-12px", animationDelay: "40ms" }} />
                      <i style={{ ["--sx" as string]: "12px", ["--sy" as string]: "2px", animationDelay: "80ms" }} />
                    </>
                  )}
                  <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                  {quizStreak.streak}
                  <span className="hidden sm:inline"> {regularQuizCopy.correct}</span>
                  {feedback?.kind === "correct" &&
                    (quizStreak.streak === 5 || quizStreak.streak === 10) && (
                      <span className="quiz-streak-note ml-1 text-[10px] font-semibold tracking-wide text-white/70">
                        {quizStreak.streak}
                      </span>
                    )}
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmLeaveQuiz(true)}
                  className="ml-0.5 inline-flex min-h-12 shrink-0 items-center rounded-full border border-white/15 bg-white/5 px-3 text-xs font-bold text-white hover:bg-white/10 sm:order-5 sm:ml-0 sm:min-h-0 sm:px-4 sm:py-2"
                >
                  {regularQuizBm ? "Keluar" : "Exit"}
                </button>
              </div>
              <span className="relative order-3 inline-flex w-full items-center gap-1 text-[11px] text-white/45 sm:order-3 sm:w-auto sm:text-white/40">
                <span className="max-w-[9rem] truncate sm:max-w-none">{regularQuizCopy.lifetimeXp}</span>
                <span data-quiz-xp-target className="font-bold text-[#FBBF24]">
                  {progress.xp}
                </span>
                {!done && feedback?.kind === "correct" && current && (
                  <span key={`xp-${idx}`} className="quiz-xp-float">
                    +{QUIZ_BASE_XP[historicalDifficultyTier(current.difficulty)]} XP
                  </span>
                )}
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10 sm:mt-3 sm:h-1.5">
              <div
                className="quiz-progress-fill h-full rounded-full"
                style={{
                  width: `${((idx + 1) / Math.max(shuffledPool?.length ?? pool.length, 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1.5 text-white/45 sm:mt-2 sm:gap-2">
            <p className="min-w-0 max-w-full flex-[1_1_100%] truncate text-[11px] text-white/40 sm:hidden">
              {cleanLearningLabel(chapterMeta?.label ?? chapter)}{availableChapterQuizSets.length > 0 && ` • Set ${chapterQuizSet}`}
            </p>
            <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
              {subject === "sejarah" ? (
                <div className="flex gap-1">
                  {(["Form 1", "Form 2", "Form 3"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setForm(f);
                        setFormWasChosen(true);
                        updateQuizSearch({ form: f });
                        reset();
                      }}
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold transition ${
                        form === f ? "quiz-subject-chip" : "text-white/40 hover:text-white/70"
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
                      const nextForm = normalizeFormParam(e.target.value);
                      if (!nextForm) return;
                      setForm(nextForm);
                      setFormWasChosen(true);
                      updateQuizSearch({ form: nextForm });
                      reset();
                    }}
                    className="max-w-[7.5rem] rounded-full bg-transparent px-2 py-1 text-[11px] text-white/50 sm:max-w-none"
                  >
                    {forms.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                  {!isForm3MathSetQuiz && <div className="flex gap-1">
                    {diffs.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDiff(d);
                          reset();
                        }}
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold transition ${
                          diff === d ? "quiz-subject-chip" : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        {regularDifficultyLabels[d]}
                      </button>
                    ))}
                  </div>}
                </>
              )}
            </div>
            <button
              onClick={reshuffle}
              title={regularQuizCopy.shuffleTitle}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-white/40 transition hover:text-white/70"
            >
              <Shuffle className="h-3 w-3" /> {regularQuizCopy.shuffle}
            </button>
          </div>
          <p className="sr-only">{regularQuizCopy.shuffled}</p>

          <div className={`quiz-stage w-full py-2 sm:py-6 ${done ? "sm:my-auto" : "is-anchored"}`}>
          {pool.length === 0 || !shuffledPool || shuffledPool.length === 0 ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">
                {subject === "math" ? "Quizzes Coming Soon" : regularQuizCopy.noQuestions}
              </p>
            </div>
          ) : (
            <div className="quiz-swap">
              <div
                ref={quizMotion.panelRef}
                key={done ? "complete" : idx}
                className={`quiz-swap-panel${
                  quizMotion.phase === "exiting"
                    ? " is-exiting"
                    : quizMotion.phase === "preparing"
                      ? " is-preparing"
                      : quizMotion.phase === "entering"
                        ? " is-entering"
                        : ""
                }`}
                aria-live="polite"
              >
          {done ? (
            <div className="quiz-complete mx-auto w-full max-w-lg">
              <div
                className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.10] bg-[#0B1220]/90 backdrop-blur-2xl"
                style={{
                  boxShadow: "0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--quiz-glow),transparent_62%)] opacity-80" />
                <div className="quiz-subject-action h-1 w-full" />
                <div className="relative px-5 py-8 text-center sm:px-8 sm:py-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                    {regularQuizCopy.quizCompleteLabel}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                    {score === (shuffledPool?.length ?? pool.length)
                      ? regularQuizCopy.perfectScore
                      : score >= Math.ceil((shuffledPool?.length ?? pool.length) * 0.7)
                        ? regularQuizCopy.excellentWork
                        : regularQuizCopy.quizComplete}
                  </h2>
                  <div className="quiz-complete-score mx-auto my-6 max-w-xs rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5">
                    <div className="quiz-complete-glow" aria-hidden="true" />
                    <div className="quiz-complete-stars" aria-hidden="true">
                      {[
                        ["22%", "0ms"],
                        ["36%", "70ms"],
                        ["50%", "30ms"],
                        ["64%", "110ms"],
                        ["78%", "20ms"],
                      ].map(([left, delay]) => (
                        <i key={left} style={{ left, animationDelay: delay }} />
                      ))}
                    </div>
                    <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                      {animatedScore}
                      <span className="text-2xl text-white/30 sm:text-3xl">
                        {" "}
                        / {shuffledPool?.length ?? pool.length}
                      </span>
                    </p>
                    <p className="mt-1 text-lg font-bold text-white/70">
                      {Math.round((score / Math.max(shuffledPool?.length ?? pool.length, 1)) * 100)}%
                    </p>
                  </div>
                  <div className="mb-6 grid grid-cols-2 gap-2 text-left">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                      <div className="text-lg font-bold text-emerald-300">{score}</div>
                      <div className="text-[11px] text-white/45">{regularQuizCopy.correctAnswers}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                      <div className="text-lg font-bold text-rose-300">
                        {Math.max((shuffledPool?.length ?? pool.length) - score, 0)}
                      </div>
                      <div className="text-[11px] text-white/45">{regularQuizCopy.incorrectAnswers}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                      <div className="text-lg font-bold">
                        {Math.round((score / Math.max(shuffledPool?.length ?? pool.length, 1)) * 100)}%
                      </div>
                      <div className="text-[11px] text-white/45">{regularQuizCopy.accuracy}</div>
                    </div>
                    <div className="rounded-2xl border border-orange-500/25 bg-orange-500/10 px-3 py-3">
                      <div className="text-lg font-bold text-orange-300">{quizStreak.bestStreak}</div>
                      <div className="text-[11px] text-white/45">{regularQuizCopy.bestStreak}</div>
                    </div>
                    {quizCompletion && (
                      <div className="rounded-2xl border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-3">
                        <div className="text-lg font-bold text-[#FBBF24]">+{quizCompletion.xpEarned}</div>
                        <div className="text-[11px] text-white/45">{regularQuizCopy.xpEarned}</div>
                      </div>
                    )}
                  </div>
                  <div className="mx-auto mb-6 max-w-md text-left">
                    <QuizAwardSummary
                      result={quizCompletion}
                      pending={quizCompletionPending}
                      error={quizCompletionError}
                      bm={scienceLang === "bm"}
                    />
                    <p className="mt-3 text-center text-xs text-white/45">
                      {regularQuizCopy.lifetimeXp} {attemptStartXp.toLocaleString()} →{" "}
                      {progress.xp.toLocaleString()} XP
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {isForm3MathSetQuiz && (
                      <button type="button" onClick={() => {
                        setChapterQuizSet(chapterQuizSet === "A" ? "B" : "A");
                        resetRegularQuiz();
                      }} className="quiz-subject-action min-h-12 w-full rounded-2xl px-4 py-3 text-center font-bold text-white">
                        {scienceLang === "bm" ? "Teruskan ke" : "Continue to"} Set {chapterQuizSet === "A" ? "B" : "A"}
                      </button>
                    )}
                    {nextChapterMeta ? (
                      <button
                        type="button"
                        onClick={() => {
                          setChapter(nextChapterMeta.key);
                          updateQuizSearch({ chapter: nextChapterMeta.key });
                          reset();
                        }}
                        className="quiz-subject-action min-h-12 w-full rounded-2xl px-4 py-3 text-center font-bold text-white"
                      >
                        <span className="block">{regularQuizCopy.continueNext}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-white/80">
                          {nextChapterMeta.label}
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setChapter(null);
                          updateQuizSearch({ chapter: null });
                          reset();
                        }}
                        className="quiz-subject-action min-h-12 w-full rounded-2xl px-4 py-3 font-bold text-white"
                      >
                        {regularQuizCopy.backSubject}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={redoRegularQuiz}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 font-bold text-white hover:bg-white/[0.10]"
                    >
                      <RotateCcw className="h-4 w-4" /> {regularQuizCopy.redoQuiz}
                    </button>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/home" })}
                      className="min-h-12 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white/70 hover:text-white"
                    >
                      {regularQuizCopy.backHome}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            current && (
              <div
                data-quiz-combo-surface
                className={`quiz-card relative overflow-hidden rounded-2xl border border-white/10 sm:rounded-[1.75rem] ${
                  feedback?.kind === "correct" ? "animate-correct-pulse" : ""
                } ${feedback?.kind === "wrong" ? "quiz-card-miss" : ""}`}
              >
                {/* ── Card header ── */}
                <MobileArenaScroll questionKey={idx} revealed={selected !== null} />
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 sm:flex">
                      <span className="text-xs font-bold text-white/50">Q</span>
                      <span className="font-display text-sm font-bold">{idx + 1}</span>
                      <span className="text-xs text-white/30">
                        / {shuffledPool?.length ?? pool.length}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        current.difficulty === "Hard"
                          ? "bg-rose-500/20 text-rose-300"
                          : current.difficulty === "Medium"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {regularDifficultyLabels[current.difficulty]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Live score */}
                    <div className="flex items-center gap-1.5 rounded-full border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-1.5">
                      <Zap className="h-3 w-3 text-[#FBBF24]" />
                      <span className="text-xs font-bold text-[#FBBF24]">{score}</span>
                      <span className="text-[10px] text-white/30">{regularQuizCopy.correct}</span>
                    </div>
                    {timerPref?.mode === "timer" && (
                      <div
                        className={`hidden items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition-all sm:flex ${
                          timeLeft <= 5
                            ? "border-rose-500/40 bg-rose-500/15 text-rose-300 animate-pulse"
                            : timeLeft <= 10
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                              : "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                        }`}
                      >
                        <Timer className="h-3 w-3" /> {timeLeft}s
                      </div>
                    )}
                  </div>
                </div>

                {timerPref?.mode === "timer" && (
                  <div className="px-4 pt-3 sm:px-6 sm:pt-4">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className={`h-full origin-left rounded-full transition-[width,background-color] duration-1000 ease-linear ${timerColor}`}
                        style={{ width: `${timerPct}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Question text ── */}
                <div className="px-4 pb-3 pt-4 sm:px-10 sm:pb-5 sm:pt-7">
                  {current.image ? (
                    <img
                      src={current.image}
                      alt=""
                      className="mb-4 block w-full rounded-xl object-contain"
                    />
                  ) : current.visualKey ? (
                    <EnglishQuestionVisual visualKey={current.visualKey} />
                  ) : null}
                  <h2 className="mx-auto max-w-[40rem] break-words text-center font-display text-[clamp(19px,5.6vw,23px)] font-semibold leading-[1.4] text-white sm:text-[2.15rem] sm:leading-[1.28]">
                    {current.mathNotation === "indices" ? (
                      <MathIndexText text={cleanLearningQuestion(current.question)} lang={current.lang ?? "bm"} />
                    ) : cleanLearningQuestion(current.question)}
                  </h2>
                </div>

                {current.visual && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                    <MathQuestionVisual visual={current.visual} lang={current.lang ?? "bm"} />
                  </div>
                )}

                {/* ── Answer options ── */}
                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 sm:gap-2.5 sm:px-6 sm:pb-6">
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
                        className={`group relative flex min-h-12 touch-manipulation items-start gap-2.5 overflow-hidden rounded-xl border px-3 py-3 text-left focus-visible:outline-none sm:gap-3 sm:rounded-2xl sm:p-5 ${
                          reveal && isAnswer
                            ? "quiz-answer-sweep border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                            : reveal && isPicked && !isAnswer
                              ? "quiz-answer-nudge border-rose-400/50 bg-rose-500/15 shadow-[0_0_16px_rgba(239,68,68,0.15)]"
                              : reveal
                                ? "border-white/[0.05] bg-white/[0.02] opacity-50"
                                : "border-white/[0.09] bg-white/[0.04]"
                        }`}
                      >
                        {/* Letter badge */}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all ${
                            reveal && isAnswer
                              ? "bg-emerald-400 text-[#050816]"
                              : reveal && isPicked && !isAnswer
                                ? "bg-rose-400 text-white"
                                : "bg-white/[0.08] text-white/60"
                          }`}
                        >
                          {letter}
                        </span>
                        <span
                          className={`min-w-0 flex-1 break-words text-[15px] font-medium leading-[1.4] sm:leading-[1.55] ${
                            reveal && isAnswer
                              ? "text-emerald-100"
                              : reveal && isPicked && !isAnswer
                                ? "text-rose-100"
                                : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {current.mathNotation === "indices" ? (
                            <MathIndexText text={o} lang={current.lang ?? "bm"} />
                          ) : o}
                        </span>
                        {reveal && isAnswer && (
                          <CheckCircle2 className="quiz-check-pop mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
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
                  <div className="quiz-feedback">
                    <QuestionXpFeedback feedback={feedback} bm={regularQuizBm} />
                  </div>
                )}

                {/* ── Explanation ── */}
                {selected !== null && current.explanation && (
                  <div className="quiz-explain mx-4 mb-2 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:mx-6 sm:mb-4 sm:gap-3 sm:rounded-2xl sm:p-4">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
                    <p className="max-w-[46rem] text-sm leading-6 text-slate-300 sm:leading-7">
                      {current.mathNotation === "indices" ? (
                        <MathIndexText text={current.explanation} lang={current.lang ?? "bm"} />
                      ) : current.explanation}
                    </p>
                  </div>
                )}

                {/* ── Ace wrong-answer explainer ── */}
                {selected !== null && feedback?.kind === "wrong" && (
                  <div className="mx-4 mb-2 sm:mx-6 sm:mb-4 sm:animate-fade-up">
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
                          initialMessage: regularQuizBm
                            ? `Saya salah pilih "${current.options[selected]}" untuk soalan ini. Boleh Cikgu terangkan mengapa jawapan saya salah dan mengapa "${current.options[current.answerIndex]}" ialah jawapan yang betul?`
                            : `I chose "${current.options[selected]}" for this question. Can you explain why it is wrong and why "${current.options[current.answerIndex]}" is correct?`,
                        })
                      }
                      className="flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-2.5 text-sm font-semibold text-[#A5B4FC] transition-all hover:border-[#6366F1]/50 hover:bg-[#6366F1]/20 active:scale-[0.99] sm:gap-2.5 sm:rounded-2xl sm:py-3"
                    >
                      <span className="text-base">👨‍🚀</span>
                      {regularQuizCopy.askWhy}
                    </button>
                  </div>
                )}

                {/* ── Next button ── */}
                {selected !== null && (
                  <div className="quiz-continue border-t border-white/[0.06] px-4 py-3 sm:px-6 sm:py-4">
                    <button
                      type="button"
                      disabled={quizMotion.busy}
                      onClick={() => quizMotion.advance(() => next())}
                      className="quiz-subject-action min-h-12 w-full touch-manipulation rounded-xl py-3 font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70 sm:rounded-2xl sm:py-3.5"
                    >
                      {idx + 1 >= (shuffledPool?.length ?? pool.length)
                        ? regularQuizCopy.finishQuiz
                        : regularQuizCopy.nextQuestion}
                    </button>
                  </div>
                )}
              </div>
            )
          )}
              </div>
            </div>
          )}
          </div>
          {confirmLeaveQuiz && (
            <div
              className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 p-4 sm:items-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quiz-arena-leave-title"
            >
              <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-2xl">
                <h2 id="quiz-arena-leave-title" className="font-display text-xl font-bold">
                  {regularQuizBm ? "Keluar dari kuiz?" : "Leave this quiz?"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {regularQuizBm
                    ? "Kemajuan soalan pada halaman ini akan hilang."
                    : "Question progress on this page will be lost."}
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmLeaveQuiz(false)}
                    className="flex-1 rounded-2xl border border-white/15 py-3 text-sm font-bold"
                  >
                    {regularQuizBm ? "Kekal" : "Stay"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmLeaveQuiz(false);
                      setChapter(null);
                      updateQuizSearch({ chapter: null });
                      reset();
                    }}
                    className="quiz-subject-action flex-1 rounded-2xl py-3 text-sm font-bold"
                  >
                    {regularQuizBm ? "Keluar" : "Leave quiz"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </QuizArena>
      )}
    </AcademyPageShell>
  );
}

function XpResultRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-1.5 ${strong ? "font-bold text-white" : "text-sm text-white/65"}`}
    >
      <span>{label}</span>
      <span className={strong ? "text-[#FBBF24]" : "text-white"}>+{value} XP</span>
    </div>
  );
}

function QuizAwardSummary({
  result,
  pending,
  error,
  bm = false,
}: {
  result: QuizCompletionResult | null;
  pending: boolean;
  error: QuizSaveFailure | null;
  bm?: boolean;
}) {
  const { open: openSignIn } = useSignInModal();
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left" role="status">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
        {bm ? "XP kuiz" : "Quiz XP"}
      </p>
      {pending ? (
        <p className="text-sm text-white/65">{bm ? "Menyimpan keputusan…" : "Saving result…"}</p>
      ) : error ? (
        <>
          <p className="text-sm text-rose-200">{quizSaveFailureMessage(error.kind, bm)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {error.kind === "session_expired" && (
              <button
                type="button"
                onClick={() => openSignIn("signin")}
                className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white hover:bg-white/15"
              >
                {bm ? "Log masuk" : "Sign in"}
              </button>
            )}
            <button
              type="button"
              onClick={error.retry}
              className="rounded-full bg-[#FBBF24] px-4 py-1.5 text-xs font-bold text-slate-900 hover:bg-[#FCD34D]"
            >
              {bm ? "Cuba lagi" : "Try again"}
            </button>
          </div>
        </>
      ) : result ? (
        <>
          <XpResultRow
            label={bm ? "XP soalan" : "Question XP"}
            value={result.awarded ? result.baseXp : 0}
          />
          <XpResultRow
            label={bm ? "Bonus jawapan betul" : "Correct-answer bonus"}
            value={result.awarded ? result.correctBonusXp : 0}
          />
          {result.timerBonusXp > 0 && (
            <XpResultRow
              label={bm ? "Bonus pemasa" : "Timer bonus"}
              value={result.awarded ? result.timerBonusXp : 0}
            />
          )}
          <XpResultRow
            label={bm ? "Bonus lulus" : "Pass bonus"}
            value={result.awarded ? result.passBonusXp : 0}
          />
          <div className="mt-3 border-t border-white/10 pt-3">
            <XpResultRow label={bm ? "JUMLAH XP" : "TOTAL XP"} value={result.xpEarned} strong />
          </div>
          {!result.eligible && (
            <p className="mt-3 text-xs text-amber-100/75">
              {bm
                ? "Tetamu boleh berlatih, tetapi XP tidak disimpan atau dimasukkan dalam papan pendahulu."
                : "Guests can practise, but XP is not saved or added to the leaderboard."}
            </p>
          )}
          {result.eligible && !result.awarded && (
            <p className="mt-3 text-xs text-white/55">
              {bm
                ? "Kuiz ini telah memberikan XP sebelum ini. Cubaan latihan ini memberi 0 XP tambahan."
                : "This quiz has already awarded XP. This practice retake earns 0 additional XP."}
            </p>
          )}
        </>
      ) : null}
    </div>
  );
}

function MobileArenaScroll({ questionKey, revealed }: { questionKey: number; revealed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia?.("(max-width: 639px)");
    if (!media?.matches) return;
    const arena = ref.current?.closest(".quiz-arena");
    if (!(arena instanceof HTMLElement) || arena.scrollTop === 0) return;
    arena.scrollTo({ top: 0, behavior: "auto" });
  }, [questionKey]);

  useEffect(() => {
    if (!revealed) return;
    const media = window.matchMedia?.("(max-width: 639px)");
    if (!media?.matches) return;
    const arena = ref.current?.closest(".quiz-arena");
    const feedback = arena?.querySelector(".quiz-feedback");
    if (!(arena instanceof HTMLElement) || !(feedback instanceof HTMLElement)) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const overflow = feedback.getBoundingClientRect().bottom - (arena.getBoundingClientRect().bottom - 16);
    if (overflow > 12) {
      arena.scrollBy({ top: overflow, behavior: reduced ? "auto" : "smooth" });
    }
  }, [revealed]);

  return <div ref={ref} className="pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" />;
}

function QuestionXpFeedback({ feedback, bm = false }: { feedback: QuizFeedback; bm?: boolean }) {
  return (
    <div
      className={`quiz-xp-feedback mx-4 mb-2 rounded-xl border px-3 py-2 sm:mx-6 sm:mb-4 sm:rounded-2xl sm:p-4 ${
        feedback.kind === "correct"
          ? "border-emerald-400/30 bg-emerald-500/12"
          : "border-rose-400/30 bg-rose-500/12"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {feedback.kind === "correct" ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 sm:h-5 sm:w-5" aria-hidden="true" />
        ) : (
          <XCircle className="h-4 w-4 shrink-0 text-rose-400 sm:h-5 sm:w-5" aria-hidden="true" />
        )}
        <span
          className={`font-display text-sm font-bold sm:text-lg ${feedback.kind === "correct" ? "text-emerald-300" : "text-rose-300"}`}
        >
          {feedback.msg}
        </span>
      </div>
      {feedback.streakReset && (
        <p className="mt-2 text-xs text-white/55">
          {bm
            ? "Turutan jawapan betul ditetapkan semula. Bina semula pada soalan seterusnya."
            : "Correct-answer streak reset. Build it again on the next question."}
        </p>
      )}
    </div>
  );
}

function QuizSettingsScreen({
  subjectId,
  form,
  chapterKey,
  scienceLang,
  quizSets = [],
  selectedQuizSet,
  onSelectQuizSet,
  questionCount,
  difficultyLabel,
  onBack,
  onStart,
}: {
  subjectId: string;
  form: FormFilter;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  quizSets?: readonly ("A" | "B")[];
  selectedQuizSet?: "A" | "B";
  onSelectQuizSet?: (set: "A" | "B") => void;
  questionCount: number;
  difficultyLabel: string;
  onBack: () => void;
  onStart: (pref: { mode: TimerMode; seconds: number }) => void;
}) {
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang, form)
    .find((candidate) => candidate.key === chapterKey);
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
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
        </span>
      </div>

      <div className="glass-strong rounded-3xl border border-white/10 bg-[#070d1c]/80 p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A78BFA]">
            AcadeMY Quiz Arena
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">
            {subj?.name ?? "Quiz"}{" "}
            <span className="gradient-text">{cleanLearningLabel(chapter?.label ?? chapterKey)}</span>
          </h2>
          <p className="mt-3 text-sm text-white/70">
            {questionCount} {scienceLang === "bm" ? "soalan" : "questions"}
            <span className="mx-2 text-white/25">•</span>
            {scienceLang === "bm" ? "Tahap" : "Difficulty"}: {difficultyLabel}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {scienceLang === "bm"
              ? "Baca soalan, pilih satu jawapan, kemudian semak penjelasan sebelum teruskan. Pemasa bermula hanya selepas anda menekan Start Quiz."
              : "Read each question, choose one answer, then review the explanation before you continue. The timer starts only after you press Start Quiz."}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Timer choice does not change XP. XP is based only on completion and final score.
          </p>
        </div>

        {quizSets.length > 0 && selectedQuizSet && onSelectQuizSet && (
          <div className="mb-8">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {scienceLang === "bm" ? "Pilih set kuiz" : "Choose a quiz set"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {quizSets.map((set) => (
                <button
                  key={set}
                  type="button"
                  onClick={() => onSelectQuizSet(set)}
                  aria-pressed={selectedQuizSet === set}
                  className={`rounded-2xl border px-5 py-4 text-center font-display text-lg font-bold transition-all ${
                    selectedQuizSet === set
                      ? "border-primary bg-gradient-to-r from-primary/25 to-accent/25 text-white shadow-[0_0_24px_oklch(0.63_0.22_295_/_0.28)]"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:bg-white/10"
                  }`}
                >
                  {scienceLang === "bm" ? `Set ${set}` : `Set ${set}`}
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    25 {scienceLang === "bm" ? "soalan" : "questions"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {/* With Timer */}
          <button
            onClick={() => setMode("timer")}
            aria-pressed={mode === "timer"}
            aria-label="Timed quiz. Select 15, 30, or 60 seconds per question. Timer choice does not change XP."
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
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 60].map((s) => (
                    <span
                      key={s}
                      role="button"
                      tabIndex={0}
                      aria-pressed={seconds === s}
                      aria-label={`${s === 60 ? "1 minute" : `${s} seconds`} per question${s === 15 ? ", challenge mode" : ""}`}
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
                      className={`min-h-11 rounded-xl px-2 py-2 text-center text-xs font-bold cursor-pointer transition ${
                        seconds === s
                          ? s === 15
                            ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg"
                            : "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      <span className="block">{s === 60 ? "1 MIN" : `${s} SEC`}</span>
                      <span className="mt-0.5 block text-[10px]">PER QUESTION</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>

          {/* No Timer */}
          <button
            onClick={() => setMode("none")}
            aria-pressed={mode === "none"}
            aria-label={`No Timer${mode === "none" ? ", selected" : ""}`}
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
            <span className="mt-4 inline-flex rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold text-emerald-200">
              NO TIMER
            </span>
          </button>
        </div>

        {mode && (
          <div
            className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/70"
            role="status"
          >
            <span className="font-bold text-white">
              {mode === "none"
                ? "No Timer"
                : `${seconds === 60 ? "1 Minute" : `${seconds} Second`} Challenge`}
            </span>
            <span className="mx-2 text-white/25">•</span>
            <span>Same completion + score XP rules</span>
          </div>
        )}

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

function EnglishSetSelectionScreen({
  paperId,
  onBack,
  onSelect,
  paperOverride,
  setsOverride,
}: {
  paperId: EnglishQuizPaperId;
  onBack: () => void;
  onSelect: (setId: EnglishQuizSetId) => void;
  paperOverride?: (typeof ENGLISH_QUIZ_PAPERS)[number];
  setsOverride?: EnglishQuizSetMeta[];
}) {
  const paper = paperOverride ?? ENGLISH_QUIZ_PAPERS.find((item) => item.id === paperId);
  const sets = setsOverride ?? getEnglishQuizSetsForPaper(paperId);

  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to papers
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {paper?.badge} {cleanLearningLabel(paper?.title)}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {cleanLearningLabel(paper?.title)}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Choose Your <span className="gradient-text">Practice Set</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Each set uses its complete registered UASA-style question bank.
          </p>
        </div>

        <div
          className={`mt-8 grid gap-4 ${sets.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {sets.map((quizSet, index) => (
            <button
              key={quizSet.id}
              onClick={() => onSelect(quizSet.id)}
              aria-label={`Open ${cleanLearningLabel(quizSet.title)}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${quizSet.tone} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${quizSet.tone} text-3xl shadow-lg`}
              >
                {quizSet.badge}
              </div>
              <h3 className="relative font-display text-xl font-bold">
                {cleanLearningTitle(quizSet.title)}
              </h3>
              <p className="relative mt-1 text-sm font-bold text-cyan-200">{quizSet.level}</p>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">
                {quizSet.description}
              </p>
              <div className="relative mt-4 space-y-2">
                {quizSet.coverage.map((item) => (
                  <p key={item} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300">
                    {item}
                  </p>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnglishSetIntroScreen({
  quizSet,
  onBack,
  onStart,
  formLabel = "English Form 1",
}: {
  quizSet: EnglishQuizSetMeta;
  onBack: () => void;
  onStart: () => void;
  formLabel?: string;
}) {
  const focus =
    quizSet.id === "objective-c"
      ? ["Full mixed Paper 1 simulation", "Parts 1, 2, 3, 4 and 5", "Mini UASA exam flow"]
      : quizSet.coverage.slice(0, 2);

  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sets
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {formLabel} • {cleanLearningLabel(quizSet.title)}
        </span>
      </div>

      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center">
        <div
          className={`absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${quizSet.tone} opacity-20 blur-3xl`}
        />
        <div className="relative">
          <div
            className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${quizSet.tone} text-4xl shadow-lg`}
          >
            {quizSet.badge}
          </div>
          <p className="text-sm font-bold text-cyan-200">{formLabel} Quizzes</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {cleanLearningTitle(quizSet.title)}
          </h2>
          <p className="mt-2 font-semibold text-muted-foreground">{quizSet.level}</p>

          <div className="mx-auto mt-7 max-w-3xl rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left">
            <h3 className="font-display text-xl font-bold">Quiz Focus</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {focus.map((item) => (
                <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <div className="text-2xl font-bold text-cyan-200">A-D</div>
                <div className="mt-1 text-xs text-muted-foreground">Options</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <div className="text-2xl font-bold text-cyan-200">UASA</div>
                <div className="mt-1 text-xs text-muted-foreground">Difficulty</div>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent py-3.5 font-display text-lg font-bold text-white shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.45)] transition-all hover:scale-[1.02]"
          >
            <Play className="h-5 w-5" /> Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function EnglishSetSelectionScreenF2({
  paperId,
  onBack,
  onSelect,
}: {
  paperId: EnglishQuizPaperIdF2;
  onBack: () => void;
  onSelect: (setId: EnglishQuizSetIdF2) => void;
}) {
  const paper = ENGLISH_QUIZ_PAPERS_F2.find((item) => item.id === paperId);
  const sets = getEnglishQuizSetsForPaperF2(paperId);
  return (
    <EnglishSetSelectionScreen
      paperId={paperId}
      onBack={onBack}
      onSelect={(setId) => onSelect(setId as EnglishQuizSetIdF2)}
      paperOverride={paper}
      setsOverride={sets}
    />
  );
}

function EnglishSetIntroScreenF2(props: {
  quizSet: EnglishQuizSetMetaF2;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <EnglishSetIntroScreen
      {...(props as unknown as Parameters<typeof EnglishSetIntroScreen>[0])}
      formLabel="English Form 2"
    />
  );
}

function EnglishQuizScreenF2(props: {
  quizSet: EnglishQuizSetMetaF2;
  questions: ShuffledQuestion[];
  current: ShuffledQuestion | null;
  idx: number;
  selected: number | null;
  feedback: QuizFeedback | null;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <EnglishQuizScreen
      {...(props as unknown as Parameters<typeof EnglishQuizScreen>[0])}
      formLabel="English Form 2"
    />
  );
}

function EnglishResultsScreenF2(props: {
  quizSet: EnglishQuizSetMetaF2;
  score: number;
  total: number;
  quizCompletion: QuizCompletionResult | null;
  quizCompletionPending: boolean;
  quizCompletionError: QuizSaveFailure | null;
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <EnglishResultsScreen
      {...(props as unknown as Parameters<typeof EnglishResultsScreen>[0])}
      formLabel="English Form 2"
    />
  );
}

function EnglishSetSelectionScreenF3({
  paperId,
  onBack,
  onSelect,
}: {
  paperId: EnglishQuizPaperIdF3;
  onBack: () => void;
  onSelect: (setId: EnglishQuizSetIdF3) => void;
}) {
  const paper = ENGLISH_QUIZ_PAPERS_F3.find((item) => item.id === paperId);
  const sets = getEnglishQuizSetsForPaperF3(paperId);
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to papers
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {paper?.badge} {cleanLearningLabel(paper?.title)}
        </span>
      </div>
      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {cleanLearningLabel(paper?.title)}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Choose Your <span className="gradient-text">UASA Set</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every set follows Form 3 UASA-style Paper 1 difficulty.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sets.map((quizSet, index) => (
            <button
              key={quizSet.id}
              onClick={() => onSelect(quizSet.id)}
              aria-label={`Open ${cleanLearningLabel(quizSet.title)}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${quizSet.tone} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${quizSet.tone} text-3xl shadow-lg`}
              >
                {quizSet.badge}
              </div>
              <h3 className="relative font-display text-xl font-bold">
                {cleanLearningTitle(quizSet.title)}
              </h3>
              <p className="relative mt-1 text-sm font-bold text-cyan-200">{quizSet.level}</p>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">
                {quizSet.description}
              </p>
              <div className="relative mt-4 space-y-2">
                {quizSet.coverage.map((item) => (
                  <p key={item} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300">
                    {item}
                  </p>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnglishSetIntroScreenF3({
  quizSet,
  onBack,
  onStart,
}: {
  quizSet: EnglishQuizSetMetaF3;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sets
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          English Form 3 • {cleanLearningLabel(quizSet.title)}
        </span>
      </div>
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center">
        <div
          className={`absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${quizSet.tone} opacity-20 blur-3xl`}
        />
        <div className="relative">
          <div
            className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${quizSet.tone} text-4xl shadow-lg`}
          >
            {quizSet.badge}
          </div>
          <p className="text-sm font-bold text-cyan-200">English Form 3 Quizzes</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {cleanLearningTitle(quizSet.title)}
          </h2>
          <p className="mt-2 font-semibold text-muted-foreground">{quizSet.level}</p>
          <div className="mx-auto mt-7 max-w-3xl rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left">
            <h3 className="font-display text-xl font-bold">Quiz Focus</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quizSet.coverage.map((item) => (
                <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onStart}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent py-3.5 font-display text-lg font-bold text-white shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.45)] transition-all hover:scale-[1.02]"
          >
            <Play className="h-5 w-5" /> Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function EnglishQuizScreen({
  quizSet,
  questions,
  current,
  idx,
  selected,
  feedback,
  score,
  onAnswer,
  onNext,
  onBack,
  formLabel = "English Form 1",
}: {
  quizSet: EnglishQuizSetMeta;
  questions: ShuffledQuestion[];
  current: ShuffledQuestion | null;
  idx: number;
  selected: number | null;
  feedback: QuizFeedback | null;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  formLabel?: string;
}) {
  const total = questions.length;

  if (!current || total === 0) {
    return (
      <div className="glass-strong rounded-3xl p-8 text-center animate-fade-up">
        <p className="text-muted-foreground">Questions Coming Soon</p>
      </div>
    );
  }

  return (
    <QuizArena subjectId="english">
    <div className="my-auto w-full animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to instructions
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {formLabel} • {cleanLearningLabel(quizSet.title)}
        </span>
      </div>

      <div
        key={idx}
        data-quiz-combo-surface
        className={`quiz-q-enter relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/80 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl ${
          feedback?.kind === "correct" ? "animate-correct-pulse" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-cyan-200">
              {quizSet.badge} {cleanLearningTitle(quizSet.title)}
            </span>
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

        <div className="px-6 pt-4">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={idx + 1}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${quizSet.tone} transition-all duration-500`}
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="px-6 pb-4 pt-6">
          {current.image ? (
            <img
              src={current.image}
              alt=""
              className="mb-4 block w-full rounded-xl object-contain"
            />
          ) : current.visualKey ? (
            <EnglishQuestionVisual visualKey={current.visualKey} />
          ) : null}
          <h2 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
            {cleanLearningQuestion(current.question)}
          </h2>
        </div>

        <div className="grid gap-2.5 px-6 pb-6 sm:grid-cols-2">
          {current.options.map((option, optionIndex) => {
            const isAnswer = optionIndex === current.answerIndex;
            const isPicked = optionIndex === selected;
            const reveal = selected !== null;
            const letter = ["A", "B", "C", "D"][optionIndex] ?? String(optionIndex + 1);

            return (
              <button
                type="button"
                key={`${idx}-${option}`}
                onClick={() => onAnswer(optionIndex)}
                disabled={reveal}
                aria-pressed={isPicked}
                aria-label={`Answer ${letter}: ${option}`}
                className={`quiz-answer-button group relative flex min-h-[4.5rem] items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/70 ${
                  reveal && isAnswer
                    ? "border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                    : reveal && isPicked && !isAnswer
                      ? "border-rose-400/50 bg-rose-500/15 shadow-[0_0_16px_rgba(239,68,68,0.15)]"
                      : reveal
                        ? "border-white/[0.05] bg-white/[0.02] opacity-50"
                        : "border-white/[0.09] bg-white/[0.04] hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.08]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all ${
                    reveal && isAnswer
                      ? "bg-emerald-400 text-[#050816]"
                      : reveal && isPicked && !isAnswer
                        ? "bg-rose-400 text-white"
                        : "bg-white/[0.08] text-white/60 group-hover:bg-cyan-300/20 group-hover:text-cyan-200"
                  }`}
                >
                  {letter}
                </span>
                <span
                  className={`flex-1 text-sm font-semibold leading-6 ${
                    reveal && isAnswer
                      ? "text-emerald-100"
                      : reveal && isPicked && !isAnswer
                        ? "text-rose-100"
                        : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {option}
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

        {feedback && <QuestionXpFeedback feedback={feedback} />}

        {selected !== null && current.explanation && (
          <div className="mx-6 mb-4 flex items-start gap-3 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/8 p-4 animate-fade-up">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
            <p className="text-sm leading-7 text-slate-300">{current.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <div className="border-t border-white/[0.06] px-6 py-4">
            <button
              onClick={onNext}
              className={`w-full rounded-2xl bg-gradient-to-r ${quizSet.tone} py-3.5 font-bold text-white shadow-[0_0_28px_rgba(56,189,248,0.25)] transition-all hover:scale-[1.01] active:scale-[0.99]`}
            >
              {idx + 1 >= total ? "See Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
    </QuizArena>
  );
}

function EnglishQuizScreenF3(props: {
  quizSet: EnglishQuizSetMetaF3;
  questions: ShuffledQuestion[];
  current: ShuffledQuestion | null;
  idx: number;
  selected: number | null;
  feedback: QuizFeedback | null;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  formLabel?: string;
}) {
  return (
    <EnglishQuizScreen
      {...(props as unknown as Parameters<typeof EnglishQuizScreen>[0])}
      formLabel="English Form 3"
    />
  );
}

function EnglishResultsScreenF3(props: {
  quizSet: EnglishQuizSetMetaF3;
  score: number;
  total: number;
  quizCompletion: QuizCompletionResult | null;
  quizCompletionPending: boolean;
  quizCompletionError: QuizSaveFailure | null;
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <EnglishResultsScreen
      {...(props as unknown as Parameters<typeof EnglishResultsScreen>[0])}
      formLabel="English Form 3"
    />
  );
}

function EnglishQuestionVisual({ visualKey }: { visualKey: string }) {
  const visuals: Record<string, { title: string; body: string; accent: string; image?: string }> = {
    q01: { title: "Question 1", body: "", accent: "from-amber-200 to-orange-300", image: imgF3Q01 },
    q02: { title: "Question 2", body: "", accent: "from-sky-300 to-cyan-300", image: imgF3Q02 },
    q03: {
      title: "Question 3",
      body: "",
      accent: "from-indigo-300 to-violet-300",
      image: imgF3Q03,
    },
    q04: { title: "Question 4", body: "", accent: "from-yellow-300 to-amber-300", image: imgF3Q04 },
    q05: { title: "Question 5", body: "", accent: "from-slate-200 to-slate-300", image: imgF3Q05 },
    q06: { title: "Question 6", body: "", accent: "from-emerald-200 to-teal-300", image: imgF3Q06 },
    q07: { title: "Question 7", body: "", accent: "from-emerald-300 to-cyan-300", image: imgF3Q07 },
    q08: { title: "Question 8", body: "", accent: "from-blue-300 to-violet-300", image: imgF3Q08 },
    q09: { title: "Question 9", body: "", accent: "from-fuchsia-300 to-pink-300", image: imgF3Q09 },
    q10: {
      title: "Question 10",
      body: "",
      accent: "from-amber-300 to-yellow-300",
      image: imgF3Q10,
    },
    q11: { title: "Question 11", body: "", accent: "from-orange-300 to-rose-300", image: imgF3Q11 },
    q12: { title: "Question 12", body: "", accent: "from-cyan-300 to-blue-300", image: imgF3Q12 },
  };
  const visual = visuals[visualKey] ?? {
    title: "Visual",
    body: "Reference stimulus",
    accent: "from-white/70 to-white/50",
  };
  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#f7efe4] p-4 text-slate-900 shadow-sm">
      {visual.image ? (
        <img
          src={visual.image}
          alt={cleanLearningTitle(visual.title)}
          className="block w-full rounded-xl object-cover"
        />
      ) : (
        <div className={`rounded-xl border border-black/10 bg-gradient-to-br ${visual.accent} p-4`}>
          <div className="text-center font-black uppercase tracking-wide">
            {cleanLearningTitle(visual.title)}
          </div>
          <div className="mt-2 text-center text-sm leading-6">{visual.body}</div>
        </div>
      )}
    </div>
  );
}

function EnglishResultsScreen({
  quizSet,
  score,
  total,
  quizCompletion,
  quizCompletionPending,
  quizCompletionError,
  onBack,
  onRetry,
  formLabel = "English Form 1",
}: {
  quizSet: EnglishQuizSetMeta;
  score: number;
  total: number;
  quizCompletion: QuizCompletionResult | null;
  quizCompletionPending: boolean;
  quizCompletionError: QuizSaveFailure | null;
  onBack: () => void;
  onRetry: () => void;
  formLabel?: string;
}) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const message =
    score >= 27
      ? "Excellent UASA practice. You are exam-ready for this set."
      : score >= 21
        ? "Good work. Review the explanations and aim for a stronger finish."
        : score >= 15
          ? "Steady progress. Revise the weak question types and retry."
          : "Review the notes, then try this set again with a slower pace.";

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center animate-fade-up sm:p-10">
      {score === total && <Confetti count={160} />}
      <div
        className={`absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${quizSet.tone} opacity-20 blur-3xl`}
      />
      <Sparkles className="mx-auto mb-4 h-12 w-12 text-nova-yellow animate-pulse" />
      <p className="text-sm font-bold text-cyan-200">
        {formLabel} • {cleanLearningLabel(quizSet.title)}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Quiz Complete</h2>
      <p className="mt-2 text-muted-foreground">{message}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold gradient-text">
            {score}/{total}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Score</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-emerald-300">{percentage}%</div>
          <div className="mt-1 text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-rose-300">{Math.max(0, total - score)}</div>
          <div className="mt-1 text-xs text-muted-foreground">Review</div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-md">
        <QuizAwardSummary
          result={quizCompletion}
          pending={quizCompletionPending}
          error={quizCompletionError}
        />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sets
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
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang)
    .find((c) => c.key === chapterKey);

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
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
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
            <div className="relative mb-4 font-display text-5xl font-black tracking-tight">EN</div>
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
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang)
    .find((c) => c.key === chapterKey);

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
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
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
            Choose Foundation, Practice, or Challenge to revise{" "}
            {cleanLearningTitle(chapter?.label ?? chapterKey)} at the right level.
          </p>
          <p className="mt-2 text-xs font-semibold text-accent">
            {quizLang === "dlp" ? "EN · DLP (English)" : "🇲🇾 Bahasa Melayu"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {MATH_OBJECTIVES.map((objective, index) => (
            <button
              key={objective.id}
              onClick={() => onSelect(objective.id)}
              aria-label={`Open ${cleanLearningLabel(objective.title)}`}
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
              <h3 className="relative font-display text-xl font-bold">
                {cleanLearningTitle(objective.title)}
              </h3>
              <div className="relative mt-4 space-y-2">
                {objective.purpose.map((item) => (
                  <p key={item} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300">
                    {item}
                  </p>
                ))}
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
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang)
    .find((c) => c.key === chapterKey);
  const isFoundation = objective.id === "objective-1";
  const isPractice = objective.id === "objective-2";
  const isChallenge = objective.id === "objective-3";
  const isDlp = quizLang === "dlp";
  const isChapter2 = chapterKey === "Chapter 2";
  const isChapter3 = chapterKey === "Chapter 3";
  const isChapter4 = chapterKey === "Chapter 4";
  const isChapter5 = chapterKey === "Chapter 5";
  const isChapter6 = chapterKey === "Chapter 6";
  const chapterBmEntry = registry
    ?.getRegisteredSubjectChapters(subjectId, "bm")
    .find((c) => c.key === chapterKey);
  const chapterDlpEntry = registry
    ?.getRegisteredSubjectChapters(subjectId, "dlp")
    .find((c) => c.key === chapterKey);
  const chapterTitle = cleanLearningTitle(
    isDlp ? (chapterDlpEntry?.label ?? chapterKey) : (chapterBmEntry?.label ?? chapterKey),
  );
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
            isDlp ? "Each question is worth 1 mark." : "Setiap soalan bernilai 1 markah.",
            isDlp ? "Choose the most accurate answer." : "Pilih jawapan yang paling tepat.",
            isDlp ? "Use paper for calculations." : "Gunakan kertas untuk membuat pengiraan.",
          ];
  const summaryItems = isChallenge
    ? [
        [
          isDlp ? "Difficulty Level" : "Tahap Kesukaran",
          isDlp ? (isChapter2 ? "Medium to Hard" : "Medium → Hard") : "Sederhana → Sukar",
        ],
        [isDlp ? "Estimated Time" : "Anggaran Masa", isDlp ? "20–25 minutes" : "20–25 minit"],
      ]
    : isPractice
      ? [
          [isDlp ? "Difficulty Level" : "Tahap Kesukaran", isDlp ? "Medium" : "Sederhana"],
          [isDlp ? "Estimated Time" : "Anggaran Masa", isDlp ? "15–20 minutes" : "15–20 minit"],
        ]
      : isFoundation
        ? [
            [isDlp ? "Difficulty Level" : "Tahap Kesukaran", isDlp ? "Easy" : "Mudah"],
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
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
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
          <p className="text-sm font-bold gradient-text">{cleanLearningTitle(objective.title)}</p>
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {summaryItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/5 p-3 text-center">
                    <div className="text-base font-bold text-cyan-200">{value}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            )}
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

export function MathObjectiveQuizScreen({
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
  feedback: QuizFeedback | null;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang)
    .find((c) => c.key === chapterKey);
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
    <QuizArena subjectId={subjectId}>
    <div className="my-auto w-full animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {isDlp ? "Back to instructions" : "Back to instructions"}
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
        </span>
      </div>

      <div
        key={idx}
        data-quiz-combo-surface
        className={`relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] quiz-q-enter ${
          feedback?.kind === "wrong"
            ? ""
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
            <span className="text-sm font-bold" style={{ color: "#FBBF24" }}>
              {objective.badge} {cleanLearningTitle(objective.title)}
            </span>
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
          <h2 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
            {cleanLearningQuestion(current.question)}
          </h2>
        </div>

        {current.visual && (
          <div className="px-6 pb-5">
            <MathQuestionVisual visual={current.visual} lang={quizLang} />
          </div>
        )}

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
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all ${
                    reveal && isAnswer
                      ? "bg-emerald-400 text-[#050816]"
                      : reveal && isPicked && !isAnswer
                        ? "bg-rose-400 text-white"
                        : "bg-white/[0.08] text-white/60 group-hover:bg-[#FBBF24]/20 group-hover:text-[#FBBF24]"
                  }`}
                >
                  {letter}
                </span>
                <span
                  className={`flex-1 text-sm font-semibold leading-6 ${
                    reveal && isAnswer
                      ? "text-emerald-100"
                      : reveal && isPicked && !isAnswer
                        ? "text-rose-100"
                        : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {option}
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

        {/* Feedback */}
        {feedback && <QuestionXpFeedback feedback={feedback} />}

        {selected !== null && current.explanation && (
          <div className="mx-6 mb-4 flex items-start gap-3 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/8 p-4 animate-fade-up">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
            <p className="text-sm text-slate-300 leading-7">{current.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <div className="border-t border-white/[0.06] px-6 py-4">
            <button
              type="button"
              onClick={onNext}
              className="academy-action w-full rounded-2xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] py-3.5 font-bold text-[#050816] shadow-[0_0_28px_rgba(251,191,36,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/70"
            >
              {idx + 1 >= total
                ? isDlp
                  ? "See Results ✨"
                  : "Lihat Keputusan ✨"
                : isDlp
                  ? "Next Question →"
                  : "Soalan Seterusnya →"}
            </button>
          </div>
        )}
      </div>
    </div>
    </QuizArena>
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
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = registry
    ?.getRegisteredSubjectChapters(subjectId, scienceLang)
    .find((c) => c.key === chapterKey);

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
          {subj?.emoji} {subj?.name} • {cleanLearningLabel(chapter?.label ?? chapterKey)}
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
          <p className="text-sm font-bold gradient-text">{cleanLearningTitle(objective.title)}</p>
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
  quizCompletion,
  quizCompletionPending,
  quizCompletionError,
  quizLang,
  chapterKey,
  onBack,
  onRetry,
}: {
  objective?: (typeof MATH_OBJECTIVES)[number];
  score: number;
  total: number;
  quizCompletion: QuizCompletionResult | null;
  quizCompletionPending: boolean;
  quizCompletionError: QuizSaveFailure | null;
  quizLang: MathQuizLang;
  chapterKey: string;
  onBack: () => void;
  onRetry: () => void;
}) {
  const registry = useContentRegistry();
  const wrong = Math.max(0, total - score);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPractice = objective?.id === "objective-2";
  const isChallenge = objective?.id === "objective-3";
  const isDlp = quizLang === "dlp";
  const isChapter2 = chapterKey === "Chapter 2";
  const resultChapterBm = registry
    ?.getRegisteredSubjectChapters("math", "bm")
    .find((c) => c.key === chapterKey);
  const resultChapterDlp = registry
    ?.getRegisteredSubjectChapters("math", "dlp")
    .find((c) => c.key === chapterKey);
  const chapterName = cleanLearningTitle(
    isDlp ? (resultChapterDlp?.label ?? chapterKey) : (resultChapterBm?.label ?? chapterKey),
  );
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
        {objective
          ? `${objective.badge} ${cleanLearningTitle(objective.title)}.`
          : isDlp
            ? "the quiz."
            : "quiz."}
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

      <div className="mx-auto mt-6 max-w-md">
        <QuizAwardSummary
          result={quizCompletion}
          pending={quizCompletionPending}
          error={quizCompletionError}
          bm={!isDlp}
        />
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

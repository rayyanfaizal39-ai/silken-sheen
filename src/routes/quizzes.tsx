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
  const mathObjectiveQuestions = useMemo(
    () =>
      mathObjectiveId === "objective-1" && chapter === "Chapter 1"
        ? MATH_OBJECTIVE_1_FOUNDATION_QUESTIONS
        : [],
    [chapter, mathObjectiveId],
  );
  const currentMathQuestion = mathObjectiveQuestions[idx] ?? null;

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
  }

  function startMathObjectiveQuiz() {
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
    setMathObjectivePhase("quiz");
  }

  function answerMathObjective(i: number) {
    if (selected !== null || !currentMathQuestion) return;

    setSelected(i);
    const correct = i === currentMathQuestion.answerIndex;

    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      addXp(10, currentMathQuestion.subjectId);
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
    const total = mathObjectiveQuestions.length;

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
        mathObjectiveId && selectedMathObjective && mathObjectivePhase !== "select" ? (
          mathObjectivePhase === "intro" ? (
            <MathObjectiveIntroScreen
              objective={selectedMathObjective}
              subjectId={subject}
              chapterKey={chapter}
              scienceLang={scienceLang ?? undefined}
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
              total={mathObjectiveQuestions.length || 30}
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
              questions={mathObjectiveQuestions}
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
            onBack={() => {
              setChapter(null);
              reset();
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

function MathObjectiveSelectionScreen({
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
            Start Objective 1 now, or use the remaining objective slots when future questions are
            added.
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
                {objective.id === "objective-1" ? "30 Questions Ready" : "Questions Coming Soon"}
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
  onBack,
  onStart,
}: {
  objective: (typeof MATH_OBJECTIVES)[number];
  subjectId: string;
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  onBack: () => void;
  onStart: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  const prepItems = [
    "Ambil pen atau pensel",
    "Sediakan kertas kosong untuk membuat pengiraan",
    "Kalkulator dibenarkan jika diperlukan",
    "Cuba jawab sendiri sebelum melihat jawapan",
    "Tunjukkan semua langkah kerja pada kertas",
  ];
  const instructions = [
    "Setiap quiz mengandungi 30 soalan objektif.",
    "Setiap soalan bernilai 1 markah.",
    "Pilih jawapan yang paling tepat.",
    "Gunakan kertas untuk membuat pengiraan.",
    "Markah penuh: 30 markah.",
  ];

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to objectives
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
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            📝 Bersedia Untuk Quiz!
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Tekan "Mula Quiz" apabila bersedia.</p>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <h3 className="font-display text-xl font-bold">Sebelum memulakan quiz</h3>
            <div className="mt-4 space-y-3">
              {prepItems.map((item) => (
                <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                  ✅ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <h3 className="font-display text-xl font-bold">Arahan</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300 marker:text-accent">
              {instructions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
              Markah penuh: <span className="font-bold text-cyan-200">30 markah</span>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="relative mt-8 w-full py-3.5 rounded-full font-display font-bold text-lg inline-flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.45)]"
        >
          <Play className="w-5 h-5" /> Mula Quiz
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
          <ArrowLeft className="w-4 h-4" /> Back to instructions
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
              Question {idx + 1} of {total} • Markah penuh: {total}
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200">
            Score: {score}/{total}
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
            {idx + 1 >= total ? "Finish" : "Next question →"}
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
  onBack,
  onRetry,
}: {
  objective?: (typeof MATH_OBJECTIVES)[number];
  score: number;
  total: number;
  onBack: () => void;
  onRetry: () => void;
}) {
  const wrong = Math.max(0, total - score);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const rating =
    score >= 27
      ? {
          title: "⭐ Cemerlang",
          message: "Anda menguasai topik ini dengan sangat baik.",
          color: "text-nova-yellow",
        }
      : score >= 21
        ? {
            title: "👍 Baik",
            message: "Teruskan latihan untuk meningkatkan prestasi.",
            color: "text-emerald-300",
          }
        : score >= 15
          ? {
              title: "📚 Memuaskan",
              message: "Masih ada ruang untuk penambahbaikan.",
              color: "text-cyan-300",
            }
          : {
              title: "🔄 Perlu Penambahbaikan",
              message: "Ulang kaji nota dan cuba semula.",
              color: "text-rose-300",
            };

  return (
    <div className="glass-strong rounded-3xl p-8 sm:p-10 text-center animate-fade-up relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.63_0.22_295_/_0.35),transparent_70%)]" />
      <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4 animate-pulse" />
      <h2 className="font-display text-3xl sm:text-4xl font-bold">🎉 Tahniah!</h2>
      <p className="mt-2 text-muted-foreground">
        Anda telah menamatkan {objective ? `${objective.badge} ${objective.title}.` : "quiz."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold gradient-text">
            {score}/{total}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Markah Keseluruhan</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-emerald-300">{score}</div>
          <div className="mt-1 text-xs text-muted-foreground">Jawapan Betul</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-rose-300">{wrong}</div>
          <div className="mt-1 text-xs text-muted-foreground">Jawapan Salah</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-bold text-cyan-300">{percentage}%</div>
          <div className="mt-1 text-xs text-muted-foreground">Peratus Markah</div>
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
          <RotateCcw className="w-4 h-4" /> Cuba Semula
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

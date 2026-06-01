import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { subjects, forms, quizzes, getItemChapterKey, getSubjectChapters, type Difficulty, type QuizQuestion } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, XCircle, Sparkles, RotateCcw, Timer, Music2, VolumeX, ArrowLeft, Play, TimerOff, Shuffle } from "lucide-react";
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

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — AcadeMY" },
      { name: "description", content: "Interactive KSSM quizzes with instant scoring. Easy, Medium, and Hard." },
      { property: "og:title", content: "Quizzes — AcadeMY" },
      { property: "og:description", content: "Test yourself with KSSM quizzes — instant feedback and XP rewards." },
    ],
  }),
  component: QuizzesPage,
});

const diffs: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];
const CORRECT_MSGS = ["Hebat! 🔥", "Betul! ⚡", "Awesome! 🌟", "Bagus! 💫", "Power! 🚀"];
const WRONG_MSGS = ["Cuba lagi! 💪", "Jangan give up! 🎯", "Hampir! 🤔", "Keep going! 🌱"];
type TimerMode = "timer" | "none";
type TimerPref = { mode: TimerMode; seconds: number } | null;

interface ShuffledQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  difficulty: Difficulty;
  subjectId: string;
}

function QuizzesPage() {
  const { progress, addXp, recordQuiz, awardBadge, markChapter } = useProgress();
  const [subject, setSubject] = useState<string | null>(null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [form, setForm] = useState<string>("All");
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
  const questionSeconds = timerPref?.mode === "timer" ? timerPref.seconds : 0;
  const [timeLeft, setTimeLeft] = useState(0);
  const comboTimer = useRef<number | null>(null);

  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const needsScienceLang = subject === "science" && !scienceLang;

  const chapterMeta = subject && chapter ? getSubjectChapters(subject, scienceLang ?? undefined).find((c) => c.key === chapter) : null;

  const pool = useMemo(() => {
    if (!subject || !chapter) return [];
    return quizzes.filter((q) => {
      if (q.subjectId !== subject) return false;
      if (getItemChapterKey(q) !== chapter) return false;
      if (subject === "science" && scienceLang) {
        if (q.lang && q.lang !== scienceLang) return false;
      }
      if (form !== "All" && q.form !== form) return false;
      if (subject !== "sejarah" && diff !== "All" && q.difficulty !== diff) return false;
      return true;
    });
  }, [subject, chapter, form, diff, scienceLang]);

  const current = shuffledPool?.[idx] ?? null;

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
  useEffect(() => () => { music.stop(); }, []);

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
      setFeedback({ kind: "correct", msg: CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)] });
    } else {
      setStreak(0);
      setCombo(0);
      triggerShake();
      setFeedback({ kind: "wrong", msg: WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)] });
    }
  }

  function next() {
    const total = shuffledPool?.length ?? pool.length;
    if (idx + 1 >= total) {
      setDone(true);
      recordQuiz();
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      if (total > 0 && score + (selected === current?.answerIndex ? 1 : 0) === total && diff === "Hard") {
        awardBadge("master");
      }
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
    setFeedback(null);
  }

  function reset() {
    setIdx(0); setSelected(null); setScore(0); setDone(false);
    setStreak(0); setCombo(0); setComboShow(null);
    setFeedback(null); setTimeLeft(questionSeconds); setAnimatedScore(0);
    setTimerPref(null); setShuffledPool(null);
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
    timeLeft <= 5 ? "bg-rose-500 shadow-[0_0_18px_oklch(0.62_0.24_27_/_0.7)]"
    : timeLeft <= 10 ? "bg-nova-yellow"
    : "bg-emerald-400";

  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-8 py-16 ${screenShake ? "animate-screen-shake" : ""}`}>
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
        <h1 className="font-display text-5xl font-bold">Take a <span className="gradient-text">Quiz</span></h1>
        <p className="mt-3 text-muted-foreground">Instant scoring. Earn XP. Beat your streak.</p>
      </div>
      <div className="flex justify-center"><DailyQuote /></div>

      {!subject ? (
        <SubjectGrid onSelect={(id) => { setSubject(id); setChapter(null); setForm("All"); setDiff("All"); reset(); }} />
      ) : needsScienceLang ? (
        <ScienceLanguagePicker
          onSelect={(l) => setScienceLang(l)}
          onBack={() => { setSubject(null); setChapter(null); reset(); }}
        />
      ) : !chapter ? (
        <>
          {subject === "science" && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={scienceLang ?? undefined}
            onSelect={(key) => { setChapter(key); reset(); }}
            onBack={() => { setSubject(null); setChapter(null); reset(); }}
          />
        </>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen subjectId={subject} chapterKey={chapter} onBack={() => { setChapter(null); reset(); }} />
      ) : !timerPref ? (
        <QuizSettingsScreen
          subjectId={subject}
          chapterKey={chapter}
          onBack={() => { setChapter(null); reset(); }}
          onStart={(pref) => setTimerPref(pref)}
        />
      ) : (
        <>
          <ContentHeader subjectId={subject} chapterKey={chapter} onBack={() => { setChapter(null); reset(); }} />

          <div className="glass-strong rounded-2xl p-5 mb-8 flex flex-wrap gap-3 items-center justify-between animate-fade-up">
            <div className="flex flex-wrap gap-2 items-center">
              {subject === "sejarah" ? (
                <div className="flex gap-1">
                  {(["All", "Form 1", "Form 2", "Form 3"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => { setForm(f); reset(); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                        form === f ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <select value={form} onChange={(e) => { setForm(e.target.value); reset(); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
                    <option>All</option>
                    {forms.map((f) => <option key={f}>{f}</option>)}
                  </select>
                  <div className="flex gap-1">
                    {diffs.map((d) => (
                      <button
                        key={d}
                        onClick={() => { setDiff(d); reset(); }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          diff === d ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-white/5 text-muted-foreground"
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
                  musicOn ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {musicOn ? <Music2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
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
              <p className="text-muted-foreground">No questions match — try different filters.</p>
            </div>
          ) : done ? (
            <>
              <Confetti count={shuffledPool && score === shuffledPool.length ? 160 : 70} />
              {shuffledPool && score === shuffledPool.length && (
                <Confetti count={120} />
              )}
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.63_0.22_295_/_0.35),transparent_70%)]" />
                <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4 animate-pulse" />
                <h2 className="font-display text-3xl font-bold">
                  {shuffledPool && score === shuffledPool.length ? "PERFECT SCORE! 🏆" : "Quiz complete!"}
                </h2>
                <p className="mt-2 text-muted-foreground">You scored</p>
                <p
                  key={`score-${done}`}
                  className="font-display text-7xl sm:text-8xl font-extrabold gradient-text my-4 animate-score-reveal drop-shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.7)]"
                >
                  {animatedScore}<span className="text-muted-foreground/60">/{shuffledPool?.length ?? pool.length}</span>
                </p>
                {pool.length > 0 && score === pool.length && (
                  <p className="text-emerald-300 font-semibold mb-3 animate-pulse">Flawless victory! ⚡</p>
                )}
                <button onClick={reset} className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform">
                  <RotateCcw className="w-4 h-4" /> Try again
                </button>
              </div>
            </>
          ) : current && (
            <div
              key={idx}
              className={`glass-strong rounded-3xl p-8 animate-question-reveal ${
                feedback?.kind === "wrong" ? "animate-shake" : feedback?.kind === "correct" ? "animate-correct-pulse" : ""
              }`}
            >
              {/* Question progress bar */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-muted-foreground">
                  Question {idx + 1} of {shuffledPool?.length ?? pool.length} • {current.difficulty}
                </span>
                {timerPref?.mode === "timer" && (
                  <span className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                    timeLeft <= 5 ? "text-rose-400 animate-pulse" : timeLeft <= 10 ? "text-nova-yellow" : "text-emerald-300"
                  }`}>
                    <Timer className="w-3.5 h-3.5" /> {timeLeft}s
                  </span>
                )}
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${((idx + 1) / (shuffledPool?.length ?? pool.length)) * 100}%` }}
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

              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">{current.question}</h2>

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
                  onClick={next}
                  className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-[1.02] transition-transform"
                >
                  {idx + 1 >= pool.length ? "Finish" : "Next question →"}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function QuizSettingsScreen({
  subjectId,
  chapterKey,
  onBack,
  onStart,
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
  onStart: (pref: { mode: TimerMode; seconds: number }) => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId).find((c) => c.key === chapterKey);
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
          <h2 className="font-display text-3xl font-bold">Quiz <span className="gradient-text">Settings</span></h2>
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
            <p className="mt-2 text-xs text-muted-foreground">Tick-tock — answer fast for the win.</p>

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
                      onClick={(e) => { e.stopPropagation(); setSeconds(s); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); setSeconds(s); } }}
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
            <p className="mt-2 text-xs text-muted-foreground">No countdown, no pressure. Just learn.</p>
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

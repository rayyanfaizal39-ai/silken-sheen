import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { subjects, forms, quizzes, getItemChapterKey, getSubjectChapters, type Difficulty } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, XCircle, Sparkles, RotateCcw, Timer, Music2, VolumeX, ArrowLeft, Play, TimerOff } from "lucide-react";
import {
  SubjectGrid,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { DailyQuote } from "@/components/DailyQuote";
import { Confetti } from "@/components/Confetti";
import { sfx, music } from "@/lib/sounds";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — LearnNova" },
      { name: "description", content: "Interactive KSSM quizzes with instant scoring. Easy, Medium, and Hard." },
      { property: "og:title", content: "Quizzes — LearnNova" },
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
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const comboTimer = useRef<number | null>(null);

  const chapterMeta = subject && chapter ? getSubjectChapters(subject).find((c) => c.key === chapter) : null;

  const pool = useMemo(() => {
    if (!subject || !chapter) return [];
    return quizzes.filter((q) => {
      if (q.subjectId !== subject) return false;
      if (getItemChapterKey(q) !== chapter) return false;
      if (form !== "All" && q.form !== form) return false;
      if (subject !== "sejarah" && diff !== "All" && q.difficulty !== diff) return false;
      return true;
    });
  }, [subject, chapter, form, diff]);

  const current = pool[idx];

  // Countdown timer per question
  useEffect(() => {
    if (!current || selected !== null || done) return;
    setTimeLeft(QUESTION_SECONDS);
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
  }, [idx, current, done]);

  // Stop music when leaving the page
  useEffect(() => () => { music.stop(); }, []);

  function triggerShake() {
    setScreenShake(true);
    window.setTimeout(() => setScreenShake(false), 600);
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
    if (idx + 1 >= pool.length) {
      setDone(true);
      recordQuiz();
      if (subject && chapter) markChapter(subject, chapter, "quiz");
      if (pool.length > 0 && score + (selected === current?.answerIndex ? 1 : 0) === pool.length && diff === "Hard") {
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
    setFeedback(null); setTimeLeft(QUESTION_SECONDS); setAnimatedScore(0);
  }

  // Animated score count-up + perfect score celebration
  useEffect(() => {
    if (!done) return;
    const total = pool.length;
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

  const timerPct = (timeLeft / QUESTION_SECONDS) * 100;
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
      ) : !chapter ? (
        <ChapterGrid
          subjectId={subject}
          onSelect={(key) => { setChapter(key); reset(); }}
          onBack={() => { setSubject(null); setChapter(null); reset(); }}
        />
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen subjectId={subject} chapterKey={chapter} onBack={() => { setChapter(null); reset(); }} />
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

          {pool.length === 0 ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">No questions match — try different filters.</p>
            </div>
          ) : done ? (
            <>
              <Confetti count={pool.length > 0 && score === pool.length ? 160 : 70} />
              {pool.length > 0 && score === pool.length && (
                <Confetti count={120} />
              )}
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.63_0.22_295_/_0.35),transparent_70%)]" />
                <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4 animate-pulse" />
                <h2 className="font-display text-3xl font-bold">
                  {pool.length > 0 && score === pool.length ? "PERFECT SCORE! 🏆" : "Quiz complete!"}
                </h2>
                <p className="mt-2 text-muted-foreground">You scored</p>
                <p
                  key={`score-${done}`}
                  className="font-display text-7xl sm:text-8xl font-extrabold gradient-text my-4 animate-score-reveal drop-shadow-[0_0_30px_oklch(0.63_0.22_295_/_0.7)]"
                >
                  {animatedScore}<span className="text-muted-foreground/60">/{pool.length}</span>
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
                  Question {idx + 1} of {pool.length} • {current.difficulty}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                  timeLeft <= 5 ? "text-rose-400 animate-pulse" : timeLeft <= 10 ? "text-nova-yellow" : "text-emerald-300"
                }`}>
                  <Timer className="w-3.5 h-3.5" /> {timeLeft}s
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${((idx + 1) / pool.length) * 100}%` }}
                />
              </div>
              {/* Timer bar — green → yellow → red */}
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden mb-6">
                <div
                  className={`h-full origin-left transition-[width,background-color] duration-1000 ease-linear ${timerColor}`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>

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

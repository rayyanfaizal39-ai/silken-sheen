import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { subjects, forms, quizzes, sejarahChapterFromId, sejarahForm1Chapters, type Difficulty } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, XCircle, Sparkles, RotateCcw } from "lucide-react";
import {
  SejarahChapterGrid,
  SejarahChapterHeader,
  SejarahComingSoon,
} from "@/components/SejarahChapterPicker";

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

function QuizzesPage() {
  const { progress, addXp, recordQuiz, awardBadge } = useProgress();
  const [subject, setSubject] = useState("all");
  const [form, setForm] = useState<string>("All");
  const [diff, setDiff] = useState<"All" | Difficulty>("All");
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);

  const pool = useMemo(() => {
    return quizzes.filter((q) => {
      if (subject !== "all" && q.subjectId !== subject) return false;
      if (form !== "All" && q.form !== form) return false;
      if (diff !== "All" && q.difficulty !== diff) return false;
      return true;
    });
  }, [subject, form, diff]);

  const current = pool[idx];

  function answer(i: number) {
    if (selected !== null || !current) return;
    setSelected(i);
    const correct = i === current.answerIndex;
    if (correct) {
      const gain = current.difficulty === "Hard" ? 30 : current.difficulty === "Medium" ? 20 : 10;
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      addXp(gain, current.subjectId);
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (idx + 1 >= pool.length) {
      setDone(true);
      recordQuiz();
      if (pool.length > 0 && score + (selected === current?.answerIndex ? 1 : 0) === pool.length && diff === "Hard") {
        awardBadge("master");
      }
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
  }

  function reset() {
    setIdx(0); setSelected(null); setScore(0); setDone(false); setStreak(0);
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl font-bold">Take a <span className="gradient-text">Quiz</span></h1>
        <p className="mt-3 text-muted-foreground">Instant scoring. Earn XP. Beat your streak.</p>
      </div>

      <div className="glass-strong rounded-2xl p-5 mb-8 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <select value={subject} onChange={(e) => { setSubject(e.target.value); setDiff("All"); setForm("All"); reset(); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
            <option value="all">All subjects</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {subject !== "sejarah" && (
            <select value={form} onChange={(e) => { setForm(e.target.value); reset(); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
              <option>All</option>
              {forms.map((f) => <option key={f}>{f}</option>)}
            </select>
          )}
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
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
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
        <div className="glass-strong rounded-3xl p-10 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-nova-yellow mb-4" />
          <h2 className="font-display text-3xl font-bold">Quiz complete!</h2>
          <p className="mt-2 text-muted-foreground">You scored</p>
          <p className="font-display text-6xl font-bold gradient-text my-3">{score}/{pool.length}</p>
          <button onClick={reset} className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform">
            <RotateCcw className="w-4 h-4" /> Try again
          </button>
        </div>
      ) : current && (
        <div className="glass-strong rounded-3xl p-8 animate-fade-up">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold text-muted-foreground">
              Q {idx + 1} of {pool.length} • {current.difficulty}
            </span>
            <div className="h-2 w-32 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${((idx + 1) / pool.length) * 100}%` }}
              />
            </div>
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

          {selected !== null && current.explanation && (
            <p className="mt-5 text-sm text-muted-foreground bg-white/5 rounded-xl p-4">
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
    </section>
  );
}

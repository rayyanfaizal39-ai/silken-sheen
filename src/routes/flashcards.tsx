import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { subjects, forms, flashcards, getItemChapterKey, getSubjectChapters } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { Heart, ChevronLeft, ChevronRight, Shuffle, X, Check } from "lucide-react";
import {
  SubjectGrid,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { DailyQuote } from "@/components/DailyQuote";
import { Confetti } from "@/components/Confetti";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — LearnNova" },
      { name: "description", content: "Swipeable, flippable flashcards for fast KSSM revision." },
      { property: "og:title", content: "Flashcards — LearnNova" },
      { property: "og:description", content: "Smart revision with favorites and smooth flip animations." },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const { progress, toggleFavorite, markChapter } = useProgress();
  const [subject, setSubject] = useState<string | null>(null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [form, setForm] = useState("All");
  const [favOnly, setFavOnly] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStart = useRef<number | null>(null);

  const chapterMeta = subject && chapter ? getSubjectChapters(subject).find((c) => c.key === chapter) : null;

  const pool = useMemo(() => {
    if (!subject || !chapter) return [];
    return flashcards.filter((f) => {
      if (f.subjectId !== subject) return false;
      if (getItemChapterKey(f) !== chapter) return false;
      if (form !== "All" && f.form !== form) return false;
      if (favOnly && !progress.favorites.includes(f.id)) return false;
      return true;
    });
  }, [subject, chapter, form, favOnly, progress.favorites]);

  const current = pool[order[idx] ?? idx] ?? pool[0];

  function shuffle() {
    const arr = pool.map((_, i) => i).sort(() => Math.random() - 0.5);
    setOrder(arr);
    setIdx(0);
    setFlipped(false);
    setStreak(0);
    setCompleted(false);
  }

  function handleResponse(known: boolean) {
    if (!current) return;
    setStreak((s) => (known ? s + 1 : 0));
    if (idx + 1 >= pool.length) {
      setCompleted(true);
      if (subject && chapter) markChapter(subject, chapter, "cards");
      return;
    }
    setFlipped(false);
    setSwipeOffset(0);
    setIdx((i) => i + 1);
  }

  function go(delta: number) {
    setFlipped(false);
    setIdx((i) => (i + delta + pool.length) % pool.length);
  }

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) { touchStart.current = e.touches[0].clientX; }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    setSwipeOffset(e.touches[0].clientX - touchStart.current);
  }
  function onTouchEnd() {
    if (touchStart.current === null) return;
    const dx = swipeOffset;
    touchStart.current = null;
    if (dx > 80) handleResponse(true);
    else if (dx < -80) handleResponse(false);
    else setSwipeOffset(0);
  }

  function resetSession() {
    setIdx(0); setFlipped(false); setStreak(0); setCompleted(false); setOrder([]); setSwipeOffset(0);
  }

  const fav = current ? progress.favorites.includes(current.id) : false;
  const subj = current ? subjects.find((s) => s.id === current.subjectId) : null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
      <div className="text-center mb-6">
        <h1 className="font-display text-5xl font-bold"><span className="gradient-text">Flashcards</span></h1>
        <p className="mt-3 text-muted-foreground">Flip, swipe, and master concepts in seconds.</p>
      </div>
      <div className="flex justify-center"><DailyQuote /></div>

      {!subject ? (
        <SubjectGrid onSelect={(id) => { setSubject(id); setChapter(null); resetSession(); }} />
      ) : !chapter ? (
        <ChapterGrid
          subjectId={subject}
          onSelect={(key) => { setChapter(key); resetSession(); }}
          onBack={() => { setSubject(null); setChapter(null); }}
        />
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />
      ) : (
        <>
          <ContentHeader subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />

          <div className="glass-strong rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
            <div className="flex flex-wrap gap-2 items-center">
              <select value={form} onChange={(e) => { setForm(e.target.value); resetSession(); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
                <option>All</option>
                {forms.map((f) => <option key={f}>{f}</option>)}
              </select>
              <button
                onClick={() => setFavOnly((v) => !v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${favOnly ? "bg-rose-500/30 text-rose-200" : "bg-white/5 text-muted-foreground"}`}
              >
                ❤ Favorites
              </button>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 text-xs font-semibold">
                <span className="text-base">🔥</span>
                <span className="text-nova-yellow">{streak}</span>
                <span className="text-muted-foreground">streak</span>
              </span>
            </div>
            <button onClick={shuffle} className="px-4 py-2 rounded-full bg-white/5 text-sm flex items-center gap-2 hover:bg-white/10">
              <Shuffle className="w-4 h-4" /> Shuffle
            </button>
          </div>

          {pool.length === 0 || !current ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">No flashcards match your filters.</p>
            </div>
          ) : completed ? (
            <>
              <Confetti />
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up">
                <div className="text-6xl mb-3 animate-float-soft">🏆</div>
                <h2 className="font-display text-3xl font-bold">All done!</h2>
                <p className="mt-2 text-muted-foreground">You crushed {pool.length} cards · best streak {streak} 🔥</p>
                <button onClick={resetSession} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform">
                  Restart deck
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-3 flex justify-between items-center text-xs text-muted-foreground">
                <span>Card {idx + 1} of {pool.length}</span>
                <span>{Math.round(((idx + 1) / pool.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${((idx + 1) / pool.length) * 100}%` }}
                />
              </div>

              <div
                onClick={() => setFlipped((f) => !f)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="relative cursor-pointer mx-auto select-none"
                style={{
                  perspective: "1500px",
                  height: 360,
                  transform: `translateX(${swipeOffset}px) rotate(${swipeOffset / 30}deg)`,
                  transition: swipeOffset === 0 ? "transform 0.3s ease" : "none",
                }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
                >
                  {/* front */}
                  <div className="absolute inset-0 glass-strong rounded-3xl p-8 flex flex-col" style={{ backfaceVisibility: "hidden" }}>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {subj?.emoji} {subj?.name} • {current.form}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(current.id); }}
                        className={`p-2 rounded-full ${fav ? "bg-rose-500/20 text-rose-300" : "bg-white/5 text-muted-foreground hover:text-rose-300"}`}
                      >
                        <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-center">
                      <p className="font-display text-3xl sm:text-4xl font-bold leading-tight">{current.front}</p>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">Tap to flip · Swipe → know · Swipe ← don't know</p>
                  </div>
                  {/* back */}
                  <div
                    className="absolute inset-0 glass-strong rounded-3xl p-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="font-display text-2xl sm:text-3xl text-center leading-relaxed">{current.back}</p>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleResponse(false)}
                  className="py-3 rounded-2xl bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <X className="w-4 h-4" /> Don't know
                </button>
                <div className="flex items-center justify-between">
                  <button onClick={() => go(-1)} className="p-3 rounded-full glass hover:bg-white/10">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-muted-foreground">{idx + 1} / {pool.length}</span>
                  <button onClick={() => go(1)} className="p-3 rounded-full glass hover:bg-white/10">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleResponse(true)}
                  className="py-3 rounded-2xl bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <Check className="w-4 h-4" /> I know it
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

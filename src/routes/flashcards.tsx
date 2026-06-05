import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { subjects, forms, flashcards, getItemChapterKey, getSubjectChapters } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  X,
  Check,
  Volume2,
  VolumeX,
  Vibrate,
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
import { sfx } from "@/lib/sounds";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — AcadeMY" },
      { name: "description", content: "Swipeable, flippable flashcards for fast KSSM revision." },
      { property: "og:title", content: "Flashcards — AcadeMY" },
      {
        property: "og:description",
        content: "Smart revision with favorites and smooth flip animations.",
      },
    ],
  }),
  component: FlashcardsPage,
});

const ENCOURAGE = ["Hebat! 🔥", "Pandai! ⚡", "Betul! 🌟", "Bagus! 💪", "Keep it up! 🎯"];
const GENTLE = [
  "Cuba lagi! 💫",
  "Jangan give up! 🌈",
  "Hampir! Keep going! 🎮",
  "Ulang semula! 📚",
];

function vibrate(pattern: number | number[], enabled: boolean) {
  if (!enabled) return;
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    return;
  }
}

function progressColor(pct: number) {
  if (pct <= 25) return "from-red-500 to-rose-500";
  if (pct <= 50) return "from-orange-500 to-amber-500";
  if (pct <= 75) return "from-yellow-400 to-yellow-500";
  return "from-emerald-500 to-green-500";
}

function readStudySearch() {
  if (typeof window === "undefined") return { subject: null, form: "All" };
  const params = new URLSearchParams(window.location.search);
  return {
    subject: normalizeSubjectParam(params.get("subject")),
    form: normalizeFormParam(params.get("form")),
  };
}

function FireBadge({ streak }: { streak: number }) {
  if (streak < 3) return null;
  const size = streak >= 10 ? "text-3xl" : streak >= 5 ? "text-2xl" : "text-xl";
  const label =
    streak >= 10 ? "MEGA FIRE 🔥🔥🔥" : streak >= 5 ? "ON FIRE! 🔥🔥" : "Heating up! 🔥";
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-combo-pop">
      <div
        className={`glass-strong rounded-full px-5 py-2 flex items-center gap-2 font-display font-bold ${size}`}
      >
        <span className="animate-fire-flicker inline-block">🔥</span>
        <span className="gradient-text">{label}</span>
      </div>
    </div>
  );
}

function MiniConfetti({ color }: { color: string }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        dx: (Math.random() - 0.5) * 320,
        dy: -120 - Math.random() * 200,
        delay: Math.random() * 0.1,
        dur: 0.8 + Math.random() * 0.6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-30">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{
            background: color,
            // @ts-expect-error css var
            "--cx": `${p.dx}px`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
            transform: `translate(${p.dx}px, ${p.dy}px)`,
          }}
        />
      ))}
    </div>
  );
}

function FlashcardsPage() {
  const { progress, toggleFavorite, markChapter, addXp } = useProgress();
  const initialSearch = useMemo(readStudySearch, []);
  const [subject, setSubject] = useState<string | null>(initialSearch.subject);
  const [chapter, setChapter] = useState<string | null>(null);
  const [form, setForm] = useState(initialSearch.form);
  const [favOnly, setFavOnly] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState<number[]>([]); // indexes into pool
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStart = useRef<number | null>(null);

  // engagement state
  const [flash, setFlash] = useState<"green" | "red" | null>(null);
  const [shake, setShake] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [slideOut, setSlideOut] = useState<"left" | "right" | null>(null);
  const [floatXp, setFloatXp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [burstColor, setBurstColor] = useState<string | null>(null);

  // stats
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // settings
  const [soundOn, setSoundOn] = useState(true);
  const [vibrateOn, setVibrateOn] = useState(true);
  const [dealing, setDealing] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    sfx.setMuted(!soundOn);
  }, [soundOn]);

  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const chapterMeta =
    subject && chapter
      ? getSubjectChapters(subject, scienceLang ?? undefined).find((c) => c.key === chapter)
      : null;

  const pool = useMemo(() => {
    if (!subject || !chapter) return [];
    return flashcards.filter((f) => {
      if (f.subjectId !== subject) return false;
      if (getItemChapterKey(f) !== chapter) return false;
      if (isBilingualSubject && scienceLang && f.lang && f.lang !== scienceLang) return false;
      if (form !== "All" && f.form !== form) return false;
      if (favOnly && !progress.favorites.includes(f.id)) return false;
      return true;
    });
  }, [subject, chapter, form, favOnly, progress.favorites, scienceLang, isBilingualSubject]);

  const currentPoolIdx = queue[idx];
  const current = currentPoolIdx !== undefined ? pool[currentPoolIdx] : pool[0];
  const total = totalCards || pool.length;
  const done = Math.max(0, total - queue.length + idx);
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

  function buildShuffled() {
    return pool.map((_, i) => i).sort(() => Math.random() - 0.5);
  }

  function shuffle() {
    const arr = buildShuffled();
    setQueue(arr);
    setIdx(0);
    setFlipped(false);
    setStreak(0);
    setLongestStreak(0);
    setKnownCount(0);
    setUnknownCount(0);
    setXpEarned(0);
    setTotalCards(arr.length);
    setCompleted(false);
    setDealing(true);
    setTimeout(() => setDealing(false), 500);
  }

  function handleResponse(known: boolean) {
    if (!current || slideOut) return;

    if (known) {
      sfx.ding();
      vibrate(40, vibrateOn);
      setFlash("green");
      setBurstColor("#22C55E");
      setFloatXp(true);
      setToast(ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
      setSlideOut("right");
      setKnownCount((c) => c + 1);
      addXp(10, subject ?? undefined);
      setXpEarned((x) => x + 10);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLongestStreak((l) => Math.max(l, newStreak));
      if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
        setTimeout(() => sfx.streak(newStreak), 120);
        vibrate([30, 40, 30], vibrateOn);
      }
    } else {
      sfx.whomp();
      vibrate([40, 60, 40], vibrateOn);
      setFlash("red");
      setShake(true);
      setToast(GENTLE[Math.floor(Math.random() * GENTLE.length)]);
      setSlideOut("left");
      setUnknownCount((c) => c + 1);
      setStreak(0);
    }

    setTimeout(() => {
      setFlash(null);
      setShake(false);
      setFloatXp(false);
      setToast(null);
      setBurstColor(null);
      setSlideOut(null);
      setFlipped(false);
      setSwipeOffset(0);

      // advance queue
      setQueue((q) => {
        const remaining = q.slice(idx + 1);
        // re-queue wrong cards at end
        const nextQueue = known ? remaining : [...remaining, q[idx]];
        if (nextQueue.length === 0) {
          setCompleted(true);
          if (subject && chapter) markChapter(subject, chapter, "cards");
          sfx.fanfare();
          vibrate([200, 80, 80, 80, 200], vibrateOn);
          return [];
        }
        setIdx(0);
        return nextQueue;
      });
    }, 450);
  }

  function handleFlip() {
    if (slideOut) return;
    if (!flipped) {
      sfx.whoosh();
      setShimmer(true);
      setTimeout(() => setShimmer(false), 700);
      setTimeout(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
      }, 700);
    }
    setFlipped((f) => !f);
  }

  function go(delta: number) {
    setFlipped(false);
    setIdx((i) => (i + delta + queue.length) % Math.max(queue.length, 1));
  }

  // Touch swipe
  function onTouchStart(e: TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchMove(e: TouchEvent) {
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
    setIdx(0);
    setFlipped(false);
    setStreak(0);
    setLongestStreak(0);
    setCompleted(false);
    setQueue([]);
    setSwipeOffset(0);
    setKnownCount(0);
    setUnknownCount(0);
    setXpEarned(0);
    setTotalCards(0);
  }

  // Auto-shuffle & deal on chapter entry
  useEffect(() => {
    if (pool.length > 0 && queue.length === 0 && !completed) {
      const arr = buildShuffled();
      setQueue(arr);
      setTotalCards(arr.length);
      setDealing(true);
      setTimeout(() => setDealing(false), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, completed]);

  // First-visit tip
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!localStorage.getItem("academy-fc-tip")) {
        setShowTip(true);
        setTimeout(() => {
          setShowTip(false);
          localStorage.setItem("academy-fc-tip", "1");
        }, 4000);
      }
    } catch {
      setShowTip(false);
    }
  }, []);

  const fav = current ? progress.favorites.includes(current.id) : false;
  const subj = current ? subjects.find((s) => s.id === current.subjectId) : null;
  const remaining = queue.length - idx;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 py-10 md:py-16">
      <div className="text-center mb-6">
        <h1 className="font-display text-5xl font-bold">
          <span className="gradient-text">Flashcards</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Flip, swipe, and master concepts in seconds.</p>
      </div>
      <div className="flex justify-center">
        <DailyQuote />
      </div>

      {!subject ? (
        <SubjectGrid
          onSelect={(id) => {
            setSubject(id);
            setChapter(null);
            resetSession();
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
            resetSession();
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
              resetSession();
            }}
            onBack={() => {
              setSubject(null);
              setChapter(null);
            }}
          />
        </>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          onBack={() => setChapter(null)}
        />
      ) : (
        <>
          <ContentHeader
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
            onBack={() => setChapter(null)}
          />

          {/* Settings row */}
          <div className="flex justify-end gap-2 mb-3">
            <button
              onClick={() => setSoundOn((v) => !v)}
              aria-label="Toggle sound"
              className="p-2 rounded-full glass hover:bg-white/10 transition"
              title={soundOn ? "Sound on" : "Sound off"}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => setVibrateOn((v) => !v)}
              aria-label="Toggle vibration"
              className={`p-2 rounded-full glass hover:bg-white/10 transition ${vibrateOn ? "" : "text-muted-foreground"}`}
              title={vibrateOn ? "Vibration on" : "Vibration off"}
            >
              <Vibrate className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-strong rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={form}
                onChange={(e) => {
                  setForm(e.target.value);
                  resetSession();
                }}
                className="px-4 py-2 rounded-full bg-white/5 text-sm"
              >
                <option>All</option>
                {forms.map((f) => (
                  <option key={f}>{f}</option>
                ))}
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
            <button
              onClick={shuffle}
              className="px-4 py-2 rounded-full bg-white/5 text-sm flex items-center gap-2 hover:bg-white/10"
            >
              <Shuffle className="w-4 h-4" /> Shuffle
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mb-4 animate-fade-up">
            🔀 Cards are shuffled every session
          </p>

          {pool.length === 0 || !current ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">
                {subject === "math"
                  ? "Flashcards Coming Soon"
                  : "No flashcards match your filters."}
              </p>
            </div>
          ) : completed ? (
            <>
              <Confetti count={90} />
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up">
                <div className="text-6xl mb-3 animate-float-soft">🏆</div>
                <h2 className="font-display text-3xl font-bold">All done!</h2>
                <p className="mt-2 text-muted-foreground">Magnificent revision session.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold">{totalCards}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-emerald-300">{knownCount} ✅</div>
                    <div className="text-xs text-muted-foreground">Known</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-rose-300">{unknownCount} ❌</div>
                    <div className="text-xs text-muted-foreground">To review</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold">{longestStreak} 🔥</div>
                    <div className="text-xs text-muted-foreground">Best streak</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-nova-yellow">+{xpEarned}</div>
                    <div className="text-xs text-muted-foreground">XP earned</div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={shuffle}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Ulang Semula 🔄
                  </button>
                  <button
                    onClick={() => {
                      setSubject(null);
                      setChapter(null);
                      resetSession();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong font-semibold hover:scale-105 transition-transform"
                  >
                    Subjek Lain 📚
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-3 flex justify-between items-center text-xs text-muted-foreground">
                <span>
                  Card {done + 1} of {total}
                </span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-6">
                <div
                  className={`h-full bg-gradient-to-r ${progressColor(pct)} transition-all duration-700 ${(pct >= 25 && pct < 30) || (pct >= 50 && pct < 55) || (pct >= 75 && pct < 80) || pct === 100 ? "animate-pulse" : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <FireBadge streak={streak} />

              <div className="relative">
                {/* Card stack behind */}
                {remaining > 1 && (
                  <>
                    <div className="absolute inset-0 glass rounded-3xl translate-y-3 scale-[0.96] opacity-50" />
                    {remaining > 2 && (
                      <div className="absolute inset-0 glass rounded-3xl translate-y-6 scale-[0.92] opacity-30" />
                    )}
                    <div className="absolute -top-3 -right-3 z-20 glass-strong rounded-full px-3 py-1 text-xs font-bold">
                      {remaining} left
                    </div>
                  </>
                )}

                <div
                  onClick={handleFlip}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className={`relative cursor-pointer mx-auto select-none rounded-3xl
                    ${dealing ? "animate-deal-in" : ""}
                    ${shake ? "animate-shake" : ""}
                    ${bounce ? "animate-bounce-soft" : ""}
                    ${slideOut === "right" ? "animate-slide-out-right" : ""}
                    ${slideOut === "left" ? "animate-slide-out-left" : ""}
                    ${flash === "green" ? "animate-flash-green" : ""}
                    ${flash === "red" ? "animate-flash-red" : ""}
                  `}
                  style={{
                    perspective: "1500px",
                    height: 360,
                    transform: slideOut
                      ? undefined
                      : `translateX(${swipeOffset}px) rotate(${swipeOffset / 30}deg)`,
                    transition: swipeOffset === 0 ? "transform 0.3s ease" : "none",
                  }}
                >
                  <div
                    key={current.id}
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "none",
                    }}
                  >
                    {/* front */}
                    <div
                      className="absolute inset-0 glass-strong rounded-3xl p-8 flex flex-col overflow-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {subj?.emoji} {subj?.name} • {current.form}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(current.id);
                          }}
                          className={`p-2 rounded-full ${fav ? "bg-rose-500/20 text-rose-300" : "bg-white/5 text-muted-foreground hover:text-rose-300"}`}
                        >
                          <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center text-center">
                        <p className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                          {current.front}
                        </p>
                      </div>
                      <p className="text-center text-xs text-muted-foreground">
                        Tap to flip · Swipe → know · Swipe ← don't know
                      </p>
                    </div>
                    {/* back */}
                    <div
                      className="absolute inset-0 glass-strong rounded-3xl p-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      <p className="font-display text-2xl sm:text-3xl text-center leading-relaxed">
                        {current.back}
                      </p>
                    </div>
                  </div>

                  {/* Floating XP */}
                  {floatXp && (
                    <div className="pointer-events-none absolute left-1/2 top-6 z-40 animate-xp-float font-display font-bold text-2xl text-emerald-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">
                      +10 XP
                    </div>
                  )}
                  {/* Toast message */}
                  {toast && (
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-12 z-40 animate-combo-pop font-display font-bold text-xl">
                      <span className={flash === "green" ? "text-emerald-300" : "text-rose-300"}>
                        {toast}
                      </span>
                    </div>
                  )}
                  {/* Confetti burst */}
                  {burstColor && <MiniConfetti color={burstColor} />}
                </div>
              </div>

              {/* Action row */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleResponse(false)}
                  className="py-3 rounded-2xl bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <X className="w-4 h-4" /> Don't know
                </button>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => go(-1)}
                    className="p-3 rounded-full glass hover:bg-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {done + 1} / {total}
                  </span>
                  <button
                    onClick={() => go(1)}
                    className="p-3 rounded-full glass hover:bg-white/10"
                  >
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

              {showTip && (
                <div className="mobile-bottom-toast fixed left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-4 py-2 text-sm animate-fade-up shadow-xl">
                  💡 Tap card to flip · swipe ➜ to know · ⬅ to skip
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

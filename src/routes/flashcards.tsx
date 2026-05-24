import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { subjects, forms, flashcards, sejarahChapterFromId, sejarahForm1Chapters } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import { Heart, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import {
  SejarahChapterGrid,
  SejarahChapterHeader,
  SejarahComingSoon,
} from "@/components/SejarahChapterPicker";

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
  const { progress, toggleFavorite } = useProgress();
  const [subject, setSubject] = useState("all");
  const [form, setForm] = useState("All");
  const [favOnly, setFavOnly] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[]>([]);

  const pool = useMemo(() => {
    const base = flashcards.filter((f) => {
      if (subject !== "all" && f.subjectId !== subject) return false;
      if (form !== "All" && f.form !== form) return false;
      if (favOnly && !progress.favorites.includes(f.id)) return false;
      return true;
    });
    return base;
  }, [subject, form, favOnly, progress.favorites]);

  const current = pool[order[idx] ?? idx] ?? pool[0];

  function shuffle() {
    const arr = pool.map((_, i) => i).sort(() => Math.random() - 0.5);
    setOrder(arr);
    setIdx(0);
    setFlipped(false);
  }
  function go(delta: number) {
    setFlipped(false);
    setIdx((i) => (i + delta + pool.length) % pool.length);
  }

  const fav = current ? progress.favorites.includes(current.id) : false;
  const subj = current ? subjects.find((s) => s.id === current.subjectId) : null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl font-bold"><span className="gradient-text">Flashcards</span></h1>
        <p className="mt-3 text-muted-foreground">Flip, swipe, and master concepts in seconds.</p>
      </div>

      <div className="glass-strong rounded-2xl p-4 mb-8 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select value={subject} onChange={(e) => { setSubject(e.target.value); setIdx(0); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
            <option value="all">All subjects</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={form} onChange={(e) => { setForm(e.target.value); setIdx(0); }} className="px-4 py-2 rounded-full bg-white/5 text-sm">
            <option>All</option>
            {forms.map((f) => <option key={f}>{f}</option>)}
          </select>
          <button
            onClick={() => setFavOnly((v) => !v)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${favOnly ? "bg-rose-500/30 text-rose-200" : "bg-white/5 text-muted-foreground"}`}
          >
            ❤ Favorites
          </button>
        </div>
        <button onClick={shuffle} className="px-4 py-2 rounded-full bg-white/5 text-sm flex items-center gap-2 hover:bg-white/10">
          <Shuffle className="w-4 h-4" /> Shuffle
        </button>
      </div>

      {pool.length === 0 || !current ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">No flashcards match your filters.</p>
        </div>
      ) : (
        <>
          <div
            onClick={() => setFlipped((f) => !f)}
            className="relative cursor-pointer mx-auto"
            style={{ perspective: "1500px", height: 360 }}
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
                <p className="text-center text-xs text-muted-foreground">Tap to flip</p>
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

          <div className="flex items-center justify-between mt-8">
            <button onClick={() => go(-1)} className="p-3 rounded-full glass hover:bg-white/10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {idx + 1} / {pool.length}
            </span>
            <button onClick={() => go(1)} className="p-3 rounded-full glass hover:bg-white/10">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

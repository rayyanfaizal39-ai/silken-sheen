import { sejarahForm1Chapters } from "@/data/content";
import { Lock, ArrowLeft } from "lucide-react";

export function SejarahChapterGrid({ onSelect }: { onSelect: (n: number) => void }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sejarahForm1Chapters.map((c) => (
        <button
          key={c.num}
          onClick={() => onSelect(c.num)}
          className={`text-left glass rounded-2xl p-6 transition-all hover:-translate-y-0.5 ${
            c.available
              ? "hover:bg-white/[0.08] border border-transparent hover:border-primary/40"
              : "opacity-70 hover:bg-white/[0.05]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span>🏛️</span>
              Sejarah • Form 1
            </span>
            {!c.available && <Lock className="w-4 h-4 text-muted-foreground" />}
          </div>
          <h3 className="font-display text-xl font-bold">
            Chapter {c.num}: {c.title}
          </h3>
          <p className="mt-2 text-xs font-semibold">
            {c.available ? (
              <span className="text-emerald-300">Available</span>
            ) : (
              <span className="text-amber-300">Coming Soon</span>
            )}
          </p>
        </button>
      ))}
    </div>
  );
}

export function SejarahChapterHeader({
  chapterNum,
  onBack,
}: {
  chapterNum: number;
  onBack: () => void;
}) {
  const c = sejarahForm1Chapters.find((x) => x.num === chapterNum);
  return (
    <div className="flex items-center justify-between mb-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> All chapters
      </button>
      <span className="text-sm font-semibold text-muted-foreground">
        Sejarah • Form 1 • Chapter {chapterNum}
        {c ? `: ${c.title}` : ""}
      </span>
    </div>
  );
}

export function SejarahComingSoon({ chapterNum, onBack }: { chapterNum: number; onBack: () => void }) {
  const c = sejarahForm1Chapters.find((x) => x.num === chapterNum);
  return (
    <div className="text-center py-20 glass-strong rounded-3xl">
      <div className="text-5xl mb-4">🚧</div>
      <h2 className="font-display text-3xl font-bold">
        Chapter {chapterNum}: {c?.title}
      </h2>
      <p className="mt-3 text-muted-foreground">Coming Soon</p>
      <button
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> Back to chapters
      </button>
    </div>
  );
}

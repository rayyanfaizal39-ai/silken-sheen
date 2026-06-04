import { subjects, getSubjectChapters } from "@/data/content";
import { Lock, ArrowLeft, Sparkles, Clock, Gauge, NotebookPen, Brain, Layers } from "lucide-react";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import { getChapter } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";

function difficultyFor(index: number): { label: string; tone: string } {
  if (index <= 1) return { label: "Easy", tone: "text-emerald-300 border-emerald-300/30 bg-emerald-300/10" };
  if (index <= 4) return { label: "Medium", tone: "text-cyan-300 border-cyan-300/30 bg-cyan-300/10" };
  return { label: "Advanced", tone: "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-300/10" };
}

export function SubjectGrid({ onSelect }: { onSelect: (subjectId: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {subjects.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className="group relative text-left glass rounded-2xl p-6 card-glow-hover border border-transparent hover:border-primary/50 animate-slide-up overflow-hidden"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div
            className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
            aria-hidden
          />
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl mb-3 shadow-lg animate-float-soft`}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <span>{s.emoji}</span>
          </div>
          <h3 className="font-display text-xl font-bold">{s.name}</h3>
          <p className="mt-1 text-sm font-semibold gradient-text">{s.tagline}</p>
          <p className="mt-2 text-xs text-muted-foreground">{s.description}</p>
        </button>
      ))}
    </div>
  );
}

export function ChapterGrid({
  subjectId,
  onSelect,
  onBack,
  scienceLang,
}: {
  subjectId: string;
  onSelect: (key: string, available: boolean) => void;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapters = getSubjectChapters(subjectId, scienceLang);
  const { progress } = useProgress();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> All subjects
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name}
        </span>
      </div>

      {chapters.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">No chapters available yet for this subject.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((c, i) => {
            const pct = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]);
            return (
              <button
                key={c.key}
                onClick={() => onSelect(c.key, c.available)}
                className={`relative text-left glass rounded-2xl p-6 animate-slide-up overflow-hidden transition-all ${
                  c.available
                    ? "card-glow-hover border border-transparent hover:border-primary/50"
                    : "opacity-70 hover:bg-white/[0.05]"
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {c.isNew && c.available && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-nova-yellow to-orange-400 text-nova-navy shadow-lg animate-pulse">
                    <Sparkles className="w-3 h-3" /> NEW
                  </span>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span>{subj?.emoji}</span>
                    {subj?.name}
                  </span>
                  {!c.available && <Lock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <h3 className="font-display text-xl font-bold">{c.label}</h3>
                <p className="mt-2 text-xs font-semibold">
                  {c.available ? (
                    <span className="text-emerald-300">Available</span>
                  ) : (
                    <span className="text-amber-300">Coming Soon</span>
                  )}
                </p>
                {c.available && (
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mb-1.5">
                      <span>Progress</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ContentHeader({
  subjectId,
  chapterKey,
  onBack,
  scienceLang,
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  return (
    <div className="flex items-center justify-between mb-5 flex-wrap gap-3 animate-fade-up">
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
  );
}

export function ComingSoonScreen({
  subjectId,
  chapterKey,
  onBack,
  scienceLang,
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
}) {
  const chapter = getSubjectChapters(subjectId, scienceLang).find((c) => c.key === chapterKey);
  return (
    <div className="text-center py-20 glass-strong rounded-3xl animate-fade-up">
      <div className="text-5xl mb-4 animate-float-soft">🚧</div>
      <h2 className="font-display text-3xl font-bold">{chapter?.label ?? chapterKey}</h2>
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

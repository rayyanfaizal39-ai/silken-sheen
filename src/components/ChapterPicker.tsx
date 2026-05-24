import { subjects, getSubjectChapters } from "@/data/content";
import { Lock, ArrowLeft } from "lucide-react";

export function SubjectGrid({ onSelect }: { onSelect: (subjectId: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className="text-left glass rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] border border-transparent hover:border-primary/40"
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-3`}>
            <span>{s.emoji}</span>
          </div>
          <h3 className="font-display text-xl font-bold">{s.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
        </button>
      ))}
    </div>
  );
}

export function ChapterGrid({
  subjectId,
  onSelect,
  onBack,
}: {
  subjectId: string;
  onSelect: (key: string, available: boolean) => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapters = getSubjectChapters(subjectId);
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10"
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
          {chapters.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelect(c.key, c.available)}
              className={`text-left glass rounded-2xl p-6 transition-all hover:-translate-y-0.5 ${
                c.available
                  ? "hover:bg-white/[0.08] border border-transparent hover:border-primary/40"
                  : "opacity-70 hover:bg-white/[0.05]"
              }`}
            >
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContentHeader({
  subjectId,
  chapterKey,
  onBack,
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId).find((c) => c.key === chapterKey);
  return (
    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10"
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
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
}) {
  const chapter = getSubjectChapters(subjectId).find((c) => c.key === chapterKey);
  return (
    <div className="text-center py-20 glass-strong rounded-3xl">
      <div className="text-5xl mb-4">🚧</div>
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

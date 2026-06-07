import { subjects, getSubjectChapters } from "@/data/content";
import { Lock, ArrowLeft, Sparkles, Clock, Gauge, NotebookPen, Brain, Layers } from "lucide-react";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import { getChapter } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { AcademyPanel, AcademySectionHeader, SubjectCard } from "@/components/AcademyPage";

function difficultyFor(index: number): { label: string; tone: string } {
  if (index <= 1)
    return { label: "Easy", tone: "text-emerald-300 border-emerald-300/30 bg-emerald-300/10" };
  if (index <= 4)
    return { label: "Medium", tone: "text-cyan-300 border-cyan-300/30 bg-cyan-300/10" };
  return { label: "Advanced", tone: "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-300/10" };
}

const flashcardSubjectOrder = ["science", "math", "english", "geography", "sejarah", "bm"];

export function SubjectGrid({
  onSelect,
  mode = "default",
}: {
  onSelect: (subjectId: string) => void;
  mode?: "default" | "flashcards";
}) {
  const orderedSubjects =
    mode === "flashcards"
      ? flashcardSubjectOrder
          .map((id) => subjects.find((subject) => subject.id === id))
          .filter((subject): subject is (typeof subjects)[number] => Boolean(subject))
      : subjects;

  return (
    <AcademyPanel className={mode === "flashcards" ? "p-4 sm:p-5" : ""}>
      <AcademySectionHeader
        eyebrow="Subject Cards"
        title="Choose a Subject"
        description={
          mode === "flashcards"
            ? "Start with a subject, then pick a chapter deck."
            : "Pick a subject and continue your learning path."
        }
      />
      <div
        className={
          mode === "flashcards"
            ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        }
      >
        {orderedSubjects.map((s, i) => (
          <div key={s.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <SubjectCard
              subjectId={s.id}
              title={s.name}
              subtitle={s.id === "bm" ? "BM" : s.id === "math" ? "Matematik" : undefined}
              ctaLabel={mode === "flashcards" ? "Start studying" : "Open subject"}
              onClick={() => onSelect(s.id)}
            />
          </div>
        ))}
      </div>
    </AcademyPanel>
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
    <AcademyPanel>
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          <ArrowLeft className="w-4 h-4" /> All subjects
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name}
        </span>
      </div>

      <AcademySectionHeader
        eyebrow="Chapter Cards"
        title={subj ? `${subj.name} Chapters` : "Chapters"}
        description="Choose a chapter to open the learning content."
      />

      {chapters.length === 0 ? (
        <div className="text-center py-20 glass rounded-[2rem]">
          <p className="text-muted-foreground">No chapters available yet for this subject.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((c, i) => {
            const pct = chapterProgressPct(
              progress.chapterActivity[chapterActivityKey(subjectId, c.key)],
            );
            const chapterContent = getChapter(subjectId, c.key, scienceLang);
            const feats = getChapterFeatures(chapterContent);
            const notesCount = chapterContent?.notes?.sections?.length ?? 0;
            const cardCount = chapterContent?.flashcards?.length ?? 0;
            const quizCount = chapterContent?.quiz?.length ?? 0;
            const readMins = Math.max(
              3,
              Math.round(notesCount * 2 + (chapterContent?.notes?.quickRevision?.length ?? 0)),
            );
            const diff = difficultyFor(i);
            const status = pct >= 100 ? "Complete" : pct > 0 ? "In progress" : "Not started";
            return (
              <button
                type="button"
                key={c.key}
                onClick={() => onSelect(c.key, c.available)}
                className={`chapter-card relative text-left border border-white/[0.08] bg-[#101827]/72 rounded-3xl p-5 animate-slide-up overflow-hidden transition-all backdrop-blur-2xl ${
                  c.available
                    ? "hover:-translate-y-1 hover:border-[#6366F1]/45 hover:shadow-[0_20px_60px_rgba(99,102,241,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
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
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="chapter-card-num">{String(i + 1).padStart(2, "0")}</span>
                    {subj?.name}
                  </span>
                  {!c.available && <Lock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <h3 className="font-display text-lg font-bold leading-snug">{c.label}</h3>

                {c.available && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="chapter-chip">
                      <Clock className="w-3 h-3" /> {readMins} min
                    </span>
                    <span className={`chapter-chip border ${diff.tone}`}>
                      <Gauge className="w-3 h-3" /> {diff.label}
                    </span>
                    {notesCount > 0 && (
                      <span className="chapter-chip">
                        <NotebookPen className="w-3 h-3" /> {notesCount}
                      </span>
                    )}
                    {cardCount > 0 && (
                      <span className="chapter-chip">
                        <Layers className="w-3 h-3" /> {cardCount}
                      </span>
                    )}
                    {quizCount > 0 && (
                      <span className="chapter-chip">
                        <Brain className="w-3 h-3" /> {quizCount}
                      </span>
                    )}
                  </div>
                )}

                {!c.available && (
                  <p className="mt-2 text-xs font-semibold text-amber-300">Coming Soon</p>
                )}

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
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">
                      {status}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </AcademyPanel>
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
    <div className="mb-5 animate-fade-up">
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapter?.label ?? chapterKey}
        </span>
      </div>
      <AcademySectionHeader
        eyebrow="Content Area"
        title={chapter?.label ?? chapterKey}
        description="Review the available notes, videos, maps, flashcards, and quizzes."
      />
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
      <div className="text-5xl mb-4 animate-float-soft" aria-hidden="true">🚧</div>
      <h2 className="font-display text-3xl font-bold">{chapter?.label ?? chapterKey}</h2>
      <p className="mt-3 text-muted-foreground">Coming Soon</p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to chapters
      </button>
    </div>
  );
}

import { subjects, type Form } from "@/data/subjects-meta";
import {
  Lock,
  ArrowLeft,
  Sparkles,
  Clock,
  Gauge,
  NotebookPen,
  CheckCircle2,
  BookOpen,
  Rocket,
} from "lucide-react";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import {
  getChapter,
  getRegisteredSubjectChapters as getSubjectChapters,
  getSubjectFormStats,
  hasFormResourceContent,
  hasResourceContent,
  type FormStat,
  type ResourceType,
} from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { AcademyPanel, AcademySectionHeader, SubjectPlanetButton } from "@/components/AcademyPage";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { cleanLearningLabel, cleanLearningTitle } from "@/lib/clean-learning-title";

// Subject accent colors — must stay in sync with AcademyPage subjectPlanetStyles
const SUBJECT_COLORS: Record<string, { color: string; glow: string; from: string; to: string }> = {
  science: { color: "#38BDF8", glow: "rgba(56,189,248,0.35)", from: "#38BDF8", to: "#0EA5E9" },
  sejarah: { color: "#FB923C", glow: "rgba(251,146,60,0.35)", from: "#FB923C", to: "#F97316" },
  geography: { color: "#34D399", glow: "rgba(52,211,153,0.35)", from: "#34D399", to: "#10B981" },
  english: { color: "#C084FC", glow: "rgba(192,132,252,0.35)", from: "#C084FC", to: "#A855F7" },
  math: { color: "#FBBF24", glow: "rgba(251,191,36,0.35)", from: "#FBBF24", to: "#F59E0B" },
  bm: { color: "#F472B6", glow: "rgba(244,114,182,0.35)", from: "#F472B6", to: "#EC4899" },
};

function getSubjectAccent(subjectId: string) {
  return SUBJECT_COLORS[subjectId] ?? SUBJECT_COLORS.science;
}

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
      <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {orderedSubjects.map((s, i) => (
          <div key={s.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <SubjectPlanetButton
              subjectId={s.id}
              title={s.name}
              subtitle={s.id === "bm" ? "BM" : s.id === "math" ? "Matematik" : undefined}
              ctaLabel={mode === "flashcards" ? "Start Learning" : "Open Subject"}
              emphasis={mode === "flashcards" ? "learning" : "default"}
              onClick={() => onSelect(s.id)}
            />
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}

type LearningMode = "notes" | "mindmaps" | "quizzes" | "flashcards";

// `badge`/`description` here are only the fallback shown when a form's content
// isn't ready yet — actual readiness (and therefore the "Ready" badge, glow, and
// clickability) is always computed from real content via `isReady` below, never
// from a per-form default. Don't hardcode an "available"/"Ready" default per form;
// that previously made Form 1 cards show "Ready" text even when isReady was false.
const FORM_CARDS: Array<{
  form: Form;
  label: string;
  badge: string;
  description: string;
}> = [
  {
    form: "Form 1",
    label: "Form 1",
    badge: "Coming Soon",
    description: "Content is currently being prepared.",
  },
  {
    form: "Form 2",
    label: "Form 2",
    badge: "Coming Soon",
    description: "Content is currently being prepared.",
  },
  {
    form: "Form 3",
    label: "Form 3",
    badge: "Coming Soon",
    description: "Content is currently being prepared.",
  },
];

function modeLabel(mode: LearningMode) {
  if (mode === "mindmaps") return "Mind Maps";
  if (mode === "quizzes") return "Quizzes";
  if (mode === "flashcards") return "Flashcards";
  return "Notes";
}

function resourceTypeForMode(mode: LearningMode): ResourceType {
  if (mode === "mindmaps") return "mindMap";
  if (mode === "quizzes") return "quiz";
  if (mode === "flashcards") return "flashcards";
  return "notes";
}

function hasCustomFormResourceContent(subjectId: string, form: Form, mode: LearningMode) {
  if (subjectId !== "bm") return false;

  if (mode === "notes") return form === "Form 1" || form === "Form 2" || form === "Form 3";
  return mode === "quizzes" && (form === "Form 1" || form === "Form 2" || form === "Form 3");
}

// Real per-form stat line shown under a Ready badge — never a generic
// placeholder. Quiz and flashcard forms intentionally use availability-only
// copy so pre-activity cards never announce content quantities.
function formStatLabel(mode: LearningMode, stat: FormStat, isReady: boolean): string {
  if (!isReady) return "Coming Soon";

  if (mode === "quizzes" || mode === "flashcards") {
    return "✔ Available";
  }

  const chaptersWithResource = mode === "mindmaps" ? stat.mindMapChapters : stat.notesChapters;
  if (chaptersWithResource > 0 && chaptersWithResource === stat.chapterCount) return "✔ Complete";
  if (chaptersWithResource > 0) return `✔ ${chaptersWithResource}/${stat.chapterCount} Chapters`;
  return "✔ Available";
}

export function FormGrid({
  subjectId,
  mode = "notes",
  onSelect,
  onBack,
}: {
  subjectId: string;
  mode?: LearningMode;
  onSelect: (form: Form) => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const accent = getSubjectAccent(subjectId);
  const formStats = getSubjectFormStats(subjectId);

  return (
    <AcademyPanel>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <ArrowLeft className="h-4 w-4" /> All subjects
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
          <span className="text-sm font-bold" style={{ color: accent.color }}>
            {subj?.name}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-xs font-semibold text-white/55">{modeLabel(mode)}</span>
        </div>
      </div>

      <AcademySectionHeader
        eyebrow="Learning Journey"
        title={`${subj?.name ?? "Subject"} ${modeLabel(mode)}`}
        description="Form 1, Form 2 and Form 3 — select a form level to continue."
      />

      <div className="grid items-stretch gap-4 sm:grid-cols-3">
        {FORM_CARDS.map((item, index) => {
          const isReady =
            hasFormResourceContent(subjectId, item.form, resourceTypeForMode(mode)) ||
            hasCustomFormResourceContent(subjectId, item.form, mode);
          const stat = formStats.find((s) => s.form === item.form);
          const statLabel = stat ? formStatLabel(mode, stat, isReady) : item.description;
          return (
            <button
              key={item.form}
              type="button"
              aria-label={
                isReady ? `Open ${item.label} ${modeLabel(mode).toLowerCase()}` : undefined
              }
              onClick={() => isReady && onSelect(item.form)}
              disabled={!isReady}
              className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1525]/80 p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.22)] transition-all duration-300 animate-slide-up hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity group-hover:opacity-90"
                style={{
                  background: isReady
                    ? `radial-gradient(circle, ${accent.glow}, transparent 68%)`
                    : "radial-gradient(circle, rgba(148,163,184,0.22), transparent 68%)",
                }}
              />
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08]"
                style={{
                  background: isReady
                    ? `linear-gradient(135deg, ${accent.from}2e, ${accent.to}18)`
                    : "rgba(255,255,255,0.05)",
                  boxShadow: isReady ? `0 0 24px ${accent.glow}` : "none",
                }}
              >
                {isReady ? (
                  <BookOpen className="h-5 w-5" style={{ color: accent.color }} />
                ) : (
                  <Rocket className="h-5 w-5 text-white/70" />
                )}
              </div>
              <span
                className="mb-3 inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide"
                style={{
                  borderColor: isReady ? `${accent.from}40` : "rgba(255,255,255,0.10)",
                  color: isReady ? accent.color : "rgba(255,255,255,0.55)",
                  background: isReady ? `${accent.from}14` : "rgba(255,255,255,0.04)",
                }}
              >
                {isReady ? "Ready" : item.badge}
              </span>
              <h3 className="font-display text-xl font-bold text-white">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {isReady ? statLabel : item.description}
              </p>
            </button>
          );
        })}
      </div>
    </AcademyPanel>
  );
}

export function ChapterGrid({
  subjectId,
  onSelect,
  onBack,
  scienceLang,
  form = "Form 1",
  mode = "notes",
  isChapterAvailable,
}: {
  subjectId: string;
  onSelect: (key: string, available: boolean) => void;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  mode?: Extract<LearningMode, "notes" | "quizzes" | "flashcards">;
  isChapterAvailable?: (chapterKey: string) => boolean;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapters = getSubjectChapters(subjectId, scienceLang, form);
  const { progress } = useProgress();
  const accent = getSubjectAccent(subjectId);
  const cleanChapterText = mode === "quizzes" || mode === "flashcards";

  return (
    <AcademyPanel>
      {/* Back header with subject accent */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <ArrowLeft className="h-4 w-4" /> All subjects
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
          <span className="text-sm">{subj?.emoji}</span>
          <span className="text-sm font-bold" style={{ color: accent.color }}>
            {subj?.name}
          </span>
        </div>
      </div>

      <AcademySectionHeader
        eyebrow="Chapter Cards"
        title={subj ? `${subj.name} Chapters` : "Chapters"}
        description="Choose a chapter to open the learning content."
      />

      {chapters.length === 0 ? (
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] py-20 text-center">
          <p className="text-muted-foreground">No chapters available yet for this subject.</p>
        </div>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => {
            const resourceAvailable =
              isChapterAvailable?.(c.key) ??
              hasResourceContent(subjectId, form, c.key, resourceTypeForMode(mode), scienceLang);
            const pct = chapterProgressPct(
              progress.chapterActivity[chapterActivityKey(subjectId, c.key)],
            );
            const chapterContent = getChapter(
              subjectId,
              c.key,
              scienceLang,
              form === "All" ? "Form 1" : form,
            );
            const feats = getChapterFeatures(chapterContent);
            const notesCount = chapterContent?.notes?.sections?.length ?? 0;
            const readMins = Math.max(
              3,
              Math.round(notesCount * 2 + (chapterContent?.notes?.quickRevision?.length ?? 0)),
            );
            const diff = difficultyFor(i);
            const isComplete = pct >= 100;
            const isStarted = pct > 0;
            const status = isComplete ? "Complete" : isStarted ? "In progress" : "Not started";

            return (
              <button
                type="button"
                aria-label={
                  resourceAvailable
                    ? `Open ${cleanChapterText ? cleanLearningLabel(c.label) : c.label} ${modeLabel(mode).toLowerCase()}`
                    : undefined
                }
                key={c.key}
                onClick={() => resourceAvailable && onSelect(c.key, resourceAvailable)}
                disabled={!resourceAvailable}
                className={`chapter-card group relative flex h-full min-h-[248px] flex-col overflow-hidden rounded-[1.75rem] border bg-[#0D1525]/80 p-0 text-left transition-all duration-300 animate-slide-up backdrop-blur-2xl ${
                  resourceAvailable
                    ? "border-white/[0.08] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                    : "border-white/[0.05] opacity-60"
                }`}
                style={{
                  animationDelay: `${i * 55}ms`,
                  ...(resourceAvailable ? {} : {}),
                }}
                onMouseEnter={(e) => {
                  if (resourceAvailable) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accent.color}45`;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 20px 60px -20px ${accent.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Subject-colored top accent bar */}
                <div
                  className="h-1 w-full rounded-t-[inherit]"
                  style={{
                    background: resourceAvailable
                      ? `linear-gradient(90deg, ${accent.from}, ${accent.to})`
                      : "rgba(255,255,255,0.06)",
                    opacity: isComplete ? 1 : isStarted ? 0.7 : 0.3,
                  }}
                />

                {/* Card content */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Header row */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Chapter number pill */}
                      <span
                        className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg px-1.5 text-[11px] font-black"
                        style={{
                          background: `${accent.from}22`,
                          color: accent.color,
                          boxShadow: isComplete ? `0 0 10px ${accent.glow}` : "none",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wide text-white/35">
                        {subj?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {c.isNew && resourceAvailable && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-nova-yellow to-orange-400 px-2 py-0.5 text-[9px] font-bold text-black">
                          <Sparkles className="h-2.5 w-2.5" /> NEW
                        </span>
                      )}
                      {isComplete && (
                        <CheckCircle2 className="h-4 w-4" style={{ color: accent.color }} />
                      )}
                      {!resourceAvailable && <Lock className="h-4 w-4 text-white/30" />}
                    </div>
                  </div>

                  {/* Chapter label */}
                  <h3 className="font-display text-base font-bold leading-snug text-white">
                    {cleanChapterText ? cleanLearningTitle(c.label) : c.label}
                  </h3>

                  {/* Feature chips */}
                  {resourceAvailable && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="chapter-chip">
                        <Clock className="h-3 w-3" /> {readMins} min
                      </span>
                      <span className={`chapter-chip border ${diff.tone}`}>
                        <Gauge className="h-3 w-3" /> {diff.label}
                      </span>
                      {notesCount > 0 && (
                        <span className="chapter-chip">
                          <NotebookPen className="h-3 w-3" /> {notesCount}
                        </span>
                      )}
                    </div>
                  )}
                  {!resourceAvailable && (
                    <p className="mt-2 text-xs font-semibold text-amber-400/80">Coming Soon</p>
                  )}

                  {/* Progress bar */}
                  {resourceAvailable && (
                    <div className="mt-auto pt-4">
                      <div className="mb-1.5 flex justify-between text-[10px] font-semibold">
                        <span
                          className="font-bold uppercase tracking-wide"
                          style={{
                            color: isComplete
                              ? accent.color
                              : isStarted
                                ? "rgba(255,255,255,0.55)"
                                : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {status}
                        </span>
                        <span style={{ color: pct > 0 ? accent.color : "rgba(255,255,255,0.3)" }}>
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                            boxShadow: pct > 0 ? `0 0 8px ${accent.glow}` : "none",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
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
  form = "Form 1",
  mode = "notes",
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  mode?: LearningMode;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapter = getSubjectChapters(subjectId, scienceLang, form).find(
    (c) => c.key === chapterKey,
  );
  const chapterContent = getChapter(
    subjectId,
    chapterKey,
    scienceLang,
    form === "All" ? "Form 1" : form,
  );
  const chapterLabel =
    chapter?.label ??
    (chapterContent ? `${chapterContent.chapterKey}: ${chapterContent.title}` : chapterKey);
  const displayChapterLabel =
    mode === "quizzes" || mode === "flashcards" ? cleanLearningTitle(chapterLabel) : chapterLabel;
  const accent = getSubjectAccent(subjectId);

  return (
    <div className="mb-5 animate-fade-up">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to chapters
        </button>
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
          <span className="text-sm">{subj?.emoji}</span>
          <span className="text-sm font-bold" style={{ color: accent.color }}>
            {subj?.name}
          </span>
          <span className="text-white/30">•</span>
          <span className="max-w-[180px] truncate text-xs text-white/55">
            {displayChapterLabel}
          </span>
        </div>
      </div>

      {/* Chapter banner */}
      <div
        className="mb-5 overflow-hidden rounded-2xl border border-white/[0.06] p-5"
        style={{
          background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}08)`,
          borderColor: `${accent.from}25`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `${accent.from}25`,
              boxShadow: `0 0 20px ${accent.glow}`,
            }}
          >
            <BookOpen className="h-5 w-5" style={{ color: accent.color }} />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accent.color }}
            >
              {subj?.name} • Learning Content
            </p>
            <h2 className="mt-0.5 font-display text-xl font-bold leading-tight text-white">
              {displayChapterLabel}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormComingSoon({
  subjectId,
  form,
  mode,
  onBack,
}: {
  subjectId: string;
  form: Extract<Form, "Form 2" | "Form 3">;
  mode?: LearningMode;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const accent = getSubjectAccent(subjectId);

  return (
    <AcademyPanel>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to forms
      </button>

      <div
        className="relative overflow-hidden rounded-[2rem] border p-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.25)] sm:p-10"
        style={{
          borderColor: `${accent.from}24`,
          background: `linear-gradient(135deg, ${accent.from}16, rgba(13,21,37,0.88) 48%, ${accent.to}10)`,
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: accent.glow }}
        />
        <div
          className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/[0.10] bg-white/[0.06] animate-float-soft"
          style={{ boxShadow: `0 0 34px ${accent.glow}` }}
        >
          <Rocket className="h-8 w-8" style={{ color: accent.color }} />
        </div>
        <p
          className="relative text-xs font-black uppercase tracking-[0.22em]"
          style={{ color: accent.color }}
        >
          {subj?.name} / {form}
        </p>
        <h2 className="relative mt-3 font-display text-3xl font-bold text-white">
          {mode === "quizzes" ? "Quiz Coming Soon" : "Coming Soon"}
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          {mode === "quizzes"
            ? "Notes are available first. Quiz content will be added later."
            : `${form} content is currently being prepared.`}
        </p>
      </div>
    </AcademyPanel>
  );
}

export function ComingSoonScreen({
  subjectId,
  chapterKey,
  onBack,
  scienceLang,
  form = "Form 1",
  mode,
}: {
  subjectId: string;
  chapterKey: string;
  onBack: () => void;
  scienceLang?: "bm" | "dlp";
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  mode?: "notes" | "quizzes" | "flashcards" | "mindmaps";
}) {
  const chapter = getSubjectChapters(subjectId, scienceLang, form).find(
    (c) => c.key === chapterKey,
  );
  const accent = getSubjectAccent(subjectId);
  const placeholderItems =
    mode === "quizzes"
      ? ["Objective Quiz 1"]
      : mode === "flashcards"
        ? ["Deck 1", "Deck 2", "Deck 3"]
        : (chapter?.subtopics ?? []);
  const chapterLabel =
    mode === "quizzes" || mode === "flashcards"
      ? cleanLearningTitle(chapter?.label ?? chapterKey)
      : (chapter?.label ?? chapterKey);

  return (
    <>
      {mode && (
        <ChapterContentTabs
          subjectId={subjectId}
          form={form}
          chapterKey={chapterKey}
          scienceLang={scienceLang}
          currentContentType={mode}
        />
      )}
      <div className="animate-fade-up rounded-3xl border border-white/[0.08] bg-[#0D1525]/80 px-5 py-12 text-center sm:px-8 sm:py-16">
        <div className="mb-6 text-6xl animate-float-soft">🚧</div>
        <h2 className="font-display text-2xl font-bold text-white">{chapterLabel}</h2>
        <p className="mt-2 text-sm text-white/50">This chapter is coming soon. Stay tuned!</p>
        <span className="mt-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-amber-300">
          Available Soon
        </span>

        {placeholderItems.length > 0 && (
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            {placeholderItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm font-bold leading-snug text-white">{item}</h3>
                  <Lock className="h-4 w-4 shrink-0 text-white/30" />
                </div>
                <div className="mt-4 min-h-12 rounded-xl border border-dashed border-white/[0.08] bg-black/10 p-3">
                  <p className="text-xs font-semibold text-white/35">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          style={{
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            boxShadow: `0 4px 20px -4px ${accent.glow}`,
          }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to chapters
        </button>
      </div>
    </>
  );
}

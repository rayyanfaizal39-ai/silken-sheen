import { useMemo } from "react";
import {
  BookOpen,
  Target,
  Lightbulb,
  Zap,
  BookMarked,
  Star,
  LayoutGrid,
  RefreshCcw,
  ArrowRight,
  Sparkles,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { subjects, type Form } from "@/data/subjects-meta";
import { SubjectGrid } from "@/components/ChapterPicker";
import type { Progress } from "@/hooks/use-progress";
import { chapterProgressPct, chapterActivityKey } from "@/hooks/use-progress";
import { getFormChapterCount } from "@/content/registry";

// Subject accent (aligned with SUBJECT_COLORS in ChapterPicker)
const SUBJECT_ACCENT: Record<string, { text: string; bar: string; ring: string }> = {
  bm: { text: "text-rose-300", bar: "from-rose-500 to-orange-500", ring: "ring-rose-500/30" },
  english: { text: "text-sky-300", bar: "from-sky-500 to-blue-600", ring: "ring-sky-500/30" },
  math: { text: "text-indigo-300", bar: "from-indigo-500 to-purple-600", ring: "ring-indigo-500/30" },
  science: { text: "text-emerald-300", bar: "from-emerald-500 to-teal-600", ring: "ring-emerald-500/30" },
  sejarah: { text: "text-amber-300", bar: "from-amber-500 to-yellow-500", ring: "ring-amber-500/30" },
  geography: { text: "text-cyan-300", bar: "from-cyan-500 to-emerald-500", ring: "ring-cyan-500/30" },
};

function subjectName(id: string) {
  return subjects.find((s) => s.id === id)?.name ?? id;
}

interface RecentItem {
  subjectId: string;
  chapterKey: string;
  label: string;
  form: Form;
  pct: number;
}

export interface NotesLandingProps {
  progress: Progress;
  onSelectSubject: (id: string) => void;
  onContinueReading: (subjectId: string, chapterKey: string, form: Form) => void;
}

export function NotesLanding({ progress, onSelectSubject, onContinueReading }: NotesLandingProps) {
  // Build "Continue Reading" list from real progress (recentActivity + lastVisited).
  const recent: RecentItem[] = useMemo(() => {
    const out: RecentItem[] = [];
    const seen = new Set<string>();

    const push = (r: {
      subjectId: string;
      chapterKey: string;
      label: string;
      form?: Form;
      type?: string;
    }) => {
      if (r.type && r.type !== "notes") return;
      const id = `${r.subjectId}:${r.chapterKey}`;
      if (seen.has(id)) return;
      seen.add(id);
      const form: Form = r.form ?? "Form 1";
      const pct = chapterProgressPct(progress.chapterActivity[chapterActivityKey(r.subjectId, r.chapterKey)]);
      out.push({ subjectId: r.subjectId, chapterKey: r.chapterKey, label: r.label, form, pct });
    };

    for (const item of progress.recentActivity ?? []) push(item);
    if (progress.lastVisited) push(progress.lastVisited);

    return out.slice(0, 4);
  }, [progress]);

  const subjectChapterCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of subjects) {
      map[s.id] =
        getFormChapterCount(s.id, "Form 1") +
        getFormChapterCount(s.id, "Form 2") +
        getFormChapterCount(s.id, "Form 3");
    }
    return map;
  }, []);

  return (
    <div className="space-y-10">
      {/* ── Premium hero: Smart Notes, Better Understanding. ────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#12102a]/90 via-[#0f0b24]/85 to-[#0a0819]/90 p-6 shadow-[0_30px_80px_-20px_rgba(88,28,235,0.35)] sm:p-10">
        {/* Ambient purple glow layers */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-200">
              <Sparkles className="h-3.5 w-3.5" /> Smart Learning
            </span>

            <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">
              Smart Notes,
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                Better Understanding.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
              Clear, concise and KSSM-aligned notes to help you understand faster and remember longer.
            </p>
          </div>

          {/* Right: glowing notebook + floating info cards */}
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <NotebookIllustration />

            {/* Floating info cards — desktop absolutely positioned around the notebook,
                stacked into a 2-col grid on mobile. */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
              {INFO_CARDS.map((c) => (
                <InfoCard key={c.title} {...c} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <div className="pointer-events-auto absolute -left-4 top-2">
                <InfoCard {...INFO_CARDS[0]} />
              </div>
              <div className="pointer-events-auto absolute -right-2 top-6">
                <InfoCard {...INFO_CARDS[2]} />
              </div>
              <div className="pointer-events-auto absolute -left-2 bottom-6">
                <InfoCard {...INFO_CARDS[1]} />
              </div>
              <div className="pointer-events-auto absolute -right-4 bottom-2">
                <InfoCard {...INFO_CARDS[3]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits strip ────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/[0.06] lg:gap-0">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex items-start gap-3 lg:px-5 lg:first:pl-2 lg:last:pr-2">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${b.gradient} text-white shadow-inner`}
              >
                <b.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{b.title}</p>
                <p className="text-xs leading-snug text-white/55">{b.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Continue Reading ─────────────────────────────────────────────── */}
      <section>
        <header className="mb-4 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-300" />
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Continue Reading</h2>
              <p className="text-xs text-white/55">Pick up where you left off</p>
            </div>
          </div>
        </header>

        {recent.length === 0 ? (
          <EmptyContinueReading />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recent.map((r) => {
              const accent = SUBJECT_ACCENT[r.subjectId] ?? SUBJECT_ACCENT.math;
              return (
                <button
                  key={`${r.subjectId}:${r.chapterKey}`}
                  type="button"
                  onClick={() => onContinueReading(r.subjectId, r.chapterKey, r.form)}
                  className={`group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0f1024]/70 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#141535]/80 focus-visible:outline-none focus-visible:ring-2 ${accent.ring}`}
                >
                  <p className={`text-xs font-semibold ${accent.text}`}>{subjectName(r.subjectId)}</p>
                  <p className="mt-1 line-clamp-2 text-sm font-bold text-white">{r.label}</p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/50">{r.pct}% completed</p>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-colors group-hover:text-white">
                    Continue Reading <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Notes by Subject ─────────────────────────────────────────────── */}
      <section>
        <header className="mb-4 flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-purple-300" />
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Notes by Subject</h2>
            <p className="text-xs text-white/55">Explore notes by your favourite subjects</p>
          </div>
        </header>
        <SubjectGrid onSelect={onSelectSubject} />
        {/* Real chapter counts (derived from registry) surfaced as a compact strip
            so students can see coverage without inventing numbers. */}
        <ul className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/50">
          {subjects.map((s) => (
            <li
              key={s.id}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1"
            >
              <span className={SUBJECT_ACCENT[s.id]?.text ?? "text-white/70"}>{s.name}</span>
              <span className="ml-1.5 text-white/60">{subjectChapterCounts[s.id] ?? 0} chapters</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// ─── Notebook illustration (pure SVG, no external asset) ──────────────────
function NotebookIllustration() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[440px]">
      {/* Soft purple halo behind the notebook */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.35)_0%,rgba(88,28,235,0.15)_45%,transparent_70%)] blur-2xl"
      />
      <svg
        viewBox="0 0 400 320"
        className="h-full w-full drop-shadow-[0_20px_40px_rgba(139,92,246,0.35)]"
        role="img"
        aria-label="Glowing open notebook"
      >
        <defs>
          <linearGradient id="nb-page" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1440" />
            <stop offset="100%" stopColor="#120c30" />
          </linearGradient>
          <linearGradient id="nb-cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="nb-highlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="pen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
        </defs>

        {/* Left cover */}
        <path d="M40 60 Q40 50 55 46 L200 30 L200 285 L55 305 Q40 308 40 298 Z" fill="url(#nb-cover)" opacity="0.9" />
        {/* Right cover */}
        <path d="M360 60 Q360 50 345 46 L200 30 L200 285 L345 305 Q360 308 360 298 Z" fill="url(#nb-cover)" opacity="0.9" />

        {/* Left page */}
        <path d="M55 58 L200 42 L200 278 L55 298 Z" fill="url(#nb-page)" stroke="rgba(167,139,250,0.4)" strokeWidth="1" />
        {/* Right page */}
        <path d="M345 58 L200 42 L200 278 L345 298 Z" fill="url(#nb-page)" stroke="rgba(167,139,250,0.4)" strokeWidth="1" />

        {/* Spine glow */}
        <line x1="200" y1="42" x2="200" y2="278" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" />

        {/* Note lines — left */}
        {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((y, i) => (
          <line
            key={`l-${y}`}
            x1={70}
            y1={y}
            x2={i === 2 ? 155 : 190}
            y2={y - 1}
            stroke="rgba(196,181,253,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
        {/* Highlighted line — left */}
        <rect x="70" y="112" width="90" height="10" rx="2" fill="url(#nb-highlight)" opacity="0.55" />

        {/* Note lines — right */}
        {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((y, i) => (
          <line
            key={`r-${y}`}
            x1={i === 4 ? 245 : 210}
            y1={y - 1}
            x2={330}
            y2={y}
            stroke="rgba(196,181,253,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
        {/* Checkbox bullets — right */}
        {[80, 100, 120].map((y) => (
          <rect
            key={`cb-${y}`}
            x={212}
            y={y - 6}
            width="8"
            height="8"
            rx="2"
            fill="none"
            stroke="rgba(167,139,250,0.7)"
            strokeWidth="1.2"
          />
        ))}

        {/* Pen laid across the right page */}
        <g transform="translate(230 210) rotate(-22)">
          <rect x="0" y="0" width="140" height="10" rx="3" fill="url(#pen)" />
          <rect x="120" y="0" width="20" height="10" rx="2" fill="#c4b5fd" />
          <polygon points="140,0 155,5 140,10" fill="#f5f3ff" />
          <circle cx="156" cy="5" r="1.5" fill="#4c1d95" />
        </g>
      </svg>
    </div>
  );
}

const INFO_CARDS: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tone: string;
}> = [
  { icon: CheckCircle2, title: "KSSM Aligned", desc: "Based on the Malaysian curriculum", tone: "text-emerald-300" },
  { icon: Target, title: "Exam Focused", desc: "Important points highlighted", tone: "text-amber-300" },
  { icon: Lightbulb, title: "Easy to Understand", desc: "Simple explanations for better clarity", tone: "text-yellow-300" },
  { icon: Zap, title: "Quick Revision", desc: "Summaries and key points for fast recall", tone: "text-purple-300" },
];

function InfoCard({
  icon: Icon,
  title,
  desc,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tone: string;
}) {
  return (
    <div className="w-full max-w-[195px] rounded-xl border border-white/[0.08] bg-[#0f0b24]/85 p-2.5 shadow-[0_10px_30px_rgba(76,29,149,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className={`grid h-7 w-7 place-items-center rounded-lg bg-white/[0.06] ${tone}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[12px] font-bold text-white">{title}</p>
      </div>
      <p className="mt-1 text-[11px] leading-snug text-white/60">{desc}</p>
    </div>
  );
}

const BENEFITS: Array<{
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  gradient: string;
}> = [
  { icon: BookMarked, title: "Complete Coverage", desc: "All chapters and topics", gradient: "from-purple-500 to-indigo-500" },
  { icon: Star, title: "Key Points", desc: "Exam-focused highlights", gradient: "from-amber-500 to-orange-500" },
  { icon: Lightbulb, title: "Real Examples", desc: "Understand with context", gradient: "from-emerald-500 to-teal-500" },
  { icon: LayoutGrid, title: "Diagrams & Tables", desc: "Visual learning made easy", gradient: "from-sky-500 to-blue-500" },
  { icon: RefreshCcw, title: "Regular Updates", desc: "Always kept current", gradient: "from-rose-500 to-pink-500" },
];

function EmptyContinueReading() {
  return (
    <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-8 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-purple-500/15 text-purple-300">
        <Pencil className="h-5 w-5" />
      </div>
      <p className="font-display text-lg font-bold text-white">Your reading journey starts here.</p>
      <p className="mt-1 text-sm text-white/55">
        Choose a subject below to open your first chapter — we&apos;ll remember where you left off.
      </p>
    </div>
  );
}

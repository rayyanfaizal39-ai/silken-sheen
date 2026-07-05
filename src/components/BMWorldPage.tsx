import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clapperboard,
  Clock,
  FileQuestion,
  Flame,
  Globe2,
  GraduationCap,
  Heart,
  Lightbulb,
  Map,
  MessageCircle,
  PenTool,
  RotateCcw,
  Star,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";
import {
  BM_KERTAS,
  getBMKertas,
  getBMHub,
  getBMTopic,
  type BMKertas,
  type BMHub,
  type BMTopic,
} from "@/data/bm-structure";
import { getSistemBahasaContent } from "@/data/bm-k1-sistem-bahasa";
import {
  getPremiumKomsasWork,
  type KomsasWork,
  type KomsasExamQuestion,
} from "@/data/bm-komsas-premium";
import {
  bmF1ObjektifKuiz1,
  bmF1ObjektifKuiz2,
  bmF1ObjektifKuiz3,
} from "@/data/bm-f1-objektif-quizzes";
import type { QuizQuestion } from "@/data/types";
import { useProgress } from "@/hooks/use-progress";
import { sfx } from "@/lib/sounds";
import { SistemBahasaTopicDetail } from "@/components/SistemBahasaTopicDetail";
import { KaranganPendekHub } from "@/components/KaranganPendekHub";
import { KaranganPanjangHub } from "@/components/KaranganPanjangHub";
import { BengkelKaranganHub } from "@/components/BengkelKaranganHub";
import { getWorkshopContent } from "@/data/bm-workshop-hub";
import { ModelKaranganHub } from "@/components/ModelKaranganHub";
import { getModelKarangan } from "@/data/bm-model-karangan-hub";
import { PenandaWacanaLengkapHub } from "@/components/PenandaWacanaLengkapHub";
import { PeribahasaBankLengkapHub } from "@/components/PeribahasaBankLengkapHub";
import { EssayImprovementPlusSections } from "@/components/EssayImprovementPlusSections";
import { Kertas2FolderTemplate, Kertas2HubGrid, splitIntoKertas2Folders } from "@/components/Kertas2FolderTemplate";
import { ExamSkillLanding, type MissionDefinition } from "@/components/exam-skill/MissionLearning";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Navigation state ─────────────────────────────────────────────────────────

type BMScreen =
  | { type: "landing" }
  | { type: "k1-quiz" }
  | { type: "kertas"; kertasId: "k1" | "k2" }
  | { type: "hub"; kertasId: "k1" | "k2"; hubId: string }
  | { type: "topic"; kertasId: "k1" | "k2"; hubId: string; topicId: string }
  | { type: "objektif-quiz"; setIndex: 0 | 1 | 2 };

// Objektif UASA set metadata
const OBJEKTIF_SETS = [
  {
    id: "bm-f1-obj1",
    label: "Set A",
    badge: "A",
    color: "#818CF8",
    questions: bmF1ObjektifKuiz1,
  },
  {
    id: "bm-f1-obj2",
    label: "Set B",
    badge: "B",
    color: "#34D399",
    questions: bmF1ObjektifKuiz2,
  },
  {
    id: "bm-f1-obj3",
    label: "Set C",
    badge: "C",
    color: "#F472B6",
    questions: bmF1ObjektifKuiz3,
  },
] as const;

function shuffleItems<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function shuffleObjectiveQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const groups = [
    shuffleItems(questions.slice(0, 5)),
    shuffleItems(questions.slice(5, 10)),
    questions.slice(10, 15),
  ];
  return groups.flatMap((group) =>
    group.map((question) => {
      const correctAnswer = question.options[question.answerIndex];
      const options = shuffleItems(question.options);
      return { ...question, options, answerIndex: options.indexOf(correctAnswer) };
    }),
  );
}

function gradeFromPct(pct: number) {
  if (pct >= 90) return { label: "A", tone: "#34D399", message: "Cemerlang" };
  if (pct >= 80) return { label: "B", tone: "#60A5FA", message: "Sangat Baik" };
  if (pct >= 70) return { label: "C", tone: "#A78BFA", message: "Baik" };
  if (pct >= 60) return { label: "D", tone: "#FBBF24", message: "Hampir Mantap" };
  return { label: "Perlu Latihan", tone: "#FB7185", message: "Teruskan Usaha" };
}

// ─── Shared chip + badge components ──────────────────────────────────────────

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-wide"
      style={{ background: `${color}25`, color }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[11px] font-black tracking-wide text-[#818CF8]">{children}</p>;
}

function bmText(value: string | undefined) {
  if (!value) return "";
  return value
    .replace(/\bPopular theme:/gi, "Tema kerap ditanya:")
    .replace(/\bPopular themes:/gi, "Tema kerap ditanya:")
    .replace(/\bPopular values:/gi, "Nilai kerap ditanya:")
    .replace(/\bPopular value:/gi, "Nilai kerap ditanya:")
    .replace(/\bCommon exam focus:/gi, "Fokus peperiksaan lazim:")
    .replace(/\bCommon focus:/gi, "Fokus lazim:")
    .replace(/\bCommon question:/gi, "Soalan lazim:")
    .replace(/\bCommon questions:/gi, "Soalan lazim:")
    .replace(/\bExam focus:/gi, "Fokus peperiksaan:")
    .replace(/\bExam Focus/gi, "Fokus Peperiksaan")
    .replace(/\bExam Tips/gi, "Petua Peperiksaan")
    .replace(/\bExam Reminder/gi, "Peringatan Peperiksaan")
    .replace(/\bFrequently Tested Points/gi, "Perkara Kerap Ditanya")
    .replace(/\bQuick Revision Card/gi, "Kad Ulang Kaji Pantas")
    .replace(/\bModel answer/gi, "Jawapan Contoh")
    .replace(/\bExplanation/gi, "Penjelasan")
    .replace(/\bWhy it matters/gi, "Mengapa penting")
    .replace(/\bWhat happened/gi, "Apa berlaku")
    .replace(/\bReal life example/gi, "Contoh kehidupan sebenar")
    .replace(/\bSchool example/gi, "Contoh di sekolah")
    .replace(/\bPersonality/gi, "Perwatakan")
    .replace(/\bEvidence/gi, "Bukti")
    .replace(/\bImportance/gi, "Kepentingan")
    .replace(/\bTheme/gi, "Tema")
    .replace(/\bValues/gi, "Nilai")
    .replace(/\bLessons/gi, "Pengajaran")
    .replace(/\bQuiz/gi, "Kuiz")
    .replace(/\bScore/gi, "Markah")
    .replace(/\bProgress tracker placeholder/gi, "Penjejak kemajuan")
    .replace(/\bFuture:/gi, "Akan datang:")
    .replace(/\bquizzes/gi, "kuiz")
    .replace(/\bflashcards/gi, "kad imbas")
    .replace(/\bAI video summaries/gi, "ringkasan video kecerdasan buatan")
    .replace(/\bPlaceholder/gi, "Ruang latihan")
    .replace(/\bMatching/gi, "Padanan")
    .replace(/\bTap reveal answer/gi, "Tekan untuk lihat jawapan")
    .replace(/\bReflect/gi, "Renung")
    .replace(/\bMovie Trailer/gi, "Ringkasan Cerita")
    .replace(/\bKBAT Challenge/gi, "Cabaran KBAT")
    .replace(/\bMaster File/gi, "Fail Lengkap")
    .replace(/\bExam Character Analysis/gi, "Analisis Watak UASA")
    .replace(/\bMini Quiz Lab/gi, "Makmal Kuiz Mini")
    .replace(/\bQuiz placeholders ready/gi, "Ruang kuiz mini tersedia")
    .replace(/\bStudy Time/gi, "Tempoh Pembelajaran")
    .replace(/\bDifficulty/gi, "Tahap Kesukaran");
}

function PlaceholderChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/40">
      <Clock className="h-3 w-3" />
      {label} - Akan Datang
    </span>
  );
}

// ─── Collapsible learning section (premium accordion card) ────────────────────

function CollapsibleSection({
  icon,
  title,
  accent = "#818CF8",
  defaultOpen = false,
  badge,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  accent?: string;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.16]"
      style={open ? { borderColor: `${accent}40`, boxShadow: `0 0 28px ${accent}14` } : undefined}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex flex-wrap items-center gap-2.5">
          {icon && (
            <span className="shrink-0" style={{ color: accent }}>
              {icon}
            </span>
          )}
          <span className="font-display text-sm font-bold text-white/90 sm:text-base">{title}</span>
          {badge}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">{children}</div>
        </div>
      </div>
    </section>
  );
}

function LearningFolder({
  icon,
  title,
  description,
  accent,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <CollapsibleSection icon={icon} title={title} accent={accent} defaultOpen={defaultOpen}>
      <p className="mb-4 text-xs leading-5 text-white/45">{description}</p>
      <div className="space-y-3 border-l border-white/10 pl-3 sm:pl-4">{children}</div>
    </CollapsibleSection>
  );
}

// ─── Back / breadcrumb header ─────────────────────────────────────────────────

function PageHeader({
  breadcrumb,
  onBack,
  accent,
}: {
  breadcrumb: string[];
  onBack: () => void;
  accent: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button
        onClick={onBack}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
        aria-label="Kembali"
      >
        <ChevronLeft className="h-4 w-4 text-white/60" />
      </button>
      <div className="flex min-w-0 flex-wrap items-center gap-1 text-[11px] text-white/40">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-white/20">/</span>}
            <span
              className={i === breadcrumb.length - 1 ? "font-bold text-white/70" : ""}
              style={i === breadcrumb.length - 1 ? { color: accent } : {}}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── LANDING VIEW — Kertas 1 & 2 cards ───────────────────────────────────────

function LandingView({
  onSelectKertas,
  onBack,
}: {
  onSelectKertas: (id: "k1" | "k2") => void;
  onBack: () => void;
}) {
  return (
    <div>
      {/* BM World Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 text-[11px] font-bold text-white/40 transition-colors hover:text-white/70"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Semua Subjek
        </button>

        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{
              background: "radial-gradient(circle at 35% 30%, #F472B640, #F472B618)",
              boxShadow: "0 0 24px rgba(244,114,182,0.4)",
            }}
          >
            📝
          </div>
          <div>
            <p className="text-[9px] font-black tracking-wide text-[#F472B6]/60">
              ✦ DEWAN SASTERA ✦
            </p>
            <h1 className="font-display text-2xl font-bold text-white">Bahasa Melayu</h1>
            <p className="mt-0.5 text-sm text-white/40">Dunia Nusantara - Tingkatan 1</p>
          </div>
        </div>

        {/* Identity ticker */}
        <div className="mt-5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] py-2">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#F472B6]/40">
            TATABAHASA · PEMAHAMAN · KOMSAS · NOVEL · KARANGAN · PERIBAHASA · RINGKASAN
          </p>
        </div>
      </div>

      {/* Exam path intro */}
      <div className="mb-6">
        <SectionLabel>Laluan Peperiksaan</SectionLabel>
        <p className="text-sm text-white/50">
          Pilih kertas untuk mula belajar. Setiap kertas mempunyai hub tersendiri dengan modul yang
          tersusun dari asas hingga peringkat cemerlang.
        </p>
      </div>

      {/* Kertas cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {BM_KERTAS.map((kertas) => (
          <KertasCard key={kertas.id} kertas={kertas} onSelect={() => onSelectKertas(kertas.id)} />
        ))}
      </div>

      {/* Quick stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Hub Belajar", value: `${BM_KERTAS.reduce((s, k) => s + k.hubs.length, 0)}` },
          {
            label: "Jumlah Topik",
            value: `${BM_KERTAS.reduce((s, k) => s + k.hubs.reduce((s2, h) => s2 + h.topics.length, 0), 0)}`,
          },
          { label: "Kertas UASA", value: "2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center"
          >
            <p className="text-xl font-black text-white">{stat.value}</p>
            <p className="mt-0.5 text-[9px] font-bold tracking-wide text-white/30">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KertasCard({ kertas, onSelect }: { kertas: BMKertas; onSelect: () => void }) {
  const topicCount = kertas.hubs.reduce((s, h) => s + h.topics.length, 0);
  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[1.75rem] border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
      style={{
        borderColor: `${kertas.color}28`,
        background: `linear-gradient(135deg, ${kertas.color}18 0%, ${kertas.color}08 60%, transparent 100%)`,
      }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 60px ${kertas.color}18, 0 16px 48px ${kertas.color}30` }}
      />

      {/* Decorative symbol */}
      <div className="pointer-events-none absolute right-5 top-5 text-5xl opacity-[0.07]">
        {kertas.icon}
      </div>

      <div className="relative z-10">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black"
          style={{ background: `${kertas.color}20`, color: kertas.color }}
        >
          <span>{kertas.icon}</span>
          <span>{kertas.label}</span>
        </div>

        <h2 className="mb-2 text-lg font-bold text-white">{kertas.description}</h2>

        <p className="mb-5 text-xs text-white/40">{kertas.examDetails}</p>

        {/* Hub previews */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {kertas.hubs.map((hub) => (
            <span
              key={hub.id}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50"
            >
              {hub.icon} {hub.shortLabel}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30">
            {kertas.hubs.length} hub · {topicCount} topik
          </span>
          <span
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: kertas.color }}
          >
            Mula Belajar
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── OBJEKTIF KUIZ RUNNER ─────────────────────────────────────────────────────

function ObjektifKuizView({
  setIndex,
  onBack,
  onNextSet,
}: {
  setIndex: 0 | 1 | 2;
  onBack: () => void;
  onNextSet?: () => void;
}) {
  const set = OBJEKTIF_SETS[setIndex];
  const questions: QuizQuestion[] = set.questions as unknown as QuizQuestion[];
  const { addXp, recordQuiz, recordQuizResult } = useProgress();
  const totalSeconds = 60;

  type Phase = "intro" | "quiz" | "results";
  const [phase, setPhase] = useState<Phase>("intro");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    shuffleObjectiveQuestions(questions),
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [earnedXp, setEarnedXp] = useState(0);

  const q = quizQuestions[current];
  const correct = answers.filter((a, i) => a === quizQuestions[i]?.answerIndex).length;
  const pct = Math.round((correct / quizQuestions.length) * 100);
  const progressPct = Math.round(((current + (revealed ? 1 : 0)) / quizQuestions.length) * 100);
  const grade = gradeFromPct(pct);

  useEffect(() => {
    if (phase !== "quiz" || revealed) return;
    if (timeLeft <= 0) {
      handleSelect(null);
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, revealed, timeLeft]);

  function handleSelect(idx: number | null) {
    if (revealed) return;
    if (idx === q.answerIndex) sfx.success();
    if (idx !== null && idx !== q.answerIndex) sfx.whomp();
    setSelected(idx);
    setRevealed(true);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function handleNext() {
    if (current < quizQuestions.length - 1) {
      sfx.whoosh();
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setTimeLeft(totalSeconds);
    } else {
      recordQuiz(pct === 100);
      recordQuizResult({
        subjectId: "bm",
        chapterKey: set.id,
        correct,
        total: quizQuestions.length,
      });
      const xpReward = pct >= 90 ? 45 : pct >= 80 ? 35 : pct >= 60 ? 20 : 10;
      addXp(xpReward, "bm");
      setEarnedXp(xpReward);
      if (pct >= 60) sfx.fanfare();
      setPhase("results");
    }
  }

  function handleRestart() {
    setQuizQuestions(shuffleObjectiveQuestions(questions));
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setAnswers(Array(questions.length).fill(null));
    setTimeLeft(totalSeconds);
    setEarnedXp(0);
    setPhase("quiz");
  }

  function handleStart() {
    sfx.click();
    handleRestart();
  }

  if (phase === "intro") {
    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Kertas 1", `Objektif ${set.label}`]}
          onBack={onBack}
          accent={set.color}
        />
        <div
          className="rounded-[2rem] border p-8 text-center"
          style={{ borderColor: `${set.color}30`, background: `${set.color}0a` }}
        >
          <div
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl font-black text-white"
            style={{ background: `linear-gradient(135deg, ${set.color}60, ${set.color}30)` }}
          >
            {set.badge}
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Kuiz Objektif {set.label}</h2>
          <p className="mt-1 text-sm text-white/50">
            Kertas 1 Bahagian A — Format UASA Tingkatan 1
          </p>
          <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-3">
            {[
              { icon: "📝", label: "15 Soalan" },
              { icon: "⏱️", label: "15 Minit" },
              { icon: "🎯", label: "4 Pilihan" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3 text-center"
              >
                <p className="text-lg">{item.icon}</p>
                <p className="mt-1 text-[10px] font-bold text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="text-xs text-white/40 leading-relaxed">
              Struktur: S1–5 Sistem Bahasa · S6–10 Pemahaman · S11–15 KOMSAS Tingkatan 1
            </p>
          </div>
          <button
            onClick={handleStart}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${set.color}, ${set.color}bb)`,
              boxShadow: `0 8px 24px ${set.color}40`,
            }}
          >
            Mula Kuiz <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const passed = pct >= 60;

    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Kertas 1", `Objektif ${set.label}`]}
          onBack={onBack}
          accent={set.color}
        />
        <div
          className="relative overflow-hidden rounded-[2rem] border p-8 text-center animate-fade-up"
          style={{ borderColor: `${set.color}30`, background: `${set.color}0a` }}
        >
          {passed && (
            <div className="pointer-events-none absolute inset-0">
              {["✦", "✧", "✦", "✧", "✦", "✧"].map((star, i) => (
                <span
                  key={`${star}-${i}`}
                  className="absolute animate-xp-burst text-xl text-sky-200"
                  style={{
                    left: `${18 + i * 12}%`,
                    top: `${16 + (i % 3) * 14}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {star}
                </span>
              ))}
            </div>
          )}
          <p className="text-5xl mb-3">{passed ? "🏆" : "💪"}</p>
          <h2 className="font-display text-2xl font-bold text-white">{grade.message}</h2>
          <p className="mt-1 text-sm text-white/50">Kuiz Objektif {set.label} selesai</p>

          <div
            className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full text-3xl font-black text-white animate-score-reveal"
            style={{
              background: `conic-gradient(${grade.tone} ${pct}%, rgba(255,255,255,0.06) 0%)`,
              boxShadow: `0 0 40px ${grade.tone}40`,
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "#080c1a" }}
            >
              {pct}%
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-white/35">Betul</p>
              <p className="mt-1 text-lg font-black text-white">
                {correct}/{quizQuestions.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-white/35">Gred</p>
              <p className="mt-1 text-lg font-black" style={{ color: grade.tone }}>
                {grade.label}
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-white/35">
                Ganjaran
              </p>
              <p className="mt-1 text-lg font-black text-sky-200">+{earnedXp} XP</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-left">
            {quizQuestions.map((question, i) => {
              const ans = answers[i];
              const isCorrect = ans === question.answerIndex;
              return (
                <div
                  key={question.id}
                  className="flex items-start gap-3 rounded-xl border px-3 py-2.5"
                  style={{
                    borderColor: isCorrect ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)",
                    background: isCorrect ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)",
                  }}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white/80 line-clamp-1">
                      S{i + 1}. {question.question.split("\n")[0]}
                    </p>
                    {!isCorrect && (
                      <p className="mt-0.5 text-[10px] text-white/40">
                        Jawapan: {question.options[question.answerIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09]"
            >
              <RotateCcw className="h-4 w-4" /> Cuba Semula
            </button>
            <button
              onClick={onNextSet ?? onBack}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${set.color}, ${set.color}bb)` }}
            >
              {onNextSet ? "Kuiz Seterusnya" : "Selesai"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  const isCorrect = selected === q.answerIndex;
  const timerPct = (timeLeft / totalSeconds) * 100;

  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Kertas 1", `Objektif ${set.label}`]}
        onBack={onBack}
        accent={set.color}
      />

      {/* Progress bar */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-bold text-white/40">
            Soalan {current + 1} / {quizQuestions.length}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-bold"
            style={{ color: timeLeft <= 10 ? "#FB7185" : set.color }}
          >
            <Clock className="h-3.5 w-3.5" /> {timeLeft}s
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${set.color}, ${set.color}cc)`,
            }}
          />
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timeLeft <= 10 ? "#FB7185" : "#60A5FA" }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={q.id}
        className="mb-4 rounded-[1.5rem] border p-5 animate-question-reveal"
        style={{ borderColor: `${set.color}25`, background: `${set.color}08` }}
      >
        <span
          className="mb-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black"
          style={{ background: `${set.color}20`, color: set.color }}
        >
          Soalan {current + 1}
        </span>
        <p className="text-sm font-semibold leading-relaxed text-white whitespace-pre-line">
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div className="mb-4 space-y-2.5">
        {q.options.map((opt, i) => {
          const letter = ["A", "B", "C", "D"][i];
          let borderColor = "rgba(255,255,255,0.08)";
          let bg = "rgba(255,255,255,0.03)";
          let textColor = "text-white/80";

          if (revealed) {
            if (i === q.answerIndex) {
              borderColor = "rgba(52,211,153,0.4)";
              bg = "rgba(52,211,153,0.1)";
              textColor = "text-emerald-300";
            } else if (i === selected && i !== q.answerIndex) {
              borderColor = "rgba(248,113,113,0.4)";
              bg = "rgba(248,113,113,0.08)";
              textColor = "text-rose-300";
            }
          } else if (selected === i) {
            borderColor = `${set.color}50`;
            bg = `${set.color}12`;
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                revealed && i === q.answerIndex ? "animate-correct-pulse" : ""
              } ${revealed && i === selected && i !== q.answerIndex ? "animate-shake" : "hover:translate-x-1"}`}
              style={{ borderColor, background: bg }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-black"
                style={{ background: `${set.color}20`, color: set.color }}
              >
                {letter}
              </span>
              <span className={`text-sm font-medium leading-snug ${textColor}`}>{opt}</span>
              {revealed && i === q.answerIndex && (
                <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-400" />
              )}
              {revealed && i === selected && i !== q.answerIndex && (
                <XCircle className="ml-auto h-4 w-4 shrink-0 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && q.explanation && (
        <div className="mb-4 rounded-2xl border border-[#FBBF24]/20 bg-[#FBBF24]/06 px-4 py-3">
          <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-1">💡 Penerangan</p>
          <p className="text-xs leading-relaxed text-white/75">{q.explanation}</p>
        </div>
      )}

      {/* Feedback + Next */}
      {revealed && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                Betul! ✓
              </span>
            ) : (
              <span className="rounded-full bg-rose-500/12 px-3 py-1 text-xs font-bold text-rose-400">
                {selected === null ? "Masa Tamat" : "Salah ✗"}
              </span>
            )}
          </div>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${set.color}, ${set.color}cc)`,
              boxShadow: `0 4px 16px ${set.color}35`,
            }}
          >
            {current < quizQuestions.length - 1 ? "Soalan Seterusnya" : "Lihat Keputusan"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── K1 QUIZ VIEW — Exam preparation layout ───────────────────────────────────

function K1QuizView({
  kertas,
  onSelectObjektif,
  onBack,
}: {
  kertas: BMKertas;
  onSelectObjektif: (setIndex: 0 | 1 | 2) => void;
  onBack: () => void;
}) {
  const { progress } = useProgress();

  // Compute best score for each set from quizHistory
  const bestScores = OBJEKTIF_SETS.map((set) => {
    const results = (progress.quizHistory ?? []).filter((r) => r.chapterKey === set.id);
    return results.length > 0 ? Math.max(...results.map((r) => r.scorePct)) : null;
  });

  const setMeta = [
    {
      title: "Set A",
      subtitle: "Latihan Asas",
      difficulty: "Mudah",
      color: "#8B5CF6",
      glow: "rgba(139,92,246,0.28)",
    },
    {
      title: "Set B",
      subtitle: "Latihan Pertengahan",
      difficulty: "Sederhana",
      color: "#22C55E",
      glow: "rgba(34,197,94,0.24)",
    },
    {
      title: "Set C",
      subtitle: "Latihan Cabaran",
      difficulty: "Sukar",
      color: "#F97316",
      glow: "rgba(249,115,22,0.25)",
    },
  ] as const;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#070B18]/70 p-4 sm:p-6 animate-fade-up">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[8%] top-[14%] h-1.5 w-1.5 rounded-full bg-sky-200/80 shadow-[0_0_18px_rgba(125,211,252,0.8)] animate-pulse" />
        <span className="absolute right-[13%] top-[24%] h-1 w-1 rounded-full bg-violet-200/80 shadow-[0_0_16px_rgba(167,139,250,0.8)] animate-pulse [animation-delay:600ms]" />
        <span className="absolute left-[18%] bottom-[16%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.65)] animate-pulse [animation-delay:1000ms]" />
        <span className="absolute right-[24%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-blue-200/70 shadow-[0_0_16px_rgba(96,165,250,0.72)] animate-pulse [animation-delay:1400ms]" />
        <div className="absolute -left-20 top-8 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Kertas 1"]}
          onBack={onBack}
          accent={kertas.color}
        />

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/50 to-sky-500/30 text-3xl shadow-[0_0_34px_rgba(96,165,250,0.28)] animate-float-soft">
            📘
          </div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-200/70">
            Bahasa Melayu Form 1
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Kertas 1 Objektif
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/52">
            Pilih Set A, Set B atau Set C. Setiap misi mengandungi 15 soalan mengikut format
            objektif UASA Tingkatan 1.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {([0, 1, 2] as const).map((i) => {
            const best = bestScores[i];
            const meta = setMeta[i];
            const completed = best !== null;
            const status = completed ? "Selesai" : "Belum Bermula";

            return (
              <button
                key={meta.title}
                onClick={() => onSelectObjektif(i)}
                onMouseEnter={() => sfx.hover()}
                className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[1.5rem] border bg-[#0B1220]/78 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] animate-slide-up"
                style={{
                  borderColor: completed ? `${meta.color}55` : `${meta.color}26`,
                  boxShadow: `0 18px 44px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.02)`,
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 42px ${meta.glow}, 0 18px 52px ${meta.glow}` }}
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: meta.glow }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-xs font-black uppercase tracking-[0.18em]"
                        style={{ color: meta.color }}
                      >
                        {meta.title}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-white">
                        {meta.subtitle}
                      </h3>
                    </div>
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white"
                      style={{ background: `${meta.color}22`, color: meta.color }}
                    >
                      {OBJEKTIF_SETS[i].badge}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2">
                      <span className="text-white/48">15 Soalan</span>
                      <FileQuestion className="h-4 w-4" style={{ color: meta.color }} />
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2">
                      <span className="text-white/48">Tahap Kesukaran</span>
                      <span className="font-bold text-white/78">{meta.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2">
                      <span className="text-white/48">Skor Tertinggi</span>
                      <span className="font-bold text-white/78">
                        {best !== null ? `${best}%` : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-black"
                      style={{
                        background: `${completed ? "#34D399" : meta.color}18`,
                        color: completed ? "#34D399" : meta.color,
                      }}
                    >
                      {status}
                    </span>
                  </div>

                  <div
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-white transition-all duration-200 group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${meta.color}, ${meta.color}aa)`,
                    }}
                  >
                    Mulakan{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── KERTAS VIEW — Hub grid ───────────────────────────────────────────────────

function KertasView({
  kertas,
  onSelectHub,
  onBack,
}: {
  kertas: BMKertas;
  onSelectHub: (hubId: string) => void;
  onBack: () => void;
}) {
  if (kertas.id === "k2") return <div><PageHeader breadcrumb={["Bahasa Melayu", kertas.label]} onBack={onBack} accent={kertas.color} /><Kertas2HubGrid hubs={kertas.hubs.map(hub => ({ id: hub.id, label: hub.label, description: hub.description, icon: hub.icon, color: hub.color, count: `${hub.topics.length} topik` }))} onSelect={onSelectHub} /></div>;
  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", kertas.label]}
        onBack={onBack}
        accent={kertas.color}
      />

      <div className="mb-6">
        <div
          className="mb-2 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black"
          style={{ background: `${kertas.color}20`, color: kertas.color }}
        >
          {kertas.icon} {kertas.label}
        </div>
        <h2 className="font-display text-xl font-bold text-white">{kertas.description}</h2>
        <p className="mt-1 text-sm text-white/40">{kertas.examDetails}</p>
      </div>

      <SectionLabel>Hub Pembelajaran</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {kertas.hubs.map((hub, index) => (
          <div
            key={hub.id}
            className={`lg:col-span-2 ${kertas.id === "k1" && index === 3 ? "lg:col-start-2" : ""}`}
          >
            <HubCard hub={hub} onSelect={() => onSelectHub(hub.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HubCard({ hub, onSelect }: { hub: BMHub; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex h-full min-h-52 w-full flex-col overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-200 hover:-translate-y-1"
      style={{
        borderColor: hub.borderColor,
        background: `linear-gradient(135deg, ${hub.color}12 0%, transparent 80%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 40px ${hub.color}14, 0 8px 32px ${hub.color}28` }}
      />

      <div className="relative z-10">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${hub.color}20` }}
        >
          {hub.icon}
        </div>

        <h3 className="mb-1 font-bold text-white">{hub.label}</h3>
        <p className="mb-4 text-xs leading-relaxed text-white/45">{hub.description}</p>

        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ background: `${hub.color}18`, color: hub.color }}
          >
            {hub.topics.length} topik
          </span>
          <ArrowRight
            className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            style={{ color: hub.color }}
          />
        </div>
      </div>
    </button>
  );
}

// ─── HUB VIEW — Topic list ────────────────────────────────────────────────────

function HubView({
  kertas,
  hub,
  onSelectTopic,
  onBack,
}: {
  kertas: BMKertas;
  hub: BMHub;
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}) {
  if (kertas.id === "k2") {
    const items = hub.topics.map(topic => ({ id: topic.id, title: topic.label, description: topic.description, badge: topic.badge }));
    return <div><PageHeader breadcrumb={["Bahasa Melayu", kertas.shortLabel, hub.label]} onBack={onBack} accent={hub.color} /><Kertas2FolderTemplate title={hub.label} subtitle={hub.description} groups={splitIntoKertas2Folders(items)} onSelectItem={onSelectTopic} /></div>;
  }
  if (kertas.id === "k1" && hub.id === "rumusan") {
    const missions: MissionDefinition[] = [
      { number: "01", title: "Formula Markah Penuh", description: "Learn the structure and scoring formula.", icon: Star, color: "#FBBF24" },
      { number: "02", title: "Teknik Menjawab Ringkasan", description: "Learn how to find isi, use penanda wacana and write clearly.", icon: PenTool, color: "#60A5FA" },
      { number: "03", title: "Penguasaan Ringkasan", description: "Practise examples, avoid mistakes and check readiness.", icon: Brain, color: "#C084FC" },
    ];
    return <div><PageHeader breadcrumb={["Bahasa Melayu", kertas.shortLabel, hub.label]} onBack={onBack} accent={hub.color} /><ExamSkillLanding title="Ringkasan" subtitle="Bahagian C: Kuasai isi penting, penanda wacana dan teknik menjawab mengikut format UASA." missions={missions} onSelect={index => onSelectTopic(hub.topics[index].id)} /></div>;
  }

  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", kertas.shortLabel, hub.label]}
        onBack={onBack}
        accent={hub.color}
      />

      <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${hub.color}20`, boxShadow: `0 0 20px ${hub.color}40` }}
        >
          {hub.icon}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">{hub.label}</h2>
          <p className="text-sm text-white/40">{hub.description}</p>
        </div>
      </div>

      <SectionLabel>Topik dalam {hub.label}</SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2">
        {hub.topics.map((topic, idx) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            index={idx + 1}
            hubColor={hub.color}
            onSelect={() => onSelectTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TopicCard({
  topic,
  index,
  hubColor,
  onSelect,
}: {
  topic: BMTopic;
  index: number;
  hubColor: string;
  onSelect: () => void;
}) {
  const getTopicTypeLabel = (t: string) => {
    const map: Record<string, string> = {
      tatabahasa: "Tatabahasa",
      pemahaman: "Teknik",
      komsas: "KOMSAS",
      novel: "Novel",
      ringkasan: "Ringkasan",
      "karangan-pendek": "Karangan",
      "respons-terbuka": "Karangan",
      workshop: "Bengkel",
      "model-karangan": "Model",
      "peribahasa-bank": "Peribahasa",
      "essay-improvement": "Teknik",
      "penanda-wacana-lengkap": "Nota Lengkap",
    };
    return map[t] ?? t;
  };

  return (
    <button
      onClick={onSelect}
      className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left transition-all hover:border-white/[0.14] hover:bg-white/[0.06]"
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white/60"
        style={{ background: `${hubColor}15` }}
      >
        {String(index).padStart(2, "0")}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span
            className="text-[9px] font-black tracking-wide"
            style={{ color: hubColor, opacity: 0.7 }}
          >
            {getTopicTypeLabel(topic.topicType)}
          </span>
          {topic.badge && topic.topicType === "komsas" && topic.genre && (
            <span className="text-[9px] text-white/30">{topic.genre}</span>
          )}
          {topic.zon && (
            <span className="text-[9px] text-white/30">
              {topic.zon.split(" ").slice(0, 2).join(" ")}
            </span>
          )}
        </div>
        <p className="truncate text-sm font-semibold text-white">{topic.label}</p>
      </div>
      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60"
        style={{ color: hubColor }}
      />
    </button>
  );
}

// ─── TOPIC DETAIL VIEWS ───────────────────────────────────────────────────────

function TatabahasaDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {/* Definition */}
      {topic.definition && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>
            Definisi
          </p>
          <p className="text-sm leading-relaxed text-white/80">{topic.definition}</p>
        </div>
      )}

      {/* Subtypes */}
      {topic.subtypes && topic.subtypes.length > 0 && (
        <div>
          <SectionLabel>Jenis-jenis</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topic.subtypes.map((sub) => (
              <div
                key={sub.name}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <p className="mb-1 text-sm font-bold text-white">{sub.name}</p>
                <p className="mb-3 text-xs text-white/45">{sub.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sub.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {topic.commonMistakes && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">
            ⚠ Kesalahan Lazim
          </p>
          <ul className="space-y-2">
            {topic.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <span className="mt-0.5 shrink-0 text-rose-400">×</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* UASA Tips */}
      {topic.uasaTips && (
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-yellow-400">★ Tips UASA</p>
          <ul className="space-y-2">
            {topic.uasaTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Nota Lengkap" />
        <PlaceholderChip label="Kuiz Mini" />
        <PlaceholderChip label="Kad Imbas" />
      </div>
    </div>
  );
}

function KOMSASDetail({ topic, color }: { topic: BMTopic; color: string }) {
  const work = getPremiumKomsasWork(topic.id);

  if (!work) {
    return <LegacyKOMSASDetail topic={topic} color={color} />;
  }

  return <PantunDuaKeratExperience work={work} color={color} />;
}

function LegacyKOMSASDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {topic.genre && (
        <div className="flex items-center gap-2">
          <Badge label={topic.genre} color={color} />
        </div>
      )}

      {topic.sinopsis && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>
            Sinopsis
          </p>
          <p className="text-sm leading-relaxed text-white/70">{topic.sinopsis}</p>
        </div>
      )}

      {topic.tema && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>
            Tema
          </p>
          <p className="text-sm font-medium text-white/80">{topic.tema}</p>
        </div>
      )}

      {[
        { label: "Persoalan", items: topic.persoalan, accent: "#C084FC" },
        { label: "Nilai", items: topic.nilai, accent: "#34D399" },
        { label: "Pengajaran", items: topic.pengajaran, accent: "#FBBF24" },
        { label: "Gaya Bahasa", items: topic.gayaBahasa, accent: "#FB923C" },
      ].map(({ label, items, accent }) =>
        items && items.length > 0 ? (
          <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="mb-3 text-[9px] font-black tracking-wide" style={{ color: accent }}>
              {label}
            </p>
            <ul className="space-y-1.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Soalan Latihan" />
        <PlaceholderChip label="Kuiz KOMSAS" />
      </div>
    </div>
  );
}

function PantunDuaKeratExperience({ work, color }: { work: KomsasWork; color: string }) {
  const isStory = work.kind === "story";
  const featureWord = isStory ? "KISAH" : work.typeLabel.includes("Syair") ? "SYAIR" : "PUISI";

  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden rounded-[1.75rem] border p-5 sm:p-7"
        style={{
          borderColor: `${color}28`,
          background: `linear-gradient(135deg, ${color}20, rgba(255,255,255,0.035) 52%, rgba(5,8,22,0.72))`,
          boxShadow: `0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <div className="pointer-events-none absolute right-4 top-4 text-7xl font-black text-white/[0.035]">
          {featureWord}
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge label={work.typeLabel} color={color} />
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-0.5 text-[9px] font-black tracking-wide text-yellow-300">
              <Zap className="h-3 w-3" />
              Ulang Kaji Pantas
            </span>
          </div>
          <h3 className="font-display text-2xl font-black text-white sm:text-3xl">{work.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{work.intro}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <KomsasHeroStat
              icon={<Target className="h-4 w-4" />}
              label="Tahap Kesukaran"
              value={work.difficulty}
              color="#34D399"
            />
            <KomsasHeroStat
              icon={<Clock className="h-4 w-4" />}
              label="Tempoh Pembelajaran"
              value={work.studyTime}
              color={color}
            />
            <KomsasHeroStat
              icon={<Trophy className="h-4 w-4" />}
              label="Fokus UASA"
              value={bmText(work.examFocus)}
              color="#FBBF24"
            />
          </div>
        </div>
      </section>

      <KomsasKeywordSection work={work} color={color} />

      <Tabs defaultValue="maksud" className="w-full">
        <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2">
          <TabsTrigger
            value="maksud"
            className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <PenTool className="mr-1.5 h-3.5 w-3.5" /> {isStory ? "Cerita" : "Maksud"}
          </TabsTrigger>
          <TabsTrigger
            value="tema"
            className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <Target className="mr-1.5 h-3.5 w-3.5" /> Tema
          </TabsTrigger>
          <TabsTrigger
            value="nilai"
            className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <Heart className="mr-1.5 h-3.5 w-3.5" /> Nilai
          </TabsTrigger>
          <TabsTrigger
            value="exam"
            className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <Flame className="mr-1.5 h-3.5 w-3.5" /> UASA
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <FileQuestion className="mr-1.5 h-3.5 w-3.5" /> Kuiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maksud" className="mt-0 space-y-5">
          {isStory && work.story60 && (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-cyan-300">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold">Cerita Dalam 60 Saat</h3>
              </div>
              <p className="text-sm leading-7 text-white/75">{work.story60}</p>
            </div>
          )}

          {isStory && Array.isArray(work.timeline) && work.timeline.length > 0 && (
            <LearningFolder
              icon={<Map className="h-4 w-4" />}
              title="📚 Jalan Cerita"
              description="Urutan cerita daripada permulaan hingga peleraian"
              accent={color}
            >
              <div className="grid gap-3 md:grid-cols-5">
                {work.timeline.map((item, index) => (
                  <div
                    key={item.stage}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                        style={{
                          background: `${storyTimelineColors[index]}25`,
                          color: storyTimelineColors[index],
                        }}
                      >
                        {index + 1}
                      </span>
                      <p className="text-sm font-bold text-white">{item.stage}</p>
                    </div>
                    <p className="text-xs leading-6 text-white/55">{item.text}</p>
                  </div>
                ))}
              </div>
            </LearningFolder>
          )}

          {isStory && Array.isArray(work.characters) && work.characters.length > 0 && (
            <LearningFolder
              icon={<Heart className="h-4 w-4" />}
              title="👥 Analisis Watak"
              description="Watak, perwatakan, bukti dan kepentingan"
              accent={color}
            >
              <div className="grid gap-3 md:grid-cols-3">
                {work.characters.map((character) => (
                  <div
                    key={character.name}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <div className="mb-3 flex items-center gap-2" style={{ color }}>
                      <Heart className="h-4 w-4" />
                      <p className="font-bold">{character.name}</p>
                    </div>
                    <MiniExplain label="Perwatakan" text={character.personality} accent="#34D399" />
                    <MiniExplain label="Bukti" text={character.evidence} accent="#60A5FA" />
                    <MiniExplain label="Kepentingan" text={character.importance} accent="#FBBF24" />
                  </div>
                ))}
              </div>
            </LearningFolder>
          )}

          {isStory && Array.isArray(work.events) && work.events.length > 0 && (
            <LearningFolder
              icon={<Zap className="h-4 w-4" />}
              title="📖 Peristiwa Penting"
              description="Semua peristiwa utama dalam satu urutan"
              accent={color}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {work.events.map((event, index) => (
                  <AccordionItem
                    key={event.event}
                    value={`event-${index}`}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black"
                          style={{ background: `${color}20`, color }}
                        >
                          E{index + 1}
                        </span>
                        <span className="font-bold text-white/85">{event.event}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <DecoderCell
                          label="Apa berlaku"
                          value={event.whatHappened}
                          accent={color}
                        />
                        <DecoderCell
                          label="Mengapa penting"
                          value={event.whyItMatters}
                          accent="#FBBF24"
                        />
                        <DecoderCell
                          label="Fokus UASA"
                          value={bmText(event.examFocus)}
                          accent="#60A5FA"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </LearningFolder>
          )}

          <LearningFolder
            icon={<BookOpen className="h-4 w-4" />}
            title={isStory ? "📖 Bahagian & Bahasa Mudah" : "📖 Rangkap & Bahasa Mudah"}
            description={
              isStory
                ? "Setiap bahagian cerita bersama maksud mudahnya"
                : "Setiap rangkap bersama bahasa dan maksud mudahnya"
            }
            accent={color}
            defaultOpen
          >
            <Accordion type="single" collapsible className="space-y-3">
              {(Array.isArray(work.decoder) ? work.decoder : []).map((item, index) => (
                <AccordionItem
                  key={item.rangkap}
                  value={`rangkap-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black"
                        style={{ background: `${color}20`, color }}
                      >
                        R{index + 1}
                      </span>
                      <span className="font-bold text-white/85">{item.rangkap}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <DecoderCell
                        label={isStory ? "Bahasa Mudah" : "Bahasa Mudah"}
                        value={item.pantunMudah}
                        accent={color}
                      />
                      <DecoderCell label="Maksud Mudah" value={item.maksud} accent="#60A5FA" />
                      <DecoderCell
                        label={isStory ? "Fokus Bahagian" : "Tema Rangkap"}
                        value={item.tema}
                        accent="#C084FC"
                      />
                      <DecoderCell
                        label="Nilai + Pengajaran"
                        value={`${item.nilai} ${item.pengajaran}`}
                        accent="#34D399"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </LearningFolder>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">Cikgu AcadeMy Terangkan</h3>
            </div>
            <div className="space-y-3">
              {(Array.isArray(work.teacherExplains) ? work.teacherExplains : []).map((explain) => (
                <p
                  key={explain}
                  className="rounded-xl border border-cyan-400/10 bg-black/10 p-3 text-sm leading-7 text-white/70"
                >
                  {explain}
                </p>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tema" className="mt-0 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Tema</SectionLabel>
            <ImportanceBadge level="Sangat Penting" />
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" style={{ color }} />
              <h3 className="font-display text-lg font-bold text-white">
                {work.theme?.title ?? "Tema utama"}
              </h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <DecoderCell
                label="Penjelasan"
                value={work.theme?.explanation ?? "Penerangan tema belum tersedia."}
                accent={color}
              />
              <DecoderCell
                label="Mengapa penting"
                value={work.theme?.whyItMatters ?? "Tema ini membantu murid memahami mesej karya."}
                accent="#FBBF24"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Pengajaran</SectionLabel>
            <ImportanceBadge level="Sangat Penting" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {(Array.isArray(work.lessons) ? work.lessons : []).map((lesson) => (
              <LearningCard
                key={lesson.value}
                icon={<Lightbulb className="h-4 w-4" />}
                item={lesson}
                accent="#FBBF24"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nilai" className="mt-0 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Nilai</SectionLabel>
            <ImportanceBadge level="Sangat Penting" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {(Array.isArray(work.values) ? work.values : []).map((value) => (
              <LearningCard
                key={value.value}
                icon={<Star className="h-4 w-4" />}
                item={value}
                accent="#34D399"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exam" className="mt-0 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Fokus UASA</SectionLabel>
            <ImportanceBadge level="Sangat Penting" />
          </div>
          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-orange-300">
              <Flame className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">Perkara Kerap Ditanya</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Array.isArray(work.examBooster?.frequentPoints)
                ? work.examBooster.frequentPoints
                : []
              ).map((point, index) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400/20 text-[10px] font-black text-orange-300">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/65">{bmText(point)}</p>
                </div>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {(Array.isArray(work.examBooster?.commonQuestions)
              ? work.examBooster.commonQuestions
              : []
            ).map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`common-${index}`}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
              >
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <FileQuestion className="h-4 w-4" style={{ color }} />
                    <span className="font-bold text-white/85">Soalan Lazim {index + 1}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <DecoderCell
                      label="Jawapan Contoh"
                      value={bmText(item.modelAnswer ?? item.answerHint)}
                      accent="#60A5FA"
                    />
                    <DecoderCell
                      label="Penjelasan"
                      value={bmText(
                        item.explanation ??
                          "Jawapan perlu disokong dengan bukti karya dan contoh yang sesuai.",
                      )}
                      accent="#34D399"
                    />
                    <DecoderCell
                      label="Petua UASA"
                      value={bmText(
                        item.examTip ??
                          "Jawab dengan ayat lengkap dan terus kepada kehendak soalan.",
                      )}
                      accent="#FBBF24"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" style={{ color }} />
              <h3 className="font-display text-lg font-bold text-white">Kad Ulang Kaji Pantas</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              <DecoderCell
                label="Tema"
                value={work.revision?.theme ?? "Tema belum tersedia."}
                accent={color}
              />
              <DecoderCell
                label="Nilai"
                value={work.revision?.values ?? "Nilai belum tersedia."}
                accent="#34D399"
              />
              <DecoderCell
                label="Pengajaran"
                value={work.revision?.lessons ?? "Pengajaran belum tersedia."}
                accent="#FBBF24"
              />
              <DecoderCell
                label="Petua UASA"
                value={bmText(work.revision?.examTips ?? "Jawab dengan bukti karya.")}
                accent="#60A5FA"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-0">
          <MiniQuizPlaceholder work={work} color={color} />
        </TabsContent>
      </Tabs>

      <KomsasKssmMasterSections work={work} color={color} />
      <KomsasExamPrepAddOns work={work} color={color} />
    </div>
  );
}

function KomsasHeroStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-black tracking-wide text-white/35">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function DecoderCell({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color: accent }}>
        {label}
      </p>
      <p className="text-sm leading-6 text-white/70">{value}</p>
    </div>
  );
}

function MiniExplain({ label, text, accent }: { label: string; text: string; accent: string }) {
  return (
    <div className="mb-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color: accent }}>
        {label}
      </p>
      <p className="text-xs leading-6 text-white/60">{text}</p>
    </div>
  );
}

const storyTimelineColors = ["#34D399", "#FBBF24", "#FB923C", "#F43F5E", "#60A5FA"];

function LearningCard({
  icon,
  item,
  accent,
}: {
  icon: React.ReactNode;
  item: { value: string; explanation: string; realLife: string; schoolLife?: string };
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2 font-bold" style={{ color: accent }}>
        {icon}
        {item.value}
      </div>
      <MiniExplain label="Penjelasan" text={item.explanation} accent={accent} />
      <MiniExplain label="Contoh kehidupan sebenar" text={item.realLife} accent="#60A5FA" />
      {item.schoolLife && (
        <MiniExplain label="Contoh di sekolah" text={item.schoolLife} accent="#C084FC" />
      )}
    </div>
  );
}

function MiniQuizPlaceholder({ work, color }: { work: KomsasWork; color: string }) {
  const quizItems = Array.isArray(work.miniQuiz) ? work.miniQuiz : [];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-black tracking-wide" style={{ color }}>
            Makmal Kuiz Mini
          </p>
          <h3 className="font-display text-lg font-bold text-white">Ruang kuiz mini tersedia</h3>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 text-right">
          <p className="text-[9px] font-black tracking-wide text-white/30">Markah</p>
          <p className="text-lg font-black text-white">0 / 0</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quizItems.map((quiz, index) => (
          <div
            key={quiz.question}
            className="rounded-2xl border border-white/[0.08] bg-black/10 p-4"
          >
            <div className="mb-2 flex items-center gap-2 font-bold" style={{ color }}>
              {index === 0 ? (
                <FileQuestion className="h-4 w-4" />
              ) : index === 1 ? (
                <Map className="h-4 w-4" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              Ruang Latihan {index + 1}
            </div>
            <p className="text-sm font-semibold leading-6 text-white/75">{bmText(quiz.question)}</p>
            <p className="mt-2 text-xs leading-5 text-white/45">{bmText(quiz.answerHint)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-white/45">
          <span>Penjejak kemajuan</span>
          <span>Akan datang: kuiz, kad imbas, ringkasan video kecerdasan buatan</span>
        </div>
        <Progress value={0} className="h-2 bg-white/10" />
      </div>
    </div>
  );
}

function KomsasKeywordSection({ work, color }: { work: KomsasWork; color: string }) {
  const keywords = getKeywordTags(work);
  if (keywords.length === 0) return null;

  return (
    <section className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sky-300">
          <BookOpen className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Kata Kunci</h3>
        </div>
        <ImportanceBadge level="Sangat Penting" />
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={`${keyword}-${index}`}
            className="rounded-2xl border px-3 py-2 text-sm font-black text-white shadow-sm"
            style={{
              borderColor: `${index % 3 === 0 ? color : index % 3 === 1 ? "#34D399" : "#FBBF24"}55`,
              background: `${index % 3 === 0 ? color : index % 3 === 1 ? "#34D399" : "#FBBF24"}18`,
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}

function ImportanceBadge({ level }: { level: "Sangat Penting" | "Penting" | "Perlu Tahu" }) {
  const styles = {
    "Sangat Penting": { icon: "🔥", color: "#FB923C" },
    Penting: { icon: "⭐", color: "#FBBF24" },
    "Perlu Tahu": { icon: "📌", color: "#60A5FA" },
  }[level];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black tracking-wide"
      style={{
        borderColor: `${styles.color}35`,
        background: `${styles.color}18`,
        color: styles.color,
      }}
    >
      <span>{styles.icon}</span>
      {level}
    </span>
  );
}

function getKeywordTags(work: KomsasWork) {
  const values = Array.isArray(work.values) ? work.values.map((item) => item.value) : [];
  const characters = Array.isArray(work.characters) ? work.characters.map((item) => item.name) : [];
  const masterCharacters = Array.isArray(work.masterCharacters)
    ? work.masterCharacters.map((item) => item.name)
    : [];
  const events = Array.isArray(work.events) ? work.events.map((item) => item.event) : [];
  const themeWords = (work.theme?.title ?? "")
    .split(/\s+/)
    .filter((word) => word.length > 5)
    .slice(0, 3);

  return Array.from(
    new Set([...values, ...characters, ...masterCharacters, ...themeWords, ...events]),
  )
    .filter(Boolean)
    .slice(0, 12);
}

function KomsasKssmMasterSections({ work, color }: { work: KomsasWork; color: string }) {
  const characters = Array.isArray(work.masterCharacters) ? work.masterCharacters : [];
  const relationships = Array.isArray(work.relationshipMap) ? work.relationshipMap : [];
  const plot = Array.isArray(work.detailedPlot) ? work.detailedPlot : [];
  const events = Array.isArray(work.importantEvents) ? work.importantEvents : [];
  const examCharacters = Array.isArray(work.examCharacterAnalysis)
    ? work.examCharacterAnalysis
    : [];
  const issues = Array.isArray(work.issues) ? work.issues : [];
  const uasaQuestions = Array.isArray(work.uasaQuestions) ? work.uasaQuestions : [];
  const focus = work.keyCharacterFocus;
  const memory = work.memory60;

  return (
    <div className="space-y-4">
      <LearningFolder
        icon={<Heart className="h-4 w-4" />}
        title="👥 Analisis Watak & Jalan Cerita"
        description="Watak, hubungan dan perkembangan plot"
        accent={color}
      >
        {characters.length > 0 && (
          <CollapsibleSection
            icon={<Heart className="h-4 w-4" />}
            title="Watak & Perwatakan"
            accent={color}
            badge={<ImportanceBadge level="Penting" />}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {characters.map((character) => (
                <div
                  key={character.name}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2" style={{ color }}>
                      <Heart className="h-4 w-4" />
                      <p className="font-display text-lg font-bold">{character.name}</p>
                    </div>
                    <Badge label="Fail Lengkap" color={color} />
                  </div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {(Array.isArray(character.traits) ? character.traits : []).map((trait) => (
                      <span
                        key={trait}
                        className="rounded-lg border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-200"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <MiniExplain
                      label="Peranan"
                      text={character.role ?? "Peranan belum tersedia."}
                      accent={color}
                    />
                    <MiniExplain
                      label="Bukti Perwatakan"
                      text={character.evidence ?? "Bukti umum daripada karya."}
                      accent="#60A5FA"
                    />
                    <MiniExplain
                      label="Hubungan"
                      text={character.relationships ?? "Hubungan watak membantu mesej karya."}
                      accent="#C084FC"
                    />
                    <MiniExplain
                      label="Kepentingan"
                      text={
                        character.importance ?? "Watak ini membantu membawa tema dan pengajaran."
                      }
                      accent="#FBBF24"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {relationships.length > 0 && (
          <CollapsibleSection
            icon={<Heart className="h-4 w-4" />}
            title="Hubungan Watak"
            accent={color}
          >
            <div className="grid gap-3 md:grid-cols-3">
              {relationships.map((relationship) => (
                <div
                  key={`${relationship.from}-${relationship.to}-${relationship.relation}`}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="mb-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 text-center text-sm font-black text-white">
                    {relationship.from} <span style={{ color }}>{relationship.relation}</span>{" "}
                    {relationship.to}
                  </div>
                  <p className="text-xs leading-6 text-white/55">{relationship.explanation}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {plot.length > 0 && (
          <CollapsibleSection
            icon={<Map className="h-4 w-4" />}
            title="Jalan Cerita Lengkap"
            accent={color}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {plot.map((item, index) => (
                <AccordionItem
                  key={item.stage}
                  value={`plot-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black"
                        style={{
                          background: `${storyTimelineColors[index] ?? color}22`,
                          color: storyTimelineColors[index] ?? color,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="font-bold text-white/85">{item.stage}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      <DecoderCell
                        label="Apa berlaku"
                        value={item.what ?? "Isi belum tersedia."}
                        accent={color}
                      />
                      <DecoderCell
                        label="Mengapa berlaku"
                        value={item.why ?? "Sebab belum tersedia."}
                        accent="#FBBF24"
                      />
                      <DecoderCell
                        label="Kesan kepada cerita"
                        value={item.effect ?? "Kesan belum tersedia."}
                        accent="#60A5FA"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Brain className="h-4 w-4" />}
        title="💭 Tema, Persoalan & Peristiwa"
        description="Maksud karya, persoalan dan peristiwa yang membina cerita"
        accent="#A78BFA"
      >
        {work.story90 && (
          <CollapsibleSection
            icon={<Clapperboard className="h-5 w-5" />}
            title="Cerita Dalam 90 Saat"
            accent="#E879F9"
          >
            <p className="text-sm leading-7 text-white/75">{work.story90}</p>
          </CollapsibleSection>
        )}

        {work.retelling3Min && (
          <CollapsibleSection
            icon={<BookOpen className="h-5 w-5" />}
            title={work.kind === "story" ? "Cerita Dalam 3 Minit" : "Karya Dalam 3 Minit"}
            accent="#22D3EE"
          >
            <p className="text-sm leading-7 text-white/75">{work.retelling3Min}</p>
          </CollapsibleSection>
        )}

        {issues.length > 0 && (
          <CollapsibleSection icon={<Brain className="h-4 w-4" />} title="Persoalan" accent={color}>
            <div className="grid gap-3 md:grid-cols-2">
              {issues.map((issue) => (
                <div
                  key={issue.issue}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="mb-2 flex items-center gap-2" style={{ color }}>
                    <Brain className="h-4 w-4" />
                    <p className="font-bold text-white">{issue.issue}</p>
                  </div>
                  <p className="text-sm leading-6 text-white/60">{issue.explanation}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {events.length > 0 && (
          <CollapsibleSection
            icon={<Zap className="h-4 w-4" />}
            title="Peristiwa Penting"
            accent={color}
            badge={<ImportanceBadge level="Penting" />}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {events.map((event, index) => (
                <div
                  key={`${event.event}-${index}`}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-xl text-[10px] font-black"
                      style={{ background: `${color}20`, color }}
                    >
                      {index + 1}
                    </span>
                    <p className="font-bold text-white">{event.event}</p>
                  </div>
                  <MiniExplain
                    label="Apa berlaku"
                    text={event.what ?? "Peristiwa utama karya."}
                    accent={color}
                  />
                  <MiniExplain
                    label="Mengapa penting"
                    text={event.whyImportant ?? "Peristiwa ini membantu membina tema."}
                    accent="#FBBF24"
                  />
                  <MiniExplain
                    label="Soalan mungkin keluar"
                    text={event.possibleQuestion ?? "Jelaskan kepentingan peristiwa ini."}
                    accent="#60A5FA"
                  />
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {focus && (
          <CollapsibleSection
            icon={<Target className="h-5 w-5" />}
            title={`Watak Paling Penting: ${focus.name}`}
            accent="#E879F9"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <DecoderCell
                label="Mengapa penting"
                value={focus.whyMatters ?? "Watak ini membawa mesej utama karya."}
                accent="#F0ABFC"
              />
              <DecoderCell
                label="Tema"
                value={focus.supportsTheme ?? "Menyokong tema utama."}
                accent={color}
              />
              <DecoderCell
                label="Persoalan"
                value={focus.supportsIssues ?? "Membantu persoalan karya."}
                accent="#60A5FA"
              />
              <DecoderCell
                label="Nilai & Pengajaran"
                value={`${focus.supportsValues ?? "Menonjolkan nilai."} ${focus.supportsLessons ?? "Menguatkan pengajaran."}`}
                accent="#FBBF24"
              />
            </div>
          </CollapsibleSection>
        )}

        {work.authorPurpose && (
          <CollapsibleSection
            icon={<Brain className="h-5 w-5" />}
            title="Mengapa Cerita Ini Ditulis"
            accent="#A78BFA"
          >
            <p className="text-sm leading-7 text-white/75">{work.authorPurpose}</p>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Target className="h-4 w-4" />}
        title="🎯 Fokus UASA"
        description="Soalan, analisis watak dan bahan hafalan peperiksaan"
        accent="#FBBF24"
      >
        {uasaQuestions.length > 0 && (
          <CollapsibleSection
            icon={<GraduationCap className="h-4 w-4" />}
            title="Soalan Popular UASA - Skema Penuh"
            accent={color}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {uasaQuestions.map((item, index) => (
                <AccordionItem
                  key={`${item.type}-${item.question}`}
                  value={`uasa-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span
                        className="rounded-lg px-2 py-1 text-[10px] font-black tracking-wide"
                        style={{ background: `${color}20`, color }}
                      >
                        {item.type === "MCQ" ? "Aneka Pilihan" : item.type}
                      </span>
                      <span className="font-bold text-white/85">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <DecoderCell
                        label="Skema Jawapan"
                        value={item.answer ?? "Jawapan belum tersedia."}
                        accent="#34D399"
                      />
                      <DecoderCell
                        label="Cara fikir"
                        value={item.explanation ?? "Jawab dengan bukti karya dan ayat lengkap."}
                        accent="#60A5FA"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CollapsibleSection>
        )}

        {examCharacters.length > 0 && (
          <CollapsibleSection
            icon={<FileQuestion className="h-4 w-4" />}
            title="Analisis Watak UASA"
            accent={color}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {examCharacters.map((item, index) => (
                <AccordionItem
                  key={`${item.character}-${item.trait}`}
                  value={`exam-char-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3">
                      <FileQuestion className="h-4 w-4" style={{ color }} />
                      <span className="font-bold text-white/85">
                        {item.character}: {item.trait}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      <DecoderCell label="Watak" value={item.character} accent={color} />
                      <DecoderCell
                        label="Bukti"
                        value={item.evidence ?? "Bukti umum daripada karya."}
                        accent="#60A5FA"
                      />
                      <DecoderCell
                        label="Jawapan Contoh"
                        value={item.modelAnswer ?? "Jawab dengan watak, perwatakan dan bukti."}
                        accent="#34D399"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CollapsibleSection>
        )}

        {memory && (
          <CollapsibleSection
            icon={<Zap className="h-5 w-5" />}
            title="Hafal Dalam 60 Saat"
            accent={color}
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <MemoryChip label="Tema" value={memory.theme ?? "Tema utama"} color={color} />
              <MemoryChip
                label="Persoalan"
                value={memory.issues ?? "Persoalan utama"}
                color="#60A5FA"
              />
              <MemoryChip
                label="Watak Utama"
                value={memory.mainCharacters ?? "Watak utama"}
                color="#C084FC"
              />
              <MemoryChip
                label="Peristiwa Penting"
                value={memory.importantEvents ?? "Peristiwa utama"}
                color="#FB923C"
              />
              <MemoryChip label="Nilai" value={memory.values ?? "Nilai utama"} color="#34D399" />
              <MemoryChip
                label="Pengajaran"
                value={memory.lessons ?? "Pengajaran utama"}
                color="#FBBF24"
              />
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection
          icon={<MessageCircle className="h-5 w-5" />}
          title="🤖 Cikgu AcadeMY Terangkan"
          accent={color}
        >
          {work.intro && (
            <p className="mb-3 text-sm italic leading-7 text-white/75">{work.intro}</p>
          )}
          <div className="mb-3 space-y-2">
            <MiniExplain
              label="Dalam kata mudah, tema ialah"
              text={memory?.theme ?? work.revision?.theme ?? "tema utama karya ini."}
              accent={color}
            />
            <MiniExplain
              label="Nilai yang perlu kamu faham"
              text={memory?.values ?? work.revision?.values ?? "nilai murni dalam karya ini."}
              accent="#34D399"
            />
            <MiniExplain
              label="Pengajaran yang boleh diamalkan"
              text={memory?.lessons ?? work.revision?.lessons ?? "pengajaran daripada karya ini."}
              accent="#FBBF24"
            />
          </div>
          <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/8 px-4 py-3">
            <p className="mb-1 text-[10px] font-black tracking-wide text-emerald-300">
              ⭐ Petua Cikgu
            </p>
            <p className="text-sm text-white/75">
              {bmText(work.examFocus) || "Jawab dengan bukti karya dan ayat yang lengkap."}
            </p>
          </div>
        </CollapsibleSection>
      </LearningFolder>
    </div>
  );
}

function KomsasExamPrepAddOns({ work, color }: { work: KomsasWork; color: string }) {
  const examinerQuestions = getExaminerQuestions(work);
  const survival = getSurvivalBullets(work);
  const spotterItems = getSpotterItems(work);
  const reflections = getReflectionQuestions(work);
  const relationships = getRelationshipCards(work);
  const mistakes = getCommonMistakes(work);

  return (
    <div className="space-y-4">
      <LearningFolder
        icon={<GraduationCap className="h-4 w-4" />}
        title="🎯 Latihan & Skema UASA"
        description="Soalan popular, cara pemeriksa berfikir dan jawapan lengkap"
        accent={color}
      >
        {spotterItems.length > 0 && (
          <CollapsibleSection
            icon={<Target className="h-4 w-4" />}
            title="Soalan Popular UASA"
            accent={color}
          >
            <div className="grid gap-3 md:grid-cols-4">
              {spotterItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <p className="mb-2 text-sm font-bold text-white">{item.label}</p>
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-black tracking-wide"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.frequency}
                  </span>
                  <p className="mt-3 text-xs leading-5 text-white/45">{item.focus}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {examinerQuestions.length > 0 && (
          <CollapsibleSection
            icon={<GraduationCap className="h-5 w-5" />}
            title="Jika Saya Pemeriksa"
            accent="#38BDF8"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {examinerQuestions.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`examiner-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/10"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3">
                      <FileQuestion className="h-4 w-4" style={{ color }} />
                      <span className="font-bold text-white/85">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <DecoderCell
                      label="Tekan untuk lihat jawapan"
                      value={bmText(
                        item.modelAnswer ?? item.answerHint ?? "Jawapan belum tersedia.",
                      )}
                      accent="#60A5FA"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CollapsibleSection>
        )}

        {examinerQuestions.length > 0 && (
          <CollapsibleSection
            icon={<FileQuestion className="h-4 w-4" />}
            title="Jawapan Skema Penuh"
            accent={color}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {examinerQuestions.map((item) => (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <div className="border-b border-white/[0.06] p-4">
                    <p className="text-sm font-bold leading-6 text-white">{item.question}</p>
                  </div>
                  <div className="grid gap-0 sm:grid-cols-2">
                    <div className="border-b border-rose-400/10 bg-rose-400/8 p-4 sm:border-b-0 sm:border-r sm:border-rose-400/10">
                      <div className="mb-2 flex items-center gap-2 text-rose-300">
                        <XCircle className="h-4 w-4" />
                        <p className="text-xs font-black tracking-wide">Jawapan Lemah</p>
                      </div>
                      <p className="text-sm text-white/65">{getWeakAnswer(item)}</p>
                    </div>
                    <div className="bg-emerald-400/8 p-4">
                      <div className="mb-2 flex items-center gap-2 text-emerald-300">
                        <CheckCircle className="h-4 w-4" />
                        <p className="text-xs font-black tracking-wide">Jawapan Skor Penuh</p>
                      </div>
                      <p className="text-sm leading-6 text-white/70">
                        {item.modelAnswer ?? item.answerHint}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-emerald-100/55">
                        {item.examTip ??
                          "Tambah bukti atau contoh supaya jawapan tidak terlalu umum."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Zap className="h-4 w-4" />}
        title="⚡ Ulang Kaji Pantas"
        description="Ringkasan, refleksi, hafalan dan cabaran KBAT"
        accent="#FBBF24"
      >
        <CollapsibleSection
          icon={<Clapperboard className="h-5 w-5" />}
          title="Ringkasan Cerita"
          accent="#E879F9"
        >
          <p className="text-sm leading-7 text-white/75">{getTrailerSummary(work)}</p>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<Globe2 className="h-4 w-4" />}
          title="Jika Ini Berlaku Kepada Anda"
          accent="#22D3EE"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {reflections.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <Globe2 className="h-4 w-4" />
                  <p className="text-[10px] font-black tracking-wide">Renung</p>
                </div>
                <p className="text-sm leading-6 text-white/70">{question}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<Zap className="h-5 w-5" />}
          title="Hafal Dalam 60 Saat"
          accent="#FBBF24"
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <MemoryChip
              label="Tema"
              value={work.revision?.theme ?? "Tema belum tersedia."}
              color={color}
            />
            <MemoryChip
              label="Nilai"
              value={work.revision?.values ?? "Nilai belum tersedia."}
              color="#34D399"
            />
            <MemoryChip
              label="Pengajaran"
              value={work.revision?.lessons ?? "Pengajaran belum tersedia."}
              color="#FBBF24"
            />
            <MemoryChip
              label={work.kind === "story" ? "Watak" : "Fokus"}
              value={getMemoryCharacter(work)}
              color="#C084FC"
            />
            <MemoryChip label="Peristiwa Penting" value={getMemoryEvent(work)} color="#60A5FA" />
            <MemoryChip
              label="Peringatan UASA"
              value={bmText(work.revision?.examTips ?? "Jawab dengan bukti karya.")}
              color="#FB923C"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<Brain className="h-5 w-5" />}
          title="Cabaran KBAT"
          accent="#A78BFA"
        >
          <DecoderCell
            label={getKbatChallenge(work).question}
            value={getKbatChallenge(work).answer}
            accent="#C084FC"
          />
        </CollapsibleSection>
      </LearningFolder>

      <LearningFolder
        icon={<CheckCircle className="h-4 w-4" />}
        title="✅ Semakan Akhir"
        description="Hubungan, kesalahan lazim dan persediaan sebelum peperiksaan"
        accent="#34D399"
      >
        {work.kind === "story" && relationships.length > 0 && (
          <CollapsibleSection
            icon={<Heart className="h-4 w-4" />}
            title="Hubungan Watak"
            accent={color}
          >
            <div className="grid gap-3 md:grid-cols-3">
              {relationships.map((relationship) => (
                <div
                  key={relationship}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center"
                >
                  <p className="text-sm font-black text-white">{relationship}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection
          icon={<XCircle className="h-4 w-4" />}
          title="Kesalahan Murid Yang Selalu Berlaku"
          accent="#FB7185"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {mistakes.map((mistake) => (
              <div
                key={mistake.wrong}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <p className="mb-2 text-sm font-bold text-rose-300">{mistake.wrong}</p>
                <p className="text-xs leading-5 text-white/45">{mistake.fix}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<Target className="h-5 w-5" />}
          title="Sebelum Masuk Dewan"
          accent={color}
        >
          <div className="grid gap-2 sm:grid-cols-5">
            {survival.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/[0.08] bg-black/10 p-3 text-xs font-bold leading-5 text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </LearningFolder>
    </div>
  );
}

function MemoryChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>
        {label}
      </p>
      <p className="text-xs leading-5 text-white/70">{value}</p>
    </div>
  );
}

function getSpotterItems(work: KomsasWork) {
  const high = { frequency: "Sangat Kerap Ditanya", color: "#34D399" };
  const mid = { frequency: "Kadang-kadang Ditanya", color: "#FBBF24" };
  const low = { frequency: "Jarang Ditanya", color: "#F43F5E" };
  const revision = work.revision;
  const base = [
    { label: "Tema", focus: revision?.theme ?? "Tema utama karya.", ...high },
    { label: "Nilai", focus: revision?.values ?? "Nilai penting dalam karya.", ...high },
    {
      label: "Pengajaran",
      focus: revision?.lessons ?? "Pengajaran yang boleh diamalkan.",
      ...high,
    },
    {
      label: work.kind === "story" ? "Watak dan Perwatakan" : "Maksud Rangkap",
      focus: work.kind === "story" ? getMemoryCharacter(work) : "Bahasa mudah dan maksud tersirat.",
      ...mid,
    },
  ];
  return work.kind === "story"
    ? [
        ...base,
        { label: "Peristiwa Penting", focus: getMemoryEvent(work), ...mid },
        { label: "Latar / Konflik", focus: "Fahami punca konflik dan peleraian.", ...low },
      ]
    : [
        ...base,
        { label: "Gaya Bahasa", focus: "Fokus simbol, metafora atau perbandingan utama.", ...low },
      ];
}

function getExaminerQuestions(work: KomsasWork): KomsasExamQuestion[] {
  const revision = work.revision;
  const extras =
    work.kind === "story"
      ? [
          makeExamQuestion(
            "Apakah konflik utama yang berlaku dalam karya ini?",
            `Konflik utama berkaitan ${(work.examFocus ?? "peristiwa penting").toLowerCase()} dan perlu dihuraikan dengan peristiwa penting.`,
            "Konflik ialah masalah yang menggerakkan cerita.",
            "Sebut punca konflik dan kesannya.",
          ),
          makeExamQuestion(
            "Bagaimanakah karya ini boleh dikaitkan dengan kehidupan murid?",
            `${work.title ?? "Karya ini"} mengajar murid supaya mengamalkan pengajaran seperti ${(revision?.lessons ?? "nilai baik").toLowerCase()}.`,
            "Soalan KBAT mahu kaitan dengan diri murid.",
            "Berikan contoh sekolah atau keluarga.",
          ),
        ]
      : [
          makeExamQuestion(
            "Apakah maksud rangkap penting dalam karya ini?",
            `Rangkap penting menyampaikan ${(work.theme?.title ?? "mesej utama").toLowerCase()} secara mudah dan dekat dengan kehidupan.`,
            "Puisi perlu difahami melalui maksud tersirat.",
            "Jangan salin semula rangkap.",
          ),
          makeExamQuestion(
            "Bagaimanakah karya ini sesuai untuk remaja?",
            `${work.title ?? "Karya ini"} sesuai kerana mengajar remaja tentang ${(revision?.values ?? "nilai murni").toLowerCase()}.`,
            "KBAT mahu hubungan dengan kehidupan murid.",
            "Beri contoh sekolah.",
          ),
        ];
  const baseQuestions = Array.isArray(work.examBooster?.commonQuestions)
    ? work.examBooster.commonQuestions
    : [];
  return [...baseQuestions, ...extras].filter((item) => item?.question).slice(0, 5);
}

function makeExamQuestion(
  question: string,
  modelAnswer: string,
  explanation: string,
  examTip: string,
): KomsasExamQuestion {
  return { question, answerHint: modelAnswer, modelAnswer, explanation, examTip };
}

function getWeakAnswer(item: KomsasExamQuestion) {
  if (/nilai/i.test(item.question)) return "Kasih sayang.";
  if (/tema/i.test(item.question)) return "Tema yang baik.";
  if (/pengajaran/i.test(item.question)) return "Kita perlu baik.";
  return "Jawapan terlalu pendek.";
}

function getTrailerSummary(work: KomsasWork) {
  if (typeof work.movieTrailer === "string" && work.movieTrailer.trim()) {
    return work.movieTrailer;
  }
  if (typeof work.story60 === "string" && work.story60.trim()) {
    return work.story60.split(".").slice(0, 3).join(". ").replace(/\s+/g, " ").trim() + ".";
  }
  return `${work.title ?? "Karya ini"} membawa mesej yang nampak ringkas tetapi kuat. Di sebalik bahasa yang padat, murid diajak memahami ${(work.theme?.title ?? "mesej utama").toLowerCase()}. Adakah anda hanya mahu hafal, atau benar-benar faham mesejnya sebelum UASA?`;
}

function getReflectionQuestions(work: KomsasWork) {
  const title = work.title ?? "karya ini";
  if (work.kind === "story") {
    return [
      `Jika anda berada dalam situasi watak utama ${title}, apakah tindakan paling matang?`,
      `Pernahkah anda melihat konflik seperti ini berlaku di sekolah atau rumah?`,
      `Apakah satu pengajaran karya ini yang anda boleh amalkan minggu ini?`,
    ];
  }
  return [
    `Pernah tak anda berada dalam situasi yang sama dengan mesej ${title}?`,
    `Nilai manakah yang paling susah anda amalkan: ${work.revision?.values ?? "nilai dalam karya"}?`,
    `Bagaimanakah karya ini boleh mengubah cara anda bercakap atau bertindak?`,
  ];
}

function getMemoryCharacter(work: KomsasWork) {
  return (
    (Array.isArray(work.characters) ? work.characters : [])
      .map((c) => c?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ") || (work.kind === "poem" ? "Aku lirik / mesej penyair" : "Watak utama")
  );
}

function getMemoryEvent(work: KomsasWork) {
  const events = Array.isArray(work.events) ? work.events : [];
  const decoder = Array.isArray(work.decoder) ? work.decoder : [];
  return events[0]?.event || decoder[0]?.tema || "Fahami maksud utama karya.";
}

function getKbatChallenge(work: KomsasWork) {
  const title = work.title ?? "karya ini";
  if (work.kind === "story") {
    return {
      question: `Jika konflik dalam ${title} diselesaikan lebih awal, adakah pengajaran karya masih kuat? Mengapa?`,
      answer: `Ya, pengajaran masih kuat kerana murid tetap dapat melihat kepentingan ${(work.revision?.lessons ?? "nilai baik").toLowerCase()}. Namun, konflik yang berlaku menjadikan mesej lebih jelas dan mudah diingati.`,
    };
  }
  return {
    question: `Adakah mesej ${title} masih relevan kepada murid zaman media sosial? Mengapa?`,
    answer: `Ya, mesejnya masih relevan kerana murid masih perlu mengamalkan ${(work.revision?.values ?? "nilai murni").toLowerCase()} dalam percakapan, tindakan dan keputusan harian.`,
  };
}

function getRelationshipCards(work: KomsasWork) {
  const names = (Array.isArray(work.characters) ? work.characters : [])
    .map((c) => c?.name)
    .filter(Boolean);
  if (names.length < 2) return [];
  return [
    `${names[0]} ↔ ${names[1]}`,
    names[2] ? `${names[2]} ↔ ${names[0]}` : `${names[1]} ↔ konflik utama`,
    `Komuniti / keluarga ↔ ${names[0]}`,
  ];
}

function getCommonMistakes(work: KomsasWork) {
  if (work.id === "cerpen-oren") {
    return [
      {
        wrong: "Menganggap Kelabu ialah watak jahat.",
        fix: "Betulkan: Kelabu bukan jahat. Kelabu hanya kucing baharu yang manja; konflik berlaku kerana perhatian keluarga tidak seimbang.",
      },
      {
        wrong: "Menganggap Oren marah tanpa sebab.",
        fix: "Betulkan: Oren terasa tersisih kerana layanan keluarga berubah selepas Kelabu hadir.",
      },
      {
        wrong: "Tidak memahami maksud penyesalan Ayah.",
        fix: "Betulkan: Penyesalan Ayah menunjukkan kesedaran bahawa kasih sayang terhadap Oren telah diabaikan.",
      },
    ];
  }
  if (work.id === "cerpen-kuih-bakul") {
    return [
      {
        wrong: "Menyamakan tema dengan pengajaran.",
        fix: "Betulkan: tema ialah idea besar, iaitu kebenaran dan kasih sayang keluarga. Pengajaran ialah ayat tindakan seperti kita hendaklah bercakap benar.",
      },
      {
        wrong: "Menganggap Lim Meng punca sebenar masalah.",
        fix: "Betulkan: Lim Meng ialah mangsa tuduhan. Punca sebenar berkaitan perbuatan Lim Foong dan prasangka Lim Pooi.",
      },
      {
        wrong: "Tidak memahami peranan Sim Pau.",
        fix: "Betulkan: Sim Pau ialah watak penting yang mendedahkan kebenaran dan membantu menyatukan semula keluarga.",
      },
    ];
  }
  return [
    {
      wrong: "Menyamakan tema dengan pengajaran.",
      fix: `Betulkan: tema ialah idea besar seperti "${work.revision?.theme ?? "tema utama"}". Pengajaran ialah ayat tindakan.`,
    },
    {
      wrong: "Menulis nilai tanpa contoh.",
      fix: "Betulkan: tulis nilai + bukti ringkas daripada karya.",
    },
    {
      wrong:
        work.kind === "story"
          ? "Menulis watak tanpa perwatakan."
          : "Menyalin maksud tanpa huraian.",
      fix:
        work.kind === "story"
          ? "Betulkan: nyatakan watak, sifat dan bukti."
          : "Betulkan: jelaskan maksud dengan bahasa sendiri.",
    },
  ];
}

function getSurvivalBullets(work: KomsasWork) {
  return [
    "✓ Hafal tema",
    "✓ Hafal 3 nilai",
    "✓ Hafal 3 pengajaran",
    work.kind === "story" ? "✓ Ingat klimaks" : "✓ Faham maksud rangkap",
    work.kind === "story" ? "✓ Kenal watak utama" : "✓ Ingat simbol utama",
  ];
}

function NovelDetail({ topic, color }: { topic: BMTopic; color: string }) {
  const premiumWork = getPremiumKomsasWork(topic.id);
  if (premiumWork) {
    return <PantunDuaKeratExperience work={premiumWork} color={color} />;
  }

  return (
    <div className="space-y-6">
      {topic.zon && (
        <div className="flex items-center gap-2">
          <Badge label={topic.zon} color={color} />
          {topic.penulis && <span className="text-xs text-white/40">Penulis: {topic.penulis}</span>}
        </div>
      )}

      {topic.sinopsis && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>
            Sinopsis
          </p>
          <p className="text-sm leading-relaxed text-white/70">{topic.sinopsis}</p>
        </div>
      )}

      {topic.watak && topic.watak.length > 0 && (
        <div>
          <SectionLabel>Watak & Perwatakan</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {topic.watak.map((w) => (
              <div
                key={w.nama}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-bold text-white">{w.nama}</p>
                  <span className="text-[9px] font-bold text-white/30">{w.peranan}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {w.perwatakan.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/55"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {[
        { label: "Tema", value: topic.tema ? [topic.tema] : undefined, accent: color },
        { label: "Persoalan", value: topic.persoalan, accent: "#C084FC" },
        { label: "Nilai", value: topic.nilai, accent: "#34D399" },
        { label: "Pengajaran", value: topic.pengajaran, accent: "#FBBF24" },
      ].map(({ label, value, accent }) =>
        value && value.length > 0 ? (
          <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="mb-3 text-[9px] font-black tracking-wide" style={{ color: accent }}>
              {label}
            </p>
            <ul className="space-y-1.5">
              {value.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Soalan UASA" />
        <PlaceholderChip label="Kuiz Novel" />
      </div>
    </div>
  );
}

function PemahamanDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-4">
      <LearningFolder
        icon={<BookOpen className="h-4 w-4" />}
        title="📖 Faham & Ikut Langkah"
        description="Pengenalan topik dan urutan menjawab"
        accent={color}
        defaultOpen
      >
        {topic.description && (
          <CollapsibleSection
            icon={<BookOpen className="h-4 w-4" />}
            title="Pengenalan"
            accent={color}
          >
            <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
          </CollapsibleSection>
        )}

        {topic.steps && topic.steps.length > 0 && (
          <CollapsibleSection
            icon={<Map className="h-4 w-4" />}
            title="Langkah-langkah"
            accent={color}
          >
            <div className="space-y-2.5">
              {topic.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                    style={{ background: `${color}25`, color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Target className="h-4 w-4" />}
        title="🎯 Isi Penting & UASA"
        description="Perkara wajib tahu dan fokus peperiksaan"
        accent="#FBBF24"
      >
        {topic.keyPoints && topic.keyPoints.length > 0 && (
          <CollapsibleSection
            icon={<Star className="h-4 w-4" />}
            title="⭐ Wajib Hafal — Perkara Utama"
            accent="#818CF8"
          >
            <ul className="space-y-2">
              {topic.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#818CF8]" />
                  {pt}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {topic.uasaTips && (
          <CollapsibleSection
            icon={<Trophy className="h-4 w-4" />}
            title="🎯 Fokus UASA — Tips UASA"
            accent="#FBBF24"
          >
            <ul className="space-y-2">
              {topic.uasaTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Zap className="h-4 w-4" />}
        title="⚡ Ulang Kaji Pantas"
        description="Penerangan cikgu dan ringkasan satu minit"
        accent="#34D399"
      >
        {(topic.description || (topic.steps && topic.steps.length > 0)) && (
          <CollapsibleSection
            icon={<MessageCircle className="h-4 w-4" />}
            title="🤖 Cikgu AcadeMY Terangkan"
            accent={color}
          >
            {topic.description && (
              <p className="mb-3 text-sm italic leading-7 text-white/75">{topic.description}</p>
            )}
            {topic.steps && topic.steps.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="mb-1 text-[10px] font-black tracking-wide" style={{ color }}>
                  Mula dengan langkah pertama
                </p>
                <p className="text-sm text-white/75">{topic.steps[0]}</p>
              </div>
            )}
          </CollapsibleSection>
        )}

        {((topic.keyPoints && topic.keyPoints.length > 0) || topic.uasaTips) && (
          <CollapsibleSection
            icon={<Lightbulb className="h-4 w-4" />}
            title="📝 Ringkasan 1 Minit"
            accent="#34D399"
          >
            <ul className="space-y-2">
              {topic.keyPoints?.slice(0, 2).map((pt, i) => (
                <li key={`kp-${i}`} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  {pt}
                </li>
              ))}
              {topic.uasaTips?.slice(0, 1).map((tip, i) => (
                <li key={`tip-${i}`} className="flex items-start gap-2 text-sm text-white/70">
                  <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <div className="flex gap-3">
        <PlaceholderChip label="Petikan Latihan" />
        <PlaceholderChip label="Soalan Contoh" />
      </div>
    </div>
  );
}

// ─── RANGKA RINGKASAN MARKAH TINGGI ──────────────────────────────────────────

const RANGKA_KESALAHAN = [
  "Menulis pendahuluan",
  "Menulis penutup",
  "Menulis melebihi 100 patah perkataan",
  "Mengambil isi yang tidak berkaitan dengan kata kunci",
  "Tidak menggunakan penanda wacana",
  "Menyalin keseluruhan petikan",
];

const HAFALAN_LANGKAH = [
  "Kata Kunci",
  "Cari Isi",
  "Susun Isi",
  "Tulis Dalam Satu Perenggan",
  "Semak 100 Patah Perkataan",
  "Semak Ejaan",
];

const RANGKA_ISI_CUACA = [
  "Membahayakan kesihatan manusia",
  "Menjejaskan aktiviti harian",
  "Mengurangkan sumber air",
  "Merosakkan tanaman pertanian",
  "Meningkatkan risiko kebakaran",
  "Menyebabkan strok haba",
];

const RANGKA_JAWAPAN_CUACA = [
  { pw: "Antara", isi: "kesan cuaca panas ialah membahayakan kesihatan manusia." },
  { pw: "Selain itu,", isi: "aktiviti harian turut terjejas." },
  { pw: "Seterusnya,", isi: "sumber air semakin berkurangan." },
  { pw: "Di samping itu,", isi: "tanaman pertanian boleh rosak." },
  { pw: "Tambahan pula,", isi: "risiko kebakaran meningkat." },
  { pw: "Akhir sekali,", isi: "cuaca panas boleh menyebabkan strok haba." },
];

function ExamKeyword({ children, color = "#FBBF24" }: { children: React.ReactNode; color?: string }) {
  return <span className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black" style={{ color, borderColor: `${color}35`, background: `${color}12` }}>{children}</span>;
}

function ExamplePair({ wrong, right }: { wrong: string; right: string }) {
  return <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.055] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-rose-300">Contoh Salah</p><p className="mt-2 text-sm leading-6 text-white/65">{wrong}</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.055] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Contoh Betul</p><p className="mt-2 text-sm leading-6 text-white/75">{right}</p></div></div>;
}

function QuickScore({ items }: { items: string[] }) {
  return <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">Skor Pantas · Apa perlu diingat?</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(item => <div key={item} className="flex items-start gap-2 text-sm text-white/70"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}</div>)}</div></div>;
}

function ErrorCallout({ items }: { items: string[] }) {
  return <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.045] p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-300">Kesalahan Lazim</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(item => <div key={item} className="flex items-start gap-2 text-sm text-white/65"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />{item}</div>)}</div></div>;
}

function NextStudy({ title }: { title: string }) {
  return <div className="border-y border-white/[0.07] py-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Seterusnya</p><div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-indigo-300/15 bg-indigo-300/[0.05] px-4 py-3"><span className="flex items-center gap-2 text-sm font-bold text-indigo-100"><BookOpen className="h-4 w-4 text-indigo-300" />{title}</span><ArrowRight className="h-4 w-4 text-indigo-300" /></div></div>;
}

const GOLDEN_RINGKASAN_STEPS = [
  { title: "Baca soalan", detail: "Baca arahan sehingga jelas perkara yang diminta.", keyword: "Soalan", icon: BookOpen, color: "#60A5FA" },
  { title: "Kenal pasti kata kunci", detail: "Tentukan perkataan yang menjadi fokus jawapan.", keyword: "Kata kunci", icon: Target, color: "#FBBF24" },
  { title: "Gariskan isi penting", detail: "Pilih enam isi yang tepat dan berkaitan sahaja.", keyword: "Isi penting", icon: PenTool, color: "#34D399" },
  { title: "Susun isi menggunakan penanda wacana", detail: "Hubungkan isi supaya jawapan lancar dan teratur.", keyword: "Penanda wacana", icon: MessageCircle, color: "#C084FC" },
  { title: "Semak had perkataan", detail: "Pastikan jawapan tidak melebihi had yang diberikan.", keyword: "100 patah perkataan", icon: Clock, color: "#FB923C" },
  { title: "Semak jawapan", detail: "Periksa isi, ayat sendiri, ejaan dan tanda baca.", keyword: "Markah penuh", icon: CheckCircle2, color: "#F472B6" },
] as const;

function RangkaRingkasanDetail({ color }: { color: string }) {
  return <div className="space-y-10">
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/20 bg-[#15130d] p-5 sm:p-7"><div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(251,191,36,0.16),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(129,140,248,0.1),transparent_42%)]" /><div className="relative"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.1] text-amber-300"><Trophy className="h-6 w-6" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Golden Standard</p><h2 className="mt-1 font-display text-2xl font-black text-white">Formula Markah Penuh</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/60">Enam langkah ringkas untuk membina jawapan Ringkasan yang tepat, tersusun dan mudah disemak.</p></div></div><div className="mt-5 flex flex-wrap gap-2"><ExamKeyword>Kata kunci</ExamKeyword><ExamKeyword color="#34D399">Isi penting</ExamKeyword><ExamKeyword color="#C084FC">Penanda wacana</ExamKeyword><ExamKeyword color="#60A5FA">Ayat sendiri</ExamKeyword><ExamKeyword color="#FB923C">100 patah perkataan</ExamKeyword></div></div></section>

    <section className="space-y-6"><div className="mx-auto max-w-2xl space-y-2">{GOLDEN_RINGKASAN_STEPS.map((step, index) => <div key={step.title}><article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ color: step.color, borderColor: `${step.color}30`, background: `${step.color}12` }}><step.icon className="h-5 w-5" /></span><div><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-black text-white/30">0{index + 1}</span><h3 className="font-bold text-white">{step.title}</h3><ExamKeyword color={step.color}>{step.keyword}</ExamKeyword></div><p className="mt-2 text-sm leading-6 text-white/60">{step.detail}</p></div></div></article>{index < GOLDEN_RINGKASAN_STEPS.length - 1 && <div className="py-1 text-center text-amber-300/30">↓</div>}</div>)}</div>
      <ExamplePair wrong="Terus membaca petikan tanpa memahami kehendak soalan." right="Baca soalan dahulu dan tandakan kata kunci: kesan cuaca panas." />
      <QuickScore items={["Cari kata kunci dahulu", "Ambil isi penting sahaja", "Gunakan penanda wacana", "Semak jawapan sebelum hantar"]} />
      <ErrorCallout items={["Terus menyalin petikan", "Mengambil isi di luar kata kunci", "Tidak menyemak had perkataan", "Tidak menyemak ejaan"]} />
      <NextStudy title="Teknik Menjawab Ringkasan" />
    </section>

    <section className="space-y-6"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Pilih Isi</p><h2 className="mt-1 font-display text-xl font-bold text-white">Cara mencari isi penting</h2></div><div className="grid gap-3 sm:grid-cols-2">{RANGKA_ISI_CUACA.map((isi, index) => <article key={isi} className="flex items-start gap-3 rounded-2xl border border-emerald-300/12 bg-emerald-300/[0.04] p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-300/[0.1] text-[10px] font-black text-emerald-300">{index + 1}</span><p className="text-sm leading-6 text-white/70">{isi}</p></article>)}</div><ExamplePair wrong="Cuaca panas berlaku pada musim tertentu. (Tidak menjawab kesan)" right="Cuaca panas membahayakan kesihatan manusia. (Menjawab kata kunci kesan)" /><QuickScore items={["Pilih enam isi", "Pastikan setiap isi menjawab kata kunci", "Jangan ambil contoh sebagai isi", "Gunakan ayat sendiri"]} /><ErrorCallout items={["Isi tidak berkaitan", "Contoh dianggap sebagai isi", "Isi yang sama diulang", "Menyalin ayat bulat-bulat"]} /><NextStudy title="Susun Isi dengan Penanda Wacana" /></section>

    <section className="space-y-6"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">Bina Jawapan</p><h2 className="mt-1 font-display text-xl font-bold text-white">Susun isi dengan penanda wacana</h2></div><div className="space-y-2">{RANGKA_JAWAPAN_CUACA.map((item, index) => <div key={item.pw} className="flex items-start gap-3 rounded-xl border border-purple-300/12 bg-purple-300/[0.04] p-3"><ExamKeyword color={["#A78BFA", "#38BDF8", "#34D399", "#FBBF24", "#F472B6", "#FB923C"][index]}>{item.pw}</ExamKeyword><p className="text-sm leading-6 text-white/65">{item.isi}</p></div>)}</div><ExamplePair wrong="Cuaca panas membahayakan kesihatan. Cuaca panas menjejaskan aktiviti. Cuaca panas mengurangkan sumber air." right="Antara kesannya ialah cuaca panas membahayakan kesihatan. Selain itu, aktiviti harian turut terjejas. Seterusnya, sumber air semakin berkurangan." /><div className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.055] p-5"><div className="mb-3 flex flex-wrap gap-2"><ExamKeyword color="#60A5FA">Ayat sendiri</ExamKeyword><ExamKeyword color="#FB923C">55 patah perkataan</ExamKeyword></div><p className="text-sm leading-7 text-white/75">{RANGKA_JAWAPAN_CUACA.map(item => `${item.pw} ${item.isi}`).join(" ")}</p></div><QuickScore items={["Mulakan dengan Antara", "Pelbagaikan penanda wacana", "Tulis dalam satu perenggan", "Semak 100 patah perkataan"]} /><ErrorCallout items={RANGKA_KESALAHAN.slice(2)} /><NextStudy title="Latihan Ringkasan Interaktif" /></section>

    <section className="rounded-[1.75rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.08] to-indigo-300/[0.04] p-5 sm:p-7"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Ringkasan Akhir · 30 Saat</p><h2 className="mt-1 font-display text-xl font-bold text-white">Dalam peperiksaan</h2><div className="mt-5 grid gap-2 sm:grid-cols-2">{["Baca soalan", "Cari kata kunci", "Gariskan isi", "Gunakan ayat sendiri", "Gunakan penanda wacana", "Semak 100 patah perkataan"].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 p-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/[0.1] text-[10px] font-black text-cyan-300">{index + 1}</span><span className="text-sm font-semibold text-white/75">{item}</span></div>)}</div></section>
  </div>;
}

function RangkaRingkasanLegacyDetail({ color }: { color: string }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <span className="text-2xl">📖</span>
        <div>
          <p className="text-[10px] font-black tracking-wide mb-0.5" style={{ color }}>
            Formula Ringkasan UASA
          </p>
          <p className="text-sm text-white/70">
            Ikuti tiga langkah ini untuk mendapat markah penuh dalam soalan ringkasan.
          </p>
        </div>
      </div>

      {/* Langkah 1 */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
            style={{ background: `${color}30`, color }}
          >
            1
          </span>
          <p className="text-sm font-bold text-white">Kenal Pasti Kata Kunci Soalan</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <p className="text-[10px] font-black tracking-wide text-white/35 mb-1">Contoh</p>
          <p className="text-sm text-white/65 italic">
            "Tulis ringkasan tentang kesan cuaca panas."
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3">
          <span className="text-base mt-0.5">✅</span>
          <div>
            <p className="text-[10px] font-black tracking-wide text-emerald-400 mb-0.5">
              Kata Kunci Soalan
            </p>
            <p className="text-base font-black text-white">Kesan Cuaca Panas</p>
          </div>
        </div>
      </div>

      {/* Langkah 2 */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
            style={{ background: `${color}30`, color }}
          >
            2
          </span>
          <p className="text-sm font-bold text-white">Kenal Pasti Isi Penting Daripada Petikan</p>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                style={{ background: `${color}20`, color }}
              >
                {i + 1}
              </span>
              <p className="text-[11px] font-bold text-white/35 mr-2 shrink-0">Isi {i + 1} →</p>
              <div className="flex-1 border-b border-dashed border-white/[0.15] pb-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Langkah 3 */}
      <div className="rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/8 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
            style={{ background: `${color}30`, color }}
          >
            3
          </span>
          <p className="text-sm font-bold text-white">
            Masukkan semua isi dalam{" "}
            <span className="font-bold text-white underline decoration-dotted">satu perenggan</span>
          </p>
        </div>
        <p className="text-[10px] font-black tracking-wide text-[#A78BFA]">📌 Rangka Ringkasan</p>
        <div className="space-y-2">
          {[
            ["Antara", "Isi 1"],
            ["Selain itu,", "Isi 2"],
            ["Seterusnya,", "Isi 3"],
            ["Di samping itu,", "Isi 4"],
            ["Tambahan pula,", "Isi 5"],
            ["Akhir sekali,", "Isi 6"],
          ].map(([pw, slot], i) => (
            <div
              key={i}
              className="flex items-baseline gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5"
            >
              <span className="font-bold text-white shrink-0 text-sm">{pw}</span>
              <div className="flex-1 border-b border-dashed border-white/[0.15] pb-0.5" />
              <span className="text-[10px] text-white/30 shrink-0">({slot})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contoh Ringkasan Lengkap */}
      <div>
        <SectionLabel>Contoh Ringkasan Lengkap</SectionLabel>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#FBBF24]/25 bg-[#FBBF24]/8 px-5 py-4">
            <span className="text-xl">📌</span>
            <div>
              <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-0.5">
                Kata Kunci Soalan
              </p>
              <p className="text-base font-black text-white">Kesan Cuaca Panas</p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">📌</span>
              <p className="text-[10px] font-black tracking-wide text-white/40">Isi Yang Dipilih</p>
            </div>
            <div className="space-y-2">
              {RANGKA_ISI_CUACA.map((isi, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black"
                    style={{ background: `${color}20`, color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/75">{isi}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">📌</span>
              <p className="text-[10px] font-black tracking-wide text-white/40">Jawapan Ringkasan</p>
            </div>
            <div className="rounded-2xl border border-[#6366F1]/25 bg-[#6366F1]/8 p-5">
              <p className="text-sm leading-relaxed text-white/80">
                {RANGKA_JAWAPAN_CUACA.map((j, i) => (
                  <span key={i}>
                    <span className="font-bold text-white">{j.pw}</span> {j.isi}{" "}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[11px] text-white/40">(55 patah perkataan)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kesalahan Lazim */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
        <p className="mb-4 text-[9px] font-black tracking-wide text-rose-400">
          ⚠ Kesalahan Yang Sering Dilakukan Murid
        </p>
        <div className="space-y-2">
          {RANGKA_KESALAHAN.map((k, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-rose-500/10 bg-rose-500/5 px-4 py-2.5"
            >
              <span className="text-base shrink-0">❌</span>
              <p className="text-sm text-white/70">{k}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Hafalan 20 Saat */}
      <div>
        <SectionLabel>Formula Hafalan 20 Saat</SectionLabel>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {HAFALAN_LANGKAH.map((langkah, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="rounded-xl border px-3 py-2 text-center"
                  style={{ borderColor: `${color}40`, background: `${color}12` }}
                >
                  <p className="text-[10px] font-black text-white/40 mb-0.5">Langkah {i + 1}</p>
                  <p className="text-xs font-bold text-white">{langkah}</p>
                </div>
                {i < HAFALAN_LANGKAH.length - 1 && (
                  <span className="text-white/25 font-bold text-lg">→</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-[#FBBF24]/20 bg-[#FBBF24]/8 px-4 py-3 mt-1">
            <span className="shrink-0">🎯</span>
            <p className="text-sm text-white/80 italic">
              Ringkasan yang mendapat markah tinggi bukan kerana ayat yang panjang, tetapi kerana
              isi yang tepat dan menepati kehendak soalan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TEKNIK MENJAWAB RINGKASAN PREMIUM ───────────────────────────────────────

// ─── DATA: 5 LATIHAN RINGKASAN INTERAKTIF ─────────────────────────────────────

const LATIHAN_RINGKASAN = [
  {
    id: 1,
    tajuk: "Kebaikan Aktiviti Berbasikal",
    emoji: "🚴",
    petikan:
      "Aktiviti berbasikal semakin mendapat tempat dalam kalangan masyarakat di negara kita. Berbasikal secara berkala dapat menjaga kesihatan fizikal seseorang kerana ia melibatkan pergerakan aktif seluruh anggota badan. Selain itu, penggunaan basikal sebagai kenderaan harian dapat mengurangkan kebergantungan kepada kenderaan bermotor, justeru membantu mengawal kadar pencemaran udara di kawasan bandar. Aktiviti ini juga membantu menjimatkan kos pengangkutan harian terutamanya bagi golongan yang tinggal berhampiran tempat kerja atau sekolah. Di samping itu, berbasikal secara berkumpulan dapat memupuk semangat kerjasama dan mewujudkan ikatan sosial yang erat dalam kalangan ahli masyarakat. Penggunaan basikal yang meluas turut menyumbang kepada pengurangan kesesakan lalu lintas di jalan raya. Akhirnya, amalan berbasikal secara tidak langsung membantu memelihara alam sekitar kerana basikal tidak melepaskan gas karbon dioksida ke udara.",
    fokus: "Kebaikan aktiviti berbasikal kepada masyarakat.",
    kataKunci: [
      { kata: "Kebaikan", warna: "bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/35" },
      {
        kata: "Aktiviti Berbasikal",
        warna: "bg-[#0EA5E9]/20 text-[#38BDF8] border border-[#0EA5E9]/35",
      },
      { kata: "Masyarakat", warna: "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/35" },
    ],
    isiPenting: [
      "Menjaga kesihatan fizikal penunggang basikal.",
      "Mengurangkan pencemaran udara di kawasan bandar.",
      "Menjimatkan kos pengangkutan harian.",
      "Memupuk semangat kerjasama dalam kalangan masyarakat.",
      "Mengurangkan kesesakan lalu lintas di jalan raya.",
      "Membantu memelihara alam sekitar.",
    ],
    struktur: [
      {
        penanda: "Antara",
        warna: "text-[#A78BFA]",
        isi: "kebaikan aktiviti berbasikal ialah ia dapat menjaga kesihatan fizikal penunggang.",
      },
      {
        penanda: "Selain itu,",
        warna: "text-[#38BDF8]",
        isi: "berbasikal membantu mengurangkan pencemaran udara kerana ia tidak menggunakan bahan api.",
      },
      {
        penanda: "Seterusnya,",
        warna: "text-[#34D399]",
        isi: "aktiviti ini menjimatkan kos pengangkutan harian seseorang.",
      },
      {
        penanda: "Di samping itu,",
        warna: "text-[#FBBF24]",
        isi: "berbasikal secara berkumpulan dapat memupuk semangat kerjasama dalam kalangan masyarakat.",
      },
      {
        penanda: "Tambahan pula,",
        warna: "text-[#F472B6]",
        isi: "penggunaan basikal turut mengurangkan kesesakan lalu lintas di jalan raya.",
      },
      {
        penanda: "Akhir sekali,",
        warna: "text-[#FB923C]",
        isi: "berbasikal secara tidak langsung membantu memelihara alam sekitar.",
      },
    ],
    jawapanLengkap:
      "Antara kebaikan aktiviti berbasikal kepada masyarakat ialah ia dapat menjaga kesihatan fizikal penunggang. Selain itu, berbasikal membantu mengurangkan pencemaran udara kerana ia tidak menggunakan bahan api. Seterusnya, aktiviti ini menjimatkan kos pengangkutan harian seseorang. Di samping itu, berbasikal secara berkumpulan dapat memupuk semangat kerjasama dalam kalangan masyarakat. Tambahan pula, penggunaan basikal turut mengurangkan kesesakan lalu lintas di jalan raya. Akhir sekali, berbasikal secara tidak langsung membantu memelihara alam sekitar.",
    bilPatah: 73,
    kesalahanLazim: [
      "Mengambil isi yang tidak menjawab fokus — contoh: menulis tentang bahaya berbasikal.",
      "Menulis pendahuluan seperti 'Terdapat banyak kebaikan...' — membuang patah perkataan.",
      "Menyalin keseluruhan ayat daripada petikan tanpa olahan sendiri.",
      "Menulis lebih daripada 100 patah perkataan.",
      "Tidak menggunakan penanda wacana seperti 'Antara', 'Selain itu'.",
    ],
    tipCikgu:
      "Fokus kata kunci adalah 'kebaikan' — pastikan semua isi yang dipilih menjawab soalan 'apa kebaikannya?' dan bukannya kesan, masalah, atau cadangan.",
  },
  {
    id: 2,
    tajuk: "Kesan Cuaca Panas",
    emoji: "☀️",
    petikan:
      "Cuaca panas yang melampau membawa pelbagai kesan buruk kepada kehidupan manusia dan alam sekitar. Kesihatan manusia terancam apabila suhu yang terlalu tinggi boleh menyebabkan seseorang mengalami strok haba, terutamanya bagi golongan warga emas dan kanak-kanak. Aktiviti harian turut terjejas apabila cuaca yang panas menyukarkan orang ramai menjalankan kerja luar. Di samping itu, cuaca panas yang berpanjangan menyebabkan sumber air semakin berkurangan akibat kadar penyejatan yang tinggi. Tanaman pertanian juga turut terjejas kerana kekurangan air dan suhu yang melampau boleh menyebabkan tanaman mati sebelum musim tuaian. Cuaca panas yang kering juga meningkatkan risiko kebakaran hutan dan kebun, yang boleh memusnahkan harta benda dan nyawa. Selain itu, penggunaan elektrik meningkat kerana pengguna terpaksa menghidupkan penghawa dingin, menyebabkan beban sistem elektrik negara bertambah.",
    fokus: "Kesan cuaca panas kepada manusia dan alam sekitar.",
    kataKunci: [
      { kata: "Kesan", warna: "bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/35" },
      { kata: "Cuaca Panas", warna: "bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/35" },
    ],
    isiPenting: [
      "Mengancam kesihatan manusia dan menyebabkan strok haba.",
      "Menjejaskan aktiviti harian orang ramai.",
      "Mengurangkan sumber air akibat kadar penyejatan yang tinggi.",
      "Merosakkan tanaman pertanian.",
      "Meningkatkan risiko kebakaran hutan dan kebun.",
      "Meningkatkan penggunaan elektrik sehingga membebankan sistem bekalan.",
    ],
    struktur: [
      {
        penanda: "Antara",
        warna: "text-[#A78BFA]",
        isi: "kesan cuaca panas ialah ia mengancam kesihatan manusia dengan menyebabkan strok haba.",
      },
      {
        penanda: "Selain itu,",
        warna: "text-[#38BDF8]",
        isi: "cuaca panas turut menjejaskan aktiviti harian orang ramai.",
      },
      {
        penanda: "Seterusnya,",
        warna: "text-[#34D399]",
        isi: "sumber air semakin berkurangan akibat kadar penyejatan yang tinggi.",
      },
      {
        penanda: "Di samping itu,",
        warna: "text-[#FBBF24]",
        isi: "tanaman pertanian turut terjejas dan boleh mati sebelum musim tuaian.",
      },
      {
        penanda: "Tambahan pula,",
        warna: "text-[#F472B6]",
        isi: "cuaca panas yang kering meningkatkan risiko kebakaran hutan dan kebun.",
      },
      {
        penanda: "Akhir sekali,",
        warna: "text-[#FB923C]",
        isi: "penggunaan elektrik meningkat kerana pengguna terpaksa menghidupkan penghawa dingin.",
      },
    ],
    jawapanLengkap:
      "Antara kesan cuaca panas ialah ia mengancam kesihatan manusia dengan menyebabkan strok haba. Selain itu, cuaca panas turut menjejaskan aktiviti harian orang ramai. Seterusnya, sumber air semakin berkurangan akibat kadar penyejatan yang tinggi. Di samping itu, tanaman pertanian turut terjejas dan boleh mati sebelum musim tuaian. Tambahan pula, cuaca panas yang kering meningkatkan risiko kebakaran hutan dan kebun. Akhir sekali, penggunaan elektrik meningkat kerana pengguna terpaksa menghidupkan penghawa dingin.",
    bilPatah: 75,
    kesalahanLazim: [
      "Menulis cara mengatasi cuaca panas — soalan tanya kesan, bukan penyelesaian.",
      "Mengambil isi yang sama dengan perkataan berbeza (isi berganda).",
      "Menyalin keseluruhan perenggan tanpa memilih isi yang spesifik.",
      "Menulis lebih daripada 100 patah perkataan.",
      "Lupa menggunakan penanda wacana untuk menyambung isi.",
    ],
    tipCikgu:
      "Kata kunci 'kesan' bermakna kamu mencari akibat atau impak cuaca panas. Jangan tulis cara mengatasinya — itu menjawab soalan yang berbeza!",
  },
  {
    id: 3,
    tajuk: "Cara Mengesan Penipuan Skim Cepat Kaya",
    emoji: "🚨",
    petikan:
      "Penipuan berkaitan skim cepat kaya semakin berleluasa dan memerlukan orang ramai bersikap berhati-hati. Antara cara mengesan penipuan sedemikian ialah dengan memerhati tawaran yang menjanjikan pulangan wang yang luar biasa tinggi dalam masa yang sangat singkat, kerana ini adalah tanda amaran yang jelas. Selain itu, skim yang memerlukan pembayaran wang pendahuluan sebelum sebarang keuntungan diterima wajar disyaki dengan serius. Orang ramai juga perlu menyemak sama ada syarikat berkenaan mempunyai pendaftaran yang sah dengan pihak berkuasa seperti Bank Negara Malaysia atau Suruhanjaya Sekuriti. Teknik menekan mangsa supaya segera membuat keputusan tanpa masa untuk berfikir juga merupakan petanda penipuan. Di samping itu, penggunaan testimoni yang tidak boleh disahkan daripada individu yang tidak dikenali harus diwaspadai. Maklumat tentang syarikat yang kabur dan alamat atau nombor telefon yang tidak dapat disahkan turut menjadi petanda sesebuah skim itu adalah penipuan.",
    fokus: "Cara mengesan penipuan skim cepat kaya.",
    kataKunci: [
      { kata: "Cara Mengesan", warna: "bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/35" },
      { kata: "Penipuan", warna: "bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/35" },
      {
        kata: "Skim Cepat Kaya",
        warna: "bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/35",
      },
    ],
    isiPenting: [
      "Tawaran menjanjikan pulangan wang luar biasa tinggi dalam masa singkat.",
      "Memerlukan pembayaran wang pendahuluan sebelum keuntungan diterima.",
      "Syarikat tidak mempunyai pendaftaran sah dengan pihak berkuasa.",
      "Mangsa ditekan untuk membuat keputusan segera tanpa masa berfikir.",
      "Menggunakan testimoni yang tidak boleh disahkan.",
      "Maklumat syarikat yang kabur dan tidak dapat disahkan.",
    ],
    struktur: [
      {
        penanda: "Antara",
        warna: "text-[#A78BFA]",
        isi: "cara mengesan penipuan skim cepat kaya ialah tawaran yang menjanjikan pulangan wang luar biasa tinggi dalam masa singkat.",
      },
      {
        penanda: "Selain itu,",
        warna: "text-[#38BDF8]",
        isi: "skim yang memerlukan bayaran pendahuluan sebelum sebarang keuntungan diterima wajar disyaki.",
      },
      {
        penanda: "Seterusnya,",
        warna: "text-[#34D399]",
        isi: "syarikat yang tidak mempunyai pendaftaran sah dengan pihak berkuasa adalah petanda penipuan.",
      },
      {
        penanda: "Di samping itu,",
        warna: "text-[#FBBF24]",
        isi: "teknik menekan mangsa supaya membuat keputusan segera juga merupakan petanda penipuan.",
      },
      {
        penanda: "Tambahan pula,",
        warna: "text-[#F472B6]",
        isi: "penggunaan testimoni yang tidak boleh disahkan harus diwaspadai.",
      },
      {
        penanda: "Akhir sekali,",
        warna: "text-[#FB923C]",
        isi: "maklumat syarikat yang kabur dan alamat yang tidak dapat disahkan turut menjadi petanda penipuan.",
      },
    ],
    jawapanLengkap:
      "Antara cara mengesan penipuan skim cepat kaya ialah tawaran yang menjanjikan pulangan wang luar biasa tinggi dalam masa singkat. Selain itu, skim yang memerlukan bayaran pendahuluan sebelum sebarang keuntungan diterima wajar disyaki. Seterusnya, syarikat yang tidak mempunyai pendaftaran sah dengan pihak berkuasa adalah petanda penipuan. Di samping itu, teknik menekan mangsa supaya membuat keputusan segera juga merupakan petanda penipuan. Tambahan pula, penggunaan testimoni yang tidak boleh disahkan harus diwaspadai. Akhir sekali, maklumat syarikat yang kabur dan alamat yang tidak dapat disahkan turut menjadi petanda penipuan.",
    bilPatah: 83,
    kesalahanLazim: [
      "Menulis cara mengelak penipuan — soalan tanya cara mengesan, bukan mengelak.",
      "Mengambil maklumat am tentang penipuan yang tidak terdapat dalam petikan.",
      "Mengulang isi yang sama dengan perkataan berbeza.",
      "Menulis lebih daripada 100 patah perkataan.",
      "Tidak menggunakan penanda wacana yang betul.",
    ],
    tipCikgu:
      "Perhatikan perbezaan: 'cara mengesan' bermakna tanda-tanda yang menunjukkan ia penipuan. Bukan cara nak lari atau cara nak lapor — itu soalan berbeza!",
  },
  {
    id: 4,
    tajuk: "Cara Menangani Masalah Sosial Remaja",
    emoji: "🤝",
    petikan:
      "Masalah sosial dalam kalangan remaja memerlukan penyelesaian yang menyeluruh daripada pelbagai pihak. Ibu bapa memainkan peranan utama dalam mengatasi isu ini dengan sentiasa memantau pergaulan dan aktiviti anak-anak mereka agar tidak terlibat dengan pengaruh negatif. Pendidikan agama dan moral yang kukuh perlu diterapkan sejak kecil supaya remaja mempunyai benteng dalaman yang kuat untuk menolak ajakan kepada perkara yang salah. Pihak sekolah pula perlu menyediakan lebih banyak aktiviti kokurikulum yang berfaedah bagi mengisi masa lapang remaja dengan perkara yang positif. Kaunseling dan bimbingan yang berterusan perlu diberikan kepada remaja yang menunjukkan tanda-tanda bermasalah. Pihak berkuasa turut bertanggungjawab menguatkuasakan undang-undang yang berkaitan supaya terdapat kesan jera kepada mereka yang melanggar. Selain itu, masyarakat perlu berganding bahu memastikan persekitaran kejiranan yang selamat dan sihat untuk perkembangan remaja.",
    fokus: "Cara menangani masalah sosial dalam kalangan remaja.",
    kataKunci: [
      {
        kata: "Cara Menangani",
        warna: "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/35",
      },
      {
        kata: "Masalah Sosial",
        warna: "bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/35",
      },
      { kata: "Remaja", warna: "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/35" },
    ],
    isiPenting: [
      "Ibu bapa memantau pergaulan dan aktiviti anak-anak.",
      "Pendidikan agama dan moral yang kukuh diterapkan sejak kecil.",
      "Menyediakan aktiviti kokurikulum yang berfaedah untuk mengisi masa lapang.",
      "Memberikan kaunseling dan bimbingan yang berterusan.",
      "Menguatkuasakan undang-undang yang berkaitan.",
      "Masyarakat mewujudkan persekitaran kejiranan yang selamat.",
    ],
    struktur: [
      {
        penanda: "Antara",
        warna: "text-[#A78BFA]",
        isi: "cara menangani masalah sosial remaja ialah ibu bapa perlu sentiasa memantau pergaulan dan aktiviti anak-anak.",
      },
      {
        penanda: "Selain itu,",
        warna: "text-[#38BDF8]",
        isi: "pendidikan agama dan moral yang kukuh perlu diterapkan sejak kecil.",
      },
      {
        penanda: "Seterusnya,",
        warna: "text-[#34D399]",
        isi: "pihak sekolah perlu menyediakan aktiviti kokurikulum yang berfaedah untuk mengisi masa lapang remaja.",
      },
      {
        penanda: "Di samping itu,",
        warna: "text-[#FBBF24]",
        isi: "kaunseling dan bimbingan yang berterusan perlu diberikan kepada remaja yang bermasalah.",
      },
      {
        penanda: "Tambahan pula,",
        warna: "text-[#F472B6]",
        isi: "pihak berkuasa perlu menguatkuasakan undang-undang yang berkaitan bagi memberi kesan jera.",
      },
      {
        penanda: "Akhir sekali,",
        warna: "text-[#FB923C]",
        isi: "masyarakat perlu berganding bahu mewujudkan persekitaran kejiranan yang selamat dan sihat.",
      },
    ],
    jawapanLengkap:
      "Antara cara menangani masalah sosial remaja ialah ibu bapa perlu sentiasa memantau pergaulan dan aktiviti anak-anak. Selain itu, pendidikan agama dan moral yang kukuh perlu diterapkan sejak kecil. Seterusnya, pihak sekolah perlu menyediakan aktiviti kokurikulum yang berfaedah untuk mengisi masa lapang remaja. Di samping itu, kaunseling dan bimbingan yang berterusan perlu diberikan kepada remaja yang bermasalah. Tambahan pula, pihak berkuasa perlu menguatkuasakan undang-undang yang berkaitan bagi memberi kesan jera. Akhir sekali, masyarakat perlu berganding bahu mewujudkan persekitaran kejiranan yang selamat dan sihat.",
    bilPatah: 80,
    kesalahanLazim: [
      "Menulis punca atau kesan masalah sosial — soalan tanya cara menangani.",
      "Mengambil isi yang tidak jelas menjawab siapa yang perlu bertindak.",
      "Menulis isi yang terlalu umum tanpa huraian yang spesifik.",
      "Menulis lebih daripada 100 patah perkataan.",
      "Tidak menggunakan penanda wacana yang tepat.",
    ],
    tipCikgu:
      "Untuk soalan 'cara menangani', setiap isi kamu sepatutnya boleh dijawab dengan soalan 'siapa buat apa?' — contoh: Ibu bapa (siapa) memantau anak (buat apa). Ini cara paling mudah pastikan isi kamu tepat.",
  },
  {
    id: 5,
    tajuk: "Langkah Mengamalkan Gaya Hidup Sihat",
    emoji: "💪",
    petikan:
      "Gaya hidup sihat perlu diamalkan sejak awal usia bagi memastikan kualiti kehidupan yang baik sepanjang hayat. Langkah pertama ialah bersenam secara berkala sekurang-kurangnya tiga kali seminggu bagi mengekalkan kecergasan fizikal dan meningkatkan daya tahan badan. Selain itu, seseorang perlu mengamalkan pemakanan yang seimbang dengan mengambil pelbagai jenis makanan berkhasiat dan mengelakkan makanan yang tinggi lemak serta gula. Mendapatkan waktu tidur yang cukup iaitu antara tujuh hingga lapan jam sehari juga penting untuk memulihkan tenaga badan dan minda. Di samping itu, mengelakkan tabiat buruk seperti merokok dan mengambil minuman beralkohol dapat melindungi kesihatan dalam jangka masa panjang. Pemeriksaan kesihatan secara berkala pula membolehkan sebarang penyakit dikesan lebih awal sebelum menjadi parah. Akhirnya, mengurangkan tahap tekanan atau stres melalui aktiviti rekreasi dan masa bersama keluarga juga penting untuk kesihatan mental.",
    fokus: "Langkah mengamalkan gaya hidup sihat.",
    kataKunci: [
      { kata: "Langkah", warna: "bg-[#06B6D4]/20 text-[#22D3EE] border border-[#06B6D4]/35" },
      {
        kata: "Gaya Hidup Sihat",
        warna: "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/35",
      },
    ],
    isiPenting: [
      "Bersenam secara berkala sekurang-kurangnya tiga kali seminggu.",
      "Mengamalkan pemakanan yang seimbang dan berkhasiat.",
      "Mendapatkan waktu tidur yang cukup antara tujuh hingga lapan jam sehari.",
      "Mengelakkan tabiat buruk seperti merokok dan minuman beralkohol.",
      "Menjalani pemeriksaan kesihatan secara berkala.",
      "Mengurangkan tekanan atau stres melalui aktiviti rekreasi.",
    ],
    struktur: [
      {
        penanda: "Antara",
        warna: "text-[#A78BFA]",
        isi: "langkah mengamalkan gaya hidup sihat ialah bersenam secara berkala sekurang-kurangnya tiga kali seminggu.",
      },
      {
        penanda: "Selain itu,",
        warna: "text-[#38BDF8]",
        isi: "seseorang perlu mengamalkan pemakanan yang seimbang dengan mengambil makanan berkhasiat.",
      },
      {
        penanda: "Seterusnya,",
        warna: "text-[#34D399]",
        isi: "mendapatkan waktu tidur yang cukup antara tujuh hingga lapan jam sehari juga penting.",
      },
      {
        penanda: "Di samping itu,",
        warna: "text-[#FBBF24]",
        isi: "mengelakkan tabiat buruk seperti merokok dapat melindungi kesihatan jangka panjang.",
      },
      {
        penanda: "Tambahan pula,",
        warna: "text-[#F472B6]",
        isi: "pemeriksaan kesihatan secara berkala membolehkan penyakit dikesan lebih awal.",
      },
      {
        penanda: "Akhir sekali,",
        warna: "text-[#FB923C]",
        isi: "mengurangkan tekanan atau stres melalui aktiviti rekreasi penting untuk kesihatan mental.",
      },
    ],
    jawapanLengkap:
      "Antara langkah mengamalkan gaya hidup sihat ialah bersenam secara berkala sekurang-kurangnya tiga kali seminggu. Selain itu, seseorang perlu mengamalkan pemakanan yang seimbang dengan mengambil makanan berkhasiat. Seterusnya, mendapatkan waktu tidur yang cukup antara tujuh hingga lapan jam sehari juga penting. Di samping itu, mengelakkan tabiat buruk seperti merokok dapat melindungi kesihatan jangka panjang. Tambahan pula, pemeriksaan kesihatan secara berkala membolehkan penyakit dikesan lebih awal. Akhir sekali, mengurangkan tekanan atau stres melalui aktiviti rekreasi penting untuk kesihatan mental.",
    bilPatah: 78,
    kesalahanLazim: [
      "Menulis kesan mengamalkan gaya hidup sihat — soalan tanya langkah, bukan kesan.",
      "Mengambil isi yang tidak berkaitan dengan amalan peribadi.",
      "Mengulang isi yang sama dengan perkataan sedikit berbeza.",
      "Menulis lebih daripada 100 patah perkataan.",
      "Tidak menggunakan penanda wacana yang lengkap.",
    ],
    tipCikgu:
      "Untuk soalan 'langkah', setiap isi kamu mestilah tindakan yang boleh dilakukan — mulakan dengan kata kerja: 'bersenam', 'mengamalkan', 'mendapatkan', 'mengelakkan'. Jika isi tidak boleh dimulakan dengan kata kerja, ia mungkin bukan langkah.",
  },
];

// ─── KOMPONEN: SATU KAD LATIHAN ──────────────────────────────────────────────

function LatihanKadRingkasan({
  latihan,
  color,
}: {
  latihan: (typeof LATIHAN_RINGKASAN)[number];
  color: string;
}) {
  const [isiDedah, setIsiDedah] = useState(false);
  const [jawapanDedah, setJawapanDedah] = useState(false);

  return (
    <div className="space-y-7">
      {/* 1. Petikan */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">📖</span>
          <p className="text-sm font-black tracking-wide text-white">Petikan</p>
        </div>
        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
          <p className="text-sm leading-[1.85] text-white/75 italic">{latihan.petikan}</p>
        </div>
      </div>

      {/* 2. Fokus Soalan */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🎯</span>
          <p className="text-sm font-black tracking-wide text-white">Fokus Soalan</p>
        </div>
        <div className="rounded-2xl border border-[#FBBF24]/35 bg-gradient-to-r from-[#FBBF24]/12 to-[#F59E0B]/8 p-4">
          <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-1.5">
            Soalan Peperiksaan
          </p>
          <p className="text-base font-bold text-white leading-snug">{latihan.fokus}</p>
          <p className="mt-2 text-[11px] text-white/45 leading-relaxed">
            Cari isi yang menjawab fokus ini sahaja. Buang semua maklumat yang tidak berkaitan.
          </p>
        </div>
      </div>

      {/* 3. Kata Kunci */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🔍</span>
          <p className="text-sm font-black tracking-wide text-white">Kata Kunci Soalan</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {latihan.kataKunci.map((kk, i) => (
            <span key={i} className={`rounded-xl px-4 py-2 text-sm font-bold ${kk.warna}`}>
              {kk.kata}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-white/40 px-1">
          Semua isi yang dipilih mesti berkaitan dengan kata kunci di atas.
        </p>
      </div>

      {/* 4. Isi Penting (interaktif — tunjuk/sembunyikan) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">✏️</span>
          <p className="text-sm font-black tracking-wide text-white">
            Isi Penting Yang Perlu Dicari
          </p>
        </div>
        {!isiDedah && (
          <p className="mb-3 text-[11px] text-white/40 px-1">
            Cuba kenal pasti 6 isi penting daripada petikan di atas sebelum melihat jawapan.
          </p>
        )}
        <div className="grid gap-2 sm:grid-cols-2 mb-3">
          {latihan.isiPenting.map((isi, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border p-3 transition-all duration-300 ${
                isiDedah
                  ? "border-emerald-500/25 bg-emerald-500/[0.07]"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black mt-0.5"
                style={{ background: `${color}22`, color }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white/30 mb-1">Isi {i + 1}</p>
                {isiDedah ? (
                  <p className="text-sm text-white/85 leading-relaxed">{isi}</p>
                ) : (
                  <div className="space-y-1.5">
                    <div className="h-2 rounded-full bg-white/[0.08] w-full" />
                    <div className="h-2 rounded-full bg-white/[0.05] w-3/4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {!isiDedah && (
          <button
            onClick={() => setIsiDedah(true)}
            className="w-full rounded-xl border border-[#6366F1]/35 bg-[#6366F1]/12 py-3 text-xs font-bold text-[#A78BFA] transition-all hover:bg-[#6366F1]/22 active:scale-[0.98]"
          >
            ✅ Tunjuk Isi Penting
          </button>
        )}
      </div>

      {/* 5. Jawapan Contoh — Struktur */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">📚</span>
          <p className="text-sm font-black tracking-wide text-white">
            Jawapan Contoh — Struktur Ringkasan
          </p>
        </div>
        <div className="rounded-2xl border border-[#6366F1]/25 bg-[#6366F1]/[0.07] p-5">
          <p className="text-[10px] font-black tracking-wide text-[#A78BFA] mb-4">
            Susun isi mengikut penanda wacana ini:
          </p>
          <div className="space-y-3">
            {latihan.struktur.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2 leading-relaxed">
                <span className={`font-black text-sm shrink-0 ${s.warna}`}>{s.penanda}</span>
                <span className="text-sm text-white/65">{s.isi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Jawapan Lengkap (interaktif) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🔥</span>
          <p className="text-sm font-black tracking-wide text-white">Jawapan Lengkap</p>
        </div>
        {jawapanDedah ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-5">
              <p className="text-sm leading-[1.85] text-white/85">{latihan.jawapanLengkap}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="text-[11px] text-white/40">Jumlah Patah Perkataan:</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400">
                {latihan.bilPatah} patah perkataan ✓
              </span>
              <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                Dalam had 100 patah perkataan ✓
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-[11px] text-white/40 mb-4 leading-relaxed">
              Cuba tulis jawapan ringkasan kamu sendiri dahulu menggunakan struktur di atas,
              kemudian semak dengan jawapan lengkap.
            </p>
            <button
              onClick={() => setJawapanDedah(true)}
              className="w-full rounded-xl border border-[#FBBF24]/35 bg-[#FBBF24]/12 py-3 text-xs font-bold text-[#FBBF24] transition-all hover:bg-[#FBBF24]/22 active:scale-[0.98]"
            >
              🔥 Tunjuk Jawapan Lengkap
            </button>
          </div>
        )}
      </div>

      {/* 7. Kesalahan Lazim */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⚠️</span>
          <p className="text-sm font-black tracking-wide text-rose-400">Kesalahan Lazim</p>
        </div>
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] p-5 space-y-2">
          {latihan.kesalahanLazim.map((k, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-rose-500/12 bg-rose-500/[0.04] px-3 py-2.5"
            >
              <span className="shrink-0 text-base mt-0.5">❌</span>
              <p className="text-sm text-white/70 leading-relaxed">{k}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Tip Cikgu AcadeMy */}
      <div className="rounded-2xl border border-[#FBBF24]/30 bg-gradient-to-br from-[#FBBF24]/10 to-[#F59E0B]/8 p-5">
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
            style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}
          >
            🧑‍🏫
          </div>
          <div>
            <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-2">
              Tip Cikgu AcadeMy
            </p>
            <p className="text-sm leading-relaxed text-white/80 italic">"{latihan.tipCikgu}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RingkasanPremiumDetail({ color }: { color: string }) {
  const [aktif, setAktif] = useState(0);

  return (
    <div className="space-y-6">
      {/* Pengenalan + fakta penting */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <p className="text-sm leading-relaxed text-white/75">
          Ringkasan ialah soalan{" "}
          <span className="font-bold text-white">Bahagian C (15 markah)</span> yang memerlukan murid
          mengenal pasti isi penting daripada petikan dan menulis semula dalam bentuk ringkas
          menggunakan ayat gramatis.{" "}
          <span className="font-semibold text-white">
            Tidak lebih daripada 100 patah perkataan.
          </span>{" "}
          Tulis dalam <span className="font-semibold text-white">satu perenggan.</span> Tiada
          pendahuluan. Tiada penutup.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: "📌", label: "Bahagian C" },
          { icon: "⭐", label: "15 Markah" },
          { icon: "📝", label: "Maks. 100 Patah Perkataan" },
          { icon: "📄", label: "Satu Perenggan Sahaja" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3"
          >
            <span className="text-base shrink-0">{f.icon}</span>
            <p className="text-xs font-semibold text-white/85 leading-tight">{f.label}</p>
          </div>
        ))}
      </div>

      {/* Tab navigasi */}
      <div>
        <p className="mb-3 text-[10px] font-black tracking-wide text-white/40">
          5 Latihan Ringkasan Interaktif
        </p>
        <div className="flex flex-wrap gap-2">
          {LATIHAN_RINGKASAN.map((l, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                aktif === i
                  ? "border-transparent text-white shadow-md"
                  : "border-white/[0.08] bg-white/[0.03] text-white/45 hover:text-white/70"
              }`}
              style={
                aktif === i ? { background: `${color}28`, borderColor: `${color}45`, color } : {}
              }
            >
              <span>{l.emoji}</span>
              <span className="hidden sm:inline">{l.tajuk}</span>
              <span className="sm:hidden">Latihan {l.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kad latihan aktif */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
            style={{ background: `${color}22` }}
          >
            {LATIHAN_RINGKASAN[aktif].emoji}
          </span>
          <div>
            <p className="text-[10px] font-black tracking-wide text-white/30 mb-0.5">
              Latihan {LATIHAN_RINGKASAN[aktif].id} daripada 5
            </p>
            <p className="text-base font-bold text-white">{LATIHAN_RINGKASAN[aktif].tajuk}</p>
          </div>
        </div>
        <LatihanKadRingkasan key={aktif} latihan={LATIHAN_RINGKASAN[aktif]} color={color} />
      </div>
    </div>
  );
}

function RingkasanDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-4">
      <LearningFolder
        icon={<BookOpen className="h-4 w-4" />}
        title="📖 Asas Ringkasan"
        description="Pengenalan, formula dan cara menulis"
        accent={color}
        defaultOpen
      >
        {topic.description && (
          <CollapsibleSection
            icon={<BookOpen className="h-4 w-4" />}
            title="Pengenalan"
            accent={color}
          >
            <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
          </CollapsibleSection>
        )}

        {topic.formula && (
          <CollapsibleSection
            icon={<Map className="h-4 w-4" />}
            title="Formula / Langkah"
            accent={color}
          >
            <div className="space-y-2">
              {topic.formula.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                    style={{ background: `${color}25`, color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {topic.steps && topic.steps.length > 0 && (
          <CollapsibleSection
            icon={<PenTool className="h-4 w-4" />}
            title="Cara Menulis"
            accent={color}
          >
            <div className="space-y-2">
              {topic.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                    style={{ background: `${color}25`, color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Target className="h-4 w-4" />}
        title="🎯 Semak & Kuasai UASA"
        description="Kesalahan lazim dan petua peperiksaan"
        accent="#FBBF24"
      >
        {topic.commonMistakes && (
          <CollapsibleSection
            icon={<XCircle className="h-4 w-4" />}
            title="⚠ Kesalahan Lazim"
            accent="#FB7185"
          >
            <ul className="space-y-2">
              {topic.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="mt-0.5 shrink-0 text-rose-400">×</span>
                  {m}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {topic.uasaTips && (
          <CollapsibleSection
            icon={<Trophy className="h-4 w-4" />}
            title="🎯 Fokus UASA — Tips UASA"
            accent="#FBBF24"
          >
            <ul className="space-y-2">
              {topic.uasaTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <LearningFolder
        icon={<Zap className="h-4 w-4" />}
        title="⚡ Ulang Kaji Pantas"
        description="Penerangan cikgu dan ringkasan satu minit"
        accent="#34D399"
      >
        {(topic.description || (topic.formula && topic.formula.length > 0)) && (
          <CollapsibleSection
            icon={<MessageCircle className="h-4 w-4" />}
            title="🤖 Cikgu AcadeMY Terangkan"
            accent={color}
          >
            {topic.description && (
              <p className="mb-3 text-sm italic leading-7 text-white/75">{topic.description}</p>
            )}
            {topic.formula && topic.formula.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="mb-1 text-[10px] font-black tracking-wide" style={{ color }}>
                  Mula dengan langkah pertama
                </p>
                <p className="text-sm text-white/75">{topic.formula[0]}</p>
              </div>
            )}
          </CollapsibleSection>
        )}

        {(topic.commonMistakes || topic.uasaTips) && (
          <CollapsibleSection
            icon={<Lightbulb className="h-4 w-4" />}
            title="📝 Ringkasan 1 Minit"
            accent="#34D399"
          >
            <ul className="space-y-2">
              {topic.commonMistakes?.slice(0, 2).map((m, i) => (
                <li key={`m-${i}`} className="flex items-start gap-2 text-sm text-white/70">
                  <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                  {m}
                </li>
              ))}
              {topic.uasaTips?.slice(0, 1).map((tip, i) => (
                <li key={`tip-${i}`} className="flex items-start gap-2 text-sm text-white/70">
                  <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </LearningFolder>

      <div className="flex gap-3">
        <PlaceholderChip label="Petikan Latihan" />
        <PlaceholderChip label="Semak Tulisan" />
      </div>
    </div>
  );
}

function KaranganDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {topic.description && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
        </div>
      )}

      {/* Formulae table */}
      {topic.formulae && topic.formulae.length > 0 && (
        <div>
          <SectionLabel>Formula Penulisan</SectionLabel>
          <div className="space-y-3">
            {topic.formulae.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                    style={{ background: `${color}25`, color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-bold text-white">{f.part}</p>
                </div>
                <p className="mb-2 text-xs text-white/50">{f.formula}</p>
                <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                  <p className="text-[10px] font-bold text-white/30 mb-1">CONTOH:</p>
                  <p className="text-xs leading-relaxed text-white/60 italic">{f.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.formula && topic.topicType === "karangan-pendek" && (
        <div>
          <SectionLabel>Langkah-langkah</SectionLabel>
          <div className="space-y-2">
            {topic.formula.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                  style={{ background: `${color}25`, color }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-white/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.steps && (
        <div>
          <SectionLabel>Cara Baca & Cara Tulis</SectionLabel>
          <div className="space-y-2">
            {topic.steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                  style={{ background: `${color}25`, color }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-white/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.commonMistakes && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">
            ⚠ Kesalahan Lazim
          </p>
          <ul className="space-y-2">
            {topic.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <span className="mt-0.5 shrink-0 text-rose-400">×</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.uasaTips && (
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-yellow-400">
            ★ Tips Markah Penuh
          </p>
          <ul className="space-y-2">
            {topic.uasaTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Contoh Karangan" />
        <PlaceholderChip label="Latihan Menulis" />
      </div>
    </div>
  );
}

function WorkshopDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {/* Idea Bank */}
      {topic.ideaBank && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide" style={{ color }}>
            💡 Idea Bank
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.ideaBank.map((idea) => (
              <span
                key={idea}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
              >
                {idea}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pendahuluan Template */}
      {topic.pendahuluan && (
        <div>
          <SectionLabel>Template Pendahuluan</SectionLabel>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="text-sm leading-relaxed italic text-white/65">{topic.pendahuluan}</p>
          </div>
        </div>
      )}

      {/* Isi */}
      {topic.isi && topic.isi.length > 0 && (
        <div>
          <SectionLabel>Cadangan Isi</SectionLabel>
          <div className="space-y-2">
            {topic.isi.map((isi, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                  style={{ background: `${color}25`, color }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-white/70">{isi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Penutup */}
      {topic.penutup && (
        <div>
          <SectionLabel>Template Penutup</SectionLabel>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="text-sm leading-relaxed italic text-white/65">{topic.penutup}</p>
          </div>
        </div>
      )}

      {/* Peribahasa */}
      {topic.peribahasa && topic.peribahasa.length > 0 && (
        <div className="rounded-2xl border border-[#F472B6]/20 bg-[#F472B6]/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-[#F472B6]">
            💎 Peribahasa Sesuai
          </p>
          <div className="space-y-2">
            {topic.peribahasa.map((p, i) => (
              <p key={i} className="text-sm italic text-white/65">
                "{p}"
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Model Karangan" />
        <PlaceholderChip label="Kuiz Topik" />
      </div>
    </div>
  );
}

function ModelKaranganDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {topic.description && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
        </div>
      )}

      {topic.keyFeatures && (
        <div>
          <SectionLabel>Ciri-ciri Utama</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-2">
            {topic.keyFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                <p className="text-sm text-white/65">{f}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <PlaceholderChip label="Contoh Model" />
        <PlaceholderChip label="Latihan Menulis" />
      </div>
    </div>
  );
}

function PeribahsaBankDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-4">
      {topic.peribuhasaItems &&
        topic.peribuhasaItems.map((p, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="mb-2 text-base font-bold italic text-white">{p.text}</p>
            <div className="mb-3 rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-[9px] font-black tracking-wide text-white/30 mb-1">Maksud</p>
              <p className="text-sm text-white/70">{p.maksud}</p>
            </div>
            <div className="mb-3 rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-[9px] font-black tracking-wide text-white/30 mb-1">Contoh Ayat</p>
              <p className="text-sm italic text-white/60">{p.contohAyat}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <p className="w-full text-[9px] font-bold tracking-wide text-white/30 mb-1">
                Sesuai untuk topik:
              </p>
              {p.topikSesuai.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium"
                  style={{ color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

      <PlaceholderChip label="Lebih Banyak Peribahasa" />
    </div>
  );
}

function EssayImprovementDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {topic.description && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
        </div>
      )}

      {/* Before/After */}
      {topic.beforeAfter && topic.beforeAfter.length > 0 && (
        <div>
          <SectionLabel>Sebelum & Selepas</SectionLabel>
          <div className="space-y-4">
            {topic.beforeAfter.map((ba, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-white/[0.07]">
                <div className="bg-rose-500/10 p-4 border-b border-white/[0.05]">
                  <p className="mb-1 text-[9px] font-black tracking-wide text-rose-400">
                    ✗ Ayat Lemah
                  </p>
                  <p className="text-sm text-white/60">{ba.lemah}</p>
                </div>
                <div className="bg-emerald-500/10 p-4">
                  <p className="mb-1 text-[9px] font-black tracking-wide text-emerald-400">
                    ✓ Ayat Cemerlang
                  </p>
                  <p className="text-sm text-white/75">{ba.cemerlang}</p>
                  <p className="mt-2 text-[10px] italic text-white/35">Teknik: {ba.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kosa Kata */}
      {topic.kosaKata && topic.kosaKata.length > 0 && (
        <div>
          <SectionLabel>Kosa Kata: Biasa → Menarik</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-2">
            {topic.kosaKata.map((k, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <span className="text-sm text-white/40 line-through">{k.biasa}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-white/20" />
                <span className="text-sm font-semibold" style={{ color }}>
                  {k.menarik}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistakes */}
      {topic.mistakes && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">
            ⚠ Kesilapan Biasa dalam Karangan
          </p>
          <ul className="space-y-2">
            {topic.mistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <span className="mt-0.5 shrink-0 text-rose-400">×</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Added sections only — everything above is original, untouched content */}
      <EssayImprovementPlusSections color={color} />
    </div>
  );
}

function TopicDetailRenderer({ topic, hubColor }: { topic: BMTopic; hubColor: string }) {
  switch (topic.topicType) {
    case "tatabahasa":
      return <TatabahasaDetail topic={topic} color={hubColor} />;
    case "komsas":
      return <KOMSASDetail topic={topic} color={hubColor} />;
    case "novel":
      return <NovelDetail topic={topic} color={hubColor} />;
    case "pemahaman":
      return <PemahamanDetail topic={topic} color={hubColor} />;
    case "rangka-ringkasan":
      return <RangkaRingkasanDetail color={hubColor} />;
    case "ringkasan-premium":
      return <RingkasanPremiumDetail color={hubColor} />;
    case "ringkasan":
      return <RingkasanDetail topic={topic} color={hubColor} />;
    case "karangan-pendek":
    case "respons-terbuka":
      return <KaranganDetail topic={topic} color={hubColor} />;
    case "workshop":
      return <WorkshopDetail topic={topic} color={hubColor} />;
    case "model-karangan":
      return <ModelKaranganDetail topic={topic} color={hubColor} />;
    case "peribahasa-bank":
      return <PeribahsaBankDetail topic={topic} color={hubColor} />;
    case "essay-improvement":
      return <EssayImprovementDetail topic={topic} color={hubColor} />;
    default:
      return null;
  }
}

// ─── TOPIC VIEW ───────────────────────────────────────────────────────────────

function TopicView({
  kertas,
  hub,
  topic,
  onBack,
}: {
  kertas: BMKertas;
  hub: BMHub;
  topic: BMTopic;
  onBack: () => void;
}) {
  // Premium full-page renderer for Sistem Bahasa topics
  if (topic.topicType === "tatabahasa") {
    const premiumContent = getSistemBahasaContent(topic.id);
    if (premiumContent) {
      return <SistemBahasaTopicDetail topic={premiumContent} onBack={onBack} />;
    }
  }

  // Premium full-page exam prep hub for Karangan Pendek
  if (topic.id === "karangan-pendek") {
    return <KaranganPendekHub topic={topic} color={hub.color} onBack={onBack} />;
  }

  // Premium full-page exam prep hub for Karangan Panjang (Respons Terbuka)
  if (topic.id === "respons-terbuka") {
    return <KaranganPanjangHub topic={topic} color={hub.color} onBack={onBack} />;
  }

  // Ultimate Penanda Wacana reference — colourful collapsible cards
  if (topic.id === "penanda-wacana-lengkap") {
    return <PenandaWacanaLengkapHub topic={topic} color={hub.color} onBack={onBack} />;
  }

  // Ultimate Peribahasa Bank reference — search, filters, badges, collapsible categories
  if (topic.id === "peribahasa-bank-lengkap") {
    return <PeribahasaBankLengkapHub topic={topic} color={hub.color} onBack={onBack} />;
  }

  // Premium full-page writing workshop for Bengkel Karangan topics
  if (topic.topicType === "workshop") {
    const workshopContent = getWorkshopContent(topic.id);
    if (workshopContent) {
      return (
        <BengkelKaranganHub
          topic={topic}
          content={workshopContent}
          color={hub.color}
          onBack={onBack}
        />
      );
    }
  }

  // Karangan template library for Model Karangan Bank topics
  if (topic.topicType === "model-karangan") {
    const model = getModelKarangan(topic.id);
    if (model) {
      return <ModelKaranganHub topic={topic} model={model} color={hub.color} onBack={onBack} />;
    }
  }

  return (
    <div>
      <PageHeader
        breadcrumb={["BM", kertas.shortLabel, hub.shortLabel, topic.label]}
        onBack={onBack}
        accent={hub.color}
      />

      {/* Topic header */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {topic.badge && <Badge label={topic.badge} color={hub.color} />}
          {topic.genre && <Badge label={topic.genre} color={hub.color} />}
        </div>
        <h2 className="font-display text-xl font-bold text-white">{topic.label}</h2>
      </div>

      {/* Study tools row */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { icon: <BookOpen className="h-3.5 w-3.5" />, label: "Nota", color: hub.color },
          { icon: <Zap className="h-3.5 w-3.5" />, label: "Kuiz", color: "#FBBF24" },
          { icon: <Star className="h-3.5 w-3.5" />, label: "Kad Imbas", color: "#34D399" },
        ].map((tool) => (
          <button
            key={tool.label}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/50 transition-all hover:bg-white/[0.07]"
          >
            <span style={{ color: tool.color }}>{tool.icon}</span>
            {tool.label}
          </button>
        ))}
      </div>

      {/* Topic content */}
      <TopicDetailRenderer topic={topic} hubColor={hub.color} />
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function BMWorldPage({
  onBack,
  mode = "default",
}: {
  onBack: () => void;
  mode?: "default" | "quiz";
}) {
  const [history, setHistory] = useState<BMScreen[]>([
    mode === "quiz" ? { type: "k1-quiz" } : { type: "landing" },
  ]);
  const screen = history[history.length - 1];

  function push(next: BMScreen) {
    setHistory((prev) => [...prev, next]);
  }

  function pop() {
    if (history.length === 1) {
      onBack();
    } else {
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  // Resolve current context
  const kertas =
    screen.type === "k1-quiz"
      ? getBMKertas("k1")
      : screen.type !== "landing" && screen.type !== "objektif-quiz"
        ? getBMKertas(screen.kertasId)
        : undefined;

  const hub =
    (screen.type === "hub" || screen.type === "topic") && kertas
      ? getBMHub(screen.kertasId, screen.hubId)
      : undefined;

  const topic =
    screen.type === "topic" && hub
      ? getBMTopic(screen.kertasId, screen.hubId, screen.topicId)
      : undefined;

  return (
    <div
      className="min-h-screen px-4 py-6 pb-[calc(var(--mobile-content-bottom,90px)+2rem)] sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #050816 0%, #080c1a 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        {screen.type === "landing" && (
          <LandingView
            onSelectKertas={(id) => push({ type: "kertas", kertasId: id })}
            onBack={onBack}
          />
        )}

        {/* K1: redesigned quiz prep view for the dedicated quiz route */}
        {screen.type === "k1-quiz" && kertas && (
          <K1QuizView
            kertas={kertas}
            onSelectObjektif={(setIndex) => push({ type: "objektif-quiz", setIndex })}
            onBack={pop}
          />
        )}

        {/* Existing hub grid used by non-quiz BM worlds */}
        {screen.type === "kertas" && kertas && (
          <KertasView
            kertas={kertas}
            onSelectHub={(hubId) => push({ type: "hub", kertasId: screen.kertasId, hubId })}
            onBack={pop}
          />
        )}

        {/* Objektif UASA mini quiz runner */}
        {screen.type === "objektif-quiz" && (
          <ObjektifKuizView
            key={screen.setIndex}
            setIndex={screen.setIndex}
            onBack={pop}
            onNextSet={
              screen.setIndex < 2
                ? () =>
                    push({ type: "objektif-quiz", setIndex: (screen.setIndex + 1) as 0 | 1 | 2 })
                : undefined
            }
          />
        )}

        {screen.type === "hub" && kertas && hub && (
          <HubView
            kertas={kertas}
            hub={hub}
            onSelectTopic={(topicId) =>
              push({ type: "topic", kertasId: screen.kertasId, hubId: screen.hubId, topicId })
            }
            onBack={pop}
          />
        )}

        {screen.type === "topic" && kertas && hub && topic && (
          <TopicView kertas={kertas} hub={hub} topic={topic} onBack={pop} />
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
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
import { getPremiumKomsasWork, type KomsasWork, type KomsasExamQuestion } from "@/data/bm-komsas-premium";
import { SistemBahasaTopicDetail } from "@/components/SistemBahasaTopicDetail";
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
  | { type: "kertas"; kertasId: "k1" | "k2" }
  | { type: "hub"; kertasId: "k1" | "k2"; hubId: string }
  | { type: "topic"; kertasId: "k1" | "k2"; hubId: string; topicId: string };

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
  return (
    <p className="mb-3 text-[11px] font-black tracking-wide text-[#818CF8]">
      {children}
    </p>
  );
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
            style={{ background: "radial-gradient(circle at 35% 30%, #F472B640, #F472B618)", boxShadow: "0 0 24px rgba(244,114,182,0.4)" }}
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
            TATABAHASA · PEMAHAMAN · KOMSAS · NOVEL · KARANGAN · PERIBAHASA · ULASAN · RINGKASAN
          </p>
        </div>
      </div>

      {/* Exam path intro */}
      <div className="mb-6">
        <SectionLabel>Laluan Peperiksaan</SectionLabel>
        <p className="text-sm text-white/50">
          Pilih kertas untuk mula belajar. Setiap kertas mempunyai hub tersendiri dengan
          modul yang tersusun dari asas hingga peringkat cemerlang.
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
          { label: "Jumlah Topik", value: `${BM_KERTAS.reduce((s, k) => s + k.hubs.reduce((s2, h) => s2 + h.topics.length, 0), 0)}` },
          { label: "Kertas UASA", value: "2" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kertas.hubs.map((hub) => (
          <HubCard key={hub.id} hub={hub} onSelect={() => onSelectHub(hub.id)} />
        ))}
      </div>
    </div>
  );
}

function HubCard({ hub, onSelect }: { hub: BMHub; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-200 hover:-translate-y-1"
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
      tatabahasa: "Tatabahasa", pemahaman: "Teknik", komsas: "KOMSAS", novel: "Novel",
      "ringkasan-ulasan": "Kemahiran", "karangan-pendek": "Karangan", "respons-terbuka": "Karangan",
      workshop: "Bengkel", "model-karangan": "Model", "peribahasa-bank": "Peribahasa", "essay-improvement": "Teknik",
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
            <span className="text-[9px] text-white/30">{topic.zon.split(" ").slice(0, 2).join(" ")}</span>
          )}
        </div>
        <p className="truncate text-sm font-semibold text-white">{topic.label}</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" style={{ color: hubColor }} />
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
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>Definisi</p>
          <p className="text-sm leading-relaxed text-white/80">{topic.definition}</p>
        </div>
      )}

      {/* Subtypes */}
      {topic.subtypes && topic.subtypes.length > 0 && (
        <div>
          <SectionLabel>Jenis-jenis</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topic.subtypes.map((sub) => (
              <div key={sub.name} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <p className="mb-1 text-sm font-bold text-white">{sub.name}</p>
                <p className="mb-3 text-xs text-white/45">{sub.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sub.examples.map((ex) => (
                    <span key={ex} className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
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
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Lazim</p>
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
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>Sinopsis</p>
          <p className="text-sm leading-relaxed text-white/70">{topic.sinopsis}</p>
        </div>
      )}

      {topic.tema && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>Tema</p>
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
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
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
            <KomsasHeroStat icon={<Target className="h-4 w-4" />} label="Tahap Kesukaran" value={work.difficulty} color="#34D399" />
            <KomsasHeroStat icon={<Clock className="h-4 w-4" />} label="Tempoh Pembelajaran" value={work.studyTime} color={color} />
            <KomsasHeroStat icon={<Trophy className="h-4 w-4" />} label="Fokus UASA" value={bmText(work.examFocus)} color="#FBBF24" />
          </div>
        </div>
      </section>

      <KomsasKeywordSection work={work} color={color} />

      <Tabs defaultValue="maksud" className="w-full">
        <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2">
          <TabsTrigger value="maksud" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <PenTool className="mr-1.5 h-3.5 w-3.5" /> {isStory ? "Cerita" : "Maksud"}
          </TabsTrigger>
          <TabsTrigger value="tema" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <Target className="mr-1.5 h-3.5 w-3.5" /> Tema
          </TabsTrigger>
          <TabsTrigger value="nilai" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <Heart className="mr-1.5 h-3.5 w-3.5" /> Nilai
          </TabsTrigger>
          <TabsTrigger value="exam" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <Flame className="mr-1.5 h-3.5 w-3.5" /> UASA
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
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
            <div>
              <SectionLabel>Jalan Cerita</SectionLabel>
              <div className="grid gap-3 md:grid-cols-5">
                {work.timeline.map((item, index) => (
                  <div key={item.stage} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${storyTimelineColors[index]}25`, color: storyTimelineColors[index] }}>
                        {index + 1}
                      </span>
                      <p className="text-sm font-bold text-white">{item.stage}</p>
                    </div>
                    <p className="text-xs leading-6 text-white/55">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isStory && Array.isArray(work.characters) && work.characters.length > 0 && (
            <div>
              <SectionLabel>Watak Utama</SectionLabel>
              <div className="grid gap-3 md:grid-cols-3">
                {work.characters.map((character) => (
                  <div key={character.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
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
            </div>
          )}

          {isStory && Array.isArray(work.events) && work.events.length > 0 && (
            <div>
              <SectionLabel>Peristiwa Penting</SectionLabel>
              <Accordion type="single" collapsible defaultValue="event-0" className="space-y-3">
                {work.events.map((event, index) => (
                  <AccordionItem key={event.event} value={`event-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black" style={{ background: `${color}20`, color }}>
                          E{index + 1}
                        </span>
                        <span className="font-bold text-white/85">{event.event}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <DecoderCell label="Apa berlaku" value={event.whatHappened} accent={color} />
                        <DecoderCell label="Mengapa penting" value={event.whyItMatters} accent="#FBBF24" />
                        <DecoderCell label="Fokus UASA" value={bmText(event.examFocus)} accent="#60A5FA" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <SectionLabel>{isStory ? "Bahasa Mudah" : work.id === "pantun-dua-kerat" ? "Pantun Dalam Bahasa Mudah" : "Peneroka Rangkap"}</SectionLabel>
          <Accordion type="single" collapsible defaultValue="rangkap-0" className="space-y-3">
            {(Array.isArray(work.decoder) ? work.decoder : []).map((item, index) => (
              <AccordionItem key={item.rangkap} value={`rangkap-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black" style={{ background: `${color}20`, color }}>
                      R{index + 1}
                    </span>
                    <span className="font-bold text-white/85">{item.rangkap}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <DecoderCell label={isStory ? "Bahasa Mudah" : "Bahasa Mudah"} value={item.pantunMudah} accent={color} />
                    <DecoderCell label="Maksud Mudah" value={item.maksud} accent="#60A5FA" />
                    <DecoderCell label={isStory ? "Fokus Bahagian" : "Tema Rangkap"} value={item.tema} accent="#C084FC" />
                    <DecoderCell label="Nilai + Pengajaran" value={`${item.nilai} ${item.pengajaran}`} accent="#34D399" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">Cikgu AcadeMy Terangkan</h3>
            </div>
            <div className="space-y-3">
              {(Array.isArray(work.teacherExplains) ? work.teacherExplains : []).map((explain) => (
                <p key={explain} className="rounded-xl border border-cyan-400/10 bg-black/10 p-3 text-sm leading-7 text-white/70">
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
              <h3 className="font-display text-lg font-bold text-white">{work.theme?.title ?? "Tema utama"}</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <DecoderCell label="Penjelasan" value={work.theme?.explanation ?? "Penerangan tema belum tersedia."} accent={color} />
              <DecoderCell label="Mengapa penting" value={work.theme?.whyItMatters ?? "Tema ini membantu murid memahami mesej karya."} accent="#FBBF24" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Pengajaran</SectionLabel>
            <ImportanceBadge level="Sangat Penting" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {(Array.isArray(work.lessons) ? work.lessons : []).map((lesson) => (
              <LearningCard key={lesson.value} icon={<Lightbulb className="h-4 w-4" />} item={lesson} accent="#FBBF24" />
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
              <LearningCard key={value.value} icon={<Star className="h-4 w-4" />} item={value} accent="#34D399" />
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
              {(Array.isArray(work.examBooster?.frequentPoints) ? work.examBooster.frequentPoints : []).map((point, index) => (
                <div key={point} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400/20 text-[10px] font-black text-orange-300">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/65">{bmText(point)}</p>
                </div>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="common-0" className="space-y-3">
            {(Array.isArray(work.examBooster?.commonQuestions) ? work.examBooster.commonQuestions : []).map((item, index) => (
              <AccordionItem key={item.question} value={`common-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <FileQuestion className="h-4 w-4" style={{ color }} />
                    <span className="font-bold text-white/85">Soalan Lazim {index + 1}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <DecoderCell label="Jawapan Contoh" value={bmText(item.modelAnswer ?? item.answerHint)} accent="#60A5FA" />
                    <DecoderCell label="Penjelasan" value={bmText(item.explanation ?? "Jawapan perlu disokong dengan bukti karya dan contoh yang sesuai.")} accent="#34D399" />
                    <DecoderCell label="Petua UASA" value={bmText(item.examTip ?? "Jawab dengan ayat lengkap dan terus kepada kehendak soalan.")} accent="#FBBF24" />
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
              <DecoderCell label="Tema" value={work.revision?.theme ?? "Tema belum tersedia."} accent={color} />
              <DecoderCell label="Nilai" value={work.revision?.values ?? "Nilai belum tersedia."} accent="#34D399" />
              <DecoderCell label="Pengajaran" value={work.revision?.lessons ?? "Pengajaran belum tersedia."} accent="#FBBF24" />
              <DecoderCell label="Petua UASA" value={bmText(work.revision?.examTips ?? "Jawab dengan bukti karya.")} accent="#60A5FA" />
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

function KomsasHeroStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
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
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color: accent }}>{label}</p>
      <p className="text-sm leading-6 text-white/70">{value}</p>
    </div>
  );
}

function MiniExplain({ label, text, accent }: { label: string; text: string; accent: string }) {
  return (
    <div className="mb-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color: accent }}>{label}</p>
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
      {item.schoolLife && <MiniExplain label="Contoh di sekolah" text={item.schoolLife} accent="#C084FC" />}
    </div>
  );
}

function MiniQuizPlaceholder({ work, color }: { work: KomsasWork; color: string }) {
  const quizItems = Array.isArray(work.miniQuiz) ? work.miniQuiz : [];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-black tracking-wide" style={{ color }}>Makmal Kuiz Mini</p>
          <h3 className="font-display text-lg font-bold text-white">Ruang kuiz mini tersedia</h3>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 text-right">
          <p className="text-[9px] font-black tracking-wide text-white/30">Markah</p>
          <p className="text-lg font-black text-white">0 / 0</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quizItems.map((quiz, index) => (
          <div key={quiz.question} className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
            <div className="mb-2 flex items-center gap-2 font-bold" style={{ color }}>
              {index === 0 ? <FileQuestion className="h-4 w-4" /> : index === 1 ? <Map className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
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
      style={{ borderColor: `${styles.color}35`, background: `${styles.color}18`, color: styles.color }}
    >
      <span>{styles.icon}</span>
      {level}
    </span>
  );
}

function getKeywordTags(work: KomsasWork) {
  const values = Array.isArray(work.values) ? work.values.map((item) => item.value) : [];
  const characters = Array.isArray(work.characters) ? work.characters.map((item) => item.name) : [];
  const masterCharacters = Array.isArray(work.masterCharacters) ? work.masterCharacters.map((item) => item.name) : [];
  const events = Array.isArray(work.events) ? work.events.map((item) => item.event) : [];
  const themeWords = (work.theme?.title ?? "")
    .split(/\s+/)
    .filter((word) => word.length > 5)
    .slice(0, 3);

  return Array.from(new Set([...values, ...characters, ...masterCharacters, ...themeWords, ...events]))
    .filter(Boolean)
    .slice(0, 12);
}

function KomsasKssmMasterSections({ work, color }: { work: KomsasWork; color: string }) {
  const characters = Array.isArray(work.masterCharacters) ? work.masterCharacters : [];
  const relationships = Array.isArray(work.relationshipMap) ? work.relationshipMap : [];
  const plot = Array.isArray(work.detailedPlot) ? work.detailedPlot : [];
  const events = Array.isArray(work.importantEvents) ? work.importantEvents : [];
  const examCharacters = Array.isArray(work.examCharacterAnalysis) ? work.examCharacterAnalysis : [];
  const issues = Array.isArray(work.issues) ? work.issues : [];
  const uasaQuestions = Array.isArray(work.uasaQuestions) ? work.uasaQuestions : [];
  const focus = work.keyCharacterFocus;
  const memory = work.memory60;

  return (
    <div className="space-y-6">
      {characters.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Watak & Perwatakan</SectionLabel>
            <ImportanceBadge level="Penting" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {characters.map((character) => (
              <div key={character.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2" style={{ color }}>
                    <Heart className="h-4 w-4" />
                    <p className="font-display text-lg font-bold">{character.name}</p>
                  </div>
                  <Badge label="Fail Lengkap" color={color} />
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {(Array.isArray(character.traits) ? character.traits : []).map((trait) => (
                    <span key={trait} className="rounded-lg border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-200">
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <MiniExplain label="Peranan" text={character.role ?? "Peranan belum tersedia."} accent={color} />
                  <MiniExplain label="Bukti Perwatakan" text={character.evidence ?? "Bukti umum daripada karya."} accent="#60A5FA" />
                  <MiniExplain label="Hubungan" text={character.relationships ?? "Hubungan watak membantu mesej karya."} accent="#C084FC" />
                  <MiniExplain label="Kepentingan" text={character.importance ?? "Watak ini membantu membawa tema dan pengajaran."} accent="#FBBF24" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {relationships.length > 0 && (
        <section>
          <SectionLabel>Hubungan Watak</SectionLabel>
          <div className="grid gap-3 md:grid-cols-3">
            {relationships.map((relationship) => (
              <div key={`${relationship.from}-${relationship.to}-${relationship.relation}`} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="mb-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 text-center text-sm font-black text-white">
                  {relationship.from} <span style={{ color }}>{relationship.relation}</span> {relationship.to}
                </div>
                <p className="text-xs leading-6 text-white/55">{relationship.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {plot.length > 0 && (
        <section>
          <SectionLabel>Jalan Cerita Lengkap</SectionLabel>
          <Accordion type="single" collapsible defaultValue="plot-0" className="space-y-3">
            {plot.map((item, index) => (
              <AccordionItem key={item.stage} value={`plot-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black" style={{ background: `${storyTimelineColors[index] ?? color}22`, color: storyTimelineColors[index] ?? color }}>
                      {index + 1}
                    </span>
                    <span className="font-bold text-white/85">{item.stage}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <DecoderCell label="Apa berlaku" value={item.what ?? "Isi belum tersedia."} accent={color} />
                    <DecoderCell label="Mengapa berlaku" value={item.why ?? "Sebab belum tersedia."} accent="#FBBF24" />
                    <DecoderCell label="Kesan kepada cerita" value={item.effect ?? "Kesan belum tersedia."} accent="#60A5FA" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {work.story90 && (
        <section className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-5">
          <div className="mb-3 flex items-center gap-2 text-fuchsia-300">
            <Clapperboard className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">Cerita Dalam 90 Saat</h3>
          </div>
          <p className="text-sm leading-7 text-white/75">{work.story90}</p>
        </section>
      )}

      {work.retelling3Min && (
        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <div className="mb-3 flex items-center gap-2 text-cyan-300">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">{work.kind === "story" ? "Cerita Dalam 3 Minit" : "Karya Dalam 3 Minit"}</h3>
          </div>
          <p className="text-sm leading-7 text-white/75">{work.retelling3Min}</p>
        </section>
      )}

      {issues.length > 0 && (
        <section>
          <SectionLabel>Persoalan</SectionLabel>
          <div className="grid gap-3 md:grid-cols-2">
            {issues.map((issue) => (
              <div key={issue.issue} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2" style={{ color }}>
                  <Brain className="h-4 w-4" />
                  <p className="font-bold text-white">{issue.issue}</p>
                </div>
                <p className="text-sm leading-6 text-white/60">{issue.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Peristiwa Penting</SectionLabel>
            <ImportanceBadge level="Penting" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {events.map((event, index) => (
              <div key={`${event.event}-${index}`} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl text-[10px] font-black" style={{ background: `${color}20`, color }}>
                    {index + 1}
                  </span>
                  <p className="font-bold text-white">{event.event}</p>
                </div>
                <MiniExplain label="Apa berlaku" text={event.what ?? "Peristiwa utama karya."} accent={color} />
                <MiniExplain label="Mengapa penting" text={event.whyImportant ?? "Peristiwa ini membantu membina tema."} accent="#FBBF24" />
                <MiniExplain label="Soalan mungkin keluar" text={event.possibleQuestion ?? "Jelaskan kepentingan peristiwa ini."} accent="#60A5FA" />
              </div>
            ))}
          </div>
        </section>
      )}

      {focus && (
        <section className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-5">
          <div className="mb-3 flex items-center gap-2 text-fuchsia-300">
            <Target className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">Watak Paling Penting: {focus.name}</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <DecoderCell label="Mengapa penting" value={focus.whyMatters ?? "Watak ini membawa mesej utama karya."} accent="#F0ABFC" />
            <DecoderCell label="Tema" value={focus.supportsTheme ?? "Menyokong tema utama."} accent={color} />
            <DecoderCell label="Persoalan" value={focus.supportsIssues ?? "Membantu persoalan karya."} accent="#60A5FA" />
            <DecoderCell label="Nilai & Pengajaran" value={`${focus.supportsValues ?? "Menonjolkan nilai."} ${focus.supportsLessons ?? "Menguatkan pengajaran."}`} accent="#FBBF24" />
          </div>
        </section>
      )}

      {work.authorPurpose && (
        <section className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-300">
            <Brain className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">Mengapa Cerita Ini Ditulis</h3>
          </div>
          <p className="text-sm leading-7 text-white/75">{work.authorPurpose}</p>
        </section>
      )}

      {uasaQuestions.length > 0 && (
        <section>
          <SectionLabel>Soalan Popular UASA - Skema Penuh</SectionLabel>
          <Accordion type="single" collapsible defaultValue="uasa-0" className="space-y-3">
            {uasaQuestions.map((item, index) => (
              <AccordionItem key={`${item.type}-${item.question}`} value={`uasa-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="rounded-lg px-2 py-1 text-[10px] font-black tracking-wide" style={{ background: `${color}20`, color }}>
                      {item.type === "MCQ" ? "Aneka Pilihan" : item.type}
                    </span>
                    <span className="font-bold text-white/85">{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <DecoderCell label="Skema Jawapan" value={item.answer ?? "Jawapan belum tersedia."} accent="#34D399" />
                    <DecoderCell label="Cara fikir" value={item.explanation ?? "Jawab dengan bukti karya dan ayat lengkap."} accent="#60A5FA" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {examCharacters.length > 0 && (
        <section>
          <SectionLabel>Analisis Watak UASA</SectionLabel>
          <Accordion type="single" collapsible defaultValue="exam-char-0" className="space-y-3">
            {examCharacters.map((item, index) => (
              <AccordionItem key={`${item.character}-${item.trait}`} value={`exam-char-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <FileQuestion className="h-4 w-4" style={{ color }} />
                    <span className="font-bold text-white/85">{item.character}: {item.trait}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <DecoderCell label="Watak" value={item.character} accent={color} />
                    <DecoderCell label="Bukti" value={item.evidence ?? "Bukti umum daripada karya."} accent="#60A5FA" />
                    <DecoderCell label="Jawapan Contoh" value={item.modelAnswer ?? "Jawab dengan watak, perwatakan dan bukti."} accent="#34D399" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {memory && (
        <section
          className="rounded-[1.75rem] border p-5"
          style={{
            borderColor: `${color}35`,
            background: `linear-gradient(135deg, ${color}16, rgba(52,211,153,0.08), rgba(255,255,255,0.03))`,
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color }} />
            <h3 className="font-display text-lg font-bold text-white">Hafal Dalam 60 Saat</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <MemoryChip label="Tema" value={memory.theme ?? "Tema utama"} color={color} />
            <MemoryChip label="Persoalan" value={memory.issues ?? "Persoalan utama"} color="#60A5FA" />
            <MemoryChip label="Watak Utama" value={memory.mainCharacters ?? "Watak utama"} color="#C084FC" />
            <MemoryChip label="Peristiwa Penting" value={memory.importantEvents ?? "Peristiwa utama"} color="#FB923C" />
            <MemoryChip label="Nilai" value={memory.values ?? "Nilai utama"} color="#34D399" />
            <MemoryChip label="Pengajaran" value={memory.lessons ?? "Pengajaran utama"} color="#FBBF24" />
          </div>
        </section>
      )}
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
    <div className="space-y-6">
      {spotterItems.length > 0 && (
        <section>
          <SectionLabel>Soalan Popular UASA</SectionLabel>
          <div className="grid gap-3 md:grid-cols-4">
            {spotterItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
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
        </section>
      )}

      {examinerQuestions.length > 0 && (
        <section className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
          <div className="mb-4 flex items-center gap-2 text-sky-300">
            <GraduationCap className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">Jika Saya Pemeriksa</h3>
          </div>
          <Accordion type="single" collapsible defaultValue="examiner-0" className="space-y-3">
            {examinerQuestions.map((item, index) => (
              <AccordionItem key={item.question} value={`examiner-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/10">
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <FileQuestion className="h-4 w-4" style={{ color }} />
                    <span className="font-bold text-white/85">{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <DecoderCell label="Tekan untuk lihat jawapan" value={bmText(item.modelAnswer ?? item.answerHint ?? "Jawapan belum tersedia.")} accent="#60A5FA" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {examinerQuestions.length > 0 && (
        <section>
        <SectionLabel>Jawapan Skema Penuh</SectionLabel>
        <div className="grid gap-3 md:grid-cols-2">
          {examinerQuestions.map((item) => (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
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
                  <p className="text-sm leading-6 text-white/70">{item.modelAnswer ?? item.answerHint}</p>
                  <p className="mt-2 text-xs leading-5 text-emerald-100/55">{item.examTip ?? "Tambah bukti atau contoh supaya jawapan tidak terlalu umum."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      )}

      <section className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-fuchsia-300">
          <Clapperboard className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Ringkasan Cerita</h3>
        </div>
        <p className="text-sm leading-7 text-white/75">{getTrailerSummary(work)}</p>
      </section>

      <section>
        <SectionLabel>Jika Ini Berlaku Kepada Anda</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {reflections.map((question) => (
            <div key={question} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-cyan-300">
                <Globe2 className="h-4 w-4" />
                <p className="text-[10px] font-black tracking-wide">Renung</p>
              </div>
              <p className="text-sm leading-6 text-white/70">{question}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
        <div className="mb-4 flex items-center gap-2 text-yellow-300">
          <Zap className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Hafal Dalam 60 Saat</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <MemoryChip label="Tema" value={work.revision?.theme ?? "Tema belum tersedia."} color={color} />
          <MemoryChip label="Nilai" value={work.revision?.values ?? "Nilai belum tersedia."} color="#34D399" />
          <MemoryChip label="Pengajaran" value={work.revision?.lessons ?? "Pengajaran belum tersedia."} color="#FBBF24" />
          <MemoryChip label={work.kind === "story" ? "Watak" : "Fokus"} value={getMemoryCharacter(work)} color="#C084FC" />
          <MemoryChip label="Peristiwa Penting" value={getMemoryEvent(work)} color="#60A5FA" />
          <MemoryChip label="Peringatan UASA" value={bmText(work.revision?.examTips ?? "Jawab dengan bukti karya.")} color="#FB923C" />
        </div>
      </section>

      <section className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-violet-300">
          <Brain className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Cabaran KBAT</h3>
        </div>
        <DecoderCell label={getKbatChallenge(work).question} value={getKbatChallenge(work).answer} accent="#C084FC" />
      </section>

      {work.kind === "story" && relationships.length > 0 && (
        <section>
          <SectionLabel>Hubungan Watak</SectionLabel>
          <div className="grid gap-3 md:grid-cols-3">
            {relationships.map((relationship) => (
              <div key={relationship} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
                <p className="text-sm font-black text-white">{relationship}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionLabel>Kesalahan Murid Yang Selalu Berlaku</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {mistakes.map((mistake) => (
            <div key={mistake.wrong} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="mb-2 text-sm font-bold text-rose-300">{mistake.wrong}</p>
              <p className="text-xs leading-5 text-white/45">{mistake.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[1.75rem] border p-5"
        style={{
          borderColor: `${color}35`,
          background: `linear-gradient(135deg, ${color}18, rgba(251,191,36,0.08), rgba(255,255,255,0.03))`,
          boxShadow: `0 0 40px ${color}16`,
        }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" style={{ color }} />
          <h3 className="font-display text-lg font-bold text-white">Sebelum Masuk Dewan</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-5">
          {survival.map((item) => (
            <div key={item} className="rounded-xl border border-white/[0.08] bg-black/10 p-3 text-xs font-bold leading-5 text-white/70">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MemoryChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>{label}</p>
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
    { label: "Pengajaran", focus: revision?.lessons ?? "Pengajaran yang boleh diamalkan.", ...high },
    { label: work.kind === "story" ? "Watak dan Perwatakan" : "Maksud Rangkap", focus: work.kind === "story" ? getMemoryCharacter(work) : "Bahasa mudah dan maksud tersirat.", ...mid },
  ];
  return work.kind === "story"
    ? [...base, { label: "Peristiwa Penting", focus: getMemoryEvent(work), ...mid }, { label: "Latar / Konflik", focus: "Fahami punca konflik dan peleraian.", ...low }]
    : [...base, { label: "Gaya Bahasa", focus: "Fokus simbol, metafora atau perbandingan utama.", ...low }];
}

function getExaminerQuestions(work: KomsasWork): KomsasExamQuestion[] {
  const revision = work.revision;
  const extras = work.kind === "story"
    ? [
        makeExamQuestion("Apakah konflik utama yang berlaku dalam karya ini?", `Konflik utama berkaitan ${(work.examFocus ?? "peristiwa penting").toLowerCase()} dan perlu dihuraikan dengan peristiwa penting.`, "Konflik ialah masalah yang menggerakkan cerita.", "Sebut punca konflik dan kesannya."),
        makeExamQuestion("Bagaimanakah karya ini boleh dikaitkan dengan kehidupan murid?", `${work.title ?? "Karya ini"} mengajar murid supaya mengamalkan pengajaran seperti ${(revision?.lessons ?? "nilai baik").toLowerCase()}.`, "Soalan KBAT mahu kaitan dengan diri murid.", "Berikan contoh sekolah atau keluarga."),
      ]
    : [
        makeExamQuestion("Apakah maksud rangkap penting dalam karya ini?", `Rangkap penting menyampaikan ${(work.theme?.title ?? "mesej utama").toLowerCase()} secara mudah dan dekat dengan kehidupan.`, "Puisi perlu difahami melalui maksud tersirat.", "Jangan salin semula rangkap."),
        makeExamQuestion("Bagaimanakah karya ini sesuai untuk remaja?", `${work.title ?? "Karya ini"} sesuai kerana mengajar remaja tentang ${(revision?.values ?? "nilai murni").toLowerCase()}.`, "KBAT mahu hubungan dengan kehidupan murid.", "Beri contoh sekolah."),
      ];
  const baseQuestions = Array.isArray(work.examBooster?.commonQuestions) ? work.examBooster.commonQuestions : [];
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
  return (Array.isArray(work.characters) ? work.characters : [])
    .map((c) => c?.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ") || (work.kind === "poem" ? "Aku lirik / mesej penyair" : "Watak utama");
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
      { wrong: "Menganggap Kelabu ialah watak jahat.", fix: "Betulkan: Kelabu bukan jahat. Kelabu hanya kucing baharu yang manja; konflik berlaku kerana perhatian keluarga tidak seimbang." },
      { wrong: "Menganggap Oren marah tanpa sebab.", fix: "Betulkan: Oren terasa tersisih kerana layanan keluarga berubah selepas Kelabu hadir." },
      { wrong: "Tidak memahami maksud penyesalan Ayah.", fix: "Betulkan: Penyesalan Ayah menunjukkan kesedaran bahawa kasih sayang terhadap Oren telah diabaikan." },
    ];
  }
  if (work.id === "cerpen-kuih-bakul") {
    return [
      { wrong: "Menyamakan tema dengan pengajaran.", fix: "Betulkan: tema ialah idea besar, iaitu kebenaran dan kasih sayang keluarga. Pengajaran ialah ayat tindakan seperti kita hendaklah bercakap benar." },
      { wrong: "Menganggap Lim Meng punca sebenar masalah.", fix: "Betulkan: Lim Meng ialah mangsa tuduhan. Punca sebenar berkaitan perbuatan Lim Foong dan prasangka Lim Pooi." },
      { wrong: "Tidak memahami peranan Sim Pau.", fix: "Betulkan: Sim Pau ialah watak penting yang mendedahkan kebenaran dan membantu menyatukan semula keluarga." },
    ];
  }
  return [
    { wrong: "Menyamakan tema dengan pengajaran.", fix: `Betulkan: tema ialah idea besar seperti "${work.revision?.theme ?? "tema utama"}". Pengajaran ialah ayat tindakan.` },
    { wrong: "Menulis nilai tanpa contoh.", fix: "Betulkan: tulis nilai + bukti ringkas daripada karya." },
    { wrong: work.kind === "story" ? "Menulis watak tanpa perwatakan." : "Menyalin maksud tanpa huraian.", fix: work.kind === "story" ? "Betulkan: nyatakan watak, sifat dan bukti." : "Betulkan: jelaskan maksud dengan bahasa sendiri." },
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
          <p className="mb-1 text-[9px] font-black tracking-wide" style={{ color }}>Sinopsis</p>
          <p className="text-sm leading-relaxed text-white/70">{topic.sinopsis}</p>
        </div>
      )}

      {topic.watak && topic.watak.length > 0 && (
        <div>
          <SectionLabel>Watak & Perwatakan</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {topic.watak.map((w) => (
              <div key={w.nama} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-bold text-white">{w.nama}</p>
                  <span className="text-[9px] font-bold text-white/30">{w.peranan}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {w.perwatakan.map((p) => (
                    <span key={p} className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/55">
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
            <p className="mb-3 text-[9px] font-black tracking-wide" style={{ color: accent }}>{label}</p>
            <ul className="space-y-1.5">
              {value.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
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
    <div className="space-y-6">
      {topic.description && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
        </div>
      )}

      {topic.steps && topic.steps.length > 0 && (
        <div>
          <SectionLabel>Langkah-langkah</SectionLabel>
          <div className="space-y-2.5">
            {topic.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
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

      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <div className="rounded-2xl border border-[#818CF8]/20 bg-[#818CF8]/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-[#818CF8]">📌 Perkara Utama</p>
          <ul className="space-y-2">
            {topic.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#818CF8]" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      )}

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
  { pw: "Antara",          isi: "kesan cuaca panas ialah membahayakan kesihatan manusia." },
  { pw: "Selain itu,",     isi: "aktiviti harian turut terjejas." },
  { pw: "Seterusnya,",     isi: "sumber air semakin berkurangan." },
  { pw: "Di samping itu,", isi: "tanaman pertanian boleh rosak." },
  { pw: "Tambahan pula,",  isi: "risiko kebakaran meningkat." },
  { pw: "Akhir sekali,",   isi: "cuaca panas boleh menyebabkan strok haba." },
];

function RangkaRingkasanDetail({ color }: { color: string }) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <span className="text-2xl">📖</span>
        <div>
          <p className="text-[10px] font-black tracking-wide mb-0.5" style={{ color }}>Formula Ringkasan UASA</p>
          <p className="text-sm text-white/70">Ikuti tiga langkah ini untuk mendapat markah penuh dalam soalan ringkasan.</p>
        </div>
      </div>

      {/* Langkah 1 */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black" style={{ background: `${color}30`, color }}>1</span>
          <p className="text-sm font-bold text-white">Kenal Pasti Kata Kunci Soalan</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <p className="text-[10px] font-black tracking-wide text-white/35 mb-1">Contoh</p>
          <p className="text-sm text-white/65 italic">"Tulis ringkasan tentang kesan cuaca panas."</p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3">
          <span className="text-base mt-0.5">✅</span>
          <div>
            <p className="text-[10px] font-black tracking-wide text-emerald-400 mb-0.5">Kata Kunci Soalan</p>
            <p className="text-base font-black text-white">Kesan Cuaca Panas</p>
          </div>
        </div>
      </div>

      {/* Langkah 2 */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black" style={{ background: `${color}30`, color }}>2</span>
          <p className="text-sm font-bold text-white">Kenal Pasti Isi Penting Daripada Petikan</p>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}20`, color }}>{i + 1}</span>
              <p className="text-[11px] font-bold text-white/35 mr-2 shrink-0">Isi {i + 1} →</p>
              <div className="flex-1 border-b border-dashed border-white/[0.15] pb-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Langkah 3 */}
      <div className="rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/8 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black" style={{ background: `${color}30`, color }}>3</span>
          <p className="text-sm font-bold text-white">Masukkan Semua Isi Dalam <span className="text-white underline decoration-dotted">SATU Perenggan</span></p>
        </div>
        <p className="text-[10px] font-black tracking-wide text-[#A78BFA]">📌 Rangka Ringkasan</p>
        <div className="space-y-2">
          {[
            ["Antara",          "Isi 1"],
            ["Selain itu,",     "Isi 2"],
            ["Seterusnya,",     "Isi 3"],
            ["Di samping itu,", "Isi 4"],
            ["Tambahan pula,",  "Isi 5"],
            ["Akhir sekali,",   "Isi 6"],
          ].map(([pw, slot], i) => (
            <div key={i} className="flex items-baseline gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5">
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
              <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-0.5">Kata Kunci Soalan</p>
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
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black" style={{ background: `${color}20`, color }}>{i + 1}</span>
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
                    <span className="font-bold text-white">{j.pw}</span>{" "}{j.isi}{" "}
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
        <p className="mb-4 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Yang Sering Dilakukan Murid</p>
        <div className="space-y-2">
          {RANGKA_KESALAHAN.map((k, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-rose-500/10 bg-rose-500/5 px-4 py-2.5">
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
                <div className="rounded-xl border px-3 py-2 text-center" style={{ borderColor: `${color}40`, background: `${color}12` }}>
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
            <p className="text-sm text-white/80 italic">Ringkasan yang mendapat markah tinggi bukan kerana ayat yang panjang, tetapi kerana isi yang tepat dan menepati kehendak soalan.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── TEKNIK MENJAWAB RINGKASAN PREMIUM ───────────────────────────────────────

const FAKTA_PENTING = [
  { icon: "📌", label: "Bahagian C" },
  { icon: "📌", label: "15 Markah" },
  { icon: "📌", label: "Maks. 100 Patah Perkataan" },
  { icon: "📌", label: "SATU Perenggan" },
  { icon: "📌", label: "Tiada Pendahuluan" },
  { icon: "📌", label: "Tiada Penutup" },
  { icon: "📌", label: "Fokus Kehendak Soalan" },
];

const FORMULA_EMAS = [
  { langkah: "Langkah 1", isi: "Kenal pasti kata kunci soalan" },
  { langkah: "Langkah 2", isi: "Gariskan isi penting dalam petikan" },
  { langkah: "Langkah 3", isi: "Pilih sekurang-kurangnya 5 hingga 6 isi" },
  { langkah: "Langkah 4", isi: "Susun isi mengikut urutan" },
  { langkah: "Langkah 5", isi: "Gunakan penanda wacana" },
  { langkah: "Langkah 6", isi: "Semak jumlah perkataan" },
];

const PENANDA_WACANA = [
  { kata: "Antara",        warna: "from-[#6366F1]/30 to-[#8B5CF6]/20", border: "#6366F1" },
  { kata: "Selain itu",    warna: "from-[#0EA5E9]/30 to-[#38BDF8]/20", border: "#0EA5E9" },
  { kata: "Di samping itu",warna: "from-[#10B981]/30 to-[#34D399]/20", border: "#10B981" },
  { kata: "Seterusnya",    warna: "from-[#F59E0B]/30 to-[#FBBF24]/20", border: "#F59E0B" },
  { kata: "Dalam pada itu",warna: "from-[#EC4899]/30 to-[#F472B6]/20", border: "#EC4899" },
  { kata: "Tambahan pula", warna: "from-[#8B5CF6]/30 to-[#A78BFA]/20", border: "#8B5CF6" },
  { kata: "Selanjutnya",   warna: "from-[#06B6D4]/30 to-[#22D3EE]/20", border: "#06B6D4" },
  { kata: "Akhir sekali",  warna: "from-[#F97316]/30 to-[#FB923C]/20", border: "#F97316" },
];

const KESALAHAN = [
  "Menulis pendahuluan",
  "Menulis penutup",
  "Melebihi 100 patah perkataan",
  "Mengambil isi yang tidak berkaitan",
  "Tidak menggunakan penanda wacana",
  "Menyalin bulat-bulat keseluruhan ayat",
  "Tidak menyemak ejaan",
];

const STRATEGI_MARKAH = [
  "Cari kehendak soalan dahulu",
  "Ambil isi yang tepat",
  "Gunakan penanda wacana",
  "Pastikan ayat gramatis",
  "Semak ejaan",
  "Pastikan tidak melebihi 100 patah perkataan",
];

const CONTOH_PETIKAN = `Kegiatan berkebun memberikan banyak faedah kepada individu dan masyarakat. Melalui aktiviti ini, seseorang dapat memperoleh bekalan makanan yang segar dan berkhasiat tanpa perlu bergantung sepenuhnya kepada kedai. Selain itu, berkebun dapat mengurangkan tekanan dan menenangkan fikiran kerana aktiviti ini melibatkan sentuhan langsung dengan alam semula jadi. Individu yang sering berkebun juga didapati lebih cergas dan sihat kerana mereka bergerak aktif semasa menjaga tanaman. Di samping itu, aktiviti berkebun secara berkumpulan dapat memupuk semangat kerjasama dan mempererat hubungan antara ahli komuniti. Melalui perkongsian ilmu dan hasil kebun, hubungan kejiranan turut dapat diperkukuhkan. Kegiatan ini juga membantu menghijaukanpersekitaran dan menyumbang kepada kualiti udara yang lebih baik.`;

const KATA_KUNCI_SOALAN = "Nyatakan faedah kegiatan berkebun berdasarkan petikan di atas.";

const ISI_PENTING = [
  { isi: "Memperoleh bekalan makanan segar dan berkhasiat.", terima: true, sebab: "Berkaitan langsung dengan faedah berkebun kepada individu." },
  { isi: "Mengurangkan tekanan dan menenangkan fikiran.", terima: true, sebab: "Faedah psikologi yang jelas dinyatakan dalam petikan." },
  { isi: "Individu lebih cergas dan sihat kerana bergerak aktif.", terima: true, sebab: "Faedah fizikal yang eksplisit dalam petikan." },
  { isi: "Memupuk semangat kerjasama dan mempererat hubungan komuniti.", terima: true, sebab: "Faedah sosial yang dinyatakan dengan jelas." },
  { isi: "Menghijaukan persekitaran dan memperbaiki kualiti udara.", terima: true, sebab: "Faedah alam sekitar yang disebut di penghujung petikan." },
  { isi: "Berkebun adalah hobi yang menyeronokkan.", terima: false, sebab: "Maklumat ini TIDAK terdapat dalam petikan. Jangan tambah maklumat sendiri." },
];

const JAWAPAN_CONTOH = `Antara faedah kegiatan berkebun ialah individu dapat memperoleh bekalan makanan yang segar dan berkhasiat. Selain itu, aktiviti ini dapat mengurangkan tekanan dan menenangkan fikiran. Di samping itu, individu yang berkebun menjadi lebih cergas dan sihat kerana sentiasa bergerak aktif. Seterusnya, berkebun secara berkumpulan dapat memupuk semangat kerjasama dan mempererat hubungan komuniti. Akhir sekali, kegiatan berkebun turut membantu menghijaukan persekitaran dan meningkatkan kualiti udara.`;

const CABARAN_SOALAN = [
  {
    isi: "Berkebun boleh mengurangkan tekanan dan menenangkan fikiran.",
    terima: true,
    penerangan: "✅ DITERIMA — Isi ini terdapat dengan jelas dalam petikan. Ia merupakan faedah psikologi yang berkaitan dengan kehendak soalan.",
  },
  {
    isi: "Kegiatan berkebun memerlukan banyak peralatan mahal.",
    terima: false,
    penerangan: "❌ DITOLAK — Maklumat ini langsung tidak terdapat dalam petikan. Jangan tambah maklumat dari luar walaupun ia benar dalam kehidupan sebenar.",
  },
  {
    isi: "Berkebun secara berkumpulan mempererat hubungan kejiranan.",
    terima: true,
    penerangan: "✅ DITERIMA — Isi ini terdapat dalam petikan. Ia menggambarkan faedah sosial kegiatan berkebun.",
  },
  {
    isi: "Aktiviti berkebun mengambil masa yang lama.",
    terima: false,
    penerangan: "❌ DITOLAK — Ini bukan maklumat yang terdapat dalam petikan. Murid yang menulis isi ini akan kehilangan markah.",
  },
];

function CabaranInteraktif() {
  const [jawapan, setJawapan] = useState<Record<number, boolean | null>>({});
  const [dedah, setDedah] = useState<Record<number, boolean>>({});

  const pilih = (i: number, pilihan: boolean) => {
    if (dedah[i]) return;
    setJawapan((prev) => ({ ...prev, [i]: pilihan }));
    setDedah((prev) => ({ ...prev, [i]: true }));
  };

  return (
    <div className="space-y-4">
      {CABARAN_SOALAN.map((s, i) => {
        const telahJawab = dedah[i];
        const betul = telahJawab && jawapan[i] === s.terima;
        return (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
            <p className="text-sm font-semibold text-white/90 leading-relaxed">
              <span className="mr-2 rounded-full bg-[#FBBF24]/20 px-2 py-0.5 text-[10px] font-black text-[#FBBF24]">ISI {i + 1}</span>
              {s.isi}
            </p>
            {!telahJawab ? (
              <div className="flex gap-3">
                <button
                  onClick={() => pilih(i, true)}
                  className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500/20"
                >
                  ✅ Diterima
                </button>
                <button
                  onClick={() => pilih(i, false)}
                  className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-400 transition-all hover:bg-rose-500/20"
                >
                  ❌ Ditolak
                </button>
              </div>
            ) : (
              <div className={`rounded-xl border p-3 text-xs leading-relaxed ${betul ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
                {betul ? "🎉 Betul! " : "💡 Cuba lagi. "}{s.penerangan}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RingkasanPremiumDetail({ color }: { color: string }) {
  return (
    <div className="space-y-8">

      {/* Pengenalan */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <p className="text-sm leading-relaxed text-white/75">
          Ringkasan ialah soalan <span className="font-bold text-white">Bahagian C</span> yang memerlukan murid mengenal pasti isi penting daripada petikan dan menulis semula dalam bentuk ringkas menggunakan ayat gramatis.
        </p>
      </div>

      {/* Fakta Penting */}
      <div>
        <SectionLabel>Fakta Penting Ringkasan</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {FAKTA_PENTING.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
              <span className="text-base">{f.icon}</span>
              <p className="text-xs font-semibold text-white/85">{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Emas */}
      <div>
        <SectionLabel>Formula Emas Ringkasan</SectionLabel>
        <div className="space-y-2">
          {FORMULA_EMAS.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}30`, color }}>
                {i + 1}
              </span>
              <div>
                <p className="text-[10px] font-black tracking-wide mb-0.5" style={{ color }}>{f.langkah}</p>
                <p className="text-sm text-white/80">{f.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Penanda Wacana */}
      <div>
        <SectionLabel>Penanda Wacana Markah Tinggi</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PENANDA_WACANA.map((p, i) => (
            <div key={i} className={`rounded-2xl border p-3 text-center bg-gradient-to-br ${p.warna}`} style={{ borderColor: `${p.border}40` }}>
              <p className="text-sm font-bold text-white">{p.kata}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kesalahan Lazim */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
        <p className="mb-4 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Yang Sering Dilakukan Murid</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {KESALAHAN.map((k, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-rose-500/10 bg-rose-500/5 px-3 py-2.5">
              <span className="mt-0.5 shrink-0 text-base">❌</span>
              <p className="text-sm text-white/70">{k}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contoh Lengkap */}
      <div>
        <SectionLabel>Contoh Ringkasan Lengkap</SectionLabel>
        <div className="space-y-4">

          {/* Petikan */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="mb-2 text-[9px] font-black tracking-wide text-white/40">Petikan</p>
            <p className="text-sm leading-relaxed text-white/70 italic">{CONTOH_PETIKAN}</p>
          </div>

          {/* Kata Kunci */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#FBBF24]/30 bg-[#FBBF24]/8 p-4">
            <span className="text-lg">🔑</span>
            <div>
              <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-1">Kata Kunci Soalan</p>
              <p className="text-sm font-semibold text-white/90">{KATA_KUNCI_SOALAN}</p>
            </div>
          </div>

          {/* Isi Penting */}
          <div>
            <p className="mb-3 text-[9px] font-black tracking-wide text-white/40">Isi Penting Yang Dikenal Pasti</p>
            <div className="space-y-2">
              {ISI_PENTING.map((isi, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-xl border p-3 ${isi.terima ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/20 bg-rose-500/5"}`}>
                  <span className="mt-0.5 shrink-0 text-base">{isi.terima ? "✅" : "❌"}</span>
                  <div>
                    <p className="text-sm text-white/80">{isi.isi}</p>
                    <p className={`mt-0.5 text-[11px] ${isi.terima ? "text-emerald-400" : "text-rose-400"}`}>{isi.sebab}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jawapan Lengkap */}
          <div className="rounded-2xl border border-[#6366F1]/30 bg-[#6366F1]/8 p-5">
            <p className="mb-2 text-[9px] font-black tracking-wide text-[#A78BFA]">Jawapan Ringkasan (80 patah perkataan)</p>
            <p className="text-sm leading-relaxed text-white/80">{JAWAPAN_CONTOH}</p>
          </div>
        </div>
      </div>

      {/* Strategi Markah Penuh */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <p className="mb-4 text-[9px] font-black tracking-wide text-emerald-400">✅ Strategi Dapat Markah Penuh</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {STRATEGI_MARKAH.map((s, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-3 py-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[9px] font-black text-emerald-400">{i + 1}</span>
              <p className="text-sm text-white/80">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cabaran Interaktif */}
      <div>
        <SectionLabel>Cabaran Ringkasan Interaktif</SectionLabel>
        <div className="mb-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="text-[10px] font-black tracking-wide text-white/40 mb-2">Soalan Latihan</p>
          <p className="text-sm text-white/75 italic">{CONTOH_PETIKAN}</p>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#FBBF24]/20 bg-[#FBBF24]/8 p-3">
            <span>🔑</span>
            <p className="text-sm font-semibold text-white/90">{KATA_KUNCI_SOALAN}</p>
          </div>
        </div>
        <p className="mb-3 text-xs text-white/50">Pilih sama ada setiap isi di bawah patut diterima atau ditolak dalam ringkasan kamu.</p>
        <CabaranInteraktif />
      </div>

      {/* Rangka Ringkasan Markah Tinggi */}
      <div>
        <SectionLabel>Rangka Ringkasan Markah Tinggi</SectionLabel>

        {/* Langkah 1 — Kata Kunci */}
        <div className="mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}30`, color }}>1</span>
            <p className="text-sm font-bold text-white">Kenal Pasti Kata Kunci Soalan</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-black tracking-wide text-white/35 mb-1">Contoh Soalan</p>
            <p className="text-sm text-white/70 italic">"Tulis ringkasan tentang kesan cuaca panas."</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3">
            <span className="text-base">✅</span>
            <div>
              <p className="text-[10px] font-black tracking-wide text-emerald-400 mb-0.5">Kata Kunci Soalan</p>
              <p className="text-sm font-bold text-white">Kesan Cuaca Panas</p>
              <p className="text-[11px] text-white/50 mt-0.5">Semua isi yang dipilih mesti berkaitan dengan kata kunci ini.</p>
            </div>
          </div>
        </div>

        {/* Langkah 2 — Kenal Pasti Isi */}
        <div className="mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}30`, color }}>2</span>
            <p className="text-sm font-bold text-white">Kenal Pasti Isi Penting</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {["Isi 1","Isi 2","Isi 3","Isi 4","Isi 5","Isi 6"].map((label, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black" style={{ background: `${color}25`, color }}>{i + 1}</span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-white/40 mb-0.5">{label}</p>
                  <div className="h-px w-full rounded-full bg-white/[0.10]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Langkah 3 — Rangka */}
        <div className="mb-4 rounded-2xl border border-[#6366F1]/25 bg-[#6366F1]/8 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}30`, color }}>3</span>
            <p className="text-sm font-bold text-white">Susun Mengikut Rangka Ringkasan</p>
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-white/75">
            {[
              ["Antara",         "Isi 1"],
              ["Selain itu,",    "Isi 2"],
              ["Seterusnya,",    "Isi 3"],
              ["Di samping itu,","Isi 4"],
              ["Tambahan pula,", "Isi 5"],
              ["Akhir sekali,",  "Isi 6"],
            ].map(([pw, isi], i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-bold text-white shrink-0">{pw}</span>
                <span className="flex-1 border-b border-dashed border-white/[0.15] pb-0.5 text-[11px] text-white/40">({isi})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contoh Lengkap */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-4">
          <p className="text-[9px] font-black tracking-wide text-white/35">Contoh Lengkap</p>

          {/* Kata kunci */}
          <div className="flex items-center gap-3 rounded-xl border border-[#FBBF24]/20 bg-[#FBBF24]/8 px-4 py-3">
            <span>📌</span>
            <div>
              <p className="text-[10px] font-black tracking-wide text-[#FBBF24] mb-0.5">Kata Kunci Soalan</p>
              <p className="text-sm font-bold text-white">Kesan Cuaca Panas</p>
            </div>
          </div>

          {/* Isi dikenal pasti */}
          <div>
            <p className="mb-2 text-[10px] font-black tracking-wide text-white/35">📌 Isi yang Dikenal Pasti</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["Isi 1","Membahayakan kesihatan manusia"],
                ["Isi 2","Menjejaskan aktiviti harian"],
                ["Isi 3","Mengurangkan sumber air"],
                ["Isi 4","Merosakkan tanaman pertanian"],
                ["Isi 5","Meningkatkan risiko kebakaran"],
                ["Isi 6","Menyebabkan strok haba"],
              ].map(([label, isi], i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black" style={{ background: `${color}25`, color }}>{i + 1}</span>
                  <div>
                    <p className="text-[10px] font-bold text-white/35">{label}</p>
                    <p className="text-xs text-white/75">{isi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jawapan ringkasan */}
          <div>
            <p className="mb-2 text-[10px] font-black tracking-wide text-white/35">📌 Jawapan Ringkasan</p>
            <div className="rounded-xl border border-[#6366F1]/25 bg-[#6366F1]/8 p-4">
              <p className="text-sm leading-relaxed text-white/80">
                <span className="font-bold text-white">Antara</span> kesan cuaca panas ialah membahayakan kesihatan manusia.{" "}
                <span className="font-bold text-white">Selain itu,</span> aktiviti harian turut terjejas.{" "}
                <span className="font-bold text-white">Seterusnya,</span> sumber air semakin berkurangan.{" "}
                <span className="font-bold text-white">Di samping itu,</span> tanaman pertanian boleh rosak.{" "}
                <span className="font-bold text-white">Tambahan pula,</span> risiko kebakaran meningkat.{" "}
                <span className="font-bold text-white">Akhir sekali,</span> cuaca panas boleh menyebabkan strok haba.
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 px-1">
              <span className="text-[11px] text-white/40">📌 Jumlah Patah Perkataan:</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">55 patah perkataan ✓</span>
            </div>
          </div>
        </div>

        {/* Senarai Semakan */}
        <div className="mt-4 rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/8 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-[#A78BFA]">☑ Semakan Sebelum Hantar</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Kata kunci dipatuhi",
              "5–6 isi digunakan",
              "Satu perenggan",
              "Penanda wacana digunakan",
              "Tidak melebihi 100 patah perkataan",
              "Tiada pendahuluan",
              "Tiada penutup",
              "Ejaan betul",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-[#6366F1]/15 bg-[#6366F1]/5 px-3 py-2">
                <span className="text-[#A78BFA] font-bold text-sm">☑</span>
                <p className="text-sm text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Petua Cikgu AcadeMy */}
      <div className="rounded-2xl border border-[#FBBF24]/30 bg-gradient-to-br from-[#FBBF24]/10 to-[#F59E0B]/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
            👨‍🏫
          </div>
          <div>
            <p className="mb-2 text-[10px] font-black tracking-wide text-[#FBBF24]">Petua Cikgu AcadeMy</p>
            <p className="mb-3 text-sm leading-relaxed text-white/80 italic">
              "Markah ringkasan bukan bergantung kepada ayat yang cantik. Markah datang daripada keupayaan mengenal pasti isi penting dengan tepat."
            </p>
            <div className="space-y-1.5">
              {[
                "Cari kata kunci dahulu.",
                "Gariskan isi penting.",
                "Masukkan Isi 1 hingga Isi 6 ke dalam rangka.",
                "Gunakan penanda wacana.",
                "Semak jumlah patah perkataan sebelum menghantar jawapan.",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#FBBF24] font-bold shrink-0">🎯</span>
                  <p className="text-sm text-white/75">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function RingkasanUlasanDetail({ topic, color }: { topic: BMTopic; color: string }) {
  return (
    <div className="space-y-6">
      {topic.description && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/75">{topic.description}</p>
        </div>
      )}

      {topic.formula && (
        <div>
          <SectionLabel>Formula / Langkah</SectionLabel>
          <div className="space-y-2">
            {topic.formula.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
                  {i + 1}
                </span>
                <p className="text-sm text-white/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.steps && topic.steps.length > 0 && (
        <div>
          <SectionLabel>Cara Menulis</SectionLabel>
          <div className="space-y-2">
            {topic.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
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
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Lazim</p>
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
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
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
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
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
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
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Lazim</p>
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
          <p className="mb-3 text-[9px] font-black tracking-wide text-yellow-400">★ Tips Markah Penuh</p>
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
          <p className="mb-3 text-[9px] font-black tracking-wide" style={{ color }}>💡 Idea Bank</p>
          <div className="flex flex-wrap gap-2">
            {topic.ideaBank.map((idea) => (
              <span key={idea} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
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
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
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
          <p className="mb-3 text-[9px] font-black tracking-wide text-[#F472B6]">💎 Peribahasa Sesuai</p>
          <div className="space-y-2">
            {topic.peribahasa.map((p, i) => (
              <p key={i} className="text-sm italic text-white/65">"{p}"</p>
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
              <div key={i} className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
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
      {topic.peribuhasaItems && topic.peribuhasaItems.map((p, i) => (
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
            <p className="w-full text-[9px] font-bold tracking-wide text-white/30 mb-1">Sesuai untuk topik:</p>
            {p.topikSesuai.map((t) => (
              <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium" style={{ color }}>
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
                  <p className="mb-1 text-[9px] font-black tracking-wide text-rose-400">✗ Ayat Lemah</p>
                  <p className="text-sm text-white/60">{ba.lemah}</p>
                </div>
                <div className="bg-emerald-500/10 p-4">
                  <p className="mb-1 text-[9px] font-black tracking-wide text-emerald-400">✓ Ayat Cemerlang</p>
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
              <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="text-sm text-white/40 line-through">{k.biasa}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-white/20" />
                <span className="text-sm font-semibold" style={{ color }}>{k.menarik}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistakes */}
      {topic.mistakes && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesilapan Biasa dalam Karangan</p>
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
    </div>
  );
}

function TopicDetailRenderer({ topic, hubColor }: { topic: BMTopic; hubColor: string }) {
  switch (topic.topicType) {
    case "tatabahasa":     return <TatabahasaDetail topic={topic} color={hubColor} />;
    case "komsas":         return <KOMSASDetail topic={topic} color={hubColor} />;
    case "novel":          return <NovelDetail topic={topic} color={hubColor} />;
    case "pemahaman":      return <PemahamanDetail topic={topic} color={hubColor} />;
    case "rangka-ringkasan":  return <RangkaRingkasanDetail color={hubColor} />;
    case "ringkasan-premium": return <RingkasanPremiumDetail color={hubColor} />;
    case "ringkasan-ulasan": return <RingkasanUlasanDetail topic={topic} color={hubColor} />;
    case "karangan-pendek":
    case "respons-terbuka": return <KaranganDetail topic={topic} color={hubColor} />;
    case "workshop":       return <WorkshopDetail topic={topic} color={hubColor} />;
    case "model-karangan": return <ModelKaranganDetail topic={topic} color={hubColor} />;
    case "peribahasa-bank": return <PeribahsaBankDetail topic={topic} color={hubColor} />;
    case "essay-improvement": return <EssayImprovementDetail topic={topic} color={hubColor} />;
    default:               return null;
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

export function BMWorldPage({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<BMScreen[]>([{ type: "landing" }]);
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
    screen.type !== "landing"
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

        {screen.type === "kertas" && kertas && (
          <KertasView
            kertas={kertas}
            onSelectHub={(hubId) =>
              push({ type: "hub", kertasId: screen.kertasId, hubId })
            }
            onBack={pop}
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

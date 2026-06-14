import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronLeft,
  Clock,
  Drama,
  FileQuestion,
  Flame,
  GraduationCap,
  Heart,
  Lightbulb,
  Map,
  MessageCircle,
  PenTool,
  Star,
  Target,
  Trophy,
  UserRound,
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
import { getPremiumKomsasWork, type KomsasWork } from "@/data/bm-komsas-premium";
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
      className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest"
      style={{ background: `${color}25`, color }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[9px] font-black uppercase tracking-[0.28em] text-[#818CF8]">
      {children}
    </p>
  );
}

function PlaceholderChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/40">
      <Clock className="h-3 w-3" />
      {label} — Coming Soon
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
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#F472B6]/60">
              ✦ DEWAN SASTERA ✦
            </p>
            <h1 className="font-display text-2xl font-bold text-white">Bahasa Melayu</h1>
            <p className="mt-0.5 text-sm text-white/40">Nusantara Realm · Tingkatan 1</p>
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
          { label: "Topik Total", value: `${BM_KERTAS.reduce((s, k) => s + k.hubs.reduce((s2, h) => s2 + h.topics.length, 0), 0)}` },
          { label: "Kertas Exam", value: "2" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-white">{stat.value}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
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
      workshop: "Workshop", "model-karangan": "Model", "peribahasa-bank": "Peribahasa", "essay-improvement": "Teknik",
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
            className="text-[9px] font-black uppercase tracking-widest"
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
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest" style={{ color }}>Definisi</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-rose-400">⚠ Kesalahan Lazim</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-yellow-400">★ Tips UASA</p>
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
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <p className="text-sm leading-relaxed text-white/70">{topic.sinopsis}</p>
      </div>
    );
  }

  return <PremiumKomsasExperience work={work} color={color} />;
}

function PremiumKomsasExperience({ work, color }: { work: KomsasWork; color: string }) {
  const isPoem = work.kind === "poem";
  const completionValue = isPoem ? 42 : 52;

  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden rounded-[1.75rem] border p-5 sm:p-7"
        style={{
          borderColor: `${color}28`,
          background: `linear-gradient(135deg, ${color}20, rgba(255,255,255,0.035) 48%, rgba(5,8,22,0.7))`,
          boxShadow: `0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <div className="pointer-events-none absolute right-4 top-4 text-7xl font-black text-white/[0.035]">
          {isPoem ? "PUISI" : "KISAH"}
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge label={work.typeLabel} color={color} />
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-yellow-300">
              <Zap className="h-3 w-3" />
              Quick Revision
            </span>
          </div>
          <h3 className="font-display text-2xl font-black text-white sm:text-3xl">{work.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{work.intro}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <KomsasHeroStat icon={<Clock className="h-4 w-4" />} label="Study Time" value={work.studyTime} color={color} />
            <KomsasHeroStat icon={<Target className="h-4 w-4" />} label="Level" value={work.difficulty} color="#34D399" />
            <KomsasHeroStat icon={<Trophy className="h-4 w-4" />} label="Exam Mode" value="Siap ulang kaji" color="#FBBF24" />
          </div>
          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/15 p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-bold text-white/60">Learning journey</span>
              <span className="font-black" style={{ color }}>{completionValue}% unlocked</span>
            </div>
            <Progress value={completionValue} className="h-2 bg-white/10" />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard icon={<Target className="h-4 w-4" />} label="Tema Utama" value={work.quickOverview.theme} accent="#60A5FA" />
        <OverviewCard icon={<UserRound className="h-4 w-4" />} label="Watak Utama" value={work.quickOverview.mainCharacters ?? "Tiada watak khusus"} accent="#C084FC" />
        <OverviewCard icon={<Heart className="h-4 w-4" />} label="Nilai Penting" value={work.quickOverview.values} accent="#34D399" />
        <OverviewCard icon={<Lightbulb className="h-4 w-4" />} label="Pengajaran Utama" value={work.quickOverview.lesson} accent="#FBBF24" />
      </section>

      <Tabs defaultValue={isPoem ? "decoder" : "story"} className="w-full">
        <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2">
          {isPoem ? (
            <TabsTrigger value="decoder" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <PenTool className="mr-1.5 h-3.5 w-3.5" /> Decoder
            </TabsTrigger>
          ) : (
            <>
              <TabsTrigger value="story" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Story Mode
              </TabsTrigger>
              <TabsTrigger value="characters" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <UserRound className="mr-1.5 h-3.5 w-3.5" /> Watak
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="explore" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <Map className="mr-1.5 h-3.5 w-3.5" /> Explore
          </TabsTrigger>
          <TabsTrigger value="exam" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <Flame className="mr-1.5 h-3.5 w-3.5" /> Exam
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white">
            <FileQuestion className="mr-1.5 h-3.5 w-3.5" /> Quiz
          </TabsTrigger>
        </TabsList>

        {isPoem && (
          <TabsContent value="decoder" className="mt-0 space-y-5">
            <SectionLabel>Maksud Dalam Bahasa Mudah</SectionLabel>
            <Accordion type="single" collapsible defaultValue="rangkap-0" className="space-y-3">
              {work.decoder?.map((item, index) => (
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
                      <DecoderCell label="Maksud Mudah" value={item.maksud} accent={color} />
                      <DecoderCell label="Tema" value={item.tema} accent="#60A5FA" />
                      <DecoderCell label="Nilai" value={item.nilai} accent="#34D399" />
                      <DecoderCell label="Pengajaran" value={item.pengajaran} accent="#FBBF24" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        )}

        {!isPoem && (
          <TabsContent value="story" className="mt-0 space-y-6">
            <div>
              <SectionLabel>Jalan Cerita Ringkas</SectionLabel>
              <div className="space-y-3">
                {work.story?.map((stage, index) => (
                  <div key={stage.stage} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black" style={{ background: `${timelineColors[index].color}25`, color: timelineColors[index].color }}>
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-white">{stage.stage}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{stage.tone}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-white/65">{stage.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>Plot Timeline</SectionLabel>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="grid gap-3 sm:grid-cols-5">
                  {work.story?.map((stage, index) => (
                    <div key={stage.stage} className="relative rounded-xl border border-white/[0.06] bg-black/10 p-3 text-center">
                      <div className="mx-auto mb-2 h-3 w-3 rounded-full" style={{ background: timelineColors[index].color, boxShadow: `0 0 16px ${timelineColors[index].color}` }} />
                      <p className="text-xs font-black text-white">{timelineColors[index].emoji} {stage.stage}</p>
                      <p className="mt-1 text-[10px] leading-4 text-white/40">{stage.tone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {!isPoem && (
          <TabsContent value="characters" className="mt-0">
            <SectionLabel>Character Explorer</SectionLabel>
            <div className="grid gap-4 md:grid-cols-2">
              {work.characters?.map((character) => (
                <div key={character.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-black text-white">{character.name}</p>
                      <p className="text-xs text-white/40">{character.role}</p>
                    </div>
                    <Drama className="h-5 w-5 shrink-0" style={{ color }} />
                  </div>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {character.traits.map((trait) => (
                      <span key={trait} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-white/55">
                        {trait}
                      </span>
                    ))}
                  </div>
                  <MiniExplain label="Bukti dalam karya" text={character.evidence} accent="#60A5FA" />
                  <MiniExplain label="Mengapa penting" text={character.importance} accent="#FBBF24" />
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="explore" className="mt-0 space-y-6">
          <ExplorerSections work={work} color={color} />
        </TabsContent>

        <TabsContent value="exam" className="mt-0 space-y-6">
          <ExamSections work={work} color={color} />
        </TabsContent>

        <TabsContent value="quiz" className="mt-0 space-y-6">
          <MiniQuizPlaceholder color={color} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function KomsasHeroStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/35">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function OverviewCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
        {icon}
        {label}
      </div>
      <p className="text-sm leading-6 text-white/75">{value}</p>
    </div>
  );
}

function DecoderCell({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>{label}</p>
      <p className="text-sm leading-6 text-white/70">{value}</p>
    </div>
  );
}

function MiniExplain({ label, text, accent }: { label: string; text: string; accent: string }) {
  return (
    <div className="mb-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-1 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>{label}</p>
      <p className="text-xs leading-6 text-white/60">{text}</p>
    </div>
  );
}

const timelineColors = [
  { color: "#34D399", emoji: "" },
  { color: "#FBBF24", emoji: "" },
  { color: "#FB923C", emoji: "" },
  { color: "#F43F5E", emoji: "" },
  { color: "#60A5FA", emoji: "" },
];

function ExplorerSections({ work, color }: { work: KomsasWork; color: string }) {
  return (
    <>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" style={{ color }} />
          <h3 className="font-display text-lg font-bold text-white">Tema Explorer</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <DecoderCell label="Maksud tema" value={work.themeExplorer.meaning} accent={color} />
          <DecoderCell label="Mengapa muncul" value={work.themeExplorer.whyAppears} accent="#60A5FA" />
          <DecoderCell label="Bukti karya" value={work.themeExplorer.evidence} accent="#34D399" />
          <DecoderCell label="Kenapa murid perlu peduli" value={work.themeExplorer.whyCare} accent="#FBBF24" />
        </div>
      </div>

      <div>
        <SectionLabel>Persoalan Explorer</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {work.persoalan.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="mb-2 font-bold text-white">{item.title}</p>
              <MiniExplain label="Situasi dalam karya" text={item.situation} accent="#C084FC" />
              <p className="text-sm leading-6 text-white/60">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Nilai & Pengajaran</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {work.valuesLessons.map((item) => (
            <div key={item.value} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Star className="h-4 w-4" />
                <p className="font-bold">{item.value}</p>
              </div>
              <MiniExplain label="Contoh dalam karya" text={item.example} accent="#60A5FA" />
              <MiniExplain label="Pengajaran hidup sebenar" text={item.lesson} accent="#FBBF24" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Cikgu AcadeMy Explains</h3>
        </div>
        <div className="space-y-3">
          {work.teacherExplains.map((explain) => (
            <p key={explain} className="rounded-xl border border-cyan-400/10 bg-black/10 p-3 text-sm leading-7 text-white/70">
              {explain}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

function ExamSections({ work, color }: { work: KomsasWork; color: string }) {
  return (
    <>
      <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
        <div className="mb-4 flex items-center gap-2 text-orange-300">
          <Flame className="h-5 w-5" />
          <h3 className="font-display text-lg font-bold">Frequently Tested Points</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <ExamList title="Popular Themes" items={work.examBooster.themes} accent="#60A5FA" />
          <ExamList title="Popular Characters" items={work.examBooster.characters} accent="#C084FC" />
          <ExamList title="Values" items={work.examBooster.values} accent="#34D399" />
          <ExamList title="Lessons" items={work.examBooster.lessons} accent="#FBBF24" />
        </div>
      </div>

      <div>
        <SectionLabel>KBAT Corner</SectionLabel>
        <Accordion type="single" collapsible defaultValue="kbat-0" className="space-y-3">
          {work.kbat.map((item, index) => (
            <AccordionItem key={item.question} value={`kbat-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                <span className="flex items-center gap-3">
                  <Brain className="h-5 w-5" style={{ color }} />
                  <span className="font-bold text-white/85">KBAT {index + 1}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <DecoderCell label="Scenario" value={item.scenario} accent="#60A5FA" />
                  <DecoderCell label="KBAT Question" value={item.question} accent="#C084FC" />
                  <DecoderCell label="Model Answer" value={item.answer} accent="#34D399" />
                  <DecoderCell label="Explanation" value={item.explanation} accent="#FBBF24" />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <SectionLabel>Common Student Mistakes</SectionLabel>
        <div className="grid gap-3 md:grid-cols-2">
          {work.mistakes.map((mistake) => (
            <div key={mistake.wrong} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <div className="border-b border-rose-400/10 bg-rose-400/8 p-4">
                <div className="mb-1 flex items-center gap-2 text-rose-300">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="font-bold">Wrong interpretation</p>
                </div>
                <p className="text-sm text-white/70">{mistake.wrong}</p>
                <p className="mt-2 text-xs leading-5 text-rose-100/60">{mistake.whyWrong}</p>
              </div>
              <div className="bg-emerald-400/8 p-4">
                <div className="mb-1 flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  <p className="font-bold">Correct interpretation</p>
                </div>
                <p className="text-sm text-white/70">{mistake.correct}</p>
                <p className="mt-2 text-xs leading-5 text-emerald-100/60">{mistake.whyCorrect}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5" style={{ color }} />
          <h3 className="font-display text-lg font-bold text-white">Quick Revision Sheet</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          <DecoderCell label="Tema" value={work.revision.tema} accent={color} />
          <DecoderCell label="Persoalan" value={work.revision.persoalan} accent="#60A5FA" />
          <DecoderCell label="Watak" value={work.revision.watak} accent="#C084FC" />
          <DecoderCell label="Nilai" value={work.revision.nilai} accent="#34D399" />
          <DecoderCell label="Pengajaran" value={work.revision.pengajaran} accent="#FBBF24" />
        </div>
      </div>
    </>
  );
}

function ExamList({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="mb-2 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>{title}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <p key={item} className="rounded-lg bg-white/[0.04] px-2 py-1.5 text-xs text-white/65">{item}</p>
        ))}
      </div>
    </div>
  );
}

function MiniQuizPlaceholder({ color }: { color: string }) {
  const quizTypes = [
    { icon: <FileQuestion className="h-4 w-4" />, title: "MCQ", text: "Objektif cepat untuk semak tema, watak dan nilai." },
    { icon: <Map className="h-4 w-4" />, title: "Matching", text: "Padankan watak, peristiwa, nilai dan pengajaran." },
    { icon: <Brain className="h-4 w-4" />, title: "KBAT", text: "Jawapan berpandu dengan ruang model answer." },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Mini Quiz Lab</p>
          <h3 className="font-display text-lg font-bold text-white">Quiz placeholders ready</h3>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 text-right">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Score</p>
          <p className="text-lg font-black text-white">0 / 0</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quizTypes.map((quiz) => (
          <div key={quiz.title} className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
            <div className="mb-2 flex items-center gap-2 font-bold" style={{ color }}>
              {quiz.icon}
              {quiz.title}
            </div>
            <p className="text-sm leading-6 text-white/55">{quiz.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-white/45">
          <span>Progress tracker placeholder</span>
          <span>Future: quizzes, flashcards, AI video summaries</span>
        </div>
        <Progress value={0} className="h-2 bg-white/10" />
      </div>
    </div>
  );
}

function NovelDetail({ topic, color }: { topic: BMTopic; color: string }) {
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
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest" style={{ color }}>Sinopsis</p>
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
            <p className="mb-3 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>{label}</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-[#818CF8]">📌 Perkara Utama</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-yellow-400">★ Tips UASA</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-rose-400">⚠ Kesalahan Lazim</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-yellow-400">★ Tips UASA</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-rose-400">⚠ Kesalahan Lazim</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-yellow-400">★ Tips Markah Penuh</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest" style={{ color }}>💡 Idea Bank</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-[#F472B6]">💎 Peribahasa Sesuai</p>
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
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Maksud</p>
            <p className="text-sm text-white/70">{p.maksud}</p>
          </div>
          <div className="mb-3 rounded-xl border border-white/5 bg-white/5 p-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Contoh Ayat</p>
            <p className="text-sm italic text-white/60">{p.contohAyat}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <p className="w-full text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">Sesuai untuk topik:</p>
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
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-rose-400">✗ Ayat Lemah</p>
                  <p className="text-sm text-white/60">{ba.lemah}</p>
                </div>
                <div className="bg-emerald-500/10 p-4">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-emerald-400">✓ Ayat Cemerlang</p>
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
          <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-rose-400">⚠ Kesilapan Biasa dalam Karangan</p>
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

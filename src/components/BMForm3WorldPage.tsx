import { useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import {
  BM_FORM3_KERTAS,
  getBMForm3Kertas,
  getBMForm3Hub,
  getBMForm3Topic,
  type BMForm3Kertas,
  type BMForm3Hub,
  type BMForm3Topic,
} from "@/data/bm-form3-structure";
import {
  Kertas2FolderTemplate,
  Kertas2HubGrid,
  splitIntoKertas2Folders,
} from "@/components/Kertas2FolderTemplate";
import { ComingSoonScreen } from "@/components/ChapterPicker";
import { SistemBahasaTopicDetail } from "@/components/SistemBahasaTopicDetail";
import { getBMForm3SistemBahasaContent } from "@/data/bm-form3-sistem-bahasa-content";
import type { TopicSlug } from "@/data/bm-form3-sistem-bahasa";
import {
  BMForm2KomsasWorkStructure,
  BMForm2NovelStructure,
  BMKomsasPlaceholderWorkStructure,
  BMKomsasStructure,
} from "@/components/BMForm2KomsasStructure";
import {
  BM_FORM3_KOMSAS_CATEGORIES,
  BM_FORM3_KOMSAS_WORKS,
  getBMForm3KomsasWork,
} from "@/data/bm-form3-komsas-structure";
import { BM_FORM3_NOVEL_WORKS, getBMForm3NovelWork } from "@/data/bm-form3-novel-structure";
import { BMForm3UlasanContent } from "@/components/BMForm3UlasanContent";
import { BMForm3KaranganPendekContent } from "@/components/BMForm3KaranganPendekContent";
import type { BMForm3KaranganPendekSectionId } from "@/data/bm-form3-karangan-pendek";
import { BMForm3KaranganResponsTerbukaContent } from "@/components/BMForm3KaranganResponsTerbukaContent";
import type { BMForm3ResponsTerbukaSectionId } from "@/data/bm-form3-karangan-respons-terbuka";
import { BMForm3BengkelKaranganContent } from "@/components/BMForm3BengkelKaranganContent";
import type { BMForm3BengkelKaranganSectionId } from "@/data/bm-form3-bengkel-karangan";
import { BMForm3ModelKaranganBankContent } from "@/components/BMForm3ModelKaranganBankContent";
import type { BMForm3ModelKaranganSectionId } from "@/data/bm-form3-model-karangan-bank";

// Mirrors BMWorldPage.tsx (Tingkatan 1) screen-by-screen so Tingkatan 3 looks
// and behaves identically. Every leaf here renders the shared ComingSoonScreen
// placeholder instead of real content — this file only defines structure.

type BMForm3Screen =
  | { type: "landing" }
  | { type: "kertas"; kertasId: "k1" | "k2" }
  | { type: "hub"; kertasId: "k1" | "k2"; hubId: string }
  | { type: "topic"; kertasId: "k1" | "k2"; hubId: string; topicId: string };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[11px] font-black tracking-wide text-[#818CF8]">{children}</p>;
}

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
          <span key={crumb} className="flex items-center gap-1">
            {i > 0 && <span className="text-white/20">/</span>}
            <span
              className={i === breadcrumb.length - 1 ? "font-bold text-white/70" : ""}
              style={i === breadcrumb.length - 1 ? { color: accent } : undefined}
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
            <p className="mt-0.5 text-sm text-white/40">Dunia Nusantara - Tingkatan 3</p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] py-2">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#F472B6]/40">
            SISTEM BAHASA · KOMSAS · NOVEL · KARANGAN · PERIBAHASA · ULASAN
          </p>
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>Laluan Peperiksaan</SectionLabel>
        <p className="text-sm text-white/50">
          Pilih kertas untuk mula belajar. Setiap kertas mempunyai hub tersendiri dengan struktur
          Tingkatan 3 yang sedia diisi kemudian.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {BM_FORM3_KERTAS.map((kertas) => (
          <KertasCard key={kertas.id} kertas={kertas} onSelect={() => onSelectKertas(kertas.id)} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          {
            label: "Hub Belajar",
            value: `${BM_FORM3_KERTAS.reduce((s, k) => s + k.hubs.length, 0)}`,
          },
          { label: "Format Ringkas", value: "Ready" },
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

function KertasCard({ kertas, onSelect }: { kertas: BMForm3Kertas; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[1.75rem] border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: `${kertas.color}28`,
        background: `linear-gradient(135deg, ${kertas.color}18 0%, ${kertas.color}08 60%, transparent 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 60px ${kertas.color}18, 0 16px 48px ${kertas.color}30` }}
      />
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
          <span className="text-xs text-white/30">{kertas.hubs.length} hub</span>
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

function HubCard({ hub, onSelect }: { hub: BMForm3Hub; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex h-full min-h-52 w-full flex-col overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-200 hover:-translate-y-1"
      style={{
        borderColor: `${hub.color}40`,
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

function KertasView({
  kertas,
  onSelectHub,
  onBack,
}: {
  kertas: BMForm3Kertas;
  onSelectHub: (hubId: string) => void;
  onBack: () => void;
}) {
  if (kertas.id === "k2") {
    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Tingkatan 3", kertas.label]}
          onBack={onBack}
          accent={kertas.color}
        />
        <Kertas2HubGrid
          hubs={kertas.hubs.map((hub) => ({
            id: hub.id,
            label: hub.label,
            description: hub.description,
            icon: hub.icon,
            color: hub.color,
            count: `${hub.topics.length} topik`,
          }))}
          onSelect={onSelectHub}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Tingkatan 3", kertas.label]}
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

// ─── HUB VIEW — Topic list (Novel only; other Kertas 1 hubs are leaves) ──────

function TopicCard({
  topic,
  index,
  hubColor,
  onSelect,
}: {
  topic: BMForm3Topic;
  index: number;
  hubColor: string;
  onSelect: () => void;
}) {
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
            Tatabahasa
          </span>
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

function HubView({
  kertas,
  hub,
  onSelectTopic,
  onBack,
}: {
  kertas: BMForm3Kertas;
  hub: BMForm3Hub;
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}) {
  if (kertas.id === "k2") {
    const items = hub.topics.map((topic) => ({ id: topic.id, title: topic.label }));
    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", kertas.shortLabel, hub.label]}
          onBack={onBack}
          accent={hub.color}
        />
        <Kertas2FolderTemplate
          title={hub.label}
          subtitle={hub.description}
          groups={splitIntoKertas2Folders(items)}
          onSelectItem={onSelectTopic}
        />
      </div>
    );
  }
  if (hub.id === "ulasan") {
    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Tingkatan 3", kertas.shortLabel, hub.label]}
          onBack={onBack}
          accent={hub.color}
        />
        <BMForm3UlasanContent />
      </div>
    );
  }
  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Tingkatan 3", kertas.shortLabel, hub.label]}
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

      {hub.id === "komsas" ? (
        <BMKomsasStructure
          categories={BM_FORM3_KOMSAS_CATEGORIES}
          works={BM_FORM3_KOMSAS_WORKS}
          onSelectWork={onSelectTopic}
        />
      ) : hub.id === "novel" ? (
        <BMForm2NovelStructure works={BM_FORM3_NOVEL_WORKS} onSelectWork={onSelectTopic} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export function BMForm3WorldPage({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<BMForm3Screen[]>([{ type: "landing" }]);
  const screen = history[history.length - 1];

  function push(next: BMForm3Screen) {
    setHistory((previous) => [...previous, next]);
  }

  function pop() {
    if (history.length === 1) {
      onBack();
    } else {
      setHistory((previous) => previous.slice(0, -1));
    }
  }

  const kertas =
    screen.type === "kertas" || screen.type === "hub" || screen.type === "topic"
      ? getBMForm3Kertas(screen.kertasId)
      : undefined;
  const hub =
    screen.type === "hub" || screen.type === "topic"
      ? getBMForm3Hub(screen.kertasId, screen.hubId)
      : undefined;
  const topic =
    screen.type === "topic"
      ? getBMForm3Topic(screen.kertasId, screen.hubId, screen.topicId)
      : undefined;

  return (
    <div
      className="min-h-screen px-4 py-6 pb-[calc(var(--mobile-content-bottom,90px)+2rem)] sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #050816 0%, #080c1a 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        {screen.type === "landing" && (
          <LandingView
            onSelectKertas={(kertasId) => push({ type: "kertas", kertasId })}
            onBack={onBack}
          />
        )}

        {screen.type === "kertas" && kertas && (
          <KertasView
            kertas={kertas}
            onSelectHub={(hubId) => {
              const selectedHub = getBMForm3Hub(kertas.id, hubId);
              if (selectedHub && selectedHub.topics.length > 0) {
                push({ type: "hub", kertasId: kertas.id, hubId });
              } else {
                push({ type: "topic", kertasId: kertas.id, hubId, topicId: hubId });
              }
            }}
            onBack={pop}
          />
        )}

        {screen.type === "hub" && kertas && hub && (
          <HubView
            kertas={kertas}
            hub={hub}
            onSelectTopic={(topicId) =>
              push({ type: "topic", kertasId: kertas.id, hubId: hub.id, topicId })
            }
            onBack={pop}
          />
        )}

        {screen.type === "topic" &&
          kertas &&
          hub &&
          topic &&
          hub.id === "sistem-bahasa" &&
          (() => {
            const content = getBMForm3SistemBahasaContent(topic.id as TopicSlug);
            return content ? <SistemBahasaTopicDetail topic={content} onBack={pop} /> : null;
          })()}

        {screen.type === "topic" && kertas && hub && topic && hub.id === "karangan-pendek" && (
          <BMForm3KaranganPendekContent
            key={topic.id}
            initialSectionId={topic.id}
            onBack={pop}
            onNavigate={(sectionId: BMForm3KaranganPendekSectionId) =>
              setHistory((previous) => [
                ...previous.slice(0, -1),
                {
                  type: "topic",
                  kertasId: "k2",
                  hubId: "karangan-pendek",
                  topicId: sectionId,
                },
              ])
            }
          />
        )}

        {screen.type === "topic" && kertas && hub && topic && hub.id === "respons-terbuka" && (
          <BMForm3KaranganResponsTerbukaContent
            key={topic.id}
            initialSectionId={topic.id}
            onBack={pop}
            onNavigate={(sectionId: BMForm3ResponsTerbukaSectionId) =>
              setHistory((previous) => [
                ...previous.slice(0, -1),
                {
                  type: "topic",
                  kertasId: "k2",
                  hubId: "respons-terbuka",
                  topicId: sectionId,
                },
              ])
            }
          />
        )}

        {screen.type === "topic" && kertas && hub && topic && hub.id === "bengkel-karangan" && (
          <BMForm3BengkelKaranganContent
            key={topic.id}
            initialSectionId={topic.id}
            onBack={pop}
            onNavigate={(sectionId: BMForm3BengkelKaranganSectionId) =>
              setHistory((previous) => [
                ...previous.slice(0, -1),
                {
                  type: "topic",
                  kertasId: "k2",
                  hubId: "bengkel-karangan",
                  topicId: sectionId,
                },
              ])
            }
          />
        )}

        {screen.type === "topic" && kertas && hub && topic && hub.id === "model-karangan-bank" && (
          <BMForm3ModelKaranganBankContent
            key={topic.id}
            initialSectionId={topic.id}
            onBack={pop}
            onNavigate={(sectionId: BMForm3ModelKaranganSectionId) =>
              setHistory((previous) => [
                ...previous.slice(0, -1),
                {
                  type: "topic",
                  kertasId: "k2",
                  hubId: "model-karangan-bank",
                  topicId: sectionId,
                },
              ])
            }
          />
        )}

        {screen.type === "topic" &&
          kertas &&
          hub &&
          topic &&
          hub.id !== "sistem-bahasa" &&
          hub.id !== "karangan-pendek" &&
          hub.id !== "respons-terbuka" &&
          hub.id !== "bengkel-karangan" &&
          hub.id !== "model-karangan-bank" && (
            <div>
              <PageHeader
                breadcrumb={[
                  "Bahasa Melayu",
                  "Tingkatan 3",
                  kertas.shortLabel,
                  hub.label,
                  topic.label,
                ]}
                onBack={pop}
                accent={hub.color}
              />
              {hub.id === "komsas" ? (
                (() => {
                  const work = getBMForm3KomsasWork(topic.id);
                  if (!work) return null;
                  const index = BM_FORM3_KOMSAS_WORKS.findIndex((w) => w.id === work.id);
                  const previousWork = index > 0 ? BM_FORM3_KOMSAS_WORKS[index - 1] : undefined;
                  const nextWork =
                    index >= 0 && index < BM_FORM3_KOMSAS_WORKS.length - 1
                      ? BM_FORM3_KOMSAS_WORKS[index + 1]
                      : undefined;
                  return (
                    <BMKomsasPlaceholderWorkStructure
                      work={work}
                      formLabel="Tingkatan 3"
                      onBackToCategory={pop}
                      backLabel="Kembali ke KOMSAS"
                      previousLabel={previousWork?.title}
                      onPrevious={
                        previousWork
                          ? () =>
                              push({
                                type: "topic",
                                kertasId: "k1",
                                hubId: "komsas",
                                topicId: previousWork.id,
                              })
                          : undefined
                      }
                      nextLabel={nextWork?.title}
                      onNext={
                        nextWork
                          ? () =>
                              push({
                                type: "topic",
                                kertasId: "k1",
                                hubId: "komsas",
                                topicId: nextWork.id,
                              })
                          : undefined
                      }
                    />
                  );
                })()
              ) : hub.id === "novel" ? (
                (() => {
                  const novel = getBMForm3NovelWork(topic.id);
                  return novel ? <BMForm2KomsasWorkStructure work={novel} /> : null;
                })()
              ) : (
                <ComingSoonScreen
                  subjectId="bm"
                  chapterKey={topic.label}
                  form="Form 3"
                  onBack={pop}
                />
              )}
            </div>
          )}
      </div>
    </div>
  );
}

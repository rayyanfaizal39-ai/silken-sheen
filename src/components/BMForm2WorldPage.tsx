import { useState } from "react";
import type { ReactNode } from "react";
import { BMForm2SistemBahasaLibrary } from "@/components/BMForm2SistemBahasaLibrary";
import { BMForm2RumusanContent } from "@/components/BMForm2RumusanContent";
import { BMForm2KaranganPendekContent } from "@/components/BMForm2KaranganPendekContent";
import { BMForm2KaranganPanjangContent } from "@/components/BMForm2KaranganPanjangContent";
import { BMForm2WritingSectionPlaceholder, FORM2_WRITING_SECTIONS, getWritingSection } from "@/components/BMForm2WritingStructure";
import { Kertas2FolderTemplate, Kertas2HubGrid, splitIntoKertas2Folders } from "@/components/Kertas2FolderTemplate";
import {
  BMForm2KomsasStructure,
  BMForm2KomsasWorkStructure,
  BMForm2NovelStructure,
} from "@/components/BMForm2KomsasStructure";
import { getBMForm2KomsasWork } from "@/data/bm-form2-komsas-structure";
import {
  ArrowRight,
  BookOpen,
  BookText,
  ChevronDown,
  ChevronLeft,
  FileText,
  Lightbulb,
  MessageCircle,
  NotebookText,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

type PaperId = "k1" | "k2";

interface HubItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  description: string;
}

interface PaperItem {
  id: PaperId;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  examDetails: string;
  color: string;
  tags: string[];
  title: string;
  subtitle: string;
  infoCards: { label: string; value: string }[];
  explanation: ReactNode;
  hubs: HubItem[];
}

type Screen =
  | { type: "landing" }
  | { type: "paper"; paperId: PaperId }
  | { type: "hub"; paperId: PaperId; hubId: string }
  | { type: "writing-section"; paperId: "k2"; hubId: string; sectionId: string }
  | { type: "komsas-work"; paperId: "k1"; hubId: "komsas" | "novel"; workId: string };

const FORM2_PAPERS: PaperItem[] = [
  {
    id: "k1",
    label: "Kertas 1",
    shortLabel: "K1",
    icon: "K1",
    description: "Sistem Bahasa, KOMSAS, Novel, Rumusan",
    examDetails: "Masa: 1 jam 30 minit · 60 markah · KOMSAS + Novel",
    color: "#818CF8",
    tags: ["Tatabahasa", "KOMSAS", "Novel", "Rumusan"],
    title: "Kertas 1 Bahasa Melayu Tingkatan 2",
    subtitle: "UASA Bahasa Melayu Kertas 1 (02/1)",
    infoCards: [
      { label: "Tempoh", value: "1 jam 30 minit" },
      { label: "Jumlah Markah", value: "60 markah" },
      { label: "Jenis", value: "Ujian Bertulis" },
    ],
    explanation: (
      <div className="space-y-4">
        <FormatBlock
          title="Bahagian A - 15 Markah"
          subtitle="Objektif Aneka Pilihan"
          items={["Sistem Bahasa: 10 soalan", "KOMSAS / Novel: 5 soalan"]}
          color="#818CF8"
        />
        <FormatBlock
          title="Bahagian B - 30 Markah"
          subtitle="Objektif Pelbagai Bentuk & Subjektif Respons Terhad"
          items={["Sistem Bahasa", "KOMSAS", "Novel"]}
          color="#C084FC"
        />
        <FormatBlock
          title="Bahagian C - 15 Markah"
          subtitle="Pemindahan Maklumat"
          items={["Rumusan"]}
          color="#FBBF24"
        />
      </div>
    ),
    hubs: [
      {
        id: "sistem-bahasa",
        label: "Sistem Bahasa",
        shortLabel: "Tatabahasa",
        icon: "SB",
        color: "#60A5FA",
        description: "Morfologi, frasa, sintaksis, kesalahan bahasa dan peribahasa.",
      },
      {
        id: "komsas",
        label: "Antologi KOMSAS",
        shortLabel: "KOMSAS",
        icon: "KS",
        color: "#C084FC",
        description: "Puisi, prosa tradisional, cerpen, drama dan elemen sastera Tingkatan 2.",
      },
      {
        id: "novel",
        label: "Novel",
        shortLabel: "Novel",
        icon: "N",
        color: "#FB923C",
        description: "Sinopsis, watak, tema, persoalan, nilai dan pengajaran novel Tingkatan 2.",
      },
      {
        id: "ringkasan-rumusan",
        label: "Rumusan",
        shortLabel: "Rumusan",
        icon: "RR",
        color: "#FBBF24",
        description: "Bahagian C - pemindahan maklumat, isi tersurat, kesimpulan dan bahasa.",
      },
      {
        id: "latihan-uasa",
        label: "Latihan Berformat UASA",
        shortLabel: "Latihan UASA",
        icon: "LU",
        color: "#F472B6",
        description: "Ruang latihan mengikut format UASA Bahasa Melayu Tingkatan 2.",
      },
    ],
  },
  {
    id: "k2",
    label: "Kertas 2",
    shortLabel: "K2",
    icon: "K2",
    description: "Karangan Pendek, Karangan Panjang, Bengkel Karangan, Model & Bank Peribahasa",
    examDetails: "Masa: 1 jam 30 minit · Karangan wajib + pilihan",
    color: "#FB923C",
    tags: ["Karangan Pendek", "Karangan Panjang", "Bengkel", "Model", "Peribahasa", "Improve"],
    title: "Kertas 2 Bahasa Melayu Tingkatan 2",
    subtitle: "UASA Bahasa Melayu Kertas 2 - Penulisan",
    infoCards: [
      { label: "Tempoh", value: "1 jam 30 minit" },
      { label: "Tugasan", value: "Karangan wajib dan pilihan" },
      { label: "Fokus", value: "Penulisan berformat dan tidak berformat" },
    ],
    explanation: (
      <p className="text-sm leading-relaxed text-white/70">
        Kertas 2 menguji kemahiran menulis karangan dengan ayat gramatis, isi yang jelas, huraian
        yang matang, penanda wacana, kosa kata menarik dan penutup yang lengkap.
      </p>
    ),
    hubs: [
      {
        id: "karangan-pendek",
        label: "Karangan Pendek",
        shortLabel: "Kgn. Pendek",
        icon: "KP",
        color: "#38BDF8",
        description: "Karangan 50–80 patah perkataan berdasarkan bahan grafik, carta, jadual atau gambar mengikut format UASA.",
      },
      {
        id: "karangan-panjang",
        label: "Karangan Panjang",
        shortLabel: "Panjang",
        icon: "KJ",
        color: "#A78BFA",
        description:
          "Karangan melebihi 180 patah perkataan mengikut format UASA dengan teknik penulisan lengkap.",
      },
      {
        id: "bengkel-karangan",
        label: "Bengkel Karangan",
        shortLabel: "Bengkel",
        icon: "BK",
        color: "#34D399",
        description: "Idea bank, template, kosa kata, penanda wacana dan peribahasa mengikut tema.",
      },
      {
        id: "model-karangan-bank",
        label: "Model Karangan Bank",
        shortLabel: "Model",
        icon: "MK",
        color: "#FBBF24",
        description:
          "Contoh karangan mengikut jenis seperti fakta, perbincangan, pengalaman, laporan dan ucapan.",
      },
      {
        id: "peribahasa-bank",
        label: "Bank Peribahasa",
        shortLabel: "Peribahasa",
        icon: "PB",
        color: "#F472B6",
        description: "Peribahasa mengikut tema, maksud, contoh ayat dan wajib hafal.",
      },
      {
        id: "penanda-wacana",
        label: "Penanda Wacana",
        shortLabel: "Penanda Wacana",
        icon: "PW",
        color: "#22D3EE",
        description: "Ruang pembelajaran penanda wacana untuk menyusun idea dan perenggan.",
      },
      {
        id: "tingkatkan-karangan",
        label: "Strategi Skor A+",
        shortLabel: "Skor A+",
        icon: "SA",
        color: "#818CF8",
        description: "Rahsia pemeriksa, teknik menghuraikan isi, kesalahan lazim dan strategi mendapatkan markah tinggi.",
      },
      {
        id: "latihan-uasa",
        label: "Latihan Berformat UASA",
        shortLabel: "Latihan UASA",
        icon: "LU",
        color: "#FB7185",
        description: "Ruang latihan penulisan mengikut format UASA Bahasa Melayu Tingkatan 2.",
      },
    ],
  },
];

function getPaper(id: PaperId) {
  return FORM2_PAPERS.find((paper) => paper.id === id);
}

function getHub(paperId: PaperId, hubId: string) {
  return getPaper(paperId)?.hubs.find((hub) => hub.id === hubId);
}

function SectionLabel({ children }: { children: ReactNode }) {
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

function FormatBlock({
  title,
  subtitle,
  items,
  color,
}: {
  title: string;
  subtitle: string;
  items: string[];
  color: string;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: `${color}30`, background: `${color}0a` }}
    >
      <p className="text-sm font-bold" style={{ color }}>
        {title}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-white/55">{subtitle}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/65">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: color }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LandingView({
  onSelectPaper,
  onBack,
}: {
  onSelectPaper: (id: PaperId) => void;
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
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-black"
            style={{
              background: "radial-gradient(circle at 35% 30%, #F472B640, #F472B618)",
              boxShadow: "0 0 24px rgba(244,114,182,0.4)",
              color: "#FBCFE8",
            }}
          >
            BM
          </div>
          <div>
            <p className="text-[9px] font-black tracking-wide text-[#F472B6]/60">DEWAN SASTERA</p>
            <h1 className="font-display text-2xl font-bold text-white">Bahasa Melayu</h1>
            <p className="mt-0.5 text-sm text-white/40">Dunia Nusantara - Tingkatan 2</p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] py-2">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#F472B6]/40">
            TATABAHASA · PEMAHAMAN · KOMSAS · NOVEL · KARANGAN · PERIBAHASA · RUMUSAN
          </p>
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>Laluan Peperiksaan</SectionLabel>
        <p className="text-sm text-white/50">
          Pilih kertas untuk mula belajar. Setiap kertas mempunyai hub tersendiri dengan struktur
          Tingkatan 2 yang sedia diisi kemudian.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FORM2_PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} onSelect={() => onSelectPaper(paper.id)} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          {
            label: "Hub Belajar",
            value: `${FORM2_PAPERS.reduce((sum, paper) => sum + paper.hubs.length, 0)}`,
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

function PaperCard({ paper, onSelect }: { paper: PaperItem; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[1.75rem] border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: `${paper.color}28`,
        background: `linear-gradient(135deg, ${paper.color}18 0%, ${paper.color}08 60%, transparent 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 60px ${paper.color}18, 0 16px 48px ${paper.color}30` }}
      />
      <div className="pointer-events-none absolute right-5 top-5 text-5xl font-black opacity-[0.07]">
        {paper.icon}
      </div>

      <div className="relative z-10">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black"
          style={{ background: `${paper.color}20`, color: paper.color }}
        >
          <span>{paper.icon}</span>
          <span>{paper.label}</span>
        </div>
        <h2 className="mb-2 text-lg font-bold text-white">{paper.description}</h2>
        <p className="mb-5 text-xs text-white/40">{paper.examDetails}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30">{paper.hubs.length} hub</span>
          <span
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: paper.color }}
          >
            Mula Belajar
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

function PaperView({
  paper,
  onSelectHub,
  onBack,
}: {
  paper: PaperItem;
  onSelectHub: (hubId: string) => void;
  onBack: () => void;
}) {
  if (paper.id === "k2") return <div><PageHeader breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.label]} onBack={onBack} accent={paper.color} /><Kertas2HubGrid hubs={paper.hubs.map(hub => ({ id: hub.id, label: hub.label, description: hub.description, icon: hub.icon, color: hub.color, count: `${FORM2_WRITING_SECTIONS[hub.id]?.length ?? 0} topik` }))} onSelect={onSelectHub} /></div>;
  if (paper.id === "k1") {
    const primaryHubs = paper.hubs.filter((hub) => hub.id !== "latihan-uasa");
    const practiceHub = paper.hubs.find((hub) => hub.id === "latihan-uasa");
    const hubMeta: Record<string, { count: string; icon: ReactNode }> = {
      "sistem-bahasa": { count: "5 topik", icon: <BookText className="h-7 w-7" /> },
      komsas: { count: "5 genre", icon: <Sparkles className="h-7 w-7" /> },
      novel: { count: "4 novel", icon: <NotebookText className="h-7 w-7" /> },
      "ringkasan-rumusan": { count: "4 fokus", icon: <FileText className="h-7 w-7" /> },
    };

    return (
      <div>
        <PageHeader
          breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.label]}
          onBack={onBack}
          accent={paper.color}
        />

        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-indigo-300/20 bg-[#101126] px-5 py-7 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(129,140,248,0.24),transparent_42%),radial-gradient(circle_at_8%_100%,rgba(192,132,252,0.13),transparent_38%)]" />
          <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full border border-indigo-300/10" />
          <div className="relative max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-200">
              <BookOpen className="h-3.5 w-3.5" /> Kertas 1
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Bahasa Melayu Tingkatan 2
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              Kertas 1 — Kuasai setiap bahagian langkah demi langkah.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["5 Bahagian", "UASA", "Nota Interaktif"].map((label, index) => (
                <span key={label} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 text-xs font-bold text-white/70">
                  {index === 0 ? <BookOpen className="h-3.5 w-3.5 text-sky-300" /> : index === 1 ? <Target className="h-3.5 w-3.5 text-amber-300" /> : <Sparkles className="h-3.5 w-3.5 text-purple-300" />}
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-9">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Mula di sini</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">Apa yang mahu dipelajari?</h2>
              <p className="mt-1 text-sm text-white/45">Pilih satu bahagian untuk membuka nota dan aktiviti pembelajaran.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {primaryHubs.map((hub, index) => {
              const meta = hubMeta[hub.id];
              const featured = index < 2;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => onSelectHub(hub.id)}
                  className={`group relative min-h-48 overflow-hidden rounded-[1.65rem] border p-5 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-0 motion-reduce:transition-none ${featured ? "lg:col-span-3" : "lg:col-span-2"}`}
                  style={{ borderColor: `${hub.color}38`, background: `linear-gradient(145deg, ${hub.color}1f 0%, ${hub.color}09 55%, rgba(8,12,26,.82) 100%)`, boxShadow: `0 14px 38px ${hub.color}0c` }}
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" style={{ boxShadow: `inset 0 0 60px ${hub.color}16, 0 18px 48px ${hub.color}22` }} />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" style={{ color: hub.color, borderColor: `${hub.color}30`, background: `${hub.color}18` }}>{meta.icon}</span>
                  <span className="relative mt-5 block font-display text-lg font-bold text-white">{hub.label}</span>
                  <span className="relative mt-1.5 line-clamp-2 block text-xs leading-5 text-white/50">{hub.description}</span>
                  <span className="relative mt-5 flex items-center justify-between">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide" style={{ color: hub.color, background: `${hub.color}18` }}>{meta.count}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" style={{ color: hub.color }} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {practiceHub && (
          <section className="mb-9">
            <button type="button" onClick={() => onSelectHub(practiceHub.id)} className="group flex w-full items-center justify-between gap-4 overflow-hidden rounded-[1.5rem] border border-pink-300/20 bg-gradient-to-r from-pink-400/[0.12] via-purple-400/[0.08] to-transparent p-5 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(244,114,182,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/60 active:translate-y-0 motion-reduce:transition-none sm:p-6">
              <span className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-300/[0.12] text-pink-300"><Target className="h-6 w-6" /></span><span><span className="block text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">Selepas belajar</span><span className="mt-1 block font-display text-lg font-bold text-white">{practiceHub.label}</span><span className="mt-1 block text-xs text-white/45">{practiceHub.description}</span></span></span>
              <ArrowRight className="h-5 w-5 shrink-0 text-pink-300 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </button>
          </section>
        )}

      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.label]}
        onBack={onBack}
        accent={paper.color}
      />

      <div className="mb-6">
        <div
          className="mb-2 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black"
          style={{ background: `${paper.color}20`, color: paper.color }}
        >
          {paper.icon} {paper.label}
        </div>
        <h2 className="font-display text-xl font-bold text-white">{paper.title}</h2>
        <p className="mt-1 text-sm text-white/40">{paper.subtitle}</p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {paper.infoCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center"
          >
            <p className="text-base font-black text-white">{card.value}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-white/30">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <SectionLabel>Format Ringkas</SectionLabel>
        {paper.explanation}
      </div>

      <SectionLabel>Hub Pembelajaran</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paper.hubs.map((hub) => (
          <HubCard key={hub.id} hub={hub} onSelect={() => onSelectHub(hub.id)} />
        ))}
      </div>
    </div>
  );
}

function HubCard({ hub, onSelect }: { hub: HubItem; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-200 hover:-translate-y-1"
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
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${hub.color}20`, color: hub.color }}
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
            Struktur Sedia
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

type StudyMode = "learn" | "quick" | "exam" | "cikgu";

const STUDY_MODES: Array<{
  id: StudyMode;
  label: string;
  icon: ReactNode;
}> = [
  { id: "learn", label: "Learn", icon: <BookOpen className="h-4 w-4" /> },
  { id: "quick", label: "Quick Revision", icon: <Zap className="h-4 w-4" /> },
  { id: "exam", label: "Exam Focus", icon: <Target className="h-4 w-4" /> },
  { id: "cikgu", label: "Cikgu AcadeMY", icon: <MessageCircle className="h-4 w-4" /> },
];

const LEARNING_FOLDERS: Array<{
  id: string;
  title: string;
  description: string;
  mode: Exclude<StudyMode, "learn"> | "foundation" | "examples";
  icon: ReactNode;
  accent: string;
}> = [
  {
    id: "fahami",
    title: "📘 Fahami Dahulu",
    description: "Ruang asas untuk definisi, konsep dan perkara yang perlu difahami dahulu.",
    mode: "foundation",
    icon: <BookOpen className="h-4 w-4" />,
    accent: "#60A5FA",
  },
  {
    id: "contoh",
    title: "💡 Contoh & Situasi",
    description: "Ruang contoh, situasi dan aplikasi yang berkaitan.",
    mode: "examples",
    icon: <Lightbulb className="h-4 w-4" />,
    accent: "#A78BFA",
  },
  {
    id: "uasa",
    title: "🎯 Fokus UASA",
    description: "Ruang soalan lazim, kesalahan biasa dan teknik menjawab.",
    mode: "exam",
    icon: <Target className="h-4 w-4" />,
    accent: "#FBBF24",
  },
  {
    id: "pantas",
    title: "⚡ Ulang Kaji Pantas",
    description: "Ruang kata kunci, isi penting dan ulang kaji pantas.",
    mode: "quick",
    icon: <Zap className="h-4 w-4" />,
    accent: "#34D399",
  },
  {
    id: "cikgu",
    title: "🤖 Cikgu AcadeMY",
    description: "Ruang penerangan mesra dan panduan mudah.",
    mode: "cikgu",
    icon: <MessageCircle className="h-4 w-4" />,
    accent: "#F472B6",
  },
];

function LearningFolderPlaceholder({
  folder,
  hub,
}: {
  folder: (typeof LEARNING_FOLDERS)[number];
  hub: HubItem;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-300"
      style={
        open
          ? { borderColor: `${folder.accent}45`, boxShadow: `0 14px 40px ${folder.accent}10` }
          : { borderColor: "rgba(255,255,255,0.08)" }
      }
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 shrink-0" style={{ color: folder.accent }}>
            {folder.icon}
          </span>
          <span>
            <span className="block font-display text-sm font-bold text-white sm:text-base">
              {folder.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-white/45">{folder.description}</span>
          </span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-300"
          style={{ color: folder.accent, transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] px-5 py-4">
            <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-4 py-5 text-center">
              <p className="text-xs leading-5 text-white/40">
                Struktur {folder.title.replace(/^\S+\s/, "")} untuk {hub.label} telah disediakan.
                Kandungan akan ditambah kemudian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HubView({
  paper,
  hub,
  onSelectKomsasWork,
  onSelectWritingSection,
  onBack,
}: {
  paper: PaperItem;
  hub: HubItem;
  onSelectKomsasWork: (workId: string) => void;
  onSelectWritingSection: (sectionId: string) => void;
  onBack: () => void;
}) {
  const [studyMode, setStudyMode] = useState<StudyMode>("learn");
  const visibleFolders =
    studyMode === "learn"
      ? LEARNING_FOLDERS
      : LEARNING_FOLDERS.filter((folder) => folder.mode === studyMode);

  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.shortLabel, hub.label]}
        onBack={onBack}
        accent={hub.color}
      />

      {!(paper.id === "k1" && hub.id === "ringkasan-rumusan") && <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black"
          style={{
            background: `${hub.color}20`,
            boxShadow: `0 0 20px ${hub.color}40`,
            color: hub.color,
          }}
        >
          {hub.icon}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">{hub.label}</h2>
          <p className="text-sm text-white/40">{hub.description}</p>
        </div>
      </div>}

      {paper.id === "k1" && hub.id === "sistem-bahasa" ? (
        <BMForm2SistemBahasaLibrary />
      ) : paper.id === "k1" && hub.id === "komsas" ? (
        <BMForm2KomsasStructure onSelectWork={onSelectKomsasWork} />
      ) : paper.id === "k1" && hub.id === "novel" ? (
        <BMForm2NovelStructure onSelectWork={onSelectKomsasWork} />
      ) : paper.id === "k1" && hub.id === "ringkasan-rumusan" ? (
        <BMForm2RumusanContent />
      ) : paper.id === "k2" ? (
        <Kertas2FolderTemplate title={hub.label} subtitle={hub.description} groups={splitIntoKertas2Folders((FORM2_WRITING_SECTIONS[hub.id] ?? []).map(section => ({ id: section.id, title: section.title })))} onSelectItem={onSelectWritingSection} />
      ) : (
        <>
          <div className="mb-6">
            <SectionLabel>Study Modes</SectionLabel>
            <div
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="tablist"
              aria-label="Cara belajar"
            >
              {STUDY_MODES.map((mode) => {
                const active = studyMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStudyMode(mode.id)}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all"
                    style={
                      active
                        ? {
                            borderColor: `${hub.color}60`,
                            background: `${hub.color}20`,
                            color: hub.color,
                            boxShadow: `0 8px 24px ${hub.color}12`,
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(255,255,255,0.48)",
                          }
                    }
                  >
                    {mode.icon}
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <SectionLabel>Learning Folders</SectionLabel>
            <div className="space-y-3">
              {visibleFolders.map((folder) => (
                <LearningFolderPlaceholder key={folder.id} folder={folder} hub={hub} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function BMForm2WorldPage({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<Screen[]>([{ type: "landing" }]);
  const screen = history[history.length - 1];

  function push(next: Screen) {
    setHistory((previous) => [...previous, next]);
  }

  function pop() {
    if (history.length === 1) {
      onBack();
    } else {
      setHistory((previous) => previous.slice(0, -1));
    }
  }

  const paper =
    screen.type === "paper" || screen.type === "hub" || screen.type === "komsas-work" || screen.type === "writing-section"
      ? getPaper(screen.paperId)
      : undefined;
  const hub =
    screen.type === "hub" || screen.type === "komsas-work" || screen.type === "writing-section"
      ? getHub(screen.paperId, screen.hubId)
      : undefined;
  const komsasWork =
    screen.type === "komsas-work" ? getBMForm2KomsasWork(screen.workId) : undefined;
  const writingSection =
    screen.type === "writing-section" ? getWritingSection(screen.hubId, screen.sectionId) : undefined;

  return (
    <div
      className="min-h-screen px-4 py-6 pb-[calc(var(--mobile-content-bottom,90px)+2rem)] sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #050816 0%, #080c1a 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        {screen.type === "landing" && (
          <LandingView
            onSelectPaper={(paperId) => push({ type: "paper", paperId })}
            onBack={onBack}
          />
        )}

        {screen.type === "paper" && paper && (
          <PaperView
            paper={paper}
            onSelectHub={(hubId) => push({ type: "hub", paperId: screen.paperId, hubId })}
            onBack={pop}
          />
        )}

        {screen.type === "hub" && paper && hub && (
          <HubView
            paper={paper}
            hub={hub}
            onSelectKomsasWork={(workId) =>
              push({
                type: "komsas-work",
                paperId: "k1",
                hubId: hub.id === "novel" ? "novel" : "komsas",
                workId,
              })
            }
            onSelectWritingSection={(sectionId) =>
              push({ type: "writing-section", paperId: "k2", hubId: hub.id, sectionId })
            }
            onBack={pop}
          />
        )}

        {screen.type === "komsas-work" && paper && hub && komsasWork && (
          <div>
            <PageHeader
              breadcrumb={[
                "Bahasa Melayu",
                "Tingkatan 2",
                paper.shortLabel,
                hub.shortLabel,
                komsasWork.title,
              ]}
              onBack={pop}
              accent={hub.color}
            />
            <BMForm2KomsasWorkStructure work={komsasWork} />
          </div>
        )}

        {screen.type === "writing-section" && paper && hub && writingSection && (
          <div>
            {hub.id !== "karangan-pendek" && hub.id !== "karangan-panjang" && <PageHeader
              breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.shortLabel, hub.shortLabel, writingSection.title]}
              onBack={pop}
              accent={hub.color}
            />}
            {hub.id === "karangan-pendek" ? (
              <BMForm2KaranganPendekContent initialSectionId={writingSection.id} onBack={pop} />
            ) : hub.id === "karangan-panjang" ? (
              <BMForm2KaranganPanjangContent initialSectionId={writingSection.id} onBack={pop} />
            ) : (
              <BMForm2WritingSectionPlaceholder title={writingSection.title} color={hub.color} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

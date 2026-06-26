import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, ChevronLeft, Clock } from "lucide-react";

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
  | { type: "hub"; paperId: PaperId; hubId: string };

const FORM2_PAPERS: PaperItem[] = [
  {
    id: "k1",
    label: "Kertas 1",
    shortLabel: "K1",
    icon: "K1",
    description: "Sistem Bahasa, Pemahaman, KOMSAS, Novel, Ringkasan & Rumusan",
    examDetails: "Masa: 1 jam 30 minit · 60 markah · Pemahaman + KOMSAS",
    color: "#818CF8",
    tags: ["Tatabahasa", "Pemahaman", "KOMSAS", "Novel", "Ringkasan", "Rumusan"],
    title: "Kertas 1 Bahasa Melayu Tingkatan 2",
    subtitle: "UASA Bahasa Melayu Kertas 1 (02/1)",
    infoCards: [
      { label: "Tempoh", value: "1 jam 30 minit" },
      { label: "Jumlah Markah", value: "60 markah" },
      { label: "Jenis", value: "Ujian Bertulis Pemahaman" },
    ],
    explanation: (
      <div className="space-y-4">
        <FormatBlock
          title="Bahagian A - 15 Markah"
          subtitle="Objektif Aneka Pilihan"
          items={["Sistem Bahasa: 10 soalan", "Pemahaman Petikan: 5 soalan"]}
          color="#818CF8"
        />
        <FormatBlock
          title="Bahagian B - 30 Markah"
          subtitle="Objektif Pelbagai Bentuk & Subjektif Respons Terhad"
          items={["Sistem Bahasa", "Pemahaman Petikan", "Novel KOMSAS"]}
          color="#C084FC"
        />
        <FormatBlock
          title="Bahagian C - 15 Markah"
          subtitle="Pemindahan Maklumat"
          items={["Ringkasan", "Rumusan"]}
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
        id: "pemahaman",
        label: "Pemahaman",
        shortLabel: "Pemahaman",
        icon: "P",
        color: "#34D399",
        description: "Teknik menjawab soalan pemahaman petikan dan soalan KBAT.",
      },
      {
        id: "komsas",
        label: "KOMSAS",
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
        label: "Ringkasan & Rumusan",
        shortLabel: "Ringkasan",
        icon: "RR",
        color: "#FBBF24",
        description: "Bahagian C - pemindahan maklumat, isi tersurat, kesimpulan dan bahasa.",
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
        Kertas 2 menguji kemahiran menulis karangan dengan ayat gramatis, isi yang
        jelas, huraian yang matang, penanda wacana, kosa kata menarik dan penutup
        yang lengkap.
      </p>
    ),
    hubs: [
      {
        id: "karangan-pendek",
        label: "Karangan Pendek",
        shortLabel: "Kgn. Pendek",
        icon: "KP",
        color: "#38BDF8",
        description: "50-80 patah perkataan berdasarkan bahan grafik, jadual, carta atau gambar.",
      },
      {
        id: "karangan-panjang",
        label: "Karangan Panjang",
        shortLabel: "Panjang",
        icon: "KJ",
        color: "#A78BFA",
        description: "Melebihi 180 patah perkataan dengan 5 isi atau lebih menggunakan formula IMBAK.",
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
        description: "Contoh karangan mengikut jenis seperti fakta, perbincangan, pengalaman, laporan dan ucapan.",
      },
      {
        id: "peribahasa-bank",
        label: "Peribahasa Bank",
        shortLabel: "Peribahasa",
        icon: "PB",
        color: "#F472B6",
        description: "Peribahasa mengikut tema, maksud, contoh ayat dan wajib hafal.",
      },
      {
        id: "tingkatkan-karangan",
        label: "Kemahiran Tingkatkan Karangan",
        shortLabel: "Improve",
        icon: "TK",
        color: "#818CF8",
        description: "Teknik menukar ayat biasa kepada ayat cemerlang, kaya dan bernas.",
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
  return (
    <p className="mb-3 text-[11px] font-black tracking-wide text-[#818CF8]">
      {children}
    </p>
  );
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
    <div className="rounded-2xl border p-4" style={{ borderColor: `${color}30`, background: `${color}0a` }}>
      <p className="text-sm font-bold" style={{ color }}>
        {title}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-white/55">{subtitle}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/65">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
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
            <p className="text-[9px] font-black tracking-wide text-[#F472B6]/60">
              DEWAN SASTERA
            </p>
            <h1 className="font-display text-2xl font-bold text-white">Bahasa Melayu</h1>
            <p className="mt-0.5 text-sm text-white/40">Dunia Nusantara - Tingkatan 2</p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] py-2">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#F472B6]/40">
            TATABAHASA · PEMAHAMAN · KOMSAS · NOVEL · KARANGAN · PERIBAHASA · RINGKASAN
          </p>
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>Laluan Peperiksaan</SectionLabel>
        <p className="text-sm text-white/50">
          Pilih kertas untuk mula belajar. Setiap kertas mempunyai hub tersendiri
          dengan struktur Tingkatan 2 yang sedia diisi kemudian.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FORM2_PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} onSelect={() => onSelectPaper(paper.id)} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Hub Belajar", value: `${FORM2_PAPERS.reduce((sum, paper) => sum + paper.hubs.length, 0)}` },
          { label: "Format Ringkas", value: "Ready" },
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
          <span className="flex items-center gap-1 text-xs font-bold" style={{ color: paper.color }}>
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
          <div key={card.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
            <p className="text-base font-black text-white">{card.value}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-white/30">{card.label}</p>
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
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: `${hub.color}18`, color: hub.color }}>
            Placeholder
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

function HubView({
  paper,
  hub,
  onBack,
}: {
  paper: PaperItem;
  hub: HubItem;
  onBack: () => void;
}) {
  return (
    <div>
      <PageHeader
        breadcrumb={["Bahasa Melayu", "Tingkatan 2", paper.shortLabel, hub.label]}
        onBack={onBack}
        accent={hub.color}
      />

      <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black"
          style={{ background: `${hub.color}20`, boxShadow: `0 0 20px ${hub.color}40`, color: hub.color }}
        >
          {hub.icon}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">{hub.label}</h2>
          <p className="text-sm text-white/40">{hub.description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: hub.color }} />
          <SectionLabel>Struktur Placeholder</SectionLabel>
        </div>
        <p className="text-sm leading-relaxed text-white/60">
          Ruang nota penuh untuk {hub.label} Tingkatan 2 akan ditambah kemudian.
          Halaman ini disediakan sebagai struktur awal sahaja.
        </p>
      </div>
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
    screen.type === "paper" || screen.type === "hub"
      ? getPaper(screen.paperId)
      : undefined;
  const hub = screen.type === "hub" ? getHub(screen.paperId, screen.hubId) : undefined;

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
          <HubView paper={paper} hub={hub} onBack={pop} />
        )}
      </div>
    </div>
  );
}

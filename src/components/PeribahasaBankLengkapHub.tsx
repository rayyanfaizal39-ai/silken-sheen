import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, Search, Trophy } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import {
  PERIBAHASA_KATEGORI_LENGKAP,
  TOP_50_PERIBAHASA,
  TEMA_KARANGAN_PERIBAHASA,
  PERIBAHASA_ARAS_TINGGI,
  PERIBAHASA_DALAM_KARANGAN,
  type PeribahasaLengkapItem,
  type TahapPeribahasa,
} from "@/data/bm-peribahasa-bank-lengkap";

const STORAGE_KEY = "bm-peribahasa-bank-lengkap-v1";
const SECTION_IDS = [...PERIBAHASA_KATEGORI_LENGKAP.map((k) => k.id), "top50", "tema", "aras-tinggi", "karangan-usage"];

const TAHAP_COLOR: Record<TahapPeribahasa, string> = {
  Asas: "#34D399",
  Sederhana: "#FBBF24",
  Tinggi: "#FB7185",
};

function loadOpened(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ─── Collapsible shell ─────────────────────────────────────────────────────

function CollapsibleGroup({
  title,
  icon,
  color,
  countLabel,
  defaultOpen = false,
  onOpen,
  children,
}: {
  title: string;
  icon: string;
  color: string;
  countLabel?: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) onOpen?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: `${color}30`, background: `linear-gradient(135deg, ${color}10 0%, rgba(255,255,255,0.02) 70%)` }}
    >
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="flex items-center gap-2.5 text-sm font-bold text-white">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base" style={{ background: `${color}22` }}>
            {icon}
          </span>
          {title}
          {countLabel && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: `${color}22`, color }}>
              {countLabel}
            </span>
          )}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="animate-fade-up border-t border-white/5 px-4 pb-4 pt-3.5">{children}</div>}
    </div>
  );
}

// ─── Badge legend ───────────────────────────────────────────────────────────

function BadgeLegend() {
  const legend = [
    { icon: "⭐", label: "Wajib Hafal", color: "#FBBF24" },
    { icon: "🔥", label: "Aras Tinggi", color: "#FB7185" },
    { icon: "📚", label: "Popular UASA", color: "#38BDF8" },
    { icon: "🏆", label: "Karangan Cemerlang", color: "#34D399" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {legend.map((l) => (
        <span
          key={l.label}
          className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold"
          style={{ borderColor: `${l.color}30`, background: `${l.color}12`, color: l.color }}
        >
          {l.icon} {l.label}
        </span>
      ))}
    </div>
  );
}

function ItemBadges({ item }: { item: PeribahasaLengkapItem }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {item.wajibHafal && (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2.5 py-1 text-[10px] font-black text-yellow-300">
          ⭐ WAJIB HAFAL
        </span>
      )}
      {item.tahap === "Tinggi" && (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] font-black text-rose-300">
          🔥 Aras Tinggi
        </span>
      )}
      {item.popularUasa && (
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-2 py-0.5 text-[9px] font-black text-sky-300">
          📚 Popular UASA
        </span>
      )}
      {item.karanganCemerlang && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-300">
          🏆 Karangan Cemerlang
        </span>
      )}
      <span
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black"
        style={{ background: `${TAHAP_COLOR[item.tahap]}20`, color: TAHAP_COLOR[item.tahap] }}
      >
        {item.tahap}
      </span>
    </div>
  );
}

// ─── Peribahasa item card ───────────────────────────────────────────────────

function PeribahasaItemCard({ item, color }: { item: PeribahasaLengkapItem; color: string }) {
  return (
    <div
      className="rounded-xl border p-3.5"
      style={{
        borderColor: item.wajibHafal ? "#FBBF2450" : `${color}30`,
        background: item.wajibHafal ? "linear-gradient(135deg, #FBBF2412, rgba(255,255,255,0.02))" : `${color}0a`,
      }}
    >
      <p className="mb-2 text-base font-black italic text-white">{item.peribahasa}</p>
      <div className="mb-2">
        <ItemBadges item={item} />
      </div>
      <div className="mb-2 rounded-lg border border-white/5 bg-black/20 p-2.5">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-white/30">Maksud</p>
        <p className="text-xs leading-relaxed text-white/70">{item.maksud}</p>
      </div>
      <div className="mb-2 rounded-lg border border-white/5 bg-black/20 p-2.5">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-white/30">Contoh Ayat</p>
        <p className="text-xs italic leading-relaxed text-white/65">&ldquo;{item.contohAyat}&rdquo;</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <p className="w-full text-[9px] font-bold uppercase tracking-wide text-white/30">Tema Karangan Sesuai</p>
        {item.tema.map((t) => (
          <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium" style={{ color }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Filter toolbar ─────────────────────────────────────────────────────────

function FilterToolbar({
  search,
  setSearch,
  allTema,
  filterTema,
  setFilterTema,
  filterTahap,
  setFilterTahap,
  wajibOnly,
  setWajibOnly,
}: {
  search: string;
  setSearch: (v: string) => void;
  allTema: string[];
  filterTema: string | null;
  setFilterTema: (v: string | null) => void;
  filterTahap: TahapPeribahasa | null;
  setFilterTahap: (v: TahapPeribahasa | null) => void;
  wajibOnly: boolean;
  setWajibOnly: (v: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari peribahasa atau maksud..."
          className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
        />
      </div>

      <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[9px] font-black uppercase tracking-wide text-white/30">Tahap:</span>
        {(["Asas", "Sederhana", "Tinggi"] as TahapPeribahasa[]).map((t) => (
          <button
            key={t}
            onClick={() => setFilterTahap(filterTahap === t ? null : t)}
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors"
            style={{
              borderColor: filterTahap === t ? TAHAP_COLOR[t] : "rgba(255,255,255,0.1)",
              background: filterTahap === t ? `${TAHAP_COLOR[t]}25` : "transparent",
              color: filterTahap === t ? TAHAP_COLOR[t] : "rgba(255,255,255,0.5)",
            }}
          >
            {t}
          </button>
        ))}
        <button
          onClick={() => setWajibOnly(!wajibOnly)}
          className="ml-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors"
          style={{
            borderColor: wajibOnly ? "#FBBF2470" : "rgba(255,255,255,0.1)",
            background: wajibOnly ? "#FBBF2425" : "transparent",
            color: wajibOnly ? "#FBBF24" : "rgba(255,255,255,0.5)",
          }}
        >
          ⭐ Wajib Hafal Sahaja
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-wide text-white/30">Tema:</span>
        <select
          value={filterTema ?? ""}
          onChange={(e) => setFilterTema(e.target.value || null)}
          className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11px] font-bold text-white/80 focus:border-white/25 focus:outline-none"
          style={filterTema ? { borderColor: "#818CF870", background: "#818CF818", color: "#818CF8" } : undefined}
        >
          <option value="">Semua tema</option>
          {allTema.map((t) => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>
        {filterTema && (
          <button onClick={() => setFilterTema(null)} className="text-[10px] font-bold text-white/40 underline hover:text-white/60">
            Kosongkan
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Category section ───────────────────────────────────────────────────────

function KategoriSection({
  kategori,
  search,
  filterTema,
  filterTahap,
  wajibOnly,
  onOpen,
}: {
  kategori: (typeof PERIBAHASA_KATEGORI_LENGKAP)[number];
  search: string;
  filterTema: string | null;
  filterTahap: TahapPeribahasa | null;
  wajibOnly: boolean;
  onOpen: () => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return kategori.items
      .filter((item) => {
        if (wajibOnly && !item.wajibHafal) return false;
        if (filterTahap && item.tahap !== filterTahap) return false;
        if (filterTema && !item.tema.includes(filterTema)) return false;
        if (q && !item.peribahasa.toLowerCase().includes(q) && !item.maksud.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => Number(b.wajibHafal) - Number(a.wajibHafal));
  }, [kategori.items, search, filterTema, filterTahap, wajibOnly]);

  return (
    <CollapsibleGroup
      title={kategori.nama}
      icon={kategori.icon}
      color={kategori.color}
      countLabel={`${filtered.length}/${kategori.items.length} peribahasa`}
      onOpen={onOpen}
    >
      {filtered.length === 0 ? (
        <p className="py-4 text-center text-xs text-white/40">Tiada peribahasa sepadan dengan carian atau penapis ini.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => (
            <PeribahasaItemCard key={item.peribahasa} item={item} color={kategori.color} />
          ))}
        </div>
      )}
    </CollapsibleGroup>
  );
}

// ─── Top 50 section ─────────────────────────────────────────────────────────

function Top50Section({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleGroup
      title="50 Peribahasa Wajib Hafal Tingkatan 1"
      icon="🔥"
      color="#FBBF24"
      countLabel={`${TOP_50_PERIBAHASA.length} peribahasa`}
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Senarai padat untuk ulang kaji pantas sebelum peperiksaan — peribahasa, maksud ringkas, dan tema.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_50_PERIBAHASA.map((item, i) => (
          <div key={item.peribahasa} className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-[9px] font-black text-yellow-300">
                {i + 1}
              </span>
              <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-[9px] font-bold text-yellow-300/80">{item.tema}</span>
            </div>
            <p className="mb-1 text-sm font-black italic text-white">{item.peribahasa}</p>
            <p className="text-xs leading-snug text-white/55">{item.maksudRingkas}</p>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Tema quick reference table ────────────────────────────────────────────

function TemaTableSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleGroup
      title="Peribahasa Ikut Tema Karangan"
      icon="📚"
      color="#38BDF8"
      countLabel={`${TEMA_KARANGAN_PERIBAHASA.length} tema`}
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Rujukan pantas — pilih tema karangan anda dan dapatkan peribahasa yang sesuai serta-merta.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {TEMA_KARANGAN_PERIBAHASA.map((g) => (
          <div key={g.tema} className="rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{g.icon}</span>
              <span className="text-sm font-bold text-white">{g.tema}</span>
            </div>
            <ul className="space-y-1">
              {g.peribahasa.map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-xs leading-relaxed text-white/65">
                  <span className="mt-0.5 text-sky-400">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Aras Tinggi section ────────────────────────────────────────────────────

function ArasTinggiSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleGroup
      title="Peribahasa Aras Tinggi"
      icon="🔥"
      color="#FB7185"
      countLabel={`${PERIBAHASA_ARAS_TINGGI.length} peribahasa`}
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Untuk pelajar yang menyasarkan markah cemerlang — peribahasa lanjutan yang memberi impak bahasa tertinggi dalam karangan.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {PERIBAHASA_ARAS_TINGGI.map((item) => (
          <PeribahasaItemCard key={item.peribahasa} item={item} color="#FB7185" />
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Peribahasa Dalam Karangan usage guide ──────────────────────────────────

function KaranganUsageSection({ onOpen }: { onOpen: () => void }) {
  const colors: Record<string, string> = { Pendahuluan: "#818CF8", Isi: "#34D399", Kesimpulan: "#2DD4BF" };
  return (
    <CollapsibleGroup
      title="Peribahasa Dalam Karangan"
      icon="🎯"
      color="#A78BFA"
      countLabel="3 bahagian"
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Tunjuk cara meletakkan peribahasa pada bahagian yang tepat dalam karangan respons terbuka.
      </p>
      <div className="space-y-3">
        {PERIBAHASA_DALAM_KARANGAN.map((u) => (
          <div key={u.bahagian} className="rounded-xl border p-3.5" style={{ borderColor: `${colors[u.bahagian]}30`, background: `${colors[u.bahagian]}0a` }}>
            <span
              className="mb-2 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black"
              style={{ background: `${colors[u.bahagian]}25`, color: colors[u.bahagian] }}
            >
              {u.bahagian}
            </span>
            <p className="mb-2 text-xs leading-relaxed text-white/60">{u.penjelasan}</p>
            <div className="rounded-lg border border-white/5 bg-black/20 p-2.5">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-white/30">Contoh Ayat Lengkap</p>
              <p className="text-xs italic leading-relaxed text-white/70">{u.contohAyat}</p>
            </div>
            <p className="mt-2 text-[10px] font-bold text-white/40">
              Peribahasa digunakan: <span style={{ color: colors[u.bahagian] }}>{u.peribahasaDigunakan}</span>
            </p>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────

export function PeribahasaBankLengkapHub({ topic, color, onBack }: { topic: BMTopic; color: string; onBack: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTema, setFilterTema] = useState<string | null>(null);
  const [filterTahap, setFilterTahap] = useState<TahapPeribahasa | null>(null);
  const [wajibOnly, setWajibOnly] = useState(false);

  useEffect(() => {
    setOpened(loadOpened());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opened));
  }, [opened, hydrated]);

  const markOpened = (id: string) => {
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const allTema = useMemo(() => {
    const set = new Set<string>();
    PERIBAHASA_KATEGORI_LENGKAP.forEach((k) => k.items.forEach((i) => i.tema.forEach((t) => set.add(t))));
    return Array.from(set).sort();
  }, []);

  const totalPeribahasa = PERIBAHASA_KATEGORI_LENGKAP.reduce((sum, k) => sum + k.items.length, 0);
  const progressPct = Math.round((opened.length / SECTION_IDS.length) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
          aria-label="Kembali"
        >
          <ChevronLeft className="h-4 w-4 text-white/60" />
        </button>
        <div className="min-w-0">
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Peribahasa</p>
          <h2 className="truncate font-display text-lg font-bold text-white">Peribahasa Bank Lengkap</h2>
        </div>
      </div>

      {topic.description && <p className="text-sm leading-relaxed text-white/55">{topic.description}</p>}

      <BadgeLegend />

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-white/60">Kemajuan Modul</span>
          <span className="text-[11px] font-black" style={{ color }}>
            {opened.length}/{SECTION_IDS.length} bahagian
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: color }} />
        </div>
        {progressPct === 100 && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/15 to-emerald-500/15 p-3.5 animate-fade-up">
            <Trophy className="h-5 w-5 shrink-0 text-yellow-300" />
            <p className="text-xs font-bold text-white">
              Anda telah menguasai {totalPeribahasa}+ peribahasa — sedia untuk karangan Skor A!
            </p>
          </div>
        )}
        <p className="mt-3 text-[11px] text-white/40">
          {PERIBAHASA_KATEGORI_LENGKAP.length} kategori · {totalPeribahasa} peribahasa keseluruhan
        </p>
      </div>

      <FilterToolbar
        search={search}
        setSearch={setSearch}
        allTema={allTema}
        filterTema={filterTema}
        setFilterTema={setFilterTema}
        filterTahap={filterTahap}
        setFilterTahap={setFilterTahap}
        wajibOnly={wajibOnly}
        setWajibOnly={setWajibOnly}
      />

      {PERIBAHASA_KATEGORI_LENGKAP.map((kategori) => (
        <KategoriSection
          key={kategori.id}
          kategori={kategori}
          search={search}
          filterTema={filterTema}
          filterTahap={filterTahap}
          wajibOnly={wajibOnly}
          onOpen={() => markOpened(kategori.id)}
        />
      ))}

      <Top50Section onOpen={() => markOpened("top50")} />
      <TemaTableSection onOpen={() => markOpened("tema")} />
      <ArasTinggiSection onOpen={() => markOpened("aras-tinggi")} />
      <KaranganUsageSection onOpen={() => markOpened("karangan-usage")} />
    </div>
  );
}

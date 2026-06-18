import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ShieldCheck, Trophy } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import {
  PENANDA_WACANA_LENGKAP,
  PENANDA_WACANA_SELAMAT_UASA,
  PENANDA_WACANA_ARAS_TINGGI,
  type PenandaWacanaItem,
  type PenandaWacanaArasTinggiItem,
} from "@/data/bm-penanda-wacana-lengkap";

const STORAGE_KEY = "bm-penanda-wacana-lengkap-v1";
const SECTION_IDS = [...PENANDA_WACANA_LENGKAP.map((k) => k.id), "selamat-uasa", "aras-tinggi"];

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
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base"
            style={{ background: `${color}22` }}
          >
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

// ─── Penanda wacana item card ──────────────────────────────────────────────

function ItemCard({ item, color }: { item: PenandaWacanaItem; color: string }) {
  return (
    <div className="rounded-xl border p-3.5" style={{ borderColor: `${color}30`, background: `${color}0a` }}>
      <span
        className="mb-2 inline-flex items-center rounded-lg px-2.5 py-1 text-sm font-black"
        style={{ background: `${color}25`, color }}
      >
        {item.frasa}
      </span>
      <p className="mb-2 text-xs leading-relaxed text-white/65">
        <span className="font-bold text-white/80">Bila digunakan: </span>
        {item.kegunaan}
      </p>
      <div className="mb-2 rounded-lg border border-white/5 bg-black/20 p-2.5">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-white/30">Contoh Ayat</p>
        <p className="text-xs italic leading-relaxed text-white/70">&ldquo;{item.contohAyat}&rdquo;</p>
      </div>
      {item.kosaKataSukar.length > 0 && (
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-wide text-white/30">Kosa Kata Sukar</p>
          <div className="flex flex-wrap gap-1.5">
            {item.kosaKataSukar.map((v) => (
              <span
                key={v.perkataan}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] leading-snug text-white/55"
              >
                <strong className="text-white/80">{v.perkataan}</strong> — {v.maksud}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Category section ──────────────────────────────────────────────────────

function KategoriSection({
  kategori,
  onOpen,
}: {
  kategori: (typeof PENANDA_WACANA_LENGKAP)[number];
  onOpen: () => void;
}) {
  return (
    <CollapsibleGroup
      title={kategori.nama}
      icon={kategori.icon}
      color={kategori.color}
      countLabel={`${kategori.items.length} frasa`}
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">{kategori.penerangan}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {kategori.items.map((item) => (
          <ItemCard key={item.frasa} item={item} color={kategori.color} />
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Paling Selamat Untuk UASA ──────────────────────────────────────────────

function SelamatUasaSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleGroup
      title="Penanda Wacana Paling Selamat Untuk UASA"
      icon="✅"
      color="#34D399"
      countLabel={`${PENANDA_WACANA_SELAMAT_UASA.length} pilihan`}
      defaultOpen
      onOpen={onOpen}
    >
      <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="text-xs leading-relaxed text-white/70">
          Jika kurang yakin, gunakan sahaja frasa dalam senarai ini — risiko kesalahan tatabahasa paling rendah dan diterima
          dalam semua jenis karangan UASA.
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {PENANDA_WACANA_SELAMAT_UASA.map((item) => (
          <div key={item.frasa} className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-3.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-[9px] font-black uppercase tracking-wide text-emerald-300">{item.kategori}</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-300">
                ✅ Selamat
              </span>
            </div>
            <p className="mb-1.5 text-sm font-black text-white">{item.frasa}</p>
            <p className="text-xs leading-relaxed text-white/60">{item.sebab}</p>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Aras Tinggi ────────────────────────────────────────────────────────────

function ArasTinggiCard({ item }: { item: PenandaWacanaArasTinggiItem }) {
  return (
    <div className="rounded-xl border border-yellow-500/25 bg-gradient-to-br from-yellow-500/[0.08] to-purple-500/[0.05] p-3.5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-lg bg-yellow-500/20 px-2.5 py-1 text-sm font-black text-yellow-300">
          {item.frasa}
        </span>
        <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[9px] font-black text-purple-300">🏆 Aras Tinggi</span>
      </div>
      <p className="mb-2 text-xs leading-relaxed text-white/65">
        <span className="font-bold text-white/80">Bila digunakan: </span>
        {item.kegunaan}
      </p>
      <div className="mb-2 rounded-lg border border-white/5 bg-black/20 p-2.5">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-white/30">Contoh Ayat</p>
        <p className="text-xs italic leading-relaxed text-white/70">&ldquo;{item.contohAyat}&rdquo;</p>
      </div>
      {item.kosaKataSukar.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.kosaKataSukar.map((v) => (
            <span key={v.perkataan} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] leading-snug text-white/55">
              <strong className="text-white/80">{v.perkataan}</strong> — {v.maksud}
            </span>
          ))}
        </div>
      )}
      <div className="rounded-lg border border-rose-500/20 bg-rose-500/[0.06] p-2.5">
        <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-rose-300">⚠ Amaran Penggunaan</p>
        <p className="text-xs leading-relaxed text-white/65">{item.amaran}</p>
      </div>
    </div>
  );
}

function ArasTinggiSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleGroup
      title="Penanda Wacana Aras Tinggi"
      icon="🏆"
      color="#FBBF24"
      countLabel={`${PENANDA_WACANA_ARAS_TINGGI.length} frasa`}
      onOpen={onOpen}
    >
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Untuk pelajar yang menyasarkan markah cemerlang. Frasa ini memberi impak bahasa yang tinggi tetapi perlu digunakan
        dengan tepat — semak amaran penggunaan setiap frasa sebelum menulis.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {PENANDA_WACANA_ARAS_TINGGI.map((item) => (
          <ArasTinggiCard key={item.frasa} item={item} />
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────

export function PenandaWacanaLengkapHub({ topic, color, onBack }: { topic: BMTopic; color: string; onBack: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

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

  const totalFrasa =
    PENANDA_WACANA_LENGKAP.reduce((sum, k) => sum + k.items.length, 0) +
    PENANDA_WACANA_SELAMAT_UASA.length +
    PENANDA_WACANA_ARAS_TINGGI.length;
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
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Karangan</p>
          <h2 className="truncate font-display text-lg font-bold text-white">Penanda Wacana Lengkap</h2>
        </div>
      </div>

      {topic.description && <p className="text-sm leading-relaxed text-white/55">{topic.description}</p>}

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
              Anda telah menguasai {totalFrasa} penanda wacana — sedia untuk karangan Skor A!
            </p>
          </div>
        )}
        <p className="mt-3 text-[11px] text-white/40">
          {PENANDA_WACANA_LENGKAP.length} kategori · {totalFrasa} penanda wacana keseluruhan
        </p>
      </div>

      {PENANDA_WACANA_LENGKAP.map((kategori) => (
        <KategoriSection key={kategori.id} kategori={kategori} onOpen={() => markOpened(kategori.id)} />
      ))}

      <SelamatUasaSection onOpen={() => markOpened("selamat-uasa")} />
      <ArasTinggiSection onOpen={() => markOpened("aras-tinggi")} />
    </div>
  );
}

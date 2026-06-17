import { useEffect, useState } from "react";
import {
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Network,
  PieChart,
  ScrollText,
  Star,
  Table2,
  Trophy,
} from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import {
  CONTOH_KARANGAN_CEMERLANG,
  FORMULA_SKOR_A_CODE,
  FORMULA_SKOR_A_FLOW,
  FORMULA_SKOR_A_STEPS,
  GRAFIK_JENIS,
  GRAFIK_STEPS,
  ISI_CONTOH_AYAT,
  ISI_CONTOH_GRAFIK,
  ISI_CONTOH_TOPIK,
  KESALAHAN_LAZIM,
  LATIHAN_BERPANDU,
  LEMAH_VS_CEMERLANG,
  PENANDA_WACANA_GROUPS,
  QUICK_REVISION_CHECKLIST,
  UNGKAPAN_MENARIK_BANK,
  essayWordCount,
  type ContohEssayParts,
  type ContohKaranganTema,
  type GrafikJenis,
  type LatihanBerpanduTema,
} from "@/data/bm-karangan-pendek-hub";

const STORAGE_KEY = "bm-karangan-pendek-hub-v1";
const SECTION_IDS = ["penanda", "ungkapan", "grafik", "isi", "kesalahan", "perbandingan", "contoh", "latihan", "semakan"] as const;

function loadHubState() {
  const fallback = { opened: [] as string[], checklist: Array(QUICK_REVISION_CHECKLIST.length).fill(false) as boolean[] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      opened: Array.isArray(parsed.opened) ? parsed.opened : fallback.opened,
      checklist:
        Array.isArray(parsed.checklist) && parsed.checklist.length === QUICK_REVISION_CHECKLIST.length
          ? parsed.checklist
          : fallback.checklist,
    };
  } catch {
    return fallback;
  }
}

// ─── Shared small pieces ──────────────────────────────────────────────────────

function EarnedBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black tracking-wide" style={{ background: `${color}20`, color }}>
      {label}
    </span>
  );
}

function SkorATip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4">
      <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
      <div>
        <p className="mb-0.5 text-[10px] font-black uppercase tracking-wide text-yellow-400">Skor A Tip</p>
        <p className="text-sm leading-relaxed text-white/80">{children}</p>
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  onOpen,
  children,
}: {
  title: string;
  icon?: string;
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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.05]"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white">
          {icon && <span className="text-base">{icon}</span>}
          {title}
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

function EssayDisplay({ karangan, color }: { karangan: ContohEssayParts; color: string }) {
  const wc = essayWordCount(karangan);
  const inRange = wc >= 50 && wc <= 80;
  const parts: { label: string; text: string; tint: string }[] = [
    { label: "Pendahuluan", text: karangan.pendahuluan, tint: color },
    { label: "Isi 1", text: karangan.isi1, tint: "#34D399" },
    { label: "Isi 2", text: karangan.isi2, tint: "#34D399" },
    { label: "Isi 3", text: karangan.isi3, tint: "#34D399" },
    { label: "Kesimpulan", text: karangan.kesimpulan, tint: "#A78BFA" },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase tracking-wide text-white/40">Karangan Lengkap</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={inRange ? { background: "#34D39925", color: "#34D399" } : { background: "#FB718525", color: "#FB7185" }}
        >
          {inRange ? "✅" : "⚠"} {wc} patah perkataan
        </span>
      </div>
      <div className="space-y-2">
        {parts.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-white/80">
            <span
              className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide"
              style={{ background: `${p.tint}25`, color: p.tint }}
            >
              {p.label}
            </span>
            {p.text}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Section 1: Formula Skor A (hero) ─────────────────────────────────────────

function HeroFormula({ color }: { color: string }) {
  return (
    <div
      className="overflow-hidden rounded-3xl border p-5"
      style={{ borderColor: `${color}40`, background: `linear-gradient(135deg, ${color}1A 0%, #0b1020 100%)` }}
    >
      <p className="mb-1 text-[10px] font-black uppercase tracking-wide" style={{ color }}>
        Formula Skor A
      </p>
      <h3 className="mb-4 font-display text-xl font-black text-white">Formula Karangan Pendek Skor A</h3>

      <div className="mb-5 flex flex-col items-center">
        {FORMULA_SKOR_A_FLOW.map((step, i) => (
          <div key={step} className="flex w-full flex-col items-center">
            <div
              className="w-full rounded-xl border px-4 py-2.5 text-center text-sm font-bold text-white"
              style={{ borderColor: `${color}35`, background: "rgba(255,255,255,0.04)" }}
            >
              {step}
            </div>
            {i < FORMULA_SKOR_A_FLOW.length - 1 && <span className="my-1 text-base text-white/25">↓</span>}
          </div>
        ))}
      </div>

      <div
        className="mb-4 flex items-center justify-center rounded-2xl border-2 px-4 py-3 text-center"
        style={{ borderColor: color, background: `${color}15` }}
      >
        <span className="font-display text-lg font-black tracking-wide" style={{ color }}>
          {FORMULA_SKOR_A_CODE}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {FORMULA_SKOR_A_STEPS.map((s) => (
          <div key={s.code} className="rounded-xl border border-white/10 bg-black/20 p-2.5">
            <p className="text-base font-black" style={{ color }}>
              {s.code}
            </p>
            <p className="text-[11px] font-bold text-white/85">{s.label}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-white/45">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 2: Penanda Wacana ────────────────────────────────────────────────

function PenandaWacanaSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (idx: number, items: string[]) => {
    try {
      await navigator.clipboard.writeText(items.join(", "));
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1500);
    } catch {
      // papan klip tidak tersedia
    }
  };

  return (
    <CollapsibleSection title="Penanda Wacana Wajib Hafal" icon="🔗" onOpen={onOpen}>
      <div className="space-y-3">
        {PENANDA_WACANA_GROUPS.map((g, idx) => (
          <div key={g.kategori} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wide" style={{ color }}>
                {g.kategori}
              </span>
              <button
                onClick={() => handleCopy(idx, g.items)}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white/60 transition-colors hover:bg-white/10"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" /> Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Salin
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 3: Bank Ungkapan Menarik ─────────────────────────────────────────

function UngkapanMenarikSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Bank Ungkapan Menarik" icon="💎" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">
        Kumpul ungkapan ini mengikut tema — guna dalam pendahuluan atau kesimpulan untuk markah bahasa lebih tinggi.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {UNGKAPAN_MENARIK_BANK.map((u) => (
          <div key={u.tema} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-lg">{u.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-wide" style={{ color }}>
                {u.tema}
              </span>
            </div>
            <p className="text-sm italic leading-relaxed text-white/85">"{u.ungkapan}"</p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 4: Cara Membaca Bahan Grafik ─────────────────────────────────────

const GRAFIK_ICON_MAP: Record<GrafikJenis["icon"], typeof Table2> = {
  Table2,
  PieChart,
  BarChart3,
  Network,
  ScrollText,
  Image: ImageIcon,
};

function GrafikTutorialSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Cara Membaca Bahan Grafik" icon="📊" onOpen={onOpen}>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {GRAFIK_JENIS.map((g) => {
          const Icon = GRAFIK_ICON_MAP[g.icon];
          return (
            <div key={g.nama} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
              <Icon className="mx-auto mb-1.5 h-5 w-5" style={{ color }} />
              <p className="mb-1 text-xs font-bold text-white">{g.nama}</p>
              <p className="text-[10px] leading-snug text-white/45">{g.tip}</p>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        {GRAFIK_STEPS.map((s, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
              {i + 1}
            </span>
            <p className="text-sm text-white/70">{s}</p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 5: Cara Mengenal Pasti Isi ───────────────────────────────────────

function IsiIdentificationSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  const [revealed, setRevealed] = useState<boolean[]>(Array(ISI_CONTOH_AYAT.length).fill(false));

  const toggle = (i: number) => setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <CollapsibleSection title="Cara Mengenal Pasti Isi" icon="🔍" onOpen={onOpen}>
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
        <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Contoh Topik: {ISI_CONTOH_TOPIK}</p>
        <ul className="space-y-1">
          {ISI_CONTOH_GRAFIK.map((g, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-white/65">
              <span style={{ color }}>•</span>
              {g}
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-2 text-xs text-white/45">Tekan setiap isi untuk lihat cara menukarnya kepada ayat penuh.</p>
      <div className="space-y-2">
        {ISI_CONTOH_AYAT.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-left transition-all hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-white">{item.ringkas}</span>
              {revealed[i] ? <EyeOff className="h-3.5 w-3.5 shrink-0 text-white/40" /> : <Eye className="h-3.5 w-3.5 shrink-0 text-white/40" />}
            </div>
            {revealed[i] && (
              <p className="animate-fade-up mt-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-sm leading-relaxed text-white/80">
                {item.ayatPenuh}
              </p>
            )}
          </button>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 6: Kesalahan Lazim Murid ─────────────────────────────────────────

function KesalahanLazimSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleSection title="Kesalahan Lazim Murid" icon="⚠️" onOpen={onOpen}>
      <div className="space-y-3">
        {KESALAHAN_LAZIM.map((k, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-white/10">
            <div className="flex items-start gap-2 border-b border-white/10 bg-rose-500/10 px-3.5 py-2.5">
              <span className="mt-0.5 shrink-0 text-rose-400">❌</span>
              <div>
                <p className="text-sm font-bold text-rose-200">{k.label}</p>
                <p className="mt-0.5 text-xs text-white/55">{k.mengapa}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-emerald-500/10 px-3.5 py-2.5">
              <span className="mt-0.5 shrink-0 text-emerald-400">✅</span>
              <p className="text-xs leading-relaxed text-emerald-100/80">{k.caraBetulkan}</p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 7: Karangan Lemah vs Cemerlang ───────────────────────────────────

function PerbandinganSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleSection title="Karangan Lemah vs Cemerlang" icon="⚖️" onOpen={onOpen}>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-rose-500/15 px-3 py-2 text-center text-xs font-black text-rose-300">Karangan Lemah</div>
        <div className="rounded-lg bg-emerald-500/15 px-3 py-2 text-center text-xs font-black text-emerald-300">Karangan Cemerlang</div>
      </div>
      <div className="space-y-3">
        {LEMAH_VS_CEMERLANG.map((row) => (
          <div key={row.aspek}>
            <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-white/40">{row.aspek}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-2.5 text-xs leading-snug text-white/70">{row.lemah}</div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs leading-snug text-white/70">{row.cemerlang}</div>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 8: Contoh Karangan Cemerlang ─────────────────────────────────────

function NestedTema({ item, color }: { item: ContohKaranganTema; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white">
          <span>{item.icon}</span> {item.tema}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="animate-fade-up space-y-3 border-t border-white/5 px-3.5 py-3.5">
          <div>
            <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Bahan Grafik: {item.tajukGrafik}</p>
            <ul className="space-y-1">
              {item.grafik.map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-white/60">
                  <span style={{ color }}>•</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5 p-3">
            <p className="mb-1.5 text-[9px] font-black uppercase tracking-wide text-white/40">Rangka</p>
            <p className="text-xs text-white/60">P: {item.rangka.pendahuluan}</p>
            {item.rangka.isi.map((isi, i) => (
              <p key={i} className="text-xs text-white/60">
                I{i + 1}: {isi}
              </p>
            ))}
            <p className="text-xs text-white/60">K: {item.rangka.kesimpulan}</p>
          </div>
          <EssayDisplay karangan={item.karangan} color={color} />
        </div>
      )}
    </div>
  );
}

function ContohKaranganSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Contoh Karangan Cemerlang (10 Tema)" icon="🏅" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Tekan setiap tema untuk lihat grafik, rangka dan karangan penuh.</p>
      <div className="space-y-2">
        {CONTOH_KARANGAN_CEMERLANG.map((c) => (
          <NestedTema key={c.id} item={c} color={color} />
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 9: Latihan Berpandu ──────────────────────────────────────────────

function LatihanCard({ item, color }: { item: LatihanBerpanduTema; color: string }) {
  const [step, setStep] = useState(0); // 0=grafik, 1=cuba, 2=jawapan, 3=model
  const model = CONTOH_KARANGAN_CEMERLANG.find((c) => c.id === item.modelKaranganRef);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-base">{item.icon}</span>
        <span className="text-sm font-bold text-white">{item.tema}</span>
      </div>

      <div className="mb-3 flex gap-1.5">
        {["Grafik", "Cuba", "Jawapan", "Model"].map((s, i) => (
          <span key={s} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? color : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>

      <div className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">{item.tajukGrafik}</div>
      <ul className="mb-3 space-y-1">
        {item.grafik.map((g, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-white/60">
            <span style={{ color }}>•</span>
            {g}
          </li>
        ))}
      </ul>

      {step === 0 && (
        <button
          onClick={() => setStep(1)}
          className="w-full rounded-lg px-3 py-2 text-xs font-bold transition-all"
          style={{ background: `${color}25`, color }}
        >
          Cuba Kenal Pasti Isi →
        </button>
      )}

      {step === 1 && (
        <div className="animate-fade-up space-y-2">
          <p className="text-xs text-white/55">Tulis 3 isi anda sendiri di atas kertas, kemudian semak jawapan.</p>
          <button
            onClick={() => setStep(2)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70 transition-colors hover:bg-white/10"
          >
            Tunjukkan Isi yang Betul
          </button>
        </div>
      )}

      {step >= 2 && (
        <div className="animate-fade-up mb-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
          <p className="mb-1.5 text-[9px] font-black uppercase tracking-wide text-emerald-400">Isi yang Betul</p>
          <ul className="space-y-1">
            {item.isiBetul.map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-white/70">
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <button onClick={() => setStep(3)} className="w-full rounded-lg px-3 py-2 text-xs font-bold" style={{ background: `${color}25`, color }}>
          Lihat Model Karangan
        </button>
      )}

      {step === 3 && model && (
        <div className="animate-fade-up">
          <EssayDisplay karangan={model.karangan} color={color} />
        </div>
      )}
    </div>
  );
}

function LatihanBerpanduSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Latihan Berpandu" icon="✏️" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">
        Ikut 4 langkah untuk setiap tema: lihat grafik → cuba kenal pasti isi → semak jawapan → lihat model karangan.
      </p>
      <div className="space-y-3">
        {LATIHAN_BERPANDU.map((l) => (
          <LatihanCard key={l.id} item={l} color={color} />
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 10: 1 Minit Sebelum Peperiksaan ──────────────────────────────────

function QuickRevisionSection({
  checked,
  onToggle,
  onOpen,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
  onOpen: () => void;
}) {
  const done = checked.filter(Boolean).length;
  const all = done === QUICK_REVISION_CHECKLIST.length;

  return (
    <CollapsibleSection title="1 Minit Sebelum Peperiksaan" icon="⏱️" defaultOpen onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Semak senarai ini sebelum hantar kertas jawapan anda.</p>
      <div className="space-y-2">
        {QUICK_REVISION_CHECKLIST.map((item, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all"
            style={{
              borderColor: checked[i] ? "#34D39955" : "rgba(255,255,255,0.08)",
              background: checked[i] ? "#34D39912" : "rgba(255,255,255,0.02)",
            }}
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-black"
              style={{
                borderColor: checked[i] ? "#34D399" : "rgba(255,255,255,0.2)",
                background: checked[i] ? "#34D399" : "transparent",
                color: checked[i] ? "#06231a" : "transparent",
              }}
            >
              ✓
            </span>
            <span className={`text-sm ${checked[i] ? "text-white/90" : "text-white/60"}`}>{item}</span>
          </button>
        ))}
      </div>
      {all && (
        <div className="animate-fade-up mt-4 flex items-center gap-3 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/15 to-emerald-500/15 p-4">
          <Trophy className="h-6 w-6 shrink-0 text-yellow-300" />
          <div>
            <p className="text-sm font-black text-white">Sedia 100% untuk Peperiksaan!</p>
            <p className="text-xs text-white/60">Anda telah menguasai semua elemen wajib karangan pendek.</p>
          </div>
        </div>
      )}
      <p className="mt-3 text-right text-[11px] font-bold text-white/40">
        {done}/{QUICK_REVISION_CHECKLIST.length} lengkap
      </p>
    </CollapsibleSection>
  );
}

// ─── Legacy notes (original content — kept, not removed) ─────────────────────

function LegacyNotesSection({ topic }: { topic: BMTopic; color: string }) {
  if (!topic.formula && !topic.steps && !topic.commonMistakes && !topic.uasaTips) return null;
  return (
    <CollapsibleSection title="Nota Asal (Ringkasan Pantas)" icon="📋">
      {topic.formula && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Langkah-langkah</p>
          <div className="space-y-1.5">
            {topic.formula.map((step, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs text-white/65">
                <span className="font-black text-white/40">{i + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
      {topic.steps && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Cara Baca & Cara Tulis</p>
          <div className="space-y-1.5">
            {topic.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs text-white/65">
                <span className="font-black text-white/40">{i + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
      {topic.commonMistakes && (
        <div className="mb-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5">
          <p className="mb-2 text-[10px] font-black text-rose-400">⚠ Kesalahan Lazim (Asal)</p>
          <ul className="space-y-1.5">
            {topic.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/65">
                <span className="text-rose-400">×</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
      {topic.uasaTips && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3.5">
          <p className="mb-2 text-[10px] font-black text-yellow-400">★ Tips Markah Penuh (Asal)</p>
          <ul className="space-y-1.5">
            {topic.uasaTips.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/65">
                <Star className="mt-0.5 h-3 w-3 shrink-0 text-yellow-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </CollapsibleSection>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function KaranganPendekHub({ topic, color, onBack }: { topic: BMTopic; color: string; onBack: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<boolean[]>(Array(QUICK_REVISION_CHECKLIST.length).fill(false));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = loadHubState();
    setOpened(s.opened);
    setChecklist(s.checklist);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ opened, checklist }));
  }, [opened, checklist, hydrated]);

  const markOpened = (id: string) => {
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const toggleChecklist = (i: number) => {
    setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const progressPct = Math.round((opened.length / SECTION_IDS.length) * 100);
  const allChecked = checklist.every(Boolean);

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
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Karangan Pendek</p>
          <h2 className="truncate font-display text-lg font-bold text-white">Pusat Persediaan Peperiksaan</h2>
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
        {(progressPct === 100 || allChecked) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {progressPct === 100 && <EarnedBadge label="🏆 Pakar Karangan Pendek" color="#FBBF24" />}
            {allChecked && <EarnedBadge label="📝 Sedia untuk Peperiksaan" color="#34D399" />}
          </div>
        )}
      </div>

      <HeroFormula color={color} />

      <SkorATip>
        Hafal kod <strong className="text-white">{FORMULA_SKOR_A_CODE}</strong> — ia membantu anda mengingati struktur karangan dalam masa kurang
        10 saat semasa peperiksaan!
      </SkorATip>

      <PenandaWacanaSection color={color} onOpen={() => markOpened("penanda")} />
      <UngkapanMenarikSection color={color} onOpen={() => markOpened("ungkapan")} />
      <GrafikTutorialSection color={color} onOpen={() => markOpened("grafik")} />
      <IsiIdentificationSection color={color} onOpen={() => markOpened("isi")} />

      <SkorATip>Jangan tulis isi dalam bentuk poin. Sentiasa tukar kepada ayat penuh dengan penanda wacana di hadapan setiap isi.</SkorATip>

      <KesalahanLazimSection onOpen={() => markOpened("kesalahan")} />
      <PerbandinganSection onOpen={() => markOpened("perbandingan")} />
      <ContohKaranganSection color={color} onOpen={() => markOpened("contoh")} />
      <LatihanBerpanduSection color={color} onOpen={() => markOpened("latihan")} />

      <SkorATip>Dalam peperiksaan sebenar, soalan ini hanya patut mengambil masa 15 minit — jangan habiskan masa terlalu lama di sini.</SkorATip>

      <QuickRevisionSection checked={checklist} onToggle={toggleChecklist} onOpen={() => markOpened("semakan")} />

      <LegacyNotesSection topic={topic} color={color} />
    </div>
  );
}

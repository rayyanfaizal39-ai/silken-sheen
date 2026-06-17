import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronLeft, Copy, Star, Trophy } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import {
  CHECKLIST_SKOR_A_PANJANG,
  FORMULA_PANJANG_FLOW,
  FORMULA_PANJANG_NOTES,
  IMBAK_STEPS,
  IMBAK_WORKED_EXAMPLE,
  ISI_FORMULA_EXAMPLE,
  ISI_FORMULA_STEPS,
  KARANGAN_BERPANDU_PANJANG,
  KESALAHAN_LAZIM_PANJANG,
  LEMAH_VS_CEMERLANG_PANJANG,
  PENANDA_WACANA_PANJANG_GROUPS,
  PENDAHULUAN_PARTS,
  PENUTUP_EXAMPLE,
  PENUTUP_PARTS,
  UNGKAPAN_MENARIK_PANJANG,
  countWords,
  type KaranganBerpanduIsi,
  type KaranganBerpanduTema,
} from "@/data/bm-karangan-panjang-hub";

const STORAGE_KEY = "bm-karangan-panjang-hub-v1";
const SECTION_IDS = ["imbak", "pendahuluan", "isi", "penutup", "penanda", "ungkapan", "kesalahan", "perbandingan", "berpandu", "checklist"] as const;

function loadHubState() {
  const fallback = { opened: [] as string[], checklist: Array(CHECKLIST_SKOR_A_PANJANG.length).fill(false) as boolean[] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      opened: Array.isArray(parsed.opened) ? parsed.opened : fallback.opened,
      checklist:
        Array.isArray(parsed.checklist) && parsed.checklist.length === CHECKLIST_SKOR_A_PANJANG.length
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

function ImbakMiniCard({ data, color }: { data: KaranganBerpanduIsi; color: string }) {
  const rows: { code: string; text: string }[] = [
    { code: "I", text: data.i },
    { code: "M", text: data.m },
    { code: "B", text: data.b },
    { code: "A", text: data.a },
    { code: "K", text: data.k },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="space-y-1.5">
        {rows.map((r) => (
          <p key={r.code} className="text-xs leading-relaxed text-white/75">
            <span
              className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded text-[9px] font-black"
              style={{ background: `${color}25`, color }}
            >
              {r.code}
            </span>
            {r.text}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Section 1: Formula Karangan Panjang (hero) ───────────────────────────────

function HeroFormula({ color }: { color: string }) {
  return (
    <div
      className="overflow-hidden rounded-3xl border p-5"
      style={{ borderColor: `${color}40`, background: `linear-gradient(135deg, ${color}1A 0%, #0b1020 100%)` }}
    >
      <p className="mb-1 text-[10px] font-black uppercase tracking-wide" style={{ color }}>
        Formula Skor A
      </p>
      <h3 className="mb-4 font-display text-xl font-black text-white">Formula Karangan Panjang</h3>

      <div className="mb-5 flex flex-col items-center">
        {FORMULA_PANJANG_FLOW.map((step, i) => (
          <div key={step} className="flex w-full flex-col items-center">
            <div
              className="w-full rounded-xl border px-4 py-2.5 text-center text-sm font-bold text-white"
              style={{ borderColor: `${color}35`, background: "rgba(255,255,255,0.04)" }}
            >
              {step}
            </div>
            {i < FORMULA_PANJANG_FLOW.length - 1 && <span className="my-1 text-base text-white/25">↓</span>}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {FORMULA_PANJANG_NOTES.map((note) => (
          <div key={note} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 p-2.5">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
            <p className="text-xs leading-relaxed text-white/75">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 2: Formula IMBAK ─────────────────────────────────────────────────

function ImbakSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  const wc = countWords(
    `${IMBAK_WORKED_EXAMPLE.i} ${IMBAK_WORKED_EXAMPLE.m} ${IMBAK_WORKED_EXAMPLE.b} ${IMBAK_WORKED_EXAMPLE.a} ${IMBAK_WORKED_EXAMPLE.k}`,
  );
  const rows: { code: string; text: string }[] = [
    { code: "I", text: IMBAK_WORKED_EXAMPLE.i },
    { code: "M", text: IMBAK_WORKED_EXAMPLE.m },
    { code: "B", text: IMBAK_WORKED_EXAMPLE.b },
    { code: "A", text: IMBAK_WORKED_EXAMPLE.a },
    { code: "K", text: IMBAK_WORKED_EXAMPLE.k },
  ];
  return (
    <CollapsibleSection title="Formula IMBAK" icon="🧩" onOpen={onOpen}>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {IMBAK_STEPS.map((s) => (
          <div key={s.code} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-base font-black" style={{ color }}>
              {s.code}
            </p>
            <p className="text-[11px] font-bold text-white/85">{s.label}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-white/45">{s.desc}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Contoh Lengkap (Kitar Semula)</p>
      <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-wide text-white/40">Perenggan Isi</span>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#34D39925", color: "#34D399" }}>
            {wc} patah perkataan
          </span>
        </div>
        <div className="space-y-2">
          {rows.map((r) => (
            <p key={r.code} className="text-sm leading-relaxed text-white/80">
              <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black" style={{ background: `${color}25`, color }}>
                {r.code}
              </span>
              {r.text}
            </p>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 3: Formula Pendahuluan ───────────────────────────────────────────

function PendahuluanFormulaSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Formula Pendahuluan" icon="🚪" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Pendahuluan mesti mengandungi tiga bahagian berikut.</p>
      <div className="space-y-3">
        {PENDAHULUAN_PARTS.map((p, i) => (
          <div key={p.part} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
                {i + 1}
              </span>
              <p className="text-sm font-bold text-white">{p.part}</p>
            </div>
            <p className="mb-2 text-xs text-white/50">{p.desc}</p>
            <div className="rounded-lg border border-white/5 bg-white/5 p-2.5">
              <p className="mb-1 text-[9px] font-bold text-white/30">CONTOH:</p>
              <p className="text-xs italic leading-relaxed text-white/65">{p.example}</p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 4: Formula Isi ───────────────────────────────────────────────────

function IsiFormulaSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  const fields: { label: string; text: string }[] = [
    { label: "Isi", text: ISI_FORMULA_EXAMPLE.isi },
    { label: "Mengapa", text: ISI_FORMULA_EXAMPLE.mengapa },
    { label: "Bagaimana", text: ISI_FORMULA_EXAMPLE.bagaimana },
    { label: "Contoh", text: ISI_FORMULA_EXAMPLE.contoh },
    { label: "Kesan", text: ISI_FORMULA_EXAMPLE.kesan },
    { label: "Kesimpulan Kecil", text: ISI_FORMULA_EXAMPLE.kesimpulanKecil },
  ];
  return (
    <CollapsibleSection title="Formula Isi" icon="🧱" onOpen={onOpen}>
      <div className="mb-4 space-y-2">
        {ISI_FORMULA_STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
              {i + 1}
            </span>
            <span className="text-sm font-semibold text-white/80">{step}</span>
            {i < ISI_FORMULA_STEPS.length - 1 && <span className="text-white/20">↓</span>}
          </div>
        ))}
      </div>

      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Contoh Lengkap (Penjimatan Air)</p>
      <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3.5">
        {fields.map((f) => (
          <p key={f.label} className="text-sm leading-relaxed text-white/80">
            <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: `${color}25`, color }}>
              {f.label}
            </span>
            {f.text}
          </p>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 5: Formula Penutup ───────────────────────────────────────────────

function PenutupFormulaSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  const fields: { label: string; text: string }[] = [
    { label: "Kesimpulan", text: PENUTUP_EXAMPLE.kesimpulan },
    { label: "Penegas", text: PENUTUP_EXAMPLE.penegas },
    { label: "Harapan", text: PENUTUP_EXAMPLE.harapan },
    { label: "Ungkapan Menarik", text: PENUTUP_EXAMPLE.ungkapanMenarik },
  ];
  return (
    <CollapsibleSection title="Formula Penutup" icon="🏁" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Penutup mesti mengandungi empat elemen berikut.</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {PENUTUP_PARTS.map((p) => (
          <span key={p} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70">
            {p}
          </span>
        ))}
      </div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Contoh Lengkap</p>
      <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3.5">
        {fields.map((f) => (
          <p key={f.label} className="text-sm leading-relaxed text-white/80">
            <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: `${color}25`, color }}>
              {f.label}
            </span>
            {f.text}
          </p>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 6: Penanda Wacana ────────────────────────────────────────────────

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
    <CollapsibleSection title="Penanda Wacana" icon="🔗" onOpen={onOpen}>
      <div className="space-y-3">
        {PENANDA_WACANA_PANJANG_GROUPS.map((g, idx) => (
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

// ─── Section 7: Ungkapan Menarik ──────────────────────────────────────────────

function UngkapanMenarikSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Ungkapan Menarik" icon="💎" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Gunakan ungkapan ini dalam pendahuluan atau penutup untuk markah bahasa lebih tinggi.</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {UNGKAPAN_MENARIK_PANJANG.map((u) => (
          <div key={u.tema} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-lg">{u.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-wide" style={{ color }}>
                {u.tema}
              </span>
            </div>
            <div className="space-y-1">
              {u.ungkapan.map((line) => (
                <p key={line} className="text-sm italic leading-relaxed text-white/85">
                  "{line}"
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 8: Kesalahan Lazim Murid ─────────────────────────────────────────

function KesalahanLazimSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleSection title="Kesalahan Lazim Murid" icon="⚠️" onOpen={onOpen}>
      <div className="space-y-3">
        {KESALAHAN_LAZIM_PANJANG.map((k, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-white/10">
            <div className="flex items-start gap-2 border-b border-white/10 bg-rose-500/10 px-3.5 py-2.5">
              <span className="mt-0.5 shrink-0 text-rose-400">❌</span>
              <div>
                <p className="text-sm font-bold text-rose-200">{k.label}</p>
                <p className="mt-0.5 text-xs text-white/55">{k.mengapa}</p>
              </div>
            </div>
            <div className="space-y-2 px-3.5 py-2.5">
              <div className="rounded-lg border border-rose-500/15 bg-rose-500/5 p-2.5">
                <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-rose-300">Versi Lemah</p>
                <p className="text-xs leading-relaxed text-white/65">{k.contohSalah}</p>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-emerald-400">Versi Betul</p>
                <p className="text-xs leading-relaxed text-emerald-100/80">{k.contohBetul}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 9: Karangan Lemah vs Cemerlang ───────────────────────────────────

function PerbandinganSection({ onOpen }: { onOpen: () => void }) {
  return (
    <CollapsibleSection title="Karangan Lemah vs Cemerlang" icon="⚖️" onOpen={onOpen}>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-rose-500/15 px-3 py-2 text-center text-xs font-black text-rose-300">Karangan Lemah</div>
        <div className="rounded-lg bg-emerald-500/15 px-3 py-2 text-center text-xs font-black text-emerald-300">Karangan Cemerlang</div>
      </div>
      <div className="space-y-3">
        {LEMAH_VS_CEMERLANG_PANJANG.map((row) => (
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

// ─── Section 10: Karangan Berpandu ────────────────────────────────────────────

function NestedTema({ item, color }: { item: KaranganBerpanduTema; color: string }) {
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
          <div className="rounded-lg border border-white/5 bg-white/5 p-2.5">
            <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Pendahuluan</p>
            <p className="text-xs text-white/65">{item.pendahuluan}</p>
          </div>
          <div className="space-y-2">
            {item.isi.map((isi, i) => (
              <div key={i}>
                <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Isi {i + 1} (IMBAK)</p>
                <ImbakMiniCard data={isi} color={color} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5 p-2.5">
            <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Penutup</p>
            <p className="text-xs text-white/65">{item.penutup}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function KaranganBerpanduSection({ color, onOpen }: { color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Karangan Berpandu" icon="✏️" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Templat berpandu mengikut formula IMBAK untuk 5 tema popular. Tekan setiap tema untuk lihat rangka penuh.</p>
      <div className="space-y-2">
        {KARANGAN_BERPANDU_PANJANG.map((t) => (
          <NestedTema key={t.id} item={t} color={color} />
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section 11: Checklist Skor A ─────────────────────────────────────────────

function ChecklistSection({
  checked,
  onToggle,
  onOpen,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
  onOpen: () => void;
}) {
  const done = checked.filter(Boolean).length;
  const all = done === CHECKLIST_SKOR_A_PANJANG.length;

  return (
    <CollapsibleSection title="Checklist Skor A" icon="✅" defaultOpen onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">Semak senarai ini sebelum hantar kertas jawapan anda.</p>
      <div className="space-y-2">
        {CHECKLIST_SKOR_A_PANJANG.map((item, i) => (
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
            <p className="text-sm font-black text-white">Sedia Menulis Karangan Panjang Skor A!</p>
            <p className="text-xs text-white/60">Anda telah menguasai semua elemen wajib karangan panjang.</p>
          </div>
        </div>
      )}
      <p className="mt-3 text-right text-[11px] font-bold text-white/40">
        {done}/{CHECKLIST_SKOR_A_PANJANG.length} lengkap
      </p>
    </CollapsibleSection>
  );
}

// ─── Legacy notes (original content — kept, not removed) ─────────────────────

function LegacyNotesSection({ topic }: { topic: BMTopic; color: string }) {
  if (!topic.formulae && !topic.steps && !topic.commonMistakes && !topic.uasaTips) return null;
  return (
    <CollapsibleSection title="Nota Asal (Ringkasan Pantas)" icon="📋">
      {topic.formulae && topic.formulae.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Formula Penulisan</p>
          <div className="space-y-2">
            {topic.formulae.map((f, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                <p className="mb-1 text-xs font-bold text-white/80">{f.part}</p>
                <p className="mb-1 text-[11px] text-white/45">{f.formula}</p>
                <p className="text-[11px] italic leading-relaxed text-white/55">{f.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {topic.steps && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Langkah Menulis</p>
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

export function KaranganPanjangHub({ topic, color, onBack }: { topic: BMTopic; color: string; onBack: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<boolean[]>(Array(CHECKLIST_SKOR_A_PANJANG.length).fill(false));
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
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Karangan Panjang</p>
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
            {progressPct === 100 && <EarnedBadge label="🏆 Pakar Karangan Panjang" color="#FBBF24" />}
            {allChecked && <EarnedBadge label="📝 Sedia untuk Peperiksaan" color="#34D399" />}
          </div>
        )}
      </div>

      <HeroFormula color={color} />

      <SkorATip>
        Setiap isi mesti melalui formula <strong className="text-white">IMBAK</strong> — Isi, Mengapa, Bagaimana, Akibat, Kesimpulan Kecil —
        supaya huraian anda lengkap dan meyakinkan.
      </SkorATip>

      <ImbakSection color={color} onOpen={() => markOpened("imbak")} />
      <PendahuluanFormulaSection color={color} onOpen={() => markOpened("pendahuluan")} />
      <IsiFormulaSection color={color} onOpen={() => markOpened("isi")} />
      <PenutupFormulaSection color={color} onOpen={() => markOpened("penutup")} />

      <SkorATip>Jangan ulang isi yang sama. Setiap isi mesti membawa idea baharu dengan huraian, contoh dan kesan yang berbeza.</SkorATip>

      <PenandaWacanaSection color={color} onOpen={() => markOpened("penanda")} />
      <UngkapanMenarikSection color={color} onOpen={() => markOpened("ungkapan")} />
      <KesalahanLazimSection onOpen={() => markOpened("kesalahan")} />
      <PerbandinganSection onOpen={() => markOpened("perbandingan")} />
      <KaranganBerpanduSection color={color} onOpen={() => markOpened("berpandu")} />

      <SkorATip>Sasarkan 250–350 patah perkataan. Karangan yang terlalu pendek atau terlalu panjang sama-sama merugikan markah anda.</SkorATip>

      <ChecklistSection checked={checklist} onToggle={toggleChecklist} onOpen={() => markOpened("checklist")} />

      <LegacyNotesSection topic={topic} color={color} />
    </div>
  );
}

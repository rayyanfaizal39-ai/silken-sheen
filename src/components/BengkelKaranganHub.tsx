import { useEffect, useState } from "react";
import { Check, CheckCircle2, ChevronDown, ChevronLeft, Copy, Star } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import { type WorkshopTopicContent, countWords } from "@/data/bm-workshop-hub";
import { PENANDA_WACANA_PANJANG_GROUPS } from "@/data/bm-karangan-panjang-hub";

const STORAGE_KEY = "bm-workshop-hub-v1";
const SECTION_IDS = ["idea", "kosakata", "ungkapan", "penanda", "imbak", "ramalan", "pendek", "panjang"] as const;

function loadOpenedSections(topicId: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed[topicId]) ? parsed[topicId] : [];
  } catch {
    return [];
  }
}

function saveOpenedSections(topicId: string, opened: string[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[topicId] = opened;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

// ─── Shared small pieces ──────────────────────────────────────────────────────

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

function WordCountBadge({ words }: { words: number }) {
  const inRange = words >= 50;
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
      style={inRange ? { background: "#34D39925", color: "#34D399" } : { background: "#FB718525", color: "#FB7185" }}
    >
      {words} patah perkataan
    </span>
  );
}

// ─── Section A: Idea Bank ─────────────────────────────────────────────────────

function IdeaBankSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title={`Idea Bank (${content.ideaBank.length} isi)`} icon="💡" defaultOpen onOpen={onOpen}>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {content.ideaBank.map((idea, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs text-white/70">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-black" style={{ background: `${color}25`, color }}>
              {i + 1}
            </span>
            {idea}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section B: Kosa Kata Menarik ─────────────────────────────────────────────

function KosaKataSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title={`Kosa Kata Menarik (${content.kosaKata.length})`} icon="📝" onOpen={onOpen}>
      <div className="grid gap-2 sm:grid-cols-2">
        {content.kosaKata.map((k, i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
            <span className="text-xs text-white/40 line-through">{k.biasa}</span>
            <span className="text-white/20">→</span>
            <span className="text-xs font-semibold" style={{ color }}>
              {k.menarik}
            </span>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section C: Ungkapan Menarik ──────────────────────────────────────────────

function UngkapanSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title={`Ungkapan Menarik (${content.ungkapanMenarik.length})`} icon="💎" onOpen={onOpen}>
      <div className="grid gap-2 sm:grid-cols-2">
        {content.ungkapanMenarik.map((u, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3">
            <p className="text-sm italic leading-relaxed text-white/85">"{u}"</p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section D: Penanda Wacana ────────────────────────────────────────────────

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
      <div className="space-y-2.5">
        {PENANDA_WACANA_PANJANG_GROUPS.map((g, idx) => (
          <div key={g.kategori} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
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
                <span key={it} className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/75">
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

// ─── Section E: Rangka IMBAK Lengkap ──────────────────────────────────────────

function ImbakSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title="Rangka IMBAK Lengkap" icon="🧩" onOpen={onOpen}>
      <p className="mb-3 text-xs text-white/45">5 isi sedia untuk dikembangkan menggunakan formula IMBAK.</p>
      <div className="space-y-2.5">
        {content.imbakIsi.map((isi, idx) => {
          const rows: { code: string; text: string }[] = [
            { code: "I", text: isi.i },
            { code: "M", text: isi.m },
            { code: "B", text: isi.b },
            { code: "A", text: isi.a },
            { code: "K", text: isi.k },
          ];
          return (
            <div key={idx} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="mb-2 text-[9px] font-black uppercase tracking-wide text-white/40">Isi {idx + 1}</p>
              <div className="space-y-1">
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
        })}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section F: Soalan Ramalan ────────────────────────────────────────────────

function SoalanRamalanSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  return (
    <CollapsibleSection title={`Soalan Ramalan (${content.soalanRamalan.length})`} icon="🎯" onOpen={onOpen}>
      <div className="space-y-2">
        {content.soalanRamalan.map((q, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
              {i + 1}
            </span>
            <p className="text-sm text-white/70">{q}</p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Section G: Contoh Karangan Pendek Cemerlang ──────────────────────────────

function PendekSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  const { pendek } = content;
  const wc = countWords(`${pendek.karangan.pendahuluan} ${pendek.karangan.isi1} ${pendek.karangan.isi2} ${pendek.karangan.isi3} ${pendek.karangan.kesimpulan}`);
  const parts: { label: string; text: string; tint: string }[] = [
    { label: "Pendahuluan", text: pendek.karangan.pendahuluan, tint: color },
    { label: "Isi 1", text: pendek.karangan.isi1, tint: "#34D399" },
    { label: "Isi 2", text: pendek.karangan.isi2, tint: "#34D399" },
    { label: "Isi 3", text: pendek.karangan.isi3, tint: "#34D399" },
    { label: "Kesimpulan", text: pendek.karangan.kesimpulan, tint: "#A78BFA" },
  ];
  return (
    <CollapsibleSection title="Contoh Karangan Pendek Cemerlang" icon="📊" onOpen={onOpen}>
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Soalan</p>
        <p className="text-xs leading-relaxed text-white/65">{pendek.soalan}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pendek.grafik.map((g) => (
            <span key={g} className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/55">
              {g}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-3 rounded-lg border border-white/5 bg-white/5 p-2.5">
        <p className="mb-1.5 text-[9px] font-black uppercase tracking-wide text-white/40">Rangka</p>
        <p className="text-xs text-white/60">P: {pendek.rangka.pendahuluan}</p>
        {pendek.rangka.isi.map((isi, i) => (
          <p key={i} className="text-xs text-white/60">
            I{i + 1}: {isi}
          </p>
        ))}
        <p className="text-xs text-white/60">K: {pendek.rangka.kesimpulan}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-wide text-white/40">Karangan Lengkap</span>
          <WordCountBadge words={wc} />
        </div>
        <div className="space-y-2">
          {parts.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/80">
              <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: `${p.tint}25`, color: p.tint }}>
                {p.label}
              </span>
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ─── Section H: Contoh Karangan Panjang Cemerlang ─────────────────────────────

function PanjangSection({ content, color, onOpen }: { content: WorkshopTopicContent; color: string; onOpen: () => void }) {
  const { panjang } = content;
  const wc = countWords(`${panjang.pendahuluan} ${panjang.isi.join(" ")} ${panjang.penutup}`);
  return (
    <CollapsibleSection title="Contoh Karangan Panjang Cemerlang" icon="🏅" onOpen={onOpen}>
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-white/40">Soalan</p>
        <p className="text-xs leading-relaxed text-white/65">{panjang.soalan}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-wide text-white/40">Karangan Lengkap</span>
          <WordCountBadge words={wc} />
        </div>
        <div className="space-y-2.5">
          <p className="text-sm leading-relaxed text-white/80">
            <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: `${color}25`, color }}>
              Pendahuluan
            </span>
            {panjang.pendahuluan}
          </p>
          {panjang.isi.map((isi, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/80">
              <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: "#34D39925", color: "#34D399" }}>
                Isi {i + 1}
              </span>
              {isi}
            </p>
          ))}
          <p className="text-sm leading-relaxed text-white/80">
            <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ background: "#A78BFA25", color: "#A78BFA" }}>
              Penutup
            </span>
            {panjang.penutup}
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function BengkelKaranganHub({
  topic,
  content,
  color,
  onBack,
}: {
  topic: BMTopic;
  content: WorkshopTopicContent;
  color: string;
  onBack: () => void;
}) {
  const [opened, setOpened] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOpened(loadOpenedSections(content.id));
    setHydrated(true);
  }, [content.id]);

  useEffect(() => {
    if (!hydrated) return;
    saveOpenedSections(content.id, opened);
  }, [opened, hydrated, content.id]);

  const markOpened = (id: string) => {
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

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
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Bengkel Karangan</p>
          <h2 className="truncate font-display text-lg font-bold text-white">
            {content.icon} {content.tema}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-white/60">Kemajuan Bengkel</span>
          <span className="text-[11px] font-black" style={{ color }}>
            {opened.length}/{SECTION_IDS.length} bahagian
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: color }} />
        </div>
        {progressPct === 100 && (
          <div className="mt-3 flex items-center gap-2 text-[11px] font-black" style={{ color: "#FBBF24" }}>
            <CheckCircle2 className="h-3.5 w-3.5" /> Anda sedia menulis karangan {content.tema} tanpa bantuan luar!
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4">
        <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
        <p className="text-sm leading-relaxed text-white/80">
          Mula dengan <strong className="text-white">Idea Bank</strong>, kuasai kosa kata dan penanda wacana, kemudian cuba tulis{" "}
          <strong className="text-white">Karangan Pendek</strong> sebelum mencabar diri dengan <strong className="text-white">Karangan Panjang</strong>.
        </p>
      </div>

      <IdeaBankSection content={content} color={color} onOpen={() => markOpened("idea")} />
      <KosaKataSection content={content} color={color} onOpen={() => markOpened("kosakata")} />
      <UngkapanSection content={content} color={color} onOpen={() => markOpened("ungkapan")} />
      <PenandaWacanaSection color={color} onOpen={() => markOpened("penanda")} />
      <ImbakSection content={content} color={color} onOpen={() => markOpened("imbak")} />
      <SoalanRamalanSection content={content} color={color} onOpen={() => markOpened("ramalan")} />
      <PendekSection content={content} color={color} onOpen={() => markOpened("pendek")} />
      <PanjangSection content={content} color={color} onOpen={() => markOpened("panjang")} />

      {topic.peribahasa && topic.peribahasa.length > 0 && (
        <CollapsibleSection title="Nota Asal (Peribahasa)" icon="📋">
          <div className="flex flex-wrap gap-1.5">
            {topic.peribahasa.map((p) => (
              <span key={p} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65">
                {p}
              </span>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

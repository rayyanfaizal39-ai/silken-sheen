import { Fragment, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import { JENIS_KARANGAN_CLUES, MODEL_KARANGAN_TEMPLATES, type ModelKaranganTemplate } from "@/data/bm-model-karangan-hub";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Shared small pieces ──────────────────────────────────────────────────────

function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={() => setOpen((o) => !o)}
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

function StrukturFlow({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {steps.map((step, i) => (
        <Fragment key={`${step}-${i}`}>
          <span className="rounded-lg border px-2.5 py-1 text-xs font-bold text-white/85" style={{ borderColor: `${color}40`, background: `${color}12` }}>
            {step}
          </span>
          {i < steps.length - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-white/20" />}
        </Fragment>
      ))}
    </div>
  );
}

function ParagraphBlock({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-white/80">
          {para}
        </p>
      ))}
    </div>
  );
}

// ─── Per-model sections ────────────────────────────────────────────────────────

function ModelDetail({ model, color }: { model: ModelKaranganTemplate; color: string }) {
  const wc = countWords(model.contohCemerlang);
  const kataKunciItems = model.kataKunci ?? model.frasaPenting ?? [];
  const kataKunciLabel = model.kataKunci ? "Kata Kunci Soalan" : "Frasa Penting";

  return (
    <div className="space-y-4">
      {/* Always-visible quick-ID block */}
      <div className="rounded-2xl border p-4" style={{ borderColor: `${color}35`, background: `${color}0c` }}>
        <p className="mb-2 text-[10px] font-black uppercase tracking-wide" style={{ color }}>
          {model.strukturLabel}
        </p>
        <StrukturFlow steps={model.strukturFlow} color={color} />
      </div>

      {(model.definisi || model.ciriCiri) && (
        <CollapsibleSection title="Definisi & Ciri-ciri" icon="🔍" defaultOpen>
          {model.definisi && <p className="mb-3 text-sm leading-relaxed text-white/75">{model.definisi}</p>}
          {model.ciriCiri && (
            <div className="space-y-1.5">
              {model.ciriCiri.map((c, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs text-white/70">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-black" style={{ background: `${color}25`, color }}>
                    {i + 1}
                  </span>
                  {c}
                </div>
              ))}
            </div>
          )}
        </CollapsibleSection>
      )}

      {kataKunciItems.length > 0 && (
        <CollapsibleSection title={kataKunciLabel} icon="🔑">
          <div className="flex flex-wrap gap-1.5">
            {kataKunciItems.map((k) => (
              <span key={k} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75">
                {k}
              </span>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {model.kesalahanLazim && (
        <CollapsibleSection title="Kesalahan Lazim" icon="⚠️">
          <ul className="space-y-1.5">
            {model.kesalahanLazim.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/65">
                <span className="text-rose-400">×</span>
                {m}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      <CollapsibleSection title="Template" icon="🧩">
        <div className="rounded-xl border border-dashed border-white/15 bg-black/20 p-3.5">
          <p className="whitespace-pre-line font-mono text-[11px] leading-relaxed text-white/60">{model.template}</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title={`Contoh Soalan (${model.contohSoalan.length})`} icon="🎯">
        <div className="space-y-2">
          {model.contohSoalan.map((q, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
                {i + 1}
              </span>
              <p className="text-sm text-white/70">{q}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title={model.contohCemerlangLabel} icon="🏅">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-wide text-white/40">Versi Penuh</span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#34D39925", color: "#34D399" }}>
              {wc} patah perkataan
            </span>
          </div>
          <ParagraphBlock text={model.contohCemerlang} />
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ─── Cara Mengenal Pasti Jenis Karangan ───────────────────────────────────────

function JenisLookupSection({ color }: { color: string }) {
  return (
    <CollapsibleSection title="Cara Mengenal Pasti Jenis Karangan" icon="🧭">
      <p className="mb-3 text-xs text-white/45">Jika soalan mengandungi perkataan berikut, gunakan format yang sepadan.</p>
      <div className="space-y-1.5">
        {JENIS_KARANGAN_CLUES.map((c) => (
          <div key={c.trigger} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-white/75">"{c.trigger}"</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/20" />
            <span className="text-xs font-bold" style={{ color }}>
              {c.jenis}
            </span>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Cheat Sheet ───────────────────────────────────────────────────────────────

function CheatSheetSection({ color }: { color: string }) {
  return (
    <CollapsibleSection title="Cheat Sheet — Semua Jenis Karangan" icon="📑">
      <p className="mb-3 text-xs text-white/45">Ringkasan satu halaman untuk semua jenis karangan.</p>
      <div className="space-y-2.5">
        {MODEL_KARANGAN_TEMPLATES.map((m) => (
          <div key={m.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-white">
              <span>{m.icon}</span> {m.jenis}
            </p>
            <p className="mb-1 text-[11px] text-white/55">
              <span className="font-bold text-white/35">Struktur: </span>
              {m.strukturFlow.join(" → ")}
            </p>
            {(m.kataKunci || m.frasaPenting) && (
              <p className="mb-1 text-[11px] text-white/55">
                <span className="font-bold text-white/35">Kata kunci: </span>
                {(m.kataKunci ?? m.frasaPenting ?? []).slice(0, 3).join(", ")}
              </p>
            )}
            {m.kesalahanLazim && (
              <p className="text-[11px] text-white/55">
                <span className="font-bold text-white/35">Elakkan: </span>
                {m.kesalahanLazim[0]}
              </p>
            )}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function ModelKaranganHub({ topic, model, color, onBack }: { topic: BMTopic; model: ModelKaranganTemplate; color: string; onBack: () => void }) {
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
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Model Karangan Bank</p>
          <h2 className="truncate font-display text-lg font-bold text-white">
            {model.icon} {model.jenis}
          </h2>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-3.5">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
        <p className="text-xs leading-relaxed text-white/75">
          Lihat <strong className="text-white">{model.strukturLabel.toLowerCase()}</strong> di atas dahulu untuk kenal pasti format — baru kembangkan menggunakan template dan contoh di bawah.
        </p>
      </div>

      <ModelDetail model={model} color={color} />
      <JenisLookupSection color={color} />
      <CheatSheetSection color={color} />

      {topic.description && <p className="text-xs text-white/35">{topic.description}</p>}
    </div>
  );
}

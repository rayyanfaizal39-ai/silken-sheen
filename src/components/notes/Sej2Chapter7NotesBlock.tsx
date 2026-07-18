import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch7Content } from "@/content/form2/sejarah/chapter-7/sej2ch7-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { PerakRotationWheel } from "./blocks/PerakRotationWheel";
import { bgPanel, hexToRgba, neon } from "./blocks/neon-tokens";
import regaliaEmpatNegeri from "@/assets/form2-content/regalia-diraja-empat-negeri.png";

const ORBIT_LABELS = ["Pengasasan", "Sistem Penggiliran", "Warisan Islam", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 7.1", title: "Empat Kesultanan, Empat Pengasas", sub: "Legasi Kesultanan Melayu Melaka diteruskan dengan cara berbeza-beza." },
  { eyebrow: "◆ 7.2", title: "Sistem Penggiliran Perak — Keunikan Yang Tiada Tandingan", sub: "Enam gelaran mesti dilalui sebelum menjadi Sultan." },
  { eyebrow: "◆ 7.2", title: "Warisan Islam dalam Pemerintahan", sub: "Tradisi Melaka sebagai pusat Islam diwarisi dan termaktub dalam Perlembagaan Malaysia." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej2Chapter7NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch7Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c7-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, TOTAL - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[current];
  const isLast = current === TOTAL - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }

  const perak = content.governanceLegacy.succession.find((s) => s.sultanate === "Perak");

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">👑</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{content.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{content.hook.body}</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {ORBIT_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setCurrent(i)}
            className="flex shrink-0 flex-col items-center gap-1.5 px-1"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                i < current
                  ? "border-transparent bg-gradient-to-br from-primary to-accent text-white"
                  : i === current
                    ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`max-w-[68px] text-center text-[10px] leading-tight ${
                i === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.founding.intro}</p>
            <img
              src={regaliaEmpatNegeri}
              alt="Alat Kebesaran Diraja Empat Negeri"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {content.founding.sultanates.map((s) => (
                <div key={s.name} className="rounded-2xl p-4.5" style={{ background: bgPanel }}>
                  <h4 className="font-display text-sm font-bold text-foreground">{s.name}</h4>
                  <p className="mb-2 text-[11px] font-bold" style={{ color: neon.amber }}>
                    {s.founder} → {s.founderTitle}
                  </p>
                  <p className="text-[10.5px] leading-relaxed text-muted-foreground">
                    {s.foundingYear} · {s.firstCapital} · {s.lineageSource}
                  </p>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground/80">{s.territoryNote}</p>
                  {s.notableSultan && (
                    <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                      <b className="text-foreground">{s.notableSultan.name}</b> ({s.notableSultan.reignYears}): {s.notableSultan.achievement}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.governanceLegacy.intro}</p>
            {perak && perak.rotationOrder && (
              <>
                <PerakRotationWheel centerLabel={perak.rotationOrder[0]} outerLabels={perak.rotationOrder.slice(1)} />
                <p className="text-center text-[11px] text-muted-foreground">
                  Dipilih dan dilantik oleh {perak.selectionBody} — sistem penggiliran unik yang tiada di negeri Melayu lain
                </p>
              </>
            )}
            <DataTable
              headers={["Negeri", "Gelaran Waris", "Badan Pemilihan", "Pembesar Utama"]}
              rows={content.governanceLegacy.succession.map((s) => [
                s.sultanate,
                s.heirTitle,
                s.selectionBody,
                s.fourOfficials.length > 0 ? s.fourOfficials.join(", ") : "—",
              ])}
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.islamLegacy.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.islamLegacy.manifestations.map((m, i) => {
                const [title, ...rest] = m.split(" — ");
                return (
                  <div key={m} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: `0 0 14px ${hexToRgba(neon.green, 0.1)}` }}>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      <b className="text-foreground">{title}</b>
                      {rest.length > 0 && <><br />{rest.join(" — ")}</>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">⭐ Rumusan Bab</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.chapterSummary}</p>
            </div>
            {onMarkRead && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isRead
                      ? "cursor-default bg-emerald-500/20 text-emerald-200"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 7 Selesai"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Seksyen seterusnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

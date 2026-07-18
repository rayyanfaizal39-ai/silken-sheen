import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch6Content } from "@/content/form2/sejarah/chapter-6/sej2ch6-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { bgPanel, hexToRgba, neon, type NeonColor } from "./blocks/neon-tokens";
import pelabuhanRiau from "@/assets/form2-content/pelabuhan-riau.png";

const ORBIT_LABELS = [
  "Pengasasan",
  "Cabaran",
  "Strategi",
  "Perdagangan",
  "Persuratan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 6.1", title: "Pengasasan & Pemindahan Pusat Pemerintahan", sub: "Setiap pemindahan didorong ancaman keselamatan." },
  { eyebrow: "◆ 6.3", title: "Empat Cabaran Kegemilangan", sub: "Setiap cabaran diselesaikan, mengukuhkan kedaulatan Johor Riau." },
  { eyebrow: "◆ 6.4", title: "Strategi Menghadapi Cabaran", sub: "Pemindahan pusat pemerintahan, kota pertahanan dan pakatan dengan Belanda." },
  { eyebrow: "◆ 6.2", title: "Pusat Perdagangan Entrepot", sub: "Barangan dagangan dan pengurusan Pelabuhan Riau." },
  { eyebrow: "◆ 6.5", title: "Persuratan Johor Riau", sub: "Pusat penghasilan karya persuratan Melayu yang penting." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const CAPITAL_COLORS: NeonColor[] = ["violet", "blue", "green"];
const CHALLENGE_COLORS: NeonColor[] = ["red", "amber", "violet", "green"];

export function Sej2Chapter6NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c6-section` : undefined;
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

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🏰</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              Diasaskan oleh <b className="text-foreground">{content.founding.founder}</b>, bergelar {content.founding.title} ({content.founding.reignYears}). {content.founding.parentage}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 py-2">
              {content.founding.capitals.map((cap, i) => (
                <div key={cap.location} className="flex items-center gap-1">
                  <div className="max-w-[150px] px-2.5 text-center">
                    <div
                      className="mx-auto mb-2 h-4 w-4 rounded-full"
                      style={{ background: neon[CAPITAL_COLORS[i % CAPITAL_COLORS.length]], boxShadow: `0 0 8px ${neon[CAPITAL_COLORS[i % CAPITAL_COLORS.length]]}99` }}
                    />
                    <h6 className="font-display text-[12px] font-bold text-foreground">{cap.location}</h6>
                    <p className="text-[9.5px] text-muted-foreground">{cap.year}</p>
                    <p className="mt-1 text-[9px] leading-snug text-muted-foreground">{cap.reason}</p>
                  </div>
                  {i < content.founding.capitals.length - 1 && (
                    <span className="px-1 text-base text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{content.founding.dynastyNote}</p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {content.challenges.map((c, i) => {
              const color = neon[CHALLENGE_COLORS[i % CHALLENGE_COLORS.length]];
              return (
                <div
                  key={c.name}
                  className="rounded-2xl p-4.5"
                  style={{ background: bgPanel, boxShadow: `0 0 16px ${hexToRgba(color, 0.12)}` }}
                >
                  <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color }}>
                    {c.name}
                  </h5>
                  <p className="mb-2.5 text-[10.5px] leading-relaxed text-muted-foreground">{c.description}</p>
                  <p className="border-t border-border pt-2 text-[10px] font-semibold leading-relaxed text-emerald-300">
                    ✓ {c.outcome}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <FactGrid heading="🛡️ Strategi Menghadapi Cabaran" facts={content.strategies} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <ChipRow heading="🧭 Kelebihan Strategik" items={content.goldenAge.strategicAdvantages} />
            <DataTable
              headers={["Asal Pedagang", "Catatan"]}
              rows={content.goldenAge.tradersOrigin.map((t) => [t.origin, t.note])}
            />
            <img
              src={pelabuhanRiau}
              alt="Pelabuhan Riau"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.goldenAge.tradeGoods.map((g) => (
                <div key={g.good} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[11.5px] font-bold" style={{ color: neon.amber }}>
                    {g.good}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{g.origin}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-muted-foreground">{content.goldenAge.portOperations.shipCount}</p>
            <ChipRow heading="🏗️ Kemudahan Pelabuhan" items={content.goldenAge.portOperations.facilities} />
            <div className="flex flex-wrap justify-center gap-4">
              {content.goldenAge.portOperations.currency.map((c) => (
                <div key={c.name} className="w-[140px] rounded-2xl p-4.5 text-center" style={{ background: bgPanel }}>
                  <div className="text-2xl">{c.material === "Emas" ? "🥇" : c.material === "Perak" ? "🥈" : "⚙️"}</div>
                  <h5 className="font-display mt-2 mb-0.5 text-[13px] font-bold text-foreground">{c.name}</h5>
                  <p className="text-[10px] text-muted-foreground">{c.material}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12px] font-semibold text-foreground">⚖️ Syahbandar</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.goldenAge.portOperations.syahbandarRole}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12px] font-semibold text-foreground">🛡️ Sistem Naungan</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.goldenAge.portOperations.patronageSystem}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12px] font-semibold text-foreground">🌊 Orang Laut</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.goldenAge.portOperations.orangLautRole}</p>
              </div>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.literature.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {content.literature.works.map((w) => (
                <div key={w.title} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: `0 0 16px ${hexToRgba(neon.violet, 0.1)}` }}>
                  <h5 className="font-display mb-1 text-[13px] font-bold text-foreground">{w.title}</h5>
                  <p className="mb-2 text-[10px] font-semibold" style={{ color: neon.amber }}>
                    {w.author}
                  </p>
                  <p className="text-[10.5px] leading-relaxed text-muted-foreground">{w.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 5 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 6 Selesai"}
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

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo10Content } from "@/content/form1/geography/chapter-10/geo10-content";
import { RegionGroupChips } from "./blocks/RegionGroupChips";
import { RiverLengthComparison } from "./blocks/RiverLengthComparison";
import { VolcanoGrid } from "./blocks/VolcanoGrid";
import { FactGrid } from "./blocks/FactGrid";
import { ChipRow } from "./blocks/ChipRow";

const ORBIT_LABELS = ["Negara ASEAN", "Bentuk muka bumi", "Sungai & tasik", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 10.1", title: "Negara-negara Asia Tenggara", sub: "11 negara terbahagi kepada Tanah Besar dan Kepulauan." },
  { eyebrow: "◆ 10.2", title: "Bentuk Muka Bumi Asia Tenggara" },
  { eyebrow: "◆ 10.3", title: "Sungai dan Tasik Utama" },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

function parseKm(facts: string[]): number {
  const match = facts.join(" ").match(/\(([\d,]+)\s*km\)/);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

export function GeoChapter10NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo10Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c10-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, TOTAL - 1)));
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[current];
  const isLast = current === TOTAL - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }

  const rivers = content.majorRivers.map((r) => ({
    name: r.name,
    lengthKm: parseKm(r.facts) || 1,
    label: r.facts[0].match(/\(([^)]+)\)/)?.[1] ?? "",
  }));

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🗺️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.overview.location}</p>
            <RegionGroupChips
              groups={[
                { label: "Tanah Besar Asia Tenggara", countries: content.overview.mainlandCountries, tone: "primary" },
                { label: "Kepulauan Asia Tenggara", countries: content.overview.maritimeCountries, tone: "accent" },
              ]}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <h5 className="font-display mb-2 text-sm font-bold text-foreground">Pinggir Laut</h5>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{content.landforms.coastline.note}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{content.landforms.coastline.shelfNote}</p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <h5 className="font-display mb-2 text-sm font-bold text-foreground">Tanah Pamah</h5>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{content.landforms.lowlands.note}</p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <h5 className="font-display mb-2 text-sm font-bold text-foreground">Tanah Tinggi</h5>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{content.landforms.highlands.note}</p>
            </div>
            <div>
              <h5 className="font-display mb-2 text-sm font-bold text-foreground">🌋 Gunung Berapi</h5>
              <VolcanoGrid volcanoes={content.landforms.volcanoes} />
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div>
              <h5 className="font-display mb-2 text-sm font-bold text-foreground">Panjang Sungai Utama</h5>
              <RiverLengthComparison rivers={rivers} />
            </div>
            {content.majorRivers.map((r) => (
              <div key={r.name} className="rounded-xl border border-border/60 bg-card/60 p-3">
                <p className="text-[13px] font-semibold text-foreground">{r.name}</p>
                <ul className="mt-1 space-y-1">
                  {r.facts.map((f, i) => (
                    <li key={i} className="text-[11.5px] leading-relaxed text-muted-foreground">• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
            {content.majorLakes.map((l) => (
              <div key={l.name} className="rounded-xl border border-border/60 bg-card/60 p-3">
                <p className="text-[13px] font-semibold text-foreground">{l.name}</p>
                <ul className="mt-1 space-y-1">
                  {l.facts.map((f, i) => (
                    <li key={i} className="text-[11.5px] leading-relaxed text-muted-foreground">• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">⭐ Rumusan Bab</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{content.chapterSummary}</p>
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 10 Selesai"}
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

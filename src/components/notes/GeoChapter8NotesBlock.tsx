import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo8Content } from "@/content/form1/geography/chapter-8/geo8-content";
import { FormulaDisplay } from "./blocks/FormulaDisplay";
import { DensityTierComparison } from "./blocks/DensityTierComparison";
import { FactorsGrid } from "./blocks/FactorsGrid";
import { FactGrid } from "./blocks/FactGrid";
import { ChipRow } from "./blocks/ChipRow";

const ORBIT_LABELS = [
  "Taburan penduduk",
  "Formula kepadatan",
  "Kategori kepadatan",
  "Faktor taburan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  {
    eyebrow: "◆ 8.1",
    title: "Taburan Penduduk",
    sub: "Sebaran penduduk di Malaysia tidak sekata.",
  },
  { eyebrow: "◆ 8.2", title: "Formula Kepadatan Penduduk" },
  {
    eyebrow: "◆ 8.3",
    title: "Kategori Kepadatan Penduduk",
    sub: "Tiga kategori berdasarkan bilangan orang bagi sekilometer persegi.",
  },
  {
    eyebrow: "◆ 8.4",
    title: "Faktor Taburan Penduduk",
    sub: "Empat faktor mempengaruhi corak taburan penduduk di Malaysia.",
  },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const DENSITY_FILL_RATIOS = [0.85, 0.45, 0.15];

const FACTOR_CATEGORY_META: Array<{
  key: keyof Geo8Content["factors"];
  icon: string;
  label: string;
}> = [
  { key: "physical", icon: "⛰️", label: "Fizikal" },
  { key: "economic", icon: "💰", label: "Ekonomi" },
  { key: "social", icon: "🏫", label: "Sosial" },
  { key: "governmentPolicy", icon: "🏛️", label: "Dasar Kerajaan" },
];

export function GeoChapter8NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo8Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c8-section` : undefined;
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

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🧑‍🤝‍🧑</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">
            {content.hook.title}
          </p>
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
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
          {chrome.eyebrow}
        </p>
        <h2 className="font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">
          {chrome.title}
        </h2>
        {chrome.sub && (
          <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>
        )}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.overview.definition}
            </p>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {content.overview.totalPopulation}
              </p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Sumber: {content.overview.populationSource}
              </p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <FormulaDisplay formula={content.densityFormula} />
          </div>
        )}

        {current === 2 && (
          <DensityTierComparison
            tiers={content.densityCategories.map((c, i) => ({
              ...c,
              fillRatio: DENSITY_FILL_RATIOS[i] ?? 0.3,
            }))}
          />
        )}

        {current === 3 && (
          <FactorsGrid
            categories={FACTOR_CATEGORY_META.map((meta) => ({
              key: meta.key,
              icon: meta.icon,
              label: meta.label,
              items: content.factors[meta.key],
            }))}
          />
        )}

        {current === 4 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                ⭐ Rumusan Bab
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {content.chapterSummary}
              </p>
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 8 Selesai"}
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

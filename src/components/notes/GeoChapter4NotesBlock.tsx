import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo4Content } from "@/content/form1/geography/chapter-4/geo4-content";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";

const ORBIT_LABELS = [
  "Kedudukan Malaysia",
  "Peta Malaysia",
  "Negeri & ibu negeri",
  "Ibu negara",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 4.1", title: "Kedudukan Malaysia", sub: "Asia Tenggara, sempadan negara jiran." },
  { eyebrow: "◆ Sambungan 4.1", title: "Peta Malaysia" },
  { eyebrow: "◆ 4.2", title: "Negeri & Ibu Negeri", sub: "13 negeri, 13 ibu negeri." },
  { eyebrow: "◆ 4.3", title: "Ibu Negara" },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const LEGEND: { color: string; label: string }[] = [
  { color: "bg-amber-400", label: "Ibu negeri" },
  { color: "bg-red-400", label: "Ibu negara (Kuala Lumpur)" },
  { color: "bg-accent", label: "Pusat Pentadbiran (Putrajaya)" },
  { color: "bg-muted-foreground", label: "Wilayah Persekutuan Labuan" },
];

const TOTAL = ORBIT_LABELS.length;

export function GeoChapter4NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo4Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c4-section` : undefined;
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
        <div className="shrink-0 text-2xl">🇲🇾</div>
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
              {content.malaysiaPosition.region}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.malaysiaPosition.peninsularBorders}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.malaysiaPosition.borneoBorders}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/40 p-4 text-center">
                <p className="font-display text-2xl font-bold text-primary">
                  {content.malaysiaPosition.totalStates}
                </p>
                <p className="text-xs text-muted-foreground">Negeri</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-4 text-center">
                <p className="font-display text-2xl font-bold text-accent">
                  {content.malaysiaPosition.totalFederalTerritories}
                </p>
                <p className="text-xs text-muted-foreground">Wilayah Persekutuan</p>
              </div>
            </div>
            <ChipRow
              heading="🏛️ Wilayah Persekutuan"
              items={content.malaysiaPosition.federalTerritories}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-4">
            <img
              src="/geography/malaysia-map.png"
              alt="Peta Malaysia yang menunjukkan negeri, wilayah persekutuan dan ibu negeri"
              width={1408}
              height={768}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full rounded-xl object-contain"
            />
            <div className="flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
              {LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                  {l.label}
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-muted-foreground/70">
              13 negeri + 3 wilayah persekutuan (Kuala Lumpur, Putrajaya, Labuan)
            </p>
          </div>
        )}

        {current === 2 && (
          <DataTable
            headers={["Negeri", "Ibu Negeri"]}
            rows={content.stateCapitals.map((sc) => [sc.state, sc.capital])}
          />
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.nationalCapital.definition}
            </p>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">
                🏙️ Kuala Lumpur
              </h4>
              <ul className="flex flex-col gap-1.5">
                {content.nationalCapital.kualaLumpurFacts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">🏢 Putrajaya</h4>
              <ul className="flex flex-col gap-1.5">
                {content.nationalCapital.putrajayaFacts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              {content.nationalCapital.putrajayaNameOrigin}
            </p>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">
                ⭐ Rumusan Bab
              </h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 4 Selesai"}
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

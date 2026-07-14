import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo1Content } from "@/content/form1/geography/chapter-1/geo1-content";
import { CompassRose } from "./blocks/CompassRose";
import { SunMethodDiagram } from "./blocks/SunMethodDiagram";
import { BearingDiagram } from "./blocks/BearingDiagram";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { StepList } from "./blocks/StepList";

const ORBIT_LABELS = [
  "Arah mata angin",
  "Kaedah matahari",
  "Kaedah kompas",
  "Sejarah kompas",
  "Bearing sudutan",
  "Bearing > 180°",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 1.1", title: "Arah Mata Angin", sub: "Lapan arah — empat utama, empat perantaraan." },
  { eyebrow: "◆ 1.2", title: "Menentukan Arah Menggunakan Matahari" },
  { eyebrow: "◆ 1.3", title: "Menentukan Arah Menggunakan Kompas" },
  { eyebrow: "◆ Sambungan 1.3", title: "Sejarah Kompas" },
  { eyebrow: "◆ 1.4", title: "Mengukur Bearing Sudutan" },
  { eyebrow: "◆ Sambungan 1.4", title: "Bearing Melebihi 180°", sub: "Konsep paling sukar dalam bab ini." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function GeoChapter1NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c1-section` : undefined;
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
        <div className="shrink-0 text-2xl">🧭</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.compassDirections.definition}</p>
            <CompassRose directions={content.compassDirections.directions} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">🐦 Navigasi Semula Jadi</h4>
              <ul className="flex flex-col gap-1.5">
                {content.compassDirections.naturalNavigationFacts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current === 1 && (
          <SunMethodDiagram
            whyItWorks={content.sunMethod.whyItWorks}
            steps={content.sunMethod.steps}
            nightMethod={content.sunMethod.nightMethod}
          />
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.compassMethod.definition}</p>
            <DataTable
              headers={["Bahagian", "Fungsi"]}
              rows={content.compassMethod.parts.map((p) => [p.name, p.function])}
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.compassMethod.whyNeedlePointsNorth}
            </p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🧭 Langkah Orientasi Kompas</h4>
              <StepList steps={content.compassMethod.orientationSteps} />
            </div>
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
              <p className="text-[12.5px] leading-relaxed text-amber-200">
                ⚠️ {content.compassMethod.interferenceWarning}
              </p>
            </div>
          </div>
        )}

        {current === 3 && (
          <DataTable
            headers={["Asal", "Fakta"]}
            rows={content.compassMethod.historyFacts.map((h) => [h.origin, h.fact])}
          />
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.bearing.definition}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Unit: </span>
              {content.bearing.unit}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.bearing.etymologyNote}</p>
            <StepList steps={content.bearing.basicMethodSteps} />
            <BearingDiagram variant="under180" bearingDegrees={65} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <StepList steps={content.bearing.over180Rule.steps} />
            <BearingDiagram variant="over180" bearingDegrees={301} residualAngle={121} />
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              {content.bearing.over180Rule.example}
            </p>
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4">
              <p className="text-[12.5px] leading-relaxed text-red-200">
                ⚠️ {content.bearing.commonMistakeWarning}
              </p>
            </div>
          </div>
        )}

        {current === 6 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 1 Selesai"}
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

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej1Content } from "@/content/form1/sejarah/chapter-1/sej1-content";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { HistorianQuoteGrid } from "./blocks/HistorianQuoteGrid";
import { TimelineSMMasihi } from "./blocks/TimelineSMMasihi";
import { ResearchMethodCards } from "./blocks/ResearchMethodCards";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";

const ORBIT_LABELS = [
  "Definisi & Etimologi",
  "Pandangan Sejarawan",
  "Masa & Ruang",
  "Sumber Sejarah",
  "Kaedah Penyelidikan",
  "Tafsiran Sejarah",
  "Kepentingan & Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 1.1", title: "Pengertian Sejarah", sub: "Asal usul perkataan 'sejarah' dari pelbagai bahasa." },
  { eyebrow: "◆ 1.2", title: "Pandangan Sejarawan Tentang Sejarah", sub: "Empat sejarawan tersohor, empat definisi berbeza." },
  { eyebrow: "◆ 1.3", title: "Konsep Masa dan Ruang" },
  { eyebrow: "◆ 1.4", title: "Sumber Primer dan Sekunder" },
  { eyebrow: "◆ 1.5", title: "Tiga Kaedah Penyelidikan Sejarah" },
  { eyebrow: "◆ 1.6", title: "Tafsiran dalam Sejarah" },
  { eyebrow: "◆ Rumusan", title: "Kepentingan Mempelajari Sejarah" },
];

const HISTORIAN_ICONS: Record<string, string> = {
  Herodotus: "🏛️",
  "E.H. Carr": "📖",
  "Ibn Khaldun": "🕌",
  "Khoo Kay Kim": "🇲🇾",
};

const METHOD_ICONS: Record<string, string> = {
  "Kaedah Bertulis": "📜",
  "Kaedah Lisan": "🎙️",
  "Kaedah Arkeologi": "⛏️",
};

const IMPORTANCE_ICONS: Record<string, string> = {
  "Mengenal Asal Usul": "🌳",
  "Mengambil Iktibar": "💡",
  "Memupuk Patriotisme": "🇲🇾",
  "Mengukuhkan Perpaduan": "🤝",
  "Membangunkan Negara dan Bangsa": "🏗️",
  "Mengaplikasikan Kemahiran Pemikiran Sejarah": "🧠",
};

const TOTAL = ORBIT_LABELS.length;

export function SejChapter1NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c1-section` : undefined;
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
        <div className="shrink-0 text-2xl">📜</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.definition.general}</p>
            <DataTable
              headers={["Bahasa", "Asal", "Makna"]}
              rows={content.definition.etymology.map((e) => [e.language, e.origin, e.meaning])}
            />
          </div>
        )}

        {current === 1 && (
          <HistorianQuoteGrid
            items={content.historianViews.map((h) => ({
              icon: HISTORIAN_ICONS[h.name] ?? "📚",
              name: h.name,
              quote: h.quote,
              work: h.work,
            }))}
          />
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.timeAndSpace.chronologyDefinition}</p>
            <TimelineSMMasihi timeUnits={content.timeAndSpace.timeUnits} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.timeAndSpace.eraSystem}</p>
            <ChipRow heading="🗺️ Tema Ruang" items={content.timeAndSpace.spaceThemes} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.sources.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.sources.categories.map((cat) => {
                const isPrimer = cat.type === "primer";
                const color = isPrimer ? neon.violet : neon.blue;
                return (
                  <div
                    key={cat.type}
                    className="rounded-2xl border-t-4 p-4 text-center"
                    style={{ background: bgPanel, borderTopColor: color, boxShadow: groupGlow(color, 24, 0.18) }}
                  >
                    <div
                      className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                      style={{ background: `${color}26`, boxShadow: groupGlow(color, 14, 0.4) }}
                    >
                      {isPrimer ? "🏺" : "📚"}
                    </div>
                    <h5 className="font-display text-sm font-bold capitalize" style={{ color }}>
                      Sumber {cat.type}
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.definition}</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {cat.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-full px-2.5 py-1 text-[10.5px] font-medium"
                          style={{ background: `${color}1f`, color }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <IconCardGrid
              items={content.sources.realExamples.map((ex) => ({
                icon: "📍",
                label: `${ex.name} (${ex.location})`,
                detail: ex.significance,
              }))}
            />
          </div>
        )}

        {current === 4 && (
          <ResearchMethodCards
            methods={content.researchMethods.map((m) => ({
              icon: METHOD_ICONS[m.name] ?? "🔍",
              name: m.name,
              description: m.description,
              steps: m.steps,
            }))}
          />
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.interpretation.definition}</p>
            <ChipRow heading="🔀 Sebab Perbezaan Tafsiran" items={content.interpretation.reasonsForDifference} />
            <FactGrid heading="✅ Kepentingan Tafsiran" facts={content.interpretation.importance} />
            <div className="rounded-2xl border border-border bg-secondary/20 p-4">
              <p className="mb-3 text-[12.5px] font-semibold text-foreground">{content.interpretation.example.event}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl p-3" style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 14, 0.12) }}>
                  <p className="mb-1 text-[10.5px] font-bold uppercase tracking-wide" style={{ color: neon.green }}>
                    Pandangan Tempatan
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{content.interpretation.example.localView}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: bgPanel, boxShadow: groupGlow(neon.red, 14, 0.12) }}>
                  <p className="mb-1 text-[10.5px] font-bold uppercase tracking-wide" style={{ color: neon.red }}>
                    Pandangan Barat
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{content.interpretation.example.westernView}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <IconCardGrid
              items={content.importanceOfHistory.map((r) => ({
                icon: IMPORTANCE_ICONS[r.reason] ?? "⭐",
                label: r.reason,
                detail: r.description,
              }))}
            />
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

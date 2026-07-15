import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo6Content } from "@/content/form1/geography/chapter-6/geo6-content";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DefinitionCard } from "./blocks/DefinitionCard";

const ORBIT_LABELS = [
  "Jenis bentuk muka bumi",
  "Tanah tinggi",
  "Tanah pamah",
  "Pinggir laut",
  "Kepentingan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  {
    eyebrow: "◆ 6.1",
    title: "Jenis Bentuk Muka Bumi",
    sub: "Empat jenis bentuk muka bumi utama di Malaysia.",
  },
  { eyebrow: "◆ 6.2", title: "Tanah Tinggi", sub: "Banjaran gunung dan dataran tinggi melebihi 180 m dari aras laut." },
  { eyebrow: "◆ 6.3", title: "Tanah Pamah", sub: "Kawasan rendah tidak melebihi 180 m dari aras laut." },
  { eyebrow: "◆ 6.4", title: "Pinggir Laut", sub: "Persisiran pantai Malaysia sepanjang kira-kira 4,800 km." },
  { eyebrow: "◆ 6.5", title: "Kepentingan Bentuk Muka Bumi" },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function GeoChapter6NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c6-section` : undefined;
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
        <div className="shrink-0 text-2xl">⛰️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.overview}</p>
            <img
              src="/geography/tanah-tinggi-vs-pamah.png"
              alt="Rajah perbandingan tanah tinggi dan tanah pamah berdasarkan garis 180 meter dari aras laut"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full rounded-xl object-contain"
            />
            <IconCardGrid
              items={content.landformTypes.map((l) => ({
                icon: "🗺️",
                label: l.name,
                detail: [l.definition, ...l.facts, `Contoh: ${l.examples.join(", ")}`],
              }))}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <IconCardGrid
              items={content.highlandLocations.map((h) => ({
                icon: "🏔️",
                label: h.region,
                detail: [
                  `Banjaran: ${h.ranges.join(", ")}`,
                  ...h.peaks.map((p) => (p.height ? `${p.name} — ${p.height}` : p.name)),
                ],
              }))}
            />
            <img
              src="/geography/perbandingan-ketinggian-puncak.png"
              alt="Carta perbandingan ketinggian puncak gunung utama di Malaysia"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full rounded-xl object-contain"
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.highestPeak}</p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            {content.lowlandLocations.map((region) => (
              <div key={region.region}>
                <h4 className="font-display mb-3 text-sm font-bold text-foreground">
                  {region.region}
                </h4>
                <IconCardGrid
                  items={region.areas.map((a) => ({
                    icon: "🌾",
                    label: a.name,
                    detail: a.facts,
                  }))}
                />
              </div>
            ))}
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              Panjang pantai: {content.coastline.totalLength}
            </p>
            <ChipRow heading="🌊 Laut & Selat Sekeliling" items={content.coastline.surroundingSeas} />
            <img
              src="/geography/ciri-pinggir-laut.png"
              alt="Rajah pembentukan ciri pinggir laut daripada tebing tinggi kepada gua, gerbang laut dan batu tunggul"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full rounded-xl object-contain"
            />
            <DefinitionCard
              items={content.coastline.features.map((f) => ({
                icon: "🪨",
                name: f.name,
                body: f.formation,
              }))}
            />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            {content.importance.map((cat) => (
              <div key={cat.landform}>
                <h4 className="font-display mb-3 text-sm font-bold text-foreground">
                  {cat.landform}
                </h4>
                <DataTable
                  headers={["Kegunaan", "Contoh"]}
                  rows={cat.uses.map((u) => [u.use, u.examples.join(", ")])}
                />
              </div>
            ))}
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                ⭐ Rumusan Bab
              </h4>
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

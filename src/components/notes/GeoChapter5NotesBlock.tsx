import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Geo5Content } from "@/content/form1/geography/chapter-5/geo5-content";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { StepList } from "./blocks/StepList";

const ORBIT_LABELS = [
  "Sistem fizikal Bumi",
  "Struktur Bumi",
  "Benua & lautan",
  "Pergerakan kerak Bumi",
  "Pembentukan gunung",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  {
    eyebrow: "◆ 5.1",
    title: "Sistem Fizikal Bumi",
    sub: "Empat sfera yang membentuk sistem Bumi.",
  },
  { eyebrow: "◆ 5.2", title: "Struktur Bumi", sub: "Tiga lapisan utama, dari kerak ke teras." },
  { eyebrow: "◆ 5.3", title: "Tujuh Benua & Lima Lautan" },
  {
    eyebrow: "◆ 5.4",
    title: "Pergerakan Kerak Bumi",
    sub: "Plat yang sentiasa bergerak membentuk muka bumi.",
  },
  {
    eyebrow: "◆ Sambungan 5.4",
    title: "Pembentukan Gunung",
    sub: "Daya berbeza menghasilkan bentuk muka bumi berbeza.",
  },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function GeoChapter5NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Geo5Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:geo-c5-section` : undefined;
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
  const gunungLipat = content.crustMovement.effects.find((e) => e.name === "Gunung Lipat");
  const gunungBongkah = content.crustMovement.effects.find((e) => e.name === "Gunung Bongkah");
  const gunungBerapi = content.crustMovement.effects.find((e) => e.name === "Gunung Berapi");

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🌍</div>
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
              {content.physicalSystem.surfaceArea}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.physicalSystem.waterVsLand}
            </p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">
                🌐 Empat Sfera Bumi
              </h4>
              <IconCardGrid
                items={content.physicalSystem.spheres.map((s) => ({
                  icon: "🔵",
                  label: s.name,
                  detail: s.description,
                }))}
              />
            </div>
            <ChipRow
              heading="🌤️ Lapisan Atmosfera (luar ke dalam)"
              items={content.physicalSystem.atmosphereLayers.map((l) => l.name)}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <img
              src="/geography/earth-structure.png"
              alt="Keratan rentas struktur Bumi yang menunjukkan kerak, litosfera, mantel, teras luar dan teras dalam"
              width={2048}
              height={1118}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full rounded-xl object-contain"
            />
            <IconCardGrid
              items={content.structure.layers.map((l) => ({
                icon: "🪨",
                label: l.name,
                detail: l.facts,
              }))}
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.continentsOceans.definition}
            </p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🌍 Benua</h4>
              <IconCardGrid
                items={content.continentsOceans.continents.map((c) => ({
                  icon: "🌍",
                  label: c.name,
                  detail: c.facts,
                }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🌊 Lautan</h4>
              <IconCardGrid
                items={content.continentsOceans.oceans.map((o) => ({
                  icon: "🌊",
                  label: o.name,
                  detail: o.facts,
                }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">
                〰️ Laut & Selat Penting
              </h4>
              <IconCardGrid
                items={content.continentsOceans.seasAndStraits.map((s) => ({
                  icon: "〰️",
                  label: s.name,
                  detail: s.facts,
                }))}
              />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.crustMovement.definition}
            </p>
            <DataTable
              headers={["Istilah", "Definisi"]}
              rows={content.crustMovement.keyTerms.map((t) => [t.term, t.definition])}
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.crustMovement.continentalDrift}
            </p>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <img
                  src="/geography/gunung-lipat.png"
                  alt="Rajah pembentukan gunung lipat oleh daya mampatan"
                  width={2048}
                  height={1118}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full max-w-full rounded-xl object-contain"
                />
                {gunungLipat && (
                  <StepList
                    steps={gunungLipat.process.map((p, i) => ({ step: i + 1, instruction: p }))}
                  />
                )}
              </div>
              <div className="space-y-3">
                <img
                  src="/geography/gunung-bongkah.png"
                  alt="Rajah pembentukan gunung bongkah dan lurah gelinciran oleh daya tegangan"
                  width={2048}
                  height={1118}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full max-w-full rounded-xl object-contain"
                />
                {gunungBongkah && (
                  <StepList
                    steps={gunungBongkah.process.map((p, i) => ({ step: i + 1, instruction: p }))}
                  />
                )}
              </div>
            </div>
            {gunungBerapi && (
              <div>
                <h4 className="font-display mb-3 text-sm font-bold text-foreground">
                  🌋 Gunung Berapi
                </h4>
                <StepList
                  steps={gunungBerapi.process.map((p, i) => ({ step: i + 1, instruction: p }))}
                />
              </div>
            )}
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">〰️ Gempa Bumi</h4>
              <ul className="flex flex-col gap-1.5">
                {content.crustMovement.earthquakeFacts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4">
              <p className="text-[12.5px] leading-relaxed text-red-200">
                🌊 {content.crustMovement.tsunamiFact}
              </p>
            </div>
          </div>
        )}

        {current === 5 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 5 Selesai"}
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

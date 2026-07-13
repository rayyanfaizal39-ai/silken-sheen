import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Chapter9Content } from "@/content/form1/science/chapter-9/chapter9-content";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { LayerStack } from "./blocks/LayerStack";
import { WaterCycleScene } from "./blocks/WaterCycleScene";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["Earth's spheres", "Atmosphere & ocean", "Earth's layers", "The water cycle", "Rocks", "Processes & geohazards", "Age of Earth & key facts"],
  bm: ["Sfera Bumi", "Atmosfera & lautan", "Lapisan Bumi", "Kitaran air", "Batuan", "Proses & geobahaya", "Usia Bumi & fakta penting"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 9.1", title: "Earth's Four Spheres", sub: "Atmosphere, biosphere, hydrosphere and geosphere — the four zones that make up Earth's system." },
    { eyebrow: "◆ 9.1 continued", title: "The Atmosphere & the Ocean", sub: "Same layer-stack idea applied to sky and sea." },
    { eyebrow: "◆ 9.1 continued", title: "Earth's Internal Layers" },
    { eyebrow: "◆ 9.2", title: "The Water Cycle", sub: "The total amount of water on Earth never changes — it just keeps moving." },
    { eyebrow: "◆ 9.3", title: "Rocks & the Rock Cycle" },
    { eyebrow: "◆ 9.4", title: "Earth's Processes & Geohazards" },
    { eyebrow: "◆ 9.5", title: "The Age of Earth & Key Facts" },
  ],
  bm: [
    { eyebrow: "◆ 9.1", title: "Empat Sfera Bumi", sub: "Atmosfera, biosfera, hidrosfera dan geosfera — empat zon yang membentuk sistem Bumi." },
    { eyebrow: "◆ Sambungan 9.1", title: "Atmosfera & Lautan", sub: "Idea lapisan bertindan yang sama diaplikasikan pada langit dan laut." },
    { eyebrow: "◆ Sambungan 9.1", title: "Lapisan Dalaman Bumi" },
    { eyebrow: "◆ 9.2", title: "Kitaran Air", sub: "Jumlah keseluruhan air di Bumi tidak pernah berubah — ia hanya terus bergerak." },
    { eyebrow: "◆ 9.3", title: "Batuan & Kitar Batuan" },
    { eyebrow: "◆ 9.4", title: "Proses Bumi & Geobahaya" },
    { eyebrow: "◆ 9.5", title: "Usia Bumi & Fakta Penting" },
  ],
};

const ATMOSPHERE_COLOR = ["bg-violet-400/20", "bg-primary/20", "bg-emerald-400/20", "bg-amber-400/20", "bg-red-400/20"];
const OCEAN_COLOR = ["bg-primary/10", "bg-primary/25", "bg-secondary"];
const EARTH_LAYER_COLOR = ["bg-violet-400/15", "bg-violet-400/25", "bg-orange-400/25", "bg-red-400/35"];

const ALTITUDE_FACT_HEAD: Record<Lang, string> = { en: "📏 Altitude Fact", bm: "📏 Fakta Altitud" };
const WHY_LIFE_HEAD: Record<Lang, string> = { en: "🌎 Why Earth Sustains Life", bm: "🌎 Sebab Bumi Dapat Menampung Hidupan" };
const ROCK_TYPES_HEAD: Record<Lang, string> = { en: "🪨 Rock Types", bm: "🪨 Jenis Batuan" };
const ROCK_CYCLE_HEAD: Record<Lang, string> = { en: "🔄 The Rock Cycle", bm: "🔄 Kitar Batuan" };
const START_COL: Record<Lang, string> = { en: "Starting point", bm: "Titik permulaan" };
const PROCESS_COL: Record<Lang, string> = { en: "Process", bm: "Proses" };
const BECOMES_COL: Record<Lang, string> = { en: "Becomes", bm: "Menjadi" };
const EXOGENIC_HEAD: Record<Lang, string> = { en: "🌤️ Exogenic Processes", bm: "🌤️ Proses Eksogen" };
const ENDOGENIC_HEAD: Record<Lang, string> = { en: "🌋 Endogenic Processes", bm: "🌋 Proses Endogen" };
const GEOHAZARDS_HEAD: Record<Lang, string> = { en: "⚠️ Geohazards", bm: "⚠️ Geobahaya" };
const WARNING_TECH_HEAD: Record<Lang, string> = { en: "📡 Early Warning Technology", bm: "📡 Teknologi Amaran Awal" };
const IMPACTS_HEAD: Record<Lang, string> = { en: "💥 Impacts", bm: "💥 Kesan" };
const FOSSIL_HEAD: Record<Lang, string> = { en: "🦴 Fossils", bm: "🦴 Fosil" };
const TIMELINE_HEAD: Record<Lang, string> = { en: "🕰️ A Timeline of Life on Earth", bm: "🕰️ Garis Masa Hidupan di Bumi" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 9 as Read", bm: "📘 Tandakan Bab 9 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

const GEOHAZARD_ICON: Record<string, string> = {
  Earthquake: "📉", "Gempa bumi": "📉",
  Landslide: "⛰️", "Tanah runtuh": "⛰️",
  Tsunami: "🌊",
  Volcanism: "🌋", "Kegiatan gunung berapi": "🌋",
  "Global warming": "🌡️", "Pemanasan global": "🌡️",
  Sinkhole: "🕳️", "Lubang benam": "🕳️",
  Quicksand: "🏜️", "Tanah jerlus": "🏜️",
  "Acid rain": "🌧️", "Hujan asid": "🌧️",
};

function parseCycleStep(step: string): [string, string, string] {
  const parts = step.split("→").map((p) => p.trim());
  if (parts.length >= 3) return [parts[0], parts[1], parts[2]];
  if (parts.length === 2) return [parts[0], "—", parts[1]];
  return [step, "—", "—"];
}

export function Chapter9NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter9Content; bm: Chapter9Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c9-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, total - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[lang][current];
  const isLast = current === total - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir)));
  }

  const rockCycleRows = t.composition.rockCycleSteps.filter((s) => s.includes("→")).map(parseCycleStep);
  const rockCycleNote = t.composition.rockCycleSteps.find((s) => !s.includes("→"));

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🌍</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{t.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hook.body}</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {ORBIT_LABELS[lang].map((label, i) => (
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
          <IconCardGrid items={t.earthSystem.spheres.map((s) => ({ label: s.name, detail: s.description }))} />
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <LayerStack
                layers={t.earthSystem.atmosphereLayers.map((l, i) => ({
                  name: l.name,
                  sub: `${l.altitude} · ${l.facts[0]}`,
                  colorClass: ATMOSPHERE_COLOR[i] ?? "bg-secondary",
                }))}
              />
              <LayerStack
                layers={t.earthSystem.oceanZones.map((z, i) => ({
                  name: z.name,
                  sub: `${z.depth} · ${z.facts[0]}`,
                  colorClass: OCEAN_COLOR[i] ?? "bg-secondary",
                }))}
              />
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              <b className="text-foreground">{ALTITUDE_FACT_HEAD[lang]}:</b> {t.earthSystem.altitudeFact}
            </p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <LayerStack
              layers={t.earthSystem.earthLayers.map((l, i) => ({
                name: l.name,
                sub: l.subLayers?.join(" · "),
                colorClass: EARTH_LAYER_COLOR[i] ?? "bg-secondary",
              }))}
            />
            <ChipRow heading={WHY_LIFE_HEAD[lang]} items={t.earthSystem.whyEarthSustainsLife} tone="green" />
          </div>
        )}

        {current === 3 && <WaterCycleScene lang={lang} caption={t.earthSystem.waterConstancyFact} />}

        {current === 4 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ROCK_TYPES_HEAD[lang]}</h4>
              <DefinitionCard
                items={t.composition.rockTypes.map((r) => ({
                  name: r.name,
                  body: r.formation,
                  example: r.characteristics.join("; "),
                  exampleLabel: lang === "en" ? "Characteristics" : "Ciri-ciri",
                }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ROCK_CYCLE_HEAD[lang]}</h4>
              <DataTable headers={[START_COL[lang], PROCESS_COL[lang], BECOMES_COL[lang]]} rows={rockCycleRows} />
              {rockCycleNote && <p className="mt-2 text-[12px] italic text-muted-foreground">{rockCycleNote}</p>}
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{EXOGENIC_HEAD[lang]}</h5>
                <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{t.mainProcesses.exogenic.description}</p>
                <ul className="flex flex-col gap-1">
                  {t.mainProcesses.exogenic.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{ENDOGENIC_HEAD[lang]}</h5>
                <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{t.mainProcesses.endogenic.description}</p>
                <ul className="flex flex-col gap-1">
                  {t.mainProcesses.endogenic.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{GEOHAZARDS_HEAD[lang]}</h4>
              <IconCardGrid
                items={t.geohazards.types.map((g) => ({ icon: GEOHAZARD_ICON[g.name] ?? "⚠️", label: g.name, detail: g.context }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{WARNING_TECH_HEAD[lang]}</h4>
              <DefinitionCard items={t.geohazards.earlyWarningTech.map((w) => ({ name: w.device, body: w.purpose }))} />
            </div>
            <ChipRow heading={IMPACTS_HEAD[lang]} items={t.geohazards.impacts} />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                <b className="text-foreground">{t.ageOfEarth.estimatedAge}.</b> {t.ageOfEarth.ageMethod}
              </p>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{FOSSIL_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.ageOfEarth.fossilDefinition}</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {t.ageOfEarth.fossilImportance.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{TIMELINE_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Period", "Note"] : ["Zaman", "Nota"]}
                rows={t.ageOfEarth.lifeTimeline.map((l) => [l.period, l.note])}
              />
            </div>
            <FactGrid heading={FACTS_HEAD[lang]} facts={t.keyExamFacts} />
            <ChipRow heading={GLOSS_HEAD[lang]} items={t.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">{SUMMARY_HEAD[lang]}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.chapterSummary}</p>
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
                  {isRead ? MARKED_BTN[lang] : MARK_READ_BTN[lang]}
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
            <ChevronLeft className="h-4 w-4" /> {BACK_BTN[lang]}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {NEXT_BTN[lang]} <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

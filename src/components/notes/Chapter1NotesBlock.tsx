import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { TabbedUses } from "./blocks/TabbedUses";
import { DataTable } from "./blocks/DataTable";
import { SafetyChecklist } from "./blocks/SafetyChecklist";
import { EffectsGrid, type EffectsGridTint } from "./blocks/EffectsGrid";
import { ProcessSteps } from "./blocks/ProcessSteps";
import { PreventionColumns } from "./blocks/PreventionColumns";
import { ChipRow } from "./blocks/ChipRow";
import { AccuracyTargets } from "./blocks/AccuracyTargets";
import { VernierDiagram } from "./blocks/VernierDiagram";
import { HazardDiamonds } from "./blocks/HazardDiamonds";
import { DensityColumn } from "./blocks/DensityColumn";

type Lang = "en" | "bm";

const HAZARD_ICON: Record<string, string> = {
  Irritant: "⚠️",
  "Bahan merengsa": "⚠️",
  Radioactive: "☢️",
  "Bahan radioaktif": "☢️",
  Corrosive: "🧪",
  "Bahan mengakis": "🧪",
  "Poison / Toxic": "☠️",
  "Bahan beracun / toksik": "☠️",
  Explosive: "💥",
  "Bahan mudah meletup": "💥",
  Flammable: "🔥",
  "Bahan mudah terbakar": "🔥",
};

const HAZARD_FILL: Record<string, string> = {
  Irritant: "fill-accent",
  "Bahan merengsa": "fill-accent",
  Radioactive: "fill-emerald-400",
  "Bahan radioaktif": "fill-emerald-400",
  Corrosive: "fill-slate-400",
  "Bahan mengakis": "fill-slate-400",
  "Poison / Toxic": "fill-red-400",
  "Bahan beracun / toksik": "fill-red-400",
  Explosive: "fill-amber-400",
  "Bahan mudah meletup": "fill-amber-400",
  Flammable: "fill-orange-400",
  "Bahan mudah terbakar": "fill-orange-400",
};

const DEFINITION_ICON: Record<string, string> = {
  Accuracy: "🎯",
  Kejituan: "🎯",
  Consistency: "🔁",
  Kepersisan: "🔁",
  Sensitivity: "📡",
  Kepekaan: "📡",
};

const ERROR_TYPE_STYLE: Record<number, { icon: string; tint: EffectsGridTint }> = {
  0: { icon: "🎯", tint: "amber" },
  1: { icon: "🎲", tint: "blue" },
};

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: [
    "Science in life",
    "Careers",
    "Lab apparatus",
    "Hazard symbols",
    "Lab rules & safety",
    "Quantities & units",
    "Measuring instruments",
    "Errors & estimation",
    "Density",
    "Scientific process",
    "Attitudes & values",
  ],
  bm: [
    "Sains dalam kehidupan",
    "Kerjaya",
    "Radas makmal",
    "Simbol bahaya",
    "Peraturan & keselamatan",
    "Kuantiti & unit",
    "Alat pengukur",
    "Ralat & anggaran",
    "Ketumpatan",
    "Proses saintifik",
    "Sikap & nilai",
  ],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 1.1", title: "Science in Everyday Life", sub: "Six fields of science, each shaping the world in a different way." },
    { eyebrow: "◆ 1.1 continued", title: "Careers Built on Science" },
    { eyebrow: "◆ 1.2", title: "Apparatus You'll Use in the Lab" },
    { eyebrow: "◆ 1.2 continued", title: "Know Your Hazard Symbols", sub: "Every bottle in the lab is labelled for a reason — learn to read the warning." },
    { eyebrow: "◆ 1.2 continued", title: "Laboratory Rules & Safety" },
    { eyebrow: "◆ 1.3", title: "Quantities & Units", sub: "The S.I. system that keeps science measurable across the world." },
    { eyebrow: "◆ 1.4", title: "Measuring Instruments" },
    { eyebrow: "◆ 1.4 continued", title: "Errors & Estimation" },
    { eyebrow: "◆ 1.5", title: "Density" },
    { eyebrow: "◆ 1.6", title: "The Scientific Investigation Process", sub: "Nine steps that turn a question into a trustworthy answer." },
    { eyebrow: "◆ 1.7", title: "Scientific Attitudes & Values" },
  ],
  bm: [
    { eyebrow: "◆ 1.1", title: "Sains dalam Kehidupan Harian", sub: "Enam bidang sains, setiap satu membentuk dunia dengan caranya sendiri." },
    { eyebrow: "◆ Sambungan 1.1", title: "Kerjaya Berasaskan Sains" },
    { eyebrow: "◆ 1.2", title: "Radas yang Digunakan dalam Makmal" },
    { eyebrow: "◆ Sambungan 1.2", title: "Kenali Simbol Bahaya", sub: "Setiap botol dalam makmal dilabel atas sebab tertentu — belajar membaca amarannya." },
    { eyebrow: "◆ Sambungan 1.2", title: "Peraturan & Keselamatan Makmal" },
    { eyebrow: "◆ 1.3", title: "Kuantiti & Unit", sub: "Sistem S.I. yang mengekalkan sains boleh diukur di seluruh dunia." },
    { eyebrow: "◆ 1.4", title: "Alat Pengukur" },
    { eyebrow: "◆ Sambungan 1.4", title: "Ralat & Anggaran" },
    { eyebrow: "◆ 1.5", title: "Ketumpatan" },
    { eyebrow: "◆ 1.6", title: "Proses Penyiasatan Saintifik", sub: "Sembilan langkah yang mengubah soalan menjadi jawapan yang boleh dipercayai." },
    { eyebrow: "◆ 1.7", title: "Sikap dan Nilai Murni Saintifik" },
  ],
};

const RULES_HEAD: Record<Lang, string> = { en: "🧷 Laboratory Rules", bm: "🧷 Peraturan Makmal" };
const SAFETY_MEASURES_HEAD: Record<Lang, string> = { en: "🛡️ Safety Measures", bm: "🛡️ Langkah Keselamatan" };
const ACCIDENT_HEAD: Record<Lang, string> = { en: "🚨 In Case of an Accident", bm: "🚨 Semasa Berlaku Kemalangan" };
const SI_HEAD: Record<Lang, string> = { en: "🌐 Why S.I. Units Matter", bm: "🌐 Kepentingan Unit S.I." };
const DEFINITIONS_HEAD: Record<Lang, string> = { en: "📖 Key Definitions", bm: "📖 Definisi Penting" };
const INSTRUMENTS_HEAD: Record<Lang, string> = { en: "🔧 Standard vs. Higher-Accuracy Tools", bm: "🔧 Alat Piawai lwn. Alat Berketepatan Tinggi" };
const ERROR_TYPES_HEAD: Record<Lang, string> = { en: "⚠️ Types of Error", bm: "⚠️ Jenis Ralat" };
const ESTIMATION_HEAD: Record<Lang, string> = { en: "📐 Estimation Methods", bm: "📐 Kaedah Anggaran" };
const FORMULA_HEAD: Record<Lang, string> = { en: "🧮 Formula", bm: "🧮 Rumus" };
const DENSITY_TABLE_HEAD: Record<Lang, string> = { en: "📊 Density of Common Materials", bm: "📊 Ketumpatan Bahan Lazim" };
const EVERYDAY_HEAD: Record<Lang, string> = { en: "🌍 Everyday Examples", bm: "🌍 Contoh Harian" };
const PROCESS_SKILLS_HEAD: Record<Lang, string> = { en: "🧠 Process Skills", bm: "🧠 Kemahiran Proses" };
const PURPOSE_HEAD: Record<Lang, string> = { en: "🎯 Why It Matters", bm: "🎯 Kepentingannya" };

export function Chapter1NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter1Content; bm: Chapter1Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c1-section` : undefined;
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

  const fieldIconByName = new Map(t.scienceInLife.fields.map((f) => [f.name, f.icon]));

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🔬</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{t.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hook.body}</p>
        </div>
      </div>

      <div className="science-research-orbit mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
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

      <div className="science-research-module-shell relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="science-research-title font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        <ResearchModuleMeta index={current} total={total} title={chrome.title} lang={lang} />
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <ul className="flex flex-col gap-1.5">
              {t.scienceInLife.importance.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <IconCardGrid
              items={t.scienceInLife.fields.map((f) => ({ icon: f.icon, label: f.name, detail: f.examples }))}
            />
          </div>
        )}

        {current === 1 && (
          <TabbedUses
            tabs={t.scienceInLife.careers.map((c) => ({
              symbol: fieldIconByName.get(c.field) ?? "🔬",
              name: c.field,
              uses: c.jobs.map((job) => ({ icon: "💼", label: job })),
            }))}
          />
        )}

        {current === 2 && (
          <DataTable
            headers={lang === "en" ? ["Apparatus", "Function"] : ["Radas", "Fungsi"]}
            rows={t.laboratory.apparatus.map((a) => [a.name, a.function])}
          />
        )}

        {current === 3 && (
          <HazardDiamonds
            items={t.laboratory.hazardSymbols.map((h) => ({
              icon: HAZARD_ICON[h.name],
              name: h.name,
              body: h.body,
              examples: h.examples,
              fillClass: HAZARD_FILL[h.name] ?? "fill-accent",
            }))}
          />
        )}

        {current === 4 && (
          <div className="space-y-6">
            <SafetyChecklist heading={RULES_HEAD[lang]} items={t.laboratory.rules} />
            <SafetyChecklist heading={SAFETY_MEASURES_HEAD[lang]} items={t.laboratory.safetyMeasures} />
            <SafetyChecklist heading={ACCIDENT_HEAD[lang]} items={t.laboratory.accidentSteps} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <DataTable
              headers={lang === "en" ? ["Quantity", "Unit", "Symbol"] : ["Kuantiti", "Unit", "Simbol"]}
              rows={t.quantitiesAndUnits.baseQuantities.map((q) => [q.quantity, q.unit, q.symbol])}
            />
            <DataTable
              headers={lang === "en" ? ["Prefix", "Value", "Standard Form", "Symbol"] : ["Awalan", "Nilai", "Bentuk Piawai", "Simbol"]}
              rows={t.quantitiesAndUnits.prefixes.map((p) => [p.prefix, p.value, p.standardForm, p.symbol])}
            />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{SI_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.quantitiesAndUnits.siImportance}</p>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{DEFINITIONS_HEAD[lang]}</h4>
              <AccuracyTargets
                lang={lang}
                accuracyTerm={t.measuringInstruments.definitions[0].term}
                consistencyTerm={t.measuringInstruments.definitions[1].term}
              />
              <div className="mt-3.5 rounded-2xl border border-border bg-secondary/40 p-4">
                <p className="font-display flex items-center gap-2 text-[13px] font-bold text-foreground">
                  <span>{DEFINITION_ICON[t.measuringInstruments.definitions[2].term]}</span>
                  {t.measuringInstruments.definitions[2].term}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  {t.measuringInstruments.definitions[2].body}
                </p>
              </div>
            </div>
            <VernierDiagram lang={lang} />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{INSTRUMENTS_HEAD[lang]}</h4>
              <DataTable
                headers={
                  lang === "en"
                    ? ["Quantity", "Standard Tool", "Higher-Accuracy Tool", "Note"]
                    : ["Kuantiti", "Alat Piawai", "Alat Berketepatan Tinggi", "Nota"]
                }
                rows={t.measuringInstruments.instruments.map((i) => [
                  i.quantity,
                  i.standardTool,
                  i.higherAccuracyTool ?? "—",
                  i.note,
                ])}
              />
            </div>
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ERROR_TYPES_HEAD[lang]}</h4>
              <EffectsGrid
                cards={t.measuringInstruments.errorTypes.map((e, i) => ({
                  icon: ERROR_TYPE_STYLE[i]?.icon ?? "⚠️",
                  tint: ERROR_TYPE_STYLE[i]?.tint ?? "amber",
                  heading: e.type,
                  items: e.examples,
                  secondaryLabel: lang === "en" ? "Ways to overcome" : "Cara Mengatasi",
                  secondaryItems: e.waysToOvercome,
                }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ESTIMATION_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Quantity", "Method"] : ["Kuantiti", "Kaedah"]}
                rows={t.measuringInstruments.estimationMethods.map((m) => [m.quantity, m.method])}
              />
            </div>
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
              <h4 className="font-display mb-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                {FORMULA_HEAD[lang]}
              </h4>
              <p className="font-display text-sm font-semibold text-foreground">{t.density.formula}</p>
            </div>
            <DensityColumn table={t.density.table} lang={lang} />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{DENSITY_TABLE_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Material", "Density (g cm⁻³)"] : ["Bahan", "Ketumpatan (g cm⁻³)"]}
                rows={t.density.table.map((d) => [d.material, d.density])}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{EVERYDAY_HEAD[lang]}</h4>
              <ul className="flex flex-col gap-1.5">
                {t.density.everydayExamples.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current === 9 && (
          <div className="space-y-6">
            <ChipRow heading={PROCESS_SKILLS_HEAD[lang]} items={t.investigationSteps.processSkills} />
            <ProcessSteps steps={t.investigationSteps.steps} />
          </div>
        )}

        {current === 10 && (
          <div className="space-y-6">
            <PreventionColumns
              categories={[
                { heading: lang === "en" ? "Core Attitudes" : "Sikap Teras", items: t.attitudesAndValues.core },
                { heading: lang === "en" ? "Additional Values" : "Nilai Tambahan", items: t.attitudesAndValues.additional },
              ]}
            />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{PURPOSE_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.attitudesAndValues.purpose}</p>
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
                  {isRead
                    ? lang === "en"
                      ? "Marked as read ✓"
                      : "Selesai ditanda ✓"
                    : lang === "en"
                      ? "📘 Mark Chapter 1 as Read"
                      : "📘 Tandakan Bab 1 Selesai"}
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
            <ChevronLeft className="h-4 w-4" /> {lang === "en" ? "Back" : "Kembali"}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {lang === "en" ? "Next section" : "Seksyen seterusnya"} <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

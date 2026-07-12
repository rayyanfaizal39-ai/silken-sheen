import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { CompositionDonut } from "./blocks/CompositionDonut";
import { PredictReveal } from "./blocks/PredictReveal";
import { TabbedUses } from "./blocks/TabbedUses";
import { CycleDiagram } from "./blocks/CycleDiagram";
import { FireTriangle } from "./blocks/FireTriangle";
import { ExtinguisherTable } from "./blocks/ExtinguisherTable";
import { SourceCards } from "./blocks/SourceCards";
import { EffectsGrid, type EffectsGridTint } from "./blocks/EffectsGrid";
import { PreventionColumns } from "./blocks/PreventionColumns";
import { ApiTable } from "./blocks/ApiTable";
import { FactGrid } from "./blocks/FactGrid";
import { ChipRow } from "./blocks/ChipRow";

type Lang = "en" | "bm";

const BALANCE_HEAD: Record<Lang, string> = {
  en: "🌍 Protecting the balance",
  bm: "🌍 Melindungi keseimbangan",
};

const EFFECT_CATEGORY_ICON: Record<string, string> = {
  health: "🫁",
  buildings: "🏛️",
  plants: "🌱",
  climate: "🌍",
};
const EFFECT_CATEGORY_TINT: Record<string, EffectsGridTint> = {
  health: "red",
  buildings: "amber",
  plants: "green",
  climate: "blue",
};

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["Composition", "Experiment", "Gas uses", "Cycles", "Combustion", "Pollution sources", "Pollution effects", "Prevention", "Summary"],
  bm: ["Komposisi", "Eksperimen", "Kepentingan gas", "Kitar", "Pembakaran", "Punca pencemaran", "Kesan pencemaran", "Pencegahan", "Ringkasan"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 7.1", title: "Composition of Air", sub: "Air is a mixture of several gases — invisible, but never empty." },
    { eyebrow: "◆ Activity 7.1", title: "Finding the % of Oxygen in Air" },
    { eyebrow: "◆ 7.1 continued", title: "Why These Gases Matter", sub: "Every gas in that donut chart earns its place — including the \"rare\" ones." },
    { eyebrow: "◆ Carbon & Oxygen Cycles", title: "Keeping the Gas Balance", sub: "Two cycles working in opposite directions, constantly, to keep air's ratio stable." },
    { eyebrow: "◆ 7.2", title: "Combustion & Fire Safety" },
    { eyebrow: "◆ 7.3", title: "Where Air Pollution Comes From", sub: "Air pollution: the presence of pollutants in the air that harms living things and the environment." },
    { eyebrow: "◆ 7.3 continued", title: "The Damage It Causes", sub: "Air pollution doesn't just affect breathing — it touches health, buildings, ecosystems and climate." },
    { eyebrow: "◆ 7.3 continued", title: "Prevention & Control", sub: "Three fronts working together — rules, awareness, and technology." },
    { eyebrow: "◆ Wrap-up", title: "Air Pollutant Index & Key Facts" },
  ],
  bm: [
    { eyebrow: "◆ 7.1", title: "Komposisi Udara", sub: "Udara ialah campuran beberapa jenis gas — tidak kelihatan, tetapi tidak pernah kosong." },
    { eyebrow: "◆ Aktiviti 7.1", title: "Menentukan Peratusan Oksigen dalam Udara" },
    { eyebrow: "◆ Sambungan 7.1", title: "Kepentingan Gas dalam Kehidupan Harian", sub: "Setiap gas dalam carta pai itu mempunyai peranan — termasuk gas \"nadir\"." },
    { eyebrow: "◆ Kitar Karbon & Kitar Oksigen", title: "Mengekalkan Keseimbangan Gas", sub: "Dua kitaran yang bekerja dalam arah bertentangan, secara berterusan, untuk mengekalkan nisbah udara." },
    { eyebrow: "◆ 7.2", title: "Pembakaran & Keselamatan Kebakaran" },
    { eyebrow: "◆ 7.3", title: "Punca Pencemaran Udara", sub: "Pencemaran udara: kehadiran bahan pencemar dalam udara yang memudaratkan hidupan dan alam sekitar." },
    { eyebrow: "◆ Sambungan 7.3", title: "Kesan Buruk Pencemaran Udara", sub: "Pencemaran udara bukan sekadar menjejaskan pernafasan — ia turut menjejaskan bangunan, ekosistem dan iklim." },
    { eyebrow: "◆ Sambungan 7.3", title: "Pencegahan & Kawalan", sub: "Tiga pendekatan yang bergerak seiring — undang-undang, pendidikan, dan teknologi." },
    { eyebrow: "◆ Rumusan", title: "Indeks Pencemaran Udara & Fakta Penting" },
  ],
};

const ACC_BADGE: Record<Lang, string> = { en: "📗 Textbook-complete", bm: "📗 Lengkap mengikut buku teks" };
const API_HEAD: Record<Lang, string> = { en: "📟 Air Pollutant Index (API)", bm: "📟 Indeks Pencemaran Udara (IPU)" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 7 as Read", bm: "📘 Tandakan Bab 7 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

export function Bab7NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Bab7Content; bm: Bab7Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const stateKey = storageKey ? `${storageKey}:bab7-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, 8)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[lang][current];
  const isLast = current === 8;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(8, c + dir)));
  }

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-4 flex items-center justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11.5px] font-semibold text-emerald-300">
          {ACC_BADGE[lang]}
        </span>
      </div>

      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🌬️</div>
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

        {current === 0 && <CompositionDonut legend={t.composition.legend} reveals={t.composition.reveals} lang={lang} />}
        {current === 1 && (
          <PredictReveal
            aim={t.experiment.aim}
            steps={t.experiment.steps}
            predictQuestion={t.experiment.predictQuestion}
            predictOptions={t.experiment.predictOptions}
            predictFeedback={t.experiment.predictFeedback}
            lang={lang}
          />
        )}
        {current === 2 && <TabbedUses tabs={t.uses.tabs} />}
        {current === 3 && (
          <CycleDiagram
            boxes={[
              { icon: "🔵", heading: t.cycles.carbonCycle.heading, steps: t.cycles.carbonCycle.steps },
              { icon: "🟣", heading: t.cycles.oxygenCycle.heading, steps: t.cycles.oxygenCycle.steps },
            ]}
            chipsHeading={BALANCE_HEAD[lang]}
            chips={t.cycles.balanceActions}
          />
        )}
        {current === 4 && (
          <div className="space-y-6">
            <FireTriangle definition={t.combustion.definition} triangle={t.combustion.triangle} />
            <ExtinguisherTable
              methods={t.combustion.methods}
              extinguisherTable={t.combustion.extinguisherTable}
              safetyChecklist={t.combustion.safetyChecklist}
              lang={lang}
            />
          </div>
        )}
        {current === 5 && <SourceCards sources={t.pollutionSources} />}
        {current === 6 && (
          <EffectsGrid
            cards={t.pollutionEffects.map((e) => ({
              icon: EFFECT_CATEGORY_ICON[e.category],
              tint: EFFECT_CATEGORY_TINT[e.category],
              heading: e.heading,
              items: e.items,
            }))}
          />
        )}
        {current === 7 && <PreventionColumns categories={t.prevention} />}
        {current === 8 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{API_HEAD[lang]}</h4>
              <ApiTable rows={t.api} />
            </div>

            <FactGrid heading={FACTS_HEAD[lang]} facts={t.keyExamFacts} />

            <ChipRow heading={GLOSS_HEAD[lang]} items={t.keyTerms} />

            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                {SUMMARY_HEAD[lang]}
              </h4>
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

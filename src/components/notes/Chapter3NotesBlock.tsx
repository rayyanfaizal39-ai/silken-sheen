import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { ThermostatDial } from "./blocks/ThermostatDial";
import { SplitBodyComparison } from "./blocks/SplitBodyComparison";
import { StomaDiagram } from "./blocks/StomaDiagram";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["The control loop", "Water regulation", "Temperature regulation", "Animal homeostasis", "Plant homeostasis", "Key facts & terms"],
  bm: ["Gelung kawalan", "Regulasi air", "Regulasi suhu", "Homeostasis haiwan", "Homeostasis tumbuhan", "Fakta & istilah penting"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 3.1", title: "Homeostasis & the Control Loop", sub: "Detect → corrective mechanism → return to normal. Every example in this chapter runs on this one loop." },
    { eyebrow: "◆ 3.2", title: "Water Regulation" },
    { eyebrow: "◆ 3.2 continued", title: "Temperature Regulation", sub: "The same brain-driven loop, running on hot days and cold days." },
    { eyebrow: "◆ 3.3", title: "Homeostasis in Animals" },
    { eyebrow: "◆ 3.4", title: "Homeostasis in Plants", sub: "Transpiration and the stoma that controls it." },
    { eyebrow: "◆ Wrap-up", title: "Key Facts & Terms" },
  ],
  bm: [
    { eyebrow: "◆ 3.1", title: "Homeostasis & Gelung Kawalan", sub: "Kesan → mekanisme pembetulan → kembali normal. Setiap contoh dalam bab ini berjalan atas satu gelung ini." },
    { eyebrow: "◆ 3.2", title: "Regulasi Air" },
    { eyebrow: "◆ Sambungan 3.2", title: "Regulasi Suhu", sub: "Gelung yang sama dikawal otak, berjalan pada hari panas dan hari sejuk." },
    { eyebrow: "◆ 3.3", title: "Homeostasis pada Haiwan" },
    { eyebrow: "◆ 3.4", title: "Homeostasis pada Tumbuhan", sub: "Transpirasi dan stoma yang mengawalnya." },
    { eyebrow: "◆ Rumusan", title: "Fakta & Istilah Penting" },
  ],
};

const ETYMOLOGY_HEAD: Record<Lang, string> = { en: "📜 Where the Word Comes From", bm: "📜 Asal Usul Perkataan" };
const IMPORTANCE_HEAD: Record<Lang, string> = { en: "⚠️ Why It Matters", bm: "⚠️ Kepentingannya" };
const SYSTEMS_HEAD: Record<Lang, string> = { en: "Systems & organs involved", bm: "Sistem & organ terlibat" };
const WHEN_INCREASES_HEAD: Record<Lang, string> = { en: "💧 When Water Content Increases", bm: "💧 Apabila Kandungan Air Meningkat" };
const WHEN_DECREASES_HEAD: Record<Lang, string> = { en: "🥵 When Water Content Decreases", bm: "🥵 Apabila Kandungan Air Berkurang" };
const SKIN_HEAD: Record<Lang, string> = { en: "🧴 How the Skin Responds", bm: "🧴 Cara Kulit Bertindak Balas" };
const TRANSPIRATION_HEAD: Record<Lang, string> = { en: "🌿 What Is Transpiration?", bm: "🌿 Apakah Transpirasi?" };
const TRANSPIRATION_FN_HEAD: Record<Lang, string> = { en: "Functions of transpiration", bm: "Fungsi transpirasi" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 3 as Read", bm: "📘 Tandakan Bab 3 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };
const RESULT_LABEL: Record<Lang, string> = { en: "Result", bm: "Hasil" };
const DETECTED_BY_LABEL: Record<Lang, string> = { en: "Detected by", bm: "Dikesan oleh" };

export function Chapter3NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter3Content; bm: Chapter3Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c3-section` : undefined;
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

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🌡️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.definition.meaning}</p>
            <ThermostatDial lang={lang} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{ETYMOLOGY_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.definition.etymology}</p>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{IMPORTANCE_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.definition.importance}</p>
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.controlProcessConcept}</p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <ChipRow heading={SYSTEMS_HEAD[lang]} items={[t.waterRegulation.systemsInvolved, t.waterRegulation.organsInvolved]} />
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{WHEN_INCREASES_HEAD[lang]}</h5>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.waterRegulation.increase.trigger}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  <b className="text-foreground">{DETECTED_BY_LABEL[lang]}:</b> {t.waterRegulation.increase.detectedBy}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {t.waterRegulation.increase.mechanism.map((m) => (
                    <li key={m} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11.5px] font-semibold text-primary">
                  {RESULT_LABEL[lang]}: {t.waterRegulation.increase.result}
                </p>
              </div>
              <div className="rounded-2xl border border-accent/25 bg-accent/5 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{WHEN_DECREASES_HEAD[lang]}</h5>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.waterRegulation.decrease.trigger}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  <b className="text-foreground">{DETECTED_BY_LABEL[lang]}:</b> {t.waterRegulation.decrease.detectedBy}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {t.waterRegulation.decrease.mechanism.map((m) => (
                    <li key={m} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11.5px] font-semibold text-accent">
                  {RESULT_LABEL[lang]}: {t.waterRegulation.decrease.result}
                </p>
              </div>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <ChipRow heading={SYSTEMS_HEAD[lang]} items={[t.temperatureRegulation.systemsInvolved, t.temperatureRegulation.organsInvolved]} />
            <SplitBodyComparison
              lang={lang}
              hotMechanisms={t.temperatureRegulation.hotCondition.mechanism}
              hotResult={t.temperatureRegulation.hotCondition.result}
              coldMechanisms={t.temperatureRegulation.coldCondition.mechanism}
              coldResult={t.temperatureRegulation.coldCondition.result}
            />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{SKIN_HEAD[lang]}</h4>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {t.temperatureRegulation.skinMechanisms.map((s) => (
                  <div key={s.condition} className="rounded-2xl border border-border bg-secondary/40 p-4">
                    <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{s.condition}</h5>
                    <ul className="flex flex-col gap-1">
                      {s.mechanisms.map((m) => (
                        <li key={m} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <IconCardGrid
            items={t.animalHomeostasis.map((a) => ({ icon: a.icon, label: a.animal, detail: a.adaptation }))}
          />
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{TRANSPIRATION_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.plantHomeostasis.transpirationDefinition}</p>
            </div>
            <ChipRow heading={TRANSPIRATION_FN_HEAD[lang]} items={t.plantHomeostasis.transpirationFunctions} tone="green" />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.plantHomeostasis.waterLossFact}</p>
            <StomaDiagram
              lang={lang}
              states={[
                { condition: t.plantHomeostasis.stomaStates[0].condition, reason: t.plantHomeostasis.stomaStates[0].reason },
                { condition: t.plantHomeostasis.stomaStates[1].condition, reason: t.plantHomeostasis.stomaStates[1].reason },
              ]}
            />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
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

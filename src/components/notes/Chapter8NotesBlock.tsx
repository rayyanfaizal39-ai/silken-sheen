import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import { DataTable } from "./blocks/DataTable";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { RayDiagram } from "./blocks/RayDiagram";
import { MirrorComparison } from "./blocks/MirrorComparison";
import { DispersionPrism } from "./blocks/DispersionPrism";
import { ScatteringComparison } from "./blocks/ScatteringComparison";
import { ColorMixingDiagram } from "./blocks/ColorMixingDiagram";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["Mirror images", "Mirror types", "Law of reflection", "Properties of light", "Refraction", "Dispersion", "Scattering", "Colour mixing", "Key facts & terms"],
  bm: ["Imej cermin", "Jenis cermin", "Hukum pantulan", "Sifat cahaya", "Pembiasan", "Serakan cahaya", "Penyerakan cahaya", "Percampuran warna", "Fakta & istilah penting"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 8.1", title: "Real vs Virtual Images", sub: "A plane mirror always produces a virtual image." },
    { eyebrow: "◆ 8.1 continued", title: "Plane, Concave & Convex Mirrors" },
    { eyebrow: "◆ 8.2", title: "The Law of Reflection & Optical Instruments", sub: "The angle of incidence always equals the angle of reflection." },
    { eyebrow: "◆ 8.3", title: "Properties of Light & Shadows" },
    { eyebrow: "◆ 8.4", title: "Refraction of Light", sub: "The single most-tested ray diagram in this chapter." },
    { eyebrow: "◆ 8.5", title: "Dispersion of Light" },
    { eyebrow: "◆ 8.6", title: "Scattering of Light", sub: "Why the sky is blue at midday and reddish at sunset." },
    { eyebrow: "◆ 8.7", title: "Addition & Subtraction of Colour" },
    { eyebrow: "◆ Wrap-up", title: "Key Facts & Terms" },
  ],
  bm: [
    { eyebrow: "◆ 8.1", title: "Imej Nyata lwn. Maya", sub: "Cermin satah sentiasa menghasilkan imej maya." },
    { eyebrow: "◆ Sambungan 8.1", title: "Cermin Satah, Cekung & Cembung" },
    { eyebrow: "◆ 8.2", title: "Hukum Pantulan & Alat Optik", sub: "Sudut tuju sentiasa sama dengan sudut pantulan." },
    { eyebrow: "◆ 8.3", title: "Sifat Cahaya & Bayang-Bayang" },
    { eyebrow: "◆ 8.4", title: "Pembiasan Cahaya", sub: "Gambar rajah sinar yang paling kerap diuji dalam bab ini." },
    { eyebrow: "◆ 8.5", title: "Serakan Cahaya" },
    { eyebrow: "◆ 8.6", title: "Penyerakan Cahaya", sub: "Sebab langit biru pada tengah hari dan kemerahan waktu matahari terbenam." },
    { eyebrow: "◆ 8.7", title: "Penambahan & Penolakan Warna" },
    { eyebrow: "◆ Rumusan", title: "Fakta & Istilah Penting" },
  ],
};

const PLANE_MIRROR_HEAD: Record<Lang, string> = { en: "🪞 Plane Mirror Characteristics", bm: "🪞 Ciri Cermin Satah" };
const INSTRUMENTS_HEAD: Record<Lang, string> = { en: "🔭 Optical Instruments", bm: "🔭 Alat Optik" };
const FACTS_HEAD: Record<Lang, string> = { en: "💡 Facts", bm: "💡 Fakta" };
const SHADOW_HEAD: Record<Lang, string> = { en: "🌑 How a Shadow Forms", bm: "🌑 Cara Bayang-Bayang Terbentuk" };
const DAILY_LIFE_HEAD: Record<Lang, string> = { en: "Everyday examples", bm: "Contoh harian" };
const RAINBOW_HEAD: Record<Lang, string> = { en: "🌈 How a Rainbow Forms", bm: "🌈 Cara Pelangi Terbentuk" };
const PRIMARY_HEAD: Record<Lang, string> = { en: "Primary colours", bm: "Warna primer" };
const SECONDARY_HEAD: Record<Lang, string> = { en: "Secondary colours", bm: "Warna sekunder" };
const FACTS_EXAM_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 8 as Read", bm: "📘 Tandakan Bab 8 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

export function Chapter8NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter8Content; bm: Chapter8Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c8-section` : undefined;
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

  const [planeMirror, concaveMirror, convexMirror] = t.mirrors.mirrorTypes;
  const refractionBends: Array<"awayNormal" | "towardNormal" | "none"> = ["awayNormal", "towardNormal", "none"];

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">💡</div>
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
            <DataTable
              headers={lang === "en" ? ["Image type", "Description"] : ["Jenis imej", "Penerangan"]}
              rows={[
                [lang === "en" ? "Real" : "Nyata", t.mirrors.realVsVirtual.real],
                [lang === "en" ? "Virtual" : "Maya", t.mirrors.realVsVirtual.virtual],
              ]}
            />
            <ChipRow heading={PLANE_MIRROR_HEAD[lang]} items={t.mirrors.planeMirrorCharacteristics} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <MirrorComparison lang={lang} concaveUses={concaveMirror.uses} convexUses={convexMirror.uses} />
            <DefinitionCard
              items={[
                {
                  name: planeMirror.name,
                  body: planeMirror.imageCharacteristics.join(", "),
                  example: planeMirror.uses.join("; "),
                  exampleLabel: lang === "en" ? "Uses" : "Kegunaan",
                },
              ]}
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <RayDiagram variant="reflection" lang={lang} />
            <ul className="flex flex-col gap-1.5">
              {t.mirrors.lawOfReflection.statement.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{INSTRUMENTS_HEAD[lang]}</h4>
              <DefinitionCard items={t.mirrors.opticalInstruments.map((o) => ({ name: o.name, body: o.howItWorks }))} />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <FactGrid heading={FACTS_HEAD[lang]} facts={t.propertiesOfLight.facts} />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{SHADOW_HEAD[lang]}</h4>
              <ul className="flex flex-col gap-1.5">
                {t.propertiesOfLight.shadowFormation.map((s, i) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="font-display flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.refraction.definition}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.refraction.cases.map((c, i) => (
                <div key={c.scenario} className="flex flex-col gap-2">
                  <RayDiagram variant="refraction" lang={lang} bend={refractionBends[i]} />
                  <p className="text-[11.5px] leading-snug text-muted-foreground">{c.scenario}</p>
                  <p className="text-[11.5px] font-semibold text-foreground">{c.behavior}</p>
                </div>
              ))}
            </div>
            <ChipRow heading={DAILY_LIFE_HEAD[lang]} items={t.refraction.dailyLifeExamples} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.dispersion.definition}</p>
            <DispersionPrism lang={lang} spectrumOrder={t.dispersion.spectrumOrder} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.dispersion.speedFact}</p>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{RAINBOW_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.dispersion.rainbowFormation}</p>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.scattering.definition}</p>
            <ScatteringComparison lang={lang} middayExplanation={t.scattering.middayExplanation} sunsetExplanation={t.scattering.sunsetExplanation} />
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <ChipRow heading={PRIMARY_HEAD[lang]} items={t.colorAdditionSubtraction.primaryColors} />
              <ChipRow heading={SECONDARY_HEAD[lang]} items={t.colorAdditionSubtraction.secondaryColors} />
            </div>
            <ColorMixingDiagram
              lang={lang}
              additionFormula={t.colorAdditionSubtraction.additionFormula}
              allThreeMixed={t.colorAdditionSubtraction.allThreeMixed}
              subtractionExamples={t.colorAdditionSubtraction.subtractionExamples}
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.colorAdditionSubtraction.subtractionPrinciple}</p>
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <FactGrid heading={FACTS_EXAM_HEAD[lang]} facts={t.keyExamFacts} />
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

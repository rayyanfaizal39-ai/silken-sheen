import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Chapter5Content, StateProperty } from "@/content/form1/science/chapter-5/chapter5-content";
import { TabbedUses } from "./blocks/TabbedUses";
import { ChipRow } from "./blocks/ChipRow";
import { DataTable } from "./blocks/DataTable";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { ParticleAnimation } from "./blocks/ParticleAnimation";
import { ChangeOfStateFlow } from "./blocks/ChangeOfStateFlow";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["Matter in nature", "Properties", "Density & points", "States of matter", "Diffusion", "Changes of state", "Everyday examples"],
  bm: ["Jirim dalam alam", "Sifat", "Ketumpatan & takat", "Keadaan jirim", "Resapan", "Perubahan keadaan", "Contoh harian"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 5.1", title: "Matter in Nature" },
    { eyebrow: "◆ 5.1 continued", title: "Physical & Chemical Properties", sub: "Two different lenses for classifying the same matter." },
    { eyebrow: "◆ 5.1 continued", title: "Density, Melting & Boiling Points" },
    { eyebrow: "◆ 5.2", title: "States of Matter", sub: "Every state follows the same kinetic theory — only the particle behaviour changes." },
    { eyebrow: "◆ 5.2 continued", title: "Diffusion" },
    { eyebrow: "◆ 5.2 continued", title: "Changes of State", sub: "Six named transitions, all driven by particles gaining or losing energy." },
    { eyebrow: "◆ 5.2 continued", title: "Changes of State in Everyday Life" },
  ],
  bm: [
    { eyebrow: "◆ 5.1", title: "Jirim dalam Alam Semula Jadi" },
    { eyebrow: "◆ Sambungan 5.1", title: "Sifat Fizikal & Kimia", sub: "Dua sudut pandang berbeza untuk mengelaskan jirim yang sama." },
    { eyebrow: "◆ Sambungan 5.1", title: "Ketumpatan, Takat Lebur & Takat Didih" },
    { eyebrow: "◆ 5.2", title: "Keadaan Jirim", sub: "Setiap keadaan mengikut teori kinetik yang sama — hanya kelakuan zarah berbeza." },
    { eyebrow: "◆ Sambungan 5.2", title: "Resapan" },
    { eyebrow: "◆ Sambungan 5.2", title: "Perubahan Keadaan Jirim", sub: "Enam peralihan bernama, semuanya didorong oleh zarah memperoleh atau kehilangan tenaga." },
    { eyebrow: "◆ Sambungan 5.2", title: "Perubahan Keadaan dalam Kehidupan Harian" },
  ],
};

const CLASSIFICATION_HEAD: Record<Lang, string> = { en: "🔎 Classified by", bm: "🔎 Dikelaskan mengikut" };
const DENSITY_CLASS_HEAD: Record<Lang, string> = { en: "⚖️ Which Is Denser?", bm: "⚖️ Mana Lebih Tumpat?" };
const MELT_BOIL_HEAD: Record<Lang, string> = { en: "🌡️ Melting & Boiling Points", bm: "🌡️ Takat Lebur & Takat Didih" };
const SOLUBILITY_HEAD: Record<Lang, string> = { en: "🍬 Solubility", bm: "🍬 Keterlarutan" };
const STATE_PROPS_HEAD: Record<Lang, string> = { en: "🧊 Comparing the Three States", bm: "🧊 Perbandingan Tiga Keadaan" };
const PARTICLES_HEAD: Record<Lang, string> = { en: "⚛️ Particles in Motion", bm: "⚛️ Zarah dalam Pergerakan" };
const CHANGE_FLOW_HEAD: Record<Lang, string> = { en: "🔄 Changes of State", bm: "🔄 Perubahan Keadaan" };
const DIFFUSION_RESULTS_HEAD: Record<Lang, string> = { en: "🧪 Diffusion Rate by State", bm: "🧪 Kadar Resapan mengikut Keadaan" };
const CONSTANT_FACTS_HEAD: Record<Lang, string> = { en: "📌 What Stays Constant", bm: "📌 Apa yang Kekal Malar" };

const PROPERTY_ROWS: Record<Lang, Array<{ key: keyof StateProperty; label: string }>> = {
  en: [
    { key: "shape", label: "Shape" },
    { key: "mass", label: "Mass" },
    { key: "volume", label: "Volume" },
    { key: "compressibility", label: "Compressibility" },
    { key: "spaceBetweenParticles", label: "Space between particles" },
    { key: "particleArrangement", label: "Particle arrangement" },
    { key: "particleMovement", label: "Particle movement" },
  ],
  bm: [
    { key: "shape", label: "Bentuk" },
    { key: "mass", label: "Jisim" },
    { key: "volume", label: "Isi padu" },
    { key: "compressibility", label: "Kebolehmampatan" },
    { key: "spaceBetweenParticles", label: "Jarak antara zarah" },
    { key: "particleArrangement", label: "Susunan zarah" },
    { key: "particleMovement", label: "Pergerakan zarah" },
  ],
};

export function Chapter5NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter5Content; bm: Chapter5Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c5-section` : undefined;
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

  const stateColumns = t.statesOfMatter.stateProperties;
  const stateTableHeaders = [lang === "en" ? "Property" : "Sifat", ...stateColumns.map((s) => s.state)];
  const stateTableRows = PROPERTY_ROWS[lang].map((row) => [
    row.label,
    ...stateColumns.map((s) => String(s[row.key])),
  ]);

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🧪</div>
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
          <div className="space-y-5">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.matterInNature.definition}</p>
            <ChipRow heading={CLASSIFICATION_HEAD[lang]} items={t.matterInNature.classificationCharacteristics} />
          </div>
        )}

        {current === 1 && (
          <TabbedUses
            tabs={[
              {
                symbol: "⚙️",
                name: lang === "en" ? "Physical" : "Fizikal",
                uses: t.matterInNature.physicalProperties.map((p) => ({ icon: p.icon, label: p.label, sub: p.detail })),
              },
              {
                symbol: "🧫",
                name: lang === "en" ? "Chemical" : "Kimia",
                uses: t.matterInNature.chemicalProperties.map((p) => ({ icon: p.icon, label: p.label, sub: p.detail })),
              },
            ]}
          />
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{DENSITY_CLASS_HEAD[lang]}</h4>
              <DataTable
                headers={
                  lang === "en"
                    ? ["Substances", "Higher density", "Lower density"]
                    : ["Bahan", "Lebih tumpat", "Kurang tumpat"]
                }
                rows={t.matterInNature.densityClassification.map((d) => [d.substance, d.higherDensity, d.lowerDensity])}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{MELT_BOIL_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Substance", "Melting Point", "Boiling Point"] : ["Bahan", "Takat Lebur", "Takat Didih"]}
                rows={t.matterInNature.meltingBoilingPoints.map((m) => [m.substance, m.meltingPoint, m.boilingPoint])}
              />
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{SOLUBILITY_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.matterInNature.solubilityDefinition}</p>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.statesOfMatter.kineticTheory}</p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{PARTICLES_HEAD[lang]}</h4>
              <ParticleAnimation stateProperties={t.statesOfMatter.stateProperties} />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{STATE_PROPS_HEAD[lang]}</h4>
              <DataTable headers={stateTableHeaders} rows={stateTableRows} />
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.statesOfMatter.diffusionDefinition}</p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{DIFFUSION_RESULTS_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["State", "Observation", "Rate"] : ["Keadaan", "Pemerhatian", "Kadar"]}
                rows={t.statesOfMatter.diffusionResults.map((d) => [d.state, d.observation, d.rate])}
              />
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{CHANGE_FLOW_HEAD[lang]}</h4>
              <ChangeOfStateFlow
                stateLabels={[
                  t.statesOfMatter.stateProperties[0].state,
                  t.statesOfMatter.stateProperties[1].state,
                  t.statesOfMatter.stateProperties[2].state,
                ]}
                transitions={t.statesOfMatter.changesOfState}
              />
            </div>
            <FactGrid heading={CONSTANT_FACTS_HEAD[lang]} facts={t.statesOfMatter.constantFacts} />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <IconCardGrid
              items={t.statesOfMatter.everydayExamples.map((e) => ({
                icon: e.icon,
                label: e.label,
                detail: e.process,
              }))}
            />
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
                      ? "📘 Mark Chapter 5 as Read"
                      : "📘 Tandakan Bab 5 Selesai"}
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

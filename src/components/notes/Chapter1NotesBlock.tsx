import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Microscope } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DataTable } from "./blocks/DataTable";
import { SafetyChecklist } from "./blocks/SafetyChecklist";
import { EffectsGrid, type EffectsGridTint } from "./blocks/EffectsGrid";
import { ProcessSteps } from "./blocks/ProcessSteps";
import { PreventionColumns } from "./blocks/PreventionColumns";
import { AccuracyTargets } from "./blocks/AccuracyTargets";
import { VernierDiagram } from "./blocks/VernierDiagram";
import { HazardDiamonds } from "./blocks/HazardDiamonds";
import { DensityColumn } from "./blocks/DensityColumn";
import { ApparatusGallery } from "./blocks/ApparatusGallery";
import { Chapter1LearningExperienceList } from "./blocks/Chapter1LearningExperienceCard";
import { ProcessSkillGrid } from "./blocks/ProcessSkillGrid";
import { Chapter1InteractiveCheck } from "./blocks/Chapter1InteractiveChecks";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: ["Science in life", "Careers", "Lab apparatus", "Warning symbols", "Lab safety", "Quantities & units", "Measuring instruments", "Errors & estimation", "Density", "Scientific process", "Attitudes & values"],
  bm: ["Sains dalam kehidupan", "Kerjaya", "Radas makmal", "Simbol amaran", "Keselamatan makmal", "Kuantiti & unit", "Alat pengukur", "Ralat & anggaran", "Ketumpatan", "Proses saintifik", "Sikap & nilai"],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "1.1", title: "Science in Daily Life", sub: "Build the meaning of science from daily activities and natural phenomena." },
    { eyebrow: "1.1 continued", title: "Fields, Subjects, Careers and Innovation" },
    { eyebrow: "1.2", title: "Laboratory Apparatus", sub: "Recognise each apparatus by its drawing, name and function." },
    { eyebrow: "1.2 continued", title: "Warning Symbols", sub: "Match each textbook pictogram to the correct hazardous-material category." },
    { eyebrow: "1.2 continued", title: "Laboratory Rules, Safety and Accidents" },
    { eyebrow: "1.3", title: "Physical Quantities and Units", sub: "Use S.I. units, prefixes and systematic unit conversions." },
    { eyebrow: "1.4", title: "Measuring Instruments" },
    { eyebrow: "1.4 continued", title: "Errors, Estimation and Innovation" },
    { eyebrow: "1.5", title: "Density" },
    { eyebrow: "1.6", title: "Science Process Skills and Investigation", sub: "Distinguish twelve process skills and use the complete nine-step sequence." },
    { eyebrow: "1.7", title: "Scientific Attitudes and Noble Values" },
  ],
  bm: [
    { eyebrow: "1.1", title: "Sains dalam Kehidupan Harian", sub: "Bina maksud sains daripada aktiviti harian dan fenomena alam semula jadi." },
    { eyebrow: "Sambungan 1.1", title: "Bidang, Subjek, Kerjaya dan Inovasi" },
    { eyebrow: "1.2", title: "Radas Makmal", sub: "Kenal pasti setiap radas melalui lukisan, nama dan fungsinya." },
    { eyebrow: "Sambungan 1.2", title: "Simbol Amaran", sub: "Padankan setiap piktogram buku teks dengan kategori bahan berbahaya yang betul." },
    { eyebrow: "Sambungan 1.2", title: "Peraturan, Keselamatan dan Kemalangan Makmal" },
    { eyebrow: "1.3", title: "Kuantiti Fizik dan Unitnya", sub: "Gunakan unit S.I., imbuhan dan pertukaran unit secara sistematik." },
    { eyebrow: "1.4", title: "Penggunaan Alat Pengukur" },
    { eyebrow: "Sambungan 1.4", title: "Ralat, Anggaran dan Inovasi" },
    { eyebrow: "1.5", title: "Ketumpatan" },
    { eyebrow: "1.6", title: "Kemahiran Proses dan Penyiasatan Saintifik", sub: "Bezakan dua belas kemahiran proses dan gunakan urutan sembilan langkah yang lengkap." },
    { eyebrow: "1.7", title: "Sikap Saintifik dan Nilai Murni" },
  ],
};

const ERROR_TYPE_STYLE: Record<number, { icon: string; tint: EffectsGridTint }> = {
  0: { icon: "0", tint: "amber" },
  1: { icon: "±", tint: "blue" },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: string }) {
  return <h3 className="font-display mb-3 text-sm font-bold text-foreground">{children}</h3>;
}

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
  }, [stateKey, total]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[lang][current];
  const isLast = current === total - 1;
  const go = (direction: number) => setCurrent((value) => Math.max(0, Math.min(total - 1, value + direction)));

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <Microscope className="mt-0.5 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{t.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hook.body}</p>
        </div>
      </div>

      <div className="science-research-orbit mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-2" aria-label={lang === "en" ? "Chapter sections" : "Bahagian bab"}>
        {ORBIT_LABELS[lang].map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setCurrent(index)}
            aria-current={index === current ? "step" : undefined}
            className="flex min-h-11 shrink-0 flex-col items-center gap-1.5 px-1 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${index < current ? "border-transparent bg-gradient-to-br from-primary to-accent text-white" : index === current ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]" : "border-border text-muted-foreground"}`}>
              {index < current ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : index + 1}
            </span>
            <span className={`max-w-[76px] text-center text-[10px] leading-tight ${index === current ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
          </button>
        ))}
      </div>

      <div className="science-research-module-shell relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="science-research-title font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        <ResearchModuleMeta index={current} total={total} title={chrome.title} lang={lang} />
        {chrome.sub ? <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p> : <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
              <SectionHeading>{lang === "en" ? "Definition of science" : "Maksud sains"}</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground">{t.scienceInLife.definition}</p>
            </div>
            <div>
              <SectionHeading>{lang === "en" ? "Science in daily activities" : "Sains dalam aktiviti harian"}</SectionHeading>
              <BulletList items={t.scienceInLife.dailyConnections} />
            </div>
            <div>
              <SectionHeading>{lang === "en" ? "Why science matters" : "Kepentingan sains"}</SectionHeading>
              <BulletList items={t.scienceInLife.importance} />
            </div>
            <IconCardGrid items={t.scienceInLife.fields.map((field) => ({ icon: field.icon, label: field.name, detail: [field.description, ...field.examples] }))} />
            <Chapter1InteractiveCheck kind="daily-life" content={t} lang={lang} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {t.scienceInLife.careers.map((career) => (
                <article key={career.field} className="rounded-2xl border border-border bg-secondary/40 p-4">
                  <p className="font-display text-sm font-bold text-foreground">{career.field}</p>
                  <p className="mt-1 text-xs text-primary">{lang === "en" ? "Related subject" : "Subjek berkaitan"}: {career.subject}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{career.jobs.join(" · ")}</p>
                </article>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <SectionHeading>{lang === "en" ? "Technology innovation" : "Inovasi teknologi"}</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.scienceInLife.innovation.definition}</p>
              <div className="mt-3"><BulletList items={t.scienceInLife.innovation.examples} /></div>
            </div>
            <Chapter1InteractiveCheck kind="careers" content={t} lang={lang} />
            <Chapter1InteractiveCheck kind="innovation" content={t} lang={lang} />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <ApparatusGallery items={t.laboratory.apparatus} />
            <Chapter1InteractiveCheck kind="apparatus" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.laboratory.filter((experience) => experience.id === "apparatus-draw-classify")} lang={lang} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <HazardDiamonds items={t.laboratory.hazardSymbols} lang={lang} />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <SafetyChecklist heading={lang === "en" ? "Laboratory rules" : "Peraturan makmal"} items={t.laboratory.rules} />
            <SafetyChecklist heading={lang === "en" ? "Safety measures" : "Langkah keselamatan"} items={t.laboratory.safetyMeasures} />
            <SafetyChecklist heading={lang === "en" ? "If an accident occurs" : "Jika berlaku kemalangan"} items={t.laboratory.accidentSteps} />
            <Chapter1InteractiveCheck kind="lab-safety" content={t} lang={lang} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm leading-relaxed text-foreground">{t.quantitiesAndUnits.physicalQuantityDefinition}</div>
            <DataTable headers={lang === "en" ? ["Quantity", "S.I. unit", "Symbol"] : ["Kuantiti", "Unit S.I.", "Simbol"]} rows={t.quantitiesAndUnits.baseQuantities.map((quantity) => [quantity.quantity, quantity.unit, quantity.symbol])} />
            <DataTable headers={lang === "en" ? ["Prefix", "Value", "Standard form", "Symbol"] : ["Imbuhan", "Nilai", "Bentuk piawai", "Simbol"]} rows={t.quantitiesAndUnits.prefixes.map((prefix) => [prefix.prefix, prefix.value, prefix.standardForm, prefix.symbol])} />
            <div>
              <SectionHeading>{lang === "en" ? "Worked unit conversions" : "Pertukaran unit berlangkah"}</SectionHeading>
              <DataTable headers={lang === "en" ? ["Convert", "Operation", "Answer"] : ["Tukar", "Operasi", "Jawapan"]} rows={t.quantitiesAndUnits.conversions.map((conversion) => [conversion.question, conversion.working, conversion.answer])} />
            </div>
            <div>
              <SectionHeading>{lang === "en" ? "Why S.I. units matter" : "Kepentingan unit S.I."}</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.quantitiesAndUnits.siImportance}</p>
            </div>
            <Chapter1InteractiveCheck kind="unit-conversion" content={t} lang={lang} />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <AccuracyTargets
              lang={lang}
              accuracyTerm={t.measuringInstruments.definitions[0].term}
              consistencyTerm={t.measuringInstruments.definitions[1].term}
              accuracyDefinition={t.measuringInstruments.definitions[0].body}
              consistencyDefinition={t.measuringInstruments.definitions[1].body}
            />
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <p className="font-display text-[13px] font-bold text-foreground">{t.measuringInstruments.definitions[2].term}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.measuringInstruments.definitions[2].body}</p>
            </div>
            <VernierDiagram lang={lang} />
            <Chapter1InteractiveCheck kind="measurement-concepts" content={t} lang={lang} />
            <Chapter1InteractiveCheck kind="vernier" content={t} lang={lang} />
            <DataTable
              headers={lang === "en" ? ["Quantity", "Standard tool", "Higher-accuracy tool", "Note"] : ["Kuantiti", "Alat piawai", "Alat pengukur yang lebih jitu", "Nota"]}
              rows={t.measuringInstruments.instruments.map((instrument) => [instrument.quantity, instrument.standardTool, instrument.higherAccuracyTool ?? "—", instrument.note])}
            />
            <Chapter1InteractiveCheck kind="measuring-tool" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.measurement.slice(0, 1)} lang={lang} />
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <EffectsGrid cards={t.measuringInstruments.errorTypes.map((error, index) => ({ icon: ERROR_TYPE_STYLE[index]?.icon ?? "±", tint: ERROR_TYPE_STYLE[index]?.tint ?? "amber", heading: error.type, items: [error.definition, ...error.examples], secondaryLabel: lang === "en" ? "Ways to overcome" : "Cara mengatasi", secondaryItems: error.waysToOvercome }))} />
            <div>
              <SectionHeading>{lang === "en" ? "Estimation methods" : "Kaedah anggaran"}</SectionHeading>
              <DataTable headers={lang === "en" ? ["Quantity", "Method"] : ["Kuantiti", "Kaedah"]} rows={t.measuringInstruments.estimationMethods.map((method) => [method.quantity, method.method])} />
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <SectionHeading>{lang === "en" ? "Example of measurement innovation" : "Contoh inovasi alat pengukuran"}</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.measuringInstruments.innovation}</p>
            </div>
            <Chapter1InteractiveCheck kind="measurement-errors" content={t} lang={lang} />
            <Chapter1InteractiveCheck kind="measurement-innovation" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.measurement.slice(1)} lang={lang} />
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><SectionHeading>{lang === "en" ? "Definition" : "Maksud"}</SectionHeading><p className="text-sm leading-relaxed text-foreground">{t.density.definition}</p></div>
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><SectionHeading>{lang === "en" ? "Operational definition in the cube activity" : "Definisi secara operasi dalam aktiviti kubus"}</SectionHeading><p className="text-sm leading-relaxed text-foreground">{t.density.operationalDefinition}</p></div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><SectionHeading>{lang === "en" ? "Formula" : "Rumus"}</SectionHeading><p className="font-mono text-sm font-semibold tabular-nums text-foreground">{t.density.formula}</p></div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <SectionHeading>{lang === "en" ? "Worked example" : "Contoh berlangkah"}</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.density.workedExample.problem}</p>
              <ol className="mt-3 space-y-1 font-mono text-xs tabular-nums text-foreground">{t.density.workedExample.working.map((line) => <li key={line}>{line}</li>)}</ol>
              <p className="mt-2 font-mono text-sm font-bold tabular-nums text-primary">{t.density.workedExample.answer}</p>
            </div>
            <DensityColumn table={t.density.table} lang={lang} />
            <div><SectionHeading>{lang === "en" ? "Density data" : "Data ketumpatan"}</SectionHeading><DataTable headers={lang === "en" ? ["Material", "Density (g cm⁻³)"] : ["Bahan", "Ketumpatan (g cm⁻³)"]} rows={t.density.table.map((row) => [row.material, row.density])} /></div>
            <div><SectionHeading>{lang === "en" ? "Water displacement method" : "Kaedah sesaran air"}</SectionHeading><ProcessSteps steps={t.density.waterDisplacement.map((body, index) => ({ step: index + 1, heading: `${index + 1}`, body }))} /></div>
            <div><SectionHeading>{lang === "en" ? "Daily phenomena" : "Fenomena harian"}</SectionHeading><BulletList items={t.density.everydayExamples} /></div>
            <Chapter1InteractiveCheck kind="density" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.density} lang={lang} />
          </div>
        )}

        {current === 9 && (
          <div className="space-y-6">
            <div><SectionHeading>{lang === "en" ? "Twelve science process skills" : "Dua belas kemahiran proses sains"}</SectionHeading><ProcessSkillGrid skills={t.investigationSteps.processSkills} /></div>
            <div><SectionHeading>{lang === "en" ? "Nine investigation steps" : "Sembilan langkah penyiasatan"}</SectionHeading><ProcessSteps steps={t.investigationSteps.steps} /></div>
            <Chapter1InteractiveCheck kind="process-skills" content={t} lang={lang} />
            <Chapter1InteractiveCheck kind="investigation-order" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.investigation} lang={lang} />
          </div>
        )}

        {current === 10 && (
          <div className="space-y-6">
            <PreventionColumns categories={[{ heading: lang === "en" ? "Core attitudes" : "Sikap teras", items: t.attitudesAndValues.core }, { heading: lang === "en" ? "Additional values" : "Nilai tambahan", items: t.attitudesAndValues.additional }]} />
            <div><SectionHeading>{lang === "en" ? "Why they matter" : "Mengapa penting"}</SectionHeading><p className="text-sm leading-relaxed text-muted-foreground">{t.attitudesAndValues.purpose}</p></div>
            <Chapter1InteractiveCheck kind="values" content={t} lang={lang} />
            <Chapter1LearningExperienceList experiences={t.learningExperiences.values} lang={lang} />
            {onMarkRead && (
              <div className="flex justify-center pt-2">
                <button type="button" onClick={onMarkRead} disabled={isRead} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-700 dark:text-emerald-200" : "bg-gradient-to-r from-primary to-accent text-white"}`}>
                  {isRead ? (lang === "en" ? "Marked as read" : "Selesai ditanda") : lang === "en" ? "Mark Chapter 1 as read" : "Tandakan Bab 1 selesai"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button type="button" onClick={() => go(-1)} disabled={current === 0} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {lang === "en" ? "Back" : "Kembali"}
          </button>
          {!isLast && (
            <button type="button" onClick={() => go(1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white">
              {lang === "en" ? "Next section" : "Bahagian seterusnya"} <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

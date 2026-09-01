import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChipRow } from "@/components/notes/blocks/ChipRow";
import { FlipCardGrid } from "@/components/notes/blocks/FlipCard";
import { SelfReflectionChecklist } from "@/components/notes/blocks/SelfReflectionChecklist";
import { MatchingPairs } from "@/components/notes/blocks/MatchingPairs";
import { Journey } from "@/components/notes/blocks/Journey";
import { FoodWebDiagram } from "@/components/notes/blocks/FoodWebDiagram";
import { PyramidDiagram } from "@/components/notes/blocks/PyramidDiagram";
import { DigestiveSystemDiagram } from "@/components/notes/blocks/DigestiveSystemDiagram";
import { ViskingExperimentDiagram } from "@/components/notes/blocks/ViskingExperimentDiagram";
import { VillusDiagram } from "@/components/notes/blocks/VillusDiagram";
import { PhScaleSlider } from "@/components/notes/blocks/PhScaleSlider";
import { OhmsLawCalculator } from "@/components/notes/blocks/OhmsLawCalculator";
import { ResistanceComparator } from "@/components/notes/blocks/ResistanceComparator";
import { TwoFieldCalculator } from "@/components/notes/blocks/TwoFieldCalculator";
import { BuoyancySimulator } from "@/components/notes/blocks/BuoyancySimulator";
import { WaveVisualizer } from "@/components/notes/blocks/WaveVisualizer";
import { GalaxyCardGrid } from "@/components/notes/blocks/GalaxyCardGrid";
import { PlanetSphereList } from "@/components/notes/blocks/PlanetSphereList";
import { AuLightYearCalculator } from "@/components/notes/blocks/AuLightYearCalculator";
import type { MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import type { ScienceF2InteractiveContent } from "@/content/form2/science/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";
import { useProgress } from "@/hooks/use-progress";
import { AnnotatedImage } from "@/components/notes/blocks/AnnotatedImage";
import { InteractiveFigureCard } from "@/components/notes/blocks/InteractiveFigureCard";
import { EcologicalTermsDiagram } from "@/components/notes/blocks/EcologicalTermsDiagram";
import { EnzymeExplorer } from "@/components/notes/blocks/EnzymeExplorer";
import { ImmuneResponseGraph } from "@/components/notes/blocks/ImmuneResponseGraph";
import { DefenceLinesDiagram } from "@/components/notes/blocks/DefenceLinesDiagram";
import { ImmunityMatrix } from "@/components/notes/blocks/ImmunityMatrix";
import { MiniExperiment } from "@/components/notes/blocks/MiniExperiment";
import { ComparisonMatrix } from "@/components/notes/blocks/ComparisonMatrix";
import { MethodCards } from "@/components/notes/blocks/MethodCards";
import { ConceptContrast } from "@/components/notes/blocks/ConceptContrast";
import { CapillaryDiagram } from "@/components/notes/blocks/CapillaryDiagram";
import { ElectrolysisDiagram } from "@/components/notes/blocks/ElectrolysisDiagram";
import { MixtureComparison } from "@/components/notes/blocks/MixtureComparison";
import { WaterTreatmentFlow } from "@/components/notes/blocks/WaterTreatmentFlow";
import { IndicatorTable } from "@/components/notes/blocks/IndicatorTable";
import { DryVsAqueous } from "@/components/notes/blocks/DryVsAqueous";
import { TitrationSchematic } from "@/components/notes/blocks/TitrationSchematic";
import { StrengthComparison } from "@/components/notes/blocks/StrengthComparison";
import { CircuitMeterDiagram } from "@/components/notes/blocks/CircuitMeterDiagram";
import { SeriesParallelSchematic } from "@/components/notes/blocks/SeriesParallelSchematic";
import { MagnetFieldDiagram } from "@/components/notes/blocks/MagnetFieldDiagram";
import { ForceDiagram } from "@/components/notes/blocks/ForceDiagram";
import { BuoyancySchematic } from "@/components/notes/blocks/BuoyancySchematic";
import { LeverClasses } from "@/components/notes/blocks/LeverClasses";
import { MomentDiagram } from "@/components/notes/blocks/MomentDiagram";
import { GasParticles } from "@/components/notes/blocks/GasParticles";
import { DepthPressure } from "@/components/notes/blocks/DepthPressure";
import { PressureApparatus } from "@/components/notes/blocks/PressureApparatus";
import { AltitudePressure } from "@/components/notes/blocks/AltitudePressure";
import { ConductionDiagram } from "@/components/notes/blocks/ConductionDiagram";
import { ConvectionRadiation } from "@/components/notes/blocks/ConvectionRadiation";
import { BreezeDiagram } from "@/components/notes/blocks/BreezeDiagram";
import { ExpansionParticles } from "@/components/notes/blocks/ExpansionParticles";
import { BimetallicStrip } from "@/components/notes/blocks/BimetallicStrip";
import { SurfaceComparison } from "@/components/notes/blocks/SurfaceComparison";
import { SoundMediaDiagram } from "@/components/notes/blocks/SoundMediaDiagram";
import { EchoDiagram } from "@/components/notes/blocks/EchoDiagram";
import { DopplerWavefronts } from "@/components/notes/blocks/DopplerWavefronts";
import { EcholocationDiagram } from "@/components/notes/blocks/EcholocationDiagram";
import { HearingRangeChart } from "@/components/notes/blocks/HearingRangeChart";
import { StellarLifecycle } from "@/components/notes/blocks/StellarLifecycle";
import { CosmicScale } from "@/components/notes/blocks/CosmicScale";
import { MilkyWayLocator } from "@/components/notes/blocks/MilkyWayLocator";
import { StarSizeCompare } from "@/components/notes/blocks/StarSizeCompare";
import { CurrentFieldPatterns } from "@/components/notes/blocks/CurrentFieldPatterns";
import { ApparatusDiagram } from "@/components/notes/blocks/ApparatusDiagram";
import { ScienceSectionedNotesShell, type ScienceNotesSection } from "./ScienceSectionedNotesShell";
import {
  Chapter8ContextFigure,
  CHAPTER8_HOTSPOT_GEOMETRY,
  CHAPTER8_SECTION_FIGURES,
} from "./chapter8/Chapter8ContextFigure";

type Lang = "en" | "bm";

function MiniQuiz({
  item,
  lang,
  onCorrect,
}: {
  item: MiniQuizItem;
  lang: Lang;
  onCorrect: () => void;
}) {
  const [answer, setAnswer] = useState<number | boolean | null>(null);
  const correct =
    answer !== null &&
    (item.type === "true-false" ? answer === item.answer : answer === item.answerIndex);

  function respond(value: number | boolean) {
    if (answer !== null) return;
    setAnswer(value);
    const isCorrect =
      item.type === "true-false" ? value === item.answer : value === item.answerIndex;
    if (isCorrect) onCorrect();
  }

  const options =
    item.type === "true-false"
      ? [lang === "bm" ? "Betul" : "True", lang === "bm" ? "Salah" : "False"]
      : item.options;

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold leading-relaxed text-foreground">{item.question}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => {
          const value = item.type === "true-false" ? index === 0 : index;
          const chosen = answer === value;
          return (
            <button
              key={String(option)}
              type="button"
              disabled={answer !== null}
              onClick={() => respond(value)}
              className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                chosen
                  ? correct
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                    : "border-red-400 bg-red-500/15 text-red-200"
                  : "border-border bg-secondary/40 text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground" aria-live="polite">
          {item.explanation}
        </p>
      )}
    </div>
  );
}

const IMAGE_COPY = {
  bm: {
    enlarge: "Besarkan",
    close: "Tutup",
    hint: "Ketik mana-mana label pada rajah untuk melihat penerangannya.",
  },
  en: {
    enlarge: "Enlarge",
    close: "Close",
    hint: "Tap any label on the diagram to see what it does.",
  },
} as const;

export function ScienceF2InteractiveNotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: ScienceF2InteractiveContent;
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const { addXp } = useProgress();
  const rewarded = useRef(new Set<string>());
  const imageUrl = getNotesImageUrl(content.blogHighlight.imagePath);
  const imageCopy = IMAGE_COPY[lang === "bm" ? "bm" : "en"];
  const awardOnce = (key: string, amount: number) => {
    if (rewarded.current.has(key)) return;
    rewarded.current.add(key);
    addXp(amount, "science");
  };

  function renderSection(
    section: ScienceF2InteractiveContent["sections"][number],
    isLast: boolean,
    sectionIndex: number,
  ) {
    const isChapter8 = content.chapter === 8;
    const chapter8Figure = isChapter8 ? CHAPTER8_SECTION_FIGURES[sectionIndex] : undefined;
    const depictedIds = chapter8Figure
      ? new Set(CHAPTER8_HOTSPOT_GEOMETRY[chapter8Figure].map((point) => point.id))
      : new Set<string>();
    const unpicturedFlipCards = isChapter8
      ? (section.flipCards ?? []).filter((item) => !depictedIds.has(item.id))
      : [];
    return (
      <div className="flex min-w-0 flex-col gap-5">
        {chapter8Figure && (
          <Chapter8ContextFigure kind={chapter8Figure} section={section} lang={lang} />
        )}
        {unpicturedFlipCards.length > 0 && (
          <div className="border-l-2 border-primary/35 pl-4">
            <h3 className="py-2 text-[13px] font-semibold text-primary">
              {lang === "bm" ? "Konsep lain yang perlu diingati" : "Other concepts to remember"}
            </h3>
            <dl className="flex flex-col gap-3 pb-2">
              {unpicturedFlipCards.map((item) => (
                <div key={item.id}>
                  <dt className="text-[13px] font-bold text-foreground">{item.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{item.fact}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {section.cards && !isChapter8 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((card) => (
              <article
                key={card.title}
                className="min-w-0 rounded-2xl border border-border bg-card/55 p-4"
              >
                <h3 className="font-display text-sm font-bold text-foreground">{card.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
                {card.detail && (
                  <p className="mt-2 text-xs font-semibold text-primary">{card.detail}</p>
                )}
              </article>
            ))}
          </div>
        )}
        {section.flipCards && !isChapter8 && <FlipCardGrid items={section.flipCards} />}
        {section.galaxyCards && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.galaxyCards.title}
            </h3>
            <p className="mb-1 text-[13px] leading-relaxed text-muted-foreground">
              {section.galaxyCards.instruction}
            </p>
            <GalaxyCardGrid cards={section.galaxyCards.cards} />
          </div>
        )}
        {section.planets && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.planets.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {section.planets.instruction}
            </p>
            <PlanetSphereList planets={section.planets.planets} />
          </div>
        )}
        {section.accordions && (
          <Accordion type="single" collapsible>
            {section.accordions.map((item, i) => (
              <AccordionItem key={item.title} value={`${section.number}-${i}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                  {item.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {section.tabs && (
          <Tabs defaultValue="tab-0">
            <TabsList className="h-auto max-w-full flex-wrap justify-start">
              {section.tabs.map((tab, i) => (
                <TabsTrigger key={tab.title} value={`tab-${i}`}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {section.tabs.map((tab, i) => (
              <TabsContent
                key={tab.title}
                value={`tab-${i}`}
                className="text-[13.5px] leading-relaxed text-muted-foreground"
              >
                {tab.body}
              </TabsContent>
            ))}
          </Tabs>
        )}
        {section.phSlider && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.phSlider.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {section.phSlider.instruction}
            </p>
            <PhScaleSlider
              scale={section.phSlider.scale}
              gradient={section.phSlider.gradient}
              unitLabel={section.phSlider.unitLabel}
              initialValue={section.phSlider.initialValue}
              ariaLabel={section.phSlider.ariaLabel}
              tickLabels={section.phSlider.tickLabels}
            />
          </div>
        )}
        {!isChapter8 && section.calculators?.map((calc, i) => (
          <div key={`${section.number}-calc-${i}`}>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">{calc.title}</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{calc.instruction}</p>
            {calc.type === "ohms-law" ? (
              <OhmsLawCalculator lang={lang} />
            ) : calc.type === "resistance-comparator" ? (
              <ResistanceComparator
                lang={lang}
                defaultR1={calc.defaultR1}
                defaultR2={calc.defaultR2}
              />
            ) : calc.type === "au-light-year" ? (
              <AuLightYearCalculator defaultKm={calc.defaultKm} />
            ) : (
              <TwoFieldCalculator
                fieldA={calc.fieldA}
                fieldB={calc.fieldB}
                operation={calc.operation}
                resultLabel={calc.resultLabel}
                resultUnit={calc.resultUnit}
                lang={lang}
              />
            )}
          </div>
        ))}
        {section.buoyancy && !isChapter8 && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.buoyancy.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {section.buoyancy.instruction}
            </p>
            <BuoyancySimulator materials={section.buoyancy.materials} lang={lang} />
          </div>
        )}
        {section.waveVisualizer && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.waveVisualizer.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {section.waveVisualizer.instruction}
            </p>
            <WaveVisualizer lang={lang} />
          </div>
        )}
        {section.foodWeb && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.foodWeb.title}
            </h3>
            <FoodWebDiagram block={section.foodWeb} />
          </div>
        )}
        {section.pyramid && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.pyramid.title}
            </h3>
            <PyramidDiagram block={section.pyramid} />
          </div>
        )}
        {section.digestiveSystem && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.digestiveSystem.title}
            </h3>
            <DigestiveSystemDiagram
              block={section.digestiveSystem}
              lang={lang}
              enlargeLabel={imageCopy.enlarge}
              closeLabel={imageCopy.close}
              hintLabel={imageCopy.hint}
            />
          </div>
        )}
        {section.viskingExperiment && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.viskingExperiment.title}
            </h3>
            <ViskingExperimentDiagram
              block={section.viskingExperiment}
              lang={lang}
              enlargeLabel={imageCopy.enlarge}
              closeLabel={imageCopy.close}
              hintLabel={imageCopy.hint}
            />
          </div>
        )}
        {section.villusDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.villusDiagram.title}
            </h3>
            <VillusDiagram
              block={section.villusDiagram}
              lang={lang}
              enlargeLabel={imageCopy.enlarge}
              closeLabel={imageCopy.close}
              hintLabel={imageCopy.hint}
            />
          </div>
        )}
        {section.ecologicalTerms && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.ecologicalTerms.title}
            </h3>
            <EcologicalTermsDiagram block={section.ecologicalTerms} />
          </div>
        )}
        {section.defenceLines && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.defenceLines.title}
            </h3>
            <DefenceLinesDiagram block={section.defenceLines} lang={lang} />
          </div>
        )}
        {section.immunityMatrix && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.immunityMatrix.title}
            </h3>
            <ImmunityMatrix block={section.immunityMatrix} />
          </div>
        )}
        {section.immuneResponseGraph && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.immuneResponseGraph.title}
            </h3>
            <ImmuneResponseGraph block={section.immuneResponseGraph} />
          </div>
        )}
        {section.enzymeExplorer && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.enzymeExplorer.title}
            </h3>
            <EnzymeExplorer block={section.enzymeExplorer} />
          </div>
        )}
        {section.conceptContrast && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.conceptContrast.title}
            </h3>
            <ConceptContrast block={section.conceptContrast} />
          </div>
        )}
        {section.capillaryDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.capillaryDiagram.title}
            </h3>
            <CapillaryDiagram block={section.capillaryDiagram} lang={lang} />
          </div>
        )}
        {section.electrolysisDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.electrolysisDiagram.title}
            </h3>
            <ElectrolysisDiagram block={section.electrolysisDiagram} lang={lang} />
          </div>
        )}
        {section.mixtureComparison && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.mixtureComparison.title}
            </h3>
            <MixtureComparison block={section.mixtureComparison} lang={lang} />
          </div>
        )}
        {section.forceDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.forceDiagram.title}
            </h3>
            <ForceDiagram block={section.forceDiagram} lang={lang} />
          </div>
        )}
        {section.buoyancySchematic && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.buoyancySchematic.title}
            </h3>
            <BuoyancySchematic block={section.buoyancySchematic} lang={lang} />
          </div>
        )}
        {/* Chapter 8 teaches the lever classes on the contextual photograph, which
            marks F, L and E on real objects and states the same explanation. The
            abstract schematic would repeat it without adding precision, so it is
            dropped from rendering here rather than hidden behind a control. */}
        {section.leverClasses && !isChapter8 && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.leverClasses.title}
            </h3>
            <LeverClasses block={section.leverClasses} lang={lang} />
          </div>
        )}
        {section.momentDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.momentDiagram.title}
            </h3>
            <MomentDiagram block={section.momentDiagram} lang={lang} />
          </div>
        )}
        {section.gasParticles && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.gasParticles.title}
            </h3>
            <GasParticles block={section.gasParticles} lang={lang} />
          </div>
        )}
        {section.depthPressure && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.depthPressure.title}
            </h3>
            <DepthPressure block={section.depthPressure} lang={lang} />
          </div>
        )}
        {section.pressureApparatus && !isChapter8 && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.pressureApparatus.title}
            </h3>
            <PressureApparatus block={section.pressureApparatus} lang={lang} />
          </div>
        )}
        {section.altitudePressure && !isChapter8 && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.altitudePressure.title}
            </h3>
            <AltitudePressure block={section.altitudePressure} lang={lang} />
          </div>
        )}
        {section.conductionDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.conductionDiagram.title}
            </h3>
            <ConductionDiagram block={section.conductionDiagram} lang={lang} />
          </div>
        )}
        {section.convectionRadiation && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.convectionRadiation.title}
            </h3>
            <ConvectionRadiation block={section.convectionRadiation} lang={lang} />
          </div>
        )}
        {section.breezeDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.breezeDiagram.title}
            </h3>
            <BreezeDiagram block={section.breezeDiagram} lang={lang} />
          </div>
        )}
        {section.expansionParticles && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.expansionParticles.title}
            </h3>
            <ExpansionParticles block={section.expansionParticles} lang={lang} />
          </div>
        )}
        {section.bimetallicStrip && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.bimetallicStrip.title}
            </h3>
            <BimetallicStrip block={section.bimetallicStrip} lang={lang} />
          </div>
        )}
        {section.surfaceComparison && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.surfaceComparison.title}
            </h3>
            <SurfaceComparison block={section.surfaceComparison} lang={lang} />
          </div>
        )}
        {section.soundMedia && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.soundMedia.title}
            </h3>
            <SoundMediaDiagram block={section.soundMedia} lang={lang} />
          </div>
        )}
        {section.echoDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.echoDiagram.title}
            </h3>
            <EchoDiagram block={section.echoDiagram} lang={lang} />
          </div>
        )}
        {section.dopplerWavefronts && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.dopplerWavefronts.title}
            </h3>
            <DopplerWavefronts block={section.dopplerWavefronts} lang={lang} />
          </div>
        )}
        {section.echolocation && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.echolocation.title}
            </h3>
            <EcholocationDiagram block={section.echolocation} lang={lang} />
          </div>
        )}
        {section.hearingRange && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.hearingRange.title}
            </h3>
            <HearingRangeChart block={section.hearingRange} lang={lang} />
          </div>
        )}
        {section.stellarLifecycle && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.stellarLifecycle.title}
            </h3>
            <StellarLifecycle block={section.stellarLifecycle} lang={lang} />
          </div>
        )}
        {section.cosmicScale && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.cosmicScale.title}
            </h3>
            <CosmicScale block={section.cosmicScale} lang={lang} />
          </div>
        )}
        {section.milkyWayLocator && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.milkyWayLocator.title}
            </h3>
            <MilkyWayLocator block={section.milkyWayLocator} lang={lang} />
          </div>
        )}
        {section.starSizeCompare && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.starSizeCompare.title}
            </h3>
            <StarSizeCompare block={section.starSizeCompare} lang={lang} />
          </div>
        )}
        {isChapter8 && section.buoyancy && (
          <div className="border-t border-border/70 pt-5">
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.buoyancy.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {section.buoyancy.instruction}
            </p>
            <BuoyancySimulator materials={section.buoyancy.materials} lang={lang} />
          </div>
        )}
        {isChapter8 && section.cards && (
          <div className="border-t border-border/70 pt-2">
            <div className="flex flex-col gap-4 pb-2">
              {section.cards.map((card) => (
                <article key={card.title} className="border-l-2 border-primary/30 pl-3">
                  <h3 className="text-[13px] font-bold text-foreground">{card.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{card.body}</p>
                  {card.detail && <p className="mt-1.5 text-[12px] font-semibold text-primary">{card.detail}</p>}
                </article>
              ))}
            </div>
          </div>
        )}
        {isChapter8 && section.calculators?.map((calc, i) => (
          <div key={`${section.number}-ch8-calc-${i}`} className="border-t border-border/70 pt-5">
            <p className="font-display mb-3 text-center text-[14px] font-bold text-primary">{calc.instruction.split(".")[0]}</p>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">{calc.title}</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{calc.instruction}</p>
            {calc.type === "two-field" && (
              <TwoFieldCalculator fieldA={calc.fieldA} fieldB={calc.fieldB} operation={calc.operation} resultLabel={calc.resultLabel} resultUnit={calc.resultUnit} lang={lang} />
            )}
          </div>
        ))}
        {section.miniExperiment && (isChapter8 ? (
          <Accordion type="single" collapsible className="border-t border-border/70 pt-2">
            <AccordionItem value="chapter-8-pressure-investigation">
              <AccordionTrigger className="min-h-12 text-left text-[14px] font-bold">
                {lang === "bm" ? "Cuba penyiasatan" : "Try the investigation"}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pt-2">
                {section.pressureApparatus && <PressureApparatus block={section.pressureApparatus} lang={lang} />}
                <MiniExperiment block={section.miniExperiment} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.miniExperiment.title}</h3>
            <MiniExperiment block={section.miniExperiment} />
          </div>
        ))}
        {section.comparisonMatrix && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.comparisonMatrix.title}
            </h3>
            <ComparisonMatrix block={section.comparisonMatrix} />
          </div>
        )}
        {section.waterTreatmentFlow && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.waterTreatmentFlow.title}
            </h3>
            <WaterTreatmentFlow block={section.waterTreatmentFlow} lang={lang} />
          </div>
        )}
        {section.methodCards && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.methodCards.title}
            </h3>
            <MethodCards block={section.methodCards} />
          </div>
        )}
        {section.indicatorTable && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.indicatorTable.title}
            </h3>
            <IndicatorTable block={section.indicatorTable} />
          </div>
        )}
        {section.dryVsAqueous && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.dryVsAqueous.title}
            </h3>
            <DryVsAqueous block={section.dryVsAqueous} lang={lang} />
          </div>
        )}
        {section.titrationSchematic && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.titrationSchematic.title}
            </h3>
            <TitrationSchematic block={section.titrationSchematic} lang={lang} />
          </div>
        )}
        {section.strengthComparison && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.strengthComparison.title}
            </h3>
            <StrengthComparison block={section.strengthComparison} />
          </div>
        )}
        {section.circuitMeterDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.circuitMeterDiagram.title}
            </h3>
            <CircuitMeterDiagram block={section.circuitMeterDiagram} lang={lang} />
          </div>
        )}
        {section.seriesParallel && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.seriesParallel.title}
            </h3>
            <SeriesParallelSchematic block={section.seriesParallel} lang={lang} />
          </div>
        )}
        {section.magnetFieldDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.magnetFieldDiagram.title}
            </h3>
            <MagnetFieldDiagram block={section.magnetFieldDiagram} lang={lang} />
          </div>
        )}
        {section.currentFieldPatterns && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.currentFieldPatterns.title}
            </h3>
            <CurrentFieldPatterns block={section.currentFieldPatterns} lang={lang} />
          </div>
        )}
        {section.apparatusDiagram && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.apparatusDiagram.title}
            </h3>
            <ApparatusDiagram block={section.apparatusDiagram} lang={lang} />
          </div>
        )}
        {section.images?.map((image) =>
          image.annotations.length > 0 ? (
            <InteractiveFigureCard
              key={image.src}
              lang={lang}
              concepts={image.annotations}
              image={{
                src: image.src,
                alt: image.alt,
                size: image.size,
                aspect: image.aspect,
                caption: image.caption,
                legendLabel: image.legendLabel,
                annotationMode: image.annotationMode ?? "labels",
                imageKey: image.imageKey,
              }}
            />
          ) : (
            <AnnotatedImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              size={image.size}
              aspect={image.aspect}
              caption={image.caption}
              legendLabel={image.legendLabel}
              annotationMode={image.annotationMode ?? "labels"}
              annotations={image.annotations}
              imageKey={image.imageKey}
              enlargeLabel={imageCopy.enlarge}
              closeLabel={imageCopy.close}
              hintLabel={imageCopy.hint}
            />
          ),
        )}
        {section.adaptations && (
          <div>
            <h3 className="font-display mb-1 text-base font-bold text-foreground">
              {section.adaptations.title}
            </h3>
            <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
              {section.adaptations.instruction}
            </p>
            <Tabs defaultValue={section.adaptations.cases[0]?.id}>
              <TabsList className="h-auto max-w-full flex-wrap justify-start">
                {section.adaptations.cases.map((item) => (
                  <TabsTrigger key={item.id} value={item.id}>
                    {item.habitat}
                  </TabsTrigger>
                ))}
              </TabsList>
              {section.adaptations.cases.map((item) => (
                <TabsContent key={item.id} value={item.id} className="flex flex-col gap-3">
                  {item.imagePath && (
                    <AnnotatedImage
                      src={item.imagePath}
                      alt={item.imageAlt ?? item.habitat}
                      size={item.imageSize ?? "compact"}
                      aspect={item.imageAspect ?? "16 / 9"}
                      legendLabel={item.habitat}
                      annotationMode={item.imageAnnotationMode ?? "callouts"}
                      annotations={item.imageAnnotations ?? []}
                      enlargeLabel={imageCopy.enlarge}
                      closeLabel={imageCopy.close}
                      hintLabel={imageCopy.hint}
                    />
                  )}
                  <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-amber-300">
                      {section.adaptations!.labels.challenge}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">
                      {item.challenge}
                    </p>
                  </div>
                  {item.organisms.map((organism) => (
                    <div
                      key={organism.name}
                      className="rounded-xl border border-border bg-card/55 p-3"
                    >
                      <p className="font-display text-[13px] font-bold text-foreground">
                        {organism.kind === "plant"
                          ? section.adaptations!.labels.plant
                          : section.adaptations!.labels.animal}{" "}
                        · {organism.name}
                      </p>
                      <dl className="mt-2 flex flex-col gap-1.5">
                        {(
                          [
                            [section.adaptations!.labels.adaptation, organism.adaptation],
                            [section.adaptations!.labels.role, organism.role],
                            [section.adaptations!.labels.benefit, organism.benefit],
                          ] as const
                        ).map(([label, value], i) => (
                          <div key={label} className="flex items-start gap-2">
                            <span className="mt-1 text-primary" aria-hidden="true">
                              {i === 0 ? "•" : "→"}
                            </span>
                            <div className="min-w-0">
                              <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                                {label}
                              </dt>
                              <dd className="text-[12.5px] leading-relaxed text-foreground">
                                {value}
                              </dd>
                            </div>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
        {section.causeEffect && (
          <div>
            <h3 className="font-display mb-1 text-base font-bold text-foreground">
              {section.causeEffect.title}
            </h3>
            {section.causeEffect.instruction && (
              <p className="mb-2.5 text-[12.5px] text-muted-foreground">
                {section.causeEffect.instruction}
              </p>
            )}
            <div className="flex flex-col gap-2.5">
              {section.causeEffect.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-secondary/30 p-3"
                >
                  <p className="font-display text-[12.5px] font-bold text-foreground">
                    {item.icon ? `${item.icon} ` : ""}
                    {item.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {item.chain.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        {i > 0 && (
                          <span className="text-primary" aria-hidden="true">
                            →
                          </span>
                        )}
                        <span className="text-[11.5px] leading-snug text-muted-foreground">
                          {step}
                        </span>
                      </span>
                    ))}
                  </div>
                  {item.note && (
                    <p className="mt-2 text-[11.5px] font-semibold text-emerald-300">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {section.matcher && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.matcher.title}
            </h3>
            <MatchingPairs
              pairs={section.matcher.pairs}
              instruction={section.matcher.instruction}
              resetLabel={lang === "bm" ? "Set semula" : "Reset"}
              onComplete={() => awardOnce(`match-${section.number}`, 10)}
            />
          </div>
        )}
        {section.sequence && (
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {section.sequence.title}
            </h3>
            {section.sequence.bannerImage && (
              <img
                src={getNotesImageUrl(section.sequence.bannerImage)}
                alt={section.sequence.title}
                className="mb-3 aspect-video w-full rounded-2xl object-cover"
                loading="lazy"
              />
            )}
            <Journey
              steps={section.sequence.steps}
              instruction={section.sequence.instruction}
              lang={lang}
            />
          </div>
        )}
        {section.comparison && (
          <div>
            <h3 className="font-display mb-3 text-base font-bold text-foreground">
              {section.comparison.title}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.comparison.columns.map((column) => (
                <article
                  key={column.title}
                  className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/5 p-4"
                >
                  <h4 className="font-display font-bold text-foreground">{column.title}</h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {column.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">
            {lang === "bm"
              ? `Semak diri — ${section.number}`
              : `Check yourself — ${section.number}`}
          </h3>
          <Accordion type="single" collapsible>
            {section.checks.map((item, i) => (
              <AccordionItem key={item.question} value={`check-${section.number}-${i}`}>
                <AccordionTrigger className="text-[13.5px]">
                  {i + 1}. {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground">
                  {item.hint}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {isLast && (
          <>
            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground">
                {lang === "bm" ? "Refleksi Kendiri" : "Self-Reflection"}
              </h2>
              <SelfReflectionChecklist
                items={content.reflectionItems}
                storageKey={
                  storageKey ? `${storageKey}:sci-f2-c${content.chapter}-reflection` : undefined
                }
                onAllComplete={() => awardOnce("reflection", 10)}
              />
            </div>
            <div>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground">
                {lang === "bm" ? "Kuiz Pantas" : "Quick Quiz"}
              </h2>
              <div className="flex flex-col gap-3">
                {content.miniQuiz.map((item, i) => (
                  <MiniQuiz
                    key={i}
                    item={item}
                    lang={lang}
                    onCorrect={() => awardOnce(`mini-quiz-${i}`, 15)}
                  />
                ))}
              </div>
            </div>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  disabled={isRead}
                  onClick={onMarkRead}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isRead ? "bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105 active:scale-[0.98]"}`}
                >
                  <CheckCircle2 className="h-4 w-4" />{" "}
                  {isRead
                    ? lang === "bm"
                      ? "Selesai ditanda"
                      : "Marked as read"
                    : lang === "bm"
                      ? `Tandakan Bab ${content.chapter} Selesai`
                      : `Mark Chapter ${content.chapter} as Read`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  const sections: ScienceNotesSection[] = content.sections.map((section, index) => ({
    // `number` is a Standard Pembelajaran reference, not a unique UX-section id — several
    // sections can legitimately share one SP number, so the React/nav key is index-based.
    key: `sec-${index}`,
    eyebrow: section.number,
    label: section.title,
    title: section.title,
    description: section.intro,
    content: renderSection(section, index === content.sections.length - 1, index),
  }));

  return (
    <ScienceSectionedNotesShell
      id={id}
      lang={lang}
      storageKey={storageKey}
      intro={
        <div className="mb-6 flex min-w-0 flex-col gap-5">
          <div className="grid gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4 sm:grid-cols-[140px_1fr] sm:items-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={content.blogHighlight.title}
                className="h-36 w-full rounded-xl object-cover sm:h-24"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold text-primary">
                {content.blogHighlight.title}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {content.blogHighlight.body}
              </p>
            </div>
          </div>
          <ChipRow items={content.keywords} />
        </div>
      }
      sections={sections}
    />
  );
}

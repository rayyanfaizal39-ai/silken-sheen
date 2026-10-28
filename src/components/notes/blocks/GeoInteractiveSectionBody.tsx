import type { ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlipCardGrid } from "@/components/notes/blocks/FlipCard";
import { TwoFieldCalculator } from "@/components/notes/blocks/TwoFieldCalculator";
import { Journey } from "@/components/notes/blocks/Journey";
import { GridReferenceReader } from "@/components/notes/blocks/GridReferenceReader";
import { MapScaleReader } from "@/components/notes/blocks/MapScaleReader";
import { ZoneExplorer } from "@/components/notes/blocks/ZoneExplorer";
import { GeoCalloutList } from "@/components/notes/blocks/GeoCallout";
import { GridAxisDiagram } from "@/components/notes/blocks/GridAxisDiagram";
import { MapSymbolLegend } from "@/components/notes/blocks/MapSymbolLegend";
import { WorkedMapDiagram } from "@/components/notes/blocks/WorkedMapDiagram";
import type { GeoInteractiveSection } from "@/content/form2/geography/interactive-types";

/**
 * Everything a `GeoInteractiveSection` can render, below its own title —
 * extracted so the legacy stacked-scroll renderer (`GeoF2InteractiveNotesBlock`,
 * used by every chapter) and a one-module-at-a-time shell (used only where a
 * chapter has explicitly opted in, e.g. Bab 2's prototype) share one
 * implementation instead of two copies of the same block-type switch.
 */
export function GeoInteractiveSectionBody({
  section,
  awardOnce,
  introNode,
}: {
  section: GeoInteractiveSection;
  awardOnce: (key: string, amount: number) => void;
  /** Override for section.intro's rendering (e.g. with inline keyword emphasis). Falls back to plain text. */
  introNode?: ReactNode;
}) {
  return (
    <>
      {introNode ?? (section.intro && <p className="text-[13.5px] leading-relaxed text-muted-foreground">{section.intro}</p>)}
      {section.gridAxisDiagram && <GridAxisDiagram />}
      {section.mapSymbolLegend && <MapSymbolLegend block={section.mapSymbolLegend} />}
      {section.workedMapDiagram && <WorkedMapDiagram />}
      {section.cards && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <article key={card.title} className="min-w-0 rounded-2xl border border-border bg-card/55 p-4">
              <h3 className="font-display text-sm font-bold text-foreground">{card.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{card.body}</p>
              {card.detail && <p className="mt-2 text-xs font-semibold text-primary">{card.detail}</p>}
            </article>
          ))}
        </div>
      )}
      {section.flipCards && <FlipCardGrid items={section.flipCards} />}
      {section.zoneExplorer && (
        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.zoneExplorer.title}</h3>
          <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">{section.zoneExplorer.instruction}</p>
          <ZoneExplorer block={section.zoneExplorer} />
        </div>
      )}
      {section.accordions && (
        <Accordion type="single" collapsible>
          {section.accordions.map((item, i) => (
            <AccordionItem key={item.title} value={`${section.number}-${i}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">{item.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {section.tabGroups?.map((group, gi) => (
        <div key={`${section.number}-tabgroup-${gi}`}>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{group.title}</h3>
          {group.instruction && <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">{group.instruction}</p>}
          <Tabs defaultValue="tab-0">
            <TabsList className="h-auto max-w-full flex-wrap justify-start">
              {group.tabs.map((tab, i) => <TabsTrigger key={tab.title} value={`tab-${i}`}>{tab.title}</TabsTrigger>)}
            </TabsList>
            {group.tabs.map((tab, i) => (
              <TabsContent key={tab.title} value={`tab-${i}`} className="text-[13.5px] leading-relaxed text-muted-foreground">
                {tab.body}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ))}
      {section.sequence && (
        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.sequence.title}</h3>
          <Journey steps={section.sequence.steps} instruction={section.sequence.instruction} />
        </div>
      )}
      {section.calculators?.map((calc, i) => (
        <div key={`${section.number}-calc-${i}`}>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{calc.title}</h3>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{calc.instruction}</p>
          <TwoFieldCalculator
            fieldA={calc.fieldA}
            fieldB={calc.fieldB}
            operation={calc.operation}
            resultLabel={calc.resultLabel}
            resultUnit={calc.resultUnit}
          />
        </div>
      ))}
      {section.gridReference && (
        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.gridReference.title}</h3>
          <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">{section.gridReference.instruction}</p>
          <GridReferenceReader block={section.gridReference} onComplete={() => awardOnce(`grid-${section.number}`, 20)} />
        </div>
      )}
      {section.mapScale && (
        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.mapScale.title}</h3>
          <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">{section.mapScale.instruction}</p>
          <MapScaleReader block={section.mapScale} onComplete={() => awardOnce(`mapscale-${section.number}`, 20)} />
        </div>
      )}
      {section.callouts && <GeoCalloutList items={section.callouts} />}
      <div>
        <h3 className="font-display mb-2 text-base font-bold text-foreground">Semak diri — {section.number}</h3>
        <Accordion type="single" collapsible>
          {section.checks.map((item, i) => (
            <AccordionItem key={item.question} value={`check-${section.number}-${i}`}>
              <AccordionTrigger className="text-[13.5px]">{i + 1}. {item.question}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">{item.hint}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {section.recap && (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">✅ Ringkasan</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/90">{section.recap}</p>
        </div>
      )}
    </>
  );
}

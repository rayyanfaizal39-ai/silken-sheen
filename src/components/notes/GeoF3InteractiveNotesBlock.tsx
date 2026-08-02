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
import { TwoFieldCalculator } from "@/components/notes/blocks/TwoFieldCalculator";
import { PieChartCalculator } from "@/components/notes/blocks/PieChartCalculator";
import { Journey } from "@/components/notes/blocks/Journey";
import { ZoneExplorer } from "@/components/notes/blocks/ZoneExplorer";
import { MatchingPairs } from "@/components/notes/blocks/MatchingPairs";
import { TogglePanels } from "@/components/notes/blocks/TogglePanels";
import { GroupedAccordionToggle } from "@/components/notes/blocks/GroupedAccordionToggle";
import type {
  GeoF3InteractiveContent,
  GeoMiniQuizItem,
} from "@/content/form3/geography/interactive-types";
import { useProgress } from "@/hooks/use-progress";

function MiniQuiz({ item }: { item: GeoMiniQuizItem }) {
  const [answer, setAnswer] = useState<number | boolean | null>(null);
  const { addXp } = useProgress();
  const correct =
    answer !== null &&
    (item.type === "true-false" ? answer === item.answer : answer === item.answerIndex);

  function respond(value: number | boolean) {
    if (answer !== null) return;
    setAnswer(value);
    const isCorrect =
      item.type === "true-false" ? value === item.answer : value === item.answerIndex;
    if (isCorrect) addXp(15, "geography");
  }

  const options = item.type === "true-false" ? ["Betul", "Salah"] : item.options;

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

export function GeoF3InteractiveNotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: GeoF3InteractiveContent;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const { addXp } = useProgress();
  const rewarded = useRef(new Set<string>());
  const awardOnce = (key: string, amount: number) => {
    if (rewarded.current.has(key)) return;
    rewarded.current.add(key);
    addXp(amount, "geography");
  };

  return (
    <section id={id} className="mt-8 flex min-w-0 flex-col gap-9 animate-fade-up">
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4">
        <h2 className="font-display text-base font-bold text-primary">
          {content.blogHighlight.title}
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {content.blogHighlight.body}
        </p>
      </div>
      <ChipRow items={content.keywords} />

      {content.sections.map((section) => (
        <div key={section.number} className="flex min-w-0 flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-lg border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              {section.number}
            </span>
            <h2 className="font-display text-xl font-bold leading-tight text-foreground">
              {section.title}
            </h2>
          </div>
          {section.intro && (
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{section.intro}</p>
          )}
          {section.cards && (
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
          {section.flipCards && <FlipCardGrid items={section.flipCards} />}
          {section.zoneExplorer && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {section.zoneExplorer.title}
              </h3>
              <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">
                {section.zoneExplorer.instruction}
              </p>
              <ZoneExplorer block={section.zoneExplorer} />
            </div>
          )}
          {section.zoneExplorers?.map((explorer, ei) => (
            <div key={`${section.number}-explorer-${ei}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {explorer.heading}
              </h3>
              <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">
                {explorer.block.instruction}
              </p>
              <ZoneExplorer block={explorer.block} />
            </div>
          ))}
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
          {section.accordionToggle && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {section.accordionToggle.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {section.accordionToggle.instruction}
              </p>
              <GroupedAccordionToggle groups={section.accordionToggle.groups} />
            </div>
          )}
          {section.tabGroups?.map((group, gi) => (
            <div key={`${section.number}-tabgroup-${gi}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {group.title}
              </h3>
              {group.instruction && (
                <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">
                  {group.instruction}
                </p>
              )}
              <Tabs defaultValue="tab-0">
                <TabsList className="h-auto max-w-full flex-wrap justify-start">
                  {group.tabs.map((tab, i) => (
                    <TabsTrigger key={tab.title} value={`tab-${i}`}>
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {group.tabs.map((tab, i) => (
                  <TabsContent
                    key={tab.title}
                    value={`tab-${i}`}
                    className="text-[13.5px] leading-relaxed text-muted-foreground"
                  >
                    {tab.body}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ))}
          {section.sequence && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {section.sequence.title}
              </h3>
              <Journey steps={section.sequence.steps} instruction={section.sequence.instruction} />
            </div>
          )}
          {section.calculators?.map((calc, i) => (
            <div key={`${section.number}-calc-${i}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {calc.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {calc.instruction}
              </p>
              <TwoFieldCalculator
                fieldA={calc.fieldA}
                fieldB={calc.fieldB}
                operation={calc.operation}
                resultLabel={calc.resultLabel}
                resultUnit={calc.resultUnit}
              />
            </div>
          ))}
          {section.toggles?.map((toggle, i) => (
            <div key={`${section.number}-toggle-${i}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {toggle.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {toggle.instruction}
              </p>
              <TogglePanels options={toggle.options} />
            </div>
          ))}
          {section.matcher && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {section.matcher.title}
              </h3>
              <MatchingPairs
                pairs={section.matcher.pairs}
                instruction={section.matcher.instruction}
                onComplete={() => awardOnce(`match-${section.number}`, 10)}
              />
            </div>
          )}
          {section.pieCalculator && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">
                {section.pieCalculator.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {section.pieCalculator.instruction}
              </p>
              <PieChartCalculator
                valueField={section.pieCalculator.valueField}
                totalField={section.pieCalculator.totalField}
              />
            </div>
          )}
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              Semak diri — {section.number}
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
        </div>
      ))}

      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">Refleksi Kendiri</h2>
        <SelfReflectionChecklist
          items={content.reflectionItems}
          storageKey={
            storageKey ? `${storageKey}:geo-f3-c${content.chapter}-reflection` : undefined
          }
          onAllComplete={() => awardOnce("reflection", 10)}
        />
      </div>
      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">Kuiz Pantas</h2>
        <div className="flex flex-col gap-3">
          {content.miniQuiz.map((item, i) => (
            <MiniQuiz key={i} item={item} />
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
            {isRead ? "Selesai ditanda" : `Tandakan Bab ${content.chapter} Selesai`}
          </button>
        </div>
      )}
    </section>
  );
}

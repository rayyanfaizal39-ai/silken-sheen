import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChipRow } from "@/components/notes/blocks/ChipRow";
import { FlipCardGrid } from "@/components/notes/blocks/FlipCard";
import { SelfReflectionChecklist } from "@/components/notes/blocks/SelfReflectionChecklist";
import { MatchingPairs } from "@/components/notes/blocks/MatchingPairs";
import { TogglePanels } from "@/components/notes/blocks/TogglePanels";
import { BloodTypeChecker } from "@/components/notes/blocks/BloodTypeChecker";
import { RankedRevealList } from "@/components/notes/blocks/RankedRevealList";
import { Journey } from "@/components/notes/blocks/Journey";
import { TransformerCalculator } from "@/components/notes/blocks/TransformerCalculator";
import { EnergyEfficiencyCalculator } from "@/components/notes/blocks/EnergyEfficiencyCalculator";
import { ElectricityCostCalculator } from "@/components/notes/blocks/ElectricityCostCalculator";
import { WorkPowerCalculator } from "@/components/notes/blocks/WorkPowerCalculator";
import { EnergyTypeCalculator } from "@/components/notes/blocks/EnergyTypeCalculator";
import { HalfLifeCalculator } from "@/components/notes/blocks/HalfLifeCalculator";
import { ZoneExplorer } from "@/components/notes/blocks/ZoneExplorer";
import type { MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";
import { useProgress } from "@/hooks/use-progress";

type Lang = "en" | "bm";

function MiniQuiz({ item, lang }: { item: MiniQuizItem; lang: Lang }) {
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
    if (isCorrect) addXp(15, "science");
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

export function ScienceF3InteractiveNotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: ScienceF3InteractiveContent;
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const { addXp } = useProgress();
  const rewarded = useRef(new Set<string>());
  const awardOnce = (key: string, amount: number) => {
    if (rewarded.current.has(key)) return;
    rewarded.current.add(key);
    addXp(amount, "science");
  };

  return (
    <section id={id} data-lang={lang} className="mt-8 flex min-w-0 flex-col gap-9 animate-fade-up">
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4 sm:p-5">
        <h2 className="font-display text-base font-bold text-primary">{content.blogHighlight.title}</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{content.blogHighlight.body}</p>
      </div>
      <ChipRow items={content.keywords} />

      {content.sections.map((section) => (
        <div key={section.number} className="flex min-w-0 flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-lg border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{section.number}</span>
            <h2 className="font-display text-xl font-bold leading-tight text-foreground">{section.title}</h2>
          </div>
          {section.intro && <p className="text-[13.5px] leading-relaxed text-muted-foreground">{section.intro}</p>}
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
          {section.flipCardGroups?.map((group, i) => (
            <div key={`${section.number}-flipgroup-${i}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{group.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{group.instruction}</p>
              <FlipCardGrid items={group.items} />
            </div>
          ))}
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
          {section.toggles?.map((toggle, i) => (
            <div key={`${section.number}-toggle-${i}`}>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{toggle.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{toggle.instruction}</p>
              <TogglePanels options={toggle.options} />
            </div>
          ))}
          {section.matcher && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.matcher.title}</h3>
              <MatchingPairs pairs={section.matcher.pairs} instruction={section.matcher.instruction} onComplete={() => awardOnce(`match-${section.number}`, 10)} />
            </div>
          )}
          {section.bloodChecker && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.bloodChecker.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{section.bloodChecker.instruction}</p>
              <BloodTypeChecker lang={lang} />
            </div>
          )}
          {section.ladder && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.ladder.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{section.ladder.instruction}</p>
              <RankedRevealList items={section.ladder.items.map((item) => ({ symbol: item.symbol, name: item.name, fact: item.fact, highlight: item.highlight }))} />
            </div>
          )}
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
              {calc.type === "transformer" ? (
                <TransformerCalculator lang={lang} defaultVp={calc.defaultVp} defaultNp={calc.defaultNp} defaultNs={calc.defaultNs} />
              ) : calc.type === "energy-efficiency" ? (
                <EnergyEfficiencyCalculator lang={lang} defaultUsefulOutput={calc.defaultUsefulOutput} defaultInputSupplied={calc.defaultInputSupplied} />
              ) : calc.type === "electricity-cost" ? (
                <ElectricityCostCalculator lang={lang} defaultPowerKw={calc.defaultPowerKw} defaultTimeH={calc.defaultTimeH} defaultRateSen={calc.defaultRateSen} />
              ) : calc.type === "work-power" ? (
                <WorkPowerCalculator lang={lang} defaultForce={calc.defaultForce} defaultDisplacement={calc.defaultDisplacement} defaultTime={calc.defaultTime} />
              ) : calc.type === "energy-type" ? (
                <EnergyTypeCalculator
                  lang={lang}
                  defaultGpeMass={calc.defaultGpeMass}
                  defaultGpeHeight={calc.defaultGpeHeight}
                  defaultEpeForce={calc.defaultEpeForce}
                  defaultEpeExtension={calc.defaultEpeExtension}
                  defaultKeMass={calc.defaultKeMass}
                  defaultKeVelocity={calc.defaultKeVelocity}
                />
              ) : (
                <HalfLifeCalculator lang={lang} defaultOriginalMass={calc.defaultOriginalMass} defaultHalfLife={calc.defaultHalfLife} defaultElapsedTime={calc.defaultElapsedTime} />
              )}
            </div>
          ))}
          {section.zoneExplorer && (
            <div>
              <h3 className="font-display mb-2 text-base font-bold text-foreground">{section.zoneExplorer.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{section.zoneExplorer.instruction}</p>
              <ZoneExplorer block={section.zoneExplorer.block} />
            </div>
          )}
          {section.comparison && (
            <div>
              <h3 className="font-display mb-3 text-base font-bold text-foreground">{section.comparison.title}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.comparison.columns.map((column) => (
                  <article key={column.title} className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/5 p-4">
                    <h4 className="font-display font-bold text-foreground">{column.title}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{column.body}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">{lang === "bm" ? `Uji Diri — ${section.number}` : `Check yourself — ${section.number}`}</h3>
            <Accordion type="single" collapsible>
              {section.checks.map((item, i) => (
                <AccordionItem key={item.question} value={`check-${section.number}-${i}`}>
                  <AccordionTrigger className="text-[13.5px]">{i + 1}. {item.question}</AccordionTrigger>
                  <AccordionContent className="text-[13px] text-muted-foreground">{item.hint}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ))}

      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">{lang === "bm" ? "Refleksi Kendiri" : "Self-Reflection"}</h2>
        <SelfReflectionChecklist items={content.reflectionItems} storageKey={storageKey ? `${storageKey}:sci-f3-c${content.chapter}-reflection` : undefined} onAllComplete={() => awardOnce("reflection", 10)} />
      </div>
      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">{lang === "bm" ? "Kuiz Ringkas" : "Quick Quiz"}</h2>
        <div className="flex flex-col gap-3">{content.miniQuiz.map((item, i) => <MiniQuiz key={i} item={item} lang={lang} />)}</div>
      </div>
      {onMarkRead && (
        <div className="flex justify-center">
          <button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isRead ? "bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105 active:scale-[0.98]"}`}>
            <CheckCircle2 className="h-4 w-4" /> {isRead ? (lang === "bm" ? "Selesai ditanda" : "Marked as read") : lang === "bm" ? `Tandakan Bab ${content.chapter} Selesai` : `Mark Chapter ${content.chapter} as Read`}
          </button>
        </div>
      )}
    </section>
  );
}

import type {
  Bilingual,
  ScienceF3BilingualCalculatorBlock,
  ScienceF3BilingualCard,
  ScienceF3BilingualContent,
  ScienceF3BilingualMiniQuizItem,
  ScienceF3BilingualSection,
  ScienceF3BilingualZone,
} from "./bilingual-types";
import type { ScienceF3CalculatorBlock, ScienceF3InteractiveContent, ScienceF3InteractiveSection } from "./interactive-types";
import type { MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import type { ZoneExplorerZone } from "@/components/notes/blocks/ZoneExplorer";

type ProjectLang = "dlp" | "bm";

function pick(value: Bilingual, lang: ProjectLang): string {
  return value[lang];
}

function pickCard(card: ScienceF3BilingualCard, lang: ProjectLang) {
  return {
    title: pick(card.title, lang),
    body: pick(card.body, lang),
    ...(card.detail ? { detail: pick(card.detail, lang) } : {}),
  };
}

function projectCalculator(calc: ScienceF3BilingualCalculatorBlock, lang: ProjectLang): ScienceF3CalculatorBlock {
  const base = { title: pick(calc.title, lang), instruction: pick(calc.instruction, lang) };
  switch (calc.type) {
    case "transformer":
      return { type: "transformer", ...base, defaultVp: calc.defaultVp, defaultNp: calc.defaultNp, defaultNs: calc.defaultNs };
    case "energy-efficiency":
      return { type: "energy-efficiency", ...base, defaultUsefulOutput: calc.defaultUsefulOutput, defaultInputSupplied: calc.defaultInputSupplied };
    case "electricity-cost":
      return { type: "electricity-cost", ...base, defaultPowerKw: calc.defaultPowerKw, defaultTimeH: calc.defaultTimeH, defaultRateSen: calc.defaultRateSen };
    case "work-power":
      return { type: "work-power", ...base, defaultForce: calc.defaultForce, defaultDisplacement: calc.defaultDisplacement, defaultTime: calc.defaultTime };
    case "energy-type":
      return {
        type: "energy-type",
        ...base,
        defaultGpeMass: calc.defaultGpeMass,
        defaultGpeHeight: calc.defaultGpeHeight,
        defaultEpeForce: calc.defaultEpeForce,
        defaultEpeExtension: calc.defaultEpeExtension,
        defaultKeMass: calc.defaultKeMass,
        defaultKeVelocity: calc.defaultKeVelocity,
      };
    case "half-life":
      return { type: "half-life", ...base, defaultOriginalMass: calc.defaultOriginalMass, defaultHalfLife: calc.defaultHalfLife, defaultElapsedTime: calc.defaultElapsedTime };
  }
}

function projectZone(zone: ScienceF3BilingualZone, lang: ProjectLang): ZoneExplorerZone {
  return {
    name: pick(zone.name, lang),
    ...(zone.description ? { description: pick(zone.description, lang) } : {}),
    ...(zone.facts ? { facts: zone.facts.map((f) => ({ label: pick(f.label, lang), value: pick(f.value, lang) })) } : {}),
    ...(zone.examples ? { examples: zone.examples.map((e) => pick(e, lang)) } : {}),
    ...(zone.activities ? { activities: zone.activities.map((a) => pick(a, lang)) } : {}),
  };
}

function projectSection(section: ScienceF3BilingualSection, lang: ProjectLang): ScienceF3InteractiveSection {
  return {
    number: section.number,
    title: pick(section.title, lang),
    ...(section.intro ? { intro: pick(section.intro, lang) } : {}),
    ...(section.cards ? { cards: section.cards.map((c) => pickCard(c, lang)) } : {}),
    ...(section.flipCards
      ? { flipCards: section.flipCards.map((f) => ({ id: f.id, icon: f.icon, label: pick(f.label, lang), fact: pick(f.fact, lang) })) }
      : {}),
    ...(section.flipCardGroups
      ? {
          flipCardGroups: section.flipCardGroups.map((g) => ({
            title: pick(g.title, lang),
            instruction: pick(g.instruction, lang),
            items: g.items.map((f) => ({ id: f.id, icon: f.icon, label: pick(f.label, lang), fact: pick(f.fact, lang) })),
          })),
        }
      : {}),
    ...(section.accordions ? { accordions: section.accordions.map((c) => pickCard(c, lang)) } : {}),
    ...(section.toggles
      ? {
          toggles: section.toggles.map((t) => ({
            title: pick(t.title, lang),
            instruction: pick(t.instruction, lang),
            options: t.options.map((o) => ({ id: o.id, label: pick(o.label, lang), body: pick(o.body, lang) })),
          })),
        }
      : {}),
    ...(section.matcher
      ? {
          matcher: {
            title: pick(section.matcher.title, lang),
            instruction: pick(section.matcher.instruction, lang),
            pairs: section.matcher.pairs.map((p) => ({ id: p.id, label: pick(p.label, lang), match: pick(p.match, lang) })),
          },
        }
      : {}),
    ...(section.sequence
      ? {
          sequence: {
            title: pick(section.sequence.title, lang),
            instruction: pick(section.sequence.instruction, lang),
            steps: section.sequence.steps.map((s) => ({
              title: pick(s.title, lang),
              body: pick(s.body, lang),
              ...(s.detail ? { detail: pick(s.detail, lang) } : {}),
            })),
          },
        }
      : {}),
    ...(section.calculators ? { calculators: section.calculators.map((c) => projectCalculator(c, lang)) } : {}),
    ...(section.zoneExplorer
      ? {
          zoneExplorer: {
            title: pick(section.zoneExplorer.title, lang),
            instruction: pick(section.zoneExplorer.instruction, lang),
            block: {
              title: pick(section.zoneExplorer.title, lang),
              instruction: pick(section.zoneExplorer.instruction, lang),
              ...(section.zoneExplorer.examplesLabel ? { examplesLabel: pick(section.zoneExplorer.examplesLabel, lang) } : {}),
              ...(section.zoneExplorer.activitiesLabel ? { activitiesLabel: pick(section.zoneExplorer.activitiesLabel, lang) } : {}),
              zones: section.zoneExplorer.zones.map((z) => projectZone(z, lang)),
            },
          },
        }
      : {}),
    ...(section.comparison
      ? {
          comparison: {
            title: pick(section.comparison.title, lang),
            columns: section.comparison.columns.map((c) => pickCard(c, lang)),
          },
        }
      : {}),
    checks: section.checks.map((c) => ({ question: pick(c.question, lang), hint: pick(c.hint, lang) })),
  };
}

function projectMiniQuiz(item: ScienceF3BilingualMiniQuizItem, lang: ProjectLang): MiniQuizItem {
  if (item.type === "true-false") {
    return { type: "true-false", question: pick(item.question, lang), answer: item.answer, explanation: pick(item.explanation, lang) };
  }
  return {
    type: "multiple-choice",
    question: pick(item.question, lang),
    options: item.options.map((o) => pick(o, lang)),
    answerIndex: item.answerIndex,
    explanation: pick(item.explanation, lang),
  };
}

export function projectF3Interactive(source: ScienceF3BilingualContent, lang: ProjectLang): ScienceF3InteractiveContent {
  return {
    chapter: source.chapter,
    blogHighlight: { title: pick(source.blogHighlight.title, lang), body: pick(source.blogHighlight.body, lang) },
    keywords: source.keywords.map((k) => pick(k, lang)),
    sections: source.sections.map((s) => projectSection(s, lang)),
    reflectionItems: source.reflectionItems.map((r) => pick(r, lang)),
    miniQuiz: source.miniQuiz.map((q) => projectMiniQuiz(q, lang)),
  };
}

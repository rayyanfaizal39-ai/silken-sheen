import type {
  MathC11Diagram,
  MathC11PracticeItem,
  MathF1C11Content,
} from "@/content/form1/math/chapter-11/interactive-content";
import { chrome, type MathLang } from "./blocks/mathNotesChrome";
import { LessonIntro } from "./blocks/LessonIntro";
import { FormulaCard } from "./blocks/FormulaCard";
import {
  EmptySetDiagram,
  EventDotsDiagram,
  MissingElementCheck,
  SetComplementDiagram,
  SetElementsDiagram,
  SetMembershipCheck,
  VennOverlapDiagram,
  VennSubsetDiagram,
  VennTripleDiagram,
} from "./blocks/VennDiagrams";
import { StepsCard } from "./blocks/StepsCard";
import { GuidedCard } from "./blocks/GuidedCard";
import { MistakeNote } from "./blocks/MistakeNote";
import { DifficultyTabs, type Difficulty, type PracticeQuestion } from "./blocks/DifficultyTabs";
import { ChipRow } from "./blocks/ChipRow";
import { ChapterSummaryMindmap } from "./blocks/ChapterSummaryMindmap";
import { FormulaSheet } from "./blocks/FormulaSheet";
import { QuickRevisionChecklist } from "./blocks/QuickRevisionChecklist";
import { ExamTips } from "./blocks/ExamTips";
import { ChallengeMission } from "./blocks/ChallengeMission";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 11 as Read",
  bm: "📘 Tandakan Bab 11 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

function renderDiagram(d: MathC11Diagram | undefined, lang: MathLang) {
  if (!d) return undefined;
  switch (d.kind) {
    case "elements":
      return (
        <SetElementsDiagram setName={d.setName} elements={d.elements} countLabel={d.countLabel} />
      );
    case "membershipCheck":
      return (
        <SetMembershipCheck
          setName={d.setName}
          elements={d.elements}
          checkedElement={d.checkedElement}
          isIn={d.isIn}
        />
      );
    case "emptySet":
      return <EmptySetDiagram label={chrome("noElementsSatisfy", lang)} />;
    case "complement":
      return (
        <SetComplementDiagram pElements={d.pElements} complementElements={d.complementElements} />
      );
    case "missingElement":
      return <MissingElementCheck setElements={d.setElements} missingElement={d.missingElement} />;
    case "overlap":
      return (
        <VennOverlapDiagram
          aOnlyEl={d.aOnlyEl}
          bothEl={d.bothEl}
          bOnlyEl={d.bOnlyEl}
          aLabel={d.aLabel}
          bLabel={d.bLabel}
        />
      );
    case "eventDots":
      return <EventDotsDiagram items={d.items} />;
    case "tripleVenn":
      return <VennTripleDiagram />;
  }
}

function toPracticeQuestions(
  practice: Record<Difficulty, MathC11PracticeItem>,
  lang: MathLang,
): Record<Difficulty, PracticeQuestion> {
  const entries = Object.entries(practice) as [Difficulty, MathC11PracticeItem][];
  return Object.fromEntries(
    entries.map(([diff, item]) => [
      diff,
      { question: item.question, answer: item.answer, diagram: renderDiagram(item.diagram, lang) },
    ]),
  ) as Record<Difficulty, PracticeQuestion>;
}

/**
 * Form 1 Mathematics, Chapter 11 (Introduction of Set) interactive notes.
 * Follows the same composition as MathF1Chapter9NotesBlock. 11.2 embeds
 * VennSubsetDiagram in the lesson intro, plus per-question Venn/set diagrams
 * in the worked example, guided card, practice tiers, and challenge mission
 * via the `diagram` slot on StepsCard/GuidedCard/DifficultyTabs/ChallengeMission.
 */
export function MathF1Chapter11NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF1C11Content; bm: MathF1C11Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];

  const manifest = [
    ...t.subtopics.map((s) => ({ id: `math-f1-c11-${s.num}`, weight: 3 })),
    { id: "math-f1-c11-chapter-end", weight: 2 },
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-notes-section-manifest={JSON.stringify(manifest)}
      className="mt-8"
    >
      {t.subtopics.map((sub) => (
        <div
          key={sub.num}
          data-notes-section-id={`math-f1-c11-${sub.num}`}
          className="mt-14 first:mt-0"
        >
          <div className="mb-1.5 flex items-baseline gap-3">
            <span className="font-display rounded-full bg-[rgba(139,107,255,0.12)] px-2.5 py-0.5 text-[13px] font-bold text-[#8b6bff]">
              {sub.num}
            </span>
            <h2 className="font-display text-xl font-bold text-[#eef1fb] sm:text-[23px]">
              {sub.title}
            </h2>
          </div>

          <LessonIntro lang={lang} paragraphs={sub.ideaParagraphs}>
            {sub.introDiagram && <VennSubsetDiagram caption={sub.introDiagram.caption} />}
          </LessonIntro>

          <FormulaCard
            eyebrow={sub.formula.eyebrow}
            formula={sub.formula.formula}
            legend={sub.formula.legend}
          />

          <StepsCard
            lang={lang}
            question={sub.worked.question}
            diagram={renderDiagram(sub.worked.diagram, lang)}
            steps={sub.worked.steps}
          />

          <GuidedCard
            lang={lang}
            question={sub.guided.question}
            diagram={renderDiagram(sub.guided.diagram, lang)}
            answer={sub.guided.answer}
          />

          <MistakeNote lang={lang} wrong={sub.mistake.wrong} right={sub.mistake.right} />

          <DifficultyTabs lang={lang} questions={toPracticeQuestions(sub.practice, lang)} />

          {sub.realLife && sub.realLife.length > 0 && (
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={sub.realLife} />
            </div>
          )}
        </div>
      ))}

      <div data-notes-section-id="math-f1-c11-chapter-end" className="mt-14 space-y-10">
        <div>
          <h2 className="font-display mb-1 text-lg font-bold text-[#eef1fb]">
            ✦ {chrome("chapterSummary", lang)}
          </h2>
          <ChapterSummaryMindmap center={t.summary.center} branches={t.summary.branches} />
        </div>

        <div>
          <h2 className="font-display mb-1 text-lg font-bold text-[#eef1fb]">
            📐 {chrome("formulaSheet", lang)}
          </h2>
          <FormulaSheet entries={t.formulaSheet} />
        </div>

        <div>
          <h2 className="font-display mb-1 text-lg font-bold text-[#eef1fb]">
            ✓ {chrome("quickRevision", lang)}
          </h2>
          <QuickRevisionChecklist items={t.quickRevision} />
        </div>

        <div>
          <h2 className="font-display mb-1 text-lg font-bold text-[#eef1fb]">
            💡 {chrome("examTips", lang)}
          </h2>
          <ExamTips tips={t.examTips} />
        </div>

        <div>
          <h2 className="font-display mb-1 text-lg font-bold text-[#eef1fb]">
            🏆 {chrome("challengeMission", lang)}
          </h2>
          <ChallengeMission
            lang={lang}
            question={t.challenge.question}
            diagram={renderDiagram(t.challenge.diagram, lang)}
            answer={t.challenge.answer}
          />
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
                  : "bg-gradient-to-r from-[#8b6bff] to-[#4fb0ff] text-white hover:scale-105"
              }`}
            >
              {isRead ? MARKED_BTN[lang] : MARK_READ_BTN[lang]}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

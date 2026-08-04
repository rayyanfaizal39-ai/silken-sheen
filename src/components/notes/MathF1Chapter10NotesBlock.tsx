import type {
  MathC10Diagram,
  MathC10PracticeItem,
  MathF1C10Content,
} from "@/content/form1/math/chapter-10/interactive-content";
import { chrome, type MathLang } from "./blocks/mathNotesChrome";
import { LessonIntro } from "./blocks/LessonIntro";
import { FormulaCard } from "./blocks/FormulaCard";
import { FormulaSheet } from "./blocks/FormulaSheet";
import {
  AreaFormulaDiagramsGrid,
  KiteAreaDiagram,
  LandPlotDiagram,
  LShapePerimeterDiagram,
  OverlappingSquaresDiagram,
  ParallelogramAreaDiagram,
  RectanglePerimeterDiagram,
  SquareAreaDiagram,
  TrapeziumAreaDiagram,
  TriangleAreaDiagram,
  TriangleInRectDiagram,
  TwoRectCompareDiagram,
} from "./blocks/PerimeterAreaDiagrams";
import { StepsCard } from "./blocks/StepsCard";
import { GuidedCard } from "./blocks/GuidedCard";
import { MistakeNote } from "./blocks/MistakeNote";
import { DifficultyTabs, type Difficulty, type PracticeQuestion } from "./blocks/DifficultyTabs";
import { ChipRow } from "./blocks/ChipRow";
import { ChapterSummaryMindmap } from "./blocks/ChapterSummaryMindmap";
import { QuickRevisionChecklist } from "./blocks/QuickRevisionChecklist";
import { ExamTips } from "./blocks/ExamTips";
import { ChallengeMission } from "./blocks/ChallengeMission";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 10 as Read",
  bm: "📘 Tandakan Bab 10 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

function renderDiagram(d: MathC10Diagram | undefined) {
  if (!d) return undefined;
  switch (d.kind) {
    case "rectanglePerim":
      return (
        <RectanglePerimeterDiagram
          lenLabel={d.lenLabel}
          widLabel={d.widLabel}
          unknownSide={d.unknownSide}
        />
      );
    case "lShapePerim":
      return <LShapePerimeterDiagram />;
    case "overlapSquares":
      return <OverlappingSquaresDiagram l1={d.l1} l2={d.l2} />;
    case "landPlot":
      return <LandPlotDiagram givenAwayLabel={d.givenAwayLabel} />;
    case "triangleArea":
      return <TriangleAreaDiagram baseLabel={d.baseLabel} heightLabel={d.heightLabel} />;
    case "parallelogramArea":
      return <ParallelogramAreaDiagram baseLabel={d.baseLabel} heightLabel={d.heightLabel} />;
    case "kiteArea":
      return <KiteAreaDiagram d1Label={d.d1Label} d2Label={d.d2Label} />;
    case "triangleInRect":
      return <TriangleInRectDiagram widthLabel={d.widthLabel} lengthLabel={d.lengthLabel} />;
    case "squareArea":
      return <SquareAreaDiagram areaLabel={d.areaLabel} sideLabel={d.sideLabel} />;
    case "twoRectCompare":
      return <TwoRectCompareDiagram w1={d.w1} h1={d.h1} l1={d.l1} w2={d.w2} h2={d.h2} l2={d.l2} />;
  }
}

function toPracticeQuestions(
  practice: Record<Difficulty, MathC10PracticeItem>,
): Record<Difficulty, PracticeQuestion> {
  const entries = Object.entries(practice) as [Difficulty, MathC10PracticeItem][];
  return Object.fromEntries(
    entries.map(([diff, item]) => [
      diff,
      { question: item.question, answer: item.answer, diagram: renderDiagram(item.diagram) },
    ]),
  ) as Record<Difficulty, PracticeQuestion>;
}

/**
 * Form 1 Mathematics, Chapter 10 (Perimeter and Area) interactive notes.
 * Follows the same composition as MathF1Chapter9NotesBlock. 10.2 embeds an
 * inline FormulaSheet of the four area types plus AreaFormulaDiagramsGrid in
 * its lesson intro; every subtopic embeds per-question shape diagrams in the
 * worked example, guided card, and practice tiers via the `diagram` slot.
 */
export function MathF1Chapter10NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF1C10Content; bm: MathF1C10Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];

  const manifest = [
    ...t.subtopics.map((s) => ({ id: `math-f1-c10-${s.num}`, weight: 3 })),
    { id: "math-f1-c10-chapter-end", weight: 2 },
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
          data-notes-section-id={`math-f1-c10-${sub.num}`}
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
            {sub.introDiagram && (
              <AreaFormulaDiagramsGrid
                titles={sub.introDiagram.titles}
                subLabels={sub.introDiagram.subLabels}
                caption={sub.introDiagram.caption}
              />
            )}
          </LessonIntro>

          {sub.areaTypesSheet && <FormulaSheet entries={sub.areaTypesSheet} />}

          {sub.formula && (
            <FormulaCard
              eyebrow={sub.formula.eyebrow}
              formula={sub.formula.formula}
              legend={sub.formula.legend}
            />
          )}

          <StepsCard
            lang={lang}
            question={sub.worked.question}
            diagram={renderDiagram(sub.worked.diagram)}
            steps={sub.worked.steps}
          />

          <GuidedCard
            lang={lang}
            question={sub.guided.question}
            diagram={renderDiagram(sub.guided.diagram)}
            answer={sub.guided.answer}
          />

          <MistakeNote lang={lang} wrong={sub.mistake.wrong} right={sub.mistake.right} />

          <DifficultyTabs lang={lang} questions={toPracticeQuestions(sub.practice)} />

          {sub.realLife && sub.realLife.length > 0 && (
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={sub.realLife} />
            </div>
          )}
        </div>
      ))}

      <div data-notes-section-id="math-f1-c10-chapter-end" className="mt-14 space-y-10">
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

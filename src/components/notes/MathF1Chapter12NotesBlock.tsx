import type { ReactNode } from "react";
import type {
  MathC12ChartSection,
  MathC12PracticeItem,
  MathC12Widget,
  MathF1C12Content,
} from "@/content/form1/math/chapter-12/interactive-content";
import { chrome, type MathLang } from "./blocks/mathNotesChrome";
import { LessonIntro } from "./blocks/LessonIntro";
import { FormulaCard } from "./blocks/FormulaCard";
import {
  BarChart,
  CategoryBucketsDiagram,
  DotPlot,
  LineGraph,
  MiniLineGraph,
  PieChart,
  RepresentationCompareDiagram,
  StatQuestionCompareDiagram,
  StemLeafMiniDiagram,
  StemLeafPlot,
} from "./blocks/DataCharts";
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
import { MATH_VIOLET } from "./blocks/mathTheme";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 12 as Read",
  bm: "📘 Tandakan Bab 12 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

const SECTION_ICON: Record<MathC12ChartSection["key"], string> = {
  bar: "📊",
  line: "📈",
  dot: "⚫",
  stemleaf: "🌿",
  interpret: "🔍",
};

function renderWidget(w: MathC12Widget | undefined): ReactNode {
  if (!w) return undefined;
  switch (w.kind) {
    case "categoryBuckets":
      return (
        <CategoryBucketsDiagram
          categoricalExample={w.categoricalExample}
          numericalExample={w.numericalExample}
        />
      );
    case "statQCompare":
      return <StatQuestionCompareDiagram fixedLabel={w.fixedLabel} variedLabel={w.variedLabel} />;
    case "stemLeafMini":
      return <StemLeafMiniDiagram stem={w.stem} leaf={w.leaf} resultLabel={w.resultLabel} />;
    case "miniLineGraph":
      return <MiniLineGraph points={w.points} />;
    case "representationCompare":
      return (
        <RepresentationCompareDiagram
          positionOnlyLabel={w.positionOnlyLabel}
          exactValuesLabel={w.exactValuesLabel}
        />
      );
  }
}

function renderChart(chart: MathC12ChartSection["chart"]): ReactNode {
  if (!chart) return undefined;
  switch (chart.kind) {
    case "bar":
      return <BarChart data={chart.data} />;
    case "line":
      return <LineGraph values={chart.values} unit={chart.unit} />;
    case "dot":
      return <DotPlot values={chart.values} />;
    case "stemleaf":
      return <StemLeafPlot values={chart.values} keyCaption={chart.keyCaption} />;
  }
}

function toPracticeQuestions(
  practice: Record<Difficulty, MathC12PracticeItem>,
): Record<Difficulty, PracticeQuestion> {
  const entries = Object.entries(practice) as [Difficulty, MathC12PracticeItem][];
  return Object.fromEntries(
    entries.map(([diff, item]) => [
      diff,
      { question: item.question, answer: item.answer, diagram: renderWidget(item.widget) },
    ]),
  ) as Record<Difficulty, PracticeQuestion>;
}

/** Worked-example card with no reveal button — the chart itself IS the answer, always visible. */
function ChartWorkedExample({
  lang,
  question,
  children,
}: {
  lang: MathLang;
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div
        className="font-display mb-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {chrome("workedExample", lang)}
      </div>
      <div className="mb-1 text-[14.5px] leading-relaxed text-[#eef1fb]">{question}</div>
      {children}
    </div>
  );
}

/**
 * Form 1 Mathematics, Chapter 12 (Data Handling) interactive notes. Unlike
 * every other Form 1 Math chapter, this has only ONE official subtopic
 * (12.1) but is rendered as six visual sections: Classification (first),
 * then Pie/Bar/Line/Dot/Stem-Leaf/Interpretation — matching the mockup's
 * deliberate structure rather than the standard subtopics[] shape.
 */
export function MathF1Chapter12NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF1C12Content; bm: MathF1C12Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];

  const manifest = [
    { id: `math-f1-c12-${t.subtopicNum}`, weight: 3 },
    { id: "math-f1-c12-chapter-end", weight: 2 },
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-notes-section-manifest={JSON.stringify(manifest)}
      className="mt-8"
    >
      <div data-notes-section-id={`math-f1-c12-${t.subtopicNum}`} className="mt-0">
        <div className="mb-1.5 flex items-baseline gap-3">
          <span className="font-display rounded-full bg-[rgba(139,107,255,0.12)] px-2.5 py-0.5 text-[13px] font-bold text-[#8b6bff]">
            {t.subtopicNum}
          </span>
          <h2 className="font-display text-xl font-bold text-[#eef1fb] sm:text-[23px]">
            {t.subtopicTitle}
          </h2>
        </div>

        <LessonIntro lang={lang} paragraphs={t.classification.ideaParagraphs} />

        <GuidedCard
          lang={lang}
          question={t.classification.guided.question}
          diagram={renderWidget(t.classification.guided.widget)}
          answer={t.classification.guided.answer}
        />

        <FormulaCard eyebrow={t.pie.formula.eyebrow} formula={t.pie.formula.formula} />

        <ChartWorkedExample lang={lang} question={t.pie.workedQuestion}>
          <PieChart data={t.pie.data} />
        </ChartWorkedExample>

        {t.chartSections.map((section) => (
          <div key={section.key} className="mt-9">
            <div className="mb-1.5 flex items-baseline gap-2">
              <span aria-hidden>{SECTION_ICON[section.key]}</span>
              <h3 className="font-display text-lg font-semibold text-[#eef1fb] sm:text-xl">
                {section.title}
              </h3>
            </div>

            <LessonIntro lang={lang} paragraphs={section.ideaParagraphs} />

            {section.chart ? (
              <ChartWorkedExample lang={lang} question={section.workedQuestion}>
                {renderChart(section.chart)}
              </ChartWorkedExample>
            ) : (
              section.steps && (
                <StepsCard lang={lang} question={section.workedQuestion} steps={section.steps} />
              )
            )}
          </div>
        ))}

        <MistakeNote lang={lang} wrong={t.mistake.wrong} right={t.mistake.right} />

        <DifficultyTabs lang={lang} questions={toPracticeQuestions(t.practice)} />

        {t.realLife.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={t.realLife} />
          </div>
        )}
      </div>

      <div data-notes-section-id="math-f1-c12-chapter-end" className="mt-14 space-y-10">
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
            diagram={renderWidget(t.challenge.widget)}
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

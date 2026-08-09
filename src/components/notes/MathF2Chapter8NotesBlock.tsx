import type { ReactNode } from "react";
import type { MathF2C8Content } from "@/content/form2/math/chapter-8/interactive-content";
import { chrome, type MathLang } from "./blocks/mathNotesChrome";
import { LessonIntro } from "./blocks/LessonIntro";
import { FormulaCard } from "./blocks/FormulaCard";
import { StepsCard } from "./blocks/StepsCard";
import { GuidedCard } from "./blocks/GuidedCard";
import { MistakeNote } from "./blocks/MistakeNote";
import { DifficultyTabs } from "./blocks/DifficultyTabs";
import { ChipRow } from "./blocks/ChipRow";
import { ChapterSummaryMindmap } from "./blocks/ChapterSummaryMindmap";
import { FormulaSheet } from "./blocks/FormulaSheet";
import { QuickRevisionChecklist } from "./blocks/QuickRevisionChecklist";
import { ExamTips } from "./blocks/ExamTips";
import { ChallengeMission } from "./blocks/ChallengeMission";
import { NthTermMachineDiagram } from "./blocks/PatternDiagrams";
import { RelationCompare } from "./blocks/RelationDiagrams";
import { LiveFunctionGraph } from "./blocks/LiveFunctionGraph";
import { MATH_VIOLET } from "./blocks/mathTheme";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 8 as Read",
  bm: "📘 Tandakan Bab 8 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

function SubtopicHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-1.5 flex items-baseline gap-3">
      <span className="font-display rounded-full bg-[rgba(139,107,255,0.12)] px-2.5 py-0.5 text-[13px] font-bold text-[#8b6bff]">
        {num}
      </span>
      <h2 className="font-display text-xl font-bold text-[#eef1fb] sm:text-[23px]">{title}</h2>
    </div>
  );
}

/**
 * Always-visible worked example (question + live graph, no reveal button —
 * the graph itself is the answer, matching the source mockup). Visually
 * matches StepsCard's card but skips the reveal interaction since it's a
 * one-off pattern used only for the two Chapter 8 graph examples.
 */
function GraphExampleCard({
  eyebrow,
  question,
  children,
}: {
  eyebrow: string;
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div
        className="font-display mb-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {eyebrow}
      </div>
      <div className="mb-1 text-[14.5px] leading-relaxed text-[#eef1fb]">{question}</div>
      {children}
    </div>
  );
}

/** Form 2 Mathematics, Chapter 8 (Graphs of Functions) interactive notes. */
export function MathF2Chapter8NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF2C8Content; bm: MathF2C8Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const s1 = t.subtopic81;
  const s2 = t.subtopic82;

  const manifest = [
    { id: `math-f2-c8-${s1.num}`, weight: 3 },
    { id: `math-f2-c8-${s2.num}`, weight: 3 },
    { id: "math-f2-c8-chapter-end", weight: 2 },
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-notes-section-manifest={JSON.stringify(manifest)}
      className="mt-8"
    >
      <div data-notes-section-id={`math-f2-c8-${s1.num}`} className="mt-14 first:mt-0">
        <SubtopicHeader num={s1.num} title={s1.title} />

        <LessonIntro lang={lang} paragraphs={s1.ideaParagraphs}>
          <NthTermMachineDiagram
            inputLabel={s1.machine.inputLabel}
            formula={s1.machine.formula}
            outputLabel={s1.machine.outputLabel}
            caption={s1.machine.caption}
          />
        </LessonIntro>

        <FormulaCard
          eyebrow={s1.formula.eyebrow}
          formula={s1.formula.formula}
          legend={s1.formula.legend}
        />

        <RelationCompare items={s1.relationCompare.items} caption={s1.relationCompare.caption} />

        <StepsCard lang={lang} question={s1.worked.question} steps={s1.worked.steps} />

        <GuidedCard lang={lang} question={s1.guided.question} answer={s1.guided.answer} />

        <MistakeNote lang={lang} wrong={s1.mistake.wrong} right={s1.mistake.right} />

        <DifficultyTabs lang={lang} questions={s1.practice} />

        {s1.realLife && s1.realLife.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={s1.realLife} />
          </div>
        )}
      </div>

      <div data-notes-section-id={`math-f2-c8-${s2.num}`} className="mt-14">
        <SubtopicHeader num={s2.num} title={s2.title} />

        <LessonIntro lang={lang} paragraphs={s2.ideaParagraphs} />

        {s2.graphExamples.map((ex, i) => (
          <GraphExampleCard key={i} eyebrow={ex.eyebrow} question={ex.question}>
            <LiveFunctionGraph fn={ex.fn} xMin={ex.xMin} xMax={ex.xMax} caption={ex.caption} />
          </GraphExampleCard>
        ))}

        <GuidedCard lang={lang} question={s2.guided.question} answer={s2.guided.answer} />

        <MistakeNote lang={lang} wrong={s2.mistake.wrong} right={s2.mistake.right} />

        <DifficultyTabs lang={lang} questions={s2.practice} />

        {s2.realLife && s2.realLife.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={s2.realLife} />
          </div>
        )}
      </div>

      <div data-notes-section-id="math-f2-c8-chapter-end" className="mt-14 space-y-10">
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

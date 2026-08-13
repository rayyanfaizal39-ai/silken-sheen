import type { MathF3C2Content } from "@/content/form3/math/chapter-2/interactive-content";
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
import { DecimalSlide, SigFigHighlight } from "./blocks/SignificantFigureDiagrams";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 2 as Read",
  bm: "📘 Tandakan Bab 2 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

/** Form 3 Mathematics, Chapter 2 (Standard Form) interactive notes. */
export function MathF3Chapter2NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF3C2Content; bm: MathF3C2Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];

  const manifest = [
    ...t.subtopics.map((s) => ({ id: `math-f3-c2-${s.num}`, weight: 3 })),
    { id: "math-f3-c2-chapter-end", weight: 2 },
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
          data-notes-section-id={`math-f3-c2-${sub.num}`}
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
            {sub.visual?.kind === "sigFig" && (
              <SigFigHighlight
                digits={sub.visual.digits}
                significant={sub.visual.significant}
                caption={sub.visual.caption}
              />
            )}
            {sub.visual?.kind === "decimalSlide" && (
              <DecimalSlide
                fromValue={sub.visual.fromValue}
                toValue={sub.visual.toValue}
                exponentLabel={sub.visual.exponentLabel}
                placesLabel={sub.visual.placesLabel}
                caption={sub.visual.caption}
              />
            )}
          </LessonIntro>

          {sub.blocks.map((block, bi) => (
            <div key={bi}>
              <FormulaCard
                eyebrow={block.formula.eyebrow}
                formula={block.formula.formula}
                legend={block.formula.legend}
              />
              {block.worked && (
                <StepsCard
                  lang={lang}
                  question={block.worked.question}
                  steps={block.worked.steps}
                  diagram={
                    block.worked.visual && (
                      <DecimalSlide
                        fromValue={block.worked.visual.fromValue}
                        toValue={block.worked.visual.toValue}
                        exponentLabel={block.worked.visual.exponentLabel}
                        placesLabel={block.worked.visual.placesLabel}
                        caption={block.worked.visual.caption}
                      />
                    )
                  }
                />
              )}
            </div>
          ))}

          <GuidedCard lang={lang} question={sub.guided.question} answer={sub.guided.answer} />

          <MistakeNote lang={lang} wrong={sub.mistake.wrong} right={sub.mistake.right} />

          <DifficultyTabs lang={lang} questions={sub.practice} />

          {sub.realLife && sub.realLife.length > 0 && (
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <ChipRow heading={chrome("whereYoullSeeThis", lang)} items={sub.realLife} />
            </div>
          )}
        </div>
      ))}

      <div data-notes-section-id="math-f3-c2-chapter-end" className="mt-14 space-y-10">
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

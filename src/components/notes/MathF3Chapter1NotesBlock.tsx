import type { MathF3C1Content } from "@/content/form3/math/chapter-1/interactive-content";
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
import { FactorCombine, IndexCollapse, NegIndexFlip, RootPowerArrow } from "./blocks/IndexDiagrams";

const MARK_READ_BTN: Record<MathLang, string> = {
  en: "📘 Mark Chapter 1 as Read",
  bm: "📘 Tandakan Bab 1 Selesai",
};
const MARKED_BTN: Record<MathLang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };

/** Form 3 Mathematics, Chapter 1 (Indices) interactive notes. */
export function MathF3Chapter1NotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: MathF3C1Content; bm: MathF3C1Content };
  lang: MathLang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];

  const manifest = [
    ...t.subtopics.map((s, i) => ({ id: `math-f3-c1-sub-${i}`, weight: 3 })),
    { id: "math-f3-c1-chapter-end", weight: 2 },
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-notes-section-manifest={JSON.stringify(manifest)}
      className="mt-8"
    >
      {t.subtopics.map((sub, si) => (
        <div key={si} data-notes-section-id={`math-f3-c1-sub-${si}`} className="mt-14 first:mt-0">
          <div className="mb-1.5 flex items-baseline gap-3">
            <span className="font-display rounded-full bg-[rgba(139,107,255,0.12)] px-2.5 py-0.5 text-[13px] font-bold text-[#8b6bff]">
              {sub.num}
            </span>
            <h2 className="font-display text-xl font-bold text-[#eef1fb] sm:text-[23px]">
              {sub.title}
            </h2>
          </div>

          <LessonIntro lang={lang} paragraphs={sub.ideaParagraphs}>
            {sub.visual?.kind === "indexCollapse" && (
              <IndexCollapse
                expression={sub.visual.expression}
                base={sub.visual.base}
                index={sub.visual.index}
                factorCountLabel={sub.visual.factorCountLabel}
                baseIndexLabel={sub.visual.baseIndexLabel}
                caption={sub.visual.caption}
              />
            )}
            {sub.visual?.kind === "factorCombine" && (
              <FactorCombine
                leftLabel={sub.visual.leftLabel}
                rightLabel={sub.visual.rightLabel}
                resultLabel={sub.visual.resultLabel}
                caption={sub.visual.caption}
              />
            )}
            {sub.visual?.kind === "negIndexFlip" && (
              <NegIndexFlip
                baseLabel={sub.visual.baseLabel}
                exponentLabel={sub.visual.exponentLabel}
                denominatorLabel={sub.visual.denominatorLabel}
                caption={sub.visual.caption}
              />
            )}
            {sub.visual?.kind === "rootPower" && (
              <RootPowerArrow
                rootExpr={sub.visual.rootExpr}
                powerBase={sub.visual.powerBase}
                powerExponent={sub.visual.powerExponent}
                sameValueLabel={sub.visual.sameValueLabel}
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

      <div data-notes-section-id="math-f3-c1-chapter-end" className="mt-14 space-y-10">
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

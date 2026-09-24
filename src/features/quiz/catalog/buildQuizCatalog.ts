// Builds the server quiz catalog (public.quiz_catalog) from the same content
// and resolvers the quiz pages use, so the server knows every real quiz, its
// question count per difficulty and its XP formula. Deterministic: the output
// depends only on content, and is sorted by key.
//
// Regenerate with `npm run generate:quiz-catalog` after changing quiz content.
import { forms, subjects } from "@/data/subjects-meta";
import { getChapterQuizQuestions, getRegisteredSubjectChapters } from "@/content/registry";
import { defaultQuizLanguage } from "@/lib/quiz-identity";
import { ENGLISH_QUIZ_SETS, getEnglishQuizSet } from "@/data/english-f1-quiz-sets";
import { ENGLISH_QUIZ_SETS_F2, getEnglishQuizSetF2 } from "@/data/english-f2-quiz-sets";
import { ENGLISH_QUIZ_SETS_F3, getEnglishQuizSetF3 } from "@/data/english-f3-quiz-sets";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { BM_OBJECTIVE_SETS_BY_FORM } from "@/components/BMWorldPage";
import {
  QUIZ_BASE_XP,
  QUIZ_CORRECT_ANSWER_BONUS_XP,
  QUIZ_PASS_BONUS_XP,
  QUIZ_TIMER_BONUS_XP,
  buildCanonicalQuizKey,
  buildQuizKey,
  formulaForQuizKind,
  historicalDifficultyTier,
  type CanonicalQuizIdentity,
  type QuizXpFormula,
} from "@/features/quiz/xp/quizXp";

export type QuizCatalogRow = {
  quizKey: string;
  kind: CanonicalQuizIdentity["kind"];
  formula: QuizXpFormula;
  subjectId: string;
  form: 1 | 2 | 3;
  /** The chapter label the page records in quiz_history (unchanged). */
  chapterKey: string;
  lang: string;
  totalQuestions: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  timerBonusAllowed: boolean;
  maxXp: number;
};

export type LegacyQuizKeyRow = { legacyKey: string; quizKey: string };

export type QuizCatalog = { quizzes: QuizCatalogRow[]; legacyKeys: LegacyQuizKeyRow[] };

const STANDARD_DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;
const BILINGUAL_SUBJECTS = new Set(["science", "math"]);
const MATH_OBJECTIVE_IDS = ["objective-1", "objective-2", "objective-3"] as const;
const MATH_LANGS = ["bm", "dlp"] as const;

/** Upper bound of the historical formula, used as the server's award ceiling. */
export function maxXpFor(
  formula: QuizXpFormula,
  counts: { easyCount: number; mediumCount: number; hardCount: number; totalQuestions: number },
): number {
  if (formula === "bm_world") {
    return (
      45 +
      counts.totalQuestions * (QUIZ_CORRECT_ANSWER_BONUS_XP + QUIZ_TIMER_BONUS_XP["60"]) +
      QUIZ_PASS_BONUS_XP
    );
  }
  const perCorrectBonus =
    QUIZ_CORRECT_ANSWER_BONUS_XP + (formula === "standard" ? QUIZ_TIMER_BONUS_XP["15"] : 0);
  return (
    counts.easyCount * (QUIZ_BASE_XP.easy + perCorrectBonus) +
    counts.mediumCount * (QUIZ_BASE_XP.medium + perCorrectBonus) +
    counts.hardCount * (QUIZ_BASE_XP.hard + perCorrectBonus) +
    QUIZ_PASS_BONUS_XP
  );
}

function formNumber(form: string): 1 | 2 | 3 {
  const value = Number(form.replace(/\D/g, ""));
  if (value !== 1 && value !== 2 && value !== 3) throw new Error(`Unsupported form: ${form}`);
  return value;
}

class CatalogCollector {
  private readonly quizzes = new Map<string, QuizCatalogRow>();
  private readonly legacy = new Set<string>();
  private readonly legacyRows: LegacyQuizKeyRow[] = [];

  add(
    identity: CanonicalQuizIdentity,
    chapterKey: string,
    questions: readonly { difficulty?: unknown }[],
    legacyKeys: string[],
  ) {
    if (questions.length === 0) return;
    const counts = { easyCount: 0, mediumCount: 0, hardCount: 0 };
    for (const question of questions) {
      const tier = historicalDifficultyTier(question.difficulty);
      counts[`${tier}Count` as const] += 1;
    }
    const formula = formulaForQuizKind(identity.kind);
    const row: QuizCatalogRow = {
      quizKey: buildCanonicalQuizKey(identity),
      kind: identity.kind,
      formula,
      subjectId:
        identity.kind === "standard"
          ? identity.subjectId
          : identity.kind === "math-objective"
            ? "math"
            : identity.kind === "english"
              ? "english"
              : "bm",
      form: formNumber(identity.form),
      chapterKey,
      lang:
        identity.kind === "english"
          ? "en"
          : identity.kind === "bm-world"
            ? "bm"
            : identity.lang,
      totalQuestions: questions.length,
      ...counts,
      timerBonusAllowed: formula === "standard",
      maxXp: maxXpFor(formula, { ...counts, totalQuestions: questions.length }),
    };

    const existing = this.quizzes.get(row.quizKey);
    if (existing && JSON.stringify(existing) !== JSON.stringify(row)) {
      throw new Error(`Quiz key ${row.quizKey} resolves to two different question pools`);
    }
    this.quizzes.set(row.quizKey, row);

    for (const legacyKey of legacyKeys) {
      const pair = `${legacyKey}\u0000${row.quizKey}`;
      if (this.legacy.has(pair)) continue;
      this.legacy.add(pair);
      this.legacyRows.push({ legacyKey, quizKey: row.quizKey });
    }
  }

  result(): QuizCatalog {
    const byKey = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
    return {
      quizzes: [...this.quizzes.values()].sort((a, b) => byKey(a.quizKey, b.quizKey)),
      legacyKeys: [...this.legacyRows].sort(
        (a, b) => byKey(a.legacyKey, b.legacyKey) || byKey(a.quizKey, b.quizKey),
      ),
    };
  }
}

/** Standard chapter quizzes (quizzes.tsx `pool`). */
function collectStandardQuizzes(collector: CatalogCollector) {
  for (const subject of subjects) {
    const subjectId = subject.id;
    const bilingual = BILINGUAL_SUBJECTS.has(subjectId);
    for (const form of forms) {
      for (const lang of bilingual ? MATH_LANGS : [undefined]) {
        for (const chapter of getRegisteredSubjectChapters(subjectId, lang, form)) {
          const chapterQuestions = getChapterQuizQuestions(subjectId, form, chapter.key, lang);
          const sets =
            subjectId === "science" && form === "Form 3"
              ? (["A", "B"] as const).filter((set) =>
                  chapterQuestions.some((question) => question.set === set),
                )
              : [];
          for (const set of sets.length > 0 ? sets : [null]) {
            for (const difficulty of STANDARD_DIFFICULTIES) {
              const pool = chapterQuestions.filter((question) => {
                if (set && question.set !== set) return false;
                if (subjectId !== "sejarah" && difficulty !== "All") {
                  return question.difficulty === difficulty;
                }
                return true;
              });
              const legacyVariant = set
                ? `set-${set}-difficulty-${difficulty}`
                : `difficulty-${difficulty}`;
              collector.add(
                {
                  kind: "standard",
                  subjectId,
                  form,
                  chapterKey: chapter.key,
                  lang: lang ?? defaultQuizLanguage(subjectId),
                  set,
                  difficulty: subjectId === "sejarah" ? "All" : difficulty,
                },
                chapter.key,
                pool,
                [buildQuizKey({ subjectId, form, chapterKey: chapter.key, variant: legacyVariant })],
              );
            }
          }
        }
      }
    }
  }
}

/** Maths objective banks (quizzes.tsx `resolveMathObjectiveQuestions`). */
function collectMathObjectiveQuizzes(collector: CatalogCollector) {
  for (const pageForm of forms) {
    for (let chapterNumber = 1; chapterNumber <= 13; chapterNumber += 1) {
      const chapterKey = `Chapter ${chapterNumber}`;
      for (const objectiveId of MATH_OBJECTIVE_IDS) {
        for (const lang of MATH_LANGS) {
          // Maths always has a page language: the page asks for it first.
          for (const scienceLang of MATH_LANGS) {
            const { questions, bankLang } = resolveMathObjectiveQuestions({
              form: pageForm,
              chapter: chapterKey,
              mathObjectiveId: objectiveId,
              lang,
              scienceLang,
            });
            collector.add(
              {
                kind: "math-objective",
                form: questions[0]?.form ?? pageForm,
                chapterKey,
                lang: bankLang,
                objectiveId,
              },
              chapterKey,
              questions,
              [buildQuizKey({ subjectId: "math", form: pageForm, chapterKey, variant: objectiveId })],
            );
          }
        }
      }
    }
  }
}

/** English Paper 1 objective sets (quizzes.tsx English flows). */
function collectEnglishQuizzes(collector: CatalogCollector) {
  const byForm = [
    { form: "Form 1", sets: ENGLISH_QUIZ_SETS, questionsFor: getEnglishQuizSet },
    { form: "Form 2", sets: ENGLISH_QUIZ_SETS_F2, questionsFor: getEnglishQuizSetF2 },
    { form: "Form 3", sets: ENGLISH_QUIZ_SETS_F3, questionsFor: getEnglishQuizSetF3 },
  ] as const;
  for (const { form, sets, questionsFor } of byForm) {
    for (const set of sets) {
      const questions = (questionsFor as (id: string) => readonly { difficulty?: unknown }[])(
        set.id,
      );
      collector.add({ kind: "english", form, setId: set.id }, set.title, questions, [
        buildQuizKey({ subjectId: "english", form, chapterKey: "paper-1", variant: set.id }),
      ]);
    }
  }
}

/** BM World Kertas 1 objective sets (BMWorldPage.tsx). */
function collectBmWorldQuizzes(collector: CatalogCollector) {
  for (const formKey of [1, 2, 3] as const) {
    for (const set of BM_OBJECTIVE_SETS_BY_FORM[formKey]) {
      collector.add(
        { kind: "bm-world", form: `Form ${formKey}`, setId: set.id },
        set.id,
        set.questions as readonly { difficulty?: unknown }[],
        [
          buildQuizKey({
            subjectId: "bm",
            form: `Tingkatan ${formKey}`,
            chapterKey: "kertas-1-objektif",
            variant: set.id,
          }),
        ],
      );
    }
  }
}

export function buildQuizCatalog(): QuizCatalog {
  const collector = new CatalogCollector();
  collectStandardQuizzes(collector);
  collectMathObjectiveQuizzes(collector);
  collectEnglishQuizzes(collector);
  collectBmWorldQuizzes(collector);
  return collector.result();
}

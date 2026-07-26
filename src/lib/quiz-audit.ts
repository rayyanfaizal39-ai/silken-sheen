import { chapters, getChapterQuizQuestions } from "@/content/registry";
import type { QuizQuestion } from "@/data/content";
import {
  bmF1ObjektifKuiz1,
  bmF1ObjektifKuiz2,
  bmF1ObjektifKuiz3,
} from "@/data/bm-f1-objektif-quizzes";
import {
  bmF2ObjektifKuiz1,
  bmF2ObjektifKuiz2,
  bmF2ObjektifKuiz3,
} from "@/data/bm-f2-objektif-quizzes";
import {
  bmF3ObjektifKuiz1,
  bmF3ObjektifKuiz2,
  bmF3ObjektifKuiz3,
} from "@/data/bm-f3-objektif-quizzes";
import { ENGLISH_QUIZ_QUESTIONS, ENGLISH_QUIZ_SETS } from "@/data/english-f1-quiz-sets";
import { ENGLISH_QUIZ_QUESTIONS_F2, ENGLISH_QUIZ_SETS_F2 } from "@/data/english-f2-quiz-sets";
import { ENGLISH_QUIZ_QUESTIONS_F3, ENGLISH_QUIZ_SETS_F3 } from "@/data/english-f3-quiz-sets";
import {
  createQuizKey,
  defaultQuizLanguage,
  formNumber,
  validateQuizQuestions,
  type QuizIdentity,
} from "@/lib/quiz-identity";
import { normalizeQuizDifficulty } from "@/features/quiz/difficulty/quizDifficulty";

export type QuizAuditEntry = {
  identity: QuizIdentity;
  canonicalKey: string;
  source: string;
  questions: readonly QuizQuestion[];
  route: string;
};

export type QuizAuditIssue = {
  severity: "critical" | "warning";
  code:
    | "duplicate-key"
    | "metadata-mismatch"
    | "duplicate-question-id"
    | "identical-question-array"
    | "unreachable-route"
    | "multiple-sources"
    | "empty-set"
    | "invalid-difficulty"
    | "missing-difficulty-tier";
  canonicalKey: string;
  source: string;
  detail: string;
};

function entry(
  identity: QuizIdentity,
  source: string,
  questions: readonly QuizQuestion[],
  route: string,
): QuizAuditEntry {
  return {
    identity,
    canonicalKey: createQuizKey(identity),
    source,
    questions,
    route,
  };
}

function registryEntries(): QuizAuditEntry[] {
  return chapters.flatMap((chapter) => {
    const language = chapter.lang ?? defaultQuizLanguage(chapter.subjectId);
    const questions = chapter.quiz?.length
      ? chapter.quiz
      : getChapterQuizQuestions(chapter.subjectId, chapter.form, chapter.chapterKey, chapter.lang);
    if (!questions.length) return [];
    return [
      entry(
        {
          subject: chapter.subjectId,
          form: formNumber(chapter.form),
          chapter: chapter.chapterKey,
          language,
          set: "default",
        },
        `src/content/registry.ts#${chapter.id}`,
        questions,
        `/quizzes?subject=${chapter.subjectId}&form=${formNumber(chapter.form)}&chapter=${encodeURIComponent(chapter.chapterKey)}`,
      ),
    ];
  });
}

function englishEntries(): QuizAuditEntry[] {
  const groups: Array<{
    form: 1 | 2 | 3;
    sets: ReadonlyArray<{ id: string; paperId: string }>;
    questions: Record<string, readonly QuizQuestion[]>;
    source: string;
  }> = [
    {
      form: 1 as const,
      sets: ENGLISH_QUIZ_SETS,
      questions: ENGLISH_QUIZ_QUESTIONS,
      source: "src/content/form1/english/quizzes/paper-1-sets.ts",
    },
    {
      form: 2 as const,
      sets: ENGLISH_QUIZ_SETS_F2,
      questions: ENGLISH_QUIZ_QUESTIONS_F2,
      source: "src/data/english-f2-quiz-sets.ts",
    },
    {
      form: 3 as const,
      sets: ENGLISH_QUIZ_SETS_F3,
      questions: ENGLISH_QUIZ_QUESTIONS_F3,
      source: "src/data/english-f3-quiz-sets.ts",
    },
  ];

  return groups.flatMap((group) =>
    group.sets.map((set) =>
      entry(
        {
          subject: "english",
          form: group.form,
          chapter: "Paper 1 Quizzes",
          language: "en",
          set: set.id,
        },
        group.source,
        group.questions[set.id],
        `/quizzes?subject=english&form=${group.form}&set=${set.id}`,
      ),
    ),
  );
}

function bmEntries(): QuizAuditEntry[] {
  const groups = [
    { form: 1 as const, sets: [bmF1ObjektifKuiz1, bmF1ObjektifKuiz2, bmF1ObjektifKuiz3] },
    { form: 2 as const, sets: [bmF2ObjektifKuiz1, bmF2ObjektifKuiz2, bmF2ObjektifKuiz3] },
    { form: 3 as const, sets: [bmF3ObjektifKuiz1, bmF3ObjektifKuiz2, bmF3ObjektifKuiz3] },
  ];

  return groups.flatMap((group) =>
    group.sets.map((questions, index) =>
      entry(
        {
          subject: "bm",
          form: group.form,
          chapter: "Kertas 1 Bahagian A",
          language: "bm",
          set: index + 1,
        },
        `src/data/bm-f${group.form}-objektif-quizzes.ts`,
        questions,
        `/quizzes?subject=bm&form=${group.form}&set=${index + 1}`,
      ),
    ),
  );
}

export function getQuizAuditEntries() {
  return [...registryEntries(), ...englishEntries(), ...bmEntries()];
}

function signature(questions: readonly QuizQuestion[]) {
  return questions.map((question) => question.question.trim()).join("\u241e");
}

export function auditQuizRegistry() {
  const entries = getQuizAuditEntries();
  const issues: QuizAuditIssue[] = [];
  const byKey = new Map<string, QuizAuditEntry[]>();
  const questionOwners = new Map<string, Set<string>>();
  const bySignature = new Map<string, QuizAuditEntry[]>();

  for (const auditEntry of entries) {
    const keyEntries = byKey.get(auditEntry.canonicalKey) ?? [];
    keyEntries.push(auditEntry);
    byKey.set(auditEntry.canonicalKey, keyEntries);

    if (auditEntry.questions.length === 0) {
      issues.push({
        severity: "critical",
        code: "empty-set",
        canonicalKey: auditEntry.canonicalKey,
        source: auditEntry.source,
        detail: "Registered quiz set contains no questions.",
      });
    }

    for (const mismatch of validateQuizQuestions(auditEntry.identity, auditEntry.questions)) {
      issues.push({
        severity: "critical",
        code: "metadata-mismatch",
        canonicalKey: auditEntry.canonicalKey,
        source: auditEntry.source,
        detail: `${mismatch.questionId}: ${mismatch.code} expected=${mismatch.expected} actual=${mismatch.actual}`,
      });
    }

    const difficultyTiers = new Set<string>();
    for (const question of auditEntry.questions) {
      const normalized = normalizeQuizDifficulty(question.difficulty);
      if (normalized) {
        difficultyTiers.add(normalized);
      } else {
        issues.push({
          severity: "critical",
          code: "invalid-difficulty",
          canonicalKey: auditEntry.canonicalKey,
          source: auditEntry.source,
          detail: `${question.id}: unsupported difficulty ${String(question.difficulty)}.`,
        });
      }
    }
    for (const tier of ["easy", "medium", "hard"] as const) {
      if (difficultyTiers.has(tier)) continue;
      issues.push({
        severity: "warning",
        code: "missing-difficulty-tier",
        canonicalKey: auditEntry.canonicalKey,
        source: auditEntry.source,
        detail: `Quiz has no ${tier} questions; no content was invented or reclassified.`,
      });
    }

    for (const question of auditEntry.questions) {
      const owners = questionOwners.get(question.id) ?? new Set<string>();
      owners.add(auditEntry.canonicalKey);
      questionOwners.set(question.id, owners);
    }

    if (auditEntry.questions.length > 0) {
      const value = signature(auditEntry.questions);
      const matching = bySignature.get(value) ?? [];
      matching.push(auditEntry);
      bySignature.set(value, matching);
    }

    if (auditEntry.identity.set === "default") {
      const resolved = getChapterQuizQuestions(
        auditEntry.identity.subject,
        `Form ${auditEntry.identity.form}`,
        String(auditEntry.identity.chapter),
        auditEntry.identity.language === "en" ? undefined : auditEntry.identity.language,
      );
      if (resolved.length === 0) {
        issues.push({
          severity: "critical",
          code: "unreachable-route",
          canonicalKey: auditEntry.canonicalKey,
          source: auditEntry.source,
          detail: `Route resolves to no validated questions: ${auditEntry.route}`,
        });
      }
    }
  }

  for (const [canonicalKey, duplicates] of byKey) {
    if (duplicates.length <= 1) continue;
    issues.push({
      severity: "critical",
      code: "duplicate-key",
      canonicalKey,
      source: duplicates.map((item) => item.source).join(", "),
      detail: `${duplicates.length} quiz sources share one canonical key.`,
    });
  }

  for (const [questionId, owners] of questionOwners) {
    if (owners.size <= 1) continue;
    issues.push({
      severity: "critical",
      code: "duplicate-question-id",
      canonicalKey: Array.from(owners).join(", "),
      source: "registry",
      detail: `${questionId} is used by unrelated quizzes.`,
    });
  }

  for (const duplicates of bySignature.values()) {
    const keys = new Set(duplicates.map((item) => item.canonicalKey));
    if (keys.size <= 1) continue;
    issues.push({
      severity: "warning",
      code: "identical-question-array",
      canonicalKey: Array.from(keys).join(", "),
      source: duplicates.map((item) => item.source).join(", "),
      detail: "Different canonical quizzes contain an identical ordered question array.",
    });
  }

  return {
    entries,
    issues,
    criticalIssues: issues.filter((issue) => issue.severity === "critical"),
  };
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * AcadeMY Feature Flags — plan → feature map
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Single source of truth for "which plan unlocks which feature." This file
 * only defines data — no gating logic lives here (see src/lib/feature-access.ts
 * for `hasFeature()`), and nothing in the app currently *enforces* these
 * flags yet (see the TODO(premium-gating) markers below and in
 * feature-access.ts). Payment/billing is intentionally out of scope here:
 * this is the flag architecture that payment gating will plug into later.
 *
 * Business rule this file encodes: Explorer and Captain have the SAME
 * student-learning quality — `student_learning` and `quiz_history` are
 * identical for both. Captain's only addition is parent-facing visibility
 * (`parent_dashboard`, `parent_reports`, `parent_analytics`). Never special-
 * case "captain" in code — always express this as Captain's feature set
 * being a superset of Explorer's (see PLAN_FEATURES below).
 */

export const PLANS = ["basic", "explorer", "captain", "teacher", "school", "enterprise"] as const;
export type Plan = (typeof PLANS)[number];

export const FEATURES = [
  "student_learning",
  "parent_dashboard",
  "parent_reports",
  "parent_analytics",
  "quiz_history",
  "admin_upload_center",
  "ai_quiz_generation",
  "teacher_dashboard",
  "school_dashboard",
  "marketplace",
] as const;
export type Feature = (typeof FEATURES)[number];

// ─── Feature sets, composed from smaller sets — never hardcoded per plan ──

/**
 * The shared student-learning core. Explorer and Captain both get exactly
 * this — Captain adds parent-facing features on top, it does NOT get a
 * "better" version of student learning. See module header business rule.
 */
const STUDENT_LEARNING_CORE: readonly Feature[] = ["student_learning", "quiz_history"];

/** What Captain adds on top of the student-learning core: parent visibility only. */
const PARENT_VISIBILITY: readonly Feature[] = ["parent_dashboard", "parent_reports", "parent_analytics"];

/**
 * What Teacher adds on top of the student-learning core.
 *
 * TODO(smart-quiz-memory): `ai_quiz_generation` is the future flag that
 * will gate "generate new quiz questions from admin-uploaded sources."
 * Planned architecture (see also the quiz-engine TODO in
 * src/routes/quizzes.tsx and the weak-topic TODO in src/lib/analytics.ts):
 *   - content_sources: uploaded source documents (PDFs, textbooks, exam
 *     papers), populated via the admin_upload_center feature below —
 *     id, uploaded_by, subject_id, title, file_url/storage_path, status
 *     (e.g. pending/processed), created_at.
 *   - question_bank: questions generated (by AI, gated by this flag) from
 *     content_sources rows, plus hand-authored questions — tagged with
 *     subject_id/chapter_key/topic_id/difficulty/source_id so generated
 *     questions are traceable back to the source they came from.
 * No AI generation is implemented yet — this flag exists so the future
 * gate has a name, not because generation exists today.
 */
const TEACHER_TOOLS: readonly Feature[] = ["teacher_dashboard", "ai_quiz_generation"];

/**
 * What School adds on top of Teacher.
 *
 * TODO(smart-quiz-memory): `admin_upload_center` is the future flag that
 * will gate the not-yet-built upload UI where an admin/teacher uploads
 * PDFs/textbooks/exam papers. Those uploads are planned to land in a
 * `content_sources` table (see the ai_quiz_generation TODO above on
 * TEACHER_TOOLS for its shape), which `ai_quiz_generation` then reads from
 * to produce question_bank rows. No upload UI or table exists yet — this
 * flag exists so the future gate has a name, not because uploading exists
 * today (see also src/lib/feature-access.ts's admin_upload_center
 * TODO(premium-gating) for where the access check itself should go).
 */
const SCHOOL_TOOLS: readonly Feature[] = ["school_dashboard", "admin_upload_center"];

/**
 * TODO(premium-gating): Basic is intentionally NOT `student_learning` — it
 * gets a limited/preview experience instead (e.g. a capped number of free
 * chapters or quizzes), which is a *content-level* limit, not an on/off
 * feature flag, so it isn't modeled as a Feature here. When preview-content
 * gating is implemented, it should live alongside — not inside —
 * hasFeature(), since "how much" is a different question from "can they
 * access this feature at all."
 */
const BASIC_FEATURES: readonly Feature[] = [];

// ─── Plan → Feature map ─────────────────────────────────────────────────
// Each plan is expressed as a composition of the sets above, per the
// business rule in the module header. Add a new plan or feature here only
// — never branch on plan name anywhere else in the codebase (use
// hasFeature() from src/lib/feature-access.ts instead).

export const PLAN_FEATURES: Record<Plan, readonly Feature[]> = {
  basic: BASIC_FEATURES,

  // Explorer: student-learning core only.
  explorer: [...STUDENT_LEARNING_CORE],

  // Captain: explorer + parent visibility. Same learning quality as
  // Explorer — see STUDENT_LEARNING_CORE re-use, not a separate/better set.
  captain: [...STUDENT_LEARNING_CORE, ...PARENT_VISIBILITY],

  // Teacher: explorer core + teacher tools.
  teacher: [...STUDENT_LEARNING_CORE, ...TEACHER_TOOLS],

  // School: teacher + school-wide tools.
  school: [...STUDENT_LEARNING_CORE, ...TEACHER_TOOLS, ...SCHOOL_TOOLS],

  // Enterprise: everything, including features no other plan has yet
  // (e.g. marketplace) — kept as the single "all features" plan rather
  // than listing every Feature by hand, so a newly-added Feature is
  // automatically included here without a code change.
  enterprise: FEATURES,
};

// TODO(premium-gating): once payment/billing exists, `Plan` should be
// derived from the student's actual subscription (e.g. `profiles.plan` in
// Supabase, extended beyond today's 'free' | 'paid' to the plans above)
// instead of being passed around by callers. See src/lib/feature-access.ts
// for where that resolution should happen.

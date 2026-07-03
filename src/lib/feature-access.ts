/**
 * ═══════════════════════════════════════════════════════════════════════
 * AcadeMY Feature Access
 * ═══════════════════════════════════════════════════════════════════════
 *
 * The only place feature-gating questions should be asked from. Never
 * write `if (plan === "captain")` (or any other plan-name check) anywhere
 * else in the codebase — always go through `hasFeature()` (or the small
 * helpers below) so the plan → feature relationship stays defined in one
 * place: src/config/features.ts.
 *
 * IMPORTANT: nothing in the app currently calls these functions to *block*
 * access — this file is the flag-checking architecture that
 * payment/billing gating will plug into later. Every call site that should
 * eventually enforce a feature is marked `TODO(premium-gating)`. Until
 * that's wired up, treat this as available-but-not-yet-enforced.
 */

import { PLAN_FEATURES, type Feature, type Plan } from "@/config/features";

/**
 * Returns whether `userPlan` unlocks `feature`.
 *
 * Usage:
 *   if (hasFeature(userPlan, "parent_dashboard")) { ... }
 *
 * Never inline the plan → feature relationship at the call site (e.g.
 * `plan === "captain" || plan === "enterprise"`) — that duplicates
 * knowledge that belongs in src/config/features.ts and will drift the
 * moment a new plan is added. If a call site needs that logic, it means a
 * new feature belongs in PLAN_FEATURES instead.
 */
export function hasFeature(userPlan: Plan | null | undefined, feature: Feature): boolean {
  if (!userPlan) return false;
  return PLAN_FEATURES[userPlan].includes(feature);
}

/** Returns every feature `userPlan` unlocks. Useful for debug panels / admin views. */
export function getFeaturesForPlan(userPlan: Plan | null | undefined): readonly Feature[] {
  if (!userPlan) return [];
  return PLAN_FEATURES[userPlan];
}

/** True when `userPlan` unlocks every feature in `features`. */
export function hasAllFeatures(userPlan: Plan | null | undefined, features: readonly Feature[]): boolean {
  return features.every((f) => hasFeature(userPlan, f));
}

/** True when `userPlan` unlocks at least one feature in `features`. */
export function hasAnyFeature(userPlan: Plan | null | undefined, features: readonly Feature[]): boolean {
  return features.some((f) => hasFeature(userPlan, f));
}

// ─── Resolving a plan for the current user ─────────────────────────────
//
// TODO(premium-gating): `profiles.plan` in Supabase currently only stores
// 'free' | 'paid' (see supabase/schema.sql) — it does not yet have the six
// plans this module works with (basic/explorer/captain/teacher/school/
// enterprise). Once billing introduces real plan assignment, add a
// `resolveUserPlan(profile): Plan` here (or wherever the authenticated
// profile is loaded) that maps the stored plan to one of these six values,
// so callers can do `hasFeature(resolveUserPlan(profile), "quiz_history")`
// instead of passing a Plan around by hand. Until then, callers pass a
// Plan explicitly (e.g. hardcoded "explorer" during development/testing,
// per this task's "do not block testing yet" instruction).

// ─── Gating call sites — not yet enforced ──────────────────────────────
//
// TODO(premium-gating): src/routes/parent-dashboard.tsx and
// src/routes/parent.tsx should call
// `hasFeature(userPlan, "parent_dashboard")` (and "parent_reports" /
// "parent_analytics" for the specific panels within them) before rendering
// parent-facing content, redirecting or showing an upsell otherwise.
//
// TODO(premium-gating): src/lib/analytics.ts's quiz-history-backed reads
// (see getStudentAnalytics) should confirm `hasFeature(userPlan,
// "quiz_history")` before querying the `quiz_history` table.
//
// TODO(premium-gating): src/routes/admin.tsx / admin-only server functions
// should additionally check `hasFeature(userPlan, "admin_upload_center")`
// for upload-specific actions, on top of the existing role === "admin" guard.
//
// TODO(premium-gating): any future teacher/school dashboard routes should
// gate on "teacher_dashboard" / "school_dashboard" respectively before the
// route's beforeLoad resolves.
//
// None of the above are wired up yet — intentionally, per this task's
// scope (no payment integration, no test-blocking yet).

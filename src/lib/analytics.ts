/**
 * ═══════════════════════════════════════════════════════════════════════
 * AcadeMY Analytics Layer
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Single shared source of truth for student learning analytics. This module
 * is the ONLY place analytics numbers should be derived — every surface
 * (student dashboard, parent dashboard, weekly/monthly parent emails,
 * future admin reports) should call `getStudentAnalytics()` rather than
 * recomputing stats itself, so numbers stay consistent everywhere.
 *
 * This module is read-only: it never mutates XP, rank, streak, quiz,
 * flashcard, or companion state. It only *reads* progress data that the
 * existing gamification system (`@/hooks/use-progress`) already owns, and
 * derives presentation-ready analytics from it using the existing
 * `@/lib/tracker` algorithms.
 *
 * Data sourcing strategy:
 *   1. If the caller already has the student's live `Progress` object
 *      (e.g. a signed-in student's own dashboard via `useProgress()`),
 *      pass it in — this is the most accurate, zero-latency path. Every
 *      field is real (`coreDataSource: "live"`, `quizDataSource: "live"`).
 *   2. Otherwise, for a real (UUID) studentId, this module reads the
 *      student's row from Supabase `user_progress` (+ `profiles` for the
 *      display name, + `quiz_history` for quiz-by-quiz detail) — see
 *      supabase/schema.sql and
 *      supabase/migrations/20260703120000_quiz_history.sql. Every column/
 *      row that exists is read for real (`coreDataSource: "supabase"`,
 *      `quizDataSource: "quiz_history"` once that student has rows there).
 *   3. Non-UUID ids (demos, or Supabase not configured / no row / no
 *      quiz_history rows yet) fall back to realistic MOCK data so every
 *      consuming screen still renders something meaningful instead of a
 *      blank state (`coreDataSource` / `quizDataSource`: "mock").
 *
 * VERIFIED LIVE SCHEMA (via `mcp__supabase__list_tables`, not assumed): the
 * project has `user_progress`, `profiles`, `payments`, `knowledge_engine`,
 * and `quiz_history` (added by the migration above). There is still no
 * `xp_events` table or a chapter/flashcard event log, so two things remain
 * placeholder even for a real signed-in student on the Supabase-only path:
 *   - `weeklyXp` (needs `xp_events`: user_id, amount, created_at)
 *   - `chaptersCompletedThisWeek` / `flashcardsReviewedThisWeek` (needs a
 *     timestamped event log — `chapter_activity` / `card_mastery` are real
 *     but only store current state, not a history of when each event
 *     happened; `quiz_history` only logs quiz attempts, not these two)
 * Everything else that depends on quiz-by-quiz detail — quizzes completed
 * this week, subject average scores, best/weakest subject, weak topics,
 * recommended revision, mission insight — is now genuinely real
 * (`quizDataSource: "quiz_history"`) once `quiz_history` has rows for that
 * student. `coreDataSource` (total XP, streak, rank, companion stage,
 * subject XP totals) is real for any signed-in student regardless.
 *
 * Search this file for "TODO(supabase)" for the exact query each remaining
 * placeholder should become once its table exists.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  getRank,
  getChessRating,
  getCompanionStageForXp,
  COMPANION_STAGES,
  QUIZ_PASS_BONUS_XP,
  QUIZ_PASS_PCT,
  QUIZ_HISTORY_CAP,
  type Progress,
  type QuizResult,
  type RecentActivity,
  type ChapterActivity,
  type CardMasteryRecord,
} from "@/hooks/use-progress";
import { analyzeProgress, withinDays, type SubjectStat, type WeakSpot } from "@/lib/tracker";
import { subjects } from "@/data/content";

// ─── Public types ───────────────────────────────────────────────────────

export interface SubjectPerformance {
  subjectId: string;
  name: string;
  avgScore: number;
  attempts: number;
  /** Recent avg − earlier avg. Positive = improving. */
  trend: number;
}

export interface WeeklyActivity {
  /** Single-letter weekday label, e.g. "M". */
  day: string;
  /** ISO date (YYYY-MM-DD) this bucket represents. */
  date: string;
  quizzesCompleted: number;
  chaptersCompleted: number;
  flashcardsReviewed: number;
}

export interface WeakTopic {
  subjectId: string;
  subjectName: string;
  chapterKey: string;
  chapterLabel: string;
  avgScore: number;
  attempts: number;
}

export interface ParentMissionInsight {
  /** Short, upbeat one-liner suitable for an email subject or dashboard headline. */
  headline: string;
  /** 1–2 sentence plain-language summary of how the week/month went. */
  summary: string;
  /** Concrete next step, phrased for a parent to action or discuss with their child. */
  recommendation: string;
  tone: "great" | "steady" | "needs-attention";
}

export interface StudentAnalytics {
  studentId: string;
  studentName: string;
  /** ISO timestamp this analytics snapshot was generated. */
  generatedAt: string;

  // ── Core progression ──
  totalXp: number;
  /** Approximate XP earned in the last 7 days (see weeklyXp note below). */
  weeklyXp: number;
  studyStreak: number;

  rankId: string;
  rankName: string;
  rankEmoji: string;
  rankColor: string;
  chessRating: number;

  companionId: string;
  companionStage: string;
  companionStageName: string;

  // ── This week ──
  quizzesCompletedThisWeek: number;
  chaptersCompletedThisWeek: number;
  flashcardsReviewedThisWeek: number;

  // ── Subject-level ──
  subjectPerformance: SubjectPerformance[];
  bestSubject: SubjectPerformance | null;
  weakestSubject: SubjectPerformance | null;
  weakTopics: WeakTopic[];

  // ── Guidance ──
  recommendedRevision: string[];
  studyConsistency: WeeklyActivity[];
  missionInsight: ParentMissionInsight;

  /**
   * Where totalXp / weeklyXp / studyStreak / rank / companion / subject XP
   * came from. "live" = passed-in Progress from useProgress(). "supabase" =
   * read for real from the user_progress + profiles tables. "mock" = no
   * real row found (demo id, unconfigured, or row missing).
   */
  coreDataSource: "live" | "supabase" | "mock";
  /**
   * Where quiz-history-derived analytics came from: quizzesCompletedThisWeek,
   * subjectPerformance, bestSubject, weakestSubject, weakTopics,
   * recommendedRevision, and missionInsight.
   *   - "live" = real local quiz history from useProgress() (the signed-in
   *     student's own browser session).
   *   - "quiz_history" = real rows read from the Supabase `quiz_history`
   *     table (see supabase/migrations/20260703120000_quiz_history.sql) —
   *     used on the Supabase-only path (no local Progress in hand).
   *   - "mock" = placeholder, because neither of the above was available
   *     (demo id, unconfigured, no rows yet, or the query failed).
   * Note: chaptersCompletedThisWeek / flashcardsReviewedThisWeek are NOT
   * covered by quiz_history (it only logs quiz attempts) — they stay
   * sourced from recentActivity, which remains a mock proxy on the
   * "quiz_history" path until chapter/flashcard events get their own log.
   */
  quizDataSource: "live" | "quiz_history" | "mock";
  /**
   * @deprecated Coarse flag kept for backward compatibility — true unless
   * both `coreDataSource` and `quizDataSource` are "live". Prefer the two
   * fields above for anything that needs to know *which* part is mocked.
   */
  isMockData: boolean;
}

// ─── Mock fallback data ─────────────────────────────────────────────────
// Used whenever real per-student data isn't available yet (Supabase not
// configured, no synced row, or the caller has no live Progress to pass
// in). Keeps every screen demoable and never blank.

const MOCK_STUDENT_ID = "demo-student";
const MOCK_STUDENT_NAME = "Ahmad Rayyan";

function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

const MOCK_QUIZ_HISTORY: QuizResult[] = [
  { id: "mq1", subjectId: "math", chapterKey: "algebra-3", scorePct: 88, correct: 22, total: 25, date: daysAgoIso(0) },
  { id: "mq2", subjectId: "science", chapterKey: "tidal-forces", scorePct: 75, correct: 15, total: 20, date: daysAgoIso(1) },
  { id: "mq3", subjectId: "bm", chapterKey: "karangan", scorePct: 82, correct: 41, total: 50, date: daysAgoIso(2) },
  { id: "mq4", subjectId: "sejarah", chapterKey: "tokoh-sejarah", scorePct: 64, correct: 16, total: 25, date: daysAgoIso(3) },
  { id: "mq5", subjectId: "english", chapterKey: "essay-writing", scorePct: 91, correct: 20, total: 22, date: daysAgoIso(4) },
  { id: "mq6", subjectId: "geography", chapterKey: "map-reading", scorePct: 70, correct: 14, total: 20, date: daysAgoIso(5) },
  { id: "mq7", subjectId: "math", chapterKey: "algebra-2", scorePct: 80, correct: 20, total: 25, date: daysAgoIso(8) },
];

const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  { id: "ra1", subjectId: "math", chapterKey: "algebra-3", type: "quiz", label: "Completed Quiz: Algebra Chapter 3", timestamp: Date.now() - 2 * 3_600_000 },
  { id: "ra2", subjectId: "science", chapterKey: "tidal-forces", type: "notes", label: "Cikgu AI session: Tidal Forces", timestamp: Date.now() - 4 * 3_600_000 },
  { id: "ra3", subjectId: "sejarah", chapterKey: "tokoh-sejarah", type: "flashcards", label: "Flashcard review: Tokoh Sejarah", timestamp: Date.now() - 26 * 3_600_000 },
  { id: "ra4", subjectId: "english", chapterKey: "essay-writing", type: "quiz", label: "Perfect score: Essay Writing Test", timestamp: Date.now() - 48 * 3_600_000 },
];

const MOCK_PROGRESS: Progress = {
  xp: 1840,
  streak: 12,
  lastActive: new Date().toISOString().slice(0, 10),
  quizzesTaken: 34,
  badges: ["xp1000", "streak7"],
  favorites: [],
  subjectXp: { math: 420, science: 310, bm: 280, sejarah: 190, english: 260, geography: 150 },
  chapterActivity: {},
  missions: undefined,
  cardMastery: {},
  recentActivity: MOCK_RECENT_ACTIVITY,
  companion: { id: "nova", stage: "cadet", level: 3, selectedAt: daysAgoIso(60) },
  tokens: 0,
  avatar: { helmet: "helmet-classic", suit: "suit-molly", visor: "visor-aqua", pet: "pet-none", owned: [] },
  quizHistory: MOCK_QUIZ_HISTORY,
  parentEmail: undefined,
  reportCadence: "weekly",
};

// ─── Internal helpers ───────────────────────────────────────────────────

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function toSubjectPerformance(stat: SubjectStat): SubjectPerformance {
  return {
    subjectId: stat.subjectId,
    name: stat.name,
    avgScore: stat.avgScore,
    attempts: stat.attempts,
    trend: stat.trend,
  };
}

/**
 * TODO(smart-quiz-memory): weak-topic detection is CHAPTER-level today —
 * `spot` (a `WeakSpot` from lib/tracker.ts) is keyed by
 * `${subjectId}::${chapterKey}`, so "weak" means "this whole chapter's
 * quiz average is low," not "this specific topic/skill within the chapter
 * is low." A chapter can cover several distinct topics; a student might be
 * strong on 3 of them and weak on 1, and today that gets averaged away.
 *
 * Planned future architecture (see also the quiz-engine TODO in
 * src/routes/quizzes.tsx and the admin_upload_center TODO in
 * src/lib/feature-access.ts):
 *   - question_bank: questions tagged with a topic_id (finer-grained than
 *     chapter_key), populated from admin-uploaded sources (content_sources)
 *     as well as hand-authored content.
 *   - question_attempts: per-question attempt log (user_id, question_id,
 *     topic_id, correct, created_at). With this, weak-topic detection can
 *     move from "average score across a whole chapter" to "average score
 *     per topic_id," pinpointing the exact skill to revise instead of an
 *     entire chapter.
 *   - Because question_bank can hold many *different* questions for the
 *     same topic, analytics can also measure TRUE improvement — same
 *     topic_id, different question_id each attempt — rather than a score
 *     possibly inflated by the student memorizing one repeated question.
 * Nothing below is implemented yet — this stays a straight chapter-level
 * mapping until question_bank/question_attempts exist.
 */
function toWeakTopic(spot: WeakSpot): WeakTopic {
  return {
    subjectId: spot.subjectId,
    subjectName: spot.subjectName,
    chapterKey: spot.chapterKey,
    chapterLabel: spot.chapterLabel,
    avgScore: spot.avgScore,
    attempts: spot.attempts,
  };
}

/** Filters recent-activity events to those within the last `days` days. */
function recentActivityWithinDays(activity: RecentActivity[], days: number): RecentActivity[] {
  const cutoff = Date.now() - days * 86_400_000;
  return activity.filter((a) => a.timestamp >= cutoff);
}

/**
 * Approximates XP earned in the last 7 days from passed quizzes.
 *
 * There is currently no server-side XP ledger with timestamps — `Progress.xp`
 * is only a running total. This is a best-effort estimate using the same
 * `QUIZ_PASS_BONUS_XP` constant the real XP system awards on a passed quiz.
 *
 * TODO(supabase): replace with a real query once an `xp_events` table
 * (user_id, amount, source, created_at) is introduced, e.g.:
 *   select sum(amount) from xp_events where user_id = :studentId
 *   and created_at >= now() - interval '7 days'
 */
function estimateWeeklyXp(quizHistory: QuizResult[]): number {
  const recent = withinDays(quizHistory, 7);
  return recent.filter((r) => r.scorePct >= QUIZ_PASS_PCT).length * QUIZ_PASS_BONUS_XP;
}

/**
 * Builds a 7-day study-consistency series from quiz history (real, has
 * timestamps) and recent-activity events (approximate proxy for chapters
 * read / flashcards reviewed, since neither of those currently records a
 * per-event timestamp in `Progress.chapterActivity` / `cardMastery`).
 *
 * TODO(supabase): once chapter completions and flashcard reviews are logged
 * as timestamped events server-side, replace the `recentActivity` proxy
 * below with direct counts from those tables, grouped by day.
 */
function buildStudyConsistency(quizHistory: QuizResult[], recentActivity: RecentActivity[]): WeeklyActivity[] {
  const days: WeeklyActivity[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000);
    const iso = d.toISOString().slice(0, 10);
    days.push({ day: WEEKDAY_LABELS[d.getDay()], date: iso, quizzesCompleted: 0, chaptersCompleted: 0, flashcardsReviewed: 0 });
  }
  const indexByDate = new Map(days.map((d, i) => [d.date, i]));

  for (const r of quizHistory) {
    const iso = new Date(r.date).toISOString().slice(0, 10);
    const idx = indexByDate.get(iso);
    if (idx !== undefined) days[idx].quizzesCompleted += 1;
  }

  for (const a of recentActivity) {
    const iso = new Date(a.timestamp).toISOString().slice(0, 10);
    const idx = indexByDate.get(iso);
    if (idx === undefined) continue;
    if (a.type === "notes") days[idx].chaptersCompleted += 1;
    else if (a.type === "flashcards") days[idx].flashcardsReviewed += 1;
  }

  return days;
}

function buildMissionInsight(
  studentFirstName: string,
  overallAvg: number,
  totalQuizzes: number,
  streak: number,
  best: SubjectPerformance | null,
  weakest: SubjectPerformance | null,
  recommendation: string,
): ParentMissionInsight {
  if (totalQuizzes === 0) {
    return {
      headline: `${studentFirstName} hasn't started this week's missions yet`,
      summary: `No quizzes completed in this period. A short 10-minute quiz will unlock this week's insights.`,
      recommendation: "Encourage a quick warm-up quiz today to keep the streak alive.",
      tone: "needs-attention",
    };
  }

  const tone: ParentMissionInsight["tone"] = overallAvg >= 85 ? "great" : overallAvg >= 60 ? "steady" : "needs-attention";

  const headline =
    tone === "great"
      ? `${studentFirstName} is having an excellent week! 🚀`
      : tone === "steady"
        ? `${studentFirstName} is making steady progress`
        : `${studentFirstName} could use a bit of extra support`;

  const streakLine = streak > 0 ? ` and is on a ${streak}-day study streak` : "";
  const bestLine = best ? ` ${studentFirstName} is strongest in ${best.name} (${best.avgScore}%).` : "";
  const weakLine = weakest && weakest.subjectId !== best?.subjectId ? ` ${weakest.name} needs the most attention (${weakest.avgScore}%).` : "";

  return {
    headline,
    summary: `Averaging ${overallAvg}% across ${totalQuizzes} quiz${totalQuizzes !== 1 ? "zes" : ""} this period${streakLine}.${bestLine}${weakLine}`,
    recommendation,
    tone,
  };
}

function buildRecommendedRevision(weakTopics: WeakTopic[]): string[] {
  if (weakTopics.length === 0) {
    return ["No weak topics detected — keep exploring new chapters to stay ahead."];
  }
  return weakTopics.map(
    (w) => `Revise ${w.subjectName} — "${w.chapterLabel}" (averaging ${w.avgScore}% over ${w.attempts} attempt${w.attempts !== 1 ? "s" : ""})`,
  );
}

/**
 * Core, synchronous transform: Progress (from useProgress, or reconstructed
 * from Supabase / mock data) → StudentAnalytics. This is where every
 * analytics field is actually calculated, using the same algorithms the
 * rest of the app already relies on (`analyzeProgress` from lib/tracker.ts,
 * `getRank` / `getChessRating` / `getCompanionStageForXp` from use-progress.ts)
 * so numbers never drift from what the student sees on their own dashboard.
 */
function computeAnalyticsFromProgress(
  progress: Progress,
  studentId: string,
  studentName: string,
  coreDataSource: "live" | "supabase" | "mock",
  quizDataSource: "live" | "quiz_history" | "mock",
  windowDays: 7 | 30 = 7,
): StudentAnalytics {
  const quizHistory = progress.quizHistory ?? [];
  const recentActivity = progress.recentActivity ?? [];
  const windowed = analyzeProgress(withinDays(quizHistory, windowDays));

  const rank = getRank(progress.xp);
  const companionStageId = getCompanionStageForXp(progress.xp);
  const companionStage = COMPANION_STAGES.find((s) => s.id === companionStageId) ?? COMPANION_STAGES[0];

  const subjectPerformance = windowed.subjectStats
    .map(toSubjectPerformance)
    .sort((a, b) => b.avgScore - a.avgScore);
  const bestSubject = subjectPerformance[0] ?? null;
  const weakestSubject = subjectPerformance[subjectPerformance.length - 1] ?? null;
  const weakTopics = windowed.weakSpots.map(toWeakTopic);

  const recentWeek = withinDays(quizHistory, 7);
  const recentActivityWeek = recentActivityWithinDays(recentActivity, 7);

  const studentFirstName = studentName.split(" ")[0] ?? studentName;

  return {
    studentId,
    studentName,
    generatedAt: new Date().toISOString(),

    totalXp: progress.xp,
    weeklyXp: estimateWeeklyXp(quizHistory),
    studyStreak: progress.streak,

    rankId: rank.id,
    rankName: rank.name,
    rankEmoji: rank.emoji,
    rankColor: rank.color,
    chessRating: getChessRating(progress.xp),

    companionId: progress.companion?.id ?? "nova",
    companionStage: companionStage.id,
    companionStageName: companionStage.name,

    quizzesCompletedThisWeek: recentWeek.length,
    chaptersCompletedThisWeek: recentActivityWeek.filter((a) => a.type === "notes").length,
    flashcardsReviewedThisWeek: recentActivityWeek.filter((a) => a.type === "flashcards").length,

    subjectPerformance,
    bestSubject,
    weakestSubject,
    weakTopics,

    recommendedRevision: buildRecommendedRevision(weakTopics),
    studyConsistency: buildStudyConsistency(quizHistory, recentActivity),
    missionInsight: buildMissionInsight(
      studentFirstName,
      windowed.overallAvg,
      windowed.totalQuizzes,
      progress.streak,
      bestSubject,
      weakestSubject,
      windowed.recommendation,
    ),

    coreDataSource,
    quizDataSource,
    isMockData: coreDataSource !== "live" || quizDataSource !== "live",
  };
}

/**
 * Attempts to load a student's saved progress row from Supabase. Every
 * column that genuinely exists on `user_progress` is read for real —
 * nothing here is invented.
 *
 * `quizHistory` defaults to `MOCK_QUIZ_HISTORY` here — this function only
 * knows about `user_progress`, which has no quiz-by-quiz columns. The
 * caller (`getStudentAnalytics`) is responsible for overwriting it with a
 * real read via `fetchQuizHistoryFromSupabase()` when available; that
 * two-step split keeps this function's job to exactly "read user_progress."
 *
 * `recentActivity` stays `MOCK_RECENT_ACTIVITY` — chapter/flashcard events
 * still have no table (see module header TODO), so `notes`/`flashcards`
 * type activity remains a placeholder proxy regardless of quiz_history.
 */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function fetchProgressFromSupabase(studentId: string): Promise<Progress | null> {
  // Skip the network round-trip entirely for non-UUID ids (e.g. the mock
  // student id) — Postgres would reject them anyway, and this avoids a noisy
  // failed request for a case we already know falls back to mock data.
  if (!isSupabaseConfigured || !supabase || !UUID_RE.test(studentId)) return null;

  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("xp, streak, last_active, quizzes_taken, subject_xp, chapter_activity, card_mastery")
      .eq("user_id", studentId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      // Fields with no backing column at all (tokens, avatar, favorites,
      // missions, parentEmail, reportCadence, companion…) fall back to the
      // mock defaults purely to satisfy the Progress type — none of them
      // are read by computeAnalyticsFromProgress() below, so they never
      // leak into the returned StudentAnalytics.
      ...MOCK_PROGRESS,
      companion: undefined, // no real column — let companionId default to "nova" honestly, not a fabricated pick
      badges: [],

      // ── Real columns, read for real ──
      xp: data.xp ?? 0,
      streak: data.streak ?? 0,
      lastActive: data.last_active ?? MOCK_PROGRESS.lastActive,
      quizzesTaken: data.quizzes_taken ?? 0,
      subjectXp: (data.subject_xp as Record<string, number>) ?? {},
      chapterActivity: (data.chapter_activity as Record<string, ChapterActivity>) ?? {},
      cardMastery: (data.card_mastery as Record<string, CardMasteryRecord>) ?? {},

      // ── quizHistory: placeholder here, overwritten by getStudentAnalytics()
      //    with a real fetchQuizHistoryFromSupabase() read when available.
      // ── recentActivity: still placeholder — no chapter/flashcard event table yet.
      quizHistory: MOCK_QUIZ_HISTORY,
      recentActivity: MOCK_RECENT_ACTIVITY,
    };
  } catch {
    return null;
  }
}

/** Real read from `profiles.full_name` — used when the caller doesn't already know the student's name. */
async function fetchStudentNameFromSupabase(studentId: string): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase || !UUID_RE.test(studentId)) return null;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", studentId)
      .maybeSingle();
    if (error || !data?.full_name) return null;
    return data.full_name;
  } catch {
    return null;
  }
}

/**
 * Real read from `quiz_history` (see
 * supabase/migrations/20260703120000_quiz_history.sql). Returns `null` on
 * any failure (table unreachable, RLS denial, network error) so the caller
 * can fall back to mock data — never throws, and never silently returns an
 * empty-but-mislabeled "real" result on error. An empty array (no rows yet
 * for this student) IS treated as a successful real read.
 */
async function fetchQuizHistoryFromSupabase(studentId: string, limit = QUIZ_HISTORY_CAP): Promise<QuizResult[] | null> {
  if (!isSupabaseConfigured || !supabase || !UUID_RE.test(studentId)) return null;
  try {
    const { data, error } = await supabase
      .from("quiz_history")
      .select("id, subject_id, chapter_key, score_pct, correct, total, created_at")
      .eq("user_id", studentId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return null;

    return data.map((row): QuizResult => ({
      id: row.id,
      subjectId: row.subject_id,
      chapterKey: row.chapter_key,
      scorePct: Number(row.score_pct),
      correct: row.correct,
      total: row.total,
      date: row.created_at,
    }));
  } catch {
    return null;
  }
}

// ─── Public API ─────────────────────────────────────────────────────────

/**
 * Returns one clean, read-only analytics snapshot for a student. This is
 * the single entry point every dashboard, email, and report should use.
 *
 * @param studentId  The student's user id (Supabase `auth.users.id`). Pass
 *                    `getStudentAnalytics.MOCK_STUDENT_ID` (or any id when
 *                    Supabase isn't configured) to get demo/mock data.
 * @param options.progress     The student's already-loaded `Progress`
 *                              (from `useProgress()`), when the caller is
 *                              rendering that same signed-in student's own
 *                              data. This is the fast, zero-network path
 *                              and always wins over a Supabase fetch.
 * @param options.studentName  Display name, when known (e.g. from auth).
 * @param options.windowDays   Reporting window for weekly (7) vs monthly
 *                              (30) analytics. Defaults to 7 (weekly).
 */
export async function getStudentAnalytics(
  studentId: string,
  options?: { progress?: Progress; studentName?: string; windowDays?: 7 | 30 },
): Promise<StudentAnalytics> {
  const windowDays = options?.windowDays ?? 7;

  // Fast path — caller already has live progress for this student. Both
  // core and quiz-history data are real here.
  if (options?.progress) {
    return computeAnalyticsFromProgress(
      options.progress,
      studentId,
      options.studentName ?? MOCK_STUDENT_NAME,
      "live",
      "live",
      windowDays,
    );
  }

  // Real signed-in student, no local Progress in hand (e.g. a parent/admin
  // report generated for a student who isn't the current browser session).
  // Core fields (xp/streak/rank/companion/subject XP) are read for real from
  // user_progress + profiles. Quiz-history-dependent fields (quizzes this
  // week, subject scores, weak topics, recommended revision) are read for
  // real from the `quiz_history` table when it has rows for this student;
  // chaptersCompletedThisWeek / flashcardsReviewedThisWeek still fall back
  // to the mock recentActivity proxy — quiz_history only logs quiz attempts,
  // not chapter/flashcard events (no table for those yet).
  const remoteProgress = await fetchProgressFromSupabase(studentId);
  if (remoteProgress) {
    const studentName = options?.studentName ?? (await fetchStudentNameFromSupabase(studentId)) ?? MOCK_STUDENT_NAME;
    const realQuizHistory = await fetchQuizHistoryFromSupabase(studentId);
    const quizDataSource = realQuizHistory ? "quiz_history" : "mock";
    const progressWithQuizHistory: Progress = {
      ...remoteProgress,
      quizHistory: realQuizHistory ?? remoteProgress.quizHistory,
    };
    return computeAnalyticsFromProgress(progressWithQuizHistory, studentId, studentName, "supabase", quizDataSource, windowDays);
  }

  // Final fallback — fully mock, for demos and empty/unconfigured environments.
  return computeAnalyticsFromProgress(
    MOCK_PROGRESS,
    MOCK_STUDENT_ID,
    options?.studentName ?? MOCK_STUDENT_NAME,
    "mock",
    "mock",
    windowDays,
  );
}

getStudentAnalytics.MOCK_STUDENT_ID = MOCK_STUDENT_ID;

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  getMyStudentRating,
  getStudentRatingSummary,
  submitStudentRating,
  type StudentRatingSummary,
} from "@/routes/-student-ratings.server";

const STAR_LEVELS = [1, 2, 3, 4, 5] as const;

export function StudentRating() {
  const { user, loading: authLoading } = useAuth();
  const [summary, setSummary] = useState<StudentRatingSummary | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const loadRatings = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const [nextSummary, ownRating] = await Promise.all([
        getStudentRatingSummary(),
        user ? getMyStudentRating() : Promise.resolve(null),
      ]);
      setSummary(nextSummary);
      setSelectedRating(ownRating ?? 0);
    } catch {
      setLoadError("Student ratings could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void loadRatings();
  }, [authLoading, loadRatings]);

  useEffect(() => {
    if (authLoading) return;
    const interval = window.setInterval(() => {
      void getStudentRatingSummary()
        .then(setSummary)
        .catch(() => undefined);
    }, 30_000);
    return () => window.clearInterval(interval);
  }, [authLoading]);

  async function selectRating(rating: number) {
    if (authLoading || submitting) return;
    if (!user) {
      window.location.assign(`/login?next=${encodeURIComponent("/upgrade")}`);
      return;
    }

    const previousRating = selectedRating;
    setSelectedRating(rating);
    setHoveredRating(0);
    setSubmitting(true);
    setSubmitted(false);
    setCommentSubmitted(false);
    setSubmissionError(null);

    try {
      const saved = await submitStudentRating({ data: { rating } });
      setSelectedRating(saved.rating);
      setSummary(await getStudentRatingSummary());
      setSubmitted(true);
    } catch {
      setSelectedRating(previousRating);
      setSubmissionError("Your rating could not be saved. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitComment() {
    if (authLoading || submitting || !selectedRating) return;
    if (!user) {
      window.location.assign(`/login?next=${encodeURIComponent("/upgrade")}`);
      return;
    }

    setSubmitting(true);
    setSubmitted(false);
    setCommentSubmitted(false);
    setSubmissionError(null);

    try {
      const saved = await submitStudentRating({
        data: { rating: selectedRating, comment },
      });
      setSelectedRating(saved.rating);
      setCommentSubmitted(Boolean(comment.trim()));
      setSubmitted(true);
    } catch {
      setSubmissionError("Your comment could not be saved. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const previewRating = hoveredRating || selectedRating;

  return (
    <section
      aria-labelledby="student-rating-title"
      className="relative mx-auto mb-8 max-w-4xl overflow-hidden rounded-[2rem] border border-[#A78BFA]/25 bg-gradient-to-br from-[#6366F1]/14 via-[#0B1220]/80 to-[#F59E0B]/10 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.28)] backdrop-blur-2xl sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-[#F59E0B]/10 blur-3xl"
      />

      <div className="relative grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#FBBF24]">
            Student Experience Rating
          </p>
          <h2
            id="student-rating-title"
            className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            Students Love Learning with AcadeMY
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
            Tap a star to rate your AcadeMY learning experience.
          </p>

          <div
            className="mt-5 flex flex-wrap gap-1"
            onMouseLeave={() => setHoveredRating(0)}
            aria-label="Rate AcadeMY from 1 to 5 stars"
          >
            {STAR_LEVELS.map((rating) => {
              const active = rating <= previewRating;
              return (
                <button
                  key={rating}
                  type="button"
                  aria-label={`Rate ${rating} out of 5 stars`}
                  aria-pressed={selectedRating === rating}
                  disabled={authLoading || submitting}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onFocus={() => setHoveredRating(rating)}
                  onBlur={() => setHoveredRating(0)}
                  onClick={() => void selectRating(rating)}
                  className="group flex h-12 w-12 touch-manipulation items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F59E0B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] active:scale-95 disabled:cursor-wait disabled:opacity-60 sm:h-14 sm:w-14"
                >
                  <Star
                    className={`h-8 w-8 transition-all duration-200 sm:h-9 sm:w-9 ${
                      active
                        ? "fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_0_10px_rgba(251,191,36,0.45)]"
                        : "text-white/35 group-hover:text-[#FBBF24]/70"
                    }`}
                  />
                </button>
              );
            })}
            {submitting && (
              <span className="flex h-12 items-center pl-2 text-xs text-white/55 sm:h-14">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
              </span>
            )}
          </div>

          <div className="mt-4 max-w-xl">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="student-rating-comment"
                className="text-sm font-semibold text-white/80"
              >
                Optional comment
              </label>
              <span className="text-xs tabular-nums text-white/45">{comment.length} / 300</span>
            </div>
            <textarea
              id="student-rating-comment"
              value={comment}
              maxLength={300}
              rows={3}
              disabled={authLoading || submitting}
              placeholder="Share your experience with AcadeMY"
              onChange={(event) => {
                setComment(event.target.value);
                setSubmitted(false);
                setCommentSubmitted(false);
                setSubmissionError(null);
              }}
              className="mt-2 block min-h-24 w-full resize-y rounded-xl border border-[#A78BFA]/30 bg-[#070D19]/65 px-4 py-3 text-base leading-6 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#A78BFA]/70 focus:ring-2 focus:ring-[#8B5CF6]/35 disabled:cursor-wait disabled:opacity-60"
            />
            <button
              type="button"
              disabled={authLoading || submitting || !user || !selectedRating || !comment.trim()}
              onClick={() => void submitComment()}
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#A78BFA]/30 bg-[#8B5CF6]/20 px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8B5CF6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Save comment
            </button>
          </div>

          <div className="mt-3 min-h-5 text-sm" aria-live="polite">
            {submitted ? (
              <p className="font-semibold text-emerald-300">
                {commentSubmitted
                  ? "Thank you! Your comment is pending review."
                  : "Thank you for rating AcadeMY!"}
              </p>
            ) : submissionError ? (
              <p className="text-red-300">{submissionError}</p>
            ) : !authLoading && !user ? (
              <p className="text-white/50">Log in to add your student rating.</p>
            ) : selectedRating ? (
              <p className="text-white/50">Your rating: {selectedRating} out of 5 stars</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#070D19]/55 p-5">
          {loading ? (
            <div className="animate-pulse" aria-label="Loading student rating">
              <div className="h-10 w-28 rounded-lg bg-white/[0.08]" />
              <div className="mt-3 h-4 w-48 max-w-full rounded bg-white/[0.06]" />
              <div className="mt-5 space-y-2">
                {STAR_LEVELS.map((rating) => (
                  <div key={rating} className="h-3 rounded bg-white/[0.05]" />
                ))}
              </div>
            </div>
          ) : loadError || !summary ? (
            <div className="text-sm text-white/65">
              <p>{loadError ?? "Student ratings could not be loaded."}</p>
              <button
                type="button"
                onClick={() => void loadRatings()}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 font-semibold text-white transition-colors hover:bg-white/[0.1]"
              >
                <RefreshCw className="h-4 w-4" /> Retry
              </button>
            </div>
          ) : summary.totalRatings === 0 ? (
            <div className="flex min-h-36 flex-col items-center justify-center text-center">
              <Star className="h-10 w-10 fill-[#FBBF24] text-[#FBBF24]" />
              <p className="mt-3 text-sm font-semibold text-white">
                Be the first student to rate AcadeMY.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-bold tabular-nums text-white">
                  {summary.averageRating?.toFixed(1)}
                </span>
                <Star className="h-9 w-9 fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
              </div>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Based on {summary.totalRatings.toLocaleString()} student{" "}
                {summary.totalRatings === 1 ? "rating" : "ratings"}
              </p>

              <div className="mt-5 space-y-2" aria-label="Student rating breakdown">
                {[...STAR_LEVELS].reverse().map((rating) => {
                  const count = summary.breakdown[rating];
                  const percentage = Math.round((count / summary.totalRatings) * 100);
                  return (
                    <div
                      key={rating}
                      className="grid grid-cols-[34px_1fr_34px] items-center gap-2 text-[11px]"
                    >
                      <span className="text-white/60">{rating}★</span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-right tabular-nums text-white/45">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

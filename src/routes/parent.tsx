import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Send,
  Printer,
  ShieldCheck,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Brain,
} from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { ParentEmailConsent } from "@/components/parent/ParentEmailConsent";
import { ParentEmailNotice } from "@/components/parent/ParentEmailNotice";
import { ParentPremiumUpsell } from "@/components/parent/ParentPremiumUpsell";
import { previousKualaLumpurMonth } from "@/features/parent-report/monthlyParentReport";
import {
  consentAfterEmailEdit,
  parentEmailSaveBlocked,
  parentEmailWrite,
  recordedParentEmailConsent,
} from "@/features/parent-report/parentEmailConsent";
import {
  hasParentReportsAccess,
  normalizeParentReportEmail,
} from "@/features/parent-report/weeklyParentReport";
import { analyzeProgress } from "@/lib/tracker";
import { seoMeta } from "@/lib/seo";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/parent")({
  head: () =>
    seoMeta({
      title: "Parent Mission Report",
      description:
        "A clear monthly summary of your child's KSSM study progress — a parent learning dashboard for Malaysian families.",
      path: "/parent",
      keywords: [
        "parent learning dashboard",
        "KSSM progress report",
        "student learning platform Malaysia",
      ],
    }),
  component: ParentPage,
});

function ParentPage() {
  const { progress, setParentReport } = useProgress();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [savedConsent, setSavedConsent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [entitled, setEntitled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const [deliveryNote, setDeliveryNote] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isSupabaseConfigured) {
      setProfileReady(true);
      return;
    }
    let active = true;
    void (async () => {
      const [profileResult, subscriptionResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("plan, parent_report_email, parent_email_consent_at")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle(),
      ]);
      if (!active) return;
      const data = profileResult.data;
      const stored = data?.parent_report_email ?? "";
      const recorded = recordedParentEmailConsent(data?.parent_email_consent_at) && Boolean(stored);
      setEntitled(
        !subscriptionResult.error &&
          hasParentReportsAccess(subscriptionResult.data?.plan ?? null, data?.plan ?? null),
      );
      setEmail(stored);
      setSavedEmail(stored || null);
      setSavedConsent(recorded);
      setConsent(recorded);
      setProfileReady(true);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, user]);

  const studentName = user?.name ?? "Your child";
  const month = useMemo(() => previousKualaLumpurMonth(new Date()), []);
  const periodLabel = month.periodLabel;

  const insight = useMemo(() => {
    const start = Date.parse(month.startIso);
    const end = Date.parse(month.endIso);
    const history = (progress.quizHistory ?? []).filter((quiz) => {
      const at = new Date(quiz.date).getTime();
      return at >= start && at < end;
    });
    return analyzeProgress(history);
  }, [progress.quizHistory, month.startIso, month.endIso]);
  const normalizedEmail = normalizeParentReportEmail(email);
  const emailInvalid = email.trim().length > 0 && !normalizedEmail.ok;

  if (authLoading || (user && !profileReady)) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10" aria-label="Loading Parent Mission Report">
        <div className="h-56 animate-pulse rounded-[2rem] border border-white/[0.08] bg-white/[0.04]" />
        <div className="mt-6 h-32 animate-pulse rounded-[2rem] border border-white/[0.08] bg-white/[0.04]" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 px-6 py-12 text-center backdrop-blur-2xl">
          <ShieldCheck className="mx-auto h-9 w-9 text-[#34D399]" />
          <h1 className="mt-4 font-display text-2xl font-bold text-white">Parent Mission Report</h1>
          <p className="mt-2 text-sm text-white/55">
            Sign in to view your child's private learning summary.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#34D399]/50 bg-[#34D399]/15 px-5 text-sm font-black text-[#6EE7B7]"
          >
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  if (!entitled) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <ParentPremiumUpsell />
      </section>
    );
  }

  async function save() {
    if (!user || !normalizedEmail.ok || parentEmailSaveBlocked({ email, consent })) return;
    setDeliveryError(null);
    setDeliveryNote(null);
    if (!isSupabaseConfigured) {
      setDeliveryError("Email delivery is not available.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update(parentEmailWrite(normalizedEmail.email, consent))
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      setDeliveryError("The parent email could not be saved.");
      return;
    }
    const nextEmail = normalizedEmail.email;
    const recorded = Boolean(nextEmail) && consent;
    setEmail(nextEmail ?? "");
    setSavedEmail(nextEmail);
    setSavedConsent(recorded);
    setConsent(recorded);
    setParentReport(nextEmail ?? undefined, "monthly");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  async function sendEmail() {
    setDeliveryError(null);
    setDeliveryNote(null);
    if (!user) {
      setDeliveryError("Sign in before sending a parent report.");
      return;
    }
    if (!normalizedEmail.ok) {
      setDeliveryError(normalizedEmail.error);
      return;
    }
    const formEmail = normalizedEmail.email;
    const savedMatches = formEmail === savedEmail;
    if (!savedMatches) {
      setDeliveryError("Save the parent email before sending the report.");
      return;
    }
    if (!isSupabaseConfigured) {
      setDeliveryError("Email delivery is not available.");
      return;
    }

    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-parent-report", {
      body: { action: "send_now" },
    });
    setSending(false);
    if (error) {
      setDeliveryError(await functionErrorMessage(error));
      return;
    }
    const usedParentEmail = Boolean(
      data && typeof data === "object" && "usedParentEmail" in data && data.usedParentEmail,
    );
    setDeliveryNote(
      usedParentEmail
        ? "Report sent to the saved parent email."
        : "Report sent to your AcadeMY email.",
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6 print:max-w-none print:py-0">
      {/* ── Header ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#34D399]/25 bg-gradient-to-br from-[#064E3B]/35 via-[#0B1220]/70 to-[#1E3A8A]/25 p-6 backdrop-blur-2xl sm:p-8 print:border-slate-300 print:bg-white">
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399] to-[#10B981] shadow-[0_0_28px_rgba(52,211,153,0.45)] print:shadow-none">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6EE7B7] print:text-emerald-700">
              Monthly Parent Report
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl print:text-slate-900">
              {studentName}'s progress
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55 print:text-slate-600">
              A clear, syllabus-aligned summary of {periodLabel}. The automatic report covers the
              previous calendar month in Malaysia.
            </p>
          </div>
        </div>
      </header>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ReportStat
          icon={Brain}
          label="Quizzes"
          value={String(insight.totalQuizzes)}
          color="#60A5FA"
        />
        <ReportStat
          icon={Target}
          label="Avg score"
          value={`${insight.overallAvg}%`}
          color="#34D399"
        />
        <ReportStat
          icon={Trophy}
          label="Pass rate"
          value={`${insight.passRate}%`}
          color="#FBBF24"
        />
        <ReportStat icon={Flame} label="Streak" value={`${progress.streak}d`} color="#FB923C" />
      </div>

      {/* ── Strengths & support ── */}
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl print:border-slate-300 print:bg-white">
        {insight.totalQuizzes === 0 ? (
          <p className="text-center text-sm text-white/45 print:text-slate-500">
            No quizzes completed in {periodLabel}. Encourage a short quiz to get the next report
            rolling.
          </p>
        ) : (
          <div className="space-y-5">
            {insight.strongest && (
              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-400 print:text-emerald-700">
                  <TrendingUp className="h-4 w-4" /> Strongest subject
                </p>
                <p className="text-sm text-white/80 print:text-slate-800">
                  <span className="font-bold text-white print:text-slate-900">
                    {insight.strongest.name}
                  </span>{" "}
                  — averaging {insight.strongest.avgScore}% across {insight.strongest.attempts} quiz
                  {insight.strongest.attempts !== 1 ? "zes" : ""}.
                </p>
              </div>
            )}

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-rose-400 print:text-rose-700">
                <Target className="h-4 w-4" /> Areas to support
              </p>
              {insight.weakSpots.length === 0 ? (
                <p className="text-sm text-white/70 print:text-slate-700">
                  No weak areas — every quizzed chapter is above 80%. 🎉
                </p>
              ) : (
                <ul className="space-y-2">
                  {insight.weakSpots.map((w) => (
                    <li
                      key={`${w.subjectId}-${w.chapterKey}`}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 print:border-slate-200 print:bg-slate-50"
                    >
                      <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-xs font-black tabular-nums text-rose-300 print:bg-rose-100 print:text-rose-700">
                        {w.avgScore}%
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-white print:text-slate-900">
                          {w.chapterLabel}
                        </span>
                        <span className="block truncate text-xs text-white/45 print:text-slate-500">
                          {w.subjectName}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/10 p-4 print:border-indigo-200 print:bg-indigo-50">
              <p className="text-xs font-black uppercase tracking-wide text-[#A78BFA] print:text-indigo-700">
                Recommendation
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/80 print:text-slate-800">
                {insight.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Delivery setup ── */}
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl print:hidden">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <Mail className="h-5 w-5 text-[#34D399]" /> Send to a parent
        </h2>
        <p className="mt-1 text-sm text-white/45">
          This preview is {periodLabel}, the previous calendar month. Save a parent address, or
          leave it blank to use your AcadeMY email. The sent report is built on the server.
        </p>

        <label
          htmlFor="parent-email"
          className="mt-4 block text-xs font-bold uppercase tracking-wide text-white/40"
        >
          Parent email
        </label>
        <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row">
          <input
            id="parent-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              const nextEmail = e.target.value;
              setEmail(nextEmail);
              setConsent(consentAfterEmailEdit({ nextEmail, savedEmail, savedConsent }));
            }}
            placeholder="parent@example.com"
            className="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-white/30 focus:border-[#34D399]/50 focus:outline-none focus:ring-2 focus:ring-[#34D399]/30"
          />
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving || parentEmailSaveBlocked({ email, consent })}
            className="min-h-[44px] rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
          </button>
        </div>
        {emailInvalid && (
          <p role="alert" className="mt-1.5 text-xs text-rose-300">
            Enter a valid email address.
          </p>
        )}
        <ParentEmailNotice />
        <ParentEmailConsent id="parent-email-consent" checked={consent} onChange={setConsent} />

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => void sendEmail()}
            disabled={sending || emailInvalid}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#34D399] to-[#10B981] px-5 text-sm font-black text-[#04130C] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send report now"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
          >
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
        </div>

        {deliveryError && (
          <p role="alert" className="mt-3 text-sm text-rose-300">
            {deliveryError}
          </p>
        )}
        {deliveryNote && (
          <p role="status" className="mt-3 text-sm font-semibold text-emerald-300">
            {deliveryNote}
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-white/35">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Send report now uses the saved parent email when it is a valid address and consent is
          recorded. Otherwise it goes to your AcadeMY email. Changing the address clears consent
          until the checkbox is ticked again. Automatic delivery is monthly, on the 1st at 8:00 AM
          Malaysia time, once that schedule is turned on. Parents can see weekly progress any time
          on the Parent Dashboard.
        </p>
      </div>
    </section>
  );
}

async function functionErrorMessage(error: {
  message?: string;
  context?: { json?: () => Promise<unknown> };
}) {
  try {
    const body = await error.context?.json?.();
    if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
      return body.error;
    }
  } catch {
    // The function response was not JSON.
  }
  return error.message || "The report could not be sent. Please try again.";
}

function ReportStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Brain;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B1220]/62 p-4 backdrop-blur-2xl print:border-slate-300 print:bg-white">
      <Icon className="mb-2 h-5 w-5" style={{ color }} />
      <p className="font-display text-2xl font-extrabold tabular-nums text-white print:text-slate-900">
        {value}
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40 print:text-slate-500">
        {label}
      </p>
    </div>
  );
}

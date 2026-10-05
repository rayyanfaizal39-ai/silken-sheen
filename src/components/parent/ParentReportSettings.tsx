import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { hasParentReportsAccess, normalizeParentReportEmail } from "@/features/parent-report/weeklyParentReport";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export function ParentReportSettings() {
  const { user, loading: authLoading } = useAuth();
  const [ready, setReady] = useState(false);
  const [entitled, setEntitled] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isSupabaseConfigured) {
      setReady(true);
      setEntitled(false);
      return;
    }

    let active = true;
    void (async () => {
      const [profileResult, subscriptionResult] = await Promise.all([
        supabase.from("profiles").select("plan, parent_report_email").eq("id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("user_id", user.id).eq("status", "active").maybeSingle(),
      ]);
      if (!active) return;
      const allowed = hasParentReportsAccess(
        subscriptionResult.data?.plan ?? null,
        profileResult.data?.plan ?? null,
      );
      setEntitled(allowed);
      setEmail(profileResult.data?.parent_report_email ?? "");
      setReady(true);
    })();

    return () => {
      active = false;
    };
  }, [authLoading, user]);

  if (!ready || !user || !entitled) return null;

  async function save() {
    if (!user) return;
    setMessage(null);
    setError(null);
    const normalized = normalizeParentReportEmail(email);
    if (!normalized.ok) {
      setError(normalized.error);
      return;
    }
    setSaving(true);
    const { error: saveError } = await supabase
      .from("profiles")
      .update({ parent_report_email: normalized.email })
      .eq("id", user.id);
    setSaving(false);
    if (saveError) {
      setError("The parent email could not be saved.");
      return;
    }
    setEmail(normalized.email ?? "");
    setMessage(normalized.email ? "Saved. Weekly reports will go to this address." : "Saved. Weekly reports will go to your AcadeMY email.");
  }

  return (
    <section className="mb-6 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1]/20">
          <Mail className="h-5 w-5 text-[#A5B4FC]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Parent Report</p>
          <h2 className="mt-1 font-display text-lg font-black text-white">
            Send a weekly learning summary to your parent or guardian.
          </h2>
          <label className="mt-4 block text-sm font-bold text-white" htmlFor="parent-report-email">
            Parent / Guardian Email
            <span className="ml-2 text-xs font-semibold text-white/45">optional</span>
          </label>
          <input
            id="parent-report-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="parent@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#818CF8]"
          />
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Your weekly learning report will be sent here. If you leave it blank, we&apos;ll send it to your AcadeMY account email
            {user.email ? ` (${user.email})` : ""}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 text-sm font-bold text-white disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <Link
              to="/weekly-report"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/15 px-5 text-sm font-bold text-white"
            >
              Preview My Report
            </Link>
          </div>
          {message ? <p className="mt-3 text-sm text-[#6EE7B7]">{message}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}

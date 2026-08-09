import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { SchoolCombobox } from "@/components/onboarding/SchoolCombobox";
import { useAuth } from "@/context/auth-context";
import { EXPLORER_FORM_LEVELS, type ExplorerFormLevel } from "@/lib/explorer-profile";
import { seoMeta } from "@/lib/seo";
import type { SchoolSearchResult } from "@/lib/schools";

export const Route = createFileRoute("/onboarding")({
  head: () =>
    seoMeta({
      title: "Complete Your Explorer Profile",
      description: "Set up your private AcadeMY student profile.",
      path: "/onboarding",
      noindex: true,
    }),
  component: ExplorerOnboardingPage,
});

function ExplorerOnboardingPage() {
  const navigate = useNavigate();
  const {
    user,
    loading,
    explorerProfile,
    explorerProfileLoading,
    explorerProfileError,
    onboardingRequired,
    refreshExplorerProfile,
    completeExplorerProfile,
  } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [formLevel, setFormLevel] = useState<ExplorerFormLevel | "">("");
  const [school, setSchool] = useState<SchoolSearchResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (explorerProfileLoading) return;
    setDisplayName(
      explorerProfile?.displayName ?? (user?.name && user.name !== user.email ? user.name : ""),
    );
    setAge(explorerProfile?.age ? String(explorerProfile.age) : "");
    setFormLevel(explorerProfile?.formLevel ?? "");
  }, [explorerProfile, explorerProfileLoading, user]);

  useEffect(() => {
    if (loading || explorerProfileLoading) return;
    if (!user) {
      void navigate({ to: "/login", replace: true });
      return;
    }
    if (explorerProfile && !onboardingRequired) {
      void navigate({ to: "/home", replace: true });
    }
  }, [explorerProfile, explorerProfileLoading, loading, navigate, onboardingRequired, user]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!formLevel) {
      setError("Choose your form level.");
      return;
    }
    if (!school) {
      setError("Choose a verified school from the search results.");
      return;
    }

    setSaving(true);
    try {
      await completeExplorerProfile({
        displayName,
        age: Number(age),
        formLevel,
        schoolId: school.id,
      });
      await navigate({ to: "/home", replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't save your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || explorerProfileLoading || !user || (explorerProfile && !onboardingRequired)) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#050816] px-4 text-white">
        <div className="text-center" role="status">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-violet-300" />
          <p className="mt-3 text-sm text-white/55">Checking your Explorer Profile…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-[#050816] px-4 py-10 text-white">
      <section className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1220] p-6 sm:p-8">
        <AcademyLogo className="h-auto w-[150px]" />
        <h1 className="mt-7 font-display text-2xl font-bold">Complete Your Explorer Profile</h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Add the student details AcadeMY needs before you continue.
        </p>

        {explorerProfileError && (
          <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">
            <p>{explorerProfileError}</p>
            <button
              type="button"
              onClick={() => void refreshExplorerProfile()}
              className="mt-3 font-bold underline underline-offset-4"
            >
              Try loading it again
            </button>
          </div>
        )}

        <form className="mt-7 space-y-5" onSubmit={submit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Display Name</span>
            <input
              required
              maxLength={80}
              autoComplete="name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-base outline-none focus:border-violet-400"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Age</span>
            <input
              required
              type="number"
              min={10}
              max={18}
              step={1}
              inputMode="numeric"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-base outline-none focus:border-violet-400"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Form Level</span>
            <select
              required
              value={formLevel}
              onChange={(event) => setFormLevel(event.target.value as ExplorerFormLevel | "")}
              className="min-h-12 w-full rounded-xl border border-white/10 bg-[#111827] px-4 text-base outline-none focus:border-violet-400"
            >
              <option value="">Select a form</option>
              {EXPLORER_FORM_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <div className="block">
            <span className="mb-1.5 block text-sm font-semibold">School</span>
            <SchoolCombobox
              value={school}
              onChange={setSchool}
              invalid={Boolean(error && !school)}
            />
            <span className="mt-1.5 block text-xs leading-5 text-white/45">
              Can’t find your school? School addition requests are coming soon.
            </span>
          </div>

          {error && (
            <div
              className="flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-200"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Complete Profile
          </button>
        </form>
      </section>
    </main>
  );
}

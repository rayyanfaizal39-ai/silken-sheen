import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Rocket, Sparkles, X } from "lucide-react";
import { subjects } from "@/data/content";
import { learningForms } from "@/content/metadata/forms";
import { studyHref } from "@/lib/study-routing";

const STORAGE_KEY = "academy-onboarded-v1";

type Step = "form" | "subject" | "launch";

/**
 * First-time onboarding: choose Form → Subject → start first mission.
 * Mounted once at the app shell; auto-skipped once the flag is set.
 */
export function OnboardingWizard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<string>("Form 1");
  const [subjectId, setSubjectId] = useState<string>("science");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      // Defer briefly so the homepage paints first
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  function launch() {
    dismiss();
    navigate({ to: studyHref("notes", subjectId, form) });
  }

  if (!open) return null;

  const availableForms = learningForms.filter((f) => f.available);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[#0B1220]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] animate-scale-in sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Skip onboarding"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" /> Welcome to AcadeMY
        </div>

        {step === "form" && (
          <>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Which form are you in?
            </h2>
            <p className="mt-2 text-sm text-white/60">Pick the one that matches your school year.</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {availableForms.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setForm(f.label)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    form === f.label
                      ? "border-cyan-300 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
                    Level
                  </span>
                  <span className="mt-1 block text-lg font-bold text-white">{f.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep("subject")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {step === "subject" && (
          <>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Pick a subject to start
            </h2>
            <p className="mt-2 text-sm text-white/60">You can switch any time from the dashboard.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSubjectId(s.id)}
                  className={`relative overflow-hidden rounded-2xl border p-3 text-left transition-all ${
                    subjectId === s.id
                      ? "border-white/60 ring-2 ring-cyan-300/60"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${s.color} opacity-25`} />
                  <span className="block text-sm font-bold text-white">{s.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-sm font-semibold text-white/60 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("launch")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {step === "launch" && (
          <>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready, cadet?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              We'll drop you straight into your first mission.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Check className="h-4 w-4 text-emerald-400" /> {form}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                <Check className="h-4 w-4 text-emerald-400" />{" "}
                {subjects.find((s) => s.id === subjectId)?.name}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("subject")}
                className="text-sm font-semibold text-white/60 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={launch}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Rocket className="h-4 w-4" /> Start first mission
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

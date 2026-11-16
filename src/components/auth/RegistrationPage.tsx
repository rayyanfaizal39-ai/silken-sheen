import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Orbit, ShieldCheck } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageBackdrop } from "@/components/auth/AuthPageBackdrop";
import { LearningLevelSelector } from "@/components/auth/LearningLevelSelector";
import { useAuth } from "@/context/auth-context";
import {
  createRegistrationIntent,
  getRegistrationIntent,
  persistRegistrationIntent,
} from "@/lib/auth-intent";
import {
  isLearningLevelAvailable,
  LEARNING_LEVELS,
  type LearningLevelId,
} from "@/lib/learning-levels";

export function RegistrationPage() {
  const { user, loading } = useAuth();
  // Stage 1 deliberately keeps registration on Main's existing safe flow.
  // Authoritative cross-application routing is reserved for Stage 2.
  const returnTo = "/home";
  const [selectedWorld, setSelectedWorld] = useState<LearningLevelId | null>(null);
  const [step, setStep] = useState<"world" | "account">("world");
  // Keep only a non-sensitive email draft in memory while the student revisits
  // world selection. AuthForm owns the password, so leaving the account step
  // unmounts and clears it immediately.
  const [emailDraft, setEmailDraft] = useState("");

  useEffect(() => {
    const intent = getRegistrationIntent();
    if (!intent) return;
    setSelectedWorld(intent.world);
    setStep(intent.stage);
  }, []);

  useEffect(() => {
    if (!loading && user) window.location.replace(returnTo);
  }, [loading, returnTo, user]);

  const selectedLevel = useMemo(
    () => LEARNING_LEVELS.find((level) => level.id === selectedWorld) ?? null,
    [selectedWorld],
  );

  function selectWorld(world: LearningLevelId) {
    if (!isLearningLevelAvailable(world)) return;
    setSelectedWorld(world);
    persistRegistrationIntent(createRegistrationIntent(world, "world", returnTo));
  }

  function continueToAccount() {
    if (!selectedWorld || !isLearningLevelAvailable(selectedWorld)) return;
    persistRegistrationIntent(createRegistrationIntent(selectedWorld, "account", returnTo));
    setStep("account");
  }

  function backToWorlds() {
    if (selectedWorld) {
      persistRegistrationIntent(createRegistrationIntent(selectedWorld, "world", returnTo));
    }
    setStep("world");
  }

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#050816] px-4 py-5 text-white sm:px-6 sm:py-8">
      <AuthPageBackdrop />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <AcademyLogo className="h-auto w-[142px] sm:w-[176px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl pb-12 pt-7 sm:pt-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">
            {step === "world" ? "Step 1 of 2" : "Step 2 of 2"}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[1.02] tracking-tight">
            Start Your <span className="text-violet-300">AcadeMY Journey</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {step === "world"
              ? "Choose your learning world. Your selection helps prepare registration but never changes an existing account assignment."
              : `Create your account for AcadeMY ${selectedLevel?.name ?? "Junior"}.`}
          </p>
        </header>

        {step === "world" ? (
          <section className="mt-9" aria-label="Choose a learning world">
            <LearningLevelSelector value={selectedWorld} onChange={selectWorld} />

            <div className="mx-auto mt-7 flex max-w-2xl flex-col items-center gap-4 text-center">
              <button
                type="button"
                disabled={!selectedWorld || !isLearningLevelAvailable(selectedWorld)}
                onClick={continueToAccount}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-6 py-3 text-base font-black text-white shadow-[0_16px_36px_-10px_rgba(139,92,246,0.75)] transition-colors hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/70 active:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none sm:w-auto sm:min-w-64"
              >
                Continue
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="text-sm leading-6 text-white/60">
                Registration for Primary and Senior is coming soon. Junior registration is currently
                available.
              </p>
              <p className="text-sm text-white/65">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center font-black text-violet-200 underline decoration-violet-300/50 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                >
                  Log In
                </Link>
              </p>
            </div>
          </section>
        ) : (
          <section className="mx-auto mt-9 max-w-lg" aria-label="Create your AcadeMY account">
            <div className="rounded-[28px] border border-white/15 bg-[#080E1C]/90 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-8">
              <div className="mb-6 rounded-2xl border border-violet-300/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.18),rgba(52,211,153,0.08))] p-4 shadow-[0_18px_44px_-28px_rgba(167,139,250,0.95)]">
                <div className="flex items-start gap-3" aria-label="Selected learning world">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-300 text-emerald-950 shadow-[0_8px_22px_rgba(52,211,153,0.22)]">
                    <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-200">
                      Selected Learning World
                    </p>
                    <p className="mt-1 font-display text-xl font-black text-white">
                      AcadeMY {selectedLevel?.name}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{selectedLevel?.range}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={backToWorlds}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-200/35 bg-violet-300/15 px-4 py-3 text-sm font-black text-violet-50 shadow-[0_10px_28px_-18px_rgba(196,181,253,0.9)] transition-colors duration-200 hover:border-violet-200/60 hover:bg-violet-300/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/55 active:bg-violet-300/30 motion-reduce:transition-none sm:text-base"
                >
                  <Orbit className="h-5 w-5" aria-hidden="true" />
                  Change Learning World
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <h2 className="font-display text-2xl font-black">Create Account</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Continue with Google or create an account using your email.
              </p>
              <div className="mt-6">
                <AuthForm
                  mode="signup"
                  returnTo={returnTo}
                  initialEmail={emailDraft}
                  onEmailChange={setEmailDraft}
                  onSuccess={() => window.location.replace(returnTo)}
                />
              </div>
              <p className="mt-5 flex items-start gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                  aria-hidden="true"
                />
                Your learning-world choice is registration intent only. Access remains protected by
                your account profile and permissions.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleUserRound,
  Loader2,
  Rocket,
  School,
  Sparkles,
} from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { SchoolCombobox } from "@/components/onboarding/SchoolCombobox";
import { useAuth } from "@/context/auth-context";
import { EXPLORER_FORM_LEVELS, type ExplorerFormLevel } from "@/lib/explorer-profile";
import {
  EXPLORER_SUPPORTED_AGES,
  getExplorerStepError,
  nextExplorerStep,
  previousExplorerStep,
  type ExplorerOnboardingStep,
} from "@/lib/explorer-onboarding-flow";
import { formatSchoolLocation, type SchoolSearchResult } from "@/lib/schools";
import { seoMeta } from "@/lib/seo";
import "./onboarding.css";

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

type StepDirection = "forward" | "back";

const STEP_COPY: Record<
  ExplorerOnboardingStep,
  { eyebrow: string; title: string; support: string }
> = {
  1: {
    eyebrow: "Welcome, Explorer",
    title: "What should we call you?",
    support: "Let’s set up your Explorer Profile before you enter AcadeMY.",
  },
  2: {
    eyebrow: "Your Mission Level",
    title: "Choose your learning level",
    support: "We’ll use your Form level to personalise your learning journey.",
  },
  3: {
    eyebrow: "Find Your School",
    title: "Choose your verified school",
    support: "Search the official Malaysian school directory to find your school.",
  },
  4: {
    eyebrow: "Explorer Profile Ready",
    title: "Your identity is cleared for launch",
    support: "Check your details, then enter Academy Station.",
  },
};

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
  const [step, setStep] = useState<ExplorerOnboardingStep>(1);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [formLevel, setFormLevel] = useState<ExplorerFormLevel | "">("");
  const [school, setSchool] = useState<SchoolSearchResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const savingRef = useRef(false);

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

  useEffect(() => {
    stepHeadingRef.current?.focus({ preventScroll: true });
  }, [step]);

  function validateCurrentStep() {
    const validationError = getExplorerStepError(step, {
      displayName,
      age,
      formLevel,
      school,
    });
    setError(validationError);
    return validationError === null;
  }

  function advance() {
    setError(null);
    if (!validateCurrentStep() || step === 4) return;
    setDirection("forward");
    setStep(nextExplorerStep);
  }

  function goBack() {
    if (saving || step === 1) return;
    setError(null);
    setDirection("back");
    setStep(previousExplorerStep);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 4) {
      advance();
      return;
    }
    if (savingRef.current || !school || !formLevel) return;

    setError(null);
    savingRef.current = true;
    setSaving(true);
    try {
      await completeExplorerProfile({
        displayName,
        age: Number(age),
        formLevel,
        schoolId: school.id,
      });
      await navigate({ to: "/home", replace: true });
    } catch {
      setError("We couldn’t prepare your profile. Check your details and try again.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  if (loading || explorerProfileLoading || !user || (explorerProfile && !onboardingRequired)) {
    return (
      <main className="explorer-onboarding explorer-onboarding--loading">
        <div className="text-center" role="status">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-violet-300" />
          <p className="mt-3 text-sm text-violet-100/65">Checking your Explorer Profile…</p>
        </div>
      </main>
    );
  }

  const copy = STEP_COPY[step];

  return (
    <main className="explorer-onboarding">
      <div className="explorer-onboarding__stars" aria-hidden="true" />
      <header className="explorer-onboarding__brand">
        <AcademyLogo className="h-auto w-[142px] sm:w-[158px]" />
        <span>Explorer Profile Setup</span>
      </header>

      <div className="explorer-onboarding__layout">
        <aside className="explorer-onboarding__mission" aria-hidden="true">
          <div className="explorer-onboarding__orbit explorer-onboarding__orbit--outer" />
          <div className="explorer-onboarding__orbit explorer-onboarding__orbit--inner" />
          <div className="explorer-onboarding__mission-core">
            <div className="explorer-onboarding__mission-icon">
              <AcademyLogo variant="icon" className="h-12 w-12" />
            </div>
            <span>Academy Station</span>
            <strong>IDENTITY CLEARANCE</strong>
          </div>
          <div className="explorer-onboarding__mission-copy">
            <p>Explorer intake</p>
            <h2>Prepare your identity for the learning universe.</h2>
            <div>
              <BadgeCheck /> Verified student profile
            </div>
          </div>
        </aside>

        <section className="explorer-onboarding__panel" aria-labelledby="onboarding-step-title">
          <div
            className="explorer-onboarding__progress"
            role="group"
            aria-label={`Step ${step} of 4`}
          >
            <div className="explorer-onboarding__progress-copy">
              <span>Explorer setup</span>
              <strong aria-live="polite">Step {step} of 4</strong>
            </div>
            <ol aria-hidden="true">
              {[1, 2, 3, 4].map((number) => (
                <li key={number} data-active={number <= step} />
              ))}
            </ol>
          </div>

          {explorerProfileError && (
            <div className="explorer-onboarding__notice" role="alert">
              <p>{explorerProfileError}</p>
              <button type="button" onClick={() => void refreshExplorerProfile()}>
                Try loading it again
              </button>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <div key={step} className="explorer-onboarding__step" data-direction={direction}>
              <div className="explorer-onboarding__step-heading">
                <p>{copy.eyebrow}</p>
                <h1 id="onboarding-step-title" ref={stepHeadingRef} tabIndex={-1}>
                  {copy.title}
                </h1>
                <span>{copy.support}</span>
              </div>

              {step === 1 && (
                <div className="explorer-onboarding__field">
                  <label htmlFor="explorer-display-name">Display Name</label>
                  <div className="explorer-onboarding__input-wrap">
                    <CircleUserRound aria-hidden="true" />
                    <input
                      id="explorer-display-name"
                      required
                      maxLength={80}
                      autoComplete="name"
                      autoFocus
                      value={displayName}
                      onChange={(event) => {
                        setDisplayName(event.target.value);
                        setError(null);
                      }}
                      placeholder="e.g. Alya"
                      aria-describedby="display-name-help"
                    />
                  </div>
                  <p id="display-name-help">This is how you’ll appear around AcadeMY.</p>
                </div>
              )}

              {step === 2 && (
                <div className="explorer-onboarding__mission-fields">
                  <fieldset>
                    <legend>Form Level</legend>
                    <div className="explorer-onboarding__form-grid">
                      {EXPLORER_FORM_LEVELS.map((level) => (
                        <label key={level} data-selected={formLevel === level}>
                          <input
                            type="radio"
                            name="form-level"
                            value={level}
                            checked={formLevel === level}
                            onChange={() => {
                              setFormLevel(level);
                              setError(null);
                            }}
                          />
                          <span>{level.replace("Form ", "")}</span>
                          <strong>{level}</strong>
                          {formLevel === level && <Check aria-hidden="true" />}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="explorer-onboarding__field">
                    <label htmlFor="explorer-age">Age</label>
                    <select
                      id="explorer-age"
                      required
                      value={age}
                      onChange={(event) => {
                        setAge(event.target.value);
                        setError(null);
                      }}
                    >
                      <option value="">Choose your age</option>
                      {EXPLORER_SUPPORTED_AGES.map((supportedAge) => (
                        <option key={supportedAge} value={supportedAge}>
                          {supportedAge} years old
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="explorer-onboarding__school-field">
                  <p id="explorer-school-label">Verified Malaysian School</p>
                  <SchoolCombobox
                    value={school}
                    onChange={(nextSchool) => {
                      setSchool(nextSchool);
                      setError(null);
                    }}
                    invalid={Boolean(error && !school)}
                  />
                  <div className="explorer-onboarding__school-help">
                    <School aria-hidden="true" />
                    <p>
                      <strong>Can’t find your school?</strong>
                      School addition requests are coming soon.
                    </p>
                  </div>
                </div>
              )}

              {step === 4 && school && formLevel && (
                <div className="explorer-onboarding__profile-card">
                  <div className="explorer-onboarding__profile-avatar">
                    <AcademyLogo variant="icon" className="h-10 w-10" />
                    <span aria-hidden="true">
                      <BadgeCheck />
                    </span>
                  </div>
                  <div className="explorer-onboarding__profile-identity">
                    <p>Display name</p>
                    <h2>{displayName.trim()}</h2>
                    <span>
                      <Sparkles aria-hidden="true" /> Space Cadet
                    </span>
                  </div>
                  <div className="explorer-onboarding__profile-facts">
                    <div>
                      <span>Mission level</span>
                      <strong>{formLevel}</strong>
                    </div>
                    <div>
                      <span>Age</span>
                      <strong>{age}</strong>
                    </div>
                  </div>
                  <div className="explorer-onboarding__verified-school">
                    <BadgeCheck aria-hidden="true" />
                    <div>
                      <span>Verified school</span>
                      <strong>{school.schoolName}</strong>
                      <p>{formatSchoolLocation(school)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="explorer-onboarding__error" role="alert">
                <span aria-hidden="true">!</span>
                <p>{error}</p>
              </div>
            )}

            <div className="explorer-onboarding__actions">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={saving}
                  className="explorer-onboarding__back"
                >
                  <ArrowLeft aria-hidden="true" /> Back
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="explorer-onboarding__primary"
                data-final={step === 4}
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" /> Preparing Academy
                    Station…
                  </>
                ) : step === 4 ? (
                  <>
                    <Rocket aria-hidden="true" /> Enter Academy Station
                  </>
                ) : (
                  <>
                    Continue <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

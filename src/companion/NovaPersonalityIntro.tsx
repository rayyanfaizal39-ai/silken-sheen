import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Rocket,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CompanionImage } from "./CompanionImage";
import {
  createNovaBond,
  NOVA_PERSONALITIES,
  NOVA_PERSONALITY_QUESTIONS,
  resolveNovaPersonality,
  type NovaBond,
  type NovaPersonalityId,
} from "./personality";
import type { CompanionStageId } from "@/hooks/use-progress";
import "./novaPersonality.css";

const TRAIT_ICONS = {
  curious: Compass,
  steady: Shield,
  brave: Rocket,
  playful: Sparkles,
};

export function NovaEggArtwork({ reveal = false }: { reveal?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`nova-bond__art${reveal ? " nova-bond__art--reveal" : ""}`}>
      <div className="nova-bond__orbit" aria-hidden="true" />
      <div
        className="nova-bond__orbit nova-bond__orbit--inner"
        aria-hidden="true"
      />
      {failed ? (
        <div
          className="nova-bond__egg"
          role="img"
          aria-label="Nova’s cosmic egg"
        >
          <span className="nova-bond__egg-shine" aria-hidden="true" />
          <Sparkles aria-hidden="true" />
          <span
            className="nova-bond__egg-dot nova-bond__egg-dot--one"
            aria-hidden="true"
          />
          <span
            className="nova-bond__egg-dot nova-bond__egg-dot--two"
            aria-hidden="true"
          />
        </div>
      ) : (
        <img
          className="nova-bond__egg-image"
          src="/companions/nova/nova-egg.png"
          alt="Nova’s cosmic egg"
          width="190"
          height="220"
          onError={() => setFailed(true)}
        />
      )}
      <Star
        className="nova-bond__spark nova-bond__spark--one"
        aria-hidden="true"
      />
      <Sparkles
        className="nova-bond__spark nova-bond__spark--two"
        aria-hidden="true"
      />
    </div>
  );
}

export function NovaPersonalityIntro({
  initialName = "Nova",
  stage = "egg",
  onBond,
  onClose,
  onStartLearning,
}: {
  initialName?: string;
  stage?: CompanionStageId;
  onBond: (bond: NovaBond) => Promise<void>;
  onClose: () => void;
  onStartLearning: () => void;
}) {
  const [phase, setPhase] = useState<
    "welcome" | "questions" | "reveal" | "bonded"
  >("welcome");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<NovaPersonalityId[]>([]);
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const saveRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = NOVA_PERSONALITY_QUESTIONS[index];
  const personality =
    answers.length === 5 ? resolveNovaPersonality(answers) : null;
  const result = personality ? NOVA_PERSONALITIES[personality] : null;
  const TraitIcon = personality ? TRAIT_ICONS[personality] : Sparkles;
  const isEgg = stage === "egg";

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [phase, index]);

  function answer(value: NovaPersonalityId) {
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  }

  async function claim() {
    if (saveRef.current || answers.length !== 5) return;
    saveRef.current = true;
    setSaving(true);
    setError("");
    try {
      const next = createNovaBond(answers, name);
      await onBond(next);
      setName(next.name);
      setPhase("bonded");
    } catch {
      setError(
        "We couldn’t save your Nova. Your answers are still here—please try again.",
      );
    } finally {
      saveRef.current = false;
      setSaving(false);
    }
  }

  return (
    <main className="nova-bond">
      <header className="nova-bond__header">
        <span className="nova-bond__brand">
          <Sparkles aria-hidden="true" /> AcadeMY · Cosmic Companion
        </span>
        <button
          className="nova-bond__quiet"
          type="button"
          disabled={saving}
          onClick={onClose}
        >
          {phase === "bonded" ? "View companion" : "Maybe later"}
        </button>
      </header>
      <section
        className={`nova-bond__card nova-bond__card--${phase}`}
        aria-labelledby="nova-bond-title"
      >
        {phase === "welcome" && (
          <>
            {isEgg ? (
              <NovaEggArtwork />
            ) : (
              <div className="nova-bond__existing-art">
                <CompanionImage speciesId="nova" stage={stage} size={200} />
              </div>
            )}
            <p className="nova-bond__eyebrow">
              A little spark. A new connection.
            </p>
            <h1 id="nova-bond-title" ref={headingRef} tabIndex={-1}>
              Discover your Nova
            </h1>
            <p className="nova-bond__support">
              Five little choices. A companion that cheers you on in your own
              way.
            </p>
            <span className="nova-bond__duration">
              5 questions · About a minute · No right or wrong answers
            </span>
            <button
              className="nova-bond__primary"
              type="button"
              onClick={() => setPhase("questions")}
            >
              Let’s meet <ArrowRight aria-hidden="true" />
            </button>
          </>
        )}

        {phase === "questions" && (
          <>
            <div className="nova-bond__question-top">
              <span>Your explorer personality</span>
              <span>{index + 1} / 5</span>
            </div>
            <div
              className="nova-bond__progress"
              role="progressbar"
              aria-label="Personality quiz progress"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={index + 1}
            >
              <span style={{ width: `${((index + 1) / 5) * 100}%` }} />
            </div>
            <span className="nova-bond__question-icon" aria-hidden="true">
              {index === 0 ? (
                <Compass />
              ) : index === 1 ? (
                <Star />
              ) : index === 2 ? (
                <Sparkles />
              ) : index === 3 ? (
                <Rocket />
              ) : (
                <Shield />
              )}
            </span>
            <h1 id="nova-bond-title" ref={headingRef} tabIndex={-1}>
              {question.prompt}
            </h1>
            <p className="nova-bond__question-hint">
              Choose what feels most like you today.
            </p>
            <fieldset className="nova-bond__choices">
              <legend className="sr-only">{question.prompt}</legend>
              {question.options.map((option) => (
                <label
                  className={`nova-bond__choice${answers[index] === option.personality ? " is-selected" : ""}`}
                  key={option.personality}
                >
                  <input
                    type="radio"
                    name={`nova-${question.id}`}
                    checked={answers[index] === option.personality}
                    onChange={() => answer(option.personality)}
                    value={option.personality}
                  />
                  <span>{option.label}</span>
                  <span className="nova-bond__choice-check" aria-hidden="true">
                    {answers[index] === option.personality && <Check />}
                  </span>
                </label>
              ))}
            </fieldset>
            <footer className="nova-bond__question-actions">
              <button
                type="button"
                className="nova-bond__back"
                onClick={() =>
                  index > 0 ? setIndex(index - 1) : setPhase("welcome")
                }
              >
                <ArrowLeft aria-hidden="true" /> Back
              </button>
              <button
                type="button"
                className="nova-bond__primary"
                disabled={!answers[index]}
                onClick={() =>
                  index < 4 ? setIndex(index + 1) : setPhase("reveal")
                }
              >
                {index === 4 ? "Meet my Nova" : "Continue"}
                <ArrowRight aria-hidden="true" />
              </button>
            </footer>
          </>
        )}

        {(phase === "reveal" || phase === "bonded") && result && (
          <>
            {isEgg ? (
              <NovaEggArtwork reveal />
            ) : (
              <div className="nova-bond__existing-art">
                <CompanionImage speciesId="nova" stage={stage} size={200} />
              </div>
            )}
            <span className="nova-bond__trait">
              <TraitIcon aria-hidden="true" /> {result.title}
            </span>
            <h1 id="nova-bond-title" ref={headingRef} tabIndex={-1}>
              {phase === "bonded"
                ? `${name} is yours.`
                : isEgg
                  ? "Your Nova egg is waiting."
                  : "A new spark for your Nova."}
            </h1>
            <p className="nova-bond__support">
              {phase === "bonded" ? result.greeting : result.description}
            </p>
            {phase === "reveal" ? (
              <>
                <div className="nova-bond__name">
                  <label htmlFor="nova-companion-name">
                    What will you call your companion?
                  </label>
                  <input
                    id="nova-companion-name"
                    value={name}
                    maxLength={48}
                    onChange={(event) =>
                      setName(
                        Array.from(event.target.value).slice(0, 24).join(""),
                      )
                    }
                    placeholder="Nova"
                    autoComplete="off"
                    disabled={saving}
                  />
                  <small>Keep Nova, or choose a name of your own.</small>
                </div>
                {error && (
                  <p className="nova-bond__error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="nova-bond__primary"
                  type="button"
                  onClick={() => void claim()}
                  disabled={saving}
                >
                  {saving
                    ? "Connecting…"
                    : isEgg
                      ? "This is my Nova"
                      : "Save our connection"}
                  <Sparkles aria-hidden="true" />
                </button>
                <button
                  className="nova-bond__quiet nova-bond__revisit"
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setIndex(4);
                    setPhase("questions");
                  }}
                >
                  Change my answers
                </button>
              </>
            ) : (
              <>
                <p className="nova-bond__next-step">
                  {isEgg
                    ? "Your egg grows as you study. Let’s begin with one small learning adventure."
                    : "Your learning journey continues, with encouragement that feels more like you."}
                </p>
                <button
                  className="nova-bond__primary"
                  type="button"
                  onClick={onStartLearning}
                >
                  Start learning together <ArrowRight aria-hidden="true" />
                </button>
              </>
            )}
          </>
        )}
      </section>
      <p className="nova-bond__footnote">
        Your choices personalise Nova’s encouragement. You can discover a
        different spark anytime.
      </p>
    </main>
  );
}

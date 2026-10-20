import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
  Heart,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import type { StudioState } from "../studio-model";
import { NovaEgg } from "./NovaEgg";
import { malaysiaRevealTime, revealCountdown } from "./reveal-countdown";
import "./awakening-chamber.css";
import "./waiting-sanctuary.css";

type Origin = NonNullable<StudioState["origin"]>;

function useNow(enabled: boolean) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    if (!enabled) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [enabled]);
  return now;
}

const pad = (n: number) => String(n).padStart(2, "0");

type StepState = "done" | "active" | "upcoming" | "failed";

/**
 * The waiting sanctuary between identity confirmation and the next-day reveal. Every status it
 * shows comes from the Studio's existing `origin` record; actions are the Studio's own.
 */
export function WaitingSanctuary({
  origin,
  fictional,
  calm,
  hatching,
  busy,
  learningHref,
  onCheck,
  onReveal,
}: {
  origin: Origin;
  fictional: boolean;
  calm: boolean;
  hatching: boolean;
  busy: boolean;
  learningHref: string;
  onCheck: () => void;
  onReveal: () => void;
}) {
  const failed = origin.status === "failed";
  const ready = origin.ready;
  const created = origin.completed >= 2 || origin.status === "ready";
  // Cosmic Companion artwork is also checked by a person before the reveal; legacy cards are not.
  const prepared = origin.approved === undefined ? created : origin.approved >= 2;
  const checking = created && !prepared;
  const firstCountdown = revealCountdown(origin.revealAfter, Date.now());
  const now = useNow(!failed && !ready && firstCountdown.kind === "counting");
  const countdown = now === null ? null : revealCountdown(origin.revealAfter, now);

  const steps: { title: string; body: string; state: StepState; icon: ReactNode }[] = [
    {
      title: "Your Journey Is Complete",
      body: "Your 12 answers have been received.",
      state: "done",
      icon: <BookOpen size={18} />,
    },
    {
      title: "Your Cosmic Identity",
      body: "Your personality and companion traits have been discovered.",
      state: "done",
      icon: <Sparkles size={18} />,
    },
    {
      title: "Preparing Your Companions",
      body: failed
        ? "Preparation needs attention. Your answers and identity are safe."
        : prepared
          ? "Both companion cards have been prepared."
          : checking
            ? "Both companion cards have been created and are being checked by our team."
            : "Your two companion cards are being prepared.",
      state: failed ? "failed" : prepared ? "done" : "active",
      icon: failed ? <TriangleAlert size={18} /> : <Sparkles size={18} />,
    },
    {
      title: "The Reveal",
      body: ready
        ? "Your companions are ready to meet you."
        : "Return when your companions are ready.",
      state: ready ? "active" : "upcoming",
      icon: <Gift size={18} />,
    },
  ];

  const title = hatching
    ? ["Your Companion", "Is Arriving…"]
    : ready
      ? ["Your Companion", "Has Arrived"]
      : failed
        ? ["Your Companion Needs", "A Little More Care"]
        : ["Your Companion", "Is Almost Here"];

  return (
    <section
      className="cca cws"
      data-calm={calm}
      data-state={failed ? "failed" : ready ? "ready" : "waiting"}
      aria-labelledby="cws-title"
    >
      <div className="cca-garden" aria-hidden="true">
        <CompanionGarden />
      </div>

      <div className="cca-awakening">
        <p className="cca-crest">
          <span aria-hidden="true">✦</span> Cosmic Companion <span aria-hidden="true">✦</span>
        </p>
        <h1 id="cws-title" tabIndex={-1}>
          {title[0]} <span>{title[1]}</span>
        </h1>
        <p className="cca-lead">
          {ready
            ? "Your reveal is ready. Open it to meet the companions prepared for you."
            : failed
              ? "Your journey is complete and your answers are safe. We're checking how your companion is being prepared."
              : "Your journey is complete! Your companion is preparing to meet you. Return when your reveal is ready to discover who is waiting for you."}
        </p>
        <NovaEgg phase={hatching ? "hatching" : "awakening"} />
      </div>

      <div className="cca-panel cws-panel">
        <header className="cca-panel__head">
          <span className="cca-panel__badge" aria-hidden="true">
            {failed ? <TriangleAlert size={22} /> : <Sparkles size={22} />}
          </span>
          <div>
            <h2>
              {ready
                ? "Your Reveal Is Ready"
                : failed
                  ? "Preparation Needs Attention"
                  : "Preparing Your Reveal"}
            </h2>
            <p>
              {failed
                ? "Generation needs attention. We’ll check the existing request before any retry; there is no need to submit again."
                : ready
                  ? "Both companion cards have been prepared and checked. A new chapter of your learning journey begins now."
                  : "Your answers have been saved, and your companion is being prepared. A new chapter of your learning journey will begin when your reveal is ready."}
            </p>
          </div>
        </header>

        {fictional && (
          <p className="cws-preview-tag">Fictional preview · simulated preparation status</p>
        )}

        {!failed && (
          <div className="cws-countdown" role="status" aria-live="off">
            <CalendarDays className="cws-countdown__icon" size={34} aria-hidden="true" />
            {ready ? (
              <div>
                <p className="cws-countdown__label">Reveal open</p>
                <p className="cws-countdown__message">Your companions are waiting to meet you.</p>
              </div>
            ) : countdown === null ? (
              <div>
                <p className="cws-countdown__label">Reveal opens in</p>
                <p className="cws-countdown__time" aria-hidden="true">
                  —
                </p>
              </div>
            ) : countdown.kind === "counting" ? (
              <div>
                <p className="cws-countdown__label">Reveal opens in</p>
                <p className="cws-countdown__time">
                  {countdown.days > 0 && (
                    <>
                      {countdown.days}
                      <small>d</small>{" "}
                    </>
                  )}
                  {pad(countdown.hours)}
                  <small>h</small> {pad(countdown.minutes)}
                  <small>m</small>
                  {countdown.days === 0 && (
                    <>
                      {" "}
                      {pad(countdown.seconds)}
                      <small>s</small>
                    </>
                  )}
                </p>
                <p className="cws-countdown__when">
                  {malaysiaRevealTime(origin.revealAfter)} (Malaysia time)
                </p>
              </div>
            ) : countdown.kind === "open" ? (
              <div>
                <p className="cws-countdown__label">Reveal window open</p>
                <p className="cws-countdown__message">
                  Your reveal window is open. We’re still preparing your companion.
                </p>
              </div>
            ) : (
              <div>
                <p className="cws-countdown__label">Reveal time</p>
                <p className="cws-countdown__message">
                  We’re preparing your companion. Your reveal time will appear here once it’s set.
                </p>
              </div>
            )}
          </div>
        )}

        <ol className="cws-steps" aria-label="Preparation progress">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="cws-step"
              data-state={step.state}
              style={{ "--cws-n": i } as React.CSSProperties}
            >
              <span className="cws-step__mark" aria-hidden="true">
                {step.state === "done" ? "✓" : step.state === "failed" ? "!" : ""}
              </span>
              <span className="cws-step__icon" aria-hidden="true">
                {step.icon}
              </span>
              <div>
                <b>{step.title}</b>
                <small>{step.body}</small>
                <span className="sr-only">
                  {step.state === "done"
                    ? "Complete."
                    : step.state === "active"
                      ? "In progress."
                      : step.state === "failed"
                        ? "Needs attention."
                        : "Not started yet."}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p className="cws-prepared">
          {origin.completed} of 2 companion cards prepared
          {!ready && !failed && " · Preparation can take up to 24 hours, sometimes longer."}
        </p>

        {!ready && (
          <div className="cws-wait">
            <span className="cws-wait__icon" aria-hidden="true">
              <Heart size={20} />
            </span>
            <div>
              <b>While You Wait</b>
              <p>
                Your adventure doesn’t stop here! Keep exploring AcadeMY, complete more quizzes and
                continue learning while your companions are being prepared.
              </p>
            </div>
          </div>
        )}

        <div className="cws-actions">
          {ready ? (
            <button className="cca-continue" disabled={hatching} onClick={onReveal}>
              <Gift size={20} aria-hidden="true" />
              <span>Open your reveal · Hatch egg</span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          ) : (
            <button className="cca-continue" disabled={busy} onClick={onCheck}>
              <Sparkles size={20} aria-hidden="true" />
              <span>Check arrival</span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}
          <a className="cws-secondary" href={learningHref}>
            Continue learning ↗
          </a>
          <p className="cws-fine">
            You can close this page and come back on any device signed in to this account.
          </p>
        </div>
      </div>
    </section>
  );
}

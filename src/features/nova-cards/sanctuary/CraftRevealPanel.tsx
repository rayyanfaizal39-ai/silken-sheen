import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import { malaysiaRevealTime, revealCountdown } from "./reveal-countdown";
import { craftRevealPhase, type CraftRevealPhase } from "./craft-reveal";
import "./craft-reveal-panel.css";

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

/**
 * Compact scheduled-reveal strip for the one-companion profile.
 * Uses the real `origin.revealAfter` timestamp via `revealCountdown` — never invents a clock.
 */
export function CraftRevealPanel({
  revealAfter,
  artOptionCount,
  hasPermanentArtwork,
  busy,
  onCheck,
}: {
  revealAfter: string | null | undefined;
  artOptionCount: number;
  hasPermanentArtwork: boolean;
  busy?: boolean;
  onCheck?: () => void;
}) {
  const first = revealCountdown(revealAfter, Date.now());
  const tick = first.kind === "counting" && !hasPermanentArtwork;
  const now = useNow(tick);
  const { phase, countdown } =
    now === null
      ? {
          phase: (hasPermanentArtwork ? "selected" : "preparing") as CraftRevealPhase,
          countdown: first,
        }
      : craftRevealPhase({
          hasPermanentArtwork,
          artOptionCount,
          revealAfter,
          now,
        });

  if (phase === "selected") return null;

  const copy = copyFor(phase, revealAfter, countdown.kind === "counting" ? countdown : null);

  return (
    <section
      className="cc-reveal"
      data-phase={phase}
      aria-labelledby="cc-reveal-title"
      role="status"
    >
      <p className="cc-reveal__eyebrow" id="cc-reveal-title">
        Your Cosmic Reveal
      </p>
      <p className="cc-reveal__lead">{copy.lead}</p>

      <div className="cc-reveal__panel">
        <CalendarDays className="cc-reveal__icon" size={28} aria-hidden="true" />
        <div className="cc-reveal__body">
          <p className="cc-reveal__label">{copy.label}</p>
          {countdown.kind === "counting" ? (
            <p className="cc-reveal__time" aria-live="off">
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
          ) : countdown.kind === "open" ? (
            <p className="cc-reveal__message">{copy.message}</p>
          ) : (
            <p className="cc-reveal__message">Reveal time not yet scheduled</p>
          )}
          {revealAfter && countdown.kind === "counting" ? (
            <p className="cc-reveal__when">{malaysiaRevealTime(revealAfter)} (Malaysia time)</p>
          ) : null}
          {copy.support ? <p className="cc-reveal__support">{copy.support}</p> : null}
        </div>
      </div>

      {phase === "choose" ? (
        <p className="cc-reveal__ready">
          <Sparkles size={16} aria-hidden="true" /> Your portraits are ready!
        </p>
      ) : onCheck ? (
        <button
          type="button"
          className="cc-reveal__check"
          disabled={busy}
          onClick={onCheck}
        >
          <Clock3 size={16} aria-hidden="true" />
          Check Reveal Status
        </button>
      ) : null}
    </section>
  );
}

function copyFor(
  phase: CraftRevealPhase,
  revealAfter: string | null | undefined,
  counting: Extract<ReturnType<typeof revealCountdown>, { kind: "counting" }> | null,
) {
  switch (phase) {
    case "scheduled":
      return {
        lead: "Your portraits are ready for their scheduled reveal.",
        label: counting ? "Reveal opens in" : "Reveal opens in",
        message: "",
        support:
          "Your portraits will be available when the scheduled reveal opens and all required approvals are complete.",
      };
    case "approval":
      return {
        lead: "Your companion has been discovered.",
        label: "Reveal window",
        message: "Your reveal window has opened. Final checks are still underway.",
        support: "Portraits stay hidden until staff preparation is complete.",
      };
    case "choose":
      return {
        lead: "Your companion has been discovered.",
        label: "Reveal open",
        message: "Choose the portrait you’ll keep forever.",
        support: "",
      };
    case "unscheduled":
      return {
        lead: "Your companion has been discovered.",
        label: "Reveal time",
        message: "Reveal time not yet scheduled",
        support: "Portraits stay hidden until a reveal time is set and approved.",
      };
    case "preparing":
    default:
      return {
        lead: "Your companion has been discovered.",
        label: counting || revealAfter ? "Reveal opens in" : "Reveal time",
        message: "Your unique portrait is being prepared.",
        support:
          "Your portraits will be available when the scheduled reveal opens and all required approvals are complete.",
      };
  }
}

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import {
  CANDIDATE_LABEL,
  NOT_AVAILABLE,
  candidateTitle as title,
  listValues as list,
  sharesIdentity,
  type CompanionCandidate,
} from "../companion-candidates";
import { CandidateArt as Art, CandidateCard } from "./CandidateCard";
import "./awakening-chamber.css";
import "./companion-comparison.css";

const COMPARE: [string, (c: CompanionCandidate) => string | undefined][] = [
  ["Personality", (c) => c.personality],
  ["Element", (c) => c.element],
  ["Strengths", (c) => list(c.strengths)],
  ["Learning Style", (c) => c.learningStyle],
  ["Unique Quality", (c) => c.uniqueQuality],
];

const REVEAL_MOTES = [
  [-66, -52, 0],
  [-42, -74, 38],
  [-18, -58, 72],
  [16, -78, 20],
  [42, -54, 92],
  [68, -28, 46],
  [74, 12, 116],
  [48, 45, 60],
  [18, 72, 130],
  [-20, 64, 84],
  [-52, 44, 144],
  [-76, 8, 104],
  [-58, -18, 158],
  [58, 24, 172],
] as const;

/** A modal that returns focus to the button that opened it. */
function useModal(open: boolean) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const opener = trigger.current;
    if (modal && !modal.open) modal.showModal();
    return () => {
      modal?.close();
      if (opener?.isConnected) opener.focus();
    };
  }, [open]);
  return { dialog, trigger };
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value ?? NOT_AVAILABLE}</dd>
    </div>
  );
}

/**
 * The two-companion reveal: compare, explore and preview either companion freely, then make the
 * one permanent choice through an explicit confirmation. Only `onChoose` saves anything.
 */
export function OriginReveal({
  companions,
  busy,
  error,
  onChoose,
  fictional = false,
  revealing = false,
  onRevealComplete,
}: {
  companions: CompanionCandidate[];
  busy: boolean;
  error: string;
  onChoose: (candidate: "a" | "b") => Promise<boolean>;
  fictional?: boolean;
  /** Controlled by the journey shell so the waiting and comparison surfaces share one timeline. */
  revealing?: boolean;
  onRevealComplete?: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  const [exploring, setExploring] = useState<"a" | "b" | null>(null);
  const [confirming, setConfirming] = useState(false);
  const explore = useModal(exploring !== null);
  const confirm = useModal(confirming);
  const pickedCompanion = companions.find((c) => c.id === picked);
  const explored = companions.find((c) => c.id === exploring);
  const [a, b] = companions;
  useEffect(() => {
    if (revealing) return;
    const focusHeading = () => heading.current?.focus({ preventScroll: true });
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(focusHeading);
    else focusHeading();
  }, [revealing]);

  let note: ReactNode = null;
  if (fictional)
    note = (
      <p className="occ-tag">Fictional preview · sample companions, not real matching results</p>
    );
  else if (sharesIdentity(companions))
    note = (
      <p className="occ-tag occ-tag--muted">
        Both companions share your Cosmic Identity and differ in their artwork.
      </p>
    );

  return (
    <>
      <section
        className="occ"
        aria-labelledby="occ-title"
        aria-busy={revealing}
        data-reveal={revealing ? "playing" : "complete"}
        inert={revealing ? true : undefined}
      >
        {revealing && (
          <div className="occ-cinematic" aria-hidden="true">
            <span className="occ-cinematic__shade" />
            <span className="occ-cinematic__egg-glow" />
            {REVEAL_MOTES.map(([dx, dy, delay], index) => (
              <span
                key={index}
                className="occ-cinematic__mote"
                style={
                  {
                    "--occ-mote-dx": `${dx}px`,
                    "--occ-mote-dy": `${dy}px`,
                    "--occ-mote-delay": `${delay}ms`,
                  } as CSSProperties
                }
              />
            ))}
            <svg
              className="occ-cinematic__streams"
              viewBox="0 0 1000 700"
              preserveAspectRatio="none"
            >
              <path
                className="occ-cinematic__stream occ-cinematic__stream--a"
                d="M300 350 C270 350 230 370 150 430"
              />
              <path
                className="occ-cinematic__stream occ-cinematic__stream--b"
                d="M300 350 C470 320 650 350 850 430"
              />
            </svg>
          </div>
        )}
        <div className="cca-garden" aria-hidden="true">
          <CompanionGarden />
        </div>

        <header className="occ-head">
          <p className="cca-crest">
            <span aria-hidden="true">✦</span> Cosmic Companion <span aria-hidden="true">✦</span>
          </p>
          <h1 ref={heading} id="occ-title" tabIndex={-1}>
            Two Companions. <span>One Lifelong Bond.</span>
          </h1>
          <p className="occ-lead">
            Your journey has revealed two companions that match your unique personality. Explore
            their qualities and choose the one that feels like yours.
          </p>
          {note}
        </header>

        {companions.map((c) => (
          <div key={c.id} className={`occ-slot occ-slot--${c.id}`}>
            <CandidateCard
              c={c}
              picked={picked === c.id}
              onExplore={(trigger) => {
                explore.trigger.current = trigger;
                setExploring(c.id);
              }}
            />
          </div>
        ))}

        {a && b && (
          <section className="occ-compare" aria-labelledby="occ-compare-title">
            <h2 id="occ-compare-title">Compare Your Companions</h2>
            <table>
              <thead>
                <tr>
                  <td />
                  <th scope="col">{title(a)}</th>
                  <th scope="col">{title(b)}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, read]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td data-tone="a">{read(a) ?? NOT_AVAILABLE}</td>
                    <td data-tone="b">{read(b) ?? NOT_AVAILABLE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <div className="occ-select">
          <p className="occ-select__title">Select a companion to continue</p>
          <div className="occ-choices" role="radiogroup" aria-label="Choose your companion">
            {companions.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={picked === c.id}
                className="occ-choice"
                data-tone={c.id}
                disabled={busy}
                onClick={() => setPicked(c.id)}
              >
                <span className="occ-choice__dot" aria-hidden="true" />
                <span>
                  Choose {CANDIDATE_LABEL[c.id]}
                  {c.name && <small>{c.name}</small>}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="occ-confirm"
            disabled={!picked || busy}
            onClick={(event) => {
              confirm.trigger.current = event.currentTarget;
              setConfirming(true);
            }}
          >
            {picked ? (
              <Sparkles size={19} aria-hidden="true" />
            ) : (
              <Lock size={18} aria-hidden="true" />
            )}
            <span>Confirm My Companion</span>
            <ArrowRight size={19} aria-hidden="true" />
          </button>
          <p className="occ-fine">
            Choosing here is only a preview. Once you confirm, this companion will stay with you
            throughout your AcadeMY journey. You cannot change your companion or retake the
            personality quiz.
          </p>
        </div>
      </section>

      <p className="sr-only" role="status" aria-live="polite">
        {revealing ? "Your two companions are awakening." : "Your companions are ready."}
      </p>
      {revealing && onRevealComplete && (
        <button type="button" className="occ-cinematic__skip" onClick={onRevealComplete}>
          Skip reveal
        </button>
      )}

      {explored && (
        <dialog
          ref={explore.dialog}
          className="sanctuary-dialog occ-detail"
          data-tone={explored.id}
          aria-labelledby="occ-detail-title"
          onCancel={(event) => {
            event.preventDefault();
            setExploring(null);
          }}
        >
          <div className="occ-detail__art">
            <Art c={explored} />
          </div>
          <div className="occ-detail__body">
            <p className="occ-card__label">{CANDIDATE_LABEL[explored.id]}</p>
            <h2 id="occ-detail-title">{title(explored)}</h2>
            <p className="occ-species">{explored.species ?? "Species revealed with artwork"}</p>
            <p>{explored.description ?? NOT_AVAILABLE}</p>
            <dl>
              <Detail label="Personality" value={explored.personality} />
              <Detail label="Element" value={explored.element} />
              <Detail label="Strengths" value={list(explored.strengths)} />
              <Detail label="Qualities" value={list(explored.qualities)} />
              <Detail label="Learning style" value={explored.learningStyle} />
              <Detail label="Unique quality" value={explored.uniqueQuality} />
              <Detail label="Abilities" value={list(explored.abilities)} />
              <Detail label="Why it matches you" value={explored.reason} />
            </dl>
            <div className="sanctuary-dialog-actions">
              <button type="button" autoFocus onClick={() => setExploring(null)}>
                ← Back to comparison
              </button>
              <button
                type="button"
                className="sanctuary-primary"
                disabled={busy}
                onClick={() => {
                  setPicked(explored.id);
                  setExploring(null);
                }}
              >
                Choose {CANDIDATE_LABEL[explored.id]}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {confirming && pickedCompanion && (
        <dialog
          ref={confirm.dialog}
          className="sanctuary-dialog"
          aria-labelledby="nova-bond-title"
          aria-describedby="nova-bond-description"
          onCancel={(event) => {
            event.preventDefault();
            if (!busy) setConfirming(false);
          }}
        >
          <span className="sanctuary-bond-seal" aria-hidden="true">
            ◇
          </span>
          <h2 id="nova-bond-title">Your Companion, Your Forever Choice</h2>
          <div id="nova-bond-description">
            <p>This companion will stay with you throughout your AcadeMY journey.</p>
            <p>
              Once confirmed, you cannot change your companion or retake the personality quiz.{" "}
              {title(pickedCompanion)} ({CANDIDATE_LABEL[pickedCompanion.id]}) becomes your
              permanent Cosmic Card.
            </p>
          </div>
          {error && <p role="alert">{error}</p>}
          <div className="sanctuary-dialog-actions">
            <button autoFocus disabled={busy} onClick={() => setConfirming(false)}>
              Go back
            </button>
            <button
              className="sanctuary-primary"
              disabled={busy}
              onClick={() => void onChoose(pickedCompanion.id)}
            >
              {busy ? "Saving your companion…" : "Confirm my companion"}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

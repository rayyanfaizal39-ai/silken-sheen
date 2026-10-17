import { useEffect, useRef, useState } from "react";
import type { StudioState } from "../studio-model";
import type { NovaTraits } from "../model";

export function OriginReveal({
  candidates,
  traits,
  busy,
  error,
  onChoose,
  fictional = false,
}: {
  candidates: StudioState["candidates"];
  traits: NovaTraits;
  busy: boolean;
  error: string;
  onChoose: (candidate: "a" | "b") => Promise<boolean>;
  fictional?: boolean;
}) {
  const [pending, setPending] = useState<"a" | "b" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!pending) return;
    const modal = dialog.current;
    if (modal && !modal.open) modal.showModal();
    return () => {
      modal?.close();
      if (trigger.current?.isConnected) trigger.current.focus();
    };
  }, [pending]);
  return (
    <>
      <section className="sanctuary-reveal">
        <p className="sanctuary-eyebrow">THE NEXT CHAPTER IS YOURS</p>
        <h1 tabIndex={-1}>Choose Your Nova</h1>
        <p>Two companions, one special connection. Choose your favourite.</p>
        <div className="sanctuary-candidates">
          {candidates.map((c) => (
            <article key={c.candidate}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="sanctuary-candidate-art"
                aria-label={`Inspect Origin artwork ${c.candidate.toUpperCase()} at full size`}
              >
                <img
                  className={
                    fictional && c.url.startsWith("https://lh3.googleusercontent.com/")
                      ? "sanctuary-preview-art"
                      : undefined
                  }
                  src={c.url}
                  alt={`${traits.colours} ${traits.creature}, Origin artwork ${c.candidate.toUpperCase()}`}
                  width="1024"
                  height="1536"
                />
                <span className="sanctuary-candidate-frame" />
                <img
                  className="sanctuary-mini-logo"
                  src="/branding/academy-icon.png"
                  alt="AcadeMY"
                  width="28"
                  height="28"
                />
                <span className="sanctuary-element">
                  {traits.element === "Water" ? "💧" : traits.element === "Fire" ? "✦" : "✧"}{" "}
                  {traits.element}
                </span>
                <div className="sanctuary-candidate-name">
                  <h2>{traits.creature}</h2>
                  <span>ORIGIN · ARTWORK {c.candidate.toUpperCase()}</span>
                </div>
              </a>
              <p>
                A {traits.behaviour.toLowerCase()} companion from {traits.habitat.toLowerCase()}.{" "}
                {traits.bond}.
              </p>
              <button
                className="sanctuary-primary"
                disabled={busy}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setPending(c.candidate);
                }}
              >
                Choose this Nova <span aria-hidden="true">✦</span>
              </button>
            </article>
          ))}
        </div>
      </section>
      {pending && (
        <dialog
          ref={dialog}
          className="sanctuary-dialog"
          aria-labelledby="nova-bond-title"
          aria-describedby="nova-bond-description"
          onCancel={(event) => {
            event.preventDefault();
            if (!busy) setPending(null);
          }}
        >
          <span className="sanctuary-bond-seal" aria-hidden="true">
            ◇
          </span>
          <h2 id="nova-bond-title">Bond with this Nova?</h2>
          <p id="nova-bond-description">
            This selection is permanent. Artwork {pending.toUpperCase()} will become your lifelong
            companion and grow alongside you as you earn verified XP. Your card identity, QR and
            serial stay the same.
          </p>
          {error && <p role="alert">{error}</p>}
          <div className="sanctuary-dialog-actions">
            <button autoFocus disabled={busy} onClick={() => setPending(null)}>
              Keep looking
            </button>
            <button
              className="sanctuary-primary"
              disabled={busy}
              onClick={() => void onChoose(pending)}
            >
              {busy ? "Saving your bond…" : "Confirm my permanent Nova"}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

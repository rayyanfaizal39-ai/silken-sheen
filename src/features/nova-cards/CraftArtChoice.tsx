import { useEffect, useRef, useState } from "react";
import { chooseCraftArt, loadOwnerNova } from "./local-session";
import type { NovaCard } from "./model";
import "./nova-cards.css";

/** The two portraits staff uploaded. The owner picks one. */
export function CraftArtChoice({
  card,
  onChoose,
}: {
  card: NovaCard;
  onChoose: (option: 1 | 2) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [notice, setNotice] = useState("");
  const [tone, setTone] = useState<"idle" | "saving" | "success" | "error">("idle");
  const options = card.artOptions ?? [];
  if (options.length !== 2 || card.artworkUrl) return null;
  return (
    <section
      className="nova-art-choice"
      data-craft-art-choice
      aria-label="Choose your companion art"
    >
      <h2>Choose your companion art</h2>
      <div className="nova-art-choice-grid" aria-busy={busy}>
        {options.map((option) => (
          <figure key={option.option}>
            {option.url ? (
              <img src={option.url} alt={`Companion art option ${option.option}`} />
            ) : (
              <p>Option {option.option}</p>
            )}
            <button
              type="button"
              data-craft-option={option.option}
              disabled={busy || locked || !option.url}
              onClick={() => {
                if (busy || locked || !option.url) return;
                setBusy(true);
                setTone("saving");
                setNotice("Saving your portrait…");
                void onChoose(option.option)
                  .then(() => {
                    // One-time pick: lock further clicks even if this panel stays mounted.
                    setLocked(true);
                    setTone("success");
                    setNotice("Portrait saved.");
                  })
                  .catch((error: Error) => {
                    setTone("error");
                    setNotice(error.message || "Could not save your portrait. Please retry.");
                  })
                  .finally(() => {
                    setBusy(false);
                  });
              }}
            >
              Choose option {option.option}
            </button>
          </figure>
        ))}
      </div>
      <p
        className={`nova-notice nova-art-choice-status${tone === "error" ? " is-error" : ""}${tone === "success" ? " is-success" : ""}`}
        role="status"
        aria-live="polite"
        data-craft-status={tone}
      >
        {tone === "saving" ? <span className="nova-inline-spinner" aria-hidden="true" /> : null}
        {notice}
      </p>
    </section>
  );
}

/** Loads the signed-in student's card and saves their one-time art choice. */
export function LiveCraftArtChoice({ onChanged }: { onChanged?: (card: NovaCard | null) => void }) {
  const [card, setCard] = useState<NovaCard | null>(null);
  const changed = useRef(onChanged);
  changed.current = onChanged;

  useEffect(() => {
    let active = true;
    const apply = (next: NovaCard | null) => {
      if (!active) return;
      setCard(next);
      changed.current?.(next);
    };
    const load = () => {
      loadOwnerNova()
        .then(([next]) => apply(next))
        .catch(() => apply(null));
    };
    load();
    let unsubscribe = () => {};
    if (import.meta.env.DEV) {
      void import("@/lib/dev-auth/store").then((store) => {
        if (!active) return;
        unsubscribe = store.subscribeDevStore(() => {
          try {
            apply(store.devOwnerNova().card);
          } catch {
            apply(null);
          }
        });
      });
    }
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (!card) return null;
  return (
    <CraftArtChoice
      card={card}
      onChoose={async (option) => {
        const next = await chooseCraftArt(option);
        setCard(next);
        onChanged?.(next);
      }}
    />
  );
}

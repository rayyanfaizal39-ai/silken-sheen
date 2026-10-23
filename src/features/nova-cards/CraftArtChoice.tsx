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
  const [notice, setNotice] = useState("");
  const options = card.artOptions ?? [];
  if (options.length !== 2 || card.artworkUrl) return null;
  return (
    <section
      className="nova-art-choice"
      data-craft-art-choice
      aria-label="Choose your companion art"
    >
      <h2>Choose your companion art</h2>
      <div className="nova-art-choice-grid">
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
              disabled={busy || !option.url}
              onClick={() => {
                setBusy(true);
                setNotice("");
                void onChoose(option.option)
                  .catch((error: Error) => setNotice(error.message))
                  .finally(() => setBusy(false));
              }}
            >
              Choose option {option.option}
            </button>
          </figure>
        ))}
      </div>
      <p className="nova-notice" role="status">
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

import { useEffect, useState } from "react";
import { DEMO_CARDS, type NovaCard as Card } from "./model";
import { getMyCard } from "./server";
import type { StudioState } from "./studio-model";
import { SanctuaryCardPanel } from "./sanctuary/SanctuaryCardPanel";
import { SOURCE_FOX_ARTWORK } from "./sanctuary/preview-artwork";
export default function StudioCompletedCard({
  publicId,
  fictional,
  candidate,
  traits,
  state,
  busy,
  onEvolve,
}: {
  publicId: string;
  fictional: boolean;
  candidate: "a" | "b";
  traits?: Card["traits"];
  state?: StudioState;
  busy?: boolean;
  onEvolve?: (stage: number) => Promise<boolean>;
}) {
  const [card, setCard] = useState<Card | null>(null),
    [notice, setNotice] = useState("");
  const [origin, setOrigin] = useState("https://www.myacademy.my");
  const evolutionRevision = state?.evolutions.map((e) => `${e.stage}:${e.status}`).join("|") ?? "";
  useEffect(() => {
    setOrigin(window.location.origin);
    let active = true;
    if (fictional) {
      const sample = DEMO_CARDS.find((c) => c.publicId === publicId) ?? DEMO_CARDS[0];
      setCard({
        ...sample,
        variant: candidate,
        traits: traits ?? sample.traits,
        artworkUrl:
          publicId === "demo-mia" ? SOURCE_FOX_ARTWORK[candidate === "a" ? 0 : 1] : undefined,
      });
      return;
    }
    getMyCard()
      .then((c) => {
        if (active) setCard(c);
      })
      .catch(() => {
        if (active) setNotice("Open your collection to refresh the artwork.");
      });
    return () => {
      active = false;
    };
  }, [publicId, fictional, candidate, traits, evolutionRevision]);
  return (
    <div className="ns-completed-card">
      {card ? (
        <SanctuaryCardPanel
          card={card}
          origin={origin}
          state={state}
          busy={busy}
          onEvolve={onEvolve}
        />
      ) : (
        <p role="status">{notice || "Preparing your collectible…"}</p>
      )}
    </div>
  );
}

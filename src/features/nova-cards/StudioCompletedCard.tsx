import { useEffect, useState } from "react";
import { DEMO_CARDS, type LegacyNovaCard, type NovaCard as Card } from "./model";
import { getMyCard } from "./server";
import { SanctuaryCardPanel } from "./sanctuary/SanctuaryCardPanel";
import { SOURCE_FOX_ARTWORK } from "./sanctuary/preview-artwork";
export default function StudioCompletedCard({
  publicId,
  fictional,
  candidate,
  traits,
}: {
  publicId: string;
  fictional: boolean;
  candidate: "a" | "b";
  traits?: Card["traits"];
}) {
  const [card, setCard] = useState<Card | null>(null),
    [notice, setNotice] = useState("");
  const [origin, setOrigin] = useState("https://www.myacademy.my");
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
          publicId === "demo-mia" &&
          JSON.stringify(traits ?? sample.traits) === JSON.stringify(sample.traits)
            ? SOURCE_FOX_ARTWORK[candidate === "a" ? 0 : 1]
            : undefined,
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
  }, [publicId, fictional, candidate, traits]);
  return (
    <div className="ns-completed-card">
      {card?.traits ? (
        // Legacy presentation only; matched cards show the My Cosmic Companion profile.
        <SanctuaryCardPanel card={card as LegacyNovaCard} origin={origin} />
      ) : (
        <p role="status">{notice || "Preparing your collectible…"}</p>
      )}
    </div>
  );
}

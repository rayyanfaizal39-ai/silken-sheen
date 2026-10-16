import { useEffect, useState } from "react";
import { NovaCard } from "./NovaCard";
import { cardUrl, DEMO_CARDS, type NovaCard as Card } from "./model";
import { getMyCard } from "./server";
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
      setCard({ ...sample, variant: candidate, traits: traits ?? sample.traits });
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
      {card ? (
        <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
      ) : (
        <p role="status">{notice || "Preparing your collectible…"}</p>
      )}
    </div>
  );
}

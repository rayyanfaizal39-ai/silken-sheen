import { useEffect, useState } from "react";
import { NovaCard } from "@/features/nova-cards/NovaCard";
import { cardUrl, type NovaCard as Card } from "@/features/nova-cards/model";
import { devOwnerNova } from "./store";
import "@/features/nova-cards/nova-cards.css";

/** The browser-generated portrait card, with the same front and QR/barcode back as /nova. */
export function DevGeneratedCard() {
  const [card, setCard] = useState<Card | null>(null);
  const [origin, setOrigin] = useState("http://localhost:8080");

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      setCard(devOwnerNova().card);
    } catch {
      setCard(null);
    }
  }, []);

  if (!card) return null;
  return (
    <div className="nova-page">
      <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
    </div>
  );
}

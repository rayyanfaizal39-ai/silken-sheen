import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NovaCard } from "@/features/nova-cards/NovaCard";
import { cardFace, cardUrl } from "@/features/nova-cards/model";
import { getPublicCard } from "@/features/nova-cards/server";
import { SITE_URL } from "@/lib/seo";
import { novaHead } from "@/features/nova-cards/head";

export const Route = createFileRoute("/card_/c/$publicId")({
  loader: ({ params }) => getPublicCard({ data: params.publicId }),
  staleTime: 0,
  gcTime: 0,
  head: ({ loaderData, params }) =>
    novaHead({
      title: loaderData ? `${loaderData.username}'s Nova Companion` : "Nova Companion",
      description: loaderData
        ? `${cardFace(loaderData).species} · ${cardFace(loaderData).eyebrow}. An AcadeMY Nova collectible companion.`
        : "This companion card is unavailable.",
      path: `/card/c/${encodeURIComponent(params.publicId)}`,
      noindex: true,
      image: `${SITE_URL}/nova-cards/preview.png`,
    }),
  component: PublicNova,
  errorComponent: () => (
    <main className="nova-page nova-unavailable">
      <h1>Card unavailable</h1>
      <p>This card is private, does not exist, or cannot be loaded right now.</p>
      <a href="/nova/demo">Explore fictional demos</a>
    </main>
  ),
});

function PublicNova() {
  const initialCard = Route.useLoaderData();
  const { publicId } = Route.useParams();
  const [card, setCard] = useState(initialCard);
  const [origin, setOrigin] = useState(SITE_URL);
  // Recheck on return to the tab so revoked cards aren't retained by router history.
  useEffect(() => {
    setOrigin(window.location.origin);
    setCard(initialCard);
    let active = true;
    const check = () => {
      if (!document.hidden)
        getPublicCard({ data: publicId })
          .then((value) => {
            if (active) setCard(value);
          })
          .catch(() => {
            if (active) setCard(null);
          });
    };
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      active = false;
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [initialCard, publicId]);
  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a className="nova-home" href="/nova">
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>NOVA COMPANION COLLECTION</span>
        <a href="/nova/demo">Explore demos ↗</a>
      </header>
      {card ? (
        <div className="nova-single">
          <p className="nova-eyebrow">
            {card.demo ? "FICTIONAL DEMONSTRATION CARD" : "A COMPANION. A COLLECTIBLE. A JOURNEY."}
          </p>
          <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
        </div>
      ) : (
        <section className="nova-unavailable">
          <h1>Card unavailable</h1>
          <p>This card is private or does not exist.</p>
          <a href="/nova/demo">Explore fictional demos</a>
        </section>
      )}
    </main>
  );
}

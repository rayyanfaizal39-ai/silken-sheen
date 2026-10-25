import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NovaCard } from "../../../../src/features/nova-cards/NovaCard";
import { cardUrl } from "../../../../src/features/nova-cards/model";
import {
  publicCardDescription,
  publicCardOrigin,
  toPublicSnapshot,
} from "../../../../src/features/nova-cards/public-card";
import { cardsPaths } from "../../../../src/features/nova-cards/paths";
import { getPublicCard } from "../../../../src/features/nova-cards/server";
import { novaHead } from "../../../../src/features/nova-cards/head";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/card_/c/$publicId")({
  loader: ({ params }) => getPublicCard({ data: params.publicId }),
  staleTime: 0,
  gcTime: 0,
  head: ({ loaderData, params }) => {
    const shared = loaderData?.sharing ? toPublicSnapshot(loaderData) : null;
    return novaHead({
      title: shared ? `${shared.displayName}'s ${shared.companionName}` : "Companion card",
      description: shared ? publicCardDescription(shared) : "This card is not available.",
      path: `/card/c/${encodeURIComponent(params.publicId)}`,
      noindex: true,
      image: `${SITE_URL}/nova-cards/preview.png`,
    });
  },
  component: PublicCard,
  errorComponent: UnavailableCard,
});

function UnavailableCard() {
  return (
    <main className="nova-page nova-unavailable">
      <h1>This card is not available</h1>
      <p>
        This permanent link is valid, but the companion is private or the card id is not recognised.
        Ask the owner to enable sharing, then refresh.
      </p>
      <a href={cardsPaths.home}>AcadeMY Cards</a>
    </main>
  );
}

function PublicCard() {
  const initialCard = Route.useLoaderData();
  const { publicId } = Route.useParams();
  const [card, setCard] = useState(initialCard);
  const [origin, setOrigin] = useState(SITE_URL);

  useEffect(() => {
    setOrigin(publicCardOrigin());
    setCard(initialCard);
    let active = true;
    const refresh = () => {
      if (document.hidden) return;
      getPublicCard({ data: publicId })
        .then((value) => {
          if (active) setCard(value);
        })
        .catch(() => {
          if (active) setCard(null);
        });
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      active = false;
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [initialCard, publicId]);

  const permanentUrl = card ? cardUrl(card.publicId, origin || publicCardOrigin()) : "";
  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a className="nova-home" href={cardsPaths.home}>
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY Cards
        </a>
        <span>NOVA COMPANION COLLECTION</span>
        {card?.demo ? <a href={cardsPaths.demo}>Explore demos ↗</a> : null}
      </header>
      {card ? (
        <div className="nova-single">
          <p className="nova-eyebrow">
            {card.demo ? "FICTIONAL DEMONSTRATION CARD" : "A COMPANION. A COLLECTIBLE. A JOURNEY."}
          </p>
          <NovaCard card={card} url={permanentUrl} pictureShare />
        </div>
      ) : (
        <UnavailableCard />
      )}
    </main>
  );
}

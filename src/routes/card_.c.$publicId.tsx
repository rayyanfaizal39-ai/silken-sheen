import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NovaCard } from "@/features/nova-cards/NovaCard";
import { cardUrl, type NovaCard as Card } from "@/features/nova-cards/model";
import { loadOwnedOrPublicCard } from "@/features/nova-cards/local-session";
import { getPublicCardPage } from "@/features/nova-cards/server";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { novaHead } from "@/features/nova-cards/head";
import {
  PUBLIC_PREVIEW_HEIGHT,
  PUBLIC_PREVIEW_WIDTH,
  publicCardDescription,
  publicPreviewUrl,
  toPublicSnapshot,
} from "@/features/nova-cards/public-card";

export const Route = createFileRoute("/card_/c/$publicId")({
  loader: ({ params }) => getPublicCardPage({ data: params.publicId }),
  staleTime: 0,
  gcTime: 0,
  head: ({ loaderData, params }) => {
    const card = loaderData?.card ?? null;
    const shared = card?.sharing ? toPublicSnapshot(card) : null;
    const path = `/card/c/${encodeURIComponent(params.publicId)}`;
    if (!shared) {
      return novaHead({
        title: "Companion card",
        description: "This card is not available.",
        path,
        noindex: true,
        image: DEFAULT_OG_IMAGE,
      });
    }
    return novaHead({
      title: `${shared.displayName}'s ${shared.companionName}`,
      description: publicCardDescription(shared),
      path,
      noindex: true,
      image: publicPreviewUrl(params.publicId, loaderData?.origin),
      imageWidth: PUBLIC_PREVIEW_WIDTH,
      imageHeight: PUBLIC_PREVIEW_HEIGHT,
      imageAlt: `${shared.displayName}'s ${shared.companionName}`,
    });
  },
  component: PublicNova,
  errorComponent: () => (
    <main className="nova-page nova-unavailable">
      <h1>This card is not available</h1>
      <p>The link does not open a public card.</p>
    </main>
  ),
});

function PublicFacts({ card }: { card: Card }) {
  const fields = toPublicSnapshot(card);
  return (
    <section className="nova-public-facts" aria-label="Public companion card">
      <h1>{fields.displayName}</h1>
      <p>
        {fields.companionName}
        {fields.title ? ` · ${fields.title}` : ""}
      </p>
      {fields.traits.length > 0 ? (
        <ul>
          {fields.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      ) : null}
      <p>
        {fields.rarity}{" "}
        <span aria-label={`${fields.stars} ${fields.stars === 1 ? "star" : "stars"}`}>
          {"★".repeat(fields.stars)}
        </span>
      </p>
      {fields.aura ? <p>{fields.aura}</p> : null}
      <p>{fields.serial}</p>
    </section>
  );
}

function PublicNova() {
  const initial = Route.useLoaderData();
  const { publicId } = Route.useParams();
  const [card, setCard] = useState(initial.card);
  const [origin, setOrigin] = useState(initial.origin);
  // Recheck on return to the tab so revoked cards aren't retained by router history.
  useEffect(() => {
    setOrigin(window.location.origin);
    setCard(initial.card);
    let active = true;
    const check = () => {
      if (!document.hidden)
        loadOwnedOrPublicCard(publicId)
          .then((value) => {
            if (active) setCard(value);
          })
          .catch(() => {
            if (active) setCard(null);
          });
    };
    if (import.meta.env.DEV) check();
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      active = false;
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [initial, publicId]);
  return (
    <main className="nova-page" data-public-card={card ? "open" : "unavailable"}>
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
          <PublicFacts card={card} />
          <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
        </div>
      ) : (
        <section className="nova-unavailable">
          <h1>This card is not available</h1>
          <p>The link does not open a public card.</p>
        </section>
      )}
    </main>
  );
}

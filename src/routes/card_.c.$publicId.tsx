import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CardShareOptions } from "@/features/nova-cards/CardShareOptions";
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
  publicCardOrigin,
  publicPreviewUrl,
  toPublicSnapshot,
} from "@/features/nova-cards/public-card";
import { cardsPaths } from "@/features/nova-cards/paths";

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
  const [notice, setNotice] = useState("");
  // Recheck on return to the tab so revoked cards aren't retained by router history.
  useEffect(() => {
    // Permanent share links always use the public site origin, never a preview or localhost host
    // (except when developing on a local host — see publicCardOrigin).
    setOrigin(publicCardOrigin());
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
  const permanentUrl = card ? cardUrl(card.publicId, origin || publicCardOrigin()) : "";
  return (
    <main className="nova-page" data-public-card={card ? "open" : "unavailable"}>
      <header className="nova-topbar">
        <a className="nova-home" href={cardsPaths.home}>
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>NOVA COMPANION COLLECTION</span>
        {card?.demo ? <a href={cardsPaths.demo}>Explore demos ↗</a> : <a href="/companion">Cosmic Companion</a>}
      </header>
      {card ? (
        <div className="nova-single">
          <p className="nova-eyebrow">
            {card.demo ? "FICTIONAL DEMONSTRATION CARD" : "A COMPANION. A COLLECTIBLE. A JOURNEY."}
          </p>
          <PublicFacts card={card} />
          <NovaCard card={card} url={permanentUrl} />
          {card.sharing ? (
            <section className="nova-share-panel" aria-label="Share this card">
              <h2>Share this card</h2>
              <CardShareOptions card={card} url={permanentUrl} onNotice={setNotice} />
              <p className="nova-notice" role="status">
                {notice}
              </p>
            </section>
          ) : null}
        </div>
      ) : (
        <section className="nova-unavailable">
          <h1>This card is not available</h1>
          <p>
            This permanent link is valid, but the companion is private or the card id is not
            recognised. Ask the owner to enable sharing, then refresh.
          </p>
          <a href="/companion">Discover Cosmic Companion</a>
        </section>
      )}
    </main>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { DEMO_CARDS, validPublicId, type NovaCard } from "./model";
import { NOVA_ACCESS_ERRORS } from "./access";
import { novaEntitlement, type NovaEntitlement, type SubscriptionRow } from "./entitlement";

export type { NovaEntitlement };

function client() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  const db = getSupabaseServerClient();
  if (!db) throw new Error(NOVA_ACCESS_ERRORS.unconfigured);
  return db;
}

// Server verification is independent of any client-provided plan.
export async function resolveNovaEntitlement(
  db: ReturnType<typeof client>,
  userId: string,
): Promise<NovaEntitlement> {
  const { data, error } = await db
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error("We couldn't verify your subscription. Please try again.");
  return novaEntitlement(data as SubscriptionRow);
}
export const getNovaEntitlement = createServerFn({ method: "GET" }).handler(
  async (): Promise<NovaEntitlement> => {
    const db = client();
    const { data, error } = await db.auth.getUser();
    if (error || !data.user || data.user.is_anonymous)
      throw new Error(NOVA_ACCESS_ERRORS.signedOut);
    return resolveNovaEntitlement(db, data.user.id);
  },
);

async function signedArtwork(db: ReturnType<typeof client>, path: string) {
  const { NOVA_ARTWORK_SIGNED_URL_SECONDS } = await import("./artwork-signing");
  const { data, error } = await db.storage
    .from("nova-artwork")
    .createSignedUrl(path, NOVA_ARTWORK_SIGNED_URL_SECONDS);
  if (error || !data?.signedUrl) throw new Error("Companion artwork is temporarily unavailable.");
  return data.signedUrl;
}

async function withArtwork(db: ReturnType<typeof client>, card: NovaCard | null) {
  if (!card) return card;
  const artworkUrl = card.artworkPath ? await signedArtwork(db, card.artworkPath) : card.artworkUrl;
  const artOptions = card.artOptions
    ? await Promise.all(
        card.artOptions.map(async (option) =>
          option.path
            ? { option: option.option, url: await signedArtwork(db, option.path) }
            : option,
        ),
      )
    : undefined;
  return { ...card, artworkPath: undefined, artworkUrl, artOptions };
}

export const getPublicCard = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.string().max(64).parse(input))
  .handler(async ({ data: id }): Promise<NovaCard | null> => {
    setResponseHeader("Cache-Control", "private, no-store, max-age=0");
    const { loadPublicNovaCard } = await import("./public-loader.server");
    return loadPublicNovaCard(id);
  });

export const getPublicCardPage = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.string().max(64).parse(input))
  .handler(async ({ data: id }): Promise<{ card: NovaCard | null; origin: string }> => {
    setResponseHeader("Cache-Control", "private, no-store, max-age=0");
    const { loadPublicNovaCard, publicRequestOrigin } = await import("./public-loader.server");
    return { card: await loadPublicNovaCard(id), origin: publicRequestOrigin() };
  });

export const getMyCard = createServerFn({ method: "GET" }).handler(
  async (): Promise<NovaCard | null> => {
    const db = client();
    const { data: auth, error: authError } = await db.auth.getUser();
    if (authError || !auth.user || auth.user.is_anonymous)
      throw new Error(NOVA_ACCESS_ERRORS.signedOut);
    const { data, error } = await db.rpc("get_my_nova_card");
    if (error) throw new Error(NOVA_ACCESS_ERRORS.storagePending);
    return withArtwork(db, data as NovaCard | null);
  },
);

export const chooseCraftArt = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.union([z.literal(1), z.literal(2)]).parse(input))
  .handler(async ({ data: option }): Promise<NovaCard> => {
    const db = client();
    const { data, error } = await db.rpc("nova_choose_craft_art", { chosen_option: option });
    if (error) throw new Error(error.message || "The portrait could not be chosen.");
    const card = await withArtwork(db, data as NovaCard | null);
    if (!card) throw new Error("The portrait could not be chosen.");
    return card;
  });

export const setSharing = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.boolean().parse(input))
  .handler(async ({ data: enabled }): Promise<NovaCard> => {
    const db = client();
    const { data, error } = await db.rpc("set_nova_sharing", { enabled });
    if (error) throw new Error("Sharing could not be updated. Please try again.");
    return (await withArtwork(db, data as NovaCard))!;
  });

// Re-authorize at export time: short-lived private URLs may have expired since page load.
// Owner RPC is used only when the signed-in user owns this publicId. Visitors and
// other accounts fall through to get_public_nova_card (sharing required). Anonymous
// artwork refresh never depends on owner-only authentication.
export const getCardForExport = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.string().max(64).parse(input))
  .handler(async ({ data: id }): Promise<NovaCard> => {
    const demo = DEMO_CARDS.find((c) => c.publicId === id);
    if (demo) return demo;
    if (!validPublicId(id)) throw new Error("Card is unavailable.");
    const db = client();
    const { data: auth } = await db.auth.getUser();
    if (auth.user && !auth.user.is_anonymous) {
      const { data: mine, error } = await db.rpc("get_my_nova_card");
      if (!error && (mine as NovaCard | null)?.publicId === id)
        return (await withArtwork(db, mine as NovaCard))!;
    }
    const { loadPublicNovaCard } = await import("./public-loader.server");
    const card = await loadPublicNovaCard(id);
    if (!card) throw new Error("This card is private or unavailable. Refresh to check access.");
    return card;
  });

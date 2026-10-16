import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { DEMO_CARDS, validPublicId, type NovaCard } from "./model";

function client() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  const db = getSupabaseServerClient();
  if (!db) throw new Error("Nova storage is not configured. Explore the fictional demos below.");
  return db;
}

export type NovaEntitlement = {
  active: boolean;
  status: "active" | "pending" | "expired" | "cancelled" | "free";
};

// Server verification is independent of any client-provided plan.
async function resolveNovaEntitlement(
  db: ReturnType<typeof client>,
  userId: string,
): Promise<NovaEntitlement> {
  const { data, error } = await db
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error("We couldn't verify your subscription. Please try again.");
  if (!data) return { active: false, status: "free" };
  const active =
    data.status === "active" &&
    (data.plan === "pro" || data.plan === "premium") &&
    typeof data.current_period_end === "string" &&
    Date.parse(data.current_period_end) > Date.now();
  return {
    active,
    status: active
      ? "active"
      : data.status === "pending"
        ? "pending"
        : data.status === "cancelled"
          ? "cancelled"
          : "expired",
  };
}

export const getNovaEntitlement = createServerFn({ method: "GET" }).handler(
  async (): Promise<NovaEntitlement> => {
    const db = client();
    const { data, error } = await db.auth.getUser();
    if (error || !data.user || data.user.is_anonymous)
      throw new Error("Sign in to access your Nova companion.");
    return resolveNovaEntitlement(db, data.user.id);
  },
);

async function withArtwork(db: ReturnType<typeof client>, card: NovaCard | null) {
  if (card?.artworkPath) {
    const { data, error } = await db.storage
      .from("nova-artwork")
      .createSignedUrl(card.artworkPath, 60);
    if (error) throw new Error("Companion artwork is temporarily unavailable.");
    return { ...card, artworkPath: undefined, artworkUrl: data.signedUrl };
  }
  return card;
}

export const getPublicCard = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.string().max(64).parse(input))
  .handler(async ({ data: id }): Promise<NovaCard | null> => {
    setResponseHeader("Cache-Control", "private, no-store, max-age=0");
    const demo = DEMO_CARDS.find((c) => c.publicId === id);
    if (demo) return demo;
    if (!validPublicId(id)) return null;
    const db = client();
    const { data, error } = await db.rpc("get_public_nova_card", { requested_public_id: id });
    if (error)
      throw new Error(
        "Nova cards are temporarily unavailable. The reviewed migration may still be pending.",
      );
    return withArtwork(db, data as NovaCard | null);
  });

export const getMyCard = createServerFn({ method: "GET" }).handler(
  async (): Promise<NovaCard | null> => {
    const db = client();
    const { data: auth, error: authError } = await db.auth.getUser();
    if (authError || !auth.user || auth.user.is_anonymous)
      throw new Error("Sign in with a student account to save your permanent card.");
    const { data, error } = await db.rpc("get_my_nova_card");
    if (error) throw new Error("Nova storage is awaiting setup. Your existing progress is safe.");
    return withArtwork(db, data as NovaCard | null);
  },
);

export const createCard = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        username: z.string().regex(/^[A-Za-z0-9_]{2,24}$/),
        answers: z.array(z.number().int().min(0).max(2)).length(12),
        variant: z.enum(["a", "b"]),
      })
      .parse(input),
  )
  .handler(async ({ data: input }): Promise<NovaCard> => {
    const db = client();
    const { data: auth, error: authError } = await db.auth.getUser();
    if (authError || !auth.user || auth.user.is_anonymous)
      throw new Error("Sign in to create your Nova companion.");
    const entitlement = await resolveNovaEntitlement(db, auth.user.id);
    if (!entitlement.active)
      throw new Error("An active Pro or Premium subscription is required to create your Nova.");
    const { data, error } = await db.rpc("create_nova_card", {
      display_username: input.username,
      questionnaire: input.answers,
      selected_variant: input.variant,
    });
    if (error)
      throw new Error(
        "Your card could not be saved. Sign in and check that Nova storage is ready.",
      );
    return (await withArtwork(db, data as NovaCard))!;
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
    const { data, error } = await db.rpc("get_public_nova_card", { requested_public_id: id });
    if (error || !data)
      throw new Error("This card is private or unavailable. Refresh to check access.");
    return (await withArtwork(db, data as NovaCard))!;
  });

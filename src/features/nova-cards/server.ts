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

// Admin-only human review of Cosmic Companion artwork. Every call runs the SQL functions as the
// signed-in user, so nova_require_admin() (active admin profile, never anonymous) is the single
// authority; the service client is used only afterwards, to sign the private files an admin
// has just been shown, for 60 seconds.
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { getSupabaseAdminClient } from "@/lib/billing.server";

export interface ReviewItem {
  artworkId: string;
  cardId: string;
  slot: "a" | "b";
  sha256: string;
  phash: string;
  createdAt: string;
  url: string | null;
  checks: { warnings?: string[]; subjectPermille?: number; transparentPermille?: number } | null;
  candidate: { species?: string; element?: string; personality?: string; name?: string } | null;
  dna: { fingerprint?: string; genes?: Record<string, string> } | null;
  sibling: { status: string; distance: number | null } | null;
}

async function reviewer() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  const db = getSupabaseServerClient();
  if (!db) throw new Error("Review is not configured.");
  const { data, error } = await db.auth.getUser();
  if (error || !data.user || data.user.is_anonymous)
    throw new Error("Sign in as an administrator.");
  return db;
}
const failure = (error: { message?: string }) =>
  new Error(
    /administrator/i.test(error.message ?? "")
      ? "Administrator access is required."
      : (error.message ?? "Review failed."),
  );

export const getCompanionReviewQueue = createServerFn({ method: "GET" }).handler(async () => {
  const db = await reviewer();
  const { data, error } = await db.rpc("nova_admin_review_queue", { max_items: 50 });
  if (error) throw failure(error);
  const items = (data ?? []) as (Omit<ReviewItem, "url"> & { storagePath: string })[];
  const storage = getSupabaseAdminClient().storage.from("nova-artwork");
  return Promise.all(
    items.map(async ({ storagePath, ...item }): Promise<ReviewItem> => {
      const { NOVA_ARTWORK_SIGNED_URL_SECONDS } = await import("./artwork-signing");
      const { data: signed } = await storage.createSignedUrl(
        storagePath,
        NOVA_ARTWORK_SIGNED_URL_SECONDS,
      );
      return { ...item, url: signed?.signedUrl ?? null };
    }),
  );
});

export const decideCompanionArtwork = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        artworkId: z.string().uuid(),
        decision: z.enum(["approve", "reject"]),
        note: z.string().trim().max(500).nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const db = await reviewer();
    const { data: result, error } = await db.rpc("nova_admin_review_artwork", {
      artwork: data.artworkId,
      decision: data.decision,
      note: data.note,
    });
    if (error) throw failure(error);
    return result as { artworkId: string; status: "approved" | "rejected" };
  });

export const retryCompanionCandidate = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        cardId: z.string().uuid(),
        slot: z.enum(["a", "b"]),
        reason: z.string().trim().min(12).max(500),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const db = await reviewer();
    const { data: result, error } = await db.rpc("nova_admin_retry_companion", {
      card: data.cardId,
      slot: data.slot,
      reason: data.reason,
    });
    if (error) throw failure(error);
    return result as { candidate: string; status: "pending" };
  });

// Staff upload of a Cosmic Companion portrait. The signed-in user runs the
// nova_admin_* functions, so nova_require_admin() is the authority. The service
// role only stores the file in the private nova-artwork bucket.
import { createHash } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/billing.server";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import type { CraftBrief } from "./craft-queue";

const MAX_BYTES = 1_000_000;

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
      : (error.message ?? "The portrait could not be saved."),
  );

function answersOf(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((item) => typeof item === "number") : [];
}

type QueueRow = Omit<CraftBrief, "previewUrl" | "answers" | "form" | "email" | "artworkId"> & {
  answers: unknown;
  form: string | null;
  email: string | null;
  artworkId: string | null;
  storagePath: string | null;
};

export const getCraftQueue = createServerFn({ method: "GET" }).handler(async () => {
  const db = await reviewer();
  const { data, error } = await db.rpc("nova_admin_craft_queue", { max_items: 200 });
  if (error) throw failure(error);
  const rows = (data ?? []) as QueueRow[];
  const storage = getSupabaseAdminClient().storage.from("nova-artwork");
  return Promise.all(
    rows.map(async (row): Promise<CraftBrief> => {
      let previewUrl: string | null = null;
      if (row.storagePath) {
        const { data: signed } = await storage.createSignedUrl(row.storagePath, 60);
        previewUrl = signed?.signedUrl ?? null;
      }
      return {
        cardId: row.cardId,
        publicId: row.publicId,
        serial: row.serial,
        username: row.username,
        studentName: row.studentName,
        form: row.form ?? "",
        email: row.email ?? "",
        answers: answersOf(row.answers),
        slot: row.slot,
        companionName: row.companionName,
        species: row.species,
        element: row.element,
        personality: row.personality,
        status: row.status,
        artworkId: row.artworkId,
        previewUrl,
      };
    }),
  );
});

export const attachCraftPortrait = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        cardId: z.string().uuid(),
        fileName: z.string().trim().min(1).max(120),
        dataUrl: z.string().min(32).max(1_900_000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const db = await reviewer();
    const match = data.dataUrl.match(/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/);
    if (!match) throw new Error("Upload a PNG portrait.");
    const bytes = Buffer.from(match[1], "base64");
    if (bytes.length < 8 || bytes.length > MAX_BYTES)
      throw new Error("Upload a PNG portrait under 1 MB.");
    if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47)
      throw new Error("Upload a PNG portrait.");
    const digest = createHash("sha256").update(bytes).digest("hex");
    const { data: path, error: pathError } = await db.rpc("nova_admin_craft_artwork_path", {
      card: data.cardId,
      digest,
    });
    if (pathError || typeof path !== "string")
      throw failure(pathError ?? { message: "No storage path." });
    const storage = getSupabaseAdminClient().storage.from("nova-artwork");
    const { error: uploadError } = await storage.upload(path, bytes, {
      contentType: "image/png",
      upsert: false,
    });
    if (uploadError && !/already exists|duplicate/i.test(uploadError.message))
      throw new Error("The portrait could not be stored.");
    const { data: result, error } = await db.rpc("nova_admin_attach_craft_artwork", {
      card: data.cardId,
      digest,
    });
    if (error) throw failure(error);
    return result as { artworkId: string; storagePath: string; serial: string; status: string };
  });

export const publishCraftPortrait = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ artworkId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const db = await reviewer();
    const { data: result, error } = await db.rpc("nova_admin_publish_craft_artwork", {
      artwork: data.artworkId,
    });
    if (error) throw failure(error);
    return result as { artworkId: string; serial: string; status: "approved" };
  });

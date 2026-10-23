// Staff upload of a Cosmic Companion portrait. The signed-in user runs the
// nova_admin_* functions, so nova_require_admin() is the authority. The service
// role only stores the file in the private nova-artwork bucket.
import { createHash } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/billing.server";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import type { CraftBrief, CraftOptionUpload } from "./craft-queue";

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

function traitsOf(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function choiceOf(value: unknown): 1 | 2 | null {
  return value === 1 || value === 2 ? value : null;
}

type StoredOption = { option?: unknown; path?: unknown };

type QueueRow = {
  publicId: string;
  serial: string;
  displayName: string;
  form: string | null;
  companionName: string;
  species: string;
  element: string;
  traits: unknown;
  personality: string;
  status: CraftBrief["status"];
  choice: unknown;
  optionPaths: StoredOption[] | null;
};

function pngBytes(dataUrl: string) {
  const match = dataUrl.match(/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/);
  if (!match) throw new Error("Upload a PNG portrait.");
  const bytes = Buffer.from(match[1], "base64");
  if (bytes.length < 8 || bytes.length > MAX_BYTES)
    throw new Error("Upload a PNG portrait under 1 MB.");
  if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47)
    throw new Error("Upload a PNG portrait.");
  return bytes;
}

const optionUpload = z.object({
  option: z.union([z.literal(1), z.literal(2)]),
  fileName: z.string().trim().min(1).max(120),
  dataUrl: z.string().min(32).max(1_900_000),
});

export const getCraftQueue = createServerFn({ method: "GET" }).handler(async () => {
  const db = await reviewer();
  const { data, error } = await db.rpc("nova_admin_craft_queue", { max_items: 200 });
  if (error) throw failure(error);
  const rows = (data ?? []) as QueueRow[];
  const storage = getSupabaseAdminClient().storage.from("nova-artwork");
  return Promise.all(
    rows.map(async (row): Promise<CraftBrief> => {
      const options = await Promise.all(
        (row.optionPaths ?? []).map(async (option) => {
          const number = option.option === 1 || option.option === 2 ? option.option : null;
          if (!number || typeof option.path !== "string") return null;
          const { data: signed } = await storage.createSignedUrl(option.path, 60);
          return { option: number, previewUrl: signed?.signedUrl ?? null };
        }),
      );
      return {
        publicId: row.publicId,
        serial: row.serial,
        displayName: row.displayName,
        form: row.form ?? "",
        companionName: row.companionName,
        species: row.species,
        element: row.element,
        traits: traitsOf(row.traits),
        personality: row.personality,
        status: row.status,
        choice: choiceOf(row.choice),
        options: options.filter(
          (option): option is CraftBrief["options"][number] => option !== null,
        ),
      };
    }),
  );
});

export const attachCraftOptions = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        publicId: z.string().uuid(),
        options: z.tuple([optionUpload, optionUpload]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const db = await reviewer();
    const [first, second] = data.options;
    if (first.option === second.option) throw new Error("Upload option 1 and option 2.");
    const ordered = [first, second].sort((a, b) => a.option - b.option) as [
      CraftOptionUpload,
      CraftOptionUpload,
    ];
    const files = ordered.map((option) => pngBytes(option.dataUrl));
    const digests = files.map((bytes) => createHash("sha256").update(bytes).digest("hex"));
    if (digests[0] === digests[1]) throw new Error("The two portraits must be different.");
    const { data: paths, error: pathError } = await db.rpc("nova_admin_craft_option_paths", {
      requested_public_id: data.publicId,
      digest_one: digests[0],
      digest_two: digests[1],
    });
    if (pathError || !paths) throw failure(pathError ?? { message: "No storage path." });
    const stored = paths as { option1?: string; option2?: string };
    if (!stored.option1 || !stored.option2) throw new Error("No storage path.");
    const storage = getSupabaseAdminClient().storage.from("nova-artwork");
    for (const [path, bytes] of [
      [stored.option1, files[0]],
      [stored.option2, files[1]],
    ] as const) {
      const { error: uploadError } = await storage.upload(path, bytes, {
        contentType: "image/png",
        upsert: false,
      });
      if (uploadError && !/already exists|duplicate/i.test(uploadError.message))
        throw new Error("The portrait could not be stored.");
    }
    const { error } = await db.rpc("nova_admin_attach_craft_options", {
      requested_public_id: data.publicId,
      digest_one: digests[0],
      digest_two: digests[1],
    });
    if (error) throw failure(error);
    return { publicId: data.publicId, status: "options_ready" as const };
  });

export const resetCraftChoice = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ publicId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const db = await reviewer();
    const { data: result, error } = await db.rpc("nova_admin_reset_craft_art", {
      requested_public_id: data.publicId,
    });
    if (error) throw failure(error);
    return result as { publicId: string; serial: string; status: "options_ready" };
  });

import { getRequestHost } from "@tanstack/start-server-core";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { NOVA_ACCESS_ERRORS } from "./access";
import { DEMO_CARDS, validPublicId, type NovaCard } from "./model";
import { originFromHost } from "./public-card";

const DEV_SHARE_FILE = "/tmp/academymy-dev-shared-cards.json";

async function readSharedFile(publicId: string): Promise<NovaCard | null> {
  if (!import.meta.env.DEV) return null;
  try {
    const specifier = "node:" + "fs";
    const fs = (await import(/* @vite-ignore */ specifier)) as {
      readFileSync: (path: string, encoding: "utf8") => string;
    };
    const all = JSON.parse(fs.readFileSync(DEV_SHARE_FILE, "utf8")) as Record<string, NovaCard>;
    const card = all[publicId];
    if (!card?.sharing || card.publicId !== publicId) return null;
    return card;
  } catch {
    return null;
  }
}

function withoutArtOptions(card: NovaCard | null): NovaCard | null {
  if (!card?.artOptions) return card;
  const { artOptions: _hidden, ...safe } = card;
  return safe;
}

async function withArtwork(
  db: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  card: NovaCard | null,
) {
  if (card?.artworkPath) {
    const { NOVA_ARTWORK_SIGNED_URL_SECONDS } = await import("./artwork-signing");
    const { data, error } = await db.storage
      .from("nova-artwork")
      .createSignedUrl(card.artworkPath, NOVA_ARTWORK_SIGNED_URL_SECONDS);
    if (error) throw new Error("Companion artwork is temporarily unavailable.");
    return { ...card, artworkPath: undefined, artworkUrl: data.signedUrl };
  }
  return card;
}

export async function loadPublicNovaCard(id: string): Promise<NovaCard | null> {
  const demo = DEMO_CARDS.find((c) => c.publicId === id);
  if (demo) return demo;
  if (!validPublicId(id)) return null;
  const db = getSupabaseServerClient();
  if (!db) {
    // Production builds drop this branch. A localhost dev bypass has no database
    // row, so a shared card is read from this server's memory instead.
    if (import.meta.env.DEV) {
      const { devAuthBypassServerAllowed } = await import("@/lib/dev-auth/server-gate");
      if (devAuthBypassServerAllowed()) {
        const { readSharedDevCard } = await import("@/lib/dev-auth/public-registry");
        return withoutArtOptions(readSharedDevCard(id) ?? (await readSharedFile(id)));
      }
    }
    throw new Error(NOVA_ACCESS_ERRORS.unconfigured);
  }
  const { data, error } = await db.rpc("get_public_nova_card", { requested_public_id: id });
  if (error)
    throw new Error(
      "Nova cards are temporarily unavailable. The reviewed migration may still be pending.",
    );
  return withArtwork(db, withoutArtOptions(data as NovaCard | null));
}

export function publicRequestOrigin(): string {
  try {
    return originFromHost(getRequestHost());
  } catch {
    return originFromHost(null);
  }
}

import { getRequestHost } from "@tanstack/start-server-core";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { NOVA_ACCESS_ERRORS } from "./access";
import { DEMO_CARDS, validPublicId, type NovaCard } from "./model";
import { attachPublicArtworkUrl, isSafeArtworkUrl, originFromHost } from "./public-card";

const DEV_SHARE_FILE = "/tmp/academymy-dev-shared-cards.json";
const MAX_PUBLIC_ART_BYTES = 1_500_000;
const PRIVATE_HEADERS = {
  "cache-control": "private, no-store, max-age=0",
  "referrer-policy": "no-referrer",
};

export function artworkNotAvailable(): Response {
  return new Response(null, { status: 404, headers: PRIVATE_HEADERS });
}

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

function withPublicArtwork(card: NovaCard | null): NovaCard | null {
  return withoutArtOptions(card ? attachPublicArtworkUrl(card) : card);
}

async function loadDevSharedCard(id: string): Promise<NovaCard | null> {
  const { devAuthBypassServerAllowed } = await import("@/lib/dev-auth/server-gate");
  if (!devAuthBypassServerAllowed()) return null;
  const { readSharedDevCard } = await import("@/lib/dev-auth/public-registry");
  return withoutArtOptions(readSharedDevCard(id) ?? (await readSharedFile(id)));
}

function imageType(path: string, blobType: string): string | null {
  const type = blobType.split(";")[0]?.trim().toLowerCase();
  if (type === "image/png" || type === "image/jpeg" || type === "image/webp") return type;
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".webp")) return "image/webp";
  return null;
}

function dataUrlArtwork(url: string): { bytes: Uint8Array; contentType: string } | null {
  const match = url.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+=*)$/);
  if (!match) return null;
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.byteLength || bytes.byteLength > MAX_PUBLIC_ART_BYTES) return null;
  return { bytes: new Uint8Array(bytes), contentType: match[1] };
}

export type PublicArtwork = { bytes: Uint8Array; contentType: string };

async function artworkFromHref(url: string | null | undefined): Promise<PublicArtwork | null> {
  if (!url) return null;
  const data = dataUrlArtwork(url);
  if (data) return data;
  if (!isSafeArtworkUrl(url) || url.startsWith("/")) return null;
  try {
    const response = await fetch(url, { redirect: "error" });
    if (!response.ok) return null;
    const type = imageType("", response.headers.get("content-type") ?? "");
    if (!type) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!bytes.byteLength || bytes.byteLength > MAX_PUBLIC_ART_BYTES) return null;
    return { bytes, contentType: type };
  } catch {
    return null;
  }
}

export async function loadPublicNovaArtwork(id: string): Promise<PublicArtwork | null> {
  if (DEMO_CARDS.some((card) => card.publicId === id)) return null;
  if (!validPublicId(id) || id.startsWith("demo-")) return null;
  const db = getSupabaseServerClient();
  if (!db) {
    if (!import.meta.env.DEV) throw new Error(NOVA_ACCESS_ERRORS.unconfigured);
    const card = await loadDevSharedCard(id);
    if (!card?.sharing) return null;
    return artworkFromHref(card.artworkUrl);
  }
  const { data, error } = await db.rpc("get_public_nova_card", { requested_public_id: id });
  if (error)
    throw new Error(
      "Nova cards are temporarily unavailable. The reviewed migration may still be pending.",
    );
  const card = data as (NovaCard & { artworkPath?: string | null }) | null;
  if (!card?.sharing) return null;
  const path = card.artworkPath;
  if (!path || path.includes("..") || path.startsWith("/") || path.includes("\\")) return null;
  const { data: file, error: downloadError } = await db.storage.from("nova-artwork").download(path);
  if (downloadError || !file) return null;
  const contentType = imageType(path, file.type);
  if (!contentType) return null;
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!bytes.byteLength || bytes.byteLength > MAX_PUBLIC_ART_BYTES) return null;
  return { bytes, contentType };
}

export async function loadPublicNovaArtworkDataUrl(id: string): Promise<string | null> {
  const art = await loadPublicNovaArtwork(id);
  if (!art) return null;
  return `data:${art.contentType};base64,${Buffer.from(art.bytes).toString("base64")}`;
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
      return withPublicArtwork(await loadDevSharedCard(id));
    }
    throw new Error(NOVA_ACCESS_ERRORS.unconfigured);
  }
  const { data, error } = await db.rpc("get_public_nova_card", { requested_public_id: id });
  if (error)
    throw new Error(
      "Nova cards are temporarily unavailable. The reviewed migration may still be pending.",
    );
  return withPublicArtwork(data as NovaCard | null);
}

export function publicRequestOrigin(): string {
  try {
    return originFromHost(getRequestHost());
  } catch {
    return originFromHost(null);
  }
}

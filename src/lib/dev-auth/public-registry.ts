import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { NovaCard } from "@/features/nova-cards/model";
import { isSafeArtworkUrl } from "@/features/nova-cards/public-card";

const companionSchema = z
  .object({
    archetypeId: z.string().max(80),
    name: z.string().max(80),
    species: z.string().max(80),
    element: z.string().max(40),
    personality: z.string().max(80),
    tagline: z.string().max(200),
    description: z.string().max(500),
    traits: z.array(z.string().max(80)).max(12),
    abilities: z.array(z.string().max(120)).max(12),
  })
  .strict();

const traitsSchema = z
  .object({
    personality: z.string().max(80),
    creature: z.string().max(80),
    element: z.string().max(40),
    appearance: z.string().max(80),
    colours: z.string().max(80),
    ability: z.string().max(80),
    habitat: z.string().max(80),
    behaviour: z.string().max(80),
    eyes: z.string().max(80),
    marking: z.string().max(80),
    approach: z.string().max(80),
    bond: z.string().max(120),
  })
  .strict();

const cardSchema = z
  .object({
    publicId: z.string().uuid(),
    serial: z.string().regex(/^\d{12}$/),
    username: z.string().regex(/^[A-Za-z0-9_]{2,24}$/),
    traits: traitsSchema.nullable(),
    companion: companionSchema.nullable(),
    variant: z.enum(["a", "b"]),
    rarity: z.enum(["Common", "Rare", "Epic", "Legendary"]),
    stage: z.number().int().min(1).max(5),
    sharing: z.boolean(),
    crafting: z.boolean(),
    artworkUrl: z
      .string()
      .max(1_500_000)
      .refine((value) => isSafeArtworkUrl(value), "Artwork address is not allowed")
      .nullable(),
  })
  .strict();

const STORE = Symbol.for("academymy.dev-public-cards");
const FILE = "/tmp/academymy-dev-shared-cards.json";

function bucket(): Map<string, NovaCard> {
  const host = globalThis as typeof globalThis & { [STORE]?: Map<string, NovaCard> };
  if (!host[STORE]) host[STORE] = new Map();
  return host[STORE];
}

async function writeSharedFile(publicId: string, card: NovaCard | null) {
  const specifier = "node:" + "fs";
  const { readFileSync, writeFileSync } = (await import(/* @vite-ignore */ specifier)) as {
    readFileSync: (path: string, encoding: "utf8") => string;
    writeFileSync: (path: string, data: string) => void;
  };
  let all: Record<string, NovaCard> = {};
  try {
    all = JSON.parse(readFileSync(FILE, "utf8")) as Record<string, NovaCard>;
  } catch {
    all = {};
  }
  if (card?.sharing) all[publicId] = card;
  else delete all[publicId];
  writeFileSync(FILE, JSON.stringify(all));
}

/** In-memory cards for this dev server. Empty unless the owner has sharing on. */
export function readSharedDevCard(publicId: string): NovaCard | null {
  const card = bucket().get(publicId);
  if (!card?.sharing) return null;
  return structuredClone(card);
}

export const publishDevSharedCard = createServerFn({ method: "POST" })
  .validator((input: unknown) => cardSchema.parse(input))
  .handler(async ({ data }) => {
    if (import.meta.env.DEV) {
      const { devAuthBypassServerAllowed } = await import("@/lib/dev-auth/server-gate");
      if (devAuthBypassServerAllowed()) {
        if (!data.sharing) {
          bucket().delete(data.publicId);
          await writeSharedFile(data.publicId, null);
          return { ok: true as const };
        }
        const card: NovaCard = {
          publicId: data.publicId,
          serial: data.serial,
          username: data.username,
          traits: data.traits,
          companion: data.companion,
          variant: data.variant,
          rarity: data.rarity,
          stage: data.stage,
          sharing: true,
          crafting: data.crafting,
          artworkUrl: data.crafting ? null : data.artworkUrl,
        };
        bucket().set(data.publicId, card);
        await writeSharedFile(data.publicId, card);
        return { ok: true as const };
      }
    }
    return { ok: false as const };
  });

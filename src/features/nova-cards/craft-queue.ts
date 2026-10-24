/** Staff actions for one confirmed companion. */
export interface CraftOptionUpload {
  option: 1 | 2;
  dataUrl: string;
  fileName: string;
}

export interface CraftArtPreview {
  option: 1 | 2;
  previewUrl: string | null;
}

export interface CraftQueueApi {
  queue: () => Promise<CraftBrief[]>;
  attachOptions: (
    publicId: string,
    options: [CraftOptionUpload, CraftOptionUpload],
  ) => Promise<CraftBrief>;
  resetChoice: (publicId: string) => Promise<CraftBrief>;
  /** Admin-only artist file for one card. The browser does not query the database. */
  brief: (publicId: string) => Promise<CraftArtistBrief>;
}

/** What an artist needs for one student. Contact fields are never included. */
export interface ArtistBrief {
  displayName: string;
  form: string;
  companionName: string;
  species: string;
  element: string;
  traits: string;
  personality: string;
  publicId: string;
}

/** A paid student's companion, for staff who prepare the two portraits. */
export interface CraftBrief extends Omit<ArtistBrief, "traits"> {
  traits: string[];
  serial: string;
  /** Place in the whole queue. 1 is the student who has been waiting longest. */
  position: number;
  /** When craft_slot was first set. Null only for a demo card saved before this field. */
  queuedAt: string | null;
  status: "waiting_for_art" | "options_ready" | "chosen";
  choice: 1 | 2 | null;
  options: CraftArtPreview[];
  /** True when the card owner is an admin testing their own journey. */
  staffTest?: boolean;
}

export type CraftQueueTab = CraftBrief["status"] | "all";

/** JSON values the artist brief may carry out of the database. */
export type CraftJson =
  | string
  | number
  | boolean
  | null
  | CraftJson[]
  | { [key: string]: CraftJson };

/** Portrait rules sent to the artist. The same object is stored by the admin brief RPC. */
export const CRAFT_OUTPUT_RULES = {
  format: "PNG",
  aspect: "2:3 portrait",
  minSize: "1024x1536",
  background: "plain",
  framing: "centred",
  text: "none",
} as const;

/** One card's artist file. No email and no account id. */
export interface CraftArtistBrief {
  cardId: string;
  publicId: string;
  nickname: string;
  form: string;
  rarity: string;
  submittedAt: string | null;
  /** True when the card owner is an admin testing their own journey. */
  staffTest?: boolean;
  answers: number[];
  traits: CraftJson;
  companion: {
    name: string;
    species: string;
    element: string;
    personality: string;
    visual: {
      canonical: CraftJson;
      personalisation: CraftJson;
    };
  };
  dna: {
    genes: CraftJson;
    palette: CraftJson;
    identityLock: CraftJson;
  };
  output: typeof CRAFT_OUTPUT_RULES;
}

export function filterCraftQueue(items: readonly CraftBrief[], tab: CraftQueueTab): CraftBrief[] {
  const visible = tab === "all" ? items : items.filter((item) => item.status === tab);
  return [...visible].sort((a, b) => a.position - b.position);
}

/** The oldest student still waiting for two portraits of their companion. */
export function nextCraftStudent(items: readonly CraftBrief[]): string | null {
  let best: CraftBrief | null = null;
  for (const item of items) {
    if (item.status !== "waiting_for_art") continue;
    if (!best || item.position < best.position) best = item;
  }
  return best?.publicId ?? null;
}

/** How long since the student entered the queue. */
export function craftWaitLabel(queuedAt: string | null, now = Date.now()): string {
  if (!queuedAt) return "Just entered the queue";
  const parsed = Date.parse(queuedAt);
  if (!Number.isFinite(parsed)) return "Just entered the queue";
  const minutes = Math.floor((now - parsed) / 60_000);
  if (minutes < 1) return "Just entered the queue";
  if (minutes < 60) return `Queued for ${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `Queued for ${hours} hour${hours === 1 ? "" : "s"}`;
  const days = Math.floor(hours / 24);
  return `Queued for ${days} day${days === 1 ? "" : "s"}`;
}

export const ARTIST_BRIEF_COLUMNS = [
  "displayName",
  "form",
  "companionName",
  "species",
  "element",
  "traits",
  "personality",
  "publicId",
] as const satisfies readonly (keyof ArtistBrief)[];

export function artistBrief(item: CraftBrief): ArtistBrief {
  return {
    displayName: item.displayName,
    form: item.form,
    companionName: item.companionName,
    species: item.species,
    element: item.element,
    traits: item.traits.join(" · "),
    personality: item.personality,
    publicId: item.publicId,
  };
}

function cell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

/** CSV an artist can use. One row per student, keyed by the card public id. */
export function craftQueueToCsv(items: readonly CraftBrief[]): string {
  const lines = [
    ARTIST_BRIEF_COLUMNS.join(","),
    ...items.map((item) => {
      const brief = artistBrief(item);
      return ARTIST_BRIEF_COLUMNS.map((key) => cell(brief[key])).join(",");
    }),
  ];
  return lines.join("\n");
}

export function craftQueueToJson(items: readonly CraftBrief[]): string {
  return JSON.stringify(items.map(artistBrief), null, 2);
}

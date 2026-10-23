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
  status: "waiting_for_art" | "options_ready" | "chosen";
  choice: 1 | 2 | null;
  options: CraftArtPreview[];
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

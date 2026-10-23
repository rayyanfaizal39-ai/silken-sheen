/** Staff actions for one confirmed companion. */
export interface CraftQueueApi {
  queue: () => Promise<CraftBrief[]>;
  attach: (cardId: string, dataUrl: string, fileName: string) => Promise<CraftBrief>;
  approve: (cardId: string) => Promise<CraftBrief>;
}

/** A paid student's companion brief, for staff who make the portrait offline. */
export interface CraftBrief {
  cardId: string;
  publicId: string;
  serial: string;
  username: string;
  studentName: string;
  form: string;
  email: string;
  answers: number[];
  slot: "a" | "b";
  companionName: string;
  species: string;
  element: string;
  personality: string;
  status: "awaiting_art" | "pending_review" | "approved";
  /** Pending staff upload, when one is waiting to be approved. */
  artworkId: string | null;
  previewUrl: string | null;
}

const COLUMNS = [
  "studentName",
  "form",
  "email",
  "username",
  "serial",
  "publicId",
  "slot",
  "companionName",
  "species",
  "element",
  "personality",
  "answers",
  "status",
] as const;

function cell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

/** CSV export for an offline art batch. The serial column is the card serial. */
export function craftQueueToCsv(items: readonly CraftBrief[]): string {
  const lines = [
    COLUMNS.join(","),
    ...items.map((item) =>
      COLUMNS.map((key) =>
        cell(key === "answers" ? item.answers.join(" ") : String(item[key] ?? "")),
      ).join(","),
    ),
  ];
  return lines.join("\n");
}

export function craftQueueToJson(items: readonly CraftBrief[]): string {
  return JSON.stringify(
    items.map(({ previewUrl: _preview, ...brief }) => brief),
    null,
    2,
  );
}

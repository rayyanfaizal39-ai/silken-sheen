export const ANNOUNCEMENT_TYPES = ["news", "reminder", "urgent", "event"] as const;

export type AnnouncementType = (typeof ANNOUNCEMENT_TYPES)[number];

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
  type: AnnouncementType;
  pinned: boolean;
  published: boolean;
  starts_at: string;
  expires_at: string | null;
  link_url: string | null;
  created_at: string;
  updated_at: string;
};

export const ANNOUNCEMENT_COLUMNS =
  "id, title, body, type, pinned, published, starts_at, expires_at, link_url, created_at, updated_at";

const TYPE_SET = new Set<string>(ANNOUNCEMENT_TYPES);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function optionalText(value: unknown): string | null {
  if (value == null) return null;
  return typeof value === "string" ? value : null;
}

export function parseAnnouncement(value: unknown): Announcement | null {
  if (!isRecord(value)) return null;
  if (typeof value.id !== "string" || typeof value.title !== "string") return null;
  if (typeof value.type !== "string" || !TYPE_SET.has(value.type)) return null;
  if (typeof value.starts_at !== "string" || typeof value.created_at !== "string") return null;
  if (typeof value.updated_at !== "string") return null;

  const body = optionalText(value.body);
  const expiresAt = optionalText(value.expires_at);
  const linkUrl = optionalText(value.link_url);
  if (value.body != null && body === null) return null;
  if (value.expires_at != null && expiresAt === null) return null;
  if (value.link_url != null && linkUrl === null) return null;

  return {
    id: value.id,
    title: value.title,
    body,
    type: value.type as AnnouncementType,
    pinned: value.pinned === true,
    published: value.published !== false,
    starts_at: value.starts_at,
    expires_at: expiresAt,
    link_url: linkUrl,
    created_at: value.created_at,
    updated_at: value.updated_at,
  };
}

/** A row students are allowed to see. Mirrors the SELECT policy. */
export function isLiveAnnouncement(item: Announcement, now = Date.now()): boolean {
  if (!item.published) return false;
  const starts = Date.parse(item.starts_at);
  if (Number.isNaN(starts) || starts > now) return false;
  if (!item.expires_at) return true;
  const expires = Date.parse(item.expires_at);
  return !Number.isNaN(expires) && expires > now;
}

/** Pinned posts first, then newest by created_at. */
export function compareAnnouncements(a: Announcement, b: Announcement): number {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
  const created = Date.parse(b.created_at) - Date.parse(a.created_at);
  if (created !== 0 && !Number.isNaN(created)) return created;
  if (a.id === b.id) return 0;
  return a.id < b.id ? 1 : -1;
}

export function liveAnnouncements(rows: readonly Announcement[], now = Date.now()): Announcement[] {
  return rows.filter((row) => isLiveAnnouncement(row, now)).sort(compareAnnouncements);
}

export type AnnouncementLink = {
  href: string;
  external: boolean;
};

/** Accepts http(s) URLs and same-site paths. Rejects scriptable schemes. */
export function announcementLink(linkUrl: string | null | undefined): AnnouncementLink | null {
  if (!linkUrl) return null;
  const trimmed = linkUrl.trim();
  if (!trimmed) return null;
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return null;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.startsWith("/\\")) {
    return { href: trimmed, external: false };
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return { href: url.toString(), external: true };
  } catch {
    return null;
  }
}

export function formatAnnouncementTime(iso: string, now = Date.now()): string {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  const minutes = Math.floor(Math.max(0, now - time) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(time);
}

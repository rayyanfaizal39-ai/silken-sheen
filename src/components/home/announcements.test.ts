import { describe, expect, it } from "vitest";
import {
  announcementLink,
  compareAnnouncements,
  formatAnnouncementTime,
  isLiveAnnouncement,
  liveAnnouncements,
  parseAnnouncement,
  type Announcement,
} from "./announcements";

const NOW = Date.parse("2026-10-23T01:40:00.000Z");

function row(overrides: Partial<Announcement> = {}): Announcement {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    title: "Station notice",
    body: "Bring your notebook.",
    type: "news",
    pinned: false,
    published: true,
    starts_at: "2026-10-23T00:00:00.000Z",
    expires_at: null,
    link_url: null,
    created_at: "2026-10-23T00:00:00.000Z",
    updated_at: "2026-10-23T00:00:00.000Z",
    ...overrides,
  };
}

describe("announcement feed", () => {
  it("keeps pinned posts ahead of newer unpinned posts", () => {
    const olderPinned = row({
      id: "00000000-0000-4000-8000-00000000000a",
      title: "Pinned older",
      pinned: true,
      created_at: "2026-10-01T00:00:00.000Z",
    });
    const newerPinned = row({
      id: "00000000-0000-4000-8000-00000000000c",
      title: "Pinned newer",
      pinned: true,
      created_at: "2026-10-20T00:00:00.000Z",
    });
    const newest = row({
      id: "00000000-0000-4000-8000-00000000000b",
      title: "Newest",
      created_at: "2026-10-23T01:00:00.000Z",
    });

    expect(
      liveAnnouncements([newest, olderPinned, newerPinned], NOW).map((item) => item.title),
    ).toEqual(["Pinned newer", "Pinned older", "Newest"]);
    expect(compareAnnouncements(olderPinned, newest)).toBeLessThan(0);
  });

  it("hides drafts, scheduled posts, and expired posts", () => {
    const live = row({ id: "live", title: "Live" });
    const draft = row({ id: "draft", published: false, title: "Draft" });
    const scheduled = row({
      id: "scheduled",
      title: "Scheduled",
      starts_at: "2026-10-24T00:00:00.000Z",
    });
    const expired = row({
      id: "expired",
      title: "Expired",
      expires_at: "2026-10-22T00:00:00.000Z",
    });
    const openEnded = row({ id: "open", title: "Open", expires_at: null });

    expect(isLiveAnnouncement(live, NOW)).toBe(true);
    expect(isLiveAnnouncement(draft, NOW)).toBe(false);
    expect(isLiveAnnouncement(scheduled, NOW)).toBe(false);
    expect(isLiveAnnouncement(expired, NOW)).toBe(false);
    expect(
      liveAnnouncements([draft, scheduled, expired, openEnded, live], NOW).map((item) => item.id),
    ).toEqual(["open", "live"]);
  });

  it("parses a database row and drops an unknown type", () => {
    expect(parseAnnouncement(row({ type: "urgent", pinned: true }))?.type).toBe("urgent");
    expect(parseAnnouncement({ ...row(), type: "community" })).toBeNull();
    expect(parseAnnouncement(null)).toBeNull();
  });

  it("allows http(s) and in-app links only", () => {
    expect(announcementLink(" https://www.myacademy.my/notes ")).toEqual({
      href: "https://www.myacademy.my/notes",
      external: true,
    });
    expect(announcementLink("/notes?subject=science")).toEqual({
      href: "/notes?subject=science",
      external: false,
    });
    expect(announcementLink("javascript:alert(1)")).toBeNull();
    expect(announcementLink("data:text/html,hi")).toBeNull();
    expect(announcementLink("//evil.example")).toBeNull();
    expect(announcementLink("  ")).toBeNull();
    expect(announcementLink(null)).toBeNull();
  });

  it("formats a short relative time", () => {
    expect(formatAnnouncementTime("2026-10-23T01:39:30.000Z", NOW)).toBe("Just now");
    expect(formatAnnouncementTime("2026-10-23T00:40:00.000Z", NOW)).toBe("1h ago");
    expect(formatAnnouncementTime("2026-10-21T01:40:00.000Z", NOW)).toBe("2d ago");
  });
});

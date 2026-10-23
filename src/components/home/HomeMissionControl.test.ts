import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./HomeMissionControl.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("./homeSkeleton.css", import.meta.url), "utf8");

describe("Mission Control bulletin", () => {
  it("loads announcements and subscribes to realtime changes", () => {
    expect(source).toContain('.from("announcements")');
    expect(source).toContain("postgres_changes");
    expect(source).toContain('table: "announcements"');
    expect(source).not.toContain("MISSION_CONTROL_ITEMS");
    expect(source).toContain("No announcements yet");
  });

  it("gives every bulletin type its own neon badge, with urgent called out", () => {
    for (const label of ["News", "Reminder", "Urgent", "Event"]) {
      expect(source).toContain(`label: "${label}"`);
    }
    expect(source).toContain("home-mission-control__badge--urgent");
    expect(styles).toContain(".home-mission-control__badge--urgent");
    expect(styles).toContain("home-mission-control-urgent");
  });

  it("keeps the feed to one column on a phone", () => {
    expect(styles).toMatch(
      /@media \(max-width: 760px\)[\s\S]*\.home-mission-control__feed\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
    );
  });
});

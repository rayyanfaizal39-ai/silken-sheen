import { describe, it, expect } from "vitest";
import { normalizeSelectedAt, daysTogether } from "./selectedAt";

const NOW = new Date("2024-06-15T12:00:00.000Z");

describe("normalizeSelectedAt", () => {
  it("keeps a legitimate current date unchanged", () => {
    const iso = new Date("2024-06-14T12:00:00.000Z").toISOString();
    expect(normalizeSelectedAt(iso, NOW)).toBe(iso);
  });

  it("keeps a legitimate older account date unchanged", () => {
    const iso = new Date("2022-03-01T00:00:00.000Z").toISOString();
    expect(normalizeSelectedAt(iso, NOW)).toBe(iso);
  });

  it("replaces an invalid string with now", () => {
    expect(normalizeSelectedAt("not-a-date", NOW)).toBe(NOW.toISOString());
  });

  it("replaces an empty/missing value with now", () => {
    expect(normalizeSelectedAt("", NOW)).toBe(NOW.toISOString());
    expect(normalizeSelectedAt(undefined, NOW)).toBe(NOW.toISOString());
    expect(normalizeSelectedAt(null, NOW)).toBe(NOW.toISOString());
  });

  it("replaces a Unix-epoch (January 1970) value with now", () => {
    expect(normalizeSelectedAt(new Date(0).toISOString(), NOW)).toBe(NOW.toISOString());
  });

  it("replaces a future value with now", () => {
    const future = new Date("2099-01-01T00:00:00.000Z").toISOString();
    expect(normalizeSelectedAt(future, NOW)).toBe(NOW.toISOString());
  });
});

describe("daysTogether", () => {
  it("returns 1 for a companion selected today", () => {
    expect(daysTogether(NOW.toISOString(), NOW)).toBe(1);
  });

  it("never returns an absurd count for an invalid/epoch date", () => {
    expect(daysTogether(new Date(0).toISOString(), NOW)).toBe(1);
  });

  it("never returns a negative count for a future date", () => {
    const future = new Date("2099-01-01T00:00:00.000Z").toISOString();
    expect(daysTogether(future, NOW)).toBe(1);
  });

  it("computes whole days for a legitimate older date", () => {
    const iso = new Date("2024-06-01T12:00:00.000Z").toISOString();
    expect(daysTogether(iso, NOW)).toBe(15);
  });
});

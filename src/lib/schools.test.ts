import { describe, expect, it } from "vitest";
import {
  formatSchoolLocation,
  normalizeSchoolSearchQuery,
  SCHOOL_SEARCH_LIMIT,
  SCHOOL_SEARCH_MIN_CHARACTERS,
} from "./schools";

describe("verified school search", () => {
  it("requires three normalized characters before searching", () => {
    expect(SCHOOL_SEARCH_MIN_CHARACTERS).toBe(3);
    expect(normalizeSchoolSearchQuery(" S ")).toBeNull();
    expect(normalizeSchoolSearchQuery("  SMK   Seksyen  ")).toBe("SMK Seksyen");
  });

  it("caps each client request", () => {
    expect(SCHOOL_SEARCH_LIMIT).toBe(12);
    expect(SCHOOL_SEARCH_LIMIT).toBeLessThanOrEqual(20);
  });

  it("formats district and state without duplicating location into profiles", () => {
    expect(formatSchoolLocation({ district: "Shah Alam", state: "Selangor" })).toBe(
      "Shah Alam, Selangor",
    );
    expect(formatSchoolLocation({ district: null, state: "Selangor" })).toBe("Selangor");
  });
});

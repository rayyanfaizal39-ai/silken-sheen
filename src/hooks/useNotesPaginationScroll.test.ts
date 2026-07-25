import { describe, expect, it } from "vitest";

import { isNotesPaginationLabel } from "./useNotesPaginationScroll";

describe("isNotesPaginationLabel", () => {
  it.each([
    "Seterusnya",
    "Seterusnya →",
    "Seterusnya: Bab seterusnya",
    "Seksyen seterusnya",
    "Next",
    "Next section",
    "Previous",
    "Previous section",
    "Kembali",
    "← Kembali",
    "Back",
  ])("recognizes a Notes pagination label: %s", (label) => {
    expect(isNotesPaginationLabel(label)).toBe(true);
  });

  it.each([
    "Back to chapter overview",
    "Back to top",
    "Mark chapter as read",
    "Nota",
    "Kad",
    "Kuiz",
    "Peta Minda",
  ])("ignores non-pagination controls: %s", (label) => {
    expect(isNotesPaginationLabel(label)).toBe(false);
  });
});

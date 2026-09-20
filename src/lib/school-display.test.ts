import { describe, expect, it } from "vitest";
import { formatSchoolName, toSchoolTitleCase } from "./school-display";

describe("formatSchoolName — verified directory prefixes", () => {
  it("abbreviates SEKOLAH MENENGAH KEBANGSAAN to SMK", () => {
    expect(formatSchoolName("SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING")).toBe(
      "SMK Kota Kemuning",
    );
  });

  it("abbreviates SEKOLAH KEBANGSAAN to SK", () => {
    expect(formatSchoolName("SEKOLAH KEBANGSAAN TAMAN MELAWATI")).toBe("SK Taman Melawati");
  });

  it("abbreviates SEKOLAH MENENGAH JENIS KEBANGSAAN to SMJK", () => {
    expect(formatSchoolName("SEKOLAH MENENGAH JENIS KEBANGSAAN CHUNG HWA")).toBe(
      "SMJK Chung Hwa",
    );
  });

  it("abbreviates SEKOLAH JENIS KEBANGSAAN (CINA) to SJK(C)", () => {
    expect(formatSchoolName("SEKOLAH JENIS KEBANGSAAN (CINA) YUK CHAI")).toBe("SJK(C) Yuk Chai");
  });

  it("abbreviates SEKOLAH JENIS KEBANGSAAN (TAMIL) to SJK(T)", () => {
    expect(formatSchoolName("SEKOLAH JENIS KEBANGSAAN (TAMIL) LADANG HARCROFT")).toBe(
      "SJK(T) Ladang Harcroft",
    );
  });

  it("prefers the longest matching prefix over a shorter one", () => {
    // Must not degrade to "SMK Jenis Kebangsaan …" via the shorter SMK rule.
    expect(formatSchoolName("SEKOLAH MENENGAH JENIS KEBANGSAAN KATHOLIK")).toBe(
      "SMJK Katholik",
    );
  });

  it("returns the bare abbreviation when there is no distinguishing remainder", () => {
    expect(formatSchoolName("SEKOLAH MENENGAH KEBANGSAAN")).toBe("SMK");
  });
});

describe("formatSchoolName — unknown school types", () => {
  it("falls back to title case for an unrecognised prefix", () => {
    expect(formatSchoolName("KOLEJ VOKASIONAL SULTAN AZLAN SHAH")).toBe(
      "Kolej Vokasional Sultan Azlan Shah",
    );
  });

  it("keeps an unrecognised SEKOLAH MENENGAH variant intact", () => {
    expect(formatSchoolName("SEKOLAH MENENGAH SAINS SELANGOR")).toBe(
      "Sekolah Menengah Sains Selangor",
    );
  });
});

describe("formatSchoolName — missing values", () => {
  it("returns null for null", () => {
    expect(formatSchoolName(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(formatSchoolName(undefined)).toBeNull();
  });

  it("returns null for a blank string so the school line is omitted", () => {
    expect(formatSchoolName("   ")).toBeNull();
  });
});

describe("toSchoolTitleCase — readability details", () => {
  it("preserves roman numerals", () => {
    expect(formatSchoolName("SEKOLAH MENENGAH KEBANGSAAN SERI KEMBANGAN II")).toBe(
      "SMK Seri Kembangan II",
    );
  });

  it("preserves apostrophes and hyphens inside names", () => {
    expect(toSchoolTitleCase("DATO' ABDUL-RAZAK")).toBe("Dato' Abdul-Razak");
  });

  it("lower-cases Malay connectors that do not lead the name", () => {
    expect(toSchoolTitleCase("TAMAN DAN DESA")).toBe("Taman dan Desa");
  });

  it("collapses irregular whitespace", () => {
    expect(formatSchoolName("  SEKOLAH   MENENGAH  KEBANGSAAN   KOTA KEMUNING ")).toBe(
      "SMK Kota Kemuning",
    );
  });

  it("never mutates the canonical input", () => {
    const canonical = "SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING";
    formatSchoolName(canonical);
    expect(canonical).toBe("SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING");
  });
});

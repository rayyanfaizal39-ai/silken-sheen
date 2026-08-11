import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const foundationSql = readFileSync(
  new URL(
    "../../supabase/migrations/20260809055611_add_student_explorer_onboarding.sql",
    import.meta.url,
  ),
  "utf8",
).toLowerCase();
const schoolsSql = readFileSync(
  new URL(
    "../../supabase/migrations/20260809062348_verified_malaysian_schools.sql",
    import.meta.url,
  ),
  "utf8",
).toLowerCase();
const schoolSearchNormalizationSql = readFileSync(
  new URL(
    "../../supabase/migrations/20260809123049_normalize_malaysian_school_search_abbreviations.sql",
    import.meta.url,
  ),
  "utf8",
).toLowerCase();
const schoolSearchTypeScopeSql = readFileSync(
  new URL(
    "../../supabase/migrations/20260809123257_restrict_smk_abbreviation_to_smk_type.sql",
    import.meta.url,
  ),
  "utf8",
).toLowerCase();

describe("Explorer Profile migration safety", () => {
  it("grandfathers legacy rows before changing the default for new profiles", () => {
    const addAsComplete = foundationSql.indexOf(
      "onboarding_completed boolean not null default true",
    );
    const futureDefault = foundationSql.indexOf(
      "alter column onboarding_completed set default false",
    );
    expect(addAsComplete).toBeGreaterThan(-1);
    expect(futureDefault).toBeGreaterThan(addAsComplete);
  });

  it("allows legacy missing ages/forms/names and validates only first completion", () => {
    expect(foundationSql).toContain("check (age is null or age between 10 and 18)");
    expect(foundationSql).toContain(
      "completing := new.onboarding_completed and not old.onboarding_completed",
    );
    expect(foundationSql).not.toContain("alter column full_name set not null");
    expect(foundationSql).not.toContain("alter column form set not null");
  });
});

describe("verified school directory migration", () => {
  it("creates no fabricated school records", () => {
    expect(schoolsSql).not.toContain("insert into public.schools");
  });

  it("adds a non-destructive FK and database-level active-school validation", () => {
    expect(schoolsSql).toContain("foreign key (school_id)");
    expect(schoolsSql).toContain("on delete restrict");
    expect(schoolsSql).toContain("not valid");
    expect(schoolsSql).toContain("choose an active verified school");
    expect(schoolsSql).toContain("a verified school is required");
  });

  it("uses capped server search with active-only trigram indexes", () => {
    expect(schoolsSql).toContain("gin_trgm_ops");
    expect(schoolsSql).toContain("where active");
    expect(schoolsSql).toContain("char_length(q.term) >= 3");
    expect(schoolsSql).toContain("limit least(greatest(coalesce(max_results, 12), 1), 20)");
  });

  it("exposes read/search only to authenticated users", () => {
    expect(schoolsSql).toContain("grant select on table public.schools to authenticated");
    expect(schoolsSql).toContain(
      "grant execute on function public.search_schools(text, integer) to authenticated",
    );
    expect(schoolsSql).not.toContain("grant insert on table public.schools to authenticated");
    expect(schoolsSql).not.toContain("grant update on table public.schools to authenticated");
    expect(schoolsSql).not.toContain("grant delete on table public.schools to authenticated");
  });
});

describe("verified school abbreviation search migration", () => {
  it("expands only the supported SMK and SM Sains prefixes", () => {
    expect(schoolSearchNormalizationSql).toContain("sekolah menengah kebangsaan");
    expect(schoolSearchNormalizationSql).toContain("sekolah menengah sains");
    expect(schoolSearchNormalizationSql).toContain("when term ~ '^s[.]?");
  });

  it("preserves active-only server search, code search, and the hard cap", () => {
    expect(schoolSearchNormalizationSql).toContain("where s.active");
    expect(schoolSearchNormalizationSql).toContain("lower(coalesce(s.school_code, ''))");
    expect(schoolSearchNormalizationSql).toContain(
      "limit least(greatest(coalesce(max_results, 12), 1), 20)",
    );
    expect(schoolSearchNormalizationSql).toContain("security invoker");
  });

  it("does not expose the RPC to anonymous users", () => {
    expect(schoolSearchNormalizationSql).toContain(
      "revoke all on function public.search_schools(text, integer) from public, anon",
    );
    expect(schoolSearchNormalizationSql).toContain(
      "grant execute on function public.search_schools(text, integer) to authenticated",
    );
  });

  it("keeps SMK abbreviation results within the SMK school type", () => {
    expect(schoolSearchTypeScopeSql).toContain("then 'smk'");
    expect(schoolSearchTypeScopeSql).toContain(
      "q.abbreviation_family is distinct from 'smk' or s.school_type = 'smk'",
    );
  });
});

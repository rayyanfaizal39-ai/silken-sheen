import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  new URL(
    "../../supabase/migrations/20260816043823_visitor_retention_analytics.sql",
    import.meta.url,
  ),
  "utf8",
).toLowerCase();

describe("visitor analytics migration security", () => {
  it("allows append-only anonymous events while keeping reads admin-only", () => {
    expect(migration).toContain("alter table public.visitor_events enable row level security");
    expect(migration).toContain(
      "grant insert on table public.visitor_events to anon, authenticated",
    );
    expect(migration).not.toContain("grant select on table public.visitor_events to anon");
    expect(migration).toContain("administrators can read visitor analytics");
    expect(migration).toContain("with check (user_id is null and (select auth.uid()) is null)");
  });

  it("keeps the aggregate function subject to row-level security", () => {
    expect(migration).toContain("security invoker");
    expect(migration).toContain(
      "revoke all on function public.get_visitor_analytics(integer) from public, anon",
    );
  });
});

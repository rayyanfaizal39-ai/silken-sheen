import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const migration = readFileSync(
  new URL("../../../supabase/migrations/20261023014000_public_announcements.sql", import.meta.url),
  "utf8",
);

describe("public.announcements", () => {
  const db = new PGlite();

  beforeAll(async () => {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create role service_role nologin bypassrls;
      create publication supabase_realtime;
    `);
    await db.exec(migration);
    await db.exec(migration);
  });

  afterAll(async () => {
    await db.close();
  });

  async function asRole<T>(role: string, sql: string) {
    await db.exec(`set role ${role}`);
    try {
      return await db.query<T>(sql);
    } finally {
      await db.exec("reset role");
    }
  }

  it("exposes the bulletin columns once", async () => {
    const columns = await db.query<{ column_name: string }>(`
      select column_name
      from information_schema.columns
      where table_schema = 'public' and table_name = 'announcements'
      order by ordinal_position
    `);
    expect(columns.rows.map((column) => column.column_name)).toEqual([
      "id",
      "title",
      "body",
      "type",
      "pinned",
      "published",
      "starts_at",
      "expires_at",
      "link_url",
      "created_at",
      "updated_at",
    ]);
  });

  it("lets anon and authenticated read only live rows", async () => {
    await db.exec(`
      insert into public.announcements (title, type, pinned, published, starts_at, expires_at, created_at)
      values
        ('Visible news', 'news', false, true, now() - interval '1 hour', null, now() - interval '1 hour'),
        ('Pinned reminder', 'reminder', true, true, now() - interval '2 hours', now() + interval '1 day', now() - interval '2 days'),
        ('Draft', 'event', false, false, now() - interval '1 hour', null, now()),
        ('Scheduled', 'news', false, true, now() + interval '1 day', null, now()),
        ('Expired', 'urgent', false, true, now() - interval '2 days', now() - interval '1 hour', now() - interval '2 days');
    `);

    const anon = await asRole<{ title: string }>(
      "anon",
      "select title from public.announcements order by title",
    );
    const signedIn = await asRole<{ title: string }>(
      "authenticated",
      "select title from public.announcements order by title",
    );

    expect(anon.rows.map((row) => row.title)).toEqual(["Pinned reminder", "Visible news"]);
    expect(signedIn.rows.map((row) => row.title)).toEqual(["Pinned reminder", "Visible news"]);
  });

  it("has a single public select policy and no client write policies", async () => {
    const policies = await db.query<{ policyname: string; cmd: string }>(`
      select policyname, cmd
      from pg_policies
      where schemaname = 'public' and tablename = 'announcements'
      order by policyname
    `);
    expect(policies.rows).toEqual([
      { policyname: "Live announcements are publicly readable", cmd: "SELECT" },
    ]);
  });

  it("refuses anon writes and accepts a service-role write", async () => {
    await expect(
      asRole("anon", "insert into public.announcements (title) values ('Nope')"),
    ).rejects.toThrow(/permission denied/i);

    await asRole(
      "service_role",
      "insert into public.announcements (title, type) values ('From station', 'urgent')",
    );
    const inserted = await db.query<{ title: string }>(
      "select title from public.announcements where title = 'From station'",
    );
    expect(inserted.rows).toEqual([{ title: "From station" }]);
  });

  it("rejects an unknown type and refreshes updated_at", async () => {
    await expect(
      db.query("insert into public.announcements (title, type) values ('Bad', 'community')"),
    ).rejects.toThrow(/announcements_type_check/);

    const created = await db.query<{ id: string }>(`
      insert into public.announcements (title, updated_at)
      values ('Touch me', '2000-01-01T00:00:00Z')
      returning id
    `);
    await db.query("update public.announcements set body = 'Updated' where id = $1", [
      created.rows[0].id,
    ]);
    const touched = await db.query<{ updated_at: string | Date }>(
      "select updated_at from public.announcements where id = $1",
      [created.rows[0].id],
    );
    const updatedAt = touched.rows[0].updated_at;
    const updatedTime =
      updatedAt instanceof Date ? updatedAt.getTime() : Date.parse(String(updatedAt));
    expect(updatedTime).toBeGreaterThan(Date.parse("2000-01-02T00:00:00Z"));
  });

  it("adds the table to supabase_realtime exactly once", async () => {
    const publication = await db.query<{ tablename: string }>(`
      select tablename
      from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'announcements'
    `);
    expect(publication.rows).toHaveLength(1);
  });
});

# Release checklist

A push to `main` redeploys the frontend automatically (Cloudflare Pages).
Supabase migrations are **not** applied automatically. Frontend code that
calls a new RPC, table or column must not reach `main` before its migration
is applied to production.

On 2026-09-23 the frontend began calling `complete_quiz` while
`20260923125557_quiz_xp_one_time_awards` was still unapplied, so every quiz XP
save failed with `PGRST202`.

## Before pushing to `main`

1. If quiz content changed, run `npm run generate:quiz-catalog`. It writes a
   catalog migration when needed; `npm test` fails until the catalog matches.
2. If the change adds or edits anything in `supabase/migrations/`:
   1. Preview: `npx supabase db push --linked --dry-run`
   2. Apply: `npx supabase db push --linked`
3. Verify the database matches the repo:

   ```sh
   npm run check:migrations
   ```

   It exits non-zero and lists any migration that is not applied to the linked
   project (read-only; it only reads migration history).

4. Run `npm test`.
5. Push only when steps 3 and 4 pass.

## Rules

- Never edit a migration that has already been applied. Add a new one.
- Order matters: apply the migration first, then deploy the code that needs it.
  Migrations should be additive so the old frontend keeps working in between.

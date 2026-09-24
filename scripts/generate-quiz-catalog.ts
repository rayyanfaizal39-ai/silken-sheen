// Writes a migration that syncs public.quiz_catalog with the app's quiz
// content, when the content has changed since the latest catalog migration.
//
//   npm run generate:quiz-catalog
//
// The quiz catalog test fails until this has been run after a content change,
// and `npm run check:migrations` then blocks release until it is applied.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildQuizCatalog } from "../src/features/quiz/catalog/buildQuizCatalog";
import {
  QUIZ_CATALOG_MIGRATION_PATTERN,
  renderQuizCatalogSql,
} from "../src/features/quiz/catalog/quizCatalogSql";

const migrationsDir = join(process.cwd(), "supabase", "migrations");
const sql = renderQuizCatalogSql(buildQuizCatalog());
const latest = readdirSync(migrationsDir)
  .filter((name) => QUIZ_CATALOG_MIGRATION_PATTERN.test(name))
  .sort()
  .at(-1);

if (latest && readFileSync(join(migrationsDir, latest), "utf8") === sql) {
  console.log(`Quiz catalog is up to date (${latest}).`);
} else {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const name = `${stamp}_${latest ? "sync" : "seed"}_quiz_catalog.sql`;
  writeFileSync(join(migrationsDir, name), sql);
  console.log(`Wrote supabase/migrations/${name}. Apply it before deploying the content.`);
}

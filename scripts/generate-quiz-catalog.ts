// Writes a migration that syncs public.quiz_catalog with the app's quiz
// content, when the content has changed since the latest catalog migration.
//
//   npm run generate:quiz-catalog
//   npm run generate:quiz-catalog -- --scope=sejarah-f3
//
// The quiz catalog test fails until this has been run after a content change,
// and `npm run check:migrations` then blocks release until it is applied.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildQuizCatalog } from "../src/features/quiz/catalog/buildQuizCatalog";
import {
  QUIZ_CATALOG_MIGRATION_PATTERN,
  renderForm3SejarahQuiz25MetadataSql,
  renderQuizCatalogSql,
} from "../src/features/quiz/catalog/quizCatalogSql";

const migrationsDir = join(process.cwd(), "supabase", "migrations");
const metadataScope = process.argv.includes("--scope=sejarah-f3-chapters-1-3")
  ? "chapters-1-3"
  : process.argv.includes("--scope=sejarah-f3-chapters-4-8")
    ? "chapters-4-8"
    : null;
if (metadataScope) {
  const output = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length);
  const namePattern = metadataScope === "chapters-1-3"
    ? /^\d{14}_sync_form3_sejarah_quiz_25_question_metadata\.sql$/
    : /^\d{14}_sync_form3_sejarah_chapters_4_to_8_quiz_25_question_metadata\.sql$/;
  if (!output || !namePattern.test(output)) {
    throw new Error("Create the targeted migration with supabase migration new, then pass --output=<created filename>");
  }
  if (!existsSync(join(migrationsDir, output))) {
    throw new Error(`Migration ${output} does not exist; create it with supabase migration new first`);
  }
  writeFileSync(join(migrationsDir, output), renderForm3SejarahQuiz25MetadataSql(buildQuizCatalog(), metadataScope));
  console.log(`Wrote supabase/migrations/${output}`);
} else {
  const scope = process.argv.includes("--scope=sejarah-f3") ? "sejarah-f3" : undefined;
  const sql = renderQuizCatalogSql(buildQuizCatalog(), scope);
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
}

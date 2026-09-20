import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import ts from "typescript";
import * as registry from "../src/content/registry";
import { getChapterFeatures } from "../src/content/types";
import { subjects, forms } from "../src/data/subjects-meta";
import { projectF3Interactive } from "../src/content/form3/science/project-bilingual";

// Generated metadata and import references only. Curriculum objects remain in their source modules.
async function main() {
  const modules = new Map<string, Record<string, unknown>>();
  const bindings = new Map<object, string>();
  for (const file of ["src/content/registry.ts", "src/content/form3/science/registration.ts"]) {
    const parsed = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    for (const statement of parsed.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        statement.importClause?.isTypeOnly ||
        !statement.importClause?.namedBindings ||
        !ts.isNamedImports(statement.importClause.namedBindings)
      )
        continue;
      const path = (statement.moduleSpecifier as ts.StringLiteral).text;
      if (
        /registry$|registration$|\/data\/content$|quiz|flashcard|mindmap|mind-map|educational-video/i.test(
          path,
        )
      )
        continue;
      const absolute = path.startsWith("@/")
        ? resolve("src", path.slice(2))
        : resolve(dirname(file), path);
      if (!absolute.includes(resolve("src"))) continue;
      const specifier = "@/" + absolute.slice(resolve("src").length + 1).replaceAll("\\", "/");
      const mod = await import(absolute.replaceAll("\\", "/"));
      modules.set(absolute.replaceAll("\\", "/"), mod);
      for (const element of statement.importClause.namedBindings.elements) {
        if (element.isTypeOnly) continue;
        const name = element.propertyName?.text ?? element.name.text;
        const value = mod[name];
        if (value && typeof value === "object")
          bindings.set(value, `(await import(${JSON.stringify(specifier)})).${name}`);
      }
    }
  }
  const metadata = registry.chapters.map((chapter) => {
    const resolved =
      registry.getChapter(chapter.subjectId, chapter.chapterKey, chapter.lang, chapter.form) ??
      chapter;
    return {
      id: chapter.id,
      subjectId: chapter.subjectId,
      form: chapter.form,
      chapterKey: chapter.chapterKey,
      title: chapter.title,
      lang: chapter.lang,
      description: chapter.description,
      categoryLabel: chapter.categoryLabel,
      video: resolved.video,
      resourceAvailability: getChapterFeatures(resolved),
      resources: Object.fromEntries(
        (["notes", "quiz", "flashcards", "mindMap"] as const).map((resource) => [
          resource,
          registry.hasResourceContent(
            chapter.subjectId,
            chapter.form,
            chapter.chapterKey,
            resource,
            chapter.lang,
          ),
        ]),
      ),
    };
  });
  const imports: string[] = [];
  for (const chapter of registry.chapters) {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(chapter)) {
      if (key !== "notes" && !key.endsWith("Data")) continue;
      if (
        key === "notes" &&
        chapter.subjectId === "science" &&
        chapter.form === "Form 1" &&
        Object.keys(chapter).some((field) => field.endsWith("Data"))
      )
        continue;
      let expression = bindings.get(value as object);
      if (!expression && key === "sciF3InteractiveData") {
        const n = Number(chapter.chapterKey.replace("Chapter ", ""));
        const absolute = resolve(`src/content/form3/science/chapter-${n}/interactive`);
        const mod = modules.get(absolute.replaceAll("\\", "/"))!;
        const name = `scienceF3C${n}Interactive`;
        if (
          JSON.stringify(
            projectF3Interactive(
              mod[name] as Parameters<typeof projectF3Interactive>[0],
              chapter.lang!,
            ),
          ) !== JSON.stringify(value)
        )
          throw new Error(`Projection mismatch: ${chapter.id}`);
        expression = `(await import("@/content/form3/science/project-bilingual")).projectF3Interactive((await import("@/content/form3/science/chapter-${n}/interactive")).${name}, ${JSON.stringify(chapter.lang)})`;
      }
      if (!expression) throw new Error(`No source import for ${chapter.id}.${key}`);
      fields.push(`${JSON.stringify(key)}: ${expression}`);
    }
    imports.push(`${JSON.stringify(chapter.id)}: async () => ({ ${fields.join(", ")} })`);
  }
  const catalogs: Record<string, unknown> = {};
  const stats: Record<string, unknown> = {};
  for (const subject of subjects) {
    stats[subject.id] = registry.getSubjectFormStats(subject.id);
    for (const form of [...forms, "All"] as const)
      for (const lang of [undefined, "bm", "dlp"] as const)
        catalogs[`${subject.id}|${form}|${lang ?? ""}`] = registry.getRegisteredSubjectChapters(
          subject.id,
          lang,
          form,
        );
  }
  const write = (path: string, contents: string) => {
    if (readFileSyncSafe(path) !== contents) writeFileSync(path, contents);
  };
  function readFileSyncSafe(path: string) {
    try {
      return readFileSync(path, "utf8");
    } catch {
      return "";
    }
  }
  write(
    "src/content/notes-catalog.generated.ts",
    `// Generated by scripts/generate-notes-loading.ts. Metadata only; no curriculum payloads.\nimport type { ChapterContent } from "./types";\nimport type { RegisteredSubjectChapter, FormStat, ResourceType } from "./registry";\n// prettier-ignore\nexport const notesChapterMetadata: (ChapterContent & { resources: Record<ResourceType, boolean> })[] = ${JSON.stringify(metadata)};\n// prettier-ignore\nexport const notesCatalogs: Record<string, RegisteredSubjectChapter[]> = ${JSON.stringify(catalogs)};\n// prettier-ignore\nexport const notesFormStats: Record<string, FormStat[]> = ${JSON.stringify(stats)};\n`,
  );
  write(
    "src/content/notes-loaders.generated.ts",
    `// Generated source-module references; never inline curriculum data here.\nimport type { ChapterContent } from "./types";\n// prettier-ignore\nexport const notesChapterLoaders: Record<string, () => Promise<Partial<ChapterContent>>> = {\n${imports.join(",\n")}\n};\n`,
  );
  console.log(
    `Generated metadata and on-demand source imports for ${metadata.length} chapter variants.`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import * as canonical from "./registry";
import { subjects, forms } from "@/data/subjects-meta";
import { getChapterFeatures } from "./types";
import { createNotesRegistry, loadNotesChapter, isNotesChapterLoaded } from "./notes-registry";
import { notesChapterLoaders } from "./notes-loaders.generated";
import {
  NotesRegistryProvider,
  NotesChapterLoading,
} from "@/components/notes/NotesRegistryProvider";
import { useContentRegistry } from "@/hooks/use-content-registry";

describe("Notes on-demand loading", () => {
  it("preserves all subject/form/language discovery and resource availability", () => {
    const scoped = createNotesRegistry();
    for (const subject of subjects) {
      expect(scoped.getSubjectFormStats(subject.id)).toEqual(
        canonical.getSubjectFormStats(subject.id),
      );
      for (const form of [...forms, "All"] as const) {
        for (const lang of [undefined, "bm", "dlp"] as const) {
          expect(scoped.getRegisteredSubjectChapters(subject.id, lang, form)).toEqual(
            canonical.getRegisteredSubjectChapters(subject.id, lang, form),
          );
          for (const resource of ["notes", "quiz", "flashcards", "mindMap"] as const) {
            expect(scoped.hasFormResourceContent(subject.id, form, resource, lang)).toBe(
              canonical.hasFormResourceContent(subject.id, form, resource, lang),
            );
          }
        }
      }
    }
    for (const c of canonical.chapters) {
      expect(
        getChapterFeatures(scoped.getChapter(c.subjectId, c.chapterKey, c.lang, c.form)),
      ).toEqual(
        getChapterFeatures(canonical.getChapter(c.subjectId, c.chapterKey, c.lang, c.form)),
      );
    }
  });

  it("renders discovery immediately without loading Chapter 4, then loads only the selected payload and caches it", async () => {
    function Picker() {
      const registry = useContentRegistry();
      return (
        <div>
          {registry?.getRegisteredSubjectChapters("science", "bm", "Form 1").map((c) => (
            <span key={c.key}>{c.label}</span>
          ))}
        </div>
      );
    }
    const id = "science-f1-c4-bm";
    expect(isNotesChapterLoaded(id)).toBe(false);
    const html = renderToStaticMarkup(
      <NotesRegistryProvider subject="science" chapter={null} form="Form 1" lang="bm">
        <Picker />
      </NotesRegistryProvider>,
    );
    expect(html).toContain("Pembiakan");
    expect(isNotesChapterLoaded(id)).toBe(false);
    const first = loadNotesChapter(id);
    expect(loadNotesChapter(id)).toBe(first);
    const chapter = await first;
    expect(chapter.chapter4Data).toBe(
      canonical.getChapter("science", "Chapter 4", "bm", "Form 1")?.chapter4Data,
    );
    expect(await loadNotesChapter(id)).toBe(chapter);
    expect(isNotesChapterLoaded("science-f1-c3-bm")).toBe(false);
    expect(renderToStaticMarkup(<NotesChapterLoading />)).toContain("Loading chapter notes…");
  });

  it("keeps every generated chapter payload linked to the canonical source", async () => {
    for (const chapter of canonical.chapters) {
      const payload = await notesChapterLoaders[chapter.id]();
      for (const [key, value] of Object.entries(chapter)) {
        if (
          key.endsWith("Data") ||
          (key === "notes" &&
            !(
              chapter.subjectId === "science" &&
              chapter.form === "Form 1" &&
              Object.keys(chapter).some((k) => k.endsWith("Data"))
            ))
        ) {
          expect(payload[key as keyof typeof payload], `${chapter.id}.${key}`).toEqual(value);
        }
      }
    }
  });

  it("allows a failed chapter download to be retried without caching the failure", async () => {
    const id = "science-f1-c3-dlp";
    const loader = vi.spyOn(notesChapterLoaders, id).mockRejectedValueOnce(new Error("Offline"));
    try {
      await expect(loadNotesChapter(id)).rejects.toThrow("Offline");
      expect(isNotesChapterLoaded(id)).toBe(false);
      const chapter = await loadNotesChapter(id);
      expect(chapter.chapter3Data).toBe(
        canonical.getChapter("science", "Chapter 3", "dlp", "Form 1")?.chapter3Data,
      );
      expect(loader).toHaveBeenCalledTimes(2);
    } finally {
      loader.mockRestore();
    }
  });

  it("has no static path from the Notes route to chapter renderers or the full curriculum", () => {
    const visited = new Set<string>();
    function walk(file: string) {
      file = resolve(file);
      if (visited.has(file)) return;
      visited.add(file);
      const ast = ts.createSourceFile(
        file,
        readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      for (const s of ast.statements) {
        if (
          !(ts.isImportDeclaration(s) || ts.isExportDeclaration(s)) ||
          !s.moduleSpecifier ||
          !ts.isStringLiteral(s.moduleSpecifier)
        )
          continue;
        if (
          ts.isImportDeclaration(s) &&
          (s.importClause?.isTypeOnly ||
            (s.importClause?.namedBindings &&
              ts.isNamedImports(s.importClause.namedBindings) &&
              !s.importClause.name &&
              s.importClause.namedBindings.elements.every((e) => e.isTypeOnly)))
        )
          continue;
        if (ts.isExportDeclaration(s) && s.isTypeOnly) continue;
        const spec = s.moduleSpecifier.text;
        if (!spec.startsWith(".") && !spec.startsWith("@/")) continue;
        const base = spec.startsWith("@/")
          ? resolve("src", spec.slice(2))
          : resolve(dirname(file), spec);
        const target = [
          base,
          base + ".ts",
          base + ".tsx",
          base + "/index.ts",
          base + "/index.tsx",
        ].find((p) => /\.[tj]sx?$/.test(p) && existsSync(p));
        if (target) walk(target);
      }
    }
    walk("src/routes/notes.tsx");
    const paths = [...visited].map((p) => p.replaceAll("\\", "/"));
    expect(
      paths.filter((p) =>
        /Chapter\d+.*NotesBlock|Chapter4(FlowerReproduction|SeedReproduction|PregnancyVisuals|Infertility)/.test(
          p,
        ),
      ),
    ).toEqual([]);
    expect(
      paths.filter((p) =>
        /\/content\/registry\.ts$|\/data\/content\.ts$|\/content\/form[123]\/.+chapter-/.test(p),
      ),
    ).toEqual([]);
    const route = readFileSync("src/routes/notes.tsx", "utf8");
    expect(route).toContain('import("@/components/notes/ScienceF1Chapter4VisualNotesBlock")');
    expect(route).toContain("<Suspense fallback={<NotesChapterLoading />}>");
    // The data provider and chapter page must use the same language state.
    expect(route.match(/useScienceLang\(\)/g)).toHaveLength(1);
    expect(route).toContain("<NotesPage scienceLanguage={scienceLanguage} />");
    expect(route).toContain("chapter: chapterLoading.loading ? null : activeChapterKey");
    expect(renderToStaticMarkup(<NotesChapterLoading />)).toContain("data-notes-loading");
    expect(readFileSync("src/hooks/use-notes-reading-progress.ts", "utf8")).toContain(
      'if (element.querySelector("[data-notes-loading]")) return;',
    );
    const f3 = readFileSync("src/components/notes/ScienceF3InteractiveNotesBlock.tsx", "utf8");
    expect(f3.match(/lazy\(/g)).toHaveLength(10);
  });
});

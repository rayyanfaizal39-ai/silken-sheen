import { useEffect, useState } from "react";

// @/content/registry (and the @/data/content it partly builds on) statically
// import every chapter's notes/quizzes/flashcards/mindmaps — several MB of
// curriculum data. Any component reachable from a route that's part of the
// SSR route tree would otherwise put that weight in the server bundle
// regardless of which page is actually being rendered (TanStack Start's SSR
// build bundles every route's component tree, not just the matched route).
// This hook is the shared client-only loader: it resolves to the real module
// after mount (browser only) and stays null during SSR, so components render
// their "unavailable"/loading state on the server and fill in real content
// once the dynamic import resolves in the browser.
export type ContentRegistryModule = typeof import("@/content/registry");

export function useContentRegistry(): ContentRegistryModule | null {
  const [registry, setRegistry] = useState<ContentRegistryModule | null>(null);
  useEffect(() => {
    let cancelled = false;
    import("@/content/registry").then((mod) => {
      if (!cancelled) setRegistry(mod);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return registry;
}

// Same rationale as ContentRegistryModule above: @/data/content is the
// legacy multi-MB notes/quizzes/flashcards barrel that @/content/registry
// itself builds on. Load it lazily, client-side only, wherever legacy
// content (raw `notes`/`quizzes`/`flashcards` arrays, `getItemChapterKey`,
// etc.) is needed outside the registry's own module.
export type ContentDataModule = typeof import("@/data/content");

export function useContentDataModule(): ContentDataModule | null {
  const [mod, setMod] = useState<ContentDataModule | null>(null);
  useEffect(() => {
    let cancelled = false;
    import("@/data/content").then((m) => {
      if (!cancelled) setMod(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return mod;
}

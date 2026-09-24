import { createContext, useContext, useEffect, useState } from "react";

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

export const ContentRegistryContext = createContext<ContentRegistryModule | null>(null);

export function useContentRegistry(): ContentRegistryModule | null {
  const override = useContext(ContentRegistryContext);
  const [registry, setRegistry] = useState<ContentRegistryModule | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (override) return;
    import("@/content/registry").then((mod) => {
      if (!cancelled) setRegistry(mod);
    });
    return () => {
      cancelled = true;
    };
  }, [override]);
  return override ?? registry;
}

export type ContentRegistryStatus = "loading" | "ready" | "error";

/**
 * Same lazy dynamic-import as `useContentRegistry`, but surfaces a real
 * loading/ready/error status (instead of collapsing "still loading" and
 * "failed to load" into the same `null`) plus a `retry` that re-runs the
 * import. Use this wherever a page needs to tell "no content yet" apart
 * from "still checking" or "the chunk failed to load".
 */
export function useContentRegistryStatus(): {
  registry: ContentRegistryModule | null;
  status: ContentRegistryStatus;
  retry: () => void;
} {
  const override = useContext(ContentRegistryContext);
  const [registry, setRegistry] = useState<ContentRegistryModule | null>(null);
  const [status, setStatus] = useState<ContentRegistryStatus>("loading");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (override) return;
    let cancelled = false;
    setStatus((current) => (current === "ready" ? current : "loading"));
    import("@/content/registry").then(
      (mod) => {
        if (cancelled) return;
        setRegistry(mod);
        setStatus("ready");
      },
      () => {
        if (cancelled) return;
        setStatus("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [override, revision]);

  return {
    registry: override ?? registry,
    status: override ? "ready" : status,
    retry: () => setRevision((v) => v + 1),
  };
}

// Same rationale as ContentRegistryModule above: @/data/content is the
// legacy multi-MB notes/quizzes/flashcards barrel that @/content/registry
// itself builds on. Load it lazily, client-side only, wherever legacy
// content (raw `notes`/`quizzes`/`flashcards` arrays, `getItemChapterKey`,
// etc.) is needed outside the registry's own module.
export type ContentDataModule = typeof import("@/data/content");

export function useContentDataModule(enabled = true): ContentDataModule | null {
  const [mod, setMod] = useState<ContentDataModule | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!enabled) return;
    import("@/data/content").then((m) => {
      if (!cancelled) setMod(m);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);
  return enabled ? mod : null;
}

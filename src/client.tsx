// Client entry that supports both:
//  - Dev / SSR builds: TanStack Start renders full HTML, we hydrate the document.
//  - Static Cloudflare Pages shell: empty <div id="root">, mount as SPA.

import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";

import "./styles.css";
import { getRouter } from "./router";

const container = document.getElementById("root");

if (container) {
  // Static SPA mount (Cloudflare Pages).
  const router = getRouter();
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  // Dev / SSR: hydrate TanStack Start's SSR-rendered document.
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
      {
        onRecoverableError(error, errorInfo) {
          console.error("[Hydration] React recovered from an SSR/client mismatch", {
            error,
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            componentStack: errorInfo.componentStack ?? "(component stack unavailable)",
            pathname: window.location.pathname,
          });
        },
      },
    );
  });
}

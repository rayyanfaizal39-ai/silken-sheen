// Client entry that supports both:
//  - Dev / SSR builds: TanStack Start renders full HTML, we hydrate it.
//  - Static Cloudflare Pages shell: empty <div id="root">, mount as SPA.
//
// We detect by the presence of an explicit #root element. The static shell
// produced by scripts/generate-static-shell.js always contains one;
// TanStack Start's SSR output does not.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

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
  // Dev / SSR: defer to TanStack Start's default hydrating client entry.
  void import("@tanstack/react-start/client-entry");
}

// SPA client entry used by the Cloudflare Pages static deploy.
//
// The TanStack Start default client entry calls hydrateRoot and expects an
// SSR-rendered DOM + dehydrated router state. Static Pages has no SSR pass,
// so hydrating throws "Invariant failed" immediately. Instead we mount the
// router as a plain SPA via createRoot + RouterProvider.
//
// SSR/Vercel deploys do NOT use this file — they go through src/server.ts
// and @tanstack/react-start's server entry.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";

const router = getRouter();

const container = document.getElementById("root");
if (!container) {
  throw new Error('Missing #root element in the static shell');
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

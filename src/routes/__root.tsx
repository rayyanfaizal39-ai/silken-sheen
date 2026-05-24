import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { ParticleBg } from "@/components/ParticleBg";
import { SoundFx } from "@/components/SoundFx";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page wandered off into deep space.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10">
        <h1 className="font-display text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again — we'll get this fixed.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AcadeMY — Belajar Lebih Bijak, Bersinar Lebih Terang" },
      { name: "description", content: "Platform pembelajaran KSSM berkuasa AI untuk pelajar Form 1–3 Malaysia. Kuiz, kad imbasan, dan nota pintar." },
      { property: "og:title", content: "AcadeMY — Belajar Lebih Bijak, Bersinar Lebih Terang" },
      { property: "og:description", content: "Platform pembelajaran KSSM berkuasa AI untuk pelajar Form 1–3 Malaysia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ParticleBg />
      <SoundFx />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}

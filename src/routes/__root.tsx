import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppShell } from "@/components/AppShell";
import { ParticleBg } from "@/components/ParticleBg";
import { SoundFx } from "@/components/SoundFx";
import { MusicPlayer } from "@/components/MusicPlayer";
import { AuthProvider } from "@/context/auth-context";
import { SignInModalProvider } from "@/context/sign-in-modal";
import { CikguProvider } from "@/context/cikgu-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
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
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10">
        <h1 className="font-display text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again — we'll get this fixed.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "AcadeMY — Belajar Lebih Bijak, Bersinar Lebih Terang" },
      {
        name: "description",
        content:
          "Platform pembelajaran KSSM berkuasa AI untuk pelajar Form 1–3 Malaysia. Kuiz, kad imbasan, dan nota pintar.",
      },
      { property: "og:title", content: "AcadeMY — Belajar Lebih Bijak, Bersinar Lebih Terang" },
      {
        property: "og:description",
        content:
          "Platform pembelajaran KSSM berkuasa AI untuk pelajar Form 1–3 Malaysia. Kuiz, kad imbasan, dan nota pintar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AcadeMY — Belajar Lebih Bijak, Bersinar Lebih Terang" },
      {
        name: "twitter:description",
        content:
          "Platform pembelajaran KSSM berkuasa AI untuk pelajar Form 1–3 Malaysia. Kuiz, kad imbasan, dan nota pintar.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d4da5c1d-d922-4e19-848b-382833973588/id-preview-aaf2500d--57cd3342-b1f5-4ee9-a0c8-535f6ce0fa07.lovable.app-1780661904269.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d4da5c1d-d922-4e19-848b-382833973588/id-preview-aaf2500d--57cd3342-b1f5-4ee9-a0c8-535f6ce0fa07.lovable.app-1780661904269.png",
      },
      {
        name: "description",
        content:
          "AcadeMY is an educational platform offering interactive notes, quizzes, and flashcards for students.",
      },
      {
        property: "og:description",
        content:
          "AcadeMY is an educational platform offering interactive notes, quizzes, and flashcards for students.",
      },
      {
        name: "twitter:description",
        content:
          "AcadeMY is an educational platform offering interactive notes, quizzes, and flashcards for students.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/91319232-a302-4aa1-b453-84a11b887a9a/id-preview-3b032b13--57cd3342-b1f5-4ee9-a0c8-535f6ce0fa07.lovable.app-1780714922692.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/91319232-a302-4aa1-b453-84a11b887a9a/id-preview-3b032b13--57cd3342-b1f5-4ee9-a0c8-535f6ce0fa07.lovable.app-1780714922692.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
      <AuthProvider>
        <SignInModalProvider>
          <CikguProvider>
            <ParticleBg />
            <SoundFx />
            <MusicPlayer />
            <AppShell>
              <Outlet />
            </AppShell>
          </CikguProvider>
        </SignInModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

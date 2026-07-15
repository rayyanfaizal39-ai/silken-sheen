import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useEffect, type ReactNode } from "react";
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
import { BgMusicController } from "@/components/BgMusicController";
import { AuthProvider } from "@/context/auth-context";
import { UserSettingsProvider } from "@/context/user-settings-context";
import { SignInModalProvider } from "@/context/sign-in-modal";
import { CikguProvider } from "@/context/cikgu-context";
import { SITE_URL } from "@/lib/seo";
import { organizationSchema, educationalOrganizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

function NotFoundComponent() {
  // The 404 view has no file-based route of its own, so it can't set its
  // own head(). Root's head() advertises "index, follow" for every page;
  // override to noindex here so a broken/removed link doesn't get crawled
  // and indexed as real content. Client-side only — Googlebot executes JS
  // and will see this, but a JS-less crawler still gets the root's default.
  useEffect(() => {
    const el = document.querySelector('meta[name="robots"]');
    const prev = el?.getAttribute("content") ?? null;
    el?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (prev !== null) el?.setAttribute("content", prev);
    };
  }, []);

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

const ROOT_TITLE = "AcadeMY — Malaysia's Interstellar Learning Platform (KSSM Form 1-3)";
const ROOT_DESCRIPTION =
  "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, quizzes, flashcards, mind maps and Cikgu AI tutor in Bahasa Melayu & English/DLP — free to start.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: ROOT_TITLE },
      { name: "description", content: ROOT_DESCRIPTION },
      {
        name: "keywords",
        content:
          "KSSM notes, KSSM quiz, KSSM flashcards, SPM preparation, PT3 preparation, Form 1 notes, Form 2 notes, Form 3 notes, Cikgu AI, AI tutor Malaysia, student learning platform Malaysia, Malaysia learning platform",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#050816" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "AcadeMY" },
      { property: "og:title", content: ROOT_TITLE },
      { property: "og:description", content: ROOT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AcadeMY" },
      { property: "og:locale", content: "en_MY" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ROOT_TITLE },
      { name: "twitter:description", content: ROOT_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
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
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isMarketingPage = pathname.startsWith("/academy/");
  // The floating music button doesn't belong on the marketing landing
  // page. ParticleBg/SoundFx are unaffected — only removing the button.
  const isLandingPage = pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      {/* Site-wide structured data — same on every page, so it lives once
          at the root rather than being repeated per-route. */}
      <JsonLd data={organizationSchema()} />
      <JsonLd data={educationalOrganizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <AuthProvider>
        <UserSettingsProvider>
          <Toaster theme="dark" position="top-right" richColors />
          <SignInModalProvider>
            <CikguProvider>
              {!isMarketingPage && (
                <>
                  <ParticleBg />
                  <SoundFx />
                </>
              )}
              <BgMusicController />
              <AppShell>
                <Outlet />
              </AppShell>
            </CikguProvider>
          </SignInModalProvider>
        </UserSettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

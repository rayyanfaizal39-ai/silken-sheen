import { Link } from "@tanstack/react-router";
import { AcademyLogo } from "@/components/AcademyLogo";

/**
 * Sitewide footer. Server-rendered, plain <a>/<Link> anchors (no JS required
 * to navigate), so Google's OAuth verification crawler and any user can
 * reach the Privacy Policy / Terms / Contact pages even without hydration.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      className="relative z-10 border-t border-white/[0.07] bg-[#050816]/80 px-4 py-8 pb-[calc(var(--mobile-content-bottom,90px)+1.5rem)] backdrop-blur-xl sm:px-6 lg:ml-[236px] lg:px-8 lg:pb-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            aria-label="AcadeMY home"
            className="w-fit rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            <AcademyLogo className="h-auto w-[150px]" loading="lazy" />
          </Link>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href="/privacy"
              className="text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:rounded"
            >
              Privacy Policy
            </a>
            <Link
              to="/terms"
              className="text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:rounded"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:rounded"
            >
              Contact
            </Link>
            <a
              href="mailto:support@myacademy.my"
              className="text-white/55 transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:rounded"
            >
              support@myacademy.my
            </a>
          </nav>
        </div>

        <p className="text-xs text-white/55">© {year} AcadeMY. All rights reserved.</p>
      </div>
    </footer>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { AcademyLogo } from "@/components/AcademyLogo";
import { seoMeta } from "@/lib/seo";

const VIDEO_URL = "https://www.youtube-nocookie.com/embed/grEPzS-Xbec?rel=0";

export const Route = createFileRoute("/explore-academy")({
  head: () =>
    seoMeta({
      title: "Explore the World of AcadeMY",
      description:
        "Watch the AcadeMY introduction and begin your gamified KSSM learning adventure.",
      path: "/explore-academy",
      keywords: ["AcadeMY introduction", "KSSM learning adventure", "AcadeMY video"],
    }),
  component: ExploreAcademyPage,
});

function ExploreAcademyPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-x-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_-10%,#312e81_0%,#17104d_34%,#09051f_68%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1.5px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_34%,rgba(139,92,246,0.28),transparent_25%),radial-gradient(circle_at_86%_20%,rgba(79,70,229,0.25),transparent_27%),radial-gradient(circle_at_50%_92%,rgba(168,85,247,0.18),transparent_34%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-[28%] -z-10 h-52 w-64 rotate-[-12deg] rounded-[2.5rem] bg-gradient-to-br from-[#4338ca]/18 to-[#7c3aed]/5 shadow-[0_30px_80px_rgba(76,29,149,0.22)] [clip-path:polygon(8%_16%,87%_0,100%_76%,22%_100%,0_58%)] sm:left-[-5rem] sm:h-72 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 -z-10 h-64 w-72 rotate-[14deg] rounded-[3rem] bg-gradient-to-bl from-[#8b5cf6]/18 to-[#312e81]/5 shadow-[0_30px_90px_rgba(91,33,182,0.2)] [clip-path:polygon(12%_5%,100%_24%,82%_100%,0_78%)] sm:h-80 sm:w-96"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl justify-center px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Link
          to="/"
          aria-label="Return to AcadeMY home"
          className="rounded-2xl p-2 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050816]"
        >
          <AcademyLogo className="h-auto w-[148px] sm:w-[172px]" />
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 pt-7 text-center sm:px-6 sm:pb-14 sm:pt-9 lg:px-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c4b5fd] sm:text-sm">
            Welcome aboard
          </p>
          <h1 className="font-display text-[clamp(2rem,7vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white drop-shadow-[0_0_28px_rgba(139,92,246,0.3)]">
            Explore the World of AcadeMY
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
            Your learning adventure begins here.
          </p>
        </div>

        <div className="relative mt-8 w-full sm:mt-10 lg:mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-[#6366f1]/30 via-[#a855f7]/25 to-[#7c3aed]/30 blur-2xl sm:-inset-5"
          />
          <div
            className="relative w-full overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#08031a] shadow-[0_30px_90px_-24px_rgba(124,58,237,0.72),0_18px_46px_-24px_rgba(0,0,0,0.95)] sm:rounded-[1.75rem]"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={VIDEO_URL}
              title="Explore AcadeMY Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10">
          <Link
            to="/login"
            className="inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#9333ea] px-6 py-3 text-center text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(124,58,237,0.8)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-12px_rgba(124,58,237,0.92)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddd6fe] focus-visible:ring-offset-4 focus-visible:ring-offset-[#09051f] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:min-w-72"
          >
            Start Your Learning Adventure
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white/65 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09051f]"
          >
            Return to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

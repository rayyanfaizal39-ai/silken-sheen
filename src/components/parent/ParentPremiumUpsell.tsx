import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function ParentPremiumUpsell({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={
        compact
          ? "mb-6 rounded-[2rem] border border-violet-300/20 bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6"
          : "mx-auto max-w-xl rounded-[2rem] border border-violet-300/20 bg-[#0B1220]/70 p-6 text-center backdrop-blur-2xl sm:p-8"
      }
    >
      <Sparkles className="h-6 w-6 text-violet-300" aria-hidden="true" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">Premium</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-white">Upgrade to Premium</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        The Parent Dashboard and monthly progress reports are included with Premium. A parent email
        can be saved after you upgrade.
      </p>
      <Link
        to="/upgrade"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-violet-500 px-5 text-sm font-bold text-white hover:bg-violet-400"
      >
        Upgrade to Premium
      </Link>
    </section>
  );
}

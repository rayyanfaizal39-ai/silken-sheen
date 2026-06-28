import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Globe, Rocket } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AcadeMY" },
      { name: "description", content: "Get in touch with the AcadeMY team." },
      { property: "og:title", content: "Contact — AcadeMY" },
      { property: "og:description", content: "Get in touch with the AcadeMY team." },
    ],
    links: [{ rel: "canonical", href: "https://www.myacademy.my/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_24px_rgba(99,102,241,0.5)]">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Contact</h1>
      </div>

      <p className="mb-6 text-sm leading-7 text-white/65 sm:text-[15px]">
        Have a question about AcadeMY, your account, or your data? We'd love to hear from you.
      </p>

      <div className="space-y-3">
        <a
          href="mailto:support@myacademy.my"
          className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white"
        >
          <Mail className="h-4 w-4 shrink-0 text-[#A78BFA]" />
          support@myacademy.my
        </a>
        <a
          href="https://www.myacademy.my"
          className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white"
        >
          <Globe className="h-4 w-4 shrink-0 text-[#A78BFA]" />
          www.myacademy.my
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/40">
        <Link to="/" className="hover:text-white/70">Back to home</Link>
        <span>·</span>
        <Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link>
        <span>·</span>
        <Link to="/terms" className="hover:text-white/70">Terms of Service</Link>
      </div>
    </section>
  );
}

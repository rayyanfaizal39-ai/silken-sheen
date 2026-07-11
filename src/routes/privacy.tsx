import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seoMeta({
    title: "Privacy Policy",
    description: "How AcadeMY collects, uses, and protects student data, including information used for Google Sign-In.",
    path: "/privacy",
  }),
  component: PrivacyPage,
});

const EFFECTIVE_DATE = "28 June 2026";

function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_24px_rgba(99,102,241,0.5)]">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/40">Effective {EFFECTIVE_DATE}</p>
        </div>
      </div>

      <div className="space-y-7 text-sm leading-7 text-white/65 sm:text-[15px]">
        <p>
          AcadeMY ("AcadeMY", "we", "us", or "our") provides an educational platform for
          Malaysian KSSM students at{" "}
          <a href="https://www.myacademy.my" className="text-white/85 underline underline-offset-2 hover:text-white">
            www.myacademy.my
          </a>{" "}
          (the "Service"). This Privacy Policy explains what information we collect, how we use
          it, and the choices you have.
        </p>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            1. Information we collect
          </h2>
          <p className="mb-2">We collect the following categories of information:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong className="text-white/85">Account information.</strong> If you sign in
              with Google, we receive your name, email address, and profile picture from Google
              so we can create and identify your account.
            </li>
            <li>
              <strong className="text-white/85">Learning progress.</strong> Quiz results, XP,
              streaks, flashcard mastery, badges, and study activity, so your progress can be
              saved and synced across devices.
            </li>
            <li>
              <strong className="text-white/85">Optional information.</strong> If provided, a
              parent/guardian email for progress reports, and a display name or school name.
            </li>
            <li>
              <strong className="text-white/85">Local device storage.</strong> When you are not
              signed in, study progress is stored only in your browser's local storage on your
              own device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            2. Why we use Google Sign-In
          </h2>
          <p>
            We use Google Sign-In only to authenticate your account and securely save your
            learning progress. We do not request unnecessary Google data, and we do not use your
            Google account information for advertising. Our use of information received from
            Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 underline underline-offset-2 hover:text-white"
            >
              Google API Services User Data Policy
            </a>
            , including its Limited Use requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            3. How we use your information
          </h2>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>To create and secure your account.</li>
            <li>To save and sync your quiz results, XP, streaks, and study progress across devices.</li>
            <li>To show you a leaderboard rank.</li>
            <li>To generate optional parent/guardian progress reports, when configured.</li>
            <li>To operate, maintain, and improve the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            4. How we store and protect your information
          </h2>
          <p>
            Account and progress data is stored using Supabase, our database and authentication
            provider, with industry-standard encryption in transit (HTTPS/TLS). We retain your
            data for as long as your account is active. You may request deletion of your account
            and associated data at any time by contacting us (see Section 8).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            5. Children's privacy
          </h2>
          <p>
            AcadeMY is built for secondary school students. We collect the minimum information
            necessary to provide the Service, do not sell personal data, and do not show
            behavioural advertising to students. Parents or guardians who believe their child has
            provided information that should be removed may contact us at any time using the
            details in Section 8.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">6. Data sharing</h2>
          <p>
            We do not sell your personal information. We share data only with service providers
            that help us run AcadeMY (such as Supabase for authentication and data storage),
            bound by their own confidentiality and security obligations, or when required by law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">7. Your choices</h2>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>You can use AcadeMY without signing in; progress is then kept only on your device.</li>
            <li>You can sign out at any time from the sidebar.</li>
            <li>You can request access to, correction of, or deletion of your data by contacting us.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            8. Contact us
          </h2>
          <p>
            Questions about this Privacy Policy or your data can be sent to{" "}
            <a
              href="mailto:support@myacademy.my"
              className="text-white/85 underline underline-offset-2 hover:text-white"
            >
              support@myacademy.my
            </a>
            . See our{" "}
            <Link to="/contact" className="text-white/85 underline underline-offset-2 hover:text-white">
              Contact page
            </Link>{" "}
            for more details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">9. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes take effect when posted
            on this page, and the effective date above will be updated accordingly.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/40">
        <Link to="/" className="hover:text-white/70">Back to home</Link>
        <span>·</span>
        <Link to="/terms" className="hover:text-white/70">Terms of Service</Link>
        <span>·</span>
        <Link to="/contact" className="hover:text-white/70">Contact</Link>
      </div>
    </section>
  );
}

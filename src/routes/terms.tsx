import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — AcadeMY" },
      {
        name: "description",
        content: "The terms that govern your use of the AcadeMY learning platform.",
      },
      { property: "og:title", content: "Terms of Service — AcadeMY" },
      {
        property: "og:description",
        content: "The terms that govern your use of the AcadeMY learning platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.myacademy.my/terms" }],
  }),
  component: TermsPage,
});

const EFFECTIVE_DATE = "28 June 2026";

function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_24px_rgba(99,102,241,0.5)]">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Terms of Service
          </h1>
          <p className="text-xs text-white/40">Effective {EFFECTIVE_DATE}</p>
        </div>
      </div>

      <div className="space-y-7 text-sm leading-7 text-white/65 sm:text-[15px]">
        <p>
          These Terms of Service ("Terms") govern your use of AcadeMY at{" "}
          <a href="https://www.myacademy.my" className="text-white/85 underline underline-offset-2 hover:text-white">
            www.myacademy.my
          </a>{" "}
          (the "Service"). By using AcadeMY, you agree to these Terms.
        </p>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">1. The Service</h2>
          <p>
            AcadeMY is an educational platform for Malaysian KSSM students. It provides
            interactive notes, quizzes, flashcards, mind maps, and progress tracking. Some
            features (such as syncing your progress across devices) require signing in with a
            Google account.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">2. Accounts</h2>
          <p>
            You are responsible for the activity on your account. If you are under 18, you should
            review these Terms with a parent or guardian. We may suspend or terminate accounts
            that misuse the Service or violate these Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            3. Acceptable use
          </h2>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Use the Service for personal, non-commercial study purposes.</li>
            <li>Do not attempt to disrupt, reverse engineer, or attack the Service.</li>
            <li>Do not post or upload content that is unlawful, harmful, or infringes others' rights.</li>
            <li>Do not misrepresent your identity or impersonate another student.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            4. Content and intellectual property
          </h2>
          <p>
            Notes, quizzes, illustrations, and other learning materials on AcadeMY are owned by
            AcadeMY or its licensors and are provided for your personal study use. You retain
            ownership of any content you submit (such as a display name), and grant us a licence
            to store and display it within the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            5. Disclaimer and limitation of liability
          </h2>
          <p>
            The Service is provided "as is" to support studying and is not a substitute for
            official KSSM syllabus materials or teacher guidance. To the fullest extent permitted
            by law, AcadeMY is not liable for indirect or incidental damages arising from use of
            the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">6. Termination</h2>
          <p>
            You may stop using AcadeMY and request deletion of your account at any time. We may
            suspend or terminate access to the Service for violations of these Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">
            7. Governing law
          </h2>
          <p>These Terms are governed by the laws of Malaysia.</p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">8. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after
            changes take effect means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-white">9. Contact</h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a
              href="mailto:support@myacademy.my"
              className="text-white/85 underline underline-offset-2 hover:text-white"
            >
              support@myacademy.my
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/40">
        <Link to="/" className="hover:text-white/70">Back to home</Link>
        <span>·</span>
        <Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link>
        <span>·</span>
        <Link to="/contact" className="hover:text-white/70">Contact</Link>
      </div>
    </section>
  );
}

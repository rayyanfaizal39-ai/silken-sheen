import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { MySubscription } from "@/components/billing/MySubscription";
import { seoMeta } from "@/lib/seo";
import "@/styles/billing.css";

export const Route = createFileRoute("/account/billing")({
  head: () =>
    seoMeta({
      title: "Account & Billing",
      description: "Manage your AcadeMY plan, renewal, receipts, and subscription settings.",
      path: "/account/billing",
      noindex: true,
    }),
  component: AccountBillingPage,
});

function AccountBillingPage() {
  return (
    <AcademyPageShell className="max-w-[1050px]" rootClassName="billing-page">
      <header className="billing-hero">
        <div>
          <p className="billing-eyebrow">Simple subscription control</p>
          <h1>
            Your plan, <span>clearly.</span>
          </h1>
          <p>
            See what you’re paying, when your paid period ends, and make essential changes. Payment
            receipts are sent directly to your account email.
          </p>
        </div>
        <div className="billing-secure">
          <ShieldCheck aria-hidden="true" />
          <div>
            <strong>Secure billing</strong>
            <span>Private to your account</span>
          </div>
        </div>
      </header>

      <MySubscription />
    </AcademyPageShell>
  );
}

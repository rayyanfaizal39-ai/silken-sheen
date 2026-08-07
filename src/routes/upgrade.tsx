import { useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Crown,
  HeartHandshake,
  LockKeyhole,
  Loader2,
  MessageSquareQuote,
  Minus,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { PLAN_FEATURES, type Feature, type Plan } from "@/config/features";
import { useAuth, type AuthUser } from "@/context/auth-context";
import {
  useSubscriptionOverview,
  type SubscriptionOverviewState,
} from "@/hooks/use-subscription-overview";
import { toCheckoutPlan } from "@/lib/billing-config";
import { hasFeature } from "@/lib/feature-access";
import type { BillingPlan } from "@/lib/billing.types";
import { seoMeta } from "@/lib/seo";
import { createCheckout, simulateMockPayment, type UpgradePlan } from "./-upgrade.server";
import "@/styles/upgrade.css";

export const Route = createFileRoute("/upgrade")({
  head: () =>
    seoMeta({
      title: "AcadeMY Pricing — Free, Pro & Premium Plans",
      description:
        "Choose an AcadeMY student plan. Upgrade to Pro for complete learning access and quiz history, or Premium for parent visibility.",
      path: "/upgrade",
      keywords: [
        "AcadeMY pricing",
        "KSSM premium",
        "student learning Malaysia",
        "parent dashboard Malaysia",
      ],
    }),
  component: UpgradePage,
});

type PaidPlanKey = "pro" | "premium";

type UpgradeFeature = Extract<
  Feature,
  "student_learning" | "quiz_history" | "parent_dashboard" | "parent_reports" | "parent_analytics"
>;

const FEATURE_LABELS: Record<UpgradeFeature, string> = {
  student_learning: "Complete learning access across every chapter",
  quiz_history: "Saved quiz attempts and learning history",
  parent_dashboard: "Parent dashboard with progress visibility",
  parent_reports: "Clear parent progress reports",
  parent_analytics: "Detailed subject and learning analytics",
};

const FEATURE_PLAN: Record<PaidPlanKey, Plan> = {
  pro: "explorer",
  premium: "captain",
};

const PRICING_PLANS: Array<{
  key: PaidPlanKey;
  name: string;
  monthlyPrice: number;
  eyebrow: string;
  description: string;
  icon: typeof Rocket;
}> = [
  {
    key: "pro",
    name: "Pro",
    monthlyPrice: 29,
    eyebrow: "Focused learning",
    description:
      "For independent students ready to explore every chapter and keep a lasting quiz record.",
    icon: Rocket,
  },
  {
    key: "premium",
    name: "Premium",
    monthlyPrice: 59,
    eyebrow: "Complete experience",
    description:
      "The complete AcadeMY system for students who want full access and parents who want meaningful visibility.",
    icon: Crown,
  },
];

const COMPARISON_ROWS: Array<{
  group: "Learning access" | "Progress & insight" | "Parent visibility";
  label: string;
  description: string;
  feature: UpgradeFeature;
  basicPreview?: string;
  includedLabel: string;
}> = [
  {
    group: "Learning access",
    label: "Notes, mind maps & flashcards",
    description: "Complete chapter-based learning tools",
    feature: "student_learning",
    basicPreview: "Chapter 1",
    includedLabel: "All chapters",
  },
  {
    group: "Learning access",
    label: "Video lessons & quizzes",
    description: "Learn, practise, and check understanding",
    feature: "student_learning",
    basicPreview: "Chapter 1",
    includedLabel: "All chapters",
  },
  {
    group: "Progress & insight",
    label: "Saved quiz history",
    description: "Review attempts and performance",
    feature: "quiz_history",
    includedLabel: "Included",
  },
  {
    group: "Parent visibility",
    label: "Parent dashboard",
    description: "A clear view of learning progress",
    feature: "parent_dashboard",
    includedLabel: "Included",
  },
  {
    group: "Parent visibility",
    label: "Parent reports",
    description: "Progress updates in one place",
    feature: "parent_reports",
    includedLabel: "Included",
  },
  {
    group: "Parent visibility",
    label: "Parent learning analytics",
    description: "Detailed subject and learning insight",
    feature: "parent_analytics",
    includedLabel: "Included",
  },
];

function getActivePlan(state: SubscriptionOverviewState): BillingPlan | null {
  if (!state.resolved) return null;
  const subscription = state.overview?.subscription;
  if (!subscription) return state.error ? null : "basic";
  return subscription.status === "active" ? subscription.plan : "basic";
}

function formatPlanName(plan: BillingPlan) {
  return plan === "basic" ? "Free" : plan === "pro" ? "Pro" : "Premium";
}

function UpgradePage() {
  const { user, loading: authLoading } = useAuth();
  const subscriptionState = useSubscriptionOverview();
  const activePlan = user ? getActivePlan(subscriptionState) : null;
  const [checkoutPlan, setCheckoutPlan] = useState<UpgradePlan | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const checkoutLock = useRef(false);

  async function handleCheckout(plan: UpgradePlan) {
    if (checkoutLock.current) return;
    checkoutLock.current = true;
    setCheckoutPlan(plan);
    setCheckoutError(null);

    try {
      const checkout = await createCheckout({
        data: { plan, idempotencyKey: crypto.randomUUID() },
      });
      if (checkout.mode === "toyyibpay") {
        window.location.assign(checkout.checkoutUrl);
        return;
      }

      await simulateMockPayment({
        data: { paymentId: checkout.paymentId, outcome: "successful" },
      });
      window.dispatchEvent(new Event("academy:billing-updated"));
      setCheckoutPlan(null);
      checkoutLock.current = false;
    } catch (error) {
      console.error("[upgrade] checkout failed:", error);
      setCheckoutError(
        "Checkout is temporarily unavailable. Your plan was not changed. Please try again.",
      );
      setCheckoutPlan(null);
      checkoutLock.current = false;
    }
  }

  return (
    <AcademyPageShell className="max-w-[1160px]" rootClassName="upgrade-page">
      <UpgradeHero />

      <CurrentPlanCard
        user={user}
        authLoading={authLoading}
        state={subscriptionState}
        activePlan={activePlan}
      />

      <SocialTrustSection />

      <section id="pricing-plans" className="scroll-mt-24" aria-labelledby="plans-title">
        <h2 id="plans-title" className="sr-only">
          Choose your AcadeMY plan
        </h2>

        {checkoutError && (
          <div role="alert" className="upgrade-alert">
            <AlertCircle aria-hidden="true" />
            <span>{checkoutError}</span>
          </div>
        )}

        <div className="upgrade-plans-grid">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.key}
              plan={plan}
              activePlan={activePlan}
              authLoading={authLoading}
              user={user}
              busyPlan={checkoutPlan}
              onCheckout={handleCheckout}
            />
          ))}
        </div>

        <div className="upgrade-trust-strip" aria-label="Billing details">
          <TrustItem
            icon={<ShieldCheck />}
            title="Secure ToyyibPay checkout"
            text="Payment handled on a trusted checkout page"
          />
          <TrustItem
            icon={<CalendarDays />}
            title="Monthly billing · No refunds"
            text="Billed every month, cancel anytime"
          />
          <TrustItem
            icon={<CircleUserRound />}
            title="You stay in control"
            text="Manage or cancel from My Subscription"
          />
        </div>
      </section>

      <FeatureComparison />
      <FeedbackInvitation />
      <ReassuranceSection />

    </AcademyPageShell>
  );
}

function SocialTrustSection() {
  const trustItems = [
    {
      icon: BookOpenCheck,
      title: "KSSM-aligned learning",
      description: "Chapter-based tools designed around the Malaysian secondary school curriculum.",
    },
    {
      icon: CircleUserRound,
      title: "Parents stay informed",
      description:
        "Progress visibility, reports, and learning insight are built into the Premium plan.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Malaysian billing",
      description:
        "Clear MYR pricing with secure ToyyibPay checkout, visible terms, and no hidden plan fees.",
    },
  ];

  return (
    <section className="upgrade-social-proof" aria-labelledby="social-trust-title">
      <div className="upgrade-social-proof-head">
        <div>
          <p className="upgrade-eyebrow">Why families can trust AcadeMY</p>
          <h2 id="social-trust-title">Confidence before checkout</h2>
        </div>
        <p>
          Clear, verifiable information helps students and parents understand exactly what they are
          choosing.
        </p>
      </div>

      <div className="upgrade-social-proof-grid">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="upgrade-social-proof-item">
              <span className="upgrade-social-proof-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function UpgradeHero() {
  return (
    <header className="upgrade-hero">
      <div>
        <p className="upgrade-eyebrow">Choose your mission</p>
        <h1>
          Go further with <span>AcadeMY.</span>
        </h1>
        <p className="upgrade-hero-copy">
          Unlock every chapter, keep a complete learning record, and give parents a clear view of
          progress—all in one focused learning system.
        </p>
      </div>

      <div className="upgrade-billing-summary" aria-label="Billing summary">
        <span className="upgrade-billing-pill">Simple monthly billing</span>
        <p>
          Prices in Malaysian Ringgit
          <br />
          Cancel anytime from My Subscription
        </p>
      </div>
    </header>
  );
}


function CurrentPlanCard({
  user,
  authLoading,
  state,
  activePlan,
}: {
  user: AuthUser | null;
  authLoading: boolean;
  state: SubscriptionOverviewState;
  activePlan: BillingPlan | null;
}) {
  const isLoading = authLoading || (Boolean(user) && !state.resolved);
  const hasLoadError = Boolean(user && state.error && !state.overview);
  const displayPlan = activePlan ? formatPlanName(activePlan) : null;

  return (
    <section className="upgrade-current-plan" aria-labelledby="current-plan-title">
      <div className="upgrade-current-main">
        <div className="upgrade-current-icon" aria-hidden="true">
          {activePlan === "premium" ? (
            <Crown />
          ) : activePlan === "pro" ? (
            <Rocket />
          ) : (
            <BookOpenCheck />
          )}
        </div>
        <div>
          <h2 id="current-plan-title">
            {isLoading
              ? "Checking your plan…"
              : !user
                ? "Sign in to view your plan"
                : hasLoadError
                  ? "Plan status unavailable"
                  : `You’re currently on ${displayPlan}`}
          </h2>
          <p>
            {isLoading
              ? "Loading your real subscription status."
              : !user
                ? "Your subscription status is private to your AcadeMY account."
                : hasLoadError
                  ? state.error
                  : activePlan === "premium"
                    ? "Your Premium subscription is active, including parent-facing features."
                    : activePlan === "pro"
                      ? "Your Pro subscription is active with complete student learning access."
                      : "Free access remains active until you choose a paid mission."}
          </p>
        </div>
      </div>

      <div className="upgrade-current-action">
        {isLoading ? (
          <span className="upgrade-status-pill" aria-live="polite">
            <Loader2 className="upgrade-spinner" aria-hidden="true" />
            Loading
          </span>
        ) : !user ? (
          <Link to="/login" className="upgrade-compact-button upgrade-pressable">
            Sign in <ArrowRight aria-hidden="true" />
          </Link>
        ) : hasLoadError ? (
          <button
            type="button"
            onClick={() => void state.refresh()}
            disabled={state.loading}
            className="upgrade-compact-button upgrade-pressable"
          >
            Try again
          </button>
        ) : (
          <>
            <span className={`upgrade-status-pill ${activePlan === "basic" ? "" : "is-active"}`}>
              <CheckCircle2 aria-hidden="true" />
              {activePlan === "basic" ? "No active subscription" : "Active subscription"}
            </span>
            <Link to="/account/billing" className="upgrade-compact-button upgrade-pressable">
              Manage billing
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  activePlan,
  authLoading,
  user,
  busyPlan,
  onCheckout,
}: {
  plan: (typeof PRICING_PLANS)[number];
  activePlan: BillingPlan | null;
  authLoading: boolean;
  user: AuthUser | null;
  busyPlan: UpgradePlan | null;
  onCheckout: (plan: UpgradePlan) => Promise<void>;
}) {
  const featurePlan = FEATURE_PLAN[plan.key];
  const isPremium = plan.key === "premium";
  const displayPrice = plan.monthlyPrice;
  const selectedCheckoutPlan = toCheckoutPlan(plan.key);
  const featureLabels = PLAN_FEATURES[featurePlan]
    .filter((feature): feature is UpgradeFeature => feature in FEATURE_LABELS)
    .filter((feature) => !isPremium || feature.startsWith("parent_"))
    .map((feature) => FEATURE_LABELS[feature]);
  const isActive = activePlan === plan.key;
  const isThisLoading = busyPlan === selectedCheckoutPlan;
  const isAnyCheckoutLoading = busyPlan !== null;
  const planStatusUnknown = Boolean(user && activePlan === null);
  const Icon = plan.icon;

  return (
    <article
      className={`upgrade-price-card ${isPremium ? "is-premium" : ""} ${isActive ? "is-current" : ""}`}
      data-active={isActive ? "true" : "false"}
    >
      <div className="upgrade-card-header">
        <div>
          <p className="upgrade-plan-label">{plan.eyebrow}</p>
          <h3>{plan.name}</h3>
        </div>
        {isPremium && !isActive && <span className="upgrade-recommended">Recommended</span>}
        {isActive && (
          <span className="upgrade-current-badge">
            <Check aria-hidden="true" /> Current plan
          </span>
        )}
      </div>

      <div className="upgrade-plan-icon" aria-hidden="true">
        <Icon />
      </div>

      <p className="upgrade-plan-description">{plan.description}</p>

      <div className="upgrade-price">
        <span className="upgrade-currency">RM</span>
        <span className="upgrade-amount">{displayPrice}</span>
        <span className="upgrade-period">/ month</span>
      </div>
      <p className="upgrade-price-detail">Billed monthly · Cancel anytime</p>

      <p className="upgrade-benefit-title">
        {isPremium ? "Everything in Pro, plus" : "Everything you need to learn"}
      </p>
      <ul className="upgrade-benefits">
        {featureLabels.map((label) => (
          <li key={label}>
            <Check aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <div className="upgrade-card-action">
        {isActive ? (
          <button type="button" disabled className="upgrade-plan-button is-active-plan">
            <CheckCircle2 aria-hidden="true" /> Your active plan
          </button>
        ) : !authLoading && !user ? (
          <Link
            to="/login"
            className={`upgrade-plan-button upgrade-pressable ${isPremium ? "is-primary" : ""}`}
          >
            Sign in to choose {plan.name} <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => void onCheckout(selectedCheckoutPlan)}
            disabled={authLoading || isAnyCheckoutLoading || planStatusUnknown}
            aria-busy={isThisLoading}
            className={`upgrade-plan-button upgrade-pressable ${isPremium ? "is-primary" : ""}`}
          >
            {isThisLoading ? (
              <>
                <Loader2 className="upgrade-spinner" aria-hidden="true" />
                Opening secure checkout…
              </>
            ) : authLoading || planStatusUnknown ? (
              "Checking your plan…"
            ) : isAnyCheckoutLoading ? (
              "Checkout in progress"
            ) : (
              <>
                {activePlan === "premium" && plan.key === "pro"
                  ? "Switch to Pro"
                  : activePlan === "pro" && plan.key === "premium"
                    ? "Upgrade to Premium"
                    : `Choose ${plan.name}`}
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </button>
        )}
        {!isActive && (
          <p className="upgrade-refund-note">
            Payments are non-refundable once paid access is activated, except where required by
            applicable law. <Link to="/terms">View Terms</Link>
          </p>
        )}
      </div>
    </article>
  );
}

function TrustItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="upgrade-trust-item">
      <span aria-hidden="true">{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className="upgrade-section-heading">
      <div>
        <p className="upgrade-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function FeatureComparison() {
  const planColumns: Array<{ key: "basic" | PaidPlanKey; label: string; featurePlan: Plan }> = [
    { key: "basic", label: "Free", featurePlan: "basic" },
    { key: "pro", label: "Pro", featurePlan: "explorer" },
    { key: "premium", label: "Premium", featurePlan: "captain" },
  ];

  return (
    <section className="upgrade-section" aria-labelledby="comparison-title">
      <SectionHeading
        eyebrow="Compare access"
        title="One clear view of every plan"
        description="The detail stays available for careful comparison, without competing with the primary upgrade decision."
        id="comparison-title"
      />

      <div
        role="table"
        aria-label="Free, Pro, and Premium feature comparison"
        className="upgrade-comparison"
      >
        <div role="row" className="upgrade-comparison-head">
          <div role="columnheader">Feature</div>
          {planColumns.map((plan) => (
            <div key={plan.key} role="columnheader" data-plan={plan.key}>
              {plan.label}
            </div>
          ))}
        </div>

        <div>
          {COMPARISON_ROWS.map((row) => (
            <div key={row.label} role="row" className="upgrade-comparison-row">
              <div role="rowheader" className="upgrade-feature-name">
                <strong>{row.label}</strong>
                <span>{row.description}</span>
              </div>
              <div className="upgrade-mobile-values">
                {planColumns.map((plan) => {
                  const included = hasFeature(plan.featurePlan, row.feature);
                  const label =
                    plan.key === "basic" && row.basicPreview
                      ? row.basicPreview
                      : included
                        ? row.includedLabel
                        : "Not included";
                  return (
                    <div key={plan.key} role="cell" className="upgrade-comparison-cell">
                      <span className="upgrade-mobile-plan-label">{plan.label}</span>
                      <ComparisonValue
                        included={included}
                        preview={plan.key === "basic" && Boolean(row.basicPreview)}
                        label={label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonValue({
  included,
  preview,
  label,
}: {
  included: boolean;
  preview: boolean;
  label: string;
}) {
  if (preview) return <span className="upgrade-preview-value">{label}</span>;

  if (!included) {
    return (
      <span className="upgrade-not-included">
        <Minus aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  return (
    <span className="upgrade-included">
      <CheckCircle2 aria-hidden="true" />
      {label}
    </span>
  );
}

function FeedbackInvitation() {
  const feedbackEmail = `mailto:support@myacademy.my?subject=${encodeURIComponent(
    "My AcadeMY learning story",
  )}&body=${encodeURIComponent(
    "I am a student / parent:\n\nWhat I used in AcadeMY:\n\nHow it helped:\n\nMay AcadeMY contact me about sharing this feedback? Yes / No",
  )}`;

  const steps = [
    {
      icon: MessageSquareQuote,
      title: "Tell us what changed",
      description: "Share the feature, subject, or study moment that genuinely helped.",
    },
    {
      icon: BadgeCheck,
      title: "Real users only",
      description: "Stories must come from an AcadeMY student or parent—never generated samples.",
    },
    {
      icon: LockKeyhole,
      title: "Permission comes first",
      description: "Nothing is published without clear approval from you or a guardian.",
    },
  ];

  return (
    <section className="upgrade-section" aria-labelledby="feedback-title">
      <div className="upgrade-feedback">
        <div className="upgrade-feedback-intro">
          <span className="upgrade-feedback-icon" aria-hidden="true">
            <HeartHandshake />
          </span>
          <div>
            <p className="upgrade-eyebrow">Built with real feedback</p>
            <h2 id="feedback-title">Your experience could help another family.</h2>
            <p>
              Used AcadeMY for learning or keeping up with progress? Share an honest story. With your
              permission, selected feedback may appear here in the future.
            </p>
            <div className="upgrade-feedback-actions">
              <a href={feedbackEmail} className="upgrade-feedback-button upgrade-pressable">
                Share your feedback
                <ArrowRight aria-hidden="true" />
              </a>
              <Link to="/contact" className="upgrade-feedback-link">
                Contact the team
              </Link>
            </div>
          </div>
        </div>

        <div className="upgrade-feedback-steps" aria-label="How feedback is handled">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title}>
                <span aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReassuranceSection() {
  const items = [
    {
      question: "How is checkout handled?",
      answer:
        "AcadeMY opens ToyyibPay checkout for the selected monthly plan. Your subscription is activated only after the server verifies a successful payment.",
    },
    {
      question: "Can I cancel or request a refund?",
      answer:
        "You may cancel an active plan from My Subscription. Paid access ends immediately. Payments are non-refundable once access is activated, so cancellation does not provide a refund or credit for the current payment or unused time, except where required by applicable law.",
    },
    {
      question: "Where can I find my payment records?",
      answer:
        "Verified payments, status, references, and available invoice downloads appear in My Subscription while you are signed in.",
    },
    {
      question: "What happens if a payment is not completed?",
      answer:
        "Your subscription is not activated without a verified successful payment. Failed and cancelled attempts remain visible in payment history.",
    },
  ];

  return (
    <section className="upgrade-section" aria-labelledby="faq-title">
      <SectionHeading
        eyebrow="Before you launch"
        title="Clear answers, no fine print"
        description="These details reflect the payment and subscription behaviour currently implemented in AcadeMY."
        id="faq-title"
      />
      <div className="upgrade-faq-grid">
        {items.map((item) => (
          <details key={item.question} className="upgrade-faq">
            <summary className="upgrade-summary">
              {item.question}
              <ChevronDown aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

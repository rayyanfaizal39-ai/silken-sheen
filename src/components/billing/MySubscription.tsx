import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  Download,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  useSubscriptionOverview,
  type SubscriptionOverviewState,
} from "@/hooks/use-subscription-overview";
import type { BillingInterval, BillingPlan, PaymentHistoryItem } from "@/lib/billing.types";
import {
  cancelSubscription,
  getInvoiceDownloadUrl,
  resendInvoiceEmail,
} from "@/routes/-upgrade.server";

function formatDate(value: string | null | undefined) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

function planName(plan: BillingPlan) {
  if (plan === "premium") return "Premium";
  if (plan === "pro") return "Pro";
  return "Free";
}

function intervalName(interval: BillingInterval | null | undefined) {
  return interval === "annual" ? "Annual" : interval === "monthly" ? "Monthly" : "";
}

function maskEmail(email: string | undefined) {
  if (!email) return "Account email unavailable";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const visible = name.slice(0, Math.min(2, name.length));
  return `${visible}${"•".repeat(Math.max(3, name.length - visible.length))}@${domain}`;
}

function paymentMethodLabel(payment: PaymentHistoryItem | undefined) {
  if (!payment?.payment_method) return "Secure online payment";
  if (payment.payment_method.toLowerCase() === "mock") return "Development payment";
  return payment.payment_method;
}

function Notice({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: ReactNode;
}) {
  return (
    <div className={`billing-notice is-${tone}`} role={tone === "error" ? "alert" : "status"}>
      {tone === "success" ? <Check aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

export function MySubscription() {
  const { user, loading: authLoading } = useAuth();
  const state = useSubscriptionOverview();
  return <MySubscriptionContent state={state} user={user} authLoading={authLoading} />;
}

export function MySubscriptionContent({
  state,
  user,
  authLoading,
}: {
  state: SubscriptionOverviewState;
  user: ReturnType<typeof useAuth>["user"];
  authLoading: boolean;
}) {
  const { overview, loading, error: loadError, refresh } = state;
  const [action, setAction] = useState<"cancel" | "download" | "resend" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const subscription = overview?.subscription ?? null;
  const currentPlan = subscription?.status === "active" ? subscription.plan : "basic";
  const isActive = subscription?.status === "active";
  const latestSuccessfulPayment = useMemo(
    () => overview?.payments.find((payment) => payment.payment_status === "successful"),
    [overview?.payments],
  );
  const latestInvoiceNumber = latestSuccessfulPayment?.invoice?.invoice_number ?? null;
  const interval = subscription?.billing_interval;
  const intervalLabel = intervalName(interval);
  const priceSuffix = interval === "annual" ? "/ year" : interval === "monthly" ? "/ month" : "";

  function resetFeedback() {
    setActionError(null);
    setSuccess(null);
  }

  async function handleRefresh() {
    resetFeedback();
    await refresh();
  }

  async function handleCancel() {
    if (
      !window.confirm(
        "Cancel this subscription now? Paid access ends immediately. Payments already completed are non-refundable.",
      )
    )
      return;

    resetFeedback();
    setAction("cancel");
    try {
      await cancelSubscription();
      await refresh();
      setSuccess("Your subscription has been cancelled and future renewals have stopped.");
    } catch (error) {
      console.error("[billing] cancellation failed", error);
      setActionError("We couldn't cancel your subscription. Please try again or contact support.");
    } finally {
      setAction(null);
    }
  }

  async function handleDownload() {
    if (!latestInvoiceNumber) return;
    resetFeedback();
    setAction("download");
    try {
      const { url } = await getInvoiceDownloadUrl({
        data: { invoiceNumber: latestInvoiceNumber },
      });
      window.location.assign(url);
    } catch (error) {
      console.error("[billing] invoice download failed", error);
      setActionError("We couldn't prepare the latest receipt. Please try again.");
      setAction(null);
    }
  }

  async function handleResend() {
    if (!latestInvoiceNumber) return;
    resetFeedback();
    setAction("resend");
    try {
      await resendInvoiceEmail({
        data: { invoiceNumber: latestInvoiceNumber, requestId: crypto.randomUUID() },
      });
      setSuccess(`The latest receipt was sent to ${user?.email ?? "your account email"}.`);
    } catch (error) {
      console.error("[billing] invoice resend failed", error);
      setActionError("We couldn't resend the receipt. Please try again or contact support.");
    } finally {
      setAction(null);
    }
  }

  if (authLoading) {
    return (
      <div className="billing-loading" aria-live="polite">
        <Loader2 aria-hidden="true" />
        <span>Checking your account…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="billing-sign-in" aria-labelledby="billing-sign-in-title">
        <ShieldCheck aria-hidden="true" />
        <p className="billing-eyebrow">Private account details</p>
        <h2 id="billing-sign-in-title">Sign in to view your billing</h2>
        <p>Your plan, receipts, and cancellation controls are only visible inside your account.</p>
        <Link to="/login" className="billing-button is-primary">
          Sign in to continue
        </Link>
      </section>
    );
  }

  if (loading && !overview) {
    return (
      <div className="billing-loading" aria-live="polite">
        <Loader2 aria-hidden="true" />
        <span>Loading your subscription…</span>
      </div>
    );
  }

  return (
    <>
      <div className="billing-feedback" aria-live="polite">
        {(actionError ?? loadError) && <Notice tone="error">{actionError ?? loadError}</Notice>}
        {success && <Notice tone="success">{success}</Notice>}
      </div>

      <div className="billing-layout">
        <section className="billing-card billing-plan-card" aria-labelledby="billing-plan-title">
          <div className="billing-card-head">
            <div>
              <p className="billing-label">Current plan</p>
              <h2 id="billing-plan-title">
                {planName(currentPlan)} {intervalLabel}
              </h2>
            </div>
            <span className={`billing-status ${isActive ? "is-active" : ""}`}>
              {isActive ? "Active" : "Free plan"}
            </span>
          </div>

          <div className="billing-plan-body">
            <div className="billing-price-row">
              <div className="billing-price">
                <strong>
                  {subscription
                    ? formatMoney(subscription.amount, subscription.currency)
                    : "RM0"}
                </strong>
                <span>{priceSuffix}</span>
              </div>
              <p>
                {interval === "annual"
                  ? "One payment for 12 months"
                  : interval === "monthly"
                    ? "Flexible monthly access"
                    : "Upgrade whenever you're ready"}
              </p>
            </div>

            <dl className="billing-details">
              <div>
                <dt>{isActive ? "Renewal / expiry" : "Plan status"}</dt>
                <dd>{isActive ? formatDate(subscription?.current_period_end) : "No paid plan"}</dd>
                <small>{isActive ? "Your current paid period" : "Free access stays available"}</small>
              </div>
              <div>
                <dt>Payment method</dt>
                <dd>{paymentMethodLabel(latestSuccessfulPayment)}</dd>
                <small>Processed securely by ToyyibPay</small>
              </div>
              <div>
                <dt>Billing cycle</dt>
                <dd>{intervalLabel ? `${intervalLabel} billing` : "Not applicable"}</dd>
                <small>
                  {interval === "annual" ? "One payment per year" : "One payment per month"}
                </small>
              </div>
              <div>
                <dt>Latest payment</dt>
                <dd>
                  {latestSuccessfulPayment
                    ? `${formatMoney(
                        latestSuccessfulPayment.amount,
                        latestSuccessfulPayment.currency,
                      )} · Paid`
                    : "No payment yet"}
                </dd>
                <small>
                  {latestSuccessfulPayment
                    ? formatDate(latestSuccessfulPayment.paid_at)
                    : "Receipts appear after successful payment"}
                </small>
              </div>
            </dl>

            <div className="billing-actions">
              {latestInvoiceNumber ? (
                <button
                  type="button"
                  className="billing-button is-primary"
                  onClick={() => void handleResend()}
                  disabled={action !== null}
                >
                  {action === "resend" ? (
                    <Loader2 className="billing-spinner" aria-hidden="true" />
                  ) : (
                    <Mail aria-hidden="true" />
                  )}
                  Resend latest receipt
                </button>
              ) : (
                <Link to="/upgrade" className="billing-button is-primary">
                  View paid plans
                </Link>
              )}
              {latestInvoiceNumber ? (
                <button
                  type="button"
                  className="billing-button"
                  onClick={() => void handleDownload()}
                  disabled={action !== null}
                >
                  {action === "download" ? (
                    <Loader2 className="billing-spinner" aria-hidden="true" />
                  ) : (
                    <Download aria-hidden="true" />
                  )}
                  Download receipt
                </button>
              ) : (
                <button
                  type="button"
                  className="billing-button"
                  onClick={() => void handleRefresh()}
                  disabled={loading}
                >
                  <RefreshCw className={loading ? "billing-spinner" : ""} aria-hidden="true" />
                  Refresh status
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="billing-side-stack">
          <section className="billing-card">
            <div className="billing-compact-head">
              <p className="billing-label">Receipts</p>
              <h2>Delivered by email</h2>
            </div>
            <div className="billing-email-body">
              <div className="billing-email-line">
                <span className="billing-icon-box">
                  <Mail aria-hidden="true" />
                </span>
                <div>
                  <strong>{maskEmail(user.email)}</strong>
                  <span>Account email</span>
                </div>
              </div>
              <p>
                Every successful payment includes a detailed receipt. You can resend or download the
                latest one here.
              </p>
              <a
                className="billing-button"
                href={`mailto:admin@myacademy.my?subject=${encodeURIComponent("Update my AcadeMY billing email")}`}
              >
                Update billing email
              </a>
            </div>
          </section>

          <section className="billing-card billing-support">
            <p className="billing-label">Need help?</p>
            <h2>Billing support</h2>
            <p>Questions about a payment or plan? Our support team can review it with you.</p>
            <a href="mailto:admin@myacademy.my">Contact support</a>
          </section>
        </div>
      </div>

      {overview?.mockPaymentsEnabled && (
        <div className="billing-dev-note">
          Development payment mode is active. Live customers will use secure ToyyibPay checkout.
        </div>
      )}

      {isActive && (
        <section className="billing-card billing-danger" aria-labelledby="billing-cancel-title">
          <div>
            <p className="billing-label">Subscription settings</p>
            <h2 id="billing-cancel-title">Cancel subscription</h2>
            <p>
              Cancellation stops future renewals and paid access ends immediately. Your free AcadeMY
              access remains available.
            </p>
            <div className="billing-refund-note">
              <strong>No-refund policy:</strong> payments already completed are non-refundable.
              Cancellation does not provide a refund or credit for the current payment or unused
              time, except where required by applicable law.
            </div>
          </div>
          <button
            type="button"
            className="billing-button is-danger"
            onClick={() => void handleCancel()}
            disabled={action !== null}
          >
            {action === "cancel" && <Loader2 className="billing-spinner" aria-hidden="true" />}
            Cancel subscription
          </button>
        </section>
      )}
    </>
  );
}

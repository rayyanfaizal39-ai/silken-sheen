import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/auth-context";
import type {
  CheckoutPlan,
  MockPaymentOutcome,
  SubscriptionOverview,
} from "../../lib/billing.types";
import {
  cancelSubscription,
  createCheckout,
  getInvoiceDownloadUrl,
  getSubscriptionOverview,
  simulateMockPayment,
} from "../../routes/-upgrade.server";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-MY", { style: "currency", currency }).format(amount);
}

function StatusPill({ status }: { status: string }) {
  const success = status === "active" || status === "successful";
  const pending = status === "pending";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
        success
          ? "bg-emerald-500/15 text-emerald-300"
          : pending
            ? "bg-amber-500/15 text-amber-300"
            : "bg-white/[0.07] text-white/60"
      }`}
    >
      {success && <CheckCircle2 className="h-3.5 w-3.5" />}
      {status}
    </span>
  );
}

export function MySubscription() {
  const { user, loading: authLoading } = useAuth();
  const [overview, setOverview] = useState<SubscriptionOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setOverview(await getSubscriptionOverview());
    } catch (loadError) {
      console.error("[billing] subscription overview failed", loadError);
      setError("We couldn't load your subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
    const refresh = () => void load();
    window.addEventListener("academy:billing-updated", refresh);
    return () => window.removeEventListener("academy:billing-updated", refresh);
  }, [load]);

  if (authLoading) return null;
  if (!user) {
    return (
      <section className="mx-auto mt-14 max-w-6xl" aria-labelledby="my-subscription-title">
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-7 text-center backdrop-blur-2xl sm:p-10">
          <ShieldCheck className="mx-auto h-8 w-8 text-[#A78BFA]" />
          <h2
            id="my-subscription-title"
            className="mt-3 font-display text-2xl font-bold text-white"
          >
            My Subscription
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Sign in to view your plan, payments, and invoices.
          </p>
        </div>
      </section>
    );
  }

  async function runMock(plan: CheckoutPlan, outcome: MockPaymentOutcome) {
    setAction(`mock-${outcome}`);
    setError(null);
    try {
      const checkout = await createCheckout({
        data: { plan, idempotencyKey: crypto.randomUUID() },
      });
      if (checkout.mode !== "mock") throw new Error("Mock checkout is unavailable");
      await simulateMockPayment({ data: { paymentId: checkout.paymentId, outcome } });
      await load();
    } catch (mockError) {
      console.error("[billing] mock payment failed", mockError);
      setError("The mock payment could not be completed.");
    } finally {
      setAction(null);
    }
  }

  async function handleCancel() {
    if (
      !window.confirm("Cancel this subscription now? Access to paid features will end immediately.")
    )
      return;
    setAction("cancel");
    setError(null);
    try {
      await cancelSubscription();
      await load();
    } catch (cancelError) {
      console.error("[billing] cancellation failed", cancelError);
      setError("The subscription could not be cancelled. Please try again.");
    } finally {
      setAction(null);
    }
  }

  async function downloadInvoice(invoiceId: string) {
    setAction(`invoice-${invoiceId}`);
    try {
      const { url } = await getInvoiceDownloadUrl({ data: { invoiceId } });
      window.location.assign(url);
    } catch (downloadError) {
      console.error("[billing] invoice download failed", downloadError);
      setError("The invoice download link could not be created.");
    } finally {
      setAction(null);
    }
  }

  const subscription = overview?.subscription;
  const currentPlan = subscription?.plan ?? "basic";
  const isActive = subscription?.status === "active";

  return (
    <section className="mx-auto mt-14 max-w-6xl" aria-labelledby="my-subscription-title">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
            Account & billing
          </p>
          <h2
            id="my-subscription-title"
            className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            My Subscription
          </h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Manage your plan and keep every payment record in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {loading && !overview ? (
        <div
          className="flex min-h-52 items-center justify-center rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62"
          aria-live="polite"
        >
          <Loader2 className="h-6 w-6 animate-spin text-[#A78BFA]" />
          <span className="ml-3 text-sm text-white/70">Loading subscription…</span>
        </div>
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/45">
                    Current plan
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold capitalize text-white">
                    {currentPlan}
                  </p>
                  <div className="mt-3">
                    <StatusPill status={subscription?.status ?? "active"} />
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 p-3 text-[#C4B5FD]">
                  <CreditCard className="h-7 w-7" />
                </div>
              </div>
              <dl className="mt-7 grid gap-4 border-t border-white/[0.07] pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-white/45">Started</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {formatDate(subscription?.started_at ?? null)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-white/45">Renewal / expiry</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {formatDate(subscription?.current_period_end ?? null)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-white/45">Amount paid</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {subscription
                      ? formatMoney(subscription.amount, subscription.currency)
                      : "RM0.00"}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {currentPlan !== "premium" && (
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("pricing-plans")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex min-h-11 items-center rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 text-sm font-bold text-white"
                  >
                    Upgrade
                  </button>
                )}
                {currentPlan === "premium" && (
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("pricing-plans")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex min-h-11 items-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 text-sm font-semibold text-white hover:bg-white/[0.08]"
                  >
                    Downgrade
                  </button>
                )}
                {isActive && (
                  <button
                    type="button"
                    onClick={() => void handleCancel()}
                    disabled={action === "cancel"}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-4 text-sm font-semibold text-red-200 hover:bg-red-500/15 disabled:opacity-50"
                  >
                    {action === "cancel" && <Loader2 className="h-4 w-4 animate-spin" />} Cancel
                    subscription
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl sm:p-7">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#A78BFA]" />
                <h3 className="font-display text-lg font-bold text-white">Billing details</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
                Invoices are generated only after a payment is verified. PDFs are stored privately
                and download links expire after 60 seconds.
              </p>
              <div className="mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] p-4 text-sm text-emerald-200">
                <span className="font-bold">Secure by default.</span> Payment and invoice records
                cannot be created or marked paid from the browser.
              </div>
            </div>
          </div>

          {overview?.mockPaymentsEnabled && (
            <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] p-5">
              <p className="font-bold text-amber-200">Development mock payments</p>
              <p className="mt-1 text-xs text-amber-100/70">
                Sandbox controls are server-blocked in production.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(["successful", "failed", "cancelled"] as MockPaymentOutcome[]).map((outcome) => (
                  <button
                    key={outcome}
                    type="button"
                    disabled={action !== null}
                    onClick={() => void runMock("pro_monthly", outcome)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/20 bg-black/10 px-4 text-sm font-semibold capitalize text-amber-100 hover:bg-black/20 disabled:opacity-50"
                  >
                    {action === `mock-${outcome}` && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                    Simulate {outcome}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 backdrop-blur-2xl">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-6 py-5">
              <FileText className="h-5 w-5 text-[#A78BFA]" />
              <h3 className="font-display text-lg font-bold text-white">Payment history</h3>
            </div>
            {!overview?.payments.length ? (
              <div className="px-6 py-12 text-center">
                <CreditCard className="mx-auto h-8 w-8 text-white/25" />
                <p className="mt-3 font-semibold text-white/75">No payments yet</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Successful and unsuccessful payment attempts will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-white/[0.025] text-xs uppercase tracking-wider text-white/45">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Plan</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Reference</th>
                      <th className="px-6 py-3 text-right font-semibold">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {overview.payments.map((payment) => (
                      <tr key={payment.id} className="text-sm text-white/80">
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatDate(payment.paid_at ?? payment.created_at)}
                        </td>
                        <td className="px-4 py-4 capitalize">
                          {payment.plan}{" "}
                          <span className="text-white/40">· {payment.billing_interval}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold tabular-nums">
                          {formatMoney(payment.amount, payment.currency)}
                        </td>
                        <td className="px-4 py-4">
                          <StatusPill status={payment.payment_status} />
                        </td>
                        <td className="max-w-44 truncate px-4 py-4 font-mono text-xs text-white/50">
                          {payment.provider_transaction_id ?? "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {payment.invoice ? (
                            <button
                              type="button"
                              onClick={() => void downloadInvoice(payment.invoice!.id)}
                              disabled={action === `invoice-${payment.invoice.id}`}
                              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.1] px-3 text-xs font-bold text-white hover:bg-white/[0.06] disabled:opacity-50"
                            >
                              <Download className="h-4 w-4" /> Download
                            </button>
                          ) : (
                            <span className="text-xs text-white/30">Not available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

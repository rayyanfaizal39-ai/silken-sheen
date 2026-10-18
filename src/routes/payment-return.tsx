import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useAuth } from "@/context/auth-context";
import { seoMeta } from "@/lib/seo";
import { getPaymentReturnStatus } from "./-upgrade.server";
import { finishCheckoutAttempt } from "@/lib/checkout-attempt";

type ReturnStatus = Awaited<ReturnType<typeof getPaymentReturnStatus>>;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const Route = createFileRoute("/payment-return")({
  validateSearch: (search: Record<string, unknown>) => ({
    order_id: typeof search.order_id === "string" ? search.order_id : "",
  }),
  head: () =>
    seoMeta({
      title: "Payment Status",
      description: "Check the status of your AcadeMY subscription payment.",
      path: "/payment-return",
      noindex: true,
    }),
  component: PaymentReturnPage,
});

function PaymentReturnPage() {
  const { order_id: paymentId } = Route.useSearch();
  const { user, loading: authLoading } = useAuth();
  const [result, setResult] = useState<ReturnStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const validReference = uuidPattern.test(paymentId);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !validReference) {
      setLoading(false);
      return;
    }

    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;
    async function refresh() {
      let next: ReturnStatus;
      try {
        next = await getPaymentReturnStatus({ data: { paymentId } });
      } catch {
        next = { state: "unavailable" };
      }
      if (!active) return;
      if (user && next.state === "found" && next.status !== "pending") {
        try {
          finishCheckoutAttempt(window.sessionStorage, user.id, next.paymentId);
        } catch {
          /* Status display must not depend on browser storage. */
        }
      }
      setResult(next);
      setLoading(false);
      if (next.state === "found" && next.status === "pending" && attempt < 8) {
        attempt += 1;
        timer = setTimeout(refresh, 2500);
      }
    }
    void refresh();
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [authLoading, paymentId, user, validReference]);

  if (authLoading || loading) {
    return (
      <StatusShell
        icon={<Loader2 className="h-12 w-12 animate-spin text-[#A78BFA]" />}
        title="Confirming your payment"
        body="We’re securely checking the payment with ToyyibPay. This can take a few moments."
      />
    );
  }
  if (!user || result?.state === "signed_out") {
    return (
      <StatusShell
        icon={<Clock3 className="h-12 w-12 text-amber-300" />}
        title="Sign in to check your payment"
        body="Payment details are private and can only be viewed by the account that started checkout. Your payment is not affected."
        action={<LinkButton to="/login" label="Sign in" />}
      />
    );
  }
  if (!validReference) {
    return (
      <StatusShell
        icon={<XCircle className="h-12 w-12 text-red-300" />}
        title="Payment reference not found"
        body="The return link did not include a valid AcadeMY payment reference."
        action={<LinkButton to="/upgrade" label="Back to pricing" />}
      />
    );
  }
  if (result?.state === "not_found") {
    return (
      <StatusShell
        icon={<XCircle className="h-12 w-12 text-red-300" />}
        title="This payment isn’t in this account"
        body={`You’re signed in as ${user.email || "a different account"}. Sign in with the account that paid to see this payment. Your payment is not affected.`}
        action={<LinkButton to="/login" label="Sign in with another account" />}
      />
    );
  }
  if (!result || result.state !== "found") {
    return (
      <StatusShell
        icon={<Clock3 className="h-12 w-12 text-amber-300" />}
        title="We couldn’t check your payment just now"
        body="Your payment is safe. Refresh this page in a moment, or check My Subscription."
        action={<LinkButton to="/upgrade" label="View My Subscription" />}
      />
    );
  }
  const payment = result;
  if (payment.status === "successful") {
    return (
      <StatusShell
        icon={<CheckCircle2 className="h-12 w-12 text-emerald-300" />}
        title="Payment successful"
        body={`Your ${payment.plan} subscription is active. ${
          payment.invoiceNumber
            ? `Invoice ${payment.invoiceNumber} is available in My Subscription.`
            : "Your invoice is being prepared."
        }`}
        action={<LinkButton to="/dashboard" label="Continue to dashboard" />}
      />
    );
  }
  if (payment.status === "failed" || payment.status === "cancelled") {
    return (
      <StatusShell
        icon={<XCircle className="h-12 w-12 text-red-300" />}
        title="Payment was not completed"
        body="Your subscription was not changed and no successful payment was recorded."
        action={<LinkButton to="/upgrade" label="Try again" />}
      />
    );
  }
  return (
    <StatusShell
      icon={<Clock3 className="h-12 w-12 text-amber-300" />}
      title="Payment confirmation is pending"
      body="ToyyibPay has not confirmed the payment yet. Your subscription will activate automatically after secure server verification."
      action={<LinkButton to="/upgrade" label="View My Subscription" />}
    />
  );
}

function StatusShell({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <AcademyPageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center">
        <section className="w-full rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/75 p-8 text-center shadow-[0_24px_80px_rgba(2,6,23,.45)] backdrop-blur-2xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.05]">
            {icon}
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-white">{title}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">{body}</p>
          {action && <div className="mt-7">{action}</div>}
        </section>
      </div>
    </AcademyPageShell>
  );
}

function LinkButton({ to, label }: { to: "/dashboard" | "/login" | "/upgrade"; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.35)]"
    >
      {label}
    </Link>
  );
}

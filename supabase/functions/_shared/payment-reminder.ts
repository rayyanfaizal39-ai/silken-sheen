import { escapeHtml, formatMoney, renderEmailLayout, type EmailContent } from "./email-brand.ts";
import { kualaLumpurDateKey } from "./weekly-parent-report.ts";

const KL_OFFSET_MS = 8 * 60 * 60 * 1000;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Student signs in here and continues through the existing ToyyibPay checkout. */
export const SUBSCRIPTION_RENEWAL_URL = "https://www.myacademy.my/upgrade";

export const PAYMENT_REMINDER_TYPES = ["7_days", "1_day", "due_day"] as const;
export type PaymentReminderType = (typeof PAYMENT_REMINDER_TYPES)[number];

export function paymentReminderQueryWindow(now: Date): { startIso: string; endIso: string } {
  const start = startOfKualaLumpurDate(kualaLumpurDateKey(now));
  return {
    startIso: new Date(start).toISOString(),
    endIso: new Date(start + 8 * 86_400_000).toISOString(),
  };
}

/**
 * Calendar days from `now` to `periodEnd` in Asia/Kuala_Lumpur.
 * 7, 1, and 0 are the only reminder days. Every other offset is skipped.
 */
export function paymentReminderTypeFor(periodEnd: Date, now: Date): PaymentReminderType | null {
  if (Number.isNaN(periodEnd.getTime())) return null;
  const days = daysBetweenDateKeys(kualaLumpurDateKey(now), kualaLumpurDateKey(periodEnd));
  if (days === 7) return "7_days";
  if (days === 1) return "1_day";
  if (days === 0) return "due_day";
  return null;
}

export function formatKualaLumpurLongDate(instant: Date): string {
  const [year, month, day] = kualaLumpurDateKey(instant).split("-").map(Number);
  return `${day} ${MONTHS[month - 1] ?? ""} ${year}`.trim();
}

export function paymentReminderSubject(studentName: string, type: PaymentReminderType): string {
  const name = oneLine(studentName) || "Student";
  if (type === "7_days") return `${name} — AcadeMY subscription renews in 7 days`;
  if (type === "1_day") return `${name} — AcadeMY subscription renews tomorrow`;
  return `${name} — AcadeMY subscription renews today`;
}

export function paymentReminderIdempotencyKey(
  subscriptionId: string,
  periodEnd: string,
  type: PaymentReminderType,
): string {
  return `academy-payment-reminder-${subscriptionId}-${periodEnd}-${type}`.slice(0, 256);
}

export type PaymentReminderEmailInput = {
  reminderType: PaymentReminderType;
  studentName: string;
  plan: string;
  billingInterval: string | null;
  amount: number;
  currency: string;
  periodEnd: Date;
  sentToParent: boolean;
};

export function buildPaymentReminderEmail(input: PaymentReminderEmailInput): EmailContent {
  const studentName = oneLine(input.studentName) || "Student";
  const renewsOn = formatKualaLumpurLongDate(input.periodEnd);
  const subject = paymentReminderSubject(studentName, input.reminderType);
  const planLabel = displayToken(input.plan);
  const intervalLabel = input.billingInterval ? displayToken(input.billingInterval) : "";
  const amountLabel = formatReminderAmount(input.amount, input.currency);
  const timing =
    input.reminderType === "7_days"
      ? "The current paid period ends in 7 days."
      : input.reminderType === "1_day"
        ? "The current paid period ends tomorrow."
        : "The current paid period ends today.";
  const intro = input.sentToParent
    ? `${studentName}'s AcadeMY subscription reaches the end of its current paid period on ${renewsOn}. ${timing}`
    : `Hi ${studentName}, your AcadeMY subscription reaches the end of its current paid period on ${renewsOn}. ${timing}`;
  const title =
    input.reminderType === "7_days"
      ? "Seven days left on this paid period."
      : input.reminderType === "1_day"
        ? "This paid period ends tomorrow."
        : "This paid period ends today.";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:14px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#9299b1">${escapeHtml(label)}</td><td align="right" style="padding:14px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:#f8fafc">${escapeHtml(value)}</td></tr>`;
  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:26px 0;border-collapse:separate;border-spacing:0;border:1px solid #29304d;border-radius:14px;background:#0f152a">
    ${row("Student", studentName)}
    ${row("Plan", intervalLabel ? `${planLabel} · ${intervalLabel}` : planLabel)}
    ${row("Amount", amountLabel)}
    ${row("Paid period ends", `${renewsOn} (Malaysia time)`)}
  </table>
  <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#d6d9e7">Sign in on AcadeMY and continue to secure ToyyibPay checkout. Renewing extends the paid period from the date the payment is verified.</p>`;

  return {
    subject,
    html: renderEmailLayout({
      preheader: `${studentName}'s paid period ends on ${renewsOn}.`,
      eyebrow: "Subscription reminder",
      title,
      intro,
      content,
      cta: { label: "Renew on AcadeMY", url: SUBSCRIPTION_RENEWAL_URL },
      outro: "If this period was already renewed, you can ignore this reminder.",
    }),
    text: [
      subject,
      "",
      intro,
      `Student: ${studentName}`,
      `Plan: ${intervalLabel ? `${planLabel} · ${intervalLabel}` : planLabel}`,
      `Amount: ${amountLabel}`,
      `Paid period ends: ${renewsOn} (Malaysia time)`,
      "",
      "Sign in on AcadeMY and continue to secure ToyyibPay checkout.",
      `Renew: ${SUBSCRIPTION_RENEWAL_URL}`,
      "",
      "If this period was already renewed, you can ignore this reminder.",
    ].join("\n"),
  };
}

function formatReminderAmount(amount: number, currency: string): string {
  if (!Number.isFinite(amount)) return currency || "MYR";
  return formatMoney(amount, currency || "MYR");
}

function displayToken(value: string): string {
  const trimmed = oneLine(value);
  if (!trimmed) return "Subscription";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function startOfKualaLumpurDate(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Date.UTC(year, month - 1, day) - KL_OFFSET_MS;
}

function daysBetweenDateKeys(startKey: string, endKey: string): number {
  const [startYear, startMonth, startDay] = startKey.split("-").map(Number);
  const [endYear, endMonth, endDay] = endKey.split("-").map(Number);
  const start = Date.UTC(startYear, startMonth - 1, startDay);
  const end = Date.UTC(endYear, endMonth - 1, endDay);
  return Math.round((end - start) / 86_400_000);
}

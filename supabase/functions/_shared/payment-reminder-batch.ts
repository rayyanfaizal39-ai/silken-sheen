import { claimDeliverySlot, type ClaimOutcome } from "./delivery-claim.ts";
import { maskEmailAddress, type EmailContent } from "./email-brand.ts";
import {
  buildPaymentReminderEmail,
  paymentReminderChoice,
  paymentReminderIdempotencyKey,
  subscriptionInReminderWindow,
  type PaymentReminderType,
} from "./payment-reminder.ts";
import { usableEmail } from "./weekly-parent-report.ts";

export type PaymentReminderCandidate = {
  subscriptionId: string;
  userId: string;
  status: string;
  plan: string;
  billingInterval: string | null;
  amount: number;
  currency: string;
  periodEnd: string;
  studentName: string | null;
  accountEmail: string | null;
  /** Reminder types already marked sent for this subscription and period end. */
  sentTypes: readonly string[];
};

export type PaymentReminderStore = {
  candidates(now: Date): Promise<PaymentReminderCandidate[]>;
  claim(
    candidate: PaymentReminderCandidate,
    reminderType: PaymentReminderType,
    recipient: string,
  ): Promise<ClaimOutcome>;
  markSent(
    candidate: PaymentReminderCandidate,
    reminderType: PaymentReminderType,
    messageId: string,
  ): Promise<void>;
  markFailed(
    candidate: PaymentReminderCandidate,
    reminderType: PaymentReminderType,
    message: string,
  ): Promise<void>;
};

export type SendPaymentReminder = (input: {
  to: string;
  content: EmailContent;
  idempotencyKey: string;
  reminderType: PaymentReminderType;
}) => Promise<{ id: string }>;

export async function runPaymentReminderBatch(
  store: PaymentReminderStore,
  send: SendPaymentReminder,
  options: { dryRun: boolean; now?: Date },
): Promise<Record<string, unknown>> {
  const now = options.now ?? new Date();
  const counts = {
    checked: 0,
    due: 0,
    sent: 0,
    failed: 0,
    noRecipient: 0,
    wouldSend: 0,
    alreadySent: 0,
    lostRace: 0,
  };
  const recipients: Array<{
    maskedEmail: string;
    subject: string;
    reminderType: PaymentReminderType;
  }> = [];
  const seen = new Set<string>();
  const candidates = await store.candidates(now);
  counts.checked = candidates.length;

  for (const candidate of candidates) {
    if (seen.has(candidate.subscriptionId)) continue;
    seen.add(candidate.subscriptionId);

    const periodEnd = new Date(candidate.periodEnd);
    if (!subscriptionInReminderWindow(candidate.status, periodEnd, now)) continue;
    const reminderType = paymentReminderChoice(periodEnd, now, candidate.sentTypes);
    if (!reminderType) {
      counts.alreadySent += 1;
      continue;
    }
    counts.due += 1;

    const recipient = usableEmail(candidate.accountEmail);
    if (!recipient) {
      counts.noRecipient += 1;
      continue;
    }
    const content = buildPaymentReminderEmail({
      reminderType,
      studentName: candidate.studentName?.trim() || "Student",
      plan: candidate.plan,
      billingInterval: candidate.billingInterval,
      amount: candidate.amount,
      currency: candidate.currency || "MYR",
      periodEnd,
    });
    if (options.dryRun) {
      counts.wouldSend += 1;
      recipients.push({
        maskedEmail: maskEmailAddress(recipient),
        subject: content.subject,
        reminderType,
      });
      continue;
    }

    const claim = await store.claim(candidate, reminderType, recipient);
    if (claim === "lost") {
      counts.lostRace += 1;
      continue;
    }
    if (claim !== "claimed") {
      counts.failed += 1;
      continue;
    }
    try {
      const delivery = await send({
        to: recipient,
        content,
        reminderType,
        idempotencyKey: paymentReminderIdempotencyKey(
          candidate.subscriptionId,
          candidate.periodEnd,
          reminderType,
        ),
      });
      await store.markSent(candidate, reminderType, delivery.id);
      counts.sent += 1;
    } catch (error) {
      const message =
        error instanceof Error ? error.message.slice(0, 200) : "Email delivery failed";
      await store.markFailed(candidate, reminderType, message);
      counts.failed += 1;
    }
  }

  return {
    dryRun: options.dryRun,
    checked: counts.checked,
    due: counts.due,
    wouldSend: options.dryRun ? counts.wouldSend : counts.sent,
    alreadySent: counts.alreadySent + counts.lostRace,
    noRecipient: counts.noRecipient,
    failed: counts.failed,
    lostRace: counts.lostRace,
    ...(options.dryRun ? { recipients } : {}),
  };
}

export { claimDeliverySlot };

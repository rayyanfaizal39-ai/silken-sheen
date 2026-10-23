import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { maskEmailAddress } from "../../../supabase/functions/_shared/email-brand";
import {
  SUBSCRIPTION_RENEWAL_URL,
  buildPaymentReminderEmail,
  paymentReminderQueryWindow,
  paymentReminderSubject,
  paymentReminderTypeFor,
} from "../../../supabase/functions/_shared/payment-reminder";

const now = new Date("2026-10-23T01:00:00.000Z");

describe("payment reminder schedule", () => {
  it("selects 7 days, 1 day, and the due day in Malaysia time", () => {
    expect(paymentReminderTypeFor(new Date("2026-10-30T15:59:59.000Z"), now)).toBe("7_days");
    expect(paymentReminderTypeFor(new Date("2026-10-29T16:00:00.000Z"), now)).toBe("7_days");
    expect(paymentReminderTypeFor(new Date("2026-10-24T10:00:00.000Z"), now)).toBe("1_day");
    expect(paymentReminderTypeFor(new Date("2026-10-23T15:59:59.000Z"), now)).toBe("due_day");
    expect(paymentReminderTypeFor(new Date("2026-10-22T16:00:00.000Z"), now)).toBe("due_day");
  });

  it("skips offsets that are not a reminder day, including the Malaysia midnight boundary", () => {
    expect(paymentReminderTypeFor(new Date("2026-10-29T15:59:59.000Z"), now)).toBeNull();
    expect(paymentReminderTypeFor(new Date("2026-10-30T16:00:00.000Z"), now)).toBeNull();
    expect(paymentReminderTypeFor(new Date("2026-10-22T15:59:59.000Z"), now)).toBeNull();
    expect(paymentReminderTypeFor(new Date("2026-10-25T01:00:00.000Z"), now)).toBeNull();
  });

  it("queries from the start of today through the end of the seventh day", () => {
    expect(paymentReminderQueryWindow(now)).toEqual({
      startIso: "2026-10-22T16:00:00.000Z",
      endIso: "2026-10-30T16:00:00.000Z",
    });
  });
});

describe("payment reminder email", () => {
  const email = buildPaymentReminderEmail({
    reminderType: "1_day",
    studentName: "Alya <script>",
    plan: "premium",
    billingInterval: "monthly",
    amount: 59,
    currency: "MYR",
    periodEnd: new Date("2026-10-24T02:00:00.000Z"),
    sentToParent: true,
  });

  it("uses the shared brand, the renewal page, and escaped student data", () => {
    expect(email.subject).toBe(paymentReminderSubject("Alya <script>", "1_day"));
    expect(email.html).toContain("#050816");
    expect(email.html).toContain("#f5c518");
    expect(email.html).toContain(SUBSCRIPTION_RENEWAL_URL);
    expect(email.html).toContain("Alya &lt;script&gt;");
    expect(email.html).not.toContain("Alya <script>");
    expect(email.html).toContain("ToyyibPay");
    expect(email.text).toContain(SUBSCRIPTION_RENEWAL_URL);
    expect(email.text).toContain("24 October 2026");
  });

  it("changes the subject for each reminder day", () => {
    expect(paymentReminderSubject("Alya", "7_days")).toContain("in 7 days");
    expect(paymentReminderSubject("Alya", "1_day")).toContain("tomorrow");
    expect(paymentReminderSubject("Alya", "due_day")).toContain("today");
  });

  it("masks dry-run addresses without keeping the full local part or domain", () => {
    expect(maskEmailAddress("Parent.Name@Example.com")).toBe("p***@e***.com");
    expect(maskEmailAddress("a@myacademy.my")).toBe("a***@m***.my");
    expect(maskEmailAddress("not-an-email")).toBe("***");
  });
});

describe("payment reminder delivery contract", () => {
  const migration = readFileSync(
    new URL(
      "../../../supabase/migrations/20261023120000_payment_reminder_deliveries.sql",
      import.meta.url,
    ),
    "utf8",
  );
  const source = readFileSync(
    new URL("../../../supabase/functions/send-payment-reminder/index.ts", import.meta.url),
    "utf8",
  );

  it("dedupes on subscription, period end, and reminder type, and keeps the log admin-read", () => {
    expect(migration).toContain("unique (subscription_id, period_end, reminder_type)");
    expect(migration).toContain("reminder_type in ('7_days', '1_day', 'due_day')");
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("public.is_admin()");
    expect(migration).toContain(
      "grant all on table public.payment_reminder_deliveries to service_role",
    );
    expect(migration).not.toMatch(/^\s*select cron\.schedule/m);
    expect(migration).toContain("-- select cron.schedule(");
    expect(migration).toContain("'5 10 * * 0'");
    expect(migration).toContain("Sunday 18:05 Asia/Kuala_Lumpur");
    expect(migration).toContain("Generated Sunday at 6:00 PM");
    expect(migration).not.toContain("'0 0 * * 1'");
    expect(migration).toContain("'0 1 * * *'");
  });

  it("requires the cron key and renders a dry run before any delivery write", () => {
    expect(source).toContain('Deno.env.get("PAYMENT_REMINDER_CRON_KEY")');
    expect(source).toContain('request.headers.get("x-payment-reminder-key")');
    expect(source).toContain("maskEmailAddress(recipient)");
    expect(source).toContain("if (dryRun)");
    const dryRunAt = source.indexOf("if (dryRun) {");
    const insertAt = source.indexOf(".insert({\n          subscription_id:");
    expect(dryRunAt).toBeGreaterThan(-1);
    expect(insertAt).toBeGreaterThan(dryRunAt);
    expect(source).toContain('action !== "send_due"');
  });
});

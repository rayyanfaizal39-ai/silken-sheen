import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import {
  claimDeliverySlot,
  cronAuthorized,
  deliveryReclaimOrFilter,
} from "../../../supabase/functions/_shared/delivery-claim";
import { maskEmailAddress } from "../../../supabase/functions/_shared/email-brand";
import {
  runManualParentReport,
  runMonthlyParentBatch,
  type MonthlyStudent,
  type MonthlyStore,
} from "../../../supabase/functions/_shared/monthly-parent-report-batch";
import { PARENT_EMAIL_CONSENT_VERSION as clientConsentVersion } from "@/features/parent-report/parentEmailConsent";
import {
  PARENT_EMAIL_CONSENT_VERSION,
  parentEmailWrite,
} from "../../../supabase/functions/_shared/parent-email-consent";
import {
  runPaymentReminderBatch,
  type PaymentReminderCandidate,
} from "../../../supabase/functions/_shared/payment-reminder-batch";

const NOW = new Date("2026-10-23T01:00:00.000Z");

function student(overrides: Partial<MonthlyStudent> = {}): MonthlyStudent {
  return {
    fullName: "Maya",
    profilePlan: "paid",
    subscriptionPlan: "premium",
    parentReportEmail: "parent@example.com",
    consentAt: null,
    consentVersion: null,
    accountEmail: "maya@example.com",
    xp: 20,
    streak: 2,
    quizzes: [
      {
        createdAt: "2026-09-15T04:00:00.000Z",
        scorePct: 90,
        subjectId: "math",
        chapterKey: "Chapter 1",
      },
    ],
    ...overrides,
  };
}

function consented(overrides: Partial<MonthlyStudent> = {}): MonthlyStudent {
  return student({
    consentAt: "2026-10-23T00:00:00.000Z",
    consentVersion: PARENT_EMAIL_CONSENT_VERSION,
    ...overrides,
  });
}

describe("parent email handlers", () => {
  it("rejects a missing or wrong cron key and accepts only the configured key", () => {
    expect(cronAuthorized("", "secret")).toBe(false);
    expect(cronAuthorized("secret", null)).toBe(false);
    expect(cronAuthorized("secret", "wrong")).toBe(false);
    expect(cronAuthorized("secret", "secret")).toBe(true);
  });

  it("keeps the client and server parent-email consent versions identical", () => {
    expect(clientConsentVersion).toBe(PARENT_EMAIL_CONSENT_VERSION);
    expect(clientConsentVersion).toBe("2026-10-23-monthly");
  });

  it("records consent when a parent address is saved and clears it when the address is removed", () => {
    expect(parentEmailWrite(null, true)).toEqual({
      parent_report_email: null,
      parent_email_consent_at: null,
      parent_email_consent_version: null,
    });
    expect(() => parentEmailWrite("parent@example.com", false)).toThrow(/consent/i);
    const grant = parentEmailWrite("parent@example.com", true);
    expect(grant).toEqual({
      parent_report_email: "parent@example.com",
      parent_email_consent_version: PARENT_EMAIL_CONSENT_VERSION,
    });
    expect(grant).not.toHaveProperty("parent_email_consent_at");
    const migration = readFileSync(
      new URL(
        "../../../supabase/migrations/20261023160000_parent_email_consent.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(migration).toContain("parent_email_consent_at timestamptz");
    expect(migration).toContain("parent_email_consent_version text");
    expect(migration).toContain("new.parent_email_consent_at := now()");
    expect(migration).toContain("new.parent_email_consent_at := old.parent_email_consent_at");
    expect(migration).toContain("profiles_set_parent_email_consent_at");
    expect(migration).not.toMatch(/parent_email_consent_at timestamptz\s+default\s+now\(\)/i);
    expect(migration).not.toMatch(/check\s*\(/i);
  });

  it("claims a manual send inside one locked database function", () => {
    const migration = readFileSync(
      new URL(
        "../../../supabase/migrations/20261023170000_claim_parent_report_send.sql",
        import.meta.url,
      ),
      "utf8",
    );
    const manual = readFileSync(
      new URL("../../../supabase/functions/send-parent-report/index.ts", import.meta.url),
      "utf8",
    );
    expect(migration).toContain("pg_advisory_xact_lock");
    expect(migration).toContain("recent_count >= 5");
    expect(migration).toContain(
      "grant execute on function public.claim_parent_report_send(uuid, text) to service_role",
    );
    expect(migration).toContain(
      "revoke all on function public.claim_parent_report_send(uuid, text) from public, anon, authenticated",
    );
    expect(manual).toContain('admin.rpc("claim_parent_report_send"');
    expect(manual).not.toContain('.from("email_delivery_attempts")');
  });

  it("does not write a delivery or call the mailer during a monthly dry run", async () => {
    const claim = vi.fn();
    const send = vi.fn();
    const store: MonthlyStore = {
      entitledStudentIds: async () => ["student-1"],
      loadStudent: async () => consented(),
      claim,
      markSent: vi.fn(),
      markFailed: vi.fn(),
    };
    const result = await runMonthlyParentBatch(store, send, { dryRun: true, now: NOW });
    expect(claim).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(store.markSent).not.toHaveBeenCalled();
    expect(result.wouldSend).toBe(1);
    expect(result.lostRace).toBe(0);
    const recipients = result.recipients as Array<{ maskedEmail: string; subject: string }>;
    expect(recipients[0]?.maskedEmail).toBe(maskEmailAddress("parent@example.com"));
    expect(recipients[0]?.subject).toContain("Monthly Report");
    expect(result.periodLabel).toBe("September 2026");
  });

  it("sends a parent address only when consent is current, including for Premium", async () => {
    const withoutConsent = vi.fn(async (_input: { to: string }) => ({ id: "student-copy" }));
    const missingConsent = await runManualParentReport({
      student: student(),
      userId: "student-1",
      now: NOW,
      recordAttempt: async () => "ok",
      send: withoutConsent,
    });
    expect(missingConsent.status).toBe(200);
    expect(withoutConsent.mock.calls[0]?.[0].to).toBe("maya@example.com");
    expect(missingConsent.body.usedParentEmail).toBe(false);

    const withConsent = vi.fn(async (_input: { to: string }) => ({ id: "parent-copy" }));
    const consentedSend = await runManualParentReport({
      student: consented(),
      userId: "student-1",
      now: NOW,
      recordAttempt: async () => "ok",
      send: withConsent,
    });
    expect(withConsent.mock.calls[0]?.[0].to).toBe("parent@example.com");
    expect(consentedSend.body.usedParentEmail).toBe(true);
  });

  it("rejects a manual send when the active subscription is not Premium", async () => {
    const send = vi.fn();
    const recordAttempt = vi.fn();
    for (const subscriptionPlan of [null, "pro", "basic", "paid"]) {
      const result = await runManualParentReport({
        student: consented({ subscriptionPlan, profilePlan: "paid" }),
        userId: "student-1",
        now: NOW,
        recordAttempt,
        send,
      });
      expect(result.status).toBe(403);
    }
    expect(send).not.toHaveBeenCalled();
    expect(recordAttempt).not.toHaveBeenCalled();
  });

  it("returns 429 when the atomic claim is refused and 500 when the claim errors", async () => {
    const send = vi.fn(async (_input: { to: string }) => ({ id: "should-not-send" }));
    const limited = await runManualParentReport({
      student: consented(),
      userId: "student-1",
      now: NOW,
      recordAttempt: async () => "limited",
      send,
    });
    expect(limited.status).toBe(429);
    const errored = await runManualParentReport({
      student: consented(),
      userId: "student-1",
      now: NOW,
      recordAttempt: async () => "error",
      send,
    });
    expect(errored.status).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });

  it("skips Pro and legacy paid profiles in the monthly batch", async () => {
    const send = vi.fn();
    const store: MonthlyStore = {
      entitledStudentIds: async () => ["pro-student", "paid-profile"],
      loadStudent: async (studentId) =>
        studentId === "pro-student"
          ? consented({ subscriptionPlan: "pro" })
          : consented({ subscriptionPlan: null, profilePlan: "paid" }),
      claim: vi.fn(),
      markSent: vi.fn(),
      markFailed: vi.fn(),
    };
    const result = await runMonthlyParentBatch(store, send, { dryRun: true, now: NOW });
    expect(send).not.toHaveBeenCalled();
    expect(store.claim).not.toHaveBeenCalled();
    expect(result.wouldSend).toBe(0);
  });

  it("counts a lost delivery claim without calling the mailer or marking it failed", async () => {
    const send = vi.fn();
    const store: MonthlyStore = {
      entitledStudentIds: async () => ["student-1"],
      loadStudent: async () => consented(),
      claim: async () => "lost",
      markSent: vi.fn(),
      markFailed: vi.fn(),
    };
    const result = await runMonthlyParentBatch(store, send, { dryRun: false, now: NOW });
    expect(send).not.toHaveBeenCalled();
    expect(result.lostRace).toBe(1);
    expect(result.failed).toBe(0);
    expect(result.alreadySent).toBe(1);
  });

  it("reclaims only a failed row or a stale sending row", async () => {
    const reclaim = vi.fn(async () => ({ data: [], error: null }));
    const lost = await claimDeliverySlot(
      {
        insert: async () => ({ data: null, error: { code: "23505", message: "duplicate key" } }),
        reclaim,
      },
      { student_id: "student-1", recipient_email: "maya@example.com" },
      NOW,
    );
    expect(lost).toBe("lost");
    expect(reclaim).toHaveBeenCalledTimes(1);
    expect(deliveryReclaimOrFilter(NOW)).toContain("status.eq.failed");
    expect(deliveryReclaimOrFilter(NOW)).toContain('updated_at.lt."2026-10-23T00:30:00.000Z"');

    const claimed = await claimDeliverySlot(
      {
        insert: async () => ({ data: null, error: { code: "23505", message: "duplicate key" } }),
        reclaim: async () => ({ data: [{ id: "row-1" }], error: null }),
      },
      { student_id: "student-1" },
      NOW,
    );
    expect(claimed).toBe("claimed");

    const fresh = await claimDeliverySlot(
      {
        insert: async () => ({ data: [{ id: "new-row" }], error: null }),
        reclaim: vi.fn(),
      },
      { student_id: "student-1" },
      NOW,
    );
    expect(fresh).toBe("claimed");
  });
});

describe("payment reminder handler", () => {
  function candidate(overrides: Partial<PaymentReminderCandidate> = {}): PaymentReminderCandidate {
    return {
      subscriptionId: "sub-pro",
      userId: "student-pro",
      status: "active",
      plan: "pro",
      billingInterval: "monthly",
      amount: 29,
      currency: "MYR",
      periodEnd: "2026-10-29T08:00:00.000Z",
      studentName: "Alya",
      accountEmail: "alya@example.com",
      sentTypes: [],
      ...overrides,
    };
  }

  it("dry-runs Pro and expired Premium subscriptions without writing or sending", async () => {
    const claim = vi.fn();
    const send = vi.fn();
    const result = await runPaymentReminderBatch(
      {
        candidates: async () => [
          candidate(),
          candidate({
            subscriptionId: "sub-premium",
            userId: "student-premium",
            plan: "premium",
            status: "expired",
            periodEnd: "2026-10-23T08:00:00.000Z",
          }),
        ],
        claim,
        markSent: vi.fn(),
        markFailed: vi.fn(),
      },
      send,
      { dryRun: true, now: NOW },
    );
    expect(claim).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(result.wouldSend).toBe(2);
    const recipients = result.recipients as Array<{
      maskedEmail: string;
      subject: string;
      reminderType: string;
    }>;
    expect(recipients.map((item) => item.reminderType).sort()).toEqual(["7_days", "due_day"]);
    expect(
      recipients.every((item) => item.maskedEmail === maskEmailAddress("alya@example.com")),
    ).toBe(true);
    expect(recipients.every((item) => item.subject.includes("ends"))).toBe(true);
    expect(recipients.some((item) => /renews/i.test(item.subject))).toBe(false);
  });

  it("sends one reminder to the student account email", async () => {
    const send = vi.fn(async (_input: { to: string }) => ({ id: "reminder-1" }));
    const result = await runPaymentReminderBatch(
      {
        candidates: async () => [candidate(), candidate()],
        claim: async () => "claimed",
        markSent: vi.fn(),
        markFailed: vi.fn(),
      },
      send,
      { dryRun: false, now: NOW },
    );
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0].to).toBe("alya@example.com");
    expect(result.wouldSend).toBe(1);
    expect(result.failed).toBe(0);
  });

  it("does not send a second reminder when the relevant one was already sent", async () => {
    const send = vi.fn();
    const result = await runPaymentReminderBatch(
      {
        candidates: async () => [candidate({ sentTypes: ["7_days"] })],
        claim: vi.fn(async () => "claimed" as const),
        markSent: vi.fn(),
        markFailed: vi.fn(),
      },
      send,
      { dryRun: false, now: NOW },
    );
    expect(send).not.toHaveBeenCalled();
    expect(result.wouldSend).toBe(0);
    expect(result.alreadySent).toBe(1);
  });
});

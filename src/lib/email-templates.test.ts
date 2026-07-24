import { describe, expect, it } from "vitest";
import {
  buildAuthEmails,
  buildInvoiceEmail,
  type AuthHookPayload,
} from "../../supabase/functions/_shared/email-templates";
import { EMAIL_FROM, EMAIL_REPLY_TO } from "../../supabase/functions/_shared/email-brand";
import { resolveInvoiceLegalDetails } from "../../supabase/functions/_shared/invoice-brand";

const authPayload = (overrides: Partial<AuthHookPayload["email_data"]> = {}): AuthHookPayload => ({
  user: { email: "student@example.com" },
  email_data: {
    token: "123456",
    token_hash: "signup-token-hash",
    redirect_to: "https://myacademy.my/auth/callback",
    email_action_type: "signup",
    site_url: "https://myacademy.my",
    ...overrides,
  },
});

describe("AcadeMY email templates", () => {
  it("uses the canonical sender identity", () => {
    expect(EMAIL_FROM).toBe("AcadeMY <hello@myacademy.my>");
    expect(EMAIL_REPLY_TO).toBe("admin@myacademy.my");
  });

  it("renders a responsive, branded invoice email and escapes customer data", () => {
    const email = buildInvoiceEmail(
      {
        invoice_number: "ACAD-20260720-000001",
        customer_name: "Alya <script>",
        description: "AcadeMY Captain Monthly",
        total: 49,
        currency: "MYR",
        payment_reference: "PAY-123",
      },
      resolveInvoiceLegalDetails((name) =>
        name === "ACADEMY_SSM_NUMBER" ? "202601234567" : undefined,
      ),
    );

    expect(email.subject).toContain("ACAD-20260720-000001");
    expect(email.html).toContain("@media only screen and (max-width:640px)");
    expect(email.html).toContain("#050816");
    expect(email.html).toContain("#8b5cf6");
    expect(email.html).toContain("#f5c518");
    expect(email.html).toContain("Alya &lt;script&gt;");
    expect(email.html).not.toContain("Alya <script>");
    expect(email.html).toContain("Lumina My Academy Digital");
    expect(email.html).toContain("SSM: 202601234567");
    expect(email.html).toContain("support@myacademy.my");
    expect(email.html).toContain("www.myacademy.my");
    expect(email.html).not.toContain("[Business address]");
    expect(email.text).toContain("Payment reference: PAY-123");
  });

  it("treats a whitespace-only invoice address as missing", () => {
    const legal = resolveInvoiceLegalDetails((name) =>
      name === "ACADEMY_BUSINESS_ADDRESS" ? "   " : undefined,
    );

    expect(legal.address).toBeNull();
  });

  it("builds working Supabase verification and recovery links", () => {
    const signup = buildAuthEmails(authPayload(), "https://project-ref.supabase.co")[0];
    const recovery = buildAuthEmails(
      authPayload({
        email_action_type: "recovery",
        token_hash: "recovery-token-hash",
        redirect_to: "https://myacademy.my/auth/callback?next=%2Fauth%2Freset-password",
      }),
      "https://project-ref.supabase.co",
    )[0];

    expect(signup.subject).toBe("Confirm your AcadeMY email");
    expect(signup.html).toContain("type=signup");
    expect(signup.html).toContain("token=signup-token-hash");
    expect(recovery.subject).toBe("Reset your AcadeMY password");
    expect(recovery.html).toContain("type=recovery");
    expect(recovery.html).toContain("token=recovery-token-hash");
    expect(recovery.text).toContain("123456");
  });

  it("sends secure email-change confirmations to both addresses with the correct hashes", () => {
    const payload = authPayload({
      email_action_type: "email_change",
      token: "111111",
      token_hash_new: "current-address-hash",
      token_new: "222222",
      token_hash: "new-address-hash",
    });
    payload.user.new_email = "new@example.com";

    const emails = buildAuthEmails(payload, "https://project-ref.supabase.co");
    expect(emails).toHaveLength(2);
    expect(emails[0].to).toBe("student@example.com");
    expect(emails[0].html).toContain("token=current-address-hash");
    expect(emails[1].to).toBe("new@example.com");
    expect(emails[1].html).toContain("token=new-address-hash");
  });
});

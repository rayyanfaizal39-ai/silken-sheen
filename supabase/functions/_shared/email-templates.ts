import { escapeHtml, formatMoney, renderEmailLayout, type EmailContent } from "./email-brand.ts";

export type InvoiceEmailData = {
  invoice_number: string;
  customer_name: string;
  description: string;
  total: number;
  currency: string;
  payment_reference: string;
};

export function buildInvoiceEmail(invoice: InvoiceEmailData): EmailContent {
  const total = formatMoney(Number(invoice.total), invoice.currency);
  const subject = `Payment confirmed — ${invoice.invoice_number}`;
  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:26px 0;border-collapse:separate;border-spacing:0;border:1px solid #29304d;border-radius:14px;background:#0f152a">
    <tr><td style="padding:18px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#9299b1">Amount paid</td><td align="right" style="padding:18px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:18px;line-height:24px;font-weight:700;color:#f8df6b">${escapeHtml(total)}</td></tr>
    <tr><td style="padding:14px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#9299b1">Plan</td><td align="right" style="padding:14px 20px;border-bottom:1px solid #29304d;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:#f8fafc">${escapeHtml(invoice.description)}</td></tr>
    <tr><td style="padding:14px 20px;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#9299b1">Payment reference</td><td align="right" style="padding:14px 20px;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:#f8fafc">${escapeHtml(invoice.payment_reference)}</td></tr>
  </table>
  <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#d6d9e7">Your paid invoice is attached as a PDF for your records.</p>`;

  return {
    subject,
    html: renderEmailLayout({
      preheader: `${total} payment received. Invoice ${invoice.invoice_number} is attached.`,
      eyebrow: "Payment received",
      title: "Your mission is cleared for launch.",
      intro: `Hi ${invoice.customer_name}, your AcadeMY payment was successful.`,
      content,
      outro: "Keep this email for your records. No further action is required.",
    }),
    text: [
      `Hi ${invoice.customer_name},`,
      "",
      "Your AcadeMY payment was successful.",
      `Amount paid: ${total}`,
      `Plan: ${invoice.description}`,
      `Payment reference: ${invoice.payment_reference}`,
      `Invoice: ${invoice.invoice_number}`,
      "",
      "Your paid invoice is attached as a PDF for your records.",
      "",
      "Need help? Reply to this email or contact admin@myacademy.my.",
    ].join("\n"),
  };
}

export type ParentReportEmailData = {
  cadence: "weekly" | "monthly";
  studentName: string;
  periodLabel: string;
  totalQuizzes: number;
  overallAvg: number;
  passRate: number;
  rankName: string;
  totalXp: number;
  studyStreak: number;
  strongest: { name: string; avgScore: number } | null;
  weakSpots: Array<{ subjectName: string; chapterLabel: string; avgScore: number }>;
  recommendation: string;
  dashboardUrl: string;
};

export function buildParentReportEmail(report: ParentReportEmailData): EmailContent {
  const cadenceLabel = report.cadence === "weekly" ? "Weekly" : "Monthly";
  const metric = (label: string, value: string, accent = false) =>
    `<td width="33.33%" valign="top" style="padding:8px"><div style="min-height:76px;padding:16px 12px;border:1px solid #29304d;border-radius:12px;background:#0f152a;text-align:center"><p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:12px;line-height:17px;color:#9299b1">${escapeHtml(label)}</p><p style="margin:0;font-family:Arial,sans-serif;font-size:20px;line-height:26px;font-weight:700;color:${accent ? "#f8df6b" : "#ffffff"}">${escapeHtml(value)}</p></div></td>`;
  const weakSpots = report.weakSpots.length
    ? `<div style="margin-top:26px"><p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#c4b5fd">Topics to revisit</p>${report.weakSpots
        .map(
          (spot) =>
            `<div style="margin-top:8px;padding:13px 15px;border:1px solid #29304d;border-radius:10px;background:#0f152a"><span style="font-family:Arial,sans-serif;font-size:14px;line-height:21px;color:#f8fafc">${escapeHtml(spot.chapterLabel)} · ${escapeHtml(spot.subjectName)}</span><strong style="float:right;font-family:Arial,sans-serif;font-size:14px;line-height:21px;color:#f8df6b">${spot.avgScore}%</strong></div>`,
        )
        .join("")}</div>`
    : `<p style="margin:26px 0 0;padding:15px;border:1px solid #3d3565;border-radius:10px;background:#17142d;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#ded8f7">No weak areas this period — every quizzed chapter is above 80%.</p>`;
  const strongest = report.strongest
    ? `<p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#d6d9e7"><strong style="color:#ffffff">Strongest subject:</strong> ${escapeHtml(report.strongest.name)} at ${report.strongest.avgScore}%.</p>`
    : "";
  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:calc(100% + 16px);margin:20px -8px 0"><tr>${metric("Quizzes", String(report.totalQuizzes))}${metric("Average", `${report.overallAvg}%`, true)}${metric("Pass rate", `${report.passRate}%`)}</tr></table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:calc(100% + 16px);margin:0 -8px"><tr>${metric("Rank", report.rankName)}${metric("Total XP", report.totalXp.toLocaleString("en-MY"), true)}${metric("Study streak", `${report.studyStreak}d`)}</tr></table>
    ${strongest}
    ${weakSpots}
    <div style="margin-top:26px;padding:17px 18px;border-left:4px solid #8b5cf6;border-radius:0 10px 10px 0;background:#15132a"><p style="margin:0 0 7px;font-family:Arial,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#c4b5fd">Recommended next step</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#e7e4f4">${escapeHtml(report.recommendation)}</p></div>`;

  return {
    subject: `AcadeMY ${cadenceLabel} Report — ${report.studentName}`,
    html: renderEmailLayout({
      preheader: `${report.studentName}'s learning summary for ${report.periodLabel}.`,
      eyebrow: `${cadenceLabel} parent mission report`,
      title: `${report.studentName}'s progress`,
      intro: `Here is a clear learning summary for ${report.periodLabel}.`,
      content,
      cta: { label: "View parent dashboard", url: report.dashboardUrl },
      outro: "This report was sent manually from AcadeMY by the learner or account holder.",
    }),
    text: [
      `AcadeMY ${cadenceLabel} Mission Report`,
      `Student: ${report.studentName}`,
      `Period: ${report.periodLabel}`,
      "",
      `Quizzes completed: ${report.totalQuizzes}`,
      `Average score: ${report.overallAvg}%`,
      `Pass rate (80%+): ${report.passRate}%`,
      `Current rank: ${report.rankName} (${report.totalXp.toLocaleString("en-MY")} XP)`,
      `Study streak: ${report.studyStreak} day${report.studyStreak === 1 ? "" : "s"}`,
      report.strongest
        ? `Strongest subject: ${report.strongest.name} (${report.strongest.avgScore}%)`
        : "",
      report.weakSpots.length ? "\nAreas to support:" : "",
      ...report.weakSpots.map(
        (spot) => `- ${spot.subjectName} — ${spot.chapterLabel} (${spot.avgScore}%)`,
      ),
      "",
      `Recommendation: ${report.recommendation}`,
      "",
      `Parent dashboard: ${report.dashboardUrl}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export type AuthActionType =
  | "signup"
  | "invite"
  | "magiclink"
  | "recovery"
  | "email_change"
  | "reauthentication"
  | "password_changed"
  | "email_changed"
  | "phone_changed"
  | "identity_linked"
  | "identity_unlinked"
  | "mfa_factor_enrolled"
  | "mfa_factor_unenrolled"
  | string;

export type AuthHookPayload = {
  user: {
    email?: string;
    new_email?: string;
  };
  email_data: {
    token?: string;
    token_hash?: string;
    redirect_to?: string;
    email_action_type: AuthActionType;
    site_url?: string;
    token_new?: string;
    token_hash_new?: string;
    old_email?: string;
    provider?: string;
    factor_type?: string;
  };
};

export type AuthEmail = EmailContent & {
  to: string;
  idempotencyKey: string;
};

type AuthCopy = {
  subject: string;
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  outro: string;
};

const AUTH_COPY: Partial<Record<string, AuthCopy>> = {
  signup: {
    subject: "Confirm your AcadeMY email",
    eyebrow: "Email verification",
    title: "Confirm your place in the crew.",
    intro: "Verify this email address to finish creating your AcadeMY account.",
    cta: "Confirm email",
    outro: "If you did not create an AcadeMY account, you can safely ignore this email.",
  },
  invite: {
    subject: "You’re invited to AcadeMY",
    eyebrow: "Crew invitation",
    title: "Your learning mission is ready.",
    intro: "You have been invited to join AcadeMY. Accept the invitation to get started.",
    cta: "Accept invitation",
    outro: "If you were not expecting this invitation, you can safely ignore this email.",
  },
  magiclink: {
    subject: "Your AcadeMY sign-in link",
    eyebrow: "Secure sign-in",
    title: "Continue your mission.",
    intro: "Use this secure link to sign in to AcadeMY.",
    cta: "Sign in to AcadeMY",
    outro: "If you did not request this link, you can safely ignore this email.",
  },
  recovery: {
    subject: "Reset your AcadeMY password",
    eyebrow: "Password recovery",
    title: "Set a new password.",
    intro: "We received a request to reset the password for your AcadeMY account.",
    cta: "Reset password",
    outro: "If you did not request a password reset, you can safely ignore this email.",
  },
  email_change: {
    subject: "Confirm your AcadeMY email change",
    eyebrow: "Email change",
    title: "Confirm your new coordinates.",
    intro: "Confirm this address to complete the email change on your AcadeMY account.",
    cta: "Confirm email change",
    outro: "If you did not request this change, reply to this email for help.",
  },
  reauthentication: {
    subject: "Your AcadeMY verification code",
    eyebrow: "Security check",
    title: "Confirm it’s really you.",
    intro: "Use the code below to continue with this sensitive account action.",
    cta: "Continue securely",
    outro: "If you did not initiate this action, secure your account and contact us.",
  },
};

const SECURITY_COPY: Record<
  string,
  Pick<AuthCopy, "subject" | "eyebrow" | "title" | "intro" | "outro">
> = {
  password_changed: {
    subject: "Your AcadeMY password was changed",
    eyebrow: "Security notice",
    title: "Your password has changed.",
    intro: "The password for your AcadeMY account was updated successfully.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  email_changed: {
    subject: "Your AcadeMY email was changed",
    eyebrow: "Security notice",
    title: "Your email address has changed.",
    intro: "The email address associated with your AcadeMY account was updated.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  phone_changed: {
    subject: "Your AcadeMY phone number was changed",
    eyebrow: "Security notice",
    title: "Your phone number has changed.",
    intro: "The phone number associated with your AcadeMY account was updated.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  identity_linked: {
    subject: "A sign-in method was linked to AcadeMY",
    eyebrow: "Security notice",
    title: "A sign-in method was added.",
    intro: "A new sign-in method was linked to your AcadeMY account.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  identity_unlinked: {
    subject: "A sign-in method was removed from AcadeMY",
    eyebrow: "Security notice",
    title: "A sign-in method was removed.",
    intro: "A sign-in method was removed from your AcadeMY account.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  mfa_factor_enrolled: {
    subject: "A verification method was added to AcadeMY",
    eyebrow: "Security notice",
    title: "A verification method was added.",
    intro: "A new verification method was added to your AcadeMY account.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
  mfa_factor_unenrolled: {
    subject: "A verification method was removed from AcadeMY",
    eyebrow: "Security notice",
    title: "A verification method was removed.",
    intro: "A verification method was removed from your AcadeMY account.",
    outro:
      "If this was not you, reply to this email immediately so we can help secure your account.",
  },
};

function verificationUrl(
  supabaseUrl: string,
  actionType: string,
  tokenHash: string,
  redirectTo: string,
) {
  const url = new URL("/auth/v1/verify", supabaseUrl);
  url.searchParams.set("token", tokenHash);
  url.searchParams.set("type", actionType);
  url.searchParams.set("redirect_to", redirectTo);
  return url.toString();
}

function actionableAuthEmail(input: {
  to: string;
  actionType: string;
  token?: string;
  tokenHash: string;
  redirectTo: string;
  supabaseUrl: string;
  idempotencySuffix?: string;
}): AuthEmail {
  const copy = AUTH_COPY[input.actionType];
  if (!copy) throw new Error(`Unsupported auth email action: ${input.actionType}`);
  const url = verificationUrl(
    input.supabaseUrl,
    input.actionType,
    input.tokenHash,
    input.redirectTo,
  );
  return {
    to: input.to,
    subject: copy.subject,
    html: renderEmailLayout({
      preheader: copy.intro,
      eyebrow: copy.eyebrow,
      title: copy.title,
      intro: copy.intro,
      code: input.token,
      cta: { label: copy.cta, url },
      outro: copy.outro,
    }),
    text: [
      copy.title,
      "",
      copy.intro,
      input.token ? `Verification code: ${input.token}` : "",
      `Continue: ${url}`,
      "",
      copy.outro,
      "Need help? Reply to this email or contact admin@myacademy.my.",
    ]
      .filter(Boolean)
      .join("\n"),
    idempotencyKey:
      `academy-auth-${input.actionType}-${input.tokenHash}-${input.idempotencySuffix ?? "primary"}`.slice(
        0,
        256,
      ),
  };
}

function securityEmail(to: string, actionType: string, tokenSeed: string): AuthEmail {
  const copy = SECURITY_COPY[actionType];
  if (!copy) throw new Error(`Unsupported auth email action: ${actionType}`);
  return {
    to,
    subject: copy.subject,
    html: renderEmailLayout({
      preheader: copy.intro,
      eyebrow: copy.eyebrow,
      title: copy.title,
      intro: copy.intro,
      outro: copy.outro,
    }),
    text: `${copy.title}\n\n${copy.intro}\n\n${copy.outro}\nNeed help? Reply to this email or contact admin@myacademy.my.`,
    idempotencyKey: `academy-auth-${actionType}-${tokenSeed}`.slice(0, 256),
  };
}

export function buildAuthEmails(payload: AuthHookPayload, supabaseUrl: string): AuthEmail[] {
  const { user, email_data: data } = payload;
  const actionType = data.email_action_type;
  const redirectTo = data.redirect_to || data.site_url;
  if (!redirectTo) throw new Error("Auth email redirect URL is missing");

  if (SECURITY_COPY[actionType]) {
    if (!user.email) throw new Error("Auth email recipient is missing");
    return [securityEmail(user.email, actionType, data.token_hash || data.token || actionType)];
  }

  if (actionType === "email_change") {
    const messages: AuthEmail[] = [];
    // Supabase's secure-email-change field names are intentionally reversed:
    // token_hash_new belongs to the current address; token_hash to the new one.
    if (user.email && data.token_hash_new) {
      messages.push(
        actionableAuthEmail({
          to: user.email,
          actionType,
          token: data.token,
          tokenHash: data.token_hash_new,
          redirectTo,
          supabaseUrl,
          idempotencySuffix: "current",
        }),
      );
    }
    if (user.new_email && data.token_hash) {
      messages.push(
        actionableAuthEmail({
          to: user.new_email,
          actionType,
          token: data.token_new || data.token,
          tokenHash: data.token_hash,
          redirectTo,
          supabaseUrl,
          idempotencySuffix: "new",
        }),
      );
    }
    if (messages.length === 0) throw new Error("Email-change token or recipient is missing");
    return messages;
  }

  if (!user.email || !data.token_hash) {
    throw new Error("Auth email token or recipient is missing");
  }
  return [
    actionableAuthEmail({
      to: user.email,
      actionType,
      token: data.token,
      tokenHash: data.token_hash,
      redirectTo,
      supabaseUrl,
    }),
  ];
}

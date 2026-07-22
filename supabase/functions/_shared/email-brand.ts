export const EMAIL_FROM = "AcadeMY <hello@myacademy.my>";
export const EMAIL_REPLY_TO = "admin@myacademy.my";

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

type EmailLayoutOptions = {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  content?: string;
  cta?: { label: string; url: string };
  code?: string;
  outro?: string;
};

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  );
}

export function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function renderEmailLayout(options: EmailLayoutOptions) {
  const cta = options.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 24px"><tr><td style="border-radius:12px;background:#f5c518"><a href="${escapeAttribute(options.cta.url)}" style="display:inline-block;padding:14px 24px;font-family:Arial,sans-serif;font-size:16px;line-height:20px;font-weight:700;color:#20180a;text-decoration:none;border-radius:12px">${escapeHtml(options.cta.label)}</a></td></tr></table>`
    : "";
  const code = options.code
    ? `<div style="margin:24px 0;padding:18px 20px;border:1px solid #4c3b79;border-radius:12px;background:#11172b;text-align:center"><p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#c4b5fd">Verification code</p><p style="margin:0;font-family:'Courier New',monospace;font-size:28px;line-height:34px;font-weight:700;letter-spacing:6px;color:#f8df6b">${escapeHtml(options.code)}</p></div>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(options.title)}</title>
  <style>
    @media only screen and (max-width:640px) {
      .email-shell { width:100% !important; }
      .email-card { padding:32px 24px !important; border-radius:18px !important; }
      .email-title { font-size:28px !important; line-height:34px !important; }
    }
    a { color:#c4b5fd; }
  </style>
</head>
<body style="margin:0;padding:0;background:#050816;color:#f8fafc;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#050816">
    <tr>
      <td align="center" style="padding:24px 12px 40px">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" class="email-shell" style="width:100%;max-width:620px">
          <tr>
            <td style="padding:0 8px 18px">
              <span style="font-family:Arial,sans-serif;font-size:24px;line-height:30px;font-weight:800;letter-spacing:-.8px;color:#ffffff">Acade<span style="color:#f5c518">MY</span></span>
            </td>
          </tr>
          <tr>
            <td class="email-card" style="padding:44px 44px 40px;border:1px solid #262c48;border-radius:24px;background:#0b1022;box-shadow:0 24px 64px rgba(0,0,0,.32)">
              <div style="width:48px;height:4px;margin:0 0 26px;border-radius:999px;background:#8b5cf6"></div>
              <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#f8df6b">${escapeHtml(options.eyebrow)}</p>
              <h1 class="email-title" style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:34px;line-height:41px;letter-spacing:-.8px;color:#ffffff">${escapeHtml(options.title)}</h1>
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#d6d9e7">${escapeHtml(options.intro)}</p>
              ${options.content ?? ""}
              ${code}
              ${cta}
              ${options.outro ? `<p style="margin:20px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:23px;color:#a9afc4">${escapeHtml(options.outro)}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 12px 0;text-align:center">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:19px;color:#7f879e">AcadeMY · Malaysia's interstellar learning platform</p>
              <p style="margin:7px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:19px;color:#7f879e">Need help? Reply to this email or contact admin@myacademy.my.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

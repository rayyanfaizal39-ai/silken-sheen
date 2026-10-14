import { describe, expect, it } from "vitest";
import { applyDuitNowQrOptions } from "../../supabase/functions/_shared/toyyibpay-qr";

describe("ToyyibPay DuitNow QR bill options", () => {
  it("preserves existing FPX-only bill parameters when not enabled", () => {
    const bill = new URLSearchParams({
      billPaymentChannel: "0",
      billAmount: "2900",
    });

    applyDuitNowQrOptions(bill, false);

    expect(bill.get("billPaymentChannel")).toBe("0");
    expect(bill.get("billAmount")).toBe("2900");
    expect(bill.has("enableDuitNowQR")).toBe(false);
    expect(bill.has("chargeDuitNowQR")).toBe(false);
  });

  it("enables DuitNow QR alongside FPX and charges the bill owner", () => {
    const bill = new URLSearchParams({
      billPaymentChannel: "0",
      billAmount: "5900",
    });

    applyDuitNowQrOptions(bill, true);

    expect(bill.get("enableDuitNowQR")).toBe("1");
    expect(bill.get("chargeDuitNowQR")).toBe("0");
    expect(bill.get("billPaymentChannel")).toBe("0");
    expect(bill.get("billAmount")).toBe("5900");
  });
});

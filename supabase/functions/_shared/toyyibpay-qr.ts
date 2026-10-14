/**
 * ToyyibPay accepts DuitNow QR independently of the FPX/card channel.
 * Opt in only after activation has been confirmed for the credentials and
 * environment in use (sandbox and live accounts can differ).
 */
export function applyDuitNowQrOptions(
  billParams: URLSearchParams,
  enabled: boolean,
): void {
  if (!enabled) return;
  billParams.set("enableDuitNowQR", "1");
  // Keep the advertised plan price unchanged for parents.
  // ToyyibPay: 0 = bill owner absorbs QR transaction charges.
  billParams.set("chargeDuitNowQR", "0");
}

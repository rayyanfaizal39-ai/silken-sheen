// ToyyibPay can report failure with HTTP 200. Consume the response body once
// and validate the documented array response without logging private payloads.

/** The payment provider could not be reached or returned something unusable. */
export class ToyyibPayUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ToyyibPayUnavailableError";
  }
}

export const TOYYIBPAY_REQUEST_TIMEOUT_MS = 10_000;

export async function readToyyibPayBill(response: Response): Promise<string> {
  let text: string;
  try {
    text = await response.text();
  } catch {
    throw new ToyyibPayUnavailableError("ToyyibPay response body could not be read");
  }
  if (!response.ok) {
    throw new ToyyibPayUnavailableError(`ToyyibPay bill creation failed (${response.status})`);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new ToyyibPayUnavailableError("ToyyibPay returned invalid JSON");
  }
  const code =
    Array.isArray(payload) && typeof payload[0]?.BillCode === "string"
      ? payload[0].BillCode.trim()
      : "";
  if (!/^[a-z0-9_-]+$/i.test(code)) {
    throw new ToyyibPayUnavailableError("ToyyibPay returned no valid bill code");
  }
  return code;
}

/** POST createBill with a hard timeout; network failures become ToyyibPayUnavailableError. */
export async function requestToyyibPayBill(
  url: string,
  body: URLSearchParams,
  options: { fetchImpl?: typeof fetch; timeoutMs?: number } = {},
): Promise<string> {
  const { fetchImpl = fetch, timeoutMs = TOYYIBPAY_REQUEST_TIMEOUT_MS } = options;
  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    throw new ToyyibPayUnavailableError(`ToyyibPay request failed (${reason})`);
  }
  return readToyyibPayBill(response);
}

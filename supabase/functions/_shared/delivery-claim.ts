/** A fresh "sending" row is owned by the worker that wrote it. Older rows can be retried. */
export const DELIVERY_CLAIM_STALE_MS = 30 * 60 * 1000;

export type ClaimQueryError = { code?: string; message?: string } | null;

export type ClaimQuery = {
  insert(row: Record<string, unknown>): Promise<{
    data: Array<{ id: string }> | null;
    error: ClaimQueryError;
  }>;
  reclaim(
    filter: string,
    patch: Record<string, unknown>,
  ): Promise<{ data: Array<{ id: string }> | null; error: ClaimQueryError }>;
};

export type ClaimOutcome = "claimed" | "lost" | "error";

export function deliveryReclaimOrFilter(now: Date): string {
  const stale = new Date(now.getTime() - DELIVERY_CLAIM_STALE_MS).toISOString();
  return `status.eq.failed,and(status.eq.sending,updated_at.lt."${stale}")`;
}

export function claimResult(result: { data: unknown; error: ClaimQueryError }): {
  data: Array<{ id: string }> | null;
  error: ClaimQueryError;
} {
  if (result.error || !Array.isArray(result.data)) return { data: null, error: result.error };
  const data = result.data.flatMap((row) => {
    if (!row || typeof row !== "object" || !("id" in row)) return [];
    const id = (row as { id: unknown }).id;
    return id == null ? [] : [{ id: String(id) }];
  });
  return { data, error: null };
}

export function isUniqueViolation(error: ClaimQueryError): boolean {
  if (!error) return false;
  if (error.code === "23505") return true;
  return /duplicate key|unique constraint/i.test(error.message ?? "");
}

/**
 * Insert a new sending row. On a unique conflict, one conditional update
 * re-claims only failed rows or sending rows older than 30 minutes.
 * Zero updated rows means another worker owns the send.
 */
export async function claimDeliverySlot(
  query: ClaimQuery,
  row: Record<string, unknown>,
  now = new Date(),
): Promise<ClaimOutcome> {
  const inserted = await query.insert({ ...row, status: "sending", error_message: null });
  if (!inserted.error) return "claimed";
  if (!isUniqueViolation(inserted.error)) return "error";

  const reclaimed = await query.reclaim(deliveryReclaimOrFilter(now), {
    status: "sending",
    recipient_email: row.recipient_email,
    error_message: null,
  });
  if (reclaimed.error) return "error";
  return reclaimed.data?.length ? "claimed" : "lost";
}

export function cronAuthorized(configuredKey: string, providedKey: string | null): boolean {
  return Boolean(configuredKey) && providedKey === configuredKey;
}

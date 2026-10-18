import {
  associateResults,
  batchJsonl,
  estimatedCost,
  validatePng,
  type Batch,
  type BatchProvider,
  type GenerationRequest,
} from "./nova-generation.ts";

export interface WorkerStore {
  batches(): Promise<Batch[]>;
  prepare(): Promise<void>;
  begin(batch: string): Promise<boolean>;
  requests(batch: string): Promise<GenerationRequest[]>;
  reference(path: string): Promise<string>;
  attach(batch: string, provider: string, file: string | null): Promise<void>;
  review(batch: string, code: string): Promise<void>;
  claim(batch: string): Promise<string | null>;
  upload(path: string, bytes: Uint8Array): Promise<void>;
  finish(input: {
    request: string;
    token: string;
    digest?: string;
    provider_request?: string;
    provider_usage?: Record<string, unknown>;
    cost_microusd?: number | null;
    failure?: string;
    retryable?: boolean;
  }): Promise<void>;
  collected(
    batch: string,
    token: string,
    status: "completed" | "submitted",
    output?: string | null,
    error?: string | null,
  ): Promise<void>;
  release(): Promise<void>;
}
export async function runNovaWorker(
  store: WorkerStore,
  provider: BatchProvider,
  flags: { enabled: boolean; batchEnabled: boolean },
) {
  if (!flags.enabled || !flags.batchEnabled) return { disabled: true, processed: 0 };
  await store.release();
  let processed = 0;
  // Collect first; pending work should never block completed results.
  for (const batch of await store.batches()) {
    if (!["submitted", "collecting"].includes(batch.status) || !batch.provider_batch_id) continue;
    const token = await store.claim(batch.id);
    if (!token) continue;
    let validatingAssociation = false;
    try {
      const remote = await provider.retrieve(batch.provider_batch_id);
      if (!["completed", "expired", "failed", "cancelled"].includes(remote.status)) {
        await store.collected(batch.id, token, "submitted");
        continue;
      }
      const requests = await store.requests(batch.id);
      const texts = await Promise.all(
        [remote.output_file_id, remote.error_file_id]
          .filter((x): x is string => !!x)
          .map((id) => provider.file(id)),
      );
      // Validate association for the whole file before accepting a single image.
      validatingAssociation = true;
      const results = associateResults(texts, requests);
      validatingAssociation = false;
      for (const request of requests) {
        const result = results.get(request.custom_id);
        const response = result?.response;
        const body = response?.body;
        if (response?.status_code === 200 && body?.data?.length === 1 && body.data[0].b64_json) {
          let image: Awaited<ReturnType<typeof validatePng>>;
          try {
            image = await validatePng(body.data[0].b64_json);
          } catch {
            await store.finish({
              request: request.id,
              token,
              failure: "invalid_image",
              provider_request: response.request_id,
              provider_usage: body.usage,
              cost_microusd: estimatedCost(body.usage),
            });
            continue;
          }
          const path = `${request.card_id}/${request.job_id}/${request.candidate}/${image.sha256}.png`;
          await store.upload(path, image.bytes);
          await store.finish({
            request: request.id,
            token,
            digest: image.sha256,
            provider_request: response.request_id,
            provider_usage: body.usage,
            cost_microusd: estimatedCost(body.usage),
          });
        } else {
          // Only explicit throttling / unexecuted expired rows are safe automatic retries.
          const expired =
            (!result && remote.status === "expired") || result?.error?.code === "batch_expired";
          const throttled = response?.status_code === 429;
          await store.finish({
            request: request.id,
            token,
            provider_request: response?.request_id,
            failure: expired
              ? "batch_expired"
              : throttled
                ? "rate_limited"
                : !result
                  ? "missing_result"
                  : "provider_rejected",
            retryable: expired || throttled,
            provider_usage: body?.usage,
            cost_microusd: estimatedCost(body?.usage),
          });
        }
      }
      await store.collected(
        batch.id,
        token,
        "completed",
        remote.output_file_id,
        remote.error_file_id,
      );
      processed++;
    } catch {
      // Safe reads/storage writes can be retried; malformed association requires operator review.
      if (validatingAssociation) await store.review(batch.id, "invalid_result_association");
      else await store.collected(batch.id, token, "submitted");
      // No image job is submitted here. A future tick retries collection with the same IDs.
    }
  }
  await store.prepare();
  for (const batch of await store.batches()) {
    if (batch.status !== "prepared" || !(await store.begin(batch.id))) continue;
    try {
      const requests = await store.requests(batch.id);
      const jsonl = await batchJsonl(batch, requests, (path) => store.reference(path));
      const remote = await provider.submit(jsonl, batch);
      await store.attach(batch.id, remote.id, remote.input_file_id ?? null);
      processed++;
    } catch {
      // Never call submit again after an uncertain outcome, including DB acknowledgement failure.
      await store.review(batch.id, "submission_requires_reconciliation");
    }
  }
  return { disabled: false, processed };
}

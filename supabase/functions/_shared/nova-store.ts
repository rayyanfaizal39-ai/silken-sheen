import type { SupabaseClient } from "@supabase/supabase-js";
import type { Batch, GenerationRequest } from "./nova-generation.ts";
import type { WorkerStore } from "./nova-worker.ts";

export class SupabaseNovaStore implements WorkerStore {
  constructor(private db: SupabaseClient) {}
  private async rpc<T>(name: string, args: Record<string, unknown> = {}) {
    const { data, error } = await this.db.rpc(name, args);
    if (error) throw new Error(`Nova RPC ${name} failed`);
    return data as T;
  }
  async batches() {
    const { data, error } = await this.db
      .from("nova_generation_batches")
      .select("*")
      .in("status", ["prepared", "submitted", "collecting"])
      .order("created_at")
      .limit(4);
    if (error) throw new Error("Batch read failed");
    return data as Batch[];
  }
  async prepare() {
    await this.rpc("nova_prepare_batch");
  }
  begin(batch: string) {
    return this.rpc<boolean>("nova_begin_submission", { batch });
  }
  async requests(batch: string) {
    const { data, error } = await this.db
      .from("nova_batch_requests")
      .select(
        `id,custom_id,candidate_id,
      candidate:nova_generation_candidates!inner(candidate,job:nova_generation_jobs!inner(id,card_id,stage,identity_snapshot))`,
      )
      .eq("batch_id", batch);
    if (error) throw new Error("Request read failed");
    type Row = {
      id: string;
      custom_id: string;
      candidate_id: string;
      candidate: {
        candidate: "a" | "b";
        job: {
          id: string;
          card_id: string;
          stage: number;
          identity_snapshot: GenerationRequest["identity"];
        };
      };
    };
    return (data as unknown as Row[]).map((r) => ({
      id: r.id,
      custom_id: r.custom_id,
      candidate_id: r.candidate_id,
      candidate: r.candidate.candidate,
      job_id: r.candidate.job.id,
      card_id: r.candidate.job.card_id,
      stage: r.candidate.job.stage,
      identity: r.candidate.job.identity_snapshot,
    }));
  }
  async reference(path: string) {
    const { data, error } = await this.db.storage.from("nova-artwork").download(path);
    if (error || !data || data.size > 14 * 1024 * 1024) throw new Error("Reference unavailable");
    const bytes = new Uint8Array(await data.arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 8192)
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    // Durable inline references avoid signed URLs expiring during the 24-hour batch window.
    return `data:image/png;base64,${btoa(binary)}`;
  }
  async attach(batch: string, provider: string, file: string | null) {
    await this.rpc("nova_attach_batch", { batch, provider_id: provider, input_id: file });
  }
  async review(batch: string, code: string) {
    await this.rpc("nova_review_batch", { batch, code });
  }
  claim(batch: string) {
    return this.rpc<string | null>("nova_claim_collection", { batch });
  }
  async upload(path: string, bytes: Uint8Array) {
    const { error } = await this.db.storage
      .from("nova-artwork")
      .upload(path, bytes, { contentType: "image/png", upsert: false, cacheControl: "0" });
    // A prior collection may have uploaded the same hash before crashing. Never overwrite it.
    if (
      error &&
      !["409", "Duplicate"].includes(String((error as { statusCode?: string }).statusCode)) &&
      !/already exists|duplicate/i.test(error.message)
    )
      throw new Error("Private storage upload failed");
  }
  async finish(input: Parameters<WorkerStore["finish"]>[0]) {
    await this.rpc("nova_finish_request", input);
  }
  async collected(
    batch: string,
    token: string,
    status: "completed" | "submitted",
    output?: string | null,
    error?: string | null,
  ) {
    const { error: failure } = await this.db
      .from("nova_generation_batches")
      .update({
        status,
        output_file_id: output ?? null,
        error_file_id: error ?? null,
        lease_until: null,
        lease_token: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", batch)
      .eq("status", "collecting")
      .eq("lease_token", token);
    if (failure) throw new Error("Collection acknowledgement failed");
  }
  async release() {
    await this.rpc("nova_release_evolutions");
  }
}

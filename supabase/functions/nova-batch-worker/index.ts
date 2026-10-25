import { createClient } from "@supabase/supabase-js";
import { OpenAIBatchProvider } from "../_shared/nova-generation.ts";
import { SupabaseNovaStore } from "../_shared/nova-store.ts";
import { runNovaWorker } from "../_shared/nova-worker.ts";

// Private scheduler only. A student JWT is never sufficient for this endpoint.
Deno.serve(async (request: Request) => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (request.method !== "POST") return new Response("{}", { status: 405, headers });
  const expected = Deno.env.get("NOVA_WORKER_SECRET");
  const provided = request.headers.get("x-nova-worker-secret") ?? "";
  const hash = async (value: string) =>
    new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
  const [a, b] = await Promise.all([hash(expected ?? ""), hash(provided)]);
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
  if (!expected || expected.length < 32 || mismatch)
    return new Response("{}", { status: 401, headers });
  const enabled = Deno.env.get("NOVA_AI_ENABLED") === "true";
  const batchEnabled = Deno.env.get("NOVA_AI_BATCH_ENABLED") === "true";
  if (!enabled || !batchEnabled)
    return new Response(JSON.stringify({ disabled: true }), { headers });
  try {
    const db = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data: settings, error } = await db
      .from("nova_generation_settings")
      .select("enabled,batch_enabled")
      .single();
    if (error) throw new Error("Configuration unavailable");
    if (!settings.enabled || !settings.batch_enabled)
      return new Response(JSON.stringify({ disabled: true }), { headers });
    const result = await runNovaWorker(
      new SupabaseNovaStore(db),
      new OpenAIBatchProvider(Deno.env.get("OPENAI_API_KEY") ?? ""),
      { enabled, batchEnabled },
    );
    return new Response(JSON.stringify(result), { headers });
  } catch {
    // No raw provider error, prompt, key, base64 or user data is logged/returned.
    return new Response(JSON.stringify({ error: "Nova worker needs operator attention" }), {
      status: 503,
      headers,
    });
  }
});

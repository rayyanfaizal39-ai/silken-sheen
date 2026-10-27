import { getRequestHost } from "@tanstack/start-server-core";
import { isSupabaseServerConfigured } from "@/lib/supabase.server";
import { devAuthBypassActive, hostnameOf } from "./gate";

/** Server-side twin of the client guard. False outside a localhost dev request. */
export function devAuthBypassServerAllowed(): boolean {
  if (!import.meta.env.DEV) return false;
  let hostname = "";
  try {
    hostname = hostnameOf(getRequestHost());
  } catch {
    hostname = "";
  }
  return devAuthBypassActive({
    dev: true,
    prod: Boolean(import.meta.env.PROD),
    flag: import.meta.env.VITE_DEV_AUTH_BYPASS,
    hostname,
    cloudConfigured: isSupabaseServerConfigured(),
  });
}

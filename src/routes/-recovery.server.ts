import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, getRequestProtocol } from "@tanstack/start-server-core";
import { RECOVERY_SESSION_COOKIE } from "@/lib/auth-recovery";
import { getSupabaseServerClient } from "@/lib/supabase.server";

export const hasValidRecoverySession = createServerFn({ method: "GET" }).handler(async () => {
  if (getCookie(RECOVERY_SESSION_COOKIE) !== "verified") return false;
  const supabase = getSupabaseServerClient();
  if (!supabase) return false;
  const { data, error } = await supabase.auth.getUser();
  return !error && Boolean(data.user);
});

export const clearRecoverySession = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(RECOVERY_SESSION_COOKIE, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: getRequestProtocol({ xForwardedProto: true }) === "https",
  });
  return { cleared: true };
});

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const VISITOR_KEY = "academy.analytics.visitor";
const SESSION_KEY = "academy.analytics.session";
const FIRST_TOUCH_KEY = "academy.analytics.first-touch";
const MAX_PROPERTY_LENGTH = 160;
const recentEvents = new Map<string, number>();

type AnalyticsPrimitive = string | number | boolean | null;
export type AnalyticsProperties = Record<string, AnalyticsPrimitive>;

function createUuid(): string {
  const browserCrypto = globalThis.crypto as Crypto | undefined;
  if (browserCrypto?.randomUUID) {
    return browserCrypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (browserCrypto) {
    browserCrypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getOrCreateId(storage: Storage, key: string): string {
  const existing = storage.getItem(key);
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  const id = createUuid();
  storage.setItem(key, id);
  return id;
}

function trimmed(value: string | null): string | null {
  const normalized = value?.trim().slice(0, MAX_PROPERTY_LENGTH) ?? "";
  return normalized || null;
}

function getFirstTouch(): AnalyticsProperties {
  const stored = localStorage.getItem(FIRST_TOUCH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as AnalyticsProperties;
    } catch {
      localStorage.removeItem(FIRST_TOUCH_KEY);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const touch: AnalyticsProperties = {
    referrer_host: (() => {
      if (!document.referrer) return null;
      try {
        return trimmed(new URL(document.referrer).hostname);
      } catch {
        return null;
      }
    })(),
    utm_source: trimmed(params.get("utm_source")),
    utm_medium: trimmed(params.get("utm_medium")),
    utm_campaign: trimmed(params.get("utm_campaign")),
  };
  localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  return touch;
}

export function sanitizeAnalyticsProperties(properties: AnalyticsProperties): AnalyticsProperties {
  const sanitized: AnalyticsProperties = {};
  for (const [rawKey, rawValue] of Object.entries(properties).slice(0, 20)) {
    const key = rawKey.replace(/[^a-z0-9_]/gi, "_").slice(0, 48);
    if (!key) continue;
    sanitized[key] =
      typeof rawValue === "string" ? rawValue.slice(0, MAX_PROPERTY_LENGTH) : rawValue;
  }
  return sanitized;
}

export async function trackVisitorEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
  userId?: string | null,
): Promise<void> {
  if (typeof window === "undefined" || !isSupabaseConfigured) return;
  if (!/^[a-z][a-z0-9_]{0,63}$/.test(eventName)) return;
  if (window.location.pathname.startsWith("/admin")) return;

  try {
    const visitorId = getOrCreateId(localStorage, VISITOR_KEY);
    const sessionId = getOrCreateId(sessionStorage, SESSION_KEY);
    const path = window.location.pathname.slice(0, 512) || "/";
    const dedupeKey = `${sessionId}:${eventName}:${path}`;
    const now = Date.now();
    if (now - (recentEvents.get(dedupeKey) ?? 0) < 1_500) return;
    recentEvents.set(dedupeKey, now);

    const firstTouch = getFirstTouch();
    const referrerHost =
      typeof firstTouch.referrer_host === "string" ? firstTouch.referrer_host.slice(0, 253) : null;
    const dimensions: AnalyticsProperties = {
      ...firstTouch,
      viewport:
        window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      ...properties,
    };
    delete dimensions.referrer_host;

    let resolvedUserId = userId;
    if (resolvedUserId === undefined) {
      const { data } = await supabase.auth.getSession();
      resolvedUserId = data.session?.user.id ?? null;
    }

    const { error } = await supabase.from("visitor_events").insert({
      visitor_id: visitorId,
      session_id: sessionId,
      user_id: resolvedUserId,
      event_name: eventName,
      path,
      referrer_host: referrerHost,
      properties: sanitizeAnalyticsProperties(dimensions),
    });

    if (error && import.meta.env.DEV) {
      console.warn("[visitor-analytics] Event was not recorded", {
        eventName,
        message: error.message,
      });
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[visitor-analytics] Tracking is unavailable", error);
    }
  }
}

export function hasIdentifiedCurrentSession(userId: string): boolean {
  try {
    return sessionStorage.getItem(`academy.analytics.identified.${userId}`) === "true";
  } catch {
    return false;
  }
}

export function markCurrentSessionIdentified(userId: string): void {
  try {
    sessionStorage.setItem(`academy.analytics.identified.${userId}`, "true");
  } catch {
    // Analytics must never interrupt the product experience.
  }
}

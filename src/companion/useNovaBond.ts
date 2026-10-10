import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { latestNovaBond, parseNovaBond, type NovaBond } from "./personality";

const EVENT = "academy:nova-bond-updated";
const storageKey = (userId: string) => `academy:nova-bond:v1:${userId}`;

function readLocal(userId: string): NovaBond | null {
  try {
    return parseNovaBond(
      JSON.parse(localStorage.getItem(storageKey(userId)) ?? "null"),
    );
  } catch {
    return null;
  }
}

function writeLocal(userId: string, bond: NovaBond) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(bond));
  } catch {
    /* The authenticated database copy remains authoritative. */
  }
}

export function useNovaBond() {
  const { user, loading: authLoading } = useAuth();
  const owner = user?.id ?? "guest";
  const ownerRef = useRef(owner);
  ownerRef.current = owner;
  const [snapshot, setSnapshot] = useState<{
    owner: string;
    bond: NovaBond | null;
  }>({ owner: "", bond: null });
  const [loading, setLoading] = useState(true);
  const bond = snapshot.owner === owner ? snapshot.bond : null;

  useEffect(() => {
    if (authLoading) return;
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const local = readLocal(owner);
    setSnapshot({ owner, bond: local });
    setLoading(true);

    async function load() {
      try {
        if (!user || !isSupabaseConfigured) return;
        const { data, error } = await supabase
          .from("companion_bonds")
          .select("bond")
          .eq("user_id", owner)
          .abortSignal(controller.signal)
          .maybeSingle();
        if (!active || error) return;
        // Re-read storage: a new bond could have been saved during this request.
        const chosen = latestNovaBond(
          readLocal(owner),
          parseNovaBond(data?.bond),
        );
        setSnapshot({ owner, bond: chosen });
        if (chosen) writeLocal(owner, chosen);
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    void load().catch(() => {
      if (active) setLoading(false);
    });

    const refresh = (event: Event) => {
      const detail = (event as CustomEvent<{ owner: string; bond: NovaBond }>)
        .detail;
      if (detail?.owner === owner) setSnapshot({ owner, bond: detail.bond });
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey(owner))
        setSnapshot({ owner, bond: readLocal(owner) });
    };
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [authLoading, owner, user]);

  const saveBond = useCallback(
    async (next: NovaBond) => {
      if (authLoading || !parseNovaBond(next))
        throw new Error("Nova is not ready to save yet.");
      const savingOwner = owner;
      if (user && isSupabaseConfigured) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        try {
          const { error } = await supabase
            .from("companion_bonds")
            .upsert(
              { user_id: savingOwner, bond: next },
              { onConflict: "user_id" },
            )
            .abortSignal(controller.signal);
          if (error)
            throw new Error("We couldn’t save your Nova. Please try again.");
        } finally {
          clearTimeout(timeout);
        }
      }
      if (ownerRef.current !== savingOwner)
        throw new Error("Your account changed. Please try again.");
      writeLocal(savingOwner, next);
      setSnapshot({ owner: savingOwner, bond: next });
      window.dispatchEvent(
        new CustomEvent(EVENT, { detail: { owner: savingOwner, bond: next } }),
      );
    },
    [authLoading, owner, user],
  );

  return { bond, loading: authLoading || loading, saveBond };
}

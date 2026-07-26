import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getProfileForAdminCheck, hasAdministratorRole } from "@/lib/admin-access";
import { AdminShell } from "../components/admin/AdminShell";
import "../components/admin/admin.css";
import type { AdminProfile } from "../lib/admin.types";

type AdminGuardState =
  | { status: "loading"; profile: null; queryError: string | null; redirectReason: string | null }
  | { status: "error"; profile: null; queryError: string; redirectReason: string | null }
  | { status: "ready"; profile: AdminProfile; queryError: null; redirectReason: null };

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const lastUserId = useRef<string | null>(null);
  const resolvedStatus = useRef<"ready" | "error" | null>(null);
  const [state, setState] = useState<AdminGuardState>({
    status: "loading",
    profile: null,
    queryError: null,
    redirectReason: null,
  });

  useEffect(() => {
    if (authLoading) {
      setState({
        status: "loading",
        profile: null,
        queryError: null,
        redirectReason: null,
      });
      return;
    }

    if (!user) {
      resolvedStatus.current = null;
      lastUserId.current = null;
      setState({
        status: "error",
        profile: null,
        queryError: "No authenticated Supabase user was found.",
        redirectReason: "no_authenticated_user",
      });
      void navigate({ to: "/admin/login", search: { denied: false }, replace: true });
      return;
    }

    const currentUserId = user.id;
    if (lastUserId.current === currentUserId && resolvedStatus.current) {
      return;
    }

    let cancelled = false;
    lastUserId.current = currentUserId;
    resolvedStatus.current = null;
    setState({
      status: "loading",
      profile: null,
      queryError: null,
      redirectReason: null,
    });

    void (async () => {
      let profile: AdminProfile | null = null;
      try {
        profile = await getProfileForAdminCheck(user.id);
      } catch (cause) {
        if (cancelled) return;
        const message = cause instanceof Error ? cause.message : "Profile query failed.";
        resolvedStatus.current = "error";
        setState({
          status: "error",
          profile: null,
          queryError: message,
          redirectReason: "profile_query_error",
        });
        return;
      }

      if (cancelled) return;

      const isAdmin = hasAdministratorRole(profile);
      const redirectReason = isAdmin ? null : "role_not_admin";

      console.log("[Admin Guard]", {
        userId: user?.id,
        email: user?.email,
        profile,
        role: profile?.role,
        normalizedRole: profile?.role?.trim().toLowerCase() ?? null,
        queryError: null,
        redirectReason,
        sessionPresent: !!session,
      });

      if (!profile) {
        resolvedStatus.current = "error";
        setState({
          status: "error",
          profile: null,
          queryError: "No profile row was returned for the authenticated user.",
          redirectReason: "missing_profile",
        });
        return;
      }

      if (!isAdmin) {
        resolvedStatus.current = "error";
        setState({
          status: "error",
          profile: null,
          queryError: `Role "${profile.role}" is not allowed to access /admin.`,
          redirectReason,
        });
        void navigate({
          to: "/admin/login",
          search: { denied: true },
          replace: true,
        });
        return;
      }

      resolvedStatus.current = "ready";
      setState({
        status: "ready",
        profile: profile as AdminProfile,
        queryError: null,
        redirectReason: null,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, navigate, session?.access_token, user?.id, user?.email]);

  if (state.status === "loading") {
    return (
      <div className="admin-root">
        <div className="admin-layout">
          <div className="admin-main">
            <div className="admin-content">
              <div className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <h2>Loading admin access…</h2>
                    <p>Checking your Supabase session and profile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="admin-root">
        <div className="admin-layout">
          <div className="admin-main">
            <div className="admin-content">
              <div className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <h2>Admin access check failed</h2>
                    <p>This account could not be validated as an admin.</p>
                  </div>
                </div>
                <div style={{ padding: "0 20px 20px", color: "var(--muted)", fontSize: 13 }}>
                  <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {`userId: ${user?.id ?? "n/a"}
email: ${user?.email ?? "n/a"}
profile: n/a
queryError: ${state.queryError}
redirectReason: ${state.redirectReason ?? "n/a"}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminShell profile={state.profile}>
      <Outlet />
    </AdminShell>
  );
}

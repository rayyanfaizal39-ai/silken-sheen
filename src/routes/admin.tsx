import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { getAdminProfile } from './-admin.server';
import { AdminShell } from '../components/admin/AdminShell';
import '../components/admin/admin.css';

// Layout route for everything under /admin.
// The guard runs on the server (beforeLoad → server function) BEFORE any admin
// UI or data is sent to the browser. A non-admin never receives the page.
const DEV_BYPASS = import.meta.env.DEV;

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    // In development, skip auth so the dashboard is viewable without a Supabase account.
    if (DEV_BYPASS) {
      return {
        adminProfile: {
          id: 'dev',
          full_name: 'Dev Admin',
          email: 'dev@localhost',
          role: 'admin' as const,
          plan: 'free' as const,
        },
      };
    }

    let profile = null;
    try {
      profile = await getAdminProfile();
    } catch (e) {
      console.error('[admin] getAdminProfile failed:', e);
    }

    if (!profile || profile.role !== 'admin') {
      throw redirect({ to: '/' });
    }
    return { adminProfile: profile };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { adminProfile } = Route.useRouteContext();
  return (
    <AdminShell profile={adminProfile}>
      <Outlet />
    </AdminShell>
  );
}

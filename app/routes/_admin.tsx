import { Outlet } from "@remix-run/react";
import AppShell from "~/components/AppShell";
export default function AdminLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

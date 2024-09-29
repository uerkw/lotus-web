import { Outlet } from "@remix-run/react";
import AppShell from "~/components/AppShell";
export default function PublicLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

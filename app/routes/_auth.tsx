import { Outlet } from "@remix-run/react";
import AppShell from "~/components/AppShell";
export default function AuthLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

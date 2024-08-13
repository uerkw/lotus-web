import { PropsWithChildren, useState } from "react";
import DesktopHeader from "./nav/DesktopHeader";
import MobileDropdownMenu from "./nav/MobileDropdownMenu";

export default function AppShell({ children }: PropsWithChildren) {
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center font-geist text-white bg-slate-900 h-screen p-4">
        <DesktopHeader isOpen={navIsOpen} setIsOpen={setNavIsOpen} />

        <MobileDropdownMenu isOpen={navIsOpen} />

        {children}
      </div>
    </>
  );
}

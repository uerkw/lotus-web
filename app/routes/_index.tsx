import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import MobileDropdownMenu from "~/components/nav/MobileDropdownMenu";
import HeroContent from "~/components/home/HeroContent";
import DesktopHeader from "~/components/nav/DesktopHeader";
import { TaijituSpin } from "~/components/home/TaijituSpin";
export const meta: MetaFunction = () => {
  return [
    { title: "Dying Lotus" },
    {
      name: "description",
      content:
        "The chillest philosophy server on Discord. Daoists, Buddhists, Hindus, Christians, and more all find a home here. Come help us walk each other home.",
    },
  ];
};

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center font-geist text-white bg-slate-900 h-screen p-4">
      <DesktopHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      <MobileDropdownMenu isOpen={isOpen} />

      <TaijituSpin />

      <HeroContent />
    </div>
  );
}

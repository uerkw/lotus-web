import type { MetaFunction } from "@remix-run/node";
import HeroContent from "~/components/home/HeroContent";
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
  return (
    <>
      <TaijituSpin />
      <HeroContent />
    </>
  );
}

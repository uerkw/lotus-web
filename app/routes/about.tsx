import { MetaFunction } from "@remix-run/react";
import AppShell from "~/components/AppShell";

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

function About() {
  return (
    <AppShell>
      <div className="container justify-start items-start">
        <h1 className="text-4xl font-bold text-white">
          Start MDX content here
        </h1>
      </div>
    </AppShell>
  );
}

export default About;

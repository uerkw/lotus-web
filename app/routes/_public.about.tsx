import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Dying Lotus - About" },
    {
      name: "description",
      content:
        "The chillest philosophy server on Discord. Daoists, Buddhists, Hindus, Christians, and more all find a home here. Come help us walk each other home.",
    },
  ];
};

function About() {
  return (
    <div className="container justify-start items-start">
      <h1 className="text-4xl font-bold text-white">Start MDX content here</h1>
    </div>
  );
}

export default About;

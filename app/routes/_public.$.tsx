import { json, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "404 - Dying Lotus" },
    {
      name: "description",
      content:
        "The chillest philosophy server on Discord. Daoists, Buddhists, Hindus, Christians, and more all find a home here. Come help us walk each other home.",
    },
  ];
};

export const loader = async () => {
  return json(null, { status: 404 });
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-6xl font-bold">404</div>
      <div className="text-2xl">Page not found</div>
    </div>
  );
}

import { json } from "@remix-run/react";

export const loader = async () => {
  return json(null, { status: 404 });
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold">404</div>
      <div className="text-2xl">Page not found</div>
    </div>
  );
}

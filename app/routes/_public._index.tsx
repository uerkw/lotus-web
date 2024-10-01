import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import HeroContent from "~/components/home/HeroContent";
import { TaijituSpin } from "~/components/home/TaijituSpin";
import { validateAuth } from "~/lib/auth.server";

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

export async function loader({ request }: LoaderFunctionArgs) {
  // Call the Lucia Auth handler to validate the session
  const newResponse = new Response();
  const validatedAuthResult = await validateAuth(request, newResponse);
  console.log(validatedAuthResult);

  // Now we can access the validatedAuthResult object's members safely
  const { user } = validatedAuthResult;

  // Show user if logged in
  return json({ username: user?.username });
}

export default function Index() {
  const { username } = useLoaderData<typeof loader>();

  return (
    <>
      <TaijituSpin />
      <HeroContent />
      {username ? (
        <>
          <h1>Hello `{username}` 👋</h1>
          <Form action="/logout" method="post">
            <button type="submit">Logout</button>
          </Form>
        </>
      ) : (
        <h1>You are not logged in!</h1>
      )}
    </>
  );
}

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { signup } from "./action.server";

export const meta: MetaFunction = () => {
  return [{ title: "Dying Lotus - Sign up" }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  if (context.session) {
    throw redirect("/");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  return await signup(request);
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <h1>Create an account</h1>
      <Form method="post">
        <label htmlFor="username">Username</label>
        <input name="username" id="username" className="text-black" />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-black"
        />
        <br />
        <p>{actionData?.error}</p>
        <br />
        <button type="submit">Continue</button>
      </Form>
      <Link to="/login">Sign in</Link>
    </>
  );
}

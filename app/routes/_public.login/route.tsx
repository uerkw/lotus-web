import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { login } from "./action.server";

export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  if (context.session) {
    throw redirect("/");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  return await login(request);
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <h1>Sign in</h1>
      <Form method="post">
        <label htmlFor="username" className="mr-2">
          Username
        </label>
        <input name="username" id="username" className="text-black" />
        <br />
        <label htmlFor="password" className="mr-2">
          Password
        </label>
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
      <Link to="/signup">Sign up</Link>
    </>
  );
}

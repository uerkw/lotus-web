import { json, redirect } from "@remix-run/node";
import { Argon2id } from "oslo/password";
import { lucia } from "~/lib/auth.server";
import { db } from "~/drizzle/db.server";
import { userTable } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";

export async function login(request: Request) {
  const formData = await request.formData();

  const username = formData.get("username");

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return json({
      error: "Invalid username",
    });
  }

  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return json({
      error: "Invalid password",
    });
  }

  // Database lookup to find user
  const [existingUser] = await db
    .select({
      id: userTable.id,
      username: userTable.username,
      passwordHash: userTable.passwordHash,
    })
    .from(userTable)
    .where(eq(userTable.username, username));

  if (!existingUser) {
    return json({
      error: "Incorrect username or password",
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.passwordHash,
    password
  );

  if (!validPassword) {
    return json({
      error: "Incorrect username or password",
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

import { json, redirect } from "@remix-run/node";
import { Argon2id } from "oslo/password";
import { lucia } from "~/lib/auth.server";
import { db } from "~/drizzle/db.server";
import { userTable } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";

export async function signup(request: Request) {
  const formData = await request.formData();

  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
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

  const hashedPassword = await new Argon2id().hash(password);

  // Done automatically by the Drizzle/Lucia
  //const userId = generateId(15);

  // Check if user already exists
  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.username, username),
  });

  if (existingUser) {
    return json({
      error: "Username already used",
    });
  }

  try {
    // Database insert to create user
    const [newUser] = await db
      .insert(userTable)
      .values({
        passwordHash: hashedPassword,
        username: username,
      })
      .returning({
        id: userTable.id,
      });
    ////

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return redirect("/", {
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    // TODO: Handle specific database errors
    return json({
      error: "An unknown error occurred",
    });
  }
}

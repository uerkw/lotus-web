import { Lucia, Session, User, verifyRequestOrigin } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "~/drizzle/db.server";
import { sessionTable, userTable } from "~/drizzle/schema.server";
import { redirect } from "@remix-run/react";
import { parseCookies } from "oslo/cookie";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "dying_lotus_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

export async function logout(request: Request) {
  const cookies = request.headers.get("cookie");
  const sessionId = parseCookies(cookies || "").get(lucia.sessionCookieName);

  if (!sessionId) {
    return redirect("/login");
  }

  await lucia.invalidateSession(sessionId);

  return destroySession();
}

export function destroySession() {
  const sessionCookie = lucia.createBlankSessionCookie();

  return redirect("/login", {
    headers: {
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

interface ValidateAuthObject {
  user: User | null;
  session: Session | null;
}

export async function validateAuth(request: Request, response: Response) {
  // Structure return object:
  const returnObject: ValidateAuthObject = {
    user: null,
    session: null,
  };

  // Check for CSRF
  if (process.env.NODE_ENV === "production") {
    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("Host");
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      throw new Response(null, { status: 403 });
    }
  }

  // Read session cookie
  const sessionId = parseCookies(request.headers.get("cookie") || "").get(
    lucia.sessionCookieName
  );

  if (!sessionId) {
    returnObject.user = null;
    returnObject.session = null;
    return returnObject;
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);

    response.headers.set("Set-Cookie", sessionCookie.serialize());
  }

  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie();

    response.headers.set("Set-Cookie", sessionCookie.serialize());
  }

  return result;
}

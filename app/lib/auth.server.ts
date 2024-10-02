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
  headers: {
    "Set-Cookie": string | null;
  };
  user: User | null;
  session: Session | null;
}

export async function validateAuth(request: Request) {
  // Structure return object:
  const returnObject: ValidateAuthObject = {
    headers: {
      "Set-Cookie": null,
    },
    user: null,
    session: null,
  };

  // Check for CSRF
  if (process.env.ENABLE_CSRF === "true") {
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

  // If we have no session cookie, we return null for the user immediately
  if (!sessionId) {
    returnObject.user = null;
    returnObject.session = null;
    return returnObject;
  }

  const luciaResult = await lucia.validateSession(sessionId);

  // Handle case where session has been updated, 'session.fresh' is true
  if (luciaResult.session && luciaResult.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(luciaResult.session.id);

    //response.headers.set("Set-Cookie", sessionCookie.serialize());
    returnObject.headers["Set-Cookie"] = sessionCookie.serialize();
  }

  // Handle case where we have read a session, but we don't have a match in the DB
  // This case is essentially where the user submitted a bad session cookie.
  // This matches the cases of altered cookies, expired sessions in DB, or non-existent sessions in DB
  if (!luciaResult.session) {
    const sessionCookie = lucia.createBlankSessionCookie();

    // response.headers.set("Set-Cookie", sessionCookie.serialize());
    returnObject.headers["Set-Cookie"] = sessionCookie.serialize();
  }

  returnObject.user = luciaResult.user;
  returnObject.session = luciaResult.session;

  return returnObject;
}

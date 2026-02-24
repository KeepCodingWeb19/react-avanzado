import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const AUTH_COOKIE_NAME = "session-token";
const COOKIE_EXPIRE_SECONDS = 60 * 60 * 24;

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_EXPIRE_SECONDS}s`)
    .sign(secret)

  console.log("[createSession] Token created:", token);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_EXPIRE_SECONDS
  });
}

type SessionUser = {
  userId: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) {
    return null;
  }

  // Validar token
  console.log("[auth] getSession", { token });

  const { payload } = await jwtVerify(token.value, secret);

  return {
    userId: payload.userId as string
  }
}
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day

function getEnvVar(name: string): string | undefined {
  return process.env[name];
}

function getExpectedToken(value: string): string {
  const secret = getEnvVar("ADMIN_COOKIE_SECRET");
  if (!secret) {
    throw new Error("ADMIN_COOKIE_SECRET is not configured.");
  }
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = getEnvVar("ADMIN_USERNAME");
  const expectedPassword = getEnvVar("ADMIN_PASSWORD");
  if (!expectedUsername || !expectedPassword) {
    return false;
  }
  return username === expectedUsername && password === expectedPassword;
}

export function getAdminAuthToken(): string {
  const username = getEnvVar("ADMIN_USERNAME");
  const password = getEnvVar("ADMIN_PASSWORD");
  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured.");
  }
  return getExpectedToken(`${username}:${password}`);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;
    if (!cookie) return false;

    const expected = getAdminAuthToken();
    const cookieBuffer = Buffer.from(cookie);
    const expectedBuffer = Buffer.from(expected);

    if (cookieBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(cookieBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function getAdminCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: getAdminAuthToken(),
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  };
}

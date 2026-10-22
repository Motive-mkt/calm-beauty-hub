import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "cbh_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const enc = new TextEncoder();

function secret() {
  const s = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD is not set.");
  return s;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Buffer.from(sig).toString("base64url");
}

function safeEqual(a: string, b: string) {
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  const token = `${exp}.${await sign(exp)}`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(exp));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "sr_admin_session";
const SESSION_SECRET = process.env.ADMIN_JWT_SECRET || "sr_college_dhls_super_secure_session_key_2026";

// Web Crypto PBKDF2 Password Hashing
export async function hashPassword(password: string, saltHex?: string): Promise<{ hash: string; salt: string }> {
  const enc = new TextEncoder();
  const salt = saltHex
    ? hexToBytes(saltHex)
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  return {
    hash: bytesToHex(new Uint8Array(derivedBits)),
    salt: bytesToHex(salt),
  };
}

export async function verifyPassword(password: string, storedHash: string, storedSalt: string): Promise<boolean> {
  const result = await hashPassword(password, storedSalt);
  return result.hash === storedHash;
}

// HMAC-SHA256 Session Token Generation
export async function createSessionToken(username: string): Promise<string> {
  const enc = new TextEncoder();
  const payload = JSON.stringify({
    username,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  const payloadB64 = btoa(payload);

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
  const signatureHex = bytesToHex(new Uint8Array(signature));

  return `${payloadB64}.${signatureHex}`;
}

export async function verifySessionToken(token: string): Promise<{ valid: boolean; username?: string }> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };

    const [payloadB64, signatureHex] = parts;
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      hexToBytes(signatureHex) as BufferSource,
      enc.encode(payloadB64)
    );

    if (!valid) return { valid: false };

    const payload = JSON.parse(atob(payloadB64));
    if (payload.exp < Date.now()) {
      return { valid: false };
    }

    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

// Server-side Route Authorization Check
export async function checkAdminAuth(request: NextRequest): Promise<{ authorized: boolean; username?: string }> {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) {
    return { authorized: false };
  }

  const result = await verifySessionToken(cookie.value);
  if (!result.valid) {
    return { authorized: false };
  }

  return { authorized: true, username: result.username };
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// Utilities
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

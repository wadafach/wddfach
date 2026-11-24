import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Login admin.
 *
 * MVP: satu kata sandi dari environment variable, dicek di server
 * (jadi tidak pernah ikut terkirim ke browser). Sesi berupa cookie
 * HTTP-only berisi token turunan hash — bukan kata sandinya sendiri.
 *
 * Setelah Supabase dipasang, ganti isi route ini dengan Supabase Auth.
 * Struktur file-nya sengaja dipisah supaya penggantian itu nggak
 * nyentuh UI admin.
 */

const COOKIE = "wddfach_admin";

/** Token sesi = hash dari password + salt. Tidak reversibel, dan
 *  otomatis tidak valid lagi kalau password diganti. */
async function sessionToken(password: string) {
  const data = new TextEncoder().encode(`wddfach::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const given = (body.password ?? "").trim();
  if (!given) {
    return NextResponse.json({ ok: false, code: "empty" }, { status: 400 });
  }

  // perbandingan waktu-konstan sederhana, supaya tidak bocor lewat timing
  const a = new TextEncoder().encode(given);
  const b = new TextEncoder().encode(expected);
  let diff = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);

  if (diff !== 0) {
    // jeda kecil untuk memperlambat brute force sederhana
    await new Promise((r) => setTimeout(r, 450));
    return NextResponse.json({ ok: false, code: "wrong" }, { status: 401 });
  }

  const token = await sessionToken(expected);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 jam
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE);
  return NextResponse.json({ ok: true });
}

export { COOKIE as ADMIN_COOKIE, sessionToken as adminSessionToken };

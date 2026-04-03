import { NextResponse } from "next/server";
import { validateAdminCredentials, getAdminCookieOptions } from "@/src/lib/adminAuth";

export async function POST(request: Request) {
  const body = await request.json();
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username dan password admin harus diisi." }, { status: 400 });
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(getAdminCookieOptions());
  return response;
}

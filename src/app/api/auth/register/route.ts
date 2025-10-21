import { NextResponse } from "next/server";
import { createUser, hashPassword, createSession, createSessionToken, cookieFor } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    if (!name || !email || password.length < 6) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const passwordHash = await hashPassword(password);
    const user = await createUser(name, email, passwordHash);
    const { raw, hash } = createSessionToken();
    const ua = (req.headers.get('user-agent') || '').slice(0,255);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || undefined;
    const { expires } = await createSession(user.id, hash, ip, ua);
    const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
    res.headers.append('Set-Cookie', cookieFor(raw, expires));
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}



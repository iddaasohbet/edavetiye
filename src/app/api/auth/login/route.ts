import { NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, createSessionToken, createSession, cookieFor } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const user = await findUserByEmail(email);
    if (!user) return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    if (user.status !== 'active') return NextResponse.json({ ok: false, error: "inactive" }, { status: 403 });
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
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



import { NextResponse } from "next/server";
import { revokeSession } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const m = /ed_session=([^;]+)/.exec(cookie);
    if (m) {
      const token = m[1];
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      await revokeSession(hash);
    }
    const res = NextResponse.json({ ok: true });
    res.headers.append('Set-Cookie', 'ed_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}



import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const m = /ed_session=([^;]+)/.exec(cookie);
    if (!m) return NextResponse.json({ ok: true, user: null });
    const token = m[1];
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const db = getDb();
    const [rows] = await db.query(
      `SELECT u.id,u.name,u.email FROM auth_sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash=? AND s.revoked_at IS NULL AND s.expires_at > NOW() LIMIT 1`, [hash]
    );
    const user = Array.isArray(rows) && rows.length ? (rows as any)[0] : null;
    return NextResponse.json({ ok: true, user });
  } catch {
    return NextResponse.json({ ok: true, user: null });
  }
}



import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getDb } from "./db";

export async function hashPassword(plain: string) {
  return await bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

export function createSessionToken() {
  const raw = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

export async function findUserByEmail(email: string) {
  const db = getDb();
  const [rows] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
  return Array.isArray(rows) && rows.length ? (rows as any)[0] : null;
}

export async function createUser(name: string, email: string, passwordHash: string) {
  const db = getDb();
  const [r] = await db.query("INSERT INTO users (name,email,password_hash,status) VALUES (?,?,?,'active')", [name, email, passwordHash]);
  // @ts-ignore
  return { id: r.insertId, name, email };
}

export async function createSession(userId: number, tokenHash: string, ip?: string, ua?: string) {
  const db = getDb();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 gün
  await db.query("INSERT INTO auth_sessions (user_id, token_hash, ip, user_agent, expires_at) VALUES (?,?,?,?,?)",
    [userId, tokenHash, ip || null, ua || null, expires]);
  return { expires };
}

export async function revokeSession(tokenHash: string) {
  const db = getDb();
  await db.query("UPDATE auth_sessions SET revoked_at = NOW() WHERE token_hash = ?", [tokenHash]);
}

export function cookieFor(token: string, expires: Date) {
  const cookie = `ed_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires.toUTCString()}`;
  return cookie;
}



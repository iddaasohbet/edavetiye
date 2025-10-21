import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Invite = {
  bride: string; groom: string; type: string; date: string; dateText: string; locationText: string; bgUrl: string; messageText: string; noteText: string; createdAt: string; slug?: string;
  accentColor?: string; textColor?: string; fontFamily?: string; nameScale?: number; letterSpacing?: number; lineHeight?: number; radius?: number; countdownScale?: number; uppercaseEvent?: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "invites.json");

async function readAll(): Promise<Invite[]> {
  try {
    const buf = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(buf);
  } catch {
    return [];
  }
}

async function writeAll(list: Invite[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

function generateSlug(len = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Invite;
    const list = await readAll();
    let slug = generateSlug();
    const existing = new Set(list.map((i) => i.slug));
    while (existing.has(slug)) slug = generateSlug();
    const record: Invite = { ...body, slug };
    list.unshift(record);
    await writeAll(list);
    return NextResponse.json({ ok: true, slug, url: `/v/${slug}` });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}



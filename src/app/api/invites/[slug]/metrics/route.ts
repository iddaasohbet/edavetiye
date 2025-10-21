import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Metrics = {
  likes: number;
  dislikes: number;
  yes: number;
  no: number;
  downloads: number;
  rsvps: { name: string; status: "yes" | "no"; at: string }[];
  ip: { like: string[]; dislike: string[]; rsvp: string[]; download: string[] };
};

type Store = Record<string, Metrics>;

const DATA_DIR = path.join(process.cwd(), "data");
const METRICS_FILE = path.join(DATA_DIR, "metrics.json");

async function readStore(): Promise<Store> {
  try {
    const buf = await fs.readFile(METRICS_FILE, "utf8");
    return JSON.parse(buf);
  } catch {
    return {} as Store;
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(METRICS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "0.0.0.0";
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const store = await readStore();
  const m = store[params.slug] || {
    likes: 0,
    dislikes: 0,
    yes: 0,
    no: 0,
    downloads: 0,
    rsvps: [],
    ip: { like: [], dislike: [], rsvp: [], download: [] },
  } as Metrics;
  return NextResponse.json(m);
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const store = await readStore();
  const slug = params.slug;
  const ip = getIp(req);
  const body = await req.json().catch(() => ({}));
  const type = body?.type as string;
  const name = String(body?.name || "").slice(0, 100);
  const status = body?.status as "yes" | "no" | undefined;

  let m: Metrics = store[slug] || {
    likes: 0,
    dislikes: 0,
    yes: 0,
    no: 0,
    downloads: 0,
    rsvps: [],
    ip: { like: [], dislike: [], rsvp: [], download: [] },
  };

  if (type === "like") {
    if (m.ip.like.includes(ip) || m.ip.dislike.includes(ip)) return NextResponse.json({ ok: false, error: "already_voted" }, { status: 409 });
    m.likes += 1; m.ip.like.push(ip);
  } else if (type === "dislike") {
    if (m.ip.like.includes(ip) || m.ip.dislike.includes(ip)) return NextResponse.json({ ok: false, error: "already_voted" }, { status: 409 });
    m.dislikes += 1; m.ip.dislike.push(ip);
  } else if (type === "rsvp") {
    if (m.ip.rsvp.includes(ip)) return NextResponse.json({ ok: false, error: "already_rsvp" }, { status: 409 });
    if (status === "yes") m.yes += 1; else if (status === "no") m.no += 1; else return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    m.ip.rsvp.push(ip);
    if (name) m.rsvps.unshift({ name, status: status!, at: new Date().toISOString() });
  } else if (type === "download") {
    if (!m.ip.download.includes(ip)) { m.downloads += 1; m.ip.download.push(ip); }
  } else {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }

  store[slug] = m;
  await writeStore(store);
  return NextResponse.json({ ok: true, metrics: m });
}



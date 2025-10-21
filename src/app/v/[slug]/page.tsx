import { promises as fs } from "fs";
import path from "path";
import TemplateDemo from "../../components/TemplateDemo";
import PublicInviteClient from "../../components/PublicInviteClient";

type Invite = {
  bride: string; groom: string; type: string; date: string; dateText: string; locationText: string; bgUrl: string; messageText: string; noteText: string; createdAt: string; slug: string;
  accentColor?: string; textColor?: string; fontFamily?: string; nameScale?: number; letterSpacing?: number; lineHeight?: number; radius?: number; countdownScale?: number; uppercaseEvent?: boolean;
};

export default async function PublicInviteBySlug({ params }: { params: { slug: string } }) {
  const DATA_FILE = path.join(process.cwd(), "data", "invites.json");
  let list: Invite[] = [];
  try {
    const buf = await fs.readFile(DATA_FILE, "utf8");
    list = JSON.parse(buf);
  } catch {}
  const iv = list.find((i) => i.slug === params.slug);
  if (!iv) {
    return <div className="mx-auto max-w-2xl px-6 py-16 text-center"><h1 className="text-2xl font-semibold">Davet bulunamadı</h1></div>;
  }
  const url = `https://` + (process.env.VERCEL_URL || 'localhost:3000') + `/v/${params.slug}`;
  return <PublicInviteClient data={iv as any} shareUrl={url} />;
}



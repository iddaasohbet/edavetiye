"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import TemplateDemo from "../components/TemplateDemo";
import PublicInviteClient from "../components/PublicInviteClient";

export default function PublicInvitePage() {
  const params = useSearchParams();
  const router = useRouter();
  const encoded = params?.get("p") || "";
  const data = useMemo(() => {
    try {
      let json = "";
      if (typeof window !== 'undefined' && (window as any).atob) {
        // UTF‑8 safe base64 decode
        json = decodeURIComponent(escape(atob(encoded)));
      } else {
        // @ts-ignore
        json = Buffer.from(encoded, 'base64').toString('utf-8');
      }
      return JSON.parse(json);
    } catch {
      return null;
    }
  }, [encoded]);

  const [redirecting, setRedirecting] = useState(false);

  // If this encoded link doesn't have a slug yet, create one and redirect to /v/[slug]
  useEffect(() => {
    (async () => {
      if (!data) return;
      if ((data as any).slug) return; // already slugified
      try {
        setRedirecting(true);
        const res = await fetch('/api/invites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, createdAt: new Date().toISOString() }) });
        const json = await res.json();
        if (json?.slug) {
          router.replace(`/v/${json.slug}`);
        } else {
          setRedirecting(false);
        }
      } catch { setRedirecting(false); }
    })();
  }, [data, router]);

  if (!data || redirecting) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Yükleniyor…</h1>
        <p className="mt-2 text-white/70">Davet linki hazırlanıyor…</p>
      </div>
    );
  }

  // Forward ALL styling/options so public page preserves user's choices
  const props = data as any;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  return <PublicInviteClient data={props} shareUrl={url} />;
}



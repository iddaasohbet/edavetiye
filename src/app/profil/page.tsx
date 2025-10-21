"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function toBase64Utf8(input: string) {
  try {
    if (typeof window !== 'undefined' && window.btoa) {
      // Encode UTF-8 safely for btoa
      return btoa(unescape(encodeURIComponent(input)));
    }
  } catch {}
  // Fallback (SSR)
  // @ts-ignore
  return Buffer.from(input, 'utf-8').toString('base64');
}

type Invite = {
  bride: string; groom: string; type: string; date: string; dateText: string; locationText: string; bgUrl: string; messageText: string; noteText: string; createdAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("demo_user");
      setUser(raw ? JSON.parse(raw) : null);
      const inv = localStorage.getItem("demo_invites");
      setInvites(inv ? JSON.parse(inv) : []);
    } catch {}
    const onChange = () => {
      try {
        const inv = localStorage.getItem("demo_invites");
        setInvites(inv ? JSON.parse(inv) : []);
      } catch {}
    };
    window.addEventListener("invites:changed", onChange as EventListener);
    return () => window.removeEventListener("invites:changed", onChange as EventListener);
  }, []);

  const empty = invites.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Profil</h1>
          <p className="text-white/70">{user ? user.name : "Misafir"} {user?.email ? `• ${user.email}` : ""}</p>
        </div>
        <Link href="/olustur" className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-700">Yeni Davetiye</Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Davetiyelerim</h2>
        {empty ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-card p-6 text-white/70">Henüz davetiye oluşturmadınız.</div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {invites.map((iv, i) => (
              <article key={i} className="overflow-hidden rounded-xl border border-white/10 bg-card">
                <div className="aspect-[4/3] relative">
                  {/* simple image preview */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={iv.bgUrl} alt="bg" className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium">{iv.bride} & {iv.groom} • {iv.type}</div>
                  <div className="text-xs text-white/70 mt-1">{iv.dateText}</div>
                  <div className="text-xs text-white/70">{iv.locationText}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/olustur/builder`} className="inline-flex h-8 items-center rounded-md border border-white/15 px-3 text-xs text-white/90 hover:bg-white/5">Düzenle</Link>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(iv.locationText)}`} target="_blank" className="inline-flex h-8 items-center rounded-md border border-white/15 px-3 text-xs text-white/90 hover:bg-white/5">Konuma Git</a>
                    <a
                      href={iv as any && (iv as any).slug ? `/v/${(iv as any).slug}` : `/v?p=${encodeURIComponent(toBase64Utf8(JSON.stringify(iv)))}`}
                      target="_blank"
                      className="inline-flex h-8 items-center rounded-md bg-brand px-3 text-xs font-semibold text-white hover:bg-brand-700"
                    >Paylaş</a>
                    <button
                      onClick={() => {
                        try {
                          const link = (iv as any && (iv as any).slug)
                            ? `${location.origin}/v/${(iv as any).slug}`
                            : `${location.origin}/v?p=${encodeURIComponent(toBase64Utf8(JSON.stringify(iv)))}`;
                          navigator.clipboard.writeText(link);
                          alert('Paylaşım linki kopyalandı');
                        } catch {}
                      }}
                      className="inline-flex h-8 items-center rounded-md border border-white/15 px-3 text-xs text-white/90 hover:bg-white/5"
                    >Linki Kopyala</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



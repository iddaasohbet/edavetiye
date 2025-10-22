"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TemplateDemo from "./TemplateDemo";

type Template = {
  id: string;
  title: string;
  category: string;
  image?: string;
};

type Props = {
  templates: Template[];
};

export default function TemplateGrid({ templates }: Props) {
  const [preview, setPreview] = useState<null | Template>(null);
  const params = useSearchParams();
  const showAll = (params?.get("all") ?? "") !== "";
  // Show 2 x 3 on mobile for full, clean layout
  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(templates.length / perPage));
  const [page, setPage] = useState(0);
  const pauseRef = useRef(false);
  const badgeById: Record<string, { label: string; color: string }> = {
    "t-marble": { label: "Yeni", color: "bg-emerald-600" },
    "t-rings": { label: "Popüler", color: "bg-rose-600" },
    "t-goldarch": { label: "Klasik", color: "bg-slate-700" },
    "t-goldgrid": { label: "Premium", color: "bg-amber-600" },
    "t-goldleaf": { label: "Çok Satan", color: "bg-fuchsia-600" },
    "t-goldpanel": { label: "Trend", color: "bg-indigo-600" },
    "t-goldblue": { label: "Modern", color: "bg-cyan-700" },
    "t-calla": { label: "Yeni", color: "bg-emerald-700" },
    "t-crystal": { label: "Klasik", color: "bg-slate-800" },
    "t-bluegold": { label: "Popüler", color: "bg-rose-700" },
    "t-leaf": { label: "Doğal", color: "bg-green-700" },
    "t-berrywreath": { label: "Trend", color: "bg-indigo-700" },
    "t-sage": { label: "Yeni", color: "bg-teal-700" },
    "t-silverrings": { label: "Klasik", color: "bg-zinc-700" },
    "t-whitegold": { label: "Premium", color: "bg-amber-700" },
    "t-crescent": { label: "Yeni", color: "bg-emerald-600" },
  };
  const fallbackBadges: { label: string; color: string }[] = [
    { label: "Yeni", color: "bg-emerald-600" },
    { label: "Popüler", color: "bg-rose-600" },
    { label: "Çok Satan", color: "bg-amber-600" },
    { label: "Trend", color: "bg-indigo-600" },
    { label: "Premium", color: "bg-fuchsia-600" },
    { label: "Klasik", color: "bg-slate-700" },
  ];

  // Auto-rotate pages
  useEffect(() => {
    if (totalPages <= 1) return;
    const id = setInterval(() => {
      if (!pauseRef.current) {
        setPage((p) => (p + 1) % totalPages);
      }
    }, 4500);
    return () => clearInterval(id);
  }, [totalPages]);

  const visible = useMemo(() => {
    if (showAll) return templates;
    const start = page * perPage;
    return templates.slice(start, start + perPage);
  }, [page, templates, showAll]);

  return (
    <div id="sablonlar" className="mx-auto max-w-7xl px-6 py-12">
      {/* Üst başlık ve açıklama kaldırıldı */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        {visible.map((t, i) => (
          <article key={`${page}-${t.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_8px_24px_rgba(0,0,0,.25)] hover:border-white/20 hover:shadow-[0_12px_28px_rgba(0,0,0,.3)] transition-all">
            <div className="relative aspect-[9/14] overflow-hidden">
              {/* Sol kenar rozet */}
              {(() => {
                const b = badgeById[t.id] || fallbackBadges[i % fallbackBadges.length];
                return (
                  <div className="absolute left-0 top-3 z-10">
                    <span className={`inline-flex items-center rounded-r-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-white/20 ${b.color}`}>
                      {b.label}
                    </span>
                  </div>
                );
              })()}
              {/* Sadece statik görsel göster - yazılar tamamen kaldırıldı */}
              <Image
                src={t.image || "https://altinbilgi.com/sablonlar.png"}
                alt={t.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
                priority
              />
            </div>
            <div className="p-3">
              <a href={`/olustur/${encodeURIComponent(t.id)}`} className="group/btn relative inline-flex w-full h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-rose-600 to-brand bg-[length:200%_100%] text-white text-sm font-semibold shadow-lg shadow-brand/30 transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-brand/50 hover:scale-[1.02] active:scale-[0.98]">
                <span>Bu şablonla oluştur</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {!showAll && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Sayfa ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === page ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      )}

      {false && preview && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-card">
            <button
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 rounded-md border border-white/15 bg-black/30 px-2 py-1 text-xs text-white/80 hover:bg-black/40"
              aria-label="Kapat"
            >
              Kapat
            </button>
            <TemplateDemo template={preview} brideName="Elif" groomName="Mert" eventType="Düğün" dateTime="2026-08-24T19:00:00+03:00" />
            <div className="p-4">
              <div className="text-sm font-medium">{preview.title}</div>
              <div className="mt-1 text-xs text-white/60">{preview.category}</div>
              <div className="mt-4 flex gap-2">
                <a href="/olustur" className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-white hover:bg-brand-700">Bu şablonla oluştur</a>
                <button onClick={() => setPreview(null)} className="inline-flex h-10 items-center rounded-md border border-white/15 px-4 text-sm text-white/90 hover:bg-white/5">Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



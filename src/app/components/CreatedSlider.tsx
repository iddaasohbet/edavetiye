"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import TemplateDemo from "./TemplateDemo";

type Item = {
  slug?: string;
  bgUrl?: string;
  title?: string;
  bride?: string; groom?: string; type?: string; date?: string; dateText?: string; locationText?: string;
  accentColor?: string; textColor?: string; fontFamily?: string; nameScale?: number; letterSpacing?: number; lineHeight?: number; radius?: number; countdownScale?: number; uppercaseEvent?: boolean;
};

export default function CreatedSlider({ items }: { items: Item[] }) {
  // only one per unique background
  const data = (() => {
    const seen = new Set<string>();
    const out: Item[] = [];
    for (const it of items) {
      if (!it.bgUrl) continue;
      if (seen.has(it.bgUrl)) continue;
      seen.add(it.bgUrl);
      out.push(it);
    }
    return out;
  })();
  if (data.length === 0) return null;
  const perPage = 4;
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const [page, setPage] = useState(0);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (totalPages <= 1) return;
    const id = setInterval(() => { if (!pauseRef.current) setPage((p) => (p + 1) % totalPages); }, 4500);
    return () => clearInterval(id);
  }, [totalPages]);

  const visible = useMemo(() => {
    const start = page * perPage;
    return data.slice(start, start + perPage);
  }, [page, data]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Oluşturulan Şablonlar</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" onMouseEnter={()=>pauseRef.current=true} onMouseLeave={()=>pauseRef.current=false}>
        {visible.map((it, idx) => (
          <article key={`${page}-${idx}`} className="rounded-xl border border-white/10 bg-card p-2">
            <div className="relative aspect-[9/16] w-full bg-white rounded-lg overflow-hidden">
              <TemplateDemo
                template={{ id: it.slug || `ex-${idx}`, title: it.title || '', category: it.type || 'Düğün' }}
                brideName={it.bride}
                groomName={it.groom}
                eventType={it.type}
                dateTime={it.date}
                dateText={it.dateText}
                locationText={it.locationText}
                orientation="portrait"
                backgroundUrl={it.bgUrl}
                messageText={""}
                noteText={""}
                accentColor={it.accentColor}
                textColor={it.textColor}
                fontFamily={it.fontFamily}
                nameScale={it.nameScale}
                letterSpacing={it.letterSpacing}
                lineHeight={it.lineHeight}
                radius={it.radius}
                countdownScale={it.countdownScale}
                uppercaseEvent={it.uppercaseEvent}
              />
            </div>
            <div className="mt-2 flex gap-2">
              {it.slug ? (
                <a href={`/v/${it.slug}`} className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-700">Görüntüle</a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={()=>setPage(i)} aria-label={`Sayfa ${i+1}`} className={`h-2.5 w-2.5 rounded-full ${i===page?'bg-white':'bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>
      )}
    </section>
  );
}



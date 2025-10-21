"use client";
import { useEffect, useMemo, useState } from "react";
import TemplateDemo from "./TemplateDemo";

export type PublicInvite = {
  bride?: string; groom?: string; type?: string; date?: string; dateText?: string; locationText?: string; bgUrl?: string; messageText?: string; noteText?: string; slug?: string;
  accentColor?: string; textColor?: string; fontFamily?: string; nameScale?: number; letterSpacing?: number; lineHeight?: number; radius?: number; countdownScale?: number; uppercaseEvent?: boolean;
};

type Props = { data: PublicInvite; shareUrl: string };

export default function PublicInviteClient({ data, shareUrl }: Props) {
  const key = useMemo(() => `invite_feedback_${data.slug || hash(shareUrl)}`, [data.slug, shareUrl]);
  const [like, setLike] = useState<boolean | null>(null);
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
  const [metrics, setMetrics] = useState<{likes:number;dislikes:number;yes:number;no:number;downloads:number;rsvps:{name:string;status:"yes"|"no";at:string}[]} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw);
        setLike(saved.like ?? null);
        setRsvp(saved.rsvp ?? null);
      }
    } catch {}
  }, [key]);

  function save(l?: boolean | null, r?: "yes" | "no" | null) {
    try {
      const next = { like: l ?? like, rsvp: r ?? rsvp };
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }

  function downloadFile(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadIcs() {
    try {
      const start = data.date ? new Date(data.date) : new Date();
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const ics = [
        'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//eDavetiye//Calendar//TR','BEGIN:VEVENT',
        `DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,`SUMMARY:${(data.type || 'Davet') + ' - ' + (data.bride || '') + ' & ' + (data.groom || '')}`,
        data.locationText ? `LOCATION:${data.locationText}` : undefined,'END:VEVENT','END:VCALENDAR']
        .filter(Boolean).join('\r\n');
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      downloadFile(url, 'davetiye.ics');
      URL.revokeObjectURL(url);
    } catch {}
  }

  const title = `${data.bride || "Gelin"} & ${data.groom || "Damat"}`;
  const slug = data.slug || undefined;

  // Load metrics
  useEffect(() => {
    if (!slug) return; fetch(`/api/invites/${slug}/metrics`).then(r=>r.json()).then(setMetrics).catch(()=>{});
  }, [slug]);

  // Load Google font on public page if provided
  useEffect(() => {
    if (!data.fontFamily) return;
    const map: Record<string, string> = {
      "'Montserrat', sans-serif": 'Montserrat:wght@400;600',
      "'Inter', sans-serif": 'Inter:wght@400;600',
      "'Poppins', sans-serif": 'Poppins:wght@400;600',
      "'Playfair Display', serif": 'Playfair+Display:wght@400;600',
      "'Lora', serif": 'Lora:wght@400;600',
      "'Great Vibes', cursive": 'Great+Vibes',
      "'The Seasons', serif": 'The+Seasons',
    };
    const fam = map[data.fontFamily];
    if (!fam) return;
    const id = 'public-font-link';
    let el = document.getElementById(id) as HTMLLinkElement | null;
    const href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
    if (!el) { el = document.createElement('link'); el.id = id; el.rel='stylesheet'; el.href=href; document.head.appendChild(el);} else { el.href = href; }
  }, [data.fontFamily]);

  // Stable shareUrl to avoid hydration mismatch
  const [stableShare, setStableShare] = useState<string>("");
  const [shareReady, setShareReady] = useState(false);
  useEffect(() => {
    if (shareUrl && shareUrl.length > 0) {
      setStableShare(shareUrl);
      setShareReady(true);
    } else if (typeof window !== 'undefined') {
      setStableShare(window.location.href);
      setShareReady(true);
    }
  }, [shareUrl]);

  const pagedRsvps = useMemo(() => {
    const list = (metrics && Array.isArray((metrics as any).rsvps)) ? (metrics as any).rsvps as {name:string;status:'yes'|'no';at:string}[] : [];
    const start = page * pageSize;
    return list.slice(start, start + pageSize);
  }, [metrics, page]);
  const totalPages = useMemo(() => {
    const len = (metrics && Array.isArray((metrics as any).rsvps)) ? (metrics as any).rsvps.length : 0;
    return Math.max(1, Math.ceil(len / pageSize));
  }, [metrics]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Preview same as builder */}
      <div>
        <div id="invite-print-area" className="rounded-2xl border border-white/10 bg-card p-4">
          <div className="mx-auto w-full" style={{ width: 'min(100%, 450px, calc(100svh * 9 / 16))' }}>
            <TemplateDemo
            template={{ id: "public", title: "", category: data.type || "Düğün" }}
            brideName={data.bride}
            groomName={data.groom}
            eventType={data.type}
            dateTime={data.date}
            dateText={data.dateText}
            locationText={data.locationText}
            orientation="portrait"
            backgroundUrl={data.bgUrl}
            messageText={data.messageText}
            noteText={data.noteText}
            accentColor={data.accentColor}
            textColor={data.textColor}
            fontFamily={data.fontFamily}
            nameScale={data.nameScale}
            letterSpacing={data.letterSpacing}
            lineHeight={data.lineHeight}
            radius={data.radius}
            countdownScale={data.countdownScale}
            uppercaseEvent={data.uppercaseEvent}
            />
          </div>
        </div>
      </div>

      {/* Interactions panel */}
      <div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-white/70">{data.type || "Davet"} • {data.dateText}</p>

          {/* Like / Dislike */}
          <div className="mt-6">
            <div className="text-xs text-white/70 mb-2">Beğeni</div>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={async () => { const v = like === true ? null : true; setLike(v); save(v, null); if (!slug) return; try { const r = await fetch(`/api/invites/${slug}/metrics`, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type: v ? 'like' : 'dislike' }) }); const j = await r.json(); setMetrics(j.metrics ?? j); } catch {} }}
                className={`h-10 px-4 rounded-md border text-sm ${like === true ? 'bg-emerald-600 text-white border-emerald-500' : 'border-white/15 text-white/90 hover:bg-white/5'}`}
              >Beğendim</button>
              <button
                onClick={async () => { const v = like === false ? null : false; setLike(v); save(v, null); if (!slug) return; try { const r = await fetch(`/api/invites/${slug}/metrics`, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type: v === false ? 'dislike' : 'like' }) }); const j = await r.json(); setMetrics(j.metrics ?? j);} catch {} }}
                className={`h-10 px-4 rounded-md border text-sm ${like === false ? 'bg-rose-600 text-white border-rose-500' : 'border-white/15 text-white/90 hover:bg-white/5'}`}
              >Beğenmedim</button>
              {metrics && <span className="text-xs text-white/60 ml-2">{metrics.likes} beğeni • {metrics.dislikes} beğenmeme</span>}
            </div>
          </div>

          {/* RSVP */}
          <div className="mt-6">
            <div className="text-xs text-white/70 mb-2">Katılım</div>
            <div className="flex flex-col gap-2">
              <input value={name} onChange={(e)=>{ setName(e.target.value); setError(null);} } placeholder="İsim Soyisim" className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none text-sm" />
              <div className="flex gap-2 flex-wrap">
                <button onClick={async () => { if (!name.trim()) { setError('İsim soyisim gerekli'); return; } const v = rsvp === 'yes' ? null : 'yes'; setRsvp(v); save(null, v); if (v==='yes' && slug){ const res=await fetch(`/api/invites/${slug}/metrics`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'rsvp',status:'yes',name})}); const j=await res.json(); setMetrics(j.metrics ?? j); } }} className={`h-10 px-4 rounded-md border text-sm ${rsvp === 'yes' ? 'bg-emerald-600 text-white border-emerald-500' : 'border-white/15 text-white/90 hover:bg-white/5'}`}>Katılıyorum</button>
                <button onClick={async () => { if (!name.trim()) { setError('İsim soyisim gerekli'); return; } const v = rsvp === 'no' ? null : 'no'; setRsvp(v); save(null, v); if (v==='no' && slug){ const res=await fetch(`/api/invites/${slug}/metrics`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'rsvp',status:'no',name})}); const j=await res.json(); setMetrics(j.metrics ?? j); } }} className={`h-10 px-4 rounded-md border text-sm ${rsvp === 'no' ? 'bg-rose-600 text-white border-rose-500' : 'border-white/15 text-white/90 hover:bg-white/5'}`}>Katılamıyorum</button>
                {metrics && <span className="text-xs text-white/60 ml-2">{metrics.yes} katılıyor • {metrics.no} katılamıyor</span>}
              </div>
              {error && <div className="text-xs text-rose-400">{error}</div>}
              {metrics && metrics.rsvps?.length > 0 && (
                <div className="mt-2 text-xs text-white/70 border-t border-white/10 pt-2">
                  {pagedRsvps.map((r,i)=> (
                    <div key={i} className="flex justify-between"><span>{r.name}</span><span className={r.status==='yes'? 'text-emerald-400' : 'text-rose-400'}>{r.status==='yes'?'Katılıyor':'Katılamıyor'}</span></div>
                  ))}
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button disabled={page===0} onClick={()=>setPage((p)=>Math.max(0,p-1))} className={`h-7 px-2 rounded border ${page===0?'border-white/10 text-white/40':'border-white/20 text-white/80 hover:bg-white/5'}`}>Önceki</button>
                    {Array.from({length: totalPages}).map((_,i)=> (
                      <button key={i} onClick={()=>setPage(i)} className={`h-7 w-7 rounded-full ${i===page?'bg-white text-black':'bg-white/10 text-white'}`}>{i+1}</button>
                    ))}
                    <button disabled={page>=totalPages-1} onClick={()=>setPage((p)=>Math.min(totalPages-1,p+1))} className={`h-7 px-2 rounded border ${page>=totalPages-1?'border-white/10 text-white/40':'border-white/20 text-white/80 hover:bg-white/5'}`}>Sonraki</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share */}
          <div className="mt-6">
            <div className="text-xs text-white/70 mb-2">Paylaş</div>
            {shareReady && (
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { navigator.clipboard.writeText(stableShare); }} className="h-10 px-3 rounded-md border border-white/15 text-sm text-white/90 hover:bg-white/5">Linki Kopyala</button>
                <a target="_blank" href={`https://wa.me/?text=${encodeURIComponent(stableShare)}`} className="h-10 px-3 inline-flex items-center rounded-md bg-emerald-600 text-white text-sm">WhatsApp</a>
                <a target="_blank" href={`https://t.me/share/url?url=${encodeURIComponent(stableShare)}&text=${encodeURIComponent(title)}`} className="h-10 px-3 inline-flex items-center rounded-md bg-[#26A5E4] text-white text-sm">Telegram</a>
                <a target="_blank" href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(stableShare)}`} className="h-10 px-3 inline-flex items-center rounded-md border border-white/15 text-sm text-white/90 hover:bg-white/5">E‑posta</a>
                {/* İndirme özelliği kaldırıldı */}
                <button onClick={downloadIcs} className="h-10 px-3 rounded-md border border-white/15 text-sm text-white/90 hover:bg-white/5">Takvime Ekle (.ics)</button>
                <a target="_blank" href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(stableShare)}`} className="h-10 px-3 inline-flex items-center rounded-md border border-white/15 text-sm text-white/90 hover:bg-white/5">QR Göster</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function hash(s: string) {
  let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return `h${Math.abs(h)}`;
}



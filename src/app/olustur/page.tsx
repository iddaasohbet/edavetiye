"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import TemplateDemo from "../components/TemplateDemo";
import GooglePlacesAutocomplete from "../components/GooglePlacesAutocomplete";

export default function BuilderPage() {
  const router = useRouter();
  const params = useSearchParams();
  const routeParams = useParams();
  const templateParam = (params?.get("template") ?? (routeParams as any)?.template ?? null) as string | null;

  // Eski URL yapısından (\n/olustur?template=...) yeni SEO dostu (/olustur/[template]) yapısına yönlendir
  useEffect(() => {
    const q = params?.get("template");
    try {
      if (q && typeof window !== 'undefined' && window.location.pathname === "/olustur") {
        router.replace(`/olustur/${encodeURIComponent(q)}`);
      }
    } catch {}
  }, [params, router]);
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("demo_user");
      setAuthed(!!raw);
    } catch {
      setAuthed(false);
    }
  }, []);
  const [bride, setBride] = useState("Elif");
  const [groom, setGroom] = useState("Mert");
  const [type, setType] = useState("Düğün");
  const [date, setDate] = useState("2026-01-01T19:00:00");
  const [dateText, setDateText] = useState("01 Ocak 2026, 19:00");
  const [locationText, setLocationText] = useState("Sahil Garden, İstanbul");
  const [fit] = useState<"contain" | "cover">("contain");
  const TEMPLATES = [
    { id: "t-marble", name: "Mermer Çiçek", url: "https://altinbilgi.com/8.jpg" },
    { id: "t-rings", name: "Altın Yüzük", url: "https://altinbilgi.com/1.png" },
    { id: "t-goldarch", name: "Altın Kemer", url: "https://altinbilgi.com/4.jpg" },
    { id: "t-ringsrose", name: "Yüzük & Yaprak", url: "https://altinbilgi.com/5.jpg" },
    { id: "t-goldgrid", name: "Altın Geometri", url: "https://altinbilgi.com/6.jpg" },
    { id: "t-silverrings", name: "Gümüş Yüzük", url: "https://altinbilgi.com/10.jpg" },
    { id: "t-goldfeather", name: "Altın Tüy", url: "https://altinbilgi.com/11.jpg" },
    { id: "t-whitegold", name: "Beyaz Altın", url: "https://altinbilgi.com/12.jpg" },
    { id: "t-berrywreath", name: "Çiçekli Kemer", url: "https://altinbilgi.com/13.jpg" },
    { id: "t-sage", name: "Sage Yeşil", url: "https://altinbilgi.com/14.jpg" },
    { id: "t-goldleaf", name: "Altın Yaprak", url: "https://altinbilgi.com/15.jpg" },
    { id: "t-goldpanel", name: "Altın Panel", url: "https://altinbilgi.com/16.jpg" },
    { id: "t-goldblue", name: "Altın Çerçeve Mavi", url: "https://altinbilgi.com/17.png" },
    { id: "t-calla", name: "Beyaz Zambak", url: "https://altinbilgi.com/18.jpg" },
    { id: "t-crystal", name: "Kristal Oval", url: "https://altinbilgi.com/19.jpg" },
    { id: "t-bluegold", name: "Mavi Altın", url: "https://altinbilgi.com/20.jpg" },
    { id: "t-leaf", name: "Yaprak Çerçeve", url: "https://altinbilgi.com/22.jpg" },
    { id: "t-crescent", name: "Hilal Mermer", url: "https://altinbilgi.com/25.png" },
    { id: "t-ulku", name: "Hilal & Bozkurt", url: "https://altinbilgi.com/ulku.png" },
  ] as const;
  const initialBg = (() => {
    const found = TEMPLATES.find(t => t.id === templateParam);
    return found ? found.url : TEMPLATES[0].url;
  })();
  const [bgUrl, setBgUrl] = useState<string>(initialBg);
  const [messageText, setMessageText] = useState("Ailemizin bu özel gününde sizleri aramızda görmekten mutluluk duyarız.");
  const [noteText, setNoteText] = useState("Lütfen saatinde aramızda olunuz. Çocuklar için alan mevcuttur.");
  const [accentColor, setAccentColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [nameScale, setNameScale] = useState<number>(1);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [radius, setRadius] = useState<number>(12);
  const [countdownScale, setCountdownScale] = useState<number>(1);
  const [uppercaseEvent, setUppercaseEvent] = useState<boolean>(true);

  const FONT_OPTIONS = [
    { label: 'Varsayılan', import: '', css: '' },
    { label: 'Montserrat', import: 'Montserrat:wght@400;600', css: "'Montserrat', sans-serif" },
    { label: 'Inter', import: 'Inter:wght@400;600', css: "'Inter', sans-serif" },
    { label: 'Poppins', import: 'Poppins:wght@400;600', css: "'Poppins', sans-serif" },
    { label: 'Playfair Display', import: 'Playfair+Display:wght@400;600', css: "'Playfair Display', serif" },
    { label: 'Lora', import: 'Lora:wght@400;600', css: "'Lora', serif" },
    { label: 'Great Vibes', import: 'Great+Vibes', css: "'Great Vibes', cursive" },
    { label: 'The Seasons', import: 'The+Seasons', css: "'The Seasons', serif" },
  ];

  // Load Google font dynamically when selection changes
  useEffect(() => {
    const selected = FONT_OPTIONS.find(f => f.css === fontFamily);
    const id = 'builder-font-link';
    let el = document.getElementById(id) as HTMLLinkElement | null;
    if (selected && selected.import) {
      const href = `https://fonts.googleapis.com/css2?family=${selected.import}&display=swap`;
      if (!el) {
        el = document.createElement('link');
        el.id = id; el.rel = 'stylesheet'; el.href = href; document.head.appendChild(el);
      } else {
        el.href = href;
      }
    }
  }, [fontFamily]);

  const backgroundOptions = useMemo(
    () => TEMPLATES as unknown as { id: string; name: string; url: string }[],
    []
  );

  const dateISO = useMemo(() => {
    try { return new Date(date).toISOString(); } catch { return undefined; }
  }, [date]);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const steps: { id: 1 | 2 | 3 | 4 | 5; label: string }[] = [
    { id: 1, label: "Şablon Seç" },
    { id: 2, label: "Kişiler & Tür" },
    { id: 3, label: "Tarih & Saat" },
    { id: 4, label: "Konum" },
    { id: 5, label: "Mesaj & Not" },
  ];

  if (authed === false) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-card p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,.25)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-500/30">
            <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.66 1.73-3L13.73 5c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.34.19 3 1.73 3Z" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold">Giriş gerekli</h2>
          <p className="mt-2 text-sm text-white/70">Şablon düzenlemek için üye girişi yapmalısın. Devam etmek için hesabınla giriş yap veya hemen kayıt ol.</p>
          <div className="mt-5 flex gap-2">
            <a href="/giris" className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-700">Giriş Yap</a>
            <a href="/kayit" className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10">Kayıt Ol</a>
          </div>
        </div>
      </section>
    );
  }

  if (authed === null) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-md text-center text-white/70">Yükleniyor…</div>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <div className="mx-auto w-full" style={{ width: 'min(100%, 450px, calc(100svh * 9 / 16))' }}>
            <TemplateDemo
              template={{ id: "builder", title: "", category: type }}
              brideName={bride}
              groomName={groom}
              eventType={type}
              dateTime={dateISO}
              dateText={dateText}
              locationText={locationText}
              orientation="portrait"
              backgroundUrl={bgUrl}
              messageText={messageText}
              noteText={noteText}
              accentColor={accentColor || undefined}
              textColor={textColor || undefined}
              fontFamily={fontFamily || undefined}
              nameScale={nameScale}
              letterSpacing={letterSpacing}
              lineHeight={lineHeight}
              radius={radius}
              countdownScale={countdownScale}
              uppercaseEvent={uppercaseEvent}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <h1 className="text-2xl font-semibold">Davetiyeyi Oluştur</h1>
          <p className="mt-1 text-sm text-white/70">Adımları takip ederek kurumsal bir şekilde ilerleyin.</p>

          {/* Step navigation */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border ${step === s.id ? 'bg-white text-black border-white' : 'border-white/20 text-white/80 hover:border-white/40'}`}
                title={s.label}
              >
                <span className={`grid h-6 w-6 place-items-center rounded-full ${step === s.id ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>{i+1}</span>
                <span className="hidden sm:block">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Step contents */}
          <div className="mt-5 grid gap-4">
            {step === 1 && (
              <div>
                <label className="text-xs text-white/70">1. Şablon Seç</label>
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {backgroundOptions.map((opt, idx) => {
                    const selected = bgUrl === opt.url;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBgUrl(opt.url)}
                        className={`flex h-16 flex-col items-center justify-center rounded-lg border text-white transition ${selected ? 'border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-400' : 'border-white/15 bg-white/5 hover:bg-white/10'}`}
                        title={`${idx + 1}. ${opt.name}`}
                      >
                        <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${selected ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white'}`}>{idx + 1}</span>
                        <span className="mt-1 text-[10px] opacity-80 truncate w-full px-1">{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-[10px] text-white/50">Numaralı seçeneklere tıklayarak şablon değiştirin.</div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-3">
                <div>
                  <label className="text-xs text-white/70">2. Gelin Adı</label>
                  <input value={bride} onChange={(e) => setBride(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Damat Adı</label>
                  <input value={groom} onChange={(e) => setGroom(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Etkinlik Türü</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white px-3 py-2 text-black outline-none">
                    {['Düğün','Merasim','Nikah','Söz','Nişan','Sünnet','Doğum Günü'].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                {/* Quick style controls on first step */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-white/70">Vurgu Rengi</label>
                    <input type="color" value={accentColor || '#cfae62'} onChange={(e)=>setAccentColor(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-white/15 bg-white/5 p-1" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Metin Rengi</label>
                    <input type="color" value={textColor || '#2b2b2b'} onChange={(e)=>setTextColor(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-white/15 bg-white/5 p-1" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Yazı Tipi</label>
                    <select value={fontFamily} onChange={(e)=>setFontFamily(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white px-3 py-2 text-black outline-none">
                      {FONT_OPTIONS.map(f => (
                        <option key={f.label} value={f.css}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/70">3. Tarih & Saat</label>
                  <input type="datetime-local" value={date} min="2026-01-01T00:00" onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Tarih Yazısı</label>
                  <input value={dateText} onChange={(e) => setDateText(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="text-xs text-white/70">4. Adres Yazısı</label>
                <GooglePlacesAutocomplete value={locationText} onChange={setLocationText} onPick={({ text }) => setLocationText(text)} />
              </div>
            )}

            {step === 5 && (
              <div className="grid gap-3">
                <div>
                  <label className="text-xs text-white/70">5. Karşılama Mesajı</label>
                  <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Not</label>
                  <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                </div>
                {/* Renk & Yazı Tipi kontrolleri Step 1'e taşındı */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-white/70">İsim Boyutu (0.6 - 1.6)</label>
                    <input type="number" step="0.1" min={0.6} max={1.6} value={nameScale} onChange={(e)=>setNameScale(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Harf Aralığı (em)</label>
                    <input type="number" step="0.05" value={letterSpacing} onChange={(e)=>setLetterSpacing(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Satır Aralığı</label>
                    <input type="number" step="0.1" value={lineHeight} onChange={(e)=>setLineHeight(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-white/70">Köşe Yuvarlama (px)</label>
                    <input type="number" step="1" value={radius} onChange={(e)=>setRadius(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Geri Sayım Ölçeği (0.6 - 1.6)</label>
                    <input type="number" step="0.1" min={0.6} max={1.6} value={countdownScale} onChange={(e)=>setCountdownScale(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
                  </div>
                  <div className="flex items-end">
                    <label className="text-xs text-white/70 mr-2">Etkinlik Başlığı BÜYÜK</label>
                    <input type="checkbox" checked={uppercaseEvent} onChange={(e)=>setUppercaseEvent(e.target.checked)} />
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-2 flex items-center justify-between gap-2 pt-2">
              <button type="button" disabled={step === 1} onClick={() => setStep(((step - 1) as 1|2|3|4|5))} className={`h-10 rounded-md px-4 text-sm font-medium ${step === 1 ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white/15 text-white hover:bg-white/25'}`}>Geri</button>
              {step < 5 ? (
                <button type="button" onClick={() => setStep(((step + 1) as 1|2|3|4|5))} className="h-10 rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-700">İleri</button>
              ) : (
                <button onClick={async () => {
                  const payload = { bride, groom, type, date, dateText, locationText, bgUrl, messageText, noteText, createdAt: new Date().toISOString(), accentColor, textColor, fontFamily, nameScale, letterSpacing, lineHeight, radius, countdownScale, uppercaseEvent };
                  try {
                    // Local cache
                    const raw = localStorage.getItem("demo_invites");
                    const list = raw ? JSON.parse(raw) : [];
                    list.unshift(payload);
                    localStorage.setItem("demo_invites", JSON.stringify(list));
                    try { window.dispatchEvent(new CustomEvent("invites:changed")); } catch {}
                  } catch {}
                  // Persist via API and go to share URL
                  try {
                    const res = await fetch('/api/invites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    const json = await res.json();
                    if (json?.slug) {
                      router.push(`/v/${json.slug}`);
                      return;
                    }
                  } catch {}
                  router.push('/profil');
                }} className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-700">Davetiyeyi Oluştur</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


